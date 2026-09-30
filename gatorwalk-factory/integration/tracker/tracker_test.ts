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
  projectedDefinition,
} from "../../extensions/models/_lib/tracker/core/test_support.ts";
import { BUILTIN_TYPE } from "../../extensions/models/_lib/tracker/backends/builtin.ts";
import { LINEAR_TYPE } from "../../extensions/models/_lib/tracker/backends/linear.ts";
import { SWAMP_CLUB_TYPE } from "../../extensions/models/_lib/tracker/backends/swamp_club.ts";
import {
  splitWords,
  SWAMP_EXTENSIONS_DEFINITION,
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
          "--log",
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
          "--log",
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
      await repo.factory("projected", projectedDefinition());
      const key = await repo.newKey("projected", "Projected work");
      await repo.workItem(key, "start", {
        factory: "projected",
        externalRefs: JSON.stringify({ linear: ISSUE_UUID }),
      });
      await repo.workItem(key, "advance", {
        transition: "submit",
        ...await repo.expected(key),
      });

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
      const publish = () =>
        repo.swamp([
          "model",
          "method",
          "run",
          "linear",
          "publish",
          "--input",
          `workItem=${key}`,
          "--log",
        ]);

      await publish();
      assertEquals(
        fake.comments.map((c) => c.body.split("\n")[0]),
        [
          `**${key}** started on definition \`projected\`, at stage **write**.`,
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

Deno.test("tracker: claim starts a work item from a Lab issue once, and hands back a reservation after an interrupted start", async () => {
  const fake = swampClubFake();
  const issue = String(LAB_ISSUE);
  try {
    await withRepo(async (repo) => {
      await labAdapter(repo, fake.url);
      await repo.factory(
        "team",
        parseYaml(await Deno.readTextFile(MINIMAL)),
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
          "--log",
        ]);
      const printed = (output: string) => {
        const match = output.match(/Start it: (swamp .* --log)/);
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
// Driving a Lab issue end to end (swamp-club #2734). A stand-in for
// @swamp/issue-lifecycle, added as a second extension source, is run by
// direct type execution as the real one is, so claim's guard is checked
// against the auto-definition swamp writes. Then a work item on the bundled
// swamp-club-swamp-extensions factory definition goes from claim to notify
// against the Lab fake, published after each move.
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
        parseYaml(await Deno.readTextFile(MINIMAL)),
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
        "--log",
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

const COMMIT = "c5aaad329c9ceb4edc0504a98ff5d6e5528ac8fd";
const PR = "https://git.swamp-club.com/swamp-club/swamp-extensions/pulls/346";

Deno.test("tracker: a work item drives a Lab issue from claim to notify, as issue-lifecycle would", async () => {
  const fake = swampClubFake();
  const issue = String(LAB_ISSUE);
  try {
    await withRepo(async (repo) => {
      await labAdapter(repo, fake.url);
      // The bundled factory definition, with merge's cooldown cut to a second.
      const definition = parseYaml(
        await Deno.readTextFile(SWAMP_EXTENSIONS_DEFINITION),
      ) as { stages: { id: string; transitions?: unknown[] }[] };
      const merge = definition.stages.find((s) => s.id === "merge");
      for (const t of merge?.transitions ?? []) {
        for (
          const g of (t as {
            gates?: { type: string; config: Record<string, unknown> }[];
          }).gates ?? []
        ) {
          if (g.type === "cooldown") g.config.seconds = 1;
        }
      }
      await repo.factory("process", definition);

      const lab = (method: string, inputs: Record<string, string>) =>
        repo.swamp([
          "model",
          "method",
          "run",
          "lab",
          method,
          ...Object.entries(inputs).flatMap((
            [k, v],
          ) => ["--input", `${k}=${v}`]),
          "--log",
        ]);
      const claimed = await lab("claim", {
        issue: `#${issue}`,
        factory: "process",
      });
      const command = claimed.output.match(/Start it: (swamp .* --log)/);
      assert(command !== null, claimed.output);
      await repo.swamp(splitWords(command[1]).slice(1));
      const key = String((await repo.data("lab", `ticket-${issue}`)).key);
      await lab("assign", { issue, username: "seth" });

      const statuses: string[] = [];
      const publish = async () => {
        await lab("publish", { workItem: key });
        const now = fake.issues[0].status;
        if (statuses.at(-1) !== now) statuses.push(now);
      };
      const record = async (
        kind: "artifact" | "evidence",
        name: string,
        payload: Record<string, unknown>,
      ) =>
        await repo.workItem(key, `record_${kind}`, {
          name,
          payload: JSON.stringify(payload),
          ...await repo.expected(key),
        });
      const approve = async (gateId: string) =>
        await repo.workItem(key, "approve", {
          gateId,
          ...await repo.expected(key),
        });
      const go = async (transition: string) => {
        await repo.workItem(key, "advance", {
          transition,
          ...await repo.expected(key),
        });
        await publish();
      };

      await publish();
      await record("evidence", "classification", {
        type: "bug",
        confidence: "high",
        reasoning: "503 is never retried",
        isRegression: false,
      });
      await go("bug");
      await record("evidence", "reproduction", {
        reproduced: true,
        commands: ["deno test"],
        observed: "1 failed",
        expected: "a retry",
        fixScope: "vault/aws-sm",
      });
      await go("reproduced");
      await record("artifact", "plan", {
        summary: "Retry on 503",
        scopeAnalysis: "One vault extension",
        steps: [{ order: 1, description: "Retry", files: ["x.ts"] }],
        testingStrategy: "A mock server",
      });
      await go("submit");
      await record("artifact", "plan-review", { findings: [] });
      await approve("plan-approval");
      await go("approve");
      await record("artifact", "change-summary", {
        summary: "Retry on 503",
        commit: COMMIT,
        branch: "fix-retry",
        files: ["x.ts"],
      });
      await go("submit");
      await record("artifact", "conformance", {
        steps: [{ order: 1, status: "implemented", description: "Retry" }],
      });
      await go("conforms");
      await record("evidence", "verification", {
        status: "succeeded",
        runId: "w1",
        commit: COMMIT,
        buildStatus: "succeeded",
        buildRunId: "b1",
        reviewsStatus: "succeeded",
        reviewsRunId: "v1",
      });
      await approve("checklist-confirmed");
      await go("passed");

      // attest: through the adapter, recording the id it returns.
      await lab("post_attestation", {
        attestation: JSON.stringify({
          version: "1",
          subject: { commit: COMMIT, branch: "fix-retry" },
          gate: { allPassed: true },
        }),
      });
      const attestation = await repo.data("lab", `attestation-${COMMIT}`);
      await record("evidence", "attestation", {
        attestationId: String(attestation.id),
        commit: COMMIT,
        buildRunId: "b1",
        reviewsRunId: "v1",
      });
      await approve("open-pr");
      await go("attested");
      await record("evidence", "pull-request", { url: PR, commit: COMMIT });
      await go("opened");
      await record("evidence", "merge", {
        status: "merged",
        mergeCommit: COMMIT,
      });
      await new Promise((resolve) => setTimeout(resolve, 1100));
      await go("merged");
      await record("evidence", "release", { outcome: "shipped" });
      await go("released");

      // notify: the adapter checks the roster and thanks an outsider.
      const thanked = await lab("thank_author", {
        issue,
        summary: "Retry on 503",
        prUrl: PR,
      });
      assert(thanked.output.includes("thanked @outsider"), thanked.output);
      await record("evidence", "notification", {
        action: "posted",
        author: "outsider",
        reason: "not on the swamp-club team",
      });
      await go("notified");

      assertEquals(fake.entries.map((e) => [e.step, e.targetStatus]), [
        ["assigned", "open"],
        ["triage_started", "open"],
        ["classified", "triaged"],
        ["plan_generated", "triaged"],
        ["adversarial_review", "triaged"],
        ["plan_approved", "in_progress"],
        ["implementation_started", "in_progress"],
        ["code_conformance_review", "in_progress"],
        ["verification_started", "in_progress"],
        ["verification_passed", "in_progress"],
        ["attestation_posted", "in_progress"],
        ["pr_linked", "in_progress"],
        ["pr_merged", "in_progress"],
        ["shipped", "shipped"],
        ["contributor_notified", "shipped"],
      ]);
      const classified = fake.entries.find((e) => e.step === "classified");
      assertEquals(classified?.summary, "Classified as bug (high)");
      assertEquals(fake.issues[0].type, "bug", "triage set the type");
      assertEquals(
        fake.requests.filter((r) =>
          r.method === "PATCH" &&
          (r.body as { type?: unknown }).type !== undefined
        ).length,
        1,
      );
      assertEquals(statuses, ["open", "triaged", "in_progress", "shipped"]);
      assertEquals(fake.attestations.length, 1);
      assertEquals(fake.comments.map((c) => c.body.split("!")[0]), [
        "Thanks @outsider for reporting this",
      ]);

      // A re-run posts nothing new.
      const writes = fake.requests.filter((r) => r.method !== "GET").length;
      await publish();
      assertEquals(
        fake.requests.filter((r) => r.method !== "GET").length,
        writes,
      );
    });
  } finally {
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

Deno.test("tracker: the built-in tracker files a ticket, claims it and takes a work item's projection, with no network", async () => {
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
    await repo.factory("entries", entriesDefinition());

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
        "--log",
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
    const command = claimed.output.match(/Start it: (swamp .* --log)/);
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
    // work_started, noted and review_started.
    assertEquals(entries.length, 3, entries.join(", "));

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
