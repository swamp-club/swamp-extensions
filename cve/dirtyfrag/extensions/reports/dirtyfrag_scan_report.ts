// Swamp, an Automation Framework
// Copyright (C) 2026 System Initiative, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

/**
 * Swamp datastore backend that stores repository state in Google Cloud Storage.
 *
 * Provides distributed locking via GCS generation-based preconditions and
 * bidirectional sync between a local cache directory and a GCS bucket. Use
 * this entrypoint when a swamp deployment should share state between multiple
 * processes or machines through GCS rather than a local directory.
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

export const report = {
  name: "@swamp/cve/dirtyfrag-report",
  description:
    "Reports on Dirty Frag vulnerability scan and mitigation results",
  scope: "method",
  labels: ["security", "vulnerability"],
  execute: async (context: ReportContext) => {
    if (String(context.modelType) !== "@swamp/cve/dirtyfrag") {
      return { markdown: "", json: {} };
    }

    const handles = context.dataHandles.filter((h: DataHandle) =>
      h.specName === "status" ||
      (h.metadata?.tags?.specName === "status") ||
      (h.tags?.specName === "status")
    );
    if (handles.length === 0) {
      return { markdown: "", json: {} };
    }

    const allResults = [];
    for (const handle of handles) {
      const raw = await context.dataRepository.getContent(
        context.modelType,
        context.modelId,
        handle.name,
        handle.version,
      );
      if (raw) {
        allResults.push(JSON.parse(new TextDecoder().decode(raw)));
      }
    }

    if (allResults.length === 0) {
      return { markdown: "", json: {} };
    }

    // --- Mitigate report ---
    if (context.methodName === "mitigate") {
      const isDryRun = allResults[0].summary.includes("Dry run");

      let md = "";

      if (isDryRun) {
        md += `# Dirty Frag Mitigation: DRY RUN\n\n`;
      } else {
        md += `# Dirty Frag Mitigation: APPLIED\n\n`;
      }

      md += `| Host | Kernel | Status |\n`;
      md += `| ---- | ------ | ------ |\n`;
      for (const r of allResults) {
        let status;
        if (r.summary.includes("failed")) status = "FAILED";
        else if (!r.vulnerable) status = "SKIPPED (not vulnerable)";
        else if (isDryRun) status = "DRY RUN";
        else status = "APPLIED";
        md += `| ${r.hostname} | ${r.kernelVersion} | ${status} |\n`;
      }

      md += `\n## Commands${
        isDryRun ? " (will execute with dryRun=false)" : ""
      }\n\n`;
      md += `| Step | Command | Purpose |\n`;
      md += `| ---- | ------- | ------- |\n`;
      md +=
        `| 1 | \`printf 'install esp4 /bin/false\\n...' > /etc/modprobe.d/dirtyfrag.conf\` | Blacklist esp4/esp6/rxrpc modules |\n`;
      md +=
        `| 2 | \`rmmod esp4; rmmod esp6; rmmod rxrpc\` | Unload modules from running kernel |\n`;
      md +=
        `| 3 | \`echo 3 > /proc/sys/vm/drop_caches\` | Flush page cache (clears corrupted entries) |\n\n`;

      const allHosts = allResults.map((r) => r.hostname);
      const isLocal = allHosts.every((h) =>
        h === "localhost" || h === "127.0.0.1"
      );

      if (isDryRun) {
        md += "To apply:\n\n";
        md += isLocal
          ? "```\nswamp model method run dirtyfrag-scanner mitigate --input dryRun=false\n```\n"
          : "```\nswamp model method run dirtyfrag-scanner mitigate --input hosts=" +
            allHosts.join(",") + " --input dryRun=false\n```\n";
      } else {
        md += "Verify with:\n\n";
        md += isLocal
          ? "```\nswamp model method run dirtyfrag-scanner scan\n```\n"
          : "```\nswamp model method run dirtyfrag-scanner scanFleet --input hosts=" +
            allHosts.join(",") + "\n```\n";
      }

      return {
        markdown: md,
        json: allResults.map((r) => ({
          hostname: r.hostname,
          dryRun: isDryRun,
          applied: !isDryRun && !r.summary.includes("failed"),
        })),
      };
    }

    // --- Scan / scanFleet report ---
    const vulnCount = allResults.filter((r) => r.vulnerable).length;
    const cleanCount = allResults.length - vulnCount;
    const compromisedCount =
      allResults.filter((r) =>
        r.indicators.suPageCacheCorrupted ||
        r.indicators.passwdPageCacheCorrupted
      ).length;

    let md = `# Dirty Frag Scan Results\n\n`;
    md +=
      `**${allResults.length}** hosts scanned: **${vulnCount}** vulnerable, **${cleanCount}** clean`;
    if (compromisedCount > 0) md += `, **${compromisedCount}** compromised`;
    md += `\n\n`;

    md +=
      `| Host | Kernel | Risk | ESP (43284) | RxRPC (43500) | IOCs | Status |\n`;
    md +=
      `| ---- | ------ | ---- | ----------- | ------------- | ---- | ------ |\n`;

    for (const r of allResults) {
      const risk = r.riskLevel.toUpperCase();
      let esp = "N/A";
      if (r.cve202643284.affected) {
        if (r.cve202643284.patched) esp = "Patched";
        else if (r.mitigations.espModulesBlacklisted) esp = "Mitigated";
        else esp = "Vulnerable";
      }
      let rxrpc = "N/A";
      if (r.cve202643500.affected) {
        if (r.cve202643500.patched) rxrpc = "Patched";
        else if (r.mitigations.rxrpcModuleBlacklisted) rxrpc = "Mitigated";
        else rxrpc = "Vulnerable";
      }
      const iocs = [];
      if (r.indicators.suPageCacheCorrupted) iocs.push("su corrupted");
      if (r.indicators.passwdPageCacheCorrupted) iocs.push("passwd corrupted");
      if (r.indicators.suspiciousXfrmSAs) iocs.push("XFRM SAs");
      if (r.indicators.rxrpcKeysFound) iocs.push("rxrpc keys");
      const iocStr = iocs.length > 0 ? iocs.join(", ") : "None";
      const status = r.vulnerable ? "VULNERABLE" : "CLEAN";

      md +=
        `| ${r.hostname} | ${r.kernelVersion} | ${risk} | ${esp} | ${rxrpc} | ${iocStr} | ${status} |\n`;
    }

    if (allResults.some((r) => r.recommendations.length > 0)) {
      md += `\n## Recommendations\n\n`;
      const seen = new Set();
      for (const r of allResults) {
        for (const rec of r.recommendations) {
          if (!seen.has(rec)) {
            seen.add(rec);
            md += `- ${rec}\n`;
          }
        }
      }
    }

    if (vulnCount > 0) {
      md += `\n## Next Step\n\n`;
      md += "Run mitigate (dry run first) on vulnerable hosts:\n\n";
      const vulnHosts = allResults.filter((r) => r.vulnerable).map((r) =>
        r.hostname
      );
      const vulnLocal = vulnHosts.every((h) =>
        h === "localhost" || h === "127.0.0.1"
      );
      md += vulnLocal
        ? "```\nswamp model method run dirtyfrag-scanner mitigate\n```\n"
        : "```\nswamp model method run dirtyfrag-scanner mitigate --input hosts=" +
          vulnHosts.join(",") + "\n```\n";
    }

    return {
      markdown: md,
      json: allResults.map((r) => ({
        vulnerable: r.vulnerable,
        riskLevel: r.riskLevel,
        hostname: r.hostname,
        kernelVersion: r.kernelVersion,
        esp: r.cve202643284.affected,
        rxrpc: r.cve202643500.affected,
        compromised: r.indicators.suPageCacheCorrupted ||
          r.indicators.passwdPageCacheCorrupted,
      })),
    };
  },
};
