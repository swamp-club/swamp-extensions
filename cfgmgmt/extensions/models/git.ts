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
  path: z.string().describe("Local path for the repository"),
  repo: z.string().describe("Git repository URL"),
  revision: z.string().default("HEAD").describe(
    "Branch, tag, or commit hash (default HEAD = default branch)",
  ),
  ensure: z.enum(["present", "absent"]).describe(
    "Whether the repository should be present or absent",
  ),
  depth: z.number().optional().describe("Shallow clone depth"),
  owner: z.string().optional().describe("Repository owner"),
  group: z.string().optional().describe("Repository group"),
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
  path: z.string().describe("Repository path"),
  repo: z.string().describe("Repository URL"),
  ensure: z.string().describe("Desired state"),
  status: z.enum(["compliant", "non_compliant", "applied", "failed"]).describe(
    "Compliance status",
  ),
  current: z.object({
    exists: z.boolean().describe("Whether the path exists"),
    isGitRepo: z.boolean().describe("Whether the path is a git repository"),
    currentCommit: z.string().nullable().describe("Current HEAD commit hash"),
    currentBranch: z.string().nullable().describe(
      "Current branch (null if detached)",
    ),
    originUrl: z.string().nullable().describe("Current origin remote URL"),
    owner: z.string().nullable().describe("Current directory owner"),
    group: z.string().nullable().describe("Current directory group"),
  }).describe("Current git repository state"),
  changes: z.array(z.string()).describe("List of changes detected or applied"),
  error: z.string().nullable().describe("Error message if status is failed"),
  timestamp: z.string().describe("ISO 8601 timestamp"),
});

type Current = z.infer<typeof StateSchema>["current"];

/** Structured log fields naming what this run manages, and where. */
function logFields(g: GlobalArgs) {
  return { path: g.path, host: g.nodeHost };
}

function connect(g: GlobalArgs) {
  return getConnection({
    host: g.nodeHost,
    port: g.nodePort,
    username: g.nodeUser,
    privateKeyPath: g.nodeIdentityFile,
  });
}

function isCommitHash(rev: string): boolean {
  return /^[0-9a-f]{7,40}$/i.test(rev);
}

function stripCredentials(urlStr: string): string {
  try {
    const url = new URL(urlStr);
    url.username = "";
    url.password = "";
    return url.toString();
  } catch {
    return urlStr;
  }
}

async function gather(client: SshConn, g: GlobalArgs): Promise<Current> {
  const so = sudoOpts(g);
  const existsResult = await execSudo(
    client,
    `test -d ${shellEscape(g.path)} && echo Y || echo N`,
    so,
  );
  const exists = existsResult.stdout.trim() === "Y";
  if (!exists) {
    return {
      exists: false,
      isGitRepo: false,
      currentCommit: null,
      currentBranch: null,
      originUrl: null,
      owner: null,
      group: null,
    };
  }

  const gitCheck = await execSudo(
    client,
    `test -d ${shellEscape(g.path + "/.git")} && echo Y || echo N`,
    so,
  );
  const isGitRepo = gitCheck.stdout.trim() === "Y";

  if (!isGitRepo) {
    const stat = await execSudo(
      client,
      `stat -c '%U|%G' ${shellEscape(g.path)} 2>/dev/null`,
      so,
    );
    const parts1 = stat.stdout.trim().split("|");
    return {
      exists: true,
      isGitRepo: false,
      currentCommit: null,
      currentBranch: null,
      originUrl: null,
      owner: parts1.length >= 2 ? parts1[0] || null : null,
      group: parts1.length >= 2 ? parts1[1] || null : null,
    };
  }

  const commit = await execSudo(
    client,
    `git -C ${shellEscape(g.path)} rev-parse HEAD 2>/dev/null`,
    so,
  );
  const branch = await execSudo(
    client,
    `git -C ${shellEscape(g.path)} symbolic-ref --short HEAD 2>/dev/null`,
    so,
  );
  const origin = await execSudo(
    client,
    `git -C ${shellEscape(g.path)} remote get-url origin 2>/dev/null`,
    so,
  );
  const stat = await execSudo(
    client,
    `stat -c '%U|%G' ${shellEscape(g.path)} 2>/dev/null`,
    so,
  );
  const parts2 = stat.stdout.trim().split("|");

  return {
    exists: true,
    isGitRepo: true,
    currentCommit: commit.exitCode === 0 ? commit.stdout.trim() : null,
    currentBranch: branch.exitCode === 0 ? branch.stdout.trim() : null,
    originUrl: origin.exitCode === 0
      ? stripCredentials(origin.stdout.trim())
      : null,
    owner: parts2.length >= 2 ? parts2[0] || null : null,
    group: parts2.length >= 2 ? parts2[1] || null : null,
  };
}

function detectChanges(g: GlobalArgs, current: Current) {
  const changes: string[] = [];

  if (g.ensure === "absent") {
    if (current.exists) changes.push("remove repository");
    return changes;
  }

  if (!current.exists) {
    changes.push("clone repository");
    return changes;
  }

  if (current.exists && !current.isGitRepo) {
    changes.push("path exists but is not a git repository");
    return changes;
  }

  // originUrl is read back with credentials stripped, so compare (and
  // report) the desired URL the same way.
  const desiredOrigin = stripCredentials(g.repo);
  if (current.originUrl !== desiredOrigin) {
    changes.push(`origin: ${current.originUrl} -> ${desiredOrigin}`);
  }

  if (g.revision !== "HEAD") {
    if (isCommitHash(g.revision)) {
      if (
        current.currentCommit &&
        !current.currentCommit.startsWith(g.revision)
      ) {
        changes.push(`commit: ${current.currentCommit} -> ${g.revision}`);
      }
    } else {
      if (current.currentBranch !== g.revision) {
        changes.push(
          `branch: ${current.currentBranch || "detached"} -> ${g.revision}`,
        );
      }
    }
  }

  if (g.owner && current.owner !== g.owner) {
    changes.push(`owner: ${current.owner} -> ${g.owner}`);
  }
  if (g.group && current.group !== g.group) {
    changes.push(`group: ${current.group} -> ${g.group}`);
  }

  return changes;
}

function emptyCurrent(): Current {
  return {
    exists: false,
    isGitRepo: false,
    currentCommit: null,
    currentBranch: null,
    originUrl: null,
    owner: null,
    group: null,
  };
}

/**
 * Manages a git checkout on a node over SSH (origin, branch or commit,
 * ownership, presence). `check` reports drift without changing anything;
 * `apply` clones, fetches/checks out, or removes the repository to converge.
 */
export const model = {
  type: "@swamp/cfgmgmt/git",
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
      description: "Check if git repository matches desired state (dry-run)",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info(
          "Checking repository {path} on {host}",
          logFields(g),
        );
        try {
          const client = await connect(g);
          const current = await gather(client, g);
          const changes = detectChanges(g, current);
          const isError = changes.some((c) =>
            c.includes("not a git repository")
          );
          const status = isError
            ? "failed"
            : changes.length === 0
            ? "compliant"
            : "non_compliant";
          const handle = await context.writeResource("state", g.nodeHost, {
            path: g.path,
            repo: stripCredentials(g.repo),
            ensure: g.ensure,
            status,
            current,
            changes,
            error: isError ? "Path exists but is not a git repository" : null,
            timestamp: new Date().toISOString(),
          });
          context.logger.info(
            "Repository {path} on {host} is {status} ({changeCount} changes)",
            {
              ...logFields(g),
              status,
              changeCount: changes.length,
            },
          );
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error(
            "Checking repository {path} on {host} failed: {error}",
            {
              ...logFields(g),
              error: errorMessage(err),
            },
          );
          await context.writeResource("state", g.nodeHost, {
            path: g.path,
            repo: stripCredentials(g.repo),
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
      description: "Clone, update, or remove a git repository",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info(
          "Applying repository {path} on {host}",
          logFields(g),
        );
        try {
          const client = await connect(g);
          const current = await gather(client, g);
          const changes = detectChanges(g, current);

          if (
            changes.some((c) => c.includes("not a git repository"))
          ) {
            throw new Error(
              `Path ${g.path} exists but is not a git repository`,
            );
          }

          if (changes.length === 0) {
            const handle = await context.writeResource("state", g.nodeHost, {
              path: g.path,
              repo: stripCredentials(g.repo),
              ensure: g.ensure,
              status: "compliant",
              current,
              changes: [],
              error: null,
              timestamp: new Date().toISOString(),
            });
            context.logger.info(
              "Repository {path} on {host} is {status} ({changeCount} changes)",
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
            await execChecked(
              client,
              `rm -rf ${shellEscape(g.path)}`,
              so,
              "rm -rf",
            );
          } else if (changes.includes("clone repository")) {
            const args = ["git", "clone"];
            if (g.depth) args.push("--depth", String(g.depth));
            if (
              g.revision !== "HEAD" && !isCommitHash(g.revision)
            ) {
              args.push("--branch", shellEscape(g.revision));
            }
            args.push(shellEscape(g.repo), shellEscape(g.path));
            await execChecked(client, args.join(" "), so, "git clone");

            if (isCommitHash(g.revision)) {
              if (g.depth) {
                await execChecked(
                  client,
                  `git -C ${shellEscape(g.path)} fetch --unshallow`,
                  so,
                  "git fetch --unshallow",
                );
              }
              await execChecked(
                client,
                `git -C ${shellEscape(g.path)} checkout ${
                  shellEscape(g.revision)
                }`,
                so,
                "git checkout",
              );
            }
          } else {
            if (changes.some((c) => c.startsWith("origin:"))) {
              await execChecked(
                client,
                `git -C ${shellEscape(g.path)} remote set-url origin ${
                  shellEscape(g.repo)
                }`,
                so,
                "git remote set-url",
              );
            }

            if (
              changes.some((c) =>
                c.startsWith("branch:") || c.startsWith("commit:")
              )
            ) {
              await execChecked(
                client,
                `git -C ${shellEscape(g.path)} fetch origin`,
                so,
                "git fetch origin",
              );

              await execChecked(
                client,
                `git -C ${shellEscape(g.path)} checkout ${
                  shellEscape(g.revision)
                }`,
                so,
                "git checkout",
              );
              if (!isCommitHash(g.revision)) {
                await execChecked(
                  client,
                  `git -C ${shellEscape(g.path)} pull origin ${
                    shellEscape(g.revision)
                  }`,
                  so,
                  "git pull",
                );
              }
            }
          }

          if (
            g.ensure === "present" && (g.owner || g.group)
          ) {
            const ownership = g.group
              ? `${g.owner || ""}:${g.group}`
              : g.owner!;
            await execChecked(
              client,
              `chown -R ${shellEscape(ownership)} ${shellEscape(g.path)}`,
              so,
              "chown -R",
            );
          }

          const updated = await gather(client, g);
          const handle = await context.writeResource("state", g.nodeHost, {
            path: g.path,
            repo: stripCredentials(g.repo),
            ensure: g.ensure,
            status: "applied",
            current: updated,
            changes,
            error: null,
            timestamp: new Date().toISOString(),
          });
          context.logger.info(
            "Repository {path} on {host} is {status} ({changeCount} changes)",
            {
              ...logFields(g),
              status: "applied",
              changeCount: changes.length,
            },
          );
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error(
            "Applying repository {path} on {host} failed: {error}",
            {
              ...logFields(g),
              error: errorMessage(err),
            },
          );
          await context.writeResource("state", g.nodeHost, {
            path: g.path,
            repo: stripCredentials(g.repo),
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
