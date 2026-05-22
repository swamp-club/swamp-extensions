// Integration test: exercises the generated DNS records model against a
// stateful mock Cloudflare API server. Validates the full CRUD lifecycle:
// create → get → update → sync → delete → verify deletion.

import { assertEquals, assertExists } from "@std/assert";
import { generateCloudflareLibFile } from "./libGenerator.ts";

// ---------------------------------------------------------------------------
// Stateful mock Cloudflare API server
// ---------------------------------------------------------------------------

interface MockRecord {
  id: string;
  [key: string]: unknown;
}

function createMockServer(): {
  start: () => Promise<{ port: number; close: () => Promise<void> }>;
} {
  return {
    start: async () => {
      const records = new Map<string, MockRecord>();
      let idCounter = 0;

      function cfOk(result: unknown): Response {
        return Response.json({
          success: true,
          errors: [],
          messages: [],
          result,
        });
      }

      function cfError(
        status: number,
        code: number,
        message: string,
      ): Response {
        return Response.json(
          {
            success: false,
            errors: [{ code, message }],
            messages: [],
            result: null,
          },
          { status },
        );
      }

      function cfList(items: unknown[]): Response {
        return Response.json({
          success: true,
          errors: [],
          messages: [],
          result: items,
          result_info: {
            page: 1,
            per_page: 100,
            total_pages: 1,
            count: items.length,
            total_count: items.length,
          },
        });
      }

      const server = Deno.serve({ port: 0, onListen: () => {} }, (req) => {
        const url = new URL(req.url);
        const path = url.pathname;
        const method = req.method;

        // Auth check
        const authHeader = req.headers.get("Authorization");
        if (!authHeader?.startsWith("Bearer ")) {
          return cfError(401, 9109, "Invalid access token");
        }

        // Token verification endpoint
        if (path === "/client/v4/user/tokens/verify" && method === "GET") {
          return cfOk({ id: "test", status: "active" });
        }

        // DNS records CRUD: /client/v4/zones/{zone_id}/dns_records[/{id}]
        const dnsListMatch = path.match(
          /^\/client\/v4\/zones\/([^/]+)\/dns_records$/,
        );
        const dnsItemMatch = path.match(
          /^\/client\/v4\/zones\/([^/]+)\/dns_records\/([^/]+)$/,
        );

        // D1 database CRUD: /client/v4/accounts/{account_id}/d1/database[/{id}]
        const d1ListMatch = path.match(
          /^\/client\/v4\/accounts\/([^/]+)\/d1\/database$/,
        );
        const d1ItemMatch = path.match(
          /^\/client\/v4\/accounts\/([^/]+)\/d1\/database\/([^/]+)$/,
        );

        // Generic CRUD handler
        const listMatch = dnsListMatch ?? d1ListMatch;
        const itemMatch = dnsItemMatch ?? d1ItemMatch;

        if (listMatch) {
          if (method === "GET") {
            return cfList([...records.values()]);
          }
          if (method === "POST") {
            return req.json().then((body: Record<string, unknown>) => {
              const id = crypto.randomUUID().replace(/-/g, "").slice(0, 32);
              idCounter++;
              const now = new Date().toISOString();
              const record: MockRecord = {
                ...body,
                id,
                created_on: now,
                modified_on: now,
                proxiable: true,
                meta: { auto_added: false },
              };
              records.set(id, record);
              return cfOk(record);
            });
          }
        }

        if (itemMatch) {
          const resourceId = itemMatch[2];

          if (method === "GET") {
            const record = records.get(resourceId);
            if (!record) return cfError(404, 81044, "Record not found");
            return cfOk(record);
          }

          if (method === "PATCH" || method === "PUT") {
            return req.json().then((body: Record<string, unknown>) => {
              const record = records.get(resourceId);
              if (!record) return cfError(404, 81044, "Record not found");
              const updated: MockRecord = {
                ...record,
                ...body,
                id: resourceId,
                modified_on: new Date().toISOString(),
              };
              records.set(resourceId, updated);
              return cfOk(updated);
            });
          }

          if (method === "DELETE") {
            const existed = records.has(resourceId);
            if (!existed) return cfError(404, 81044, "Record not found");
            records.delete(resourceId);
            return cfOk({ id: resourceId });
          }
        }

        return cfError(404, 7003, "Could not route to requested endpoint");
      });

      const addr = server.addr as Deno.NetAddr;
      return {
        port: addr.port,
        close: () => server.shutdown(),
      };
    },
  };
}

// ---------------------------------------------------------------------------
// Helper: import the generated lib with fetch redirected to mock server
// ---------------------------------------------------------------------------

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
  update: (
    endpoint: string,
    id: string,
    body: Record<string, unknown>,
    method?: "PATCH" | "PUT",
  ) => Promise<Record<string, unknown>>;
  remove: (
    endpoint: string,
    id: string,
  ) => Promise<{ existed: boolean }>;
}

async function importLibWithMock(mockPort: number): Promise<
  { mod: CloudflareLib; cleanup: () => Promise<void> }
> {
  const tmp = await Deno.makeTempFile({ suffix: ".ts" });
  await Deno.writeTextFile(tmp, generateCloudflareLibFile());
  const mod = await import(
    `file://${tmp}?v=${crypto.randomUUID()}`
  ) as unknown as CloudflareLib;
  return {
    mod,
    cleanup: async () => {
      await Deno.remove(tmp);
    },
  };
}

function redirectFetchToMock(
  mockPort: number,
): { restore: () => void } {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = ((input: RequestInfo | URL, init?: RequestInit) => {
    let url: string;
    if (input instanceof Request) {
      url = input.url;
    } else if (input instanceof URL) {
      url = input.toString();
    } else {
      url = input;
    }
    // Rewrite api.cloudflare.com → localhost:mockPort
    const rewritten = url.replace(
      "https://api.cloudflare.com",
      `http://localhost:${mockPort}`,
    );
    if (input instanceof Request) {
      return originalFetch(new Request(rewritten, input), init);
    }
    return originalFetch(rewritten, init);
  }) as typeof fetch;

  return {
    restore: () => {
      globalThis.fetch = originalFetch;
    },
  };
}

function withTestToken(): () => void {
  const origToken = Deno.env.get("CLOUDFLARE_API_TOKEN");
  const origKey = Deno.env.get("CLOUDFLARE_API_KEY");
  const origEmail = Deno.env.get("CLOUDFLARE_EMAIL");
  Deno.env.set("CLOUDFLARE_API_TOKEN", "test-mock-token");
  Deno.env.delete("CLOUDFLARE_API_KEY");
  Deno.env.delete("CLOUDFLARE_EMAIL");
  return () => {
    if (origToken === undefined) Deno.env.delete("CLOUDFLARE_API_TOKEN");
    else Deno.env.set("CLOUDFLARE_API_TOKEN", origToken);
    if (origKey === undefined) Deno.env.delete("CLOUDFLARE_API_KEY");
    else Deno.env.set("CLOUDFLARE_API_KEY", origKey);
    if (origEmail === undefined) Deno.env.delete("CLOUDFLARE_EMAIL");
    else Deno.env.set("CLOUDFLARE_EMAIL", origEmail);
  };
}

// ---------------------------------------------------------------------------
// Integration test: DNS records full CRUD lifecycle
// ---------------------------------------------------------------------------

Deno.test(
  "integration: DNS records full CRUD lifecycle against mock server",
  { sanitizeResources: false },
  async () => {
    const restoreToken = withTestToken();
    const { port, close } = await createMockServer().start();
    const { restore: restoreFetch } = redirectFetchToMock(port);
    const { mod, cleanup } = await importLibWithMock(port);

    try {
      const zoneId = "test-zone-id-123";
      const endpoint = `/zones/${zoneId}/dns_records`;

      // 1. CREATE a TXT record
      const created = await mod.create(endpoint, {
        type: "TXT",
        name: "test.example.com",
        content: "v=spf1 -all",
        ttl: 300,
        comment: "integration test record",
      });

      assertExists(created.id, "created record should have an id");
      assertEquals(created.name, "test.example.com");
      assertEquals(created.type, "TXT");
      assertEquals(created.content, "v=spf1 -all");
      assertEquals(created.ttl, 300);
      assertEquals(created.comment, "integration test record");
      assertExists(created.created_on, "should have created_on timestamp");
      const recordId = created.id as string;

      // 2. READ it back by ID
      const fetched = await mod.read(endpoint, recordId);
      assertEquals(fetched.id, recordId);
      assertEquals(fetched.name, "test.example.com");
      assertEquals(fetched.content, "v=spf1 -all");

      // 3. UPDATE the comment
      const updated = await mod.update(
        endpoint,
        recordId,
        { comment: "updated by integration test" },
        "PATCH",
      );
      assertEquals(updated.id, recordId);
      assertEquals(updated.comment, "updated by integration test");
      assertEquals(updated.name, "test.example.com"); // unchanged fields preserved

      // 4. SYNC (tryRead) — should return the resource
      const synced = await mod.tryRead(endpoint, recordId);
      assertExists(synced, "tryRead should return the resource");
      assertEquals(synced!.id, recordId);
      assertEquals(synced!.comment, "updated by integration test");

      // 5. DELETE
      const deleteResult = await mod.remove(endpoint, recordId);
      assertEquals(deleteResult, { existed: true });

      // 6. Verify deletion — tryRead returns null
      const afterDelete = await mod.tryRead(endpoint, recordId);
      assertEquals(afterDelete, null, "tryRead should return null after delete");

      // 7. Delete again — should return existed=false
      const deleteAgain = await mod.remove(endpoint, recordId);
      assertEquals(deleteAgain, { existed: false });
    } finally {
      restoreFetch();
      await cleanup();
      await close();
      restoreToken();
    }
  },
);

// ---------------------------------------------------------------------------
// Integration test: D1 database CRUD (account-scoped resource)
// ---------------------------------------------------------------------------

Deno.test(
  "integration: D1 database CRUD lifecycle against mock server",
  { sanitizeResources: false },
  async () => {
    const restoreToken = withTestToken();
    const { port, close } = await createMockServer().start();
    const { restore: restoreFetch } = redirectFetchToMock(port);
    const { mod, cleanup } = await importLibWithMock(port);

    try {
      const accountId = "test-account-id-456";
      const endpoint = `/accounts/${accountId}/d1/database`;

      // 1. CREATE
      const created = await mod.create(endpoint, {
        name: "my-test-db",
        primary_location_hint: "wnam",
      });
      assertExists(created.id);
      assertEquals(created.name, "my-test-db");
      const dbId = created.id as string;

      // 2. READ
      const fetched = await mod.read(endpoint, dbId);
      assertEquals(fetched.id, dbId);
      assertEquals(fetched.name, "my-test-db");

      // 3. DELETE
      const deleteResult = await mod.remove(endpoint, dbId);
      assertEquals(deleteResult, { existed: true });

      // 4. Verify gone
      const afterDelete = await mod.tryRead(endpoint, dbId);
      assertEquals(afterDelete, null);
    } finally {
      restoreFetch();
      await cleanup();
      await close();
      restoreToken();
    }
  },
);

// ---------------------------------------------------------------------------
// Integration test: auth validation
// ---------------------------------------------------------------------------

Deno.test(
  "integration: auth header is sent correctly to mock server",
  { sanitizeResources: false },
  async () => {
    const restoreToken = withTestToken();
    const { port, close } = await createMockServer().start();
    const { restore: restoreFetch } = redirectFetchToMock(port);
    const { mod, cleanup } = await importLibWithMock(port);

    try {
      // The mock server validates the Bearer token header.
      // If auth were broken, the create call would fail with 401.
      const result = await mod.create(
        "/zones/z1/dns_records",
        { name: "auth-test.example.com", type: "A", content: "1.2.3.4" },
      );
      assertExists(result.id, "auth should succeed with test token");
    } finally {
      restoreFetch();
      await cleanup();
      await close();
      restoreToken();
    }
  },
);

// ---------------------------------------------------------------------------
// Integration test: 404 error handling
// ---------------------------------------------------------------------------

Deno.test(
  "integration: read non-existent resource throws with 404 details",
  { sanitizeResources: false },
  async () => {
    const restoreToken = withTestToken();
    const { port, close } = await createMockServer().start();
    const { restore: restoreFetch } = redirectFetchToMock(port);
    const { mod, cleanup } = await importLibWithMock(port);

    try {
      let caught = false;
      try {
        await mod.read("/zones/z1/dns_records", "nonexistent-id");
      } catch (err) {
        caught = true;
        const msg = (err as Error).message;
        assertEquals(
          msg.includes("not found") || msg.includes("404"),
          true,
          `Error should mention not found or 404, got: ${msg}`,
        );
      }
      assertEquals(caught, true, "read() should throw on 404");
    } finally {
      restoreFetch();
      await cleanup();
      await close();
      restoreToken();
    }
  },
);
