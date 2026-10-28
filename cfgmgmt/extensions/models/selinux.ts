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
import { execChecked } from "./_lib/checks.ts";
import { execSudo, getConnection, shellEscape } from "./_lib/ssh.ts";
import type { SshConn } from "./_lib/ssh.ts";

const GlobalArgsSchema = z.object({
  mode: z.enum(["enforcing", "permissive", "disabled"]).optional().describe(
    "Desired SELinux mode (mutually exclusive with boolean)",
  ),
  boolean: z.string().optional().describe(
    "SELinux boolean name (mutually exclusive with mode)",
  ),
  booleanValue: z.enum(["on", "off"]).optional().describe(
    "Desired boolean value",
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

interface Current {
  selinuxInstalled: boolean;
  currentMode: string | null;
  configMode: string | null;
  booleanCurrent: string | null;
}

function sudoOpts(g: GlobalArgs) {
  return {
    become: g.become,
    becomeUser: g.becomeUser,
    becomePassword: g.becomePassword,
  };
}

const StateSchema = z.object({
  status: z.enum(["compliant", "non_compliant", "applied", "failed"]).describe(
    "Compliance status",
  ),
  current: z.object({
    selinuxInstalled: z.boolean().describe("Whether SELinux is installed"),
    currentMode: z.string().nullable().describe("Current live SELinux mode"),
    configMode: z.string().nullable().describe(
      "Configured mode in /etc/selinux/config",
    ),
    booleanCurrent: z.string().nullable().describe("Current boolean value"),
  }).describe("Current SELinux state"),
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

  const cmdCheck = await execSudo(
    client,
    `command -v getenforce`,
    so,
  );
  const selinuxInstalled = cmdCheck.exitCode === 0;

  let currentMode: string | null = null;
  if (selinuxInstalled) {
    const getenforce = await execSudo(
      client,
      `getenforce 2>/dev/null`,
      so,
    );
    if (getenforce.exitCode === 0) {
      currentMode = getenforce.stdout.trim().toLowerCase();
    }
  }

  let configMode: string | null = null;
  if (selinuxInstalled) {
    const config = await execSudo(
      client,
      `grep '^SELINUX=' /etc/selinux/config 2>/dev/null | head -1`,
      so,
    );
    if (config.exitCode === 0 && config.stdout.trim()) {
      const match = config.stdout.match(/^SELINUX=(\S+)/);
      if (match) configMode = match[1].toLowerCase();
    }
  }

  let booleanCurrent: string | null = null;
  if (g.boolean && selinuxInstalled) {
    const result = await execSudo(
      client,
      `getsebool ${shellEscape(g.boolean)} 2>/dev/null`,
      so,
    );
    if (result.exitCode === 0) {
      const parts = result.stdout.trim().split(/\s+/);
      booleanCurrent = parts[parts.length - 1] || null;
    }
  }

  return { selinuxInstalled, currentMode, configMode, booleanCurrent };
}

function detectChanges(g: GlobalArgs, current: Current) {
  const changes: string[] = [];

  if (g.mode !== undefined) {
    if (current.currentMode !== g.mode) {
      changes.push(`mode: ${current.currentMode} -> ${g.mode}`);
    }
    if (current.configMode !== g.mode) {
      changes.push(`config: ${current.configMode} -> ${g.mode}`);
    }
  }

  if (g.boolean !== undefined && g.booleanValue !== undefined) {
    if (current.booleanCurrent !== g.booleanValue) {
      changes.push(
        `boolean ${g.boolean}: ${current.booleanCurrent} -> ${g.booleanValue}`,
      );
    }
  }

  return changes;
}

function emptyCurrent(): Current {
  return {
    selinuxInstalled: false,
    currentMode: null,
    configMode: null,
    booleanCurrent: null,
  };
}

/**
 * Manages the SELinux mode (live and in /etc/selinux/config) or a single
 * SELinux boolean over SSH. `check` reports drift; `apply` converges it.
 */
export const model = {
  type: "@swamp/cfgmgmt/selinux",
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
      description: "Check if SELinux matches desired state (dry-run)",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info("Checking SELinux {setting} on {host}", {
          setting: g.boolean ?? g.mode ?? null,
          host: g.nodeHost,
        });
        try {
          if (!g.mode && !g.boolean) {
            throw new Error("Either mode or boolean must be specified");
          }
          if (g.mode && g.boolean) {
            throw new Error("mode and boolean are mutually exclusive");
          }
          if (g.boolean && !g.booleanValue) {
            throw new Error("booleanValue is required when boolean is set");
          }

          const client = await connect(g);
          const current = await gather(client, g);

          if (!current.selinuxInstalled) {
            throw new Error("SELinux is not installed on this system");
          }

          const changes = detectChanges(g, current);
          const handle = await context.writeResource("state", g.nodeHost, {
            status: changes.length === 0 ? "compliant" : "non_compliant",
            current,
            changes,
            error: null,
            timestamp: new Date().toISOString(),
          });
          context.logger.info("SELinux {setting} on {host} is {status}", {
            setting: g.boolean ?? g.mode ?? null,
            host: g.nodeHost,
            status: changes.length === 0 ? "compliant" : "non_compliant",
          });
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error(
            "Check SELinux {setting} failed on {host}: {error}",
            {
              setting: g.boolean ?? g.mode ?? null,
              host: g.nodeHost,
              error: errorMessage(err),
            },
          );
          await context.writeResource("state", g.nodeHost, {
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
      description: "Set SELinux mode or boolean value",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info("Applying SELinux {setting} on {host}", {
          setting: g.boolean ?? g.mode ?? null,
          host: g.nodeHost,
        });
        try {
          if (!g.mode && !g.boolean) {
            throw new Error("Either mode or boolean must be specified");
          }
          if (g.mode && g.boolean) {
            throw new Error("mode and boolean are mutually exclusive");
          }
          if (g.boolean && !g.booleanValue) {
            throw new Error("booleanValue is required when boolean is set");
          }

          const client = await connect(g);
          const current = await gather(client, g);

          if (!current.selinuxInstalled) {
            throw new Error("SELinux is not installed on this system");
          }

          const changes = detectChanges(g, current);

          if (changes.length === 0) {
            const handle = await context.writeResource("state", g.nodeHost, {
              status: "compliant",
              current,
              changes: [],
              error: null,
              timestamp: new Date().toISOString(),
            });
            context.logger.info("SELinux {setting} on {host} is {status}", {
              setting: g.boolean ?? g.mode ?? null,
              host: g.nodeHost,
              status: "compliant",
            });
            return { dataHandles: [handle] };
          }

          const so = sudoOpts(g);

          if (g.mode !== undefined) {
            if (
              current.currentMode !== g.mode &&
              g.mode !== "disabled" && current.currentMode !== "disabled"
            ) {
              const enforce = g.mode === "enforcing" ? "1" : "0";
              const result = await execSudo(
                client,
                `setenforce ${enforce}`,
                so,
              );
              if (result.exitCode !== 0) {
                throw new Error(`setenforce failed: ${result.stderr}`);
              }
            }

            if (current.configMode !== g.mode) {
              // sed alone silently does nothing when the file has no
              // SELINUX= line, so append one in that case.
              const cfg = "/etc/selinux/config";
              await execChecked(
                client,
                `if grep -q '^SELINUX=' ${cfg}; then ` +
                  `sed -i 's/^SELINUX=.*/SELINUX=${g.mode}/' ${cfg}; ` +
                  `else printf 'SELINUX=${g.mode}\\n' >> ${cfg}; fi`,
                so,
                `update ${cfg}`,
              );
            }

            if (
              (g.mode === "disabled" && current.currentMode !== "disabled") ||
              (g.mode !== "disabled" && current.currentMode === "disabled")
            ) {
              changes.push("reboot required for disabled<->enabled transition");
            }
          }

          if (g.boolean !== undefined && g.booleanValue !== undefined) {
            const result = await execSudo(
              client,
              `setsebool -P ${shellEscape(g.boolean)} ${g.booleanValue}`,
              so,
            );
            if (result.exitCode !== 0) {
              throw new Error(`setsebool failed: ${result.stderr}`);
            }
          }

          const updated = await gather(client, g);
          const handle = await context.writeResource("state", g.nodeHost, {
            status: "applied",
            current: updated,
            changes,
            error: null,
            timestamp: new Date().toISOString(),
          });
          context.logger.info("SELinux {setting} on {host} is {status}", {
            setting: g.boolean ?? g.mode ?? null,
            host: g.nodeHost,
            status: "applied",
          });
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error(
            "Apply SELinux {setting} failed on {host}: {error}",
            {
              setting: g.boolean ?? g.mode ?? null,
              host: g.nodeHost,
              error: errorMessage(err),
            },
          );
          await context.writeResource("state", g.nodeHost, {
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
