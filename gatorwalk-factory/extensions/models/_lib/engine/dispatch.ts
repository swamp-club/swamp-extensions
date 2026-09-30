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

import { type Json, jsonSafe } from "./canonical.ts";
import { type CelContext, evaluateCel } from "./cel_context.ts";
import { type FactoryDefinition, findStage } from "./definition_schema.ts";
import { validatePayload } from "./payload_schema.ts";
import type { RunRecord } from "./run_record.ts";
import { renderTemplate } from "./template.ts";

// ---------------------------------------------------------------------------
// The dispatch packet: what the current stage's work is, with its bindings
// resolved, its inputs merged and checked, and its prompt rendered. Whoever
// does the work (an agent following the skill, or later a driver) reads the
// packet; recordDispatch stores its inputs and prompt for replay.
//
// Problems (a binding that fails, a placeholder with no value, inputs that
// break inputsSchema) are reported in the packet, and ready is false, rather
// than thrown: the caller can show them and fix the run data.
// ---------------------------------------------------------------------------

export interface DispatchPacket {
  stage: string;
  cycle: number;
  mode: "interactive" | "dispatch" | "workflow" | "method";
  skills: string[];
  /** How many subagents a dispatch stage runs: one per skill, or one
   * reviewer when no skills are listed. Zero for other modes. */
  subagents: number;
  /** Resolved binding values. */
  values: Record<string, Json>;
  /** For workflow and method stages: literal inputs plus bindings. */
  inputs?: Record<string, Json>;
  workflow?: string;
  method?: { modelIdOrName: string; methodName: string };
  prompt?: string;
  command?: string;
  constraints?: string;
  inject: string[];
  problems: string[];
  ready: boolean;
}

/** Build the dispatch packet for the run's current stage. */
export function buildDispatch(
  definition: FactoryDefinition,
  run: RunRecord,
  context: CelContext,
): DispatchPacket {
  const stage = findStage(definition, run.stage);
  if (stage === undefined) throw new Error(`no stage '${run.stage}'`);
  const work = stage.work ?? { mode: "interactive" as const };
  const problems: string[] = [];

  const values: Record<string, Json> = {};
  for (const [name, expression] of Object.entries(work.bindings ?? {})) {
    try {
      values[name] = evaluateCel(expression, context);
    } catch (error) {
      problems.push(
        `binding '${name}' (${expression}) failed: ${
          error instanceof Error ? error.message.split("\n")[0] : String(error)
        }`,
      );
    }
  }

  const render = (field: "systemPrompt" | "command"): string | undefined => {
    const text = work[field];
    if (text === undefined) return undefined;
    const rendered = renderTemplate(text, values);
    if (rendered.ok) return rendered.text;
    for (const name of rendered.missing) {
      problems.push(`${field} placeholder {{${name}}} has no value`);
    }
    return undefined;
  };

  const packet: DispatchPacket = {
    stage: stage.id,
    cycle: context.stage.cycle,
    mode: work.mode,
    skills: work.skills ?? [],
    subagents: work.mode === "dispatch"
      ? Math.max(1, (work.skills ?? []).length)
      : 0,
    values,
    inject: work.context?.inject ?? [],
    problems,
    ready: false,
  };
  const prompt = render("systemPrompt");
  if (prompt !== undefined) packet.prompt = prompt;
  const command = render("command");
  if (command !== undefined) packet.command = command;
  if (work.constraints !== undefined) packet.constraints = work.constraints;

  if (work.mode === "workflow" || work.mode === "method") {
    const literal = jsonSafe(
      work.workflow?.inputs ?? work.method?.inputs ?? {},
    ) as Record<string, Json>;
    const inputs = { ...literal, ...values };
    packet.inputs = inputs;
    if (work.workflow !== undefined) packet.workflow = work.workflow.name;
    if (work.method !== undefined) {
      packet.method = {
        modelIdOrName: work.method.modelIdOrName,
        methodName: work.method.methodName,
      };
    }
    if (work.inputsSchema !== undefined) {
      for (const error of validatePayload(work.inputsSchema, inputs) ?? []) {
        problems.push(`inputs: ${error}`);
      }
    }
  }
  packet.ready = problems.length === 0;
  return packet;
}
