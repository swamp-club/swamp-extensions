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
    "Repository identifier used for the .list/.sources filename (e.g. docker, nodesource)",
  ),
  ensure: z.enum(["present", "absent"]).default("present").describe(
    "Whether the repository should be present or absent",
  ),
  uris: z.array(z.string()).optional().describe(
    "Repository URIs (e.g. ['https://download.docker.com/linux/ubuntu']). For DEB822 format.",
  ),
  suites: z.array(z.string()).optional().describe(
    "Repository suites (e.g. ['noble']). For DEB822 format.",
  ),
  components: z.array(z.string()).optional().describe(
    "Repository components (e.g. ['stable']). For DEB822 format.",
  ),
  architectures: z.array(z.string()).optional().describe(
    "Architectures to enable (e.g. ['amd64']). For DEB822 format.",
  ),
  signedBy: z.string().optional().describe(
    "Path to the GPG keyring file on the remote node (e.g. /usr/share/keyrings/docker.gpg)",
  ),
  gpgKeyUrl: z.string().optional().describe(
    "URL to download the GPG key from. Will be dearmored and saved to signedBy path.",
  ),
  sourceLine: z.string().optional().describe(
    "Legacy one-line format: 'deb [options] uri suite component...' — written to /etc/apt/sources.list.d/<name>.list. Mutually exclusive with uris/suites/components.",
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
    repoFileExists: z.boolean().describe("Whether the repo source file exists"),
    gpgKeyExists: z.boolean().describe("Whether the GPG key file exists"),
    repoContent: z.string().nullable().describe("Current repo file content"),
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
  return { repoFileExists: false, gpgKeyExists: false, repoContent: null };
}

function repoFilePath(g: GlobalArgs) {
  if (g.sourceLine) {
    return `/etc/apt/sources.list.d/${g.name}.list`;
  }
  return `/etc/apt/sources.list.d/${g.name}.sources`;
}

function buildDeb822Content(g: GlobalArgs) {
  const lines = ["Types: deb"];
  if (g.uris) lines.push(`URIs: ${g.uris.join(" ")}`);
  if (g.suites) lines.push(`Suites: ${g.suites.join(" ")}`);
  if (g.components) lines.push(`Components: ${g.components.join(" ")}`);
  if (g.architectures) {
    lines.push(`Architectures: ${g.architectures.join(" ")}`);
  }
  if (g.signedBy) lines.push(`Signed-By: ${g.signedBy}`);
  return lines.join("\n") + "\n";
}

function desiredContent(g: GlobalArgs) {
  if (g.sourceLine) return g.sourceLine.trim() + "\n";
  return buildDeb822Content(g);
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

  let gpgKeyExists = false;
  if (g.signedBy) {
    const keyResult = await execSudo(
      client,
      `test -f ${shellEscape(g.signedBy)} && echo Y || echo N`,
      so,
    );
    gpgKeyExists = keyResult.stdout.trim() === "Y";
  }

  return { repoFileExists, gpgKeyExists, repoContent };
}

function detectChanges(g: GlobalArgs, current: Current) {
  const changes = [];

  if (g.ensure === "present") {
    if (g.gpgKeyUrl && g.signedBy && !current.gpgKeyExists) {
      changes.push("download GPG key");
    }
    if (!current.repoFileExists) {
      changes.push("create repository file");
    } else {
      const desired = desiredContent(g);
      if (current.repoContent !== desired) {
        changes.push("update repository file");
      }
    }
  } else {
    if (current.repoFileExists) {
      changes.push("remove repository file");
    }
    if (g.signedBy && current.gpgKeyExists) {
      changes.push("remove GPG key");
    }
  }

  return changes;
}

/**
 * Manages an apt source (DEB822 `.sources` or one-line `.list`) and its
 * signing key over SSH: `check` reports drift and `apply` writes or removes the
 * source file and downloads or removes the key.
 */
export const model = {
  type: "@swamp/cfgmgmt/apt_repository",
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
        "Check if the apt repository is configured as desired (dry-run)",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info(
          "Checking apt repository {name} on {host} (ensure {ensure})",
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
            "apt repository {name} on {host} is {status}: {changes}",
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
            "apt repository {name} check failed on {host}: {error}",
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
      description: "Configure or remove an apt repository on the remote node",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info(
          "Applying apt repository {name} on {host} (ensure {ensure})",
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
              "apt repository {name} on {host} is already compliant",
              { name: g.name, host: g.nodeHost },
            );
            return { dataHandles: [handle] };
          }

          const so = sudoOpts(g);

          if (g.ensure === "present") {
            // Download GPG key if needed
            if (changes.includes("download GPG key")) {
              const keyDir = g.signedBy!.substring(
                0,
                g.signedBy!.lastIndexOf("/"),
              );
              if (keyDir) {
                await execChecked(
                  client,
                  `mkdir -p ${shellEscape(keyDir)}`,
                  so,
                  "mkdir",
                );
              }

              // Try curl, fallback to wget. Dearmor if needed.
              const curlCheck = await execSudo(
                client,
                "command -v curl",
                so,
              );
              const fetchCmd = curlCheck.exitCode === 0
                ? `curl -fsSL ${shellEscape(g.gpgKeyUrl!)}`
                : `wget -qO- ${shellEscape(g.gpgKeyUrl!)}`;

              // Download to a temp file first: in `fetch | gpg` the pipeline's
              // exit code is gpg's, which hides a failed download.
              const tmpKey = shellEscape(
                `/tmp/.swamp-gpgkey-${crypto.randomUUID()}`,
              );
              try {
                await execChecked(
                  client,
                  `${fetchCmd} > ${tmpKey}`,
                  so,
                  "GPG key download",
                );
                const dearmor = await execSudo(
                  client,
                  `gpg --dearmor -o ${shellEscape(g.signedBy!)} < ${tmpKey}`,
                  so,
                );
                if (dearmor.exitCode !== 0) {
                  // Try without dearmor (key may already be binary)
                  await execChecked(
                    client,
                    `cp ${tmpKey} ${shellEscape(g.signedBy!)}`,
                    so,
                    "GPG key install",
                  );
                }
              } finally {
                await execSudo(client, `rm -f ${tmpKey}`, so);
              }
            }

            // Write repo file
            const path = repoFilePath(g);
            const content = desiredContent(g);
            await writeFileAs(client, path, content, so);
          } else {
            // Remove repo file and GPG key
            const path = repoFilePath(g);
            if (current.repoFileExists) {
              await execChecked(
                client,
                `rm -f ${shellEscape(path)}`,
                so,
                "rm repository file",
              );
            }
            if (g.signedBy && current.gpgKeyExists) {
              await execChecked(
                client,
                `rm -f ${shellEscape(g.signedBy)}`,
                so,
                "rm GPG key",
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
          context.logger.info(
            "Applied {changes} to apt repository {name} on {host}",
            { name: g.name, host: g.nodeHost, changes },
          );
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error(
            "apt repository {name} apply failed on {host}: {error}",
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
