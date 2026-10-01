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

import { assert, assertEquals, assertRejects } from "@std/assert";
import {
  model,
  refuseIssueLifecycle,
  SwampClubArgumentsSchema,
  swampClubMethods,
} from "./swamp_club.ts";
import {
  type AuthFile,
  type CredentialSources,
  SWAMP_CLUB_TYPE,
} from "../_lib/tracker/backends/swamp_club.ts";
import {
  ADMIN_KEY,
  LAB_ISSUE,
  type SwampClubFake,
  swampClubFake,
} from "../_lib/tracker/backends/swamp_club_fake.ts";
import {
  type FakeSwamp,
  fakeSwamp,
  smallDefinition,
} from "../_lib/engine/tracker_testing.ts";
import {
  entriesDefinition,
  linkingDefinition,
  TRACKED_ITEM,
  trackedItem,
} from "../_lib/tracker/core/test_support.ts";
import { TrackerError } from "../_lib/tracker/core/adapter.ts";

const INSTANCE = "lab";
const ISSUE = String(LAB_ISSUE);
const COMMIT = "0123456789abcdef0123456789abcdef01234567";

type Methods = ReturnType<typeof swampClubMethods>;

/** Sources that never reach the host's environment or auth.json. */
function sources(
  env: Record<string, string> = {},
  file: AuthFile | null = null,
): CredentialSources {
  return {
    env: (name) => env[name],
    readAuthFile: () => Promise.resolve(file),
  };
}

async function call(
  methods: Methods,
  swamp: FakeSwamp,
  name: keyof Methods,
  raw: Record<string, unknown>,
) {
  const method = methods[name];
  const execute = method.execute as (
    args: unknown,
    ctx: ReturnType<FakeSwamp["context"]>,
  ) => Promise<unknown>;
  return await execute(method.arguments.parse(raw), swamp.context(INSTANCE));
}

async function withLab(
  globalArgs: (fake: SwampClubFake) => Record<string, unknown>,
  fn: (swamp: FakeSwamp, fake: SwampClubFake) => Promise<void>,
) {
  const fake = swampClubFake();
  try {
    const swamp = fakeSwamp();
    swamp.globalArgs.set(INSTANCE, globalArgs(fake));
    await fn(swamp, fake);
  } finally {
    await fake.close();
  }
}

const attestation = (branch = "main") => ({
  version: "1",
  subject: { commit: COMMIT, branch },
  gate: { allPassed: true },
});

Deno.test("swamp-club model: the type literal matches SWAMP_CLUB_TYPE", () => {
  assertEquals(model.type, SWAMP_CLUB_TYPE);
});

Deno.test("swamp-club model: apiKey is sensitive, so swamp redacts and vaults it", () => {
  const meta = SwampClubArgumentsSchema.shape.apiKey.unwrap().meta();
  assertEquals(meta?.sensitive, true);
});

Deno.test("swamp-club model: fetch, ripple once per delivery key, and move by the default map", async () => {
  const methods = swampClubMethods({ sources: sources() });
  await withLab(
    (fake) => ({ apiKey: ADMIN_KEY, url: fake.url }),
    async (swamp, fake) => {
      await call(methods, swamp, "fetch_issue", { issue: `#${ISSUE}` });
      const snapshot = swamp.resources.get(INSTANCE)?.get(`issue-${ISSUE}`)
        ?.[0];
      assertEquals(snapshot?.display, `#${ISSUE}`);
      assertEquals(snapshot?.tracker, "swamp-club");
      const refs = swamp.logs.find((l) => l.props?.externalRefs)?.props
        ?.externalRefs;
      assertEquals(
        JSON.parse(String(refs)),
        { "swamp-club": ISSUE, "swamp-club.display": `#${ISSUE}` },
      );

      const key = { workItem: "build-abcdefgh", journalVersion: "7" };
      await call(methods, swamp, "comment", {
        issue: ISSUE,
        body: "Planned",
        ...key,
      });
      await call(methods, swamp, "comment", {
        issue: ISSUE,
        body: "Planned",
        ...key,
      });
      assertEquals(fake.comments.length, 1);

      await call(methods, swamp, "set_status", {
        issue: ISSUE,
        status: "in_progress",
      });
      assertEquals(fake.issues[0].status, "in_progress");

      const logged = JSON.stringify(swamp.logs);
      assert(!logged.includes(ADMIN_KEY), "the key is never logged");
    },
  );
});

Deno.test("swamp-club model: a custom status map, and names that are not Lab statuses", async () => {
  const methods = swampClubMethods({ sources: sources() });
  await withLab(
    (fake) => ({
      apiKey: ADMIN_KEY,
      url: fake.url,
      // A JSON string, as --global-arg passes it.
      statuses: JSON.stringify({ started: "in_progress" }),
    }),
    async (swamp, fake) => {
      await call(methods, swamp, "set_status", {
        issue: ISSUE,
        status: "started",
      });
      assertEquals(fake.issues[0].status, "in_progress");
      const unmapped = await assertRejects(
        () =>
          call(methods, swamp, "set_status", { issue: ISSUE, status: "open" }),
        TrackerError,
      );
      assert(unmapped.message.includes("mapped: started"), unmapped.message);

      swamp.globalArgs.set(INSTANCE, {
        apiKey: ADMIN_KEY,
        url: fake.url,
        statuses: { started: "In Progress" },
      });
      const bad = await assertRejects(
        () =>
          call(methods, swamp, "set_status", {
            issue: ISSUE,
            status: "started",
          }),
        TrackerError,
      );
      assertEquals(bad.kind, "invalid");
      assert(bad.message.includes("started: In Progress"), bad.message);
    },
  );
});

Deno.test("swamp-club model: credentials come from SWAMP_API_KEY, then the stored login", async () => {
  await withLab(() => ({}), async (swamp, fake) => {
    const fromEnv = swampClubMethods({
      sources: sources({ SWAMP_API_KEY: ADMIN_KEY, SWAMP_CLUB_URL: fake.url }),
    });
    await call(fromEnv, swamp, "fetch_issue", { issue: ISSUE });
    assertEquals(fake.requests[0].authorization, `Bearer ${ADMIN_KEY}`);

    const fromFile = swampClubMethods({
      sources: sources({}, { serverUrl: fake.url, apiKey: ADMIN_KEY }),
    });
    await call(fromFile, swamp, "fetch_issue", { issue: ISSUE });
    assertEquals(fake.requests.length, 2);

    const none = swampClubMethods({ sources: sources() });
    const error = await assertRejects(
      () => call(none, swamp, "fetch_issue", { issue: ISSUE }),
      TrackerError,
    );
    assertEquals(error.kind, "auth");
    assert(error.message.includes("apiKey global argument"), error.message);
    assertEquals(fake.requests.length, 2);
  });
});

Deno.test("swamp-club model: assign defaults to the stored login's user, on its own server", async () => {
  await withLab(
    (fake) => ({ apiKey: ADMIN_KEY, url: fake.url }),
    async (swamp, fake) => {
      const login = (serverUrl: string) =>
        swampClubMethods({
          sources: sources({}, {
            serverUrl,
            apiKey: "swamp_other",
            username: "seth",
          }),
        });
      await call(login(`${fake.url}/`), swamp, "assign", { issue: ISSUE });
      assertEquals(fake.issues[0].assignees.map((a) => a.username), ["seth"]);

      // A login for another server does not name a user on this one.
      const elsewhere = await assertRejects(
        () =>
          call(login("https://ignored.example"), swamp, "assign", {
            issue: ISSUE,
          }),
        TrackerError,
      );
      assertEquals(elsewhere.kind, "invalid");
      assert(
        elsewhere.message.includes("https://ignored.example"),
        elsewhere.message,
      );
      assert(elsewhere.message.includes("pass username"), elsewhere.message);
      assertEquals(fake.requests.filter((r) => r.method === "PATCH").length, 1);

      await call(login("https://ignored.example"), swamp, "assign", {
        issue: ISSUE,
        username: "skunk-ape",
      });
      assertEquals(fake.issues[0].assignees.map((a) => a.username), [
        "seth",
        "skunk-ape",
      ]);

      const noLogin = swampClubMethods({ sources: sources() });
      await assertRejects(
        () => call(noLogin, swamp, "assign", { issue: ISSUE }),
        TrackerError,
        "no username",
      );
    },
  );
});

Deno.test("swamp-club model: assign says which assignees it dropped", async () => {
  await withLab(
    (fake) => ({ apiKey: ADMIN_KEY, url: fake.url }),
    async (swamp, fake) => {
      fake.issues[0].assignees = [{ userId: "user-gone", username: "gone" }];
      const methods = swampClubMethods({ sources: sources() });
      await call(methods, swamp, "assign", { issue: ISSUE, username: "seth" });
      assertEquals(fake.issues[0].assignees.map((a) => a.username), ["seth"]);
      const summary = String(swamp.logs.at(-1)?.props?.summary);
      assert(summary.includes("assigned #2631 to seth"), summary);
      assert(summary.includes("gone"), summary);
      assert(summary.includes("no longer"), summary);
    },
  );
});

Deno.test("swamp-club model: the same attestation posts once, and both say its id; a rebuilt one posts again", async () => {
  const methods = swampClubMethods({ sources: sources() });
  await withLab(
    (fake) => ({ apiKey: ADMIN_KEY, url: fake.url }),
    async (swamp, fake) => {
      await call(methods, swamp, "post_attestation", {
        attestation: JSON.stringify(attestation()),
      });
      const id = fake.attestations[0].id;
      assertEquals(
        swamp.logs.at(-1)?.props?.summary,
        `posted the attestation for ${COMMIT} as ${id}`,
      );
      await call(methods, swamp, "post_attestation", {
        attestation: attestation(),
      });
      assertEquals(
        swamp.logs.at(-1)?.props?.summary,
        `already posted for ${COMMIT} as ${id}; posted nothing`,
      );
      assertEquals(fake.attestations.length, 1);
      const record = swamp.resources.get(INSTANCE)?.get(
        `attestation-${COMMIT}`,
      );
      assertEquals(record?.length, 1);
      assertEquals(record?.[0].id, fake.attestations[0].id);

      await call(methods, swamp, "post_attestation", {
        attestation: attestation("rebuilt"),
      });
      assertEquals(fake.attestations.length, 2);
      assertEquals(
        swamp.resources.get(INSTANCE)?.get(`attestation-${COMMIT}`)?.length,
        2,
      );
    },
  );
});

Deno.test("swamp-club model: an attestation without a full lowercase commit is refused before any call", async () => {
  const methods = swampClubMethods({ sources: sources() });
  await withLab(
    (fake) => ({ apiKey: ADMIN_KEY, url: fake.url }),
    async (swamp, fake) => {
      for (
        const bad of [
          "not json",
          "[]",
          JSON.stringify({ subject: { commit: COMMIT.slice(0, 12) } }),
          JSON.stringify({ subject: { commit: COMMIT.toUpperCase() } }),
        ]
      ) {
        const error = await assertRejects(
          () => call(methods, swamp, "post_attestation", { attestation: bad }),
          TrackerError,
        );
        assertEquals(error.kind, "invalid");
      }
      assertEquals(fake.requests.length, 0);
    },
  );
});

Deno.test("swamp-club model: publish ripples each event and skips a status the issue cannot move back to", async () => {
  const methods = swampClubMethods({ sources: sources() });
  await withLab(
    (fake) => ({ apiKey: ADMIN_KEY, url: fake.url }),
    async (swamp, fake) => {
      fake.issues[0].status = "shipped";
      await trackedItem(
        swamp,
        { "swamp-club": ISSUE },
        undefined,
        { tracker: INSTANCE, kind: "swamp-club" },
      );
      await call(methods, swamp, "publish", { workItem: TRACKED_ITEM });
      assertEquals(fake.comments.length, 1);
      assert(fake.comments[0].body.includes("started in factory"));
      assertEquals(fake.issues[0].status, "shipped");
      assertEquals(fake.requests.filter((r) => r.method === "PATCH"), []);
      const cursor = swamp.resources.get(INSTANCE)?.get(
        `cursor-${TRACKED_ITEM}`,
      )?.[0];
      assertEquals(cursor?.status, "in_progress");

      // Nothing new: nothing is read or written on the Lab.
      const requests = fake.requests.length;
      await call(methods, swamp, "publish", { workItem: TRACKED_ITEM });
      assertEquals(fake.requests.length, requests);
    },
  );
});

/** A second Lab issue, the primary a duplicate's work moves to. */
const PRIMARY = LAB_ISSUE + 1;

function withPrimary(fake: SwampClubFake): void {
  fake.issues.push({
    number: PRIMARY,
    title: "The primary",
    status: "open",
    assignees: [],
    type: "feature",
  });
}

/** trackedDefinition's status keys, mapped onto Lab statuses. */
const STATUSES = JSON.stringify({
  in_progress: "in_progress",
  in_review: "triaged",
  shipped: "shipped",
});

Deno.test("swamp-club model: publish after a retarget writes new events to the new issue only", async () => {
  const methods = swampClubMethods({ sources: sources() });
  await withLab(
    (fake) => ({ apiKey: ADMIN_KEY, url: fake.url, statuses: STATUSES }),
    async (swamp, fake) => {
      withPrimary(fake);
      const item = await trackedItem(
        swamp,
        { "swamp-club": ISSUE, "swamp-club.display": `#${ISSUE}` },
        undefined,
        { tracker: INSTANCE, kind: "swamp-club" },
      );
      await call(methods, swamp, "publish", { workItem: TRACKED_ITEM });
      const before = fake.comments.length;
      assertEquals(fake.comments.every((c) => c.issue === LAB_ISSUE), true);

      await item.retarget({
        "swamp-club": String(PRIMARY),
        "swamp-club.display": `#${PRIMARY}`,
      }, `#${ISSUE} duplicates #${PRIMARY}`);
      await item.advance("submit");
      await call(methods, swamp, "publish", { workItem: TRACKED_ITEM });
      const onOld = fake.comments.slice(before).filter((c) =>
        c.issue === LAB_ISSUE
      );
      const onNew = fake.comments.filter((c) => c.issue === PRIMARY);
      assertEquals(onOld.map((c) => c.body), [
        `**${TRACKED_ITEM}** moved to #${PRIMARY}; its updates continue there.`,
      ]);
      assertEquals(onNew.map((c) => c.body.split("\n")[0]), [
        `**${TRACKED_ITEM}** continued here from #${ISSUE}, at stage **write**.`,
        `**${TRACKED_ITEM}** entered **review** (cycle 1) by \`submit\`.`,
        `**${TRACKED_ITEM}** is waiting on a person in **review**:`,
      ]);
      // The old issue keeps the status of the stage at the retarget.
      assertEquals(fake.issues[0].status, "in_progress");
      assertEquals(fake.issues[1].status, "triaged");
      // Nothing about the reason reaches either issue.
      assert(!fake.comments.some((c) => c.body.includes("duplicates")));
    },
  );
});

Deno.test("swamp-club model: publish in entry mode writes entries per issue and the retarget's notes as ripples", async () => {
  const methods = swampClubMethods({ sources: sources() });
  await withLab(
    // entriesDefinition's entry labels and its stages' status keys.
    (fake) => ({
      apiKey: ADMIN_KEY,
      url: fake.url,
      statuses: JSON.stringify({
        open: "open",
        triaged: "triaged",
        in_review: "triaged",
        shipped: "shipped",
      }),
    }),
    async (swamp, fake) => {
      withPrimary(fake);
      const item = await trackedItem(
        swamp,
        { "swamp-club": ISSUE },
        entriesDefinition(),
        { tracker: INSTANCE, kind: "swamp-club" },
      );
      await item.record("artifact", "note", { text: "first", type: "bug" });
      await item.retarget({ "swamp-club": String(PRIMARY) });
      await item.advance("submit");
      await call(methods, swamp, "publish", { workItem: TRACKED_ITEM });
      const steps = (issue: number) =>
        fake.entries.filter((e) => e.issue === issue).map((e) => e.step);
      assertEquals(steps(LAB_ISSUE), ["work_started", "noted"]);
      assertEquals(steps(PRIMARY), ["review_started"]);
      assertEquals(fake.issues[0].type, "bug");
      assertEquals(
        fake.comments.map((c) => [c.issue, c.body.split(" ").slice(1, 3)]),
        [[LAB_ISSUE, ["moved", "to"]], [PRIMARY, ["continued", "here"]]],
      );

      // A re-run writes nothing on either issue.
      const requests = fake.requests.length;
      await call(methods, swamp, "publish", { workItem: TRACKED_ITEM });
      assertEquals(fake.requests.length, requests);
    },
  );
});

Deno.test("swamp-club model: set_type once per delivery key, and a Lab type only", async () => {
  const methods = swampClubMethods({ sources: sources() });
  await withLab(
    (fake) => ({ apiKey: ADMIN_KEY, url: fake.url }),
    async (swamp, fake) => {
      const key = { workItem: "build-abcdefgh", journalVersion: "4" };
      await call(methods, swamp, "set_type", {
        issue: ISSUE,
        type: "bug",
        ...key,
      });
      fake.issues[0].type = "feature";
      // The ledger holds the key: nothing is written, even though the issue
      // was moved back by hand since.
      await call(methods, swamp, "set_type", {
        issue: ISSUE,
        type: "bug",
        ...key,
      });
      assertEquals(fake.issues[0].type, "feature");
      const ledger = swamp.resources.get(INSTANCE)?.get(
        "delivery-set_type-build-abcdefgh-4",
      )?.[0];
      assertEquals(ledger?.action, "set_type");
      await assertRejects(
        () => call(methods, swamp, "set_type", { issue: ISSUE, type: "chore" }),
      );
    },
  );
});

Deno.test("swamp-club model: thank_author ripples issue-lifecycle's thank-you to an author outside the team", async () => {
  const methods = swampClubMethods({ sources: sources() });
  await withLab(
    (fake) => ({ apiKey: ADMIN_KEY, url: fake.url }),
    async (swamp, fake) => {
      await call(methods, swamp, "thank_author", {
        issue: ISSUE,
        summary: "the Lab adapter",
        prUrl: "https://git.swamp-club.com/swamp-club/swamp-extensions/pulls/1",
      });
      assertEquals(fake.comments.length, 1);
      assertEquals(
        fake.comments[0].body,
        "Thanks @outsider for reporting this! We shipped: the Lab adapter. " +
          "The fix has been [merged](https://git.swamp-club.com/swamp-club/" +
          "swamp-extensions/pulls/1) and a release is on its way. We " +
          "appreciate your contribution to swamp.",
      );
      const done = swamp.logs.at(-1)?.props;
      assertEquals(done?.action, "posted");
      assertEquals(done?.author, "outsider");
      assertEquals(done?.reason, "not_team_member");
    },
  );
});

Deno.test("swamp-club model: thank_author skips a team member and posts nothing", async () => {
  const methods = swampClubMethods({ sources: sources() });
  await withLab(
    (fake) => ({ apiKey: ADMIN_KEY, url: fake.url }),
    async (swamp, fake) => {
      fake.issues[0].authorId = "user-ape";
      fake.issues[0].authorUsername = "skunk-ape";
      await call(methods, swamp, "thank_author", { issue: ISSUE });
      assertEquals(fake.comments.length, 0);
      assertEquals(swamp.logs.at(-1)?.props?.action, "skipped");
      assertEquals(swamp.logs.at(-1)?.props?.reason, "team_member");
    },
  );
});

Deno.test("swamp-club model: thank_author is fail-closed, and force skips only the team check", async () => {
  const methods = swampClubMethods({ sources: sources() });
  await withLab(
    (fake) => ({ apiKey: ADMIN_KEY, url: fake.url }),
    async (swamp, fake) => {
      fake.respond = (r) =>
        r.path === "/api/v1/lab/assignees"
          ? { status: 503, body: "down" }
          : undefined;
      await assertRejects(
        () => call(methods, swamp, "thank_author", { issue: ISSUE }),
        TrackerError,
      );
      assertEquals(fake.comments.length, 0, "a failed lookup posts nothing");
      // force: no roster read, but the author still comes from the issue.
      fake.issues[0].authorId = "user-ape";
      fake.issues[0].authorUsername = "skunk-ape";
      const rosterReads = () =>
        fake.requests.filter((r) => r.path === "/api/v1/lab/assignees").length;
      const before = rosterReads();
      await call(methods, swamp, "thank_author", { issue: ISSUE, force: true });
      assertEquals(rosterReads(), before, "force reads no roster");
      assertEquals(fake.comments.length, 1);
      assert(fake.comments[0].body.startsWith("Thanks @skunk-ape"));
      assertEquals(swamp.logs.at(-1)?.props?.reason, "forced");
    },
  );
});

Deno.test("swamp-club model: team_member reports the author and the answer", async () => {
  const methods = swampClubMethods({ sources: sources() });
  await withLab(
    (fake) => ({ apiKey: ADMIN_KEY, url: fake.url }),
    async (swamp) => {
      await call(methods, swamp, "team_member", { issue: ISSUE });
      const props = swamp.logs.at(-1)?.props;
      assertEquals(props?.author, "outsider");
      assertEquals(props?.member, false);
    },
  );
});

Deno.test("swamp-club model: assign records issue-lifecycle's assigned entry, and a failed entry only warns", async () => {
  const methods = swampClubMethods({ sources: sources() });
  await withLab(
    (fake) => ({ apiKey: ADMIN_KEY, url: fake.url }),
    async (swamp, fake) => {
      await call(methods, swamp, "assign", { issue: ISSUE, username: "seth" });
      assertEquals(fake.entries.map((e) => [e.step, e.summary]), [
        ["assigned", "Assigned to seth"],
      ]);
      assertEquals(fake.entries[0].payload, {
        username: "seth",
        userId: "user-seth",
      });
      // Already assigned: nothing written, no second entry.
      await call(methods, swamp, "assign", { issue: ISSUE, username: "seth" });
      assertEquals(fake.entries.length, 1);
      fake.respond = (r) =>
        r.path.endsWith("/lifecycle")
          ? { status: 503, body: "down" }
          : undefined;
      await call(methods, swamp, "assign", {
        issue: ISSUE,
        username: "skunk-ape",
      });
      assertEquals(fake.issues[0].assignees.length, 2);
      assert(
        String(swamp.logs.at(-2)?.props?.warning).includes("not recorded"),
      );
    },
  );
});

async function claimIn(swamp: FakeSwamp, methods: Methods) {
  swamp.factory("team", smallDefinition());
  return await call(methods, swamp, "claim", {
    issue: ISSUE,
    factory: "team",
  });
}

Deno.test("swamp-club model: claim refuses an issue issue-lifecycle drives, and writes nothing", async () => {
  const methods = swampClubMethods({ sources: sources() });
  await withLab(
    (fake) => ({ apiKey: ADMIN_KEY, url: fake.url }),
    async (swamp) => {
      swamp.definitions.set(`issue-${ISSUE}`, {
        globalArguments: { issueNumber: LAB_ISSUE },
        type: "@swamp/issue-lifecycle",
      });
      const error = await assertRejects(() => claimIn(swamp, methods), Error);
      assert(error.message.includes(`instance 'issue-${ISSUE}'`));
      assert(error.message.includes("even once that instance is done"));
      assertEquals(swamp.versionsWritten(INSTANCE), 0);
    },
  );
});

Deno.test("swamp-club model: claim refuses on issue-lifecycle's state data when its definition is not found", async () => {
  const methods = swampClubMethods({ sources: sources() });
  await withLab(
    (fake) => ({ apiKey: ADMIN_KEY, url: fake.url }),
    async (swamp) => {
      await swamp.context(`issue-${ISSUE}`).writeResource?.(
        "state",
        "state-main",
        { phase: "done", issueNumber: LAB_ISSUE },
      );
      await assertRejects(
        () => claimIn(swamp, methods),
        Error,
        "driven by issue-lifecycle",
      );
    },
  );
});

Deno.test("swamp-club model: an issue-<N> of another type does not block a claim", async () => {
  const methods = swampClubMethods({ sources: sources() });
  await withLab(
    (fake) => ({ apiKey: ADMIN_KEY, url: fake.url }),
    async (swamp) => {
      swamp.definitions.set(`issue-${ISSUE}`, {
        globalArguments: {},
        type: "@acme/something-else",
      });
      await claimIn(swamp, methods);
      assert(swamp.resources.get(INSTANCE)?.has(`ticket-${ISSUE}`));
    },
  );
});

Deno.test("swamp-club model: thank_author never thanks twice, even without a delivery key", async () => {
  const methods = swampClubMethods({ sources: sources() });
  await withLab(
    (fake) => ({ apiKey: ADMIN_KEY, url: fake.url }),
    async (swamp, fake) => {
      await call(methods, swamp, "thank_author", { issue: ISSUE });
      await call(methods, swamp, "thank_author", { issue: ISSUE });
      assertEquals(fake.comments.length, 1);
      const done = swamp.logs.at(-1)?.props;
      assertEquals(done?.action, "posted");
      assertEquals(done?.reason, "already_thanked");
    },
  );
});

Deno.test("swamp-club model: the assigned entry is labelled with the issue's own status", async () => {
  const methods = swampClubMethods({ sources: sources() });
  await withLab(
    (fake) => ({ apiKey: ADMIN_KEY, url: fake.url }),
    async (swamp, fake) => {
      fake.issues[0].status = "in_progress";
      await call(methods, swamp, "assign", { issue: ISSUE, username: "seth" });
      assertEquals(fake.entries[0].targetStatus, "in_progress");
    },
  );
});

Deno.test("swamp-club model: the issue-lifecycle guard fails closed when it cannot look", async () => {
  await assertRejects(
    () =>
      refuseIssueLifecycle(
        { logger: { info: () => {} } },
        {
          id: ISSUE,
          display: `#${ISSUE}`,
          title: "t",
          url: "u",
          status: { id: "open", name: "open" },
          relations: [],
        },
      ),
    Error,
    "cannot check whether issue-lifecycle drives",
  );
});

Deno.test("swamp-club model: publish links an entry's pull request on the Lab issue once, and a later one replaces it", async () => {
  const methods = swampClubMethods({ sources: sources() });
  await withLab(
    (fake) => ({
      apiKey: ADMIN_KEY,
      url: fake.url,
      statuses: JSON.stringify({
        open: "open",
        triaged: "triaged",
        in_review: "triaged",
        shipped: "shipped",
      }),
    }),
    async (swamp, fake) => {
      const item = await trackedItem(
        swamp,
        { "swamp-club": ISSUE },
        linkingDefinition(),
        { tracker: INSTANCE, kind: "swamp-club" },
      );
      const first = "https://git.example.com/o/r/pulls/401";
      await item.record("artifact", "note", { text: "first", url: first });
      await call(methods, swamp, "publish", { workItem: TRACKED_ITEM });
      const prPatches = () =>
        fake.requests.filter((r) =>
          r.method === "PATCH" &&
          Object.hasOwn(r.body as Record<string, unknown>, "githubPrUrl")
        );
      assertEquals(prPatches().map((r) => r.body), [
        { githubPrUrl: first, githubPrNumber: 401 },
      ]);
      assertEquals(fake.issues[0].githubPrUrl, first);
      assertEquals(fake.issues[0].githubPrNumber, 401);

      // A re-run writes nothing.
      const requests = fake.requests.length;
      await call(methods, swamp, "publish", { workItem: TRACKED_ITEM });
      assertEquals(fake.requests.length, requests);

      const second = "https://git.example.com/o/r/pulls/402";
      await item.advance("submit");
      await item.advance("again");
      await item.record("artifact", "note", { text: "second", url: second });
      await call(methods, swamp, "publish", { workItem: TRACKED_ITEM });
      assertEquals(prPatches().length, 2);
      assertEquals(fake.issues[0].githubPrUrl, second);
      assertEquals(fake.issues[0].githubPrNumber, 402);
    },
  );
});
