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
  CopyArgsSchema,
  ExecArgsSchema,
  ForwardArgsSchema,
  ForwardStateSchema,
  GlobalArgsSchema,
  HostResourceSchema,
  MasterAuditSchema,
  OpenArgsSchema,
  RunResultSchema,
  ScriptArgsSchema,
  TargetingSchema,
} from "./_lib/schemas.ts";
import {
  type CopyArgs,
  type ExecArgs,
  type ForwardArgs,
  type ScriptArgs,
  type Targeting,
} from "./_lib/schemas.ts";
import {
  type FleetContext,
  runApply,
  runCheck,
  runClose,
  runCopy,
  runExec,
  runForward,
  runOpen,
  runScript,
} from "./_lib/operations.ts";
import {
  type BinaryProbe,
  type CheckContext,
  checkMasterWritable,
  checkSshpassAvailable,
} from "./_lib/checks.ts";

// Methods that take a host selector — used to scope the fleet-wide
// sshpass check. `apply` operates on the whole fleet and takes no selector.
const SELECTOR_METHODS = [
  "open",
  "check",
  "close",
  "exec",
  "script",
  "copy",
  "forward",
];

/**
 * Swamp extension model export. Declares the model type, its global
 * arguments, the resources it persists, the pre-flight checks, and the
 * methods callers invoke.
 */
export const model = {
  type: "@swamp/ssh",
  version: "2026.06.04.2",
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
        "Captured stdout/stderr land here verbatim when capture is on.",
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
  },
};
