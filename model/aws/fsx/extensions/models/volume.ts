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

// Auto-generated extension model for @swamp/aws/fsx/volume
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for FSx Volume (AWS::FSx::Volume).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, sync, and list can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";

const TieringPolicySchema = z.object({
  CoolingPeriod: z.number().int().describe(
    'Specifies the number of days that user data in a volume must remain inactive before it is considered "cold" and moved to the capacity pool.',
  ).optional(),
  Name: z.string().describe(
    "Specifies the tiering policy used to transition data. Default value is SNAPSHOT_ONLY.",
  ).optional(),
});

const AutocommitPeriodSchema = z.object({
  Value: z.number().int().describe(
    "Defines the amount of time for the autocommit period of a file in an FSx for ONTAP SnapLock volume.",
  ).optional(),
  Type: z.string().describe(
    "Defines the type of time for the autocommit period of a file in an FSx for ONTAP SnapLock volume. Setting this value to NONE disables autocommit. The default value is NONE.",
  ),
});

const RetentionPeriodSchema = z.object({
  Type: z.string().describe(
    "Defines the type of time for the retention period of an FSx for ONTAP SnapLock volume. Set it to one of the valid types. If you set it to INFINITE, the files are retained forever. If you set it to UNSPECIFIED, the files are retained until you set an explicit retention period.",
  ),
  Value: z.number().int().describe(
    "Defines the amount of time for the retention period of an FSx for ONTAP SnapLock volume. You can't set a value for INFINITE or UNSPECIFIED.",
  ).optional(),
});

const SnaplockRetentionPeriodSchema = z.object({
  MinimumRetention: RetentionPeriodSchema.describe(
    "The shortest retention period that can be assigned to a WORM file on an FSx for ONTAP SnapLock volume.",
  ),
  DefaultRetention: RetentionPeriodSchema.describe(
    "The retention period assigned to a write once, read many (WORM) file by default if an explicit retention period is not set for an FSx for ONTAP SnapLock volume.",
  ),
  MaximumRetention: RetentionPeriodSchema.describe(
    "The longest retention period that can be assigned to a WORM file on an FSx for ONTAP SnapLock volume.",
  ),
});

const SnaplockConfigurationSchema = z.object({
  AuditLogVolume: z.string().describe(
    "Enables or disables the audit log volume for an FSx for ONTAP SnapLock volume",
  ).optional(),
  VolumeAppendModeEnabled: z.string().describe(
    "Enables or disables volume-append mode on an FSx for ONTAP SnapLock volume.",
  ).optional(),
  AutocommitPeriod: AutocommitPeriodSchema.describe(
    "The configuration object for setting the autocommit period of files in an FSx for ONTAP SnapLock volume.",
  ).optional(),
  RetentionPeriod: SnaplockRetentionPeriodSchema.describe(
    "Specifies the retention period of an FSx for ONTAP SnapLock volume.",
  ).optional(),
  PrivilegedDelete: z.string().describe(
    "Enables, disables, or permanently disables privileged delete on an FSx for ONTAP SnapLock Enterprise volume.",
  ).optional(),
  SnaplockType: z.string().describe(
    "Specifies the retention mode of an FSx for ONTAP SnapLock volume. After it is set, it can't be changed.",
  ),
});

const AggregateConfigurationSchema = z.object({
  Aggregates: z.array(z.string()).describe(
    "The list of aggregates that this volume resides on. Aggregates are storage pools which make up your primary storage tier.",
  ).optional(),
  ConstituentsPerAggregate: z.number().int().describe(
    "Used to explicitly set the number of constituents within the FlexGroup per storage aggregate. This field is optional when creating a FlexGroup volume. If unspecified, the default value will be 8. This field cannot be provided when creating a FlexVol volume.",
  ).optional(),
});

const ClientConfigurationsSchema = z.object({
  Clients: z.string().describe(
    "A value that specifies who can mount the file system. You can provide a wildcard character (*), an IP address (0.0.0.0), or a CIDR address (192.0.2.0/24). By default, Amazon FSx uses the wildcard character when specifying the client.",
  ),
  Options: z.array(z.string()).describe(
    "The configuration object for mounting a Network File System (NFS) file system.",
  ),
});

const NfsExportsSchema = z.object({
  ClientConfigurations: z.array(ClientConfigurationsSchema).describe(
    "The configuration object for mounting a Network File System (NFS) file system.",
  ),
});

const OriginSnapshotSchema = z.object({
  CopyStrategy: z.string().describe(
    "The configuration object for mounting a Network File System (NFS) file system.",
  ),
  SnapshotARN: z.string().describe(
    "Specifies the snapshot to use when creating an OpenZFS volume from a snapshot.",
  ),
});

const UserAndGroupQuotasSchema = z.object({
  Id: z.number().int().describe(
    "The ID of the user or group that the quota applies to.",
  ),
  StorageCapacityQuotaGiB: z.number().int().describe(
    "The user or group's storage quota, in gibibytes (GiB).",
  ),
  Type: z.string().describe(
    "Specifies whether the quota applies to a user or group.",
  ),
});

const TagSchema = z.object({
  Key: z.string().describe(
    "A value that specifies the TagKey, the name of the tag. Tag keys must be unique for the resource to which they are attached.",
  ),
  Value: z.string().describe(
    "A value that specifies the TagValue, the value assigned to the corresponding tag key. Tag values can be null and don't have to be unique in a tag set. For example, you can have a key-value pair in a tag set of finances: April and also of payroll: April.",
  ),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  accessKeyId: z.string().meta({ sensitive: true }).describe(
    "AWS access key ID; overrides AWS_ACCESS_KEY_ID environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).describe(
    "AWS secret access key; overrides AWS_SECRET_ACCESS_KEY environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  sessionToken: z.string().meta({ sensitive: true }).describe(
    "AWS session token for temporary credentials; overrides AWS_SESSION_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  region: z.string().describe(
    "AWS region; overrides AWS_REGION / AWS_DEFAULT_REGION environment variables and ~/.aws/config profile region. Defaults to us-east-1.",
  ).optional(),
  BackupId: z.string().describe(
    "Specifies the ID of the volume backup to use to create a new volume.",
  ).optional(),
  Name: z.string().describe("The name of the volume."),
  OntapConfiguration: z.object({
    JunctionPath: z.string().describe(
      "Specifies the location in the SVM's namespace where the volume is mounted. This parameter is required. The JunctionPath must have a leading forward slash, such as /vol3.",
    ).optional(),
    StorageVirtualMachineId: z.string().describe(
      "Specifies the ONTAP SVM in which to create the volume.",
    ),
    TieringPolicy: TieringPolicySchema.describe(
      "Describes the data tiering policy for an ONTAP volume.",
    ).optional(),
    SizeInMegabytes: z.string().describe(
      "Use SizeInBytes instead. Specifies the size of the volume, in megabytes (MB), that you are creating",
    ).optional(),
    VolumeStyle: z.string().describe(
      "Use to specify the style of an ONTAP volume.",
    ).optional(),
    SizeInBytes: z.string().describe(
      "Specifies the configured size of the volume, in bytes.",
    ).optional(),
    SecurityStyle: z.string().describe(
      "Specifies the security style for the volume. If a volume's security style is not specified, it is automatically set to the root volume's security style.",
    ).optional(),
    SnaplockConfiguration: SnaplockConfigurationSchema.describe(
      "The SnapLock configuration object for an FSx for ONTAP SnapLock volume.",
    ).optional(),
    AggregateConfiguration: AggregateConfigurationSchema.describe(
      "Used to specify the configuration options for an FSx for ONTAP volume's storage aggregate or aggregates.",
    ).optional(),
    SnapshotPolicy: z.string().describe(
      "Specifies the snapshot policy for the volume. There are three built-in snapshot policies: default, default-1weekly, none.",
    ).optional(),
    StorageEfficiencyEnabled: z.string().describe(
      "Set to true to enable deduplication, compression, and compaction storage efficiency features on the volume, or set to false to disable them.",
    ).optional(),
    CopyTagsToBackups: z.string().describe(
      "A boolean flag indicating whether tags for the volume should be copied to backups.",
    ).optional(),
    OntapVolumeType: z.string().describe(
      "Specifies the type of volume you are creating. Valid values are the following: RW or DP",
    ).optional(),
  }).describe("The configuration of an Amazon FSx for NetApp ONTAP volume.")
    .optional(),
  OpenZFSConfiguration: z.object({
    ReadOnly: z.boolean().describe(
      "A Boolean value indicating whether the volume is read-only.",
    ).optional(),
    Options: z.array(z.string()).describe(
      "The configuration object for mounting a Network File System (NFS) file system.",
    ).optional(),
    DataCompressionType: z.string().describe(
      "Specifies the method used to compress the data on the volume",
    ).optional(),
    NfsExports: z.array(NfsExportsSchema).describe(
      "The configuration object for mounting a Network File System (NFS) file system.",
    ).optional(),
    StorageCapacityQuotaGiB: z.number().int().describe(
      "Sets the maximum storage size in gibibytes (GiB) for the volume. You can specify a quota that is larger than the storage on the parent volume. A volume quota limits the amount of storage that the volume can consume to the configured amount, but does not guarantee the space will be available on the parent volume. To guarantee quota space, you must also set StorageCapacityReservationGiB. To not specify a storage capacity quota, set this to -1.",
    ).optional(),
    CopyTagsToSnapshots: z.boolean().describe(
      "A Boolean value indicating whether tags for the volume should be copied to snapshots. This value defaults to false. If this value is set to true, and you do not specify any tags, all tags for the original volume are copied over to snapshots. If this value is set to true, and you do specify one or more tags, only the specified tags for the original volume are copied over to snapshots. If you specify one or more tags when creating a new snapshot, no tags are copied over from the original volume, regardless of this value.",
    ).optional(),
    ParentVolumeId: z.string().describe(
      "The ID of the volume to use as the parent volume of the volume that you are creating.",
    ),
    StorageCapacityReservationGiB: z.number().int().describe(
      "Specifies the amount of storage in gibibytes (GiB) to reserve from the parent volume. Setting StorageCapacityReservationGiB guarantees that the specified amount of storage space on the parent volume will always be available for the volume. You can't reserve more storage than the parent volume has. To not specify a storage capacity reservation, set this to 0 or -1. For more information, see Volume properties in the Amazon FSx for OpenZFS User Guide.",
    ).optional(),
    RecordSizeKiB: z.number().int().describe(
      "Specifies the suggested block size for a volume in a ZFS dataset, in kibibytes (KiB).",
    ).optional(),
    OriginSnapshot: OriginSnapshotSchema.describe(
      "The configuration of an Amazon FSx for OpenZFS volume.",
    ).optional(),
    UserAndGroupQuotas: z.array(UserAndGroupQuotasSchema).describe(
      "Configures how much storage users and groups can use on the volume.",
    ).optional(),
  }).describe("The configuration of an Amazon FSx for OpenZFS volume.")
    .optional(),
  Tags: z.array(TagSchema).describe("One or more tags.").optional(),
  VolumeType: z.string().describe("The type of the volume.").optional(),
});

const StateSchema = z.object({
  ResourceARN: z.string().optional(),
  VolumeId: z.string(),
  UUID: z.string().optional(),
  BackupId: z.string().optional(),
  Name: z.string().optional(),
  OntapConfiguration: z.object({
    JunctionPath: z.string(),
    StorageVirtualMachineId: z.string(),
    TieringPolicy: TieringPolicySchema,
    SizeInMegabytes: z.string(),
    VolumeStyle: z.string(),
    SizeInBytes: z.string(),
    SecurityStyle: z.string(),
    SnaplockConfiguration: SnaplockConfigurationSchema,
    AggregateConfiguration: AggregateConfigurationSchema,
    SnapshotPolicy: z.string(),
    StorageEfficiencyEnabled: z.string(),
    CopyTagsToBackups: z.string(),
    OntapVolumeType: z.string(),
  }).optional(),
  OpenZFSConfiguration: z.object({
    ReadOnly: z.boolean(),
    Options: z.array(z.string()),
    DataCompressionType: z.string(),
    NfsExports: z.array(NfsExportsSchema),
    StorageCapacityQuotaGiB: z.number(),
    CopyTagsToSnapshots: z.boolean(),
    ParentVolumeId: z.string(),
    StorageCapacityReservationGiB: z.number(),
    RecordSizeKiB: z.number(),
    OriginSnapshot: OriginSnapshotSchema,
    UserAndGroupQuotas: z.array(UserAndGroupQuotasSchema),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
  VolumeType: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  BackupId: z.string().describe(
    "Specifies the ID of the volume backup to use to create a new volume.",
  ).optional(),
  Name: z.string().describe("The name of the volume.").optional(),
  OntapConfiguration: z.object({
    JunctionPath: z.string().describe(
      "Specifies the location in the SVM's namespace where the volume is mounted. This parameter is required. The JunctionPath must have a leading forward slash, such as /vol3.",
    ).optional(),
    StorageVirtualMachineId: z.string().describe(
      "Specifies the ONTAP SVM in which to create the volume.",
    ).optional(),
    TieringPolicy: TieringPolicySchema.describe(
      "Describes the data tiering policy for an ONTAP volume.",
    ).optional(),
    SizeInMegabytes: z.string().describe(
      "Use SizeInBytes instead. Specifies the size of the volume, in megabytes (MB), that you are creating",
    ).optional(),
    VolumeStyle: z.string().describe(
      "Use to specify the style of an ONTAP volume.",
    ).optional(),
    SizeInBytes: z.string().describe(
      "Specifies the configured size of the volume, in bytes.",
    ).optional(),
    SecurityStyle: z.string().describe(
      "Specifies the security style for the volume. If a volume's security style is not specified, it is automatically set to the root volume's security style.",
    ).optional(),
    SnaplockConfiguration: SnaplockConfigurationSchema.describe(
      "The SnapLock configuration object for an FSx for ONTAP SnapLock volume.",
    ).optional(),
    AggregateConfiguration: AggregateConfigurationSchema.describe(
      "Used to specify the configuration options for an FSx for ONTAP volume's storage aggregate or aggregates.",
    ).optional(),
    SnapshotPolicy: z.string().describe(
      "Specifies the snapshot policy for the volume. There are three built-in snapshot policies: default, default-1weekly, none.",
    ).optional(),
    StorageEfficiencyEnabled: z.string().describe(
      "Set to true to enable deduplication, compression, and compaction storage efficiency features on the volume, or set to false to disable them.",
    ).optional(),
    CopyTagsToBackups: z.string().describe(
      "A boolean flag indicating whether tags for the volume should be copied to backups.",
    ).optional(),
    OntapVolumeType: z.string().describe(
      "Specifies the type of volume you are creating. Valid values are the following: RW or DP",
    ).optional(),
  }).describe("The configuration of an Amazon FSx for NetApp ONTAP volume.")
    .optional(),
  OpenZFSConfiguration: z.object({
    ReadOnly: z.boolean().describe(
      "A Boolean value indicating whether the volume is read-only.",
    ).optional(),
    Options: z.array(z.string()).describe(
      "The configuration object for mounting a Network File System (NFS) file system.",
    ).optional(),
    DataCompressionType: z.string().describe(
      "Specifies the method used to compress the data on the volume",
    ).optional(),
    NfsExports: z.array(NfsExportsSchema).describe(
      "The configuration object for mounting a Network File System (NFS) file system.",
    ).optional(),
    StorageCapacityQuotaGiB: z.number().int().describe(
      "Sets the maximum storage size in gibibytes (GiB) for the volume. You can specify a quota that is larger than the storage on the parent volume. A volume quota limits the amount of storage that the volume can consume to the configured amount, but does not guarantee the space will be available on the parent volume. To guarantee quota space, you must also set StorageCapacityReservationGiB. To not specify a storage capacity quota, set this to -1.",
    ).optional(),
    CopyTagsToSnapshots: z.boolean().describe(
      "A Boolean value indicating whether tags for the volume should be copied to snapshots. This value defaults to false. If this value is set to true, and you do not specify any tags, all tags for the original volume are copied over to snapshots. If this value is set to true, and you do specify one or more tags, only the specified tags for the original volume are copied over to snapshots. If you specify one or more tags when creating a new snapshot, no tags are copied over from the original volume, regardless of this value.",
    ).optional(),
    ParentVolumeId: z.string().describe(
      "The ID of the volume to use as the parent volume of the volume that you are creating.",
    ).optional(),
    StorageCapacityReservationGiB: z.number().int().describe(
      "Specifies the amount of storage in gibibytes (GiB) to reserve from the parent volume. Setting StorageCapacityReservationGiB guarantees that the specified amount of storage space on the parent volume will always be available for the volume. You can't reserve more storage than the parent volume has. To not specify a storage capacity reservation, set this to 0 or -1. For more information, see Volume properties in the Amazon FSx for OpenZFS User Guide.",
    ).optional(),
    RecordSizeKiB: z.number().int().describe(
      "Specifies the suggested block size for a volume in a ZFS dataset, in kibibytes (KiB).",
    ).optional(),
    OriginSnapshot: OriginSnapshotSchema.describe(
      "The configuration of an Amazon FSx for OpenZFS volume.",
    ).optional(),
    UserAndGroupQuotas: z.array(UserAndGroupQuotasSchema).describe(
      "Configures how much storage users and groups can use on the volume.",
    ).optional(),
  }).describe("The configuration of an Amazon FSx for OpenZFS volume.")
    .optional(),
  Tags: z.array(TagSchema).describe("One or more tags.").optional(),
  VolumeType: z.string().describe("The type of the volume.").optional(),
});

const _credentialKeys = new Set([
  "accessKeyId",
  "secretAccessKey",
  "sessionToken",
  "region",
]);

function _buildCredentials(g: Record<string, unknown>): AwsCredentials {
  return {
    accessKeyId: g.accessKeyId as string | undefined,
    secretAccessKey: g.secretAccessKey as string | undefined,
    sessionToken: g.sessionToken as string | undefined,
    region: g.region as string | undefined,
  };
}

/** Swamp extension model for FSx Volume. Registered at `@swamp/aws/fsx/volume`. */
export const model = {
  type: "@swamp/aws/fsx/volume",
  version: "2026.09.03.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "FSx Volume resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a FSx Volume",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::FSx::Volume",
          desiredState,
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
      description: "Get a FSx Volume",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the FSx Volume",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::FSx::Volume",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
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
      description: "Update a FSx Volume",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
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
        const identifier = existing.VolumeId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::FSx::Volume",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::FSx::Volume",
          identifier,
          currentState,
          desiredState,
          [
            "BackupId",
            "VolumeType",
            "OntapVolumeType",
            "StorageVirtualMachineId",
            "VolumeStyle",
            "AggregateConfiguration",
            "Aggregates",
            "ConstituentsPerAggregate",
            "SnaplockType",
            "OriginSnapshot",
            "CopyStrategy",
            "SnapshotARN",
            "ParentVolumeId",
          ],
          credentials,
        );
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete a FSx Volume",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the FSx Volume",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::FSx::Volume",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
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
      description: "Sync FSx Volume state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
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
        const identifier = existing.VolumeId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::FSx::Volume",
            identifier,
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
              identifier,
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
      description: "List FSx Volume resources",
      arguments: z.object({
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
        resourceModel: z.string().describe(
          "JSON resource model for parent-scoped listing (e.g. parent identifier)",
        ).optional(),
      }),
      execute: async (
        args: { maxPages?: number; resourceModel?: string },
        context: any,
      ) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { items, nextToken } = await listResources("AWS::FSx::Volume", {
          resourceModel: args.resourceModel,
          maxPages: args.maxPages,
          credentials,
        });
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const instanceName =
            (item.properties?.VolumeId?.toString() ?? item.identifier).replace(
              /[\/\\]/g,
              "_",
            ).replace(/\.\./g, "_").replace(/\0/g, "");
          const handle = await context.writeResource("state", instanceName, {
            ...item.properties,
            _identifier: item.identifier,
          });
          dataHandles.push(handle);
        }
        return {
          dataHandles,
          result: { count: items.length, nextPageToken: nextToken },
        };
      },
    },
  },
};
