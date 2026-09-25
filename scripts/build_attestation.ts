// Swamp, an Automation Framework Copyright (C) 2026 Elder Swamp Club, Inc.
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

/**
 * Builds the verification attestation from the verify-* run records.
 *
 * Every field is projected from what the runs already recorded or hashed out
 * of the verified commit, and the result is validated against
 * `AttestationSchema` before it is written, so the document cannot drift from
 * what `post_attestation` and CI will accept. Assembled by hand, from prose, it
 * came out slightly different every time.
 *
 * Which workflows count, which job holds the reviews, and which files are
 * pinned is repository data, read from `verification/attestation.yaml` at the
 * verified commit — this script is the same in every repository.
 *
 * What it does not do is make the attestation trustworthy. Whoever runs this
 * still chooses which runs to name and could post something else entirely; the
 * generator removes the variance, not the agent. Provenance needs the
 * attestation to be produced by a step of the run it describes, which is a
 * workflow change and deliberately not this one.
 *
 * Usage:
 *   deno run --allow-read --allow-env --allow-run=git,swamp \
 *     scripts/build_attestation.ts \
 *       --run <run-id> [--run <run-id> …] \
 *       --commit <sha> --branch <name> \
 *       [--config verification/attestation.yaml]
 *
 * The runs are identified by the `workflowName` on their own records, so the
 * ids may be given in any order. The attestation JSON goes to stdout and
 * nothing else does, so a caller can capture it directly; diagnostics go to
 * stderr.
 */

import { parseArgs } from "@std/cli/parse-args";
import { dirname, join } from "@std/path";
import { parse as parseYaml } from "@std/yaml";
import { z } from "zod";
import {
  AttestationSchema,
  type AttestationStepData,
} from "../extensions/models/_lib/schemas.ts";

/** Hex-encoded SHA-256 of `data`, matching `sha256sum` output. */
export async function computeChecksum(data: Uint8Array): Promise<string> {
  const buffer = new ArrayBuffer(data.length);
  new Uint8Array(buffer).set(data);
  const hash = await crypto.subtle.digest("SHA-256", buffer);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// -- Configuration -------------------------------------------------------------

const AttestationConfigSchema = z.object({
  /** The verification workflows, in the order the document lists steps. */
  workflows: z.array(
    z.object({
      /** How the run appears under `runs` in the document. */
      key: z.string().min(1),
      /** The `workflowName` on the run record. */
      name: z.string().min(1),
      /** The definition, relative to the repository root. */
      path: z.string().min(1),
    }).strict(),
  ).min(1),
  /** The job whose steps are agent reviews; their status is the verdict. */
  reviewJob: z.string().min(1),
  /**
   * Jobs that are how verification is set up rather than verification itself.
   * Creating a worktree, computing the diff the guards filter on, and removing
   * the worktree say nothing about whether the code is sound, and are the
   * jobs most likely to fail for reasons unrelated to the change.
   */
  machineryJobs: z.array(z.string()).default([]),
  /** Files whose hash at the verified commit the attestation pins. */
  pinned: z.array(
    z.object({
      path: z.string().min(1),
      at: z.array(z.string().min(1)).min(1),
    }).strict(),
  ),
}).strict();

export type AttestationConfig = z.infer<typeof AttestationConfigSchema>;

export const DEFAULT_CONFIG = "verification/attestation.yaml";

export function parseAttestationConfig(text: string): AttestationConfig {
  return AttestationConfigSchema.parse(parseYaml(text));
}

/** A file the attestation pins, and where its hash is looked up. */
export interface ConfigFile {
  /** Path relative to the repo root, read at the verified commit. */
  path: string;
  /** Where the hash lands under `configIntegrity`. */
  jsonPath: string[];
}

/**
 * Every file the attestation pins: the listed files, each workflow
 * definition, and the configuration itself.
 *
 * CI re-hashes the same files at the pull request head and compares
 * (`scripts/validate_attestation.ts`), so a file added to the configuration
 * is checked by CI without a second edit.
 */
export function pinnedFiles(
  config: AttestationConfig,
  configPath = DEFAULT_CONFIG,
): ConfigFile[] {
  return [
    ...config.pinned.map((p) => ({ path: p.path, jsonPath: p.at })),
    ...config.workflows.map((w) => ({
      path: w.path,
      jsonPath: ["workflows", w.name],
    })),
    { path: configPath, jsonPath: ["config", "attestation"] },
  ];
}

// -- Run record shapes (the subset this script reads) ------------------------

interface SkipReason {
  kind: "dependency" | "guarded" | "job_skipped";
  expression?: string;
}

interface StepRecord {
  name: string;
  status: string;
  error?: string;
  duration?: number;
  skipReason?: SkipReason;
}

interface JobRecord {
  name: string;
  steps: StepRecord[];
}

export interface RunRecord {
  id: string;
  workflowName: string;
  status?: string;
  startedAt?: string;
  duration?: number;
  inputs?: Record<string, unknown>;
  /** Where the run record is stored; locates the evaluated workflow. */
  path?: string;
  jobs: JobRecord[];
}

// -- Workflow definition shapes ---------------------------------------------

interface WorkflowStepDef {
  name?: string;
  task?: { modelName?: string; inputs?: { run?: string } };
}

interface WorkflowJobDef {
  name?: string;
  steps?: WorkflowStepDef[];
}

export interface WorkflowDef {
  jobs?: WorkflowJobDef[];
}

// -- Helpers ----------------------------------------------------------------

/**
 * The environment child processes inherit, minus the dynamic-linker variables.
 *
 * Deno refuses to spawn under a scoped `--allow-run` while a dynamic-loader
 * variable is set: the loader could be redirected to substitute a library for
 * the binary named in the permission, so the scope would not mean what it
 * says. Dropping them keeps the narrow permission rather than widening to an
 * unscoped `--allow-run` — the tools spawned here are git and swamp, and
 * neither needs them.
 *
 * The match is deliberately broad. This surfaced with LD_DYLD_PATH and
 * dyld_file both set by a nix toolchain — one not matching a DYLD_ prefix and
 * one lower-case — so it tests for either shape, case-insensitively, rather
 * than enumerating names Deno may extend.
 */
function childEnv(): Record<string, string> {
  const env: Record<string, string> = {};
  for (const [key, value] of Object.entries(Deno.env.toObject())) {
    if (/^LD_|DYLD/i.test(key)) continue;
    env[key] = value;
  }
  // Every captured value lands in the attestation verbatim, so no child may
  // colour its output. swamp honours this on its own since swamp-club#2414, but
  // the attestation is generated with whatever binary is on PATH — which may
  // predate that fix.
  env.NO_COLOR = "1";
  return env;
}

/** Runs a command, returning stdout on success and null on any failure. */
async function capture(
  command: string,
  args: string[],
): Promise<string | null> {
  try {
    const { code, stdout } = await new Deno.Command(command, {
      args,
      stdout: "piped",
      stderr: "piped",
      env: childEnv(),
      clearEnv: true,
    }).output();
    return code === 0 ? new TextDecoder().decode(stdout) : null;
  } catch {
    return null;
  }
}

/**
 * Reads a file as it stands at the verified commit, not as it stands in the
 * working tree. The two differ exactly when someone edits a prompt or a
 * workflow after launching verification, which is the case config integrity
 * exists to catch.
 */
async function showAtCommit(
  commit: string,
  path: string,
): Promise<Uint8Array | null> {
  try {
    const { code, stdout } = await new Deno.Command("git", {
      args: ["show", `${commit}:${path}`],
      stdout: "piped",
      stderr: "piped",
      env: childEnv(),
      clearEnv: true,
    }).output();
    return code === 0 ? stdout : null;
  } catch {
    return null;
  }
}

/**
 * The canonical identifier git gives for a revision.
 *
 * Every identifier reaching the document goes through this, so an
 * abbreviation and the full SHA it stands for collapse to one value before
 * anything compares them. The commit binding is an equality check on strings,
 * and two spellings of the same commit used to fail it: a run launched with
 * `--input commit=cfc7d0eb` and an attestation asked for the full SHA name
 * the same tree and were refused anyway.
 *
 * Resolution lives here rather than in the schema on purpose. This script
 * already shells out to git to read files at a revision, so it cannot be
 * anything but git-aware; `AttestationSchema` is a contract shared with CI and
 * swamp-club, and teaching it how one tool spells an identifier would be wrong
 * even for git, whose SHA-256 repositories use 64 characters rather than 40.
 *
 * Returns null when git cannot resolve the revision or it is not a commit,
 * which is itself worth refusing over — an identifier nothing can resolve is
 * not evidence of anything.
 */
async function resolveRevision(revision: string): Promise<string | null> {
  const resolved = await capture("git", [
    "rev-parse",
    "--verify",
    "--end-of-options",
    `${revision}^{commit}`,
  ]);
  return resolved?.trim() || null;
}

function setIn(
  target: Record<string, unknown>,
  path: string[],
  value: unknown,
): void {
  let node = target;
  for (const key of path.slice(0, -1)) {
    if (typeof node[key] !== "object" || node[key] === null) node[key] = {};
    node = node[key] as Record<string, unknown>;
  }
  node[path[path.length - 1]] = value;
}

/** One-line rendering of why a step did not run. */
export function describeSkip(reason: SkipReason | undefined): string {
  if (!reason) return "reason not recorded";
  switch (reason.kind) {
    case "guarded":
      return reason.expression
        ? `guard: ${reason.expression}`
        : "guard excluded the step";
    case "dependency":
      return "dependency condition not met";
    case "job_skipped":
      return "job was skipped";
  }
}

/**
 * The model name each step ran under, from the workflow definition at the
 * verified commit with `${{ run.id }}` substituted.
 *
 * The run record does not carry it. Reconstructing it from the definition ties
 * the name in the attestation to the file whose hash the attestation also
 * pins, so a reader who distrusts the name can check it against the same
 * commit.
 */
export function modelNames(
  workflow: WorkflowDef,
  runId: string,
): Map<string, string> {
  const names = new Map<string, string>();
  for (const job of workflow.jobs ?? []) {
    for (const step of job.steps ?? []) {
      const template = step.task?.modelName;
      if (!job.name || !step.name || !template) continue;
      names.set(
        `${job.name}:${step.name}`,
        template.replaceAll("${{ run.id }}", runId),
      );
    }
  }
  return names;
}

/**
 * The claude model each review was invoked with, read out of the review step's
 * own shell at the verified commit. Recorded so the attestation says which
 * reviewer produced the verdict, not merely that a review ran.
 */
export function reviewModels(
  workflow: WorkflowDef,
  reviewJob: string,
): Map<string, string> {
  const models = new Map<string, string>();
  const job = (workflow.jobs ?? []).find((j) => j.name === reviewJob);
  for (const step of job?.steps ?? []) {
    const match = step.task?.inputs?.run?.match(/--model\s+(\S+)/);
    if (step.name && match) models.set(step.name, match[1]);
  }
  return models;
}

// -- Attestation ------------------------------------------------------------

/** A verification workflow's run paired with its definition at the commit. */
export interface RunSource {
  key: string;
  name: string;
  run: RunRecord;
  definition: WorkflowDef;
}

/** Everything the attestation needs that does not come out of a run record. */
export interface AttestationEnvironment {
  commit: string;
  branch: string;
  configIntegrity: Record<string, unknown>;
  denoVersion: string;
  swampVersion?: string;
  os: string;
  arch: string;
  now: Date;
}

/**
 * Projects the verification runs into the attestation document.
 *
 * Pure: every field is a function of the run records, the workflow definitions
 * at the verified commit, and hashes of that commit's files. There is no
 * parameter through which a caller could assert something the runs did not
 * record — a caller who could state a step's status alongside the run that
 * produced it could state a different one.
 */
export function buildAttestation(
  sources: readonly RunSource[],
  env: AttestationEnvironment,
  config: AttestationConfig,
): Record<string, unknown> {
  const steps: AttestationStepData[] = [];

  for (const source of sources) {
    const models = modelNames(source.definition, source.run.id);
    for (const job of source.run.jobs) {
      const machinery = config.machineryJobs.includes(job.name);
      for (const step of job.steps) {
        // Machinery is left out only when it did its job. A setup that failed
        // skips everything after it, and dropping it would leave a document
        // with nothing failed in it — a green gate for a run that never
        // checked anything.
        if (machinery && step.status === "succeeded") continue;
        steps.push({
          job: job.name,
          step: step.name,
          model: models.get(`${job.name}:${step.name}`),
          status: step.status,
          durationMs: step.duration,
          // A review step's status IS the gate decision: every review
          // delegates to check_review_verdict.ts, whose exit code decides the
          // step. Reading a verdict out of the reviewer's prose would be
          // reading the input to that decision rather than the decision, and
          // the two can differ when a marker appears mid-sentence.
          verdict: job.name === config.reviewJob && step.status === "succeeded"
            ? "pass"
            : undefined,
          skipKind: step.status === "skipped"
            ? step.skipReason?.kind
            : undefined,
          skipExpression: step.status === "skipped"
            ? step.skipReason?.expression
            : undefined,
          reason: step.status === "skipped"
            ? describeSkip(step.skipReason)
            : undefined,
          errorMessage: step.status === "failed" ? step.error : undefined,
        });
      }
    }
  }

  const succeeded = steps.filter((s) => s.status === "succeeded").length;
  const skipped = steps.filter((s) => s.status === "skipped").length;
  // Anything that is neither succeeded nor skipped counts against the gate,
  // not just `failed`. A step left `unknown` by a crashed run, or still
  // `running`, is a step nobody can vouch for, and a gate that only looked for
  // `failed` would pass it.
  const failed = steps.length - succeeded - skipped;

  const skippedByKind: Record<string, number> = {};
  for (const step of steps) {
    if (step.status !== "skipped") continue;
    const kind = step.skipKind ?? "unrecorded";
    skippedByKind[kind] = (skippedByKind[kind] ?? 0) + 1;
  }
  // Only a guard is a reason to skip. A step skipped because its dependency
  // did not succeed, or because its job never started, is a check that did
  // not run on account of something failing, and a skip with no recorded
  // reason cannot be told apart from one.
  const unexplainedSkips = Object.entries(skippedByKind)
    .filter(([kind]) => kind !== "guarded")
    .reduce((sum, [, n]) => sum + n, 0);

  const reviewsSource = sources.find((s) =>
    s.run.jobs.some((j) => j.name === config.reviewJob)
  );
  const reviewConfig: Record<string, unknown> = {};
  if (reviewsSource) {
    const reviewers = reviewModels(reviewsSource.definition, config.reviewJob);
    const reviewsJob = reviewsSource.run.jobs.find((j) =>
      j.name === config.reviewJob
    );
    for (const step of reviewsJob?.steps ?? []) {
      reviewConfig[step.name] = {
        model: reviewers.get(step.name),
        ran: step.status === "succeeded",
        // Derived, where it used to be typed by hand. A bare `skipped` could
        // not tell a path guard that correctly excluded a review from a run
        // where the whole job never started; the persisted skip reason can.
        reason: step.status === "skipped"
          ? describeSkip(step.skipReason)
          : undefined,
      };
    }
  }

  const runs: Record<string, string> = {};
  for (const source of sources) runs[source.key] = source.run.id;

  // The workflows run as separate, possibly concurrent runs, so
  // verification started when the earliest of them did and finished when the
  // last one did. Summing their durations would double-count the overlap and
  // describe a wall-clock span nobody waited through.
  //
  // `completedAt` is read from the runs rather than taken as the current time.
  // This generator is not a step of the run — it is invoked afterwards, by
  // hand, and nothing bounds how long afterwards. Quoting "now" would put the
  // moment the document was *written* into a field that means the moment
  // verification *finished*, and inflate `totalDurationMs` by the gap: doing
  // exactly this by hand turned a 51-second verification into a 71-minute
  // one. CI measures its freshness window from this field, so it is also the
  // difference between a stale attestation being caught and being waved
  // through.
  const startTimes = sources
    .map((s) => s.run.startedAt)
    .filter((t): t is string => Boolean(t))
    .map((t) => new Date(t).getTime())
    .filter((t) => !Number.isNaN(t));

  const endTimes = sources
    .map((s) => {
      if (!s.run.startedAt || s.run.duration === undefined) return Number.NaN;
      return new Date(s.run.startedAt).getTime() + s.run.duration;
    })
    .filter((t) => !Number.isNaN(t));

  const startedAt = startTimes.length > 0
    ? new Date(Math.min(...startTimes))
    : undefined;
  // A run with no recorded duration cannot say when it ended, so fall back to
  // the clock rather than claim a completion the records do not support.
  const completedAt = endTimes.length > 0
    ? new Date(Math.max(...endTimes))
    : env.now;

  return {
    version: "1",
    type: "verification-attestation",
    // Stated, not proven. It says the document was projected from the run
    // records by this script rather than typed out; it does not say the
    // script was the only thing that could have produced it.
    generatedBy: "script",

    subject: { commit: env.commit, branch: env.branch },

    environment: {
      denoVersion: env.denoVersion,
      swampVersion: env.swampVersion,
      os: env.os,
      arch: env.arch,
    },

    configIntegrity: env.configIntegrity,
    reviewConfig,
    steps,

    gate: {
      // Three conditions. No step failed; every skip was a guard; and every
      // verification workflow contributed a run. Without the last, naming one
      // run produces a handful of steps, zero failures, and a green gate for
      // a verification that mostly never happened.
      allPassed: failed === 0 && unexplainedSkips === 0 &&
        sources.length === config.workflows.length,
      stepsCompleted: succeeded,
      stepsTotal: steps.length,
      stepsSkipped: skipped,
      stepsFailed: failed,
      skippedByKind,
    },

    timing: {
      startedAt: startedAt?.toISOString(),
      completedAt: completedAt.toISOString(),
      totalDurationMs: startedAt
        ? completedAt.getTime() - startedAt.getTime()
        : undefined,
    },

    runs,
  };
}

// -- I/O shell ---------------------------------------------------------------

/**
 * Matches each run record to the workflow it belongs to, by the name on the
 * record itself.
 *
 * Asking the caller which id is which would put a claim back into the
 * document that the run records can answer for themselves — and a caller who
 * labelled a verify-build run as `reviews` would produce an attestation
 * stating that reviews passed.
 */
export function matchRunsToWorkflows(
  runs: readonly RunRecord[],
  config: AttestationConfig,
): { sources: Array<{ key: string; name: string; run: RunRecord }> } | {
  error: string;
} {
  const byName = new Map<string, RunRecord[]>();
  for (const run of runs) {
    const existing = byName.get(run.workflowName) ?? [];
    existing.push(run);
    byName.set(run.workflowName, existing);
  }

  const sources: Array<{ key: string; name: string; run: RunRecord }> = [];
  const missing: string[] = [];
  for (const workflow of config.workflows) {
    const matches = byName.get(workflow.name) ?? [];
    if (matches.length === 0) {
      missing.push(workflow.name);
      continue;
    }
    if (matches.length > 1) {
      return {
        error: `more than one ${workflow.name} run was given (${
          matches.map((r) => r.id).join(", ")
        }); name exactly one run per workflow`,
      };
    }
    sources.push({ key: workflow.key, name: workflow.name, run: matches[0] });
  }

  if (missing.length > 0) {
    return {
      error: `no run was given for ${missing.join(", ")}; the attestation ` +
        "covers every verification workflow",
    };
  }

  const unknown = [...byName.keys()].filter((name) =>
    !config.workflows.some((w) => w.name === name)
  );
  if (unknown.length > 0) {
    return {
      error: `not a verification workflow: ${unknown.join(", ")}`,
    };
  }

  return { sources };
}

/** A full or abbreviated git object id: a name that cannot move. */
const OBJECT_ID = /^[0-9a-f]{7,64}$/i;

/**
 * Checks that every run examined the commit being attested to.
 *
 * This is the one property today's hand-assembly never checked and the reason
 * the conventions doc had to forbid editing an old attestation in prose: a
 * stale run record produces a perfectly well-formed document describing a
 * different tree.
 */
export function checkCommitBinding(
  sources: ReadonlyArray<{ name: string; run: RunRecord }>,
  commit: string,
): string[] {
  const errors: string[] = [];
  for (const source of sources) {
    const ran = source.run.inputs?.["commit"];
    if (typeof ran !== "string") {
      errors.push(
        `${source.name} run ${source.run.id} records no commit input, so it ` +
          "cannot be shown to have examined this commit",
      );
      continue;
    }
    if (!OBJECT_ID.test(ran)) {
      // A symbolic input (HEAD, a branch name) is resolved by whoever reads
      // it, and it names a different commit now than when the run checked
      // out its worktree. Resolving it here would certify whatever the ref
      // points at today, including commits made after verification ran.
      errors.push(
        `${source.name} run ${source.run.id} was launched with commit=${ran}, ` +
          "a symbolic ref that cannot show which commit it examined; " +
          "launch verification with the commit SHA " +
          "(--input commit=$(git rev-parse HEAD))",
      );
      continue;
    }
    if (ran !== commit) {
      // Both identifiers in full. They used to be printed `.slice(0, 8)`,
      // which rendered a full SHA and its own abbreviation as the same eight
      // characters — the message read "verified cfc7d0eb, not cfc7d0eb" and
      // gave the reader nothing to act on.
      errors.push(
        `${source.name} run ${source.run.id} was launched against ${ran}, ` +
          `but this attestation names ${commit}`,
      );
    }
  }
  return errors;
}

/** An expression, `${{ … }}`, as it appears in a committed definition. */
const EXPRESSION = /\$\{\{[\s\S]*?\}\}/;

/**
 * Where a run's evaluated workflow is kept, beside the run record itself.
 *
 * The record lives at `<swamp>/workflow-runs/<workflow-id>/workflow-run-<id>.yaml`
 * and the evaluated workflow at `<swamp>/workflows-evaluated/runs/<id>/`, so
 * the record's own path locates it without guessing which repository the run
 * was launched against.
 */
export function evaluatedWorkflowPath(run: RunRecord): string | null {
  if (!run.path) return null;
  const swampDir = dirname(dirname(dirname(run.path)));
  return join(
    swampDir,
    "workflows-evaluated",
    "runs",
    run.id,
    "evaluated-workflow.yaml",
  );
}

/**
 * Checks that a run executed the workflow the attestation pins.
 *
 * `configIntegrity` hashes each workflow as it stands at the verified commit,
 * but the commit is only an input the run was handed — nothing ties it to the
 * file swamp loaded. They part ways when `SWAMP_WORKFLOWS_DIR` is relative and
 * `--repo-dir` points at another checkout: the runs load that checkout's
 * `verification/`, and an attestation for a change to the workflows themselves
 * would pin files the runs never executed (swamp-club#2388).
 *
 * swamp keeps the definition each run executed, after evaluation, so the
 * committed definition is compared to it as a template: every expression in a
 * committed string matches whatever it evaluated to, and everything else must
 * match exactly. Evaluation also fills defaults the file leaves out, so a field
 * present only in the evaluated workflow is accepted when it is empty, zero or
 * false, and refused otherwise.
 *
 * Returns one line per difference, each naming where in the document it is.
 */
export function checkWorkflowProvenance(
  committed: unknown,
  evaluated: unknown,
  at = "",
): string[] {
  if (typeof committed === "string" && EXPRESSION.test(committed)) {
    const literals = committed.split(new RegExp(EXPRESSION, "g"));
    if (literals.every((l) => l.trim() === "")) return [];
    const pattern = new RegExp(
      `^${
        literals.map((l) => l.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join(
          "[\\s\\S]*",
        )
      }$`,
    );
    return typeof evaluated === "string" && pattern.test(evaluated)
      ? []
      : [`${at || "(root)"} differs from the committed definition`];
  }

  if (Array.isArray(committed)) {
    if (!Array.isArray(evaluated) || evaluated.length !== committed.length) {
      return [
        `${at || "(root)"} has ${
          Array.isArray(evaluated) ? evaluated.length : "no"
        } entries where the committed definition has ${committed.length}`,
      ];
    }
    return committed.flatMap((value, i) =>
      checkWorkflowProvenance(value, evaluated[i], `${at}[${i}]`)
    );
  }

  if (committed !== null && typeof committed === "object") {
    if (
      evaluated === null || typeof evaluated !== "object" ||
      Array.isArray(evaluated)
    ) {
      return [`${at || "(root)"} is not a mapping in the evaluated workflow`];
    }
    const c = committed as Record<string, unknown>;
    const e = evaluated as Record<string, unknown>;
    const errors: string[] = [];
    for (const key of Object.keys(c)) {
      const path = at ? `${at}.${key}` : key;
      if (!(key in e)) {
        errors.push(`${path} is missing from the evaluated workflow`);
      } else errors.push(...checkWorkflowProvenance(c[key], e[key], path));
    }
    for (const key of Object.keys(e)) {
      if (key in c || isEmptyDefault(e[key])) continue;
      errors.push(
        `${
          at ? `${at}.${key}` : key
        } is in the evaluated workflow but not the committed definition`,
      );
    }
    return errors;
  }

  return committed === evaluated
    ? []
    : [`${at || "(root)"} differs from the committed definition`];
}

function isEmptyDefault(value: unknown): boolean {
  if (Array.isArray(value)) return value.length === 0;
  if (value !== null && typeof value === "object") {
    return Object.keys(value).length === 0;
  }
  return value === false || value === 0 || value === null ||
    value === undefined || value === "";
}

async function fetchRun(id: string): Promise<RunRecord | null> {
  const record = await capture("swamp", [
    "workflow",
    "history",
    "get",
    id,
    "--json",
  ]);
  if (!record) return null;
  try {
    return JSON.parse(record) as RunRecord;
  } catch {
    return null;
  }
}

async function main(): Promise<number> {
  const args = parseArgs(Deno.args, {
    string: ["run", "commit", "branch", "config"],
    collect: ["run"],
    default: { config: DEFAULT_CONFIG },
  });

  const runIds = (args.run ?? []) as string[];
  const requestedCommit = args.commit;
  const branch = args.branch;
  if (runIds.length === 0 || !requestedCommit || !branch) {
    console.error(
      "usage: build_attestation.ts --run <id> --run <id> " +
        "--commit <sha> --branch <name>",
    );
    return 2;
  }

  // Resolved once, here, and used for every comparison and every field below.
  // An abbreviation on the command line is fine; an abbreviation in the
  // document is not, because CI compares it to the PR head as a string with no
  // repository to resolve against.
  const commit = await resolveRevision(requestedCommit);
  if (!commit) {
    console.error(
      `git cannot resolve ${requestedCommit} to a commit in this repository`,
    );
    return 1;
  }

  // Read at the verified commit, like everything it names: the workflows and
  // pinned files are the ones that commit declares.
  const configPath = args.config as string;
  const rawConfig = await showAtCommit(commit, configPath);
  if (!rawConfig) {
    console.error(`could not read ${configPath} at ${commit}`);
    return 1;
  }
  let config: AttestationConfig;
  try {
    config = parseAttestationConfig(new TextDecoder().decode(rawConfig));
  } catch (err) {
    console.error(
      `${configPath} is not a valid attestation configuration: ${err}`,
    );
    return 1;
  }

  const runs: RunRecord[] = [];
  for (const id of runIds) {
    const run = await fetchRun(id);
    if (!run) {
      console.error(
        `could not read run ${id}; check the id with ` +
          "`SWAMP_WORKFLOWS_DIR=verification swamp workflow history`",
      );
      return 1;
    }
    runs.push(run);
  }

  const matched = matchRunsToWorkflows(runs, config);
  if ("error" in matched) {
    console.error(matched.error);
    return 1;
  }

  // Each run's recorded input is resolved the same way before it is compared,
  // so the check asks "did this run examine this commit" rather than "did
  // whoever launched it happen to type the identifier the same way".
  const resolvedSources = [];
  for (const source of matched.sources) {
    const recorded = source.run.inputs?.["commit"];
    // Only an object id is expanded (an abbreviation to its full SHA). A
    // symbolic ref is left as recorded, so the binding check refuses it
    // rather than resolving it to whatever it points at now.
    const resolved = typeof recorded === "string" && OBJECT_ID.test(recorded)
      ? await resolveRevision(recorded)
      : null;
    resolvedSources.push({
      ...source,
      run: resolved
        ? { ...source.run, inputs: { ...source.run.inputs, commit: resolved } }
        : source.run,
    });
  }

  const bindingErrors = checkCommitBinding(resolvedSources, commit);
  if (bindingErrors.length > 0) {
    for (const error of bindingErrors) console.error(error);
    console.error(
      "re-run verification against this commit rather than attesting to a " +
        "run that examined a different tree",
    );
    return 1;
  }

  // Definitions are read at the verified commit for the same reason their
  // hashes are: the file in the working tree may have moved since the run.
  const sources: RunSource[] = [];
  for (const source of resolvedSources) {
    const workflow = config.workflows.find((w) => w.name === source.name)!;
    const raw = await showAtCommit(commit, workflow.path);
    if (!raw) {
      console.error(`could not read ${workflow.path} at ${commit.slice(0, 8)}`);
      return 1;
    }
    const definition = parseYaml(new TextDecoder().decode(raw));

    const evaluatedPath = evaluatedWorkflowPath(source.run);
    let evaluated: unknown;
    try {
      evaluated = evaluatedPath
        ? parseYaml(await Deno.readTextFile(evaluatedPath))
        : undefined;
    } catch {
      evaluated = undefined;
    }
    if (evaluated === undefined) {
      console.error(
        `${source.name} run ${source.run.id} has no evaluated workflow` +
          (evaluatedPath ? ` at ${evaluatedPath}` : "") +
          ", so it cannot be shown to have executed " +
          `${workflow.path} as committed`,
      );
      return 1;
    }
    const provenanceErrors = checkWorkflowProvenance(definition, evaluated);
    if (provenanceErrors.length > 0) {
      console.error(
        `${source.name} run ${source.run.id} did not execute ${workflow.path} ` +
          `as it stands at ${commit}:`,
      );
      for (const error of provenanceErrors) console.error(`  ${error}`);
      console.error(
        "re-run verification with SWAMP_WORKFLOWS_DIR pointing at this " +
          "commit's verification/ directory; a relative path resolves " +
          "against --repo-dir, not the current directory",
      );
      return 1;
    }

    sources.push({ ...source, definition: definition as WorkflowDef });
  }

  const configIntegrity: Record<string, unknown> = {};
  for (const file of pinnedFiles(config, configPath)) {
    const content = await showAtCommit(commit, file.path);
    if (!content) {
      console.error(
        `::warning::${file.path} not found at ${
          commit.slice(0, 8)
        }; its hash will be absent from the attestation`,
      );
      continue;
    }
    setIn(configIntegrity, file.jsonPath, await computeChecksum(content));
  }

  // Cliffy's version action branches on which spelling was used: `--version`
  // takes `showLongVersion()`, which is the program name plus the version, and
  // `-V` takes `showVersion()`, which is the version alone. Ask for the bare one
  // — the CI summary supplies the program name itself.
  const swampVersion = (await capture("swamp", ["-V"]))?.trim();

  const attestation = buildAttestation(sources, {
    commit,
    branch,
    configIntegrity,
    denoVersion: Deno.version.deno,
    swampVersion,
    os: Deno.build.os,
    arch: Deno.build.arch,
    now: new Date(),
  }, config);

  // The generator validates its own output. post_attestation validates it
  // again on the way out, which is not redundant: the second one is what
  // catches a document this script did not write.
  const validated = AttestationSchema.safeParse(attestation);
  if (!validated.success) {
    console.error("generated attestation does not match AttestationSchema:");
    for (const issue of validated.error.issues) {
      console.error(`  ${issue.path.join(".") || "(root)"}: ${issue.message}`);
    }
    return 1;
  }

  console.log(JSON.stringify(attestation, null, 2));
  return 0;
}

if (import.meta.main) {
  Deno.exit(await main());
}
