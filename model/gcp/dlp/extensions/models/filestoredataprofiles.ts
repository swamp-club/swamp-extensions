// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

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
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
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

const LIST_CONFIG = {
  "id": "dlp.organizations.locations.fileStoreDataProfiles.list",
  "path": "v2/{+parent}/fileStoreDataProfiles",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
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
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
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

/** Swamp extension model for Google Cloud Sensitive Data Protection (DLP) FileStoreDataProfiles. Registered at `@swamp/gcp/dlp/filestoredataprofiles`. */
export const model = {
  type: "@swamp/gcp/dlp/filestoredataprofiles",
  version: "2026.06.08.1",
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
    {
      toVersion: "2026.05.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
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
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
    delete: {
      description: "Delete the fileStoreDataProfiles",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the fileStoreDataProfiles",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
          credentials,
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
            String(g["parent"] ?? ""),
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
      description: "List fileStoreDataProfiles resources",
      arguments: z.object({
        filter: z.string().describe(
          'Optional. Allows filtering. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` or `OR` logical operators. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * Supported fields: - `project_id`: The Google Cloud project ID - `account_id`: The AWS account ID - `file_store_path`: The path like "gs://bucket" - `data_source_type`: The profile\'s data source type, like "google/storage/bucket" - `data_storage_location`: The location where the file store\'s data is stored, like "us-central1" - `sensitivity_level`: HIGH|MODERATE|LOW - `data_risk_level`: HIGH|MODERATE|LOW - `resource_visibility`: PUBLIC|RESTRICTED - `status_code`: an RPC status code as defined in https://github.com/googleapis/googleapis/blob/master/google/rpc/code.proto - `profile_last_generated`: Date and time the profile was last generated * The operator must be `=` or `!=`. The `profile_last_generated` filter also supports `<` and `>`. The syntax is based on https://google.aip.dev/160. Examples: * `project_id = 12345 AND status_code = 1` * `project_id = 12345 AND sensitivity_level = HIGH` * `project_id = 12345 AND resource_visibility = PUBLIC` * `file_store_path = "gs://mybucket"` * `profile_last_generated < "2025-01-01T00:00:00.000Z"` The length of this field should be no more than 500 characters.',
        ).optional(),
        orderBy: z.string().describe(
          "Optional. Comma-separated list of fields to order by, followed by `asc` or `desc` postfix. This list is case insensitive. The default sorting order is ascending. Redundant space characters are insignificant. Only one order field at a time is allowed. Examples: * `project_id asc` * `name` * `sensitivity_level desc` Supported fields are: - `project_id`: The Google Cloud project ID. - `sensitivity_level`: How sensitive the data in a table is, at most. - `data_risk_level`: How much risk is associated with this data. - `profile_last_generated`: When the profile was last updated in epoch seconds. - `last_modified`: The last time the resource was modified. - `resource_visibility`: Visibility restriction for this resource. - `name`: The name of the profile. - `create_time`: The time the file store was first created.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. Size of the page. This value can be limited by the server. If zero, server returns a page of max size 100.",
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
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "fileStoreDataProfiles",
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
  },
};
