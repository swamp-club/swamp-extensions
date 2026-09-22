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

// Auto-generated extension model for @swamp/aws/wellarchitected/agent-profile
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for WellArchitected AgentProfile (AWS::WellArchitected::AgentProfile).
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

const AggregationConfigurationSchema = z.object({
  AccountId: z.string().min(12).max(12).regex(new RegExp("^[0-9]{12}$"))
    .describe("The target AWS account ID."),
  Regions: z.array(
    z.string().max(64).regex(new RegExp("^[a-z]{2}-[a-z]+-[0-9]{1}$")),
  ).describe("The target regions in the account."),
  AccessRoleArn: z.string().min(1).max(2048).regex(
    new RegExp(
      "^arn:([a-z\\-]+):iam::[0-9]{12}:role/(service-role/)?[a-zA-Z0-9+=,.@\\-_]+$",
    ),
  ).describe(
    "The ARN of the IAM role used to access resources in this account.",
  ),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe("The tag key."),
  Value: z.string().min(0).max(256).describe("The tag value."),
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
  Name: z.string().min(3).max(128).regex(new RegExp("^[a-zA-Z0-9_-]+$"))
    .describe(
      "The name of the profile. Unique within the account and used as the last component of the ARN.",
    ),
  DisplayName: z.string().min(3).max(128).describe(
    "The human-readable display name of the profile.",
  ).optional(),
  Description: z.string().max(512).describe("A description of the profile.")
    .optional(),
  BusinessOverview: z.string().max(512).describe(
    "A business overview for the profile used to improve recommendation quality.",
  ).optional(),
  ExecutionRoleArn: z.string().min(1).max(2048).regex(
    new RegExp(
      "^arn:([a-z\\-]+):iam::[0-9]{12}:role/(service-role/)?[a-zA-Z0-9+=,.@\\-_]+$",
    ),
  ).describe(
    "The ARN of the IAM role assumed to execute recommendation actions.",
  ),
  Pillars: z.array(
    z.enum(["COST_OPTIMIZATION", "SECURITY", "RESILIENCE", "PERFORMANCE"]),
  ).describe("The list of Well-Architected pillars to focus on."),
  AggregationConfiguration: z.array(AggregationConfigurationSchema).describe(
    "The aggregation configuration entries (account, regions, access role) associated with this profile.",
  ),
  DeletionProtection: z.boolean().describe(
    "Whether deletion protection is enabled for the profile. When enabled, the profile cannot be deleted until deletion protection is disabled.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "Key-value pairs to associate with the Agent Profile.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  Name: z.string().optional(),
  DisplayName: z.string().optional(),
  Description: z.string().optional(),
  BusinessOverview: z.string().optional(),
  ExecutionRoleArn: z.string().optional(),
  Pillars: z.array(z.string()).optional(),
  AggregationConfiguration: z.array(AggregationConfigurationSchema).optional(),
  DeletionProtection: z.boolean().optional(),
  Tags: z.array(TagSchema).optional(),
  CreatedBy: z.string().optional(),
  CreatedAt: z.string().optional(),
  LastModifiedBy: z.string().optional(),
  LastModifiedAt: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().min(3).max(128).regex(new RegExp("^[a-zA-Z0-9_-]+$"))
    .describe(
      "The name of the profile. Unique within the account and used as the last component of the ARN.",
    ).optional(),
  DisplayName: z.string().min(3).max(128).describe(
    "The human-readable display name of the profile.",
  ).optional(),
  Description: z.string().max(512).describe("A description of the profile.")
    .optional(),
  BusinessOverview: z.string().max(512).describe(
    "A business overview for the profile used to improve recommendation quality.",
  ).optional(),
  ExecutionRoleArn: z.string().min(1).max(2048).regex(
    new RegExp(
      "^arn:([a-z\\-]+):iam::[0-9]{12}:role/(service-role/)?[a-zA-Z0-9+=,.@\\-_]+$",
    ),
  ).describe(
    "The ARN of the IAM role assumed to execute recommendation actions.",
  ).optional(),
  Pillars: z.array(
    z.enum(["COST_OPTIMIZATION", "SECURITY", "RESILIENCE", "PERFORMANCE"]),
  ).describe("The list of Well-Architected pillars to focus on.").optional(),
  AggregationConfiguration: z.array(AggregationConfigurationSchema).describe(
    "The aggregation configuration entries (account, regions, access role) associated with this profile.",
  ).optional(),
  DeletionProtection: z.boolean().describe(
    "Whether deletion protection is enabled for the profile. When enabled, the profile cannot be deleted until deletion protection is disabled.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "Key-value pairs to associate with the Agent Profile.",
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

/** Swamp extension model for WellArchitected AgentProfile. Registered at `@swamp/aws/wellarchitected/agent-profile`. */
export const model = {
  type: "@swamp/aws/wellarchitected/agent-profile",
  version: "2026.09.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "WellArchitected AgentProfile resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a WellArchitected AgentProfile",
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
          "AWS::WellArchitected::AgentProfile",
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
      description: "Get a WellArchitected AgentProfile",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the WellArchitected AgentProfile",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::WellArchitected::AgentProfile",
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
      description: "Update a WellArchitected AgentProfile",
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
          "AWS::WellArchitected::AgentProfile",
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
          "AWS::WellArchitected::AgentProfile",
          identifier,
          currentState,
          desiredState,
          ["Name"],
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
      description: "Delete a WellArchitected AgentProfile",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the WellArchitected AgentProfile",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::WellArchitected::AgentProfile",
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
      description: "Sync WellArchitected AgentProfile state from AWS",
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
            "AWS::WellArchitected::AgentProfile",
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
      description: "List WellArchitected AgentProfile resources",
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
          "AWS::WellArchitected::AgentProfile",
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
            (item.properties?.Arn?.toString() ?? item.identifier).replace(
              /[\/\\]/g,
              "_",
            ).replace(/\.\./g, "_").replace(/\0/g, "");
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
