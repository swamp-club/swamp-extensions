// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/aws/bcm/dashboard
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for BCM Dashboard (AWS::BCM::Dashboard).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, sync, and list can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";

const DateTimeValueSchema = z.object({
  Type: z.enum(["ABSOLUTE", "RELATIVE"]),
  Value: z.string(),
});

const DateTimeRangeSchema = z.object({
  StartTime: DateTimeValueSchema,
  EndTime: DateTimeValueSchema,
});

const GroupDefinitionSchema = z.object({
  Key: z.string().min(1).max(1024).regex(new RegExp("^[\\S\\s]*$")),
  Type: z.enum(["DIMENSION", "TAG", "COST_CATEGORY"]).optional(),
});

const DimensionValuesSchema = z.object({
  Key: z.enum([
    "AZ",
    "INSTANCE_TYPE",
    "LINKED_ACCOUNT",
    "OPERATION",
    "PURCHASE_TYPE",
    "REGION",
    "SERVICE",
    "USAGE_TYPE",
    "USAGE_TYPE_GROUP",
    "RECORD_TYPE",
    "OPERATING_SYSTEM",
    "TENANCY",
    "SCOPE",
    "PLATFORM",
    "SUBSCRIPTION_ID",
    "LEGAL_ENTITY_NAME",
    "DEPLOYMENT_OPTION",
    "DATABASE_ENGINE",
    "CACHE_ENGINE",
    "INSTANCE_TYPE_FAMILY",
    "BILLING_ENTITY",
    "RESERVATION_ID",
    "RESOURCE_ID",
    "SAVINGS_PLANS_TYPE",
    "TAG_KEY",
    "COST_CATEGORY_NAME",
  ]),
  Values: z.array(z.string()),
  MatchOptions: z.array(
    z.enum([
      "EQUALS",
      "ABSENT",
      "STARTS_WITH",
      "ENDS_WITH",
      "CONTAINS",
      "GREATER_THAN_OR_EQUAL",
      "CASE_SENSITIVE",
      "CASE_INSENSITIVE",
    ]),
  ).optional(),
});

const TagValuesSchema = z.object({
  Key: z.string(),
  Values: z.array(z.string()),
  MatchOptions: z.array(
    z.enum([
      "EQUALS",
      "ABSENT",
      "STARTS_WITH",
      "ENDS_WITH",
      "CONTAINS",
      "GREATER_THAN_OR_EQUAL",
      "CASE_SENSITIVE",
      "CASE_INSENSITIVE",
    ]),
  ).optional(),
});

const CostCategoryValuesSchema = z.object({
  Key: z.string(),
  Values: z.array(z.string()),
  MatchOptions: z.array(
    z.enum([
      "EQUALS",
      "ABSENT",
      "STARTS_WITH",
      "ENDS_WITH",
      "CONTAINS",
      "GREATER_THAN_OR_EQUAL",
      "CASE_SENSITIVE",
      "CASE_INSENSITIVE",
    ]),
  ).optional(),
});

const CostAndUsageExpressionSchema = z.object({
  Or: z.array(z.record(z.string(), z.unknown())).optional(),
  And: z.array(z.record(z.string(), z.unknown())).optional(),
  Not: z.record(z.string(), z.unknown()).optional(),
  Dimensions: DimensionValuesSchema.optional(),
  Tags: TagValuesSchema.optional(),
  CostCategories: CostCategoryValuesSchema.optional(),
});

const CostAndUsageQuerySchema = z.object({
  Metrics: z.array(
    z.enum([
      "AmortizedCost",
      "BlendedCost",
      "NetAmortizedCost",
      "NetUnblendedCost",
      "NormalizedUsageAmount",
      "UnblendedCost",
      "UsageQuantity",
      "SpendCoveredBySavingsPlans",
      "Hour",
      "Unit",
      "Cost",
    ]),
  ),
  TimeRange: DateTimeRangeSchema,
  Granularity: z.enum(["HOURLY", "DAILY", "MONTHLY"]),
  GroupBy: z.array(GroupDefinitionSchema).optional(),
  Filter: CostAndUsageExpressionSchema.optional(),
});

const ExpressionSchema = z.object({
  And: z.array(z.record(z.string(), z.unknown())).optional(),
  Not: z.record(z.string(), z.unknown()).optional(),
  Dimensions: DimensionValuesSchema.optional(),
  Tags: TagValuesSchema.optional(),
  CostCategories: CostCategoryValuesSchema.optional(),
});

const SavingsPlansCoverageQuerySchema = z.object({
  TimeRange: DateTimeRangeSchema,
  Metrics: z.array(
    z.enum([
      "AmortizedCost",
      "BlendedCost",
      "NetAmortizedCost",
      "NetUnblendedCost",
      "NormalizedUsageAmount",
      "UnblendedCost",
      "UsageQuantity",
      "SpendCoveredBySavingsPlans",
      "Hour",
      "Unit",
      "Cost",
    ]),
  ).optional(),
  Granularity: z.enum(["HOURLY", "DAILY", "MONTHLY"]).optional(),
  GroupBy: z.array(GroupDefinitionSchema).optional(),
  Filter: ExpressionSchema.optional(),
});

const SavingsPlansUtilizationQuerySchema = z.object({
  TimeRange: DateTimeRangeSchema,
  Granularity: z.enum(["HOURLY", "DAILY", "MONTHLY"]).optional(),
  Filter: ExpressionSchema.optional(),
});

const ReservationCoverageQuerySchema = z.object({
  TimeRange: DateTimeRangeSchema,
  GroupBy: z.array(GroupDefinitionSchema).optional(),
  Granularity: z.enum(["HOURLY", "DAILY", "MONTHLY"]).optional(),
  Filter: ExpressionSchema.optional(),
  Metrics: z.array(
    z.enum([
      "AmortizedCost",
      "BlendedCost",
      "NetAmortizedCost",
      "NetUnblendedCost",
      "NormalizedUsageAmount",
      "UnblendedCost",
      "UsageQuantity",
      "SpendCoveredBySavingsPlans",
      "Hour",
      "Unit",
      "Cost",
    ]),
  ).optional(),
});

const ReservationUtilizationQuerySchema = z.object({
  TimeRange: DateTimeRangeSchema,
  GroupBy: z.array(GroupDefinitionSchema).optional(),
  Granularity: z.enum(["HOURLY", "DAILY", "MONTHLY"]).optional(),
  Filter: ExpressionSchema.optional(),
});

const QueryParametersSchema = z.object({
  CostAndUsage: CostAndUsageQuerySchema.optional(),
  SavingsPlansCoverage: SavingsPlansCoverageQuerySchema.optional(),
  SavingsPlansUtilization: SavingsPlansUtilizationQuerySchema.optional(),
  ReservationCoverage: ReservationCoverageQuerySchema.optional(),
  ReservationUtilization: ReservationUtilizationQuerySchema.optional(),
});

const GraphDisplayConfigSchema = z.object({
  VisualType: z.enum(["LINE", "BAR", "STACK"]),
});

const DisplayConfigSchema = z.object({
  Graph: z.record(z.string(), GraphDisplayConfigSchema).optional(),
  Table: z.record(z.string(), z.unknown()).optional(),
});

const WidgetConfigSchema = z.object({
  QueryParameters: QueryParametersSchema,
  DisplayConfig: DisplayConfigSchema,
});

const WidgetSchema = z.object({
  Title: z.string().min(2).max(50).regex(
    new RegExp("^(?!.* {2})[a-zA-Z0-9_-][ a-zA-Z0-9_-]*[a-zA-Z0-9_-]$"),
  ),
  Description: z.string().min(1).max(200).regex(
    new RegExp("^(?!.* {2})[ a-zA-Z0-9.,!?;:@#$%&\\-_/\\\\]*$"),
  ).optional(),
  Width: z.number().int().min(2).max(6).optional(),
  Height: z.number().int().min(4).max(10).optional(),
  HorizontalOffset: z.number().int().optional(),
  Configs: z.array(WidgetConfigSchema),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128),
  Value: z.string().min(0).max(256),
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
  Name: z.string().min(2).max(50).regex(
    new RegExp("^(?!.* {2})[a-zA-Z][a-zA-Z0-9 _-]{0,48}[a-zA-Z0-9_-]$"),
  ),
  Description: z.string().min(1).max(200).regex(
    new RegExp("^(?!.* {2})[ a-zA-Z0-9.,!?;:@#$%&\\-_/\\\\]*$"),
  ).optional(),
  Widgets: z.array(WidgetSchema),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  Name: z.string().optional(),
  Description: z.string().optional(),
  Type: z.string().optional(),
  Widgets: z.array(WidgetSchema).optional(),
  CreatedAt: z.string().optional(),
  UpdatedAt: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().min(2).max(50).regex(
    new RegExp("^(?!.* {2})[a-zA-Z][a-zA-Z0-9 _-]{0,48}[a-zA-Z0-9_-]$"),
  ).optional(),
  Description: z.string().min(1).max(200).regex(
    new RegExp("^(?!.* {2})[ a-zA-Z0-9.,!?;:@#$%&\\-_/\\\\]*$"),
  ).optional(),
  Widgets: z.array(WidgetSchema).optional(),
  Tags: z.array(TagSchema).optional(),
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

/** Swamp extension model for BCM Dashboard. Registered at `@swamp/aws/bcm/dashboard`. */
export const model = {
  type: "@swamp/aws/bcm/dashboard",
  version: "2026.10.25.1",
  upgrades: [
    {
      toVersion: "2026.06.15.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.17.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.17.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "BCM Dashboard resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a BCM Dashboard",
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
          "AWS::BCM::Dashboard",
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
      description: "Get a BCM Dashboard",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the BCM Dashboard",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::BCM::Dashboard",
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
      description: "Update a BCM Dashboard",
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
          "AWS::BCM::Dashboard",
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
          "AWS::BCM::Dashboard",
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
      description: "Delete a BCM Dashboard",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the BCM Dashboard",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::BCM::Dashboard",
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
      description: "Sync BCM Dashboard state from AWS",
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
            "AWS::BCM::Dashboard",
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
      description: "List BCM Dashboard resources",
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
        const { items, nextToken } = await listResources(
          "AWS::BCM::Dashboard",
          {
            resourceModel: args.resourceModel,
            maxPages: args.maxPages,
            credentials,
          },
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const instanceName =
            (item.properties?.Arn?.toString() ?? item.identifier).replace(
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
