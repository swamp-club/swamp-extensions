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

// Auto-generated extension model for @swamp/aws/customerprofiles/calculated-attribute-definition
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for CustomerProfiles CalculatedAttributeDefinition (AWS::CustomerProfiles::CalculatedAttributeDefinition).
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

const AttributeItemSchema = z.object({
  Name: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9_.-]+$"))
    .describe("The name of an attribute defined in a profile object type."),
});

const ValueRangeSchema = z.object({
  Start: z.number().int().min(-2147483648).max(2147483647).describe(
    "The starting point for this range. Positive numbers indicate how many days in the past data should be included, and negative numbers indicate how many days in the future.",
  ),
  End: z.number().int().min(-2147483648).max(2147483647).describe(
    "The ending point for this range. Positive numbers indicate how many days in the past data should be included, and negative numbers indicate how many days in the future.",
  ),
});

const RangeSchema = z.object({
  Value: z.number().int().min(1).max(2147483647).describe(
    "The amount of time of the specified unit.",
  ).optional(),
  Unit: z.enum(["DAYS"]).describe("The unit of time."),
  ValueRange: ValueRangeSchema.describe(
    "A structure specifying the endpoints of the relative time period over which data is included in the aggregation.",
  ).optional(),
  TimestampSource: z.string().min(1).max(255).describe(
    'An expression specifying the field in your JSON object from which the date should be parsed. The expression should follow the structure of \\"{ObjectTypeName.}\\". E.g. if your object type is MyType and source JSON is {"generatedAt": {"timestamp": "1737587945945"}}, then TimestampSource should be "{MyType.generatedAt.timestamp}".',
  ).optional(),
  TimestampFormat: z.string().min(1).max(255).describe(
    'The format the timestamp field in your JSON object is specified. This value should be one of EPOCHMILLI or ISO_8601. E.g. if your object type is MyType and source JSON is {"generatedAt": {"timestamp": "2001-07-04T12:08:56.235Z"}}, then TimestampFormat should be "ISO_8601".',
  ).optional(),
});

const ThresholdSchema = z.object({
  Value: z.string().min(1).max(255).describe("The value of the threshold."),
  Operator: z.enum(["EQUAL_TO", "GREATER_THAN", "LESS_THAN", "NOT_EQUAL_TO"])
    .describe("The operator of the threshold."),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe(
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
  DomainName: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9_-]+$"))
    .describe("The unique name of the domain."),
  CalculatedAttributeName: z.string().min(1).max(255).regex(
    new RegExp("^[a-zA-Z_][a-zA-Z_0-9-]*$"),
  ).describe("The unique name of the calculated attribute."),
  DisplayName: z.string().min(1).max(255).regex(
    new RegExp("^[a-zA-Z_][a-zA-Z_0-9-\\s]*$"),
  ).describe("The display name of the calculated attribute.").optional(),
  Description: z.string().min(1).max(1000).describe(
    "The description of the calculated attribute.",
  ).optional(),
  AttributeDetails: z.object({
    Attributes: z.array(AttributeItemSchema).describe(
      "A list of attribute items specified in the mathematical expression.",
    ),
    Expression: z.string().min(1).max(255).describe(
      'Mathematical expression that is performed on attribute items provided in the attribute list. Each element in the expression should follow the structure of "{ObjectTypeName.AttributeName}".',
    ),
  }).describe(
    "Mathematical expression and a list of attribute items specified in that expression.",
  ),
  Conditions: z.object({
    Range: RangeSchema.describe(
      "The relative time period over which data is included in the aggregation.",
    ).optional(),
    ObjectCount: z.number().int().min(1).max(300).describe(
      "The number of profile objects used for the calculated attribute.",
    ).optional(),
    Threshold: ThresholdSchema.describe(
      "The threshold for the calculated attribute.",
    ).optional(),
  }).describe(
    "The conditions including range, object count, and threshold for the calculated attribute.",
  ).optional(),
  Statistic: z.enum([
    "FIRST_OCCURRENCE",
    "LAST_OCCURRENCE",
    "COUNT",
    "SUM",
    "MINIMUM",
    "MAXIMUM",
    "AVERAGE",
    "MAX_OCCURRENCE",
  ]).describe(
    "The aggregation operation to perform for the calculated attribute.",
  ),
  UseHistoricalData: z.boolean().describe(
    "Whether to use historical data for the calculated attribute.",
  ).optional(),
  Readiness: z.object({
    ProgressPercentage: z.number().int().min(0).max(100).describe(
      "The progress percentage for including historical data in your calculated attribute.",
    ).optional(),
    Message: z.string().describe(
      "Any information pertaining to the status of the calculated attribute if required.",
    ).optional(),
  }).describe("The readiness status of the calculated attribute.").optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  DomainName: z.string(),
  CalculatedAttributeName: z.string(),
  DisplayName: z.string().optional(),
  Description: z.string().optional(),
  AttributeDetails: z.object({
    Attributes: z.array(AttributeItemSchema),
    Expression: z.string(),
  }).optional(),
  Conditions: z.object({
    Range: RangeSchema,
    ObjectCount: z.number(),
    Threshold: ThresholdSchema,
  }).optional(),
  Statistic: z.string().optional(),
  UseHistoricalData: z.boolean().optional(),
  CreatedAt: z.string().optional(),
  LastUpdatedAt: z.string().optional(),
  Status: z.string().optional(),
  Readiness: z.object({
    ProgressPercentage: z.number(),
    Message: z.string(),
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
  DomainName: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9_-]+$"))
    .describe("The unique name of the domain.").optional(),
  CalculatedAttributeName: z.string().min(1).max(255).regex(
    new RegExp("^[a-zA-Z_][a-zA-Z_0-9-]*$"),
  ).describe("The unique name of the calculated attribute.").optional(),
  DisplayName: z.string().min(1).max(255).regex(
    new RegExp("^[a-zA-Z_][a-zA-Z_0-9-\\s]*$"),
  ).describe("The display name of the calculated attribute.").optional(),
  Description: z.string().min(1).max(1000).describe(
    "The description of the calculated attribute.",
  ).optional(),
  AttributeDetails: z.object({
    Attributes: z.array(AttributeItemSchema).describe(
      "A list of attribute items specified in the mathematical expression.",
    ).optional(),
    Expression: z.string().min(1).max(255).describe(
      'Mathematical expression that is performed on attribute items provided in the attribute list. Each element in the expression should follow the structure of "{ObjectTypeName.AttributeName}".',
    ).optional(),
  }).describe(
    "Mathematical expression and a list of attribute items specified in that expression.",
  ).optional(),
  Conditions: z.object({
    Range: RangeSchema.describe(
      "The relative time period over which data is included in the aggregation.",
    ).optional(),
    ObjectCount: z.number().int().min(1).max(300).describe(
      "The number of profile objects used for the calculated attribute.",
    ).optional(),
    Threshold: ThresholdSchema.describe(
      "The threshold for the calculated attribute.",
    ).optional(),
  }).describe(
    "The conditions including range, object count, and threshold for the calculated attribute.",
  ).optional(),
  Statistic: z.enum([
    "FIRST_OCCURRENCE",
    "LAST_OCCURRENCE",
    "COUNT",
    "SUM",
    "MINIMUM",
    "MAXIMUM",
    "AVERAGE",
    "MAX_OCCURRENCE",
  ]).describe(
    "The aggregation operation to perform for the calculated attribute.",
  ).optional(),
  UseHistoricalData: z.boolean().describe(
    "Whether to use historical data for the calculated attribute.",
  ).optional(),
  Readiness: z.object({
    ProgressPercentage: z.number().int().min(0).max(100).describe(
      "The progress percentage for including historical data in your calculated attribute.",
    ).optional(),
    Message: z.string().describe(
      "Any information pertaining to the status of the calculated attribute if required.",
    ).optional(),
  }).describe("The readiness status of the calculated attribute.").optional(),
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

/** Swamp extension model for CustomerProfiles CalculatedAttributeDefinition. Registered at `@swamp/aws/customerprofiles/calculated-attribute-definition`. */
export const model = {
  type: "@swamp/aws/customerprofiles/calculated-attribute-definition",
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
      description:
        "CustomerProfiles CalculatedAttributeDefinition resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CustomerProfiles CalculatedAttributeDefinition",
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
          "AWS::CustomerProfiles::CalculatedAttributeDefinition",
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
      description: "Get a CustomerProfiles CalculatedAttributeDefinition",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CustomerProfiles CalculatedAttributeDefinition",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::CustomerProfiles::CalculatedAttributeDefinition",
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
      description: "Update a CustomerProfiles CalculatedAttributeDefinition",
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
          existing.DomainName?.toString(),
          existing.CalculatedAttributeName?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::CustomerProfiles::CalculatedAttributeDefinition",
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
          "AWS::CustomerProfiles::CalculatedAttributeDefinition",
          identifier,
          currentState,
          desiredState,
          [
            "DomainName",
            "CalculatedAttributeName",
            "UseHistoricalData",
            "TimestampSource",
            "TimestampFormat",
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
      description: "Delete a CustomerProfiles CalculatedAttributeDefinition",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CustomerProfiles CalculatedAttributeDefinition",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::CustomerProfiles::CalculatedAttributeDefinition",
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
      description:
        "Sync CustomerProfiles CalculatedAttributeDefinition state from AWS",
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
          existing.DomainName?.toString(),
          existing.CalculatedAttributeName?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::CustomerProfiles::CalculatedAttributeDefinition",
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
