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

// Auto-generated extension model for @swamp/aws/smsvoice/rcs-agent
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SMSVOICE RcsAgent (AWS::SMSVOICE::RcsAgent).
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

const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(new RegExp("^.+$")).describe(
    "The key of the tag.",
  ),
  Value: z.string().max(256).regex(new RegExp("^.*$")).describe(
    "The value of the tag.",
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
  DeletionProtectionEnabled: z.boolean().describe(
    "When set to true the RCS agent can't be deleted. By default this is false.",
  ).optional(),
  OptOutListName: z.string().min(1).max(64).regex(
    new RegExp("^[A-Za-z0-9_-]+$"),
  ).describe("The name of the opt-out list associated with the RCS agent.")
    .optional(),
  SelfManagedOptOutsEnabled: z.boolean().describe(
    "When set to true you're responsible for responding to HELP and STOP requests, and for tracking and honoring opt-out requests. By default this is false.",
  ).optional(),
  TwoWayEnabled: z.boolean().describe(
    "When set to true two-way messaging is enabled for the RCS agent.",
  ).optional(),
  TwoWayChannelArn: z.string().min(20).max(2048).regex(new RegExp("^\\S+$"))
    .describe(
      "The Amazon Resource Name (ARN) of the two way channel where inbound messages are delivered.",
    ).optional(),
  TwoWayChannelRole: z.string().min(20).max(2048).regex(
    new RegExp("^arn:\\S+$"),
  ).describe(
    "The Amazon Resource Name (ARN) of an IAM role for the service to assume in order to post inbound messages to the two way channel.",
  ).optional(),
  TwoWayMediaS3BucketName: z.string().min(3).max(63).regex(
    new RegExp("^[a-z0-9][a-z0-9.-]*[a-z0-9]$"),
  ).describe(
    "The name of the Amazon S3 bucket where inbound RCS media objects are written.",
  ).optional(),
  TwoWayMediaS3KeyPrefix: z.string().min(1).max(1024).regex(
    new RegExp("^[\\S]+$"),
  ).describe(
    "The key prefix used for inbound RCS media objects in the Amazon S3 bucket.",
  ).optional(),
  TwoWayMediaS3Role: z.string().min(20).max(2048).regex(
    new RegExp("^arn:\\S+$"),
  ).describe(
    "The Amazon Resource Name (ARN) of the IAM role used to write inbound RCS media files to the Amazon S3 bucket. The role must have s3:PutObject permission on the bucket and a trust policy allowing sms-voice.amazonaws.com to assume it.",
  ).optional(),
  TwoWayRcsEventsEnabled: z.array(z.string().min(1).max(50)).describe(
    "The list of RCS event types enabled for two-way messaging. An empty list disables all event types. The special value ALL enables all current and future event types and must be the only element if used. Requires TwoWayEnabled to be true.",
  ).optional(),
  TestingAgent: z.object({
    TestingAgentStatus: z.enum(["CREATED", "PENDING", "ACTIVE"]).describe(
      "The status of the testing agent. Named distinctly from the resource-level Status property, which has its own larger set of values.",
    ),
    TestingAgentId: z.string().describe(
      "The identifier of the testing agent assigned by the RCS infrastructure provider.",
    ).optional(),
    RegistrationId: z.string().describe(
      "The unique identifier of the testing registration that created the testing agent.",
    ),
  }).describe(
    "Information about the testing agent (RCS for Business ID) associated with the RCS agent. A testing agent is created by submitting a testing registration, and allows sending to registered test devices without carrier approval.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to the RCS agent.",
  ).optional(),
});

const StateSchema = z.object({
  RcsAgentArn: z.string(),
  RcsAgentId: z.string().optional(),
  Status: z.string().optional(),
  CreatedTimestamp: z.string().optional(),
  DeletionProtectionEnabled: z.boolean().optional(),
  OptOutListName: z.string().optional(),
  SelfManagedOptOutsEnabled: z.boolean().optional(),
  TwoWayEnabled: z.boolean().optional(),
  TwoWayChannelArn: z.string().optional(),
  TwoWayChannelRole: z.string().optional(),
  TwoWayMediaS3BucketName: z.string().optional(),
  TwoWayMediaS3KeyPrefix: z.string().optional(),
  TwoWayMediaS3Role: z.string().optional(),
  TwoWayRcsEventsEnabled: z.array(z.string()).optional(),
  PoolId: z.string().optional(),
  TestingAgent: z.object({
    TestingAgentStatus: z.string(),
    TestingAgentId: z.string(),
    RegistrationId: z.string(),
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
  DeletionProtectionEnabled: z.boolean().describe(
    "When set to true the RCS agent can't be deleted. By default this is false.",
  ).optional(),
  OptOutListName: z.string().min(1).max(64).regex(
    new RegExp("^[A-Za-z0-9_-]+$"),
  ).describe("The name of the opt-out list associated with the RCS agent.")
    .optional(),
  SelfManagedOptOutsEnabled: z.boolean().describe(
    "When set to true you're responsible for responding to HELP and STOP requests, and for tracking and honoring opt-out requests. By default this is false.",
  ).optional(),
  TwoWayEnabled: z.boolean().describe(
    "When set to true two-way messaging is enabled for the RCS agent.",
  ).optional(),
  TwoWayChannelArn: z.string().min(20).max(2048).regex(new RegExp("^\\S+$"))
    .describe(
      "The Amazon Resource Name (ARN) of the two way channel where inbound messages are delivered.",
    ).optional(),
  TwoWayChannelRole: z.string().min(20).max(2048).regex(
    new RegExp("^arn:\\S+$"),
  ).describe(
    "The Amazon Resource Name (ARN) of an IAM role for the service to assume in order to post inbound messages to the two way channel.",
  ).optional(),
  TwoWayMediaS3BucketName: z.string().min(3).max(63).regex(
    new RegExp("^[a-z0-9][a-z0-9.-]*[a-z0-9]$"),
  ).describe(
    "The name of the Amazon S3 bucket where inbound RCS media objects are written.",
  ).optional(),
  TwoWayMediaS3KeyPrefix: z.string().min(1).max(1024).regex(
    new RegExp("^[\\S]+$"),
  ).describe(
    "The key prefix used for inbound RCS media objects in the Amazon S3 bucket.",
  ).optional(),
  TwoWayMediaS3Role: z.string().min(20).max(2048).regex(
    new RegExp("^arn:\\S+$"),
  ).describe(
    "The Amazon Resource Name (ARN) of the IAM role used to write inbound RCS media files to the Amazon S3 bucket. The role must have s3:PutObject permission on the bucket and a trust policy allowing sms-voice.amazonaws.com to assume it.",
  ).optional(),
  TwoWayRcsEventsEnabled: z.array(z.string().min(1).max(50)).describe(
    "The list of RCS event types enabled for two-way messaging. An empty list disables all event types. The special value ALL enables all current and future event types and must be the only element if used. Requires TwoWayEnabled to be true.",
  ).optional(),
  TestingAgent: z.object({
    TestingAgentStatus: z.enum(["CREATED", "PENDING", "ACTIVE"]).describe(
      "The status of the testing agent. Named distinctly from the resource-level Status property, which has its own larger set of values.",
    ).optional(),
    TestingAgentId: z.string().describe(
      "The identifier of the testing agent assigned by the RCS infrastructure provider.",
    ).optional(),
    RegistrationId: z.string().describe(
      "The unique identifier of the testing registration that created the testing agent.",
    ).optional(),
  }).describe(
    "Information about the testing agent (RCS for Business ID) associated with the RCS agent. A testing agent is created by submitting a testing registration, and allows sending to registered test devices without carrier approval.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to the RCS agent.",
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

/** Swamp extension model for SMSVOICE RcsAgent. Registered at `@swamp/aws/smsvoice/rcs-agent`. */
export const model = {
  type: "@swamp/aws/smsvoice/rcs-agent",
  version: "2026.10.06.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "SMSVOICE RcsAgent resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SMSVOICE RcsAgent",
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
          "AWS::SMSVOICE::RcsAgent",
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
      description: "Get a SMSVOICE RcsAgent",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SMSVOICE RcsAgent",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::SMSVOICE::RcsAgent",
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
      description: "Update a SMSVOICE RcsAgent",
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
        const identifier = existing.RcsAgentArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::SMSVOICE::RcsAgent",
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
          "AWS::SMSVOICE::RcsAgent",
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
      description: "Delete a SMSVOICE RcsAgent",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SMSVOICE RcsAgent",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::SMSVOICE::RcsAgent",
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
      description: "Sync SMSVOICE RcsAgent state from AWS",
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
        const identifier = existing.RcsAgentArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SMSVOICE::RcsAgent",
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
      description: "List SMSVOICE RcsAgent resources",
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
          "AWS::SMSVOICE::RcsAgent",
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
            (item.properties?.RcsAgentArn?.toString() ?? item.identifier)
              .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
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
