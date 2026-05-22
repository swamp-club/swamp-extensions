import { assertEquals, assertRejects, assertStringIncludes } from "@std/assert";
import { generateCloudflareLibFile } from "./libGenerator.ts";

interface CloudflareLib {
  create: (
    endpoint: string,
    body: Record<string, unknown>,
  ) => Promise<Record<string, unknown>>;
  read: (
    endpoint: string,
    id: string,
  ) => Promise<Record<string, unknown>>;
  tryRead: (
    endpoint: string,
    id: string,
  ) => Promise<Record<string, unknown> | null>;
  remove: (
    endpoint: string,
    id: string,
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
