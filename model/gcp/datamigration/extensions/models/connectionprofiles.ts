// Auto-generated extension model for @swamp/gcp/datamigration/connectionprofiles
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Database Migration ConnectionProfiles.
 *
 * A connection profile definition.
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

const BASE_URL = "https://datamigration.googleapis.com/";

const GET_CONFIG = {
  "id": "datamigration.projects.locations.connectionProfiles.get",
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
  "id": "datamigration.projects.locations.connectionProfiles.create",
  "path": "v1/{+parent}/connectionProfiles",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "connectionProfileId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "skipValidation": {
      "location": "query",
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "datamigration.projects.locations.connectionProfiles.patch",
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
    "skipValidation": {
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
  "id": "datamigration.projects.locations.connectionProfiles.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
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
  },
} as const;

const LIST_CONFIG = {
  "id": "datamigration.projects.locations.connectionProfiles.list",
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
  alloydb: z.object({
    clusterId: z.string().describe(
      "Required. The AlloyDB cluster ID that this connection profile is associated with.",
    ).optional(),
    settings: z.object({
      databaseVersion: z.enum([
        "DATABASE_VERSION_UNSPECIFIED",
        "POSTGRES_14",
        "POSTGRES_15",
        "POSTGRES_16",
        "POSTGRES_17",
        "POSTGRES_18",
      ]).describe(
        "Optional. The database engine major version. This is an optional field. If a database version is not supplied at cluster creation time, then a default database version will be used.",
      ).optional(),
      encryptionConfig: z.object({
        kmsKeyName: z.string().describe(
          "The fully-qualified resource name of the KMS key. Each Cloud KMS key is regionalized and has the following format: projects/[PROJECT]/locations/[REGION]/keyRings/[RING]/cryptoKeys/[KEY_NAME]",
        ).optional(),
      }).describe(
        "EncryptionConfig describes the encryption config of a cluster that is encrypted with a CMEK (customer-managed encryption key).",
      ).optional(),
      initialUser: z.object({
        password: z.string().describe("The initial password for the user.")
          .optional(),
        passwordSet: z.boolean().describe(
          "Output only. Indicates if the initial_user.password field has been set.",
        ).optional(),
        user: z.string().describe("The database username.").optional(),
      }).describe(
        "The username/password for a database user. Used for specifying initial users at cluster creation time.",
      ).optional(),
      labels: z.record(z.string(), z.string()).describe(
        "Labels for the AlloyDB cluster created by DMS. An object containing a list of 'key', 'value' pairs.",
      ).optional(),
      primaryInstanceSettings: z.object({
        databaseFlags: z.record(z.string(), z.string()).describe(
          "Database flags to pass to AlloyDB when DMS is creating the AlloyDB cluster and instances. See the AlloyDB documentation for how these can be used.",
        ).optional(),
        id: z.string().describe(
          'Required. The ID of the AlloyDB primary instance. The ID must satisfy the regex expression "[a-z0-9-]+".',
        ).optional(),
        instanceNetworkConfig: z.object({
          authorizedExternalNetworks: z.array(z.unknown()).describe(
            "Optional. A list of external network authorized to access this instance.",
          ).optional(),
          enableOutboundPublicIp: z.boolean().describe(
            "Optional. Enabling an outbound public IP address to support a database server sending requests out into the internet.",
          ).optional(),
          enablePublicIp: z.boolean().describe(
            "Optional. Enabling public ip for the instance.",
          ).optional(),
        }).describe("Metadata related to instance level network configuration.")
          .optional(),
        labels: z.record(z.string(), z.string()).describe(
          "Labels for the AlloyDB primary instance created by DMS. An object containing a list of 'key', 'value' pairs.",
        ).optional(),
        machineConfig: z.object({
          cpuCount: z.number().int().describe(
            "The number of CPU's in the VM instance.",
          ).optional(),
          machineType: z.string().describe(
            'Optional. Machine type of the VM instance. E.g. "n2-highmem-4", "n2-highmem-8", "c4a-highmem-4-lssd". cpu_count must match the number of vCPUs in the machine type.',
          ).optional(),
        }).describe("MachineConfig describes the configuration of a machine.")
          .optional(),
        outboundPublicIpAddresses: z.array(z.string()).describe(
          "Output only. All outbound public IP addresses configured for the instance.",
        ).optional(),
        privateIp: z.string().describe(
          "Output only. The private IP address for the Instance. This is the connection endpoint for an end-user application.",
        ).optional(),
      }).describe("Settings for the cluster's primary instance").optional(),
      vpcNetwork: z.string().describe(
        'Required. The resource link for the VPC network in which cluster resources are created and from which they are accessible via Private IP. The network must belong to the same project as the cluster. It is specified in the form: "projects/{project_number}/global/networks/{network_id}". This is required to create a cluster.',
      ).optional(),
    }).describe("Settings for creating an AlloyDB cluster.").optional(),
  }).describe(
    "Specifies required connection parameters, and the parameters required to create an AlloyDB destination cluster.",
  ).optional(),
  cloudsql: z.object({
    additionalPublicIp: z.string().describe(
      "Output only. The Cloud SQL database instance's additional (outgoing) public IP. Used when the Cloud SQL database availability type is REGIONAL (i.e. multiple zones / highly available).",
    ).optional(),
    cloudSqlId: z.string().describe(
      "Output only. The Cloud SQL instance ID that this connection profile is associated with.",
    ).optional(),
    privateIp: z.string().describe(
      "Output only. The Cloud SQL database instance's private IP.",
    ).optional(),
    publicIp: z.string().describe(
      "Output only. The Cloud SQL database instance's public IP.",
    ).optional(),
    settings: z.object({
      activationPolicy: z.enum([
        "SQL_ACTIVATION_POLICY_UNSPECIFIED",
        "ALWAYS",
        "NEVER",
      ]).describe(
        "The activation policy specifies when the instance is activated; it is applicable only when the instance state is 'RUNNABLE'. Valid values: 'ALWAYS': The instance is on, and remains so even in the absence of connection requests. `NEVER`: The instance is off; it is not activated, even if a connection request arrives.",
      ).optional(),
      autoStorageIncrease: z.boolean().describe(
        "[default: ON] If you enable this setting, Cloud SQL checks your available storage every 30 seconds. If the available storage falls below a threshold size, Cloud SQL automatically adds additional storage capacity. If the available storage repeatedly falls below the threshold size, Cloud SQL continues to add storage until it reaches the maximum of 30 TB.",
      ).optional(),
      availabilityType: z.enum([
        "SQL_AVAILABILITY_TYPE_UNSPECIFIED",
        "ZONAL",
        "REGIONAL",
      ]).describe(
        "Optional. Availability type. Potential values: * `ZONAL`: The instance serves data from only one zone. Outages in that zone affect data availability. * `REGIONAL`: The instance can serve data from more than one zone in a region (it is highly available).",
      ).optional(),
      cmekKeyName: z.string().describe(
        "The KMS key name used for the csql instance.",
      ).optional(),
      collation: z.string().describe(
        "The Cloud SQL default instance level collation.",
      ).optional(),
      dataCacheConfig: z.object({
        dataCacheEnabled: z.boolean().describe(
          "Optional. Whether data cache is enabled for the instance.",
        ).optional(),
      }).describe(
        "Data cache is an optional feature available for Cloud SQL for MySQL Enterprise Plus edition only. For more information on data cache, see [Data cache overview](https://cloud.google.com/sql/help/mysql-data-cache) in Cloud SQL documentation.",
      ).optional(),
      dataDiskProvisionedIops: z.string().describe(
        "Optional. Provisioned number of I/O operations per second for the data disk. This field is only used for hyperdisk-balanced disk types.",
      ).optional(),
      dataDiskProvisionedThroughput: z.string().describe(
        "Optional. Provisioned throughput measured in MiB per second for the data disk. This field is only used for hyperdisk-balanced disk types.",
      ).optional(),
      dataDiskSizeGb: z.string().describe(
        "The storage capacity available to the database, in GB. The minimum (and default) size is 10GB.",
      ).optional(),
      dataDiskType: z.enum([
        "SQL_DATA_DISK_TYPE_UNSPECIFIED",
        "PD_SSD",
        "PD_HDD",
        "HYPERDISK_BALANCED",
      ]).describe(
        "The type of storage: `PD_SSD` (default) or `PD_HDD` or `HYPERDISK_BALANCED`.",
      ).optional(),
      databaseFlags: z.record(z.string(), z.string()).describe(
        'The database flags passed to the Cloud SQL instance at startup. An object containing a list of "key": value pairs. Example: { "name": "wrench", "mass": "1.3kg", "count": "3" }.',
      ).optional(),
      databaseVersion: z.enum([
        "SQL_DATABASE_VERSION_UNSPECIFIED",
        "MYSQL_5_6",
        "MYSQL_5_7",
        "MYSQL_8_0",
        "MYSQL_8_0_18",
        "MYSQL_8_0_26",
        "MYSQL_8_0_27",
        "MYSQL_8_0_28",
        "MYSQL_8_0_30",
        "MYSQL_8_0_31",
        "MYSQL_8_0_32",
        "MYSQL_8_0_33",
        "MYSQL_8_0_34",
        "MYSQL_8_0_35",
        "MYSQL_8_0_36",
        "MYSQL_8_0_37",
        "MYSQL_8_4",
        "POSTGRES_9_6",
        "POSTGRES_11",
        "POSTGRES_10",
        "POSTGRES_12",
        "POSTGRES_13",
        "POSTGRES_14",
        "POSTGRES_15",
        "POSTGRES_16",
      ]).describe(
        "The database engine type and version. Deprecated. Use database_version_name instead.",
      ).optional(),
      databaseVersionName: z.string().describe(
        "Optional. The database engine type and version name.",
      ).optional(),
      edition: z.enum(["EDITION_UNSPECIFIED", "ENTERPRISE", "ENTERPRISE_PLUS"])
        .describe("Optional. The edition of the given Cloud SQL instance.")
        .optional(),
      ipConfig: z.object({
        allocatedIpRange: z.string().describe(
          "Optional. The name of the allocated IP address range for the private IP Cloud SQL instance. This name refers to an already allocated IP range address. If set, the instance IP address will be created in the allocated range. Note that this IP address range can't be modified after the instance is created. If you change the VPC when configuring connectivity settings for the migration job, this field is not relevant.",
        ).optional(),
        authorizedNetworks: z.array(z.object({
          expireTime: z.unknown().describe(
            "The time when this access control entry expires in [RFC 3339](https://tools.ietf.org/html/rfc3339) format, for example: `2012-11-15T16:19:00.094Z`.",
          ).optional(),
          label: z.unknown().describe("A label to identify this entry.")
            .optional(),
          ttl: z.unknown().describe(
            "Input only. The time-to-leave of this access control entry.",
          ).optional(),
          value: z.unknown().describe(
            "The allowlisted value for the access control list.",
          ).optional(),
        })).describe(
          "The list of external networks that are allowed to connect to the instance using the IP. See https://en.wikipedia.org/wiki/CIDR_notation#CIDR_notation, also known as 'slash' notation (e.g. `192.168.100.0/24`).",
        ).optional(),
        enableIpv4: z.boolean().describe(
          "Whether the instance should be assigned an IPv4 address or not.",
        ).optional(),
        privateNetwork: z.string().describe(
          "The resource link for the VPC network from which the Cloud SQL instance is accessible for private IP. For example, `projects/myProject/global/networks/default`. This setting can be updated, but it cannot be removed after it is set.",
        ).optional(),
        requireSsl: z.boolean().describe(
          "Whether SSL connections over IP should be enforced or not.",
        ).optional(),
      }).describe("IP Management configuration.").optional(),
      rootPassword: z.string().describe("Input only. Initial root password.")
        .optional(),
      rootPasswordSet: z.boolean().describe(
        "Output only. Indicates If this connection profile root password is stored.",
      ).optional(),
      secondaryZone: z.string().describe(
        "Optional. The Google Cloud Platform zone where the failover Cloud SQL database instance is located. Used when the Cloud SQL database availability type is REGIONAL (i.e. multiple zones / highly available).",
      ).optional(),
      sourceId: z.string().describe(
        "The Database Migration Service source connection profile ID, in the format: `projects/my_project_name/locations/us-central1/connectionProfiles/connection_profile_ID`",
      ).optional(),
      storageAutoResizeLimit: z.string().describe(
        "The maximum size to which storage capacity can be automatically increased. The default value is 0, which specifies that there is no limit.",
      ).optional(),
      tier: z.string().describe(
        "The tier (or machine type) for this instance, for example: `db-n1-standard-1` (MySQL instances) or `db-custom-1-3840` (PostgreSQL instances). For more information, see [Cloud SQL Instance Settings](https://cloud.google.com/sql/docs/mysql/instance-settings).",
      ).optional(),
      userLabels: z.record(z.string(), z.string()).describe(
        'The resource labels for a Cloud SQL instance to use to annotate any related underlying resources such as Compute Engine VMs. An object containing a list of "key": "value" pairs. Example: `{ "name": "wrench", "mass": "18kg", "count": "3" }`.',
      ).optional(),
      zone: z.string().describe(
        "The Google Cloud Platform zone where your Cloud SQL database instance is located.",
      ).optional(),
    }).describe("Settings for creating a Cloud SQL database instance.")
      .optional(),
  }).describe(
    "Specifies required connection parameters, and, optionally, the parameters required to create a Cloud SQL destination database instance.",
  ).optional(),
  displayName: z.string().describe("The connection profile display name.")
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
  labels: z.record(z.string(), z.string()).describe(
    'The resource labels for connection profile to use to annotate any related underlying resources such as Compute Engine VMs. An object containing a list of "key": "value" pairs. Example: `{ "name": "wrench", "mass": "1.3kg", "count": "3" }`.',
  ).optional(),
  mysql: z.object({
    cloudSqlId: z.string().describe(
      "If the source is a Cloud SQL database, use this field to provide the Cloud SQL instance ID of the source.",
    ).optional(),
    host: z.string().describe(
      "Required. The IP or hostname of the source MySQL database.",
    ).optional(),
    password: z.string().describe(
      "Required. Input only. The password for the user that Database Migration Service will be using to connect to the database. This field is not returned on request, and the value is encrypted when stored in Database Migration Service.",
    ).optional(),
    passwordSet: z.boolean().describe(
      "Output only. Indicates If this connection profile password is stored.",
    ).optional(),
    port: z.number().int().describe(
      "Required. The network port of the source MySQL database.",
    ).optional(),
    ssl: z.object({
      caCertificate: z.string().describe(
        "Required. Input only. The x509 PEM-encoded certificate of the CA that signed the source database server's certificate. The replica will use this certificate to verify it's connecting to the right host.",
      ).optional(),
      clientCertificate: z.string().describe(
        "Input only. The x509 PEM-encoded certificate that will be used by the replica to authenticate against the source database server.If this field is used then the 'client_key' field is mandatory.",
      ).optional(),
      clientKey: z.string().describe(
        "Input only. The unencrypted PKCS#1 or PKCS#8 PEM-encoded private key associated with the Client Certificate. If this field is used then the 'client_certificate' field is mandatory.",
      ).optional(),
      sslFlags: z.record(z.string(), z.string()).describe(
        'Optional. SSL flags used for establishing SSL connection to the source database. Only source specific flags are supported. An object containing a list of "key": "value" pairs. Example: { "server_certificate_hostname": "server.com"}.',
      ).optional(),
      type: z.enum([
        "SSL_TYPE_UNSPECIFIED",
        "SERVER_ONLY",
        "SERVER_CLIENT",
        "REQUIRED",
        "NONE",
      ]).describe(
        "Optional. The ssl config type according to 'client_key', 'client_certificate' and 'ca_certificate'.",
      ).optional(),
    }).describe("SSL configuration information.").optional(),
    username: z.string().describe(
      "Required. The username that Database Migration Service will use to connect to the database. The value is encrypted when stored in Database Migration Service.",
    ).optional(),
  }).describe(
    "Specifies connection parameters required specifically for MySQL databases.",
  ).optional(),
  name: z.string().describe(
    "The name of this connection profile resource in the form of projects/{project}/locations/{location}/connectionProfiles/{connectionProfile}.",
  ).optional(),
  oracle: z.object({
    databaseService: z.string().describe(
      "Required. Database service for the Oracle connection.",
    ).optional(),
    forwardSshConnectivity: z.object({
      hostname: z.string().describe("Required. Hostname for the SSH tunnel.")
        .optional(),
      password: z.string().describe("Input only. SSH password.").optional(),
      port: z.number().int().describe(
        "Port for the SSH tunnel, default value is 22.",
      ).optional(),
      privateKey: z.string().describe("Input only. SSH private key.")
        .optional(),
      username: z.string().describe("Required. Username for the SSH tunnel.")
        .optional(),
    }).describe("Forward SSH Tunnel connectivity.").optional(),
    host: z.string().describe(
      "Required. The IP or hostname of the source Oracle database.",
    ).optional(),
    oracleAsmConfig: z.object({
      asmService: z.string().describe(
        "Required. ASM service name for the Oracle ASM connection.",
      ).optional(),
      hostname: z.string().describe(
        "Required. Hostname for the Oracle ASM connection.",
      ).optional(),
      password: z.string().describe(
        "Required. Input only. Password for the Oracle ASM connection.",
      ).optional(),
      passwordSet: z.boolean().describe(
        "Output only. Indicates whether a new password is included in the request.",
      ).optional(),
      port: z.number().int().describe(
        "Required. Port for the Oracle ASM connection.",
      ).optional(),
      ssl: z.object({
        caCertificate: z.string().describe(
          "Required. Input only. The x509 PEM-encoded certificate of the CA that signed the source database server's certificate. The replica will use this certificate to verify it's connecting to the right host.",
        ).optional(),
        clientCertificate: z.string().describe(
          "Input only. The x509 PEM-encoded certificate that will be used by the replica to authenticate against the source database server.If this field is used then the 'client_key' field is mandatory.",
        ).optional(),
        clientKey: z.string().describe(
          "Input only. The unencrypted PKCS#1 or PKCS#8 PEM-encoded private key associated with the Client Certificate. If this field is used then the 'client_certificate' field is mandatory.",
        ).optional(),
        sslFlags: z.record(z.string(), z.string()).describe(
          'Optional. SSL flags used for establishing SSL connection to the source database. Only source specific flags are supported. An object containing a list of "key": "value" pairs. Example: { "server_certificate_hostname": "server.com"}.',
        ).optional(),
        type: z.enum([
          "SSL_TYPE_UNSPECIFIED",
          "SERVER_ONLY",
          "SERVER_CLIENT",
          "REQUIRED",
          "NONE",
        ]).describe(
          "Optional. The ssl config type according to 'client_key', 'client_certificate' and 'ca_certificate'.",
        ).optional(),
      }).describe("SSL configuration information.").optional(),
      username: z.string().describe(
        "Required. Username for the Oracle ASM connection.",
      ).optional(),
    }).describe(
      "Configuration for Oracle Automatic Storage Management (ASM) connection.",
    ).optional(),
    password: z.string().describe(
      "Required. Input only. The password for the user that Database Migration Service will be using to connect to the database. This field is not returned on request, and the value is encrypted when stored in Database Migration Service.",
    ).optional(),
    passwordSet: z.boolean().describe(
      "Output only. Indicates whether a new password is included in the request.",
    ).optional(),
    port: z.number().int().describe(
      "Required. The network port of the source Oracle database.",
    ).optional(),
    privateConnectivity: z.object({
      privateConnection: z.string().describe(
        "Required. The resource name (URI) of the private connection.",
      ).optional(),
    }).describe("Private Connectivity.").optional(),
    ssl: z.object({
      caCertificate: z.string().describe(
        "Required. Input only. The x509 PEM-encoded certificate of the CA that signed the source database server's certificate. The replica will use this certificate to verify it's connecting to the right host.",
      ).optional(),
      clientCertificate: z.string().describe(
        "Input only. The x509 PEM-encoded certificate that will be used by the replica to authenticate against the source database server.If this field is used then the 'client_key' field is mandatory.",
      ).optional(),
      clientKey: z.string().describe(
        "Input only. The unencrypted PKCS#1 or PKCS#8 PEM-encoded private key associated with the Client Certificate. If this field is used then the 'client_certificate' field is mandatory.",
      ).optional(),
      sslFlags: z.record(z.string(), z.string()).describe(
        'Optional. SSL flags used for establishing SSL connection to the source database. Only source specific flags are supported. An object containing a list of "key": "value" pairs. Example: { "server_certificate_hostname": "server.com"}.',
      ).optional(),
      type: z.enum([
        "SSL_TYPE_UNSPECIFIED",
        "SERVER_ONLY",
        "SERVER_CLIENT",
        "REQUIRED",
        "NONE",
      ]).describe(
        "Optional. The ssl config type according to 'client_key', 'client_certificate' and 'ca_certificate'.",
      ).optional(),
    }).describe("SSL configuration information.").optional(),
    staticServiceIpConnectivity: z.object({}).describe(
      "Static IP address connectivity configured on service project.",
    ).optional(),
    username: z.string().describe(
      "Required. The username that Database Migration Service will use to connect to the database. The value is encrypted when stored in Database Migration Service.",
    ).optional(),
  }).describe(
    "Specifies connection parameters required specifically for Oracle databases.",
  ).optional(),
  postgresql: z.object({
    alloydbClusterId: z.string().describe(
      "Optional. If the destination is an AlloyDB database, use this field to provide the AlloyDB cluster ID.",
    ).optional(),
    cloudSqlId: z.string().describe(
      "If the source is a Cloud SQL database, use this field to provide the Cloud SQL instance ID of the source.",
    ).optional(),
    database: z.string().describe(
      "Optional. The name of the specific database within the host.",
    ).optional(),
    enableIamAuthentication: z.boolean().describe(
      "Optional. If true, Database Migration Service will use IAM database authentication to connect to the database.",
    ).optional(),
    forwardSshConnectivity: z.object({
      hostname: z.string().describe("Required. Hostname for the SSH tunnel.")
        .optional(),
      password: z.string().describe("Input only. SSH password.").optional(),
      port: z.number().int().describe(
        "Port for the SSH tunnel, default value is 22.",
      ).optional(),
      privateKey: z.string().describe("Input only. SSH private key.")
        .optional(),
      username: z.string().describe("Required. Username for the SSH tunnel.")
        .optional(),
    }).describe("Forward SSH Tunnel connectivity.").optional(),
    host: z.string().describe(
      "Required. The IP or hostname of the source PostgreSQL database.",
    ).optional(),
    networkArchitecture: z.enum([
      "NETWORK_ARCHITECTURE_UNSPECIFIED",
      "NETWORK_ARCHITECTURE_OLD_CSQL_PRODUCER",
      "NETWORK_ARCHITECTURE_NEW_CSQL_PRODUCER",
    ]).describe(
      "Output only. If the source is a Cloud SQL database, this field indicates the network architecture it's associated with.",
    ).optional(),
    password: z.string().describe(
      "Required. Input only. The password for the user that Database Migration Service will be using to connect to the database. This field is not returned on request, and the value is encrypted when stored in Database Migration Service.",
    ).optional(),
    passwordSet: z.boolean().describe(
      "Output only. Indicates If this connection profile password is stored.",
    ).optional(),
    port: z.number().int().describe(
      "Required. The network port of the source PostgreSQL database.",
    ).optional(),
    privateConnectivity: z.object({
      privateConnection: z.string().describe(
        "Required. The resource name (URI) of the private connection.",
      ).optional(),
    }).describe("Private Connectivity.").optional(),
    privateServiceConnectConnectivity: z.object({
      serviceAttachment: z.string().describe(
        "Required. A service attachment that exposes a database, and has the following format: projects/{project}/regions/{region}/serviceAttachments/{service_attachment_name}",
      ).optional(),
    }).describe(
      "[Private Service Connect connectivity](https://cloud.google.com/vpc/docs/private-service-connect#service-attachments)",
    ).optional(),
    ssl: z.object({
      caCertificate: z.string().describe(
        "Required. Input only. The x509 PEM-encoded certificate of the CA that signed the source database server's certificate. The replica will use this certificate to verify it's connecting to the right host.",
      ).optional(),
      clientCertificate: z.string().describe(
        "Input only. The x509 PEM-encoded certificate that will be used by the replica to authenticate against the source database server.If this field is used then the 'client_key' field is mandatory.",
      ).optional(),
      clientKey: z.string().describe(
        "Input only. The unencrypted PKCS#1 or PKCS#8 PEM-encoded private key associated with the Client Certificate. If this field is used then the 'client_certificate' field is mandatory.",
      ).optional(),
      sslFlags: z.record(z.string(), z.string()).describe(
        'Optional. SSL flags used for establishing SSL connection to the source database. Only source specific flags are supported. An object containing a list of "key": "value" pairs. Example: { "server_certificate_hostname": "server.com"}.',
      ).optional(),
      type: z.enum([
        "SSL_TYPE_UNSPECIFIED",
        "SERVER_ONLY",
        "SERVER_CLIENT",
        "REQUIRED",
        "NONE",
      ]).describe(
        "Optional. The ssl config type according to 'client_key', 'client_certificate' and 'ca_certificate'.",
      ).optional(),
    }).describe("SSL configuration information.").optional(),
    staticIpConnectivity: z.object({}).describe(
      "The source database will allow incoming connections from the public IP of the destination database. You can retrieve the public IP of the Cloud SQL instance from the Cloud SQL console or using Cloud SQL APIs. No additional configuration is required.",
    ).optional(),
    username: z.string().describe(
      "Required. The username that Database Migration Service will use to connect to the database. The value is encrypted when stored in Database Migration Service.",
    ).optional(),
  }).describe(
    "Specifies connection parameters required specifically for PostgreSQL databases.",
  ).optional(),
  provider: z.enum([
    "DATABASE_PROVIDER_UNSPECIFIED",
    "CLOUDSQL",
    "RDS",
    "AURORA",
    "ALLOYDB",
    "AZURE_DATABASE",
  ]).describe("The database provider.").optional(),
  role: z.enum(["ROLE_UNSPECIFIED", "SOURCE", "DESTINATION"]).describe(
    "Optional. The connection profile role.",
  ).optional(),
  sqlserver: z.object({
    backups: z.object({
      gcsBucket: z.string().describe(
        "Required. The Cloud Storage bucket that stores backups for all replicated databases.",
      ).optional(),
      gcsPrefix: z.string().describe(
        "Optional. Cloud Storage path inside the bucket that stores backups.",
      ).optional(),
    }).describe(
      "Specifies the backup details in Cloud Storage for homogeneous migration to Cloud SQL for SQL Server.",
    ).optional(),
    cloudSqlId: z.string().describe(
      "If the source is a Cloud SQL database, use this field to provide the Cloud SQL instance ID of the source.",
    ).optional(),
    cloudSqlProjectId: z.string().describe(
      "Optional. The project id of the Cloud SQL instance. If not provided, the project id of the connection profile will be used.",
    ).optional(),
    database: z.string().describe(
      "Required. The name of the specific database within the host.",
    ).optional(),
    dbmPort: z.number().int().describe(
      "Optional. The Database Mirroring (DBM) port of the source SQL Server instance.",
    ).optional(),
    forwardSshConnectivity: z.object({
      hostname: z.string().describe("Required. Hostname for the SSH tunnel.")
        .optional(),
      password: z.string().describe("Input only. SSH password.").optional(),
      port: z.number().int().describe(
        "Port for the SSH tunnel, default value is 22.",
      ).optional(),
      privateKey: z.string().describe("Input only. SSH private key.")
        .optional(),
      username: z.string().describe("Required. Username for the SSH tunnel.")
        .optional(),
    }).describe("Forward SSH Tunnel connectivity.").optional(),
    host: z.string().describe(
      "Required. The IP or hostname of the source SQL Server database.",
    ).optional(),
    password: z.string().describe(
      "Required. Input only. The password for the user that Database Migration Service will be using to connect to the database. This field is not returned on request, and the value is encrypted when stored in Database Migration Service.",
    ).optional(),
    passwordSet: z.boolean().describe(
      "Output only. Indicates whether a new password is included in the request.",
    ).optional(),
    port: z.number().int().describe(
      "Required. The network port of the source SQL Server database.",
    ).optional(),
    privateConnectivity: z.object({
      privateConnection: z.string().describe(
        "Required. The resource name (URI) of the private connection.",
      ).optional(),
    }).describe("Private Connectivity.").optional(),
    privateServiceConnectConnectivity: z.object({
      serviceAttachment: z.string().describe(
        "Required. A service attachment that exposes a database, and has the following format: projects/{project}/regions/{region}/serviceAttachments/{service_attachment_name}",
      ).optional(),
    }).describe(
      "[Private Service Connect connectivity](https://cloud.google.com/vpc/docs/private-service-connect#service-attachments)",
    ).optional(),
    ssl: z.object({
      caCertificate: z.string().describe(
        "Required. Input only. The x509 PEM-encoded certificate of the CA that signed the source database server's certificate. The replica will use this certificate to verify it's connecting to the right host.",
      ).optional(),
      clientCertificate: z.string().describe(
        "Input only. The x509 PEM-encoded certificate that will be used by the replica to authenticate against the source database server.If this field is used then the 'client_key' field is mandatory.",
      ).optional(),
      clientKey: z.string().describe(
        "Input only. The unencrypted PKCS#1 or PKCS#8 PEM-encoded private key associated with the Client Certificate. If this field is used then the 'client_certificate' field is mandatory.",
      ).optional(),
      sslFlags: z.record(z.string(), z.string()).describe(
        'Optional. SSL flags used for establishing SSL connection to the source database. Only source specific flags are supported. An object containing a list of "key": "value" pairs. Example: { "server_certificate_hostname": "server.com"}.',
      ).optional(),
      type: z.enum([
        "SSL_TYPE_UNSPECIFIED",
        "SERVER_ONLY",
        "SERVER_CLIENT",
        "REQUIRED",
        "NONE",
      ]).describe(
        "Optional. The ssl config type according to 'client_key', 'client_certificate' and 'ca_certificate'.",
      ).optional(),
    }).describe("SSL configuration information.").optional(),
    staticIpConnectivity: z.object({}).describe(
      "The source database will allow incoming connections from the public IP of the destination database. You can retrieve the public IP of the Cloud SQL instance from the Cloud SQL console or using Cloud SQL APIs. No additional configuration is required.",
    ).optional(),
    username: z.string().describe(
      "Required. The username that Database Migration Service will use to connect to the database. The value is encrypted when stored in Database Migration Service.",
    ).optional(),
  }).describe(
    "Specifies connection parameters required specifically for SQL Server databases.",
  ).optional(),
  state: z.enum([
    "STATE_UNSPECIFIED",
    "DRAFT",
    "CREATING",
    "READY",
    "UPDATING",
    "DELETING",
    "DELETED",
    "FAILED",
  ]).describe(
    "The current connection profile state (e.g. DRAFT, READY, or FAILED).",
  ).optional(),
  connectionProfileId: z.string().describe(
    "Required. The connection profile identifier.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. A unique ID used to identify the request. If the server receives two requests with the same ID, then the second request is ignored. It is recommended to always set this value to a UUID. The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters.",
  ).optional(),
  skipValidation: z.string().describe(
    "Optional. Create the connection profile without validating it. The default is false. Only supported for Oracle connection profiles.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  alloydb: z.object({
    clusterId: z.string(),
    settings: z.object({
      databaseVersion: z.string(),
      encryptionConfig: z.object({
        kmsKeyName: z.string(),
      }),
      initialUser: z.object({
        password: z.string(),
        passwordSet: z.boolean(),
        user: z.string(),
      }),
      labels: z.record(z.string(), z.unknown()),
      primaryInstanceSettings: z.object({
        databaseFlags: z.record(z.string(), z.unknown()),
        id: z.string(),
        instanceNetworkConfig: z.object({
          authorizedExternalNetworks: z.array(z.unknown()),
          enableOutboundPublicIp: z.boolean(),
          enablePublicIp: z.boolean(),
        }),
        labels: z.record(z.string(), z.unknown()),
        machineConfig: z.object({
          cpuCount: z.number(),
          machineType: z.string(),
        }),
        outboundPublicIpAddresses: z.array(z.string()),
        privateIp: z.string(),
      }),
      vpcNetwork: z.string(),
    }),
  }).optional(),
  cloudsql: z.object({
    additionalPublicIp: z.string(),
    cloudSqlId: z.string(),
    privateIp: z.string(),
    publicIp: z.string(),
    settings: z.object({
      activationPolicy: z.string(),
      autoStorageIncrease: z.boolean(),
      availabilityType: z.string(),
      cmekKeyName: z.string(),
      collation: z.string(),
      dataCacheConfig: z.object({
        dataCacheEnabled: z.boolean(),
      }),
      dataDiskProvisionedIops: z.string(),
      dataDiskProvisionedThroughput: z.string(),
      dataDiskSizeGb: z.string(),
      dataDiskType: z.string(),
      databaseFlags: z.record(z.string(), z.unknown()),
      databaseVersion: z.string(),
      databaseVersionName: z.string(),
      edition: z.string(),
      ipConfig: z.object({
        allocatedIpRange: z.string(),
        authorizedNetworks: z.array(z.object({
          expireTime: z.unknown(),
          label: z.unknown(),
          ttl: z.unknown(),
          value: z.unknown(),
        })),
        enableIpv4: z.boolean(),
        privateNetwork: z.string(),
        requireSsl: z.boolean(),
      }),
      rootPassword: z.string(),
      rootPasswordSet: z.boolean(),
      secondaryZone: z.string(),
      sourceId: z.string(),
      storageAutoResizeLimit: z.string(),
      tier: z.string(),
      userLabels: z.record(z.string(), z.unknown()),
      zone: z.string(),
    }),
  }).optional(),
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  error: z.object({
    code: z.number(),
    details: z.array(z.record(z.string(), z.unknown())),
    message: z.string(),
  }).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  mysql: z.object({
    cloudSqlId: z.string(),
    host: z.string(),
    password: z.string(),
    passwordSet: z.boolean(),
    port: z.number(),
    ssl: z.object({
      caCertificate: z.string(),
      clientCertificate: z.string(),
      clientKey: z.string(),
      sslFlags: z.record(z.string(), z.unknown()),
      type: z.string(),
    }),
    username: z.string(),
  }).optional(),
  name: z.string(),
  oracle: z.object({
    databaseService: z.string(),
    forwardSshConnectivity: z.object({
      hostname: z.string(),
      password: z.string(),
      port: z.number(),
      privateKey: z.string(),
      username: z.string(),
    }),
    host: z.string(),
    oracleAsmConfig: z.object({
      asmService: z.string(),
      hostname: z.string(),
      password: z.string(),
      passwordSet: z.boolean(),
      port: z.number(),
      ssl: z.object({
        caCertificate: z.string(),
        clientCertificate: z.string(),
        clientKey: z.string(),
        sslFlags: z.record(z.string(), z.unknown()),
        type: z.string(),
      }),
      username: z.string(),
    }),
    password: z.string(),
    passwordSet: z.boolean(),
    port: z.number(),
    privateConnectivity: z.object({
      privateConnection: z.string(),
    }),
    ssl: z.object({
      caCertificate: z.string(),
      clientCertificate: z.string(),
      clientKey: z.string(),
      sslFlags: z.record(z.string(), z.unknown()),
      type: z.string(),
    }),
    staticServiceIpConnectivity: z.object({}),
    username: z.string(),
  }).optional(),
  postgresql: z.object({
    alloydbClusterId: z.string(),
    cloudSqlId: z.string(),
    database: z.string(),
    enableIamAuthentication: z.boolean(),
    forwardSshConnectivity: z.object({
      hostname: z.string(),
      password: z.string(),
      port: z.number(),
      privateKey: z.string(),
      username: z.string(),
    }),
    host: z.string(),
    networkArchitecture: z.string(),
    password: z.string(),
    passwordSet: z.boolean(),
    port: z.number(),
    privateConnectivity: z.object({
      privateConnection: z.string(),
    }),
    privateServiceConnectConnectivity: z.object({
      serviceAttachment: z.string(),
    }),
    ssl: z.object({
      caCertificate: z.string(),
      clientCertificate: z.string(),
      clientKey: z.string(),
      sslFlags: z.record(z.string(), z.unknown()),
      type: z.string(),
    }),
    staticIpConnectivity: z.object({}),
    username: z.string(),
  }).optional(),
  provider: z.string().optional(),
  role: z.string().optional(),
  satisfiesPzi: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  sqlserver: z.object({
    backups: z.object({
      gcsBucket: z.string(),
      gcsPrefix: z.string(),
    }),
    cloudSqlId: z.string(),
    cloudSqlProjectId: z.string(),
    database: z.string(),
    dbmPort: z.number(),
    forwardSshConnectivity: z.object({
      hostname: z.string(),
      password: z.string(),
      port: z.number(),
      privateKey: z.string(),
      username: z.string(),
    }),
    host: z.string(),
    password: z.string(),
    passwordSet: z.boolean(),
    port: z.number(),
    privateConnectivity: z.object({
      privateConnection: z.string(),
    }),
    privateServiceConnectConnectivity: z.object({
      serviceAttachment: z.string(),
    }),
    ssl: z.object({
      caCertificate: z.string(),
      clientCertificate: z.string(),
      clientKey: z.string(),
      sslFlags: z.record(z.string(), z.unknown()),
      type: z.string(),
    }),
    staticIpConnectivity: z.object({}),
    username: z.string(),
  }).optional(),
  state: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  alloydb: z.object({
    clusterId: z.string().describe(
      "Required. The AlloyDB cluster ID that this connection profile is associated with.",
    ).optional(),
    settings: z.object({
      databaseVersion: z.enum([
        "DATABASE_VERSION_UNSPECIFIED",
        "POSTGRES_14",
        "POSTGRES_15",
        "POSTGRES_16",
        "POSTGRES_17",
        "POSTGRES_18",
      ]).describe(
        "Optional. The database engine major version. This is an optional field. If a database version is not supplied at cluster creation time, then a default database version will be used.",
      ).optional(),
      encryptionConfig: z.object({
        kmsKeyName: z.string().describe(
          "The fully-qualified resource name of the KMS key. Each Cloud KMS key is regionalized and has the following format: projects/[PROJECT]/locations/[REGION]/keyRings/[RING]/cryptoKeys/[KEY_NAME]",
        ).optional(),
      }).describe(
        "EncryptionConfig describes the encryption config of a cluster that is encrypted with a CMEK (customer-managed encryption key).",
      ).optional(),
      initialUser: z.object({
        password: z.string().describe("The initial password for the user.")
          .optional(),
        passwordSet: z.boolean().describe(
          "Output only. Indicates if the initial_user.password field has been set.",
        ).optional(),
        user: z.string().describe("The database username.").optional(),
      }).describe(
        "The username/password for a database user. Used for specifying initial users at cluster creation time.",
      ).optional(),
      labels: z.record(z.string(), z.string()).describe(
        "Labels for the AlloyDB cluster created by DMS. An object containing a list of 'key', 'value' pairs.",
      ).optional(),
      primaryInstanceSettings: z.object({
        databaseFlags: z.record(z.string(), z.string()).describe(
          "Database flags to pass to AlloyDB when DMS is creating the AlloyDB cluster and instances. See the AlloyDB documentation for how these can be used.",
        ).optional(),
        id: z.string().describe(
          'Required. The ID of the AlloyDB primary instance. The ID must satisfy the regex expression "[a-z0-9-]+".',
        ).optional(),
        instanceNetworkConfig: z.object({
          authorizedExternalNetworks: z.array(z.unknown()).describe(
            "Optional. A list of external network authorized to access this instance.",
          ).optional(),
          enableOutboundPublicIp: z.boolean().describe(
            "Optional. Enabling an outbound public IP address to support a database server sending requests out into the internet.",
          ).optional(),
          enablePublicIp: z.boolean().describe(
            "Optional. Enabling public ip for the instance.",
          ).optional(),
        }).describe("Metadata related to instance level network configuration.")
          .optional(),
        labels: z.record(z.string(), z.string()).describe(
          "Labels for the AlloyDB primary instance created by DMS. An object containing a list of 'key', 'value' pairs.",
        ).optional(),
        machineConfig: z.object({
          cpuCount: z.number().int().describe(
            "The number of CPU's in the VM instance.",
          ).optional(),
          machineType: z.string().describe(
            'Optional. Machine type of the VM instance. E.g. "n2-highmem-4", "n2-highmem-8", "c4a-highmem-4-lssd". cpu_count must match the number of vCPUs in the machine type.',
          ).optional(),
        }).describe("MachineConfig describes the configuration of a machine.")
          .optional(),
        outboundPublicIpAddresses: z.array(z.string()).describe(
          "Output only. All outbound public IP addresses configured for the instance.",
        ).optional(),
        privateIp: z.string().describe(
          "Output only. The private IP address for the Instance. This is the connection endpoint for an end-user application.",
        ).optional(),
      }).describe("Settings for the cluster's primary instance").optional(),
      vpcNetwork: z.string().describe(
        'Required. The resource link for the VPC network in which cluster resources are created and from which they are accessible via Private IP. The network must belong to the same project as the cluster. It is specified in the form: "projects/{project_number}/global/networks/{network_id}". This is required to create a cluster.',
      ).optional(),
    }).describe("Settings for creating an AlloyDB cluster.").optional(),
  }).describe(
    "Specifies required connection parameters, and the parameters required to create an AlloyDB destination cluster.",
  ).optional(),
  cloudsql: z.object({
    additionalPublicIp: z.string().describe(
      "Output only. The Cloud SQL database instance's additional (outgoing) public IP. Used when the Cloud SQL database availability type is REGIONAL (i.e. multiple zones / highly available).",
    ).optional(),
    cloudSqlId: z.string().describe(
      "Output only. The Cloud SQL instance ID that this connection profile is associated with.",
    ).optional(),
    privateIp: z.string().describe(
      "Output only. The Cloud SQL database instance's private IP.",
    ).optional(),
    publicIp: z.string().describe(
      "Output only. The Cloud SQL database instance's public IP.",
    ).optional(),
    settings: z.object({
      activationPolicy: z.enum([
        "SQL_ACTIVATION_POLICY_UNSPECIFIED",
        "ALWAYS",
        "NEVER",
      ]).describe(
        "The activation policy specifies when the instance is activated; it is applicable only when the instance state is 'RUNNABLE'. Valid values: 'ALWAYS': The instance is on, and remains so even in the absence of connection requests. `NEVER`: The instance is off; it is not activated, even if a connection request arrives.",
      ).optional(),
      autoStorageIncrease: z.boolean().describe(
        "[default: ON] If you enable this setting, Cloud SQL checks your available storage every 30 seconds. If the available storage falls below a threshold size, Cloud SQL automatically adds additional storage capacity. If the available storage repeatedly falls below the threshold size, Cloud SQL continues to add storage until it reaches the maximum of 30 TB.",
      ).optional(),
      availabilityType: z.enum([
        "SQL_AVAILABILITY_TYPE_UNSPECIFIED",
        "ZONAL",
        "REGIONAL",
      ]).describe(
        "Optional. Availability type. Potential values: * `ZONAL`: The instance serves data from only one zone. Outages in that zone affect data availability. * `REGIONAL`: The instance can serve data from more than one zone in a region (it is highly available).",
      ).optional(),
      cmekKeyName: z.string().describe(
        "The KMS key name used for the csql instance.",
      ).optional(),
      collation: z.string().describe(
        "The Cloud SQL default instance level collation.",
      ).optional(),
      dataCacheConfig: z.object({
        dataCacheEnabled: z.boolean().describe(
          "Optional. Whether data cache is enabled for the instance.",
        ).optional(),
      }).describe(
        "Data cache is an optional feature available for Cloud SQL for MySQL Enterprise Plus edition only. For more information on data cache, see [Data cache overview](https://cloud.google.com/sql/help/mysql-data-cache) in Cloud SQL documentation.",
      ).optional(),
      dataDiskProvisionedIops: z.string().describe(
        "Optional. Provisioned number of I/O operations per second for the data disk. This field is only used for hyperdisk-balanced disk types.",
      ).optional(),
      dataDiskProvisionedThroughput: z.string().describe(
        "Optional. Provisioned throughput measured in MiB per second for the data disk. This field is only used for hyperdisk-balanced disk types.",
      ).optional(),
      dataDiskSizeGb: z.string().describe(
        "The storage capacity available to the database, in GB. The minimum (and default) size is 10GB.",
      ).optional(),
      dataDiskType: z.enum([
        "SQL_DATA_DISK_TYPE_UNSPECIFIED",
        "PD_SSD",
        "PD_HDD",
        "HYPERDISK_BALANCED",
      ]).describe(
        "The type of storage: `PD_SSD` (default) or `PD_HDD` or `HYPERDISK_BALANCED`.",
      ).optional(),
      databaseFlags: z.record(z.string(), z.string()).describe(
        'The database flags passed to the Cloud SQL instance at startup. An object containing a list of "key": value pairs. Example: { "name": "wrench", "mass": "1.3kg", "count": "3" }.',
      ).optional(),
      databaseVersion: z.enum([
        "SQL_DATABASE_VERSION_UNSPECIFIED",
        "MYSQL_5_6",
        "MYSQL_5_7",
        "MYSQL_8_0",
        "MYSQL_8_0_18",
        "MYSQL_8_0_26",
        "MYSQL_8_0_27",
        "MYSQL_8_0_28",
        "MYSQL_8_0_30",
        "MYSQL_8_0_31",
        "MYSQL_8_0_32",
        "MYSQL_8_0_33",
        "MYSQL_8_0_34",
        "MYSQL_8_0_35",
        "MYSQL_8_0_36",
        "MYSQL_8_0_37",
        "MYSQL_8_4",
        "POSTGRES_9_6",
        "POSTGRES_11",
        "POSTGRES_10",
        "POSTGRES_12",
        "POSTGRES_13",
        "POSTGRES_14",
        "POSTGRES_15",
        "POSTGRES_16",
      ]).describe(
        "The database engine type and version. Deprecated. Use database_version_name instead.",
      ).optional(),
      databaseVersionName: z.string().describe(
        "Optional. The database engine type and version name.",
      ).optional(),
      edition: z.enum(["EDITION_UNSPECIFIED", "ENTERPRISE", "ENTERPRISE_PLUS"])
        .describe("Optional. The edition of the given Cloud SQL instance.")
        .optional(),
      ipConfig: z.object({
        allocatedIpRange: z.string().describe(
          "Optional. The name of the allocated IP address range for the private IP Cloud SQL instance. This name refers to an already allocated IP range address. If set, the instance IP address will be created in the allocated range. Note that this IP address range can't be modified after the instance is created. If you change the VPC when configuring connectivity settings for the migration job, this field is not relevant.",
        ).optional(),
        authorizedNetworks: z.array(z.object({
          expireTime: z.unknown().describe(
            "The time when this access control entry expires in [RFC 3339](https://tools.ietf.org/html/rfc3339) format, for example: `2012-11-15T16:19:00.094Z`.",
          ).optional(),
          label: z.unknown().describe("A label to identify this entry.")
            .optional(),
          ttl: z.unknown().describe(
            "Input only. The time-to-leave of this access control entry.",
          ).optional(),
          value: z.unknown().describe(
            "The allowlisted value for the access control list.",
          ).optional(),
        })).describe(
          "The list of external networks that are allowed to connect to the instance using the IP. See https://en.wikipedia.org/wiki/CIDR_notation#CIDR_notation, also known as 'slash' notation (e.g. `192.168.100.0/24`).",
        ).optional(),
        enableIpv4: z.boolean().describe(
          "Whether the instance should be assigned an IPv4 address or not.",
        ).optional(),
        privateNetwork: z.string().describe(
          "The resource link for the VPC network from which the Cloud SQL instance is accessible for private IP. For example, `projects/myProject/global/networks/default`. This setting can be updated, but it cannot be removed after it is set.",
        ).optional(),
        requireSsl: z.boolean().describe(
          "Whether SSL connections over IP should be enforced or not.",
        ).optional(),
      }).describe("IP Management configuration.").optional(),
      rootPassword: z.string().describe("Input only. Initial root password.")
        .optional(),
      rootPasswordSet: z.boolean().describe(
        "Output only. Indicates If this connection profile root password is stored.",
      ).optional(),
      secondaryZone: z.string().describe(
        "Optional. The Google Cloud Platform zone where the failover Cloud SQL database instance is located. Used when the Cloud SQL database availability type is REGIONAL (i.e. multiple zones / highly available).",
      ).optional(),
      sourceId: z.string().describe(
        "The Database Migration Service source connection profile ID, in the format: `projects/my_project_name/locations/us-central1/connectionProfiles/connection_profile_ID`",
      ).optional(),
      storageAutoResizeLimit: z.string().describe(
        "The maximum size to which storage capacity can be automatically increased. The default value is 0, which specifies that there is no limit.",
      ).optional(),
      tier: z.string().describe(
        "The tier (or machine type) for this instance, for example: `db-n1-standard-1` (MySQL instances) or `db-custom-1-3840` (PostgreSQL instances). For more information, see [Cloud SQL Instance Settings](https://cloud.google.com/sql/docs/mysql/instance-settings).",
      ).optional(),
      userLabels: z.record(z.string(), z.string()).describe(
        'The resource labels for a Cloud SQL instance to use to annotate any related underlying resources such as Compute Engine VMs. An object containing a list of "key": "value" pairs. Example: `{ "name": "wrench", "mass": "18kg", "count": "3" }`.',
      ).optional(),
      zone: z.string().describe(
        "The Google Cloud Platform zone where your Cloud SQL database instance is located.",
      ).optional(),
    }).describe("Settings for creating a Cloud SQL database instance.")
      .optional(),
  }).describe(
    "Specifies required connection parameters, and, optionally, the parameters required to create a Cloud SQL destination database instance.",
  ).optional(),
  displayName: z.string().describe("The connection profile display name.")
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
  labels: z.record(z.string(), z.string()).describe(
    'The resource labels for connection profile to use to annotate any related underlying resources such as Compute Engine VMs. An object containing a list of "key": "value" pairs. Example: `{ "name": "wrench", "mass": "1.3kg", "count": "3" }`.',
  ).optional(),
  mysql: z.object({
    cloudSqlId: z.string().describe(
      "If the source is a Cloud SQL database, use this field to provide the Cloud SQL instance ID of the source.",
    ).optional(),
    host: z.string().describe(
      "Required. The IP or hostname of the source MySQL database.",
    ).optional(),
    password: z.string().describe(
      "Required. Input only. The password for the user that Database Migration Service will be using to connect to the database. This field is not returned on request, and the value is encrypted when stored in Database Migration Service.",
    ).optional(),
    passwordSet: z.boolean().describe(
      "Output only. Indicates If this connection profile password is stored.",
    ).optional(),
    port: z.number().int().describe(
      "Required. The network port of the source MySQL database.",
    ).optional(),
    ssl: z.object({
      caCertificate: z.string().describe(
        "Required. Input only. The x509 PEM-encoded certificate of the CA that signed the source database server's certificate. The replica will use this certificate to verify it's connecting to the right host.",
      ).optional(),
      clientCertificate: z.string().describe(
        "Input only. The x509 PEM-encoded certificate that will be used by the replica to authenticate against the source database server.If this field is used then the 'client_key' field is mandatory.",
      ).optional(),
      clientKey: z.string().describe(
        "Input only. The unencrypted PKCS#1 or PKCS#8 PEM-encoded private key associated with the Client Certificate. If this field is used then the 'client_certificate' field is mandatory.",
      ).optional(),
      sslFlags: z.record(z.string(), z.string()).describe(
        'Optional. SSL flags used for establishing SSL connection to the source database. Only source specific flags are supported. An object containing a list of "key": "value" pairs. Example: { "server_certificate_hostname": "server.com"}.',
      ).optional(),
      type: z.enum([
        "SSL_TYPE_UNSPECIFIED",
        "SERVER_ONLY",
        "SERVER_CLIENT",
        "REQUIRED",
        "NONE",
      ]).describe(
        "Optional. The ssl config type according to 'client_key', 'client_certificate' and 'ca_certificate'.",
      ).optional(),
    }).describe("SSL configuration information.").optional(),
    username: z.string().describe(
      "Required. The username that Database Migration Service will use to connect to the database. The value is encrypted when stored in Database Migration Service.",
    ).optional(),
  }).describe(
    "Specifies connection parameters required specifically for MySQL databases.",
  ).optional(),
  name: z.string().describe(
    "The name of this connection profile resource in the form of projects/{project}/locations/{location}/connectionProfiles/{connectionProfile}.",
  ).optional(),
  oracle: z.object({
    databaseService: z.string().describe(
      "Required. Database service for the Oracle connection.",
    ).optional(),
    forwardSshConnectivity: z.object({
      hostname: z.string().describe("Required. Hostname for the SSH tunnel.")
        .optional(),
      password: z.string().describe("Input only. SSH password.").optional(),
      port: z.number().int().describe(
        "Port for the SSH tunnel, default value is 22.",
      ).optional(),
      privateKey: z.string().describe("Input only. SSH private key.")
        .optional(),
      username: z.string().describe("Required. Username for the SSH tunnel.")
        .optional(),
    }).describe("Forward SSH Tunnel connectivity.").optional(),
    host: z.string().describe(
      "Required. The IP or hostname of the source Oracle database.",
    ).optional(),
    oracleAsmConfig: z.object({
      asmService: z.string().describe(
        "Required. ASM service name for the Oracle ASM connection.",
      ).optional(),
      hostname: z.string().describe(
        "Required. Hostname for the Oracle ASM connection.",
      ).optional(),
      password: z.string().describe(
        "Required. Input only. Password for the Oracle ASM connection.",
      ).optional(),
      passwordSet: z.boolean().describe(
        "Output only. Indicates whether a new password is included in the request.",
      ).optional(),
      port: z.number().int().describe(
        "Required. Port for the Oracle ASM connection.",
      ).optional(),
      ssl: z.object({
        caCertificate: z.string().describe(
          "Required. Input only. The x509 PEM-encoded certificate of the CA that signed the source database server's certificate. The replica will use this certificate to verify it's connecting to the right host.",
        ).optional(),
        clientCertificate: z.string().describe(
          "Input only. The x509 PEM-encoded certificate that will be used by the replica to authenticate against the source database server.If this field is used then the 'client_key' field is mandatory.",
        ).optional(),
        clientKey: z.string().describe(
          "Input only. The unencrypted PKCS#1 or PKCS#8 PEM-encoded private key associated with the Client Certificate. If this field is used then the 'client_certificate' field is mandatory.",
        ).optional(),
        sslFlags: z.record(z.string(), z.string()).describe(
          'Optional. SSL flags used for establishing SSL connection to the source database. Only source specific flags are supported. An object containing a list of "key": "value" pairs. Example: { "server_certificate_hostname": "server.com"}.',
        ).optional(),
        type: z.enum([
          "SSL_TYPE_UNSPECIFIED",
          "SERVER_ONLY",
          "SERVER_CLIENT",
          "REQUIRED",
          "NONE",
        ]).describe(
          "Optional. The ssl config type according to 'client_key', 'client_certificate' and 'ca_certificate'.",
        ).optional(),
      }).describe("SSL configuration information.").optional(),
      username: z.string().describe(
        "Required. Username for the Oracle ASM connection.",
      ).optional(),
    }).describe(
      "Configuration for Oracle Automatic Storage Management (ASM) connection.",
    ).optional(),
    password: z.string().describe(
      "Required. Input only. The password for the user that Database Migration Service will be using to connect to the database. This field is not returned on request, and the value is encrypted when stored in Database Migration Service.",
    ).optional(),
    passwordSet: z.boolean().describe(
      "Output only. Indicates whether a new password is included in the request.",
    ).optional(),
    port: z.number().int().describe(
      "Required. The network port of the source Oracle database.",
    ).optional(),
    privateConnectivity: z.object({
      privateConnection: z.string().describe(
        "Required. The resource name (URI) of the private connection.",
      ).optional(),
    }).describe("Private Connectivity.").optional(),
    ssl: z.object({
      caCertificate: z.string().describe(
        "Required. Input only. The x509 PEM-encoded certificate of the CA that signed the source database server's certificate. The replica will use this certificate to verify it's connecting to the right host.",
      ).optional(),
      clientCertificate: z.string().describe(
        "Input only. The x509 PEM-encoded certificate that will be used by the replica to authenticate against the source database server.If this field is used then the 'client_key' field is mandatory.",
      ).optional(),
      clientKey: z.string().describe(
        "Input only. The unencrypted PKCS#1 or PKCS#8 PEM-encoded private key associated with the Client Certificate. If this field is used then the 'client_certificate' field is mandatory.",
      ).optional(),
      sslFlags: z.record(z.string(), z.string()).describe(
        'Optional. SSL flags used for establishing SSL connection to the source database. Only source specific flags are supported. An object containing a list of "key": "value" pairs. Example: { "server_certificate_hostname": "server.com"}.',
      ).optional(),
      type: z.enum([
        "SSL_TYPE_UNSPECIFIED",
        "SERVER_ONLY",
        "SERVER_CLIENT",
        "REQUIRED",
        "NONE",
      ]).describe(
        "Optional. The ssl config type according to 'client_key', 'client_certificate' and 'ca_certificate'.",
      ).optional(),
    }).describe("SSL configuration information.").optional(),
    staticServiceIpConnectivity: z.object({}).describe(
      "Static IP address connectivity configured on service project.",
    ).optional(),
    username: z.string().describe(
      "Required. The username that Database Migration Service will use to connect to the database. The value is encrypted when stored in Database Migration Service.",
    ).optional(),
  }).describe(
    "Specifies connection parameters required specifically for Oracle databases.",
  ).optional(),
  postgresql: z.object({
    alloydbClusterId: z.string().describe(
      "Optional. If the destination is an AlloyDB database, use this field to provide the AlloyDB cluster ID.",
    ).optional(),
    cloudSqlId: z.string().describe(
      "If the source is a Cloud SQL database, use this field to provide the Cloud SQL instance ID of the source.",
    ).optional(),
    database: z.string().describe(
      "Optional. The name of the specific database within the host.",
    ).optional(),
    enableIamAuthentication: z.boolean().describe(
      "Optional. If true, Database Migration Service will use IAM database authentication to connect to the database.",
    ).optional(),
    forwardSshConnectivity: z.object({
      hostname: z.string().describe("Required. Hostname for the SSH tunnel.")
        .optional(),
      password: z.string().describe("Input only. SSH password.").optional(),
      port: z.number().int().describe(
        "Port for the SSH tunnel, default value is 22.",
      ).optional(),
      privateKey: z.string().describe("Input only. SSH private key.")
        .optional(),
      username: z.string().describe("Required. Username for the SSH tunnel.")
        .optional(),
    }).describe("Forward SSH Tunnel connectivity.").optional(),
    host: z.string().describe(
      "Required. The IP or hostname of the source PostgreSQL database.",
    ).optional(),
    networkArchitecture: z.enum([
      "NETWORK_ARCHITECTURE_UNSPECIFIED",
      "NETWORK_ARCHITECTURE_OLD_CSQL_PRODUCER",
      "NETWORK_ARCHITECTURE_NEW_CSQL_PRODUCER",
    ]).describe(
      "Output only. If the source is a Cloud SQL database, this field indicates the network architecture it's associated with.",
    ).optional(),
    password: z.string().describe(
      "Required. Input only. The password for the user that Database Migration Service will be using to connect to the database. This field is not returned on request, and the value is encrypted when stored in Database Migration Service.",
    ).optional(),
    passwordSet: z.boolean().describe(
      "Output only. Indicates If this connection profile password is stored.",
    ).optional(),
    port: z.number().int().describe(
      "Required. The network port of the source PostgreSQL database.",
    ).optional(),
    privateConnectivity: z.object({
      privateConnection: z.string().describe(
        "Required. The resource name (URI) of the private connection.",
      ).optional(),
    }).describe("Private Connectivity.").optional(),
    privateServiceConnectConnectivity: z.object({
      serviceAttachment: z.string().describe(
        "Required. A service attachment that exposes a database, and has the following format: projects/{project}/regions/{region}/serviceAttachments/{service_attachment_name}",
      ).optional(),
    }).describe(
      "[Private Service Connect connectivity](https://cloud.google.com/vpc/docs/private-service-connect#service-attachments)",
    ).optional(),
    ssl: z.object({
      caCertificate: z.string().describe(
        "Required. Input only. The x509 PEM-encoded certificate of the CA that signed the source database server's certificate. The replica will use this certificate to verify it's connecting to the right host.",
      ).optional(),
      clientCertificate: z.string().describe(
        "Input only. The x509 PEM-encoded certificate that will be used by the replica to authenticate against the source database server.If this field is used then the 'client_key' field is mandatory.",
      ).optional(),
      clientKey: z.string().describe(
        "Input only. The unencrypted PKCS#1 or PKCS#8 PEM-encoded private key associated with the Client Certificate. If this field is used then the 'client_certificate' field is mandatory.",
      ).optional(),
      sslFlags: z.record(z.string(), z.string()).describe(
        'Optional. SSL flags used for establishing SSL connection to the source database. Only source specific flags are supported. An object containing a list of "key": "value" pairs. Example: { "server_certificate_hostname": "server.com"}.',
      ).optional(),
      type: z.enum([
        "SSL_TYPE_UNSPECIFIED",
        "SERVER_ONLY",
        "SERVER_CLIENT",
        "REQUIRED",
        "NONE",
      ]).describe(
        "Optional. The ssl config type according to 'client_key', 'client_certificate' and 'ca_certificate'.",
      ).optional(),
    }).describe("SSL configuration information.").optional(),
    staticIpConnectivity: z.object({}).describe(
      "The source database will allow incoming connections from the public IP of the destination database. You can retrieve the public IP of the Cloud SQL instance from the Cloud SQL console or using Cloud SQL APIs. No additional configuration is required.",
    ).optional(),
    username: z.string().describe(
      "Required. The username that Database Migration Service will use to connect to the database. The value is encrypted when stored in Database Migration Service.",
    ).optional(),
  }).describe(
    "Specifies connection parameters required specifically for PostgreSQL databases.",
  ).optional(),
  provider: z.enum([
    "DATABASE_PROVIDER_UNSPECIFIED",
    "CLOUDSQL",
    "RDS",
    "AURORA",
    "ALLOYDB",
    "AZURE_DATABASE",
  ]).describe("The database provider.").optional(),
  role: z.enum(["ROLE_UNSPECIFIED", "SOURCE", "DESTINATION"]).describe(
    "Optional. The connection profile role.",
  ).optional(),
  sqlserver: z.object({
    backups: z.object({
      gcsBucket: z.string().describe(
        "Required. The Cloud Storage bucket that stores backups for all replicated databases.",
      ).optional(),
      gcsPrefix: z.string().describe(
        "Optional. Cloud Storage path inside the bucket that stores backups.",
      ).optional(),
    }).describe(
      "Specifies the backup details in Cloud Storage for homogeneous migration to Cloud SQL for SQL Server.",
    ).optional(),
    cloudSqlId: z.string().describe(
      "If the source is a Cloud SQL database, use this field to provide the Cloud SQL instance ID of the source.",
    ).optional(),
    cloudSqlProjectId: z.string().describe(
      "Optional. The project id of the Cloud SQL instance. If not provided, the project id of the connection profile will be used.",
    ).optional(),
    database: z.string().describe(
      "Required. The name of the specific database within the host.",
    ).optional(),
    dbmPort: z.number().int().describe(
      "Optional. The Database Mirroring (DBM) port of the source SQL Server instance.",
    ).optional(),
    forwardSshConnectivity: z.object({
      hostname: z.string().describe("Required. Hostname for the SSH tunnel.")
        .optional(),
      password: z.string().describe("Input only. SSH password.").optional(),
      port: z.number().int().describe(
        "Port for the SSH tunnel, default value is 22.",
      ).optional(),
      privateKey: z.string().describe("Input only. SSH private key.")
        .optional(),
      username: z.string().describe("Required. Username for the SSH tunnel.")
        .optional(),
    }).describe("Forward SSH Tunnel connectivity.").optional(),
    host: z.string().describe(
      "Required. The IP or hostname of the source SQL Server database.",
    ).optional(),
    password: z.string().describe(
      "Required. Input only. The password for the user that Database Migration Service will be using to connect to the database. This field is not returned on request, and the value is encrypted when stored in Database Migration Service.",
    ).optional(),
    passwordSet: z.boolean().describe(
      "Output only. Indicates whether a new password is included in the request.",
    ).optional(),
    port: z.number().int().describe(
      "Required. The network port of the source SQL Server database.",
    ).optional(),
    privateConnectivity: z.object({
      privateConnection: z.string().describe(
        "Required. The resource name (URI) of the private connection.",
      ).optional(),
    }).describe("Private Connectivity.").optional(),
    privateServiceConnectConnectivity: z.object({
      serviceAttachment: z.string().describe(
        "Required. A service attachment that exposes a database, and has the following format: projects/{project}/regions/{region}/serviceAttachments/{service_attachment_name}",
      ).optional(),
    }).describe(
      "[Private Service Connect connectivity](https://cloud.google.com/vpc/docs/private-service-connect#service-attachments)",
    ).optional(),
    ssl: z.object({
      caCertificate: z.string().describe(
        "Required. Input only. The x509 PEM-encoded certificate of the CA that signed the source database server's certificate. The replica will use this certificate to verify it's connecting to the right host.",
      ).optional(),
      clientCertificate: z.string().describe(
        "Input only. The x509 PEM-encoded certificate that will be used by the replica to authenticate against the source database server.If this field is used then the 'client_key' field is mandatory.",
      ).optional(),
      clientKey: z.string().describe(
        "Input only. The unencrypted PKCS#1 or PKCS#8 PEM-encoded private key associated with the Client Certificate. If this field is used then the 'client_certificate' field is mandatory.",
      ).optional(),
      sslFlags: z.record(z.string(), z.string()).describe(
        'Optional. SSL flags used for establishing SSL connection to the source database. Only source specific flags are supported. An object containing a list of "key": "value" pairs. Example: { "server_certificate_hostname": "server.com"}.',
      ).optional(),
      type: z.enum([
        "SSL_TYPE_UNSPECIFIED",
        "SERVER_ONLY",
        "SERVER_CLIENT",
        "REQUIRED",
        "NONE",
      ]).describe(
        "Optional. The ssl config type according to 'client_key', 'client_certificate' and 'ca_certificate'.",
      ).optional(),
    }).describe("SSL configuration information.").optional(),
    staticIpConnectivity: z.object({}).describe(
      "The source database will allow incoming connections from the public IP of the destination database. You can retrieve the public IP of the Cloud SQL instance from the Cloud SQL console or using Cloud SQL APIs. No additional configuration is required.",
    ).optional(),
    username: z.string().describe(
      "Required. The username that Database Migration Service will use to connect to the database. The value is encrypted when stored in Database Migration Service.",
    ).optional(),
  }).describe(
    "Specifies connection parameters required specifically for SQL Server databases.",
  ).optional(),
  state: z.enum([
    "STATE_UNSPECIFIED",
    "DRAFT",
    "CREATING",
    "READY",
    "UPDATING",
    "DELETING",
    "DELETED",
    "FAILED",
  ]).describe(
    "The current connection profile state (e.g. DRAFT, READY, or FAILED).",
  ).optional(),
  connectionProfileId: z.string().describe(
    "Required. The connection profile identifier.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. A unique ID used to identify the request. If the server receives two requests with the same ID, then the second request is ignored. It is recommended to always set this value to a UUID. The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The maximum length is 40 characters.",
  ).optional(),
  skipValidation: z.string().describe(
    "Optional. Create the connection profile without validating it. The default is false. Only supported for Oracle connection profiles.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Database Migration ConnectionProfiles. Registered at `@swamp/gcp/datamigration/connectionprofiles`. */
export const model = {
  type: "@swamp/gcp/datamigration/connectionprofiles",
  version: "2026.05.21.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A connection profile definition.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a connectionProfiles",
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
        if (g["alloydb"] !== undefined) body["alloydb"] = g["alloydb"];
        if (g["cloudsql"] !== undefined) body["cloudsql"] = g["cloudsql"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["error"] !== undefined) body["error"] = g["error"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["mysql"] !== undefined) body["mysql"] = g["mysql"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["oracle"] !== undefined) body["oracle"] = g["oracle"];
        if (g["postgresql"] !== undefined) body["postgresql"] = g["postgresql"];
        if (g["provider"] !== undefined) body["provider"] = g["provider"];
        if (g["role"] !== undefined) body["role"] = g["role"];
        if (g["sqlserver"] !== undefined) body["sqlserver"] = g["sqlserver"];
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["connectionProfileId"] !== undefined) {
          body["connectionProfileId"] = g["connectionProfileId"];
        }
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["skipValidation"] !== undefined) {
          body["skipValidation"] = g["skipValidation"];
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
              "readyValues": ["READY"],
              "failedValues": ["FAILED"],
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
      description: "Update connectionProfiles attributes",
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
        if (g["alloydb"] !== undefined) body["alloydb"] = g["alloydb"];
        if (g["cloudsql"] !== undefined) body["cloudsql"] = g["cloudsql"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["error"] !== undefined) body["error"] = g["error"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["mysql"] !== undefined) body["mysql"] = g["mysql"];
        if (g["oracle"] !== undefined) body["oracle"] = g["oracle"];
        if (g["postgresql"] !== undefined) body["postgresql"] = g["postgresql"];
        if (g["provider"] !== undefined) body["provider"] = g["provider"];
        if (g["role"] !== undefined) body["role"] = g["role"];
        if (g["sqlserver"] !== undefined) body["sqlserver"] = g["sqlserver"];
        if (g["state"] !== undefined) body["state"] = g["state"];
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
              "readyValues": ["READY"],
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
    get_iam_policy: {
      description: "get iam policy",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
            "id":
              "datamigration.projects.locations.connectionProfiles.getIamPolicy",
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
        const projectId = await getProjectId();
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
              "datamigration.projects.locations.connectionProfiles.setIamPolicy",
            "path": "v1/{+resource}:setIamPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
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
        const projectId = await getProjectId();
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
              "datamigration.projects.locations.connectionProfiles.testIamPermissions",
            "path": "v1/{+resource}:testIamPermissions",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
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
