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
import {
  execSudo,
  getConnection,
  shellEscape,
  writeFileAs,
} from "./_lib/ssh.ts";
import type { SshConn } from "./_lib/ssh.ts";

const GlobalArgsSchema = z.object({
  key: z.string().describe("Sysctl key (e.g. net.ipv4.ip_forward)"),
  value: z.string().describe("Desired value"),
  ensure: z.enum(["present", "absent"]).default("present").describe(
    "Whether the sysctl parameter should be present or absent",
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
  liveValue: string | null;
  persisted: boolean;
  persistedValue: string | null;
}

function sudoOpts(g: GlobalArgs) {
  return {
    become: g.become,
    becomeUser: g.becomeUser,
    becomePassword: g.becomePassword,
  };
}

const StateSchema = z.object({
  key: z.string().describe("Sysctl key"),
  value: z.string().describe("Desired value"),
  ensure: z.string().describe("Desired state"),
  status: z.enum(["compliant", "non_compliant", "applied", "failed"]).describe(
    "Compliance status",
  ),
  current: z.object({
    liveValue: z.string().nullable().describe("Current live kernel value"),
    persisted: z.boolean().describe("Whether a persistence file exists"),
    persistedValue: z.string().nullable().describe("Value in persistence file"),
  }).describe("Current sysctl state"),
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

function confPath(key: string): string {
  // sysctl also accepts "/" as the key separator; mapping it too keeps the
  // file directly in /etc/sysctl.d rather than in a (missing) subdirectory.
  return `/etc/sysctl.d/99-cfgmgmt-${key.replace(/[./]/g, "-")}.conf`;
}

async function gather(client: SshConn, g: GlobalArgs): Promise<Current> {
  const so = sudoOpts(g);
  const liveResult = await execSudo(
    client,
    `sysctl -n ${shellEscape(g.key)} 2>/dev/null`,
    so,
  );
  const liveValue = liveResult.exitCode === 0 ? liveResult.stdout.trim() : null;

  const path = confPath(g.key);
  const fileResult = await execSudo(
    client,
    `cat ${shellEscape(path)} 2>/dev/null`,
    so,
  );

  let persisted = false;
  let persistedValue: string | null = null;
  if (fileResult.exitCode === 0 && fileResult.stdout.trim()) {
    persisted = true;
    const match = fileResult.stdout.match(/=\s*(.+)/);
    persistedValue = match ? match[1].trim() : null;
  }

  return { liveValue, persisted, persistedValue };
}

/**
 * Multi-value keys (e.g. net.ipv4.tcp_rmem) read back tab-separated from
 * `sysctl -n`, so whitespace runs compare as a single space.
 */
function normalizeValue(v: string | null): string | null {
  return v === null ? null : v.trim().replace(/\s+/g, " ");
}

function detectChanges(g: GlobalArgs, current: Current) {
  const changes: string[] = [];
  const want = normalizeValue(g.value);
  if (g.ensure === "present") {
    if (normalizeValue(current.liveValue) !== want) {
      changes.push(`live value: ${current.liveValue} -> ${g.value}`);
    }
    if (
      !current.persisted || normalizeValue(current.persistedValue) !== want
    ) {
      changes.push("update persistence file");
    }
  } else {
    if (current.persisted) {
      changes.push("remove persistence file");
    }
  }
  return changes;
}

function emptyCurrent(): Current {
  return { liveValue: null, persisted: false, persistedValue: null };
}

/**
 * Manages a sysctl kernel parameter over SSH: its live value and a
 * persistence file in /etc/sysctl.d. `check` reports drift; `apply` sets or
 * removes the parameter.
 */
export const model = {
  type: "@swamp/cfgmgmt/sysctl",
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
      description: "Check if sysctl parameter matches desired state (dry-run)",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info("Checking sysctl {key} on {host}", {
          key: g.key,
          host: g.nodeHost,
        });
        try {
          const client = await connect(g);
          const current = await gather(client, g);
          const changes = detectChanges(g, current);
          const handle = await context.writeResource("state", g.nodeHost, {
            key: g.key,
            value: g.value,
            ensure: g.ensure,
            status: changes.length === 0 ? "compliant" : "non_compliant",
            current,
            changes,
            error: null,
            timestamp: new Date().toISOString(),
          });
          context.logger.info("Sysctl {key} on {host} is {status}", {
            key: g.key,
            host: g.nodeHost,
            status: changes.length === 0 ? "compliant" : "non_compliant",
          });
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error("Check sysctl {key} failed on {host}: {error}", {
            key: g.key,
            host: g.nodeHost,
            error: errorMessage(err),
          });
          await context.writeResource("state", g.nodeHost, {
            key: g.key,
            value: g.value,
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
    apply: {
      description: "Set or remove a sysctl kernel parameter",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info("Applying sysctl {key} on {host}", {
          key: g.key,
          host: g.nodeHost,
        });
        try {
          const client = await connect(g);
          const current = await gather(client, g);
          const changes = detectChanges(g, current);

          if (changes.length === 0) {
            const handle = await context.writeResource("state", g.nodeHost, {
              key: g.key,
              value: g.value,
              ensure: g.ensure,
              status: "compliant",
              current,
              changes: [],
              error: null,
              timestamp: new Date().toISOString(),
            });
            context.logger.info("Sysctl {key} on {host} is {status}", {
              key: g.key,
              host: g.nodeHost,
              status: "compliant",
            });
            return { dataHandles: [handle] };
          }

          const so = sudoOpts(g);
          const path = confPath(g.key);

          if (g.ensure === "present") {
            await writeFileAs(
              client,
              path,
              `${g.key} = ${g.value}\n`,
              so,
            );
            const result = await execSudo(
              client,
              `sysctl -w ${shellEscape(g.key + "=" + g.value)}`,
              so,
            );
            if (result.exitCode !== 0) {
              throw new Error(`sysctl -w failed: ${result.stderr}`);
            }
          } else {
            await execChecked(
              client,
              `rm -f ${shellEscape(path)}`,
              so,
              `remove ${path}`,
            );
            // Not checked: `sysctl --system` exits non-zero when any key in
            // any file is unknown to this kernel, which is common and not ours.
            await execSudo(client, `sysctl --system`, so);
          }

          const updated = await gather(client, g);
          const handle = await context.writeResource("state", g.nodeHost, {
            key: g.key,
            value: g.value,
            ensure: g.ensure,
            status: "applied",
            current: updated,
            changes,
            error: null,
            timestamp: new Date().toISOString(),
          });
          context.logger.info("Sysctl {key} on {host} is {status}", {
            key: g.key,
            host: g.nodeHost,
            status: "applied",
          });
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error("Apply sysctl {key} failed on {host}: {error}", {
            key: g.key,
            host: g.nodeHost,
            error: errorMessage(err),
          });
          await context.writeResource("state", g.nodeHost, {
            key: g.key,
            value: g.value,
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
