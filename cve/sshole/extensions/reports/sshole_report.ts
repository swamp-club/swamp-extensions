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
 * Report for the *sshole (OpenSSH musl password bypass) scan. Leads with
 * whether each target is vulnerable, then the preconditions behind the
 * verdict, the exposed accounts and deduplicated recommendations.
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

type StarAccount = {
  user: string;
  uid: number | null;
  shell: string | null;
  loginCapable: boolean;
};

type Status = {
  target: string;
  hostname: string;
  libc: string;
  openSshVersion: string | null;
  usesPam: string;
  passwordAuth: string;
  starAccountsKnown: boolean;
  starAccounts: StarAccount[];
  verdict: "vulnerable" | "not-vulnerable" | "unknown";
  vulnerable: boolean;
  riskLevel: string;
  summary: string;
  reasons: string[];
  notChecked: string[];
  recommendations: string[];
  stopgaps: string[];
  fixedVersion: string;
};

const VERDICT_ORDER = ["vulnerable", "unknown", "not-vulnerable"];
const VERDICT_LABEL: Record<Status["verdict"], string> = {
  "vulnerable": "VULNERABLE",
  "not-vulnerable": "NOT VULNERABLE",
  "unknown": "UNKNOWN",
};

function cell(v: string | null | undefined): string {
  return (v ?? "").replace(/[\r\n]+/g, " ").replace(/\|/g, "\\|");
}

function uniq(values: string[]): string[] {
  return [...new Set(values)];
}

/** Summarizes the scan results of the sshole model. */
export const report = {
  name: "@swamp/cve/sshole-report",
  description:
    "Reports whether each scanned target is vulnerable to *sshole (OpenSSH musl password bypass)",
  scope: "method",
  labels: ["security", "vulnerability"],
  execute: async (context: ReportContext) => {
    if (String(context.modelType) !== "@swamp/cve/sshole") {
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

    results.sort((a, b) =>
      VERDICT_ORDER.indexOf(a.verdict) - VERDICT_ORDER.indexOf(b.verdict)
    );
    return scanReport(results);
  },
};

function scanReport(results: Status[]) {
  const count = (v: Status["verdict"]) =>
    results.filter((r) => r.verdict === v).length;
  let md = `# *sshole (OpenSSH musl password bypass)\n\n`;
  md += `${results.length} target(s) scanned — ${
    count("vulnerable")
  } vulnerable, ${count("not-vulnerable")} not vulnerable, ${
    count("unknown")
  } unknown.\n\n`;

  md +=
    `| Target | Verdict | Risk | libc | OpenSSH | PAM | PwAuth | '*' accts |\n`;
  md +=
    `| ------ | ------- | ---- | ---- | ------- | --- | ------ | --------- |\n`;
  for (const r of results) {
    const stars = r.starAccountsKnown ? String(r.starAccounts.length) : "?";
    md += `| ${cell(r.target)} | **${
      VERDICT_LABEL[r.verdict]
    }** | ${r.riskLevel.toUpperCase()} | ${cell(r.libc)} | ${
      cell(r.openSshVersion) || "?"
    } | ${cell(r.usesPam)} | ${cell(r.passwordAuth)} | ${stars} |\n`;
  }

  for (const r of results) {
    md += `\n## ${cell(r.target)} — ${VERDICT_LABEL[r.verdict]}\n\n`;
    md += `${cell(r.summary)}\n\n`;
    // On a not-vulnerable target the '*' accounts are not exposed; listing
    // them (nobody, _apt, ...) is noise.
    if (
      r.verdict !== "not-vulnerable" && r.starAccountsKnown &&
      r.starAccounts.length > 0
    ) {
      md += `'*' accounts:\n\n`;
      for (const a of r.starAccounts) {
        md += `- \`${cell(a.user)}\`${a.uid === 0 ? " (root)" : ""}${
          a.loginCapable ? "" : " — nologin shell"
        }\n`;
      }
      md += "\n";
    }
    for (const reason of r.reasons) md += `- ${cell(reason)}\n`;
    if (r.notChecked.length > 0) {
      md += `\n_Not checked: ${r.notChecked.map(cell).join("; ")}._\n`;
    }
  }

  const recs = uniq(results.flatMap((r) => r.recommendations));
  if (recs.length > 0) {
    md += `\n## Recommendations\n\n`;
    for (const rec of recs) md += `- ${cell(rec)}\n`;
  }
  const stopgaps = uniq(results.flatMap((r) => r.stopgaps));
  if (stopgaps.length > 0) {
    md += `\n## Stopgaps until patched\n\n`;
    for (const s of stopgaps) md += `- ${cell(s)}\n`;
  }

  md +=
    `\nFixed in OpenSSH ${
      results[0].fixedVersion
    } (2026-11-05). No CVE was assigned at disclosure. ` +
    `glibc hosts and hosts that authenticate through PAM are not affected.\n`;

  return {
    markdown: md,
    json: results.map((r) => ({
      target: r.target,
      verdict: r.verdict,
      vulnerable: r.vulnerable,
      riskLevel: r.riskLevel,
      libc: r.libc,
      openSshVersion: r.openSshVersion,
      starAccounts: r.starAccountsKnown ? r.starAccounts.length : null,
      summary: r.summary,
    })),
  };
}
