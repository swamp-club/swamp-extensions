// Auto-generated extension model for @swamp/gcp/migrationcenter/sources-errorframes
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Migration Center Sources.ErrorFrames.
 *
 * Message representing a frame which failed to be processed due to an error.
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
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/errorFrames/${shortName}`;
}

const BASE_URL = "https://migrationcenter.googleapis.com/";

const GET_CONFIG = {
  "id": "migrationcenter.projects.locations.sources.errorFrames.get",
  "path": "v1/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "view": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  ingestionTime: z.string().optional(),
  name: z.string(),
  originalFrame: z.object({
    attributes: z.record(z.string(), z.unknown()),
    collectionType: z.string(),
    databaseDeploymentDetails: z.object({
      aggregatedStats: z.object({
        databaseCount: z.number(),
      }),
      awsRds: z.object({}),
      edition: z.string(),
      generatedId: z.string(),
      manualUniqueId: z.string(),
      mysql: z.object({
        plugins: z.array(z.object({
          enabled: z.unknown(),
          plugin: z.unknown(),
          version: z.unknown(),
        })),
        properties: z.array(z.object({
          enabled: z.unknown(),
          numericValue: z.unknown(),
          property: z.unknown(),
        })),
        resourceGroupsCount: z.number(),
        variables: z.array(z.object({
          category: z.unknown(),
          value: z.unknown(),
          variable: z.unknown(),
        })),
      }),
      postgresql: z.object({
        properties: z.array(z.object({
          enabled: z.unknown(),
          numericValue: z.unknown(),
          property: z.unknown(),
        })),
        settings: z.array(z.object({
          boolValue: z.unknown(),
          intValue: z.unknown(),
          realValue: z.unknown(),
          setting: z.unknown(),
          source: z.unknown(),
          stringValue: z.unknown(),
          unit: z.unknown(),
        })),
      }),
      sqlServer: z.object({
        features: z.array(z.object({
          enabled: z.unknown(),
          featureName: z.unknown(),
        })),
        serverFlags: z.array(z.object({
          serverFlagName: z.unknown(),
          value: z.unknown(),
          valueInUse: z.unknown(),
        })),
        traceFlags: z.array(z.object({
          scope: z.unknown(),
          traceFlagName: z.unknown(),
        })),
      }),
      topology: z.object({
        coreCount: z.number(),
        coreLimit: z.number(),
        diskAllocatedBytes: z.string(),
        diskUsedBytes: z.string(),
        instances: z.array(z.object({
          instanceName: z.unknown(),
          network: z.unknown(),
          role: z.unknown(),
        })),
        memoryBytes: z.string(),
        memoryLimitBytes: z.string(),
        physicalCoreCount: z.number(),
        physicalCoreLimit: z.number(),
      }),
      version: z.string(),
    }),
    databaseDetails: z.object({
      allocatedStorageBytes: z.string(),
      databaseName: z.string(),
      parentDatabaseDeployment: z.object({
        generatedId: z.string(),
        manualUniqueId: z.string(),
      }),
      schemas: z.array(z.object({
        mysql: z.object({
          storageEngines: z.unknown(),
        }),
        objects: z.array(z.unknown()),
        postgresql: z.object({
          foreignTablesCount: z.unknown(),
          postgresqlExtensions: z.unknown(),
        }),
        schemaName: z.string(),
        sqlServer: z.object({
          clrObjectCount: z.unknown(),
        }),
        tablesSizeBytes: z.string(),
      })),
    }),
    labels: z.record(z.string(), z.unknown()),
    machineDetails: z.object({
      architecture: z.object({
        bios: z.object({
          biosName: z.string(),
          id: z.string(),
          manufacturer: z.string(),
          releaseDate: z.object({
            day: z.unknown(),
            month: z.unknown(),
            year: z.unknown(),
          }),
          smbiosUuid: z.string(),
          version: z.string(),
        }),
        cpuArchitecture: z.string(),
        cpuManufacturer: z.string(),
        cpuName: z.string(),
        cpuSocketCount: z.number(),
        cpuThreadCount: z.number(),
        firmwareType: z.string(),
        hyperthreading: z.string(),
        vendor: z.string(),
      }),
      coreCount: z.number(),
      createTime: z.string(),
      diskPartitions: z.object({
        freeSpaceBytes: z.string(),
        partitions: z.object({
          entries: z.array(z.unknown()),
        }),
        totalCapacityBytes: z.string(),
      }),
      disks: z.object({
        disks: z.object({
          entries: z.array(z.unknown()),
        }),
        totalCapacityBytes: z.string(),
        totalFreeBytes: z.string(),
      }),
      guestOs: z.object({
        config: z.object({
          fstab: z.object({
            entries: z.unknown(),
          }),
          hosts: z.object({
            entries: z.unknown(),
          }),
          issue: z.string(),
          nfsExports: z.object({
            entries: z.unknown(),
          }),
          selinuxMode: z.string(),
        }),
        family: z.string(),
        osName: z.string(),
        runtime: z.object({
          domain: z.string(),
          installedApps: z.object({
            entries: z.unknown(),
          }),
          lastBootTime: z.string(),
          machineName: z.string(),
          network: z.object({
            connections: z.unknown(),
            scanTime: z.unknown(),
          }),
          openFileList: z.object({
            entries: z.unknown(),
          }),
          processes: z.object({
            entries: z.unknown(),
          }),
          services: z.object({
            entries: z.unknown(),
          }),
        }),
        version: z.string(),
      }),
      machineName: z.string(),
      memoryMb: z.number(),
      network: z.object({
        adapters: z.object({
          entries: z.array(z.unknown()),
        }),
        defaultGateway: z.string(),
        primaryIpAddress: z.string(),
        primaryMacAddress: z.string(),
        publicIpAddress: z.string(),
      }),
      platform: z.object({
        awsEc2Details: z.object({
          hyperthreading: z.string(),
          location: z.string(),
          machineTypeLabel: z.string(),
        }),
        azureVmDetails: z.object({
          hyperthreading: z.string(),
          location: z.string(),
          machineTypeLabel: z.string(),
          provisioningState: z.string(),
        }),
        genericDetails: z.object({
          hyperthreading: z.string(),
          location: z.string(),
        }),
        physicalDetails: z.object({
          hyperthreading: z.string(),
          location: z.string(),
        }),
        vmwareDetails: z.object({
          esxHyperthreading: z.string(),
          esxVersion: z.string(),
          osid: z.string(),
          vcenterFolder: z.string(),
          vcenterUri: z.string(),
          vcenterVersion: z.string(),
          vcenterVmId: z.string(),
        }),
      }),
      powerState: z.string(),
      uuid: z.string(),
    }),
    performanceSamples: z.array(z.object({
      cpu: z.object({
        utilizedPercentage: z.number(),
      }),
      disk: z.object({
        averageIops: z.number(),
        averageReadIops: z.number(),
        averageWriteIops: z.number(),
      }),
      memory: z.object({
        utilizedPercentage: z.number(),
      }),
      network: z.object({
        averageEgressBps: z.number(),
        averageIngressBps: z.number(),
      }),
      sampleTime: z.string(),
    })),
    reportTime: z.string(),
    traceToken: z.string(),
  }).optional(),
  violations: z.array(z.object({
    field: z.string(),
    violation: z.string(),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Migration Center Sources.ErrorFrames. Registered at `@swamp/gcp/migrationcenter/sources-errorframes`. */
export const model = {
  type: "@swamp/gcp/migrationcenter/sources-errorframes",
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
      toVersion: "2026.05.18.1",
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
        "Message representing a frame which failed to be processed due to an error.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a errorFrames",
      arguments: z.object({
        identifier: z.string().describe("The name of the errorFrames"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
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
      description: "Sync errorFrames state from GCP",
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
          const shortName = existing.name?.toString() ?? g["name"]?.toString();
          if (!shortName) throw new Error("No identifier found");
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            shortName,
          );
          const result = await readResource(
            BASE_URL,
            GET_CONFIG,
            params,
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
