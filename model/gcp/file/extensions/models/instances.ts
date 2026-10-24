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

// Auto-generated extension model for @swamp/gcp/file/instances
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Filestore Instances.
 *
 * A Filestore instance.
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
  return `${parent}/instances/${shortName}`;
}

const BASE_URL = "https://file.googleapis.com/";

const GET_CONFIG = {
  "id": "file.projects.locations.instances.get",
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
  "id": "file.projects.locations.instances.create",
  "path": "v1/{+parent}/instances",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "instanceId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "file.projects.locations.instances.patch",
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
  "id": "file.projects.locations.instances.delete",
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
  },
} as const;

const LIST_CONFIG = {
  "id": "file.projects.locations.instances.list",
  "path": "v1/{+parent}/instances",
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
  deletionProtectionEnabled: z.boolean().describe(
    "Optional. Indicates whether the instance is protected against deletion.",
  ).optional(),
  deletionProtectionReason: z.string().describe(
    "Optional. The reason for enabling deletion protection.",
  ).optional(),
  description: z.string().describe(
    "The description of the instance (2048 characters or less).",
  ).optional(),
  directoryServices: z.object({
    ldap: z.object({
      domain: z.string().describe(
        "Required. The LDAP domain name in the format of `my-domain.com`.",
      ).optional(),
      groupsOu: z.string().describe(
        "Optional. The groups Organizational Unit (OU) is optional. This parameter is a hint to allow faster lookup in the LDAP namespace. In case that this parameter is not provided, Filestore instance will query the whole LDAP namespace.",
      ).optional(),
      servers: z.array(z.string()).describe(
        "Required. The servers names are used for specifying the LDAP servers names. The LDAP servers names can come with two formats: 1. DNS name, for example: `ldap.example1.com`, `ldap.example2.com`. 2. IP address, for example: `10.0.0.1`, `10.0.0.2`, `10.0.0.3`. All servers names must be in the same format: either all DNS names or all IP addresses.",
      ).optional(),
      usersOu: z.string().describe(
        "Optional. The users Organizational Unit (OU) is optional. This parameter is a hint to allow faster lookup in the LDAP namespace. In case that this parameter is not provided, Filestore instance will query the whole LDAP namespace.",
      ).optional(),
    }).describe("Configuration for LDAP servers.").optional(),
  }).describe(
    'Optional. Directory Services configuration for Kerberos-based authentication. Should only be set if protocol is "NFS_V4_1".',
  ).optional(),
  fileShares: z.array(z.object({
    capacityGb: z.string().describe(
      "File share capacity in gigabytes (GB). Filestore defines 1 GB as 1024^3 bytes.",
    ).optional(),
    name: z.string().describe(
      "Required. The name of the file share. Must use 1-16 characters for the basic service tier and 1-63 characters for all other service tiers. Must use lowercase letters, numbers, or underscores `[a-z0-9_]`. Must start with a letter. Immutable.",
    ).optional(),
    nfsExportOptions: z.array(z.object({
      accessMode: z.enum(["ACCESS_MODE_UNSPECIFIED", "READ_ONLY", "READ_WRITE"])
        .describe(
          "Either READ_ONLY, for allowing only read requests on the exported directory, or READ_WRITE, for allowing both read and write requests. The default is READ_WRITE.",
        ).optional(),
      anonGid: z.string().describe(
        "An integer representing the anonymous group id with a default value of 65534. Anon_gid may only be set with squash_mode of ROOT_SQUASH. An error will be returned if this field is specified for other squash_mode settings.",
      ).optional(),
      anonUid: z.string().describe(
        "An integer representing the anonymous user id with a default value of 65534. Anon_uid may only be set with squash_mode of ROOT_SQUASH. An error will be returned if this field is specified for other squash_mode settings.",
      ).optional(),
      ipRanges: z.array(z.unknown()).describe(
        "List of either an IPv4 addresses in the format `{octet1}.{octet2}.{octet3}.{octet4}` or CIDR ranges in the format `{octet1}.{octet2}.{octet3}.{octet4}/{mask size}` which may mount the file share. Overlapping IP ranges are not allowed, both within and across NfsExportOptions. An error will be returned. The limit is 64 IP ranges/addresses for each FileShareConfig among all NfsExportOptions.",
      ).optional(),
      network: z.string().describe(
        "Optional. The source VPC network for ip_ranges. Required for instances using Private Service Connect, optional otherwise. If provided, must be the same network specified in the `NetworkConfig.network` field.",
      ).optional(),
      squashMode: z.enum([
        "SQUASH_MODE_UNSPECIFIED",
        "NO_ROOT_SQUASH",
        "ROOT_SQUASH",
      ]).describe(
        "Either NO_ROOT_SQUASH, for allowing root access on the exported directory, or ROOT_SQUASH, for not allowing root access. The default is NO_ROOT_SQUASH.",
      ).optional(),
    })).describe(
      "Nfs Export Options. There is a limit of 10 export options per file share.",
    ).optional(),
    sourceBackup: z.string().describe(
      "The resource name of the backup, in the format `projects/{project_number}/locations/{location_id}/backups/{backup_id}`, that this file share has been restored from.",
    ).optional(),
    sourceBackupdrBackup: z.string().describe(
      "The resource name of the BackupDR backup, in the format `projects/{project_id}/locations/{location_id}/backupVaults/{backupvault_id}/dataSources/{datasource_id}/backups/{backup_id}`,",
    ).optional(),
  })).describe(
    "File system shares on the instance. For this version, only a single file share is supported.",
  ).optional(),
  kmsKeyName: z.string().describe("KMS key name used for data encryption.")
    .optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Resource labels to represent user provided metadata.",
  ).optional(),
  networks: z.array(z.object({
    connectMode: z.enum([
      "CONNECT_MODE_UNSPECIFIED",
      "DIRECT_PEERING",
      "PRIVATE_SERVICE_ACCESS",
      "PRIVATE_SERVICE_CONNECT",
    ]).describe(
      "The network connect mode of the Filestore instance. If not provided, the connect mode defaults to DIRECT_PEERING.",
    ).optional(),
    ipAddresses: z.array(z.string()).describe(
      "Output only. IPv4 addresses in the format `{octet1}.{octet2}.{octet3}.{octet4}` or IPv6 addresses in the format `{block1}:{block2}:{block3}:{block4}:{block5}:{block6}:{block7}:{block8}`.",
    ).optional(),
    modes: z.array(
      z.enum(["ADDRESS_MODE_UNSPECIFIED", "MODE_IPV4", "MODE_IPV6"]),
    ).describe(
      "Internet protocol versions for which the instance has IP addresses assigned.",
    ).optional(),
    network: z.string().describe(
      "The name of the Google Compute Engine [VPC network](https://cloud.google.com/vpc/docs/vpc) to which the instance is connected.",
    ).optional(),
    pscConfig: z.object({
      endpointProject: z.string().describe(
        "Optional. Consumer service project in which the Private Service Connect endpoint would be set up. This is optional, and only relevant in case the network is a shared VPC. If this is not specified, the endpoint would be setup in the VPC host project.",
      ).optional(),
      requestedIpAddress: z.string().describe(
        "Optional. Immutable. Optional: The desired IP address for the instance. If not specified, an IP will be automatically allocated. The IP must be from the subnetwork range configured in the Service Connection Policy. This effective ip address is set in the ip_addresses field. use 3 instead of 2 to avoid conflict with the reserved_ip_range field.",
      ).optional(),
    }).describe(
      "Optional. Private Service Connect configuration. Should only be set when connect_mode is PRIVATE_SERVICE_CONNECT.",
    ).optional(),
    reservedIpRange: z.string().describe(
      "Optional, reserved_ip_range can have one of the following two types of values. * CIDR range value when using DIRECT_PEERING connect mode. * [Allocated IP address range](https://cloud.google.com/compute/docs/ip-addresses/reserve-static-internal-ip-address) when using PRIVATE_SERVICE_ACCESS connect mode. When the name of an allocated IP address range is specified, it must be one of the ranges associated with the private service access connection. When specified as a direct CIDR value, it must be a /29 CIDR block for Basic tier, a /24 CIDR block for High Scale tier, or a /26 CIDR block for Enterprise tier in one of the [internal IP address ranges](https://www.arin.net/reference/research/statistics/address_filters/) that identifies the range of IP addresses reserved for this instance. For example, 10.0.0.0/29, 192.168.0.0/24 or 192.168.0.0/26, respectively. The range you specify can't overlap with either existing subnets or assigned IP address ranges for other Filestore instances in the selected VPC network.",
    ).optional(),
  })).describe(
    "VPC networks to which the instance is connected. For this version, only a single network is supported.",
  ).optional(),
  performanceConfig: z.object({
    fixedIops: z.object({
      maxIops: z.string().describe("Required. Maximum IOPS.").optional(),
    }).describe(
      "Choose a fixed provisioned IOPS value for the instance, which will remain constant regardless of instance capacity. Value must be a multiple of 1000. If the chosen value is outside the supported range for the instance's capacity during instance creation, instance creation will fail with an `InvalidArgument` error. Similarly, if an instance capacity update would result in a value outside the supported range, the update will fail with an `InvalidArgument` error.",
    ).optional(),
    iopsPerTb: z.object({
      maxIopsPerTb: z.string().describe("Required. Maximum IOPS per TiB.")
        .optional(),
    }).describe(
      "Provision IOPS dynamically based on the capacity of the instance. Provisioned IOPS will be calculated by multiplying the capacity of the instance in TiB by the `iops_per_tb` value. For example, for a 2 TiB instance with an `iops_per_tb` value of 17000 the provisioned IOPS will be 34000. If the calculated value is outside the supported range for the instance's capacity during instance creation, instance creation will fail with an `InvalidArgument` error. Similarly, if an instance capacity update would result in a value outside the supported range, the update will fail with an `InvalidArgument` error.",
    ).optional(),
  }).describe("Optional. Used to configure performance.").optional(),
  protocol: z.enum(["FILE_PROTOCOL_UNSPECIFIED", "NFS_V3", "NFS_V4_1"])
    .describe(
      "Immutable. The protocol indicates the access protocol for all shares in the instance. This field is immutable and it cannot be changed after the instance has been created. Default value: `NFS_V3`.",
    ).optional(),
  replication: z.object({
    replicas: z.array(z.object({
      lastActiveSyncTime: z.string().describe(
        "Output only. The timestamp of the latest replication snapshot taken on the active instance and is already replicated safely.",
      ).optional(),
      peerInstance: z.string().describe(
        "Optional. The name of the source instance for the replica, in the format `projects/{project}/locations/{location}/instances/{instance}`. This field is required when creating a replica.",
      ).optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "CREATING",
        "READY",
        "REMOVING",
        "FAILED",
        "PROMOTING",
        "PAUSING",
        "PAUSED",
        "RESUMING",
      ]).describe("Output only. The replica state.").optional(),
      stateReasons: z.array(
        z.enum([
          "STATE_REASON_UNSPECIFIED",
          "PEER_INSTANCE_UNREACHABLE",
          "REMOVE_FAILED",
          "PAUSE_FAILED",
          "RESUME_FAILED",
        ]),
      ).describe(
        "Output only. Additional information about the replication state, if available.",
      ).optional(),
      stateUpdateTime: z.string().describe(
        "Output only. The time when the replica state was updated.",
      ).optional(),
    })).describe(
      "Optional. Replication configuration for the replica instance associated with this instance. Only a single replica is supported.",
    ).optional(),
    role: z.enum(["ROLE_UNSPECIFIED", "ACTIVE", "STANDBY"]).describe(
      "Optional. The replication role. When creating a new replica, this field must be set to `STANDBY`.",
    ).optional(),
  }).describe("Optional. Replication configuration.").optional(),
  tags: z.record(z.string(), z.string()).describe(
    'Optional. Input only. Immutable. Tag key-value pairs bound to this resource. Each key must be a namespaced name and each value a short name. Example: "123456789012/environment": "production", "123456789013/costCenter": "marketing" See the documentation for more information: - Namespaced name: https://cloud.google.com/resource-manager/docs/tags/tags-creating-and-managing#retrieving_tag_key - Short name: https://cloud.google.com/resource-manager/docs/tags/tags-creating-and-managing#retrieving_tag_value',
  ).optional(),
  tier: z.enum([
    "TIER_UNSPECIFIED",
    "STANDARD",
    "PREMIUM",
    "BASIC_HDD",
    "BASIC_SSD",
    "HIGH_SCALE_SSD",
    "ENTERPRISE",
    "ZONAL",
    "REGIONAL",
  ]).describe("The service tier of the instance.").optional(),
  instanceId: z.string().describe(
    "Required. The name of the instance to create. The name must be unique for the specified project and location.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  capacityStepSizeGb: z.string().optional(),
  createTime: z.string().optional(),
  customPerformanceSupported: z.boolean().optional(),
  deletionProtectionEnabled: z.boolean().optional(),
  deletionProtectionReason: z.string().optional(),
  description: z.string().optional(),
  directoryServices: z.object({
    ldap: z.object({
      domain: z.string(),
      groupsOu: z.string(),
      servers: z.array(z.string()),
      usersOu: z.string(),
    }),
  }).optional(),
  etag: z.string().optional(),
  fileShares: z.array(z.object({
    capacityGb: z.string(),
    name: z.string(),
    nfsExportOptions: z.array(z.object({
      accessMode: z.string(),
      anonGid: z.string(),
      anonUid: z.string(),
      ipRanges: z.array(z.unknown()),
      network: z.string(),
      squashMode: z.string(),
    })),
    sourceBackup: z.string(),
    sourceBackupdrBackup: z.string(),
  })).optional(),
  kmsKeyName: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  maxCapacityGb: z.string().optional(),
  minCapacityGb: z.string().optional(),
  name: z.string(),
  networks: z.array(z.object({
    connectMode: z.string(),
    ipAddresses: z.array(z.string()),
    modes: z.array(z.string()),
    network: z.string(),
    pscConfig: z.object({
      endpointProject: z.string(),
      requestedIpAddress: z.string(),
    }),
    reservedIpRange: z.string(),
  })).optional(),
  performanceConfig: z.object({
    fixedIops: z.object({
      maxIops: z.string(),
    }),
    iopsPerTb: z.object({
      maxIopsPerTb: z.string(),
    }),
  }).optional(),
  performanceLimits: z.object({
    maxIops: z.string(),
    maxReadIops: z.string(),
    maxReadThroughputBps: z.string(),
    maxWriteIops: z.string(),
    maxWriteThroughputBps: z.string(),
  }).optional(),
  protocol: z.string().optional(),
  replication: z.object({
    replicas: z.array(z.object({
      lastActiveSyncTime: z.string(),
      peerInstance: z.string(),
      state: z.string(),
      stateReasons: z.array(z.string()),
      stateUpdateTime: z.string(),
    })),
    role: z.string(),
  }).optional(),
  satisfiesPzi: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  state: z.string().optional(),
  statusMessage: z.string().optional(),
  suspensionReasons: z.array(z.string()).optional(),
  tags: z.record(z.string(), z.unknown()).optional(),
  tier: z.string().optional(),
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
  deletionProtectionEnabled: z.boolean().describe(
    "Optional. Indicates whether the instance is protected against deletion.",
  ).optional(),
  deletionProtectionReason: z.string().describe(
    "Optional. The reason for enabling deletion protection.",
  ).optional(),
  description: z.string().describe(
    "The description of the instance (2048 characters or less).",
  ).optional(),
  directoryServices: z.object({
    ldap: z.object({
      domain: z.string().describe(
        "Required. The LDAP domain name in the format of `my-domain.com`.",
      ).optional(),
      groupsOu: z.string().describe(
        "Optional. The groups Organizational Unit (OU) is optional. This parameter is a hint to allow faster lookup in the LDAP namespace. In case that this parameter is not provided, Filestore instance will query the whole LDAP namespace.",
      ).optional(),
      servers: z.array(z.string()).describe(
        "Required. The servers names are used for specifying the LDAP servers names. The LDAP servers names can come with two formats: 1. DNS name, for example: `ldap.example1.com`, `ldap.example2.com`. 2. IP address, for example: `10.0.0.1`, `10.0.0.2`, `10.0.0.3`. All servers names must be in the same format: either all DNS names or all IP addresses.",
      ).optional(),
      usersOu: z.string().describe(
        "Optional. The users Organizational Unit (OU) is optional. This parameter is a hint to allow faster lookup in the LDAP namespace. In case that this parameter is not provided, Filestore instance will query the whole LDAP namespace.",
      ).optional(),
    }).describe("Configuration for LDAP servers.").optional(),
  }).describe(
    'Optional. Directory Services configuration for Kerberos-based authentication. Should only be set if protocol is "NFS_V4_1".',
  ).optional(),
  fileShares: z.array(z.object({
    capacityGb: z.string().describe(
      "File share capacity in gigabytes (GB). Filestore defines 1 GB as 1024^3 bytes.",
    ).optional(),
    name: z.string().describe(
      "Required. The name of the file share. Must use 1-16 characters for the basic service tier and 1-63 characters for all other service tiers. Must use lowercase letters, numbers, or underscores `[a-z0-9_]`. Must start with a letter. Immutable.",
    ).optional(),
    nfsExportOptions: z.array(z.object({
      accessMode: z.enum(["ACCESS_MODE_UNSPECIFIED", "READ_ONLY", "READ_WRITE"])
        .describe(
          "Either READ_ONLY, for allowing only read requests on the exported directory, or READ_WRITE, for allowing both read and write requests. The default is READ_WRITE.",
        ).optional(),
      anonGid: z.string().describe(
        "An integer representing the anonymous group id with a default value of 65534. Anon_gid may only be set with squash_mode of ROOT_SQUASH. An error will be returned if this field is specified for other squash_mode settings.",
      ).optional(),
      anonUid: z.string().describe(
        "An integer representing the anonymous user id with a default value of 65534. Anon_uid may only be set with squash_mode of ROOT_SQUASH. An error will be returned if this field is specified for other squash_mode settings.",
      ).optional(),
      ipRanges: z.array(z.unknown()).describe(
        "List of either an IPv4 addresses in the format `{octet1}.{octet2}.{octet3}.{octet4}` or CIDR ranges in the format `{octet1}.{octet2}.{octet3}.{octet4}/{mask size}` which may mount the file share. Overlapping IP ranges are not allowed, both within and across NfsExportOptions. An error will be returned. The limit is 64 IP ranges/addresses for each FileShareConfig among all NfsExportOptions.",
      ).optional(),
      network: z.string().describe(
        "Optional. The source VPC network for ip_ranges. Required for instances using Private Service Connect, optional otherwise. If provided, must be the same network specified in the `NetworkConfig.network` field.",
      ).optional(),
      squashMode: z.enum([
        "SQUASH_MODE_UNSPECIFIED",
        "NO_ROOT_SQUASH",
        "ROOT_SQUASH",
      ]).describe(
        "Either NO_ROOT_SQUASH, for allowing root access on the exported directory, or ROOT_SQUASH, for not allowing root access. The default is NO_ROOT_SQUASH.",
      ).optional(),
    })).describe(
      "Nfs Export Options. There is a limit of 10 export options per file share.",
    ).optional(),
    sourceBackup: z.string().describe(
      "The resource name of the backup, in the format `projects/{project_number}/locations/{location_id}/backups/{backup_id}`, that this file share has been restored from.",
    ).optional(),
    sourceBackupdrBackup: z.string().describe(
      "The resource name of the BackupDR backup, in the format `projects/{project_id}/locations/{location_id}/backupVaults/{backupvault_id}/dataSources/{datasource_id}/backups/{backup_id}`,",
    ).optional(),
  })).describe(
    "File system shares on the instance. For this version, only a single file share is supported.",
  ).optional(),
  kmsKeyName: z.string().describe("KMS key name used for data encryption.")
    .optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Resource labels to represent user provided metadata.",
  ).optional(),
  networks: z.array(z.object({
    connectMode: z.enum([
      "CONNECT_MODE_UNSPECIFIED",
      "DIRECT_PEERING",
      "PRIVATE_SERVICE_ACCESS",
      "PRIVATE_SERVICE_CONNECT",
    ]).describe(
      "The network connect mode of the Filestore instance. If not provided, the connect mode defaults to DIRECT_PEERING.",
    ).optional(),
    ipAddresses: z.array(z.string()).describe(
      "Output only. IPv4 addresses in the format `{octet1}.{octet2}.{octet3}.{octet4}` or IPv6 addresses in the format `{block1}:{block2}:{block3}:{block4}:{block5}:{block6}:{block7}:{block8}`.",
    ).optional(),
    modes: z.array(
      z.enum(["ADDRESS_MODE_UNSPECIFIED", "MODE_IPV4", "MODE_IPV6"]),
    ).describe(
      "Internet protocol versions for which the instance has IP addresses assigned.",
    ).optional(),
    network: z.string().describe(
      "The name of the Google Compute Engine [VPC network](https://cloud.google.com/vpc/docs/vpc) to which the instance is connected.",
    ).optional(),
    pscConfig: z.object({
      endpointProject: z.string().describe(
        "Optional. Consumer service project in which the Private Service Connect endpoint would be set up. This is optional, and only relevant in case the network is a shared VPC. If this is not specified, the endpoint would be setup in the VPC host project.",
      ).optional(),
      requestedIpAddress: z.string().describe(
        "Optional. Immutable. Optional: The desired IP address for the instance. If not specified, an IP will be automatically allocated. The IP must be from the subnetwork range configured in the Service Connection Policy. This effective ip address is set in the ip_addresses field. use 3 instead of 2 to avoid conflict with the reserved_ip_range field.",
      ).optional(),
    }).describe(
      "Optional. Private Service Connect configuration. Should only be set when connect_mode is PRIVATE_SERVICE_CONNECT.",
    ).optional(),
    reservedIpRange: z.string().describe(
      "Optional, reserved_ip_range can have one of the following two types of values. * CIDR range value when using DIRECT_PEERING connect mode. * [Allocated IP address range](https://cloud.google.com/compute/docs/ip-addresses/reserve-static-internal-ip-address) when using PRIVATE_SERVICE_ACCESS connect mode. When the name of an allocated IP address range is specified, it must be one of the ranges associated with the private service access connection. When specified as a direct CIDR value, it must be a /29 CIDR block for Basic tier, a /24 CIDR block for High Scale tier, or a /26 CIDR block for Enterprise tier in one of the [internal IP address ranges](https://www.arin.net/reference/research/statistics/address_filters/) that identifies the range of IP addresses reserved for this instance. For example, 10.0.0.0/29, 192.168.0.0/24 or 192.168.0.0/26, respectively. The range you specify can't overlap with either existing subnets or assigned IP address ranges for other Filestore instances in the selected VPC network.",
    ).optional(),
  })).describe(
    "VPC networks to which the instance is connected. For this version, only a single network is supported.",
  ).optional(),
  performanceConfig: z.object({
    fixedIops: z.object({
      maxIops: z.string().describe("Required. Maximum IOPS.").optional(),
    }).describe(
      "Choose a fixed provisioned IOPS value for the instance, which will remain constant regardless of instance capacity. Value must be a multiple of 1000. If the chosen value is outside the supported range for the instance's capacity during instance creation, instance creation will fail with an `InvalidArgument` error. Similarly, if an instance capacity update would result in a value outside the supported range, the update will fail with an `InvalidArgument` error.",
    ).optional(),
    iopsPerTb: z.object({
      maxIopsPerTb: z.string().describe("Required. Maximum IOPS per TiB.")
        .optional(),
    }).describe(
      "Provision IOPS dynamically based on the capacity of the instance. Provisioned IOPS will be calculated by multiplying the capacity of the instance in TiB by the `iops_per_tb` value. For example, for a 2 TiB instance with an `iops_per_tb` value of 17000 the provisioned IOPS will be 34000. If the calculated value is outside the supported range for the instance's capacity during instance creation, instance creation will fail with an `InvalidArgument` error. Similarly, if an instance capacity update would result in a value outside the supported range, the update will fail with an `InvalidArgument` error.",
    ).optional(),
  }).describe("Optional. Used to configure performance.").optional(),
  protocol: z.enum(["FILE_PROTOCOL_UNSPECIFIED", "NFS_V3", "NFS_V4_1"])
    .describe(
      "Immutable. The protocol indicates the access protocol for all shares in the instance. This field is immutable and it cannot be changed after the instance has been created. Default value: `NFS_V3`.",
    ).optional(),
  replication: z.object({
    replicas: z.array(z.object({
      lastActiveSyncTime: z.string().describe(
        "Output only. The timestamp of the latest replication snapshot taken on the active instance and is already replicated safely.",
      ).optional(),
      peerInstance: z.string().describe(
        "Optional. The name of the source instance for the replica, in the format `projects/{project}/locations/{location}/instances/{instance}`. This field is required when creating a replica.",
      ).optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "CREATING",
        "READY",
        "REMOVING",
        "FAILED",
        "PROMOTING",
        "PAUSING",
        "PAUSED",
        "RESUMING",
      ]).describe("Output only. The replica state.").optional(),
      stateReasons: z.array(
        z.enum([
          "STATE_REASON_UNSPECIFIED",
          "PEER_INSTANCE_UNREACHABLE",
          "REMOVE_FAILED",
          "PAUSE_FAILED",
          "RESUME_FAILED",
        ]),
      ).describe(
        "Output only. Additional information about the replication state, if available.",
      ).optional(),
      stateUpdateTime: z.string().describe(
        "Output only. The time when the replica state was updated.",
      ).optional(),
    })).describe(
      "Optional. Replication configuration for the replica instance associated with this instance. Only a single replica is supported.",
    ).optional(),
    role: z.enum(["ROLE_UNSPECIFIED", "ACTIVE", "STANDBY"]).describe(
      "Optional. The replication role. When creating a new replica, this field must be set to `STANDBY`.",
    ).optional(),
  }).describe("Optional. Replication configuration.").optional(),
  tags: z.record(z.string(), z.string()).describe(
    'Optional. Input only. Immutable. Tag key-value pairs bound to this resource. Each key must be a namespaced name and each value a short name. Example: "123456789012/environment": "production", "123456789013/costCenter": "marketing" See the documentation for more information: - Namespaced name: https://cloud.google.com/resource-manager/docs/tags/tags-creating-and-managing#retrieving_tag_key - Short name: https://cloud.google.com/resource-manager/docs/tags/tags-creating-and-managing#retrieving_tag_value',
  ).optional(),
  tier: z.enum([
    "TIER_UNSPECIFIED",
    "STANDARD",
    "PREMIUM",
    "BASIC_HDD",
    "BASIC_SSD",
    "HIGH_SCALE_SSD",
    "ENTERPRISE",
    "ZONAL",
    "REGIONAL",
  ]).describe("The service tier of the instance.").optional(),
  instanceId: z.string().describe(
    "Required. The name of the instance to create. The name must be unique for the specified project and location.",
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

/** Swamp extension model for Google Cloud Filestore Instances. Registered at `@swamp/gcp/file/instances`. */
export const model = {
  type: "@swamp/gcp/file/instances",
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
      description: "Removed: performanceLimits",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { performanceLimits: _performanceLimits, ...rest } = old;
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
      toVersion: "2026.08.27.1",
      description: "No schema changes",
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
      description: "A Filestore instance.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a instances",
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
        if (g["deletionProtectionEnabled"] !== undefined) {
          body["deletionProtectionEnabled"] = g["deletionProtectionEnabled"];
        }
        if (g["deletionProtectionReason"] !== undefined) {
          body["deletionProtectionReason"] = g["deletionProtectionReason"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["directoryServices"] !== undefined) {
          body["directoryServices"] = g["directoryServices"];
        }
        if (g["fileShares"] !== undefined) body["fileShares"] = g["fileShares"];
        if (g["kmsKeyName"] !== undefined) body["kmsKeyName"] = g["kmsKeyName"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["networks"] !== undefined) body["networks"] = g["networks"];
        if (g["performanceConfig"] !== undefined) {
          body["performanceConfig"] = g["performanceConfig"];
        }
        if (g["protocol"] !== undefined) body["protocol"] = g["protocol"];
        if (g["replication"] !== undefined) {
          body["replication"] = g["replication"];
        }
        if (g["tags"] !== undefined) body["tags"] = g["tags"];
        if (g["tier"] !== undefined) body["tier"] = g["tier"];
        if (g["instanceId"] !== undefined) {
          params["instanceId"] = String(g["instanceId"]);
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
              "readyValues": ["READY"],
              "failedValues": ["ERROR"],
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
      description: "Get a instances",
      arguments: z.object({
        identifier: z.string().describe("The name of the instances"),
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
      description: "Update instances attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific instances by name (e.g. one discovered by list)",
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
        if (g["deletionProtectionEnabled"] !== undefined) {
          body["deletionProtectionEnabled"] = g["deletionProtectionEnabled"];
        }
        if (g["deletionProtectionReason"] !== undefined) {
          body["deletionProtectionReason"] = g["deletionProtectionReason"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["directoryServices"] !== undefined) {
          body["directoryServices"] = g["directoryServices"];
        }
        if (g["fileShares"] !== undefined) body["fileShares"] = g["fileShares"];
        if (g["kmsKeyName"] !== undefined) body["kmsKeyName"] = g["kmsKeyName"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["networks"] !== undefined) body["networks"] = g["networks"];
        if (g["performanceConfig"] !== undefined) {
          body["performanceConfig"] = g["performanceConfig"];
        }
        if (g["replication"] !== undefined) {
          body["replication"] = g["replication"];
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
              "readyValues": ["READY"],
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
      description: "Delete the instances",
      arguments: z.object({
        identifier: z.string().describe("The name of the instances"),
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
      description: "Sync instances state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific instances by name (e.g. one discovered by list)",
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
      description: "List instances resources",
      arguments: z.object({
        filter: z.string().describe("List filter.").optional(),
        orderBy: z.string().describe(
          'Sort results. Supported values are "name", "name desc" or "" (unsorted).',
        ).optional(),
        pageSize: z.number().describe("The maximum number of items to return.")
          .optional(),
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
          "instances",
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
    pause_replica: {
      description: "pause replica",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "file.projects.locations.instances.pauseReplica",
            "path": "v1/{+name}:pauseReplica",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
    promote_replica: {
      description: "promote replica",
      arguments: z.object({
        peerInstance: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["peerInstance"] !== undefined) {
          body["peerInstance"] = args["peerInstance"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "file.projects.locations.instances.promoteReplica",
            "path": "v1/{+name}:promoteReplica",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
        fileShare: z.any().optional(),
        sourceBackup: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["fileShare"] !== undefined) {
          body["fileShare"] = args["fileShare"];
        }
        if (args["sourceBackup"] !== undefined) {
          body["sourceBackup"] = args["sourceBackup"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "file.projects.locations.instances.restore",
            "path": "v1/{+name}:restore",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
    resume_replica: {
      description: "resume replica",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "file.projects.locations.instances.resumeReplica",
            "path": "v1/{+name}:resumeReplica",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
    revert: {
      description: "revert",
      arguments: z.object({
        targetSnapshotId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["targetSnapshotId"] !== undefined) {
          body["targetSnapshotId"] = args["targetSnapshotId"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "file.projects.locations.instances.revert",
            "path": "v1/{+name}:revert",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
