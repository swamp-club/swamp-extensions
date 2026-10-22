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
 * Report extension for the PHP RCE (CVE-2026-109618, CVE-2026-109619) scan
 * and mitigation results.
 *
 * Renders a fleet table of PHP installs, verdicts and actions, the installs
 * that need attention, deduplicated recommendations, and next-step commands.
 * Handles both scan/scanFleet and mitigate method output.
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

type Install = {
  kind: string;
  path: string;
  sapi: string;
  version: string | null;
  packageName: string | null;
  packageVersion: string | null;
  verdict: string;
  action: string;
  risk: string;
};

type Step = {
  phase: string;
  command: string;
  status: string;
};

type Status = {
  target: string;
  hostname: string;
  os?: { id: string };
  inContainer?: boolean;
  riskLevel: string;
  action: string;
  vulnerable: boolean;
  summary: string;
  error: string | null;
  installs: Install[];
  exposure: { publiclyListening: boolean };
  recommendations: string[];
  trackerSnapshot: string;
  mitigation: {
    dryRun: boolean;
    applyConfigMitigations?: boolean;
    postMaxSize?: string;
    outcome: string;
    privilege: string;
    missingPrivileges: string[];
    steps: Step[];
    notes: string[];
  } | null;
};

const FIXED = "8.2.35, 8.3.36, 8.4.27 and 8.5.12";
const VERDICT_ORDER = [
  "vulnerable",
  "unsupported",
  "update-available",
  "check-vendor",
  "unknown",
  "patched",
];

function isLocal(host: string): boolean {
  return host === "localhost" || host === "127.0.0.1" || host === "::1";
}

function worstVerdict(s: Status): string {
  if (s.error) return "ERROR";
  if (s.installs.length === 0) return "no PHP";
  for (const v of VERDICT_ORDER) {
    if (s.installs.some((i) => i.verdict === v)) return v;
  }
  return "unknown";
}

function uniq(values: (string | null)[]): string {
  const u = [...new Set(values.filter((v): v is string => !!v))];
  return u.length > 0 ? u.join(", ") : "—";
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

/** Hosts mitigate can act on; Windows hosts are scanned only. */
function needsHostAction(s: Status): boolean {
  return s.os?.id !== "windows" &&
    (s.action === "restart" ||
      s.installs.some((i) =>
        i.action === "upgrade" || i.action === "isolate" ||
        (i.action === "check-vendor" && i.kind !== "container")
      ));
}

export const report = {
  name: "@swamp/cve/php-rce-2026-10-report",
  description:
    "Reports on PHP RCE (CVE-2026-109618, CVE-2026-109619) scan and mitigation results",
  scope: "method",
  labels: ["security", "vulnerability"],
  execute: async (context: ReportContext) => {
    if (String(context.modelType) !== "@swamp/cve/php-rce-2026-10") {
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
  const check = results.filter((r) =>
    !r.error && !r.vulnerable &&
    r.installs.some((i) =>
      i.verdict === "check-vendor" || i.verdict === "unknown"
    )
  ).length;
  const clean = results.length - errors - affected - check;

  let md = `# PHP RCE Scan Results (CVE-2026-109618, CVE-2026-109619)\n\n`;
  md +=
    `**${results.length}** host(s) scanned: **${affected}** affected, **${check}** to check with the vendor, **${clean}** patched or without PHP`;
  if (errors > 0) md += `, **${errors}** unreachable`;
  md += `\n\n`;

  md += `| Host | PHP | SAPIs | Verdict | Public | Risk | Action |\n`;
  md += `| ---- | --- | ----- | ------- | ------ | ---- | ------ |\n`;
  for (const r of results) {
    md += `| ${r.target} | ${uniq(r.installs.map((i) => i.version))} | ${
      uniq(r.installs.map((i) => i.sapi))
    } | ${worstVerdict(r)} | ${
      r.exposure.publiclyListening ? "yes" : "no"
    } | ${r.riskLevel.toUpperCase()} | ${r.action} |\n`;
  }

  const attention = results.flatMap((r) =>
    r.installs.filter((i) => i.verdict !== "patched").map((i) => ({ r, i }))
  );
  if (attention.length > 0) {
    md += `\n## Installs needing attention\n\n`;
    md += `| Host | Install | SAPI | Version | Package | Verdict | Action |\n`;
    md += `| ---- | ------- | ---- | ------- | ------- | ------- | ------ |\n`;
    for (const { r, i } of attention) {
      md += `| ${r.target} | ${i.path} | ${i.sapi} | ${i.version ?? "?"} | ${
        i.packageName
          ? `${i.packageName} ${i.packageVersion ?? ""}`.trim()
          : "—"
      } | ${i.verdict} | ${i.action} |\n`;
    }
  }

  const seen = new Set<string>();
  const recs = results.flatMap((r) => r.recommendations).filter((rec) => {
    if (seen.has(rec)) return false;
    seen.add(rec);
    return true;
  });
  if (recs.length > 0) {
    md += `\n## Recommendations\n\n`;
    for (const rec of recs) md += `- ${rec}\n`;
  }

  const actionable = results.filter(needsHostAction).map((r) => r.target);
  if (actionable.length > 0) {
    md += `\n## Next Step\n\n`;
    md += "Run mitigate as a dry run first on the hosts that need it:\n\n";
    md += command(name, "mitigate", actionable);
  }

  md +=
    `\nFixed upstream releases: ${FIXED}. Distro verdicts use the tracker snapshot from ${
      results[0].trackerSnapshot
    }. No indicators of compromise have been published; log counts are hints only.\n`;

  return {
    markdown: md,
    json: results.map((r) => ({
      target: r.target,
      hostname: r.hostname,
      riskLevel: r.riskLevel,
      action: r.action,
      vulnerable: r.vulnerable,
      verdict: worstVerdict(r),
      publiclyListening: r.exposure.publiclyListening,
      installs: r.installs.length,
      error: r.error,
    })),
  };
}

function mitigateReport(results: Status[], name: string) {
  const isDryRun = results.some((r) => r.mitigation?.dryRun);
  let md = `# PHP RCE Mitigation: ${isDryRun ? "DRY RUN" : "APPLIED"}\n\n`;
  md += `| Host | Outcome | Privilege | Risk now | Action |\n`;
  md += `| ---- | ------- | --------- | -------- | ------ |\n`;
  for (const r of results) {
    const m = r.mitigation;
    md += `| ${r.target} | ${r.error ? "ERROR" : m?.outcome ?? "—"} | ${
      r.error ? "—" : m?.privilege ?? "—"
    } | ${r.riskLevel.toUpperCase()} | ${r.action} |\n`;
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

  if (anyNeedsPrivilege(results)) {
    md +=
      "\nSome hosts need root or passwordless sudo for the commands above. See the README's sudoers example.\n";
  }

  // A target that failed has nothing to verify; scan it again instead.
  const reached = results.filter((r) => !r.error);
  // Only hosts with planned commands; Windows and no-fix hosts have none.
  const applyHosts = results.filter((r) =>
    (r.mitigation?.steps.length ?? 0) > 0
  );
  if (isDryRun) {
    if (applyHosts.length > 0) {
      // Repeat the options the dry run planned with, so the run matches it.
      // One mitigate run applies the same options to every host.
      const m = applyHosts[0].mitigation!;
      let extra = " --input dryRun=false";
      if (m.applyConfigMitigations) {
        extra += " --input applyConfigMitigations=true";
        if (m.postMaxSize) extra += ` --input postMaxSize=${m.postMaxSize}`;
      }
      md += "\nTo apply:\n\n";
      md += command(
        name,
        "mitigate",
        applyHosts.map((r) => r.target),
        extra,
      );
    }
  } else if (reached.length > 0) {
    const targets = reached.map((r) => r.target);
    md += "\nVerify with:\n\n";
    // A container or image target is the model's own; it has no SSH host.
    md += targets.every(isLocal) || reached.every((r) => r.inContainer)
      ? command(name, "scan", [])
      : command(name, "scanFleet", targets);
  }

  return {
    markdown: md,
    json: results.map((r) => ({
      target: r.target,
      dryRun: r.mitigation?.dryRun ?? isDryRun,
      outcome: r.error ? "error" : r.mitigation?.outcome ?? null,
      riskLevel: r.riskLevel,
      action: r.action,
    })),
  };
}

function anyNeedsPrivilege(results: Status[]): boolean {
  return results.some((r) => r.mitigation?.outcome === "needs-privilege");
}
