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
import type { SshConn } from "./_lib/ssh.ts";

const GlobalArgsSchema = z.object({
  port: z.number().int().min(1).max(65535).describe("Port number"),
  protocol: z.enum(["tcp", "udp"]).default("tcp").describe(
    "Protocol (tcp or udp)",
  ),
  action: z.enum(["allow", "deny", "reject"]).describe(
    "Firewall action for the rule",
  ),
  direction: z.enum(["in", "out"]).default("in").describe(
    "Traffic direction",
  ),
  source: z.string().regex(/^[0-9a-fA-F.:\/]+$/, "Must be valid CIDR notation")
    .optional().describe("Source CIDR (e.g. 10.0.0.0/8)"),
  destination: z.string().regex(
    /^[0-9a-fA-F.:\/]+$/,
    "Must be valid CIDR notation",
  ).optional().describe(
    "Destination address or CIDR; the rule matches only with this destination",
  ),
  comment: z.string().max(255).regex(
    /^[A-Za-z0-9._:@\/+=,-]+(?: [A-Za-z0-9._:@\/+=,-]+)*$/,
    "Letters, digits, single spaces and . _ : @ / + = , - only",
  ).optional().describe(
    "Rule comment on ufw and iptables; firewalld has no comments and rejects it",
  ),
  ensure: z.enum(["present", "absent"]).default("present").describe(
    "Whether the rule should be present or absent",
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
  port: z.number().describe("Port number"),
  protocol: z.string().describe("Protocol"),
  action: z.string().describe("Firewall action"),
  ensure: z.string().describe("Desired state"),
  status: z.enum(["compliant", "non_compliant", "applied", "failed"]).describe(
    "Compliance status",
  ),
  current: z.object({
    backend: z.string().nullable().describe(
      "Detected firewall backend (ufw, firewalld, iptables)",
    ),
    ruleExists: z.boolean().describe("Whether the rule currently exists"),
    ruleDetails: z.string().nullable().describe("Details of the matched rule"),
    narrowerRule: z.string().nullable().describe(
      "A rule limited to a destination that the wanted rule would widen",
    ),
  }).describe("Current firewall state"),
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

async function detectBackend(client: SshConn, g: GlobalArgs) {
  const so = sudoOpts(g);
  const ufw = await execSudo(
    client,
    `ufw status 2>/dev/null | head -1`,
    so,
  );
  if (ufw.exitCode === 0 && /\bStatus: active\b/.test(ufw.stdout)) {
    return "ufw";
  }

  const firewalld = await execSudo(
    client,
    `firewall-cmd --state 2>/dev/null`,
    so,
  );
  if (firewalld.exitCode === 0 && firewalld.stdout.trim() === "running") {
    return "firewalld";
  }

  const iptables = await execSudo(
    client,
    `command -v iptables 2>/dev/null`,
    so,
  );
  if (iptables.exitCode === 0) return "iptables";

  return null;
}

const NO_BACKEND = "No firewall backend found (ufw, firewalld, iptables)";

const UFW_ACTION = { allow: "ALLOW", deny: "DENY", reject: "REJECT" };
const FIREWALLD_ACTION = { allow: "accept", deny: "drop", reject: "reject" };
const IPTABLES_TARGET = { allow: "ACCEPT", deny: "DROP", reject: "REJECT" };
const PROTOCOL_NUMBER = { tcp: "6", udp: "17" };

/** ufw prints a single-host address without its prefix. */
function ufwAddress(cidr: string): string {
  return cidr.replace(cidr.includes(":") ? /\/128$/ : /\/32$/, "");
}

/**
 * Matches one line of `ufw status`, e.g. `80/tcp  ALLOW  10.0.0.0/8` or
 * `80/tcp (v6)  DENY OUT  Anywhere (v6)`, on whole tokens: the port/proto,
 * the action, the direction (`OUT`, else inbound) and the source
 * (`Anywhere` when no source is wanted). A destination shows before the port,
 * e.g. `10.0.0.5 80/tcp`: a line with one matches only when it is wanted, and a
 * ` # text` comment is compared only when one is wanted.
 */
function ufwLineMatches(line: string, g: GlobalArgs): boolean {
  const m = line.trim().match(
    /^(?:(\S+)\s+)?(\d+\/\w+)(?:\s+\(v6\))?\s+(ALLOW|DENY|REJECT|LIMIT)(?:\s+(IN|OUT|FWD))?\s+(\S+)/,
  );
  if (!m) return false;
  const [, destination, to, action, dir, from] = m;
  if (
    (destination ?? null) !==
      (g.destination ? ufwAddress(g.destination) : null)
  ) {
    return false;
  }
  if (to !== `${g.port}/${g.protocol}`) return false;
  if (action !== UFW_ACTION[g.action]) return false;
  if ((dir === "OUT" ? "out" : "in") !== g.direction) return false;
  if (from !== (g.source ? ufwAddress(g.source) : "Anywhere")) return false;
  if (g.comment === undefined) return true;
  return line.trim().match(/\s#\s(.*)$/)?.[1].trim() === g.comment;
}

/** firewalld's rich rule for `g`, unquoted; addresses are regex-validated. */
function firewalldRichRule(g: GlobalArgs): string {
  const parts = ["rule"];
  const address = g.source ?? g.destination;
  if (address) {
    parts.push(`family="${address.includes(":") ? "ipv6" : "ipv4"}"`);
  }
  if (g.source) parts.push(`source address="${g.source}"`);
  if (g.destination) parts.push(`destination address="${g.destination}"`);
  parts.push(`port port="${g.port}" protocol="${g.protocol}"`);
  parts.push(FIREWALLD_ACTION[g.action]);
  return parts.join(" ");
}

function firewalldDestination(line: string): string | null {
  return line.match(/\bdestination address="([^"]*)"/)?.[1] ?? null;
}

/**
 * Matches one line of `firewall-cmd --list-rich-rules` on its quoted port,
 * protocol, source and destination values and its action keyword.
 */
function firewalldRuleMatches(line: string, g: GlobalArgs): boolean {
  const port = line.match(/\bport port="([^"]*)" protocol="([^"]*)"/);
  if (!port || port[1] !== String(g.port) || port[2] !== g.protocol) {
    return false;
  }
  const source = line.match(/\bsource address="([^"]*)"/);
  if ((source?.[1] ?? null) !== (g.source ?? null)) return false;
  // A negated or ipset destination is not an address this model can name.
  const unquoted = line.replace(/"[^"]*"/g, '""');
  if (/\bdestination\s+(?!address=)/.test(unquoted)) return false;
  if (firewalldDestination(line) !== (g.destination ?? null)) return false;
  const action = line.match(/\s(accept|drop|reject)(?:\s|$)/);
  return action?.[1] === FIREWALLD_ACTION[g.action];
}

function withPrefix(cidr: string): string {
  if (cidr.includes("/")) return cidr;
  return `${cidr}/${cidr.includes(":") ? 128 : 32}`;
}

const IPTABLES_COMMENT = /\s--comment\s+(?:"((?:[^"\\]|\\.)*)"|(\S+))/;

/** The comment of one `iptables -S` rule, without its quoting. */
function iptablesComment(line: string): string | null {
  const m = line.match(IPTABLES_COMMENT);
  if (!m) return null;
  return m[1]?.replace(/\\(.)/g, "$1") ?? m[2];
}

/** Reads an option of one `iptables -S` rule; a comment is never read as one. */
function iptablesOptions(line: string) {
  const tokens = line.replace(IPTABLES_COMMENT, "").trim().split(/\s+/);
  return (name: string) => {
    const i = tokens.indexOf(name);
    return i >= 0 && i + 1 < tokens.length ? tokens[i + 1] : null;
  };
}

function iptablesDestination(line: string): string | null {
  return iptablesOptions(line)("-d");
}

/**
 * Matches one `iptables -S <chain>` rule, e.g.
 * `-A INPUT -s 10.0.0.0/8 -p tcp -m tcp --dport 80 -j ACCEPT`, on its option
 * values: protocol, destination port, source, destination and target. A
 * comment is compared only when one is wanted.
 */
function iptablesRuleMatches(line: string, g: GlobalArgs): boolean {
  if (!/^\s*-A\s/.test(line)) return false;
  if (/\s!\s+-d\s/.test(line.replace(IPTABLES_COMMENT, ""))) return false;
  const opt = iptablesOptions(line);
  const proto = opt("-p");
  if (proto !== g.protocol && proto !== PROTOCOL_NUMBER[g.protocol]) {
    return false;
  }
  if (opt("--dport") !== String(g.port)) return false;
  if (opt("-j") !== IPTABLES_TARGET[g.action]) return false;
  const source = opt("-s");
  if (
    (source === null ? null : withPrefix(source)) !==
      (g.source ? withPrefix(g.source) : null)
  ) {
    return false;
  }
  const destination = opt("-d");
  if (
    (destination === null ? null : withPrefix(destination)) !==
      (g.destination ? withPrefix(g.destination) : null)
  ) {
    return false;
  }
  return g.comment === undefined || iptablesComment(line) === g.comment;
}

/** Rules without addresses that allow traffic are firewalld plain ports. */
function firewalldUsesPort(g: GlobalArgs): boolean {
  return !g.source && !g.destination && g.action === "allow";
}

/**
 * Finds the wanted rule in a backend's rule listing. Without one, also finds a
 * rule that is the same apart from being limited to a destination the config
 * did not name: adding the wanted rule would widen what it covers.
 */
function findRule(
  listing: string,
  g: GlobalArgs,
  matches: (line: string, g: GlobalArgs) => boolean,
  destinationOf: (line: string) => string | null,
): Pick<Current, "ruleExists" | "ruleDetails" | "narrowerRule"> {
  let narrowerRule: string | null = null;
  for (const line of listing.split("\n")) {
    if (matches(line, g)) {
      return {
        ruleExists: true,
        ruleDetails: line.trim(),
        narrowerRule: null,
      };
    }
    if (g.destination || narrowerRule !== null) continue;
    const destination = destinationOf(line);
    if (
      destination !== null &&
      matches(line, { ...g, destination, comment: undefined })
    ) {
      narrowerRule = line.trim();
    }
  }
  return { ruleExists: false, ruleDetails: null, narrowerRule };
}

async function gather(client: SshConn, g: GlobalArgs): Promise<Current> {
  const so = sudoOpts(g);
  const backend = await detectBackend(client, g);
  if (!backend) throw new Error(NO_BACKEND);

  let ruleExists = false;
  let ruleDetails: string | null = null;
  let narrowerRule: string | null = null;

  if (backend === "ufw") {
    const result = await execChecked(client, `ufw status`, so, "ufw status");
    for (const line of result.stdout.split("\n")) {
      if (ufwLineMatches(line, g)) {
        ruleExists = true;
        ruleDetails = line.trim();
        break;
      }
    }
  } else if (backend === "firewalld") {
    if (g.direction !== "in") {
      throw new Error("the firewalld backend manages inbound rules only");
    }
    if (g.comment !== undefined) {
      throw new Error("the firewalld backend has no rule comment to manage");
    }
    if (firewalldUsesPort(g)) {
      const result = await execChecked(
        client,
        `firewall-cmd --list-ports`,
        so,
        "firewall-cmd --list-ports",
      );
      const pattern = `${g.port}/${g.protocol}`;
      if (result.stdout.split(/\s+/).includes(pattern)) {
        ruleExists = true;
        ruleDetails = pattern;
      }
    } else {
      const result = await execChecked(
        client,
        `firewall-cmd --list-rich-rules`,
        so,
        "firewall-cmd --list-rich-rules",
      );
      ({ ruleExists, ruleDetails, narrowerRule } = findRule(
        result.stdout,
        g,
        firewalldRuleMatches,
        firewalldDestination,
      ));
    }
  } else if (backend === "iptables") {
    const chain = g.direction === "in" ? "INPUT" : "OUTPUT";
    const result = await execChecked(
      client,
      `iptables -S ${chain}`,
      so,
      `iptables -S ${chain}`,
    );
    ({ ruleExists, ruleDetails, narrowerRule } = findRule(
      result.stdout,
      g,
      iptablesRuleMatches,
      iptablesDestination,
    ));
  }

  return { backend, ruleExists, ruleDetails, narrowerRule };
}

function detectChanges(g: GlobalArgs, current: Current) {
  const changes: string[] = [];
  if (g.ensure === "present" && !current.ruleExists) {
    changes.push(
      current.narrowerRule
        ? `rule for ${g.port}/${g.protocol} exists only for one destination: ${current.narrowerRule}`
        : `add ${g.action} rule for ${g.port}/${g.protocol}`,
    );
  }
  if (g.ensure === "absent" && current.ruleExists) {
    changes.push(`remove rule for ${g.port}/${g.protocol}`);
  }
  return changes;
}

function emptyCurrent(): Current {
  return {
    backend: null,
    ruleExists: false,
    ruleDetails: null,
    narrowerRule: null,
  };
}

/**
 * Manages a single port rule on the node's active firewall backend (ufw,
 * firewalld or iptables) over SSH. `check` reports drift; `apply` adds or
 * removes the rule.
 */
export const model = {
  type: "@swamp/cfgmgmt/firewall",
  version: "2026.11.01.1",
  upgrades: [
    {
      toVersion: "2026.11.01.1",
      description:
        "Add optional destination and comment arguments; existing attributes are unchanged",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
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
      description: "Check if firewall rule matches desired state (dry-run)",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info(
          "Checking firewall rule {port}/{protocol} ({action}) on {host}",
          {
            port: g.port,
            protocol: g.protocol,
            action: g.action,
            host: g.nodeHost,
          },
        );
        try {
          const client = await connect(g);
          const current = await gather(client, g);
          const changes = detectChanges(g, current);
          const status = changes.length === 0
            ? "compliant" as const
            : "non_compliant" as const;
          const handle = await context.writeResource("state", g.nodeHost, {
            port: g.port,
            protocol: g.protocol,
            action: g.action,
            ensure: g.ensure,
            status,
            current,
            changes,
            error: null,
            timestamp: new Date().toISOString(),
          });
          context.logger.info(
            "Firewall rule {port}/{protocol} ({action}) on {host} is {status}",
            {
              port: g.port,
              protocol: g.protocol,
              action: g.action,
              host: g.nodeHost,
              status,
            },
          );
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error(
            "Check firewall rule {port}/{protocol} ({action}) failed on {host}: {error}",
            {
              port: g.port,
              protocol: g.protocol,
              action: g.action,
              host: g.nodeHost,
              error: errorMessage(err),
            },
          );
          await context.writeResource("state", g.nodeHost, {
            port: g.port,
            protocol: g.protocol,
            action: g.action,
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
      description: "Add or remove a firewall rule",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info(
          "Applying firewall rule {port}/{protocol} ({action}) on {host}",
          {
            port: g.port,
            protocol: g.protocol,
            action: g.action,
            host: g.nodeHost,
          },
        );
        try {
          const client = await connect(g);
          const current = await gather(client, g);
          const changes = detectChanges(g, current);

          if (changes.length === 0) {
            const handle = await context.writeResource("state", g.nodeHost, {
              port: g.port,
              protocol: g.protocol,
              action: g.action,
              ensure: g.ensure,
              status: "compliant",
              current,
              changes: [],
              error: null,
              timestamp: new Date().toISOString(),
            });
            context.logger.info(
              "Firewall rule {port}/{protocol} ({action}) on {host} is {status}",
              {
                port: g.port,
                protocol: g.protocol,
                action: g.action,
                host: g.nodeHost,
                status: "compliant",
              },
            );
            return { dataHandles: [handle] };
          }

          if (g.ensure === "present" && current.narrowerRule) {
            throw new Error(
              `refusing to add a rule broader than an existing one (${current.narrowerRule}): set destination to manage that rule, or remove it first`,
            );
          }

          const so = sudoOpts(g);

          if (current.backend === "ufw") {
            const del = g.ensure === "present" ? "" : "delete ";
            const out = g.direction === "out" ? " out" : "";
            // ufw finds no rule to delete when given a differing comment, and
            // still exits 0, so a delete never carries one.
            const comment = g.comment && g.ensure === "present"
              ? ` comment ${shellEscape(g.comment)}`
              : "";
            const cmd = g.source || g.destination
              ? `ufw ${del}${g.action}${out} from ${
                g.source ? shellEscape(g.source) : "any"
              } to ${
                g.destination ? shellEscape(g.destination) : "any"
              } port ${g.port} proto ${g.protocol}${comment}`
              : `ufw ${del}${g.action}${out} ${g.port}/${g.protocol}${comment}`;
            await execChecked(client, cmd, so, "ufw");
          } else if (current.backend === "firewalld") {
            const add = g.ensure === "present";
            const arg = firewalldUsesPort(g)
              ? `${
                add ? "--add-port" : "--remove-port"
              }=${g.port}/${g.protocol}`
              : `${add ? "--add-rich-rule" : "--remove-rich-rule"}=${
                shellEscape(firewalldRichRule(g))
              }`;
            await execChecked(
              client,
              `firewall-cmd --permanent ${arg}`,
              so,
              "firewall-cmd --permanent",
            );
            await execChecked(
              client,
              `firewall-cmd --reload`,
              so,
              "firewall-cmd --reload",
            );
          } else if (current.backend === "iptables") {
            const chain = g.direction === "in" ? "INPUT" : "OUTPUT";
            const flag = g.ensure === "present" ? "-A" : "-D";
            let cmd =
              `iptables ${flag} ${chain} -p ${g.protocol} --dport ${g.port}`;
            if (g.source) cmd += ` -s ${shellEscape(g.source)}`;
            if (g.destination) cmd += ` -d ${shellEscape(g.destination)}`;
            // iptables -D matches the whole rule, so it needs the rule's comment
            // even when the config does not name one.
            const comment = g.comment ??
              (current.ruleDetails
                ? iptablesComment(current.ruleDetails)
                : null);
            if (comment !== null) {
              cmd += ` -m comment --comment ${shellEscape(comment)}`;
            }
            cmd += ` -j ${IPTABLES_TARGET[g.action]}`;
            await execChecked(client, cmd, so, "iptables");
          }

          const updated = await gather(client, g);
          const handle = await context.writeResource("state", g.nodeHost, {
            port: g.port,
            protocol: g.protocol,
            action: g.action,
            ensure: g.ensure,
            status: "applied",
            current: updated,
            changes,
            error: null,
            timestamp: new Date().toISOString(),
          });
          context.logger.info(
            "Firewall rule {port}/{protocol} ({action}) on {host} is {status}",
            {
              port: g.port,
              protocol: g.protocol,
              action: g.action,
              host: g.nodeHost,
              status: "applied",
            },
          );
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error(
            "Apply firewall rule {port}/{protocol} ({action}) failed on {host}: {error}",
            {
              port: g.port,
              protocol: g.protocol,
              action: g.action,
              host: g.nodeHost,
              error: errorMessage(err),
            },
          );
          await context.writeResource("state", g.nodeHost, {
            port: g.port,
            protocol: g.protocol,
            action: g.action,
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
