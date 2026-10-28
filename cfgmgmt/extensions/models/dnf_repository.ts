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
  name: z.string().regex(
    /^[A-Za-z0-9_][A-Za-z0-9._-]*$/,
    "name must be a file name: letters, digits, '.', '_', '-', not starting with '.' or '-'",
  ).describe(
    "Repository ID used as the [section] name and .repo filename (e.g. docker-ce-stable)",
  ),
  ensure: z.enum(["present", "absent"]).default("present").describe(
    "Whether the repository should be present or absent",
  ),
  description: z.string().optional().describe(
    "Human-readable repository name (e.g. 'Docker CE Stable')",
  ),
  baseurl: z.string().optional().describe(
    "Base URL of the repository (e.g. https://download.docker.com/linux/fedora/$releasever/$basearch/stable)",
  ),
  metalink: z.string().optional().describe(
    "Metalink URL (alternative to baseurl)",
  ),
  mirrorlist: z.string().optional().describe(
    "Mirror list URL (alternative to baseurl)",
  ),
  enabled: z.boolean().default(true).describe(
    "Whether the repository is enabled",
  ),
  gpgcheck: z.boolean().default(true).describe(
    "Whether GPG signature checking is enabled",
  ),
  gpgkey: z.string().optional().describe(
    "URL of the GPG key for the repository (e.g. https://download.docker.com/linux/fedora/gpg)",
  ),
  sslverify: z.boolean().optional().describe(
    "Whether to verify SSL certificates",
  ),
  repo_gpgcheck: z.boolean().optional().describe(
    "Whether to verify repository metadata GPG signatures",
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
  name: z.string().describe("Repository name"),
  status: z.enum(["compliant", "non_compliant", "applied", "failed"]).describe(
    "Compliance status",
  ),
  current: z.object({
    repoFileExists: z.boolean().describe(
      "Whether the .repo file exists",
    ),
    repoContent: z.string().nullable().describe("Current .repo file content"),
  }).describe("Current repository state"),
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

function emptyCurrent() {
  return { repoFileExists: false, repoContent: null };
}

function repoFilePath(g: GlobalArgs) {
  return `/etc/yum.repos.d/${g.name}.repo`;
}

function buildRepoContent(g: GlobalArgs) {
  const lines = [`[${g.name}]`];
  lines.push(`name=${g.description || g.name}`);
  if (g.baseurl) lines.push(`baseurl=${g.baseurl}`);
  if (g.metalink) lines.push(`metalink=${g.metalink}`);
  if (g.mirrorlist) lines.push(`mirrorlist=${g.mirrorlist}`);
  lines.push(`enabled=${g.enabled ? "1" : "0"}`);
  lines.push(`gpgcheck=${g.gpgcheck ? "1" : "0"}`);
  if (g.gpgkey) lines.push(`gpgkey=${g.gpgkey}`);
  if (g.sslverify !== undefined) {
    lines.push(`sslverify=${g.sslverify ? "1" : "0"}`);
  }
  if (g.repo_gpgcheck !== undefined) {
    lines.push(`repo_gpgcheck=${g.repo_gpgcheck ? "1" : "0"}`);
  }
  return lines.join("\n") + "\n";
}

async function gather(client: SshConn, g: GlobalArgs) {
  const so = sudoOpts(g);
  const path = repoFilePath(g);

  const repoResult = await execSudo(
    client,
    `cat ${shellEscape(path)} 2>/dev/null`,
    so,
  );
  const repoFileExists = repoResult.exitCode === 0;
  const repoContent = repoFileExists ? repoResult.stdout : null;

  return { repoFileExists, repoContent };
}

function detectChanges(g: GlobalArgs, current: Current) {
  const changes = [];

  if (g.ensure === "present") {
    if (!current.repoFileExists) {
      changes.push("create repository file");
    } else {
      const desired = buildRepoContent(g);
      if (current.repoContent !== desired) {
        changes.push("update repository file");
      }
    }
  } else {
    if (current.repoFileExists) {
      changes.push("remove repository file");
    }
  }

  return changes;
}

/**
 * Manages a dnf/yum `.repo` file under /etc/yum.repos.d over SSH: `check`
 * reports drift and `apply` writes or removes the file.
 */
export const model = {
  type: "@swamp/cfgmgmt/dnf_repository",
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
      description:
        "Check if the dnf repository is configured as desired (dry-run)",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info(
          "Checking dnf repository {name} on {host} (ensure {ensure})",
          { name: g.name, ensure: g.ensure, host: g.nodeHost },
        );
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
          context.logger.info(
            "dnf repository {name} on {host} is {status}: {changes}",
            {
              name: g.name,
              host: g.nodeHost,
              status: changes.length === 0 ? "compliant" : "non_compliant",
              changes,
            },
          );
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error(
            "dnf repository {name} check failed on {host}: {error}",
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
      description:
        "Configure or remove a dnf/yum repository on the remote node",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info(
          "Applying dnf repository {name} on {host} (ensure {ensure})",
          { name: g.name, ensure: g.ensure, host: g.nodeHost },
        );
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
            context.logger.info(
              "dnf repository {name} on {host} is already compliant",
              { name: g.name, host: g.nodeHost },
            );
            return { dataHandles: [handle] };
          }

          const so = sudoOpts(g);
          const path = repoFilePath(g);

          if (g.ensure === "present") {
            const content = buildRepoContent(g);
            await writeFileAs(client, path, content, so);
          } else {
            await execChecked(
              client,
              `rm -f ${shellEscape(path)}`,
              so,
              "rm repository file",
            );
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
          context.logger.info(
            "Applied {changes} to dnf repository {name} on {host}",
            { name: g.name, host: g.nodeHost, changes },
          );
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error(
            "dnf repository {name} apply failed on {host}: {error}",
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
