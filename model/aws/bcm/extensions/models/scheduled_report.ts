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

// Auto-generated extension model for @swamp/aws/bcm/scheduled-report
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for BCM ScheduledReport (AWS::BCM::ScheduledReport).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, sync, and list can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";

const SchedulePeriodSchema = z.object({
  StartTime: z.string().describe(
    "The time at which the schedule becomes active.",
  ).optional(),
  EndTime: z.string().describe(
    "The time at which the schedule stops being active.",
  ).optional(),
});

const DateTimeValueSchema = z.object({
  Type: z.enum(["ABSOLUTE", "RELATIVE"]).describe(
    "Whether Value is an absolute date or a duration relative to now.",
  ),
  Value: z.string().min(0).max(1024).regex(new RegExp("^[\\S\\s]*$")).describe(
    "The date, or an ISO 8601 duration when Type is RELATIVE.",
  ),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(new RegExp("^[\\S\\s]*$")).describe(
    "The tag key.",
  ),
  Value: z.string().min(0).max(256).regex(new RegExp("^[\\S\\s]*$")).describe(
    "The tag value.",
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
  Name: z.string().min(2).max(50).regex(
    new RegExp("^(?!.* {2})[a-zA-Z][a-zA-Z0-9 _-]{0,48}[a-zA-Z0-9_-]$"),
  ).describe("The name of the scheduled report."),
  Description: z.string().min(1).max(200).regex(
    new RegExp("^(?!.* {2})[ a-zA-Z0-9.,!?;:@#$%&\\-_/\\\\]*$"),
  ).describe("A description of the scheduled report's purpose or contents.")
    .optional(),
  DashboardArn: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:aws[-a-z0-9]*:bcm-dashboards::[0-9]{12}:dashboard/(\\*|[-a-z0-9]+)$",
    ),
  ).describe(
    "The ARN of the dashboard associated with the scheduled report. Managed dashboards cannot be used.",
  ),
  ScheduledReportExecutionRoleArn: z.string().min(20).max(2048).regex(
    new RegExp("^arn:aws[-a-z0-9]*:iam::[0-9]{12}:role/[a-zA-Z0-9+=,.@_/-]+$"),
  ).describe(
    "The ARN of the IAM role that the scheduled report uses to execute. AWS Billing and Cost Management Dashboards assumes this IAM role while executing the scheduled report.",
  ),
  ScheduleConfig: z.object({
    ScheduleExpression: z.string().min(0).max(1024).regex(
      new RegExp("^[\\S\\s]*$"),
    ).describe(
      "The schedule expression that specifies when to trigger the scheduled report run. This value must be a cron expression consisting of six fields separated by white spaces: cron(minutes hours day_of_month month day_of_week year).",
    ).optional(),
    ScheduleExpressionTimeZone: z.string().min(0).max(1024).regex(
      new RegExp("^[\\S\\s]*$"),
    ).describe("The time zone for the schedule expression, for example, UTC.")
      .optional(),
    SchedulePeriod: SchedulePeriodSchema.describe(
      "The time period during which the schedule is active.",
    ).optional(),
    State: z.enum(["ENABLED", "DISABLED"]).describe(
      "The state of the schedule. ENABLED means the scheduled report runs according to its schedule expression. DISABLED means the scheduled report is paused and will not run until re-enabled.",
    ).optional(),
  }).describe(
    "The schedule configuration that defines when and how often the report is generated.",
  ),
  WidgetIds: z.array(z.string()).describe(
    "The list of widget identifiers included in the scheduled report. If not specified, all widgets in the dashboard are included.",
  ).optional(),
  WidgetDateRangeOverride: z.object({
    StartTime: DateTimeValueSchema.describe("The start of the range."),
    EndTime: DateTimeValueSchema.describe("The end of the range."),
  }).describe(
    "The date range override applied to widgets in the scheduled report.",
  ).optional(),
  HealthStatus: z.object({
    StatusCode: z.enum(["HEALTHY", "UNHEALTHY"]).describe(
      "Whether the scheduled report is healthy.",
    ),
    LastRefreshedAt: z.string().describe(
      "The time at which the health status was last refreshed.",
    ).optional(),
  }).describe(
    "The health status of the scheduled report at its last refresh time.",
  ).optional(),
  Tags: z.array(TagSchema).describe("The tags applied to the scheduled report.")
    .optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  Name: z.string().optional(),
  Description: z.string().optional(),
  DashboardArn: z.string().optional(),
  ScheduledReportExecutionRoleArn: z.string().optional(),
  ScheduleConfig: z.object({
    ScheduleExpression: z.string(),
    ScheduleExpressionTimeZone: z.string(),
    SchedulePeriod: SchedulePeriodSchema,
    State: z.string(),
  }).optional(),
  WidgetIds: z.array(z.string()).optional(),
  WidgetDateRangeOverride: z.object({
    StartTime: DateTimeValueSchema,
    EndTime: DateTimeValueSchema,
  }).optional(),
  CreatedAt: z.string().optional(),
  UpdatedAt: z.string().optional(),
  HealthStatus: z.object({
    StatusCode: z.string(),
    LastRefreshedAt: z.string(),
  }).optional(),
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
  ).describe("The name of the scheduled report.").optional(),
  Description: z.string().min(1).max(200).regex(
    new RegExp("^(?!.* {2})[ a-zA-Z0-9.,!?;:@#$%&\\-_/\\\\]*$"),
  ).describe("A description of the scheduled report's purpose or contents.")
    .optional(),
  DashboardArn: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:aws[-a-z0-9]*:bcm-dashboards::[0-9]{12}:dashboard/(\\*|[-a-z0-9]+)$",
    ),
  ).describe(
    "The ARN of the dashboard associated with the scheduled report. Managed dashboards cannot be used.",
  ).optional(),
  ScheduledReportExecutionRoleArn: z.string().min(20).max(2048).regex(
    new RegExp("^arn:aws[-a-z0-9]*:iam::[0-9]{12}:role/[a-zA-Z0-9+=,.@_/-]+$"),
  ).describe(
    "The ARN of the IAM role that the scheduled report uses to execute. AWS Billing and Cost Management Dashboards assumes this IAM role while executing the scheduled report.",
  ).optional(),
  ScheduleConfig: z.object({
    ScheduleExpression: z.string().min(0).max(1024).regex(
      new RegExp("^[\\S\\s]*$"),
    ).describe(
      "The schedule expression that specifies when to trigger the scheduled report run. This value must be a cron expression consisting of six fields separated by white spaces: cron(minutes hours day_of_month month day_of_week year).",
    ).optional(),
    ScheduleExpressionTimeZone: z.string().min(0).max(1024).regex(
      new RegExp("^[\\S\\s]*$"),
    ).describe("The time zone for the schedule expression, for example, UTC.")
      .optional(),
    SchedulePeriod: SchedulePeriodSchema.describe(
      "The time period during which the schedule is active.",
    ).optional(),
    State: z.enum(["ENABLED", "DISABLED"]).describe(
      "The state of the schedule. ENABLED means the scheduled report runs according to its schedule expression. DISABLED means the scheduled report is paused and will not run until re-enabled.",
    ).optional(),
  }).describe(
    "The schedule configuration that defines when and how often the report is generated.",
  ).optional(),
  WidgetIds: z.array(z.string()).describe(
    "The list of widget identifiers included in the scheduled report. If not specified, all widgets in the dashboard are included.",
  ).optional(),
  WidgetDateRangeOverride: z.object({
    StartTime: DateTimeValueSchema.describe("The start of the range.")
      .optional(),
    EndTime: DateTimeValueSchema.describe("The end of the range.").optional(),
  }).describe(
    "The date range override applied to widgets in the scheduled report.",
  ).optional(),
  HealthStatus: z.object({
    StatusCode: z.enum(["HEALTHY", "UNHEALTHY"]).describe(
      "Whether the scheduled report is healthy.",
    ).optional(),
    LastRefreshedAt: z.string().describe(
      "The time at which the health status was last refreshed.",
    ).optional(),
  }).describe(
    "The health status of the scheduled report at its last refresh time.",
  ).optional(),
  Tags: z.array(TagSchema).describe("The tags applied to the scheduled report.")
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

/** Swamp extension model for BCM ScheduledReport. Registered at `@swamp/aws/bcm/scheduled-report`. */
export const model = {
  type: "@swamp/aws/bcm/scheduled-report",
  version: "2026.09.23.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "BCM ScheduledReport resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a BCM ScheduledReport",
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
          "AWS::BCM::ScheduledReport",
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
      description: "Get a BCM ScheduledReport",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the BCM ScheduledReport",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::BCM::ScheduledReport",
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
      description: "Update a BCM ScheduledReport",
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
          "AWS::BCM::ScheduledReport",
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
          "AWS::BCM::ScheduledReport",
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
      description: "Delete a BCM ScheduledReport",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the BCM ScheduledReport",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::BCM::ScheduledReport",
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
      description: "Sync BCM ScheduledReport state from AWS",
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
            "AWS::BCM::ScheduledReport",
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
      description: "List BCM ScheduledReport resources",
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
          "AWS::BCM::ScheduledReport",
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
