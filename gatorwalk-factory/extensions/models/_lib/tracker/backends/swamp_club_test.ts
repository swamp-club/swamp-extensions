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
import { fromFileUrl } from "@std/path";
import {
  type AuthFile,
  type CredentialSources,
  readSwampAuthFile,
  resolveLabCredentials,
  serverUrlProblem,
  SWAMP_CLUB_URL,
  swampClubAdapter,
} from "./swamp_club.ts";
import {
  ADMIN_KEY,
  LAB_ISSUE,
  MEMBER_KEY,
  MISSING_ISSUE,
  type SwampClubFake,
  swampClubFake,
} from "./swamp_club_fake.ts";
import { TrackerError, type TrackerErrorKind } from "../core/adapter.ts";
import { assertTrackerConformance } from "../core/tracker_conformance.ts";

const ISSUE = String(LAB_ISSUE);

async function withFake(fn: (fake: SwampClubFake) => Promise<void>) {
  const fake = swampClubFake();
  try {
    await fn(fake);
  } finally {
    await fake.close();
  }
}

const adapterFor = (fake: SwampClubFake, apiKey = ADMIN_KEY) =>
  swampClubAdapter({
    credentials: () => Promise.resolve({ url: fake.url, apiKey }),
  });

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
  for (const key of [ADMIN_KEY, MEMBER_KEY]) {
    assert(!error.message.includes(key), "never the key");
  }
  return error;
}

function sources(
  env: Record<string, string>,
  file: AuthFile | null,
): CredentialSources & { fileReads: number } {
  const s = {
    fileReads: 0,
    env: (name: string) => env[name],
    readAuthFile: () => {
      s.fileReads++;
      return Promise.resolve(file);
    },
  };
  return s;
}

Deno.test("swamp-club: meets the tracker adapter contract", async () => {
  await withFake(async (fake) => {
    await assertTrackerConformance({
      adapter: adapterFor(fake),
      badAuth: adapterFor(fake, "swamp_wrong_key"),
      issue: { id: ISSUE, display: `#${ISSUE}`, slug: "2631-lab-adapter" },
      missing: String(MISSING_ISSUE),
      statusNames: ["triaged", "in_progress"],
      commentsPosted: () => fake.comments.length,
      createType: "feature",
      history: {
        entriesPosted: () => fake.entries.length,
        statusName: "open",
        types: ["bug", "platform"],
      },
      assign: {
        user: "seth",
        assignees: () =>
          fake.issues.find((i) => i.number === LAB_ISSUE)?.assignees.map((a) =>
            a.username
          ) ?? [],
      },
    });
  });
});

Deno.test("swamp-club: sends the key as a Bearer token, to the configured URL", async () => {
  await withFake(async (fake) => {
    const issue = await adapterFor(fake).fetchIssue(`#${ISSUE}`);
    assertEquals(fake.requests[0].authorization, `Bearer ${ADMIN_KEY}`);
    assertEquals(fake.requests[0].path, `/api/v1/lab/issues/${ISSUE}`);
    assertEquals(issue, {
      id: ISSUE,
      display: `#${ISSUE}`,
      title: "Lab adapter",
      url: `${fake.url}/lab/${ISSUE}`,
      status: { id: "open", name: "open" },
      details: {
        body: "Adapt the Lab.",
        type: "feature",
        author: "outsider",
        authorId: "user-outsider",
        comments: [],
      },
      relations: [],
    });
  });
});

Deno.test("swamp-club: the full fetch carries the body, type, author and ripples", async () => {
  await withFake(async (fake) => {
    const adapter = adapterFor(fake);
    await adapter.comment(ISSUE, "First ripple");
    const issue = await adapter.fetchIssue(ISSUE);
    assertEquals(issue.details?.comments, [{
      author: "seth",
      body: "First ripple",
      createdAt: "2026-09-29T00:00:00.000Z",
    }]);
  });
});

Deno.test("swamp-club: an issue without the Lab-only fields reads them as empty", async () => {
  await withFake(async (fake) => {
    fake.issues.push({
      number: 7,
      title: "Bare",
      status: "open",
      assignees: [],
    });
    const issue = await adapterFor(fake).fetchIssue("7");
    assertEquals(issue.details, {
      body: "",
      type: "",
      author: "",
      authorId: "",
      comments: [],
    });
  });
});

Deno.test("swamp-club: setType patches only when the type differs, and needs an admin", async () => {
  await withFake(async (fake) => {
    const adapter = adapterFor(fake);
    assertEquals(await adapter.capabilities.history.setType(ISSUE, "feature"), {
      changed: false,
      type: "feature",
    });
    assertEquals(fake.requests.filter((r) => r.method === "PATCH").length, 0);
    assertEquals(await adapter.capabilities.history.setType(ISSUE, "bug"), {
      changed: true,
      type: "bug",
    });
    assertEquals(fake.issues[0].type, "bug");
    assertEquals(fake.requests.at(-1)?.body, { type: "bug" });
    await failsWith(
      "invalid",
      () => adapter.capabilities.history.setType(ISSUE, "chore"),
      "bug, feature, platform, security",
    );
    await failsWith(
      "auth",
      () =>
        adapterFor(fake, MEMBER_KEY).capabilities.history.setType(
          ISSUE,
          "security",
        ),
      "admin",
    );
  });
});

Deno.test("swamp-club: a lifecycle entry is posted as issue-lifecycle posts it", async () => {
  await withFake(async (fake) => {
    const posted = await adapterFor(fake).capabilities.history.postEntry(
      ISSUE,
      {
        step: " classified ",
        targetStatus: "triaged",
        summary: "Classified as bug (high)",
        emoji: "\u{1F4CB}",
        payload: { type: "bug", isRegression: true },
        isVerbose: false,
      },
    );
    assertEquals(posted.id, fake.entries[0].id);
    assertEquals(
      fake.requests[0].path,
      `/api/v1/lab/issues/${ISSUE}/lifecycle`,
    );
    assertEquals(fake.requests[0].body, {
      step: "classified",
      targetStatus: "triaged",
      summary: "Classified as bug (high)",
      emoji: "\u{1F4CB}",
      payload: { type: "bug", isRegression: true },
      isVerbose: false,
    });
    // A label only: the issue's status is untouched.
    assertEquals(fake.issues[0].status, "open");
    assertEquals(fake.issues[0].isRegression, true);
  });
});

Deno.test("swamp-club: a lifecycle entry's limits are checked before any call, and a long summary is cut", async () => {
  await withFake(async (fake) => {
    const adapter = adapterFor(fake);
    const entry = {
      step: "classified",
      targetStatus: "triaged",
      summary: "ok",
      emoji: "x",
      payload: {},
      isVerbose: false,
    };
    await failsWith(
      "invalid",
      () =>
        adapter.capabilities.history.postEntry(ISSUE, {
          ...entry,
          step: "s".repeat(101),
        }),
      "step",
    );
    await failsWith(
      "invalid",
      () =>
        adapter.capabilities.history.postEntry(ISSUE, {
          ...entry,
          targetStatus: "done",
        }),
      "not a Lab status",
    );
    await failsWith(
      "invalid",
      () =>
        adapter.capabilities.history.postEntry(ISSUE, { ...entry, emoji: " " }),
      "emoji",
    );
    await failsWith(
      "invalid",
      () =>
        adapter.capabilities.history.postEntry(ISSUE, {
          ...entry,
          summary: "",
        }),
      "summary",
    );
    assertEquals(fake.requests.length, 0);
    await adapter.capabilities.history.postEntry(ISSUE, {
      ...entry,
      summary: "y".repeat(2500),
    });
    assertEquals(fake.entries[0].summary, `${"y".repeat(1997)}...`);
    // An emoji across the cut is dropped whole, never halved.
    await adapter.capabilities.history.postEntry(ISSUE, {
      ...entry,
      summary: `${"y".repeat(1996)}\u{1F389}${"z".repeat(10)}`,
    });
    assertEquals(fake.entries[1].summary, `${"y".repeat(1996)}...`);
  });
});

Deno.test("swamp-club: a refused lifecycle entry is invalid with swamp-club's reason, and needs an admin", async () => {
  await withFake(async (fake) => {
    const entry = {
      step: "classified",
      targetStatus: "triaged",
      summary: "ok",
      emoji: "x",
      payload: { "$where": "1" },
      isVerbose: false,
    };
    await failsWith(
      "invalid",
      () => adapterFor(fake).capabilities.history.postEntry(ISSUE, entry),
      "must not start with $",
    );
    await failsWith(
      "auth",
      () =>
        adapterFor(fake, MEMBER_KEY).capabilities.history.postEntry(ISSUE, {
          ...entry,
          payload: {},
        }),
      "admin",
    );
    assertEquals(fake.entries.length, 0);
  });
});

Deno.test("swamp-club: team membership matches the author by id, then by username", async () => {
  await withFake(async (fake) => {
    const adapter = adapterFor(fake);
    assertEquals(await adapter.teamMembership(ISSUE), {
      author: "outsider",
      authorId: "user-outsider",
      member: false,
    });
    fake.issues[0].authorId = "user-ape";
    assertEquals((await adapter.teamMembership(ISSUE)).member, true);
    // No id: the username, which is also a swamp-club identity.
    fake.issues[0].authorId = undefined;
    fake.issues[0].authorUsername = "seth";
    assertEquals((await adapter.teamMembership(ISSUE)).member, true);
  });
});

Deno.test("swamp-club: team membership is fail-closed", async () => {
  await withFake(async (fake) => {
    // The roster needs an admin: a member key cannot decide, so it fails.
    await failsWith(
      "auth",
      () => adapterFor(fake, MEMBER_KEY).teamMembership(ISSUE),
    );
    fake.issues[0].authorId = undefined;
    fake.issues[0].authorUsername = undefined;
    await failsWith(
      "upstream",
      () => adapterFor(fake).teamMembership(ISSUE),
      "no author",
    );
    fake.issues[0].authorUsername = "outsider";
    fake.queue.push({ status: 503, body: "down" });
    await failsWith("upstream", () => adapterFor(fake).teamMembership(ISSUE));
  });
});

Deno.test("swamp-club: a ref that is not an issue number is refused before any call", async () => {
  await withFake(async (fake) => {
    const adapter = adapterFor(fake);
    await failsWith("invalid", () => adapter.fetchIssue("GW-16"), "#2631");
    await failsWith(
      "invalid",
      () => adapter.comment(`#${ISSUE}`, "x"),
      "fetch_issue",
    );
    await failsWith("invalid", () => adapter.setStatus("0", "triaged"));
    assertEquals(fake.requests.length, 0);
  });
});

Deno.test("swamp-club: a ripple returns its id, and the issue's url", async () => {
  await withFake(async (fake) => {
    const posted = await adapterFor(fake).comment(ISSUE, "Planned");
    assertEquals(posted, {
      id: fake.comments[0].id,
      url: `${fake.url}/lab/${ISSUE}`,
    });
    assertEquals(fake.requests[0].body, { body: "Planned" });
  });
});

Deno.test("swamp-club: a status move walks one step at a time, from the current status", async () => {
  await withFake(async (fake) => {
    const change = await adapterFor(fake).setStatus(ISSUE, "in_progress");
    assertEquals(change, {
      changed: true,
      status: { id: "in_progress", name: "in_progress" },
    });
    const patches = fake.requests.filter((r) => r.method === "PATCH");
    assertEquals(patches.map((r) => r.body), [
      { status: "triaged" },
      { status: "in_progress" },
    ]);
  });
});

Deno.test("swamp-club: moving backwards is invalid, unreachable, and writes nothing", async () => {
  await withFake(async (fake) => {
    fake.issues[0].status = "in_progress";
    const back = await failsWith(
      "invalid",
      () => adapterFor(fake).setStatus(ISSUE, "triaged"),
      "only move forward",
    );
    assertEquals(back.reason, "unreachable");
    await failsWith(
      "invalid",
      () => adapterFor(fake).setStatus(ISSUE, "open"),
      "'in_progress'",
    );
    assertEquals(fake.requests.filter((r) => r.method === "PATCH").length, 0);
    assertEquals(fake.issues[0].status, "in_progress");
  });
});

Deno.test("swamp-club: from a status the adapter does not know, a move is plain invalid, not unreachable", async () => {
  await withFake(async (fake) => {
    fake.issues[0].status = "archived";
    const error = await failsWith(
      "invalid",
      () => adapterFor(fake).setStatus(ISSUE, "in_progress"),
      "no path from it",
    );
    assertEquals(error.reason, undefined);
  });
});

Deno.test("swamp-club: an unknown status lists the five Lab statuses, before any call", async () => {
  await withFake(async (fake) => {
    const unknown = await failsWith(
      "invalid",
      () => adapterFor(fake).setStatus(ISSUE, "In Progress"),
      "open, triaged, in_progress, shipped, closed",
    );
    assertEquals(unknown.reason, undefined, "a name it lacks is plain invalid");
    assertEquals(fake.requests.length, 0);
  });
});

Deno.test("swamp-club: close is one move; a closed issue reopens and walks forward", async () => {
  await withFake(async (fake) => {
    const adapter = adapterFor(fake);
    await adapter.setStatus(ISSUE, "closed");
    assertEquals(fake.issues[0].status, "closed");
    await adapter.setStatus(ISSUE, "triaged");
    assertEquals(fake.issues[0].status, "triaged");
    fake.issues[0].status = "shipped";
    await failsWith(
      "invalid",
      () => adapter.setStatus(ISSUE, "closed"),
      "shipped",
    );
  });
});

Deno.test("swamp-club: a walk that fails partway says what landed, and a re-run finishes it", async () => {
  await withFake(async (fake) => {
    // The first PATCH lands; the second meets a 503.
    let patches = 0;
    fake.respond = (request) =>
      request.method === "PATCH" && ++patches === 2
        ? { status: 503, body: "<html>Service Unavailable</html>" }
        : undefined;
    const error = await failsWith(
      "upstream",
      () => adapterFor(fake).setStatus(ISSUE, "shipped"),
      "after moving #2631 to triaged",
    );
    fake.respond = undefined;
    assert(error.message.includes("HTTP 503"), error.message);
    assertEquals(fake.issues[0].status, "triaged");

    const change = await adapterFor(fake).setStatus(ISSUE, "shipped");
    assertEquals(change.changed, true);
    assertEquals(fake.issues[0].status, "shipped");
  });
});

Deno.test("swamp-club: a member key may comment, but a status move needs an admin", async () => {
  await withFake(async (fake) => {
    const member = adapterFor(fake, MEMBER_KEY);
    await member.comment(ISSUE, "hello");
    await failsWith(
      "auth",
      () => member.setStatus(ISSUE, "triaged"),
      "need a swamp-club admin key",
    );
  });
});

Deno.test("swamp-club: malformed and error responses map to error kinds", async () => {
  await withFake(async (fake) => {
    const adapter = adapterFor(fake);
    const cases: [TrackerErrorKind, {
      status: number;
      body: string;
      contentType?: string;
      headers?: Record<string, string>;
    }, string][] = [
      // A proxy's HTML page, not JSON.
      ["upstream", {
        status: 502,
        body: "<html><body>Bad gateway</body></html>",
      }, "Bad gateway"],
      // A 200 whose body is not JSON.
      ["upstream", { status: 200, body: "ok" }, "not JSON"],
      // A 200 with no issue in it.
      ["upstream", {
        status: 200,
        contentType: "application/json",
        body: "{}",
      }, "no issue"],
      // swamp-club's rate limit, with Retry-After.
      ["rate_limited", {
        status: 429,
        contentType: "application/json",
        body: JSON.stringify({ error: "Rate limit exceeded", scope: "ip" }),
        headers: { "Retry-After": "30" },
      }, "retry after 30s"],
      // A bare 401 with an empty body.
      ["auth", { status: 401, body: "" }, "HTTP 401"],
      // A refused payload keeps swamp-club's reason.
      ["invalid", {
        status: 400,
        contentType: "application/json",
        body: JSON.stringify({ error: "Invalid issue number" }),
      }, "Invalid issue number"],
    ];
    for (const [kind, response, includes] of cases) {
      fake.queue.push(response);
      await failsWith(kind, () => adapter.fetchIssue(ISSUE), includes);
    }
    await failsWith(
      "not_found",
      () => adapter.fetchIssue(String(MISSING_ISSUE)),
    );
  });
});

Deno.test("swamp-club: a server that cannot be reached is upstream", async () => {
  const fake = swampClubFake();
  const url = fake.url;
  await fake.close();
  await failsWith(
    "upstream",
    () =>
      swampClubAdapter({
        credentials: () => Promise.resolve({ url, apiKey: ADMIN_KEY }),
      }).fetchIssue(ISSUE),
    "no complete reply",
  );
});

Deno.test("swamp-club: assign adds to the assignees, and a repeat writes nothing", async () => {
  await withFake(async (fake) => {
    fake.issues[0].assignees = [{ userId: "user-ape", username: "skunk-ape" }];
    const adapter = adapterFor(fake);
    assertEquals(await adapter.assign(ISSUE, "seth"), {
      changed: true,
      username: "seth",
      userId: "user-seth",
      status: "open",
      dropped: [],
    });
    assertEquals(fake.issues[0].assignees.map((a) => a.userId), [
      "user-ape",
      "user-seth",
    ]);
    const patches = fake.requests.filter((r) => r.method === "PATCH").length;
    assertEquals((await adapter.assign(ISSUE, "seth")).changed, false);
    assertEquals(
      fake.requests.filter((r) => r.method === "PATCH").length,
      patches,
    );
    await failsWith(
      "invalid",
      () => adapter.assign(ISSUE, "nobody"),
      "eligible",
    );
  });
});

Deno.test("swamp-club: assign drops, and names, assignees no longer on the team", async () => {
  await withFake(async (fake) => {
    fake.issues[0].assignees = [
      { userId: "user-ape", username: "skunk-ape" },
      { userId: "user-gone", username: "gone" },
    ];
    assertEquals(await adapterFor(fake).assign(ISSUE, "seth"), {
      changed: true,
      username: "seth",
      userId: "user-seth",
      status: "open",
      dropped: [{ userId: "user-gone", username: "gone" }],
    });
    const patches = fake.requests.filter((r) => r.method === "PATCH");
    assertEquals(patches.map((r) => r.body), [
      { assignees: ["user-ape", "user-seth"] },
    ]);
  });
});

Deno.test("swamp-club: assign to a user already there writes nothing, stale assignees included", async () => {
  await withFake(async (fake) => {
    fake.issues[0].assignees = [
      { userId: "user-seth", username: "seth" },
      { userId: "user-gone", username: "gone" },
    ];
    assertEquals(await adapterFor(fake).assign(ISSUE, "seth"), {
      changed: false,
      username: "seth",
      userId: "user-seth",
      status: "open",
      dropped: [],
    });
    assertEquals(fake.requests.filter((r) => r.method === "PATCH"), []);
    assertEquals(fake.issues[0].assignees.map((a) => a.userId), [
      "user-seth",
      "user-gone",
    ]);
  });
});

Deno.test("swamp-club: an attestation is posted as given, and its id comes back", async () => {
  await withFake(async (fake) => {
    const body = {
      version: "1",
      subject: { commit: "a".repeat(40), branch: "b" },
    };
    const posted = await adapterFor(fake).postAttestation(body);
    assertEquals(posted.id, fake.attestations[0].id);
    assertEquals(fake.requests[0].body, body);
    await failsWith(
      "auth",
      () => adapterFor(fake, MEMBER_KEY).postAttestation(body),
      "Forbidden",
    );
  });
});

Deno.test("swamp-club credentials: the argument, then SWAMP_API_KEY, then auth.json", async () => {
  const file: AuthFile = {
    serverUrl: "https://file.example",
    apiKey: "swamp_from_file",
    username: "seth",
  };
  const env = { SWAMP_API_KEY: "swamp_from_env" };

  const fromArg = sources(env, file);
  assertEquals(
    await resolveLabCredentials({ apiKey: "swamp_from_arg" }, fromArg),
    { url: SWAMP_CLUB_URL, apiKey: "swamp_from_arg" },
  );
  assertEquals(fromArg.fileReads, 0, "auth.json is not read when not needed");

  assertEquals(
    await resolveLabCredentials({}, sources(env, file)),
    { url: SWAMP_CLUB_URL, apiKey: "swamp_from_env" },
  );
  assertEquals(
    await resolveLabCredentials({}, sources({}, file)),
    { url: "https://file.example", apiKey: "swamp_from_file" },
  );
  // The url: the argument, then SWAMP_CLUB_URL, then auth.json.
  const withUrl = { SWAMP_API_KEY: "swamp_from_env" };
  assertEquals(
    (await resolveLabCredentials(
      { url: "https://arg.example/" },
      sources({ ...withUrl, SWAMP_CLUB_URL: "https://env.example" }, file),
    )).url,
    "https://arg.example",
  );
  assertEquals(
    (await resolveLabCredentials(
      {},
      sources({ ...withUrl, SWAMP_CLUB_URL: "https://env.example" }, file),
    )).url,
    "https://env.example",
  );

  const none = await assertRejects(
    () => resolveLabCredentials({}, sources({}, null)),
    TrackerError,
  );
  assertEquals(none.kind, "auth");
  assert(none.message.includes("SWAMP_API_KEY"), none.message);
  assert(none.message.includes("swamp auth login"), none.message);
});

Deno.test("swamp-club: credentials are resolved once, on the first call", async () => {
  await withFake(async (fake) => {
    let resolved = 0;
    const adapter = swampClubAdapter({
      credentials: () => {
        resolved++;
        return Promise.resolve({ url: fake.url, apiKey: ADMIN_KEY });
      },
    });
    assertEquals(resolved, 0);
    await adapter.fetchIssue(ISSUE);
    await adapter.comment(ISSUE, "x");
    assertEquals(resolved, 1);
  });
});

Deno.test("swamp-club: a reply that stalls after its headers times out as upstream, not a raw error", async () => {
  // Headers and the start of a body, then nothing until the adapter gives up.
  let stalled: ReadableStreamDefaultController<Uint8Array> | undefined;
  const server = Deno.serve(
    { hostname: "127.0.0.1", port: 0, onListen: () => {} },
    () =>
      new Response(
        new ReadableStream<Uint8Array>({
          start(controller) {
            stalled = controller;
            controller.enqueue(new TextEncoder().encode('{"issue":'));
          },
        }),
        { headers: { "Content-Type": "application/json" } },
      ),
  );
  try {
    const { port } = server.addr as Deno.NetAddr;
    await failsWith(
      "upstream",
      () =>
        swampClubAdapter({
          credentials: () =>
            Promise.resolve({
              url: `http://127.0.0.1:${port}`,
              apiKey: ADMIN_KEY,
            }),
          timeoutMs: 200,
        }).fetchIssue(ISSUE),
      "no complete reply",
    );
  } finally {
    stalled?.close();
    await server.shutdown();
  }
});

Deno.test("swamp-club: assignees that are not a list are upstream", async () => {
  await withFake(async (fake) => {
    fake.queue.push({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        issue: { title: "t", status: "open", assignees: "seth" },
      }),
    });
    await failsWith(
      "upstream",
      () => adapterFor(fake).fetchIssue(ISSUE),
      "not a list",
    );
    fake.queue.push({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ assignees: null }),
    });
    await failsWith(
      "upstream",
      () => adapterFor(fake).assign(ISSUE, "seth"),
      "not a list",
    );
    // An assignee without a userId could not be kept by a write, so the
    // read fails rather than dropping it.
    for (const entry of [{ username: "skunk-ape" }, null, "user-ape"]) {
      fake.queue.push({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          issue: { title: "t", status: "open", assignees: [entry] },
        }),
      });
      await failsWith(
        "upstream",
        () => adapterFor(fake).fetchIssue(ISSUE),
        "without a userId",
      );
    }
    fake.respond = (r) =>
      r.method === "GET" && r.path === `/api/v1/lab/issues/${ISSUE}`
        ? {
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            issue: {
              title: "t",
              status: "open",
              assignees: [{ username: "skunk-ape" }],
            },
          }),
        }
        : undefined;
    await failsWith(
      "upstream",
      () => adapterFor(fake).assign(ISSUE, "seth"),
      "without a userId",
    );
    assertEquals(fake.requests.filter((r) => r.method === "PATCH"), []);
  });
});

Deno.test("swamp-club: an issue number too long to hold exactly is refused before any call", async () => {
  await withFake(async (fake) => {
    await failsWith(
      "invalid",
      () => adapterFor(fake).fetchIssue("99999999999999999999"),
    );
    assertEquals(fake.requests.length, 0);
  });
});

Deno.test("swamp-club credentials: the stored login's key only goes to its own server", async () => {
  const file: AuthFile = {
    serverUrl: "https://swamp-club.com",
    apiKey: "swamp_from_file",
  };
  const elsewhere = await assertRejects(
    () =>
      resolveLabCredentials({ url: "https://evil.example" }, sources({}, file)),
    TrackerError,
  );
  assertEquals(elsewhere.kind, "auth");
  assert(elsewhere.message.includes("stored login is for"), elsewhere.message);
  assert(!elsewhere.message.includes("swamp_from_file"), "never the key");
  await assertRejects(
    () =>
      resolveLabCredentials(
        {},
        sources({ SWAMP_CLUB_URL: "https://evil.example" }, file),
      ),
    TrackerError,
    "stored login is for",
  );
  // Its own server, however written, is fine.
  assertEquals(
    await resolveLabCredentials(
      { url: "https://swamp-club.com/" },
      sources({}, file),
    ),
    { url: "https://swamp-club.com", apiKey: "swamp_from_file" },
  );
  // The same origin in another spelling is the same server.
  for (const url of ["https://SWAMP-CLUB.com", "https://swamp-club.com:443"]) {
    assertEquals(
      (await resolveLabCredentials({ url }, sources({}, file))).apiKey,
      "swamp_from_file",
      url,
    );
  }
  // Another port or scheme is another server.
  for (const url of ["https://swamp-club.com:8443", "http://127.0.0.1:1"]) {
    await assertRejects(
      () => resolveLabCredentials({ url }, sources({}, file)),
      TrackerError,
      "stored login is for",
    );
  }
  // A url that is not one is refused as such, not as another server.
  const malformed = await assertRejects(
    () => resolveLabCredentials({ url: "not a url" }, sources({}, file)),
    TrackerError,
  );
  assertEquals(malformed.kind, "invalid");
  assert(malformed.message.includes("must be https"), malformed.message);
  // A key given for the other server is used there.
  assertEquals(
    await resolveLabCredentials(
      { url: "https://other.example", apiKey: "swamp_for_other" },
      sources({}, file),
    ),
    { url: "https://other.example", apiKey: "swamp_for_other" },
  );
});

const AUTH_FIXTURES = fromFileUrl(
  new URL("../../../../../testdata/auth/", import.meta.url),
);

Deno.test("swamp-club: the stored login is read from XDG_CONFIG_HOME, with the legacy domain rewritten", async () => {
  const env = (vars: Record<string, string>) => (name: string) => vars[name];
  assertEquals(
    await readSwampAuthFile(env({ XDG_CONFIG_HOME: `${AUTH_FIXTURES}legacy` })),
    {
      serverUrl: SWAMP_CLUB_URL,
      apiKey: "swamp_fixture_key_not_real",
      username: "seth",
    },
  );
  // Any url on the legacy host is rewritten, not only the exact string.
  assertEquals(
    (await readSwampAuthFile(
      env({ XDG_CONFIG_HOME: `${AUTH_FIXTURES}legacy-slash` }),
    ))?.serverUrl,
    SWAMP_CLUB_URL,
  );
  // A file without a key is "not logged in".
  assertEquals(
    await readSwampAuthFile(env({ XDG_CONFIG_HOME: `${AUTH_FIXTURES}empty` })),
    null,
  );
  // No file is "not logged in".
  assertEquals(
    await readSwampAuthFile(env({ XDG_CONFIG_HOME: `${AUTH_FIXTURES}none` })),
    null,
  );
  assertEquals(await readSwampAuthFile(env({})), null);
});

Deno.test("swamp-club: a stored login that cannot be read is an auth error, not logged out", async () => {
  const error = await assertRejects(
    () =>
      readSwampAuthFile((name) =>
        name === "XDG_CONFIG_HOME" ? `${AUTH_FIXTURES}unreadable` : undefined
      ),
    TrackerError,
  );
  assertEquals(error.kind, "auth");
  assert(
    error.message.includes("could not read the stored login"),
    error.message,
  );
});

Deno.test("swamp-club: a stored login with fields of the wrong type is an auth error, not a crash", async () => {
  for (
    const [fixture, says] of [
      ["server-not-string", "serverUrl"],
      ["key-not-string", "apiKey"],
      ["username-not-string", "username"],
      ["json-null", "not a JSON object"],
      ["json-array", "not a JSON object"],
    ]
  ) {
    const error = await assertRejects(
      () =>
        readSwampAuthFile((name) =>
          name === "XDG_CONFIG_HOME" ? `${AUTH_FIXTURES}${fixture}` : undefined
        ),
      TrackerError,
      undefined,
      fixture,
    );
    assertEquals(error.kind, "auth", fixture);
    assert(error.message.includes(says), error.message);
    assert(error.message.includes("swamp auth login"), error.message);
    assert(
      !error.message.includes("swamp_fixture_key_not_real"),
      "never the key",
    );
  }
});

Deno.test("swamp-club credentials: the key only goes to https, or to plain http on loopback", async () => {
  for (
    const url of [
      "https://swamp-club.com",
      "http://127.0.0.1:8080",
      "http://[::1]:8080",
    ]
  ) assertEquals(serverUrlProblem(url), undefined, url);
  for (
    const url of [
      "http://swamp-club.com",
      "http://localhost:1",
      "ftp://x",
      "not a url",
    ]
  ) {
    assert(serverUrlProblem(url)?.includes("must be https"), url);
  }
  const refused = await assertRejects(
    () =>
      resolveLabCredentials(
        { url: "http://swamp-club.example", apiKey: "swamp_key" },
        sources({}, null),
      ),
    TrackerError,
  );
  assertEquals(refused.kind, "invalid");
  assert(!refused.message.includes("swamp_key"), "never the key");
});

Deno.test("swamp-club: create files a Lab issue and reports it from the reply", async () => {
  await withFake(async (fake) => {
    const created = await adapterFor(fake, MEMBER_KEY).create({
      title: "A new issue",
      body: "Filed by gatorwalk.",
      type: "bug",
    });
    const number = LAB_ISSUE + 1;
    assertEquals(created, {
      id: String(number),
      display: `#${number}`,
      title: "A new issue",
      url: `${fake.url}/lab/${number}`,
      status: { id: "open", name: "open" },
      details: {
        body: "Filed by gatorwalk.",
        type: "bug",
        author: "member",
        authorId: "user-member",
        comments: [],
      },
      relations: [],
    });
    // One request: the issue is built from the reply, never read back.
    assertEquals(fake.requests.length, 1);
    assertEquals(fake.requests[0].method, "POST");
    assertEquals(fake.requests[0].path, "/api/v1/lab/issues");
  });
});

Deno.test("swamp-club: create refuses a type the Lab lacks before any request, and a refused one is invalid", async () => {
  await withFake(async (fake) => {
    await failsWith(
      "invalid",
      () => adapterFor(fake).create({ title: "t", body: "b", type: "chore" }),
      "not a Lab issue type",
    );
    await failsWith(
      "invalid",
      () => adapterFor(fake).create({ title: "t", body: " ", type: "bug" }),
      "a title and a body",
    );
    assertEquals(fake.requests.length, 0);
    // Only an admin may file a platform issue.
    await failsWith(
      "invalid",
      () =>
        adapterFor(fake, MEMBER_KEY).create({
          title: "t",
          body: "b",
          type: "platform",
        }),
      "Invalid type",
    );
    await failsWith(
      "auth",
      () =>
        adapterFor(fake, "swamp_wrong_key").create({
          title: "t",
          body: "b",
          type: "bug",
        }),
    );
    assertEquals(fake.issues.length, 1);
  });
});

Deno.test("swamp-club: a create reply without an issue number is upstream", async () => {
  await withFake(async (fake) => {
    fake.queue.push({
      status: 201,
      body: JSON.stringify({ issue: { title: "t" } }),
      contentType: "application/json",
    });
    await failsWith(
      "upstream",
      () => adapterFor(fake).create({ title: "t", body: "b", type: "bug" }),
      "without its number",
    );
  });
});

Deno.test("swamp-club: a member key cannot add blocked_by, and the refusal is auth", async () => {
  await withFake(async (fake) => {
    const member = adapterFor(fake, MEMBER_KEY);
    const draft = { title: "Mine", body: "b", type: "bug" };
    const a = await member.create(draft);
    const b = await member.create(draft);
    await failsWith(
      "auth",
      () => member.relate(a.id, "blocked_by", b.id),
      "blocked_by relations",
    );
    // A member may relate their own issues.
    assertEquals(await member.relate(a.id, "related_to", b.id), {
      changed: true,
    });
  });
});

Deno.test("swamp-club: unrelate deletes the relationship by id, and the 204 reads as success", async () => {
  await withFake(async (fake) => {
    const lab = adapterFor(fake);
    const other = await lab.create({ title: "Other", body: "b", type: "bug" });
    await lab.relate(ISSUE, "blocked_by", other.id);
    const [stored] = fake.relationships;
    assertEquals(stored.type, "blocked_by");
    assertEquals(await lab.unrelate(ISSUE, "blocked_by", other.id), {
      changed: true,
    });
    const deletion = fake.requests.find((r) => r.method === "DELETE");
    assertEquals(deletion?.path, `/api/v1/lab/issues/${ISSUE}/relationships`);
    assertEquals(deletion?.body, { relationshipId: stored.id });
    assertEquals(fake.relationships, []);
  });
});

Deno.test("swamp-club: a relationship the adapter cannot read is skipped, so the lookup still works", async () => {
  await withFake(async (fake) => {
    fake.queue.push({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        issue: { title: "t", status: "open" },
        relationships: [
          { id: "r1", type: "parent_of", direction: "sideways" },
          { id: "r2", type: "follows", direction: "outgoing" },
          {
            id: "r3",
            type: "related_to",
            direction: "incoming",
            sourceIssueNumber: 7,
            targetIssueNumber: LAB_ISSUE,
          },
        ],
      }),
    });
    const issue = await adapterFor(fake).fetchIssue(ISSUE);
    assertEquals(issue.relations, [{
      type: "related_to",
      direction: "incoming",
      issue: "7",
      display: "#7",
    }]);
  });
});
