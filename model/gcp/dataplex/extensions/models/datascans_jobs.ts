// Auto-generated extension model for @swamp/gcp/dataplex/datascans-jobs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Dataplex DataScans.Jobs.
 *
 * A DataScanJob represents an instance of DataScan execution.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/jobs/${shortName}`;
}

const BASE_URL = "https://dataplex.googleapis.com/";

const GET_CONFIG = {
  "id": "dataplex.projects.locations.dataScans.jobs.get",
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

const LIST_CONFIG = {
  "id": "dataplex.projects.locations.dataScans.jobs.list",
  "path": "v1/{+parent}/jobs",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
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
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  dataDiscoveryResult: z.object({
    bigqueryPublishing: z.object({
      dataset: z.string(),
      location: z.string(),
    }),
    scanStatistics: z.object({
      dataProcessedBytes: z.string(),
      filesExcluded: z.number(),
      filesetsCreated: z.number(),
      filesetsDeleted: z.number(),
      filesetsUpdated: z.number(),
      scannedFileCount: z.number(),
      tablesCreated: z.number(),
      tablesDeleted: z.number(),
      tablesUpdated: z.number(),
    }),
  }).optional(),
  dataDiscoverySpec: z.object({
    bigqueryPublishingConfig: z.object({
      connection: z.string(),
      location: z.string(),
      project: z.string(),
      tableType: z.string(),
    }),
    storageConfig: z.object({
      csvOptions: z.object({
        delimiter: z.string(),
        encoding: z.string(),
        headerRows: z.number(),
        quote: z.string(),
        typeInferenceDisabled: z.boolean(),
      }),
      excludePatterns: z.array(z.string()),
      includePatterns: z.array(z.string()),
      jsonOptions: z.object({
        encoding: z.string(),
        typeInferenceDisabled: z.boolean(),
      }),
      unstructuredDataOptions: z.object({
        semanticInferenceEnabled: z.boolean(),
      }),
    }),
  }).optional(),
  dataDocumentationResult: z.object({
    datasetResult: z.object({
      overview: z.string(),
      queries: z.array(z.object({
        description: z.string(),
        sql: z.string(),
      })),
      schemaRelationships: z.array(z.object({
        leftSchemaPaths: z.object({
          paths: z.unknown(),
          tableFqn: z.unknown(),
        }),
        rightSchemaPaths: z.object({
          paths: z.unknown(),
          tableFqn: z.unknown(),
        }),
        sources: z.array(z.unknown()),
        type: z.string(),
      })),
    }),
    tableResult: z.object({
      name: z.string(),
      overview: z.string(),
      queries: z.array(z.object({
        description: z.string(),
        sql: z.string(),
      })),
      schema: z.object({
        fields: z.array(z.object({
          description: z.unknown(),
          fields: z.unknown(),
          name: z.unknown(),
        })),
      }),
    }),
  }).optional(),
  dataDocumentationSpec: z.object({
    catalogPublishingEnabled: z.boolean(),
    generationScopes: z.array(z.string()),
  }).optional(),
  dataProfileResult: z.object({
    catalogPublishingStatus: z.object({
      state: z.string(),
    }),
    postScanActionsResult: z.object({
      bigqueryExportResult: z.object({
        message: z.string(),
        state: z.string(),
      }),
    }),
    profile: z.object({
      fields: z.array(z.object({
        mode: z.string(),
        name: z.string(),
        profile: z.object({
          distinctRatio: z.unknown(),
          doubleProfile: z.unknown(),
          integerProfile: z.unknown(),
          nullRatio: z.unknown(),
          stringProfile: z.unknown(),
          topNValues: z.unknown(),
        }),
        type: z.string(),
      })),
    }),
    rowCount: z.string(),
    scannedData: z.object({
      incrementalField: z.object({
        end: z.string(),
        field: z.string(),
        start: z.string(),
      }),
    }),
  }).optional(),
  dataProfileSpec: z.object({
    catalogPublishingEnabled: z.boolean(),
    excludeFields: z.object({
      fieldNames: z.array(z.string()),
    }),
    includeFields: z.object({
      fieldNames: z.array(z.string()),
    }),
    mode: z.string(),
    postScanActions: z.object({
      bigqueryExport: z.object({
        resultsTable: z.string(),
      }),
    }),
    rowFilter: z.string(),
    samplingPercent: z.number(),
  }).optional(),
  dataQualityResult: z.object({
    anomalyDetectionGeneratedAssets: z.object({
      dataIntermediateTable: z.string(),
      freshnessIntermediateTable: z.string(),
      resultTable: z.string(),
      volumeIntermediateTable: z.string(),
    }),
    catalogPublishingStatus: z.object({
      state: z.string(),
    }),
    columns: z.array(z.object({
      column: z.string(),
      dimensions: z.array(z.object({
        dimension: z.unknown(),
        passed: z.unknown(),
        score: z.unknown(),
      })),
      passed: z.boolean(),
      score: z.number(),
    })),
    dimensions: z.array(z.object({
      dimension: z.object({
        name: z.string(),
      }),
      passed: z.boolean(),
      score: z.number(),
    })),
    passed: z.boolean(),
    postScanActionsResult: z.object({
      bigqueryExportResult: z.object({
        message: z.string(),
        state: z.string(),
      }),
    }),
    rowCount: z.string(),
    rules: z.array(z.object({
      assertionRowCount: z.string(),
      debugQueriesResultSets: z.array(z.object({
        results: z.unknown(),
      })),
      evaluatedCount: z.string(),
      failingRowsQuery: z.string(),
      nullCount: z.string(),
      passRatio: z.number(),
      passed: z.boolean(),
      passedCount: z.string(),
      rule: z.object({
        attributes: z.record(z.string(), z.unknown()),
        column: z.string(),
        debugQueries: z.array(z.unknown()),
        description: z.string(),
        dimension: z.string(),
        ignoreNull: z.boolean(),
        name: z.string(),
        nonNullExpectation: z.object({}),
        rangeExpectation: z.object({
          maxValue: z.unknown(),
          minValue: z.unknown(),
          strictMaxEnabled: z.unknown(),
          strictMinEnabled: z.unknown(),
        }),
        regexExpectation: z.object({
          regex: z.unknown(),
        }),
        rowConditionExpectation: z.object({
          sqlExpression: z.unknown(),
        }),
        ruleSource: z.object({
          rulePathElements: z.unknown(),
        }),
        setExpectation: z.object({
          values: z.unknown(),
        }),
        sqlAssertion: z.object({
          sqlStatement: z.unknown(),
        }),
        statisticRangeExpectation: z.object({
          maxValue: z.unknown(),
          minValue: z.unknown(),
          statistic: z.unknown(),
          strictMaxEnabled: z.unknown(),
          strictMinEnabled: z.unknown(),
        }),
        suspended: z.boolean(),
        tableConditionExpectation: z.object({
          sqlExpression: z.unknown(),
        }),
        templateReference: z.object({
          name: z.unknown(),
          resolvedSql: z.unknown(),
          ruleTemplate: z.unknown(),
          values: z.unknown(),
        }),
        threshold: z.number(),
        uniquenessExpectation: z.object({}),
      }),
    })),
    scannedData: z.object({
      incrementalField: z.object({
        end: z.string(),
        field: z.string(),
        start: z.string(),
      }),
    }),
    score: z.number(),
  }).optional(),
  dataQualitySpec: z.object({
    catalogPublishingEnabled: z.boolean(),
    enableCatalogBasedRules: z.boolean(),
    filter: z.string(),
    postScanActions: z.object({
      bigqueryExport: z.object({
        resultsTable: z.string(),
      }),
      notificationReport: z.object({
        jobEndTrigger: z.object({}),
        jobFailureTrigger: z.object({}),
        recipients: z.object({
          emails: z.array(z.unknown()),
        }),
        scoreThresholdTrigger: z.object({
          scoreThreshold: z.number(),
        }),
      }),
    }),
    rowFilter: z.string(),
    rules: z.array(z.object({
      attributes: z.record(z.string(), z.unknown()),
      column: z.string(),
      debugQueries: z.array(z.object({
        description: z.unknown(),
        sqlStatement: z.unknown(),
      })),
      description: z.string(),
      dimension: z.string(),
      ignoreNull: z.boolean(),
      name: z.string(),
      nonNullExpectation: z.object({}),
      rangeExpectation: z.object({
        maxValue: z.string(),
        minValue: z.string(),
        strictMaxEnabled: z.boolean(),
        strictMinEnabled: z.boolean(),
      }),
      regexExpectation: z.object({
        regex: z.string(),
      }),
      rowConditionExpectation: z.object({
        sqlExpression: z.string(),
      }),
      ruleSource: z.object({
        rulePathElements: z.array(z.unknown()),
      }),
      setExpectation: z.object({
        values: z.array(z.unknown()),
      }),
      sqlAssertion: z.object({
        sqlStatement: z.string(),
      }),
      statisticRangeExpectation: z.object({
        maxValue: z.string(),
        minValue: z.string(),
        statistic: z.string(),
        strictMaxEnabled: z.boolean(),
        strictMinEnabled: z.boolean(),
      }),
      suspended: z.boolean(),
      tableConditionExpectation: z.object({
        sqlExpression: z.string(),
      }),
      templateReference: z.object({
        name: z.string(),
        resolvedSql: z.string(),
        ruleTemplate: z.object({
          capabilities: z.unknown(),
          dimension: z.unknown(),
          inputParameters: z.unknown(),
          name: z.unknown(),
          sqlCollection: z.unknown(),
        }),
        values: z.record(z.string(), z.unknown()),
      }),
      threshold: z.number(),
      uniquenessExpectation: z.object({}),
    })),
    samplingPercent: z.number(),
  }).optional(),
  endTime: z.string().optional(),
  message: z.string().optional(),
  name: z.string(),
  partialFailureMessage: z.string().optional(),
  startTime: z.string().optional(),
  state: z.string().optional(),
  type: z.string().optional(),
  uid: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const _credentialKeys = new Set(["accessToken", "credentialsJson", "project"]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Dataplex DataScans.Jobs. Registered at `@swamp/gcp/dataplex/datascans-jobs`. */
export const model = {
  type: "@swamp/gcp/dataplex/datascans-jobs",
  version: "2026.06.07.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.01.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.1",
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
      toVersion: "2026.04.04.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.11.1",
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
      toVersion: "2026.05.18.2",
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
      toVersion: "2026.05.20.1",
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
    {
      toVersion: "2026.05.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.26.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A DataScanJob represents an instance of DataScan execution.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a jobs",
      arguments: z.object({
        identifier: z.string().describe("The name of the jobs"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
          credentials,
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
      description: "Sync jobs state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
            credentials,
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
    list: {
      description: "List jobs resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. An expression for filtering the results of the ListDataScanJobs request.If unspecified, all datascan jobs will be returned. Multiple filters can be applied (with AND, OR logical operators). Filters are case-sensitive.Allowed fields are: start_time end_timestart_time and end_time expect RFC-3339 formatted strings (e.g. 2018-10-08T18:30:00-07:00).For instance, 'start_time > 2018-10-08T00:00:00.123456789Z AND end_time < 2018-10-09T00:00:00.123456789Z' limits results to DataScanJobs between specified start and end times.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. Maximum number of DataScanJobs to return. The service may return fewer than this value. If unspecified, at most 10 DataScanJobs will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "dataScanJobs",
          (args.maxPages as number | undefined) ?? 10,
          credentials,
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i] as StateData;
          const instanceName = (item.name?.toString() ?? String(i)).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
          const handle = await context.writeResource(
            "state",
            instanceName,
            item,
          );
          dataHandles.push(handle);
        }
        return { dataHandles, result: { count: items.length, nextPageToken } };
      },
    },
    cancel: {
      description: "cancel",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
            "id": "dataplex.projects.locations.dataScans.jobs.cancel",
            "path": "v1/{+name}:cancel",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    generate_data_quality_rules: {
      description: "generate data quality rules",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
              "dataplex.projects.locations.dataScans.jobs.generateDataQualityRules",
            "path": "v1/{+name}:generateDataQualityRules",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
  },
};
