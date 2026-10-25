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

/**
 * Report extension for Tailworm scan and mitigation results.
 *
 * Renders scan output as a markdown table of Tailscale and headscale
 * exposure per host, the forensic signatures found, recommendations, and
 * the mitigate command to run next. Handles scan, scanFleet and mitigate.
 *
 * @module
 */

import { admits, coversTailnet } from "../models/_lib/prefix.ts";

type DataHandle = {
  specName: string;
  name: string;
  version: string;
  metadata?: { tags?: { specName?: string } };
  tags?: { specName?: string };
};

type ReportContext = {
  modelType: string;
  modelId: string;
  methodName: string;
  definition?: { name?: string };
  dataHandles: DataHandle[];
  dataRepository: {
    getContent: (
      type: string,
      modelId: string,
      dataName: string,
      version: string,
    ) => Promise<Uint8Array | null>;
  };
};

type Step = {
  phase: string;
  command: string;
  status: string;
};

type MitigationOptions = {
  removeLocalapiForwards: boolean;
  applyEgressRules: boolean;
  applyAuditRules: boolean;
  hardenHeadscale: boolean;
  headscaleMemoryMax: string;
  disableTailscaleSsh: boolean;
  disableAppConnector: boolean;
};

type ReachRule = {
  sources: string[];
  ports: { first: number; last: number }[];
  protocols: (number | string)[];
  /** Absent before 2026.10.25.5: worked out from the sources then. */
  anyTailnet?: boolean;
};

type Reachability = {
  readable: boolean;
  reason?: "no-access" | "no-addresses" | "unrecognised" | "read-failed";
  selfIps: string[];
  rules: ReachRule[];
  anyTailnet: boolean;
  sshSources: string[];
};

type Status = {
  target: string;
  /** Set when the hosts entry gave its own user as user@host. */
  sshUser?: string;
  hostname: string;
  inContainer?: boolean;
  viaDocker?: boolean;
  /** Graded from output the caller collected; the model cannot reach it. */
  externalProbe?: boolean;
  riskLevel: string;
  vulnerable: boolean;
  summary: string;
  error: string | null;
  advisory: { url: string; fixedVersion: string | null };
  tailscale: {
    installed: boolean;
    version: string | null;
    sshEnabled: boolean;
    appConnector: boolean;
    selfHostedControl: boolean;
    tcpForwards: { port: number; localapi: boolean; service?: string | null }[];
    /** Absent from statuses written before 2026.10.25.1. */
    localapiProxies?: { port: number; service?: string | null }[];
    /** Unix serve targets nobody could check; absent before 2026.10.25.3. */
    unresolvedTargets?: string[];
    sshPolicy?: {
      readable: boolean;
      acceptRules: number;
      checkRules: number;
      sources: number;
      anySource: boolean;
      rootAllowed: boolean;
      localForwarding: boolean;
      remoteForwarding: boolean;
    };
    /** Only from scans run with includeReachability. */
    reachability?: Reachability;
  };
  headscale: { installed: boolean; version: string | null };
  exposures: { id: string; severity: string }[];
  indicators: {
    socketsChecked: boolean;
    listenersChecked: boolean;
    details: { id: string; severity: string; detail: string }[];
  };
  recommendations: string[];
  mitigation: {
    dryRun: boolean;
    options?: MitigationOptions;
    outcome: string;
    privilege: string;
    missingPrivileges: string[];
    steps: Step[];
    notes: string[];
  } | null;
};

/** mitigate's argument defaults; only the others are repeated in commands. */
const DEFAULTS: MitigationOptions = {
  removeLocalapiForwards: true,
  applyEgressRules: true,
  applyAuditRules: true,
  hardenHeadscale: true,
  headscaleMemoryMax: "2G",
  disableTailscaleSsh: false,
  disableAppConnector: false,
};

/** The model's recommendation for a host with nothing to do. */
const NO_ACTION = "No action required for the Tailworm findings.";

function isLocal(host: string): boolean {
  return host === "localhost" || host === "127.0.0.1" || host === "::1";
}

function command(
  name: string,
  method: string,
  hosts: string[],
  extra = "",
): string {
  // Leave hosts out only when every target is local; dropping just the
  // local ones would skip them.
  const hostArg = hosts.every(isLocal)
    ? ""
    : ` --input hosts=${hosts.join(",")}`;
  return "```\nswamp behavior run " + name + " " + method + hostArg + extra +
    "\n```\n";
}

/** A target as a hosts entry: user@host when the scan used its own user. */
function hostsEntry(r: Status): string {
  return r.sshUser ? `${r.sshUser}@${r.target}` : r.target;
}

/**
 * The mitigate command for these results. A docker exec target is the model's
 * own and takes no hosts input; passing it as a host would make mitigate SSH
 * to "docker-<id>". SSH hosts in the same set are listed as usual. A host
 * graded from supplied output is left out: the model cannot reach it.
 */
function mitigateCommand(
  name: string,
  results: Status[],
  extra = "",
): string {
  const reachable = results.filter((r) => !r.externalProbe);
  const ssh = reachable.filter((r) => !r.viaDocker).map(hostsEntry);
  const docker = reachable.some((r) => r.viaDocker);
  let md = "";
  if (docker) md += command(name, "mitigate", [], extra);
  if (ssh.length > 0) md += command(name, "mitigate", ssh, extra);
  return md;
}

function yesNo(v: boolean): string {
  return v ? "yes" : "no";
}

/** A localapi forward or proxy; unverified when a target was not checked. */
function localapiCell(ts: Status["tailscale"]): string {
  if (
    ts.tcpForwards.some((f) => f.localapi) ||
    (ts.localapiProxies ?? []).length > 0
  ) {
    return "yes";
  }
  return (ts.unresolvedTargets ?? []).length > 0 ? "unverified" : "no";
}

/** SSH on or off, with what the node's rules allow when they were read. */
function sshCell(ts: Status["tailscale"]): string {
  if (!ts.sshEnabled) return "no";
  const p = ts.sshPolicy;
  const parts: string[] = [];
  if (ts.selfHostedControl) parts.push("self-hosted");
  if (p?.readable) {
    if (p.acceptRules + p.checkRules === 0) {
      parts.push("no rules");
    } else {
      parts.push(p.anySource ? "any source" : `${p.sources} src`);
      if (p.rootAllowed) parts.push("root");
      if (p.localForwarding || p.remoteForwarding) parts.push("fwd");
      else if (p.checkRules > 0) parts.push("check");
    }
  }
  return parts.length > 0 ? `yes (${parts.join(", ")})` : "yes";
}

function iocCell(r: Status): string {
  if (r.error) return "—";
  if (!r.indicators.socketsChecked) return "not checked";
  const ids = [...new Set(r.indicators.details.map((i) => i.id))];
  return ids.length > 0 ? ids.join(", ") : "none";
}

export const report = {
  name: "@swamp/cve/tailworm-report",
  description:
    "Reports on Tailworm (Tailscale/headscale) scan and mitigation results",
  scope: "method",
  labels: ["security", "vulnerability"],
  execute: async (context: ReportContext) => {
    if (String(context.modelType) !== "@swamp/cve/tailworm") {
      return { markdown: "", json: {} };
    }

    const handles = context.dataHandles.filter((h: DataHandle) =>
      h.specName === "status" ||
      h.metadata?.tags?.specName === "status" ||
      h.tags?.specName === "status"
    );
    const results: Status[] = [];
    for (const handle of handles) {
      const raw = await context.dataRepository.getContent(
        context.modelType,
        context.modelId,
        handle.name,
        handle.version,
      );
      if (raw) results.push(JSON.parse(new TextDecoder().decode(raw)));
    }
    if (results.length === 0) return { markdown: "", json: {} };

    // The behavior the user ran, so suggested commands work as printed.
    const name = context.definition?.name ?? context.modelId;
    if (context.methodName === "mitigate") {
      return mitigateReport(results, name);
    }
    return scanReport(results, name);
  },
};

/** Unnamed sources shown per rule before the rest are counted. */
const SHOWN_SOURCES = 3;

/** Above this many readable hosts the matrix is too wide; lists replace it. */
const MATRIX_MAX = 8;

const PROTOCOLS: Record<number, string> = { 1: "icmp", 58: "icmpv6" };

/** Why a host's inbound rules are unknown, for the report. */
const UNKNOWN: Record<string, string> = {
  "no-access":
    "the netmap was not readable (needs root or the operator user, and a running tailscaled)",
  "no-addresses": "tailscale status gave no Tailscale addresses for the node",
  "unrecognised":
    "the netmap had no packet filter this extension could read (a Tailscale release with a different netmap layout?)",
  "read-failed":
    "reading the packet filter failed (timeout or dropped connection); scan again",
};

/** A table cell: a pipe in a host name would end the cell. */
function cell(s: string): string {
  return s.replace(/\|/g, "\\|");
}

/**
 * Ports on this host that matter for Tailworm, with what serves them. A
 * Service's forwards listen on the Service's address, not the node's.
 */
function portMarks(r: Status): Map<number, string> {
  const ts = r.tailscale;
  const marks = new Map<number, string>();
  if (ts.sshEnabled) marks.set(22, "Tailscale SSH");
  for (const f of ts.tcpForwards) {
    if (f.localapi && !f.service) marks.set(f.port, "localapi");
  }
  for (const p of ts.localapiProxies ?? []) {
    if (!p.service) marks.set(p.port, "localapi");
  }
  return marks;
}

/** A rule's ports, or its protocols when it carries no TCP or UDP. */
function portsLabel(rule: ReachRule, marks: Map<number, string>): string {
  if (
    rule.protocols.length > 0 &&
    !rule.protocols.some((p) => p === 6 || p === 17)
  ) {
    return rule.protocols.map((p) =>
      typeof p === "string" ? p : PROTOCOLS[p] ?? `proto ${p}`
    ).join(", ");
  }
  const marked = (first: number, last: number) =>
    [...marks].filter(([p]) => p >= first && p <= last);
  if (rule.ports.some((p) => p.first === 0 && p.last === 65535)) {
    const m = marked(0, 65535);
    return m.length > 0
      ? `all ports (incl. ${m.map(([p, what]) => `${p} ${what}`).join(", ")})`
      : "all ports";
  }
  return rule.ports.map((p) => {
    const range = p.first === p.last ? `${p.first}` : `${p.first}-${p.last}`;
    const m = marked(p.first, p.last);
    return m.length > 0
      ? `${range} (${m.map(([, what]) => what).join(", ")})`
      : range;
  }).join(", ");
}

type ReachHost = { target: string; ips: string[] };

/** The scanned host with this exact address, if any. */
function hostAt(hosts: ReachHost[], source: string): string | null {
  const ip = source.replace(/\/(32|128)$/, "");
  return hosts.find((h) => h.ips.includes(ip))?.target ?? null;
}

/**
 * Sources that are not scanned hosts. Control lists each device once per
 * address family, so when a rule names as many IPv4 as IPv6 hosts each
 * device is shown once, by its IPv4 address.
 */
function unscanned(rest: string[]): string[] {
  const v4 = rest.filter((s) => /^\d+\.\d+\.\d+\.\d+(\/32)?$/.test(s));
  const v6 = rest.filter((s) =>
    /^[0-9a-fA-F:]+(\/128)?$/.test(s) && s.includes(":")
  );
  if (v4.length === 0 || v4.length !== v6.length) return rest;
  return [
    ...v4.map((s) => s.replace(/\/32$/, "")),
    ...rest.filter((s) => !v4.includes(s) && !v6.includes(s)),
  ];
}

/** The first few items, then a count of the rest. */
function summarise(items: string[]): string[] {
  const shown = items.slice(0, SHOWN_SOURCES);
  const more = items.length - shown.length;
  return [...shown, ...(more > 0 ? [`+${more} more`] : [])];
}

/**
 * A rule's sources: scanned hosts by name, the rest as addresses, summarised.
 * With unscannedOnly, only what a matrix between the scanned hosts cannot
 * show: null when every source is a scanned host.
 */
function sourcesLabel(
  rule: ReachRule,
  hosts: ReachHost[],
  unscannedOnly = false,
): string | null {
  if (rule.anyTailnet ?? coversTailnet(rule.sources)) {
    return "any tailnet device";
  }
  const named: string[] = [];
  const rest: string[] = [];
  for (const s of rule.sources) {
    const h = hostAt(hosts, s);
    if (h === null) rest.push(s);
    else if (!named.includes(h)) named.push(h);
  }
  const others = summarise(unscanned(rest));
  if (unscannedOnly) return rest.length > 0 ? others.join(", ") : null;
  return [...named, ...others].join(", ");
}

/**
 * What one scanned host may reach on another, from the target's rules. A
 * rule that admits by capability may or may not cover the source host: ❔.
 */
function matrixCell(from: ReachHost, to: Status): string {
  const reach = to.tailscale.reachability!;
  const marks = portMarks(to);
  const admitted = reach.rules.filter((rule) =>
    from.ips.some((ip) => admits(rule.sources, ip))
  );
  const byCap = reach.rules.filter((rule) =>
    !admitted.includes(rule) && rule.sources.some((s) => s.startsWith("cap:"))
  );
  const parts: string[] = [];
  if (admitted.length > 0) {
    parts.push(
      `✅ ${
        [...new Set(admitted.map((r) => portsLabel(r, marks)))].join("; ")
      }`,
    );
  }
  for (const rule of byCap) {
    const caps = rule.sources.filter((s) => s.startsWith("cap:"));
    parts.push(`❔ ${portsLabel(rule, marks)} with ${caps.join(", ")}`);
  }
  return parts.length > 0 ? cell(parts.join("; ")) : "🚫";
}

/**
 * Who each host's packet filter admits, and between scanned hosts a
 * source-by-destination matrix. Empty when no scan asked for it.
 */
function reachabilitySection(results: Status[]): string {
  const withReach = results.filter((r) => !r.error && r.tailscale.reachability);
  if (withReach.length === 0) return "";
  const readable = withReach.filter((r) => r.tailscale.reachability!.readable);
  const hosts: ReachHost[] = readable.map((r) => ({
    target: r.target,
    ips: r.tailscale.reachability!.selfIps,
  }));
  // With a matrix, the lists below only add what it cannot show.
  const matrix = readable.length >= 2 && readable.length <= MATRIX_MAX;

  let md = `\n## Reachability\n\n`;
  md +=
    "Each host's compiled packet filter, not a live test. Traffic a host forwards (subnet routes, exit node) is not shown.\n\n";

  if (readable.length > MATRIX_MAX) {
    md +=
      `${readable.length} hosts are too many for a matrix: each host's inbound sources are listed, with scanned hosts by name. The JSON output has every rule.\n\n`;
  }
  if (matrix) {
    md += `| From \\ To | ${
      readable.map((r) => cell(r.target)).join(" | ")
    } |\n`;
    md += `| --- |${readable.map(() => " --- |").join("")}\n`;
    for (const from of hosts) {
      md += `| ${cell(from.target)} | ${
        readable.map((to) =>
          to.target === from.target ? "—" : matrixCell(from, to)
        )
          .join(" | ")
      } |\n`;
    }
    md += "\n";
  }

  const lists: string[] = [];
  const ssh: string[] = [];
  for (const r of readable) {
    const reach = r.tailscale.reachability!;
    const marks = portMarks(r);
    // The host's own addresses read as "itself", not as bare CIDRs.
    const others = [
      ...hosts.filter((h) => h.target !== r.target),
      { target: "itself", ips: reach.selfIps },
    ];
    const rows = reach.rules.flatMap((rule) => {
      const label = sourcesLabel(rule, others, matrix);
      return label === null ? [] : [[label, portsLabel(rule, marks)]];
    });
    if (r.tailscale.sshEnabled) {
      const named = reach.sshSources.flatMap((s) => {
        const h = s === "*" ? "any" : hostAt(others, s);
        return h === null ? [] : [h];
      });
      const who = [
        ...named,
        ...unscanned(
          reach.sshSources.filter((s) => s !== "*" && !hostAt(others, s)),
        ),
      ];
      ssh.push(
        `- ${r.target} ← ${
          who.length > 0 ? [...new Set(who)].join(", ") : "nobody"
        }`,
      );
    }
    if (matrix && rows.length === 0) continue;
    let list = `→ ${r.target}${
      matrix || reach.selfIps.length === 0
        ? ""
        : ` (${reach.selfIps.join(", ")})`
    }\n`;
    if (rows.length === 0) list += "└ no inbound rules: nothing can reach it\n";
    const width = Math.max(0, ...rows.map(([s]) => s.length));
    rows.forEach(([s, p], i) => {
      list += `${i === rows.length - 1 ? "└" : "├"} ${s.padEnd(width)}  ${p}\n`;
    });
    lists.push(list);
  }

  if (lists.length > 0) {
    if (matrix) {
      md +=
        "Sources outside the scanned hosts (hosts not listed admit none):\n\n";
    }
    md += "```\n" + lists.join("\n") + "```\n\n";
  }
  if (ssh.length > 0) {
    md += "Tailscale SSH policy, who may log in:\n\n" + ssh.join("\n") + "\n\n";
  }
  for (const r of withReach) {
    if (r.tailscale.reachability!.readable) continue;
    const reason = r.tailscale.reachability!.reason;
    md += `**${r.target}**: inbound rules unknown: ${
      reason
        ? UNKNOWN[reason]
        : "the netmap was not readable (needs root or the operator user), or tailscale status gave no addresses for the node"
    }.\n\n`;
  }
  return md;
}

function scanReport(results: Status[], name: string) {
  const errors = results.filter((r) => r.error).length;
  const affected = results.filter((r) => !r.error && r.vulnerable).length;
  const compromised =
    results.filter((r) =>
      r.indicators.details.some((i) => i.severity === "critical")
    ).length;
  const clean = results.length - errors - affected;

  let md = `# Tailworm Scan Results\n\n`;
  md +=
    `**${results.length}** host(s) scanned: **${affected}** exposed, **${clean}** not exposed`;
  if (compromised > 0) md += `, **${compromised}** with forensic signatures`;
  if (errors > 0) md += `, **${errors}** unreachable`;
  md += `\n\n`;

  md +=
    `| Host | Tailscale | SSH | localapi forward | Connector | headscale | IOCs | Risk |\n`;
  md +=
    `| ---- | --------- | --- | ---------------- | --------- | --------- | ---- | ---- |\n`;
  for (const r of results) {
    if (r.error) {
      md += `| ${r.target} | — | — | — | — | — | — | ERROR |\n`;
      continue;
    }
    const ts = r.tailscale;
    md += `| ${r.target} | ${ts.installed ? ts.version ?? "?" : "—"} | ${
      ts.installed ? sshCell(ts) : "—"
    } | ${ts.installed ? localapiCell(ts) : "—"} | ${
      ts.installed ? yesNo(ts.appConnector) : "—"
    } | ${r.headscale.installed ? r.headscale.version ?? "yes" : "—"} | ${
      iocCell(r)
    } | ${r.riskLevel.toUpperCase()} |\n`;
  }

  const signatures = results.flatMap((r) =>
    r.indicators.details.map((i) => ({ r, i }))
  );
  if (signatures.length > 0) {
    md += `\n## Forensic signatures\n\n`;
    for (const { r, i } of signatures) {
      md += `- **${r.target}** [${i.severity}] ${i.detail}\n`;
    }
  }

  const errored = results.filter((r) => r.error);
  if (errored.length > 0) {
    md += `\n## Errors\n\n`;
    for (const r of errored) md += `- **${r.target}**: ${r.error}\n`;
  }

  md += reachabilitySection(results);

  // One clean host's "no action" must not sit among other hosts' actions.
  const seen = new Set<string>(
    affected + errors > 0 ? [NO_ACTION] : [],
  );
  const recs = results.flatMap((r) => r.recommendations).filter((rec) => {
    if (seen.has(rec)) return false;
    seen.add(rec);
    return true;
  });
  if (recs.length > 0) {
    md += `\n## Recommendations\n\n`;
    for (const rec of recs) md += `- ${rec}\n`;
  }

  const actionable = results.filter((r) => !r.error && r.vulnerable);
  if (actionable.length > 0) {
    md += `\n## Next Step\n\n`;
    if (actionable.some((r) => !r.externalProbe)) {
      md += "Run mitigate as a dry run first on the exposed hosts:\n\n";
      md += mitigateCommand(name, actionable);
    }
    const external = actionable.filter((r) => r.externalProbe);
    if (external.length > 0) {
      md += `${external.map((r) => r.target).join(", ")} ${
        external.length === 1 ? "was" : "were"
      } graded from probe output, so mitigate cannot reach ${
        external.length === 1 ? "it" : "them"
      }. Apply the recommendations through the same exec channel, then run the probe again and grade its output.\n`;
    }
  }

  const fixed = results.find((r) => !r.error)?.advisory.fixedVersion;
  md += `\nSource: ${
    results[0].advisory.url
  } (lab-reproduced findings against Tailscale 1.104.2 and headscale 0.29.5). ${
    fixed
      ? `Fixed Tailscale release: ${fixed}.`
      : "No fixed Tailscale release had been published."
  }\n`;

  return {
    markdown: md,
    json: results.map((r) => ({
      target: r.target,
      hostname: r.hostname,
      riskLevel: r.riskLevel,
      vulnerable: r.vulnerable,
      tailscaleVersion: r.tailscale.version,
      sshEnabled: r.tailscale.sshEnabled,
      headscale: r.headscale.installed,
      exposures: r.exposures.map((e) => e.id),
      indicators: r.indicators.details.map((i) => i.id),
      error: r.error,
      ...(r.tailscale.reachability
        ? { reachability: r.tailscale.reachability }
        : {}),
    })),
  };
}

/** The --input flags that repeat a run's non-default options. */
function optionFlags(o: MitigationOptions | undefined): string {
  if (!o) return "";
  let flags = "";
  for (const key of Object.keys(DEFAULTS) as (keyof MitigationOptions)[]) {
    if (o[key] !== DEFAULTS[key]) flags += ` --input ${key}=${o[key]}`;
  }
  return flags;
}

function mitigateReport(results: Status[], name: string) {
  const isDryRun = results.some((r) => r.mitigation?.dryRun);
  let md = `# Tailworm Mitigation: ${isDryRun ? "DRY RUN" : "APPLIED"}\n\n`;
  md += `| Host | Outcome | Privilege | Risk now |\n`;
  md += `| ---- | ------- | --------- | -------- |\n`;
  for (const r of results) {
    const m = r.mitigation;
    md += `| ${r.target} | ${r.error ? "ERROR" : m?.outcome ?? "—"} | ${
      r.error ? "—" : m?.privilege ?? "—"
    } | ${r.riskLevel.toUpperCase()} |\n`;
  }

  for (const r of results) {
    const m = r.mitigation;
    if (r.error) {
      md += `\n## ${r.target}\n\n- ${r.error}\n`;
      continue;
    }
    if (!m || (m.steps.length === 0 && m.notes.length === 0)) continue;
    md += `\n## ${r.target}\n\n`;
    if (m.steps.length > 0) {
      md += "```\n";
      for (const s of m.steps) {
        md += `${s.status === "planned" ? "" : `[${s.status}] `}${s.command}\n`;
      }
      md += "```\n";
    }
    for (const n of m.notes) md += `- ${n}\n`;
  }

  if (results.some((r) => r.mitigation?.outcome === "needs-privilege")) {
    md +=
      "\nSome hosts need root or passwordless sudo for the commands above. See the README's sudoers example.\n";
  }

  // A target that failed has nothing to verify; scan it again instead.
  const reached = results.filter((r) => !r.error);
  const applyHosts = results.filter((r) =>
    (r.mitigation?.steps.length ?? 0) > 0
  );
  if (isDryRun) {
    if (applyHosts.length > 0) {
      // One mitigate run applies the same options to every host.
      md += "\nTo apply:\n\n";
      md += mitigateCommand(
        name,
        applyHosts,
        " --input dryRun=false" +
          optionFlags(applyHosts[0].mitigation!.options),
      );
    }
  } else if (reached.length > 0) {
    // A docker exec target is the model's own; it has no SSH host. A
    // container reached over SSH is a fleet host like any other.
    const ssh = reached.filter((r) => !r.viaDocker).map(hostsEntry);
    md += "\nVerify with:\n\n";
    if (reached.some((r) => r.viaDocker) || ssh.every(isLocal)) {
      md += command(name, "scan", []);
    }
    if (ssh.length > 0 && !ssh.every(isLocal)) {
      md += command(name, "scanFleet", ssh);
    }
  }

  return {
    markdown: md,
    json: results.map((r) => ({
      target: r.target,
      dryRun: r.mitigation?.dryRun ?? isDryRun,
      outcome: r.error ? "error" : r.mitigation?.outcome ?? null,
      riskLevel: r.riskLevel,
    })),
  };
}
