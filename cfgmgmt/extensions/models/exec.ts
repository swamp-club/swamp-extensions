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
import { RecordedFailure } from "./_lib/checks.ts";
import { execSudo, getConnection } from "./_lib/ssh.ts";
import type { SshConn } from "./_lib/ssh.ts";

const GlobalArgsSchema = z.object({
  command: z.string().describe("The command to execute"),
  onlyIf: z.string().optional().describe(
    "Guard: only run if this command exits 0",
  ),
  notIf: z.string().optional().describe("Guard: skip if this command exits 0"),
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
  command: z.string().describe("The command that was or would be executed"),
  status: z.enum(["compliant", "non_compliant", "applied", "failed"]).describe(
    "Compliance status",
  ),
  stdout: z.string().nullable().describe(
    "Standard output from the command (null when it did not run)",
  ),
  stderr: z.string().nullable().describe(
    "Standard error from the command (null when it did not run)",
  ),
  exitCode: z.number().nullable().describe(
    "Exit code of the command (null when it did not run)",
  ),
  changes: z.array(z.string()).describe("List of changes"),
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

async function shouldRun(
  client: SshConn,
  g: GlobalArgs,
): Promise<{ run: boolean; reason: string | null }> {
  const so = sudoOpts(g);
  if (g.onlyIf !== undefined) {
    const r = await execSudo(client, g.onlyIf, so);
    if (r.exitCode !== 0) {
      return { run: false, reason: `onlyIf command exited ${r.exitCode}` };
    }
  }
  if (g.notIf !== undefined) {
    const r = await execSudo(client, g.notIf, so);
    if (r.exitCode === 0) {
      return { run: false, reason: `notIf command exited 0` };
    }
  }
  return { run: true, reason: null };
}

/** The state record for a run in which the command itself did not execute. */
function notRun(
  g: GlobalArgs,
  status: "compliant" | "non_compliant" | "failed",
  changes: string[],
  error: string | null,
) {
  return {
    command: g.command,
    status,
    stdout: null,
    stderr: null,
    exitCode: null,
    changes,
    error,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Runs an arbitrary command on a remote node over SSH, guarded by optional
 * `onlyIf`/`notIf` commands. `check` evaluates the guards without running
 * the command; `apply` runs it and records its output and exit code.
 */
export const model = {
  type: "@swamp/cfgmgmt/exec",
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
      description: "Result of command execution",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    check: {
      description:
        "Dry-run: evaluate the onlyIf/notIf guards without executing the command",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info("Checking exec guards on {host}", {
          host: g.nodeHost,
        });
        try {
          const client = await connect(g);
          const guard = await shouldRun(client, g);
          const status = guard.run ? "non_compliant" : "compliant";
          const handle = await context.writeResource(
            "state",
            g.nodeHost,
            notRun(g, status, guard.run ? [`exec: ${g.command}`] : [], null),
          );
          context.logger.info("exec on {host} is {status}", {
            host: g.nodeHost,
            status,
          });
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error("exec check failed on {host}: {error}", {
            host: g.nodeHost,
            error: errorMessage(err),
          });
          await context.writeResource(
            "state",
            g.nodeHost,
            notRun(g, "failed", [], errorMessage(err)),
          );
          throw err;
        }
      },
    },
    apply: {
      description: "Execute the command on the remote node via SSH",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info("Running exec command on {host}", {
          host: g.nodeHost,
        });
        try {
          const client = await connect(g);
          const guard = await shouldRun(client, g);
          if (!guard.run) {
            const handle = await context.writeResource(
              "state",
              g.nodeHost,
              notRun(g, "compliant", [], null),
            );
            context.logger.info(
              "exec on {host} skipped by guard: {reason}",
              { host: g.nodeHost, reason: guard.reason },
            );
            return { dataHandles: [handle] };
          }
          const result = await execSudo(client, g.command, sudoOpts(g));
          const failed = result.exitCode !== 0;
          const error = failed
            ? `command exited with code ${result.exitCode}`
            : null;
          const handle = await context.writeResource("state", g.nodeHost, {
            command: g.command,
            status: failed ? "failed" : "applied",
            stdout: result.stdout,
            stderr: result.stderr,
            exitCode: result.exitCode,
            changes: [`exec: ${g.command}`],
            error,
            timestamp: new Date().toISOString(),
          });
          if (error !== null) throw new RecordedFailure(error);
          context.logger.info("exec on {host} applied with exit code {code}", {
            host: g.nodeHost,
            code: result.exitCode,
          });
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error("exec apply failed on {host}: {error}", {
            host: g.nodeHost,
            error: errorMessage(err),
          });
          if (err instanceof RecordedFailure) throw err;
          await context.writeResource(
            "state",
            g.nodeHost,
            notRun(g, "failed", [], errorMessage(err)),
          );
          throw err;
        }
      },
    },
  },
  reports: [],
};
