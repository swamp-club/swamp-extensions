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

// Auto-generated extension model for @swamp/aws/redshift/endpoint-access
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Redshift EndpointAccess (AWS::Redshift::EndpointAccess).
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

const NetworkInterfaceSchema = z.object({
  PrivateIpAddress: z.string().describe(
    "The IPv4 address of the network interface within the subnet.",
  ).optional(),
  AvailabilityZone: z.string().describe("The Availability Zone.").optional(),
  SubnetId: z.string().describe("The subnet identifier.").optional(),
  NetworkInterfaceId: z.string().describe("The network interface identifier.")
    .optional(),
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
  VpcEndpoint: z.object({
    NetworkInterfaces: z.array(NetworkInterfaceSchema).describe(
      "One or more network interfaces of the endpoint. Also known as an interface endpoint.",
    ).optional(),
  }).describe(
    "The connection endpoint for connecting to an Amazon Redshift cluster through the proxy.",
  ).optional(),
  EndpointName: z.string().regex(
    new RegExp("^(?=^[a-z][a-z0-9]*(-[a-z0-9]+)*$).{1,30}$"),
  ).describe("The name of the endpoint."),
  VpcSecurityGroupIds: z.array(z.string()).describe(
    "A list of vpc security group ids to apply to the created endpoint access.",
  ),
  ResourceOwner: z.string().regex(new RegExp("^\\d{12}$")).describe(
    "The AWS account ID of the owner of the cluster.",
  ).optional(),
  SubnetGroupName: z.string().regex(new RegExp("^(?=^[a-zA-Z0-9-]+$).{1,255}$"))
    .describe(
      "The subnet group name where Amazon Redshift chooses to deploy the endpoint.",
    ),
  ClusterIdentifier: z.string().describe(
    "A unique identifier for the cluster. You use this identifier to refer to the cluster for any subsequent cluster operations such as deleting or modifying. All alphabetical characters must be lower case, no hypens at the end, no two consecutive hyphens. Cluster name should be unique for all clusters within an AWS account",
  ),
});

const StateSchema = z.object({
  EndpointStatus: z.string().optional(),
  VpcEndpoint: z.object({
    VpcId: z.string(),
    NetworkInterfaces: z.array(NetworkInterfaceSchema),
    VpcEndpointId: z.string(),
  }).optional(),
  Address: z.string().optional(),
  EndpointName: z.string(),
  VpcSecurityGroupIds: z.array(z.string()).optional(),
  ResourceOwner: z.string().optional(),
  SubnetGroupName: z.string().optional(),
  Port: z.number().optional(),
  EndpointCreateTime: z.string().optional(),
  ClusterIdentifier: z.string().optional(),
  VpcSecurityGroups: z.array(z.object({
    Status: z.string(),
    VpcSecurityGroupId: z.string(),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  VpcEndpoint: z.object({
    NetworkInterfaces: z.array(NetworkInterfaceSchema).describe(
      "One or more network interfaces of the endpoint. Also known as an interface endpoint.",
    ).optional(),
  }).describe(
    "The connection endpoint for connecting to an Amazon Redshift cluster through the proxy.",
  ).optional(),
  EndpointName: z.string().regex(
    new RegExp("^(?=^[a-z][a-z0-9]*(-[a-z0-9]+)*$).{1,30}$"),
  ).describe("The name of the endpoint.").optional(),
  VpcSecurityGroupIds: z.array(z.string()).describe(
    "A list of vpc security group ids to apply to the created endpoint access.",
  ).optional(),
  ResourceOwner: z.string().regex(new RegExp("^\\d{12}$")).describe(
    "The AWS account ID of the owner of the cluster.",
  ).optional(),
  SubnetGroupName: z.string().regex(new RegExp("^(?=^[a-zA-Z0-9-]+$).{1,255}$"))
    .describe(
      "The subnet group name where Amazon Redshift chooses to deploy the endpoint.",
    ).optional(),
  ClusterIdentifier: z.string().describe(
    "A unique identifier for the cluster. You use this identifier to refer to the cluster for any subsequent cluster operations such as deleting or modifying. All alphabetical characters must be lower case, no hypens at the end, no two consecutive hyphens. Cluster name should be unique for all clusters within an AWS account",
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

/** Swamp extension model for Redshift EndpointAccess. Registered at `@swamp/aws/redshift/endpoint-access`. */
export const model = {
  type: "@swamp/aws/redshift/endpoint-access",
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
      description: "Redshift EndpointAccess resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Redshift EndpointAccess",
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
          "AWS::Redshift::EndpointAccess",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.EndpointName ?? g.EndpointName)?.toString() ?? "current")
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
      description: "Get a Redshift EndpointAccess",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Redshift EndpointAccess",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Redshift::EndpointAccess",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.EndpointName ?? context.globalArgs.EndpointName)
            ?.toString() ?? args.identifier).replace(/[\/\\]/g, "_").replace(
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
    update: {
      description: "Update a Redshift EndpointAccess",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.EndpointName?.toString() ?? "current").replace(
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
        const identifier = existing.EndpointName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Redshift::EndpointAccess",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Redshift::EndpointAccess",
          identifier,
          currentState,
          desiredState,
          [
            "EndpointName",
            "ClusterIdentifier",
            "ResourceOwner",
            "SubnetGroupName",
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
      description: "Delete a Redshift EndpointAccess",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Redshift EndpointAccess",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Redshift::EndpointAccess",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.EndpointName?.toString() ?? args.identifier)
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
      description: "Sync Redshift EndpointAccess state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.EndpointName?.toString() ?? "current").replace(
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
        const identifier = existing.EndpointName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Redshift::EndpointAccess",
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
