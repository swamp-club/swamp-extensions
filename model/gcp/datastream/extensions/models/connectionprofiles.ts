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

// Auto-generated extension model for @swamp/gcp/datastream/connectionprofiles
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Datastream ConnectionProfiles.
 *
 * A set of reusable connection configurations to be used as a source or destination for a stream.
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
  return `${parent}/connectionProfiles/${shortName}`;
}

const BASE_URL = "https://datastream.googleapis.com/";

const GET_CONFIG = {
  "id": "datastream.projects.locations.connectionProfiles.get",
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
  "id": "datastream.projects.locations.connectionProfiles.create",
  "path": "v1/{+parent}/connectionProfiles",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "connectionProfileId": {
      "location": "query",
    },
    "force": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "datastream.projects.locations.connectionProfiles.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "force": {
      "location": "query",
    },
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
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "datastream.projects.locations.connectionProfiles.delete",
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
  "id": "datastream.projects.locations.connectionProfiles.list",
  "path": "v1/{+parent}/connectionProfiles",
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
  scopes: z.string().describe(
    "Comma-separated OAuth scopes to request when minting access tokens via gcloud. Defaults to the API's Discovery Document scopes.",
  ).optional(),
  quotaProject: z.string().describe(
    "GCP project ID for quota and billing attribution; sets the x-goog-user-project header. Overrides GOOGLE_CLOUD_QUOTA_PROJECT environment variable. Required for APIs like Cloud Identity when using user credentials.",
  ).optional(),
  apiEndpoint: z.string().describe(
    "Custom API endpoint for emulators; overrides GCP_API_ENDPOINT environment variable. Defaults to the service's production URL.",
  ).optional(),
  bigqueryProfile: z.object({}).describe(
    "Profile for connecting to a BigQuery destination.",
  ).optional(),
  dataverseProfile: z.object({
    environmentUrl: z.string().describe(
      "Required. Environment URL of the Microsoft Dataverse instance. Example: `.crm.dynamics.com`",
    ).optional(),
    oauthClientCredentials: z.object({
      clientId: z.string().describe(
        "Required. Client ID for OAuth Client Credentials.",
      ).optional(),
      clientSecret: z.object({
        rawValue: z.string().describe(
          "Optional. Input only. The actual raw value of the secret as plain text.",
        ).optional(),
        secretVersion: z.string().describe(
          "Optional. A Secret Manager resource name storing the actual value of the secret. Supported formats: * projects/{project}/locations/{location}/secrets/{secret}/versions/{version} * projects/{project}/secrets/{secret}/versions/{version}",
        ).optional(),
      }).describe("Required. Client secret for OAuth Client Credentials.")
        .optional(),
    }).describe(
      "Required. Credentials for authenticating with the Dataverse API.",
    ).optional(),
    tenantId: z.string().describe(
      "Required. Tenant id of the Microsoft Dataverse instance.",
    ).optional(),
  }).describe("Profile for connecting to a Dataverse source.").optional(),
  displayName: z.string().describe("Required. Display name.").optional(),
  forwardSshConnectivity: z.object({
    hostname: z.string().describe("Required. Hostname for the SSH tunnel.")
      .optional(),
    password: z.string().describe("Input only. SSH password.").optional(),
    port: z.number().int().describe(
      "Port for the SSH tunnel, default value is 22.",
    ).optional(),
    privateKey: z.string().describe("Input only. SSH private key.").optional(),
    username: z.string().describe("Required. Username for the SSH tunnel.")
      .optional(),
  }).describe("Forward SSH tunnel connectivity.").optional(),
  gcsProfile: z.object({
    bucket: z.string().describe("Required. The Cloud Storage bucket name.")
      .optional(),
    rootPath: z.string().describe(
      "Optional. The root path inside the Cloud Storage bucket.",
    ).optional(),
  }).describe("Profile for connecting to a Cloud Storage destination.")
    .optional(),
  labels: z.record(z.string(), z.string()).describe("Labels.").optional(),
  mongodbProfile: z.object({
    additionalOptions: z.record(z.string(), z.string()).describe(
      'Optional. Specifies additional options for the MongoDB connection. The options should be sent as key-value pairs, for example: `additional_options = {"serverSelectionTimeoutMS": "10000", "directConnection": "true"}`. Keys are case-sensitive and should match the official MongoDB connection string options: https://www.mongodb.com/docs/manual/reference/connection-string-options/ The server will not modify the values provided by the user.',
    ).optional(),
    hostAddresses: z.array(z.object({
      hostname: z.string().describe("Required. Hostname for the connection.")
        .optional(),
      port: z.number().int().describe("Optional. Port for the connection.")
        .optional(),
    })).describe(
      "Required. List of host addresses for a MongoDB cluster. For SRV connection format, this list must contain exactly one DNS host without a port. For Standard connection format, this list must contain all the required hosts in the cluster with their respective ports.",
    ).optional(),
    password: z.string().describe(
      "Optional. Password for the MongoDB connection. Mutually exclusive with the `secret_manager_stored_password` field.",
    ).optional(),
    replicaSet: z.string().describe(
      "Optional. Name of the replica set. Only needed for self hosted replica set type MongoDB cluster. For SRV connection format, this field must be empty. For Standard connection format, this field must be specified.",
    ).optional(),
    secretManagerStoredPassword: z.string().describe(
      "Optional. A reference to a Secret Manager resource name storing the SQLServer connection password. Mutually exclusive with the `password` field.",
    ).optional(),
    srvConnectionFormat: z.object({}).describe("Srv connection format.")
      .optional(),
    sslConfig: z.object({
      caCertificate: z.string().describe(
        "Optional. Input only. PEM-encoded certificate of the CA that signed the source database server's certificate.",
      ).optional(),
      caCertificateSet: z.boolean().describe(
        "Output only. Indicates whether the ca_certificate field is set.",
      ).optional(),
      clientCertificate: z.string().describe(
        "Optional. Input only. PEM-encoded certificate that will be used by the replica to authenticate against the source database server. If this field is used then the 'client_key' and the 'ca_certificate' fields are mandatory.",
      ).optional(),
      clientCertificateSet: z.boolean().describe(
        "Output only. Indicates whether the client_certificate field is set.",
      ).optional(),
      clientKey: z.string().describe(
        "Optional. Input only. PEM-encoded private key associated with the Client Certificate. If this field is used then the 'client_certificate' and the 'ca_certificate' fields are mandatory.",
      ).optional(),
      clientKeySet: z.boolean().describe(
        "Output only. Indicates whether the client_key field is set.",
      ).optional(),
      secretManagerStoredClientKey: z.string().describe(
        "Optional. Input only. A reference to a Secret Manager resource name storing the PEM-encoded private key associated with the Client Certificate. If this field is used then the 'client_certificate' and the 'ca_certificate' fields are mandatory. Mutually exclusive with the `client_key` field.",
      ).optional(),
    }).describe("Optional. SSL configuration for the MongoDB connection.")
      .optional(),
    standardConnectionFormat: z.object({
      directConnection: z.boolean().describe(
        'Optional. Deprecated: Use the `additional_options` map to specify the `directConnection` parameter instead. For example: `additional_options = {"directConnection": "true"}`. Specifies whether the client connects directly to the host[:port] in the connection URI.',
      ).optional(),
    }).describe("Standard connection format.").optional(),
    username: z.string().describe(
      "Required. Username for the MongoDB connection.",
    ).optional(),
  }).describe("Profile for connecting to a MongoDB source.").optional(),
  mysqlProfile: z.object({
    hostname: z.string().describe(
      "Required. Hostname for the MySQL connection.",
    ).optional(),
    password: z.string().describe(
      "Optional. Input only. Password for the MySQL connection. Mutually exclusive with the `secret_manager_stored_password` field.",
    ).optional(),
    port: z.number().int().describe(
      "Port for the MySQL connection, default value is 3306.",
    ).optional(),
    secretManagerStoredPassword: z.string().describe(
      "Optional. A reference to a Secret Manager resource name storing the MySQL connection password. Mutually exclusive with the `password` field.",
    ).optional(),
    sslConfig: z.object({
      caCertificate: z.string().describe(
        "Input only. PEM-encoded certificate of the CA that signed the source database server's certificate.",
      ).optional(),
      caCertificateSet: z.boolean().describe(
        "Output only. Indicates whether the ca_certificate field is set.",
      ).optional(),
      clientCertificate: z.string().describe(
        "Optional. Input only. PEM-encoded certificate that will be used by the replica to authenticate against the source database server. If this field is used then the 'client_key' and the 'ca_certificate' fields are mandatory.",
      ).optional(),
      clientCertificateSet: z.boolean().describe(
        "Output only. Indicates whether the client_certificate field is set.",
      ).optional(),
      clientKey: z.string().describe(
        "Optional. Input only. PEM-encoded private key associated with the Client Certificate. If this field is used then the 'client_certificate' and the 'ca_certificate' fields are mandatory.",
      ).optional(),
      clientKeySet: z.boolean().describe(
        "Output only. Indicates whether the client_key field is set.",
      ).optional(),
    }).describe("SSL configuration for the MySQL connection.").optional(),
    username: z.string().describe(
      "Required. Username for the MySQL connection.",
    ).optional(),
  }).describe("Profile for connecting to a MySQL source.").optional(),
  oracleProfile: z.object({
    connectionAttributes: z.record(z.string(), z.string()).describe(
      "Connection string attributes",
    ).optional(),
    databaseService: z.string().describe(
      "Required. Database for the Oracle connection.",
    ).optional(),
    hostname: z.string().describe(
      "Required. Hostname for the Oracle connection.",
    ).optional(),
    oracleAsmConfig: z.object({
      asmService: z.string().describe(
        "Required. ASM service name for the Oracle ASM connection.",
      ).optional(),
      connectionAttributes: z.record(z.string(), z.string()).describe(
        "Optional. Connection string attributes",
      ).optional(),
      hostname: z.string().describe(
        "Required. Hostname for the Oracle ASM connection.",
      ).optional(),
      oracleSslConfig: z.object({
        caCertificate: z.string().describe(
          "Input only. PEM-encoded certificate of the CA that signed the source database server's certificate.",
        ).optional(),
        caCertificateSet: z.boolean().describe(
          "Output only. Indicates whether the ca_certificate field has been set for this Connection-Profile.",
        ).optional(),
        serverCertificateDistinguishedName: z.string().describe(
          "Optional. The distinguished name (DN) mentioned in the server certificate. This corresponds to SSL_SERVER_CERT_DN sqlnet parameter. Refer https://docs.oracle.com/en/database/oracle/oracle-database/19/netrf/local-naming-parameters-in-tns-ora-file.html#GUID-70AB0695-A9AA-4A94-B141-4C605236EEB7 If this field is not provided, the DN matching is not enforced.",
        ).optional(),
      }).describe("Optional. SSL configuration for the Oracle connection.")
        .optional(),
      password: z.string().describe(
        "Optional. Password for the Oracle ASM connection. Mutually exclusive with the `secret_manager_stored_password` field.",
      ).optional(),
      port: z.number().int().describe(
        "Required. Port for the Oracle ASM connection.",
      ).optional(),
      secretManagerStoredPassword: z.string().describe(
        "Optional. A reference to a Secret Manager resource name storing the Oracle ASM connection password. Mutually exclusive with the `password` field.",
      ).optional(),
      username: z.string().describe(
        "Required. Username for the Oracle ASM connection.",
      ).optional(),
    }).describe("Optional. Configuration for Oracle ASM connection.")
      .optional(),
    oracleSslConfig: z.object({
      caCertificate: z.string().describe(
        "Input only. PEM-encoded certificate of the CA that signed the source database server's certificate.",
      ).optional(),
      caCertificateSet: z.boolean().describe(
        "Output only. Indicates whether the ca_certificate field has been set for this Connection-Profile.",
      ).optional(),
      serverCertificateDistinguishedName: z.string().describe(
        "Optional. The distinguished name (DN) mentioned in the server certificate. This corresponds to SSL_SERVER_CERT_DN sqlnet parameter. Refer https://docs.oracle.com/en/database/oracle/oracle-database/19/netrf/local-naming-parameters-in-tns-ora-file.html#GUID-70AB0695-A9AA-4A94-B141-4C605236EEB7 If this field is not provided, the DN matching is not enforced.",
      ).optional(),
    }).describe("Optional. SSL configuration for the Oracle connection.")
      .optional(),
    password: z.string().describe(
      "Optional. Password for the Oracle connection. Mutually exclusive with the `secret_manager_stored_password` field.",
    ).optional(),
    port: z.number().int().describe(
      "Port for the Oracle connection, default value is 1521.",
    ).optional(),
    secretManagerStoredPassword: z.string().describe(
      "Optional. A reference to a Secret Manager resource name storing the Oracle connection password. Mutually exclusive with the `password` field.",
    ).optional(),
    username: z.string().describe(
      "Required. Username for the Oracle connection.",
    ).optional(),
  }).describe("Profile for connecting to an Oracle source.").optional(),
  postgresqlProfile: z.object({
    database: z.string().describe(
      "Required. Database for the PostgreSQL connection.",
    ).optional(),
    hostname: z.string().describe(
      "Required. Hostname for the PostgreSQL connection.",
    ).optional(),
    password: z.string().describe(
      "Optional. Password for the PostgreSQL connection. Mutually exclusive with the `secret_manager_stored_password` field.",
    ).optional(),
    port: z.number().int().describe(
      "Port for the PostgreSQL connection, default value is 5432.",
    ).optional(),
    secretManagerStoredPassword: z.string().describe(
      "Optional. A reference to a Secret Manager resource name storing the PostgreSQL connection password. Mutually exclusive with the `password` field.",
    ).optional(),
    sslConfig: z.object({
      serverAndClientVerification: z.object({
        caCertificate: z.string().describe(
          "Required. Input only. PEM-encoded server root CA certificate.",
        ).optional(),
        clientCertificate: z.string().describe(
          "Required. Input only. PEM-encoded certificate used by the source database to authenticate the client identity (i.e., the Datastream's identity). This certificate is signed by either a root certificate trusted by the server or one or more intermediate certificates (which is stored with the leaf certificate) to link the this certificate to the trusted root certificate.",
        ).optional(),
        clientKey: z.string().describe(
          "Optional. Input only. PEM-encoded private key associated with the client certificate. This value will be used during the SSL/TLS handshake, allowing the PostgreSQL server to authenticate the client's identity, i.e. identity of the Datastream.",
        ).optional(),
        serverCertificateHostname: z.string().describe(
          "Optional. The hostname mentioned in the Subject or SAN extension of the server certificate. If this field is not provided, the hostname in the server certificate is not validated.",
        ).optional(),
      }).describe(
        "If this field is set, the communication will be encrypted with TLS encryption and both the server identity and the client identity will be authenticated.",
      ).optional(),
      serverVerification: z.object({
        caCertificate: z.string().describe(
          "Required. Input only. PEM-encoded server root CA certificate.",
        ).optional(),
        serverCertificateHostname: z.string().describe(
          "Optional. The hostname mentioned in the Subject or SAN extension of the server certificate. If this field is not provided, the hostname in the server certificate is not validated.",
        ).optional(),
      }).describe(
        "If this field is set, the communication will be encrypted with TLS encryption and the server identity will be authenticated.",
      ).optional(),
    }).describe(
      "Optional. SSL configuration for the PostgreSQL connection. In case PostgresqlSslConfig is not set, the connection will use the default SSL mode, which is `prefer` (i.e. this mode will only use encryption if enabled from database side, otherwise will use unencrypted communication)",
    ).optional(),
    username: z.string().describe(
      "Required. Username for the PostgreSQL connection.",
    ).optional(),
  }).describe("Profile for connecting to a PostgreSQL source.").optional(),
  privateConnectivity: z.object({
    privateConnection: z.string().describe(
      "Required. A reference to a private connection resource. Format: `projects/{project}/locations/{location}/privateConnections/{name}`",
    ).optional(),
  }).describe("Private connectivity.").optional(),
  salesforceMarketingCloudProfile: z.object({
    oauthClientCredentials: z.object({
      clientId: z.string().describe(
        "Required. Client ID for OAuth Client Credentials.",
      ).optional(),
      clientSecret: z.object({
        rawValue: z.string().describe(
          "Optional. Input only. The actual raw value of the secret as plain text.",
        ).optional(),
        secretVersion: z.string().describe(
          "Optional. A Secret Manager resource name storing the actual value of the secret. Supported formats: * projects/{project}/locations/{location}/secrets/{secret}/versions/{version} * projects/{project}/secrets/{secret}/versions/{version}",
        ).optional(),
      }).describe("Required. Client secret for OAuth Client Credentials.")
        .optional(),
    }).describe(
      "Required. Input only. Credentials for authenticating with the Salesforce Marketing Cloud API.",
    ).optional(),
    subdomain: z.string().describe(
      "Required. Subdomain for the Salesforce Marketing Cloud connection. Example: if your specific endpoint is `https://{your-specific-subdomain}.rest.marketingcloudapis.com/`, the subdomain is `{your-specific-subdomain}`. Must be 1-63 characters, start and end with an alphanumeric character, and contain only lowercase letters, numbers, and hyphens (-).",
    ).optional(),
  }).describe("Profile for connecting to a Salesforce Marketing Cloud source.")
    .optional(),
  salesforceProfile: z.object({
    domain: z.string().describe(
      "Required. Domain endpoint for the Salesforce connection.",
    ).optional(),
    oauth2ClientCredentials: z.object({
      clientId: z.string().describe(
        "Required. Client ID for Salesforce OAuth2 Client Credentials.",
      ).optional(),
      clientSecret: z.string().describe(
        "Optional. Client secret for Salesforce OAuth2 Client Credentials. Mutually exclusive with the `secret_manager_stored_client_secret` field.",
      ).optional(),
      secretManagerStoredClientSecret: z.string().describe(
        "Optional. A reference to a Secret Manager resource name storing the Salesforce OAuth2 client_secret. Mutually exclusive with the `client_secret` field.",
      ).optional(),
    }).describe("Connected app authentication.").optional(),
    userCredentials: z.object({
      password: z.string().describe(
        "Optional. Password for the Salesforce connection. Mutually exclusive with the `secret_manager_stored_password` field.",
      ).optional(),
      secretManagerStoredPassword: z.string().describe(
        "Optional. A reference to a Secret Manager resource name storing the Salesforce connection's password. Mutually exclusive with the `password` field.",
      ).optional(),
      secretManagerStoredSecurityToken: z.string().describe(
        "Optional. A reference to a Secret Manager resource name storing the Salesforce connection's security token. Mutually exclusive with the `security_token` field.",
      ).optional(),
      securityToken: z.string().describe(
        "Optional. Security token for the Salesforce connection. Mutually exclusive with the `secret_manager_stored_security_token` field.",
      ).optional(),
      username: z.string().describe(
        "Required. Username for the Salesforce connection.",
      ).optional(),
    }).describe(
      "Deprecated: Salesforce is retiring Username-Password authentication. Use `oauth2_client_credentials` instead.",
    ).optional(),
  }).describe("Profile for connecting to a Salesforce source.").optional(),
  serviceNowProfile: z.object({
    instance: z.string().describe(
      "Required. The instance of the ServiceNow account. This is the `` part of the URL `https://.service-now.com`.",
    ).optional(),
    oauthClientCredentials: z.object({
      clientId: z.string().describe(
        "Required. Client ID for OAuth Client Credentials.",
      ).optional(),
      clientSecret: z.object({
        rawValue: z.string().describe(
          "Optional. Input only. The actual raw value of the secret as plain text.",
        ).optional(),
        secretVersion: z.string().describe(
          "Optional. A Secret Manager resource name storing the actual value of the secret. Supported formats: * projects/{project}/locations/{location}/secrets/{secret}/versions/{version} * projects/{project}/secrets/{secret}/versions/{version}",
        ).optional(),
      }).describe("Required. Client secret for OAuth Client Credentials.")
        .optional(),
    }).describe("Credentials for authenticating with the ServiceNow API.")
      .optional(),
    userPasswordCredentials: z.object({
      password: z.object({
        rawValue: z.string().describe(
          "Optional. Input only. The actual raw value of the secret as plain text.",
        ).optional(),
        secretVersion: z.string().describe(
          "Optional. A Secret Manager resource name storing the actual value of the secret. Supported formats: * projects/{project}/locations/{location}/secrets/{secret}/versions/{version} * projects/{project}/secrets/{secret}/versions/{version}",
        ).optional(),
      }).describe("Required. Password for the connection.").optional(),
      username: z.string().describe("Required. Username for the connection.")
        .optional(),
    }).describe("User-password authentication.").optional(),
  }).describe("Profile for connecting to a ServiceNow source.").optional(),
  spannerProfile: z.object({
    database: z.string().describe(
      "Required. Immutable. Cloud Spanner database resource. This field is immutable. Must be in the format: projects/{project}/instances/{instance}/databases/{database_id}.",
    ).optional(),
    host: z.string().describe(
      "Optional. The Spanner endpoint to connect to. Defaults to the global endpoint (https://spanner.googleapis.com). Must be in the format: https://spanner.{region}.rep.googleapis.com.",
    ).optional(),
  }).describe("Profile for connecting to a Spanner source.").optional(),
  sqlServerProfile: z.object({
    database: z.string().describe(
      "Required. Database for the SQLServer connection.",
    ).optional(),
    hostname: z.string().describe(
      "Required. Hostname for the SQLServer connection.",
    ).optional(),
    password: z.string().describe(
      "Optional. Password for the SQLServer connection. Mutually exclusive with the `secret_manager_stored_password` field.",
    ).optional(),
    port: z.number().int().describe(
      "Port for the SQLServer connection, default value is 1433.",
    ).optional(),
    secretManagerStoredPassword: z.string().describe(
      "Optional. A reference to a Secret Manager resource name storing the SQLServer connection password. Mutually exclusive with the `password` field.",
    ).optional(),
    sslConfig: z.object({
      basicEncryption: z.object({}).describe(
        "If set, Datastream will enforce encryption without authenticating server identity. Server certificates will be trusted by default.",
      ).optional(),
      encryptionAndServerValidation: z.object({
        caCertificate: z.string().describe(
          "Optional. Input only. PEM-encoded certificate of the CA that signed the source database server's certificate.",
        ).optional(),
        serverCertificateHostname: z.string().describe(
          "Optional. The hostname mentioned in the Subject or SAN extension of the server certificate. This field is used for bypassing the hostname validation while verifying server certificate. This is required for scenarios where the host name that datastream connects to is different from the certificate's subject. This specifically happens for private connectivity. It could also happen when the customer provides a public IP in connection profile but the same is not present in the server certificate.",
        ).optional(),
      }).describe(
        "If set, Datastream will enforce encryption and authenticate server identity.",
      ).optional(),
      encryptionNotEnforced: z.object({}).describe(
        "If set, Datastream will not enforce encryption. If the DB server mandates encryption, then connection will be encrypted but server identity will not be authenticated.",
      ).optional(),
    }).describe("Optional. SSL configuration for the SQLServer connection.")
      .optional(),
    username: z.string().describe(
      "Required. Username for the SQLServer connection.",
    ).optional(),
  }).describe("Profile for connecting to a SQLServer source.").optional(),
  staticServiceIpConnectivity: z.object({}).describe(
    "Static Service IP connectivity.",
  ).optional(),
  workdayProfile: z.object({
    host: z.string().describe(
      "Required. Host for the Workday connection. Must be a valid hostname (e.g., `wd3-impl-services1.workday.com`).",
    ).optional(),
    oauthRefreshTokenCredentials: z.object({
      oauthClientCredentials: z.object({
        clientId: z.string().describe(
          "Required. Client ID for OAuth Client Credentials.",
        ).optional(),
        clientSecret: z.object({
          rawValue: z.string().describe(
            "Optional. Input only. The actual raw value of the secret as plain text.",
          ).optional(),
          secretVersion: z.string().describe(
            "Optional. A Secret Manager resource name storing the actual value of the secret. Supported formats: * projects/{project}/locations/{location}/secrets/{secret}/versions/{version} * projects/{project}/secrets/{secret}/versions/{version}",
          ).optional(),
        }).describe("Required. Client secret for OAuth Client Credentials.")
          .optional(),
      }).describe("Required. Specifies the OAuth Client Credentials.")
        .optional(),
      refreshToken: z.object({
        rawValue: z.string().describe(
          "Optional. Input only. The actual raw value of the secret as plain text.",
        ).optional(),
        secretVersion: z.string().describe(
          "Optional. A Secret Manager resource name storing the actual value of the secret. Supported formats: * projects/{project}/locations/{location}/secrets/{secret}/versions/{version} * projects/{project}/secrets/{secret}/versions/{version}",
        ).optional(),
      }).describe("Required. Specifies the OAuth Refresh Token.").optional(),
    }).describe(
      "Required. Credentials for authenticating with the Workday API. OAuth Refresh Token credentials for authenticating with the Workday API.",
    ).optional(),
    tenant: z.string().describe(
      "Required. Tenant for the Workday connection (e.g., `google12`).",
    ).optional(),
  }).describe("Optional. Profile for connecting to a Workday source.")
    .optional(),
  connectionProfileId: z.string().describe(
    "Required. The connection profile identifier.",
  ).optional(),
  force: z.string().describe(
    "Optional. Create the connection profile without validating it.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  bigqueryProfile: z.object({}).optional(),
  createTime: z.string().optional(),
  dataverseProfile: z.object({
    environmentUrl: z.string(),
    oauthClientCredentials: z.object({
      clientId: z.string(),
      clientSecret: z.object({
        rawValue: z.string(),
        secretVersion: z.string(),
      }),
    }),
    tenantId: z.string(),
  }).optional(),
  displayName: z.string().optional(),
  forwardSshConnectivity: z.object({
    hostname: z.string(),
    password: z.string(),
    port: z.number(),
    privateKey: z.string(),
    username: z.string(),
  }).optional(),
  gcsProfile: z.object({
    bucket: z.string(),
    rootPath: z.string(),
  }).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  mongodbProfile: z.object({
    additionalOptions: z.record(z.string(), z.unknown()),
    hostAddresses: z.array(z.object({
      hostname: z.string(),
      port: z.number(),
    })),
    password: z.string(),
    replicaSet: z.string(),
    secretManagerStoredPassword: z.string(),
    srvConnectionFormat: z.object({}),
    sslConfig: z.object({
      caCertificate: z.string(),
      caCertificateSet: z.boolean(),
      clientCertificate: z.string(),
      clientCertificateSet: z.boolean(),
      clientKey: z.string(),
      clientKeySet: z.boolean(),
      secretManagerStoredClientKey: z.string(),
    }),
    standardConnectionFormat: z.object({
      directConnection: z.boolean(),
    }),
    username: z.string(),
  }).optional(),
  mysqlProfile: z.object({
    hostname: z.string(),
    password: z.string(),
    port: z.number(),
    secretManagerStoredPassword: z.string(),
    sslConfig: z.object({
      caCertificate: z.string(),
      caCertificateSet: z.boolean(),
      clientCertificate: z.string(),
      clientCertificateSet: z.boolean(),
      clientKey: z.string(),
      clientKeySet: z.boolean(),
    }),
    username: z.string(),
  }).optional(),
  name: z.string(),
  oracleProfile: z.object({
    connectionAttributes: z.record(z.string(), z.unknown()),
    databaseService: z.string(),
    hostname: z.string(),
    oracleAsmConfig: z.object({
      asmService: z.string(),
      connectionAttributes: z.record(z.string(), z.unknown()),
      hostname: z.string(),
      oracleSslConfig: z.object({
        caCertificate: z.string(),
        caCertificateSet: z.boolean(),
        serverCertificateDistinguishedName: z.string(),
      }),
      password: z.string(),
      port: z.number(),
      secretManagerStoredPassword: z.string(),
      username: z.string(),
    }),
    oracleSslConfig: z.object({
      caCertificate: z.string(),
      caCertificateSet: z.boolean(),
      serverCertificateDistinguishedName: z.string(),
    }),
    password: z.string(),
    port: z.number(),
    secretManagerStoredPassword: z.string(),
    username: z.string(),
  }).optional(),
  postgresqlProfile: z.object({
    database: z.string(),
    hostname: z.string(),
    password: z.string(),
    port: z.number(),
    secretManagerStoredPassword: z.string(),
    sslConfig: z.object({
      serverAndClientVerification: z.object({
        caCertificate: z.string(),
        clientCertificate: z.string(),
        clientKey: z.string(),
        serverCertificateHostname: z.string(),
      }),
      serverVerification: z.object({
        caCertificate: z.string(),
        serverCertificateHostname: z.string(),
      }),
    }),
    username: z.string(),
  }).optional(),
  privateConnectivity: z.object({
    privateConnection: z.string(),
  }).optional(),
  salesforceMarketingCloudProfile: z.object({
    oauthClientCredentials: z.object({
      clientId: z.string(),
      clientSecret: z.object({
        rawValue: z.string(),
        secretVersion: z.string(),
      }),
    }),
    subdomain: z.string(),
  }).optional(),
  salesforceProfile: z.object({
    domain: z.string(),
    oauth2ClientCredentials: z.object({
      clientId: z.string(),
      clientSecret: z.string(),
      secretManagerStoredClientSecret: z.string(),
    }),
    userCredentials: z.object({
      password: z.string(),
      secretManagerStoredPassword: z.string(),
      secretManagerStoredSecurityToken: z.string(),
      securityToken: z.string(),
      username: z.string(),
    }),
  }).optional(),
  satisfiesPzi: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  serviceNowProfile: z.object({
    instance: z.string(),
    oauthClientCredentials: z.object({
      clientId: z.string(),
      clientSecret: z.object({
        rawValue: z.string(),
        secretVersion: z.string(),
      }),
    }),
    userPasswordCredentials: z.object({
      password: z.object({
        rawValue: z.string(),
        secretVersion: z.string(),
      }),
      username: z.string(),
    }),
  }).optional(),
  spannerProfile: z.object({
    database: z.string(),
    host: z.string(),
  }).optional(),
  sqlServerProfile: z.object({
    database: z.string(),
    hostname: z.string(),
    password: z.string(),
    port: z.number(),
    secretManagerStoredPassword: z.string(),
    sslConfig: z.object({
      basicEncryption: z.object({}),
      encryptionAndServerValidation: z.object({
        caCertificate: z.string(),
        serverCertificateHostname: z.string(),
      }),
      encryptionNotEnforced: z.object({}),
    }),
    username: z.string(),
  }).optional(),
  staticServiceIpConnectivity: z.object({}).optional(),
  updateTime: z.string().optional(),
  workdayProfile: z.object({
    host: z.string(),
    oauthRefreshTokenCredentials: z.object({
      oauthClientCredentials: z.object({
        clientId: z.string(),
        clientSecret: z.object({
          rawValue: z.string(),
          secretVersion: z.string(),
        }),
      }),
      refreshToken: z.object({
        rawValue: z.string(),
        secretVersion: z.string(),
      }),
    }),
    tenant: z.string(),
  }).optional(),
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
  bigqueryProfile: z.object({}).describe(
    "Profile for connecting to a BigQuery destination.",
  ).optional(),
  dataverseProfile: z.object({
    environmentUrl: z.string().describe(
      "Required. Environment URL of the Microsoft Dataverse instance. Example: `.crm.dynamics.com`",
    ).optional(),
    oauthClientCredentials: z.object({
      clientId: z.string().describe(
        "Required. Client ID for OAuth Client Credentials.",
      ).optional(),
      clientSecret: z.object({
        rawValue: z.string().describe(
          "Optional. Input only. The actual raw value of the secret as plain text.",
        ).optional(),
        secretVersion: z.string().describe(
          "Optional. A Secret Manager resource name storing the actual value of the secret. Supported formats: * projects/{project}/locations/{location}/secrets/{secret}/versions/{version} * projects/{project}/secrets/{secret}/versions/{version}",
        ).optional(),
      }).describe("Required. Client secret for OAuth Client Credentials.")
        .optional(),
    }).describe(
      "Required. Credentials for authenticating with the Dataverse API.",
    ).optional(),
    tenantId: z.string().describe(
      "Required. Tenant id of the Microsoft Dataverse instance.",
    ).optional(),
  }).describe("Profile for connecting to a Dataverse source.").optional(),
  displayName: z.string().describe("Required. Display name.").optional(),
  forwardSshConnectivity: z.object({
    hostname: z.string().describe("Required. Hostname for the SSH tunnel.")
      .optional(),
    password: z.string().describe("Input only. SSH password.").optional(),
    port: z.number().int().describe(
      "Port for the SSH tunnel, default value is 22.",
    ).optional(),
    privateKey: z.string().describe("Input only. SSH private key.").optional(),
    username: z.string().describe("Required. Username for the SSH tunnel.")
      .optional(),
  }).describe("Forward SSH tunnel connectivity.").optional(),
  gcsProfile: z.object({
    bucket: z.string().describe("Required. The Cloud Storage bucket name.")
      .optional(),
    rootPath: z.string().describe(
      "Optional. The root path inside the Cloud Storage bucket.",
    ).optional(),
  }).describe("Profile for connecting to a Cloud Storage destination.")
    .optional(),
  labels: z.record(z.string(), z.string()).describe("Labels.").optional(),
  mongodbProfile: z.object({
    additionalOptions: z.record(z.string(), z.string()).describe(
      'Optional. Specifies additional options for the MongoDB connection. The options should be sent as key-value pairs, for example: `additional_options = {"serverSelectionTimeoutMS": "10000", "directConnection": "true"}`. Keys are case-sensitive and should match the official MongoDB connection string options: https://www.mongodb.com/docs/manual/reference/connection-string-options/ The server will not modify the values provided by the user.',
    ).optional(),
    hostAddresses: z.array(z.object({
      hostname: z.string().describe("Required. Hostname for the connection.")
        .optional(),
      port: z.number().int().describe("Optional. Port for the connection.")
        .optional(),
    })).describe(
      "Required. List of host addresses for a MongoDB cluster. For SRV connection format, this list must contain exactly one DNS host without a port. For Standard connection format, this list must contain all the required hosts in the cluster with their respective ports.",
    ).optional(),
    password: z.string().describe(
      "Optional. Password for the MongoDB connection. Mutually exclusive with the `secret_manager_stored_password` field.",
    ).optional(),
    replicaSet: z.string().describe(
      "Optional. Name of the replica set. Only needed for self hosted replica set type MongoDB cluster. For SRV connection format, this field must be empty. For Standard connection format, this field must be specified.",
    ).optional(),
    secretManagerStoredPassword: z.string().describe(
      "Optional. A reference to a Secret Manager resource name storing the SQLServer connection password. Mutually exclusive with the `password` field.",
    ).optional(),
    srvConnectionFormat: z.object({}).describe("Srv connection format.")
      .optional(),
    sslConfig: z.object({
      caCertificate: z.string().describe(
        "Optional. Input only. PEM-encoded certificate of the CA that signed the source database server's certificate.",
      ).optional(),
      caCertificateSet: z.boolean().describe(
        "Output only. Indicates whether the ca_certificate field is set.",
      ).optional(),
      clientCertificate: z.string().describe(
        "Optional. Input only. PEM-encoded certificate that will be used by the replica to authenticate against the source database server. If this field is used then the 'client_key' and the 'ca_certificate' fields are mandatory.",
      ).optional(),
      clientCertificateSet: z.boolean().describe(
        "Output only. Indicates whether the client_certificate field is set.",
      ).optional(),
      clientKey: z.string().describe(
        "Optional. Input only. PEM-encoded private key associated with the Client Certificate. If this field is used then the 'client_certificate' and the 'ca_certificate' fields are mandatory.",
      ).optional(),
      clientKeySet: z.boolean().describe(
        "Output only. Indicates whether the client_key field is set.",
      ).optional(),
      secretManagerStoredClientKey: z.string().describe(
        "Optional. Input only. A reference to a Secret Manager resource name storing the PEM-encoded private key associated with the Client Certificate. If this field is used then the 'client_certificate' and the 'ca_certificate' fields are mandatory. Mutually exclusive with the `client_key` field.",
      ).optional(),
    }).describe("Optional. SSL configuration for the MongoDB connection.")
      .optional(),
    standardConnectionFormat: z.object({
      directConnection: z.boolean().describe(
        'Optional. Deprecated: Use the `additional_options` map to specify the `directConnection` parameter instead. For example: `additional_options = {"directConnection": "true"}`. Specifies whether the client connects directly to the host[:port] in the connection URI.',
      ).optional(),
    }).describe("Standard connection format.").optional(),
    username: z.string().describe(
      "Required. Username for the MongoDB connection.",
    ).optional(),
  }).describe("Profile for connecting to a MongoDB source.").optional(),
  mysqlProfile: z.object({
    hostname: z.string().describe(
      "Required. Hostname for the MySQL connection.",
    ).optional(),
    password: z.string().describe(
      "Optional. Input only. Password for the MySQL connection. Mutually exclusive with the `secret_manager_stored_password` field.",
    ).optional(),
    port: z.number().int().describe(
      "Port for the MySQL connection, default value is 3306.",
    ).optional(),
    secretManagerStoredPassword: z.string().describe(
      "Optional. A reference to a Secret Manager resource name storing the MySQL connection password. Mutually exclusive with the `password` field.",
    ).optional(),
    sslConfig: z.object({
      caCertificate: z.string().describe(
        "Input only. PEM-encoded certificate of the CA that signed the source database server's certificate.",
      ).optional(),
      caCertificateSet: z.boolean().describe(
        "Output only. Indicates whether the ca_certificate field is set.",
      ).optional(),
      clientCertificate: z.string().describe(
        "Optional. Input only. PEM-encoded certificate that will be used by the replica to authenticate against the source database server. If this field is used then the 'client_key' and the 'ca_certificate' fields are mandatory.",
      ).optional(),
      clientCertificateSet: z.boolean().describe(
        "Output only. Indicates whether the client_certificate field is set.",
      ).optional(),
      clientKey: z.string().describe(
        "Optional. Input only. PEM-encoded private key associated with the Client Certificate. If this field is used then the 'client_certificate' and the 'ca_certificate' fields are mandatory.",
      ).optional(),
      clientKeySet: z.boolean().describe(
        "Output only. Indicates whether the client_key field is set.",
      ).optional(),
    }).describe("SSL configuration for the MySQL connection.").optional(),
    username: z.string().describe(
      "Required. Username for the MySQL connection.",
    ).optional(),
  }).describe("Profile for connecting to a MySQL source.").optional(),
  oracleProfile: z.object({
    connectionAttributes: z.record(z.string(), z.string()).describe(
      "Connection string attributes",
    ).optional(),
    databaseService: z.string().describe(
      "Required. Database for the Oracle connection.",
    ).optional(),
    hostname: z.string().describe(
      "Required. Hostname for the Oracle connection.",
    ).optional(),
    oracleAsmConfig: z.object({
      asmService: z.string().describe(
        "Required. ASM service name for the Oracle ASM connection.",
      ).optional(),
      connectionAttributes: z.record(z.string(), z.string()).describe(
        "Optional. Connection string attributes",
      ).optional(),
      hostname: z.string().describe(
        "Required. Hostname for the Oracle ASM connection.",
      ).optional(),
      oracleSslConfig: z.object({
        caCertificate: z.string().describe(
          "Input only. PEM-encoded certificate of the CA that signed the source database server's certificate.",
        ).optional(),
        caCertificateSet: z.boolean().describe(
          "Output only. Indicates whether the ca_certificate field has been set for this Connection-Profile.",
        ).optional(),
        serverCertificateDistinguishedName: z.string().describe(
          "Optional. The distinguished name (DN) mentioned in the server certificate. This corresponds to SSL_SERVER_CERT_DN sqlnet parameter. Refer https://docs.oracle.com/en/database/oracle/oracle-database/19/netrf/local-naming-parameters-in-tns-ora-file.html#GUID-70AB0695-A9AA-4A94-B141-4C605236EEB7 If this field is not provided, the DN matching is not enforced.",
        ).optional(),
      }).describe("Optional. SSL configuration for the Oracle connection.")
        .optional(),
      password: z.string().describe(
        "Optional. Password for the Oracle ASM connection. Mutually exclusive with the `secret_manager_stored_password` field.",
      ).optional(),
      port: z.number().int().describe(
        "Required. Port for the Oracle ASM connection.",
      ).optional(),
      secretManagerStoredPassword: z.string().describe(
        "Optional. A reference to a Secret Manager resource name storing the Oracle ASM connection password. Mutually exclusive with the `password` field.",
      ).optional(),
      username: z.string().describe(
        "Required. Username for the Oracle ASM connection.",
      ).optional(),
    }).describe("Optional. Configuration for Oracle ASM connection.")
      .optional(),
    oracleSslConfig: z.object({
      caCertificate: z.string().describe(
        "Input only. PEM-encoded certificate of the CA that signed the source database server's certificate.",
      ).optional(),
      caCertificateSet: z.boolean().describe(
        "Output only. Indicates whether the ca_certificate field has been set for this Connection-Profile.",
      ).optional(),
      serverCertificateDistinguishedName: z.string().describe(
        "Optional. The distinguished name (DN) mentioned in the server certificate. This corresponds to SSL_SERVER_CERT_DN sqlnet parameter. Refer https://docs.oracle.com/en/database/oracle/oracle-database/19/netrf/local-naming-parameters-in-tns-ora-file.html#GUID-70AB0695-A9AA-4A94-B141-4C605236EEB7 If this field is not provided, the DN matching is not enforced.",
      ).optional(),
    }).describe("Optional. SSL configuration for the Oracle connection.")
      .optional(),
    password: z.string().describe(
      "Optional. Password for the Oracle connection. Mutually exclusive with the `secret_manager_stored_password` field.",
    ).optional(),
    port: z.number().int().describe(
      "Port for the Oracle connection, default value is 1521.",
    ).optional(),
    secretManagerStoredPassword: z.string().describe(
      "Optional. A reference to a Secret Manager resource name storing the Oracle connection password. Mutually exclusive with the `password` field.",
    ).optional(),
    username: z.string().describe(
      "Required. Username for the Oracle connection.",
    ).optional(),
  }).describe("Profile for connecting to an Oracle source.").optional(),
  postgresqlProfile: z.object({
    database: z.string().describe(
      "Required. Database for the PostgreSQL connection.",
    ).optional(),
    hostname: z.string().describe(
      "Required. Hostname for the PostgreSQL connection.",
    ).optional(),
    password: z.string().describe(
      "Optional. Password for the PostgreSQL connection. Mutually exclusive with the `secret_manager_stored_password` field.",
    ).optional(),
    port: z.number().int().describe(
      "Port for the PostgreSQL connection, default value is 5432.",
    ).optional(),
    secretManagerStoredPassword: z.string().describe(
      "Optional. A reference to a Secret Manager resource name storing the PostgreSQL connection password. Mutually exclusive with the `password` field.",
    ).optional(),
    sslConfig: z.object({
      serverAndClientVerification: z.object({
        caCertificate: z.string().describe(
          "Required. Input only. PEM-encoded server root CA certificate.",
        ).optional(),
        clientCertificate: z.string().describe(
          "Required. Input only. PEM-encoded certificate used by the source database to authenticate the client identity (i.e., the Datastream's identity). This certificate is signed by either a root certificate trusted by the server or one or more intermediate certificates (which is stored with the leaf certificate) to link the this certificate to the trusted root certificate.",
        ).optional(),
        clientKey: z.string().describe(
          "Optional. Input only. PEM-encoded private key associated with the client certificate. This value will be used during the SSL/TLS handshake, allowing the PostgreSQL server to authenticate the client's identity, i.e. identity of the Datastream.",
        ).optional(),
        serverCertificateHostname: z.string().describe(
          "Optional. The hostname mentioned in the Subject or SAN extension of the server certificate. If this field is not provided, the hostname in the server certificate is not validated.",
        ).optional(),
      }).describe(
        "If this field is set, the communication will be encrypted with TLS encryption and both the server identity and the client identity will be authenticated.",
      ).optional(),
      serverVerification: z.object({
        caCertificate: z.string().describe(
          "Required. Input only. PEM-encoded server root CA certificate.",
        ).optional(),
        serverCertificateHostname: z.string().describe(
          "Optional. The hostname mentioned in the Subject or SAN extension of the server certificate. If this field is not provided, the hostname in the server certificate is not validated.",
        ).optional(),
      }).describe(
        "If this field is set, the communication will be encrypted with TLS encryption and the server identity will be authenticated.",
      ).optional(),
    }).describe(
      "Optional. SSL configuration for the PostgreSQL connection. In case PostgresqlSslConfig is not set, the connection will use the default SSL mode, which is `prefer` (i.e. this mode will only use encryption if enabled from database side, otherwise will use unencrypted communication)",
    ).optional(),
    username: z.string().describe(
      "Required. Username for the PostgreSQL connection.",
    ).optional(),
  }).describe("Profile for connecting to a PostgreSQL source.").optional(),
  privateConnectivity: z.object({
    privateConnection: z.string().describe(
      "Required. A reference to a private connection resource. Format: `projects/{project}/locations/{location}/privateConnections/{name}`",
    ).optional(),
  }).describe("Private connectivity.").optional(),
  salesforceMarketingCloudProfile: z.object({
    oauthClientCredentials: z.object({
      clientId: z.string().describe(
        "Required. Client ID for OAuth Client Credentials.",
      ).optional(),
      clientSecret: z.object({
        rawValue: z.string().describe(
          "Optional. Input only. The actual raw value of the secret as plain text.",
        ).optional(),
        secretVersion: z.string().describe(
          "Optional. A Secret Manager resource name storing the actual value of the secret. Supported formats: * projects/{project}/locations/{location}/secrets/{secret}/versions/{version} * projects/{project}/secrets/{secret}/versions/{version}",
        ).optional(),
      }).describe("Required. Client secret for OAuth Client Credentials.")
        .optional(),
    }).describe(
      "Required. Input only. Credentials for authenticating with the Salesforce Marketing Cloud API.",
    ).optional(),
    subdomain: z.string().describe(
      "Required. Subdomain for the Salesforce Marketing Cloud connection. Example: if your specific endpoint is `https://{your-specific-subdomain}.rest.marketingcloudapis.com/`, the subdomain is `{your-specific-subdomain}`. Must be 1-63 characters, start and end with an alphanumeric character, and contain only lowercase letters, numbers, and hyphens (-).",
    ).optional(),
  }).describe("Profile for connecting to a Salesforce Marketing Cloud source.")
    .optional(),
  salesforceProfile: z.object({
    domain: z.string().describe(
      "Required. Domain endpoint for the Salesforce connection.",
    ).optional(),
    oauth2ClientCredentials: z.object({
      clientId: z.string().describe(
        "Required. Client ID for Salesforce OAuth2 Client Credentials.",
      ).optional(),
      clientSecret: z.string().describe(
        "Optional. Client secret for Salesforce OAuth2 Client Credentials. Mutually exclusive with the `secret_manager_stored_client_secret` field.",
      ).optional(),
      secretManagerStoredClientSecret: z.string().describe(
        "Optional. A reference to a Secret Manager resource name storing the Salesforce OAuth2 client_secret. Mutually exclusive with the `client_secret` field.",
      ).optional(),
    }).describe("Connected app authentication.").optional(),
    userCredentials: z.object({
      password: z.string().describe(
        "Optional. Password for the Salesforce connection. Mutually exclusive with the `secret_manager_stored_password` field.",
      ).optional(),
      secretManagerStoredPassword: z.string().describe(
        "Optional. A reference to a Secret Manager resource name storing the Salesforce connection's password. Mutually exclusive with the `password` field.",
      ).optional(),
      secretManagerStoredSecurityToken: z.string().describe(
        "Optional. A reference to a Secret Manager resource name storing the Salesforce connection's security token. Mutually exclusive with the `security_token` field.",
      ).optional(),
      securityToken: z.string().describe(
        "Optional. Security token for the Salesforce connection. Mutually exclusive with the `secret_manager_stored_security_token` field.",
      ).optional(),
      username: z.string().describe(
        "Required. Username for the Salesforce connection.",
      ).optional(),
    }).describe(
      "Deprecated: Salesforce is retiring Username-Password authentication. Use `oauth2_client_credentials` instead.",
    ).optional(),
  }).describe("Profile for connecting to a Salesforce source.").optional(),
  serviceNowProfile: z.object({
    instance: z.string().describe(
      "Required. The instance of the ServiceNow account. This is the `` part of the URL `https://.service-now.com`.",
    ).optional(),
    oauthClientCredentials: z.object({
      clientId: z.string().describe(
        "Required. Client ID for OAuth Client Credentials.",
      ).optional(),
      clientSecret: z.object({
        rawValue: z.string().describe(
          "Optional. Input only. The actual raw value of the secret as plain text.",
        ).optional(),
        secretVersion: z.string().describe(
          "Optional. A Secret Manager resource name storing the actual value of the secret. Supported formats: * projects/{project}/locations/{location}/secrets/{secret}/versions/{version} * projects/{project}/secrets/{secret}/versions/{version}",
        ).optional(),
      }).describe("Required. Client secret for OAuth Client Credentials.")
        .optional(),
    }).describe("Credentials for authenticating with the ServiceNow API.")
      .optional(),
    userPasswordCredentials: z.object({
      password: z.object({
        rawValue: z.string().describe(
          "Optional. Input only. The actual raw value of the secret as plain text.",
        ).optional(),
        secretVersion: z.string().describe(
          "Optional. A Secret Manager resource name storing the actual value of the secret. Supported formats: * projects/{project}/locations/{location}/secrets/{secret}/versions/{version} * projects/{project}/secrets/{secret}/versions/{version}",
        ).optional(),
      }).describe("Required. Password for the connection.").optional(),
      username: z.string().describe("Required. Username for the connection.")
        .optional(),
    }).describe("User-password authentication.").optional(),
  }).describe("Profile for connecting to a ServiceNow source.").optional(),
  spannerProfile: z.object({
    database: z.string().describe(
      "Required. Immutable. Cloud Spanner database resource. This field is immutable. Must be in the format: projects/{project}/instances/{instance}/databases/{database_id}.",
    ).optional(),
    host: z.string().describe(
      "Optional. The Spanner endpoint to connect to. Defaults to the global endpoint (https://spanner.googleapis.com). Must be in the format: https://spanner.{region}.rep.googleapis.com.",
    ).optional(),
  }).describe("Profile for connecting to a Spanner source.").optional(),
  sqlServerProfile: z.object({
    database: z.string().describe(
      "Required. Database for the SQLServer connection.",
    ).optional(),
    hostname: z.string().describe(
      "Required. Hostname for the SQLServer connection.",
    ).optional(),
    password: z.string().describe(
      "Optional. Password for the SQLServer connection. Mutually exclusive with the `secret_manager_stored_password` field.",
    ).optional(),
    port: z.number().int().describe(
      "Port for the SQLServer connection, default value is 1433.",
    ).optional(),
    secretManagerStoredPassword: z.string().describe(
      "Optional. A reference to a Secret Manager resource name storing the SQLServer connection password. Mutually exclusive with the `password` field.",
    ).optional(),
    sslConfig: z.object({
      basicEncryption: z.object({}).describe(
        "If set, Datastream will enforce encryption without authenticating server identity. Server certificates will be trusted by default.",
      ).optional(),
      encryptionAndServerValidation: z.object({
        caCertificate: z.string().describe(
          "Optional. Input only. PEM-encoded certificate of the CA that signed the source database server's certificate.",
        ).optional(),
        serverCertificateHostname: z.string().describe(
          "Optional. The hostname mentioned in the Subject or SAN extension of the server certificate. This field is used for bypassing the hostname validation while verifying server certificate. This is required for scenarios where the host name that datastream connects to is different from the certificate's subject. This specifically happens for private connectivity. It could also happen when the customer provides a public IP in connection profile but the same is not present in the server certificate.",
        ).optional(),
      }).describe(
        "If set, Datastream will enforce encryption and authenticate server identity.",
      ).optional(),
      encryptionNotEnforced: z.object({}).describe(
        "If set, Datastream will not enforce encryption. If the DB server mandates encryption, then connection will be encrypted but server identity will not be authenticated.",
      ).optional(),
    }).describe("Optional. SSL configuration for the SQLServer connection.")
      .optional(),
    username: z.string().describe(
      "Required. Username for the SQLServer connection.",
    ).optional(),
  }).describe("Profile for connecting to a SQLServer source.").optional(),
  staticServiceIpConnectivity: z.object({}).describe(
    "Static Service IP connectivity.",
  ).optional(),
  workdayProfile: z.object({
    host: z.string().describe(
      "Required. Host for the Workday connection. Must be a valid hostname (e.g., `wd3-impl-services1.workday.com`).",
    ).optional(),
    oauthRefreshTokenCredentials: z.object({
      oauthClientCredentials: z.object({
        clientId: z.string().describe(
          "Required. Client ID for OAuth Client Credentials.",
        ).optional(),
        clientSecret: z.object({
          rawValue: z.string().describe(
            "Optional. Input only. The actual raw value of the secret as plain text.",
          ).optional(),
          secretVersion: z.string().describe(
            "Optional. A Secret Manager resource name storing the actual value of the secret. Supported formats: * projects/{project}/locations/{location}/secrets/{secret}/versions/{version} * projects/{project}/secrets/{secret}/versions/{version}",
          ).optional(),
        }).describe("Required. Client secret for OAuth Client Credentials.")
          .optional(),
      }).describe("Required. Specifies the OAuth Client Credentials.")
        .optional(),
      refreshToken: z.object({
        rawValue: z.string().describe(
          "Optional. Input only. The actual raw value of the secret as plain text.",
        ).optional(),
        secretVersion: z.string().describe(
          "Optional. A Secret Manager resource name storing the actual value of the secret. Supported formats: * projects/{project}/locations/{location}/secrets/{secret}/versions/{version} * projects/{project}/secrets/{secret}/versions/{version}",
        ).optional(),
      }).describe("Required. Specifies the OAuth Refresh Token.").optional(),
    }).describe(
      "Required. Credentials for authenticating with the Workday API. OAuth Refresh Token credentials for authenticating with the Workday API.",
    ).optional(),
    tenant: z.string().describe(
      "Required. Tenant for the Workday connection (e.g., `google12`).",
    ).optional(),
  }).describe("Optional. Profile for connecting to a Workday source.")
    .optional(),
  connectionProfileId: z.string().describe(
    "Required. The connection profile identifier.",
  ).optional(),
  force: z.string().describe(
    "Optional. Create the connection profile without validating it.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
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

/** Swamp extension model for Google Cloud Datastream ConnectionProfiles. Registered at `@swamp/gcp/datastream/connectionprofiles`. */
export const model = {
  type: "@swamp/gcp/datastream/connectionprofiles",
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
      toVersion: "2026.06.04.1",
      description:
        "Added: dataverseProfile, salesforceMarketingCloudProfile, serviceNowProfile",
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
      toVersion: "2026.06.25.1",
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
      description:
        "Added: dataverseProfile, salesforceMarketingCloudProfile, serviceNowProfile",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.1",
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
      description:
        "Added: dataverseProfile, salesforceMarketingCloudProfile, serviceNowProfile",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.24.1",
      description: "Added: workdayProfile",
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
        "A set of reusable connection configurations to be used as a source or destina...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a connectionProfiles",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
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
        if (g["bigqueryProfile"] !== undefined) {
          body["bigqueryProfile"] = g["bigqueryProfile"];
        }
        if (g["dataverseProfile"] !== undefined) {
          body["dataverseProfile"] = g["dataverseProfile"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["forwardSshConnectivity"] !== undefined) {
          body["forwardSshConnectivity"] = g["forwardSshConnectivity"];
        }
        if (g["gcsProfile"] !== undefined) body["gcsProfile"] = g["gcsProfile"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["mongodbProfile"] !== undefined) {
          body["mongodbProfile"] = g["mongodbProfile"];
        }
        if (g["mysqlProfile"] !== undefined) {
          body["mysqlProfile"] = g["mysqlProfile"];
        }
        if (g["oracleProfile"] !== undefined) {
          body["oracleProfile"] = g["oracleProfile"];
        }
        if (g["postgresqlProfile"] !== undefined) {
          body["postgresqlProfile"] = g["postgresqlProfile"];
        }
        if (g["privateConnectivity"] !== undefined) {
          body["privateConnectivity"] = g["privateConnectivity"];
        }
        if (g["salesforceMarketingCloudProfile"] !== undefined) {
          body["salesforceMarketingCloudProfile"] =
            g["salesforceMarketingCloudProfile"];
        }
        if (g["salesforceProfile"] !== undefined) {
          body["salesforceProfile"] = g["salesforceProfile"];
        }
        if (g["serviceNowProfile"] !== undefined) {
          body["serviceNowProfile"] = g["serviceNowProfile"];
        }
        if (g["spannerProfile"] !== undefined) {
          body["spannerProfile"] = g["spannerProfile"];
        }
        if (g["sqlServerProfile"] !== undefined) {
          body["sqlServerProfile"] = g["sqlServerProfile"];
        }
        if (g["staticServiceIpConnectivity"] !== undefined) {
          body["staticServiceIpConnectivity"] =
            g["staticServiceIpConnectivity"];
        }
        if (g["workdayProfile"] !== undefined) {
          body["workdayProfile"] = g["workdayProfile"];
        }
        if (g["connectionProfileId"] !== undefined) {
          params["connectionProfileId"] = String(g["connectionProfileId"]);
        }
        if (g["force"] !== undefined) params["force"] = String(g["force"]);
        if (g["requestId"] !== undefined) {
          params["requestId"] = String(g["requestId"]);
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
          undefined,
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
      description: "Get a connectionProfiles",
      arguments: z.object({
        identifier: z.string().describe("The name of the connectionProfiles"),
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
      description: "Update connectionProfiles attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific connectionProfiles by name (e.g. one discovered by list)",
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
        if (g["bigqueryProfile"] !== undefined) {
          body["bigqueryProfile"] = g["bigqueryProfile"];
        }
        if (g["dataverseProfile"] !== undefined) {
          body["dataverseProfile"] = g["dataverseProfile"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["forwardSshConnectivity"] !== undefined) {
          body["forwardSshConnectivity"] = g["forwardSshConnectivity"];
        }
        if (g["gcsProfile"] !== undefined) body["gcsProfile"] = g["gcsProfile"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["mongodbProfile"] !== undefined) {
          body["mongodbProfile"] = g["mongodbProfile"];
        }
        if (g["mysqlProfile"] !== undefined) {
          body["mysqlProfile"] = g["mysqlProfile"];
        }
        if (g["oracleProfile"] !== undefined) {
          body["oracleProfile"] = g["oracleProfile"];
        }
        if (g["postgresqlProfile"] !== undefined) {
          body["postgresqlProfile"] = g["postgresqlProfile"];
        }
        if (g["privateConnectivity"] !== undefined) {
          body["privateConnectivity"] = g["privateConnectivity"];
        }
        if (g["salesforceMarketingCloudProfile"] !== undefined) {
          body["salesforceMarketingCloudProfile"] =
            g["salesforceMarketingCloudProfile"];
        }
        if (g["salesforceProfile"] !== undefined) {
          body["salesforceProfile"] = g["salesforceProfile"];
        }
        if (g["serviceNowProfile"] !== undefined) {
          body["serviceNowProfile"] = g["serviceNowProfile"];
        }
        if (g["spannerProfile"] !== undefined) {
          body["spannerProfile"] = g["spannerProfile"];
        }
        if (g["sqlServerProfile"] !== undefined) {
          body["sqlServerProfile"] = g["sqlServerProfile"];
        }
        if (g["staticServiceIpConnectivity"] !== undefined) {
          body["staticServiceIpConnectivity"] =
            g["staticServiceIpConnectivity"];
        }
        if (g["workdayProfile"] !== undefined) {
          body["workdayProfile"] = g["workdayProfile"];
        }
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
      description: "Delete the connectionProfiles",
      arguments: z.object({
        identifier: z.string().describe("The name of the connectionProfiles"),
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
      description: "Sync connectionProfiles state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific connectionProfiles by name (e.g. one discovered by list)",
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
      description: "List connectionProfiles resources",
      arguments: z.object({
        filter: z.string().describe("Optional. Filter request.").optional(),
        orderBy: z.string().describe(
          "Optional. Order by fields for the result.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. Maximum number of connection profiles to return. If unspecified, at most 50 connection profiles will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000.",
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
          "connectionProfiles",
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
    discover: {
      description: "discover",
      arguments: z.object({
        connectionProfile: z.any().optional(),
        connectionProfileName: z.any().optional(),
        fullHierarchy: z.any().optional(),
        hierarchyDepth: z.any().optional(),
        mongodbCluster: z.any().optional(),
        mysqlRdbms: z.any().optional(),
        oracleRdbms: z.any().optional(),
        postgresqlRdbms: z.any().optional(),
        salesforceOrg: z.any().optional(),
        sourceCatalog: z.any().optional(),
        spannerDatabase: z.any().optional(),
        sqlServerRdbms: z.any().optional(),
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
        const body: Record<string, unknown> = {};
        if (args["connectionProfile"] !== undefined) {
          body["connectionProfile"] = args["connectionProfile"];
        }
        if (args["connectionProfileName"] !== undefined) {
          body["connectionProfileName"] = args["connectionProfileName"];
        }
        if (args["fullHierarchy"] !== undefined) {
          body["fullHierarchy"] = args["fullHierarchy"];
        }
        if (args["hierarchyDepth"] !== undefined) {
          body["hierarchyDepth"] = args["hierarchyDepth"];
        }
        if (args["mongodbCluster"] !== undefined) {
          body["mongodbCluster"] = args["mongodbCluster"];
        }
        if (args["mysqlRdbms"] !== undefined) {
          body["mysqlRdbms"] = args["mysqlRdbms"];
        }
        if (args["oracleRdbms"] !== undefined) {
          body["oracleRdbms"] = args["oracleRdbms"];
        }
        if (args["postgresqlRdbms"] !== undefined) {
          body["postgresqlRdbms"] = args["postgresqlRdbms"];
        }
        if (args["salesforceOrg"] !== undefined) {
          body["salesforceOrg"] = args["salesforceOrg"];
        }
        if (args["sourceCatalog"] !== undefined) {
          body["sourceCatalog"] = args["sourceCatalog"];
        }
        if (args["spannerDatabase"] !== undefined) {
          body["spannerDatabase"] = args["spannerDatabase"];
        }
        if (args["sqlServerRdbms"] !== undefined) {
          body["sqlServerRdbms"] = args["sqlServerRdbms"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "datastream.projects.locations.connectionProfiles.discover",
            "path": "v1/{+parent}/connectionProfiles:discover",
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
