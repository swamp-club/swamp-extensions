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

// Auto-generated extension model for @swamp/aws/wafv2/logging-configuration
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for WAFv2 LoggingConfiguration (AWS::WAFv2::LoggingConfiguration).
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

const FieldToMatchSchema = z.object({
  Method: z.record(z.string(), z.unknown()).describe(
    "Inspect the HTTP method. The method indicates the type of operation that the request is asking the origin to perform.",
  ).optional(),
  QueryString: z.record(z.string(), z.unknown()).describe(
    "Inspect the query string. This is the part of a URL that appears after a? character, if any.",
  ).optional(),
  SingleHeader: z.object({
    Name: z.string().describe("The name of the query header to inspect."),
  }).describe(
    "Inspect a single header. Provide the name of the header to inspect, for example, User-Agent or Referer. This setting isn't case sensitive.",
  ).optional(),
  UriPath: z.record(z.string(), z.unknown()).describe(
    "Inspect the request URI path. This is the part of a web request that identifies a resource, for example, /images/daily-ad.jpg.",
  ).optional(),
});

const ConditionSchema = z.object({
  ActionCondition: z.object({
    Action: z.enum([
      "ALLOW",
      "BLOCK",
      "COUNT",
      "CAPTCHA",
      "CHALLENGE",
      "EXCLUDED_AS_COUNT",
    ]).describe(
      "Logic to apply to the filtering conditions. You can specify that, in order to satisfy the filter, a log must match all conditions or must match at least one condition.",
    ),
  }).describe("A single action condition.").optional(),
  LabelNameCondition: z.object({
    LabelName: z.string().describe(
      "The label name that a log record must contain in order to meet the condition. This must be a fully qualified label name. Fully qualified labels have a prefix, optional namespaces, and label name. The prefix identifies the rule group or web ACL context of the rule that added the label.",
    ),
  }).describe("A single label name condition.").optional(),
});

const FilterSchema = z.object({
  Behavior: z.enum(["KEEP", "DROP"]).describe(
    "How to handle logs that satisfy the filter's conditions and requirement.",
  ),
  Conditions: z.array(ConditionSchema).describe(
    "Match conditions for the filter.",
  ),
  Requirement: z.enum(["MEETS_ALL", "MEETS_ANY"]).describe(
    "Logic to apply to the filtering conditions. You can specify that, in order to satisfy the filter, a log must match all conditions or must match at least one condition.",
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
    "AWS region; overrides AWS_REGION environment variable. Defaults to us-east-1.",
  ).optional(),
  ResourceArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the web ACL that you want to associate with LogDestinationConfigs.",
  ),
  LogDestinationConfigs: z.array(z.string()).describe(
    "The Amazon Resource Names (ARNs) of the logging destinations that you want to associate with the web ACL.",
  ),
  RedactedFields: z.array(FieldToMatchSchema).describe(
    "The parts of the request that you want to keep out of the logs. For example, if you redact the HEADER field, the HEADER field in the firehose will be xxx.",
  ).optional(),
  LoggingFilter: z.object({
    DefaultBehavior: z.enum(["KEEP", "DROP"]).describe(
      "Default handling for logs that don't match any of the specified filtering conditions.",
    ),
    Filters: z.array(FilterSchema).describe(
      "The filters that you want to apply to the logs.",
    ),
  }).describe(
    "Filtering that specifies which web requests are kept in the logs and which are dropped. You can filter on the rule action and on the web request labels that were applied by matching rules during web ACL evaluation.",
  ).optional(),
});

const StateSchema = z.object({
  ResourceArn: z.string(),
  LogDestinationConfigs: z.array(z.string()).optional(),
  RedactedFields: z.array(FieldToMatchSchema).optional(),
  ManagedByFirewallManager: z.boolean().optional(),
  LoggingFilter: z.object({
    DefaultBehavior: z.string(),
    Filters: z.array(FilterSchema),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  ResourceArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the web ACL that you want to associate with LogDestinationConfigs.",
  ).optional(),
  LogDestinationConfigs: z.array(z.string()).describe(
    "The Amazon Resource Names (ARNs) of the logging destinations that you want to associate with the web ACL.",
  ).optional(),
  RedactedFields: z.array(FieldToMatchSchema).describe(
    "The parts of the request that you want to keep out of the logs. For example, if you redact the HEADER field, the HEADER field in the firehose will be xxx.",
  ).optional(),
  LoggingFilter: z.object({
    DefaultBehavior: z.enum(["KEEP", "DROP"]).describe(
      "Default handling for logs that don't match any of the specified filtering conditions.",
    ).optional(),
    Filters: z.array(FilterSchema).describe(
      "The filters that you want to apply to the logs.",
    ).optional(),
  }).describe(
    "Filtering that specifies which web requests are kept in the logs and which are dropped. You can filter on the rule action and on the web request labels that were applied by matching rules during web ACL evaluation.",
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

/** Swamp extension model for WAFv2 LoggingConfiguration. Registered at `@swamp/aws/wafv2/logging-configuration`. */
export const model = {
  type: "@swamp/aws/wafv2/logging-configuration",
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
      description: "WAFv2 LoggingConfiguration resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a WAFv2 LoggingConfiguration",
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
          "AWS::WAFv2::LoggingConfiguration",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.ResourceArn ?? g.ResourceArn)?.toString() ?? "current")
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
      description: "Get a WAFv2 LoggingConfiguration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the WAFv2 LoggingConfiguration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::WAFv2::LoggingConfiguration",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.ResourceArn ?? context.globalArgs.ResourceArn)?.toString() ??
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
      description: "Update a WAFv2 LoggingConfiguration",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.ResourceArn?.toString() ?? "current").replace(
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
        const identifier = existing.ResourceArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::WAFv2::LoggingConfiguration",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::WAFv2::LoggingConfiguration",
          identifier,
          currentState,
          desiredState,
          ["ResourceArn"],
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
      description: "Delete a WAFv2 LoggingConfiguration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the WAFv2 LoggingConfiguration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::WAFv2::LoggingConfiguration",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.ResourceArn?.toString() ?? args.identifier)
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
      description: "Sync WAFv2 LoggingConfiguration state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.ResourceArn?.toString() ?? "current").replace(
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
        const identifier = existing.ResourceArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::WAFv2::LoggingConfiguration",
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
