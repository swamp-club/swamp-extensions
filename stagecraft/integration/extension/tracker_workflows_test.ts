// Copyright (C) 2026 System Initiative, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import { assert, assertEquals } from "@std/assert";
import { parse as parseYaml, stringify as stringifyYaml } from "@std/yaml";
import { entriesDefinition } from "../../extensions/models/_lib/tracker/core/test_support.ts";
import { BUILTIN_TYPE } from "../../extensions/models/_lib/tracker/backends/builtin.ts";
import { type SwampRepo, withRepo } from "../harness.ts";
import { fromFileUrl } from "@std/path";
import { trackedDefinition } from "../../extensions/models/_lib/tracker/core/test_support.ts";
import { PUBLISHER_TYPE } from "../../extensions/models/_lib/engine/tracker_binding.ts";

/** The example tracker written as a separate extension (examples/). */
const NOTES = fromFileUrl(
  new URL("../../examples/notes-tracker/", import.meta.url),
);

// ---------------------------------------------------------------------------
// The shipped tracker workflows on the real engine (swamp-club #3274): a run
// is rounds of the bound instance's round method and the tracker's operate,
// written out as jobs. These drive the built-in tracker with no network,
// through the workflows alone: create, claim, publish.
// ---------------------------------------------------------------------------

/** Run a shipped tracker workflow; a failed run throws with its output. */
async function workflow(
  repo: SwampRepo,
  name: string,
  inputs: Record<string, string>,
  options: { allowFailure?: boolean } = {},
) {
  return await repo.swamp([
    "workflow",
    "run",
    `@swamp/stagecraft/${name}`,
    ...Object.entries(inputs).flatMap(([k, v]) => ["--input", `${k}=${v}`]),
    "--json",
  ], options);
}

async function board(repo: SwampRepo): Promise<void> {
  const { stdout } = await repo.swamp([
    "model",
    "create",
    BUILTIN_TYPE,
    "board",
    "--json",
  ]);
  const path = (JSON.parse(stdout) as { path: string }).path;
  const definition = parseYaml(await Deno.readTextFile(path)) as Record<
    string,
    unknown
  >;
  definition.globalArguments = {
    prefix: "cue",
    statuses: ["open", "triaged", "in_progress", "in_review", "shipped"],
    types: ["bug", "feature", "security"],
  };
  await Deno.writeTextFile(path, stringifyYaml(definition));
}

Deno.test("tracker workflows: create, claim and publish a built-in ticket through the shipped workflows alone", async () => {
  await withRepo(async (repo) => {
    await board(repo);
    await repo.factory("entries", entriesDefinition(), { tracker: "board" });

    await workflow(repo, "create", {
      tracker: "board",
      title: "Board shortcuts",
      body: "Keys for the board.",
      type: "bug",
    });
    const id = "cue-1";
    assertEquals((await repo.data("board", `issue-${id}`)).origin, "builtin");

    await workflow(repo, "claim", {
      tracker: "board",
      issue: id,
      factory: "entries",
    });
    assertEquals((await repo.data("board", `ticket-${id}`)).key, id);
    await repo.workItem(id, "start", {
      factory: "entries",
      externalRefs: JSON.stringify({ builtin: id, "builtin.display": id }),
    });

    await repo.workItem(id, "record_artifact", {
      name: "note",
      payload: JSON.stringify({ text: "a plan", type: "feature" }),
      ...await repo.expected(id),
    });
    await repo.workItem(id, "advance", {
      transition: "submit",
      ...await repo.expected(id),
    });
    await workflow(repo, "publish", { tracker: "board", workItem: id });
    const ticket = await repo.data("board", `issue-${id}`);
    assertEquals(ticket.type, "feature");
    assertEquals(ticket.status, { id: "in_review", name: "in_review" });
    const entries = async () =>
      Object.keys(await repo.versions("board")).filter((n) =>
        n.startsWith(`entry-${id}-`)
      );
    const assignees = ticket.assignees as string[] | undefined;
    const delivered = await entries();
    assertEquals(
      delivered.length,
      assignees === undefined ? 3 : 4,
      delivered.join(", "),
    );
    assertEquals(
      (await repo.data("board", `cursor-${id}`)).status,
      "in_review",
    );

    // A second run finds everything delivered, and the status unchanged.
    await workflow(repo, "publish", { tracker: "board", workItem: id });
    assertEquals((await entries()).length, delivered.length);
  });
});

Deno.test("tracker workflows: a run that stops fails its check with the reason", async () => {
  await withRepo(async (repo) => {
    await board(repo);
    await repo.factory("entries", entriesDefinition(), { tracker: "board" });
    await repo.workItem("cue-x", "start", { factory: "entries" });
    // No ticket: publish refuses the work item, and the run says why.
    const run = await workflow(
      repo,
      "publish",
      { tracker: "board", workItem: "cue-x" },
      { allowFailure: true },
    );
    assert(run.code !== 0, run.output);
    assert(run.output.includes("has no externalRefs.builtin"), run.output);
  });
});

Deno.test("tracker workflows: the built-in tracker passes the conformance workflow on the real engine", async () => {
  await withRepo(async (repo) => {
    await board(repo);
    const started = Date.now();
    const run = await workflow(repo, "conformance", {
      tracker: "board",
      statusNames: "in_progress,shipped",
      createType: "bug",
      missing: "cue-missing-aaaa",
      entryStatus: "open",
      entryTypes: "feature,security",
      user: "seth",
    }, { allowFailure: true });
    console.log(
      `conformance took ${Math.round((Date.now() - started) / 1000)}s`,
    );
    assertEquals(run.code, 0, run.output.slice(-4000));
  });
});

// ---------------------------------------------------------------------------
// A tracker written as a separate extension, end to end: the notes tracker
// (examples/notes-tracker), which shares no code with stagecraft, behind a
// publisher. A factory written for it binds, validates, files, claims,
// starts and publishes, and the tracker passes the conformance workflow.
// ---------------------------------------------------------------------------

async function notes(repo: SwampRepo): Promise<void> {
  await repo.swamp(["extension", "source", "add", NOTES]);
  await repo.swamp([
    "model",
    "create",
    "@acme/notes-tracker",
    "notes",
    "--json",
  ]);
  await repo.swamp(["model", "method", "run", "notes", "describe"]);
  const { stdout } = await repo.swamp([
    "model",
    "create",
    PUBLISHER_TYPE,
    "notes-pub",
    "--json",
  ]);
  const path = (JSON.parse(stdout) as { path: string }).path;
  const definition = parseYaml(await Deno.readTextFile(path)) as Record<
    string,
    unknown
  >;
  definition.globalArguments = {
    tracker: "notes",
    prefix: "n",
    statuses: { in_progress: "doing", in_review: "doing", shipped: "done" },
  };
  await Deno.writeTextFile(path, stringifyYaml(definition));
}

Deno.test("tracker workflows: a tracker written as a separate extension is bound, validated, claimed and published to through a publisher", async () => {
  await withRepo(async (repo) => {
    await notes(repo);
    await repo.factory(
      "team",
      { ...trackedDefinition(), tracker: { kind: "notes" } },
      { tracker: "notes-pub" },
    );
    const validated = await repo.factoryMethod("team", "validate");
    assert(
      validated.output.includes("tracker 'notes-pub' (notes)"),
      validated.output,
    );

    await workflow(repo, "create", {
      tracker: "notes-pub",
      title: "Notes search",
      type: "feature",
    });
    const snapshot = await repo.data("notes-pub", "issue-n-1");
    assertEquals([snapshot.origin, snapshot.tracker, snapshot.display], [
      "snapshot",
      "notes",
      "N-1",
    ]);

    await workflow(repo, "claim", {
      tracker: "notes-pub",
      issue: "N-1",
      factory: "team",
    });
    const key = String((await repo.data("notes-pub", "ticket-n-1")).key);
    await repo.workItem(key, "start", {
      factory: "team",
      externalRefs: JSON.stringify({ notes: "n-1", "notes.display": "N-1" }),
    });
    await repo.workItem(key, "advance", {
      transition: "submit",
      ...await repo.expected(key),
    });
    await workflow(repo, "publish", { tracker: "notes-pub", workItem: key });
    const ticket = await repo.data("notes", "ticket-n-1");
    assertEquals(ticket.status, "doing");
    const comments = (ticket.activity as { body: string }[]).map((a) =>
      a.body.split("\n")[0]
    );
    assertEquals(comments.length, 3, comments.join("\n"));
    assert(comments[0].includes("started in factory `team`"), comments[0]);
    // The publisher keeps the ledger and the cursor; the tracker its tickets.
    assertEquals(
      (await repo.data("notes-pub", `cursor-${key}`)).status,
      "in_review",
    );
    const status = await repo.workItem(key, "status");
    assert(!status.output.includes("behind by"), status.output);

    await workflow(repo, "publish", { tracker: "notes-pub", workItem: key });
    const again = await repo.data("notes", "ticket-n-1");
    assertEquals((again.activity as unknown[]).length, 3, "nothing new");
  });
});

Deno.test("tracker workflows: the notes tracker passes the conformance workflow through its publisher", async () => {
  await withRepo(async (repo) => {
    await notes(repo);
    const run = await workflow(repo, "conformance", {
      tracker: "notes-pub",
      statusNames: "doing,done",
      createType: "bug",
      missing: "n-999999",
    }, { allowFailure: true });
    assertEquals(run.code, 0, run.output.slice(-4000));
  });
});

Deno.test("tracker workflows: a factory for a tracker its publisher does not reach is refused, naming both", async () => {
  await withRepo(async (repo) => {
    await notes(repo);
    await repo.factory(
      "jira-team",
      { ...trackedDefinition(), tracker: { kind: "jira" } },
      { tracker: "notes-pub" },
    );
    const refused = await repo.factoryMethod("jira-team", "validate", {
      allowFailure: true,
    });
    assert(refused.code !== 0, refused.output);
    assert(
      refused.output.includes("which is the notes tracker"),
      refused.output,
    );
  });
});

Deno.test("tracker workflows: a long catch-up makes a round's many writes in order, and finishes in one run", async () => {
  await withRepo(async (repo) => {
    await board(repo);
    // A loop the work item goes round many times, so one publish has many
    // events to deliver: more than ten in a round, which swamp would run out
    // of order if the workflow iterated the calls by their place in a list.
    const definition = trackedDefinition() as {
      stages: Record<string, unknown>[];
    };
    for (const stage of definition.stages) {
      if (stage.terminal !== true) stage.maxCycles = 20;
    }
    await repo.factory("loops", definition, { tracker: "board" });
    await workflow(repo, "create", {
      tracker: "board",
      title: "Many loops",
      type: "bug",
    });
    const id = "cue-1";
    await repo.workItem(id, "start", {
      factory: "loops",
      externalRefs: JSON.stringify({ builtin: id, "builtin.display": id }),
    });
    for (let n = 0; n < 6; n++) {
      await repo.workItem(id, "advance", {
        transition: "submit",
        ...await repo.expected(id),
      });
      await repo.workItem(id, "advance", {
        transition: "again",
        confirm: "true",
        ...await repo.expected(id),
      });
    }
    const run = await workflow(repo, "publish", {
      tracker: "board",
      workItem: id,
    });
    const comments = Object.keys(await repo.versions("board")).filter((n) =>
      n.startsWith(`comment-${id}-`)
    );
    assert(comments.length > 15, `${comments.length} comments`);
    // Every planned write was made in its round: none waited on a write
    // swamp had not made yet.
    const jobs = (JSON.parse(run.stdout) as {
      jobs: { name: string; steps: { name: string; status: string }[] }[];
    }).jobs;
    const skipped = jobs.filter((j) => j.name.startsWith("write-"))
      .flatMap((j) => j.steps).filter((step) => step.status === "skipped");
    assertEquals(skipped.map((step) => step.name), []);
    const journal = (await repo.run(id)).journal.length;
    assertEquals(
      (await repo.data("board", `cursor-${id}`)).journalVersion,
      journal,
    );
  });
});
