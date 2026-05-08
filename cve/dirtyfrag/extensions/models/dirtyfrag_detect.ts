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
 * Swamp datastore backend that stores repository state in Google Cloud Storage.
 *
 * Provides distributed locking via GCS generation-based preconditions and
 * bidirectional sync between a local cache directory and a GCS bucket. Use
 * this entrypoint when a swamp deployment should share state between multiple
 * processes or machines through GCS rather than a local directory.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";

type FileWriter = {
  writeLine: (line: string) => Promise<void>;
  finalize: () => Promise<void>;
};

type MethodContext = {
  globalArgs: z.infer<typeof GlobalArgsSchema>;
  logger: { info: (msg: string) => void; debug: (msg: string) => void };
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
  suBinaryPath: z
    .string()
    .default("/usr/bin/su")
    .describe("Path to the su binary to check for page cache corruption"),
});

const InputsSchema = z.object({
  targetHost: z.string().optional().describe("SSH host to scan"),
  sshUser: z.string().optional().describe("SSH user for remote hosts"),
  sshKey: z.string().optional().describe("Path to SSH private key"),
  dockerContainer: z.string().optional().describe(
    "Docker container name or ID",
  ),
  dockerImage: z.string().optional().describe("Docker image to auto-start"),
  suBinaryPath: z.string().optional().describe("Path to su binary"),
});

const VulnStatusSchema = z.object({
  scanTimestamp: z.string(),
  hostname: z.string(),
  kernelVersion: z.string(),
  vulnerable: z.boolean(),
  riskLevel: z.enum(["critical", "high", "medium", "low", "none"]),
  summary: z.string(),
  cve202643284: z.object({
    name: z.string(),
    description: z.string(),
    affected: z.boolean(),
    patched: z.boolean(),
    modulesLoaded: z.array(z.string()),
    modulesAvailable: z.array(z.string()),
    userNamespacesEnabled: z.boolean(),
  }),
  cve202643500: z.object({
    name: z.string(),
    description: z.string(),
    affected: z.boolean(),
    patched: z.boolean(),
    modulesLoaded: z.array(z.string()),
    modulesAvailable: z.array(z.string()),
  }),
  mitigations: z.object({
    espModulesBlacklisted: z.boolean(),
    rxrpcModuleBlacklisted: z.boolean(),
    userNamespacesRestricted: z.boolean(),
    modprobeBlacklist: z.array(z.string()),
  }),
  indicators: z.object({
    suPageCacheCorrupted: z.boolean(),
    passwdPageCacheCorrupted: z.boolean(),
    suspiciousXfrmSAs: z.boolean(),
    rxrpcKeysFound: z.boolean(),
    details: z.array(z.string()),
  }),
  recommendations: z.array(z.string()),
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
    return { kind: "docker", container };
  }
  if (g.targetHost === "localhost" || g.targetHost === "127.0.0.1") {
    return { kind: "local" };
  }
  const args = ["-o", "StrictHostKeyChecking=no", "-o", "ConnectTimeout=10"];
  if (present(g.sshKey)) args.push("-i", g.sshKey!);
  args.push(`${g.sshUser}@${g.targetHost}`);
  return { kind: "ssh", args };
}

function targetLabel(g: {
  targetHost: string;
  dockerContainer?: string;
}): string {
  const container = present(g.dockerContainer);
  if (container) {
    return `docker-${container.slice(0, 12)}`;
  }
  return g.targetHost;
}

async function checkConnectivity(
  host: string,
  port: number,
  logger: { info: (msg: string) => void },
): Promise<void> {
  const proc = new Deno.Command("bash", {
    args: [
      "-c",
      `nc -z -w 5 ${host} ${port} 2>/dev/null || (echo >/dev/tcp/${host}/${port}) 2>/dev/null`,
    ],
    stdout: "piped",
    stderr: "piped",
  });
  const output = await proc.output();
  if (output.code !== 0) {
    throw new Error(
      `Cannot reach ${host}:${port} — host may be down, port closed, or blocked by a security group. Check your network/firewall settings.`,
    );
  }
  logger.info(`TCP connection to ${host}:${port} succeeded`);
}

async function runCmd(
  transport: Transport,
  command: string,
  logger: { debug: (msg: string) => void },
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  let cmd: string[];
  switch (transport.kind) {
    case "docker":
      cmd = ["docker", "exec", transport.container, "bash", "-c", command];
      break;
    case "ssh":
      cmd = ["ssh", ...transport.args, command];
      break;
    default:
      cmd = ["bash", "-c", command];
  }

  logger.debug(`Running: ${cmd.join(" ")}`);
  const proc = new Deno.Command(cmd[0], {
    args: cmd.slice(1),
    stdout: "piped",
    stderr: "piped",
  });

  const output = await proc.output();
  return {
    stdout: new TextDecoder().decode(output.stdout).trim(),
    stderr: new TextDecoder().decode(output.stderr).trim(),
    exitCode: output.code,
  };
}

async function startDockerImage(
  image: string,
  logger: { info: (msg: string) => void },
): Promise<string> {
  const proc = new Deno.Command("docker", {
    args: ["run", "-d", "--rm", "--privileged", image, "sleep", "3600"],
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

async function scanHost(
  transport: Transport,
  host: string,
  suBinaryPath: string,
  log: { writeLine: (msg: string) => Promise<void> },
  logger: { info: (msg: string) => void; debug: (msg: string) => void },
) {
  // Network connectivity check for remote hosts
  if (transport.kind === "ssh") {
    await log.writeLine(`Checking TCP connectivity to ${host}:22...\n`);
    await checkConnectivity(host, 22, logger);
    await log.writeLine(`TCP connection OK\n\n`);
  }

  const kernelResult = await runCmd(transport, "uname -r", logger);
  if (kernelResult.exitCode !== 0 || kernelResult.stdout.length === 0) {
    const errMsg = kernelResult.stderr || "No output from uname -r";
    throw new Error(`Cannot execute commands on ${host}: ${errMsg}`);
  }
  const kernelVersion = kernelResult.stdout;

  const hostnameResult = await runCmd(transport, "hostname", logger);
  const hostname = hostnameResult.stdout || host;

  await log.writeLine(`Host: ${hostname}\n`);
  await log.writeLine(`Kernel: ${kernelVersion}\n`);

  // Module analysis
  await log.writeLine("\n=== Module Analysis ===\n");
  const lsmodResult = await runCmd(
    transport,
    "cat /proc/modules 2>/dev/null || echo ''",
    logger,
  );
  const loadedModules = lsmodResult.stdout;

  const espModulesLoaded: string[] = [];
  const rxrpcModulesLoaded: string[] = [];
  for (const mod of ["esp4", "esp6"]) {
    if (new RegExp(`^${mod}\\s`, "m").test(loadedModules)) {
      espModulesLoaded.push(mod);
    }
  }
  if (/^rxrpc\s/m.test(loadedModules)) {
    rxrpcModulesLoaded.push("rxrpc");
  }

  for (const mod of ["esp4", "esp6"]) {
    if (!espModulesLoaded.includes(mod)) {
      const r = await runCmd(
        transport,
        `test -d /sys/module/${mod} && echo LOADED || echo NO`,
        logger,
      );
      if (r.stdout === "LOADED") espModulesLoaded.push(mod);
    }
  }
  if (rxrpcModulesLoaded.length === 0) {
    const r = await runCmd(
      transport,
      "test -d /sys/module/rxrpc && echo LOADED || echo NO",
      logger,
    );
    if (r.stdout === "LOADED") rxrpcModulesLoaded.push("rxrpc");
  }

  await log.writeLine(
    `ESP modules loaded: ${
      espModulesLoaded.length > 0 ? espModulesLoaded.join(", ") : "none"
    }\n`,
  );
  await log.writeLine(
    `RxRPC modules loaded: ${
      rxrpcModulesLoaded.length > 0 ? rxrpcModulesLoaded.join(", ") : "none"
    }\n`,
  );

  const espModulesAvailable: string[] = [];
  const rxrpcModulesAvailable: string[] = [];

  for (const mod of ["esp4", "esp6"]) {
    const r = await runCmd(
      transport,
      `find /lib/modules/$(uname -r) -name '${mod}.ko*' 2>/dev/null | head -1`,
      logger,
    );
    if (r.stdout.length > 0) espModulesAvailable.push(mod);
  }
  const rxrpcFind = await runCmd(
    transport,
    "find /lib/modules/$(uname -r) -name 'rxrpc.ko*' 2>/dev/null | head -1",
    logger,
  );
  if (rxrpcFind.stdout.length > 0) rxrpcModulesAvailable.push("rxrpc");

  const builtinResult = await runCmd(
    transport,
    "grep -c rxrpc /lib/modules/$(uname -r)/modules.builtin 2>/dev/null || echo 0",
    logger,
  );
  if (parseInt(builtinResult.stdout) > 0) {
    rxrpcModulesAvailable.push("rxrpc (built-in)");
    await log.writeLine("rxrpc is built-in to the kernel\n");
  }

  // Namespace check
  await log.writeLine("\n=== Namespace Check ===\n");
  const unshareSysctl = await runCmd(
    transport,
    "cat /proc/sys/kernel/unprivileged_userns_clone 2>/dev/null || echo 'not_found'",
    logger,
  );
  const appArmorNs = await runCmd(
    transport,
    "cat /proc/sys/kernel/apparmor_restrict_unprivileged_userns 2>/dev/null || echo 'not_found'",
    logger,
  );

  let userNamespacesEnabled = true;
  if (unshareSysctl.stdout === "0") {
    userNamespacesEnabled = false;
    await log.writeLine(
      "Unprivileged user namespaces are disabled via sysctl\n",
    );
  } else if (appArmorNs.stdout === "1") {
    userNamespacesEnabled = false;
    await log.writeLine("AppArmor restricts unprivileged user namespaces\n");
  } else {
    await log.writeLine("Unprivileged user namespaces appear to be enabled\n");
  }

  // Mitigation check
  await log.writeLine("\n=== Mitigation Check ===\n");
  const blacklistResult = await runCmd(
    transport,
    "grep -rh 'install.*esp4\\|install.*esp6\\|install.*rxrpc\\|blacklist.*esp4\\|blacklist.*esp6\\|blacklist.*rxrpc' /etc/modprobe.d/ 2>/dev/null || echo ''",
    logger,
  );
  const blacklistLines = blacklistResult.stdout
    .split("\n")
    .filter((l) => l.length > 0);

  const espBlacklisted = blacklistLines.some((l) => /esp4/.test(l)) &&
    blacklistLines.some((l) => /esp6/.test(l));
  const rxrpcBlacklisted = blacklistLines.some((l) => /rxrpc/.test(l));

  await log.writeLine(`ESP modules blacklisted: ${espBlacklisted}\n`);
  await log.writeLine(`RxRPC module blacklisted: ${rxrpcBlacklisted}\n`);

  // Patch detection
  await log.writeLine("\n=== Patch Detection ===\n");
  const patchCheckEsp = await runCmd(
    transport,
    "grep -c 'skb_has_shared_frag' /proc/kallsyms 2>/dev/null || echo 'unknown'",
    logger,
  );
  const espPatched = parseInt(patchCheckEsp.stdout) > 0;
  await log.writeLine(
    `ESP patch heuristic (skb_has_shared_frag in kallsyms): ${
      espPatched ? "likely patched" : "not detected"
    }\n`,
  );

  const rxrpcPatched = false;
  await log.writeLine(
    "RxRPC patch: NO upstream patch available as of 2026-05-08\n",
  );

  // Indicator of compromise check
  await log.writeLine("\n=== Indicator of Compromise Check ===\n");
  const indicators: string[] = [];

  const passwdCheck = await runCmd(transport, "head -1 /etc/passwd", logger);
  const passwdCorrupted = /^root::/.test(passwdCheck.stdout);
  if (passwdCorrupted) {
    indicators.push(
      "CRITICAL: /etc/passwd root entry has empty password field (root::) — likely RxRPC variant exploitation",
    );
    await log.writeLine("!!! /etc/passwd has empty root password field !!!\n");
  } else {
    await log.writeLine("/etc/passwd root entry appears normal\n");
  }

  const suCheck = await runCmd(
    transport,
    `od -A n -t x1 -N 192 ${suBinaryPath} 2>/dev/null | tr -d ' \\n'`,
    logger,
  );
  const suHex = suCheck.stdout;
  const shellcodeSignature = "31ff31f631c0b06a";
  const suCorrupted = suHex.includes(shellcodeSignature);
  if (suCorrupted) {
    indicators.push(
      `CRITICAL: ${suBinaryPath} page cache contains dirtyfrag shellcode signature at offset 0x78`,
    );
    await log.writeLine(
      `!!! ${suBinaryPath} contains exploit shellcode signature !!!\n`,
    );
  } else {
    await log.writeLine(`${suBinaryPath} page cache appears clean\n`);
  }

  const xfrmCheck = await runCmd(
    transport,
    "(ip xfrm state list 2>/dev/null || cat /proc/net/xfrm_stat 2>/dev/null || echo '') | grep -ci 'deadbe1\\|error' || echo 0",
    logger,
  );
  const suspiciousXfrm = parseInt(xfrmCheck.stdout) > 2;
  if (suspiciousXfrm) {
    indicators.push(
      "WARNING: XFRM Security Associations with sequential SPIs matching dirtyfrag pattern (0xDEADBE1x) detected",
    );
    await log.writeLine(
      "!!! Suspicious XFRM SAs with dirtyfrag SPI pattern found !!!\n",
    );
  }

  const keyCheck = await runCmd(
    transport,
    "cat /proc/keys 2>/dev/null | grep -c 'rxrpc' || echo 0",
    logger,
  );
  const rxrpcKeysFound = parseInt(keyCheck.stdout) > 0;
  if (rxrpcKeysFound) {
    indicators.push(
      "WARNING: RxRPC keys found in process keyrings — may indicate exploitation or legitimate AFS usage",
    );
  }

  // Risk assessment
  const espAffected = !espPatched &&
    (espModulesLoaded.length > 0 || espModulesAvailable.length > 0);
  const rxrpcAffected = !rxrpcPatched &&
    (rxrpcModulesLoaded.length > 0 || rxrpcModulesAvailable.length > 0);

  const activeCompromise = suCorrupted || passwdCorrupted;

  const espMitigated = !espAffected || espBlacklisted || espPatched;
  const rxrpcMitigated = !rxrpcAffected || rxrpcBlacklisted || rxrpcPatched;

  let riskLevel: "critical" | "high" | "medium" | "low" | "none";
  if (activeCompromise) {
    riskLevel = "critical";
  } else if (
    (espAffected && userNamespacesEnabled && !espBlacklisted) ||
    (rxrpcAffected && !rxrpcBlacklisted)
  ) {
    riskLevel = "critical";
  } else if (espAffected && !espBlacklisted) {
    riskLevel = "high";
  } else if ((espAffected || rxrpcAffected) && espMitigated && rxrpcMitigated) {
    riskLevel = "low";
  } else if (espAffected || rxrpcAffected) {
    riskLevel = "medium";
  } else if (!espAffected && !rxrpcAffected) {
    riskLevel = "none";
  } else {
    riskLevel = "low";
  }

  const vulnerable = riskLevel !== "none" && riskLevel !== "low";

  const recommendations: string[] = [];
  if (activeCompromise) {
    recommendations.push(
      "IMMEDIATE: System shows signs of active compromise. Isolate the host, preserve evidence, and begin incident response.",
    );
    recommendations.push(
      "Run 'echo 3 > /proc/sys/vm/drop_caches' to flush corrupted page cache (after forensic collection).",
    );
  }
  if (espAffected && !espBlacklisted) {
    recommendations.push(
      "Apply kernel patch for CVE-2026-43284 (commit f4c50a4034e6) or blacklist esp4/esp6 modules: printf 'install esp4 /bin/false\\ninstall esp6 /bin/false\\n' > /etc/modprobe.d/dirtyfrag-esp.conf",
    );
  }
  if (rxrpcAffected && !rxrpcBlacklisted) {
    recommendations.push(
      "No upstream patch for CVE-2026-43500 yet. Blacklist rxrpc if AFS is not needed: echo 'install rxrpc /bin/false' > /etc/modprobe.d/dirtyfrag-rxrpc.conf",
    );
  }
  if (userNamespacesEnabled && espAffected) {
    recommendations.push(
      "Restrict unprivileged user namespaces to block the ESP variant: sysctl -w kernel.unprivileged_userns_clone=0",
    );
  }
  if (vulnerable) {
    recommendations.push(
      "Deploy auditd or eBPF rules to alert on: splice() from suid binaries to network sockets, rapid XFRM SA creation in user namespaces, AF_RXRPC socket creation from non-AFS processes.",
    );
  }
  if (!vulnerable && !activeCompromise) {
    recommendations.push(
      "No action required — system appears patched or not affected.",
    );
  }

  const summary = activeCompromise
    ? `ACTIVE COMPROMISE DETECTED on ${hostname}. Dirty Frag exploitation artifacts found.`
    : vulnerable
    ? `${hostname} is ${riskLevel}-risk for Dirty Frag (CVE-2026-43284/CVE-2026-43500). ${
      espAffected ? "ESP variant exploitable. " : ""
    }${rxrpcAffected ? "RxRPC variant exploitable. " : ""}Mitigations needed.`
    : `${hostname} does not appear vulnerable to Dirty Frag.`;

  await log.writeLine(`\n=== Result: ${riskLevel.toUpperCase()} ===\n`);
  await log.writeLine(`${summary}\n`);

  return {
    scanTimestamp: new Date().toISOString(),
    hostname,
    kernelVersion,
    vulnerable,
    riskLevel,
    summary,
    cve202643284: {
      name: "CVE-2026-43284",
      description:
        "xfrm-ESP page-cache write via splice — 4-byte controlled write per SA using ESN seq_hi",
      affected: espAffected,
      patched: espPatched,
      modulesLoaded: espModulesLoaded,
      modulesAvailable: espModulesAvailable,
      userNamespacesEnabled,
    },
    cve202643500: {
      name: "CVE-2026-43500",
      description:
        "RxRPC RXKAD page-cache write via splice — 8-byte write per trigger using pcbc(fcrypt) decrypt",
      affected: rxrpcAffected,
      patched: rxrpcPatched,
      modulesLoaded: rxrpcModulesLoaded,
      modulesAvailable: rxrpcModulesAvailable,
    },
    mitigations: {
      espModulesBlacklisted: espBlacklisted,
      rxrpcModuleBlacklisted: rxrpcBlacklisted,
      userNamespacesRestricted: !userNamespacesEnabled,
      modprobeBlacklist: blacklistLines,
    },
    indicators: {
      suPageCacheCorrupted: suCorrupted,
      passwdPageCacheCorrupted: passwdCorrupted,
      suspiciousXfrmSAs: suspiciousXfrm,
      rxrpcKeysFound,
      details: indicators,
    },
    recommendations,
  };
}

export const model = {
  type: "@swamp/cve/dirtyfrag",
  version: "2026.05.08.4",
  upgrades: [
    {
      toVersion: "2026.05.08.4",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  reports: [
    "@swamp/cve/dirtyfrag-report",
  ],
  resources: {
    status: {
      description:
        "Vulnerability assessment for CVE-2026-43284 and CVE-2026-43500 (Dirty Frag)",
      schema: VulnStatusSchema,
      lifetime: "infinite",
      garbageCollection: 20,
    },
  },
  files: {
    log: {
      description: "Scan execution log",
      contentType: "text/plain",
      lifetime: "7d",
      garbageCollection: 5,
      streaming: true,
    },
  },
  methods: {
    scan: {
      description:
        "Scan a single host for Dirty Frag vulnerability exposure (CVE-2026-43284 + CVE-2026-43500)",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: MethodContext) => {
        const g = context.globalArgs;
        const logger = context.logger;

        let autoContainer: string | undefined;
        if (present(g.dockerImage) && !present(g.dockerContainer)) {
          autoContainer = await startDockerImage(g.dockerImage!, logger);
          g.dockerContainer = autoContainer;
        }

        const transport = buildTransport(g);
        const label = targetLabel(g);
        const log = context.createFileWriter("log", label);

        await log.writeLine(
          `[${
            new Date().toISOString()
          }] Starting Dirty Frag vulnerability scan\n`,
        );
        await log.writeLine(`Target: ${label}\n\n`);

        const result = await scanHost(
          transport,
          g.targetHost,
          g.suBinaryPath,
          log,
          logger,
        );

        if (autoContainer) {
          await log.writeLine(
            `\nStopping auto-created container ${autoContainer.slice(0, 12)}\n`,
          );
          await stopContainer(autoContainer, logger);
        }

        await log.finalize();

        const handle = await context.writeResource("status", label, result);
        return { dataHandles: [handle] };
      },
    },

    scanFleet: {
      description:
        "Scan multiple hosts for Dirty Frag vulnerability. Pass a comma-separated list of IPs with a shared SSH user and key.",
      arguments: z.object({
        hosts: z
          .string()
          .describe("Comma-separated list of host IPs or hostnames to scan"),
      }),
      execute: async (
        args: { hosts: string },
        context: MethodContext,
      ) => {
        const g = context.globalArgs;
        const logger = context.logger;
        const hosts = args.hosts.split(",").map((h: string) => h.trim())
          .filter((h: string) => h.length > 0);
        const summaryLog = context.createFileWriter("log", "fleet");

        await summaryLog.writeLine(
          `[${new Date().toISOString()}] Dirty Frag fleet scan\n`,
        );
        await summaryLog.writeLine(
          `Hosts: ${hosts.join(", ")} (${hosts.length} total)\n`,
        );
        await summaryLog.writeLine(`Scanning all hosts in parallel...\n\n`);

        const settled = await Promise.allSettled(
          hosts.map(async (host: string) => {
            const transport = buildTransport({
              targetHost: host,
              sshUser: g.sshUser,
              sshKey: present(g.sshKey),
            });
            const hostLog = context.createFileWriter("log", host);
            await hostLog.writeLine(
              `[${new Date().toISOString()}] Scanning ${host}\n\n`,
            );
            const result = await scanHost(
              transport,
              host,
              g.suBinaryPath,
              hostLog,
              logger,
            );
            await hostLog.finalize();
            return { host, result };
          }),
        );

        const handles = [];
        const results = [];

        for (const outcome of settled) {
          if (outcome.status === "fulfilled") {
            const { host, result } = outcome.value;
            results.push({ host, ...result });
            const handle = await context.writeResource("status", host, result);
            handles.push(handle);
            await summaryLog.writeLine(
              `${host}: ${result.riskLevel.toUpperCase()} — ${result.summary}\n`,
            );
          } else {
            const errMsg = outcome.reason instanceof Error
              ? outcome.reason.message
              : String(outcome.reason);
            const host = errMsg.match(/Cannot .+ on (.+?):/)?.[1] || "unknown";
            results.push({ host, error: errMsg });
            await summaryLog.writeLine(`${host}: ERROR — ${errMsg}\n`);
          }
        }

        const total = results.length;
        const vulnerable =
          results.filter((r) => "vulnerable" in r && r.vulnerable).length;
        const errors = results.filter((r) => "error" in r).length;
        const clean = total - vulnerable - errors;

        await summaryLog.writeLine(`\n${"=".repeat(60)}\n`);
        await summaryLog.writeLine(`FLEET SUMMARY: ${total} hosts scanned\n`);
        await summaryLog.writeLine(`  Vulnerable: ${vulnerable}\n`);
        await summaryLog.writeLine(`  Clean:      ${clean}\n`);
        await summaryLog.writeLine(`  Errors:     ${errors}\n`);
        await summaryLog.writeLine(`${"=".repeat(60)}\n`);

        await summaryLog.finalize();
        return { dataHandles: handles };
      },
    },

    mitigate: {
      description:
        "Apply mitigations for Dirty Frag: blacklist vulnerable modules and restrict user namespaces. Accepts a single host or comma-separated list.",
      arguments: z.object({
        dryRun: z
          .boolean()
          .default(true)
          .describe("If true, only print the commands without executing them"),
        hosts: z
          .string()
          .optional()
          .describe(
            "Comma-separated list of hosts to mitigate (overrides targetHost)",
          ),
      }),
      execute: async (
        args: { dryRun: boolean; hosts?: string },
        context: MethodContext,
      ) => {
        const g = context.globalArgs;
        const logger = context.logger;

        const hostList = present(args.hosts)
          ? args.hosts!.split(",").map((h: string) => h.trim()).filter(
            (h: string) => h.length > 0,
          )
          : [g.targetHost];

        const mitigateHost = async (host: string) => {
          const transport = buildTransport({
            targetHost: host,
            sshUser: g.sshUser,
            sshKey: present(g.sshKey),
          });
          const log = context.createFileWriter("log", host);

          await log.writeLine(`Scanning ${host} for vulnerability...\n`);
          const scanResult = await scanHost(
            transport,
            host,
            g.suBinaryPath,
            log,
            logger,
          );

          if (!scanResult.vulnerable) {
            await log.writeLine(
              `\n${host} is not vulnerable — skipping mitigation.\n`,
            );
            await log.finalize();
            return {
              host,
              kernelVersion: scanResult.kernelVersion,
              skipped: true,
              results: ["Not vulnerable — no action taken"],
            };
          }

          await log.writeLine(
            `\n${host} is ${scanResult.riskLevel} risk — proceeding with mitigation${
              args.dryRun ? " (DRY RUN)" : ""
            }.\n\n`,
          );

          const whoami = await runCmd(transport, "whoami", logger);
          const sudo = whoami.stdout === "root" ? "" : "sudo ";

          const mitigationCommands = [
            `${sudo}sh -c "printf 'install esp4 /bin/false\\ninstall esp6 /bin/false\\ninstall rxrpc /bin/false\\n' > /etc/modprobe.d/dirtyfrag.conf"`,
            `${sudo}sh -c "rmmod esp4 2>/dev/null; rmmod esp6 2>/dev/null; rmmod rxrpc 2>/dev/null; true"`,
            `${sudo}sh -c "echo 3 > /proc/sys/vm/drop_caches"`,
          ];

          const results: string[] = [];

          for (const cmd of mitigationCommands) {
            if (args.dryRun) {
              await log.writeLine(`[DRY RUN] Would execute: ${cmd}\n`);
              results.push(`DRY RUN: ${cmd}`);
            } else {
              await log.writeLine(`Executing: ${cmd}\n`);
              const r = await runCmd(transport, cmd, logger);
              await log.writeLine(
                `  exit=${r.exitCode} stdout=${r.stdout} stderr=${r.stderr}\n`,
              );
              results.push(`Executed: ${cmd} (exit=${r.exitCode})`);
            }
          }

          await log.writeLine("\nMitigation steps complete.\n");
          await log.finalize();

          return {
            host,
            kernelVersion: scanResult.kernelVersion,
            skipped: false,
            results,
          };
        };

        const settled = await Promise.allSettled(
          hostList.map(async (host: string) => {
            try {
              return await mitigateHost(host);
            } catch (err) {
              throw Object.assign(
                err instanceof Error ? err : new Error(String(err)),
                { host },
              );
            }
          }),
        );

        const handles = [];
        for (let i = 0; i < settled.length; i++) {
          const outcome = settled[i];
          const host = outcome.status === "fulfilled"
            ? outcome.value.host
            : (outcome.reason?.host || hostList[i]);
          const succeeded = outcome.status === "fulfilled";
          const skipped = succeeded && outcome.value.skipped;
          const results = succeeded
            ? outcome.value.results
            : [String(outcome.reason)];

          let summary;
          let riskLevel: "critical" | "high" | "medium" | "low" | "none";
          let vulnerable;

          if (!succeeded) {
            summary = `Mitigation failed on ${host}: ${outcome.reason}`;
            riskLevel = "high";
            vulnerable = true;
          } else if (skipped) {
            summary = `${host} is not vulnerable — skipped.`;
            riskLevel = "none";
            vulnerable = false;
          } else if (args.dryRun) {
            summary =
              "Dry run complete. Review commands and re-run with dryRun=false to apply.";
            riskLevel = "high";
            vulnerable = true;
          } else {
            summary =
              "Mitigations applied: vulnerable modules blacklisted, page cache flushed.";
            riskLevel = "medium";
            vulnerable = true;
          }

          const mitigated = succeeded && !skipped && !args.dryRun;

          const handle = await context.writeResource("status", host, {
            scanTimestamp: new Date().toISOString(),
            hostname: host,
            kernelVersion: succeeded ? outcome.value.kernelVersion : "unknown",
            vulnerable,
            riskLevel,
            summary,
            cve202643284: {
              name: "CVE-2026-43284",
              description: "xfrm-ESP page-cache write",
              affected: vulnerable,
              patched: false,
              modulesLoaded: [],
              modulesAvailable: [],
              userNamespacesEnabled: false,
            },
            cve202643500: {
              name: "CVE-2026-43500",
              description: "RxRPC RXKAD page-cache write",
              affected: vulnerable,
              patched: false,
              modulesLoaded: [],
              modulesAvailable: [],
            },
            mitigations: {
              espModulesBlacklisted: mitigated,
              rxrpcModuleBlacklisted: mitigated,
              userNamespacesRestricted: false,
              modprobeBlacklist: mitigated
                ? [
                  "install esp4 /bin/false",
                  "install esp6 /bin/false",
                  "install rxrpc /bin/false",
                ]
                : [],
            },
            indicators: {
              suPageCacheCorrupted: false,
              passwdPageCacheCorrupted: false,
              suspiciousXfrmSAs: false,
              rxrpcKeysFound: false,
              details: results,
            },
            recommendations: skipped
              ? ["No action required — host is not vulnerable."]
              : args.dryRun
              ? [
                "Review the dry-run output and re-run with dryRun=false to apply mitigations.",
              ]
              : [
                "Mitigations applied. Monitor for kernel updates that include the upstream fix.",
              ],
          });
          handles.push(handle);
        }

        return { dataHandles: handles };
      },
    },
  },
};
