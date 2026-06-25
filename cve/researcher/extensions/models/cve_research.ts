import { z } from "npm:zod@4.3.6";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Logger = {
  info: (msg: string, ctx?: Record<string, unknown>) => void;
  warning: (msg: string, ctx?: Record<string, unknown>) => void;
  debug: (msg: string, ctx?: Record<string, unknown>) => void;
};

type MethodContext = {
  globalArgs: z.infer<typeof GlobalArgsSchema>;
  logger: Logger;
  repoDir: string;
  writeResource: (
    specName: string,
    instanceName: string,
    data: unknown,
  ) => Promise<unknown>;
};

/** A CVE record before the isNew flag is applied. */
type RawCve = {
  id: string;
  description: string;
  severity: "HIGH" | "CRITICAL";
  severityScore: number;
  source: "NVD" | "GITHUB" | "CISA_KEV";
  published: string;
  categories: string[];
  references: string[];
  knownExploited: boolean;
  vendorProject?: string;
  product?: string;
};

/** A CVE record with the isNew flag applied. */
type Cve = RawCve & { isNew: boolean };

/** Scored CVE used during Discord formatting. */
type ScoredCve = Cve & { _score: number; _cls: string };

type SourceResult = {
  findings: RawCve[];
  error: string | null;
};

type FetchResult = {
  data: Record<string, unknown> | unknown[] | null;
  error: string | null;
};

type PersistentState = {
  lastCheck: string | null;
  seenIds: Set<string>;
};

// ---------------------------------------------------------------------------
// Schemas
// ---------------------------------------------------------------------------

const GlobalArgsSchema = z.object({
  severityThreshold: z
    .enum(["CRITICAL", "HIGH"])
    .default("HIGH")
    .describe("Minimum severity to surface (HIGH includes CRITICAL)"),
  lookbackDays: z
    .number()
    .int()
    .positive()
    .max(90)
    .default(1)
    .describe(
      "How many days back to include in the report (default 1 = yesterday)",
    ),
  keywords: z
    .array(z.string())
    .optional()
    .describe(
      "Optional keywords to filter CVEs (e.g., 'supply-chain', 'rce', 'linux kernel'). Empty means all HIGH/CRITICAL.",
    ),
  maxResultsPerSource: z
    .number()
    .int()
    .positive()
    .max(200)
    .default(40)
    .describe("Max CVE records to fetch per source"),
});

const CveSchema = z.object({
  id: z.string(),
  description: z.string(),
  severity: z.enum(["HIGH", "CRITICAL"]),
  severityScore: z.number(),
  source: z.enum(["NVD", "GITHUB", "CISA_KEV"]),
  published: z.string(),
  categories: z.array(z.string()),
  references: z.array(z.string()),
  knownExploited: z.boolean(),
  isNew: z.boolean().describe("True if this CVE was not seen in any prior run"),
  vendorProject: z.string().optional(),
  product: z.string().optional(),
});

const ResearchResultSchema = z.object({
  cves: z.array(CveSchema).describe("All CVEs in the lookback window"),
  newCount: z.number().describe("How many CVEs are new since last run"),
  totalScanned: z.number().describe("Total CVEs evaluated this run"),
  lookbackDays: z.number().describe("Lookback window used"),
  timestamp: z.string(),
  discordSummary: z.string().describe(
    "Concise summary for Discord (under 2000 chars)",
  ),
  sources: z.object({
    nvd: z.object({
      queried: z.boolean(),
      count: z.number(),
      error: z.string().optional(),
    }),
    github: z.object({
      queried: z.boolean(),
      count: z.number(),
      error: z.string().optional(),
    }),
    cisaKev: z.object({
      queried: z.boolean(),
      count: z.number(),
      error: z.string().optional(),
    }),
  }),
});

// ---------------------------------------------------------------------------
// State persistence
// ---------------------------------------------------------------------------

async function loadState(repoDir: string): Promise<PersistentState> {
  const path = `${repoDir}/cve-research-state.json`;
  try {
    const raw: string = await Deno.readTextFile(path);
    const parsed: Record<string, unknown> = JSON.parse(raw);
    return {
      lastCheck: (parsed.lastCheck as string) ?? null,
      seenIds: new Set<string>(
        (parsed.seenIds as string[]) ?? [],
      ),
    };
  } catch {
    return { lastCheck: null, seenIds: new Set<string>() };
  }
}

async function saveState(
  repoDir: string,
  state: PersistentState,
): Promise<void> {
  await Deno.writeTextFile(
    `${repoDir}/cve-research-state.json`,
    JSON.stringify(
      { lastCheck: state.lastCheck, seenIds: [...state.seenIds].sort() },
      null,
      2,
    ),
  );
}

// ---------------------------------------------------------------------------
// HTTP helper
// ---------------------------------------------------------------------------

async function fetchJson(
  url: string,
  opts?: RequestInit,
): Promise<FetchResult> {
  let lastError = "";
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const resp: Response = await fetch(url, {
        ...(opts ?? {}),
        signal: AbortSignal.timeout(30_000),
      });
      if (resp.status === 429 || resp.status === 503) {
        lastError = `HTTP ${resp.status}`;
        await new Promise((r: (v: void) => void) =>
          setTimeout(r, 2 ** attempt * 3000)
        );
        continue;
      }
      if (!resp.ok) {
        lastError = `HTTP ${resp.status}`;
        continue;
      }
      return { data: await resp.json(), error: null };
    } catch (e: unknown) {
      lastError = (e instanceof Error ? e.message : undefined) ??
        "fetch failed";
      await new Promise((r: (v: void) => void) =>
        setTimeout(r, 2 ** attempt * 1000)
      );
    }
  }
  return { data: null, error: lastError };
}

// ---------------------------------------------------------------------------
// Category detection
// ---------------------------------------------------------------------------

function categorizeCve(description: string): string[] {
  const desc: string = (description ?? "").toLowerCase();
  const cats: string[] = [];
  if (
    desc.includes("supply chain") || desc.includes("supply-chain") ||
    desc.includes("malicious package")
  ) cats.push("supply-chain");
  if (desc.includes("remote code execution") || desc.includes("rce")) {
    cats.push("rce");
  }
  if (desc.includes("privilege escalation") || desc.includes("privesc")) {
    cats.push("privilege-escalation");
  }
  if (
    desc.includes("kernel") || desc.includes("kmod") || desc.includes("splice")
  ) cats.push("kernel");
  if (
    desc.includes("buffer overflow") || desc.includes("heap overflow") ||
    desc.includes("stack overflow")
  ) cats.push("memory-corruption");
  if (desc.includes("sql injection") || desc.includes("sqli")) {
    cats.push("sql-injection");
  }
  if (desc.includes("cross-site scripting") || desc.includes("xss")) {
    cats.push("xss");
  }
  if (desc.includes("authentication bypass") || desc.includes("auth bypass")) {
    cats.push("auth-bypass");
  }
  if (desc.includes("denial of service") || desc.includes("dos")) {
    cats.push("dos");
  }
  if (
    desc.includes("npm") || desc.includes("pypi") || desc.includes("crate") ||
    desc.includes("maven")
  ) cats.push("package-ecosystem");
  if (cats.length === 0) cats.push("other");
  return cats;
}

function isRecentDate(dateStr: string, daysBack: number): boolean {
  if (!dateStr) return false;
  const d: Date = new Date(dateStr);
  if (isNaN(d.getTime())) return false;
  const cutoff: Date = new Date();
  cutoff.setDate(cutoff.getDate() - daysBack);
  return d >= cutoff;
}

// ---------------------------------------------------------------------------
// NVD source
// ---------------------------------------------------------------------------

async function queryNvd(
  maxResults: number,
  severityThreshold: string,
  logger: Logger,
): Promise<SourceResult> {
  const findings: RawCve[] = [];
  const headers: Record<string, string> = {};
  const apiKey: string | undefined = Deno.env.get("NVD_API_KEY");
  if (apiKey) headers["apiKey"] = apiKey;

  const severities: string[] = severityThreshold === "CRITICAL"
    ? ["CRITICAL"]
    : ["CRITICAL", "HIGH"];

  for (const sev of severities) {
    const url =
      `https://services.nvd.nist.gov/rest/json/cves/2.0?cvssV3Severity=${sev}&resultsPerPage=${maxResults}`;

    const { data, error } = await fetchJson(url, { headers });
    if (
      !data || !("vulnerabilities" in (data as Record<string, unknown>))
    ) {
      if (error) {
        logger.warning("NVD query failed for {sev}: {error}", { sev, error });
      }
      continue;
    }

    const vulnerabilities = (data as Record<string, unknown>)
      .vulnerabilities as Record<string, unknown>[];

    for (const vuln of vulnerabilities) {
      const cve = vuln?.cve as Record<string, unknown> | undefined;
      if (!cve) continue;

      const descriptions =
        (cve.descriptions as Array<{ lang: string; value: string }>) ?? [];
      const enDesc = descriptions.find(
        (d: { lang: string; value: string }) => d.lang === "en",
      );
      const desc: string = enDesc?.value ?? descriptions[0]?.value ?? "";

      const metrics = (cve.metrics as Record<string, unknown>) ?? {};
      const allMetrics: Array<Record<string, unknown>> = [
        ...((metrics.cvssMetricV31 as Array<Record<string, unknown>>) ?? []),
        ...((metrics.cvssMetricV30 as Array<Record<string, unknown>>) ?? []),
      ];
      const primary: Record<string, unknown> | undefined = allMetrics.find(
        (m: Record<string, unknown>) => m.type === "Primary",
      ) ?? allMetrics[0];
      const cvss = primary?.cvssData as Record<string, unknown> | undefined;
      const score: number = parseFloat(
        (cvss?.baseScore as string) ?? "0",
      );
      const severity: "HIGH" | "CRITICAL" = cvss?.baseSeverity === "CRITICAL"
        ? "CRITICAL"
        : "HIGH";

      const refs: string[] = ((cve.references as Array<{ url: string }>) ?? [])
        .map((r: { url: string }) => r.url)
        .filter(Boolean);

      findings.push({
        id: cve.id as string,
        description: desc.slice(0, 1000),
        severity,
        severityScore: score,
        source: "NVD",
        published: (cve.published as string) ?? "",
        categories: categorizeCve(desc),
        references: refs.slice(0, 5),
        knownExploited: false,
      });
    }

    if (severities.length > 1) {
      await new Promise((r: (v: void) => void) => setTimeout(r, 6000));
    }
  }

  return { findings, error: null };
}

// ---------------------------------------------------------------------------
// GitHub Advisory DB source
// ---------------------------------------------------------------------------

async function queryGithubAdvisories(
  maxResults: number,
  severityThreshold: string,
  logger: Logger,
): Promise<SourceResult> {
  const findings: RawCve[] = [];

  const severities: string[] = severityThreshold === "CRITICAL"
    ? ["critical"]
    : ["critical", "high"];

  for (const sev of severities) {
    const url = `https://api.github.com/advisories?per_page=${
      Math.min(maxResults, 100)
    }&severity=${sev}&sort=published&direction=desc`;

    const { data, error } = await fetchJson(url, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "swamp-cve-research/1.0",
      },
    });

    if (!Array.isArray(data)) {
      if (error) {
        logger.warning("GitHub Advisory query failed for {sev}: {error}", {
          sev,
          error,
        });
      }
      continue;
    }

    for (const adv of data as Array<Record<string, unknown>>) {
      const cveId: string = (adv.cve_id as string) ??
        `GHSA-${adv.ghsa_id as string}`;
      const desc: string = (adv.summary as string) ??
        (adv.description as string) ?? "";
      const severity: "HIGH" | "CRITICAL" = sev === "critical"
        ? "CRITICAL"
        : "HIGH";

      const cvss = adv.cvss as Record<string, unknown> | undefined;
      const score: number = (cvss?.score as number) ??
        (severity === "CRITICAL" ? 9.0 : 7.5);
      const refs: string[] = ((adv.references as string[]) ?? []).filter(
        Boolean,
      );
      const vulns = (adv.vulnerabilities as Array<Record<string, unknown>>) ??
        [];
      const firstVuln = vulns[0] as Record<string, unknown> | undefined;
      const pkg = firstVuln?.package as Record<string, unknown> | undefined;
      const vendorProject: string | undefined = pkg?.ecosystem as
        | string
        | undefined;
      const product: string | undefined = pkg?.name as string | undefined;

      findings.push({
        id: cveId,
        description: desc.slice(0, 1000),
        severity,
        severityScore: score,
        source: "GITHUB",
        published: (adv.published_at as string) ?? "",
        categories: categorizeCve(desc),
        references: refs.slice(0, 5),
        knownExploited: false,
        vendorProject,
        product,
      });
    }
  }

  return { findings, error: null };
}

// ---------------------------------------------------------------------------
// CISA KEV source (with fallback URL)
// ---------------------------------------------------------------------------

const CISA_KEV_URLS = [
  "https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json",
  "https://raw.githubusercontent.com/cisagov/kev-data/develop/known_exploited_vulnerabilities.json",
];

async function queryCisaKev(
  _maxResults: number,
  logger: Logger,
): Promise<SourceResult> {
  let data: Record<string, unknown> | null = null;
  let lastError: string | null = null;

  for (const url of CISA_KEV_URLS) {
    const result: FetchResult = await fetchJson(url, {});
    if (
      result.data &&
      "vulnerabilities" in (result.data as Record<string, unknown>)
    ) {
      data = result.data as Record<string, unknown>;
      break;
    }
    lastError = result.error;
    logger.warning("CISA KEV fetch failed from {url}: {error}", {
      url,
      error: result.error ?? "no data",
    });
  }

  if (!data || !("vulnerabilities" in data)) {
    return { findings: [], error: lastError ?? "all CISA KEV URLs failed" };
  }

  const vulnerabilities = data.vulnerabilities as Array<
    Record<string, unknown>
  >;

  const findings: RawCve[] = vulnerabilities.map(
    (v: Record<string, unknown>) => ({
      id: v.cveID as string,
      description: `${
        (v.shortDescription as string) ??
          (v.vulnerabilityName as string) ?? ""
      } (Action due: ${(v.dueDate as string) ?? "N/A"})`.slice(0, 1000),
      severity: "CRITICAL" as const,
      severityScore: 9.0,
      source: "CISA_KEV" as const,
      published: (v.dateAdded as string) ?? "",
      categories: [
        ...categorizeCve((v.shortDescription as string) ?? ""),
        "known-exploited",
      ],
      references: [
        `https://www.cve.org/CVERecord?id=${v.cveID as string}`,
      ],
      knownExploited: true,
      vendorProject: v.vendorProject as string | undefined,
      product: v.product as string | undefined,
    }),
  );

  return { findings, error: null };
}

// ---------------------------------------------------------------------------
// Discord embed payload (rich formatting)
// ---------------------------------------------------------------------------

function formatDiscordSummary(
  cves: Cve[],
  lookbackDays: number,
  timestamp: string,
): string {
  const newCves: Cve[] = cves.filter((c: Cve) => c.isNew);
  const OSS_ECOS: string[] = [
    "npm",
    "pip",
    "go",
    "nuget",
    "maven",
    "crates.io",
    "rubygems",
    "packagist",
    "composer",
    "pypi",
  ];
  function cls(c: Cve): string {
    const d: string = (c.description ?? "").toLowerCase();
    const cats: string[] = c.categories ?? [];
    const eco: string = (c.vendorProject ?? "").toLowerCase();
    const cmb: string = `${d} ${eco} ${(c.product ?? "").toLowerCase()}`;
    if (
      cats.includes("supply-chain") ||
      /supply.chain|malicious.*(package|version|code)|compromised/i.test(d)
    ) return "supply-chain";
    if (
      cats.includes("kernel") ||
      /kernel|linux|cisco|palo alto|arista|juniper|sd-wan|pan-os|firmware/i
        .test(cmb)
    ) return "infrastructure";
    if (/wordpress|joomla|drupal|magento|cms|plugin for wordpress/i.test(cmb)) {
      return "web-app";
    }
    if (OSS_ECOS.includes(eco)) return "open-source-library";
    return "vendor-product";
  }

  function score(c: Cve): number {
    const classification: string = cls(c);
    let s = 0;
    if (c.knownExploited) s += 4;
    if (classification === "supply-chain") s += 5;
    else if (classification === "infrastructure") s += 3;
    else if (classification === "open-source-library") s += 2;
    if ((c.categories ?? []).includes("rce")) s += 1;
    if (/credential|secret|token/i.test(c.description ?? "")) s += 1;
    if (c.severity === "CRITICAL") s = Math.round(s * 1.1);
    return Math.min(10, s);
  }

  function cveTitle(c: Cve): string {
    const product: string = [c.vendorProject, c.product].filter(Boolean).join(
      "/",
    );
    if (product) return product;
    const desc: string = c.description ?? "";
    const colonMatch: RegExpMatchArray | null = desc.match(/^([^:]{3,50}):\s/);
    if (colonMatch) return colonMatch[1];
    return c.id;
  }

  function cveSummary(c: Cve): string {
    const desc: string = (c.description ?? "").replace(
      /\s*\(Action due:[^)]*\)\s*$/,
      "",
    );
    return desc.length <= 300 ? desc : desc.slice(0, 297) + "...";
  }

  if (cves.length === 0) {
    return JSON.stringify({
      embeds: [{
        title: "CVE Research Report",
        description: `No HIGH or CRITICAL CVEs in the last ${lookbackDays}d.`,
        color: 0x2ecc71,
        timestamp: timestamp,
        footer: { text: "NVD • GitHub Advisory • CISA KEV" },
      }],
    });
  }

  const scored: ScoredCve[] = cves.map((c: Cve) => ({
    ...c,
    _score: score(c),
    _cls: cls(c),
  }));
  const extCandidates: ScoredCve[] = scored.filter(
    (c: ScoredCve) => c._score >= 7,
  );
  const monitors: ScoredCve[] = scored.filter(
    (c: ScoredCve) => c._score >= 4 && c._score < 7,
  );
  const rest: ScoredCve[] = scored.filter((c: ScoredCve) => c._score < 4);

  // Pick embed color: red if extension candidates, orange if monitors, grey if just patch
  const color: number = extCandidates.length > 0
    ? 0xe74c3c
    : monitors.length > 0
    ? 0xe67e22
    : 0x95a5a6;

  const fields: Array<{ name: string; value: string; inline: boolean }> = [];

  function buildFieldValue(
    cves: ScoredCve[],
    maxItems: number,
    formatter: (c: ScoredCve) => string,
  ): string {
    const LIMIT = 1024;
    const items: string[] = [];
    const overflow: string = cves.length > maxItems
      ? `\n\n*… and ${cves.length - maxItems} more*`
      : "";

    for (const c of cves.slice(0, maxItems)) {
      const entry: string = formatter(c);
      const candidate: string = [...items, entry].join("\n\n") + overflow;
      if (candidate.length > LIMIT) break;
      items.push(entry);
    }

    const remaining: number = cves.length - items.length;
    if (remaining > 0) {
      items.push(`*… and ${remaining} more*`);
    }
    return items.join("\n\n").slice(0, LIMIT);
  }

  if (extCandidates.length > 0) {
    fields.push({
      name: `🔴 ${extCandidates.length} Extension Candidate${
        extCandidates.length > 1 ? "s" : ""
      }`,
      value: buildFieldValue(extCandidates, 5, (c: ScoredCve) => {
        const badge: string = c.knownExploited ? " ⚠️" : "";
        return `**${cveTitle(c)}**${badge}\n${cveSummary(c)}`;
      }),
      inline: false,
    });
  } else {
    fields.push({
      name: "🟢 Extension Candidates",
      value:
        "None found — no CVEs scored high enough to warrant a dedicated scanner.",
      inline: false,
    });
  }

  if (monitors.length > 0) {
    fields.push({
      name: `🟠 ${monitors.length} Monitor`,
      value: buildFieldValue(
        monitors,
        5,
        (c: ScoredCve) =>
          `**${cveTitle(c)}** (${c.severity} ${c.severityScore})\n${
            cveSummary(c)
          }`,
      ),
      inline: false,
    });
  }

  if (rest.length > 0) {
    const byClass: Record<string, number> = {};
    for (const c of rest) {
      const label: string = ({
        "vendor-product": "Vendor Product",
        "web-app": "Web App",
        "open-source-library": "Open-Source Lib",
        "infrastructure": "Infrastructure",
        "supply-chain": "Supply Chain",
      } as Record<string, string>)[c._cls] ?? c._cls;
      byClass[label] = (byClass[label] ?? 0) + 1;
    }
    const parts: string[] = Object.entries(byClass).sort(
      (a: [string, number], b: [string, number]) => b[1] - a[1],
    ).map(
      ([k, v]: [string, number]) => `${k}: ${v}`,
    );
    fields.push({
      name: `⚪ ${rest.length} Patch Only`,
      value: parts.join("\n"),
      inline: false,
    });
  }

  const embed = {
    title: "CVE Research Report",
    description:
      `**${cves.length}** CVEs in the last ${lookbackDays}d (${newCves.length} new)`,
    color,
    fields,
    timestamp: timestamp,
    footer: { text: "NVD • GitHub Advisory • CISA KEV" },
  };

  return JSON.stringify({ embeds: [embed] });
}

// ---------------------------------------------------------------------------
// Model
// ---------------------------------------------------------------------------

export const model = {
  type: "@swamp/cve/researcher",
  version: "2026.06.25.1",
  globalArguments: GlobalArgsSchema,
  reports: ["@swamp/cve/researcher-report"],
  resources: {
    results: {
      description: "CVE research results with all CVEs in the lookback window",
      schema: ResearchResultSchema,
      lifetime: "infinite",
      garbageCollection: 20,
    },
  },
  methods: {
    research: {
      description:
        "Query NVD, GitHub Advisory DB, and CISA KEV for HIGH/CRITICAL CVEs. Reports all CVEs published within the lookback window (default: last 24h). Tracks seen IDs to flag which ones are new.",
      arguments: z.object({
        keywords: z
          .array(z.string())
          .optional()
          .describe("Override keyword filter for this run"),
        severityThreshold: z
          .enum(["CRITICAL", "HIGH"])
          .optional()
          .describe("Override severity threshold for this run"),
        lookbackDays: z
          .number()
          .int()
          .positive()
          .max(90)
          .optional()
          .describe("Override lookback window for this run"),
      }),
      execute: async (
        args: {
          severityThreshold?: string;
          keywords?: string[];
          lookbackDays?: number;
        },
        context: MethodContext,
      ) => {
        const severity: string = args.severityThreshold ??
          context.globalArgs.severityThreshold ?? "HIGH";
        const keywords: string[] | undefined = args.keywords ??
          context.globalArgs.keywords;
        const lookbackDays: number = args.lookbackDays ??
          context.globalArgs.lookbackDays ?? 1;
        const maxResults: number = context.globalArgs.maxResultsPerSource ?? 40;
        const timestamp: string = new Date().toISOString();
        const logger: Logger = context.logger;

        const state: PersistentState = await loadState(context.repoDir);

        logger.info("Querying CVE sources (lookback: {days} days)", {
          days: lookbackDays,
        });

        const [nvdResult, ghResult, kevResult]: [
          SourceResult,
          SourceResult,
          SourceResult,
        ] = await Promise.all([
          queryNvd(maxResults, severity, logger),
          queryGithubAdvisories(maxResults, severity, logger),
          queryCisaKev(maxResults, logger),
        ]);

        logger.info(
          "Raw results: NVD={nvd}, GitHub={gh}, CISA KEV={kev}",
          {
            nvd: nvdResult.findings.length,
            gh: ghResult.findings.length,
            kev: kevResult.findings.length,
          },
        );

        // Deduplicate by CVE ID, preferring CISA KEV > NVD > GitHub
        const byId: Map<string, RawCve> = new Map();
        for (
          const cve of [
            ...ghResult.findings,
            ...nvdResult.findings,
            ...kevResult.findings,
          ]
        ) {
          const existing: RawCve | undefined = byId.get(cve.id);
          if (!existing) {
            byId.set(cve.id, cve);
          } else {
            if (cve.knownExploited) existing.knownExploited = true;
            if (cve.categories) {
              const merged: Set<string> = new Set([
                ...existing.categories,
                ...cve.categories,
              ]);
              existing.categories = [...merged];
            }
          }
        }

        // Filter to lookback window
        let allInScope: RawCve[] = [...byId.values()].filter(
          (cve: RawCve) => isRecentDate(cve.published, lookbackDays),
        );

        // Apply keyword filter if configured
        if (keywords && keywords.length > 0) {
          const lowerKeywords: string[] = keywords.map((k: string) =>
            k.toLowerCase()
          );
          allInScope = allInScope.filter((cve: RawCve) => {
            const text: string = `${cve.id} ${cve.description} ${
              cve.categories.join(" ")
            } ${cve.vendorProject ?? ""} ${cve.product ?? ""}`.toLowerCase();
            return lowerKeywords.some((kw: string) => text.includes(kw));
          });
        }

        // Tag each CVE as new or previously seen
        const cves: Cve[] = allInScope.map((cve: RawCve) => ({
          ...cve,
          isNew: !state.seenIds.has(cve.id),
        }));

        const newCount: number = cves.filter((c: Cve) => c.isNew).length;

        // Update state with all CVEs we've now seen
        for (const cve of allInScope) {
          state.seenIds.add(cve.id);
        }
        state.lastCheck = timestamp;
        await saveState(context.repoDir, state);

        logger.info(
          "Research complete: {total} in window, {new} new",
          { total: cves.length, new: newCount },
        );

        const discordSummary: string = formatDiscordSummary(
          cves,
          lookbackDays,
          timestamp,
        );

        const handle = await context.writeResource("results", "scan", {
          cves,
          newCount,
          totalScanned: byId.size,
          lookbackDays,
          timestamp,
          discordSummary,
          sources: {
            nvd: {
              queried: true,
              count: nvdResult.findings.length,
              error: nvdResult.error ?? undefined,
            },
            github: {
              queried: true,
              count: ghResult.findings.length,
              error: ghResult.error ?? undefined,
            },
            cisaKev: {
              queried: true,
              count: kevResult.findings.length,
              error: kevResult.error ?? undefined,
            },
          },
        });

        return { dataHandles: [handle] };
      },
    },
  },
};
