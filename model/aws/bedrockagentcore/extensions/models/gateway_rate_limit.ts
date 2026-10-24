// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/aws/bedrockagentcore/gateway-rate-limit
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for BedrockAgentCore GatewayRateLimit (AWS::BedrockAgentCore::GatewayRateLimit).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, sync, and list can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";

const RateConfigSchema = z.object({
  Rate: z.number().min(0).max(10000000),
  Period: z.enum(["second", "minute"]).describe(
    "Time period for rate limiting",
  ),
});

const LimitEntrySchema = z.object({
  Dimensions: z.record(z.string(), z.string().min(1).max(256)).describe(
    "Map of dimension name to dimension value for a rule entry",
  ),
  Requests: z.array(RateConfigSchema).describe(
    "Request rate limits (RPS or RPM). Limited to 1 entry for now.",
  ).optional(),
  Tokens: z.array(RateConfigSchema).describe(
    "Token rate limits (TPM). Limited to 1 entry for now. — P1",
  ).optional(),
  Connections: z.array(RateConfigSchema).describe(
    "Connection rate limits (per second only). Limited to 1 entry for now. — P2",
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
    "AWS region; overrides AWS_REGION / AWS_DEFAULT_REGION environment variables and ~/.aws/config profile region. Defaults to us-east-1.",
  ).optional(),
  Description: z.string().min(0).max(512).describe(
    "Optional human-readable description for this limit.",
  ).optional(),
  DimensionKeys: z.array(
    z.string().min(1).max(80).regex(
      new RegExp(
        "^(targetName|toolName|qualifiedModelId|\\$\\.context\\.iam\\.principal|\\$\\.context\\.iam\\.sourceIdentity|\\$\\.context\\.jwt\\.[a-zA-Z_][a-zA-Z0-9_\\-\\.]{0,61}[a-zA-Z0-9_])$",
      ),
    ),
  ).describe(
    "Ordered list of dimension names defining the scope of this limit. Unique per gateway — no two limits can share the same dimensionKeys.",
  ),
  Entries: z.array(LimitEntrySchema).describe(
    "Rule entries mapping dimension values to rate configurations.",
  ),
  GatewayIdentifier: z.string().regex(
    new RegExp("^([0-9a-z][-]?){1,100}-[0-9a-z]{10}$"),
  ).optional(),
  RateLimitId: z.string().min(2).max(64).regex(
    new RegExp("^[a-zA-Z0-9][a-zA-Z0-9\\-_\\.]{0,62}[a-zA-Z0-9]$"),
  ).describe(
    "Limit identifier. Optional on Create (system-generates if not provided by customer). Always present in responses.",
  ).optional(),
});

const StateSchema = z.object({
  CreatedAt: z.string().optional(),
  Description: z.string().optional(),
  DimensionKeys: z.array(z.string()).optional(),
  Entries: z.array(LimitEntrySchema).optional(),
  GatewayIdentifier: z.string(),
  RateLimitId: z.string(),
  Status: z.string().optional(),
  UpdatedAt: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Description: z.string().min(0).max(512).describe(
    "Optional human-readable description for this limit.",
  ).optional(),
  DimensionKeys: z.array(
    z.string().min(1).max(80).regex(
      new RegExp(
        "^(targetName|toolName|qualifiedModelId|\\$\\.context\\.iam\\.principal|\\$\\.context\\.iam\\.sourceIdentity|\\$\\.context\\.jwt\\.[a-zA-Z_][a-zA-Z0-9_\\-\\.]{0,61}[a-zA-Z0-9_])$",
      ),
    ),
  ).describe(
    "Ordered list of dimension names defining the scope of this limit. Unique per gateway — no two limits can share the same dimensionKeys.",
  ).optional(),
  Entries: z.array(LimitEntrySchema).describe(
    "Rule entries mapping dimension values to rate configurations.",
  ).optional(),
  GatewayIdentifier: z.string().regex(
    new RegExp("^([0-9a-z][-]?){1,100}-[0-9a-z]{10}$"),
  ).optional(),
  RateLimitId: z.string().min(2).max(64).regex(
    new RegExp("^[a-zA-Z0-9][a-zA-Z0-9\\-_\\.]{0,62}[a-zA-Z0-9]$"),
  ).describe(
    "Limit identifier. Optional on Create (system-generates if not provided by customer). Always present in responses.",
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

/** Swamp extension model for BedrockAgentCore GatewayRateLimit. Registered at `@swamp/aws/bedrockagentcore/gateway-rate-limit`. */
export const model = {
  type: "@swamp/aws/bedrockagentcore/gateway-rate-limit",
  version: "2026.10.23.1",
  upgrades: [
    {
      toVersion: "2026.08.17.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.17.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "BedrockAgentCore GatewayRateLimit resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a BedrockAgentCore GatewayRateLimit",
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
          "AWS::BedrockAgentCore::GatewayRateLimit",
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
      description: "Get a BedrockAgentCore GatewayRateLimit",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the BedrockAgentCore GatewayRateLimit",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::BedrockAgentCore::GatewayRateLimit",
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
      description: "Update a BedrockAgentCore GatewayRateLimit",
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
          existing.GatewayIdentifier?.toString(),
          existing.RateLimitId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::BedrockAgentCore::GatewayRateLimit",
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
          "AWS::BedrockAgentCore::GatewayRateLimit",
          identifier,
          currentState,
          desiredState,
          ["DimensionKeys", "GatewayIdentifier", "RateLimitId"],
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
      description: "Delete a BedrockAgentCore GatewayRateLimit",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the BedrockAgentCore GatewayRateLimit",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::BedrockAgentCore::GatewayRateLimit",
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
      description: "Sync BedrockAgentCore GatewayRateLimit state from AWS",
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
          existing.GatewayIdentifier?.toString(),
          existing.RateLimitId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::BedrockAgentCore::GatewayRateLimit",
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
      description: "List BedrockAgentCore GatewayRateLimit resources",
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
          "AWS::BedrockAgentCore::GatewayRateLimit",
          {
            resourceModel: args.resourceModel,
            maxPages: args.maxPages,
            credentials,
          },
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const instanceName = item.identifier.replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, "");
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
