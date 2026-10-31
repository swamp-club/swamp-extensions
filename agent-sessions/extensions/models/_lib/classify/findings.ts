/**
 * Findings over one session's labelled calls (swamp-club#4157): patterns
 * that say what to tune, each naming where (a skill, a rule, or swamp).
 * Ported from the agent observation prototype's `analyse()`. They read only
 * the stored record, and run per record, so a subagent's findings are about
 * the subagent that made the calls.
 *
 * @module
 */

import {
  AGENT_SESSION_LIMITS,
  type AgentSessionFinding,
  type AgentSessionToolCall,
  type AgentSessionTurn,
} from "../contract/session_record.ts";
import { COVERED_BY, HAND_EDITED, READ_EXTENSION_SOURCE } from "./label.ts";

/** Failed calls closer than this, end to next start, are one streak. */
export const STREAK_GAP_MS = 3 * 60 * 1000;
/** Hand edits of one definition that make a loop. */
export const HAND_EDIT_LOOP = 3;
/** Pulled extension source reads that make a docs gap. */
export const DOCS_GAP_READS = 3;

// The definition a hand edit touched, as its stored text names it.
const DEFINITION_PATH = /(models|workflows|vaults|grants)\/[^\s'"]+\.ya?ml/;

interface Call extends AgentSessionToolCall {
  readonly turn: number;
}

const SEVERITY_ORDER = { high: 0, medium: 1, low: 2, info: 3 } as const;

function duration(ms: number): string {
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s} s`;
  const m = Math.round(s / 60);
  return m < 60 ? `${m} min` : `${Math.floor(m / 60)} h ${m % 60} min`;
}

function plural(n: number, word: string): string {
  return `${n} ${word}${n === 1 ? "" : "s"}`;
}

function finding(
  severity: AgentSessionFinding["severity"],
  title: string,
  detail: string,
  tune: string,
  calls: readonly Call[],
): AgentSessionFinding {
  return {
    severity,
    title: title.slice(0, AGENT_SESSION_LIMITS.findingTitleLength),
    detail: detail.slice(0, AGENT_SESSION_LIMITS.findingDetailLength),
    tune: tune.slice(0, AGENT_SESSION_LIMITS.findingDetailLength),
    callIds: calls.slice(0, AGENT_SESSION_LIMITS.callIdsPerFinding)
      .map((c) => c.id),
  };
}

function handEditLoops(calls: readonly Call[]): AgentSessionFinding[] {
  const byFile = new Map<string, Call[]>();
  for (const c of calls) {
    if (c.category !== HAND_EDITED) continue;
    const path = DEFINITION_PATH.exec(c.text)?.[0];
    if (path) byFile.set(path, [...(byFile.get(path) ?? []), c]);
  }
  const out: AgentSessionFinding[] = [];
  for (const [path, list] of byFile) {
    if (list.length < HAND_EDIT_LOOP) continue;
    const first = list[0];
    const last = list[list.length - 1];
    const between = calls.filter((c) =>
      !c.ok && c.start >= first.start && c.start <= last.end
    );
    const turns = new Set(list.map((c) => c.turn)).size;
    const name = path.slice(path.lastIndexOf("/") + 1);
    out.push(finding(
      between.length > 0 ? "high" : "medium",
      `Edited ${name} by hand ${list.length} times` +
        (turns > 1
          ? ` across ${turns} turns`
          : ` in ${duration(last.end - first.start)}`),
      `${path} is a swamp definition, written with shell scripts and file edits instead of through swamp. ` +
        (between.length > 0
          ? `${
            plural(between.length, "call")
          } failed between the first and last edit.`
          : "None of the calls in between failed."),
      "Skill: point agents at swamp model validate after every edit, or give the definition's type a method that applies the change, so edits go through swamp.",
      [...list, ...between.filter((c) => !list.includes(c))],
    ));
  }
  return out;
}

function failureStreaks(calls: readonly Call[]): AgentSessionFinding[] {
  const failed = calls.filter((c) => !c.ok);
  const out: AgentSessionFinding[] = [];
  for (let i = 0; i < failed.length; i++) {
    let j = i;
    while (
      j + 1 < failed.length &&
      failed[j + 1].start - failed[j].end < STREAK_GAP_MS
    ) j++;
    if (j === i) continue;
    const group = failed.slice(i, j + 1);
    const categories = [...new Set(group.map((c) => c.category ?? c.tool))];
    out.push(finding(
      group.length >= 3 ? "high" : "medium",
      `${group.length} failed calls within 3 minutes of each other (turn ${
        group[0].turn
      })`,
      `Failed: ${categories.join(", ")}.`,
      "Diagnose: open the first failure; what it hit is where to tune, a skill that sent the agent the wrong way or a swamp error that did not say what to do.",
      group,
    ));
    i = j;
  }
  return out;
}

function coveredClis(calls: readonly Call[]): AgentSessionFinding[] {
  const byCategory = new Map<string, Call[]>();
  for (const c of calls) {
    if (c.category?.includes(COVERED_BY)) {
      byCategory.set(c.category, [...(byCategory.get(c.category) ?? []), c]);
    }
  }
  return [...byCategory].map(([category, list]) => {
    const [prog, ext] = category.split(COVERED_BY);
    return finding(
      "medium",
      `Ran ${prog} directly ${
        plural(list.length, "time")
      } though ${ext} is installed`,
      "The repo has an extension for this, and the agent did not use it.",
      `Skill or rule: mention ${ext} where agents look, or accept direct ${prog} for this repo if it is intended.`,
      list,
    );
  });
}

function docsGap(calls: readonly Call[]): AgentSessionFinding[] {
  const reads = calls.filter((c) => c.category === READ_EXTENSION_SOURCE);
  if (reads.length < DOCS_GAP_READS) return [];
  return [finding(
    "medium",
    `Read pulled extension source ${reads.length} times`,
    "The agent went into .swamp/pulled-extensions to learn what the extension's skill or docs did not explain.",
    "Skill: the extension's skill is missing what these reads looked for.",
    reads,
  )];
}

/** The findings for one session record's turns, most severe first. */
export function findingsFor(
  turns: readonly AgentSessionTurn[],
): AgentSessionFinding[] {
  const calls: Call[] = turns.flatMap((t) =>
    t.calls.filter((c) => c.label !== "unlabeled").map((c) => ({
      ...c,
      turn: t.n,
    }))
  );
  return [
    ...handEditLoops(calls),
    ...failureStreaks(calls),
    ...coveredClis(calls),
    ...docsGap(calls),
  ].sort((a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity])
    .slice(0, AGENT_SESSION_LIMITS.findings);
}
