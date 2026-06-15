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

// Auto-generated extension model for @swamp/aws/neptune/dbcluster
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Neptune DBCluster (AWS::Neptune::DBCluster).
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

const DBClusterRoleSchema = z.object({
  FeatureName: z.string().describe(
    "The name of the feature associated with the AWS Identity and Access Management (IAM) role. For the list of supported feature names, see DBEngineVersion in the Amazon Neptune API Reference.",
  ).optional(),
  RoleArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the IAM role that is associated with the DB cluster.",
  ),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ).optional(),
});

const GlobalArgsSchema = z.object({
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
  AssociatedRoles: z.array(DBClusterRoleSchema).describe(
    "Provides a list of the AWS Identity and Access Management (IAM) roles that are associated with the DB cluster. IAM roles that are associated with a DB cluster grant permission for the DB cluster to access other AWS services on your behalf.",
  ).optional(),
  AvailabilityZones: z.array(z.string()).describe(
    "Provides the list of EC2 Availability Zones that instances in the DB cluster can be created in.",
  ).optional(),
  BackupRetentionPeriod: z.number().int().min(1).describe(
    "Specifies the number of days for which automatic DB snapshots are retained.",
  ).optional(),
  CopyTagsToSnapshot: z.boolean().describe(
    "A value that indicates whether to copy all tags from the DB cluster to snapshots of the DB cluster. The default behaviour is not to copy them.",
  ).optional(),
  DBClusterIdentifier: z.string().min(1).max(63).regex(
    new RegExp("^[a-zA-Z]{1}(?:-?[a-zA-Z0-9]){0,62}$"),
  ).describe(
    "The DB cluster identifier. Contains a user-supplied DB cluster identifier. This identifier is the unique key that identifies a DB cluster stored as a lowercase string.",
  ).optional(),
  DBClusterParameterGroupName: z.string().describe(
    "Provides the name of the DB cluster parameter group.",
  ).optional(),
  DBInstanceParameterGroupName: z.string().describe(
    "The name of the DB parameter group to apply to all instances of the DB cluster. Used only in case of a major EngineVersion upgrade request.",
  ).optional(),
  DBPort: z.number().int().describe(
    "The port number on which the DB instances in the DB cluster accept connections. If not specified, the default port used is `8182`. Note: `Port` property will soon be deprecated from this resource. Please update existing templates to rename it with new property `DBPort` having same functionalities.",
  ).optional(),
  DBSubnetGroupName: z.string().describe(
    "Specifies information on the subnet group associated with the DB cluster, including the name, description, and subnets in the subnet group.",
  ).optional(),
  DeletionProtection: z.boolean().describe(
    "Indicates whether or not the DB cluster has deletion protection enabled. The database can't be deleted when deletion protection is enabled.",
  ).optional(),
  EnableCloudwatchLogsExports: z.array(z.string()).describe(
    "Specifies a list of log types that are enabled for export to CloudWatch Logs.",
  ).optional(),
  EngineVersion: z.string().describe("Indicates the database engine version.")
    .optional(),
  GlobalClusterIdentifier: z.string().min(1).max(255).regex(
    new RegExp("^[A-Za-z][0-9A-Za-z-:._]*$"),
  ).describe(
    "The ID of the Neptune global database to which this new DB cluster should be added.",
  ).optional(),
  IamAuthEnabled: z.boolean().describe(
    "True if mapping of Amazon Identity and Access Management (IAM) accounts to database accounts is enabled, and otherwise false.",
  ).optional(),
  KmsKeyId: z.string().describe(
    "The Amazon Resource Name (ARN) of the AWS KMS key that is used to encrypt the database instances in the DB cluster, such as arn:aws:kms:us-east-1:012345678910:key/abcd1234-a123-456a-a12b-a123b4cd56ef. If you enable the StorageEncrypted property but don't specify this property, the default KMS key is used. If you specify this property, you must set the StorageEncrypted property to true.",
  ).optional(),
  PreferredBackupWindow: z.string().describe(
    "Specifies the daily time range during which automated backups are created if automated backups are enabled, as determined by the BackupRetentionPeriod.",
  ).optional(),
  PreferredMaintenanceWindow: z.string().describe(
    "Specifies the weekly time range during which system maintenance can occur, in Universal Coordinated Time (UTC).",
  ).optional(),
  RestoreToTime: z.string().describe(
    "Creates a new DB cluster from a DB snapshot or DB cluster snapshot. If a DB snapshot is specified, the target DB cluster is created from the source DB snapshot with a default configuration and default security group. If a DB cluster snapshot is specified, the target DB cluster is created from the source DB cluster restore point with the same configuration as the original source DB cluster, except that the new DB cluster is created with the default security group.",
  ).optional(),
  RestoreType: z.string().describe(
    "Creates a new DB cluster from a DB snapshot or DB cluster snapshot. If a DB snapshot is specified, the target DB cluster is created from the source DB snapshot with a default configuration and default security group. If a DB cluster snapshot is specified, the target DB cluster is created from the source DB cluster restore point with the same configuration as the original source DB cluster, except that the new DB cluster is created with the default security group.",
  ).optional(),
  ServerlessScalingConfiguration: z.object({
    MinCapacity: z.number().min(1).max(128).describe(
      "The minimum number of Neptune capacity units (NCUs) for a DB instance in an Neptune Serverless cluster. You can specify NCU values in half-step increments, such as 8, 8.5, 9, and so on. The smallest value you can use is 1, whereas the largest is 128.",
    ),
    MaxCapacity: z.number().min(2.5).max(128).describe(
      "The maximum number of Neptune capacity units (NCUs) for a DB instance in an Neptune Serverless cluster. You can specify NCU values in half-step increments, such as 40, 40.5, 41, and so on. The smallest value you can use is 2.5, whereas the largest is 128.",
    ),
  }).describe(
    "Contains the scaling configuration used by the Neptune Serverless Instances within this DB cluster.",
  ).optional(),
  SnapshotIdentifier: z.string().describe(
    "Specifies the identifier for a DB cluster snapshot. Must match the identifier of an existing snapshot. After you restore a DB cluster using a SnapshotIdentifier, you must specify the same SnapshotIdentifier for any future updates to the DB cluster. When you specify this property for an update, the DB cluster is not restored from the snapshot again, and the data in the database is not changed. However, if you don't specify the SnapshotIdentifier, an empty DB cluster is created, and the original DB cluster is deleted. If you specify a property that is different from the previous snapshot restore property, the DB cluster is restored from the snapshot specified by the SnapshotIdentifier, and the original DB cluster is deleted.",
  ).optional(),
  SourceDBClusterIdentifier: z.string().describe(
    "Creates a new DB cluster from a DB snapshot or DB cluster snapshot. If a DB snapshot is specified, the target DB cluster is created from the source DB snapshot with a default configuration and default security group. If a DB cluster snapshot is specified, the target DB cluster is created from the source DB cluster restore point with the same configuration as the original source DB cluster, except that the new DB cluster is created with the default security group.",
  ).optional(),
  StorageEncrypted: z.boolean().describe(
    "Indicates whether the DB cluster is encrypted. If you specify the KmsKeyId property, then you must enable encryption and set this property to true. If you enable the StorageEncrypted property but don't specify KmsKeyId property, then the default KMS key is used. If you specify KmsKeyId property, then that KMS Key is used to encrypt the database instances in the DB cluster. If you specify the SourceDBClusterIdentifier property and don't specify this property or disable it. The value is inherited from the source DB cluster, and if the DB cluster is encrypted, the KmsKeyId property from the source cluster is used. If you specify the DBSnapshotIdentifier and don't specify this property or disable it. The value is inherited from the snapshot, and the specified KmsKeyId property from the snapshot is used.",
  ).optional(),
  Tags: z.array(TagSchema).describe("The tags assigned to this cluster.")
    .optional(),
  UseLatestRestorableTime: z.boolean().describe(
    "Creates a new DB cluster from a DB snapshot or DB cluster snapshot. If a DB snapshot is specified, the target DB cluster is created from the source DB snapshot with a default configuration and default security group. If a DB cluster snapshot is specified, the target DB cluster is created from the source DB cluster restore point with the same configuration as the original source DB cluster, except that the new DB cluster is created with the default security group.",
  ).optional(),
  VpcSecurityGroupIds: z.array(z.string()).describe(
    "Provides a list of VPC security groups that the DB cluster belongs to.",
  ).optional(),
  NetworkType: z.enum(["IPV4", "DUAL"]).describe(
    "The network type of the DB cluster.",
  ).optional(),
});

const StateSchema = z.object({
  Endpoint: z.string().optional(),
  ReadEndpoint: z.string().optional(),
  ClusterResourceId: z.string().optional(),
  AssociatedRoles: z.array(DBClusterRoleSchema).optional(),
  AvailabilityZones: z.array(z.string()).optional(),
  BackupRetentionPeriod: z.number().optional(),
  CopyTagsToSnapshot: z.boolean().optional(),
  DBClusterIdentifier: z.string(),
  DBClusterParameterGroupName: z.string().optional(),
  DBInstanceParameterGroupName: z.string().optional(),
  DBPort: z.number().optional(),
  DBSubnetGroupName: z.string().optional(),
  DeletionProtection: z.boolean().optional(),
  EnableCloudwatchLogsExports: z.array(z.string()).optional(),
  EngineVersion: z.string().optional(),
  GlobalClusterIdentifier: z.string().optional(),
  IamAuthEnabled: z.boolean().optional(),
  KmsKeyId: z.string().optional(),
  Port: z.string().optional(),
  PreferredBackupWindow: z.string().optional(),
  PreferredMaintenanceWindow: z.string().optional(),
  RestoreToTime: z.string().optional(),
  RestoreType: z.string().optional(),
  ServerlessScalingConfiguration: z.object({
    MinCapacity: z.number(),
    MaxCapacity: z.number(),
  }).optional(),
  SnapshotIdentifier: z.string().optional(),
  SourceDBClusterIdentifier: z.string().optional(),
  StorageEncrypted: z.boolean().optional(),
  Tags: z.array(TagSchema).optional(),
  UseLatestRestorableTime: z.boolean().optional(),
  VpcSecurityGroupIds: z.array(z.string()).optional(),
  NetworkType: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AssociatedRoles: z.array(DBClusterRoleSchema).describe(
    "Provides a list of the AWS Identity and Access Management (IAM) roles that are associated with the DB cluster. IAM roles that are associated with a DB cluster grant permission for the DB cluster to access other AWS services on your behalf.",
  ).optional(),
  AvailabilityZones: z.array(z.string()).describe(
    "Provides the list of EC2 Availability Zones that instances in the DB cluster can be created in.",
  ).optional(),
  BackupRetentionPeriod: z.number().int().min(1).describe(
    "Specifies the number of days for which automatic DB snapshots are retained.",
  ).optional(),
  CopyTagsToSnapshot: z.boolean().describe(
    "A value that indicates whether to copy all tags from the DB cluster to snapshots of the DB cluster. The default behaviour is not to copy them.",
  ).optional(),
  DBClusterIdentifier: z.string().min(1).max(63).regex(
    new RegExp("^[a-zA-Z]{1}(?:-?[a-zA-Z0-9]){0,62}$"),
  ).describe(
    "The DB cluster identifier. Contains a user-supplied DB cluster identifier. This identifier is the unique key that identifies a DB cluster stored as a lowercase string.",
  ).optional(),
  DBClusterParameterGroupName: z.string().describe(
    "Provides the name of the DB cluster parameter group.",
  ).optional(),
  DBInstanceParameterGroupName: z.string().describe(
    "The name of the DB parameter group to apply to all instances of the DB cluster. Used only in case of a major EngineVersion upgrade request.",
  ).optional(),
  DBPort: z.number().int().describe(
    "The port number on which the DB instances in the DB cluster accept connections. If not specified, the default port used is `8182`. Note: `Port` property will soon be deprecated from this resource. Please update existing templates to rename it with new property `DBPort` having same functionalities.",
  ).optional(),
  DBSubnetGroupName: z.string().describe(
    "Specifies information on the subnet group associated with the DB cluster, including the name, description, and subnets in the subnet group.",
  ).optional(),
  DeletionProtection: z.boolean().describe(
    "Indicates whether or not the DB cluster has deletion protection enabled. The database can't be deleted when deletion protection is enabled.",
  ).optional(),
  EnableCloudwatchLogsExports: z.array(z.string()).describe(
    "Specifies a list of log types that are enabled for export to CloudWatch Logs.",
  ).optional(),
  EngineVersion: z.string().describe("Indicates the database engine version.")
    .optional(),
  GlobalClusterIdentifier: z.string().min(1).max(255).regex(
    new RegExp("^[A-Za-z][0-9A-Za-z-:._]*$"),
  ).describe(
    "The ID of the Neptune global database to which this new DB cluster should be added.",
  ).optional(),
  IamAuthEnabled: z.boolean().describe(
    "True if mapping of Amazon Identity and Access Management (IAM) accounts to database accounts is enabled, and otherwise false.",
  ).optional(),
  KmsKeyId: z.string().describe(
    "The Amazon Resource Name (ARN) of the AWS KMS key that is used to encrypt the database instances in the DB cluster, such as arn:aws:kms:us-east-1:012345678910:key/abcd1234-a123-456a-a12b-a123b4cd56ef. If you enable the StorageEncrypted property but don't specify this property, the default KMS key is used. If you specify this property, you must set the StorageEncrypted property to true.",
  ).optional(),
  PreferredBackupWindow: z.string().describe(
    "Specifies the daily time range during which automated backups are created if automated backups are enabled, as determined by the BackupRetentionPeriod.",
  ).optional(),
  PreferredMaintenanceWindow: z.string().describe(
    "Specifies the weekly time range during which system maintenance can occur, in Universal Coordinated Time (UTC).",
  ).optional(),
  RestoreToTime: z.string().describe(
    "Creates a new DB cluster from a DB snapshot or DB cluster snapshot. If a DB snapshot is specified, the target DB cluster is created from the source DB snapshot with a default configuration and default security group. If a DB cluster snapshot is specified, the target DB cluster is created from the source DB cluster restore point with the same configuration as the original source DB cluster, except that the new DB cluster is created with the default security group.",
  ).optional(),
  RestoreType: z.string().describe(
    "Creates a new DB cluster from a DB snapshot or DB cluster snapshot. If a DB snapshot is specified, the target DB cluster is created from the source DB snapshot with a default configuration and default security group. If a DB cluster snapshot is specified, the target DB cluster is created from the source DB cluster restore point with the same configuration as the original source DB cluster, except that the new DB cluster is created with the default security group.",
  ).optional(),
  ServerlessScalingConfiguration: z.object({
    MinCapacity: z.number().min(1).max(128).describe(
      "The minimum number of Neptune capacity units (NCUs) for a DB instance in an Neptune Serverless cluster. You can specify NCU values in half-step increments, such as 8, 8.5, 9, and so on. The smallest value you can use is 1, whereas the largest is 128.",
    ).optional(),
    MaxCapacity: z.number().min(2.5).max(128).describe(
      "The maximum number of Neptune capacity units (NCUs) for a DB instance in an Neptune Serverless cluster. You can specify NCU values in half-step increments, such as 40, 40.5, 41, and so on. The smallest value you can use is 2.5, whereas the largest is 128.",
    ).optional(),
  }).describe(
    "Contains the scaling configuration used by the Neptune Serverless Instances within this DB cluster.",
  ).optional(),
  SnapshotIdentifier: z.string().describe(
    "Specifies the identifier for a DB cluster snapshot. Must match the identifier of an existing snapshot. After you restore a DB cluster using a SnapshotIdentifier, you must specify the same SnapshotIdentifier for any future updates to the DB cluster. When you specify this property for an update, the DB cluster is not restored from the snapshot again, and the data in the database is not changed. However, if you don't specify the SnapshotIdentifier, an empty DB cluster is created, and the original DB cluster is deleted. If you specify a property that is different from the previous snapshot restore property, the DB cluster is restored from the snapshot specified by the SnapshotIdentifier, and the original DB cluster is deleted.",
  ).optional(),
  SourceDBClusterIdentifier: z.string().describe(
    "Creates a new DB cluster from a DB snapshot or DB cluster snapshot. If a DB snapshot is specified, the target DB cluster is created from the source DB snapshot with a default configuration and default security group. If a DB cluster snapshot is specified, the target DB cluster is created from the source DB cluster restore point with the same configuration as the original source DB cluster, except that the new DB cluster is created with the default security group.",
  ).optional(),
  StorageEncrypted: z.boolean().describe(
    "Indicates whether the DB cluster is encrypted. If you specify the KmsKeyId property, then you must enable encryption and set this property to true. If you enable the StorageEncrypted property but don't specify KmsKeyId property, then the default KMS key is used. If you specify KmsKeyId property, then that KMS Key is used to encrypt the database instances in the DB cluster. If you specify the SourceDBClusterIdentifier property and don't specify this property or disable it. The value is inherited from the source DB cluster, and if the DB cluster is encrypted, the KmsKeyId property from the source cluster is used. If you specify the DBSnapshotIdentifier and don't specify this property or disable it. The value is inherited from the snapshot, and the specified KmsKeyId property from the snapshot is used.",
  ).optional(),
  Tags: z.array(TagSchema).describe("The tags assigned to this cluster.")
    .optional(),
  UseLatestRestorableTime: z.boolean().describe(
    "Creates a new DB cluster from a DB snapshot or DB cluster snapshot. If a DB snapshot is specified, the target DB cluster is created from the source DB snapshot with a default configuration and default security group. If a DB cluster snapshot is specified, the target DB cluster is created from the source DB cluster restore point with the same configuration as the original source DB cluster, except that the new DB cluster is created with the default security group.",
  ).optional(),
  VpcSecurityGroupIds: z.array(z.string()).describe(
    "Provides a list of VPC security groups that the DB cluster belongs to.",
  ).optional(),
  NetworkType: z.enum(["IPV4", "DUAL"]).describe(
    "The network type of the DB cluster.",
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

/** Swamp extension model for Neptune DBCluster. Registered at `@swamp/aws/neptune/dbcluster`. */
export const model = {
  type: "@swamp/aws/neptune/dbcluster",
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
      toVersion: "2026.06.12.1",
      description: "Added: GlobalClusterIdentifier, NetworkType",
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
      description: "Neptune DBCluster resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Neptune DBCluster",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Neptune::DBCluster",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.DBClusterIdentifier ?? g.DBClusterIdentifier)?.toString() ??
            "current").replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(
              /\0/g,
              "",
            );
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a Neptune DBCluster",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Neptune DBCluster",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Neptune::DBCluster",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName = ((result.DBClusterIdentifier ??
          context.globalArgs.DBClusterIdentifier)?.toString() ??
          args.identifier).replace(/[\/\\]/g, "_").replace(/\.\./g, "_")
          .replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a Neptune DBCluster",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.DBClusterIdentifier?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.DBClusterIdentifier?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Neptune::DBCluster",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Neptune::DBCluster",
          identifier,
          currentState,
          desiredState,
          [
            "AvailabilityZones",
            "DBClusterIdentifier",
            "DBSubnetGroupName",
            "GlobalClusterIdentifier",
            "KmsKeyId",
            "RestoreToTime",
            "RestoreType",
            "SnapshotIdentifier",
            "SourceDBClusterIdentifier",
            "StorageEncrypted",
            "UseLatestRestorableTime",
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
      description: "Delete a Neptune DBCluster",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Neptune DBCluster",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Neptune::DBCluster",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.DBClusterIdentifier?.toString() ??
            args.identifier).replace(/[\/\\]/g, "_").replace(/\.\./g, "_")
            .replace(/\0/g, "");
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
      description: "Sync Neptune DBCluster state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.DBClusterIdentifier?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.DBClusterIdentifier?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Neptune::DBCluster",
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
