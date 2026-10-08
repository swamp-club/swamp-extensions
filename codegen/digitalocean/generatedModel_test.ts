// End-to-end tests for generated DigitalOcean models: run the real pipeline
// against a minimal spec, write the generated model and shared lib to a temp
// dir, import them, and drive their methods against a stubbed fetch. This
// checks the API paths the models request, which snapshot tests cannot.

import { assertEquals, assertRejects } from "@std/assert";
import { generateDigitalOceanModels } from "./pipeline.ts";

const obj = (properties: Record<string, unknown>) => ({
  type: "object",
  properties,
});
const str = { type: "string" };
const json = (schema: unknown) => ({
  content: { "application/json": { schema } },
});

const SPEC = {
  openapi: "3.0.0",
  paths: {
    "/v2/spaces/keys": {
      post: {
        requestBody: json(obj({ name: str })),
        responses: {
          "201": json(obj({
            key: obj({ name: str, access_key: str, created_at: str }),
          })),
        },
      },
    },
    "/v2/spaces/keys/{access_key}": {
      get: {
        responses: {
          "200": json(obj({
            key: obj({ name: str, access_key: str, created_at: str }),
          })),
        },
      },
      patch: { requestBody: json(obj({ name: str })), responses: {} },
      delete: { responses: {} },
    },
    "/v2/monitoring/sinks": {
      post: {
        requestBody: json(obj({ destination_uuid: str })),
        responses: { "202": { description: "accepted" } },
      },
    },
    "/v2/monitoring/sinks/{sink_uuid}": {
      get: {
        responses: {
          "200": json(obj({
            sink: obj({ destination: obj({ id: str }), resources: str }),
          })),
        },
      },
      delete: { responses: {} },
    },
    "/v2/action-gateway/sessions": {
      post: {
        requestBody: json(obj({ name: str })),
        responses: {
          "200": json(obj({
            session: obj({ sessionUrn: str, name: str, tools: str }),
            mcpUrl: str,
            tools: str,
          })),
        },
      },
      get: {
        responses: {
          "200": json(obj({
            sessions: {
              type: "array",
              items: obj({ sessionUrn: str, name: str, tools: str }),
            },
          })),
        },
      },
    },
    "/v2/action-gateway/sessions/{session_urn}": {
      delete: { responses: {} },
    },
    "/v2/dedicated-inferences": {
      post: {
        requestBody: json(obj({ name: str })),
        responses: {
          "202": json(obj({
            dedicated_inference: obj({ id: str, name: str }),
            token: obj({ id: str, value: str }),
          })),
        },
      },
    },
    "/v2/dedicated-inferences/{dedicated_inference_id}": {
      get: {
        responses: {
          "200": json(
            obj({ dedicated_inference: obj({ id: str, name: str }) }),
          ),
        },
      },
      delete: { responses: {} },
    },
    // A child resource whose create requires type, with a PUT-only update.
    "/v2/domains/{domain_name}/records": {
      post: {
        requestBody: json({
          ...obj({ type: str, name: str, data: str }),
          required: ["type"],
        }),
        responses: {
          "201": json(obj({
            domain_record: obj({ id: str, type: str, name: str, data: str }),
          })),
        },
      },
    },
    "/v2/domains/{domain_name}/records/{domain_record_id}": {
      get: {
        responses: {
          "200": json(obj({
            domain_record: obj({ id: str, type: str, name: str, data: str }),
          })),
        },
      },
      put: {
        requestBody: json(obj({ type: str, name: str, data: str })),
        responses: {},
      },
      delete: { responses: {} },
    },
    // A required field the pipeline drops ("names", via SKIP_PROPERTIES)
    // must not be checked by create.
    "/v2/droplets": {
      post: {
        requestBody: json({
          ...obj({
            name: str,
            names: { type: "array", items: str },
            size: str,
          }),
          required: ["names", "size"],
        }),
        responses: {
          "202": json(obj({ droplet: obj({ id: str, name: str, size: str }) })),
        },
      },
    },
    "/v2/droplets/{droplet_id}": {
      get: {
        responses: {
          "200": json(obj({ droplet: obj({ id: str, name: str, size: str }) })),
        },
      },
      delete: { responses: {} },
    },
  },
};

type Method = {
  execute: (
    args: Record<string, unknown>,
    context: unknown,
  ) => Promise<unknown>;
};
type Model = {
  globalArguments: {
    safeParse: (v: unknown) => { success: boolean };
  };
  methods: Record<string, Method | undefined>;
};

const tempDirs: string[] = [];

// Remove every temp dir loadModel created, once the suite is done with the
// imported modules.
globalThis.addEventListener("unload", () => {
  for (const dir of tempDirs) Deno.removeSync(dir, { recursive: true });
});

/** Generate every model in SPEC and import the named one from a temp dir. */
async function loadModel(fileName: string): Promise<Model> {
  const dir = await Deno.makeTempDir();
  tempDirs.push(dir);
  const specPath = `${dir}/spec.json`;
  await Deno.writeTextFile(specPath, JSON.stringify(SPEC));
  const result = await generateDigitalOceanModels({
    outputDir: `${dir}/out`,
    schemaPath: specPath,
  });
  assertEquals(result.errors, []);
  for (const file of [result.libFile, ...result.models]) {
    const path = `${dir}/out/${file.filePath}`;
    await Deno.mkdir(path.substring(0, path.lastIndexOf("/")), {
      recursive: true,
    });
    await Deno.writeTextFile(path, file.sourceCode);
  }
  const mod = await import(`file://${dir}/out/extensions/models/${fileName}`);
  return mod.model as Model;
}

/** An in-memory swamp context backed by a Map of instance name → state. */
function makeContext(store: Map<string, unknown>, globalArgs = {}) {
  return {
    globalArgs: { name: "k", token: "t", ...globalArgs },
    modelType: "test",
    modelId: "test",
    writeResource: (_spec: string, name: string, data: unknown) => {
      store.set(name, data);
      return { name };
    },
    dataRepository: {
      getContent: (_t: string, _id: string, name: string) =>
        store.has(name)
          ? new TextEncoder().encode(JSON.stringify(store.get(name)))
          : null,
    },
  };
}

/**
 * Replace fetch with a router keyed by "METHOD /path" and record every
 * request, with its JSON body keyed the same way. Unrouted requests get a 404.
 */
function stubFetch(routes: Record<string, unknown>) {
  const calls: string[] = [];
  const bodies: Record<string, unknown> = {};
  const original = globalThis.fetch;
  globalThis.fetch = ((input: string | URL | Request, init?: RequestInit) => {
    const url = new URL(
      input instanceof Request ? input.url : input.toString(),
    );
    const key = `${init?.method ?? "GET"} ${url.pathname}`;
    if (url.pathname !== "/v2/account") calls.push(key);
    if (typeof init?.body === "string") bodies[key] = JSON.parse(init.body);
    if (url.pathname === "/v2/account") {
      return Promise.resolve(new Response("{}", { status: 200 }));
    }
    if (key in routes) {
      const body = routes[key];
      return Promise.resolve(
        body === null
          ? new Response(null, { status: 202 })
          : new Response(JSON.stringify(body), { status: 200 }),
      );
    }
    return Promise.resolve(
      new Response(JSON.stringify({ id: "not_found" }), { status: 404 }),
    );
  }) as typeof fetch;
  return { calls, bodies, restore: () => globalThis.fetch = original };
}

Deno.test("space key: sync and update address the key by access_key", async () => {
  const model = await loadModel("space_key.ts");
  const key = { name: "k", access_key: "AK123", created_at: "x" };
  const fetch = stubFetch({
    "POST /v2/spaces/keys": { key },
    "GET /v2/spaces/keys/AK123": { key },
    "PATCH /v2/spaces/keys/AK123": { key },
  });
  try {
    const store = new Map<string, unknown>();
    const ctx = makeContext(store);
    await model.methods.create!.execute({}, ctx);
    await model.methods.sync!.execute({}, ctx);
    await model.methods.update!.execute({}, ctx);
    assertEquals(fetch.calls, [
      "POST /v2/spaces/keys",
      "GET /v2/spaces/keys/AK123",
      "PATCH /v2/spaces/keys/AK123",
    ]);
    assertEquals(
      (store.get("k") as { access_key: string }).access_key,
      "AK123",
    );
  } finally {
    fetch.restore();
  }
});

Deno.test("monitoring sink: sync needs the UUID from get, then uses it", async () => {
  const model = await loadModel("monitoring_sink.ts");
  const sink = { destination: { id: "d1" }, resources: "r" };
  const fetch = stubFetch({
    "POST /v2/monitoring/sinks": null,
    "GET /v2/monitoring/sinks/S-UUID": { sink },
  });
  try {
    const store = new Map<string, unknown>();
    const ctx = makeContext(store);
    await model.methods.create!.execute({}, ctx);
    // create returns no body, so there is no identifier to sync with yet.
    await assertRejects(
      () => model.methods.sync!.execute({}, ctx),
      Error,
      "has no sink_uuid; run get",
    );
    await model.methods.get!.execute({ id: "S-UUID" }, ctx);
    await model.methods.sync!.execute({}, ctx);
    assertEquals(fetch.calls, [
      "POST /v2/monitoring/sinks",
      "GET /v2/monitoring/sinks/S-UUID",
      "GET /v2/monitoring/sinks/S-UUID",
    ]);
    assertEquals(
      (store.get("k") as { sink_uuid: string }).sink_uuid,
      "S-UUID",
    );
  } finally {
    fetch.restore();
  }
});

Deno.test("action gateway session: no get or sync, create keeps mcpUrl", async () => {
  const model = await loadModel("action_gateway_session.ts");
  assertEquals(model.methods.get, undefined);
  assertEquals(model.methods.sync, undefined);
  const fetch = stubFetch({
    "POST /v2/action-gateway/sessions": {
      session: { sessionUrn: "do:s:1", name: "k", tools: "own" },
      mcpUrl: "https://mcp.example",
      tools: "sibling",
    },
  });
  try {
    const store = new Map<string, unknown>();
    await model.methods.create!.execute({}, makeContext(store));
    assertEquals(store.get("k"), {
      sessionUrn: "do:s:1",
      name: "k",
      tools: "own",
      mcpUrl: "https://mcp.example",
    });
  } finally {
    fetch.restore();
  }
});

Deno.test("dedicated inference: create does not store the token secret", async () => {
  const model = await loadModel("dedicated_inference.ts");
  const fetch = stubFetch({
    "POST /v2/dedicated-inferences": {
      dedicated_inference: { id: "di-1", name: "k" },
      token: { id: "t-1", value: "SECRET" },
    },
  });
  try {
    const store = new Map<string, unknown>();
    await model.methods.create!.execute({}, makeContext(store));
    assertEquals(store.get("k"), { id: "di-1", name: "k" });
  } finally {
    fetch.restore();
  }
});

Deno.test("domain record: global args need only the parent and instance name", async () => {
  const model = await loadModel("domain_record.ts");
  assertEquals(
    model.globalArguments.safeParse({
      domain_name: "example.com",
      instance_name: "www",
    }).success,
    true,
  );
  assertEquals(
    model.globalArguments.safeParse({ instance_name: "www" }).success,
    false,
  );
});

Deno.test("domain record: create without type fails before any request", async () => {
  const model = await loadModel("domain_record.ts");
  const fetch = stubFetch({});
  try {
    const ctx = makeContext(new Map(), {
      domain_name: "example.com",
      instance_name: "www",
    });
    await assertRejects(
      () => model.methods.create!.execute({}, ctx),
      Error,
      "create requires global arguments: type",
    );
    assertEquals(fetch.calls, []);
  } finally {
    fetch.restore();
  }
});

Deno.test("domain record: PUT update fills type from the live resource, or fails before the PUT", async () => {
  const model = await loadModel("domain_record.ts");
  const path = "/v2/domains/example.com/records/r1";
  const store = new Map<string, unknown>([["www", { id: "r1", type: "A" }]]);
  const ctx = makeContext(store, {
    domain_name: "example.com",
    instance_name: "www",
    data: "1.2.3.4",
  });
  let fetch = stubFetch({
    [`GET ${path}`]: { domain_record: { id: "r1", type: "CNAME" } },
    [`PUT ${path}`]: { domain_record: { id: "r1", type: "CNAME" } },
  });
  try {
    await model.methods.update!.execute({}, ctx);
    assertEquals(fetch.calls, [`GET ${path}`, `PUT ${path}`]);
    // The live value, not stale stored state.
    assertEquals(
      (fetch.bodies[`PUT ${path}`] as { type: string }).type,
      "CNAME",
    );
  } finally {
    fetch.restore();
  }
  fetch = stubFetch({ [`GET ${path}`]: { domain_record: { id: "r1" } } });
  try {
    await assertRejects(
      () => model.methods.update!.execute({}, ctx),
      Error,
      "update requires global arguments: type",
    );
    assertEquals(fetch.calls, [`GET ${path}`]);
  } finally {
    fetch.restore();
  }
});

Deno.test("droplet: create checks only required fields the body sends", async () => {
  const model = await loadModel("droplet.ts");
  const fetch = stubFetch({
    "POST /v2/droplets": { droplet: { id: "d1", name: "k", size: "s-1" } },
  });
  try {
    await assertRejects(
      () =>
        model.methods.create!.execute(
          { waitForReady: false },
          makeContext(new Map()),
        ),
      Error,
      "create requires global arguments: size",
    );
    const store = new Map<string, unknown>();
    await model.methods.create!.execute(
      { waitForReady: false },
      makeContext(store, { size: "s-1" }),
    );
    assertEquals(fetch.calls, ["POST /v2/droplets"]);
    assertEquals(fetch.bodies["POST /v2/droplets"], { name: "k", size: "s-1" });
  } finally {
    fetch.restore();
  }
});
