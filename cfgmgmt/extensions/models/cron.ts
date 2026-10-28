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
import { execChecked } from "./_lib/checks.ts";
import {
  execSudo,
  getConnection,
  shellEscape,
  withStagedContent,
} from "./_lib/ssh.ts";
import type { SshConn } from "./_lib/ssh.ts";

/** A crontab line the entry's marker and command each fit on. */
const SINGLE_LINE = /^[^\r\n]+$/;
/** One whitespace-free crontab schedule field, so it reads back unchanged. */
const SCHEDULE_FIELD = /^\S+$/;

const GlobalArgsSchema = z.object({
  name: z.string().regex(SINGLE_LINE, "must be a single line").describe(
    "Unique identifier for this cron job",
  ),
  ensure: z.enum(["present", "absent"]).describe(
    "Whether the cron job should be present or absent",
  ),
  command: z.string().regex(SINGLE_LINE, "must be a single line").describe(
    "Command to run",
  ),
  user: z.string().default("root").describe("User whose crontab to manage"),
  minute: z.string().regex(SCHEDULE_FIELD, "must not contain whitespace")
    .default("*").describe("Minute (0-59 or *)"),
  hour: z.string().regex(SCHEDULE_FIELD, "must not contain whitespace").default(
    "*",
  ).describe("Hour (0-23 or *)"),
  day: z.string().regex(SCHEDULE_FIELD, "must not contain whitespace").default(
    "*",
  ).describe("Day of month (1-31 or *)"),
  month: z.string().regex(SCHEDULE_FIELD, "must not contain whitespace")
    .default("*").describe("Month (1-12 or *)"),
  weekday: z.string().regex(SCHEDULE_FIELD, "must not contain whitespace")
    .default("*").describe("Day of week (0-7 or *)"),
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
  entryExists: boolean;
  schedule: string | null;
  command: string | null;
}

function sudoOpts(g: GlobalArgs) {
  return {
    become: g.become,
    becomeUser: g.becomeUser,
    becomePassword: g.becomePassword,
  };
}

const StateSchema = z.object({
  name: z.string().describe("Cron job identifier"),
  ensure: z.string().describe("Desired state (present or absent)"),
  status: z.enum(["compliant", "non_compliant", "applied", "failed"]).describe(
    "Compliance status",
  ),
  current: z.object({
    entryExists: z.boolean().describe("Whether the cron entry exists"),
    schedule: z.string().nullable().describe("Current schedule"),
    command: z.string().nullable().describe("Current command"),
  }).describe("Current cron state"),
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

const MARKER_PREFIX = "# cfgmgmt:";

/**
 * The user's crontab, or "" when the user has none. Any other failure (sudo
 * refused, unknown user) throws: treating it as an empty crontab would make
 * apply replace every existing entry with only the managed one.
 */
async function readCrontab(client: SshConn, g: GlobalArgs): Promise<string> {
  const r = await execSudo(
    client,
    `crontab -l -u ${shellEscape(g.user)}`,
    sudoOpts(g),
  );
  if (r.exitCode === 0) return r.stdout;
  if (/no crontab for/i.test(r.stderr + r.stdout)) return "";
  const detail = r.stderr.trim() || r.stdout.trim();
  throw new Error(
    `crontab -l for ${g.user} failed with exit code ${r.exitCode}${
      detail ? `: ${detail}` : ""
    }`,
  );
}

async function gather(client: SshConn, g: GlobalArgs): Promise<Current> {
  const lines = (await readCrontab(client, g)).split("\n");
  const marker = `${MARKER_PREFIX}${g.name}`;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === marker && i + 1 < lines.length) {
      // The command is kept verbatim (repeated spaces, tabs) so it compares
      // equal to the desired command; only the schedule is normalized.
      const m = lines[i + 1].trimStart().match(
        /^(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s(.*)$/,
      );
      if (m && m[6].length > 0) {
        const schedule = m.slice(1, 6).join(" ");
        const command = m[6];
        return { entryExists: true, schedule, command };
      }
    }
  }
  return { entryExists: false, schedule: null, command: null };
}

function desiredSchedule(g: GlobalArgs) {
  return `${g.minute} ${g.hour} ${g.day} ${g.month} ${g.weekday}`;
}

function detectChanges(g: GlobalArgs, current: Current) {
  const changes: string[] = [];
  if (g.ensure === "present") {
    if (!current.entryExists) {
      changes.push("add cron entry");
    } else {
      const sched = desiredSchedule(g);
      if (current.schedule !== sched) {
        changes.push(`schedule: ${current.schedule} -> ${sched}`);
      }
      if (current.command !== g.command) {
        changes.push(`command: ${current.command} -> ${g.command}`);
      }
    }
  } else {
    if (current.entryExists) changes.push("remove cron entry");
  }
  return changes;
}

function emptyCurrent(): Current {
  return { entryExists: false, schedule: null, command: null };
}

/**
 * Manages one marker-tagged entry in a user's crontab over SSH. `check`
 * reports drift without changing anything; `apply` adds, updates or removes
 * the entry.
 */
export const model = {
  type: "@swamp/cfgmgmt/cron",
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
      description: "Check if cron job matches desired state (dry-run)",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info("Checking cron job {name} for {user} on {host}", {
          name: g.name,
          user: g.user,
          host: g.nodeHost,
        });
        try {
          const client = await connect(g);
          const current = await gather(client, g);
          const changes = detectChanges(g, current);
          const handle = await context.writeResource("state", g.nodeHost, {
            name: g.name,
            ensure: g.ensure,
            status: changes.length === 0 ? "compliant" : "non_compliant",
            current,
            changes,
            error: null,
            timestamp: new Date().toISOString(),
          });
          context.logger.info(
            "Cron job {name} for {user} on {host} is {status}",
            {
              name: g.name,
              user: g.user,
              host: g.nodeHost,
              status: changes.length === 0 ? "compliant" : "non_compliant",
            },
          );
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error(
            "Check cron job {name} for {user} failed on {host}: {error}",
            {
              name: g.name,
              user: g.user,
              host: g.nodeHost,
              error: errorMessage(err),
            },
          );
          await context.writeResource("state", g.nodeHost, {
            name: g.name,
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
      description: "Add, update, or remove a cron job",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info("Applying cron job {name} for {user} on {host}", {
          name: g.name,
          user: g.user,
          host: g.nodeHost,
        });
        try {
          const client = await connect(g);
          const current = await gather(client, g);
          const changes = detectChanges(g, current);

          if (changes.length === 0) {
            const handle = await context.writeResource("state", g.nodeHost, {
              name: g.name,
              ensure: g.ensure,
              status: "compliant",
              current,
              changes: [],
              error: null,
              timestamp: new Date().toISOString(),
            });
            context.logger.info(
              "Cron job {name} for {user} on {host} is {status}",
              {
                name: g.name,
                user: g.user,
                host: g.nodeHost,
                status: "compliant",
              },
            );
            return { dataHandles: [handle] };
          }

          const so = sudoOpts(g);
          const marker = `${MARKER_PREFIX}${g.name}`;

          const lines = (await readCrontab(client, g)).split("\n");

          const filtered: string[] = [];
          let i = 0;
          while (i < lines.length) {
            if (lines[i].trim() === marker) {
              i += 2;
            } else {
              filtered.push(lines[i]);
              i++;
            }
          }

          while (
            filtered.length > 0 &&
            filtered[filtered.length - 1].trim() === ""
          ) {
            filtered.pop();
          }

          if (g.ensure === "present") {
            if (filtered.length > 0) filtered.push("");
            filtered.push(marker);
            filtered.push(
              `${desiredSchedule(g)} ${g.command}`,
            );
          }

          let content = filtered.join("\n");
          if (!content.endsWith("\n")) content += "\n";

          await withStagedContent(client, content, so, async (staged) => {
            await execChecked(
              client,
              `crontab -u ${shellEscape(g.user)} ${shellEscape(staged)}`,
              so,
              "crontab load",
            );
          });

          const updated = await gather(client, g);
          const handle = await context.writeResource("state", g.nodeHost, {
            name: g.name,
            ensure: g.ensure,
            status: "applied",
            current: updated,
            changes,
            error: null,
            timestamp: new Date().toISOString(),
          });
          context.logger.info(
            "Cron job {name} for {user} on {host} is {status}",
            { name: g.name, user: g.user, host: g.nodeHost, status: "applied" },
          );
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error(
            "Apply cron job {name} for {user} failed on {host}: {error}",
            {
              name: g.name,
              user: g.user,
              host: g.nodeHost,
              error: errorMessage(err),
            },
          );
          await context.writeResource("state", g.nodeHost, {
            name: g.name,
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
