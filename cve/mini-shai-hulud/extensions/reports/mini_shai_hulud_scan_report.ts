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
 * Report extension for Mini Shai-Hulud supply chain scan results.
 *
 * Renders a simple CSV-style table: package name, version, status
 * (clean / COMPROMISED).
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

interface PackageResult {
  name: string;
  version: string;
  status: "clean" | "COMPROMISED";
}

interface ScanResult {
  scanTimestamp: string;
  lockfilePath: string;
  lockfileFormat: string;
  totalPackages: number;
  compromisedCount: number;
  cleanCount: number;
  packages: PackageResult[];
}

export const report = {
  name: "@swamp/cve/mini-shai-hulud-report",
  description: "Reports on Mini Shai-Hulud npm supply chain scan results",
  scope: "method",
  labels: ["security", "supply-chain"],
  execute: async (context: ReportContext) => {
    if (String(context.modelType) !== "@swamp/cve/mini-shai-hulud") {
      return { markdown: "", json: {} };
    }

    const handles = context.dataHandles.filter((h: DataHandle) =>
      h.specName === "scanResult" ||
      (h.metadata?.tags?.specName === "scanResult") ||
      (h.tags?.specName === "scanResult")
    );
    if (handles.length === 0) {
      return { markdown: "", json: {} };
    }

    const allResults: ScanResult[] = [];
    for (const handle of handles) {
      const raw = await context.dataRepository.getContent(
        context.modelType,
        context.modelId,
        handle.name,
        handle.version,
      );
      if (raw) {
        try {
          allResults.push(
            JSON.parse(new TextDecoder().decode(raw)) as ScanResult,
          );
        } catch {
          // Skip corrupted data handles
        }
      }
    }

    if (allResults.length === 0) {
      return { markdown: "", json: {} };
    }

    let md = "# Mini Shai-Hulud Supply Chain Scan\n\n";

    for (const result of allResults) {
      md += `## ${result.lockfilePath}\n\n`;
      md += `| Package | Version | Status |\n`;
      md += `| ------- | ------- | ------ |\n`;
      for (const pkg of result.packages) {
        md += `| ${pkg.name} | ${pkg.version} | ${pkg.status} |\n`;
      }
      md += "\n";
    }

    const totalCompromised = allResults.reduce(
      (sum, r) => sum + r.compromisedCount,
      0,
    );
    const totalPackages = allResults.reduce(
      (sum, r) => sum + r.totalPackages,
      0,
    );

    md += `---\n\n`;

    if (totalCompromised > 0) {
      md += `## VULNERABLE\n\n`;
      md +=
        `**${totalCompromised}** of **${totalPackages}** package(s) compromised in the May 2026 Mini Shai-Hulud attack.\n\n`;
      md += `- Remove or downgrade affected packages immediately\n`;
      md +=
        `- Check for credential exfiltration (the payload harvests secrets and CI tokens)\n`;
      md += `- Rotate any secrets that may have been exposed\n`;
      md +=
        `- See: https://safedep.io/mini-shai-hulud-strikes-again-314-npm-packages-compromised/\n`;
    } else {
      md +=
        `## CLEAN\n\n**${totalPackages}** packages scanned. No compromised packages found.\n`;
    }

    return {
      markdown: md,
      json: allResults.map((r) => ({
        lockfilePath: r.lockfilePath,
        totalPackages: r.totalPackages,
        compromisedCount: r.compromisedCount,
        cleanCount: r.cleanCount,
        status: r.compromisedCount > 0 ? "VULNERABLE" : "CLEAN",
      })),
    };
  },
};
