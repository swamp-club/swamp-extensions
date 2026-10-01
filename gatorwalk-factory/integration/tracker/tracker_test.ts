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
import { parse as parseYaml, stringify as stringifyYaml } from "@std/yaml";
import {
  FAKE_TOKEN,
  ISSUE_UUID,
  linearFake,
} from "../../extensions/models/_lib/tracker/backends/linear_fake.ts";
import {
  ADMIN_KEY,
  LAB_ISSUE,
  swampClubFake,
} from "../../extensions/models/_lib/tracker/backends/swamp_club_fake.ts";
import {
  entriesDefinition,
  trackedDefinition,
} from "../../extensions/models/_lib/tracker/core/test_support.ts";
import { BUILTIN_TYPE } from "../../extensions/models/_lib/tracker/backends/builtin.ts";
import { LINEAR_TYPE } from "../../extensions/models/_lib/tracker/backends/linear.ts";
import { SWAMP_CLUB_TYPE } from "../../extensions/models/_lib/tracker/backends/swamp_club.ts";
import {
  readExample,
  splitWords,
  type SwampRepo,
  withRepo,
} from "../harness.ts";

// ---------------------------------------------------------------------------
// The Linear adapter on the real engine: its token comes from a vault made
// inside the temp repo (a local_encryption vault keeps its key there too, so
// no vault of the host is touched), and it talks to the local Linear fake.
// This is the only test of vault wiring: that swamp resolves the vault.get
// expression at run time, and that the token stays out of the definition
// and the run's output.
// ---------------------------------------------------------------------------

Deno.test("tracker: the Linear adapter takes its token from a vault and delivers a keyed comment once", async () => {
  const fake = linearFake();
  try {
    await withRepo(async (repo) => {
      await repo.swamp(["vault", "create", "local_encryption", "secrets"]);
      await repo.swamp(["vault", "put", "secrets", "linear-token", FAKE_TOKEN]);

      const { stdout } = await repo.swamp([
        "model",
        "create",
        LINEAR_TYPE,
        "linear",
        "--json",
      ]);
      const path = (JSON.parse(stdout) as { path: string }).path;
      const definition = parseYaml(await Deno.readTextFile(path)) as Record<
        string,
        unknown
      >;
      definition.globalArguments = {
        apiToken: "${{ vault.get(secrets, linear-token) }}",
        apiUrl: fake.url,
        statuses: { started: "In Progress" },
      };
      await Deno.writeTextFile(path, stringifyYaml(definition));

      const method = (name: string, inputs: Record<string, string>) =>
        repo.swamp([
          "model",
          "method",
          "run",
          "linear",
          name,
          ...Object.entries(inputs).flatMap((
            [k, v],
          ) => ["--input", `${k}=${v}`]),
        ]);

      const fetched = await method("fetch_issue", { issue: "GW-16" });
      assert(fetched.output.includes(ISSUE_UUID), fetched.output);
      assertEquals(fake.requests[0].authorization, FAKE_TOKEN);

      const key = { workItem: "build-abcdefgh", journalVersion: "3" };
      const first = await method("comment", {
        issue: ISSUE_UUID,
        body: "Planned",
        ...key,
      });
      const second = await method("comment", {
        issue: ISSUE_UUID,
        body: "Planned",
        ...key,
      });
      assertEquals(fake.comments.length, 1);
      assert(second.output.includes("already delivered"), second.output);
      const ledger = await repo.data(
        "linear",
        "delivery-comment-build-abcdefgh-3",
      );
      assertEquals(
        (ledger.result as { id: string }).id,
        fake.comments[0].id,
      );

      await method("set_status", { issue: ISSUE_UUID, status: "started" });
      assertEquals(fake.issues[0].stateId, "state-progress");

      for (const result of [fetched, first, second]) {
        assert(!result.output.includes(FAKE_TOKEN), "the token is not output");
      }
      assert(
        !(await Deno.readTextFile(path)).includes(FAKE_TOKEN),
        "the definition keeps the vault expression, not the token",
      );
    });
  } finally {
    await fake.close();
  }
});

Deno.test("tracker: the swamp-club adapter takes its key from a vault, ripples once per key and posts an attestation once", async () => {
  const fake = swampClubFake();
  const issue = String(LAB_ISSUE);
  const commit = "0123456789abcdef0123456789abcdef01234567";
  try {
    await withRepo(async (repo) => {
      await repo.swamp(["vault", "create", "local_encryption", "secrets"]);
      await repo.swamp(["vault", "put", "secrets", "lab-key", ADMIN_KEY]);

      const { stdout } = await repo.swamp([
        "model",
        "create",
        SWAMP_CLUB_TYPE,
        "lab",
        "--json",
      ]);
      const path = (JSON.parse(stdout) as { path: string }).path;
      const definition = parseYaml(await Deno.readTextFile(path)) as Record<
        string,
        unknown
      >;
      // The key and url are always set, so neither the host's
      // SWAMP_API_KEY (scrubbed anyway) nor its auth.json is read.
      definition.globalArguments = {
        apiKey: "${{ vault.get(secrets, lab-key) }}",
        url: fake.url,
      };
      await Deno.writeTextFile(path, stringifyYaml(definition));

      const method = (name: string, inputs: Record<string, string>) =>
        repo.swamp([
          "model",
          "method",
          "run",
          "lab",
          name,
          ...Object.entries(inputs).flatMap((
            [k, v],
          ) => ["--input", `${k}=${v}`]),
        ]);

      const fetched = await method("fetch_issue", { issue: `#${issue}` });
      assert(fetched.output.includes(`#${issue} (${issue})`), fetched.output);
      const snapshot = await repo.data("lab", `issue-${issue}`);
      assertEquals(snapshot.tracker, "swamp-club");
      assertEquals(fake.requests[0].authorization, `Bearer ${ADMIN_KEY}`);

      const key = { workItem: "build-abcdefgh", journalVersion: "3" };
      const first = await method("comment", {
        issue,
        body: "Planned",
        ...key,
      });
      const second = await method("comment", {
        issue,
        body: "Planned",
        ...key,
      });
      assertEquals(fake.comments.length, 1);
      assert(second.output.includes("already delivered"), second.output);
      const ledger = await repo.data(
        "lab",
        "delivery-comment-build-abcdefgh-3",
      );
      assertEquals((ledger.result as { id: string }).id, fake.comments[0].id);

      await method("set_status", { issue, status: "in_progress" });
      assertEquals(fake.issues[0].status, "in_progress");

      await method("assign", { issue, username: "seth" });
      assertEquals(fake.issues[0].assignees.map((a) => a.username), ["seth"]);

      const attestation = JSON.stringify({
        version: "1",
        subject: { commit, branch: "main" },
        gate: { allPassed: true },
      });
      const posted = await method("post_attestation", { attestation });
      const repeat = await method("post_attestation", { attestation });
      assertEquals(fake.attestations.length, 1);
      assert(repeat.output.includes("already posted"), repeat.output);
      const record = await repo.data("lab", `attestation-${commit}`);
      assertEquals(record.id, fake.attestations[0].id);
      for (const result of [posted, repeat]) {
        assert(result.output.includes(`as ${record.id}`), result.output);
      }

      for (const result of [fetched, first, second, posted, repeat]) {
        assert(!result.output.includes(ADMIN_KEY), "the key is not output");
      }
      assert(
        !(await Deno.readTextFile(path)).includes(ADMIN_KEY),
        "the definition keeps the vault expression, not the key",
      );
    });
  } finally {
    await fake.close();
  }
});

// ---------------------------------------------------------------------------
// Publish on the real engine: the Linear adapter reads a work item that is
// another model instance (context.readModelData), replays its journal to
// the local Linear fake, and a re-run delivers only what is new.
// ---------------------------------------------------------------------------

Deno.test("tracker: publish replays a work item's journal to its Linear issue, once", async () => {
  const fake = linearFake();
  try {
    await withRepo(async (repo) => {
      const { stdout } = await repo.swamp([
        "model",
        "create",
        LINEAR_TYPE,
        "linear",
        "--json",
      ]);
      const path = (JSON.parse(stdout) as { path: string }).path;
      const definition = parseYaml(await Deno.readTextFile(path)) as Record<
        string,
        unknown
      >;
      definition.globalArguments = {
        apiToken: FAKE_TOKEN,
        apiUrl: fake.url,
        statuses: {
          in_progress: "In Progress",
          in_review: "In Review",
          shipped: "Done",
        },
      };
      await Deno.writeTextFile(path, stringifyYaml(definition));
      await repo.factory(
        "tracked",
        { ...trackedDefinition(), tracker: { kind: "linear" } },
        { tracker: "linear" },
      );
      const key = await repo.newKey("tracked", "Tracked work");
      await repo.workItem(key, "start", {
        factory: "tracked",
        externalRefs: JSON.stringify({ linear: ISSUE_UUID }),
      });
      await repo.workItem(key, "advance", {
        transition: "submit",
        ...await repo.expected(key),
      });
      const publish = () =>
        repo.swamp([
          "model",
          "method",
          "run",
          "linear",
          "publish",
          "--input",
          `workItem=${key}`,
        ]);

      await publish();
      assertEquals(
        fake.comments.map((c) => c.body.split("\n")[0]),
        [
          `**${key}** started in factory \`tracked\`, at stage **write**.`,
          `**${key}** entered **review** (cycle 1) by \`submit\`.`,
          `**${key}** is waiting on a person in **review**:`,
        ],
      );
      assertEquals(fake.issues[0].stateId, "state-review");

      const again = await publish();
      assert(again.output.includes("is up to date"), again.output);
      assertEquals(fake.comments.length, 3);

      await repo.workItem(key, "approve", {
        gateId: "ship-approval",
        ...await repo.expected(key),
      });
      await repo.workItem(key, "advance", {
        transition: "ship",
        ...await repo.expected(key),
      });
      await publish();
      assertEquals(fake.comments.length, 5, "only the new events");
      assert(fake.comments[4].body.includes("finished at **done** by `ship`"));
      assertEquals(fake.issues[0].stateId, "state-done");
      const cursor = await repo.data("linear", `cursor-${key}`);
      assertEquals(cursor.status, "shipped");
      assertEquals(cursor.journalVersion, (await repo.run(key)).journal.length);
    });
  } finally {
    await fake.close();
  }
});

/** A swamp-club adapter named lab on the fake, its key from a vault. */
async function labAdapter(repo: SwampRepo, url: string): Promise<void> {
  await repo.swamp(["vault", "create", "local_encryption", "secrets"]);
  await repo.swamp(["vault", "put", "secrets", "lab-key", ADMIN_KEY]);
  const { stdout } = await repo.swamp([
    "model",
    "create",
    SWAMP_CLUB_TYPE,
    "lab",
    "--json",
  ]);
  const path = (JSON.parse(stdout) as { path: string }).path;
  const definition = parseYaml(await Deno.readTextFile(path)) as Record<
    string,
    unknown
  >;
  definition.globalArguments = {
    apiKey: "${{ vault.get(secrets, lab-key) }}",
    url,
  };
  await Deno.writeTextFile(path, stringifyYaml(definition));
}

const MINIMAL = new URL(
  "../../.claude/skills/gatorwalk-factory/references/examples/minimal.yaml",
  import.meta.url,
);

// ---------------------------------------------------------------------------
// The tracker binding on the real engine: validate checks the bound
// instance's model type against the definition's kind, and status reads the
// bound instance's publish cursor across instances to show the lag.
// ---------------------------------------------------------------------------

Deno.test("tracker: validate refuses a Lab factory definition bound to a Linear instance", async () => {
  await withRepo(async (repo) => {
    await repo.swamp(["model", "create", LINEAR_TYPE, "linear", "--json"]);
    await repo.factory(
      "process",
      { ...trackedDefinition(), tracker: { kind: "swamp-club" } },
      { tracker: "linear" },
    );
    const result = await repo.factoryMethod("process", "validate", {
      allowFailure: true,
    });
    assert(result.code !== 0, result.output);
    assert(
      result.output.includes(
        "factory 'process' has a definition for a swamp-club tracker, which " +
          "is a @swamp/gatorwalk-factory/swamp-club, but its tracker 'linear' " +
          "is a @swamp/gatorwalk-factory/linear",
      ),
      result.output,
    );
  });
});

Deno.test("tracker: status shows the Lab issue behind until publish runs, then nothing", async () => {
  const fake = swampClubFake();
  try {
    await withRepo(async (repo) => {
      await labAdapter(repo, fake.url);
      const minimal = (await readExample(MINIMAL)).definition;
      await repo.factory(
        "small",
        { ...minimal, tracker: { kind: "swamp-club" } },
        { tracker: "lab" },
      );
      const key = await repo.newKey("small", "Small work");
      await repo.workItem(key, "start", {
        factory: "small",
        externalRefs: JSON.stringify({ "swamp-club": String(LAB_ISSUE) }),
      });
      const length = (await repo.run(key)).journal.length;
      const behind = await repo.workItem(key, "status");
      assert(
        behind.output.includes(
          `tracker 'lab' behind by ${length} event(s): run publish on it`,
        ),
        behind.output,
      );

      await repo.swamp([
        "model",
        "method",
        "run",
        "lab",
        "publish",
        "--input",
        `workItem=${key}`,
      ]);
      const after = await repo.workItem(key, "status");
      assert(after.output.includes(`${key}: active`), after.output);
      assert(!after.output.includes("tracker 'lab'"), after.output);
    });
  } finally {
    await fake.close();
  }
});

Deno.test("tracker: claim starts a work item from a Lab issue once, and hands back a reservation after an interrupted start", async () => {
  const fake = swampClubFake();
  const issue = String(LAB_ISSUE);
  try {
    await withRepo(async (repo) => {
      await labAdapter(repo, fake.url);
      await repo.factory(
        "team",
        {
          ...(await readExample(MINIMAL)).definition,
          tracker: { kind: "swamp-club" },
        },
        { tracker: "lab" },
      );
      const claim = (inputs: Record<string, string>) =>
        repo.swamp([
          "model",
          "method",
          "run",
          "lab",
          "claim",
          ...Object.entries(inputs).flatMap((
            [k, v],
          ) => ["--input", `${k}=${v}`]),
        ]);
      const printed = (output: string) => {
        const match = output.match(/Start it: (swamp .*)$/m);
        assert(match !== null, output);
        return match[1];
      };

      const first = await claim({ issue: `#${issue}`, factory: "team" });
      const command = printed(first.output);
      const index = await repo.data("lab", `ticket-${issue}`);
      const key = String(index.key);
      assert(key.startsWith(`${issue}-lab-adapter-`), key);
      assertEquals(index.factory, "team");
      assert(first.output.includes(`is claimed as '${key}'`), first.output);

      // The start never ran: claiming again hands back the same key.
      const again = await claim({ issue });
      assert(again.output.includes("not started yet"), again.output);
      assertEquals(printed(again.output), command);

      // The printed command, as written.
      await repo.swamp(splitWords(command).slice(1));
      const run = await repo.run(key);
      assertEquals(run.externalRefs, {
        "swamp-club": issue,
        "swamp-club.display": `#${issue}`,
      });

      // Read across models on the real engine: the ticket finds its item.
      const started = await claim({ issue: `#${issue}`, factory: "team" });
      assert(
        started.output.includes(
          `is already started: '${key}' at stage 'work'`,
        ),
        started.output,
      );
      assertEquals((await repo.data("lab", `ticket-${issue}`)).key, key);
      assertEquals(fake.comments.length, 0, "claim never writes the ticket");
    });
  } finally {
    await fake.close();
  }
});

// ---------------------------------------------------------------------------
// claim's issue-lifecycle guard on a Lab issue (swamp-club #2734). A stand-in
// for @swamp/issue-lifecycle, added as a second extension source, is run by
// direct type execution as the real one is, so claim's guard is checked
// against the auto-definition swamp writes.
// ---------------------------------------------------------------------------

const ISSUE_LIFECYCLE_STUB = `import { z } from "npm:zod@4.3.6";

export const model = {
  type: "@swamp/issue-lifecycle",
  version: "2026.09.29.1",
  globalArguments: z.object({}),
  resources: {
    state: {
      description: "The phase, as issue-lifecycle keeps it",
      schema: z.object({ phase: z.string(), issueNumber: z.number() }),
      lifetime: "infinite" as const,
      garbageCollection: 5,
    },
  },
  methods: {
    start: {
      description: "Start, as issue-lifecycle's start does",
      arguments: z.object({ issueNumber: z.coerce.number() }),
      execute: async (
        args: { issueNumber: number },
        ctx: {
          writeResource(s: string, n: string, d: unknown): Promise<unknown>;
        },
      ) => ({
        dataHandles: [
          await ctx.writeResource("state", "state-main", {
            phase: "triaging",
            issueNumber: args.issueNumber,
          }),
        ],
      }),
    },
  },
};
`;

Deno.test("tracker: claim refuses a Lab issue that issue-lifecycle drives in the repository", async () => {
  const fake = swampClubFake();
  const stub = await Deno.makeTempDir({ prefix: "gatorwalk-il-stub-" });
  const issue = String(LAB_ISSUE);
  try {
    await Deno.mkdir(`${stub}/extensions/models`, { recursive: true });
    await Deno.writeTextFile(
      `${stub}/extensions/models/issue_lifecycle.ts`,
      ISSUE_LIFECYCLE_STUB,
    );
    await withRepo(async (repo) => {
      await repo.swamp(["extension", "source", "add", stub]);
      await labAdapter(repo, fake.url);
      await repo.factory(
        "team",
        (await readExample(MINIMAL)).definition,
      );
      await repo.swamp([
        "model",
        "@swamp/issue-lifecycle",
        "method",
        "run",
        "start",
        `issue-${issue}`,
        "--input",
        `issueNumber=${issue}`,
      ]);
      const refused = await repo.swamp([
        "model",
        "method",
        "run",
        "lab",
        "claim",
        "--input",
        `issue=${issue}`,
        "--input",
        "factory=team",
      ], { allowFailure: true });
      assert(refused.code !== 0, refused.output);
      assert(
        refused.output.includes(
          `driven by issue-lifecycle here (instance ` +
            `'issue-${issue}')`,
        ),
        refused.output,
      );
      assertEquals(
        await repo.versions("lab"),
        {},
        "a refused claim writes nothing",
      );
    });
  } finally {
    await Deno.remove(stub, { recursive: true });
    await fake.close();
  }
});

// ---------------------------------------------------------------------------
// The built-in tracker on the real engine, with no network: a ticket is
// filed, claimed (its first work item takes the ticket's id), started with
// the printed command and published in entry mode, so the entries, the type
// and the status land on the ticket's own records. Once the work item
// finishes, the ticket claims a new one under a <prefix>-<slug>-<rnd> key.
// ---------------------------------------------------------------------------

Deno.test("tracker: the built-in tracker files a ticket, claims it and takes a work item's history, with no network", async () => {
  await withRepo(async (repo) => {
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
      types: ["bug", "feature"],
    };
    await Deno.writeTextFile(path, stringifyYaml(definition));
    await repo.factory("entries", entriesDefinition(), { tracker: "board" });

    const board = (method: string, inputs: Record<string, string>) =>
      repo.swamp([
        "model",
        "method",
        "run",
        "board",
        method,
        ...Object.entries(inputs).flatMap((
          [k, v],
        ) => ["--input", `${k}=${v}`]),
      ]);

    const created = await board("create", {
      title: "Board shortcuts",
      body: "Keys for the board.",
      type: "bug",
    });
    const id = created.output.match(/created (cue-board-shortcuts-[a-z2-7]{4})/)
      ?.[1];
    assert(id !== undefined, created.output);
    assertEquals((await repo.data("board", `issue-${id}`)).origin, "builtin");

    const claimed = await board("claim", { issue: id, factory: "entries" });
    assert(claimed.output.includes(`is claimed as '${id}'`), claimed.output);
    const command = claimed.output.match(/Start it: (swamp .*)$/m);
    assert(command !== null, claimed.output);
    await repo.swamp(splitWords(command[1]).slice(1));
    const key = id;
    assertEquals((await repo.run(key)).externalRefs, {
      builtin: id,
      "builtin.display": id,
    });

    await repo.workItem(key, "record_artifact", {
      name: "note",
      payload: JSON.stringify({ text: "a plan", type: "feature" }),
      ...await repo.expected(key),
    });
    await repo.workItem(key, "advance", {
      transition: "submit",
      ...await repo.expected(key),
    });
    await board("publish", { workItem: key });
    const ticket = await repo.data("board", `issue-${id}`);
    assertEquals(ticket.type, "feature");
    assertEquals(ticket.status, { id: "in_review", name: "in_review" });
    const entries = Object.keys(await repo.versions("board")).filter((n) =>
      n.startsWith(`entry-${id}-`)
    );
    // work_started, noted and review_started, and assigned after the first
    // when the host has a stored login: publish assigns the ticket to its
    // user, from whichever server (the suite runs on the caller's HOME).
    const assignees = ticket.assignees as string[] | undefined;
    if (assignees !== undefined) assertEquals(assignees.length, 1);
    assertEquals(
      entries.length,
      assignees === undefined ? 3 : 4,
      entries.join(", "),
    );

    const again = await board("publish", { workItem: key });
    assert(again.output.includes("is up to date"), again.output);

    await repo.workItem(key, "approve", {
      gateId: "ship-approval",
      ...await repo.expected(key),
    });
    await repo.workItem(key, "advance", {
      transition: "ship",
      ...await repo.expected(key),
    });
    const next = await board("claim", { issue: id, factory: "entries" });
    const index = await repo.data("board", `ticket-${id}`);
    const nextKey = String(index.key);
    assert(/^cue-board-shortcuts-[a-z2-7]{4}$/.test(nextKey), nextKey);
    assert(nextKey !== id, nextKey);
    assertEquals(index.previous, [id]);
    assert(next.output.includes(`'${id}', has finished`), next.output);
  });
});
