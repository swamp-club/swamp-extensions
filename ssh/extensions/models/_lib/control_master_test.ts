// Swamp, an Automation Framework
// Copyright (C) 2026 System Initiative, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

import { assert, assertEquals, assertNotEquals } from "jsr:@std/assert@1.0.19";
import { basename } from "jsr:@std/path@1";
import {
  checkMasterArgv,
  controlBaseDir,
  controlFleetDir,
  controlPath,
  ensureControlDir,
  exitMasterArgv,
  openMasterArgv,
} from "./control_master.ts";
import type { EffectiveHost } from "./hosts.ts";

function sshHost(over: Partial<{
  name: string;
  address: string;
  user: string;
  port: number;
}> = {}): EffectiveHost {
  return {
    name: over.name ?? "web-1",
    address: over.address ?? "web-1.prod.example.com",
    tags: [],
    attrs: {},
    env: {},
    transport: {
      kind: "ssh",
      user: over.user ?? "deploy",
      port: over.port ?? 22,
      auth: { kind: "key" },
      connectTimeoutSec: 10,
      extraOptions: [],
      controlMaster: { enabled: true, persistSec: 600 },
    },
  };
}

// ---------------------------------------------------------------------------
// Base dir resolution
// ---------------------------------------------------------------------------

Deno.test("controlBaseDir: prefers XDG_RUNTIME_DIR", () => {
  assertEquals(
    controlBaseDir({ XDG_RUNTIME_DIR: "/run/user/1000", TMPDIR: "/tmp" }),
    "/run/user/1000/swamp-ssh",
  );
});

Deno.test("controlBaseDir: falls back to TMPDIR", () => {
  assertEquals(
    controlBaseDir({ XDG_RUNTIME_DIR: "", TMPDIR: "/var/tmp" }),
    "/var/tmp/swamp-ssh",
  );
});

Deno.test("controlBaseDir: falls back to /tmp", () => {
  assertEquals(
    controlBaseDir({ XDG_RUNTIME_DIR: "", TMPDIR: "" }),
    "/tmp/swamp-ssh",
  );
});

Deno.test("controlFleetDir: appends fleet name", () => {
  assertEquals(
    controlFleetDir("awesome", { XDG_RUNTIME_DIR: "/run/user/1000" }),
    "/run/user/1000/swamp-ssh/awesome",
  );
});

// ---------------------------------------------------------------------------
// Path stability + identity sensitivity
// ---------------------------------------------------------------------------

Deno.test("controlPath: stable for identical host", async () => {
  const env = { XDG_RUNTIME_DIR: "/run/user/1000" };
  const a = await controlPath("awesome", sshHost(), env);
  const b = await controlPath("awesome", sshHost(), env);
  assertEquals(a, b);
});

Deno.test("controlPath: differs when user changes", async () => {
  const env = { XDG_RUNTIME_DIR: "/run/user/1000" };
  const a = await controlPath("awesome", sshHost({ user: "deploy" }), env);
  const b = await controlPath("awesome", sshHost({ user: "root" }), env);
  assertNotEquals(a, b);
});

Deno.test("controlPath: differs when address changes", async () => {
  const env = { XDG_RUNTIME_DIR: "/run/user/1000" };
  const a = await controlPath("awesome", sshHost({ address: "a" }), env);
  const b = await controlPath("awesome", sshHost({ address: "b" }), env);
  assertNotEquals(a, b);
});

Deno.test("controlPath: differs when port changes", async () => {
  const env = { XDG_RUNTIME_DIR: "/run/user/1000" };
  const a = await controlPath("awesome", sshHost({ port: 22 }), env);
  const b = await controlPath("awesome", sshHost({ port: 2222 }), env);
  assertNotEquals(a, b);
});

Deno.test("controlPath: differs when fleet changes", async () => {
  const env = { XDG_RUNTIME_DIR: "/run/user/1000" };
  const a = await controlPath("fleet-a", sshHost(), env);
  const b = await controlPath("fleet-b", sshHost(), env);
  assertNotEquals(a, b);
});

Deno.test("controlPath: socket filename stays under 104-byte UNIX limit", async () => {
  const longHost = sshHost({
    address: "very-long-hostname-".repeat(10) + "example.com",
    user: "a-rather-long-deployment-service-account-name",
  });
  const p = await controlPath("a-long-fleet-name-for-testing", longHost, {
    XDG_RUNTIME_DIR: "/run/user/1000",
  });
  // The full socket path must fit in sockaddr_un.sun_path (108 on Linux,
  // commonly cited as 104). Our basename is sha1(40) + ".sock" = 45 chars.
  assert(basename(p).length <= 45, `basename too long: ${basename(p)}`);
});

Deno.test("controlPath: throws for tailscale host", async () => {
  const tsHost: EffectiveHost = {
    name: "edge-1",
    address: "edge-1",
    tags: [],
    attrs: {},
    env: {},
    transport: { kind: "tailscale", user: "deploy", sshExtraArgs: [] },
  };
  let threw = false;
  try {
    await controlPath("awesome", tsHost, { XDG_RUNTIME_DIR: "/run/user/1000" });
  } catch {
    threw = true;
  }
  assert(threw);
});

// ---------------------------------------------------------------------------
// Directory setup
// ---------------------------------------------------------------------------

Deno.test("ensureControlDir: creates 0700 dir", async () => {
  const tmp = await Deno.makeTempDir();
  try {
    const result = await ensureControlDir("awesome", {
      XDG_RUNTIME_DIR: tmp,
    });
    assert(result.writable, JSON.stringify(result));
    const stat = await Deno.stat(`${tmp}/swamp-ssh/awesome`);
    assert(stat.isDirectory);
    if (stat.mode !== null) {
      assertEquals(stat.mode & 0o777, 0o700);
    }
  } finally {
    await Deno.remove(tmp, { recursive: true });
  }
});

Deno.test("ensureControlDir: refuses world-writable dir", async () => {
  const tmp = await Deno.makeTempDir();
  try {
    const dir = `${tmp}/swamp-ssh/awesome`;
    await Deno.mkdir(dir, { recursive: true });
    await Deno.chmod(dir, 0o777);
    const result = await ensureControlDir("awesome", { XDG_RUNTIME_DIR: tmp });
    assertEquals(result.writable, false);
    if (!result.writable) {
      assert(result.reason.includes("permissions"));
    }
  } finally {
    await Deno.remove(tmp, { recursive: true });
  }
});

Deno.test("ensureControlDir: idempotent on a clean 0700 dir", async () => {
  const tmp = await Deno.makeTempDir();
  try {
    const a = await ensureControlDir("awesome", { XDG_RUNTIME_DIR: tmp });
    const b = await ensureControlDir("awesome", { XDG_RUNTIME_DIR: tmp });
    assert(a.writable && b.writable);
  } finally {
    await Deno.remove(tmp, { recursive: true });
  }
});

// ---------------------------------------------------------------------------
// Master argv shapes
// ---------------------------------------------------------------------------

Deno.test("openMasterArgv: includes ControlMaster=yes, persist, -fN", () => {
  const argv = openMasterArgv("ssh", {
    controlPath: "/run/swamp-ssh/awesome/abc.sock",
    persistSec: 600,
    identityFile: "/key",
    user: "deploy",
    address: "host",
    port: 22,
  });
  assert(argv.includes("ControlMaster=yes"));
  assert(argv.includes("ControlPersist=600"));
  assert(argv.includes("-fN"));
  assert(argv.includes("deploy@host"));
  assert(argv.includes("-i"));
  assert(argv.includes("/key"));
});

Deno.test("openMasterArgv: proxyJump and identityAgent", () => {
  const argv = openMasterArgv("ssh", {
    controlPath: "/x.sock",
    persistSec: 60,
    identityAgent: "~/.1password/agent.sock",
    proxyJump: "deploy@bastion",
    user: "deploy",
    address: "10.0.5.21",
    port: 22,
  });
  assert(argv.includes("IdentityAgent=~/.1password/agent.sock"));
  assert(argv.includes("-J"));
  assert(argv.includes("deploy@bastion"));
});

Deno.test("openMasterArgv: identitiesOnly renders yes/no", () => {
  const yes = openMasterArgv("ssh", {
    controlPath: "/x.sock",
    persistSec: 60,
    identitiesOnly: true,
    address: "h",
    port: 22,
  });
  assert(yes.includes("IdentitiesOnly=yes"));
});

Deno.test("checkMasterArgv: -O check shape", () => {
  const argv = checkMasterArgv("ssh", "/x.sock", "deploy", "host");
  assertEquals(argv, [
    "ssh",
    "-O",
    "check",
    "-o",
    "ControlPath=/x.sock",
    "deploy@host",
  ]);
});

Deno.test("exitMasterArgv: -O exit shape", () => {
  const argv = exitMasterArgv("ssh", "/x.sock", undefined, "host");
  assertEquals(argv, [
    "ssh",
    "-O",
    "exit",
    "-o",
    "ControlPath=/x.sock",
    "host",
  ]);
});
