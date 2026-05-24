import type { TraceEntry } from "./trace_parser.ts";

export interface PhaseStats {
  phase: string;
  min: number;
  avg: number;
  max: number;
  trials: number;
}

export interface ScenarioResult {
  name: string;
  phases: PhaseStats[];
  wallMin: number;
  wallAvg: number;
  wallMax: number;
  trials: number;
}

export function computePhaseStats(
  allTraces: TraceEntry[][],
  phaseFilter?: string[],
): PhaseStats[] {
  const phaseMap = new Map<string, number[]>();

  for (const traces of allTraces) {
    for (const t of traces) {
      if (phaseFilter && !phaseFilter.includes(t.phase)) continue;
      const arr = phaseMap.get(t.phase) ?? [];
      arr.push(t.durationMs);
      phaseMap.set(t.phase, arr);
    }
  }

  const stats: PhaseStats[] = [];
  for (const [phase, durations] of phaseMap) {
    durations.sort((a, b) => a - b);
    const sum = durations.reduce((a, b) => a + b, 0);
    stats.push({
      phase,
      min: durations[0],
      avg: Math.round(sum / durations.length),
      max: durations[durations.length - 1],
      trials: durations.length,
    });
  }
  return stats;
}

function pad(s: string, width: number): string {
  return s + " ".repeat(Math.max(0, width - s.length));
}

function rpad(s: string, width: number): string {
  return " ".repeat(Math.max(0, width - s.length)) + s;
}

export function formatResultsTable(results: ScenarioResult[]): string {
  const lines: string[] = [];

  for (const r of results) {
    lines.push(`  ${r.name}`);
    lines.push(
      `    ${"total".padEnd(24)} ${
        rpad(String(r.wallAvg), 6)
      }ms avg  (${r.wallMin}–${r.wallMax}ms, ${r.trials} trials)`,
    );
    for (const p of r.phases) {
      lines.push(
        `    ${pad(p.phase, 24)} ${
          rpad(String(p.avg), 6)
        }ms avg  (${p.min}–${p.max}ms)`,
      );
    }
    lines.push("");
  }
  return lines.join("\n");
}

export function formatResultsJson(results: ScenarioResult[]): string {
  return JSON.stringify(results, null, 2);
}

export interface ComparisonEntry {
  scenario: string;
  phase: string;
  oldAvg: number;
  newAvg: number;
  deltaPercent: number;
}

export function formatComparisonTable(entries: ComparisonEntry[]): string {
  const lines: string[] = [];
  let lastScenario = "";

  for (const e of entries) {
    if (e.scenario !== lastScenario) {
      if (lastScenario) lines.push("");
      lines.push(`  ${e.scenario}`);
      lastScenario = e.scenario;
    }
    const sign = e.deltaPercent <= 0 ? "" : "+";
    const indicator = e.deltaPercent <= -10
      ? " FASTER"
      : e.deltaPercent >= 10
      ? " SLOWER"
      : "";
    lines.push(
      `    ${pad(e.phase, 24)} ${rpad(String(e.oldAvg), 5)} → ${
        rpad(String(e.newAvg), 5)
      }ms  ${sign}${e.deltaPercent.toFixed(1)}%${indicator}`,
    );
  }
  return lines.join("\n");
}
