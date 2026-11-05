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

Deno.test("parseResources keeps first-wins for scalar and mixed-type collisions", () => {
  const spec = zoneResourceSpec({
    oneOf: [
      recordBranch("A", { value: { type: "string" } }),
      recordBranch("B", {
        value: { type: "object", properties: { x: { type: "string" } } },
      }),
      recordBranch("C", { value: { type: "integer" } }),
    ],
  });

  const value = parseResources(spec).resources[0].createProperties.value;

  assertEquals(value.type, "string");
  assertEquals(value.variants, undefined);
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
