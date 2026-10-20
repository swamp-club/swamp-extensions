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

// Auto-generated extension model for @swamp/aws/ecs/gateway
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ECS Gateway (AWS::ECS::Gateway).
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

const GatewayTestTrafficHeaderSchema = z.object({
  Values: z.array(z.string()).describe("The values for the header."),
  Name: z.string().describe("The name of the header."),
});

const GatewayAlbTestTrafficRulesSchema = z.object({
  Header: GatewayTestTrafficHeaderSchema.describe(
    "The header configuration for test traffic routing.",
  ).optional(),
});

const GatewayElbNetworkConfigurationSchema = z.object({
  IpAddressType: z.enum(["ipv4", "dualstack", "dualstack-without-public-ipv4"])
    .describe("The IP address type for the ALB.").optional(),
  Subnets: z.array(z.string()).describe("The subnets for the ALB.").optional(),
  InboundSecurityGroup: z.string().describe(
    "The inbound security group for the ALB.",
  ).optional(),
});

const GatewayElbAccessLogS3DestinationSchema = z.object({
  Bucket: z.string().describe("The S3 bucket for access logs."),
  Prefix: z.string().describe("The S3 prefix for access logs.").optional(),
});

const GatewayElbAccessLogDestinationSchema = z.object({
  S3: GatewayElbAccessLogS3DestinationSchema.describe(
    "The S3 destination for gateway ALB access logs.",
  ).optional(),
});

const GatewayElbAccessLogConfigurationSchema = z.object({
  Destination: GatewayElbAccessLogDestinationSchema.describe(
    "The destination for gateway ALB access logs. Exactly one destination type must be specified.",
  ).optional(),
});

const HostSharedAlbConfigurationSchema = z.object({
  MaxAlbCount: z.number().int().describe(
    "The maximum number of ALBs to provision for the gateway.",
  ).optional(),
  Scheme: z.enum(["internet-facing", "internal"]).describe(
    "The scheme for the ALB.",
  ).optional(),
  TestTrafficRules: GatewayAlbTestTrafficRulesSchema.describe(
    "The test traffic rules for the gateway ALB.",
  ).optional(),
  Port: z.number().int().min(1).max(65535).describe(
    "The port on which the ALB listens.",
  ).optional(),
  NetworkConfiguration: GatewayElbNetworkConfigurationSchema.describe(
    "The network configuration for the gateway ALB.",
  ).optional(),
  Protocol: z.enum(["HTTP", "HTTPS"]).describe(
    "The protocol for the ALB listener.",
  ).optional(),
  WebACLArn: z.string().describe(
    "The ARN of the WAFv2 web ACL to associate with the ALB.",
  ).optional(),
  AccessLogs: GatewayElbAccessLogConfigurationSchema.describe(
    "The access log configuration for the gateway ALB. Access logging is enabled by the presence of a destination.",
  ).optional(),
  HttpDesync: z.enum(["monitor", "defensive", "strictest"]).describe(
    "The HTTP desync mitigation mode for the ALB.",
  ).optional(),
});

const TagSchema = z.object({
  Value: z.string().min(0).max(256).optional(),
  Key: z.string().min(1).max(128),
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
  InfrastructureRoleArn: z.string().describe(
    "The ARN of the IAM role that ECS uses to manage infrastructure for the gateway.",
  ),
  Configuration: z.object({
    HostSharedAlb: HostSharedAlbConfigurationSchema.describe(
      "The host shared ALB configuration for the gateway.",
    ),
  }).describe("The configuration for the gateway."),
  PropagateTags: z.enum(["NONE", "GATEWAY"]).describe(
    "Specifies whether to propagate the tags from the gateway to other resources.",
  ).optional(),
  GatewayName: z.string().min(1).max(255).regex(new RegExp("^[a-zA-Z0-9-]+$"))
    .describe(
      "The name of the gateway. Up to 255 letters (uppercase and lowercase), numbers, and hyphens are allowed.",
    ),
  DeletionProtection: z.boolean().describe(
    "Whether deletion protection is enabled for the gateway.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The metadata that you apply to the gateway to help you categorize and organize them.",
  ).optional(),
});

const StateSchema = z.object({
  Status: z.string().optional(),
  InfrastructureRoleArn: z.string().optional(),
  Configuration: z.object({
    HostSharedAlb: HostSharedAlbConfigurationSchema,
  }).optional(),
  PropagateTags: z.string().optional(),
  CreatedAt: z.string().optional(),
  GatewayName: z.string().optional(),
  DeletionProtection: z.boolean().optional(),
  Arn: z.string(),
  UpdatedAt: z.string().optional(),
  AccessType: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  InfrastructureRoleArn: z.string().describe(
    "The ARN of the IAM role that ECS uses to manage infrastructure for the gateway.",
  ).optional(),
  Configuration: z.object({
    HostSharedAlb: HostSharedAlbConfigurationSchema.describe(
      "The host shared ALB configuration for the gateway.",
    ).optional(),
  }).describe("The configuration for the gateway.").optional(),
  PropagateTags: z.enum(["NONE", "GATEWAY"]).describe(
    "Specifies whether to propagate the tags from the gateway to other resources.",
  ).optional(),
  GatewayName: z.string().min(1).max(255).regex(new RegExp("^[a-zA-Z0-9-]+$"))
    .describe(
      "The name of the gateway. Up to 255 letters (uppercase and lowercase), numbers, and hyphens are allowed.",
    ).optional(),
  DeletionProtection: z.boolean().describe(
    "Whether deletion protection is enabled for the gateway.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The metadata that you apply to the gateway to help you categorize and organize them.",
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

/** Swamp extension model for ECS Gateway. Registered at `@swamp/aws/ecs/gateway`. */
export const model = {
  type: "@swamp/aws/ecs/gateway",
  version: "2026.10.20.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "ECS Gateway resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ECS Gateway",
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
          "AWS::ECS::Gateway",
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
      description: "Get a ECS Gateway",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ECS Gateway",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::ECS::Gateway",
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
      description: "Update a ECS Gateway",
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
          "AWS::ECS::Gateway",
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
          "AWS::ECS::Gateway",
          identifier,
          currentState,
          desiredState,
          [
            "GatewayName",
            "Subnets",
            "IpAddressType",
            "Scheme",
            "Port",
            "Protocol",
          ],
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
      description: "Delete a ECS Gateway",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ECS Gateway",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::ECS::Gateway",
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
      description: "Sync ECS Gateway state from AWS",
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
            "AWS::ECS::Gateway",
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
      description: "List ECS Gateway resources",
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
        const { items, nextToken } = await listResources("AWS::ECS::Gateway", {
          resourceModel: args.resourceModel,
          maxPages: args.maxPages,
          credentials,
        });
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
