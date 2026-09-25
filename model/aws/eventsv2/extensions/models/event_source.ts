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

// Auto-generated extension model for @swamp/aws/eventsv2/event-source
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any no-control-regex

/**
 * Swamp extension model for EventsV2 EventSource (AWS::EventsV2::EventSource).
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

const OnFailureConfigurationSchema = z.object({
  Arn: z.string().min(1).max(1600).regex(
    new RegExp(
      "^arn:aws(-[a-z0-9]+)*:sqs:[a-z][a-z0-9]*(-[a-z0-9]+)*:[0-9]{12}:[A-Za-z0-9_-]{1,80}$",
    ),
  ).describe(
    "The ARN of the Amazon SQS standard queue that receives events that could not be forwarded. FIFO queues are not supported.",
  ).optional(),
});

const AwsServiceEventsConfigurationSchema = z.object({
  AwsService: z.string().min(1).max(256).regex(
    new RegExp("^aws\\.[a-z0-9\\-]+$"),
  ).describe(
    "A single AWS service source identifier, for example aws.s3. Wildcards and lists are not allowed.",
  ),
  Pattern: z.string().max(3753).describe(
    "A filter pattern, as a JSON string, that defines which events from the specified AWS service are forwarded to the event bus. Do not include source, account, or region as top-level fields. If you do not specify a pattern, all events from the service are forwarded.",
  ).optional(),
  OnFailureConfiguration: OnFailureConfigurationSchema.describe(
    "The destination for events that could not be forwarded.",
  ).optional(),
});

const PartnerEventsConfigurationSchema = z.object({
  PartnerEventSourceArn: z.string().min(1).max(1600).regex(
    new RegExp(
      "^arn:aws(-[a-z0-9]+)*:events:[a-z][a-z0-9]*(-[a-z0-9]+)*:([0-9]{12})?:event-source\\/aws\\.partner(\\/[\\.\\-_A-Za-z0-9]+){2,}$",
    ),
  ).describe(
    "The ARN of the partner event source to forward. The partner owns the event source, so the ARN's account segment is empty. Changing this property replaces the event source. Because Name and EventBusArn together identify an event source, and the replacement is created before the old resource is deleted, change Name in the same update.",
  ),
  Pattern: z.string().max(3753).describe(
    "A filter pattern, as a JSON string, that defines which events from the specified partner event source are forwarded to the event bus. If you do not specify a pattern, all events from the partner event source are forwarded.",
  ).optional(),
  PartnerBusKmsKeyIdentifier: z.string().max(2048).regex(
    new RegExp("^[a-zA-Z0-9_\\-/:]*$"),
  ).describe(
    "The identifier of the AWS KMS customer managed key for EventBridge to use, if you choose to use a customer managed key to encrypt events on the managed partner event bus. The identifier can be the key Amazon Resource Name (ARN), KeyId, key alias, or key alias ARN. If you do not specify a customer managed key identifier, EventBridge uses an AWS owned key to encrypt events on the event bus.",
  ).optional(),
  OnFailureConfiguration: OnFailureConfigurationSchema.describe(
    "The destination for events that could not be forwarded, covering both the forwarding target and the managed partner event bus.",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^\\S([\\s\\S]*\\S)?(?![\\s\\S])"),
  ).describe(
    "The tag key. Unique per resource; keys are case sensitive. No leading or trailing whitespace (interior whitespace is allowed).",
  ),
  Value: z.string().min(0).max(256).regex(
    new RegExp("^(\\S([\\s\\S]*\\S)?)?(?![\\s\\S])"),
  ).describe(
    "The tag value. May be empty. No leading or trailing whitespace (interior whitespace is allowed).",
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
  Name: z.string().min(1).max(256).regex(
    new RegExp("^(?!aws\\.)[A-Za-z0-9][\\.\\-_A-Za-z0-9]*$"),
  ).describe(
    "The name of the event source. The first character must be alphanumeric; the remaining characters may also include '.', '-', and '_'. Names cannot begin with the reserved aws. prefix.",
  ),
  EventBusArn: z.string().min(1).max(1011).regex(
    new RegExp(
      "^arn:aws(-[a-z0-9]+)*:events:[a-z][a-z0-9]*(-[a-z0-9]+)*:([0-9]{12}):event-busv2\\/[A-Za-z0-9][\\.\\-_A-Za-z0-9]{0,255}\\/[a-z0-9]{25}$",
    ),
  ).describe("The ARN of the custom event bus the event source forwards onto."),
  Configuration: z.object({
    AwsServiceEventsConfiguration: AwsServiceEventsConfigurationSchema.describe(
      "Configuration for forwarding a single AWS service's events.",
    ).optional(),
    PartnerEventsConfiguration: PartnerEventsConfigurationSchema.describe(
      "Configuration for forwarding a partner event source's events.",
    ).optional(),
  }).describe(
    "The event source configuration. Specify exactly one of AwsServiceEventsConfiguration or PartnerEventsConfiguration.",
  ),
  Description: z.string().max(512).regex(
    new RegExp("^[^\\u0000-\\u001F\\u007F-\\u009F\\u2028\\u2029]*(?![\\s\\S])"),
  ).describe(
    "A description of the event source. Control characters and Unicode line separators are not allowed.",
  ).optional(),
  Tags: z.array(TagSchema).describe("The tags assigned to the event source.")
    .optional(),
});

const StateSchema = z.object({
  EventSourceArn: z.string(),
  Name: z.string().optional(),
  EventBusArn: z.string().optional(),
  Configuration: z.object({
    AwsServiceEventsConfiguration: AwsServiceEventsConfigurationSchema,
    PartnerEventsConfiguration: PartnerEventsConfigurationSchema,
  }).optional(),
  Description: z.string().optional(),
  State: z.string().optional(),
  Revoked: z.boolean().optional(),
  CreationTime: z.string().optional(),
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
  Name: z.string().min(1).max(256).regex(
    new RegExp("^(?!aws\\.)[A-Za-z0-9][\\.\\-_A-Za-z0-9]*$"),
  ).describe(
    "The name of the event source. The first character must be alphanumeric; the remaining characters may also include '.', '-', and '_'. Names cannot begin with the reserved aws. prefix.",
  ).optional(),
  EventBusArn: z.string().min(1).max(1011).regex(
    new RegExp(
      "^arn:aws(-[a-z0-9]+)*:events:[a-z][a-z0-9]*(-[a-z0-9]+)*:([0-9]{12}):event-busv2\\/[A-Za-z0-9][\\.\\-_A-Za-z0-9]{0,255}\\/[a-z0-9]{25}$",
    ),
  ).describe("The ARN of the custom event bus the event source forwards onto.")
    .optional(),
  Configuration: z.object({
    AwsServiceEventsConfiguration: AwsServiceEventsConfigurationSchema.describe(
      "Configuration for forwarding a single AWS service's events.",
    ).optional(),
    PartnerEventsConfiguration: PartnerEventsConfigurationSchema.describe(
      "Configuration for forwarding a partner event source's events.",
    ).optional(),
  }).describe(
    "The event source configuration. Specify exactly one of AwsServiceEventsConfiguration or PartnerEventsConfiguration.",
  ).optional(),
  Description: z.string().max(512).regex(
    new RegExp("^[^\\u0000-\\u001F\\u007F-\\u009F\\u2028\\u2029]*(?![\\s\\S])"),
  ).describe(
    "A description of the event source. Control characters and Unicode line separators are not allowed.",
  ).optional(),
  Tags: z.array(TagSchema).describe("The tags assigned to the event source.")
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

/** Swamp extension model for EventsV2 EventSource. Registered at `@swamp/aws/eventsv2/event-source`. */
export const model = {
  type: "@swamp/aws/eventsv2/event-source",
  version: "2026.09.25.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "EventsV2 EventSource resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EventsV2 EventSource",
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
          "AWS::EventsV2::EventSource",
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
      description: "Get a EventsV2 EventSource",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EventsV2 EventSource",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::EventsV2::EventSource",
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
      description: "Update a EventsV2 EventSource",
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
        const identifier = existing.EventSourceArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::EventsV2::EventSource",
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
          "AWS::EventsV2::EventSource",
          identifier,
          currentState,
          desiredState,
          ["Name", "EventBusArn", "PartnerEventSourceArn"],
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
      description: "Delete a EventsV2 EventSource",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EventsV2 EventSource",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::EventsV2::EventSource",
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
      description: "Sync EventsV2 EventSource state from AWS",
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
        const identifier = existing.EventSourceArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::EventsV2::EventSource",
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
      description: "List EventsV2 EventSource resources",
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
          "AWS::EventsV2::EventSource",
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
            (item.properties?.EventSourceArn?.toString() ?? item.identifier)
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
