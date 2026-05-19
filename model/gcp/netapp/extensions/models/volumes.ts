// Auto-generated extension model for @swamp/gcp/netapp/volumes
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud NetApp Volumes.
 *
 * Volume provides a filesystem that you can mount.
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
  return `${parent}/volumes/${shortName}`;
}

const BASE_URL = "https://netapp.googleapis.com/";

const GET_CONFIG = {
  "id": "netapp.projects.locations.volumes.get",
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
  "id": "netapp.projects.locations.volumes.create",
  "path": "v1/{+parent}/volumes",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "volumeId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "netapp.projects.locations.volumes.patch",
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
  "id": "netapp.projects.locations.volumes.delete",
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

const GlobalArgsSchema = z.object({
  backupConfig: z.object({
    backupChainBytes: z.string().describe(
      "Output only. Total size of all backups in a chain in bytes = baseline backup size + sum(incremental backup size).",
    ).optional(),
    backupPolicies: z.array(z.string()).describe(
      "Optional. When specified, schedule backups will be created based on the policy configuration.",
    ).optional(),
    backupVault: z.string().describe(
      "Optional. Name of backup vault. Format: projects/{project_id}/locations/{location}/backupVaults/{backup_vault_id}",
    ).optional(),
    scheduledBackupEnabled: z.boolean().describe(
      "Optional. When set to true, scheduled backup is enabled on the volume. This field should be nil when there's no backup policy attached.",
    ).optional(),
  }).describe("BackupConfig contains backup related config on a volume.")
    .optional(),
  blockDevices: z.array(z.object({
    hostGroups: z.array(z.string()).describe(
      "Optional. A list of host groups that identify hosts that can mount the block volume. Format: `projects/{project_id}/locations/{location}/hostGroups/{host_group_id}` This field can be updated after the block device is created.",
    ).optional(),
    identifier: z.string().describe(
      "Output only. Device identifier of the block volume. This represents `lun_serial_number` for iSCSI volumes.",
    ).optional(),
    name: z.string().describe(
      'Optional. User-defined name for the block device, unique within the volume. In case no user input is provided, name will be auto-generated in the backend. The name must meet the following requirements: * Be between 1 and 255 characters long. * Contain only uppercase or lowercase letters (A-Z, a-z), numbers (0-9), and the following special characters: "-", "_", "}", "{", ".". * Spaces are not allowed.',
    ).optional(),
    osType: z.enum(["OS_TYPE_UNSPECIFIED", "LINUX", "WINDOWS", "ESXI"])
      .describe(
        "Required. Immutable. The OS type of the volume. This field can't be changed after the block device is created.",
      ).optional(),
    sizeGib: z.string().describe(
      "Optional. The size of the block device in GiB. Any value provided for the `size_gib` field during volume creation is ignored. The block device's size is system-managed and will be set to match the parent Volume's `capacity_gib`.",
    ).optional(),
  })).describe(
    "Optional. Block devices for the volume. Currently, only one block device is permitted per Volume.",
  ).optional(),
  cacheParameters: z.object({
    cacheConfig: z.object({
      cachePrePopulate: z.object({
        excludePathList: z.array(z.string()).describe(
          "Optional. List of directory-paths to be excluded for pre-population for the FlexCache volume.",
        ).optional(),
        pathList: z.array(z.string()).describe(
          "Optional. List of directory-paths to be pre-populated for the FlexCache volume.",
        ).optional(),
        recursion: z.boolean().describe(
          "Optional. Flag indicating whether the directories listed with the `path_list` need to be recursively pre-populated.",
        ).optional(),
      }).describe("Pre-populate cache volume with data from the origin volume.")
        .optional(),
      cachePrePopulateState: z.enum([
        "CACHE_PRE_POPULATE_STATE_UNSPECIFIED",
        "NOT_NEEDED",
        "IN_PROGRESS",
        "COMPLETE",
        "ERROR",
      ]).describe(
        "Output only. State of the prepopulation job indicating how the prepopulation is progressing.",
      ).optional(),
      cifsChangeNotifyEnabled: z.boolean().describe(
        "Optional. Flag indicating whether a CIFS change notification is enabled for the FlexCache volume.",
      ).optional(),
      writebackEnabled: z.boolean().describe(
        "Optional. Flag indicating whether writeback is enabled for the FlexCache volume.",
      ).optional(),
    }).describe("Configuration of the cache volume.").optional(),
    cacheState: z.enum([
      "CACHE_STATE_UNSPECIFIED",
      "PENDING_CLUSTER_PEERING",
      "PENDING_SVM_PEERING",
      "PEERED",
      "ERROR",
    ]).describe(
      "Output only. State of the cache volume indicating the peering status.",
    ).optional(),
    command: z.string().describe(
      "Output only. Copy-paste-able commands to be used on user's ONTAP to accept peering requests.",
    ).optional(),
    enableGlobalFileLock: z.boolean().describe(
      "Optional. Indicates whether the cache volume has global file lock enabled.",
    ).optional(),
    passphrase: z.string().describe(
      "Output only. Temporary passphrase generated to accept cluster peering command.",
    ).optional(),
    peerClusterName: z.string().describe(
      "Required. Name of the origin volume's ONTAP cluster.",
    ).optional(),
    peerIpAddresses: z.array(z.string()).describe(
      "Required. List of IC LIF addresses of the origin volume's ONTAP cluster.",
    ).optional(),
    peerSvmName: z.string().describe(
      "Required. Name of the origin volume's SVM.",
    ).optional(),
    peerVolumeName: z.string().describe(
      "Required. Name of the origin volume for the cache volume.",
    ).optional(),
    peeringCommandExpiryTime: z.string().describe(
      "Optional. Expiration time for the peering command to be executed on user's ONTAP.",
    ).optional(),
    stateDetails: z.string().describe(
      "Output only. Detailed description of the current cache state.",
    ).optional(),
  }).describe("Cache Parameters for the volume.").optional(),
  capacityGib: z.string().describe("Required. Capacity in GIB of the volume")
    .optional(),
  cloneDetails: z.object({
    sharedSpaceGib: z.string().describe(
      "Output only. Shared space in GiB. Determined at volume creation time based on size of source snapshot.",
    ).optional(),
    sourceSnapshot: z.string().describe(
      "Output only. Specifies the full resource name of the source snapshot from which this volume was cloned. Format: projects/{project}/locations/{location}/volumes/{volume}/snapshots/{snapshot}",
    ).optional(),
    sourceVolume: z.string().describe(
      "Output only. Full name of the source volume resource. Format: projects/{project}/locations/{location}/volumes/{volume}",
    ).optional(),
  }).describe("Details about a clone volume.").optional(),
  description: z.string().describe("Optional. Description of the volume")
    .optional(),
  exportPolicy: z.object({
    rules: z.array(z.object({
      accessType: z.enum([
        "ACCESS_TYPE_UNSPECIFIED",
        "READ_ONLY",
        "READ_WRITE",
        "READ_NONE",
      ]).describe("Access type (ReadWrite, ReadOnly, None)").optional(),
      allowedClients: z.string().describe(
        "Comma separated list of allowed clients IP addresses",
      ).optional(),
      anonUid: z.string().describe(
        "Optional. An integer representing the anonymous user ID. Range is 0 to `4294967295`. Required when `squash_mode` is `ROOT_SQUASH` or `ALL_SQUASH`.",
      ).optional(),
      hasRootAccess: z.string().describe(
        "Whether Unix root access will be granted.",
      ).optional(),
      kerberos5ReadOnly: z.boolean().describe(
        "If enabled (true) the rule defines a read only access for clients matching the 'allowedClients' specification. It enables nfs clients to mount using 'authentication' kerberos security mode.",
      ).optional(),
      kerberos5ReadWrite: z.boolean().describe(
        "If enabled (true) the rule defines read and write access for clients matching the 'allowedClients' specification. It enables nfs clients to mount using 'authentication' kerberos security mode. The 'kerberos5ReadOnly' value be ignored if this is enabled.",
      ).optional(),
      kerberos5iReadOnly: z.boolean().describe(
        "If enabled (true) the rule defines a read only access for clients matching the 'allowedClients' specification. It enables nfs clients to mount using 'integrity' kerberos security mode.",
      ).optional(),
      kerberos5iReadWrite: z.boolean().describe(
        "If enabled (true) the rule defines read and write access for clients matching the 'allowedClients' specification. It enables nfs clients to mount using 'integrity' kerberos security mode. The 'kerberos5iReadOnly' value be ignored if this is enabled.",
      ).optional(),
      kerberos5pReadOnly: z.boolean().describe(
        "If enabled (true) the rule defines a read only access for clients matching the 'allowedClients' specification. It enables nfs clients to mount using 'privacy' kerberos security mode.",
      ).optional(),
      kerberos5pReadWrite: z.boolean().describe(
        "If enabled (true) the rule defines read and write access for clients matching the 'allowedClients' specification. It enables nfs clients to mount using 'privacy' kerberos security mode. The 'kerberos5pReadOnly' value be ignored if this is enabled.",
      ).optional(),
      nfsv3: z.boolean().describe("NFS V3 protocol.").optional(),
      nfsv4: z.boolean().describe("NFS V4 protocol.").optional(),
      squashMode: z.enum([
        "SQUASH_MODE_UNSPECIFIED",
        "NO_ROOT_SQUASH",
        "ROOT_SQUASH",
        "ALL_SQUASH",
      ]).describe(
        "Optional. Defines how user identity squashing is applied for this export rule. This field is the preferred way to configure squashing behavior and takes precedence over `has_root_access` if both are provided.",
      ).optional(),
    })).describe("Required. List of export policy rules").optional(),
  }).describe("Defines the export policy for the volume.").optional(),
  hybridReplicationParameters: z.object({
    clusterLocation: z.string().describe(
      "Optional. Name of source cluster location associated with the Hybrid replication. This is a free-form field for the display purpose only.",
    ).optional(),
    description: z.string().describe(
      "Optional. Description of the replication.",
    ).optional(),
    hybridReplicationType: z.enum([
      "VOLUME_HYBRID_REPLICATION_TYPE_UNSPECIFIED",
      "MIGRATION",
      "CONTINUOUS_REPLICATION",
      "ONPREM_REPLICATION",
      "REVERSE_ONPREM_REPLICATION",
    ]).describe("Optional. Type of the hybrid replication.").optional(),
    labels: z.record(z.string(), z.string()).describe(
      "Optional. Labels to be added to the replication as the key value pairs.",
    ).optional(),
    largeVolumeConstituentCount: z.number().int().describe(
      "Optional. Constituent volume count for large volume.",
    ).optional(),
    peerClusterName: z.string().describe(
      "Required. Name of the user's local source cluster to be peered with the destination cluster.",
    ).optional(),
    peerIpAddresses: z.array(z.string()).describe(
      "Required. List of node ip addresses to be peered with.",
    ).optional(),
    peerSvmName: z.string().describe(
      "Required. Name of the user's local source vserver svm to be peered with the destination vserver svm.",
    ).optional(),
    peerVolumeName: z.string().describe(
      "Required. Name of the user's local source volume to be peered with the destination volume.",
    ).optional(),
    replication: z.string().describe(
      "Required. Desired name for the replication of this volume.",
    ).optional(),
    replicationSchedule: z.enum([
      "HYBRID_REPLICATION_SCHEDULE_UNSPECIFIED",
      "EVERY_10_MINUTES",
      "HOURLY",
      "DAILY",
    ]).describe("Optional. Replication Schedule for the replication created.")
      .optional(),
  }).describe("The Hybrid Replication parameters for the volume.").optional(),
  kerberosEnabled: z.boolean().describe(
    "Optional. Flag indicating if the volume is a kerberos volume or not, export policy rules control kerberos security modes (krb5, krb5i, krb5p).",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels as key value pairs",
  ).optional(),
  largeCapacity: z.boolean().describe(
    "Optional. Flag indicating if the volume will be a large capacity volume or a regular volume.",
  ).optional(),
  largeCapacityConfig: z.object({
    constituentCount: z.number().int().describe(
      "Optional. The number of internal constituents (e.g., FlexVols) for this large volume. The minimum number of constituents is 2.",
    ).optional(),
  }).describe(
    "Configuration for a Large Capacity Volume. A Large Capacity Volume supports sizes ranging from 4.8 TiB to 20 PiB, it is composed of multiple internal constituents, and must be created in a large capacity pool.",
  ).optional(),
  multipleEndpoints: z.boolean().describe(
    "Optional. Flag indicating if the volume will have an IP address per node for volumes supporting multiple IP endpoints. Only the volume with large_capacity will be allowed to have multiple endpoints.",
  ).optional(),
  name: z.string().describe("Identifier. Name of the volume").optional(),
  protocols: z.array(
    z.enum(["PROTOCOLS_UNSPECIFIED", "NFSV3", "NFSV4", "SMB", "ISCSI"]),
  ).describe("Required. Protocols required for the volume").optional(),
  restoreParameters: z.object({
    sourceBackup: z.string().describe(
      "Full name of the backup resource. Format for standard backup: projects/{project}/locations/{location}/backupVaults/{backup_vault_id}/backups/{backup_id} Format for BackupDR backup: projects/{project}/locations/{location}/backupVaults/{backup_vault}/dataSources/{data_source}/backups/{backup}",
    ).optional(),
    sourceSnapshot: z.string().describe(
      "Full name of the snapshot resource. Format: projects/{project}/locations/{location}/volumes/{volume}/snapshots/{snapshot}",
    ).optional(),
  }).describe(
    "The RestoreParameters if volume is created from a snapshot or backup.",
  ).optional(),
  restrictedActions: z.array(
    z.enum(["RESTRICTED_ACTION_UNSPECIFIED", "DELETE"]),
  ).describe("Optional. List of actions that are restricted on this volume.")
    .optional(),
  securityStyle: z.enum(["SECURITY_STYLE_UNSPECIFIED", "NTFS", "UNIX"])
    .describe("Optional. Security Style of the Volume").optional(),
  shareName: z.string().describe("Required. Share name of the volume")
    .optional(),
  smbSettings: z.array(
    z.enum([
      "SMB_SETTINGS_UNSPECIFIED",
      "ENCRYPT_DATA",
      "BROWSABLE",
      "CHANGE_NOTIFY",
      "NON_BROWSABLE",
      "OPLOCKS",
      "SHOW_SNAPSHOT",
      "SHOW_PREVIOUS_VERSIONS",
      "ACCESS_BASED_ENUMERATION",
      "CONTINUOUSLY_AVAILABLE",
    ]),
  ).describe("Optional. SMB share settings for the volume.").optional(),
  snapReserve: z.number().describe(
    "Optional. Snap_reserve specifies percentage of volume storage reserved for snapshot storage. Default is 0 percent.",
  ).optional(),
  snapshotDirectory: z.boolean().describe(
    "Optional. Snapshot_directory if enabled (true) the volume will contain a read-only.snapshot directory which provides access to each of the volume's snapshots.",
  ).optional(),
  snapshotPolicy: z.object({
    dailySchedule: z.object({
      hour: z.number().describe(
        "Set the hour to start the snapshot (0-23), defaults to midnight (0).",
      ).optional(),
      minute: z.number().describe(
        "Set the minute of the hour to start the snapshot (0-59), defaults to the top of the hour (0).",
      ).optional(),
      snapshotsToKeep: z.number().describe(
        "The maximum number of Snapshots to keep for the hourly schedule",
      ).optional(),
    }).describe("Make a snapshot every day e.g. at 04:00, 05:20, 23:50")
      .optional(),
    enabled: z.boolean().describe(
      "If enabled, make snapshots automatically according to the schedules. Default is false.",
    ).optional(),
    hourlySchedule: z.object({
      minute: z.number().describe(
        "Set the minute of the hour to start the snapshot (0-59), defaults to the top of the hour (0).",
      ).optional(),
      snapshotsToKeep: z.number().describe(
        "The maximum number of Snapshots to keep for the hourly schedule",
      ).optional(),
    }).describe("Make a snapshot every hour e.g. at 04:00, 05:00, 06:00.")
      .optional(),
    monthlySchedule: z.object({
      daysOfMonth: z.string().describe(
        "Set the day or days of the month to make a snapshot (1-31). Accepts a comma separated number of days. Defaults to '1'.",
      ).optional(),
      hour: z.number().describe(
        "Set the hour to start the snapshot (0-23), defaults to midnight (0).",
      ).optional(),
      minute: z.number().describe(
        "Set the minute of the hour to start the snapshot (0-59), defaults to the top of the hour (0).",
      ).optional(),
      snapshotsToKeep: z.number().describe(
        "The maximum number of Snapshots to keep for the hourly schedule",
      ).optional(),
    }).describe(
      "Make a snapshot once a month e.g. at 2nd 04:00, 7th 05:20, 24th 23:50",
    ).optional(),
    weeklySchedule: z.object({
      day: z.string().describe(
        "Set the day or days of the week to make a snapshot. Accepts a comma separated days of the week. Defaults to 'Sunday'.",
      ).optional(),
      hour: z.number().describe(
        "Set the hour to start the snapshot (0-23), defaults to midnight (0).",
      ).optional(),
      minute: z.number().describe(
        "Set the minute of the hour to start the snapshot (0-59), defaults to the top of the hour (0).",
      ).optional(),
      snapshotsToKeep: z.number().describe(
        "The maximum number of Snapshots to keep for the hourly schedule",
      ).optional(),
    }).describe(
      "Make a snapshot every week e.g. at Monday 04:00, Wednesday 05:20, Sunday 23:50",
    ).optional(),
  }).describe("Snapshot Policy for a volume.").optional(),
  storagePool: z.string().describe("Required. StoragePool name of the volume")
    .optional(),
  throughputMibps: z.number().describe(
    "Optional. Throughput of the volume (in MiB/s)",
  ).optional(),
  tieringPolicy: z.object({
    coolingThresholdDays: z.number().int().describe(
      "Optional. Time in days to mark the volume's data block as cold and make it eligible for tiering, can be range from 2-183. Default is 31.",
    ).optional(),
    hotTierBypassModeEnabled: z.boolean().describe(
      "Optional. Flag indicating that the hot tier bypass mode is enabled. Default is false. This is only applicable to Flex service level.",
    ).optional(),
    tierAction: z.enum(["TIER_ACTION_UNSPECIFIED", "ENABLED", "PAUSED"])
      .describe(
        "Optional. Flag indicating if the volume has tiering policy enable/pause. Default is PAUSED.",
      ).optional(),
  }).describe("Defines tiering policy for the volume.").optional(),
  unixPermissions: z.string().describe(
    "Optional. Default unix style permission (e.g. 777) the mount point will be created with. Applicable for NFS protocol types only.",
  ).optional(),
  volumeId: z.string().describe(
    "Required. Id of the requesting volume. Must be unique within the parent resource. Must contain only letters, numbers and hyphen, with the first character a letter, the last a letter or a number, and a 63 character maximum.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  activeDirectory: z.string().optional(),
  backupConfig: z.object({
    backupChainBytes: z.string(),
    backupPolicies: z.array(z.string()),
    backupVault: z.string(),
    scheduledBackupEnabled: z.boolean(),
  }).optional(),
  blockDevices: z.array(z.object({
    hostGroups: z.array(z.string()),
    identifier: z.string(),
    name: z.string(),
    osType: z.string(),
    sizeGib: z.string(),
  })).optional(),
  cacheParameters: z.object({
    cacheConfig: z.object({
      cachePrePopulate: z.object({
        excludePathList: z.array(z.string()),
        pathList: z.array(z.string()),
        recursion: z.boolean(),
      }),
      cachePrePopulateState: z.string(),
      cifsChangeNotifyEnabled: z.boolean(),
      writebackEnabled: z.boolean(),
    }),
    cacheState: z.string(),
    command: z.string(),
    enableGlobalFileLock: z.boolean(),
    passphrase: z.string(),
    peerClusterName: z.string(),
    peerIpAddresses: z.array(z.string()),
    peerSvmName: z.string(),
    peerVolumeName: z.string(),
    peeringCommandExpiryTime: z.string(),
    stateDetails: z.string(),
  }).optional(),
  capacityGib: z.string().optional(),
  cloneDetails: z.object({
    sharedSpaceGib: z.string(),
    sourceSnapshot: z.string(),
    sourceVolume: z.string(),
  }).optional(),
  coldTierSizeGib: z.string().optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  encryptionType: z.string().optional(),
  exportPolicy: z.object({
    rules: z.array(z.object({
      accessType: z.string(),
      allowedClients: z.string(),
      anonUid: z.string(),
      hasRootAccess: z.string(),
      kerberos5ReadOnly: z.boolean(),
      kerberos5ReadWrite: z.boolean(),
      kerberos5iReadOnly: z.boolean(),
      kerberos5iReadWrite: z.boolean(),
      kerberos5pReadOnly: z.boolean(),
      kerberos5pReadWrite: z.boolean(),
      nfsv3: z.boolean(),
      nfsv4: z.boolean(),
      squashMode: z.string(),
    })),
  }).optional(),
  hasReplication: z.boolean().optional(),
  hotTierSizeUsedGib: z.string().optional(),
  hybridReplicationParameters: z.object({
    clusterLocation: z.string(),
    description: z.string(),
    hybridReplicationType: z.string(),
    labels: z.record(z.string(), z.unknown()),
    largeVolumeConstituentCount: z.number(),
    peerClusterName: z.string(),
    peerIpAddresses: z.array(z.string()),
    peerSvmName: z.string(),
    peerVolumeName: z.string(),
    replication: z.string(),
    replicationSchedule: z.string(),
  }).optional(),
  kerberosEnabled: z.boolean().optional(),
  kmsConfig: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  largeCapacity: z.boolean().optional(),
  largeCapacityConfig: z.object({
    constituentCount: z.number(),
  }).optional(),
  ldapEnabled: z.boolean().optional(),
  mountOptions: z.array(z.object({
    export: z.string(),
    exportFull: z.string(),
    instructions: z.string(),
    ipAddress: z.string(),
    protocol: z.string(),
  })).optional(),
  multipleEndpoints: z.boolean().optional(),
  name: z.string(),
  network: z.string().optional(),
  protocols: z.array(z.string()).optional(),
  psaRange: z.string().optional(),
  replicaZone: z.string().optional(),
  restoreParameters: z.object({
    sourceBackup: z.string(),
    sourceSnapshot: z.string(),
  }).optional(),
  restrictedActions: z.array(z.string()).optional(),
  securityStyle: z.string().optional(),
  serviceLevel: z.string().optional(),
  shareName: z.string().optional(),
  smbSettings: z.array(z.string()).optional(),
  snapReserve: z.number().optional(),
  snapshotDirectory: z.boolean().optional(),
  snapshotPolicy: z.object({
    dailySchedule: z.object({
      hour: z.number(),
      minute: z.number(),
      snapshotsToKeep: z.number(),
    }),
    enabled: z.boolean(),
    hourlySchedule: z.object({
      minute: z.number(),
      snapshotsToKeep: z.number(),
    }),
    monthlySchedule: z.object({
      daysOfMonth: z.string(),
      hour: z.number(),
      minute: z.number(),
      snapshotsToKeep: z.number(),
    }),
    weeklySchedule: z.object({
      day: z.string(),
      hour: z.number(),
      minute: z.number(),
      snapshotsToKeep: z.number(),
    }),
  }).optional(),
  state: z.string().optional(),
  stateDetails: z.string().optional(),
  storagePool: z.string().optional(),
  throughputMibps: z.number().optional(),
  tieringPolicy: z.object({
    coolingThresholdDays: z.number(),
    hotTierBypassModeEnabled: z.boolean(),
    tierAction: z.string(),
  }).optional(),
  unixPermissions: z.string().optional(),
  usedGib: z.string().optional(),
  zone: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  backupConfig: z.object({
    backupChainBytes: z.string().describe(
      "Output only. Total size of all backups in a chain in bytes = baseline backup size + sum(incremental backup size).",
    ).optional(),
    backupPolicies: z.array(z.string()).describe(
      "Optional. When specified, schedule backups will be created based on the policy configuration.",
    ).optional(),
    backupVault: z.string().describe(
      "Optional. Name of backup vault. Format: projects/{project_id}/locations/{location}/backupVaults/{backup_vault_id}",
    ).optional(),
    scheduledBackupEnabled: z.boolean().describe(
      "Optional. When set to true, scheduled backup is enabled on the volume. This field should be nil when there's no backup policy attached.",
    ).optional(),
  }).describe("BackupConfig contains backup related config on a volume.")
    .optional(),
  blockDevices: z.array(z.object({
    hostGroups: z.array(z.string()).describe(
      "Optional. A list of host groups that identify hosts that can mount the block volume. Format: `projects/{project_id}/locations/{location}/hostGroups/{host_group_id}` This field can be updated after the block device is created.",
    ).optional(),
    identifier: z.string().describe(
      "Output only. Device identifier of the block volume. This represents `lun_serial_number` for iSCSI volumes.",
    ).optional(),
    name: z.string().describe(
      'Optional. User-defined name for the block device, unique within the volume. In case no user input is provided, name will be auto-generated in the backend. The name must meet the following requirements: * Be between 1 and 255 characters long. * Contain only uppercase or lowercase letters (A-Z, a-z), numbers (0-9), and the following special characters: "-", "_", "}", "{", ".". * Spaces are not allowed.',
    ).optional(),
    osType: z.enum(["OS_TYPE_UNSPECIFIED", "LINUX", "WINDOWS", "ESXI"])
      .describe(
        "Required. Immutable. The OS type of the volume. This field can't be changed after the block device is created.",
      ).optional(),
    sizeGib: z.string().describe(
      "Optional. The size of the block device in GiB. Any value provided for the `size_gib` field during volume creation is ignored. The block device's size is system-managed and will be set to match the parent Volume's `capacity_gib`.",
    ).optional(),
  })).describe(
    "Optional. Block devices for the volume. Currently, only one block device is permitted per Volume.",
  ).optional(),
  cacheParameters: z.object({
    cacheConfig: z.object({
      cachePrePopulate: z.object({
        excludePathList: z.array(z.string()).describe(
          "Optional. List of directory-paths to be excluded for pre-population for the FlexCache volume.",
        ).optional(),
        pathList: z.array(z.string()).describe(
          "Optional. List of directory-paths to be pre-populated for the FlexCache volume.",
        ).optional(),
        recursion: z.boolean().describe(
          "Optional. Flag indicating whether the directories listed with the `path_list` need to be recursively pre-populated.",
        ).optional(),
      }).describe("Pre-populate cache volume with data from the origin volume.")
        .optional(),
      cachePrePopulateState: z.enum([
        "CACHE_PRE_POPULATE_STATE_UNSPECIFIED",
        "NOT_NEEDED",
        "IN_PROGRESS",
        "COMPLETE",
        "ERROR",
      ]).describe(
        "Output only. State of the prepopulation job indicating how the prepopulation is progressing.",
      ).optional(),
      cifsChangeNotifyEnabled: z.boolean().describe(
        "Optional. Flag indicating whether a CIFS change notification is enabled for the FlexCache volume.",
      ).optional(),
      writebackEnabled: z.boolean().describe(
        "Optional. Flag indicating whether writeback is enabled for the FlexCache volume.",
      ).optional(),
    }).describe("Configuration of the cache volume.").optional(),
    cacheState: z.enum([
      "CACHE_STATE_UNSPECIFIED",
      "PENDING_CLUSTER_PEERING",
      "PENDING_SVM_PEERING",
      "PEERED",
      "ERROR",
    ]).describe(
      "Output only. State of the cache volume indicating the peering status.",
    ).optional(),
    command: z.string().describe(
      "Output only. Copy-paste-able commands to be used on user's ONTAP to accept peering requests.",
    ).optional(),
    enableGlobalFileLock: z.boolean().describe(
      "Optional. Indicates whether the cache volume has global file lock enabled.",
    ).optional(),
    passphrase: z.string().describe(
      "Output only. Temporary passphrase generated to accept cluster peering command.",
    ).optional(),
    peerClusterName: z.string().describe(
      "Required. Name of the origin volume's ONTAP cluster.",
    ).optional(),
    peerIpAddresses: z.array(z.string()).describe(
      "Required. List of IC LIF addresses of the origin volume's ONTAP cluster.",
    ).optional(),
    peerSvmName: z.string().describe(
      "Required. Name of the origin volume's SVM.",
    ).optional(),
    peerVolumeName: z.string().describe(
      "Required. Name of the origin volume for the cache volume.",
    ).optional(),
    peeringCommandExpiryTime: z.string().describe(
      "Optional. Expiration time for the peering command to be executed on user's ONTAP.",
    ).optional(),
    stateDetails: z.string().describe(
      "Output only. Detailed description of the current cache state.",
    ).optional(),
  }).describe("Cache Parameters for the volume.").optional(),
  capacityGib: z.string().describe("Required. Capacity in GIB of the volume")
    .optional(),
  cloneDetails: z.object({
    sharedSpaceGib: z.string().describe(
      "Output only. Shared space in GiB. Determined at volume creation time based on size of source snapshot.",
    ).optional(),
    sourceSnapshot: z.string().describe(
      "Output only. Specifies the full resource name of the source snapshot from which this volume was cloned. Format: projects/{project}/locations/{location}/volumes/{volume}/snapshots/{snapshot}",
    ).optional(),
    sourceVolume: z.string().describe(
      "Output only. Full name of the source volume resource. Format: projects/{project}/locations/{location}/volumes/{volume}",
    ).optional(),
  }).describe("Details about a clone volume.").optional(),
  description: z.string().describe("Optional. Description of the volume")
    .optional(),
  exportPolicy: z.object({
    rules: z.array(z.object({
      accessType: z.enum([
        "ACCESS_TYPE_UNSPECIFIED",
        "READ_ONLY",
        "READ_WRITE",
        "READ_NONE",
      ]).describe("Access type (ReadWrite, ReadOnly, None)").optional(),
      allowedClients: z.string().describe(
        "Comma separated list of allowed clients IP addresses",
      ).optional(),
      anonUid: z.string().describe(
        "Optional. An integer representing the anonymous user ID. Range is 0 to `4294967295`. Required when `squash_mode` is `ROOT_SQUASH` or `ALL_SQUASH`.",
      ).optional(),
      hasRootAccess: z.string().describe(
        "Whether Unix root access will be granted.",
      ).optional(),
      kerberos5ReadOnly: z.boolean().describe(
        "If enabled (true) the rule defines a read only access for clients matching the 'allowedClients' specification. It enables nfs clients to mount using 'authentication' kerberos security mode.",
      ).optional(),
      kerberos5ReadWrite: z.boolean().describe(
        "If enabled (true) the rule defines read and write access for clients matching the 'allowedClients' specification. It enables nfs clients to mount using 'authentication' kerberos security mode. The 'kerberos5ReadOnly' value be ignored if this is enabled.",
      ).optional(),
      kerberos5iReadOnly: z.boolean().describe(
        "If enabled (true) the rule defines a read only access for clients matching the 'allowedClients' specification. It enables nfs clients to mount using 'integrity' kerberos security mode.",
      ).optional(),
      kerberos5iReadWrite: z.boolean().describe(
        "If enabled (true) the rule defines read and write access for clients matching the 'allowedClients' specification. It enables nfs clients to mount using 'integrity' kerberos security mode. The 'kerberos5iReadOnly' value be ignored if this is enabled.",
      ).optional(),
      kerberos5pReadOnly: z.boolean().describe(
        "If enabled (true) the rule defines a read only access for clients matching the 'allowedClients' specification. It enables nfs clients to mount using 'privacy' kerberos security mode.",
      ).optional(),
      kerberos5pReadWrite: z.boolean().describe(
        "If enabled (true) the rule defines read and write access for clients matching the 'allowedClients' specification. It enables nfs clients to mount using 'privacy' kerberos security mode. The 'kerberos5pReadOnly' value be ignored if this is enabled.",
      ).optional(),
      nfsv3: z.boolean().describe("NFS V3 protocol.").optional(),
      nfsv4: z.boolean().describe("NFS V4 protocol.").optional(),
      squashMode: z.enum([
        "SQUASH_MODE_UNSPECIFIED",
        "NO_ROOT_SQUASH",
        "ROOT_SQUASH",
        "ALL_SQUASH",
      ]).describe(
        "Optional. Defines how user identity squashing is applied for this export rule. This field is the preferred way to configure squashing behavior and takes precedence over `has_root_access` if both are provided.",
      ).optional(),
    })).describe("Required. List of export policy rules").optional(),
  }).describe("Defines the export policy for the volume.").optional(),
  hybridReplicationParameters: z.object({
    clusterLocation: z.string().describe(
      "Optional. Name of source cluster location associated with the Hybrid replication. This is a free-form field for the display purpose only.",
    ).optional(),
    description: z.string().describe(
      "Optional. Description of the replication.",
    ).optional(),
    hybridReplicationType: z.enum([
      "VOLUME_HYBRID_REPLICATION_TYPE_UNSPECIFIED",
      "MIGRATION",
      "CONTINUOUS_REPLICATION",
      "ONPREM_REPLICATION",
      "REVERSE_ONPREM_REPLICATION",
    ]).describe("Optional. Type of the hybrid replication.").optional(),
    labels: z.record(z.string(), z.string()).describe(
      "Optional. Labels to be added to the replication as the key value pairs.",
    ).optional(),
    largeVolumeConstituentCount: z.number().int().describe(
      "Optional. Constituent volume count for large volume.",
    ).optional(),
    peerClusterName: z.string().describe(
      "Required. Name of the user's local source cluster to be peered with the destination cluster.",
    ).optional(),
    peerIpAddresses: z.array(z.string()).describe(
      "Required. List of node ip addresses to be peered with.",
    ).optional(),
    peerSvmName: z.string().describe(
      "Required. Name of the user's local source vserver svm to be peered with the destination vserver svm.",
    ).optional(),
    peerVolumeName: z.string().describe(
      "Required. Name of the user's local source volume to be peered with the destination volume.",
    ).optional(),
    replication: z.string().describe(
      "Required. Desired name for the replication of this volume.",
    ).optional(),
    replicationSchedule: z.enum([
      "HYBRID_REPLICATION_SCHEDULE_UNSPECIFIED",
      "EVERY_10_MINUTES",
      "HOURLY",
      "DAILY",
    ]).describe("Optional. Replication Schedule for the replication created.")
      .optional(),
  }).describe("The Hybrid Replication parameters for the volume.").optional(),
  kerberosEnabled: z.boolean().describe(
    "Optional. Flag indicating if the volume is a kerberos volume or not, export policy rules control kerberos security modes (krb5, krb5i, krb5p).",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels as key value pairs",
  ).optional(),
  largeCapacity: z.boolean().describe(
    "Optional. Flag indicating if the volume will be a large capacity volume or a regular volume.",
  ).optional(),
  largeCapacityConfig: z.object({
    constituentCount: z.number().int().describe(
      "Optional. The number of internal constituents (e.g., FlexVols) for this large volume. The minimum number of constituents is 2.",
    ).optional(),
  }).describe(
    "Configuration for a Large Capacity Volume. A Large Capacity Volume supports sizes ranging from 4.8 TiB to 20 PiB, it is composed of multiple internal constituents, and must be created in a large capacity pool.",
  ).optional(),
  multipleEndpoints: z.boolean().describe(
    "Optional. Flag indicating if the volume will have an IP address per node for volumes supporting multiple IP endpoints. Only the volume with large_capacity will be allowed to have multiple endpoints.",
  ).optional(),
  name: z.string().describe("Identifier. Name of the volume").optional(),
  protocols: z.array(
    z.enum(["PROTOCOLS_UNSPECIFIED", "NFSV3", "NFSV4", "SMB", "ISCSI"]),
  ).describe("Required. Protocols required for the volume").optional(),
  restoreParameters: z.object({
    sourceBackup: z.string().describe(
      "Full name of the backup resource. Format for standard backup: projects/{project}/locations/{location}/backupVaults/{backup_vault_id}/backups/{backup_id} Format for BackupDR backup: projects/{project}/locations/{location}/backupVaults/{backup_vault}/dataSources/{data_source}/backups/{backup}",
    ).optional(),
    sourceSnapshot: z.string().describe(
      "Full name of the snapshot resource. Format: projects/{project}/locations/{location}/volumes/{volume}/snapshots/{snapshot}",
    ).optional(),
  }).describe(
    "The RestoreParameters if volume is created from a snapshot or backup.",
  ).optional(),
  restrictedActions: z.array(
    z.enum(["RESTRICTED_ACTION_UNSPECIFIED", "DELETE"]),
  ).describe("Optional. List of actions that are restricted on this volume.")
    .optional(),
  securityStyle: z.enum(["SECURITY_STYLE_UNSPECIFIED", "NTFS", "UNIX"])
    .describe("Optional. Security Style of the Volume").optional(),
  shareName: z.string().describe("Required. Share name of the volume")
    .optional(),
  smbSettings: z.array(
    z.enum([
      "SMB_SETTINGS_UNSPECIFIED",
      "ENCRYPT_DATA",
      "BROWSABLE",
      "CHANGE_NOTIFY",
      "NON_BROWSABLE",
      "OPLOCKS",
      "SHOW_SNAPSHOT",
      "SHOW_PREVIOUS_VERSIONS",
      "ACCESS_BASED_ENUMERATION",
      "CONTINUOUSLY_AVAILABLE",
    ]),
  ).describe("Optional. SMB share settings for the volume.").optional(),
  snapReserve: z.number().describe(
    "Optional. Snap_reserve specifies percentage of volume storage reserved for snapshot storage. Default is 0 percent.",
  ).optional(),
  snapshotDirectory: z.boolean().describe(
    "Optional. Snapshot_directory if enabled (true) the volume will contain a read-only.snapshot directory which provides access to each of the volume's snapshots.",
  ).optional(),
  snapshotPolicy: z.object({
    dailySchedule: z.object({
      hour: z.number().describe(
        "Set the hour to start the snapshot (0-23), defaults to midnight (0).",
      ).optional(),
      minute: z.number().describe(
        "Set the minute of the hour to start the snapshot (0-59), defaults to the top of the hour (0).",
      ).optional(),
      snapshotsToKeep: z.number().describe(
        "The maximum number of Snapshots to keep for the hourly schedule",
      ).optional(),
    }).describe("Make a snapshot every day e.g. at 04:00, 05:20, 23:50")
      .optional(),
    enabled: z.boolean().describe(
      "If enabled, make snapshots automatically according to the schedules. Default is false.",
    ).optional(),
    hourlySchedule: z.object({
      minute: z.number().describe(
        "Set the minute of the hour to start the snapshot (0-59), defaults to the top of the hour (0).",
      ).optional(),
      snapshotsToKeep: z.number().describe(
        "The maximum number of Snapshots to keep for the hourly schedule",
      ).optional(),
    }).describe("Make a snapshot every hour e.g. at 04:00, 05:00, 06:00.")
      .optional(),
    monthlySchedule: z.object({
      daysOfMonth: z.string().describe(
        "Set the day or days of the month to make a snapshot (1-31). Accepts a comma separated number of days. Defaults to '1'.",
      ).optional(),
      hour: z.number().describe(
        "Set the hour to start the snapshot (0-23), defaults to midnight (0).",
      ).optional(),
      minute: z.number().describe(
        "Set the minute of the hour to start the snapshot (0-59), defaults to the top of the hour (0).",
      ).optional(),
      snapshotsToKeep: z.number().describe(
        "The maximum number of Snapshots to keep for the hourly schedule",
      ).optional(),
    }).describe(
      "Make a snapshot once a month e.g. at 2nd 04:00, 7th 05:20, 24th 23:50",
    ).optional(),
    weeklySchedule: z.object({
      day: z.string().describe(
        "Set the day or days of the week to make a snapshot. Accepts a comma separated days of the week. Defaults to 'Sunday'.",
      ).optional(),
      hour: z.number().describe(
        "Set the hour to start the snapshot (0-23), defaults to midnight (0).",
      ).optional(),
      minute: z.number().describe(
        "Set the minute of the hour to start the snapshot (0-59), defaults to the top of the hour (0).",
      ).optional(),
      snapshotsToKeep: z.number().describe(
        "The maximum number of Snapshots to keep for the hourly schedule",
      ).optional(),
    }).describe(
      "Make a snapshot every week e.g. at Monday 04:00, Wednesday 05:20, Sunday 23:50",
    ).optional(),
  }).describe("Snapshot Policy for a volume.").optional(),
  storagePool: z.string().describe("Required. StoragePool name of the volume")
    .optional(),
  throughputMibps: z.number().describe(
    "Optional. Throughput of the volume (in MiB/s)",
  ).optional(),
  tieringPolicy: z.object({
    coolingThresholdDays: z.number().int().describe(
      "Optional. Time in days to mark the volume's data block as cold and make it eligible for tiering, can be range from 2-183. Default is 31.",
    ).optional(),
    hotTierBypassModeEnabled: z.boolean().describe(
      "Optional. Flag indicating that the hot tier bypass mode is enabled. Default is false. This is only applicable to Flex service level.",
    ).optional(),
    tierAction: z.enum(["TIER_ACTION_UNSPECIFIED", "ENABLED", "PAUSED"])
      .describe(
        "Optional. Flag indicating if the volume has tiering policy enable/pause. Default is PAUSED.",
      ).optional(),
  }).describe("Defines tiering policy for the volume.").optional(),
  unixPermissions: z.string().describe(
    "Optional. Default unix style permission (e.g. 777) the mount point will be created with. Applicable for NFS protocol types only.",
  ).optional(),
  volumeId: z.string().describe(
    "Required. Id of the requesting volume. Must be unique within the parent resource. Must contain only letters, numbers and hyphen, with the first character a letter, the last a letter or a number, and a 63 character maximum.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud NetApp Volumes. Registered at `@swamp/gcp/netapp/volumes`. */
export const model = {
  type: "@swamp/gcp/netapp/volumes",
  version: "2026.05.19.2",
  upgrades: [
    {
      toVersion: "2026.03.31.1",
      description: "Removed: largeCapacityConfig",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { largeCapacityConfig: _largeCapacityConfig, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.04.01.1",
      description: "Added: largeCapacityConfig",
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
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.14.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.2",
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
      description: "Volume provides a filesystem that you can mount.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a volumes",
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
        if (g["backupConfig"] !== undefined) {
          body["backupConfig"] = g["backupConfig"];
        }
        if (g["blockDevices"] !== undefined) {
          body["blockDevices"] = g["blockDevices"];
        }
        if (g["cacheParameters"] !== undefined) {
          body["cacheParameters"] = g["cacheParameters"];
        }
        if (g["capacityGib"] !== undefined) {
          body["capacityGib"] = g["capacityGib"];
        }
        if (g["cloneDetails"] !== undefined) {
          body["cloneDetails"] = g["cloneDetails"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["exportPolicy"] !== undefined) {
          body["exportPolicy"] = g["exportPolicy"];
        }
        if (g["hybridReplicationParameters"] !== undefined) {
          body["hybridReplicationParameters"] =
            g["hybridReplicationParameters"];
        }
        if (g["kerberosEnabled"] !== undefined) {
          body["kerberosEnabled"] = g["kerberosEnabled"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["largeCapacity"] !== undefined) {
          body["largeCapacity"] = g["largeCapacity"];
        }
        if (g["largeCapacityConfig"] !== undefined) {
          body["largeCapacityConfig"] = g["largeCapacityConfig"];
        }
        if (g["multipleEndpoints"] !== undefined) {
          body["multipleEndpoints"] = g["multipleEndpoints"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["protocols"] !== undefined) body["protocols"] = g["protocols"];
        if (g["restoreParameters"] !== undefined) {
          body["restoreParameters"] = g["restoreParameters"];
        }
        if (g["restrictedActions"] !== undefined) {
          body["restrictedActions"] = g["restrictedActions"];
        }
        if (g["securityStyle"] !== undefined) {
          body["securityStyle"] = g["securityStyle"];
        }
        if (g["shareName"] !== undefined) body["shareName"] = g["shareName"];
        if (g["smbSettings"] !== undefined) {
          body["smbSettings"] = g["smbSettings"];
        }
        if (g["snapReserve"] !== undefined) {
          body["snapReserve"] = g["snapReserve"];
        }
        if (g["snapshotDirectory"] !== undefined) {
          body["snapshotDirectory"] = g["snapshotDirectory"];
        }
        if (g["snapshotPolicy"] !== undefined) {
          body["snapshotPolicy"] = g["snapshotPolicy"];
        }
        if (g["storagePool"] !== undefined) {
          body["storagePool"] = g["storagePool"];
        }
        if (g["throughputMibps"] !== undefined) {
          body["throughputMibps"] = g["throughputMibps"];
        }
        if (g["tieringPolicy"] !== undefined) {
          body["tieringPolicy"] = g["tieringPolicy"];
        }
        if (g["unixPermissions"] !== undefined) {
          body["unixPermissions"] = g["unixPermissions"];
        }
        if (g["volumeId"] !== undefined) body["volumeId"] = g["volumeId"];
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
              "failedValues": ["ERROR"],
            }
            : undefined,
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
      description: "Get a volumes",
      arguments: z.object({
        identifier: z.string().describe("The name of the volumes"),
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
      description: "Update volumes attributes",
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
        if (g["backupConfig"] !== undefined) {
          body["backupConfig"] = g["backupConfig"];
        }
        if (g["blockDevices"] !== undefined) {
          body["blockDevices"] = g["blockDevices"];
        }
        if (g["cacheParameters"] !== undefined) {
          body["cacheParameters"] = g["cacheParameters"];
        }
        if (g["capacityGib"] !== undefined) {
          body["capacityGib"] = g["capacityGib"];
        }
        if (g["cloneDetails"] !== undefined) {
          body["cloneDetails"] = g["cloneDetails"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["exportPolicy"] !== undefined) {
          body["exportPolicy"] = g["exportPolicy"];
        }
        if (g["hybridReplicationParameters"] !== undefined) {
          body["hybridReplicationParameters"] =
            g["hybridReplicationParameters"];
        }
        if (g["kerberosEnabled"] !== undefined) {
          body["kerberosEnabled"] = g["kerberosEnabled"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["largeCapacity"] !== undefined) {
          body["largeCapacity"] = g["largeCapacity"];
        }
        if (g["largeCapacityConfig"] !== undefined) {
          body["largeCapacityConfig"] = g["largeCapacityConfig"];
        }
        if (g["multipleEndpoints"] !== undefined) {
          body["multipleEndpoints"] = g["multipleEndpoints"];
        }
        if (g["protocols"] !== undefined) body["protocols"] = g["protocols"];
        if (g["restoreParameters"] !== undefined) {
          body["restoreParameters"] = g["restoreParameters"];
        }
        if (g["restrictedActions"] !== undefined) {
          body["restrictedActions"] = g["restrictedActions"];
        }
        if (g["securityStyle"] !== undefined) {
          body["securityStyle"] = g["securityStyle"];
        }
        if (g["shareName"] !== undefined) body["shareName"] = g["shareName"];
        if (g["smbSettings"] !== undefined) {
          body["smbSettings"] = g["smbSettings"];
        }
        if (g["snapReserve"] !== undefined) {
          body["snapReserve"] = g["snapReserve"];
        }
        if (g["snapshotDirectory"] !== undefined) {
          body["snapshotDirectory"] = g["snapshotDirectory"];
        }
        if (g["snapshotPolicy"] !== undefined) {
          body["snapshotPolicy"] = g["snapshotPolicy"];
        }
        if (g["storagePool"] !== undefined) {
          body["storagePool"] = g["storagePool"];
        }
        if (g["throughputMibps"] !== undefined) {
          body["throughputMibps"] = g["throughputMibps"];
        }
        if (g["tieringPolicy"] !== undefined) {
          body["tieringPolicy"] = g["tieringPolicy"];
        }
        if (g["unixPermissions"] !== undefined) {
          body["unixPermissions"] = g["unixPermissions"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["READY"],
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
      description: "Delete the volumes",
      arguments: z.object({
        identifier: z.string().describe("The name of the volumes"),
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
      description: "Sync volumes state from GCP",
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
    establish_peering: {
      description: "establish peering",
      arguments: z.object({
        peerClusterName: z.any().optional(),
        peerIpAddresses: z.any().optional(),
        peerSvmName: z.any().optional(),
        peerVolumeName: z.any().optional(),
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
        if (args["peerClusterName"] !== undefined) {
          body["peerClusterName"] = args["peerClusterName"];
        }
        if (args["peerIpAddresses"] !== undefined) {
          body["peerIpAddresses"] = args["peerIpAddresses"];
        }
        if (args["peerSvmName"] !== undefined) {
          body["peerSvmName"] = args["peerSvmName"];
        }
        if (args["peerVolumeName"] !== undefined) {
          body["peerVolumeName"] = args["peerVolumeName"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "netapp.projects.locations.volumes.establishPeering",
            "path": "v1/{+name}:establishPeering",
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
    restore: {
      description: "restore",
      arguments: z.object({
        backup: z.any().optional(),
        fileList: z.any().optional(),
        restoreDestinationPath: z.any().optional(),
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
        if (args["backup"] !== undefined) body["backup"] = args["backup"];
        if (args["fileList"] !== undefined) body["fileList"] = args["fileList"];
        if (args["restoreDestinationPath"] !== undefined) {
          body["restoreDestinationPath"] = args["restoreDestinationPath"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "netapp.projects.locations.volumes.restore",
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
    revert: {
      description: "revert",
      arguments: z.object({
        snapshotId: z.any().optional(),
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
        if (args["snapshotId"] !== undefined) {
          body["snapshotId"] = args["snapshotId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "netapp.projects.locations.volumes.revert",
            "path": "v1/{+name}:revert",
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
