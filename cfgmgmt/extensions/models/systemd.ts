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
import {
  execSudo,
  getConnection,
  shellEscape,
  writeFileAs,
} from "./_lib/ssh.ts";
import type { SshConn } from "./_lib/ssh.ts";
import { errorMessage, type ModelContext } from "./_lib/context.ts";
import { execChecked, RecordedFailure } from "./_lib/checks.ts";

const GlobalArgsSchema = z.object({
  service: z.string().describe("Service name (e.g. nginx or nginx.service)"),
  ensure: z.enum(["running", "stopped"]).optional().describe(
    "Whether service should be running or stopped",
  ),
  enabled: z.boolean().optional().describe(
    "Whether the service should be enabled at boot",
  ),
  unitFile: z.string().optional().describe(
    "Full content of a systemd unit file to deploy",
  ),
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
type Current = z.infer<typeof StateSchema>["current"];

function sudoOpts(g: GlobalArgs) {
  return {
    become: g.become,
    becomeUser: g.becomeUser,
    becomePassword: g.becomePassword,
  };
}

const StateSchema = z.object({
  service: z.string().describe("Service name"),
  status: z.enum(["compliant", "non_compliant", "applied", "failed"]).describe(
    "Compliance status",
  ),
  current: z.object({
    loaded: z.boolean().describe("Whether the unit is loaded"),
    active: z.string().describe("Active state (e.g. active, inactive, failed)"),
    enabled: z.string().describe("Unit file state (e.g. enabled, disabled)"),
  }).describe("Current service state"),
  changes: z.array(z.string()).describe("List of changes detected or applied"),
  error: z.string().nullable().describe("Error message if status is failed"),
  timestamp: z.string().describe("ISO 8601 timestamp"),
});

const LogsSchema = z.object({
  service: z.string().describe("Service name"),
  output: z.string().describe("Journal log output"),
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

function unitFilePath(service: string) {
  return service.includes(".")
    ? `/etc/systemd/system/${service}`
    : `/etc/systemd/system/${service}.service`;
}

async function gather(
  client: SshConn,
  service: string,
  g: GlobalArgs,
): Promise<Current> {
  const result = await execSudo(
    client,
    `systemctl show ${
      shellEscape(service)
    } --property=LoadState,ActiveState,UnitFileState --no-pager`,
    sudoOpts(g),
  );
  const props = new Map<string, string>();
  for (const line of result.stdout.split("\n")) {
    const eq = line.indexOf("=");
    if (eq > 0) {
      props.set(line.slice(0, eq), line.slice(eq + 1).trim());
    }
  }
  return {
    loaded: props.get("LoadState") === "loaded",
    active: props.get("ActiveState") || "unknown",
    enabled: props.get("UnitFileState") || "unknown",
  };
}

async function detectChanges(
  client: SshConn,
  g: GlobalArgs,
  current: Current,
) {
  const changes: string[] = [];

  if (g.unitFile !== undefined) {
    const path = unitFilePath(g.service);
    const result = await execSudo(
      client,
      `cat ${shellEscape(path)} 2>/dev/null`,
      sudoOpts(g),
    );
    if (result.exitCode !== 0) {
      changes.push("create unit file");
    } else if (result.stdout !== g.unitFile) {
      changes.push("update unit file");
    }
  }

  if (g.enabled !== undefined) {
    const isEnabled = current.enabled === "enabled";
    if (g.enabled && !isEnabled) changes.push("enable service");
    if (!g.enabled && isEnabled) changes.push("disable service");
  }

  if (g.ensure !== undefined) {
    const isActive = current.active === "active";
    if (g.ensure === "running" && !isActive) changes.push("start service");
    if (g.ensure === "stopped" && isActive) changes.push("stop service");
  }

  return changes;
}

function emptyCurrent(): Current {
  return { loaded: false, active: "unknown", enabled: "unknown" };
}

/**
 * Manages a systemd service over SSH: `check` reports drift, `apply`
 * deploys an optional unit file and converges the running and enabled state,
 * `restart` restarts the service unconditionally and `logs` records recent
 * journal output.
 */
export const model = {
  type: "@swamp/cfgmgmt/systemd",
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
      description: "Journal log output for the service",
      schema: LogsSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    check: {
      description: "Check if service matches desired state (dry-run)",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info("Checking service {service} on {host}", {
          service: g.service,
          host: g.nodeHost,
          ensure: g.ensure,
          enabled: g.enabled,
        });
        try {
          const client = await connect(g);
          const current = await gather(client, g.service, g);
          const changes = await detectChanges(client, g, current);

          const handle = await context.writeResource("state", g.nodeHost, {
            service: g.service,
            status: changes.length === 0 ? "compliant" : "non_compliant",
            current,
            changes,
            error: null,
            timestamp: new Date().toISOString(),
          });
          context.logger.info(
            "Service {service} on {host} is {status}: {changes}",
            {
              service: g.service,
              host: g.nodeHost,
              status: changes.length === 0 ? "compliant" : "non_compliant",
              changes,
            },
          );
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error(
            "Service {service} check failed on {host}: {error}",
            { service: g.service, host: g.nodeHost, error: errorMessage(err) },
          );
          await context.writeResource("state", g.nodeHost, {
            service: g.service,
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
    apply: {
      description: "Apply desired service state to the remote node",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info("Applying service {service} on {host}", {
          service: g.service,
          host: g.nodeHost,
          ensure: g.ensure,
          enabled: g.enabled,
        });
        try {
          const client = await connect(g);
          const current = await gather(client, g.service, g);
          const changes = await detectChanges(client, g, current);

          if (changes.length === 0) {
            const handle = await context.writeResource("state", g.nodeHost, {
              service: g.service,
              status: "compliant",
              current,
              changes: [],
              error: null,
              timestamp: new Date().toISOString(),
            });
            context.logger.info(
              "Service {service} on {host} is already compliant",
              { service: g.service, host: g.nodeHost },
            );
            return { dataHandles: [handle] };
          }

          const errors: string[] = [];

          const so = sudoOpts(g);
          if (
            changes.includes("create unit file") ||
            changes.includes("update unit file")
          ) {
            const path = unitFilePath(g.service);
            // Non-null: these changes are only produced when g.unitFile is set.
            await writeFileAs(client, path, g.unitFile!, so);
            const reload = await execSudo(
              client,
              "systemctl daemon-reload",
              so,
            );
            if (reload.exitCode !== 0) {
              errors.push(`daemon-reload: ${reload.stderr}`);
            }
          }

          if (changes.includes("enable service")) {
            const r = await execSudo(
              client,
              `systemctl enable ${shellEscape(g.service)}`,
              so,
            );
            if (r.exitCode !== 0) errors.push(`enable: ${r.stderr}`);
          } else if (changes.includes("disable service")) {
            const r = await execSudo(
              client,
              `systemctl disable ${shellEscape(g.service)}`,
              so,
            );
            if (r.exitCode !== 0) errors.push(`disable: ${r.stderr}`);
          }

          if (changes.includes("start service")) {
            const r = await execSudo(
              client,
              `systemctl start ${shellEscape(g.service)}`,
              so,
            );
            if (r.exitCode !== 0) errors.push(`start: ${r.stderr}`);
          } else if (changes.includes("stop service")) {
            const r = await execSudo(
              client,
              `systemctl stop ${shellEscape(g.service)}`,
              so,
            );
            if (r.exitCode !== 0) errors.push(`stop: ${r.stderr}`);
          }

          const updated = await gather(client, g.service, g);
          const failed = errors.length > 0;
          const handle = await context.writeResource("state", g.nodeHost, {
            service: g.service,
            status: failed ? "failed" : "applied",
            current: updated,
            changes,
            error: failed ? errors.join("; ") : null,
            timestamp: new Date().toISOString(),
          });
          if (failed) throw new RecordedFailure(errors.join("; "));
          context.logger.info(
            "Applied {changes} to service {service} on {host}",
            { service: g.service, host: g.nodeHost, changes },
          );
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error(
            "Service {service} apply failed on {host}: {error}",
            { service: g.service, host: g.nodeHost, error: errorMessage(err) },
          );
          if (err instanceof RecordedFailure) throw err;
          await context.writeResource("state", g.nodeHost, {
            service: g.service,
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
    restart: {
      description: "Restart the service (imperative, always runs)",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info("Restarting service {service} on {host}", {
          service: g.service,
          host: g.nodeHost,
        });
        try {
          const client = await connect(g);
          const result = await execSudo(
            client,
            `systemctl restart ${shellEscape(g.service)}`,
            sudoOpts(g),
          );
          const current = await gather(client, g.service, g);

          const failed = result.exitCode !== 0;
          const detail = result.stderr.trim();
          const errorMsg =
            `systemctl restart failed with exit code ${result.exitCode}${
              detail ? `: ${detail}` : ""
            }`;
          const handle = await context.writeResource("state", g.nodeHost, {
            service: g.service,
            status: failed ? "failed" : "applied",
            current,
            changes: ["restart service"],
            error: failed ? errorMsg : null,
            timestamp: new Date().toISOString(),
          });
          if (failed) throw new RecordedFailure(errorMsg);
          context.logger.info("Restarted service {service} on {host}", {
            service: g.service,
            host: g.nodeHost,
          });
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error(
            "Service {service} restart failed on {host}: {error}",
            { service: g.service, host: g.nodeHost, error: errorMessage(err) },
          );
          if (err instanceof RecordedFailure) throw err;
          await context.writeResource("state", g.nodeHost, {
            service: g.service,
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
    logs: {
      description: "Fetch recent journal logs for the service",
      arguments: z.object({
        lines: z.number().int().positive().default(100).describe(
          "Number of journal lines to fetch",
        ),
      }),
      execute: async (args: { lines: number }, context: Context) => {
        const g = context.globalArgs;
        context.logger.info(
          "Fetching {lines} journal lines for {service} on {host}",
          { service: g.service, host: g.nodeHost, lines: args.lines },
        );
        // The catch only logs: the logs resource has no error field, and
        // writing empty output on failure would make an SSH or journalctl
        // error look like "no logs". Failures propagate instead.
        try {
          const client = await connect(g);
          const result = await execChecked(
            client,
            `journalctl -u ${
              shellEscape(g.service)
            } --no-pager -n ${args.lines}`,
            sudoOpts(g),
            "journalctl",
          );

          const handle = await context.writeResource("logs", g.nodeHost, {
            service: g.service,
            output: result.stdout,
            timestamp: new Date().toISOString(),
          });
          context.logger.info("Fetched journal logs for {service} on {host}", {
            service: g.service,
            host: g.nodeHost,
          });
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error(
            "Service {service} log fetch failed on {host}: {error}",
            { service: g.service, host: g.nodeHost, error: errorMessage(err) },
          );
          throw err;
        }
      },
    },
  },
  reports: [],
};
