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
 * Running the probe on a target: locally, over SSH (including from a Windows
 * controller), in a Docker container, or in a container started from an
 * image. Images and containers without sh (distroless and slim runtime
 * images) are checked by running their node, bun and python directly.
 *
 * @module
 */

import { analyze, parseProbe, type ProbeFacts } from "./analysis.ts";
import { buildShProbe } from "./probe_sh.ts";
import { buildWindowsProbe } from "./probe_windows.ts";
import type { Status } from "./schemas.ts";
import { cmdLine, runOverWindowsSsh, type SshSession } from "./windows_ssh.ts";

export type Logger = {
  info: (msg: string) => void;
  debug: (msg: string) => void;
};

export type Transport =
  | { kind: "local" }
  | { kind: "ssh"; args: string[] }
  | { kind: "docker"; container: string }
  /** An image with no sh: nothing runs but its own runtimes. */
  | { kind: "image"; image: string };

export type RunResult = { stdout: string; stderr: string; exitCode: number };
/** "powershell" runs the command as a script read from stdin (Windows). */
export type Shell = "sh" | "powershell";
export type Runner = (
  command: string,
  timeoutMs?: number,
  shell?: Shell,
) => Promise<RunResult>;
/** Runs one program with arguments inside a container, with no shell. */
export type Exec = (argv: string[], timeoutMs?: number) => Promise<RunResult>;

export function present(val: string | undefined): string | undefined {
  return val && val.length > 0 ? val : undefined;
}

export function isLocalHost(host: string): boolean {
  return host === "localhost" || host === "127.0.0.1" || host === "::1";
}

/** Rejects a Docker container or image reference docker could read as an option. */
export function assertSafeDockerRef(label: string, value: string): void {
  if (!/^[A-Za-z0-9][A-Za-z0-9._/:@-]*$/.test(value)) {
    throw new Error(`Refusing unsafe ${label} ${JSON.stringify(value)}`);
  }
}

export function buildTransport(g: {
  targetHost: string;
  sshUser: string;
  sshKey?: string;
  dockerContainer?: string;
}): Transport {
  const container = present(g.dockerContainer);
  if (container) {
    assertSafeDockerRef("dockerContainer", container);
    return { kind: "docker", container };
  }
  if (isLocalHost(g.targetHost)) return { kind: "local" };
  const args = [
    "-o",
    "BatchMode=yes",
    "-o",
    "StrictHostKeyChecking=accept-new",
    "-o",
    "ConnectTimeout=10",
  ];
  if (present(g.sshKey)) args.push("-i", g.sshKey!);
  args.push("--", `${g.sshUser}@${g.targetHost}`);
  return { kind: "ssh", args };
}

export function targetLabel(
  g: { targetHost: string; dockerContainer?: string },
): string {
  const container = present(g.dockerContainer);
  if (container) return `docker-${container.slice(0, 12)}`;
  return g.targetHost;
}

/** Probe and preflight limit; package-manager steps get UPGRADE_TIMEOUT_MS. */
export const DEFAULT_TIMEOUT_MS = 180_000;
export const UPGRADE_TIMEOUT_MS = 1_800_000;
/** A runtime asked for its version in a no-sh container. */
export const DIRECT_TIMEOUT_MS = 30_000;
/** Exit code a runner reports when it killed a command for running too long. */
export const TIMEOUT_EXIT = 124;
/** Exit code a runner reports when the program itself is missing. */
export const NOT_FOUND_EXIT = 127;

/** Ends a PowerShell script sent on stdin. */
export const POWERSHELL_END = "# swamp-probe-end";

/**
 * Windows command lines are too short for the probe, so a small launcher
 * reads it from stdin. The launcher stops at POWERSHELL_END rather than at
 * EOF, which Windows OpenSSH can lose, and is passed base64-encoded so
 * cmd.exe and PowerShell login shells leave it alone.
 */
const POWERSHELL_LAUNCHER = [
  "$b = New-Object Text.StringBuilder",
  `while ($true) { $l = [Console]::In.ReadLine(); if ($null -eq $l -or $l -eq '${POWERSHELL_END}') { break }; [void]$b.AppendLine($l) }`,
  "Invoke-Expression $b.ToString()",
].join("\n");

function encodePowerShell(script: string): string {
  let bin = "";
  for (let i = 0; i < script.length; i++) {
    const c = script.charCodeAt(i);
    bin += String.fromCharCode(c & 0xff, c >> 8);
  }
  return btoa(bin);
}

export const POWERSHELL_ARGV = [
  "powershell",
  "-NoProfile",
  "-NonInteractive",
  "-EncodedCommand",
  encodePowerShell(POWERSHELL_LAUNCHER),
];

/** How long to keep reading a finished command's pipes. */
const PIPE_GRACE_MS = 2_000;

/**
 * Reads a stream as it arrives. The returned function waits for the end, but
 * at most graceMs: a killed command's pipes can stay open in a process that
 * inherited them (an ssh ControlMaster, a daemon it started).
 */
function collect(
  stream: ReadableStream<Uint8Array>,
): (graceMs: number) => Promise<string> {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  const finished = (async () => {
    try {
      for (;;) {
        const { value, done } = await reader.read();
        if (done) return;
        chunks.push(value);
      }
    } catch {
      // Cancelled below.
    }
  })();
  return async (graceMs: number) => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    await Promise.race([
      finished,
      new Promise((resolve) => (timer = setTimeout(resolve, graceMs))),
    ]);
    clearTimeout(timer);
    await reader.cancel().catch(() => {});
    const bytes = new Uint8Array(chunks.reduce((n, c) => n + c.length, 0));
    let offset = 0;
    for (const c of chunks) {
      bytes.set(c, offset);
      offset += c.length;
    }
    return new TextDecoder().decode(bytes).trim();
  };
}

/** Runs argv with optional stdin, killing it after timeoutMs. */
export async function runArgv(
  cmd: string[],
  timeoutMs: number,
  stdin?: string,
): Promise<RunResult> {
  const signal = AbortSignal.timeout(timeoutMs);
  let child: Deno.ChildProcess;
  try {
    // The transport itself: sh, ssh, powershell or docker, with fixed arguments.
    // swamp-quality-ignore deno-command
    child = new Deno.Command(cmd[0], {
      args: cmd.slice(1),
      stdin: stdin !== undefined ? "piped" : "null",
      stdout: "piped",
      stderr: "piped",
      signal,
    }).spawn();
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return {
        stdout: "",
        stderr: `${cmd[0]}: command not found`,
        exitCode: NOT_FOUND_EXIT,
      };
    }
    throw err;
  }
  const stdoutText = collect(child.stdout);
  const stderrText = collect(child.stderr);
  if (stdin !== undefined) {
    const writer = child.stdin.getWriter();
    await writer.write(new TextEncoder().encode(stdin)).catch(() => {});
    await writer.close().catch(() => {});
  }
  const status = await child.status;
  const [stdout, stderr] = await Promise.all([
    stdoutText(PIPE_GRACE_MS),
    stderrText(PIPE_GRACE_MS),
  ]);
  if (signal.aborted) {
    return {
      stdout,
      stderr: `timed out after ${timeoutMs / 1000}s${
        stderr ? `: ${stderr}` : ""
      }`,
      exitCode: TIMEOUT_EXIT,
    };
  }
  return { stdout, stderr, exitCode: status.code };
}

/**
 * One ssh session on a Windows controller: ssh runs under cmd.exe with its
 * stdio in temporary files, which is the only way Windows OpenSSH exits
 * cleanly. A session that overruns has its whole process tree killed.
 */
function windowsSshSession(
  sshArgs: string[],
  logger: Logger,
  timeoutMs: number,
): SshSession {
  return async (remote, input) => {
    const dir = await Deno.makeTempDir({ prefix: "http2shell-ssh-" });
    try {
      const files = {
        input: input === undefined ? undefined : `${dir}\\in`,
        stdout: `${dir}\\out`,
        stderr: `${dir}\\err`,
      };
      if (files.input) await Deno.writeTextFile(files.input, input!);
      logger.debug(`ssh (via cmd.exe): ${remote.slice(0, 200)}`);
      // swamp-quality-ignore deno-command
      const child = new Deno.Command("cmd.exe", {
        args: ["/d", "/s", "/c", cmdLine(sshArgs, remote, files)],
        windowsRawArguments: true,
        stdin: "null",
        stdout: "null",
        stderr: "null",
      }).spawn();
      let timedOut = false;
      const timer = setTimeout(() => {
        timedOut = true;
        // swamp-quality-ignore deno-command
        new Deno.Command("taskkill", {
          args: ["/T", "/F", "/PID", String(child.pid)],
          stdout: "null",
          stderr: "null",
        }).output().catch(() => {});
      }, timeoutMs);
      const status = await child.status;
      clearTimeout(timer);
      const stderr = await Deno.readTextFile(files.stderr).catch(() => "");
      if (timedOut) {
        return {
          stdout: new Uint8Array(),
          stderr: `timed out after ${timeoutMs / 1000}s${
            stderr.trim() ? `: ${stderr.trim()}` : ""
          }`,
          exitCode: TIMEOUT_EXIT,
        };
      }
      return {
        stdout: await Deno.readFile(files.stdout).catch(() => new Uint8Array()),
        stderr: stderr.trim(),
        exitCode: status.code,
      };
    } finally {
      await Deno.remove(dir, { recursive: true }).catch(() => {});
    }
  };
}

/**
 * The ssh command line. ssh runs its remote command through the user's login
 * shell, which may not be POSIX (fish, csh), so sh gets the script on stdin
 * (see wrapScript) instead of quoted in an argument.
 */
export function sshArgv(args: string[], ps: boolean): string[] {
  return ["ssh", ...args, ps ? POWERSHELL_ARGV.join(" ") : "sh -s"];
}

/**
 * A script for sh -s. Wrapping it in a function makes sh read all of it
 * before running anything, so no command it starts can consume the rest.
 */
export function wrapScript(script: string): string {
  return `h2s_main() {\n${script}\n}\nh2s_main </dev/null\n`;
}

export function makeRunner(transport: Transport, logger: Logger): Runner {
  return async (
    command: string,
    timeoutMs = DEFAULT_TIMEOUT_MS,
    shell: Shell = "sh",
  ) => {
    const ps = shell === "powershell";
    const stdin = ps ? `${command}\n${POWERSHELL_END}\n` : undefined;
    const shArgv = ps ? POWERSHELL_ARGV : ["sh", "-c", command];
    logger.debug(
      `Running on ${transport.kind} (${shell}): ${command.slice(0, 200)}`,
    );
    switch (transport.kind) {
      case "image":
        return {
          stdout: "",
          stderr: `${transport.image} has no sh`,
          exitCode: NOT_FOUND_EXIT,
        };
      case "docker":
        return await runArgv(
          [
            "docker",
            "exec",
            ...(stdin !== undefined ? ["-i"] : []),
            transport.container,
            ...shArgv,
          ],
          timeoutMs,
          stdin,
        );
      case "ssh":
        if (Deno.build.os === "windows") {
          if (ps) {
            throw new Error(
              "Scanning a Windows host over SSH is not supported when swamp runs on Windows. Scan it with swamp running on that host (targetHost localhost), or over SSH from a Linux or macOS machine.",
            );
          }
          // Windows OpenSSH can't carry the probe over pipes; see windows_ssh.ts.
          return await runOverWindowsSsh(
            windowsSshSession(transport.args, logger, timeoutMs),
            command,
          );
        }
        return await runArgv(
          sshArgv(transport.args, ps),
          timeoutMs,
          ps ? stdin : wrapScript(command),
        );
      default:
        return await runArgv(shArgv, timeoutMs, stdin);
    }
  };
}

/** Environment that must not reach a runtime asked for its version. */
const CLEAN_ENV = ["NODE_OPTIONS=", "PYTHONPATH=", "PYTHONSTARTUP="];

/** Runs programs in a container (docker exec) or in fresh containers from an image (docker run). */
export function makeExec(transport: Transport, logger: Logger): Exec | null {
  if (transport.kind !== "docker" && transport.kind !== "image") return null;
  return async (argv: string[], timeoutMs = DIRECT_TIMEOUT_MS) => {
    logger.debug(`Running directly in ${transport.kind}: ${argv.join(" ")}`);
    const env = CLEAN_ENV.flatMap((e) => ["-e", e]);
    const cmd = transport.kind === "docker"
      ? ["docker", "exec", ...env, transport.container, ...argv]
      : [
        "docker",
        "run",
        "--rm",
        "--network",
        "none",
        `--pids-limit=${SCAN_CONTAINER_PIDS_LIMIT}`,
        ...env,
        "--entrypoint",
        argv[0],
        transport.image,
        ...argv.slice(1),
      ];
    return await runArgv(cmd, timeoutMs);
  };
}

/** Process limit for the scan container; the probe needs only a few. */
export const SCAN_CONTAINER_PIDS_LIMIT = 256;

/** How docker reports that a container or image has no sh. */
export const DOCKER_NO_SH =
  /exec: "?sh"?: (executable file not found|stat sh|no such file)|"sh": executable file not found|\bsh: (no such file|not found)/i;

/**
 * Starts a long-running container from an image for the sh probe. An image
 * without sh cannot be started that way; it is checked with docker run per
 * runtime instead (kind "image").
 */
export async function startDockerImage(
  image: string,
  logger: Logger,
): Promise<Transport & { started: boolean }> {
  assertSafeDockerRef("dockerImage", image);
  // No --rm: a container that exits at once must stay inspectable.
  // The explicit pids limit stands in for the docker CLI's 0, which rootless
  // podman applies literally, so sh cannot fork.
  // No network: the probe runs the image's own binaries and needs none.
  const out = await runArgv([
    "docker",
    "run",
    "-d",
    "--network",
    "none",
    `--pids-limit=${SCAN_CONTAINER_PIDS_LIMIT}`,
    "--entrypoint",
    "sh",
    image,
    "-c",
    "sleep 3600",
  ], UPGRADE_TIMEOUT_MS);
  const containerId = out.stdout.split("\n").pop()?.trim() ?? "";
  if (out.exitCode !== 0) {
    if (/^[0-9a-f]{12,}$/.test(containerId)) {
      await stopContainer(containerId, logger);
    }
    if (DOCKER_NO_SH.test(out.stderr)) {
      logger.info(`${image} has no sh; checking its runtimes directly`);
      return { kind: "image", image, started: false };
    }
    throw new Error(`Failed to start container from ${image}: ${out.stderr}`);
  }
  logger.info(`Started container ${containerId.slice(0, 12)} from ${image}`);
  const exited = await containerExit(containerId, image);
  if (exited) {
    await stopContainer(containerId, logger);
    if (DOCKER_NO_SH.test(exited)) {
      return { kind: "image", image, started: false };
    }
    throw new Error(exited);
  }
  return { kind: "docker", container: containerId, started: true };
}

/**
 * Why a scan container is not running, from `docker inspect` State output
 * ("<running> <exit code>") and its log tail; null while it runs.
 */
export function containerExitMessage(
  image: string,
  state: string,
  logs: string,
): string | null {
  const [running, exitCode] = state.trim().split(/\s+/);
  if (running === "true") return null;
  const tail = logs.trim().split("\n").slice(-5).join("; ");
  let msg = `The container started from ${image} exited${
    exitCode ? ` with code ${exitCode}` : ""
  }${tail ? `: ${tail}` : ""}`;
  if (
    /cannot fork|fork: (retry|resource temporarily unavailable)/i.test(tail)
  ) {
    msg +=
      `. It ran out of processes: check the container engine's pids limit (rootless podman with the docker CLI)`;
  }
  return msg;
}

async function containerExit(
  containerId: string,
  image: string,
): Promise<string | null> {
  const state = await runArgv([
    "docker",
    "inspect",
    "--format",
    "{{.State.Running}} {{.State.ExitCode}}",
    containerId,
  ], DEFAULT_TIMEOUT_MS);
  if (state.exitCode !== 0) {
    return `The container started from ${image} is gone: ${state.stderr}`;
  }
  const logs = await runArgv(
    ["docker", "logs", "--tail", "20", containerId],
    DEFAULT_TIMEOUT_MS,
  );
  return containerExitMessage(image, state.stdout, logs.stdout + logs.stderr);
}

/** Adds why the image's container stopped to a scan or mitigate failure. */
export async function withContainerExit(
  err: unknown,
  containerId: string,
  image: string,
): Promise<unknown> {
  const exited = await containerExit(containerId, image);
  if (!exited) return err;
  const message = err instanceof Error ? err.message : String(err);
  return new Error(`${message}. ${exited}`);
}

export async function stopContainer(containerId: string, logger: Logger) {
  await runArgv(["docker", "rm", "-f", containerId], DEFAULT_TIMEOUT_MS);
  logger.info(`Removed container ${containerId.slice(0, 12)}`);
}

/** The entrypoint of a container or image, from docker inspect. */
export async function entrypointOf(target: string): Promise<string[]> {
  const r = await runArgv([
    "docker",
    "inspect",
    "--format",
    "{{json .Config.Entrypoint}}",
    target,
  ], DEFAULT_TIMEOUT_MS);
  try {
    const v: unknown = JSON.parse(r.stdout);
    return Array.isArray(v) ? v.filter((s) => typeof s === "string") : [];
  } catch {
    return [];
  }
}

/** Prints the Python environment's Brotli-related distributions as probe lines. */
const PY_LIST = [
  "import sys",
  "try:",
  "    import importlib.metadata as m",
  "except ImportError:",
  "    sys.exit(0)",
  "def s(v):",
  '    return v.replace("\\r", "?").replace("\\n", "?").replace("|", "?")',
  "seen = set()",
  "for d in m.distributions():",
  '    n = (d.metadata["Name"] or "")',
  '    p = str(d.locate_file("")).rstrip("/")',
  "    if p not in seen:",
  "        seen.add(p)",
  '        print("PYENV|" + s(p))',
  '    if n.lower() in ("brotli", "brotlicffi", "urllib3", "requests", "aiohttp", "httpx", "scrapy"):',
  '        print("PYPKG|" + s(p) + "|" + s(n) + "-" + s(d.version) + ".dist-info")',
].join("\n");

/**
 * The probe for a container without sh: each candidate runtime is run with
 * a fixed expression. Prints the same tags the sh probe does, for the parts
 * it can see.
 */
export async function directProbe(
  exec: Exec,
  label: string,
  entrypoint: string[],
): Promise<string> {
  const lines = [
    `HOSTNAME|${label}`,
    "KERNEL|Linux",
    "INCONTAINER|1",
    "NOSH|1",
  ];
  const ep = entrypoint[0] ?? "";
  const named = (re: RegExp) => re.test(ep.replace(/^.*\//, "")) ? [ep] : [];
  const uniq = (xs: string[]) => [...new Set(xs)];
  const seen = new Set<string>();
  for (
    const bin of uniq([
      ...named(/^node(js)?$/),
      "node",
      "/nodejs/bin/node",
      "/usr/local/bin/node",
    ])
  ) {
    const r = await exec([
      bin,
      "-p",
      'process.version+" "+(process.versions.brotli||"")+" "+process.execPath',
    ]);
    const m = r.stdout.trim().match(/^(v\d\S*) (\S*) (\S+)$/);
    if (r.exitCode !== 0 || !m || seen.has(m[3])) continue;
    seen.add(m[3]);
    lines.push(`NODE|${m[3]}||${m[1]} ${m[2]}|?`);
  }
  for (const bin of uniq([...named(/^bun$/), "bun", "/usr/local/bin/bun"])) {
    const r = await exec([bin, "--version"]);
    if (r.exitCode === 0 && /^\d/.test(r.stdout.trim())) {
      lines.push(`BUN|${bin}|${r.stdout.trim().split("\n")[0]}`);
      break;
    }
  }
  for (
    const bin of uniq([
      ...named(/^python3?(\.\d+)?$/),
      "python3",
      "/usr/bin/python3",
      "/usr/local/bin/python3",
    ])
  ) {
    const r = await exec([bin, "-I", "-c", PY_LIST]);
    if (r.exitCode !== 0) continue;
    lines.push(
      ...r.stdout.split("\n").filter((l) => /^(PYENV|PYPKG)\|/.test(l)),
    );
    break;
  }
  lines.push("PROCSCOPE|none", "END|1");
  return lines.join("\n");
}

/** How a Windows host's cmd.exe, PowerShell or pwsh reports a missing "sh". */
const NO_SH =
  /is not recognized as (an internal or external command|(the|a) name of a cmdlet)/;

/** An sh from Git for Windows, MSYS2 or Cygwin: the host is Windows. */
const WINDOWS_SH = /^KERNEL\|(MINGW|MSYS|CYGWIN)/m;

/** Runs the probe through a runner and analyzes the result. */
export async function scanTarget(
  run: Runner,
  exec: Exec | null,
  target: string,
  opts: {
    inContainer: boolean;
    searchPaths: string[];
    container?: string;
    /** Test seam for the docker inspect of a container without sh. */
    entrypoint?: (target: string) => Promise<string[]>;
  },
): Promise<{ status: Status; facts: ProbeFacts }> {
  const posix = opts.searchPaths.filter((p) => p.startsWith("/"));
  let probe: Status["probe"] = "sh";
  let r = await run(buildShProbe(posix));
  if (
    exec && !r.stdout.includes("HOSTNAME|") &&
    (r.exitCode === NOT_FOUND_EXIT || r.exitCode === 126 ||
      DOCKER_NO_SH.test(r.stderr))
  ) {
    // A container or image without sh: ask its runtimes directly.
    const ep = await (opts.entrypoint ?? entrypointOf)(
      opts.container ?? target,
    );
    r = {
      stdout: await directProbe(exec, target, ep),
      stderr: "",
      exitCode: 0,
    };
    probe = "direct";
  } else if (
    WINDOWS_SH.test(r.stdout) ||
    (!r.stdout.includes("HOSTNAME|") &&
      (NO_SH.test(r.stderr + r.stdout) || r.exitCode === NOT_FOUND_EXIT))
  ) {
    // A Windows host: the sh probe cannot see its layouts, or there is no
    // sh at all. The PowerShell probe prints the same facts.
    r = await run(
      buildWindowsProbe(opts.searchPaths),
      DEFAULT_TIMEOUT_MS,
      "powershell",
    );
    probe = "powershell";
  }
  if (!r.stdout.includes("HOSTNAME|")) {
    throw new Error(
      `Cannot execute commands on ${target}: ${
        r.stderr || `probe produced no output (exit ${r.exitCode})`
      }`,
    );
  }
  const facts = parseProbe(r.stdout);
  // A probe cut short (dropped connection, timeout) must not read as "nothing found".
  if (!facts.complete) {
    throw new Error(
      `Incomplete scan of ${target}: the probe stopped before finishing (exit ${r.exitCode}${
        r.stderr ? `, ${r.stderr}` : ""
      })`,
    );
  }
  return {
    status: analyze(facts, target, { inContainer: opts.inContainer, probe }),
    facts,
  };
}
