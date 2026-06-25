/**
 * Report for CVE research results.
 *
 * Classifies CVEs into real-world buckets (supply-chain, infrastructure,
 * open-source library, vendor product, web app) and only renders detail
 * for the ones that matter — supply-chain compromises, infrastructure/
 * platform vulns, and actively exploited threats. Vendor product bugs
 * get a summary count unless they're in CISA KEV.
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

type CveRecord = {
  id: string;
  description?: string;
  categories?: string[];
  vendorProject?: string;
  product?: string;
  knownExploited?: boolean;
  severity?: string;
  severityScore: number;
  published?: string;
  isNew?: boolean;
  source?: string;
  references?: string[];
};

type Classification =
  | "supply-chain"
  | "infrastructure"
  | "web-app"
  | "open-source-library"
  | "vendor-product";

type ActionabilityScore = {
  impact: number;
  scannable: number;
  remediation: number;
  total: number;
  recommendation: string;
  reasons: string[];
};

type ScoredCve = CveRecord & {
  title: string;
  classification: Classification;
  classLabel: string;
  score: ActionabilityScore;
};

// ---------------------------------------------------------------------------
// Classification
// ---------------------------------------------------------------------------

const _VENDOR_PRODUCT_KEYWORDS = [
  "jetbrains",
  "splunk",
  "oracle",
  "sap",
  "adobe",
  "microsoft",
  "fortinet",
  "ivanti",
  "vmware",
  "atlassian",
  "salesforce",
  "workday",
  "servicenow",
  "snowflake",
  "datadog",
  "elastic",
  "mongodb",
];

const INFRA_KEYWORDS = [
  "kernel",
  "linux",
  "cisco",
  "palo alto",
  "arista",
  "juniper",
  "sd-wan",
  "pan-os",
  "eos",
  "ios-xe",
  "freebsd",
  "openbsd",
  "qemu",
  "kvm",
  "hypervisor",
  "firmware",
  "uefi",
  "bios",
  "grub",
  "bootloader",
];

const WEBAPP_KEYWORDS = [
  "wordpress",
  "plugin for wordpress",
  "joomla",
  "drupal",
  "magento",
  "shopify",
  "woocommerce",
  "cms",
  "theme for wordpress",
];

const OSS_ECOSYSTEMS = new Set([
  "npm",
  "pip",
  "go",
  "nuget",
  "maven",
  "crates.io",
  "rubygems",
  "packagist",
  "pub",
  "hex",
  "cargo",
  "composer",
  "pypi",
]);

function classify(cve: CveRecord): Classification {
  const desc = (cve.description ?? "").toLowerCase();
  const cats = cve.categories ?? [];
  const eco = (cve.vendorProject ?? "").toLowerCase();
  const product = (cve.product ?? "").toLowerCase();
  const combined = `${desc} ${eco} ${product}`;

  if (
    cats.includes("supply-chain") ||
    /supply.chain|malicious.*(package|version|code)|compromised.*(package|extension|publish)/i
      .test(desc)
  ) {
    return "supply-chain";
  }
  if (
    cats.includes("kernel") || INFRA_KEYWORDS.some((k) => combined.includes(k))
  ) {
    return "infrastructure";
  }
  if (WEBAPP_KEYWORDS.some((k) => combined.includes(k))) {
    return "web-app";
  }
  if (OSS_ECOSYSTEMS.has(eco)) {
    return "open-source-library";
  }
  return "vendor-product";
}

const CLASS_LABELS: Record<Classification, string> = {
  "supply-chain": "Supply Chain",
  "infrastructure": "Infrastructure & Platform",
  "open-source-library": "Open-Source Libraries",
  "web-app": "Web App / CMS Plugins",
  "vendor-product": "Vendor Products",
};

// ---------------------------------------------------------------------------
// Actionability scoring
// ---------------------------------------------------------------------------

function scoreActionability(
  cve: CveRecord,
  classification: Classification,
): ActionabilityScore {
  let impact = 0;
  let scannable = 0;
  let remediation = 0;
  const reasons: string[] = [];

  const desc = (cve.description ?? "").toLowerCase();
  const cats = cve.categories ?? [];

  if (cve.knownExploited) {
    impact += 3;
    reasons.push("actively exploited in the wild");
  }

  if (classification === "supply-chain") {
    impact += 3;
    scannable += 3;
    remediation += 3;
    reasons.push(
      "supply-chain attack — lockfile scanning is automatable, requires credential rotation and package removal",
    );
  } else if (classification === "infrastructure") {
    impact += 2;
    scannable += 2;
    remediation += 1;
    reasons.push("infrastructure-level — version/module checks are scriptable");
    if (desc.includes("module") || desc.includes("blocklist")) {
      remediation += 2;
      reasons.push("module blocklisting and cache flushing needed");
    }
  } else if (classification === "open-source-library") {
    scannable += 2;
    reasons.push("dependency scanning can detect this");
    if (cats.includes("rce")) {
      impact += 1;
      reasons.push("remote code execution");
    }
  }

  if (
    desc.includes("credential") || desc.includes("secret") ||
    desc.includes("token") || desc.includes("rotate")
  ) {
    remediation += 2;
    reasons.push("credential rotation may be needed");
  }

  if (cats.includes("rce") && classification !== "open-source-library") {
    impact += 1;
    reasons.push("remote code execution");
  }

  if (cve.severityScore >= 9.5) impact += 1;

  impact = Math.min(impact, 3);
  scannable = Math.min(scannable, 3);
  remediation = Math.min(remediation, 3);

  const raw = impact + scannable + remediation;
  const multiplier = cve.knownExploited
    ? 1.2
    : (cve.severity === "CRITICAL" ? 1.1 : 1.0);
  const total = Math.min(10, Math.round(raw * multiplier * 10) / 10);

  let recommendation: string;
  if (total >= 7) {
    recommendation = "Extension candidate";
  } else if (total >= 4) {
    recommendation = "Monitor";
  } else {
    recommendation = "Patch only";
  }

  return { impact, scannable, remediation, total, recommendation, reasons };
}

// ---------------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------------

function formatDate(iso: string | undefined): string {
  if (!iso) return "Unknown date";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function deriveTitle(cve: CveRecord): string {
  const desc = cve.description ?? "";
  const inMatch = desc.match(/^In\s+(\S+(?:\s+\S+){0,3})\s+before\s/i);
  if (inMatch) return inMatch[1];
  const colonMatch = desc.match(/^([^:]{3,60}):\s/);
  if (colonMatch) return colonMatch[1];
  if (cve.product) {
    const vendor = cve.vendorProject ? `${cve.vendorProject}/` : "";
    return `${vendor}${cve.product}`;
  }
  const first = desc.split(/[.!]\s/)[0] ?? "";
  return first.length <= 80 ? first : first.slice(0, 77) + "...";
}

function severityBadge(cve: CveRecord): string {
  const exploited = cve.knownExploited ? " / ACTIVELY EXPLOITED" : "";
  return `${cve.severity} (${cve.severityScore})${exploited}`;
}

function sourceLabel(source: string): string {
  switch (source) {
    case "NVD":
      return "NVD";
    case "GITHUB":
      return "GitHub Advisory";
    case "CISA_KEV":
      return "CISA KEV";
    default:
      return source;
  }
}

function scoreBar(value: number, max: number): string {
  const filled = Math.round((value / max) * 5);
  return "█".repeat(filled) + "░".repeat(5 - filled);
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

export const report = {
  name: "@swamp/cve/researcher-report",
  description:
    "Markdown CVE research report with real-world classification and actionability scoring",
  scope: "method",
  labels: ["security", "cve", "research"],
  execute: async (context: ReportContext) => {
    if (String(context.modelType) !== "@swamp/cve/researcher") {
      return { markdown: "", json: {} };
    }

    const handles = context.dataHandles.filter((h: DataHandle) =>
      h.specName === "results" ||
      h.metadata?.tags?.specName === "results" ||
      h.tags?.specName === "results"
    );
    if (handles.length === 0) return { markdown: "", json: {} };

    const handle = handles[handles.length - 1];
    const raw = await context.dataRepository.getContent(
      context.modelType,
      context.modelId,
      handle.name,
      handle.version,
    );
    if (!raw) return { markdown: "", json: {} };

    let result: Record<string, unknown>;
    try {
      result = JSON.parse(new TextDecoder().decode(raw)) as Record<
        string,
        unknown
      >;
    } catch {
      return { markdown: "", json: {} };
    }

    const cves = (result.cves ?? result.newCVEs ?? []) as CveRecord[];
    const timestamp = formatDate(result.timestamp as string | undefined);
    const lookbackDays = (result.lookbackDays ?? "?") as number | string;
    const newCount = (result.newCount ??
      cves.filter((c: CveRecord) => c.isNew).length) as number;

    // Classify and score all CVEs
    const scored: ScoredCve[] = cves.map((cve: CveRecord) => {
      const classification = classify(cve);
      return {
        ...cve,
        title: deriveTitle(cve),
        classification,
        classLabel: CLASS_LABELS[classification],
        score: scoreActionability(cve, classification),
      };
    });

    // Split into reportable vs noise
    // Reportable: supply-chain, infrastructure, open-source libs, anything actively exploited, extension candidates, monitors
    // Noise: vendor-product bugs and web-app plugin bugs (unless CISA KEV)
    const reportable = scored.filter((c: ScoredCve) =>
      c.classification === "supply-chain" ||
      c.classification === "infrastructure" ||
      c.classification === "open-source-library" ||
      c.knownExploited ||
      c.score.recommendation === "Extension candidate" ||
      c.score.recommendation === "Monitor"
    );
    const noise = scored.filter((c: ScoredCve) => !reportable.includes(c));

    // Group reportable by recommendation
    const extensionCandidates = reportable.filter((c: ScoredCve) =>
      c.score.recommendation === "Extension candidate"
    );
    const monitors = reportable.filter((c: ScoredCve) =>
      c.score.recommendation === "Monitor"
    );
    const reportablePatchOnly = reportable.filter((c: ScoredCve) =>
      c.score.recommendation === "Patch only"
    );

    // --- Build markdown ---
    const lines: string[] = [];
    lines.push("# CVE Research Report");
    lines.push("");
    lines.push(`**Date:** ${timestamp}`);
    lines.push(
      `**Lookback window:** ${lookbackDays} day${
        lookbackDays === 1 ? "" : "s"
      }`,
    );
    lines.push(`**CVEs evaluated:** ${result.totalScanned}`);
    lines.push(`**CVEs in window:** ${cves.length} (${newCount} new)`);
    lines.push("");

    const src = (result.sources ?? {}) as Record<
      string,
      { queried?: boolean; count?: number; error?: boolean }
    >;
    const srcParts: string[] = [];
    if (src.nvd?.queried) {
      srcParts.push(`NVD: ${src.nvd.count}${src.nvd.error ? " (error)" : ""}`);
    }
    if (src.github?.queried) {
      srcParts.push(
        `GitHub: ${src.github.count}${src.github.error ? " (error)" : ""}`,
      );
    }
    if (src.cisaKev?.queried) {
      srcParts.push(
        `CISA KEV: ${src.cisaKev.count}${src.cisaKev.error ? " (error)" : ""}`,
      );
    }
    if (srcParts.length > 0) {
      lines.push(`**Sources:** ${srcParts.join(" | ")}`);
      lines.push("");
    }

    if (cves.length === 0) {
      lines.push(
        `No HIGH or CRITICAL CVEs published in the last ${lookbackDays} day${
          lookbackDays === 1 ? "" : "s"
        }.`,
      );
      return {
        markdown: lines.join("\n"),
        json: {
          status: "CLEAN",
          newCount: 0,
          totalScanned: result.totalScanned,
        },
      };
    }

    // Summary by classification
    lines.push("## Summary");
    lines.push("");
    const byClass: Record<string, number> = {};
    for (const c of scored) {
      byClass[c.classLabel] = (byClass[c.classLabel] ?? 0) + 1;
    }
    lines.push("| Classification | Count | Reported |");
    lines.push("|---|---|---|");
    for (
      const [label, count] of Object.entries(byClass).sort((
        a: [string, number],
        b: [string, number],
      ) => b[1] - a[1])
    ) {
      const reportedCount = reportable.filter((c: ScoredCve) =>
        c.classLabel === label
      ).length;
      const detail = reportedCount > 0
        ? `${reportedCount} (see below)`
        : "summary only";
      lines.push(`| ${label} | ${count} | ${detail} |`);
    }
    lines.push("");

    if (extensionCandidates.length > 0) {
      lines.push(
        `**${extensionCandidates.length} extension candidate${
          extensionCandidates.length > 1 ? "s" : ""
        }** identified.`,
      );
      lines.push("");
    }

    // Extension candidates
    if (extensionCandidates.length > 0) {
      lines.push("---");
      lines.push("");
      lines.push("## Extension Candidates");
      lines.push("");
      lines.push(
        "High impact, programmatically scannable, specific remediation required —",
      );
      lines.push("strong candidates for a dedicated swamp extension.");
      lines.push("");
      for (const cve of extensionCandidates) {
        renderDetailCve(lines, cve);
      }
    }

    // Monitors
    if (monitors.length > 0) {
      lines.push("---");
      lines.push("");
      lines.push("## Monitor");
      lines.push("");
      lines.push("Worth tracking but may not need a dedicated extension yet.");
      lines.push("");
      for (const cve of monitors) {
        renderDetailCve(lines, cve);
      }
    }

    // Reportable patch-only (supply-chain, infra, OSS libs, actively exploited)
    if (reportablePatchOnly.length > 0) {
      lines.push("---");
      lines.push("");
      lines.push("## Relevant Patch Items");
      lines.push("");
      lines.push(
        "These are in categories you care about (supply-chain, infrastructure, open-source",
      );
      lines.push(
        "libraries, or actively exploited) but don't need special tooling.",
      );
      lines.push("");
      for (const cve of reportablePatchOnly) {
        const newTag = cve.isNew ? " (NEW)" : "";
        const date = formatDate(cve.published);
        lines.push(
          `- **${cve.title}**${newTag} — ${cve.classLabel} — ${
            severityBadge(cve)
          } — ${date}`,
        );
        let summary = (cve.description ?? "").replace(
          /\s*\(Action due:[^)]*\)\s*$/,
          "",
        );
        if (summary.length > 200) summary = summary.slice(0, 197) + "...";
        lines.push(`  ${summary}`);
        lines.push("");
      }
    }

    // Noise summary
    if (noise.length > 0) {
      lines.push("---");
      lines.push("");
      lines.push("## Other");
      lines.push("");
      lines.push(
        `${noise.length} additional CVEs in vendor products and web app plugins — standard patching, no action needed.`,
      );
      lines.push("");

      const noiseBySev: Record<string, number> = { CRITICAL: 0, HIGH: 0 };
      const noiseByClass: Record<string, number> = {};
      for (const c of noise) {
        const sev = c.severity ?? "UNKNOWN";
        noiseBySev[sev] = (noiseBySev[sev] ?? 0) + 1;
        noiseByClass[c.classLabel] = (noiseByClass[c.classLabel] ?? 0) + 1;
      }

      lines.push("| Severity | Count |");
      lines.push("|---|---|");
      if (noiseBySev.CRITICAL > 0) {
        lines.push(`| Critical | ${noiseBySev.CRITICAL} |`);
      }
      if (noiseBySev.HIGH > 0) lines.push(`| High | ${noiseBySev.HIGH} |`);
      lines.push("");

      const sortedNoise = Object.entries(noiseByClass).sort((
        a: [string, number],
        b: [string, number],
      ) => b[1] - a[1]);
      if (sortedNoise.length > 0) {
        lines.push("| Classification | Count |");
        lines.push("|---|---|");
        for (const [cls, count] of sortedNoise) {
          lines.push(`| ${cls} | ${count} |`);
        }
        lines.push("");
      }
    }

    lines.push("---");
    lines.push("");
    lines.push("### Scoring Methodology");
    lines.push("");
    lines.push(
      "Each CVE is classified (supply-chain, infrastructure, open-source library, vendor product,",
    );
    lines.push("web app) and scored on three dimensions (0-3 each):");
    lines.push("");
    lines.push("- **Impact**: How many systems/users are affected?");
    lines.push("- **Scannable**: Can exposure be detected programmatically?");
    lines.push("- **Remediation**: Are there steps beyond just updating?");
    lines.push("");
    lines.push("Total score (0-10) determines the recommendation:");
    lines.push("- **7+** = Extension candidate — build a swamp scanner");
    lines.push(
      "- **4-6** = Monitor — track, but standard patching may suffice",
    );
    lines.push("- **<4** = Patch only — update and move on");
    lines.push("");
    lines.push(
      "Vendor product bugs and web app plugin vulns are summarised unless actively exploited (CISA KEV).",
    );
    lines.push("");
    lines.push(
      "*Sources: NVD, GitHub Advisory DB, CISA Known Exploited Vulnerabilities*",
    );

    // --- Build JSON ---
    const jsonSummary = {
      status: extensionCandidates.length > 0
        ? "EXTENSIONS_NEEDED"
        : (monitors.length > 0 ? "REVIEW" : "CLEAN"),
      totalInWindow: cves.length,
      newCount,
      lookbackDays,
      totalScanned: result.totalScanned,
      byClassification: byClass,
      extensionCandidates: extensionCandidates.map(summarizeCve),
      monitor: monitors.map(summarizeCve),
      reportablePatchOnly: reportablePatchOnly.map(summarizeCve),
      otherCount: noise.length,
    };

    return {
      markdown: lines.join("\n"),
      json: jsonSummary,
    };
  },
};

function summarizeCve(cve: ScoredCve): Record<string, unknown> {
  return {
    id: cve.id,
    title: cve.title,
    classification: cve.classification,
    severity: cve.severity,
    severityScore: cve.severityScore,
    published: cve.published,
    knownExploited: cve.knownExploited,
    categories: cve.categories,
    source: cve.source,
    actionabilityScore: cve.score.total,
    recommendation: cve.score.recommendation,
    reasons: cve.score.reasons,
  };
}

function renderDetailCve(lines: string[], cve: ScoredCve): void {
  const date = formatDate(cve.published);
  const cats = (cve.categories ?? []).filter((c: string) =>
    c !== "other" && c !== "known-exploited"
  );
  const s = cve.score;

  const newBadge = cve.isNew ? " (NEW)" : "";
  lines.push(`### ${cve.title}${newBadge}`);
  lines.push("");
  lines.push(`| | |`);
  lines.push(`|---|---|`);
  lines.push(`| **CVE** | ${cve.id} |`);
  lines.push(`| **Published** | ${date} |`);
  lines.push(`| **Severity** | ${severityBadge(cve)} |`);
  lines.push(`| **Classification** | ${cve.classLabel} |`);
  lines.push(`| **Source** | ${sourceLabel(cve.source ?? "Unknown")} |`);
  if (cats.length > 0) {
    lines.push(`| **Categories** | ${cats.join(", ")} |`);
  }
  if (cve.vendorProject || cve.product) {
    const affected = [cve.vendorProject, cve.product].filter(Boolean).join(
      " / ",
    );
    lines.push(`| **Affected** | ${affected} |`);
  }
  lines.push(`| **Actionability** | **${s.total}/10** — ${s.recommendation} |`);
  lines.push(`| Impact | ${scoreBar(s.impact, 3)} ${s.impact}/3 |`);
  lines.push(`| Scannable | ${scoreBar(s.scannable, 3)} ${s.scannable}/3 |`);
  lines.push(
    `| Remediation | ${scoreBar(s.remediation, 3)} ${s.remediation}/3 |`,
  );
  lines.push("");

  let summary = cve.description ?? "";
  summary = summary.replace(/\s*\(Action due:[^)]*\)\s*$/, "");
  if (summary.length > 500) summary = summary.slice(0, 497) + "...";
  lines.push(summary);
  lines.push("");

  if (s.reasons.length > 0) {
    lines.push(`> **Why:** ${s.reasons.join("; ")}`);
    lines.push("");
  }

  if (cve.references && cve.references.length > 0) {
    lines.push(`> ${cve.references[0]}`);
    lines.push("");
  }
}
