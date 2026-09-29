// Integration test: create-only required fields are optional in the generated
// GlobalArgsSchema and enforced by create before any API call. Runs the
// generated servers model and lib against a mock Hetzner API server.

import { assertEquals, assertRejects } from "@std/assert";
import { generateHetznerExtensionModel } from "./extensionModelGenerator.ts";
import { generateHetznerLibFile } from "./libGenerator.ts";
import type { HetznerResource } from "./pipeline.ts";

// ---------------------------------------------------------------------------
// Mock Hetzner API server
// ---------------------------------------------------------------------------

function createMockHetznerServer(): {
  port: number;
  close: () => Promise<void>;
  requests: { method: string; path: string; body: unknown }[];
} {
  const requests: { method: string; path: string; body: unknown }[] = [];

  const server = Deno.serve(
    { port: 0, onListen: () => {} },
    async (req) => {
      const path = new URL(req.url).pathname;
      const body = req.body ? await req.json() : undefined;
      requests.push({ method: req.method, path, body });

      if (req.method === "GET" && path === "/v1/locations") {
        return Response.json({ locations: [] });
      }
      if (req.method === "POST" && path === "/v1/servers") {
        return Response.json(
          { server: { id: 1, ...(body as Record<string, unknown>) } },
          { status: 201 },
        );
      }
      if (req.method === "GET" && path === "/v1/servers/1") {
        return Response.json({ server: { id: 1, name: "web-1" } });
      }
      return Response.json({ error: { code: "not_found" } }, { status: 404 });
    },
  );

  const addr = server.addr as Deno.NetAddr;
  return {
    port: addr.port,
    close: () => server.shutdown(),
    requests,
  };
}

function redirectFetchToMock(mockPort: number): { restore: () => void } {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = ((input: RequestInfo | URL, init?: RequestInit) => {
    const url = input instanceof Request
      ? input.url
      : input instanceof URL
      ? input.toString()
      : input;
    const rewritten = url.replace(
      "https://api.hetzner.cloud",
      `http://localhost:${mockPort}`,
    );
    // Keep a Request's method, headers and body by rebuilding it on the new URL.
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

// ---------------------------------------------------------------------------
// Generate and import model + lib
// ---------------------------------------------------------------------------

interface GeneratedModel {
  globalArguments: {
    safeParse: (input: unknown) => { success: boolean };
  };
  methods: Record<
    string,
    {
      execute: (
        args: Record<string, unknown>,
        context: Record<string, unknown>,
      ) => Promise<Record<string, unknown>>;
    }
  >;
}

async function importGeneratedModel(): Promise<{
  model: GeneratedModel;
  cleanup: () => Promise<void>;
}> {
  const tmpDir = await Deno.makeTempDir();
  const libDir = `${tmpDir}/extensions/models/_lib`;
  await Deno.mkdir(libDir, { recursive: true });
  await Deno.writeTextFile(`${libDir}/hetzner.ts`, generateHetznerLibFile());

  const resource: HetznerResource = {
    noun: "servers",
    modelSlug: "servers",
    fileName: "servers.ts",
    createProperties: {
      name: { type: "string", description: "Name of the server" },
      server_type: { type: "string", description: "Server type" },
      image: { type: "string", description: "Image" },
      location: { type: "string", description: "Location" },
    },
    updateProperties: {
      name: { type: "string", description: "New name for the server" },
    },
    resourceProperties: {
      id: { type: "integer" },
      name: { type: "string" },
    },
    createRequiredProperties: ["name", "server_type", "image"],
    handlers: {
      create: true,
      read: true,
      update: true,
      delete: true,
      list: true,
    },
    identifyingField: "name",
    actions: [],
  };

  const modelCode = generateHetznerExtensionModel({
    resource,
    extensionName: "@swamp/hetzner-cloud",
    version: "2026.01.01.1",
  }).replaceAll(`from "./_lib/hetzner.ts"`, `from "${libDir}/hetzner.ts"`);

  const modelPath = `${tmpDir}/extensions/models/servers.ts`;
  await Deno.writeTextFile(modelPath, modelCode);

  const mod = await import(`file://${modelPath}?v=${crypto.randomUUID()}`);
  return {
    model: mod.model,
    cleanup: () => Deno.remove(tmpDir, { recursive: true }),
  };
}

function createMockContext(globalArgs: Record<string, unknown>) {
  const written = new Map<string, unknown>();
  return {
    context: {
      globalArgs,
      writeResource(_type: string, instanceName: string, data: unknown) {
        written.set(instanceName, data);
        return { type: "state", name: instanceName };
      },
    },
    written,
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

// The generated lib is imported dynamically and its fetches outlive a single
// test step. sanitizeResources: false is required.
Deno.test({
  name:
    "create-only required fields: schema, create check, get and full create",
  sanitizeResources: false,
  async fn(t) {
    const mock = createMockHetznerServer();
    const origToken = Deno.env.get("HETZNER_API_TOKEN");
    let redirect: { restore: () => void } | undefined;
    let cleanup: (() => Promise<void>) | undefined;

    try {
      redirect = redirectFetchToMock(mock.port);
      Deno.env.delete("HETZNER_API_TOKEN");
      const generated = await importGeneratedModel();
      cleanup = generated.cleanup;
      const model = generated.model;

      await t.step("schema accepts only name and token", () => {
        assertEquals(
          model.globalArguments.safeParse({ name: "web-1", token: "t0" })
            .success,
          true,
        );
      });

      // Each step uses its own token: the lib caches validated tokens at
      // module level, which would hide the /locations request otherwise.
      await t.step(
        "create without create-required fields fails before any request",
        async () => {
          const before = mock.requests.length;
          const { context, written } = createMockContext({
            name: "web-1",
            token: "t1",
          });
          await assertRejects(
            () => model.methods.create.execute({}, context),
            Error,
            "create requires global arguments: image, server_type",
          );
          assertEquals(mock.requests.length, before);
          assertEquals(written.size, 0);
        },
      );

      await t.step(
        "create treats an empty create-required field as missing",
        async () => {
          const before = mock.requests.length;
          const { context } = createMockContext({
            name: "web-1",
            server_type: "",
            image: "ubuntu-24.04",
            token: "t4",
          });
          await assertRejects(
            () => model.methods.create.execute({}, context),
            Error,
            "create requires global arguments: server_type",
          );
          assertEquals(mock.requests.length, before);
        },
      );

      await t.step(
        "update without the naming field names it instead of reading current",
        async () => {
          const before = mock.requests.length;
          const { context } = createMockContext({ token: "t5" });
          await assertRejects(
            () => model.methods.update.execute({}, context),
            Error,
            "update requires global argument: name",
          );
          assertEquals(mock.requests.length, before);
        },
      );

      await t.step("get runs with only the token", async () => {
        const { context, written } = createMockContext({ token: "t2" });
        await model.methods.get.execute({ id: 1 }, context);
        assertEquals(written.get("web-1"), { id: 1, name: "web-1" });
      });

      await t.step("create with every required field posts them", async () => {
        const { context } = createMockContext({
          name: "web-2",
          server_type: "cx22",
          image: "ubuntu-24.04",
          token: "t3",
        });
        await model.methods.create.execute({}, context);
        const post = mock.requests.find((r) => r.method === "POST");
        assertEquals(post?.body, {
          name: "web-2",
          server_type: "cx22",
          image: "ubuntu-24.04",
        });
      });
    } finally {
      // Restore globals first so a failing cleanup cannot leak them.
      redirect?.restore();
      if (origToken === undefined) Deno.env.delete("HETZNER_API_TOKEN");
      else Deno.env.set("HETZNER_API_TOKEN", origToken);
      try {
        await cleanup?.();
      } finally {
        await mock.close();
      }
    }
  },
});
