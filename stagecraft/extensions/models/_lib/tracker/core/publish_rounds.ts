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
import { CURSOR_SPEC, type MethodOutput } from "../../engine/tracker.ts";
import { moveClaim } from "./claim.ts";
import {
  type IssueDraft,
  type IssueOrigin,
  TrackerError,
  type TrackerIssue,
} from "./adapter.ts";
import {
  errorOf,
  failureOf,
  OperationFailureSchema,
  type OperationName,
  OPERATIONS,
  TrackerIssueSchema,
} from "./operations.ts";
import {
  type Answer,
  deliveries,
  type DueWrite,
  lastPerName,
  markDuplicateWith,
  performOperation,
  publishWith,
  type TrackerContext,
  type TrackerModelOptions,
  type TrackerPort,
} from "./tracker_methods.ts";

// ---------------------------------------------------------------------------
// publish and mark_duplicate in planned rounds (swamp-club #3274). Each body
// runs unchanged against a port that plans rather than acts. A write the
// ledger does not hold yet becomes a step for the tracker, and a pass stops
// where the body needs what it cannot know yet: a ticket not read yet, a
// ticket a planned step may change, the result of an assign, or a write of
// the instance's own (its cursor, the ticket index) that must follow steps
// not made yet. The steps are made on the tracker, the next round records
// their answers in the ledger, and the body plans again from the top,
// finding everything made so far. Its writes reach the tracker in the same
// order as when the body acts at once (publish_trace_test.ts).
//
// A round's state is data (RoundState), so the rounds can be the steps of a
// workflow: a method on the publishing instance plans, the tracker's
// `operate` method makes each step and writes its answer as a record, and
// the next round's method reads the answers. runInProcess makes the steps
// itself, for tests and as the reference.
// ---------------------------------------------------------------------------

const FailureSchema = OperationFailureSchema.omit({ ok: true });
type Failure = z.infer<typeof FailureSchema>;

/** A write a round asks the tracker for: a ledger-guarded one, or a new
 * ticket (create has no ledger record: DESIGN.md, "Create"). */
export type RoundWrite =
  | DueWrite
  | { op: "create"; write: { issue: ""; draft: IssueDraft } };

/** One step for the tracker, numbered within its run. */
export const TrackerStepSchema = z.object({
  n: z.number().int().nonnegative(),
  due: z.custom<RoundWrite>((v) =>
    v !== null && typeof v === "object" && "op" in v && "write" in v
  ),
  /** What the tracker is asked; null when there is nothing to ask (an
   * assign with no user to assign), answered without the tracker. */
  asked: z.object({
    operation: z.enum(
      Object.keys(OPERATIONS) as [OperationName, ...OperationName[]],
    ),
    request: z.record(z.string(), z.unknown()),
  }).nullable(),
  /** The record the tracker writes the answer under: named for the write's
   * ledger record when it has one, so a restarted run finds it, and for the
   * run otherwise. */
  answer: z.string(),
});
export type TrackerStep = z.infer<typeof TrackerStepSchema>;

/** The answer record for a step or a read. */
export function answerName(
  run: string,
  n: number,
  ledger: string | null,
): string {
  return ledger === null
    ? `answer-${run.replace(/[^A-Za-z0-9._-]/g, "_")}-${n}`
    : `answer-${ledger}`;
}

/** Where a round of a run stands. */
export const RoundStateSchema = z.object({
  /** The run this state belongs to; another run starts afresh. */
  run: z.string(),
  /** The number the next step takes. */
  next: z.number().int().nonnegative(),
  /** Tickets read, until a step may have changed them. */
  read: z.record(z.string(), TrackerIssueSchema),
  /** Reads that failed, until a step may have changed the ticket. */
  readFailed: z.record(z.string(), FailureSchema),
  /** set_status steps the tracker refused, by what they are. */
  failed: z.record(z.string(), FailureSchema),
  /** Steps made, by what they are: a write without a delivery key leaves
   * no ledger record, so the next pass learns it was made from here. */
  made: z.record(
    z.string(),
    z.object({
      wrote: z.boolean(),
      result: z.record(z.string(), z.unknown()).optional(),
    }),
  ),
  /** The steps the last pass planned, waiting for their answers. */
  steps: z.array(TrackerStepSchema),
  /** The ticket the last pass needs read, with the number of its read. */
  reading: z.object({
    id: z.string(),
    n: z.number().int(),
    answer: z.string(),
  }).optional(),
  /** The body reached its end with nothing left to make. */
  done: z.boolean(),
  /** Why the run stopped; it is not done. */
  error: z.string().optional(),
});
export type RoundState = z.infer<typeof RoundStateSchema>;

export function freshState(run: string): RoundState {
  return {
    run,
    next: 0,
    read: {},
    readFailed: {},
    failed: {},
    made: {},
    steps: [],
    done: false,
  };
}

/** Why a pass stopped before the end of the body. */
class Stop {
  constructor(readonly read?: string) {}
}

/** The tickets a step may change, so a later read of them waits for it. */
function touches(due: RoundWrite): string[] {
  return due.op === "relation"
    ? [due.write.issue, due.write.to]
    : due.op === "create"
    ? []
    : [due.write.issue];
}

/** A step is known by what it is, so a later pass can find it. */
export function stepKey(due: RoundWrite): string {
  return JSON.stringify([due.op, due.write]);
}

function failureData(tracker: string, error: unknown): Failure {
  const asTracker = error instanceof TrackerError ? error : new TrackerError(
    "upstream",
    tracker,
    error instanceof Error ? error.message : String(error),
  );
  const { ok: _ok, ...failure } = failureOf(asTracker);
  return failure;
}

/** What answered a step or a read, as the next round reads it. */
export interface Answers {
  /** A step's answer; undefined when the step was not made. */
  step(step: TrackerStep): Promise<Answer | undefined>;
  /** A read's answer; undefined when it was not made. */
  read(reading: { id: string; n: number; answer: string }): Promise<
    { issue: TrackerIssue } | { error: unknown } | undefined
  >;
}

/** What the planning side knows of the tracker without an adapter. */
export interface Described {
  capabilities: { history: boolean; assign: boolean; pullRequests: boolean };
  closesDuplicates: boolean;
  origin: IssueOrigin;
}

/** One round's outcome: the next state, and the handles it wrote. */
export interface Round {
  state: RoundState;
  handles: unknown[];
  /** In-process only: the thrown error, where the state carries its text. */
  error?: unknown;
  output?: MethodOutput;
}

/**
 * One round: record the answers to the last pass's steps, then plan the
 * next pass. `errors` keeps, in-process, the errors themselves for the
 * failures the state keeps as data, so a body that rethrows one throws the
 * same object.
 */
export async function round(
  ctx: TrackerContext,
  options: TrackerModelOptions,
  described: Described,
  body: (port: TrackerPort) => Promise<MethodOutput>,
  prior: RoundState,
  answers: Answers,
  errors: Map<string, unknown> = new Map(),
): Promise<Round> {
  const now = options.now ?? (() => new Date());
  const state: RoundState = structuredClone(prior);
  const handles: unknown[] = [];
  const { assignee } = options;
  const userOf = assignee === undefined ? undefined : () => assignee(ctx);
  const deliver = deliveries(options, now, {
    closesDuplicates: described.closesDuplicates,
  });
  const forget = (id: string) => {
    delete state.read[id];
    delete state.readFailed[id];
  };

  // The answers, in order. A step not made ends them: the steps after it
  // were not made either (each waits on the one before).
  const waiting = state.steps;
  state.steps = [];
  for (const step of waiting) {
    // A step with nothing to ask (an assign with no user to assign) failed
    // before the tracker was asked: recorded as that, never as a success,
    // even if a user can be found by now.
    const answer = step.asked === null
      ? { error: new Error("there was no user to assign") }
      : await answers.step(step);
    if (answer === undefined) break;
    const key = stepKey(step.due);
    if (step.due.op === "create") {
      // A new ticket: its answer is the ticket, made once in this run.
      if ("error" in answer) {
        state.error = answer.error instanceof Error
          ? answer.error.message
          : String(answer.error);
        delete state.reading;
        return { state, handles, error: answer.error };
      }
      state.made[key] = { wrote: true, result: answer.result };
      continue;
    }
    try {
      const done = await deliver.record(ctx, step.due, answer, userOf);
      handles.push(...done.handles);
      state.made[key] = {
        wrote: done.wrote,
        ...(done.result === undefined ? {} : { result: done.result }),
      };
    } catch (error) {
      for (const id of touches(step.due)) forget(id);
      if (step.due.op === "set_status") {
        // The body handles a failed status move itself: plan again.
        state.failed[key] = failureData(options.tracker, error);
        errors.set(key, error);
        break;
      }
      state.error = error instanceof Error ? error.message : String(error);
      // A stopped run reads nothing more either.
      delete state.reading;
      return { state, handles, error };
    }
    for (const id of touches(step.due)) forget(id);
  }
  if (state.reading !== undefined) {
    const { id } = state.reading;
    const answer = await answers.read(state.reading);
    if (answer !== undefined) {
      if ("issue" in answer) state.read[id] = answer.issue;
      else {
        state.readFailed[id] = failureData(options.tracker, answer.error);
        errors.set(`read:${id}`, answer.error);
      }
    }
    delete state.reading;
  }

  // The next pass.
  const pending = new Set<string>();
  const planned: TrackerStep[] = [];
  const fetch = (id: string): Promise<TrackerIssue> => {
    // A ticket a step this pass may change is read once the step is made.
    if (pending.has(id)) throw new Stop();
    const failure = state.readFailed[id];
    if (failure !== undefined) {
      return Promise.reject(
        errors.get(`read:${id}`) ?? errorOf(options.tracker, {
          ok: false,
          ...failure,
        }),
      );
    }
    const issue = state.read[id];
    if (issue === undefined) throw new Stop(id);
    return Promise.resolve(structuredClone(issue) as TrackerIssue);
  };
  const planning = deliveries(options, now, {
    closesDuplicates: described.closesDuplicates,
    due: (due, asked, ledger) => {
      const key = stepKey(due);
      const failure = state.failed[key];
      if (failure !== undefined) {
        throw errors.get(key) ??
          errorOf(options.tracker, { ok: false, ...failure });
      }
      const made = state.made[key];
      if (made !== undefined) return { ...made, handles: [] };
      const n = state.next++;
      planned.push({ n, due, asked, answer: answerName(state.run, n, ledger) });
      for (const id of touches(due)) pending.add(id);
      // What an assign did decides what follows: make it first.
      if (due.op === "assign") throw new Stop();
      return { handles: [], wrote: true };
    },
    fetch: (_ctx, id) => fetch(id),
  });
  // The instance's own writes follow every step before them.
  const local = <T>(write: () => Promise<T>): Promise<T> => {
    if (planned.length > 0) throw new Stop();
    return write();
  };
  const port: TrackerPort = {
    capabilities: () => ({
      ...described.capabilities,
      origin: described.origin,
    }),
    fetch,
    create: (draft) => {
      const due: RoundWrite = { op: "create", write: { issue: "", draft } };
      const made = state.made[stepKey(due)];
      if (made?.result !== undefined) {
        return Promise.resolve(
          TrackerIssueSchema.parse(made.result) as TrackerIssue,
        );
      }
      const n = state.next++;
      planned.push({
        n,
        due,
        asked: { operation: "create", request: { ...draft } },
        answer: answerName(state.run, n, null),
      });
      // What the tracker filed decides what follows: make it first.
      throw new Stop();
    },
    ...(options.beforeClaim === undefined ? {} : {
      beforeClaim: (issue: TrackerIssue) =>
        options.beforeClaim?.(ctx, issue) ?? Promise.resolve(),
    }),
    comment: (write) => planning.comment(ctx, write),
    setStatus: (write) => planning.setStatus(ctx, write),
    setType: (write) => planning.setType(ctx, write),
    linkPr: (write) => planning.linkPr(ctx, write),
    entry: (write) => planning.entry(ctx, write),
    assign: (write) => {
      if (userOf === undefined) {
        throw new Error("this tracker does not assign");
      }
      return planning.assign(ctx, write, userOf);
    },
    duplicate: (write) => planning.duplicate(ctx, write),
    writeCursor: (name, cursor) =>
      local(async () => {
        if (ctx.writeResource === undefined) {
          throw new Error("this method context has no writeResource");
        }
        const handle = await ctx.writeResource(CURSOR_SPEC, name, cursor);
        handles.push(handle);
        return handle;
      }),
    moveClaim: (move) =>
      local(async () => {
        const written = await moveClaim(ctx, move);
        handles.push(...written);
        return written;
      }),
  };
  try {
    const output = await body(port);
    state.steps = planned;
    state.done = planned.length === 0;
    return { state, handles, output };
  } catch (error) {
    state.steps = planned;
    if (error instanceof Stop) {
      if (error.read !== undefined) {
        const n = state.next++;
        state.reading = {
          id: error.read,
          n,
          answer: answerName(state.run, n, null),
        };
      }
      return { state, handles };
    }
    // The steps planned before the failure are still made; the run ends
    // with the next round, once they are recorded.
    if (planned.length === 0) {
      state.error = error instanceof Error ? error.message : String(error);
      return { state, handles, error };
    }
    return { state, handles };
  }
}

/** A tracker model's own planning facts, from its adapter. */
export function describedOf(
  options: TrackerModelOptions,
  ctx: TrackerContext,
): Described {
  const adapter = options.adapter(ctx);
  return {
    capabilities: {
      history: adapter.capabilities.history !== undefined,
      assign: adapter.capabilities.assign !== undefined &&
        options.assignee !== undefined,
      pullRequests: adapter.capabilities.pullRequests !== undefined,
    },
    closesDuplicates: adapter.closesDuplicates === true,
    origin: adapter.origin,
  };
}

/** What one round planned, as runInProcess reports it to `observe`. */
export interface Pass {
  steps: TrackerStep[];
  read?: string;
  done: boolean;
}

/**
 * A body in rounds, the steps made in-process on the tracker model's own
 * adapter: what a workflow does, without one.
 */
async function runInProcess(
  ctx: TrackerContext,
  options: TrackerModelOptions,
  body: (port: TrackerPort) => Promise<MethodOutput>,
  observe?: (pass: Pass) => void,
): Promise<MethodOutput> {
  const adapter = options.adapter(ctx);
  const described = describedOf(options, ctx);
  const errors = new Map<string, unknown>();
  const made = new Map<number, Answer>();
  const reads = new Map<number, { issue: TrackerIssue } | { error: unknown }>();
  const answers: Answers = {
    step: (step) => Promise.resolve(made.get(step.n)),
    read: (reading) => Promise.resolve(reads.get(reading.n)),
  };
  const handles: unknown[] = [];
  let state = freshState("in-process");
  // Each round makes progress (a step, a read, or a failure it then knows),
  // so this bound is only a guard against a planning bug.
  for (let rounds = 0; rounds < 10_000; rounds++) {
    const result = await round(
      ctx,
      options,
      described,
      body,
      state,
      answers,
      errors,
    );
    state = result.state;
    handles.push(...result.handles);
    if (result.error !== undefined) throw result.error;
    observe?.({
      steps: state.steps,
      ...(state.reading === undefined ? {} : { read: state.reading.id }),
      done: state.done,
    });
    if (state.done) {
      return {
        dataHandles: lastPerName([
          ...handles,
          ...result.output?.dataHandles ?? [],
        ]),
      };
    }
    // Make each step in order; one that fails ends the round, as the
    // workflow's guard skips every step after a failed one.
    for (const step of state.steps) {
      if (step.asked === null) continue;
      try {
        made.set(step.n, {
          result: await performOperation(adapter, step.asked),
        });
      } catch (error) {
        made.set(step.n, { error });
        break;
      }
    }
    if (state.reading !== undefined) {
      try {
        reads.set(state.reading.n, {
          issue: await adapter.fetchIssue(state.reading.id),
        });
      } catch (error) {
        reads.set(state.reading.n, { error });
      }
    }
  }
  throw new Error("planning did not finish");
}

/** publish, in planned rounds: the same writes as the publish method. */
export async function publishInRounds(
  ctx: TrackerContext,
  args: { workItem: string },
  options: TrackerModelOptions,
  observe?: (pass: Pass) => void,
): Promise<MethodOutput> {
  const now = options.now ?? (() => new Date());
  return await runInProcess(
    ctx,
    options,
    (port) => publishWith(ctx, args, port, options, now),
    observe,
  );
}

/** mark_duplicate, in planned rounds: the same writes as the method. */
export async function markDuplicateInRounds(
  ctx: TrackerContext,
  args: Parameters<typeof markDuplicateWith>[1],
  options: TrackerModelOptions,
  observe?: (pass: Pass) => void,
): Promise<MethodOutput> {
  return await runInProcess(
    ctx,
    options,
    (port) => markDuplicateWith(ctx, args, port, options),
    observe,
  );
}
