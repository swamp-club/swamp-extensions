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
  execChecked,
  type HashTool,
  normalizeMode,
  remoteHash,
  statProbe,
} from "./_lib/checks.ts";
import { execSudo, getConnection, shellEscape } from "./_lib/ssh.ts";
import type { SshConn } from "./_lib/ssh.ts";

const GlobalArgsSchema = z.object({
  url: z.string().regex(
    /^(https?|ftp):\/\/\S+$/,
    "url must be an http, https or ftp URL",
  ).describe("URL to download (http, https or ftp)"),
  path: z.string().describe(
    "Absolute path where the downloaded file should be placed on the remote node",
  ),
  checksum: z.string().optional().describe(
    "Expected checksum of the file (e.g. sha256:abc123...). Used for idempotency.",
  ),
  checksumType: z.enum(["sha256", "sha1", "md5"]).default("sha256").describe(
    "Checksum algorithm to use (md5 is deprecated, prefer sha256)",
  ),
  owner: z.string().optional().describe("File owner"),
  group: z.string().optional().describe("File group"),
  mode: z.string().regex(/^[0-7]{3,4}$/, "Mode must be 3-4 octal digits")
    .optional().describe("File permissions in octal (e.g. 0755)"),
  force: z.boolean().default(false).describe(
    "Re-download even if the file already exists and checksum matches",
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
  fileExists: boolean;
  checksum: string | null;
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
  url: z.string().describe("Source URL"),
  path: z.string().describe("Destination path"),
  status: z.enum(["compliant", "non_compliant", "applied", "failed"]).describe(
    "Compliance status",
  ),
  current: z.object({
    fileExists: z.boolean().describe("Whether the file exists"),
    checksum: z.string().nullable().describe("Current file checksum"),
    owner: z.string().nullable().describe("Current file owner"),
    group: z.string().nullable().describe("Current file group"),
    mode: z.string().nullable().describe("Current file mode"),
  }).describe("Current file state on the remote node"),
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

function emptyCurrent(): Current {
  return {
    fileExists: false,
    checksum: null,
    owner: null,
    group: null,
    mode: null,
  };
}

function checksumCmd(type: GlobalArgs["checksumType"]): HashTool {
  switch (type) {
    case "sha256":
      return "sha256sum";
    case "sha1":
      return "sha1sum";
    case "md5":
      return "md5sum";
    default:
      return "sha256sum";
  }
}

async function gather(client: SshConn, g: GlobalArgs): Promise<Current> {
  const so = sudoOpts(g);
  const statResult = await execChecked(
    client,
    statProbe(g.path, "%U|%G|%a"),
    so,
    `stat ${g.path}`,
  );
  const line = statResult.stdout.trim();
  if (line === "NOTFOUND") {
    return emptyCurrent();
  }

  const parts = line.split("|");
  if (parts.length < 3) {
    throw new Error(`Unexpected stat output for ${g.path}: ${line}`);
  }
  const [owner, group, mode] = parts;
  const checksum = await remoteHash(
    client,
    g.path,
    so,
    checksumCmd(g.checksumType),
  );

  return {
    fileExists: true,
    checksum,
    owner,
    group,
    mode: normalizeMode(mode),
  };
}

/**
 * The expected digest with any `<algo>:` prefix (as in `sha256:abc...`)
 * stripped, or null when no checksum is set. A prefix naming a different
 * algorithm than checksumType is an error rather than a perpetual mismatch.
 */
function expectedChecksum(g: GlobalArgs): string | null {
  if (!g.checksum) return null;
  const m = g.checksum.trim().match(/^([A-Za-z0-9]+):(.*)$/);
  if (!m) return g.checksum.trim().toLowerCase();
  const algo = m[1].toLowerCase();
  if (algo !== g.checksumType) {
    throw new Error(
      `checksum prefix "${
        m[1]
      }:" does not match checksumType "${g.checksumType}"`,
    );
  }
  return m[2].trim().toLowerCase();
}

function detectChanges(g: GlobalArgs, current: Current) {
  const changes: string[] = [];
  const expected = expectedChecksum(g);

  if (g.force) {
    changes.push("download (forced)");
    return changes;
  }

  if (!current.fileExists) {
    changes.push("download file");
  } else if (expected && current.checksum !== expected) {
    changes.push(`checksum mismatch: ${current.checksum} != ${expected}`);
  }

  if (current.fileExists) {
    if (g.owner && current.owner !== g.owner) {
      changes.push(`owner: ${current.owner} -> ${g.owner}`);
    }
    if (g.group && current.group !== g.group) {
      changes.push(`group: ${current.group} -> ${g.group}`);
    }
    if (g.mode && normalizeMode(current.mode) !== normalizeMode(g.mode)) {
      changes.push(`mode: ${current.mode} -> ${g.mode}`);
    }
  }

  return changes;
}

/**
 * Downloads a URL to a path on a remote node over SSH (with curl or wget on the node), optionally verifying a checksum, and manages the file's owner, group and mode. `check` reports drift without changing anything; `apply` downloads and converges.
 */
export const model = {
  type: "@swamp/cfgmgmt/fetch",
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
        "Check if the file has been downloaded and matches expected state (dry-run)",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info("Checking download {path} on {host}", {
          path: g.path,
          host: g.nodeHost,
        });
        try {
          const client = await connect(g);
          const current = await gather(client, g);
          const changes = detectChanges(g, current);
          const handle = await context.writeResource("state", g.nodeHost, {
            url: g.url,
            path: g.path,
            status: changes.length === 0 ? "compliant" : "non_compliant",
            current,
            changes,
            error: null,
            timestamp: new Date().toISOString(),
          });
          context.logger.info("Download {path} on {host} is {status}", {
            path: g.path,
            host: g.nodeHost,
            status: changes.length === 0 ? "compliant" : "non_compliant",
          });
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error(
            "Check of download {path} failed on {host}: {error}",
            {
              path: g.path,
              host: g.nodeHost,
              error: errorMessage(err),
            },
          );
          await context.writeResource("state", g.nodeHost, {
            url: g.url,
            path: g.path,
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
      description: "Download a file from a URL to the remote node",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info("Applying download {path} on {host}", {
          path: g.path,
          host: g.nodeHost,
        });
        try {
          const client = await connect(g);
          const current = await gather(client, g);
          const changes = detectChanges(g, current);

          if (changes.length === 0) {
            const handle = await context.writeResource("state", g.nodeHost, {
              url: g.url,
              path: g.path,
              status: "compliant",
              current,
              changes: [],
              error: null,
              timestamp: new Date().toISOString(),
            });
            context.logger.info("Download {path} on {host} is {status}", {
              path: g.path,
              host: g.nodeHost,
              status: "compliant",
            });
            return { dataHandles: [handle] };
          }

          const so = sudoOpts(g);
          const needsDownload = changes.some((c) =>
            c.includes("download") || c.includes("checksum mismatch")
          );

          if (needsDownload) {
            const dir = g.path.substring(0, g.path.lastIndexOf("/"));
            if (dir) {
              await execChecked(
                client,
                `mkdir -p ${shellEscape(dir)}`,
                so,
                "mkdir",
              );
            }

            // Download beside the destination and move it into place only
            // once verified: an interrupted or mismatched download never
            // replaces a good file, nor leaves a partial file that a later
            // run without a checksum would accept as compliant.
            // mktemp, not a fixed name: a symlink planted at a predictable
            // name would have the download (as root) written through it.
            const stagePrefix = `${g.path}.swamp-fetch.`;
            const staged = (await execChecked(
              client,
              `mktemp ${shellEscape(`${stagePrefix}XXXXXX`)}`,
              so,
              "mktemp",
            )).stdout.trim();
            if (!staged.startsWith(stagePrefix)) {
              throw new Error(`mktemp returned an unexpected path: ${staged}`);
            }
            const discardStaged = () =>
              execSudo(client, `rm -f ${shellEscape(staged)}`, so);

            // Try curl first, fall back to wget
            const curlCheck = await execSudo(
              client,
              "command -v curl",
              so,
            );
            let downloadCmd: string;
            if (curlCheck.exitCode === 0) {
              downloadCmd = `curl -fsSL -o ${shellEscape(staged)} ${
                shellEscape(g.url)
              }`;
            } else {
              downloadCmd = `wget -q -O ${shellEscape(staged)} ${
                shellEscape(g.url)
              }`;
            }

            const dlResult = await execSudo(
              client,
              downloadCmd,
              so,
            );
            if (dlResult.exitCode !== 0) {
              await discardStaged();
              throw new Error(
                `Download failed: ${dlResult.stderr || dlResult.stdout}`,
              );
            }

            // Verify checksum after download
            const expected = expectedChecksum(g);
            if (expected) {
              const actualChecksum = await remoteHash(
                client,
                staged,
                so,
                checksumCmd(g.checksumType),
              ).catch(async (err) => {
                await discardStaged();
                throw err;
              });
              if (actualChecksum !== expected) {
                await discardStaged();
                throw new Error(
                  `Checksum verification failed: expected ${expected}, got ${actualChecksum}`,
                );
              }
            }

            try {
              await execChecked(
                client,
                `mv -f ${shellEscape(staged)} ${shellEscape(g.path)}`,
                so,
                "mv",
              );
            } catch (err) {
              await discardStaged();
              throw err;
            }
          }

          // Set ownership and permissions
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

          const updated = await gather(client, g);
          const handle = await context.writeResource("state", g.nodeHost, {
            url: g.url,
            path: g.path,
            status: "applied",
            current: updated,
            changes,
            error: null,
            timestamp: new Date().toISOString(),
          });
          context.logger.info("Download {path} on {host} is {status}", {
            path: g.path,
            host: g.nodeHost,
            status: "applied",
          });
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error(
            "Apply of download {path} failed on {host}: {error}",
            {
              path: g.path,
              host: g.nodeHost,
              error: errorMessage(err),
            },
          );
          await context.writeResource("state", g.nodeHost, {
            url: g.url,
            path: g.path,
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
