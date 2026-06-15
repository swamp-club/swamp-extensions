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

// Auto-generated extension model for @swamp/aws/ec2/volume
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for EC2 Volume (AWS::EC2::Volume).
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

const TagSchema = z.object({
  Key: z.string().describe("The tag key."),
  Value: z.string().describe("The tag value."),
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
  MultiAttachEnabled: z.boolean().describe(
    "Indicates whether Amazon EBS Multi-Attach is enabled. CFNlong does not currently support updating a single-attach volume to be multi-attach enabled, updating a multi-attach enabled volume to be single-attach, or updating the size or number of I/O operations per second (IOPS) of a multi-attach enabled volume.",
  ).optional(),
  KmsKeyId: z.string().describe(
    "The identifier of the kms-key-long to use for Amazon EBS encryption. If KmsKeyId is specified, the encrypted state must be true. If you omit this property and your account is enabled for encryption by default, or *Encrypted* is set to true, then the volume is encrypted using the default key specified for your account. If your account does not have a default key, then the volume is encrypted using the aws-managed-key. Alternatively, if you want to specify a different key, you can specify one of the following: Key ID. For example, 1234abcd-12ab-34cd-56ef-1234567890ab. Key alias. Specify the alias for the key, prefixed with alias/. For example, for a key with the alias my_cmk, use alias/my_cmk. Or to specify the aws-managed-key, use alias/aws/ebs. Key ARN. For example, arn:aws:kms:us-east-1:012345678910:key/1234abcd-12ab-34cd-56ef-1234567890ab. Alias ARN. For example, arn:aws:kms:us-east-1:012345678910:alias/ExampleAlias. If you are creating a volume copy, omit this parameter. The volume is automatically encrypted with the same KMS key as the source volume. You can't copy unencrypted volumes.",
  ).optional(),
  Encrypted: z.boolean().describe(
    "Indicates whether the volume should be encrypted. The effect of setting the encryption state to true depends on the volume origin (new, from a snapshot, or from an existing volume), starting encryption state, ownership, and whether encryption by default is enabled. For more information, see [Encryption by default](https://docs.aws.amazon.com/ebs/latest/userguide/work-with-ebs-encr.html#encryption-by-default) in the *Amazon EBS User Guide*. If you are creating a volume copy, omit this parameter. The volume is automatically encrypted with the same KMS key as the source volume. You can't copy unencrypted volumes.",
  ).optional(),
  Size: z.number().int().describe(
    "The size of the volume, in GiBs. Required for new empty volumes. Optional for volumes created from snapshots and volume copies. In this case, the size defaults to the size of the snapshot or source volume. You can optionally specify a size that is equal to or larger than the size of the source snapshot or volume. Supported volume sizes: gp2: 1 - 16,384 GiB gp3: 1 - 65,536 GiB io1: 4 - 16,384 GiB io2: 4 - 65,536 GiB st1 and sc1: 125 - 16,384 GiB standard: 1 - 1024 GiB",
  ).optional(),
  AutoEnableIO: z.boolean().describe(
    "Indicates whether the volume is auto-enabled for I/O operations. By default, EBS disables I/O to the volume from attached EC2 instances when it determines that a volume's data is potentially inconsistent. If the consistency of the volume is not a concern, and you prefer that the volume be made available immediately if it's impaired, you can configure the volume to automatically enable I/O.",
  ).optional(),
  OutpostArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the Outpost on which to create the volume. If you intend to use a volume with an instance running on an outpost, then you must create the volume on the same outpost as the instance. You can't use a volume created in an AWS Region with an instance on an AWS outpost, or the other way around.",
  ).optional(),
  AvailabilityZone: z.string().describe(
    "The ID of the Availability Zone in which to create the volume. For example, us-east-1a. Either AvailabilityZone or AvailabilityZoneId must be specified, but not both. If you are creating a volume copy, omit this parameter. The volume copy is created in the same Availability Zone as the source volume.",
  ).optional(),
  AvailabilityZoneId: z.string().describe(
    "The ID of the Availability Zone in which to create the volume. For example, use1-az1. Either AvailabilityZone or AvailabilityZoneId must be specified, but not both. If you are creating a volume copy, omit this parameter. The volume copy is created in the same Availability Zone as the source volume.",
  ).optional(),
  Throughput: z.number().int().describe(
    "The throughput to provision for a volume, with a maximum of 2,000 MiB/s. This parameter is valid only for gp3 volumes. The default value is 125. Valid Range: Minimum value of 125. Maximum value of 2000. The maximum ratio of throughput to IOPS is 0.25 MiB/s per IOPS. For example, a volume with 3,000 IOPS can have a maximum throughput of 750 MiB/s (3,000 x 0.25).",
  ).optional(),
  Iops: z.number().int().describe(
    "The number of I/O operations per second (IOPS) to provision for the volume. Required for io1 and io2 volumes. Optional for gp3 volumes. Omit for all other volume types. Valid ranges: gp3: 3,000 (*default*) - 80,000 IOPS io1: 100 - 64,000 IOPS io2: 100 - 256,000 IOPS [Instances built on the Nitro System](https://docs.aws.amazon.com/ec2/latest/instancetypes/ec2-nitro-instances.html) can support up to 256,000 IOPS. Other instances can support up to 32,000 IOPS.",
  ).optional(),
  SnapshotId: z.string().describe(
    "The snapshot from which to create the volume. Only specify to create a volume from a snapshot. To create a new empty volume, omit this parameter and specify a value for Size instead. To create a volume copy, omit this parameter and specify SourceVolumeId instead.",
  ).optional(),
  SourceVolumeId: z.string().describe(
    "The ID of the source EBS volume to copy. When specified, the volume is created as an exact copy of the specified volume. Only specify to create a volume copy. To create a new empty volume or to create a volume from a snapshot, omit this parameter,",
  ).optional(),
  VolumeType: z.string().describe(
    "The volume type. This parameter can be one of the following values: General Purpose SSD: gp2 | gp3 Provisioned IOPS SSD: io1 | io2 Throughput Optimized HDD: st1 Cold HDD: sc1 Magnetic: standard Throughput Optimized HDD ( st1) and Cold HDD ( sc1) volumes can't be used as boot volumes. For more information, see [Amazon EBS volume types](https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volume-types.html) in the *Amazon EBS User Guide*. Default: gp2",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags to apply to the volume during creation.",
  ).optional(),
  VolumeInitializationRate: z.number().int().describe(
    "Specifies the Amazon EBS Provisioned Rate for Volume Initialization (volume initialization rate), in MiB/s, at which to download the snapshot blocks from Amazon S3 to the volume. This is also known as *volume initialization*. Specifying a volume initialization rate ensures that the volume is initialized at a predictable and consistent rate after creation. This parameter is supported only for volumes created from snapshots. Omit this parameter if: You want to create the volume using fast snapshot restore. You must specify a snapshot that is enabled for fast snapshot restore. In this case, the volume is fully initialized at creation. If you specify a snapshot that is enabled for fast snapshot restore and a volume initialization rate, the volume will be initialized at the specified rate instead of fast snapshot restore. You want to create a volume that is initialized at the default rate. For more information, see [Initialize Amazon EBS volumes](https://docs.aws.amazon.com/ebs/latest/userguide/initalize-volume.html) in the *Amazon EC2 User Guide*. Valid range: 100 - 300 MiB/s",
  ).optional(),
});

const StateSchema = z.object({
  MultiAttachEnabled: z.boolean().optional(),
  KmsKeyId: z.string().optional(),
  Encrypted: z.boolean().optional(),
  Size: z.number().optional(),
  AutoEnableIO: z.boolean().optional(),
  OutpostArn: z.string().optional(),
  AvailabilityZone: z.string().optional(),
  AvailabilityZoneId: z.string().optional(),
  Throughput: z.number().optional(),
  Iops: z.number().optional(),
  SnapshotId: z.string().optional(),
  SourceVolumeId: z.string().optional(),
  VolumeType: z.string().optional(),
  VolumeId: z.string(),
  Tags: z.array(TagSchema).optional(),
  VolumeInitializationRate: z.number().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  MultiAttachEnabled: z.boolean().describe(
    "Indicates whether Amazon EBS Multi-Attach is enabled. CFNlong does not currently support updating a single-attach volume to be multi-attach enabled, updating a multi-attach enabled volume to be single-attach, or updating the size or number of I/O operations per second (IOPS) of a multi-attach enabled volume.",
  ).optional(),
  KmsKeyId: z.string().describe(
    "The identifier of the kms-key-long to use for Amazon EBS encryption. If KmsKeyId is specified, the encrypted state must be true. If you omit this property and your account is enabled for encryption by default, or *Encrypted* is set to true, then the volume is encrypted using the default key specified for your account. If your account does not have a default key, then the volume is encrypted using the aws-managed-key. Alternatively, if you want to specify a different key, you can specify one of the following: Key ID. For example, 1234abcd-12ab-34cd-56ef-1234567890ab. Key alias. Specify the alias for the key, prefixed with alias/. For example, for a key with the alias my_cmk, use alias/my_cmk. Or to specify the aws-managed-key, use alias/aws/ebs. Key ARN. For example, arn:aws:kms:us-east-1:012345678910:key/1234abcd-12ab-34cd-56ef-1234567890ab. Alias ARN. For example, arn:aws:kms:us-east-1:012345678910:alias/ExampleAlias. If you are creating a volume copy, omit this parameter. The volume is automatically encrypted with the same KMS key as the source volume. You can't copy unencrypted volumes.",
  ).optional(),
  Encrypted: z.boolean().describe(
    "Indicates whether the volume should be encrypted. The effect of setting the encryption state to true depends on the volume origin (new, from a snapshot, or from an existing volume), starting encryption state, ownership, and whether encryption by default is enabled. For more information, see [Encryption by default](https://docs.aws.amazon.com/ebs/latest/userguide/work-with-ebs-encr.html#encryption-by-default) in the *Amazon EBS User Guide*. If you are creating a volume copy, omit this parameter. The volume is automatically encrypted with the same KMS key as the source volume. You can't copy unencrypted volumes.",
  ).optional(),
  Size: z.number().int().describe(
    "The size of the volume, in GiBs. Required for new empty volumes. Optional for volumes created from snapshots and volume copies. In this case, the size defaults to the size of the snapshot or source volume. You can optionally specify a size that is equal to or larger than the size of the source snapshot or volume. Supported volume sizes: gp2: 1 - 16,384 GiB gp3: 1 - 65,536 GiB io1: 4 - 16,384 GiB io2: 4 - 65,536 GiB st1 and sc1: 125 - 16,384 GiB standard: 1 - 1024 GiB",
  ).optional(),
  AutoEnableIO: z.boolean().describe(
    "Indicates whether the volume is auto-enabled for I/O operations. By default, EBS disables I/O to the volume from attached EC2 instances when it determines that a volume's data is potentially inconsistent. If the consistency of the volume is not a concern, and you prefer that the volume be made available immediately if it's impaired, you can configure the volume to automatically enable I/O.",
  ).optional(),
  OutpostArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the Outpost on which to create the volume. If you intend to use a volume with an instance running on an outpost, then you must create the volume on the same outpost as the instance. You can't use a volume created in an AWS Region with an instance on an AWS outpost, or the other way around.",
  ).optional(),
  AvailabilityZone: z.string().describe(
    "The ID of the Availability Zone in which to create the volume. For example, us-east-1a. Either AvailabilityZone or AvailabilityZoneId must be specified, but not both. If you are creating a volume copy, omit this parameter. The volume copy is created in the same Availability Zone as the source volume.",
  ).optional(),
  AvailabilityZoneId: z.string().describe(
    "The ID of the Availability Zone in which to create the volume. For example, use1-az1. Either AvailabilityZone or AvailabilityZoneId must be specified, but not both. If you are creating a volume copy, omit this parameter. The volume copy is created in the same Availability Zone as the source volume.",
  ).optional(),
  Throughput: z.number().int().describe(
    "The throughput to provision for a volume, with a maximum of 2,000 MiB/s. This parameter is valid only for gp3 volumes. The default value is 125. Valid Range: Minimum value of 125. Maximum value of 2000. The maximum ratio of throughput to IOPS is 0.25 MiB/s per IOPS. For example, a volume with 3,000 IOPS can have a maximum throughput of 750 MiB/s (3,000 x 0.25).",
  ).optional(),
  Iops: z.number().int().describe(
    "The number of I/O operations per second (IOPS) to provision for the volume. Required for io1 and io2 volumes. Optional for gp3 volumes. Omit for all other volume types. Valid ranges: gp3: 3,000 (*default*) - 80,000 IOPS io1: 100 - 64,000 IOPS io2: 100 - 256,000 IOPS [Instances built on the Nitro System](https://docs.aws.amazon.com/ec2/latest/instancetypes/ec2-nitro-instances.html) can support up to 256,000 IOPS. Other instances can support up to 32,000 IOPS.",
  ).optional(),
  SnapshotId: z.string().describe(
    "The snapshot from which to create the volume. Only specify to create a volume from a snapshot. To create a new empty volume, omit this parameter and specify a value for Size instead. To create a volume copy, omit this parameter and specify SourceVolumeId instead.",
  ).optional(),
  SourceVolumeId: z.string().describe(
    "The ID of the source EBS volume to copy. When specified, the volume is created as an exact copy of the specified volume. Only specify to create a volume copy. To create a new empty volume or to create a volume from a snapshot, omit this parameter,",
  ).optional(),
  VolumeType: z.string().describe(
    "The volume type. This parameter can be one of the following values: General Purpose SSD: gp2 | gp3 Provisioned IOPS SSD: io1 | io2 Throughput Optimized HDD: st1 Cold HDD: sc1 Magnetic: standard Throughput Optimized HDD ( st1) and Cold HDD ( sc1) volumes can't be used as boot volumes. For more information, see [Amazon EBS volume types](https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volume-types.html) in the *Amazon EBS User Guide*. Default: gp2",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags to apply to the volume during creation.",
  ).optional(),
  VolumeInitializationRate: z.number().int().describe(
    "Specifies the Amazon EBS Provisioned Rate for Volume Initialization (volume initialization rate), in MiB/s, at which to download the snapshot blocks from Amazon S3 to the volume. This is also known as *volume initialization*. Specifying a volume initialization rate ensures that the volume is initialized at a predictable and consistent rate after creation. This parameter is supported only for volumes created from snapshots. Omit this parameter if: You want to create the volume using fast snapshot restore. You must specify a snapshot that is enabled for fast snapshot restore. In this case, the volume is fully initialized at creation. If you specify a snapshot that is enabled for fast snapshot restore and a volume initialization rate, the volume will be initialized at the specified rate instead of fast snapshot restore. You want to create a volume that is initialized at the default rate. For more information, see [Initialize Amazon EBS volumes](https://docs.aws.amazon.com/ebs/latest/userguide/initalize-volume.html) in the *Amazon EC2 User Guide*. Valid range: 100 - 300 MiB/s",
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

/** Swamp extension model for EC2 Volume. Registered at `@swamp/aws/ec2/volume`. */
export const model = {
  type: "@swamp/aws/ec2/volume",
  version: "2026.06.15.1",
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
      toVersion: "2026.06.06.1",
      description: "Added: accessKeyId, secretAccessKey, sessionToken, region",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.15.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "EC2 Volume resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EC2 Volume",
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
          "AWS::EC2::Volume",
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
      description: "Get a EC2 Volume",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 Volume",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::EC2::Volume",
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
      description: "Update a EC2 Volume",
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
          "AWS::EC2::Volume",
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
          "AWS::EC2::Volume",
          identifier,
          currentState,
          desiredState,
          undefined,
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
      description: "Delete a EC2 Volume",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 Volume",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::EC2::Volume",
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
      description: "Sync EC2 Volume state from AWS",
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
            "AWS::EC2::Volume",
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
