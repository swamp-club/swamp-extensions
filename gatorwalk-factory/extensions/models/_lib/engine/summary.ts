// Swamp, an Automation Framework Copyright (C) 2026 System Initiative, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify it under the terms
// of the GNU Affero General Public License version 3 as published by the Free
// Software Foundation, with the Swamp Extension and Definition Exception (found in
// the "COPYING-EXCEPTION" file).
//
// Swamp is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
// PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License along
// with Swamp. If not, see <https://www.gnu.org/licenses/>.

import type { Actor, JournalEvent } from "./journal.ts";
import type { Lifecycle } from "./lifecycle_schema.ts";
import { computeMetrics, type Metrics, type Summary } from "./metrics.ts";
import type { RunRecord } from "./run_record.ts";

// ---------------------------------------------------------------------------
// The work-item summary: the journal as a timeline, per era, with the
// metrics. Rendered statically from the run record and the pinned lifecycle,
// so the same run always renders the same summary. Product payloads are not
// shown, only their versions and digests. Shared by the `summary` method and
// the summary report, which is why it takes plain values and no context.
// ---------------------------------------------------------------------------

export interface WorkItemSummary {
  markdown: string;
  metrics: Metrics;
  timeline: JournalEvent[];
}

export function buildSummary(
  run: RunRecord,
  lifecycle: Lifecycle,
): WorkItemSummary {
  const metrics = computeMetrics(run, lifecycle);
  return {
    markdown: renderMarkdown(run, metrics),
    metrics,
    timeline: run.journal,
  };
}

/** A duration as hours, minutes and seconds; "–" for none. */
export function formatDuration(ms: number | null): string {
  if (ms === null) return "–";
  const seconds = Math.round(ms / 1000);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}h ${m}m ${s}s`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

function cell(text: string): string {
  return text.replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
}

function row(cells: string[]): string {
  return `| ${cells.map(cell).join(" | ")} |`;
}

function table(head: string[], rows: string[][]): string[] {
  if (rows.length === 0) return ["_None._"];
  return [row(head), row(head.map(() => "---")), ...rows.map(row)];
}

function actorText(actor: Actor): string {
  const who = actor.principal ?? "(no principal)";
  return actor.asserted !== undefined ? `${who} for ${actor.asserted}` : who;
}

function detail(event: JournalEvent, run: RunRecord): string {
  switch (event.type) {
    case "started":
      return `started on lifecycle '${event.lifecycle.name}'`;
    case "dispatched":
      return `dispatch ${event.dispatchId}`;
    case "usage": {
      const usage = run.dispatches.find((d) => d.id === event.dispatchId)
        ?.usage;
      return `usage for dispatch ${event.dispatchId}` +
        (usage !== undefined
          ? `: ${usage.inputTokens} in, ${usage.outputTokens} out` +
            (usage.model !== undefined ? ` (${usage.model})` : "") +
            ", attested"
          : "");
    }
    case "recorded":
      return `${event.kind} '${event.name}' version ${event.version} ` +
        `(${event.digest.slice(0, 19)})`;
    case "rejected":
      return `${event.kind} '${event.name}' rejected: ${
        event.errors.join("; ")
      }`;
    case "approval": {
      const note = run.approvals.find((a) => a.id === event.approvalId)?.note;
      return `${event.decision === "approve" ? "approved" : "declined"} ` +
        `'${event.gateId}'` + (note !== undefined ? `: ${note}` : "");
    }
    case "advanced":
      return `'${event.transition}' to '${event.to}' (cycle ${event.toCycle})`;
    case "override":
      return `${event.kind} override for '${event.for}'`;
    case "awaiting":
      return event.exits.length === 0
        ? "no exit awaits a person"
        : "awaiting a person: " + event.exits.map((e) =>
          `'${e.transition}'` +
          (e.gateIds.length > 0 ? ` [${e.gateIds.join(", ")}]` : "") +
          (e.manual ? " (manual)" : "") +
          (e.readyAt !== undefined ? ` from ${e.readyAt}` : "")
        ).join(", ");
    case "reset":
      return `reset from era ${event.previousEra}` +
        (event.repinned !== undefined
          ? `, lifecycle repinned (${event.repinned.digest.slice(0, 19)})`
          : "");
  }
}

function summaryLines(summary: Summary): string[] {
  const u = summary.usage;
  return [
    ...table(
      ["Stage", "Visits", "Re-entries", "Time (finished visits)", "Open"],
      Object.entries(summary.stages).map(([stage, t]) => [
        stage,
        String(t.visits),
        String(t.reentries),
        formatDuration(t.timeMs),
        t.open ? "yes" : "",
      ]),
    ),
    "",
    `- **Waits at human stops:** ${summary.waits.count} (${summary.waits.open} open), ` +
    `${formatDuration(summary.waits.timeMs)} finished`,
    `- **Rework:** ${summary.rework.reentries} re-entries, ` +
    `${summary.rework.declines} declines, ${summary.rework.rejections} rejected payloads` +
    (Object.keys(summary.rework.reviewRounds).length > 0
      ? "; review rounds: " + Object.entries(summary.rework.reviewRounds)
        .map(([name, r]) => `${name} of ${r.reviews}: ${r.rounds}`).join(", ")
      : ""),
    `- **Dispatches:** ${summary.dispatches.count} (${summary.dispatches.retries} retries)`,
    `- **Overrides:** ${summary.overrides.cycle} cycle, ${summary.overrides.dispatch} dispatch`,
    `- **Tokens (attested):** ${u.inputTokens} in, ${u.outputTokens} out over ` +
    `${u.dispatchesWithUsage} dispatch(es); ${u.dispatchesWithoutUsage} without usage` +
    (Object.keys(u.byModel).length > 0
      ? "; " +
        Object.entries(u.byModel).map(([model, m]) =>
          `${model}: ${m.inputTokens} in, ${m.outputTokens} out`
        ).join(", ")
      : ""),
  ];
}

function renderMarkdown(run: RunRecord, metrics: Metrics): string {
  const refs = Object.entries(run.externalRefs);
  const lines = [
    `# Work item ${run.key}`,
    "",
    `- **Lifecycle:** ${run.lifecycle.name} (${
      run.lifecycle.digest.slice(0, 19)
    })`,
    `- **Status:** ${run.status} at stage '${run.stage}'`,
    `- **Started:** ${metrics.startedAt}`,
    `- **Finished:** ${metrics.endedAt ?? "not yet"}` +
    (metrics.durationMs !== null
      ? ` (${formatDuration(metrics.durationMs)})`
      : ""),
    ...(refs.length > 0
      ? [`- **Tracker:** ${refs.map(([k, v]) => `${k} ${v}`).join(", ")}`]
      : []),
    `- **Journal version:** ${metrics.journalVersion}`,
    "",
    "## Metrics",
    "",
    ...summaryLines(metrics.summary),
  ];
  metrics.eras.forEach((era, i) => {
    lines.push(
      "",
      `## Era ${i + 1} (${era.era})`,
      "",
      `${era.startedAt} to ${era.endedAt ?? "still running"}` +
        (era.endedBy !== null ? `, ended by ${era.endedBy}` : "") +
        (era.durationMs !== null ? ` (${formatDuration(era.durationMs)})` : ""),
      "",
      "### Timeline",
      "",
      ...table(
        ["Time", "Stage", "Event", "Actor"],
        run.journal.filter((e) => e.era === era.era).map((e) => [
          e.at,
          `${e.stage} (${e.cycle})`,
          detail(e, run),
          actorText(e.actor),
        ]),
      ),
      "",
      "### Waits at human stops",
      "",
      ...table(
        ["Stage", "Exit", "From", "Until", "Waited", "Ended by"],
        era.waits.map((w) => [
          `${w.stage} (${w.cycle})`,
          w.transition +
          (w.gateIds.length > 0 ? ` [${w.gateIds.join(", ")}]` : "") +
          (w.manual ? " (manual)" : ""),
          w.from,
          w.until ?? "waiting",
          formatDuration(w.durationMs),
          w.endedBy ?? "",
        ]),
      ),
    );
    if (metrics.eras.length > 1) {
      lines.push("", "### Era metrics", "", ...summaryLines(era.summary));
    }
  });
  return lines.join("\n") + "\n";
}
