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
// Findings: the schema's errors when the file fails it, else the graph
// analysis's errors and warnings. Selecting a finding walks its trace
// across the graph, one stage at a time (all at once under reduced motion),
// and marks its path in the source.

import type { JSX } from "preact";
import { DEFINITION_SCHEMA_VERSION } from "../../extensions/models/_lib/engine/definition_schema.ts";
import type { Located, Problem } from "./model.ts";
import { findingTarget, targetKey } from "./selection.ts";
import { good, loaded, select, selection, trace } from "./state.ts";
import { CopyButton, onCopyKey, TARGET_ATTR } from "./ui.tsx";

const STEP_MS = 450;
let walk: ReturnType<typeof setInterval> | undefined;

export function walkTrace(stages: string[]) {
  clearInterval(walk);
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (stages.length === 0) {
    trace.value = null;
    return;
  }
  trace.value = { stages, step: reduced ? stages.length - 1 : 0 };
  if (reduced) return;
  walk = setInterval(() => {
    const t = trace.value;
    if (t === null || t.stages !== stages || t.step >= stages.length - 1) {
      clearInterval(walk);
      return;
    }
    trace.value = { stages, step: t.step + 1 };
  }, STEP_MS);
}

function pickFinding(f: Located) {
  select(findingTarget(f));
  walkTrace(f.trace ?? (f.stage ? [f.stage] : []));
}

/** Up and Down move between the list's buttons of one class. */
function moveInList(e: JSX.TargetedKeyboardEvent<HTMLElement>, cls: string) {
  if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
  const items = [
    ...e.currentTarget.querySelectorAll<HTMLButtonElement>(`button.${cls}`),
  ];
  const i = items.indexOf(e.target as HTMLButtonElement);
  if (i < 0) return;
  const next = items[i + (e.key === "ArrowDown" ? 1 : -1)];
  if (next === undefined) return;
  e.preventDefault();
  next.focus();
}

export function Findings() {
  const from = loaded.value?.upgradedFrom ?? null;
  return (
    <>
      {from !== null && <UpgradedNote from={from} />}
      <FileFindings />
    </>
  );
}

/** Says the file is shown upgraded from an older schemaVersion. */
function UpgradedNote({ from }: { from: number }) {
  return (
    <p class="desc upgraded">
      This file is written at schemaVersion {from}. It is shown upgraded to{" "}
      {DEFINITION_SCHEMA_VERSION}, as validate and work items read it, so paths
      name the upgraded form and are not marked in the source. The factory's
      next validate writes the upgrade into the file.
    </p>
  );
}

function FileFindings() {
  const l = loaded.value;
  if (l !== null && !l.ok) return <Problems problems={l.problems} />;
  const g = good.value;
  if (g === null) return null;
  if (g.findings.length === 0) {
    return (
      <div class="insp">
        <p class="all-clear">✓ No findings</p>
        <p class="desc">
          Every stage is reachable, every loop is bounded, no two exits can be
          taken without a person choosing, and every product a stage injects is
          produced on every path into it.
        </p>
      </div>
    );
  }
  const selKey = targetKey(selection.value);
  const errors = g.findings.filter((f) => f.severity === "error").length;
  return (
    <div
      onKeyDown={(e) => {
        if (onCopyKey(e)) return;
        moveInList(e, "finding");
      }}
    >
      <p class="summary">
        {errors} error{errors === 1 ? "" : "s"}, {g.findings.length - errors}
        {" "}
        warning{g.findings.length - errors === 1 ? "" : "s"}. Errors are
        problems a work item will hit; warnings are designs worth a second look.
      </p>
      <ul class="findings">
        {g.findings.map((f, i) => {
          const target = findingTarget(f);
          const sel = targetKey(target) === selKey;
          return (
            <li key={`${i}:${f.code}:${f.path}`} class={sel ? "sel" : ""}>
              <button
                type="button"
                class={`finding ${f.severity}`}
                aria-pressed={sel}
                {...{ [TARGET_ATTR]: JSON.stringify(target) }}
                onClick={() => pickFinding(f)}
              >
                <span class="sev">
                  {f.severity === "error" ? "✖ ERROR" : "▲ WARNING"}
                </span>
                <code class="code-name">{f.code}</code>
                <span class="msg">{f.message}</span>
                <span class="where">
                  {f.path}
                  {f.range !== null ? ` · line ${f.range.line + 1}` : ""}
                  {f.trace ? ` · trace of ${f.trace.length}` : ""}
                </span>
              </button>
              {sel && (
                <CopyButton target={target} label={`the ${f.code} finding`} />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Problems({ problems }: { problems: Problem[] }) {
  return (
    <div class="problems" role="alert">
      <p class="summary">
        The file does not pass the schema, so it was not analysed. The graph
        shows the last version that passed. The agent's next edit reloads it.
      </p>
      <ul class="findings">
        {problems.map((p, i) => (
          <li key={i}>
            <div class="finding error">
              <span class="sev">✖ SCHEMA</span>
              <code class="code-name">{p.path}</code>
              <span class="msg">{p.message}</span>
              {p.range !== null && (
                <span class="where">line {p.range.line + 1}</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
