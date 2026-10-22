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
 * eMudhra CA compromise scanner — finds Linux hosts and containers whose TLS
 * trust still accepts the eight eMudhra intermediates whose keys were found
 * to be recoverable (reported 2026-10-17, public 2026-10-20), and fixes the
 * OS store where it can. Runs over local, SSH, or
 * Docker transports.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
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
    storeFamily: z.enum(["debian-conf", "p11-kit", "alpine", "arch", "other"]),
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
  }),
  components: z.array(z.object({
    kind: z.enum(["runtime", "agent", "java", "certifi", "cargo", "hex"]),
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
    privilege: z.enum(["root", "sudo", "none"]),
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

type Transport =
  | { kind: "local" }
  | { kind: "ssh"; args: string[] }
  | { kind: "docker"; container: string };

function present(val: string | undefined): string | undefined {
  return val && val.length > 0 ? val : undefined;
}

function buildTransport(g: {
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
  if (
    g.targetHost === "localhost" || g.targetHost === "127.0.0.1" ||
    g.targetHost === "::1"
  ) {
    return { kind: "local" };
  }
  assertSafeSshTarget(g.sshUser, g.targetHost);
  // BatchMode stops ssh falling back to a password prompt nobody can see;
  // the keepalives drop a connection whose host stops answering.
  const args = [
    "-o",
    "BatchMode=yes",
    "-o",
    "StrictHostKeyChecking=accept-new",
    "-o",
    "ConnectTimeout=10",
    "-o",
    "ServerAliveInterval=15",
    "-o",
    "ServerAliveCountMax=4",
  ];
  if (present(g.sshKey)) args.push("-i", g.sshKey!);
  args.push("--", `${g.sshUser}@${g.targetHost}`);
  return { kind: "ssh", args };
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
    return `docker-${container.replace(/[^A-Za-z0-9._-]+/g, "-")}`;
  }
  return g.targetHost;
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
 * Run a POSIX sh script on the target, passing it on stdin so neither its size
 * nor its quoting depends on the transport.
 */
async function runScript(
  transport: Transport,
  script: string,
  logger: Logger,
  timeoutMs = SCRIPT_TIMEOUT_MS,
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  let cmd: string[];
  switch (transport.kind) {
    case "docker":
      cmd = ["docker", "exec", "-i", transport.container, "sh", "-s"];
      break;
    case "ssh":
      // Windows OpenSSH stalls on the pipes Deno gives it: it stops copying
      // the probe's output partway and never exits. Fail fast instead.
      if (Deno.build.os === "windows") {
        throw new Error(
          "SSH targets are not supported when swamp runs on Windows yet: Windows OpenSSH stalls partway through the probe. Run the scan from a Linux or macOS machine, or scan a container with dockerContainer or dockerImage.",
        );
      }
      cmd = ["ssh", ...transport.args, "sh -s"];
      break;
    default:
      // The probe is a POSIX sh script for Linux trust stores.
      if (Deno.build.os === "windows") {
        throw new Error(
          "scanning localhost is not supported on Windows: this extension checks Linux trust stores. Scan a Linux host from a Linux or macOS machine, or scan a container with dockerContainer or dockerImage.",
        );
      }
      cmd = ["sh", "-s"];
  }

  logger.debug(`Running script (${script.length} bytes) via ${cmd.join(" ")}`);
  const timeout = AbortSignal.timeout(timeoutMs);
  const proc = new Deno.Command(cmd[0], {
    args: cmd.slice(1),
    stdin: "piped",
    stdout: "piped",
    stderr: "piped",
    signal: timeout,
  }).spawn();
  // Collect output while the script is written, so a transport that exits
  // early (refused connection, rejected key) reports its own error rather
  // than a broken pipe.
  const outputPromise = proc.output();
  // Wrapping the script in a function makes sh read all of it before running
  // anything, so no command it starts can consume the rest of the script.
  const wrapped = wrapScript(script);
  const writer = proc.stdin.getWriter();
  let writeError: unknown;
  try {
    await writer.write(new TextEncoder().encode(wrapped));
    await writer.close();
  } catch (err) {
    writeError = err;
  }
  const output = await outputPromise;
  const stderr = new TextDecoder().decode(output.stderr).trim();
  if (timeout.aborted) {
    throw new Error(
      `${cmd[0]} did not finish within ${
        timeoutMs / 60000
      } minutes and was stopped${stderr ? `: ${stderr}` : ""}`,
    );
  }
  if (writeError !== undefined && output.code === 0) {
    throw writeError instanceof Error
      ? writeError
      : new Error(String(writeError));
  }
  return {
    stdout: new TextDecoder().decode(output.stdout),
    stderr,
    exitCode: output.code,
  };
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
  const proc = new Deno.Command("docker", {
    args: ["stop", containerId],
    stdout: "piped",
    stderr: "piped",
  });
  await proc.output();
  logger.info(`Stopped container ${containerId.slice(0, 12)}`);
}

async function probeHost(
  transport: Transport,
  host: string,
  g: { searchPaths: string; liveCheck: boolean },
  log: { writeLine: (msg: string) => Promise<void> },
  logger: Logger,
): Promise<{ probe: ProbeData; status: HostStatus }> {
  const script = buildProbeScript({
    searchPaths: splitList(g.searchPaths),
    liveCheck: g.liveCheck,
  });
  const result = await runScript(transport, script, logger);
  if (!result.stdout.includes("@@ os-release")) {
    const errMsg = result.stderr ||
      `exit code ${result.exitCode} after ${
        JSON.stringify(result.stdout.trim().split("\n").slice(-1)[0] ?? "")
      } (a container that cannot fork processes fails this way)`;
    throw new Error(`Cannot execute commands on ${host}: ${errMsg}`);
  }
  const probe = parseProbe(result.stdout);
  const status = assessHost(probe, host);
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
  const log = context.createFileWriter("log", `${host}-log`);
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
  const isRoot = probe.uid === 0;
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
    privilege: isRoot ? "root" : "none",
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
  if (plan.action === "apply" && !isRoot) {
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
  if (record.action === "apply" || record.action === "needs-privilege") {
    const script = context.createFileWriter(
      "mitigationScript",
      `${host}-mitigation-script`,
    );
    files.push(
      await script.writeText(
        renderMitigationScript(
          host,
          plan,
          installPath,
          rootsToDistrust(status),
        ),
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
  if (record.action === "needs-privilege") {
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
      const text = renderStep(s, { sudo: !isRoot, installPath });
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
    if (ok && plan.distrust.length > 0) {
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
    record.succeeded = ok && finalStatus.osStore.verdict === "not-trusted" &&
      agentsLeft.length === 0;
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
      : record.succeeded
      ? `Mitigated ${host}: OS store ${record.before.verdict} -> ${finalStatus.osStore.verdict}.${
        upgradeFailure ? " The package upgrade failed; see notes." : ""
      }${record.restart.length > 0 ? " Restart the listed processes." : ""}`
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
  version: "2026.10.21.1",
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
          g.dockerContainer = autoContainer;
        }

        try {
          const transport = buildTransport(g);
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
        const summaryLog = context.createFileWriter("log", "fleet-log");
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
            });
            const hostLog = context.createFileWriter("log", `${host}-log`);
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
            handles.push(await context.writeResource("status", host, status));
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
          g.dockerContainer = autoContainer;
        }

        if (present(args.hosts) && splitList(args.hosts).length === 0) {
          throw new Error("hosts lists no targets");
        }
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
                }),
            }))
            : [{
              host: autoContainer ? imageLabel(g.dockerImage!) : targetLabel(g),
              transport: () => buildTransport(g),
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
          const runLog = context.createFileWriter("log", "mitigate-log");
          const handles = [];
          for (const [i, outcome] of settled.entries()) {
            if (outcome.status === "fulfilled") {
              const { status, mitigation, files } = outcome.value;
              await runLog.writeLine(
                `${targets[i].host}: ${mitigation.summary}\n`,
              );
              handles.push(
                await context.writeResource("status", targets[i].host, {
                  ...status,
                  mitigation,
                }),
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
