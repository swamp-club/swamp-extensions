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
 * Host-key policy helpers: which policy a host resolves to, the per-call
 * known_hosts file format, pin naming, and recognising OpenSSH's host-key
 * failure output.
 *
 * Pinned and tofu hosts verify against a per-call known_hosts file written
 * under a deterministic `HostKeyAlias`. The alias makes the lookup
 * independent of the runner's ssh_config (`HostName` mappings,
 * `ProxyCommand`) and of OpenSSH's `[host]:port` bracket rules.
 *
 * A ControlMaster opened by a call (`open`, or ControlPersist) outlives that
 * call's known_hosts file. That is safe: on rekey OpenSSH checks the server's
 * key against the one cached from the initial key exchange and does not
 * re-read known_hosts (verified with forced rekeys on OpenSSH 8.0p1, RHEL 8).
 *
 * Type-only imports from schemas.ts/hosts.ts: schemas.ts imports this module
 * for validation, so a value import back would be a runtime cycle.
 *
 * @module
 */

import type { EffectiveTransport } from "./hosts.ts";
import type { HostKeyPolicy } from "./schemas.ts";
import { toHex } from "./hex.ts";

type SshEffective = Extract<EffectiveTransport, { kind: "ssh" }>;

/** Per-call host-key verification inputs handed to argv assembly. */
export interface HostKeyArgv {
  /** true → StrictHostKeyChecking=yes; false → accept-new (tofu first contact). */
  strict: boolean;
  knownHostsFile: string;
  alias: string;
}

/** `hostKeyPolicy`, or `pinned` when only `hostKeys` is set. */
export function effectiveHostKeyPolicy(
  t: SshEffective,
): HostKeyPolicy | undefined {
  return t.hostKeyPolicy ?? (t.hostKeys !== undefined ? "pinned" : undefined);
}

/** Policies verified against a per-call known_hosts file. */
export function usesPerCallKnownHosts(
  policy: HostKeyPolicy | undefined,
): policy is "pinned" | "tofu" {
  return policy === "pinned" || policy === "tofu";
}

/**
 * Validation messages for a merged ssh transport's host-key settings. Empty
 * when the combination is coherent. Legacy settings (no policy, no hostKeys)
 * are always valid.
 */
export function hostKeyPolicyIssues(t: SshEffective): string[] {
  const policy = effectiveHostKeyPolicy(t);
  if (policy === undefined) return [];
  const issues: string[] = [];
  if (t.strictHostKeyChecking !== undefined) {
    issues.push(
      "hostKeyPolicy and strictHostKeyChecking are mutually exclusive — " +
        "set the policy instead",
    );
  }
  if (policy === "pinned" && t.hostKeys === undefined) {
    issues.push("hostKeyPolicy 'pinned' requires hostKeys");
  }
  if (policy !== "pinned" && t.hostKeys !== undefined) {
    issues.push(
      `hostKeys is only used with hostKeyPolicy 'pinned', not '${policy}'`,
    );
  }
  if (
    usesPerCallKnownHosts(policy) &&
    t.extraOptions.some((o) => /^\s*knownhostscommand\b/i.test(o))
  ) {
    issues.push(
      `extraOptions KnownHostsCommand would add key sources to hostKeyPolicy '${policy}'`,
    );
  }
  if (policy !== "accept-new" && t.knownHostsFile !== undefined) {
    issues.push(
      `knownHostsFile is only used with hostKeyPolicy 'accept-new', not '${policy}'`,
    );
  }
  return issues;
}

async function sha256Hex(value: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(value),
  );
  return toHex(new Uint8Array(digest));
}

/** Stable short digest of `address:port`, shared by alias and pin name. */
async function endpointDigest(address: string, port: number): Promise<string> {
  return (await sha256Hex(`${address}:${port}`)).slice(0, 16);
}

/** The `HostKeyAlias` ssh looks the key up under for this endpoint. */
export async function hostKeyAlias(
  address: string,
  port: number,
): Promise<string> {
  return `swamp-${await endpointDigest(address, port)}`;
}

/** Instance name of the tofu pin resource for this endpoint. */
export async function hostKeyPinName(
  address: string,
  port: number,
): Promise<string> {
  return `hostKeyPin-${await endpointDigest(address, port)}`;
}

/** A public key reduced to the fields ssh compares. */
export interface ParsedKey {
  algorithm: string;
  base64Data: string;
  /** `<algorithm> <base64>` — comment dropped. */
  publicKey: string;
}

/** Parse `<algorithm> <base64> [comment]`. Returns null when malformed. */
export function parseKeyLine(line: string): ParsedKey | null {
  const parts = line.trim().split(/\s+/);
  if (parts.length < 2 || parts[0] === "" || parts[1] === "") return null;
  return {
    algorithm: parts[0],
    base64Data: parts[1],
    publicKey: `${parts[0]} ${parts[1]}`,
  };
}

/** known_hosts content pinning `keys` under `alias`. */
export function knownHostsContent(alias: string, keys: ParsedKey[]): string {
  return keys.map((k) => `${alias} ${k.publicKey}\n`).join("");
}

/**
 * Keys recorded in a known_hosts file (`<host> <algorithm> <base64> ...`).
 * Comments, blank lines and marker lines (`@revoked`, `@cert-authority`)
 * are skipped — the per-call file only ever holds plain entries.
 */
export function parseKnownHosts(content: string): ParsedKey[] {
  const keys: ParsedKey[] = [];
  for (const raw of content.split("\n")) {
    const line = raw.trim();
    if (line === "" || line.startsWith("#") || line.startsWith("@")) continue;
    const firstSpace = line.indexOf(" ");
    if (firstSpace < 0) continue;
    const parsed = parseKeyLine(line.slice(firstSpace + 1));
    if (parsed) keys.push(parsed);
  }
  return keys;
}

/** OpenSSH-style `SHA256:<unpadded base64>` fingerprint of a key blob. */
export async function computeFingerprint(base64Data: string): Promise<string> {
  const raw = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));
  const hash = new Uint8Array(await crypto.subtle.digest("SHA-256", raw));
  const b64 = btoa(String.fromCharCode(...hash)).replace(/=+$/, "");
  return `SHA256:${b64}`;
}

const HOST_KEY_FAILURE_RE =
  /REMOTE HOST IDENTIFICATION HAS CHANGED|Host key verification failed/;
const PRESENTED_FP_RE =
  /key sent by the remote host is\s+(SHA256:[A-Za-z0-9+/]+)/;

/** Did ssh refuse the connection over the host key? */
export function isHostKeyFailure(stderr: string | undefined): boolean {
  return stderr !== undefined && HOST_KEY_FAILURE_RE.test(stderr);
}

/** The fingerprint ssh says the server presented, when it printed one. */
export function presentedFingerprint(
  stderr: string | undefined,
): string | undefined {
  return stderr?.match(PRESENTED_FP_RE)?.[1];
}

/** The stable error recorded on a host whose key does not match its pin. */
export function hostKeyChangedMessage(
  address: string,
  port: number,
  pinned: readonly string[],
  presented: string | undefined,
): string {
  return `host key changed for ${address}:${port}: pinned ${
    pinned.length > 0 ? pinned.join(", ") : "(none)"
  }, presented ${presented ?? "unknown"}`;
}

/**
 * Digest input folded into the ControlPath so a master opened under one
 * host-key policy is never reused under another. Only configuration known
 * before the call counts: a tofu pin is written after first contact, and
 * including it would orphan the master that first contact opened (which
 * verified exactly the key that was then pinned). Undefined for legacy hosts
 * so their socket path is unchanged.
 */
export function hostKeyPolicyDigest(t: SshEffective): string | undefined {
  const policy = effectiveHostKeyPolicy(t);
  if (policy === undefined) return undefined;
  if (policy === "accept-new") return `accept-new:${t.knownHostsFile ?? ""}`;
  if (policy !== "pinned") return policy;
  const keys = (t.hostKeys ?? [])
    .map((l) => parseKeyLine(l)?.publicKey ?? l)
    .sort();
  return `pinned:${keys.join(",")}`;
}
