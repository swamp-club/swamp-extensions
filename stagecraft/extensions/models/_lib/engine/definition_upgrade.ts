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

// ---------------------------------------------------------------------------
// Upgrading stored factory definitions as they are read (#3194).
//
// A factory definition carries its schemaVersion. Every format change bumps
// DEFINITION_SCHEMA_VERSION and appends one step here that turns a definition
// at the previous version into one at the next, keeping its meaning exactly.
// Every read of a stored definition (a work item's pinned copy, the factory's
// own definition, the studio's view of a factory file) goes through
// readDefinition, so the rest of the engine sees only the current form.
//
// A pinned copy is never rewritten: its digest is checked on the stored form,
// before the upgrade (work_item_ops.ts, checkPinned), and the upgrade happens
// in memory. A factory's own definition is upgraded on disk by swamp, through
// the factory type's `upgrades` (upgradeFactoryArguments).
//
// Steps are pure JSON to JSON. They run on the raw definition, which can hold
// template text (`${{ }}` expressions, `{{name}}` placeholders): a step moves
// that text, it never evaluates it. A step that renames anything a saved
// scenario refers to upgrades the factory's scenarios too.
//
// Each version has a fixture in testdata/definition-versions, run by
// definition_versions_test.ts.
// ---------------------------------------------------------------------------

import type { Json } from "./canonical.ts";
import {
  DEFINITION_SCHEMA_VERSION,
  type FactoryDefinition,
  parseDefinition,
  type ParseResult,
} from "./definition_schema.ts";
import { escapeTemplate } from "./template.ts";

/** A JSON object, as a stored definition is. */
export type JsonObject = { [key: string]: Json };

/** One format change: a definition at `from` to one at `from + 1`. */
export interface UpgradeStep {
  /** The version this step reads; it writes `from + 1`. */
  from: number;
  /** What changed, for DESIGN.md readers and error messages. */
  description: string;
  /** The definition at `from`, with the same meaning at `from + 1`. */
  upgrade(definition: JsonObject): JsonObject;
  /** The factory's saved scenarios, when the step renames anything they
   * name. Absent: scenarios are unchanged by this step. */
  upgradeScenarios?(scenarios: Json[]): Json[];
}

/** The versions a runtime reads: `steps` lead, in order, up to `current`. */
export interface UpgradeChain {
  current: number;
  steps: readonly UpgradeStep[];
}

/** Each call block and the key of its target. */
const CALL_TARGETS = [
  ["workflow", "name"],
  ["method", "modelIdOrName"],
] as const;

/**
 * 1 to 2 (#3190): a stage's `bindings` become `let`, unchanged. In v1 a
 * workflow or method call sent every binding as an input, so its call block
 * gets `passAsInputs` naming each one, in order: the same inputs are sent.
 * A call's target (`workflow.name`, `method.modelIdOrName`) was plain text in
 * v1 and is a template in v2, so it is escaped (escapeTemplate): a `{{x}}`
 * in it stays literal text rather than becoming an undeclared placeholder.
 */
const LET_AND_PASS_AS_INPUTS: UpgradeStep = {
  from: 1,
  description: "bindings become let, and a call passes each as an input",
  upgrade(definition) {
    const stages = Array.isArray(definition.stages)
      ? definition.stages.map((stage) => {
        if (!isObject(stage) || !isObject(stage.work)) return stage;
        const { bindings, ...work } = stage.work;
        const next: JsonObject = bindings === undefined
          ? { ...work }
          : { ...work, let: bindings };
        let changed = bindings !== undefined;
        for (const [block, key] of CALL_TARGETS) {
          const call = work[block];
          if (!isObject(call)) continue;
          const nextCall: JsonObject = { ...call };
          const target = call[key];
          if (typeof target === "string") {
            nextCall[key] = escapeTemplate(target);
          }
          if (work.mode === block && isObject(bindings)) {
            nextCall.passAsInputs = Object.keys(bindings);
          }
          if (
            nextCall[key] !== target ||
            nextCall.passAsInputs !== undefined
          ) {
            next[block] = nextCall;
            changed = true;
          }
        }
        return changed ? { ...stage, work: next } : stage;
      })
      : definition.stages;
    return {
      ...definition,
      schemaVersion: 2,
      ...(stages === undefined ? {} : { stages }),
    };
  },
};

/** Every format change since schemaVersion 1, oldest first. */
export const DEFINITION_UPGRADES: readonly UpgradeStep[] = [
  LET_AND_PASS_AS_INPUTS,
];

/** The chain this runtime reads factory definitions with. */
export const DEFINITION_CHAIN: UpgradeChain = checkChain({
  current: DEFINITION_SCHEMA_VERSION,
  steps: DEFINITION_UPGRADES,
});

/** The oldest version a chain reads. */
export function oldestVersion(chain: UpgradeChain): number {
  return chain.current - chain.steps.length;
}

/** The chain, once its steps are checked to lead one by one to current. */
export function checkChain(chain: UpgradeChain): UpgradeChain {
  const oldest = oldestVersion(chain);
  for (const [i, step] of chain.steps.entries()) {
    if (step.from !== oldest + i) {
      throw new Error(
        `upgrade step ${i} reads schemaVersion ${step.from}, but the chain ` +
          `needs ${oldest + i} there to reach ${chain.current}`,
      );
    }
  }
  return chain;
}

/**
 * Why a stored definition could not be upgraded, and where: `schemaVersion`
 * when its version is one this runtime does not read, `(root)` when a step
 * failed on it, `scenarios` when a step failed on the factory's saved
 * scenarios.
 */
export class UpgradeError extends Error {
  constructor(message: string, readonly path: string) {
    super(message);
    this.name = "UpgradeError";
  }
}

/** A definition's upgrade: the current form and the steps it took. */
export interface Upgraded {
  definition: unknown;
  /** The version it was stored at; null when it names none. */
  from: number | null;
  applied: readonly UpgradeStep[];
}

const isObject = (v: unknown): v is JsonObject =>
  v !== null && typeof v === "object" && !Array.isArray(v);

/** The schemaVersion a stored definition names, or null when it names no
 * whole number (the schema then reports what is wrong). */
export function storedVersion(raw: unknown): number | null {
  if (!isObject(raw)) return null;
  const version = raw.schemaVersion;
  return typeof version === "number" && Number.isInteger(version)
    ? version
    : null;
}

/**
 * A stored definition in the current form. Throws when its version is newer
 * than this runtime reads or older than any it can upgrade. A definition
 * naming no version, or at the current one, comes back as it is, unparsed;
 * the input is never changed.
 */
export function upgradeDefinition(
  raw: unknown,
  chain: UpgradeChain = DEFINITION_CHAIN,
): Upgraded {
  const from = storedVersion(raw);
  if (from === null || from === chain.current) {
    return { definition: raw, from, applied: [] };
  }
  if (from > chain.current) {
    throw new UpgradeError(
      `this definition is schemaVersion ${from}, newer than this stagecraft ` +
        `reads (up to ${chain.current}): it needs a newer @swamp/stagecraft`,
      "schemaVersion",
    );
  }
  const oldest = oldestVersion(chain);
  if (from < oldest) {
    throw new UpgradeError(
      `this definition is schemaVersion ${from}, older than any this ` +
        `stagecraft can upgrade (${oldest} to ${chain.current})`,
      "schemaVersion",
    );
  }
  const applied = chain.steps.slice(from - oldest);
  // A copy: the stored form stays exactly as it was read.
  let current = structuredClone(raw) as JsonObject;
  for (const step of applied) {
    try {
      current = step.upgrade(current);
    } catch (e) {
      throw new UpgradeError(
        `${stepName(step)} failed on this definition: ${messageOf(e)}`,
        "(root)",
      );
    }
    if (current.schemaVersion !== step.from + 1) {
      throw new UpgradeError(
        `${stepName(step)} did not give schemaVersion ${step.from + 1}`,
        "(root)",
      );
    }
  }
  return { definition: current, from, applied };
}

/**
 * A stored definition, upgraded and parsed with the current schema: the one
 * way the engine and the studio read a definition they did not just build.
 */
export function readDefinition(
  raw: unknown,
  chain: UpgradeChain = DEFINITION_CHAIN,
): ParseResult<FactoryDefinition> {
  let upgraded: Upgraded;
  try {
    upgraded = upgradeDefinition(raw, chain);
  } catch (e) {
    return { ok: false, errors: [e instanceof Error ? e.message : String(e)] };
  }
  return parseDefinition(upgraded.definition);
}

/**
 * A factory's global arguments with its definition in the current form, and
 * its saved scenarios upgraded by the same steps. The factory type's swamp
 * `upgrades` run this, as does every read of a factory's definition, so it
 * goes by the definition's schemaVersion, not by swamp's typeVersion: it
 * does nothing to a definition already current, however often it runs.
 * Throws as upgradeDefinition does.
 */
export function upgradeFactoryArguments(
  args: Record<string, unknown>,
  chain: UpgradeChain = DEFINITION_CHAIN,
): Record<string, unknown> {
  if (args.definition === undefined || args.definition === null) return args;
  const upgraded = upgradeDefinition(args.definition, chain);
  if (upgraded.applied.length === 0) return args;
  let scenarios = args.scenarios;
  if (Array.isArray(scenarios)) {
    scenarios = structuredClone(scenarios);
    for (const step of upgraded.applied) {
      if (step.upgradeScenarios === undefined) continue;
      try {
        scenarios = step.upgradeScenarios(scenarios as Json[]);
      } catch (e) {
        throw new UpgradeError(
          `${stepName(step)} failed on the saved scenarios: ${messageOf(e)}`,
          "scenarios",
        );
      }
    }
  }
  return {
    ...args,
    definition: upgraded.definition,
    ...(scenarios === undefined ? {} : { scenarios }),
  };
}

/** Where a schema check reports a problem it finds before parsing. */
export interface IssueSink {
  addIssue(issue: { code: "custom"; message: string }): void;
}

/**
 * For a schema check only (a zod preprocess): the definition in the current
 * form when it can be upgraded. A version this runtime does not read is
 * passed on as it is, so the schema's schemaVersion check names it; a step
 * that fails is reported with its own message.
 */
export function upgradeOrPass(
  raw: unknown,
  ctx: IssueSink,
  chain: UpgradeChain = DEFINITION_CHAIN,
): unknown {
  try {
    return upgradeDefinition(raw, chain).definition;
  } catch (e) {
    if (!(e instanceof UpgradeError && e.path === "schemaVersion")) {
      ctx.addIssue({ code: "custom", message: messageOf(e) });
    }
    return raw;
  }
}

function stepName(step: UpgradeStep): string {
  return `the upgrade step from schemaVersion ${step.from} (${step.description})`;
}

function messageOf(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
}
