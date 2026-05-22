import { assertSnapshot } from "@std/testing/snapshot";
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
    displayName: overrides.modelSlug.replace(/-/g, " ").replace(/\b\w/g, (c) =>
      c.toUpperCase()
    ),
    scope: "account",
    basePath: `/accounts/{account_id}/${overrides.resourcePath}`,
    idPath:
      `/accounts/{account_id}/${overrides.resourcePath}/{${overrides.modelSlug}_id}`,
    createProperties: {},
    updateProperties: {},
    resourceProperties: {},
    requiredProperties: [],
    handlers: { create: true, read: true, update: true, delete: true },
    updateMethod: "PATCH",
    identifyingField: "id",
    idParam: `${overrides.modelSlug}_id`,
    namingField: "name",
    syntheticName: false,
    createOnlyProperties: new Set<string>(),
    paginationStyle: "page",
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
    requiredProperties: ["name"],
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
      name: { type: "string", description: "Record name", minLength: 1, maxLength: 255 },
      type: { type: "string", description: "Record type", enum: ["A", "AAAA", "CNAME", "MX", "TXT"] },
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
    requiredProperties: ["name", "type", "content"],
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
      kind: { type: "string", description: "Kind", enum: ["root", "zone", "managed"] },
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
    requiredProperties: ["name", "kind", "phase"],
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
      enabled: { type: "boolean", description: "Whether the address map is enabled" },
    },
    updateProperties: {
      enabled: { type: "boolean", description: "Whether the address map is enabled" },
    },
    resourceProperties: {
      id: stringProp,
      enabled: { type: "boolean" },
      created_at: stringProp,
    },
    requiredProperties: [],
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
    requiredProperties: ["name"],
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
