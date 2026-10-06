import { assertSnapshot } from "@std/testing/snapshot";
import { assertEquals, assertStringIncludes } from "@std/assert";
import { generateDigitalOceanExtensionModel } from "./extensionModelGenerator.ts";
import type { DigitalOceanProperty, DigitalOceanResource } from "./pipeline.ts";

function makeResource(
  overrides: Partial<DigitalOceanResource> & {
    modelSlug: string;
    displayName: string;
    endpoint: string;
  },
): DigitalOceanResource {
  return {
    fileName: `${overrides.modelSlug.replace(/-/g, "_")}.ts`,
    identifyingField: "id",
    idParam: `${overrides.modelSlug.replace(/-/g, "_")}_id`,
    createProperties: {},
    updateProperties: {},
    resourceProperties: {},
    requiredProperties: [],
    handlers: { create: true, read: true, update: true, delete: true },
    updateMethod: "PUT",
    createOnlyProperties: new Set<string>(),
    actions: [],
    subResourceMethods: [],
    ...overrides,
  };
}

const stringProp: DigitalOceanProperty = { type: "string" };
const intProp: DigitalOceanProperty = { type: "integer" };

// ---------------------------------------------------------------------------
// Snapshot: basic resource with all CRUD handlers, natural name
// ---------------------------------------------------------------------------

Deno.test("generateDigitalOceanExtensionModel - all handlers, natural name", async (t) => {
  const resource = makeResource({
    displayName: "Droplet",
    modelSlug: "droplet",
    endpoint: "/v2/droplets",
    identifyingField: "id",
    idParam: "droplet_id",
    createProperties: {
      name: { type: "string", description: "The hostname for the Droplet" },
      region: {
        type: "string",
        description: "The slug of the region",
        isRegion: true,
      },
      size: { type: "string", description: "The slug of the Droplet size" },
      image: {
        type: "string",
        description: "The image ID or slug",
      },
    },
    updateProperties: {
      name: {
        type: "string",
        description: "The new hostname for the Droplet",
      },
    },
    resourceProperties: {
      id: intProp,
      name: stringProp,
      status: stringProp,
      size_slug: stringProp,
      region: {
        type: "object",
        properties: { slug: stringProp, name: stringProp },
      },
    },
    requiredProperties: ["name", "region", "size", "image"],
    updateMethod: "PATCH",
  });

  await assertSnapshot(
    t,
    generateDigitalOceanExtensionModel({
      resource,
      extensionName: "@swamp/digitalocean",
      version: "2026.01.01.1",
    }),
  );
});

// ---------------------------------------------------------------------------
// Snapshot: resource with actions
// ---------------------------------------------------------------------------

Deno.test("generateDigitalOceanExtensionModel - resource with actions", async (t) => {
  const resource = makeResource({
    displayName: "Droplet",
    modelSlug: "droplet",
    endpoint: "/v2/droplets",
    identifyingField: "id",
    idParam: "droplet_id",
    createProperties: {
      name: { type: "string", description: "The hostname for the Droplet" },
    },
    resourceProperties: {
      id: intProp,
      name: stringProp,
      status: stringProp,
    },
    requiredProperties: ["name"],
    actions: [
      {
        actionType: "power_on",
        properties: {},
        requiredProperties: [],
        nestedParams: false,
      },
      {
        actionType: "resize",
        properties: {
          size: {
            type: "string",
            description: "The slug of the target size",
          },
          disk: {
            type: "boolean",
            description: "Whether to also resize the disk",
          },
        },
        requiredProperties: ["size"],
        nestedParams: false,
      },
    ],
  });

  await assertSnapshot(
    t,
    generateDigitalOceanExtensionModel({
      resource,
      extensionName: "@swamp/digitalocean",
      version: "2026.01.01.1",
    }),
  );
});

// ---------------------------------------------------------------------------
// Snapshot: resource with sub-resource methods
// ---------------------------------------------------------------------------

Deno.test("generateDigitalOceanExtensionModel - resource with sub-resource methods", async (t) => {
  const resource = makeResource({
    displayName: "Database Cluster",
    modelSlug: "database-cluster",
    endpoint: "/v2/databases",
    identifyingField: "id",
    idParam: "database_cluster_uuid",
    createProperties: {
      name: {
        type: "string",
        description: "A unique name for the database cluster",
      },
      engine: { type: "string", description: "The database engine" },
    },
    resourceProperties: {
      id: stringProp,
      name: stringProp,
      engine: stringProp,
      status: stringProp,
    },
    requiredProperties: ["name", "engine"],
    subResourceMethods: [
      {
        methodName: "resize",
        subPath: "resize",
        httpMethod: "PUT",
        properties: {
          size: {
            type: "string",
            description: "The slug of the new size",
          },
          num_nodes: {
            type: "integer",
            description: "The number of nodes",
          },
        },
        requiredProperties: ["size", "num_nodes"],
      },
      {
        methodName: "migrate",
        subPath: "migrate",
        httpMethod: "PUT",
        properties: {
          region: {
            type: "string",
            description: "Target region slug",
          },
        },
        requiredProperties: ["region"],
      },
    ],
  });

  await assertSnapshot(
    t,
    generateDigitalOceanExtensionModel({
      resource,
      extensionName: "@swamp/digitalocean",
      version: "2026.01.01.1",
    }),
  );
});

// ---------------------------------------------------------------------------
// Snapshot: synthetic name
// ---------------------------------------------------------------------------

Deno.test("generateDigitalOceanExtensionModel - synthetic name", async (t) => {
  const resource = makeResource({
    displayName: "Reserved IP",
    modelSlug: "reserved-ip",
    endpoint: "/v2/reserved_ips",
    identifyingField: "ip",
    idParam: "reserved_ip",
    createProperties: {
      region: {
        type: "string",
        description: "The slug of the region",
        isRegion: true,
      },
      droplet_id: {
        type: "integer",
        description: "The Droplet ID to assign the IP to",
      },
    },
    resourceProperties: {
      ip: stringProp,
      region: {
        type: "object",
        properties: { slug: stringProp, name: stringProp },
      },
      droplet: {
        type: "object",
        nullable: true,
        properties: { id: intProp, name: stringProp },
      },
    },
    requiredProperties: [],
  });

  await assertSnapshot(
    t,
    generateDigitalOceanExtensionModel({
      resource,
      extensionName: "@swamp/digitalocean",
      version: "2026.01.01.1",
    }),
  );
});

// ---------------------------------------------------------------------------
// Snapshot: resource with readiness polling
// ---------------------------------------------------------------------------

Deno.test("generateDigitalOceanExtensionModel - resource with readiness polling", async (t) => {
  const resource = makeResource({
    displayName: "Droplet",
    modelSlug: "droplet",
    endpoint: "/v2/droplets",
    identifyingField: "id",
    idParam: "droplet_id",
    createProperties: {
      name: { type: "string", description: "The hostname for the Droplet" },
      region: {
        type: "string",
        description: "The slug of the region",
        isRegion: true,
      },
      size: { type: "string", description: "The slug of the Droplet size" },
    },
    updateProperties: {
      name: {
        type: "string",
        description: "The new hostname",
      },
    },
    resourceProperties: {
      id: intProp,
      name: stringProp,
      status: stringProp,
    },
    requiredProperties: ["name", "region", "size"],
    updateMethod: "PATCH",
    readiness: {
      statusField: "status",
      readyValues: ["active"],
      failedValues: ["errored"],
    },
  });

  await assertSnapshot(
    t,
    generateDigitalOceanExtensionModel({
      resource,
      extensionName: "@swamp/digitalocean",
      version: "2026.01.01.1",
    }),
  );
});

// ---------------------------------------------------------------------------
// Snapshot: resource with checkExists (direct lookup)
// ---------------------------------------------------------------------------

Deno.test("generateDigitalOceanExtensionModel - checkExists direct lookup", async (t) => {
  const resource = makeResource({
    displayName: "Domain",
    modelSlug: "domain",
    endpoint: "/v2/domains",
    identifyingField: "name",
    idParam: "domain_name",
    createProperties: {
      name: { type: "string", description: "The domain name to add" },
      ip_address: {
        type: "string",
        description: "Optional IP for an A record",
      },
    },
    resourceProperties: {
      name: stringProp,
      ttl: intProp,
      zone_file: stringProp,
    },
    requiredProperties: ["name"],
  });

  await assertSnapshot(
    t,
    generateDigitalOceanExtensionModel({
      resource,
      extensionName: "@swamp/digitalocean",
      version: "2026.01.01.1",
    }),
  );
});

// ---------------------------------------------------------------------------
// Snapshot: resource with checkExists (list filter)
// ---------------------------------------------------------------------------

Deno.test("generateDigitalOceanExtensionModel - checkExists list filter", async (t) => {
  const resource = makeResource({
    displayName: "Firewall",
    modelSlug: "firewall",
    endpoint: "/v2/firewalls",
    identifyingField: "id",
    idParam: "firewall_id",
    createProperties: {
      name: { type: "string", description: "A human-friendly name" },
      inbound_rules: {
        type: "array",
        description: "Inbound rules",
        items: {
          type: "object",
          properties: {
            protocol: { type: "string" },
            ports: { type: "string" },
          },
        },
      },
    },
    resourceProperties: {
      id: stringProp,
      name: stringProp,
      status: stringProp,
      inbound_rules: {
        type: "array",
        items: {
          type: "object",
          properties: {
            protocol: stringProp,
            ports: stringProp,
          },
        },
      },
    },
    requiredProperties: ["name"],
  });

  await assertSnapshot(
    t,
    generateDigitalOceanExtensionModel({
      resource,
      extensionName: "@swamp/digitalocean",
      version: "2026.01.01.1",
    }),
  );
});

// ---------------------------------------------------------------------------
// Snapshot: resource with discovery endpoint
// ---------------------------------------------------------------------------

Deno.test("generateDigitalOceanExtensionModel - discovery endpoint", async (t) => {
  const resource = makeResource({
    displayName: "Kubernetes Cluster",
    modelSlug: "kubernetes-cluster",
    endpoint: "/v2/kubernetes/clusters",
    identifyingField: "id",
    idParam: "kubernetes_cluster_id",
    createProperties: {
      name: {
        type: "string",
        description: "A human-friendly name for the cluster",
      },
      region: {
        type: "string",
        description: "The slug of the region",
        isRegion: true,
      },
      version: { type: "string", description: "The Kubernetes version" },
    },
    resourceProperties: {
      id: stringProp,
      name: stringProp,
      region: stringProp,
      status: {
        type: "object",
        properties: { state: stringProp, message: stringProp },
      },
    },
    requiredProperties: ["name", "region", "version"],
    discoveryEndpoint: "/v2/kubernetes/options",
  });

  await assertSnapshot(
    t,
    generateDigitalOceanExtensionModel({
      resource,
      extensionName: "@swamp/digitalocean",
      version: "2026.01.01.1",
    }),
  );
});

// ---------------------------------------------------------------------------
// Snapshot: no update/delete handlers
// ---------------------------------------------------------------------------

Deno.test("generateDigitalOceanExtensionModel - no update, no delete", async (t) => {
  const resource = makeResource({
    displayName: "Snapshot",
    modelSlug: "snapshot",
    endpoint: "/v2/snapshots",
    identifyingField: "id",
    idParam: "snapshot_id",
    handlers: { create: true, read: true, update: false, delete: false },
    updateMethod: null,
    createProperties: {
      resource_id: {
        type: "string",
        description: "The ID of the resource to snapshot",
      },
      name: { type: "string", description: "A name for the snapshot" },
    },
    resourceProperties: {
      id: stringProp,
      name: stringProp,
      resource_id: stringProp,
      resource_type: stringProp,
      created_at: stringProp,
    },
    requiredProperties: ["resource_id", "name"],
  });

  await assertSnapshot(
    t,
    generateDigitalOceanExtensionModel({
      resource,
      extensionName: "@swamp/digitalocean",
      version: "2026.01.01.1",
    }),
  );
});

// ---------------------------------------------------------------------------
// Snapshot: child resource with forceSyntheticName (domain records pattern)
// ---------------------------------------------------------------------------

Deno.test("generateDigitalOceanExtensionModel - child resource with forceSyntheticName", async (t) => {
  const resource = makeResource({
    displayName: "Domain Record",
    modelSlug: "domain-record",
    endpoint: "/v2/domains/{domain_name}/records",
    identifyingField: "id",
    idParam: "domain_record_id",
    parentParam: "domain_name",

    forceSyntheticName: true,
    createProperties: {
      type: { type: "string", description: "The DNS record type" },
      name: { type: "string", description: "The hostname" },
      data: { type: "string", description: "The record data" },
    },
    updateProperties: {
      type: { type: "string", description: "The DNS record type" },
      name: { type: "string", description: "The hostname" },
      data: { type: "string", description: "The record data" },
    },
    resourceProperties: {
      id: intProp,
      type: stringProp,
      name: stringProp,
      data: stringProp,
      ttl: intProp,
    },
    requiredProperties: ["type"],
    updateMethod: "PATCH",
  });

  await assertSnapshot(
    t,
    generateDigitalOceanExtensionModel({
      resource,
      extensionName: "@swamp/digitalocean",
      version: "2026.01.01.1",
    }),
  );
});

// ---------------------------------------------------------------------------
// Snapshot: child resource with natural name (database pool pattern)
// ---------------------------------------------------------------------------

Deno.test("generateDigitalOceanExtensionModel - child resource with natural name", async (t) => {
  const resource = makeResource({
    displayName: "Database Pool",
    modelSlug: "database-pool",
    endpoint: "/v2/databases/{database_cluster_uuid}/pools",
    identifyingField: "name",
    idParam: "pool_name",
    parentParam: "database_cluster_uuid",

    createProperties: {
      name: { type: "string", description: "The pool name" },
      db: { type: "string", description: "The database name" },
      size: { type: "integer", description: "The pool size" },
      mode: { type: "string", description: "The pool mode" },
    },
    updateProperties: {
      db: { type: "string", description: "The database name" },
      size: { type: "integer", description: "The pool size" },
      mode: { type: "string", description: "The pool mode" },
    },
    resourceProperties: {
      name: stringProp,
      db: stringProp,
      size: intProp,
      mode: stringProp,
    },
    requiredProperties: ["name", "db", "size", "mode"],
    updateMethod: "PUT",
  });

  await assertSnapshot(
    t,
    generateDigitalOceanExtensionModel({
      resource,
      extensionName: "@swamp/digitalocean",
      version: "2026.01.01.1",
    }),
  );
});

// ---------------------------------------------------------------------------
// Snapshot: with upgrades block
// ---------------------------------------------------------------------------

Deno.test("generateDigitalOceanExtensionModel - with upgrades block", async (t) => {
  const resource = makeResource({
    displayName: "Volume",
    modelSlug: "volume",
    endpoint: "/v2/volumes",
    identifyingField: "id",
    idParam: "volume_id",
    createProperties: {
      name: { type: "string", description: "A human-friendly name" },
      size_gigabytes: {
        type: "integer",
        description: "The size in GiB",
        minimum: 1,
        maximum: 16384,
      },
      region: {
        type: "string",
        description: "The slug of the region",
        isRegion: true,
      },
    },
    updateProperties: {
      name: { type: "string", description: "New name for the volume" },
    },
    resourceProperties: {
      id: stringProp,
      name: stringProp,
      size_gigabytes: intProp,
      region: {
        type: "object",
        properties: { slug: stringProp, name: stringProp },
      },
    },
    requiredProperties: ["name", "size_gigabytes", "region"],
    updateMethod: "PATCH",
  });

  await assertSnapshot(
    t,
    generateDigitalOceanExtensionModel({
      resource,
      extensionName: "@swamp/digitalocean",
      version: "2026.01.02.1",
      upgradesBlock:
        `  upgrades: [\n    {\n      toVersion: "2026.01.02.1",\n      description: "Removed: description field",\n      upgradeAttributes: (old: Record<string, unknown>) => {\n        const { description: _desc, ...rest } = old;\n        return rest;\n      },\n    },\n  ],`,
    }),
  );
});

// ---------------------------------------------------------------------------
// Token global argument (vault-wireable auth) — assertion-based tests
// ---------------------------------------------------------------------------

/** A representative resource exercising every method that threads the token. */
function tokenResource(): DigitalOceanResource {
  return makeResource({
    displayName: "Droplet",
    modelSlug: "droplet",
    endpoint: "/v2/droplets",
    identifyingField: "name",
    idParam: "droplet_name",
    createProperties: {
      name: { type: "string", description: "The hostname for the Droplet" },
    },
    updateProperties: {
      name: { type: "string", description: "The new hostname" },
    },
    resourceProperties: { id: intProp, name: stringProp, status: stringProp },
    requiredProperties: ["name"],
    updateMethod: "PATCH",
  });
}

Deno.test("token arg - injected into GlobalArgsSchema with sensitive meta", () => {
  const code = generateDigitalOceanExtensionModel({
    resource: tokenResource(),
    extensionName: "@swamp/digitalocean",
    version: "2026.01.01.1",
  });
  // GlobalArgsSchema carries the sensitive, optional token arg, described as a
  // vault-wireable override of DO_API_TOKEN.
  assertStringIncludes(
    code,
    'token: z.string().meta({ sensitive: true }).describe("DigitalOcean API token; overrides the DO_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.").optional(),',
  );
  // InputsSchema mirrors it (all-optional form).
  assertStringIncludes(
    code,
    "token: z.string().meta({ sensitive: true }).optional(),",
  );
});

Deno.test("token arg - threaded into create/get/update/delete/sync call sites", () => {
  const code = generateDigitalOceanExtensionModel({
    resource: tokenResource(),
    extensionName: "@swamp/digitalocean",
    version: "2026.01.01.1",
  });
  // create
  assertStringIncludes(
    code,
    'await create("/v2/droplets", body, undefined, g.token)',
  );
  // get (uses context.globalArgs.token because g is conditional there)
  assertStringIncludes(
    code,
    'await read("/v2/droplets", args.name, undefined, context.globalArgs.token)',
  );
  // update (token is the 6th positional arg, after method + queryParams)
  assertStringIncludes(
    code,
    'body, "PATCH", undefined, g.token)',
  );
  // delete
  assertStringIncludes(
    code,
    'await remove("/v2/droplets", args.name, undefined, context.globalArgs.token)',
  );
  // sync
  assertStringIncludes(code, "const storedId = existing.name ?? existing.id;");
  assertStringIncludes(
    code,
    'await tryRead("/v2/droplets", storedId, undefined, g.token)',
  );
});

Deno.test("token arg - threaded into action methods", () => {
  const resource = makeResource({
    displayName: "Droplet",
    modelSlug: "droplet",
    endpoint: "/v2/droplets",
    createProperties: {
      name: { type: "string", description: "The hostname" },
    },
    resourceProperties: { id: intProp, name: stringProp, status: stringProp },
    requiredProperties: ["name"],
    actions: [
      {
        actionType: "power_on",
        properties: {},
        requiredProperties: [],
        nestedParams: false,
      },
    ],
  });
  const code = generateDigitalOceanExtensionModel({
    resource,
    extensionName: "@swamp/digitalocean",
    version: "2026.01.01.1",
  });
  assertStringIncludes(
    code,
    "args.waitForCompletion ?? true, context.globalArgs.token)",
  );
});

Deno.test("token arg - threaded into sub-resource methods", () => {
  const resource = makeResource({
    displayName: "Database Cluster",
    modelSlug: "database-cluster",
    endpoint: "/v2/databases",
    identifyingField: "id",
    idParam: "database_cluster_uuid",
    createProperties: {
      name: { type: "string", description: "A unique name" },
    },
    resourceProperties: { id: stringProp, name: stringProp },
    requiredProperties: ["name"],
    subResourceMethods: [
      {
        methodName: "resize",
        subPath: "resize",
        httpMethod: "PUT",
        properties: { size: { type: "string", description: "The new size" } },
        requiredProperties: ["size"],
      },
    ],
  });
  const code = generateDigitalOceanExtensionModel({
    resource,
    extensionName: "@swamp/digitalocean",
    version: "2026.01.01.1",
  });
  // subResourceUpdate carries the token as its final positional argument.
  assertStringIncludes(
    code,
    '"resize", body, "PUT", context.globalArgs.token)',
  );
  // The re-read after the sub-resource update also threads the token.
  assertStringIncludes(
    code,
    'await read("/v2/databases", args.id, undefined, context.globalArgs.token)',
  );
});

Deno.test("token arg - collision guard omits the injected arg when a real 'token' property exists", () => {
  const resource = makeResource({
    displayName: "Custom Thing",
    modelSlug: "custom-thing",
    endpoint: "/v2/custom",
    createProperties: {
      name: { type: "string", description: "The name" },
      token: { type: "string", description: "A real API token field" },
    },
    resourceProperties: { id: intProp, name: stringProp },
    requiredProperties: ["name"],
  });
  const code = generateDigitalOceanExtensionModel({
    resource,
    extensionName: "@swamp/digitalocean",
    version: "2026.01.01.1",
  });
  // The injected token arg must NOT appear — the real schema property owns the
  // `token` name. Exactly one `token:` field in GlobalArgsSchema, and it is
  // marked sensitive by the secret-name rule.
  assertEquals(code.includes("DigitalOcean API token"), false);
  const globalArgs = code.slice(
    code.indexOf("const GlobalArgsSchema = z.object({"),
    code.indexOf("const ResourceSchema"),
  );
  const tokenLines = globalArgs.split("\n").filter((l) =>
    /^\s{2}token:/.test(l)
  );
  assertEquals(tokenLines.length, 1);
  assertStringIncludes(tokenLines[0], ".meta({ sensitive: true })");
});

// ---------------------------------------------------------------------------
// Secret-named spec fields are marked sensitive
// ---------------------------------------------------------------------------

const SENSITIVE = ".meta({ sensitive: true })";

function secretResource(): DigitalOceanResource {
  const webhook: DigitalOceanProperty = {
    type: "object",
    properties: {
      url: stringProp,
      basic_auth: {
        type: "object",
        properties: { user: stringProp, password: stringProp },
      },
      bearer_token: { type: "object", properties: { token: stringProp } },
    },
  };
  const destinations: DigitalOceanProperty = {
    type: "array",
    items: {
      type: "object",
      properties: { name: stringProp, datadog_api_key: stringProp },
    },
  };
  return makeResource({
    displayName: "Secret Thing",
    modelSlug: "secret-thing",
    endpoint: "/v2/secret_things",
    createProperties: {
      name: { type: "string", description: "The name" },
      private_key: { type: "string", description: "PEM private key" },
      webhook,
      destinations,
      api_key: { type: "object" },
      credential_id: stringProp,
      oauth_token_url: stringProp,
      access_tokens: { type: "object" },
      public_key: stringProp,
      token: { type: "string", enum: ["a", "b"] },
    },
    resourceProperties: {
      id: stringProp,
      name: stringProp,
      password: stringProp,
      webhook,
      destinations,
      credential_id: stringProp,
    },
    requiredProperties: ["name", "private_key"],
    actions: [{
      actionType: "rotate",
      properties: { secret: stringProp, reason: stringProp },
      requiredProperties: ["secret"],
      nestedParams: false,
    }],
    subResourceMethods: [{
      methodName: "update_auth",
      subPath: "auth",
      httpMethod: "PUT",
      properties: { password: stringProp, mode: stringProp },
      requiredProperties: [],
    }],
  });
}

function generateSecretThing(): string {
  return generateDigitalOceanExtensionModel({
    resource: secretResource(),
    extensionName: "@swamp/digitalocean",
    version: "2026.01.01.1",
  });
}

function schemaBlock(code: string, start: string, end: string): string {
  return code.slice(code.indexOf(start), code.indexOf(end));
}

Deno.test("sensitive fields - marked in GlobalArgsSchema at every depth", () => {
  const globalArgs = schemaBlock(
    generateSecretThing(),
    "const GlobalArgsSchema = z.object({",
    "const ResourceSchema",
  );
  assertStringIncludes(
    globalArgs,
    `private_key: z.string()${SENSITIVE}.describe("PEM private key"),`,
  );
  // Nested in an object, and in an object inside an array.
  assertStringIncludes(globalArgs, `password: z.string()${SENSITIVE}`);
  assertStringIncludes(globalArgs, `token: z.string()${SENSITIVE}`);
  assertStringIncludes(globalArgs, `datadog_api_key: z.string()${SENSITIVE}`);
  // A property-less object is emitted as a record and still holds a secret.
  assertStringIncludes(
    globalArgs,
    `api_key: z.record(z.string(), z.unknown())${SENSITIVE}`,
  );
});

Deno.test("sensitive fields - names that only contain a secret word are not marked", () => {
  const code = generateSecretThing();
  for (
    const name of [
      "credential_id",
      "oauth_token_url",
      "access_tokens",
      "public_key",
      "bearer_token",
      "user",
    ]
  ) {
    const fieldLines = code.split("\n").filter((l) =>
      new RegExp(`^\\s+${name}: `).test(l)
    );
    assertEquals(fieldLines.length > 0, true, `${name} is emitted`);
    for (const line of fieldLines) {
      assertEquals(line.includes("sensitive"), false, line);
    }
  }
  // An enum cannot hold a secret, whatever it is called.
  assertStringIncludes(code, `token: z.enum(["a", "b"]).optional()`);
});

Deno.test("sensitive fields - marked in ResourceSchema and InputsSchema", () => {
  const code = generateSecretThing();
  const resource = schemaBlock(
    code,
    "const ResourceSchema = z.object({",
    "type ResourceData",
  );
  assertStringIncludes(
    resource,
    `  password: z.string()${SENSITIVE}.optional()`,
  );
  assertStringIncludes(
    resource,
    `    password: z.string()${SENSITIVE}.optional()`,
  );
  assertStringIncludes(resource, `datadog_api_key: z.string()${SENSITIVE}`);

  const inputs = schemaBlock(
    code,
    "const InputsSchema = z.object({",
    "export const model",
  );
  assertStringIncludes(
    inputs,
    `private_key: z.string()${SENSITIVE}.optional()`,
  );
  assertStringIncludes(inputs, `datadog_api_key: z.string()${SENSITIVE}`);
});

Deno.test("sensitive fields - marked in action and sub-resource arguments", () => {
  const code = generateSecretThing();
  const action = schemaBlock(code, "    rotate: {", "    update_auth: {");
  assertStringIncludes(action, `secret: z.string()${SENSITIVE}`);
  assertEquals(action.includes(`reason: z.string()${SENSITIVE}`), false);

  const subResource = code.slice(code.indexOf("    update_auth: {"));
  assertStringIncludes(
    subResource,
    `password: z.string()${SENSITIVE}.optional()`,
  );
  assertEquals(subResource.includes(`mode: z.string()${SENSITIVE}`), false);
});

Deno.test("sensitive fields - the identifying field is never marked in ResourceSchema", () => {
  const code = generateDigitalOceanExtensionModel({
    resource: makeResource({
      displayName: "Keyed Secret",
      modelSlug: "keyed-secret",
      endpoint: "/v2/keyed_secrets",
      identifyingField: "secret",
      createProperties: { name: stringProp },
      resourceProperties: { secret: stringProp, password: stringProp },
    }),
    extensionName: "@swamp/digitalocean",
    version: "2026.01.01.1",
  });
  const resource = schemaBlock(
    code,
    "const ResourceSchema = z.object({",
    "type ResourceData",
  );
  assertStringIncludes(resource, "  secret: z.string(),");
  assertStringIncludes(resource, `  password: z.string()${SENSITIVE}`);
});

Deno.test("sensitive fields - the identifying field is not marked", () => {
  // The Spaces key identifier is the public access key ID `access_key`, whose
  // name matches the secret pattern.
  const code = generateDigitalOceanExtensionModel({
    resource: makeResource({
      displayName: "Space Key",
      modelSlug: "space-key",
      endpoint: "/v2/spaces/keys",
      identifyingField: "access_key",
      createProperties: { name: stringProp },
      resourceProperties: { name: stringProp, access_key: stringProp },
    }),
    extensionName: "@swamp/digitalocean",
    version: "2026.01.01.1",
  });
  const resource = schemaBlock(
    code,
    "const ResourceSchema = z.object({",
    "type ResourceData",
  );
  assertStringIncludes(resource, "  access_key: z.string(),");
});

// ---------------------------------------------------------------------------
// PUT update fills unset fields from the live resource
// ---------------------------------------------------------------------------

function loadBalancerResource(
  updateMethod: "PUT" | "PATCH",
): DigitalOceanResource {
  return makeResource({
    displayName: "Load Balancer",
    modelSlug: "load-balancer",
    endpoint: "/v2/load_balancers",
    createProperties: { name: stringProp, region: stringProp },
    updateProperties: {
      name: stringProp,
      region: stringProp,
      size_unit: intProp,
      tag: stringProp,
    },
    // The response nests region as an object and has no tag.
    resourceProperties: {
      id: stringProp,
      name: stringProp,
      region: { type: "object", properties: { slug: stringProp } },
      size_unit: { type: "number" },
    },
    updateMethod,
  });
}

function updateBlock(code: string): string {
  return code.slice(
    code.indexOf("    update: {"),
    code.indexOf("    delete: {"),
  );
}

Deno.test("generateDigitalOceanExtensionModel - PUT update fills same-shaped unset fields from the live resource", () => {
  const update = updateBlock(generateDigitalOceanExtensionModel({
    resource: loadBalancerResource("PUT"),
    extensionName: "@swamp/digitalocean",
    version: "2026.01.01.1",
  }));
  // region (object in the response) and tag (not in the response) are not
  // filled; echoing them would send the wrong shape or nothing useful.
  assertStringIncludes(
    update,
    `const unset = ["name","size_unit"].filter((k) => body[k] === undefined);`,
  );
  assertStringIncludes(
    update,
    `const live = await read("/v2/load_balancers", storedId, undefined, g.token);`,
  );
  assertEquals(update.includes("= existing["), false);
  assertEquals(
    update.indexOf("const live") < update.indexOf("await update("),
    true,
  );
});

Deno.test("generateDigitalOceanExtensionModel - PATCH update does not read the live resource", () => {
  const update = updateBlock(generateDigitalOceanExtensionModel({
    resource: loadBalancerResource("PATCH"),
    extensionName: "@swamp/digitalocean",
    version: "2026.01.01.1",
  }));
  assertEquals(update.includes("const live"), false);
});

// ---------------------------------------------------------------------------
// Identifier handling (swamp-club #2834)
// ---------------------------------------------------------------------------

Deno.test("checkExists - uuid-identified resource with a natural name uses list filter", () => {
  // Reading a uuid-identified resource by its name would request
  // /v2/byoip_prefixes/<name>; only list-and-filter can find it by name.
  const code = generateDigitalOceanExtensionModel({
    resource: makeResource({
      displayName: "BYOIP Prefix",
      modelSlug: "byoip-prefix",
      endpoint: "/v2/byoip_prefixes",
      identifyingField: "uuid",
      idParam: "byoip_prefix_uuid",
      createProperties: { name: stringProp },
      resourceProperties: { uuid: stringProp, name: stringProp },
    }),
    extensionName: "@swamp/digitalocean",
    version: "2026.01.01.1",
  });
  assertStringIncludes(
    code,
    'await tryFindByField("/v2/byoip_prefixes", "name"',
  );
  assertEquals(
    code.includes('await tryRead("/v2/byoip_prefixes", g.name'),
    false,
  );
});

Deno.test("idArgField - keeps the get/delete argument name stable", () => {
  const code = generateDigitalOceanExtensionModel({
    resource: makeResource({
      displayName: "BYOIP Prefix",
      modelSlug: "byoip-prefix",
      endpoint: "/v2/byoip_prefixes",
      identifyingField: "uuid",
      idArgField: "id",
      idParam: "byoip_prefix_uuid",
      resourceProperties: { uuid: stringProp },
    }),
    extensionName: "@swamp/digitalocean",
    version: "2026.01.01.1",
  });
  assertStringIncludes(code, "execute: async (args: { id: string }");
  assertEquals(code.includes("args: { uuid"), false);
  // delete records the identifier under its own field as well
  assertStringIncludes(code, "uuid: args.id,");
  assertStringIncludes(code, "const storedId = existing.uuid ?? existing.id;");
});

Deno.test("handlers.read - no get or sync without a GET-by-id endpoint", () => {
  const code = generateDigitalOceanExtensionModel({
    resource: makeResource({
      displayName: "Action Gateway Session",
      modelSlug: "action-gateway-session",
      endpoint: "/v2/action-gateway/sessions",
      identifyingField: "sessionUrn",
      idParam: "session_urn",
      handlers: { create: true, read: false, update: false, delete: true },
      updateMethod: null,
      resourceProperties: { sessionUrn: stringProp },
    }),
    extensionName: "@swamp/digitalocean",
    version: "2026.01.01.1",
  });
  assertEquals(code.includes("    get: {"), false);
  assertEquals(code.includes("    sync: {"), false);
  assertStringIncludes(code, "    delete: {");
  assertStringIncludes(
    code,
    'import { create, remove } from "./_lib/digitalocean.ts";',
  );
});

Deno.test("identifierFromArgs - get persists the argument and sync carries it over", () => {
  const code = generateDigitalOceanExtensionModel({
    resource: makeResource({
      displayName: "Monitoring Sink",
      modelSlug: "monitoring-sink",
      endpoint: "/v2/monitoring/sinks",
      identifyingField: "sink_uuid",
      idParam: "sink_uuid",
      identifierFromArgs: true,
      handlers: { create: true, read: true, update: false, delete: true },
      updateMethod: null,
      resourceProperties: { resources: stringProp },
    }),
    extensionName: "@swamp/digitalocean",
    version: "2026.01.01.1",
  });
  assertStringIncludes(code, "  sink_uuid: z.string().optional(),");
  assertStringIncludes(
    code,
    "if (result.sink_uuid === undefined) result.sink_uuid = String(args.id);",
  );
  assertStringIncludes(
    code,
    "if (result.sink_uuid === undefined) result.sink_uuid = String(storedId);",
  );
  assertStringIncludes(
    code,
    "has no sink_uuid; run get with the resource ID first",
  );
});

Deno.test("createEnvelope - create keeps siblings; sync does not carry them over", () => {
  const code = generateDigitalOceanExtensionModel({
    resource: makeResource({
      displayName: "Action Gateway Connection",
      modelSlug: "action-gateway-connection",
      endpoint: "/v2/action-gateway/connections",
      resourceProperties: { id: stringProp },
      updateMethod: null,
      handlers: { create: true, read: true, update: false, delete: true },
      createEnvelope: {
        key: "connection",
        siblings: {
          authorization: {
            type: "object",
            properties: { connect_url: stringProp },
          },
        },
      },
    }),
    extensionName: "@swamp/digitalocean",
    version: "2026.01.01.1",
  });
  assertStringIncludes(
    code,
    'await createEnveloped("/v2/action-gateway/connections", body, "connection", ["authorization"], g.token)',
  );
  assertStringIncludes(code, "  authorization: z.object({");
  // Siblings are a create-time snapshot; sync replaces them with live state.
  assertEquals(code.includes("existing.authorization"), false);
  assertEquals(code.includes('for (const k of ["authorization"])'), false);
  assertEquals(code.includes("import { create,"), false);
});

Deno.test("generateDigitalOceanExtensionModel - PUT update without a GET-by-id does not live-fill", () => {
  const code = generateDigitalOceanExtensionModel({
    resource: {
      ...loadBalancerResource("PUT"),
      handlers: { create: true, read: false, update: true, delete: true },
    },
    extensionName: "@swamp/digitalocean",
    version: "2026.01.01.1",
  });
  assertEquals(code.includes("const live"), false);
  assertEquals(code.includes("await read("), false);
});
