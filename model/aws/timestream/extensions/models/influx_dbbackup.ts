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

// Auto-generated extension model for @swamp/aws/timestream/influx-dbbackup
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Timestream InfluxDBBackup (AWS::Timestream::InfluxDBBackup).
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

const S3ConfigurationSchema = z.object({
  BucketName: z.string().min(3).max(63).regex(
    new RegExp("^[0-9a-z]+[0-9a-z\\.\\-]*[0-9a-z]+$"),
  ).describe("The name of the S3 bucket to deliver logs to."),
  Enabled: z.boolean().describe(
    "Indicates whether log delivery to the S3 bucket is enabled.",
  ),
});

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
  Name: z.string().min(3).max(40).regex(
    new RegExp("^[a-zA-Z][a-zA-Z0-9]*(-[a-zA-Z0-9]+)*$"),
  ).describe(
    "The name of the backup. Must be unique within the account and region.",
  ),
  DbResourceId: z.string().min(3).max(64).regex(new RegExp("^[a-zA-Z0-9]+$"))
    .describe("The id of the DB instance or DB cluster to back up."),
  RetentionDays: z.number().int().min(1).max(3650).describe(
    "The number of days to retain the backup. Valid values are 1 to 3650.",
  ).optional(),
  ClusterConfiguration: z.object({
    IngestQueryInstances: z.number().int().describe(
      "The number of ingest and query instances in the cluster.",
    ).optional(),
    QueryOnlyInstances: z.number().int().describe(
      "The number of query-only instances in the cluster.",
    ).optional(),
    DedicatedCompactor: z.boolean().describe(
      "Indicates if the compactor instance is a standalone instance or not.",
    ).optional(),
  }).describe(
    "The cluster configuration of the resource at the time of backup.",
  ).optional(),
  LogDeliveryConfiguration: z.object({
    S3Configuration: S3ConfigurationSchema.describe(
      "Configuration for S3 bucket log delivery.",
    ),
  }).describe(
    "The log delivery configuration of the resource at the time of backup.",
  ).optional(),
  MaintenanceSchedule: z.object({
    Timezone: z.string().min(1).max(64).regex(
      new RegExp("^(UTC|[A-Za-z_]+/[A-Za-z0-9_]+(/[A-Za-z0-9_]+)?)$"),
    ).describe("The IANA timezone identifier for the maintenance window."),
    PreferredMaintenanceWindow: z.string().min(0).max(19).regex(
      new RegExp(
        "^$|^(Mon|Tue|Wed|Thu|Fri|Sat|Sun):([01]\\d|2[0-3]):[0-5]\\d-(Mon|Tue|Wed|Thu|Fri|Sat|Sun):([01]\\d|2[0-3]):[0-5]\\d$",
      ),
    ).describe(
      "The preferred maintenance window in the format ddd:HH:MM-ddd:HH:MM.",
    ),
  }).describe("The maintenance schedule of the resource at the time of backup.")
    .optional(),
  Tags: z.array(TagSchema).describe(
    "A list of key-value pairs to associate with the backup.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  Id: z.string().optional(),
  Name: z.string().optional(),
  DbResourceId: z.string().optional(),
  RetentionDays: z.number().optional(),
  Status: z.string().optional(),
  Type: z.string().optional(),
  CreatedAt: z.string().optional(),
  ExpiresAfter: z.string().optional(),
  EngineType: z.string().optional(),
  DeploymentType: z.string().optional(),
  KmsKeyId: z.string().optional(),
  ClusterConfiguration: z.object({
    IngestQueryInstances: z.number(),
    QueryOnlyInstances: z.number(),
    DedicatedCompactor: z.boolean(),
  }).optional(),
  DbParameterGroupId: z.string().optional(),
  DbInstanceType: z.string().optional(),
  LogDeliveryConfiguration: z.object({
    S3Configuration: S3ConfigurationSchema,
  }).optional(),
  FailoverMode: z.string().optional(),
  DbStorageType: z.string().optional(),
  AllocatedStorage: z.number().optional(),
  VpcSubnetIds: z.array(z.string()).optional(),
  VpcSecurityGroupIds: z.array(z.string()).optional(),
  PubliclyAccessible: z.boolean().optional(),
  Port: z.number().optional(),
  NetworkType: z.string().optional(),
  InfluxAuthParametersSecretArn: z.string().optional(),
  MaintenanceSchedule: z.object({
    Timezone: z.string(),
    PreferredMaintenanceWindow: z.string(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().min(3).max(40).regex(
    new RegExp("^[a-zA-Z][a-zA-Z0-9]*(-[a-zA-Z0-9]+)*$"),
  ).describe(
    "The name of the backup. Must be unique within the account and region.",
  ).optional(),
  DbResourceId: z.string().min(3).max(64).regex(new RegExp("^[a-zA-Z0-9]+$"))
    .describe("The id of the DB instance or DB cluster to back up.").optional(),
  RetentionDays: z.number().int().min(1).max(3650).describe(
    "The number of days to retain the backup. Valid values are 1 to 3650.",
  ).optional(),
  ClusterConfiguration: z.object({
    IngestQueryInstances: z.number().int().describe(
      "The number of ingest and query instances in the cluster.",
    ).optional(),
    QueryOnlyInstances: z.number().int().describe(
      "The number of query-only instances in the cluster.",
    ).optional(),
    DedicatedCompactor: z.boolean().describe(
      "Indicates if the compactor instance is a standalone instance or not.",
    ).optional(),
  }).describe(
    "The cluster configuration of the resource at the time of backup.",
  ).optional(),
  LogDeliveryConfiguration: z.object({
    S3Configuration: S3ConfigurationSchema.describe(
      "Configuration for S3 bucket log delivery.",
    ).optional(),
  }).describe(
    "The log delivery configuration of the resource at the time of backup.",
  ).optional(),
  MaintenanceSchedule: z.object({
    Timezone: z.string().min(1).max(64).regex(
      new RegExp("^(UTC|[A-Za-z_]+/[A-Za-z0-9_]+(/[A-Za-z0-9_]+)?)$"),
    ).describe("The IANA timezone identifier for the maintenance window.")
      .optional(),
    PreferredMaintenanceWindow: z.string().min(0).max(19).regex(
      new RegExp(
        "^$|^(Mon|Tue|Wed|Thu|Fri|Sat|Sun):([01]\\d|2[0-3]):[0-5]\\d-(Mon|Tue|Wed|Thu|Fri|Sat|Sun):([01]\\d|2[0-3]):[0-5]\\d$",
      ),
    ).describe(
      "The preferred maintenance window in the format ddd:HH:MM-ddd:HH:MM.",
    ).optional(),
  }).describe("The maintenance schedule of the resource at the time of backup.")
    .optional(),
  Tags: z.array(TagSchema).describe(
    "A list of key-value pairs to associate with the backup.",
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

/** Swamp extension model for Timestream InfluxDBBackup. Registered at `@swamp/aws/timestream/influx-dbbackup`. */
export const model = {
  type: "@swamp/aws/timestream/influx-dbbackup",
  version: "2026.10.15.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Timestream InfluxDBBackup resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Timestream InfluxDBBackup",
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
          "AWS::Timestream::InfluxDBBackup",
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
      description: "Get a Timestream InfluxDBBackup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Timestream InfluxDBBackup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Timestream::InfluxDBBackup",
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
      description: "Update a Timestream InfluxDBBackup",
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
          "AWS::Timestream::InfluxDBBackup",
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
          "AWS::Timestream::InfluxDBBackup",
          identifier,
          currentState,
          desiredState,
          ["Name", "DbResourceId", "RetentionDays"],
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
      description: "Delete a Timestream InfluxDBBackup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Timestream InfluxDBBackup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Timestream::InfluxDBBackup",
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
      description: "Sync Timestream InfluxDBBackup state from AWS",
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
            "AWS::Timestream::InfluxDBBackup",
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
      description: "List Timestream InfluxDBBackup resources",
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
          "AWS::Timestream::InfluxDBBackup",
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
