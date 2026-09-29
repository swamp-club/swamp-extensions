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

import type { Actor } from "./journal.ts";
import type { FakeSwamp } from "./fake_swamp.ts";
import { type Expected, expectedOf } from "./run_ops.ts";
import { contextStore, loadRun, type RunStore } from "./run_store.ts";
import { type Lifecycle, parseLifecycle } from "./lifecycle_schema.ts";
import type { Env, GateEvaluator } from "./run_ops.ts";
import {
  advanceMethod,
  decide,
  HOLDER_TYPE,
  recordProductMethod,
  startWorkItem,
} from "./work_item_ops.ts";
import type { ProductKind } from "./journal.ts";

// ---------------------------------------------------------------------------
// Shared fixtures for the runtime's tests. Not used by production code.
// ---------------------------------------------------------------------------

/** A clock that advances one second per call, and numbered eras. */
export function testEnv(): Env {
  let tick = 0;
  let era = 0;
  return {
    now: () => new Date(Date.UTC(2026, 8, 28, 12, 0, tick++)).toISOString(),
    newEra: () => `era-${++era}`,
  };
}

export const ALICE: Actor = { principal: "user:alice", source: "platform" };
export const NOBODY: Actor = { principal: null, source: "none" };

/** Where the stored run is now, as a caller's expectation. */
export async function expectNow(store: RunStore): Promise<Expected> {
  const run = await loadRun(store);
  if (run === null) throw new Error("the work item has not started");
  return expectedOf(run);
}

/** Gates that always pass, and gates that never do. */
export const PASS: GateEvaluator = () =>
  Promise.resolve({ pass: true, failures: [] });
export const FAIL: GateEvaluator = () =>
  Promise.resolve({ pass: false, failures: ["not yet"] });

/**
 * write -> review -> done, with a global abort. write declares a summary
 * artifact and a pr evidence; review is a workflow stage with a
 * resultEvidence and a human approval to ship; ship is also reachable by a
 * manual transition.
 */
export function smallLifecycle(): Lifecycle {
  const result = parseLifecycle({
    schemaVersion: 1,
    name: "small",
    stages: [
      {
        id: "write",
        initial: true,
        work: {
          mode: "interactive",
          systemPrompt: "Write about {{topic}}.",
          bindings: { topic: "item.key" },
        },
        artifacts: [{
          name: "summary",
          schema: {
            type: "object",
            required: ["text"],
            properties: { text: { type: "string", minLength: 1 } },
          },
        }],
        evidence: [{
          name: "pr",
          schema: {
            type: "object",
            required: ["url"],
            properties: { url: { type: "string" } },
          },
        }],
        transitions: [{
          name: "submit",
          to: "review",
          gates: [{ type: "artifact-exists", config: { artifact: "summary" } }],
        }],
      },
      {
        id: "review",
        work: {
          mode: "workflow",
          workflow: { name: "@acme/tests", inputs: { suite: "all" } },
          bindings: { text: 'artifacts["summary"].payload.text' },
          inputsSchema: {
            type: "object",
            required: ["suite", "text"],
            properties: {
              suite: { type: "string" },
              text: { type: "string", minLength: 3 },
            },
          },
          resultEvidence: "test-run",
        },
        transitions: [
          {
            name: "ship",
            to: "done",
            gates: [{
              type: "human-approval",
              config: { id: "ship-approval" },
            }],
          },
          { name: "force", to: "done", manual: true },
          { name: "again", to: "write" },
        ],
      },
      { id: "done", terminal: true },
      { id: "aborted", terminal: true },
    ],
    globalTransitions: [{ name: "abort", to: "aborted" }],
  });
  if (!result.ok) throw new Error(result.errors.join("\n"));
  return result.value;
}

/** A clock the test sets, so durations are exact; eras are numbered. */
export function settableEnv(start: string): Env & { at(iso: string): void } {
  let now = start;
  let era = 0;
  return {
    now: () => now,
    newEra: () => `era-${++era}`,
    at: (iso) => {
      now = iso;
    },
  };
}

export const BOB: Actor = { principal: "user:bob", source: "platform" };

const TEXT_SCHEMA = {
  type: "object",
  required: ["text"],
  properties: { text: { type: "string", minLength: 1 } },
};

/**
 * Every kind of human stop, as a raw holder definition:
 * draft -> review -> ship -> done, a global abandon behind an approval.
 * review: `approve` needs the `go` approval (minApprovals as given); `revise`
 * is a manual way back with no gates, which is never a stop. ship: `release`
 * needs a 60s cooldown after `pr` and the `release-ok` approval; `merged`
 * passes on a successful pr; `new-pr` is manual and opens only on a failed
 * pr. review records a `review` artifact that reviews `plan`.
 */
export function stopsDefinition(minApprovals = 1): Record<string, unknown> {
  const work = { mode: "interactive", systemPrompt: "Do the work." };
  return {
    schemaVersion: 1,
    name: "stops",
    stages: [
      {
        id: "draft",
        initial: true,
        work,
        artifacts: [{ name: "plan", schema: TEXT_SCHEMA }],
        transitions: [{
          name: "submit",
          to: "review",
          gates: [{ type: "artifact-exists", config: { artifact: "plan" } }],
        }],
      },
      {
        id: "review",
        work,
        artifacts: [{ name: "review", reviews: "plan", schema: TEXT_SCHEMA }],
        transitions: [
          {
            name: "approve",
            to: "ship",
            gates: [{
              type: "human-approval",
              config: { id: "go", minApprovals },
            }],
          },
          { name: "revise", to: "draft", manual: true },
        ],
      },
      {
        id: "ship",
        work,
        evidence: [{
          name: "pr",
          schema: {
            type: "object",
            required: ["status"],
            properties: { status: { enum: ["ok", "failed"] } },
          },
        }],
        transitions: [
          {
            name: "release",
            to: "done",
            gates: [
              {
                type: "cooldown",
                config: { afterEvidence: "pr", seconds: 60 },
              },
              { type: "human-approval", config: { id: "release-ok" } },
            ],
          },
          {
            name: "new-pr",
            to: "ship",
            manual: true,
            gates: [{
              type: "evidence-recorded",
              config: { name: "pr", requireField: { status: "failed" } },
            }],
          },
        ],
      },
      { id: "done", terminal: true },
      { id: "abandoned", terminal: true },
    ],
    globalTransitions: [{
      name: "abandon",
      to: "abandoned",
      gates: [{ type: "human-approval", config: { id: "abandon-ok" } }],
    }],
  };
}

export function stopsLifecycle(minApprovals = 1): Lifecycle {
  const result = parseLifecycle(stopsDefinition(minApprovals));
  if (!result.ok) throw new Error(result.errors.join("\n"));
  return result.value;
}

// --- a work item to publish -----------------------------------------------------

/** The work item the projection tests publish. */
export const PROJECTED_ITEM = "projected-abcdefgh";

/**
 * write -> review -> done, with projection keys: write is in_progress,
 * review is in_review, done is shipped; review's ship exit needs an
 * approval, and again goes back to write.
 */
export function projectedDefinition(): Record<string, unknown> {
  return {
    schemaVersion: 1,
    name: "projected",
    stages: [
      {
        id: "write",
        initial: true,
        projection: { status: "in_progress" },
        transitions: [{ name: "submit", to: "review" }],
      },
      {
        id: "review",
        projection: { status: "in_review" },
        transitions: [
          {
            name: "ship",
            to: "done",
            gates: [{
              type: "human-approval",
              config: { id: "ship-approval" },
            }],
          },
          { name: "again", to: "write", manual: true },
        ],
      },
      { id: "done", terminal: true, projection: { status: "shipped" } },
    ],
  };
}

/**
 * projectedDefinition with products and projection entries: write records
 * a note (noted the first cycle, note_revised after, setting the type from
 * it), review records a result (passed or failed by its status) and its
 * ship-approval is an entry; done says finished. write has no status key,
 * so its enter entry names its own.
 */
export function entriesDefinition(): Record<string, unknown> {
  const doc = projectedDefinition() as {
    stages: Record<string, unknown>[];
  };
  const [write, review, done] = doc.stages;
  delete write.projection;
  write.artifacts = [{
    name: "note",
    schema: {
      type: "object",
      required: ["text"],
      properties: { text: { type: "string" }, type: { type: "string" } },
    },
  }];
  write.projection = {
    entries: [
      {
        on: "enter",
        step: "work_started",
        emoji: "\u{1F50D}",
        summary: "Work started",
        status: "open",
      },
      {
        on: { record: "note" },
        cycle: "first",
        step: "noted",
        emoji: "\u{1F4DD}",
        summary: "Noted: {{text}}",
        status: "triaged",
        verbose: true,
        setsType: "type",
      },
      {
        on: { record: "note" },
        cycle: "later",
        step: "note_revised",
        emoji: "\u{1F504}",
        summary: "Revised: {{text}}",
      },
    ],
  };
  review.evidence = [{
    name: "result",
    schema: {
      type: "object",
      required: ["status"],
      properties: { status: { enum: ["passed", "failed"] } },
    },
  }];
  review.projection = {
    status: "in_review",
    entries: [
      { on: "enter", step: "review_started", emoji: "x", summary: "Review" },
      {
        on: { record: "result" },
        match: { status: "passed" },
        step: "passed",
        emoji: "x",
        summary: "Passed",
      },
      {
        on: { record: "result" },
        match: { status: "failed" },
        step: "failed",
        emoji: "x",
        summary: "Failed",
      },
      {
        on: { approve: "ship-approval" },
        step: "ship_approved",
        emoji: "x",
        summary: "Ship approved",
        status: "shipped",
      },
    ],
  };
  done.projection = {
    status: "shipped",
    entries: [{ on: "enter", step: "finished", emoji: "x", summary: "Done" }],
  };
  return doc;
}

/**
 * A work item started on projectedDefinition in the fake swamp, with the
 * given externalRefs, and a way to move it on as a person would.
 */
export async function projectedItem(
  swamp: FakeSwamp,
  externalRefs: Record<string, string>,
  definition: Record<string, unknown> = projectedDefinition(),
) {
  const env = testEnv();
  swamp.definitions.set("projected-holder", {
    globalArguments: definition,
    type: HOLDER_TYPE,
  });
  const ctx = () => swamp.context(PROJECTED_ITEM);
  await startWorkItem(
    ctx(),
    { lifecycle: "projected-holder", externalRefs },
    env,
  );
  const expected = async () => {
    const now = await expectNow(contextStore(ctx()));
    return {
      expectedStage: now.stage,
      expectedCycle: now.cycle,
      expectedEra: now.era,
    };
  };
  return {
    advance: async (transition: string) =>
      await advanceMethod(
        ctx(),
        { transition, confirm: true, ...(await expected()) },
        env,
      ),
    approve: async (gateId: string) =>
      await decide(ctx(), "approve", { gateId, ...(await expected()) }, env),
    decline: async (gateId: string) =>
      await decide(ctx(), "decline", { gateId, ...(await expected()) }, env),
    record: async (
      kind: ProductKind,
      name: string,
      payload: Record<string, unknown>,
    ) =>
      await recordProductMethod(
        ctx(),
        kind,
        { name, payload, ...(await expected()) },
        env,
      ),
  };
}
