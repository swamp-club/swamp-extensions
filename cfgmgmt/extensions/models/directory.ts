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
import { getConnection, shellEscape } from "./_lib/ssh.ts";
import type { SshConn } from "./_lib/ssh.ts";
import { execChecked, normalizeMode, statProbe } from "./_lib/checks.ts";

const GlobalArgsSchema = z.object({
  path: z.string().describe("Absolute path of the directory"),
  ensure: z.enum(["present", "absent"]).describe(
    "Whether directory should be present or absent",
  ),
  owner: z.string().optional().describe("Directory owner"),
  group: z.string().optional().describe("Directory group"),
  mode: z.string().regex(/^[0-7]{3,4}$/, "Mode must be 3-4 octal digits")
    .optional().describe(
      "Directory permissions in octal (e.g. 0755)",
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
  exists: boolean;
  isDirectory: boolean;
  owner: string | null;
  group: string | null;
  mode: string | null;
}

function sudoOpts(g: GlobalArgs) {
  return {
    become: g.become,
    becomeUser: g.becomeUser,
    becomePassword: g.becomePassword,
  };
}

const StateSchema = z.object({
  path: z.string().describe("Directory path"),
  ensure: z.string().describe("Desired state (present or absent)"),
  status: z.enum(["compliant", "non_compliant", "applied", "failed"]).describe(
    "Compliance status",
  ),
  current: z.object({
    exists: z.boolean().describe("Whether the directory currently exists"),
    isDirectory: z.boolean().describe("Whether the path is a directory"),
    owner: z.string().nullable().describe("Current owner"),
    group: z.string().nullable().describe("Current group"),
    mode: z.string().nullable().describe("Current permissions"),
  }).describe("Current directory state on the remote node"),
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

async function gather(
  client: SshConn,
  path: string,
  g: GlobalArgs,
): Promise<Current> {
  const so = sudoOpts(g);
  const statResult = await execChecked(
    client,
    statProbe(path, "%F|%U|%G|%a"),
    so,
    `stat ${path}`,
  );
  const line = statResult.stdout.trim();
  if (line === "NOTFOUND") {
    return {
      exists: false,
      isDirectory: false,
      owner: null,
      group: null,
      mode: null,
    };
  }
  const parts = line.split("|");
  if (parts.length < 4) {
    throw new Error(`Unexpected stat output for ${path}: ${line}`);
  }
  const [fileType, owner, group, mode] = parts;
  return {
    exists: true,
    isDirectory: fileType === "directory",
    owner,
    group,
    mode: normalizeMode(mode),
  };
}

function detectChanges(g: GlobalArgs, current: Current) {
  const changes: string[] = [];
  if (g.ensure === "present") {
    if (!current.exists) {
      changes.push("create directory");
    } else if (!current.isDirectory) {
      changes.push("path exists but is not a directory");
    }
    if (g.owner && current.owner !== g.owner) {
      changes.push(`owner: ${current.owner} -> ${g.owner}`);
    }
    if (g.group && current.group !== g.group) {
      changes.push(`group: ${current.group} -> ${g.group}`);
    }
    if (g.mode && current.mode !== normalizeMode(g.mode)) {
      changes.push(`mode: ${current.mode} -> ${g.mode}`);
    }
  } else if (current.isDirectory) {
    changes.push("remove directory");
  } else if (current.exists) {
    changes.push("path exists but is not a directory");
  }
  return changes;
}

/**
 * Manages a directory on a remote node over SSH: its presence, owner, group and mode. `check` reports drift without changing anything; `apply` converges the directory to the desired state.
 */
export const model = {
  type: "@swamp/cfgmgmt/directory",
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
      description: "Check if directory matches desired state (dry-run)",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info("Checking directory {path} on {host}", {
          path: g.path,
          host: g.nodeHost,
        });
        try {
          const client = await connect(g);
          const current = await gather(client, g.path, g);
          const changes = detectChanges(g, current);
          const handle = await context.writeResource("state", g.nodeHost, {
            path: g.path,
            ensure: g.ensure,
            status: changes.length === 0 ? "compliant" : "non_compliant",
            current,
            changes,
            error: null,
            timestamp: new Date().toISOString(),
          });
          context.logger.info("Directory {path} on {host} is {status}", {
            path: g.path,
            host: g.nodeHost,
            status: changes.length === 0 ? "compliant" : "non_compliant",
          });
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error(
            "Check of directory {path} failed on {host}: {error}",
            {
              path: g.path,
              host: g.nodeHost,
              error: errorMessage(err),
            },
          );
          await context.writeResource("state", g.nodeHost, {
            path: g.path,
            ensure: g.ensure,
            status: "failed",
            current: {
              exists: false,
              isDirectory: false,
              owner: null,
              group: null,
              mode: null,
            },
            changes: [],
            error: errorMessage(err),
            timestamp: new Date().toISOString(),
          });
          throw err;
        }
      },
    },
    apply: {
      description: "Apply desired directory state to the remote node",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info("Applying directory {path} on {host}", {
          path: g.path,
          host: g.nodeHost,
        });
        try {
          const client = await connect(g);
          const current = await gather(client, g.path, g);
          const changes = detectChanges(g, current);

          if (changes.length === 0) {
            const handle = await context.writeResource("state", g.nodeHost, {
              path: g.path,
              ensure: g.ensure,
              status: "compliant",
              current,
              changes: [],
              error: null,
              timestamp: new Date().toISOString(),
            });
            context.logger.info("Directory {path} on {host} is {status}", {
              path: g.path,
              host: g.nodeHost,
              status: "compliant",
            });
            return { dataHandles: [handle] };
          }

          if (g.ensure === "absent" && !current.isDirectory) {
            // `rm -rf` would delete a regular file (or a symlink) that this
            // model was never asked to manage.
            throw new Error(
              `${g.path} exists but is not a directory; refusing to remove it`,
            );
          }

          const so = sudoOpts(g);
          if (g.ensure === "absent") {
            await execChecked(
              client,
              `rm -rf ${shellEscape(g.path)}`,
              so,
              "rm",
            );
          } else {
            await execChecked(
              client,
              `mkdir -p ${shellEscape(g.path)}`,
              so,
              "mkdir",
            );
            if (g.owner || g.group) {
              const ownership = g.group
                ? `${g.owner || ""}:${g.group}`
                : g.owner!;
              await execChecked(
                client,
                `chown ${shellEscape(ownership)} ${shellEscape(g.path)}`,
                so,
                "chown",
              );
            }
            if (g.mode) {
              await execChecked(
                client,
                `chmod ${g.mode} ${shellEscape(g.path)}`,
                so,
                "chmod",
              );
            }
          }

          const updated = await gather(client, g.path, g);
          const handle = await context.writeResource("state", g.nodeHost, {
            path: g.path,
            ensure: g.ensure,
            status: "applied",
            current: updated,
            changes,
            error: null,
            timestamp: new Date().toISOString(),
          });
          context.logger.info("Directory {path} on {host} is {status}", {
            path: g.path,
            host: g.nodeHost,
            status: "applied",
          });
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error(
            "Apply of directory {path} failed on {host}: {error}",
            {
              path: g.path,
              host: g.nodeHost,
              error: errorMessage(err),
            },
          );
          await context.writeResource("state", g.nodeHost, {
            path: g.path,
            ensure: g.ensure,
            status: "failed",
            current: {
              exists: false,
              isDirectory: false,
              owner: null,
              group: null,
              mode: null,
            },
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
