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
import { getConnection, scpFileAs, shellEscape } from "./_lib/ssh.ts";
import type { SshConn } from "./_lib/ssh.ts";
import {
  execChecked,
  normalizeMode,
  remoteHash,
  replaceSymlinkOrRefuse,
  statProbe,
} from "./_lib/checks.ts";
import { isAbsolute, join } from "@std/path";

const GlobalArgsSchema = z.object({
  source: z.string().describe(
    "Path to the local source file. Resolved relative to the repository root if not absolute.",
  ),
  path: z.string().describe("Absolute path of the file on the remote node"),
  ensure: z.enum(["present", "absent"]).describe(
    "Whether file should be present or absent",
  ),
  owner: z.string().optional().describe("File owner"),
  group: z.string().optional().describe("File group"),
  mode: z.string().regex(/^[0-7]{3,4}$/, "Mode must be 3-4 octal digits")
    .optional().describe("File permissions in octal (e.g. 0644)"),
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
  source: z.string().describe("Local source file path"),
  path: z.string().describe("Remote file path"),
  ensure: z.string().describe("Desired state (present or absent)"),
  status: z.enum(["compliant", "non_compliant", "applied", "failed"]).describe(
    "Compliance status",
  ),
  current: z.object({
    exists: z.boolean().describe("Whether the file currently exists"),
    isFile: z.boolean().describe("Whether the path is a regular file"),
    owner: z.string().nullable().describe("Current file owner"),
    group: z.string().nullable().describe("Current file group"),
    mode: z.string().nullable().describe("Current permissions (e.g. 0644)"),
    contentSha256: z.string().nullable().describe(
      "SHA-256 hash of current content",
    ),
  }).describe("Current file state on the remote node"),
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
      isFile: false,
      owner: null,
      group: null,
      mode: null,
      contentSha256: null,
    };
  }
  const parts = line.split("|");
  if (parts.length < 4) {
    throw new Error(`Unexpected stat output for ${path}: ${line}`);
  }
  const [fileType, owner, group, mode] = parts;
  const isFile = fileType === "regular file" ||
    fileType === "regular empty file";

  // Hash only when the content is compared: a file that is going away (or
  // whose content is not managed) need not be readable.
  let contentSha256 = null;
  if (isFile && g.ensure === "present") {
    contentSha256 = await remoteHash(client, path, so);
  }

  return {
    exists: true,
    isFile,
    owner,
    group,
    mode: normalizeMode(mode),
    contentSha256,
  };
}

async function computeLocalHash(filePath: string) {
  const data = await Deno.readFile(filePath);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf)).map((b) =>
    b.toString(16).padStart(2, "0")
  ).join("");
}

function resolveSource(source: string, repoDir: string) {
  if (isAbsolute(source)) return source;
  return join(repoDir, source);
}

/**
 * Pre-flight: with ensure=present the local source must be a readable regular
 * file, checked before connecting so a bad path never reports "create file"
 * or leaves a half-applied node (directory made, upload failed).
 */
async function assertSourceFile(g: GlobalArgs, sourcePath: string) {
  if (g.ensure !== "present") return;
  let info: Deno.FileInfo;
  try {
    info = await Deno.stat(sourcePath);
  } catch (err) {
    throw new Error(
      `Source file ${sourcePath} is not readable: ${errorMessage(err)}`,
    );
  }
  if (!info.isFile) {
    throw new Error(`Source ${sourcePath} is not a regular file`);
  }
}

function detectChanges(g: GlobalArgs, current: Current) {
  const changes = [];
  if (g.ensure === "present") {
    if (!current.exists) {
      changes.push("create file");
    } else if (!current.isFile) {
      changes.push("path exists but is not a regular file");
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
  } else {
    if (current.exists) changes.push("remove file");
  }
  return changes;
}

function emptyState(): Current {
  return {
    exists: false,
    isFile: false,
    owner: null,
    group: null,
    mode: null,
    contentSha256: null,
  };
}

/**
 * Copies a local source file to a remote node over SSH and manages its owner, group and mode. `check` reports drift without changing anything; `apply` uploads and converges the remote file.
 */
export const model = {
  type: "@swamp/cfgmgmt/copy_file",
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
      description: "Check if remote file matches local source file (dry-run)",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info("Checking file {path} on {host}", {
          path: g.path,
          host: g.nodeHost,
        });
        const sourcePath = resolveSource(g.source, context.repoDir);
        try {
          await assertSourceFile(g, sourcePath);
          const client = await connect(g);
          const current = await gather(client, g.path, g);
          const changes = detectChanges(g, current);

          if (
            g.ensure === "present" && current.isFile && current.contentSha256
          ) {
            const localHash = await computeLocalHash(sourcePath);
            if (current.contentSha256 !== localHash) {
              changes.push("content differs");
            }
          }

          const handle = await context.writeResource("state", g.nodeHost, {
            source: sourcePath,
            path: g.path,
            ensure: g.ensure,
            status: changes.length === 0 ? "compliant" : "non_compliant",
            current,
            changes,
            error: null,
            timestamp: new Date().toISOString(),
          });
          context.logger.info("File {path} on {host} is {status}", {
            path: g.path,
            host: g.nodeHost,
            status: changes.length === 0 ? "compliant" : "non_compliant",
          });
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error(
            "Check of file {path} failed on {host}: {error}",
            {
              path: g.path,
              host: g.nodeHost,
              error: errorMessage(err),
            },
          );
          await context.writeResource("state", g.nodeHost, {
            source: sourcePath,
            path: g.path,
            ensure: g.ensure,
            status: "failed",
            current: emptyState(),
            changes: [],
            error: errorMessage(err),
            timestamp: new Date().toISOString(),
          });
          throw err;
        }
      },
    },
    apply: {
      description: "Copy local source file to the remote node",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info("Applying file {path} on {host}", {
          path: g.path,
          host: g.nodeHost,
        });
        const sourcePath = resolveSource(g.source, context.repoDir);
        try {
          await assertSourceFile(g, sourcePath);
          const client = await connect(g);
          const current = await gather(client, g.path, g);
          const changes = detectChanges(g, current);

          if (
            g.ensure === "present" && current.isFile && current.contentSha256
          ) {
            const localHash = await computeLocalHash(sourcePath);
            if (current.contentSha256 !== localHash) {
              changes.push("content differs");
            }
          }

          if (changes.length === 0) {
            const handle = await context.writeResource("state", g.nodeHost, {
              source: sourcePath,
              path: g.path,
              ensure: g.ensure,
              status: "compliant",
              current,
              changes: [],
              error: null,
              timestamp: new Date().toISOString(),
            });
            context.logger.info("File {path} on {host} is {status}", {
              path: g.path,
              host: g.nodeHost,
              status: "compliant",
            });
            return { dataHandles: [handle] };
          }

          if (g.ensure === "present" && current.exists && !current.isFile) {
            await replaceSymlinkOrRefuse(client, g.path, sudoOpts(g));
          }

          const so = sudoOpts(g);
          if (g.ensure === "absent") {
            await execChecked(client, `rm -f ${shellEscape(g.path)}`, so, "rm");
          } else {
            const dir = g.path.substring(0, g.path.lastIndexOf("/"));
            if (dir) {
              await execChecked(
                client,
                `mkdir -p ${shellEscape(dir)}`,
                so,
                "mkdir",
              );
            }
            await scpFileAs(client, sourcePath, g.path, so);
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
            source: sourcePath,
            path: g.path,
            ensure: g.ensure,
            status: "applied",
            current: updated,
            changes,
            error: null,
            timestamp: new Date().toISOString(),
          });
          context.logger.info("File {path} on {host} is {status}", {
            path: g.path,
            host: g.nodeHost,
            status: "applied",
          });
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error(
            "Apply of file {path} failed on {host}: {error}",
            {
              path: g.path,
              host: g.nodeHost,
              error: errorMessage(err),
            },
          );
          await context.writeResource("state", g.nodeHost, {
            source: sourcePath,
            path: g.path,
            ensure: g.ensure,
            status: "failed",
            current: emptyState(),
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
