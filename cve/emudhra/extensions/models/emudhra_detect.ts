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
 * eMudhra CA compromise scanner — finds Linux, macOS and Windows hosts and
 * Linux containers whose TLS trust still accepts the eight eMudhra
 * intermediates whose keys were found to be recoverable (reported
 * 2026-10-17, public 2026-10-20), and fixes the OS store where it can. Runs
 * over local, SSH, or Docker transports.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
import {
  analyzeStores,
  assertSafeDockerRef,
  assertSafeSshTarget,
  assessHost,
  buildProbeScript,
  type HostStatus,
  type MitigationPlan,
  parseProbe,
  planMitigation,
  type PlannedStep,
  type ProbeData,
  refusedCommands,
  renderMitigationScript,
  renderStep,
  renderWindowsMitigationScript,
  rootsToDistrust,
  settledPool,
  shQuote,
  splitList,
  splitSections,
  sudoCheckCommand,
  tool,
  wrapScript,
} from "./_lib/emudhra_logic.ts";
import { DISTRUST_ANCHOR } from "./_lib/emudhra_certs.ts";
import {
  buildWindowsProbe,
  launcherInput,
  POWERSHELL_ARGV,
} from "./_lib/windows_probe.ts";
import {
  cmdLine,
  runOverWindowsSsh,
  type SshSession,
} from "./_lib/windows_ssh.ts";

type FileWriter = {
  writeLine: (line: string) => Promise<void>;
  writeText: (text: string) => Promise<unknown>;
  finalize: () => Promise<unknown>;
};

type Logger = { info: (msg: string) => void; debug: (msg: string) => void };

/** An error from one target, carrying that target's finalized log handle. */
type TargetFailure = Error & { logHandle?: unknown };

/**
 * Run one target's work against its log. If the work throws, the error is
 * written to the log and the log is finalized, so the failing host's log
 * (the one needed to debug it) is still saved; its handle rides on the error.
 */
export async function withTargetLog<T>(
  log: FileWriter,
  work: () => Promise<T>,
): Promise<T> {
  try {
    return await work();
  } catch (e) {
    const err: TargetFailure = e instanceof Error ? e : new Error(String(e));
    try {
      await log.writeLine(`\nERROR: ${err.message}\n`);
      err.logHandle = await log.finalize();
    } catch {
      // The original error matters more than a log that could not be saved.
    }
    throw err;
  }
}

/** The log handle a failed target left on its error, if any. */
export function failureLog(reason: unknown): unknown[] {
  const h = (reason as TargetFailure | undefined)?.logHandle;
  return h === undefined ? [] : [h];
}

type MethodContext = {
  globalArgs: z.infer<typeof GlobalArgsSchema>;
  logger: Logger;
  createFileWriter: (fileSpec: string, label: string) => FileWriter;
  writeResource: (
    specName: string,
    instanceName: string,
    data: unknown,
  ) => Promise<unknown>;
};

const GlobalArgsSchema = z.object({
  targetHost: z
    .string()
    .default("localhost")
    .describe("SSH host to scan, or 'localhost' for local detection"),
  sshUser: z
    .string()
    .default("root")
    .describe("SSH user for remote hosts"),
  sshKey: z
    .string()
    .optional()
    .describe("Path to SSH private key for remote hosts"),
  dockerContainer: z
    .string()
    .optional()
    .describe("Docker container name or ID to scan (overrides targetHost/SSH)"),
  dockerImage: z
    .string()
    .optional()
    .describe(
      "Docker image to start and scan — container is created and removed automatically",
    ),
  searchPaths: z
    .string()
    .default("")
    .describe(
      "Comma-separated absolute directories to search (read-only) for Cargo.lock, mix.lock, rebar.lock and certifi bundles",
    ),
  liveCheck: z
    .boolean()
    .default(false)
    .describe(
      "Also connect to the eMudhra test hosts with curl and openssl from the target",
    ),
  targetOs: z
    .enum(["auto", "linux", "macos", "windows"])
    .default("auto")
    .describe(
      "The target's OS. auto asks an SSH target with uname -s first; set it to skip that round trip",
    ),
});

const InputsSchema = z.object({
  targetHost: z.string().optional().describe("SSH host to scan"),
  sshUser: z.string().optional().describe("SSH user for remote hosts"),
  sshKey: z.string().optional().describe("Path to SSH private key"),
  dockerContainer: z.string().optional().describe(
    "Docker container name or ID",
  ),
  dockerImage: z.string().optional().describe("Docker image to auto-start"),
  searchPaths: z.string().optional().describe(
    "Comma-separated directories to search for lockfiles and bundles",
  ),
  liveCheck: z.boolean().optional().describe("Run the live TLS check"),
  targetOs: z.enum(["auto", "linux", "macos", "windows"]).optional()
    .describe("The target's OS, or auto"),
});

const StatusEnum = z.enum(["fixed", "exposed", "no-fix-released", "unknown"]);
const VerdictEnum = z.enum(["trusted", "not-trusted", "unknown"]);

const StepSchema = z.object({ why: z.string(), command: z.string() });

const HostStatusSchema = z.object({
  scanTimestamp: z.string(),
  dataAsOf: z.string(),
  target: z.string(),
  hostname: z.string(),
  os: z.object({
    id: z.string(),
    versionId: z.string(),
    prettyName: z.string(),
    storeFamily: z.enum([
      "debian-conf",
      "p11-kit",
      "alpine",
      "arch",
      "macos",
      "windows",
      "other",
    ]),
  }),
  exposed: z.boolean(),
  riskLevel: z.enum(["critical", "high", "medium", "low", "none"]),
  summary: z.string(),
  osStore: z.object({
    bundle: z.string(),
    verdict: VerdictEnum,
    trustedPaths: z.array(z.enum(["emsign", "aaa"])),
    verdictMethod: z.string(),
    anchorPresent: z.boolean(),
    codeSigningTrusted: VerdictEnum,
    caCertificates: z.object({
      installed: z.string(),
      fixedIn: z.string(),
      patched: StatusEnum,
    }),
    debianConfDistrusted: z.array(z.string()),
    p11kitBlocklisted: z.array(z.string()),
    certificates: z.array(z.object({
      name: z.string(),
      usage: z.enum(["tls", "code-signing"]),
      path: z.enum(["emsign", "aaa"]),
      sha256: z.string(),
      result: z.enum(["trusted", "rejected", "not-checked"]),
      detail: z.string(),
    })),
    macos: z.object({ denyTrust: z.array(z.string()) }).optional(),
    windows: z.object({
      disallowed: z.array(z.string()),
      rootAutoUpdate: z.enum(["enabled", "disabled", "unknown"]),
      disallowedAutoUpdate: z.enum(["enabled", "disabled", "unknown"]),
    }).optional(),
  }),
  components: z.array(z.object({
    kind: z.enum([
      "runtime",
      "agent",
      "java",
      "certifi",
      "bundle",
      "electron",
      "cargo",
      "hex",
    ]),
    name: z.string(),
    path: z.string(),
    version: z.string(),
    fixedIn: z.string().optional(),
    status: StatusEnum,
    note: z.string(),
  })),
  liveCheck: z.array(z.object({
    verifier: z.string(),
    path: z.string(),
    host: z.string(),
    result: z.enum(["rejected", "accepted", "unreachable"]),
  })),
  processes: z.array(z.object({ name: z.string(), count: z.number() })),
  unreadable: z.array(z.string()),
  recommendations: z.array(z.string()),
  mitigation: z.object({
    dryRun: z.boolean(),
    action: z.enum([
      "none",
      "apply",
      "needs-privilege",
      "rebuild-image",
      "manual",
    ]),
    applied: z.boolean(),
    succeeded: z.boolean(),
    privilege: z.enum(["root", "sudo", "admin", "none"]),
    missingPrivilege: z.array(z.string()),
    steps: z.array(StepSchema),
    failedStep: z.string().optional(),
    before: z.object({ verdict: VerdictEnum, riskLevel: z.string() }),
    manual: z.array(z.string()),
    restart: z.array(z.string()),
    notes: z.array(z.string()),
    summary: z.string(),
  }).optional(),
});

/** The OS a probe is written for. Anything that is not macOS or Windows gets the POSIX probe. */
export type TargetOs = "linux" | "macos" | "windows";

export type Transport =
  | { kind: "local"; os: TargetOs }
  // os is filled in by resolveOs before the first script runs.
  | { kind: "ssh"; args: string[]; os?: TargetOs }
  | { kind: "docker"; container: string; os: TargetOs };

/** A script and the shell that runs it. */
export type Script = { shell: "sh" | "powershell"; text: string };

/** The OS swamp itself runs on, as a target. */
function localOs(): TargetOs {
  return Deno.build.os === "windows"
    ? "windows"
    : Deno.build.os === "darwin"
    ? "macos"
    : "linux";
}

function present(val: string | undefined): string | undefined {
  return val && val.length > 0 ? val : undefined;
}

export function buildTransport(g: {
  targetHost: string;
  sshUser: string;
  sshKey?: string;
  dockerContainer?: string;
  targetOs?: "auto" | TargetOs;
  /** A host from a hosts list, where localhost is refused rather than run locally. */
  listed?: boolean;
  /** Refuse unknown host keys (mitigate) instead of accepting them on first contact. */
  strictHostKeys?: boolean;
}): Transport {
  const container = present(g.dockerContainer);
  if (container) {
    assertSafeDockerRef("dockerContainer", container);
    return { kind: "docker", container, os: "linux" };
  }
  if (
    g.targetHost === "localhost" || g.targetHost === "127.0.0.1" ||
    g.targetHost === "::1"
  ) {
    if (g.listed) {
      throw new Error(
        `${g.targetHost} in a hosts list would scan the machine swamp runs on, not an SSH host; run scan or mitigate without hosts (targetHost localhost) for that`,
      );
    }
    return { kind: "local", os: localOs() };
  }
  assertSafeSshTarget(g.sshUser, g.targetHost);
  // BatchMode stops ssh falling back to a password prompt nobody can see;
  // the keepalives drop a connection whose host stops answering.
  const args = [
    "-o",
    "BatchMode=yes",
    "-o",
    `StrictHostKeyChecking=${g.strictHostKeys ? "yes" : "accept-new"}`,
    "-o",
    "ConnectTimeout=10",
    "-o",
    "ServerAliveInterval=15",
    "-o",
    "ServerAliveCountMax=4",
  ];
  if (present(g.sshKey)) args.push("-i", g.sshKey!);
  args.push("--", `${g.sshUser}@${g.targetHost}`);
  return g.targetOs && g.targetOs !== "auto"
    ? { kind: "ssh", args, os: g.targetOs }
    : { kind: "ssh", args };
}

/** How cmd.exe, Windows PowerShell and pwsh report a command they can't find. */
const NOT_RECOGNIZED =
  /is not recognized as (an internal or external command|(the|a) name of a cmdlet)/i;

/**
 * The OS behind an SSH login, from `uname -s` run by its login shell. A
 * Windows host answers with cmd.exe's or PowerShell's "not recognized", or,
 * with Git for Windows, MSYS2 or Cygwin on PATH, with MINGW, MSYS or CYGWIN:
 * the POSIX probe would find nothing there and read as clean.
 */
export function parseOsDetection(
  r: { stdout: string; stderr: string; exitCode: number },
): TargetOs {
  const out = r.stdout.trim();
  if (/^Darwin\b/m.test(out)) return "macos";
  if (/^(MINGW|MSYS|CYGWIN)/im.test(out)) return "windows";
  if (NOT_RECOGNIZED.test(`${r.stdout}\n${r.stderr}`)) return "windows";
  if (r.exitCode === 0 && /^[A-Za-z][\w./-]*$/m.test(out)) return "linux";
  throw new Error(
    `could not tell the target's OS from uname -s (exit ${r.exitCode}${
      r.stderr.trim() ? `: ${r.stderr.trim().split("\n").slice(-1)[0]}` : ""
    }); set targetOs`,
  );
}

/** Fill in an SSH target's OS, asking it once. */
async function resolveOs(
  transport: Transport,
  logger: Logger,
): Promise<TargetOs> {
  if (transport.kind !== "ssh") return transport.os;
  if (!transport.os) {
    const r = Deno.build.os === "windows"
      ? await windowsSshSession(transport.args, logger, 60_000)("uname -s")
        .then((x) => ({ ...x, stdout: new TextDecoder().decode(x.stdout) }))
      : await runCommand(
        ["ssh", ...transport.args, "uname -s"],
        undefined,
        logger,
        60_000,
      );
    if (r.exitCode === 255) {
      throw new Error(`ssh failed: ${sshHint(r.stderr) || "exit 255"}`);
    }
    transport.os = parseOsDetection(r);
    logger.debug(`SSH target OS: ${transport.os}`);
  }
  return transport.os;
}

/** A host as a data name: IPv6 colons and anything else unsafe become "-". */
export function dataName(host: string): string {
  return host.replace(/[^A-Za-z0-9._-]+/g, "-");
}

/**
 * Refuse a hosts list where two different hosts would share a data name
 * (a:b and a-b), so neither overwrites the other's status and log.
 */
export function assertDistinctDataNames(hosts: string[]): void {
  const seen = new Map<string, string>();
  for (const h of hosts) {
    const name = dataName(h);
    const other = seen.get(name);
    if (other !== undefined && other !== h) {
      throw new Error(
        `hosts ${JSON.stringify(other)} and ${
          JSON.stringify(h)
        } would share the data name ${name}; list them in separate runs`,
      );
    }
    seen.set(name, h);
  }
}

/** ssh's own error, with what to do when it is a host key refusal. */
function sshHint(stderr: string): string {
  return /Host key verification failed|No \S+ host key is known/i.test(stderr)
    ? `${stderr} mitigate only connects to hosts whose key is already known: run scan first (it records the key on first contact) or add the key to known_hosts.`
    : stderr;
}

/** Data name for a scan of an auto-started image: stable across runs. */
function imageLabel(image: string): string {
  return `image-${image.replace(/[^A-Za-z0-9._-]+/g, "-")}`;
}

function targetLabel(g: {
  targetHost: string;
  dockerContainer?: string;
}): string {
  const container = present(g.dockerContainer);
  if (container) {
    return `docker-${dataName(container)}`;
  }
  return dataName(g.targetHost);
}

/**
 * Longest a single script may run. Package upgrades during mitigate are the
 * slow case; a stalled host must not hold up the rest of a fleet.
 */
const SCRIPT_TIMEOUT_MS = 15 * 60 * 1000;

/** sudo -n's refusal when a rule would prompt for a password. */
const SUDO_PASSWORD = /a password is required|a terminal is required/i;

/** Upgrade failures that mean another package operation may be running. */
const BUSY_PACKAGE_MANAGER =
  /could not get lock|unable to lock|is another process using it|did not finish within|waiting for (process|lock)|lock.*held by/i;

/** Hosts scanned or mitigated at once. */
const FLEET_CONCURRENCY = 16;

/**
 * How long to keep reading a finished command's pipes: briefly after a kill,
 * when a process that inherited them (an ssh ControlMaster) can hold them
 * open; longer after a normal exit, so a busy event loop during a fleet scan
 * never cuts a probe's output short.
 */
const PIPE_GRACE_KILLED_MS = 2_000;
const PIPE_GRACE_EXITED_MS = 30_000;

/**
 * Read a stream as it arrives. The returned function waits for its end, but
 * at most graceMs: a killed command's pipes can stay open in a process that
 * inherited them (an ssh ControlMaster), and output() would wait forever.
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
    let off = 0;
    for (const c of chunks) {
      bytes.set(c, off);
      off += c.length;
    }
    return new TextDecoder().decode(bytes);
  };
}

/** One command's result. */
export type CommandResult = {
  stdout: string;
  stderr: string;
  exitCode: number;
};

/**
 * Run a command with optional stdin, stopping it after timeoutMs. Output is
 * read while the command runs, so a transport that exits early (refused
 * connection, rejected key) reports its own error rather than a broken pipe.
 */
export async function runCommand(
  cmd: string[],
  input: string | undefined,
  logger: Logger,
  timeoutMs: number,
  exitedGraceMs = PIPE_GRACE_EXITED_MS,
): Promise<CommandResult> {
  logger.debug(
    `Running ${cmd[0]} (${input?.length ?? 0} bytes of input): ${
      cmd.slice(1).join(" ").slice(0, 200)
    }`,
  );
  const timeout = AbortSignal.timeout(timeoutMs);
  const child = new Deno.Command(cmd[0], {
    args: cmd.slice(1),
    stdin: input === undefined ? "null" : "piped",
    stdout: "piped",
    stderr: "piped",
    signal: timeout,
  }).spawn();
  const stdout = collect(child.stdout);
  const stderr = collect(child.stderr);
  let writeError: unknown;
  if (input !== undefined) {
    const writer = child.stdin.getWriter();
    try {
      await writer.write(new TextEncoder().encode(input));
      await writer.close();
    } catch (err) {
      writeError = err;
    }
  }
  const status = await child.status;
  const grace = timeout.aborted ? PIPE_GRACE_KILLED_MS : exitedGraceMs;
  const [out, err] = await Promise.all([stdout(grace), stderr(grace)]);
  const errText = err.trim();
  if (timeout.aborted) {
    throw new Error(
      `${cmd[0]} did not finish within ${
        timeoutMs / 60000
      } minutes and was stopped${errText ? `: ${errText}` : ""}`,
    );
  }
  if (writeError !== undefined && status.code === 0) {
    throw writeError instanceof Error
      ? writeError
      : new Error(String(writeError));
  }
  return { stdout: out, stderr: errText, exitCode: status.code };
}

/**
 * One ssh session on a Windows controller: ssh runs under cmd.exe with its
 * stdio in temporary files, which is the only way Windows OpenSSH exits
 * cleanly. A session that overruns has its whole process tree killed, so no
 * orphaned ssh keeps the files open.
 */
function windowsSshSession(
  sshArgs: string[],
  logger: Logger,
  timeoutMs: number,
): SshSession {
  return async (remote, input) => {
    const dir = await Deno.makeTempDir({ prefix: "emudhra-ssh-" });
    try {
      const files = {
        input: input === undefined ? undefined : `${dir}\\in`,
        stdout: `${dir}\\out`,
        stderr: `${dir}\\err`,
      };
      if (files.input) await Deno.writeTextFile(files.input, input!);
      logger.debug(`ssh (via cmd.exe): ${remote.slice(0, 200)}`);
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
        throw new Error(
          `ssh did not finish within ${
            timeoutMs / 60000
          } minutes and was stopped${
            stderr.trim() ? `: ${stderr.trim()}` : ""
          }`,
        );
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

/** The command and stdin that run a script on the target. */
export function scriptCommand(
  transport: Transport & { os: TargetOs },
  script: Script,
): { cmd: string[]; input: string } {
  const ps = script.shell === "powershell";
  // Wrapping an sh script in a function makes sh read all of it before
  // running anything, so no command it starts can consume the rest.
  const input = ps ? launcherInput(script.text) : wrapScript(script.text);
  switch (transport.kind) {
    case "docker":
      return {
        cmd: ["docker", "exec", "-i", transport.container, "sh", "-s"],
        input,
      };
    case "ssh":
      return {
        cmd: [
          "ssh",
          ...transport.args,
          ps ? POWERSHELL_ARGV.join(" ") : "sh -s",
        ],
        input,
      };
    default:
      return { cmd: ps ? [...POWERSHELL_ARGV] : ["sh", "-s"], input };
  }
}

/**
 * Test seam: when set, every script goes here instead of to the target, so
 * the method sequences (scan, mitigate) are tested without hosts.
 */
export const testHooks: {
  runScript?: (
    transport: Transport,
    script: Script,
  ) => Promise<CommandResult>;
} = {};

/** Run a script on the target, passing it on stdin so its size and quoting never depend on the transport. */
async function runScript(
  transport: Transport,
  script: Script | string,
  logger: Logger,
  timeoutMs = SCRIPT_TIMEOUT_MS,
): Promise<CommandResult> {
  const os = await resolveOs(transport, logger);
  const s: Script = typeof script === "string"
    ? { shell: "sh", text: script }
    : script;
  if ((s.shell === "powershell") !== (os === "windows")) {
    throw new Error(`a ${s.shell} script cannot run on a ${os} target`);
  }
  if (testHooks.runScript) return await testHooks.runScript(transport, s);
  if (transport.kind === "ssh" && Deno.build.os === "windows") {
    if (os === "windows") {
      throw new Error(
        "Scanning a Windows host over SSH is not supported when swamp runs on Windows. Scan it with swamp running on that host (targetHost localhost), or over SSH from a Linux or macOS machine.",
      );
    }
    // Windows OpenSSH can't carry the probe over pipes; see windows_ssh.ts.
    return await runOverWindowsSsh(
      windowsSshSession(transport.args, logger, timeoutMs),
      wrapScript(s.text),
    );
  }
  const { cmd, input } = scriptCommand({ ...transport, os }, s);
  return await runCommand(cmd, input, logger, timeoutMs);
}

async function startDockerImage(
  image: string,
  logger: { info: (msg: string) => void },
): Promise<string> {
  assertSafeDockerRef("dockerImage", image);
  const proc = new Deno.Command("docker", {
    // An explicit pids limit: podman's Docker-compatible API reads the
    // Docker CLI's default of 0 as near zero, and the probe could not fork.
    args: [
      "run",
      "-d",
      "--rm",
      "--pids-limit",
      "4096",
      "--entrypoint",
      "sleep",
      image,
      "3600",
    ],
    stdout: "piped",
    stderr: "piped",
  });
  const output = await proc.output();
  const containerId = new TextDecoder().decode(output.stdout).trim();
  if (output.code !== 0) {
    const stderr = new TextDecoder().decode(output.stderr).trim();
    throw new Error(`Failed to start container from ${image}: ${stderr}`);
  }
  logger.info(`Started container ${containerId.slice(0, 12)} from ${image}`);
  return containerId;
}

async function stopContainer(
  containerId: string,
  logger: { info: (msg: string) => void },
): Promise<void> {
  const out = await new Deno.Command("docker", {
    args: ["stop", containerId],
    stdout: "piped",
    stderr: "piped",
  }).output();
  logger.info(
    out.code === 0
      ? `Stopped container ${containerId.slice(0, 12)}`
      : `Could not stop container ${
        containerId.slice(0, 12)
      } (it was started with --rm and sleeps for an hour at most): ${
        new TextDecoder().decode(out.stderr).trim()
      }`,
  );
}

async function probeHost(
  transport: Transport,
  host: string,
  g: { searchPaths: string; liveCheck: boolean },
  log: { writeLine: (msg: string) => Promise<void> },
  logger: Logger,
): Promise<{ probe: ProbeData; status: HostStatus }> {
  const os = await resolveOs(transport, logger);
  const opts = {
    searchPaths: splitList(g.searchPaths),
    liveCheck: g.liveCheck,
  };
  const script: Script = os === "windows"
    ? { shell: "powershell", text: buildWindowsProbe(opts) }
    : { shell: "sh", text: buildProbeScript(opts) };
  const result = await runScript(transport, script, logger);
  if (!result.stdout.includes("@@ os-release")) {
    const errMsg = sshHint(result.stderr) ||
      `exit code ${result.exitCode} after ${
        JSON.stringify(result.stdout.trim().split("\n").slice(-1)[0] ?? "")
      } (a container that cannot fork processes fails this way)`;
    throw new Error(`Cannot execute commands on ${host}: ${errMsg}`);
  }
  const probe = parseProbe(result.stdout);
  const status = assessHost(
    probe,
    host,
    new Date(),
    await analyzeStores(probe),
  );
  await log.writeLine(`Host: ${status.hostname} (${status.os.prettyName})\n`);
  await log.writeLine(
    `OS store ${status.osStore.bundle || "(none)"}: ${status.osStore.verdict}${
      status.osStore.trustedPaths.length > 0
        ? ` via ${status.osStore.trustedPaths.join(", ")}`
        : ""
    } (${status.osStore.verdictMethod})\n`,
  );
  await log.writeLine(
    `ca-certificates ${
      status.osStore.caCertificates.installed || "unknown"
    } (fixed in ${status.osStore.caCertificates.fixedIn || "unknown"})\n`,
  );
  for (const c of status.components) {
    await log.writeLine(
      `${c.kind} ${c.name} ${c.version} at ${c.path}: ${c.status}\n`,
    );
  }
  for (const l of status.liveCheck) {
    await log.writeLine(`live ${l.verifier} -> ${l.host}: ${l.result}\n`);
  }
  await log.writeLine(
    `\n=== Result: ${status.riskLevel.toUpperCase()} ===\n${status.summary}\n`,
  );
  return { probe, status };
}

async function scanTarget(
  transport: Transport,
  host: string,
  g: { searchPaths: string; liveCheck: boolean },
  log: { writeLine: (msg: string) => Promise<void> },
  logger: Logger,
) {
  if (transport.kind === "ssh") {
    await log.writeLine(`Checking SSH connectivity to ${host}...\n`);
  }
  return await probeHost(transport, host, g, log, logger);
}

async function readConf(
  transport: Transport,
  logger: Logger,
): Promise<string | undefined> {
  const r = await runScript(
    transport,
    "echo '@@ conf'; cat /etc/ca-certificates.conf && echo '@@ ok'",
    logger,
  );
  const sections = splitSections(r.stdout);
  // The end marker may share the last line when the file lacks a final newline.
  if (!sections.has("ok") && !r.stdout.trimEnd().endsWith("@@ ok")) {
    return undefined;
  }
  const start = r.stdout.indexOf("@@ conf\n") + "@@ conf\n".length;
  const end = r.stdout.lastIndexOf("@@ ok");
  return r.stdout.slice(start, end);
}

type MitigationRecord = NonNullable<
  z.infer<typeof HostStatusSchema>["mitigation"]
>;

async function mitigateTarget(
  transport: Transport,
  host: string,
  g: { searchPaths: string; liveCheck: boolean },
  dryRun: boolean,
  context: MethodContext,
): Promise<
  { status: HostStatus; mitigation: MitigationRecord; files: unknown[] }
> {
  const log = context.createFileWriter("log", `${dataName(host)}-log`);
  return await withTargetLog(
    log,
    () => mitigateTargetWithLog(transport, host, g, dryRun, context, log),
  );
}

async function mitigateTargetWithLog(
  transport: Transport,
  host: string,
  g: { searchPaths: string; liveCheck: boolean },
  dryRun: boolean,
  context: MethodContext,
  log: FileWriter,
): Promise<
  { status: HostStatus; mitigation: MitigationRecord; files: unknown[] }
> {
  const logger = context.logger;
  await log.writeLine(`Scanning ${host} before mitigation...\n`);
  const { probe, status } = await scanTarget(transport, host, g, log, logger);

  const conf = status.os.storeFamily === "debian-conf" &&
      transport.kind !== "docker"
    ? await readConf(transport, logger)
    : undefined;
  const plan: MitigationPlan = planMitigation(status, probe, {
    transport: transport.kind,
    conf,
  });
  const windows = status.os.storeFamily === "windows";
  // On Windows an elevated administrator session plays root's part.
  const isRoot = probe.uid === 0 || (windows && probe.admin);
  const installPath = tool(probe, "install");
  const steps: PlannedStep[] = [
    ...plan.upgrade,
    ...plan.distrust,
    ...plan.after,
  ];
  const rendered = (s: PlannedStep) => ({
    why: s.why,
    command: renderStep(s, { sudo: !isRoot, installPath, brief: true }),
  });

  const record: MitigationRecord = {
    dryRun,
    action: plan.action,
    applied: false,
    succeeded: false,
    privilege: isRoot ? (windows ? "admin" : "root") : "none",
    missingPrivilege: [],
    steps: steps.map(rendered),
    before: { verdict: status.osStore.verdict, riskLevel: status.riskLevel },
    manual: plan.manual,
    restart: plan.restart,
    notes: plan.notes,
    summary: "",
  };

  // Commands sudo was asked about and allowed, so a re-plan only re-checks
  // what is new.
  const key = (argv: string[]) => argv.join("\0");
  const allowed = new Set<string>();
  if (plan.action === "apply" && !isRoot && windows) {
    // Windows has no sudo: the Disallowed store needs an elevated session.
    record.action = "needs-privilege";
    record.missingPrivilege = [
      "an elevated administrator session (LocalMachine\\Disallowed)",
    ];
  } else if (plan.action === "apply" && !isRoot) {
    const required = new Set(plan.privilegedCommands.map(key));
    const toCheck = [
      ...plan.privilegedCommands,
      ...plan.distrustCommands.filter((argv) => !required.has(key(argv))),
    ];
    const refused = !probe.tools["sudo"] ? toCheck : refusedCommands(
      toCheck,
      (await runScript(transport, sudoCheckCommand(toCheck), logger)).stdout
        .split("\n"),
    );
    const refusedKeys = new Set(refused.map(key));
    for (const argv of toCheck) {
      if (!refusedKeys.has(key(argv))) allowed.add(key(argv));
    }
    record.missingPrivilege = refused.filter((argv) => required.has(key(argv)))
      .map((argv) => argv.map(shQuote).join(" "));
    const optional = refused.filter((argv) => !required.has(key(argv)));
    if (record.missingPrivilege.length > 0) {
      record.action = "needs-privilege";
    } else {
      record.privilege = "sudo";
      if (optional.length > 0) {
        record.notes.push(
          `If the upgrade does not fix the store, the distrust step also needs sudo for: ${
            optional.map((argv) => argv.map(shQuote).join(" ")).join("; ")
          }. Otherwise run the mitigation-script file artifact with sudo.`,
        );
      }
    }
  }

  const files: unknown[] = [];
  if (
    record.action === "apply" || record.action === "needs-privilege" ||
    plan.manualScript
  ) {
    const script = context.createFileWriter(
      "mitigationScript",
      `${dataName(host)}-mitigation-script`,
    );
    files.push(
      await script.writeText(
        plan.manualScript ??
          (windows
            ? renderWindowsMitigationScript(host, plan)
            : renderMitigationScript(
              host,
              plan,
              installPath,
              rootsToDistrust(status),
            )),
      ),
    );
  }

  await log.writeLine(`\n=== Mitigation plan: ${record.action} ===\n`);
  for (const s of record.steps) {
    await log.writeLine(`# ${s.why}\n${s.command}\n`);
  }
  for (const m of record.manual) await log.writeLine(`MANUAL: ${m}\n`);
  for (const n of record.notes) await log.writeLine(`NOTE: ${n}\n`);

  let finalStatus = status;
  if (record.action === "needs-privilege" && windows) {
    record.summary =
      `Needs privilege: ${host} is not an elevated administrator session, so nothing was changed. Run the mitigation-script file artifact (a .ps1) in an elevated PowerShell on ${host}, or rerun mitigate as an administrator.`;
  } else if (record.action === "needs-privilege") {
    record.summary = `Needs privilege: ${
      record.missingPrivilege.join(", ")
    } not allowed by passwordless sudo for ${host}. Nothing was changed. Run the mitigation-script file artifact with sudo, or grant sudo for exactly those binaries (see the README).`;
  } else if (record.action !== "apply") {
    const accepted = status.liveCheck.filter((l) => l.result === "accepted");
    record.summary = record.action === "none"
      ? status.osStore.verdict === "unknown"
        ? `${host}: the OS store could not be judged (see unreadable); nothing was changed.`
        : accepted.length > 0
        ? `${host}: the OS store rejects the compromised intermediates, but ${
          accepted.map((l) => `${l.verifier} (${l.path})`).join(", ")
        } accepted a test host; nothing was changed. Check that verifier's own store.`
        : `${host} does not trust the compromised intermediates; nothing to do.`
      : record.action === "rebuild-image"
      ? `${host} is a container; rebuild its image (containers are never modified).`
      : plan.manualScript
      ? `${host} needs manual action: run the mitigation-script file artifact locally with sudo (see the manual list).`
      : `${host} needs manual action; see the manual list.`;
  } else if (dryRun) {
    record.summary =
      `Dry run: ${record.steps.length} step(s) planned for ${host}. Re-run with dryRun=false to apply.`;
  } else {
    record.applied = true;
    // Full output of the last failed step, for the busy-lock check: the
    // telling line is not always the last one (apk).
    let lastFailureOutput = "";
    // A step sudo refused for want of a password, and how many ran before it:
    // the pre-check reads sudo's rules, but this catches any it misjudged.
    let passwordRefused: PlannedStep | undefined;
    let stepsRan = 0;
    const exec = async (s: PlannedStep): Promise<boolean> => {
      lastFailureOutput = "";
      const text: string | { shell: "powershell"; text: string } =
        s.kind === "ps"
          ? { shell: "powershell", text: s.script }
          : renderStep(s, { sudo: !isRoot, installPath });
      await log.writeLine(
        `\n$ ${renderStep(s, { sudo: !isRoot, installPath, brief: true })}\n`,
      );
      let r;
      try {
        r = await runScript(transport, text, logger);
      } catch (err) {
        // A timeout or transport failure ends the run, but the record of
        // what already ran is still written.
        const msg = err instanceof Error ? err.message : String(err);
        await log.writeLine(`${msg}\n`);
        record.failedStep = `${s.why}: ${msg}`;
        lastFailureOutput = msg;
        return false;
      }
      if (r.stdout.trim()) await log.writeLine(`${r.stdout.trim()}\n`);
      if (r.stderr) await log.writeLine(`${r.stderr}\n`);
      if (r.exitCode !== 0) {
        lastFailureOutput = `${r.stdout}\n${r.stderr}`;
        if (
          !isRoot && !passwordRefused && SUDO_PASSWORD.test(lastFailureOutput)
        ) passwordRefused = s;
        record.failedStep = `${s.why} (exit ${r.exitCode}): ${
          r.stderr.split("\n").slice(-1)[0] ?? ""
        }`;
        return false;
      }
      stepsRan++;
      return true;
    };
    let ok = true;
    // The upgrade is best effort: a broken third-party repo must not stop the
    // distrust step, which on hosts without a fixed package is the whole fix.
    // Every upgrade step is tried, so a failed index refresh still lets the
    // install use the lists already cached.
    let upgradeFailure: string | undefined;
    for (const s of plan.upgrade) {
      if (await exec(s)) continue;
      // A held lock or a timed-out step means the package manager may still
      // be rewriting the store; distrusting now could race it.
      if (
        BUSY_PACKAGE_MANAGER.test(`${record.failedStep}\n${lastFailureOutput}`)
      ) {
        ok = false;
        record.failedStep =
          `${record.failedStep}. The package manager may still be changing the CA store, so the distrust step was not run; rerun mitigate once it is idle`;
        break;
      }
      upgradeFailure = upgradeFailure
        ? `${upgradeFailure}; ${record.failedStep}`
        : record.failedStep;
      record.failedStep = undefined;
      await log.writeLine("Upgrade step failed; continuing.\n");
    }
    const rescan = async (when: string) => {
      try {
        return await probeHost(transport, host, g, log, logger);
      } catch (e) {
        ok = false;
        // Keep the step failure that came first; add the rescan's to it.
        const msg = `rescan ${when} failed: ${
          e instanceof Error ? e.message : String(e)
        }`;
        record.failedStep = record.failedStep
          ? `${record.failedStep}; then ${msg}`
          : msg;
        return undefined;
      }
    };
    if (ok && plan.distrust.length > 0 && plan.upgrade.length === 0) {
      // Nothing ran that could have changed the store: no rescan to re-plan.
      for (const s of plan.distrust) {
        if (!(ok = await exec(s))) break;
      }
    } else if (ok && plan.distrust.length > 0) {
      // Reading the conf or re-checking sudo can hit a dropped connection or
      // the timeout after the host was changed; record that and carry on to
      // the final rescan, so the record is still written.
      try {
        const mid = await rescan("after the upgrade");
        if (mid && mid.status.osStore.verdict === "trusted") {
          // The upgrade may have rewritten ca-certificates.conf, so plan the
          // distrust steps again from the current file.
          const fresh = planMitigation(mid.status, mid.probe, {
            transport: transport.kind,
            conf: mid.status.os.storeFamily === "debian-conf"
              ? await readConf(transport, logger)
              : undefined,
          });
          record.steps = [...plan.upgrade, ...fresh.distrust, ...plan.after]
            .map(
              rendered,
            );
          for (const m of fresh.manual) {
            if (!record.manual.includes(m)) record.manual.push(m);
          }
          // The re-planned steps can differ (a new root to block), so check sudo
          // for any new commands before running them.
          const distrustCommands = fresh.distrustCommands.filter((argv) =>
            !allowed.has(key(argv))
          );
          const refusedNow = isRoot || distrustCommands.length === 0
            ? []
            : refusedCommands(
              distrustCommands,
              (await runScript(
                transport,
                sudoCheckCommand(distrustCommands),
                logger,
              )).stdout.split("\n"),
            );
          if (refusedNow.length > 0) {
            ok = false;
            record.missingPrivilege = refusedNow.map((argv) =>
              argv.map(shQuote).join(" ")
            );
            record.failedStep =
              `sudo refuses the re-planned distrust step(s): ${
                record.missingPrivilege.join("; ")
              }`;
          } else {
            for (const s of fresh.distrust) {
              if (!(ok = await exec(s))) break;
            }
          }
        } else if (mid && mid.status.osStore.verdict === "unknown") {
          await log.writeLine(
            "Store verdict is unknown after the upgrade (no readable bundle or openssl); distrust not applied.\n",
          );
          record.steps = [...plan.upgrade, ...plan.after].map(rendered);
        } else if (mid) {
          await log.writeLine(
            "Store no longer trusts the intermediates after the upgrade; skipping distrust.\n",
          );
          record.steps = [...plan.upgrade, ...plan.after].map(rendered);
        } else {
          record.steps = plan.upgrade.map(rendered);
        }
      } catch (e) {
        ok = false;
        record.failedStep = `re-planning the distrust step failed: ${
          e instanceof Error ? e.message : String(e)
        }`;
        record.steps = plan.upgrade.map(rendered);
      }
    }

    if (ok) {
      for (const s of plan.after) {
        if (await exec(s)) continue;
        if (s.kind === "run" && s.bestEffort) {
          record.notes.push(`${record.failedStep}; the run continued.`);
          record.failedStep = undefined;
          continue;
        }
        ok = false;
        break;
      }
    }
    await log.writeLine(`\nRescanning ${host}...\n`);
    const okBeforeRescan = ok;
    const final = await rescan("after mitigation");
    if (final) finalStatus = final.status;
    if (!okBeforeRescan || !final) ok = false;
    const agentsLeft = finalStatus.components.filter((c) =>
      c.kind === "agent" && c.status === "exposed"
    );
    // A plan that only upgraded agents (the store was not trusted, or could
    // not be judged) succeeds on the agents alone.
    // Code-signing copies count where the platform verifier judged them.
    const csTargeted = status.osStore.codeSigningTrusted === "trusted" &&
      (status.os.storeFamily === "macos" || windows);
    const storeTargeted = record.before.verdict === "trusted" || csTargeted;
    record.succeeded = ok && agentsLeft.length === 0 &&
      (!storeTargeted ||
        (finalStatus.osStore.verdict === "not-trusted" &&
          (!csTargeted ||
            finalStatus.osStore.codeSigningTrusted === "not-trusted")));
    if (upgradeFailure) {
      record.notes.push(
        `The package upgrade failed: ${upgradeFailure.replace(/\.+$/, "")}.${
          record.succeeded
            ? " The store was fixed by distrusting the root; upgrade ca-certificates once the package source is fixed."
            : ""
        }`,
      );
      if (!record.succeeded && !record.failedStep) {
        record.failedStep = upgradeFailure;
      }
    }
    const refusedCmd = passwordRefused
      ? renderStep(passwordRefused, { sudo: false, installPath, brief: true })
      : "";
    if (passwordRefused && stepsRan === 0) {
      // Nothing ran, so this is the needs-privilege outcome, found late.
      record.action = "needs-privilege";
      record.applied = false;
      record.missingPrivilege = [refusedCmd];
    }
    record.summary = passwordRefused && stepsRan === 0
      ? `Needs privilege: sudo asked for a password for ${refusedCmd} on ${host}, so nothing was changed. Run the mitigation-script file artifact with sudo, or allow passwordless sudo for exactly the planned commands (see the README).`
      : passwordRefused
      ? `Mitigation stopped on ${host}: sudo asked for a password for ${refusedCmd} after ${stepsRan} step(s) had run. Run the mitigation-script file artifact with sudo to finish; it is safe to run again.`
      : !ok
      ? `Mitigation stopped on ${host}: ${record.failedStep}`
      : record.succeeded && !storeTargeted
      ? `Upgraded the agents on ${host}; the OS store was not changed (verdict ${finalStatus.osStore.verdict}${
        finalStatus.osStore.verdict === "unknown" ? ", see unreadable" : ""
      }).${record.restart.length > 0 ? " Restart the listed processes." : ""}`
      : record.succeeded
      ? `Mitigated ${host}: OS store ${record.before.verdict} -> ${finalStatus.osStore.verdict}${
        csTargeted
          ? `, code signing trusted -> ${finalStatus.osStore.codeSigningTrusted}`
          : ""
      }.${upgradeFailure ? " The package upgrade failed; see notes." : ""}${
        record.restart.length > 0 ? " Restart the listed processes." : ""
      }`
      : upgradeFailure && finalStatus.osStore.verdict === "trusted"
      ? `Mitigation incomplete on ${host}: ${upgradeFailure}; the store still trusts the intermediates.`
      : agentsLeft.length > 0
      ? `Steps ran on ${host} but ${
        agentsLeft.map((a) => `${a.name} ${a.version}`).join(", ")
      } is still below the fixed version; see the log.`
      : finalStatus.osStore.verdict === "unknown" && finalStatus.osStore.bundle
      ? `Steps ran on ${host} and ${DISTRUST_ANCHOR.name} is no longer in the bundle, but openssl is not installed, so the chains could not be verified. Install openssl and rescan to confirm.`
      : `Steps ran on ${host} but the store verdict is ${finalStatus.osStore.verdict}, not not-trusted; see the log.`;
  }
  await log.writeLine(`\n${record.summary}\n`);
  files.push(await log.finalize());
  return { status: finalStatus, mitigation: record, files };
}

export const model = {
  type: "@swamp/cve/emudhra",
  version: "2026.10.22.1",
  upgrades: [
    {
      toVersion: "2026.10.22.1",
      description:
        "Adds macOS and Windows targets and the targetOs global argument (default auto). Existing arguments are unchanged. The scanFleet and mitigate summary logs are renamed fleet-summary and mitigate-summary, and hosts with characters outside A-Z, a-z, 0-9, '.', '_' and '-' (IPv6 addresses) get data names with those replaced by '-'.",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  reports: [
    "@swamp/cve/emudhra-report",
  ],
  resources: {
    status: {
      description:
        "Trust assessment for the eMudhra intermediate CA compromise (public 2026-10-20)",
      schema: HostStatusSchema,
      lifetime: "infinite",
      garbageCollection: 20,
    },
  },
  files: {
    log: {
      description: "Scan and mitigation log",
      contentType: "text/plain",
      lifetime: "7d",
      garbageCollection: 5,
      streaming: true,
    },
    mitigationScript: {
      description:
        "Self-contained sh script with the host's mitigation steps, to review and run with sudo",
      contentType: "text/plain",
      lifetime: "30d",
      garbageCollection: 10,
    },
  },
  methods: {
    scan: {
      description:
        "Scan a single host or container for trust in the compromised eMudhra intermediates",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: MethodContext) => {
        const g = context.globalArgs;
        const logger = context.logger;

        let autoContainer: string | undefined;
        if (present(g.dockerImage) && !present(g.dockerContainer)) {
          autoContainer = await startDockerImage(g.dockerImage!, logger);
        }

        try {
          // The auto-started container is this run's alone: a copy, never
          // written back into the shared global arguments.
          const transport = buildTransport(
            autoContainer ? { ...g, dockerContainer: autoContainer } : g,
          );
          const label = autoContainer
            ? imageLabel(g.dockerImage!)
            : targetLabel(g);
          const log = context.createFileWriter("log", `${label}-log`);
          await log.writeLine(
            `[${new Date().toISOString()}] eMudhra CA compromise scan\n`,
          );
          await log.writeLine(`Target: ${label}\n\n`);
          const { status } = await withTargetLog(
            log,
            () => scanTarget(transport, label, g, log, logger),
          );
          const logHandle = await log.finalize();
          const handle = await context.writeResource("status", label, status);
          return { dataHandles: [handle, logHandle] };
        } finally {
          if (autoContainer) await stopContainer(autoContainer, logger);
        }
      },
    },

    scanFleet: {
      description:
        "Scan multiple hosts in parallel over SSH with a shared user and key. Pass a comma-separated list.",
      arguments: z.object({
        hosts: z
          .string()
          .describe("Comma-separated list of host IPs or hostnames to scan"),
      }),
      execute: async (args: { hosts: string }, context: MethodContext) => {
        const g = context.globalArgs;
        const logger = context.logger;
        const hosts = splitList(args.hosts);
        assertDistinctDataNames(hosts);
        // No per-host log ends in -summary, so no host name collides.
        const summaryLog = context.createFileWriter("log", "fleet-summary");
        await summaryLog.writeLine(
          `[${
            new Date().toISOString()
          }] eMudhra fleet scan: ${hosts.length} host(s)\n\n`,
        );

        const settled = await settledPool(
          hosts,
          FLEET_CONCURRENCY,
          async (host: string) => {
            const transport = buildTransport({
              targetHost: host,
              sshUser: g.sshUser,
              sshKey: present(g.sshKey),
              targetOs: g.targetOs,
              listed: true,
            });
            const hostLog = context.createFileWriter(
              "log",
              `${dataName(host)}-log`,
            );
            const { status } = await withTargetLog(
              hostLog,
              () => scanTarget(transport, host, g, hostLog, logger),
            );
            const logHandle = await hostLog.finalize();
            return { host, status, logHandle };
          },
        );

        const handles = [];
        let exposed = 0;
        let unchecked = 0;
        let errors = 0;
        for (const [i, outcome] of settled.entries()) {
          if (outcome.status === "fulfilled") {
            const { host, status, logHandle } = outcome.value;
            if (status.exposed) exposed++;
            else if (status.riskLevel !== "none") unchecked++;
            handles.push(
              await context.writeResource("status", dataName(host), status),
            );
            handles.push(logHandle);
            await summaryLog.writeLine(
              `${host}: ${status.riskLevel.toUpperCase()} — ${status.summary}\n`,
            );
          } else {
            errors++;
            const errMsg = outcome.reason instanceof Error
              ? outcome.reason.message
              : String(outcome.reason);
            await summaryLog.writeLine(`${hosts[i]}: ERROR — ${errMsg}\n`);
            handles.push(...failureLog(outcome.reason));
          }
        }
        await summaryLog.writeLine(
          `\nFLEET SUMMARY: ${hosts.length} scanned, ${exposed} exposed, ${
            hosts.length - exposed - unchecked - errors
          } clean, ${unchecked} not fully checked, ${errors} errors\n`,
        );
        handles.push(await summaryLog.finalize());
        if (hosts.length > 0 && errors === hosts.length) {
          throw new Error(
            `scanFleet could not scan any of ${hosts.length} host(s); see the fleet log`,
          );
        }
        return { dataHandles: handles };
      },
    },

    mitigate: {
      description:
        "Scan, then fix the OS trust store (upgrade ca-certificates, or distrust the compromised roots) and upgrade affected agents. Uses root or passwordless sudo per binary; otherwise reports needs-privilege with a script to run by hand.",
      arguments: z.object({
        dryRun: z
          .boolean()
          .default(true)
          .describe("If true, only plan and print the commands"),
        hosts: z
          .string()
          .optional()
          .describe(
            "Comma-separated list of SSH hosts to mitigate (overrides targetHost)",
          ),
      }),
      execute: async (
        args: { dryRun: boolean; hosts?: string },
        context: MethodContext,
      ) => {
        const g = context.globalArgs;
        const logger = context.logger;

        let autoContainer: string | undefined;
        if (
          !present(args.hosts) && present(g.dockerImage) &&
          !present(g.dockerContainer)
        ) {
          autoContainer = await startDockerImage(g.dockerImage!, logger);
        }

        if (present(args.hosts) && splitList(args.hosts).length === 0) {
          throw new Error("hosts lists no targets");
        }
        if (present(args.hosts)) assertDistinctDataNames(splitList(args.hosts));
        // Transports are built per target inside allSettled, so one invalid
        // host fails alone, as in scanFleet.
        const targets: { host: string; transport: () => Transport }[] =
          present(args.hosts)
            ? splitList(args.hosts).map((host) => ({
              host,
              transport: () =>
                buildTransport({
                  targetHost: host,
                  sshUser: g.sshUser,
                  sshKey: present(g.sshKey),
                  targetOs: g.targetOs,
                  listed: true,
                  strictHostKeys: true,
                }),
            }))
            : [{
              host: autoContainer ? imageLabel(g.dockerImage!) : targetLabel(g),
              // The auto-started container is a copy, as in scan.
              transport: () =>
                buildTransport({
                  ...g,
                  ...(autoContainer ? { dockerContainer: autoContainer } : {}),
                  strictHostKeys: true,
                }),
            }];

        try {
          const settled = await settledPool(
            targets,
            FLEET_CONCURRENCY,
            async (t) =>
              await mitigateTarget(
                t.transport(),
                t.host,
                g,
                args.dryRun,
                context,
              ),
          );
          // One line per target, so a host that failed outright is still
          // on record.
          const runLog = context.createFileWriter("log", "mitigate-summary");
          const handles = [];
          for (const [i, outcome] of settled.entries()) {
            if (outcome.status === "fulfilled") {
              const { status, mitigation, files } = outcome.value;
              await runLog.writeLine(
                `${targets[i].host}: ${mitigation.summary}\n`,
              );
              handles.push(
                await context.writeResource(
                  "status",
                  dataName(targets[i].host),
                  {
                    ...status,
                    mitigation,
                  },
                ),
                ...files,
              );
            } else {
              const errMsg = outcome.reason instanceof Error
                ? outcome.reason.message
                : String(outcome.reason);
              logger.info(`${targets[i].host}: ERROR — ${errMsg}`);
              await runLog.writeLine(`${targets[i].host}: ERROR — ${errMsg}\n`);
              handles.push(...failureLog(outcome.reason));
            }
          }
          const runLogHandle = await runLog.finalize();
          if (!settled.some((o) => o.status === "fulfilled")) {
            throw new Error(
              `mitigate failed on every target: ${
                settled.map((o) =>
                  o.status === "rejected"
                    ? (o.reason instanceof Error
                      ? o.reason.message
                      : String(o.reason))
                    : ""
                ).join("; ")
              }`,
            );
          }
          return { dataHandles: [...handles, runLogHandle] };
        } finally {
          if (autoContainer) await stopContainer(autoContainer, logger);
        }
      },
    },
  },
};
