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
import { getConnection, writeFileAs } from "./_lib/ssh.ts";
import type { SshConn } from "./_lib/ssh.ts";
import { execChecked } from "./_lib/checks.ts";

const GlobalArgsSchema = z.object({
  hostname: z.string().describe("Primary hostname for the /etc/hosts entry"),
  ip: z.string().describe("IP address for the entry"),
  aliases: z.array(z.string()).optional().describe(
    "Additional hostname aliases",
  ),
  ensure: z.enum(["present", "absent"]).describe(
    "Whether the entry should be present or absent",
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
  hostname: z.string().describe("Primary hostname"),
  ip: z.string().describe("IP address"),
  ensure: z.string().describe("Desired state (present or absent)"),
  status: z.enum(["compliant", "non_compliant", "applied", "failed"]).describe(
    "Compliance status",
  ),
  current: z.object({
    entryExists: z.boolean().describe("Whether a matching entry exists"),
    currentIp: z.string().nullable().describe("Current IP for the hostname"),
    currentAliases: z.array(z.string()).describe("Current aliases"),
  }).describe("Current /etc/hosts state"),
  changes: z.array(z.string()).describe("List of changes detected or applied"),
  error: z.string().nullable().describe("Error message if status is failed"),
  timestamp: z.string().describe("ISO 8601 timestamp"),
});

type Current = z.infer<typeof StateSchema>["current"];

/** Structured log fields naming what this run manages, and where. */
function logFields(g: GlobalArgs) {
  return { hostname: g.hostname, host: g.nodeHost };
}

function connect(g: GlobalArgs) {
  return getConnection({
    host: g.nodeHost,
    port: g.nodePort,
    username: g.nodeUser,
    privateKeyPath: g.nodeIdentityFile,
  });
}

function parseHostsEntry(lines: string[], hostname: string) {
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const parts = trimmed.split(/\s+/);
    if (parts.length < 2) continue;
    const hostnames = parts.slice(1);
    if (hostnames.includes(hostname)) {
      return {
        entryExists: true,
        currentIp: parts[0],
        currentAliases: hostnames.filter((h) => h !== hostname).sort(),
      };
    }
  }
  return {
    entryExists: false,
    currentIp: null,
    currentAliases: [] as string[],
  };
}

async function gather(client: SshConn, g: GlobalArgs): Promise<Current> {
  const so = sudoOpts(g);
  // A missing /etc/hosts reads empty; a failed read is an error, not drift.
  const result = await execChecked(
    client,
    `test ! -e /etc/hosts || cat /etc/hosts`,
    so,
    "read /etc/hosts",
  );
  const lines = result.stdout.split("\n");
  return parseHostsEntry(lines, g.hostname);
}

/**
 * /etc/hosts without the managed entry. A line whose canonical name (first
 * name) is the managed hostname is that entry, aliases and all, and is
 * dropped. A line that only lists the hostname or a managed alias among other
 * names (`127.0.0.1 localhost myapp`) belongs to something else: just the
 * managed names come out of it, and it stays while any name remains.
 */
export function withoutManagedNames(
  lines: string[],
  g: Pick<GlobalArgs, "hostname" | "aliases">,
): string[] {
  const managed = new Set([g.hostname, ...(g.aliases ?? [])]);
  const out: string[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      out.push(line);
      continue;
    }
    const [body, ...comment] = trimmed.split("#");
    const [ip, ...names] = body.trim().split(/\s+/);
    if (names.length === 0 || !names.some((n) => managed.has(n))) {
      out.push(line);
      continue;
    }
    if (names[0] === g.hostname) continue;
    const kept = names.filter((n) => !managed.has(n));
    if (kept.length === 0) continue;
    const tail = comment.length ? ` #${comment.join("#")}` : "";
    out.push(`${ip}\t${kept.join(" ")}${tail}`);
  }
  return out;
}

function detectChanges(g: GlobalArgs, current: Current) {
  const changes: string[] = [];
  if (g.ensure === "present") {
    if (!current.entryExists) {
      changes.push("add entry");
    } else {
      if (current.currentIp !== g.ip) {
        changes.push(`ip: ${current.currentIp} -> ${g.ip}`);
      }
      const desiredAliases = g.aliases ? [...g.aliases].sort() : [];
      if (
        JSON.stringify(current.currentAliases) !==
          JSON.stringify(desiredAliases)
      ) {
        changes.push(
          `aliases: [${current.currentAliases.join(",")}] -> [${
            desiredAliases.join(",")
          }]`,
        );
      }
    }
  } else {
    if (current.entryExists) changes.push("remove entry");
  }
  return changes;
}

function emptyCurrent(): Current {
  return {
    entryExists: false,
    currentIp: null,
    currentAliases: [] as string[],
  };
}

/**
 * Manages one hostname's entry in `/etc/hosts` over SSH (IP and aliases, or
 * absence). `check` reports drift without changing anything; `apply`
 * rewrites the file to converge.
 */
export const model = {
  type: "@swamp/cfgmgmt/host_entry",
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
      description: "Check if /etc/hosts entry matches desired state (dry-run)",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info(
          "Checking hosts entry {hostname} on {host}",
          logFields(g),
        );
        try {
          const client = await connect(g);
          const current = await gather(client, g);
          const changes = detectChanges(g, current);
          const status = changes.length === 0 ? "compliant" : "non_compliant";
          const handle = await context.writeResource("state", g.nodeHost, {
            hostname: g.hostname,
            ip: g.ip,
            ensure: g.ensure,
            status,
            current,
            changes,
            error: null,
            timestamp: new Date().toISOString(),
          });
          context.logger.info(
            "Hosts entry {hostname} on {host} is {status} ({changeCount} changes)",
            {
              ...logFields(g),
              status: status,
              changeCount: changes.length,
            },
          );
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error(
            "Checking hosts entry {hostname} on {host} failed: {error}",
            {
              ...logFields(g),
              error: errorMessage(err),
            },
          );
          await context.writeResource("state", g.nodeHost, {
            hostname: g.hostname,
            ip: g.ip,
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
      description: "Add, update, or remove an /etc/hosts entry",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info(
          "Applying hosts entry {hostname} on {host}",
          logFields(g),
        );
        try {
          const client = await connect(g);
          const current = await gather(client, g);
          const changes = detectChanges(g, current);

          if (changes.length === 0) {
            const handle = await context.writeResource("state", g.nodeHost, {
              hostname: g.hostname,
              ip: g.ip,
              ensure: g.ensure,
              status: "compliant",
              current,
              changes: [],
              error: null,
              timestamp: new Date().toISOString(),
            });
            context.logger.info(
              "Hosts entry {hostname} on {host} is {status} ({changeCount} changes)",
              {
                ...logFields(g),
                status: "compliant",
                changeCount: changes.length,
              },
            );
            return { dataHandles: [handle] };
          }

          const so = sudoOpts(g);
          // The file is rewritten from this read, so a failed read must stop
          // the run rather than clobber /etc/hosts. A missing file reads empty.
          const hostsResult = await execChecked(
            client,
            `test ! -e /etc/hosts || cat /etc/hosts`,
            so,
            "read /etc/hosts",
          );
          const lines = hostsResult.stdout.split("\n");
          if (lines.length > 0 && lines[lines.length - 1] === "") lines.pop();

          const filtered = withoutManagedNames(lines, g);

          if (g.ensure === "present") {
            const parts = [g.ip, g.hostname];
            if (g.aliases) parts.push(...g.aliases);
            filtered.push(parts.join("\t"));
          }

          let content = filtered.join("\n");
          if (!content.endsWith("\n")) content += "\n";
          await writeFileAs(client, "/etc/hosts", content, so);

          const updated = await gather(client, g);
          const handle = await context.writeResource("state", g.nodeHost, {
            hostname: g.hostname,
            ip: g.ip,
            ensure: g.ensure,
            status: "applied",
            current: updated,
            changes,
            error: null,
            timestamp: new Date().toISOString(),
          });
          context.logger.info(
            "Hosts entry {hostname} on {host} is {status} ({changeCount} changes)",
            {
              ...logFields(g),
              status: "applied",
              changeCount: changes.length,
            },
          );
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error(
            "Applying hosts entry {hostname} on {host} failed: {error}",
            {
              ...logFields(g),
              error: errorMessage(err),
            },
          );
          await context.writeResource("state", g.nodeHost, {
            hostname: g.hostname,
            ip: g.ip,
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
