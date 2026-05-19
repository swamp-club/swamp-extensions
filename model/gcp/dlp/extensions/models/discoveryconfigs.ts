// Auto-generated extension model for @swamp/gcp/dlp/discoveryconfigs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Sensitive Data Protection (DLP) DiscoveryConfigs.
 *
 * Configuration for discovery to scan resources for profile generation. Only one discovery configuration may exist per organization, folder, or project. The generated data profiles are retained according to the [data retention policy] (https://cloud.google.com/sensitive-data-protection/docs/data-profiles#retention).
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

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
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
          "Message defining the location of a BigQuery table. A table is uniquely identified by its project_id, dataset_id, and table_name. Within a query a table is often referenced with a string in the format of: `:.` or `..`.",
        ).optional(),
        sampleFindingsTable: z.object({
          datasetId: z.unknown().describe("Dataset ID of the table.")
            .optional(),
          projectId: z.unknown().describe(
            "The Google Cloud project ID of the project containing the table. If omitted, project ID is inferred from the API call.",
          ).optional(),
          tableId: z.unknown().describe("Name of the table.").optional(),
        }).describe(
          "Message defining the location of a BigQuery table. A table is uniquely identified by its project_id, dataset_id, and table_name. Within a query a table is often referenced with a string in the format of: `:.` or `..`.",
        ).optional(),
      }).describe(
        "If set, the detailed data profiles will be persisted to the location of your choice whenever updated.",
      ).optional(),
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
          expressions: z.unknown().describe(
            "An expression, consisting of an operator and conditions.",
          ).optional(),
        }).describe(
          "A condition for determining whether a Pub/Sub should be triggered.",
        ).optional(),
        topic: z.string().describe(
          "Cloud Pub/Sub topic to send notifications to. Format is projects/{project}/topics/{topic}.",
        ).optional(),
      }).describe(
        "Send a Pub/Sub message into the given Pub/Sub topic to connect other systems to data profile generation. The message payload data will be the byte serialization of `DataProfilePubSubMessage`.",
      ).optional(),
      publishToChronicle: z.object({}).describe(
        "Message expressing intention to publish to Google Security Operations.",
      ).optional(),
      publishToDataplexCatalog: z.object({
        lowerDataRiskToLow: z.boolean().describe(
          "Whether creating a Dataplex Universal Catalog aspect for a profiled resource should lower the risk of the profile for that resource. This also lowers the data risk of resources at the lower levels of the resource hierarchy. For example, reducing the data risk of a table data profile also reduces the data risk of the constituent column data profiles.",
        ).optional(),
      }).describe(
        "Create Dataplex Universal Catalog aspects for profiled resources with the aspect type Sensitive Data Protection Profile. To learn more about aspects, see https://cloud.google.com/sensitive-data-protection/docs/add-aspects.",
      ).optional(),
      publishToScc: z.object({}).describe(
        "If set, a summary finding will be created or updated in Security Command Center for each profile.",
      ).optional(),
      tagResources: z.object({
        lowerDataRiskToLow: z.boolean().describe(
          "Whether applying a tag to a resource should lower the risk of the profile for that resource. For example, in conjunction with an [IAM deny policy](https://cloud.google.com/iam/docs/deny-overview), you can deny all principals a permission if a tag value is present, mitigating the risk of the resource. This also lowers the data risk of resources at the lower levels of the resource hierarchy. For example, reducing the data risk of a table data profile also reduces the data risk of the constituent column data profiles.",
        ).optional(),
        profileGenerationsToTag: z.array(z.unknown()).describe(
          "The profile generations for which the tag should be attached to resources. If you attach a tag to only new profiles, then if the sensitivity score of a profile subsequently changes, its tag doesn't change. By default, this field includes only new profiles. To include both new and updated profiles for tagging, this field should explicitly include both `PROFILE_GENERATION_NEW` and `PROFILE_GENERATION_UPDATE`.",
        ).optional(),
        tagConditions: z.array(z.unknown()).describe(
          "The tags to associate with different conditions.",
        ).optional(),
      }).describe(
        "If set, attaches the [tags] (https://cloud.google.com/resource-manager/docs/tags/tags-overview) provided to profiled resources. Tags support [access control](https://cloud.google.com/iam/docs/tags-access-control). You can conditionally grant or deny access to a resource based on whether the resource has a specific tag.",
      ).optional(),
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
      }).describe(
        "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
      ).optional(),
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
      'Detection logic for profile generation. Not all template features are used by Discovery. FindingLimits, include_quote and exclude_info_types have no impact on Discovery. Multiple templates may be provided if there is data in multiple regions. At most one template must be specified per-region (including "global"). Each region is scanned using the applicable template. If no region-specific template is specified, but a "global" template is specified, it will be copied to that region and used instead. If no global or region-specific template is provided for a region with data, that region\'s data will not be scanned. For more information, see https://cloud.google.com/sensitive-data-protection/docs/data-profiles#data-residency.',
    ).optional(),
    lastRunTime: z.string().describe(
      "Output only. The timestamp of the last time this config was executed.",
    ).optional(),
    name: z.string().describe(
      "Unique resource name for the DiscoveryConfig, assigned by the service when the DiscoveryConfig is created, for example `projects/dlp-test-project/locations/global/discoveryConfigs/53234423`.",
    ).optional(),
    orgConfig: z.object({
      location: z.object({
        folderId: z.string().describe(
          "The ID of the folder within an organization to be scanned.",
        ).optional(),
        organizationId: z.string().describe(
          "The ID of an organization to scan.",
        ).optional(),
      }).describe(
        "The location to begin a discovery scan. Denotes an organization ID or folder ID within an organization.",
      ).optional(),
      projectId: z.string().describe(
        "The project that will run the scan. The DLP service account that exists within this project must have access to all resources that are profiled, and the DLP API must be enabled.",
      ).optional(),
    }).describe(
      "Project and scan location information. Only set when the parent is an org.",
    ).optional(),
    otherCloudStartingLocation: z.object({
      awsLocation: z.object({
        accountId: z.string().describe(
          "The AWS account ID that this discovery config applies to. Within an AWS organization, you can find the AWS account ID inside an AWS account ARN. Example: arn:{partition}:organizations::{management_account_id}:account/{org_id}/{account_id}",
        ).optional(),
        allAssetInventoryAssets: z.boolean().describe(
          "All AWS assets stored in Asset Inventory that didn't match other AWS discovery configs.",
        ).optional(),
      }).describe("The AWS starting location for discovery.").optional(),
    }).describe("The other cloud starting location for discovery.").optional(),
    processingLocation: z.object({
      documentFallbackLocation: z.object({
        globalProcessing: z.object({}).describe(
          "Processing occurs in the global region.",
        ).optional(),
        multiRegionProcessing: z.object({}).describe(
          "Processing occurs in a multi-region that contains the current region if available.",
        ).optional(),
      }).describe(
        "Configure document processing to fall back to any of the following processing options if document processing is unavailable in the original request location.",
      ).optional(),
      imageFallbackLocation: z.object({
        globalProcessing: z.object({}).describe(
          "Processing occurs in the global region.",
        ).optional(),
        multiRegionProcessing: z.object({}).describe(
          "Processing occurs in a multi-region that contains the current region if available.",
        ).optional(),
      }).describe(
        "Configure image processing to fall back to any of the following processing options if image processing is unavailable in the original request location.",
      ).optional(),
    }).describe(
      "Configure processing location for discovery and inspection. For example, image OCR is only provided in limited regions but configuring ProcessingLocation will redirect OCR to a location where OCR is provided.",
    ).optional(),
    status: z.enum(["STATUS_UNSPECIFIED", "RUNNING", "PAUSED"]).describe(
      "Required. A status for this configuration.",
    ).optional(),
    targets: z.array(z.object({
      bigQueryTarget: z.object({
        cadence: z.object({
          inspectTemplateModifiedCadence: z.unknown().describe(
            "The cadence at which to update data profiles when the inspection rules defined by the `InspectTemplate` change.",
          ).optional(),
          refreshFrequency: z.unknown().describe(
            "Frequency at which profiles should be updated, regardless of whether the underlying resource has changed. Defaults to never.",
          ).optional(),
          schemaModifiedCadence: z.unknown().describe(
            "The cadence at which to update data profiles when a schema is modified.",
          ).optional(),
          tableModifiedCadence: z.unknown().describe(
            "The cadence at which to update data profiles when a table is modified.",
          ).optional(),
        }).describe(
          "What must take place for a profile to be updated and how frequently it should occur. New tables are scanned as quickly as possible depending on system capacity.",
        ).optional(),
        conditions: z.object({
          createdAfter: z.unknown().describe(
            "BigQuery table must have been created after this date. Used to avoid backfilling.",
          ).optional(),
          orConditions: z.unknown().describe(
            "There is an OR relationship between these attributes. They are used to determine if a table should be scanned or not in Discovery.",
          ).optional(),
          typeCollection: z.unknown().describe(
            "Restrict discovery to categories of table types.",
          ).optional(),
          types: z.unknown().describe(
            "The types of BigQuery tables supported by Cloud DLP.",
          ).optional(),
        }).describe(
          "Requirements that must be true before a table is scanned in discovery for the first time. There is an AND relationship between the top-level attributes. Additionally, minimum conditions with an OR relationship that must be met before Cloud DLP scans a table can be set (like a minimum row count or a minimum table age).",
        ).optional(),
        disabled: z.object({}).describe("Do not profile the tables.")
          .optional(),
        filter: z.object({
          otherTables: z.unknown().describe(
            "Catch-all for all other tables not specified by other filters. Should always be last, except for single-table configurations, which will only have a TableReference target.",
          ).optional(),
          tableReference: z.unknown().describe(
            "Message defining the location of a BigQuery table with the projectId inferred from the parent project.",
          ).optional(),
          tables: z.unknown().describe(
            "Specifies a collection of BigQuery tables. Used for Discovery.",
          ).optional(),
        }).describe(
          "Determines what tables will have profiles generated within an organization or project. Includes the ability to filter by regular expression patterns on project ID, dataset ID, and table ID.",
        ).optional(),
      }).describe(
        "Target used to match against for discovery with BigQuery tables",
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
          "Requirements that must be true before a table is profiled for the first time.",
        ).optional(),
        disabled: z.object({}).describe("Do not profile the tables.")
          .optional(),
        filter: z.object({
          collection: z.unknown().describe(
            "Match database resources using regex filters. Examples of database resources are tables, views, and stored procedures.",
          ).optional(),
          databaseResourceReference: z.unknown().describe(
            "Identifies a single database resource, like a table within a database.",
          ).optional(),
          others: z.unknown().describe(
            "Match database resources not covered by any other filter.",
          ).optional(),
        }).describe(
          "Determines what tables will have profiles generated within an organization or project. Includes the ability to filter by regular expression patterns on project ID, location, instance, database, and database resource name.",
        ).optional(),
        generationCadence: z.object({
          inspectTemplateModifiedCadence: z.unknown().describe(
            "The cadence at which to update data profiles when the inspection rules defined by the `InspectTemplate` change.",
          ).optional(),
          refreshFrequency: z.unknown().describe(
            "Data changes (non-schema changes) in Cloud SQL tables can't trigger reprofiling. If you set this field, profiles are refreshed at this frequency regardless of whether the underlying tables have changed. Defaults to never.",
          ).optional(),
          schemaModifiedCadence: z.unknown().describe(
            "How frequently to modify the profile when the table's schema is modified.",
          ).optional(),
        }).describe(
          "How often existing tables should have their profiles refreshed. New tables are scanned as quickly as possible depending on system capacity.",
        ).optional(),
      }).describe(
        "Target used to match against for discovery with Cloud SQL tables.",
      ).optional(),
      cloudStorageTarget: z.object({
        conditions: z.object({
          cloudStorageConditions: z.unknown().describe(
            "Requirements that must be true before a Cloud Storage bucket or object is scanned in discovery for the first time. There is an AND relationship between the top-level attributes.",
          ).optional(),
          createdAfter: z.unknown().describe(
            "Optional. File store must have been created after this date. Used to avoid backfilling.",
          ).optional(),
          minAge: z.unknown().describe(
            "Optional. Minimum age a file store must have. If set, the value must be 1 hour or greater.",
          ).optional(),
        }).describe(
          "Requirements that must be true before a file store is scanned in discovery for the first time. There is an AND relationship between the top-level attributes.",
        ).optional(),
        disabled: z.object({}).describe("Do not profile the tables.")
          .optional(),
        filter: z.object({
          cloudStorageResourceReference: z.unknown().describe(
            "Identifies a single Cloud Storage bucket.",
          ).optional(),
          collection: z.unknown().describe(
            "Match file stores (e.g. buckets) using filters.",
          ).optional(),
          others: z.unknown().describe(
            "Match discovery resources not covered by any other filter.",
          ).optional(),
        }).describe(
          "Determines which buckets will have profiles generated within an organization or project. Includes the ability to filter by regular expression patterns on project ID and bucket name.",
        ).optional(),
        generationCadence: z.object({
          inspectTemplateModifiedCadence: z.unknown().describe(
            "The cadence at which to update data profiles when the inspection rules defined by the `InspectTemplate` change.",
          ).optional(),
          refreshFrequency: z.unknown().describe(
            "Optional. Data changes in Cloud Storage can't trigger reprofiling. If you set this field, profiles are refreshed at this frequency regardless of whether the underlying buckets have changed. Defaults to never.",
          ).optional(),
        }).describe(
          "How often existing buckets should have their profiles refreshed. New buckets are scanned as quickly as possible depending on system capacity.",
        ).optional(),
      }).describe(
        "Target used to match against for discovery with Cloud Storage buckets.",
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
          "Requirements that must be true before a resource is profiled for the first time.",
        ).optional(),
        dataSourceType: z.object({
          dataSource: z.unknown().describe(
            "A string that identifies the type of resource being profiled. Current values: * google/bigquery/table * google/project * google/sql/table * google/gcs/bucket",
          ).optional(),
        }).describe(
          "Message used to identify the type of resource being profiled.",
        ).optional(),
        disabled: z.object({}).describe("Do not profile the tables.")
          .optional(),
        filter: z.object({
          collection: z.unknown().describe(
            "Match resources using regex filters.",
          ).optional(),
          others: z.unknown().describe(
            "Match discovery resources not covered by any other filter.",
          ).optional(),
          singleResource: z.unknown().describe(
            "Identifies a single resource, like a single Amazon S3 bucket.",
          ).optional(),
        }).describe(
          "Determines which resources from the other cloud will have profiles generated. Includes the ability to filter by resource names.",
        ).optional(),
        generationCadence: z.object({
          inspectTemplateModifiedCadence: z.unknown().describe(
            "The cadence at which to update data profiles when the inspection rules defined by the `InspectTemplate` change.",
          ).optional(),
          refreshFrequency: z.unknown().describe(
            "Optional. Frequency to update profiles regardless of whether the underlying resource has changes. Defaults to never.",
          ).optional(),
        }).describe(
          "How often existing resources should have their profiles refreshed. New resources are scanned as quickly as possible depending on system capacity.",
        ).optional(),
      }).describe(
        "Target used to match against for discovery of resources from other clouds. An [AWS connector in Security Command Center (Enterprise](https://cloud.google.com/security-command-center/docs/connect-scc-to-aws) is required to use this feature.",
      ).optional(),
      secretsTarget: z.object({}).describe(
        "Discovery target for credentials and secrets in cloud resource metadata. This target does not include any filtering or frequency controls. Cloud DLP will scan cloud resource metadata for secrets daily. No inspect template should be included in the discovery config for a security benchmarks scan. Instead, the built-in list of secrets and credentials infoTypes will be used (see https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference#credentials_and_secrets). Credentials and secrets discovered will be reported as vulnerabilities to Security Command Center.",
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
          "Requirements that must be true before a dataset is profiled for the first time.",
        ).optional(),
        disabled: z.object({}).describe("Do not profile the tables.")
          .optional(),
        filter: z.object({
          collection: z.unknown().describe(
            "Match dataset resources using regex filters.",
          ).optional(),
          others: z.unknown().describe(
            "Match discovery resources not covered by any other filter.",
          ).optional(),
          vertexDatasetResourceReference: z.unknown().describe(
            "Identifies a single Vertex AI resource. Only datasets are supported.",
          ).optional(),
        }).describe(
          "Determines what datasets will have profiles generated within an organization or project. Includes the ability to filter by regular expression patterns on project ID or dataset regex.",
        ).optional(),
        generationCadence: z.object({
          inspectTemplateModifiedCadence: z.unknown().describe(
            "The cadence at which to update data profiles when the inspection rules defined by the `InspectTemplate` change.",
          ).optional(),
          refreshFrequency: z.unknown().describe(
            "If you set this field, profiles are refreshed at this frequency regardless of whether the underlying datasets have changed. Defaults to never.",
          ).optional(),
        }).describe(
          "How often existing datasets should have their profiles refreshed. New datasets are scanned as quickly as possible depending on system capacity.",
        ).optional(),
      }).describe(
        "Target used to match against for discovery with Vertex AI datasets.",
      ).optional(),
    })).describe(
      "Target to match against for determining what to scan and how frequently.",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. The last update timestamp of a DiscoveryConfig.",
    ).optional(),
  }).describe(
    "Configuration for discovery to scan resources for profile generation. Only one discovery configuration may exist per organization, folder, or project. The generated data profiles are retained according to the [data retention policy] (https://cloud.google.com/sensitive-data-protection/docs/data-profiles#retention).",
  ).optional(),
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
          "Message defining the location of a BigQuery table. A table is uniquely identified by its project_id, dataset_id, and table_name. Within a query a table is often referenced with a string in the format of: `:.` or `..`.",
        ).optional(),
        sampleFindingsTable: z.object({
          datasetId: z.unknown().describe("Dataset ID of the table.")
            .optional(),
          projectId: z.unknown().describe(
            "The Google Cloud project ID of the project containing the table. If omitted, project ID is inferred from the API call.",
          ).optional(),
          tableId: z.unknown().describe("Name of the table.").optional(),
        }).describe(
          "Message defining the location of a BigQuery table. A table is uniquely identified by its project_id, dataset_id, and table_name. Within a query a table is often referenced with a string in the format of: `:.` or `..`.",
        ).optional(),
      }).describe(
        "If set, the detailed data profiles will be persisted to the location of your choice whenever updated.",
      ).optional(),
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
          expressions: z.unknown().describe(
            "An expression, consisting of an operator and conditions.",
          ).optional(),
        }).describe(
          "A condition for determining whether a Pub/Sub should be triggered.",
        ).optional(),
        topic: z.string().describe(
          "Cloud Pub/Sub topic to send notifications to. Format is projects/{project}/topics/{topic}.",
        ).optional(),
      }).describe(
        "Send a Pub/Sub message into the given Pub/Sub topic to connect other systems to data profile generation. The message payload data will be the byte serialization of `DataProfilePubSubMessage`.",
      ).optional(),
      publishToChronicle: z.object({}).describe(
        "Message expressing intention to publish to Google Security Operations.",
      ).optional(),
      publishToDataplexCatalog: z.object({
        lowerDataRiskToLow: z.boolean().describe(
          "Whether creating a Dataplex Universal Catalog aspect for a profiled resource should lower the risk of the profile for that resource. This also lowers the data risk of resources at the lower levels of the resource hierarchy. For example, reducing the data risk of a table data profile also reduces the data risk of the constituent column data profiles.",
        ).optional(),
      }).describe(
        "Create Dataplex Universal Catalog aspects for profiled resources with the aspect type Sensitive Data Protection Profile. To learn more about aspects, see https://cloud.google.com/sensitive-data-protection/docs/add-aspects.",
      ).optional(),
      publishToScc: z.object({}).describe(
        "If set, a summary finding will be created or updated in Security Command Center for each profile.",
      ).optional(),
      tagResources: z.object({
        lowerDataRiskToLow: z.boolean().describe(
          "Whether applying a tag to a resource should lower the risk of the profile for that resource. For example, in conjunction with an [IAM deny policy](https://cloud.google.com/iam/docs/deny-overview), you can deny all principals a permission if a tag value is present, mitigating the risk of the resource. This also lowers the data risk of resources at the lower levels of the resource hierarchy. For example, reducing the data risk of a table data profile also reduces the data risk of the constituent column data profiles.",
        ).optional(),
        profileGenerationsToTag: z.array(z.unknown()).describe(
          "The profile generations for which the tag should be attached to resources. If you attach a tag to only new profiles, then if the sensitivity score of a profile subsequently changes, its tag doesn't change. By default, this field includes only new profiles. To include both new and updated profiles for tagging, this field should explicitly include both `PROFILE_GENERATION_NEW` and `PROFILE_GENERATION_UPDATE`.",
        ).optional(),
        tagConditions: z.array(z.unknown()).describe(
          "The tags to associate with different conditions.",
        ).optional(),
      }).describe(
        "If set, attaches the [tags] (https://cloud.google.com/resource-manager/docs/tags/tags-overview) provided to profiled resources. Tags support [access control](https://cloud.google.com/iam/docs/tags-access-control). You can conditionally grant or deny access to a resource based on whether the resource has a specific tag.",
      ).optional(),
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
      }).describe(
        "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
      ).optional(),
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
      'Detection logic for profile generation. Not all template features are used by Discovery. FindingLimits, include_quote and exclude_info_types have no impact on Discovery. Multiple templates may be provided if there is data in multiple regions. At most one template must be specified per-region (including "global"). Each region is scanned using the applicable template. If no region-specific template is specified, but a "global" template is specified, it will be copied to that region and used instead. If no global or region-specific template is provided for a region with data, that region\'s data will not be scanned. For more information, see https://cloud.google.com/sensitive-data-protection/docs/data-profiles#data-residency.',
    ).optional(),
    lastRunTime: z.string().describe(
      "Output only. The timestamp of the last time this config was executed.",
    ).optional(),
    name: z.string().describe(
      "Unique resource name for the DiscoveryConfig, assigned by the service when the DiscoveryConfig is created, for example `projects/dlp-test-project/locations/global/discoveryConfigs/53234423`.",
    ).optional(),
    orgConfig: z.object({
      location: z.object({
        folderId: z.string().describe(
          "The ID of the folder within an organization to be scanned.",
        ).optional(),
        organizationId: z.string().describe(
          "The ID of an organization to scan.",
        ).optional(),
      }).describe(
        "The location to begin a discovery scan. Denotes an organization ID or folder ID within an organization.",
      ).optional(),
      projectId: z.string().describe(
        "The project that will run the scan. The DLP service account that exists within this project must have access to all resources that are profiled, and the DLP API must be enabled.",
      ).optional(),
    }).describe(
      "Project and scan location information. Only set when the parent is an org.",
    ).optional(),
    otherCloudStartingLocation: z.object({
      awsLocation: z.object({
        accountId: z.string().describe(
          "The AWS account ID that this discovery config applies to. Within an AWS organization, you can find the AWS account ID inside an AWS account ARN. Example: arn:{partition}:organizations::{management_account_id}:account/{org_id}/{account_id}",
        ).optional(),
        allAssetInventoryAssets: z.boolean().describe(
          "All AWS assets stored in Asset Inventory that didn't match other AWS discovery configs.",
        ).optional(),
      }).describe("The AWS starting location for discovery.").optional(),
    }).describe("The other cloud starting location for discovery.").optional(),
    processingLocation: z.object({
      documentFallbackLocation: z.object({
        globalProcessing: z.object({}).describe(
          "Processing occurs in the global region.",
        ).optional(),
        multiRegionProcessing: z.object({}).describe(
          "Processing occurs in a multi-region that contains the current region if available.",
        ).optional(),
      }).describe(
        "Configure document processing to fall back to any of the following processing options if document processing is unavailable in the original request location.",
      ).optional(),
      imageFallbackLocation: z.object({
        globalProcessing: z.object({}).describe(
          "Processing occurs in the global region.",
        ).optional(),
        multiRegionProcessing: z.object({}).describe(
          "Processing occurs in a multi-region that contains the current region if available.",
        ).optional(),
      }).describe(
        "Configure image processing to fall back to any of the following processing options if image processing is unavailable in the original request location.",
      ).optional(),
    }).describe(
      "Configure processing location for discovery and inspection. For example, image OCR is only provided in limited regions but configuring ProcessingLocation will redirect OCR to a location where OCR is provided.",
    ).optional(),
    status: z.enum(["STATUS_UNSPECIFIED", "RUNNING", "PAUSED"]).describe(
      "Required. A status for this configuration.",
    ).optional(),
    targets: z.array(z.object({
      bigQueryTarget: z.object({
        cadence: z.object({
          inspectTemplateModifiedCadence: z.unknown().describe(
            "The cadence at which to update data profiles when the inspection rules defined by the `InspectTemplate` change.",
          ).optional(),
          refreshFrequency: z.unknown().describe(
            "Frequency at which profiles should be updated, regardless of whether the underlying resource has changed. Defaults to never.",
          ).optional(),
          schemaModifiedCadence: z.unknown().describe(
            "The cadence at which to update data profiles when a schema is modified.",
          ).optional(),
          tableModifiedCadence: z.unknown().describe(
            "The cadence at which to update data profiles when a table is modified.",
          ).optional(),
        }).describe(
          "What must take place for a profile to be updated and how frequently it should occur. New tables are scanned as quickly as possible depending on system capacity.",
        ).optional(),
        conditions: z.object({
          createdAfter: z.unknown().describe(
            "BigQuery table must have been created after this date. Used to avoid backfilling.",
          ).optional(),
          orConditions: z.unknown().describe(
            "There is an OR relationship between these attributes. They are used to determine if a table should be scanned or not in Discovery.",
          ).optional(),
          typeCollection: z.unknown().describe(
            "Restrict discovery to categories of table types.",
          ).optional(),
          types: z.unknown().describe(
            "The types of BigQuery tables supported by Cloud DLP.",
          ).optional(),
        }).describe(
          "Requirements that must be true before a table is scanned in discovery for the first time. There is an AND relationship between the top-level attributes. Additionally, minimum conditions with an OR relationship that must be met before Cloud DLP scans a table can be set (like a minimum row count or a minimum table age).",
        ).optional(),
        disabled: z.object({}).describe("Do not profile the tables.")
          .optional(),
        filter: z.object({
          otherTables: z.unknown().describe(
            "Catch-all for all other tables not specified by other filters. Should always be last, except for single-table configurations, which will only have a TableReference target.",
          ).optional(),
          tableReference: z.unknown().describe(
            "Message defining the location of a BigQuery table with the projectId inferred from the parent project.",
          ).optional(),
          tables: z.unknown().describe(
            "Specifies a collection of BigQuery tables. Used for Discovery.",
          ).optional(),
        }).describe(
          "Determines what tables will have profiles generated within an organization or project. Includes the ability to filter by regular expression patterns on project ID, dataset ID, and table ID.",
        ).optional(),
      }).describe(
        "Target used to match against for discovery with BigQuery tables",
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
          "Requirements that must be true before a table is profiled for the first time.",
        ).optional(),
        disabled: z.object({}).describe("Do not profile the tables.")
          .optional(),
        filter: z.object({
          collection: z.unknown().describe(
            "Match database resources using regex filters. Examples of database resources are tables, views, and stored procedures.",
          ).optional(),
          databaseResourceReference: z.unknown().describe(
            "Identifies a single database resource, like a table within a database.",
          ).optional(),
          others: z.unknown().describe(
            "Match database resources not covered by any other filter.",
          ).optional(),
        }).describe(
          "Determines what tables will have profiles generated within an organization or project. Includes the ability to filter by regular expression patterns on project ID, location, instance, database, and database resource name.",
        ).optional(),
        generationCadence: z.object({
          inspectTemplateModifiedCadence: z.unknown().describe(
            "The cadence at which to update data profiles when the inspection rules defined by the `InspectTemplate` change.",
          ).optional(),
          refreshFrequency: z.unknown().describe(
            "Data changes (non-schema changes) in Cloud SQL tables can't trigger reprofiling. If you set this field, profiles are refreshed at this frequency regardless of whether the underlying tables have changed. Defaults to never.",
          ).optional(),
          schemaModifiedCadence: z.unknown().describe(
            "How frequently to modify the profile when the table's schema is modified.",
          ).optional(),
        }).describe(
          "How often existing tables should have their profiles refreshed. New tables are scanned as quickly as possible depending on system capacity.",
        ).optional(),
      }).describe(
        "Target used to match against for discovery with Cloud SQL tables.",
      ).optional(),
      cloudStorageTarget: z.object({
        conditions: z.object({
          cloudStorageConditions: z.unknown().describe(
            "Requirements that must be true before a Cloud Storage bucket or object is scanned in discovery for the first time. There is an AND relationship between the top-level attributes.",
          ).optional(),
          createdAfter: z.unknown().describe(
            "Optional. File store must have been created after this date. Used to avoid backfilling.",
          ).optional(),
          minAge: z.unknown().describe(
            "Optional. Minimum age a file store must have. If set, the value must be 1 hour or greater.",
          ).optional(),
        }).describe(
          "Requirements that must be true before a file store is scanned in discovery for the first time. There is an AND relationship between the top-level attributes.",
        ).optional(),
        disabled: z.object({}).describe("Do not profile the tables.")
          .optional(),
        filter: z.object({
          cloudStorageResourceReference: z.unknown().describe(
            "Identifies a single Cloud Storage bucket.",
          ).optional(),
          collection: z.unknown().describe(
            "Match file stores (e.g. buckets) using filters.",
          ).optional(),
          others: z.unknown().describe(
            "Match discovery resources not covered by any other filter.",
          ).optional(),
        }).describe(
          "Determines which buckets will have profiles generated within an organization or project. Includes the ability to filter by regular expression patterns on project ID and bucket name.",
        ).optional(),
        generationCadence: z.object({
          inspectTemplateModifiedCadence: z.unknown().describe(
            "The cadence at which to update data profiles when the inspection rules defined by the `InspectTemplate` change.",
          ).optional(),
          refreshFrequency: z.unknown().describe(
            "Optional. Data changes in Cloud Storage can't trigger reprofiling. If you set this field, profiles are refreshed at this frequency regardless of whether the underlying buckets have changed. Defaults to never.",
          ).optional(),
        }).describe(
          "How often existing buckets should have their profiles refreshed. New buckets are scanned as quickly as possible depending on system capacity.",
        ).optional(),
      }).describe(
        "Target used to match against for discovery with Cloud Storage buckets.",
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
          "Requirements that must be true before a resource is profiled for the first time.",
        ).optional(),
        dataSourceType: z.object({
          dataSource: z.unknown().describe(
            "A string that identifies the type of resource being profiled. Current values: * google/bigquery/table * google/project * google/sql/table * google/gcs/bucket",
          ).optional(),
        }).describe(
          "Message used to identify the type of resource being profiled.",
        ).optional(),
        disabled: z.object({}).describe("Do not profile the tables.")
          .optional(),
        filter: z.object({
          collection: z.unknown().describe(
            "Match resources using regex filters.",
          ).optional(),
          others: z.unknown().describe(
            "Match discovery resources not covered by any other filter.",
          ).optional(),
          singleResource: z.unknown().describe(
            "Identifies a single resource, like a single Amazon S3 bucket.",
          ).optional(),
        }).describe(
          "Determines which resources from the other cloud will have profiles generated. Includes the ability to filter by resource names.",
        ).optional(),
        generationCadence: z.object({
          inspectTemplateModifiedCadence: z.unknown().describe(
            "The cadence at which to update data profiles when the inspection rules defined by the `InspectTemplate` change.",
          ).optional(),
          refreshFrequency: z.unknown().describe(
            "Optional. Frequency to update profiles regardless of whether the underlying resource has changes. Defaults to never.",
          ).optional(),
        }).describe(
          "How often existing resources should have their profiles refreshed. New resources are scanned as quickly as possible depending on system capacity.",
        ).optional(),
      }).describe(
        "Target used to match against for discovery of resources from other clouds. An [AWS connector in Security Command Center (Enterprise](https://cloud.google.com/security-command-center/docs/connect-scc-to-aws) is required to use this feature.",
      ).optional(),
      secretsTarget: z.object({}).describe(
        "Discovery target for credentials and secrets in cloud resource metadata. This target does not include any filtering or frequency controls. Cloud DLP will scan cloud resource metadata for secrets daily. No inspect template should be included in the discovery config for a security benchmarks scan. Instead, the built-in list of secrets and credentials infoTypes will be used (see https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference#credentials_and_secrets). Credentials and secrets discovered will be reported as vulnerabilities to Security Command Center.",
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
          "Requirements that must be true before a dataset is profiled for the first time.",
        ).optional(),
        disabled: z.object({}).describe("Do not profile the tables.")
          .optional(),
        filter: z.object({
          collection: z.unknown().describe(
            "Match dataset resources using regex filters.",
          ).optional(),
          others: z.unknown().describe(
            "Match discovery resources not covered by any other filter.",
          ).optional(),
          vertexDatasetResourceReference: z.unknown().describe(
            "Identifies a single Vertex AI resource. Only datasets are supported.",
          ).optional(),
        }).describe(
          "Determines what datasets will have profiles generated within an organization or project. Includes the ability to filter by regular expression patterns on project ID or dataset regex.",
        ).optional(),
        generationCadence: z.object({
          inspectTemplateModifiedCadence: z.unknown().describe(
            "The cadence at which to update data profiles when the inspection rules defined by the `InspectTemplate` change.",
          ).optional(),
          refreshFrequency: z.unknown().describe(
            "If you set this field, profiles are refreshed at this frequency regardless of whether the underlying datasets have changed. Defaults to never.",
          ).optional(),
        }).describe(
          "How often existing datasets should have their profiles refreshed. New datasets are scanned as quickly as possible depending on system capacity.",
        ).optional(),
      }).describe(
        "Target used to match against for discovery with Vertex AI datasets.",
      ).optional(),
    })).describe(
      "Target to match against for determining what to scan and how frequently.",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. The last update timestamp of a DiscoveryConfig.",
    ).optional(),
  }).describe(
    "Configuration for discovery to scan resources for profile generation. Only one discovery configuration may exist per organization, folder, or project. The generated data profiles are retained according to the [data retention policy] (https://cloud.google.com/sensitive-data-protection/docs/data-profiles#retention).",
  ).optional(),
  updateMask: z.string().describe("Mask to control which fields get updated.")
    .optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Sensitive Data Protection (DLP) DiscoveryConfigs. Registered at `@swamp/gcp/dlp/discoveryconfigs`. */
export const model = {
  type: "@swamp/gcp/dlp/discoveryconfigs",
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
        const projectId = await getProjectId();
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
          BASE_URL,
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
    update: {
      description: "Update discoveryConfigs attributes",
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
          String(g["parent"] ?? ""),
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
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
          BASE_URL,
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
      description: "Sync discoveryConfigs state from GCP",
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
