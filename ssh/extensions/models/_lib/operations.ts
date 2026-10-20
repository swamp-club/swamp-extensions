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
  type HostKeyPin,
  HostKeyPinSchema,
  KNOWN_KEY_ALGORITHMS,
  type OkExitCodes,
  type ResolveArgs,
  type ScriptArgs,
  type Selector,
  type Targeting,
} from "./schemas.ts";
import { type EffectiveHost, effectiveHosts } from "./hosts.ts";
import {
  computeFingerprint,
  effectiveHostKeyPolicy,
  hostKeyAlias,
  type HostKeyArgv,
  hostKeyChangedMessage,
  hostKeyPinName,
  isHostKeyFailure,
  knownHostsContent,
  type ParsedKey,
  parseKeyLine,
  parseKnownHosts,
  presentedFingerprint,
  usesPerCallKnownHosts,
} from "./host_keys.ts";
import { makeSafeTempDir, prepareIdentities } from "./identities.ts";
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
  argvRemoteCommand,
  atomicCleanupCommand,
  atomicFinalizeCommand,
  atomicPrepareCommand,
  buildCopyArgv,
  buildExecArgv,
  forwardedEnv,
  hostKeyOpts,
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
  stagingPath,
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
  prepared: PreparedCall,
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
    hostKey: prepared.hostKeys.get(host.name)?.argv,
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
// Per-call preparation: identityContent keys + per-call known_hosts
// ---------------------------------------------------------------------------

/** Host-key verification state for one pinned/tofu host in this call. */
interface HostKeyState {
  argv: HostKeyArgv;
  address: string;
  port: number;
  /** Fingerprints the host is expected to present (empty on first contact). */
  pinned: string[];
  /** tofu only: the pin resource instance. */
  pinName?: string;
  /** tofu only: the pin read at the start of the call, if any. */
  existingPin?: HostKeyPin;
  /**
   * The call connects with accept-new against an empty file (tofu first
   * contact, or repin); afterwards the file holds the key ssh accepted.
   */
  readBack: boolean;
}

interface PreparedCall {
  hosts: EffectiveHost[];
  hostKeys: Map<string, HostKeyState>;
  cleanup(): Promise<void>;
}

/** For spawns that never verify a host key (tailscale probes). */
const NO_PREPARATION: PreparedCall = {
  hosts: [],
  hostKeys: new Map(),
  cleanup: () => Promise.resolve(),
};

/**
 * Read a tofu pin. Absent → undefined. A pin that exists but does not parse
 * throws: treating it as "no pin" would downgrade the host to first contact
 * (accept any key) and overwrite the pin — failing open. `repin` is the way
 * out of a corrupt pin.
 */
class UnreadablePinError extends Error {}

async function readPin(
  ctx: FleetContext,
  name: string,
): Promise<HostKeyPin | undefined> {
  const raw = await ctx.readResource(name);
  if (raw === null) return undefined;
  const parsed = HostKeyPinSchema.safeParse(raw);
  if (!parsed.success) {
    throw new UnreadablePinError(
      `hostKeyPin ${name} is unreadable (${
        parsed.error.issues[0]?.message ?? "invalid"
      }); ` +
        "refusing to connect — run `repin` to replace it",
    );
  }
  return parsed.data;
}

/**
 * Prepare every selected host for connecting: materialize identityContent
 * (agent or temp file) and write a per-call known_hosts file for each
 * pinned/tofu host. `repin` forces tofu hosts to first-contact mode. The
 * returned `cleanup` must run in a finally.
 */
async function prepareCall(
  ctx: FleetContext,
  g: GlobalArgs,
  selected: EffectiveHost[],
  t: Targeting,
  opts: { repin?: boolean } = {},
): Promise<PreparedCall> {
  const parallel = t.parallel ?? g.defaultParallel;
  const timeoutSec = t.timeoutSec ?? g.defaultTimeoutSec;
  const identities = await prepareIdentities(selected, {
    mode: g.identityContentMode,
    sshAgentBinary: g.sshAgentBinary,
    sshAddBinary: g.sshAddBinary,
    // Hosts run in waves of `parallel`, and atomic copy runs up to four
    // batches (prepare, upload, finalize, cleanup); keep keys loaded for the
    // worst case. The agent is killed at the end of the call anyway — this
    // only bounds a crash.
    keyLifetimeSec: 4 * timeoutSec * Math.ceil(selected.length / parallel) +
      60,
    logger: ctx.logger,
  });

  const hostKeys = new Map<string, HostKeyState>();
  let dir: string | undefined;
  const cleanup = async () => {
    await identities.cleanup();
    if (dir !== undefined) {
      try {
        await Deno.remove(dir, { recursive: true });
      } catch {
        // Already removed — ignore.
      }
    }
  };

  try {
    for (const host of identities.hosts) {
      if (host.transport.kind !== "ssh") continue;
      const policy = effectiveHostKeyPolicy(host.transport);
      if (!usesPerCallKnownHosts(policy)) continue;

      const port = host.transport.port;
      let keys: ParsedKey[] = [];
      let pinName: string | undefined;
      let existingPin: HostKeyPin | undefined;
      if (policy === "pinned") {
        keys = (host.transport.hostKeys ?? [])
          .map(parseKeyLine)
          .filter((k): k is ParsedKey => k !== null);
      } else {
        pinName = await hostKeyPinName(host.address, port);
        // repin replaces the pin, so an unreadable one must not block it;
        // any other read error (the datastore) still propagates.
        existingPin = opts.repin
          ? await readPin(ctx, pinName).catch((err) => {
            if (err instanceof UnreadablePinError) return undefined;
            throw err;
          })
          : await readPin(ctx, pinName);
        if (existingPin && !opts.repin) {
          keys = existingPin.keys
            .map((k) => parseKeyLine(k.publicKey))
            .filter((k): k is ParsedKey => k !== null);
          // Defence in depth behind the schema: an existing pin must never
          // degrade to first contact (accept-new against an empty file).
          if (keys.length !== existingPin.keys.length) {
            throw new Error(
              `hostKeyPin ${pinName} has an unparseable key; refusing to connect — run \`repin\` to replace it`,
            );
          }
        }
      }

      dir ??= await makeSafeTempDir("swamp-ssh-hosts-");
      const alias = await hostKeyAlias(host.address, port);
      const file = `${dir}/${hostKeys.size}.known_hosts`;
      await Deno.writeTextFile(file, knownHostsContent(alias, keys), {
        mode: 0o600,
      });
      const pinned: string[] = [];
      for (const k of keys) pinned.push(await computeFingerprint(k.base64Data));
      hostKeys.set(host.name, {
        argv: { strict: keys.length > 0, knownHostsFile: file, alias },
        address: host.address,
        port,
        pinned,
        pinName,
        existingPin,
        readBack: keys.length === 0,
      });
    }
  } catch (err) {
    await cleanup();
    throw err;
  }

  return { hosts: identities.hosts, hostKeys, cleanup };
}

async function fingerprintsOf(keys: ParsedKey[]): Promise<string[]> {
  const out: string[] = [];
  for (const k of keys) out.push(await computeFingerprint(k.base64Data));
  return out;
}

function sameFingerprints(a: readonly string[], b: readonly string[]): boolean {
  return a.length === b.length && [...a].sort().join() === [...b].sort().join();
}

/**
 * Close the ControlMaster of each host (`ssh -O exit`). Best effort — it
 * fails harmlessly when no master is running. Used wherever a master may have
 * authenticated a key that is no longer trusted: after `repin`, and after a
 * tofu first contact whose key was rejected or could not be pinned.
 */
async function retireMasters(
  g: GlobalArgs,
  hosts: EffectiveHost[],
): Promise<void> {
  const plans: HostPlan[] = [];
  for (const host of hosts) {
    if (host.transport.kind !== "ssh") continue;
    if (!host.transport.controlMaster.enabled) continue;
    plans.push({
      host,
      argv: exitMasterArgv(
        binaries(g).ssh,
        await controlPath(g.name, host),
        host.transport.user,
        host.address,
      ),
      env: envFor(host, undefined),
    });
  }
  if (plans.length === 0) return;
  await runHosts(plans, {
    method: "close",
    parallel: g.defaultParallel,
    timeoutSec: g.defaultTimeoutSec,
    failFast: false,
    capture: true,
    recordedArgs: {},
  });
}

/**
 * After a batch ran: turn OpenSSH host-key refusals into a typed error, and
 * record the key a tofu first contact (or repin) accepted as a hostKeyPin.
 *
 * A pin that appeared while this call was running (a parallel first contact)
 * is re-read before writing: the same key skips the write, a different key
 * fails the host — never overwrite a pin outside `repin`.
 *
 * Mutates `results` (sets `error`) so the run records carry the outcome;
 * returns handles for any pins written.
 */
async function settleHostKeys(
  ctx: FleetContext,
  g: GlobalArgs,
  prepared: PreparedCall,
  results: HostRunResult[],
  opts: { repin?: boolean; transfer?: boolean } = {},
): Promise<DataHandle[]> {
  const handles: DataHandle[] = [];
  // tofu first contacts whose key was rejected: the master they may have
  // opened authenticated that key and must not serve later strict calls (the
  // tofu ControlPath does not change when a pin is written).
  const rejected: EffectiveHost[] = [];
  const hostOf = (name: string) => prepared.hosts.find((h) => h.name === name)!;
  try {
    await settleEach();
  } catch (err) {
    // A failed pin write leaves the first-contact master unpinned.
    for (const r of results) {
      if (prepared.hostKeys.get(r.host)?.readBack) {
        rejected.push(hostOf(r.host));
      }
    }
    throw err;
  } finally {
    if (rejected.length > 0 && !opts.repin) await retireMasters(g, rejected);
  }
  return handles;

  async function settleEach(): Promise<void> {
    for (const r of results) {
      const state = prepared.hostKeys.get(r.host);
      if (state === undefined) continue;

      if (!state.readBack) {
        // Only ssh's own failure is a host-key refusal: for exec/script
        // stderr also carries the remote command's output, which may mention
        // host keys (a nested ssh, a git fetch) without this host's key being
        // at fault, so require ssh's exit 255. scp/rsync (`transfer`) run no
        // remote command and exit 1/12 when their ssh child fails.
        const sshFailed = r.signal === null &&
          (opts.transfer
            ? r.exitCode !== null && r.exitCode !== 0
            : r.exitCode === 255);
        if (sshFailed && isHostKeyFailure(r.stderr)) {
          r.error = hostKeyChangedMessage(
            state.address,
            state.port,
            state.pinned,
            presentedFingerprint(r.stderr),
          );
        }
        continue;
      }
      if (state.pinName === undefined) continue;
      // repin only replaces a pin after the probe fully succeeded: a host that
      // completed key exchange but rejected auth must not get re-pinned.
      if (opts.repin && (r.error !== undefined || r.exitCode !== 0)) continue;

      let content = "";
      try {
        content = await Deno.readTextFile(state.argv.knownHostsFile);
      } catch {
        // Unreadable → treated as "ssh recorded nothing".
      }
      const keys = parseKnownHosts(content);
      if (keys.length === 0) {
        // The connection never reached key exchange, or rode an existing
        // master. Nothing to pin; repin must say so. A tofu call that succeeded
        // without a key exchange rode a master while no pin exists — say so,
        // since the host is running unpinned until that master goes away.
        if (opts.repin) {
          r.error =
            `repin: ssh recorded no host key for ${state.address}:${state.port}`;
        } else if (r.error === undefined && r.exitCode === 0) {
          ctx.logger.warn(
            "tofu host {host} has no pin and this call reused an existing ControlMaster; it will be pinned on the next fresh connection (or run repin)",
            { host: r.host },
          );
        }
        continue;
      }
      // A pin must be readable back (HostKeyPinSchema validates the
      // algorithm); refuse an algorithm we cannot store rather than write a
      // pin that would lock the host out on every later call.
      const unsupported = keys.find((k) =>
        !KNOWN_KEY_ALGORITHMS.has(k.algorithm)
      );
      if (unsupported !== undefined) {
        r.error =
          `cannot pin ${state.address}:${state.port}: unsupported host ` +
          `key algorithm '${unsupported.algorithm}'; use hostKeyPolicy ` +
          "'accept-new' for this host";
        if (!opts.repin) rejected.push(hostOf(r.host));
        continue;
      }
      const seen = await fingerprintsOf(keys);

      if (!opts.repin) {
        let current: HostKeyPin | undefined;
        try {
          current = await readPin(ctx, state.pinName);
        } catch (err) {
          r.error = err instanceof Error ? err.message : String(err);
          rejected.push(hostOf(r.host));
          continue;
        }
        if (current) {
          const pinnedNow = current.keys.map((k) => k.fingerprint);
          if (!sameFingerprints(pinnedNow, seen)) {
            r.error = hostKeyChangedMessage(
              state.address,
              state.port,
              pinnedNow,
              seen[0],
            );
            rejected.push(hostOf(r.host));
          }
          continue;
        }
      }

      const now = new Date().toISOString();
      const previous = state.existingPin?.keys.map((k) => k.fingerprint);
      const pin: HostKeyPin = {
        fleet: g.name,
        address: state.address,
        port: state.port,
        keys: keys.map((k, i) => ({
          algorithm: k.algorithm,
          publicKey: k.publicKey,
          fingerprint: seen[i],
        })),
        firstSeenAt: now,
        pinnedAt: now,
        ...(opts.repin && previous ? { previousFingerprints: previous } : {}),
      };
      handles.push(
        await ctx.writeResource(
          "hostKeyPin",
          state.pinName,
          pin as unknown as Record<string, unknown>,
          { tags: { fleet: g.name, host: r.host } },
        ),
      );
      if (opts.repin) {
        ctx.logger.warn("repinned {host}: {previous} -> {current}", {
          host: r.host,
          previous: previous?.join(", ") ?? "(none)",
          current: seen.join(", "),
        });
      }
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
/**
 * settleHostKeys, then write every host's run record — also when settling
 * throws (a failed pin write), so the audit trail of commands that already
 * ran is never lost. Pin handles first, then run handles.
 */
async function settleAndRecord(
  ctx: FleetContext,
  g: GlobalArgs,
  prepared: PreparedCall,
  results: HostRunResult[],
  opts: { repin?: boolean; transfer?: boolean } = {},
): Promise<DataHandle[]> {
  let pins: DataHandle[] = [];
  const runs: DataHandle[] = [];
  try {
    pins = await settleHostKeys(ctx, g, prepared, results, opts);
  } finally {
    for (const r of results) {
      runs.push(await writeRunResult(ctx, r, g.runHistory, g.name));
    }
  }
  return [...pins, ...runs];
}

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
  const prepared = await prepareCall(ctx, g, selected, args);

  try {
    const recordedArgs: Record<string, unknown> = {
      ...(args.argv !== undefined
        ? { argv: args.argv }
        : { command: args.command }),
      sudo: args.sudo ?? false,
      hasStdin: args.stdin !== undefined,
      ...(args.okExitCodes !== undefined
        ? { okExitCodes: args.okExitCodes }
        : {}),
    };

    const plans: HostPlan[] = [];
    for (const host of prepared.hosts) {
      const actx = await argvContextFor(g, host, args.env, prepared);
      const command = args.argv !== undefined
        ? argvRemoteCommand(args.argv, args.sudo)
        : applySudo(args.command!, args.sudo, actx.sendEnvKeys);
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
    const handles = await settleAndRecord(ctx, g, prepared, results);
    throwOnHostFailures(results, "exec", args.okExitCodes);
    return { dataHandles: handles };
  } finally {
    await prepared.cleanup();
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
  const prepared = await prepareCall(ctx, g, selected, args);

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
    for (const host of prepared.hosts) {
      const actx = await argvContextFor(g, host, args.env, prepared);
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
    const handles = await settleAndRecord(ctx, g, prepared, results);
    throwOnHostFailures(results, "script", args.okExitCodes);
    return { dataHandles: handles };
  } finally {
    await prepared.cleanup();
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
  const prepared = await prepareCall(ctx, g, selected, args);

  try {
    const recordedArgs: Record<string, unknown> = {
      src: args.src,
      dst: args.dst,
      direction: args.direction,
      recursive: args.recursive ?? false,
      useRsync: args.useRsync ?? false,
      ...(args.atomic
        ? {
          atomic: true,
          ...(args.mode !== undefined ? { mode: args.mode } : {}),
          ...(args.owner !== undefined ? { owner: args.owner } : {}),
          verifySha256: args.verifySha256 ?? false,
        }
        : {}),
    };

    const results = args.atomic
      ? await runAtomicCopy(args, g, prepared, recordedArgs)
      : await runPlainCopy(args, g, prepared, recordedArgs);
    // Atomic results carry the finalize exec's output (a key refusal there
    // happens in the prepare exec, which exits 255 like any exec).
    const handles = await settleAndRecord(ctx, g, prepared, results, {
      transfer: !args.atomic,
    });
    throwOnHostFailures(results, "copy");
    return { dataHandles: handles };
  } finally {
    await prepared.cleanup();
  }
}

async function runPlainCopy(
  args: CopyArgs,
  g: GlobalArgs,
  prepared: PreparedCall,
  recordedArgs: Record<string, unknown>,
  staged?: { hosts: EffectiveHost[]; staging: Map<string, string> },
): Promise<HostRunResult[]> {
  const plans: HostPlan[] = [];
  for (const host of staged?.hosts ?? prepared.hosts) {
    const actx = await argvContextFor(g, host, args.env, prepared);
    plans.push({
      host,
      argv: buildCopyArgv(host, {
        src: args.src,
        dst: staged?.staging.get(host.name) ?? args.dst,
        direction: args.direction,
        recursive: args.recursive,
        useRsync: args.useRsync,
        privateUpload: staged !== undefined,
      }, actx),
      env: envFor(host, args.env),
    });
  }
  return await runHosts(plans, runOptions(g, args, "copy", recordedArgs));
}

async function sha256FileHex(path: string): Promise<string> {
  let bytes: Uint8Array<ArrayBuffer>;
  try {
    bytes = await Deno.readFile(path);
  } catch (err) {
    throw new Error(
      `copy: cannot read src '${path}' to compute verifySha256: ${
        err instanceof Error ? err.message : String(err)
      }`,
    );
  }
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function randomToken(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(16)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Did this stage fail (anything but a clean exit 0)? */
function stageFailed(r: HostRunResult): boolean {
  return r.error !== undefined || r.signal !== null || r.exitCode !== 0;
}

/**
 * The local source's permission bits as octal; undefined on Windows (no
 * mode) or when the source cannot be stat'ed — the upload then reports the
 * missing file itself, as a plain copy would.
 */
async function localMode(path: string): Promise<string | undefined> {
  try {
    const mode = (await Deno.stat(path)).mode;
    return mode === null ? undefined : (mode & 0o7777).toString(8);
  } catch {
    return undefined;
  }
}

function stageError(stage: string, r: HostRunResult): string {
  if (r.error !== undefined) return `${stage} failed: ${r.error}`;
  return r.signal !== null
    ? `${stage} failed (killed by ${r.signal})`
    : `${stage} failed (exit ${r.exitCode})`;
}

/**
 * Atomic copy, per host: create an empty 0600 staging file next to `dst`,
 * upload into it, then one remote finalize (refuse symlink/directory,
 * sha256, keep or set owner and mode, mv) over the same connection. A host
 * whose prepare or upload failed gets a best-effort `rm -f` of its staging
 * path. Each host yields one result — the failed stage's, or the
 * finalize's — with `error` naming the stage and timing spanning them all.
 * Stages are paired by host name.
 */
async function runAtomicCopy(
  args: CopyArgs,
  g: GlobalArgs,
  prepared: PreparedCall,
  recordedArgs: Record<string, unknown>,
): Promise<HostRunResult[]> {
  const sha256 = args.verifySha256 ? await sha256FileHex(args.src) : undefined;
  const defaultMode = await localMode(args.src);
  const staging = new Map<string, string>();
  for (const host of prepared.hosts) {
    staging.set(host.name, stagingPath(args.dst, randomToken()));
  }
  const hostByName = new Map(prepared.hosts.map((h) => [h.name, h]));
  const opts = runOptions(g, args, "copy", recordedArgs);

  const remotePlans = async (
    hosts: EffectiveHost[],
    command: (host: EffectiveHost) => string,
  ): Promise<HostPlan[]> => {
    const plans: HostPlan[] = [];
    for (const host of hosts) {
      const actx = await argvContextFor(g, host, args.env, prepared);
      plans.push({
        host,
        argv: buildExecArgv(host, command(host), actx),
        env: envFor(host, args.env),
      });
    }
    return plans;
  };

  const prepares = await runHosts(
    await remotePlans(
      prepared.hosts,
      (h) => atomicPrepareCommand(staging.get(h.name)!),
    ),
    opts,
  );
  const ready = prepares.filter((r) => !stageFailed(r)).map((r) =>
    hostByName.get(r.host)!
  );
  const uploads = await runPlainCopy(args, g, prepared, recordedArgs, {
    hosts: ready,
    staging,
  });
  const uploaded = uploads.filter((r) => !stageFailed(r)).map((r) =>
    hostByName.get(r.host)!
  );

  // Finalize and cleanup ignore fail-fast: a host that already holds a
  // staging file must not be left with an orphan.
  const noFailFast = { ...opts, failFast: false };
  const finalized = await runHosts(
    await remotePlans(uploaded, (h) =>
      atomicFinalizeCommand({
        staging: staging.get(h.name)!,
        dst: args.dst,
        mode: args.mode,
        owner: args.owner,
        sha256,
        defaultMode,
      })),
    noFailFast,
  );
  // Clean up hosts whose staging file may exist but was never finalized:
  // the upload failed, or prepare was killed (timeout/signal) possibly after
  // creating it — the 128-bit token path can only be ours. A prepare that
  // exited non-zero did not create it (`set -C` refuses an existing path),
  // so removing that path could delete a file we do not own.
  const uploadedNames = new Set(uploaded.map((h) => h.name));
  const killed = prepares.filter((r) => r.signal !== null).map((r) =>
    hostByName.get(r.host)!
  );
  // A finalize whose script never ran — ssh could not connect (exit 255),
  // the spawn failed, or it was killed before the shell's EXIT trap could
  // fire — leaves the uploaded staging file behind; remove it too. Any other
  // exit came from the script itself, whose trap already removed it.
  const unfinalized = finalized.filter((r) =>
    r.signal !== null || r.exitCode === 255 ||
    (r.exitCode === null && r.error !== undefined)
  ).map((r) => hostByName.get(r.host)!);
  const toClean = [
    ...[...ready, ...killed].filter((h) => !uploadedNames.has(h.name)),
    ...unfinalized,
  ];
  if (toClean.length > 0) {
    await runHosts(
      await remotePlans(
        toClean,
        (h) => atomicCleanupCommand(staging.get(h.name)!),
      ),
      noFailFast,
    );
  }

  const uploadBy = new Map(uploads.map((r) => [r.host, r]));
  const finalBy = new Map(finalized.map((r) => [r.host, r]));
  return prepares.map((prep): HostRunResult => {
    const up = uploadBy.get(prep.host);
    const fin = finalBy.get(prep.host);
    if (up === undefined) {
      if (prep.error?.startsWith("skipped:")) return prep;
      return { ...prep, error: stageError("prepare", prep) };
    }
    if (fin === undefined) {
      return {
        ...up,
        startedAt: prep.startedAt,
        error: stageError("upload", up),
      };
    }
    const joined = (k: "stdout" | "stderr") =>
      [prep, up, fin].every((r) => r[k] === undefined)
        ? undefined
        : [prep, up, fin].map((r) => r[k] ?? "").join("");
    return {
      ...fin,
      startedAt: prep.startedAt,
      durationMs: Date.parse(fin.finishedAt) - Date.parse(prep.startedAt),
      stdout: joined("stdout"),
      stderr: joined("stderr"),
      ...(stageFailed(fin) ? { error: stageError("finalize", fin) } : {}),
    };
  });
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
  const prepared = await prepareCall(ctx, g, selected, args);
  const bins = binaries(g);

  try {
    const plans: HostPlan[] = [];
    const tailscaleHandles: DataHandle[] = [];
    for (const host of prepared.hosts) {
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
        connectTimeoutSec: host.transport.connectTimeoutSec,
        serverAliveIntervalSec: host.transport.serverAliveIntervalSec,
        hostKeyOpts: hostKeyOpts(
          host.transport,
          prepared.hostKeys.get(host.name)?.argv,
        ),
        extraOptions: host.transport.extraOptions,
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
    // Audit every master even if a pin write throws.
    try {
      handles.push(...await settleHostKeys(ctx, g, prepared, results));
    } finally {
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
    }
    return { dataHandles: handles };
  } finally {
    await prepared.cleanup();
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
      const actx = await argvContextFor(g, host, args.env, NO_PREPARATION);
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
  if (!KNOWN_KEY_ALGORITHMS.has(algorithm)) {
    throw new Error(
      `collect-host-public-key failed on ${hostName}: unrecognized key ` +
        `algorithm "${algorithm}". Expected one of: ${
          [...KNOWN_KEY_ALGORITHMS].join(", ")
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
  const prepared = await prepareCall(ctx, g, selected, args);

  try {
    const recordedArgs: Record<string, unknown> = {
      hostKeyPath: args.hostKeyPath,
    };

    const plans: HostPlan[] = [];
    for (const host of prepared.hosts) {
      const actx = await argvContextFor(g, host, args.env, prepared);
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

    const handles = await settleAndRecord(ctx, g, prepared, results);

    throwOnHostFailures(results, "collect-host-public-key");

    const now = new Date().toISOString();
    for (const r of results) {
      if (r.exitCode !== 0 || r.error) continue;
      const stdout = r.stdout ?? "";
      const host = prepared.hosts.find((h) => h.name === r.host)!;
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
    await prepared.cleanup();
  }
}

// ---------------------------------------------------------------------------
// repin
// ---------------------------------------------------------------------------

/**
 * Replace the tofu pin of each selected host with the key it presents now.
 * The only way a pin changes — a mismatch on a normal call fails closed.
 *
 * Connects with accept-new against an empty per-call file and runs `true`,
 * bypassing ControlMaster so an existing master cannot answer for the key
 * being re-pinned. Writes a new hostKeyPin version that records the previous
 * fingerprints.
 */
export async function runRepin(
  args: Targeting,
  ctx: FleetContext,
): Promise<{ dataHandles: DataHandle[] }> {
  const g = parseGlobals(ctx);
  const selected = resolveSelection(ctx, g, args.hosts);
  const notTofu = selected.filter((h) =>
    h.transport.kind !== "ssh" || effectiveHostKeyPolicy(h.transport) !== "tofu"
  );
  if (notTofu.length > 0) {
    throw new Error(
      `repin only applies to hosts with hostKeyPolicy 'tofu'; not tofu: ${
        notTofu.map((h) => h.name).join(", ")
      }`,
    );
  }
  const prepared = await prepareCall(ctx, g, selected, args, { repin: true });

  try {
    const plans: HostPlan[] = [];
    for (const host of prepared.hosts) {
      const actx = await argvContextFor(g, host, args.env, prepared);
      plans.push({
        host,
        argv: buildExecArgv(host, "true", {
          ...actx,
          controlPath: undefined,
          noMultiplex: true,
        }),
        env: envFor(host, args.env),
      });
    }

    const results = await runHosts(plans, {
      ...runOptions(g, args, "repin", {}),
      capture: true,
    });
    let handles: DataHandle[];
    try {
      handles = await settleAndRecord(ctx, g, prepared, results, {
        repin: true,
      });
    } finally {
      // Retire any master that authenticated the previous key — even when a
      // pin write threw: the tofu ControlPath does not change on repin, so
      // later calls would otherwise keep multiplexing over it until
      // ControlPersist expires.
      await retireMasters(
        g,
        results
          .filter((r) => r.error === undefined && r.exitCode === 0)
          .map((r) => prepared.hosts.find((h) => h.name === r.host)!),
      );
    }

    throwOnHostFailures(results, "repin");
    return { dataHandles: handles };
  } finally {
    await prepared.cleanup();
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
