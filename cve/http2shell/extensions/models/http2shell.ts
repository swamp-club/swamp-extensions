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
 * Scanner for CVE-2026-111497 (Node2Shell / HTTP2Shell), the Brotli decoder
 * out-of-bounds write fixed in Brotli 1.0.10, 1.1.1 and 1.2.1 on 2026-10-21.
 * Inventories every Brotli decoder on local, SSH or Docker targets (Linux,
 * macOS, Windows), rates it, and upgrades what the package manager can.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
import { ADVISORY, NOT_AFFECTED, TRACKER_SNAPSHOT } from "./_lib/advisory.ts";
import {
  type FileWriter,
  mitigateTarget,
  writeScanLog,
} from "./_lib/mitigation.ts";
import { type Mitigation, type Status, StatusSchema } from "./_lib/schemas.ts";
import {
  buildTransport,
  isLocalHost,
  type Logger,
  makeExec,
  makeRunner,
  present,
  scanTarget,
  startDockerImage,
  stopContainer,
  targetLabel,
  type Transport,
  withContainerExit,
} from "./_lib/transport.ts";

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
      "Comma-separated absolute directories to search (read-only) for lockfiles (poetry.lock, uv.lock, requirements*.txt, Pipfile.lock, package-lock.json, Gemfile.lock) and Python virtualenvs",
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
    "Comma-separated directories to search for lockfiles and virtualenvs",
  ),
});

/** Comma-separated values, trimmed and deduplicated. */
export function splitList(value: string | undefined): string[] {
  if (!value) return [];
  return [
    ...new Set(
      value.split(",").map((v) => v.trim()).filter((v) => v.length > 0),
    ),
  ];
}

/** A hosts entry: the host, and the SSH user given with it as user@host. */
export type HostEntry = { host: string; sshUser?: string };

/**
 * Comma-separated hosts, deduplicated; local aliases count as one host. An
 * entry may be user@host to log in to that host as user instead of the
 * model's sshUser; a local host is scanned locally, so its user is dropped.
 * One remote host listed with two different users is refused, since both
 * would write the same status.
 */
export function hostList(hosts: string, sshUser: string): HostEntry[] {
  const seen = new Set<string>();
  const users = new Map<string, string>();
  const result: HostEntry[] = [];
  for (const entry of splitList(hosts)) {
    const at = entry.indexOf("@");
    const h = at < 0 ? entry : entry.slice(at + 1);
    const user = at < 0 ? undefined : entry.slice(0, at);
    if (user !== undefined) {
      if (!/^[A-Za-z0-9._][A-Za-z0-9._-]*$/.test(user)) {
        throw new Error(
          `hosts entry ${JSON.stringify(entry)} has an invalid SSH user`,
        );
      }
      if (h.length === 0 || h.includes("@")) {
        throw new Error(
          `hosts entry ${JSON.stringify(entry)} has an invalid host`,
        );
      }
    }
    const local = isLocalHost(h);
    const key = local ? "localhost" : entry;
    if (seen.has(key)) continue;
    seen.add(key);
    if (local) {
      result.push({ host: h });
      continue;
    }
    const effective = user ?? sshUser;
    const other = users.get(h);
    if (other !== undefined && other !== effective) {
      throw new Error(
        `hosts lists ${h} as both ${other}@${h} and ${effective}@${h}; list each host once`,
      );
    }
    // The same login listed twice (h and sshUser@h) is one host.
    if (other !== undefined) continue;
    users.set(h, effective);
    result.push(user !== undefined ? { host: h, sshUser: user } : { host: h });
  }
  return result;
}

/** Records the hosts entry's own user on its status, when it gave one. */
function withUser(status: Status, sshUser: string | undefined): Status {
  return sshUser !== undefined ? { ...status, sshUser } : status;
}

export function instanceName(label: string): string {
  return label.replace(/[\/\\]/g, "_").replace(/\.\./g, "_");
}

/** Runs fn over items, at most `limit` at a time, keeping the order. */
export async function mapLimit<T, R>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<R>,
): Promise<PromiseSettledResult<R>[]> {
  const out: PromiseSettledResult<R>[] = new Array(items.length);
  let next = 0;
  const worker = async () => {
    while (next < items.length) {
      const i = next++;
      try {
        out[i] = { status: "fulfilled", value: await fn(items[i]) };
      } catch (reason) {
        out[i] = { status: "rejected", reason };
      }
    }
  };
  await Promise.all(
    Array.from({ length: Math.max(1, Math.min(limit, items.length)) }, worker),
  );
  return out;
}

export function errorStatus(
  target: string,
  err: unknown,
  inContainer = false,
): Status {
  const message = err instanceof Error ? err.message : String(err);
  return {
    scanTimestamp: new Date().toISOString(),
    target,
    hostname: target,
    os: { id: "", versionId: "", codename: "", prettyName: "" },
    inContainer,
    runAsRoot: false,
    probe: "none",
    vulnerable: false,
    riskLevel: "unknown",
    action: "unreachable",
    actions: ["unreachable"],
    summary: `Scan failed on ${target}: ${message}`,
    error: message,
    cve: ADVISORY.cve,
    findings: [],
    exposure: {
      listeners: [],
      listenersKnown: false,
      exposedListeners: [],
      inboundMiddleware: [],
      autoDecodingClients: [],
    },
    processScope: "none",
    staleProcesses: [],
    notChecked: [],
    packageListsUpdatedAt: null,
    recommendations: [`Fix connectivity to ${target} and scan again.`],
    stopgaps: [],
    notAffected: NOT_AFFECTED,
    trackerSnapshot: TRACKER_SNAPSHOT,
    mitigation: null,
  };
}

type MitigateArgs = {
  dryRun: boolean;
  hosts?: string;
  restartServices: boolean;
  upgradePython: boolean;
  removePythonBrotli: boolean;
};

/**
 * A mitigate target that failed keeps the options it was run with, so its
 * report still reads as the dry run (or apply) that was asked for.
 */
export function failedMitigation(status: Status, opts: MitigateArgs): Status {
  const mitigation: Mitigation = {
    dryRun: opts.dryRun,
    restartServices: opts.restartServices,
    upgradePython: opts.upgradePython,
    removePythonBrotli: opts.removePythonBrotli,
    // Never checked: the target failed before the privilege preflight.
    privilege: "unavailable",
    missingPrivileges: [],
    outcome: "error",
    steps: [],
    script: null,
    notes: [],
  };
  return { ...status, mitigation };
}

/** A started image's container is the scan target; the image is its label. */
async function openTarget(
  g: z.infer<typeof GlobalArgsSchema>,
  logger: Logger,
): Promise<{ label: string; transport: Transport; started?: string }> {
  if (present(g.dockerImage) && !present(g.dockerContainer)) {
    const t = await startDockerImage(g.dockerImage!, logger);
    return {
      label: g.dockerImage!,
      transport: t.kind === "docker"
        ? { kind: "docker", container: t.container }
        : { kind: "image", image: g.dockerImage! },
      started: t.kind === "docker" ? t.container : undefined,
    };
  }
  return { label: targetLabel(g), transport: buildTransport(g) };
}

function containerOf(t: Transport): string | undefined {
  return t.kind === "docker"
    ? t.container
    : t.kind === "image"
    ? t.image
    : undefined;
}

export const model = {
  type: "@swamp/cve/http2shell",
  version: "2026.10.24.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  reports: ["@swamp/cve/http2shell-report"],
  resources: {
    status: {
      description:
        "Exposure assessment for CVE-2026-111497 (Brotli decoder out-of-bounds write, Node2Shell / HTTP2Shell)",
      schema: StatusSchema,
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
    script: {
      description:
        "Commands to run by hand on hosts mitigate does not change (macOS .sh, Windows .ps1)",
      contentType: "text/plain",
      lifetime: "30d",
      garbageCollection: 10,
    },
  },
  methods: {
    scan: {
      description:
        "Scan one host, container or image for Brotli decoders exposed to CVE-2026-111497",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: MethodContext) => {
        const g = context.globalArgs;
        const logger = context.logger;
        const t = await openTarget(g, logger);
        const log = context.createFileWriter("log", instanceName(t.label));
        await log.writeLine(
          `[${
            new Date().toISOString()
          }] Starting Brotli (CVE-2026-111497) scan\n`,
        );
        await log.writeLine(`Target: ${t.label}\n\n`);
        try {
          const { status } = await scanTarget(
            makeRunner(t.transport, logger),
            makeExec(t.transport, logger),
            t.label,
            {
              inContainer: t.transport.kind === "docker" ||
                t.transport.kind === "image",
              searchPaths: splitList(g.searchPaths),
              container: containerOf(t.transport),
            },
          );
          await writeScanLog(log, status);
          const handle = await context.writeResource(
            "status",
            instanceName(t.label),
            status,
          );
          return { dataHandles: [handle] };
        } catch (err) {
          throw t.started
            ? await withContainerExit(err, t.started, g.dockerImage!)
            : err;
        } finally {
          if (t.started) await stopContainer(t.started, logger);
          await log.finalize();
        }
      },
    },

    scanFleet: {
      description:
        "Scan multiple hosts in parallel over SSH (Linux, macOS and Windows). Pass a comma-separated list of hosts; each connects as the model's SSH user and key, or as user for a user@host entry.",
      arguments: z.object({
        hosts: z
          .string()
          .describe(
            "Comma-separated list of host IPs or hostnames to scan; user@host logs in to that host as user instead of sshUser",
          ),
        concurrency: z
          .number()
          .int()
          .min(1)
          .max(100)
          .default(10)
          .describe("How many hosts to scan at once"),
      }),
      execute: async (
        args: { hosts: string; concurrency: number },
        context: MethodContext,
      ) => {
        const g = context.globalArgs;
        const logger = context.logger;
        const entries = hostList(args.hosts, g.sshUser);
        const hosts = entries.map((e) => e.host);
        const searchPaths = splitList(g.searchPaths);
        const summaryLog = context.createFileWriter("log", "fleet");
        await summaryLog.writeLine(
          `[${
            new Date().toISOString()
          }] Brotli (CVE-2026-111497) fleet scan: ${hosts.length} host(s)\n\n`,
        );

        const settled = await mapLimit(
          entries,
          args.concurrency,
          async (entry) => {
            const host = entry.host;
            const hostLog = context.createFileWriter("log", instanceName(host));
            try {
              // Written first so finalize() cannot mask a scan error.
              await hostLog.writeLine(
                `[${new Date().toISOString()}] Scanning ${host}\n`,
              );
              const transport = buildTransport({
                targetHost: host,
                sshUser: entry.sshUser ?? g.sshUser,
                sshKey: present(g.sshKey),
              });
              const { status } = await scanTarget(
                makeRunner(transport, logger),
                null,
                host,
                { inContainer: false, searchPaths },
              );
              await writeScanLog(hostLog, status);
              return status;
            } finally {
              await hostLog.finalize();
            }
          },
        );

        const handles = [];
        let affected = 0;
        let errors = 0;
        for (let i = 0; i < settled.length; i++) {
          const outcome = settled[i];
          const status = withUser(
            outcome.status === "fulfilled"
              ? outcome.value
              : errorStatus(hosts[i], outcome.reason),
            entries[i].sshUser,
          );
          if (status.error) errors++;
          else if (status.vulnerable) affected++;
          handles.push(
            await context.writeResource(
              "status",
              instanceName(hosts[i]),
              status,
            ),
          );
          await summaryLog.writeLine(
            `${
              hosts[i]
            }: ${status.riskLevel.toUpperCase()} — ${status.summary}\n`,
          );
        }
        await summaryLog.writeLine(
          `\nFLEET SUMMARY: ${hosts.length} scanned, ${affected} affected, ${errors} errors\n`,
        );
        await summaryLog.finalize();
        return { dataHandles: handles };
      },
    },

    mitigate: {
      description:
        "Scan, then upgrade the brotli library and distro Node.js through the package manager and restart the services still running the old library. dryRun defaults to true; containers are reported for rebuild, macOS and Windows get a script to run.",
      arguments: z.object({
        dryRun: z
          .boolean()
          .default(true)
          .describe("If true, only print the commands without executing them"),
        hosts: z
          .string()
          .optional()
          .describe(
            "Comma-separated list of hosts to mitigate (overrides targetHost); user@host logs in to that host as user instead of sshUser",
          ),
        restartServices: z
          .boolean()
          .default(true)
          .describe(
            "Restart the systemd units whose processes still map the old Brotli library",
          ),
        upgradePython: z
          .boolean()
          .default(false)
          .describe(
            "Also run pip install --upgrade Brotli>=1.2.1 brotlicffi>=1.2.1.0 in each affected Python environment found",
          ),
        removePythonBrotli: z
          .boolean()
          .default(false)
          .describe(
            "Stopgap: uninstall Brotli and brotlicffi from affected Python environments (ignored when upgradePython is true)",
          ),
      }),
      execute: async (args: MitigateArgs, context: MethodContext) => {
        const g = context.globalArgs;
        const logger = context.logger;
        const searchPaths = splitList(g.searchPaths);
        let started: string | undefined;
        let targets: {
          label: string;
          sshUser?: string;
          transport: Transport;
        }[];
        if (present(args.hosts)) {
          targets = hostList(args.hosts!, g.sshUser).map((e) => ({
            label: e.host,
            sshUser: e.sshUser,
            transport: buildTransport({
              targetHost: e.host,
              sshUser: e.sshUser ?? g.sshUser,
              sshKey: present(g.sshKey),
            }),
          }));
        } else {
          // An image model must never fall back to targetHost (localhost):
          // start the image as scan does, so it is reported for a rebuild.
          const t = await openTarget(g, logger);
          started = t.started;
          targets = [{ label: t.label, transport: t.transport }];
        }

        const settled = await mapLimit(targets, 10, async (t) => {
          const log = context.createFileWriter("log", instanceName(t.label));
          try {
            await log.writeLine(
              `[${
                new Date().toISOString()
              }] Brotli (CVE-2026-111497) mitigation${
                args.dryRun ? " (DRY RUN)" : ""
              }: ${t.label}\n`,
            );
            const result = await mitigateTarget(
              makeRunner(t.transport, logger),
              makeExec(t.transport, logger),
              t.label,
              {
                dryRun: args.dryRun,
                restartServices: args.restartServices,
                upgradePython: args.upgradePython,
                removePythonBrotli: args.removePythonBrotli &&
                  !args.upgradePython,
                inContainer: t.transport.kind === "docker" ||
                  t.transport.kind === "image",
                searchPaths,
              },
              log,
            );
            const script = result.mitigation.script;
            if (script) {
              const ext = script.shell === "powershell" ? "ps1" : "sh";
              const file = context.createFileWriter(
                "script",
                `${instanceName(t.label)}.${ext}`,
              );
              await file.writeLine(script.text);
              await file.finalize();
            }
            return result;
          } catch (err) {
            throw started
              ? await withContainerExit(err, started, g.dockerImage!)
              : err;
          } finally {
            await log.finalize();
          }
        });
        if (started) await stopContainer(started, logger);

        const handles = [];
        for (let i = 0; i < settled.length; i++) {
          const outcome = settled[i];
          const status = withUser(
            outcome.status === "fulfilled"
              ? outcome.value.status
              : failedMitigation(
                errorStatus(
                  targets[i].label,
                  outcome.reason,
                  targets[i].transport.kind !== "local" &&
                    targets[i].transport.kind !== "ssh",
                ),
                args,
              ),
            targets[i].sshUser,
          );
          handles.push(
            await context.writeResource(
              "status",
              instanceName(targets[i].label),
              status,
            ),
          );
        }
        return { dataHandles: handles };
      },
    },
  },
};
