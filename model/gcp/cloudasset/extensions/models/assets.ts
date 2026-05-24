// Auto-generated extension model for @swamp/gcp/cloudasset/assets
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Asset Assets.
 *
 * An asset in Google Cloud. An asset can be any resource in the Google Cloud [resource hierarchy](https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy), a resource outside the Google Cloud resource hierarchy (such as Google Kubernetes Engine clusters and objects), or a policy (e.g. IAM policy), or a relationship (e.g. an INSTANCE_TO_INSTANCEGROUP relationship). See [Supported asset types](https://cloud.google.com/asset-inventory/docs/supported-asset-types) for more information.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  getProjectId,
  isResourceNotFoundError,
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://cloudasset.googleapis.com/";

const LIST_CONFIG = {
  "id": "cloudasset.assets.list",
  "path": "v1/{+parent}/assets",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "assetTypes": {
      "location": "query",
    },
    "contentType": {
      "location": "query",
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "readTime": {
      "location": "query",
    },
    "relationshipTypes": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  accessLevel: z.object({
    basic: z.object({
      combiningFunction: z.string(),
      conditions: z.array(z.object({
        devicePolicy: z.object({
          allowedDeviceManagementLevels: z.unknown(),
          allowedEncryptionStatuses: z.unknown(),
          osConstraints: z.unknown(),
          requireAdminApproval: z.unknown(),
          requireCorpOwned: z.unknown(),
          requireScreenlock: z.unknown(),
        }),
        ipSubnetworks: z.array(z.unknown()),
        members: z.array(z.unknown()),
        negate: z.boolean(),
        regions: z.array(z.unknown()),
        requiredAccessLevels: z.array(z.unknown()),
        vpcNetworkSources: z.array(z.unknown()),
      })),
    }),
    custom: z.object({
      expr: z.object({
        description: z.string(),
        expression: z.string(),
        location: z.string(),
        title: z.string(),
      }),
    }),
    description: z.string(),
    name: z.string(),
    title: z.string(),
  }).optional(),
  accessPolicy: z.object({
    etag: z.string(),
    name: z.string(),
    parent: z.string(),
    scopes: z.array(z.string()),
    title: z.string(),
  }).optional(),
  ancestors: z.array(z.string()).optional(),
  assetExceptions: z.array(z.object({
    details: z.string(),
    exceptionType: z.string(),
  })).optional(),
  assetType: z.string().optional(),
  iamPolicy: z.object({
    auditConfigs: z.array(z.object({
      auditLogConfigs: z.array(z.object({
        exemptedMembers: z.unknown(),
        logType: z.unknown(),
      })),
      service: z.string(),
    })),
    bindings: z.array(z.object({
      condition: z.object({
        description: z.string(),
        expression: z.string(),
        location: z.string(),
        title: z.string(),
      }),
      members: z.array(z.string()),
      role: z.string(),
    })),
    etag: z.string(),
    version: z.number(),
  }).optional(),
  name: z.string(),
  orgPolicy: z.array(z.object({
    booleanPolicy: z.object({
      enforced: z.boolean(),
    }),
    constraint: z.string(),
    etag: z.string(),
    listPolicy: z.object({
      allValues: z.string(),
      allowedValues: z.array(z.string()),
      deniedValues: z.array(z.string()),
      inheritFromParent: z.boolean(),
      suggestedValue: z.string(),
    }),
    restoreDefault: z.object({}),
    updateTime: z.string(),
    version: z.number(),
  })).optional(),
  osInventory: z.object({
    items: z.record(z.string(), z.unknown()),
    name: z.string(),
    osInfo: z.object({
      architecture: z.string(),
      hostname: z.string(),
      kernelRelease: z.string(),
      kernelVersion: z.string(),
      longName: z.string(),
      osconfigAgentVersion: z.string(),
      shortName: z.string(),
      version: z.string(),
    }),
    updateTime: z.string(),
  }).optional(),
  relatedAsset: z.object({
    ancestors: z.array(z.string()),
    asset: z.string(),
    assetType: z.string(),
    relationshipType: z.string(),
  }).optional(),
  relatedAssets: z.object({
    assets: z.array(z.object({
      ancestors: z.array(z.string()),
      asset: z.string(),
      assetType: z.string(),
      relationshipType: z.string(),
    })),
    relationshipAttributes: z.object({
      action: z.string(),
      sourceResourceType: z.string(),
      targetResourceType: z.string(),
      type: z.string(),
    }),
  }).optional(),
  resource: z.object({
    data: z.record(z.string(), z.unknown()),
    discoveryDocumentUri: z.string(),
    discoveryName: z.string(),
    location: z.string(),
    parent: z.string(),
    resourceUrl: z.string(),
    version: z.string(),
  }).optional(),
  servicePerimeter: z.object({
    description: z.string(),
    etag: z.string(),
    name: z.string(),
    perimeterType: z.string(),
    spec: z.object({
      accessLevels: z.array(z.string()),
      egressPolicies: z.array(z.object({
        egressFrom: z.object({
          identities: z.unknown(),
          identityType: z.unknown(),
          sourceRestriction: z.unknown(),
          sources: z.unknown(),
        }),
        egressTo: z.object({
          externalResources: z.unknown(),
          operations: z.unknown(),
          resources: z.unknown(),
          roles: z.unknown(),
        }),
        title: z.string(),
      })),
      ingressPolicies: z.array(z.object({
        ingressFrom: z.object({
          identities: z.unknown(),
          identityType: z.unknown(),
          sources: z.unknown(),
        }),
        ingressTo: z.object({
          operations: z.unknown(),
          resources: z.unknown(),
          roles: z.unknown(),
        }),
        title: z.string(),
      })),
      resources: z.array(z.string()),
      restrictedServices: z.array(z.string()),
      vpcAccessibleServices: z.object({
        allowedServices: z.array(z.string()),
        enableRestriction: z.boolean(),
      }),
    }),
    status: z.object({
      accessLevels: z.array(z.string()),
      egressPolicies: z.array(z.object({
        egressFrom: z.object({
          identities: z.unknown(),
          identityType: z.unknown(),
          sourceRestriction: z.unknown(),
          sources: z.unknown(),
        }),
        egressTo: z.object({
          externalResources: z.unknown(),
          operations: z.unknown(),
          resources: z.unknown(),
          roles: z.unknown(),
        }),
        title: z.string(),
      })),
      ingressPolicies: z.array(z.object({
        ingressFrom: z.object({
          identities: z.unknown(),
          identityType: z.unknown(),
          sources: z.unknown(),
        }),
        ingressTo: z.object({
          operations: z.unknown(),
          resources: z.unknown(),
          roles: z.unknown(),
        }),
        title: z.string(),
      })),
      resources: z.array(z.string()),
      restrictedServices: z.array(z.string()),
      vpcAccessibleServices: z.object({
        allowedServices: z.array(z.string()),
        enableRestriction: z.boolean(),
      }),
    }),
    title: z.string(),
    useExplicitDryRunSpec: z.boolean(),
  }).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Asset Assets. Registered at `@swamp/gcp/cloudasset/assets`. */
export const model = {
  type: "@swamp/gcp/cloudasset/assets",
  version: "2026.05.24.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.04.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.21.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.24.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "An asset in Google Cloud. An asset can be any resource in the Google Cloud [r...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a assets",
      arguments: z.object({
        identifier: z.string().describe("The name of the assets"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const result = await readViaList(
          BASE_URL,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? args.identifier).replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync assets state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        try {
          const params: Record<string, string> = { project: projectId };
          if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
          else if (existing["parent"]) {
            params["parent"] = String(existing["parent"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          const result = await readViaList(
            BASE_URL,
            LIST_CONFIG,
            params,
            "name",
            identifier,
          ) as StateData;
          const handle = await context.writeResource(
            "state",
            instanceName,
            result,
          );
          return { dataHandles: [handle] };
        } catch (error: unknown) {
          if (isResourceNotFoundError(error)) {
            const handle = await context.writeResource("state", instanceName, {
              status: "not_found",
              syncedAt: new Date().toISOString(),
            });
            return { dataHandles: [handle] };
          }
          throw error;
        }
      },
    },
  },
};
