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

// Auto-generated extension model for @swamp/aws/cleanrooms/membership
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for CleanRooms Membership (AWS::CleanRooms::Membership).
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
  Value: z.string().min(1).max(256),
});

const ProtectedQueryS3OutputConfigurationSchema = z.object({
  ResultFormat: z.enum(["CSV", "PARQUET"]),
  Bucket: z.string().min(3).max(63),
  KeyPrefix: z.string().optional(),
  SingleFileOutput: z.boolean().optional(),
});

const MembershipProtectedQueryOutputConfigurationSchema = z.object({
  S3: ProtectedQueryS3OutputConfigurationSchema,
});

const ProtectedJobS3OutputConfigurationInputSchema = z.object({
  Bucket: z.string().min(3).max(63),
  KeyPrefix: z.string().optional(),
});

const MembershipProtectedJobOutputConfigurationSchema = z.object({
  S3: ProtectedJobS3OutputConfigurationInputSchema,
});

const MembershipQueryComputePaymentConfigSchema = z.object({
  IsResponsible: z.boolean(),
});

const MembershipModelTrainingPaymentConfigSchema = z.object({
  IsResponsible: z.boolean(),
});

const MembershipModelInferencePaymentConfigSchema = z.object({
  IsResponsible: z.boolean(),
});

const MembershipSyntheticDataGenerationPaymentConfigSchema = z.object({
  IsResponsible: z.boolean(),
});

const MembershipMLPaymentConfigSchema = z.object({
  ModelTraining: MembershipModelTrainingPaymentConfigSchema.optional(),
  ModelInference: MembershipModelInferencePaymentConfigSchema.optional(),
  SyntheticDataGeneration: MembershipSyntheticDataGenerationPaymentConfigSchema
    .optional(),
});

const MembershipJobComputePaymentConfigSchema = z.object({
  IsResponsible: z.boolean(),
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
  Tags: z.array(TagSchema).describe(
    "An arbitrary set of tags (key-value pairs) for this cleanrooms membership.",
  ).optional(),
  CollaborationIdentifier: z.string().min(36).max(36).regex(
    new RegExp("[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}"),
  ),
  QueryLogStatus: z.enum(["ENABLED", "DISABLED"]),
  JobLogStatus: z.enum(["ENABLED", "DISABLED"]).optional(),
  DefaultResultConfiguration: z.object({
    OutputConfiguration: MembershipProtectedQueryOutputConfigurationSchema,
    RoleArn: z.string().min(32).max(512).optional(),
  }).optional(),
  DefaultJobResultConfiguration: z.object({
    OutputConfiguration: MembershipProtectedJobOutputConfigurationSchema,
    RoleArn: z.string().min(32).max(512),
  }).optional(),
  PaymentConfiguration: z.object({
    QueryCompute: MembershipQueryComputePaymentConfigSchema,
    MachineLearning: MembershipMLPaymentConfigSchema.optional(),
    JobCompute: MembershipJobComputePaymentConfigSchema.optional(),
  }).optional(),
  IsMetricsEnabled: z.boolean().optional(),
});

const StateSchema = z.object({
  Arn: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  CollaborationArn: z.string().optional(),
  CollaborationCreatorAccountId: z.string().optional(),
  CollaborationIdentifier: z.string().optional(),
  MembershipIdentifier: z.string(),
  QueryLogStatus: z.string().optional(),
  JobLogStatus: z.string().optional(),
  DefaultResultConfiguration: z.object({
    OutputConfiguration: MembershipProtectedQueryOutputConfigurationSchema,
    RoleArn: z.string(),
  }).optional(),
  DefaultJobResultConfiguration: z.object({
    OutputConfiguration: MembershipProtectedJobOutputConfigurationSchema,
    RoleArn: z.string(),
  }).optional(),
  PaymentConfiguration: z.object({
    QueryCompute: MembershipQueryComputePaymentConfigSchema,
    MachineLearning: MembershipMLPaymentConfigSchema,
    JobCompute: MembershipJobComputePaymentConfigSchema,
  }).optional(),
  IsMetricsEnabled: z.boolean().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Tags: z.array(TagSchema).describe(
    "An arbitrary set of tags (key-value pairs) for this cleanrooms membership.",
  ).optional(),
  CollaborationIdentifier: z.string().min(36).max(36).regex(
    new RegExp("[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}"),
  ).optional(),
  QueryLogStatus: z.enum(["ENABLED", "DISABLED"]).optional(),
  JobLogStatus: z.enum(["ENABLED", "DISABLED"]).optional(),
  DefaultResultConfiguration: z.object({
    OutputConfiguration: MembershipProtectedQueryOutputConfigurationSchema
      .optional(),
    RoleArn: z.string().min(32).max(512).optional(),
  }).optional(),
  DefaultJobResultConfiguration: z.object({
    OutputConfiguration: MembershipProtectedJobOutputConfigurationSchema
      .optional(),
    RoleArn: z.string().min(32).max(512).optional(),
  }).optional(),
  PaymentConfiguration: z.object({
    QueryCompute: MembershipQueryComputePaymentConfigSchema.optional(),
    MachineLearning: MembershipMLPaymentConfigSchema.optional(),
    JobCompute: MembershipJobComputePaymentConfigSchema.optional(),
  }).optional(),
  IsMetricsEnabled: z.boolean().optional(),
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

/** Swamp extension model for CleanRooms Membership. Registered at `@swamp/aws/cleanrooms/membership`. */
export const model = {
  type: "@swamp/aws/cleanrooms/membership",
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
      description: "CleanRooms Membership resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CleanRooms Membership",
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
          "AWS::CleanRooms::Membership",
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
      description: "Get a CleanRooms Membership",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CleanRooms Membership",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::CleanRooms::Membership",
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
      description: "Update a CleanRooms Membership",
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
        const identifier = existing.MembershipIdentifier?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::CleanRooms::Membership",
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
          "AWS::CleanRooms::Membership",
          identifier,
          currentState,
          desiredState,
          ["CollaborationIdentifier"],
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
      description: "Delete a CleanRooms Membership",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CleanRooms Membership",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::CleanRooms::Membership",
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
      description: "Sync CleanRooms Membership state from AWS",
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
        const identifier = existing.MembershipIdentifier?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::CleanRooms::Membership",
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
