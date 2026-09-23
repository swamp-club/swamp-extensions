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

// Auto-generated extension model for @swamp/gcp/metastore/services
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Dataproc Metastore Services.
 *
 * A managed metastore service that serves metadata queries.
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
  return `${parent}/services/${shortName}`;
}

const BASE_URL = "https://metastore.googleapis.com/";

const GET_CONFIG = {
  "id": "metastore.projects.locations.services.get",
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
  "id": "metastore.projects.locations.services.create",
  "path": "v1/{+parent}/services",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "serviceId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "metastore.projects.locations.services.patch",
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
    "requestId": {
      "location": "query",
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "metastore.projects.locations.services.delete",
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
    "requestId": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "metastore.projects.locations.services.list",
  "path": "v1/{+parent}/services",
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
  databaseType: z.enum(["DATABASE_TYPE_UNSPECIFIED", "MYSQL", "SPANNER"])
    .describe(
      "Immutable. The database type that the Metastore service stores its data.",
    ).optional(),
  deletionProtection: z.boolean().describe(
    "Optional. Indicates if the dataproc metastore should be protected against accidental deletions.",
  ).optional(),
  encryptionConfig: z.object({
    kmsKey: z.string().describe(
      "Optional. The fully qualified customer provided Cloud KMS key name to use for customer data encryption, in the following format:projects/{project_number}/locations/{location_id}/keyRings/{key_ring_id}/cryptoKeys/{crypto_key_id}.",
    ).optional(),
  }).describe(
    "Immutable. Information used to configure the Dataproc Metastore service to encrypt customer data at rest. Cannot be updated.",
  ).optional(),
  hiveMetastoreConfig: z.object({
    auxiliaryVersions: z.record(
      z.string(),
      z.object({
        configOverrides: z.record(z.string(), z.string()).describe(
          "Optional. A mapping of Hive metastore configuration key-value pairs to apply to the auxiliary Hive metastore (configured in hive-site.xml) in addition to the primary version's overrides. If keys are present in both the auxiliary version's overrides and the primary version's overrides, the value from the auxiliary version's overrides takes precedence.",
        ).optional(),
        networkConfig: z.object({
          consumers: z.array(z.unknown()).describe(
            "Immutable. The consumer-side network configuration for the Dataproc Metastore instance.",
          ).optional(),
        }).describe(
          "Output only. The network configuration contains the endpoint URI(s) of the auxiliary Hive metastore service.",
        ).optional(),
        version: z.string().describe(
          "Optional. The Hive metastore version of the auxiliary service. It must be less than the primary Hive metastore service's version.",
        ).optional(),
      }),
    ).describe(
      "Optional. A mapping of Hive metastore version to the auxiliary version configuration. When specified, a secondary Hive metastore service is created along with the primary service. All auxiliary versions must be less than the service's primary version. The key is the auxiliary service name and it must match the regular expression a-z?. This means that the first character must be a lowercase letter, and all the following characters must be hyphens, lowercase letters, or digits, except the last character, which cannot be a hyphen.",
    ).optional(),
    configOverrides: z.record(z.string(), z.string()).describe(
      "Optional. A mapping of Hive metastore configuration key-value pairs to apply to the Hive metastore (configured in hive-site.xml). The mappings override system defaults (some keys cannot be overridden). These overrides are also applied to auxiliary versions and can be further customized in the auxiliary version's AuxiliaryVersionConfig.",
    ).optional(),
    endpointProtocol: z.enum([
      "ENDPOINT_PROTOCOL_UNSPECIFIED",
      "THRIFT",
      "GRPC",
    ]).describe(
      "Optional. The protocol to use for the metastore service endpoint. If unspecified, defaults to THRIFT.",
    ).optional(),
    kerberosConfig: z.object({
      keytab: z.object({
        cloudSecret: z.string().describe(
          "Optional. The relative resource name of a Secret Manager secret version, in the following form:projects/{project_number}/secrets/{secret_id}/versions/{version_id}.",
        ).optional(),
      }).describe(
        "Optional. A Kerberos keytab file that can be used to authenticate a service principal with a Kerberos Key Distribution Center (KDC).",
      ).optional(),
      krb5ConfigGcsUri: z.string().describe(
        "Optional. A Cloud Storage URI that specifies the path to a krb5.conf file. It is of the form gs://{bucket_name}/path/to/krb5.conf, although the file does not need to be named krb5.conf explicitly.",
      ).optional(),
      principal: z.string().describe(
        "Optional. A Kerberos principal that exists in the both the keytab the KDC to authenticate as. A typical principal is of the form primary/instance@REALM, but there is no exact format.",
      ).optional(),
    }).describe(
      "Optional. Information used to configure the Hive metastore service as a service principal in a Kerberos realm. To disable Kerberos, use the UpdateService method and specify this field's path (hive_metastore_config.kerberos_config) in the request's update_mask while omitting this field from the request's service.",
    ).optional(),
    version: z.string().describe(
      "Immutable. The Hive metastore schema version.",
    ).optional(),
  }).describe(
    "Configuration information specific to running Hive metastore software as the metastore service.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "User-defined labels for the metastore service.",
  ).optional(),
  maintenanceWindow: z.object({
    dayOfWeek: z.enum([
      "DAY_OF_WEEK_UNSPECIFIED",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
      "SUNDAY",
    ]).describe("Optional. The day of week, when the window starts.")
      .optional(),
    hourOfDay: z.number().int().describe(
      "Optional. The hour of day (0-23) when the window starts.",
    ).optional(),
  }).describe(
    "Optional. The one hour maintenance window of the metastore service. This specifies when the service can be restarted for maintenance purposes in UTC time. Maintenance window is not needed for services with the SPANNER database type.",
  ).optional(),
  metadataIntegration: z.object({
    dataCatalogConfig: z.object({
      enabled: z.boolean().describe(
        "Optional. Defines whether the metastore metadata should be synced to Data Catalog. The default value is to disable syncing metastore metadata to Data Catalog.",
      ).optional(),
    }).describe(
      "Optional. The integration config for the Data Catalog service.",
    ).optional(),
  }).describe(
    "Optional. The setting that defines how metastore metadata should be integrated with external services and systems.",
  ).optional(),
  name: z.string().describe(
    "Immutable. Identifier. The relative resource name of the metastore service, in the following format:projects/{project_number}/locations/{location_id}/services/{service_id}.",
  ).optional(),
  network: z.string().describe(
    "Immutable. The relative resource name of the VPC network on which the instance can be accessed. It is specified in the following form:projects/{project_number}/global/networks/{network_id}.",
  ).optional(),
  networkConfig: z.object({
    consumers: z.array(z.object({
      endpointLocation: z.string().describe(
        "Output only. The location of the endpoint URI. Format: projects/{project}/locations/{location}.",
      ).optional(),
      endpointUri: z.string().describe(
        "Output only. The URI of the endpoint used to access the metastore service.",
      ).optional(),
      subnetwork: z.string().describe(
        "Immutable. The subnetwork of the customer project from which an IP address is reserved and used as the Dataproc Metastore service's endpoint. It is accessible to hosts in the subnet and to all hosts in a subnet in the same region and same network. There must be at least one IP address available in the subnet's primary range. The subnet is specified in the following form:projects/{project_number}/regions/{region_id}/subnetworks/{subnetwork_id}",
      ).optional(),
    })).describe(
      "Immutable. The consumer-side network configuration for the Dataproc Metastore instance.",
    ).optional(),
  }).describe(
    "Optional. The configuration specifying the network settings for the Dataproc Metastore service.",
  ).optional(),
  port: z.number().int().describe(
    "Optional. The TCP port at which the metastore service is reached. Default: 9083.",
  ).optional(),
  releaseChannel: z.enum(["RELEASE_CHANNEL_UNSPECIFIED", "CANARY", "STABLE"])
    .describe(
      "Immutable. The release channel of the service. If unspecified, defaults to STABLE.",
    ).optional(),
  scalingConfig: z.object({
    autoscalingConfig: z.object({
      autoscalingEnabled: z.boolean().describe(
        "Optional. Whether or not autoscaling is enabled for this service.",
      ).optional(),
      autoscalingFactor: z.number().describe(
        "Output only. The scaling factor of a service with autoscaling enabled.",
      ).optional(),
      limitConfig: z.object({
        maxScalingFactor: z.number().describe(
          "Optional. The highest scaling factor that the service should be autoscaled to.",
        ).optional(),
        minScalingFactor: z.number().describe(
          "Optional. The lowest scaling factor that the service should be autoscaled to.",
        ).optional(),
      }).describe("Optional. The LimitConfig of the service.").optional(),
    }).describe("Optional. The autoscaling configuration.").optional(),
    instanceSize: z.enum([
      "INSTANCE_SIZE_UNSPECIFIED",
      "EXTRA_SMALL",
      "SMALL",
      "MEDIUM",
      "LARGE",
      "EXTRA_LARGE",
    ]).describe(
      "An enum of readable instance sizes, with each instance size mapping to a float value (e.g. InstanceSize.EXTRA_SMALL = scaling_factor(0.1))",
    ).optional(),
    scalingFactor: z.number().describe(
      "Scaling factor, increments of 0.1 for values less than 1.0, and increments of 1.0 for values greater than 1.0.",
    ).optional(),
  }).describe("Optional. Scaling configuration of the metastore service.")
    .optional(),
  scheduledBackup: z.object({
    backupLocation: z.string().describe(
      "Optional. A Cloud Storage URI of a folder, in the format gs:///. A sub-folder containing backup files will be stored below it.",
    ).optional(),
    cronSchedule: z.string().describe(
      "Optional. The scheduled interval in Cron format, see https://en.wikipedia.org/wiki/Cron The default is empty: scheduled backup is not enabled. Must be specified to enable scheduled backups.",
    ).optional(),
    enabled: z.boolean().describe(
      "Optional. Defines whether the scheduled backup is enabled. The default value is false.",
    ).optional(),
    latestBackup: z.object({
      backupId: z.string().describe(
        "Output only. The ID of an in-progress scheduled backup. Empty if no backup is in progress.",
      ).optional(),
      duration: z.string().describe(
        "Output only. The duration of the backup completion.",
      ).optional(),
      startTime: z.string().describe(
        "Output only. The time when the backup was started.",
      ).optional(),
      state: z.enum(["STATE_UNSPECIFIED", "IN_PROGRESS", "SUCCEEDED", "FAILED"])
        .describe("Output only. The current state of the backup.").optional(),
    }).describe("Output only. The details of the latest scheduled backup.")
      .optional(),
    nextScheduledTime: z.string().describe(
      "Output only. The time when the next backups execution is scheduled to start.",
    ).optional(),
    timeZone: z.string().describe(
      "Optional. Specifies the time zone to be used when interpreting cron_schedule. Must be a time zone name from the time zone database (https://en.wikipedia.org/wiki/List_of_tz_database_time_zones), e.g. America/Los_Angeles or Africa/Abidjan. If left unspecified, the default is UTC.",
    ).optional(),
  }).describe(
    "Optional. The configuration of scheduled backup for the metastore service.",
  ).optional(),
  tags: z.record(z.string(), z.string()).describe(
    'Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: "123/environment": "production", "123/costCenter": "marketing"',
  ).optional(),
  telemetryConfig: z.object({
    logFormat: z.enum(["LOG_FORMAT_UNSPECIFIED", "LEGACY", "JSON"]).describe(
      "Optional. The output format of the Dataproc Metastore service's logs.",
    ).optional(),
  }).describe(
    "Optional. The configuration specifying telemetry settings for the Dataproc Metastore service. If unspecified defaults to JSON.",
  ).optional(),
  tier: z.enum(["TIER_UNSPECIFIED", "DEVELOPER", "ENTERPRISE"]).describe(
    "Optional. The tier of the service.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. A request ID. Specify a unique request ID to allow the server to ignore the request if it has completed. The server will ignore subsequent requests that provide a duplicate request ID for at least 60 minutes after the first request.For example, if an initial request times out, followed by another request with the same request ID, the server ignores the second request to prevent the creation of duplicate commitments.The request ID must be a valid UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier#Format) A zero UUID (00000000-0000-0000-0000-000000000000) is not supported.",
  ).optional(),
  serviceId: z.string().describe(
    "Required. The ID of the metastore service, which is used as the final component of the metastore service's name.This value must be between 2 and 63 characters long inclusive, begin with a letter, end with a letter or number, and consist of alpha-numeric ASCII characters or hyphens.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  artifactGcsUri: z.string().optional(),
  createTime: z.string().optional(),
  databaseType: z.string().optional(),
  deletionProtection: z.boolean().optional(),
  encryptionConfig: z.object({
    kmsKey: z.string(),
  }).optional(),
  endpointUri: z.string().optional(),
  hiveMetastoreConfig: z.object({
    auxiliaryVersions: z.record(z.string(), z.unknown()),
    configOverrides: z.record(z.string(), z.unknown()),
    endpointProtocol: z.string(),
    kerberosConfig: z.object({
      keytab: z.object({
        cloudSecret: z.string(),
      }),
      krb5ConfigGcsUri: z.string(),
      principal: z.string(),
    }),
    version: z.string(),
  }).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  lakehouseProxyConfig: z.object({
    catalog: z.string(),
    namespaces: z.array(z.string()),
  }).optional(),
  maintenanceWindow: z.object({
    dayOfWeek: z.string(),
    hourOfDay: z.number(),
  }).optional(),
  metadataIntegration: z.object({
    dataCatalogConfig: z.object({
      enabled: z.boolean(),
    }),
  }).optional(),
  metadataManagementActivity: z.object({
    metadataExports: z.array(z.object({
      databaseDumpType: z.string(),
      destinationGcsUri: z.string(),
      endTime: z.string(),
      startTime: z.string(),
      state: z.string(),
    })),
    restores: z.array(z.object({
      backup: z.string(),
      backupLocation: z.string(),
      details: z.string(),
      endTime: z.string(),
      startTime: z.string(),
      state: z.string(),
      type: z.string(),
    })),
  }).optional(),
  name: z.string(),
  network: z.string().optional(),
  networkConfig: z.object({
    consumers: z.array(z.object({
      endpointLocation: z.string(),
      endpointUri: z.string(),
      subnetwork: z.string(),
    })),
  }).optional(),
  port: z.number().optional(),
  releaseChannel: z.string().optional(),
  scalingConfig: z.object({
    autoscalingConfig: z.object({
      autoscalingEnabled: z.boolean(),
      autoscalingFactor: z.number(),
      limitConfig: z.object({
        maxScalingFactor: z.number(),
        minScalingFactor: z.number(),
      }),
    }),
    instanceSize: z.string(),
    scalingFactor: z.number(),
  }).optional(),
  scheduledBackup: z.object({
    backupLocation: z.string(),
    cronSchedule: z.string(),
    enabled: z.boolean(),
    latestBackup: z.object({
      backupId: z.string(),
      duration: z.string(),
      startTime: z.string(),
      state: z.string(),
    }),
    nextScheduledTime: z.string(),
    timeZone: z.string(),
  }).optional(),
  state: z.string().optional(),
  stateMessage: z.string().optional(),
  tags: z.record(z.string(), z.unknown()).optional(),
  telemetryConfig: z.object({
    logFormat: z.string(),
  }).optional(),
  tier: z.string().optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  databaseType: z.enum(["DATABASE_TYPE_UNSPECIFIED", "MYSQL", "SPANNER"])
    .describe(
      "Immutable. The database type that the Metastore service stores its data.",
    ).optional(),
  deletionProtection: z.boolean().describe(
    "Optional. Indicates if the dataproc metastore should be protected against accidental deletions.",
  ).optional(),
  encryptionConfig: z.object({
    kmsKey: z.string().describe(
      "Optional. The fully qualified customer provided Cloud KMS key name to use for customer data encryption, in the following format:projects/{project_number}/locations/{location_id}/keyRings/{key_ring_id}/cryptoKeys/{crypto_key_id}.",
    ).optional(),
  }).describe(
    "Immutable. Information used to configure the Dataproc Metastore service to encrypt customer data at rest. Cannot be updated.",
  ).optional(),
  hiveMetastoreConfig: z.object({
    auxiliaryVersions: z.record(
      z.string(),
      z.object({
        configOverrides: z.record(z.string(), z.string()).describe(
          "Optional. A mapping of Hive metastore configuration key-value pairs to apply to the auxiliary Hive metastore (configured in hive-site.xml) in addition to the primary version's overrides. If keys are present in both the auxiliary version's overrides and the primary version's overrides, the value from the auxiliary version's overrides takes precedence.",
        ).optional(),
        networkConfig: z.object({
          consumers: z.array(z.unknown()).describe(
            "Immutable. The consumer-side network configuration for the Dataproc Metastore instance.",
          ).optional(),
        }).describe(
          "Output only. The network configuration contains the endpoint URI(s) of the auxiliary Hive metastore service.",
        ).optional(),
        version: z.string().describe(
          "Optional. The Hive metastore version of the auxiliary service. It must be less than the primary Hive metastore service's version.",
        ).optional(),
      }),
    ).describe(
      "Optional. A mapping of Hive metastore version to the auxiliary version configuration. When specified, a secondary Hive metastore service is created along with the primary service. All auxiliary versions must be less than the service's primary version. The key is the auxiliary service name and it must match the regular expression a-z?. This means that the first character must be a lowercase letter, and all the following characters must be hyphens, lowercase letters, or digits, except the last character, which cannot be a hyphen.",
    ).optional(),
    configOverrides: z.record(z.string(), z.string()).describe(
      "Optional. A mapping of Hive metastore configuration key-value pairs to apply to the Hive metastore (configured in hive-site.xml). The mappings override system defaults (some keys cannot be overridden). These overrides are also applied to auxiliary versions and can be further customized in the auxiliary version's AuxiliaryVersionConfig.",
    ).optional(),
    endpointProtocol: z.enum([
      "ENDPOINT_PROTOCOL_UNSPECIFIED",
      "THRIFT",
      "GRPC",
    ]).describe(
      "Optional. The protocol to use for the metastore service endpoint. If unspecified, defaults to THRIFT.",
    ).optional(),
    kerberosConfig: z.object({
      keytab: z.object({
        cloudSecret: z.string().describe(
          "Optional. The relative resource name of a Secret Manager secret version, in the following form:projects/{project_number}/secrets/{secret_id}/versions/{version_id}.",
        ).optional(),
      }).describe(
        "Optional. A Kerberos keytab file that can be used to authenticate a service principal with a Kerberos Key Distribution Center (KDC).",
      ).optional(),
      krb5ConfigGcsUri: z.string().describe(
        "Optional. A Cloud Storage URI that specifies the path to a krb5.conf file. It is of the form gs://{bucket_name}/path/to/krb5.conf, although the file does not need to be named krb5.conf explicitly.",
      ).optional(),
      principal: z.string().describe(
        "Optional. A Kerberos principal that exists in the both the keytab the KDC to authenticate as. A typical principal is of the form primary/instance@REALM, but there is no exact format.",
      ).optional(),
    }).describe(
      "Optional. Information used to configure the Hive metastore service as a service principal in a Kerberos realm. To disable Kerberos, use the UpdateService method and specify this field's path (hive_metastore_config.kerberos_config) in the request's update_mask while omitting this field from the request's service.",
    ).optional(),
    version: z.string().describe(
      "Immutable. The Hive metastore schema version.",
    ).optional(),
  }).describe(
    "Configuration information specific to running Hive metastore software as the metastore service.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "User-defined labels for the metastore service.",
  ).optional(),
  maintenanceWindow: z.object({
    dayOfWeek: z.enum([
      "DAY_OF_WEEK_UNSPECIFIED",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
      "SUNDAY",
    ]).describe("Optional. The day of week, when the window starts.")
      .optional(),
    hourOfDay: z.number().int().describe(
      "Optional. The hour of day (0-23) when the window starts.",
    ).optional(),
  }).describe(
    "Optional. The one hour maintenance window of the metastore service. This specifies when the service can be restarted for maintenance purposes in UTC time. Maintenance window is not needed for services with the SPANNER database type.",
  ).optional(),
  metadataIntegration: z.object({
    dataCatalogConfig: z.object({
      enabled: z.boolean().describe(
        "Optional. Defines whether the metastore metadata should be synced to Data Catalog. The default value is to disable syncing metastore metadata to Data Catalog.",
      ).optional(),
    }).describe(
      "Optional. The integration config for the Data Catalog service.",
    ).optional(),
  }).describe(
    "Optional. The setting that defines how metastore metadata should be integrated with external services and systems.",
  ).optional(),
  name: z.string().describe(
    "Immutable. Identifier. The relative resource name of the metastore service, in the following format:projects/{project_number}/locations/{location_id}/services/{service_id}.",
  ).optional(),
  network: z.string().describe(
    "Immutable. The relative resource name of the VPC network on which the instance can be accessed. It is specified in the following form:projects/{project_number}/global/networks/{network_id}.",
  ).optional(),
  networkConfig: z.object({
    consumers: z.array(z.object({
      endpointLocation: z.string().describe(
        "Output only. The location of the endpoint URI. Format: projects/{project}/locations/{location}.",
      ).optional(),
      endpointUri: z.string().describe(
        "Output only. The URI of the endpoint used to access the metastore service.",
      ).optional(),
      subnetwork: z.string().describe(
        "Immutable. The subnetwork of the customer project from which an IP address is reserved and used as the Dataproc Metastore service's endpoint. It is accessible to hosts in the subnet and to all hosts in a subnet in the same region and same network. There must be at least one IP address available in the subnet's primary range. The subnet is specified in the following form:projects/{project_number}/regions/{region_id}/subnetworks/{subnetwork_id}",
      ).optional(),
    })).describe(
      "Immutable. The consumer-side network configuration for the Dataproc Metastore instance.",
    ).optional(),
  }).describe(
    "Optional. The configuration specifying the network settings for the Dataproc Metastore service.",
  ).optional(),
  port: z.number().int().describe(
    "Optional. The TCP port at which the metastore service is reached. Default: 9083.",
  ).optional(),
  releaseChannel: z.enum(["RELEASE_CHANNEL_UNSPECIFIED", "CANARY", "STABLE"])
    .describe(
      "Immutable. The release channel of the service. If unspecified, defaults to STABLE.",
    ).optional(),
  scalingConfig: z.object({
    autoscalingConfig: z.object({
      autoscalingEnabled: z.boolean().describe(
        "Optional. Whether or not autoscaling is enabled for this service.",
      ).optional(),
      autoscalingFactor: z.number().describe(
        "Output only. The scaling factor of a service with autoscaling enabled.",
      ).optional(),
      limitConfig: z.object({
        maxScalingFactor: z.number().describe(
          "Optional. The highest scaling factor that the service should be autoscaled to.",
        ).optional(),
        minScalingFactor: z.number().describe(
          "Optional. The lowest scaling factor that the service should be autoscaled to.",
        ).optional(),
      }).describe("Optional. The LimitConfig of the service.").optional(),
    }).describe("Optional. The autoscaling configuration.").optional(),
    instanceSize: z.enum([
      "INSTANCE_SIZE_UNSPECIFIED",
      "EXTRA_SMALL",
      "SMALL",
      "MEDIUM",
      "LARGE",
      "EXTRA_LARGE",
    ]).describe(
      "An enum of readable instance sizes, with each instance size mapping to a float value (e.g. InstanceSize.EXTRA_SMALL = scaling_factor(0.1))",
    ).optional(),
    scalingFactor: z.number().describe(
      "Scaling factor, increments of 0.1 for values less than 1.0, and increments of 1.0 for values greater than 1.0.",
    ).optional(),
  }).describe("Optional. Scaling configuration of the metastore service.")
    .optional(),
  scheduledBackup: z.object({
    backupLocation: z.string().describe(
      "Optional. A Cloud Storage URI of a folder, in the format gs:///. A sub-folder containing backup files will be stored below it.",
    ).optional(),
    cronSchedule: z.string().describe(
      "Optional. The scheduled interval in Cron format, see https://en.wikipedia.org/wiki/Cron The default is empty: scheduled backup is not enabled. Must be specified to enable scheduled backups.",
    ).optional(),
    enabled: z.boolean().describe(
      "Optional. Defines whether the scheduled backup is enabled. The default value is false.",
    ).optional(),
    latestBackup: z.object({
      backupId: z.string().describe(
        "Output only. The ID of an in-progress scheduled backup. Empty if no backup is in progress.",
      ).optional(),
      duration: z.string().describe(
        "Output only. The duration of the backup completion.",
      ).optional(),
      startTime: z.string().describe(
        "Output only. The time when the backup was started.",
      ).optional(),
      state: z.enum(["STATE_UNSPECIFIED", "IN_PROGRESS", "SUCCEEDED", "FAILED"])
        .describe("Output only. The current state of the backup.").optional(),
    }).describe("Output only. The details of the latest scheduled backup.")
      .optional(),
    nextScheduledTime: z.string().describe(
      "Output only. The time when the next backups execution is scheduled to start.",
    ).optional(),
    timeZone: z.string().describe(
      "Optional. Specifies the time zone to be used when interpreting cron_schedule. Must be a time zone name from the time zone database (https://en.wikipedia.org/wiki/List_of_tz_database_time_zones), e.g. America/Los_Angeles or Africa/Abidjan. If left unspecified, the default is UTC.",
    ).optional(),
  }).describe(
    "Optional. The configuration of scheduled backup for the metastore service.",
  ).optional(),
  tags: z.record(z.string(), z.string()).describe(
    'Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: "123/environment": "production", "123/costCenter": "marketing"',
  ).optional(),
  telemetryConfig: z.object({
    logFormat: z.enum(["LOG_FORMAT_UNSPECIFIED", "LEGACY", "JSON"]).describe(
      "Optional. The output format of the Dataproc Metastore service's logs.",
    ).optional(),
  }).describe(
    "Optional. The configuration specifying telemetry settings for the Dataproc Metastore service. If unspecified defaults to JSON.",
  ).optional(),
  tier: z.enum(["TIER_UNSPECIFIED", "DEVELOPER", "ENTERPRISE"]).describe(
    "Optional. The tier of the service.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. A request ID. Specify a unique request ID to allow the server to ignore the request if it has completed. The server will ignore subsequent requests that provide a duplicate request ID for at least 60 minutes after the first request.For example, if an initial request times out, followed by another request with the same request ID, the server ignores the second request to prevent the creation of duplicate commitments.The request ID must be a valid UUID (https://en.wikipedia.org/wiki/Universally_unique_identifier#Format) A zero UUID (00000000-0000-0000-0000-000000000000) is not supported.",
  ).optional(),
  serviceId: z.string().describe(
    "Required. The ID of the metastore service, which is used as the final component of the metastore service's name.This value must be between 2 and 63 characters long inclusive, begin with a letter, end with a letter or number, and consist of alpha-numeric ASCII characters or hyphens.",
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

/** Swamp extension model for Google Cloud Dataproc Metastore Services. Registered at `@swamp/gcp/metastore/services`. */
export const model = {
  type: "@swamp/gcp/metastore/services",
  version: "2026.09.23.1",
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
      toVersion: "2026.07.20.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.1",
      description: "Removed: metadataManagementActivity",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          metadataManagementActivity: _metadataManagementActivity,
          ...rest
        } = old;
        return rest;
      },
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
      toVersion: "2026.08.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.07.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.07.2",
      description:
        "Removed: kmsKey, auxiliaryVersions, configOverrides, consumers, version, configOverrides, endpointProtocol, kerberosConfig, keytab, cloudSecret, krb5ConfigGcsUri, principal, version, dayOfWeek, hourOfDay, dataCatalogConfig, enabled, consumers, endpointLocation, endpointUri, subnetwork, autoscalingConfig, autoscalingEnabled, autoscalingFactor, limitConfig, maxScalingFactor, minScalingFactor, instanceSize, scalingFactor, backupLocation, cronSchedule, enabled, latestBackup, backupId, duration, startTime, state, nextScheduledTime, timeZone, logFormat",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          kmsKey: _kmsKey,
          auxiliaryVersions: _auxiliaryVersions,
          configOverrides: _configOverrides,
          consumers: _consumers,
          version: _version,
          endpointProtocol: _endpointProtocol,
          kerberosConfig: _kerberosConfig,
          keytab: _keytab,
          cloudSecret: _cloudSecret,
          krb5ConfigGcsUri: _krb5ConfigGcsUri,
          principal: _principal,
          dayOfWeek: _dayOfWeek,
          hourOfDay: _hourOfDay,
          dataCatalogConfig: _dataCatalogConfig,
          enabled: _enabled,
          endpointLocation: _endpointLocation,
          endpointUri: _endpointUri,
          subnetwork: _subnetwork,
          autoscalingConfig: _autoscalingConfig,
          autoscalingEnabled: _autoscalingEnabled,
          autoscalingFactor: _autoscalingFactor,
          limitConfig: _limitConfig,
          maxScalingFactor: _maxScalingFactor,
          minScalingFactor: _minScalingFactor,
          instanceSize: _instanceSize,
          scalingFactor: _scalingFactor,
          backupLocation: _backupLocation,
          cronSchedule: _cronSchedule,
          latestBackup: _latestBackup,
          backupId: _backupId,
          duration: _duration,
          startTime: _startTime,
          state: _state,
          nextScheduledTime: _nextScheduledTime,
          timeZone: _timeZone,
          logFormat: _logFormat,
          ...rest
        } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.09.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A managed metastore service that serves metadata queries.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a services",
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
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["databaseType"] !== undefined) {
          body["databaseType"] = g["databaseType"];
        }
        if (g["deletionProtection"] !== undefined) {
          body["deletionProtection"] = g["deletionProtection"];
        }
        if (g["encryptionConfig"] !== undefined) {
          body["encryptionConfig"] = g["encryptionConfig"];
        }
        if (g["hiveMetastoreConfig"] !== undefined) {
          body["hiveMetastoreConfig"] = g["hiveMetastoreConfig"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["maintenanceWindow"] !== undefined) {
          body["maintenanceWindow"] = g["maintenanceWindow"];
        }
        if (g["metadataIntegration"] !== undefined) {
          body["metadataIntegration"] = g["metadataIntegration"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["network"] !== undefined) body["network"] = g["network"];
        if (g["networkConfig"] !== undefined) {
          body["networkConfig"] = g["networkConfig"];
        }
        if (g["port"] !== undefined) body["port"] = g["port"];
        if (g["releaseChannel"] !== undefined) {
          body["releaseChannel"] = g["releaseChannel"];
        }
        if (g["scalingConfig"] !== undefined) {
          body["scalingConfig"] = g["scalingConfig"];
        }
        if (g["scheduledBackup"] !== undefined) {
          body["scheduledBackup"] = g["scheduledBackup"];
        }
        if (g["tags"] !== undefined) body["tags"] = g["tags"];
        if (g["telemetryConfig"] !== undefined) {
          body["telemetryConfig"] = g["telemetryConfig"];
        }
        if (g["tier"] !== undefined) body["tier"] = g["tier"];
        if (g["requestId"] !== undefined) {
          params["requestId"] = String(g["requestId"]);
        }
        if (g["serviceId"] !== undefined) {
          params["serviceId"] = String(g["serviceId"]);
        }
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
              "readyValues": ["ACTIVE"],
              "failedValues": ["ERROR"],
            }
            : undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": `projects/${projectId}/locations/${
                String(g["location"] ?? "")
              }`,
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
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
      description: "Get a services",
      arguments: z.object({
        identifier: z.string().describe("The name of the services"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
      description: "Update services attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific services by name (e.g. one discovered by list)",
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
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            existingName ?? g["name"]?.toString() ?? "",
          );
        }
        const body: Record<string, unknown> = {};
        if (g["deletionProtection"] !== undefined) {
          body["deletionProtection"] = g["deletionProtection"];
        }
        if (g["hiveMetastoreConfig"] !== undefined) {
          body["hiveMetastoreConfig"] = g["hiveMetastoreConfig"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["maintenanceWindow"] !== undefined) {
          body["maintenanceWindow"] = g["maintenanceWindow"];
        }
        if (g["metadataIntegration"] !== undefined) {
          body["metadataIntegration"] = g["metadataIntegration"];
        }
        if (g["networkConfig"] !== undefined) {
          body["networkConfig"] = g["networkConfig"];
        }
        if (g["port"] !== undefined) body["port"] = g["port"];
        if (g["scalingConfig"] !== undefined) {
          body["scalingConfig"] = g["scalingConfig"];
        }
        if (g["scheduledBackup"] !== undefined) {
          body["scheduledBackup"] = g["scheduledBackup"];
        }
        if (g["telemetryConfig"] !== undefined) {
          body["telemetryConfig"] = g["telemetryConfig"];
        }
        if (g["tier"] !== undefined) body["tier"] = g["tier"];
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
              "readyValues": ["ACTIVE"],
              "failedValues": ["ERROR"],
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
      description: "Delete the services",
      arguments: z.object({
        identifier: z.string().describe("The name of the services"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
      description: "Sync services state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific services by name (e.g. one discovered by list)",
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
              `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
      description: "List services resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. The filter to apply to list results.",
        ).optional(),
        orderBy: z.string().describe(
          "Optional. Specify the ordering of results as described in Sorting Order (https://cloud.google.com/apis/design/design_patterns#sorting_order). If not specified, the results will be sorted in the default order.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The maximum number of services to return. The response may contain less than the maximum number. If unspecified, no more than 500 services are returned. The maximum value is 1000; values above 1000 are changed to 1000.",
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
          baseUrl,
          LIST_CONFIG,
          params,
          "services",
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
    alter_location: {
      description: "alter location",
      arguments: z.object({
        locationUri: z.any().optional(),
        resourceName: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
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
        params["service"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["locationUri"] !== undefined) {
          body["locationUri"] = args["locationUri"];
        }
        if (args["resourceName"] !== undefined) {
          body["resourceName"] = args["resourceName"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "metastore.projects.locations.services.alterLocation",
            "path": "v1/{+service}:alterLocation",
            "httpMethod": "POST",
            "parameterOrder": ["service"],
            "parameters": {
              "service": { "location": "path", "required": true },
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
    alter_table_properties: {
      description: "alter table properties",
      arguments: z.object({
        properties: z.any().optional(),
        tableName: z.any().optional(),
        updateMask: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
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
        params["service"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["properties"] !== undefined) {
          body["properties"] = args["properties"];
        }
        if (args["tableName"] !== undefined) {
          body["tableName"] = args["tableName"];
        }
        if (args["updateMask"] !== undefined) {
          body["updateMask"] = args["updateMask"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "metastore.projects.locations.services.alterTableProperties",
            "path": "v1/{+service}:alterTableProperties",
            "httpMethod": "POST",
            "parameterOrder": ["service"],
            "parameters": {
              "service": { "location": "path", "required": true },
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
    cancel_migration: {
      description: "cancel migration",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
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
        params["service"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          baseUrl,
          {
            "id": "metastore.projects.locations.services.cancelMigration",
            "path": "v1/{+service}:cancelMigration",
            "httpMethod": "POST",
            "parameterOrder": ["service"],
            "parameters": {
              "service": { "location": "path", "required": true },
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
    complete_migration: {
      description: "complete migration",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
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
        params["service"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          baseUrl,
          {
            "id": "metastore.projects.locations.services.completeMigration",
            "path": "v1/{+service}:completeMigration",
            "httpMethod": "POST",
            "parameterOrder": ["service"],
            "parameters": {
              "service": { "location": "path", "required": true },
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
    export_metadata: {
      description: "export metadata",
      arguments: z.object({
        databaseDumpType: z.any().optional(),
        destinationGcsFolder: z.any().optional(),
        requestId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
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
        params["service"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["databaseDumpType"] !== undefined) {
          body["databaseDumpType"] = args["databaseDumpType"];
        }
        if (args["destinationGcsFolder"] !== undefined) {
          body["destinationGcsFolder"] = args["destinationGcsFolder"];
        }
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "metastore.projects.locations.services.exportMetadata",
            "path": "v1/{+service}:exportMetadata",
            "httpMethod": "POST",
            "parameterOrder": ["service"],
            "parameters": {
              "service": { "location": "path", "required": true },
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
    get_iam_policy: {
      description: "get iam policy",
      arguments: z.object({
        options_requestedPolicyVersion: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
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
        if (args["options_requestedPolicyVersion"] !== undefined) {
          params["options.requestedPolicyVersion"] = String(
            args["options_requestedPolicyVersion"],
          );
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "metastore.projects.locations.services.getIamPolicy",
            "path": "v1/{+resource}:getIamPolicy",
            "httpMethod": "GET",
            "parameterOrder": ["resource"],
            "parameters": {
              "options.requestedPolicyVersion": { "location": "query" },
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          undefined,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    move_table_to_database: {
      description: "move table to database",
      arguments: z.object({
        dbName: z.any().optional(),
        destinationDbName: z.any().optional(),
        tableName: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
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
        params["service"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["dbName"] !== undefined) body["dbName"] = args["dbName"];
        if (args["destinationDbName"] !== undefined) {
          body["destinationDbName"] = args["destinationDbName"];
        }
        if (args["tableName"] !== undefined) {
          body["tableName"] = args["tableName"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "metastore.projects.locations.services.moveTableToDatabase",
            "path": "v1/{+service}:moveTableToDatabase",
            "httpMethod": "POST",
            "parameterOrder": ["service"],
            "parameters": {
              "service": { "location": "path", "required": true },
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
    query_metadata: {
      description: "query metadata",
      arguments: z.object({
        query: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
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
        params["service"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["query"] !== undefined) body["query"] = args["query"];
        const result = await createResource(
          baseUrl,
          {
            "id": "metastore.projects.locations.services.queryMetadata",
            "path": "v1/{+service}:queryMetadata",
            "httpMethod": "POST",
            "parameterOrder": ["service"],
            "parameters": {
              "service": { "location": "path", "required": true },
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
    restore: {
      description: "restore",
      arguments: z.object({
        backup: z.any().optional(),
        backupLocation: z.any().optional(),
        requestId: z.any().optional(),
        restoreType: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
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
        params["service"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["backup"] !== undefined) body["backup"] = args["backup"];
        if (args["backupLocation"] !== undefined) {
          body["backupLocation"] = args["backupLocation"];
        }
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        if (args["restoreType"] !== undefined) {
          body["restoreType"] = args["restoreType"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "metastore.projects.locations.services.restore",
            "path": "v1/{+service}:restore",
            "httpMethod": "POST",
            "parameterOrder": ["service"],
            "parameters": {
              "service": { "location": "path", "required": true },
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
    set_iam_policy: {
      description: "set iam policy",
      arguments: z.object({
        policy: z.any().optional(),
        updateMask: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
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
          baseUrl,
          {
            "id": "metastore.projects.locations.services.setIamPolicy",
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
    start_migration: {
      description: "start migration",
      arguments: z.object({
        migrationExecution: z.any().optional(),
        migrationExecutionId: z.any().optional(),
        requestId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
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
        params["service"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["migrationExecution"] !== undefined) {
          body["migrationExecution"] = args["migrationExecution"];
        }
        if (args["migrationExecutionId"] !== undefined) {
          body["migrationExecutionId"] = args["migrationExecutionId"];
        }
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "metastore.projects.locations.services.startMigration",
            "path": "v1/{+service}:startMigration",
            "httpMethod": "POST",
            "parameterOrder": ["service"],
            "parameters": {
              "service": { "location": "path", "required": true },
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
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
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
          baseUrl,
          {
            "id": "metastore.projects.locations.services.testIamPermissions",
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
