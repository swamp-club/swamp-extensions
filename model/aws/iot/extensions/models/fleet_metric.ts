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

// Auto-generated extension model for @swamp/aws/iot/fleet-metric
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for IoT FleetMetric (AWS::IoT::FleetMetric).
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

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe("The tag's key"),
  Value: z.string().min(1).max(256).describe("The tag's value"),
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
  MetricName: z.string().describe("The name of the fleet metric"),
  Description: z.string().describe("The description of a fleet metric")
    .optional(),
  QueryString: z.string().describe(
    "The Fleet Indexing query used by a fleet metric",
  ).optional(),
  Period: z.number().int().describe("The period of metric emission in seconds")
    .optional(),
  AggregationField: z.string().describe(
    "The aggregation field to perform aggregation and metric emission",
  ).optional(),
  QueryVersion: z.string().describe(
    "The version of a Fleet Indexing query used by a fleet metric",
  ).optional(),
  IndexName: z.string().describe("The index name of a fleet metric").optional(),
  Unit: z.string().describe("The unit of data points emitted by a fleet metric")
    .optional(),
  AggregationType: z.object({
    Name: z.string().describe(
      "Fleet Indexing aggregation type names such as Statistics, Percentiles and Cardinality",
    ),
    Values: z.array(z.string()).describe(
      "Fleet Indexing aggregation type values",
    ),
  }).describe("Aggregation types supported by Fleet Indexing").optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource",
  ).optional(),
});

const StateSchema = z.object({
  MetricName: z.string(),
  Description: z.string().optional(),
  QueryString: z.string().optional(),
  Period: z.number().optional(),
  AggregationField: z.string().optional(),
  QueryVersion: z.string().optional(),
  IndexName: z.string().optional(),
  Unit: z.string().optional(),
  AggregationType: z.object({
    Name: z.string(),
    Values: z.array(z.string()),
  }).optional(),
  MetricArn: z.string().optional(),
  CreationDate: z.string().optional(),
  LastModifiedDate: z.string().optional(),
  Version: z.number().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  MetricName: z.string().describe("The name of the fleet metric").optional(),
  Description: z.string().describe("The description of a fleet metric")
    .optional(),
  QueryString: z.string().describe(
    "The Fleet Indexing query used by a fleet metric",
  ).optional(),
  Period: z.number().int().describe("The period of metric emission in seconds")
    .optional(),
  AggregationField: z.string().describe(
    "The aggregation field to perform aggregation and metric emission",
  ).optional(),
  QueryVersion: z.string().describe(
    "The version of a Fleet Indexing query used by a fleet metric",
  ).optional(),
  IndexName: z.string().describe("The index name of a fleet metric").optional(),
  Unit: z.string().describe("The unit of data points emitted by a fleet metric")
    .optional(),
  AggregationType: z.object({
    Name: z.string().describe(
      "Fleet Indexing aggregation type names such as Statistics, Percentiles and Cardinality",
    ).optional(),
    Values: z.array(z.string()).describe(
      "Fleet Indexing aggregation type values",
    ).optional(),
  }).describe("Aggregation types supported by Fleet Indexing").optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource",
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

/** Swamp extension model for IoT FleetMetric. Registered at `@swamp/aws/iot/fleet-metric`. */
export const model = {
  type: "@swamp/aws/iot/fleet-metric",
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
      description: "IoT FleetMetric resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a IoT FleetMetric",
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
          "AWS::IoT::FleetMetric",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.MetricName ?? g.MetricName)?.toString() ?? "current")
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
      description: "Get a IoT FleetMetric",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoT FleetMetric",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::IoT::FleetMetric",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.MetricName ?? context.globalArgs.MetricName)?.toString() ??
            args.identifier).replace(/[\/\\]/g, "_").replace(/\.\./g, "_")
            .replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a IoT FleetMetric",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.MetricName?.toString() ?? "current").replace(
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
        const identifier = existing.MetricName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::IoT::FleetMetric",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::IoT::FleetMetric",
          identifier,
          currentState,
          desiredState,
          ["MetricName"],
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
      description: "Delete a IoT FleetMetric",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoT FleetMetric",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::IoT::FleetMetric",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.MetricName?.toString() ?? args.identifier)
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
      description: "Sync IoT FleetMetric state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.MetricName?.toString() ?? "current").replace(
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
        const identifier = existing.MetricName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::IoT::FleetMetric",
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
