// Auto-generated extension model for @swamp/gcp/bigquerydatatransfer/transferconfigs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud BigQuery Data Transfer TransferConfigs.
 *
 * Represents a data transfer configuration. A transfer configuration contains all metadata needed to perform a data transfer. For example, `destination_dataset_id` specifies where data should be stored. When a new transfer configuration is created, the specified `destination_dataset_id` is created when needed and shared with the appropriate data source service account.
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
  getProjectId,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/transferConfigs/${shortName}`;
}

const BASE_URL = "https://bigquerydatatransfer.googleapis.com/";

const GET_CONFIG = {
  "id": "bigquerydatatransfer.projects.locations.transferConfigs.get",
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
  "id": "bigquerydatatransfer.projects.locations.transferConfigs.create",
  "path": "v1/{+parent}/transferConfigs",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "authorizationCode": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "serviceAccountName": {
      "location": "query",
    },
    "versionInfo": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "bigquerydatatransfer.projects.locations.transferConfigs.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "authorizationCode": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "serviceAccountName": {
      "location": "query",
    },
    "updateMask": {
      "location": "query",
    },
    "versionInfo": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "bigquerydatatransfer.projects.locations.transferConfigs.delete",
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

const GlobalArgsSchema = z.object({
  dataRefreshWindowDays: z.number().int().describe(
    "The number of days to look back to automatically refresh the data. For example, if `data_refresh_window_days = 10`, then every day BigQuery reingests data for [today-10, today-1], rather than ingesting data for just [today-1]. Only valid if the data source supports the feature. Set the value to 0 to use the default value.",
  ).optional(),
  dataSourceId: z.string().describe(
    "Data source ID. This cannot be changed once data transfer is created. The full list of available data source IDs can be returned through an API call: https://cloud.google.com/bigquery-transfer/docs/reference/datatransfer/rest/v1/projects.locations.dataSources/list",
  ).optional(),
  destinationDatasetId: z.string().describe("The BigQuery target dataset id.")
    .optional(),
  disabled: z.boolean().describe(
    "Is this config disabled. When set to true, no runs will be scheduled for this transfer config.",
  ).optional(),
  displayName: z.string().describe(
    "User specified display name for the data transfer.",
  ).optional(),
  emailPreferences: z.object({
    enableFailureEmail: z.boolean().describe(
      "If true, email notifications will be sent on transfer run failures.",
    ).optional(),
  }).describe(
    "Represents preferences for sending email notifications for transfer run events.",
  ).optional(),
  encryptionConfiguration: z.object({
    kmsKeyName: z.string().describe(
      "The name of the KMS key used for encrypting BigQuery data.",
    ).optional(),
  }).describe("Represents the encryption configuration for a transfer.")
    .optional(),
  error: z.object({
    code: z.number().int().describe(
      "The status code, which should be an enum value of google.rpc.Code.",
    ).optional(),
    details: z.array(z.record(z.string(), z.string())).describe(
      "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
    ).optional(),
    message: z.string().describe(
      "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
    ).optional(),
  }).describe(
    "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
  ).optional(),
  managedTableType: z.enum([
    "MANAGED_TABLE_TYPE_UNSPECIFIED",
    "NATIVE",
    "BIGLAKE",
  ]).describe("The classification of the destination table.").optional(),
  name: z.string().describe(
    "Identifier. The resource name of the transfer config. Transfer config names have the form either `projects/{project_id}/locations/{region}/transferConfigs/{config_id}` or `projects/{project_id}/transferConfigs/{config_id}`, where `config_id` is usually a UUID, even though it is not guaranteed or required. The name is ignored when creating a transfer config.",
  ).optional(),
  notificationPubsubTopic: z.string().describe(
    "Pub/Sub topic where notifications will be sent after transfer runs associated with this transfer config finish. The format for specifying a pubsub topic is: `projects/{project_id}/topics/{topic_id}`",
  ).optional(),
  ownerInfo: z.object({
    email: z.string().describe("E-mail address of the user.").optional(),
  }).describe("Information about a user.").optional(),
  params: z.record(z.string(), z.string()).describe(
    "Parameters specific to each data source. For more information see the bq tab in the 'Setting up a data transfer' section for each data source. For example the parameters for Cloud Storage transfers are listed here: https://cloud.google.com/bigquery-transfer/docs/cloud-storage-transfer#bq",
  ).optional(),
  schedule: z.string().describe(
    "Data transfer schedule. If the data source does not support a custom schedule, this should be empty. If it is empty, the default value for the data source will be used. The specified times are in UTC. Examples of valid format: `1st,3rd monday of month 15:30`, `every wed,fri of jan,jun 13:15`, and `first sunday of quarter 00:00`. See more explanation about the format here: https://cloud.google.com/appengine/docs/flexible/python/scheduling-jobs-with-cron-yaml#the_schedule_format NOTE: The minimum interval time between recurring transfers depends on the data source; refer to the documentation for your data source.",
  ).optional(),
  scheduleOptions: z.object({
    disableAutoScheduling: z.boolean().describe(
      "If true, automatic scheduling of data transfer runs for this configuration will be disabled. The runs can be started on ad-hoc basis using StartManualTransferRuns API. When automatic scheduling is disabled, the TransferConfig.schedule field will be ignored.",
    ).optional(),
    endTime: z.string().describe(
      "Defines time to stop scheduling transfer runs. A transfer run cannot be scheduled at or after the end time. The end time can be changed at any moment. The time when a data transfer can be triggered manually is not limited by this option.",
    ).optional(),
    startTime: z.string().describe(
      "Specifies time to start scheduling transfer runs. The first run will be scheduled at or after the start time according to a recurrence pattern defined in the schedule string. The start time can be changed at any moment. The time when a data transfer can be triggered manually is not limited by this option.",
    ).optional(),
  }).describe("Options customizing the data transfer schedule.").optional(),
  scheduleOptionsV2: z.object({
    eventDrivenSchedule: z.object({
      pubsubSubscription: z.string().describe(
        "Pub/Sub subscription name used to receive events. Only Google Cloud Storage data source support this option. Format: projects/{project}/subscriptions/{subscription}",
      ).optional(),
    }).describe("Options customizing EventDriven transfers schedule.")
      .optional(),
    manualSchedule: z.object({}).describe(
      "Options customizing manual transfers schedule.",
    ).optional(),
    timeBasedSchedule: z.object({
      endTime: z.string().describe(
        "Defines time to stop scheduling transfer runs. A transfer run cannot be scheduled at or after the end time. The end time can be changed at any moment.",
      ).optional(),
      schedule: z.string().describe(
        "Data transfer schedule. If the data source does not support a custom schedule, this should be empty. If it is empty, the default value for the data source will be used. The specified times are in UTC. Examples of valid format: `1st,3rd monday of month 15:30`, `every wed,fri of jan,jun 13:15`, and `first sunday of quarter 00:00`. See more explanation about the format here: https://cloud.google.com/appengine/docs/flexible/python/scheduling-jobs-with-cron-yaml#the_schedule_format NOTE: The minimum interval time between recurring transfers depends on the data source; refer to the documentation for your data source.",
      ).optional(),
      startTime: z.string().describe(
        "Specifies time to start scheduling transfer runs. The first run will be scheduled at or after the start time according to a recurrence pattern defined in the schedule string. The start time can be changed at any moment.",
      ).optional(),
    }).describe(
      "Options customizing the time based transfer schedule. Options are migrated from the original ScheduleOptions message.",
    ).optional(),
  }).describe(
    "V2 options customizing different types of data transfer schedule. This field supports existing time-based and manual transfer schedule. Also supports Event-Driven transfer schedule. ScheduleOptionsV2 cannot be used together with ScheduleOptions/Schedule.",
  ).optional(),
  userId: z.string().describe(
    "Deprecated. Unique ID of the user on whose behalf transfer is done.",
  ).optional(),
  serviceAccountName: z.string().describe(
    "Optional service account email. If this field is set, the transfer config will be created with this service account's credentials. It requires that the requesting user calling this API has permissions to act as this service account. Note that not all data sources support service account credentials when creating a transfer config. For the latest list of data sources, read about [using service accounts](https://cloud.google.com/bigquery-transfer/docs/use-service-accounts).",
  ).optional(),
  versionInfo: z.string().describe(
    "Optional version info. This parameter replaces `authorization_code` which is no longer used in any data sources. This is required only if `transferConfig.dataSourceId` is 'youtube_channel' *or* new credentials are needed, as indicated by `CheckValidCreds`. In order to obtain version info, make a request to the following URL: https://bigquery.cloud.google.com/datatransfer/oauthz/auth?redirect_uri=urn:ietf:wg:oauth:2.0:oob&response_type=version_info&client_id=client_id&scope=data_source_scopes * The client_id is the OAuth client_id of the data source as returned by ListDataSources method. * data_source_scopes are the scopes returned by ListDataSources method. Note that this should not be set when `service_account_name` is used to create the transfer config.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  dataRefreshWindowDays: z.number().optional(),
  dataSourceId: z.string().optional(),
  datasetRegion: z.string().optional(),
  destinationDatasetId: z.string().optional(),
  disabled: z.boolean().optional(),
  displayName: z.string().optional(),
  emailPreferences: z.object({
    enableFailureEmail: z.boolean(),
  }).optional(),
  encryptionConfiguration: z.object({
    kmsKeyName: z.string(),
  }).optional(),
  error: z.object({
    code: z.number(),
    details: z.array(z.record(z.string(), z.unknown())),
    message: z.string(),
  }).optional(),
  managedTableType: z.string().optional(),
  name: z.string(),
  nextRunTime: z.string().optional(),
  notificationPubsubTopic: z.string().optional(),
  ownerInfo: z.object({
    email: z.string(),
  }).optional(),
  params: z.record(z.string(), z.unknown()).optional(),
  schedule: z.string().optional(),
  scheduleOptions: z.object({
    disableAutoScheduling: z.boolean(),
    endTime: z.string(),
    startTime: z.string(),
  }).optional(),
  scheduleOptionsV2: z.object({
    eventDrivenSchedule: z.object({
      pubsubSubscription: z.string(),
    }),
    manualSchedule: z.object({}),
    timeBasedSchedule: z.object({
      endTime: z.string(),
      schedule: z.string(),
      startTime: z.string(),
    }),
  }).optional(),
  state: z.string().optional(),
  updateTime: z.string().optional(),
  userId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  dataRefreshWindowDays: z.number().int().describe(
    "The number of days to look back to automatically refresh the data. For example, if `data_refresh_window_days = 10`, then every day BigQuery reingests data for [today-10, today-1], rather than ingesting data for just [today-1]. Only valid if the data source supports the feature. Set the value to 0 to use the default value.",
  ).optional(),
  dataSourceId: z.string().describe(
    "Data source ID. This cannot be changed once data transfer is created. The full list of available data source IDs can be returned through an API call: https://cloud.google.com/bigquery-transfer/docs/reference/datatransfer/rest/v1/projects.locations.dataSources/list",
  ).optional(),
  destinationDatasetId: z.string().describe("The BigQuery target dataset id.")
    .optional(),
  disabled: z.boolean().describe(
    "Is this config disabled. When set to true, no runs will be scheduled for this transfer config.",
  ).optional(),
  displayName: z.string().describe(
    "User specified display name for the data transfer.",
  ).optional(),
  emailPreferences: z.object({
    enableFailureEmail: z.boolean().describe(
      "If true, email notifications will be sent on transfer run failures.",
    ).optional(),
  }).describe(
    "Represents preferences for sending email notifications for transfer run events.",
  ).optional(),
  encryptionConfiguration: z.object({
    kmsKeyName: z.string().describe(
      "The name of the KMS key used for encrypting BigQuery data.",
    ).optional(),
  }).describe("Represents the encryption configuration for a transfer.")
    .optional(),
  error: z.object({
    code: z.number().int().describe(
      "The status code, which should be an enum value of google.rpc.Code.",
    ).optional(),
    details: z.array(z.record(z.string(), z.string())).describe(
      "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
    ).optional(),
    message: z.string().describe(
      "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
    ).optional(),
  }).describe(
    "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
  ).optional(),
  managedTableType: z.enum([
    "MANAGED_TABLE_TYPE_UNSPECIFIED",
    "NATIVE",
    "BIGLAKE",
  ]).describe("The classification of the destination table.").optional(),
  name: z.string().describe(
    "Identifier. The resource name of the transfer config. Transfer config names have the form either `projects/{project_id}/locations/{region}/transferConfigs/{config_id}` or `projects/{project_id}/transferConfigs/{config_id}`, where `config_id` is usually a UUID, even though it is not guaranteed or required. The name is ignored when creating a transfer config.",
  ).optional(),
  notificationPubsubTopic: z.string().describe(
    "Pub/Sub topic where notifications will be sent after transfer runs associated with this transfer config finish. The format for specifying a pubsub topic is: `projects/{project_id}/topics/{topic_id}`",
  ).optional(),
  ownerInfo: z.object({
    email: z.string().describe("E-mail address of the user.").optional(),
  }).describe("Information about a user.").optional(),
  params: z.record(z.string(), z.string()).describe(
    "Parameters specific to each data source. For more information see the bq tab in the 'Setting up a data transfer' section for each data source. For example the parameters for Cloud Storage transfers are listed here: https://cloud.google.com/bigquery-transfer/docs/cloud-storage-transfer#bq",
  ).optional(),
  schedule: z.string().describe(
    "Data transfer schedule. If the data source does not support a custom schedule, this should be empty. If it is empty, the default value for the data source will be used. The specified times are in UTC. Examples of valid format: `1st,3rd monday of month 15:30`, `every wed,fri of jan,jun 13:15`, and `first sunday of quarter 00:00`. See more explanation about the format here: https://cloud.google.com/appengine/docs/flexible/python/scheduling-jobs-with-cron-yaml#the_schedule_format NOTE: The minimum interval time between recurring transfers depends on the data source; refer to the documentation for your data source.",
  ).optional(),
  scheduleOptions: z.object({
    disableAutoScheduling: z.boolean().describe(
      "If true, automatic scheduling of data transfer runs for this configuration will be disabled. The runs can be started on ad-hoc basis using StartManualTransferRuns API. When automatic scheduling is disabled, the TransferConfig.schedule field will be ignored.",
    ).optional(),
    endTime: z.string().describe(
      "Defines time to stop scheduling transfer runs. A transfer run cannot be scheduled at or after the end time. The end time can be changed at any moment. The time when a data transfer can be triggered manually is not limited by this option.",
    ).optional(),
    startTime: z.string().describe(
      "Specifies time to start scheduling transfer runs. The first run will be scheduled at or after the start time according to a recurrence pattern defined in the schedule string. The start time can be changed at any moment. The time when a data transfer can be triggered manually is not limited by this option.",
    ).optional(),
  }).describe("Options customizing the data transfer schedule.").optional(),
  scheduleOptionsV2: z.object({
    eventDrivenSchedule: z.object({
      pubsubSubscription: z.string().describe(
        "Pub/Sub subscription name used to receive events. Only Google Cloud Storage data source support this option. Format: projects/{project}/subscriptions/{subscription}",
      ).optional(),
    }).describe("Options customizing EventDriven transfers schedule.")
      .optional(),
    manualSchedule: z.object({}).describe(
      "Options customizing manual transfers schedule.",
    ).optional(),
    timeBasedSchedule: z.object({
      endTime: z.string().describe(
        "Defines time to stop scheduling transfer runs. A transfer run cannot be scheduled at or after the end time. The end time can be changed at any moment.",
      ).optional(),
      schedule: z.string().describe(
        "Data transfer schedule. If the data source does not support a custom schedule, this should be empty. If it is empty, the default value for the data source will be used. The specified times are in UTC. Examples of valid format: `1st,3rd monday of month 15:30`, `every wed,fri of jan,jun 13:15`, and `first sunday of quarter 00:00`. See more explanation about the format here: https://cloud.google.com/appengine/docs/flexible/python/scheduling-jobs-with-cron-yaml#the_schedule_format NOTE: The minimum interval time between recurring transfers depends on the data source; refer to the documentation for your data source.",
      ).optional(),
      startTime: z.string().describe(
        "Specifies time to start scheduling transfer runs. The first run will be scheduled at or after the start time according to a recurrence pattern defined in the schedule string. The start time can be changed at any moment.",
      ).optional(),
    }).describe(
      "Options customizing the time based transfer schedule. Options are migrated from the original ScheduleOptions message.",
    ).optional(),
  }).describe(
    "V2 options customizing different types of data transfer schedule. This field supports existing time-based and manual transfer schedule. Also supports Event-Driven transfer schedule. ScheduleOptionsV2 cannot be used together with ScheduleOptions/Schedule.",
  ).optional(),
  userId: z.string().describe(
    "Deprecated. Unique ID of the user on whose behalf transfer is done.",
  ).optional(),
  serviceAccountName: z.string().describe(
    "Optional service account email. If this field is set, the transfer config will be created with this service account's credentials. It requires that the requesting user calling this API has permissions to act as this service account. Note that not all data sources support service account credentials when creating a transfer config. For the latest list of data sources, read about [using service accounts](https://cloud.google.com/bigquery-transfer/docs/use-service-accounts).",
  ).optional(),
  versionInfo: z.string().describe(
    "Optional version info. This parameter replaces `authorization_code` which is no longer used in any data sources. This is required only if `transferConfig.dataSourceId` is 'youtube_channel' *or* new credentials are needed, as indicated by `CheckValidCreds`. In order to obtain version info, make a request to the following URL: https://bigquery.cloud.google.com/datatransfer/oauthz/auth?redirect_uri=urn:ietf:wg:oauth:2.0:oob&response_type=version_info&client_id=client_id&scope=data_source_scopes * The client_id is the OAuth client_id of the data source as returned by ListDataSources method. * data_source_scopes are the scopes returned by ListDataSources method. Note that this should not be set when `service_account_name` is used to create the transfer config.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud BigQuery Data Transfer TransferConfigs. Registered at `@swamp/gcp/bigquerydatatransfer/transferconfigs`. */
export const model = {
  type: "@swamp/gcp/bigquerydatatransfer/transferconfigs",
  version: "2026.05.18.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents a data transfer configuration. A transfer configuration contains a...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a transferConfigs",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["dataRefreshWindowDays"] !== undefined) {
          body["dataRefreshWindowDays"] = g["dataRefreshWindowDays"];
        }
        if (g["dataSourceId"] !== undefined) {
          body["dataSourceId"] = g["dataSourceId"];
        }
        if (g["destinationDatasetId"] !== undefined) {
          body["destinationDatasetId"] = g["destinationDatasetId"];
        }
        if (g["disabled"] !== undefined) body["disabled"] = g["disabled"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["emailPreferences"] !== undefined) {
          body["emailPreferences"] = g["emailPreferences"];
        }
        if (g["encryptionConfiguration"] !== undefined) {
          body["encryptionConfiguration"] = g["encryptionConfiguration"];
        }
        if (g["error"] !== undefined) body["error"] = g["error"];
        if (g["managedTableType"] !== undefined) {
          body["managedTableType"] = g["managedTableType"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["notificationPubsubTopic"] !== undefined) {
          body["notificationPubsubTopic"] = g["notificationPubsubTopic"];
        }
        if (g["ownerInfo"] !== undefined) body["ownerInfo"] = g["ownerInfo"];
        if (g["params"] !== undefined) body["params"] = g["params"];
        if (g["schedule"] !== undefined) body["schedule"] = g["schedule"];
        if (g["scheduleOptions"] !== undefined) {
          body["scheduleOptions"] = g["scheduleOptions"];
        }
        if (g["scheduleOptionsV2"] !== undefined) {
          body["scheduleOptionsV2"] = g["scheduleOptionsV2"];
        }
        if (g["userId"] !== undefined) body["userId"] = g["userId"];
        if (g["serviceAccountName"] !== undefined) {
          body["serviceAccountName"] = g["serviceAccountName"];
        }
        if (g["versionInfo"] !== undefined) {
          body["versionInfo"] = g["versionInfo"];
        }
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
              "readyValues": ["RUNNING", "SUCCEEDED"],
              "failedValues": ["FAILED"],
            }
            : undefined,
        ) as StateData;
        const instanceName = ((result.name ?? g.name)?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a transferConfigs",
      arguments: z.object({
        identifier: z.string().describe("The name of the transferConfigs"),
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
        const instanceName =
          ((result.name ?? g.name)?.toString() ?? args.identifier).replace(
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
      description: "Update transferConfigs attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
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
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["dataRefreshWindowDays"] !== undefined) {
          body["dataRefreshWindowDays"] = g["dataRefreshWindowDays"];
        }
        if (g["destinationDatasetId"] !== undefined) {
          body["destinationDatasetId"] = g["destinationDatasetId"];
        }
        if (g["disabled"] !== undefined) body["disabled"] = g["disabled"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["emailPreferences"] !== undefined) {
          body["emailPreferences"] = g["emailPreferences"];
        }
        if (g["encryptionConfiguration"] !== undefined) {
          body["encryptionConfiguration"] = g["encryptionConfiguration"];
        }
        if (g["error"] !== undefined) body["error"] = g["error"];
        if (g["managedTableType"] !== undefined) {
          body["managedTableType"] = g["managedTableType"];
        }
        if (g["notificationPubsubTopic"] !== undefined) {
          body["notificationPubsubTopic"] = g["notificationPubsubTopic"];
        }
        if (g["ownerInfo"] !== undefined) body["ownerInfo"] = g["ownerInfo"];
        if (g["params"] !== undefined) body["params"] = g["params"];
        if (g["schedule"] !== undefined) body["schedule"] = g["schedule"];
        if (g["scheduleOptions"] !== undefined) {
          body["scheduleOptions"] = g["scheduleOptions"];
        }
        if (g["scheduleOptionsV2"] !== undefined) {
          body["scheduleOptionsV2"] = g["scheduleOptionsV2"];
        }
        if (g["userId"] !== undefined) body["userId"] = g["userId"];
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
              "readyValues": ["RUNNING", "SUCCEEDED"],
              "failedValues": ["FAILED"],
            }
            : undefined,
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
      description: "Delete the transferConfigs",
      arguments: z.object({
        identifier: z.string().describe("The name of the transferConfigs"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
      description: "Sync transferConfigs state from GCP",
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
    schedule_runs: {
      description: "schedule runs",
      arguments: z.object({
        endTime: z.any().optional(),
        startTime: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["endTime"] !== undefined) body["endTime"] = args["endTime"];
        if (args["startTime"] !== undefined) {
          body["startTime"] = args["startTime"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "bigquerydatatransfer.projects.locations.transferConfigs.scheduleRuns",
            "path": "v1/{+parent}:scheduleRuns",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    start_manual_runs: {
      description: "start manual runs",
      arguments: z.object({
        requestedRunTime: z.any().optional(),
        requestedTimeRange: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["requestedRunTime"] !== undefined) {
          body["requestedRunTime"] = args["requestedRunTime"];
        }
        if (args["requestedTimeRange"] !== undefined) {
          body["requestedTimeRange"] = args["requestedTimeRange"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "bigquerydatatransfer.projects.locations.transferConfigs.startManualRuns",
            "path": "v1/{+parent}:startManualRuns",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
