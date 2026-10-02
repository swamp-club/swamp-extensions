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

import { assert, assertEquals } from "@std/assert";
import { parse as parseYaml } from "@std/yaml";
import { readWorkItem } from "../../extensions/models/_lib/engine/studio_work_item.ts";
import {
  LOOPED_REVIEW,
  scenarioItem,
} from "../../extensions/models/_lib/engine/studio_work_items_testing.ts";
import { testEnv } from "../../extensions/models/_lib/engine/test_support.ts";
import type { Scenario } from "../../extensions/models/_lib/engine/scenario.ts";
import { itemReferenceLine } from "./reference.ts";
import { entryYaml } from "./simulate.ts";
import { exampleText, loadOk } from "./test_support.ts";
import {
  activityLabel,
  copyIsCurrent,
  followActive,
  type Item,
  itemOverlay,
  loadItem,
  pinnedDiffers,
  replay,
  runAsScenario,
  runMark,
  ticketRefs,
  timelineOf,
  titleOf,
  waiting,
  webLink,
} from "./work_item.ts";

// The work-item page's logic on real runs: a saved scenario played on the
// engine and stored as a work item, read through the route's own reader,
// sent as JSON, as the page receives it.

const BUILD = "build-swamp-extension.yaml";

async function item(
  scenario: string | Scenario,
  key = "team-item-abcd",
): Promise<Item> {
  const stored = await scenarioItem(BUILD, scenario, key);
  const data = await readWorkItem(stored.query, key, testEnv(), {
    payloads: true,
  });
  assert(data !== null);
  return loadItem(JSON.parse(JSON.stringify(data)));
}

Deno.test("work item page: a looped review shows the visits, the path and the person it waits on", async () => {
  const it = await item(LOOPED_REVIEW);
  const o = itemOverlay(it);
  assertEquals(o.current, "plan-review");
  assertEquals(o.entries, { plan: 2, "plan-review": 2 });
  assertEquals(o.taken.get("plan:submit"), 2);
  assertEquals(o.taken.get("plan-review:rework"), 1);
  assertEquals(o.moved, {
    from: "plan",
    transition: "submit",
    to: "plan-review",
  });
  assertEquals(o.exits.get("approve")?.state, "person");
  const w = waiting(it);
  assertEquals(w.stage, "plan-review");
  assertEquals(w.cycle, 2);
  // The approve exit, and the global abandon exit, are a person's to open.
  assertEquals(w.person.map((p) => [p.exit, p.gates]), [
    ["approve", ["plan-approval"]],
    ["abandon", ["abandon-confirmation"]],
  ]);
  assertEquals(w.terminal, false);
  // Waiting since the person was first needed, not since the item started.
  assert(Date.parse(w.since) > Date.parse(it.data.run.journal[0].at));
});

Deno.test("work item page: the run is one Simulate frame, with its metrics", async () => {
  const it = await item(LOOPED_REVIEW);
  assertEquals(it.frame.run, it.data.run);
  assertEquals(it.frame.readiness, it.data.readiness);
  assertEquals(it.frame.metrics.summary.rework.reentries, 2);
  assertEquals(
    it.view.stages.map((s) => s.id),
    it.definition.stages.map((s) => s.id),
  );
});

Deno.test("work item page: the timeline is the journal, each entry at its stage", async () => {
  const it = await item(LOOPED_REVIEW);
  const t = timelineOf(it.data.run);
  assertEquals(t.length, it.data.run.journal.length);
  const rework = t.find((e) => e.text.startsWith("rework →"));
  assertEquals(rework?.stage, "plan");
  assert(t.every((e) => !e.earlier));
});

Deno.test("work item page: the title is the run's own, else its key", async () => {
  const it = await item(LOOPED_REVIEW);
  assertEquals(titleOf(it.data.run), "team-item-abcd");
  assertEquals(titleOf({ ...it.data.run, title: "Add list" }), "Add list");
});

Deno.test("work item page: the tracker refs leave out the key, which the built-in tracker uses as the ticket's id", async () => {
  const it = await item(LOOPED_REVIEW);
  const run = it.data.run;
  assertEquals(
    ticketRefs({
      ...run,
      externalRefs: { builtin: run.key, "builtin.display": run.key },
    }),
    [],
  );
  assertEquals(
    ticketRefs({
      ...run,
      externalRefs: { linear: "a1b2c3", "linear.display": "ABC-12" },
    }),
    [["linear", "a1b2c3"], ["linear.display", "ABC-12"]],
  );
});

Deno.test("work item page: the frame and the copied scenario name the work by its title, else its key", async () => {
  const it = await item(LOOPED_REVIEW);
  assertEquals(it.frame.label, "team-item-abcd now");
  assertEquals(
    runAsScenario(it, it.data.payloads!).entry.description,
    "Copied from work item team-item-abcd at stage plan-review.",
  );
  const titled = loadItem(JSON.parse(JSON.stringify({
    ...it.data,
    run: { ...it.data.run, title: "Add list" },
  })));
  assertEquals(titled.frame.label, "Add list now");
  const { entry } = runAsScenario(titled, it.data.payloads!);
  assertEquals(
    entry.description,
    "Copied from work item 'Add list' (team-item-abcd) at stage plan-review.",
  );
  // The scenario's name stays the key: it is an identifier.
  assertEquals(entry.scenario, "team-item-abcd-run");
});

Deno.test("work item page: the pinned digest is the one the page computes from the unchanged file, and differs once the file changes", async () => {
  const it = await item(LOOPED_REVIEW);
  const file = await loadOk("build-swamp-extension");
  assertEquals(file.view.digest, it.data.pinned.digest);
  assertEquals(pinnedDiffers(it, file.view.digest), false);
  const text = (await exampleText("build-swamp-extension")).replace(
    "Plan the change to the extension.",
    "Plan the change to the extension, carefully.",
  );
  assert(text.includes("carefully"));
  const changed = await loadOk("build-swamp-extension", text);
  assert(pinnedDiffers(it, changed.view.digest));
  assertEquals(pinnedDiffers(it, null), false);
});

Deno.test("work item page: the run copied as a scenario replays to where the run is", async () => {
  const it = await item(LOOPED_REVIEW);
  const { entry, notes } = runAsScenario(it, it.data.payloads!);
  assertEquals(notes, []);
  assertEquals(entry.steps.at(-1), { expect: { stage: "plan-review" } });
  assertEquals(
    entry.steps.filter((s) => s.move !== undefined).map((s) => s.move),
    ["submit", "rework", "submit"],
  );
  // The payloads are the stored versions the journal names.
  const records = entry.steps.filter((s) => s.record !== undefined);
  assertEquals(records.length, 4);
  assert(records.every((s) => s.payload !== undefined));
  assertEquals(await replay(it, entry), { passed: true, problem: null });
  // The YAML is one list item, as Simulate's Copy as scenario gives it.
  const parsed = parseYaml(entryYaml(entry)) as unknown[];
  assertEquals(parsed.length, 1);
});

Deno.test("work item page: a churned plan, with its cycle override and wait, replays too", async () => {
  const it = await item("plan-churn");
  const { entry, notes } = runAsScenario(it, it.data.payloads!);
  assertEquals(notes, []);
  assert(entry.steps.some((s) => s.override?.stage === "plan"));
  assert(entry.steps.some((s) => s.wait !== undefined));
  // A manual transition is moved with a person's go.
  assert(entry.steps.some((s) => s.move === "revise" && s.manual === true));
  assertEquals(await replay(it, entry), { passed: true, problem: null });
});

Deno.test("work item page: what a scenario cannot carry is a note, and a stored payload that changed is left out", async () => {
  const it = await item(LOOPED_REVIEW);
  const run = structuredClone(it.data.run);
  const base = run.journal[run.journal.length - 1];
  run.journal.push(
    { ...base, type: "dispatched", dispatchId: 1 },
    {
      ...base,
      type: "override",
      overrideId: 9,
      kind: "dispatch",
      for: "plan-review",
    },
  );
  const payloads = it.data.payloads!.map((p, i) =>
    i === 0 ? { ...p, payload: null } : p
  );
  const changed: Item = { ...it, data: { ...it.data, run, payloads } };
  const { notes, entry } = runAsScenario(changed, payloads);
  assertEquals(notes.length, 3);
  assert(notes[0].startsWith("artifact plan v1 is left out"));
  assert(notes.some((n) => n.startsWith("1 dispatch(es) are left out")));
  assert(notes.some((n) => n.includes("dispatch cap")));
  const replayed = await replay(changed, entry);
  assertEquals(replayed.passed, false);
  assert(replayed.problem !== null);
});

Deno.test("work item page: Copy reference names the work item, where it is and how to ask status", async () => {
  const it = await item(LOOPED_REVIEW);
  const run = it.data.run;
  const facts = {
    key: run.key,
    title: "Add list",
    factory: run.factory,
    stage: run.stage,
    cycle: 2,
  };
  assertEquals(
    itemReferenceLine(facts),
    "work item team-item-abcd ('Add list') of factory team, at stage " +
      "plan-review cycle 2: swamp model @swamp/stagecraft/work-item method " +
      "run status team-item-abcd",
  );
  assertEquals(
    itemReferenceLine(
      { ...facts, title: run.key },
      it.definition,
      { kind: "stage", stage: "plan" },
    ),
    "work item team-item-abcd of factory team, at stage plan-review cycle " +
      "2: swamp model @swamp/stagecraft/work-item method run status " +
      "team-item-abcd · on its pinned definition: stage plan",
  );
});

Deno.test("work item page: waiting since is the earliest hold that has begun, never a cooldown still running", async () => {
  const it = await item(LOOPED_REVIEW);
  const run = structuredClone(it.data.run);
  const last = run.journal[run.journal.length - 1];
  const at = Date.parse(it.data.at);
  const iso = (ms: number) => new Date(at + ms).toISOString();
  run.journal.push({
    at: iso(-60_000),
    era: run.era,
    stage: run.stage,
    cycle: last.cycle,
    actor: last.actor,
    type: "awaiting",
    exits: [
      // Lifts later than the other, and one still to lift: neither is since.
      {
        transition: "approve",
        to: "implement",
        manual: false,
        gateIds: [],
        readyAt: iso(-10_000),
      },
      {
        transition: "abandon",
        to: "abandoned",
        manual: false,
        gateIds: [],
        readyAt: iso(-30_000),
      },
      {
        transition: "later",
        to: "implement",
        manual: false,
        gateIds: [],
        readyAt: iso(600_000),
      },
    ],
  });
  const w = waiting({ ...it, data: { ...it.data, run } });
  assertEquals(w.since, iso(-30_000));
});

Deno.test("work item page: waiting since is when a hold ended, not the hold itself; a cooldown not lifted yet changes nothing", async () => {
  const it = await item(LOOPED_REVIEW);
  const at = Date.parse(it.data.at);
  const iso = (ms: number) => new Date(at + ms).toISOString();
  const last = it.data.run.journal[it.data.run.journal.length - 1];
  const awaiting = (when: number, readyAt?: number) => ({
    at: iso(when),
    era: it.data.run.era,
    stage: it.data.run.stage,
    cycle: last.cycle,
    actor: last.actor,
    type: "awaiting" as const,
    exits: readyAt === undefined ? [] : [{
      transition: "approve",
      to: "implement",
      manual: false,
      gateIds: [],
      readyAt: iso(readyAt),
    }],
  });
  const sinceWith = (...events: ReturnType<typeof awaiting>[]) => {
    const run = structuredClone(it.data.run);
    run.journal.push(...events);
    return waiting({ ...it, data: { ...it.data, run } }).since;
  };
  // Held from -60s, then the hold ended at -20s.
  assertEquals(
    sinceWith(awaiting(-60_000, -60_000), awaiting(-20_000)),
    iso(-20_000),
  );
  // Held from -60s, then an exit whose cooldown lifts later: still -60s.
  assertEquals(
    sinceWith(awaiting(-60_000, -60_000), awaiting(-20_000, 600_000)),
    iso(-60_000),
  );
});

Deno.test("work item page: the timeline follows new entries only from the last one", () => {
  assertEquals(followActive(4, 5, 7), 6);
  assertEquals(followActive(2, 5, 7), 2);
  assertEquals(followActive(4, 5, 5), 4);
});

Deno.test("work item page: a scenario copy is the page's until the journal moves past it", async () => {
  const it = await item(LOOPED_REVIEW);
  const run = it.data.run;
  const longer = (n: number) => ({
    ...run,
    journal: [...run.journal, ...run.journal.slice(0, n)],
  });
  const asked = runMark(run);
  // Its payload read returned a run two entries newer than the page's.
  const copy = { asked, made: runMark(longer(2)) };
  // A live re-read with the same journal, or one catching up, keeps it.
  assert(copyIsCurrent(copy, structuredClone(run)));
  assert(copyIsCurrent(copy, longer(2)));
  // In between, or past it, the copy is made again.
  assert(!copyIsCurrent(copy, longer(1)));
  assert(!copyIsCurrent(copy, longer(3)));
  // Another work item's copy is never this one's.
  assert(!copyIsCurrent(copy, { ...run, key: `${run.key}-2` }));
});

Deno.test("work item page: only an http(s) ticket URL is a link", () => {
  assert(webLink("https://linear.app/team/issue/ENG-1"));
  assert(webLink("http://localhost:8080/issues/1"));
  for (
    const bad of [
      undefined,
      "javascript:alert(1)",
      "data:text/html,x",
      "ENG-1",
      "",
    ]
  ) {
    assert(!webLink(bad), String(bad));
  }
});

Deno.test("work item: each ticket comment or entry says what it is in words", () => {
  const at = "2026-09-29T00:00:00.000Z";
  assertEquals(
    activityLabel({
      kind: "comment",
      author: "sam",
      body: "",
      at,
      byStagecraft: false,
    }),
    { text: "comment by sam", kind: "person" },
  );
  assertEquals(
    activityLabel({ kind: "comment", body: "", at, byStagecraft: false }),
    { text: "comment", kind: "person" },
  );
  assertEquals(
    activityLabel({
      kind: "comment",
      author: "seth",
      body: "",
      at,
      byStagecraft: true,
    }),
    { text: "comment posted by stagecraft", kind: "stagecraft" },
  );
  assertEquals(
    activityLabel({
      kind: "entry",
      step: "plan_generated",
      author: "seth",
      body: "",
      at,
      byStagecraft: false,
    }),
    { text: "lifecycle entry plan_generated · by seth", kind: "entry" },
  );
  assertEquals(
    activityLabel({
      kind: "entry",
      step: "shipped",
      body: "",
      at,
      byStagecraft: true,
    }),
    { text: "lifecycle entry shipped · posted by stagecraft", kind: "entry" },
  );
});
