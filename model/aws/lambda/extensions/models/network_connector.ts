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

// Auto-generated extension model for @swamp/aws/lambda/network-connector
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Lambda NetworkConnector (AWS::Lambda::NetworkConnector).
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

const VpcEgressConfigurationSchema = z.object({
  ElasticIpConfiguration: z.unknown().optional(),
  AssociatedComputeResourceTypes: z.array(z.enum(["MicroVm", "WebFunction"]))
    .describe(
      "The types of Lambda compute resources that can use this connector. Supported values are MicroVm and WebFunction.",
    ),
  NetworkProtocol: z.enum(["IPv4", "DualStack"]).describe(
    "The network protocol for the connector. Specify IPv4 for IPv4-only networking, or DualStack for both IPv4 and IPv6.",
  ),
  SubnetIds: z.array(
    z.string().min(0).max(1024).regex(new RegExp("^subnet-[0-9a-z]*$")),
  ).describe(
    "The IDs of the VPC subnets where Lambda provisions elastic network interfaces (ENIs). Specify 1 to 16 subnets. All subnets must be in the same VPC.",
  ),
  SecurityGroupIds: z.array(
    z.string().min(0).max(1024).regex(new RegExp("^sg-[0-9a-zA-Z]*$")),
  ).describe(
    "The IDs of the VPC security groups to attach to the ENIs. All security groups must be in the same VPC as the subnets.",
  ),
});

const TagSchema = z.object({
  Value: z.string().min(0).max(256).describe("The value for the tag.")
    .optional(),
  Key: z.string().min(1).max(128).describe("The key name of the tag."),
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
  Configuration: z.object({
    VpcEgressConfiguration: VpcEgressConfigurationSchema.describe(
      "The VPC egress configuration for the network connector. Specifies the subnets, security groups, and network protocol for routing outbound traffic through your VPC.",
    ),
  }).describe(
    "The network configuration for the connector. Specify a VpcEgressConfiguration to enable outbound traffic routing through your VPC.",
  ),
  OperatorRole: z.string().min(0).max(10000).regex(
    new RegExp(
      "^arn:(aws[a-zA-Z-]*)?:iam::\\d{12}:role/?[a-zA-Z_0-9+=,.@\\-_/]+$",
    ),
  ).describe(
    "The ARN of the IAM role that Lambda assumes to manage elastic network interfaces in your VPC. This role must have permissions for ec2:CreateNetworkInterface and related describe operations. If ElasticIpConfiguration Type is ServiceManaged, this role must also have permissions for ec2:AllocateAddress and ec2:AssociateAddress.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of tags to apply to the network connector. Use tags to categorize network connectors for cost allocation, access control, or operational management.",
  ).optional(),
  Name: z.string().min(1).max(140).regex(
    new RegExp(
      "^(arn:aws[a-zA-Z-]*:lambda:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:\\d{12}:network-connector:[a-zA-Z0-9-_]+(:[1-9][0-9]*)?)|[a-zA-Z0-9_-]{1,64}$",
    ),
  ).describe(
    "A unique name for the network connector within your account and Region. Must be 1 to 64 alphanumeric characters, hyphens, or underscores.",
  ).optional(),
});

const StateSchema = z.object({
  Configuration: z.object({
    VpcEgressConfiguration: VpcEgressConfigurationSchema,
  }).optional(),
  OperatorRole: z.string().optional(),
  LatestVersion: z.number().optional(),
  State: z.string().optional(),
  LatestVersionArn: z.string().optional(),
  Arn: z.string(),
  Tags: z.array(TagSchema).optional(),
  Name: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Configuration: z.object({
    VpcEgressConfiguration: VpcEgressConfigurationSchema.describe(
      "The VPC egress configuration for the network connector. Specifies the subnets, security groups, and network protocol for routing outbound traffic through your VPC.",
    ).optional(),
  }).describe(
    "The network configuration for the connector. Specify a VpcEgressConfiguration to enable outbound traffic routing through your VPC.",
  ).optional(),
  OperatorRole: z.string().min(0).max(10000).regex(
    new RegExp(
      "^arn:(aws[a-zA-Z-]*)?:iam::\\d{12}:role/?[a-zA-Z_0-9+=,.@\\-_/]+$",
    ),
  ).describe(
    "The ARN of the IAM role that Lambda assumes to manage elastic network interfaces in your VPC. This role must have permissions for ec2:CreateNetworkInterface and related describe operations. If ElasticIpConfiguration Type is ServiceManaged, this role must also have permissions for ec2:AllocateAddress and ec2:AssociateAddress.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of tags to apply to the network connector. Use tags to categorize network connectors for cost allocation, access control, or operational management.",
  ).optional(),
  Name: z.string().min(1).max(140).regex(
    new RegExp(
      "^(arn:aws[a-zA-Z-]*:lambda:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:\\d{12}:network-connector:[a-zA-Z0-9-_]+(:[1-9][0-9]*)?)|[a-zA-Z0-9_-]{1,64}$",
    ),
  ).describe(
    "A unique name for the network connector within your account and Region. Must be 1 to 64 alphanumeric characters, hyphens, or underscores.",
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

/** Swamp extension model for Lambda NetworkConnector. Registered at `@swamp/aws/lambda/network-connector`. */
export const model = {
  type: "@swamp/aws/lambda/network-connector",
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
      toVersion: "2026.10.15.1",
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
      description: "Lambda NetworkConnector resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Lambda NetworkConnector",
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
          "AWS::Lambda::NetworkConnector",
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
      description: "Get a Lambda NetworkConnector",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Lambda NetworkConnector",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Lambda::NetworkConnector",
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
      description: "Update a Lambda NetworkConnector",
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
          "AWS::Lambda::NetworkConnector",
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
          "AWS::Lambda::NetworkConnector",
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
      description: "Delete a Lambda NetworkConnector",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Lambda NetworkConnector",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Lambda::NetworkConnector",
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
      description: "Sync Lambda NetworkConnector state from AWS",
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
            "AWS::Lambda::NetworkConnector",
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
      description: "List Lambda NetworkConnector resources",
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
          "AWS::Lambda::NetworkConnector",
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
