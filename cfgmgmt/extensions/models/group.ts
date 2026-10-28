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
import { execChecked, getentProbe } from "./_lib/checks.ts";
import type { SshConn } from "./_lib/ssh.ts";

const GlobalArgsSchema = z.object({
  groupname: z.string().describe("Group name to manage"),
  ensure: z.enum(["present", "absent"]).describe(
    "Whether group should be present or absent",
  ),
  gid: z.number().optional().describe("Desired GID"),
  members: z.array(z.string()).optional().describe("Group members"),
  system: z.boolean().optional().describe("Create as system group"),
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
  groupname: z.string().describe("Group name"),
  ensure: z.string().describe("Desired state (present or absent)"),
  status: z.enum(["compliant", "non_compliant", "applied", "failed"]).describe(
    "Compliance status",
  ),
  current: z.object({
    exists: z.boolean().describe("Whether the group currently exists"),
    gid: z.number().nullable().describe("Current GID"),
    members: z.array(z.string()).describe("Current group members"),
  }).describe("Current group state on the remote node"),
  changes: z.array(z.string()).describe("List of changes detected or applied"),
  error: z.string().nullable().describe("Error message if status is failed"),
  timestamp: z.string().describe("ISO 8601 timestamp"),
});

type Current = z.infer<typeof StateSchema>["current"];

/** Structured log fields naming what this run manages, and where. */
function logFields(g: GlobalArgs) {
  return { groupname: g.groupname, host: g.nodeHost };
}

function connect(g: GlobalArgs) {
  return getConnection({
    host: g.nodeHost,
    port: g.nodePort,
    username: g.nodeUser,
    privateKeyPath: g.nodeIdentityFile,
  });
}

async function gather(client: SshConn, groupname: string, g: GlobalArgs) {
  const so = sudoOpts(g);
  const result = await execChecked(
    client,
    getentProbe("group", groupname),
    so,
    `getent group ${groupname}`,
  );
  const line = result.stdout.trim();
  if (line === "NOTFOUND" || !line) {
    return {
      exists: false,
      gid: null,
      members: [] as string[],
    };
  }
  const parts = line.split(":");
  const gid = parseInt(parts[2], 10);
  const members = parts[3] ? parts[3].split(",").filter((m) => m).sort() : [];
  return { exists: true, gid, members };
}

function detectChanges(g: GlobalArgs, current: Current) {
  const changes: string[] = [];
  if (g.ensure === "present") {
    if (!current.exists) {
      changes.push("create group");
    } else {
      if (g.gid !== undefined && current.gid !== g.gid) {
        changes.push(`gid: ${current.gid} -> ${g.gid}`);
      }
      if (g.members !== undefined) {
        const desired = [...g.members].sort();
        const have = [...current.members].sort();
        if (JSON.stringify(desired) !== JSON.stringify(have)) {
          changes.push(
            `members: [${have.join(",")}] -> [${desired.join(",")}]`,
          );
        }
      }
    }
  } else {
    if (current.exists) changes.push("remove group");
  }
  return changes;
}

/**
 * `gpasswd -M` sets the full member list. An empty list escapes to '', which
 * gpasswd takes as "no members", clearing the group.
 */
export function membersCommand(members: string[], groupname: string): string {
  return `gpasswd -M ${shellEscape(members.join(","))} ${
    shellEscape(groupname)
  }`;
}

function emptyCurrent() {
  return { exists: false, gid: null, members: [] as string[] };
}

/**
 * Manages a local system group over SSH (gid, full member list, presence).
 * `check` reports drift without changing anything; `apply` runs
 * groupadd/groupmod/gpasswd/groupdel to converge.
 */
export const model = {
  type: "@swamp/cfgmgmt/group",
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
      description: "Check if group matches desired state (dry-run)",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info(
          "Checking group {groupname} on {host}",
          logFields(g),
        );
        try {
          const client = await connect(g);
          const current = await gather(client, g.groupname, g);
          const changes = detectChanges(g, current);
          const status = changes.length === 0 ? "compliant" : "non_compliant";
          const handle = await context.writeResource("state", g.nodeHost, {
            groupname: g.groupname,
            ensure: g.ensure,
            status,
            current,
            changes,
            error: null,
            timestamp: new Date().toISOString(),
          });
          context.logger.info(
            "Group {groupname} on {host} is {status} ({changeCount} changes)",
            {
              ...logFields(g),
              status: status,
              changeCount: changes.length,
            },
          );
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error(
            "Checking group {groupname} on {host} failed: {error}",
            {
              ...logFields(g),
              error: errorMessage(err),
            },
          );
          await context.writeResource("state", g.nodeHost, {
            groupname: g.groupname,
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
      description: "Create, modify, or remove a system group",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info(
          "Applying group {groupname} on {host}",
          logFields(g),
        );
        try {
          const client = await connect(g);
          const current = await gather(client, g.groupname, g);
          const changes = detectChanges(g, current);

          if (changes.length === 0) {
            const handle = await context.writeResource("state", g.nodeHost, {
              groupname: g.groupname,
              ensure: g.ensure,
              status: "compliant",
              current,
              changes: [],
              error: null,
              timestamp: new Date().toISOString(),
            });
            context.logger.info(
              "Group {groupname} on {host} is {status} ({changeCount} changes)",
              {
                ...logFields(g),
                status: "compliant",
                changeCount: changes.length,
              },
            );
            return { dataHandles: [handle] };
          }

          const so = sudoOpts(g);

          if (g.ensure === "absent") {
            const result = await execSudo(
              client,
              `groupdel ${shellEscape(g.groupname)}`,
              so,
            );
            if (result.exitCode !== 0) {
              throw new Error(`groupdel failed: ${result.stderr}`);
            }
          } else if (!current.exists) {
            const args: string[] = [];
            if (g.gid !== undefined) args.push("-g", String(g.gid));
            if (g.system) args.push("-r");
            args.push(shellEscape(g.groupname));
            const result = await execSudo(
              client,
              `groupadd ${args.join(" ")}`,
              so,
            );
            if (result.exitCode !== 0) {
              throw new Error(`groupadd failed: ${result.stderr}`);
            }
            if (g.members !== undefined && g.members.length > 0) {
              const memberResult = await execSudo(
                client,
                membersCommand(g.members, g.groupname),
                so,
              );
              if (memberResult.exitCode !== 0) {
                throw new Error(
                  `gpasswd -M failed: ${memberResult.stderr}`,
                );
              }
            }
          } else {
            if (g.gid !== undefined && current.gid !== g.gid) {
              const result = await execSudo(
                client,
                `groupmod -g ${g.gid} ${shellEscape(g.groupname)}`,
                so,
              );
              if (result.exitCode !== 0) {
                throw new Error(`groupmod failed: ${result.stderr}`);
              }
            }
            if (g.members !== undefined) {
              const desired = [...g.members].sort();
              const have = [...current.members].sort();
              if (JSON.stringify(desired) !== JSON.stringify(have)) {
                const result = await execSudo(
                  client,
                  membersCommand(g.members, g.groupname),
                  so,
                );
                if (result.exitCode !== 0) {
                  throw new Error(
                    `gpasswd -M failed: ${result.stderr}`,
                  );
                }
              }
            }
          }

          const updated = await gather(client, g.groupname, g);
          const handle = await context.writeResource("state", g.nodeHost, {
            groupname: g.groupname,
            ensure: g.ensure,
            status: "applied",
            current: updated,
            changes,
            error: null,
            timestamp: new Date().toISOString(),
          });
          context.logger.info(
            "Group {groupname} on {host} is {status} ({changeCount} changes)",
            {
              ...logFields(g),
              status: "applied",
              changeCount: changes.length,
            },
          );
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error(
            "Applying group {groupname} on {host} failed: {error}",
            {
              ...logFields(g),
              error: errorMessage(err),
            },
          );
          await context.writeResource("state", g.nodeHost, {
            groupname: g.groupname,
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
