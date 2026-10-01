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

// Simulate mode's state on a served file that changes: the server is a stub
// of fetch that answers with whatever text the test has saved last.

import { assert, assertEquals } from "@std/assert";
import {
  copyEntry,
  discardWalk,
  frameIndex,
  frames,
  goFrame,
  loadDefinitionFile,
  pickScenario,
  playing,
  runs,
  scenario,
  selectFactory,
  setPlaying,
  stale,
  takeStep,
  walk,
  walkPlayed,
} from "./state.ts";
import { exampleText, modelPath, raisePlanLimit } from "./test_support.ts";

const NAME = "build-swamp-extension";

async function served(run: (save: (text: string) => void) => Promise<void>) {
  let text = "";
  const real = globalThis.fetch;
  globalThis.fetch = () =>
    Promise.resolve(
      new Response(
        JSON.stringify({ path: modelPath(NAME), text, digest: "sha256:x" }),
        { headers: { "content-type": "application/json" } },
      ),
    );
  try {
    await run((next) => (text = next));
  } finally {
    globalThis.fetch = real;
  }
}

const churn = () => runs.value?.find((r) => r.name === "plan-churn");

Deno.test("state: a reload re-runs the scenarios and replays the walk; a broken file keeps the last results", async () => {
  const text = await exampleText(NAME);
  await served(async (save) => {
    save(text);
    await selectFactory(NAME);
    assertEquals(runs.value?.map((r) => [r.name, r.ok && r.played.passed]), [
      ["plan-churn", true],
      ["plan-to-release", true],
    ]);
    assertEquals(scenario.value, "plan-churn");

    // Branch before the fifth revise and try approve instead.
    pickScenario("plan-churn");
    goFrame(15);
    await takeStep({ move: "approve" });
    assertEquals(walk.value?.branchAt, 15);
    assertEquals(frames.value.length, 17);
    assertEquals(frameIndex.value, 16);
    assert(frames.value[16].refused);
    assert(copyEntry.value?.passed, JSON.stringify(copyEntry.value));

    // The agent raises plan's cycle limit: the scenario's expected refusal
    // now goes through, and the walk replays on the new definition.
    const before = walkPlayed.value;
    save(raisePlanLimit(text));
    await loadDefinitionFile();
    const run = churn();
    assert(run?.ok);
    assert(!run.played.passed);
    assert(
      run.played.failures.some((f) => f.step === 16),
      JSON.stringify(run.played.failures),
    );
    assert(walkPlayed.value !== before);
    assertEquals(walk.value?.steps, [{ move: "approve" }]);

    // A file that fails the schema keeps the last results, marked stale.
    const last = runs.value;
    save(text.replace("initial: true", "initial: maybe"));
    await loadDefinitionFile();
    assert(stale.value);
    assertEquals(runs.value, last);
  });
});

Deno.test("state: a step taken while a reload runs keeps the reload's results, and the walk ends on the new definition", async () => {
  const text = await exampleText(NAME);
  await served(async (save) => {
    save(text);
    await selectFactory(NAME);
    pickScenario("plan-churn");
    goFrame(15);
    // The agent saves while the person takes a step: neither is lost.
    save(raisePlanLimit(text));
    const reload = loadDefinitionFile();
    const step = takeStep({ move: "approve" });
    await Promise.all([reload, step]);
    const run = churn();
    assert(run?.ok);
    assert(!run.played.passed, "the reload's results were kept");
    assertEquals(walk.value?.steps, [{ move: "approve" }]);
    assertEquals(walkPlayed.value?.frames.length, 17);
    assertEquals(frameIndex.value, 16);
  });
});

Deno.test("state: a walk discarded while its step is still playing leaves nothing behind", async () => {
  const text = await exampleText(NAME);
  await served(async (save) => {
    save(text);
    await selectFactory(NAME);
    pickScenario("plan-churn");
    goFrame(15);
    const step = takeStep({ move: "approve" });
    discardWalk();
    await step;
    assertEquals(walk.value, null);
    assertEquals(walkPlayed.value, null);
    assertEquals(copyEntry.value, null);
    assertEquals(frames.value.length, 22);
  });
});

Deno.test("state: stepping or jumping pauses playback, and a new step's Copy entry waits for it", async () => {
  const text = await exampleText(NAME);
  await served(async (save) => {
    save(text);
    await selectFactory(NAME);
    pickScenario("plan-churn");
    setPlaying(true);
    goFrame(15);
    assertEquals(playing.value, false);

    await takeStep({ move: "approve" });
    assert(copyEntry.value !== null);
    // While the next step plays, the last walk's entry is not offered.
    const step = takeStep({ wait: 60 });
    assertEquals(copyEntry.value, null);
    await step;
    assert(copyEntry.value?.text.includes("wait: 60"));
  });
});
