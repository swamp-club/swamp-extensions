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

// Auto-generated extension model for @swamp/aws/cases/case-rule
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Cases CaseRule (AWS::Cases::CaseRule).
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

const BooleanOperandsSchema = z.object({
  OperandOne: z.object({
    FieldId: z.string().min(1).max(500).describe(
      "The field ID this operand should take the value of.",
    ).optional(),
  }).describe("The left hand operand in the condition."),
  OperandTwo: z.object({
    StringValue: z.string().min(1).max(1500).describe(
      "A string value to compare against the field value in the condition evaluation.",
    ).optional(),
    BooleanValue: z.boolean().describe(
      "A boolean value to compare against the field value in the condition evaluation.",
    ).optional(),
    DoubleValue: z.number().describe(
      "A numeric value to compare against the field value in the condition evaluation.",
    ).optional(),
    EmptyValue: z.record(z.string(), z.unknown()).describe(
      "An empty operand value.",
    ).optional(),
  }).describe("The right hand operand in the condition."),
  Result: z.boolean().describe(
    "The value of the outer rule if the condition evaluates to true.",
  ),
});

const RequiredCaseRuleSchema = z.object({
  DefaultValue: z.boolean().describe(
    "The default required state for the field when none of the specified conditions are met. If true, the field is required by default; if false, the field is optional by default.",
  ),
  Conditions: z.array(z.object({
    EqualTo: BooleanOperandsSchema.describe("Boolean operands for a condition.")
      .optional(),
    NotEqualTo: BooleanOperandsSchema.describe(
      "Boolean operands for a condition.",
    ).optional(),
  })).describe(
    "An ordered list of boolean conditions that determine when the field should be required. Conditions are evaluated in order, and the first condition that evaluates to true determines whether the field is required, overriding the default value.",
  ),
});

const HiddenCaseRuleSchema = z.object({
  DefaultValue: z.boolean().describe(
    "The value of the rule (i.e. whether the field is hidden) should none of the conditions evaluate to true",
  ),
  Conditions: z.array(z.object({
    EqualTo: BooleanOperandsSchema.describe("Boolean operands for a condition.")
      .optional(),
    NotEqualTo: BooleanOperandsSchema.describe(
      "Boolean operands for a condition.",
    ).optional(),
  })).describe(
    "List of conditions for the hidden rule; the first condition to evaluate to true dictates the value of the rule",
  ),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^(?!aws:)[a-zA-Z+-=._:/]+$"),
  ).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
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
    "AWS region; overrides AWS_REGION environment variable. Defaults to us-east-1.",
  ).optional(),
  Description: z.string().max(255).describe(
    "A description explaining the purpose and behavior of this case rule. Helps administrators understand when and why this rule applies to case fields.",
  ).optional(),
  DomainId: z.string().min(1).max(500).describe(
    "The unique identifier of the Cases domain.",
  ).optional(),
  Name: z.string().min(1).max(100).regex(new RegExp("^.*[\\S]$")).describe(
    "A descriptive name for the case rule. Must be unique within the domain and should clearly indicate the rule's purpose (e.g., 'Priority Field Required for Urgent Cases').",
  ),
  Rule: z.object({
    Required: RequiredCaseRuleSchema.describe(
      "A required rule type, used to indicate whether a field is required.",
    ).optional(),
    Hidden: HiddenCaseRuleSchema.describe(
      "Hidden rule type, used to indicate whether a field is hidden",
    ).optional(),
  }).describe(
    "Defines the rule behavior and conditions. Specifies the rule type and the conditions under which it applies. In the Amazon Connect admin website, this corresponds to case field conditions.",
  ),
  Tags: z.array(TagSchema).describe(
    "The tags that you attach to this case rule.",
  ).optional(),
});

const StateSchema = z.object({
  CaseRuleArn: z.string(),
  CaseRuleId: z.string().optional(),
  Description: z.string().optional(),
  DomainId: z.string().optional(),
  Name: z.string().optional(),
  Rule: z.object({
    Required: RequiredCaseRuleSchema,
    Hidden: HiddenCaseRuleSchema,
  }).optional(),
  CreatedTime: z.string().optional(),
  LastModifiedTime: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Description: z.string().max(255).describe(
    "A description explaining the purpose and behavior of this case rule. Helps administrators understand when and why this rule applies to case fields.",
  ).optional(),
  DomainId: z.string().min(1).max(500).describe(
    "The unique identifier of the Cases domain.",
  ).optional(),
  Name: z.string().min(1).max(100).regex(new RegExp("^.*[\\S]$")).describe(
    "A descriptive name for the case rule. Must be unique within the domain and should clearly indicate the rule's purpose (e.g., 'Priority Field Required for Urgent Cases').",
  ).optional(),
  Rule: z.object({
    Required: RequiredCaseRuleSchema.describe(
      "A required rule type, used to indicate whether a field is required.",
    ).optional(),
    Hidden: HiddenCaseRuleSchema.describe(
      "Hidden rule type, used to indicate whether a field is hidden",
    ).optional(),
  }).describe(
    "Defines the rule behavior and conditions. Specifies the rule type and the conditions under which it applies. In the Amazon Connect admin website, this corresponds to case field conditions.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags that you attach to this case rule.",
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

/** Swamp extension model for Cases CaseRule. Registered at `@swamp/aws/cases/case-rule`. */
export const model = {
  type: "@swamp/aws/cases/case-rule",
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
      description: "Cases CaseRule resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Cases CaseRule",
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
          "AWS::Cases::CaseRule",
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
      description: "Get a Cases CaseRule",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Cases CaseRule",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Cases::CaseRule",
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
      description: "Update a Cases CaseRule",
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
        const identifier = existing.CaseRuleArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Cases::CaseRule",
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
          "AWS::Cases::CaseRule",
          identifier,
          currentState,
          desiredState,
          ["DomainId"],
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
      description: "Delete a Cases CaseRule",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Cases CaseRule",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Cases::CaseRule",
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
      description: "Sync Cases CaseRule state from AWS",
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
        const identifier = existing.CaseRuleArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Cases::CaseRule",
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
