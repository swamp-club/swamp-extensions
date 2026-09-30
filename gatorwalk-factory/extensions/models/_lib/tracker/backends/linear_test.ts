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
  OTHER_UUID,
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

const adapterFor = (fake: LinearFake, apiToken = FAKE_TOKEN) =>
  linearAdapter({ apiToken, apiUrl: fake.url });

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
        slug: "gw-16-linear-adapter",
      },
      missing: OTHER_UUID,
      statusNames: ["In Progress", "In Review"],
      commentsPosted: () => fake.comments.length,
    });
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
