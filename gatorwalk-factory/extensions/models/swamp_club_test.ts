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
  SwampClubArgumentsSchema,
  swampClubMethods,
} from "./swamp_club.ts";
import {
  type AuthFile,
  type CredentialSources,
  SWAMP_CLUB_TYPE,
} from "./_lib/swamp_club.ts";
import {
  ADMIN_KEY,
  LAB_ISSUE,
  type SwampClubFake,
  swampClubFake,
} from "./_lib/swamp_club_fake.ts";
import { type FakeSwamp, fakeSwamp } from "./_lib/fake_swamp.ts";
import { TrackerError } from "./_lib/tracker.ts";

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

Deno.test("swamp-club model: assign defaults to the stored login's user", async () => {
  await withLab(
    (fake) => ({ apiKey: ADMIN_KEY, url: fake.url }),
    async (swamp, fake) => {
      const withLogin = swampClubMethods({
        sources: sources({}, {
          serverUrl: "https://ignored.example",
          apiKey: "swamp_other",
          username: "seth",
        }),
      });
      await call(withLogin, swamp, "assign", { issue: ISSUE });
      assertEquals(fake.issues[0].assignees.map((a) => a.username), ["seth"]);

      await call(withLogin, swamp, "assign", {
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

Deno.test("swamp-club model: the same attestation posts once; a rebuilt one posts again", async () => {
  const methods = swampClubMethods({ sources: sources() });
  await withLab(
    (fake) => ({ apiKey: ADMIN_KEY, url: fake.url }),
    async (swamp, fake) => {
      await call(methods, swamp, "post_attestation", {
        attestation: JSON.stringify(attestation()),
      });
      await call(methods, swamp, "post_attestation", {
        attestation: attestation(),
      });
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
