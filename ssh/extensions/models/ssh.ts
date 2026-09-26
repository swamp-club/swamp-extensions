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

/**
 * Swamp model that runs commands against a fixed-up-front fleet of hosts
 * over SSH.
 *
 * OpenSSH targets are multiplexed via ControlMaster; Tailscale SSH targets
 * authenticate via tailnet identity and bypass multiplexing. Hosts and
 * per-host operations land as resources so workflows can branch on them.
 *
 * The model entrypoint is intentionally thin — schemas live in
 * `_lib/schemas.ts`, operation logic in `_lib/operations.ts`, and checks in
 * `_lib/checks.ts`.
 *
 * @module
 */

import {
  ApplyArgsSchema,
  CollectHostPublicKeyArgsSchema,
  CopyArgsSchema,
  ExecArgsSchema,
  ForwardArgsSchema,
  ForwardStateSchema,
  GlobalArgsSchema,
  HostPublicKeySchema,
  HostResourceSchema,
  MasterAuditSchema,
  OpenArgsSchema,
  ResolveArgsSchema,
  RunResultSchema,
  ScriptArgsSchema,
  SelectionSchema,
  TargetingSchema,
} from "./_lib/schemas.ts";
import {
  type CollectHostPublicKeyArgs,
  type CopyArgs,
  type ExecArgs,
  type ForwardArgs,
  type ResolveArgs,
  type ScriptArgs,
  type Targeting,
} from "./_lib/schemas.ts";
import {
  type FleetContext,
  runApply,
  runCheck,
  runClose,
  runCollectHostPublicKey,
  runCopy,
  runExec,
  runForward,
  runOpen,
  runResolve,
  runScript,
} from "./_lib/operations.ts";
import {
  type BinaryProbe,
  type CheckContext,
  checkMasterWritable,
  checkSshpassAvailable,
} from "./_lib/checks.ts";

// Methods that take a host selector AND spawn ssh — used to scope the
// fleet-wide sshpass check. `apply` operates on the whole fleet and takes no
// selector; `resolve` takes a selector but never connects, so the check
// would be noise there and it is deliberately excluded.
const SELECTOR_METHODS = [
  "open",
  "check",
  "close",
  "exec",
  "script",
  "copy",
  "forward",
  "collect-host-public-key",
];

/**
 * Swamp extension model export. Declares the model type, its global
 * arguments, the resources it persists, the pre-flight checks, and the
 * methods callers invoke.
 */
export const model = {
  type: "@swamp/ssh",
  version: "2026.09.26.1",
  globalArguments: GlobalArgsSchema,

  upgrades: [
    {
      toVersion: "2026.05.29.1",
      description:
        "Selector resolution overhaul (#485): a bare `hosts` string now " +
        "matches an exact host name first, then a tag, instead of always " +
        "being parsed as CEL. Added explicit `name:` / `tag:` / `cel:` " +
        "prefixes. A bare CEL expression (no `cel:` prefix) still resolves " +
        "but is deprecated — it logs a warning and will error in a future " +
        "version. No globalArguments schema change; the selector is a " +
        "per-method input.",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.29.2",
      description:
        "Docs-only (#485 follow-up): correct the manifest `Highlights` " +
        "selector description, which still described the removed bare-CEL " +
        "form. No code, schema, or behavior change.",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.01.1",
      description:
        "Fix (#510): exec, script, and copy now fail the method when any " +
        "host process exits non-zero, is killed by a signal, or fails to " +
        "spawn. Previously these methods always reported success even when " +
        "the underlying process failed. RunResult resources are still " +
        "written before the error is raised. No globalArguments schema change.",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.01.2",
      description:
        "Feature (#522): added optional `identityContent` field to ssh " +
        "transport. Accepts inline PEM private key content (e.g. from " +
        "vault.get()). Mutually exclusive with `identityFile`. The key is " +
        "written to a temporary file (mode 0600) for the SSH session and " +
        "removed afterward. No migration needed — additive schema change.",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.03.1",
      description:
        "Fix (#511): materializeTempKeys now ensures identityContent ends " +
        "with a trailing newline before writing to the temp file. OpenSSH " +
        "rejects PEM keys without a trailing newline ('Load key: invalid " +
        "format'), which could happen when vault-stored keys were stripped " +
        "of their final newline. No globalArguments schema change.",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.04.1",
      description: "Copyright and branding update to Elder Swamp Club, Inc. " +
        "No code, schema, or behavior change.",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.04.2",
      description: "Version bump to publish missing upgrade entries from " +
        "2026.06.04.1. No code, schema, or behavior change.",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.27.1",
      description:
        "Fix (#845): buildRsyncArgv now reuses sshCommonOpts instead of " +
        "hand-rolling a subset of SSH options. rsync copies now honor " +
        "proxyCommand, extraOptions, ConnectTimeout, StrictHostKeyChecking, " +
        "IdentityAgent, IdentitiesOnly, ServerAliveInterval, ControlMaster, " +
        "and ControlPersist — full parity with exec, script, and scp. " +
        "Values with spaces are single-quoted for rsync's -e parser. " +
        "No globalArguments schema change.",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.02.1",
      description:
        "Feature (#917): added collect-host-public-key method. Reads a " +
        "remote host's SSH public key file (default " +
        "/etc/ssh/ssh_host_ed25519_key.pub), validates it as a single " +
        "OpenSSH public key line, computes its SHA256 fingerprint, and " +
        "emits a hostPublicKey resource per host. New additive resource " +
        "spec (hostPublicKey) with gc 10. No globalArguments schema change.",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.24.1",
      description:
        "Fix (#1339): the open method now wraps the ssh argv in sshpass -e " +
        "for password-auth hosts, matching exec/script/copy. Previously " +
        "open spawned bare ssh which ignored the SSHPASS env var, causing " +
        "ControlMaster establishment to fail with 'Permission denied' on " +
        "any password-auth host. No globalArguments schema change.",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.27.1",
      description:
        "Fix (#1423): tailscale SSH check-mode auth prompts are now " +
        "detected immediately via streaming stderr. When tailscale ssh " +
        "prints an authentication URL, the process is killed within " +
        "milliseconds and the error surfaces the URL structured as " +
        "'tailscale SSH requires re-authentication: visit <url>'. " +
        "Also: method error messages now include full stderr (capped " +
        "at 512 chars per host) instead of only the last line. " +
        "No globalArguments schema change.",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.27.2",
      description:
        "Feature: two additive changes, both back-compatible. (1) `exec` and " +
        "`script` accept an optional `okExitCodes` argument — an array of " +
        "exit codes replacing the default [0], or 'any'. Allowed exits no " +
        "longer fail the method and no longer trigger fail-fast; spawn " +
        "errors, timeouts, and signal kills still fail regardless. Omitting " +
        "the argument preserves the 2026.06.01.1 behavior exactly. Use it " +
        "for guard/probe commands where a non-zero exit is the answer. " +
        "(2) runResult writes are now tagged with `fleet`, `host`, `method`, " +
        "and `exitCode` (string values; `exitCode` omitted when the process " +
        "died by signal or failed to spawn), so callers can branch on " +
        "`handle.tags.exitCode` and the audit trail is queryable by tag. " +
        "No globalArguments schema change.",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.28.1",
      description:
        "Feature: added `resolve` method — resolves a host selector to the " +
        "matching fleet members and records the result as data, without " +
        "spawning ssh/scp/tailscale. Zero matches is a success (empty host " +
        "list, `count: 0`), giving callers the structured 'matched nothing' " +
        "answer the connecting methods can't; a malformed selector still " +
        "throws, and exec/script/copy/etc. keep their throw-on-empty " +
        "behavior. New additive resource spec `selection` (gc 10), instance " +
        "`resolve-<hash>` (stable per selector), tagged fleet/method/count " +
        "so a runModel caller can branch on `handle.tags.count` without a " +
        "read. Selection records carry addressing + metadata only, never " +
        "credentials. No globalArguments schema change.",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.25.1",
      description:
        "Fix (#2336): `exec` with `sudo: true` now escalates the whole " +
        "command line. Previously `sudo -n --` was prefixed verbatim, so " +
        "anything after `;`, `&&`, `||`, `|`, a redirect, or an expansion " +
        "ran as the unprivileged SSH user. Commands containing shell syntax " +
        "are now sent as `sudo -n -- sh -c '<command>'`: they run under " +
        "POSIX sh, their expansions (`~`, variables, globs) happen in the " +
        "escalated shell, and sudoers rules limited to specific binaries " +
        "must also allow `sh` for them. Variables forwarded via `env` that " +
        'the command references are re-exported into the wrapped shell (`env "K=$K"`) ' +
        "so sudo's env_reset does not blank them; unreferenced ones are not, " +
        "so a forwarded secret never lands in sudo's log. PATH, HOME, SHELL, " +
        "IFS, ENV, BASH_ENV, LD_* and DYLD_* are never re-exported. " +
        "Restricted sudoers then also need `env`. Plain word commands (e.g. " +
        "`systemctl reload nginx`) keep the exact `sudo -n -- <command>` " +
        "form. `script` is unchanged. No globalArguments schema change.",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.26.1",
      description:
        "Docs (#2554): forwarded `env` crosses `sudo: true` only when a " +
        "wrapped `exec` command references the variable (re-exported as " +
        "above) or sudoers `env_keep` lists it. Plain commands that read a " +
        "variable from their environment and every `script` body otherwise " +
        "start without it, because sudo's env_reset drops it. The README " +
        "now documents the sshd `AcceptEnv` + sudoers `env_keep` setup and " +
        "its logging caveats. No behavior or globalArguments schema change.",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],

  resources: {
    host: {
      description:
        "One record per fleet member, written by `apply`. Tagged with the " +
        "fleet name so workflow CEL can select via data.findByTag.",
      schema: HostResourceSchema,
      lifetime: "infinite" as const,
      garbageCollection: 10,
    },
    runResult: {
      description:
        "Per-host outcome of a single method invocation (exec/script/copy). " +
        "Captured stdout/stderr land here verbatim when capture is on. " +
        "Tagged with fleet, host, method, and exitCode (omitted when the " +
        "process was killed by a signal or failed to spawn).",
      schema: RunResultSchema,
      lifetime: "infinite" as const,
      garbageCollection: 50,
    },
    forwardState: {
      description:
        "Tracks an open port forward — pid for tailscale, ControlPath for ssh.",
      schema: ForwardStateSchema,
      lifetime: "infinite" as const,
      garbageCollection: 50,
    },
    masterAudit: {
      description: "ControlMaster open/check/exit events, per host.",
      schema: MasterAuditSchema,
      lifetime: "infinite" as const,
      garbageCollection: 100,
    },
    hostPublicKey: {
      description: "Observed SSH host public key. One per host, written by " +
        "`collect-host-public-key`. Contains the raw public key line, " +
        "parsed algorithm, and SHA256 fingerprint.",
      schema: HostPublicKeySchema,
      lifetime: "infinite" as const,
      garbageCollection: 10,
    },
    selection: {
      description:
        "Result of a `resolve` call: the selector, its matched fleet " +
        "members (addressing + tags/attrs only, never credentials), and the " +
        "match count. Instance `resolve-<hash>` is stable per selector; " +
        "zero matches writes an empty list rather than failing. Tagged " +
        "with fleet, method, and count.",
      schema: SelectionSchema,
      lifetime: "infinite" as const,
      garbageCollection: 10,
    },
  },

  // Pre-flight checks can only see `globalArgs` + `definition` — swamp does
  // not pass per-method arguments to a check's context. So selector syntax,
  // empty-selection, and the forward spec are validated elsewhere: the spec
  // by `ForwardArgsSchema` at arg-parse time, the selector inside `execute`
  // (see operations.ts `resolveSelection`). Only globalArgs-derivable checks
  // live here.
  checks: {
    "master-writable": {
      description:
        "Ensures the ControlMaster socket directory is writable and 0700.",
      labels: ["policy"],
      appliesTo: ["open"],
      execute: (ctx: CheckContext) => checkMasterWritable(ctx),
    },
    "sshpass-available": {
      description:
        "Ensures sshpass is installed when any fleet host uses password auth.",
      labels: ["policy"],
      appliesTo: SELECTOR_METHODS,
      execute: (ctx: CheckContext, probe?: BinaryProbe) =>
        checkSshpassAvailable(ctx, probe),
    },
  },

  methods: {
    apply: {
      description:
        "Materialize the host list as host-* resources and prune stale ones.",
      arguments: ApplyArgsSchema,
      execute: (_args: Record<string, never>, ctx: FleetContext) =>
        runApply(ctx),
    },
    resolve: {
      description:
        "Resolve a host selector to the matching fleet members without " +
        "connecting — zero matches is data, not an error.",
      arguments: ResolveArgsSchema,
      execute: (args: ResolveArgs, ctx: FleetContext) => runResolve(args, ctx),
    },
    open: {
      description:
        "Establish ControlMaster sockets for selected ssh hosts (no-op for tailscale).",
      arguments: OpenArgsSchema,
      execute: (args: Targeting, ctx: FleetContext) => runOpen(args, ctx),
    },
    check: {
      description:
        "Probe connectivity: ssh -O check for ssh hosts, `true` over tailscale ssh.",
      arguments: TargetingSchema,
      execute: (args: Targeting, ctx: FleetContext) => runCheck(args, ctx),
    },
    close: {
      description: "Tear down ControlMaster sockets (ssh -O exit).",
      arguments: TargetingSchema,
      execute: (args: Targeting, ctx: FleetContext) => runClose(args, ctx),
    },
    exec: {
      description: "Run a single shell command on each selected host.",
      arguments: ExecArgsSchema,
      execute: (args: ExecArgs, ctx: FleetContext) => runExec(args, ctx),
    },
    script: {
      description:
        "Pipe a multi-line script over stdin to sh/bash/python3 on each host.",
      arguments: ScriptArgsSchema,
      execute: (args: ScriptArgs, ctx: FleetContext) => runScript(args, ctx),
    },
    copy: {
      description: "scp (or rsync) files to/from each selected host.",
      arguments: CopyArgsSchema,
      execute: (args: CopyArgs, ctx: FleetContext) => runCopy(args, ctx),
    },
    forward: {
      description:
        "Open/cancel/list a port forward (ssh -O forward, or detached tailscale child).",
      arguments: ForwardArgsSchema,
      execute: (args: ForwardArgs, ctx: FleetContext) => runForward(args, ctx),
    },
    "collect-host-public-key": {
      description:
        "Read and validate a remote host's SSH public key file. Emits a " +
        "hostPublicKey resource with the raw key, algorithm, and SHA256 " +
        "fingerprint. Defaults to /etc/ssh/ssh_host_ed25519_key.pub.",
      arguments: CollectHostPublicKeyArgsSchema,
      execute: (args: CollectHostPublicKeyArgs, ctx: FleetContext) =>
        runCollectHostPublicKey(args, ctx),
    },
  },
};
