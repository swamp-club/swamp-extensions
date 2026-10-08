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
import { RunRecordSchema } from "../_lib/engine/run_record.ts";
import { systemEnv } from "../_lib/engine/run_ops.ts";
import {
  ARTIFACT_SPEC,
  EVIDENCE_SPEC,
  RUN_SPEC,
} from "../_lib/engine/run_store.ts";
import {
  ActorInputs,
  advanceMethod,
  decide,
  DEFINITION_SPEC,
  dispatch,
  ExpectedInputs,
  ExternalRefsInput,
  grantOverrideMethod,
  type MethodContextLike,
  METRICS_SPEC,
  PayloadInput,
  rebuildMetrics,
  recordProductMethod,
  recordUsageMethod,
  resetMethod,
  retargetMethod,
  startWorkItem,
  status,
  summary,
} from "../_lib/engine/work_item_ops.ts";

// ---------------------------------------------------------------------------
// A work item: one instance per piece of work, named by a key (a tracker's
// claim makes one from the ticket's id). start pins the factory's
// definition; every other method works on that pinned copy, so editing the
// factory never changes a running work item. Every writing method takes the
// expectation status reports and is refused if the work item has moved since.
// ---------------------------------------------------------------------------

const payloadSchema = z.record(z.string(), z.unknown());

const productArguments = z.object({
  name: z.string().min(1).describe("The artifact or evidence name"),
  payload: PayloadInput,
  ...ExpectedInputs,
  ...ActorInputs,
});

const dispatchArguments = z.object({
  resultDir: z.string().min(1).optional().describe(
    "An existing directory for a dispatch stage's subagent result files; " +
      "a new temporary directory when omitted",
  ),
  ...ExpectedInputs,
  ...ActorInputs,
});

/**
 * The `@swamp/stagecraft/work-item` model: starts work items in a factory and
 * drives each through its stages, gates and human stops.
 */
export const model = {
  // A string literal: swamp reads the type from the source without running
  // it. work_item_test checks it equals WORK_ITEM_TYPE.
  type: "@swamp/stagecraft/work-item",
  version: "2026.10.08.1",
  // The work item has no globalArguments to upgrade; the entry moves an
  // instance's typeVersion to the version it runs at.
  upgrades: [
    {
      toVersion: "2026.10.08.1",
      description: "Pinned definitions are read upgraded (no argument change)",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  // A string literal, for the same reason as the type; the report's test
  // checks it names the report.
  reports: ["@swamp/stagecraft/work-item-summary"],
  resources: {
    [RUN_SPEC]: {
      description:
        "The work item's run record: state, products index, dispatches, " +
        "approvals, overrides and journal. The latest version holds all of it.",
      schema: RunRecordSchema,
      lifetime: "infinite" as const,
      garbageCollection: 20,
    },
    [ARTIFACT_SPEC]: {
      description:
        "Artifact payloads. Kept by age, not count: the run and approvals " +
        "refer to specific versions.",
      schema: payloadSchema,
      lifetime: "infinite" as const,
      garbageCollection: "1y",
    },
    [EVIDENCE_SPEC]: {
      description:
        "Evidence payloads. Kept by age, not count: the run and approvals " +
        "refer to specific versions.",
      schema: payloadSchema,
      lifetime: "infinite" as const,
      garbageCollection: "1y",
    },
    [DEFINITION_SPEC]: {
      description:
        "The definition pinned at start (and at a reset with repin); the run " +
        "names the version it uses.",
      schema: z.object({
        factory: z.string(),
        digest: z.string(),
        definition: payloadSchema,
      }),
      lifetime: "infinite" as const,
      // By age, and long: the run reads one exact version, so retention must
      // never collect it. Copies are small and written only at start and on
      // a repinning reset.
      garbageCollection: "10y",
    },
    [METRICS_SPEC]: {
      description:
        "Metrics derived from the run record, written after every commit: " +
        "stage times, rework, waits at human stops, dispatches, overrides " +
        "and attested token usage. Always rebuildable from the run.",
      schema: z.record(z.string(), z.unknown()),
      lifetime: "infinite" as const,
      garbageCollection: 5,
    },
  },
  methods: {
    start: {
      description:
        "Start the work item on a factory's current definition, pinning a copy",
      arguments: z.object({
        factory: z.string().min(1).describe("The factory's name"),
        title: z.string().min(1).optional().describe(
          "The work's title, its ticket's; status and the studio show it",
        ),
        externalRefs: ExternalRefsInput.optional(),
        ...ActorInputs,
      }),
      execute: (
        args: {
          factory: string;
          title?: string;
          externalRefs?: Record<string, string> | string;
          onBehalfOf?: string;
        },
        context: MethodContextLike,
      ) => startWorkItem(context, args, systemEnv),
    },
    status: {
      description:
        "Where the work item is, what its stage needs, and which exits are ready",
      kind: "read" as const,
      arguments: z.object({}),
      execute: (_args: Record<string, never>, context: MethodContextLike) =>
        status(context, systemEnv),
    },
    summary: {
      description:
        "The work item's timeline and metrics as markdown; the summary report persists it",
      kind: "read" as const,
      arguments: z.object({}),
      execute: (_args: Record<string, never>, context: MethodContextLike) =>
        summary(context, systemEnv),
    },
    rebuild_metrics: {
      description:
        "Rewrite the derived metrics record from the run when it is missing or behind",
      arguments: z.object({}),
      execute: (_args: Record<string, never>, context: MethodContextLike) =>
        rebuildMetrics(context, systemEnv),
    },
    record_artifact: {
      description:
        "Record an artifact the current stage declares; a payload that breaks its schema is kept as feedback and refused",
      arguments: productArguments,
      execute: (
        args: z.infer<typeof productArguments>,
        context: MethodContextLike,
      ) => recordProductMethod(context, "artifact", args, systemEnv),
    },
    record_evidence: {
      description:
        "Record evidence the current stage declares; a payload that breaks its schema is kept as feedback and refused",
      arguments: productArguments,
      execute: (
        args: z.infer<typeof productArguments>,
        context: MethodContextLike,
      ) => recordProductMethod(context, "evidence", args, systemEnv),
    },
    dispatch: {
      description:
        "Record that the current stage's work is starting and report its dispatch packet",
      arguments: dispatchArguments,
      execute: (
        args: z.infer<typeof dispatchArguments>,
        context: MethodContextLike,
      ) => dispatch(context, args, systemEnv),
    },
    record_usage: {
      description:
        "Attach reported token usage to a dispatch, once: totalTokens, " +
        "or inputTokens and outputTokens, or all three",
      arguments: z.object({
        dispatchId: z.coerce.number().int().positive(),
        totalTokens: z.coerce.number().int().nonnegative().optional(),
        inputTokens: z.coerce.number().int().nonnegative().optional(),
        outputTokens: z.coerce.number().int().nonnegative().optional(),
        toolUses: z.coerce.number().int().nonnegative().optional(),
        durationMs: z.coerce.number().int().nonnegative().optional(),
        model: z.string().min(1).optional(),
        ...ActorInputs,
      }),
      execute: (
        args: {
          dispatchId: number;
          totalTokens?: number;
          inputTokens?: number;
          outputTokens?: number;
          toolUses?: number;
          durationMs?: number;
          model?: string;
          onBehalfOf?: string;
        },
        context: MethodContextLike,
      ) => recordUsageMethod(context, args, systemEnv),
    },
    approve: {
      description:
        "Approve a human-approval gate on the ways out of this stage",
      arguments: z.object({
        gateId: z.string().min(1),
        note: z.string().optional(),
        ...ExpectedInputs,
        ...ActorInputs,
      }),
      execute: (
        args: {
          gateId: string;
          note?: string;
          expectedStage: string;
          expectedCycle: number;
          expectedEra: string;
          onBehalfOf?: string;
        },
        context: MethodContextLike,
      ) => decide(context, "approve", args, systemEnv),
    },
    decline: {
      description: "Decline a human-approval gate, with a note on why",
      arguments: z.object({
        gateId: z.string().min(1),
        note: z.string().optional(),
        ...ExpectedInputs,
        ...ActorInputs,
      }),
      execute: (
        args: {
          gateId: string;
          note?: string;
          expectedStage: string;
          expectedCycle: number;
          expectedEra: string;
          onBehalfOf?: string;
        },
        context: MethodContextLike,
      ) => decide(context, "decline", args, systemEnv),
    },
    grant_override: {
      description:
        "Grant one more entry into a stage (cycle) or one more dispatch in this stage and cycle (dispatch)",
      arguments: z.object({
        kind: z.enum(["cycle", "dispatch"]),
        stage: z.string().min(1).optional(),
        note: z.string().optional(),
        ...ExpectedInputs,
        ...ActorInputs,
      }),
      execute: (
        args: {
          kind: "cycle" | "dispatch";
          stage?: string;
          note?: string;
          expectedStage: string;
          expectedCycle: number;
          expectedEra: string;
          onBehalfOf?: string;
        },
        context: MethodContextLike,
      ) => grantOverrideMethod(context, args, systemEnv),
    },
    advance: {
      description:
        "Take a transition out of the current stage; a manual one needs confirm=true",
      arguments: z.object({
        transition: z.string().min(1),
        confirm: z.stringbool().optional(),
        ...ExpectedInputs,
        ...ActorInputs,
      }),
      execute: (
        args: {
          transition: string;
          confirm?: boolean;
          expectedStage: string;
          expectedCycle: number;
          expectedEra: string;
          onBehalfOf?: string;
        },
        context: MethodContextLike,
      ) => advanceMethod(context, args, systemEnv),
    },
    reset: {
      description:
        "Start the work item over in a new era (confirm=reset); repin=true adopts the factory's current definition",
      arguments: z.object({
        confirm: z.string(),
        repin: z.stringbool().optional(),
        ...ExpectedInputs,
        ...ActorInputs,
      }),
      execute: (
        args: {
          confirm: string;
          repin?: boolean;
          expectedStage: string;
          expectedCycle: number;
          expectedEra: string;
          onBehalfOf?: string;
        },
        context: MethodContextLike,
      ) => resetMethod(context, args, systemEnv),
    },
    retarget: {
      description:
        "Point the work item at other tracker tickets: replace externalRefs and journal why; no stage change",
      arguments: z.object({
        externalRefs: ExternalRefsInput,
        reason: z.string().min(1).describe("Why the work moves ticket"),
        ...ExpectedInputs,
        ...ActorInputs,
      }),
      execute: (
        args: {
          externalRefs: Record<string, string> | string;
          reason: string;
          expectedStage: string;
          expectedCycle: number;
          expectedEra: string;
          onBehalfOf?: string;
        },
        context: MethodContextLike,
      ) => retargetMethod(context, args, systemEnv),
    },
  },
};
