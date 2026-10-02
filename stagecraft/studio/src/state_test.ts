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
  api,
  board,
  copyEntry,
  discardWalk,
  factories,
  factory,
  flashText,
  frameIndex,
  frames,
  go,
  goFrame,
  listen,
  loadDefinitionFile,
  mode,
  pickScenario,
  playing,
  reloadFactories,
  runs,
  scenario,
  selectFactory,
  setPlaying,
  stale,
  takeStep,
  walk,
  walkPlayed,
  workItemKey,
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
      ["duplicate-exit", true],
      ["duplicate-after-retarget", true],
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

Deno.test("state: a selected factory removed for real says so, and the page moves to the next", async () => {
  const text = await exampleText(NAME);
  let listed = [NAME, "other"];
  const real = globalThis.fetch;
  globalThis.fetch = (input) => {
    const url = String(input);
    const body = url === "/api/factories"
      ? { factories: listed.map((name) => ({ name, path: modelPath(name) })) }
      : { path: modelPath(NAME), text, digest: "sha256:x" };
    return Promise.resolve(
      new Response(JSON.stringify(body), {
        headers: { "content-type": "application/json" },
      }),
    );
  };
  try {
    await selectFactory(NAME);
    await reloadFactories();
    assertEquals(factory.value, NAME);
    assertEquals(flashText.value, null);

    listed = ["other"];
    await reloadFactories();
    assertEquals(flashText.value, `factory '${NAME}' was removed`);
    assertEquals(factory.value, "other");
  } finally {
    globalThis.fetch = real;
  }
});

Deno.test("state: after its event stream reconnects, the page reads the list and the definition again", async () => {
  const text = await exampleText(NAME);
  const asked: string[] = [];
  const realFetch = globalThis.fetch;
  const realEventSource = globalThis.EventSource;
  let stream: EventTarget | undefined;
  globalThis.fetch = (input) => {
    const url = String(input);
    asked.push(url);
    const body = url === "/api/factories"
      ? { factories: [{ name: NAME, path: modelPath(NAME) }] }
      : { path: modelPath(NAME), text, digest: "sha256:x" };
    return Promise.resolve(
      new Response(JSON.stringify(body), {
        headers: { "content-type": "application/json" },
      }),
    );
  };
  globalThis.EventSource = class extends EventTarget {
    constructor() {
      super();
      stream = this;
    }
  } as unknown as typeof EventSource;
  // Until no request has come for a while: a reload may read twice.
  const settled = async () => {
    let seen = -1;
    while (seen !== asked.length) {
      seen = asked.length;
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  };
  try {
    await selectFactory(NAME);
    listen();
    asked.length = 0;
    // The first connection reads nothing again.
    stream!.dispatchEvent(new Event("open"));
    await settled();
    assertEquals(asked, []);

    stream!.dispatchEvent(new Event("error"));
    stream!.dispatchEvent(new Event("open"));
    await settled();
    assertEquals(asked[0], "/api/factories");
    assert(asked.includes(api(NAME)), JSON.stringify(asked));

    // An open with no error before it does not.
    asked.length = 0;
    stream!.dispatchEvent(new Event("open"));
    await settled();
    assertEquals(asked, []);
  } finally {
    globalThis.fetch = realFetch;
    globalThis.EventSource = realEventSource;
  }
});

// --- the address -------------------------------------------------------------------

/** A browser's address bar and history, for the routing tests. */
function withAddress(start: string) {
  const g = globalThis as unknown as Record<string, unknown>;
  const before = { location: g.location, history: g.history };
  const pushed: string[] = [];
  const location = { pathname: start };
  g.location = location;
  g.history = {
    pushState: (_: unknown, __: string, href: string) => {
      pushed.push(href);
      location.pathname = href;
    },
    replaceState: (_: unknown, __: string, href: string) => {
      location.pathname = href;
    },
  };
  return {
    location,
    pushed,
    restore() {
      g.location = before.location;
      g.history = before.history;
      mode.value = "design";
      workItemKey.value = null;
    },
  };
}

Deno.test("state: each view is an address: the tabs and the picker push it, and a work item's page keeps its own", async () => {
  const text = await exampleText(NAME);
  const address = withAddress("/");
  const asked: string[] = [];
  const real = globalThis.fetch;
  globalThis.fetch = (input: string | URL | Request) => {
    const url = String(input);
    asked.push(url);
    const body = url.startsWith("/api/work-items")
      ? { factory: NAME, items: [], problems: [] }
      : { path: modelPath(NAME), text, digest: "sha256:x" };
    return Promise.resolve(
      new Response(JSON.stringify(body), {
        headers: { "content-type": "application/json" },
      }),
    );
  };
  try {
    await selectFactory(NAME, "push");
    assertEquals(address.location.pathname, `/f/${NAME}/design`);
    await go({ view: "board", factory: NAME });
    assertEquals(mode.value, "board");
    assertEquals(address.location.pathname, `/f/${NAME}/board`);
    // Asking for the board keeps the server's poll of its work items alive.
    for (let i = 0; i < 10 && board.value === null; i++) {
      await new Promise((r) => setTimeout(r, 0));
    }
    assert(asked.includes(`/api/work-items?factory=${NAME}`), asked.join());
    assertEquals(board.value?.factory, NAME);
    await go({ view: "work-item", key: "team-a" });
    assertEquals([mode.value, workItemKey.value], ["work-item", "team-a"]);
    assertEquals(address.location.pathname, "/w/team-a");
    // The picker on a work item's page leaves its address alone.
    await selectFactory(NAME, "push");
    assertEquals(address.location.pathname, "/w/team-a");
    assertEquals(address.pushed, [
      `/f/${NAME}/design`,
      `/f/${NAME}/board`,
      "/w/team-a",
    ]);
    // Going to the view already shown adds no entry.
    await go({ view: "work-item", key: "team-a" });
    assertEquals(address.pushed.length, 3);
  } finally {
    globalThis.fetch = real;
    address.restore();
  }
});

Deno.test("state: an address naming a factory the repo does not have says so", async () => {
  const address = withAddress("/");
  try {
    factories.value = [{ name: NAME, path: modelPath(NAME) }];
    await go({ view: "simulate", factory: "nobody" });
    assertEquals(mode.value, "simulate");
    assert(factory.value !== "nobody");
    assertEquals(flashText.value, "no factory named 'nobody'");
  } finally {
    address.restore();
  }
});
