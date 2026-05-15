// Auto-generated extension model for @swamp/gcp/dlp/dlpjobs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Sensitive Data Protection (DLP) DlpJobs.
 *
 * Combines all of the information about a DLP job.
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

const BASE_URL = "https://dlp.googleapis.com/";

const LIST_CONFIG = {
  "id": "dlp.organizations.locations.dlpJobs.list",
  "path": "v2/{+parent}/dlpJobs",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "locationId": {
      "location": "query",
    },
    "orderBy": {
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
    "type": {
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
  actionDetails: z.array(z.object({
    deidentifyDetails: z.object({
      deidentifyStats: z.object({
        transformationCount: z.string(),
        transformationErrorCount: z.string(),
        transformedBytes: z.string(),
      }),
      requestedOptions: z.object({
        snapshotDeidentifyTemplate: z.object({
          createTime: z.unknown(),
          deidentifyConfig: z.unknown(),
          description: z.unknown(),
          displayName: z.unknown(),
          name: z.unknown(),
          updateTime: z.unknown(),
        }),
        snapshotImageRedactTemplate: z.object({
          createTime: z.unknown(),
          deidentifyConfig: z.unknown(),
          description: z.unknown(),
          displayName: z.unknown(),
          name: z.unknown(),
          updateTime: z.unknown(),
        }),
        snapshotStructuredDeidentifyTemplate: z.object({
          createTime: z.unknown(),
          deidentifyConfig: z.unknown(),
          description: z.unknown(),
          displayName: z.unknown(),
          name: z.unknown(),
          updateTime: z.unknown(),
        }),
      }),
    }),
  })).optional(),
  createTime: z.string().optional(),
  endTime: z.string().optional(),
  errors: z.array(z.object({
    details: z.object({
      code: z.number(),
      details: z.array(z.record(z.string(), z.unknown())),
      message: z.string(),
    }),
    extraInfo: z.string(),
    timestamps: z.array(z.string()),
  })).optional(),
  inspectDetails: z.object({
    requestedOptions: z.object({
      jobConfig: z.object({
        actions: z.array(z.object({
          deidentify: z.unknown(),
          jobNotificationEmails: z.unknown(),
          pubSub: z.unknown(),
          publishFindingsToCloudDataCatalog: z.unknown(),
          publishFindingsToDataplexCatalog: z.unknown(),
          publishSummaryToCscc: z.unknown(),
          publishToStackdriver: z.unknown(),
          saveFindings: z.unknown(),
        })),
        inspectConfig: z.object({
          contentOptions: z.array(z.unknown()),
          customInfoTypes: z.array(z.unknown()),
          excludeInfoTypes: z.boolean(),
          includeQuote: z.boolean(),
          infoTypes: z.array(z.unknown()),
          limits: z.object({
            maxFindingsPerInfoType: z.unknown(),
            maxFindingsPerItem: z.unknown(),
            maxFindingsPerRequest: z.unknown(),
          }),
          minLikelihood: z.string(),
          minLikelihoodPerInfoType: z.array(z.unknown()),
          ruleSet: z.array(z.unknown()),
        }),
        inspectTemplateName: z.string(),
        storageConfig: z.object({
          bigQueryOptions: z.object({
            excludedFields: z.unknown(),
            identifyingFields: z.unknown(),
            includedFields: z.unknown(),
            rowsLimit: z.unknown(),
            rowsLimitPercent: z.unknown(),
            sampleMethod: z.unknown(),
            tableReference: z.unknown(),
          }),
          cloudStorageOptions: z.object({
            bytesLimitPerFile: z.unknown(),
            bytesLimitPerFilePercent: z.unknown(),
            fileSet: z.unknown(),
            fileTypes: z.unknown(),
            filesLimitPercent: z.unknown(),
            sampleMethod: z.unknown(),
          }),
          datastoreOptions: z.object({
            kind: z.unknown(),
            partitionId: z.unknown(),
          }),
          hybridOptions: z.object({
            description: z.unknown(),
            labels: z.unknown(),
            requiredFindingLabelKeys: z.unknown(),
            tableOptions: z.unknown(),
          }),
          timespanConfig: z.object({
            enableAutoPopulationOfTimespanConfig: z.unknown(),
            endTime: z.unknown(),
            startTime: z.unknown(),
            timestampField: z.unknown(),
          }),
        }),
      }),
      snapshotInspectTemplate: z.object({
        allowLimitedAvailabilityInfoTypes: z.boolean(),
        createTime: z.string(),
        description: z.string(),
        displayName: z.string(),
        inspectConfig: z.object({
          contentOptions: z.array(z.unknown()),
          customInfoTypes: z.array(z.unknown()),
          excludeInfoTypes: z.boolean(),
          includeQuote: z.boolean(),
          infoTypes: z.array(z.unknown()),
          limits: z.object({
            maxFindingsPerInfoType: z.unknown(),
            maxFindingsPerItem: z.unknown(),
            maxFindingsPerRequest: z.unknown(),
          }),
          minLikelihood: z.string(),
          minLikelihoodPerInfoType: z.array(z.unknown()),
          ruleSet: z.array(z.unknown()),
        }),
        name: z.string(),
        updateTime: z.string(),
      }),
    }),
    result: z.object({
      hybridStats: z.object({
        abortedCount: z.string(),
        pendingCount: z.string(),
        processedCount: z.string(),
      }),
      infoTypeStats: z.array(z.object({
        count: z.string(),
        infoType: z.object({
          name: z.unknown(),
          sensitivityScore: z.unknown(),
          version: z.unknown(),
        }),
      })),
      numRowsProcessed: z.string(),
      processedBytes: z.string(),
      totalEstimatedBytes: z.string(),
    }),
  }).optional(),
  jobTriggerName: z.string().optional(),
  lastModified: z.string().optional(),
  name: z.string(),
  riskDetails: z.object({
    categoricalStatsResult: z.object({
      valueFrequencyHistogramBuckets: z.array(z.object({
        bucketSize: z.string(),
        bucketValueCount: z.string(),
        bucketValues: z.array(z.unknown()),
        valueFrequencyLowerBound: z.string(),
        valueFrequencyUpperBound: z.string(),
      })),
    }),
    deltaPresenceEstimationResult: z.object({
      deltaPresenceEstimationHistogram: z.array(z.object({
        bucketSize: z.string(),
        bucketValueCount: z.string(),
        bucketValues: z.array(z.unknown()),
        maxProbability: z.number(),
        minProbability: z.number(),
      })),
    }),
    kAnonymityResult: z.object({
      equivalenceClassHistogramBuckets: z.array(z.object({
        bucketSize: z.string(),
        bucketValueCount: z.string(),
        bucketValues: z.array(z.unknown()),
        equivalenceClassSizeLowerBound: z.string(),
        equivalenceClassSizeUpperBound: z.string(),
      })),
    }),
    kMapEstimationResult: z.object({
      kMapEstimationHistogram: z.array(z.object({
        bucketSize: z.string(),
        bucketValueCount: z.string(),
        bucketValues: z.array(z.unknown()),
        maxAnonymity: z.string(),
        minAnonymity: z.string(),
      })),
    }),
    lDiversityResult: z.object({
      sensitiveValueFrequencyHistogramBuckets: z.array(z.object({
        bucketSize: z.string(),
        bucketValueCount: z.string(),
        bucketValues: z.array(z.unknown()),
        sensitiveValueFrequencyLowerBound: z.string(),
        sensitiveValueFrequencyUpperBound: z.string(),
      })),
    }),
    numericalStatsResult: z.object({
      maxValue: z.object({
        booleanValue: z.boolean(),
        dateValue: z.object({
          day: z.number(),
          month: z.number(),
          year: z.number(),
        }),
        dayOfWeekValue: z.string(),
        floatValue: z.number(),
        integerValue: z.string(),
        stringValue: z.string(),
        timeValue: z.object({
          hours: z.number(),
          minutes: z.number(),
          nanos: z.number(),
          seconds: z.number(),
        }),
        timestampValue: z.string(),
      }),
      minValue: z.object({
        booleanValue: z.boolean(),
        dateValue: z.object({
          day: z.number(),
          month: z.number(),
          year: z.number(),
        }),
        dayOfWeekValue: z.string(),
        floatValue: z.number(),
        integerValue: z.string(),
        stringValue: z.string(),
        timeValue: z.object({
          hours: z.number(),
          minutes: z.number(),
          nanos: z.number(),
          seconds: z.number(),
        }),
        timestampValue: z.string(),
      }),
      quantileValues: z.array(z.object({
        booleanValue: z.boolean(),
        dateValue: z.object({
          day: z.unknown(),
          month: z.unknown(),
          year: z.unknown(),
        }),
        dayOfWeekValue: z.string(),
        floatValue: z.number(),
        integerValue: z.string(),
        stringValue: z.string(),
        timeValue: z.object({
          hours: z.unknown(),
          minutes: z.unknown(),
          nanos: z.unknown(),
          seconds: z.unknown(),
        }),
        timestampValue: z.string(),
      })),
    }),
    requestedOptions: z.object({
      jobConfig: z.object({
        actions: z.array(z.object({
          deidentify: z.unknown(),
          jobNotificationEmails: z.unknown(),
          pubSub: z.unknown(),
          publishFindingsToCloudDataCatalog: z.unknown(),
          publishFindingsToDataplexCatalog: z.unknown(),
          publishSummaryToCscc: z.unknown(),
          publishToStackdriver: z.unknown(),
          saveFindings: z.unknown(),
        })),
        privacyMetric: z.object({
          categoricalStatsConfig: z.object({
            field: z.unknown(),
          }),
          deltaPresenceEstimationConfig: z.object({
            auxiliaryTables: z.unknown(),
            quasiIds: z.unknown(),
            regionCode: z.unknown(),
          }),
          kAnonymityConfig: z.object({
            entityId: z.unknown(),
            quasiIds: z.unknown(),
          }),
          kMapEstimationConfig: z.object({
            auxiliaryTables: z.unknown(),
            quasiIds: z.unknown(),
            regionCode: z.unknown(),
          }),
          lDiversityConfig: z.object({
            quasiIds: z.unknown(),
            sensitiveAttribute: z.unknown(),
          }),
          numericalStatsConfig: z.object({
            field: z.unknown(),
          }),
        }),
        sourceTable: z.object({
          datasetId: z.string(),
          projectId: z.string(),
          tableId: z.string(),
        }),
      }),
    }),
    requestedPrivacyMetric: z.object({
      categoricalStatsConfig: z.object({
        field: z.object({
          name: z.string(),
        }),
      }),
      deltaPresenceEstimationConfig: z.object({
        auxiliaryTables: z.array(z.object({
          quasiIds: z.unknown(),
          relativeFrequency: z.unknown(),
          table: z.unknown(),
        })),
        quasiIds: z.array(z.object({
          customTag: z.unknown(),
          field: z.unknown(),
          inferred: z.unknown(),
          infoType: z.unknown(),
        })),
        regionCode: z.string(),
      }),
      kAnonymityConfig: z.object({
        entityId: z.object({
          field: z.object({
            name: z.unknown(),
          }),
        }),
        quasiIds: z.array(z.object({
          name: z.unknown(),
        })),
      }),
      kMapEstimationConfig: z.object({
        auxiliaryTables: z.array(z.object({
          quasiIds: z.unknown(),
          relativeFrequency: z.unknown(),
          table: z.unknown(),
        })),
        quasiIds: z.array(z.object({
          customTag: z.unknown(),
          field: z.unknown(),
          inferred: z.unknown(),
          infoType: z.unknown(),
        })),
        regionCode: z.string(),
      }),
      lDiversityConfig: z.object({
        quasiIds: z.array(z.object({
          name: z.unknown(),
        })),
        sensitiveAttribute: z.object({
          name: z.string(),
        }),
      }),
      numericalStatsConfig: z.object({
        field: z.object({
          name: z.string(),
        }),
      }),
    }),
    requestedSourceTable: z.object({
      datasetId: z.string(),
      projectId: z.string(),
      tableId: z.string(),
    }),
  }).optional(),
  startTime: z.string().optional(),
  state: z.string().optional(),
  type: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Sensitive Data Protection (DLP) DlpJobs. Registered at `@swamp/gcp/dlp/dlpjobs`. */
export const model = {
  type: "@swamp/gcp/dlp/dlpjobs",
  version: "2026.05.15.1",
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
      toVersion: "2026.05.15.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Combines all of the information about a DLP job.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a dlpJobs",
      arguments: z.object({
        identifier: z.string().describe("The name of the dlpJobs"),
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
      description: "Sync dlpJobs state from GCP",
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
