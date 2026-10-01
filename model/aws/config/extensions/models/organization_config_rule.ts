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

// Auto-generated extension model for @swamp/aws/config/organization-config-rule
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Config OrganizationConfigRule (AWS::Config::OrganizationConfigRule).
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
    "AWS region; overrides AWS_REGION / AWS_DEFAULT_REGION environment variables and ~/.aws/config profile region. Defaults to us-east-1.",
  ).optional(),
  OrganizationCustomRuleMetadata: z.object({
    TagKeyScope: z.string().describe(
      "One part of a key-value pair that make up a tag. A key is a general label that acts like a category for more specific tag values.",
    ).optional(),
    TagValueScope: z.string().describe(
      "The optional part of a key-value pair that make up a tag. A value acts as a descriptor within a tag category (key).",
    ).optional(),
    Description: z.string().describe(
      "The description that you provide for your organization AWS Config rule.",
    ).optional(),
    ResourceIdScope: z.string().describe(
      "The ID of the AWS resource that was evaluated.",
    ).optional(),
    LambdaFunctionArn: z.string().describe("The lambda function ARN."),
    OrganizationConfigRuleTriggerTypes: z.array(z.string()).describe(
      "The type of notification that triggers AWS Config to run an evaluation for a rule. You can specify the following notification types:",
    ),
    ResourceTypesScope: z.array(z.string()).describe(
      "The type of the AWS resource that was evaluated.",
    ).optional(),
    MaximumExecutionFrequency: z.string().describe(
      "The maximum frequency with which AWS Config runs evaluations for a rule.Allowed values: One_Hour | Three_Hours | Six_Hours | Twelve_Hours | TwentyFour_Hours.",
    ).optional(),
    InputParameters: z.string().describe(
      "A string, in JSON format, that is passed to your organization AWS Config rule Lambda function.",
    ).optional(),
  }).describe(
    "This object specifies organization custom rule metadata such as resource type, resource ID of AWS resource, Lambda function ARN, and organization trigger types that trigger AWS Config to evaluate your AWS resources against a rule.",
  ).optional(),
  OrganizationManagedRuleMetadata: z.object({
    TagKeyScope: z.string().describe(
      "One part of a key-value pair that make up a tag. A key is a general label that acts like a category for more specific tag values.",
    ).optional(),
    TagValueScope: z.string().describe(
      "The optional part of a key-value pair that make up a tag. A value acts as a descriptor within a tag category (key).",
    ).optional(),
    Description: z.string().describe(
      "The description that you provide for your organization AWS Config rule.",
    ).optional(),
    ResourceIdScope: z.string().describe(
      "The ID of the AWS resource that was evaluated.",
    ).optional(),
    RuleIdentifier: z.string().describe(
      "Required. For organization config managed rules, a predefined identifier from a list. For example, IAM_PASSWORD_POLICY is a managed rule.",
    ),
    ResourceTypesScope: z.array(z.string()).describe(
      "The type of the AWS resource that was evaluated.",
    ).optional(),
    MaximumExecutionFrequency: z.string().describe(
      "The maximum frequency with which AWS Config runs evaluations for a rule. Valid Values: One_Hour | Three_Hours | Six_Hours | Twelve_Hours | TwentyFour_Hours.",
    ).optional(),
    InputParameters: z.string().describe(
      "A string, in JSON format, that is passed to your organization AWS Config rule Lambda function.",
    ).optional(),
  }).describe(
    "This object specifies organization managed rule metadata such as resource type and ID of AWS resource along with the rule identifier.",
  ).optional(),
  ExcludedAccounts: z.array(z.string()).describe(
    "A comma-separated list of accounts that you want to exclude from an organization AWS Config rule.",
  ).optional(),
  OrganizationConfigRuleName: z.string().describe(
    "The name that you assign to an organization AWS Config rule. Required.",
  ),
  OrganizationCustomPolicyRuleMetadata: z.object({
    TagKeyScope: z.string().describe(
      "One part of a key-value pair that make up a tag. A key is a general label that acts like a category for more specific tag values.",
    ).optional(),
    TagValueScope: z.string().describe(
      "The optional part of a key-value pair that make up a tag. A value acts as a descriptor within a tag category (key).",
    ).optional(),
    Description: z.string().describe(
      "The description that you provide for your organization AWS Config rule.",
    ).optional(),
    Runtime: z.string().describe(
      "The runtime system for your organization AWS Config Custom Policy rules.",
    ),
    PolicyText: z.string().describe(
      "The policy definition containing the logic for your organization AWS Config Custom Policy rule.",
    ),
    ResourceIdScope: z.string().describe(
      "The ID of the AWS resource that was evaluated.",
    ).optional(),
    OrganizationConfigRuleTriggerTypes: z.array(z.string()).describe(
      "The type of notification that initiates AWS Config to run an evaluation for a rule.",
    ).optional(),
    DebugLogDeliveryAccounts: z.array(z.string()).describe(
      "A list of accounts that you can enable debug logging for your organization AWS Config Custom Policy rule.",
    ).optional(),
    ResourceTypesScope: z.array(z.string()).describe(
      "The type of the AWS resource that was evaluated.",
    ).optional(),
    InputParameters: z.string().describe(
      "A string, in JSON format, that is passed to your organization AWS Config Custom Policy rule.",
    ).optional(),
  }).describe(
    "This object specifies metadata for your organization's AWS Config Custom Policy rule.",
  ).optional(),
});

const StateSchema = z.object({
  OrganizationCustomRuleMetadata: z.object({
    TagKeyScope: z.string(),
    TagValueScope: z.string(),
    Description: z.string(),
    ResourceIdScope: z.string(),
    LambdaFunctionArn: z.string(),
    OrganizationConfigRuleTriggerTypes: z.array(z.string()),
    ResourceTypesScope: z.array(z.string()),
    MaximumExecutionFrequency: z.string(),
    InputParameters: z.string(),
  }).optional(),
  OrganizationManagedRuleMetadata: z.object({
    TagKeyScope: z.string(),
    TagValueScope: z.string(),
    Description: z.string(),
    ResourceIdScope: z.string(),
    RuleIdentifier: z.string(),
    ResourceTypesScope: z.array(z.string()),
    MaximumExecutionFrequency: z.string(),
    InputParameters: z.string(),
  }).optional(),
  ExcludedAccounts: z.array(z.string()).optional(),
  OrganizationConfigRuleName: z.string(),
  OrganizationCustomPolicyRuleMetadata: z.object({
    TagKeyScope: z.string(),
    TagValueScope: z.string(),
    Description: z.string(),
    Runtime: z.string(),
    PolicyText: z.string(),
    ResourceIdScope: z.string(),
    OrganizationConfigRuleTriggerTypes: z.array(z.string()),
    DebugLogDeliveryAccounts: z.array(z.string()),
    ResourceTypesScope: z.array(z.string()),
    InputParameters: z.string(),
  }).optional(),
  OrganizationConfigRuleArn: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  OrganizationCustomRuleMetadata: z.object({
    TagKeyScope: z.string().describe(
      "One part of a key-value pair that make up a tag. A key is a general label that acts like a category for more specific tag values.",
    ).optional(),
    TagValueScope: z.string().describe(
      "The optional part of a key-value pair that make up a tag. A value acts as a descriptor within a tag category (key).",
    ).optional(),
    Description: z.string().describe(
      "The description that you provide for your organization AWS Config rule.",
    ).optional(),
    ResourceIdScope: z.string().describe(
      "The ID of the AWS resource that was evaluated.",
    ).optional(),
    LambdaFunctionArn: z.string().describe("The lambda function ARN.")
      .optional(),
    OrganizationConfigRuleTriggerTypes: z.array(z.string()).describe(
      "The type of notification that triggers AWS Config to run an evaluation for a rule. You can specify the following notification types:",
    ).optional(),
    ResourceTypesScope: z.array(z.string()).describe(
      "The type of the AWS resource that was evaluated.",
    ).optional(),
    MaximumExecutionFrequency: z.string().describe(
      "The maximum frequency with which AWS Config runs evaluations for a rule.Allowed values: One_Hour | Three_Hours | Six_Hours | Twelve_Hours | TwentyFour_Hours.",
    ).optional(),
    InputParameters: z.string().describe(
      "A string, in JSON format, that is passed to your organization AWS Config rule Lambda function.",
    ).optional(),
  }).describe(
    "This object specifies organization custom rule metadata such as resource type, resource ID of AWS resource, Lambda function ARN, and organization trigger types that trigger AWS Config to evaluate your AWS resources against a rule.",
  ).optional(),
  OrganizationManagedRuleMetadata: z.object({
    TagKeyScope: z.string().describe(
      "One part of a key-value pair that make up a tag. A key is a general label that acts like a category for more specific tag values.",
    ).optional(),
    TagValueScope: z.string().describe(
      "The optional part of a key-value pair that make up a tag. A value acts as a descriptor within a tag category (key).",
    ).optional(),
    Description: z.string().describe(
      "The description that you provide for your organization AWS Config rule.",
    ).optional(),
    ResourceIdScope: z.string().describe(
      "The ID of the AWS resource that was evaluated.",
    ).optional(),
    RuleIdentifier: z.string().describe(
      "Required. For organization config managed rules, a predefined identifier from a list. For example, IAM_PASSWORD_POLICY is a managed rule.",
    ).optional(),
    ResourceTypesScope: z.array(z.string()).describe(
      "The type of the AWS resource that was evaluated.",
    ).optional(),
    MaximumExecutionFrequency: z.string().describe(
      "The maximum frequency with which AWS Config runs evaluations for a rule. Valid Values: One_Hour | Three_Hours | Six_Hours | Twelve_Hours | TwentyFour_Hours.",
    ).optional(),
    InputParameters: z.string().describe(
      "A string, in JSON format, that is passed to your organization AWS Config rule Lambda function.",
    ).optional(),
  }).describe(
    "This object specifies organization managed rule metadata such as resource type and ID of AWS resource along with the rule identifier.",
  ).optional(),
  ExcludedAccounts: z.array(z.string()).describe(
    "A comma-separated list of accounts that you want to exclude from an organization AWS Config rule.",
  ).optional(),
  OrganizationConfigRuleName: z.string().describe(
    "The name that you assign to an organization AWS Config rule. Required.",
  ).optional(),
  OrganizationCustomPolicyRuleMetadata: z.object({
    TagKeyScope: z.string().describe(
      "One part of a key-value pair that make up a tag. A key is a general label that acts like a category for more specific tag values.",
    ).optional(),
    TagValueScope: z.string().describe(
      "The optional part of a key-value pair that make up a tag. A value acts as a descriptor within a tag category (key).",
    ).optional(),
    Description: z.string().describe(
      "The description that you provide for your organization AWS Config rule.",
    ).optional(),
    Runtime: z.string().describe(
      "The runtime system for your organization AWS Config Custom Policy rules.",
    ).optional(),
    PolicyText: z.string().describe(
      "The policy definition containing the logic for your organization AWS Config Custom Policy rule.",
    ).optional(),
    ResourceIdScope: z.string().describe(
      "The ID of the AWS resource that was evaluated.",
    ).optional(),
    OrganizationConfigRuleTriggerTypes: z.array(z.string()).describe(
      "The type of notification that initiates AWS Config to run an evaluation for a rule.",
    ).optional(),
    DebugLogDeliveryAccounts: z.array(z.string()).describe(
      "A list of accounts that you can enable debug logging for your organization AWS Config Custom Policy rule.",
    ).optional(),
    ResourceTypesScope: z.array(z.string()).describe(
      "The type of the AWS resource that was evaluated.",
    ).optional(),
    InputParameters: z.string().describe(
      "A string, in JSON format, that is passed to your organization AWS Config Custom Policy rule.",
    ).optional(),
  }).describe(
    "This object specifies metadata for your organization's AWS Config Custom Policy rule.",
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

/** Swamp extension model for Config OrganizationConfigRule. Registered at `@swamp/aws/config/organization-config-rule`. */
export const model = {
  type: "@swamp/aws/config/organization-config-rule",
  version: "2026.10.01.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Config OrganizationConfigRule resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Config OrganizationConfigRule",
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
          "AWS::Config::OrganizationConfigRule",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.OrganizationConfigRuleName ?? g.OrganizationConfigRuleName)
            ?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
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
    get: {
      description: "Get a Config OrganizationConfigRule",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Config OrganizationConfigRule",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Config::OrganizationConfigRule",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName = ((result.OrganizationConfigRuleName ??
          context.globalArgs.OrganizationConfigRuleName)?.toString() ??
          args.identifier).replace(/[\/\\]/g, "_").replace(/\.\./g, "_")
          .replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a Config OrganizationConfigRule",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName =
          (g.OrganizationConfigRuleName?.toString() ?? "current").replace(
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
        const identifier = existing.OrganizationConfigRuleName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Config::OrganizationConfigRule",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Config::OrganizationConfigRule",
          identifier,
          currentState,
          desiredState,
          ["OrganizationConfigRuleName"],
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
      description: "Delete a Config OrganizationConfigRule",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Config OrganizationConfigRule",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Config::OrganizationConfigRule",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.OrganizationConfigRuleName?.toString() ??
            args.identifier).replace(/[\/\\]/g, "_").replace(/\.\./g, "_")
            .replace(/\0/g, "");
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
      description: "Sync Config OrganizationConfigRule state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName =
          (g.OrganizationConfigRuleName?.toString() ?? "current").replace(
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
        const identifier = existing.OrganizationConfigRuleName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Config::OrganizationConfigRule",
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
      description: "List Config OrganizationConfigRule resources",
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
          "AWS::Config::OrganizationConfigRule",
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
            (item.properties?.OrganizationConfigRuleName?.toString() ??
              item.identifier).replace(/[\/\\]/g, "_").replace(/\.\./g, "_")
              .replace(/\0/g, "");
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
