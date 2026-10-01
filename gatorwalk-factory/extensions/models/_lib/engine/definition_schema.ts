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

import { z } from "npm:zod@4.3.6";
import { parse as parseCel } from "npm:@marcbachmann/cel-js@7.6.1";
import {
  FINDINGS_SCHEMA,
  lintFieldSchema,
  lintPayloadSchema,
  type PayloadSchema,
  SEVERITIES,
} from "./payload_schema.ts";
import type { CelContext } from "./cel_context.ts";
import { isCelNode, productKind, productRefs } from "./cel_refs.ts";
import {
  DEFAULT_TRACKER_KIND,
  TRACKER_KINDS,
  type TrackerKind,
} from "./tracker_binding.ts";
import { IDENTIFIER_PATTERN, undeclaredPlaceholders } from "./template.ts";
import { parseSummary } from "./entry_summary.ts";

// ---------------------------------------------------------------------------
// The factory definition meta-schema: what a gatorwalk factory definition looks
// like as data. Ported from @swamp/software-factory's definition schema, with
// three changes:
//
// - Payload schemas are standard JSON Schema 2020-12 (payload_schema.ts),
//   not a home-grown dialect.
// - Runtime values are bare CEL strings in `work.bindings`, cel gates and a
//   human-approval gate's `when`, never `${{ }}`. A factory definition is
//   stored in its factory's globalArguments, where swamp evaluates `${{ }}`
//   before each method runs. Prose fields refer to bindings by
//   name with `{{name}}` placeholders (template.ts).
// - Referential integrity is part of the schema, so a factory definition with a
//   dangling reference fails when it is saved, not when a work item reaches
//   the broken stage. Graph analysis (reachability, dead ends, ambiguous
//   exits) is in graph.ts.
//
// Structure is by identity, never by name convention: the resultEvidence of a
// stage and an evidence entry of the same name on that stage are one
// declaration (#897).
// ---------------------------------------------------------------------------

export const DEFINITION_SCHEMA_VERSION = 1;

/** Names for stages, transitions, artifacts, evidence, gates. Safe as path
 * segments and shell words on every platform (#2290). */
const NAME_PATTERN = /^[a-z][a-z0-9_-]*$/;

export const NameSchema = z.string().regex(
  NAME_PATTERN,
  "must be lowercase alphanumeric with '-'/'_' separators, starting with a letter",
);

/** Default re-entry limit for every stage. Never unlimited by omission. */
export const DEFAULT_MAX_CYCLES = 5;

/**
 * Default dispatches allowed per stage entry: one execution plus one
 * tolerated retry. The next dispatch parks the work item for a human.
 */
export const DEFAULT_MAX_DISPATCHES = 2;

export const SeveritySchema = z.enum(SEVERITIES);

// ---------------------------------------------------------------------------
// Payload schemas and CEL
// ---------------------------------------------------------------------------

/** A JSON Schema 2020-12 document, checked when the factory definition is
 * saved. */
export const PayloadSchemaSchema: z.ZodType<PayloadSchema> = z.record(
  z.string(),
  z.unknown(),
).superRefine((schema, ctx) => {
  for (const issue of lintPayloadSchema(schema)) {
    ctx.addIssue({ code: "custom", path: issue.path, message: issue.message });
  }
});

/** A payload schema for a JSON object (artifacts, evidence, inputs). */
export const ObjectPayloadSchemaSchema = PayloadSchemaSchema.refine(
  (schema) => schema.type === "object",
  "must declare type: object (payloads are JSON objects)",
);

const TEMPLATE_OPEN = "${{";

/**
 * The names CEL reads from its context (cel_context.ts). A macro or cel.bind
 * variable may not reuse one: it would hide the context's value for the rest
 * of the expression, and tools that read CEL, such as the product reference
 * check (cel_refs.ts), take these names to always mean the context's.
 */
export const CEL_VOCABULARY = [
  "item",
  "stage",
  "artifacts",
  "evidence",
  "validations",
] as const satisfies readonly (keyof CelContext)[];

// Every context name is listed: this fails to compile when one is missing.
const _vocabularyComplete: Exclude<
  keyof CelContext,
  typeof CEL_VOCABULARY[number]
> extends never ? true : never = true;

/** Comprehension macros, whose leading arguments are variables they bind. */
const COMPREHENSIONS = new Set([
  "all",
  "exists",
  "exists_one",
  "existsOne",
  "map",
  "filter",
  "transformList",
  "transformMap",
  "transformMapEntry",
]);

/** Variables the expression's macros and cel.bind calls bind. */
function boundVariables(node: unknown, out: string[] = []): string[] {
  if (Array.isArray(node)) {
    for (const child of node) boundVariables(child, out);
    return out;
  }
  if (!isCelNode(node)) return out;
  if (node.op === "rcall") {
    const [name, receiver, args] = node.args as [string, unknown, unknown[]];
    let vars: unknown[] = [];
    if (name === "bind") {
      if (
        isCelNode(receiver) && receiver.op === "id" && receiver.args === "cel"
      ) {
        vars = args.slice(0, 1);
      }
    } else if (COMPREHENSIONS.has(name)) {
      // map(x, p, t) and filter bind one variable; the others may bind two.
      const most = name === "map" || name === "filter" ? 1 : 2;
      vars = args.slice(0, Math.min(most, args.length - 1));
    }
    for (const v of vars) {
      if (isCelNode(v) && v.op === "id" && typeof v.args === "string") {
        out.push(v.args);
      }
    }
  }
  if (node.op !== "id" && node.op !== "value") boundVariables(node.args, out);
  return out;
}

/** A bare CEL expression, syntax-checked when the factory definition is saved.
 */
export const CelExpressionSchema = z.string().min(1).superRefine(
  (expr, ctx) => {
    if (expr.includes(TEMPLATE_OPEN)) {
      ctx.addIssue({
        code: "custom",
        message: "write bare CEL without ${{ }}: the definition is data, and " +
          "swamp would evaluate ${{ }} before each method runs",
      });
      return;
    }
    let ast: unknown;
    try {
      ast = parseCel(expr).ast;
    } catch (error) {
      ctx.addIssue({
        code: "custom",
        message: `not valid CEL: ${
          error instanceof Error ? error.message : String(error)
        }`,
      });
      return;
    }
    const reserved: readonly string[] = CEL_VOCABULARY;
    for (const name of new Set(boundVariables(ast))) {
      if (reserved.includes(name)) {
        ctx.addIssue({
          code: "custom",
          message: `'${name}' is a name the CEL context defines (${
            CEL_VOCABULARY.join(", ")
          }); a macro or cel.bind variable may not reuse it`,
        });
      }
    }
  },
);

// ---------------------------------------------------------------------------
// Gates
// ---------------------------------------------------------------------------

/**
 * Prose for the factory definition's authors: why the gate is there. Shown in
 * the studio; no engine path sends it to an agent.
 */
const GateDescriptionSchema = z.string().optional();

export const ArtifactExistsGateSchema = z.strictObject({
  type: z.literal("artifact-exists"),
  description: GateDescriptionSchema,
  config: z.strictObject({ artifact: NameSchema }),
});

export const ArtifactFreshGateSchema = z.strictObject({
  type: z.literal("artifact-fresh"),
  description: GateDescriptionSchema,
  config: z.strictObject({
    artifact: NameSchema,
    recordedThisCycle: z.boolean().optional(),
  }),
});

export const FindingsClearGateSchema = z.strictObject({
  type: z.literal("findings-clear"),
  description: GateDescriptionSchema,
  config: z.strictObject({
    artifact: NameSchema,
    blocking: z.array(SeveritySchema).min(1),
  }),
});

/**
 * The mirror of findings-clear: passes while the findings artifact has an
 * unresolved finding at one of the blocking severities. A rework exit gated on
 * it and an approve exit gated on findings-clear, with the same `blocking`,
 * never pass together.
 */
export const FindingsOpenGateSchema = z.strictObject({
  type: z.literal("findings-open"),
  description: GateDescriptionSchema,
  config: z.strictObject({
    artifact: NameSchema,
    blocking: z.array(SeveritySchema).min(1),
  }),
});

/**
 * A person's decision. With `when`, the gate applies only while that CEL
 * expression over run data is true; while it is false the gate passes and no
 * one is asked.
 */
export const HumanApprovalGateSchema = z.strictObject({
  type: z.literal("human-approval"),
  description: GateDescriptionSchema,
  config: z.strictObject({
    id: NameSchema,
    minApprovals: z.number().int().positive().optional(),
    when: CelExpressionSchema.optional(),
  }),
});

/**
 * Field paths to values an evidence payload must hold. A key of __proto__ is
 * refused: zod drops it when building the record, which would silently turn
 * the requirement into none.
 */
const RequireFieldSchema = z.unknown().superRefine((raw, ctx) => {
  if (
    raw !== null && typeof raw === "object" && Object.hasOwn(raw, "__proto__")
  ) {
    ctx.addIssue({
      code: "custom",
      message: "requireField cannot name '__proto__'",
    });
  }
}).pipe(z.record(z.string(), z.unknown()));

/**
 * Field paths to JSON Schema 2020-12 fragments the evidence payload's value
 * there must satisfy: a sibling of requireField rather than operator objects
 * inside it, because a requireField value may itself be any object. The same
 * __proto__ refusal applies.
 */
const MatchSchema = z.unknown().superRefine((raw, ctx) => {
  if (raw === null || typeof raw !== "object" || Array.isArray(raw)) return;
  if (Object.hasOwn(raw, "__proto__")) {
    ctx.addIssue({ code: "custom", message: "match cannot name '__proto__'" });
    return;
  }
  for (const [field, schema] of Object.entries(raw)) {
    for (const issue of lintFieldSchema(schema)) {
      ctx.addIssue({
        code: "custom",
        path: [field, ...issue.path],
        message: issue.message,
      });
    }
  }
}).pipe(
  z.record(
    z.string(),
    z.union([z.boolean(), z.record(z.string(), z.unknown())]),
  ),
);

export const EvidenceRecordedGateSchema = z.strictObject({
  type: z.literal("evidence-recorded"),
  description: GateDescriptionSchema,
  config: z.strictObject({
    name: NameSchema,
    requireField: RequireFieldSchema.optional(),
    match: MatchSchema.optional(),
    /** Shown, with the detail, when a field's value does not qualify. */
    message: z.string().optional(),
  }),
});

export const CooldownGateSchema = z.strictObject({
  type: z.literal("cooldown"),
  description: GateDescriptionSchema,
  config: z.strictObject({
    afterEvidence: NameSchema.optional(),
    afterArtifact: NameSchema.optional(),
    seconds: z.number().positive(),
  }).refine(
    (c) => (c.afterEvidence === undefined) !== (c.afterArtifact === undefined),
    "exactly one of afterEvidence or afterArtifact is required",
  ),
});

export const MaxCyclesGateSchema = z.strictObject({
  type: z.literal("max-cycles"),
  description: GateDescriptionSchema,
  config: z.strictObject({
    stage: NameSchema,
    limit: z.number().int().positive(),
    invert: z.boolean().optional(),
  }),
});

export const CelGateSchema = z.strictObject({
  type: z.literal("cel"),
  description: GateDescriptionSchema,
  config: z.strictObject({
    expr: CelExpressionSchema,
    message: z.string().optional(),
  }),
});

/**
 * The gate library. software-factory's `workflow-succeeded` is not here: at
 * launch, run outcomes are attested as resultEvidence and gated with
 * `evidence-recorded` (requireField: { status: succeeded }), because no
 * component yet dispatches runs and so knows their identity.
 */
export const GateSchema = z.discriminatedUnion("type", [
  ArtifactExistsGateSchema,
  ArtifactFreshGateSchema,
  FindingsClearGateSchema,
  FindingsOpenGateSchema,
  HumanApprovalGateSchema,
  EvidenceRecordedGateSchema,
  CooldownGateSchema,
  MaxCyclesGateSchema,
  CelGateSchema,
]);

export type GateSpec = z.infer<typeof GateSchema>;

// ---------------------------------------------------------------------------
// Work
// ---------------------------------------------------------------------------

export const WorkflowCallSchema = z.strictObject({
  name: z.string().min(1),
  inputs: z.record(z.string(), z.unknown()).optional(),
});

export const MethodCallSchema = z.strictObject({
  modelIdOrName: z.string().min(1),
  methodName: z.string().min(1),
  inputs: z.record(z.string(), z.unknown()).optional(),
});

export const WorkContextSchema = z.strictObject({
  /** Artifacts and evidence handed to whoever does the work. */
  inject: z.array(NameSchema).optional(),
});

export const WORK_MODES = [
  "interactive",
  "dispatch",
  "workflow",
  "method",
] as const;

export const WorkSchema = z.strictObject({
  mode: z.enum(WORK_MODES),
  /**
   * Prose for the factory definition's authors: what the work is and why. Shown
   * in the studio; never sent to whoever does the work (that is systemPrompt
   * and command).
   */
  description: z.string().optional(),
  skills: z.array(z.string().min(1)).optional(),
  /** Prose for whoever does the work; may use `{{binding}}` placeholders. */
  systemPrompt: z.string().optional(),
  /** Command for whoever does the work; may use `{{binding}}` placeholders. */
  command: z.string().optional(),
  constraints: z.string().optional(),
  context: WorkContextSchema.optional(),
  workflow: WorkflowCallSchema.optional(),
  method: MethodCallSchema.optional(),
  /**
   * Named values resolved from run data when the stage is dispatched, each a
   * bare CEL expression. They fill `{{name}}` placeholders in systemPrompt
   * and command. For `workflow` and `method` stages they are also merged into
   * the call's inputs (a name may not also be a literal input); for
   * `interactive` and `dispatch` stages they are also handed to the agent as
   * data. The resolved values are recorded on the dispatch.
   */
  bindings: z.record(z.string(), CelExpressionSchema).optional(),
  /** Schema the merged inputs of a workflow or method call must satisfy. */
  inputsSchema: ObjectPayloadSchemaSchema.optional(),
  /** Evidence that records the stage's run outcome. */
  resultEvidence: NameSchema.optional(),
}).superRefine((work, ctx) => {
  const issue = (path: string, message: string) =>
    ctx.addIssue({ code: "custom", path: [path], message });
  const calls = work.mode === "workflow" || work.mode === "method";
  if (work.mode === "workflow" && work.workflow === undefined) {
    issue("workflow", "mode 'workflow' requires a workflow block");
  }
  if (work.mode === "method" && work.method === undefined) {
    issue("method", "mode 'method' requires a method block");
  }
  if (work.mode !== "workflow" && work.workflow !== undefined) {
    issue(
      "workflow",
      `a workflow block needs mode 'workflow' (not '${work.mode}')`,
    );
  }
  if (work.mode !== "method" && work.method !== undefined) {
    issue("method", `a method block needs mode 'method' (not '${work.mode}')`);
  }
  if (!calls && work.inputsSchema !== undefined) {
    issue(
      "inputsSchema",
      "inputsSchema only applies to mode 'workflow' or 'method' (the modes with call inputs)",
    );
  }
  // Checked here rather than as a record key schema, whose own message zod
  // replaces with "Invalid key in record".
  for (const name of Object.keys(work.bindings ?? {})) {
    if (!IDENTIFIER_PATTERN.test(name)) {
      ctx.addIssue({
        code: "custom",
        path: ["bindings", name],
        message: "a binding name is an identifier (letters, digits, '_'; " +
          "not starting with a digit), so it can be used as {{name}}",
      });
    }
  }
  const names = Object.keys(work.bindings ?? {}).filter((name) =>
    IDENTIFIER_PATTERN.test(name)
  );
  for (const field of ["systemPrompt", "command"] as const) {
    const text = work[field];
    if (text === undefined) continue;
    for (const name of undeclaredPlaceholders(text, names)) {
      issue(
        field,
        `{{${name}}} is not a declared binding; declare it under bindings, ` +
          "or write \\{{ for a literal {{",
      );
    }
  }
  const literals = (work.mode === "workflow"
    ? work.workflow?.inputs
    : work.mode === "method"
    ? work.method?.inputs
    : undefined) ?? {};
  for (const name of Object.keys(work.bindings ?? {})) {
    if (Object.hasOwn(literals, name)) {
      ctx.addIssue({
        code: "custom",
        path: ["bindings", name],
        message: `'${name}' is both a literal input and a binding; keep one`,
      });
    }
  }
});

export type WorkSpec = z.infer<typeof WorkSchema>;

// ---------------------------------------------------------------------------
// Artifacts, evidence, transitions, stages
// ---------------------------------------------------------------------------

export const ArtifactSpecSchema = z.strictObject({
  name: NameSchema,
  description: z.string().optional(),
  /** Built-in findings contract (payload_schema.ts FINDINGS_SCHEMA). */
  kind: z.literal("findings").optional(),
  /** The artifact this one reviews, for freshness checks. */
  reviews: NameSchema.optional(),
  schema: ObjectPayloadSchemaSchema.optional(),
}).superRefine((spec, ctx) => {
  if (spec.kind !== "findings" && spec.schema === undefined) {
    ctx.addIssue({
      code: "custom",
      path: ["schema"],
      message: "every artifact declares a payload schema (or is " +
        "kind: findings), e.g. schema: { type: object, required: [summary], " +
        "properties: { summary: { type: string } } }",
    });
  }
  const properties = spec.schema?.properties;
  if (
    spec.kind === "findings" && spec.schema?.additionalProperties === false &&
    !(typeof properties === "object" && properties !== null &&
      Object.hasOwn(properties, "findings"))
  ) {
    ctx.addIssue({
      code: "custom",
      path: ["schema"],
      message: "a kind: findings artifact whose schema sets " +
        "additionalProperties: false must declare the findings property, " +
        "or it rejects its own findings",
    });
  }
});

export type ArtifactSpec = z.infer<typeof ArtifactSpecSchema>;

export const EvidenceSpecSchema = z.strictObject({
  name: NameSchema,
  description: z.string().optional(),
  /** Required, except on the entry that restates the stage's resultEvidence
   * (which otherwise uses the built-in outcome contract). */
  schema: ObjectPayloadSchemaSchema.optional(),
  /** Who records it. `person`: a person gives it (a person's feedback, say),
   * so it is not part of the stage's work: the dispatch packet leaves it out
   * and status names it. Absent: the stage's work records it. */
  recordedBy: z.literal("person").optional(),
});

export type EvidenceSpec = z.infer<typeof EvidenceSpecSchema>;

export const TransitionSchema = z.strictObject({
  name: NameSchema,
  /** Target stage. */
  to: NameSchema,
  description: z.string().optional(),
  /** Require an explicit human "go" even when every gate passes. */
  manual: z.boolean().optional(),
  gates: z.array(GateSchema).optional(),
});

export type TransitionSpec = z.infer<typeof TransitionSchema>;

/**
 * What a tracker entry answers to: the work item entering the stage
 * (including starting in it), the stage's first dispatch in a cycle, a
 * product the stage declares being recorded, a person approving one of its
 * human-approval gates, or the work item leaving it by a transition (its
 * own, or a global one).
 */
export const EntryTriggerSchema = z.union([
  z.literal("enter"),
  z.literal("dispatch"),
  z.strictObject({ record: NameSchema }),
  z.strictObject({ approve: NameSchema }),
  z.strictObject({ transition: NameSchema }),
]);

export type EntryTrigger = z.infer<typeof EntryTriggerSchema>;

/**
 * One journal event as a structured entry in the ticket's history (the
 * Lab's lifecycle entry). DESIGN.md, "The publisher".
 */
export const TrackerEntrySchema = z.strictObject({
  on: EntryTriggerSchema,
  /** Top-level payload fields the recorded product must hold, by equality. */
  match: z.record(
    z.string().regex(IDENTIFIER_PATTERN),
    z.union([z.string(), z.number(), z.boolean()]),
  ).optional(),
  /** first: only the stage's first cycle; later: only a cycle after it. */
  cycle: z.enum(["first", "later"]).optional(),
  /** The entry's step, e.g. issue-lifecycle's classified. */
  step: z.string().regex(/^[a-z][a-z0-9_]*$/).max(100),
  emoji: z.string().min(1).max(32),
  /** The entry's summary: `{{field}}` is a top-level field of the recorded
   * product's payload, and `{{$cycle}}`, `{{$version}}`,
   * `{{$version.<product>}}`, `{{$input.<name>}}` and `{{count ...}}` come
   * from the event (entry_summary.ts). */
  summary: z.string().min(1).max(2000),
  /** The status key that labels the entry; defaults to the stage's. */
  status: NameSchema.optional(),
  /** Shown only in the ticket's verbose history. */
  verbose: z.boolean().optional(),
  /** A payload field holding the ticket type to set before the entry. */
  setsType: z.string().regex(IDENTIFIER_PATTERN).optional(),
  /** A payload field holding a pull request url to link before the entry. */
  linkPr: z.string().regex(IDENTIFIER_PATTERN).optional(),
});

export type TrackerEntry = z.infer<typeof TrackerEntrySchema>;

/**
 * A person's approval that marks the work item's ticket a duplicate (DESIGN.md,
 * "Duplicates"). The tracker reads it; the engine never does. When the gate
 * is approved, publish relates the ticket the work item has then
 * `duplicate_of` the stable id in the recorded product's field, and closes it.
 */
export const TrackerDuplicateSchema = z.strictObject({
  /** The human-approval gate whose approval marks the duplicate. */
  on: z.strictObject({ approve: NameSchema }),
  /** The product that names the primary. */
  record: NameSchema,
  /** Its top-level payload field holding the primary's stable id. */
  field: z.string().regex(IDENTIFIER_PATTERN),
});

export type TrackerDuplicate = z.infer<typeof TrackerDuplicateSchema>;

/** The key two entries collide on: the same kind of event, same target. */
export function triggerKey(on: EntryTrigger): string {
  if (on === "enter" || on === "dispatch") return on;
  if ("record" in on) return `record:${on.record}`;
  if ("approve" in on) return `approve:${on.approve}`;
  return `transition:${on.transition}`;
}

export const StageSchema = z.strictObject({
  id: NameSchema,
  description: z.string().optional(),
  initial: z.boolean().optional(),
  terminal: z.boolean().optional(),
  maxCycles: z.number().int().positive().optional(),
  maxDispatchesPerCycle: z.number().int().positive().optional(),
  work: WorkSchema.optional(),
  artifacts: z.array(ArtifactSpecSchema).optional(),
  evidence: z.array(EvidenceSpecSchema).optional(),
  transitions: z.array(TransitionSchema).optional(),
  /** How a tracker ticket shows this stage (DESIGN.md, "The publisher"). */
  tracker: z.strictObject({
    /** A gatorwalk status key, which a tracker adapter's statuses argument
     * maps to its own status name. Absent: entering the stage leaves the
     * ticket's status alone. */
    status: NameSchema.optional(),
    /** Journal events this stage turns into ticket history entries. A
     * factory definition that declares any is published as entries, not
     * comments, to a tracker that keeps them. */
    entries: z.array(TrackerEntrySchema).optional(),
    /** The approval that marks the ticket a duplicate of a primary. */
    duplicate: TrackerDuplicateSchema.optional(),
  }).optional(),
});

export type StageSpec = z.infer<typeof StageSchema>;

// ---------------------------------------------------------------------------
// The document
// ---------------------------------------------------------------------------

/**
 * A factory definition: the state machine a work item runs, copied into the
 * work item at start so the run is pinned to it. It has no name of its own:
 * the factory model that holds it names it (#2816).
 */
export const DefinitionSchema = z.strictObject({
  schemaVersion: z.literal(DEFINITION_SCHEMA_VERSION),
  description: z.string().optional(),
  /** The kind of tracker the factory definition is written for; the factory
   * names the instance. Absent: the built-in tracker. */
  tracker: z.strictObject({ kind: z.enum(TRACKER_KINDS) }).optional(),
  stages: z.array(StageSchema).min(1),
  /** Escape hatches (abort, escalate) available from any non-terminal stage. */
  globalTransitions: z.array(TransitionSchema).optional(),
}).superRefine((doc, ctx) => checkDocument(doc, ctx));

export type FactoryDefinition = z.infer<typeof DefinitionSchema>;

/** The tracker kind a factory definition is written for. */
export function trackerKindOf(definition: FactoryDefinition): TrackerKind {
  return definition.tracker?.kind ?? DEFAULT_TRACKER_KIND;
}

type Doc = {
  stages: StageSpec[];
  globalTransitions?: TransitionSpec[];
};

export type Path = (string | number)[];

/** Cross-reference checks over a whole factory definition. */
function checkDocument(doc: Doc, ctx: z.RefinementCtx): void {
  const fail = (path: Path, message: string) =>
    ctx.addIssue({ code: "custom", path, message });

  // Stages: unique ids, one initial, at least one terminal.
  const stageIds = new Set<string>();
  doc.stages.forEach((stage, i) => {
    if (stageIds.has(stage.id)) {
      fail(["stages", i, "id"], `duplicate stage id '${stage.id}'`);
    }
    stageIds.add(stage.id);
    if (stage.initial === true && stage.terminal === true) {
      fail(
        ["stages", i],
        `stage '${stage.id}' cannot be both initial and terminal`,
      );
    }
  });
  const initials = doc.stages.filter((s) => s.initial === true).length;
  if (initials !== 1) {
    fail(
      ["stages"],
      `exactly one stage must declare initial: true (found ${initials})`,
    );
  }
  if (!doc.stages.some((s) => s.terminal === true)) {
    fail(["stages"], "at least one stage must declare terminal: true");
  }

  // Products: names are unique per kind across the document. A stage's
  // resultEvidence and its own evidence entry of the same name are one
  // declaration.
  const artifacts = new Map<string, ArtifactSpec>();
  const evidence = new Set<string>();
  doc.stages.forEach((stage, i) => {
    (stage.artifacts ?? []).forEach((spec, j) => {
      if (artifacts.has(spec.name)) {
        fail(
          ["stages", i, "artifacts", j, "name"],
          `artifact '${spec.name}' is declared more than once; artifact names are unique across the definition`,
        );
      }
      artifacts.set(spec.name, spec);
    });
    const own = new Set<string>();
    (stage.evidence ?? []).forEach((spec, j) => {
      if (evidence.has(spec.name) || own.has(spec.name)) {
        fail(
          ["stages", i, "evidence", j, "name"],
          `evidence '${spec.name}' is declared more than once; evidence names are unique across the definition`,
        );
      }
      own.add(spec.name);
      if (
        spec.schema === undefined && spec.name !== stage.work?.resultEvidence
      ) {
        fail(
          ["stages", i, "evidence", j, "schema"],
          "every evidence declares a payload schema (only the stage's own " +
            "resultEvidence may omit it, to use the built-in outcome contract)",
        );
      }
      if (
        spec.recordedBy === "person" &&
        spec.name === stage.work?.resultEvidence
      ) {
        fail(
          ["stages", i, "evidence", j, "recordedBy"],
          `evidence '${spec.name}' is the stage's resultEvidence, which its ` +
            "work records; it cannot be recordedBy: person",
        );
      }
    });
    const result = stage.work?.resultEvidence;
    if (result !== undefined && !own.has(result)) {
      if (evidence.has(result)) {
        fail(
          ["stages", i, "work", "resultEvidence"],
          `evidence '${result}' is declared more than once; evidence names are unique across the definition`,
        );
      }
      own.add(result);
    }
    for (const name of own) evidence.add(name);
  });

  // A name is one kind: context.inject and the graph find a product by name
  // alone.
  const oneKind = (name: string, path: Path) =>
    fail(
      path,
      `'${name}' names both an artifact and evidence; use a different name ` +
        "for one of them (context.inject refers to a product by name alone)",
    );
  doc.stages.forEach((stage, i) => {
    const own = stage.evidence ?? [];
    own.forEach((spec, j) => {
      if (artifacts.has(spec.name)) {
        oneKind(spec.name, ["stages", i, "evidence", j, "name"]);
      }
    });
    const result = stage.work?.resultEvidence;
    if (
      result !== undefined && !own.some((e) => e.name === result) &&
      artifacts.has(result)
    ) {
      oneKind(result, ["stages", i, "work", "resultEvidence"]);
    }
  });

  // reviews: links resolve, and the chain is acyclic.
  doc.stages.forEach((stage, i) => {
    (stage.artifacts ?? []).forEach((spec, j) => {
      if (spec.reviews === undefined) return;
      const path: Path = ["stages", i, "artifacts", j, "reviews"];
      if (!artifacts.has(spec.reviews)) {
        fail(path, `reviews undeclared artifact '${spec.reviews}'`);
        return;
      }
      const chain = new Set<string>([spec.name]);
      let current: string | undefined = spec.reviews;
      while (current !== undefined) {
        if (chain.has(current)) {
          fail(
            path,
            `reviews chain from '${spec.name}' loops through '${current}'`,
          );
          return;
        }
        chain.add(current);
        current = artifacts.get(current)?.reviews;
      }
    });
  });

  // Work: injected context and cycle limits refer to declared things.
  doc.stages.forEach((stage, i) => {
    (stage.work?.context?.inject ?? []).forEach((name, j) => {
      if (!artifacts.has(name) && !evidence.has(name)) {
        fail(
          ["stages", i, "work", "context", "inject", j],
          `injects '${name}', which is not a declared artifact or evidence`,
        );
      }
    });
  });

  // CEL: every fixed product reference names a declared product of the kind
  // its map holds. Expressions that do not parse are reported by
  // CelExpressionSchema.
  for (const { path, expr } of celExpressions(doc)) {
    let ast: unknown;
    try {
      ast = parseCel(expr).ast;
    } catch {
      continue;
    }
    const seen = new Set<string>();
    for (const ref of productRefs(ast)) {
      const key = `${ref.map}:${ref.name}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const kind = productKind(ref.map);
      const declared = kind === "artifact" ? artifacts : evidence;
      if (declared.has(ref.name)) continue;
      const other = kind === "artifact" ? evidence : artifacts;
      const verb = ref.use === "read" ? "reads" : "tests for";
      fail(
        path,
        other.has(ref.name)
          ? `${verb} '${ref.name}' in ${ref.map}, but '${ref.name}' is ${
            kind === "artifact"
              ? "evidence, not an artifact"
              : "an artifact, not evidence"
          }`
          : `${verb} '${ref.name}' in ${ref.map}, which is not ${
            kind === "artifact" ? "a declared artifact" : "declared evidence"
          }`,
      );
    }
  }

  // Transitions and gates.
  const globalNames = new Set(
    (doc.globalTransitions ?? []).map((t) => t.name),
  );
  const checkGate = (gate: GateSpec, path: Path) => {
    const configPath = [...path, "config"];
    const needArtifact = (name: string, key: string) => {
      if (!artifacts.has(name)) {
        fail(
          [...configPath, key],
          `${gate.type} references undeclared artifact '${name}'`,
        );
        return undefined;
      }
      return artifacts.get(name);
    };
    switch (gate.type) {
      case "artifact-exists":
        needArtifact(gate.config.artifact, "artifact");
        return;
      case "artifact-fresh": {
        const spec = needArtifact(gate.config.artifact, "artifact");
        if (spec !== undefined && spec.reviews === undefined) {
          fail(
            [...configPath, "artifact"],
            `artifact-fresh on '${gate.config.artifact}' requires that artifact to declare reviews: <subject>`,
          );
        }
        return;
      }
      case "findings-clear":
      case "findings-open": {
        const spec = needArtifact(gate.config.artifact, "artifact");
        if (spec !== undefined && spec.kind !== "findings") {
          fail(
            [...configPath, "artifact"],
            `${gate.type} on '${gate.config.artifact}' requires that artifact to be kind: findings`,
          );
        }
        return;
      }
      case "evidence-recorded":
        if (!evidence.has(gate.config.name)) {
          fail(
            [...configPath, "name"],
            `evidence-recorded references undeclared evidence '${gate.config.name}'`,
          );
        }
        return;
      case "cooldown":
        if (
          gate.config.afterEvidence !== undefined &&
          !evidence.has(gate.config.afterEvidence)
        ) {
          fail(
            [...configPath, "afterEvidence"],
            `cooldown references undeclared evidence '${gate.config.afterEvidence}'`,
          );
        }
        if (gate.config.afterArtifact !== undefined) {
          needArtifact(gate.config.afterArtifact, "afterArtifact");
        }
        return;
      case "max-cycles":
        if (!stageIds.has(gate.config.stage)) {
          fail(
            [...configPath, "stage"],
            `max-cycles references unknown stage '${gate.config.stage}'`,
          );
        }
        return;
      case "human-approval":
      case "cel":
        return;
    }
  };
  const checkTransitions = (
    transitions: TransitionSpec[],
    base: Path,
    global: boolean,
  ) => {
    const names = new Set<string>();
    transitions.forEach((t, j) => {
      const path = [...base, j];
      if (names.has(t.name)) {
        fail([...path, "name"], `duplicate transition '${t.name}'`);
      }
      names.add(t.name);
      if (!global && globalNames.has(t.name)) {
        fail(
          [...path, "name"],
          `transition '${t.name}' has the same name as a global transition`,
        );
      }
      if (!stageIds.has(t.to)) {
        fail([...path, "to"], `targets unknown stage '${t.to}'`);
      }
      (t.gates ?? []).forEach((gate, k) =>
        checkGate(gate, [...path, "gates", k])
      );
    });
  };
  doc.stages.forEach((stage, i) => {
    const transitions = stage.transitions ?? [];
    checkTransitions(transitions, ["stages", i, "transitions"], false);
    if (stage.terminal === true && transitions.length > 0) {
      fail(
        ["stages", i, "transitions"],
        `terminal stage '${stage.id}' cannot have transitions`,
      );
    }
    if (
      stage.terminal !== true && transitions.length === 0 &&
      globalNames.size === 0
    ) {
      fail(
        ["stages", i],
        `non-terminal stage '${stage.id}' has no way out (no transitions, and no global transitions)`,
      );
    }
  });
  checkTransitions(doc.globalTransitions ?? [], ["globalTransitions"], true);
  const entryContext = {
    products: new Set([
      ...artifacts.keys(),
      ...evidence,
      ...doc.stages.flatMap((s) =>
        s.work?.resultEvidence === undefined ? [] : [s.work.resultEvidence]
      ),
    ]),
    globalTransitions: globalNames,
  };
  doc.stages.forEach((stage, i) => {
    checkEntries(
      stage,
      ["stages", i, "tracker", "entries"],
      fail,
      entryContext,
    );
    checkDuplicate(stage, ["stages", i, "tracker", "duplicate"], fail);
  });

  // `${{ }}` anywhere else would be evaluated by swamp before each method.
  findTemplates(doc, [], (path) =>
    fail(
      path,
      "contains ${{ }}, which swamp evaluates before each method runs; " +
        "declare runtime values in work.bindings as bare CEL and refer to " +
        "them as {{name}}",
    ));
}

/** The fields an artifact's payload has: its declared schema's, and for
 * `kind: findings` the built-in contract's as well. */
function productSchema(spec: ArtifactSpec): PayloadSchema | undefined {
  if (spec.kind !== "findings") return spec.schema;
  return {
    ...FINDINGS_SCHEMA,
    properties: {
      ...(spec.schema?.properties as Record<string, unknown> | undefined),
      ...(FINDINGS_SCHEMA.properties as Record<string, unknown>),
    },
  };
}

/** The products a stage declares, by name, with their payload schemas. */
function stageProducts(
  stage: StageSpec,
): Map<string, PayloadSchema | undefined> {
  const products = new Map<string, PayloadSchema | undefined>();
  for (const spec of stage.artifacts ?? []) {
    products.set(spec.name, productSchema(spec));
  }
  for (const spec of stage.evidence ?? []) products.set(spec.name, spec.schema);
  const result = stage.work?.resultEvidence;
  if (result !== undefined && !products.has(result)) {
    products.set(result, undefined);
  }
  return products;
}

/** The ids of the human-approval gates on a stage's own transitions. */
function stageApprovals(stage: StageSpec): Set<string> {
  return new Set(
    (stage.transitions ?? []).flatMap((t) =>
      (t.gates ?? []).flatMap((g) =>
        g.type === "human-approval" ? [g.config.id] : []
      )
    ),
  );
}

/**
 * A stage's duplicate mark: its gate is a human-approval gate on the stage,
 * its product one the stage declares, and its field one that product's
 * schema declares, when the schema lists fields.
 */
function checkDuplicate(
  stage: StageSpec,
  path: Path,
  fail: (path: Path, message: string) => void,
): void {
  const duplicate = stage.tracker?.duplicate;
  if (duplicate === undefined) return;
  if (!stageApprovals(stage).has(duplicate.on.approve)) {
    fail(
      [...path, "on", "approve"],
      `'${duplicate.on.approve}' is not a human-approval gate on stage ` +
        `'${stage.id}'`,
    );
  }
  const products = stageProducts(stage);
  if (!products.has(duplicate.record)) {
    fail(
      [...path, "record"],
      `'${duplicate.record}' is not a product stage '${stage.id}' declares`,
    );
    return;
  }
  const properties = products.get(duplicate.record)?.properties;
  if (typeof properties !== "object" || properties === null) return;
  if (!Object.hasOwn(properties, duplicate.field)) {
    fail(
      [...path, "field"],
      `'${duplicate.field}' is not a field of '${duplicate.record}'`,
    );
  }
}

/**
 * A stage's tracker entries: each names something the stage has, only a
 * recorded product has payload fields to match, fill, count or read a type
 * from, every event value in a summary is one its trigger has, and no two
 * entries can answer the same event.
 */
function checkEntries(
  stage: StageSpec,
  path: Path,
  fail: (path: Path, message: string) => void,
  doc: { products: Set<string>; globalTransitions: Set<string> },
): void {
  const entries = stage.tracker?.entries ?? [];
  const products = stageProducts(stage);
  const gates = stageApprovals(stage);
  const transitions = new Set([
    ...(stage.transitions ?? []).map((t) => t.name),
    ...doc.globalTransitions,
  ]);
  const work = stage.work;
  const inputs = new Set([
    ...Object.keys(work?.bindings ?? {}),
    ...Object.keys(work?.workflow?.inputs ?? work?.method?.inputs ?? {}),
  ]);
  entries.forEach((entry, j) => {
    const at: Path = [...path, j];
    const on = entry.on;
    const parsed = parseSummary(entry.summary);
    for (const error of parsed.errors) fail([...at, "summary"], error);
    const parts = parsed.parts;
    // An absent value fills as empty text, and the tracker refuses an empty
    // summary, so some fixed text must always be there.
    if (
      !parts.some((p) => p.kind === "text" && p.text.trim() !== "")
    ) {
      fail(
        [...at, "summary"],
        "a summary needs some text besides its {{...}} placeholders, " +
          "since an absent value fills as empty",
      );
    }
    const record = typeof on === "object" && "record" in on;
    const placeholders: string[] = [];
    const counts: { field: string; key?: string }[] = [];
    for (const part of parts) {
      switch (part.kind) {
        case "field":
          placeholders.push(part.name);
          break;
        case "count":
          counts.push({ field: part.field, key: part.where?.key });
          break;
        case "version":
          if (part.product === undefined && !record) {
            fail(
              [...at, "summary"],
              "{{$version}} is the recorded product's version, so only an " +
                "entry on a recorded product has it; name the product, " +
                "{{$version.<product>}}",
            );
          }
          if (part.product !== undefined && !doc.products.has(part.product)) {
            fail(
              [...at, "summary"],
              `{{$version.${part.product}}}: '${part.product}' is not a ` +
                "product the factory definition declares",
            );
          }
          break;
        case "input":
          if (on !== "dispatch") {
            fail(
              [...at, "summary"],
              `{{$input.${part.name}}}: only an entry on dispatch has ` +
                "resolved inputs",
            );
          } else if (!inputs.has(part.name)) {
            fail(
              [...at, "summary"],
              `{{$input.${part.name}}}: '${part.name}' is not a binding or ` +
                `input of stage '${stage.id}'`,
            );
          }
          break;
      }
    }
    if (!record) {
      if (typeof on === "object" && "approve" in on && !gates.has(on.approve)) {
        fail(
          [...at, "on", "approve"],
          `'${on.approve}' is not a human-approval gate on stage '${stage.id}'`,
        );
      }
      if (
        typeof on === "object" && "transition" in on &&
        !transitions.has(on.transition)
      ) {
        fail(
          [...at, "on", "transition"],
          `'${on.transition}' is not a transition out of stage ` +
            `'${stage.id}', nor a global one`,
        );
      }
      if (on === "dispatch" && work === undefined) {
        fail([...at, "on"], `stage '${stage.id}' has no work to dispatch`);
      }
      const payloadOnly: [string, boolean][] = [
        ["match", entry.match !== undefined],
        ["setsType", entry.setsType !== undefined],
        ["linkPr", entry.linkPr !== undefined],
        ["summary", placeholders.length > 0 || counts.length > 0],
      ];
      for (const [field, used] of payloadOnly) {
        if (used) {
          fail(
            [...at, field],
            `only an entry on a recorded product has payload fields ` +
              `(${
                field === "summary" ? "{{field}} and {{count ...}}" : field
              })`,
          );
        }
      }
      return;
    }
    if (!products.has(on.record)) {
      fail(
        [...at, "on", "record"],
        `'${on.record}' is not a product stage '${stage.id}' declares`,
      );
      return;
    }
    const properties = products.get(on.record)?.properties;
    if (typeof properties !== "object" || properties === null) return;
    const declared = (name: string) => Object.hasOwn(properties, name);
    const typeOf = (name: string) =>
      declared(name)
        ? (properties as Record<string, { type?: unknown }>)[name]?.type
        : undefined;
    const fields: [Path, string][] = [
      ...placeholders.map((n): [Path, string] => [[...at, "summary"], n]),
      ...counts.map((c): [Path, string] => [[...at, "summary"], c.field]),
      ...Object.keys(entry.match ?? {}).map((n): [Path, string] => [
        [...at, "match", n],
        n,
      ]),
      ...(entry.setsType === undefined
        ? []
        : [[[...at, "setsType"], entry.setsType] as [Path, string]]),
      ...(entry.linkPr === undefined
        ? []
        : [[[...at, "linkPr"], entry.linkPr] as [Path, string]]),
    ];
    for (const [where, name] of fields) {
      if (!declared(name)) {
        fail(where, `'${name}' is not a field of '${on.record}'`);
      }
    }
    // A summary is one line of text: an object or a list would be pasted in
    // as JSON.
    for (const name of placeholders) {
      const type = typeOf(name);
      if (type === "object" || type === "array") {
        fail(
          [...at, "summary"],
          `{{${name}}} is an ${type} field of '${on.record}'; a summary ` +
            "placeholder needs a string, number or boolean field",
        );
      }
    }
    // A count reads a list, and its key from the list's items where they
    // declare theirs.
    for (const count of counts) {
      if (!declared(count.field)) continue;
      const type = typeOf(count.field);
      if (type !== undefined && type !== "array") {
        fail(
          [...at, "summary"],
          `{{count ${count.field}}}: '${count.field}' is a ` +
            `${JSON.stringify(type)} field of '${on.record}'; a count needs ` +
            "an array field",
        );
        continue;
      }
      const items = (properties as Record<string, { items?: unknown }>)[
        count.field
      ]?.items as { properties?: unknown } | undefined;
      const itemProps = items?.properties;
      if (
        count.key !== undefined && typeof itemProps === "object" &&
        itemProps !== null && !Object.hasOwn(itemProps, count.key)
      ) {
        fail(
          [...at, "summary"],
          `{{count ${count.field} ${count.key}=...}}: '${count.key}' is not ` +
            `a field of the items of '${count.field}'`,
        );
      }
    }
    // A pull request is linked by its url, which is text.
    const prType = entry.linkPr !== undefined
      ? typeOf(entry.linkPr)
      : undefined;
    if (prType !== undefined && prType !== "string") {
      fail(
        [...at, "linkPr"],
        `'${entry.linkPr}' is a ${
          JSON.stringify(prType)
        } field of '${on.record}'; linkPr needs a string field holding the ` +
          "pull request url",
      );
    }
  });
  // Exclusive: two entries on one trigger must differ in cycle, or require
  // different values of one match field.
  entries.forEach((a, j) => {
    entries.slice(j + 1).forEach((b, k) => {
      if (triggerKey(a.on) !== triggerKey(b.on)) return;
      const byCycle = a.cycle !== undefined && b.cycle !== undefined &&
        a.cycle !== b.cycle;
      const byMatch = Object.entries(a.match ?? {}).some(([field, value]) =>
        Object.hasOwn(b.match ?? {}, field) && b.match![field] !== value
      );
      if (!byCycle && !byMatch) {
        fail(
          [...path, j + 1 + k],
          `entries '${a.step}' and '${b.step}' can both answer the same ` +
            "event; give them different cycles or different match values",
        );
      }
    });
  });
}

/** The positions that hold CEL: a stage's `work.bindings`, a cel gate's
 * `config.expr` and a human-approval gate's `config.when`. Matched on the
 * whole path, never on key names alone, so user data shaped like these (a
 * literal input called `bindings`, a payload schema `default`) is still
 * scanned. */
const CEL_POSITIONS: (string | "#")[][] = [
  ["stages", "#", "work", "bindings"],
  ["stages", "#", "transitions", "#", "gates", "#", "config", "expr"],
  ["globalTransitions", "#", "gates", "#", "config", "expr"],
  ["stages", "#", "transitions", "#", "gates", "#", "config", "when"],
  ["globalTransitions", "#", "gates", "#", "config", "when"],
];

function isCelPosition(path: Path): boolean {
  return CEL_POSITIONS.some((pattern) =>
    pattern.length === path.length &&
    pattern.every((segment, i) =>
      segment === "#" ? typeof path[i] === "number" : segment === path[i]
    )
  );
}

/** Every CEL expression in a factory definition, with its path: each
 * `work.bindings` entry, cel gate `expr` and human-approval `when`. */
export function celExpressions(
  doc: unknown,
): { path: Path; expr: string }[] {
  const out: { path: Path; expr: string }[] = [];
  const visit = (node: unknown, path: Path) => {
    if (isCelPosition(path)) {
      if (typeof node === "string") out.push({ path, expr: node });
      else if (node !== null && typeof node === "object") {
        for (const [key, expr] of Object.entries(node)) {
          if (typeof expr === "string") {
            out.push({ path: [...path, key], expr });
          }
        }
      }
      return;
    }
    if (Array.isArray(node)) {
      node.forEach((child, i) => visit(child, [...path, i]));
    } else if (node !== null && typeof node === "object") {
      for (const [key, child] of Object.entries(node)) {
        visit(child, [...path, key]);
      }
    }
  };
  visit(doc, []);
  return out;
}

/** Report every string containing `${{`, skipping CEL positions (which
 * report it themselves). */
function findTemplates(
  node: unknown,
  path: Path,
  report: (path: Path) => void,
): void {
  if (isCelPosition(path)) return;
  if (typeof node === "string") {
    if (node.includes(TEMPLATE_OPEN)) report(path);
    return;
  }
  if (Array.isArray(node)) {
    node.forEach((child, i) => findTemplates(child, [...path, i], report));
    return;
  }
  if (node !== null && typeof node === "object") {
    for (const [key, child] of Object.entries(node)) {
      findTemplates(child, [...path, key], report);
    }
  }
}

// ---------------------------------------------------------------------------
// Parsing and lookup
// ---------------------------------------------------------------------------

/** Format zod issues as `path: message` lines. */
export function formatIssues(error: z.ZodError): string[] {
  return error.issues.map((issue) => {
    const path = issue.path.length > 0 ? issue.path.join(".") : "(root)";
    return `${path}: ${issue.message}`;
  });
}

export type ParseResult<T> =
  | { ok: true; value: T }
  | { ok: false; errors: string[] };

export function parseDefinition(raw: unknown): ParseResult<FactoryDefinition> {
  const result = DefinitionSchema.safeParse(raw);
  return result.success
    ? { ok: true, value: result.data }
    : { ok: false, errors: formatIssues(result.error) };
}

export function findStage(
  doc: { stages: StageSpec[] },
  stageId: string,
): StageSpec | undefined {
  return doc.stages.find((s) => s.id === stageId);
}

export function initialStage(doc: { stages: StageSpec[] }): StageSpec {
  const stage = doc.stages.find((s) => s.initial === true);
  if (stage === undefined) {
    throw new Error("definition has no initial stage (it was not parsed)");
  }
  return stage;
}

export function maxCyclesFor(stage: StageSpec): number {
  return stage.maxCycles ?? DEFAULT_MAX_CYCLES;
}

export function maxDispatchesFor(stage: StageSpec): number {
  return stage.maxDispatchesPerCycle ?? DEFAULT_MAX_DISPATCHES;
}

/** Transitions available from a stage, including global transitions. */
export function transitionsFrom(
  definition: FactoryDefinition,
  stage: StageSpec,
): TransitionSpec[] {
  if (stage.terminal === true) return [];
  return [
    ...(stage.transitions ?? []),
    ...(definition.globalTransitions ?? []),
  ];
}
