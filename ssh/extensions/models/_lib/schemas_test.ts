// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import { assert, assertEquals } from "jsr:@std/assert@1.0.19";
import {
  AuthSchema,
  CollectHostPublicKeyArgsSchema,
  CopyArgsSchema,
  ExecArgsSchema,
  ForwardArgsSchema,
  GlobalArgsSchema,
  HostSchema,
  OkExitCodesSchema,
  ScriptArgsSchema,
  SelectorSchema,
  TargetingSchema,
  TransportOverrideSchema,
  TransportSchema,
} from "./schemas.ts";

// ---------------------------------------------------------------------------
// AuthSchema
// ---------------------------------------------------------------------------

Deno.test("AuthSchema: 'key' is the default-shape variant", () => {
  const parsed = AuthSchema.parse({ kind: "key" });
  assertEquals(parsed, { kind: "key" });
});

Deno.test("AuthSchema: 'password' requires non-empty password", () => {
  const ok = AuthSchema.parse({ kind: "password", password: "s3cr3t" });
  assertEquals(ok.kind, "password");

  assert(!AuthSchema.safeParse({ kind: "password" }).success);
  assert(!AuthSchema.safeParse({ kind: "password", password: "" }).success);
});

Deno.test("AuthSchema: rejects unknown kind", () => {
  assert(!AuthSchema.safeParse({ kind: "other" }).success);
});

// ---------------------------------------------------------------------------
// TransportSchema (ssh)
// ---------------------------------------------------------------------------

Deno.test("TransportSchema (ssh): minimal config fills defaults", () => {
  const t = TransportSchema.parse({ kind: "ssh" });
  assertEquals(t.kind, "ssh");
  if (t.kind !== "ssh") throw new Error("unreachable");
  assertEquals(t.port, 22);
  assertEquals(t.connectTimeoutSec, 10);
  assertEquals(t.auth, { kind: "key" });
  assertEquals(t.extraOptions, []);
  assertEquals(t.controlMaster.enabled, true);
  assertEquals(t.controlMaster.persistSec, 600);
});

Deno.test("TransportSchema (ssh): rejects newline in identityFile", () => {
  const r = TransportSchema.safeParse({
    kind: "ssh",
    identityFile: "/tmp/key\nrm -rf /",
  });
  assert(!r.success);
});

Deno.test("TransportSchema (ssh): rejects NUL in proxyCommand", () => {
  const r = TransportSchema.safeParse({
    kind: "ssh",
    proxyCommand: "aws ssm start-session\x00--target i-abc",
  });
  assert(!r.success);
});

Deno.test("TransportSchema (ssh): port range enforced", () => {
  assert(!TransportSchema.safeParse({ kind: "ssh", port: 0 }).success);
  assert(!TransportSchema.safeParse({ kind: "ssh", port: 70000 }).success);
});

Deno.test("TransportSchema (ssh): extraOptions array entries validated", () => {
  const ok = TransportSchema.safeParse({
    kind: "ssh",
    extraOptions: ["Foo=Bar", "Baz=Qux"],
  });
  assert(ok.success);

  const bad = TransportSchema.safeParse({
    kind: "ssh",
    extraOptions: ["Foo=Bar\nMaliciousOption=yes"],
  });
  assert(!bad.success);
});

// ---------------------------------------------------------------------------
// TransportSchema (ssh) — identityContent
// ---------------------------------------------------------------------------

Deno.test("TransportSchema (ssh): identityContent accepted alone", () => {
  const t = TransportSchema.parse({
    kind: "ssh",
    identityContent:
      "-----BEGIN OPENSSH PRIVATE KEY-----\nfake\n-----END OPENSSH PRIVATE KEY-----",
  });
  if (t.kind !== "ssh") throw new Error("unreachable");
  assertEquals(
    t.identityContent,
    "-----BEGIN OPENSSH PRIVATE KEY-----\nfake\n-----END OPENSSH PRIVATE KEY-----",
  );
  assertEquals(t.identityFile, undefined);
});

Deno.test("TransportSchema (ssh): identityFile and identityContent mutually exclusive", () => {
  const r = TransportSchema.safeParse({
    kind: "ssh",
    identityFile: "/tmp/key",
    identityContent:
      "-----BEGIN OPENSSH PRIVATE KEY-----\nfake\n-----END OPENSSH PRIVATE KEY-----",
  });
  assert(!r.success);
});

Deno.test("TransportSchema (ssh): identityContent empty string rejected", () => {
  const r = TransportSchema.safeParse({
    kind: "ssh",
    identityContent: "",
  });
  assert(!r.success);
});

Deno.test("TransportSchema (ssh): neither identityFile nor identityContent is fine", () => {
  const t = TransportSchema.parse({ kind: "ssh" });
  if (t.kind !== "ssh") throw new Error("unreachable");
  assertEquals(t.identityFile, undefined);
  assertEquals(t.identityContent, undefined);
});

Deno.test("TransportOverrideSchema: identityContent accepted", () => {
  const r = TransportOverrideSchema.parse({
    identityContent: "PEM-CONTENT",
  });
  assertEquals(r.identityContent, "PEM-CONTENT");
});

Deno.test("TransportOverrideSchema: identityFile and identityContent mutually exclusive", () => {
  const r = TransportOverrideSchema.safeParse({
    identityFile: "/tmp/key",
    identityContent: "PEM-CONTENT",
  });
  assert(!r.success);
});

// ---------------------------------------------------------------------------
// TransportSchema (tailscale)
// ---------------------------------------------------------------------------

Deno.test("TransportSchema (tailscale): minimal config", () => {
  const t = TransportSchema.parse({ kind: "tailscale" });
  assertEquals(t.kind, "tailscale");
  if (t.kind !== "tailscale") throw new Error("unreachable");
  assertEquals(t.sshExtraArgs, []);
});

Deno.test("TransportSchema (tailscale): rejects ControlMaster knob", () => {
  // The tailscale variant doesn't have controlMaster in its surface.
  // Zod's strict-mode default for discriminated unions accepts unknown keys
  // (passthrough) — what matters is that runtime code never consults them.
  // This is a contract test: confirm shape.
  const t = TransportSchema.parse({
    kind: "tailscale",
    user: "deploy",
  });
  assert(!("controlMaster" in t));
});

// ---------------------------------------------------------------------------
// TransportOverrideSchema
// ---------------------------------------------------------------------------

Deno.test("TransportOverrideSchema: empty object is valid (no override)", () => {
  const ok = TransportOverrideSchema.safeParse({});
  assert(ok.success);
});

Deno.test("TransportOverrideSchema: partial fields allowed", () => {
  const r = TransportOverrideSchema.parse({
    proxyJump: "user@bastion",
    port: 2222,
  });
  assertEquals(r.proxyJump, "user@bastion");
  assertEquals(r.port, 2222);
});

Deno.test("TransportOverrideSchema: kind may flip to tailscale", () => {
  const r = TransportOverrideSchema.parse({ kind: "tailscale" });
  assertEquals(r.kind, "tailscale");
});

// ---------------------------------------------------------------------------
// HostSchema
// ---------------------------------------------------------------------------

Deno.test("HostSchema: minimal host", () => {
  const h = HostSchema.parse({ name: "web-1", address: "10.0.0.1" });
  assertEquals(h.name, "web-1");
  assertEquals(h.address, "10.0.0.1");
  assertEquals(h.tags, []);
  assertEquals(h.attrs, {});
});

Deno.test("HostSchema: rejects bad name characters", () => {
  assert(!HostSchema.safeParse({ name: "web 1", address: "x" }).success);
  assert(!HostSchema.safeParse({ name: "-web", address: "x" }).success);
  assert(!HostSchema.safeParse({ name: "", address: "x" }).success);
});

Deno.test("HostSchema: address must not contain newlines", () => {
  assert(
    !HostSchema.safeParse({ name: "web", address: "1.2.3.4\n5.6.7.8" })
      .success,
  );
});

Deno.test("HostSchema: attrs accepts arbitrary values", () => {
  const h = HostSchema.parse({
    name: "web-1",
    address: "10.0.0.1",
    attrs: { region: "us-east-1", count: 3, flag: true, list: [1, 2] },
  });
  assertEquals(h.attrs.region, "us-east-1");
  assertEquals(h.attrs.count, 3);
});

// ---------------------------------------------------------------------------
// SelectorSchema
// ---------------------------------------------------------------------------

Deno.test("SelectorSchema: 'all' literal", () => {
  assertEquals(SelectorSchema.parse("all"), "all");
});

Deno.test("SelectorSchema: name list", () => {
  assertEquals(SelectorSchema.parse(["web-1", "web-2"]), ["web-1", "web-2"]);
});

Deno.test("SelectorSchema: bare CEL string", () => {
  assertEquals(
    SelectorSchema.parse('"prod" in host.tags'),
    '"prod" in host.tags',
  );
});

Deno.test("SelectorSchema: empty list rejected", () => {
  assert(!SelectorSchema.safeParse([]).success);
});

Deno.test("SelectorSchema: empty string rejected", () => {
  assert(!SelectorSchema.safeParse("").success);
});

// ---------------------------------------------------------------------------
// TargetingSchema
// ---------------------------------------------------------------------------

Deno.test("TargetingSchema: hosts is required", () => {
  assert(!TargetingSchema.safeParse({}).success);
});

Deno.test("TargetingSchema: per-call overrides parse", () => {
  const t = TargetingSchema.parse({
    hosts: "all",
    parallel: 4,
    timeoutSec: 60,
    captureOutput: false,
    failFast: true,
  });
  assertEquals(t.parallel, 4);
  assertEquals(t.captureOutput, false);
});

// ---------------------------------------------------------------------------
// GlobalArgsSchema
// ---------------------------------------------------------------------------

Deno.test("GlobalArgsSchema: minimal valid config", () => {
  const g = GlobalArgsSchema.parse({
    name: "fleet1",
    transport: { kind: "ssh" },
    hosts: [{ name: "h1", address: "1.1.1.1" }],
  });
  assertEquals(g.defaultParallel, 8);
  assertEquals(g.defaultTimeoutSec, 300);
  assertEquals(g.captureOutput, true);
  assertEquals(g.sshpassBinary, "sshpass");
});

Deno.test("GlobalArgsSchema: hosts must be non-empty", () => {
  assert(
    !GlobalArgsSchema.safeParse({
      name: "fleet1",
      transport: { kind: "ssh" },
      hosts: [],
    }).success,
  );
});

Deno.test("GlobalArgsSchema: defaults preserved when partial input", () => {
  const g = GlobalArgsSchema.parse({
    name: "fleet1",
    transport: { kind: "tailscale" },
    hosts: [{ name: "h1", address: "tail-1" }],
    defaultParallel: 32,
  });
  assertEquals(g.defaultParallel, 32);
  assertEquals(g.runHistory, 50);
});

// ---------------------------------------------------------------------------
// Method-arg schemas
// ---------------------------------------------------------------------------

Deno.test("ExecArgsSchema: minimal valid", () => {
  const e = ExecArgsSchema.parse({ hosts: "all", command: "uptime" });
  assertEquals(e.command, "uptime");
});

Deno.test("ExecArgsSchema: empty command rejected", () => {
  assert(!ExecArgsSchema.safeParse({ hosts: "all", command: "" }).success);
});

Deno.test("ScriptArgsSchema: interpreter defaults to sh", () => {
  const s = ScriptArgsSchema.parse({ hosts: "all", script: "echo hi" });
  assertEquals(s.interpreter, "sh");
});

Deno.test("ScriptArgsSchema: rejects unknown interpreter", () => {
  assert(
    !ScriptArgsSchema.safeParse({
      hosts: "all",
      script: "echo hi",
      interpreter: "fish",
    }).success,
  );
});

// ---------------------------------------------------------------------------
// okExitCodes (exec + script only)
// ---------------------------------------------------------------------------

Deno.test("okExitCodes: omitted leaves the field undefined on both methods", () => {
  const e = ExecArgsSchema.parse({ hosts: "all", command: "uptime" });
  assertEquals(e.okExitCodes, undefined);
  const s = ScriptArgsSchema.parse({ hosts: "all", script: "echo hi" });
  assertEquals(s.okExitCodes, undefined);
});

Deno.test("okExitCodes: accepts 'any' on both methods", () => {
  const e = ExecArgsSchema.parse({
    hosts: "all",
    command: "uptime",
    okExitCodes: "any",
  });
  assertEquals(e.okExitCodes, "any");
  const s = ScriptArgsSchema.parse({
    hosts: "all",
    script: "echo hi",
    okExitCodes: "any",
  });
  assertEquals(s.okExitCodes, "any");
});

Deno.test("okExitCodes: accepts a code array on both methods", () => {
  const e = ExecArgsSchema.parse({
    hosts: "all",
    command: "test -f /etc/hosts",
    okExitCodes: [0, 1],
  });
  assertEquals(e.okExitCodes, [0, 1]);
  const s = ScriptArgsSchema.parse({
    hosts: "all",
    script: "exit 2",
    okExitCodes: [0, 2],
  });
  assertEquals(s.okExitCodes, [0, 2]);
});

Deno.test("okExitCodes: empty array rejected", () => {
  assert(
    !ExecArgsSchema.safeParse({
      hosts: "all",
      command: "uptime",
      okExitCodes: [],
    }).success,
  );
});

Deno.test("okExitCodes: non-integer and out-of-range codes rejected", () => {
  for (const bad of [[1.5], [-1], [256], ["1"], [null]]) {
    assert(
      !ExecArgsSchema.safeParse({
        hosts: "all",
        command: "uptime",
        okExitCodes: bad,
      }).success,
      `expected ${JSON.stringify(bad)} to be rejected`,
    );
  }
  // Boundary values are legal.
  assertEquals(
    ExecArgsSchema.parse({
      hosts: "all",
      command: "uptime",
      okExitCodes: [0, 255],
    }).okExitCodes,
    [0, 255],
  );
});

Deno.test("okExitCodes: rejects unknown string literals", () => {
  assert(
    !ExecArgsSchema.safeParse({
      hosts: "all",
      command: "uptime",
      okExitCodes: "all",
    }).success,
  );
});

Deno.test("okExitCodes: OkExitCodesSchema validates standalone values", () => {
  assertEquals(OkExitCodesSchema.parse("any"), "any");
  assertEquals(OkExitCodesSchema.parse([0, 1, 255]), [0, 1, 255]);
  assert(!OkExitCodesSchema.safeParse([]).success);
  assert(!OkExitCodesSchema.safeParse(0).success);
});

Deno.test("okExitCodes: not accepted on copy or the shared targeting shape", () => {
  // Zod objects strip unknown keys rather than erroring, so assert absence:
  // widening success criteria must not leak to methods that never opted in.
  const c = CopyArgsSchema.parse({
    hosts: "all",
    src: "a",
    dst: "b",
    direction: "to",
    okExitCodes: "any",
  }) as Record<string, unknown>;
  assertEquals(c.okExitCodes, undefined);

  const t = TargetingSchema.parse({
    hosts: "all",
    okExitCodes: [0, 1],
  }) as Record<string, unknown>;
  assertEquals(t.okExitCodes, undefined);
});

Deno.test("CopyArgsSchema: direction required", () => {
  assert(
    !CopyArgsSchema.safeParse({
      hosts: "all",
      src: "a",
      dst: "b",
    }).success,
  );
});

Deno.test("CopyArgsSchema: direction must be to or from", () => {
  assert(
    !CopyArgsSchema.safeParse({
      hosts: "all",
      src: "a",
      dst: "b",
      direction: "either",
    }).success,
  );
});

// ---------------------------------------------------------------------------
// ForwardArgsSchema
// ---------------------------------------------------------------------------

Deno.test("ForwardArgsSchema: open requires spec", () => {
  const ok = ForwardArgsSchema.safeParse({
    hosts: "all",
    action: "open",
    spec: "9090:localhost:9090",
  });
  assert(ok.success);

  const bad = ForwardArgsSchema.safeParse({
    hosts: "all",
    action: "open",
  });
  assert(!bad.success);
});

Deno.test("ForwardArgsSchema: list does not require spec", () => {
  const ok = ForwardArgsSchema.safeParse({ hosts: "all", action: "list" });
  assert(ok.success);
});

Deno.test("ForwardArgsSchema: bad spec rejected", () => {
  assert(
    !ForwardArgsSchema.safeParse({
      hosts: "all",
      action: "open",
      spec: "not-a-spec",
    }).success,
  );
});

Deno.test("ForwardArgsSchema: type defaults to L", () => {
  const f = ForwardArgsSchema.parse({
    hosts: "all",
    action: "open",
    spec: "8000:127.0.0.1:8000",
  });
  assertEquals(f.type, "L");
});

// ---------------------------------------------------------------------------
// CollectHostPublicKeyArgsSchema
// ---------------------------------------------------------------------------

Deno.test("CollectHostPublicKeyArgsSchema: defaults hostKeyPath", () => {
  const c = CollectHostPublicKeyArgsSchema.parse({ hosts: "all" });
  assertEquals(c.hostKeyPath, "/etc/ssh/ssh_host_ed25519_key.pub");
});

Deno.test("CollectHostPublicKeyArgsSchema: accepts custom hostKeyPath", () => {
  const c = CollectHostPublicKeyArgsSchema.parse({
    hosts: ["web-1"],
    hostKeyPath: "/etc/ssh/ssh_host_rsa_key.pub",
  });
  assertEquals(c.hostKeyPath, "/etc/ssh/ssh_host_rsa_key.pub");
});

Deno.test("CollectHostPublicKeyArgsSchema: rejects empty hostKeyPath", () => {
  assert(
    !CollectHostPublicKeyArgsSchema.safeParse({
      hosts: "all",
      hostKeyPath: "",
    }).success,
  );
});

Deno.test("CollectHostPublicKeyArgsSchema: hosts is required", () => {
  assert(!CollectHostPublicKeyArgsSchema.safeParse({}).success);
});

// ---------------------------------------------------------------------------
// Host-key policy (swamp-club #3581)
// ---------------------------------------------------------------------------

const HOST_KEY = `ssh-ed25519 ${btoa("host-key-bytes")} root@web-1`;

function fleetWith(
  transport: Record<string, unknown>,
  hostTransport?: Record<string, unknown>,
) {
  return {
    name: "f",
    transport: { kind: "ssh", ...transport },
    hosts: [
      { name: "a", address: "10.0.0.1" },
      {
        name: "b",
        address: "10.0.0.2",
        ...(hostTransport ? { transport: hostTransport } : {}),
      },
    ],
  };
}

Deno.test("GlobalArgsSchema: hostKeys + pinned validates; legacy fleet unchanged", () => {
  assert(
    GlobalArgsSchema.safeParse(fleetWith({ hostKeys: [HOST_KEY] })).success,
  );
  assert(
    GlobalArgsSchema.safeParse(fleetWith({ hostKeyPolicy: "tofu" })).success,
  );
  assert(
    GlobalArgsSchema.safeParse(fleetWith({ strictHostKeyChecking: "yes" }))
      .success,
  );
});

Deno.test("GlobalArgsSchema: host-key conflict reports the merged host's path", () => {
  // Fleet sets a policy; host b re-introduces strictHostKeyChecking.
  const r = GlobalArgsSchema.safeParse(
    fleetWith({ hostKeyPolicy: "tofu" }, { strictHostKeyChecking: "no" }),
  );
  assert(!r.success);
  const issue = r.error.issues.find((i) => i.message.includes("host 'b'"));
  assert(issue !== undefined, JSON.stringify(r.error.issues));
  assertEquals(issue.path, ["hosts", 1, "transport"]);
  assert(issue.message.includes("mutually exclusive"));
  // Host a merges cleanly — no issue for it.
  assert(!r.error.issues.some((i) => i.message.includes("host 'a'")));
});

Deno.test("GlobalArgsSchema: pinned without hostKeys is rejected", () => {
  const r = GlobalArgsSchema.safeParse(fleetWith({ hostKeyPolicy: "pinned" }));
  assert(!r.success);
  assert(r.error.issues.some((i) => i.message.includes("requires hostKeys")));
});

Deno.test("GlobalArgsSchema: host flipping to tailscale ignores fleet host-key policy", () => {
  assert(
    GlobalArgsSchema.safeParse(
      fleetWith({ hostKeyPolicy: "pinned", hostKeys: [HOST_KEY] }, {
        kind: "tailscale",
      }),
    ).success,
  );
});

Deno.test("TransportSchema: hostKeys entries must be single valid key lines", () => {
  const bad = [
    "not-a-key",
    `ssh-unknown ${btoa("x")}`,
    `ssh-ed25519 ${btoa("x")}\nssh-ed25519 ${btoa("y")}`,
    `ssh-ed25519 not base64!`,
  ];
  for (const k of bad) {
    assert(
      !TransportSchema.safeParse({ kind: "ssh", hostKeys: [k] }).success,
      k,
    );
  }
  assert(
    !TransportSchema.safeParse({ kind: "ssh", hostKeys: [] }).success,
    "empty list",
  );
});

Deno.test("GlobalArgsSchema: identityContentMode defaults to auto", () => {
  const g = GlobalArgsSchema.parse(fleetWith({}));
  assertEquals(g.identityContentMode, "auto");
  assertEquals(g.sshAgentBinary, "ssh-agent");
  assertEquals(g.sshAddBinary, "ssh-add");
});

// ---------------------------------------------------------------------------
// exec argv / atomic copy (swamp-club #3581)
// ---------------------------------------------------------------------------

Deno.test("ExecArgsSchema: exactly one of command or argv", () => {
  assert(ExecArgsSchema.safeParse({ hosts: "all", command: "ls" }).success);
  assert(
    ExecArgsSchema.safeParse({ hosts: "all", argv: ["ls", "-l"] }).success,
  );
  assert(!ExecArgsSchema.safeParse({ hosts: "all" }).success);
  assert(
    !ExecArgsSchema.safeParse({ hosts: "all", command: "ls", argv: ["ls"] })
      .success,
  );
  assert(!ExecArgsSchema.safeParse({ hosts: "all", argv: [] }).success);
  assert(!ExecArgsSchema.safeParse({ hosts: "all", argv: ["a\0b"] }).success);
});

Deno.test("CopyArgsSchema: atomic accepts mode/owner/verifySha256", () => {
  assert(
    CopyArgsSchema.safeParse({
      hosts: "all",
      src: "./f",
      dst: "/etc/f.conf",
      direction: "to",
      atomic: true,
      mode: "0644",
      owner: "root:root",
      verifySha256: true,
    }).success,
  );
});

Deno.test("CopyArgsSchema: atomic-only options and atomic constraints", () => {
  const base = { hosts: "all", src: "./f", dst: "/etc/f", direction: "to" };
  const rejected: Record<string, unknown>[] = [
    { mode: "0644" },
    { owner: "root" },
    { verifySha256: true },
    { atomic: true, direction: "from" },
    { atomic: true, recursive: true },
    { atomic: true, dst: "/etc/" },
    { atomic: true, dst: "~/app.conf" },
    { atomic: true, mode: "644x" },
    { atomic: true, owner: "root;rm" },
  ];
  for (const over of rejected) {
    assert(
      !CopyArgsSchema.safeParse({ ...base, ...over }).success,
      JSON.stringify(over),
    );
  }
  // verifySha256: false without atomic is harmless.
  assert(CopyArgsSchema.safeParse({ ...base, verifySha256: false }).success);
});
