// Auto-generated extension model for @swamp/gcp/testing/testenvironmentcatalog
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Testing TestEnvironmentCatalog.
 *
 * A description of a test environment.
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

const BASE_URL = "https://testing.googleapis.com/";

const GET_CONFIG = {
  "id": "testing.testEnvironmentCatalog.get",
  "path": "v1/testEnvironmentCatalog/{environmentType}",
  "httpMethod": "GET",
  "parameterOrder": [
    "environmentType",
  ],
  "parameters": {
    "environmentType": {
      "location": "path",
      "required": true,
    },
    "includeViewableModels": {
      "location": "query",
    },
    "projectId": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
});

const StateSchema = z.object({
  androidDeviceCatalog: z.object({
    models: z.array(z.object({
      accessDeniedReasons: z.array(z.string()),
      brand: z.string(),
      codename: z.string(),
      form: z.string(),
      formFactor: z.string(),
      id: z.string(),
      labInfo: z.object({
        name: z.string(),
        regionCode: z.string(),
      }),
      lowFpsVideoRecording: z.boolean(),
      manufacturer: z.string(),
      name: z.string(),
      perVersionInfo: z.array(z.object({
        deviceCapacity: z.unknown(),
        directAccessVersionInfo: z.unknown(),
        interactiveDeviceAvailabilityEstimate: z.unknown(),
        versionId: z.unknown(),
      })),
      screenDensity: z.number(),
      screenX: z.number(),
      screenY: z.number(),
      supportedAbis: z.array(z.string()),
      supportedVersionIds: z.array(z.string()),
      tags: z.array(z.string()),
      thumbnailUrl: z.string(),
    })),
    runtimeConfiguration: z.object({
      locales: z.array(z.object({
        id: z.string(),
        name: z.string(),
        region: z.string(),
        tags: z.array(z.unknown()),
      })),
      orientations: z.array(z.object({
        id: z.string(),
        name: z.string(),
        tags: z.array(z.unknown()),
      })),
    }),
    versions: z.array(z.object({
      apiLevel: z.number(),
      codeName: z.string(),
      distribution: z.object({
        marketShare: z.number(),
        measurementTime: z.string(),
      }),
      id: z.string(),
      releaseDate: z.object({
        day: z.number(),
        month: z.number(),
        year: z.number(),
      }),
      tags: z.array(z.string()),
      versionString: z.string(),
    })),
  }).optional(),
  deviceIpBlockCatalog: z.object({
    ipBlocks: z.array(z.object({
      addedDate: z.object({
        day: z.number(),
        month: z.number(),
        year: z.number(),
      }),
      block: z.string(),
      form: z.string(),
    })),
  }).optional(),
  iosDeviceCatalog: z.object({
    models: z.array(z.object({
      deviceCapabilities: z.array(z.string()),
      formFactor: z.string(),
      id: z.string(),
      name: z.string(),
      perVersionInfo: z.array(z.object({
        deviceCapacity: z.unknown(),
        versionId: z.unknown(),
      })),
      screenDensity: z.number(),
      screenX: z.number(),
      screenY: z.number(),
      supportedVersionIds: z.array(z.string()),
      tags: z.array(z.string()),
    })),
    runtimeConfiguration: z.object({
      locales: z.array(z.object({
        id: z.string(),
        name: z.string(),
        region: z.string(),
        tags: z.array(z.unknown()),
      })),
      orientations: z.array(z.object({
        id: z.string(),
        name: z.string(),
        tags: z.array(z.unknown()),
      })),
    }),
    versions: z.array(z.object({
      id: z.string(),
      majorVersion: z.number(),
      minorVersion: z.number(),
      supportedXcodeVersionIds: z.array(z.string()),
      tags: z.array(z.string()),
    })),
    xcodeVersions: z.array(z.object({
      tags: z.array(z.string()),
      version: z.string(),
    })),
  }).optional(),
  networkConfigurationCatalog: z.object({
    configurations: z.array(z.object({
      downRule: z.object({
        bandwidth: z.number(),
        burst: z.number(),
        delay: z.string(),
        packetDuplicationRatio: z.number(),
        packetLossRatio: z.number(),
      }),
      id: z.string(),
      upRule: z.object({
        bandwidth: z.number(),
        burst: z.number(),
        delay: z.string(),
        packetDuplicationRatio: z.number(),
        packetLossRatio: z.number(),
      }),
    })),
  }).optional(),
  softwareCatalog: z.object({
    androidxOrchestratorVersion: z.string(),
    orchestratorVersion: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Testing TestEnvironmentCatalog. Registered at `@swamp/gcp/testing/testenvironmentcatalog`. */
export const model = {
  type: "@swamp/gcp/testing/testenvironmentcatalog",
  version: "2026.05.19.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A description of a test environment.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a testEnvironmentCatalog",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the testEnvironmentCatalog",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["environmentType"] = args.identifier;
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
      description: "Sync testEnvironmentCatalog state from GCP",
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
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["environmentType"] = identifier;
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
