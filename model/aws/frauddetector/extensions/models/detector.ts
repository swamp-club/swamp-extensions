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

// Auto-generated extension model for @swamp/aws/frauddetector/detector
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for FraudDetector Detector (AWS::FraudDetector::Detector).
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

const TagSchema = z.object({
  Key: z.string().min(1).max(128),
  Value: z.string().min(0).max(256),
});

const OutcomeSchema = z.object({
  Arn: z.string().optional(),
  Inline: z.boolean().optional(),
  Name: z.string().optional(),
  Description: z.string().min(1).max(256).describe("The description.")
    .optional(),
  Tags: z.array(TagSchema).describe("Tags associated with this outcome.")
    .optional(),
  CreatedTime: z.string().describe("The time when the outcome was created.")
    .optional(),
  LastUpdatedTime: z.string().describe(
    "The time when the outcome was last updated.",
  ).optional(),
});

const RuleSchema = z.object({
  RuleId: z.string().optional(),
  RuleVersion: z.string().optional(),
  DetectorId: z.string().optional(),
  Expression: z.string().optional(),
  Language: z.enum(["DETECTORPL"]).optional(),
  Outcomes: z.array(OutcomeSchema).optional(),
  Arn: z.string().optional(),
  Description: z.string().min(1).max(256).describe("The description.")
    .optional(),
  Tags: z.array(TagSchema).describe("Tags associated with this event type.")
    .optional(),
  CreatedTime: z.string().describe("The time when the event type was created.")
    .optional(),
  LastUpdatedTime: z.string().describe(
    "The time when the event type was last updated.",
  ).optional(),
});

const EventVariableSchema = z.object({
  Arn: z.string().optional(),
  Inline: z.boolean().optional(),
  Name: z.string().optional(),
  DataSource: z.enum(["EVENT"]).optional(),
  DataType: z.enum(["STRING", "INTEGER", "FLOAT", "BOOLEAN"]).optional(),
  DefaultValue: z.string().optional(),
  VariableType: z.enum([
    "AUTH_CODE",
    "AVS",
    "BILLING_ADDRESS_L1",
    "BILLING_ADDRESS_L2",
    "BILLING_CITY",
    "BILLING_COUNTRY",
    "BILLING_NAME",
    "BILLING_PHONE",
    "BILLING_STATE",
    "BILLING_ZIP",
    "CARD_BIN",
    "CATEGORICAL",
    "CURRENCY_CODE",
    "EMAIL_ADDRESS",
    "FINGERPRINT",
    "FRAUD_LABEL",
    "FREE_FORM_TEXT",
    "IP_ADDRESS",
    "NUMERIC",
    "ORDER_ID",
    "PAYMENT_TYPE",
    "PHONE_NUMBER",
    "PRICE",
    "PRODUCT_CATEGORY",
    "SHIPPING_ADDRESS_L1",
    "SHIPPING_ADDRESS_L2",
    "SHIPPING_CITY",
    "SHIPPING_COUNTRY",
    "SHIPPING_NAME",
    "SHIPPING_PHONE",
    "SHIPPING_STATE",
    "SHIPPING_ZIP",
    "USERAGENT",
  ]).optional(),
  Description: z.string().min(1).max(256).describe("The description.")
    .optional(),
  Tags: z.array(TagSchema).describe("Tags associated with this event variable.")
    .optional(),
  CreatedTime: z.string().describe(
    "The time when the event variable was created.",
  ).optional(),
  LastUpdatedTime: z.string().describe(
    "The time when the event variable was last updated.",
  ).optional(),
});

const LabelSchema = z.object({
  Arn: z.string().optional(),
  Inline: z.boolean().optional(),
  Name: z.string().optional(),
  Description: z.string().min(1).max(256).describe("The description.")
    .optional(),
  Tags: z.array(TagSchema).describe("Tags associated with this label.")
    .optional(),
  CreatedTime: z.string().describe("The time when the label was created.")
    .optional(),
  LastUpdatedTime: z.string().describe(
    "The time when the label was last updated.",
  ).optional(),
});

const EntityTypeSchema = z.object({
  Arn: z.string().optional(),
  Inline: z.boolean().optional(),
  Name: z.string().optional(),
  Description: z.string().min(1).max(256).describe("The description.")
    .optional(),
  Tags: z.array(TagSchema).describe("Tags associated with this entity type.")
    .optional(),
  CreatedTime: z.string().describe("The time when the entity type was created.")
    .optional(),
  LastUpdatedTime: z.string().describe(
    "The time when the entity type was last updated.",
  ).optional(),
});

const ModelSchema = z.object({
  Arn: z.string().optional(),
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
  DetectorId: z.string().min(1).max(64).regex(new RegExp("^[0-9a-z_-]+$"))
    .describe("The ID of the detector"),
  DetectorVersionStatus: z.enum(["DRAFT", "ACTIVE"]).describe(
    "The desired detector version status for the detector",
  ).optional(),
  RuleExecutionMode: z.enum(["FIRST_MATCHED", "ALL_MATCHED"]).optional(),
  Tags: z.array(TagSchema).describe("Tags associated with this detector.")
    .optional(),
  Description: z.string().min(1).max(128).describe(
    "The description of the detector.",
  ).optional(),
  Rules: z.array(RuleSchema),
  EventType: z.object({
    Name: z.string().min(1).max(64).regex(new RegExp("^[0-9a-z_-]+$")).describe(
      "The name for the event type",
    ).optional(),
    Inline: z.boolean().optional(),
    Tags: z.array(TagSchema).describe("Tags associated with this event type.")
      .optional(),
    Description: z.string().min(1).max(128).describe(
      "The description of the event type.",
    ).optional(),
    EventVariables: z.array(EventVariableSchema).optional(),
    Labels: z.array(LabelSchema).optional(),
    EntityTypes: z.array(EntityTypeSchema).optional(),
  }).describe("The event type to associate this detector with."),
  AssociatedModels: z.array(ModelSchema).describe(
    "The models to associate with this detector.",
  ).optional(),
});

const StateSchema = z.object({
  DetectorId: z.string().optional(),
  DetectorVersionStatus: z.string().optional(),
  DetectorVersionId: z.string().optional(),
  RuleExecutionMode: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  Description: z.string().optional(),
  Rules: z.array(RuleSchema).optional(),
  EventType: z.object({
    Name: z.string(),
    Inline: z.boolean(),
    Tags: z.array(TagSchema),
    Description: z.string(),
    EventVariables: z.array(EventVariableSchema),
    Labels: z.array(LabelSchema),
    EntityTypes: z.array(EntityTypeSchema),
    Arn: z.string(),
    CreatedTime: z.string(),
    LastUpdatedTime: z.string(),
  }).optional(),
  Arn: z.string(),
  CreatedTime: z.string().optional(),
  LastUpdatedTime: z.string().optional(),
  AssociatedModels: z.array(ModelSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  DetectorId: z.string().min(1).max(64).regex(new RegExp("^[0-9a-z_-]+$"))
    .describe("The ID of the detector").optional(),
  DetectorVersionStatus: z.enum(["DRAFT", "ACTIVE"]).describe(
    "The desired detector version status for the detector",
  ).optional(),
  RuleExecutionMode: z.enum(["FIRST_MATCHED", "ALL_MATCHED"]).optional(),
  Tags: z.array(TagSchema).describe("Tags associated with this detector.")
    .optional(),
  Description: z.string().min(1).max(128).describe(
    "The description of the detector.",
  ).optional(),
  Rules: z.array(RuleSchema).optional(),
  EventType: z.object({
    Name: z.string().min(1).max(64).regex(new RegExp("^[0-9a-z_-]+$")).describe(
      "The name for the event type",
    ).optional(),
    Inline: z.boolean().optional(),
    Tags: z.array(TagSchema).describe("Tags associated with this event type.")
      .optional(),
    Description: z.string().min(1).max(128).describe(
      "The description of the event type.",
    ).optional(),
    EventVariables: z.array(EventVariableSchema).optional(),
    Labels: z.array(LabelSchema).optional(),
    EntityTypes: z.array(EntityTypeSchema).optional(),
  }).describe("The event type to associate this detector with.").optional(),
  AssociatedModels: z.array(ModelSchema).describe(
    "The models to associate with this detector.",
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

/** Swamp extension model for FraudDetector Detector. Registered at `@swamp/aws/frauddetector/detector`. */
export const model = {
  type: "@swamp/aws/frauddetector/detector",
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
      description: "FraudDetector Detector resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a FraudDetector Detector",
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
          "AWS::FraudDetector::Detector",
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
      description: "Get a FraudDetector Detector",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the FraudDetector Detector",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::FraudDetector::Detector",
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
      description: "Update a FraudDetector Detector",
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
          "AWS::FraudDetector::Detector",
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
          "AWS::FraudDetector::Detector",
          identifier,
          currentState,
          desiredState,
          ["DetectorId"],
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
      description: "Delete a FraudDetector Detector",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the FraudDetector Detector",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::FraudDetector::Detector",
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
      description: "Sync FraudDetector Detector state from AWS",
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
            "AWS::FraudDetector::Detector",
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
