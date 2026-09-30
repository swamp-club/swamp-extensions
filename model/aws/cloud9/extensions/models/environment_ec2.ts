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

// Auto-generated extension model for @swamp/aws/cloud9/environment-ec2
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Cloud9 EnvironmentEC2 (AWS::Cloud9::EnvironmentEC2).
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

const RepositorySchema = z.object({
  RepositoryUrl: z.string().max(1000).describe(
    "The clone URL of the AWS CodeCommit repository to be cloned.",
  ),
  PathComponent: z.string().max(1000).describe(
    "The path within the development environment's default file system location to clone the AWS CodeCommit repository into.",
  ),
});

const TagSchema = z.object({
  Value: z.string().max(256),
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
  Repositories: z.array(RepositorySchema).describe(
    "Any AWS CodeCommit source code repositories to be cloned into the development environment.",
  ).optional(),
  OwnerArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the environment owner.",
  ).optional(),
  Description: z.string().min(1).max(200).describe(
    "The description of the environment.",
  ).optional(),
  ConnectionType: z.string().describe(
    "The connection type used for connecting to an Amazon EC2 environment.",
  ).optional(),
  AutomaticStopTimeMinutes: z.number().int().describe(
    "The number of minutes until the running instance is shut down after the environment was last used.",
  ).optional(),
  ImageId: z.string().describe(
    "The identifier for the Amazon Machine Image (AMI) that's used to create the EC2 instance.",
  ).optional(),
  SubnetId: z.string().describe(
    "The ID of the subnet in Amazon VPC that AWS Cloud9 will use.",
  ).optional(),
  InstanceType: z.string().describe(
    "The type of instance to connect to the environment.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs that will be associated with the new AWS Cloud9 development environment.",
  ).optional(),
  Name: z.string().min(1).max(60).describe("The name of the environment.")
    .optional(),
});

const StateSchema = z.object({
  Repositories: z.array(RepositorySchema).optional(),
  OwnerArn: z.string().optional(),
  Description: z.string().optional(),
  ConnectionType: z.string().optional(),
  AutomaticStopTimeMinutes: z.number().optional(),
  ImageId: z.string().optional(),
  SubnetId: z.string().optional(),
  EnvironmentId: z.string(),
  Arn: z.string().optional(),
  InstanceType: z.string().optional(),
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
  Repositories: z.array(RepositorySchema).describe(
    "Any AWS CodeCommit source code repositories to be cloned into the development environment.",
  ).optional(),
  OwnerArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the environment owner.",
  ).optional(),
  Description: z.string().min(1).max(200).describe(
    "The description of the environment.",
  ).optional(),
  ConnectionType: z.string().describe(
    "The connection type used for connecting to an Amazon EC2 environment.",
  ).optional(),
  AutomaticStopTimeMinutes: z.number().int().describe(
    "The number of minutes until the running instance is shut down after the environment was last used.",
  ).optional(),
  ImageId: z.string().describe(
    "The identifier for the Amazon Machine Image (AMI) that's used to create the EC2 instance.",
  ).optional(),
  SubnetId: z.string().describe(
    "The ID of the subnet in Amazon VPC that AWS Cloud9 will use.",
  ).optional(),
  InstanceType: z.string().describe(
    "The type of instance to connect to the environment.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs that will be associated with the new AWS Cloud9 development environment.",
  ).optional(),
  Name: z.string().min(1).max(60).describe("The name of the environment.")
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

/** Swamp extension model for Cloud9 EnvironmentEC2. Registered at `@swamp/aws/cloud9/environment-ec2`. */
export const model = {
  type: "@swamp/aws/cloud9/environment-ec2",
  version: "2026.09.30.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Cloud9 EnvironmentEC2 resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Cloud9 EnvironmentEC2",
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
          "AWS::Cloud9::EnvironmentEC2",
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
      description: "Get a Cloud9 EnvironmentEC2",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Cloud9 EnvironmentEC2",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Cloud9::EnvironmentEC2",
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
      description: "Update a Cloud9 EnvironmentEC2",
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
        const identifier = existing.EnvironmentId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Cloud9::EnvironmentEC2",
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
          "AWS::Cloud9::EnvironmentEC2",
          identifier,
          currentState,
          desiredState,
          [
            "AutomaticStopTimeMinutes",
            "OwnerArn",
            "ConnectionType",
            "InstanceType",
            "ImageId",
            "SubnetId",
            "Repositories",
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
      description: "Delete a Cloud9 EnvironmentEC2",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Cloud9 EnvironmentEC2",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Cloud9::EnvironmentEC2",
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
      description: "Sync Cloud9 EnvironmentEC2 state from AWS",
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
        const identifier = existing.EnvironmentId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Cloud9::EnvironmentEC2",
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
      description: "List Cloud9 EnvironmentEC2 resources",
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
          "AWS::Cloud9::EnvironmentEC2",
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
            (item.properties?.EnvironmentId?.toString() ?? item.identifier)
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
