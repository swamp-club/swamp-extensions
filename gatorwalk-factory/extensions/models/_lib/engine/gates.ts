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

import { canonicalJson, fieldAt, type Json } from "./canonical.ts";
import {
  buildCelContext,
  type CelContext,
  evaluateCel,
} from "./cel_context.ts";
import {
  findStage,
  type GateSpec,
  type Lifecycle,
  transitionsFrom,
  type TransitionSpec,
} from "./lifecycle_schema.ts";
import { validateField } from "./payload_schema.ts";
import {
  cycleLimitFor,
  cycleLimitMessage,
  type Env,
  type GateEvaluator,
  type Limit,
} from "./run_ops.ts";
import { type Approval, currentCycle, type RunRecord } from "./run_record.ts";
import type { RunStore } from "./run_store.ts";

// ---------------------------------------------------------------------------
// Gate evaluation. Every gate of a transition is evaluated, and every failure
// is returned, each saying which gate, what it needed and what it found, so a
// person or agent can see everything that stands in the way at once.
//
// Gates read the run record and the CEL context. A context that cannot be
// built (a payload failing its digest check) becomes a failure on each gate
// that needs it, never an exception out of advance.
// ---------------------------------------------------------------------------

export interface GateCheck {
  type: GateSpec["type"];
  pass: boolean;
  /** Why it failed: what the gate needed and what it found. */
  reason?: string;
  /** A human-approval gate's id. */
  gateId?: string;
  /** For a human-approval gate, whether a person must decide it now: false
   * only while its `when` is false. */
  required?: boolean;
  /** A human-approval gate whose `when` could not be evaluated. It counts as
   * required, but the fix is to the run data or the lifecycle, not a
   * person's decision. */
  conditionError?: true;
}

interface GateInputs {
  run: RunRecord;
  lifecycle: Lifecycle;
  context: CelContext | Error;
  now: Date;
}

/** Evaluate every gate of a transition against a run. */
export async function evaluateGates(
  run: RunRecord,
  lifecycle: Lifecycle,
  transition: TransitionSpec,
  store: RunStore,
  env: Env,
): Promise<GateCheck[]> {
  const gates = transition.gates ?? [];
  if (gates.length === 0) return [];
  const context = await buildCelContext(run, store).catch((error) =>
    error instanceof Error ? error : new Error(String(error))
  );
  const inputs: GateInputs = {
    run,
    lifecycle,
    context,
    now: new Date(env.now()),
  };
  return gates.map((gate) => evaluateGate(gate, inputs));
}

/** The evaluator GW-4's advance takes. */
export function makeGateEvaluator(
  lifecycle: Lifecycle,
  store: RunStore,
  env: Env,
): GateEvaluator {
  return async (run, transition) => {
    const checks = await evaluateGates(run, lifecycle, transition, store, env);
    const failures = checks.flatMap((c) =>
      c.pass ? [] : [`${c.type}: ${c.reason}`]
    );
    return { pass: failures.length === 0, failures };
  };
}

export interface TransitionReadiness {
  name: string;
  to: string;
  /** A manual transition moves only on a person's explicit go. */
  manual: boolean;
  gates: GateCheck[];
  /** The target stage's cycle limit; null for a global escape transition,
   * which the limit never closes. */
  cycleLimit: Limit | null;
  /** Every gate passes and the cycle limit allows entry. A manual
   * transition still needs confirmation. */
  ready: boolean;
  failures: string[];
}

/**
 * The readiness of every transition out of the current stage: its gates and
 * the cycle limit of the stage it enters, so the status view never shows a
 * transition as ready that advance would refuse.
 */
export async function evaluateTransitions(
  run: RunRecord,
  lifecycle: Lifecycle,
  store: RunStore,
  env: Env,
): Promise<TransitionReadiness[]> {
  if (run.status !== "active") return [];
  const stage = findStage(lifecycle, run.stage);
  if (stage === undefined) throw new Error(`no stage '${run.stage}'`);
  const out: TransitionReadiness[] = [];
  for (const transition of transitionsFrom(lifecycle, stage)) {
    const gates = await evaluateGates(run, lifecycle, transition, store, env);
    const limit = cycleLimitFor(run, lifecycle, transition);
    const failures = gates.flatMap((c) =>
      c.pass ? [] : [`${c.type}: ${c.reason}`]
    );
    if (limit !== null && !limit.allowed) {
      failures.push(`cycle limit: ${cycleLimitMessage(transition.to, limit)}`);
    }
    out.push({
      name: transition.name,
      to: transition.to,
      manual: transition.manual === true,
      gates,
      cycleLimit: limit,
      ready: failures.length === 0,
      failures,
    });
  }
  return out;
}

// --- the gates ---------------------------------------------------------------

function evaluateGate(gate: GateSpec, inputs: GateInputs): GateCheck {
  const fail = (reason: string): GateCheck => ({
    type: gate.type,
    pass: false,
    reason,
  });
  const pass: GateCheck = { type: gate.type, pass: true };
  const { run, lifecycle, context, now } = inputs;
  const cycle = currentCycle(run);
  const needContext = (): CelContext | GateCheck =>
    context instanceof Error
      ? fail(`run data could not be read: ${context.message}`)
      : context;

  switch (gate.type) {
    case "artifact-exists": {
      const name = gate.config.artifact;
      return run.products.artifacts[name] !== undefined
        ? pass
        : fail(`artifact '${name}' has not been recorded`);
    }

    case "artifact-fresh": {
      const name = gate.config.artifact;
      const ref = run.products.artifacts[name];
      if (ref === undefined) {
        return fail(`artifact '${name}' has not been recorded`);
      }
      const reviews = lifecycle.stages.flatMap((s) => s.artifacts ?? [])
        .find((a) => a.name === name)?.reviews;
      if (reviews === undefined) {
        return fail(`artifact '${name}' declares no reviews: subject`);
      }
      const subject = run.products.artifacts[reviews];
      if (subject === undefined) {
        return fail(
          `'${name}' reviews '${reviews}', which has not been recorded`,
        );
      }
      const reasons: string[] = [];
      if (
        ref.subject?.name !== reviews ||
        ref.subject.version !== subject.version ||
        ref.subject.digest !== subject.digest
      ) {
        reasons.push(
          `'${name}' reviews '${reviews}' version ${
            ref.subject?.version ?? "(none)"
          }, but the current version is ${subject.version}; record '${name}' again against it`,
        );
      }
      if (
        gate.config.recordedThisCycle === true &&
        (ref.stage !== run.stage || ref.cycle !== cycle)
      ) {
        reasons.push(
          `'${name}' was recorded in stage '${ref.stage}' cycle ${ref.cycle}, ` +
            `not in this entry into '${run.stage}' (cycle ${cycle})`,
        );
      }
      return reasons.length === 0 ? pass : fail(reasons.join("; "));
    }

    case "findings-clear": {
      const ctx = needContext();
      if ("pass" in ctx) return ctx;
      const name = gate.config.artifact;
      const view = ctx.artifacts[name];
      if (view === undefined) {
        return fail(`findings artifact '${name}' has not been recorded`);
      }
      const findings = findingsOf(view.payload);
      const blocking = new Set<string>(gate.config.blocking);
      const open = findings.filter((f) =>
        f.resolved !== true && blocking.has(f.severity)
      );
      return open.length === 0 ? pass : fail(
        `${open.length} unresolved blocking finding(s) in '${name}': ${
          open.map((f) => `${f.id} (${f.severity})`).join(", ")
        }; resolve them (record '${name}' again with resolved: true) or rework`,
      );
    }

    case "findings-open": {
      const ctx = needContext();
      if ("pass" in ctx) return ctx;
      const name = gate.config.artifact;
      const view = ctx.artifacts[name];
      if (view === undefined) {
        return fail(`findings artifact '${name}' has not been recorded`);
      }
      const blocking = new Set<string>(gate.config.blocking);
      const open = findingsOf(view.payload).some((f) =>
        f.resolved !== true && blocking.has(f.severity)
      );
      return open ? pass : fail(
        `'${name}' has no unresolved finding at a blocking severity (${
          gate.config.blocking.join(", ")
        })`,
      );
    }

    case "human-approval": {
      const id = gate.config.id;
      const when = gate.config.when;
      if (when !== undefined) {
        const ctx = needContext();
        const condition = "pass" in ctx
          ? { error: ctx.reason ?? "run data could not be read" }
          : evaluateCondition(when, ctx);
        if ("error" in condition) {
          return {
            ...fail(`when: ${condition.error}`),
            gateId: id,
            required: true,
            conditionError: true,
          };
        }
        if (!condition.value) return { ...pass, gateId: id, required: false };
      }
      return {
        ...humanApproval(id, gate.config.minApprovals ?? 1, run, fail, pass),
        gateId: id,
        required: true,
      };
    }

    case "evidence-recorded": {
      const name = gate.config.name;
      const ref = run.products.evidence[name];
      if (ref === undefined) {
        return fail(`evidence '${name}' has not been recorded`);
      }
      if (ref.stage !== run.stage || ref.cycle !== cycle) {
        return fail(
          `evidence '${name}' was recorded in stage '${ref.stage}' cycle ${ref.cycle}, ` +
            `not in this entry into '${run.stage}' (cycle ${cycle}); record it again`,
        );
      }
      const required = Object.entries(gate.config.requireField ?? {});
      const matches = Object.entries(gate.config.match ?? {});
      if (required.length === 0 && matches.length === 0) return pass;
      const ctx = needContext();
      if ("pass" in ctx) return ctx;
      const payload = ctx.evidence[name]?.payload;
      const equalities = required.flatMap(([field, expected]) => {
        const actual = fieldAt(payload, field);
        // Canonical JSON: objects and arrays compare by content, not identity.
        return actual !== undefined &&
            canonicalJson(actual) === canonicalJson(expected)
          ? []
          : [
            `field '${field}' is ${
              JSON.stringify(actual) ?? "missing"
            }, expected ${JSON.stringify(expected)}`,
          ];
      });
      // A missing field fails even under `not`: match constrains a value
      // that is there, as requireField does.
      const schemaMismatches = matches.flatMap(([field, schema]) => {
        const actual = fieldAt(payload, field);
        if (actual === undefined) {
          return [
            `field '${field}' is missing, expected to match ${
              JSON.stringify(schema)
            }`,
          ];
        }
        const reasons = validateField(schema, field, actual);
        return reasons === null ? [] : [
          `field '${field}' is ${JSON.stringify(actual)}, expected to match ${
            JSON.stringify(schema)
          } (${reasons.join("; ")})`,
        ];
      });
      const mismatches = [...equalities, ...schemaMismatches];
      if (mismatches.length === 0) return pass;
      const detail = mismatches.join("; ");
      return fail(
        gate.config.message === undefined
          ? `evidence '${name}': ${detail}`
          : `${gate.config.message} (evidence '${name}': ${detail})`,
      );
    }

    case "cooldown": {
      const { afterEvidence, afterArtifact } = gate.config;
      const target = afterEvidence !== undefined
        ? {
          what: `evidence '${afterEvidence}'`,
          ref: run.products.evidence[afterEvidence],
        }
        : afterArtifact !== undefined
        ? {
          what: `artifact '${afterArtifact}'`,
          ref: run.products.artifacts[afterArtifact],
        }
        : undefined;
      if (target === undefined) {
        return fail("names neither afterEvidence nor afterArtifact");
      }
      const { what, ref } = target;
      if (ref === undefined) {
        return fail(`${what} has not been recorded; nothing to cool down from`);
      }
      const recordedAt = new Date(ref.at).getTime();
      if (Number.isNaN(recordedAt)) {
        return fail(`${what} has an unreadable record time '${ref.at}'`);
      }
      const elapsed = (now.getTime() - recordedAt) / 1000;
      if (elapsed >= gate.config.seconds) return pass;
      return fail(
        `${what} was recorded ${Math.floor(elapsed)}s ago; wait ${
          Math.ceil(gate.config.seconds - elapsed)
        }s more (${gate.config.seconds}s cooldown)`,
      );
    }

    case "max-cycles": {
      const entries = run.entries[gate.config.stage] ?? 0;
      const under = entries < gate.config.limit;
      if (under === (gate.config.invert !== true)) return pass;
      return fail(
        `stage '${gate.config.stage}' has been entered ${entries} time(s); ` +
          (gate.config.invert === true
            ? `this route needs at least ${gate.config.limit}`
            : `this route needs fewer than ${gate.config.limit}`),
      );
    }

    case "cel": {
      const ctx = needContext();
      if ("pass" in ctx) return ctx;
      const result = evaluateCondition(gate.config.expr, ctx);
      if ("error" in result) return fail(result.error);
      return result.value
        ? pass
        : fail(gate.config.message ?? `${gate.config.expr} is false`);
    }
  }
}

/** Evaluate a CEL condition; an error or a non-boolean result is an error. */
function evaluateCondition(
  expr: string,
  ctx: CelContext,
): { value: boolean } | { error: string } {
  let result: Json;
  try {
    result = evaluateCel(expr, ctx);
  } catch (error) {
    return {
      error: `could not evaluate ${expr}: ${
        error instanceof Error ? error.message.split("\n")[0] : String(error)
      }`,
    };
  }
  if (typeof result !== "boolean") {
    return {
      error: `${expr} must be true or false, but was ${JSON.stringify(result)}`,
    };
  }
  return { value: result };
}

/**
 * human-approval: each approver's latest decision in this stage, cycle and
 * era. An approver is a distinct platform principal; every decision without
 * one counts as a single unverified approver whatever name it asserts, so
 * asserted names cannot multiply approvals. A decline blocks. An approval
 * counts only while every product it was bound to is unchanged; a product
 * recorded after it does not invalidate it.
 */
function humanApproval(
  gateId: string,
  minApprovals: number,
  run: RunRecord,
  fail: (reason: string) => GateCheck,
  pass: GateCheck,
): GateCheck {
  const cycle = currentCycle(run);
  const decisions = run.approvals.filter((a) =>
    a.gateId === gateId && a.era === run.era && a.stage === run.stage &&
    a.cycle === cycle
  );
  const latest = new Map<string, Approval>();
  for (const decision of decisions) {
    latest.set(approverOf(decision), decision);
  }
  const declines = [...latest.values()].filter((d) => d.decision === "decline");
  if (declines.length > 0) {
    return fail(
      declines.map((d) =>
        `'${gateId}' was declined by ${approverOf(d)}` +
        (d.note !== undefined ? `: ${d.note}` : "")
      ).join("; ") + "; address it, then ask for approval again",
    );
  }
  const approvals = [...latest.values()];
  const standing = approvals.filter((a) =>
    changedProducts(a, run).length === 0
  );
  if (standing.length >= minApprovals) return pass;
  const stale = approvals.filter((a) => changedProducts(a, run).length > 0);
  return fail(
    `awaiting approval '${gateId}' (${standing.length}/${minApprovals}) for stage ` +
      `'${run.stage}' cycle ${cycle}` +
      (stale.length > 0
        ? `; ${stale.length} earlier approval(s) no longer count because ${
          [...new Set(stale.flatMap((a) => changedProducts(a, run)))].join(", ")
        } changed since`
        : "") +
      (minApprovals > 1
        ? "; each approver must be a distinct platform principal"
        : ""),
  );
}

function approverOf(decision: Approval): string {
  return decision.actor.principal ?? "an unverified caller";
}

/** Products an approval was bound to that have changed or gone since. */
function changedProducts(approval: Approval, run: RunRecord): string[] {
  const changed: string[] = [];
  for (const kind of ["artifacts", "evidence"] as const) {
    for (const [name, bound] of Object.entries(approval.products[kind])) {
      if (run.products[kind][name]?.digest !== bound.digest) changed.push(name);
    }
  }
  return changed;
}

interface Finding {
  id: string;
  severity: string;
  resolved?: boolean;
}

function findingsOf(payload: Json): Finding[] {
  if (
    payload === null || typeof payload !== "object" || Array.isArray(payload)
  ) {
    return [];
  }
  const findings = payload.findings;
  return Array.isArray(findings)
    ? findings.filter((f): f is Json & Finding =>
      f !== null && typeof f === "object" && !Array.isArray(f) &&
      typeof f.id === "string" && typeof f.severity === "string"
    )
    : [];
}
