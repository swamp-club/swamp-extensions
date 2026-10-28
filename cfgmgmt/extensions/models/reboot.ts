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
import { execChecked } from "./_lib/checks.ts";

const GlobalArgsSchema = z.object({
  timeout: z.number().default(300).describe(
    "Maximum seconds to wait for the host to come back after reboot",
  ),
  message: z.string().default("Rebooting via cfgmgmt").describe(
    "Broadcast message before reboot",
  ),
  testCommand: z.string().default("uptime").describe(
    "Command to run after reconnection to verify the host is healthy",
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
  status: z.enum(["compliant", "non_compliant", "applied", "failed"]).describe(
    "Compliance status",
  ),
  preRebootUptime: z.string().nullable().describe(
    "System uptime before reboot",
  ),
  postRebootUptime: z.string().nullable().describe(
    "System uptime after reboot",
  ),
  changes: z.array(z.string()).describe("List of changes applied"),
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

/**
 * The detached reboot command. The message is escaped into the inner command,
 * and the inner command escaped once more as a whole, so quotes or `$(...)`
 * in the message reach shutdown as one literal argument.
 */
export function rebootCommand(message: string): string {
  const inner = `sleep 1 && shutdown -r now ${shellEscape(message)}`;
  return `nohup sh -c ${shellEscape(inner)} >/dev/null 2>&1 &`;
}

/**
 * Timing of `apply`'s wait for the host: how long to let it go down after the
 * reboot is triggered, and how often to poll SSH until it is back. Tests
 * shorten these; production code leaves them alone.
 */
export const rebootTiming = { settleMs: 5000, pollMs: 5000 };

/** Prints the host's boot time (or uptime where `uptime -s` is missing). */
const BOOT_MARKER = "uptime -s 2>/dev/null || uptime";

/** Run over a fresh SSH connection to see whether the host is back up. */
const PROBE = `echo ready; ${BOOT_MARKER}`;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Polls the host over fresh SSH connections until it answers with a boot
 * marker different from `before`, so a host that has not yet gone down is not
 * mistaken for one that has come back. Returns the new marker, or null on
 * timeout.
 */
async function waitForReboot(
  g: GlobalArgs,
  timeoutSec: number,
  before: string,
): Promise<string | null> {
  const deadline = Date.now() + timeoutSec * 1000;

  while (Date.now() < deadline) {
    try {
      const args = [
        "-o",
        "ConnectTimeout=5",
        "-o",
        "StrictHostKeyChecking=accept-new",
        "-o",
        "BatchMode=yes",
        "-p",
        String(g.nodePort),
      ];
      if (g.nodeIdentityFile) args.push("-i", g.nodeIdentityFile);
      args.push(`${g.nodeUser}@${g.nodeHost}`, PROBE);

      // swamp-quality-ignore deno-command
      const cmd = new Deno.Command("ssh", {
        args,
        stdout: "piped",
        stderr: "piped",
      });
      const output = await cmd.output();
      if (output.code === 0) {
        const [ready, ...rest] = new TextDecoder().decode(output.stdout)
          .trim().split("\n");
        const marker = rest.join("\n").trim();
        if (ready.trim() === "ready" && marker !== before) return marker;
      }
    } catch {
      // Host not ready yet
    }
    await sleep(rebootTiming.pollMs);
  }
  return null;
}

/**
 * Reboots a remote node over SSH. `check` always reports non_compliant (a
 * reboot is imperative) and records the current boot time; `apply` triggers
 * the reboot, waits for the host to come back with a new boot time, and runs
 * a health-check command.
 */
export const model = {
  type: "@swamp/cfgmgmt/reboot",
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
      description: "Result of the reboot operation",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    check: {
      description:
        "Check is always non-compliant — reboot is an imperative action",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info("Checking reboot state of {host}", {
          host: g.nodeHost,
        });
        try {
          const client = await connect(g);
          const uptimeResult = await execChecked(
            client,
            BOOT_MARKER,
            sudoOpts(g),
            "uptime",
          );
          const handle = await context.writeResource("state", g.nodeHost, {
            status: "non_compliant",
            preRebootUptime: uptimeResult.stdout.trim(),
            postRebootUptime: null,
            changes: ["reboot required"],
            error: null,
            timestamp: new Date().toISOString(),
          });
          context.logger.info("{host} is non_compliant (reboot required)", {
            host: g.nodeHost,
          });
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error("reboot check failed on {host}: {error}", {
            host: g.nodeHost,
            error: errorMessage(err),
          });
          await context.writeResource("state", g.nodeHost, {
            status: "failed",
            preRebootUptime: null,
            postRebootUptime: null,
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
        "Reboot the remote host and wait for SSH to become available again",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info("Rebooting {host}", { host: g.nodeHost });
        let preRebootUptime: string | null = null;
        let postRebootUptime: string | null = null;
        const changes: string[] = [];
        try {
          const client = await connect(g);
          const so = sudoOpts(g);

          // Record pre-reboot boot time
          const uptimeResult = await execChecked(
            client,
            BOOT_MARKER,
            so,
            "uptime",
          );
          preRebootUptime = uptimeResult.stdout.trim();

          // Trigger reboot — use nohup + sleep to give SSH time to return
          await execChecked(client, rebootCommand(g.message), so, "reboot");
          changes.push("rebooted host");

          // Wait for the host to go down
          await sleep(rebootTiming.settleMs);

          // Wait for SSH to come back with a new boot time
          context.logger.info(
            "Waiting up to {timeout}s for {host} to come back",
            { timeout: g.timeout, host: g.nodeHost },
          );
          postRebootUptime = await waitForReboot(
            g,
            g.timeout,
            preRebootUptime,
          );
          if (postRebootUptime === null) {
            throw new Error(
              `Host ${g.nodeHost} did not come back with a new boot time ` +
                `within ${g.timeout} seconds`,
            );
          }

          // Re-establish connection (old ControlMaster is dead)
          const newClient = await connect(g);

          // Run the health-check command
          const testResult = await execSudo(newClient, g.testCommand, so);
          if (testResult.exitCode !== 0) {
            throw new Error(
              `Post-reboot test command failed with exit code ` +
                `${testResult.exitCode}: ${testResult.stderr.trim()}`,
            );
          }

          const handle = await context.writeResource("state", g.nodeHost, {
            status: "applied",
            preRebootUptime,
            postRebootUptime,
            changes,
            error: null,
            timestamp: new Date().toISOString(),
          });
          context.logger.info("{host} rebooted and is healthy", {
            host: g.nodeHost,
          });
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error("reboot apply failed on {host}: {error}", {
            host: g.nodeHost,
            error: errorMessage(err),
          });
          await context.writeResource("state", g.nodeHost, {
            status: "failed",
            preRebootUptime,
            postRebootUptime,
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
