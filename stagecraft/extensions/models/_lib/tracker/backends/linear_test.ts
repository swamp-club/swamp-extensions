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

import { assert, assertEquals, assertRejects, assertThrows } from "@std/assert";
import { apiUrlProblem, linearAdapter } from "./linear.ts";
import {
  FAKE_TOKEN,
  ISSUE_UUID,
  type LinearFake,
  linearFake,
  OTHER_USER_ID,
  OTHER_UUID,
  TEAM_ID,
  VIEWER_ID,
} from "./linear_fake.ts";
import { TrackerError, type TrackerErrorKind } from "../core/adapter.ts";
import { assertTrackerConformance } from "../core/tracker_conformance.ts";

async function withFake(fn: (fake: LinearFake) => Promise<void>) {
  const fake = linearFake();
  try {
    await fn(fake);
  } finally {
    await fake.close();
  }
}

const TYPES = { bug: "Bug", feature: "Feature", chore: "Chore" };

const adapterFor = (fake: LinearFake, apiToken = FAKE_TOKEN) =>
  linearAdapter({ apiToken, apiUrl: fake.url, teamId: TEAM_ID, types: TYPES });

async function failsWith(
  kind: TrackerErrorKind,
  call: () => Promise<unknown>,
  includes?: string,
): Promise<TrackerError> {
  const error = await assertRejects(call, TrackerError);
  assertEquals(error.kind, kind, error.message);
  if (includes !== undefined) {
    assert(error.message.includes(includes), error.message);
  }
  assert(!error.message.includes(FAKE_TOKEN), "never the token");
  return error;
}

Deno.test("linear: meets the tracker adapter contract", async () => {
  await withFake(async (fake) => {
    await assertTrackerConformance({
      adapter: adapterFor(fake),
      badAuth: adapterFor(fake, "lin_api_wrong"),
      issue: {
        id: ISSUE_UUID,
        display: "GW-16",
      },
      firstKey: "gw-16",
      missing: OTHER_UUID,
      statusNames: ["In Progress", "In Review"],
      closedStatus: "Duplicate",
      commentsPosted: () => fake.comments.length,
      createType: "bug",
      assign: {
        user: VIEWER_ID,
        assignees: () => {
          const id = fake.issues[0].assigneeId;
          return id ? [id] : [];
        },
      },
    });
  });
});

Deno.test("linear: viewer is the API key's own user", async () => {
  await withFake(async (fake) => {
    const me = await adapterFor(fake).viewer();
    assertEquals(me.id, VIEWER_ID);
    assertEquals(me.displayName, "pat");
  });
});

Deno.test("linear: assign replaces the one assignee and reports them dropped", async () => {
  await withFake(async (fake) => {
    fake.issues[0].assigneeId = OTHER_USER_ID;
    const adapter = adapterFor(fake);
    const done = await adapter.capabilities.assign.assign(
      ISSUE_UUID,
      VIEWER_ID,
    );
    assertEquals(done.changed, true);
    assertEquals(done.display, "pat");
    assertEquals(done.dropped, ["sam"]);
    assertEquals(done.status, "Todo");
    assertEquals(fake.issues[0].assigneeId, VIEWER_ID);
    const again = await adapter.capabilities.assign.assign(
      ISSUE_UUID,
      VIEWER_ID,
    );
    assertEquals(again.changed, false);
    assertEquals(again.dropped, []);
  });
});

Deno.test("linear: assign keys on the UUID and refuses an unknown user", async () => {
  await withFake(async (fake) => {
    const adapter = adapterFor(fake);
    await failsWith(
      "invalid",
      () => adapter.capabilities.assign.assign("GW-16", VIEWER_ID),
      "not an issue UUID",
    );
    await failsWith(
      "not_found",
      () => adapter.capabilities.assign.assign(ISSUE_UUID, OTHER_UUID),
      "assigneeId",
    );
    assertEquals(fake.issues[0].assigneeId, undefined);
  });
});

Deno.test("linear: fetchIssue reports the assignee in details", async () => {
  await withFake(async (fake) => {
    const adapter = adapterFor(fake);
    assertEquals((await adapter.fetchIssue("GW-16")).details, {
      assignee: null,
    });
    fake.issues[0].assigneeId = VIEWER_ID;
    assertEquals((await adapter.fetchIssue("GW-16")).details, {
      assignee: { id: VIEWER_ID, name: "Pat Viewer", displayName: "pat" },
    });
  });
});

Deno.test("linear: fetchIssue reads the description, labels, assignee, times and comments", async () => {
  await withFake(async (fake) => {
    const adapter = adapterFor(fake);
    // No description reads as empty, not absent.
    const bare = await adapter.fetchIssue("GW-16");
    assertEquals(
      [bare.description, bare.labels, bare.assignees, bare.activity],
      ["", [], [], []],
    );
    fake.issues[0].description = "Some **markdown**.";
    fake.issues[0].labelIds = ["label-bug"];
    fake.issues[0].assigneeId = OTHER_USER_ID;
    const posted = await adapter.comment(ISSUE_UUID, "A note");
    const issue = await adapter.fetchIssue("GW-16");
    assertEquals(issue.description, "Some **markdown**.");
    assertEquals(issue.labels, ["Bug"]);
    assertEquals(issue.assignees, ["sam"]);
    assertEquals(issue.createdAt, "2026-09-28T00:00:00.000Z");
    assertEquals(issue.activity, [{
      kind: "comment",
      id: posted.id,
      author: "pat",
      body: "A note",
      at: "2026-09-29T00:00:00.000Z",
    }]);
  });
});

Deno.test("linear: sends the API key as the Authorization header, to the configured URL", async () => {
  await withFake(async (fake) => {
    await adapterFor(fake).fetchIssue("GW-16");
    assertEquals(fake.requests[0].authorization, FAKE_TOKEN);
    assertEquals(fake.requests[0].variables, { id: "GW-16" });
  });
});

Deno.test("linear: a wrong token fails a read as auth", async () => {
  await withFake(async (fake) => {
    await failsWith(
      "auth",
      () => adapterFor(fake, "lin_api_wrong").fetchIssue("GW-16"),
    );
  });
});

Deno.test("linear: writes key on the UUID, so an identifier is refused before any call", async () => {
  await withFake(async (fake) => {
    const adapter = adapterFor(fake);
    await failsWith("invalid", () => adapter.comment("GW-16", "x"), "UUID");
    await failsWith(
      "invalid",
      () => adapter.setStatus("GW-16", "Done"),
      "fetch_issue",
    );
    assertEquals(fake.requests.length, 0);
  });
});

Deno.test("linear: an unknown status lists the team's status names", async () => {
  await withFake(async (fake) => {
    await failsWith(
      "invalid",
      () => adapterFor(fake).setStatus(ISSUE_UUID, "in progress"),
      "Todo, In Progress, In Review, Done",
    );
  });
});

Deno.test("linear: malformed and error responses map to error kinds", async () => {
  await withFake(async (fake) => {
    const adapter = adapterFor(fake);
    const cases: [
      TrackerErrorKind,
      { status: number; body: string; contentType?: string },
      string,
    ][] = [
      // A proxy's HTML page, not JSON.
      ["upstream", {
        status: 502,
        body: "<html><body>Bad gateway</body></html>",
      }, "not JSON"],
      // A bare 401 with a plain-text body.
      ["auth", { status: 401, body: "Unauthorized" }, "HTTP 401"],
      // Linear's rate limit: HTTP 400 with RATELIMITED.
      ["rate_limited", {
        status: 400,
        contentType: "application/json",
        body: JSON.stringify({
          errors: [{
            message: "Rate limit exceeded",
            extensions: { code: "RATELIMITED" },
          }],
        }),
      }, "Rate limit exceeded"],
      // A 429 with an empty body.
      ["rate_limited", { status: 429, body: "" }, "HTTP 429"],
      // GraphQL errors inside an HTTP 200.
      ["upstream", {
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          data: null,
          errors: [{ message: "Internal server error" }],
        }),
      }, "Internal server error"],
      // A 200 with neither data nor errors.
      ["upstream", {
        status: 200,
        contentType: "application/json",
        body: "{}",
      }, "no data"],
      // A null issue with no error at all.
      ["not_found", {
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ data: { issue: null } }),
      }, "no issue"],
    ];
    for (const [kind, response, includes] of cases) {
      fake.queue.push(response);
      await failsWith(kind, () => adapter.fetchIssue(ISSUE_UUID), includes);
    }
  });
});

Deno.test("linear: apiUrl must be https, or plain http to a loopback address", () => {
  const allowed = [
    "https://api.linear.app/graphql",
    "https://example.com/x",
    "http://127.0.0.1:1/graphql",
    "http://[::1]:1/graphql",
    // Normalized to 127.0.0.1 by the URL parser.
    "http://127.1/",
  ];
  const refused = [
    "http://api.linear.app/graphql",
    "http://localhost:1/",
    "http://10.0.0.1/",
    "not a url",
  ];
  for (const url of allowed) assertEquals(apiUrlProblem(url), undefined, url);
  for (const url of refused) {
    assert(apiUrlProblem(url)?.includes("must be https"), url);
  }
});

Deno.test("linear: a refused apiUrl fails when the adapter is made, before any call", () => {
  const error = assertThrows(
    () =>
      linearAdapter({
        apiToken: FAKE_TOKEN,
        apiUrl: "http://api.linear.app/graphql",
      }),
    TrackerError,
    "must be https",
  );
  assertEquals(error.kind, "invalid");
  assert(!error.message.includes(FAKE_TOKEN), "never the token");
});

Deno.test("linear: a long non-JSON body is cut short in the error", async () => {
  await withFake(async (fake) => {
    fake.queue.push({ status: 500, body: "x".repeat(5000) });
    const error = await failsWith(
      "upstream",
      () => adapterFor(fake).fetchIssue(ISSUE_UUID),
    );
    assert(error.message.includes(`${"x".repeat(80)}...`), error.message);
    assert(!error.message.includes("x".repeat(81)), error.message);
  });
});

Deno.test("linear: a commentCreate that reports no success is an error", async () => {
  await withFake(async (fake) => {
    fake.queue.push({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        data: { commentCreate: { success: false, comment: null } },
      }),
    });
    await failsWith(
      "upstream",
      () => adapterFor(fake).comment(ISSUE_UUID, "x"),
      "did not succeed",
    );
  });
});

Deno.test("linear: an unreachable endpoint is an upstream error", async () => {
  const fake = linearFake();
  const url = fake.url;
  await fake.close();
  await failsWith(
    "upstream",
    () => linearAdapter({ apiToken: FAKE_TOKEN, apiUrl: url }).fetchIssue("x"),
    "could not reach",
  );
});

Deno.test("linear: a body that stalls past the timeout is an upstream error", async () => {
  await withFake(async (fake) => {
    fake.queue.push({ status: 200, body: '{"data":', stall: true });
    await failsWith(
      "upstream",
      () =>
        linearAdapter({
          apiToken: FAKE_TOKEN,
          apiUrl: fake.url,
          timeoutMs: 100,
        })
          .fetchIssue(ISSUE_UUID),
      "timed out after 100 ms",
    );
  });
});

Deno.test("linear: a body dropped mid-stream is an upstream error", async () => {
  await withFake(async (fake) => {
    fake.queue.push({ status: 200, body: '{"data":', reset: true });
    await failsWith(
      "upstream",
      () => adapterFor(fake).fetchIssue(ISSUE_UUID),
      "could not read the response",
    );
  });
});

Deno.test("linear: a body that fails after an error status keeps that status's kind", async () => {
  await withFake(async (fake) => {
    fake.queue.push({ status: 401, body: "Unauth", reset: true });
    await failsWith(
      "auth",
      () => adapterFor(fake).fetchIssue(ISSUE_UUID),
      "HTTP 401: could not read the response",
    );
  });
});

Deno.test("linear: create files in the team, labelled for its type, with a team or a workspace label", async () => {
  await withFake(async (fake) => {
    const bug = await adapterFor(fake).create({
      title: "A new issue",
      body: "Filed by stagecraft.",
      type: "bug",
    });
    assertEquals(bug.display, "GW-17");
    // The label is looked up by name, not read from a page of all labels.
    assert(
      fake.requests.some((r) =>
        r.query.includes("issueLabels") && r.variables.name === "Bug"
      ),
    );
    assertEquals(bug.title, "A new issue");
    assertEquals(bug.status.name, "Todo");
    const stored = fake.issues.find((i) => i.id === bug.id);
    assertEquals(stored?.labelIds, ["label-bug"]);
    assertEquals(stored?.description, "Filed by stagecraft.");
    // A workspace label (no team) is one the team can use.
    const feature = await adapterFor(fake).create({
      title: "Another",
      body: "b",
      type: "feature",
    });
    assertEquals(
      fake.issues.find((i) => i.id === feature.id)?.labelIds,
      ["label-feature"],
    );
  });
});

Deno.test("linear: create is refused without a teamId, for an unmapped type, and for a label the team lacks", async () => {
  await withFake(async (fake) => {
    const draft = { title: "t", body: "b", type: "bug" };
    await failsWith(
      "invalid",
      () =>
        linearAdapter({ apiToken: FAKE_TOKEN, apiUrl: fake.url }).create(
          draft,
        ),
      "no teamId",
    );
    await failsWith(
      "invalid",
      () => adapterFor(fake).create({ ...draft, type: "security" }),
      "mapped: bug, feature, chore",
    );
    // Chore maps to a label no team or workspace has; Elsewhere is another
    // team's label, which this team cannot use.
    await failsWith(
      "invalid",
      () => adapterFor(fake).create({ ...draft, type: "chore" }),
      "no label 'Chore'",
    );
    const elsewhere = linearAdapter({
      apiToken: FAKE_TOKEN,
      apiUrl: fake.url,
      teamId: TEAM_ID,
      types: { bug: "Elsewhere" },
    });
    await failsWith("invalid", () => elsewhere.create(draft), "no label");
    assertEquals(fake.issues.length, 1, "nothing was filed");
  });
});

Deno.test("linear: blocked_by is Linear's blocks read the other way", async () => {
  await withFake(async (fake) => {
    const linear = adapterFor(fake);
    const other = await linear.create({
      title: "Other",
      body: "b",
      type: "bug",
    });
    await linear.relate(ISSUE_UUID, "blocked_by", other.id);
    assertEquals(
      fake.relations.map((r) => [r.issueId, r.type, r.relatedIssueId]),
      [[other.id, "blocks", ISSUE_UUID]],
    );
    const blocked = await linear.fetchIssue(ISSUE_UUID);
    assertEquals(blocked.relations, [{
      type: "blocked_by",
      direction: "outgoing",
      issue: other.id,
      display: other.display,
    }]);
  });
});

Deno.test("linear: unrelate clears a parent only when it is the one named", async () => {
  await withFake(async (fake) => {
    const linear = adapterFor(fake);
    const draft = { title: "Parent", body: "b", type: "bug" };
    const parent = await linear.create(draft);
    const third = await linear.create(draft);
    await linear.relate(parent.id, "parent_of", ISSUE_UUID);
    // third is not ISSUE's parent: unrelating it as one changes nothing.
    assertEquals(await linear.unrelate(third.id, "parent_of", ISSUE_UUID), {
      changed: false,
    });
    assertEquals(fake.issues[0].parentId, parent.id);
    assertEquals(await linear.unrelate(parent.id, "parent_of", ISSUE_UUID), {
      changed: true,
    });
    assertEquals(fake.issues[0].parentId, null);
  });
});

Deno.test("linear: relations take UUIDs, as every write does", async () => {
  await withFake(async (fake) => {
    await failsWith(
      "invalid",
      () => adapterFor(fake).relate("GW-16", "related_to", ISSUE_UUID),
      "not an issue UUID",
    );
  });
});

Deno.test("linear: a malformed assign or viewer reply is an upstream error", async () => {
  await withFake(async (fake) => {
    const adapter = adapterFor(fake);
    const json = (data: unknown) => ({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ data }),
    });
    const read = json({
      issue: { state: { id: "state-todo", name: "Todo" }, assignee: null },
    });
    const sam = { id: OTHER_USER_ID, name: "Sam Other", displayName: "sam" };
    for (
      const update of [
        { issueUpdate: { success: false, issue: null } },
        // Linear said yes, but someone else holds the issue.
        { issueUpdate: { success: true, issue: { assignee: sam } } },
        { issueUpdate: { success: true, issue: { assignee: null } } },
      ]
    ) {
      fake.queue.push(read, json(update));
      await failsWith(
        "upstream",
        () => adapter.capabilities.assign.assign(ISSUE_UUID, VIEWER_ID),
        "did not succeed",
      );
    }
    fake.queue.push(json({ viewer: null }));
    await failsWith("upstream", () => adapter.viewer(), "no viewer");
    assertEquals(fake.issues[0].assigneeId, undefined);
  });
});
