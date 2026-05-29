import { assertEquals, assertRejects, assertStringIncludes } from "@std/assert";
import { generateCloudflareLibFile } from "./libGenerator.ts";

interface AuthOverrides {
  apiToken?: string;
  apiKey?: string;
  email?: string;
}

interface CloudflareLib {
  create: (
    endpoint: string,
    body: Record<string, unknown>,
    auth?: AuthOverrides,
  ) => Promise<Record<string, unknown>>;
  read: (
    endpoint: string,
    id: string,
    auth?: AuthOverrides,
  ) => Promise<Record<string, unknown>>;
  tryRead: (
    endpoint: string,
    id: string,
    auth?: AuthOverrides,
  ) => Promise<Record<string, unknown> | null>;
  remove: (
    endpoint: string,
    id: string,
    auth?: AuthOverrides,
  ) => Promise<{ existed: boolean }>;
}

async function importFreshLib(): Promise<
  { mod: CloudflareLib; cleanup: () => Promise<void> }
> {
  const tmp = await Deno.makeTempFile({ suffix: ".ts" });
  await Deno.writeTextFile(tmp, generateCloudflareLibFile());
  try {
    const mod = await import(
      `file://${tmp}?v=${crypto.randomUUID()}`
    ) as unknown as CloudflareLib;
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

function okTokenVerify(): Response {
  return new Response(
    JSON.stringify({ success: true, result: { status: "active" } }),
    { status: 200 },
  );
}

function cfResponse(result: unknown): Response {
  return new Response(
    JSON.stringify({ success: true, errors: [], messages: [], result }),
    { status: 200, headers: { "Content-Type": "application/json" } },
  );
}

function cfErrorResponse(
  status: number,
  errors: Array<{ code: number; message: string }>,
): Response {
  return new Response(
    JSON.stringify({ success: false, errors, messages: [], result: null }),
    { status, headers: { "Content-Type": "application/json" } },
  );
}

function withTestToken(): () => void {
  const original = Deno.env.get("CLOUDFLARE_API_TOKEN");
  const originalKey = Deno.env.get("CLOUDFLARE_API_KEY");
  const originalEmail = Deno.env.get("CLOUDFLARE_EMAIL");
  Deno.env.set("CLOUDFLARE_API_TOKEN", "test-cf-token");
  Deno.env.delete("CLOUDFLARE_API_KEY");
  Deno.env.delete("CLOUDFLARE_EMAIL");
  return () => {
    if (original === undefined) {
      Deno.env.delete("CLOUDFLARE_API_TOKEN");
    } else {
      Deno.env.set("CLOUDFLARE_API_TOKEN", original);
    }
    if (originalKey === undefined) {
      Deno.env.delete("CLOUDFLARE_API_KEY");
    } else {
      Deno.env.set("CLOUDFLARE_API_KEY", originalKey);
    }
    if (originalEmail === undefined) {
      Deno.env.delete("CLOUDFLARE_EMAIL");
    } else {
      Deno.env.set("CLOUDFLARE_EMAIL", originalEmail);
    }
  };
}

// ---------------------------------------------------------------------------

// importFreshLib() dynamically imports a module that performs async fetch
// operations for token validation. These connections outlive the test scope
// and trigger Deno's resource leak detector — sanitizeResources: false is
// safe here because the module is written to a temp file and cleaned up.

Deno.test(
  "create: POST with envelope unwrapping",
  { sanitizeResources: false },
  async () => {
    const restoreToken = withTestToken();
    const { mod, cleanup } = await importFreshLib();
    try {
      await withFetchQueue(
        [
          okTokenVerify(),
          cfResponse({ id: "abc123", name: "test-record", type: "A" }),
        ],
        async () => {
          const result = await mod.create("/zones/z1/dns_records", {
            name: "example.com",
            type: "A",
            content: "1.2.3.4",
          });
          assertEquals(result.id, "abc123");
          assertEquals(result.name, "test-record");
        },
      );
    } finally {
      await cleanup();
      restoreToken();
    }
  },
);

Deno.test(
  "read: GET with envelope unwrapping",
  { sanitizeResources: false },
  async () => {
    const restoreToken = withTestToken();
    const { mod, cleanup } = await importFreshLib();
    try {
      await withFetchQueue(
        [
          okTokenVerify(),
          cfResponse({ id: "abc123", name: "example.com", ttl: 300 }),
        ],
        async () => {
          const result = await mod.read("/zones/z1/dns_records", "abc123");
          assertEquals(result.id, "abc123");
          assertEquals(result.ttl, 300);
        },
      );
    } finally {
      await cleanup();
      restoreToken();
    }
  },
);

Deno.test(
  "tryRead: returns null on 404",
  { sanitizeResources: false },
  async () => {
    const restoreToken = withTestToken();
    const { mod, cleanup } = await importFreshLib();
    try {
      await withFetchQueue(
        [
          okTokenVerify(),
          new Response("not found", { status: 404 }),
        ],
        async () => {
          const result = await mod.tryRead("/zones/z1/dns_records", "missing");
          assertEquals(result, null);
        },
      );
    } finally {
      await cleanup();
      restoreToken();
    }
  },
);

Deno.test(
  "read: throws on 404",
  { sanitizeResources: false },
  async () => {
    const restoreToken = withTestToken();
    const { mod, cleanup } = await importFreshLib();
    try {
      await withFetchQueue(
        [
          okTokenVerify(),
          new Response("not found", { status: 404 }),
        ],
        async () => {
          await assertRejects(
            () => mod.read("/zones/z1/dns_records", "missing"),
            Error,
            "not found",
          );
        },
      );
    } finally {
      await cleanup();
      restoreToken();
    }
  },
);

Deno.test(
  "remove: returns existed=true on 200",
  { sanitizeResources: false },
  async () => {
    const restoreToken = withTestToken();
    const { mod, cleanup } = await importFreshLib();
    try {
      await withFetchQueue(
        [
          okTokenVerify(),
          cfResponse({ id: "abc123" }),
        ],
        async () => {
          const result = await mod.remove("/zones/z1/dns_records", "abc123");
          assertEquals(result, { existed: true });
        },
      );
    } finally {
      await cleanup();
      restoreToken();
    }
  },
);

Deno.test(
  "remove: returns existed=false on 404",
  { sanitizeResources: false },
  async () => {
    const restoreToken = withTestToken();
    const { mod, cleanup } = await importFreshLib();
    try {
      await withFetchQueue(
        [
          okTokenVerify(),
          new Response("not found", { status: 404 }),
        ],
        async () => {
          const result = await mod.remove("/zones/z1/dns_records", "missing");
          assertEquals(result, { existed: false });
        },
      );
    } finally {
      await cleanup();
      restoreToken();
    }
  },
);

Deno.test(
  "request: throws on API error with success=false",
  { sanitizeResources: false },
  async () => {
    const restoreToken = withTestToken();
    const { mod, cleanup } = await importFreshLib();
    try {
      await withFetchQueue(
        [
          okTokenVerify(),
          cfErrorResponse(400, [
            { code: 1003, message: "Invalid or missing zone id." },
          ]),
        ],
        async () => {
          const err = await assertRejects(
            () => mod.read("/zones/bad/dns_records", "abc123"),
            Error,
            "returned 400",
          );
          assertStringIncludes(err.message, "Cloudflare API error");
        },
      );
    } finally {
      await cleanup();
      restoreToken();
    }
  },
);

Deno.test(
  "request: retries on 429 rate limit",
  { sanitizeResources: false },
  async () => {
    const restoreToken = withTestToken();
    const { mod, cleanup } = await importFreshLib();
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
            okTokenVerify(),
            new Response("rate limited", {
              status: 429,
              headers: { "Retry-After": "1" },
            }),
            cfResponse({ id: "abc123", name: "test" }),
          ],
          async () => {
            const result = await mod.read("/zones/z1/dns_records", "abc123");
            assertEquals(result.id, "abc123");
          },
        );
      } finally {
        globalThis.setTimeout = originalSetTimeout;
      }
    } finally {
      await cleanup();
      restoreToken();
    }
  },
);

// ---------------------------------------------------------------------------
// Vault-wireable credential threading
// ---------------------------------------------------------------------------

/**
 * Save and replace the three CLOUDFLARE_* env vars; deletes any not supplied.
 * Returns a restore function that puts the original environment back. Mirrors
 * the env-restore discipline of withTestToken for the auth-override tests.
 */
function withEnv(
  vars: { token?: string; key?: string; email?: string },
): () => void {
  const keys = [
    "CLOUDFLARE_API_TOKEN",
    "CLOUDFLARE_API_KEY",
    "CLOUDFLARE_EMAIL",
  ] as const;
  const originals = keys.map((k) => Deno.env.get(k));
  const next: Record<string, string | undefined> = {
    CLOUDFLARE_API_TOKEN: vars.token,
    CLOUDFLARE_API_KEY: vars.key,
    CLOUDFLARE_EMAIL: vars.email,
  };
  for (const k of keys) {
    if (next[k] === undefined) Deno.env.delete(k);
    else Deno.env.set(k, next[k]!);
  }
  return () => {
    keys.forEach((k, i) => {
      const original = originals[i];
      if (original === undefined) Deno.env.delete(k);
      else Deno.env.set(k, original);
    });
  };
}

/** Captures method, url, headers, and body for each stubbed fetch call. */
interface CapturedRequest {
  method: string;
  url: string;
  headers: Record<string, string>;
  body: string | null;
}

function capturing(
  captured: CapturedRequest[],
  responses: Response[],
): StubResponse[] {
  return responses.map((resp) => async (req: Request) => {
    captured.push({
      method: req.method,
      url: req.url,
      headers: Object.fromEntries(req.headers.entries()),
      body: req.body ? await req.clone().text() : null,
    });
    return resp;
  });
}

Deno.test(
  "auth: explicit apiToken override takes precedence over the env var",
  { sanitizeResources: false },
  async () => {
    // Env holds a DIFFERENT token; the override must win.
    const restore = withEnv({ token: "env-token" });
    const { mod, cleanup } = await importFreshLib();
    const captured: CapturedRequest[] = [];
    try {
      await withFetchQueue(
        capturing(captured, [okTokenVerify(), cfResponse({ id: "abc123" })]),
        async () => {
          await mod.create("/zones/z1/dns_records", { type: "A" }, {
            apiToken: "vault-token",
          });
        },
      );
      assertStringIncludes(captured[0].url, "/user/tokens/verify");
      assertEquals(captured[0].headers["authorization"], "Bearer vault-token");
      assertEquals(captured[1].headers["authorization"], "Bearer vault-token");
    } finally {
      await cleanup();
      restore();
    }
  },
);

Deno.test(
  "auth: explicit apiKey+email override uses key-style headers",
  { sanitizeResources: false },
  async () => {
    // No token anywhere — the legacy key+email path must be selected.
    const restore = withEnv({});
    const { mod, cleanup } = await importFreshLib();
    const captured: CapturedRequest[] = [];
    try {
      await withFetchQueue(
        capturing(captured, [
          cfResponse({ id: "u1" }),
          cfResponse({ id: "abc123" }),
        ]),
        async () => {
          await mod.read("/zones/z1/dns_records", "abc123", {
            apiKey: "vault-key",
            email: "vault@example.com",
          });
        },
      );
      // Validation hits GET /user, not /user/tokens/verify.
      assertStringIncludes(captured[0].url, "/user");
      assertEquals(captured[1].headers["x-auth-key"], "vault-key");
      assertEquals(captured[1].headers["x-auth-email"], "vault@example.com");
      assertEquals(captured[1].headers["authorization"], undefined);
    } finally {
      await cleanup();
      restore();
    }
  },
);

Deno.test(
  "auth: each distinct credential is validated exactly once",
  { sanitizeResources: false },
  async () => {
    const restore = withEnv({});
    const { mod, cleanup } = await importFreshLib();
    const captured: CapturedRequest[] = [];
    try {
      await withFetchQueue(
        capturing(captured, [
          okTokenVerify(),
          cfResponse({ id: "a" }),
          cfResponse({ id: "b" }),
        ]),
        async () => {
          const auth = { apiToken: "vault-token" };
          await mod.read("/zones/z1/dns_records", "a", auth);
          await mod.read("/zones/z1/dns_records", "b", auth);
        },
      );
      // Only ONE verify call across two reads with the same token.
      const verifyCalls = captured.filter((c) =>
        c.url.includes("/user/tokens/verify")
      );
      assertEquals(verifyCalls.length, 1);
      assertEquals(captured.length, 3);
    } finally {
      await cleanup();
      restore();
    }
  },
);

Deno.test(
  "auth: credentials are never written into a request body",
  { sanitizeResources: false },
  async () => {
    const restore = withEnv({});
    const { mod, cleanup } = await importFreshLib();
    const captured: CapturedRequest[] = [];
    try {
      await withFetchQueue(
        capturing(captured, [okTokenVerify(), cfResponse({ id: "abc123" })]),
        async () => {
          await mod.create("/zones/z1/dns_records", { type: "A" }, {
            apiToken: "super-secret-token",
          });
        },
      );
      const postBody = captured[1].body ?? "";
      assertEquals(postBody.includes("super-secret-token"), false);
      assertEquals(postBody.includes("apiToken"), false);
    } finally {
      await cleanup();
      restore();
    }
  },
);

Deno.test(
  "auth: throws a helpful error when no credentials are available",
  { sanitizeResources: false },
  async () => {
    const restore = withEnv({});
    const { mod, cleanup } = await importFreshLib();
    try {
      await withFetchQueue([], async () => {
        const err = await assertRejects(
          () => mod.read("/zones/z1/dns_records", "abc123"),
          Error,
          "Cloudflare credentials not set",
        );
        assertStringIncludes(err.message, "vault.get");
        assertStringIncludes(err.message, "CLOUDFLARE_API_TOKEN");
      });
    } finally {
      await cleanup();
      restore();
    }
  },
);
