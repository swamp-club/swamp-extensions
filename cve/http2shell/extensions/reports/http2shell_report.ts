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
 * Report extension for the Brotli (CVE-2026-111497, Node2Shell / HTTP2Shell)
 * scan and mitigation results.
 *
 * Renders a fleet table, the decoders that need attention, exposure,
 * processes still running old code, deduplicated recommendations, the proxy
 * stopgaps, and next-step commands. Handles both scan/scanFleet and mitigate
 * method output.
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

type Finding = {
  kind: string;
  name: string;
  path: string;
  version: string | null;
  packageVersion: string | null;
  verdict: string;
  action: string;
  fixedVersion: string | null;
};

type Step = { phase: string; command: string; status: string };

type Status = {
  target: string;
  /** Set when the hosts entry gave its own user as user@host. */
  sshUser?: string;
  hostname: string;
  os?: { id: string };
  inContainer?: boolean;
  probe?: string;
  riskLevel: string;
  action: string;
  vulnerable: boolean;
  summary: string;
  error: string | null;
  findings: Finding[];
  exposure: {
    exposedListeners: { process: string | null; local: string }[];
    inboundMiddleware: string[];
    autoDecodingClients: string[];
  };
  staleProcesses: { pid: number; process: string; unit: string | null }[];
  notChecked: string[];
  recommendations: string[];
  stopgaps: string[];
  trackerSnapshot: string;
  mitigation: {
    dryRun: boolean;
    restartServices?: boolean;
    upgradePython?: boolean;
    removePythonBrotli?: boolean;
    outcome: string;
    privilege: string;
    missingPrivileges: string[];
    steps: Step[];
    script: { shell: string; text: string } | null;
    notes: string[];
  } | null;
};

const AFFECTED = [
  "vulnerable",
  "unsupported",
  "no-fix-released",
  "update-available",
  "restart-required",
];
const VERDICT_ORDER = [
  ...AFFECTED,
  "check-vendor",
  "unknown",
  "patched",
  "not-affected",
];

/** A value from the target, safe in a markdown table cell or list item. */
function cell(v: string | null | undefined): string {
  return (v ?? "").replace(/[\r\n]+/g, " ").replace(/\|/g, "\\|");
}

function isLocal(host: string): boolean {
  return host === "localhost" || host === "127.0.0.1" || host === "::1";
}

function worstVerdict(s: Status): string {
  if (s.error) return "ERROR";
  if (s.findings.length === 0) return "no Brotli";
  for (const v of VERDICT_ORDER) {
    if (s.findings.some((f) => f.verdict === v)) return v;
  }
  return "unknown";
}

function count(s: Status, verdicts: string[]): number {
  return s.findings.filter((f) => verdicts.includes(f.verdict)).length;
}

/** A target as a hosts entry: user@host when the scan used its own user. */
function hostsEntry(r: Status): string {
  return r.sshUser ? `${r.sshUser}@${r.target}` : r.target;
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

/** Hosts mitigate can change: Linux hosts with something to upgrade or restart. */
function needsHostAction(s: Status): boolean {
  return !s.error && !s.inContainer && s.os?.id !== "windows" &&
    s.os?.id !== "macos" &&
    s.findings.some((f) =>
      (f.action === "upgrade" || f.action === "restart") &&
      (f.kind === "libbrotli" || f.kind === "python" || f.kind === "node" ||
        f.kind === "curl" || f.kind === "dotnet")
    );
}

function uniq(values: string[]): string[] {
  return [...new Set(values)];
}

/** Summarizes the scan and mitigation results of the http2shell model. */
export const report = {
  name: "@swamp/cve/http2shell-report",
  description:
    "Reports on Brotli decoder (CVE-2026-111497, Node2Shell / HTTP2Shell) scan and mitigation results",
  scope: "method",
  labels: ["security", "vulnerability"],
  execute: async (context: ReportContext) => {
    if (String(context.modelType) !== "@swamp/cve/http2shell") {
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
  const check =
    results.filter((r) =>
      !r.error && !r.vulnerable && count(r, ["check-vendor", "unknown"]) > 0
    ).length;
  const clean = results.length - errors - affected - check;

  let md =
    `# Brotli Decoder Scan (CVE-2026-111497, Node2Shell / HTTP2Shell)\n\n`;
  md +=
    `**${results.length}** target(s) scanned: **${affected}** with affected decoders, **${check}** with only decoders to check with the vendor, **${clean}** patched or without Brotli`;
  if (errors > 0) md += `, **${errors}** unreachable`;
  md += `\n\n`;

  md +=
    `| Target | Decoders | Affected | Check vendor | Worst | Risk | Action |\n`;
  md +=
    `| ------ | -------- | -------- | ------------ | ----- | ---- | ------ |\n`;
  for (const r of results) {
    md += `| ${cell(r.target)} | ${r.findings.length} | ${
      count(r, AFFECTED)
    } | ${count(r, ["check-vendor", "unknown"])} | ${
      worstVerdict(r)
    } | ${r.riskLevel.toUpperCase()} | ${r.action} |\n`;
  }

  const attention = results.flatMap((r) =>
    r.findings.filter((f) => AFFECTED.includes(f.verdict)).map((f) => ({
      r,
      f,
    }))
  );
  if (attention.length > 0) {
    md += `\n## Affected decoders\n\n`;
    md += `| Target | Kind | Path | Version | Verdict | Fixed in | Action |\n`;
    md += `| ------ | ---- | ---- | ------- | ------- | -------- | ------ |\n`;
    for (const { r, f } of attention) {
      md += `| ${cell(r.target)} | ${f.kind} | ${cell(f.path)} | ${
        cell(f.packageVersion ?? f.version ?? "?")
      } | ${f.verdict} | ${f.fixedVersion ?? "—"} | ${f.action} |\n`;
    }
  }

  const vendor = results.flatMap((r) =>
    r.findings.filter((f) => f.verdict === "check-vendor").map((f) => ({
      r,
      f,
    }))
  );
  if (vendor.length > 0) {
    md += `\n## Check with the vendor\n\n`;
    for (const { r, f } of vendor) {
      md += `- ${cell(r.target)}: ${f.kind} ${cell(f.name)} ${
        cell(f.packageVersion ?? f.version ?? "")
      } (${cell(f.path)})\n`;
    }
  }

  const exposure = results.flatMap((r) => [
    ...r.exposure.exposedListeners.map((l) =>
      `${r.target}: ${l.process ?? "?"} listens publicly on ${l.local}`
    ),
    ...r.exposure.inboundMiddleware.map((m) => `${r.target}: ${m}`),
    ...r.exposure.autoDecodingClients.map((c) =>
      `${r.target}: ${c} decodes Brotli responses automatically`
    ),
  ]);
  if (exposure.length > 0) {
    md += `\n## Exposure\n\n`;
    for (const e of uniq(exposure)) md += `- ${cell(e)}\n`;
  }

  const stale = results.flatMap((r) =>
    r.staleProcesses.map((p) =>
      `${r.target}: ${p.process} (pid ${p.pid}${
        p.unit ? `, ${p.unit}` : ""
      }) still runs the old code`
    )
  );
  if (stale.length > 0) {
    md += `\n## Restart required\n\n`;
    for (const s of stale) md += `- ${cell(s)}\n`;
  }

  const recs = uniq(results.flatMap((r) => r.recommendations));
  if (recs.length > 0) {
    md += `\n## Recommendations\n\n`;
    for (const rec of recs) md += `- ${rec}\n`;
  }

  const notChecked = uniq(
    results.flatMap((r) => r.notChecked.map((n) => `${r.target}: ${n}`)),
  );
  if (notChecked.length > 0) {
    md += `\n## Not checked\n\n`;
    for (const n of notChecked) md += `- ${cell(n)}\n`;
  }

  const stopgaps = uniq(results.flatMap((r) => r.stopgaps));
  if (stopgaps.length > 0) {
    md += `\n## Stopgaps until everything is patched\n\n`;
    for (const s of stopgaps) md += `- ${s}\n`;
  }

  const actionable = results.filter(needsHostAction).map(hostsEntry);
  if (actionable.length > 0) {
    md += `\n## Next Step\n\n`;
    md += "Run mitigate as a dry run first on the hosts that need it:\n\n";
    md += command(name, "mitigate", actionable);
  }

  md +=
    `\nFixed upstream: Brotli 1.0.10, 1.1.1, 1.2.1; Node.js 22.23.4, 24.22.1, 26.12.1; Python Brotli 1.2.1, brotlicffi 1.2.1.0. Distro verdicts use the tracker snapshot from ${
      results[0].trackerSnapshot
    }. No indicators of compromise have been published.\n`;

  return {
    markdown: md,
    json: results.map((r) => ({
      target: r.target,
      hostname: r.hostname,
      riskLevel: r.riskLevel,
      action: r.action,
      vulnerable: r.vulnerable,
      verdict: worstVerdict(r),
      decoders: r.findings.length,
      affected: count(r, AFFECTED),
      error: r.error,
    })),
  };
}

function mitigateReport(results: Status[], name: string) {
  const isDryRun = results.some((r) => r.mitigation?.dryRun);
  let md = `# Brotli (CVE-2026-111497) Mitigation: ${
    isDryRun ? "DRY RUN" : "APPLIED"
  }\n\n`;
  md += `| Target | Outcome | Privilege | Risk now | Action |\n`;
  md += `| ------ | ------- | --------- | -------- | ------ |\n`;
  for (const r of results) {
    const m = r.mitigation;
    md += `| ${cell(r.target)} | ${r.error ? "ERROR" : m?.outcome ?? "—"} | ${
      r.error ? "—" : m?.privilege ?? "—"
    } | ${r.riskLevel.toUpperCase()} | ${r.action} |\n`;
  }

  for (const r of results) {
    const m = r.mitigation;
    if (r.error) {
      md += `\n## ${cell(r.target)}\n\n- ${cell(r.error)}\n`;
      continue;
    }
    if (!m || (m.steps.length === 0 && m.notes.length === 0 && !m.script)) {
      continue;
    }
    md += `\n## ${cell(r.target)}\n\n`;
    if (m.steps.length > 0) {
      md += "```\n";
      for (const s of m.steps) {
        md += `${s.status === "planned" ? "" : `[${s.status}] `}${s.command}\n`;
      }
      md += "```\n";
    }
    for (const n of m.notes) md += `- ${n}\n`;
    if (m.script) {
      md +=
        `\nSaved script (${m.script.shell}):\n\n\`\`\`\n${m.script.text}\`\`\`\n`;
    }
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
      // Repeat the options the dry run planned with, so the run matches it.
      const m = applyHosts[0].mitigation!;
      let extra = " --input dryRun=false";
      if (m.restartServices === false) {
        extra += " --input restartServices=false";
      }
      if (m.upgradePython) extra += " --input upgradePython=true";
      if (m.removePythonBrotli) extra += " --input removePythonBrotli=true";
      md += "\nTo apply:\n\n";
      md += command(
        name,
        "mitigate",
        applyHosts.map(hostsEntry),
        extra,
      );
    }
  } else if (reached.length > 0) {
    const targets = reached.map(hostsEntry);
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
