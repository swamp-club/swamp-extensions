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
  timezone: z.string().regex(
    /^[A-Za-z0-9_+-]+(\/[A-Za-z0-9_+-]+)*$/,
    "must be an IANA timezone name such as Europe/London",
  ).describe(
    "Desired IANA timezone (e.g. America/New_York)",
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
  timezone: string | null;
  utcOffset: string | null;
}

function sudoOpts(g: GlobalArgs) {
  return {
    become: g.become,
    becomeUser: g.becomeUser,
    becomePassword: g.becomePassword,
  };
}

const StateSchema = z.object({
  timezone: z.string().describe("Desired timezone"),
  status: z.enum(["compliant", "non_compliant", "applied", "failed"]).describe(
    "Compliance status",
  ),
  current: z.object({
    timezone: z.string().nullable().describe("Current timezone"),
    utcOffset: z.string().nullable().describe("Current UTC offset"),
  }).describe("Current timezone state on the remote node"),
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

  let tz: string | null = null;
  const timedatectl = await execSudo(
    client,
    `timedatectl show --property=Timezone --value 2>/dev/null`,
    so,
  );
  if (timedatectl.exitCode === 0 && timedatectl.stdout.trim()) {
    tz = timedatectl.stdout.trim();
  } else {
    const etcTz = await execSudo(
      client,
      `cat /etc/timezone 2>/dev/null`,
      so,
    );
    if (etcTz.exitCode === 0 && etcTz.stdout.trim()) {
      tz = etcTz.stdout.trim();
    } else {
      const link = await execSudo(
        client,
        `readlink /etc/localtime 2>/dev/null | sed 's|.*/zoneinfo/||'`,
        so,
      );
      if (link.exitCode === 0 && link.stdout.trim()) {
        tz = link.stdout.trim();
      }
    }
  }

  const offsetResult = await execSudo(client, `date +%z`, so);
  const utcOffset = offsetResult.stdout.trim() || null;

  return { timezone: tz, utcOffset };
}

function detectChanges(g: GlobalArgs, current: Current) {
  const changes: string[] = [];
  if (current.timezone !== g.timezone) {
    changes.push(`timezone: ${current.timezone} -> ${g.timezone}`);
  }
  return changes;
}

function emptyCurrent(): Current {
  return { timezone: null, utcOffset: null };
}

/**
 * Manages the system timezone over SSH. `check` reports drift; `apply` sets
 * it via timedatectl, falling back to /etc/localtime and /etc/timezone.
 */
export const model = {
  type: "@swamp/cfgmgmt/timezone",
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
      description: "Check if timezone matches desired state (dry-run)",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info("Checking timezone {timezone} on {host}", {
          timezone: g.timezone,
          host: g.nodeHost,
        });
        try {
          const client = await connect(g);
          const current = await gather(client, g);
          const changes = detectChanges(g, current);
          const handle = await context.writeResource("state", g.nodeHost, {
            timezone: g.timezone,
            status: changes.length === 0 ? "compliant" : "non_compliant",
            current,
            changes,
            error: null,
            timestamp: new Date().toISOString(),
          });
          context.logger.info("Timezone {timezone} on {host} is {status}", {
            timezone: g.timezone,
            host: g.nodeHost,
            status: changes.length === 0 ? "compliant" : "non_compliant",
          });
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error(
            "Check timezone {timezone} failed on {host}: {error}",
            {
              timezone: g.timezone,
              host: g.nodeHost,
              error: errorMessage(err),
            },
          );
          await context.writeResource("state", g.nodeHost, {
            timezone: g.timezone,
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
      description: "Set the system timezone to the desired value",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info("Applying timezone {timezone} on {host}", {
          timezone: g.timezone,
          host: g.nodeHost,
        });
        try {
          const client = await connect(g);
          const current = await gather(client, g);
          const changes = detectChanges(g, current);

          if (changes.length === 0) {
            const handle = await context.writeResource("state", g.nodeHost, {
              timezone: g.timezone,
              status: "compliant",
              current,
              changes: [],
              error: null,
              timestamp: new Date().toISOString(),
            });
            context.logger.info("Timezone {timezone} on {host} is {status}", {
              timezone: g.timezone,
              host: g.nodeHost,
              status: "compliant",
            });
            return { dataHandles: [handle] };
          }

          const so = sudoOpts(g);

          const validate = await execSudo(
            client,
            `test -f /usr/share/zoneinfo/${shellEscape(g.timezone)}`,
            so,
          );
          if (validate.exitCode !== 0) {
            throw new Error(`Invalid timezone: ${g.timezone}`);
          }

          const timedatectlCheck = await execSudo(
            client,
            "command -v timedatectl",
            so,
          );
          // timedatectl can exist yet fail (e.g. no D-Bus in a container:
          // "Failed to connect to bus"); fall back to the non-systemd path.
          let timedatectlError: string | null = null;
          if (timedatectlCheck.exitCode === 0) {
            const result = await execSudo(
              client,
              `timedatectl set-timezone ${shellEscape(g.timezone)}`,
              so,
            );
            if (result.exitCode !== 0) {
              const detail = result.stderr.trim() || result.stdout.trim();
              timedatectlError =
                `timedatectl set-timezone failed with exit code ${result.exitCode}${
                  detail ? `: ${detail}` : ""
                }`;
            }
          }
          if (timedatectlCheck.exitCode !== 0 || timedatectlError !== null) {
            try {
              await execChecked(
                client,
                `ln -sf /usr/share/zoneinfo/${
                  shellEscape(g.timezone)
                } /etc/localtime`,
                so,
                "ln /etc/localtime",
              );
              await writeFileAs(
                client,
                "/etc/timezone",
                g.timezone + "\n",
                so,
              );
            } catch (fallbackErr) {
              if (timedatectlError === null) throw fallbackErr;
              throw new Error(
                `${timedatectlError}; fallback also failed: ${
                  errorMessage(fallbackErr)
                }`,
              );
            }
          }

          const updated = await gather(client, g);
          const handle = await context.writeResource("state", g.nodeHost, {
            timezone: g.timezone,
            status: "applied",
            current: updated,
            changes,
            error: null,
            timestamp: new Date().toISOString(),
          });
          context.logger.info("Timezone {timezone} on {host} is {status}", {
            timezone: g.timezone,
            host: g.nodeHost,
            status: "applied",
          });
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error(
            "Apply timezone {timezone} failed on {host}: {error}",
            {
              timezone: g.timezone,
              host: g.nodeHost,
              error: errorMessage(err),
            },
          );
          await context.writeResource("state", g.nodeHost, {
            timezone: g.timezone,
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
