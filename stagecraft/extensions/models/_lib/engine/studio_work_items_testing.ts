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

import { digestOf, jsonSafe } from "./canonical.ts";
import { parseDefinition } from "./definition_schema.ts";
import { parseExample } from "./fake_swamp.ts";
import type { RunRecord } from "./run_record.ts";
import { parseScenario, runScenario, type Scenario } from "./scenario.ts";
import type { QueryData } from "./studio_work_items.ts";
import { DEFINITION_NAME, WORK_ITEM_TYPE } from "./work_item_ops.ts";

// A work item for the studio's tests, made by playing a saved scenario on the
// engine and storing what it left as a work item's records: every run
// version, the pinned definition and every product version. The query over
// them follows swamp's data query as the studio uses it: `==` conjuncts over
// a record's fields and attributes, latest versions only unless the
// predicate names a version. The real query runs in the integration test.

export const EXAMPLES = new URL(
  "../../../../.claude/skills/stagecraft/references/examples/",
  import.meta.url,
);

/** A stored record, as the query sees it. */
export interface Stored {
  modelName: string;
  modelType: string;
  name: string;
  /** The record's spec, where a test gives one (a tracker's comment). */
  specName?: string;
  version: number;
  isLatest: boolean;
  attributes: Record<string, unknown>;
}

/** Records and a query over them; `put` writes a record's next version. */
export function recordStore() {
  const records: Stored[] = [];
  const asked: string[] = [];
  const put = (
    modelName: string,
    name: string,
    attributes: Record<string, unknown>,
    modelType = WORK_ITEM_TYPE,
    specName?: string,
  ) => {
    const prior = records.filter((r) =>
      r.modelName === modelName && r.name === name
    );
    prior.forEach((r) => (r.isLatest = false));
    records.push({
      modelName,
      modelType,
      name,
      ...(specName === undefined ? {} : { specName }),
      version: prior.length + 1,
      isLatest: true,
      attributes: structuredClone(attributes),
    });
  };
  const query: QueryData = (predicate) => {
    asked.push(predicate);
    const terms = predicate.split(" && ").map((t) => {
      const m = t.match(/^([\w.]+) == (?:"([^"]*)"|(\d+))$/);
      if (m === null) throw new Error(`the query cannot read '${t}'`);
      return { path: m[1], value: m[2] ?? Number(m[3]) };
    });
    const versioned = terms.some((t) => t.path === "version");
    return Promise.resolve(
      records.filter((r) =>
        (versioned || r.isLatest) &&
        terms.every(({ path, value }) =>
          (path.startsWith("attributes.")
            ? r.attributes[path.slice("attributes.".length)]
            : (r as unknown as Record<string, unknown>)[path]) === value
        )
      ).map((r) => ({ ...r, content: structuredClone(r.attributes) })),
    );
  };
  return { records, asked, put, query };
}

export type RecordStore = ReturnType<typeof recordStore>;

export interface ScenarioItem extends RecordStore {
  key: string;
  run: RunRecord;
  /** The example's definition block, as the factory's file holds it. */
  definition: Record<string, unknown>;
}

/**
 * Store the run `scenario` (one of `example`'s saved scenarios, by name, or
 * one given whole) leaves as work item `key` of factory "team", pinned at
 * definition version 1.
 */
export async function scenarioItem(
  example: string,
  scenario: string | Scenario,
  key: string,
  store: RecordStore = recordStore(),
): Promise<ScenarioItem> {
  const { definition, scenarios } = parseExample(
    await Deno.readTextFile(new URL(example, EXAMPLES)),
  );
  const parsedDefinition = parseDefinition(definition);
  if (!parsedDefinition.ok) throw new Error(parsedDefinition.errors.join("\n"));
  const found = typeof scenario === "string"
    ? scenarios.find((s) => (s as { scenario?: unknown }).scenario === scenario)
    : scenario;
  const parsed = parseScenario(found);
  if (!parsed.ok) throw new Error(parsed.errors.join("\n"));
  const result = await runScenario(parsedDefinition.value, parsed.value);
  const digest = await digestOf(parsedDefinition.value);
  store.put(key, DEFINITION_NAME, {
    factory: "team",
    digest,
    definition: jsonSafe(parsedDefinition.value),
  });
  const pin = (run: RunRecord): RunRecord => ({
    ...run,
    key,
    factory: "team",
    definition: { digest, version: 1 },
  });
  // Each product's versions in order, so their numbers match the journal's.
  const last = result.frames[result.frames.length - 1].run;
  const written = new Set<string>();
  for (const e of last.journal) {
    if (e.type !== "recorded") continue;
    const id = `${e.kind}-${e.name}`;
    if (written.has(id)) continue;
    written.add(id);
    for (let v = 1;; v++) {
      const payload = await result.store.readPayload(e.kind, e.name, v);
      if (payload === null) break;
      store.put(key, id, payload as Record<string, unknown>);
    }
  }
  for (const frame of result.frames) {
    store.put(key, "run", jsonSafe(pin(frame.run)) as Record<string, unknown>);
  }
  return { ...store, key, run: pin(last), definition };
}

/** A plan whose review loops back once, then waits on a person: build
 * example's plan-review stage, approved by nobody yet. */
export const LOOPED_REVIEW: Scenario = {
  scenario: "looped-review",
  steps: [
    { record: { artifact: "plan" }, payload: plan("Add list") },
    { move: "submit" },
    {
      record: { artifact: "plan-review" },
      payload: {
        findings: [{ id: "F1", severity: "high", description: "No tests" }],
      },
    },
    { move: "rework" },
    { record: { artifact: "plan" }, payload: plan("Add list, with tests") },
    { move: "submit" },
    {
      record: { artifact: "plan-review" },
      payload: {
        findings: [{ id: "F2", severity: "low", description: "Naming" }],
      },
    },
    { wait: 3600 },
    { expect: { stage: "plan-review" } },
  ],
};

function plan(summary: string): Record<string, unknown> {
  return {
    summary,
    steps: [{ description: summary, files: ["x.ts"] }],
    testingStrategy: "Unit tests",
    versionBump: { needed: true, reason: "New method" },
  };
}
