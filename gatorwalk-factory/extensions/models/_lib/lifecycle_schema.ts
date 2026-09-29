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
  lintPayloadSchema,
  type PayloadSchema,
  SEVERITIES,
} from "./payload_schema.ts";
import type { CelContext } from "./cel_context.ts";
import { IDENTIFIER_PATTERN, undeclaredPlaceholders } from "./template.ts";

// ---------------------------------------------------------------------------
// The lifecycle meta-schema: what a gatorwalk lifecycle (and a stage plugin)
// looks like as data. Ported from @swamp/software-factory's definition
// schema, with three changes:
//
// - Payload schemas are standard JSON Schema 2020-12 (payload_schema.ts),
//   not a home-grown dialect.
// - Runtime values are bare CEL strings in `work.bindings`, cel gates and a
//   human-approval gate's `when`, never `${{ }}`. A lifecycle is stored in a model's globalArguments, where
//   the platform would evaluate `${{ }}` when the definition is saved. Prose
//   fields refer to bindings by name with `{{name}}` placeholders
//   (template.ts).
// - Referential integrity is part of the schema, so a lifecycle with a
//   dangling reference fails when it is saved, not when a work item reaches
//   the broken stage. Graph analysis (reachability, dead ends, ambiguous
//   exits) is in graph.ts.
//
// Structure is by identity, never by name convention: a transition leaves a
// plugin through `exit`, not a specially spelt `to`; the resultEvidence of a
// stage and an evidence entry of the same name on that stage are one
// declaration (#897).
// ---------------------------------------------------------------------------

export const LIFECYCLE_SCHEMA_VERSION = 1;

/** Names for lifecycles, stages, transitions, artifacts, evidence, gates.
 * Safe as path segments and shell words on every platform (#2290). */
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

/** A JSON Schema 2020-12 document, checked when the lifecycle is saved. */
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
 * of the expression, and eject renames products on the assumption that these
 * names always mean the context's.
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

interface CelNode {
  op: string;
  args: unknown;
}

function isCelNode(value: unknown): value is CelNode {
  return value !== null && typeof value === "object" && "op" in value &&
    "args" in value;
}

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

/** A bare CEL expression, syntax-checked when the lifecycle is saved. */
export const CelExpressionSchema = z.string().min(1).superRefine(
  (expr, ctx) => {
    if (expr.includes(TEMPLATE_OPEN)) {
      ctx.addIssue({
        code: "custom",
        message: "write bare CEL without ${{ }}: the lifecycle is data, and " +
          "the platform would evaluate ${{ }} when the definition is saved",
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

export const ArtifactExistsGateSchema = z.strictObject({
  type: z.literal("artifact-exists"),
  config: z.strictObject({ artifact: NameSchema }),
});

export const ArtifactFreshGateSchema = z.strictObject({
  type: z.literal("artifact-fresh"),
  config: z.strictObject({
    artifact: NameSchema,
    recordedThisCycle: z.boolean().optional(),
  }),
});

export const FindingsClearGateSchema = z.strictObject({
  type: z.literal("findings-clear"),
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

export const EvidenceRecordedGateSchema = z.strictObject({
  type: z.literal("evidence-recorded"),
  config: z.strictObject({
    name: NameSchema,
    requireField: RequireFieldSchema.optional(),
  }),
});

export const CooldownGateSchema = z.strictObject({
  type: z.literal("cooldown"),
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
  config: z.strictObject({
    stage: NameSchema,
    limit: z.number().int().positive(),
    invert: z.boolean().optional(),
  }),
});

export const CelGateSchema = z.strictObject({
  type: z.literal("cel"),
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
});

export type EvidenceSpec = z.infer<typeof EvidenceSpecSchema>;

export const TransitionSchema = z.strictObject({
  name: NameSchema,
  /** Target stage. */
  to: NameSchema.optional(),
  /** Target contract exit; only inside a plugin. */
  exit: NameSchema.optional(),
  description: z.string().optional(),
  /** Require an explicit human "go" even when every gate passes. */
  manual: z.boolean().optional(),
  gates: z.array(GateSchema).optional(),
}).refine(
  (t) => (t.to === undefined) !== (t.exit === undefined),
  "a transition has exactly one of 'to' (a stage) or 'exit' (a plugin exit)",
);

export type TransitionSpec = z.infer<typeof TransitionSchema>;

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
});

export type StageSpec = z.infer<typeof StageSchema>;

// ---------------------------------------------------------------------------
// Plugin contract
// ---------------------------------------------------------------------------

export const ContractPortSchema = z.strictObject({
  kind: z.enum(["artifact", "evidence"]),
  name: NameSchema,
  description: z.string().optional(),
});

export type ContractPort = z.infer<typeof ContractPortSchema>;

export const ContractExitSchema = z.strictObject({
  name: NameSchema,
  description: z.string().optional(),
});

export const ContractSchema = z.strictObject({
  /** Products the plugin consumes, declared by whatever precedes it. */
  inputs: z.array(ContractPortSchema).optional(),
  /** Products the plugin's own stages declare and hand on. */
  outputs: z.array(ContractPortSchema).optional(),
  /** Named ways out; the using lifecycle wires each to a stage. */
  exits: z.array(ContractExitSchema).min(1),
  /** Schema of the values a using lifecycle passes in. */
  parameters: ObjectPayloadSchemaSchema.optional(),
});

export type ContractSpec = z.infer<typeof ContractSchema>;

// ---------------------------------------------------------------------------
// Documents
// ---------------------------------------------------------------------------

const DOCUMENT_FIELDS = {
  schemaVersion: z.literal(LIFECYCLE_SCHEMA_VERSION),
  name: NameSchema,
  description: z.string().optional(),
  stages: z.array(StageSchema).min(1),
};

/**
 * A lifecycle: the state machine a work item runs, copied into the work item
 * at start so the run is pinned to it.
 */
export const LifecycleSchema = z.strictObject({
  ...DOCUMENT_FIELDS,
  /** Escape hatches (abort, escalate) available from any non-terminal stage. */
  globalTransitions: z.array(TransitionSchema).optional(),
}).superRefine((doc, ctx) => checkDocument(doc, ctx));

export type Lifecycle = z.infer<typeof LifecycleSchema>;

/**
 * A stage plugin: a stage or group of stages with a contract. It is entered
 * at its initial stage and left only through its contract exits.
 */
export const PluginSchema = z.strictObject({
  ...DOCUMENT_FIELDS,
  contract: ContractSchema,
}).superRefine((doc, ctx) => checkDocument(doc, ctx));

export type Plugin = z.infer<typeof PluginSchema>;

type Doc = {
  stages: StageSpec[];
  globalTransitions?: TransitionSpec[];
  contract?: ContractSpec;
};

type Path = (string | number)[];

/** Cross-reference checks over a whole lifecycle or plugin. */
function checkDocument(doc: Doc, ctx: z.RefinementCtx): void {
  const fail = (path: Path, message: string) =>
    ctx.addIssue({ code: "custom", path, message });
  const plugin = doc.contract !== undefined;
  const kindName = plugin ? "plugin" : "lifecycle";

  // Stages: unique ids, one initial, terminals only in a lifecycle.
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
    if (plugin && stage.terminal === true) {
      fail(
        ["stages", i, "terminal"],
        "a plugin has no terminal stages; it is left through its contract exits",
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
  if (!plugin && !doc.stages.some((s) => s.terminal === true)) {
    fail(["stages"], "at least one stage must declare terminal: true");
  }

  // Products: names are unique per kind across the document. A stage's
  // resultEvidence and its own evidence entry of the same name are one
  // declaration.
  const artifacts = new Map<string, ArtifactSpec | null>();
  const evidence = new Set<string>();
  doc.stages.forEach((stage, i) => {
    (stage.artifacts ?? []).forEach((spec, j) => {
      if (artifacts.has(spec.name)) {
        fail(
          ["stages", i, "artifacts", j, "name"],
          `artifact '${spec.name}' is declared more than once; artifact names are unique across the ${kindName}`,
        );
      }
      artifacts.set(spec.name, spec);
    });
    const own = new Set<string>();
    (stage.evidence ?? []).forEach((spec, j) => {
      if (evidence.has(spec.name) || own.has(spec.name)) {
        fail(
          ["stages", i, "evidence", j, "name"],
          `evidence '${spec.name}' is declared more than once; evidence names are unique across the ${kindName}`,
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
    });
    const result = stage.work?.resultEvidence;
    if (result !== undefined && !own.has(result)) {
      if (evidence.has(result)) {
        fail(
          ["stages", i, "work", "resultEvidence"],
          `evidence '${result}' is declared more than once; evidence names are unique across the ${kindName}`,
        );
      }
      own.add(result);
    }
    for (const name of own) evidence.add(name);
  });

  // Plugin ports: inputs come from outside, outputs from the plugin's stages.
  const contract = doc.contract;
  if (contract !== undefined) {
    const seen = new Set<string>();
    const checkPort = (port: ContractPort, path: Path) => {
      const key = `${port.kind}:${port.name}`;
      if (seen.has(key)) {
        fail(
          path,
          `${port.kind} '${port.name}' appears more than once in the contract`,
        );
      }
      seen.add(key);
    };
    (contract.inputs ?? []).forEach((port, j) => {
      const path: Path = ["contract", "inputs", j];
      checkPort(port, path);
      const declared = port.kind === "artifact"
        ? artifacts.has(port.name)
        : evidence.has(port.name);
      if (declared) {
        fail(
          path,
          `input ${port.kind} '${port.name}' is declared by the plugin's own stages; list it as an output instead`,
        );
      }
    });
    (contract.outputs ?? []).forEach((port, j) => {
      const path: Path = ["contract", "outputs", j];
      checkPort(port, path);
      const declared = port.kind === "artifact"
        ? artifacts.has(port.name)
        : evidence.has(port.name);
      if (!declared) {
        fail(
          path,
          `output ${port.kind} '${port.name}' is not declared by any of the plugin's stages`,
        );
      }
    });
    // Inputs are referenceable; their full spec belongs to the producer.
    for (const port of contract.inputs ?? []) {
      if (port.kind === "artifact") artifacts.set(port.name, null);
      else evidence.add(port.name);
    }
  }

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
  (contract?.inputs ?? []).forEach((port, j) => {
    if (port.kind === "evidence" && artifacts.has(port.name)) {
      oneKind(port.name, ["contract", "inputs", j, "name"]);
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

  // Transitions and gates.
  const exits = new Set((contract?.exits ?? []).map((e) => e.name));
  const usedExits = new Set<string>();
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
        if (spec !== undefined && spec !== null && spec.reviews === undefined) {
          fail(
            [...configPath, "artifact"],
            `artifact-fresh on '${gate.config.artifact}' requires that artifact to declare reviews: <subject>`,
          );
        }
        return;
      }
      case "findings-clear": {
        const spec = needArtifact(gate.config.artifact, "artifact");
        if (spec !== undefined && spec !== null && spec.kind !== "findings") {
          fail(
            [...configPath, "artifact"],
            `findings-clear on '${gate.config.artifact}' requires that artifact to be kind: findings`,
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
      if (t.to !== undefined && !stageIds.has(t.to)) {
        fail([...path, "to"], `targets unknown stage '${t.to}'`);
      }
      if (t.exit !== undefined) {
        if (!plugin) {
          fail(
            [...path, "exit"],
            "'exit' is only valid inside a plugin; use 'to'",
          );
        } else if (!exits.has(t.exit)) {
          fail(
            [...path, "exit"],
            `targets '${t.exit}', which is not a contract exit`,
          );
        } else {
          usedExits.add(t.exit);
        }
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
  (contract?.exits ?? []).forEach((exit, j) => {
    if (!usedExits.has(exit.name)) {
      fail(
        ["contract", "exits", j],
        `exit '${exit.name}' is not the target of any transition`,
      );
    }
  });

  // `${{ }}` anywhere else would be evaluated by the platform on save.
  findTemplates(doc, [], (path) =>
    fail(
      path,
      "contains ${{ }}, which the platform evaluates when the definition is " +
        "saved; declare runtime values in work.bindings as bare CEL and " +
        "refer to them as {{name}}",
    ));
}

/** The positions that hold CEL: a stage's `work.bindings`, a cel gate's
 * `config.expr` and a human-approval gate's `config.when`. Matched on the whole path, never on key names alone, so
 * user data shaped like these (a literal input called `bindings`, a payload
 * schema `default`) is still scanned. */
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

export function parseLifecycle(raw: unknown): ParseResult<Lifecycle> {
  const result = LifecycleSchema.safeParse(raw);
  return result.success
    ? { ok: true, value: result.data }
    : { ok: false, errors: formatIssues(result.error) };
}

export function parsePlugin(raw: unknown): ParseResult<Plugin> {
  const result = PluginSchema.safeParse(raw);
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
    throw new Error("lifecycle has no initial stage (it was not parsed)");
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
  lifecycle: Lifecycle,
  stage: StageSpec,
): TransitionSpec[] {
  if (stage.terminal === true) return [];
  return [...(stage.transitions ?? []), ...(lifecycle.globalTransitions ?? [])];
}
