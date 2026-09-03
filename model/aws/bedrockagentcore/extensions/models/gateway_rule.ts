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

// Auto-generated extension model for @swamp/aws/bedrockagentcore/gateway-rule
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for BedrockAgentCore GatewayRule (AWS::BedrockAgentCore::GatewayRule).
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

const StaticOverrideSchema = z.object({
  BundleArn: z.string().regex(
    new RegExp(
      "^arn:aws[a-zA-Z-]*:bedrock-agentcore:[a-z0-9-]+:[0-9]{12}:configuration-bundle/[a-zA-Z][a-zA-Z0-9-_]{0,99}-[a-zA-Z0-9]{10}$",
    ),
  ),
  BundleVersion: z.string().regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$",
    ),
  ),
});

const ConfigurationBundleReferenceSchema = z.object({
  BundleArn: z.string().regex(
    new RegExp(
      "^arn:aws[a-zA-Z-]*:bedrock-agentcore:[a-z0-9-]+:[0-9]{12}:configuration-bundle/[a-zA-Z][a-zA-Z0-9-_]{0,99}-[a-zA-Z0-9]{10}$",
    ),
  ),
  BundleVersion: z.string().regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$",
    ),
  ),
});

const TrafficSplitEntrySchema = z.object({
  Name: z.string().min(1).max(64).regex(
    new RegExp("^[a-zA-Z0-9]([a-zA-Z0-9-]{0,62}[a-zA-Z0-9])?$"),
  ),
  Weight: z.number().min(1).max(99),
  ConfigurationBundle: ConfigurationBundleReferenceSchema,
  Description: z.string().min(1).max(200).optional(),
  Metadata: z.record(z.string(), z.string().min(1).max(256)).optional(),
});

const WeightedOverrideSchema = z.object({
  TrafficSplit: z.array(TrafficSplitEntrySchema),
});

const StaticRouteSchema = z.object({
  TargetName: z.string().regex(new RegExp("^([0-9a-zA-Z][-]?){1,100}$")),
});

const TargetTrafficSplitEntrySchema = z.object({
  Name: z.string().min(1).max(64).regex(
    new RegExp("^[a-zA-Z0-9]([a-zA-Z0-9-]{0,62}[a-zA-Z0-9])?$"),
  ),
  Weight: z.number().min(1).max(99),
  TargetName: z.string().regex(new RegExp("^([0-9a-zA-Z][-]?){1,100}$")),
  Description: z.string().min(1).max(200).optional(),
  Metadata: z.record(z.string(), z.string().min(1).max(256)).optional(),
});

const WeightedRouteSchema = z.object({
  TrafficSplit: z.array(TargetTrafficSplitEntrySchema),
});

const IamPrincipalSchema = z.object({
  Arn: z.string().max(2048).regex(
    new RegExp(
      "^(arn:aws[a-zA-Z-]*:iam::(\\d{12}|\\*):(user|role)/[\\w+=,.@*?/-]+|arn:aws[a-zA-Z-]*:sts::(\\d{12}|\\*):assumed-role/[\\w+=,.@*?/-]+)$",
    ),
  ),
  Operator: z.enum(["StringEquals", "StringLike"]).optional(),
});

const MatchPrincipalsSchema = z.object({
  AnyOf: z.array(z.object({
    IamPrincipal: IamPrincipalSchema.optional(),
  })),
});

const MatchPathsSchema = z.object({
  AnyOf: z.array(z.string().max(512).regex(new RegExp("^/[\\w\\-.]+/\\*$"))),
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
  Actions: z.array(z.object({
    ConfigurationBundle: z.object({
      StaticOverride: StaticOverrideSchema.optional(),
      WeightedOverride: WeightedOverrideSchema.optional(),
    }).optional(),
    RouteToTarget: z.object({
      StaticRoute: StaticRouteSchema.optional(),
      WeightedRoute: WeightedRouteSchema.optional(),
    }).optional(),
  })),
  Conditions: z.array(z.object({
    MatchPrincipals: MatchPrincipalsSchema.optional(),
    MatchPaths: MatchPathsSchema.optional(),
  })).optional(),
  Description: z.string().min(1).max(256).optional(),
  GatewayIdentifier: z.string().regex(
    new RegExp("^([0-9a-z][-]?){1,100}-[0-9a-z]{10}$"),
  ).optional(),
  Priority: z.number().min(1).max(1000000),
  System: z.object({
    ManagedBy: z.string(),
  }).optional(),
});

const StateSchema = z.object({
  Actions: z.array(z.object({
    ConfigurationBundle: z.object({
      StaticOverride: StaticOverrideSchema,
      WeightedOverride: WeightedOverrideSchema,
    }),
    RouteToTarget: z.object({
      StaticRoute: StaticRouteSchema,
      WeightedRoute: WeightedRouteSchema,
    }),
  })).optional(),
  Conditions: z.array(z.object({
    MatchPrincipals: MatchPrincipalsSchema,
    MatchPaths: MatchPathsSchema,
  })).optional(),
  CreatedAt: z.string().optional(),
  Description: z.string().optional(),
  GatewayArn: z.string().optional(),
  GatewayIdentifier: z.string(),
  Priority: z.number().optional(),
  RuleId: z.string(),
  Status: z.string().optional(),
  System: z.object({
    ManagedBy: z.string(),
  }).optional(),
  UpdatedAt: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Actions: z.array(z.object({
    ConfigurationBundle: z.object({
      StaticOverride: StaticOverrideSchema.optional(),
      WeightedOverride: WeightedOverrideSchema.optional(),
    }).optional(),
    RouteToTarget: z.object({
      StaticRoute: StaticRouteSchema.optional(),
      WeightedRoute: WeightedRouteSchema.optional(),
    }).optional(),
  })).optional(),
  Conditions: z.array(z.object({
    MatchPrincipals: MatchPrincipalsSchema.optional(),
    MatchPaths: MatchPathsSchema.optional(),
  })).optional(),
  Description: z.string().min(1).max(256).optional(),
  GatewayIdentifier: z.string().regex(
    new RegExp("^([0-9a-z][-]?){1,100}-[0-9a-z]{10}$"),
  ).optional(),
  Priority: z.number().min(1).max(1000000).optional(),
  System: z.object({
    ManagedBy: z.string().optional(),
  }).optional(),
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

/** Swamp extension model for BedrockAgentCore GatewayRule. Registered at `@swamp/aws/bedrockagentcore/gateway-rule`. */
export const model = {
  type: "@swamp/aws/bedrockagentcore/gateway-rule",
  version: "2026.09.03.1",
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
      toVersion: "2026.09.03.1",
      description: "Added: System",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "BedrockAgentCore GatewayRule resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a BedrockAgentCore GatewayRule",
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
          "AWS::BedrockAgentCore::GatewayRule",
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
      description: "Get a BedrockAgentCore GatewayRule",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the BedrockAgentCore GatewayRule",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::BedrockAgentCore::GatewayRule",
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
      description: "Update a BedrockAgentCore GatewayRule",
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
          existing.RuleId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::BedrockAgentCore::GatewayRule",
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
          "AWS::BedrockAgentCore::GatewayRule",
          identifier,
          currentState,
          desiredState,
          ["GatewayIdentifier"],
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
      description: "Delete a BedrockAgentCore GatewayRule",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the BedrockAgentCore GatewayRule",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::BedrockAgentCore::GatewayRule",
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
      description: "Sync BedrockAgentCore GatewayRule state from AWS",
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
          existing.RuleId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::BedrockAgentCore::GatewayRule",
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
      description: "List BedrockAgentCore GatewayRule resources",
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
          "AWS::BedrockAgentCore::GatewayRule",
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
