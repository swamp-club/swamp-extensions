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

// Auto-generated extension model for @swamp/aws/smsvoice/configuration-set
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SMSVOICE ConfigurationSet (AWS::SMSVOICE::ConfigurationSet).
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

const CloudWatchLogsDestinationSchema = z.object({
  IamRoleArn: z.string().regex(new RegExp("^arn:\\S+$")).describe(
    "The Amazon Resource Name (ARN) of an AWS Identity and Access Management role that is able to write event data to an Amazon CloudWatch destination.",
  ),
  LogGroupArn: z.string().regex(new RegExp("^arn:\\S+$")).describe(
    "The name of the Amazon CloudWatch log group that you want to record events in.",
  ),
});

const KinesisFirehoseDestinationSchema = z.object({
  IamRoleArn: z.string().regex(new RegExp("^arn:\\S+$")).describe(
    "The Amazon Resource Name (ARN) of an AWS Identity and Access Management role that is able to write event data to an Amazon CloudWatch destination.",
  ),
  DeliveryStreamArn: z.string().regex(new RegExp("^arn:\\S+$")).describe(
    "The Amazon Resource Name (ARN) of the delivery stream.",
  ),
});

const SnsDestinationSchema = z.object({
  TopicArn: z.string().regex(new RegExp("^arn:\\S+$")).describe(
    "The Amazon Resource Name (ARN) of the Amazon SNS topic that you want to publish events to.",
  ),
});

const EventDestinationSchema = z.object({
  EventDestinationName: z.string().min(1).max(64).regex(
    new RegExp("^[A-Za-z0-9_-]+$"),
  ).describe("The name that identifies the event destination."),
  Enabled: z.boolean().describe(
    "When set to true events will be logged. By default this is set to true",
  ),
  MatchingEventTypes: z.array(z.string()).describe(
    "An array of event types that determine which events to log. If 'ALL' is used, then AWS End User Messaging SMS and Voice logs every event type.",
  ),
  CloudWatchLogsDestination: CloudWatchLogsDestinationSchema.describe(
    "An object that contains IamRoleArn and LogGroupArn associated with an Amazon CloudWatch event destination.",
  ).optional(),
  KinesisFirehoseDestination: KinesisFirehoseDestinationSchema.describe(
    "An object that contains IamRoleArn and DeliveryStreamArn associated with an Amazon Kinesis Firehose event destination.",
  ).optional(),
  SnsDestination: SnsDestinationSchema.describe(
    "An object that contains SNS TopicArn event destination.",
  ).optional(),
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
  ConfigurationSetName: z.string().min(1).max(64).regex(
    new RegExp("^[A-Za-z0-9_-]+$"),
  ).describe("The name to use for the configuration set.").optional(),
  DefaultSenderId: z.string().regex(new RegExp("^[A-Za-z0-9_-]+$")).describe(
    "The default sender ID to set for the ConfigurationSet.",
  ).optional(),
  MessageFeedbackEnabled: z.boolean().describe(
    "Set to true to enable message feedback.",
  ).optional(),
  ProtectConfigurationId: z.string().min(1).max(256).regex(
    new RegExp("^[A-Za-z0-9_:/-]+$"),
  ).describe(
    "The unique identifier for the protect configuration to be associated to the configuration set.",
  ).optional(),
  EventDestinations: z.array(EventDestinationSchema).describe(
    "An event destination is a location where you send message events.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string().optional(),
  ConfigurationSetName: z.string(),
  DefaultSenderId: z.string().optional(),
  MessageFeedbackEnabled: z.boolean().optional(),
  ProtectConfigurationId: z.string().optional(),
  EventDestinations: z.array(EventDestinationSchema).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  ConfigurationSetName: z.string().min(1).max(64).regex(
    new RegExp("^[A-Za-z0-9_-]+$"),
  ).describe("The name to use for the configuration set.").optional(),
  DefaultSenderId: z.string().regex(new RegExp("^[A-Za-z0-9_-]+$")).describe(
    "The default sender ID to set for the ConfigurationSet.",
  ).optional(),
  MessageFeedbackEnabled: z.boolean().describe(
    "Set to true to enable message feedback.",
  ).optional(),
  ProtectConfigurationId: z.string().min(1).max(256).regex(
    new RegExp("^[A-Za-z0-9_:/-]+$"),
  ).describe(
    "The unique identifier for the protect configuration to be associated to the configuration set.",
  ).optional(),
  EventDestinations: z.array(EventDestinationSchema).describe(
    "An event destination is a location where you send message events.",
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

/** Swamp extension model for SMSVOICE ConfigurationSet. Registered at `@swamp/aws/smsvoice/configuration-set`. */
export const model = {
  type: "@swamp/aws/smsvoice/configuration-set",
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
      description: "SMSVOICE ConfigurationSet resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SMSVOICE ConfigurationSet",
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
          "AWS::SMSVOICE::ConfigurationSet",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.ConfigurationSetName ?? g.ConfigurationSetName)
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
      description: "Get a SMSVOICE ConfigurationSet",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SMSVOICE ConfigurationSet",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::SMSVOICE::ConfigurationSet",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName = ((result.ConfigurationSetName ??
          context.globalArgs.ConfigurationSetName)?.toString() ??
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
      description: "Update a SMSVOICE ConfigurationSet",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.ConfigurationSetName?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.ConfigurationSetName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::SMSVOICE::ConfigurationSet",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::SMSVOICE::ConfigurationSet",
          identifier,
          currentState,
          desiredState,
          ["ConfigurationSetName"],
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
      description: "Delete a SMSVOICE ConfigurationSet",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SMSVOICE ConfigurationSet",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::SMSVOICE::ConfigurationSet",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.ConfigurationSetName?.toString() ??
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
      description: "Sync SMSVOICE ConfigurationSet state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.ConfigurationSetName?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.ConfigurationSetName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SMSVOICE::ConfigurationSet",
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
