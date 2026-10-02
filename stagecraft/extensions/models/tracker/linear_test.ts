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
import { LinearArgumentsSchema, model } from "./linear.ts";
import { LINEAR_TYPE } from "../_lib/tracker/backends/linear.ts";
import {
  FAKE_TOKEN,
  ISSUE_UUID,
  type LinearFake,
  linearFake,
  OTHER_USER_ID,
  VIEWER_ID,
} from "../_lib/tracker/backends/linear_fake.ts";
import { type FakeSwamp, fakeSwamp } from "../_lib/engine/tracker_testing.ts";
import {
  TRACKED_ITEM,
  trackedItem,
} from "../_lib/tracker/core/test_support.ts";

const INSTANCE = "linear";

type MethodName = keyof typeof model.methods;

async function call(
  swamp: FakeSwamp,
  name: MethodName,
  raw: Record<string, unknown>,
) {
  const method = model.methods[name];
  const execute = method.execute as (
    args: unknown,
    ctx: ReturnType<FakeSwamp["context"]>,
  ) => Promise<unknown>;
  return await execute(method.arguments.parse(raw), swamp.context(INSTANCE));
}

async function withLinear(
  globalArgs: (fake: LinearFake) => Record<string, unknown>,
  fn: (swamp: FakeSwamp, fake: LinearFake) => Promise<void>,
) {
  const fake = linearFake();
  try {
    const swamp = fakeSwamp();
    swamp.globalArgs.set(INSTANCE, globalArgs(fake));
    await fn(swamp, fake);
  } finally {
    await fake.close();
  }
}

Deno.test("linear model: the type literal matches LINEAR_TYPE", () => {
  assertEquals(model.type, LINEAR_TYPE);
});

Deno.test("linear model: apiToken is sensitive, so swamp redacts and vaults it", () => {
  const meta = LinearArgumentsSchema.shape.apiToken.meta();
  assertEquals(meta?.sensitive, true);
});

Deno.test("linear model: fetch, comment once per delivery key, and set a mapped status", async () => {
  await withLinear(
    (fake) => ({
      apiToken: FAKE_TOKEN,
      apiUrl: fake.url,
      // A JSON string, as --global-arg passes it.
      statuses: JSON.stringify({ started: "In Progress" }),
    }),
    async (swamp, fake) => {
      fake.issues[0].assigneeId = VIEWER_ID;
      await call(swamp, "fetch_issue", { issue: "GW-16" });
      const snapshot = swamp.resources.get(INSTANCE)?.get(
        `issue-${ISSUE_UUID}`,
      )?.[0];
      assertEquals(snapshot?.display, "GW-16");
      assertEquals(snapshot?.details, {
        assignee: { id: VIEWER_ID, name: "Pat Viewer", displayName: "pat" },
      });

      const key = { workItem: "build-abcdefgh", journalVersion: "7" };
      await call(swamp, "comment", { issue: ISSUE_UUID, body: "hi", ...key });
      await call(swamp, "comment", { issue: ISSUE_UUID, body: "hi", ...key });
      assertEquals(fake.comments.length, 1);

      await call(swamp, "set_status", { issue: ISSUE_UUID, status: "started" });
      assertEquals(fake.issues[0].stateId, "state-progress");

      const logged = JSON.stringify(swamp.logs);
      assert(!logged.includes(FAKE_TOKEN), "the token is never logged");
    },
  );
});

Deno.test("linear model: no apiToken fails before any call, naming the vault route", async () => {
  await withLinear((fake) => ({ apiUrl: fake.url }), async (swamp, fake) => {
    await assertRejects(
      () => call(swamp, "fetch_issue", { issue: "GW-16" }),
      Error,
      "vault.get",
    );
    assertEquals(fake.requests.length, 0);
  });
});

Deno.test("linear model: a plain-http apiUrl off loopback fails before any call", async () => {
  await withLinear(
    (fake) => ({
      apiToken: FAKE_TOKEN,
      apiUrl: fake.url.replace("127.0.0.1", "localhost"),
    }),
    async (swamp, fake) => {
      await assertRejects(
        () => call(swamp, "fetch_issue", { issue: "GW-16" }),
        Error,
        "must be https",
      );
      assertEquals(fake.requests.length, 0);
    },
  );
  const parsed = LinearArgumentsSchema.shape.apiUrl.safeParse(
    "http://api.linear.app/graphql",
  );
  assert(!parsed.success && parsed.error.message.includes("must be https"));
});

Deno.test("linear model: publish comments on a park at the dispatch cap and its grant once each", async () => {
  await withLinear(
    (fake) => ({
      apiToken: FAKE_TOKEN,
      apiUrl: fake.url,
      statuses: JSON.stringify({ in_progress: "In Progress" }),
    }),
    async (swamp, fake) => {
      const item = await trackedItem(
        swamp,
        { linear: ISSUE_UUID },
        undefined,
        { tracker: INSTANCE, kind: "linear" },
      );
      assert(await item.tryDispatch());
      assert(await item.tryDispatch());
      assertEquals(await item.tryDispatch(), false);
      await call(swamp, "publish", { workItem: TRACKED_ITEM });
      await item.grantDispatch();
      await call(swamp, "publish", { workItem: TRACKED_ITEM });
      const bodies = fake.comments.map((c) => c.body);
      assertEquals(bodies.length, 3, bodies.join("\n"));
      assert(
        bodies[1].includes(
          "dispatch limit reached (2 of 2); a person must grant a dispatch " +
            "override.",
        ),
        bodies[1],
      );
      assert(
        bodies[2].includes("granted a dispatch override in **write**."),
        bodies[2],
      );
      await call(swamp, "publish", { workItem: TRACKED_ITEM });
      assertEquals(fake.comments.length, 3);
    },
  );
});

Deno.test("linear model: publish assigns the API key's owner when a work item starts, once", async () => {
  await withLinear(
    (fake) => ({
      apiToken: FAKE_TOKEN,
      apiUrl: fake.url,
      statuses: JSON.stringify({ in_progress: "In Progress" }),
    }),
    async (swamp, fake) => {
      await trackedItem(
        swamp,
        { linear: ISSUE_UUID },
        undefined,
        { tracker: INSTANCE, kind: "linear" },
      );
      await call(swamp, "publish", { workItem: TRACKED_ITEM });
      assertEquals(fake.issues[0].assigneeId, VIEWER_ID);
      // A person reassigns it by hand; a later publish leaves that alone.
      fake.issues[0].assigneeId = OTHER_USER_ID;
      await call(swamp, "publish", { workItem: TRACKED_ITEM });
      assertEquals(fake.issues[0].assigneeId, OTHER_USER_ID);
      const logged = JSON.stringify(swamp.logs);
      // The display name, not the user id.
      assert(logged.includes(`assigned ${ISSUE_UUID} to pat`), logged);
      assert(!logged.includes(`to ${VIEWER_ID}`), logged);
      assert(!logged.includes(FAKE_TOKEN), "the token is never logged");
    },
  );
});

Deno.test("linear model: assign defaults to the API key's owner and names whom it replaced", async () => {
  await withLinear(
    (fake) => ({ apiToken: FAKE_TOKEN, apiUrl: fake.url }),
    async (swamp, fake) => {
      fake.issues[0].assigneeId = OTHER_USER_ID;
      await call(swamp, "assign", { issue: ISSUE_UUID });
      assertEquals(fake.issues[0].assigneeId, VIEWER_ID);
      await call(swamp, "assign", { issue: ISSUE_UUID });
      await call(swamp, "assign", { issue: ISSUE_UUID, user: OTHER_USER_ID });
      assertEquals(fake.issues[0].assigneeId, OTHER_USER_ID);
      const summaries = swamp.logs.map((l) => String(l.props?.summary ?? ""))
        .filter((m) => m.includes("assigned"));
      assertEquals(summaries, [
        `assigned ${ISSUE_UUID} to pat; replaced sam`,
        `${ISSUE_UUID} is already assigned to pat; wrote nothing`,
        `assigned ${ISSUE_UUID} to sam; replaced pat`,
      ]);
    },
  );
});
