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
import {
  checkMasterArgv,
  controlBaseDir,
  controlFleetDir,
  controlPath,
  ensureControlDir,
  exitMasterArgv,
  openMasterArgv,
  safeFleetDir,
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

Deno.test("controlPath: full path stays under 104-byte UNIX limit (Linux XDG)", async () => {
  const longHost = sshHost({
    address: "very-long-hostname-".repeat(10) + "example.com",
    user: "a-rather-long-deployment-service-account-name",
  });
  const p = await controlPath("a-long-fleet-name-for-testing", longHost, {
    XDG_RUNTIME_DIR: "/run/user/1000",
  });
  assert(p.length <= 104, `full path too long (${p.length}): ${p}`);
});

Deno.test("controlPath: full path stays under 104 bytes with macOS TMPDIR (short fleet)", async () => {
  const macEnv = {
    XDG_RUNTIME_DIR: "",
    TMPDIR: "/var/folders/jb/r4b9t72s2xjf38ljdqy8hm9w0000gn/T",
  };
  // Short fleet name fits on TMPDIR with the truncated hash
  const p = await controlPath("my-app", sshHost(), macEnv);
  assert(p.length <= 104, `full path too long (${p.length}): ${p}`);
});

Deno.test("controlPath: macOS TMPDIR falls back to /tmp for longer fleet names", async () => {
  const macEnv = {
    XDG_RUNTIME_DIR: "",
    TMPDIR: "/var/folders/jb/r4b9t72s2xjf38ljdqy8hm9w0000gn/T",
  };
  // Fleet name long enough to exceed 104 bytes on macOS TMPDIR
  const p = await controlPath("production-us-east-1-web-servers", sshHost(), macEnv);
  assert(p.length <= 104, `full path too long (${p.length}): ${p}`);
  assert(
    p.startsWith("/tmp/swamp-ssh/"),
    `long fleet on macOS should fall back to /tmp, got: ${p}`,
  );
});

Deno.test("controlPath: extremely long fleet name hashed to fit", async () => {
  const longFleet = "a".repeat(200);
  const p = await controlPath(longFleet, sshHost(), {
    XDG_RUNTIME_DIR: "/run/user/1000",
  });
  assert(p.length <= 104, `full path too long (${p.length}): ${p}`);
  assert(
    p.startsWith("/tmp/swamp-ssh/"),
    `long fleet should fall back to /tmp, got: ${p}`,
  );
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
// safeFleetDir: length-aware resolution
// ---------------------------------------------------------------------------

Deno.test("safeFleetDir: Linux XDG preserved for typical fleet names", async () => {
  const linuxEnv = { XDG_RUNTIME_DIR: "/run/user/1000" };
  for (const fleet of ["my-app", "production-web", "staging-k8s-workers"]) {
    const dir = await safeFleetDir(fleet, linuxEnv);
    assert(
      dir.startsWith("/run/user/1000/swamp-ssh/"),
      `fleet "${fleet}" should stay on XDG, got: ${dir}`,
    );
    assertEquals(dir, `/run/user/1000/swamp-ssh/${fleet}`);
  }
});

Deno.test("safeFleetDir: macOS TMPDIR preserved for short fleet names", async () => {
  const macEnv = {
    XDG_RUNTIME_DIR: "",
    TMPDIR: "/var/folders/jb/r4b9t72s2xjf38ljdqy8hm9w0000gn/T",
  };
  const dir = await safeFleetDir("my-app", macEnv);
  assert(
    dir.includes("/swamp-ssh/my-app"),
    `short fleet on macOS should keep fleet name, got: ${dir}`,
  );
});

Deno.test("safeFleetDir: macOS TMPDIR triggers /tmp fallback for longer fleet names", async () => {
  const macEnv = {
    XDG_RUNTIME_DIR: "",
    TMPDIR: "/var/folders/jb/r4b9t72s2xjf38ljdqy8hm9w0000gn/T",
  };
  const dir = await safeFleetDir("production-us-east-1-web-servers", macEnv);
  assert(
    dir.startsWith("/tmp/swamp-ssh/"),
    `long fleet on macOS should fall back to /tmp, got: ${dir}`,
  );
  assertEquals(dir, "/tmp/swamp-ssh/production-us-east-1-web-servers");
});

Deno.test("safeFleetDir: Linux XDG threshold — boundary fleet stays on XDG", async () => {
  const linuxEnv = { XDG_RUNTIME_DIR: "/run/user/1000" };
  // base = "/run/user/1000/swamp-ssh" (24 chars) + "/" + fleet + "/" + 17 (filename) <= 104
  // max fleet = 104 - 24 - 1 - 1 - 17 = 61 chars
  // but safeFleetDir budget = 104 - 1 - 17 = 86, and dir = 24 + 1 + fleet
  // so fleet <= 86 - 25 = 61 chars
  const maxFleet = "a".repeat(61);
  const dir = await safeFleetDir(maxFleet, linuxEnv);
  assert(
    dir.startsWith("/run/user/1000/swamp-ssh/"),
    `fleet at boundary should stay on XDG, got: ${dir}`,
  );
});

Deno.test("safeFleetDir: Linux XDG threshold — one char over triggers /tmp fallback", async () => {
  const linuxEnv = { XDG_RUNTIME_DIR: "/run/user/1000" };
  const overFleet = "a".repeat(62);
  const dir = await safeFleetDir(overFleet, linuxEnv);
  assert(
    dir.startsWith("/tmp/swamp-ssh/"),
    `fleet one char over boundary should fall back to /tmp, got: ${dir}`,
  );
});

Deno.test("safeFleetDir: controlPath and ensureControlDir agree on directory", async () => {
  const env = { XDG_RUNTIME_DIR: "/run/user/1000" };
  const fleet = "my-app";
  const dir = await safeFleetDir(fleet, env);
  const p = await controlPath(fleet, sshHost(), env);
  const pathDir = p.substring(0, p.lastIndexOf("/"));
  assertEquals(dir, pathDir);
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
