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

import {
  advanceMethod,
  contextStore,
  decide,
  expectNow,
  type FakeSwamp,
  type ProductKind,
  recordProductMethod,
  retargetMethod,
  startWorkItem,
  testEnv,
} from "../../engine/tracker_testing.ts";

// ---------------------------------------------------------------------------
// Shared fixtures for the tracker's tests. Not used by production code.
// ---------------------------------------------------------------------------

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
  swamp.factory("projected-factory", definition);
  const ctx = () => swamp.context(PROJECTED_ITEM);
  await startWorkItem(
    ctx(),
    { factory: "projected-factory", externalRefs },
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
    retarget: async (externalRefs: Record<string, string>, reason = "moved") =>
      await retargetMethod(
        ctx(),
        { externalRefs, reason, ...(await expected()) },
        env,
      ),
  };
}
