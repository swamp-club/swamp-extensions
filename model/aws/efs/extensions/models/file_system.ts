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

// Auto-generated extension model for @swamp/aws/efs/file-system
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for EFS FileSystem (AWS::EFS::FileSystem).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";

const ElasticFileSystemTagSchema = z.object({
  Key: z.string().describe(
    "The tag key (String). The key can't start with aws:.",
  ),
  Value: z.string().describe("The value of the tag key."),
});

const LifecyclePolicySchema = z.object({
  TransitionToIA: z.string().describe(
    "The number of days after files were last accessed in primary storage (the Standard storage class) at which to move them to Infrequent Access (IA) storage. Metadata operations such as listing the contents of a directory don't count as file access events.",
  ).optional(),
  TransitionToPrimaryStorageClass: z.string().describe(
    "Whether to move files back to primary (Standard) storage after they are accessed in IA or Archive storage. Metadata operations such as listing the contents of a directory don't count as file access events.",
  ).optional(),
  TransitionToArchive: z.string().describe(
    "The number of days after files were last accessed in primary storage (the Standard storage class) at which to move them to Archive storage. Metadata operations such as listing the contents of a directory don't count as file access events.",
  ).optional(),
});

const ReplicationDestinationSchema = z.object({
  Status: z.string().describe(
    "Describes the status of the replication configuration. For more information about replication status, see [Viewing replication details](https://docs.aws.amazon.com//efs/latest/ug/awsbackup.html#restoring-backup-efsmonitoring-replication-status.html) in the *Amazon EFS User Guide*.",
  ).optional(),
  StatusMessage: z.string().describe(
    "Message that provides details about the PAUSED or ERRROR state of the replication destination configuration. For more information about replication status messages, see [Viewing replication details](https://docs.aws.amazon.com//efs/latest/ug/awsbackup.html#restoring-backup-efsmonitoring-replication-status.html) in the *Amazon EFS User Guide*.",
  ).optional(),
  FileSystemId: z.string().regex(
    new RegExp(
      "^(arn:aws[-a-z]*:elasticfilesystem:[0-9a-z-:]+:file-system/fs-[0-9a-f]{8,40}|fs-[0-9a-f]{8,40})$",
    ),
  ).describe("The ID of the destination Amazon EFS file system.").optional(),
  Region: z.string().describe(
    "The AWS-Region in which the destination file system is located. For One Zone file systems, the replication configuration must specify the AWS-Region in which the destination file system is located.",
  ).optional(),
  RoleArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the current source file system in the replication configuration.",
  ).optional(),
  AvailabilityZoneName: z.string().describe(
    "For One Zone file systems, the replication configuration must specify the Availability Zone in which the destination file system is located. Use the format us-east-1a to specify the Availability Zone. For more information about One Zone file systems, see [EFS file system types](https://docs.aws.amazon.com/efs/latest/ug/storage-classes.html) in the *Amazon EFS User Guide*. One Zone file system type is not available in all Availability Zones in AWS-Regions where Amazon EFS is available.",
  ).optional(),
  KmsKeyId: z.string().describe(
    "The ID of an kms-key-long used to protect the encrypted file system.",
  ).optional(),
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
    "AWS region; overrides AWS_REGION environment variable. Defaults to us-east-1.",
  ).optional(),
  Encrypted: z.boolean().describe(
    "A Boolean value that, if true, creates an encrypted file system. When creating an encrypted file system, you have the option of specifying a KmsKeyId for an existing kms-key-long. If you don't specify a kms-key, then the default kms-key for EFS, /aws/elasticfilesystem, is used to protect the encrypted file system.",
  ).optional(),
  FileSystemTags: z.array(ElasticFileSystemTagSchema).describe(
    'Use to create one or more tags associated with the file system. Each tag is a user-defined key-value pair. Name your file system on creation by including a "Key":"Name","Value":"{value}" key-value pair. Each key must be unique. For more information, see [Tagging resources](https://docs.aws.amazon.com/general/latest/gr/aws_tagging.html) in the *General Reference Guide*.',
  ).optional(),
  KmsKeyId: z.string().describe(
    "The ID of the kms-key-long to be used to protect the encrypted file system. This parameter is only required if you want to use a nondefault kms-key. If this parameter is not specified, the default kms-key for EFS is used. This ID can be in one of the following formats: Key ID - A unique identifier of the key, for example 1234abcd-12ab-34cd-56ef-1234567890ab. ARN - An Amazon Resource Name (ARN) for the key, for example arn:aws:kms:us-west-2:111122223333:key/1234abcd-12ab-34cd-56ef-1234567890ab. Key alias - A previously created display name for a key, for example alias/projectKey1. Key alias ARN - An ARN for a key alias, for example arn:aws:kms:us-west-2:444455556666:alias/projectKey1. If KmsKeyId is specified, the Encrypted parameter must be set to true.",
  ).optional(),
  LifecyclePolicies: z.array(LifecyclePolicySchema).describe(
    "An array of LifecyclePolicy objects that define the file system's LifecycleConfiguration object. A LifecycleConfiguration object informs Lifecycle management of the following: When to move files in the file system from primary storage to IA storage. When to move files in the file system from primary storage or IA storage to Archive storage. When to move files that are in IA or Archive storage to primary storage. EFS requires that each LifecyclePolicy object have only a single transition. This means that in a request body, LifecyclePolicies needs to be structured as an array of LifecyclePolicy objects, one object for each transition, TransitionToIA, TransitionToArchive TransitionToPrimaryStorageClass. See the example requests in the following section for more information.",
  ).optional(),
  FileSystemProtection: z.object({
    ReplicationOverwriteProtection: z.enum(["DISABLED", "ENABLED"]).describe(
      "The status of the file system's replication overwrite protection. ENABLED – The file system cannot be used as the destination file system in a replication configuration. The file system is writeable. Replication overwrite protection is ENABLED by default. DISABLED – The file system can be used as the destination file system in a replication configuration. The file system is read-only and can only be modified by EFS replication. REPLICATING – The file system is being used as the destination file system in a replication configuration. The file system is read-only and is modified only by EFS replication. If the replication configuration is deleted, the file system's replication overwrite protection is re-enabled, the file system becomes writeable.",
    ).optional(),
  }).describe("Describes the protection on the file system.").optional(),
  PerformanceMode: z.string().describe(
    "The performance mode of the file system. We recommend generalPurpose performance mode for all file systems. File systems using the maxIO performance mode can scale to higher levels of aggregate throughput and operations per second with a tradeoff of slightly higher latencies for most file operations. The performance mode can't be changed after the file system has been created. The maxIO mode is not supported on One Zone file systems. Due to the higher per-operation latencies with Max I/O, we recommend using General Purpose performance mode for all file systems. Default is generalPurpose.",
  ).optional(),
  ProvisionedThroughputInMibps: z.number().describe(
    "The throughput, measured in mebibytes per second (MiBps), that you want to provision for a file system that you're creating. Required if ThroughputMode is set to provisioned. Valid values are 1-3414 MiBps, with the upper limit depending on Region. To increase this limit, contact SUP. For more information, see [Amazon EFS quotas that you can increase](https://docs.aws.amazon.com/efs/latest/ug/limits.html#soft-limits) in the *Amazon EFS User Guide*.",
  ).optional(),
  ThroughputMode: z.string().describe(
    "Specifies the throughput mode for the file system. The mode can be bursting, provisioned, or elastic. If you set ThroughputMode to provisioned, you must also set a value for ProvisionedThroughputInMibps. After you create the file system, you can decrease your file system's Provisioned throughput or change between the throughput modes, with certain time restrictions. For more information, see [Specifying throughput with provisioned mode](https://docs.aws.amazon.com/efs/latest/ug/performance.html#provisioned-throughput) in the *Amazon EFS User Guide*. Default is bursting.",
  ).optional(),
  FileSystemPolicy: z.record(z.string(), z.unknown()).describe(
    "The FileSystemPolicy for the EFS file system. A file system policy is an IAM resource policy used to control NFS access to an EFS file system. For more information, see [Using to control NFS access to Amazon EFS](https://docs.aws.amazon.com/efs/latest/ug/iam-access-control-nfs-efs.html) in the *Amazon EFS User Guide*.",
  ).optional(),
  BypassPolicyLockoutSafetyCheck: z.boolean().describe(
    "(Optional) A boolean that specifies whether or not to bypass the FileSystemPolicy lockout safety check. The lockout safety check determines whether the policy in the request will lock out, or prevent, the IAM principal that is making the request from making future PutFileSystemPolicy requests on this file system. Set BypassPolicyLockoutSafetyCheck to True only when you intend to prevent the IAM principal that is making the request from making subsequent PutFileSystemPolicy requests on this file system. The default value is False.",
  ).optional(),
  AvailabilityZoneName: z.string().describe(
    "For One Zone file systems, specify the AWS Availability Zone in which to create the file system. Use the format us-east-1a to specify the Availability Zone. For more information about One Zone file systems, see [EFS file system types](https://docs.aws.amazon.com/efs/latest/ug/availability-durability.html#file-system-type) in the *Amazon EFS User Guide*. One Zone file systems are not available in all Availability Zones in AWS-Regions where Amazon EFS is available.",
  ).optional(),
  ReplicationConfiguration: z.object({
    Destinations: z.array(ReplicationDestinationSchema).describe(
      "An array of destination objects. Only one destination object is supported.",
    ).optional(),
  }).describe(
    "Describes the replication configuration for a specific file system.",
  ).optional(),
});

const StateSchema = z.object({
  FileSystemId: z.string(),
  Arn: z.string().optional(),
  Encrypted: z.boolean().optional(),
  FileSystemTags: z.array(ElasticFileSystemTagSchema).optional(),
  KmsKeyId: z.string().optional(),
  LifecyclePolicies: z.array(LifecyclePolicySchema).optional(),
  FileSystemProtection: z.object({
    ReplicationOverwriteProtection: z.string(),
  }).optional(),
  PerformanceMode: z.string().optional(),
  ProvisionedThroughputInMibps: z.number().optional(),
  ThroughputMode: z.string().optional(),
  FileSystemPolicy: z.record(z.string(), z.unknown()).optional(),
  BypassPolicyLockoutSafetyCheck: z.boolean().optional(),
  BackupPolicy: z.object({
    Status: z.string(),
  }).optional(),
  AvailabilityZoneName: z.string().optional(),
  ReplicationConfiguration: z.object({
    Destinations: z.array(ReplicationDestinationSchema),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Encrypted: z.boolean().describe(
    "A Boolean value that, if true, creates an encrypted file system. When creating an encrypted file system, you have the option of specifying a KmsKeyId for an existing kms-key-long. If you don't specify a kms-key, then the default kms-key for EFS, /aws/elasticfilesystem, is used to protect the encrypted file system.",
  ).optional(),
  FileSystemTags: z.array(ElasticFileSystemTagSchema).describe(
    'Use to create one or more tags associated with the file system. Each tag is a user-defined key-value pair. Name your file system on creation by including a "Key":"Name","Value":"{value}" key-value pair. Each key must be unique. For more information, see [Tagging resources](https://docs.aws.amazon.com/general/latest/gr/aws_tagging.html) in the *General Reference Guide*.',
  ).optional(),
  KmsKeyId: z.string().describe(
    "The ID of the kms-key-long to be used to protect the encrypted file system. This parameter is only required if you want to use a nondefault kms-key. If this parameter is not specified, the default kms-key for EFS is used. This ID can be in one of the following formats: Key ID - A unique identifier of the key, for example 1234abcd-12ab-34cd-56ef-1234567890ab. ARN - An Amazon Resource Name (ARN) for the key, for example arn:aws:kms:us-west-2:111122223333:key/1234abcd-12ab-34cd-56ef-1234567890ab. Key alias - A previously created display name for a key, for example alias/projectKey1. Key alias ARN - An ARN for a key alias, for example arn:aws:kms:us-west-2:444455556666:alias/projectKey1. If KmsKeyId is specified, the Encrypted parameter must be set to true.",
  ).optional(),
  LifecyclePolicies: z.array(LifecyclePolicySchema).describe(
    "An array of LifecyclePolicy objects that define the file system's LifecycleConfiguration object. A LifecycleConfiguration object informs Lifecycle management of the following: When to move files in the file system from primary storage to IA storage. When to move files in the file system from primary storage or IA storage to Archive storage. When to move files that are in IA or Archive storage to primary storage. EFS requires that each LifecyclePolicy object have only a single transition. This means that in a request body, LifecyclePolicies needs to be structured as an array of LifecyclePolicy objects, one object for each transition, TransitionToIA, TransitionToArchive TransitionToPrimaryStorageClass. See the example requests in the following section for more information.",
  ).optional(),
  FileSystemProtection: z.object({
    ReplicationOverwriteProtection: z.enum(["DISABLED", "ENABLED"]).describe(
      "The status of the file system's replication overwrite protection. ENABLED – The file system cannot be used as the destination file system in a replication configuration. The file system is writeable. Replication overwrite protection is ENABLED by default. DISABLED – The file system can be used as the destination file system in a replication configuration. The file system is read-only and can only be modified by EFS replication. REPLICATING – The file system is being used as the destination file system in a replication configuration. The file system is read-only and is modified only by EFS replication. If the replication configuration is deleted, the file system's replication overwrite protection is re-enabled, the file system becomes writeable.",
    ).optional(),
  }).describe("Describes the protection on the file system.").optional(),
  PerformanceMode: z.string().describe(
    "The performance mode of the file system. We recommend generalPurpose performance mode for all file systems. File systems using the maxIO performance mode can scale to higher levels of aggregate throughput and operations per second with a tradeoff of slightly higher latencies for most file operations. The performance mode can't be changed after the file system has been created. The maxIO mode is not supported on One Zone file systems. Due to the higher per-operation latencies with Max I/O, we recommend using General Purpose performance mode for all file systems. Default is generalPurpose.",
  ).optional(),
  ProvisionedThroughputInMibps: z.number().describe(
    "The throughput, measured in mebibytes per second (MiBps), that you want to provision for a file system that you're creating. Required if ThroughputMode is set to provisioned. Valid values are 1-3414 MiBps, with the upper limit depending on Region. To increase this limit, contact SUP. For more information, see [Amazon EFS quotas that you can increase](https://docs.aws.amazon.com/efs/latest/ug/limits.html#soft-limits) in the *Amazon EFS User Guide*.",
  ).optional(),
  ThroughputMode: z.string().describe(
    "Specifies the throughput mode for the file system. The mode can be bursting, provisioned, or elastic. If you set ThroughputMode to provisioned, you must also set a value for ProvisionedThroughputInMibps. After you create the file system, you can decrease your file system's Provisioned throughput or change between the throughput modes, with certain time restrictions. For more information, see [Specifying throughput with provisioned mode](https://docs.aws.amazon.com/efs/latest/ug/performance.html#provisioned-throughput) in the *Amazon EFS User Guide*. Default is bursting.",
  ).optional(),
  FileSystemPolicy: z.record(z.string(), z.unknown()).describe(
    "The FileSystemPolicy for the EFS file system. A file system policy is an IAM resource policy used to control NFS access to an EFS file system. For more information, see [Using to control NFS access to Amazon EFS](https://docs.aws.amazon.com/efs/latest/ug/iam-access-control-nfs-efs.html) in the *Amazon EFS User Guide*.",
  ).optional(),
  BypassPolicyLockoutSafetyCheck: z.boolean().describe(
    "(Optional) A boolean that specifies whether or not to bypass the FileSystemPolicy lockout safety check. The lockout safety check determines whether the policy in the request will lock out, or prevent, the IAM principal that is making the request from making future PutFileSystemPolicy requests on this file system. Set BypassPolicyLockoutSafetyCheck to True only when you intend to prevent the IAM principal that is making the request from making subsequent PutFileSystemPolicy requests on this file system. The default value is False.",
  ).optional(),
  AvailabilityZoneName: z.string().describe(
    "For One Zone file systems, specify the AWS Availability Zone in which to create the file system. Use the format us-east-1a to specify the Availability Zone. For more information about One Zone file systems, see [EFS file system types](https://docs.aws.amazon.com/efs/latest/ug/availability-durability.html#file-system-type) in the *Amazon EFS User Guide*. One Zone file systems are not available in all Availability Zones in AWS-Regions where Amazon EFS is available.",
  ).optional(),
  ReplicationConfiguration: z.object({
    Destinations: z.array(ReplicationDestinationSchema).describe(
      "An array of destination objects. Only one destination object is supported.",
    ).optional(),
  }).describe(
    "Describes the replication configuration for a specific file system.",
  ).optional(),
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

/** Swamp extension model for EFS FileSystem. Registered at `@swamp/aws/efs/file-system`. */
export const model = {
  type: "@swamp/aws/efs/file-system",
  version: "2026.06.08.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
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
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.27.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.06.1",
      description: "Added: accessKeyId, secretAccessKey, sessionToken, region",
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
      description: "EFS FileSystem resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EFS FileSystem",
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
          "AWS::EFS::FileSystem",
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
      description: "Get a EFS FileSystem",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EFS FileSystem",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::EFS::FileSystem",
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
      description: "Update a EFS FileSystem",
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
        const identifier = existing.FileSystemId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::EFS::FileSystem",
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
          "AWS::EFS::FileSystem",
          identifier,
          currentState,
          desiredState,
          ["AvailabilityZoneName", "Encrypted", "KmsKeyId", "PerformanceMode"],
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
      description: "Delete a EFS FileSystem",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EFS FileSystem",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::EFS::FileSystem",
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
      description: "Sync EFS FileSystem state from AWS",
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
        const identifier = existing.FileSystemId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::EFS::FileSystem",
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
  },
};
