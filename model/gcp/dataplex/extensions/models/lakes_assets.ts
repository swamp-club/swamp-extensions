// Auto-generated extension model for @swamp/gcp/dataplex/lakes-assets
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Dataplex Lakes.Assets.
 *
 * An asset represents a cloud resource that is being managed within a lake as a member of a zone.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  deleteResource,
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/assets/${shortName}`;
}

const BASE_URL = "https://dataplex.googleapis.com/";

const GET_CONFIG = {
  "id": "dataplex.projects.locations.lakes.zones.assets.get",
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

const INSERT_CONFIG = {
  "id": "dataplex.projects.locations.lakes.zones.assets.create",
  "path": "v1/{+parent}/assets",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "assetId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "dataplex.projects.locations.lakes.zones.assets.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "dataplex.projects.locations.lakes.zones.assets.delete",
  "path": "v1/{+name}",
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
  "id": "dataplex.projects.locations.lakes.zones.assets.list",
  "path": "v1/{+parent}/assets",
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
  description: z.string().describe("Optional. Description of the asset.")
    .optional(),
  discoverySpec: z.object({
    csvOptions: z.object({
      delimiter: z.string().describe(
        "Optional. The delimiter being used to separate values. This defaults to ','.",
      ).optional(),
      disableTypeInference: z.boolean().describe(
        "Optional. Whether to disable the inference of data type for CSV data. If true, all columns will be registered as strings.",
      ).optional(),
      encoding: z.string().describe(
        "Optional. The character encoding of the data. The default is UTF-8.",
      ).optional(),
      headerRows: z.number().int().describe(
        "Optional. The number of rows to interpret as header rows that should be skipped when reading data rows.",
      ).optional(),
    }).describe("Describe CSV and similar semi-structured data formats.")
      .optional(),
    enabled: z.boolean().describe("Optional. Whether discovery is enabled.")
      .optional(),
    excludePatterns: z.array(z.string()).describe(
      "Optional. The list of patterns to apply for selecting data to exclude during discovery. For Cloud Storage bucket assets, these are interpreted as glob patterns used to match object names. For BigQuery dataset assets, these are interpreted as patterns to match table names.",
    ).optional(),
    includePatterns: z.array(z.string()).describe(
      "Optional. The list of patterns to apply for selecting data to include during discovery if only a subset of the data should considered. For Cloud Storage bucket assets, these are interpreted as glob patterns used to match object names. For BigQuery dataset assets, these are interpreted as patterns to match table names.",
    ).optional(),
    jsonOptions: z.object({
      disableTypeInference: z.boolean().describe(
        "Optional. Whether to disable the inference of data type for Json data. If true, all columns will be registered as their primitive types (strings, number or boolean).",
      ).optional(),
      encoding: z.string().describe(
        "Optional. The character encoding of the data. The default is UTF-8.",
      ).optional(),
    }).describe("Describe JSON data format.").optional(),
    schedule: z.string().describe(
      'Optional. Cron schedule (https://en.wikipedia.org/wiki/Cron) for running discovery periodically. Successive discovery runs must be scheduled at least 60 minutes apart. The default value is to run discovery every 60 minutes.To explicitly set a timezone to the cron tab, apply a prefix in the cron tab: "CRON_TZ=${IANA_TIME_ZONE}" or TZ=${IANA_TIME_ZONE}". The ${IANA_TIME_ZONE} may only be a valid string from IANA time zone database. For example, CRON_TZ=America/New_York 1 * * * *, or TZ=America/New_York 1 * * * *.',
    ).optional(),
  }).describe(
    "Settings to manage the metadata discovery and publishing for an asset.",
  ).optional(),
  discoveryStatus: z.object({
    lastRunDuration: z.string().describe(
      "The duration of the last discovery run.",
    ).optional(),
    lastRunTime: z.string().describe(
      "The start time of the last discovery run.",
    ).optional(),
    message: z.string().describe(
      "Additional information about the current state.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "SCHEDULED",
      "IN_PROGRESS",
      "PAUSED",
      "DISABLED",
    ]).describe("The current status of the discovery feature.").optional(),
    stats: z.object({
      dataItems: z.string().describe(
        "The count of data items within the referenced resource.",
      ).optional(),
      dataSize: z.string().describe(
        "The number of stored data bytes within the referenced resource.",
      ).optional(),
      filesets: z.string().describe(
        "The count of fileset entities within the referenced resource.",
      ).optional(),
      tables: z.string().describe(
        "The count of table entities within the referenced resource.",
      ).optional(),
    }).describe(
      "The aggregated data statistics for the asset reported by discovery.",
    ).optional(),
    updateTime: z.string().describe("Last update time of the status.")
      .optional(),
  }).describe("Status of discovery for an asset.").optional(),
  displayName: z.string().describe("Optional. User friendly display name.")
    .optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. User defined labels for the asset.",
  ).optional(),
  resourceSpec: z.object({
    name: z.string().describe(
      "Immutable. Relative name of the cloud resource that contains the data that is being managed within a lake. For example: projects/{project_number}/buckets/{bucket_id} projects/{project_number}/datasets/{dataset_id}",
    ).optional(),
    readAccessMode: z.enum(["ACCESS_MODE_UNSPECIFIED", "DIRECT", "MANAGED"])
      .describe(
        "Optional. Determines how read permissions are handled for each asset and their associated tables. Only available to storage buckets assets.",
      ).optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "STORAGE_BUCKET", "BIGQUERY_DATASET"])
      .describe("Required. Immutable. Type of resource.").optional(),
  }).describe("Identifies the cloud resource that is referenced by this asset.")
    .optional(),
  resourceStatus: z.object({
    managedAccessIdentity: z.string().describe(
      "Output only. Service account associated with the BigQuery Connection.",
    ).optional(),
    message: z.string().describe(
      "Additional information about the current state.",
    ).optional(),
    state: z.enum(["STATE_UNSPECIFIED", "READY", "ERROR"]).describe(
      "The current state of the managed resource.",
    ).optional(),
    updateTime: z.string().describe("Last update time of the status.")
      .optional(),
  }).describe("Status of the resource referenced by an asset.").optional(),
  securityStatus: z.object({
    message: z.string().describe(
      "Additional information about the current state.",
    ).optional(),
    state: z.enum(["STATE_UNSPECIFIED", "READY", "APPLYING", "ERROR"]).describe(
      "The current state of the security policy applied to the attached resource.",
    ).optional(),
    updateTime: z.string().describe("Last update time of the status.")
      .optional(),
  }).describe(
    "Security policy status of the asset. Data security policy, i.e., readers, writers & owners, should be specified in the lake/zone/asset IAM policy.",
  ).optional(),
  assetId: z.string().describe(
    "Required. Asset identifier. This ID will be used to generate names such as table names when publishing metadata to Hive Metastore and BigQuery. * Must contain only lowercase letters, numbers and hyphens. * Must start with a letter. * Must end with a number or a letter. * Must be between 1-63 characters. * Must be unique within the zone.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  description: z.string().optional(),
  discoverySpec: z.object({
    csvOptions: z.object({
      delimiter: z.string(),
      disableTypeInference: z.boolean(),
      encoding: z.string(),
      headerRows: z.number(),
    }),
    enabled: z.boolean(),
    excludePatterns: z.array(z.string()),
    includePatterns: z.array(z.string()),
    jsonOptions: z.object({
      disableTypeInference: z.boolean(),
      encoding: z.string(),
    }),
    schedule: z.string(),
  }).optional(),
  discoveryStatus: z.object({
    lastRunDuration: z.string(),
    lastRunTime: z.string(),
    message: z.string(),
    state: z.string(),
    stats: z.object({
      dataItems: z.string(),
      dataSize: z.string(),
      filesets: z.string(),
      tables: z.string(),
    }),
    updateTime: z.string(),
  }).optional(),
  displayName: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  resourceSpec: z.object({
    name: z.string(),
    readAccessMode: z.string(),
    type: z.string(),
  }).optional(),
  resourceStatus: z.object({
    managedAccessIdentity: z.string(),
    message: z.string(),
    state: z.string(),
    updateTime: z.string(),
  }).optional(),
  securityStatus: z.object({
    message: z.string(),
    state: z.string(),
    updateTime: z.string(),
  }).optional(),
  state: z.string().optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  description: z.string().describe("Optional. Description of the asset.")
    .optional(),
  discoverySpec: z.object({
    csvOptions: z.object({
      delimiter: z.string().describe(
        "Optional. The delimiter being used to separate values. This defaults to ','.",
      ).optional(),
      disableTypeInference: z.boolean().describe(
        "Optional. Whether to disable the inference of data type for CSV data. If true, all columns will be registered as strings.",
      ).optional(),
      encoding: z.string().describe(
        "Optional. The character encoding of the data. The default is UTF-8.",
      ).optional(),
      headerRows: z.number().int().describe(
        "Optional. The number of rows to interpret as header rows that should be skipped when reading data rows.",
      ).optional(),
    }).describe("Describe CSV and similar semi-structured data formats.")
      .optional(),
    enabled: z.boolean().describe("Optional. Whether discovery is enabled.")
      .optional(),
    excludePatterns: z.array(z.string()).describe(
      "Optional. The list of patterns to apply for selecting data to exclude during discovery. For Cloud Storage bucket assets, these are interpreted as glob patterns used to match object names. For BigQuery dataset assets, these are interpreted as patterns to match table names.",
    ).optional(),
    includePatterns: z.array(z.string()).describe(
      "Optional. The list of patterns to apply for selecting data to include during discovery if only a subset of the data should considered. For Cloud Storage bucket assets, these are interpreted as glob patterns used to match object names. For BigQuery dataset assets, these are interpreted as patterns to match table names.",
    ).optional(),
    jsonOptions: z.object({
      disableTypeInference: z.boolean().describe(
        "Optional. Whether to disable the inference of data type for Json data. If true, all columns will be registered as their primitive types (strings, number or boolean).",
      ).optional(),
      encoding: z.string().describe(
        "Optional. The character encoding of the data. The default is UTF-8.",
      ).optional(),
    }).describe("Describe JSON data format.").optional(),
    schedule: z.string().describe(
      'Optional. Cron schedule (https://en.wikipedia.org/wiki/Cron) for running discovery periodically. Successive discovery runs must be scheduled at least 60 minutes apart. The default value is to run discovery every 60 minutes.To explicitly set a timezone to the cron tab, apply a prefix in the cron tab: "CRON_TZ=${IANA_TIME_ZONE}" or TZ=${IANA_TIME_ZONE}". The ${IANA_TIME_ZONE} may only be a valid string from IANA time zone database. For example, CRON_TZ=America/New_York 1 * * * *, or TZ=America/New_York 1 * * * *.',
    ).optional(),
  }).describe(
    "Settings to manage the metadata discovery and publishing for an asset.",
  ).optional(),
  discoveryStatus: z.object({
    lastRunDuration: z.string().describe(
      "The duration of the last discovery run.",
    ).optional(),
    lastRunTime: z.string().describe(
      "The start time of the last discovery run.",
    ).optional(),
    message: z.string().describe(
      "Additional information about the current state.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "SCHEDULED",
      "IN_PROGRESS",
      "PAUSED",
      "DISABLED",
    ]).describe("The current status of the discovery feature.").optional(),
    stats: z.object({
      dataItems: z.string().describe(
        "The count of data items within the referenced resource.",
      ).optional(),
      dataSize: z.string().describe(
        "The number of stored data bytes within the referenced resource.",
      ).optional(),
      filesets: z.string().describe(
        "The count of fileset entities within the referenced resource.",
      ).optional(),
      tables: z.string().describe(
        "The count of table entities within the referenced resource.",
      ).optional(),
    }).describe(
      "The aggregated data statistics for the asset reported by discovery.",
    ).optional(),
    updateTime: z.string().describe("Last update time of the status.")
      .optional(),
  }).describe("Status of discovery for an asset.").optional(),
  displayName: z.string().describe("Optional. User friendly display name.")
    .optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. User defined labels for the asset.",
  ).optional(),
  resourceSpec: z.object({
    name: z.string().describe(
      "Immutable. Relative name of the cloud resource that contains the data that is being managed within a lake. For example: projects/{project_number}/buckets/{bucket_id} projects/{project_number}/datasets/{dataset_id}",
    ).optional(),
    readAccessMode: z.enum(["ACCESS_MODE_UNSPECIFIED", "DIRECT", "MANAGED"])
      .describe(
        "Optional. Determines how read permissions are handled for each asset and their associated tables. Only available to storage buckets assets.",
      ).optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "STORAGE_BUCKET", "BIGQUERY_DATASET"])
      .describe("Required. Immutable. Type of resource.").optional(),
  }).describe("Identifies the cloud resource that is referenced by this asset.")
    .optional(),
  resourceStatus: z.object({
    managedAccessIdentity: z.string().describe(
      "Output only. Service account associated with the BigQuery Connection.",
    ).optional(),
    message: z.string().describe(
      "Additional information about the current state.",
    ).optional(),
    state: z.enum(["STATE_UNSPECIFIED", "READY", "ERROR"]).describe(
      "The current state of the managed resource.",
    ).optional(),
    updateTime: z.string().describe("Last update time of the status.")
      .optional(),
  }).describe("Status of the resource referenced by an asset.").optional(),
  securityStatus: z.object({
    message: z.string().describe(
      "Additional information about the current state.",
    ).optional(),
    state: z.enum(["STATE_UNSPECIFIED", "READY", "APPLYING", "ERROR"]).describe(
      "The current state of the security policy applied to the attached resource.",
    ).optional(),
    updateTime: z.string().describe("Last update time of the status.")
      .optional(),
  }).describe(
    "Security policy status of the asset. Data security policy, i.e., readers, writers & owners, should be specified in the lake/zone/asset IAM policy.",
  ).optional(),
  assetId: z.string().describe(
    "Required. Asset identifier. This ID will be used to generate names such as table names when publishing metadata to Hive Metastore and BigQuery. * Must contain only lowercase letters, numbers and hyphens. * Must start with a letter. * Must end with a number or a letter. * Must be between 1-63 characters. * Must be unique within the zone.",
  ).optional(),
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

/** Swamp extension model for Google Cloud Dataplex Lakes.Assets. Registered at `@swamp/gcp/dataplex/lakes-assets`. */
export const model = {
  type: "@swamp/gcp/dataplex/lakes-assets",
  version: "2026.06.07.1",
  upgrades: [
    {
      toVersion: "2026.04.01.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "An asset represents a cloud resource that is being managed within a lake as a...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a assets",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["discoverySpec"] !== undefined) {
          body["discoverySpec"] = g["discoverySpec"];
        }
        if (g["discoveryStatus"] !== undefined) {
          body["discoveryStatus"] = g["discoveryStatus"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["resourceSpec"] !== undefined) {
          body["resourceSpec"] = g["resourceSpec"];
        }
        if (g["resourceStatus"] !== undefined) {
          body["resourceStatus"] = g["resourceStatus"];
        }
        if (g["securityStatus"] !== undefined) {
          body["securityStatus"] = g["securityStatus"];
        }
        if (g["assetId"] !== undefined) body["assetId"] = g["assetId"];
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": [],
            }
            : undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": `projects/${projectId}/locations/${
                String(g["location"] ?? "")
              }`,
            },
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
          },
          credentials,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? "current").replace(
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
    get: {
      description: "Get a assets",
      arguments: z.object({
        identifier: z.string().describe("The name of the assets"),
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
    update: {
      description: "Update assets attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
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
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["discoverySpec"] !== undefined) {
          body["discoverySpec"] = g["discoverySpec"];
        }
        if (g["discoveryStatus"] !== undefined) {
          body["discoveryStatus"] = g["discoveryStatus"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["resourceSpec"] !== undefined) {
          body["resourceSpec"] = g["resourceSpec"];
        }
        if (g["resourceStatus"] !== undefined) {
          body["resourceStatus"] = g["resourceStatus"];
        }
        if (g["securityStatus"] !== undefined) {
          body["securityStatus"] = g["securityStatus"];
        }
        for (const key of Object.keys(existing)) {
          if (
            key === "fingerprint" || key === "labelFingerprint" ||
            key === "etag" || key.endsWith("Fingerprint")
          ) {
            body[key] = existing[key];
          }
        }
        const result = await updateResource(
          BASE_URL,
          PATCH_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": [],
            }
            : undefined,
          credentials,
        ) as StateData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the assets",
      arguments: z.object({
        identifier: z.string().describe("The name of the assets"),
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
      description: "Sync assets state from GCP",
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
      description: "List assets resources",
      arguments: z.object({
        filter: z.string().describe("Optional. Filter request.").optional(),
        orderBy: z.string().describe(
          "Optional. Order by fields for the result.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. Maximum number of asset to return. The service may return fewer than this value. If unspecified, at most 10 assets will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000.",
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
          "assets",
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
    get_iam_policy: {
      description: "get iam policy",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "dataplex.projects.locations.lakes.zones.assets.getIamPolicy",
            "path": "v1/{+resource}:getIamPolicy",
            "httpMethod": "GET",
            "parameterOrder": ["resource"],
            "parameters": {
              "options.requestedPolicyVersion": { "location": "query" },
              "resource": { "location": "path", "required": true },
            },
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
    set_iam_policy: {
      description: "set iam policy",
      arguments: z.object({
        policy: z.any().optional(),
        updateMask: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["policy"] !== undefined) body["policy"] = args["policy"];
        if (args["updateMask"] !== undefined) {
          body["updateMask"] = args["updateMask"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "dataplex.projects.locations.lakes.zones.assets.setIamPolicy",
            "path": "v1/{+resource}:setIamPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    test_iam_permissions: {
      description: "test iam permissions",
      arguments: z.object({
        permissions: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["permissions"] !== undefined) {
          body["permissions"] = args["permissions"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "dataplex.projects.locations.lakes.zones.assets.testIamPermissions",
            "path": "v1/{+resource}:testIamPermissions",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
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
