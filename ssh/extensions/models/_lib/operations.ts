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
 * Operation implementations for the @swamp/ssh model. Kept out of the model
 * entrypoint so the entrypoint stays a thin declaration and the logic is
 * unit-testable in isolation.
 *
 * @module
 */

import {
  type CollectHostPublicKeyArgs,
  type CopyArgs,
  type ExecArgs,
  type ForwardArgs,
  type GlobalArgs,
  GlobalArgsSchema,
  type OkExitCodes,
  type ResolveArgs,
  type ScriptArgs,
  type Selector,
  type Targeting,
} from "./schemas.ts";
import { type EffectiveHost, effectiveHosts } from "./hosts.ts";
import {
  type CelEnvLike,
  looksLikeCel,
  parseSelector,
  selectHosts,
} from "./selectors.ts";
import {
  checkMasterArgv,
  controlPath,
  ensureControlDir,
  exitMasterArgv,
  openMasterArgv,
} from "./control_master.ts";
import {
  applySudo,
  type ArgvContext,
  buildCopyArgv,
  buildExecArgv,
  forwardedEnv,
  type HostPlan,
  type HostRunResult,
  isExitAllowed,
  maybeWrapSshpass,
  posixQuote,
  runHosts,
  type RunnerBinaries,
  scriptRemoteCommand,
  sendEnvKeys,
  spawnEnv,
} from "./runner.ts";
import {
  cancelTailscaleForward,
  openTailscaleForward,
  sshForwardArgv,
} from "./forwarding.ts";

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

/** Logger surface (matches swamp's MethodContext.logger). */
export interface FleetLogger {
  debug(message: string, ...args: unknown[]): void;
  info(message: string, ...args: unknown[]): void;
  warn(message: string, ...args: unknown[]): void;
  error(message: string, ...args: unknown[]): void;
}

/** Minimal data-repository surface used for stale-resource pruning. */
export interface FleetDataRepository {
  findAllForModel(
    type: string,
    modelId: string,
  ): Promise<Array<{ name: string }>>;
  delete(type: string, modelId: string, dataName: string): Promise<void>;
}

/**
 * The subset of swamp's MethodContext this model relies on. Declared
 * structurally so the production context (a superset) satisfies it and the
 * test harness can provide a focused fake.
 */
export interface FleetContext {
  signal: AbortSignal;
  globalArgs: Record<string, unknown>;
  modelType: string;
  modelId: string;
  methodName: string;
  logger: FleetLogger;
  writeResource: (
    specName: string,
    name: string,
    data: Record<string, unknown>,
    overrides?: { tags?: Record<string, string>; garbageCollection?: number },
  ) => Promise<DataHandle>;
  readResource: (
    name: string,
    version?: number,
  ) => Promise<Record<string, unknown> | null>;
  createCelEnvironment: () => CelEnvLike;
  dataRepository: FleetDataRepository;
}

/**
 * A resource handle the model returns to swamp. Structural subset of swamp's
 * own DataHandle — `tags` echoes back the write's tag overrides, which is how
 * a `runModel` caller reads a run's outcome without fetching the resource.
 */
export interface DataHandle {
  name: string;
  tags?: Record<string, string>;
}

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

function parseGlobals(ctx: FleetContext): GlobalArgs {
  return GlobalArgsSchema.parse(ctx.globalArgs);
}

function binaries(g: GlobalArgs): RunnerBinaries {
  return {
    ssh: g.sshBinary,
    scp: g.scpBinary,
    rsync: g.rsyncBinary,
    tailscale: g.tailscaleBinary,
    sshpass: g.sshpassBinary,
  };
}

/**
 * Build the precise "matched no hosts" error for an empty selection. The
 * wording mirrors how `selectHosts` interpreted the selector (see
 * `parseSelector`) so the message names the exact corrected invocation — the
 * primary migration channel for agent callers, which read the error text back.
 */
function noMatchMessage(selector: Selector): string {
  if (selector === "all" || Array.isArray(selector)) {
    return "Selector matched no hosts. Check the selector and the fleet's hosts[].";
  }
  const parsed = parseSelector(selector);
  switch (parsed.kind) {
    case "name":
      return `No host named '${parsed.value}' in the fleet.`;
    case "tag":
      return `No host carrying tag '${parsed.value}' in the fleet.`;
    case "cel":
      return `Selector expression '${parsed.value}' matched no hosts.`;
    case "bare":
      if (looksLikeCel(parsed.value)) {
        return `Selector expression '${parsed.value}' (interpreted as a ` +
          `deprecated bare CEL expression) matched no hosts. Prefix with ` +
          `'cel:' to use it as a predicate explicitly.`;
      }
      return `Selector '${parsed.value}' matched no host by name or tag. ` +
        `Use hosts=name:${parsed.value}, hosts=tag:${parsed.value}, ` +
        `hosts:json=["${parsed.value}"], or a predicate hosts='cel:...'.`;
  }
}

/**
 * Evaluate a selector against the fleet, wrapping a malformed expression
 * (typically a CEL parse error) in a clear message. The result may be empty —
 * `resolve` records that as data, while the connecting methods reject it via
 * `resolveSelection`.
 */
function matchSelection(
  ctx: FleetContext,
  g: GlobalArgs,
  selector: Selector,
): EffectiveHost[] {
  try {
    return selectHosts(
      selector,
      effectiveHosts(g),
      ctx.createCelEnvironment(),
      ctx.logger,
    );
  } catch (err) {
    throw new Error(
      `Invalid selector expression: ${
        err instanceof Error ? err.message : String(err)
      }`,
    );
  }
}

/**
 * Resolve the selector to matched effective hosts, rejecting an empty match.
 *
 * This is the execute-time home for two validations that can't live in
 * pre-flight checks (checks don't receive method args in swamp): a malformed
 * CEL selector surfaces as a clear error, and an empty match is rejected with
 * a form-aware message. Both run before any process is spawned. Every
 * connecting method funnels through here — zero hosts is only a success for
 * `resolve`, which asks the question without acting on the answer. Exported
 * for direct unit testing.
 */
export function resolveSelection(
  ctx: FleetContext,
  g: GlobalArgs,
  selector: Selector,
): EffectiveHost[] {
  const selected = matchSelection(ctx, g, selector);
  if (selected.length === 0) {
    throw new Error(noMatchMessage(selector));
  }
  return selected;
}

const STDERR_CAP = 512;

function truncateStderr(stderr: string): string {
  const trimmed = stderr.trimEnd();
  if (trimmed.length <= STDERR_CAP) return trimmed;
  return trimmed.slice(0, STDERR_CAP) + "…";
}

/**
 * Throw an aggregate error when any host in the result set experienced a
 * genuine failure: a disallowed exit code, killed by signal, or a
 * spawn/timeout error. Fail-fast "skipped" entries are informational and
 * excluded.
 *
 * `okExitCodes` widens which exit codes are allowed (see `isExitAllowed`);
 * omitted, only 0 succeeds. It never suppresses a signal kill or a spawn
 * error — those hosts produced no answer at all, so a guard command can't
 * treat them as one.
 *
 * Called AFTER RunResult resources are written so diagnostic data is
 * always persisted regardless of whether the method succeeds or fails.
 *
 * Exported for direct unit testing.
 */
export function throwOnHostFailures(
  results: HostRunResult[],
  method: string,
  okExitCodes?: OkExitCodes,
): void {
  const failed = results.filter((r) => {
    if (r.exitCode !== null && !isExitAllowed(r.exitCode, okExitCodes)) {
      return true;
    }
    if (r.signal !== null) return true;
    if (r.error !== undefined && !r.error.startsWith("skipped:")) return true;
    return false;
  });
  if (failed.length === 0) return;

  const details = failed.map((r) => {
    const reason = r.error ??
      (r.signal !== null ? `killed by ${r.signal}` : `exit ${r.exitCode}`);
    const stderr = r.stderr ? `: ${truncateStderr(r.stderr)}` : "";
    return `${r.host} (${reason}${stderr})`;
  });
  throw new Error(
    `${method} failed on ${failed.length}/${results.length} host(s): ${
      details.join("; ")
    }`,
  );
}

/**
 * Per-call run options shared by exec/script/copy. `okExitCodes` is passed
 * separately because it lives on the exec/script arg schemas, not on the
 * shared `Targeting` shape.
 */
function runOptions(
  g: GlobalArgs,
  t: Targeting,
  method: string,
  recordedArgs: Record<string, unknown>,
  okExitCodes?: OkExitCodes,
) {
  return {
    method,
    parallel: t.parallel ?? g.defaultParallel,
    timeoutSec: t.timeoutSec ?? g.defaultTimeoutSec,
    failFast: t.failFast ?? g.failFast,
    capture: t.captureOutput ?? g.captureOutput,
    recordedArgs,
    okExitCodes,
  };
}

/**
 * Build the ArgvContext for a host: resolves its ControlPath (ssh + CM only)
 * and the SendEnv key set. Ensures the control directory exists when a
 * ControlPath will be used.
 */
async function argvContextFor(
  g: GlobalArgs,
  host: EffectiveHost,
  methodEnv: Record<string, string> | undefined,
): Promise<ArgvContext> {
  let cp: string | undefined;
  if (host.transport.kind === "ssh" && host.transport.controlMaster.enabled) {
    await ensureControlDir(g.name);
    cp = await controlPath(g.name, host);
  }
  return {
    binaries: binaries(g),
    controlPath: cp,
    sendEnvKeys: sendEnvKeys(host, methodEnv),
  };
}

/** Spawn env for a host = forwarded env + (SSHPASS for password auth). */
function envFor(
  host: EffectiveHost,
  methodEnv: Record<string, string> | undefined,
): Record<string, string> {
  return spawnEnv(host, forwardedEnv(host, methodEnv));
}

// ---------------------------------------------------------------------------
// Temp-key materialization for identityContent
// ---------------------------------------------------------------------------

interface MaterializedKeys {
  hosts: EffectiveHost[];
  tempPaths: Map<string, string>;
}

async function materializeTempKeys(
  hosts: EffectiveHost[],
): Promise<MaterializedKeys> {
  const tempPaths = new Map<string, string>();
  const patched: EffectiveHost[] = [];

  try {
    for (const host of hosts) {
      if (
        host.transport.kind === "ssh" &&
        host.transport.identityContent !== undefined
      ) {
        const tmpFile = await Deno.makeTempFile({ prefix: "swamp-ssh-key-" });
        tempPaths.set(host.name, tmpFile);
        const ic = host.transport.identityContent;
        const content = ic.endsWith("\n") ? ic : ic + "\n";
        await Deno.writeTextFile(tmpFile, content, {
          mode: 0o600,
        });
        patched.push({
          ...host,
          transport: {
            ...host.transport,
            identityFile: tmpFile,
            identityContent: undefined,
          },
        });
      } else {
        patched.push(host);
      }
    }
  } catch (err) {
    await cleanupTempKeys(tempPaths);
    throw err;
  }

  return { hosts: patched, tempPaths };
}

async function cleanupTempKeys(
  tempPaths: Map<string, string>,
): Promise<void> {
  for (const path of tempPaths.values()) {
    try {
      await Deno.remove(path);
    } catch {
      // Already removed or never written — ignore.
    }
  }
}

/**
 * Persist one RunResult resource and return its handle.
 *
 * The write is tagged with the run's outcome metadata so a `runModel` caller
 * holding the returned handle can branch on `handle.tags.exitCode` without
 * reading resource content, and so the audit trail is queryable by tag
 * (e.g. every non-zero exec on a given host). Tag values are always strings.
 *
 * `exitCode` is omitted when the process produced none — killed by a signal
 * or failed to spawn. An absent tag is the honest encoding: there was no
 * exit status, which is not the same as exit 0 or any other number.
 */
async function writeRunResult(
  ctx: FleetContext,
  result: HostRunResult,
  runHistory: number,
  fleet: string,
): Promise<DataHandle> {
  const tags: Record<string, string> = {
    fleet,
    host: result.host,
    method: result.method,
  };
  if (result.exitCode !== null) tags.exitCode = String(result.exitCode);

  return await ctx.writeResource(
    "runResult",
    `run-${result.method}-${result.host}`,
    result as unknown as Record<string, unknown>,
    // Honor the fleet's runHistory knob as a per-write gc override; the
    // static resource declaration can't read globalArgs.
    { garbageCollection: runHistory, tags },
  );
}

// ---------------------------------------------------------------------------
// exec
// ---------------------------------------------------------------------------

export async function runExec(
  args: ExecArgs,
  ctx: FleetContext,
): Promise<{ dataHandles: DataHandle[] }> {
  const g = parseGlobals(ctx);
  const selected = resolveSelection(ctx, g, args.hosts);
  const { hosts: materialized, tempPaths } = await materializeTempKeys(
    selected,
  );

  try {
    const recordedArgs: Record<string, unknown> = {
      command: args.command,
      sudo: args.sudo ?? false,
      hasStdin: args.stdin !== undefined,
      ...(args.okExitCodes !== undefined
        ? { okExitCodes: args.okExitCodes }
        : {}),
    };

    const plans: HostPlan[] = [];
    for (const host of materialized) {
      const actx = await argvContextFor(g, host, args.env);
      const command = applySudo(args.command, args.sudo, actx.sendEnvKeys);
      plans.push({
        host,
        argv: buildExecArgv(host, command, actx),
        env: envFor(host, args.env),
        stdin: args.stdin,
      });
    }

    const results = await runHosts(
      plans,
      runOptions(g, args, "exec", recordedArgs, args.okExitCodes),
    );
    const handles: DataHandle[] = [];
    for (const r of results) {
      handles.push(await writeRunResult(ctx, r, g.runHistory, g.name));
    }
    throwOnHostFailures(results, "exec", args.okExitCodes);
    return { dataHandles: handles };
  } finally {
    await cleanupTempKeys(tempPaths);
  }
}

// ---------------------------------------------------------------------------
// script
// ---------------------------------------------------------------------------

export async function runScript(
  args: ScriptArgs,
  ctx: FleetContext,
): Promise<{ dataHandles: DataHandle[] }> {
  const g = parseGlobals(ctx);
  const selected = resolveSelection(ctx, g, args.hosts);
  const { hosts: materialized, tempPaths } = await materializeTempKeys(
    selected,
  );

  try {
    const recordedArgs: Record<string, unknown> = {
      interpreter: args.interpreter,
      sudo: args.sudo ?? false,
      scriptBytes: new TextEncoder().encode(args.script).length,
      ...(args.okExitCodes !== undefined
        ? { okExitCodes: args.okExitCodes }
        : {}),
    };

    const plans: HostPlan[] = [];
    for (const host of materialized) {
      const actx = await argvContextFor(g, host, args.env);
      const remote = scriptRemoteCommand(args.interpreter, args.sudo);
      plans.push({
        host,
        argv: buildExecArgv(host, remote, actx),
        env: envFor(host, args.env),
        stdin: args.script,
      });
    }

    const results = await runHosts(
      plans,
      runOptions(g, args, "script", recordedArgs, args.okExitCodes),
    );
    const handles: DataHandle[] = [];
    for (const r of results) {
      handles.push(await writeRunResult(ctx, r, g.runHistory, g.name));
    }
    throwOnHostFailures(results, "script", args.okExitCodes);
    return { dataHandles: handles };
  } finally {
    await cleanupTempKeys(tempPaths);
  }
}

// ---------------------------------------------------------------------------
// copy
// ---------------------------------------------------------------------------

export async function runCopy(
  args: CopyArgs,
  ctx: FleetContext,
): Promise<{ dataHandles: DataHandle[] }> {
  const g = parseGlobals(ctx);
  const selected = resolveSelection(ctx, g, args.hosts);
  const { hosts: materialized, tempPaths } = await materializeTempKeys(
    selected,
  );

  try {
    const recordedArgs: Record<string, unknown> = {
      src: args.src,
      dst: args.dst,
      direction: args.direction,
      recursive: args.recursive ?? false,
      useRsync: args.useRsync ?? false,
    };

    const plans: HostPlan[] = [];
    for (const host of materialized) {
      const actx = await argvContextFor(g, host, args.env);
      plans.push({
        host,
        argv: buildCopyArgv(host, {
          src: args.src,
          dst: args.dst,
          direction: args.direction,
          recursive: args.recursive,
          useRsync: args.useRsync,
        }, actx),
        env: envFor(host, args.env),
      });
    }

    const results = await runHosts(
      plans,
      runOptions(g, args, "copy", recordedArgs),
    );
    const handles: DataHandle[] = [];
    for (const r of results) {
      handles.push(await writeRunResult(ctx, r, g.runHistory, g.name));
    }
    throwOnHostFailures(results, "copy");
    return { dataHandles: handles };
  } finally {
    await cleanupTempKeys(tempPaths);
  }
}

// ---------------------------------------------------------------------------
// apply
// ---------------------------------------------------------------------------

export async function runApply(
  ctx: FleetContext,
): Promise<{ dataHandles: DataHandle[] }> {
  const g = parseGlobals(ctx);
  const hosts = effectiveHosts(g);
  const now = new Date().toISOString();
  const handles: DataHandle[] = [];
  const liveNames = new Set<string>();

  for (const host of hosts) {
    const instance = `host-${host.name}`;
    liveNames.add(instance);
    handles.push(
      await ctx.writeResource(
        "host",
        instance,
        {
          name: host.name,
          address: host.address,
          port: host.transport.kind === "ssh" ? host.transport.port : 22,
          user: host.transport.user,
          tags: host.tags,
          attrs: host.attrs,
          transport: host.transport.kind,
          fleet: g.name,
          recordedAt: now,
        },
        // Resource-level tag so workflow CEL can select via
        // data.findByTag("fleet", "<name>"). This is distinct from the
        // host's own `tags` array, which is a data field for selectors.
        { tags: { fleet: g.name } },
      ),
    );
  }

  // Prune stale host-* resources whose names disappeared from hosts[].
  const existing = await ctx.dataRepository.findAllForModel(
    ctx.modelType,
    ctx.modelId,
  );
  for (const rec of existing) {
    if (rec.name.startsWith("host-") && !liveNames.has(rec.name)) {
      await ctx.dataRepository.delete(ctx.modelType, ctx.modelId, rec.name);
      ctx.logger.info("pruned stale host resource {name}", { name: rec.name });
    }
  }

  return { dataHandles: handles };
}

// ---------------------------------------------------------------------------
// Master lifecycle: open / check / close
// ---------------------------------------------------------------------------

type MasterEvent = "open" | "check" | "exit";

async function writeMasterAudit(
  ctx: FleetContext,
  host: string,
  event: MasterEvent,
  outcome: "ok" | "absent" | "error",
  detail: string | undefined,
): Promise<DataHandle> {
  return await ctx.writeResource("masterAudit", `masterAudit-${host}`, {
    host,
    event,
    outcome,
    detail,
    recordedAt: new Date().toISOString(),
  });
}

export async function runOpen(
  args: Targeting,
  ctx: FleetContext,
): Promise<{ dataHandles: DataHandle[] }> {
  const g = parseGlobals(ctx);
  const selected = resolveSelection(ctx, g, args.hosts);
  const { hosts: materialized, tempPaths } = await materializeTempKeys(
    selected,
  );
  const bins = binaries(g);

  try {
    const plans: HostPlan[] = [];
    const tailscaleHandles: DataHandle[] = [];
    for (const host of materialized) {
      if (host.transport.kind !== "ssh") {
        tailscaleHandles.push(
          await writeMasterAudit(
            ctx,
            host.name,
            "open",
            "ok",
            "tailscale transport: no ControlMaster needed",
          ),
        );
        continue;
      }
      if (!host.transport.controlMaster.enabled) {
        tailscaleHandles.push(
          await writeMasterAudit(
            ctx,
            host.name,
            "open",
            "ok",
            "ControlMaster disabled for host",
          ),
        );
        continue;
      }
      await ensureControlDir(g.name);
      const cp = await controlPath(g.name, host);
      const openArgv = openMasterArgv(bins.ssh, {
        controlPath: cp,
        persistSec: host.transport.controlMaster.persistSec,
        identityFile: host.transport.identityFile,
        identityAgent: host.transport.identityAgent,
        identitiesOnly: host.transport.identitiesOnly,
        user: host.transport.user,
        address: host.address,
        port: host.transport.port,
        proxyJump: host.transport.proxyJump,
        proxyCommand: host.transport.proxyCommand,
      });
      const actx: ArgvContext = { binaries: bins, sendEnvKeys: [] };
      plans.push({
        host,
        argv: maybeWrapSshpass(host, openArgv, actx),
        env: envFor(host, args.env),
      });
    }

    const results = await runHosts(plans, {
      method: "open",
      parallel: args.parallel ?? g.defaultParallel,
      timeoutSec: args.timeoutSec ?? g.defaultTimeoutSec,
      failFast: args.failFast ?? g.failFast,
      capture: true,
      recordedArgs: {},
    });

    const handles = [...tailscaleHandles];
    for (const r of results) {
      const outcome = r.error || r.exitCode !== 0 ? "error" : "ok";
      handles.push(
        await writeMasterAudit(
          ctx,
          r.host,
          "open",
          outcome,
          r.error ?? (r.stderr || undefined),
        ),
      );
    }
    return { dataHandles: handles };
  } finally {
    await cleanupTempKeys(tempPaths);
  }
}

export async function runCheck(
  args: Targeting,
  ctx: FleetContext,
): Promise<{ dataHandles: DataHandle[] }> {
  const g = parseGlobals(ctx);
  const selected = resolveSelection(ctx, g, args.hosts);
  const bins = binaries(g);

  const plans: HostPlan[] = [];
  for (const host of selected) {
    if (host.transport.kind !== "ssh") {
      // tailscale: probe with a trivial remote command.
      const actx = await argvContextFor(g, host, args.env);
      plans.push({
        host,
        argv: buildExecArgv(host, "true", actx),
        env: envFor(host, args.env),
      });
      continue;
    }
    const cp = await controlPath(g.name, host);
    plans.push({
      host,
      argv: checkMasterArgv(bins.ssh, cp, host.transport.user, host.address),
      env: envFor(host, args.env),
    });
  }

  const results = await runHosts(plans, {
    method: "check",
    parallel: args.parallel ?? g.defaultParallel,
    timeoutSec: args.timeoutSec ?? g.defaultTimeoutSec,
    failFast: args.failFast ?? g.failFast,
    capture: true,
    recordedArgs: {},
  });

  const handles: DataHandle[] = [];
  for (const r of results) {
    const outcome = r.error ? "error" : r.exitCode === 0 ? "ok" : "absent";
    handles.push(
      await writeMasterAudit(
        ctx,
        r.host,
        "check",
        outcome,
        r.error ?? (r.stderr || undefined),
      ),
    );
  }
  return { dataHandles: handles };
}

export async function runClose(
  args: Targeting,
  ctx: FleetContext,
): Promise<{ dataHandles: DataHandle[] }> {
  const g = parseGlobals(ctx);
  const selected = resolveSelection(ctx, g, args.hosts);
  const bins = binaries(g);

  const plans: HostPlan[] = [];
  const skipHandles: DataHandle[] = [];
  for (const host of selected) {
    if (host.transport.kind !== "ssh") {
      skipHandles.push(
        await writeMasterAudit(
          ctx,
          host.name,
          "exit",
          "ok",
          "tailscale transport: no ControlMaster to close",
        ),
      );
      continue;
    }
    const cp = await controlPath(g.name, host);
    plans.push({
      host,
      argv: exitMasterArgv(bins.ssh, cp, host.transport.user, host.address),
      env: envFor(host, args.env),
    });
  }

  const results = await runHosts(plans, {
    method: "close",
    parallel: args.parallel ?? g.defaultParallel,
    timeoutSec: args.timeoutSec ?? g.defaultTimeoutSec,
    failFast: args.failFast ?? g.failFast,
    capture: true,
    recordedArgs: {},
  });

  const handles = [...skipHandles];
  for (const r of results) {
    // `ssh -O exit` returns non-zero when there was no master — treat as
    // absent, not an error.
    const outcome = r.error ? "error" : r.exitCode === 0 ? "ok" : "absent";
    handles.push(
      await writeMasterAudit(
        ctx,
        r.host,
        "exit",
        outcome,
        r.error ?? (r.stderr || undefined),
      ),
    );
  }
  return { dataHandles: handles };
}

// ---------------------------------------------------------------------------
// forward
// ---------------------------------------------------------------------------

function forwardInstance(host: string, type: string, spec: string): string {
  // Resource instance names must be filesystem-safe. Replace ':' in the
  // spec with '_' so the name is portable.
  return `forwardState-${host}-${type}-${spec.replaceAll(":", "_")}`;
}

export async function runForward(
  args: ForwardArgs,
  ctx: FleetContext,
): Promise<{ dataHandles: DataHandle[] }> {
  const g = parseGlobals(ctx);
  const selected = resolveSelection(ctx, g, args.hosts);
  const bins = binaries(g);
  const handles: DataHandle[] = [];
  const now = new Date().toISOString();

  for (const host of selected) {
    if (args.action === "list") {
      // Enumerate every forwardState resource belonging to this host and
      // re-emit it as a handle. OpenSSH has no list-forwards control op, so
      // we rely on the resources we recorded at open time.
      const prefix = `forwardState-${host.name}-`;
      const existing = await ctx.dataRepository.findAllForModel(
        ctx.modelType,
        ctx.modelId,
      );
      for (const rec of existing) {
        if (!rec.name.startsWith(prefix)) continue;
        const data = await ctx.readResource(rec.name);
        if (data) {
          handles.push(await ctx.writeResource("forwardState", rec.name, data));
        }
      }
      continue;
    }

    const spec = args.spec!; // schema guarantees presence for open/cancel
    const inst = forwardInstance(host.name, args.type, spec);

    if (args.action === "open") {
      if (host.transport.kind === "tailscale") {
        const opened = openTailscaleForward(
          host,
          bins.tailscale,
          args.type,
          spec,
          envFor(host, args.env),
        );
        handles.push(
          await ctx.writeResource("forwardState", inst, {
            host: host.name,
            transport: "tailscale",
            type: args.type,
            spec,
            pid: opened.pid,
            openedAt: now,
          }),
        );
      } else {
        const cp = await controlPath(g.name, host);
        await ensureControlDir(g.name);
        const plan: HostPlan = {
          host,
          argv: sshForwardArgv(bins.ssh, cp, "forward", args.type, spec, host),
          env: envFor(host, args.env),
        };
        const [res] = await runHosts([plan], {
          method: "forward",
          parallel: 1,
          timeoutSec: args.timeoutSec ?? g.defaultTimeoutSec,
          failFast: false,
          capture: true,
          recordedArgs: { action: "open", spec, type: args.type },
        });
        if (res.error || res.exitCode !== 0) {
          throw new Error(
            `forward open failed on ${host.name}: ${
              res.error ?? res.stderr ?? `exit ${res.exitCode}`
            }`,
          );
        }
        handles.push(
          await ctx.writeResource("forwardState", inst, {
            host: host.name,
            transport: "ssh",
            type: args.type,
            spec,
            controlPath: cp,
            openedAt: now,
          }),
        );
      }
    } else {
      // cancel
      const existing = await ctx.readResource(inst);
      if (host.transport.kind === "tailscale") {
        const pid = existing?.pid;
        if (typeof pid === "number") cancelTailscaleForward(pid);
      } else {
        const cp = await controlPath(g.name, host);
        const plan: HostPlan = {
          host,
          argv: sshForwardArgv(bins.ssh, cp, "cancel", args.type, spec, host),
          env: envFor(host, args.env),
        };
        await runHosts([plan], {
          method: "forward",
          parallel: 1,
          timeoutSec: args.timeoutSec ?? g.defaultTimeoutSec,
          failFast: false,
          capture: true,
          recordedArgs: { action: "cancel", spec, type: args.type },
        });
      }
      handles.push(
        await ctx.writeResource("forwardState", inst, {
          host: host.name,
          transport: host.transport.kind,
          type: args.type,
          spec,
          ...(existing?.pid ? { pid: existing.pid } : {}),
          ...(existing?.controlPath
            ? { controlPath: existing.controlPath }
            : {}),
          openedAt: typeof existing?.openedAt === "string"
            ? existing.openedAt
            : now,
          closedAt: now,
        }),
      );
    }
  }

  return { dataHandles: handles };
}

// ---------------------------------------------------------------------------
// collect-host-public-key
// ---------------------------------------------------------------------------

const KNOWN_ALGORITHMS = new Set([
  "ssh-ed25519",
  "ssh-rsa",
  "ecdsa-sha2-nistp256",
  "ecdsa-sha2-nistp384",
  "ecdsa-sha2-nistp521",
  "sk-ssh-ed25519@openssh.com",
  "sk-ecdsa-sha2-nistp256@openssh.com",
  "ssh-dss",
]);

async function computeFingerprint(base64Data: string): Promise<string> {
  const raw = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));
  const hash = new Uint8Array(await crypto.subtle.digest("SHA-256", raw));
  const b64 = btoa(String.fromCharCode(...hash)).replace(/=+$/, "");
  return `SHA256:${b64}`;
}

function parsePublicKeyLine(
  stdout: string,
  hostName: string,
): { algorithm: string; base64Data: string; fullLine: string } {
  const trimmed = stdout.trim();

  if (trimmed === "") {
    throw new Error(
      `collect-host-public-key failed on ${hostName}: file is empty or unreadable`,
    );
  }

  if (trimmed.startsWith("-----BEGIN ")) {
    throw new Error(
      `collect-host-public-key failed on ${hostName}: output looks like a ` +
        `private key (starts with "-----BEGIN"). Only public key files are ` +
        `allowed — check the hostKeyPath.`,
    );
  }

  const lines = trimmed.split("\n").filter((l) => l.trim() !== "");
  if (lines.length !== 1) {
    throw new Error(
      `collect-host-public-key failed on ${hostName}: expected a single ` +
        `public key line but got ${lines.length} lines. Ensure hostKeyPath ` +
        `points to a .pub file containing exactly one key.`,
    );
  }

  const parts = lines[0].split(/\s+/);
  if (parts.length < 2) {
    throw new Error(
      `collect-host-public-key failed on ${hostName}: malformed public key ` +
        `line — expected "<algorithm> <base64> [comment]".`,
    );
  }

  const algorithm = parts[0];
  if (!KNOWN_ALGORITHMS.has(algorithm)) {
    throw new Error(
      `collect-host-public-key failed on ${hostName}: unrecognized key ` +
        `algorithm "${algorithm}". Expected one of: ${
          [...KNOWN_ALGORITHMS].join(", ")
        }.`,
    );
  }

  return { algorithm, base64Data: parts[1], fullLine: lines[0] };
}

export async function runCollectHostPublicKey(
  args: CollectHostPublicKeyArgs,
  ctx: FleetContext,
): Promise<{ dataHandles: DataHandle[] }> {
  const g = parseGlobals(ctx);
  const selected = resolveSelection(ctx, g, args.hosts);
  const { hosts: materialized, tempPaths } = await materializeTempKeys(
    selected,
  );

  try {
    const recordedArgs: Record<string, unknown> = {
      hostKeyPath: args.hostKeyPath,
    };

    const plans: HostPlan[] = [];
    for (const host of materialized) {
      const actx = await argvContextFor(g, host, args.env);
      const command = `cat ${posixQuote(args.hostKeyPath)}`;
      plans.push({
        host,
        argv: buildExecArgv(host, command, actx),
        env: envFor(host, args.env),
      });
    }

    const results = await runHosts(
      plans,
      runOptions(g, args, "collect-host-public-key", recordedArgs),
    );

    const handles: DataHandle[] = [];
    for (const r of results) {
      handles.push(await writeRunResult(ctx, r, g.runHistory, g.name));
    }

    throwOnHostFailures(results, "collect-host-public-key");

    const now = new Date().toISOString();
    for (const r of results) {
      if (r.exitCode !== 0 || r.error) continue;
      const stdout = r.stdout ?? "";
      const host = materialized.find((h) => h.name === r.host)!;
      const parsed = parsePublicKeyLine(stdout, r.host);
      const fingerprint = await computeFingerprint(parsed.base64Data);

      handles.push(
        await ctx.writeResource(
          "hostPublicKey",
          `hostPublicKey-${r.host}`,
          {
            name: r.host,
            host: host.address,
            user: host.transport.user,
            hostKeyPath: args.hostKeyPath,
            publicKey: parsed.fullLine,
            algorithm: parsed.algorithm,
            fingerprint,
            observedAt: now,
          },
        ),
      );
    }

    return { dataHandles: handles };
  } finally {
    await cleanupTempKeys(tempPaths);
  }
}

// ---------------------------------------------------------------------------
// resolve
// ---------------------------------------------------------------------------

/** Normalized textual form of a selector, recorded in the selection resource
 * and hashed for the instance name. Arrays are JSON-encoded; string forms
 * (including "all") are already text. */
function normalizeSelector(selector: Selector): string {
  return Array.isArray(selector) ? JSON.stringify(selector) : selector;
}

/**
 * Short stable hash of the normalized selector. Selectors can contain
 * characters that aren't valid in data names (spaces, quotes, colons), so the
 * instance name carries a digest instead. Stability matters: the same
 * selector must map to the same instance so repeated resolves version one
 * resource rather than proliferate.
 */
async function selectorHash(normalized: string): Promise<string> {
  const digest = new Uint8Array(
    await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(normalized),
    ),
  );
  return [...digest.slice(0, 6)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Resolve a selector against the fleet and record the result as data — no
 * ssh/scp/tailscale is ever spawned. Zero matches is a SUCCESS here: the
 * empty list with `count: 0` is exactly the structured answer a planner or
 * workflow gate needs, which the connecting methods can't give (they throw).
 * A malformed selector still throws via `matchSelection`.
 *
 * The host records are built from an explicit field allowlist so credential
 * material (auth, identityFile/Content/Agent, proxy settings) can never leak
 * into the selection resource. The write is tagged with the match count so a
 * `runModel` caller can branch on `handle.tags.count === "0"` without a
 * subsequent read.
 */
export async function runResolve(
  args: ResolveArgs,
  ctx: FleetContext,
): Promise<{ dataHandles: DataHandle[] }> {
  const g = parseGlobals(ctx);
  const selected = matchSelection(ctx, g, args.hosts);
  const selector = normalizeSelector(args.hosts);

  const hosts = selected.map((h) => ({
    name: h.name,
    address: h.address,
    ...(h.transport.kind === "ssh" ? { port: h.transport.port } : {}),
    ...(h.transport.user !== undefined ? { user: h.transport.user } : {}),
    tags: h.tags,
    attrs: h.attrs,
    transport: h.transport.kind,
  }));

  const handle = await ctx.writeResource(
    "selection",
    `resolve-${await selectorHash(selector)}`,
    {
      fleet: g.name,
      selector,
      count: hosts.length,
      hosts,
      resolvedAt: new Date().toISOString(),
    },
    {
      tags: {
        fleet: g.name,
        method: "resolve",
        count: String(hosts.length),
      },
    },
  );
  return { dataHandles: [handle] };
}
