/**
 * Isolation: the port every sandboxed step goes through, and its two adapters.
 *
 *   NonoIsolation      runs each step under nono: a filesystem confined to the
 *                      box, a memory and process cap, and nono's proxy for all
 *                      network, so every attempt is recorded with its host.
 *   ExternalIsolation  runs each step directly. For callers who already run the
 *                      whole probe inside a sandbox they control (a VM, say).
 *                      Network and sandbox violations are then not observed.
 *
 * The inner swamp gets the sandbox account's key, never the operator's: its
 * HOME is the box's, and the key is passed in the environment, not argv, so it
 * shows in no process listing and no nono audit record.
 *
 * @module
 */

import { dirname } from "jsr:@std/path@1.1.4";
import type { BoxLayout } from "./box.ts";
import {
  findAuditSession,
  type NetworkEvent,
  parseJsonStream,
  parseNonoAudit,
} from "./observe.ts";

/** What a step may reach on the network. */
export type NetworkPolicy =
  | { readonly kind: "registry"; readonly hosts: readonly string[] }
  | { readonly kind: "none" };

/** One swamp invocation inside the box. */
export interface Step {
  /** Unique within a box; names the step's marker directory. */
  readonly id: string;
  readonly args: readonly string[];
  readonly network: NetworkPolicy;
  readonly timeoutMs: number;
  /** Put the stub shims first on PATH (method runs only). */
  readonly shims: boolean;
}

/** What a step did. */
export interface StepResult {
  readonly exitCode: number | null;
  readonly timedOut: boolean;
  readonly stdout: string;
  readonly stderr: string;
  readonly durationMs: number;
  /** Network attempts, when the isolation can observe them. */
  readonly network: readonly NetworkEvent[];
  /** Denials and violations the sandbox reported. */
  readonly violations: readonly string[];
  /** False when this isolation cannot observe network or violations. */
  readonly observed: boolean;
  /**
   * False when this step's network attempts could not be read, so its empty
   * `network` means unknown, not none. `networkGap` says why.
   */
  readonly networkObserved: boolean;
  readonly networkGap?: string;
}

/** The port. */
export interface Isolation {
  readonly mode: "nono" | "external";
  run(step: Step): Promise<StepResult>;
}

/** Runs a program to completion. Injected so tests never spawn nono. */
export type Exec = (req: {
  cmd: string;
  args: readonly string[];
  cwd: string;
  env: Record<string, string>;
  timeoutMs: number;
}) => Promise<
  { code: number | null; stdout: string; stderr: string; timedOut: boolean }
>;

const MAX_OUTPUT = 4 * 1024 * 1024;

/** Grace periods after a timeout: kill escalation, then giving up on pipes. */
export interface ExecGrace {
  readonly killMs: number;
  readonly pipesMs: number;
  /** After the child exits, how long its pipes may stay open. */
  readonly drainMs: number;
}

/** The real Exec: a cleared environment, a hard timeout, capped output. */
export const denoExec: Exec = (req) =>
  makeDenoExec({ killMs: 5_000, pipesMs: 10_000, drainMs: 2_000 })(req);

/** Builds the real Exec with the given grace periods. */
export const makeDenoExec = (grace: ExecGrace): Exec => async (req) => {
  // The probe's whole job is to run nono and swamp as child processes with a
  // cleared environment; no swamp primitive does that. Every argument comes
  // from nonoArgs or a fixed swamp argv. See the README's Isolation section.
  // swamp-quality-ignore deno-command
  const child = new Deno.Command(req.cmd, {
    args: [...req.args],
    cwd: req.cwd,
    env: req.env,
    clearEnv: true,
    stdin: "null",
    stdout: "piped",
    stderr: "piped",
  }).spawn();
  let timedOut = false;
  const readers = [child.stdout.getReader(), child.stderr.getReader()];
  const timers: ReturnType<typeof setTimeout>[] = [];
  const kill = (sig: Deno.Signal) => {
    try {
      child.kill(sig);
    } catch { /* already gone */ }
  };
  timers.push(setTimeout(() => {
    timedOut = true;
    kill("SIGTERM");
    timers.push(setTimeout(() => kill("SIGKILL"), grace.killMs));
    // A grandchild the code under test left behind can hold the pipes open
    // after the child is gone. Stop waiting for them.
    timers.push(setTimeout(() => {
      for (const r of readers) r.cancel().catch(() => {});
    }, grace.pipesMs));
  }, req.timeoutMs));
  const read = async (r: ReadableStreamDefaultReader<Uint8Array>) => {
    const chunks: Uint8Array[] = [];
    let n = 0;
    try {
      while (true) {
        const { done, value } = await r.read();
        if (done) break;
        if (n < MAX_OUTPUT) chunks.push(value.slice(0, MAX_OUTPUT - n));
        n += value.length;
      }
    } catch {
      // Cancelled after a timeout.
    }
    const out = new Uint8Array(chunks.reduce((a, c) => a + c.length, 0));
    let at = 0;
    for (const c of chunks) {
      out.set(c, at);
      at += c.length;
    }
    return new TextDecoder().decode(out);
  };
  // Once the child exits, give its pipes a moment to drain, then stop: a
  // grandchild that inherited them must not turn a finished step into a
  // timed-out one.
  child.status.then(() => {
    timers.push(setTimeout(() => {
      for (const r of readers) r.cancel().catch(() => {});
    }, grace.drainMs));
  });
  const [stdout, stderr, status] = await Promise.all([
    read(readers[0]),
    read(readers[1]),
    child.status,
  ]);
  for (const t of timers) clearTimeout(t);
  return { code: status.code, stdout, stderr, timedOut };
};

/** Settings both adapters share. */
export interface IsolationConfig {
  readonly box: BoxLayout;
  /** The swamp binary to run inside the box. */
  readonly swampPath: string;
  readonly apiKey: string;
  readonly signinToken?: string;
  /** Canary env vars for the inner swamp. */
  readonly canaryEnv: Readonly<Record<string, string>>;
  readonly exec?: Exec;
}

/** The environment the inner swamp sees, apart from HOME and PATH. */
function innerEnv(cfg: IsolationConfig): Record<string, string> {
  return {
    TMPDIR: cfg.box.tmp,
    SWAMP_API_KEY: cfg.apiKey,
    ...(cfg.signinToken ? { SWAMP_SIGNIN_TOKEN: cfg.signinToken } : {}),
    SWAMP_NO_TELEMETRY: "1",
    SWAMP_NO_INBOX_NOTICE: "1",
    LANG: "C.UTF-8",
    ...cfg.canaryEnv,
  };
}

const SYSTEM_PATH = "/usr/local/bin:/usr/bin:/bin";

function innerPath(cfg: IsolationConfig, shims: boolean): string {
  return shims ? `${cfg.box.bin}:${SYSTEM_PATH}` : SYSTEM_PATH;
}

/**
 * Runs inside nono: swaps in the box HOME and PATH (nono itself needs the real
 * HOME for its own state, and prepends its own PATH entry), then execs swamp.
 * nono's proxy variables pass through untouched.
 */
export const NONO_LAUNCHER =
  'exec /usr/bin/env -u PROBE_HOME -u PROBE_PATH HOME="$PROBE_HOME" PATH="$PROBE_PATH" "$@"';

/** Settings only the nono adapter needs. */
export interface NonoConfig extends IsolationConfig {
  readonly nonoPath: string;
  /** The operator's HOME, where nono keeps its state. */
  readonly realHome: string;
  readonly memory: string;
  readonly maxProcesses: number;
}

/** Host the method-run proxy allows: it does not resolve, so all is denied. */
export const DENY_ALL_HOST = "probe.invalid";

/** The `nono run` argv for one step. Pure. */
export function nonoArgs(cfg: NonoConfig, step: Step): string[] {
  const b = cfg.box;
  const net = step.network.kind === "registry"
    ? step.network.hosts.flatMap((h) => ["--allow-domain", h])
    : ["--allow-domain", DENY_ALL_HOST];
  return [
    "run",
    "-s",
    "--no-rollback",
    "--diagnostics-json",
    "--read-file",
    cfg.swampPath,
    "--read",
    b.bin,
    "--allow",
    b.home,
    "--allow",
    b.tmp,
    "--allow",
    b.repo,
    "--allow",
    b.stubCalls,
    "--allow",
    `${b.steps}/${step.id}`,
    "--memory",
    cfg.memory,
    "--max-processes",
    String(cfg.maxProcesses),
    ...net,
    "--",
    "/bin/sh",
    "-c",
    NONO_LAUNCHER,
    "probe-launcher",
    cfg.swampPath,
    ...step.args,
  ];
}

/** nono's own environment for one step. Pure. */
export function nonoEnv(cfg: NonoConfig, step: Step): Record<string, string> {
  return {
    HOME: cfg.realHome,
    PATH: `${dirname(cfg.nonoPath)}:${SYSTEM_PATH}`,
    PROBE_HOME: cfg.box.home,
    PROBE_PATH: innerPath(cfg, step.shims),
    ...innerEnv(cfg),
  };
}

/** Reads denials and violations from nono's `--diagnostics-json` document. */
export function parseNonoDiagnostics(stderr: string): string[] {
  const doc = parseJsonStream(stderr).findLast((d) =>
    typeof d === "object" && d !== null && "session" in d
  ) as { session?: Record<string, unknown> } | undefined;
  const s = doc?.session;
  if (!s) return [];
  const out: string[] = [];
  for (const key of ["denials", "ipc_denials", "violations"]) {
    const list = s[key];
    if (!Array.isArray(list)) continue;
    for (const v of list) {
      out.push(`${key}: ${typeof v === "string" ? v : JSON.stringify(v)}`);
    }
  }
  return out;
}

/** The nono adapter. */
export class NonoIsolation implements Isolation {
  readonly mode = "nono" as const;
  readonly #cfg: NonoConfig;
  readonly #exec: Exec;

  constructor(cfg: NonoConfig) {
    this.#cfg = cfg;
    this.#exec = cfg.exec ?? denoExec;
  }

  async run(step: Step): Promise<StepResult> {
    const marker = `${this.#cfg.box.steps}/${step.id}`;
    await Deno.mkdir(marker, { recursive: true });
    const started = Date.now();
    const r = await this.#exec({
      cmd: this.#cfg.nonoPath,
      args: nonoArgs(this.#cfg, step),
      cwd: this.#cfg.box.repo,
      env: nonoEnv(this.#cfg, step),
      timeoutMs: step.timeoutMs,
    });
    const durationMs = Date.now() - started;
    const net = await this.#networkFor(marker);
    return {
      exitCode: r.code,
      timedOut: r.timedOut,
      stdout: r.stdout,
      stderr: r.stderr,
      durationMs,
      network: net.events,
      violations: parseNonoDiagnostics(r.stderr),
      observed: true,
      networkObserved: net.gap === undefined,
      ...(net.gap ? { networkGap: net.gap } : {}),
    };
  }

  /**
   * The step's network attempts from nono's audit trail. Fails closed: any
   * lookup that does not end in a parsed event list is a gap, never "none".
   */
  async #networkFor(
    marker: string,
  ): Promise<{ events: NetworkEvent[]; gap?: string }> {
    const env = {
      HOME: this.#cfg.realHome,
      PATH: `${dirname(this.#cfg.nonoPath)}:${SYSTEM_PATH}`,
    };
    const list = await this.#exec({
      cmd: this.#cfg.nonoPath,
      args: ["audit", "list", "--json", "--path", marker],
      cwd: this.#cfg.box.root,
      env,
      timeoutMs: 30_000,
    });
    if (list.timedOut || list.code !== 0) {
      return {
        events: [],
        gap: `nono audit list ${
          list.timedOut ? "timed out" : `exited ${list.code}`
        }`,
      };
    }
    const id = findAuditSession(list.stdout, marker);
    if (!id) {
      return { events: [], gap: "no nono audit session tracked this step" };
    }
    const show = await this.#exec({
      cmd: this.#cfg.nonoPath,
      args: ["audit", "show", id, "--json"],
      cwd: this.#cfg.box.root,
      env,
      timeoutMs: 30_000,
    });
    if (show.timedOut || show.code !== 0) {
      return {
        events: [],
        gap: `nono audit show ${
          show.timedOut ? "timed out" : `exited ${show.code}`
        }`,
      };
    }
    const events = parseNonoAudit(show.stdout);
    return events
      ? { events }
      : { events: [], gap: "nono audit show had no network_events list" };
  }
}

/** The acknowledgement external isolation requires, word for word. */
export const EXTERNAL_ACKNOWLEDGEMENT =
  "This process runs inside a sandbox I control, and the target extension's code will run with all of its permissions.";

/** Throws unless `acknowledgement` is exactly {@link EXTERNAL_ACKNOWLEDGEMENT}. */
export function checkAcknowledgement(acknowledgement: string | undefined) {
  if (acknowledgement !== EXTERNAL_ACKNOWLEDGEMENT) {
    throw new Error(
      `isolation "external" runs the target extension's code with no sandbox from this probe. ` +
        `Only use it inside a sandbox you control, such as a disposable VM whose only swamp credential is the sandbox account's. ` +
        `To confirm, set acknowledgeUnsandboxed to exactly: "${EXTERNAL_ACKNOWLEDGEMENT}"`,
    );
  }
}

/** The external adapter: no sandbox of its own. */
export class ExternalIsolation implements Isolation {
  readonly mode = "external" as const;
  readonly #cfg: IsolationConfig;
  readonly #exec: Exec;

  constructor(cfg: IsolationConfig, acknowledgement: string | undefined) {
    checkAcknowledgement(acknowledgement);
    this.#cfg = cfg;
    this.#exec = cfg.exec ?? denoExec;
  }

  async run(step: Step): Promise<StepResult> {
    const started = Date.now();
    const r = await this.#exec({
      cmd: this.#cfg.swampPath,
      args: step.args,
      cwd: this.#cfg.box.repo,
      env: {
        HOME: this.#cfg.box.home,
        PATH: innerPath(this.#cfg, step.shims),
        ...innerEnv(this.#cfg),
      },
      timeoutMs: step.timeoutMs,
    });
    return {
      exitCode: r.code,
      timedOut: r.timedOut,
      stdout: r.stdout,
      stderr: r.stderr,
      durationMs: Date.now() - started,
      network: [],
      violations: [],
      observed: false,
      networkObserved: false,
      networkGap: "external isolation does not observe network",
    };
  }
}
