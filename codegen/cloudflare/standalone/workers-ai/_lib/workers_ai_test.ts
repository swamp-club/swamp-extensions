// Copyright (C) 2026 Elder Swamp Club, Inc.
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

import {
  assertEquals,
  assertRejects,
  assertStringIncludes,
  assertThrows,
} from "jsr:@std/assert@1.0.19";
import { z } from "npm:zod@4.6.7";
import {
  assertAllAnswered,
  checkCredentials,
  type ClientConfig,
  CloudflareApiError,
  describeErrorBody,
  ImagesSchema,
  parseRetryAfter,
  previewBody,
  requestJson,
  resolveCredentials,
  retryDelayMs,
  runModel,
  unwrapEnvelope,
} from "./workers_ai.ts";

const ENV_NAMES = [
  "CLOUDFLARE_API_TOKEN",
  "CLOUDFLARE_API_KEY",
  "CLOUDFLARE_EMAIL",
  "CLOUDFLARE_ACCOUNT_ID",
];

/** Run `fn` with every Cloudflare env var cleared, restoring them afterwards. */
async function withoutCloudflareEnv(fn: () => Promise<void> | void) {
  const previous = ENV_NAMES.map((n) => Deno.env.get(n));
  try {
    for (const n of ENV_NAMES) Deno.env.delete(n);
    await fn();
  } finally {
    ENV_NAMES.forEach((n, i) => {
      const value = previous[i];
      if (value === undefined) Deno.env.delete(n);
      else Deno.env.set(n, value);
    });
  }
}

function config(
  fetchImpl: typeof fetch,
  overrides: Partial<ClientConfig> = {},
): ClientConfig {
  return {
    authHeaders: { Authorization: "Bearer test-token" },
    accountId: "acct-123",
    baseUrl: "https://api.example.com/client/v4/",
    timeoutMs: 1_000,
    maxRetries: 2,
    fetch: fetchImpl,
    sleep: () => Promise.resolve(),
    ...overrides,
  };
}

const ResultSchema = z.object({ answers: z.record(z.string(), z.number()) });

Deno.test("runModel posts to the Workers AI route and unwraps the envelope", async () => {
  const seen: { url?: string; init?: RequestInit } = {};
  const fetchImpl: typeof fetch = (input, init) => {
    seen.url = String(input);
    seen.init = init;
    return Promise.resolve(
      Response.json({
        success: true,
        errors: [],
        result: { answers: { a: 1 } },
      }),
    );
  };
  const result = await runModel(
    config(fetchImpl),
    "clef-flash",
    { model: "clef-flash" },
    ResultSchema,
    "probe",
  );
  assertEquals(
    seen.url,
    "https://api.example.com/client/v4/accounts/acct-123/ai/run/@cf/cloudflare/clef-flash",
  );
  assertEquals(seen.init?.method, "POST");
  const headers = seen.init?.headers as Record<string, string>;
  assertEquals(headers.Authorization, "Bearer test-token");
  assertEquals(headers["Content-Type"], "application/json");
  assertEquals(result, { answers: { a: 1 } });
});

Deno.test("runModel accepts an un-enveloped result and rejects a bad shape", async () => {
  const ok: typeof fetch = () =>
    Promise.resolve(Response.json({ answers: { a: 1 } }));
  assertEquals(
    await runModel(config(ok), "clef", {}, ResultSchema, "probe"),
    { answers: { a: 1 } },
  );
  const bad: typeof fetch = () =>
    Promise.resolve(Response.json({ success: true, result: { answers: 1 } }));
  await assertRejects(
    () => runModel(config(bad), "clef", {}, ResultSchema, "probe"),
    Error,
    "unexpected response shape",
  );
});

Deno.test("runModel surfaces envelope errors on a 200 with success false", async () => {
  const fetchImpl: typeof fetch = () =>
    Promise.resolve(Response.json({
      success: false,
      errors: [{ code: 5006, message: "Error: oneOf at '/' not met" }],
      result: null,
    }));
  await assertRejects(
    () => runModel(config(fetchImpl), "clef", {}, ResultSchema, "probe"),
    CloudflareApiError,
    "[5006] Error: oneOf at '/' not met",
  );
});

Deno.test("requestJson sends legacy key+email headers when configured", async () => {
  let headers: Record<string, string> = {};
  const fetchImpl: typeof fetch = (_input, init) => {
    headers = init?.headers as Record<string, string>;
    return Promise.resolve(Response.json({ ok: true }));
  };
  await requestJson(
    config(fetchImpl, {
      authHeaders: { "X-Auth-Key": "k", "X-Auth-Email": "e@example.com" },
    }),
    "GET",
    "/x",
    "probe",
  );
  assertEquals(headers["X-Auth-Key"], "k");
  assertEquals(headers["X-Auth-Email"], "e@example.com");
  assertEquals("Authorization" in headers, false);
});

Deno.test("requestJson surfaces 4xx envelope errors with status and messages", async () => {
  const fetchImpl: typeof fetch = () =>
    Promise.resolve(
      new Response(
        JSON.stringify({
          success: false,
          errors: [{ code: 10000, message: "Authentication error" }],
        }),
        { status: 403 },
      ),
    );
  const err = await assertRejects(
    () => requestJson(config(fetchImpl), "POST", "/x", "probe", {}),
    CloudflareApiError,
    "HTTP 403",
  );
  assertEquals(err.status, 403);
  assertStringIncludes(err.message, "[10000] Authentication error");
});

Deno.test("requestJson retries 429 then succeeds", async () => {
  let calls = 0;
  const fetchImpl: typeof fetch = () => {
    calls++;
    if (calls === 1) {
      return Promise.resolve(
        new Response("slow down", {
          status: 429,
          headers: { "retry-after": "0" },
        }),
      );
    }
    return Promise.resolve(Response.json({ ok: true }));
  };
  assertEquals(
    await requestJson(config(fetchImpl), "GET", "/x", "probe"),
    { ok: true },
  );
  assertEquals(calls, 2);
});

Deno.test("requestJson stops retrying after maxRetries", async () => {
  let calls = 0;
  const fetchImpl: typeof fetch = () => {
    calls++;
    return Promise.resolve(new Response("overloaded", { status: 503 }));
  };
  await assertRejects(
    () =>
      requestJson(config(fetchImpl, { maxRetries: 1 }), "GET", "/x", "probe"),
    CloudflareApiError,
    "HTTP 503",
  );
  assertEquals(calls, 2);
});

Deno.test("requestJson retries connection failures", async () => {
  let calls = 0;
  const fetchImpl: typeof fetch = () => {
    calls++;
    if (calls === 1) return Promise.reject(new TypeError("connection refused"));
    return Promise.resolve(Response.json({ ok: true }));
  };
  assertEquals(
    await requestJson(config(fetchImpl), "GET", "/x", "probe"),
    { ok: true },
  );
  assertEquals(calls, 2);
});

Deno.test("requestJson does not retry after a user abort", async () => {
  const controller = new AbortController();
  let calls = 0;
  const fetchImpl: typeof fetch = () => {
    calls++;
    controller.abort(new Error("user cancelled"));
    return Promise.reject(new TypeError("aborted"));
  };
  await assertRejects(
    () =>
      requestJson(
        config(fetchImpl, { signal: controller.signal }),
        "GET",
        "/x",
        "probe",
      ),
    Error,
    "user cancelled",
  );
  assertEquals(calls, 1);
});

Deno.test("resolveCredentials prefers a token, falls back to key+email and env", async () => {
  await withoutCloudflareEnv(() => {
    assertEquals(
      resolveCredentials({ apiToken: "t", apiKey: "k", account_id: "a" }),
      { authHeaders: { Authorization: "Bearer t" }, accountId: "a" },
    );
    assertEquals(
      resolveCredentials({ apiKey: "k", email: "e", account_id: "a" }),
      {
        authHeaders: { "X-Auth-Key": "k", "X-Auth-Email": "e" },
        accountId: "a",
      },
    );
    Deno.env.set("CLOUDFLARE_API_TOKEN", "env-token");
    Deno.env.set("CLOUDFLARE_ACCOUNT_ID", "env-acct");
    assertEquals(resolveCredentials({}), {
      authHeaders: { Authorization: "Bearer env-token" },
      accountId: "env-acct",
    });
  });
});

Deno.test("resolveCredentials reports every missing piece", async () => {
  await withoutCloudflareEnv(() => {
    const err = assertThrows(() => resolveCredentials({ apiKey: "k" }));
    assertStringIncludes(
      (err as Error).message,
      "Cloudflare credentials not set",
    );
    assertStringIncludes(
      (err as Error).message,
      "No Cloudflare account ID configured",
    );
    assertEquals(checkCredentials({ apiToken: "t" }).pass, false);
    assertEquals(
      checkCredentials({ apiToken: "t", account_id: "a" }).pass,
      true,
    );
  });
});

Deno.test("unwrapEnvelope passes through bodies without an envelope", () => {
  assertEquals(unwrapEnvelope({ a: 1 }, "probe"), { a: 1 });
  assertEquals(unwrapEnvelope({ success: true, result: 2 }, "probe"), 2);
});

Deno.test("assertAllAnswered names missing keys", () => {
  assertAllAnswered("probe", ["a"], { a: 1 });
  const err = assertThrows(() => assertAllAnswered("probe", ["a", "b"], {}));
  assertStringIncludes((err as Error).message, "missing answers for: a, b");
});

Deno.test("describeErrorBody prefers envelope messages", () => {
  assertEquals(
    describeErrorBody({ success: false, errors: [{ message: "nope" }] }),
    "nope",
  );
  assertEquals(describeErrorBody("plain text"), "plain text");
});

Deno.test("ImagesSchema accepts data URLs and objects, rejects remote URLs", () => {
  assertEquals(
    ImagesSchema.safeParse([
      "data:image/jpeg;base64,/9j/4AAQ",
      { content_type: "image/webp", base64: "UklGR" },
    ]).success,
    true,
  );
  assertEquals(
    ImagesSchema.safeParse(["https://example.com/a.png"]).success,
    false,
  );
  assertEquals(
    ImagesSchema.safeParse(Array(5).fill("data:image/png;base64,AA")).success,
    false,
  );
});

Deno.test("parseRetryAfter handles ms, seconds, and dates", () => {
  assertEquals(parseRetryAfter(new Headers({ "retry-after-ms": "250" })), 250);
  assertEquals(parseRetryAfter(new Headers({ "retry-after": "2" })), 2000);
  const now = Date.parse("2026-01-01T00:00:00Z");
  assertEquals(
    parseRetryAfter(
      new Headers({ "retry-after": "Thu, 01 Jan 2026 00:00:05 GMT" }),
      now,
    ),
    5000,
  );
  assertEquals(parseRetryAfter(new Headers()), undefined);
});

Deno.test("retryDelayMs prefers Retry-After and caps backoff", () => {
  assertEquals(retryDelayMs(0, new Headers({ "retry-after": "1" })), 1000);
  assertEquals(retryDelayMs(0, undefined, () => 0), 500);
  assertEquals(retryDelayMs(10, undefined, () => 0), 5000);
  // A huge Retry-After falls back to backoff.
  assertEquals(
    retryDelayMs(0, new Headers({ "retry-after": "3600" }), () => 0),
    500,
  );
});

Deno.test("previewBody flattens and truncates", () => {
  assertEquals(previewBody(""), "(empty body)");
  assertEquals(previewBody({ a: 1 }), '{"a":1}');
  assertEquals(previewBody("x".repeat(600)).length, 501);
});
