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

// ---------------------------------------------------------------------------
// Server power methods
// ---------------------------------------------------------------------------

// How the mock answers the next power action POST.
type PowerMode =
  | "ok" // action succeeds and the server reaches the action's target
  | "stuck" // action succeeds but the status never changes
  | "no-action" // response has no action object
  | "no-id" // action object without an id
  | "action-error" // action ends in status error
  | "action-404" // GET /actions/{id} returns 404
  | "deleted" // server disappears while waiting
  | "action-stuck"; // action never leaves status running

function createMockPowerServer(): {
  port: number;
  close: () => Promise<void>;
  requests: MockRequest[];
  server: { status: string; exists: boolean; mode: PowerMode };
} {
  const requests: MockRequest[] = [];
  const state = { status: "off", exists: true, mode: "ok" as PowerMode };
  const targets: Record<string, string> = {
    poweron: "running",
    shutdown: "off",
    poweroff: "off",
    reboot: "running",
    reset: "running",
  };

  const server = Deno.serve(
    { port: 0, onListen: () => {} },
    async (req) => {
      const url = new URL(req.url);
      const path = url.pathname;
      const text = await req.text();
      requests.push({
        method: req.method,
        path,
        query: url.searchParams,
        body: text ? JSON.parse(text) : undefined,
      });

      if (req.method === "GET" && path === "/v1/locations") {
        return Response.json({ locations: [] });
      }
      if (req.method === "GET" && path === "/v1/servers/2") {
        if (!state.exists) {
          return Response.json({ error: { code: "not_found" } }, {
            status: 404,
          });
        }
        return Response.json({
          server: { id: 2, name: "pw-1", status: state.status },
        });
      }
      const post = path.match(/^\/v1\/servers\/2\/actions\/([a-z]+)$/);
      if (req.method === "POST" && post) {
        switch (state.mode) {
          case "no-action":
            return Response.json({});
          case "no-id":
            return Response.json({ action: { status: "running" } });
          case "action-error":
            return Response.json({ action: { id: 51, status: "running" } });
          case "action-404":
            return Response.json({ action: { id: 52, status: "running" } });
          case "action-stuck":
            return Response.json({ action: { id: 53, status: "running" } });
          case "deleted":
            state.exists = false;
            return Response.json({ action: { id: 50, status: "running" } });
          case "stuck":
            return Response.json({ action: { id: 50, status: "running" } });
          default:
            state.status = targets[post[1]];
            return Response.json({ action: { id: 50, status: "running" } });
        }
      }
      if (req.method === "GET" && path === "/v1/actions/50") {
        return Response.json({
          action: { id: 50, command: "power", status: "success" },
        });
      }
      if (req.method === "GET" && path === "/v1/actions/53") {
        return Response.json({
          action: { id: 53, command: "shutdown_server", status: "running" },
        });
      }
      if (req.method === "GET" && path === "/v1/actions/51") {
        return Response.json({
          action: {
            id: 51,
            command: "start_server",
            status: "error",
            error: { code: "action_failed", message: "server is locked" },
          },
        });
      }
      return Response.json({ error: { code: "not_found" } }, { status: 404 });
    },
  );

  const addr = server.addr as Deno.NetAddr;
  return {
    port: addr.port,
    close: () => server.shutdown(),
    requests,
    server: state,
  };
}

/** A mock context whose data repository holds stored state for the server. */
function createStoredStateContext(
  globalArgs: Record<string, unknown>,
  stored?: Record<string, unknown>,
) {
  const { context, written } = createMockContext(globalArgs);
  return {
    context: {
      ...context,
      modelType: "@swamp/hetzner-cloud/servers",
      modelId: "test",
      dataRepository: {
        getContent: () =>
          Promise.resolve(
            stored
              ? new TextEncoder().encode(JSON.stringify(stored))
              : undefined,
          ),
      },
    },
    written,
  };
}

Deno.test({
  name: "servers: power methods skip no-ops, guard state, wait and refresh",
  // The generated lib is imported dynamically and its fetches outlive a single
  // test step.
  sanitizeResources: false,
  async fn(t) {
    const mock = createMockPowerServer();
    const origToken = Deno.env.get("HETZNER_API_TOKEN");
    let redirect: { restore: () => void } | undefined;
    let cleanup: (() => Promise<void>) | undefined;

    try {
      redirect = redirectFetchToMock(mock.port);
      Deno.env.delete("HETZNER_API_TOKEN");
      const generated = await importGeneratedModel({
        ...serversResource,
        resourceProperties: {
          ...serversResource.resourceProperties,
          status: { type: "string" },
        },
        actions: ["poweroff", "poweron", "reboot", "reset", "shutdown"],
      });
      cleanup = generated.cleanup;
      const model = generated.model;
      const stored = { id: 2, name: "pw-1" };
      const run = (method: string, args: Record<string, unknown> = {}) => {
        const { context, written } = createStoredStateContext(
          { name: "pw-1", token: "p1" },
          stored,
        );
        return {
          written,
          done: model.methods[method].execute(args, context),
        };
      };
      const posts = () =>
        mock.requests.filter((r) =>
          r.method === "POST" && r.path.includes("/actions/")
        );
      const reset = (status: string, mode: PowerMode = "ok") => {
        mock.server.status = status;
        mock.server.exists = true;
        mock.server.mode = mode;
        mock.requests.length = 0;
      };

      await t.step(
        "poweron on an off server posts, waits and writes running",
        async () => {
          reset("off");
          const { written, done } = run("poweron");
          await done;
          assertEquals(posts().map((r) => r.path), [
            "/v1/servers/2/actions/poweron",
          ]);
          assertEquals(posts()[0].body, {});
          assertEquals(
            mock.requests.some((r) => r.path === "/v1/actions/50"),
            true,
          );
          assertEquals(written.get("pw-1"), {
            id: 2,
            name: "pw-1",
            status: "running",
          });
        },
      );

      await t.step(
        "poweron on a running server only refreshes state",
        async () => {
          reset("running");
          const { written, done } = run("poweron");
          await done;
          assertEquals(posts().length, 0);
          assertEquals(written.get("pw-1"), {
            id: 2,
            name: "pw-1",
            status: "running",
          });
        },
      );

      await t.step(
        "poweroff and shutdown on an off server are no-ops",
        async () => {
          for (const method of ["poweroff", "shutdown"]) {
            reset("off");
            await run(method).done;
            assertEquals(posts().length, 0, method);
          }
        },
      );

      await t.step("shutdown on a running server waits for off", async () => {
        reset("running");
        const { written, done } = run("shutdown");
        await done;
        assertEquals(posts().map((r) => r.path), [
          "/v1/servers/2/actions/shutdown",
        ]);
        assertEquals((written.get("pw-1") as { status: string }).status, "off");
      });

      await t.step(
        "shutdown that never reaches off suggests poweroff",
        async () => {
          reset("running", "stuck");
          await assertRejects(
            () => run("shutdown", { timeoutSeconds: 1 }).done,
            Error,
            "use poweroff to force it off",
          );
        },
      );

      await t.step(
        "a shutdown action that never finishes also suggests poweroff",
        async () => {
          reset("running", "action-stuck");
          await assertRejects(
            () => run("shutdown", { timeoutSeconds: 1 }).done,
            Error,
            "timed out with status running. The guest may not have honoured",
          );
        },
      );

      await t.step("reboot and reset require a running server", async () => {
        for (const method of ["reboot", "reset"]) {
          reset("off");
          await assertRejects(
            () => run(method).done,
            Error,
            `${method} requires the server to be running; current status: off`,
          );
          assertEquals(posts().length, 0, method);
        }
      });

      await t.step(
        "reset on a running server posts and refreshes",
        async () => {
          reset("running");
          const { written, done } = run("reset");
          await done;
          assertEquals(posts().map((r) => r.path), [
            "/v1/servers/2/actions/reset",
          ]);
          assertEquals(
            (written.get("pw-1") as { status: string }).status,
            "running",
          );
        },
      );

      await t.step(
        "an action ending in error surfaces its message",
        async () => {
          reset("off", "action-error");
          await assertRejects(
            () => run("poweron").done,
            Error,
            "failed: action_failed: server is locked",
          );
        },
      );

      await t.step(
        "a reply without an action or an id throws without polling",
        async () => {
          for (const mode of ["no-action", "no-id"] as const) {
            reset("off", mode);
            await assertRejects(
              () => run("poweron").done,
              Error,
              "poweron returned no action id",
            );
            assertEquals(
              mock.requests.some((r) => r.path.startsWith("/v1/actions/")),
              false,
              mode,
            );
          }
        },
      );

      await t.step(
        "an action that returns 404 throws action-not-found",
        async () => {
          reset("off", "action-404");
          await assertRejects(
            () => run("poweron").done,
            Error,
            "Action not found: GET /actions/52 returned 404",
          );
        },
      );

      await t.step(
        "a server deleted mid-wait surfaces resource-not-found",
        async () => {
          reset("running", "deleted");
          await assertRejects(
            () => run("poweroff").done,
            Error,
            "Resource not found: GET /servers/2 returned 404",
          );
        },
      );

      await t.step(
        "a power method with no stored state asks for lookup first",
        async () => {
          reset("off");
          const { context } = createStoredStateContext({
            name: "pw-1",
            token: "p1",
          });
          await assertRejects(
            () => model.methods.poweron.execute({}, context),
            Error,
            "No data found - run create, lookup, or adopt first",
          );
          assertEquals(mock.requests.length, 0);
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
