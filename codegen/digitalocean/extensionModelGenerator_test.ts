import { assertSnapshot } from "@std/testing/snapshot";
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
    parentEndpoint: "/v2/domains",
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
    parentEndpoint: "/v2/databases",
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
