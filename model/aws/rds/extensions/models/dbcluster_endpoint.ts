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

// Auto-generated extension model for @swamp/aws/rds/dbcluster-endpoint
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for RDS DBClusterEndpoint (AWS::RDS::DBClusterEndpoint).
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
  Key: z.string().min(1).max(128).describe("The key name of the tag."),
  Value: z.string().min(0).max(256).describe("The value for the tag."),
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
  DBClusterEndpointIdentifier: z.string().min(1).max(63).regex(
    new RegExp("^[a-z][a-z0-9]*(-[a-z0-9]+)*$"),
  ).describe(
    "The identifier to use for the new endpoint. This parameter is stored as a lowercase string.",
  ),
  DBClusterIdentifier: z.string().min(1).max(63).regex(
    new RegExp("^[a-z][a-z0-9]*(-[a-z0-9]+)*$"),
  ).describe(
    "The DB cluster identifier of the DB cluster associated with the endpoint. This parameter is stored as a lowercase string.",
  ),
  CustomEndpointType: z.enum(["READER", "WRITER", "ANY"]).describe(
    "The type of the custom endpoint.",
  ),
  StaticMembers: z.array(z.string()).describe(
    "List of DB instance identifiers that are part of the custom endpoint group. Once either member list is set, it can be changed or replaced by the other list, but both lists cannot be removed in place; removing them requires replacing the endpoint.",
  ).optional(),
  ExcludedMembers: z.array(z.string()).describe(
    "List of DB instance identifiers that aren't part of the custom endpoint group. All other eligible instances are reachable through the custom endpoint. Only relevant if the list of static members is empty. Once either member list is set, it can be changed or replaced by the other list, but both lists cannot be removed in place; removing them requires replacing the endpoint.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags to be assigned to the DB cluster endpoint.",
  ).optional(),
});

const StateSchema = z.object({
  DBClusterEndpointArn: z.string(),
  DBClusterEndpointIdentifier: z.string().optional(),
  DBClusterIdentifier: z.string().optional(),
  EndpointType: z.string().optional(),
  CustomEndpointType: z.string().optional(),
  Status: z.string().optional(),
  StaticMembers: z.array(z.string()).optional(),
  ExcludedMembers: z.array(z.string()).optional(),
  Endpoint: z.string().optional(),
  DBClusterEndpointResourceIdentifier: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  DBClusterEndpointIdentifier: z.string().min(1).max(63).regex(
    new RegExp("^[a-z][a-z0-9]*(-[a-z0-9]+)*$"),
  ).describe(
    "The identifier to use for the new endpoint. This parameter is stored as a lowercase string.",
  ).optional(),
  DBClusterIdentifier: z.string().min(1).max(63).regex(
    new RegExp("^[a-z][a-z0-9]*(-[a-z0-9]+)*$"),
  ).describe(
    "The DB cluster identifier of the DB cluster associated with the endpoint. This parameter is stored as a lowercase string.",
  ).optional(),
  CustomEndpointType: z.enum(["READER", "WRITER", "ANY"]).describe(
    "The type of the custom endpoint.",
  ).optional(),
  StaticMembers: z.array(z.string()).describe(
    "List of DB instance identifiers that are part of the custom endpoint group. Once either member list is set, it can be changed or replaced by the other list, but both lists cannot be removed in place; removing them requires replacing the endpoint.",
  ).optional(),
  ExcludedMembers: z.array(z.string()).describe(
    "List of DB instance identifiers that aren't part of the custom endpoint group. All other eligible instances are reachable through the custom endpoint. Only relevant if the list of static members is empty. Once either member list is set, it can be changed or replaced by the other list, but both lists cannot be removed in place; removing them requires replacing the endpoint.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags to be assigned to the DB cluster endpoint.",
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

/** Swamp extension model for RDS DBClusterEndpoint. Registered at `@swamp/aws/rds/dbcluster-endpoint`. */
export const model = {
  type: "@swamp/aws/rds/dbcluster-endpoint",
  version: "2026.10.07.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "RDS DBClusterEndpoint resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a RDS DBClusterEndpoint",
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
          "AWS::RDS::DBClusterEndpoint",
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
      description: "Get a RDS DBClusterEndpoint",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the RDS DBClusterEndpoint",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::RDS::DBClusterEndpoint",
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
      description: "Update a RDS DBClusterEndpoint",
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
        const identifier = existing.DBClusterEndpointArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::RDS::DBClusterEndpoint",
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
          "AWS::RDS::DBClusterEndpoint",
          identifier,
          currentState,
          desiredState,
          ["DBClusterEndpointIdentifier", "DBClusterIdentifier"],
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
      description: "Delete a RDS DBClusterEndpoint",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the RDS DBClusterEndpoint",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::RDS::DBClusterEndpoint",
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
      description: "Sync RDS DBClusterEndpoint state from AWS",
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
        const identifier = existing.DBClusterEndpointArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::RDS::DBClusterEndpoint",
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
      description: "List RDS DBClusterEndpoint resources",
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
          "AWS::RDS::DBClusterEndpoint",
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
            (item.properties?.DBClusterEndpointArn?.toString() ??
              item.identifier).replace(/[\/\\]/g, "_").replace(/\.\./g, "_")
              .replace(/\0/g, "");
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
