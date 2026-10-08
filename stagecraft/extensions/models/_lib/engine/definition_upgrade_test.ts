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
  assert,
  assertEquals,
  assertFalse,
  assertRejects,
  assertStrictEquals,
  assertThrows,
} from "@std/assert";
import { digestOf, type Json, jsonSafe } from "./canonical.ts";
import {
  DEFINITION_SCHEMA_VERSION,
  parseDefinition,
} from "./definition_schema.ts";
import {
  checkChain,
  DEFINITION_CHAIN,
  type JsonObject,
  readDefinition,
  type UpgradeChain,
  upgradeDefinition,
  UpgradeError,
  upgradeFactoryArguments,
  upgradeOrPass,
} from "./definition_upgrade.ts";
import { parseExample } from "./fake_swamp.ts";
import { parseScenario, runScenario } from "./scenario.ts";
import { EXAMPLES } from "./studio_work_items_testing.ts";
import { checkPinned } from "./work_item_ops.ts";
import { boardCard } from "./studio_work_items.ts";
import type { RunRecord } from "./run_record.ts";
import { memoryStore } from "./run_store.ts";
import { testEnv } from "./test_support.ts";

// No format change has shipped yet, so these tests read a made-up version 0
// that names its stages `phases` and its scenarios' expected stage `phase`:
// a real restructuring, upgraded by a step as a real format change would be.

const RENAME_PHASES = {
  from: 0,
  description: "phases are named stages",
  upgrade(definition: JsonObject): JsonObject {
    const { phases, ...rest } = definition;
    return { ...rest, schemaVersion: 1, stages: phases };
  },
  upgradeScenarios(scenarios: Json[]): Json[] {
    return scenarios.map((s) => {
      const { steps, ...rest } = s as JsonObject;
      return {
        ...rest,
        steps: (steps as JsonObject[]).map((step) => {
          if (step.expect === undefined) return step;
          const { phase, ...expect } = step.expect as JsonObject;
          return {
            ...step,
            expect: phase === undefined ? expect : { ...expect, stage: phase },
          };
        }),
      };
    });
  },
};

const V0: UpgradeChain = checkChain({ current: 1, steps: [RENAME_PHASES] });

/** content-review's definition and scenarios, at v1 and written at v0. */
async function example() {
  const { definition, scenarios } = parseExample(
    await Deno.readTextFile(new URL("content-review.yaml", EXAMPLES)),
  );
  const { stages, ...rest } = definition;
  const v0 = { ...rest, schemaVersion: 0, phases: stages };
  const v0Scenarios = (scenarios as JsonObject[]).map((s) => ({
    ...s,
    steps: (s.steps as JsonObject[]).map((step) => {
      if (step.expect === undefined) return step;
      const { stage, ...expect } = step.expect as JsonObject;
      return {
        ...step,
        expect: stage === undefined ? expect : { ...expect, phase: stage },
      };
    }),
  }));
  return { v1: definition, scenarios, v0, v0Scenarios };
}

// --- the chain -----------------------------------------------------------------

Deno.test("upgrade: the shipped chain leads to the current schemaVersion", () => {
  assertEquals(DEFINITION_CHAIN.current, DEFINITION_SCHEMA_VERSION);
  assertStrictEquals(checkChain(DEFINITION_CHAIN), DEFINITION_CHAIN);
});

Deno.test("upgrade: a chain with a gap is refused", () => {
  assertThrows(
    () => checkChain({ current: 2, steps: [RENAME_PHASES] }),
    Error,
    "reads schemaVersion 0, but the chain needs 1",
  );
});

Deno.test("upgrade: a current definition comes back as it is", async () => {
  const { v1 } = await example();
  const upgraded = upgradeDefinition(v1);
  assertStrictEquals(upgraded.definition, v1);
  assertEquals(upgraded.from, 1);
  assertEquals(upgraded.applied, []);
  assert(readDefinition(v1).ok);
});

Deno.test("upgrade: an older definition is upgraded step by step, and the stored form is not changed", async () => {
  const { v0, v1 } = await example();
  const before = structuredClone(v0);
  const upgraded = upgradeDefinition(v0, V0);
  assertEquals(upgraded.from, 0);
  assertEquals(upgraded.applied, [RENAME_PHASES]);
  assertEquals(upgraded.definition, v1);
  assertEquals(v0, before);
  const read = readDefinition(v0, V0);
  assert(read.ok);
  const direct = parseDefinition(v1);
  assert(direct.ok);
  assertEquals(read.value, direct.value);
});

Deno.test("upgrade: a newer definition is refused, saying it needs a newer stagecraft", () => {
  const newer = { schemaVersion: DEFINITION_SCHEMA_VERSION + 1, stages: [] };
  assertThrows(
    () => upgradeDefinition(newer),
    Error,
    "needs a newer @swamp/stagecraft",
  );
  const read = readDefinition(newer);
  assertFalse(read.ok);
  assert(read.errors[0].includes("newer than this stagecraft reads"));
  // The schema says the same when it is reached without the upgrade.
  const parsed = parseDefinition(newer);
  assertFalse(parsed.ok);
  assert(
    parsed.errors.some((e) => e.includes("needs a newer @swamp/stagecraft")),
    parsed.errors.join("\n"),
  );
});

Deno.test("upgrade: a definition older than any step reads is refused", () => {
  const read = readDefinition({ schemaVersion: 0, stages: [] });
  assertFalse(read.ok);
  assert(read.errors[0].includes("older than any this stagecraft can upgrade"));
});

Deno.test("upgrade: a definition naming no whole schemaVersion is left to the schema", () => {
  for (const raw of [{ stages: [] }, { schemaVersion: "1" }, null, "text"]) {
    assertStrictEquals(upgradeDefinition(raw).definition, raw);
    const read = readDefinition(raw);
    assertFalse(read.ok);
  }
});

Deno.test("upgrade: a step that does not give the next schemaVersion is refused", async () => {
  const { v0 } = await example();
  const broken = checkChain({
    current: 1,
    steps: [{ ...RENAME_PHASES, upgrade: (d: JsonObject) => d }],
  });
  assertThrows(
    () => upgradeDefinition(v0, broken),
    Error,
    "did not give schemaVersion 1",
  );
});

// --- the factory's arguments, as swamp's upgrades run them ---------------------

Deno.test("upgrade: a factory's arguments keep their identity when nothing applies", async () => {
  const { v1, scenarios } = await example();
  const current = { definition: v1, tracker: "board", scenarios };
  assertStrictEquals(upgradeFactoryArguments(current), current);
  const empty = { tracker: "board" };
  assertStrictEquals(upgradeFactoryArguments(empty), empty);
});

Deno.test("upgrade: a factory's definition and saved scenarios are upgraded by the same steps, and still pass", async () => {
  const { v0, v0Scenarios, v1, scenarios } = await example();
  const args = { definition: v0, tracker: "board", scenarios: v0Scenarios };
  const before = structuredClone(args);
  const upgraded = upgradeFactoryArguments(args, V0);
  assertEquals(upgraded, { definition: v1, tracker: "board", scenarios });
  assertEquals(args, before);
  // Running it again (swamp replays every entry past an instance's
  // typeVersion) changes nothing more.
  assertStrictEquals(upgradeFactoryArguments(upgraded, V0), upgraded);
  // Dispatch is unchanged: every saved scenario passes on the upgrade.
  const read = readDefinition(upgraded.definition, V0);
  assert(read.ok);
  for (const raw of upgraded.scenarios as unknown[]) {
    const scenario = parseScenario(raw);
    assert(scenario.ok, JSON.stringify(scenario));
    const result = await runScenario(read.value, scenario.value);
    assert(result.passed, JSON.stringify(result.failures));
  }
});

/** An issue sink that keeps what it is given. */
function sink() {
  const messages: string[] = [];
  return {
    messages,
    addIssue: (issue: { message: string }) => void messages.push(issue.message),
  };
}

const THROWS = checkChain({
  current: 1,
  steps: [{
    ...RENAME_PHASES,
    upgrade: (): JsonObject => {
      throw new Error("no phases to rename");
    },
    upgradeScenarios: (): Json[] => {
      throw new Error("a scenario names no phase");
    },
  }],
});

Deno.test("upgrade: upgradeOrPass hands the schema a version it does not read, and reports a failed step itself", async () => {
  const newer = { schemaVersion: DEFINITION_SCHEMA_VERSION + 1 };
  const quiet = sink();
  assertStrictEquals(upgradeOrPass(newer, quiet), newer);
  assertEquals(quiet.messages, []);
  const { v0 } = await example();
  const told = sink();
  assertStrictEquals(upgradeOrPass(v0, told, THROWS), v0);
  assertEquals(told.messages.length, 1);
  assert(told.messages[0].includes("no phases to rename"), told.messages[0]);
});

Deno.test("upgrade: a failed step names what it failed on: the definition or the saved scenarios", async () => {
  const { v0, v0Scenarios } = await example();
  const onDefinition = assertThrows(
    () => upgradeDefinition(v0, THROWS),
    UpgradeError,
    "failed on this definition: no phases to rename",
  );
  assertEquals(onDefinition.path, "(root)");
  const scenariosOnly = checkChain({
    current: 1,
    steps: [{
      ...RENAME_PHASES,
      upgradeScenarios: THROWS.steps[0].upgradeScenarios,
    }],
  });
  const onScenarios = assertThrows(
    () =>
      upgradeFactoryArguments(
        { definition: v0, scenarios: v0Scenarios },
        scenariosOnly,
      ),
    UpgradeError,
    "failed on the saved scenarios: a scenario names no phase",
  );
  assertEquals(onScenarios.path, "scenarios");
  const newer = assertThrows(
    () => upgradeDefinition({ schemaVersion: DEFINITION_SCHEMA_VERSION + 1 }),
    UpgradeError,
  );
  assertEquals(newer.path, "schemaVersion");
});

// --- a pinned copy -------------------------------------------------------------

/** A run pinned to `definition` as stored, at version 1. */
async function pinnedRun(definition: unknown): Promise<RunRecord> {
  return {
    key: "team-1",
    factory: "team",
    definition: { digest: await digestOf(definition), version: 1 },
  } as unknown as RunRecord;
}

Deno.test("pinned: a copy pinned at an older schemaVersion matches its digest as stored, and is read upgraded and never rewritten", async () => {
  const { v0, v1 } = await example();
  const record = { factory: "team", digest: "x", definition: jsonSafe(v0) };
  const stored = JSON.stringify(record);
  const run = await pinnedRun(v0);
  const pinned = await checkPinned(record, run, V0);
  const direct = parseDefinition(v1);
  assert(direct.ok);
  assertEquals(pinned.definition, direct.value);
  assertEquals(pinned.digest, run.definition.digest);
  assertEquals(JSON.stringify(record), stored);
});

Deno.test("pinned: a copy that is not the one recorded fails on its digest before it is parsed", async () => {
  const { v0, v1 } = await example();
  const run = await pinnedRun(v0);
  // Valid at the current version, but not what was pinned.
  await assertRejects(
    () => checkPinned({ factory: "team", definition: v1 }, run, V0),
    Error,
    "does not match the digest the run recorded",
  );
  // Not a definition at all, and still a digest mismatch first.
  await assertRejects(
    () => checkPinned({ factory: "team", definition: { x: 1 } }, run, V0),
    Error,
    "does not match the digest the run recorded",
  );
});

Deno.test("pinned: a copy at a version newer than the runtime is refused by name", async () => {
  const newer = { schemaVersion: DEFINITION_SCHEMA_VERSION + 1, stages: [] };
  await assertRejects(
    async () =>
      await checkPinned(
        { factory: "team", definition: newer },
        await pinnedRun(newer),
      ),
    Error,
    "needs a newer @swamp/stagecraft",
  );
});

Deno.test("studio: a card pinned at an older schemaVersion carries the digest of its current form", async () => {
  const { v0, v1 } = await example();
  const run = await startedRun(v1);
  const v0Run = {
    ...run,
    definition: { digest: await digestOf(v0), version: 1 },
  };
  const read = readDefinition(v0, V0);
  assert(read.ok);
  const card = await boardCard(
    v0Run,
    read.value,
    memoryStore(),
    testEnv(),
  );
  // The factory file's digest, as the page computes it from its parse.
  const current = parseDefinition(v1);
  assert(current.ok);
  assertEquals(card.pinnedDigest, await digestOf(current.value));
  assert(card.pinnedDigest !== v0Run.definition.digest);
});

/** A run started on `definition` in memory, as a scenario starts one. */
async function startedRun(definition: unknown): Promise<RunRecord> {
  const parsed = parseDefinition(definition);
  assert(parsed.ok);
  const result = await runScenario(parsed.value, {
    scenario: "started",
    steps: [{ expect: { stage: "draft" } }],
  });
  return result.frames[0].run;
}
