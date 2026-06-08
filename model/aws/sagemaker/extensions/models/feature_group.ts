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

// Auto-generated extension model for @swamp/aws/sagemaker/feature-group
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SageMaker FeatureGroup (AWS::SageMaker::FeatureGroup).
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

const FeatureDefinitionSchema = z.object({
  FeatureName: z.string().min(1).max(64).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9]){0,63}"),
  ),
  FeatureType: z.enum(["Integral", "Fractional", "String"]),
});

const OnlineStoreSecurityConfigSchema = z.object({
  KmsKeyId: z.string().max(2048).optional(),
});

const TtlDurationSchema = z.object({
  Unit: z.enum(["Seconds", "Minutes", "Hours", "Days", "Weeks"]).describe(
    "Unit of ttl configuration",
  ).optional(),
  Value: z.number().int().describe("Value of ttl configuration").optional(),
});

const S3StorageConfigSchema = z.object({
  S3Uri: z.string().max(1024).regex(new RegExp("^(https|s3)://([^/]+)/?(.*)$")),
  KmsKeyId: z.string().max(2048).optional(),
});

const DataCatalogConfigSchema = z.object({
  TableName: z.string().min(1).max(255).regex(
    new RegExp("[\\u0020-\\uD7FF\\uE000-\\uFFFD\\uD800\\uDFFF\t]*"),
  ),
  Catalog: z.string().min(1).max(255).regex(
    new RegExp("[\\u0020-\\uD7FF\\uE000-\\uFFFD\\uD800\\uDFFF\t]*"),
  ),
  Database: z.string().min(1).max(255).regex(
    new RegExp("[\\u0020-\\uD7FF\\uE000-\\uFFFD\\uD800\\uDFFF\t]*"),
  ),
});

const TagSchema = z.object({
  Value: z.string(),
  Key: z.string(),
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
    "AWS region; overrides AWS_REGION environment variable. Defaults to us-east-1.",
  ).optional(),
  FeatureGroupName: z.string().min(1).max(64).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9]){0,63}"),
  ).describe("The Name of the FeatureGroup."),
  RecordIdentifierFeatureName: z.string().min(1).max(64).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9]){0,63}"),
  ).describe("The Record Identifier Feature Name."),
  EventTimeFeatureName: z.string().min(1).max(64).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9]){0,63}"),
  ).describe("The Event Time Feature Name."),
  FeatureDefinitions: z.array(FeatureDefinitionSchema).describe(
    "An Array of Feature Definition",
  ),
  OnlineStoreConfig: z.object({
    SecurityConfig: OnlineStoreSecurityConfigSchema.optional(),
    EnableOnlineStore: z.boolean().optional(),
    StorageType: z.enum(["Standard", "InMemory"]).optional(),
    TtlDuration: TtlDurationSchema.describe(
      "TTL configuration of the feature group",
    ).optional(),
  }).optional(),
  OfflineStoreConfig: z.object({
    S3StorageConfig: S3StorageConfigSchema,
    DisableGlueTableCreation: z.boolean().optional(),
    DataCatalogConfig: DataCatalogConfigSchema.optional(),
    TableFormat: z.enum(["Iceberg", "Glue"]).describe(
      "Format for the offline store feature group. Iceberg is the optimal format for feature groups shared between offline and online stores.",
    ).optional(),
  }).optional(),
  ThroughputConfig: z.object({
    ThroughputMode: z.enum(["OnDemand", "Provisioned"]).describe(
      "Throughput mode configuration of the feature group",
    ),
    ProvisionedReadCapacityUnits: z.number().int().describe(
      "For provisioned feature groups with online store enabled, this indicates the read throughput you are billed for and can consume without throttling.",
    ).optional(),
    ProvisionedWriteCapacityUnits: z.number().int().describe(
      "For provisioned feature groups, this indicates the write throughput you are billed for and can consume without throttling.",
    ).optional(),
  }).optional(),
  RoleArn: z.string().min(20).max(2048).regex(
    new RegExp("^arn:aws[a-z\\-]*:iam::\\d{12}:role/?[a-zA-Z_0-9+=,.@\\-_/]+$"),
  ).describe("Role Arn").optional(),
  Description: z.string().max(128).describe(
    "Description about the FeatureGroup.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pair to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  FeatureGroupName: z.string(),
  RecordIdentifierFeatureName: z.string().optional(),
  EventTimeFeatureName: z.string().optional(),
  FeatureDefinitions: z.array(FeatureDefinitionSchema).optional(),
  OnlineStoreConfig: z.object({
    SecurityConfig: OnlineStoreSecurityConfigSchema,
    EnableOnlineStore: z.boolean(),
    StorageType: z.string(),
    TtlDuration: TtlDurationSchema,
  }).optional(),
  OfflineStoreConfig: z.object({
    S3StorageConfig: S3StorageConfigSchema,
    DisableGlueTableCreation: z.boolean(),
    DataCatalogConfig: DataCatalogConfigSchema,
    TableFormat: z.string(),
  }).optional(),
  ThroughputConfig: z.object({
    ThroughputMode: z.string(),
    ProvisionedReadCapacityUnits: z.number(),
    ProvisionedWriteCapacityUnits: z.number(),
  }).optional(),
  RoleArn: z.string().optional(),
  Description: z.string().optional(),
  CreationTime: z.string().optional(),
  FeatureGroupStatus: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  FeatureGroupName: z.string().min(1).max(64).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9]){0,63}"),
  ).describe("The Name of the FeatureGroup.").optional(),
  RecordIdentifierFeatureName: z.string().min(1).max(64).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9]){0,63}"),
  ).describe("The Record Identifier Feature Name.").optional(),
  EventTimeFeatureName: z.string().min(1).max(64).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9]){0,63}"),
  ).describe("The Event Time Feature Name.").optional(),
  FeatureDefinitions: z.array(FeatureDefinitionSchema).describe(
    "An Array of Feature Definition",
  ).optional(),
  OnlineStoreConfig: z.object({
    SecurityConfig: OnlineStoreSecurityConfigSchema.optional(),
    EnableOnlineStore: z.boolean().optional(),
    StorageType: z.enum(["Standard", "InMemory"]).optional(),
    TtlDuration: TtlDurationSchema.describe(
      "TTL configuration of the feature group",
    ).optional(),
  }).optional(),
  OfflineStoreConfig: z.object({
    S3StorageConfig: S3StorageConfigSchema.optional(),
    DisableGlueTableCreation: z.boolean().optional(),
    DataCatalogConfig: DataCatalogConfigSchema.optional(),
    TableFormat: z.enum(["Iceberg", "Glue"]).describe(
      "Format for the offline store feature group. Iceberg is the optimal format for feature groups shared between offline and online stores.",
    ).optional(),
  }).optional(),
  ThroughputConfig: z.object({
    ThroughputMode: z.enum(["OnDemand", "Provisioned"]).describe(
      "Throughput mode configuration of the feature group",
    ).optional(),
    ProvisionedReadCapacityUnits: z.number().int().describe(
      "For provisioned feature groups with online store enabled, this indicates the read throughput you are billed for and can consume without throttling.",
    ).optional(),
    ProvisionedWriteCapacityUnits: z.number().int().describe(
      "For provisioned feature groups, this indicates the write throughput you are billed for and can consume without throttling.",
    ).optional(),
  }).optional(),
  RoleArn: z.string().min(20).max(2048).regex(
    new RegExp("^arn:aws[a-z\\-]*:iam::\\d{12}:role/?[a-zA-Z_0-9+=,.@\\-_/]+$"),
  ).describe("Role Arn").optional(),
  Description: z.string().max(128).describe(
    "Description about the FeatureGroup.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pair to apply to this resource.",
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

/** Swamp extension model for SageMaker FeatureGroup. Registered at `@swamp/aws/sagemaker/feature-group`. */
export const model = {
  type: "@swamp/aws/sagemaker/feature-group",
  version: "2026.06.08.1",
  upgrades: [
    {
      toVersion: "2026.04.01.2",
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
      description: "SageMaker FeatureGroup resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SageMaker FeatureGroup",
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
          "AWS::SageMaker::FeatureGroup",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.FeatureGroupName ?? g.FeatureGroupName)?.toString() ??
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
      description: "Get a SageMaker FeatureGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SageMaker FeatureGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::SageMaker::FeatureGroup",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.FeatureGroupName ?? context.globalArgs.FeatureGroupName)
            ?.toString() ?? args.identifier).replace(/[\/\\]/g, "_").replace(
              /\.\./g,
              "_",
            ).replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a SageMaker FeatureGroup",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.FeatureGroupName?.toString() ?? "current")
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
        const identifier = existing.FeatureGroupName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::SageMaker::FeatureGroup",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::SageMaker::FeatureGroup",
          identifier,
          currentState,
          desiredState,
          [
            "FeatureGroupName",
            "RecordIdentifierFeatureName",
            "EventTimeFeatureName",
            "SecurityConfig",
            "EnableOnlineStore",
            "StorageType",
            "OfflineStoreConfig",
            "RoleArn",
            "Description",
            "Tags",
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
      description: "Delete a SageMaker FeatureGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SageMaker FeatureGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::SageMaker::FeatureGroup",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.FeatureGroupName?.toString() ?? args.identifier)
            .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
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
      description: "Sync SageMaker FeatureGroup state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.FeatureGroupName?.toString() ?? "current")
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
        const identifier = existing.FeatureGroupName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SageMaker::FeatureGroup",
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
