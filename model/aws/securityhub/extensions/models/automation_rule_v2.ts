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

// Auto-generated extension model for @swamp/aws/securityhub/automation-rule-v2
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SecurityHub AutomationRuleV2 (AWS::SecurityHub::AutomationRuleV2).
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
  Value: z.string().min(1).max(4096).describe("The string filter value"),
  Comparison: z.enum([
    "EQUALS",
    "PREFIX",
    "NOT_EQUALS",
    "PREFIX_NOT_EQUALS",
    "CONTAINS",
  ]).describe(
    "The condition to apply to a string value when filtering findings",
  ),
});

const OcsfStringFilterSchema = z.object({
  FieldName: z.enum([
    "activity_name",
    "cloud.account.name",
    "cloud.account.uid",
    "cloud.provider",
    "cloud.region",
    "compliance.assessments.category",
    "compliance.assessments.name",
    "compliance.control",
    "compliance.status",
    "compliance.standards",
    "finding_info.desc",
    "finding_info.src_url",
    "finding_info.title",
    "finding_info.types",
    "finding_info.uid",
    "finding_info.related_events.uid",
    "finding_info.related_events.product.uid",
    "finding_info.related_events.title",
    "metadata.product.feature.uid",
    "metadata.product.name",
    "metadata.product.uid",
    "metadata.product.vendor_name",
    "remediation.desc",
    "remediation.references",
    "resources.cloud_partition",
    "resources.name",
    "resources.region",
    "resources.type",
    "resources.uid",
    "vulnerabilities.fix_coverage",
    "class_name",
    "vendor_attributes.severity",
  ]).describe("The name of the field"),
  Filter: StringFilterSchema.describe("A string filter for filtering findings"),
});

const DateRangeSchema = z.object({
  Unit: z.enum(["DAYS"]).describe("A date range unit for the date filter"),
  Value: z.number().describe("A date range value for the date filter"),
});

const DateFilterSchema = z.object({
  DateRange: DateRangeSchema.describe("A date range for the date filter")
    .optional(),
  End: z.string().regex(
    new RegExp(
      "^(\\d\\d\\d\\d)-([0][1-9]|[1][0-2])-([0][1-9]|[1-2](\\d)|[3][0-1])[T](?:([0-1](\\d)|[2][0-3]):[0-5](\\d):[0-5](\\d)|23:59:60)(?:\\.(\\d)+)?([Z]|[+-](\\d\\d)(:?(\\d\\d))?)$",
    ),
  ).describe("The timestamp formatted in ISO8601").optional(),
  Start: z.string().regex(
    new RegExp(
      "^(\\d\\d\\d\\d)-([0][1-9]|[1][0-2])-([0][1-9]|[1-2](\\d)|[3][0-1])[T](?:([0-1](\\d)|[2][0-3]):[0-5](\\d):[0-5](\\d)|23:59:60)(?:\\.(\\d)+)?([Z]|[+-](\\d\\d)(:?(\\d\\d))?)$",
    ),
  ).describe("The timestamp formatted in ISO8601").optional(),
});

const OcsfDateFilterSchema = z.object({
  FieldName: z.enum([
    "finding_info.created_time_dt",
    "finding_info.first_seen_time_dt",
    "finding_info.last_seen_time_dt",
    "finding_info.modified_time_dt",
  ]).describe("The name of the field"),
  Filter: DateFilterSchema.describe("A date filter for querying findings"),
});

const BooleanFilterSchema = z.object({
  Value: z.boolean().describe("The value of the boolean"),
});

const OcsfBooleanFilterSchema = z.object({
  FieldName: z.enum([
    "compliance.assessments.meets_criteria",
    "vulnerabilities.is_exploit_available",
    "vulnerabilities.is_fix_available",
  ]).describe("The name of the field"),
  Filter: BooleanFilterSchema.describe("Boolean filter for querying findings"),
});

const NumberFilterSchema = z.object({
  Eq: z.number().describe(
    "The equal-to condition to be applied to a single field when querying for findings",
  ).optional(),
  Gte: z.number().describe(
    "The greater-than-equal condition to be applied to a single field when querying for findings",
  ).optional(),
  Lte: z.number().describe(
    "The less-than-equal condition to be applied to a single field when querying for findings",
  ).optional(),
});

const OcsfNumberFilterSchema = z.object({
  FieldName: z.enum([
    "activity_id",
    "compliance.status_id",
    "confidence_score",
    "finding_info.related_events_count",
    "vendor_attributes.severity_id",
  ]).describe("The name of the field"),
  Filter: NumberFilterSchema.describe("A number filter for querying findings"),
});

const MapFilterSchema = z.object({
  Comparison: z.enum(["EQUALS", "NOT_EQUALS"]).describe(
    "The condition to apply to the key value when filtering findings with a map filter",
  ),
  Key: z.string().min(1).max(4096).describe("The key of the map filter"),
  Value: z.string().min(1).max(4096).describe(
    "The value for the key in the map filter",
  ),
});

const OcsfMapFilterSchema = z.object({
  FieldName: z.enum(["resources.tags"]).describe("The name of the field"),
  Filter: MapFilterSchema.describe("A map filter for filtering findings"),
});

const CompositeFilterSchema = z.object({
  StringFilters: z.array(OcsfStringFilterSchema).describe(
    "Enables filtering based on string field values",
  ).optional(),
  DateFilters: z.array(OcsfDateFilterSchema).describe(
    "Enables filtering based on date and timestamp fields",
  ).optional(),
  BooleanFilters: z.array(OcsfBooleanFilterSchema).describe(
    "Enables filtering based on boolean field values",
  ).optional(),
  NumberFilters: z.array(OcsfNumberFilterSchema).describe(
    "Enables filtering based on numerical field values",
  ).optional(),
  MapFilters: z.array(OcsfMapFilterSchema).describe(
    "Enables filtering based on map field value",
  ).optional(),
  Operator: z.enum(["AND", "OR"]).describe(
    "The logical operator used to combine multiple conditions",
  ).optional(),
});

const OcsfFindingFiltersSchema = z.object({
  CompositeFilters: z.array(CompositeFilterSchema).describe(
    "Enables the creation of complex filtering conditions by combining filter",
  ).optional(),
  CompositeOperator: z.enum(["AND", "OR"]).describe(
    "The logical operator used to combine multiple conditions",
  ).optional(),
});

const AutomationRulesFindingFieldsUpdateV2Schema = z.object({
  SeverityId: z.number().int().describe(
    "The severity level to be assigned to findings that match the automation rule criteria",
  ).optional(),
  Comment: z.string().regex(new RegExp(".*\\S.*")).describe(
    "Notes or contextual information for findings that are modified by the automation rule",
  ).optional(),
  StatusId: z.number().int().describe(
    "The status to be applied to findings that match automation rule criteria",
  ).optional(),
});

const ExternalIntegrationConfigurationSchema = z.object({
  ConnectorArn: z.string().regex(new RegExp(".*\\S.*")).describe(
    "The ARN of the connector that establishes the integration",
  ).optional(),
});

const AutomationRulesActionV2Schema = z.object({
  Type: z.enum(["FINDING_FIELDS_UPDATE", "EXTERNAL_INTEGRATION"]).describe(
    "The category of action to be executed by the automation rule",
  ),
  FindingFieldsUpdate: AutomationRulesFindingFieldsUpdateV2Schema.describe(
    "The changes to be applied to fields in a security finding when an automation rule is triggered",
  ).optional(),
  ExternalIntegrationConfiguration: ExternalIntegrationConfigurationSchema
    .describe(
      "The settings for integrating automation rule actions with external systems or service",
    ).optional(),
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
  RuleName: z.string().min(1).max(256).regex(new RegExp(".*\\S.*")).describe(
    "The name of the automation rule",
  ),
  RuleStatus: z.enum(["ENABLED", "DISABLED"]).describe(
    "The status of the automation rule",
  ).optional(),
  Description: z.string().min(1).max(256).regex(new RegExp(".*\\S.*")).describe(
    "A description of the automation rule",
  ),
  RuleOrder: z.number().min(1).max(1000).describe(
    "The value for the rule priority",
  ),
  Criteria: z.object({
    OcsfFindingCriteria: OcsfFindingFiltersSchema.describe(
      "The filtering conditions that align with OCSF standards",
    ).optional(),
  }).describe(
    "Defines the parameters and conditions used to evaluate and filter security findings",
  ),
  Actions: z.array(AutomationRulesActionV2Schema).describe(
    "A list of actions to be performed when the rule criteria is met",
  ),
  Tags: z.record(z.string(), z.string().min(0).max(256)).describe(
    "A key-value pair to associate with a resource.",
  ).optional(),
});

const StateSchema = z.object({
  RuleName: z.string().optional(),
  RuleStatus: z.string().optional(),
  Description: z.string().optional(),
  RuleOrder: z.number().optional(),
  Criteria: z.object({
    OcsfFindingCriteria: OcsfFindingFiltersSchema,
  }).optional(),
  Actions: z.array(AutomationRulesActionV2Schema).optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
  RuleArn: z.string(),
  RuleId: z.string().optional(),
  CreatedAt: z.string().optional(),
  UpdatedAt: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  RuleName: z.string().min(1).max(256).regex(new RegExp(".*\\S.*")).describe(
    "The name of the automation rule",
  ).optional(),
  RuleStatus: z.enum(["ENABLED", "DISABLED"]).describe(
    "The status of the automation rule",
  ).optional(),
  Description: z.string().min(1).max(256).regex(new RegExp(".*\\S.*")).describe(
    "A description of the automation rule",
  ).optional(),
  RuleOrder: z.number().min(1).max(1000).describe(
    "The value for the rule priority",
  ).optional(),
  Criteria: z.object({
    OcsfFindingCriteria: OcsfFindingFiltersSchema.describe(
      "The filtering conditions that align with OCSF standards",
    ).optional(),
  }).describe(
    "Defines the parameters and conditions used to evaluate and filter security findings",
  ).optional(),
  Actions: z.array(AutomationRulesActionV2Schema).describe(
    "A list of actions to be performed when the rule criteria is met",
  ).optional(),
  Tags: z.record(z.string(), z.string().min(0).max(256)).describe(
    "A key-value pair to associate with a resource.",
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

/** Swamp extension model for SecurityHub AutomationRuleV2. Registered at `@swamp/aws/securityhub/automation-rule-v2`. */
export const model = {
  type: "@swamp/aws/securityhub/automation-rule-v2",
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
      description: "SecurityHub AutomationRuleV2 resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SecurityHub AutomationRuleV2",
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
          "AWS::SecurityHub::AutomationRuleV2",
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
      description: "Get a SecurityHub AutomationRuleV2",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SecurityHub AutomationRuleV2",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::SecurityHub::AutomationRuleV2",
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
      description: "Update a SecurityHub AutomationRuleV2",
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
          "AWS::SecurityHub::AutomationRuleV2",
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
          "AWS::SecurityHub::AutomationRuleV2",
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
      description: "Delete a SecurityHub AutomationRuleV2",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SecurityHub AutomationRuleV2",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::SecurityHub::AutomationRuleV2",
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
      description: "Sync SecurityHub AutomationRuleV2 state from AWS",
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
            "AWS::SecurityHub::AutomationRuleV2",
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
