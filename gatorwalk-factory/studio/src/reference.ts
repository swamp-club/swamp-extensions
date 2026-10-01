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

// Copy reference: one plain line a person pastes to the agent, naming the
// file, the document path and something a person reads. That is the whole
// hand-off; the page never edits the file.
//
//   factories/team.yaml stages.2 (stage plan)
//   factories/team.yaml stages.2.transitions.0 (exit submit: plan → review)
//   factories/team.yaml stages.2.transitions.0.gates.1 (human-approval gate
//     'plan-ok' on exit submit: plan → review)
//   factories/team.yaml globalTransitions.0 (global exit abandon: any stage →
//     abandoned)
//   factories/team.yaml stages.2.transitions.0 (exit submit: plan → review)
//     ambiguous-exit: <the finding's message>

import type { FactoryDefinition } from "../../extensions/models/_lib/engine/definition_schema.ts";
import type { FindingView } from "../../extensions/models/_lib/engine/design_page.ts";
import { pathOf, type Target, targetAt } from "./selection.ts";

/** A short name a person reads, for a target that exists. */
export function readable(
  definition: FactoryDefinition,
  target: Target,
): string {
  switch (target.kind) {
    case "stage":
      return `stage ${target.stage}`;
    case "any":
      return "global exits, from any stage";
    case "exit":
    case "gate": {
      const list = target.stage === null
        ? definition.globalTransitions ?? []
        : definition.stages.find((s) => s.id === target.stage)?.transitions ??
          [];
      const to = list.find((t) => t.name === target.exit)?.to ?? "?";
      const exit = target.stage === null
        ? `global exit ${target.exit}: any stage → ${to}`
        : `exit ${target.exit}: ${target.stage} → ${to}`;
      if (target.kind === "exit") return exit;
      const about = target.gate.key === null || target.gate.type === "cel"
        ? ""
        : ` '${target.gate.key}'`;
      return `${target.gate.type} gate${about} on ${exit}`;
    }
    case "finding":
      return `${target.code} finding`;
  }
}

/** The one line Copy reference puts on the clipboard. */
export function referenceLine(
  file: string,
  definition: FactoryDefinition,
  target: Target,
  findings: FindingView[] = [],
): string {
  if (target.kind === "finding") {
    const at = targetAt(definition, target.path);
    const name = at === null ? "" : ` (${readable(definition, at)})`;
    const message = target.message.replace(/\s+/g, " ").trim();
    return `${file} ${target.path}${name} ${target.code}: ${message}`;
  }
  const path = pathOf(definition, target, findings) ?? "(gone)";
  return `${file} ${path} (${readable(definition, target)})`;
}
