import { assertSnapshot } from "@std/testing/snapshot";
import { assert, assertEquals, assertStringIncludes } from "@std/assert";
import { generateCloudflareExtensionModel } from "./extensionModelGenerator.ts";
import type { CloudflareProperty, CloudflareResource } from "./pipeline.ts";

function makeResource(
  overrides: Partial<CloudflareResource> & {
    resourcePath: string;
    service: string;
    modelSlug: string;
    fileName: string;
  },
): CloudflareResource {
  return {
    displayName: overrides.modelSlug.replace(/-/g, " ").replace(
      /\b\w/g,
      (c) => c.toUpperCase(),
    ),
    scope: "account",
    basePath: `/accounts/{account_id}/${overrides.resourcePath}`,
    idPath:
      `/accounts/{account_id}/${overrides.resourcePath}/{${overrides.modelSlug}_id}`,
    createProperties: {},
    updateProperties: {},
    resourceProperties: {},
    createRequiredProperties: [],
    handlers: { create: true, read: true, update: true, delete: true },
    updateMethod: "PATCH",
    identifyingField: "id",
    idParam: `${overrides.modelSlug}_id`,
    namingField: "name",
    syntheticName: false,
    createOnlyProperties: new Set<string>(),
    paginationStyle: "page",
    listEndpointSuffix: "",
    ...overrides,
  };
}

const stringProp: CloudflareProperty = { type: "string" };
const numberProp: CloudflareProperty = { type: "number" };

// ---------------------------------------------------------------------------
// Snapshot: account-scoped resource with all CRUD handlers
// ---------------------------------------------------------------------------

Deno.test("generateCloudflareExtensionModel - account-scoped, all handlers", async (t) => {
  const resource = makeResource({
    resourcePath: "d1/database",
    service: "d1",
    modelSlug: "database",
    fileName: "database.ts",
    displayName: "Database",
    scope: "account",
    basePath: "/accounts/{account_id}/d1/database",
    idPath: "/accounts/{account_id}/d1/database/{database_id}",
    idParam: "database_id",
    createProperties: {
      name: { type: "string", description: "Database name" },
      primary_location_hint: {
        type: "string",
        description: "Location hint",
        enum: ["wnam", "enam", "weur", "eeur", "apac"],
      },
    },
    updateProperties: {},
    resourceProperties: {
      id: stringProp,
      name: stringProp,
      version: stringProp,
      num_tables: numberProp,
      file_size: numberProp,
    },
    createRequiredProperties: ["name"],
    handlers: { create: true, read: true, update: false, delete: true },
  });

  await assertSnapshot(
    t,
    generateCloudflareExtensionModel({
      resource,
      extensionName: "@swamp/cloudflare/d1",
      version: "2026.01.01.1",
    }),
  );
});

// ---------------------------------------------------------------------------
// Snapshot: zone-scoped resource with PATCH update
// ---------------------------------------------------------------------------

Deno.test("generateCloudflareExtensionModel - zone-scoped, PATCH update", async (t) => {
  const resource = makeResource({
    resourcePath: "dns_records",
    service: "dns",
    modelSlug: "dns-records",
    fileName: "dns_records.ts",
    displayName: "DNS Record",
    scope: "zone",
    basePath: "/zones/{zone_id}/dns_records",
    idPath: "/zones/{zone_id}/dns_records/{dns_record_id}",
    idParam: "dns_record_id",
    createProperties: {
      name: {
        type: "string",
        description: "Record name",
        minLength: 1,
        maxLength: 255,
      },
      type: {
        type: "string",
        description: "Record type",
        enum: ["A", "AAAA", "CNAME", "MX", "TXT"],
      },
      content: { type: "string", description: "Record content" },
      ttl: { type: "integer", description: "TTL", minimum: 30, maximum: 86400 },
      proxied: { type: "boolean", description: "Cloudflare proxy" },
    },
    updateProperties: {
      name: { type: "string", description: "Record name" },
      content: { type: "string", description: "Record content" },
      ttl: { type: "integer", description: "TTL" },
      proxied: { type: "boolean", description: "Cloudflare proxy" },
    },
    resourceProperties: {
      id: stringProp,
      name: stringProp,
      type: stringProp,
      content: stringProp,
      ttl: numberProp,
      proxied: { type: "boolean" },
    },
    createRequiredProperties: ["name", "type", "content"],
    updateMethod: "PATCH",
  });

  await assertSnapshot(
    t,
    generateCloudflareExtensionModel({
      resource,
      extensionName: "@swamp/cloudflare/dns",
      version: "2026.01.01.1",
    }),
  );
});

// ---------------------------------------------------------------------------
// Snapshot: dual-scoped resource (account + zone)
// ---------------------------------------------------------------------------

Deno.test("generateCloudflareExtensionModel - dual-scoped resource", async (t) => {
  const resource = makeResource({
    resourcePath: "rulesets",
    service: "rulesets",
    modelSlug: "rulesets",
    fileName: "rulesets.ts",
    displayName: "Ruleset",
    scope: "both",
    basePath: "/accounts/{account_id}/rulesets",
    idPath: "/accounts/{account_id}/rulesets/{ruleset_id}",
    idParam: "ruleset_id",
    createProperties: {
      name: { type: "string", description: "Ruleset name" },
      kind: {
        type: "string",
        description: "Kind",
        enum: ["root", "zone", "managed"],
      },
      phase: { type: "string", description: "Phase" },
    },
    updateProperties: {
      name: { type: "string", description: "Ruleset name" },
    },
    resourceProperties: {
      id: stringProp,
      name: stringProp,
      kind: stringProp,
      phase: stringProp,
      version: stringProp,
    },
    createRequiredProperties: ["name", "kind", "phase"],
    updateMethod: "PUT",
  });

  await assertSnapshot(
    t,
    generateCloudflareExtensionModel({
      resource,
      extensionName: "@swamp/cloudflare/rulesets",
      version: "2026.01.01.1",
    }),
  );
});

// ---------------------------------------------------------------------------
// Snapshot: synthetic name (no natural naming field)
// ---------------------------------------------------------------------------

Deno.test("generateCloudflareExtensionModel - synthetic name", async (t) => {
  const resource = makeResource({
    resourcePath: "addressing/address_maps",
    service: "addressing",
    modelSlug: "address-maps",
    fileName: "address_maps.ts",
    displayName: "Address Map",
    scope: "account",
    basePath: "/accounts/{account_id}/addressing/address_maps",
    idPath: "/accounts/{account_id}/addressing/address_maps/{address_map_id}",
    idParam: "address_map_id",
    createProperties: {
      enabled: {
        type: "boolean",
        description: "Whether the address map is enabled",
      },
    },
    updateProperties: {
      enabled: {
        type: "boolean",
        description: "Whether the address map is enabled",
      },
    },
    resourceProperties: {
      id: stringProp,
      enabled: { type: "boolean" },
      created_at: stringProp,
    },
    createRequiredProperties: [],
    namingField: "name",
    syntheticName: true,
  });

  await assertSnapshot(
    t,
    generateCloudflareExtensionModel({
      resource,
      extensionName: "@swamp/cloudflare/addressing",
      version: "2026.01.01.1",
    }),
  );
});

// ---------------------------------------------------------------------------
// Snapshot: with upgrades block
// ---------------------------------------------------------------------------

Deno.test("generateCloudflareExtensionModel - with upgrades block", async (t) => {
  const resource = makeResource({
    resourcePath: "workers/scripts",
    service: "workers",
    modelSlug: "scripts",
    fileName: "scripts.ts",
    displayName: "Worker Script",
    scope: "account",
    basePath: "/accounts/{account_id}/workers/scripts",
    idPath: "/accounts/{account_id}/workers/scripts/{script_name}",
    idParam: "script_name",
    identifyingField: "name",
    createProperties: {
      name: { type: "string", description: "Script name" },
    },
    updateProperties: {},
    resourceProperties: {
      id: stringProp,
      name: stringProp,
      created_on: stringProp,
      modified_on: stringProp,
    },
    createRequiredProperties: ["name"],
    handlers: { create: true, read: true, update: false, delete: true },
  });

  await assertSnapshot(
    t,
    generateCloudflareExtensionModel({
      resource,
      extensionName: "@swamp/cloudflare/workers",
      version: "2026.01.02.1",
      upgradesBlock:
        `  upgrades: [\n    {\n      toVersion: "2026.01.02.1",\n      description: "Added: metadata field",\n      upgradeAttributes: (old: Record<string, unknown>) => old,\n    },\n  ],`,
    }),
  );
});

// ---------------------------------------------------------------------------
// Vault-wireable credential arguments
// ---------------------------------------------------------------------------

Deno.test("vault auth - injects all three sensitive args when no collision", () => {
  const resource = makeResource({
    resourcePath: "dns_records",
    service: "dns",
    modelSlug: "dns-records",
    fileName: "dns_records.ts",
    displayName: "DNS Record",
    scope: "zone",
    basePath: "/zones/{zone_id}/dns_records",
    idPath: "/zones/{zone_id}/dns_records/{dns_record_id}",
    idParam: "dns_record_id",
    createProperties: {
      name: { type: "string", description: "Record name" },
      content: { type: "string", description: "Record content" },
    },
    updateProperties: {
      content: { type: "string", description: "Record content" },
    },
    resourceProperties: { id: stringProp, name: stringProp },
    createRequiredProperties: ["name"],
    updateMethod: "PATCH",
  });

  const out = generateCloudflareExtensionModel({
    resource,
    extensionName: "@swamp/cloudflare/dns",
    version: "2026.01.01.1",
  });

  // All three args present in GlobalArgsSchema, each flagged sensitive.
  assertStringIncludes(
    out,
    `apiToken: z.string().meta({ sensitive: true }).describe(`,
  );
  assertStringIncludes(
    out,
    `apiKey: z.string().meta({ sensitive: true }).describe(`,
  );
  assertStringIncludes(
    out,
    `email: z.string().meta({ sensitive: true }).describe(`,
  );
  // Mirrored (without describe) in InputsSchema.
  assertStringIncludes(
    out,
    `apiToken: z.string().meta({ sensitive: true }).optional(),`,
  );
  assertStringIncludes(
    out,
    `apiKey: z.string().meta({ sensitive: true }).optional(),`,
  );
  assertStringIncludes(
    out,
    `email: z.string().meta({ sensitive: true }).optional(),`,
  );

  // Threaded into every CRUD/sync call site.
  const authObj = `{ apiToken: g.apiToken, apiKey: g.apiKey, email: g.email }`;
  assertStringIncludes(out, `await create(endpoint, body, ${authObj})`);
  assertStringIncludes(out, `await read(endpoint, args.id, ${authObj})`);
  assertStringIncludes(
    out,
    `await update(endpoint, existing.id, body, "PATCH", ${authObj})`,
  );
  assertStringIncludes(out, `await remove(endpoint, args.id, ${authObj})`);
  assertStringIncludes(out, `await tryRead(endpoint, existing.id, ${authObj})`);
});

Deno.test("vault auth - pair-guard suppresses apiKey+email when resource owns 'email'", () => {
  // access/users-style resource: the schema itself defines an `email` property,
  // so the legacy key+email pair must NOT be injected, but apiToken still is.
  const resource = makeResource({
    resourcePath: "access/users",
    service: "access",
    modelSlug: "users",
    fileName: "users.ts",
    displayName: "User",
    scope: "account",
    basePath: "/accounts/{account_id}/access/users",
    idPath: "/accounts/{account_id}/access/users/{user_id}",
    idParam: "user_id",
    createProperties: {
      name: { type: "string", description: "User name" },
      email: { type: "string", description: "The email of the user." },
    },
    updateProperties: {},
    resourceProperties: { id: stringProp, email: stringProp },
    createRequiredProperties: ["email"],
    handlers: { create: true, read: true, update: false, delete: true },
  });

  const out = generateCloudflareExtensionModel({
    resource,
    extensionName: "@swamp/cloudflare/access",
    version: "2026.01.01.1",
  });

  // apiToken is still injected as a sensitive arg.
  assertStringIncludes(
    out,
    `apiToken: z.string().meta({ sensitive: true }).describe(`,
  );
  // The legacy pair is suppressed — no sensitive apiKey/email args emitted.
  assert(
    !out.includes(`apiKey: z.string().meta({ sensitive: true })`),
    "apiKey sensitive arg should be suppressed when email collides",
  );
  assert(
    !out.includes(`email: z.string().meta({ sensitive: true })`),
    "email sensitive arg should be suppressed when it collides with a property",
  );
  // The resource's own `email` property is preserved (non-sensitive).
  assertStringIncludes(out, `email: z.string()`);
  // Call sites thread only the apiToken override.
  assertStringIncludes(
    out,
    `await create(endpoint, body, { apiToken: g.apiToken })`,
  );
  assertStringIncludes(
    out,
    `await read(endpoint, args.id, { apiToken: g.apiToken })`,
  );
  assertStringIncludes(
    out,
    `await remove(endpoint, args.id, { apiToken: g.apiToken })`,
  );
});

// ---------------------------------------------------------------------------
// Lookup and adopt methods
// ---------------------------------------------------------------------------

Deno.test("lookup - filters by scalar GlobalArgs fields only", () => {
  const resource = makeResource({
    resourcePath: "dns_records",
    service: "dns",
    modelSlug: "dns-records",
    fileName: "dns_records.ts",
    displayName: "DNS Record",
    scope: "zone",
    basePath: "/zones/{zone_id}/dns_records",
    idPath: "/zones/{zone_id}/dns_records/{dns_record_id}",
    idParam: "dns_record_id",
    createProperties: {
      name: { type: "string", description: "Record name" },
      type: { type: "string", description: "Record type", enum: ["A", "AAAA"] },
      content: { type: "string", description: "Record content" },
      proxied: { type: "boolean", description: "Cloudflare proxy" },
      ttl: { type: "integer", description: "TTL" },
      data: {
        type: "object",
        description: "Record data",
        properties: { flags: { type: "number" } },
      },
      tags: { type: "array", description: "Tags", items: { type: "string" } },
    },
    updateProperties: {},
    resourceProperties: { id: stringProp, name: stringProp },
    createRequiredProperties: ["name", "type"],
    updateMethod: "PATCH",
  });

  const out = generateCloudflareExtensionModel({
    resource,
    extensionName: "@swamp/cloudflare/dns",
    version: "2026.01.01.1",
  });

  // Scalar fields included in filter
  assertStringIncludes(out, `filters.push(["name", String(g.name)])`);
  assertStringIncludes(out, `filters.push(["type", String(g.type)])`);
  assertStringIncludes(out, `filters.push(["content", String(g.content)])`);
  assertStringIncludes(out, `filters.push(["proxied", String(g.proxied)])`);
  assertStringIncludes(out, `filters.push(["ttl", String(g.ttl)])`);

  // Object and array fields excluded from filter
  assert(
    !out.includes(`filters.push(["data"`),
    "object fields should not be filterable",
  );
  assert(
    !out.includes(`filters.push(["tags"`),
    "array fields should not be filterable",
  );

  // Auth fields excluded from filter
  assert(
    !out.includes(`filters.push(["apiToken"`),
    "auth fields should not be filterable",
  );
  assert(
    !out.includes(`filters.push(["apiKey"`),
    "auth fields should not be filterable",
  );
  assert(
    !out.includes(`filters.push(["email"`),
    "auth fields should not be filterable",
  );

  // Uses listAll with pagination style
  assertStringIncludes(out, `await listAll(endpoint, "page"`);

  // Error messages include filter details
  assertStringIncludes(out, "No dns record found matching filters:");
  assertStringIncludes(out, "Expected exactly 1 match, found");
});

Deno.test("lookup - skips synthetic name field from filters", () => {
  const resource = makeResource({
    resourcePath: "addressing/address_maps",
    service: "addressing",
    modelSlug: "address-maps",
    fileName: "address_maps.ts",
    displayName: "Address Map",
    scope: "account",
    createProperties: {
      enabled: { type: "boolean", description: "Enabled" },
      description: { type: "string", description: "Description" },
    },
    updateProperties: {},
    resourceProperties: { id: stringProp },
    createRequiredProperties: [],
    namingField: "name",
    syntheticName: true,
  });

  const out = generateCloudflareExtensionModel({
    resource,
    extensionName: "@swamp/cloudflare/addressing",
    version: "2026.01.01.1",
  });

  // Synthetic name excluded from filters
  assert(
    !out.includes(`filters.push(["name"`),
    "synthetic name should not be filterable",
  );
  // Real scalar fields included
  assertStringIncludes(out, `filters.push(["enabled", String(g.enabled)])`);
  assertStringIncludes(
    out,
    `filters.push(["description", String(g.description)])`,
  );
});

Deno.test("adopt - imports by ID with no validation", () => {
  const resource = makeResource({
    resourcePath: "dns_records",
    service: "dns",
    modelSlug: "dns-records",
    fileName: "dns_records.ts",
    displayName: "DNS Record",
    scope: "zone",
    basePath: "/zones/{zone_id}/dns_records",
    idPath: "/zones/{zone_id}/dns_records/{dns_record_id}",
    idParam: "dns_record_id",
    createProperties: {
      name: { type: "string", description: "Record name" },
    },
    updateProperties: {},
    resourceProperties: { id: stringProp, name: stringProp },
    createRequiredProperties: ["name"],
    updateMethod: "PATCH",
  });

  const out = generateCloudflareExtensionModel({
    resource,
    extensionName: "@swamp/cloudflare/dns",
    version: "2026.01.01.1",
  });

  // Adopt method exists with correct description
  assertStringIncludes(
    out,
    `"Import an existing DNS Record by ID into state for management"`,
  );
  // Adopt takes an id argument
  assertStringIncludes(
    out,
    `id: z.string().describe("The ID of the DNS Record to import")`,
  );
  // Adopt calls read()
  assertStringIncludes(out, `await read(endpoint, args.id`);
  // Adopt prefers result.name for instance naming (not globalArgs)
  assertStringIncludes(
    out,
    `result.name?.toString() ?? g.name?.toString() ?? args.id`,
  );
});

Deno.test("adopt - uses cursor pagination style in lookup for cursor-paginated resources", () => {
  const resource = makeResource({
    resourcePath: "workers/scripts",
    service: "workers",
    modelSlug: "scripts",
    fileName: "scripts.ts",
    displayName: "Worker Script",
    scope: "account",
    createProperties: {
      name: { type: "string", description: "Script name" },
    },
    updateProperties: {},
    resourceProperties: { id: stringProp, name: stringProp },
    createRequiredProperties: ["name"],
    paginationStyle: "cursor",
    handlers: { create: true, read: true, update: false, delete: true },
  });

  const out = generateCloudflareExtensionModel({
    resource,
    extensionName: "@swamp/cloudflare/workers",
    version: "2026.01.01.1",
  });

  assertStringIncludes(out, `await listAll(endpoint, "cursor"`);
});

// ---------------------------------------------------------------------------
// Create-required fields: optional in GlobalArgsSchema, enforced by create
// ---------------------------------------------------------------------------

function createRequiredResource(
  overrides: Partial<CloudflareResource> = {},
): CloudflareResource {
  return makeResource({
    resourcePath: "alerting/v3/policies",
    service: "alerting",
    modelSlug: "policies",
    fileName: "policies.ts",
    createProperties: {
      name: stringProp,
      type: stringProp,
      enabled: { type: "boolean" },
      comment: stringProp,
    },
    createRequiredProperties: ["type", "name", "enabled"],
    resourceProperties: { id: stringProp, name: stringProp },
    ...overrides,
  });
}

function globalArgsBlock(code: string): string {
  const start = code.indexOf("const GlobalArgsSchema = z.object({");
  return code.slice(start, code.indexOf("});", start));
}

Deno.test("generateCloudflareExtensionModel - create-required fields are optional in GlobalArgsSchema", () => {
  const code = generateCloudflareExtensionModel({
    resource: createRequiredResource(),
    extensionName: "@swamp/cloudflare",
    version: "2026.01.01.1",
  });
  const block = globalArgsBlock(code);
  assertStringIncludes(block, "  name: z.string().optional(),");
  assertStringIncludes(block, "  type: z.string().optional(),");
  assertStringIncludes(block, "  enabled: z.boolean().optional(),");
  // Scope args are emitted separately and stay required.
  assertStringIncludes(
    block,
    `  account_id: z.string().describe("Cloudflare account ID"),`,
  );
});

Deno.test("generateCloudflareExtensionModel - synthetic name stays required", () => {
  const code = generateCloudflareExtensionModel({
    resource: createRequiredResource({
      createProperties: { type: stringProp },
      createRequiredProperties: ["type"],
      syntheticName: true,
    }),
    extensionName: "@swamp/cloudflare",
    version: "2026.01.01.1",
  });
  const block = globalArgsBlock(code);
  assertStringIncludes(
    block,
    `  name: z.string().describe("Instance name for this resource`,
  );
  assertStringIncludes(block, "  type: z.string().optional(),");
});

Deno.test("generateCloudflareExtensionModel - create guards create-required fields in sorted order", () => {
  const code = generateCloudflareExtensionModel({
    resource: createRequiredResource(),
    extensionName: "@swamp/cloudflare",
    version: "2026.01.01.1",
  });
  assertStringIncludes(
    code,
    `const missing = ["enabled","name","type"].filter((k) => g[k] === undefined);`,
  );
  assertStringIncludes(
    code,
    `throw new Error("create requires global arguments: " + missing.join(", "));`,
  );
  // The guard runs before the endpoint is built or any API call is made.
  const create = code.slice(code.indexOf("    create: {"));
  assert(
    create.indexOf("const missing") < create.indexOf("const endpoint"),
    "create guard must precede the endpoint and the API call",
  );
});

Deno.test("generateCloudflareExtensionModel - create emits no guard without create-required fields", () => {
  const code = generateCloudflareExtensionModel({
    resource: createRequiredResource({ createRequiredProperties: [] }),
    extensionName: "@swamp/cloudflare",
    version: "2026.01.01.1",
  });
  assertEquals(code.includes("create requires global arguments"), false);
});

Deno.test("generateCloudflareExtensionModel - a required email property stays guarded", () => {
  // `email` is a real property here, so the legacy apiKey+email auth pair is
  // not injected and `email` must be enforced like any create-required field.
  const code = generateCloudflareExtensionModel({
    resource: createRequiredResource({
      createProperties: { email: stringProp, name: stringProp },
      createRequiredProperties: ["email"],
    }),
    extensionName: "@swamp/cloudflare",
    version: "2026.01.01.1",
  });
  assertStringIncludes(
    code,
    `const missing = ["email"].filter((k) => g[k] === undefined);`,
  );
});

Deno.test("generateCloudflareExtensionModel - PUT update fills every unset field from the live resource and guards create-required ones", () => {
  const code = generateCloudflareExtensionModel({
    resource: createRequiredResource({
      updateMethod: "PUT",
      updateProperties: {
        name: stringProp,
        enabled: { type: "boolean" },
        comment: stringProp,
      },
      resourceProperties: {
        id: stringProp,
        name: stringProp,
        comment: stringProp,
      },
    }),
    extensionName: "@swamp/cloudflare",
    version: "2026.01.01.1",
  });
  const update = code.slice(
    code.indexOf("    update: {"),
    code.indexOf("    delete: {"),
  );
  // Every update-body field is filled, including the optional comment.
  assertStringIncludes(
    update,
    `const unset = ["comment","enabled","name"].filter((k) => body[k] === undefined);`,
  );
  assertStringIncludes(
    update,
    `const live = await read(endpoint, existing.id, { apiToken: g.apiToken, apiKey: g.apiKey, email: g.email });`,
  );
  // Only create-required fields are guarded; `type` is create-only (not in
  // the update body).
  assertStringIncludes(
    update,
    `const missingForUpdate = ["enabled","name"].filter((k) => body[k] === undefined);`,
  );
  assertStringIncludes(
    update,
    `throw new Error("update requires global arguments: " + missingForUpdate.join(", "));`,
  );
  // Never fill from stored state: it can be stale.
  assertEquals(update.includes("= existing"), false);
  assert(
    update.indexOf("missingForUpdate.length") <
      update.indexOf("await update("),
    "update guard must precede the PUT",
  );
});

Deno.test("generateCloudflareExtensionModel - PATCH update does not fill or guard fields", () => {
  const code = generateCloudflareExtensionModel({
    resource: createRequiredResource({
      updateMethod: "PATCH",
      updateProperties: { name: stringProp, enabled: { type: "boolean" } },
    }),
    extensionName: "@swamp/cloudflare",
    version: "2026.01.01.1",
  });
  assertEquals(code.includes("missingForUpdate"), false);
  assertEquals(code.includes("const live = await read("), false);
});
