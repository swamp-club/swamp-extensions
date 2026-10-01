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
  TRACKER_KINDS,
} from "../../engine/tracker_testing.ts";

// ---------------------------------------------------------------------------
// Shared fixtures for the tracker's tests. Not used by production code.
// ---------------------------------------------------------------------------

// --- a work item to publish -----------------------------------------------------

/** The work item the publish tests publish. */
export const TRACKED_ITEM = "tracked-abcdefgh";

/**
 * write -> review -> done, with tracker status keys: write is in_progress,
 * review is in_review, done is shipped; review's ship exit needs an
 * approval, and again goes back to write.
 */
export function trackedDefinition(): Record<string, unknown> {
  return {
    schemaVersion: 1,
    stages: [
      {
        id: "write",
        initial: true,
        tracker: { status: "in_progress" },
        transitions: [{ name: "submit", to: "review" }],
      },
      {
        id: "review",
        tracker: { status: "in_review" },
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
      { id: "done", terminal: true, tracker: { status: "shipped" } },
    ],
  };
}

/**
 * trackedDefinition with products and tracker entries: write records
 * a note (noted the first cycle, note_revised after, setting the type from
 * it), review records a result (passed or failed by its status) and its
 * ship-approval is an entry; done says finished. write has no status key,
 * so its enter entry names its own.
 */
export function entriesDefinition(): Record<string, unknown> {
  const doc = trackedDefinition() as {
    stages: Record<string, unknown>[];
  };
  const [write, review, done] = doc.stages;
  delete write.tracker;
  write.artifacts = [{
    name: "note",
    schema: {
      type: "object",
      required: ["text"],
      properties: { text: { type: "string" }, type: { type: "string" } },
    },
  }];
  write.tracker = {
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
  review.tracker = {
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
  done.tracker = {
    status: "shipped",
    entries: [{ on: "enter", step: "finished", emoji: "x", summary: "Done" }],
  };
  return doc;
}

/** entriesDefinition with a pull request url on the note, which both of
 * write's note entries link. */
export function linkingDefinition(): Record<string, unknown> {
  const doc = entriesDefinition() as {
    stages: {
      artifacts: { schema: { properties: Record<string, unknown> } }[];
      tracker: { entries: Record<string, unknown>[] };
    }[];
  };
  const [write] = doc.stages;
  write.artifacts[0].schema.properties.url = { type: "string" };
  for (const entry of write.tracker.entries.slice(1)) entry.linkPr = "url";
  return doc;
}

/**
 * A work item started on trackedDefinition in the fake swamp, with the
 * given externalRefs, and a way to move it on as a person would. Its factory
 * is bound to the tracker instance `tracker` ("tracker" by default, the
 * instance the tests publish from); a tracker name that is a kind is written
 * into the definition, so the fake gives the instance that kind's type.
 */
export async function trackedItem(
  swamp: FakeSwamp,
  externalRefs: Record<string, string>,
  definition: Record<string, unknown> = trackedDefinition(),
  options: { tracker?: string; kind?: string } = {},
) {
  const env = testEnv();
  const kind = options.kind;
  swamp.factory(
    "tracked-factory",
    kind !== undefined && (TRACKER_KINDS as readonly string[]).includes(kind)
      ? { ...definition, tracker: { kind } }
      : definition,
    { tracker: options.tracker ?? "tracker" },
  );
  const ctx = () => swamp.context(TRACKED_ITEM);
  await startWorkItem(
    ctx(),
    { factory: "tracked-factory", externalRefs },
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
