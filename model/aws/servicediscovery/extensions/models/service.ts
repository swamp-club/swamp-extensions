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

// Auto-generated extension model for @swamp/aws/servicediscovery/service
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ServiceDiscovery Service (AWS::ServiceDiscovery::Service).
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

const DnsRecordSchema = z.object({
  Type: z.string().describe("The DNS record type (e.g., A, AAAA, SRV)."),
  TTL: z.number().describe("The time-to-live (TTL) for the DNS record."),
});

const TagSchema = z.object({
  Value: z.string().describe("The value of the tag."),
  Key: z.string().describe("The key name of the tag."),
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
  Type: z.string().describe(
    "The type of service. Supported values are HTTP or DNS.",
  ).optional(),
  Description: z.string().describe("A description for the service.").optional(),
  HealthCheckCustomConfig: z.object({
    FailureThreshold: z.number().describe(
      "The number of consecutive health check failures required before the service is considered unhealthy.",
    ).optional(),
  }).describe("Settings for custom health checks.").optional(),
  DnsConfig: z.object({
    DnsRecords: z.array(DnsRecordSchema).describe(
      "A list of DNS records associated with the service.",
    ),
    RoutingPolicy: z.string().describe(
      "The routing policy to use for DNS queries.",
    ).optional(),
    NamespaceId: z.string().describe(
      "The ID of the namespace for the DNS configuration.",
    ).optional(),
  }).describe("DNS-related configurations for the service.").optional(),
  ServiceAttributes: z.record(z.string(), z.string()).describe(
    "A string map that contains attributes and values for the service. You can specify a maximum of 30 key-value pairs.",
  ).optional(),
  NamespaceId: z.string().describe(
    "The ID of the namespace in which the service is created.",
  ).optional(),
  HealthCheckConfig: z.object({
    Type: z.string().describe(
      "The type of health check (e.g., HTTP, HTTPS, TCP).",
    ),
    ResourcePath: z.string().describe(
      "The path to ping on the service for health checks.",
    ).optional(),
    FailureThreshold: z.number().describe(
      "The number of consecutive health check failures that must occur before declaring the service unhealthy.",
    ).optional(),
  }).describe("Settings for health checks. Used when routing is DNS-based.")
    .optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to associate with the service.",
  ).optional(),
  Name: z.string().describe("The name of the service.").optional(),
});

const StateSchema = z.object({
  Type: z.string().optional(),
  Description: z.string().optional(),
  HealthCheckCustomConfig: z.object({
    FailureThreshold: z.number(),
  }).optional(),
  DnsConfig: z.object({
    DnsRecords: z.array(DnsRecordSchema),
    RoutingPolicy: z.string(),
    NamespaceId: z.string(),
  }).optional(),
  ServiceAttributes: z.record(z.string(), z.unknown()).optional(),
  Id: z.string(),
  NamespaceId: z.string().optional(),
  HealthCheckConfig: z.object({
    Type: z.string(),
    ResourcePath: z.string(),
    FailureThreshold: z.number(),
  }).optional(),
  Arn: z.string().optional(),
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
  Type: z.string().describe(
    "The type of service. Supported values are HTTP or DNS.",
  ).optional(),
  Description: z.string().describe("A description for the service.").optional(),
  HealthCheckCustomConfig: z.object({
    FailureThreshold: z.number().describe(
      "The number of consecutive health check failures required before the service is considered unhealthy.",
    ).optional(),
  }).describe("Settings for custom health checks.").optional(),
  DnsConfig: z.object({
    DnsRecords: z.array(DnsRecordSchema).describe(
      "A list of DNS records associated with the service.",
    ).optional(),
    RoutingPolicy: z.string().describe(
      "The routing policy to use for DNS queries.",
    ).optional(),
    NamespaceId: z.string().describe(
      "The ID of the namespace for the DNS configuration.",
    ).optional(),
  }).describe("DNS-related configurations for the service.").optional(),
  ServiceAttributes: z.record(z.string(), z.string()).describe(
    "A string map that contains attributes and values for the service. You can specify a maximum of 30 key-value pairs.",
  ).optional(),
  NamespaceId: z.string().describe(
    "The ID of the namespace in which the service is created.",
  ).optional(),
  HealthCheckConfig: z.object({
    Type: z.string().describe(
      "The type of health check (e.g., HTTP, HTTPS, TCP).",
    ).optional(),
    ResourcePath: z.string().describe(
      "The path to ping on the service for health checks.",
    ).optional(),
    FailureThreshold: z.number().describe(
      "The number of consecutive health check failures that must occur before declaring the service unhealthy.",
    ).optional(),
  }).describe("Settings for health checks. Used when routing is DNS-based.")
    .optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to associate with the service.",
  ).optional(),
  Name: z.string().describe("The name of the service.").optional(),
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

/** Swamp extension model for ServiceDiscovery Service. Registered at `@swamp/aws/servicediscovery/service`. */
export const model = {
  type: "@swamp/aws/servicediscovery/service",
  version: "2026.10.13.1",
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
      toVersion: "2026.09.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "ServiceDiscovery Service resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ServiceDiscovery Service",
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
          "AWS::ServiceDiscovery::Service",
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
      description: "Get a ServiceDiscovery Service",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ServiceDiscovery Service",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::ServiceDiscovery::Service",
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
      description: "Update a ServiceDiscovery Service",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::ServiceDiscovery::Service",
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
          "AWS::ServiceDiscovery::Service",
          identifier,
          currentState,
          desiredState,
          ["HealthCheckCustomConfig", "Name", "Type", "NamespaceId"],
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
      description: "Delete a ServiceDiscovery Service",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ServiceDiscovery Service",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::ServiceDiscovery::Service",
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
      description: "Sync ServiceDiscovery Service state from AWS",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::ServiceDiscovery::Service",
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
      description: "List ServiceDiscovery Service resources",
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
          "AWS::ServiceDiscovery::Service",
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
            (item.properties?.Id?.toString() ?? item.identifier).replace(
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
