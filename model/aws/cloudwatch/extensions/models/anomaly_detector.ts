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

// Auto-generated extension model for @swamp/aws/cloudwatch/anomaly-detector
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for CloudWatch AnomalyDetector (AWS::CloudWatch::AnomalyDetector).
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

const RangeSchema = z.object({
  EndTime: z.string().regex(
    new RegExp(
      "^([0-9]{4})-([0-1][0-9])-([0-3][0-9])T([0-1][0-9]|[2][0-3]):([0-5][0-9]):([0-5][0-9])$",
    ),
  ),
  StartTime: z.string().regex(
    new RegExp(
      "^([0-9]{4})-([0-1][0-9])-([0-3][0-9])T([0-1][0-9]|[2][0-3]):([0-5][0-9]):([0-5][0-9])$",
    ),
  ),
});

const DimensionSchema = z.object({
  Value: z.string().min(1).max(1024),
  Name: z.string().min(1).max(255),
});

const MetricSchema = z.object({
  MetricName: z.string().min(1).max(255),
  Dimensions: z.array(DimensionSchema).optional(),
  Namespace: z.string().min(1).max(255).regex(new RegExp("[^:].*")),
});

const MetricStatSchema = z.object({
  Period: z.number().int().min(1),
  Metric: MetricSchema,
  Stat: z.string().regex(
    new RegExp(
      "^(Minimum|Maximum|Sum|Average|SampleCount|(p|tm)[0-9]{1,2}|(p|tm)[0-9]{1,2}\\.[0-9]{1,2}|(p|tm)100)$",
    ),
  ),
  Unit: z.string().regex(
    new RegExp(
      "^(Seconds|Microseconds|Milliseconds|Bytes|Kilobytes|Megabytes|Gigabytes|Terabytes|Bits|Kilobits|Megabits|Gigabits|Terabits|Percent|Count|Bytes/Second|Kilobytes/Second|Megabytes/Second|Gigabytes/Second|Terabytes/Second|Bits/Second|Kilobits/Second|Megabits/Second|Gigabits/Second|Terabits/Second|Count/Second|None)$",
    ),
  ).optional(),
});

const MetricDataQuerySchema = z.object({
  AccountId: z.string().min(1).max(255).optional(),
  ReturnData: z.boolean().optional(),
  Expression: z.string().min(1).max(1024).optional(),
  MetricStat: MetricStatSchema.optional(),
  Label: z.string().optional(),
  Period: z.number().int().min(1).optional(),
  Id: z.string().min(1).max(255),
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
  MetricCharacteristics: z.object({
    PeriodicSpikes: z.boolean().optional(),
  }).optional(),
  MetricName: z.string().min(1).max(255).optional(),
  Stat: z.string().regex(
    new RegExp(
      "^(Minimum|Maximum|Sum|Average|SampleCount|(p|tm)[0-9]{1,2}|(p|tm)[0-9]{1,2}\\.[0-9]{1,2}|(p|tm)100)$",
    ),
  ).optional(),
  Configuration: z.object({
    MetricTimeZone: z.string().optional(),
    ExcludedTimeRanges: z.array(RangeSchema).optional(),
  }).optional(),
  MetricMathAnomalyDetector: z.object({
    MetricDataQueries: z.array(MetricDataQuerySchema).optional(),
  }).optional(),
  Dimensions: z.array(DimensionSchema).optional(),
  Namespace: z.string().min(1).max(255).regex(new RegExp("[^:].*")).optional(),
  SingleMetricAnomalyDetector: z.object({
    MetricName: z.string().min(1).max(255).optional(),
    Dimensions: z.array(DimensionSchema).optional(),
    AccountId: z.string().min(1).max(255).optional(),
    Stat: z.string().regex(
      new RegExp(
        "^(Minimum|Maximum|Sum|Average|SampleCount|(p|tm)[0-9]{1,2}|(p|tm)[0-9]{1,2}\\.[0-9]{1,2}|(p|tm)100)$",
      ),
    ).optional(),
    Namespace: z.string().min(1).max(255).regex(new RegExp("[^:].*"))
      .optional(),
  }).optional(),
});

const StateSchema = z.object({
  MetricCharacteristics: z.object({
    PeriodicSpikes: z.boolean(),
  }).optional(),
  AnomalyDetectorId: z.string(),
  MetricName: z.string().optional(),
  Stat: z.string().optional(),
  Configuration: z.object({
    MetricTimeZone: z.string(),
    ExcludedTimeRanges: z.array(RangeSchema),
  }).optional(),
  MetricMathAnomalyDetector: z.object({
    MetricDataQueries: z.array(MetricDataQuerySchema),
  }).optional(),
  Dimensions: z.array(DimensionSchema).optional(),
  Namespace: z.string().optional(),
  SingleMetricAnomalyDetector: z.object({
    MetricName: z.string(),
    Dimensions: z.array(DimensionSchema),
    AccountId: z.string(),
    Stat: z.string(),
    Namespace: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  MetricCharacteristics: z.object({
    PeriodicSpikes: z.boolean().optional(),
  }).optional(),
  MetricName: z.string().min(1).max(255).optional(),
  Stat: z.string().regex(
    new RegExp(
      "^(Minimum|Maximum|Sum|Average|SampleCount|(p|tm)[0-9]{1,2}|(p|tm)[0-9]{1,2}\\.[0-9]{1,2}|(p|tm)100)$",
    ),
  ).optional(),
  Configuration: z.object({
    MetricTimeZone: z.string().optional(),
    ExcludedTimeRanges: z.array(RangeSchema).optional(),
  }).optional(),
  MetricMathAnomalyDetector: z.object({
    MetricDataQueries: z.array(MetricDataQuerySchema).optional(),
  }).optional(),
  Dimensions: z.array(DimensionSchema).optional(),
  Namespace: z.string().min(1).max(255).regex(new RegExp("[^:].*")).optional(),
  SingleMetricAnomalyDetector: z.object({
    MetricName: z.string().min(1).max(255).optional(),
    Dimensions: z.array(DimensionSchema).optional(),
    AccountId: z.string().min(1).max(255).optional(),
    Stat: z.string().regex(
      new RegExp(
        "^(Minimum|Maximum|Sum|Average|SampleCount|(p|tm)[0-9]{1,2}|(p|tm)[0-9]{1,2}\\.[0-9]{1,2}|(p|tm)100)$",
      ),
    ).optional(),
    Namespace: z.string().min(1).max(255).regex(new RegExp("[^:].*"))
      .optional(),
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

/** Swamp extension model for CloudWatch AnomalyDetector. Registered at `@swamp/aws/cloudwatch/anomaly-detector`. */
export const model = {
  type: "@swamp/aws/cloudwatch/anomaly-detector",
  version: "2026.10.07.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "CloudWatch AnomalyDetector resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CloudWatch AnomalyDetector",
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
          "AWS::CloudWatch::AnomalyDetector",
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
      description: "Get a CloudWatch AnomalyDetector",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudWatch AnomalyDetector",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::CloudWatch::AnomalyDetector",
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
      description: "Update a CloudWatch AnomalyDetector",
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
        const identifier = existing.AnomalyDetectorId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::CloudWatch::AnomalyDetector",
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
          "AWS::CloudWatch::AnomalyDetector",
          identifier,
          currentState,
          desiredState,
          [
            "Dimensions",
            "MetricCharacteristics",
            "MetricName",
            "Namespace",
            "SingleMetricAnomalyDetector",
            "MetricMathAnomalyDetector",
            "Stat",
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
      description: "Delete a CloudWatch AnomalyDetector",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudWatch AnomalyDetector",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::CloudWatch::AnomalyDetector",
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
      description: "Sync CloudWatch AnomalyDetector state from AWS",
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
        const identifier = existing.AnomalyDetectorId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::CloudWatch::AnomalyDetector",
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
      description: "List CloudWatch AnomalyDetector resources",
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
          "AWS::CloudWatch::AnomalyDetector",
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
            (item.properties?.AnomalyDetectorId?.toString() ?? item.identifier)
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
