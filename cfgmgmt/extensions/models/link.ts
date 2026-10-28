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
import type { SshConn } from "./_lib/ssh.ts";
import { execChecked } from "./_lib/checks.ts";

const GlobalArgsSchema = z.object({
  path: z.string().describe("Path where the symlink should exist"),
  ensure: z.enum(["present", "absent"]).describe(
    "Whether symlink should be present or absent",
  ),
  target: z.string().optional().describe("Target the symlink should point to"),
  owner: z.string().optional().describe("Symlink owner"),
  group: z.string().optional().describe("Symlink group"),
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
  path: z.string().describe("Symlink path"),
  ensure: z.string().describe("Desired state (present or absent)"),
  status: z.enum(["compliant", "non_compliant", "applied", "failed"]).describe(
    "Compliance status",
  ),
  current: z.object({
    exists: z.boolean().describe("Whether something exists at the path"),
    isLink: z.boolean().describe("Whether the path is a symbolic link"),
    linkTarget: z.string().nullable().describe("Current symlink target"),
    owner: z.string().nullable().describe("Current owner"),
    group: z.string().nullable().describe("Current group"),
  }).describe("Current symlink state on the remote node"),
  changes: z.array(z.string()).describe("List of changes detected or applied"),
  error: z.string().nullable().describe("Error message if status is failed"),
  timestamp: z.string().describe("ISO 8601 timestamp"),
});

type Current = z.infer<typeof StateSchema>["current"];

function connect(g: GlobalArgs) {
  return getConnection({
    host: g.nodeHost,
    port: g.nodePort,
    username: g.nodeUser,
    privateKeyPath: g.nodeIdentityFile,
  });
}

async function gather(client: SshConn, path: string, g: GlobalArgs) {
  const so = sudoOpts(g);
  const testResult = await execSudo(
    client,
    `test -L ${shellEscape(path)} && echo ISLINK || echo NOTLINK`,
    so,
  );
  const isLink = testResult.stdout.trim() === "ISLINK";

  if (!isLink) {
    const existsResult = await execSudo(
      client,
      `test -e ${shellEscape(path)} && echo EXISTS || echo NOTEXISTS`,
      so,
    );
    if (existsResult.stdout.trim() === "NOTEXISTS") {
      return {
        exists: false,
        isLink: false,
        linkTarget: null,
        owner: null,
        group: null,
      };
    }
    const statResult = await execSudo(
      client,
      `stat -c '%U|%G' ${shellEscape(path)} 2>/dev/null`,
      so,
    );
    const parts1 = statResult.stdout.trim().split("|");
    const owner1 = parts1.length >= 2 ? parts1[0] || null : null;
    const group1 = parts1.length >= 2 ? parts1[1] || null : null;
    return {
      exists: true,
      isLink: false,
      linkTarget: null,
      owner: owner1,
      group: group1,
    };
  }

  const targetResult = await execSudo(
    client,
    `readlink ${shellEscape(path)}`,
    so,
  );
  const linkTarget = targetResult.stdout.trim();

  const statResult = await execSudo(
    client,
    `stat -c '%U|%G' ${shellEscape(path)} 2>/dev/null`,
    so,
  );
  const parts2 = statResult.stdout.trim().split("|");
  const owner = parts2.length >= 2 ? parts2[0] || null : null;
  const group = parts2.length >= 2 ? parts2[1] || null : null;

  return { exists: true, isLink: true, linkTarget, owner, group };
}

/** ensure=present needs a target; fail clearly instead of crashing later. */
function validateArgs(g: GlobalArgs) {
  if (g.ensure === "present" && g.target === undefined) {
    throw new Error("target is required when ensure is present");
  }
}

function detectChanges(g: GlobalArgs, current: Current) {
  const changes = [];
  if (g.ensure === "present") {
    if (!current.exists) {
      changes.push("create symlink");
    } else if (!current.isLink) {
      changes.push("path exists but is not a symlink");
    } else if (g.target && current.linkTarget !== g.target) {
      changes.push(`target: ${current.linkTarget} -> ${g.target}`);
    }
    if (g.owner && current.owner !== g.owner) {
      changes.push(`owner: ${current.owner} -> ${g.owner}`);
    }
    if (g.group && current.group !== g.group) {
      changes.push(`group: ${current.group} -> ${g.group}`);
    }
  } else if (current.isLink) {
    changes.push("remove symlink");
  } else if (current.exists) {
    changes.push("path exists but is not a symlink");
  }
  return changes;
}

/**
 * Manages a symbolic link on a remote node over SSH: its presence, target, owner and group. `check` reports drift without changing anything; `apply` converges the link.
 */
export const model = {
  type: "@swamp/cfgmgmt/link",
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
      description: "Check if symlink matches desired state (dry-run)",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info("Checking symlink {path} on {host}", {
          path: g.path,
          host: g.nodeHost,
        });
        try {
          validateArgs(g);
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
          context.logger.info("Symlink {path} on {host} is {status}", {
            path: g.path,
            host: g.nodeHost,
            status: changes.length === 0 ? "compliant" : "non_compliant",
          });
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error(
            "Check of symlink {path} failed on {host}: {error}",
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
              isLink: false,
              linkTarget: null,
              owner: null,
              group: null,
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
      description: "Apply desired symlink state to the remote node",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info("Applying symlink {path} on {host}", {
          path: g.path,
          host: g.nodeHost,
        });
        try {
          validateArgs(g);
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
            context.logger.info("Symlink {path} on {host} is {status}", {
              path: g.path,
              host: g.nodeHost,
              status: "compliant",
            });
            return { dataHandles: [handle] };
          }

          const so = sudoOpts(g);
          if (current.exists && !current.isLink) {
            // Never delete a real file or directory to satisfy ensure=absent,
            // and never `ln` onto a directory: that creates the link inside
            // it while the path itself stays a directory.
            const refuse = g.ensure === "absent" ||
              (await execSudo(client, `test -d ${shellEscape(g.path)}`, so))
                  .exitCode === 0;
            if (refuse) {
              throw new Error(
                `${g.path} exists but is not a symlink; refusing to ${
                  g.ensure === "absent" ? "remove" : "replace"
                } it`,
              );
            }
          }
          if (g.ensure === "absent") {
            await execChecked(client, `rm -f ${shellEscape(g.path)}`, so, "rm");
          } else {
            await execChecked(
              client,
              `ln -sfn ${shellEscape(g.target!)} ${shellEscape(g.path)}`,
              so,
              "ln",
            );
            if (g.owner || g.group) {
              const ownership = g.group
                ? `${g.owner || ""}:${g.group}`
                : g.owner;
              await execChecked(
                client,
                `chown -h ${shellEscape(ownership!)} ${shellEscape(g.path)}`,
                so,
                "chown",
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
          context.logger.info("Symlink {path} on {host} is {status}", {
            path: g.path,
            host: g.nodeHost,
            status: "applied",
          });
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error(
            "Apply of symlink {path} failed on {host}: {error}",
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
              isLink: false,
              linkTarget: null,
              owner: null,
              group: null,
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
