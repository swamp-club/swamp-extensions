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

// Auto-generated extension model for @swamp/aws/ec2/application-status-check
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for EC2 ApplicationStatusCheck (AWS::EC2::ApplicationStatusCheck).
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

const HealthCheckPathSourceSchema = z.object({
  SubnetId: z.string().optional(),
  SecurityGroupId: z.string().optional(),
});

const HealthCheckPathDestinationSchema = z.object({
  SubnetId: z.string().optional(),
  SecurityGroupId: z.string().optional(),
});

const HealthCheckPathSchema = z.object({
  Source: HealthCheckPathSourceSchema.optional(),
  Destinations: z.array(HealthCheckPathDestinationSchema).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128),
  Value: z.string().min(0).max(256),
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
  Protocol: z.enum(["http", "https"]).describe(
    "The network protocol used for the health check.",
  ),
  Port: z.number().int().min(1).max(65535).describe(
    "The port used for the health check.",
  ),
  Path: z.string().describe("The HTTP path used for the health check.")
    .optional(),
  Aggregation: z.enum(["included", "excluded"]).describe(
    "Whether this check is included in the rolled-up application status.",
  ).optional(),
  IpVersion: z.enum(["ipv4", "ipv6"]).describe(
    "The IP version used for the health check.",
  ).optional(),
  IpScope: z.enum(["private"]).describe(
    "The IP scope used for the health check.",
  ).optional(),
  DeviceIndex: z.number().int().describe(
    "The network interface device index used for the health check.",
  ).optional(),
  Interval: z.number().int().describe(
    "The interval, in seconds, between health check probes.",
  ).optional(),
  Timeout: z.number().int().describe(
    "The timeout, in seconds, for each health check probe.",
  ).optional(),
  FailureThreshold: z.number().int().describe(
    "The number of consecutive failed probes required to mark the instance unhealthy.",
  ).optional(),
  SuccessThreshold: z.number().int().describe(
    "The number of consecutive successful probes required to mark the instance healthy.",
  ).optional(),
  StatusCodeMatcher: z.string().describe(
    'The HTTP status codes considered successful (e.g., "200-299").',
  ).optional(),
  InitializationGracePeriodSeconds: z.number().int().min(-1).max(600).describe(
    "Seconds to wait after instance launch before beginning health checks.",
  ).optional(),
  HealthCheckPaths: z.array(HealthCheckPathSchema).describe(
    "The source/destination network paths used for the health check.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "Tags to apply to the application status check.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  ApplicationStatusCheckId: z.string().optional(),
  Protocol: z.string().optional(),
  Port: z.number().optional(),
  Path: z.string().optional(),
  Aggregation: z.string().optional(),
  IpVersion: z.string().optional(),
  IpScope: z.string().optional(),
  DeviceIndex: z.number().optional(),
  Interval: z.number().optional(),
  Timeout: z.number().optional(),
  FailureThreshold: z.number().optional(),
  SuccessThreshold: z.number().optional(),
  StatusCodeMatcher: z.string().optional(),
  InitializationGracePeriodSeconds: z.number().optional(),
  HealthCheckPaths: z.array(HealthCheckPathSchema).optional(),
  Tags: z.array(TagSchema).optional(),
  CreationTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Protocol: z.enum(["http", "https"]).describe(
    "The network protocol used for the health check.",
  ).optional(),
  Port: z.number().int().min(1).max(65535).describe(
    "The port used for the health check.",
  ).optional(),
  Path: z.string().describe("The HTTP path used for the health check.")
    .optional(),
  Aggregation: z.enum(["included", "excluded"]).describe(
    "Whether this check is included in the rolled-up application status.",
  ).optional(),
  IpVersion: z.enum(["ipv4", "ipv6"]).describe(
    "The IP version used for the health check.",
  ).optional(),
  IpScope: z.enum(["private"]).describe(
    "The IP scope used for the health check.",
  ).optional(),
  DeviceIndex: z.number().int().describe(
    "The network interface device index used for the health check.",
  ).optional(),
  Interval: z.number().int().describe(
    "The interval, in seconds, between health check probes.",
  ).optional(),
  Timeout: z.number().int().describe(
    "The timeout, in seconds, for each health check probe.",
  ).optional(),
  FailureThreshold: z.number().int().describe(
    "The number of consecutive failed probes required to mark the instance unhealthy.",
  ).optional(),
  SuccessThreshold: z.number().int().describe(
    "The number of consecutive successful probes required to mark the instance healthy.",
  ).optional(),
  StatusCodeMatcher: z.string().describe(
    'The HTTP status codes considered successful (e.g., "200-299").',
  ).optional(),
  InitializationGracePeriodSeconds: z.number().int().min(-1).max(600).describe(
    "Seconds to wait after instance launch before beginning health checks.",
  ).optional(),
  HealthCheckPaths: z.array(HealthCheckPathSchema).describe(
    "The source/destination network paths used for the health check.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "Tags to apply to the application status check.",
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

/** Swamp extension model for EC2 ApplicationStatusCheck. Registered at `@swamp/aws/ec2/application-status-check`. */
export const model = {
  type: "@swamp/aws/ec2/application-status-check",
  version: "2026.09.03.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "EC2 ApplicationStatusCheck resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EC2 ApplicationStatusCheck",
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
          "AWS::EC2::ApplicationStatusCheck",
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
      description: "Get a EC2 ApplicationStatusCheck",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 ApplicationStatusCheck",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::EC2::ApplicationStatusCheck",
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
      description: "Update a EC2 ApplicationStatusCheck",
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
          "AWS::EC2::ApplicationStatusCheck",
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
          "AWS::EC2::ApplicationStatusCheck",
          identifier,
          currentState,
          desiredState,
          ["Interval", "IpScope"],
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
      description: "Delete a EC2 ApplicationStatusCheck",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 ApplicationStatusCheck",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::EC2::ApplicationStatusCheck",
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
      description: "Sync EC2 ApplicationStatusCheck state from AWS",
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
            "AWS::EC2::ApplicationStatusCheck",
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
      description: "List EC2 ApplicationStatusCheck resources",
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
          "AWS::EC2::ApplicationStatusCheck",
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
