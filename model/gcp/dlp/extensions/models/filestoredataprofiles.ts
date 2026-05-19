// Auto-generated extension model for @swamp/gcp/dlp/filestoredataprofiles
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Sensitive Data Protection (DLP) FileStoreDataProfiles.
 *
 * The profile for a file store. * Cloud Storage: maps 1:1 with a bucket. * Amazon S3: maps 1:1 with a bucket.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  deleteResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/fileStoreDataProfiles/${shortName}`;
}

const BASE_URL = "https://dlp.googleapis.com/";

const GET_CONFIG = {
  "id": "dlp.organizations.locations.fileStoreDataProfiles.get",
  "path": "v2/{+name}",
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

const DELETE_CONFIG = {
  "id": "dlp.organizations.locations.fileStoreDataProfiles.delete",
  "path": "v2/{+name}",
  "httpMethod": "DELETE",
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
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  configSnapshot: z.object({
    dataProfileJob: z.object({
      dataProfileActions: z.array(z.object({
        exportData: z.object({
          profileTable: z.unknown(),
          sampleFindingsTable: z.unknown(),
        }),
        pubSubNotification: z.object({
          detailOfMessage: z.unknown(),
          event: z.unknown(),
          pubsubCondition: z.unknown(),
          topic: z.unknown(),
        }),
        publishToChronicle: z.object({}),
        publishToDataplexCatalog: z.object({
          lowerDataRiskToLow: z.unknown(),
        }),
        publishToScc: z.object({}),
        tagResources: z.object({
          lowerDataRiskToLow: z.unknown(),
          profileGenerationsToTag: z.unknown(),
          tagConditions: z.unknown(),
        }),
      })),
      inspectTemplates: z.array(z.string()),
      location: z.object({
        folderId: z.string(),
        organizationId: z.string(),
      }),
      otherCloudStartingLocation: z.object({
        awsLocation: z.object({
          accountId: z.string(),
          allAssetInventoryAssets: z.boolean(),
        }),
      }),
      projectId: z.string(),
    }),
    discoveryConfig: z.object({
      actions: z.array(z.object({
        exportData: z.object({
          profileTable: z.unknown(),
          sampleFindingsTable: z.unknown(),
        }),
        pubSubNotification: z.object({
          detailOfMessage: z.unknown(),
          event: z.unknown(),
          pubsubCondition: z.unknown(),
          topic: z.unknown(),
        }),
        publishToChronicle: z.object({}),
        publishToDataplexCatalog: z.object({
          lowerDataRiskToLow: z.unknown(),
        }),
        publishToScc: z.object({}),
        tagResources: z.object({
          lowerDataRiskToLow: z.unknown(),
          profileGenerationsToTag: z.unknown(),
          tagConditions: z.unknown(),
        }),
      })),
      createTime: z.string(),
      displayName: z.string(),
      errors: z.array(z.object({
        details: z.object({
          code: z.unknown(),
          details: z.unknown(),
          message: z.unknown(),
        }),
        extraInfo: z.string(),
        timestamps: z.array(z.unknown()),
      })),
      inspectTemplates: z.array(z.string()),
      lastRunTime: z.string(),
      name: z.string(),
      orgConfig: z.object({
        location: z.object({
          folderId: z.string(),
          organizationId: z.string(),
        }),
        projectId: z.string(),
      }),
      otherCloudStartingLocation: z.object({
        awsLocation: z.object({
          accountId: z.string(),
          allAssetInventoryAssets: z.boolean(),
        }),
      }),
      processingLocation: z.object({
        documentFallbackLocation: z.object({
          globalProcessing: z.object({}),
          multiRegionProcessing: z.object({}),
        }),
        imageFallbackLocation: z.object({
          globalProcessing: z.object({}),
          multiRegionProcessing: z.object({}),
        }),
      }),
      status: z.string(),
      targets: z.array(z.object({
        bigQueryTarget: z.object({
          cadence: z.unknown(),
          conditions: z.unknown(),
          disabled: z.unknown(),
          filter: z.unknown(),
        }),
        cloudSqlTarget: z.object({
          conditions: z.unknown(),
          disabled: z.unknown(),
          filter: z.unknown(),
          generationCadence: z.unknown(),
        }),
        cloudStorageTarget: z.object({
          conditions: z.unknown(),
          disabled: z.unknown(),
          filter: z.unknown(),
          generationCadence: z.unknown(),
        }),
        otherCloudTarget: z.object({
          conditions: z.unknown(),
          dataSourceType: z.unknown(),
          disabled: z.unknown(),
          filter: z.unknown(),
          generationCadence: z.unknown(),
        }),
        secretsTarget: z.object({}),
        vertexDatasetTarget: z.object({
          conditions: z.unknown(),
          disabled: z.unknown(),
          filter: z.unknown(),
          generationCadence: z.unknown(),
        }),
      })),
      updateTime: z.string(),
    }),
    inspectConfig: z.object({
      contentOptions: z.array(z.string()),
      customInfoTypes: z.array(z.object({
        detectionRules: z.array(z.unknown()),
        dictionary: z.object({
          cloudStoragePath: z.unknown(),
          wordList: z.unknown(),
        }),
        exclusionType: z.string(),
        infoType: z.object({
          name: z.unknown(),
          sensitivityScore: z.unknown(),
          version: z.unknown(),
        }),
        likelihood: z.string(),
        metadataKeyValueExpression: z.object({
          keyRegex: z.unknown(),
          valueRegex: z.unknown(),
        }),
        regex: z.object({
          groupIndexes: z.unknown(),
          pattern: z.unknown(),
        }),
        sensitivityScore: z.object({
          score: z.unknown(),
        }),
        storedType: z.object({
          createTime: z.unknown(),
          name: z.unknown(),
        }),
        surrogateType: z.object({}),
      })),
      excludeInfoTypes: z.boolean(),
      includeQuote: z.boolean(),
      infoTypes: z.array(z.object({
        name: z.string(),
        sensitivityScore: z.object({
          score: z.unknown(),
        }),
        version: z.string(),
      })),
      limits: z.object({
        maxFindingsPerInfoType: z.array(z.object({
          infoType: z.unknown(),
          maxFindings: z.unknown(),
        })),
        maxFindingsPerItem: z.number(),
        maxFindingsPerRequest: z.number(),
      }),
      minLikelihood: z.string(),
      minLikelihoodPerInfoType: z.array(z.object({
        infoType: z.object({
          name: z.unknown(),
          sensitivityScore: z.unknown(),
          version: z.unknown(),
        }),
        minLikelihood: z.string(),
      })),
      ruleSet: z.array(z.object({
        infoTypes: z.array(z.unknown()),
        rules: z.array(z.unknown()),
      })),
    }),
    inspectTemplateModifiedTime: z.string(),
    inspectTemplateName: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  dataRiskLevel: z.object({
    score: z.string(),
  }).optional(),
  dataSourceType: z.object({
    dataSource: z.string(),
  }).optional(),
  dataStorageLocations: z.array(z.string()).optional(),
  domains: z.array(z.object({
    category: z.string(),
    signals: z.array(z.string()),
  })).optional(),
  fileClusterSummaries: z.array(z.object({
    dataRiskLevel: z.object({
      score: z.string(),
    }),
    errors: z.array(z.object({
      details: z.object({
        code: z.unknown(),
        details: z.unknown(),
        message: z.unknown(),
      }),
      extraInfo: z.string(),
      timestamps: z.array(z.unknown()),
    })),
    fileClusterType: z.object({
      cluster: z.string(),
    }),
    fileExtensionsScanned: z.array(z.object({
      fileExtension: z.string(),
    })),
    fileExtensionsSeen: z.array(z.object({
      fileExtension: z.string(),
    })),
    fileStoreInfoTypeSummaries: z.array(z.object({
      infoType: z.object({
        name: z.unknown(),
        sensitivityScore: z.unknown(),
        version: z.unknown(),
      }),
    })),
    noFilesExist: z.boolean(),
    sensitivityScore: z.object({
      score: z.string(),
    }),
  })).optional(),
  fileStoreInfoTypeSummaries: z.array(z.object({
    infoType: z.object({
      name: z.string(),
      sensitivityScore: z.object({
        score: z.string(),
      }),
      version: z.string(),
    }),
  })).optional(),
  fileStoreIsEmpty: z.boolean().optional(),
  fileStoreLocation: z.string().optional(),
  fileStorePath: z.string().optional(),
  fullResource: z.string().optional(),
  lastModifiedTime: z.string().optional(),
  locationType: z.string().optional(),
  name: z.string(),
  profileLastGenerated: z.string().optional(),
  profileStatus: z.object({
    status: z.object({
      code: z.number(),
      details: z.array(z.record(z.string(), z.unknown())),
      message: z.string(),
    }),
    timestamp: z.string(),
  }).optional(),
  projectDataProfile: z.string().optional(),
  projectId: z.string().optional(),
  relatedResources: z.array(z.object({
    fullResource: z.string(),
  })).optional(),
  resourceAttributes: z.record(z.string(), z.unknown()).optional(),
  resourceLabels: z.record(z.string(), z.unknown()).optional(),
  resourceVisibility: z.string().optional(),
  sampleFindingsTable: z.object({
    datasetId: z.string(),
    projectId: z.string(),
    tableId: z.string(),
  }).optional(),
  sensitivityScore: z.object({
    score: z.string(),
  }).optional(),
  state: z.string().optional(),
  tags: z.array(z.object({
    key: z.string(),
    namespacedTagValue: z.string(),
    value: z.string(),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Sensitive Data Protection (DLP) FileStoreDataProfiles. Registered at `@swamp/gcp/dlp/filestoredataprofiles`. */
export const model = {
  type: "@swamp/gcp/dlp/filestoredataprofiles",
  version: "2026.05.19.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "The profile for a file store. * Cloud Storage: maps 1:1 with a bucket. * Amaz...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a fileStoreDataProfiles",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the fileStoreDataProfiles",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
    delete: {
      description: "Delete the fileStoreDataProfiles",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the fileStoreDataProfiles",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
        );
        const instanceName = (g.name?.toString() ?? args.identifier).replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource("state", instanceName, {
          identifier: args.identifier,
          existed,
          status: existed ? "deleted" : "not_found",
          deletedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync fileStoreDataProfiles state from GCP",
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
            String(g["parent"] ?? ""),
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
