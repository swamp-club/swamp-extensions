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

// Auto-generated extension model for @swamp/aws/customerprofiles/segment-definition
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for CustomerProfiles SegmentDefinition (AWS::CustomerProfiles::SegmentDefinition).
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

const ProfileDimensionSchema = z.object({
  DimensionType: z.enum([
    "INCLUSIVE",
    "EXCLUSIVE",
    "CONTAINS",
    "BEGINS_WITH",
    "ENDS_WITH",
  ]).describe("The type of segment dimension to use for a string dimension."),
  Values: z.array(z.string().min(1).max(255)),
});

const ExtraLengthValueProfileDimensionSchema = z.object({
  DimensionType: z.enum([
    "INCLUSIVE",
    "EXCLUSIVE",
    "CONTAINS",
    "BEGINS_WITH",
    "ENDS_WITH",
  ]).describe("The type of segment dimension to use for a string dimension."),
  Values: z.array(z.string().min(1).max(1000)),
});

const DateDimensionSchema = z.object({
  DimensionType: z.enum(["BEFORE", "AFTER", "BETWEEN", "NOT_BETWEEN", "ON"])
    .describe("The type of segment dimension to use for a date dimension."),
  Values: z.array(z.string()),
});

const AddressDimensionSchema = z.object({
  City: ProfileDimensionSchema.describe(
    "Specifies profile based criteria for a segment.",
  ).optional(),
  Country: ProfileDimensionSchema.describe(
    "Specifies profile based criteria for a segment.",
  ).optional(),
  County: ProfileDimensionSchema.describe(
    "Specifies profile based criteria for a segment.",
  ).optional(),
  PostalCode: ProfileDimensionSchema.describe(
    "Specifies profile based criteria for a segment.",
  ).optional(),
  Province: ProfileDimensionSchema.describe(
    "Specifies profile based criteria for a segment.",
  ).optional(),
  State: ProfileDimensionSchema.describe(
    "Specifies profile based criteria for a segment.",
  ).optional(),
});

const AttributeDimensionSchema = z.object({
  DimensionType: z.enum([
    "INCLUSIVE",
    "EXCLUSIVE",
    "CONTAINS",
    "BEGINS_WITH",
    "ENDS_WITH",
    "BEFORE",
    "AFTER",
    "BETWEEN",
    "NOT_BETWEEN",
    "ON",
    "GREATER_THAN",
    "LESS_THAN",
    "GREATER_THAN_OR_EQUAL",
    "LESS_THAN_OR_EQUAL",
    "EQUAL",
  ]).describe("The type of segment dimension to use."),
  Values: z.array(z.string().min(1).max(255)),
});

const ProfileTypeDimensionSchema = z.object({
  DimensionType: z.enum(["INCLUSIVE", "EXCLUSIVE"]).describe(
    "The type of segment dimension to use for a profile type dimension.",
  ),
  Values: z.array(z.enum(["ACCOUNT_PROFILE", "PROFILE"])),
});

const ProfileAttributesSchema = z.object({
  AccountNumber: ProfileDimensionSchema.describe(
    "Specifies profile based criteria for a segment.",
  ).optional(),
  AdditionalInformation: ExtraLengthValueProfileDimensionSchema.describe(
    "Specifies criteria for a segment using extended-length string values.",
  ).optional(),
  FirstName: ProfileDimensionSchema.describe(
    "Specifies profile based criteria for a segment.",
  ).optional(),
  LastName: ProfileDimensionSchema.describe(
    "Specifies profile based criteria for a segment.",
  ).optional(),
  MiddleName: ProfileDimensionSchema.describe(
    "Specifies profile based criteria for a segment.",
  ).optional(),
  GenderString: ProfileDimensionSchema.describe(
    "Specifies profile based criteria for a segment.",
  ).optional(),
  PartyTypeString: ProfileDimensionSchema.describe(
    "Specifies profile based criteria for a segment.",
  ).optional(),
  BirthDate: DateDimensionSchema.describe(
    "Specifies date based criteria for a segment.",
  ).optional(),
  PhoneNumber: ProfileDimensionSchema.describe(
    "Specifies profile based criteria for a segment.",
  ).optional(),
  BusinessName: ProfileDimensionSchema.describe(
    "Specifies profile based criteria for a segment.",
  ).optional(),
  BusinessPhoneNumber: ProfileDimensionSchema.describe(
    "Specifies profile based criteria for a segment.",
  ).optional(),
  HomePhoneNumber: ProfileDimensionSchema.describe(
    "Specifies profile based criteria for a segment.",
  ).optional(),
  MobilePhoneNumber: ProfileDimensionSchema.describe(
    "Specifies profile based criteria for a segment.",
  ).optional(),
  EmailAddress: ProfileDimensionSchema.describe(
    "Specifies profile based criteria for a segment.",
  ).optional(),
  PersonalEmailAddress: ProfileDimensionSchema.describe(
    "Specifies profile based criteria for a segment.",
  ).optional(),
  BusinessEmailAddress: ProfileDimensionSchema.describe(
    "Specifies profile based criteria for a segment.",
  ).optional(),
  Address: AddressDimensionSchema.describe(
    "The address based criteria for the segment.",
  ).optional(),
  ShippingAddress: AddressDimensionSchema.describe(
    "The address based criteria for the segment.",
  ).optional(),
  MailingAddress: AddressDimensionSchema.describe(
    "The address based criteria for the segment.",
  ).optional(),
  BillingAddress: AddressDimensionSchema.describe(
    "The address based criteria for the segment.",
  ).optional(),
  Attributes: z.record(z.string(), AttributeDimensionSchema).describe(
    "One or more custom attributes to use as criteria for the segment.",
  ).optional(),
  ProfileType: ProfileTypeDimensionSchema.describe(
    "Specifies profile type based criteria for a segment.",
  ).optional(),
});

const RangeOverrideSchema = z.object({
  Start: z.number().int().min(-2147483648).max(2147483647).describe(
    "The starting point for this overridden range. Positive numbers indicate how many days in the past data should be included, and negative numbers indicate how many days in the future.",
  ),
  End: z.number().int().min(-2147483648).max(2147483647).describe(
    "The ending point for this overridden range. Positive numbers indicate how many days in the past data should be included, and negative numbers indicate how many days in the future.",
  ).optional(),
  Unit: z.enum(["DAYS"]).describe("The unit to be applied to the range."),
});

const ConditionOverridesSchema = z.object({
  Range: RangeOverrideSchema.describe(
    "Defines the range to be applied to the calculated attribute definition.",
  ).optional(),
});

const CalculatedAttributeDimensionSchema = z.object({
  DimensionType: z.enum([
    "INCLUSIVE",
    "EXCLUSIVE",
    "CONTAINS",
    "BEGINS_WITH",
    "ENDS_WITH",
    "BEFORE",
    "AFTER",
    "BETWEEN",
    "NOT_BETWEEN",
    "ON",
    "GREATER_THAN",
    "LESS_THAN",
    "GREATER_THAN_OR_EQUAL",
    "LESS_THAN_OR_EQUAL",
    "EQUAL",
  ]).describe("The type of segment dimension to use."),
  Values: z.array(z.string().min(1).max(255)),
  ConditionOverrides: ConditionOverridesSchema.describe(
    "Overrides the condition block within the original calculated attribute definition.",
  ).optional(),
});

const SourceSegmentSchema = z.object({
  SegmentDefinitionName: z.string().min(1).max(64).regex(
    new RegExp("^[a-zA-Z0-9_-]+$"),
  ).optional(),
});

const GroupSchema = z.object({
  Dimensions: z.array(z.object({
    ProfileAttributes: ProfileAttributesSchema.describe(
      "Specifies the dimension settings within profile attributes for a segment.",
    ).optional(),
    CalculatedAttributes: z.record(
      z.string(),
      CalculatedAttributeDimensionSchema,
    ).describe(
      "One or more calculated attributes to use as criteria for the segment.",
    ).optional(),
  })).optional(),
  SourceSegments: z.array(SourceSegmentSchema).optional(),
  SourceType: z.enum(["ALL", "ANY", "NONE"]).describe(
    "Specifies the operator on how to handle multiple groups within the same segment.",
  ).optional(),
  Type: z.enum(["ALL", "ANY", "NONE"]).describe(
    "Specifies the operator on how to handle multiple groups within the same segment.",
  ).optional(),
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

const SortAttributeSchema = z.object({
  Name: z.string().min(1).max(255).describe(
    "The name of the attribute to sort by.",
  ),
  Order: z.enum(["ASC", "DESC"]).describe(
    "The sort order for the attribute (ascending or descending).",
  ),
  DataType: z.enum(["STRING", "NUMBER", "DATE"]).describe(
    "The data type of the sort attribute (e.g., string, number, date).",
  ).optional(),
  Type: z.enum(["PROFILE", "CALCULATED"]).describe(
    "The type of attribute (e.g., profile, calculated).",
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
    "AWS region; overrides AWS_REGION environment variable. Defaults to us-east-1.",
  ).optional(),
  Description: z.string().min(1).max(4000).describe(
    "The description of the segment definition.",
  ).optional(),
  DisplayName: z.string().min(1).max(255).describe(
    "The display name of the segment definition.",
  ),
  DomainName: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9_-]+$"))
    .describe("The unique name of the domain."),
  SegmentDefinitionName: z.string().min(1).max(64).regex(
    new RegExp("^[a-zA-Z0-9_-]+$"),
  ).describe("The unique name of the segment definition."),
  SegmentGroups: z.object({
    Groups: z.array(GroupSchema).optional(),
    Include: z.enum(["ALL", "ANY", "NONE"]).describe(
      "Specifies the operator on how to handle multiple groups within the same segment.",
    ).optional(),
  }).describe(
    "An array that defines the set of segment criteria to evaluate when handling segment groups for the segment.",
  ).optional(),
  SegmentSqlQuery: z.string().min(1).max(50000).describe(
    "The SQL query that defines the segment criteria.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags used to organize, track, or control access for this resource.",
  ).optional(),
  SegmentSort: z.object({
    Attributes: z.array(SortAttributeSchema).describe(
      "A list of attributes used to sort the segments and their ordering preferences.",
    ),
  }).describe("The segment sort configuration for ordering segment results.")
    .optional(),
});

const StateSchema = z.object({
  CreatedAt: z.string().optional(),
  Description: z.string().optional(),
  DisplayName: z.string().optional(),
  DomainName: z.string(),
  SegmentDefinitionName: z.string(),
  SegmentGroups: z.object({
    Groups: z.array(GroupSchema),
    Include: z.string(),
  }).optional(),
  SegmentSqlQuery: z.string().optional(),
  SegmentDefinitionArn: z.string().optional(),
  SegmentType: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  SegmentSort: z.object({
    Attributes: z.array(SortAttributeSchema),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Description: z.string().min(1).max(4000).describe(
    "The description of the segment definition.",
  ).optional(),
  DisplayName: z.string().min(1).max(255).describe(
    "The display name of the segment definition.",
  ).optional(),
  DomainName: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9_-]+$"))
    .describe("The unique name of the domain.").optional(),
  SegmentDefinitionName: z.string().min(1).max(64).regex(
    new RegExp("^[a-zA-Z0-9_-]+$"),
  ).describe("The unique name of the segment definition.").optional(),
  SegmentGroups: z.object({
    Groups: z.array(GroupSchema).optional(),
    Include: z.enum(["ALL", "ANY", "NONE"]).describe(
      "Specifies the operator on how to handle multiple groups within the same segment.",
    ).optional(),
  }).describe(
    "An array that defines the set of segment criteria to evaluate when handling segment groups for the segment.",
  ).optional(),
  SegmentSqlQuery: z.string().min(1).max(50000).describe(
    "The SQL query that defines the segment criteria.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags used to organize, track, or control access for this resource.",
  ).optional(),
  SegmentSort: z.object({
    Attributes: z.array(SortAttributeSchema).describe(
      "A list of attributes used to sort the segments and their ordering preferences.",
    ).optional(),
  }).describe("The segment sort configuration for ordering segment results.")
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

/** Swamp extension model for CustomerProfiles SegmentDefinition. Registered at `@swamp/aws/customerprofiles/segment-definition`. */
export const model = {
  type: "@swamp/aws/customerprofiles/segment-definition",
  version: "2026.06.08.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.1",
      description: "Added: SegmentSort",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.3",
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
      description: "CustomerProfiles SegmentDefinition resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CustomerProfiles SegmentDefinition",
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
          "AWS::CustomerProfiles::SegmentDefinition",
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
      description: "Get a CustomerProfiles SegmentDefinition",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CustomerProfiles SegmentDefinition",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::CustomerProfiles::SegmentDefinition",
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
      description: "Update a CustomerProfiles SegmentDefinition",
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
          existing.SegmentDefinitionName?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::CustomerProfiles::SegmentDefinition",
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
          "AWS::CustomerProfiles::SegmentDefinition",
          identifier,
          currentState,
          desiredState,
          [
            "DomainName",
            "SegmentDefinitionName",
            "DisplayName",
            "SegmentGroups",
            "SegmentSqlQuery",
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
      description: "Delete a CustomerProfiles SegmentDefinition",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CustomerProfiles SegmentDefinition",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::CustomerProfiles::SegmentDefinition",
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
      description: "Sync CustomerProfiles SegmentDefinition state from AWS",
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
          existing.SegmentDefinitionName?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::CustomerProfiles::SegmentDefinition",
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
