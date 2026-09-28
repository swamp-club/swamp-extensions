import { assertSnapshot } from "@std/testing/snapshot";
import { assert, assertEquals } from "@std/assert";
import {
  detectSegmentIdField,
  type GcpExtensionModelInput,
  generateGcpExtensionModel,
  resolveGcpMatchField,
  resolveGcpNamingField,
} from "./extensionModelGenerator.ts";
import type { GcpMethodConfig, GcpParsedResource } from "./pipeline.ts";

// ---------------------------------------------------------------------------
// Helper: default resource builder
// ---------------------------------------------------------------------------

function makeResource(
  overrides: Partial<GcpParsedResource> & { resourcePath: string[] },
): GcpParsedResource {
  const { resourcePath, ...rest } = overrides;
  return {
    service: "compute",
    apiTitle: "Compute Engine API",
    apiVersion: "v1",
    baseUrl: "https://compute.googleapis.com/compute/v1",
    resourcePath,
    typeName: "Google Cloud Compute Engine Instances",
    description: "A compute instance",
    domainProperties: {},
    resourceValueProperties: {},
    requiredProperties: [],
    createRequiredProperties: [],
    createOnlyProperties: [],
    insertProperties: new Set<string>(),
    updateProperties: new Set<string>(),
    primaryIdentifier: ["name"],
    handlers: { create: true, read: true, update: true, delete: true },
    isGlobalOnly: false,
    hasGlobalEndpoint: false,
    listOnly: false,
    methodConfigs: {},
    actionMethods: [],
    usesFullResourceName: false,
    oauthScopes: [],
    ...rest,
  };
}

function makeMethodConfig(
  overrides: Partial<GcpMethodConfig> & { id: string },
): GcpMethodConfig {
  return {
    path: "",
    httpMethod: "GET",
    parameterOrder: ["project"],
    parameters: {
      project: { location: "path", required: true },
    },
    ...overrides,
  };
}

function makeInput(
  overrides: Partial<GcpExtensionModelInput> & {
    resource: GcpParsedResource;
  },
): GcpExtensionModelInput {
  return {
    zodResult: {
      extractedSchemas: [],
      inputSchemaBody: `  name: z.string().describe("Instance name"),`,
      resourceSchemaBody:
        `  name: z.string().optional(),\n  id: z.string().optional(),`,
    },
    onlyProperties: {
      primaryIdentifier: ["name"],
      readOnly: ["id"],
      writeOnly: [],
      createOnly: [],
    },
    version: "2026.01.01.1",
    modelType: "@swamp/gcp/compute/instances",
    extensionName: "@swamp/gcp/compute",
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// resolveGcpNamingField unit tests
// ---------------------------------------------------------------------------

Deno.test("resolveGcpNamingField - primary identifier writable uses that field", () => {
  const resource = makeResource({
    resourcePath: ["instances"],
    primaryIdentifier: ["name"],
    domainProperties: {
      name: { type: "string" },
    },
  });
  const result = resolveGcpNamingField(resource);
  assertEquals(result, { field: "name", synthetic: false });
});

Deno.test("resolveGcpNamingField - read-only primary identifier gives synthetic name", () => {
  const resource = makeResource({
    resourcePath: ["instances"],
    primaryIdentifier: ["id"],
    domainProperties: {
      machineType: { type: "string" },
    },
  });
  const result = resolveGcpNamingField(resource);
  assertEquals(result, { field: "name", synthetic: true });
});

Deno.test("resolveGcpNamingField - fallback to name when primary is something else but name exists in domainProperties", () => {
  const resource = makeResource({
    resourcePath: ["instances"],
    primaryIdentifier: ["selfLink"],
    domainProperties: {
      name: { type: "string" },
      machineType: { type: "string" },
    },
  });
  const result = resolveGcpNamingField(resource);
  assertEquals(result, { field: "name", synthetic: false });
});

// ---------------------------------------------------------------------------
// resolveGcpMatchField unit tests
// ---------------------------------------------------------------------------

Deno.test("resolveGcpMatchField - prefers displayName when in insertProperties", () => {
  const resource = makeResource({
    resourcePath: ["folders"],
    insertProperties: new Set(["displayName", "parent"]),
    domainProperties: {
      displayName: { type: "string" },
      parent: { type: "string" },
    },
  });
  assertEquals(resolveGcpMatchField(resource, "name", true), "displayName");
});

Deno.test("resolveGcpMatchField - prefers shortName when displayName absent", () => {
  const resource = makeResource({
    resourcePath: ["tagKeys"],
    insertProperties: new Set(["shortName", "parent"]),
    domainProperties: {
      name: { type: "string" },
      shortName: { type: "string" },
      parent: { type: "string" },
    },
  });
  assertEquals(resolveGcpMatchField(resource, "name", false), "shortName");
});

Deno.test("resolveGcpMatchField - displayName wins over shortName when both present", () => {
  const resource = makeResource({
    resourcePath: ["things"],
    insertProperties: new Set(["displayName", "shortName"]),
    domainProperties: {
      displayName: { type: "string" },
      shortName: { type: "string" },
    },
  });
  assertEquals(resolveGcpMatchField(resource, "name", false), "displayName");
});

Deno.test("resolveGcpMatchField - falls back to namingField when not synthetic", () => {
  const resource = makeResource({
    resourcePath: ["instances"],
    insertProperties: new Set(["name", "zone"]),
    domainProperties: {
      name: { type: "string" },
      zone: { type: "string" },
    },
  });
  assertEquals(resolveGcpMatchField(resource, "name", false), "name");
});

Deno.test("resolveGcpMatchField - synthetic name with nested identity returns dotted path", () => {
  const resource = makeResource({
    resourcePath: ["memberships"],
    insertProperties: new Set(["preferredMemberKey", "roles"]),
    domainProperties: {
      preferredMemberKey: {
        type: "object",
        description: "Immutable. The `EntityKey` of the member.",
        properties: {
          id: { type: "string", description: "The ID of the entity." },
          namespace: { type: "string", description: "The namespace." },
        },
      },
      roles: { type: "array", items: { type: "object" } },
    },
  });
  assertEquals(
    resolveGcpMatchField(resource, "name", true),
    "preferredMemberKey.id",
  );
});

Deno.test("resolveGcpMatchField - synthetic name with no nested identity returns undefined", () => {
  const resource = makeResource({
    resourcePath: ["operations"],
    insertProperties: new Set(["config", "zone"]),
    domainProperties: {
      config: { type: "string" },
      zone: { type: "string" },
    },
  });
  assertEquals(resolveGcpMatchField(resource, "name", true), undefined);
});

Deno.test("resolveGcpMatchField - synthetic name with multiple nested identity candidates returns undefined", () => {
  const resource = makeResource({
    resourcePath: ["things"],
    insertProperties: new Set(["keyA", "keyB"]),
    domainProperties: {
      keyA: {
        type: "object",
        properties: { id: { type: "string", description: "Key A ID." } },
      },
      keyB: {
        type: "object",
        properties: { id: { type: "string", description: "Key B ID." } },
      },
    },
  });
  assertEquals(resolveGcpMatchField(resource, "name", true), undefined);
});

Deno.test("resolveGcpMatchField - synthetic name skips output-only nested identity", () => {
  const resource = makeResource({
    resourcePath: ["memberships"],
    insertProperties: new Set(["memberKey", "roles"]),
    domainProperties: {
      memberKey: {
        type: "object",
        description: "Output only. The member key.",
        properties: {
          id: { type: "string", description: "The ID." },
        },
      },
      roles: { type: "array", items: { type: "object" } },
    },
  });
  assertEquals(resolveGcpMatchField(resource, "name", true), undefined);
});

// ---------------------------------------------------------------------------
// detectSegmentIdField unit tests
// ---------------------------------------------------------------------------

Deno.test("detectSegmentIdField - returns roleId for segment 'roles'", () => {
  const resource = makeResource({
    resourcePath: ["roles"],
    usesFullResourceName: true,
    resourceSegment: "roles",
    insertProperties: new Set(["role", "roleId"]),
    domainProperties: {
      role: { type: "object" },
      roleId: { type: "string" },
      name: { type: "string" },
    },
  });
  assertEquals(detectSegmentIdField(resource), "roleId");
});

Deno.test("detectSegmentIdField - returns instanceId for segment 'instances'", () => {
  const resource = makeResource({
    resourcePath: ["instances"],
    usesFullResourceName: true,
    resourceSegment: "instances",
    insertProperties: new Set(["instance", "instanceId"]),
    domainProperties: {
      instance: { type: "object" },
      instanceId: { type: "string" },
      name: { type: "string" },
    },
  });
  assertEquals(detectSegmentIdField(resource), "instanceId");
});

Deno.test("detectSegmentIdField - returns undefined when name IS in insertProperties", () => {
  const resource = makeResource({
    resourcePath: ["instances"],
    usesFullResourceName: true,
    resourceSegment: "instances",
    insertProperties: new Set(["name", "zone", "machineType"]),
    domainProperties: {
      name: { type: "string" },
      zone: { type: "string" },
      machineType: { type: "string" },
    },
  });
  assertEquals(detectSegmentIdField(resource), undefined);
});

Deno.test("detectSegmentIdField - returns undefined when no matching *Id field", () => {
  const resource = makeResource({
    resourcePath: ["customers"],
    usesFullResourceName: true,
    resourceSegment: "customers",
    insertProperties: new Set(["channelPartnerId", "correlationId"]),
    domainProperties: {
      channelPartnerId: { type: "string" },
      correlationId: { type: "string" },
      name: { type: "string" },
    },
  });
  assertEquals(detectSegmentIdField(resource), undefined);
});

Deno.test("detectSegmentIdField - returns undefined when usesFullResourceName is false", () => {
  const resource = makeResource({
    resourcePath: ["roles"],
    usesFullResourceName: false,
    insertProperties: new Set(["roleId"]),
    domainProperties: {
      roleId: { type: "string" },
      name: { type: "string" },
    },
  });
  assertEquals(detectSegmentIdField(resource), undefined);
});

Deno.test("detectSegmentIdField - handles 'ies' plural (dataPolicies -> dataPolicyId)", () => {
  const resource = makeResource({
    resourcePath: ["dataPolicies"],
    usesFullResourceName: true,
    resourceSegment: "dataPolicies",
    insertProperties: new Set(["dataPolicyId"]),
    domainProperties: {
      dataPolicyId: { type: "string" },
      name: { type: "string" },
    },
  });
  assertEquals(detectSegmentIdField(resource), "dataPolicyId");
});

// ---------------------------------------------------------------------------
// Snapshot: basic resource with all CRUD handlers
// ---------------------------------------------------------------------------

Deno.test("generateGcpExtensionModel - all handlers, natural naming", async (t) => {
  const resource = makeResource({
    resourcePath: ["instances"],
    typeName: "Google Cloud Compute Engine Instances",
    description: "A compute engine instance",
    primaryIdentifier: ["name"],
    domainProperties: {
      name: { type: "string", description: "Instance name" },
      zone: { type: "string", description: "Zone" },
      machineType: { type: "string", description: "Machine type" },
    },
    resourceValueProperties: {
      name: { type: "string" },
      id: { type: "string" },
      zone: { type: "string" },
      machineType: { type: "string" },
      status: { type: "string" },
    },
    requiredProperties: ["zone"],
    createRequiredProperties: ["name", "machineType"],
    insertProperties: new Set(["name", "zone", "machineType"]),
    updateProperties: new Set(["machineType"]),
    createOnlyProperties: ["zone"],
    handlers: { create: true, read: true, update: true, delete: true },
    methodConfigs: {
      get: makeMethodConfig({
        id: "compute.instances.get",
        path: "projects/{project}/zones/{zone}/instances/{instance}",
        httpMethod: "GET",
        parameterOrder: ["project", "zone", "instance"],
        parameters: {
          project: { location: "path", required: true },
          zone: { location: "path", required: true },
          instance: { location: "path", required: true },
        },
      }),
      insert: makeMethodConfig({
        id: "compute.instances.insert",
        path: "projects/{project}/zones/{zone}/instances",
        httpMethod: "POST",
        parameterOrder: ["project", "zone"],
        parameters: {
          project: { location: "path", required: true },
          zone: { location: "path", required: true },
        },
      }),
      patch: makeMethodConfig({
        id: "compute.instances.patch",
        path: "projects/{project}/zones/{zone}/instances/{instance}",
        httpMethod: "PATCH",
        parameterOrder: ["project", "zone", "instance"],
        parameters: {
          project: { location: "path", required: true },
          zone: { location: "path", required: true },
          instance: { location: "path", required: true },
        },
      }),
      delete: makeMethodConfig({
        id: "compute.instances.delete",
        path: "projects/{project}/zones/{zone}/instances/{instance}",
        httpMethod: "DELETE",
        parameterOrder: ["project", "zone", "instance"],
        parameters: {
          project: { location: "path", required: true },
          zone: { location: "path", required: true },
          instance: { location: "path", required: true },
        },
      }),
    },
    actionMethods: [],
  });

  const input = makeInput({
    resource,
    zodResult: {
      extractedSchemas: [],
      inputSchemaBody:
        `  name: z.string().describe("Instance name").optional(),\n  zone: z.string().describe("Zone"),\n  machineType: z.string().describe("Machine type").optional(),`,
      resourceSchemaBody:
        `  name: z.string().optional(),\n  id: z.string().optional(),\n  zone: z.string().optional(),\n  machineType: z.string().optional(),\n  status: z.string().optional(),`,
    },
  });

  await assertSnapshot(t, generateGcpExtensionModel(input));
});

// ---------------------------------------------------------------------------
// Snapshot: resource with readiness polling
// ---------------------------------------------------------------------------

Deno.test("generateGcpExtensionModel - readiness polling", async (t) => {
  const resource = makeResource({
    resourcePath: ["instances"],
    typeName: "Google Cloud Compute Engine Instances",
    description: "A compute engine instance",
    primaryIdentifier: ["name"],
    domainProperties: {
      name: { type: "string", description: "Instance name" },
      zone: { type: "string", description: "Zone" },
    },
    resourceValueProperties: {
      name: { type: "string" },
      zone: { type: "string" },
      status: { type: "string" },
    },
    insertProperties: new Set(["name", "zone"]),
    updateProperties: new Set(["name"]),
    createOnlyProperties: ["zone"],
    handlers: { create: true, read: true, update: true, delete: true },
    readiness: {
      statusField: "status",
      readyValues: ["RUNNING"],
      failedValues: ["TERMINATED", "SUSPENDED"],
    },
    methodConfigs: {
      get: makeMethodConfig({
        id: "compute.instances.get",
        path: "projects/{project}/zones/{zone}/instances/{instance}",
        httpMethod: "GET",
        parameterOrder: ["project", "zone", "instance"],
        parameters: {
          project: { location: "path", required: true },
          zone: { location: "path", required: true },
          instance: { location: "path", required: true },
        },
      }),
      insert: makeMethodConfig({
        id: "compute.instances.insert",
        path: "projects/{project}/zones/{zone}/instances",
        httpMethod: "POST",
        parameterOrder: ["project", "zone"],
        parameters: {
          project: { location: "path", required: true },
          zone: { location: "path", required: true },
        },
      }),
      patch: makeMethodConfig({
        id: "compute.instances.patch",
        path: "projects/{project}/zones/{zone}/instances/{instance}",
        httpMethod: "PATCH",
        parameterOrder: ["project", "zone", "instance"],
        parameters: {
          project: { location: "path", required: true },
          zone: { location: "path", required: true },
          instance: { location: "path", required: true },
        },
      }),
      delete: makeMethodConfig({
        id: "compute.instances.delete",
        path: "projects/{project}/zones/{zone}/instances/{instance}",
        httpMethod: "DELETE",
        parameterOrder: ["project", "zone", "instance"],
        parameters: {
          project: { location: "path", required: true },
          zone: { location: "path", required: true },
          instance: { location: "path", required: true },
        },
      }),
    },
    actionMethods: [],
  });

  const input = makeInput({
    resource,
    zodResult: {
      extractedSchemas: [],
      inputSchemaBody:
        `  name: z.string().describe("Instance name"),\n  zone: z.string().describe("Zone"),`,
      resourceSchemaBody:
        `  name: z.string().optional(),\n  zone: z.string().optional(),\n  status: z.string().optional(),`,
    },
  });

  await assertSnapshot(t, generateGcpExtensionModel(input));
});

// ---------------------------------------------------------------------------
// Snapshot: listOnly resource
// ---------------------------------------------------------------------------

Deno.test("generateGcpExtensionModel - listOnly resource", async (t) => {
  const resource = makeResource({
    resourcePath: ["regions"],
    typeName: "Google Cloud Compute Engine Regions",
    description: "A compute engine region",
    primaryIdentifier: ["name"],
    domainProperties: {
      name: { type: "string", description: "Region name" },
    },
    resourceValueProperties: {
      name: { type: "string" },
      status: { type: "string" },
      id: { type: "string" },
    },
    insertProperties: new Set(["name"]),
    updateProperties: new Set<string>(),
    handlers: { create: true, read: true, update: false, delete: false },
    listOnly: true,
    methodConfigs: {
      list: makeMethodConfig({
        id: "compute.regions.list",
        path: "projects/{project}/regions",
        httpMethod: "GET",
        parameterOrder: ["project"],
        parameters: {
          project: { location: "path", required: true },
        },
      }),
      insert: makeMethodConfig({
        id: "compute.regions.insert",
        path: "projects/{project}/regions",
        httpMethod: "POST",
        parameterOrder: ["project"],
        parameters: {
          project: { location: "path", required: true },
        },
      }),
    },
    actionMethods: [],
  });

  const input = makeInput({
    resource,
    modelType: "@swamp/gcp/compute/regions",
    zodResult: {
      extractedSchemas: [],
      inputSchemaBody: `  name: z.string().describe("Region name"),`,
      resourceSchemaBody:
        `  name: z.string().optional(),\n  status: z.string().optional(),\n  id: z.string().optional(),`,
    },
  });

  await assertSnapshot(t, generateGcpExtensionModel(input));
});

// ---------------------------------------------------------------------------
// Snapshot: resource with {+name} full resource name pattern
// ---------------------------------------------------------------------------

Deno.test("generateGcpExtensionModel - full resource name pattern", async (t) => {
  const resource = makeResource({
    resourcePath: ["services"],
    service: "serviceusage",
    apiTitle: "Service Usage API",
    baseUrl: "https://serviceusage.googleapis.com/v1",
    typeName: "Google Cloud Service Usage Services",
    description: "A managed service",
    primaryIdentifier: ["name"],
    domainProperties: {
      name: { type: "string", description: "Service name" },
      parent: { type: "string", description: "Parent resource" },
    },
    resourceValueProperties: {
      name: { type: "string" },
      config: { type: "object" },
    },
    insertProperties: new Set(["name", "parent"]),
    updateProperties: new Set<string>(),
    handlers: { create: true, read: true, update: false, delete: true },
    usesFullResourceName: true,
    resourceSegment: "services",
    methodConfigs: {
      get: makeMethodConfig({
        id: "serviceusage.services.get",
        path: "v1/{+name}",
        httpMethod: "GET",
        parameterOrder: ["name"],
        parameters: {
          name: { location: "path", required: true },
        },
      }),
      insert: makeMethodConfig({
        id: "serviceusage.services.enable",
        path: "v1/{+name}:enable",
        httpMethod: "POST",
        parameterOrder: ["name"],
        parameters: {
          name: { location: "path", required: true },
        },
      }),
      delete: makeMethodConfig({
        id: "serviceusage.services.disable",
        path: "v1/{+name}:disable",
        httpMethod: "POST",
        parameterOrder: ["name"],
        parameters: {
          name: { location: "path", required: true },
        },
      }),
    },
    actionMethods: [],
  });

  const input = makeInput({
    resource,
    modelType: "@swamp/gcp/serviceusage/services",
    extensionName: "@swamp/gcp/serviceusage",
    zodResult: {
      extractedSchemas: [],
      inputSchemaBody:
        `  name: z.string().describe("Service name"),\n  parent: z.string().describe("Parent resource"),`,
      resourceSchemaBody:
        `  name: z.string().optional(),\n  config: z.record(z.string(), z.unknown()).optional(),`,
    },
  });

  await assertSnapshot(t, generateGcpExtensionModel(input));
});

// ---------------------------------------------------------------------------
// Snapshot: resource with action methods
// ---------------------------------------------------------------------------

Deno.test("generateGcpExtensionModel - action methods", async (t) => {
  const resource = makeResource({
    resourcePath: ["instances"],
    typeName: "Google Cloud Compute Engine Instances",
    description: "A compute engine instance",
    primaryIdentifier: ["name"],
    domainProperties: {
      name: { type: "string", description: "Instance name" },
      zone: { type: "string", description: "Zone" },
    },
    resourceValueProperties: {
      name: { type: "string" },
      zone: { type: "string" },
      status: { type: "string" },
    },
    insertProperties: new Set(["name", "zone"]),
    updateProperties: new Set<string>(),
    handlers: { create: true, read: true, update: false, delete: true },
    methodConfigs: {
      get: makeMethodConfig({
        id: "compute.instances.get",
        path: "projects/{project}/zones/{zone}/instances/{instance}",
        httpMethod: "GET",
        parameterOrder: ["project", "zone", "instance"],
        parameters: {
          project: { location: "path", required: true },
          zone: { location: "path", required: true },
          instance: { location: "path", required: true },
        },
      }),
      insert: makeMethodConfig({
        id: "compute.instances.insert",
        path: "projects/{project}/zones/{zone}/instances",
        httpMethod: "POST",
        parameterOrder: ["project", "zone"],
        parameters: {
          project: { location: "path", required: true },
          zone: { location: "path", required: true },
        },
      }),
      delete: makeMethodConfig({
        id: "compute.instances.delete",
        path: "projects/{project}/zones/{zone}/instances/{instance}",
        httpMethod: "DELETE",
        parameterOrder: ["project", "zone", "instance"],
        parameters: {
          project: { location: "path", required: true },
          zone: { location: "path", required: true },
          instance: { location: "path", required: true },
        },
      }),
    },
    actionMethods: [
      {
        name: "start",
        description: "Start the instance",
        config: {
          id: "compute.instances.start",
          path: "projects/{project}/zones/{zone}/instances/{instance}/start",
          httpMethod: "POST",
          parameterOrder: ["project", "zone", "instance"],
          parameters: {
            project: { location: "path", required: true },
            zone: { location: "path", required: true },
            instance: { location: "path", required: true },
          },
        },
        requestProperties: {},
        requiredProperties: [],
      },
      {
        name: "stop",
        description: "Stop the instance",
        config: {
          id: "compute.instances.stop",
          path: "projects/{project}/zones/{zone}/instances/{instance}/stop",
          httpMethod: "POST",
          parameterOrder: ["project", "zone", "instance"],
          parameters: {
            project: { location: "path", required: true },
            zone: { location: "path", required: true },
            instance: { location: "path", required: true },
          },
        },
        requestProperties: {},
        requiredProperties: [],
      },
    ],
  });

  const input = makeInput({
    resource,
    zodResult: {
      extractedSchemas: [],
      inputSchemaBody:
        `  name: z.string().describe("Instance name"),\n  zone: z.string().describe("Zone"),`,
      resourceSchemaBody:
        `  name: z.string().optional(),\n  zone: z.string().optional(),\n  status: z.string().optional(),`,
    },
  });

  await assertSnapshot(t, generateGcpExtensionModel(input));
});

// ---------------------------------------------------------------------------
// Snapshot: GET action method emits undefined body (not {})
// ---------------------------------------------------------------------------

Deno.test("generateGcpExtensionModel - GET action method uses undefined body", async (t) => {
  const resource = makeResource({
    resourcePath: ["spreadsheets", "values"],
    typeName: "Google Sheets Spreadsheets Values",
    description: "Spreadsheet values",
    primaryIdentifier: ["spreadsheetId"],
    domainProperties: {
      spreadsheetId: { type: "string", description: "Spreadsheet ID" },
    },
    resourceValueProperties: {
      spreadsheetId: { type: "string" },
    },
    insertProperties: new Set(["spreadsheetId"]),
    updateProperties: new Set<string>(),
    handlers: { create: true, read: true, update: false, delete: false },
    methodConfigs: {
      get: makeMethodConfig({
        id: "sheets.spreadsheets.values.get",
        path: "v4/spreadsheets/{spreadsheetId}/values/{range}",
        httpMethod: "GET",
        parameterOrder: ["spreadsheetId", "range"],
        parameters: {
          spreadsheetId: { location: "path", required: true },
          range: { location: "path", required: true },
        },
      }),
      insert: makeMethodConfig({
        id: "sheets.spreadsheets.values.update",
        path: "v4/spreadsheets/{spreadsheetId}/values/{range}",
        httpMethod: "PUT",
        parameterOrder: ["spreadsheetId", "range"],
        parameters: {
          spreadsheetId: { location: "path", required: true },
          range: { location: "path", required: true },
        },
      }),
    },
    actionMethods: [
      {
        name: "batch_get",
        description: "Batch get values",
        config: {
          id: "sheets.spreadsheets.values.batchGet",
          path: "v4/spreadsheets/{spreadsheetId}/values:batchGet",
          httpMethod: "GET",
          parameterOrder: ["spreadsheetId"],
          parameters: {
            spreadsheetId: { location: "path", required: true },
            ranges: { location: "query" },
          },
        },
        requestProperties: {},
        requiredProperties: [],
      },
      {
        name: "batch_update",
        description: "Batch update values",
        config: {
          id: "sheets.spreadsheets.values.batchUpdate",
          path: "v4/spreadsheets/{spreadsheetId}/values:batchUpdate",
          httpMethod: "POST",
          parameterOrder: ["spreadsheetId"],
          parameters: {
            spreadsheetId: { location: "path", required: true },
          },
        },
        requestProperties: {},
        requiredProperties: [],
      },
    ],
  });

  const input = makeInput({
    resource,
    modelType: "@swamp/gcp/sheets/spreadsheets-values",
    zodResult: {
      extractedSchemas: [],
      inputSchemaBody:
        `  spreadsheetId: z.string().describe("Spreadsheet ID"),`,
      resourceSchemaBody: `  spreadsheetId: z.string().optional(),`,
    },
  });

  const output = generateGcpExtensionModel(input);

  // GET action method must pass undefined body, not {}
  assert(
    output.includes("createResource(baseUrl,") &&
      output.includes('"httpMethod":"GET"') &&
      !output.match(
        /"httpMethod":"GET"[^;]*,\s*\{\}\s*,\s*undefined,\s*undefined,\s*undefined,\s*credentials/,
      ),
    "GET action method should not pass {} as body to createResource",
  );
  assert(
    output.match(
      /"httpMethod":"GET"[^;]*,\s*undefined\s*,\s*undefined,\s*undefined,\s*undefined,\s*credentials/,
    ),
    "GET action method should pass undefined as body to createResource",
  );

  // POST action method should still pass {} (empty body is fine for POST)
  assert(
    output.match(
      /"httpMethod":"POST"[^;]*,\s*\{\}\s*,\s*undefined,\s*undefined,\s*undefined,\s*credentials/,
    ),
    "POST action method with no request properties should still pass {} as body",
  );

  await assertSnapshot(t, output);
});

// ---------------------------------------------------------------------------
// Snapshot: no update/delete handlers (create + read only)
// ---------------------------------------------------------------------------

Deno.test("generateGcpExtensionModel - no update or delete handlers", async (t) => {
  const resource = makeResource({
    resourcePath: ["snapshots"],
    typeName: "Google Cloud Compute Engine Snapshots",
    description: "A compute engine disk snapshot",
    primaryIdentifier: ["name"],
    domainProperties: {
      name: { type: "string", description: "Snapshot name" },
      sourceDisk: { type: "string", description: "Source disk" },
    },
    resourceValueProperties: {
      name: { type: "string" },
      id: { type: "string" },
      sourceDisk: { type: "string" },
      status: { type: "string" },
    },
    insertProperties: new Set(["name", "sourceDisk"]),
    updateProperties: new Set<string>(),
    handlers: { create: true, read: true, update: false, delete: false },
    methodConfigs: {
      get: makeMethodConfig({
        id: "compute.snapshots.get",
        path: "projects/{project}/global/snapshots/{snapshot}",
        httpMethod: "GET",
        parameterOrder: ["project", "snapshot"],
        parameters: {
          project: { location: "path", required: true },
          snapshot: { location: "path", required: true },
        },
      }),
      insert: makeMethodConfig({
        id: "compute.snapshots.insert",
        path: "projects/{project}/global/snapshots",
        httpMethod: "POST",
        parameterOrder: ["project"],
        parameters: {
          project: { location: "path", required: true },
        },
      }),
    },
    actionMethods: [],
  });

  const input = makeInput({
    resource,
    modelType: "@swamp/gcp/compute/snapshots",
    zodResult: {
      extractedSchemas: [],
      inputSchemaBody:
        `  name: z.string().describe("Snapshot name"),\n  sourceDisk: z.string().describe("Source disk"),`,
      resourceSchemaBody:
        `  name: z.string().optional(),\n  id: z.string().optional(),\n  sourceDisk: z.string().optional(),\n  status: z.string().optional(),`,
    },
  });

  await assertSnapshot(t, generateGcpExtensionModel(input));
});

// ---------------------------------------------------------------------------
// Snapshot: with upgrades block
// ---------------------------------------------------------------------------

Deno.test("generateGcpExtensionModel - with upgrades block", async (t) => {
  const resource = makeResource({
    resourcePath: ["firewalls"],
    typeName: "Google Cloud Compute Engine Firewalls",
    description: "A VPC firewall rule",
    primaryIdentifier: ["name"],
    domainProperties: {
      name: { type: "string", description: "Firewall name" },
      network: { type: "string", description: "Network" },
    },
    resourceValueProperties: {
      name: { type: "string" },
      id: { type: "string" },
      network: { type: "string" },
    },
    insertProperties: new Set(["name", "network"]),
    updateProperties: new Set(["network"]),
    handlers: { create: true, read: true, update: true, delete: true },
    methodConfigs: {
      get: makeMethodConfig({
        id: "compute.firewalls.get",
        path: "projects/{project}/global/firewalls/{firewall}",
        httpMethod: "GET",
        parameterOrder: ["project", "firewall"],
        parameters: {
          project: { location: "path", required: true },
          firewall: { location: "path", required: true },
        },
      }),
      insert: makeMethodConfig({
        id: "compute.firewalls.insert",
        path: "projects/{project}/global/firewalls",
        httpMethod: "POST",
        parameterOrder: ["project"],
        parameters: {
          project: { location: "path", required: true },
        },
      }),
      patch: makeMethodConfig({
        id: "compute.firewalls.patch",
        path: "projects/{project}/global/firewalls/{firewall}",
        httpMethod: "PATCH",
        parameterOrder: ["project", "firewall"],
        parameters: {
          project: { location: "path", required: true },
          firewall: { location: "path", required: true },
        },
      }),
      delete: makeMethodConfig({
        id: "compute.firewalls.delete",
        path: "projects/{project}/global/firewalls/{firewall}",
        httpMethod: "DELETE",
        parameterOrder: ["project", "firewall"],
        parameters: {
          project: { location: "path", required: true },
          firewall: { location: "path", required: true },
        },
      }),
    },
    actionMethods: [],
  });

  const input = makeInput({
    resource,
    modelType: "@swamp/gcp/compute/firewalls",
    version: "2026.01.02.1",
    zodResult: {
      extractedSchemas: [],
      inputSchemaBody:
        `  name: z.string().describe("Firewall name"),\n  network: z.string().describe("Network"),`,
      resourceSchemaBody:
        `  name: z.string().optional(),\n  id: z.string().optional(),\n  network: z.string().optional(),`,
    },
    upgradesBlock:
      `  upgrades: [\n    {\n      toVersion: "2026.01.02.1",\n      description: "Added: priority",\n      upgradeAttributes: (old: Record<string, unknown>) => old,\n    },\n  ],`,
  });

  await assertSnapshot(t, generateGcpExtensionModel(input));
});

// ---------------------------------------------------------------------------
// OAuth scope tests
// ---------------------------------------------------------------------------

Deno.test("generateGcpExtensionModel - emits _defaultOAuthScopes for non-cloud-platform APIs", () => {
  const resource = makeResource({
    resourcePath: ["events"],
    oauthScopes: [
      "https://www.googleapis.com/auth/calendar",
      "https://www.googleapis.com/auth/calendar.readonly",
    ],
    methodConfigs: {
      get: makeMethodConfig({ id: "calendar.events.get" }),
    },
  });
  const code = generateGcpExtensionModel(makeInput({ resource }));
  assert(
    code.includes("const _defaultOAuthScopes: string[]"),
    "should emit _defaultOAuthScopes for non-cloud-platform API",
  );
  assert(
    code.includes("https://www.googleapis.com/auth/calendar"),
    "should include the calendar scope",
  );
  assert(
    code.includes(": _defaultOAuthScopes,"),
    "should fall back to _defaultOAuthScopes in _buildGcpCredentials",
  );
});

Deno.test("generateGcpExtensionModel - does NOT emit _defaultOAuthScopes for cloud-platform APIs", () => {
  const resource = makeResource({
    resourcePath: ["instances"],
    oauthScopes: [
      "https://www.googleapis.com/auth/cloud-platform",
      "https://www.googleapis.com/auth/compute",
    ],
    methodConfigs: {
      get: makeMethodConfig({ id: "compute.instances.get" }),
    },
  });
  const code = generateGcpExtensionModel(makeInput({ resource }));
  assert(
    !code.includes("const _defaultOAuthScopes"),
    "should NOT emit _defaultOAuthScopes for cloud-platform API",
  );
  assert(
    code.includes(": undefined,"),
    "should pass undefined scopes in _buildGcpCredentials",
  );
});

Deno.test("generateGcpExtensionModel - does NOT emit _defaultOAuthScopes when oauthScopes is empty", () => {
  const resource = makeResource({
    resourcePath: ["items"],
    oauthScopes: [],
    methodConfigs: {
      get: makeMethodConfig({ id: "test.items.get" }),
    },
  });
  const code = generateGcpExtensionModel(makeInput({ resource }));
  assert(
    !code.includes("const _defaultOAuthScopes"),
    "should NOT emit _defaultOAuthScopes when no scopes declared",
  );
});

Deno.test("generateGcpExtensionModel - uses projectId param key when discovery path has {projectId}", () => {
  const resource = makeResource({
    resourcePath: ["builds"],
    service: "cloudbuild",
    apiTitle: "Cloud Build API",
    baseUrl: "https://cloudbuild.googleapis.com/",
    methodConfigs: {
      insert: makeMethodConfig({
        id: "cloudbuild.projects.builds.create",
        path: "v1/projects/{projectId}/builds",
        httpMethod: "POST",
        parameterOrder: ["projectId"],
        parameters: {
          projectId: { location: "path", required: true },
        },
      }),
      get: makeMethodConfig({
        id: "cloudbuild.projects.builds.get",
        path: "v1/projects/{projectId}/builds/{id}",
        parameterOrder: ["projectId", "id"],
        parameters: {
          projectId: { location: "path", required: true },
          id: { location: "path", required: true },
        },
      }),
      list: makeMethodConfig({
        id: "cloudbuild.projects.builds.list",
        path: "v1/projects/{projectId}/builds",
        parameterOrder: ["projectId"],
        parameters: {
          projectId: { location: "path", required: true },
        },
      }),
    },
    availableScopes: ["projects"],
    primaryIdentifier: ["id"],
    domainProperties: {
      name: { type: "string" },
    },
    resourceValueProperties: {
      id: { type: "string" },
      name: { type: "string" },
    },
    listResponseArrayField: "builds",
  });
  const code = generateGcpExtensionModel(makeInput({
    resource,
    modelType: "@swamp/gcp/cloudbuild/builds",
    extensionName: "@swamp/gcp/cloudbuild",
  }));

  const projectIdMatches = code.match(/\{ projectId: projectId \}/g) || [];
  const projectMatches = code.match(/\{ project: projectId \}/g) || [];
  assert(
    projectIdMatches.length > 0,
    "should use { projectId: projectId } when discovery path uses {projectId}",
  );
  assertEquals(
    projectMatches.length,
    0,
    "should NOT use { project: projectId } when discovery path uses {projectId}",
  );
});

Deno.test("generateGcpExtensionModel - uses project param key when discovery path has {project}", () => {
  const resource = makeResource({
    resourcePath: ["instances"],
    methodConfigs: {
      insert: makeMethodConfig({
        id: "compute.instances.insert",
        path: "projects/{project}/zones/{zone}/instances",
        httpMethod: "POST",
        parameterOrder: ["project", "zone"],
        parameters: {
          project: { location: "path", required: true },
          zone: { location: "path", required: true },
        },
      }),
      get: makeMethodConfig({
        id: "compute.instances.get",
        path: "projects/{project}/zones/{zone}/instances/{instance}",
        parameterOrder: ["project", "zone", "instance"],
        parameters: {
          project: { location: "path", required: true },
          zone: { location: "path", required: true },
          instance: { location: "path", required: true },
        },
      }),
    },
    availableScopes: ["projects"],
    domainProperties: {
      name: { type: "string" },
      zone: { type: "string" },
    },
    resourceValueProperties: {
      name: { type: "string" },
      zone: { type: "string" },
    },
  });
  const code = generateGcpExtensionModel(makeInput({ resource }));

  const projectMatches = code.match(/\{ project: projectId \}/g) || [];
  const projectIdMatches = code.match(/\{ projectId: projectId \}/g) || [];
  assert(
    projectMatches.length > 0,
    "should use { project: projectId } when discovery path uses {project}",
  );
  assertEquals(
    projectIdMatches.length,
    0,
    "should NOT use { projectId: projectId } when discovery path uses {project}",
  );
});

Deno.test("generateGcpExtensionModel - scopes global arg has collision guard", () => {
  const resource = makeResource({
    resourcePath: ["accesspolicies"],
    oauthScopes: [
      "https://www.googleapis.com/auth/cloud-platform",
    ],
    domainProperties: {
      scopes: {
        type: "array",
        description: "Policy scopes",
        items: { type: "string" },
      },
    },
    methodConfigs: {
      get: makeMethodConfig({ id: "accesscontextmanager.accessPolicies.get" }),
    },
  });
  const code = generateGcpExtensionModel(makeInput({ resource }));
  const globalArgsMatch = code.match(
    /const GlobalArgsSchema = z\.object\(\{([\s\S]*?)\}\);/,
  );
  assert(globalArgsMatch, "should have GlobalArgsSchema");
  assert(
    !globalArgsMatch![1].includes(
      '"Comma-separated OAuth scopes',
    ),
    "should NOT inject scopes global arg when domain has scopes property",
  );
});

// ---------------------------------------------------------------------------
// Action methods with query-location parameters (#1990)
// ---------------------------------------------------------------------------

Deno.test("generateGcpExtensionModel - action method query params routed to params", () => {
  const resource = makeResource({
    resourcePath: ["spreadsheets", "values"],
    typeName: "Google Sheets Spreadsheets Values",
    description: "Spreadsheet values",
    primaryIdentifier: ["spreadsheetId"],
    domainProperties: {
      spreadsheetId: { type: "string", description: "Spreadsheet ID" },
      range: { type: "string", description: "A1 range" },
    },
    resourceValueProperties: {
      spreadsheetId: { type: "string" },
    },
    insertProperties: new Set(["spreadsheetId"]),
    updateProperties: new Set<string>(),
    handlers: { create: false, read: true, update: false, delete: false },
    methodConfigs: {
      get: makeMethodConfig({
        id: "sheets.spreadsheets.values.get",
        path: "v4/spreadsheets/{spreadsheetId}/values/{range}",
        httpMethod: "GET",
        parameterOrder: ["spreadsheetId", "range"],
        parameters: {
          spreadsheetId: { location: "path", required: true },
          range: { location: "path", required: true },
        },
      }),
    },
    actionMethods: [
      {
        name: "append",
        description: "Append values",
        config: {
          id: "sheets.spreadsheets.values.append",
          path: "v4/spreadsheets/{spreadsheetId}/values/{range}:append",
          httpMethod: "POST",
          parameterOrder: ["spreadsheetId", "range"],
          parameters: {
            spreadsheetId: { location: "path", required: true },
            range: { location: "path", required: true },
            valueInputOption: { location: "query" },
            insertDataOption: { location: "query" },
            includeValuesInResponse: { location: "query" },
          },
        },
        requestProperties: {
          majorDimension: { type: "string", description: "Major dimension" },
          values: {
            type: "array",
            description: "Values",
            items: { type: "string" },
          },
        },
        requiredProperties: [],
      },
    ],
  });

  const output = generateGcpExtensionModel(makeInput({
    resource,
    modelType: "@swamp/gcp/sheets/spreadsheets-values",
    zodResult: {
      extractedSchemas: [],
      inputSchemaBody:
        `  spreadsheetId: z.string().describe("Spreadsheet ID"),\n  range: z.string().describe("A1 range"),`,
      resourceSchemaBody: `  spreadsheetId: z.string().optional(),`,
    },
  }));

  // Query params must appear in the arguments schema
  assert(
    output.includes("valueInputOption: z.any().optional()"),
    "valueInputOption should be in append arguments",
  );
  assert(
    output.includes("insertDataOption: z.any().optional()"),
    "insertDataOption should be in append arguments",
  );
  assert(
    output.includes("includeValuesInResponse: z.any().optional()"),
    "includeValuesInResponse should be in append arguments",
  );

  // Query params must be routed to params, not body
  assert(
    output.includes(
      'params["valueInputOption"] = String(args["valueInputOption"])',
    ),
    "valueInputOption should be routed to params",
  );
  assert(
    output.includes(
      'params["insertDataOption"] = String(args["insertDataOption"])',
    ),
    "insertDataOption should be routed to params",
  );

  // Body params from requestProperties must still go to body
  assert(
    output.includes('body["majorDimension"] = args["majorDimension"]'),
    "majorDimension should be routed to body",
  );
  assert(
    output.includes('body["values"] = args["values"]'),
    "values should be routed to body",
  );
});

// ---------------------------------------------------------------------------
// Create-required guard
// ---------------------------------------------------------------------------

function makeCreatableResource(
  createRequiredProperties: string[],
): GcpParsedResource {
  return makeResource({
    resourcePath: ["routes"],
    domainProperties: {
      name: { type: "string" },
      destRange: { type: "string" },
    },
    insertProperties: new Set(["name", "destRange"]),
    createRequiredProperties,
    handlers: { create: true, read: true, update: false, delete: false },
    methodConfigs: {
      insert: makeMethodConfig({
        id: "compute.routes.insert",
        path: "projects/{project}/global/routes",
        httpMethod: "POST",
      }),
    },
  });
}

Deno.test("generateGcpExtensionModel - create guards create-required fields in sorted order", () => {
  const code = generateGcpExtensionModel(
    makeInput({ resource: makeCreatableResource(["name", "destRange"]) }),
  );
  assert(
    code.includes(
      `const missing = ["destRange","name"].filter((k) => g[k] === undefined);`,
    ),
  );
  assert(
    code.includes(
      `throw new Error("create requires global arguments: " + missing.join(", "));`,
    ),
  );
});

Deno.test("generateGcpExtensionModel - create emits no guard without create-required fields", () => {
  const code = generateGcpExtensionModel(
    makeInput({ resource: makeCreatableResource([]) }),
  );
  assertEquals(code.includes("create requires global arguments"), false);
});

function makeUpdatableResource(httpMethod: "PUT" | "PATCH"): GcpParsedResource {
  const itemPath = "projects/{project}/global/firewalls/{firewall}";
  return makeResource({
    resourcePath: ["firewalls"],
    domainProperties: {
      name: { type: "string" },
      network: { type: "string" },
      description: { type: "string" },
    },
    insertProperties: new Set(["name", "network", "description"]),
    updateProperties: new Set(["name", "network", "description"]),
    createRequiredProperties: ["network", "name"],
    handlers: { create: true, read: true, update: true, delete: false },
    methodConfigs: {
      insert: makeMethodConfig({
        id: "compute.firewalls.insert",
        path: "projects/{project}/global/firewalls",
        httpMethod: "POST",
      }),
      get: makeMethodConfig({
        id: "compute.firewalls.get",
        path: itemPath,
        parameterOrder: ["project", "firewall"],
      }),
      [httpMethod === "PUT" ? "update" : "patch"]: makeMethodConfig({
        id: "compute.firewalls.update",
        path: itemPath,
        httpMethod,
        parameterOrder: ["project", "firewall"],
      }),
    },
  });
}

Deno.test("generateGcpExtensionModel - PUT update carries create-required fields from state and guards them", () => {
  const code = generateGcpExtensionModel(
    makeInput({ resource: makeUpdatableResource("PUT") }),
  );
  assert(
    code.includes(
      `else if (existing["network"] !== undefined) body["network"] = existing["network"];`,
    ),
  );
  assert(
    code.includes(
      `const missingForUpdate = ["name","network"].filter((k) => body[k] === undefined);`,
    ),
  );
  assertEquals(
    code.includes(`else if (existing["description"] !== undefined)`),
    false,
    "optional fields are not carried from state",
  );
});

Deno.test("generateGcpExtensionModel - PATCH update does not carry or guard create-required fields", () => {
  const code = generateGcpExtensionModel(
    makeInput({ resource: makeUpdatableResource("PATCH") }),
  );
  assertEquals(code.includes("missingForUpdate"), false);
  assertEquals(code.includes(`body["network"] = existing["network"]`), false);
});
