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

// Auto-generated extension model for @swamp/aws/secretsmanager/rotation-schedule
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SecretsManager RotationSchedule (AWS::SecretsManager::RotationSchedule).
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

const ExternalSecretRotationMetadataItemSchema = z.object({
  Value: z.string().describe(
    "The value for the metadata item. You can specify a value that's 1 to 2048 characters in length.",
  ),
  Key: z.string().describe(
    "The key name of the metadata item. You can specify a value that's 1 to 256 characters in length.",
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
    "AWS region; overrides AWS_REGION environment variable. Defaults to us-east-1.",
  ).optional(),
  HostedRotationLambda: z.object({
    Runtime: z.string().describe(
      "The python runtime associated with the Lambda function",
    ).optional(),
    KmsKeyArn: z.string().describe(
      "The ARN of the KMS key that Secrets Manager uses to encrypt the secret. If you don't specify this value, then Secrets Manager uses the key aws/secretsmanager. If aws/secretsmanager doesn't yet exist, then Secrets Manager creates it for you automatically the first time it encrypts the secret value.",
    ).optional(),
    MasterSecretArn: z.string().describe(
      "The ARN of the secret that contains superuser credentials, if you use the alternating users rotation strategy. CloudFormation grants the execution role for the Lambda rotation function GetSecretValue permission to the secret in this property.",
    ).optional(),
    RotationLambdaName: z.string().describe(
      "The name of the Lambda rotation function.",
    ).optional(),
    RotationType: z.string().describe("The type of rotation template to use"),
    ExcludeCharacters: z.string().describe(
      "A string of the characters that you don't want in the password.",
    ).optional(),
    VpcSecurityGroupIds: z.string().describe(
      "A comma-separated list of security group IDs applied to the target database.",
    ).optional(),
    MasterSecretKmsKeyArn: z.string().describe(
      "The ARN of the KMS key that Secrets Manager used to encrypt the superuser secret, if you use the alternating users strategy and the superuser secret is encrypted with a customer managed key. You don't need to specify this property if the superuser secret is encrypted using the key aws/secretsmanager. CloudFormation grants the execution role for the Lambda rotation function Decrypt, DescribeKey, and GenerateDataKey permission to the key in this property.",
    ).optional(),
    SuperuserSecretArn: z.string().describe(
      "The ARN of the secret that contains superuser credentials, if you use the alternating users rotation strategy. CloudFormation grants the execution role for the Lambda rotation function GetSecretValue permission to the secret in this property.",
    ).optional(),
    SuperuserSecretKmsKeyArn: z.string().describe(
      "The ARN of the KMS key that Secrets Manager used to encrypt the superuser secret, if you use the alternating users strategy and the superuser secret is encrypted with a customer managed key. You don't need to specify this property if the superuser secret is encrypted using the key aws/secretsmanager. CloudFormation grants the execution role for the Lambda rotation function Decrypt, DescribeKey, and GenerateDataKey permission to the key in this property.",
    ).optional(),
    VpcSubnetIds: z.string().describe(
      "A comma separated list of VPC subnet IDs of the target database network. The Lambda rotation function is in the same subnet group.",
    ).optional(),
  }).describe(
    "Creates a new Lambda rotation function based on one of the Secrets Manager rotation function templates. To use a rotation function that already exists, specify RotationLambdaARN instead.",
  ).optional(),
  SecretId: z.string().describe("The ARN or name of the secret to rotate."),
  ExternalSecretRotationMetadata: z.array(
    ExternalSecretRotationMetadataItemSchema,
  ).describe(
    "The list of metadata needed to successfully rotate a managed external secret.",
  ).optional(),
  ExternalSecretRotationRoleArn: z.string().describe(
    "The ARN of the IAM role that is used by Secrets Manager to rotate a managed external secret.",
  ).optional(),
  RotateImmediatelyOnUpdate: z.boolean().describe(
    "Specifies whether to rotate the secret immediately or wait until the next scheduled rotation window.",
  ).optional(),
  RotationLambdaARN: z.string().describe(
    "The ARN of an existing Lambda rotation function. To specify a rotation function that is also defined in this template, use the Ref function.",
  ).optional(),
  RotationRules: z.object({
    ScheduleExpression: z.string().describe(
      "A cron() or rate() expression that defines the schedule for rotating your secret. Secrets Manager rotation schedules use UTC time zone.",
    ).optional(),
    Duration: z.string().describe(
      "The length of the rotation window in hours, for example 3h for a three hour window. Secrets Manager rotates your secret at any time during this window. The window must not extend into the next rotation window or the next UTC day. The window starts according to the ScheduleExpression. If you don't specify a Duration, for a ScheduleExpression in hours, the window automatically closes after one hour. For a ScheduleExpression in days, the window automatically closes at the end of the UTC day.",
    ).optional(),
    AutomaticallyAfterDays: z.number().int().describe(
      "The number of days between automatic scheduled rotations of the secret. You can use this value to check that your secret meets your compliance guidelines for how often secrets must be rotated.",
    ).optional(),
  }).describe(
    "A structure that defines the rotation configuration for this secret.",
  ).optional(),
});

const StateSchema = z.object({
  HostedRotationLambda: z.object({
    Runtime: z.string(),
    KmsKeyArn: z.string(),
    MasterSecretArn: z.string(),
    RotationLambdaName: z.string(),
    RotationType: z.string(),
    ExcludeCharacters: z.string(),
    VpcSecurityGroupIds: z.string(),
    MasterSecretKmsKeyArn: z.string(),
    SuperuserSecretArn: z.string(),
    SuperuserSecretKmsKeyArn: z.string(),
    VpcSubnetIds: z.string(),
  }).optional(),
  SecretId: z.string().optional(),
  ExternalSecretRotationMetadata: z.array(
    ExternalSecretRotationMetadataItemSchema,
  ).optional(),
  Id: z.string(),
  ExternalSecretRotationRoleArn: z.string().optional(),
  RotateImmediatelyOnUpdate: z.boolean().optional(),
  RotationLambdaARN: z.string().optional(),
  RotationRules: z.object({
    ScheduleExpression: z.string(),
    Duration: z.string(),
    AutomaticallyAfterDays: z.number(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  HostedRotationLambda: z.object({
    Runtime: z.string().describe(
      "The python runtime associated with the Lambda function",
    ).optional(),
    KmsKeyArn: z.string().describe(
      "The ARN of the KMS key that Secrets Manager uses to encrypt the secret. If you don't specify this value, then Secrets Manager uses the key aws/secretsmanager. If aws/secretsmanager doesn't yet exist, then Secrets Manager creates it for you automatically the first time it encrypts the secret value.",
    ).optional(),
    MasterSecretArn: z.string().describe(
      "The ARN of the secret that contains superuser credentials, if you use the alternating users rotation strategy. CloudFormation grants the execution role for the Lambda rotation function GetSecretValue permission to the secret in this property.",
    ).optional(),
    RotationLambdaName: z.string().describe(
      "The name of the Lambda rotation function.",
    ).optional(),
    RotationType: z.string().describe("The type of rotation template to use")
      .optional(),
    ExcludeCharacters: z.string().describe(
      "A string of the characters that you don't want in the password.",
    ).optional(),
    VpcSecurityGroupIds: z.string().describe(
      "A comma-separated list of security group IDs applied to the target database.",
    ).optional(),
    MasterSecretKmsKeyArn: z.string().describe(
      "The ARN of the KMS key that Secrets Manager used to encrypt the superuser secret, if you use the alternating users strategy and the superuser secret is encrypted with a customer managed key. You don't need to specify this property if the superuser secret is encrypted using the key aws/secretsmanager. CloudFormation grants the execution role for the Lambda rotation function Decrypt, DescribeKey, and GenerateDataKey permission to the key in this property.",
    ).optional(),
    SuperuserSecretArn: z.string().describe(
      "The ARN of the secret that contains superuser credentials, if you use the alternating users rotation strategy. CloudFormation grants the execution role for the Lambda rotation function GetSecretValue permission to the secret in this property.",
    ).optional(),
    SuperuserSecretKmsKeyArn: z.string().describe(
      "The ARN of the KMS key that Secrets Manager used to encrypt the superuser secret, if you use the alternating users strategy and the superuser secret is encrypted with a customer managed key. You don't need to specify this property if the superuser secret is encrypted using the key aws/secretsmanager. CloudFormation grants the execution role for the Lambda rotation function Decrypt, DescribeKey, and GenerateDataKey permission to the key in this property.",
    ).optional(),
    VpcSubnetIds: z.string().describe(
      "A comma separated list of VPC subnet IDs of the target database network. The Lambda rotation function is in the same subnet group.",
    ).optional(),
  }).describe(
    "Creates a new Lambda rotation function based on one of the Secrets Manager rotation function templates. To use a rotation function that already exists, specify RotationLambdaARN instead.",
  ).optional(),
  SecretId: z.string().describe("The ARN or name of the secret to rotate.")
    .optional(),
  ExternalSecretRotationMetadata: z.array(
    ExternalSecretRotationMetadataItemSchema,
  ).describe(
    "The list of metadata needed to successfully rotate a managed external secret.",
  ).optional(),
  ExternalSecretRotationRoleArn: z.string().describe(
    "The ARN of the IAM role that is used by Secrets Manager to rotate a managed external secret.",
  ).optional(),
  RotateImmediatelyOnUpdate: z.boolean().describe(
    "Specifies whether to rotate the secret immediately or wait until the next scheduled rotation window.",
  ).optional(),
  RotationLambdaARN: z.string().describe(
    "The ARN of an existing Lambda rotation function. To specify a rotation function that is also defined in this template, use the Ref function.",
  ).optional(),
  RotationRules: z.object({
    ScheduleExpression: z.string().describe(
      "A cron() or rate() expression that defines the schedule for rotating your secret. Secrets Manager rotation schedules use UTC time zone.",
    ).optional(),
    Duration: z.string().describe(
      "The length of the rotation window in hours, for example 3h for a three hour window. Secrets Manager rotates your secret at any time during this window. The window must not extend into the next rotation window or the next UTC day. The window starts according to the ScheduleExpression. If you don't specify a Duration, for a ScheduleExpression in hours, the window automatically closes after one hour. For a ScheduleExpression in days, the window automatically closes at the end of the UTC day.",
    ).optional(),
    AutomaticallyAfterDays: z.number().int().describe(
      "The number of days between automatic scheduled rotations of the secret. You can use this value to check that your secret meets your compliance guidelines for how often secrets must be rotated.",
    ).optional(),
  }).describe(
    "A structure that defines the rotation configuration for this secret.",
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

/** Swamp extension model for SecretsManager RotationSchedule. Registered at `@swamp/aws/secretsmanager/rotation-schedule`. */
export const model = {
  type: "@swamp/aws/secretsmanager/rotation-schedule",
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
      description: "SecretsManager RotationSchedule resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SecretsManager RotationSchedule",
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
          "AWS::SecretsManager::RotationSchedule",
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
      description: "Get a SecretsManager RotationSchedule",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SecretsManager RotationSchedule",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::SecretsManager::RotationSchedule",
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
      description: "Update a SecretsManager RotationSchedule",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::SecretsManager::RotationSchedule",
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
          "AWS::SecretsManager::RotationSchedule",
          identifier,
          currentState,
          desiredState,
          ["SecretId"],
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
      description: "Delete a SecretsManager RotationSchedule",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SecretsManager RotationSchedule",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::SecretsManager::RotationSchedule",
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
      description: "Sync SecretsManager RotationSchedule state from AWS",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SecretsManager::RotationSchedule",
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
