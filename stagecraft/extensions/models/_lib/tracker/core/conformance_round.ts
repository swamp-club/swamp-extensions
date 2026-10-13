// Copyright (C) 2026 System Initiative, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import { z } from "npm:zod@4.3.6";
import {
  type IssueOrigin,
  type RelationType,
  type TrackerAdapter,
} from "./adapter.ts";
import { checkTrackerContract, ContractError } from "./contract_checks.ts";
import { type Answer, type Asked } from "./tracker_methods.ts";
import { type OperationName } from "./operations.ts";

// ---------------------------------------------------------------------------
// The contract's checks, replayed against a tracker reached only through its
// operate (swamp-club #3274), as the shipped conformance workflow runs them.
// Each pass runs the checks from the top with a stand-in adapter: a call
// whose answer is already known (the n-th call, the n-th answer) returns it,
// and the first call without one ends the pass, planned for the workflow to
// make. The checks are the same ones stagecraft's own adapters pass, and
// they are deterministic given the answers, so every pass agrees on the
// calls before. They end passed, or failed with the first check that did
// not hold.
// ---------------------------------------------------------------------------

/** What the checks need besides the tracker: the fixture's inputs. */
export const ConformanceInputsSchema = z.object({
  /** Two status names the tracker has; a new ticket starts in neither. */
  statusNames: z.tuple([z.string().min(1), z.string().min(1)]),
  /** A type create accepts. */
  createType: z.string().min(1),
  /** A well-formed stable id of no ticket. */
  missing: z.string().min(1),
  /** History: a status name, and two ticket types (new tickets are in
   * neither). */
  entryStatus: z.string().min(1).optional(),
  types: z.tuple([z.string().min(1), z.string().min(1)]).optional(),
  /** Assign: a user the tracker accepts. */
  user: z.string().min(1).optional(),
});
export type ConformanceInputs = z.infer<typeof ConformanceInputsSchema>;

/** What the tracker described: what the stand-in adapter offers. */
export interface ConformanceTracker {
  tracker: string;
  origin: IssueOrigin;
  capabilities: { history: boolean; assign: boolean; pullRequests: boolean };
  closesDuplicates: boolean;
}

/** One call, and its answer once made. */
const CallSchema = z.object({
  asked: z.object({
    operation: z.string(),
    request: z.record(z.string(), z.unknown()),
  }),
  answer: z.union([
    z.object({ result: z.record(z.string(), z.unknown()) }),
    z.object({
      error: z.object({
        kind: z.string(),
        reason: z.string().optional(),
        detail: z.string(),
      }),
    }),
  ]).optional(),
});

export const ConformanceStateSchema = z.object({
  calls: z.array(CallSchema),
  done: z.boolean(),
  /** Set once done: whether every check held, and if not, the first that
   * did not. */
  passed: z.boolean().optional(),
  failure: z.string().optional(),
});
export type ConformanceState = z.infer<typeof ConformanceStateSchema>;

/** Why a pass ended early: the next call is not answered yet. */
class Unanswered {
  constructor(readonly asked: Asked) {}
}

/** The stand-in adapter: answers from the known calls, in order. */
function replaying(
  tracker: ConformanceTracker,
  state: ConformanceState,
  errorOf: (
    failure: { kind: string; reason?: string; detail: string },
  ) => Error,
): { adapter: TrackerAdapter; stopped: () => Unanswered | undefined } {
  let n = 0;
  let stop: Unanswered | undefined;
  const call = <T>(
    operation: OperationName,
    request: Record<string, unknown>,
  ): Promise<T> => {
    if (stop !== undefined) return Promise.reject(stop);
    const known = state.calls[n];
    n++;
    if (known?.answer === undefined) {
      stop = new Unanswered({ operation, request });
      return Promise.reject(stop);
    }
    if ("error" in known.answer) {
      return Promise.reject(errorOf(known.answer.error));
    }
    return Promise.resolve(known.answer.result as T);
  };
  const adapter: TrackerAdapter = {
    tracker: tracker.tracker,
    origin: tracker.origin,
    ...(tracker.closesDuplicates ? { closesDuplicates: true } : {}),
    capabilities: {
      ...(tracker.capabilities.history
        ? {
          history: {
            postEntry: (issue, entry) =>
              call("post_entry", { issue, entry: { ...entry } }),
            setType: (issue, type) => call("set_type", { issue, type }),
          },
        }
        : {}),
      ...(tracker.capabilities.assign
        ? {
          assign: { assign: (issue, user) => call("assign", { issue, user }) },
        }
        : {}),
      ...(tracker.capabilities.pullRequests
        ? {
          pullRequests: {
            linkPr: (issue, url) => call("link_pr", { issue, url }),
          },
        }
        : {}),
    },
    create: (draft) => call("create", { ...draft }),
    fetchIssue: (issue) => call("fetch_issue", { issue }),
    comment: (issue, body) => call("comment", { issue, body }),
    setStatus: (issue, status) => call("set_status", { issue, status }),
    relate: (issue, type: RelationType, to) =>
      call("relate", { issue, type, to }),
    unrelate: (issue, type: RelationType, to) =>
      call("unrelate", { issue, type, to }),
  };
  return { adapter, stopped: () => stop };
}

/** The checks, with a fixture built on a ticket they file first. */
async function checks(
  adapter: TrackerAdapter,
  inputs: ConformanceInputs,
): Promise<void> {
  const issue = await adapter.create({
    title: "Conformance ticket",
    body: "Filed by the tracker conformance workflow.",
    type: inputs.createType,
  });
  const read = () => adapter.fetchIssue(issue.id);
  const count = async (kind: "comment" | "entry") =>
    ((await read()).activity ?? []).filter((a) => a.kind === kind).length;
  const { history, assign, pullRequests } = adapter.capabilities;
  if (
    history !== undefined &&
    (inputs.entryStatus === undefined || inputs.types === undefined)
  ) {
    throw new ContractError(
      "the tracker keeps history: give entryStatus and types",
    );
  }
  if (assign !== undefined && inputs.user === undefined) {
    throw new ContractError("the tracker assigns: give user");
  }
  await checkTrackerContract({
    adapter,
    issue: { id: issue.id, display: issue.display },
    createType: inputs.createType,
    missing: inputs.missing,
    statusNames: inputs.statusNames,
    commentsPosted: () => count("comment"),
    ...(history === undefined ? {} : {
      history: {
        entriesPosted: () => count("entry"),
        statusName: inputs.entryStatus as string,
        types: inputs.types as [string, string],
      },
    }),
    ...(assign === undefined ? {} : {
      assign: {
        user: inputs.user as string,
        assignees: async () => (await read()).assignees ?? [],
      },
    }),
    ...(pullRequests === undefined ? {} : { pullRequests: {} }),
  });
}

/**
 * One pass: record the last call's answer, then run the checks as far as
 * the answers go. Returns the next state, and the call to make, if any.
 */
export async function conformancePass(
  tracker: ConformanceTracker,
  inputs: ConformanceInputs,
  prior: ConformanceState,
  answer: Answer | undefined,
  errorOf: (
    failure: { kind: string; reason?: string; detail: string },
  ) => Error,
  failureOf: (
    error: unknown,
  ) => { kind: string; reason?: string; detail: string },
): Promise<{ state: ConformanceState; next?: Asked }> {
  const state: ConformanceState = structuredClone(prior);
  if (state.done) return { state };
  const last = state.calls.at(-1);
  if (last !== undefined && last.answer === undefined) {
    // The last call has not been answered: ask it again.
    if (answer === undefined) {
      return {
        state,
        next: last.asked as Asked,
      };
    }
    last.answer = "error" in answer
      ? { error: failureOf(answer.error) }
      : { result: answer.result };
  }
  const { adapter, stopped } = replaying(tracker, state, errorOf);
  try {
    await checks(adapter, inputs);
    state.done = true;
    state.passed = true;
    return { state };
  } catch (error) {
    const stop = stopped();
    if (stop !== undefined) {
      state.calls.push({ asked: stop.asked });
      return { state, next: stop.asked };
    }
    state.done = true;
    state.passed = false;
    state.failure = error instanceof Error ? error.message : String(error);
    return { state };
  }
}

export function freshConformance(): ConformanceState {
  return { calls: [], done: false };
}
