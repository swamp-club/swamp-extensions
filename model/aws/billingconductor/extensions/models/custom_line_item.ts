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

// Auto-generated extension model for @swamp/aws/billingconductor/custom-line-item
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for BillingConductor CustomLineItem (AWS::BillingConductor::CustomLineItem).
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

const CustomLineItemFlatChargeDetailsSchema = z.object({
  ChargeValue: z.number().min(0).max(1000000),
});

const CustomLineItemPercentageChargeDetailsSchema = z.object({
  ChildAssociatedResources: z.array(
    z.string().regex(
      new RegExp(
        "(arn:aws(-cn)?:billingconductor::[0-9]{12}:(customlineitem|billinggroup)/)?[a-zA-Z0-9]{10,12}",
      ),
    ),
  ).optional(),
  PercentageValue: z.number().min(0).max(10000),
});

const LineItemFilterSchema = z.object({
  Attribute: z.enum(["LINE_ITEM_TYPE", "SERVICE"]),
  MatchOption: z.enum(["NOT_EQUAL", "EQUAL"]),
  Values: z.array(z.enum(["SAVINGS_PLAN_NEGATION"])).optional(),
  AttributeValues: z.array(
    z.string().min(1).max(256).regex(new RegExp("^[a-zA-Z0-9]+$")),
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128),
  Value: z.string().min(1).max(256),
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
  Name: z.string().min(1).max(128).regex(
    new RegExp("[a-zA-Z0-9_\\+=\\.\\-@]+"),
  ),
  ComputationRule: z.enum(["CONSOLIDATED", "ITEMIZED"]).describe(
    "The display settings of the Custom Line Item.",
  ).optional(),
  PresentationDetails: z.object({
    Service: z.string().regex(new RegExp("^[a-zA-Z0-9]+$")),
  }).optional(),
  Description: z.string().max(255).optional(),
  CustomLineItemChargeDetails: z.object({
    Flat: CustomLineItemFlatChargeDetailsSchema.optional(),
    Percentage: CustomLineItemPercentageChargeDetailsSchema.optional(),
    Type: z.enum(["FEE", "CREDIT"]),
    LineItemFilters: z.array(LineItemFilterSchema).optional(),
  }).optional(),
  BillingGroupArn: z.string().regex(
    new RegExp(
      "arn:aws(-cn)?:billingconductor::[0-9]{12}:billinggroup/?[a-zA-Z0-9]{10,12}",
    ),
  ).describe("Billing Group ARN"),
  BillingPeriodRange: z.object({
    InclusiveStartBillingPeriod: z.string().regex(
      new RegExp("\\d{4}-(0?[1-9]|1[012])"),
    ).optional(),
    ExclusiveEndBillingPeriod: z.string().regex(
      new RegExp("\\d{4}-(0?[1-9]|1[012])"),
    ).optional(),
  }).optional(),
  AccountId: z.string().regex(new RegExp("[0-9]{12}")).describe(
    "The account which this custom line item will be charged to",
  ).optional(),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  Name: z.string().optional(),
  ComputationRule: z.string().optional(),
  PresentationDetails: z.object({
    Service: z.string(),
  }).optional(),
  Description: z.string().optional(),
  CustomLineItemChargeDetails: z.object({
    Flat: CustomLineItemFlatChargeDetailsSchema,
    Percentage: CustomLineItemPercentageChargeDetailsSchema,
    Type: z.string(),
    LineItemFilters: z.array(LineItemFilterSchema),
  }).optional(),
  BillingGroupArn: z.string().optional(),
  BillingPeriodRange: z.object({
    InclusiveStartBillingPeriod: z.string(),
    ExclusiveEndBillingPeriod: z.string(),
  }).optional(),
  Arn: z.string(),
  CreationTime: z.number().optional(),
  LastModifiedTime: z.number().optional(),
  AssociationSize: z.number().optional(),
  ProductCode: z.string().optional(),
  CurrencyCode: z.string().optional(),
  AccountId: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().min(1).max(128).regex(new RegExp("[a-zA-Z0-9_\\+=\\.\\-@]+"))
    .optional(),
  ComputationRule: z.enum(["CONSOLIDATED", "ITEMIZED"]).describe(
    "The display settings of the Custom Line Item.",
  ).optional(),
  PresentationDetails: z.object({
    Service: z.string().regex(new RegExp("^[a-zA-Z0-9]+$")).optional(),
  }).optional(),
  Description: z.string().max(255).optional(),
  CustomLineItemChargeDetails: z.object({
    Flat: CustomLineItemFlatChargeDetailsSchema.optional(),
    Percentage: CustomLineItemPercentageChargeDetailsSchema.optional(),
    Type: z.enum(["FEE", "CREDIT"]).optional(),
    LineItemFilters: z.array(LineItemFilterSchema).optional(),
  }).optional(),
  BillingGroupArn: z.string().regex(
    new RegExp(
      "arn:aws(-cn)?:billingconductor::[0-9]{12}:billinggroup/?[a-zA-Z0-9]{10,12}",
    ),
  ).describe("Billing Group ARN").optional(),
  BillingPeriodRange: z.object({
    InclusiveStartBillingPeriod: z.string().regex(
      new RegExp("\\d{4}-(0?[1-9]|1[012])"),
    ).optional(),
    ExclusiveEndBillingPeriod: z.string().regex(
      new RegExp("\\d{4}-(0?[1-9]|1[012])"),
    ).optional(),
  }).optional(),
  AccountId: z.string().regex(new RegExp("[0-9]{12}")).describe(
    "The account which this custom line item will be charged to",
  ).optional(),
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

/** Swamp extension model for BillingConductor CustomLineItem. Registered at `@swamp/aws/billingconductor/custom-line-item`. */
export const model = {
  type: "@swamp/aws/billingconductor/custom-line-item",
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
      description: "BillingConductor CustomLineItem resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a BillingConductor CustomLineItem",
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
          "AWS::BillingConductor::CustomLineItem",
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
      description: "Get a BillingConductor CustomLineItem",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the BillingConductor CustomLineItem",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::BillingConductor::CustomLineItem",
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
      description: "Update a BillingConductor CustomLineItem",
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
          "AWS::BillingConductor::CustomLineItem",
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
          "AWS::BillingConductor::CustomLineItem",
          identifier,
          currentState,
          desiredState,
          [
            "BillingGroupArn",
            "AccountId",
            "ComputationRule",
            "PresentationDetails",
            "InclusiveStartBillingPeriod",
            "ExclusiveEndBillingPeriod",
            "Type",
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
      description: "Delete a BillingConductor CustomLineItem",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the BillingConductor CustomLineItem",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::BillingConductor::CustomLineItem",
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
      description: "Sync BillingConductor CustomLineItem state from AWS",
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
            "AWS::BillingConductor::CustomLineItem",
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
