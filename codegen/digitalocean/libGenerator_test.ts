import { assertEquals, assertRejects, assertStringIncludes } from "@std/assert";
import { generateDigitalOceanLibFile } from "./libGenerator.ts";

// The generated `_lib/digitalocean.ts` is a string template. To exercise its
// runtime behavior we write it to a temp file and dynamic-import it with a
// cache-busting URL query so every test gets a fresh module instance (resets
// the module-level `validatedTokens` cache in getToken()).

interface DigitalOceanLib {
  create: (
    endpoint: string,
    body: Record<string, unknown>,
    queryParams?: Record<string, string>,
    token?: string,
  ) => Promise<Record<string, unknown>>;
  read: (
    endpoint: string,
    id: number | string,
    queryParams?: Record<string, string>,
    token?: string,
  ) => Promise<Record<string, unknown>>;
  remove: (
    endpoint: string,
    id: number | string,
    queryParams?: Record<string, string>,
    token?: string,
  ) => Promise<{ existed: boolean }>;
}

async function importFreshDigitalOceanLib(): Promise<
  { mod: DigitalOceanLib; cleanup: () => Promise<void> }
> {
  const tmp = await Deno.makeTempFile({ suffix: ".ts" });
  await Deno.writeTextFile(tmp, generateDigitalOceanLibFile());
  try {
    const mod = await import(
      `file://${tmp}?v=${crypto.randomUUID()}`
    ) as unknown as DigitalOceanLib;
    return {
      mod,
      cleanup: async () => {
        await Deno.remove(tmp);
      },
    };
  } catch (err) {
    await Deno.remove(tmp);
    throw err;
  }
}

type StubResponse = Response | ((req: Request) => Response | Promise<Response>);

/**
 * Replaces globalThis.fetch with a scripted queue. Each fetch() call pops the
 * next response from `queue`; if the queue is empty, the test fails. Always
 * restores the original fetch in `finally`.
 *
 * The first entry in `queue` must answer the GET /v2/account call that
 * getToken() makes to validate the token.
 */
async function withFetchQueue(
  queue: StubResponse[],
  fn: (calls: Request[]) => Promise<void>,
): Promise<void> {
  const originalFetch = globalThis.fetch;
  const calls: Request[] = [];
  let index = 0;
  globalThis.fetch = ((input: RequestInfo | URL, init?: RequestInit) => {
    const req = input instanceof Request ? input : new Request(input, init);
    calls.push(req);
    if (index >= queue.length) {
      throw new Error(
        `fetch called ${calls.length} times, stub queue only has ${queue.length} responses.`,
      );
    }
    const entry = queue[index++];
    return Promise.resolve(typeof entry === "function" ? entry(req) : entry);
  }) as typeof fetch;
  try {
    await fn(calls);
  } finally {
    globalThis.fetch = originalFetch;
  }
}

/**
 * Replaces globalThis.fetch with a request router and records every request so
 * tests can assert on headers, URLs, and call counts. Always restores the
 * original fetch in `finally`.
 */
async function withFetchRouter(
  handler: (req: Request) => Response | Promise<Response>,
  fn: (calls: Request[]) => Promise<void>,
): Promise<void> {
  const originalFetch = globalThis.fetch;
  const calls: Request[] = [];
  globalThis.fetch = ((input: RequestInfo | URL, init?: RequestInit) => {
    const req = input instanceof Request ? input : new Request(input, init);
    calls.push(req);
    return Promise.resolve(handler(req));
  }) as typeof fetch;
  try {
    await fn(calls);
  } finally {
    globalThis.fetch = originalFetch;
  }
}

/** Canned happy-path response for GET /v2/account (getToken validation). */
function okAccount(): Response {
  return new Response('{"account":{}}', { status: 200 });
}

function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/**
 * Save DO_API_TOKEN, set it to a test value, and return a restore function to
 * call in each test's `finally` block. CLAUDE.md testing rule: env vars must be
 * restored so changes don't leak into later tests.
 */
function withEnvToken(value = "env-token"): () => void {
  const original = Deno.env.get("DO_API_TOKEN");
  Deno.env.set("DO_API_TOKEN", value);
  return () => {
    if (original === undefined) {
      Deno.env.delete("DO_API_TOKEN");
    } else {
      Deno.env.set("DO_API_TOKEN", original);
    }
  };
}

/** Save and clear DO_API_TOKEN; return a restore function. */
function withoutEnvToken(): () => void {
  const original = Deno.env.get("DO_API_TOKEN");
  Deno.env.delete("DO_API_TOKEN");
  return () => {
    if (original !== undefined) Deno.env.set("DO_API_TOKEN", original);
  };
}

Deno.test("getToken: an explicit token overrides the DO_API_TOKEN env var", async () => {
  const restoreToken = withEnvToken(); // sets env token to "env-token"
  const { mod, cleanup } = await importFreshDigitalOceanLib();
  try {
    await withFetchRouter(
      (req) =>
        req.url.endsWith("/v2/account")
          ? okAccount()
          : jsonResponse(201, { droplet: { id: 1, name: "web" } }),
      async (calls) => {
        const result = await mod.create(
          "/v2/droplets",
          { name: "web" },
          undefined,
          "explicit-token",
        );
        assertEquals(result, { id: 1, name: "web" });
        // Both the validation call and the create call use the explicit token,
        // never the env var value.
        assertEquals(calls.length, 2);
        for (const req of calls) {
          assertEquals(
            req.headers.get("Authorization"),
            "Bearer explicit-token",
          );
        }
      },
    );
  } finally {
    await cleanup();
    restoreToken();
  }
});

Deno.test("getToken: falls back to DO_API_TOKEN when no explicit token is given", async () => {
  const restoreToken = withEnvToken("env-token");
  const { mod, cleanup } = await importFreshDigitalOceanLib();
  try {
    await withFetchRouter(
      (req) =>
        req.url.endsWith("/v2/account")
          ? okAccount()
          : jsonResponse(200, { droplet: { id: 7 } }),
      async (calls) => {
        await mod.read("/v2/droplets", 7);
        for (const req of calls) {
          assertEquals(req.headers.get("Authorization"), "Bearer env-token");
        }
      },
    );
  } finally {
    await cleanup();
    restoreToken();
  }
});

Deno.test("getToken: each distinct token is validated exactly once (no leakage)", async () => {
  const restoreToken = withEnvToken();
  const { mod, cleanup } = await importFreshDigitalOceanLib();
  try {
    await withFetchRouter(
      (req) =>
        req.url.endsWith("/v2/account")
          ? okAccount()
          : jsonResponse(201, { droplet: { id: 1 } }),
      async (calls) => {
        await mod.create("/v2/droplets", {}, undefined, "token-a");
        await mod.create("/v2/droplets", {}, undefined, "token-a"); // cached
        await mod.create("/v2/droplets", {}, undefined, "token-b");
        const validations = calls.filter((r) => r.url.endsWith("/v2/account"));
        assertEquals(validations.length, 2); // token-a once, token-b once
        assertEquals(
          validations[0].headers.get("Authorization"),
          "Bearer token-a",
        );
        assertEquals(
          validations[1].headers.get("Authorization"),
          "Bearer token-b",
        );
      },
    );
  } finally {
    await cleanup();
    restoreToken();
  }
});

Deno.test("getToken: throws naming both the token arg and DO_API_TOKEN when neither is set", async () => {
  const restoreToken = withoutEnvToken();
  const { mod, cleanup } = await importFreshDigitalOceanLib();
  try {
    // No token available, so getToken throws before any fetch happens.
    const err = await assertRejects(
      () => mod.create("/v2/droplets", { name: "web" }),
      Error,
      "No DigitalOcean API token found",
    );
    assertStringIncludes(err.message, "token");
    assertStringIncludes(err.message, "DO_API_TOKEN");
    assertStringIncludes(err.message, "vault.get");
  } finally {
    await cleanup();
    restoreToken();
  }
});

Deno.test("token is sent only in the Authorization header, never in the request body", async () => {
  const restoreToken = withEnvToken();
  const { mod, cleanup } = await importFreshDigitalOceanLib();
  try {
    await withFetchRouter(
      (req) =>
        req.url.endsWith("/v2/account")
          ? okAccount()
          : jsonResponse(201, { droplet: { id: 1 } }),
      async (calls) => {
        await mod.create(
          "/v2/droplets",
          { name: "web", region: "nyc1" },
          undefined,
          "secret-token",
        );
        const createCall = calls.find((r) => r.url.endsWith("/v2/droplets"))!;
        assertEquals(
          createCall.headers.get("Authorization"),
          "Bearer secret-token",
        );
        const sentBody = await createCall.text();
        // The token must not leak into the POST body.
        assertEquals(sentBody.includes("secret-token"), false);
        assertEquals(JSON.parse(sentBody), { name: "web", region: "nyc1" });
      },
    );
  } finally {
    await cleanup();
    restoreToken();
  }
});

Deno.test("getToken: surfaces a validation failure from /v2/account", async () => {
  const restoreToken = withEnvToken();
  const { mod, cleanup } = await importFreshDigitalOceanLib();
  try {
    await withFetchQueue(
      [new Response("Unauthorized", { status: 401 })],
      async () => {
        const err = await assertRejects(
          () => mod.read("/v2/droplets", 1, undefined, "bad-token"),
          Error,
          "DigitalOcean API token is invalid",
        );
        assertStringIncludes(err.message, "returned 401");
      },
    );
  } finally {
    await cleanup();
    restoreToken();
  }
});

Deno.test("token threads through remove (DELETE) to the Authorization header", async () => {
  const restoreToken = withEnvToken();
  const { mod, cleanup } = await importFreshDigitalOceanLib();
  try {
    await withFetchRouter(
      (req) =>
        req.url.endsWith("/v2/account")
          ? okAccount()
          : new Response(null, { status: 204 }),
      async (calls) => {
        const result = await mod.remove(
          "/v2/droplets",
          123,
          undefined,
          "delete-token",
        );
        assertEquals(result, { existed: true });
        const deleteCall = calls.find((r) => r.method === "DELETE")!;
        assertEquals(
          deleteCall.headers.get("Authorization"),
          "Bearer delete-token",
        );
      },
    );
  } finally {
    await cleanup();
    restoreToken();
  }
});
