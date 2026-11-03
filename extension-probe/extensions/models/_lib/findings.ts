/**
 * FindingsClassifier: turns a probe report into `kind: findings`, the contract
 * @swamp/software-factory and @skunk-ape/stef use, so an LLM reviewer or
 * another agent can merge with it behind one gate.
 *
 * Rules decide every finding here. Hard findings (a canary or the sandbox key
 * seen, an unexpected host on pull, a persistence write) are critical or high
 * and no later review may clear them.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
import type { MethodRun, Report, SetupStep } from "./report.ts";

export const SeveritySchema = z.enum(["critical", "high", "medium", "low"]);
export type Severity = z.infer<typeof SeveritySchema>;

export const FindingSchema = z.strictObject({
  id: z.string().min(1),
  severity: SeveritySchema,
  description: z.string().min(1),
  category: z.string().optional(),
  resolved: z.boolean().optional(),
  resolutionNote: z.string().optional(),
});
export type Finding = z.infer<typeof FindingSchema>;

export const FindingsSchema = z.object({
  target: z.string(),
  version: z.string().optional(),
  isolation: z.enum(["nono", "external"]),
  clean: z.boolean(),
  blockingCount: z.number(),
  findings: z.array(FindingSchema),
});
export type Findings = z.infer<typeof FindingsSchema>;

/** Severities that block. */
export const BLOCKING: readonly Severity[] = ["critical", "high"];

/** Home-relative prefixes swamp itself writes; not persistence. */
export const SWAMP_HOME_PREFIXES: readonly string[] = [
  ".config/swamp/",
  ".swamp/",
  ".cache/",
  ".local/share/swamp/",
  ".local/state/swamp/",
  ".deno/",
];

/** Repo-relative paths that steer coding agents; a write there is persistence. */
const AGENT_CONFIG =
  /^(\.claude\/|\.codex\/|\.cursor\/|\.github\/|CLAUDE\.md$|AGENTS\.md$|\.mcp\.json$)/;

/** Hosts swamp itself contacts on any command (auth, notices). */
export const SWAMP_CLUB_HOSTS: readonly string[] = [
  "swamp-club.com",
  "*.swamp-club.com",
];

/** True when `host` matches one of `hosts` (`*.` prefixes match subdomains). */
export function isSwampHost(host: string, registryHosts: readonly string[]) {
  return registryHosts.some((h) =>
    h.startsWith("*.") ? host.endsWith(h.slice(1)) : host === h
  );
}

const name = (r: MethodRun) => `${r.type} ${r.method} (${r.round})`;

function setupFindings(
  s: SetupStep,
  registryHosts: readonly string[],
  add: (f: Omit<Finding, "id">, key: string) => void,
) {
  for (const e of s.network) {
    if (isSwampHost(e.host, registryHosts)) continue;
    add({
      severity: "high",
      category: "unexpected-host",
      description: `During ${s.step}, a connection to ${e.host}${
        e.port ? `:${e.port}` : ""
      } was ${e.decision === "allow" ? "allowed" : "refused"}. Only ${
        registryHosts.join(", ")
      } are expected.${e.reason ? ` nono: ${e.reason}` : ""}`,
    }, `unexpected-host-${s.step}`);
  }
  // Init runs before any extension code is in the box: what it writes (swamp's
  // own skills under ~/.claude/skills, its config) is swamp's, not the target's.
  const fileChanges = s.step === "init" ? [] : s.fileChanges;
  const isSkill = (c: { area: string; path: string; change: string }) =>
    (c.area === "home" || c.area === "repo") && c.change !== "deleted" &&
    c.path.startsWith(".claude/skills/");
  const skills = fileChanges.filter(isSkill);
  if (s.step === "pull" && skills.length) {
    const names = [...new Set(skills.map((c) => c.path.split("/")[2]))];
    add({
      severity: "low",
      category: "skill-install",
      description: `The pull installed skill(s) ${
        names.join(", ")
      } under .claude/skills (${skills.length} file(s)). Skills steer coding agents; review them with the static analysis.`,
    }, "skill-install");
  }
  for (const c of fileChanges) {
    // Installing skills is the pull's job; a skill written by any later step
    // (describe, types, both of which load the target's code) is persistence.
    if (c.change === "deleted" || (s.step === "pull" && isSkill(c))) continue;
    if (c.area === "repo") {
      if (!AGENT_CONFIG.test(c.path)) continue;
      add({
        severity: "high",
        category: "persistence-write",
        description:
          `During ${s.step}, ${c.path} was ${c.change} in the repo, a file coding agents read as instructions.`,
      }, `persistence-${s.step}`);
      continue;
    }
    if (c.area !== "home") continue;
    if (SWAMP_HOME_PREFIXES.some((p) => c.path.startsWith(p))) continue;
    add({
      severity: "high",
      category: "persistence-write",
      description:
        `During ${s.step}, ~/${c.path} was ${c.change} in the box home.`,
    }, `persistence-${s.step}`);
  }
  for (const v of s.violations) {
    add({
      severity: "medium",
      category: "sandbox-violation",
      description: `During ${s.step}, nono reported ${v}`,
    }, `violation-${s.step}`);
  }
  if (s.timedOut) {
    add({
      severity: "medium",
      category: "timeout",
      description:
        `${s.step} did not finish before its timeout and was killed.`,
    }, `timeout-${s.step}`);
  }
}

function runFindings(
  r: MethodRun,
  add: (f: Omit<Finding, "id">, key: string) => void,
) {
  for (const c of r.fileChanges) {
    if (c.change === "deleted" && c.area !== "home") continue;
    if (c.area === "home") {
      if (SWAMP_HOME_PREFIXES.some((p) => c.path.startsWith(p))) continue;
      add({
        severity: "high",
        category: "persistence-write",
        description: `${name(r)}: ~/${c.path} was ${c.change} in the box home.`,
      }, `persistence-${r.method}`);
    } else if (c.area === "repo") {
      const agent = AGENT_CONFIG.test(c.path);
      add({
        severity: agent ? "high" : "low",
        category: agent ? "persistence-write" : "repo-write",
        description: `${name(r)}: ${c.path} was ${c.change} in the repo${
          agent ? ", a file coding agents read as instructions" : ""
        }.`,
      }, `repo-write-${r.method}`);
    }
  }
  for (const s of r.stubCalls) {
    const via = s.invokedAs.split("/").at(-1) ?? s.invokedAs;
    const direct = via === "probe-stub";
    add({
      severity: direct ? "low" : "medium",
      category: direct ? "stub-call" : "spawned-command",
      description: `${name(r)} ran ${
        direct ? "the stubbed tool path" : `\`${via}\` from PATH`
      } with argv ${JSON.stringify(s.argv).slice(0, 400)} in ${s.cwd}${
        s.stdinBytes ? `, ${s.stdinBytes} bytes on stdin` : ""
      }. The stub ran, not the real program.`,
    }, `stub-${r.method}`);
  }
  for (const v of r.violations) {
    add({
      severity: "medium",
      category: "sandbox-violation",
      description: `${name(r)}: nono reported ${v}`,
    }, `violation-${r.method}`);
  }
  if (r.timedOut) {
    add({
      severity: "medium",
      category: "timeout",
      description: `${
        name(r)
      } did not finish before its timeout and was killed.`,
    }, `timeout-${r.method}`);
  }
}

/**
 * One finding per host method runs tried to reach, listing the methods: a
 * cloud extension's forty methods all reaching one API is one fact.
 */
function networkFindings(
  runs: readonly MethodRun[],
  add: (f: Omit<Finding, "id">, key: string) => void,
) {
  const byHost = new Map<
    string,
    { port?: number; methods: Set<string>; reason?: string }
  >();
  for (const r of runs) {
    for (const e of r.network) {
      const h = byHost.get(e.host) ??
        { ...(e.port ? { port: e.port } : {}), methods: new Set<string>() };
      h.methods.add(`${r.type} ${r.method}`);
      if (e.reason && !h.reason) h.reason = e.reason;
      byHost.set(e.host, h);
    }
  }
  for (const [host, h] of byHost) {
    // Only swamp-club itself counts as swamp's own traffic here: the archive
    // object store on the pull allowlist is shared by every Spaces customer.
    const swamp = isSwampHost(host, SWAMP_CLUB_HOSTS);
    const methods = [...h.methods];
    const shown = methods.slice(0, 12).join(", ") +
      (methods.length > 12 ? ` and ${methods.length - 12} more` : "");
    add({
      severity: swamp ? "low" : "medium",
      category: swamp ? "swamp-traffic" : "network-attempt",
      description: `${methods.length} method(s) tried to reach ${host}${
        h.port ? `:${h.port}` : ""
      }; every attempt was refused: ${shown}.${
        swamp ? " This is probably swamp's own traffic, not the methods'." : ""
      }${h.reason ? ` nono: ${h.reason}` : ""}`,
    }, `net-${host}`);
  }
}

/** Every finding for a report. Pure. */
export function classify(
  report: Report,
  registryHosts: readonly string[],
): Findings {
  const findings: Finding[] = [];
  const counts = new Map<string, number>();
  const add = (f: Omit<Finding, "id">, key: string) => {
    const n = (counts.get(key) ?? 0) + 1;
    counts.set(key, n);
    findings.push({ id: `PROBE-${key}-${n}`, ...f });
  };

  for (const s of report.setup) {
    if (!s.ok) {
      add({
        severity: "high",
        category: "probe-incomplete",
        description:
          `The probe stopped at ${s.step}, so the extension was not exercised: ${
            s.detail.slice(0, 300)
          }. An incomplete probe is never a clean result.`,
      }, `incomplete-${s.step}`);
    }
    for (const x of s.sightings) {
      add(sightingFinding(x.canary, x.where, s.step), `secret-${s.step}`);
    }
    setupFindings(s, registryHosts, add);
  }
  for (const r of report.runs) {
    for (const x of r.sightings) {
      add(sightingFinding(x.canary, x.where, name(r)), `secret-${r.method}`);
    }
    runFindings(r, add);
  }
  if (
    report.setup.length > 0 && report.setup.every((s) => s.ok) &&
    report.methods.length === 0
  ) {
    add({
      severity: "high",
      category: "probe-incomplete",
      description:
        `The pull succeeded but the probe found ${report.types.length} behavior type(s) and no methods to run, so nothing was exercised. An incomplete probe is never a clean result.`,
    }, "incomplete-empty");
  }
  networkFindings(report.runs, add);
  if (report.isolation === "nono") {
    const gaps = [
      ...report.setup.filter((s) => !s.networkObserved).map((s) =>
        `${s.step} (${s.networkGap ?? "unknown"})`
      ),
      ...report.runs.filter((r) => !r.networkObserved).map((r) =>
        `${name(r)} (${r.networkGap ?? "unknown"})`
      ),
    ];
    if (gaps.length) {
      add({
        severity: "high",
        category: "network-unobserved",
        description:
          `nono's audit trail could not be read for ${gaps.length} step(s), so their network attempts are unknown and no clean network result can be claimed: ${
            gaps.slice(0, 10).join("; ")
          }${gaps.length > 10 ? `; and ${gaps.length - 10} more` : ""}.`,
      }, "network-unobserved");
    }
  }
  for (const m of report.methods) {
    if (m.succeeded) continue;
    add({
      severity: "low",
      category: "coverage-gap",
      description:
        `${m.type} ${m.method} never succeeded, so its behavior was not observed.${
          m.lastError ? ` Last error: ${m.lastError.slice(0, 300)}` : ""
        } Drive it with start and record.`,
    }, `gap-${m.method}`);
  }
  for (const g of report.skippedGrafts) {
    add({
      severity: "low",
      category: "coverage-gap",
      description:
        `${g} grafts methods onto another type; v1 does not probe grafts.`,
    }, "graft");
  }
  if (report.notObserved.length) {
    add({
      severity: "low",
      category: "not-observed",
      description: `Isolation is ${report.isolation}: ${
        report.notObserved.join(", ")
      } were not observed by this probe. Read them from your own sandbox's telemetry; their absence here is not a clean result.`,
    }, "not-observed");
  }

  findings.splice(0, findings.length, ...mergeRounds(findings));
  const ran = report.runs.length;
  const ok = report.methods.filter((m) => m.succeeded).length;
  findings.unshift({
    id: "PROBE-0",
    severity: "low",
    category: "recon",
    description: `Probed ${report.target}${
      report.version ? `@${report.version}` : ""
    } under ${report.isolation} isolation: ${report.types.length} type(s), ${report.methods.length} method(s), ${ran} run(s); ${ok} of ${report.methods.length} method(s) succeeded at least once; ${findings.length} finding(s).`,
    resolved: true,
  });
  const blockingCount =
    findings.filter((f) => BLOCKING.includes(f.severity) && !f.resolved).length;
  return {
    target: report.target,
    ...(report.version ? { version: report.version } : {}),
    isolation: report.isolation,
    clean: blockingCount === 0,
    blockingCount,
    findings,
  };
}

function sightingFinding(
  canary: string,
  where: string,
  during: string,
): Omit<Finding, "id"> {
  if (canary === "sandbox-key") {
    return {
      severity: "critical",
      category: "sandbox-key-exposed",
      description:
        `${during}: the sandbox account's key turned up in ${where}. Treat it as leaked: rotate it, and treat any use of it outside the sandbox as a compromise.`,
    };
  }
  return {
    severity: "critical",
    category: "canary-seen",
    description:
      `${during}: the planted ${canary} canary turned up in ${where}. The extension read a credential and used or passed it on.`,
  };
}

/** The round label right after a run's "<type> <method>" prefix. */
const ROUND = /(?<=^@[^ ]+ [^ ]+) \(([a-z0-9-]+)\)/;

/**
 * Merges findings that differ only in the round they were seen in, so one
 * behavior seen in every round reads as one finding listing its rounds, and
 * drops exact duplicates.
 */
export function mergeRounds(findings: readonly Finding[]): Finding[] {
  const out: Finding[] = [];
  const byKey = new Map<string, { f: Finding; rounds: string[] }>();
  for (const f of findings) {
    const m = ROUND.exec(f.description);
    if (!m) {
      // Referee reruns pull again; the same setup finding is one finding.
      const key = `${f.severity}|${f.category}|${f.description}`;
      if (!byKey.has(key)) {
        byKey.set(key, { f, rounds: [] });
        out.push(f);
      }
      continue;
    }
    const key = `${f.severity}|${f.category}|${
      f.description.replace(ROUND, "")
    }`;
    const seen = byKey.get(key);
    if (seen) {
      if (!seen.rounds.includes(m[1])) seen.rounds.push(m[1]);
      continue;
    }
    const entry = { f, rounds: [m[1]] };
    byKey.set(key, entry);
    out.push(f);
  }
  return out.map((f) => {
    const m = ROUND.exec(f.description);
    if (!m) return f;
    const key = `${f.severity}|${f.category}|${
      f.description.replace(ROUND, "")
    }`;
    const rounds = byKey.get(key)!.rounds;
    return rounds.length > 1
      ? {
        ...f,
        description: f.description.replace(
          ROUND,
          ` (rounds: ${rounds.join(", ")})`,
        ),
      }
      : f;
  });
}
