/**
 * The probe report: what every step and method run did. Stored as the
 * `report` resource. Every string in it may have come from the extension
 * under test, and the sandbox account's key is redacted before it is built.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";

export const NetworkEventSchema = z.object({
  decision: z.enum(["allow", "deny"]),
  host: z.string(),
  port: z.number().optional(),
  method: z.string().optional(),
  path: z.string().optional(),
  reason: z.string().optional(),
});

export const FileChangeSchema = z.object({
  path: z.string(),
  change: z.enum(["created", "modified", "deleted"]),
  area: z.enum(["home", "tmp", "repo"]),
});

export const StubCallSchema = z.object({
  invokedAs: z.string(),
  argv: z.array(z.string()),
  cwd: z.string(),
  stdinBytes: z.number(),
  stdinHead: z.string(),
});

export const SightingSchema = z.object({
  /** A canary id, or `sandbox-key`. */
  canary: z.string(),
  where: z.string(),
});

/** What every step records, whatever it ran. */
const StepObservationShape = {
  exitCode: z.number().nullable(),
  timedOut: z.boolean(),
  durationMs: z.number(),
  network: z.array(NetworkEventSchema),
  /** False when the step's network attempts could not be read. */
  networkObserved: z.boolean().default(true),
  networkGap: z.string().optional(),
  violations: z.array(z.string()),
  fileChanges: z.array(FileChangeSchema),
  sightings: z.array(SightingSchema),
};

export const MethodRunSchema = z.object({
  type: z.string(),
  method: z.string(),
  round: z.string(),
  /** Runs this one depended on, by method name, in order (referee mode). */
  before: z.array(z.string()).default([]),
  inputs: z.record(z.string(), z.unknown()),
  stubbed: z.array(z.string()),
  status: z.enum(["succeeded", "failed", "unknown"]),
  errorCode: z.string().optional(),
  errorText: z.string().optional(),
  data: z.array(z.object({ name: z.string(), bytes: z.number() })),
  stubCalls: z.array(StubCallSchema),
  ...StepObservationShape,
});
export type MethodRun = z.infer<typeof MethodRunSchema>;

export const SetupStepSchema = z.object({
  step: z.enum(["init", "info", "pull", "types", "describe"]),
  ok: z.boolean(),
  detail: z.string(),
  ...StepObservationShape,
});
export type SetupStep = z.infer<typeof SetupStepSchema>;

export const MethodSummarySchema = z.object({
  type: z.string(),
  method: z.string(),
  description: z.string(),
  /** The flat run schema (global + method arguments) the rounds came from. */
  schema: z.record(z.string(), z.unknown()),
  succeeded: z.boolean(),
  lastError: z.string().optional(),
});
export type MethodSummary = z.infer<typeof MethodSummarySchema>;

export const ReportSchema = z.object({
  target: z.string(),
  version: z.string().optional(),
  isolation: z.enum(["nono", "external"]),
  /** Checks this isolation could not make; reported as not observed. */
  notObserved: z.array(z.string()),
  startedAt: z.string(),
  finishedAt: z.string(),
  types: z.array(z.string()),
  /** Behavior grafts onto other types (`extensions`): not probed in v1. */
  skippedGrafts: z.array(z.string()),
  setup: z.array(SetupStepSchema),
  methods: z.array(MethodSummarySchema),
  runs: z.array(MethodRunSchema),
  canaries: z.array(
    z.object({ id: z.string(), locations: z.array(z.string()) }),
  ),
});
export type Report = z.infer<typeof ReportSchema>;
