import { assertEquals, assertThrows } from "@std/assert";
import {
  assertIdentifierResolvable,
  type DigitalOceanResource,
  resolveCreateEnvelope,
  resolveIdentifierField,
} from "./pipeline.ts";

// ---------------------------------------------------------------------------
// resolveIdentifierField
// ---------------------------------------------------------------------------

Deno.test("resolveIdentifierField - param naming a response field is used as-is", () => {
  // Spaces keys: the response has `access_key`, not an underscore-stripped
  // `accesskey`.
  assertEquals(
    resolveIdentifierField("/v2/spaces/keys/{access_key}", "access_key", [
      "name",
      "access_key",
    ]),
    "access_key",
  );
});

Deno.test("resolveIdentifierField - matches a camelCase response field", () => {
  assertEquals(
    resolveIdentifierField("/v2/x/{server_ref}", "server_ref", [
      "serverRef",
      "endpoint",
    ]),
    "serverRef",
  );
});

Deno.test("resolveIdentifierField - IDENTIFIER_MAP wins over response matching", () => {
  assertEquals(
    resolveIdentifierField(
      "/v2/byoip_prefixes/{byoip_prefix_uuid}",
      "byoip_prefix_uuid",
      [
        "uuid",
        "name",
      ],
    ),
    "uuid",
  );
  assertEquals(
    resolveIdentifierField(
      "/v2/functions/namespaces/{namespace_id}",
      "namespace_id",
      [
        "namespace",
        "uuid",
      ],
    ),
    "namespace",
  );
});

Deno.test("resolveIdentifierField - falls back to id, then to nothing", () => {
  assertEquals(
    resolveIdentifierField("/v2/load_balancers/{lb_id}", "lb_id", [
      "id",
      "name",
    ]),
    "id",
  );
  assertEquals(
    resolveIdentifierField("/v2/monitoring/sinks/{sink_uuid}", "sink_uuid", [
      "destination",
    ]),
    undefined,
  );
});

// ---------------------------------------------------------------------------
// assertIdentifierResolvable
// ---------------------------------------------------------------------------

function resource(
  overrides: Partial<DigitalOceanResource>,
): DigitalOceanResource {
  return {
    displayName: "Thing",
    modelSlug: "thing",
    fileName: "thing.ts",
    endpoint: "/v2/things",
    createProperties: {},
    updateProperties: {},
    resourceProperties: { name: { type: "string" } },
    requiredProperties: [],
    handlers: { create: true, read: true, update: true, delete: true },
    updateMethod: "PATCH",
    identifyingField: "thing_ref",
    idParam: "thing_ref",
    createOnlyProperties: new Set<string>(),
    actions: [],
    subResourceMethods: [],
    ...overrides,
  };
}

Deno.test("assertIdentifierResolvable - rejects an identifier missing from the response", () => {
  assertThrows(
    () => assertIdentifierResolvable(resource({})),
    Error,
    'path param "thing_ref" matches no response field',
  );
});

Deno.test("assertIdentifierResolvable - accepts response fields, id, args, and no-read resources", () => {
  assertIdentifierResolvable(resource({ identifyingField: "name" }));
  assertIdentifierResolvable(resource({ identifyingField: "id" }));
  assertIdentifierResolvable(resource({ identifierFromArgs: true }));
  assertIdentifierResolvable(
    resource({
      handlers: { create: true, read: false, update: false, delete: true },
    }),
  );
});

Deno.test("assertIdentifierResolvable - an update without a GET-by-id still needs the identifier", () => {
  assertThrows(
    () =>
      assertIdentifierResolvable(
        resource({
          handlers: { create: true, read: false, update: true, delete: true },
        }),
      ),
    Error,
    "matches no response field",
  );
});

// ---------------------------------------------------------------------------
// resolveCreateEnvelope
// ---------------------------------------------------------------------------

type Schema = { type?: string; properties?: Record<string, Schema> };
const json = (properties: Record<string, Schema>) => ({
  "200": {
    content: { "application/json": { schema: { type: "object", properties } } },
  },
});
const str: Schema = { type: "string" };

Deno.test("resolveCreateEnvelope - keeps non-colliding siblings of the resource object", () => {
  const envelope = resolveCreateEnvelope(
    {
      responses: json({
        session: {
          type: "object",
          properties: { sessionUrn: str, tools: str },
        },
        mcpUrl: str,
        tools: str,
      }),
    },
    "/v2/action-gateway/sessions",
    ["sessionUrn", "tools"],
    "sessionUrn",
  );
  assertEquals(envelope?.key, "session");
  // `tools` collides with the session's own field, so the resource keeps it.
  assertEquals(Object.keys(envelope?.siblings ?? {}), ["mcpUrl"]);
});

Deno.test("resolveCreateEnvelope - skips secret-bearing siblings", () => {
  const envelope = resolveCreateEnvelope(
    {
      responses: json({
        dedicated_inference: { type: "object", properties: { id: str } },
        token: { type: "object", properties: { value: str } },
      }),
    },
    "/v2/dedicated-inferences",
    ["id"],
    "id",
  );
  assertEquals(envelope, { key: "dedicated_inference", siblings: {} });
});

Deno.test("resolveCreateEnvelope - ignores oneOf alternatives", () => {
  // droplet: `{ droplet }` for one, `{ droplets: [...] }` for many.
  assertEquals(
    resolveCreateEnvelope(
      {
        responses: {
          "202": {
            content: {
              "application/json": {
                schema: {
                  oneOf: [
                    {
                      type: "object",
                      properties: {
                        droplet: { type: "object", properties: { id: str } },
                      },
                    },
                    {
                      type: "object",
                      properties: {
                        droplets: { type: "object", properties: { id: str } },
                      },
                    },
                  ],
                },
              },
            },
          },
        },
      },
      "/v2/droplets",
      ["id"],
      "id",
    ),
    undefined,
  );
});

Deno.test("resolveCreateEnvelope - a nested object sharing a field name is not the resource key", () => {
  // `region.name` overlaps the resource's `name`, but region has no `id`, and
  // `id` at the top level marks the response as flat.
  assertEquals(
    resolveCreateEnvelope(
      {
        responses: json({
          id: str,
          name: str,
          region: { type: "object", properties: { name: str, slug: str } },
        }),
      },
      "/v2/things",
      ["id", "name"],
      "id",
    ),
    undefined,
  );
});

Deno.test("resolveCreateEnvelope - a nested object field is not the resource key", () => {
  // Flat response: the resource's own fields plus a nested `region` object
  // whose fields the resource does not have.
  assertEquals(
    resolveCreateEnvelope(
      {
        responses: json({
          uuid: str,
          region: { type: "object", properties: { slug: str } },
        }),
      },
      "/v2/things",
      ["uuid", "region"],
      "uuid",
    ),
    undefined,
  );
});

Deno.test("resolveCreateEnvelope - ignores single-key and flat responses", () => {
  assertEquals(
    resolveCreateEnvelope(
      {
        responses: json({
          droplet: { type: "object", properties: { id: str } },
          links: str,
        }),
      },
      "/v2/droplets",
      ["id"],
      "id",
    ),
    undefined,
  );
  // byoip_prefix returns the resource's own fields at the top level.
  assertEquals(
    resolveCreateEnvelope(
      { responses: json({ uuid: str, region: str, status: str }) },
      "/v2/byoip_prefixes",
      ["uuid"],
      "uuid",
    ),
    undefined,
  );
});
