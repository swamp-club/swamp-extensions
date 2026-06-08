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

// Auto-generated extension model for @swamp/aws/inspectorv2/filter
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for InspectorV2 Filter (AWS::InspectorV2::Filter).
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

const StringFilterSchema = z.object({
  Comparison: z.enum(["EQUALS", "PREFIX", "NOT_EQUALS"]),
  Value: z.string().min(1).max(1024),
});

const DateFilterSchema = z.object({
  EndInclusive: z.number().int().optional(),
  StartInclusive: z.number().int().optional(),
});

const NumberFilterSchema = z.object({
  LowerInclusive: z.number().optional(),
  UpperInclusive: z.number().optional(),
});

const PortRangeFilterSchema = z.object({
  BeginInclusive: z.number().int().min(0).max(65535).optional(),
  EndInclusive: z.number().int().min(0).max(65535).optional(),
});

const MapFilterSchema = z.object({
  Comparison: z.enum(["EQUALS"]),
  Key: z.string().min(1).max(128).optional(),
  Value: z.string().min(0).max(256).optional(),
});

const PackageFilterSchema = z.object({
  Architecture: StringFilterSchema.optional(),
  Epoch: NumberFilterSchema.optional(),
  FilePath: StringFilterSchema.optional(),
  Name: StringFilterSchema.optional(),
  Release: StringFilterSchema.optional(),
  SourceLambdaLayerArn: StringFilterSchema.optional(),
  SourceLayerHash: StringFilterSchema.optional(),
  Version: StringFilterSchema.optional(),
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
  Name: z.string().min(1).max(128).describe("Findings filter name."),
  Description: z.string().min(1).max(512).describe(
    "Findings filter description.",
  ).optional(),
  FilterCriteria: z.object({
    AwsAccountId: z.array(StringFilterSchema).optional(),
    CodeVulnerabilityDetectorName: z.array(StringFilterSchema).optional(),
    CodeVulnerabilityDetectorTags: z.array(StringFilterSchema).optional(),
    CodeVulnerabilityFilePath: z.array(StringFilterSchema).optional(),
    ComponentId: z.array(StringFilterSchema).optional(),
    ComponentType: z.array(StringFilterSchema).optional(),
    Ec2InstanceImageId: z.array(StringFilterSchema).optional(),
    Ec2InstanceSubnetId: z.array(StringFilterSchema).optional(),
    Ec2InstanceVpcId: z.array(StringFilterSchema).optional(),
    EcrImageArchitecture: z.array(StringFilterSchema).optional(),
    EcrImageHash: z.array(StringFilterSchema).optional(),
    EcrImagePushedAt: z.array(DateFilterSchema).optional(),
    EcrImageRegistry: z.array(StringFilterSchema).optional(),
    EcrImageRepositoryName: z.array(StringFilterSchema).optional(),
    EcrImageTags: z.array(StringFilterSchema).optional(),
    EpssScore: z.array(NumberFilterSchema).optional(),
    ExploitAvailable: z.array(StringFilterSchema).optional(),
    FindingArn: z.array(StringFilterSchema).optional(),
    FindingStatus: z.array(StringFilterSchema).optional(),
    FindingType: z.array(StringFilterSchema).optional(),
    FirstObservedAt: z.array(DateFilterSchema).optional(),
    FixAvailable: z.array(StringFilterSchema).optional(),
    InspectorScore: z.array(NumberFilterSchema).optional(),
    LambdaFunctionExecutionRoleArn: z.array(StringFilterSchema).optional(),
    LambdaFunctionLastModifiedAt: z.array(DateFilterSchema).optional(),
    LambdaFunctionLayers: z.array(StringFilterSchema).optional(),
    LambdaFunctionName: z.array(StringFilterSchema).optional(),
    LambdaFunctionRuntime: z.array(StringFilterSchema).optional(),
    LastObservedAt: z.array(DateFilterSchema).optional(),
    NetworkProtocol: z.array(StringFilterSchema).optional(),
    PortRange: z.array(PortRangeFilterSchema).optional(),
    RelatedVulnerabilities: z.array(StringFilterSchema).optional(),
    ResourceId: z.array(StringFilterSchema).optional(),
    ResourceTags: z.array(MapFilterSchema).optional(),
    ResourceType: z.array(StringFilterSchema).optional(),
    Severity: z.array(StringFilterSchema).optional(),
    Title: z.array(StringFilterSchema).optional(),
    UpdatedAt: z.array(DateFilterSchema).optional(),
    VendorSeverity: z.array(StringFilterSchema).optional(),
    VulnerabilityId: z.array(StringFilterSchema).optional(),
    VulnerabilitySource: z.array(StringFilterSchema).optional(),
    VulnerablePackages: z.array(PackageFilterSchema).optional(),
  }).describe("Findings filter criteria."),
  FilterAction: z.enum(["NONE", "SUPPRESS"]).describe(
    "Findings filter action.",
  ),
  Tags: z.record(z.string(), z.string().regex(new RegExp("^.{1,255}$")))
    .optional(),
});

const StateSchema = z.object({
  Name: z.string().optional(),
  Description: z.string().optional(),
  FilterCriteria: z.object({
    AwsAccountId: z.array(StringFilterSchema),
    CodeVulnerabilityDetectorName: z.array(StringFilterSchema),
    CodeVulnerabilityDetectorTags: z.array(StringFilterSchema),
    CodeVulnerabilityFilePath: z.array(StringFilterSchema),
    ComponentId: z.array(StringFilterSchema),
    ComponentType: z.array(StringFilterSchema),
    Ec2InstanceImageId: z.array(StringFilterSchema),
    Ec2InstanceSubnetId: z.array(StringFilterSchema),
    Ec2InstanceVpcId: z.array(StringFilterSchema),
    EcrImageArchitecture: z.array(StringFilterSchema),
    EcrImageHash: z.array(StringFilterSchema),
    EcrImagePushedAt: z.array(DateFilterSchema),
    EcrImageRegistry: z.array(StringFilterSchema),
    EcrImageRepositoryName: z.array(StringFilterSchema),
    EcrImageTags: z.array(StringFilterSchema),
    EpssScore: z.array(NumberFilterSchema),
    ExploitAvailable: z.array(StringFilterSchema),
    FindingArn: z.array(StringFilterSchema),
    FindingStatus: z.array(StringFilterSchema),
    FindingType: z.array(StringFilterSchema),
    FirstObservedAt: z.array(DateFilterSchema),
    FixAvailable: z.array(StringFilterSchema),
    InspectorScore: z.array(NumberFilterSchema),
    LambdaFunctionExecutionRoleArn: z.array(StringFilterSchema),
    LambdaFunctionLastModifiedAt: z.array(DateFilterSchema),
    LambdaFunctionLayers: z.array(StringFilterSchema),
    LambdaFunctionName: z.array(StringFilterSchema),
    LambdaFunctionRuntime: z.array(StringFilterSchema),
    LastObservedAt: z.array(DateFilterSchema),
    NetworkProtocol: z.array(StringFilterSchema),
    PortRange: z.array(PortRangeFilterSchema),
    RelatedVulnerabilities: z.array(StringFilterSchema),
    ResourceId: z.array(StringFilterSchema),
    ResourceTags: z.array(MapFilterSchema),
    ResourceType: z.array(StringFilterSchema),
    Severity: z.array(StringFilterSchema),
    Title: z.array(StringFilterSchema),
    UpdatedAt: z.array(DateFilterSchema),
    VendorSeverity: z.array(StringFilterSchema),
    VulnerabilityId: z.array(StringFilterSchema),
    VulnerabilitySource: z.array(StringFilterSchema),
    VulnerablePackages: z.array(PackageFilterSchema),
  }).optional(),
  FilterAction: z.string().optional(),
  Arn: z.string(),
  Tags: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().min(1).max(128).describe("Findings filter name.").optional(),
  Description: z.string().min(1).max(512).describe(
    "Findings filter description.",
  ).optional(),
  FilterCriteria: z.object({
    AwsAccountId: z.array(StringFilterSchema).optional(),
    CodeVulnerabilityDetectorName: z.array(StringFilterSchema).optional(),
    CodeVulnerabilityDetectorTags: z.array(StringFilterSchema).optional(),
    CodeVulnerabilityFilePath: z.array(StringFilterSchema).optional(),
    ComponentId: z.array(StringFilterSchema).optional(),
    ComponentType: z.array(StringFilterSchema).optional(),
    Ec2InstanceImageId: z.array(StringFilterSchema).optional(),
    Ec2InstanceSubnetId: z.array(StringFilterSchema).optional(),
    Ec2InstanceVpcId: z.array(StringFilterSchema).optional(),
    EcrImageArchitecture: z.array(StringFilterSchema).optional(),
    EcrImageHash: z.array(StringFilterSchema).optional(),
    EcrImagePushedAt: z.array(DateFilterSchema).optional(),
    EcrImageRegistry: z.array(StringFilterSchema).optional(),
    EcrImageRepositoryName: z.array(StringFilterSchema).optional(),
    EcrImageTags: z.array(StringFilterSchema).optional(),
    EpssScore: z.array(NumberFilterSchema).optional(),
    ExploitAvailable: z.array(StringFilterSchema).optional(),
    FindingArn: z.array(StringFilterSchema).optional(),
    FindingStatus: z.array(StringFilterSchema).optional(),
    FindingType: z.array(StringFilterSchema).optional(),
    FirstObservedAt: z.array(DateFilterSchema).optional(),
    FixAvailable: z.array(StringFilterSchema).optional(),
    InspectorScore: z.array(NumberFilterSchema).optional(),
    LambdaFunctionExecutionRoleArn: z.array(StringFilterSchema).optional(),
    LambdaFunctionLastModifiedAt: z.array(DateFilterSchema).optional(),
    LambdaFunctionLayers: z.array(StringFilterSchema).optional(),
    LambdaFunctionName: z.array(StringFilterSchema).optional(),
    LambdaFunctionRuntime: z.array(StringFilterSchema).optional(),
    LastObservedAt: z.array(DateFilterSchema).optional(),
    NetworkProtocol: z.array(StringFilterSchema).optional(),
    PortRange: z.array(PortRangeFilterSchema).optional(),
    RelatedVulnerabilities: z.array(StringFilterSchema).optional(),
    ResourceId: z.array(StringFilterSchema).optional(),
    ResourceTags: z.array(MapFilterSchema).optional(),
    ResourceType: z.array(StringFilterSchema).optional(),
    Severity: z.array(StringFilterSchema).optional(),
    Title: z.array(StringFilterSchema).optional(),
    UpdatedAt: z.array(DateFilterSchema).optional(),
    VendorSeverity: z.array(StringFilterSchema).optional(),
    VulnerabilityId: z.array(StringFilterSchema).optional(),
    VulnerabilitySource: z.array(StringFilterSchema).optional(),
    VulnerablePackages: z.array(PackageFilterSchema).optional(),
  }).describe("Findings filter criteria.").optional(),
  FilterAction: z.enum(["NONE", "SUPPRESS"]).describe("Findings filter action.")
    .optional(),
  Tags: z.record(z.string(), z.string().regex(new RegExp("^.{1,255}$")))
    .optional(),
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

/** Swamp extension model for InspectorV2 Filter. Registered at `@swamp/aws/inspectorv2/filter`. */
export const model = {
  type: "@swamp/aws/inspectorv2/filter",
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
      description: "InspectorV2 Filter resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a InspectorV2 Filter",
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
          "AWS::InspectorV2::Filter",
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
      description: "Get a InspectorV2 Filter",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the InspectorV2 Filter",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::InspectorV2::Filter",
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
      description: "Update a InspectorV2 Filter",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::InspectorV2::Filter",
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
          "AWS::InspectorV2::Filter",
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
      description: "Delete a InspectorV2 Filter",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the InspectorV2 Filter",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::InspectorV2::Filter",
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
      description: "Sync InspectorV2 Filter state from AWS",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::InspectorV2::Filter",
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
