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
import { digestOf } from "./canonical.ts";
import {
  type FactoryDefinition,
  findStage,
  formatIssues,
  NameSchema,
  type ParseResult,
} from "./definition_schema.ts";
import {
  evaluateTransitions,
  makeGateEvaluator,
  type TransitionReadiness,
} from "./gates.ts";
import type { Actor, ProductKind } from "./journal.ts";
import { computeMetrics, type Metrics } from "./metrics.ts";
import {
  advance,
  type Env,
  expectedOf,
  grantOverride,
  recordApproval,
} from "./run_ops.ts";
import type { RunRecord } from "./run_record.ts";
import {
  committingStore,
  loadRun,
  memoryStore,
  recordProduct,
  type RunStore,
  startRun,
  update,
} from "./run_store.ts";

// ---------------------------------------------------------------------------
// Saved scenarios: a work item walked through a factory definition one engine
// call per step, in process on the real engine (run_ops, run_store, gates)
// against an in-memory store, with a clock the scenario moves. The factory's
// validate method runs every scenario saved for the factory, and the studio
// will run them in the browser, so this module uses no Deno API.
//
// The clock moves one second per engine reading, plus each wait. Records and
// automatic moves are an agent's; approvals, declines, overrides, manual moves
// and evidence a person records (recordedBy: person) are a person's.
// ---------------------------------------------------------------------------

/** Where a scenario says a step must be refused, or the run must be. */
const RefusedSchema = z.strictObject({
  /** The refusal reason must contain this text; "" accepts any refusal. */
  refused: z.string(),
});

const StageExpectSchema = z.strictObject({ stage: NameSchema });

const RecordSchema = z.strictObject({
  artifact: NameSchema.optional(),
  evidence: NameSchema.optional(),
}).refine(
  (r) => (r.artifact === undefined) !== (r.evidence === undefined),
  "name exactly one of artifact or evidence",
);

const VERBS = [
  "record",
  "approve",
  "decline",
  "move",
  "override",
  "wait",
] as const;

export const ScenarioStepSchema = z.strictObject({
  record: RecordSchema.optional(),
  payload: z.record(z.string(), z.unknown()).optional(),
  approve: NameSchema.optional(),
  decline: NameSchema.optional(),
  move: NameSchema.optional(),
  /** A person's go for a manual transition. */
  manual: z.boolean().optional(),
  override: z.strictObject({
    stage: NameSchema,
    note: z.string().min(1).optional(),
  }).optional(),
  /** Seconds on the scenario's clock. */
  wait: z.number().int().nonnegative().optional(),
  expect: z.union([RefusedSchema, StageExpectSchema]).optional(),
  note: z.string().min(1).optional(),
}).superRefine((step, ctx) => {
  const verbs = VERBS.filter((v) => step[v] !== undefined);
  const issue = (message: string) => ctx.addIssue({ code: "custom", message });
  if (verbs.length > 1) {
    issue(`a step has one verb, not ${verbs.join(" and ")}`);
    return;
  }
  const verb = verbs[0];
  if (verb === undefined) {
    if (step.expect === undefined || !("stage" in step.expect)) {
      issue(
        `a step needs a verb (${VERBS.join(", ")}) or a bare expect: { stage }`,
      );
    }
  } else if (step.expect !== undefined && !("refused" in step.expect)) {
    issue(`expect: { stage } is a step of its own, not part of a ${verb}`);
  }
  if (verb === "wait" && step.expect !== undefined) {
    issue("a wait cannot be refused");
  }
  if (step.manual !== undefined && verb !== "move") {
    issue("manual belongs to a move");
  }
  if (step.payload !== undefined && verb !== "record") {
    issue("payload belongs to a record");
  }
});

export type ScenarioStep = z.infer<typeof ScenarioStepSchema>;

export const ScenarioSchema = z.strictObject({
  scenario: NameSchema,
  /** The factory's name, which is also the directory the file is saved in. */
  factory: z.string().min(1),
  description: z.string().min(1).optional(),
  externalRefs: z.record(z.string(), z.string()).optional(),
  steps: z.array(ScenarioStepSchema).min(1),
});

export type Scenario = z.infer<typeof ScenarioSchema>;

export function parseScenario(raw: unknown): ParseResult<Scenario> {
  const result = ScenarioSchema.safeParse(raw);
  return result.success
    ? { ok: true, value: result.data }
    : { ok: false, errors: formatIssues(result.error) };
}

export type FrameKind = "start" | typeof VERBS[number] | "expect";

/** The committed work item after one step. Frame n is step n of the file;
 * frame 0 is the start. */
export interface Frame {
  index: number;
  kind: FrameKind;
  label: string;
  /** The step did what the scenario said: went through, or was refused
   * when a refusal was expected. */
  asExpected: boolean;
  /** The engine refused the step. */
  refused: boolean;
  message: string;
  note?: string;
  run: RunRecord;
  /** Every transition out of the stage, from evaluateTransitions. */
  readiness: TransitionReadiness[];
  metrics: Metrics;
  /** The scenario's clock after the step. */
  at: string;
  /** For a move: the transition tried, and where it led when taken. */
  moved?: { from: string; transition: string; to?: string };
}

/** A step that did not do what the scenario said. */
export interface ScenarioFailure {
  step: number;
  label: string;
  message: string;
}

export interface ScenarioResult {
  frames: Frame[];
  passed: boolean;
  failures: ScenarioFailure[];
  /** The store the work item ran in, for reading its payloads. */
  store: RunStore;
}

export const SCENARIO_AGENT: Actor = {
  principal: "agent:scenario",
  source: "platform",
};
export const SCENARIO_PERSON: Actor = {
  principal: "user:scenario",
  source: "platform",
};

/** When a scenario's clock starts. */
export const SCENARIO_EPOCH = "2026-01-01T00:00:00.000Z";

type Outcome = { ok: true; message: string } | { ok: false; reason: string };

function judge(
  step: ScenarioStep,
  outcome: Outcome,
): { asExpected: boolean; refused: boolean; message: string } {
  const want = step.expect !== undefined && "refused" in step.expect
    ? step.expect.refused
    : undefined;
  if (outcome.ok) {
    return {
      refused: false,
      asExpected: want === undefined,
      message: want === undefined
        ? outcome.message
        : `expected a refusal${
          want === "" ? "" : ` mentioning "${want}"`
        }, but it went through: ${outcome.message}`,
    };
  }
  if (want === undefined) {
    return { refused: true, asExpected: false, message: outcome.reason };
  }
  const matched = outcome.reason.includes(want);
  return {
    refused: true,
    asExpected: matched,
    message: matched
      ? outcome.reason
      : `expected a refusal mentioning "${want}", but it was refused ` +
        `for another reason: ${outcome.reason}`,
  };
}

/** Walk a work item through `definition` as the scenario says. */
export async function runScenario(
  definition: FactoryDefinition,
  scenario: Scenario,
): Promise<ScenarioResult> {
  let ms = Date.parse(SCENARIO_EPOCH);
  let era = 0;
  const env: Env = {
    now: () => new Date(ms += 1000).toISOString(),
    newEra: () => `era-${++era}`,
  };
  // What a frame reads (readiness) leaves the clock where it is, so looking
  // at the run never changes when its cooldowns open.
  const still: Env = {
    now: () => new Date(ms).toISOString(),
    newEra: env.newEra,
  };
  const store = committingStore(memoryStore(), definition, env);
  const gates = makeGateEvaluator(definition, store, env);
  const frames: Frame[] = [];
  const failures: ScenarioFailure[] = [];

  const current = async (): Promise<RunRecord> => {
    const run = await loadRun(store);
    if (run === null) throw new Error("the scenario's work item is missing");
    return run;
  };
  const snapshot = async (
    kind: FrameKind,
    label: string,
    result: { asExpected: boolean; refused: boolean; message: string },
    extra: Pick<Frame, "note" | "moved"> = {},
  ) => {
    const run = await current();
    const index = frames.length;
    frames.push({
      index,
      kind,
      label,
      ...result,
      ...(extra.note !== undefined ? { note: extra.note } : {}),
      ...(extra.moved !== undefined ? { moved: extra.moved } : {}),
      run: structuredClone(run),
      readiness: await evaluateTransitions(run, definition, store, still),
      metrics: computeMetrics(run, definition),
      at: new Date(ms).toISOString(),
    });
    if (!result.asExpected) {
      failures.push({ step: index, label, message: result.message });
    }
  };

  const started = await startRun(
    store,
    definition,
    {
      key: `scenario-${scenario.scenario}`,
      definitionDigest: await digestOf(definition),
      externalRefs: scenario.externalRefs ?? {},
    },
    SCENARIO_AGENT,
    env,
  );
  if (!started.ok) {
    failures.push({ step: 0, label: "start", message: started.reason });
    return { frames, passed: false, failures, store };
  }
  await snapshot("start", "start", {
    asExpected: true,
    refused: false,
    message: `work item started at '${started.run.stage}'`,
  });

  for (const step of scenario.steps) {
    const note = step.note;
    if (step.record !== undefined) {
      const kind: ProductKind = step.record.artifact !== undefined
        ? "artifact"
        : "evidence";
      const name = (step.record.artifact ?? step.record.evidence) as string;
      const at = await current();
      // Evidence a person records (their feedback, say) is the person's.
      const byPerson = kind === "evidence" &&
        (findStage(definition, at.stage)?.evidence ?? []).some((spec) =>
          spec.name === name && spec.recordedBy === "person"
        );
      const result = await recordProduct(
        store,
        definition,
        expectedOf(at),
        kind,
        name,
        step.payload ?? {},
        byPerson ? SCENARIO_PERSON : SCENARIO_AGENT,
        env,
      );
      const outcome: Outcome = result.ok
        ? { ok: true, message: `recorded ${kind} '${name}' v${result.version}` }
        : {
          ok: false,
          reason: result.rejected
            ? `the ${kind} '${name}' payload does not match its schema: ${
              result.errors.join("; ")
            }`
            : result.reason,
        };
      await snapshot("record", `record ${kind} ${name}`, judge(step, outcome), {
        note,
      });
    } else if (step.approve !== undefined || step.decline !== undefined) {
      const decision = step.approve !== undefined ? "approve" : "decline";
      const gateId = (step.approve ?? step.decline) as string;
      const result = await update(store, (run) =>
        recordApproval(
          run,
          definition,
          expectedOf(run),
          { gateId, decision },
          SCENARIO_PERSON,
          env,
        ));
      await snapshot(
        decision,
        `${decision} ${gateId}`,
        judge(
          step,
          result.ok
            ? { ok: true, message: `a person ${decision}d '${gateId}'` }
            : result,
        ),
        { note },
      );
    } else if (step.move !== undefined) {
      const transition = step.move;
      const manual = step.manual === true;
      const from = (await current()).stage;
      const result = await update(store, (run) =>
        advance(
          run,
          definition,
          expectedOf(run),
          { transition, manualConfirmed: manual },
          gates,
          manual ? SCENARIO_PERSON : SCENARIO_AGENT,
          env,
        ));
      await snapshot(
        "move",
        `move ${transition}`,
        judge(
          step,
          result.ok
            ? {
              ok: true,
              message: `${from} -> ${result.value} by '${transition}'`,
            }
            : result,
        ),
        {
          note,
          moved: {
            from,
            transition,
            ...(result.ok ? { to: result.value } : {}),
          },
        },
      );
    } else if (step.override !== undefined) {
      const { stage, note: why } = step.override;
      const result = await update(store, (run) =>
        grantOverride(
          run,
          definition,
          expectedOf(run),
          { kind: "cycle", stage, ...(why !== undefined ? { note: why } : {}) },
          SCENARIO_PERSON,
          env,
        ));
      await snapshot(
        "override",
        `override ${stage}`,
        judge(
          step,
          result.ok
            ? {
              ok: true,
              message: `a person granted one more entry into '${stage}'`,
            }
            : result,
        ),
        { note },
      );
    } else if (step.wait !== undefined) {
      ms += step.wait * 1000;
      await snapshot("wait", `wait ${step.wait}s`, {
        asExpected: true,
        refused: false,
        message: `${step.wait}s pass`,
      }, { note });
    } else if (step.expect !== undefined && "stage" in step.expect) {
      const want = step.expect.stage;
      const at = (await current()).stage;
      await snapshot("expect", `expect stage ${want}`, {
        asExpected: at === want,
        refused: false,
        message: at === want
          ? `at '${at}', as expected`
          : `at '${at}', expected '${want}'`,
      }, { note });
    }
  }
  return { frames, passed: failures.length === 0, failures, store };
}
