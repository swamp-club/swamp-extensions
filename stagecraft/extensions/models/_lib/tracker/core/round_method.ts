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
import {
  isShippedKind,
  type MethodOutput,
  type ModelDataRecord,
  recordObject,
} from "../../engine/tracker.ts";
import type { TrackerIssue } from "./adapter.ts";
import {
  ConformanceInputsSchema,
  conformancePass,
  ConformanceStateSchema,
  type ConformanceTracker,
  freshConformance,
} from "./conformance_round.ts";
import { TrackerError, type TrackerErrorKind } from "./adapter.ts";
import {
  AnswerSchema,
  errorOf,
  failureOf,
  type OperationName,
  OPERATIONS,
  TRACKER_CONTRACT_VERSION,
  TrackerDescriptionSchema,
  TrackerIssueSchema,
} from "./operations.ts";
import {
  answerName,
  type Answers,
  type Described,
  freshState,
  round,
  RoundStateSchema,
  type TrackerStep,
} from "./publish_rounds.ts";
import {
  claimWith,
  createWith,
  DESCRIPTION_NAME,
  DESCRIPTION_SPEC,
  fetchWith,
  lastPerName,
  markDuplicateWith,
  publishWith,
  type TrackerContext,
  type TrackerModelOptions,
  type TrackerPort,
} from "./tracker_methods.ts";

// ---------------------------------------------------------------------------
// The round method (swamp-club #3274): one round of publish or
// mark_duplicate as a shipped workflow runs it. It records the answers the
// tracker wrote for the last round's steps, plans the next pass, and keeps
// the state, with the steps for the workflow to make, in a `round` record.
// The workflow then calls the tracker's `operate` for each step, in order,
// and for the read, and calls this again. A tracker model has it for
// itself; the publisher has it for the external tracker it publishes to.
// ---------------------------------------------------------------------------

export const ROUND_SPEC = "round";

/** One operate call for the workflow to make: what, and where it answers. */
const OperateCallSchema = z.object({
  /** The tracker instance whose operate makes it. */
  tracker: z.string(),
  operation: z.string(),
  request: z.record(z.string(), z.unknown()),
  answer: z.string(),
  /** The answer of the call before it, which must have succeeded; "" for
   * the first. */
  prev: z.string(),
});

/**
 * The calls as the workflow iterates them. swamp runs a forEach's
 * iterations in the order of their names, not their place in the list, so
 * the workflow iterates zero-padded ids, whose names sort in list order, and
 * finds each call by its id.
 */
const CallIdsSchema = {
  /** The writes' ids, in order. */
  opIds: z.array(z.string()).default([]),
  /** The read's id, if there is one. */
  readIds: z.array(z.string()).default([]),
  /** Every call, by id. */
  byId: z.record(z.string(), OperateCallSchema).default({}),
};

/** A round's record: its state, and the calls for the workflow. */
export const RoundRecordSchema = RoundStateSchema.extend({
  /** The writes to make, in order. */
  ops: z.array(OperateCallSchema),
  /** The ticket to read, at most one. */
  reads: z.array(OperateCallSchema),
  ...CallIdsSchema,
});

/** The calls' ids for the workflow: writes first, then the read. */
export function withCallIds<
  T extends {
    ops: z.infer<typeof OperateCallSchema>[];
    reads: z.infer<typeof OperateCallSchema>[];
  },
>(record: T) {
  const id = (n: number) => String(n).padStart(4, "0");
  const all = [...record.ops, ...record.reads];
  return {
    ...record,
    opIds: record.ops.map((_, n) => id(n)),
    readIds: record.reads.map((_, n) => id(record.ops.length + n)),
    byId: Object.fromEntries(all.map((call, n) => [id(n), call])),
  };
}
export type RoundRecord = z.infer<typeof RoundRecordSchema>;

export const ROUND_KINDS = [
  "publish",
  "mark_duplicate",
  "claim",
  "create",
  "fetch_issue",
  "conformance",
] as const;

/** An optional text input a workflow passes as "" when it has none. */
const optionalText = (description: string) =>
  z.preprocess(
    (v) => v === "" || v === null ? undefined : v,
    z.string().min(1).optional(),
  ).describe(description);

export const roundArguments = z.object({
  kind: z.enum(ROUND_KINDS).describe(
    "What the run does: publish a work item, mark a duplicate, claim a " +
      "ticket, create one, or fetch one",
  ),
  run: z.string().min(1).describe(
    "The run's id (a workflow's run.id): a new run starts afresh",
  ),
  workItem: optionalText("publish: the work item's key"),
  issue: optionalText(
    "mark_duplicate: the duplicate ticket; claim, fetch_issue: the ticket",
  ),
  primary: optionalText("mark_duplicate: the ticket it duplicates"),
  factory: optionalText("claim: the factory to start a new work item under"),
  dryRun: z.boolean().optional().describe(
    "claim: report the ticket's work item, and write nothing",
  ),
  statusNames: optionalText(
    "conformance: two status names the tracker has, comma-separated; a new " +
      "ticket starts in neither",
  ),
  createType: optionalText("conformance: a type create accepts"),
  missing: optionalText("conformance: a well-formed stable id of no ticket"),
  entryStatus: optionalText(
    "conformance, for a tracker that keeps history: a status name entries " +
      "may carry",
  ),
  entryTypes: optionalText(
    "conformance, for a tracker that keeps history: two ticket types, " +
      "comma-separated; a new ticket is in neither",
  ),
  user: optionalText(
    "conformance, for a tracker that assigns: a user it accepts",
  ),
  title: optionalText("create: the title"),
  body: z.string().optional().describe("create: the body"),
  type: optionalText("create: the type"),
  check: z.boolean().optional().describe(
    "Only check that the run finished, and fail if it did not",
  ),
});
export type RoundArguments = z.infer<typeof roundArguments>;

/** Refuse a run missing an argument its kind needs. */
function checkArguments(args: RoundArguments): void {
  const required: Record<RoundArguments["kind"], (keyof RoundArguments)[]> = {
    publish: ["workItem"],
    mark_duplicate: ["issue", "primary"],
    claim: ["issue"],
    fetch_issue: ["issue"],
    create: ["title", "type"],
    conformance: ["statusNames", "createType", "missing"],
  };
  for (const name of required[args.kind]) needs(args, name);
}

/** An argument a kind needs, or an error naming it. */
function needs<T>(args: RoundArguments, name: keyof RoundArguments): T {
  const value = args[name];
  if (value === undefined) throw new Error(`${args.kind} needs ${name}`);
  return value as T;
}

/** The round record's name: one per run, which a workflow finds by its
 * run.id. */
export function roundName(args: RoundArguments): string {
  return `round-${args.kind}-${args.run.replace(/[^A-Za-z0-9._-]/g, "_")}`;
}

/** The workflow's calls for a state: its steps, then its read. */
function callsOf(
  tracker: string,
  steps: TrackerStep[],
  reading?: RoundRecord["reading"],
) {
  const ops: z.infer<typeof OperateCallSchema>[] = [];
  for (const step of steps) {
    if (step.asked === null) continue;
    ops.push({
      tracker,
      operation: step.asked.operation,
      request: step.asked.request,
      answer: step.answer,
      prev: ops.at(-1)?.answer ?? "",
    });
  }
  const reads = reading === undefined ? [] : [{
    tracker,
    operation: "fetch_issue",
    request: { issue: reading.id },
    answer: reading.answer,
    prev: ops.at(-1)?.answer ?? "",
  }];
  return { ops, reads };
}

/** An instance's definition ids, looked up once per method call. */
const definitionIds = new WeakMap<object, Map<string, string | undefined>>();

/** The definition id of an instance in this repository, if swamp says. */
async function definitionIdOf(
  ctx: TrackerContext,
  instance: string,
): Promise<string | undefined> {
  let known = definitionIds.get(ctx);
  if (known === undefined) {
    known = new Map();
    definitionIds.set(ctx, known);
  }
  if (known.has(instance)) return known.get(instance);
  const found = await ctx.definitionRepository?.findByNameGlobal(instance);
  const definition = found?.definition as
    | { id?: unknown; _id?: unknown }
    | undefined;
  const raw = definition?.id ?? definition?._id;
  const id = typeof raw === "string" && raw !== "" ? raw : undefined;
  known.set(instance, id);
  return id;
}

/** A record of another instance, by name, at its latest version. */
async function readRecord(
  ctx: TrackerContext,
  instance: string,
  spec: string,
  name: string,
): Promise<Record<string, unknown> | null> {
  if (instance === ctx.definition?.name && ctx.readResource !== undefined) {
    return await ctx.readResource(name);
  }
  // One record, by name, of this repository's instance (its definition id,
  // so another namespace's record of the same name is never read). A query
  // without a version gives the latest. Without the id, every record of the
  // spec is read and the one picked by name.
  const querying = ctx as {
    queryData?(predicate: string): Promise<ModelDataRecord[]>;
  };
  const id = await definitionIdOf(ctx, instance);
  if (querying.queryData !== undefined && id !== undefined) {
    const found = (await querying.queryData(
      `modelId == ${JSON.stringify(id)} && name == ${JSON.stringify(name)}`,
    )).sort((a, b) => b.version - a.version)[0];
    return found === undefined ? null : recordObject(found);
  }
  if (ctx.readModelData === undefined) {
    throw new Error("this method context cannot read another model's data");
  }
  const records: ModelDataRecord[] = await ctx.readModelData(instance, spec);
  const found = records.find((r) => r.name === name);
  return found === undefined ? null : recordObject(found);
}

/** The answers the tracker instance wrote, as a round reads them. */
function answersOf(
  ctx: TrackerContext,
  tracker: { instance: string; name: string },
  run: string,
): Answers {
  const read = async (answer: string) => {
    const raw = await readRecord(ctx, tracker.instance, "answer", answer);
    if (raw === null) return undefined;
    const parsed = AnswerSchema.parse(raw);
    if (parsed.ok) {
      // A result that does not meet the contract is the tracker failing, so
      // the run stops with what is wrong rather than recording it.
      const schema = OPERATIONS[parsed.operation as OperationName]?.result;
      const checked = schema?.safeParse(parsed.result);
      if (checked !== undefined && !checked.success) {
        return {
          error: new TrackerError(
            "upstream",
            tracker.name,
            `its ${parsed.operation} answer does not meet the contract: ` +
              z.prettifyError(checked.error),
          ),
        };
      }
      return { result: parsed.result };
    }
    // A failure counts only for the run that asked: an earlier run's is
    // retried.
    if (parsed.run !== run) return undefined;
    return { error: errorOf(tracker.name, parsed) };
  };
  return {
    step: (step) => read(step.answer),
    read: async (reading) => {
      const answer = await read(reading.answer);
      if (answer === undefined) return undefined;
      if (answer.error !== undefined) return { error: answer.error };
      return {
        issue: TrackerIssueSchema.parse(answer.result) as TrackerIssue,
      };
    },
  };
}

/** What a tracker instance described of itself. */
export async function readDescription(
  ctx: TrackerContext,
  instance: string,
) {
  const raw = await readRecord(
    ctx,
    instance,
    DESCRIPTION_SPEC,
    DESCRIPTION_NAME,
  );
  if (raw === null) {
    throw new Error(
      `tracker '${instance}' has not described itself: run ` +
        `swamp model method run ${instance} describe`,
    );
  }
  const parsed = TrackerDescriptionSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(
      `tracker '${instance}' described itself in a form this stagecraft ` +
        `does not read (${z.prettifyError(parsed.error)}); run swamp model ` +
        `method run ${instance} describe again`,
    );
  }
  return parsed.data;
}

/** Where a round's tracker is and what it can do, for one method call. */
export interface RoundTarget {
  options: TrackerModelOptions;
  described: Described;
  /** The instance whose operate makes the steps. */
  tracker: { instance: string; name: string };
  /** What the tracker offers, as the conformance checks see it. */
  conformance: ConformanceTracker;
}

/**
 * One round, as a method: record the answers, plan the next pass, and
 * write the state with the workflow's calls. Fails with the run's error, or,
 * with `check`, when the run has not finished.
 */
export async function runRound(
  args: RoundArguments,
  ctx: TrackerContext,
  targetOf: () => RoundTarget | Promise<RoundTarget>,
): Promise<MethodOutput> {
  if (ctx.writeResource === undefined || ctx.readResource === undefined) {
    throw new Error("this method context has no writeResource/readResource");
  }
  // Every kind's own arguments are checked before anything is read.
  checkArguments(args);
  try {
    const target = await targetOf();
    return args.kind === "conformance"
      ? await runConformance(args, ctx, target)
      : await runDeliveryRound(args, ctx, target);
  } catch (error) {
    // A round that fails stops its run: the record keeps no calls, so the
    // workflow's later jobs make none (nothing is retried within a run),
    // and the check reports why.
    if (args.check !== true) await writeStopped(ctx, args, error);
    throw error;
  }
}

/** The record of a run a round could not plan: stopped, with no calls. */
async function writeStopped(
  ctx: TrackerContext,
  args: RoundArguments,
  error: unknown,
): Promise<void> {
  const message = error instanceof Error ? error.message : String(error);
  const name = roundName(args);
  try {
    const raw = await ctx.readResource?.(name) ?? null;
    if (args.kind === "conformance") {
      const stored = raw === null
        ? null
        : ConformanceRecordSchema.safeParse(raw).data;
      await ctx.writeResource?.(ROUND_SPEC, name, {
        calls: stored?.calls ?? [],
        done: true,
        passed: false,
        failure: message,
        ...withCallIds({ ops: [], reads: [] }),
      });
      return;
    }
    const stored = raw === null
      ? undefined
      : RoundStateSchema.safeParse(raw).data;
    const { reading: _reading, ...base } = stored ?? freshState(args.run);
    await ctx.writeResource?.(ROUND_SPEC, name, {
      ...base,
      steps: [],
      done: false,
      error: message,
      ...withCallIds({ ops: [], reads: [] }),
    });
  } catch {
    // The error being thrown says more than a failed write of it would.
  }
}

/** One round of a delivery run (publish, mark_duplicate, claim, ...). */
async function runDeliveryRound(
  args: RoundArguments,
  ctx: TrackerContext,
  target: RoundTarget,
): Promise<MethodOutput> {
  if (ctx.writeResource === undefined || ctx.readResource === undefined) {
    throw new Error("this method context has no writeResource/readResource");
  }
  const name = roundName(args);
  const raw = await ctx.readResource(name);
  const stored = raw === null ? null : RoundRecordSchema.parse(raw);
  if (args.check === true) {
    if (stored?.done === true) return { dataHandles: [] };
    throw new Error(
      stored?.error ??
        `${args.kind} did not finish in this run's rounds; run it again, ` +
          "and it carries on from what was delivered",
    );
  }
  if (stored !== null && stored.error !== undefined) {
    // The run stopped: nothing more is asked, and the check reports why.
    return { dataHandles: [] };
  }
  const prior = stored === null
    ? freshState(args.run)
    : RoundStateSchema.parse(stored);
  const now = target.options.now ?? (() => new Date());
  const { options } = target;
  const body = (port: TrackerPort): Promise<MethodOutput> => {
    switch (args.kind) {
      case "publish":
        return publishWith(
          ctx,
          { workItem: needs(args, "workItem") },
          port,
          options,
          now,
        );
      case "mark_duplicate":
        return markDuplicateWith(
          ctx,
          { issue: needs(args, "issue"), primary: needs(args, "primary") },
          port,
          options,
        );
      case "claim":
        return claimWith(
          ctx,
          {
            issue: needs(args, "issue"),
            ...(args.factory === undefined ? {} : { factory: args.factory }),
            ...(args.dryRun === undefined ? {} : { dryRun: args.dryRun }),
          },
          port,
          options,
          now,
        );
      case "fetch_issue":
        return fetchWith(
          ctx,
          { issue: needs(args, "issue") },
          port,
          options,
          now,
        );
      case "create":
        return createWith(
          ctx,
          {
            title: needs(args, "title"),
            body: args.body ?? "",
            type: needs(args, "type"),
          },
          port,
          options,
          now,
        );
      case "conformance":
        throw new Error("conformance runs apart from the delivery rounds");
    }
  };
  const result = await round(
    ctx,
    target.options,
    target.described,
    body,
    prior,
    answersOf(ctx, target.tracker, args.run),
  );
  const record: RoundRecord = withCallIds({
    ...result.state,
    ...callsOf(
      target.tracker.instance,
      result.state.steps,
      result.state.reading,
    ),
  });
  const handle = await ctx.writeResource(ROUND_SPEC, name, record);
  if (result.state.error !== undefined) {
    ctx.logger.info("{warning}", {
      warning: `${args.kind} stopped: ${result.state.error}`,
    });
    return { dataHandles: lastPerName([...result.handles, handle]) };
  }
  ctx.logger.info("{summary}", {
    summary: record.done
      ? `${args.kind} is done`
      : `${record.ops.length} write(s) and ${record.reads.length} read(s) ` +
        `for ${target.tracker.instance}`,
  });
  return { dataHandles: lastPerName([...result.handles, handle]) };
}

/**
 * A round's target when the tracker is another instance (a tracker written
 * as a separate extension): what it described of itself, its operate for
 * the steps, and the publishing instance's own statuses.
 */
export async function externalTarget(
  ctx: TrackerContext,
  instance: string,
  statuses: (globalArgs: Record<string, unknown>) => Record<string, string>,
  now?: () => Date,
): Promise<RoundTarget> {
  const description = await readDescription(ctx, instance);
  if (isShippedKind(description.tracker)) {
    throw new Error(
      `tracker '${instance}' calls itself '${description.tracker}', a name ` +
        "only the tracker stagecraft ships may have",
    );
  }
  if (description.contract !== TRACKER_CONTRACT_VERSION) {
    throw new Error(
      `tracker '${instance}' implements tracker contract ` +
        `${description.contract}, and this stagecraft speaks ` +
        `${TRACKER_CONTRACT_VERSION}`,
    );
  }
  const { assignee } = description;
  return {
    options: {
      tracker: description.tracker,
      adapter: () => {
        throw new Error(
          `tracker '${instance}' is reached only through its operate method`,
        );
      },
      statuses,
      ...(assignee === undefined
        ? {}
        : { assignee: () => Promise.resolve(assignee) }),
      ...(now === undefined ? {} : { now }),
    },
    described: {
      capabilities: {
        history: description.capabilities.history,
        assign: description.capabilities.assign && assignee !== undefined,
        pullRequests: description.capabilities.pullRequests,
      },
      closesDuplicates: description.closesDuplicates,
      origin: description.origin,
    },
    tracker: { instance, name: description.tracker },
    conformance: {
      tracker: description.tracker,
      origin: description.origin,
      capabilities: description.capabilities,
      closesDuplicates: description.closesDuplicates,
    },
  };
}

/** A conformance run's record: its state, and the call for the workflow. */
export const ConformanceRecordSchema = ConformanceStateSchema.extend({
  ops: z.array(OperateCallSchema),
  reads: z.array(OperateCallSchema),
  ...CallIdsSchema,
});

/** A comma-separated pair. */
function pair(
  args: RoundArguments,
  name: "statusNames" | "entryTypes",
) {
  const value = args[name];
  if (value === undefined) return undefined;
  const parts = value.split(",").map((p) => p.trim());
  if (parts.length !== 2 || parts.some((p) => p === "")) {
    throw new Error(`${name} must be two names, comma-separated`);
  }
  return parts as [string, string];
}

/** A conformance call's answer record: the run's, numbered by call. */
function conformanceAnswer(run: string, n: number): string {
  return answerName(run, n, null).replace(/-(\d+)$/, "-c$1");
}

/**
 * A conformance round: record the last call's answer, run the contract's
 * checks as far as the answers go, and write the next call for the
 * workflow. With `check`, fail unless every check held.
 */
async function runConformance(
  args: RoundArguments,
  ctx: TrackerContext,
  target: RoundTarget,
): Promise<MethodOutput> {
  if (ctx.writeResource === undefined || ctx.readResource === undefined) {
    throw new Error("this method context has no writeResource/readResource");
  }
  const name = roundName(args);
  const raw = await ctx.readResource(name);
  const stored = raw === null ? null : ConformanceRecordSchema.parse(raw);
  if (args.check === true) {
    if (stored?.passed === true) return { dataHandles: [] };
    throw new Error(
      stored?.failure !== undefined
        ? `the tracker does not meet the contract: ${stored.failure}`
        : "conformance did not finish in this run's rounds",
    );
  }
  const inputs = ConformanceInputsSchema.parse({
    statusNames: pair(args, "statusNames"),
    createType: args.createType,
    missing: args.missing,
    ...(args.entryStatus === undefined
      ? {}
      : { entryStatus: args.entryStatus }),
    ...(args.entryTypes === undefined
      ? {}
      : { types: pair(args, "entryTypes") }),
    ...(args.user === undefined ? {} : { user: args.user }),
  });
  const prior = stored === null
    ? freshConformance()
    : ConformanceStateSchema.parse(stored);
  const last = prior.calls.length - 1;
  const answer = last < 0 || prior.calls[last].answer !== undefined
    ? undefined
    : await answersOf(ctx, target.tracker, args.run).step(
      { answer: conformanceAnswer(args.run, last) } as TrackerStep,
    );
  const pass = await conformancePass(
    target.conformance,
    inputs,
    prior,
    answer,
    (failure) =>
      errorOf(target.tracker.name, {
        ok: false,
        kind: failure.kind as TrackerErrorKind,
        ...(failure.reason === "unreachable"
          ? { reason: "unreachable" as const }
          : {}),
        detail: failure.detail,
      }),
    (error) => {
      const { ok: _ok, ...failure } = failureOf(
        error instanceof TrackerError ? error : new TrackerError(
          "upstream",
          target.tracker.name,
          error instanceof Error ? error.message : String(error),
        ),
      );
      return failure;
    },
  );
  const n = pass.state.calls.length - 1;
  const record = withCallIds({
    ...pass.state,
    ops: pass.next === undefined ? [] : [{
      tracker: target.tracker.instance,
      operation: pass.next.operation,
      request: pass.next.request,
      answer: conformanceAnswer(args.run, n),
      prev: "",
    }],
    reads: [] as z.infer<typeof OperateCallSchema>[],
  });
  const handle = await ctx.writeResource(ROUND_SPEC, name, record);
  ctx.logger.info("{summary}", {
    summary: !pass.state.done
      ? `conformance call ${n + 1}: ${pass.next?.operation}`
      : pass.state.passed
      ? `the tracker meets the contract (${pass.state.calls.length} calls)`
      : `the tracker does not meet the contract: ${pass.state.failure}`,
  });
  return { dataHandles: [handle] };
}

/** The round record's resource spec, for a model that has the method. */
export const roundResource = {
  [ROUND_SPEC]: {
    description:
      "Each run's rounds (publish, mark_duplicate, claim, create, fetch_issue, conformance): the state, and the operate calls for the workflow to make",
    schema: z.union([RoundRecordSchema, ConformanceRecordSchema]),
    lifetime: "infinite" as const,
    // One record per run, read only while the run goes on.
    garbageCollection: "7d",
  },
};
