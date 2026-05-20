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
 * Argv assembly + process orchestration for fleet operations.
 *
 * Transport / auth matrix (kept here so future readers don't have to
 * reverse-engineer it):
 *
 *   kind=ssh,  auth=key      → ssh/scp/rsync with -i / agent, multiplexed
 *                              over ControlMaster.
 *   kind=ssh,  auth=password → same, wrapped in `sshpass -e`; the password
 *                              is fed via the SSHPASS env var (never argv,
 *                              never SendEnv — it must not reach the remote).
 *   kind=tailscale           → `tailscale ssh user@host`; ControlMaster is
 *                              bypassed entirely. Copies use scp with
 *                              `ProxyCommand=tailscale nc %h %p`.
 *
 * Every spawn goes through `Deno.Command(bin, { args })` — never `sh -c`
 * locally. Option values are guarded against newlines/NUL at schema time
 * (see schemas.ts) so a host record can't smuggle extra `-o` flags.
 *
 * @module
 */

import type { EffectiveHost, EffectiveTransport } from "./hosts.ts";

const SSHPASS_ENV_VAR = "SSHPASS";

/** Narrow an EffectiveTransport to its ssh variant. */
type SshEffective = Extract<EffectiveTransport, { kind: "ssh" }>;

/** Binaries the runner shells out to. Comes from globalArgs. */
export interface RunnerBinaries {
  ssh: string;
  scp: string;
  rsync: string;
  tailscale: string;
  sshpass: string;
}

/** Everything argv assembly needs that isn't on the host itself. */
export interface ArgvContext {
  binaries: RunnerBinaries;
  /** ControlPath for this host (ssh only). Absent → no multiplexing. */
  controlPath?: string;
  /** Extra env keys (method + host merged) to forward via SendEnv. */
  sendEnvKeys: string[];
}

// ---------------------------------------------------------------------------
// SSH option assembly
// ---------------------------------------------------------------------------

/**
 * Build the `-o Key=Value` (and `-i`, `-J`, `-p`) option list shared by
 * ssh/scp for an ssh-transport host. `portFlag` differs: ssh uses `-p`,
 * scp uses `-P`.
 */
function sshCommonOpts(
  t: SshEffective,
  ctx: ArgvContext,
  portFlag: "-p" | "-P",
): string[] {
  const o: string[] = [];

  if (ctx.controlPath && t.controlMaster.enabled) {
    o.push("-o", "ControlMaster=auto");
    o.push("-o", `ControlPath=${ctx.controlPath}`);
    o.push("-o", `ControlPersist=${t.controlMaster.persistSec}`);
  }

  o.push("-o", `ConnectTimeout=${t.connectTimeoutSec}`);
  if (t.serverAliveIntervalSec !== undefined) {
    o.push("-o", `ServerAliveInterval=${t.serverAliveIntervalSec}`);
  }
  if (t.strictHostKeyChecking !== undefined) {
    o.push("-o", `StrictHostKeyChecking=${t.strictHostKeyChecking}`);
  }
  if (t.knownHostsFile !== undefined) {
    o.push("-o", `UserKnownHostsFile=${t.knownHostsFile}`);
  }
  if (t.identityAgent !== undefined) {
    o.push("-o", `IdentityAgent=${t.identityAgent}`);
  }
  if (t.identitiesOnly !== undefined) {
    o.push("-o", `IdentitiesOnly=${t.identitiesOnly ? "yes" : "no"}`);
  }
  if (t.proxyCommand !== undefined) {
    o.push("-o", `ProxyCommand=${t.proxyCommand}`);
  }
  for (const key of ctx.sendEnvKeys) {
    o.push("-o", `SendEnv=${key}`);
  }
  for (const extra of t.extraOptions) {
    o.push("-o", extra);
  }
  if (t.proxyJump !== undefined) o.push("-J", t.proxyJump);
  if (t.identityFile !== undefined) o.push("-i", t.identityFile);
  o.push(portFlag, String(t.port));

  return o;
}

/** `user@address` or bare `address` when no user is set. */
function destination(host: EffectiveHost): string {
  const user = host.transport.user;
  return user ? `${user}@${host.address}` : host.address;
}

/**
 * Wrap an argv in `sshpass -e` when the host uses password auth. The
 * password itself is delivered out-of-band via the SSHPASS env var (see
 * spawnEnv), so it never appears in the returned argv.
 */
function maybeWrapSshpass(
  host: EffectiveHost,
  argv: string[],
  ctx: ArgvContext,
): string[] {
  if (
    host.transport.kind === "ssh" &&
    host.transport.auth.kind === "password"
  ) {
    return [ctx.binaries.sshpass, "-e", ...argv];
  }
  return argv;
}

// ---------------------------------------------------------------------------
// Remote command shaping
// ---------------------------------------------------------------------------

/** Prefix a command with `sudo -n --` when sudo is requested. */
export function applySudo(command: string, sudo: boolean | undefined): string {
  return sudo ? `sudo -n -- ${command}` : command;
}

/**
 * The interpreter invocation for `script`, optionally sudo-wrapped. The
 * script body is streamed over stdin; we never embed it in argv.
 */
export function scriptRemoteCommand(
  interpreter: "sh" | "bash" | "python3",
  sudo: boolean | undefined,
): string {
  // `-s` makes sh/bash read the program from stdin; python3 reads stdin
  // when given `-`. The trailing `--` (sh/bash) ends option parsing.
  const base = interpreter === "python3" ? "python3 -" : `${interpreter} -s --`;
  return applySudo(base, sudo);
}

// ---------------------------------------------------------------------------
// exec / script argv
// ---------------------------------------------------------------------------

/**
 * Build argv for running `remoteCommand` on `host`. Used by exec and
 * script (script passes its interpreter invocation as remoteCommand and
 * streams the body via stdin).
 */
export function buildExecArgv(
  host: EffectiveHost,
  remoteCommand: string,
  ctx: ArgvContext,
): string[] {
  if (host.transport.kind === "tailscale") {
    const bin = host.transport.tailscaleBinary ?? ctx.binaries.tailscale;
    return [
      bin,
      "ssh",
      ...host.transport.sshExtraArgs,
      "--",
      destination(host),
      remoteCommand,
    ];
  }

  const t = host.transport;
  const argv = [
    ctx.binaries.ssh,
    ...sshCommonOpts(t, ctx, "-p"),
    "--",
    destination(host),
    remoteCommand,
  ];
  return maybeWrapSshpass(host, argv, ctx);
}

// ---------------------------------------------------------------------------
// copy argv (scp / rsync)
// ---------------------------------------------------------------------------

export interface CopySpec {
  src: string;
  dst: string;
  direction: "to" | "from";
  recursive?: boolean;
  useRsync?: boolean;
}

/** Build the remote-qualified and local endpoints for a copy. */
function copyEndpoints(
  host: EffectiveHost,
  spec: CopySpec,
): { from: string; to: string } {
  const dest = destination(host);
  if (spec.direction === "to") {
    return { from: spec.src, to: `${dest}:${spec.dst}` };
  }
  return { from: `${dest}:${spec.src}`, to: spec.dst };
}

/** scp argv for an ssh-transport host. */
function buildScpArgv(
  host: EffectiveHost & { transport: SshEffective },
  spec: CopySpec,
  ctx: ArgvContext,
): string[] {
  const { from, to } = copyEndpoints(host, spec);
  const argv = [ctx.binaries.scp, ...sshCommonOpts(host.transport, ctx, "-P")];
  if (spec.recursive) argv.push("-r");
  argv.push("--", from, to);
  return maybeWrapSshpass(host, argv, ctx);
}

/** rsync argv (over ssh) for an ssh-transport host. */
function buildRsyncArgv(
  host: EffectiveHost & { transport: SshEffective },
  spec: CopySpec,
  ctx: ArgvContext,
): string[] {
  const { from, to } = copyEndpoints(host, spec);
  // rsync drives ssh via -e. We embed the ControlPath + port there so the
  // master is reused; identity/options likewise.
  const sshParts: string[] = [ctx.binaries.ssh];
  const t = host.transport;
  if (ctx.controlPath && t.controlMaster.enabled) {
    sshParts.push("-o", `ControlPath=${ctx.controlPath}`);
  }
  if (t.identityFile) sshParts.push("-i", t.identityFile);
  if (t.proxyJump) sshParts.push("-J", t.proxyJump);
  sshParts.push("-p", String(t.port));

  const argv = [ctx.binaries.rsync];
  argv.push(spec.recursive ? "-az" : "-a");
  argv.push("-e", sshParts.join(" "));
  argv.push("--", from, to);
  return maybeWrapSshpass(host, argv, ctx);
}

/** scp via tailscale netcat ProxyCommand. */
function buildTailscaleScpArgv(
  host: EffectiveHost,
  spec: CopySpec,
  ctx: ArgvContext,
): string[] {
  if (host.transport.kind !== "tailscale") {
    throw new Error("buildTailscaleScpArgv called for non-tailscale host");
  }
  const bin = host.transport.tailscaleBinary ?? ctx.binaries.tailscale;
  const { from, to } = copyEndpoints(host, spec);
  const argv = [
    ctx.binaries.scp,
    "-o",
    `ProxyCommand=${bin} nc %h %p`,
  ];
  if (spec.recursive) argv.push("-r");
  argv.push("--", from, to);
  return argv;
}

/** Dispatch copy argv by transport + rsync flag. */
export function buildCopyArgv(
  host: EffectiveHost,
  spec: CopySpec,
  ctx: ArgvContext,
): string[] {
  if (host.transport.kind === "tailscale") {
    return buildTailscaleScpArgv(host, spec, ctx);
  }
  const sshHost = host as EffectiveHost & { transport: SshEffective };
  return spec.useRsync
    ? buildRsyncArgv(sshHost, spec, ctx)
    : buildScpArgv(sshHost, spec, ctx);
}

// ---------------------------------------------------------------------------
// Spawn environment
// ---------------------------------------------------------------------------

/**
 * Compute the env map for a spawned process. Merges the method-supplied
 * env (forwarded to the remote via SendEnv) with the SSHPASS variable
 * (local-only) for password-auth hosts.
 *
 * The returned object is what `Deno.Command`'s `env` should be set to.
 * Note SSHPASS is intentionally NOT added to SendEnv keys — it must stay
 * local to sshpass and never travel to the remote.
 */
export function spawnEnv(
  host: EffectiveHost,
  forwardedEnv: Record<string, string>,
): Record<string, string> {
  const env: Record<string, string> = { ...forwardedEnv };
  if (
    host.transport.kind === "ssh" &&
    host.transport.auth.kind === "password"
  ) {
    env[SSHPASS_ENV_VAR] = host.transport.auth.password;
  }
  return env;
}

/**
 * The SendEnv key set for a host given a method-supplied env override.
 * Combines the host's own `env` map keys with the per-call override keys.
 * SSHPASS is never included.
 */
export function sendEnvKeys(
  host: EffectiveHost,
  methodEnv: Record<string, string> | undefined,
): string[] {
  const keys = new Set<string>(Object.keys(host.env));
  for (const k of Object.keys(methodEnv ?? {})) keys.add(k);
  return [...keys].sort();
}

/**
 * Build the forwarded env (host.env merged with method env). The method
 * env wins on key collision.
 */
export function forwardedEnv(
  host: EffectiveHost,
  methodEnv: Record<string, string> | undefined,
): Record<string, string> {
  return { ...host.env, ...(methodEnv ?? {}) };
}

// ---------------------------------------------------------------------------
// Process execution
// ---------------------------------------------------------------------------

/** A single process invocation request. */
export interface ExecRequest {
  command: string;
  args: string[];
  env: Record<string, string>;
  /** When set, piped to the child's stdin. */
  stdin?: string;
  /** When false, stdout/stderr inherit the runner's streams. */
  capture: boolean;
  /** Cancellation/timeout signal. */
  signal: AbortSignal;
}

/** Raw process outcome. stdout/stderr are empty strings when not captured. */
export interface ExecOutcome {
  code: number | null;
  signal: string | null;
  stdout: string;
  stderr: string;
}

/** Injectable process executor. The default shells out via Deno.Command. */
export type CommandExecutor = (req: ExecRequest) => Promise<ExecOutcome>;

/**
 * Production executor. Always uses `.spawn()` (so stdin can be piped) and
 * honors the abort signal by killing the child. Capture controls whether
 * stdout/stderr are collected into the result or inherited by the runner.
 */
export const denoExecutor: CommandExecutor = async (req) => {
  const command = new Deno.Command(req.command, {
    args: req.args,
    env: req.env,
    clearEnv: false,
    stdin: req.stdin !== undefined ? "piped" : "null",
    stdout: req.capture ? "piped" : "inherit",
    stderr: req.capture ? "piped" : "inherit",
  });

  const child = command.spawn();

  // Kill the child if the signal fires (timeout or fail-fast cancel).
  const onAbort = () => {
    try {
      child.kill("SIGTERM");
    } catch {
      // Already exited — ignore.
    }
  };
  if (req.signal.aborted) onAbort();
  req.signal.addEventListener("abort", onAbort, { once: true });

  try {
    if (req.stdin !== undefined) {
      const writer = child.stdin.getWriter();
      await writer.write(new TextEncoder().encode(req.stdin));
      await writer.close();
    }

    const status = await child.output();
    const decoder = new TextDecoder();
    return {
      code: status.code,
      signal: status.signal ?? null,
      stdout: req.capture ? decoder.decode(status.stdout) : "",
      stderr: req.capture ? decoder.decode(status.stderr) : "",
    };
  } finally {
    req.signal.removeEventListener("abort", onAbort);
  }
};

// Module-level executor seam. Tests swap this to intercept every spawn the
// runner performs — including stdin and env, which the standard
// withMockedCommand mock cannot observe. Mirrors how the binary paths are
// themselves injectable via globalArgs.
let activeExecutor: CommandExecutor = denoExecutor;

/** Replace the active command executor (test seam). */
export function setCommandExecutor(executor: CommandExecutor): void {
  activeExecutor = executor;
}

/** Restore the production Deno.Command executor. */
export function resetCommandExecutor(): void {
  activeExecutor = denoExecutor;
}

/** A unit of work: one host, its argv, env, and optional stdin. */
export interface HostPlan {
  host: EffectiveHost;
  argv: string[];
  env: Record<string, string>;
  stdin?: string;
}

/** Options governing a batch run. */
export interface RunOptions {
  method: string;
  parallel: number;
  timeoutSec: number;
  failFast: boolean;
  capture: boolean;
  /** The args object recorded into each RunResult (post-redaction). */
  recordedArgs: Record<string, unknown>;
}

/** Per-host result mirroring RunResultSchema (minus serialization). */
export interface HostRunResult {
  method: string;
  host: string;
  transport: "ssh" | "tailscale";
  startedAt: string;
  finishedAt: string;
  durationMs: number;
  exitCode: number | null;
  signal: string | null;
  stdout?: string;
  stderr?: string;
  args: Record<string, unknown>;
  argv: string[];
  error?: string;
}

/**
 * Run a batch of host plans with bounded concurrency.
 *
 * - `parallel` caps the number of in-flight processes.
 * - `failFast` aborts not-yet-started hosts on the first non-zero exit or
 *   error; in-flight processes are allowed to finish (killing mid-flight
 *   ssh tends to orphan remote work).
 * - Each host gets its own timeout via `AbortSignal.timeout`. A timed-out
 *   process is killed and surfaces `signal: "SIGTERM"`.
 *
 * Results are returned in input order regardless of completion order.
 */
export async function runHosts(
  plans: HostPlan[],
  opts: RunOptions,
): Promise<HostRunResult[]> {
  const results = new Array<HostRunResult>(plans.length);
  const failFastController = new AbortController();
  let nextIndex = 0;

  async function worker(): Promise<void> {
    while (true) {
      if (opts.failFast && failFastController.signal.aborted) return;
      const i = nextIndex++;
      if (i >= plans.length) return;

      const plan = plans[i];
      const result = await runSingle(plan, opts, failFastController.signal);
      results[i] = result;

      const failed = result.error !== undefined ||
        (result.exitCode !== null && result.exitCode !== 0) ||
        result.signal !== null;
      if (opts.failFast && failed) {
        failFastController.abort();
      }
    }
  }

  const workerCount = Math.max(1, Math.min(opts.parallel, plans.length));
  const workers: Promise<void>[] = [];
  for (let i = 0; i < workerCount; i++) workers.push(worker());
  await Promise.all(workers);

  // Hosts skipped by fail-fast never ran — record them as cancelled.
  for (let i = 0; i < plans.length; i++) {
    if (results[i] === undefined) {
      const plan = plans[i];
      const now = new Date().toISOString();
      results[i] = {
        method: opts.method,
        host: plan.host.name,
        transport: plan.host.transport.kind,
        startedAt: now,
        finishedAt: now,
        durationMs: 0,
        exitCode: null,
        signal: null,
        args: opts.recordedArgs,
        argv: plan.argv,
        error: "skipped: fail-fast triggered by an earlier host",
      };
    }
  }

  return results;
}

async function runSingle(
  plan: HostPlan,
  opts: RunOptions,
  failFastSignal: AbortSignal,
): Promise<HostRunResult> {
  const startedAt = new Date();
  const timeout = AbortSignal.timeout(opts.timeoutSec * 1000);
  const combined = anySignal([timeout, failFastSignal]);

  const base = {
    method: opts.method,
    host: plan.host.name,
    transport: plan.host.transport.kind,
    startedAt: startedAt.toISOString(),
    args: opts.recordedArgs,
    argv: plan.argv,
  };

  try {
    const outcome = await activeExecutor({
      command: plan.argv[0],
      args: plan.argv.slice(1),
      env: plan.env,
      stdin: plan.stdin,
      capture: opts.capture,
      signal: combined,
    });
    const finishedAt = new Date();
    // A process killed by a signal (our timeout/fail-fast SIGTERM, or any
    // other signal) reports a non-null `signal`. Normalize the exit code to
    // null in that case so the RunResult reads "killed by <signal>" rather
    // than the synthesized 128+n shell convention.
    const killedSignal = timeout.aborted ? "SIGTERM" : outcome.signal;
    return {
      ...base,
      finishedAt: finishedAt.toISOString(),
      durationMs: finishedAt.getTime() - startedAt.getTime(),
      exitCode: killedSignal !== null ? null : outcome.code,
      signal: killedSignal,
      stdout: opts.capture ? outcome.stdout : undefined,
      stderr: opts.capture ? outcome.stderr : undefined,
    };
  } catch (err) {
    const finishedAt = new Date();
    // A timeout surfaces as an abort; report it as a SIGTERM kill so the
    // RunResult reads naturally ("killed by timeout").
    const timedOut = timeout.aborted;
    return {
      ...base,
      finishedAt: finishedAt.toISOString(),
      durationMs: finishedAt.getTime() - startedAt.getTime(),
      exitCode: null,
      signal: timedOut ? "SIGTERM" : null,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

/**
 * Compose multiple AbortSignals into one that fires when any source does.
 * `AbortSignal.any` exists in modern runtimes; we implement it directly to
 * avoid depending on its presence.
 */
function anySignal(signals: AbortSignal[]): AbortSignal {
  const controller = new AbortController();
  for (const sig of signals) {
    if (sig.aborted) {
      controller.abort();
      break;
    }
    sig.addEventListener("abort", () => controller.abort(), { once: true });
  }
  return controller.signal;
}
