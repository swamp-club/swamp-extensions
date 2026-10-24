// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

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

import { z } from "npm:zod@4.6.7";
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

const LIST_CONFIG = {
  "id": "bigquerydatatransfer.projects.locations.transferConfigs.list",
  "path": "v1/{+parent}/transferConfigs",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "dataSourceIds": {
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
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  scopes: z.string().describe(
    "Comma-separated OAuth scopes to request when minting access tokens via gcloud. Defaults to the API's Discovery Document scopes.",
  ).optional(),
  quotaProject: z.string().describe(
    "GCP project ID for quota and billing attribution; sets the x-goog-user-project header. Overrides GOOGLE_CLOUD_QUOTA_PROJECT environment variable. Required for APIs like Cloud Identity when using user credentials.",
  ).optional(),
  apiEndpoint: z.string().describe(
    "Custom API endpoint for emulators; overrides GCP_API_ENDPOINT environment variable. Defaults to the service's production URL.",
  ).optional(),
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
    "Email notifications will be sent according to these preferences to the email address of the user who owns this transfer config.",
  ).optional(),
  encryptionConfiguration: z.object({
    kmsKeyName: z.string().describe(
      "The name of the KMS key used for encrypting BigQuery data.",
    ).optional(),
  }).describe(
    "The encryption configuration part. Currently, it is only used for the optional KMS key name. The BigQuery service account of your project must be granted permissions to use the key. Read methods will return the key name applied in effect. Write methods will apply the key if it is present, or otherwise try to apply project default keys if it is absent.",
  ).optional(),
  managedTableType: z.enum([
    "MANAGED_TABLE_TYPE_UNSPECIFIED",
    "NATIVE",
    "BIGLAKE",
  ]).describe("The classification of the destination table.").optional(),
  metadataDestination: z.object({
    dataplexConfiguration: z.object({
      entryGroup: z.string().describe(
        "Required. The Dataplex Universal Catalog entry group for importing the metadata. entry_group has the format of `projects/{project_id}/locations/{region}/entryGroups/{entry_group_id}`.",
      ).optional(),
    }).describe("The Dataplex Universal Catalog configuration.").optional(),
  }).describe("The metadata destination of the transfer config.").optional(),
  name: z.string().describe(
    "Identifier. The resource name of the transfer config. Transfer config names have the form either `projects/{project_id}/locations/{region}/transferConfigs/{config_id}` or `projects/{project_id}/transferConfigs/{config_id}`, where `config_id` is usually a UUID, even though it is not guaranteed or required. The name is ignored when creating a transfer config.",
  ).optional(),
  notificationPubsubTopic: z.string().describe(
    "Pub/Sub topic where notifications will be sent after transfer runs associated with this transfer config finish. The format for specifying a pubsub topic is: `projects/{project_id}/topics/{topic_id}`",
  ).optional(),
  paramConfig: z.object({
    secretManagerManagedParams: z.array(z.string()).describe(
      "Optional. The list of parameters that are stored in Secret Manager. The value of a parameter included in this list will be interpreted as a Secret Manager key version resource name instead of a raw value. The raw value will be retrieved from Secret Manager upon execution.",
    ).optional(),
  }).describe("Optional. The config for values in `params`.").optional(),
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
    }).describe(
      "Event driven transfer schedule options. If set, the transfer will be scheduled upon events arrial.",
    ).optional(),
    manualSchedule: z.object({}).describe(
      "Manual transfer schedule. If set, the transfer run will not be auto-scheduled by the system, unless the client invokes StartManualTransferRuns. This is equivalent to disable_auto_scheduling = true.",
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
      "Time based transfer schedule options. This is the default schedule option.",
    ).optional(),
  }).describe(
    'Options customizing different types of data transfer schedule. This field replaces "schedule" and "schedule_options" fields. ScheduleOptionsV2 cannot be used together with ScheduleOptions/Schedule.',
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
  metadataDestination: z.object({
    dataplexConfiguration: z.object({
      entryGroup: z.string(),
    }),
  }).optional(),
  name: z.string(),
  nextRunTime: z.string().optional(),
  notificationPubsubTopic: z.string().optional(),
  ownerInfo: z.object({
    email: z.string(),
  }).optional(),
  paramConfig: z.object({
    secretManagerManagedParams: z.array(z.string()),
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
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
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
    "Email notifications will be sent according to these preferences to the email address of the user who owns this transfer config.",
  ).optional(),
  encryptionConfiguration: z.object({
    kmsKeyName: z.string().describe(
      "The name of the KMS key used for encrypting BigQuery data.",
    ).optional(),
  }).describe(
    "The encryption configuration part. Currently, it is only used for the optional KMS key name. The BigQuery service account of your project must be granted permissions to use the key. Read methods will return the key name applied in effect. Write methods will apply the key if it is present, or otherwise try to apply project default keys if it is absent.",
  ).optional(),
  managedTableType: z.enum([
    "MANAGED_TABLE_TYPE_UNSPECIFIED",
    "NATIVE",
    "BIGLAKE",
  ]).describe("The classification of the destination table.").optional(),
  metadataDestination: z.object({
    dataplexConfiguration: z.object({
      entryGroup: z.string().describe(
        "Required. The Dataplex Universal Catalog entry group for importing the metadata. entry_group has the format of `projects/{project_id}/locations/{region}/entryGroups/{entry_group_id}`.",
      ).optional(),
    }).describe("The Dataplex Universal Catalog configuration.").optional(),
  }).describe("The metadata destination of the transfer config.").optional(),
  name: z.string().describe(
    "Identifier. The resource name of the transfer config. Transfer config names have the form either `projects/{project_id}/locations/{region}/transferConfigs/{config_id}` or `projects/{project_id}/transferConfigs/{config_id}`, where `config_id` is usually a UUID, even though it is not guaranteed or required. The name is ignored when creating a transfer config.",
  ).optional(),
  notificationPubsubTopic: z.string().describe(
    "Pub/Sub topic where notifications will be sent after transfer runs associated with this transfer config finish. The format for specifying a pubsub topic is: `projects/{project_id}/topics/{topic_id}`",
  ).optional(),
  paramConfig: z.object({
    secretManagerManagedParams: z.array(z.string()).describe(
      "Optional. The list of parameters that are stored in Secret Manager. The value of a parameter included in this list will be interpreted as a Secret Manager key version resource name instead of a raw value. The raw value will be retrieved from Secret Manager upon execution.",
    ).optional(),
  }).describe("Optional. The config for values in `params`.").optional(),
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
    }).describe(
      "Event driven transfer schedule options. If set, the transfer will be scheduled upon events arrial.",
    ).optional(),
    manualSchedule: z.object({}).describe(
      "Manual transfer schedule. If set, the transfer run will not be auto-scheduled by the system, unless the client invokes StartManualTransferRuns. This is equivalent to disable_auto_scheduling = true.",
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
      "Time based transfer schedule options. This is the default schedule option.",
    ).optional(),
  }).describe(
    'Options customizing different types of data transfer schedule. This field replaces "schedule" and "schedule_options" fields. ScheduleOptionsV2 cannot be used together with ScheduleOptions/Schedule.',
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

const _credentialKeys = new Set([
  "accessToken",
  "credentialsJson",
  "project",
  "scopes",
  "quotaProject",
  "apiEndpoint",
]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
    scopes: typeof g.scopes === "string"
      ? g.scopes.split(",").map((s: string) => s.trim())
      : undefined,
    quotaProject: g.quotaProject as string | undefined,
  };
}

/** Swamp extension model for Google Cloud BigQuery Data Transfer TransferConfigs. Registered at `@swamp/gcp/bigquerydatatransfer/transferconfigs`. */
export const model = {
  type: "@swamp/gcp/bigquerydatatransfer/transferconfigs",
  version: "2026.10.23.1",
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
    {
      toVersion: "2026.05.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.07.1",
      description:
        "Added: accessToken, credentialsJson, project, metadataDestination",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.17.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.17.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.1",
      description: "Added: scopes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.20.2",
      description: "Added: metadataDestination",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.1",
      description: "Removed: error, ownerInfo",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { error: _error, ownerInfo: _ownerInfo, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.07.21.3",
      description: "Added: metadataDestination",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.12.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.07.1",
      description: "Added: paramConfig",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.23.1",
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
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] =
          String(g["location"] ?? "") === "global" || !g["location"]
            ? `projects/${projectId}`
            : `projects/${projectId}/locations/${String(g["location"])}`;
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
        if (g["managedTableType"] !== undefined) {
          body["managedTableType"] = g["managedTableType"];
        }
        if (g["metadataDestination"] !== undefined) {
          body["metadataDestination"] = g["metadataDestination"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["notificationPubsubTopic"] !== undefined) {
          body["notificationPubsubTopic"] = g["notificationPubsubTopic"];
        }
        if (g["paramConfig"] !== undefined) {
          body["paramConfig"] = g["paramConfig"];
        }
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
          params["serviceAccountName"] = String(g["serviceAccountName"]);
        }
        if (g["versionInfo"] !== undefined) {
          params["versionInfo"] = String(g["versionInfo"]);
        }
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["location"] ?? "") === "global" || !g["location"]
              ? `projects/${projectId}`
              : `projects/${projectId}/locations/${String(g["location"])}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          baseUrl,
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
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent":
                String(g["location"] ?? "") === "global" || !g["location"]
                  ? `projects/${projectId}`
                  : `projects/${projectId}/locations/${String(g["location"])}`,
            },
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
          },
          credentials,
        ) as StateData;
        const instanceName = ((g.name ?? result.name)?.toString() ?? "current")
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
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["location"] ?? "") === "global" || !g["location"]
            ? `projects/${projectId}`
            : `projects/${projectId}/locations/${String(g["location"])}`,
          args.identifier,
        );
        const result = await readResource(
          baseUrl,
          GET_CONFIG,
          params,
          credentials,
        ) as StateData;
        const instanceName =
          ((g.name ?? result.name)?.toString() ?? args.identifier).replace(
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
        identifier: z.string().describe(
          "Target a specific transferConfigs by name (e.g. one discovered by list)",
        ).optional(),
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (
        args: { identifier?: string; waitForReady?: boolean },
        context: any,
      ) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error(
            "No existing state found - run create, get, or list first",
          );
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const params: Record<string, string> = { project: projectId };
        const existingName = existing["name"]?.toString();
        if (existingName && existingName.includes("/")) {
          params["name"] = existingName;
        } else {
          params["name"] = buildResourceName(
            String(g["location"] ?? "") === "global" || !g["location"]
              ? `projects/${projectId}`
              : `projects/${projectId}/locations/${String(g["location"])}`,
            existingName ?? g["name"]?.toString() ?? "",
          );
        }
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
        if (g["managedTableType"] !== undefined) {
          body["managedTableType"] = g["managedTableType"];
        }
        if (g["metadataDestination"] !== undefined) {
          body["metadataDestination"] = g["metadataDestination"];
        }
        if (g["notificationPubsubTopic"] !== undefined) {
          body["notificationPubsubTopic"] = g["notificationPubsubTopic"];
        }
        if (g["paramConfig"] !== undefined) {
          body["paramConfig"] = g["paramConfig"];
        }
        if (g["params"] !== undefined) body["params"] = g["params"];
        if (g["schedule"] !== undefined) body["schedule"] = g["schedule"];
        if (g["scheduleOptions"] !== undefined) {
          body["scheduleOptions"] = g["scheduleOptions"];
        }
        if (g["scheduleOptionsV2"] !== undefined) {
          body["scheduleOptionsV2"] = g["scheduleOptionsV2"];
        }
        if (g["userId"] !== undefined) body["userId"] = g["userId"];
        const updateMaskKeys = Object.keys(body);
        if (updateMaskKeys.length > 0) {
          params["updateMask"] = updateMaskKeys.join(",");
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
          baseUrl,
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
      description: "Delete the transferConfigs",
      arguments: z.object({
        identifier: z.string().describe("The name of the transferConfigs"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["location"] ?? "") === "global" || !g["location"]
            ? `projects/${projectId}`
            : `projects/${projectId}/locations/${String(g["location"])}`,
          args.identifier,
        );
        const { existed } = await deleteResource(
          baseUrl,
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
      description: "Sync transferConfigs state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific transferConfigs by name (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error(
            "No existing state found - run create, get, or list first",
          );
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        try {
          const params: Record<string, string> = { project: projectId };
          const existingName = existing.name?.toString();
          if (existingName && existingName.includes("/")) {
            params["name"] = existingName;
          } else {
            const shortName = existingName ?? g["name"]?.toString();
            if (!shortName) throw new Error("No identifier found");
            params["name"] = buildResourceName(
              String(g["location"] ?? "") === "global" || !g["location"]
                ? `projects/${projectId}`
                : `projects/${projectId}/locations/${String(g["location"])}`,
              shortName,
            );
          }
          const result = await readResource(
            baseUrl,
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
      description: "List transferConfigs resources",
      arguments: z.object({
        dataSourceIds: z.string().describe(
          "When specified, only configurations of requested data sources are returned.",
        ).optional(),
        pageSize: z.number().describe(
          "Page size. The default page size is the maximum value of 1000 results.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] =
          String(g["location"] ?? "") === "global" || !g["location"]
            ? `projects/${projectId}`
            : `projects/${projectId}/locations/${String(g["location"])}`;
        if (args["dataSourceIds"] !== undefined) {
          params["dataSourceIds"] = String(args["dataSourceIds"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "transferConfigs",
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
    schedule_runs: {
      description: "schedule runs",
      arguments: z.object({
        endTime: z.any().optional(),
        startTime: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] =
          String(g["location"] ?? "") === "global" || !g["location"]
            ? `projects/${projectId}`
            : `projects/${projectId}/locations/${String(g["location"])}`;
        const body: Record<string, unknown> = {};
        if (args["endTime"] !== undefined) body["endTime"] = args["endTime"];
        if (args["startTime"] !== undefined) {
          body["startTime"] = args["startTime"];
        }
        const result = await createResource(
          baseUrl,
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
          undefined,
          undefined,
          undefined,
          credentials,
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
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] =
          String(g["location"] ?? "") === "global" || !g["location"]
            ? `projects/${projectId}`
            : `projects/${projectId}/locations/${String(g["location"])}`;
        const body: Record<string, unknown> = {};
        if (args["requestedRunTime"] !== undefined) {
          body["requestedRunTime"] = args["requestedRunTime"];
        }
        if (args["requestedTimeRange"] !== undefined) {
          body["requestedTimeRange"] = args["requestedTimeRange"];
        }
        const result = await createResource(
          baseUrl,
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
