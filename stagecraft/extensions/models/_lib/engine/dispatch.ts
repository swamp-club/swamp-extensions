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
import {
  artifactContract,
  evidenceContract,
  type PayloadSchema,
  validatePayload,
  withoutNotes,
} from "./payload_schema.ts";
import type { RunRecord } from "./run_record.ts";
import { renderTemplate } from "./template.ts";

// ---------------------------------------------------------------------------
// The dispatch packet: what the current stage's work is, with its bindings
// resolved, its inputs merged and checked, and its prompt rendered. Whoever
// does the work (an agent following the skill, or later a driver) reads the
// packet; recordDispatch stores its inputs and prompt for replay.
//
// The packet names the products the stage's work must record, each with the
// schema its payload is checked against; evidence a person records
// (recordedBy: person) is not the work's and is left out. A dispatch stage's
// subagents get prompts the engine writes whole (buildSubagentPrompts): the
// rendered prompt, then where to read injected products and where to write
// each result. The driver sends them as they are and records the result files
// unedited, so what is recorded is what was sent and what came back.
//
// Problems (a binding that fails, a placeholder with no value, inputs that
// break inputsSchema) are reported in the packet, and ready is false, rather
// than thrown: the caller can show them and fix the run data.
// ---------------------------------------------------------------------------

/** A product the stage declares, with the contract its payload must meet. */
export interface ProductContract {
  kind: "artifact" | "evidence";
  name: string;
  /** The artifact this one reviews, when it is a review. */
  reviews?: string;
  schema: PayloadSchema;
}

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
  /** Every product the stage's work records, in declaration order, its
   * schema without notes (descriptions are for the definition's authors).
   * Evidence a person records (recordedBy: person) is not the work's and is
   * left out. */
  products: ProductContract[];
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
    products: productsOf(stage),
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

function productsOf(
  stage: NonNullable<ReturnType<typeof findStage>>,
): ProductContract[] {
  const products: ProductContract[] = (stage.artifacts ?? []).map((spec) => ({
    kind: "artifact",
    name: spec.name,
    ...(spec.reviews !== undefined ? { reviews: spec.reviews } : {}),
    schema: withoutNotes(artifactContract(spec)),
  }));
  const result = stage.work?.resultEvidence;
  for (const spec of stage.evidence ?? []) {
    if (spec.recordedBy === "person") continue;
    products.push({
      kind: "evidence",
      name: spec.name,
      schema: withoutNotes(evidenceContract(spec, spec.name === result)),
    });
  }
  if (
    result !== undefined &&
    !(stage.evidence ?? []).some((spec) => spec.name === result)
  ) {
    products.push({
      kind: "evidence",
      name: result,
      schema: withoutNotes(evidenceContract(undefined, true)),
    });
  }
  return products;
}

/** What one subagent of a dispatch stage is sent. */
export interface SubagentPrompt {
  /** The skill this subagent follows, when the stage lists skills. */
  skill?: string;
  /** Where the subagent writes each product's payload, by product name. */
  resultPaths: Record<string, string>;
  /** The whole prompt, ready to send as it is. */
  prompt: string;
}

/**
 * The prompts for a dispatch stage's subagents, one each: the rendered
 * prompt byte for byte, then a fixed section naming the skill to follow,
 * where to read each injected product, and where to write each product's
 * payload with the schema it must meet. Empty for other modes.
 */
export function buildSubagentPrompts(
  definition: FactoryDefinition,
  packet: DispatchPacket,
  where: { key: string; dispatchId: number; resultDir: string },
): SubagentPrompt[] {
  if (packet.mode !== "dispatch") return [];
  const dir = where.resultDir.replace(/\/+$/, "");
  const reads = packet.inject.map((name) =>
    `- ${name}: swamp data query 'modelName == "${where.key}" && ` +
    `name == "${kindOf(definition, name)}-${name}"' --select content ` +
    "--single --json"
  );
  return Array.from({ length: packet.subagents }, (_, i) => {
    const skill = packet.skills[i];
    const resultPaths: Record<string, string> = {};
    const writes: string[] = [];
    for (const product of packet.products) {
      const path = `${dir}/${where.key}-d${where.dispatchId}-${
        i + 1
      }-${product.name}.json`;
      resultPaths[product.name] = path;
      // Several subagents on one findings artifact are joined into one
      // record, so each numbers its findings apart from the others.
      const prefix = packet.subagents > 1 && isFindings(definition, product)
        ? `  Start every finding id with S${i + 1}- (S${i + 1}-F1, ` +
          `S${i + 1}-F2, ...), so ids from different subagents never ` +
          "collide.\n"
        : "";
      writes.push(
        `- ${product.kind} ${product.name}: write it to ${path}\n` + prefix +
          `  Its schema:\n${indent(JSON.stringify(product.schema, null, 2))}`,
      );
    }
    const sections = [
      ...(skill !== undefined ? [`Follow the ${skill} skill.`] : []),
      ...(reads.length > 0
        ? [
          "Read these products fresh from the store. Each command prints\n" +
          "the product's payload as one JSON object. If it exits non-zero\n" +
          "with an error (the record is missing or not alone), stop and\n" +
          "report that; never guess the product.\n" +
          reads.join("\n"),
        ]
        : []),
      ...(writes.length > 0
        ? [
          "Write your result as JSON, one file per product, holding the\n" +
          "payload and nothing else. These files are the only thing you may\n" +
          `write.\n${writes.join("\n")}`,
        ]
        : []),
    ];
    const prompt = [
      ...(packet.prompt !== undefined
        ? [packet.prompt.replace(/\n$/, "")]
        : []),
      ...(sections.length > 0 ? ["---", ...sections] : []),
    ].join("\n\n") + "\n";
    return {
      ...(skill !== undefined ? { skill } : {}),
      resultPaths,
      prompt,
    };
  });
}

function isFindings(
  definition: FactoryDefinition,
  product: ProductContract,
): boolean {
  return product.kind === "artifact" &&
    definition.stages.some((stage) =>
      (stage.artifacts ?? []).some((spec) =>
        spec.name === product.name && spec.kind === "findings"
      )
    );
}

/** Whether a name is an artifact or evidence; a definition keeps them apart. */
function kindOf(
  definition: FactoryDefinition,
  name: string,
): "artifact" | "evidence" {
  return definition.stages.some((stage) =>
      (stage.artifacts ?? []).some((spec) => spec.name === name)
    )
    ? "artifact"
    : "evidence";
}

function indent(text: string): string {
  return text.split("\n").map((line) => `    ${line}`).join("\n");
}
