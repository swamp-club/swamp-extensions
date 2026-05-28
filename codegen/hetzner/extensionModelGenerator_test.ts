import { assertSnapshot } from "@std/testing/snapshot";
import { assert, assertStringIncludes } from "@std/assert";
import { generateHetznerExtensionModel } from "./extensionModelGenerator.ts";
import type { HetznerProperty, HetznerResource } from "./pipeline.ts";

function makeResource(
  overrides: Partial<HetznerResource> & {
    noun: string;
    modelSlug: string;
    fileName: string;
  },
): HetznerResource {
  return {
    createProperties: {},
    updateProperties: {},
    resourceProperties: {},
    requiredProperties: [],
    handlers: {
      create: true,
      read: true,
      update: true,
      delete: true,
      list: true,
    },
    identifyingField: "id",
    ...overrides,
  };
}

const stringProp: HetznerProperty = { type: "string" };
const intProp: HetznerProperty = { type: "integer" };

// ---------------------------------------------------------------------------
// Snapshot: all CRUD handlers, natural name field
// ---------------------------------------------------------------------------

Deno.test("generateHetznerExtensionModel - all handlers, natural name", async (t) => {
  const resource = makeResource({
    noun: "servers",
    modelSlug: "servers",
    fileName: "servers.ts",
    createProperties: {
      name: { type: "string", description: "Name of the server" },
      server_type: {
        type: "string",
        description: "ID or name of the server type",
      },
      image: { type: "string", description: "ID or name of the image" },
    },
    updateProperties: {
      name: { type: "string", description: "New name for the server" },
    },
    resourceProperties: {
      id: intProp,
      name: stringProp,
      status: stringProp,
      server_type: {
        type: "object",
        properties: { id: intProp, name: stringProp },
      },
      public_net: {
        type: "object",
        properties: {
          ipv4: { type: "object", properties: { ip: stringProp } },
        },
      },
    },
    requiredProperties: ["name", "server_type", "image"],
  });

  await assertSnapshot(
    t,
    generateHetznerExtensionModel({
      resource,
      extensionName: "@swamp/hetzner-cloud",
      version: "2026.01.01.1",
    }),
  );
});

// ---------------------------------------------------------------------------
// Snapshot: no update handler, no delete handler
// ---------------------------------------------------------------------------

Deno.test("generateHetznerExtensionModel - read-only (no update, no delete)", async (t) => {
  const resource = makeResource({
    noun: "zones",
    modelSlug: "zones",
    fileName: "zones.ts",
    handlers: {
      create: true,
      read: true,
      update: false,
      delete: false,
      list: true,
    },
    createProperties: {
      name: { type: "string", description: "Zone name" },
      ttl: { type: "integer", description: "TTL" },
    },
    resourceProperties: {
      id: intProp,
      name: stringProp,
      ttl: intProp,
      status: stringProp,
    },
    requiredProperties: ["name"],
  });

  await assertSnapshot(
    t,
    generateHetznerExtensionModel({
      resource,
      extensionName: "@swamp/hetzner-cloud",
      version: "2026.01.01.1",
    }),
  );
});

// ---------------------------------------------------------------------------
// Snapshot: synthetic name (no "name" or "label" in create properties)
// ---------------------------------------------------------------------------

Deno.test("generateHetznerExtensionModel - synthetic name", async (t) => {
  const resource = makeResource({
    noun: "primary_ips",
    modelSlug: "primary-ips",
    fileName: "primary_ips.ts",
    createProperties: {
      type: {
        type: "string",
        description: "IP type (ipv4 or ipv6)",
        enum: ["ipv4", "ipv6"],
      },
      datacenter: { type: "string", description: "Datacenter name" },
      assignee_type: { type: "string", description: "Resource type (server)" },
    },
    updateProperties: {},
    resourceProperties: {
      id: intProp,
      ip: stringProp,
      type: stringProp,
      datacenter: {
        type: "object",
        properties: { id: intProp, name: stringProp },
      },
    },
    requiredProperties: ["type", "assignee_type"],
    handlers: {
      create: true,
      read: true,
      update: false,
      delete: true,
      list: true,
    },
  });

  await assertSnapshot(
    t,
    generateHetznerExtensionModel({
      resource,
      extensionName: "@swamp/hetzner-cloud",
      version: "2026.01.01.1",
    }),
  );
});

// ---------------------------------------------------------------------------
// Behavior assertions: token auth arg, list method, validation preserved
// ---------------------------------------------------------------------------

function serversResource(
  handlers?: Partial<HetznerResource["handlers"]>,
): HetznerResource {
  return makeResource({
    noun: "servers",
    modelSlug: "servers",
    fileName: "servers.ts",
    createProperties: {
      name: { type: "string", description: "Name of the server" },
      server_type: { type: "string", description: "Server type" },
      image: { type: "string", description: "Image" },
    },
    updateProperties: {
      name: { type: "string", description: "New name for the server" },
    },
    resourceProperties: { id: intProp, name: stringProp },
    requiredProperties: ["name", "server_type", "image"],
    handlers: {
      create: true,
      read: true,
      update: true,
      delete: true,
      list: true,
      ...handlers,
    },
  });
}

function generateServers(handlers?: Partial<HetznerResource["handlers"]>) {
  return generateHetznerExtensionModel({
    resource: serversResource(handlers),
    extensionName: "@swamp/hetzner-cloud",
    version: "2026.01.01.1",
  });
}

Deno.test("emits an optional, sensitive token global argument", () => {
  const out = generateServers();
  assertStringIncludes(out, "token: z.string().meta({ sensitive: true })");
  // present in both GlobalArgsSchema (described) and InputsSchema (bare optional)
  assertStringIncludes(
    out,
    "token: z.string().meta({ sensitive: true }).optional(),",
  );
});

Deno.test("threads the token into every lib call but never the request body", () => {
  const out = generateServers();
  // auth-only: must never be serialized into a create/update body
  assert(
    !out.includes("body.token"),
    "token must never be assigned into a request body",
  );
  // threaded as the trailing auth arg on each helper
  assertStringIncludes(out, 'create("/servers", body, g.token)');
  assertStringIncludes(
    out,
    'read("/servers", args.id, context.globalArgs.token)',
  );
  assertStringIncludes(out, 'update("/servers", existing.id, body, g.token)');
  assertStringIncludes(
    out,
    'remove("/servers", args.id, context.globalArgs.token)',
  );
  assertStringIncludes(out, 'tryRead("/servers", existing.id, g.token)');
});

Deno.test("emits a list method when handlers.list is true", () => {
  const out = generateServers({ list: true });
  assertStringIncludes(out, "list: {");
  assertStringIncludes(out, 'listAll("/servers", queryParams, g.token)');
  assertStringIncludes(out, "label_selector");
  assertStringIncludes(out, "result: { count: items.length }");
});

Deno.test("omits the list method when handlers.list is false", () => {
  const out = generateServers({ list: false });
  assert(!out.includes("list: {"), "no list method should be emitted");
  assert(!out.includes("listAll"), "listAll should not be imported or called");
});

Deno.test("preserves create-required args as required (validation not weakened)", () => {
  const out = generateServers();
  const gas = out.slice(
    out.indexOf("const GlobalArgsSchema"),
    out.indexOf("const ResourceSchema"),
  );
  // required create props keep no `.optional()` in GlobalArgsSchema
  assertStringIncludes(gas, `name: z.string().describe("Name of the server"),`);
  assertStringIncludes(gas, `server_type: z.string().describe("Server type"),`);
  assertStringIncludes(gas, `image: z.string().describe("Image"),`);
  // the only optional addition is the auth token
  assertStringIncludes(gas, "token: z.string().meta({ sensitive: true })");
});

// ---------------------------------------------------------------------------
// Snapshot: label-based naming (no "name", has "label")
// ---------------------------------------------------------------------------

Deno.test("generateHetznerExtensionModel - label-based naming", async (t) => {
  const resource = makeResource({
    noun: "placement_groups",
    modelSlug: "placement-groups",
    fileName: "placement_groups.ts",
    createProperties: {
      label: { type: "string", description: "User-defined label" },
      type: { type: "string", description: "Placement group type" },
    },
    updateProperties: {
      label: { type: "string", description: "Updated label" },
    },
    resourceProperties: {
      id: intProp,
      label: stringProp,
      type: stringProp,
    },
    requiredProperties: ["label", "type"],
  });

  await assertSnapshot(
    t,
    generateHetznerExtensionModel({
      resource,
      extensionName: "@swamp/hetzner-cloud",
      version: "2026.01.01.1",
    }),
  );
});

// ---------------------------------------------------------------------------
// Snapshot: with upgrades block
// ---------------------------------------------------------------------------

Deno.test("generateHetznerExtensionModel - with upgrades block", async (t) => {
  const resource = makeResource({
    noun: "ssh_keys",
    modelSlug: "ssh-keys",
    fileName: "ssh_keys.ts",
    createProperties: {
      name: { type: "string", description: "Name of the SSH key" },
      public_key: { type: "string", description: "Public key" },
    },
    updateProperties: {
      name: { type: "string", description: "New name" },
    },
    resourceProperties: {
      id: intProp,
      name: stringProp,
      public_key: stringProp,
      fingerprint: stringProp,
    },
    requiredProperties: ["name", "public_key"],
  });

  await assertSnapshot(
    t,
    generateHetznerExtensionModel({
      resource,
      extensionName: "@swamp/hetzner-cloud",
      version: "2026.01.02.1",
      upgradesBlock:
        `  upgrades: [\n    {\n      toVersion: "2026.01.02.1",\n      description: "Removed: labels",\n      upgradeAttributes: (old: Record<string, unknown>) => {\n        const { labels: _labels, ...rest } = old;\n        return rest;\n      },\n    },\n  ],`,
    }),
  );
});

// ---------------------------------------------------------------------------
// Snapshot: enum and constraint properties
// ---------------------------------------------------------------------------

Deno.test("generateHetznerExtensionModel - properties with enums and constraints", async (t) => {
  const resource = makeResource({
    noun: "firewalls",
    modelSlug: "firewalls",
    fileName: "firewalls.ts",
    createProperties: {
      name: { type: "string", description: "Firewall name", maxLength: 128 },
      rules: {
        type: "array",
        description: "Array of rules",
        items: {
          type: "object",
          properties: {
            direction: { type: "string", enum: ["in", "out"] },
            protocol: {
              type: "string",
              enum: ["tcp", "udp", "icmp", "esp", "gre"],
            },
            port: { type: "string" },
          },
          requiredProperties: ["direction", "protocol"],
        },
      },
    },
    resourceProperties: {
      id: intProp,
      name: stringProp,
      rules: {
        type: "array",
        items: {
          type: "object",
          properties: { direction: stringProp, protocol: stringProp },
        },
      },
    },
    requiredProperties: ["name"],
  });

  await assertSnapshot(
    t,
    generateHetznerExtensionModel({
      resource,
      extensionName: "@swamp/hetzner-cloud",
      version: "2026.01.01.1",
    }),
  );
});
