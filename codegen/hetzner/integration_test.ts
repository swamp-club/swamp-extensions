// Integration tests: run generated models and the lib against a mock Hetzner
// API server. Covers create-only required fields (servers) and list filters,
// non-unique names and id-targeted methods (images).

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
  requests: MockRequest[];
} {
  const requests: MockRequest[] = [];
  const ubuntuX86 = { id: 101, name: "ubuntu-24.04", architecture: "x86" };
  const ubuntuArm = { id: 102, name: "ubuntu-24.04", architecture: "arm" };
  const snapshot = { id: 103, name: null, type: "snapshot" };

  const server = Deno.serve(
    { port: 0, onListen: () => {} },
    async (req) => {
      const url = new URL(req.url);
      const path = url.pathname;
      // A bodyless DELETE still carries an (empty) stream.
      const text = await req.text();
      const body = text ? JSON.parse(text) : undefined;
      requests.push({
        method: req.method,
        path,
        query: url.searchParams,
        body,
      });

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
      // Public images repeat a name across architectures; page 2 holds an
      // unnamed snapshot.
      if (req.method === "GET" && path === "/v1/images") {
        return url.searchParams.get("page") === "2"
          ? Response.json({
            images: [snapshot],
            meta: { pagination: { next_page: null } },
          })
          : Response.json({
            images: [ubuntuX86, ubuntuArm],
            meta: { pagination: { next_page: 2 } },
          });
      }
      if (req.method === "GET" && path === "/v1/images/101") {
        return Response.json({ image: ubuntuX86 });
      }
      if (req.method === "PUT" && path === "/v1/images/101") {
        return Response.json({
          image: { ...ubuntuX86, ...(body as Record<string, unknown>) },
        });
      }
      if (
        req.method === "POST" &&
        path === "/v1/images/101/actions/change_protection"
      ) {
        return Response.json({ action: { id: 1, status: "running" } });
      }
      if (req.method === "DELETE" && path === "/v1/images/101") {
        return new Response(null, { status: 204 });
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

interface MockRequest {
  method: string;
  path: string;
  query: URLSearchParams;
  body: unknown;
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

const serversResource: HetznerResource = {
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

// Shaped like the real /images resource: no create, so `name` is not a global
// argument, names repeat across architectures, and list takes filters.
const imagesResource: HetznerResource = {
  noun: "images",
  modelSlug: "images",
  fileName: "images.ts",
  createProperties: {},
  updateProperties: {
    description: { type: "string", description: "New description" },
  },
  resourceProperties: {
    id: { type: "integer" },
    name: { type: "string" },
  },
  createRequiredProperties: [],
  handlers: {
    create: false,
    read: true,
    update: true,
    delete: true,
    list: true,
  },
  identifyingField: "name",
  actions: ["change_protection"],
  listFilters: [
    {
      name: "type",
      kind: "enum-array",
      enumValues: ["system", "app", "snapshot", "backup"],
    },
  ],
  nameUnique: false,
};

async function importGeneratedModel(resource: HetznerResource): Promise<{
  model: GeneratedModel;
  cleanup: () => Promise<void>;
}> {
  const tmpDir = await Deno.makeTempDir();
  const libDir = `${tmpDir}/extensions/models/_lib`;
  await Deno.mkdir(libDir, { recursive: true });
  await Deno.writeTextFile(`${libDir}/hetzner.ts`, generateHetznerLibFile());

  const modelCode = generateHetznerExtensionModel({
    resource,
    extensionName: "@swamp/hetzner-cloud",
    version: "2026.01.01.1",
  }).replaceAll(`from "./_lib/hetzner.ts"`, `from "${libDir}/hetzner.ts"`);

  const modelPath = `${tmpDir}/extensions/models/${resource.fileName}`;
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
      const generated = await importGeneratedModel(serversResource);
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

Deno.test({
  name: "images: filtered list, unique instance names, id-targeted methods",
  // The generated lib is imported dynamically and its fetches outlive a single
  // test step.
  sanitizeResources: false,
  async fn(t) {
    const mock = createMockHetznerServer();
    const origToken = Deno.env.get("HETZNER_API_TOKEN");
    let redirect: { restore: () => void } | undefined;
    let cleanup: (() => Promise<void>) | undefined;

    try {
      redirect = redirectFetchToMock(mock.port);
      Deno.env.delete("HETZNER_API_TOKEN");
      const generated = await importGeneratedModel(imagesResource);
      cleanup = generated.cleanup;
      const model = generated.model;

      await t.step(
        "list writes one instance per image despite a repeated name",
        async () => {
          const { context, written } = createMockContext({ token: "i1" });
          const out = await model.methods.list.execute({}, context);
          assertEquals(out.result, { count: 3 });
          assertEquals([...written.keys()].sort(), [
            "103",
            "ubuntu-24.04-101",
            "ubuntu-24.04-102",
          ]);
        },
      );

      await t.step("list sends type as a repeated query param", async () => {
        const before = mock.requests.length;
        const { context } = createMockContext({ token: "i2" });
        await model.methods.list.execute(
          { type: ["snapshot", "backup"] },
          context,
        );
        const listCalls = mock.requests.slice(before).filter((r) =>
          r.path === "/v1/images"
        );
        assertEquals(listCalls.length, 2);
        for (const call of listCalls) {
          assertEquals(call.query.getAll("type"), ["snapshot", "backup"]);
        }
      });

      await t.step(
        "adopt, update, change_protection and delete share one instance",
        async () => {
          const names: string[] = [];
          for (
            const [method, args] of [
              ["adopt", { id: 101 }],
              ["update", { id: 101 }],
              ["change_protection", { id: 101, delete: true }],
              ["delete", { id: 101 }],
            ] as const
          ) {
            const { context, written } = createMockContext({
              description: "golden",
              token: "i3",
            });
            await model.methods[method].execute({ ...args }, context);
            names.push(...written.keys());
          }
          assertEquals(names, Array(4).fill("ubuntu-24.04-101"));
          const put = mock.requests.find((r) => r.method === "PUT");
          assertEquals(put?.path, "/v1/images/101");
          assertEquals(put?.body, { description: "golden" });
        },
      );

      await t.step(
        "delete of an image that is already gone records it by id",
        async () => {
          const { context, written } = createMockContext({ token: "i4" });
          await model.methods.delete.execute({ id: 999 }, context);
          assertEquals(written.get("999"), {
            id: 999,
            existed: false,
            status: "not_found",
            deletedAt: (written.get("999") as { deletedAt: string })
              .deletedAt,
          });
        },
      );
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
