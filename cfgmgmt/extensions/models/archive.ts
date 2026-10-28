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
import { execChecked, RecordedFailure } from "./_lib/checks.ts";
import type { SshConn } from "./_lib/ssh.ts";

const GlobalArgsSchema = z.object({
  source: z.string().describe("Path to the archive file on the remote node"),
  dest: z.string().describe("Extraction destination directory"),
  format: z.enum(["auto", "tar", "tar.gz", "tar.bz2", "tar.xz", "zip"])
    .default("auto").describe(
      "Archive format; `auto` detects it from the source's extension " +
        "(.tar, .tar.gz/.tgz, .tar.bz2/.tbz2, .tar.xz/.txz, .zip) and fails " +
        "on any other extension",
    ),
  creates: z.string().optional().describe(
    "Idempotency guard: skip extraction if this path exists. Without it, " +
      "extraction is skipped only when dest exists and is non-empty, so an " +
      "empty dest (for example left by a failed run) is extracted again",
  ),
  owner: z.string().optional().describe("Owner for extracted files"),
  group: z.string().optional().describe("Group for extracted files"),
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
  source: z.string().describe("Archive source path"),
  dest: z.string().describe("Extraction destination"),
  status: z.enum(["compliant", "non_compliant", "applied", "failed"]).describe(
    "Compliance status",
  ),
  current: z.object({
    sourceExists: z.boolean().describe("Whether the source archive exists"),
    destExists: z.boolean().describe(
      "Whether the destination directory exists",
    ),
    destPopulated: z.boolean().describe(
      "Whether the destination directory exists and is non-empty",
    ),
    createsExists: z.boolean().describe(
      "Whether the creates guard path exists",
    ),
  }).describe("Current archive state"),
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

async function gather(client: SshConn, g: GlobalArgs): Promise<Current> {
  const so = sudoOpts(g);
  const sourceResult = await execChecked(
    client,
    `test -f ${shellEscape(g.source)} && echo Y || echo N`,
    so,
    "source check",
  );
  const dest = shellEscape(g.dest);
  const destResult = await execChecked(
    client,
    `if [ -d ${dest} ]; then if [ -n "$(ls -A ${dest})" ]; then echo FULL; ` +
      `else echo EMPTY; fi; else echo NONE; fi`,
    so,
    "dest check",
  );
  const destState = destResult.stdout.trim();

  let createsExists = false;
  if (g.creates) {
    const createsResult = await execChecked(
      client,
      `test -e ${shellEscape(g.creates)} && echo Y || echo N`,
      so,
      "creates check",
    );
    createsExists = createsResult.stdout.trim() === "Y";
  }

  return {
    sourceExists: sourceResult.stdout.trim() === "Y",
    destExists: destState === "FULL" || destState === "EMPTY",
    destPopulated: destState === "FULL",
    createsExists,
  };
}

function detectFormat(source: string, explicit: GlobalArgs["format"]): string {
  if (explicit !== "auto") return explicit;
  if (source.endsWith(".tar.gz") || source.endsWith(".tgz")) return "tar.gz";
  if (source.endsWith(".tar.bz2") || source.endsWith(".tbz2")) return "tar.bz2";
  if (source.endsWith(".tar.xz") || source.endsWith(".txz")) return "tar.xz";
  if (source.endsWith(".tar")) return "tar";
  if (source.endsWith(".zip")) return "zip";
  throw new Error(
    `Cannot detect the archive format of ${source}; set format explicitly`,
  );
}

function detectChanges(g: GlobalArgs, current: Current) {
  const changes: string[] = [];
  if (!current.sourceExists) {
    changes.push("source archive not found");
    return changes;
  }
  if (g.creates && current.createsExists) return changes;
  if (!g.creates && current.destPopulated) return changes;
  changes.push("extract archive");
  return changes;
}

function emptyCurrent(): Current {
  return {
    sourceExists: false,
    destExists: false,
    destPopulated: false,
    createsExists: false,
  };
}

/**
 * Extracts an archive already on a remote node into a destination directory
 * over SSH. `check` reports whether extraction is needed (guarded by
 * `creates` or a populated dest); `apply` extracts it and optionally chowns
 * the result.
 */
export const model = {
  type: "@swamp/cfgmgmt/archive",
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
      description: "Check if archive has been extracted (dry-run)",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info("Checking archive {source} -> {dest} on {host}", {
          source: g.source,
          dest: g.dest,
          host: g.nodeHost,
        });
        let current: Current | null = null;
        try {
          detectFormat(g.source, g.format);
          const client = await connect(g);
          current = await gather(client, g);
          const changes = detectChanges(g, current);
          const error = changes.some((c) => c.includes("not found"))
            ? `Source archive not found: ${g.source}`
            : null;
          const status = error !== null
            ? "failed"
            : changes.length === 0
            ? "compliant"
            : "non_compliant";
          const handle = await context.writeResource("state", g.nodeHost, {
            source: g.source,
            dest: g.dest,
            status,
            current,
            changes,
            error,
            timestamp: new Date().toISOString(),
          });
          if (error !== null) throw new RecordedFailure(error);
          context.logger.info("Archive {source} on {host} is {status}", {
            source: g.source,
            host: g.nodeHost,
            status,
          });
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error("archive check failed on {host}: {error}", {
            host: g.nodeHost,
            error: errorMessage(err),
          });
          if (err instanceof RecordedFailure) throw err;
          await context.writeResource("state", g.nodeHost, {
            source: g.source,
            dest: g.dest,
            status: "failed",
            current: current ?? emptyCurrent(),
            changes: [],
            error: errorMessage(err),
            timestamp: new Date().toISOString(),
          });
          throw err;
        }
      },
    },
    apply: {
      description: "Extract an archive to the destination directory",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info("Extracting {source} -> {dest} on {host}", {
          source: g.source,
          dest: g.dest,
          host: g.nodeHost,
        });
        let current: Current | null = null;
        let changes: string[] = [];
        try {
          const format = detectFormat(g.source, g.format);
          const client = await connect(g);
          current = await gather(client, g);
          changes = detectChanges(g, current);

          if (changes.some((c) => c.includes("not found"))) {
            throw new Error(`Source archive not found: ${g.source}`);
          }

          if (changes.length === 0) {
            const handle = await context.writeResource("state", g.nodeHost, {
              source: g.source,
              dest: g.dest,
              status: "compliant",
              current,
              changes: [],
              error: null,
              timestamp: new Date().toISOString(),
            });
            context.logger.info("Archive {source} on {host} is compliant", {
              source: g.source,
              host: g.nodeHost,
            });
            return { dataHandles: [handle] };
          }

          const so = sudoOpts(g);

          await execChecked(
            client,
            `mkdir -p ${shellEscape(g.dest)}`,
            so,
            "mkdir",
          );

          let extractCmd: string;
          const src = shellEscape(g.source);
          const dst = shellEscape(g.dest);
          switch (format) {
            case "tar":
              extractCmd = `tar -xf ${src} -C ${dst}`;
              break;
            case "tar.gz":
              extractCmd = `tar -xzf ${src} -C ${dst}`;
              break;
            case "tar.bz2":
              extractCmd = `tar -xjf ${src} -C ${dst}`;
              break;
            case "tar.xz":
              extractCmd = `tar -xJf ${src} -C ${dst}`;
              break;
            case "zip": {
              const unzipCheck = await execSudo(
                client,
                `command -v unzip`,
                so,
              );
              if (unzipCheck.exitCode !== 0) {
                throw new Error("unzip is not installed");
              }
              extractCmd = `unzip -o ${src} -d ${dst}`;
              break;
            }
            default:
              throw new Error(`Unsupported archive format: ${format}`);
          }

          await execChecked(client, extractCmd, so, "Extraction");

          if (g.owner || g.group) {
            const ownership = g.group
              ? `${g.owner || ""}:${g.group}`
              : g.owner!;
            await execChecked(
              client,
              `chown -R ${shellEscape(ownership)} ${dst}`,
              so,
              "chown",
            );
          }

          const updated = await gather(client, g);
          const handle = await context.writeResource("state", g.nodeHost, {
            source: g.source,
            dest: g.dest,
            status: "applied",
            current: updated,
            changes,
            error: null,
            timestamp: new Date().toISOString(),
          });
          context.logger.info("Extracted {source} -> {dest} on {host}", {
            source: g.source,
            dest: g.dest,
            host: g.nodeHost,
          });
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error("archive apply failed on {host}: {error}", {
            host: g.nodeHost,
            error: errorMessage(err),
          });
          await context.writeResource("state", g.nodeHost, {
            source: g.source,
            dest: g.dest,
            status: "failed",
            current: current ?? emptyCurrent(),
            changes,
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
