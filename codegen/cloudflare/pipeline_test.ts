import { assertEquals } from "@std/assert";
import { generateCloudflareModels, parseResources } from "./pipeline.ts";
import { model as graphqlAnalyticsModel } from "./standalone/analytics/graphql_analytics.ts";

type OApiSpec = Parameters<typeof parseResources>[0];

function jsonBody(props: Record<string, { type: string }>) {
  return {
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: props,
          },
        },
      },
    },
  };
}

function getOp(props: Record<string, { type: string }>) {
  return {
    responses: {
      "200": {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                result: {
                  type: "object",
                  properties: props,
                },
              },
            },
          },
        },
      },
    },
  };
}

Deno.test("parseResources skips account-scoped paths with empty resource path", () => {
  const spec = {
    paths: {
      "/accounts/{account_id}": {
        post: jsonBody({ name: { type: "string" } }),
      },
      "/accounts/{account_id}/{booking_id}": {
        get: getOp({ id: { type: "string" }, name: { type: "string" } }),
        delete: {},
      },
    },
  } as OApiSpec;

  const { resources, skipped } = parseResources(spec);

  assertEquals(resources.length, 0);
  const emptyPathSkip = skipped.find((s) =>
    s.path === "/accounts/{account_id}"
  );
  assertEquals(emptyPathSkip?.reason, "failed to extract resource");
});

Deno.test("parseResources skips zone-scoped paths with empty resource path", () => {
  const spec = {
    paths: {
      "/zones/{zone_id}": {
        post: jsonBody({ name: { type: "string" } }),
      },
      "/zones/{zone_id}/{record_id}": {
        get: getOp({ id: { type: "string" }, name: { type: "string" } }),
        delete: {},
      },
    },
  } as OApiSpec;

  const { resources, skipped } = parseResources(spec);

  assertEquals(resources.length, 0);
  const emptyPathSkip = skipped.find((s) => s.path === "/zones/{zone_id}");
  assertEquals(emptyPathSkip?.reason, "failed to extract resource");
});

Deno.test("parseResources accepts valid account-scoped paths", () => {
  const spec = {
    paths: {
      "/accounts/{account_id}/workers": {
        post: jsonBody({ name: { type: "string" } }),
      },
      "/accounts/{account_id}/workers/{worker_id}": {
        get: getOp({ id: { type: "string" }, name: { type: "string" } }),
        patch: jsonBody({ name: { type: "string" } }),
        delete: {},
      },
    },
  } as OApiSpec;

  const { resources } = parseResources(spec);

  assertEquals(resources.length, 1);
  assertEquals(resources[0].service, "workers");
  assertEquals(resources[0].modelSlug, "workers");
  assertEquals(resources[0].fileName, "workers.ts");
});

Deno.test("parseResources detects /list sub-endpoint when base has no GET", () => {
  const spec = {
    paths: {
      "/accounts/{account_id}/rum/site_info": {
        post: jsonBody({ host: { type: "string" } }),
      },
      "/accounts/{account_id}/rum/site_info/list": {
        get: {
          parameters: [
            { name: "page", in: "query" },
            { name: "per_page", in: "query" },
          ],
          ...getOp({ id: { type: "string" } }),
        },
      },
      "/accounts/{account_id}/rum/site_info/{site_id}": {
        get: getOp({ id: { type: "string" }, host: { type: "string" } }),
        put: jsonBody({ host: { type: "string" } }),
        delete: {},
      },
    },
  } as OApiSpec;

  const { resources } = parseResources(spec);

  assertEquals(resources.length, 1);
  assertEquals(resources[0].listEndpointSuffix, "/list");
  assertEquals(resources[0].paginationStyle, "page");
});

Deno.test("parseResources uses empty listEndpointSuffix when base has GET", () => {
  const spec = {
    paths: {
      "/accounts/{account_id}/dns_records": {
        post: jsonBody({ name: { type: "string" } }),
        get: {
          parameters: [
            { name: "page", in: "query" },
          ],
        },
      },
      "/accounts/{account_id}/dns_records/{dns_record_id}": {
        get: getOp({ id: { type: "string" }, name: { type: "string" } }),
        patch: jsonBody({ name: { type: "string" } }),
        delete: {},
      },
    },
  } as OApiSpec;

  const { resources } = parseResources(spec);

  assertEquals(resources.length, 1);
  assertEquals(resources[0].listEndpointSuffix, "");
  assertEquals(resources[0].paginationStyle, "page");
});

Deno.test("parseResources records create-required fields, dropping scope args and undefined names", () => {
  const spec = {
    paths: {
      "/accounts/{account_id}/alerting/v3/policies": {
        post: {
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    account_id: { type: "string" },
                    name: { type: "string" },
                    alert_type: { type: "string" },
                    description: { type: "string" },
                  },
                  // `ghost` is required but never defined as a property.
                  required: ["account_id", "name", "alert_type", "ghost"],
                },
              },
            },
          },
        },
      },
      "/accounts/{account_id}/alerting/v3/policies/{policy_id}": {
        get: getOp({ id: { type: "string" }, name: { type: "string" } }),
        put: jsonBody({ name: { type: "string" } }),
        delete: {},
      },
    },
  } as OApiSpec;

  const { resources } = parseResources(spec);

  assertEquals(resources.length, 1);
  assertEquals(resources[0].createRequiredProperties, ["name", "alert_type"]);
});

Deno.test("standalone services with a readmePath ship that README, not the CRUD template", async () => {
  const dir = await Deno.makeTempDir();
  try {
    const schemaPath = `${dir}/spec.json`;
    await Deno.writeTextFile(schemaPath, JSON.stringify({ paths: {} }));
    const { services, errors } = await generateCloudflareModels({
      services: ["clef", "clairic"],
      outputDir: `${dir}/model`,
      schemaPath,
    });
    assertEquals(errors, []);
    assertEquals([...services.keys()].sort(), ["clairic", "clef"]);
    for (const service of ["clef", "clairic"]) {
      const expected = await Deno.readTextFile(
        new URL(
          `./standalone/workers-ai/README.${service}.md`,
          import.meta.url,
        ),
      );
      const result = services.get(service)!;
      assertEquals(result.readmeFile.sourceCode, expected);
      assertEquals(
        result.libFile.filePath,
        "extensions/models/_lib/workers_ai.ts",
      );
      assertEquals(
        result.manifest.sourceCode.includes(
          `name: "@swamp/cloudflare/${service}"`,
        ),
        true,
      );
    }
  } finally {
    await Deno.remove(dir, { recursive: true });
  }
});

Deno.test("analytics ships its hand-written README, which documents the model's real methods", async () => {
  const dir = await Deno.makeTempDir();
  try {
    const schemaPath = `${dir}/spec.json`;
    await Deno.writeTextFile(schemaPath, JSON.stringify({ paths: {} }));
    const { services, errors } = await generateCloudflareModels({
      services: ["analytics"],
      outputDir: `${dir}/model`,
      schemaPath,
    });
    assertEquals(errors, []);
    const readme = services.get("analytics")!.readmeFile.sourceCode;
    assertEquals(
      readme,
      await Deno.readTextFile(
        new URL("./standalone/analytics/README.md", import.meta.url),
      ),
    );
    const methodSections = [...readme.matchAll(/^### `(\w+)`$/gm)]
      .map((match) => match[1])
      .sort();
    assertEquals(
      methodSections,
      Object.keys(graphqlAnalyticsModel.methods).sort(),
    );
    const usedMethods = [...readme.matchAll(/method run \S+ (\w+)/g)]
      .map((match) => match[1]);
    assertEquals([...new Set(usedMethods)].sort(), methodSections);
    for (const method of ["create", "lookup", "adopt", "update", "delete"]) {
      assertEquals(
        readme.includes(`**${method}**`),
        false,
        `README must not list ${method}, which the model lacks`,
      );
    }
  } finally {
    await Deno.remove(dir, { recursive: true });
  }
});

// --- Disjunction variants (swamp-club#4419) ---

/** A zone-scoped resource whose POST and PATCH bodies are `body`. */
function zoneResourceSpec(body: unknown): OApiSpec {
  const op = {
    requestBody: { content: { "application/json": { schema: body } } },
  };
  return {
    paths: {
      "/zones/{zone_id}/dns_records": { post: op },
      "/zones/{zone_id}/dns_records/{dns_record_id}": {
        get: getOp({ id: { type: "string" } }),
        patch: op,
        delete: {},
      },
    },
  } as unknown as OApiSpec;
}

/** One dns_records-style branch: allOf[shared fields, per-type fields]. */
function recordBranch(type: string, specific: Record<string, unknown>) {
  return {
    allOf: [
      { type: "object", properties: { name: { type: "string" } } },
      {
        properties: { type: { type: "string", enum: [type] }, ...specific },
      },
    ],
  };
}

function dataOf(type: string, properties: Record<string, unknown>) {
  return {
    data: {
      type: "object",
      description: `Components of a ${type} record.`,
      properties,
    },
  };
}

Deno.test("parseResources keeps every distinct object shape a disjunction gives one property", () => {
  const spec = zoneResourceSpec({
    anyOf: [{
      oneOf: [
        recordBranch(
          "CAA",
          dataOf("CAA", {
            flags: { type: "number", minimum: 0, maximum: 255 },
            tag: { type: "string" },
          }),
        ),
        recordBranch(
          "NAPTR",
          dataOf("NAPTR", {
            flags: { type: "string" },
            order: { type: "number" },
          }),
        ),
        recordBranch(
          "SRV",
          dataOf("SRV", {
            port: { type: "number" },
            priority: { allOf: [{ type: "number" }] },
            target: { type: "string" },
            weight: { type: "number" },
          }),
        ),
      ],
    }],
  });

  const { resources } = parseResources(spec);
  assertEquals(resources.length, 1);
  const data = resources[0].createProperties.data;

  assertEquals(data.type, "object");
  assertEquals(data.properties, undefined);
  assertEquals(data.variants?.map((v) => Object.keys(v.properties ?? {})), [
    ["flags", "tag"],
    ["flags", "order"],
    ["port", "priority", "target", "weight"],
  ]);
  assertEquals(data.variants?.[0].properties?.flags.type, "number");
  assertEquals(data.variants?.[0].properties?.flags.maximum, 255);
  assertEquals(data.variants?.[1].properties?.flags.type, "string");
  assertEquals(data.variants?.[2].properties?.priority.type, "number");
  assertEquals(
    data.description,
    "Components of a CAA record. | Components of a NAPTR record. | Components of a SRV record.",
  );
  // The PATCH body goes through the same flattening.
  assertEquals(resources[0].updateProperties.data.variants?.length, 3);
  // The enum on the shared discriminator is still unioned, not variant-ised.
  assertEquals(resources[0].createProperties.type.enum, [
    "CAA",
    "NAPTR",
    "SRV",
  ]);
  assertEquals(resources[0].createProperties.type.variants, undefined);
});

Deno.test("parseResources collapses shapes that differ only in documentation to a plain object", () => {
  const shape = {
    priority: { type: "number", example: 1 },
    target: { type: "string" },
  };
  const spec = zoneResourceSpec({
    oneOf: [
      recordBranch(
        "HTTPS",
        dataOf("HTTPS", {
          ...shape,
          target: { type: "string", description: "HTTPS target" },
        }),
      ),
      recordBranch("SVCB", dataOf("SVCB", shape)),
    ],
  });

  const data = parseResources(spec).resources[0].createProperties.data;

  // One shape: a plain object, exactly as before the fix.
  assertEquals(data.variants, undefined);
  assertEquals(Object.keys(data.properties ?? {}), ["priority", "target"]);
});

// --- Mixed-type unions (swamp-club#4426) ---

Deno.test("parseResources keeps every type when disjunction branches disagree on a property", () => {
  const spec = zoneResourceSpec({
    oneOf: [
      recordBranch("A", { value: { type: "string" } }),
      recordBranch("B", {
        value: { type: "object", properties: { x: { type: "string" } } },
      }),
      recordBranch("C", { value: { type: "integer", minimum: 0 } }),
    ],
  });

  const { createProperties, updateProperties } = parseResources(spec)
    .resources[0];
  const value = createProperties.value;

  assertEquals(value.type, "union");
  assertEquals(value.variants?.map((v) => v.type), [
    "string",
    "object",
    "integer",
  ]);
  assertEquals(value.variants?.[1].properties?.x.type, "string");
  assertEquals(value.variants?.[2].minimum, 0);
  assertEquals(updateProperties.value.type, "union");
});

Deno.test("parseResources expands a branch that is itself a mixed anyOf into the union", () => {
  // cloudforce-one search[].value: a string in one branch, an anyOf of
  // scalars or an array in others.
  const spec = zoneResourceSpec({
    oneOf: [
      recordBranch("A", { value: { type: "string", maxLength: 512 } }),
      recordBranch("B", {
        value: {
          anyOf: [{ type: "number" }, { type: "boolean" }, { type: "null" }],
        },
      }),
      recordBranch("C", {
        value: { type: "array", items: { type: "string" } },
      }),
    ],
  });

  const value = parseResources(spec).resources[0].createProperties.value;

  assertEquals(value.variants?.map((v) => v.type), [
    "string",
    "number",
    "boolean",
    "array",
  ]);
});

Deno.test("parseResources merges enum members of a union whatever the branch order", () => {
  // page-rules action value: on/off for one action, a TTL for another, more
  // string enums for others.
  const branches = [
    recordBranch("A", { value: { type: "string", enum: ["on", "off"] } }),
    recordBranch("B", { value: { type: "integer" } }),
    recordBranch("C", { value: { type: "string", enum: ["low", "on"] } }),
    recordBranch("D", {
      value: { type: "object", properties: { url: { type: "string" } } },
    }),
  ];
  const valueOf = (order: number[]) =>
    parseResources(zoneResourceSpec({ oneOf: order.map((i) => branches[i]) }))
      .resources[0].createProperties.value;

  const value = valueOf([0, 1, 2, 3]);
  assertEquals(value.variants?.map((v) => v.type), [
    "string",
    "integer",
    "object",
  ]);
  assertEquals(value.variants?.[0].enum, ["on", "off", "low"]);

  const reordered = valueOf([1, 2, 3, 0]);
  assertEquals(reordered.variants?.map((v) => v.type), [
    "integer",
    "string",
    "object",
  ]);
  assertEquals(reordered.variants?.[1].enum, ["low", "on", "off"]);
});

Deno.test("parseResources lets an unconstrained scalar absorb constrained members of its type", () => {
  const spec = zoneResourceSpec({
    oneOf: [
      recordBranch("A", { value: { type: "string", enum: ["on"] } }),
      recordBranch("B", { value: { type: "string", pattern: "^[a-z]+$" } }),
      recordBranch("C", { value: { type: "integer" } }),
      recordBranch("D", { value: { type: "string" } }),
      recordBranch("E", { value: { type: "number" } }),
    ],
  });

  const value = parseResources(spec).resources[0].createProperties.value;

  assertEquals(value.variants?.map((v) => v.type), ["string", "number"]);
  assertEquals(value.variants?.[0].enum, undefined);
  assertEquals(value.variants?.[0].pattern, undefined);
});

Deno.test("parseResources lets the unconstrained branch win a same-type collision whatever the order", () => {
  const enumOn = recordBranch("A", { value: { type: "string", enum: ["on"] } });
  const free = recordBranch("B", {
    value: { type: "string", description: "free" },
  });
  const valueOf = (branches: unknown[]) =>
    parseResources(zoneResourceSpec({ oneOf: branches })).resources[0]
      .createProperties.value;

  for (const value of [valueOf([enumOn, free]), valueOf([free, enumOn])]) {
    assertEquals(value.type, "string");
    assertEquals(value.enum, undefined);
    assertEquals(value.variants, undefined);
  }

  // The property-level path agrees.
  const prop = parseResources(zoneResourceSpec({
    type: "object",
    properties: {
      value: { oneOf: [{ type: "string", enum: ["on"] }, { type: "string" }] },
    },
  })).resources[0].createProperties.value;
  assertEquals(prop.type, "string");
  assertEquals(prop.enum, undefined);
});

Deno.test("parseResources keeps enums of different types as separate union members", () => {
  const strEnum = recordBranch("A", {
    value: { type: "string", enum: ["on", "off"] },
  });
  const intEnum = recordBranch("B", {
    value: { type: "integer", enum: [0, 30] },
  });
  const obj = recordBranch("C", {
    value: { type: "object", properties: { url: { type: "string" } } },
  });
  const valueOf = (branches: unknown[]) =>
    parseResources(zoneResourceSpec({ oneOf: branches })).resources[0]
      .createProperties.value;

  for (
    const value of [
      valueOf([strEnum, intEnum, obj]),
      valueOf([strEnum, obj, intEnum]),
    ]
  ) {
    const byType = Object.fromEntries(
      (value.variants ?? []).map((v) => [v.type, v]),
    );
    assertEquals(byType.string?.enum, ["on", "off"]);
    assertEquals(byType.integer?.enum, [0, 30]);
    assertEquals(byType.object?.properties?.url.type, "string");
  }
});

Deno.test("parseResources still merges enums that omit their type", () => {
  const spec = zoneResourceSpec({
    oneOf: [
      recordBranch("A", { mode: { enum: ["a", "b"] } }),
      recordBranch("B", { mode: { enum: ["c"] } }),
      recordBranch("C", { mode: { type: "string", enum: ["d"] } }),
    ],
  });

  const mode = parseResources(spec).resources[0].createProperties.mode;

  assertEquals(mode.enum, ["a", "b", "c", "d"]);
});

Deno.test("parseResources stops at a recursive scalar-or-array-of-itself disjunction", () => {
  const expr: { anyOf: unknown[] } = { anyOf: [{ type: "string" }] };
  expr.anyOf.push({ type: "array", items: expr });
  const spec = zoneResourceSpec({
    type: "object",
    properties: { filter: expr },
  });

  const filter = parseResources(spec).resources[0].createProperties.filter;

  assertEquals(filter.variants?.map((v) => v.type), ["string", "array"]);
  // The nested reference is cut at its first typed branch.
  assertEquals(filter.variants?.[1].items?.type, "string");
});

Deno.test("parseResources keeps a plain scalar when branches differ only in what generated code ignores", () => {
  // dns content: an IPv4 address for A, an IPv6 address for AAAA.
  const spec = zoneResourceSpec({
    oneOf: [
      recordBranch("A", {
        content: { type: "string", format: "ipv4", description: "IPv4." },
      }),
      recordBranch("AAAA", {
        content: { type: "string", format: "ipv6", description: "IPv6." },
      }),
      recordBranch("TXT", { content: { type: "integer" } }),
    ],
  });

  const content = parseResources(spec).resources[0].createProperties.content;

  assertEquals(content.variants?.map((v) => v.type), ["string", "integer"]);

  const twoFormats = parseResources(zoneResourceSpec({
    oneOf: [
      recordBranch("A", { content: { type: "string", format: "ipv4" } }),
      recordBranch("B", {
        content: { oneOf: [{ type: "string", format: "ipv6" }] },
      }),
    ],
  })).resources[0].createProperties.content;
  assertEquals(twoFormats.type, "string");
  assertEquals(twoFormats.variants, undefined);
});

Deno.test("parseResources leaves an object vs oneOf-of-objects collision on the object path", () => {
  const nsId = {
    type: "object",
    properties: { namespace_id: { type: "string" } },
  };
  const byName = {
    type: "object",
    properties: { class_name: { type: "string" } },
  };
  const spec = zoneResourceSpec({
    oneOf: [
      recordBranch("A", { durable_objects: { oneOf: [nsId, byName] } }),
      recordBranch("B", { durable_objects: nsId }),
    ],
  });

  const prop = parseResources(spec).resources[0].createProperties
    .durable_objects;

  // First-wins, as before: the oneOf, whose object branches merge.
  assertEquals(prop.type, "object");
  assertEquals(Object.keys(prop.properties ?? {}), [
    "namespace_id",
    "class_name",
  ]);
});

Deno.test("parseResources keeps every type of a property-level mixed oneOf", () => {
  const spec = zoneResourceSpec({
    type: "object",
    properties: {
      ttl: { oneOf: [{ type: "string", enum: ["auto"] }, { type: "integer" }] },
      origin: {
        anyOf: [
          { type: "string" },
          { type: "object", properties: { a: { type: "string" } } },
          { type: "object", properties: { b: { type: "number" } } },
        ],
      },
    },
  });

  const { ttl, origin } = parseResources(spec).resources[0].createProperties;

  assertEquals(ttl.type, "union");
  assertEquals(ttl.variants?.map((v) => v.type), ["string", "integer"]);
  assertEquals(ttl.variants?.[0].enum, ["auto"]);
  // Object branches merge into one object, as in the single-type path.
  assertEquals(origin.variants?.map((v) => v.type), ["object", "string"]);
  assertEquals(Object.keys(origin.variants?.[0].properties ?? {}), ["a", "b"]);
});

Deno.test("parseResources keeps a oneOf with null as its single type", () => {
  const spec = zoneResourceSpec({
    type: "object",
    properties: {
      note: { oneOf: [{ type: "string" }, { type: "null" }] },
      untyped: { anyOf: [{ type: "integer" }, { description: "anything" }] },
    },
  });

  const { note, untyped } = parseResources(spec).resources[0].createProperties;

  assertEquals(note.type, "string");
  assertEquals(note.variants, undefined);
  assertEquals(untyped.type, "integer");
});

Deno.test("parseResources keeps the branches of an allOf around a single oneOf", () => {
  // containers durable_objects: allOf[{oneOf[{namespace_id}, {class_name}]}]
  const spec = zoneResourceSpec({
    type: "object",
    properties: {
      durable_objects: {
        description: "Optionally associates a namespace.",
        allOf: [{
          description: "Durable Object configuration.",
          oneOf: [
            {
              type: "object",
              properties: { namespace_id: { type: "string" } },
              required: ["namespace_id"],
            },
            {
              type: "object",
              properties: {
                class_name: { type: "string" },
                script_name: { type: "string" },
              },
              required: ["class_name", "script_name"],
            },
          ],
        }],
      },
    },
  });

  const prop = parseResources(spec).resources[0].createProperties
    .durable_objects;

  assertEquals(prop.type, "object");
  assertEquals(Object.keys(prop.properties ?? {}), [
    "namespace_id",
    "class_name",
    "script_name",
  ]);
});

Deno.test("parseResources keeps variants for a nested property-level disjunction", () => {
  // slurper/jobs shape: `source` is a oneOf of object variants whose
  // `secret` child differs per variant.
  const secret = (properties: Record<string, unknown>, required: string[]) => ({
    type: "object",
    properties,
    required,
  });
  const spec = zoneResourceSpec({
    type: "object",
    properties: {
      source: {
        oneOf: [
          {
            type: "object",
            properties: {
              vendor: { type: "string", enum: ["s3"] },
              secret: secret({
                accessKeyId: { type: "string" },
                secretAccessKey: { type: "string" },
              }, ["accessKeyId", "secretAccessKey"]),
            },
          },
          {
            type: "object",
            properties: {
              vendor: { type: "string", enum: ["gcs"] },
              secret: secret({
                clientEmail: { type: "string" },
                privateKey: { type: "string" },
              }, ["clientEmail", "privateKey"]),
            },
          },
        ],
      },
    },
  });

  const source = parseResources(spec).resources[0].createProperties.source;
  const variants = source.properties?.secret.variants;

  assertEquals(variants?.map((v) => v.requiredProperties), [
    ["accessKeyId", "secretAccessKey"],
    ["clientEmail", "privateKey"],
  ]);
  assertEquals(source.properties?.vendor.enum, ["s3", "gcs"]);
});

Deno.test("parseResources merges an object property that two allOf branches both define", () => {
  // dns CNAME: allOf[shared settings {ipv4_only}, {settings {flatten_cname}}]
  const spec = zoneResourceSpec({
    allOf: [
      {
        type: "object",
        properties: {
          settings: {
            type: "object",
            description: "Settings for the DNS record.",
            properties: { ipv4_only: { type: "boolean" } },
          },
        },
      },
      {
        properties: {
          settings: {
            type: "object",
            properties: { flatten_cname: { type: "boolean" } },
          },
        },
      },
    ],
  });

  const settings = parseResources(spec).resources[0].createProperties.settings;

  assertEquals(Object.keys(settings.properties ?? {}), [
    "ipv4_only",
    "flatten_cname",
  ]);
  assertEquals(settings.description, "Settings for the DNS record.");
});

Deno.test("parseResources treats a field named description as a field, not documentation", () => {
  const spec = zoneResourceSpec({
    oneOf: [
      recordBranch(
        "A",
        dataOf("A", {
          name: { type: "string" },
          description: { type: "string" },
        }),
      ),
      recordBranch("B", dataOf("B", { name: { type: "string" } })),
    ],
  });

  const data = parseResources(spec).resources[0].createProperties.data;

  assertEquals(data.variants?.map((v) => Object.keys(v.properties ?? {})), [
    ["name", "description"],
    ["name"],
  ]);
});

Deno.test("parseResources ignores required-field order when comparing shapes", () => {
  const shape = (required: string[]) => ({
    data: {
      type: "object",
      properties: { a: { type: "string" }, b: { type: "string" } },
      required,
    },
  });
  const spec = zoneResourceSpec({
    oneOf: [
      recordBranch("A", shape(["a", "b"])),
      recordBranch("B", shape(["b", "a"])),
    ],
  });

  const data = parseResources(spec).resources[0].createProperties.data;

  assertEquals(data.variants, undefined);
});

Deno.test("parseResources treats a variant without a type as an object", () => {
  const spec = zoneResourceSpec({
    oneOf: [
      recordBranch("A", { data: { properties: { a: { type: "string" } } } }),
      recordBranch("B", { data: { properties: { b: { type: "number" } } } }),
    ],
  });

  const data = parseResources(spec).resources[0].createProperties.data;

  assertEquals(data.variants?.map((v) => v.type), ["object", "object"]);
  assertEquals(data.variants?.[1].properties?.b.type, "number");
});

// --- Disjunctions inside a multi-member allOf (swamp-club#4436) ---

/** zoneResourceSpec whose GET returns `result` as the given schema. */
function zoneResourceSpecWithResult(body: unknown, result: unknown): OApiSpec {
  const spec = zoneResourceSpec(body) as unknown as {
    paths: Record<string, Record<string, unknown>>;
  };
  spec.paths["/zones/{zone_id}/dns_records/{dns_record_id}"].get = {
    responses: {
      "200": {
        content: {
          "application/json": {
            schema: { type: "object", properties: { result } },
          },
        },
      },
    },
  };
  return spec as unknown as OApiSpec;
}

Deno.test("parseResources distributes a body disjunction over the other allOf members", () => {
  const resource = parseResources(zoneResourceSpec({
    allOf: [
      {
        oneOf: [
          {
            type: "object",
            properties: { a: { type: "string" } },
            required: ["a"],
          },
          {
            type: "object",
            properties: { b: { type: "integer" } },
            required: ["b"],
          },
        ],
      },
      {
        type: "object",
        properties: { c: { type: "string" } },
        required: ["c"],
      },
    ],
  })).resources[0];

  assertEquals(Object.keys(resource.createProperties).sort(), ["a", "b", "c"]);
  assertEquals(resource.createProperties.b.type, "integer");
  assertEquals(resource.createRequiredProperties, ["c"]);
});

Deno.test("parseResources keeps every scalar type of a disjunction inside a multi-member allOf", () => {
  const value = parseResources(zoneResourceSpec({
    type: "object",
    properties: {
      value: {
        allOf: [
          {
            oneOf: [{ type: "string" }, { type: "number" }, {
              type: "boolean",
            }],
          },
          { description: "needle value" },
        ],
      },
    },
  })).resources[0].createProperties.value;

  assertEquals(value.type, "union");
  assertEquals(value.description, "needle value");
  assertEquals(
    (value.variants ?? []).map((v) => v.type).sort(),
    ["boolean", "number", "string"],
  );
});

Deno.test("parseResources drops disjunction branches the other allOf members contradict", () => {
  // workers observability needle.value: string|number|boolean AND a string.
  const value = parseResources(zoneResourceSpec({
    type: "object",
    properties: {
      value: {
        allOf: [
          {
            anyOf: [{ type: "string" }, { type: "number" }, {
              type: "boolean",
            }],
          },
          { type: "string", maxLength: 1000 },
        ],
      },
    },
  })).resources[0].createProperties.value;

  assertEquals(value.type, "string");
  assertEquals(value.variants, undefined);

  // integer satisfies number: the integer branch survives a number member.
  const n = parseResources(zoneResourceSpec({
    type: "object",
    properties: {
      n: {
        allOf: [
          { oneOf: [{ type: "integer" }, { type: "string" }] },
          { type: "number" },
        ],
      },
    },
  })).resources[0].createProperties.n;
  assertEquals(n.type, "integer");
});

Deno.test("parseResources merges object branches distributed over an object allOf member", () => {
  const prop = parseResources(zoneResourceSpec({
    type: "object",
    properties: {
      settings: {
        allOf: [
          {
            oneOf: [
              {
                type: "object",
                properties: { x: { type: "string" } },
                required: ["x"],
              },
              {
                type: "object",
                properties: { y: { type: "string" } },
                required: ["y"],
              },
            ],
          },
          {
            type: "object",
            properties: { z: { type: "string" } },
            required: ["z"],
          },
        ],
      },
    },
  })).resources[0].createProperties.settings;

  assertEquals(prop.type, "object");
  assertEquals(Object.keys(prop.properties ?? {}).sort(), ["x", "y", "z"]);
  assertEquals(prop.requiredProperties, ["z"]);

  // A property both branches define with different object shapes is kept
  // as variants, as for any other object disjunction.
  const collide = parseResources(zoneResourceSpec({
    type: "object",
    properties: {
      settings: {
        allOf: [
          {
            oneOf: [
              {
                properties: {
                  data: {
                    type: "object",
                    properties: { p: { type: "string" } },
                  },
                },
              },
              {
                properties: {
                  data: {
                    type: "object",
                    properties: { q: { type: "integer" } },
                  },
                },
              },
            ],
          },
          { type: "object", properties: { z: { type: "string" } } },
        ],
      },
    },
  })).resources[0].createProperties.settings;
  assertEquals(collide.properties?.data.variants?.length, 2);
});

Deno.test("parseResources keeps response fields when the result allOf holds a disjunction", () => {
  const result = {
    allOf: [
      {
        oneOf: [
          { type: "object", properties: { a: { type: "string" } } },
          { type: "object", properties: { b: { type: "string" } } },
        ],
      },
      {
        type: "object",
        properties: { id: { type: "string" }, name: { type: "string" } },
      },
    ],
  };
  const props = parseResources(zoneResourceSpecWithResult({
    type: "object",
    properties: { name: { type: "string" } },
  }, result)).resources[0].resourceProperties;

  assertEquals(Object.keys(props).sort(), ["a", "b", "id", "name"]);
});

Deno.test("parseResources keeps plain allOf members when a nested allOf holds a disjunction", () => {
  const inner = {
    allOf: [
      {
        oneOf: [
          { type: "object", properties: { a: { type: "string" } } },
          { type: "object", properties: { b: { type: "string" } } },
        ],
      },
      { type: "object", properties: { p: { type: "string" } } },
    ],
  };
  const nested = parseResources(zoneResourceSpec({
    allOf: [inner, { type: "object", properties: { q: { type: "string" } } }],
  })).resources[0].createProperties;
  assertEquals(Object.keys(nested).sort(), ["a", "b", "p", "q"]);

  // Two allOf members both define `cfg`; one definition is such an allOf.
  const conjoined = parseResources(zoneResourceSpec({
    allOf: [
      { type: "object", properties: { cfg: inner } },
      {
        type: "object",
        properties: {
          cfg: { type: "object", properties: { r: { type: "string" } } },
        },
      },
    ],
  })).resources[0].createProperties.cfg;
  assertEquals(
    Object.keys(conjoined.properties ?? {}).sort(),
    ["a", "b", "p", "r"],
  );
});

Deno.test("parseResources distributes two disjunction members pairwise, with a cap", () => {
  const prop = parseResources(zoneResourceSpec({
    type: "object",
    properties: {
      v: {
        allOf: [
          { oneOf: [{ type: "string" }, { type: "integer" }] },
          { anyOf: [{ type: "string" }, { type: "boolean" }] },
        ],
      },
    },
  })).resources[0].createProperties.v;
  // string∧string survives; string∧boolean, integer∧string, integer∧boolean
  // contradict.
  assertEquals(prop.type, "string");

  // 9 × 9 = 81 combinations exceeds the cap: today's merge (the last
  // member's type) is kept rather than a huge product.
  const nine = Array.from({ length: 9 }, (_, i) => ({
    type: "object",
    properties: { [`k${i}`]: { type: "string" } },
  }));
  const capped = parseResources(zoneResourceSpec({
    type: "object",
    properties: {
      v: {
        allOf: [
          { oneOf: nine },
          { oneOf: nine },
          { type: "object", properties: { z: { type: "string" } } },
        ],
      },
    },
  })).resources[0].createProperties.v;
  assertEquals(Object.keys(capped.properties ?? {}), ["z"]);
});

Deno.test("parseResources falls back to the plain merge when every disjunction branch is contradicted", () => {
  const prop = parseResources(zoneResourceSpec({
    type: "object",
    properties: {
      v: {
        allOf: [
          { oneOf: [{ type: "number" }, { type: "boolean" }] },
          { type: "string", description: "only a string" },
        ],
      },
    },
  })).resources[0].createProperties.v;
  assertEquals(prop.type, "string");
  assertEquals(prop.description, "only a string");
});

Deno.test("parseResources keeps a disjunction member's own keywords in every branch", () => {
  // {type: integer, oneOf: [...]}: the integer holds for each branch.
  const n = parseResources(zoneResourceSpec({
    type: "object",
    properties: {
      n: {
        allOf: [
          { type: "integer", oneOf: [{ minimum: 0 }, { maximum: -10 }] },
          { description: "x" },
        ],
      },
    },
  })).resources[0].createProperties.n;
  assertEquals(n.type, "integer");
  assertEquals(n.description, "x");

  // The member's own type also takes part in pruning.
  const s = parseResources(zoneResourceSpec({
    type: "object",
    properties: {
      s: {
        allOf: [
          { type: "string", oneOf: [{ type: "string" }, { type: "number" }] },
          { description: "y" },
        ],
      },
    },
  })).resources[0].createProperties.s;
  assertEquals(s.type, "string");
});

Deno.test("parseResources records the update body's own required fields", () => {
  // dlp entries PUT: allOf[oneOf[custom {name, pattern, type}, predefined
  // {type}], {enabled}]; only type and enabled are required in every branch.
  const update = {
    allOf: [
      {
        oneOf: [
          {
            type: "object",
            properties: {
              name: { type: "string" },
              type: { type: "string", enum: ["custom"] },
            },
            required: ["name", "type"],
          },
          {
            type: "object",
            properties: { type: { type: "string", enum: ["predefined"] } },
            required: ["type"],
          },
        ],
      },
      {
        type: "object",
        properties: { enabled: { type: "boolean" } },
        required: ["enabled"],
      },
    ],
  };
  const op = (schema: unknown) => ({
    requestBody: { content: { "application/json": { schema } } },
  });
  const resource = parseResources({
    paths: {
      "/zones/{zone_id}/dns_records": {
        post: op({
          type: "object",
          properties: {
            name: { type: "string" },
            enabled: { type: "boolean" },
          },
          required: ["name", "enabled"],
        }),
      },
      "/zones/{zone_id}/dns_records/{dns_record_id}": {
        get: getOp({ id: { type: "string" } }),
        put: op(update),
        delete: {},
      },
    },
  } as unknown as OApiSpec).resources[0];

  assertEquals(resource.updateRequiredProperties?.sort(), ["enabled", "type"]);
  assertEquals(resource.createRequiredProperties.sort(), ["enabled", "name"]);

  // An update body that declares no `required` anywhere says nothing about
  // what it needs: no list is recorded, so the create-required guard stays.
  const undeclared = parseResources({
    paths: {
      "/zones/{zone_id}/dns_records": {
        post: op({
          type: "object",
          properties: { name: { type: "string" } },
          required: ["name"],
        }),
      },
      "/zones/{zone_id}/dns_records/{dns_record_id}": {
        get: getOp({ id: { type: "string" } }),
        put: op({ type: "object", properties: { name: { type: "string" } } }),
        delete: {},
      },
    },
  } as unknown as OApiSpec).resources[0];
  assertEquals(undeclared.updateRequiredProperties, undefined);
  assertEquals(undeclared.createRequiredProperties, ["name"]);

  const withPut = (putBody: unknown) =>
    parseResources({
      paths: {
        "/zones/{zone_id}/dns_records": {
          post: op({
            type: "object",
            properties: { name: { type: "string" }, x: { type: "string" } },
            required: ["name"],
          }),
        },
        "/zones/{zone_id}/dns_records/{dns_record_id}": {
          get: getOp({ id: { type: "string" } }),
          put: op(putBody),
          delete: {},
        },
      },
    } as unknown as OApiSpec).resources[0];

  // Properties beside a oneOf of required lists: flattening keeps only the
  // root list, so it is not the body's declared list.
  assertEquals(
    withPut({
      type: "object",
      properties: { name: { type: "string" }, x: { type: "string" } },
      oneOf: [{ required: ["name"] }, { required: ["name", "x"] }],
    }).updateRequiredProperties,
    undefined,
  );

  // A disjunction body whose branches declare no required list declares none.
  assertEquals(
    withPut({
      oneOf: [
        { type: "object", properties: { name: { type: "string" } } },
        { type: "object", properties: { x: { type: "string" } } },
      ],
    }).updateRequiredProperties,
    undefined,
  );

  // Past the distribution cap the branches' lists are lost: not declared,
  // even though the plain member declares one.
  const nine = Array.from({ length: 9 }, (_, i) => ({
    type: "object",
    properties: { [`k${i}`]: { type: "string" } },
    required: [`k${i}`],
  }));
  assertEquals(
    withPut({
      allOf: [
        { oneOf: nine },
        { oneOf: nine },
        {
          type: "object",
          properties: { x: { type: "string" } },
          required: ["x"],
        },
      ],
    }).updateRequiredProperties,
    undefined,
  );
});

Deno.test("parseResources does not require a field only some distributed branches require", () => {
  const resource = parseResources(zoneResourceSpec({
    allOf: [
      {
        oneOf: [
          {
            type: "object",
            properties: { name: { type: "string" }, kind: { type: "string" } },
            required: ["name", "kind"],
          },
          { type: "object", properties: { kind: { type: "string" } } },
        ],
      },
      { type: "object", properties: { enabled: { type: "boolean" } } },
    ],
  })).resources[0];
  assertEquals(resource.createRequiredProperties, []);
});

// --- Circular schemas (swamp-club#4428) ---

Deno.test("parseResources normalizes a self-referencing request body without overflowing", () => {
  // deno-lint-ignore no-explicit-any
  const node: any = {
    type: "object",
    properties: { name: { type: "string" } },
  };
  node.properties.child = node;
  node.properties.children = { type: "array", items: node };

  const props = parseResources(zoneResourceSpec(node)).resources[0]
    .createProperties;

  // The body is entered through extractRequestBody, so `child` is the first
  // normalizeProperty visit of the node and its own `child` is the re-entry.
  assertEquals(props.name.type, "string");
  assertEquals(props.child.type, "object");
  assertEquals(props.child.properties?.name.type, "string");
  assertEquals(props.child.properties?.child.type, "object");
  assertEquals(props.child.properties?.child.properties, undefined);
  assertEquals(props.children.type, "array");
  assertEquals(props.children.items?.type, "object");
  assertEquals(
    props.children.items?.properties?.children.items?.properties,
    undefined,
  );
});

Deno.test("parseResources terminates on a cycle reached through a distributed allOf branch", () => {
  // deno-lint-ignore no-explicit-any
  const node: any = {
    allOf: [
      {
        oneOf: [
          { type: "object", properties: { a: { type: "string" } } },
          { type: "object", properties: { b: { type: "string" } } },
        ],
      },
      { type: "object", properties: {} },
    ],
  };
  node.allOf[0].oneOf[0].properties.next = node;
  node.allOf[1].properties.self = node;

  const props = parseResources(zoneResourceSpec({
    type: "object",
    properties: { root: node },
  })).resources[0].createProperties;
  assertEquals(props.root.type, "object");
  assertEquals(
    Object.keys(props.root.properties ?? {}).sort(),
    ["a", "b", "next", "self"],
  );
});

Deno.test("parseResources normalizes the loader's [Circular] marker as an untyped object", () => {
  // fetchCloudflareSchema writes "[Circular]" where the spec loops back on an
  // ancestor (filter groups, pipeline struct fields). It stands for that
  // ancestor's schema, not a string, so it is untyped like an in-memory cycle.
  const props = parseResources(zoneResourceSpec({
    type: "object",
    properties: {
      loop: "[Circular]",
      loops: { type: "array", items: "[Circular]" },
      name: { type: "string" },
      other: "not a marker",
    },
  })).resources[0].createProperties;
  assertEquals(props.loop.type, "object");
  assertEquals(props.loop.properties, undefined);
  assertEquals(props.loops.items?.type, "object");
  assertEquals(props.name.type, "string");
  assertEquals(props.other.type, "string");
});
