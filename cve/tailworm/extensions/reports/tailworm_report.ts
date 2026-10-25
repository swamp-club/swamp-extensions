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
    tcpForwards: { localapi: boolean }[];
    /** Absent from statuses written before 2026.10.25.1. */
    localapiProxies?: unknown[];
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
