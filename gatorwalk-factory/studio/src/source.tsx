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
// The source: the factory definition's YAML, read-only, for the whole file
// or the selected stage, with line numbers. Schema problems and findings
// underline the start of the path they name; the selected one is lit and
// scrolled into view. There is no editor: the agent edits the file.

import { useEffect, useRef } from "preact/hooks";
import type { SourceRange } from "./model.ts";
import { findFinding, pathOf, targetKey } from "./selection.ts";
import { good, loaded, selection, sourceScope } from "./state.ts";
import { reveal } from "./ui.tsx";

interface Mark {
  range: SourceRange;
  kind: "error" | "warning" | "schema";
  message: string;
  selected: boolean;
}

export function Source() {
  const l = loaded.value;
  const pre = useRef<HTMLPreElement>(null);
  const sel = selection.value;
  useEffect(() => {
    const el = pre.current?.querySelector(".mark.selected, .line.selected");
    reveal(pre.current, el, true);
  }, [targetKey(sel), l]);

  if (l === null) return null;
  const g = good.value;
  const marks: Mark[] = [];
  let selectedRange: SourceRange | null = null;
  if (!l.ok) {
    for (const p of l.problems) {
      if (p.range !== null) {
        marks.push({
          range: p.range,
          kind: "schema",
          message: p.message,
          selected: false,
        });
      }
    }
  } else {
    const selectedFinding = sel?.kind === "finding"
      ? findFinding(l.findings, sel)
      : undefined;
    for (const f of l.findings) {
      if (f.range === null) continue;
      marks.push({
        range: f.range,
        kind: f.severity,
        message: `${f.code}: ${f.message}`,
        selected: f === selectedFinding,
      });
    }
    if (sel !== null && sel.kind !== "finding") {
      const path = pathOf(l.definition, sel, l.findings);
      if (path !== null) selectedRange = l.rangeOf(path);
    }
  }

  // The selected stage's lines, when scoped to it.
  const stageId = sel === null || sel.kind === "any" || sel.kind === "finding"
    ? null
    : sel.stage;
  const stagePath = stageId !== null && l.ok
    ? pathOf(l.definition, { kind: "stage", stage: stageId })
    : null;
  const stageRange = stagePath === null ? null : l.rangeOf(stagePath);
  const scoped = sourceScope.value === "stage" && stageRange !== null;
  const lines = l.text.split("\n");
  const starts: number[] = [];
  let at = 0;
  for (const line of lines) {
    starts.push(at);
    at += line.length + 1;
  }
  let first = 0, last = lines.length - 1;
  if (scoped) {
    first = stageRange.line;
    const endLine = starts.findLastIndex((s) => s <= stageRange.end);
    last = Math.max(first, endLine);
    while (last > first && lines[last].trim() === "") last--;
  }
  const selStart = selectedRange?.line ?? -1;
  const selEnd = selectedRange === null
    ? -1
    : Math.max(selStart, starts.findLastIndex((s) => s <= selectedRange!.end));

  return (
    <div class="src">
      <div class="seg" role="group" aria-label="Source scope">
        <button
          type="button"
          aria-pressed={scoped}
          disabled={stageRange === null}
          onClick={() => (sourceScope.value = "stage")}
        >
          {stageId !== null && stageRange !== null
            ? `Stage ${stageId}`
            : "Select a stage"}
        </button>
        <button
          type="button"
          aria-pressed={!scoped}
          onClick={() => (sourceScope.value = "file")}
        >
          Whole file
        </button>
      </div>
      <p class="path-line">
        {l.file}
        {g !== null && !l.ok ? " · does not pass the schema" : ""}
      </p>
      <pre
        class="code numbered"
        ref={pre}
        tabIndex={0}
        aria-label={`${l.file}, read-only`}
      >
        {lines.slice(first, last + 1).map((text, k) => {
          const n = first + k;
          const lineMarks = marks.filter((m) => m.range.line === n);
          const inSel = n >= selStart && n <= selEnd;
          return (
            <div
              class={`line${inSel ? " selected" : ""}${lineMarks.length ? " marked" : ""}`}
              key={n}
            >
              <span class="num" aria-hidden="true">{n + 1}</span>
              <code>{renderLine(text, starts[n], lineMarks)}</code>
            </div>
          );
        })}
      </pre>
    </div>
  );
}

/** A line's text, with its marks' spans underlined. Text stays text. */
function renderLine(text: string, start: number, marks: Mark[]) {
  if (marks.length === 0) return text === "" ? " " : text;
  const m = marks.find((x) => x.selected) ?? marks[0];
  const from = Math.max(0, m.range.from - start);
  const to = Math.min(text.length, Math.max(from + 1, m.range.to - start));
  const label = marks.map((x) => x.message).join("\n");
  return (
    <>
      {text.slice(0, from)}
      <mark
        class={`mark ${m.kind}${m.selected ? " selected" : ""}`}
        title={label}
      >
        {text.slice(from, to) || " "}
      </mark>
      {text.slice(to)}
      <span class="sr-only">{` (${label})`}</span>
    </>
  );
}
