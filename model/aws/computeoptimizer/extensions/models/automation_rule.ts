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

// Auto-generated extension model for @swamp/aws/computeoptimizer/automation-rule
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ComputeOptimizer AutomationRule (AWS::ComputeOptimizer::AutomationRule).
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

const StringCriteriaConditionSchema = z.object({
  Comparison: z.enum([
    "StringEquals",
    "StringNotEquals",
    "StringEqualsIgnoreCase",
    "StringNotEqualsIgnoreCase",
    "StringLike",
    "StringNotLike",
    "NumericEquals",
    "NumericNotEquals",
    "NumericLessThan",
    "NumericLessThanEquals",
    "NumericGreaterThan",
    "NumericGreaterThanEquals",
  ]).optional(),
  Values: z.array(
    z.string().min(1).max(512).regex(
      new RegExp("^[\\w\\s\\.\\-\\:\\/\\=\\+\\@\\*\\?]+$"),
    ),
  ).optional(),
});

const IntegerCriteriaConditionSchema = z.object({
  Comparison: z.enum([
    "StringEquals",
    "StringNotEquals",
    "StringEqualsIgnoreCase",
    "StringNotEqualsIgnoreCase",
    "StringLike",
    "StringNotLike",
    "NumericEquals",
    "NumericNotEquals",
    "NumericLessThan",
    "NumericLessThanEquals",
    "NumericGreaterThan",
    "NumericGreaterThanEquals",
  ]).optional(),
  Values: z.array(z.number().int()).optional(),
});

const DoubleCriteriaConditionSchema = z.object({
  Comparison: z.enum([
    "StringEquals",
    "StringNotEquals",
    "StringEqualsIgnoreCase",
    "StringNotEqualsIgnoreCase",
    "StringLike",
    "StringNotLike",
    "NumericEquals",
    "NumericNotEquals",
    "NumericLessThan",
    "NumericLessThanEquals",
    "NumericGreaterThan",
    "NumericGreaterThanEquals",
  ]).optional(),
  Values: z.array(z.number()).optional(),
});

const ResourceTagsCriteriaConditionSchema = z.object({
  Comparison: z.enum([
    "StringEquals",
    "StringNotEquals",
    "StringEqualsIgnoreCase",
    "StringNotEqualsIgnoreCase",
    "StringLike",
    "StringNotLike",
    "NumericEquals",
    "NumericNotEquals",
    "NumericLessThan",
    "NumericLessThanEquals",
    "NumericGreaterThan",
    "NumericGreaterThanEquals",
  ]).optional(),
  Key: z.string().min(1).max(512).regex(
    new RegExp("^[\\w\\s\\.\\-\\:\\/\\=\\+\\@\\*\\?]+$"),
  ).optional(),
  Values: z.array(
    z.string().min(1).max(512).regex(
      new RegExp("^[\\w\\s\\.\\-\\:\\/\\=\\+\\@\\*\\?]+$"),
    ),
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^[\\w\\s\\.\\-\\:\\/\\=\\+\\@]+$"),
  ),
  Value: z.string().max(256).regex(
    new RegExp("^[\\w\\s\\.\\-\\:\\/\\=\\+\\@]*$"),
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
  Name: z.string().min(0).max(128).regex(new RegExp("^[a-zA-Z0-9_-]*$"))
    .describe("The name of the automation rule."),
  Description: z.string().min(0).max(1024).regex(
    new RegExp("^[a-zA-Z0-9_\\-\\s@\\.]*$"),
  ).describe("The description of the automation rule.").optional(),
  RuleType: z.enum(["AccountRule", "OrganizationRule"]).describe(
    "The type of automation rule.",
  ),
  OrganizationConfiguration: z.object({
    RuleApplyOrder: z.enum(["BeforeAccountRules", "AfterAccountRules"])
      .describe("When the rule should be applied relative to account rules")
      .optional(),
    AccountIds: z.array(z.string().regex(new RegExp("^[0-9]{12}$"))).describe(
      "List of account IDs where the organization rule applies",
    ).optional(),
  }).describe(
    "Organization configuration for organization rules, including rule apply order and account scope.",
  ).optional(),
  RecommendedActionTypes: z.array(
    z.enum(["SnapshotAndDeleteUnattachedEbsVolume", "UpgradeEbsVolumeType"]),
  ).describe("The types of recommended actions this rule will implement."),
  Priority: z.string().describe("Rule priority within its group").optional(),
  Schedule: z.object({
    ScheduleExpression: z.string().describe(
      "Schedule expression (e.g., cron or rate expression)",
    ).optional(),
    ScheduleExpressionTimezone: z.string().describe("IANA timezone identifier")
      .optional(),
    ExecutionWindowInMinutes: z.number().int().min(60).max(1440).describe(
      "Execution window duration in minutes",
    ).optional(),
  }).describe("The schedule configuration for when the rule runs."),
  Criteria: z.object({
    Region: z.array(StringCriteriaConditionSchema).optional(),
    ResourceArn: z.array(StringCriteriaConditionSchema).optional(),
    EbsVolumeType: z.array(StringCriteriaConditionSchema).optional(),
    EbsVolumeSizeInGib: z.array(IntegerCriteriaConditionSchema).optional(),
    EstimatedMonthlySavings: z.array(DoubleCriteriaConditionSchema).optional(),
    ResourceTag: z.array(ResourceTagsCriteriaConditionSchema).optional(),
    LookBackPeriodInDays: z.array(IntegerCriteriaConditionSchema).optional(),
    RestartNeeded: z.array(StringCriteriaConditionSchema).optional(),
  }).describe(
    "Filter criteria that specify which recommended actions qualify for implementation.",
  ).optional(),
  Status: z.enum(["Active", "Inactive"]).describe(
    "The status of the automation rule.",
  ),
  Tags: z.array(TagSchema).describe("Tags associated with the automation rule.")
    .optional(),
});

const StateSchema = z.object({
  RuleArn: z.string(),
  RuleId: z.string().optional(),
  Name: z.string().optional(),
  Description: z.string().optional(),
  RuleType: z.string().optional(),
  RuleRevision: z.string().optional(),
  OrganizationConfiguration: z.object({
    RuleApplyOrder: z.string(),
    AccountIds: z.array(z.string()),
  }).optional(),
  RecommendedActionTypes: z.array(z.string()).optional(),
  AccountId: z.string().optional(),
  Priority: z.string().optional(),
  Schedule: z.object({
    ScheduleExpression: z.string(),
    ScheduleExpressionTimezone: z.string(),
    ExecutionWindowInMinutes: z.number(),
  }).optional(),
  Criteria: z.object({
    Region: z.array(StringCriteriaConditionSchema),
    ResourceArn: z.array(StringCriteriaConditionSchema),
    EbsVolumeType: z.array(StringCriteriaConditionSchema),
    EbsVolumeSizeInGib: z.array(IntegerCriteriaConditionSchema),
    EstimatedMonthlySavings: z.array(DoubleCriteriaConditionSchema),
    ResourceTag: z.array(ResourceTagsCriteriaConditionSchema),
    LookBackPeriodInDays: z.array(IntegerCriteriaConditionSchema),
    RestartNeeded: z.array(StringCriteriaConditionSchema),
  }).optional(),
  Status: z.string().optional(),
  CreatedTimestamp: z.string().optional(),
  LastUpdatedTimestamp: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().min(0).max(128).regex(new RegExp("^[a-zA-Z0-9_-]*$"))
    .describe("The name of the automation rule.").optional(),
  Description: z.string().min(0).max(1024).regex(
    new RegExp("^[a-zA-Z0-9_\\-\\s@\\.]*$"),
  ).describe("The description of the automation rule.").optional(),
  RuleType: z.enum(["AccountRule", "OrganizationRule"]).describe(
    "The type of automation rule.",
  ).optional(),
  OrganizationConfiguration: z.object({
    RuleApplyOrder: z.enum(["BeforeAccountRules", "AfterAccountRules"])
      .describe("When the rule should be applied relative to account rules")
      .optional(),
    AccountIds: z.array(z.string().regex(new RegExp("^[0-9]{12}$"))).describe(
      "List of account IDs where the organization rule applies",
    ).optional(),
  }).describe(
    "Organization configuration for organization rules, including rule apply order and account scope.",
  ).optional(),
  RecommendedActionTypes: z.array(
    z.enum(["SnapshotAndDeleteUnattachedEbsVolume", "UpgradeEbsVolumeType"]),
  ).describe("The types of recommended actions this rule will implement.")
    .optional(),
  Priority: z.string().describe("Rule priority within its group").optional(),
  Schedule: z.object({
    ScheduleExpression: z.string().describe(
      "Schedule expression (e.g., cron or rate expression)",
    ).optional(),
    ScheduleExpressionTimezone: z.string().describe("IANA timezone identifier")
      .optional(),
    ExecutionWindowInMinutes: z.number().int().min(60).max(1440).describe(
      "Execution window duration in minutes",
    ).optional(),
  }).describe("The schedule configuration for when the rule runs.").optional(),
  Criteria: z.object({
    Region: z.array(StringCriteriaConditionSchema).optional(),
    ResourceArn: z.array(StringCriteriaConditionSchema).optional(),
    EbsVolumeType: z.array(StringCriteriaConditionSchema).optional(),
    EbsVolumeSizeInGib: z.array(IntegerCriteriaConditionSchema).optional(),
    EstimatedMonthlySavings: z.array(DoubleCriteriaConditionSchema).optional(),
    ResourceTag: z.array(ResourceTagsCriteriaConditionSchema).optional(),
    LookBackPeriodInDays: z.array(IntegerCriteriaConditionSchema).optional(),
    RestartNeeded: z.array(StringCriteriaConditionSchema).optional(),
  }).describe(
    "Filter criteria that specify which recommended actions qualify for implementation.",
  ).optional(),
  Status: z.enum(["Active", "Inactive"]).describe(
    "The status of the automation rule.",
  ).optional(),
  Tags: z.array(TagSchema).describe("Tags associated with the automation rule.")
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

/** Swamp extension model for ComputeOptimizer AutomationRule. Registered at `@swamp/aws/computeoptimizer/automation-rule`. */
export const model = {
  type: "@swamp/aws/computeoptimizer/automation-rule",
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
      description: "ComputeOptimizer AutomationRule resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ComputeOptimizer AutomationRule",
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
          "AWS::ComputeOptimizer::AutomationRule",
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
      description: "Get a ComputeOptimizer AutomationRule",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ComputeOptimizer AutomationRule",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::ComputeOptimizer::AutomationRule",
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
      description: "Update a ComputeOptimizer AutomationRule",
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
        const identifier = existing.RuleArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::ComputeOptimizer::AutomationRule",
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
          "AWS::ComputeOptimizer::AutomationRule",
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
      description: "Delete a ComputeOptimizer AutomationRule",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ComputeOptimizer AutomationRule",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::ComputeOptimizer::AutomationRule",
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
      description: "Sync ComputeOptimizer AutomationRule state from AWS",
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
        const identifier = existing.RuleArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::ComputeOptimizer::AutomationRule",
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
