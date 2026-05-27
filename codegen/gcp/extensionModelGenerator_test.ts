import { assertSnapshot } from "@std/testing/snapshot";
import { assertEquals } from "@std/assert";
import {
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
    createOnlyProperties: [],
    insertProperties: new Set<string>(),
    updateProperties: new Set<string>(),
    primaryIdentifier: ["name"],
    handlers: { create: true, read: true, update: true, delete: true },
    isGlobalOnly: false,
    listOnly: false,
    methodConfigs: {},
    actionMethods: [],
    usesFullResourceName: false,
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
  assertEquals(resolveGcpMatchField(resource, "name"), "displayName");
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
  assertEquals(resolveGcpMatchField(resource, "name"), "shortName");
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
  assertEquals(resolveGcpMatchField(resource, "name"), "displayName");
});

Deno.test("resolveGcpMatchField - falls back to namingField when neither present", () => {
  const resource = makeResource({
    resourcePath: ["instances"],
    insertProperties: new Set(["name", "zone"]),
    domainProperties: {
      name: { type: "string" },
      zone: { type: "string" },
    },
  });
  assertEquals(resolveGcpMatchField(resource, "name"), "name");
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
    requiredProperties: ["name", "zone", "machineType"],
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
        `  name: z.string().describe("Instance name"),\n  zone: z.string().describe("Zone"),\n  machineType: z.string().describe("Machine type"),`,
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
