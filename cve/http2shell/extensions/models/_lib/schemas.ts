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
 * Schemas for the scan and mitigation results.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";

export const Kind = z.enum([
  "libbrotli",
  "node",
  "bun",
  "python",
  "dotnet",
  "envoy",
  "istio",
  "curl",
  "ruby-gem",
  "electron",
  "lockfile",
]);

export const Verdict = z.enum([
  "patched",
  "vulnerable",
  "unsupported",
  "update-available",
  "check-vendor",
  "no-fix-released",
  "restart-required",
  "not-affected",
  "unknown",
]);

export const FindingAction = z.enum([
  "none",
  "upgrade",
  "restart",
  "rebuild-image",
  "update-pin",
  "stopgap",
  "check-vendor",
]);

export const HostAction = z.enum([
  "none",
  "upgrade",
  "restart",
  "rebuild-image",
  "update-pin",
  "stopgap",
  "check-vendor",
  "needs-privilege",
  "unreachable",
]);

export const RiskLevel = z.enum([
  "critical",
  "high",
  "medium",
  "low",
  "none",
  "unknown",
]);

export const FindingSchema = z.object({
  kind: Kind,
  name: z.string(),
  path: z.string(),
  version: z.string().nullable(),
  brotliVersion: z.string().nullable().describe(
    "Brotli version the component bundles or links, when known",
  ),
  source: z.enum([
    "distro",
    "upstream",
    "brew",
    "pip",
    "vendor",
    "lockfile",
  ]),
  packageName: z.string().nullable(),
  packageVersion: z.string().nullable(),
  linksSystemBrotli: z.boolean().nullable(),
  verdict: Verdict,
  action: FindingAction,
  fixedVersion: z.string().nullable(),
  note: z.string(),
  exposure: z.array(z.string()),
});

export const ListenerSchema = z.object({
  process: z.string().nullable(),
  local: z.string(),
  public: z.boolean(),
});

export const StaleProcessSchema = z.object({
  pid: z.number(),
  process: z.string(),
  unit: z.string().nullable(),
  path: z.string(),
});

export const MitigationStepRecord = z.object({
  phase: z.enum(["upgrade", "python", "restart"]),
  command: z.string(),
  privileged: z.boolean(),
  purpose: z.string(),
  status: z.enum(["planned", "ok", "failed", "skipped"]),
  exitCode: z.number().nullable(),
  output: z.string(),
});

export const MitigationSchema = z.object({
  dryRun: z.boolean(),
  restartServices: z.boolean(),
  upgradePython: z.boolean(),
  removePythonBrotli: z.boolean(),
  privilege: z.enum(["root", "sudo", "unavailable", "not-needed"]),
  missingPrivileges: z.array(z.string()),
  outcome: z.enum([
    "not-needed",
    "dry-run",
    "applied",
    "partial",
    "needs-privilege",
    "no-automatic-fix",
    "error",
  ]),
  steps: z.array(MitigationStepRecord),
  script: z.object({ shell: z.enum(["sh", "powershell"]), text: z.string() })
    .nullable().describe(
      "Commands to run by hand on hosts mitigate does not change (macOS, Windows)",
    ),
  notes: z.array(z.string()),
});

export const StatusSchema = z.object({
  scanTimestamp: z.string(),
  target: z.string(),
  hostname: z.string(),
  os: z.object({
    id: z.string(),
    versionId: z.string(),
    codename: z.string(),
    prettyName: z.string(),
  }),
  inContainer: z.boolean(),
  runAsRoot: z.boolean(),
  probe: z.enum(["sh", "powershell", "direct", "none"]),
  vulnerable: z.boolean(),
  riskLevel: RiskLevel,
  action: HostAction,
  actions: z.array(HostAction),
  summary: z.string(),
  error: z.string().nullable(),
  cve: z.string(),
  findings: z.array(FindingSchema),
  exposure: z.object({
    listeners: z.array(ListenerSchema),
    listenersKnown: z.boolean(),
    exposedListeners: z.array(ListenerSchema),
    inboundMiddleware: z.array(z.string()),
    autoDecodingClients: z.array(z.string()),
  }),
  processScope: z.enum(["all", "own", "none"]),
  staleProcesses: z.array(StaleProcessSchema),
  notChecked: z.array(z.string()),
  packageListsUpdatedAt: z.string().nullable(),
  recommendations: z.array(z.string()),
  stopgaps: z.array(z.string()),
  notAffected: z.array(z.string()),
  trackerSnapshot: z.string(),
  mitigation: MitigationSchema.nullable(),
  sshUser: z.string().optional().describe(
    "SSH user given with this host as user@host; absent when the model's sshUser was used",
  ),
});

export type Finding = z.infer<typeof FindingSchema>;
export type Status = z.infer<typeof StatusSchema>;
export type Mitigation = z.infer<typeof MitigationSchema>;
export type Listener = z.infer<typeof ListenerSchema>;
export type StaleProcess = z.infer<typeof StaleProcessSchema>;
export type VerdictT = z.infer<typeof Verdict>;
export type FindingActionT = z.infer<typeof FindingAction>;
export type HostActionT = z.infer<typeof HostAction>;
