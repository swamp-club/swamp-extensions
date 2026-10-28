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
import { execSudo, getConnection } from "./_lib/ssh.ts";

const GlobalArgsSchema = z.object({
  command: z.string().describe("The command to execute on the remote host"),
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
  command: z.string().describe("The command that was executed"),
  stdout: z.string().nullable().describe(
    "Standard output from the command (null when it did not run)",
  ),
  stderr: z.string().nullable().describe(
    "Standard error from the command (null when it did not run)",
  ),
  exitCode: z.number().nullable().describe(
    "Exit code of the command (null when it did not run)",
  ),
  error: z.string().nullable().describe(
    "Error message if connection failed",
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
 * Debug helper that runs a command on a remote node over SSH and stores its
 * stdout, stderr and exit code as data (`run`). A non-zero exit is recorded,
 * not treated as a failure; only connection errors fail the method.
 */
export const model = {
  type: "@swamp/cfgmgmt/debug_exec",
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
      description: "Output captured from remote command execution",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    run: {
      description:
        "Execute the command on the remote host and capture output as data",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info("Running debug command on {host}", {
          host: g.nodeHost,
        });
        try {
          const client = await connect(g);
          const result = await execSudo(client, g.command, sudoOpts(g));
          const handle = await context.writeResource("state", g.nodeHost, {
            command: g.command,
            stdout: result.stdout,
            stderr: result.stderr,
            exitCode: result.exitCode,
            error: null,
            timestamp: new Date().toISOString(),
          });
          context.logger.info(
            "Debug command on {host} exited with code {code}",
            { host: g.nodeHost, code: result.exitCode },
          );
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error("debug_exec failed on {host}: {error}", {
            host: g.nodeHost,
            error: errorMessage(err),
          });
          await context.writeResource("state", g.nodeHost, {
            command: g.command,
            stdout: null,
            stderr: null,
            exitCode: null,
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
