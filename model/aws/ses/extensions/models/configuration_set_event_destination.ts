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

// Auto-generated extension model for @swamp/aws/ses/configuration-set-event-destination
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SES ConfigurationSetEventDestination (AWS::SES::ConfigurationSetEventDestination).
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

const DimensionConfigurationSchema = z.object({
  DimensionValueSource: z.string().describe(
    "The place where Amazon SES finds the value of a dimension to publish to Amazon CloudWatch. To use the message tags that you specify using an X-SES-MESSAGE-TAGS header or a parameter to the SendEmail/SendRawEmail API, specify messageTag. To use your own email headers, specify emailHeader. To put a custom tag on any link included in your email, specify linkTag.",
  ),
  DefaultDimensionValue: z.string().min(1).max(256).regex(
    new RegExp("^[a-zA-Z0-9_-]{1,256}$"),
  ).describe(
    "The default value of the dimension that is published to Amazon CloudWatch if you do not provide the value of the dimension when you send an email.",
  ),
  DimensionName: z.string().min(1).max(256).regex(
    new RegExp("^[a-zA-Z0-9_:-]{1,256}$"),
  ).describe(
    "The name of an Amazon CloudWatch dimension associated with an email sending metric.",
  ),
});

const CloudWatchDestinationSchema = z.object({
  DimensionConfigurations: z.array(DimensionConfigurationSchema).describe(
    "A list of dimensions upon which to categorize your emails when you publish email sending events to Amazon CloudWatch.",
  ).optional(),
});

const KinesisFirehoseDestinationSchema = z.object({
  IAMRoleARN: z.string().describe(
    "The ARN of the IAM role under which Amazon SES publishes email sending events to the Amazon Kinesis Firehose stream.",
  ),
  DeliveryStreamARN: z.string().describe(
    "The ARN of the Amazon Kinesis Firehose stream that email sending events should be published to.",
  ),
});

const SnsDestinationSchema = z.object({
  TopicARN: z.string().min(36).max(1024).regex(
    new RegExp("^arn:aws[a-z0-9-]*:sns:[a-z0-9-]+:\\d{12}:[^:]+$"),
  ),
});

const EventBridgeDestinationSchema = z.object({
  EventBusArn: z.string().min(36).max(1024).regex(
    new RegExp("^arn:aws[a-z0-9-]*:events:[a-z0-9-]+:\\d{12}:event-bus/[^:]+$"),
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
  ConfigurationSetName: z.string().describe(
    "The name of the configuration set that contains the event destination.",
  ),
  EventDestination: z.object({
    Name: z.string().regex(new RegExp("^[a-zA-Z0-9_-]{0,64}$")).describe(
      "The name of the event destination set.",
    ).optional(),
    Enabled: z.boolean().describe(
      "Sets whether Amazon SES publishes events to this destination when you send an email with the associated configuration set. Set to true to enable publishing to this destination; set to false to prevent publishing to this destination. The default value is false.",
    ).optional(),
    MatchingEventTypes: z.array(z.string()).describe(
      "The type of email sending events, send, reject, bounce, complaint, delivery, open, click, renderingFailure, deliveryDelay, and subscription.",
    ),
    CloudWatchDestination: CloudWatchDestinationSchema.describe(
      "An object that contains the names, default values, and sources of the dimensions associated with an Amazon CloudWatch event destination.",
    ).optional(),
    KinesisFirehoseDestination: KinesisFirehoseDestinationSchema.describe(
      "An object that contains the delivery stream ARN and the IAM role ARN associated with an Amazon Kinesis Firehose event destination.",
    ).optional(),
    SnsDestination: SnsDestinationSchema.describe(
      "An object that contains SNS topic ARN associated event destination.",
    ).optional(),
    EventBridgeDestination: EventBridgeDestinationSchema.describe(
      "An object that contains Event bus ARN associated with the event bridge destination.",
    ).optional(),
  }).describe("The event destination object."),
});

const StateSchema = z.object({
  Id: z.string(),
  ConfigurationSetName: z.string().optional(),
  EventDestination: z.object({
    Name: z.string(),
    Enabled: z.boolean(),
    MatchingEventTypes: z.array(z.string()),
    CloudWatchDestination: CloudWatchDestinationSchema,
    KinesisFirehoseDestination: KinesisFirehoseDestinationSchema,
    SnsDestination: SnsDestinationSchema,
    EventBridgeDestination: EventBridgeDestinationSchema,
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  ConfigurationSetName: z.string().describe(
    "The name of the configuration set that contains the event destination.",
  ).optional(),
  EventDestination: z.object({
    Name: z.string().regex(new RegExp("^[a-zA-Z0-9_-]{0,64}$")).describe(
      "The name of the event destination set.",
    ).optional(),
    Enabled: z.boolean().describe(
      "Sets whether Amazon SES publishes events to this destination when you send an email with the associated configuration set. Set to true to enable publishing to this destination; set to false to prevent publishing to this destination. The default value is false.",
    ).optional(),
    MatchingEventTypes: z.array(z.string()).describe(
      "The type of email sending events, send, reject, bounce, complaint, delivery, open, click, renderingFailure, deliveryDelay, and subscription.",
    ).optional(),
    CloudWatchDestination: CloudWatchDestinationSchema.describe(
      "An object that contains the names, default values, and sources of the dimensions associated with an Amazon CloudWatch event destination.",
    ).optional(),
    KinesisFirehoseDestination: KinesisFirehoseDestinationSchema.describe(
      "An object that contains the delivery stream ARN and the IAM role ARN associated with an Amazon Kinesis Firehose event destination.",
    ).optional(),
    SnsDestination: SnsDestinationSchema.describe(
      "An object that contains SNS topic ARN associated event destination.",
    ).optional(),
    EventBridgeDestination: EventBridgeDestinationSchema.describe(
      "An object that contains Event bus ARN associated with the event bridge destination.",
    ).optional(),
  }).describe("The event destination object.").optional(),
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

/** Swamp extension model for SES ConfigurationSetEventDestination. Registered at `@swamp/aws/ses/configuration-set-event-destination`. */
export const model = {
  type: "@swamp/aws/ses/configuration-set-event-destination",
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
      description: "SES ConfigurationSetEventDestination resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SES ConfigurationSetEventDestination",
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
          "AWS::SES::ConfigurationSetEventDestination",
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
      description: "Get a SES ConfigurationSetEventDestination",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SES ConfigurationSetEventDestination",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::SES::ConfigurationSetEventDestination",
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
      description: "Update a SES ConfigurationSetEventDestination",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::SES::ConfigurationSetEventDestination",
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
          "AWS::SES::ConfigurationSetEventDestination",
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
      description: "Delete a SES ConfigurationSetEventDestination",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SES ConfigurationSetEventDestination",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::SES::ConfigurationSetEventDestination",
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
      description: "Sync SES ConfigurationSetEventDestination state from AWS",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SES::ConfigurationSetEventDestination",
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
