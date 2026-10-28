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

const GlobalArgsSchema = z.object({
  path: z.string().describe(
    "Absolute path of the file to read on the remote node",
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
  path: z.string().describe("Path of the file that was read"),
  exists: z.boolean().nullable().describe(
    "Whether the file exists on the remote node (null if the node could not " +
      "be reached)",
  ),
  content: z.string().nullable().describe(
    "File content (null if the file does not exist or could not be read)",
  ),
  size: z.number().nullable().describe(
    "File size in bytes (null if the file does not exist or could not be read)",
  ),
  error: z.string().nullable().describe(
    "Error message if connection failed or file could not be read",
  ),
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

/**
 * Debug helper that reads a file on a remote node over SSH and stores its
 * content and size as data (`run`). A missing or unreadable file is recorded,
 * not treated as a failure; only connection errors fail the method.
 */
export const model = {
  type: "@swamp/cfgmgmt/debug_file",
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
      description: "Content fetched from a remote file",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    run: {
      description:
        "Fetch the file content from the remote host and store it as data",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info("Reading {path} on {host}", {
          path: g.path,
          host: g.nodeHost,
        });
        try {
          const client = await connect(g);
          const so = sudoOpts(g);
          const path = shellEscape(g.path);
          const result = await execSudo(client, `cat ${path}`, so);
          if (result.exitCode !== 0) {
            const probe = await execSudo(client, `test -e ${path}`, so);
            const exists = probe.exitCode === 0;
            const handle = await context.writeResource("state", g.nodeHost, {
              path: g.path,
              exists,
              content: null,
              size: null,
              error: result.stderr.trim() ||
                (exists ? "File is not readable" : "File not found"),
              timestamp: new Date().toISOString(),
            });
            context.logger.info(
              "{path} on {host} could not be read (exists: {exists})",
              { path: g.path, host: g.nodeHost, exists },
            );
            return { dataHandles: [handle] };
          }
          const sizeResult = await execSudo(client, `stat -c '%s' ${path}`, so);
          const parsed = parseInt(sizeResult.stdout.trim(), 10);
          const size = sizeResult.exitCode === 0 && Number.isFinite(parsed)
            ? parsed
            : new TextEncoder().encode(result.stdout).length;
          const handle = await context.writeResource("state", g.nodeHost, {
            path: g.path,
            exists: true,
            content: result.stdout,
            size,
            error: null,
            timestamp: new Date().toISOString(),
          });
          context.logger.info("Read {path} on {host} ({size} bytes)", {
            path: g.path,
            host: g.nodeHost,
            size,
          });
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error("debug_file failed on {host}: {error}", {
            host: g.nodeHost,
            error: errorMessage(err),
          });
          await context.writeResource("state", g.nodeHost, {
            path: g.path,
            exists: null,
            content: null,
            size: null,
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
