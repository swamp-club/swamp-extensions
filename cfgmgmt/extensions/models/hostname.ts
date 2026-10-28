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
import {
  execSudo,
  getConnection,
  shellEscape,
  writeFileAs,
} from "./_lib/ssh.ts";
import type { SshConn } from "./_lib/ssh.ts";
import { execChecked } from "./_lib/checks.ts";

const GlobalArgsSchema = z.object({
  name: z.string().describe("Desired system hostname"),
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

interface Current {
  hostname: string | null;
  etcHostname: string | null;
}

function sudoOpts(g: GlobalArgs) {
  return {
    become: g.become,
    becomeUser: g.becomeUser,
    becomePassword: g.becomePassword,
  };
}

const StateSchema = z.object({
  name: z.string().describe("Desired hostname"),
  status: z.enum(["compliant", "non_compliant", "applied", "failed"]).describe(
    "Compliance status",
  ),
  current: z.object({
    hostname: z.string().nullable().describe("Current live hostname"),
    etcHostname: z.string().nullable().describe(
      "Current contents of /etc/hostname",
    ),
  }).describe("Current hostname state on the remote node"),
  changes: z.array(z.string()).describe("List of changes detected or applied"),
  error: z.string().nullable().describe("Error message if status is failed"),
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

async function gather(client: SshConn, g: GlobalArgs): Promise<Current> {
  const so = sudoOpts(g);
  const hostnameResult = await execSudo(
    client,
    `hostnamectl --static 2>/dev/null || hostname`,
    so,
  );
  const etcResult = await execSudo(
    client,
    `cat /etc/hostname 2>/dev/null || echo ''`,
    so,
  );
  return {
    hostname: hostnameResult.stdout.trim() || null,
    etcHostname: etcResult.stdout.trim() || null,
  };
}

function detectChanges(g: GlobalArgs, current: Current) {
  const changes: string[] = [];
  if (current.hostname !== g.name) {
    changes.push(`hostname: ${current.hostname} -> ${g.name}`);
  }
  if (current.etcHostname !== g.name) {
    changes.push(`/etc/hostname: ${current.etcHostname} -> ${g.name}`);
  }
  return changes;
}

function emptyCurrent(): Current {
  return { hostname: null, etcHostname: null };
}

/**
 * Manages the system hostname (live and /etc/hostname) over SSH. `check`
 * reports drift; `apply` sets it via hostnamectl, falling back to
 * /etc/hostname plus `hostname`.
 */
export const model = {
  type: "@swamp/cfgmgmt/hostname",
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
  },
  methods: {
    check: {
      description: "Check if hostname matches desired state (dry-run)",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info("Checking hostname {name} on {host}", {
          name: g.name,
          host: g.nodeHost,
        });
        try {
          const client = await connect(g);
          const current = await gather(client, g);
          const changes = detectChanges(g, current);
          const handle = await context.writeResource("state", g.nodeHost, {
            name: g.name,
            status: changes.length === 0 ? "compliant" : "non_compliant",
            current,
            changes,
            error: null,
            timestamp: new Date().toISOString(),
          });
          context.logger.info("Hostname {name} on {host} is {status}", {
            name: g.name,
            host: g.nodeHost,
            status: changes.length === 0 ? "compliant" : "non_compliant",
          });
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error(
            "Check hostname {name} failed on {host}: {error}",
            { name: g.name, host: g.nodeHost, error: errorMessage(err) },
          );
          await context.writeResource("state", g.nodeHost, {
            name: g.name,
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
      description: "Set the system hostname to the desired value",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info("Applying hostname {name} on {host}", {
          name: g.name,
          host: g.nodeHost,
        });
        try {
          const client = await connect(g);
          const current = await gather(client, g);
          const changes = detectChanges(g, current);

          if (changes.length === 0) {
            const handle = await context.writeResource("state", g.nodeHost, {
              name: g.name,
              status: "compliant",
              current,
              changes: [],
              error: null,
              timestamp: new Date().toISOString(),
            });
            context.logger.info("Hostname {name} on {host} is {status}", {
              name: g.name,
              host: g.nodeHost,
              status: "compliant",
            });
            return { dataHandles: [handle] };
          }

          const so = sudoOpts(g);
          const hostnamectlCheck = await execSudo(
            client,
            "command -v hostnamectl",
            so,
          );
          // hostnamectl can exist yet fail (e.g. no D-Bus in a container:
          // "Failed to connect to bus"); fall back to the non-systemd path.
          let hostnamectlError: string | null = null;
          if (hostnamectlCheck.exitCode === 0) {
            const set = await execSudo(
              client,
              `hostnamectl set-hostname ${shellEscape(g.name)}`,
              so,
            );
            if (set.exitCode !== 0) {
              const detail = set.stderr.trim() || set.stdout.trim();
              hostnamectlError =
                `hostnamectl set-hostname failed with exit code ${set.exitCode}${
                  detail ? `: ${detail}` : ""
                }`;
            }
          }
          if (hostnamectlCheck.exitCode !== 0 || hostnamectlError !== null) {
            try {
              await writeFileAs(client, "/etc/hostname", g.name + "\n", so);
              await execChecked(
                client,
                `hostname ${shellEscape(g.name)}`,
                so,
                "hostname",
              );
            } catch (fallbackErr) {
              if (hostnamectlError === null) throw fallbackErr;
              throw new Error(
                `${hostnamectlError}; fallback also failed: ${
                  errorMessage(fallbackErr)
                }`,
              );
            }
          }

          const updated = await gather(client, g);
          const handle = await context.writeResource("state", g.nodeHost, {
            name: g.name,
            status: "applied",
            current: updated,
            changes,
            error: null,
            timestamp: new Date().toISOString(),
          });
          context.logger.info("Hostname {name} on {host} is {status}", {
            name: g.name,
            host: g.nodeHost,
            status: "applied",
          });
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error(
            "Apply hostname {name} failed on {host}: {error}",
            { name: g.name, host: g.nodeHost, error: errorMessage(err) },
          );
          await context.writeResource("state", g.nodeHost, {
            name: g.name,
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
