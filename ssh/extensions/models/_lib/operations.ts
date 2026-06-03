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
  type CopyArgs,
  type ExecArgs,
  type ForwardArgs,
  type GlobalArgs,
  GlobalArgsSchema,
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
  ) => Promise<{ name: string }>;
  readResource: (
    name: string,
    version?: number,
  ) => Promise<Record<string, unknown> | null>;
  createCelEnvironment: () => CelEnvLike;
  dataRepository: FleetDataRepository;
}

/** A resource handle the model returns to swamp. */
export interface DataHandle {
  name: string;
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
 * Resolve the selector to matched effective hosts.
 *
 * This is the execute-time home for two validations that can't live in
 * pre-flight checks (checks don't receive method args in swamp): a malformed
 * CEL selector surfaces as a clear error, and an empty match is rejected with
 * a form-aware message. Both run before any process is spawned. Exported for
 * direct unit testing.
 */
export function resolveSelection(
  ctx: FleetContext,
  g: GlobalArgs,
  selector: Selector,
): EffectiveHost[] {
  const hosts = effectiveHosts(g);

  let selected: EffectiveHost[];
  try {
    selected = selectHosts(
      selector,
      hosts,
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

  if (selected.length === 0) {
    throw new Error(noMatchMessage(selector));
  }
  return selected;
}

/**
 * Throw an aggregate error when any host in the result set experienced a
 * genuine failure: non-zero exit, killed by signal, or a spawn/timeout
 * error. Fail-fast "skipped" entries are informational and excluded.
 *
 * Called AFTER RunResult resources are written so diagnostic data is
 * always persisted regardless of whether the method succeeds or fails.
 */
function throwOnHostFailures(
  results: HostRunResult[],
  method: string,
): void {
  const failed = results.filter((r) => {
    if (r.exitCode !== null && r.exitCode !== 0) return true;
    if (r.signal !== null) return true;
    if (r.error !== undefined && !r.error.startsWith("skipped:")) return true;
    return false;
  });
  if (failed.length === 0) return;

  const details = failed.map((r) => {
    const reason = r.error ??
      (r.signal !== null ? `killed by ${r.signal}` : `exit ${r.exitCode}`);
    const stderr = r.stderr ? `: ${r.stderr.trimEnd().split("\n").at(-1)}` : "";
    return `${r.host} (${reason}${stderr})`;
  });
  throw new Error(
    `${method} failed on ${failed.length}/${results.length} host(s): ${
      details.join("; ")
    }`,
  );
}

/** Per-call run options shared by exec/script/copy. */
function runOptions(
  g: GlobalArgs,
  t: Targeting,
  method: string,
  recordedArgs: Record<string, unknown>,
) {
  return {
    method,
    parallel: t.parallel ?? g.defaultParallel,
    timeoutSec: t.timeoutSec ?? g.defaultTimeoutSec,
    failFast: t.failFast ?? g.failFast,
    capture: t.captureOutput ?? g.captureOutput,
    recordedArgs,
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

/** Persist one RunResult resource and return its handle. */
async function writeRunResult(
  ctx: FleetContext,
  result: HostRunResult,
  runHistory: number,
): Promise<DataHandle> {
  return await ctx.writeResource(
    "runResult",
    `run-${result.method}-${result.host}`,
    result as unknown as Record<string, unknown>,
    // Honor the fleet's runHistory knob as a per-write gc override; the
    // static resource declaration can't read globalArgs.
    { garbageCollection: runHistory },
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
    };

    const plans: HostPlan[] = [];
    for (const host of materialized) {
      const actx = await argvContextFor(g, host, args.env);
      const command = applySudo(args.command, args.sudo);
      plans.push({
        host,
        argv: buildExecArgv(host, command, actx),
        env: envFor(host, args.env),
        stdin: args.stdin,
      });
    }

    const results = await runHosts(
      plans,
      runOptions(g, args, "exec", recordedArgs),
    );
    const handles: DataHandle[] = [];
    for (const r of results) {
      handles.push(await writeRunResult(ctx, r, g.runHistory));
    }
    throwOnHostFailures(results, "exec");
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
      runOptions(g, args, "script", recordedArgs),
    );
    const handles: DataHandle[] = [];
    for (const r of results) {
      handles.push(await writeRunResult(ctx, r, g.runHistory));
    }
    throwOnHostFailures(results, "script");
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
      handles.push(await writeRunResult(ctx, r, g.runHistory));
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
      plans.push({
        host,
        argv: openMasterArgv(bins.ssh, {
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
        }),
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
