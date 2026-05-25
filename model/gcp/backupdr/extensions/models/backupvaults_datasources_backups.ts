// Auto-generated extension model for @swamp/gcp/backupdr/backupvaults-datasources-backups
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Backup and DR Service BackupVaults.DataSources.Backups.
 *
 * Message describing a Backup object.
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
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/backups/${shortName}`;
}

const BASE_URL = "https://backupdr.googleapis.com/";

const GET_CONFIG = {
  "id": "backupdr.projects.locations.backupVaults.dataSources.backups.get",
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
    "view": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "backupdr.projects.locations.backupVaults.dataSources.backups.patch",
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
  "id": "backupdr.projects.locations.backupVaults.dataSources.backups.delete",
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
  "id": "backupdr.projects.locations.backupVaults.dataSources.backups.list",
  "path": "v1/{+parent}/backups",
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
    "view": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  alloyDbBackupProperties: z.object({
    chainId: z.string().describe(
      "Output only. The chain id of this backup. Backups belonging to the same chain are sharing the same chain id. This property is calculated and maintained by BackupDR.",
    ).optional(),
    databaseVersion: z.string().describe(
      "Output only. The PostgreSQL major version of the AlloyDB cluster when the backup was taken.",
    ).optional(),
    description: z.string().describe(
      "An optional text description for the backup.",
    ).optional(),
    storedBytes: z.string().describe(
      "Output only. Storage usage of this particular backup",
    ).optional(),
  }).describe(
    "AlloyDbClusterBackupProperties represents AlloyDB cluster backup properties..",
  ).optional(),
  backupApplianceBackupProperties: z.object({
    finalizeTime: z.string().describe(
      "Output only. The time when this backup object was finalized (if none, backup is not finalized).",
    ).optional(),
    generationId: z.number().int().describe(
      "Output only. The numeric generation ID of the backup (monotonically increasing).",
    ).optional(),
    recoveryRangeEndTime: z.string().describe(
      "Optional. The latest timestamp of data available in this Backup.",
    ).optional(),
    recoveryRangeStartTime: z.string().describe(
      "Optional. The earliest timestamp of data available in this Backup.",
    ).optional(),
  }).describe(
    "BackupApplianceBackupProperties represents BackupDR backup appliance's properties.",
  ).optional(),
  backupApplianceLocks: z.array(z.object({
    backupApplianceLockInfo: z.object({
      backupApplianceId: z.string().describe(
        "Required. The ID of the backup/recovery appliance that created this lock.",
      ).optional(),
      backupApplianceName: z.string().describe(
        "Required. The name of the backup/recovery appliance that created this lock.",
      ).optional(),
      backupImage: z.string().describe(
        "The image name that depends on this Backup.",
      ).optional(),
      jobName: z.string().describe(
        "The job name on the backup/recovery appliance that created this lock.",
      ).optional(),
      lockReason: z.string().describe(
        "Required. The reason for the lock: e.g. MOUNT/RESTORE/BACKUP/etc. The value of this string is only meaningful to the client and it is not interpreted by the BackupVault service.",
      ).optional(),
      slaId: z.string().describe(
        "The SLA on the backup/recovery appliance that owns the lock.",
      ).optional(),
    }).describe(
      "BackupApplianceLockInfo contains metadata about the backupappliance that created the lock.",
    ).optional(),
    lockUntilTime: z.string().describe(
      "Required. The time after which this lock is not considered valid and will no longer protect the Backup from deletion.",
    ).optional(),
    serviceLockInfo: z.object({
      operation: z.string().describe(
        "Output only. The name of the operation that created this lock. The lock will automatically be released when the operation completes.",
      ).optional(),
    }).describe(
      "ServiceLockInfo represents the details of a lock taken by the service on a Backup resource.",
    ).optional(),
  })).describe(
    "Optional. The list of BackupLocks taken by the accessor Backup Appliance.",
  ).optional(),
  backupRetentionInheritance: z.enum([
    "BACKUP_RETENTION_INHERITANCE_UNSPECIFIED",
    "INHERIT_VAULT_RETENTION",
    "MATCH_BACKUP_EXPIRE_TIME",
  ]).describe(
    "Output only. Setting for how the enforced retention end time is inherited. This value is copied from this backup's BackupVault.",
  ).optional(),
  backupType: z.enum([
    "BACKUP_TYPE_UNSPECIFIED",
    "SCHEDULED",
    "ON_DEMAND",
    "ON_DEMAND_OPERATIONAL",
  ]).describe(
    "Output only. Type of the backup, unspecified, scheduled or ondemand.",
  ).optional(),
  cloudSqlInstanceBackupProperties: z.object({
    databaseInstalledVersion: z.string().describe(
      "Output only. The installed database version of the Cloud SQL instance when the backup was taken.",
    ).optional(),
    finalBackup: z.boolean().describe(
      "Output only. Whether the backup is a final backup.",
    ).optional(),
    instanceCreateTime: z.string().describe(
      "Output only. The instance creation timestamp.",
    ).optional(),
    instanceDeleteTime: z.string().describe(
      "Output only. The instance delete timestamp.",
    ).optional(),
    instanceTier: z.string().describe(
      "Output only. The tier (or machine type) for this instance. Example: `db-custom-1-3840`",
    ).optional(),
    sourceInstance: z.string().describe(
      "Output only. The source instance of the backup. Format: projects/{project}/instances/{instance}",
    ).optional(),
  }).describe(
    "CloudSqlInstanceBackupProperties represents Cloud SQL Instance Backup properties.",
  ).optional(),
  computeInstanceBackupProperties: z.object({
    canIpForward: z.boolean().describe(
      "Enables instances created based on these properties to send packets with source IP addresses other than their own and receive packets with destination IP addresses other than their own. If these instances will be used as an IP gateway or it will be set as the next-hop in a Route resource, specify `true`. If unsure, leave this set to `false`. See the https://cloud.google.com/vpc/docs/using-routes#canipforward documentation for more information.",
    ).optional(),
    description: z.string().describe(
      "An optional text description for the instances that are created from these properties.",
    ).optional(),
    disk: z.array(z.object({
      autoDelete: z.boolean().describe(
        "Optional. Specifies whether the disk will be auto-deleted when the instance is deleted (but not when the disk is detached from the instance).",
      ).optional(),
      boot: z.boolean().describe(
        "Optional. Indicates that this is a boot disk. The virtual machine will use the first partition of the disk for its root filesystem.",
      ).optional(),
      deviceName: z.string().describe(
        "Optional. This is used as an identifier for the disks. This is the unique name has to provided to modify disk parameters like disk_name and replica_zones (in case of RePDs)",
      ).optional(),
      diskEncryptionKey: z.object({
        kmsKeyName: z.string().describe(
          "Optional. The name of the encryption key that is stored in Google Cloud KMS.",
        ).optional(),
        kmsKeyServiceAccount: z.string().describe(
          "Optional. The service account being used for the encryption request for the given KMS key. If absent, the Compute Engine default service account is used.",
        ).optional(),
        rawKey: z.string().describe(
          "Optional. Specifies a 256-bit customer-supplied encryption key.",
        ).optional(),
        rsaEncryptedKey: z.string().describe(
          "Optional. RSA-wrapped 2048-bit customer-supplied encryption key to either encrypt or decrypt this resource.",
        ).optional(),
      }).describe("A customer-supplied encryption key.").optional(),
      diskInterface: z.enum([
        "DISK_INTERFACE_UNSPECIFIED",
        "SCSI",
        "NVME",
        "NVDIMM",
        "ISCSI",
      ]).describe(
        "Optional. Specifies the disk interface to use for attaching this disk.",
      ).optional(),
      diskSizeGb: z.string().describe("Optional. The size of the disk in GB.")
        .optional(),
      diskType: z.string().describe(
        "Optional. Output only. The URI of the disk type resource. For example: projects/project/zones/zone/diskTypes/pd-standard or pd-ssd",
      ).optional(),
      diskTypeDeprecated: z.enum([
        "DISK_TYPE_UNSPECIFIED",
        "SCRATCH",
        "PERSISTENT",
      ]).describe("Specifies the type of the disk.").optional(),
      guestOsFeature: z.array(z.object({
        type: z.unknown().describe("The ID of a supported feature.").optional(),
      })).describe(
        "Optional. A list of features to enable on the guest operating system. Applicable only for bootable images.",
      ).optional(),
      index: z.string().describe(
        "Optional. A zero-based index to this disk, where 0 is reserved for the boot disk.",
      ).optional(),
      initializeParams: z.object({
        diskName: z.string().describe(
          "Optional. Specifies the disk name. If not specified, the default is to use the name of the instance.",
        ).optional(),
        replicaZones: z.array(z.unknown()).describe(
          "Optional. URL of the zone where the disk should be created. Required for each regional disk associated with the instance.",
        ).optional(),
      }).describe("Specifies the parameters to initialize this disk.")
        .optional(),
      kind: z.string().describe("Optional. Type of the resource.").optional(),
      license: z.array(z.string()).describe(
        "Optional. Any valid publicly visible licenses.",
      ).optional(),
      mode: z.enum([
        "DISK_MODE_UNSPECIFIED",
        "READ_WRITE",
        "READ_ONLY",
        "LOCKED",
      ]).describe("Optional. The mode in which to attach this disk.")
        .optional(),
      savedState: z.enum(["DISK_SAVED_STATE_UNSPECIFIED", "PRESERVED"])
        .describe("Optional. Output only. The state of the disk.").optional(),
      source: z.string().describe(
        "Optional. Specifies a valid partial or full URL to an existing Persistent Disk resource.",
      ).optional(),
      type: z.enum(["DISK_TYPE_UNSPECIFIED", "SCRATCH", "PERSISTENT"]).describe(
        "Optional. Specifies the type of the disk.",
      ).optional(),
    })).describe(
      "An array of disks that are associated with the instances that are created from these properties.",
    ).optional(),
    guestAccelerator: z.array(z.object({
      acceleratorCount: z.number().int().describe(
        "Optional. The number of the guest accelerator cards exposed to this instance.",
      ).optional(),
      acceleratorType: z.string().describe(
        "Optional. Full or partial URL of the accelerator type resource to attach to this instance.",
      ).optional(),
    })).describe(
      "A list of guest accelerator cards' type and count to use for instances created from these properties.",
    ).optional(),
    guestFlush: z.boolean().describe(
      "Optional. Indicates whether to perform a guest flush operation before taking a compute backup. When set to false, the system will create crash-consistent backups. Default value is false.",
    ).optional(),
    keyRevocationActionType: z.enum([
      "KEY_REVOCATION_ACTION_TYPE_UNSPECIFIED",
      "NONE",
      "STOP",
    ]).describe(
      'KeyRevocationActionType of the instance. Supported options are "STOP" and "NONE". The default value is "NONE" if it is not specified.',
    ).optional(),
    labels: z.record(z.string(), z.string()).describe(
      "Labels to apply to instances that are created from these properties.",
    ).optional(),
    machineType: z.string().describe(
      "The machine type to use for instances that are created from these properties.",
    ).optional(),
    metadata: z.object({
      items: z.array(z.object({
        key: z.string().describe("Optional. Key for the metadata entry.")
          .optional(),
        value: z.string().describe(
          "Optional. Value for the metadata entry. These are free-form strings, and only have meaning as interpreted by the image running in the instance. The only restriction placed on values is that their size must be less than or equal to 262144 bytes (256 KiB).",
        ).optional(),
      })).describe(
        "Optional. Array of key/value pairs. The total size of all keys and values must be less than 512 KB.",
      ).optional(),
    }).describe("A metadata key/value entry.").optional(),
    minCpuPlatform: z.string().describe(
      "Minimum cpu/platform to be used by instances. The instance may be scheduled on the specified or newer cpu/platform. Applicable values are the friendly names of CPU platforms, such as `minCpuPlatform: Intel Haswell` or `minCpuPlatform: Intel Sandy Bridge`. For more information, read https://cloud.google.com/compute/docs/instances/specify-min-cpu-platform.",
    ).optional(),
    networkInterface: z.array(z.object({
      accessConfigs: z.array(z.object({
        externalIpv6: z.unknown().describe(
          "Optional. The external IPv6 address of this access configuration.",
        ).optional(),
        externalIpv6PrefixLength: z.unknown().describe(
          "Optional. The prefix length of the external IPv6 range.",
        ).optional(),
        name: z.unknown().describe(
          "Optional. The name of this access configuration.",
        ).optional(),
        natIP: z.unknown().describe(
          "Optional. The external IP address of this access configuration.",
        ).optional(),
        networkTier: z.unknown().describe(
          "Optional. This signifies the networking tier used for configuring this access",
        ).optional(),
        publicPtrDomainName: z.unknown().describe(
          "Optional. The DNS domain name for the public PTR record.",
        ).optional(),
        setPublicPtr: z.unknown().describe(
          "Optional. Specifies whether a public DNS 'PTR' record should be created to map the external IP address of the instance to a DNS domain name.",
        ).optional(),
        type: z.unknown().describe(
          "Optional. In accessConfigs (IPv4), the default and only option is ONE_TO_ONE_NAT. In ipv6AccessConfigs, the default and only option is DIRECT_IPV6.",
        ).optional(),
      })).describe(
        "Optional. An array of configurations for this interface. Currently, only one access config,ONE_TO_ONE_NAT is supported. If there are no accessConfigs specified, then this instance will have no external internet access.",
      ).optional(),
      aliasIpRanges: z.array(z.object({
        ipCidrRange: z.unknown().describe(
          "Optional. The IP alias ranges to allocate for this interface.",
        ).optional(),
        subnetworkRangeName: z.unknown().describe(
          "Optional. The name of a subnetwork secondary IP range from which to allocate an IP alias range. If not specified, the primary range of the subnetwork is used.",
        ).optional(),
      })).describe(
        "Optional. An array of alias IP ranges for this network interface. You can only specify this field for network interfaces in VPC networks.",
      ).optional(),
      internalIpv6PrefixLength: z.number().int().describe(
        "Optional. The prefix length of the primary internal IPv6 range.",
      ).optional(),
      ipv6AccessConfigs: z.array(z.object({
        externalIpv6: z.unknown().describe(
          "Optional. The external IPv6 address of this access configuration.",
        ).optional(),
        externalIpv6PrefixLength: z.unknown().describe(
          "Optional. The prefix length of the external IPv6 range.",
        ).optional(),
        name: z.unknown().describe(
          "Optional. The name of this access configuration.",
        ).optional(),
        natIP: z.unknown().describe(
          "Optional. The external IP address of this access configuration.",
        ).optional(),
        networkTier: z.unknown().describe(
          "Optional. This signifies the networking tier used for configuring this access",
        ).optional(),
        publicPtrDomainName: z.unknown().describe(
          "Optional. The DNS domain name for the public PTR record.",
        ).optional(),
        setPublicPtr: z.unknown().describe(
          "Optional. Specifies whether a public DNS 'PTR' record should be created to map the external IP address of the instance to a DNS domain name.",
        ).optional(),
        type: z.unknown().describe(
          "Optional. In accessConfigs (IPv4), the default and only option is ONE_TO_ONE_NAT. In ipv6AccessConfigs, the default and only option is DIRECT_IPV6.",
        ).optional(),
      })).describe(
        "Optional. An array of IPv6 access configurations for this interface. Currently, only one IPv6 access config, DIRECT_IPV6, is supported. If there is no ipv6AccessConfig specified, then this instance will have no external IPv6 Internet access.",
      ).optional(),
      ipv6AccessType: z.enum([
        "UNSPECIFIED_IPV6_ACCESS_TYPE",
        "INTERNAL",
        "EXTERNAL",
      ]).describe(
        "Optional. [Output Only] One of EXTERNAL, INTERNAL to indicate whether the IP can be accessed from the Internet. This field is always inherited from its subnetwork.",
      ).optional(),
      ipv6Address: z.string().describe(
        "Optional. An IPv6 internal network address for this network interface. To use a static internal IP address, it must be unused and in the same region as the instance's zone. If not specified, Google Cloud will automatically assign an internal IPv6 address from the instance's subnetwork.",
      ).optional(),
      name: z.string().describe(
        "Output only. [Output Only] The name of the network interface, which is generated by the server.",
      ).optional(),
      network: z.string().describe(
        "Optional. URL of the VPC network resource for this instance.",
      ).optional(),
      networkAttachment: z.string().describe(
        "Optional. The URL of the network attachment that this interface should connect to in the following format: projects/{project_number}/regions/{region_name}/networkAttachments/{network_attachment_name}.",
      ).optional(),
      networkIP: z.string().describe(
        "Optional. An IPv4 internal IP address to assign to the instance for this network interface. If not specified by the user, an unused internal IP is assigned by the system.",
      ).optional(),
      nicType: z.enum(["NIC_TYPE_UNSPECIFIED", "VIRTIO_NET", "GVNIC"]).describe(
        "Optional. The type of vNIC to be used on this interface. This may be gVNIC or VirtioNet.",
      ).optional(),
      queueCount: z.number().int().describe(
        "Optional. The networking queue count that's specified by users for the network interface. Both Rx and Tx queues will be set to this number. It'll be empty if not specified by the users.",
      ).optional(),
      stackType: z.enum(["STACK_TYPE_UNSPECIFIED", "IPV4_ONLY", "IPV4_IPV6"])
        .describe("The stack type for this network interface.").optional(),
      subnetwork: z.string().describe(
        "Optional. The URL of the Subnetwork resource for this instance.",
      ).optional(),
    })).describe(
      "An array of network access configurations for this interface.",
    ).optional(),
    scheduling: z.object({
      automaticRestart: z.boolean().describe(
        "Optional. Specifies whether the instance should be automatically restarted if it is terminated by Compute Engine (not terminated by a user).",
      ).optional(),
      instanceTerminationAction: z.enum([
        "INSTANCE_TERMINATION_ACTION_UNSPECIFIED",
        "DELETE",
        "STOP",
      ]).describe(
        "Optional. Specifies the termination action for the instance.",
      ).optional(),
      localSsdRecoveryTimeout: z.object({
        nanos: z.number().int().describe(
          "Optional. Span of time that's a fraction of a second at nanosecond resolution.",
        ).optional(),
        seconds: z.string().describe(
          "Optional. Span of time at a resolution of a second.",
        ).optional(),
      }).describe(
        'A SchedulingDuration represents a fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". Range is approximately 10,000 years.',
      ).optional(),
      minNodeCpus: z.number().int().describe(
        "Optional. The minimum number of virtual CPUs this instance will consume when running on a sole-tenant node.",
      ).optional(),
      nodeAffinities: z.array(z.object({
        key: z.string().describe(
          "Optional. Corresponds to the label key of Node resource.",
        ).optional(),
        operator: z.enum(["OPERATOR_UNSPECIFIED", "IN", "NOT_IN"]).describe(
          "Optional. Defines the operation of node selection.",
        ).optional(),
        values: z.array(z.unknown()).describe(
          "Optional. Corresponds to the label values of Node resource.",
        ).optional(),
      })).describe(
        "Optional. A set of node affinity and anti-affinity configurations. Overrides reservationAffinity.",
      ).optional(),
      onHostMaintenance: z.enum([
        "ON_HOST_MAINTENANCE_UNSPECIFIED",
        "TERMINATE",
        "MIGRATE",
      ]).describe(
        "Optional. Defines the maintenance behavior for this instance.",
      ).optional(),
      preemptible: z.boolean().describe(
        "Optional. Defines whether the instance is preemptible.",
      ).optional(),
      provisioningModel: z.enum([
        "PROVISIONING_MODEL_UNSPECIFIED",
        "STANDARD",
        "SPOT",
      ]).describe("Optional. Specifies the provisioning model of the instance.")
        .optional(),
    }).describe("Sets the scheduling options for an Instance.").optional(),
    serviceAccount: z.array(z.object({
      email: z.string().describe(
        "Optional. Email address of the service account.",
      ).optional(),
      scopes: z.array(z.string()).describe(
        "Optional. The list of scopes to be made available for this service account.",
      ).optional(),
    })).describe(
      "A list of service accounts with specified scopes. Access tokens for these service accounts are available to the instances that are created from these properties. Use metadata queries to obtain the access tokens for these instances.",
    ).optional(),
    sourceInstance: z.string().describe(
      "The source instance used to create this backup. This can be a partial or full URL to the resource. For example, the following are valid values: -https://www.googleapis.com/compute/v1/projects/project/zones/zone/instances/instance -projects/project/zones/zone/instances/instance",
    ).optional(),
    tags: z.object({
      items: z.array(z.string()).describe(
        "Optional. An array of tags. Each tag must be 1-63 characters long, and comply with RFC1035.",
      ).optional(),
    }).describe("A set of instance tags.").optional(),
  }).describe(
    "ComputeInstanceBackupProperties represents Compute Engine instance backup properties.",
  ).optional(),
  consistencyTime: z.string().describe(
    "Output only. The point in time when this backup was captured from the source.",
  ).optional(),
  createTime: z.string().describe(
    "Output only. The time when the instance was created.",
  ).optional(),
  description: z.string().describe(
    "Output only. The description of the Backup instance (2048 characters or less).",
  ).optional(),
  diskBackupProperties: z.object({
    accessMode: z.string().describe("The access mode of the source disk.")
      .optional(),
    architecture: z.enum(["ARCHITECTURE_UNSPECIFIED", "X86_64", "ARM64"])
      .describe(
        "The architecture of the source disk. Valid values are ARM64 or X86_64.",
      ).optional(),
    description: z.string().describe("A description of the source disk.")
      .optional(),
    enableConfidentialCompute: z.boolean().describe(
      "Indicates whether the source disk is using confidential compute mode.",
    ).optional(),
    guestFlush: z.boolean().describe(
      "Optional. Defines if the guest flush is enabled for the source disk. Default value is false.",
    ).optional(),
    guestOsFeature: z.array(z.object({
      type: z.enum([
        "FEATURE_TYPE_UNSPECIFIED",
        "VIRTIO_SCSI_MULTIQUEUE",
        "WINDOWS",
        "MULTI_IP_SUBNET",
        "UEFI_COMPATIBLE",
        "SECURE_BOOT",
        "GVNIC",
        "SEV_CAPABLE",
        "BARE_METAL_LINUX_COMPATIBLE",
        "SUSPEND_RESUME_COMPATIBLE",
        "SEV_LIVE_MIGRATABLE",
        "SEV_SNP_CAPABLE",
        "TDX_CAPABLE",
        "IDPF",
        "SEV_LIVE_MIGRATABLE_V2",
      ]).describe("The ID of a supported feature.").optional(),
    })).describe(
      "A list of guest OS features that are applicable to this backup.",
    ).optional(),
    labels: z.record(z.string(), z.string()).describe(
      "The labels of the source disk.",
    ).optional(),
    licenses: z.array(z.string()).describe(
      "A list of publicly available licenses that are applicable to this backup. This is applicable if the original image had licenses attached, e.g. Windows image.",
    ).optional(),
    physicalBlockSizeBytes: z.string().describe(
      "The physical block size of the source disk.",
    ).optional(),
    provisionedIops: z.string().describe(
      "The number of IOPS provisioned for the source disk.",
    ).optional(),
    provisionedThroughput: z.string().describe(
      "The number of throughput provisioned for the source disk.",
    ).optional(),
    region: z.string().describe(
      "Region and zone are mutually exclusive fields. The URL of the region of the source disk.",
    ).optional(),
    replicaZones: z.array(z.string()).describe(
      "The URL of the Zones where the source disk should be replicated.",
    ).optional(),
    sizeGb: z.string().describe("Size(in GB) of the source disk.").optional(),
    sourceDisk: z.string().describe(
      "The source disk used to create this backup.",
    ).optional(),
    storagePool: z.string().describe("The storage pool of the source disk.")
      .optional(),
    type: z.string().describe("The URL of the type of the disk.").optional(),
    zone: z.string().describe("The URL of the Zone where the source disk.")
      .optional(),
  }).describe(
    "DiskBackupProperties represents the properties of a Disk backup.",
  ).optional(),
  enforcedRetentionEndTime: z.string().describe(
    "Optional. The backup can not be deleted before this time.",
  ).optional(),
  etag: z.string().describe(
    "Optional. Server specified ETag to prevent updates from overwriting each other.",
  ).optional(),
  expireTime: z.string().describe(
    "Optional. When this backup is automatically expired.",
  ).optional(),
  filestoreInstanceBackupProperties: z.object({
    sourceInstance: z.string().describe(
      "Output only. The source instance of the backup.",
    ).optional(),
  }).describe(
    "FilestoreInstanceBackupProperties represents the properties of a Filestore instance that are backed up by the datasource..",
  ).optional(),
  gcpBackupPlanInfo: z.object({
    backupPlan: z.string().describe(
      "Resource name of backup plan by which workload is protected at the time of the backup. Format: projects/{project}/locations/{location}/backupPlans/{backupPlanId}",
    ).optional(),
    backupPlanRevisionId: z.string().describe(
      "The user friendly id of the backup plan revision which triggered this backup in case of scheduled backup or used for on demand backup.",
    ).optional(),
    backupPlanRevisionName: z.string().describe(
      "Resource name of the backup plan revision which triggered this backup in case of scheduled backup or used for on demand backup. Format: projects/{project}/locations/{location}/backupPlans/{backupPlanId}/revisions/{revisionId}",
    ).optional(),
    backupPlanRuleId: z.string().describe(
      "The rule id of the backup plan which triggered this backup in case of scheduled backup or used for",
    ).optional(),
  }).describe(
    "GCPBackupPlanInfo captures the plan configuration details of Google Cloud resources at the time of backup.",
  ).optional(),
  gcpResource: z.object({
    gcpResourcename: z.string().describe("Name of the Google Cloud resource.")
      .optional(),
    location: z.string().describe(
      'Location of the resource: //"global"/"unspecified".',
    ).optional(),
    type: z.string().describe(
      "Type of the resource. Use the Unified Resource Type, eg. compute.googleapis.com/Instance.",
    ).optional(),
  }).describe(
    "Minimum details to identify a Google Cloud resource for a backup.",
  ).optional(),
  kmsKeyVersions: z.array(z.string()).describe(
    "Optional. Output only. The list of KMS key versions used to encrypt the backup.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Resource labels to represent user provided metadata. No labels currently defined.",
  ).optional(),
  name: z.string().describe(
    'Output only. Identifier. Name of the backup to create. It must have the format`"projects//locations//backupVaults//dataSources/{datasource}/backups/{backup}"`. `{backup}` cannot be changed after creation. It must be between 3-63 characters long and must be unique within the datasource.',
  ).optional(),
  resourceSizeBytes: z.string().describe(
    "Output only. source resource size in bytes at the time of the backup.",
  ).optional(),
  satisfiesPzi: z.boolean().describe(
    "Optional. Output only. Reserved for future use.",
  ).optional(),
  satisfiesPzs: z.boolean().describe(
    "Optional. Output only. Reserved for future use.",
  ).optional(),
  serviceLocks: z.array(z.object({
    backupApplianceLockInfo: z.object({
      backupApplianceId: z.string().describe(
        "Required. The ID of the backup/recovery appliance that created this lock.",
      ).optional(),
      backupApplianceName: z.string().describe(
        "Required. The name of the backup/recovery appliance that created this lock.",
      ).optional(),
      backupImage: z.string().describe(
        "The image name that depends on this Backup.",
      ).optional(),
      jobName: z.string().describe(
        "The job name on the backup/recovery appliance that created this lock.",
      ).optional(),
      lockReason: z.string().describe(
        "Required. The reason for the lock: e.g. MOUNT/RESTORE/BACKUP/etc. The value of this string is only meaningful to the client and it is not interpreted by the BackupVault service.",
      ).optional(),
      slaId: z.string().describe(
        "The SLA on the backup/recovery appliance that owns the lock.",
      ).optional(),
    }).describe(
      "BackupApplianceLockInfo contains metadata about the backupappliance that created the lock.",
    ).optional(),
    lockUntilTime: z.string().describe(
      "Required. The time after which this lock is not considered valid and will no longer protect the Backup from deletion.",
    ).optional(),
    serviceLockInfo: z.object({
      operation: z.string().describe(
        "Output only. The name of the operation that created this lock. The lock will automatically be released when the operation completes.",
      ).optional(),
    }).describe(
      "ServiceLockInfo represents the details of a lock taken by the service on a Backup resource.",
    ).optional(),
  })).describe(
    "Output only. The list of BackupLocks taken by the service to prevent the deletion of the backup.",
  ).optional(),
  state: z.enum([
    "STATE_UNSPECIFIED",
    "CREATING",
    "ACTIVE",
    "DELETING",
    "ERROR",
    "UPLOADING",
  ]).describe("Output only. The Backup resource instance state.").optional(),
  updateTime: z.string().describe(
    "Output only. The time when the instance was updated.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  alloyDbBackupProperties: z.object({
    chainId: z.string(),
    databaseVersion: z.string(),
    description: z.string(),
    storedBytes: z.string(),
  }).optional(),
  backupApplianceBackupProperties: z.object({
    finalizeTime: z.string(),
    generationId: z.number(),
    recoveryRangeEndTime: z.string(),
    recoveryRangeStartTime: z.string(),
  }).optional(),
  backupApplianceLocks: z.array(z.object({
    backupApplianceLockInfo: z.object({
      backupApplianceId: z.string(),
      backupApplianceName: z.string(),
      backupImage: z.string(),
      jobName: z.string(),
      lockReason: z.string(),
      slaId: z.string(),
    }),
    lockUntilTime: z.string(),
    serviceLockInfo: z.object({
      operation: z.string(),
    }),
  })).optional(),
  backupRetentionInheritance: z.string().optional(),
  backupType: z.string().optional(),
  cloudSqlInstanceBackupProperties: z.object({
    databaseInstalledVersion: z.string(),
    finalBackup: z.boolean(),
    instanceCreateTime: z.string(),
    instanceDeleteTime: z.string(),
    instanceTier: z.string(),
    sourceInstance: z.string(),
  }).optional(),
  computeInstanceBackupProperties: z.object({
    canIpForward: z.boolean(),
    description: z.string(),
    disk: z.array(z.object({
      autoDelete: z.boolean(),
      boot: z.boolean(),
      deviceName: z.string(),
      diskEncryptionKey: z.object({
        kmsKeyName: z.string(),
        kmsKeyServiceAccount: z.string(),
        rawKey: z.string(),
        rsaEncryptedKey: z.string(),
      }),
      diskInterface: z.string(),
      diskSizeGb: z.string(),
      diskType: z.string(),
      diskTypeDeprecated: z.string(),
      guestOsFeature: z.array(z.object({
        type: z.unknown(),
      })),
      index: z.string(),
      initializeParams: z.object({
        diskName: z.string(),
        replicaZones: z.array(z.unknown()),
      }),
      kind: z.string(),
      license: z.array(z.string()),
      mode: z.string(),
      savedState: z.string(),
      source: z.string(),
      type: z.string(),
    })),
    guestAccelerator: z.array(z.object({
      acceleratorCount: z.number(),
      acceleratorType: z.string(),
    })),
    guestFlush: z.boolean(),
    keyRevocationActionType: z.string(),
    labels: z.record(z.string(), z.unknown()),
    machineType: z.string(),
    metadata: z.object({
      items: z.array(z.object({
        key: z.string(),
        value: z.string(),
      })),
    }),
    minCpuPlatform: z.string(),
    networkInterface: z.array(z.object({
      accessConfigs: z.array(z.object({
        externalIpv6: z.unknown(),
        externalIpv6PrefixLength: z.unknown(),
        name: z.unknown(),
        natIP: z.unknown(),
        networkTier: z.unknown(),
        publicPtrDomainName: z.unknown(),
        setPublicPtr: z.unknown(),
        type: z.unknown(),
      })),
      aliasIpRanges: z.array(z.object({
        ipCidrRange: z.unknown(),
        subnetworkRangeName: z.unknown(),
      })),
      internalIpv6PrefixLength: z.number(),
      ipv6AccessConfigs: z.array(z.object({
        externalIpv6: z.unknown(),
        externalIpv6PrefixLength: z.unknown(),
        name: z.unknown(),
        natIP: z.unknown(),
        networkTier: z.unknown(),
        publicPtrDomainName: z.unknown(),
        setPublicPtr: z.unknown(),
        type: z.unknown(),
      })),
      ipv6AccessType: z.string(),
      ipv6Address: z.string(),
      name: z.string(),
      network: z.string(),
      networkAttachment: z.string(),
      networkIP: z.string(),
      nicType: z.string(),
      queueCount: z.number(),
      stackType: z.string(),
      subnetwork: z.string(),
    })),
    scheduling: z.object({
      automaticRestart: z.boolean(),
      instanceTerminationAction: z.string(),
      localSsdRecoveryTimeout: z.object({
        nanos: z.number(),
        seconds: z.string(),
      }),
      minNodeCpus: z.number(),
      nodeAffinities: z.array(z.object({
        key: z.string(),
        operator: z.string(),
        values: z.array(z.unknown()),
      })),
      onHostMaintenance: z.string(),
      preemptible: z.boolean(),
      provisioningModel: z.string(),
    }),
    serviceAccount: z.array(z.object({
      email: z.string(),
      scopes: z.array(z.string()),
    })),
    sourceInstance: z.string(),
    tags: z.object({
      items: z.array(z.string()),
    }),
  }).optional(),
  consistencyTime: z.string().optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  diskBackupProperties: z.object({
    accessMode: z.string(),
    architecture: z.string(),
    description: z.string(),
    enableConfidentialCompute: z.boolean(),
    guestFlush: z.boolean(),
    guestOsFeature: z.array(z.object({
      type: z.string(),
    })),
    labels: z.record(z.string(), z.unknown()),
    licenses: z.array(z.string()),
    physicalBlockSizeBytes: z.string(),
    provisionedIops: z.string(),
    provisionedThroughput: z.string(),
    region: z.string(),
    replicaZones: z.array(z.string()),
    sizeGb: z.string(),
    sourceDisk: z.string(),
    storagePool: z.string(),
    type: z.string(),
    zone: z.string(),
  }).optional(),
  enforcedRetentionEndTime: z.string().optional(),
  etag: z.string().optional(),
  expireTime: z.string().optional(),
  filestoreInstanceBackupProperties: z.object({
    sourceInstance: z.string(),
  }).optional(),
  gcpBackupPlanInfo: z.object({
    backupPlan: z.string(),
    backupPlanRevisionId: z.string(),
    backupPlanRevisionName: z.string(),
    backupPlanRuleId: z.string(),
  }).optional(),
  gcpResource: z.object({
    gcpResourcename: z.string(),
    location: z.string(),
    type: z.string(),
  }).optional(),
  kmsKeyVersions: z.array(z.string()).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  resourceSizeBytes: z.string().optional(),
  satisfiesPzi: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  serviceLocks: z.array(z.object({
    backupApplianceLockInfo: z.object({
      backupApplianceId: z.string(),
      backupApplianceName: z.string(),
      backupImage: z.string(),
      jobName: z.string(),
      lockReason: z.string(),
      slaId: z.string(),
    }),
    lockUntilTime: z.string(),
    serviceLockInfo: z.object({
      operation: z.string(),
    }),
  })).optional(),
  state: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  alloyDbBackupProperties: z.object({
    chainId: z.string().describe(
      "Output only. The chain id of this backup. Backups belonging to the same chain are sharing the same chain id. This property is calculated and maintained by BackupDR.",
    ).optional(),
    databaseVersion: z.string().describe(
      "Output only. The PostgreSQL major version of the AlloyDB cluster when the backup was taken.",
    ).optional(),
    description: z.string().describe(
      "An optional text description for the backup.",
    ).optional(),
    storedBytes: z.string().describe(
      "Output only. Storage usage of this particular backup",
    ).optional(),
  }).describe(
    "AlloyDbClusterBackupProperties represents AlloyDB cluster backup properties..",
  ).optional(),
  backupApplianceBackupProperties: z.object({
    finalizeTime: z.string().describe(
      "Output only. The time when this backup object was finalized (if none, backup is not finalized).",
    ).optional(),
    generationId: z.number().int().describe(
      "Output only. The numeric generation ID of the backup (monotonically increasing).",
    ).optional(),
    recoveryRangeEndTime: z.string().describe(
      "Optional. The latest timestamp of data available in this Backup.",
    ).optional(),
    recoveryRangeStartTime: z.string().describe(
      "Optional. The earliest timestamp of data available in this Backup.",
    ).optional(),
  }).describe(
    "BackupApplianceBackupProperties represents BackupDR backup appliance's properties.",
  ).optional(),
  backupApplianceLocks: z.array(z.object({
    backupApplianceLockInfo: z.object({
      backupApplianceId: z.string().describe(
        "Required. The ID of the backup/recovery appliance that created this lock.",
      ).optional(),
      backupApplianceName: z.string().describe(
        "Required. The name of the backup/recovery appliance that created this lock.",
      ).optional(),
      backupImage: z.string().describe(
        "The image name that depends on this Backup.",
      ).optional(),
      jobName: z.string().describe(
        "The job name on the backup/recovery appliance that created this lock.",
      ).optional(),
      lockReason: z.string().describe(
        "Required. The reason for the lock: e.g. MOUNT/RESTORE/BACKUP/etc. The value of this string is only meaningful to the client and it is not interpreted by the BackupVault service.",
      ).optional(),
      slaId: z.string().describe(
        "The SLA on the backup/recovery appliance that owns the lock.",
      ).optional(),
    }).describe(
      "BackupApplianceLockInfo contains metadata about the backupappliance that created the lock.",
    ).optional(),
    lockUntilTime: z.string().describe(
      "Required. The time after which this lock is not considered valid and will no longer protect the Backup from deletion.",
    ).optional(),
    serviceLockInfo: z.object({
      operation: z.string().describe(
        "Output only. The name of the operation that created this lock. The lock will automatically be released when the operation completes.",
      ).optional(),
    }).describe(
      "ServiceLockInfo represents the details of a lock taken by the service on a Backup resource.",
    ).optional(),
  })).describe(
    "Optional. The list of BackupLocks taken by the accessor Backup Appliance.",
  ).optional(),
  backupRetentionInheritance: z.enum([
    "BACKUP_RETENTION_INHERITANCE_UNSPECIFIED",
    "INHERIT_VAULT_RETENTION",
    "MATCH_BACKUP_EXPIRE_TIME",
  ]).describe(
    "Output only. Setting for how the enforced retention end time is inherited. This value is copied from this backup's BackupVault.",
  ).optional(),
  backupType: z.enum([
    "BACKUP_TYPE_UNSPECIFIED",
    "SCHEDULED",
    "ON_DEMAND",
    "ON_DEMAND_OPERATIONAL",
  ]).describe(
    "Output only. Type of the backup, unspecified, scheduled or ondemand.",
  ).optional(),
  cloudSqlInstanceBackupProperties: z.object({
    databaseInstalledVersion: z.string().describe(
      "Output only. The installed database version of the Cloud SQL instance when the backup was taken.",
    ).optional(),
    finalBackup: z.boolean().describe(
      "Output only. Whether the backup is a final backup.",
    ).optional(),
    instanceCreateTime: z.string().describe(
      "Output only. The instance creation timestamp.",
    ).optional(),
    instanceDeleteTime: z.string().describe(
      "Output only. The instance delete timestamp.",
    ).optional(),
    instanceTier: z.string().describe(
      "Output only. The tier (or machine type) for this instance. Example: `db-custom-1-3840`",
    ).optional(),
    sourceInstance: z.string().describe(
      "Output only. The source instance of the backup. Format: projects/{project}/instances/{instance}",
    ).optional(),
  }).describe(
    "CloudSqlInstanceBackupProperties represents Cloud SQL Instance Backup properties.",
  ).optional(),
  computeInstanceBackupProperties: z.object({
    canIpForward: z.boolean().describe(
      "Enables instances created based on these properties to send packets with source IP addresses other than their own and receive packets with destination IP addresses other than their own. If these instances will be used as an IP gateway or it will be set as the next-hop in a Route resource, specify `true`. If unsure, leave this set to `false`. See the https://cloud.google.com/vpc/docs/using-routes#canipforward documentation for more information.",
    ).optional(),
    description: z.string().describe(
      "An optional text description for the instances that are created from these properties.",
    ).optional(),
    disk: z.array(z.object({
      autoDelete: z.boolean().describe(
        "Optional. Specifies whether the disk will be auto-deleted when the instance is deleted (but not when the disk is detached from the instance).",
      ).optional(),
      boot: z.boolean().describe(
        "Optional. Indicates that this is a boot disk. The virtual machine will use the first partition of the disk for its root filesystem.",
      ).optional(),
      deviceName: z.string().describe(
        "Optional. This is used as an identifier for the disks. This is the unique name has to provided to modify disk parameters like disk_name and replica_zones (in case of RePDs)",
      ).optional(),
      diskEncryptionKey: z.object({
        kmsKeyName: z.string().describe(
          "Optional. The name of the encryption key that is stored in Google Cloud KMS.",
        ).optional(),
        kmsKeyServiceAccount: z.string().describe(
          "Optional. The service account being used for the encryption request for the given KMS key. If absent, the Compute Engine default service account is used.",
        ).optional(),
        rawKey: z.string().describe(
          "Optional. Specifies a 256-bit customer-supplied encryption key.",
        ).optional(),
        rsaEncryptedKey: z.string().describe(
          "Optional. RSA-wrapped 2048-bit customer-supplied encryption key to either encrypt or decrypt this resource.",
        ).optional(),
      }).describe("A customer-supplied encryption key.").optional(),
      diskInterface: z.enum([
        "DISK_INTERFACE_UNSPECIFIED",
        "SCSI",
        "NVME",
        "NVDIMM",
        "ISCSI",
      ]).describe(
        "Optional. Specifies the disk interface to use for attaching this disk.",
      ).optional(),
      diskSizeGb: z.string().describe("Optional. The size of the disk in GB.")
        .optional(),
      diskType: z.string().describe(
        "Optional. Output only. The URI of the disk type resource. For example: projects/project/zones/zone/diskTypes/pd-standard or pd-ssd",
      ).optional(),
      diskTypeDeprecated: z.enum([
        "DISK_TYPE_UNSPECIFIED",
        "SCRATCH",
        "PERSISTENT",
      ]).describe("Specifies the type of the disk.").optional(),
      guestOsFeature: z.array(z.object({
        type: z.unknown().describe("The ID of a supported feature.").optional(),
      })).describe(
        "Optional. A list of features to enable on the guest operating system. Applicable only for bootable images.",
      ).optional(),
      index: z.string().describe(
        "Optional. A zero-based index to this disk, where 0 is reserved for the boot disk.",
      ).optional(),
      initializeParams: z.object({
        diskName: z.string().describe(
          "Optional. Specifies the disk name. If not specified, the default is to use the name of the instance.",
        ).optional(),
        replicaZones: z.array(z.unknown()).describe(
          "Optional. URL of the zone where the disk should be created. Required for each regional disk associated with the instance.",
        ).optional(),
      }).describe("Specifies the parameters to initialize this disk.")
        .optional(),
      kind: z.string().describe("Optional. Type of the resource.").optional(),
      license: z.array(z.string()).describe(
        "Optional. Any valid publicly visible licenses.",
      ).optional(),
      mode: z.enum([
        "DISK_MODE_UNSPECIFIED",
        "READ_WRITE",
        "READ_ONLY",
        "LOCKED",
      ]).describe("Optional. The mode in which to attach this disk.")
        .optional(),
      savedState: z.enum(["DISK_SAVED_STATE_UNSPECIFIED", "PRESERVED"])
        .describe("Optional. Output only. The state of the disk.").optional(),
      source: z.string().describe(
        "Optional. Specifies a valid partial or full URL to an existing Persistent Disk resource.",
      ).optional(),
      type: z.enum(["DISK_TYPE_UNSPECIFIED", "SCRATCH", "PERSISTENT"]).describe(
        "Optional. Specifies the type of the disk.",
      ).optional(),
    })).describe(
      "An array of disks that are associated with the instances that are created from these properties.",
    ).optional(),
    guestAccelerator: z.array(z.object({
      acceleratorCount: z.number().int().describe(
        "Optional. The number of the guest accelerator cards exposed to this instance.",
      ).optional(),
      acceleratorType: z.string().describe(
        "Optional. Full or partial URL of the accelerator type resource to attach to this instance.",
      ).optional(),
    })).describe(
      "A list of guest accelerator cards' type and count to use for instances created from these properties.",
    ).optional(),
    guestFlush: z.boolean().describe(
      "Optional. Indicates whether to perform a guest flush operation before taking a compute backup. When set to false, the system will create crash-consistent backups. Default value is false.",
    ).optional(),
    keyRevocationActionType: z.enum([
      "KEY_REVOCATION_ACTION_TYPE_UNSPECIFIED",
      "NONE",
      "STOP",
    ]).describe(
      'KeyRevocationActionType of the instance. Supported options are "STOP" and "NONE". The default value is "NONE" if it is not specified.',
    ).optional(),
    labels: z.record(z.string(), z.string()).describe(
      "Labels to apply to instances that are created from these properties.",
    ).optional(),
    machineType: z.string().describe(
      "The machine type to use for instances that are created from these properties.",
    ).optional(),
    metadata: z.object({
      items: z.array(z.object({
        key: z.string().describe("Optional. Key for the metadata entry.")
          .optional(),
        value: z.string().describe(
          "Optional. Value for the metadata entry. These are free-form strings, and only have meaning as interpreted by the image running in the instance. The only restriction placed on values is that their size must be less than or equal to 262144 bytes (256 KiB).",
        ).optional(),
      })).describe(
        "Optional. Array of key/value pairs. The total size of all keys and values must be less than 512 KB.",
      ).optional(),
    }).describe("A metadata key/value entry.").optional(),
    minCpuPlatform: z.string().describe(
      "Minimum cpu/platform to be used by instances. The instance may be scheduled on the specified or newer cpu/platform. Applicable values are the friendly names of CPU platforms, such as `minCpuPlatform: Intel Haswell` or `minCpuPlatform: Intel Sandy Bridge`. For more information, read https://cloud.google.com/compute/docs/instances/specify-min-cpu-platform.",
    ).optional(),
    networkInterface: z.array(z.object({
      accessConfigs: z.array(z.object({
        externalIpv6: z.unknown().describe(
          "Optional. The external IPv6 address of this access configuration.",
        ).optional(),
        externalIpv6PrefixLength: z.unknown().describe(
          "Optional. The prefix length of the external IPv6 range.",
        ).optional(),
        name: z.unknown().describe(
          "Optional. The name of this access configuration.",
        ).optional(),
        natIP: z.unknown().describe(
          "Optional. The external IP address of this access configuration.",
        ).optional(),
        networkTier: z.unknown().describe(
          "Optional. This signifies the networking tier used for configuring this access",
        ).optional(),
        publicPtrDomainName: z.unknown().describe(
          "Optional. The DNS domain name for the public PTR record.",
        ).optional(),
        setPublicPtr: z.unknown().describe(
          "Optional. Specifies whether a public DNS 'PTR' record should be created to map the external IP address of the instance to a DNS domain name.",
        ).optional(),
        type: z.unknown().describe(
          "Optional. In accessConfigs (IPv4), the default and only option is ONE_TO_ONE_NAT. In ipv6AccessConfigs, the default and only option is DIRECT_IPV6.",
        ).optional(),
      })).describe(
        "Optional. An array of configurations for this interface. Currently, only one access config,ONE_TO_ONE_NAT is supported. If there are no accessConfigs specified, then this instance will have no external internet access.",
      ).optional(),
      aliasIpRanges: z.array(z.object({
        ipCidrRange: z.unknown().describe(
          "Optional. The IP alias ranges to allocate for this interface.",
        ).optional(),
        subnetworkRangeName: z.unknown().describe(
          "Optional. The name of a subnetwork secondary IP range from which to allocate an IP alias range. If not specified, the primary range of the subnetwork is used.",
        ).optional(),
      })).describe(
        "Optional. An array of alias IP ranges for this network interface. You can only specify this field for network interfaces in VPC networks.",
      ).optional(),
      internalIpv6PrefixLength: z.number().int().describe(
        "Optional. The prefix length of the primary internal IPv6 range.",
      ).optional(),
      ipv6AccessConfigs: z.array(z.object({
        externalIpv6: z.unknown().describe(
          "Optional. The external IPv6 address of this access configuration.",
        ).optional(),
        externalIpv6PrefixLength: z.unknown().describe(
          "Optional. The prefix length of the external IPv6 range.",
        ).optional(),
        name: z.unknown().describe(
          "Optional. The name of this access configuration.",
        ).optional(),
        natIP: z.unknown().describe(
          "Optional. The external IP address of this access configuration.",
        ).optional(),
        networkTier: z.unknown().describe(
          "Optional. This signifies the networking tier used for configuring this access",
        ).optional(),
        publicPtrDomainName: z.unknown().describe(
          "Optional. The DNS domain name for the public PTR record.",
        ).optional(),
        setPublicPtr: z.unknown().describe(
          "Optional. Specifies whether a public DNS 'PTR' record should be created to map the external IP address of the instance to a DNS domain name.",
        ).optional(),
        type: z.unknown().describe(
          "Optional. In accessConfigs (IPv4), the default and only option is ONE_TO_ONE_NAT. In ipv6AccessConfigs, the default and only option is DIRECT_IPV6.",
        ).optional(),
      })).describe(
        "Optional. An array of IPv6 access configurations for this interface. Currently, only one IPv6 access config, DIRECT_IPV6, is supported. If there is no ipv6AccessConfig specified, then this instance will have no external IPv6 Internet access.",
      ).optional(),
      ipv6AccessType: z.enum([
        "UNSPECIFIED_IPV6_ACCESS_TYPE",
        "INTERNAL",
        "EXTERNAL",
      ]).describe(
        "Optional. [Output Only] One of EXTERNAL, INTERNAL to indicate whether the IP can be accessed from the Internet. This field is always inherited from its subnetwork.",
      ).optional(),
      ipv6Address: z.string().describe(
        "Optional. An IPv6 internal network address for this network interface. To use a static internal IP address, it must be unused and in the same region as the instance's zone. If not specified, Google Cloud will automatically assign an internal IPv6 address from the instance's subnetwork.",
      ).optional(),
      name: z.string().describe(
        "Output only. [Output Only] The name of the network interface, which is generated by the server.",
      ).optional(),
      network: z.string().describe(
        "Optional. URL of the VPC network resource for this instance.",
      ).optional(),
      networkAttachment: z.string().describe(
        "Optional. The URL of the network attachment that this interface should connect to in the following format: projects/{project_number}/regions/{region_name}/networkAttachments/{network_attachment_name}.",
      ).optional(),
      networkIP: z.string().describe(
        "Optional. An IPv4 internal IP address to assign to the instance for this network interface. If not specified by the user, an unused internal IP is assigned by the system.",
      ).optional(),
      nicType: z.enum(["NIC_TYPE_UNSPECIFIED", "VIRTIO_NET", "GVNIC"]).describe(
        "Optional. The type of vNIC to be used on this interface. This may be gVNIC or VirtioNet.",
      ).optional(),
      queueCount: z.number().int().describe(
        "Optional. The networking queue count that's specified by users for the network interface. Both Rx and Tx queues will be set to this number. It'll be empty if not specified by the users.",
      ).optional(),
      stackType: z.enum(["STACK_TYPE_UNSPECIFIED", "IPV4_ONLY", "IPV4_IPV6"])
        .describe("The stack type for this network interface.").optional(),
      subnetwork: z.string().describe(
        "Optional. The URL of the Subnetwork resource for this instance.",
      ).optional(),
    })).describe(
      "An array of network access configurations for this interface.",
    ).optional(),
    scheduling: z.object({
      automaticRestart: z.boolean().describe(
        "Optional. Specifies whether the instance should be automatically restarted if it is terminated by Compute Engine (not terminated by a user).",
      ).optional(),
      instanceTerminationAction: z.enum([
        "INSTANCE_TERMINATION_ACTION_UNSPECIFIED",
        "DELETE",
        "STOP",
      ]).describe(
        "Optional. Specifies the termination action for the instance.",
      ).optional(),
      localSsdRecoveryTimeout: z.object({
        nanos: z.number().int().describe(
          "Optional. Span of time that's a fraction of a second at nanosecond resolution.",
        ).optional(),
        seconds: z.string().describe(
          "Optional. Span of time at a resolution of a second.",
        ).optional(),
      }).describe(
        'A SchedulingDuration represents a fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". Range is approximately 10,000 years.',
      ).optional(),
      minNodeCpus: z.number().int().describe(
        "Optional. The minimum number of virtual CPUs this instance will consume when running on a sole-tenant node.",
      ).optional(),
      nodeAffinities: z.array(z.object({
        key: z.string().describe(
          "Optional. Corresponds to the label key of Node resource.",
        ).optional(),
        operator: z.enum(["OPERATOR_UNSPECIFIED", "IN", "NOT_IN"]).describe(
          "Optional. Defines the operation of node selection.",
        ).optional(),
        values: z.array(z.unknown()).describe(
          "Optional. Corresponds to the label values of Node resource.",
        ).optional(),
      })).describe(
        "Optional. A set of node affinity and anti-affinity configurations. Overrides reservationAffinity.",
      ).optional(),
      onHostMaintenance: z.enum([
        "ON_HOST_MAINTENANCE_UNSPECIFIED",
        "TERMINATE",
        "MIGRATE",
      ]).describe(
        "Optional. Defines the maintenance behavior for this instance.",
      ).optional(),
      preemptible: z.boolean().describe(
        "Optional. Defines whether the instance is preemptible.",
      ).optional(),
      provisioningModel: z.enum([
        "PROVISIONING_MODEL_UNSPECIFIED",
        "STANDARD",
        "SPOT",
      ]).describe("Optional. Specifies the provisioning model of the instance.")
        .optional(),
    }).describe("Sets the scheduling options for an Instance.").optional(),
    serviceAccount: z.array(z.object({
      email: z.string().describe(
        "Optional. Email address of the service account.",
      ).optional(),
      scopes: z.array(z.string()).describe(
        "Optional. The list of scopes to be made available for this service account.",
      ).optional(),
    })).describe(
      "A list of service accounts with specified scopes. Access tokens for these service accounts are available to the instances that are created from these properties. Use metadata queries to obtain the access tokens for these instances.",
    ).optional(),
    sourceInstance: z.string().describe(
      "The source instance used to create this backup. This can be a partial or full URL to the resource. For example, the following are valid values: -https://www.googleapis.com/compute/v1/projects/project/zones/zone/instances/instance -projects/project/zones/zone/instances/instance",
    ).optional(),
    tags: z.object({
      items: z.array(z.string()).describe(
        "Optional. An array of tags. Each tag must be 1-63 characters long, and comply with RFC1035.",
      ).optional(),
    }).describe("A set of instance tags.").optional(),
  }).describe(
    "ComputeInstanceBackupProperties represents Compute Engine instance backup properties.",
  ).optional(),
  consistencyTime: z.string().describe(
    "Output only. The point in time when this backup was captured from the source.",
  ).optional(),
  createTime: z.string().describe(
    "Output only. The time when the instance was created.",
  ).optional(),
  description: z.string().describe(
    "Output only. The description of the Backup instance (2048 characters or less).",
  ).optional(),
  diskBackupProperties: z.object({
    accessMode: z.string().describe("The access mode of the source disk.")
      .optional(),
    architecture: z.enum(["ARCHITECTURE_UNSPECIFIED", "X86_64", "ARM64"])
      .describe(
        "The architecture of the source disk. Valid values are ARM64 or X86_64.",
      ).optional(),
    description: z.string().describe("A description of the source disk.")
      .optional(),
    enableConfidentialCompute: z.boolean().describe(
      "Indicates whether the source disk is using confidential compute mode.",
    ).optional(),
    guestFlush: z.boolean().describe(
      "Optional. Defines if the guest flush is enabled for the source disk. Default value is false.",
    ).optional(),
    guestOsFeature: z.array(z.object({
      type: z.enum([
        "FEATURE_TYPE_UNSPECIFIED",
        "VIRTIO_SCSI_MULTIQUEUE",
        "WINDOWS",
        "MULTI_IP_SUBNET",
        "UEFI_COMPATIBLE",
        "SECURE_BOOT",
        "GVNIC",
        "SEV_CAPABLE",
        "BARE_METAL_LINUX_COMPATIBLE",
        "SUSPEND_RESUME_COMPATIBLE",
        "SEV_LIVE_MIGRATABLE",
        "SEV_SNP_CAPABLE",
        "TDX_CAPABLE",
        "IDPF",
        "SEV_LIVE_MIGRATABLE_V2",
      ]).describe("The ID of a supported feature.").optional(),
    })).describe(
      "A list of guest OS features that are applicable to this backup.",
    ).optional(),
    labels: z.record(z.string(), z.string()).describe(
      "The labels of the source disk.",
    ).optional(),
    licenses: z.array(z.string()).describe(
      "A list of publicly available licenses that are applicable to this backup. This is applicable if the original image had licenses attached, e.g. Windows image.",
    ).optional(),
    physicalBlockSizeBytes: z.string().describe(
      "The physical block size of the source disk.",
    ).optional(),
    provisionedIops: z.string().describe(
      "The number of IOPS provisioned for the source disk.",
    ).optional(),
    provisionedThroughput: z.string().describe(
      "The number of throughput provisioned for the source disk.",
    ).optional(),
    region: z.string().describe(
      "Region and zone are mutually exclusive fields. The URL of the region of the source disk.",
    ).optional(),
    replicaZones: z.array(z.string()).describe(
      "The URL of the Zones where the source disk should be replicated.",
    ).optional(),
    sizeGb: z.string().describe("Size(in GB) of the source disk.").optional(),
    sourceDisk: z.string().describe(
      "The source disk used to create this backup.",
    ).optional(),
    storagePool: z.string().describe("The storage pool of the source disk.")
      .optional(),
    type: z.string().describe("The URL of the type of the disk.").optional(),
    zone: z.string().describe("The URL of the Zone where the source disk.")
      .optional(),
  }).describe(
    "DiskBackupProperties represents the properties of a Disk backup.",
  ).optional(),
  enforcedRetentionEndTime: z.string().describe(
    "Optional. The backup can not be deleted before this time.",
  ).optional(),
  etag: z.string().describe(
    "Optional. Server specified ETag to prevent updates from overwriting each other.",
  ).optional(),
  expireTime: z.string().describe(
    "Optional. When this backup is automatically expired.",
  ).optional(),
  filestoreInstanceBackupProperties: z.object({
    sourceInstance: z.string().describe(
      "Output only. The source instance of the backup.",
    ).optional(),
  }).describe(
    "FilestoreInstanceBackupProperties represents the properties of a Filestore instance that are backed up by the datasource..",
  ).optional(),
  gcpBackupPlanInfo: z.object({
    backupPlan: z.string().describe(
      "Resource name of backup plan by which workload is protected at the time of the backup. Format: projects/{project}/locations/{location}/backupPlans/{backupPlanId}",
    ).optional(),
    backupPlanRevisionId: z.string().describe(
      "The user friendly id of the backup plan revision which triggered this backup in case of scheduled backup or used for on demand backup.",
    ).optional(),
    backupPlanRevisionName: z.string().describe(
      "Resource name of the backup plan revision which triggered this backup in case of scheduled backup or used for on demand backup. Format: projects/{project}/locations/{location}/backupPlans/{backupPlanId}/revisions/{revisionId}",
    ).optional(),
    backupPlanRuleId: z.string().describe(
      "The rule id of the backup plan which triggered this backup in case of scheduled backup or used for",
    ).optional(),
  }).describe(
    "GCPBackupPlanInfo captures the plan configuration details of Google Cloud resources at the time of backup.",
  ).optional(),
  gcpResource: z.object({
    gcpResourcename: z.string().describe("Name of the Google Cloud resource.")
      .optional(),
    location: z.string().describe(
      'Location of the resource: //"global"/"unspecified".',
    ).optional(),
    type: z.string().describe(
      "Type of the resource. Use the Unified Resource Type, eg. compute.googleapis.com/Instance.",
    ).optional(),
  }).describe(
    "Minimum details to identify a Google Cloud resource for a backup.",
  ).optional(),
  kmsKeyVersions: z.array(z.string()).describe(
    "Optional. Output only. The list of KMS key versions used to encrypt the backup.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Resource labels to represent user provided metadata. No labels currently defined.",
  ).optional(),
  name: z.string().describe(
    'Output only. Identifier. Name of the backup to create. It must have the format`"projects//locations//backupVaults//dataSources/{datasource}/backups/{backup}"`. `{backup}` cannot be changed after creation. It must be between 3-63 characters long and must be unique within the datasource.',
  ).optional(),
  resourceSizeBytes: z.string().describe(
    "Output only. source resource size in bytes at the time of the backup.",
  ).optional(),
  satisfiesPzi: z.boolean().describe(
    "Optional. Output only. Reserved for future use.",
  ).optional(),
  satisfiesPzs: z.boolean().describe(
    "Optional. Output only. Reserved for future use.",
  ).optional(),
  serviceLocks: z.array(z.object({
    backupApplianceLockInfo: z.object({
      backupApplianceId: z.string().describe(
        "Required. The ID of the backup/recovery appliance that created this lock.",
      ).optional(),
      backupApplianceName: z.string().describe(
        "Required. The name of the backup/recovery appliance that created this lock.",
      ).optional(),
      backupImage: z.string().describe(
        "The image name that depends on this Backup.",
      ).optional(),
      jobName: z.string().describe(
        "The job name on the backup/recovery appliance that created this lock.",
      ).optional(),
      lockReason: z.string().describe(
        "Required. The reason for the lock: e.g. MOUNT/RESTORE/BACKUP/etc. The value of this string is only meaningful to the client and it is not interpreted by the BackupVault service.",
      ).optional(),
      slaId: z.string().describe(
        "The SLA on the backup/recovery appliance that owns the lock.",
      ).optional(),
    }).describe(
      "BackupApplianceLockInfo contains metadata about the backupappliance that created the lock.",
    ).optional(),
    lockUntilTime: z.string().describe(
      "Required. The time after which this lock is not considered valid and will no longer protect the Backup from deletion.",
    ).optional(),
    serviceLockInfo: z.object({
      operation: z.string().describe(
        "Output only. The name of the operation that created this lock. The lock will automatically be released when the operation completes.",
      ).optional(),
    }).describe(
      "ServiceLockInfo represents the details of a lock taken by the service on a Backup resource.",
    ).optional(),
  })).describe(
    "Output only. The list of BackupLocks taken by the service to prevent the deletion of the backup.",
  ).optional(),
  state: z.enum([
    "STATE_UNSPECIFIED",
    "CREATING",
    "ACTIVE",
    "DELETING",
    "ERROR",
    "UPLOADING",
  ]).describe("Output only. The Backup resource instance state.").optional(),
  updateTime: z.string().describe(
    "Output only. The time when the instance was updated.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Backup and DR Service BackupVaults.DataSources.Backups. Registered at `@swamp/gcp/backupdr/backupvaults-datasources-backups`. */
export const model = {
  type: "@swamp/gcp/backupdr/backupvaults-datasources-backups",
  version: "2026.05.25.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.01.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Message describing a Backup object.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a backups",
      arguments: z.object({
        identifier: z.string().describe("The name of the backups"),
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
      description: "Update backups attributes",
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
        if (g["alloyDbBackupProperties"] !== undefined) {
          body["alloyDbBackupProperties"] = g["alloyDbBackupProperties"];
        }
        if (g["backupApplianceBackupProperties"] !== undefined) {
          body["backupApplianceBackupProperties"] =
            g["backupApplianceBackupProperties"];
        }
        if (g["backupApplianceLocks"] !== undefined) {
          body["backupApplianceLocks"] = g["backupApplianceLocks"];
        }
        if (g["backupRetentionInheritance"] !== undefined) {
          body["backupRetentionInheritance"] = g["backupRetentionInheritance"];
        }
        if (g["backupType"] !== undefined) body["backupType"] = g["backupType"];
        if (g["cloudSqlInstanceBackupProperties"] !== undefined) {
          body["cloudSqlInstanceBackupProperties"] =
            g["cloudSqlInstanceBackupProperties"];
        }
        if (g["computeInstanceBackupProperties"] !== undefined) {
          body["computeInstanceBackupProperties"] =
            g["computeInstanceBackupProperties"];
        }
        if (g["consistencyTime"] !== undefined) {
          body["consistencyTime"] = g["consistencyTime"];
        }
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["diskBackupProperties"] !== undefined) {
          body["diskBackupProperties"] = g["diskBackupProperties"];
        }
        if (g["enforcedRetentionEndTime"] !== undefined) {
          body["enforcedRetentionEndTime"] = g["enforcedRetentionEndTime"];
        }
        if (g["etag"] !== undefined) body["etag"] = g["etag"];
        if (g["expireTime"] !== undefined) body["expireTime"] = g["expireTime"];
        if (g["filestoreInstanceBackupProperties"] !== undefined) {
          body["filestoreInstanceBackupProperties"] =
            g["filestoreInstanceBackupProperties"];
        }
        if (g["gcpBackupPlanInfo"] !== undefined) {
          body["gcpBackupPlanInfo"] = g["gcpBackupPlanInfo"];
        }
        if (g["gcpResource"] !== undefined) {
          body["gcpResource"] = g["gcpResource"];
        }
        if (g["kmsKeyVersions"] !== undefined) {
          body["kmsKeyVersions"] = g["kmsKeyVersions"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["resourceSizeBytes"] !== undefined) {
          body["resourceSizeBytes"] = g["resourceSizeBytes"];
        }
        if (g["satisfiesPzi"] !== undefined) {
          body["satisfiesPzi"] = g["satisfiesPzi"];
        }
        if (g["satisfiesPzs"] !== undefined) {
          body["satisfiesPzs"] = g["satisfiesPzs"];
        }
        if (g["serviceLocks"] !== undefined) {
          body["serviceLocks"] = g["serviceLocks"];
        }
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["updateTime"] !== undefined) body["updateTime"] = g["updateTime"];
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
              "readyValues": ["ACTIVE"],
              "failedValues": ["ERROR"],
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
      description: "Delete the backups",
      arguments: z.object({
        identifier: z.string().describe("The name of the backups"),
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
      description: "Sync backups state from GCP",
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
    list: {
      description: "List backups resources",
      arguments: z.object({
        filter: z.string().describe("Optional. Filtering results.").optional(),
        orderBy: z.string().describe(
          "Optional. Hint for how to order the results.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default.",
        ).optional(),
        view: z.string().describe(
          "Optional. Reserved for future use to provide a BASIC & FULL view of Backup resource.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        if (args["view"] !== undefined) params["view"] = String(args["view"]);
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "backups",
          (args.maxPages as number | undefined) ?? 10,
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
    fetch_for_resource_type: {
      description: "fetch for resource type",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "backupdr.projects.locations.backupVaults.dataSources.backups.fetchForResourceType",
            "path": "v1/{+parent}/backups:fetchForResourceType",
            "httpMethod": "GET",
            "parameterOrder": ["parent"],
            "parameters": {
              "filter": { "location": "query" },
              "orderBy": { "location": "query" },
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
              "parent": { "location": "path", "required": true },
              "resourceType": { "location": "query" },
              "view": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    restore: {
      description: "restore",
      arguments: z.object({
        clearOverridesFieldMask: z.any().optional(),
        computeInstanceRestoreProperties: z.any().optional(),
        computeInstanceTargetEnvironment: z.any().optional(),
        diskRestoreProperties: z.any().optional(),
        diskTargetEnvironment: z.any().optional(),
        regionDiskTargetEnvironment: z.any().optional(),
        requestId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["clearOverridesFieldMask"] !== undefined) {
          body["clearOverridesFieldMask"] = args["clearOverridesFieldMask"];
        }
        if (args["computeInstanceRestoreProperties"] !== undefined) {
          body["computeInstanceRestoreProperties"] =
            args["computeInstanceRestoreProperties"];
        }
        if (args["computeInstanceTargetEnvironment"] !== undefined) {
          body["computeInstanceTargetEnvironment"] =
            args["computeInstanceTargetEnvironment"];
        }
        if (args["diskRestoreProperties"] !== undefined) {
          body["diskRestoreProperties"] = args["diskRestoreProperties"];
        }
        if (args["diskTargetEnvironment"] !== undefined) {
          body["diskTargetEnvironment"] = args["diskTargetEnvironment"];
        }
        if (args["regionDiskTargetEnvironment"] !== undefined) {
          body["regionDiskTargetEnvironment"] =
            args["regionDiskTargetEnvironment"];
        }
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "backupdr.projects.locations.backupVaults.dataSources.backups.restore",
            "path": "v1/{+name}:restore",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
