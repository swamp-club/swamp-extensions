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
  username: z.string().describe("Username to manage"),
  ensure: z.enum(["present", "absent"]).describe(
    "Whether user should be present or absent",
  ),
  uid: z.number().optional().describe("Desired UID"),
  gid: z.number().optional().describe("Desired primary GID"),
  groups: z.array(z.string()).optional().describe(
    "Supplementary groups",
  ),
  home: z.string().optional().describe("Home directory path"),
  shell: z.string().optional().describe("Login shell"),
  system: z.boolean().optional().describe("Create as system user"),
  managehome: z.boolean().default(false).describe(
    "Manage home directory (create with useradd -m, remove with userdel -r)",
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

function sudoOpts(g: GlobalArgs) {
  return {
    become: g.become,
    becomeUser: g.becomeUser,
    becomePassword: g.becomePassword,
  };
}

const StateSchema = z.object({
  username: z.string().describe("Username"),
  ensure: z.string().describe("Desired state (present or absent)"),
  status: z.enum(["compliant", "non_compliant", "applied", "failed"]).describe(
    "Compliance status",
  ),
  current: z.object({
    exists: z.boolean().describe("Whether the user currently exists"),
    uid: z.number().nullable().describe("Current UID"),
    gid: z.number().nullable().describe("Current primary GID"),
    groups: z.array(z.string()).describe("Current supplementary groups"),
    home: z.string().nullable().describe("Current home directory"),
    shell: z.string().nullable().describe("Current login shell"),
  }).describe("Current user state on the remote node"),
  changes: z.array(z.string()).describe("List of changes detected or applied"),
  error: z.string().nullable().describe("Error message if status is failed"),
  timestamp: z.string().describe("ISO 8601 timestamp"),
});

type Current = z.infer<typeof StateSchema>["current"];

/** Structured log fields naming what this run manages, and where. */
function logFields(g: GlobalArgs) {
  return { username: g.username, host: g.nodeHost };
}

function connect(g: GlobalArgs) {
  return getConnection({
    host: g.nodeHost,
    port: g.nodePort,
    username: g.nodeUser,
    privateKeyPath: g.nodeIdentityFile,
  });
}

async function gather(client: SshConn, username: string, g: GlobalArgs) {
  const so = sudoOpts(g);
  const pw = await execChecked(
    client,
    getentProbe("passwd", username),
    so,
    `getent passwd ${username}`,
  );
  const line = pw.stdout.trim();
  if (line === "NOTFOUND" || !line) {
    return {
      exists: false,
      uid: null,
      gid: null,
      groups: [] as string[],
      home: null,
      shell: null,
    };
  }
  const parts = line.split(":");
  const uid = parseInt(parts[2], 10);
  const gid = parseInt(parts[3], 10);
  const home = parts[5];
  const shell = parts[6];

  const primaryGroup = await execSudo(
    client,
    `id -gn ${shellEscape(username)} 2>/dev/null`,
    so,
  );
  const primaryGroupName = primaryGroup.stdout.trim();

  const allGroups = await execSudo(
    client,
    `id -nG ${shellEscape(username)} 2>/dev/null`,
    so,
  );
  const groupList = allGroups.stdout.trim().split(/\s+/).filter((name) =>
    name && name !== primaryGroupName
  );

  return { exists: true, uid, gid, groups: groupList.sort(), home, shell };
}

function detectChanges(g: GlobalArgs, current: Current) {
  const changes: string[] = [];
  if (g.ensure === "present") {
    if (!current.exists) {
      changes.push("create user");
    } else {
      if (g.uid !== undefined && current.uid !== g.uid) {
        changes.push(`uid: ${current.uid} -> ${g.uid}`);
      }
      if (g.gid !== undefined && current.gid !== g.gid) {
        changes.push(`gid: ${current.gid} -> ${g.gid}`);
      }
      if (g.home !== undefined && current.home !== g.home) {
        changes.push(`home: ${current.home} -> ${g.home}`);
      }
      if (g.shell !== undefined && current.shell !== g.shell) {
        changes.push(`shell: ${current.shell} -> ${g.shell}`);
      }
      if (g.groups !== undefined) {
        const desired = [...g.groups].sort();
        const have = [...current.groups].sort();
        if (JSON.stringify(desired) !== JSON.stringify(have)) {
          changes.push(
            `groups: [${have.join(",")}] -> [${desired.join(",")}]`,
          );
        }
      }
    }
  } else {
    if (current.exists) changes.push("remove user");
  }
  return changes;
}

function emptyCurrent() {
  return {
    exists: false,
    uid: null,
    gid: null,
    groups: [] as string[],
    home: null,
    shell: null,
  };
}

/**
 * Manages a local system user over SSH (uid, primary gid, supplementary groups,
 * home, shell, presence). `check` reports drift without changing anything;
 * `apply` runs useradd/usermod/userdel to converge.
 */
export const model = {
  type: "@swamp/cfgmgmt/user",
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
      description: "Check if user matches desired state (dry-run)",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info("Checking user {username} on {host}", logFields(g));
        try {
          const client = await connect(g);
          const current = await gather(client, g.username, g);
          const changes = detectChanges(g, current);
          const status = changes.length === 0 ? "compliant" : "non_compliant";
          const handle = await context.writeResource("state", g.nodeHost, {
            username: g.username,
            ensure: g.ensure,
            status,
            current,
            changes,
            error: null,
            timestamp: new Date().toISOString(),
          });
          context.logger.info(
            "User {username} on {host} is {status} ({changeCount} changes)",
            {
              ...logFields(g),
              status: status,
              changeCount: changes.length,
            },
          );
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error(
            "Checking user {username} on {host} failed: {error}",
            {
              ...logFields(g),
              error: errorMessage(err),
            },
          );
          await context.writeResource("state", g.nodeHost, {
            username: g.username,
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
      description: "Create, modify, or remove a system user",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info("Applying user {username} on {host}", logFields(g));
        try {
          const client = await connect(g);
          const current = await gather(client, g.username, g);
          const changes = detectChanges(g, current);

          if (changes.length === 0) {
            const handle = await context.writeResource("state", g.nodeHost, {
              username: g.username,
              ensure: g.ensure,
              status: "compliant",
              current,
              changes: [],
              error: null,
              timestamp: new Date().toISOString(),
            });
            context.logger.info(
              "User {username} on {host} is {status} ({changeCount} changes)",
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
            const flags = g.managehome ? "-r" : "";
            const result = await execSudo(
              client,
              `userdel ${flags} ${shellEscape(g.username)}`,
              so,
            );
            if (result.exitCode !== 0) {
              throw new Error(`userdel failed: ${result.stderr}`);
            }
          } else if (!current.exists) {
            const args: string[] = [];
            if (g.uid !== undefined) args.push("-u", String(g.uid));
            if (g.gid !== undefined) args.push("-g", String(g.gid));
            if (g.groups !== undefined && g.groups.length > 0) {
              args.push("-G", shellEscape(g.groups.join(",")));
            }
            if (g.home !== undefined) args.push("-d", shellEscape(g.home));
            if (g.shell !== undefined) args.push("-s", shellEscape(g.shell));
            if (g.system) args.push("-r");
            if (g.managehome) args.push("-m");
            args.push(shellEscape(g.username));
            const result = await execSudo(
              client,
              `useradd ${args.join(" ")}`,
              so,
            );
            if (result.exitCode !== 0) {
              throw new Error(`useradd failed: ${result.stderr}`);
            }
          } else {
            const args: string[] = [];
            if (g.uid !== undefined && current.uid !== g.uid) {
              args.push("-u", String(g.uid));
            }
            if (g.gid !== undefined && current.gid !== g.gid) {
              args.push("-g", String(g.gid));
            }
            if (
              g.groups !== undefined &&
              JSON.stringify([...g.groups].sort()) !==
                JSON.stringify([...current.groups].sort())
            ) {
              args.push("-G", shellEscape(g.groups.join(",")));
            }
            if (g.home !== undefined && current.home !== g.home) {
              args.push("-d", shellEscape(g.home));
              if (g.managehome) args.push("-m");
            }
            if (g.shell !== undefined && current.shell !== g.shell) {
              args.push("-s", shellEscape(g.shell));
            }
            if (args.length > 0) {
              args.push(shellEscape(g.username));
              const result = await execSudo(
                client,
                `usermod ${args.join(" ")}`,
                so,
              );
              if (result.exitCode !== 0) {
                throw new Error(`usermod failed: ${result.stderr}`);
              }
            }
          }

          const updated = await gather(client, g.username, g);
          const handle = await context.writeResource("state", g.nodeHost, {
            username: g.username,
            ensure: g.ensure,
            status: "applied",
            current: updated,
            changes,
            error: null,
            timestamp: new Date().toISOString(),
          });
          context.logger.info(
            "User {username} on {host} is {status} ({changeCount} changes)",
            {
              ...logFields(g),
              status: "applied",
              changeCount: changes.length,
            },
          );
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error(
            "Applying user {username} on {host} failed: {error}",
            {
              ...logFields(g),
              error: errorMessage(err),
            },
          );
          await context.writeResource("state", g.nodeHost, {
            username: g.username,
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
