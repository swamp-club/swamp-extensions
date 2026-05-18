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
  getProjectId,
  isResourceNotFoundError,
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

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  bigqueryProfile: z.object({}).describe(
    "Profile for connecting to a BigQuery destination.",
  ).optional(),
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
  }).describe("Forward SSH Tunnel connectivity.").optional(),
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
    }).describe("MongoDB SSL configuration information.").optional(),
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
    }).describe("MySQL SSL configuration information.").optional(),
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
      }).describe("Oracle SSL configuration information.").optional(),
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
    }).describe(
      "Configuration for Oracle Automatic Storage Management (ASM) connection.",
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
    }).describe("Oracle SSL configuration information.").optional(),
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
        "Message represents the option where Datastream will enforce the encryption and authenticate the server identity as well as the client identity. ca_certificate, client_certificate and client_key must be set if user selects this option.",
      ).optional(),
      serverVerification: z.object({
        caCertificate: z.string().describe(
          "Required. Input only. PEM-encoded server root CA certificate.",
        ).optional(),
        serverCertificateHostname: z.string().describe(
          "Optional. The hostname mentioned in the Subject or SAN extension of the server certificate. If this field is not provided, the hostname in the server certificate is not validated.",
        ).optional(),
      }).describe(
        "Message represents the option where Datastream will enforce the encryption and authenticate the server identity. ca_certificate must be set if user selects this option.",
      ).optional(),
    }).describe("PostgreSQL SSL configuration information.").optional(),
    username: z.string().describe(
      "Required. Username for the PostgreSQL connection.",
    ).optional(),
  }).describe("Profile for connecting to a PostgreSQL source.").optional(),
  privateConnectivity: z.object({
    privateConnection: z.string().describe(
      "Required. A reference to a private connection resource. Format: `projects/{project}/locations/{location}/privateConnections/{name}`",
    ).optional(),
  }).describe("Private Connectivity").optional(),
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
    }).describe("OAuth2 Client Credentials.").optional(),
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
    }).describe("Username-password credentials.").optional(),
  }).describe("Profile for connecting to a Salesforce source.").optional(),
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
        "Message to represent the option where Datastream will enforce encryption without authenticating server identity. Server certificates will be trusted by default.",
      ).optional(),
      encryptionAndServerValidation: z.object({
        caCertificate: z.string().describe(
          "Optional. Input only. PEM-encoded certificate of the CA that signed the source database server's certificate.",
        ).optional(),
        serverCertificateHostname: z.string().describe(
          "Optional. The hostname mentioned in the Subject or SAN extension of the server certificate. This field is used for bypassing the hostname validation while verifying server certificate. This is required for scenarios where the host name that datastream connects to is different from the certificate's subject. This specifically happens for private connectivity. It could also happen when the customer provides a public IP in connection profile but the same is not present in the server certificate.",
        ).optional(),
      }).describe(
        "Message to represent the option where Datastream will enforce encryption and authenticate server identity. ca_certificate must be set if user selects this option.",
      ).optional(),
      encryptionNotEnforced: z.object({}).describe(
        "Message to represent the option where encryption is not enforced. An empty message right now to allow future extensibility.",
      ).optional(),
    }).describe("SQL Server SSL configuration information.").optional(),
    username: z.string().describe(
      "Required. Username for the SQLServer connection.",
    ).optional(),
  }).describe("Profile for connecting to a SQLServer source.").optional(),
  staticServiceIpConnectivity: z.object({}).describe(
    "Static IP address connectivity. Used when the source database is configured to allow incoming connections from the Datastream public IP addresses for the region specified in the connection profile.",
  ).optional(),
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
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  bigqueryProfile: z.object({}).describe(
    "Profile for connecting to a BigQuery destination.",
  ).optional(),
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
  }).describe("Forward SSH Tunnel connectivity.").optional(),
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
    }).describe("MongoDB SSL configuration information.").optional(),
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
    }).describe("MySQL SSL configuration information.").optional(),
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
      }).describe("Oracle SSL configuration information.").optional(),
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
    }).describe(
      "Configuration for Oracle Automatic Storage Management (ASM) connection.",
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
    }).describe("Oracle SSL configuration information.").optional(),
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
        "Message represents the option where Datastream will enforce the encryption and authenticate the server identity as well as the client identity. ca_certificate, client_certificate and client_key must be set if user selects this option.",
      ).optional(),
      serverVerification: z.object({
        caCertificate: z.string().describe(
          "Required. Input only. PEM-encoded server root CA certificate.",
        ).optional(),
        serverCertificateHostname: z.string().describe(
          "Optional. The hostname mentioned in the Subject or SAN extension of the server certificate. If this field is not provided, the hostname in the server certificate is not validated.",
        ).optional(),
      }).describe(
        "Message represents the option where Datastream will enforce the encryption and authenticate the server identity. ca_certificate must be set if user selects this option.",
      ).optional(),
    }).describe("PostgreSQL SSL configuration information.").optional(),
    username: z.string().describe(
      "Required. Username for the PostgreSQL connection.",
    ).optional(),
  }).describe("Profile for connecting to a PostgreSQL source.").optional(),
  privateConnectivity: z.object({
    privateConnection: z.string().describe(
      "Required. A reference to a private connection resource. Format: `projects/{project}/locations/{location}/privateConnections/{name}`",
    ).optional(),
  }).describe("Private Connectivity").optional(),
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
    }).describe("OAuth2 Client Credentials.").optional(),
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
    }).describe("Username-password credentials.").optional(),
  }).describe("Profile for connecting to a Salesforce source.").optional(),
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
        "Message to represent the option where Datastream will enforce encryption without authenticating server identity. Server certificates will be trusted by default.",
      ).optional(),
      encryptionAndServerValidation: z.object({
        caCertificate: z.string().describe(
          "Optional. Input only. PEM-encoded certificate of the CA that signed the source database server's certificate.",
        ).optional(),
        serverCertificateHostname: z.string().describe(
          "Optional. The hostname mentioned in the Subject or SAN extension of the server certificate. This field is used for bypassing the hostname validation while verifying server certificate. This is required for scenarios where the host name that datastream connects to is different from the certificate's subject. This specifically happens for private connectivity. It could also happen when the customer provides a public IP in connection profile but the same is not present in the server certificate.",
        ).optional(),
      }).describe(
        "Message to represent the option where Datastream will enforce encryption and authenticate server identity. ca_certificate must be set if user selects this option.",
      ).optional(),
      encryptionNotEnforced: z.object({}).describe(
        "Message to represent the option where encryption is not enforced. An empty message right now to allow future extensibility.",
      ).optional(),
    }).describe("SQL Server SSL configuration information.").optional(),
    username: z.string().describe(
      "Required. Username for the SQLServer connection.",
    ).optional(),
  }).describe("Profile for connecting to a SQLServer source.").optional(),
  staticServiceIpConnectivity: z.object({}).describe(
    "Static IP address connectivity. Used when the source database is configured to allow incoming connections from the Datastream public IP addresses for the region specified in the connection profile.",
  ).optional(),
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

/** Swamp extension model for Google Cloud Datastream ConnectionProfiles. Registered at `@swamp/gcp/datastream/connectionprofiles`. */
export const model = {
  type: "@swamp/gcp/datastream/connectionprofiles",
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
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["bigqueryProfile"] !== undefined) {
          body["bigqueryProfile"] = g["bigqueryProfile"];
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
        if (g["salesforceProfile"] !== undefined) {
          body["salesforceProfile"] = g["salesforceProfile"];
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
        if (g["connectionProfileId"] !== undefined) {
          body["connectionProfileId"] = g["connectionProfileId"];
        }
        if (g["force"] !== undefined) body["force"] = g["force"];
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
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
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["bigqueryProfile"] !== undefined) {
          body["bigqueryProfile"] = g["bigqueryProfile"];
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
        if (g["salesforceProfile"] !== undefined) {
          body["salesforceProfile"] = g["salesforceProfile"];
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
      description: "Sync connectionProfiles state from GCP",
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
        spannerDatabase: z.any().optional(),
        sqlServerRdbms: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        if (args["spannerDatabase"] !== undefined) {
          body["spannerDatabase"] = args["spannerDatabase"];
        }
        if (args["sqlServerRdbms"] !== undefined) {
          body["sqlServerRdbms"] = args["sqlServerRdbms"];
        }
        const result = await createResource(
          BASE_URL,
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
        );
        return { result };
      },
    },
  },
};
