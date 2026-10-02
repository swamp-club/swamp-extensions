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

import { evaluate } from "npm:@marcbachmann/cel-js@7.6.1";
import { digestOf, type Json, jsonSafe } from "./canonical.ts";
import type { ProductKind } from "./journal.ts";
import { currentCycle, type RunRecord } from "./run_record.ts";
import type { RunStore } from "./run_store.ts";

// ---------------------------------------------------------------------------
// The CEL vocabulary: what bindings and cel gates can read.
//
//   item         { key, externalRefs }
//   stage        { id, cycle }
//   artifacts    name -> { payload, version, stage, cycle }
//   evidence     name -> { payload, version, stage, cycle }
//   validations  { artifacts: name -> V, evidence: name -> V }
//                where V is { errors, rejected, stage, cycle }
//
// artifacts and evidence hold the latest record of each name in the current
// era, from whichever stage recorded it. That differs on purpose from the
// evidence-recorded gate, which only accepts evidence from the current stage
// and cycle: a gate asks "did this stage produce it?", while a binding or
// cel gate asks "what is the latest?". Factory definitions rely on this (see
// build-swamp-extension's implement.submit). A reset starts a new era, so
// nothing from before it is visible.
//
// Numbers from run data are CEL doubles, as in swamp's own CEL: comparing
// them with integer literals works (version >= 2), but arithmetic needs a
// double (version + 1.0) or a conversion (int(version) + 1).
// ---------------------------------------------------------------------------

export interface ProductView {
  payload: Json;
  version: number;
  stage: string;
  cycle: number;
}

export interface CelContext {
  item: { key: string; externalRefs: Record<string, string> };
  stage: { id: string; cycle: number };
  artifacts: Record<string, ProductView>;
  evidence: Record<string, ProductView>;
  validations: {
    artifacts: Record<string, Json>;
    evidence: Record<string, Json>;
  };
}

/** Build the CEL context for a run, reading each indexed payload version. */
export async function buildCelContext(
  run: RunRecord,
  store: RunStore,
): Promise<CelContext> {
  const views = async (
    kind: ProductKind,
    index: RunRecord["products"]["artifacts"],
  ): Promise<Record<string, ProductView>> => {
    const out: Record<string, ProductView> = {};
    for (const [name, ref] of Object.entries(index)) {
      const payload = await store.readPayload(kind, name, ref.version);
      if (payload === null) {
        throw new Error(
          `${kind} '${name}' version ${ref.version} is missing from storage; ` +
            "its retention may have pruned a version the run still references",
        );
      }
      if (await digestOf(payload) !== ref.digest) {
        throw new Error(
          `${kind} '${name}' version ${ref.version} does not match the digest ` +
            "the run recorded; it was changed outside the runtime",
        );
      }
      out[name] = {
        payload: jsonSafe(payload),
        version: ref.version,
        stage: ref.stage,
        cycle: ref.cycle,
      };
    }
    return out;
  };
  return {
    item: { key: run.key, externalRefs: { ...run.externalRefs } },
    stage: { id: run.stage, cycle: currentCycle(run) },
    artifacts: await views("artifact", run.products.artifacts),
    evidence: await views("evidence", run.products.evidence),
    validations: {
      artifacts: jsonSafe(run.validations.artifacts) as Record<string, Json>,
      evidence: jsonSafe(run.validations.evidence) as Record<string, Json>,
    },
  };
}

/** Evaluate a CEL expression against a run's context. The result is plain
 * JSON: CEL integers come back as numbers. Throws on an evaluation error. */
export function evaluateCel(expression: string, context: CelContext): Json {
  return jsonSafe(
    evaluate(expression, context as unknown as Record<string, unknown>),
  );
}
