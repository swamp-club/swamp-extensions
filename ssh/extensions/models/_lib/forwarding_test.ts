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

import { assert, assertEquals } from "jsr:@std/assert@1.0.19";
import {
  cancelTailscaleForward,
  openTailscaleForward,
  parseForwardSpec,
  resetForwardSeams,
  setForwardSpawner,
  setProcessKiller,
  sshForwardArgv,
  tailscaleForwardArgv,
} from "./forwarding.ts";
import type { EffectiveHost } from "./hosts.ts";

function sshHost(): EffectiveHost {
  return {
    name: "web-1",
    address: "web-1.example.com",
    tags: [],
    attrs: {},
    env: {},
    transport: {
      kind: "ssh",
      user: "deploy",
      port: 22,
      auth: { kind: "key" },
      connectTimeoutSec: 10,
      extraOptions: [],
      controlMaster: { enabled: true, persistSec: 600 },
    },
  };
}

function tailscaleHost(): EffectiveHost {
  return {
    name: "edge-1",
    address: "edge-1",
    tags: [],
    attrs: {},
    env: {},
    transport: { kind: "tailscale", user: "deploy", sshExtraArgs: [] },
  };
}

// ---------------------------------------------------------------------------
// parseForwardSpec
// ---------------------------------------------------------------------------

Deno.test("parseForwardSpec: valid LPORT:RHOST:RPORT", () => {
  assertEquals(parseForwardSpec("9090:localhost:9090"), {
    localPort: 9090,
    remoteHost: "localhost",
    remotePort: 9090,
  });
});

Deno.test("parseForwardSpec: IP remote host", () => {
  assertEquals(parseForwardSpec("8000:127.0.0.1:80"), {
    localPort: 8000,
    remoteHost: "127.0.0.1",
    remotePort: 80,
  });
});

Deno.test("parseForwardSpec: rejects wrong arity", () => {
  assertEquals(parseForwardSpec("9090:9090"), null);
  assertEquals(parseForwardSpec("9090:host:90:extra"), null);
});

Deno.test("parseForwardSpec: rejects out-of-range port", () => {
  assertEquals(parseForwardSpec("70000:host:80"), null);
  assertEquals(parseForwardSpec("80:host:70000"), null);
});

Deno.test("parseForwardSpec: rejects empty remote host", () => {
  assertEquals(parseForwardSpec("80::80"), null);
});

Deno.test("parseForwardSpec: rejects non-numeric port", () => {
  assertEquals(parseForwardSpec("abc:host:80"), null);
});

// ---------------------------------------------------------------------------
// sshForwardArgv
// ---------------------------------------------------------------------------

Deno.test("sshForwardArgv: -O forward -L shape", () => {
  const argv = sshForwardArgv(
    "ssh",
    "/x.sock",
    "forward",
    "L",
    "9090:localhost:9090",
    sshHost(),
  );
  assertEquals(argv, [
    "ssh",
    "-O",
    "forward",
    "-o",
    "ControlPath=/x.sock",
    "-L",
    "9090:localhost:9090",
    "deploy@web-1.example.com",
  ]);
});

Deno.test("sshForwardArgv: -O cancel -R shape", () => {
  const argv = sshForwardArgv(
    "ssh",
    "/x.sock",
    "cancel",
    "R",
    "9090:localhost:9090",
    sshHost(),
  );
  assert(argv.includes("cancel"));
  assert(argv.includes("-R"));
});

// ---------------------------------------------------------------------------
// tailscaleForwardArgv
// ---------------------------------------------------------------------------

Deno.test("tailscaleForwardArgv: -N -L shape", () => {
  const argv = tailscaleForwardArgv(
    "tailscale",
    "L",
    "9090:localhost:9090",
    tailscaleHost(),
  );
  assertEquals(argv, [
    "tailscale",
    "ssh",
    "-N",
    "-L",
    "9090:localhost:9090",
    "deploy@edge-1",
  ]);
});

Deno.test("tailscaleForwardArgv: throws for ssh host", () => {
  let threw = false;
  try {
    tailscaleForwardArgv("tailscale", "L", "1:h:1", sshHost());
  } catch {
    threw = true;
  }
  assert(threw);
});

// ---------------------------------------------------------------------------
// open / cancel lifecycle (fakes)
// ---------------------------------------------------------------------------

Deno.test("openTailscaleForward: spawns and returns pid", () => {
  const spawned: { argv: string[]; env: Record<string, string> }[] = [];
  setForwardSpawner((argv, env) => {
    spawned.push({ argv, env });
    return { pid: 4242 };
  });
  try {
    const opened = openTailscaleForward(
      tailscaleHost(),
      "tailscale",
      "L",
      "9090:localhost:9090",
      { TS_TOKEN: "x" },
    );
    assertEquals(opened.pid, 4242);
    assertEquals(spawned.length, 1);
    assert(spawned[0].argv.includes("-N"));
    assertEquals(spawned[0].env.TS_TOKEN, "x");
  } finally {
    resetForwardSeams();
  }
});

Deno.test("openTailscaleForward: honors per-host tailscale binary", () => {
  let usedBin = "";
  setForwardSpawner((argv) => {
    usedBin = argv[0];
    return { pid: 1 };
  });
  try {
    const host = tailscaleHost();
    if (host.transport.kind === "tailscale") {
      host.transport.tailscaleBinary = "/opt/ts";
    }
    openTailscaleForward(host, "tailscale", "L", "1:h:1", {});
    assertEquals(usedBin, "/opt/ts");
  } finally {
    resetForwardSeams();
  }
});

Deno.test("cancelTailscaleForward: kills the tracked pid", () => {
  const killed: number[] = [];
  setProcessKiller((pid) => killed.push(pid));
  try {
    cancelTailscaleForward(4242);
    assertEquals(killed, [4242]);
  } finally {
    resetForwardSeams();
  }
});
