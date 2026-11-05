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
 * Schemas for the *sshole (OpenSSH musl password-bypass) scan results.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";

export const RiskLevel = z.enum([
  "critical",
  "high",
  "medium",
  "low",
  "none",
  "unknown",
]);

export const HostAction = z.enum([
  "none",
  "upgrade",
  "disable-password-auth",
  "enable-pam",
  "rebuild-image",
  "needs-privilege",
]);

/** How each precondition for the bypass was decided on the host. */
export const Signal = z.enum(["yes", "no", "unknown"]);

/** A stored-hash locked account whose shadow field is exactly "*". */
export const StarAccountSchema = z.object({
  user: z.string(),
  uid: z.number().nullable(),
  shell: z.string().nullable(),
  /** The account can reach a shell or privilege escalation once logged in. */
  loginCapable: z.boolean(),
  /** False when a root account is shielded by PermitRootLogin != yes. */
  reachable: z.boolean(),
  note: z.string(),
});

/** The headline answer: is this target exposed to the bypass? */
export const Verdict = z.enum(["vulnerable", "not-vulnerable", "unknown"]);

export const StatusSchema = z.object({
  scanTimestamp: z.string(),
  target: z.string(),
  hostname: z.string(),
  os: z.object({
    id: z.string(),
    versionId: z.string(),
    prettyName: z.string(),
  }),
  inContainer: z.boolean(),
  runAsRoot: z.boolean(),
  probe: z.enum(["sh", "none"]),
  cve: z.string(),
  // The preconditions for the bypass.
  libc: z.enum(["musl", "glibc", "other", "unknown"]),
  openSshVersion: z.string().nullable(),
  pkgManager: z.enum(["apk", "apt", "rpm", "opkg", "xbps", "none"]),
  pkgRelease: z.string().nullable(),
  distroFixedRelease: z.string().nullable().describe(
    "First package release that carries the fix for this distro branch, when known",
  ),
  versionVulnerable: Signal,
  usesPam: Signal,
  sshdLinksPam: Signal,
  pamPackageInstalled: Signal,
  passwordAuth: Signal,
  permitRootLogin: z.string(),
  seedHash: Signal.describe(
    "Whether an account with a $5$/$6$ hash exists to seed the borrowed salt",
  ),
  seedHashKnown: z.boolean(),
  starAccountsKnown: z.boolean(),
  starAccounts: z.array(StarAccountSchema),
  // The verdict.
  verdict: Verdict.describe(
    "vulnerable: exploitable today; not-vulnerable: a precondition is missing; unknown: could not decide (no root to read /etc/shadow, sshd -T unavailable to confirm a setting from the config files, or no sshd found)",
  ),
  vulnerable: z.boolean(),
  riskLevel: RiskLevel,
  action: HostAction,
  actions: z.array(HostAction),
  summary: z.string(),
  reasons: z.array(z.string()),
  notChecked: z.array(z.string()),
  recommendations: z.array(z.string()),
  stopgaps: z.array(z.string()),
  fixedVersion: z.string(),
});

export type StarAccount = z.infer<typeof StarAccountSchema>;
export type Status = z.infer<typeof StatusSchema>;
export type SignalT = z.infer<typeof Signal>;
export type HostActionT = z.infer<typeof HostAction>;
export type VerdictT = z.infer<typeof Verdict>;
export type RiskLevelT = z.infer<typeof RiskLevel>;
