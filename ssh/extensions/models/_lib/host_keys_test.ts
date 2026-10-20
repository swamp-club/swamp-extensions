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

/**
 * Unit tests for host-key policy helpers: policy resolution and validation,
 * the per-call known_hosts format, pin naming, and OpenSSH failure parsing.
 *
 * @module
 */

import { assert, assertEquals, assertNotEquals } from "jsr:@std/assert@1.0.19";
import {
  computeFingerprint,
  effectiveHostKeyPolicy,
  hostKeyAlias,
  hostKeyChangedMessage,
  hostKeyPinName,
  hostKeyPolicyDigest,
  hostKeyPolicyIssues,
  isHostKeyFailure,
  knownHostsContent,
  parseKeyLine,
  parseKnownHosts,
  presentedFingerprint,
} from "./host_keys.ts";
import { type EffectiveTransport, mergeTransport } from "./hosts.ts";
import { TransportSchema } from "./schemas.ts";

type SshEffective = Extract<EffectiveTransport, { kind: "ssh" }>;

const KEY_A = `ssh-ed25519 ${btoa("host-key-a-bytes")} root@a`;
const KEY_B = `ssh-ed25519 ${btoa("host-key-b-bytes")}`;

function ssh(fields: Record<string, unknown>): SshEffective {
  const t = mergeTransport(TransportSchema.parse({ kind: "ssh", ...fields }));
  if (t.kind !== "ssh") throw new Error("expected ssh");
  return t;
}

/** OpenSSH's changed-key refusal, verbatim shape. */
const CHANGED_KEY_STDERR = [
  "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
  "@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @",
  "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
  "IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!",
  "Someone could be eavesdropping on you right now (man-in-the-middle attack)!",
  "It is also possible that a host key has just been changed.",
  "The fingerprint for the ED25519 key sent by the remote host is",
  "SHA256:Zm9vYmFyYmF6cXV4MTIzNDU2Nzg5MGFiY2RlZmdoaWo.",
  "Please contact your system administrator.",
  "Host key for swamp-0123456789abcdef has changed and you have requested strict checking.",
  "Host key verification failed.",
].join("\n");

Deno.test("effectiveHostKeyPolicy: hostKeys alone implies pinned", () => {
  assertEquals(effectiveHostKeyPolicy(ssh({ hostKeys: [KEY_A] })), "pinned");
  assertEquals(effectiveHostKeyPolicy(ssh({})), undefined);
  assertEquals(
    effectiveHostKeyPolicy(ssh({ hostKeyPolicy: "tofu" })),
    "tofu",
  );
});

Deno.test("hostKeyPolicyIssues: legacy settings are always valid", () => {
  assertEquals(
    hostKeyPolicyIssues(ssh({
      strictHostKeyChecking: "yes",
      knownHostsFile: "/kh",
    })),
    [],
  );
});

Deno.test("hostKeyPolicyIssues: rejects each incoherent combination", () => {
  const cases: [Record<string, unknown>, string][] = [
    [
      { hostKeyPolicy: "tofu", strictHostKeyChecking: "yes" },
      "mutually exclusive",
    ],
    [{ hostKeyPolicy: "pinned" }, "requires hostKeys"],
    [{ hostKeyPolicy: "tofu", hostKeys: [KEY_A] }, "only used with"],
    [{ hostKeyPolicy: "insecure", knownHostsFile: "/kh" }, "knownHostsFile"],
    [{ hostKeys: [KEY_A], knownHostsFile: "/kh" }, "knownHostsFile"],
    [
      { hostKeyPolicy: "tofu", extraOptions: ["KnownHostsCommand=/bin/x %H"] },
      "KnownHostsCommand",
    ],
  ];
  for (const [fields, needle] of cases) {
    const issues = hostKeyPolicyIssues(ssh(fields));
    assert(
      issues.some((i) => i.includes(needle)),
      `${JSON.stringify(fields)} → ${JSON.stringify(issues)}`,
    );
  }
});

Deno.test("hostKeyPolicyIssues: accept-new may name a knownHostsFile", () => {
  assertEquals(
    hostKeyPolicyIssues(ssh({
      hostKeyPolicy: "accept-new",
      knownHostsFile: "/kh",
    })),
    [],
  );
});

Deno.test("hostKeyAlias / hostKeyPinName: deterministic per address:port", async () => {
  assertEquals(
    await hostKeyAlias("10.0.0.1", 22),
    await hostKeyAlias("10.0.0.1", 22),
  );
  assertNotEquals(
    await hostKeyAlias("10.0.0.1", 22),
    await hostKeyAlias("10.0.0.1", 2222),
  );
  assert((await hostKeyAlias("h", 22)).startsWith("swamp-"));
  assert((await hostKeyPinName("h", 22)).startsWith("hostKeyPin-"));
  // Names carry only hex — safe as data names and as ssh host patterns.
  assert(/^hostKeyPin-[0-9a-f]{16}$/.test(await hostKeyPinName("h", 22)));
});

Deno.test("knownHostsContent / parseKnownHosts round-trip drops comments", () => {
  const keys = [parseKeyLine(KEY_A)!, parseKeyLine(KEY_B)!];
  const content = knownHostsContent("swamp-abc", keys);
  assertEquals(
    content,
    `swamp-abc ${KEY_A.replace(" root@a", "")}\nswamp-abc ${KEY_B}\n`,
  );
  assertEquals(parseKnownHosts(content), keys);
});

Deno.test("parseKnownHosts: skips blanks, comments and marker lines", () => {
  const content = [
    "",
    "# comment",
    `@revoked swamp-abc ${KEY_B}`,
    `swamp-abc ${KEY_A}`,
  ].join("\n");
  const keys = parseKnownHosts(content);
  assertEquals(keys.length, 1);
  assertEquals(keys[0].publicKey, KEY_A.replace(" root@a", ""));
});

Deno.test("isHostKeyFailure / presentedFingerprint: parse OpenSSH refusal", () => {
  assert(isHostKeyFailure(CHANGED_KEY_STDERR));
  assert(isHostKeyFailure("Host key verification failed.\n"));
  assert(!isHostKeyFailure("Permission denied (publickey)."));
  assert(!isHostKeyFailure(undefined));
  assertEquals(
    presentedFingerprint(CHANGED_KEY_STDERR),
    "SHA256:Zm9vYmFyYmF6cXV4MTIzNDU2Nzg5MGFiY2RlZmdoaWo",
  );
  assertEquals(
    presentedFingerprint("Host key verification failed."),
    undefined,
  );
});

Deno.test("hostKeyChangedMessage: names both fingerprints", () => {
  assertEquals(
    hostKeyChangedMessage("10.0.0.1", 22, ["SHA256:a"], "SHA256:b"),
    "host key changed for 10.0.0.1:22: pinned SHA256:a, presented SHA256:b",
  );
  assertEquals(
    hostKeyChangedMessage("h", 2222, [], undefined),
    "host key changed for h:2222: pinned (none), presented unknown",
  );
});

Deno.test("computeFingerprint: OpenSSH SHA256 format, unpadded", async () => {
  const fp = await computeFingerprint(btoa("host-key-a-bytes"));
  assert(/^SHA256:[A-Za-z0-9+/]+$/.test(fp), fp);
});

Deno.test("hostKeyPolicyDigest: legacy undefined, pinned order-insensitive", () => {
  assertEquals(hostKeyPolicyDigest(ssh({})), undefined);
  assertEquals(hostKeyPolicyDigest(ssh({ hostKeyPolicy: "tofu" })), "tofu");
  assertEquals(
    hostKeyPolicyDigest(ssh({ hostKeys: [KEY_A, KEY_B] })),
    hostKeyPolicyDigest(ssh({ hostKeys: [KEY_B, KEY_A] })),
  );
  assertNotEquals(
    hostKeyPolicyDigest(ssh({ hostKeys: [KEY_A] })),
    hostKeyPolicyDigest(ssh({ hostKeys: [KEY_B] })),
  );
});
