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

import { buildCelContext } from "./cel_context.ts";
import { buildDispatch } from "./dispatch.ts";
import {
  evaluateTransitions,
  type GateCheck,
  type TransitionReadiness,
} from "./gates.ts";
import { type FactoryDefinition, findStage } from "./definition_schema.ts";
import { dispatchCap, type Env } from "./run_ops.ts";
import { heldDispatchOverride } from "./awaiting.ts";
import { currentCycle, type RunRecord } from "./run_record.ts";
import type { RunStore } from "./run_store.ts";

// ---------------------------------------------------------------------------
// A work item's status as data: what status prints, less the tracker's lag,
// which needs a method context. It reads only the run, the pinned definition
// and a store, so the status method and the studio's work-item route
// (studio_server.ts) give the same answer from the same code.
// ---------------------------------------------------------------------------

/** A run's pinned factory definition, checked against its digest. */
export interface Pinned {
  factory: string;
  digest: string;
  definition: FactoryDefinition;
}

/** The expectation a write passes back: where the caller believes the run is. */
export function expectationProps(run: RunRecord) {
  return {
    expectedStage: run.stage,
    expectedCycle: currentCycle(run),
    expectedEra: run.era,
  };
}

/**
 * An exit's human-approval gate ids, split by whether a person must decide
 * them now. A driver needs them to tell an exit a person must decide from one
 * it may take on its own, including once the gate is satisfied and the exit
 * shows ready. A conditional approval whose `when` is false is not required;
 * one whose `when` cannot be evaluated is, so the driver stops and asks.
 */
function humanGatesOf(gates: GateCheck[]): {
  humanGates: string[];
  humanGatesNotRequired: string[];
} {
  const ids = (required: boolean) =>
    gates.flatMap((g) =>
      g.gateId !== undefined && (g.required !== false) === required
        ? [g.gateId]
        : []
    );
  return { humanGates: ids(true), humanGatesNotRequired: ids(false) };
}

/**
 * The status of a run, with the transition readiness it was built from, so
 * a caller that shows both never evaluates the gates twice.
 */
export async function runStatus(
  run: RunRecord,
  pinned: Pinned,
  store: RunStore,
  env: Env,
) {
  const definition = pinned.definition;
  const context = await buildCelContext(run, store);
  const active = run.status === "active";
  const readiness: TransitionReadiness[] = active
    ? await evaluateTransitions(run, definition, store, env)
    : [];
  const view = {
    key: run.key,
    definition: {
      factory: pinned.factory,
      digest: pinned.digest,
    },
    status: run.status,
    stage: run.stage,
    cycle: currentCycle(run),
    era: run.era,
    expected: expectationProps(run),
    dispatch: active ? buildDispatch(definition, run, context) : null,
    dispatchCap: active ? dispatchCap(run, definition) : null,
    /** Parked at the dispatch cap: a dispatch was refused, and the next one
     * waits on a person granting a dispatch override. */
    awaitingDispatchOverride:
      heldDispatchOverride(run, definition) !== undefined,
    exits: readiness.map((t) => ({
      name: t.name,
      to: t.to,
      manual: t.manual,
      ...humanGatesOf(t.gates),
      ready: t.ready,
      failures: t.failures,
    })),
    /** Evidence of this stage a person records, not its work. */
    personRecords: active
      ? (findStage(definition, run.stage)?.evidence ?? []).flatMap((spec) =>
        spec.recordedBy === "person" ? [spec.name] : []
      )
      : [],
    validations: run.validations,
    products: run.products,
  };
  return { view, readiness };
}

export type RunStatus = Awaited<ReturnType<typeof runStatus>>["view"];
