// Copyright (C) 2026 Adam Jacob
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

import { z } from "zod";
import { errorMessage, type ModelContext } from "./_lib/context.ts";
import { execSudo, getConnection, shellEscape } from "./_lib/ssh.ts";
import { execChecked, RecordedFailure } from "./_lib/checks.ts";
import type { SshConn } from "./_lib/ssh.ts";

const GlobalArgsSchema = z.object({
  name: z.string().describe("Container name"),
  image: z.string().describe("Docker image (e.g. nginx:1.25)"),
  ensure: z.enum(["running", "stopped", "absent"]).describe(
    "Desired container state",
  ),
  ports: z.array(z.string()).optional().describe(
    'Port mappings (e.g. ["8080:80", "443:443"])',
  ),
  environment: z.array(z.string()).optional().meta({ sensitive: true })
    .describe(
      'Environment variables (e.g. ["FOO=bar"])',
    ),
  volumes: z.array(z.string()).optional().describe(
    'Volume mounts (e.g. ["/host:/container"])',
  ),
  restart: z.enum(["no", "always", "unless-stopped", "on-failure"]).optional()
    .describe("Restart policy"),
  command: z.string().optional().describe("Override container command"),
  network: z.string().optional().describe("Docker network to connect to"),
  nodeHost: z.string().describe("Hostname or IP of the remote node"),
  nodeUser: z.string().default("root").describe("SSH username"),
  nodePort: z.number().default(22).describe("SSH port"),
  nodeIdentityFile: z.string().optional().describe("Path to SSH private key"),
  become: z.boolean().default(false).describe(
    "Enable sudo privilege escalation",
  ),
  becomeUser: z.string().default("root").describe("User to become via sudo"),
  becomePassword: z.string().optional().meta({ sensitive: true }).describe(
    "Password for sudo -S",
  ),
});

type GlobalArgs = z.infer<typeof GlobalArgsSchema>;
type Context = ModelContext<GlobalArgs>;

function sudoOpts(g: GlobalArgs) {
  return {
    become: g.become,
    becomeUser: g.becomeUser,
    becomePassword: g.becomePassword,
  };
}

const StateSchema = z.object({
  name: z.string().describe("Container name"),
  ensure: z.string().describe("Desired state"),
  status: z.enum(["compliant", "non_compliant", "applied", "failed"]).describe(
    "Compliance status",
  ),
  current: z.object({
    containerExists: z.boolean().describe("Whether the container exists"),
    containerStatus: z.string().nullable().describe(
      "Container status (running, exited, etc.)",
    ),
    imageId: z.string().nullable().describe("Current image ID"),
    currentImage: z.string().nullable().describe("Current image name"),
    ports: z.array(z.string()).describe("Current port mappings"),
    env: z.array(z.string()).meta({ sensitive: true }).describe(
      "Current environment variables",
    ),
    volumes: z.array(z.string()).describe("Current volume mounts"),
    restartPolicy: z.string().nullable().describe("Current restart policy"),
  }).describe("Current container state"),
  changes: z.array(z.string()).describe("List of changes detected or applied"),
  error: z.string().nullable().describe("Error message if status is failed"),
  timestamp: z.string().describe("ISO 8601 timestamp"),
});

type Current = z.infer<typeof StateSchema>["current"];

const LogsSchema = z.object({
  name: z.string().describe("Container name"),
  output: z.string().nullable().describe(
    "Container log output (null if fetching failed)",
  ),
  error: z.string().nullable().describe("Error message if fetching failed"),
  timestamp: z.string().describe("ISO 8601 timestamp"),
});

function connect(g: GlobalArgs) {
  return getConnection({
    host: g.nodeHost,
    port: g.nodePort,
    username: g.nodeUser,
    privateKeyPath: g.nodeIdentityFile,
  });
}

/** The parts of `docker inspect` output the model reads. */
interface DockerInspect {
  State?: { Status?: string };
  Image?: string;
  Config?: { Image?: string; Env?: string[] | null };
  HostConfig?: {
    PortBindings?:
      | Record<
        string,
        Array<{ HostIp?: string; HostPort?: string }> | null
      >
      | null;
    RestartPolicy?: { Name?: string };
  };
  Mounts?:
    | Array<{
      Type?: string;
      Name?: string;
      Source?: string;
      Destination?: string;
      RW?: boolean;
    }>
    | null;
}

/**
 * Canonical port mapping, `[hostIp:]hostPort:containerPort[/udp]`, so a
 * desired `127.0.0.1:8080:80/tcp` compares equal to what inspect reports.
 */
function normalizePort(spec: string): string {
  const slash = spec.lastIndexOf("/");
  const proto = slash >= 0 ? spec.slice(slash + 1) : "tcp";
  const parts = (slash >= 0 ? spec.slice(0, slash) : spec).split(":");
  const containerPort = parts.pop() ?? "";
  const hostPort = parts.pop() ?? "";
  const hostIp = parts.join(":");
  return `${hostIp ? `${hostIp}:` : ""}${hostPort}:${containerPort}${
    proto === "tcp" ? "" : `/${proto}`
  }`;
}

/**
 * Canonical mount, `source:destination[:ro]`: bind mounts by host path,
 * named volumes by name; options other than `ro` are dropped.
 */
function normalizeVolume(spec: string): string {
  const [source, destination, options] = spec.split(":");
  const ro = (options ?? "").split(",").includes("ro");
  return `${source}:${destination}${ro ? ":ro" : ""}`;
}

async function gather(client: SshConn, g: GlobalArgs): Promise<Current> {
  const so = sudoOpts(g);

  const result = await execSudo(
    client,
    `docker inspect ${shellEscape(g.name)} 2>/dev/null`,
    so,
  );

  if (result.exitCode !== 0) return emptyCurrent();

  let info: DockerInspect;
  try {
    const parsed: unknown = JSON.parse(result.stdout);
    if (
      !Array.isArray(parsed) || typeof parsed[0] !== "object" ||
      parsed[0] === null
    ) {
      return emptyCurrent();
    }
    info = parsed[0] as DockerInspect;
  } catch {
    return emptyCurrent();
  }

  const containerStatus = info.State?.Status || null;
  const imageId = info.Image || null;
  const currentImage = info.Config?.Image || null;

  const ports: string[] = [];
  const portBindings = info.HostConfig?.PortBindings || {};
  for (const [containerPort, bindings] of Object.entries(portBindings)) {
    for (const binding of bindings ?? []) {
      const hostIp = binding.HostIp ? `${binding.HostIp}:` : "";
      ports.push(
        normalizePort(`${hostIp}${binding.HostPort ?? ""}:${containerPort}`),
      );
    }
  }

  const allEnv: string[] = info.Config?.Env || [];
  const requestedKeys = new Set(
    (g.environment || []).map((e: string) => e.split("=")[0]),
  );
  const env = requestedKeys.size > 0
    ? allEnv.filter((e: string) => requestedKeys.has(e.split("=")[0]))
    : [];
  const volumes: string[] = [];
  for (const mount of info.Mounts || []) {
    // An anonymous volume (an image's VOLUME, named by a 64-hex id) is not
    // something `volumes` can ask for. Counting it as drift would recreate
    // the container on every apply, and the recreated container gets a new,
    // empty anonymous volume: a database image's data would vanish each run.
    if (mount.Type === "volume" && /^[0-9a-f]{64}$/.test(mount.Name ?? "")) {
      continue;
    }
    const source = mount.Type === "bind"
      ? mount.Source
      : mount.Type === "volume"
      ? mount.Name
      : undefined;
    if (source !== undefined) {
      volumes.push(
        `${source}:${mount.Destination ?? ""}${
          mount.RW === false ? ":ro" : ""
        }`,
      );
    }
  }

  const restartPolicy = info.HostConfig?.RestartPolicy?.Name || null;

  return {
    containerExists: true,
    containerStatus,
    imageId,
    currentImage,
    ports: ports.sort(),
    env,
    volumes: volumes.sort(),
    restartPolicy,
  };
}

function detectChanges(g: GlobalArgs, current: Current) {
  const changes: string[] = [];

  if (g.ensure === "absent") {
    if (current.containerExists) changes.push("remove container");
    return changes;
  }

  if (!current.containerExists) {
    changes.push("create container");
    if (g.ensure === "running") changes.push("start container");
    return changes;
  }

  let needRecreate = false;
  if (current.currentImage !== g.image) {
    changes.push(`image: ${current.currentImage} -> ${g.image}`);
    needRecreate = true;
  }

  if (g.ports !== undefined) {
    const desired = g.ports.map(normalizePort).sort();
    const have = [...current.ports].sort();
    if (JSON.stringify(desired) !== JSON.stringify(have)) {
      changes.push(`ports changed`);
      needRecreate = true;
    }
  }

  if (g.environment !== undefined) {
    for (const env of g.environment) {
      if (!current.env.includes(env)) {
        changes.push(`environment changed`);
        needRecreate = true;
        break;
      }
    }
  }

  if (g.volumes !== undefined) {
    const desired = g.volumes.map(normalizeVolume).sort();
    const have = [...current.volumes].sort();
    if (JSON.stringify(desired) !== JSON.stringify(have)) {
      changes.push(`volumes changed`);
      needRecreate = true;
    }
  }

  if (
    g.restart !== undefined && current.restartPolicy !== g.restart
  ) {
    changes.push(
      `restart: ${current.restartPolicy} -> ${g.restart}`,
    );
    needRecreate = true;
  }

  if (needRecreate) {
    if (!changes.includes("create container")) {
      changes.push("recreate container");
    }
  }

  if (g.ensure === "running" && current.containerStatus !== "running") {
    if (!needRecreate) changes.push("start container");
  }
  if (g.ensure === "stopped" && current.containerStatus === "running") {
    changes.push("stop container");
  }

  return changes;
}

function emptyCurrent(): Current {
  return {
    containerExists: false,
    containerStatus: null,
    imageId: null,
    currentImage: null,
    ports: [] as string[],
    env: [] as string[],
    volumes: [] as string[],
    restartPolicy: null,
  };
}

function buildCreateCmd(g: GlobalArgs) {
  const args = ["docker", "create", "--name", shellEscape(g.name)];
  if (g.ports) {
    for (const p of g.ports) args.push("-p", shellEscape(p));
  }
  if (g.environment) {
    for (const e of g.environment) args.push("-e", shellEscape(e));
  }
  if (g.volumes) {
    for (const v of g.volumes) args.push("-v", shellEscape(v));
  }
  if (g.restart) args.push("--restart", shellEscape(g.restart));
  if (g.network) args.push("--network", shellEscape(g.network));
  args.push(shellEscape(g.image));
  if (g.command) args.push(shellEscape(g.command));
  return args.join(" ");
}

/**
 * Manages a Docker container on a remote node over SSH: `check` compares it
 * to the desired image, ports, environment, volumes, restart policy and
 * running state; `apply` creates, recreates, starts, stops or removes it;
 * `logs` captures recent log output; `restart` restarts it.
 */
export const model = {
  type: "@swamp/cfgmgmt/docker_container",
  version: "2026.10.27.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: z.object({
    nodeHost: z.string().optional().describe(
      "Hostname or IP of the remote node",
    ),
    nodeUser: z.string().optional().describe("SSH username"),
    nodePort: z.number().optional().describe("SSH port"),
    nodeIdentityFile: z.string().optional().describe("Path to SSH private key"),
    become: z.boolean().optional().describe("Enable sudo privilege escalation"),
    becomeUser: z.string().optional().describe("User to become via sudo"),
    becomePassword: z.string().optional().meta({ sensitive: true }).describe(
      "Password for sudo -S",
    ),
  }),
  resources: {
    state: {
      description: "Result of check or apply operation",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
    logs: {
      description: "Container log output",
      schema: LogsSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    check: {
      description: "Check if Docker container matches desired state (dry-run)",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info("Checking container {name} on {host}", {
          name: g.name,
          host: g.nodeHost,
        });
        let current: Current | null = null;
        try {
          const client = await connect(g);
          current = await gather(client, g);
          const changes = detectChanges(g, current);
          const status = changes.length === 0 ? "compliant" : "non_compliant";
          const handle = await context.writeResource("state", g.nodeHost, {
            name: g.name,
            ensure: g.ensure,
            status,
            current,
            changes,
            error: null,
            timestamp: new Date().toISOString(),
          });
          context.logger.info("Container {name} on {host} is {status}", {
            name: g.name,
            host: g.nodeHost,
            status,
          });
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error(
            "docker_container check failed on {host}: {error}",
            { host: g.nodeHost, error: errorMessage(err) },
          );
          await context.writeResource("state", g.nodeHost, {
            name: g.name,
            ensure: g.ensure,
            status: "failed",
            current: current ?? emptyCurrent(),
            changes: [],
            error: errorMessage(err),
            timestamp: new Date().toISOString(),
          });
          throw err;
        }
      },
    },
    apply: {
      description: "Create, start, stop, or remove a Docker container",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info(
          "Applying container {name} ({ensure}) on {host}",
          { name: g.name, ensure: g.ensure, host: g.nodeHost },
        );
        let current: Current | null = null;
        let changes: string[] = [];
        try {
          const client = await connect(g);
          current = await gather(client, g);
          changes = detectChanges(g, current);

          if (changes.length === 0) {
            const handle = await context.writeResource("state", g.nodeHost, {
              name: g.name,
              ensure: g.ensure,
              status: "compliant",
              current,
              changes: [],
              error: null,
              timestamp: new Date().toISOString(),
            });
            context.logger.info("Container {name} on {host} is compliant", {
              name: g.name,
              host: g.nodeHost,
            });
            return { dataHandles: [handle] };
          }

          const so = sudoOpts(g);

          if (g.ensure === "absent") {
            if (current.containerExists) {
              await execChecked(
                client,
                `docker rm -f ${shellEscape(g.name)}`,
                so,
                "docker rm",
              );
            }
          } else if (changes.includes("recreate container")) {
            if (current.containerStatus === "running") {
              await execSudo(
                client,
                `docker stop ${shellEscape(g.name)}`,
                so,
              );
            }
            if (current.containerExists) {
              await execChecked(
                client,
                `docker rm ${shellEscape(g.name)}`,
                so,
                "docker rm",
              );
            }
            const createResult = await execSudo(
              client,
              buildCreateCmd(g),
              so,
            );
            if (createResult.exitCode !== 0) {
              throw new Error(`docker create failed: ${createResult.stderr}`);
            }
            if (g.ensure === "running") {
              const startResult = await execSudo(
                client,
                `docker start ${shellEscape(g.name)}`,
                so,
              );
              if (startResult.exitCode !== 0) {
                throw new Error(
                  `docker start failed: ${startResult.stderr}`,
                );
              }
            }
          } else if (changes.includes("create container")) {
            const createResult = await execSudo(
              client,
              buildCreateCmd(g),
              so,
            );
            if (createResult.exitCode !== 0) {
              throw new Error(`docker create failed: ${createResult.stderr}`);
            }
            if (changes.includes("start container")) {
              const startResult = await execSudo(
                client,
                `docker start ${shellEscape(g.name)}`,
                so,
              );
              if (startResult.exitCode !== 0) {
                throw new Error(
                  `docker start failed: ${startResult.stderr}`,
                );
              }
            }
          } else if (changes.includes("start container")) {
            const result = await execSudo(
              client,
              `docker start ${shellEscape(g.name)}`,
              so,
            );
            if (result.exitCode !== 0) {
              throw new Error(`docker start failed: ${result.stderr}`);
            }
          } else if (changes.includes("stop container")) {
            const result = await execSudo(
              client,
              `docker stop ${shellEscape(g.name)}`,
              so,
            );
            if (result.exitCode !== 0) {
              throw new Error(`docker stop failed: ${result.stderr}`);
            }
          }

          const updated = await gather(client, g);
          const handle = await context.writeResource("state", g.nodeHost, {
            name: g.name,
            ensure: g.ensure,
            status: "applied",
            current: updated,
            changes,
            error: null,
            timestamp: new Date().toISOString(),
          });
          context.logger.info("Applied {changes} for {name} on {host}", {
            changes,
            name: g.name,
            host: g.nodeHost,
          });
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error(
            "docker_container apply failed on {host}: {error}",
            { host: g.nodeHost, error: errorMessage(err) },
          );
          await context.writeResource("state", g.nodeHost, {
            name: g.name,
            ensure: g.ensure,
            status: "failed",
            current: current ?? emptyCurrent(),
            changes,
            error: errorMessage(err),
            timestamp: new Date().toISOString(),
          });
          throw err;
        }
      },
    },
    logs: {
      description: "Fetch recent container logs",
      arguments: z.object({
        lines: z.number().int().positive().default(100).describe(
          "Number of log lines to fetch",
        ),
      }),
      execute: async (args: { lines: number }, context: Context) => {
        const g = context.globalArgs;
        context.logger.info("Fetching {lines} log lines of {name} on {host}", {
          lines: args.lines,
          name: g.name,
          host: g.nodeHost,
        });
        try {
          const client = await connect(g);
          const result = await execChecked(
            client,
            `docker logs --tail ${args.lines} ${shellEscape(g.name)} 2>&1`,
            sudoOpts(g),
            "docker logs",
          );
          const handle = await context.writeResource("logs", g.nodeHost, {
            name: g.name,
            output: result.stdout,
            error: null,
            timestamp: new Date().toISOString(),
          });
          context.logger.info("Fetched logs of {name} on {host}", {
            name: g.name,
            host: g.nodeHost,
          });
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error(
            "docker_container logs failed on {host}: {error}",
            { host: g.nodeHost, error: errorMessage(err) },
          );
          await context.writeResource("logs", g.nodeHost, {
            name: g.name,
            output: null,
            error: errorMessage(err),
            timestamp: new Date().toISOString(),
          });
          throw err;
        }
      },
    },
    restart: {
      description: "Restart the container (imperative, always runs)",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info("Restarting container {name} on {host}", {
          name: g.name,
          host: g.nodeHost,
        });
        try {
          const client = await connect(g);
          const result = await execSudo(
            client,
            `docker restart ${shellEscape(g.name)}`,
            sudoOpts(g),
          );
          const current = await gather(client, g);
          const detail = result.stderr.trim() || result.stdout.trim();
          const error = result.exitCode === 0
            ? null
            : `docker restart failed ` +
              `with exit code ${result.exitCode}${detail ? `: ${detail}` : ""}`;
          const handle = await context.writeResource("state", g.nodeHost, {
            name: g.name,
            ensure: g.ensure,
            status: error === null ? "applied" : "failed",
            current,
            changes: ["restart container"],
            error,
            timestamp: new Date().toISOString(),
          });
          if (error !== null) throw new RecordedFailure(error);
          context.logger.info("Restarted container {name} on {host}", {
            name: g.name,
            host: g.nodeHost,
          });
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error(
            "docker_container restart failed on {host}: {error}",
            { host: g.nodeHost, error: errorMessage(err) },
          );
          if (err instanceof RecordedFailure) throw err;
          await context.writeResource("state", g.nodeHost, {
            name: g.name,
            ensure: g.ensure,
            status: "failed",
            current: emptyCurrent(),
            changes: [],
            error: errorMessage(err),
            timestamp: new Date().toISOString(),
          });
          throw err;
        }
      },
    },
  },
  reports: [],
};
