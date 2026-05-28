import { assertEquals, assertRejects, assertStringIncludes } from "@std/assert";
import { generateHetznerLibFile } from "./libGenerator.ts";

// The generated `_lib/hetzner.ts` is a string template. To exercise its runtime
// behavior we write it to a temp file and dynamic-import it with a cache-busting
// URL query so every test gets a fresh module instance (resets the
// module-level `validatedTokens` cache in getToken()).

interface HetznerLib {
  create: (
    endpoint: string,
    body: Record<string, unknown>,
    token?: string,
  ) => Promise<Record<string, unknown>>;
  read: (
    endpoint: string,
    id: number | string,
    token?: string,
  ) => Promise<Record<string, unknown>>;
  listAll: (
    endpoint: string,
    queryParams?: Record<string, string>,
    token?: string,
  ) => Promise<Record<string, unknown>[]>;
  remove: (
    endpoint: string,
    id: number | string,
    token?: string,
  ) => Promise<{ existed: boolean }>;
}

async function importFreshHetznerLib(): Promise<
  { mod: HetznerLib; cleanup: () => Promise<void> }
> {
  const tmp = await Deno.makeTempFile({ suffix: ".ts" });
  await Deno.writeTextFile(tmp, generateHetznerLibFile());
  try {
    const mod = await import(
      `file://${tmp}?v=${crypto.randomUUID()}`
    ) as unknown as HetznerLib;
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
 * next response from `queue`; if the queue is empty, the test fails.
 * Always restores the original fetch in `finally`.
 *
 * The first entry in `queue` must answer the GET /v1/locations call that
 * getToken() makes to validate the token.
 */
async function withFetchQueue(
  queue: StubResponse[],
  fn: () => Promise<void>,
): Promise<void> {
  const originalFetch = globalThis.fetch;
  const calls: Array<{ method: string; url: string }> = [];
  let index = 0;
  globalThis.fetch = ((input: RequestInfo | URL, init?: RequestInit) => {
    const req = input instanceof Request ? input : new Request(input, init);
    calls.push({ method: req.method, url: req.url });
    if (index >= queue.length) {
      throw new Error(
        `fetch called ${calls.length} times, stub queue only has ${queue.length} responses. Call history: ${
          JSON.stringify(calls)
        }`,
      );
    }
    const entry = queue[index++];
    return Promise.resolve(
      typeof entry === "function" ? entry(req) : entry,
    );
  }) as typeof fetch;
  try {
    await fn();
  } finally {
    globalThis.fetch = originalFetch;
  }
}

/**
 * Replaces globalThis.fetch with a request router and records every request so
 * tests can assert on headers, URLs, and call counts. The handler decides the
 * response per request (e.g. answer /locations, paginate /servers). Always
 * restores the original fetch in `finally`.
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

/** Canned happy-path response for GET /v1/locations (getToken validation). */
function okLocations(): Response {
  return new Response("{}", { status: 200 });
}

function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function resourceInUseBody(id: number): unknown {
  return {
    error: {
      code: "resource_in_use",
      message: `firewall with ID ${id} is still in use`,
      details: null,
    },
  };
}

/**
 * Save HETZNER_API_TOKEN, set it to a test value, and return a restore
 * function to call in each test's `finally` block. CLAUDE.md testing rule:
 * env vars must be restored so changes don't leak into later tests.
 */
function withTestToken(): () => void {
  const original = Deno.env.get("HETZNER_API_TOKEN");
  Deno.env.set("HETZNER_API_TOKEN", "test-token");
  return () => {
    if (original === undefined) {
      Deno.env.delete("HETZNER_API_TOKEN");
    } else {
      Deno.env.set("HETZNER_API_TOKEN", original);
    }
  };
}

Deno.test("remove: succeeds on first attempt when API returns 204", async () => {
  const restoreToken = withTestToken();
  const { mod, cleanup } = await importFreshHetznerLib();
  try {
    await withFetchQueue(
      [
        okLocations(),
        new Response(null, { status: 204 }),
      ],
      async () => {
        const result = await mod.remove("/firewalls", 123);
        assertEquals(result, { existed: true });
      },
    );
  } finally {
    await cleanup();
    restoreToken();
  }
});

Deno.test("remove: returns existed=false when API returns 404", async () => {
  const restoreToken = withTestToken();
  const { mod, cleanup } = await importFreshHetznerLib();
  try {
    await withFetchQueue(
      [
        okLocations(),
        new Response("not found", { status: 404 }),
      ],
      async () => {
        const result = await mod.remove("/firewalls", 999);
        assertEquals(result, { existed: false });
      },
    );
  } finally {
    await cleanup();
    restoreToken();
  }
});

Deno.test("remove: retries on 422 resource_in_use, succeeds after propagation clears", async () => {
  const restoreToken = withTestToken();
  const { mod, cleanup } = await importFreshHetznerLib();
  try {
    // The retry uses a 3-second delay. Stub setTimeout to resolve instantly so
    // this test runs in milliseconds instead of ~6 seconds.
    const originalSetTimeout = globalThis.setTimeout;
    (globalThis as unknown as { setTimeout: typeof setTimeout }).setTimeout =
      ((fn: () => void) => {
        queueMicrotask(fn);
        return 0 as unknown as ReturnType<typeof setTimeout>;
      }) as typeof setTimeout;
    try {
      await withFetchQueue(
        [
          okLocations(),
          jsonResponse(422, resourceInUseBody(123)),
          jsonResponse(422, resourceInUseBody(123)),
          new Response(null, { status: 204 }),
        ],
        async () => {
          const result = await mod.remove("/firewalls", 123);
          assertEquals(result, { existed: true });
        },
      );
    } finally {
      globalThis.setTimeout = originalSetTimeout;
    }
  } finally {
    await cleanup();
    restoreToken();
  }
});

Deno.test("remove: throws after exhausting retries on persistent 422 resource_in_use", async () => {
  const restoreToken = withTestToken();
  const { mod, cleanup } = await importFreshHetznerLib();
  try {
    const originalSetTimeout = globalThis.setTimeout;
    (globalThis as unknown as { setTimeout: typeof setTimeout }).setTimeout =
      ((fn: () => void) => {
        queueMicrotask(fn);
        return 0 as unknown as ReturnType<typeof setTimeout>;
      }) as typeof setTimeout;
    try {
      await withFetchQueue(
        [
          okLocations(),
          jsonResponse(422, resourceInUseBody(123)),
          jsonResponse(422, resourceInUseBody(123)),
          jsonResponse(422, resourceInUseBody(123)),
        ],
        async () => {
          const err = await assertRejects(
            () => mod.remove("/firewalls", 123),
            Error,
            "timed out after 3 attempts",
          );
          assertStringIncludes(err.message, "resource_in_use");
          assertStringIncludes(err.message, "DELETE /firewalls/123");
        },
      );
    } finally {
      globalThis.setTimeout = originalSetTimeout;
    }
  } finally {
    await cleanup();
    restoreToken();
  }
});

Deno.test("remove: throws immediately on 422 with a different error code (no retry)", async () => {
  const restoreToken = withTestToken();
  const { mod, cleanup } = await importFreshHetznerLib();
  try {
    await withFetchQueue(
      [
        okLocations(),
        jsonResponse(422, {
          error: {
            code: "invalid_input",
            message: "id must be a positive integer",
            details: null,
          },
        }),
      ],
      async () => {
        const err = await assertRejects(
          () => mod.remove("/firewalls", 123),
          Error,
          "returned 422",
        );
        assertStringIncludes(err.message, "invalid_input");
      },
    );
  } finally {
    await cleanup();
    restoreToken();
  }
});

Deno.test("remove: throws immediately on 422 with a non-JSON body (no retry)", async () => {
  const restoreToken = withTestToken();
  const { mod, cleanup } = await importFreshHetznerLib();
  try {
    await withFetchQueue(
      [
        okLocations(),
        new Response("upstream proxy error", { status: 422 }),
      ],
      async () => {
        const err = await assertRejects(
          () => mod.remove("/firewalls", 123),
          Error,
          "returned 422",
        );
        assertStringIncludes(err.message, "upstream proxy error");
      },
    );
  } finally {
    await cleanup();
    restoreToken();
  }
});

Deno.test("remove: surfaces non-422 non-404 error through request() (e.g. 500)", async () => {
  const restoreToken = withTestToken();
  const { mod, cleanup } = await importFreshHetznerLib();
  try {
    await withFetchQueue(
      [
        okLocations(),
        new Response('{"error":{"code":"service_error"}}', {
          status: 500,
        }),
      ],
      async () => {
        const err = await assertRejects(
          () => mod.remove("/firewalls", 123),
          Error,
          "returned 500",
        );
        assertStringIncludes(err.message, "service_error");
      },
    );
  } finally {
    await cleanup();
    restoreToken();
  }
});

Deno.test("getToken: an explicit token overrides the HETZNER_API_TOKEN env var", async () => {
  const restoreToken = withTestToken(); // sets env token to "test-token"
  const { mod, cleanup } = await importFreshHetznerLib();
  try {
    await withFetchRouter(
      (req) =>
        req.url.endsWith("/locations")
          ? okLocations()
          : jsonResponse(200, { server: { id: 1, name: "web" } }),
      async (calls) => {
        await mod.create("/servers", { name: "web" }, "explicit-token");
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

Deno.test("getToken: each distinct token is validated exactly once (no leakage)", async () => {
  const restoreToken = withTestToken();
  const { mod, cleanup } = await importFreshHetznerLib();
  try {
    await withFetchRouter(
      (req) =>
        req.url.endsWith("/locations")
          ? okLocations()
          : jsonResponse(200, { server: { id: 1 } }),
      async (calls) => {
        await mod.create("/servers", {}, "token-a");
        await mod.create("/servers", {}, "token-a"); // cached — no re-validation
        await mod.create("/servers", {}, "token-b");
        const validations = calls.filter((r) => r.url.endsWith("/locations"));
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

Deno.test("listAll: sends label_selector and pagination as query params", async () => {
  const restoreToken = withTestToken();
  const { mod, cleanup } = await importFreshHetznerLib();
  try {
    await withFetchRouter(
      (req) =>
        req.url.endsWith("/locations") ? okLocations() : jsonResponse(200, {
          servers: [{ id: 1, name: "web" }],
          meta: { pagination: { next_page: null } },
        }),
      async (calls) => {
        const items = await mod.listAll(
          "/servers",
          { label_selector: "env=prod" },
          "t",
        );
        assertEquals(items.length, 1);
        const listCall = calls.find((r) => r.url.includes("/servers"))!;
        const url = new URL(listCall.url);
        assertEquals(url.searchParams.get("label_selector"), "env=prod");
        assertEquals(url.searchParams.get("per_page"), "50");
        assertEquals(url.searchParams.get("page"), "1");
      },
    );
  } finally {
    await cleanup();
    restoreToken();
  }
});

Deno.test("listAll: follows meta.pagination.next_page and accumulates every item", async () => {
  const restoreToken = withTestToken();
  const { mod, cleanup } = await importFreshHetznerLib();
  try {
    await withFetchRouter(
      (req) => {
        if (req.url.endsWith("/locations")) return okLocations();
        const page = new URL(req.url).searchParams.get("page");
        return page === "1"
          ? jsonResponse(200, {
            servers: [{ id: 1 }, { id: 2 }],
            meta: { pagination: { next_page: 2 } },
          })
          : jsonResponse(200, {
            servers: [{ id: 3 }],
            meta: { pagination: { next_page: null } },
          });
      },
      async (calls) => {
        const items = await mod.listAll("/servers", undefined, "t");
        assertEquals(items.map((i) => i.id), [1, 2, 3]);
        const pageCalls = calls.filter((r) => r.url.includes("page="));
        assertEquals(pageCalls.length, 2); // followed exactly one next_page
      },
    );
  } finally {
    await cleanup();
    restoreToken();
  }
});

Deno.test("listAll: surfaces a non-OK page response as an error", async () => {
  const restoreToken = withTestToken();
  const { mod, cleanup } = await importFreshHetznerLib();
  try {
    await withFetchRouter(
      (req) =>
        req.url.endsWith("/locations")
          ? okLocations()
          : new Response('{"error":{"code":"unauthorized"}}', { status: 401 }),
      async () => {
        await assertRejects(
          () => mod.listAll("/servers", undefined, "t"),
          Error,
          "returned 401",
        );
      },
    );
  } finally {
    await cleanup();
    restoreToken();
  }
});
