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
 * Report extension for eMudhra CA compromise scan and mitigation results.
 *
 * Renders scan output as a markdown summary per host: the OS store verdict,
 * exposed runtimes, agents and language stores, the live check, and the next
 * command to run. Handles scan, scanFleet and mitigate output.
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
  definition?: { name: string };
  modelType: string;
  modelId: string;
  methodName: string;
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

type Component = {
  kind: string;
  name: string;
  path: string;
  version: string;
  fixedIn?: string;
  status: string;
  note: string;
};

type Mitigation = {
  dryRun: boolean;
  action: string;
  applied: boolean;
  succeeded: boolean;
  privilege: string;
  missingPrivilege: string[];
  steps: { why: string; command: string }[];
  failedStep?: string;
  before: { verdict: string; riskLevel: string };
  manual: string[];
  restart: string[];
  notes: string[];
  summary: string;
};

type HostStatus = {
  target: string;
  hostname: string;
  dataAsOf: string;
  os: { prettyName: string; id: string; versionId: string };
  exposed: boolean;
  riskLevel: string;
  summary: string;
  osStore: {
    verdict: string;
    trustedPaths: string[];
    verdictMethod: string;
    caCertificates: { installed: string; fixedIn: string; patched: string };
  };
  components: Component[];
  liveCheck: { verifier: string; path: string; host: string; result: string }[];
  unreadable: string[];
  recommendations: string[];
  mitigation?: Mitigation;
};

function storeCell(r: HostStatus): string {
  const s = r.osStore;
  if (s.verdict === "trusted") {
    return `TRUSTS (${s.trustedPaths.join(", ")} path)`;
  }
  return s.verdict === "not-trusted" ? "rejects" : "unknown";
}

function componentsCell(r: HostStatus): string {
  const bad = r.components.filter((c) =>
    c.status === "exposed" || c.status === "no-fix-released"
  );
  if (bad.length === 0) return "none";
  // The same version at several paths (a mise shim and its install) is
  // listed once here; the recommendations name each path.
  return [...new Set(bad.map((c) => `${c.name} ${c.version}`.trim()))].join(
    ", ",
  );
}

function hostsArg(results: HostStatus[]): string {
  const remote = results.filter((r) =>
    !["localhost", "127.0.0.1", "::1"].includes(r.target) &&
    !r.target.startsWith("docker-") && !r.target.startsWith("image-")
  );
  return remote.length > 0
    ? ` --input hosts=${remote.map((r) => r.target).join(",")}`
    : "";
}

export const report = {
  name: "@swamp/cve/emudhra-report",
  description: "Reports on eMudhra CA compromise scan and mitigation results",
  scope: "method",
  labels: ["security", "vulnerability", "tls"],
  execute: async (context: ReportContext) => {
    if (String(context.modelType) !== "@swamp/cve/emudhra") {
      return { markdown: "", json: {} };
    }
    // The commands it suggests use the model's own name.
    const model = context.definition?.name ?? "emudhra-scanner";

    const handles = context.dataHandles.filter((h: DataHandle) =>
      h.specName === "status" ||
      (h.metadata?.tags?.specName === "status") ||
      (h.tags?.specName === "status")
    );
    const results: HostStatus[] = [];
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

    if (context.methodName === "mitigate") {
      const dryRun = results.some((r) => r.mitigation?.dryRun);
      const applied = results.some((r) => r.mitigation?.applied);
      let md = `# eMudhra Mitigation: ${
        dryRun ? "DRY RUN" : applied ? "APPLIED" : "NOTHING APPLIED"
      }\n\n`;
      md += `| Host | Before | Action | After | Result |\n`;
      md += `| ---- | ------ | ------ | ----- | ------ |\n`;
      for (const r of results) {
        const m = r.mitigation;
        if (!m) continue;
        const result = m.action === "needs-privilege"
          ? `NEEDS PRIVILEGE (${m.missingPrivilege.join(", ")})`
          : m.dryRun || !m.applied
          ? "not applied"
          : m.succeeded
          ? "FIXED"
          : "FAILED";
        md += `| ${r.hostname} | ${m.before.verdict} | ${m.action} | ${
          m.applied ? r.osStore.verdict : "-"
        } | ${result} |\n`;
      }
      for (const r of results) {
        const m = r.mitigation;
        if (!m) continue;
        md += `\n## ${r.hostname}\n\n${m.summary}\n`;
        if (m.steps.length > 0) {
          md += `\n${
            m.dryRun ? "Planned" : "Steps"
          } (privilege: ${m.privilege}):\n\n\`\`\`sh\n`;
          for (const s of m.steps) md += `# ${s.why}\n${s.command}\n`;
          md += "```\n";
        }
        if (m.action === "needs-privilege") {
          md +=
            "\nNothing was changed. Run the `mitigationScript` file for this host with sudo yourself, or allow passwordless sudo for exactly these binaries: " +
            m.missingPrivilege.map((b) => `\`${b}\``).join(", ") + ".\n";
        }
        for (const x of m.manual) md += `- Manual: ${x}\n`;
        for (const x of m.notes) md += `- Note: ${x}\n`;
        for (const x of m.restart) md += `- Restart: ${x}\n`;
      }
      // A dry run with nothing to apply points to the manual list and a rescan.
      const applicable = results.some((r) =>
        r.mitigation?.action === "apply" ||
        r.mitigation?.action === "needs-privilege"
      );
      md += dryRun && applicable
        ? `\nTo apply:\n\n\`\`\`\nswamp model method run ${model} mitigate${
          hostsArg(results)
        } --input dryRun=false\n\`\`\`\n`
        : `\nVerify with:\n\n\`\`\`\nswamp model method run ${model} ${
          hostsArg(results) ? `scanFleet${hostsArg(results)}` : "scan"
        }\n\`\`\`\n`;
      return {
        markdown: md,
        json: results.map((r) => ({
          hostname: r.hostname,
          action: r.mitigation?.action,
          dryRun: r.mitigation?.dryRun,
          applied: r.mitigation?.applied,
          succeeded: r.mitigation?.succeeded,
          before: r.mitigation?.before.verdict,
          after: r.osStore.verdict,
        })),
      };
    }

    const exposed = results.filter((r) => r.exposed);
    // Only a host with nothing unchecked is clean; the rest are counted apart.
    const clean = results.filter((r) => r.riskLevel === "none");
    const unchecked = results.length - exposed.length - clean.length;
    let md = `# eMudhra CA Compromise Scan\n\n`;
    md +=
      `**${results.length}** target(s) scanned: **${exposed.length}** exposed, **${clean.length}** clean${
        unchecked > 0 ? `, **${unchecked}** not fully checked` : ""
      }. Data as of ${results[0].dataAsOf}.\n\n`;
    md +=
      `| Host | OS | Risk | OS store | ca-certificates | Exposed components | Live check |\n`;
    md +=
      `| ---- | -- | ---- | -------- | --------------- | ------------------ | ---------- |\n`;
    for (const r of results) {
      const pkg = r.osStore.caCertificates;
      const live = r.liveCheck.length === 0
        ? "-"
        : r.liveCheck.map((l) => `${l.verifier} ${l.path}: ${l.result}`).join(
          ", ",
        );
      md += `| ${r.hostname} | ${
        r.os.prettyName || r.os.id
      } | ${r.riskLevel.toUpperCase()} | ${storeCell(r)} | ${
        pkg.installed || "?"
      } (${pkg.patched}) | ${componentsCell(r)} | ${live} |\n`;
    }

    const recs = new Set<string>();
    for (const r of results) for (const x of r.recommendations) recs.add(x);
    if (recs.size > 0) {
      md += `\n## Recommendations\n\n`;
      for (const x of recs) md += `- ${x}\n`;
    }
    const unreadable = results.flatMap((r) =>
      r.unreadable.map((u) => `${r.hostname}: ${u}`)
    );
    if (unreadable.length > 0) {
      md += `\n## Not checked\n\n`;
      for (const u of unreadable) md += `- ${u}\n`;
    }
    if (exposed.some((r) => r.osStore.verdict === "trusted")) {
      md +=
        `\n## Next Step\n\nRun mitigate (dry run first):\n\n\`\`\`\nswamp model method run ${model} mitigate${
          hostsArg(exposed)
        }\n\`\`\`\n`;
    }

    return {
      markdown: md,
      json: results.map((r) => ({
        hostname: r.hostname,
        exposed: r.exposed,
        riskLevel: r.riskLevel,
        osStore: r.osStore.verdict,
        trustedPaths: r.osStore.trustedPaths,
        exposedComponents: r.components.filter((c) =>
          c.status === "exposed" || c.status === "no-fix-released"
        ).map((c) => c.name),
      })),
    };
  },
};
