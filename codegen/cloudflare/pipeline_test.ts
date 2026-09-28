import { assertEquals } from "@std/assert";
import { parseResources } from "./pipeline.ts";

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
