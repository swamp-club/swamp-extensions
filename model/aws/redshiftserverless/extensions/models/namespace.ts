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

// Auto-generated extension model for @swamp/aws/redshiftserverless/namespace
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any no-control-regex

/**
 * Swamp extension model for RedshiftServerless Namespace (AWS::RedshiftServerless::Namespace).
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
  Key: z.string().min(1).max(128),
  Value: z.string().min(0).max(256),
});

const SnapshotCopyConfigurationSchema = z.object({
  DestinationRegion: z.string(),
  DestinationKmsKeyId: z.string().optional(),
  SnapshotRetentionPeriod: z.number().int().optional(),
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
  AdminPasswordSecretKmsKeyId: z.string().describe(
    "The ID of the AWS Key Management Service (KMS) key used to encrypt and store the namespace's admin credentials secret. You can only use this parameter if manageAdminPassword is true.",
  ).optional(),
  AdminUserPassword: z.string().min(8).max(64).regex(
    new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[^\\x00-\\x20\\x22\\x27\\x2f\\x40\\x5c\\x7f-\\uffff]+",
    ),
  ).describe(
    "The password associated with the admin user for the namespace that is being created. Password must be at least 8 characters in length, should be any printable ASCII character. Must contain at least one lowercase letter, one uppercase letter and one decimal digit. You can't use adminUserPassword if manageAdminPassword is true.",
  ).optional(),
  ManageAdminPassword: z.boolean().describe(
    "If true, Amazon Redshift uses AWS Secrets Manager to manage the namespace's admin credentials. You can't use adminUserPassword if manageAdminPassword is true. If manageAdminPassword is false or not set, Amazon Redshift uses adminUserPassword for the admin user account's password.",
  ).optional(),
  Namespace: z.object({
    AdminPasswordSecretArn: z.string().optional(),
    AdminPasswordSecretKmsKeyId: z.string().optional(),
  }).describe("Definition of Namespace resource.").optional(),
  Tags: z.array(TagSchema).describe("The list of tags for the namespace.")
    .optional(),
  FinalSnapshotName: z.string().max(255).regex(
    new RegExp("[a-z][a-z0-9]*(-[a-z0-9]+)*"),
  ).describe(
    "The name of the namespace the source snapshot was created from. Please specify the name if needed before deleting namespace",
  ).optional(),
  FinalSnapshotRetentionPeriod: z.number().int().describe(
    "The number of days to retain automated snapshot in the destination region after they are copied from the source region. If the value is -1, the manual snapshot is retained indefinitely. The value must be either -1 or an integer between 1 and 3,653.",
  ).optional(),
  NamespaceResourcePolicy: z.record(z.string(), z.unknown()).describe(
    "The resource policy document that will be attached to the namespace.",
  ).optional(),
  RedshiftIdcApplicationArn: z.string().describe(
    "The ARN for the Redshift application that integrates with IAM Identity Center.",
  ).optional(),
  SnapshotCopyConfigurations: z.array(SnapshotCopyConfigurationSchema).describe(
    "The snapshot copy configurations for the namespace.",
  ).optional(),
});

const StateSchema = z.object({
  AdminPasswordSecretKmsKeyId: z.string().optional(),
  AdminUserPassword: z.string().optional(),
  AdminUsername: z.string().optional(),
  DbName: z.string().optional(),
  DefaultIamRoleArn: z.string().optional(),
  IamRoles: z.array(z.string()).optional(),
  KmsKeyId: z.string().optional(),
  LogExports: z.array(z.string()).optional(),
  ManageAdminPassword: z.boolean().optional(),
  Namespace: z.object({
    NamespaceArn: z.string(),
    NamespaceId: z.string(),
    NamespaceName: z.string(),
    AdminUsername: z.string(),
    DbName: z.string(),
    KmsKeyId: z.string(),
    DefaultIamRoleArn: z.string(),
    IamRoles: z.array(z.string()),
    LogExports: z.array(z.string()),
    Status: z.string(),
    CreationDate: z.string(),
    AdminPasswordSecretArn: z.string(),
    AdminPasswordSecretKmsKeyId: z.string(),
  }).optional(),
  NamespaceName: z.string(),
  Tags: z.array(TagSchema).optional(),
  FinalSnapshotName: z.string().optional(),
  FinalSnapshotRetentionPeriod: z.number().optional(),
  NamespaceResourcePolicy: z.record(z.string(), z.unknown()).optional(),
  RedshiftIdcApplicationArn: z.string().optional(),
  SnapshotCopyConfigurations: z.array(SnapshotCopyConfigurationSchema)
    .optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AdminPasswordSecretKmsKeyId: z.string().describe(
    "The ID of the AWS Key Management Service (KMS) key used to encrypt and store the namespace's admin credentials secret. You can only use this parameter if manageAdminPassword is true.",
  ).optional(),
  AdminUserPassword: z.string().min(8).max(64).regex(
    new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[^\\x00-\\x20\\x22\\x27\\x2f\\x40\\x5c\\x7f-\\uffff]+",
    ),
  ).describe(
    "The password associated with the admin user for the namespace that is being created. Password must be at least 8 characters in length, should be any printable ASCII character. Must contain at least one lowercase letter, one uppercase letter and one decimal digit. You can't use adminUserPassword if manageAdminPassword is true.",
  ).optional(),
  ManageAdminPassword: z.boolean().describe(
    "If true, Amazon Redshift uses AWS Secrets Manager to manage the namespace's admin credentials. You can't use adminUserPassword if manageAdminPassword is true. If manageAdminPassword is false or not set, Amazon Redshift uses adminUserPassword for the admin user account's password.",
  ).optional(),
  Namespace: z.object({
    AdminPasswordSecretArn: z.string().optional(),
    AdminPasswordSecretKmsKeyId: z.string().optional(),
  }).describe("Definition of Namespace resource.").optional(),
  Tags: z.array(TagSchema).describe("The list of tags for the namespace.")
    .optional(),
  FinalSnapshotName: z.string().max(255).regex(
    new RegExp("[a-z][a-z0-9]*(-[a-z0-9]+)*"),
  ).describe(
    "The name of the namespace the source snapshot was created from. Please specify the name if needed before deleting namespace",
  ).optional(),
  FinalSnapshotRetentionPeriod: z.number().int().describe(
    "The number of days to retain automated snapshot in the destination region after they are copied from the source region. If the value is -1, the manual snapshot is retained indefinitely. The value must be either -1 or an integer between 1 and 3,653.",
  ).optional(),
  NamespaceResourcePolicy: z.record(z.string(), z.unknown()).describe(
    "The resource policy document that will be attached to the namespace.",
  ).optional(),
  RedshiftIdcApplicationArn: z.string().describe(
    "The ARN for the Redshift application that integrates with IAM Identity Center.",
  ).optional(),
  SnapshotCopyConfigurations: z.array(SnapshotCopyConfigurationSchema).describe(
    "The snapshot copy configurations for the namespace.",
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

/** Swamp extension model for RedshiftServerless Namespace. Registered at `@swamp/aws/redshiftserverless/namespace`. */
export const model = {
  type: "@swamp/aws/redshiftserverless/namespace",
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
      description: "RedshiftServerless Namespace resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a RedshiftServerless Namespace",
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
          "AWS::RedshiftServerless::Namespace",
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
      description: "Get a RedshiftServerless Namespace",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the RedshiftServerless Namespace",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::RedshiftServerless::Namespace",
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
      description: "Update a RedshiftServerless Namespace",
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
        const identifier = existing.NamespaceName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::RedshiftServerless::Namespace",
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
          "AWS::RedshiftServerless::Namespace",
          identifier,
          currentState,
          desiredState,
          ["NamespaceName"],
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
      description: "Delete a RedshiftServerless Namespace",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the RedshiftServerless Namespace",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::RedshiftServerless::Namespace",
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
      description: "Sync RedshiftServerless Namespace state from AWS",
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
        const identifier = existing.NamespaceName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::RedshiftServerless::Namespace",
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
