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

// Auto-generated extension model for @swamp/gcp/dlp/discoveryconfigs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Sensitive Data Protection (DLP) DiscoveryConfigs.
 *
 * Configuration for discovery to scan resources for profile generation. Only one discovery configuration may exist per organization, folder, or project. The generated data profiles are retained according to the [data retention policy] (https://docs.cloud.google.com/sensitive-data-protection/docs/data-profiles#retention).
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
  return `${parent}/discoveryConfigs/${shortName}`;
}

const BASE_URL = "https://dlp.googleapis.com/";

const GET_CONFIG = {
  "id": "dlp.organizations.locations.discoveryConfigs.get",
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

const INSERT_CONFIG = {
  "id": "dlp.organizations.locations.discoveryConfigs.create",
  "path": "v2/{+parent}/discoveryConfigs",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "dlp.organizations.locations.discoveryConfigs.patch",
  "path": "v2/{+name}",
  "httpMethod": "PATCH",
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
  "id": "dlp.organizations.locations.discoveryConfigs.delete",
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
  "id": "dlp.organizations.locations.discoveryConfigs.list",
  "path": "v2/{+parent}/discoveryConfigs",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
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
  scopes: z.string().describe(
    "Comma-separated OAuth scopes to request when minting access tokens via gcloud. Defaults to the API's Discovery Document scopes.",
  ).optional(),
  quotaProject: z.string().describe(
    "GCP project ID for quota and billing attribution; sets the x-goog-user-project header. Overrides GOOGLE_CLOUD_QUOTA_PROJECT environment variable. Required for APIs like Cloud Identity when using user credentials.",
  ).optional(),
  apiEndpoint: z.string().describe(
    "Custom API endpoint for emulators; overrides GCP_API_ENDPOINT environment variable. Defaults to the service's production URL.",
  ).optional(),
  configId: z.string().describe(
    "The config ID can contain uppercase and lowercase letters, numbers, and hyphens; that is, it must match the regular expression: `[a-zA-Z\\d-_]+`. The maximum length is 100 characters. Can be empty to allow the system to generate one.",
  ).optional(),
  discoveryConfig: z.object({
    actions: z.array(z.object({
      exportData: z.object({
        profileTable: z.object({
          datasetId: z.unknown().describe("Dataset ID of the table.")
            .optional(),
          projectId: z.unknown().describe(
            "The Google Cloud project ID of the project containing the table. If omitted, project ID is inferred from the API call.",
          ).optional(),
          tableId: z.unknown().describe("Name of the table.").optional(),
        }).describe(
          "Store all profiles to BigQuery. * The system will create a new dataset and table for you if none are are provided. The dataset will be named `sensitive_data_protection_discovery` and table will be named `discovery_profiles`. This table will be placed in the same project as the container project running the scan. After the first profile is generated and the dataset and table are created, the discovery scan configuration will be updated with the dataset and table names. * See [Analyze data profiles stored in BigQuery](https://docs.cloud.google.com/sensitive-data-protection/docs/analyze-data-profiles). * See [Sample queries for your BigQuery table](https://docs.cloud.google.com/sensitive-data-protection/docs/analyze-data-profiles#sample_sql_queries). * Data is inserted using [streaming insert](https://cloud.google.com/blog/products/bigquery/life-of-a-bigquery-streaming-insert) and so data may be in the buffer for a period of time after the profile has finished. * The Pub/Sub notification is sent before the streaming buffer is guaranteed to be written, so data may not be instantly visible to queries by the time your topic receives the Pub/Sub notification. * The best practice is to use the same table for an entire organization so that you can take advantage of the [provided Data Studio reports](https://docs.cloud.google.com/sensitive-data-protection/docs/analyze-data-profiles#use_a_premade_report). If you use VPC Service Controls to define security perimeters, then you must use a separate table for each boundary.",
        ).optional(),
        sampleFindingsTable: z.object({
          datasetId: z.unknown().describe("Dataset ID of the table.")
            .optional(),
          projectId: z.unknown().describe(
            "The Google Cloud project ID of the project containing the table. If omitted, project ID is inferred from the API call.",
          ).optional(),
          tableId: z.unknown().describe("Name of the table.").optional(),
        }).describe(
          "Store sample data profile findings in an existing table or a new table in an existing dataset. Each regeneration will result in new rows in BigQuery. Data is inserted using [streaming insert](https://cloud.google.com/blog/products/bigquery/life-of-a-bigquery-streaming-insert) and so data may be in the buffer for a period of time after the profile has finished.",
        ).optional(),
      }).describe("Export data profiles into a provided location.").optional(),
      pubSubNotification: z.object({
        detailOfMessage: z.enum([
          "DETAIL_LEVEL_UNSPECIFIED",
          "TABLE_PROFILE",
          "RESOURCE_NAME",
          "FILE_STORE_PROFILE",
        ]).describe(
          "How much data to include in the Pub/Sub message. If the user wishes to limit the size of the message, they can use resource_name and fetch the profile fields they wish to. Per table profile (not per column).",
        ).optional(),
        event: z.enum([
          "EVENT_TYPE_UNSPECIFIED",
          "NEW_PROFILE",
          "CHANGED_PROFILE",
          "SCORE_INCREASED",
          "ERROR_CHANGED",
        ]).describe(
          "The type of event that triggers a Pub/Sub. At most one `PubSubNotification` per EventType is permitted.",
        ).optional(),
        pubsubCondition: z.object({
          expressions: z.unknown().describe("An expression.").optional(),
        }).describe(
          "Conditions (e.g., data risk or sensitivity level) for triggering a Pub/Sub.",
        ).optional(),
        topic: z.string().describe(
          "Cloud Pub/Sub topic to send notifications to. Format is projects/{project}/topics/{topic}.",
        ).optional(),
      }).describe("Publish a message into the Pub/Sub topic.").optional(),
      publishToChronicle: z.object({}).describe(
        "Publishes generated data profiles to Google Security Operations. For more information, see [Use Sensitive Data Protection data in context-aware analytics](https://docs.cloud.google.com/chronicle/docs/detection/usecase-dlp-high-risk-user-download).",
      ).optional(),
      publishToDataplexCatalog: z.object({
        lowerDataRiskToLow: z.boolean().describe(
          "Whether creating a Dataplex Universal Catalog aspect for a profiled resource should lower the risk of the profile for that resource. This also lowers the data risk of resources at the lower levels of the resource hierarchy. For example, reducing the data risk of a table data profile also reduces the data risk of the constituent column data profiles.",
        ).optional(),
      }).describe(
        "Publishes a portion of each profile to Dataplex Universal Catalog with the aspect type Sensitive Data Protection Profile.",
      ).optional(),
      publishToScc: z.object({}).describe(
        "Publishes findings to Security Command Center for each data profile.",
      ).optional(),
      tagResources: z.object({
        lowerDataRiskToLow: z.boolean().describe(
          "Whether applying a tag to a resource should lower the risk of the profile for that resource. For example, in conjunction with an [IAM deny policy](https://docs.cloud.google.com/iam/docs/deny-overview), you can deny all principals a permission if a tag value is present, mitigating the risk of the resource. This also lowers the data risk of resources at the lower levels of the resource hierarchy. For example, reducing the data risk of a table data profile also reduces the data risk of the constituent column data profiles.",
        ).optional(),
        profileGenerationsToTag: z.array(z.unknown()).describe(
          "The profile generations for which the tag should be attached to resources. If you attach a tag to only new profiles, then if the sensitivity score of a profile subsequently changes, its tag doesn't change. By default, this field includes only new profiles. To include both new and updated profiles for tagging, this field should explicitly include both `PROFILE_GENERATION_NEW` and `PROFILE_GENERATION_UPDATE`.",
        ).optional(),
        tagConditions: z.array(z.unknown()).describe(
          "The tags to associate with different conditions.",
        ).optional(),
      }).describe("Tags the profiled resources with the specified tag values.")
        .optional(),
    })).describe("Actions to execute at the completion of scanning.")
      .optional(),
    createTime: z.string().describe(
      "Output only. The creation timestamp of a DiscoveryConfig.",
    ).optional(),
    displayName: z.string().describe("Display name (max 100 chars)").optional(),
    errors: z.array(z.object({
      details: z.object({
        code: z.number().int().describe(
          "The status code, which should be an enum value of google.rpc.Code.",
        ).optional(),
        details: z.array(z.unknown()).describe(
          "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
        ).optional(),
        message: z.string().describe(
          "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
        ).optional(),
      }).describe("Detailed error codes and messages.").optional(),
      extraInfo: z.enum([
        "ERROR_INFO_UNSPECIFIED",
        "IMAGE_SCAN_UNAVAILABLE_IN_REGION",
        "FILE_STORE_CLUSTER_UNSUPPORTED",
      ]).describe("Additional information about the error.").optional(),
      timestamps: z.array(z.string()).describe(
        "The times the error occurred. List includes the oldest timestamp and the last 9 timestamps.",
      ).optional(),
    })).describe(
      "Output only. A stream of errors encountered when the config was activated. Repeated errors may result in the config automatically being paused. Output only field. Will return the last 100 errors. Whenever the config is modified this list will be cleared.",
    ).optional(),
    inspectTemplates: z.array(z.string()).describe(
      'Detection logic for profile generation. Not all template features are used by Discovery. FindingLimits, include_quote and exclude_info_types have no impact on Discovery. Multiple templates may be provided if there is data in multiple regions. At most one template must be specified per-region (including "global"). Each region is scanned using the applicable template. If no region-specific template is specified, but a "global" template is specified, it will be copied to that region and used instead. If no global or region-specific template is provided for a region with data, that region\'s data will not be scanned. For more information, see https://docs.cloud.google.com/sensitive-data-protection/docs/data-profiles#data-residency.',
    ).optional(),
    lastRunTime: z.string().describe(
      "Output only. The timestamp of the last time this config was executed.",
    ).optional(),
    name: z.string().describe(
      "Output only. Unique resource name for the DiscoveryConfig, assigned by the service when the DiscoveryConfig is created, for example `projects/dlp-test-project/locations/global/discoveryConfigs/53234423`.",
    ).optional(),
    orgConfig: z.object({
      location: z.object({
        folderId: z.string().describe(
          "The ID of the folder within an organization to be scanned.",
        ).optional(),
        organizationId: z.string().describe(
          "The ID of an organization to scan.",
        ).optional(),
      }).describe("The data to scan: folder, org, or project").optional(),
      projectId: z.string().describe(
        "The project that will run the scan. The DLP service account that exists within this project must have access to all resources that are profiled, and the DLP API must be enabled.",
      ).optional(),
    }).describe("Only set when the parent is an org.").optional(),
    otherCloudStartingLocation: z.object({
      awsLocation: z.object({
        accountId: z.string().describe(
          "The AWS account ID that this discovery config applies to. Within an AWS organization, you can find the AWS account ID inside an AWS account ARN. Example: arn:{partition}:organizations::{management_account_id}:account/{org_id}/{account_id}",
        ).optional(),
        allAssetInventoryAssets: z.boolean().describe(
          "All AWS assets stored in Asset Inventory that didn't match other AWS discovery configs.",
        ).optional(),
      }).describe("The AWS starting location for discovery.").optional(),
    }).describe("Must be set only when scanning other clouds.").optional(),
    processingLocation: z.object({
      documentFallbackLocation: z.object({
        globalProcessing: z.object({}).describe(
          "Processing occurs in the global region.",
        ).optional(),
        multiRegionProcessing: z.object({}).describe(
          "Processing occurs in a multi-region that contains the current region if available.",
        ).optional(),
      }).describe("Document processing falls back using this configuration.")
        .optional(),
      imageFallbackLocation: z.object({
        globalProcessing: z.object({}).describe(
          "Processing occurs in the global region.",
        ).optional(),
        multiRegionProcessing: z.object({}).describe(
          "Processing occurs in a multi-region that contains the current region if available.",
        ).optional(),
      }).describe("Image processing falls back using this configuration.")
        .optional(),
    }).describe(
      "Optional. Processing location configuration. Vertex AI dataset scanning will set processing_location.image_fallback_type to MultiRegionProcessing by default.",
    ).optional(),
    status: z.enum(["STATUS_UNSPECIFIED", "RUNNING", "PAUSED"]).describe(
      "Required. A status for this configuration.",
    ).optional(),
    targets: z.array(z.object({
      bigQueryTarget: z.object({
        cadence: z.object({
          inspectTemplateModifiedCadence: z.unknown().describe(
            "Governs when to update data profiles when the inspection rules defined by the `InspectTemplate` change. If not set, changing the template will not cause a data profile to update.",
          ).optional(),
          refreshFrequency: z.unknown().describe(
            "Frequency at which profiles should be updated, regardless of whether the underlying resource has changed. Defaults to never.",
          ).optional(),
          schemaModifiedCadence: z.unknown().describe(
            "Governs when to update data profiles when a schema is modified.",
          ).optional(),
          tableModifiedCadence: z.unknown().describe(
            "Governs when to update data profiles when a table is modified.",
          ).optional(),
        }).describe(
          "How often and when to update profiles. New tables that match both the filter and conditions are scanned as quickly as possible depending on system capacity.",
        ).optional(),
        conditions: z.object({
          createdAfter: z.unknown().describe(
            "BigQuery table must have been created after this date. Used to avoid backfilling.",
          ).optional(),
          orConditions: z.unknown().describe(
            "At least one of the conditions must be true for a table to be scanned.",
          ).optional(),
          typeCollection: z.unknown().describe(
            "Restrict discovery to categories of table types.",
          ).optional(),
          types: z.unknown().describe(
            "Restrict discovery to specific table types.",
          ).optional(),
        }).describe(
          "In addition to matching the filter, these conditions must be true before a profile is generated.",
        ).optional(),
        disabled: z.object({}).describe(
          "Tables that match this filter will not have profiles created.",
        ).optional(),
        filter: z.object({
          otherTables: z.unknown().describe(
            "Catch-all. This should always be the last filter in the list because anything above it will apply first. Should only appear once in a configuration. If none is specified, a default one will be added automatically.",
          ).optional(),
          tableReference: z.unknown().describe(
            "The table to scan. Discovery configurations including this can only include one DiscoveryTarget (the DiscoveryTarget with this TableReference).",
          ).optional(),
          tables: z.unknown().describe(
            "A specific set of tables for this filter to apply to. A table collection must be specified in only one filter per config. If a table id or dataset is empty, Cloud DLP assumes all tables in that collection must be profiled. Must specify a project ID.",
          ).optional(),
        }).describe(
          "Required. The tables the discovery cadence applies to. The first target with a matching filter will be the one to apply to a table.",
        ).optional(),
      }).describe(
        "BigQuery target for Discovery. The first target to match a table will be the one applied.",
      ).optional(),
      cloudSqlTarget: z.object({
        conditions: z.object({
          databaseEngines: z.unknown().describe(
            "Optional. Database engines that should be profiled. Optional. Defaults to ALL_SUPPORTED_DATABASE_ENGINES if unspecified.",
          ).optional(),
          types: z.unknown().describe(
            "Data profiles will only be generated for the database resource types specified in this field. If not specified, defaults to [DATABASE_RESOURCE_TYPE_ALL_SUPPORTED_TYPES].",
          ).optional(),
        }).describe(
          "In addition to matching the filter, these conditions must be true before a profile is generated.",
        ).optional(),
        disabled: z.object({}).describe(
          "Disable profiling for database resources that match this filter.",
        ).optional(),
        filter: z.object({
          collection: z.unknown().describe(
            "A specific set of database resources for this filter to apply to.",
          ).optional(),
          databaseResourceReference: z.unknown().describe(
            "The database resource to scan. Targets including this can only include one target (the target with this database resource reference).",
          ).optional(),
          others: z.unknown().describe(
            "Catch-all. This should always be the last target in the list because anything above it will apply first. Should only appear once in a configuration. If none is specified, a default one will be added automatically.",
          ).optional(),
        }).describe(
          "Required. The tables the discovery cadence applies to. The first target with a matching filter will be the one to apply to a table.",
        ).optional(),
        generationCadence: z.object({
          inspectTemplateModifiedCadence: z.unknown().describe(
            "Governs when to update data profiles when the inspection rules defined by the `InspectTemplate` change. If not set, changing the template will not cause a data profile to update.",
          ).optional(),
          refreshFrequency: z.unknown().describe(
            "Data changes (non-schema changes) in Cloud SQL tables can't trigger reprofiling. If you set this field, profiles are refreshed at this frequency regardless of whether the underlying tables have changed. Defaults to never.",
          ).optional(),
          schemaModifiedCadence: z.unknown().describe(
            "When to reprofile if the schema has changed.",
          ).optional(),
        }).describe(
          "How often and when to update profiles. New tables that match both the filter and conditions are scanned as quickly as possible depending on system capacity.",
        ).optional(),
      }).describe(
        "Cloud SQL target for Discovery. The first target to match a table will be the one applied.",
      ).optional(),
      cloudStorageTarget: z.object({
        conditions: z.object({
          cloudStorageConditions: z.unknown().describe(
            "Optional. Cloud Storage conditions.",
          ).optional(),
          createdAfter: z.unknown().describe(
            "Optional. File store must have been created after this date. Used to avoid backfilling.",
          ).optional(),
          minAge: z.unknown().describe(
            "Optional. Minimum age a file store must have. If set, the value must be 1 hour or greater.",
          ).optional(),
        }).describe(
          "Optional. In addition to matching the filter, these conditions must be true before a profile is generated.",
        ).optional(),
        disabled: z.object({}).describe(
          "Optional. Disable profiling for buckets that match this filter.",
        ).optional(),
        filter: z.object({
          cloudStorageResourceReference: z.unknown().describe(
            "Optional. The bucket to scan. Targets including this can only include one target (the target with this bucket). This enables profiling the contents of a single bucket, while the other options allow for easy profiling of many bucets within a project or an organization.",
          ).optional(),
          collection: z.unknown().describe(
            "Optional. A specific set of buckets for this filter to apply to.",
          ).optional(),
          others: z.unknown().describe(
            "Optional. Catch-all. This should always be the last target in the list because anything above it will apply first. Should only appear once in a configuration. If none is specified, a default one will be added automatically.",
          ).optional(),
        }).describe(
          "Required. The buckets the generation_cadence applies to. The first target with a matching filter will be the one to apply to a bucket.",
        ).optional(),
        generationCadence: z.object({
          inspectTemplateModifiedCadence: z.unknown().describe(
            "Optional. Governs when to update data profiles when the inspection rules defined by the `InspectTemplate` change. If not set, changing the template will not cause a data profile to update.",
          ).optional(),
          refreshFrequency: z.unknown().describe(
            "Optional. Data changes in Cloud Storage can't trigger reprofiling. If you set this field, profiles are refreshed at this frequency regardless of whether the underlying buckets have changed. Defaults to never.",
          ).optional(),
        }).describe(
          "Optional. How often and when to update profiles. New buckets that match both the filter and conditions are scanned as quickly as possible depending on system capacity.",
        ).optional(),
      }).describe(
        "Cloud Storage target for Discovery. The first target to match a table will be the one applied.",
      ).optional(),
      otherCloudTarget: z.object({
        conditions: z.object({
          amazonS3BucketConditions: z.unknown().describe(
            "Amazon S3 bucket conditions.",
          ).optional(),
          minAge: z.unknown().describe(
            "Minimum age a resource must be before Cloud DLP can profile it. Value must be 1 hour or greater.",
          ).optional(),
        }).describe(
          "Optional. In addition to matching the filter, these conditions must be true before a profile is generated.",
        ).optional(),
        dataSourceType: z.object({
          dataSource: z.unknown().describe(
            "A string that identifies the type of resource being profiled. Current values: * google/bigquery/table * google/project * google/sql/table * google/gcs/bucket",
          ).optional(),
        }).describe(
          "Required. The type of data profiles generated by this discovery target. Supported values are: * aws/s3/bucket",
        ).optional(),
        disabled: z.object({}).describe(
          "Disable profiling for resources that match this filter.",
        ).optional(),
        filter: z.object({
          collection: z.unknown().describe(
            "A collection of resources for this filter to apply to.",
          ).optional(),
          others: z.unknown().describe(
            "Optional. Catch-all. This should always be the last target in the list because anything above it will apply first. Should only appear once in a configuration. If none is specified, a default one will be added automatically.",
          ).optional(),
          singleResource: z.unknown().describe(
            "The resource to scan. Configs using this filter can only have one target (the target with this single resource reference).",
          ).optional(),
        }).describe(
          "Required. The resources that the discovery cadence applies to. The first target with a matching filter will be the one to apply to a resource.",
        ).optional(),
        generationCadence: z.object({
          inspectTemplateModifiedCadence: z.unknown().describe(
            "Optional. Governs when to update data profiles when the inspection rules defined by the `InspectTemplate` change. If not set, changing the template will not cause a data profile to update.",
          ).optional(),
          refreshFrequency: z.unknown().describe(
            "Optional. Frequency to update profiles regardless of whether the underlying resource has changes. Defaults to never.",
          ).optional(),
        }).describe(
          "How often and when to update data profiles. New resources that match both the filter and conditions are scanned as quickly as possible depending on system capacity.",
        ).optional(),
      }).describe(
        "Other clouds target for discovery. The first target to match a resource will be the one applied.",
      ).optional(),
      secretsTarget: z.object({}).describe(
        "Discovery target that looks for credentials and secrets stored in cloud resource metadata and reports them as vulnerabilities to Security Command Center. Only one target of this type is allowed.",
      ).optional(),
      vertexDatasetTarget: z.object({
        conditions: z.object({
          createdAfter: z.unknown().describe(
            "Vertex AI dataset must have been created after this date. Used to avoid backfilling.",
          ).optional(),
          minAge: z.unknown().describe(
            "Minimum age a Vertex AI dataset must have. If set, the value must be 1 hour or greater.",
          ).optional(),
        }).describe(
          "In addition to matching the filter, these conditions must be true before a profile is generated.",
        ).optional(),
        disabled: z.object({}).describe(
          "Disable profiling for datasets that match this filter.",
        ).optional(),
        filter: z.object({
          collection: z.unknown().describe(
            "A specific set of Vertex AI datasets for this filter to apply to.",
          ).optional(),
          others: z.unknown().describe(
            "Catch-all. This should always be the last target in the list because anything above it will apply first. Should only appear once in a configuration. If none is specified, a default one will be added automatically.",
          ).optional(),
          vertexDatasetResourceReference: z.unknown().describe(
            "The dataset resource to scan. Targets including this can only include one target (the target with this dataset resource reference).",
          ).optional(),
        }).describe(
          "Required. The datasets the discovery cadence applies to. The first target with a matching filter will be the one to apply to a dataset.",
        ).optional(),
        generationCadence: z.object({
          inspectTemplateModifiedCadence: z.unknown().describe(
            "Governs when to update data profiles when the inspection rules defined by the `InspectTemplate` change. If not set, changing the template will not cause a data profile to be updated.",
          ).optional(),
          refreshFrequency: z.unknown().describe(
            "If you set this field, profiles are refreshed at this frequency regardless of whether the underlying datasets have changed. Defaults to never.",
          ).optional(),
        }).describe(
          "How often and when to update profiles. New datasets that match both the filter and conditions are scanned as quickly as possible depending on system capacity.",
        ).optional(),
      }).describe(
        "Vertex AI dataset target for Discovery. The first target to match a dataset will be the one applied. Note that discovery for Vertex AI can incur Cloud Storage Class B operation charges for storage.objects.get operations and retrieval fees. For more information, see [Cloud Storage pricing](https://cloud.google.com/storage/pricing#price-tables). Note that discovery for Vertex AI dataset will not be able to scan images unless DiscoveryConfig.processing_location.image_fallback_location has multi_region_processing or global_processing configured.",
      ).optional(),
    })).describe(
      "Target to match against for determining what to scan and how frequently.",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. The last update timestamp of a DiscoveryConfig.",
    ).optional(),
  }).describe("Required. New DiscoveryConfig value.").optional(),
  updateMask: z.string().describe("Mask to control which fields get updated.")
    .optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  actions: z.array(z.object({
    exportData: z.object({
      profileTable: z.object({
        datasetId: z.string(),
        projectId: z.string(),
        tableId: z.string(),
      }),
      sampleFindingsTable: z.object({
        datasetId: z.string(),
        projectId: z.string(),
        tableId: z.string(),
      }),
    }),
    pubSubNotification: z.object({
      detailOfMessage: z.string(),
      event: z.string(),
      pubsubCondition: z.object({
        expressions: z.object({
          conditions: z.unknown(),
          logicalOperator: z.unknown(),
        }),
      }),
      topic: z.string(),
    }),
    publishToChronicle: z.object({}),
    publishToDataplexCatalog: z.object({
      lowerDataRiskToLow: z.boolean(),
    }),
    publishToScc: z.object({}),
    tagResources: z.object({
      lowerDataRiskToLow: z.boolean(),
      profileGenerationsToTag: z.array(z.string()),
      tagConditions: z.array(z.object({
        sensitivityScore: z.unknown(),
        tag: z.unknown(),
      })),
    }),
  })).optional(),
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  errors: z.array(z.object({
    details: z.object({
      code: z.number(),
      details: z.array(z.record(z.string(), z.unknown())),
      message: z.string(),
    }),
    extraInfo: z.string(),
    timestamps: z.array(z.string()),
  })).optional(),
  inspectTemplates: z.array(z.string()).optional(),
  lastRunTime: z.string().optional(),
  name: z.string(),
  orgConfig: z.object({
    location: z.object({
      folderId: z.string(),
      organizationId: z.string(),
    }),
    projectId: z.string(),
  }).optional(),
  otherCloudStartingLocation: z.object({
    awsLocation: z.object({
      accountId: z.string(),
      allAssetInventoryAssets: z.boolean(),
    }),
  }).optional(),
  processingLocation: z.object({
    documentFallbackLocation: z.object({
      globalProcessing: z.object({}),
      multiRegionProcessing: z.object({}),
    }),
    imageFallbackLocation: z.object({
      globalProcessing: z.object({}),
      multiRegionProcessing: z.object({}),
    }),
  }).optional(),
  status: z.string().optional(),
  targets: z.array(z.object({
    bigQueryTarget: z.object({
      cadence: z.object({
        inspectTemplateModifiedCadence: z.object({
          frequency: z.unknown(),
        }),
        refreshFrequency: z.string(),
        schemaModifiedCadence: z.object({
          frequency: z.unknown(),
          types: z.unknown(),
        }),
        tableModifiedCadence: z.object({
          frequency: z.unknown(),
          types: z.unknown(),
        }),
      }),
      conditions: z.object({
        createdAfter: z.string(),
        orConditions: z.object({
          minAge: z.unknown(),
          minRowCount: z.unknown(),
        }),
        typeCollection: z.string(),
        types: z.object({
          types: z.unknown(),
        }),
      }),
      disabled: z.object({}),
      filter: z.object({
        otherTables: z.object({}),
        tableReference: z.object({
          datasetId: z.unknown(),
          projectId: z.unknown(),
          tableId: z.unknown(),
        }),
        tables: z.object({
          includeRegexes: z.unknown(),
        }),
      }),
    }),
    cloudSqlTarget: z.object({
      conditions: z.object({
        databaseEngines: z.array(z.unknown()),
        types: z.array(z.unknown()),
      }),
      disabled: z.object({}),
      filter: z.object({
        collection: z.object({
          includeRegexes: z.unknown(),
        }),
        databaseResourceReference: z.object({
          database: z.unknown(),
          databaseResource: z.unknown(),
          instance: z.unknown(),
          projectId: z.unknown(),
        }),
        others: z.object({}),
      }),
      generationCadence: z.object({
        inspectTemplateModifiedCadence: z.object({
          frequency: z.unknown(),
        }),
        refreshFrequency: z.string(),
        schemaModifiedCadence: z.object({
          frequency: z.unknown(),
          types: z.unknown(),
        }),
      }),
    }),
    cloudStorageTarget: z.object({
      conditions: z.object({
        cloudStorageConditions: z.object({
          includedBucketAttributes: z.unknown(),
          includedObjectAttributes: z.unknown(),
        }),
        createdAfter: z.string(),
        minAge: z.string(),
      }),
      disabled: z.object({}),
      filter: z.object({
        cloudStorageResourceReference: z.object({
          bucketName: z.unknown(),
          projectId: z.unknown(),
        }),
        collection: z.object({
          includeRegexes: z.unknown(),
          includeTags: z.unknown(),
        }),
        others: z.object({}),
      }),
      generationCadence: z.object({
        inspectTemplateModifiedCadence: z.object({
          frequency: z.unknown(),
        }),
        refreshFrequency: z.string(),
      }),
    }),
    otherCloudTarget: z.object({
      conditions: z.object({
        amazonS3BucketConditions: z.object({
          bucketTypes: z.unknown(),
          objectStorageClasses: z.unknown(),
        }),
        minAge: z.string(),
      }),
      dataSourceType: z.object({
        dataSource: z.string(),
      }),
      disabled: z.object({}),
      filter: z.object({
        collection: z.object({
          includeRegexes: z.unknown(),
        }),
        others: z.object({}),
        singleResource: z.object({
          amazonS3Bucket: z.unknown(),
        }),
      }),
      generationCadence: z.object({
        inspectTemplateModifiedCadence: z.object({
          frequency: z.unknown(),
        }),
        refreshFrequency: z.string(),
      }),
    }),
    secretsTarget: z.object({}),
    vertexDatasetTarget: z.object({
      conditions: z.object({
        createdAfter: z.string(),
        minAge: z.string(),
      }),
      disabled: z.object({}),
      filter: z.object({
        collection: z.object({
          vertexDatasetRegexes: z.unknown(),
        }),
        others: z.object({}),
        vertexDatasetResourceReference: z.object({
          datasetResourceName: z.unknown(),
        }),
      }),
      generationCadence: z.object({
        inspectTemplateModifiedCadence: z.object({
          frequency: z.unknown(),
        }),
        refreshFrequency: z.string(),
      }),
    }),
  })).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  configId: z.string().describe(
    "The config ID can contain uppercase and lowercase letters, numbers, and hyphens; that is, it must match the regular expression: `[a-zA-Z\\d-_]+`. The maximum length is 100 characters. Can be empty to allow the system to generate one.",
  ).optional(),
  discoveryConfig: z.object({
    actions: z.array(z.object({
      exportData: z.object({
        profileTable: z.object({
          datasetId: z.unknown().describe("Dataset ID of the table.")
            .optional(),
          projectId: z.unknown().describe(
            "The Google Cloud project ID of the project containing the table. If omitted, project ID is inferred from the API call.",
          ).optional(),
          tableId: z.unknown().describe("Name of the table.").optional(),
        }).describe(
          "Store all profiles to BigQuery. * The system will create a new dataset and table for you if none are are provided. The dataset will be named `sensitive_data_protection_discovery` and table will be named `discovery_profiles`. This table will be placed in the same project as the container project running the scan. After the first profile is generated and the dataset and table are created, the discovery scan configuration will be updated with the dataset and table names. * See [Analyze data profiles stored in BigQuery](https://docs.cloud.google.com/sensitive-data-protection/docs/analyze-data-profiles). * See [Sample queries for your BigQuery table](https://docs.cloud.google.com/sensitive-data-protection/docs/analyze-data-profiles#sample_sql_queries). * Data is inserted using [streaming insert](https://cloud.google.com/blog/products/bigquery/life-of-a-bigquery-streaming-insert) and so data may be in the buffer for a period of time after the profile has finished. * The Pub/Sub notification is sent before the streaming buffer is guaranteed to be written, so data may not be instantly visible to queries by the time your topic receives the Pub/Sub notification. * The best practice is to use the same table for an entire organization so that you can take advantage of the [provided Data Studio reports](https://docs.cloud.google.com/sensitive-data-protection/docs/analyze-data-profiles#use_a_premade_report). If you use VPC Service Controls to define security perimeters, then you must use a separate table for each boundary.",
        ).optional(),
        sampleFindingsTable: z.object({
          datasetId: z.unknown().describe("Dataset ID of the table.")
            .optional(),
          projectId: z.unknown().describe(
            "The Google Cloud project ID of the project containing the table. If omitted, project ID is inferred from the API call.",
          ).optional(),
          tableId: z.unknown().describe("Name of the table.").optional(),
        }).describe(
          "Store sample data profile findings in an existing table or a new table in an existing dataset. Each regeneration will result in new rows in BigQuery. Data is inserted using [streaming insert](https://cloud.google.com/blog/products/bigquery/life-of-a-bigquery-streaming-insert) and so data may be in the buffer for a period of time after the profile has finished.",
        ).optional(),
      }).describe("Export data profiles into a provided location.").optional(),
      pubSubNotification: z.object({
        detailOfMessage: z.enum([
          "DETAIL_LEVEL_UNSPECIFIED",
          "TABLE_PROFILE",
          "RESOURCE_NAME",
          "FILE_STORE_PROFILE",
        ]).describe(
          "How much data to include in the Pub/Sub message. If the user wishes to limit the size of the message, they can use resource_name and fetch the profile fields they wish to. Per table profile (not per column).",
        ).optional(),
        event: z.enum([
          "EVENT_TYPE_UNSPECIFIED",
          "NEW_PROFILE",
          "CHANGED_PROFILE",
          "SCORE_INCREASED",
          "ERROR_CHANGED",
        ]).describe(
          "The type of event that triggers a Pub/Sub. At most one `PubSubNotification` per EventType is permitted.",
        ).optional(),
        pubsubCondition: z.object({
          expressions: z.unknown().describe("An expression.").optional(),
        }).describe(
          "Conditions (e.g., data risk or sensitivity level) for triggering a Pub/Sub.",
        ).optional(),
        topic: z.string().describe(
          "Cloud Pub/Sub topic to send notifications to. Format is projects/{project}/topics/{topic}.",
        ).optional(),
      }).describe("Publish a message into the Pub/Sub topic.").optional(),
      publishToChronicle: z.object({}).describe(
        "Publishes generated data profiles to Google Security Operations. For more information, see [Use Sensitive Data Protection data in context-aware analytics](https://docs.cloud.google.com/chronicle/docs/detection/usecase-dlp-high-risk-user-download).",
      ).optional(),
      publishToDataplexCatalog: z.object({
        lowerDataRiskToLow: z.boolean().describe(
          "Whether creating a Dataplex Universal Catalog aspect for a profiled resource should lower the risk of the profile for that resource. This also lowers the data risk of resources at the lower levels of the resource hierarchy. For example, reducing the data risk of a table data profile also reduces the data risk of the constituent column data profiles.",
        ).optional(),
      }).describe(
        "Publishes a portion of each profile to Dataplex Universal Catalog with the aspect type Sensitive Data Protection Profile.",
      ).optional(),
      publishToScc: z.object({}).describe(
        "Publishes findings to Security Command Center for each data profile.",
      ).optional(),
      tagResources: z.object({
        lowerDataRiskToLow: z.boolean().describe(
          "Whether applying a tag to a resource should lower the risk of the profile for that resource. For example, in conjunction with an [IAM deny policy](https://docs.cloud.google.com/iam/docs/deny-overview), you can deny all principals a permission if a tag value is present, mitigating the risk of the resource. This also lowers the data risk of resources at the lower levels of the resource hierarchy. For example, reducing the data risk of a table data profile also reduces the data risk of the constituent column data profiles.",
        ).optional(),
        profileGenerationsToTag: z.array(z.unknown()).describe(
          "The profile generations for which the tag should be attached to resources. If you attach a tag to only new profiles, then if the sensitivity score of a profile subsequently changes, its tag doesn't change. By default, this field includes only new profiles. To include both new and updated profiles for tagging, this field should explicitly include both `PROFILE_GENERATION_NEW` and `PROFILE_GENERATION_UPDATE`.",
        ).optional(),
        tagConditions: z.array(z.unknown()).describe(
          "The tags to associate with different conditions.",
        ).optional(),
      }).describe("Tags the profiled resources with the specified tag values.")
        .optional(),
    })).describe("Actions to execute at the completion of scanning.")
      .optional(),
    createTime: z.string().describe(
      "Output only. The creation timestamp of a DiscoveryConfig.",
    ).optional(),
    displayName: z.string().describe("Display name (max 100 chars)").optional(),
    errors: z.array(z.object({
      details: z.object({
        code: z.number().int().describe(
          "The status code, which should be an enum value of google.rpc.Code.",
        ).optional(),
        details: z.array(z.unknown()).describe(
          "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
        ).optional(),
        message: z.string().describe(
          "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
        ).optional(),
      }).describe("Detailed error codes and messages.").optional(),
      extraInfo: z.enum([
        "ERROR_INFO_UNSPECIFIED",
        "IMAGE_SCAN_UNAVAILABLE_IN_REGION",
        "FILE_STORE_CLUSTER_UNSUPPORTED",
      ]).describe("Additional information about the error.").optional(),
      timestamps: z.array(z.string()).describe(
        "The times the error occurred. List includes the oldest timestamp and the last 9 timestamps.",
      ).optional(),
    })).describe(
      "Output only. A stream of errors encountered when the config was activated. Repeated errors may result in the config automatically being paused. Output only field. Will return the last 100 errors. Whenever the config is modified this list will be cleared.",
    ).optional(),
    inspectTemplates: z.array(z.string()).describe(
      'Detection logic for profile generation. Not all template features are used by Discovery. FindingLimits, include_quote and exclude_info_types have no impact on Discovery. Multiple templates may be provided if there is data in multiple regions. At most one template must be specified per-region (including "global"). Each region is scanned using the applicable template. If no region-specific template is specified, but a "global" template is specified, it will be copied to that region and used instead. If no global or region-specific template is provided for a region with data, that region\'s data will not be scanned. For more information, see https://docs.cloud.google.com/sensitive-data-protection/docs/data-profiles#data-residency.',
    ).optional(),
    lastRunTime: z.string().describe(
      "Output only. The timestamp of the last time this config was executed.",
    ).optional(),
    name: z.string().describe(
      "Output only. Unique resource name for the DiscoveryConfig, assigned by the service when the DiscoveryConfig is created, for example `projects/dlp-test-project/locations/global/discoveryConfigs/53234423`.",
    ).optional(),
    orgConfig: z.object({
      location: z.object({
        folderId: z.string().describe(
          "The ID of the folder within an organization to be scanned.",
        ).optional(),
        organizationId: z.string().describe(
          "The ID of an organization to scan.",
        ).optional(),
      }).describe("The data to scan: folder, org, or project").optional(),
      projectId: z.string().describe(
        "The project that will run the scan. The DLP service account that exists within this project must have access to all resources that are profiled, and the DLP API must be enabled.",
      ).optional(),
    }).describe("Only set when the parent is an org.").optional(),
    otherCloudStartingLocation: z.object({
      awsLocation: z.object({
        accountId: z.string().describe(
          "The AWS account ID that this discovery config applies to. Within an AWS organization, you can find the AWS account ID inside an AWS account ARN. Example: arn:{partition}:organizations::{management_account_id}:account/{org_id}/{account_id}",
        ).optional(),
        allAssetInventoryAssets: z.boolean().describe(
          "All AWS assets stored in Asset Inventory that didn't match other AWS discovery configs.",
        ).optional(),
      }).describe("The AWS starting location for discovery.").optional(),
    }).describe("Must be set only when scanning other clouds.").optional(),
    processingLocation: z.object({
      documentFallbackLocation: z.object({
        globalProcessing: z.object({}).describe(
          "Processing occurs in the global region.",
        ).optional(),
        multiRegionProcessing: z.object({}).describe(
          "Processing occurs in a multi-region that contains the current region if available.",
        ).optional(),
      }).describe("Document processing falls back using this configuration.")
        .optional(),
      imageFallbackLocation: z.object({
        globalProcessing: z.object({}).describe(
          "Processing occurs in the global region.",
        ).optional(),
        multiRegionProcessing: z.object({}).describe(
          "Processing occurs in a multi-region that contains the current region if available.",
        ).optional(),
      }).describe("Image processing falls back using this configuration.")
        .optional(),
    }).describe(
      "Optional. Processing location configuration. Vertex AI dataset scanning will set processing_location.image_fallback_type to MultiRegionProcessing by default.",
    ).optional(),
    status: z.enum(["STATUS_UNSPECIFIED", "RUNNING", "PAUSED"]).describe(
      "Required. A status for this configuration.",
    ).optional(),
    targets: z.array(z.object({
      bigQueryTarget: z.object({
        cadence: z.object({
          inspectTemplateModifiedCadence: z.unknown().describe(
            "Governs when to update data profiles when the inspection rules defined by the `InspectTemplate` change. If not set, changing the template will not cause a data profile to update.",
          ).optional(),
          refreshFrequency: z.unknown().describe(
            "Frequency at which profiles should be updated, regardless of whether the underlying resource has changed. Defaults to never.",
          ).optional(),
          schemaModifiedCadence: z.unknown().describe(
            "Governs when to update data profiles when a schema is modified.",
          ).optional(),
          tableModifiedCadence: z.unknown().describe(
            "Governs when to update data profiles when a table is modified.",
          ).optional(),
        }).describe(
          "How often and when to update profiles. New tables that match both the filter and conditions are scanned as quickly as possible depending on system capacity.",
        ).optional(),
        conditions: z.object({
          createdAfter: z.unknown().describe(
            "BigQuery table must have been created after this date. Used to avoid backfilling.",
          ).optional(),
          orConditions: z.unknown().describe(
            "At least one of the conditions must be true for a table to be scanned.",
          ).optional(),
          typeCollection: z.unknown().describe(
            "Restrict discovery to categories of table types.",
          ).optional(),
          types: z.unknown().describe(
            "Restrict discovery to specific table types.",
          ).optional(),
        }).describe(
          "In addition to matching the filter, these conditions must be true before a profile is generated.",
        ).optional(),
        disabled: z.object({}).describe(
          "Tables that match this filter will not have profiles created.",
        ).optional(),
        filter: z.object({
          otherTables: z.unknown().describe(
            "Catch-all. This should always be the last filter in the list because anything above it will apply first. Should only appear once in a configuration. If none is specified, a default one will be added automatically.",
          ).optional(),
          tableReference: z.unknown().describe(
            "The table to scan. Discovery configurations including this can only include one DiscoveryTarget (the DiscoveryTarget with this TableReference).",
          ).optional(),
          tables: z.unknown().describe(
            "A specific set of tables for this filter to apply to. A table collection must be specified in only one filter per config. If a table id or dataset is empty, Cloud DLP assumes all tables in that collection must be profiled. Must specify a project ID.",
          ).optional(),
        }).describe(
          "Required. The tables the discovery cadence applies to. The first target with a matching filter will be the one to apply to a table.",
        ).optional(),
      }).describe(
        "BigQuery target for Discovery. The first target to match a table will be the one applied.",
      ).optional(),
      cloudSqlTarget: z.object({
        conditions: z.object({
          databaseEngines: z.unknown().describe(
            "Optional. Database engines that should be profiled. Optional. Defaults to ALL_SUPPORTED_DATABASE_ENGINES if unspecified.",
          ).optional(),
          types: z.unknown().describe(
            "Data profiles will only be generated for the database resource types specified in this field. If not specified, defaults to [DATABASE_RESOURCE_TYPE_ALL_SUPPORTED_TYPES].",
          ).optional(),
        }).describe(
          "In addition to matching the filter, these conditions must be true before a profile is generated.",
        ).optional(),
        disabled: z.object({}).describe(
          "Disable profiling for database resources that match this filter.",
        ).optional(),
        filter: z.object({
          collection: z.unknown().describe(
            "A specific set of database resources for this filter to apply to.",
          ).optional(),
          databaseResourceReference: z.unknown().describe(
            "The database resource to scan. Targets including this can only include one target (the target with this database resource reference).",
          ).optional(),
          others: z.unknown().describe(
            "Catch-all. This should always be the last target in the list because anything above it will apply first. Should only appear once in a configuration. If none is specified, a default one will be added automatically.",
          ).optional(),
        }).describe(
          "Required. The tables the discovery cadence applies to. The first target with a matching filter will be the one to apply to a table.",
        ).optional(),
        generationCadence: z.object({
          inspectTemplateModifiedCadence: z.unknown().describe(
            "Governs when to update data profiles when the inspection rules defined by the `InspectTemplate` change. If not set, changing the template will not cause a data profile to update.",
          ).optional(),
          refreshFrequency: z.unknown().describe(
            "Data changes (non-schema changes) in Cloud SQL tables can't trigger reprofiling. If you set this field, profiles are refreshed at this frequency regardless of whether the underlying tables have changed. Defaults to never.",
          ).optional(),
          schemaModifiedCadence: z.unknown().describe(
            "When to reprofile if the schema has changed.",
          ).optional(),
        }).describe(
          "How often and when to update profiles. New tables that match both the filter and conditions are scanned as quickly as possible depending on system capacity.",
        ).optional(),
      }).describe(
        "Cloud SQL target for Discovery. The first target to match a table will be the one applied.",
      ).optional(),
      cloudStorageTarget: z.object({
        conditions: z.object({
          cloudStorageConditions: z.unknown().describe(
            "Optional. Cloud Storage conditions.",
          ).optional(),
          createdAfter: z.unknown().describe(
            "Optional. File store must have been created after this date. Used to avoid backfilling.",
          ).optional(),
          minAge: z.unknown().describe(
            "Optional. Minimum age a file store must have. If set, the value must be 1 hour or greater.",
          ).optional(),
        }).describe(
          "Optional. In addition to matching the filter, these conditions must be true before a profile is generated.",
        ).optional(),
        disabled: z.object({}).describe(
          "Optional. Disable profiling for buckets that match this filter.",
        ).optional(),
        filter: z.object({
          cloudStorageResourceReference: z.unknown().describe(
            "Optional. The bucket to scan. Targets including this can only include one target (the target with this bucket). This enables profiling the contents of a single bucket, while the other options allow for easy profiling of many bucets within a project or an organization.",
          ).optional(),
          collection: z.unknown().describe(
            "Optional. A specific set of buckets for this filter to apply to.",
          ).optional(),
          others: z.unknown().describe(
            "Optional. Catch-all. This should always be the last target in the list because anything above it will apply first. Should only appear once in a configuration. If none is specified, a default one will be added automatically.",
          ).optional(),
        }).describe(
          "Required. The buckets the generation_cadence applies to. The first target with a matching filter will be the one to apply to a bucket.",
        ).optional(),
        generationCadence: z.object({
          inspectTemplateModifiedCadence: z.unknown().describe(
            "Optional. Governs when to update data profiles when the inspection rules defined by the `InspectTemplate` change. If not set, changing the template will not cause a data profile to update.",
          ).optional(),
          refreshFrequency: z.unknown().describe(
            "Optional. Data changes in Cloud Storage can't trigger reprofiling. If you set this field, profiles are refreshed at this frequency regardless of whether the underlying buckets have changed. Defaults to never.",
          ).optional(),
        }).describe(
          "Optional. How often and when to update profiles. New buckets that match both the filter and conditions are scanned as quickly as possible depending on system capacity.",
        ).optional(),
      }).describe(
        "Cloud Storage target for Discovery. The first target to match a table will be the one applied.",
      ).optional(),
      otherCloudTarget: z.object({
        conditions: z.object({
          amazonS3BucketConditions: z.unknown().describe(
            "Amazon S3 bucket conditions.",
          ).optional(),
          minAge: z.unknown().describe(
            "Minimum age a resource must be before Cloud DLP can profile it. Value must be 1 hour or greater.",
          ).optional(),
        }).describe(
          "Optional. In addition to matching the filter, these conditions must be true before a profile is generated.",
        ).optional(),
        dataSourceType: z.object({
          dataSource: z.unknown().describe(
            "A string that identifies the type of resource being profiled. Current values: * google/bigquery/table * google/project * google/sql/table * google/gcs/bucket",
          ).optional(),
        }).describe(
          "Required. The type of data profiles generated by this discovery target. Supported values are: * aws/s3/bucket",
        ).optional(),
        disabled: z.object({}).describe(
          "Disable profiling for resources that match this filter.",
        ).optional(),
        filter: z.object({
          collection: z.unknown().describe(
            "A collection of resources for this filter to apply to.",
          ).optional(),
          others: z.unknown().describe(
            "Optional. Catch-all. This should always be the last target in the list because anything above it will apply first. Should only appear once in a configuration. If none is specified, a default one will be added automatically.",
          ).optional(),
          singleResource: z.unknown().describe(
            "The resource to scan. Configs using this filter can only have one target (the target with this single resource reference).",
          ).optional(),
        }).describe(
          "Required. The resources that the discovery cadence applies to. The first target with a matching filter will be the one to apply to a resource.",
        ).optional(),
        generationCadence: z.object({
          inspectTemplateModifiedCadence: z.unknown().describe(
            "Optional. Governs when to update data profiles when the inspection rules defined by the `InspectTemplate` change. If not set, changing the template will not cause a data profile to update.",
          ).optional(),
          refreshFrequency: z.unknown().describe(
            "Optional. Frequency to update profiles regardless of whether the underlying resource has changes. Defaults to never.",
          ).optional(),
        }).describe(
          "How often and when to update data profiles. New resources that match both the filter and conditions are scanned as quickly as possible depending on system capacity.",
        ).optional(),
      }).describe(
        "Other clouds target for discovery. The first target to match a resource will be the one applied.",
      ).optional(),
      secretsTarget: z.object({}).describe(
        "Discovery target that looks for credentials and secrets stored in cloud resource metadata and reports them as vulnerabilities to Security Command Center. Only one target of this type is allowed.",
      ).optional(),
      vertexDatasetTarget: z.object({
        conditions: z.object({
          createdAfter: z.unknown().describe(
            "Vertex AI dataset must have been created after this date. Used to avoid backfilling.",
          ).optional(),
          minAge: z.unknown().describe(
            "Minimum age a Vertex AI dataset must have. If set, the value must be 1 hour or greater.",
          ).optional(),
        }).describe(
          "In addition to matching the filter, these conditions must be true before a profile is generated.",
        ).optional(),
        disabled: z.object({}).describe(
          "Disable profiling for datasets that match this filter.",
        ).optional(),
        filter: z.object({
          collection: z.unknown().describe(
            "A specific set of Vertex AI datasets for this filter to apply to.",
          ).optional(),
          others: z.unknown().describe(
            "Catch-all. This should always be the last target in the list because anything above it will apply first. Should only appear once in a configuration. If none is specified, a default one will be added automatically.",
          ).optional(),
          vertexDatasetResourceReference: z.unknown().describe(
            "The dataset resource to scan. Targets including this can only include one target (the target with this dataset resource reference).",
          ).optional(),
        }).describe(
          "Required. The datasets the discovery cadence applies to. The first target with a matching filter will be the one to apply to a dataset.",
        ).optional(),
        generationCadence: z.object({
          inspectTemplateModifiedCadence: z.unknown().describe(
            "Governs when to update data profiles when the inspection rules defined by the `InspectTemplate` change. If not set, changing the template will not cause a data profile to be updated.",
          ).optional(),
          refreshFrequency: z.unknown().describe(
            "If you set this field, profiles are refreshed at this frequency regardless of whether the underlying datasets have changed. Defaults to never.",
          ).optional(),
        }).describe(
          "How often and when to update profiles. New datasets that match both the filter and conditions are scanned as quickly as possible depending on system capacity.",
        ).optional(),
      }).describe(
        "Vertex AI dataset target for Discovery. The first target to match a dataset will be the one applied. Note that discovery for Vertex AI can incur Cloud Storage Class B operation charges for storage.objects.get operations and retrieval fees. For more information, see [Cloud Storage pricing](https://cloud.google.com/storage/pricing#price-tables). Note that discovery for Vertex AI dataset will not be able to scan images unless DiscoveryConfig.processing_location.image_fallback_location has multi_region_processing or global_processing configured.",
      ).optional(),
    })).describe(
      "Target to match against for determining what to scan and how frequently.",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. The last update timestamp of a DiscoveryConfig.",
    ).optional(),
  }).describe("Required. New DiscoveryConfig value.").optional(),
  updateMask: z.string().describe("Mask to control which fields get updated.")
    .optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
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

/** Swamp extension model for Google Cloud Sensitive Data Protection (DLP) DiscoveryConfigs. Registered at `@swamp/gcp/dlp/discoveryconfigs`. */
export const model = {
  type: "@swamp/gcp/dlp/discoveryconfigs",
  version: "2026.10.13.1",
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
    {
      toVersion: "2026.07.17.1",
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
      toVersion: "2026.07.20.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.20.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.4",
      description: "No schema changes",
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
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Configuration for discovery to scan resources for profile generation. Only on...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a discoveryConfigs",
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
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["configId"] !== undefined) body["configId"] = g["configId"];
        if (g["discoveryConfig"] !== undefined) {
          body["discoveryConfig"] = g["discoveryConfig"];
        }
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
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
              "statusField": "status",
              "readyValues": ["RUNNING"],
              "failedValues": [],
            }
            : undefined,
          undefined,
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
      description: "Get a discoveryConfigs",
      arguments: z.object({
        identifier: z.string().describe("The name of the discoveryConfigs"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const result = await readResource(
          baseUrl,
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
      description: "Update discoveryConfigs attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific discoveryConfigs by name (e.g. one discovered by list)",
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
            String(g["parent"] ?? ""),
            existingName ?? g["name"]?.toString() ?? "",
          );
        }
        const body: Record<string, unknown> = {};
        if (g["discoveryConfig"] !== undefined) {
          body["discoveryConfig"] = g["discoveryConfig"];
        }
        if (g["updateMask"] !== undefined) body["updateMask"] = g["updateMask"];
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
              "statusField": "status",
              "readyValues": ["RUNNING"],
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
      description: "Delete the discoveryConfigs",
      arguments: z.object({
        identifier: z.string().describe("The name of the discoveryConfigs"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
      description: "Sync discoveryConfigs state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific discoveryConfigs by name (e.g. one discovered by list)",
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
              String(g["parent"] ?? ""),
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
      description: "List discoveryConfigs resources",
      arguments: z.object({
        orderBy: z.string().describe(
          "Comma-separated list of config fields to order by, followed by `asc` or `desc` postfix. This list is case insensitive. The default sorting order is ascending. Redundant space characters are insignificant. Example: `name asc,update_time, create_time desc` Supported fields are: - `last_run_time`: corresponds to the last time the DiscoveryConfig ran. - `name`: corresponds to the DiscoveryConfig's name. - `status`: corresponds to DiscoveryConfig's status.",
        ).optional(),
        pageSize: z.number().describe(
          "Size of the page. This value can be limited by a server.",
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
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "discoveryConfigs",
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
