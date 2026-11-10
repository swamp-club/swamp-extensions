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

// Auto-generated extension model for @swamp/aws/cloudwatch/alert
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for CloudWatch Alert (AWS::CloudWatch::Alert).
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

const QuerySchema = z.object({
  Language: z.enum(["SQL", "PROMQL"]).describe(
    "The query language. Valid values: SQL, PROMQL.",
  ),
  Expression: z.string().min(1).max(10000).describe(
    "The query expression. For PromQL, the series value is returned in a field named value.",
  ),
});

const ConditionSchema = z.object({
  ThresholdMode: z.enum(["COUNT_OF_RESULTS", "FIELD_VALUE"]).describe(
    "How the threshold is applied. COUNT_OF_RESULTS compares the number of rows the query returns. FIELD_VALUE compares the value of ThresholdField in each result row; each row is tracked separately.",
  ).optional(),
  ThresholdField: z.string().max(256).describe(
    "The result field to compare against the threshold. Required when ThresholdMode is FIELD_VALUE.",
  ).optional(),
  Comparator: z.enum(["GT", "LT", "GTE", "LTE"]).describe(
    "The comparison operator. Valid values: GT, GTE, LT, LTE (greater than, greater than or equal to, less than, less than or equal to).",
  ).optional(),
  WarningThreshold: z.number().describe(
    "The value at which the alert enters the WARNING state.",
  ).optional(),
  CriticalThreshold: z.number().describe(
    "The value at which the alert enters the CRITICAL state.",
  ).optional(),
});

const EvaluationSchema = z.object({
  IntervalSeconds: z.number().int().describe(
    "The time between evaluations, in seconds. Valid values: 30, 60, 120, 300, 600, 900, 1800, 3600.",
  ),
  PendingDurationSeconds: z.number().int().describe(
    "How long a threshold breach must last before the alert changes state, in seconds. Must be a multiple of IntervalSeconds. 0 changes state immediately.",
  ).optional(),
  RecoveryDurationSeconds: z.number().int().describe(
    "How long the result must stay within its thresholds before the alert returns to OK, in seconds. Must be a multiple of IntervalSeconds. 0 returns to OK immediately.",
  ).optional(),
});

const NoDataSchema = z.object({
  TreatAs: z.enum(["OK", "WARNING", "CRITICAL", "NODATA"]).describe(
    "The state to report when an evaluation returns no data. Valid values: OK, WARNING, CRITICAL, NODATA.",
  ),
});

const TelemetryRuleSchema = z.object({
  Query: QuerySchema.describe(
    "The query the alert runs, and the language it is written in.",
  ),
  Condition: ConditionSchema.describe(
    "The thresholds that set the alert's state. Specify at least one of WarningThreshold and CriticalThreshold.",
  ),
  Evaluation: EvaluationSchema.describe(
    "How often the alert is evaluated, and how long a change must last before the state changes.",
  ),
  NoData: NoDataSchema.describe(
    "How the alert behaves when an evaluation returns no data. If omitted, the alert reports NODATA.",
  ).optional(),
});

const TriggerSchema = z.object({
  StateValues: z.array(z.enum(["OK", "WARNING", "CRITICAL", "NODATA"]))
    .describe(
      "The alert states that trigger this rule. A notification is sent when the alert enters any listed state. If omitted or empty, every state triggers the rule.",
    ).optional(),
});

const TargetSchema = z.object({
  Type: z.enum(["sns", "slack", "pagerduty"]).describe(
    "The target type. Valid values: sns, slack, pagerduty.",
  ),
  Arn: z.string().min(1).max(1024).regex(new RegExp("^arn:.+$")).describe(
    "The ARN of the target. For sns, the ARN of the Amazon SNS topic. For slack and pagerduty, the ARN of a CloudWatch Omni integration.",
  ),
  Metadata: z.record(z.string(), z.string().max(1024)).describe(
    "Settings specific to the target, as key-value pairs (up to 20). The keys depend on the integration type. Not used for sns targets.",
  ).optional(),
});

const NotificationRuleSchema = z.object({
  Trigger: TriggerSchema.describe(
    "The alert states that trigger the notification rule.",
  ),
  Target: TargetSchema.describe("Where the notification is sent."),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe("The key name of the tag."),
  Value: z.string().min(0).max(256).describe("The value for the tag."),
});

const QueryStateSchema = z.object({
  Language: z.string(),
  Expression: z.string(),
}).partial();

const ConditionStateSchema = z.object({
  ThresholdMode: z.string(),
  ThresholdField: z.string(),
  Comparator: z.string(),
  WarningThreshold: z.number(),
  CriticalThreshold: z.number(),
}).partial();

const EvaluationStateSchema = z.object({
  IntervalSeconds: z.number(),
  PendingDurationSeconds: z.number(),
  RecoveryDurationSeconds: z.number(),
}).partial();

const NoDataStateSchema = z.object({
  TreatAs: z.string(),
}).partial();

const TelemetryRuleStateSchema = z.object({
  Query: QueryStateSchema,
  Condition: ConditionStateSchema,
  Evaluation: EvaluationStateSchema,
  NoData: NoDataStateSchema,
}).partial();

const TriggerStateSchema = z.object({
  StateValues: z.array(z.string()),
}).partial();

const TargetStateSchema = z.object({
  Type: z.string(),
  Arn: z.string(),
  Metadata: z.record(z.string(), z.unknown()),
}).partial();

const NotificationRuleStateSchema = z.object({
  Trigger: TriggerStateSchema,
  Target: TargetStateSchema,
}).partial();

const TagStateSchema = z.object({
  Key: z.string(),
  Value: z.string(),
}).partial();

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
  SpaceId: z.string().regex(
    new RegExp(
      "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$",
    ),
  ).describe(
    "The ID of the space to create the alert in. Changing this value replaces the alert.",
  ).optional(),
  ProfileId: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9_-]+$"))
    .describe(
      "The ID of the access profile the alert uses to run its query and send notifications.",
    ).optional(),
  Name: z.string().min(1).max(256).regex(new RegExp("^[a-zA-Z0-9_.@~()-]+$"))
    .describe(
      "The display name of the alert. Names don't need to be unique within a space; the alert is identified by AlertId.",
    ).optional(),
  Description: z.string().max(1024).describe("A description of the alert.")
    .optional(),
  Rule: z.object({
    TelemetryRule: TelemetryRuleSchema.describe(
      "A rule that queries telemetry, evaluates the result against a condition, and sets how missing data is handled.",
    ),
  }).describe("The rule that defines how the alert is evaluated.").optional(),
  NotificationsEnabled: z.boolean().describe(
    "Whether the alert sends notifications. When false, the alert is still evaluated and records its state, but sends nothing. Defaults to true.",
  ).optional(),
  NotificationRules: z.array(NotificationRuleSchema).describe(
    "The notification rules that determine when and where notifications are sent.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  SpaceId: z.string(),
  ProfileId: z.string().optional(),
  Name: z.string().optional(),
  Description: z.string().optional(),
  Rule: z.object({
    TelemetryRule: TelemetryRuleStateSchema,
  }).partial().optional(),
  NotificationsEnabled: z.boolean().optional(),
  NotificationRules: z.array(NotificationRuleStateSchema).optional(),
  AccountId: z.string().optional(),
  CreatedAt: z.string().optional(),
  UpdatedAt: z.string().optional(),
  AlertId: z.string(),
  Arn: z.string().optional(),
  Tags: z.array(TagStateSchema).optional(),
}).passthrough();

type StateData = Record<string, unknown>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  SpaceId: z.string().regex(
    new RegExp(
      "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$",
    ),
  ).describe(
    "The ID of the space to create the alert in. Changing this value replaces the alert.",
  ).optional(),
  ProfileId: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9_-]+$"))
    .describe(
      "The ID of the access profile the alert uses to run its query and send notifications.",
    ).optional(),
  Name: z.string().min(1).max(256).regex(new RegExp("^[a-zA-Z0-9_.@~()-]+$"))
    .describe(
      "The display name of the alert. Names don't need to be unique within a space; the alert is identified by AlertId.",
    ).optional(),
  Description: z.string().max(1024).describe("A description of the alert.")
    .optional(),
  Rule: z.object({
    TelemetryRule: TelemetryRuleSchema.describe(
      "A rule that queries telemetry, evaluates the result against a condition, and sets how missing data is handled.",
    ).optional(),
  }).describe("The rule that defines how the alert is evaluated.").optional(),
  NotificationsEnabled: z.boolean().describe(
    "Whether the alert sends notifications. When false, the alert is still evaluated and records its state, but sends nothing. Defaults to true.",
  ).optional(),
  NotificationRules: z.array(NotificationRuleSchema).describe(
    "The notification rules that determine when and where notifications are sent.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
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

/** Swamp extension model for CloudWatch Alert. Registered at `@swamp/aws/cloudwatch/alert`. */
export const model = {
  type: "@swamp/aws/cloudwatch/alert",
  version: "2026.11.10.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "CloudWatch Alert resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CloudWatch Alert",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const missing = ["Name", "ProfileId", "Rule", "SpaceId"].filter((k) =>
          g[k] === undefined
        );
        if (missing.length > 0) {
          throw new Error(
            "create requires global arguments: " + missing.join(", "),
          );
        }
        const credentials = _buildCredentials(g);
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::CloudWatch::Alert",
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
      description: "Get a CloudWatch Alert",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudWatch Alert",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::CloudWatch::Alert",
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
      description: "Update a CloudWatch Alert",
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
        const idParts = [
          existing.SpaceId?.toString(),
          existing.AlertId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::CloudWatch::Alert",
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
          "AWS::CloudWatch::Alert",
          identifier,
          currentState,
          desiredState,
          ["SpaceId"],
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
      description: "Delete a CloudWatch Alert",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudWatch Alert",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::CloudWatch::Alert",
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
      description: "Sync CloudWatch Alert state from AWS",
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
        const idParts = [
          existing.SpaceId?.toString(),
          existing.AlertId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::CloudWatch::Alert",
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
      description: "List CloudWatch Alert resources",
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
          "AWS::CloudWatch::Alert",
          {
            resourceModel: args.resourceModel,
            maxPages: args.maxPages,
            credentials,
          },
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const instanceName = item.identifier.replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, "");
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
