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

/**
 * Zod schemas + inferred types for `@swamp/ssh`.
 *
 * Concentrating every schema here keeps the model entrypoint thin and
 * makes the validation surface auditable in one read. Tests import the
 * schemas directly from this module.
 *
 * @module
 */

import { z } from "zod";

// ---------------------------------------------------------------------------
// Primitive guards
// ---------------------------------------------------------------------------

/**
 * Refuse strings carrying newlines or NUL bytes in option-value positions
 * (e.g. ProxyJump, ProxyCommand, identityFile). OpenSSH option parsing is
 * not airtight against embedded newlines; we reject them at schema time so
 * an attacker controlling a host record can't smuggle additional `-o` flags
 * through option values.
 */
function safeOptionValue(label: string): z.ZodString {
  return z.string().refine(
    // deno-lint-ignore no-control-regex
    (s) => !/[\x00\r\n]/.test(s),
    { message: `${label} must not contain newlines or NUL bytes` },
  );
}

// ---------------------------------------------------------------------------
// Authentication
// ---------------------------------------------------------------------------

export const AuthSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("key") }),
  z.object({
    kind: z.literal("password"),
    password: z.string().min(1).describe(
      "Password — supply via `${{ vault.get('<vault>', '<key>') }}`. The " +
        "value is placed in the spawned process's SSHPASS env var and never " +
        "appears in argv or persisted resources.",
    ),
  }),
]);

export type Auth = z.infer<typeof AuthSchema>;

// ---------------------------------------------------------------------------
// Transport (ssh | tailscale)
// ---------------------------------------------------------------------------

const StrictHostKeyChecking = z.enum(["yes", "accept-new", "no", "off"]);

const ControlMasterSchema = z.object({
  enabled: z.boolean().default(true),
  persistSec: z.number().int().positive().default(600),
});

const SshTransportSchema = z.object({
  kind: z.literal("ssh"),
  user: safeOptionValue("user").optional(),
  port: z.number().int().positive().max(65535).default(22),
  auth: AuthSchema.default({ kind: "key" }),
  identityFile: safeOptionValue("identityFile").optional(),
  identityContent: z.string().min(1).meta({ sensitive: true }).optional()
    .describe(
      "PEM private key content — supply via `${{ vault.get('<vault>', '<key>') }}`. " +
        "Mutually exclusive with `identityFile`. The key is written to a " +
        "temporary file (mode 0600) for the SSH session and removed afterward.",
    ),
  identityAgent: safeOptionValue("identityAgent").optional(),
  identitiesOnly: z.boolean().optional(),
  knownHostsFile: safeOptionValue("knownHostsFile").optional(),
  strictHostKeyChecking: StrictHostKeyChecking.optional(),
  connectTimeoutSec: z.number().int().positive().default(10),
  serverAliveIntervalSec: z.number().int().positive().optional(),
  proxyJump: safeOptionValue("proxyJump").optional(),
  proxyCommand: safeOptionValue("proxyCommand").optional(),
  extraOptions: z.array(safeOptionValue("extraOptions[]")).default([]),
  controlMaster: ControlMasterSchema.default({
    enabled: true,
    persistSec: 600,
  }),
});

const TailscaleTransportSchema = z.object({
  kind: z.literal("tailscale"),
  user: safeOptionValue("user").optional(),
  tailscaleBinary: z.string().min(1).optional(),
  sshExtraArgs: z.array(safeOptionValue("sshExtraArgs[]")).default([]),
});

const _TransportUnion = z.discriminatedUnion("kind", [
  SshTransportSchema,
  TailscaleTransportSchema,
]);

export const TransportSchema = _TransportUnion.refine(
  (t) =>
    t.kind !== "ssh" ||
    !(t.identityFile !== undefined && t.identityContent !== undefined),
  {
    message:
      "identityFile and identityContent are mutually exclusive — set one or neither",
  },
);

export type Transport = z.infer<typeof TransportSchema>;
export type SshTransport = z.infer<typeof SshTransportSchema>;
export type TailscaleTransport = z.infer<typeof TailscaleTransportSchema>;

// Per-host override schema — every field optional, including `kind`. A host
// may flip `kind` away from the fleet default, which is why we model the
// override as a plain partial object rather than a discriminated union.
//
// We DO NOT use `.partial()` on the discriminated union schemas above
// because (a) it would lose the discriminator and (b) Zod 4 requires
// explicit `kind?` for partial unions. Listing the fields explicitly keeps
// the override surface obvious to readers.
export const TransportOverrideSchema = z.object({
  kind: z.enum(["ssh", "tailscale"]).optional(),
  user: safeOptionValue("user").optional(),
  port: z.number().int().positive().max(65535).optional(),
  auth: AuthSchema.optional(),
  identityFile: safeOptionValue("identityFile").optional(),
  identityContent: z.string().min(1).meta({ sensitive: true }).optional(),
  identityAgent: safeOptionValue("identityAgent").optional(),
  identitiesOnly: z.boolean().optional(),
  knownHostsFile: safeOptionValue("knownHostsFile").optional(),
  strictHostKeyChecking: StrictHostKeyChecking.optional(),
  connectTimeoutSec: z.number().int().positive().optional(),
  serverAliveIntervalSec: z.number().int().positive().optional(),
  proxyJump: safeOptionValue("proxyJump").optional(),
  proxyCommand: safeOptionValue("proxyCommand").optional(),
  extraOptions: z.array(safeOptionValue("extraOptions[]")).optional(),
  controlMaster: ControlMasterSchema.partial().optional(),
  tailscaleBinary: z.string().min(1).optional(),
  sshExtraArgs: z.array(safeOptionValue("sshExtraArgs[]")).optional(),
}).refine(
  (o) => !(o.identityFile !== undefined && o.identityContent !== undefined),
  {
    message:
      "identityFile and identityContent are mutually exclusive — set one or neither",
  },
);

export type TransportOverride = z.infer<typeof TransportOverrideSchema>;

// ---------------------------------------------------------------------------
// Hosts
// ---------------------------------------------------------------------------

const HostNamePattern = /^[A-Za-z0-9_][A-Za-z0-9_.-]*$/;

export const HostSchema = z.object({
  name: z.string().min(1).regex(
    HostNamePattern,
    "Host name must start with [A-Za-z0-9_] and contain only [A-Za-z0-9_.-]",
  ),
  address: safeOptionValue("address").min(1),
  tags: z.array(z.string().min(1)).default([]),
  attrs: z.record(z.string(), z.unknown()).default({}),
  transport: TransportOverrideSchema.optional(),
  env: z.record(z.string(), z.string()).optional(),
});

export type Host = z.infer<typeof HostSchema>;

// ---------------------------------------------------------------------------
// Selectors & targeting
// ---------------------------------------------------------------------------

export const SelectorSchema = z.union([
  z.literal("all"),
  z.array(z.string().min(1)).min(1),
  z.string().min(1),
]).describe(
  'Host selector. Forms: "all" (every host); an array of exact host names; ' +
    "or a string. A bare string matches an exact host name first, then a tag. " +
    'Prefix to be explicit: "name:<host>", "tag:<tag>", or "cel:<expr>" ' +
    'for a CEL predicate (e.g. cel:"prod" in host.tags). Use name:/tag: to ' +
    "disambiguate when a host name collides with a tag. A bare CEL expression " +
    "(no cel: prefix) still works but is deprecated — prefix it with cel:.",
);

export type Selector = z.infer<typeof SelectorSchema>;

export const TargetingSchema = z.object({
  hosts: SelectorSchema,
  parallel: z.number().int().positive().optional(),
  timeoutSec: z.number().int().positive().optional(),
  failFast: z.boolean().optional(),
  env: z.record(z.string(), z.string()).optional(),
  captureOutput: z.boolean().optional(),
});

export type Targeting = z.infer<typeof TargetingSchema>;

// ---------------------------------------------------------------------------
// Global arguments
// ---------------------------------------------------------------------------

export const GlobalArgsSchema = z.object({
  name: z.string().min(1),
  transport: TransportSchema,
  hosts: z.array(HostSchema).min(1),
  defaultParallel: z.number().int().positive().default(8),
  defaultTimeoutSec: z.number().int().positive().default(300),
  failFast: z.boolean().default(false),
  captureOutput: z.boolean().default(true),
  runHistory: z.number().int().positive().default(50),
  sshBinary: z.string().min(1).default("ssh"),
  scpBinary: z.string().min(1).default("scp"),
  rsyncBinary: z.string().min(1).default("rsync"),
  tailscaleBinary: z.string().min(1).default("tailscale"),
  sshpassBinary: z.string().min(1).default("sshpass"),
});

export type GlobalArgs = z.infer<typeof GlobalArgsSchema>;

// ---------------------------------------------------------------------------
// Method-specific argument schemas
// ---------------------------------------------------------------------------

export const ApplyArgsSchema = z.object({});

export const OpenArgsSchema = TargetingSchema;
export const CheckArgsSchema = TargetingSchema;
export const CloseArgsSchema = TargetingSchema;

export const ExecArgsSchema = TargetingSchema.extend({
  command: z.string().min(1),
  stdin: z.string().optional(),
  sudo: z.boolean().optional(),
});
export type ExecArgs = z.infer<typeof ExecArgsSchema>;

export const ScriptArgsSchema = TargetingSchema.extend({
  script: z.string().min(1),
  interpreter: z.enum(["sh", "bash", "python3"]).default("sh"),
  sudo: z.boolean().optional(),
});
export type ScriptArgs = z.infer<typeof ScriptArgsSchema>;

export const CopyArgsSchema = TargetingSchema.extend({
  src: z.string().min(1),
  dst: z.string().min(1),
  direction: z.enum(["to", "from"]),
  recursive: z.boolean().optional(),
  useRsync: z.boolean().optional(),
});
export type CopyArgs = z.infer<typeof CopyArgsSchema>;

const ForwardSpecPattern = /^\d{1,5}:[^:]+:\d{1,5}$/;
export const ForwardArgsSchema = TargetingSchema.extend({
  action: z.enum(["open", "cancel", "list"]),
  spec: z.string().regex(
    ForwardSpecPattern,
    "Forward spec must be LPORT:RHOST:RPORT (e.g. 9090:localhost:9090)",
  ).optional(),
  type: z.enum(["L", "R"]).default("L"),
}).refine(
  (a) => a.action === "list" || typeof a.spec === "string",
  {
    message: "`spec` is required for action 'open' and 'cancel'",
    path: ["spec"],
  },
);
export type ForwardArgs = z.infer<typeof ForwardArgsSchema>;

// ---------------------------------------------------------------------------
// Resource record schemas
// ---------------------------------------------------------------------------

export const HostResourceSchema = z.object({
  name: z.string(),
  address: z.string(),
  port: z.number().int(),
  user: z.string().optional(),
  tags: z.array(z.string()),
  attrs: z.record(z.string(), z.unknown()),
  transport: z.enum(["ssh", "tailscale"]),
  fleet: z.string(),
  recordedAt: z.string(),
});
export type HostResource = z.infer<typeof HostResourceSchema>;

export const RunResultSchema = z.object({
  method: z.string(),
  host: z.string(),
  transport: z.enum(["ssh", "tailscale"]),
  startedAt: z.string(),
  finishedAt: z.string(),
  durationMs: z.number(),
  exitCode: z.number().nullable(),
  signal: z.string().nullable(),
  stdout: z.string().optional(),
  stderr: z.string().optional(),
  args: z.record(z.string(), z.unknown()),
  argv: z.array(z.string()),
  error: z.string().optional(),
});
export type RunResult = z.infer<typeof RunResultSchema>;

export const ForwardStateSchema = z.object({
  host: z.string(),
  transport: z.enum(["ssh", "tailscale"]),
  type: z.enum(["L", "R"]),
  spec: z.string(),
  pid: z.number().int().optional(),
  controlPath: z.string().optional(),
  openedAt: z.string(),
  closedAt: z.string().optional(),
});
export type ForwardState = z.infer<typeof ForwardStateSchema>;

export const MasterAuditSchema = z.object({
  host: z.string(),
  event: z.enum(["open", "check", "exit"]),
  outcome: z.enum(["ok", "absent", "error"]),
  detail: z.string().optional(),
  recordedAt: z.string(),
});
export type MasterAudit = z.infer<typeof MasterAuditSchema>;
