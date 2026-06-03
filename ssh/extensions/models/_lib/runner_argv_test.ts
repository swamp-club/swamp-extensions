// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
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
  applySudo,
  type ArgvContext,
  buildCopyArgv,
  buildExecArgv,
  forwardedEnv,
  scriptRemoteCommand,
  sendEnvKeys,
  spawnEnv,
} from "./runner.ts";
import type { EffectiveHost } from "./hosts.ts";

const BINARIES = {
  ssh: "ssh",
  scp: "scp",
  rsync: "rsync",
  tailscale: "tailscale",
  sshpass: "sshpass",
};

function ctx(over: Partial<ArgvContext> = {}): ArgvContext {
  return {
    binaries: BINARIES,
    controlPath: over.controlPath,
    sendEnvKeys: over.sendEnvKeys ?? [],
  };
}

function sshHost(over: Partial<{
  user: string;
  address: string;
  port: number;
  identityFile: string;
  identityAgent: string;
  identitiesOnly: boolean;
  knownHostsFile: string;
  strictHostKeyChecking: "yes" | "accept-new" | "no" | "off";
  proxyJump: string;
  proxyCommand: string;
  extraOptions: string[];
  serverAliveIntervalSec: number;
  password: string;
  cmEnabled: boolean;
}> = {}): EffectiveHost {
  return {
    name: "web-1",
    address: over.address ?? "web-1.example.com",
    tags: [],
    attrs: {},
    env: {},
    transport: {
      kind: "ssh",
      user: over.user ?? "deploy",
      port: over.port ?? 22,
      auth: over.password !== undefined
        ? { kind: "password", password: over.password }
        : { kind: "key" },
      identityFile: over.identityFile,
      identityAgent: over.identityAgent,
      identitiesOnly: over.identitiesOnly,
      knownHostsFile: over.knownHostsFile,
      strictHostKeyChecking: over.strictHostKeyChecking,
      connectTimeoutSec: 10,
      serverAliveIntervalSec: over.serverAliveIntervalSec,
      proxyJump: over.proxyJump,
      proxyCommand: over.proxyCommand,
      extraOptions: over.extraOptions ?? [],
      controlMaster: {
        enabled: over.cmEnabled ?? true,
        persistSec: 600,
      },
    },
  };
}

function tailscaleHost(over: Partial<{
  user: string;
  address: string;
  sshExtraArgs: string[];
  tailscaleBinary: string;
}> = {}): EffectiveHost {
  return {
    name: "edge-1",
    address: over.address ?? "edge-1",
    tags: [],
    attrs: {},
    env: {},
    transport: {
      kind: "tailscale",
      user: over.user ?? "deploy",
      tailscaleBinary: over.tailscaleBinary,
      sshExtraArgs: over.sshExtraArgs ?? [],
    },
  };
}

// ---------------------------------------------------------------------------
// applySudo / scriptRemoteCommand
// ---------------------------------------------------------------------------

Deno.test("applySudo: prefixes sudo -n --", () => {
  assertEquals(applySudo("uptime", true), "sudo -n -- uptime");
  assertEquals(applySudo("uptime", false), "uptime");
  assertEquals(applySudo("uptime", undefined), "uptime");
});

Deno.test("scriptRemoteCommand: sh/bash use -s --, python3 uses -", () => {
  assertEquals(scriptRemoteCommand("sh", false), "sh -s --");
  assertEquals(scriptRemoteCommand("bash", false), "bash -s --");
  assertEquals(scriptRemoteCommand("python3", false), "python3 -");
  assertEquals(scriptRemoteCommand("bash", true), "sudo -n -- bash -s --");
});

// ---------------------------------------------------------------------------
// exec argv — ssh key auth
// ---------------------------------------------------------------------------

Deno.test("buildExecArgv: ssh key auth, multiplexed", () => {
  const argv = buildExecArgv(
    sshHost({ identityFile: "/key" }),
    "uptime",
    ctx({ controlPath: "/run/swamp-ssh/awesome/abc.sock" }),
  );
  assertEquals(argv[0], "ssh");
  assert(argv.includes("ControlMaster=auto"));
  assert(argv.includes("ControlPath=/run/swamp-ssh/awesome/abc.sock"));
  assert(argv.includes("ControlPersist=600"));
  assert(argv.includes("ConnectTimeout=10"));
  assert(argv.includes("-i"));
  assert(argv.includes("/key"));
  assert(argv.includes("-p"));
  assert(argv.includes("22"));
  assert(argv.includes("deploy@web-1.example.com"));
  assertEquals(argv[argv.length - 1], "uptime");
  // `--` must guard the destination from option parsing.
  const dashdash = argv.indexOf("--");
  assert(dashdash !== -1 && argv[dashdash + 1] === "deploy@web-1.example.com");
});

Deno.test("buildExecArgv: no ControlPath → no multiplexing options", () => {
  const argv = buildExecArgv(sshHost(), "uptime", ctx());
  assert(!argv.includes("ControlMaster=auto"));
  assert(!argv.some((a) => a.startsWith("ControlPath=")));
});

Deno.test("buildExecArgv: controlMaster disabled suppresses CM even with path", () => {
  const argv = buildExecArgv(
    sshHost({ cmEnabled: false }),
    "uptime",
    ctx({ controlPath: "/x.sock" }),
  );
  assert(!argv.includes("ControlMaster=auto"));
});

Deno.test("buildExecArgv: proxyJump, proxyCommand, extraOptions, knownHosts, strict", () => {
  const argv = buildExecArgv(
    sshHost({
      proxyJump: "deploy@bastion",
      proxyCommand: "aws ssm start-session --target i-abc",
      extraOptions: ["Compression=yes"],
      knownHostsFile: "/known",
      strictHostKeyChecking: "accept-new",
      identityAgent: "~/.1password/agent.sock",
      serverAliveIntervalSec: 30,
    }),
    "uptime",
    ctx(),
  );
  assert(argv.includes("-J"));
  assert(argv.includes("deploy@bastion"));
  assert(argv.includes("ProxyCommand=aws ssm start-session --target i-abc"));
  assert(argv.includes("Compression=yes"));
  assert(argv.includes("UserKnownHostsFile=/known"));
  assert(argv.includes("StrictHostKeyChecking=accept-new"));
  assert(argv.includes("IdentityAgent=~/.1password/agent.sock"));
  assert(argv.includes("ServerAliveInterval=30"));
});

Deno.test("buildExecArgv: identitiesOnly renders yes/no", () => {
  const argv = buildExecArgv(
    sshHost({ identitiesOnly: true }),
    "x",
    ctx(),
  );
  assert(argv.includes("IdentitiesOnly=yes"));
});

Deno.test("buildExecArgv: SendEnv per key", () => {
  const argv = buildExecArgv(
    sshHost(),
    "x",
    ctx({ sendEnvKeys: ["FOO", "BAR"] }),
  );
  assert(argv.includes("SendEnv=FOO"));
  assert(argv.includes("SendEnv=BAR"));
});

Deno.test("buildExecArgv: sudo-wrapped command", () => {
  const argv = buildExecArgv(
    sshHost(),
    applySudo("systemctl reload nginx", true),
    ctx(),
  );
  assertEquals(argv[argv.length - 1], "sudo -n -- systemctl reload nginx");
});

// ---------------------------------------------------------------------------
// exec argv — ssh password auth (sshpass)
// ---------------------------------------------------------------------------

Deno.test("buildExecArgv: password auth wraps in sshpass -e", () => {
  const argv = buildExecArgv(
    sshHost({ password: "hunter2" }),
    "uptime",
    ctx({ controlPath: "/x.sock" }),
  );
  assertEquals(argv[0], "sshpass");
  assertEquals(argv[1], "-e");
  assertEquals(argv[2], "ssh");
});

Deno.test("buildExecArgv: password NEVER appears in argv", () => {
  const argv = buildExecArgv(
    sshHost({ password: "hunter2" }),
    "uptime",
    ctx({ controlPath: "/x.sock" }),
  );
  assert(
    !argv.some((a) => a.includes("hunter2")),
    `password leaked into argv: ${JSON.stringify(argv)}`,
  );
});

// ---------------------------------------------------------------------------
// exec argv — tailscale
// ---------------------------------------------------------------------------

Deno.test("buildExecArgv: tailscale ssh shape, no ControlPath", () => {
  const argv = buildExecArgv(
    tailscaleHost(),
    "uptime",
    ctx({ controlPath: "/should-not-be-used.sock" }),
  );
  assertEquals(argv[0], "tailscale");
  assertEquals(argv[1], "ssh");
  assert(!argv.some((a) => a.startsWith("ControlPath=")));
  assert(argv.includes("deploy@edge-1"));
  assertEquals(argv[argv.length - 1], "uptime");
});

Deno.test("buildExecArgv: tailscale honors custom binary + extra args", () => {
  const argv = buildExecArgv(
    tailscaleHost({
      tailscaleBinary: "/opt/ts",
      sshExtraArgs: ["--accept-risk"],
    }),
    "uptime",
    ctx(),
  );
  assertEquals(argv[0], "/opt/ts");
  assert(argv.includes("--accept-risk"));
});

// ---------------------------------------------------------------------------
// copy argv — scp / rsync / tailscale
// ---------------------------------------------------------------------------

Deno.test("buildCopyArgv: scp to remote, multiplexed", () => {
  const argv = buildCopyArgv(
    sshHost({ identityFile: "/key" }),
    { src: "./nginx.conf", dst: "/etc/nginx/nginx.conf", direction: "to" },
    ctx({ controlPath: "/x.sock" }),
  );
  assertEquals(argv[0], "scp");
  assert(argv.includes("ControlPath=/x.sock"));
  assert(argv.includes("-P")); // scp uses capital P for port
  assertEquals(argv[argv.length - 2], "./nginx.conf");
  assertEquals(
    argv[argv.length - 1],
    "deploy@web-1.example.com:/etc/nginx/nginx.conf",
  );
});

Deno.test("buildCopyArgv: scp from remote reverses endpoints", () => {
  const argv = buildCopyArgv(
    sshHost(),
    { src: "/var/log/app.log", dst: "./app.log", direction: "from" },
    ctx(),
  );
  assertEquals(
    argv[argv.length - 2],
    "deploy@web-1.example.com:/var/log/app.log",
  );
  assertEquals(argv[argv.length - 1], "./app.log");
});

Deno.test("buildCopyArgv: scp recursive flag", () => {
  const argv = buildCopyArgv(
    sshHost(),
    { src: "./dir", dst: "/dir", direction: "to", recursive: true },
    ctx(),
  );
  assert(argv.includes("-r"));
});

Deno.test("buildCopyArgv: rsync over ssh with ControlPath in -e", () => {
  const argv = buildCopyArgv(
    sshHost({ identityFile: "/key", port: 2222 }),
    { src: "./d", dst: "/d", direction: "to", useRsync: true, recursive: true },
    ctx({ controlPath: "/x.sock" }),
  );
  assertEquals(argv[0], "rsync");
  assert(argv.includes("-az"));
  const eIdx = argv.indexOf("-e");
  assert(eIdx !== -1);
  const eArg = argv[eIdx + 1];
  assert(eArg.includes("ControlPath=/x.sock"));
  assert(eArg.includes("-i /key"));
  assert(eArg.includes("-p 2222"));
});

Deno.test("buildCopyArgv: tailscale scp via ProxyCommand nc", () => {
  const argv = buildCopyArgv(
    tailscaleHost(),
    { src: "./f", dst: "/f", direction: "to" },
    ctx(),
  );
  assertEquals(argv[0], "scp");
  assert(argv.includes("ProxyCommand=tailscale nc %h %p"));
  assertEquals(argv[argv.length - 1], "deploy@edge-1:/f");
});

Deno.test("buildCopyArgv: password auth wraps scp in sshpass", () => {
  const argv = buildCopyArgv(
    sshHost({ password: "pw" }),
    { src: "a", dst: "b", direction: "to" },
    ctx(),
  );
  assertEquals(argv[0], "sshpass");
  assert(!argv.some((a) => a.includes("pw")));
});

// ---------------------------------------------------------------------------
// spawnEnv / sendEnvKeys / forwardedEnv
// ---------------------------------------------------------------------------

Deno.test("spawnEnv: password auth sets SSHPASS, not forwarded", () => {
  const env = spawnEnv(sshHost({ password: "hunter2" }), { FOO: "bar" });
  assertEquals(env.SSHPASS, "hunter2");
  assertEquals(env.FOO, "bar");
});

Deno.test("spawnEnv: key auth has no SSHPASS", () => {
  const env = spawnEnv(sshHost(), { FOO: "bar" });
  assertEquals(env.SSHPASS, undefined);
});

Deno.test("sendEnvKeys: never includes SSHPASS", () => {
  const host = sshHost({ password: "x" });
  host.env = { APP_ENV: "prod" };
  const keys = sendEnvKeys(host, { EXTRA: "1" });
  assert(keys.includes("APP_ENV"));
  assert(keys.includes("EXTRA"));
  assert(!keys.includes("SSHPASS"));
});

Deno.test("forwardedEnv: method env wins over host env", () => {
  const host = sshHost();
  host.env = { K: "host" };
  assertEquals(forwardedEnv(host, { K: "method" }).K, "method");
});
