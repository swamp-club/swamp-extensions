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

// Auto-generated extension model for @swamp/aws/iot/mitigation-action
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for IoT MitigationAction (AWS::IoT::MitigationAction).
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
  Key: z.string().min(1).max(128).describe("The tag's key."),
  Value: z.string().min(1).max(256).describe("The tag's value."),
});

const AddThingsToThingGroupParamsSchema = z.object({
  OverrideDynamicGroups: z.boolean().describe(
    "Specifies if this mitigation action can move the things that triggered the mitigation action out of one or more dynamic thing groups.",
  ).optional(),
  ThingGroupNames: z.array(z.string().min(1).max(128)).describe(
    "The list of groups to which you want to add the things that triggered the mitigation action.",
  ),
});

const EnableIoTLoggingParamsSchema = z.object({
  LogLevel: z.enum(["DEBUG", "INFO", "ERROR", "WARN", "UNSET_VALUE"]).describe(
    "Specifies which types of information are logged.",
  ),
  RoleArnForLogging: z.string().min(11).max(2048).describe(
    "The ARN of the IAM role used for logging.",
  ),
});

const PublishFindingToSnsParamsSchema = z.object({
  TopicArn: z.string().min(11).max(2048).describe(
    "The ARN of the topic to which you want to publish the findings.",
  ),
});

const ReplaceDefaultPolicyVersionParamsSchema = z.object({
  TemplateName: z.enum(["BLANK_POLICY", "UNSET_VALUE"]),
});

const UpdateCACertificateParamsSchema = z.object({
  Action: z.enum(["DEACTIVATE", "UNSET_VALUE"]),
});

const UpdateDeviceCertificateParamsSchema = z.object({
  Action: z.enum(["DEACTIVATE", "UNSET_VALUE"]),
});

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
    "AWS region; overrides AWS_REGION environment variable. Defaults to us-east-1.",
  ).optional(),
  ActionName: z.string().min(1).max(128).regex(new RegExp("[a-zA-Z0-9:_-]+"))
    .describe("A unique identifier for the mitigation action.").optional(),
  RoleArn: z.string(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
  ActionParams: z.object({
    AddThingsToThingGroupParams: AddThingsToThingGroupParamsSchema.describe(
      "Parameters to define a mitigation action that moves devices associated with a certificate to one or more specified thing groups, typically for quarantine.",
    ).optional(),
    EnableIoTLoggingParams: EnableIoTLoggingParamsSchema.describe(
      "Parameters to define a mitigation action that enables AWS IoT logging at a specified level of detail.",
    ).optional(),
    PublishFindingToSnsParams: PublishFindingToSnsParamsSchema.describe(
      "Parameters, to define a mitigation action that publishes findings to Amazon SNS. You can implement your own custom actions in response to the Amazon SNS messages.",
    ).optional(),
    ReplaceDefaultPolicyVersionParams: ReplaceDefaultPolicyVersionParamsSchema
      .describe(
        "Parameters to define a mitigation action that adds a blank policy to restrict permissions.",
      ).optional(),
    UpdateCACertificateParams: UpdateCACertificateParamsSchema.describe(
      "Parameters to define a mitigation action that changes the state of the CA certificate to inactive.",
    ).optional(),
    UpdateDeviceCertificateParams: UpdateDeviceCertificateParamsSchema.describe(
      "Parameters to define a mitigation action that changes the state of the device certificate to inactive.",
    ).optional(),
  }).describe(
    "The set of parameters for this mitigation action. You can specify only one type of parameter (in other words, you can apply only one action for each defined mitigation action).",
  ),
});

const StateSchema = z.object({
  ActionName: z.string(),
  RoleArn: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  ActionParams: z.object({
    AddThingsToThingGroupParams: AddThingsToThingGroupParamsSchema,
    EnableIoTLoggingParams: EnableIoTLoggingParamsSchema,
    PublishFindingToSnsParams: PublishFindingToSnsParamsSchema,
    ReplaceDefaultPolicyVersionParams: ReplaceDefaultPolicyVersionParamsSchema,
    UpdateCACertificateParams: UpdateCACertificateParamsSchema,
    UpdateDeviceCertificateParams: UpdateDeviceCertificateParamsSchema,
  }).optional(),
  MitigationActionArn: z.string().optional(),
  MitigationActionId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  ActionName: z.string().min(1).max(128).regex(new RegExp("[a-zA-Z0-9:_-]+"))
    .describe("A unique identifier for the mitigation action.").optional(),
  RoleArn: z.string().optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
  ActionParams: z.object({
    AddThingsToThingGroupParams: AddThingsToThingGroupParamsSchema.describe(
      "Parameters to define a mitigation action that moves devices associated with a certificate to one or more specified thing groups, typically for quarantine.",
    ).optional(),
    EnableIoTLoggingParams: EnableIoTLoggingParamsSchema.describe(
      "Parameters to define a mitigation action that enables AWS IoT logging at a specified level of detail.",
    ).optional(),
    PublishFindingToSnsParams: PublishFindingToSnsParamsSchema.describe(
      "Parameters, to define a mitigation action that publishes findings to Amazon SNS. You can implement your own custom actions in response to the Amazon SNS messages.",
    ).optional(),
    ReplaceDefaultPolicyVersionParams: ReplaceDefaultPolicyVersionParamsSchema
      .describe(
        "Parameters to define a mitigation action that adds a blank policy to restrict permissions.",
      ).optional(),
    UpdateCACertificateParams: UpdateCACertificateParamsSchema.describe(
      "Parameters to define a mitigation action that changes the state of the CA certificate to inactive.",
    ).optional(),
    UpdateDeviceCertificateParams: UpdateDeviceCertificateParamsSchema.describe(
      "Parameters to define a mitigation action that changes the state of the device certificate to inactive.",
    ).optional(),
  }).describe(
    "The set of parameters for this mitigation action. You can specify only one type of parameter (in other words, you can apply only one action for each defined mitigation action).",
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

/** Swamp extension model for IoT MitigationAction. Registered at `@swamp/aws/iot/mitigation-action`. */
export const model = {
  type: "@swamp/aws/iot/mitigation-action",
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
      description: "IoT MitigationAction resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a IoT MitigationAction",
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
          "AWS::IoT::MitigationAction",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.ActionName ?? g.ActionName)?.toString() ?? "current")
            .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a IoT MitigationAction",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoT MitigationAction",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::IoT::MitigationAction",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.ActionName ?? context.globalArgs.ActionName)?.toString() ??
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
      description: "Update a IoT MitigationAction",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.ActionName?.toString() ?? "current").replace(
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
        const identifier = existing.ActionName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::IoT::MitigationAction",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::IoT::MitigationAction",
          identifier,
          currentState,
          desiredState,
          ["ActionName"],
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
      description: "Delete a IoT MitigationAction",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoT MitigationAction",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::IoT::MitigationAction",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.ActionName?.toString() ?? args.identifier)
            .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
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
      description: "Sync IoT MitigationAction state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.ActionName?.toString() ?? "current").replace(
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
        const identifier = existing.ActionName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::IoT::MitigationAction",
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
