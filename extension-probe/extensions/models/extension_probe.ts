/**
 * Extension probe: pull a swamp extension into a sandbox, describe its types,
 * and run every behavior method blind, recording what each method did and
 * which it could not get to run. The runtime half of an extension
 * supply-chain review; static analysis is the other half.
 *
 * @module
 */

import { FindingsSchema } from "./_lib/findings.ts";
import {
  GlobalArgsSchema,
  type ProbeArgs,
  ProbeArgsSchema,
  type ProbeContext,
  probeMethod,
  type RecordArgs,
  RecordArgsSchema,
  recordMethod,
  StartArgsSchema,
  startMethod,
} from "./_lib/methods.ts";
import { ReportSchema } from "./_lib/report.ts";
import { SessionSchema } from "./_lib/session.ts";

/** The extension probe model. */
export const model = {
  type: "@swamp/extension-probe",
  version: "2026.11.03.1",
  globalArguments: GlobalArgsSchema,
  resources: {
    report: {
      description:
        "Everything the probe observed: each setup step and method run, its inputs, outcome, network attempts, file changes, stub calls and secret sightings. The sandbox key is redacted.",
      schema: ReportSchema,
      lifetime: "30d" as const,
      garbageCollection: 20,
    },
    findings: {
      description:
        "Rule-based findings in the kind: findings contract @swamp/software-factory and @skunk-ape/stef use, so a reviewer can merge with them behind one gate.",
      schema: FindingsSchema,
      lifetime: "30d" as const,
      garbageCollection: 20,
    },
    session: {
      description:
        "Referee mode: the methods that never succeeded, the attempts made, and the next action for the driving agent.",
      schema: SessionSchema,
      lifetime: "30d" as const,
      garbageCollection: 20,
    },
  },
  methods: {
    probe: {
      description:
        "Pull an extension into a fresh sandboxed repo, describe its behavior types, and run every method blind in input rounds (empty, required, all, boundary) until each succeeds. Tool paths point at a logging stub, planted canary credentials catch misuse, and all network goes through nono's proxy. Deterministic: no model calls.",
      arguments: ProbeArgsSchema,
      execute: (args: ProbeArgs, ctx: ProbeContext) => probeMethod(args, ctx),
    },
    start: {
      description:
        "Referee mode: open a session from a probe report, listing each method that never succeeded with its last error, description and schema. Runs nothing.",
      arguments: StartArgsSchema,
      execute: (args: { session: string }, ctx: ProbeContext) =>
        startMethod(args, ctx),
    },
    record: {
      description:
        "Referee mode: run one gap method again in a fresh sandbox with the driving agent's inputs, optionally after a chain of other methods, record the outcome, and count the attempt against maxAttempts.",
      arguments: RecordArgsSchema,
      execute: (args: RecordArgs, ctx: ProbeContext) => recordMethod(args, ctx),
    },
  },
};
