// Auto-generated extension model for @swamp/gcp/vmmigration/imageimports-imageimportjobs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud VM Migration ImageImports.ImageImportJobs.
 *
 * ImageImportJob describes the progress and result of an image import.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/imageImportJobs/${shortName}`;
}

const BASE_URL = "https://vmmigration.googleapis.com/";

const GET_CONFIG = {
  "id": "vmmigration.projects.locations.imageImports.imageImportJobs.get",
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
  cloudStorageUri: z.string().optional(),
  createTime: z.string().optional(),
  createdResources: z.array(z.string()).optional(),
  diskImageTargetDetails: z.object({
    additionalLicenses: z.array(z.string()),
    dataDiskImageImport: z.object({
      guestOsFeatures: z.array(z.string()),
    }),
    description: z.string(),
    encryption: z.object({
      kmsKey: z.string(),
    }),
    familyName: z.string(),
    imageName: z.string(),
    labels: z.record(z.string(), z.unknown()),
    osAdaptationParameters: z.object({
      adaptationModifiers: z.array(z.object({
        modifier: z.string(),
        value: z.string(),
      })),
      bootConversion: z.string(),
      generalize: z.boolean(),
      licenseType: z.string(),
    }),
    singleRegionStorage: z.boolean(),
    targetProject: z.string(),
  }).optional(),
  endTime: z.string().optional(),
  errors: z.array(z.object({
    code: z.number(),
    details: z.array(z.record(z.string(), z.unknown())),
    message: z.string(),
  })).optional(),
  machineImageTargetDetails: z.object({
    additionalLicenses: z.array(z.string()),
    description: z.string(),
    encryption: z.object({
      kmsKey: z.string(),
    }),
    labels: z.record(z.string(), z.unknown()),
    machineImageName: z.string(),
    machineImageParametersOverrides: z.object({
      machineType: z.string(),
    }),
    networkInterfaces: z.array(z.object({
      externalIp: z.string(),
      internalIp: z.string(),
      network: z.string(),
      networkTier: z.string(),
      subnetwork: z.string(),
    })),
    osAdaptationParameters: z.object({
      adaptationModifiers: z.array(z.object({
        modifier: z.string(),
        value: z.string(),
      })),
      bootConversion: z.string(),
      generalize: z.boolean(),
      licenseType: z.string(),
    }),
    serviceAccount: z.object({
      email: z.string(),
      scopes: z.array(z.string()),
    }),
    shieldedInstanceConfig: z.object({
      enableIntegrityMonitoring: z.boolean(),
      enableVtpm: z.boolean(),
      secureBoot: z.string(),
    }),
    singleRegionStorage: z.boolean(),
    skipOsAdaptation: z.object({}),
    tags: z.array(z.string()),
    targetProject: z.string(),
  }).optional(),
  name: z.string(),
  state: z.string().optional(),
  steps: z.array(z.object({
    adaptingOs: z.object({}),
    creatingImage: z.object({}),
    endTime: z.string(),
    initializing: z.object({}),
    loadingSourceFiles: z.object({}),
    startTime: z.string(),
  })).optional(),
  warnings: z.array(z.object({
    actionItem: z.object({
      locale: z.string(),
      message: z.string(),
    }),
    code: z.string(),
    helpLinks: z.array(z.object({
      description: z.string(),
      url: z.string(),
    })),
    warningMessage: z.object({
      locale: z.string(),
      message: z.string(),
    }),
    warningTime: z.string(),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud VM Migration ImageImports.ImageImportJobs. Registered at `@swamp/gcp/vmmigration/imageimports-imageimportjobs`. */
export const model = {
  type: "@swamp/gcp/vmmigration/imageimports-imageimportjobs",
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
        "ImageImportJob describes the progress and result of an image import.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a imageImportJobs",
      arguments: z.object({
        identifier: z.string().describe("The name of the imageImportJobs"),
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
      description: "Sync imageImportJobs state from GCP",
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
    cancel: {
      description: "cancel",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "vmmigration.projects.locations.imageImports.imageImportJobs.cancel",
            "path": "v1/{+name}:cancel",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
  },
};
