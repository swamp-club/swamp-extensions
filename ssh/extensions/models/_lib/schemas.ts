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
 * Zod schemas + inferred types for `@swamp/ssh`.
 *
 * Concentrating every schema here keeps the model entrypoint thin and
 * makes the validation surface auditable in one read. Tests import the
 * schemas directly from this module.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { hostKeyPolicyIssues } from "./host_keys.ts";
import { mergeTransport } from "./hosts.ts";

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

/** SSH public-key algorithms accepted for host keys and collected keys. */
export const KNOWN_KEY_ALGORITHMS: ReadonlySet<string> = new Set([
  "ssh-ed25519",
  "ssh-rsa",
  "ecdsa-sha2-nistp256",
  "ecdsa-sha2-nistp384",
  "ecdsa-sha2-nistp521",
  "sk-ssh-ed25519@openssh.com",
  "sk-ecdsa-sha2-nistp256@openssh.com",
  "ssh-dss",
]);

export const HostKeyPolicySchema = z.enum([
  "pinned",
  "tofu",
  "accept-new",
  "insecure",
]).describe(
  "How the host key is verified. 'pinned': only the keys in `hostKeys` are " +
    "accepted. 'tofu': the key seen on first contact is pinned as a " +
    "hostKeyPin resource and required from then on (`repin` replaces it). " +
    "'accept-new': OpenSSH accept-new against `knownHostsFile` or the " +
    "runner's known_hosts. 'insecure': no verification. Unset (and no " +
    "`hostKeys`) leaves the decision to the runner's ssh_config.",
);
export type HostKeyPolicy = z.infer<typeof HostKeyPolicySchema>;

// deno-lint-ignore no-control-regex
const HostKeyLinePattern = /^(\S+) [A-Za-z0-9+/]+={0,3}( [^\x00\r\n]*)?$/;

/**
 * One OpenSSH public-key line (`<algorithm> <base64> [comment]`), as written
 * in a `.pub` file or emitted by `collect-host-public-key`. Public data, so
 * no sensitive marking.
 */
const HostKeyLineSchema = z.string().regex(
  HostKeyLinePattern,
  "hostKeys[] entries must be '<algorithm> <base64> [comment]' on one line",
).refine(
  (s) => KNOWN_KEY_ALGORITHMS.has(s.split(" ")[0]),
  {
    message: `hostKeys[] algorithm must be one of: ${
      [...KNOWN_KEY_ALGORITHMS].join(", ")
    }`,
  },
).refine(
  // OpenSSH key blobs are always padded base64; atob alone is lenient about
  // missing padding, so check the length too. Zod runs this even when the
  // regex above failed, so the field may be missing.
  (s) => {
    const data = s.split(" ")[1] ?? "";
    if (data === "" || data.length % 4 !== 0) return false;
    try {
      atob(data);
      return true;
    } catch {
      return false;
    }
  },
  { message: "hostKeys[] key data must be valid base64" },
);

const hostKeysField = z.array(HostKeyLineSchema).min(1).describe(
  "Expected host public keys, one OpenSSH public-key line each (e.g. the " +
    "`publicKey` of a hostPublicKey resource). Setting this without " +
    "`hostKeyPolicy` implies 'pinned'.",
);

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
        "Mutually exclusive with `identityFile`. By default " +
        "(`identityContentMode: auto`) the key is loaded over stdin into a " +
        "short-lived per-call ssh-agent and never written to disk; if no " +
        "agent can be started it falls back to a temporary file (mode " +
        "0600) removed after the call.",
    ),
  identityAgent: safeOptionValue("identityAgent").optional(),
  identitiesOnly: z.boolean().optional(),
  knownHostsFile: safeOptionValue("knownHostsFile").optional(),
  strictHostKeyChecking: StrictHostKeyChecking.optional(),
  hostKeyPolicy: HostKeyPolicySchema.optional(),
  hostKeys: hostKeysField.optional(),
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
  hostKeyPolicy: HostKeyPolicySchema.optional(),
  hostKeys: hostKeysField.optional(),
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
  identityContentMode: z.enum(["auto", "agent", "file"]).default("auto")
    .describe(
      "How `identityContent` keys reach ssh. 'auto': load into a per-call " +
        "ssh-agent over stdin, falling back to a 0600 temp file when no " +
        "agent can be started. 'agent': agent only — fail the call rather " +
        "than write the key to disk. 'file': always use the temp file.",
    ),
  sshAgentBinary: z.string().min(1).default("ssh-agent"),
  sshAddBinary: z.string().min(1).default("ssh-add"),
}).superRefine((g, ctx) => {
  // Host-key settings are validated on each host's MERGED transport: a fleet
  // default and a per-host override can only be judged together, and only
  // GlobalArgs sees both. Reusing mergeTransport keeps the precedence here
  // identical to what the runner builds argv from.
  g.hosts.forEach((host, i) => {
    const t = mergeTransport(g.transport, host.transport);
    if (t.kind !== "ssh") return;
    for (const message of hostKeyPolicyIssues(t)) {
      ctx.addIssue({
        code: "custom",
        message: `host '${host.name}': ${message}`,
        path: ["hosts", i, "transport"],
      });
    }
  });
});

export type GlobalArgs = z.infer<typeof GlobalArgsSchema>;

// ---------------------------------------------------------------------------
// Method-specific argument schemas
// ---------------------------------------------------------------------------

export const ApplyArgsSchema = z.object({});

export const OpenArgsSchema = TargetingSchema;
export const CheckArgsSchema = TargetingSchema;
export const CloseArgsSchema = TargetingSchema;

/**
 * Exit codes a host may return without failing the method.
 *
 * Deliberately NOT on `TargetingSchema`: only `exec` and `script` run a
 * caller-supplied command whose non-zero exit can be a legitimate answer
 * (`test -f`, `command -v`, an `onlyIf` guard). `copy` and the connectivity
 * methods have no such notion, so widening their success criteria would only
 * hide real failures.
 */
export const OkExitCodesSchema = z.union([
  z.literal("any"),
  z.array(z.number().int().min(0).max(255)).min(1),
]);
export type OkExitCodes = z.infer<typeof OkExitCodesSchema>;

// Shared by exec and script. Omitting the argument keeps the historical
// behavior exactly: only exit 0 succeeds.
const okExitCodesArg = OkExitCodesSchema.optional().describe(
  "Exit codes to treat as success. An array replaces the default of [0] " +
    "(include 0 explicitly if it is acceptable); 'any' accepts every exit " +
    "code. Spawn errors, timeouts, and signals still fail the host. Use for " +
    "guard/probe commands where non-zero exit is an expected answer.",
);

export const ExecArgsSchema = TargetingSchema.extend({
  command: z.string().min(1).optional().describe(
    "Command line handed to the remote login shell as-is. Exactly one of " +
      "`command` or `argv` is required.",
  ),
  argv: z.array(
    z.string().refine((s) => !s.includes("\0"), {
      message: "argv[] elements must not contain NUL bytes",
    }),
  ).min(1).optional().describe(
    "Command as an argument vector. Each element is POSIX single-quoted " +
      "before the remote shell sees it, so it is passed literally — no " +
      "expansion, globbing, or operators. Alternative to `command`.",
  ),
  stdin: z.string().optional(),
  sudo: z.boolean().optional(),
  okExitCodes: okExitCodesArg,
}).refine(
  (a) => (a.command === undefined) !== (a.argv === undefined),
  { message: "exactly one of `command` or `argv` is required" },
);
export type ExecArgs = z.infer<typeof ExecArgsSchema>;

export const ScriptArgsSchema = TargetingSchema.extend({
  script: z.string().min(1),
  interpreter: z.enum(["sh", "bash", "python3"]).default("sh"),
  sudo: z.boolean().optional(),
  okExitCodes: okExitCodesArg,
});
export type ScriptArgs = z.infer<typeof ScriptArgsSchema>;

export const CopyArgsSchema = TargetingSchema.extend({
  src: z.string().min(1),
  dst: z.string().min(1),
  direction: z.enum(["to", "from"]),
  recursive: z.boolean().optional(),
  useRsync: z.boolean().optional(),
  atomic: z.boolean().optional().describe(
    "Upload to a hidden staging file next to `dst`, apply mode/owner, " +
      "verify, then rename into place — readers never see a partial file. " +
      "`direction: to` and single files only. The ssh user needs write " +
      "access to dst's directory.",
  ),
  mode: z.string().regex(
    /^[0-7]{3,4}$/,
    "mode must be 3 or 4 octal digits (e.g. 0644)",
  ).optional().describe("chmod mode applied before the rename (atomic only)."),
  owner: z.string().regex(
    /^[A-Za-z0-9_][A-Za-z0-9_.-]*(:[A-Za-z0-9_][A-Za-z0-9_.-]*)?$/,
    "owner must be 'user' or 'user:group'",
  ).optional().describe("chown owner applied before the rename (atomic only)."),
  verifySha256: z.boolean().optional().describe(
    "Compare the uploaded file's sha256 with the local source before the " +
      "rename (atomic only).",
  ),
}).superRefine((a, ctx) => {
  const atomicOnly = (["mode", "owner", "verifySha256"] as const).filter(
    (k) => a[k] !== undefined && a[k] !== false,
  );
  if (!a.atomic) {
    for (const k of atomicOnly) {
      ctx.addIssue({
        code: "custom",
        message: `\`${k}\` requires \`atomic: true\``,
        path: [k],
      });
    }
    return;
  }
  if (a.direction !== "to") {
    ctx.addIssue({
      code: "custom",
      message: "`atomic` requires `direction: to`",
      path: ["atomic"],
    });
  }
  if (a.recursive) {
    ctx.addIssue({
      code: "custom",
      message: "`atomic` copies a single file; it cannot be `recursive`",
      path: ["atomic"],
    });
  }
  if (a.dst.endsWith("/")) {
    ctx.addIssue({
      code: "custom",
      message: "`atomic` needs a file path for `dst`, not a directory",
      path: ["dst"],
    });
  }
  // scp expands a leading `~` but the finalize step quotes dst, so the
  // remote shell would not — the rename would target a literal `~` path.
  if (a.dst.startsWith("~")) {
    ctx.addIssue({
      code: "custom",
      message:
        "`atomic` dst cannot start with `~` — use an absolute path, or a " +
        "path relative to the login directory without `~/`",
      path: ["dst"],
    });
  }
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

export const CollectHostPublicKeyArgsSchema = TargetingSchema.extend({
  hostKeyPath: z.string().min(1).default("/etc/ssh/ssh_host_ed25519_key.pub"),
});
export type CollectHostPublicKeyArgs = z.infer<
  typeof CollectHostPublicKeyArgsSchema
>;

/**
 * `resolve` takes only the selector — deliberately NOT `TargetingSchema`.
 * The method never connects, so `parallel`/`timeoutSec`/`failFast`/`env`/
 * `captureOutput` would be dead knobs suggesting behavior that doesn't exist.
 */
export const ResolveArgsSchema = z.object({
  hosts: SelectorSchema,
});
export type ResolveArgs = z.infer<typeof ResolveArgsSchema>;

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

/**
 * Result of a `resolve` call: which fleet members a selector matched.
 * Addressing and metadata only — never credential material (auth, identity
 * files/content, proxy commands), so the record is safe to hand to any
 * downstream planner. `port` is present only for ssh-transport hosts;
 * tailscale addressing has no port.
 */
export const SelectionSchema = z.object({
  fleet: z.string(),
  selector: z.string(),
  count: z.number().int(),
  hosts: z.array(z.object({
    name: z.string(),
    address: z.string(),
    port: z.number().int().optional(),
    user: z.string().optional(),
    tags: z.array(z.string()),
    attrs: z.record(z.string(), z.unknown()),
    transport: z.enum(["ssh", "tailscale"]),
  })),
  resolvedAt: z.string(),
});
export type Selection = z.infer<typeof SelectionSchema>;

export const HostPublicKeySchema = z.object({
  name: z.string(),
  host: z.string(),
  user: z.string().optional(),
  hostKeyPath: z.string(),
  publicKey: z.string(),
  algorithm: z.string(),
  fingerprint: z.string(),
  observedAt: z.string(),
});
export type HostPublicKey = z.infer<typeof HostPublicKeySchema>;

/**
 * A trust-on-first-use host-key pin. Keyed by `address:port` (not host name)
 * so several sshd on one address stay distinct and a host rename keeps its
 * pin. Public key material only.
 */
export const HostKeyPinSchema = z.object({
  fleet: z.string(),
  address: z.string(),
  port: z.number().int(),
  // publicKey uses the same validation as hostKeys: a pin whose key cannot
  // be parsed must fail readPin (closed), never become an empty key list.
  keys: z.array(z.object({
    algorithm: z.string(),
    publicKey: HostKeyLineSchema,
    fingerprint: z.string(),
  })).min(1),
  firstSeenAt: z.string(),
  pinnedAt: z.string(),
  previousFingerprints: z.array(z.string()).optional(),
});
export type HostKeyPin = z.infer<typeof HostKeyPinSchema>;
