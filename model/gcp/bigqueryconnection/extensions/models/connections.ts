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

// Auto-generated extension model for @swamp/gcp/bigqueryconnection/connections
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud BigQuery Connection Connections.
 *
 * Configuration parameters to establish connection with an external data source, except the credential attributes.
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
  return `${parent}/connections/${shortName}`;
}

const BASE_URL = "https://bigqueryconnection.googleapis.com/";

const GET_CONFIG = {
  "id": "bigqueryconnection.projects.locations.connections.get",
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
  "id": "bigqueryconnection.projects.locations.connections.create",
  "path": "v1/{+parent}/connections",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "connectionId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "bigqueryconnection.projects.locations.connections.patch",
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
  },
} as const;

const DELETE_CONFIG = {
  "id": "bigqueryconnection.projects.locations.connections.delete",
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
  "id": "bigqueryconnection.projects.locations.connections.list",
  "path": "v1/{+parent}/connections",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
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
  aws: z.object({
    accessRole: z.object({
      iamRoleId: z.string().describe(
        "The user’s AWS IAM Role that trusts the Google-owned AWS IAM user Connection.",
      ).optional(),
      identity: z.string().describe(
        "A unique Google-owned and Google-generated identity for the Connection. This identity will be used to access the user's AWS IAM Role.",
      ).optional(),
    }).describe(
      "Authentication method for Amazon Web Services (AWS) that uses Google owned Google service account to assume into customer's AWS IAM Role.",
    ).optional(),
  }).describe("Connection properties specific to Amazon Web Services (AWS).")
    .optional(),
  azure: z.object({
    application: z.string().describe(
      "Output only. The name of the Azure Active Directory Application.",
    ).optional(),
    clientId: z.string().describe(
      "Output only. The client id of the Azure Active Directory Application.",
    ).optional(),
    customerTenantId: z.string().describe(
      "The id of customer's directory that host the data.",
    ).optional(),
    federatedApplicationClientId: z.string().describe(
      "The client ID of the user's Azure Active Directory Application used for a federated connection.",
    ).optional(),
    identity: z.string().describe(
      "Output only. A unique Google-owned and Google-generated identity for the Connection. This identity will be used to access the user's Azure Active Directory Application.",
    ).optional(),
    objectId: z.string().describe(
      "Output only. The object id of the Azure Active Directory Application.",
    ).optional(),
    redirectUri: z.string().describe(
      "The URL user will be redirected to after granting consent during connection setup.",
    ).optional(),
  }).describe("Container for connection properties specific to Azure.")
    .optional(),
  cloudResource: z.object({
    serviceAccountId: z.string().describe(
      "Output only. The account ID of the service created for the purpose of this connection. The service account does not have any permissions associated with it when it is created. After creation, customers delegate permissions to the service account. When the connection is used in the context of an operation in BigQuery, the service account will be used to connect to the desired resources in GCP. The account ID is in the form of: @gcp-sa-bigquery-cloudresource.iam.gserviceaccount.com",
    ).optional(),
  }).describe(
    "Container for connection properties for delegation of access to GCP resources.",
  ).optional(),
  cloudSpanner: z.object({
    database: z.string().describe(
      "Cloud Spanner database in the form `project/instance/database'",
    ).optional(),
    databaseRole: z.string().describe(
      "Optional. Cloud Spanner database role for fine-grained access control. The Cloud Spanner admin should have provisioned the database role with appropriate permissions, such as `SELECT` and `INSERT`. Other users should only use roles provided by their Cloud Spanner admins. For more details, see [About fine-grained access control] (https://cloud.google.com/spanner/docs/fgac-about). REQUIRES: The database role name must start with a letter, and can only contain letters, numbers, and underscores.",
    ).optional(),
    maxParallelism: z.number().int().describe(
      "Allows setting max parallelism per query when executing on Spanner independent compute resources. If unspecified, default values of parallelism are chosen that are dependent on the Cloud Spanner instance configuration. REQUIRES: `use_parallelism` must be set. REQUIRES: `use_data_boost` must be set.",
    ).optional(),
    useDataBoost: z.boolean().describe(
      "If set, the request will be executed via Spanner independent compute resources. REQUIRES: `use_parallelism` must be set.",
    ).optional(),
    useParallelism: z.boolean().describe(
      "If parallelism should be used when reading from Cloud Spanner",
    ).optional(),
    useServerlessAnalytics: z.boolean().describe(
      "Deprecated: prefer use_data_boost instead. If the serverless analytics service should be used to read data from Cloud Spanner. Note: `use_parallelism` must be set when using serverless analytics.",
    ).optional(),
  }).describe("Connection properties specific to Cloud Spanner.").optional(),
  cloudSql: z.object({
    credential: z.object({
      password: z.string().describe("The password for the credential.")
        .optional(),
      username: z.string().describe("The username for the credential.")
        .optional(),
    }).describe("Credential info for the Cloud SQL.").optional(),
    database: z.string().describe("Database name.").optional(),
    instanceId: z.string().describe(
      "Cloud SQL instance ID in the form `project:location:instance`.",
    ).optional(),
    serviceAccountId: z.string().describe(
      "Output only. The account ID of the service used for the purpose of this connection. When the connection is used in the context of an operation in BigQuery, this service account will serve as the identity being used for connecting to the CloudSQL instance specified in this connection.",
    ).optional(),
    type: z.enum(["DATABASE_TYPE_UNSPECIFIED", "POSTGRES", "MYSQL"]).describe(
      "Type of the Cloud SQL database.",
    ).optional(),
  }).describe("Connection properties specific to the Cloud SQL.").optional(),
  configuration: z.object({
    asset: z.object({
      database: z.string().describe("Name of the database.").optional(),
      googleCloudResource: z.string().describe(
        "Full Google Cloud resource name - https://cloud.google.com/apis/design/resource_names#full_resource_name. Example: `//library.googleapis.com/shelves/shelf1/books/book2`",
      ).optional(),
    }).describe(
      "Data Asset - a resource within instance of the system, reachable under specified endpoint. For example a database name in a SQL DB.",
    ).optional(),
    authentication: z.object({
      serviceAccount: z.string().describe(
        "Output only. Google-managed service account associated with this connection, e.g., `service-{project_number}@gcp-sa-bigqueryconnection.iam.gserviceaccount.com`. BigQuery jobs using this connection will act as `service_account` identity while connecting to the datasource.",
      ).optional(),
      usernamePassword: z.object({
        password: z.object({
          plaintext: z.string().describe("Input only. Secret as plaintext.")
            .optional(),
          secretType: z.enum(["SECRET_TYPE_UNSPECIFIED", "PLAINTEXT"]).describe(
            "Output only. Indicates type of secret. Can be used to check type of stored secret value even if it's `INPUT_ONLY`.",
          ).optional(),
        }).describe("Secret value parameter.").optional(),
        username: z.string().describe("Required. Username.").optional(),
      }).describe("Username and Password authentication.").optional(),
    }).describe("Client authentication.").optional(),
    connectorId: z.string().describe(
      "Required. Immutable. The ID of the Connector these parameters are configured for.",
    ).optional(),
    endpoint: z.object({
      hostPort: z.string().describe(
        "Host and port in a format of `hostname:port` as defined in https://www.ietf.org/rfc/rfc3986.html#section-3.2.2 and https://www.ietf.org/rfc/rfc3986.html#section-3.2.3.",
      ).optional(),
    }).describe("Remote endpoint specification.").optional(),
    network: z.object({
      privateServiceConnect: z.object({
        networkAttachment: z.string().describe(
          "Required. Network Attachment name in the format of `projects/{project}/regions/{region}/networkAttachments/{networkattachment}`.",
        ).optional(),
      }).describe("Private Service Connect configuration.").optional(),
    }).describe("Network related configuration.").optional(),
  }).describe(
    "Represents concrete parameter values for Connector Configuration.",
  ).optional(),
  description: z.string().describe("User provided description.").optional(),
  friendlyName: z.string().describe(
    "User provided display name for the connection.",
  ).optional(),
  kmsKeyName: z.string().describe(
    "Optional. The Cloud KMS key that is used for credentials encryption. If omitted, internal Google owned encryption keys are used. Example: `projects/[kms_project_id]/locations/[region]/keyRings/[key_region]/cryptoKeys/[key]`",
  ).optional(),
  salesforceDataCloud: z.object({
    identity: z.string().describe(
      "Output only. A unique Google-owned and Google-generated service account identity for the connection.",
    ).optional(),
    instanceUri: z.string().describe(
      "The URL to the user's Salesforce DataCloud instance.",
    ).optional(),
    tenantId: z.string().describe("The ID of the user's Salesforce tenant.")
      .optional(),
  }).describe(
    "Connection properties specific to Salesforce DataCloud. This is intended for use only by Salesforce partner projects.",
  ).optional(),
  spark: z.object({
    metastoreServiceConfig: z.object({
      metastoreService: z.string().describe(
        "Optional. Resource name of an existing Dataproc Metastore service. Example: * `projects/[project_id]/locations/[region]/services/[service_id]`",
      ).optional(),
    }).describe("Configuration of the Dataproc Metastore Service.").optional(),
    serviceAccountId: z.string().describe(
      "Output only. The account ID of the service created for the purpose of this connection. The service account does not have any permissions associated with it when it is created. After creation, customers delegate permissions to the service account. When the connection is used in the context of a stored procedure for Apache Spark in BigQuery, the service account is used to connect to the desired resources in Google Cloud. The account ID is in the form of: bqcx--@gcp-sa-bigquery-consp.iam.gserviceaccount.com",
    ).optional(),
    sparkHistoryServerConfig: z.object({
      dataprocCluster: z.string().describe(
        "Optional. Resource name of an existing Dataproc Cluster to act as a Spark History Server for the connection. Example: * `projects/[project_id]/regions/[region]/clusters/[cluster_name]`",
      ).optional(),
    }).describe("Configuration of the Spark History Server.").optional(),
  }).describe(
    "Container for connection properties to execute stored procedures for Apache Spark.",
  ).optional(),
  connectionId: z.string().describe(
    "Optional. Connection id that should be assigned to the created connection.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  aws: z.object({
    accessRole: z.object({
      iamRoleId: z.string(),
      identity: z.string(),
    }),
  }).optional(),
  azure: z.object({
    application: z.string(),
    clientId: z.string(),
    customerTenantId: z.string(),
    federatedApplicationClientId: z.string(),
    identity: z.string(),
    objectId: z.string(),
    redirectUri: z.string(),
  }).optional(),
  cloudResource: z.object({
    serviceAccountId: z.string(),
  }).optional(),
  cloudSpanner: z.object({
    database: z.string(),
    databaseRole: z.string(),
    maxParallelism: z.number(),
    useDataBoost: z.boolean(),
    useParallelism: z.boolean(),
    useServerlessAnalytics: z.boolean(),
  }).optional(),
  cloudSql: z.object({
    credential: z.object({
      password: z.string(),
      username: z.string(),
    }),
    database: z.string(),
    instanceId: z.string(),
    serviceAccountId: z.string(),
    type: z.string(),
  }).optional(),
  configuration: z.object({
    asset: z.object({
      database: z.string(),
      googleCloudResource: z.string(),
    }),
    authentication: z.object({
      serviceAccount: z.string(),
      usernamePassword: z.object({
        password: z.object({
          plaintext: z.string(),
          secretType: z.string(),
        }),
        username: z.string(),
      }),
    }),
    connectorId: z.string(),
    endpoint: z.object({
      hostPort: z.string(),
    }),
    network: z.object({
      privateServiceConnect: z.object({
        networkAttachment: z.string(),
      }),
    }),
  }).optional(),
  creationTime: z.string().optional(),
  description: z.string().optional(),
  friendlyName: z.string().optional(),
  hasCredential: z.boolean().optional(),
  kmsKeyName: z.string().optional(),
  lastModifiedTime: z.string().optional(),
  name: z.string(),
  salesforceDataCloud: z.object({
    identity: z.string(),
    instanceUri: z.string(),
    tenantId: z.string(),
  }).optional(),
  spark: z.object({
    metastoreServiceConfig: z.object({
      metastoreService: z.string(),
    }),
    serviceAccountId: z.string(),
    sparkHistoryServerConfig: z.object({
      dataprocCluster: z.string(),
    }),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  aws: z.object({
    accessRole: z.object({
      iamRoleId: z.string().describe(
        "The user’s AWS IAM Role that trusts the Google-owned AWS IAM user Connection.",
      ).optional(),
      identity: z.string().describe(
        "A unique Google-owned and Google-generated identity for the Connection. This identity will be used to access the user's AWS IAM Role.",
      ).optional(),
    }).describe(
      "Authentication method for Amazon Web Services (AWS) that uses Google owned Google service account to assume into customer's AWS IAM Role.",
    ).optional(),
  }).describe("Connection properties specific to Amazon Web Services (AWS).")
    .optional(),
  azure: z.object({
    application: z.string().describe(
      "Output only. The name of the Azure Active Directory Application.",
    ).optional(),
    clientId: z.string().describe(
      "Output only. The client id of the Azure Active Directory Application.",
    ).optional(),
    customerTenantId: z.string().describe(
      "The id of customer's directory that host the data.",
    ).optional(),
    federatedApplicationClientId: z.string().describe(
      "The client ID of the user's Azure Active Directory Application used for a federated connection.",
    ).optional(),
    identity: z.string().describe(
      "Output only. A unique Google-owned and Google-generated identity for the Connection. This identity will be used to access the user's Azure Active Directory Application.",
    ).optional(),
    objectId: z.string().describe(
      "Output only. The object id of the Azure Active Directory Application.",
    ).optional(),
    redirectUri: z.string().describe(
      "The URL user will be redirected to after granting consent during connection setup.",
    ).optional(),
  }).describe("Container for connection properties specific to Azure.")
    .optional(),
  cloudResource: z.object({
    serviceAccountId: z.string().describe(
      "Output only. The account ID of the service created for the purpose of this connection. The service account does not have any permissions associated with it when it is created. After creation, customers delegate permissions to the service account. When the connection is used in the context of an operation in BigQuery, the service account will be used to connect to the desired resources in GCP. The account ID is in the form of: @gcp-sa-bigquery-cloudresource.iam.gserviceaccount.com",
    ).optional(),
  }).describe(
    "Container for connection properties for delegation of access to GCP resources.",
  ).optional(),
  cloudSpanner: z.object({
    database: z.string().describe(
      "Cloud Spanner database in the form `project/instance/database'",
    ).optional(),
    databaseRole: z.string().describe(
      "Optional. Cloud Spanner database role for fine-grained access control. The Cloud Spanner admin should have provisioned the database role with appropriate permissions, such as `SELECT` and `INSERT`. Other users should only use roles provided by their Cloud Spanner admins. For more details, see [About fine-grained access control] (https://cloud.google.com/spanner/docs/fgac-about). REQUIRES: The database role name must start with a letter, and can only contain letters, numbers, and underscores.",
    ).optional(),
    maxParallelism: z.number().int().describe(
      "Allows setting max parallelism per query when executing on Spanner independent compute resources. If unspecified, default values of parallelism are chosen that are dependent on the Cloud Spanner instance configuration. REQUIRES: `use_parallelism` must be set. REQUIRES: `use_data_boost` must be set.",
    ).optional(),
    useDataBoost: z.boolean().describe(
      "If set, the request will be executed via Spanner independent compute resources. REQUIRES: `use_parallelism` must be set.",
    ).optional(),
    useParallelism: z.boolean().describe(
      "If parallelism should be used when reading from Cloud Spanner",
    ).optional(),
    useServerlessAnalytics: z.boolean().describe(
      "Deprecated: prefer use_data_boost instead. If the serverless analytics service should be used to read data from Cloud Spanner. Note: `use_parallelism` must be set when using serverless analytics.",
    ).optional(),
  }).describe("Connection properties specific to Cloud Spanner.").optional(),
  cloudSql: z.object({
    credential: z.object({
      password: z.string().describe("The password for the credential.")
        .optional(),
      username: z.string().describe("The username for the credential.")
        .optional(),
    }).describe("Credential info for the Cloud SQL.").optional(),
    database: z.string().describe("Database name.").optional(),
    instanceId: z.string().describe(
      "Cloud SQL instance ID in the form `project:location:instance`.",
    ).optional(),
    serviceAccountId: z.string().describe(
      "Output only. The account ID of the service used for the purpose of this connection. When the connection is used in the context of an operation in BigQuery, this service account will serve as the identity being used for connecting to the CloudSQL instance specified in this connection.",
    ).optional(),
    type: z.enum(["DATABASE_TYPE_UNSPECIFIED", "POSTGRES", "MYSQL"]).describe(
      "Type of the Cloud SQL database.",
    ).optional(),
  }).describe("Connection properties specific to the Cloud SQL.").optional(),
  configuration: z.object({
    asset: z.object({
      database: z.string().describe("Name of the database.").optional(),
      googleCloudResource: z.string().describe(
        "Full Google Cloud resource name - https://cloud.google.com/apis/design/resource_names#full_resource_name. Example: `//library.googleapis.com/shelves/shelf1/books/book2`",
      ).optional(),
    }).describe(
      "Data Asset - a resource within instance of the system, reachable under specified endpoint. For example a database name in a SQL DB.",
    ).optional(),
    authentication: z.object({
      serviceAccount: z.string().describe(
        "Output only. Google-managed service account associated with this connection, e.g., `service-{project_number}@gcp-sa-bigqueryconnection.iam.gserviceaccount.com`. BigQuery jobs using this connection will act as `service_account` identity while connecting to the datasource.",
      ).optional(),
      usernamePassword: z.object({
        password: z.object({
          plaintext: z.string().describe("Input only. Secret as plaintext.")
            .optional(),
          secretType: z.enum(["SECRET_TYPE_UNSPECIFIED", "PLAINTEXT"]).describe(
            "Output only. Indicates type of secret. Can be used to check type of stored secret value even if it's `INPUT_ONLY`.",
          ).optional(),
        }).describe("Secret value parameter.").optional(),
        username: z.string().describe("Required. Username.").optional(),
      }).describe("Username and Password authentication.").optional(),
    }).describe("Client authentication.").optional(),
    connectorId: z.string().describe(
      "Required. Immutable. The ID of the Connector these parameters are configured for.",
    ).optional(),
    endpoint: z.object({
      hostPort: z.string().describe(
        "Host and port in a format of `hostname:port` as defined in https://www.ietf.org/rfc/rfc3986.html#section-3.2.2 and https://www.ietf.org/rfc/rfc3986.html#section-3.2.3.",
      ).optional(),
    }).describe("Remote endpoint specification.").optional(),
    network: z.object({
      privateServiceConnect: z.object({
        networkAttachment: z.string().describe(
          "Required. Network Attachment name in the format of `projects/{project}/regions/{region}/networkAttachments/{networkattachment}`.",
        ).optional(),
      }).describe("Private Service Connect configuration.").optional(),
    }).describe("Network related configuration.").optional(),
  }).describe(
    "Represents concrete parameter values for Connector Configuration.",
  ).optional(),
  description: z.string().describe("User provided description.").optional(),
  friendlyName: z.string().describe(
    "User provided display name for the connection.",
  ).optional(),
  kmsKeyName: z.string().describe(
    "Optional. The Cloud KMS key that is used for credentials encryption. If omitted, internal Google owned encryption keys are used. Example: `projects/[kms_project_id]/locations/[region]/keyRings/[key_region]/cryptoKeys/[key]`",
  ).optional(),
  salesforceDataCloud: z.object({
    identity: z.string().describe(
      "Output only. A unique Google-owned and Google-generated service account identity for the connection.",
    ).optional(),
    instanceUri: z.string().describe(
      "The URL to the user's Salesforce DataCloud instance.",
    ).optional(),
    tenantId: z.string().describe("The ID of the user's Salesforce tenant.")
      .optional(),
  }).describe(
    "Connection properties specific to Salesforce DataCloud. This is intended for use only by Salesforce partner projects.",
  ).optional(),
  spark: z.object({
    metastoreServiceConfig: z.object({
      metastoreService: z.string().describe(
        "Optional. Resource name of an existing Dataproc Metastore service. Example: * `projects/[project_id]/locations/[region]/services/[service_id]`",
      ).optional(),
    }).describe("Configuration of the Dataproc Metastore Service.").optional(),
    serviceAccountId: z.string().describe(
      "Output only. The account ID of the service created for the purpose of this connection. The service account does not have any permissions associated with it when it is created. After creation, customers delegate permissions to the service account. When the connection is used in the context of a stored procedure for Apache Spark in BigQuery, the service account is used to connect to the desired resources in Google Cloud. The account ID is in the form of: bqcx--@gcp-sa-bigquery-consp.iam.gserviceaccount.com",
    ).optional(),
    sparkHistoryServerConfig: z.object({
      dataprocCluster: z.string().describe(
        "Optional. Resource name of an existing Dataproc Cluster to act as a Spark History Server for the connection. Example: * `projects/[project_id]/regions/[region]/clusters/[cluster_name]`",
      ).optional(),
    }).describe("Configuration of the Spark History Server.").optional(),
  }).describe(
    "Container for connection properties to execute stored procedures for Apache Spark.",
  ).optional(),
  connectionId: z.string().describe(
    "Optional. Connection id that should be assigned to the created connection.",
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

/** Swamp extension model for Google Cloud BigQuery Connection Connections. Registered at `@swamp/gcp/bigqueryconnection/connections`. */
export const model = {
  type: "@swamp/gcp/bigqueryconnection/connections",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Configuration parameters to establish connection with an external data source...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a connections",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["aws"] !== undefined) body["aws"] = g["aws"];
        if (g["azure"] !== undefined) body["azure"] = g["azure"];
        if (g["cloudResource"] !== undefined) {
          body["cloudResource"] = g["cloudResource"];
        }
        if (g["cloudSpanner"] !== undefined) {
          body["cloudSpanner"] = g["cloudSpanner"];
        }
        if (g["cloudSql"] !== undefined) body["cloudSql"] = g["cloudSql"];
        if (g["configuration"] !== undefined) {
          body["configuration"] = g["configuration"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["friendlyName"] !== undefined) {
          body["friendlyName"] = g["friendlyName"];
        }
        if (g["kmsKeyName"] !== undefined) body["kmsKeyName"] = g["kmsKeyName"];
        if (g["salesforceDataCloud"] !== undefined) {
          body["salesforceDataCloud"] = g["salesforceDataCloud"];
        }
        if (g["spark"] !== undefined) body["spark"] = g["spark"];
        if (g["connectionId"] !== undefined) {
          body["connectionId"] = g["connectionId"];
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
          undefined,
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
      description: "Get a connections",
      arguments: z.object({
        identifier: z.string().describe("The name of the connections"),
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
      description: "Update connections attributes",
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
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["aws"] !== undefined) body["aws"] = g["aws"];
        if (g["azure"] !== undefined) body["azure"] = g["azure"];
        if (g["cloudResource"] !== undefined) {
          body["cloudResource"] = g["cloudResource"];
        }
        if (g["cloudSpanner"] !== undefined) {
          body["cloudSpanner"] = g["cloudSpanner"];
        }
        if (g["cloudSql"] !== undefined) body["cloudSql"] = g["cloudSql"];
        if (g["configuration"] !== undefined) {
          body["configuration"] = g["configuration"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["friendlyName"] !== undefined) {
          body["friendlyName"] = g["friendlyName"];
        }
        if (g["kmsKeyName"] !== undefined) body["kmsKeyName"] = g["kmsKeyName"];
        if (g["salesforceDataCloud"] !== undefined) {
          body["salesforceDataCloud"] = g["salesforceDataCloud"];
        }
        if (g["spark"] !== undefined) body["spark"] = g["spark"];
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
          undefined,
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
      description: "Delete the connections",
      arguments: z.object({
        identifier: z.string().describe("The name of the connections"),
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
      description: "Sync connections state from GCP",
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
      description: "List connections resources",
      arguments: z.object({
        pageSize: z.number().describe("Required. Page size.").optional(),
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
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "connections",
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
      arguments: z.object({
        options: z.any().optional(),
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
        if (args["options"] !== undefined) body["options"] = args["options"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "bigqueryconnection.projects.locations.connections.getIamPolicy",
            "path": "v1/{+resource}:getIamPolicy",
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
            "id":
              "bigqueryconnection.projects.locations.connections.setIamPolicy",
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
              "bigqueryconnection.projects.locations.connections.testIamPermissions",
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
