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

// Auto-generated extension model for @swamp/aws/dms/replication-task
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for DMS ReplicationTask (AWS::DMS::ReplicationTask).
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
  Value: z.string().describe("Tag value"),
  Key: z.string().describe("Tag key"),
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
  ReplicationTaskSettings: z.string().describe(
    "Overall settings for the task, in JSON format",
  ).optional(),
  CdcStartTime: z.number().describe(
    "Indicates the start time for a change data capture (CDC) operation. Use either CdcStartTime or CdcStartPosition to specify when you want a CDC operation to start. Specifying both values results in an error.",
  ).optional(),
  CdcStartPosition: z.string().describe(
    "Indicates when you want a change data capture (CDC) operation to start. Use either CdcStartPosition or CdcStartTime to specify when you want a CDC operation to start. Specifying both values results in an error.",
  ).optional(),
  CdcStopPosition: z.string().describe(
    "Indicates when you want a change data capture (CDC) operation to stop. The value can be either server time or commit time.",
  ).optional(),
  MigrationType: z.enum(["full-load", "cdc", "full-load-and-cdc"]).describe(
    "The migration type.",
  ),
  TargetEndpointArn: z.string().describe(
    "An Amazon Resource Name (ARN) that uniquely identifies the target endpoint.",
  ),
  ReplicationInstanceArn: z.string().describe(
    "The Amazon Resource Name (ARN) of a replication instance.",
  ),
  TaskData: z.string().describe(
    "Supplemental information that the task requires to migrate the data for certain source and target endpoints.",
  ).optional(),
  ResourceIdentifier: z.string().describe(
    "A friendly name for the resource identifier at the end of the EndpointArn response parameter that is returned in the created Endpoint object.",
  ).optional(),
  TableMappings: z.string().describe(
    "The table mappings for the task, in JSON format.",
  ),
  ReplicationTaskIdentifier: z.string().regex(
    new RegExp("^[a-zA-Z][a-zA-Z0-9]*(?:-[a-zA-Z0-9]+)*$"),
  ).describe("An identifier for the replication task.").optional(),
  SourceEndpointArn: z.string().describe(
    "An Amazon Resource Name (ARN) that uniquely identifies the source endpoint.",
  ),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  ReplicationTaskSettings: z.string().optional(),
  CdcStartTime: z.number().optional(),
  CdcStartPosition: z.string().optional(),
  CdcStopPosition: z.string().optional(),
  MigrationType: z.string().optional(),
  TargetEndpointArn: z.string().optional(),
  ReplicationInstanceArn: z.string().optional(),
  TaskData: z.string().optional(),
  ResourceIdentifier: z.string().optional(),
  TableMappings: z.string().optional(),
  ReplicationTaskIdentifier: z.string().optional(),
  SourceEndpointArn: z.string().optional(),
  ReplicationTaskArn: z.string(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  ReplicationTaskSettings: z.string().describe(
    "Overall settings for the task, in JSON format",
  ).optional(),
  CdcStartTime: z.number().describe(
    "Indicates the start time for a change data capture (CDC) operation. Use either CdcStartTime or CdcStartPosition to specify when you want a CDC operation to start. Specifying both values results in an error.",
  ).optional(),
  CdcStartPosition: z.string().describe(
    "Indicates when you want a change data capture (CDC) operation to start. Use either CdcStartPosition or CdcStartTime to specify when you want a CDC operation to start. Specifying both values results in an error.",
  ).optional(),
  CdcStopPosition: z.string().describe(
    "Indicates when you want a change data capture (CDC) operation to stop. The value can be either server time or commit time.",
  ).optional(),
  MigrationType: z.enum(["full-load", "cdc", "full-load-and-cdc"]).describe(
    "The migration type.",
  ).optional(),
  TargetEndpointArn: z.string().describe(
    "An Amazon Resource Name (ARN) that uniquely identifies the target endpoint.",
  ).optional(),
  ReplicationInstanceArn: z.string().describe(
    "The Amazon Resource Name (ARN) of a replication instance.",
  ).optional(),
  TaskData: z.string().describe(
    "Supplemental information that the task requires to migrate the data for certain source and target endpoints.",
  ).optional(),
  ResourceIdentifier: z.string().describe(
    "A friendly name for the resource identifier at the end of the EndpointArn response parameter that is returned in the created Endpoint object.",
  ).optional(),
  TableMappings: z.string().describe(
    "The table mappings for the task, in JSON format.",
  ).optional(),
  ReplicationTaskIdentifier: z.string().regex(
    new RegExp("^[a-zA-Z][a-zA-Z0-9]*(?:-[a-zA-Z0-9]+)*$"),
  ).describe("An identifier for the replication task.").optional(),
  SourceEndpointArn: z.string().describe(
    "An Amazon Resource Name (ARN) that uniquely identifies the source endpoint.",
  ).optional(),
  Tags: z.array(TagSchema).optional(),
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

/** Swamp extension model for DMS ReplicationTask. Registered at `@swamp/aws/dms/replication-task`. */
export const model = {
  type: "@swamp/aws/dms/replication-task",
  version: "2026.09.03.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "DMS ReplicationTask resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a DMS ReplicationTask",
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
          "AWS::DMS::ReplicationTask",
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
      description: "Get a DMS ReplicationTask",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DMS ReplicationTask",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::DMS::ReplicationTask",
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
      description: "Update a DMS ReplicationTask",
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
        const identifier = existing.ReplicationTaskArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::DMS::ReplicationTask",
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
          "AWS::DMS::ReplicationTask",
          identifier,
          currentState,
          desiredState,
          [
            "ResourceIdentifier",
            "TargetEndpointArn",
            "ReplicationInstanceArn",
            "SourceEndpointArn",
            "MigrationType",
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
      description: "Delete a DMS ReplicationTask",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DMS ReplicationTask",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::DMS::ReplicationTask",
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
      description: "Sync DMS ReplicationTask state from AWS",
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
        const identifier = existing.ReplicationTaskArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::DMS::ReplicationTask",
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
      description: "List DMS ReplicationTask resources",
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
          "AWS::DMS::ReplicationTask",
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
            (item.properties?.ReplicationTaskArn?.toString() ?? item.identifier)
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
