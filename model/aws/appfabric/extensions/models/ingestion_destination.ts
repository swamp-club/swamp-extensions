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

// Auto-generated extension model for @swamp/aws/appfabric/ingestion-destination
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for AppFabric IngestionDestination (AWS::AppFabric::IngestionDestination).
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

const AuditLogProcessingConfigurationSchema = z.object({
  Schema: z.enum(["ocsf", "raw"]).describe(
    "The event schema in which the audit logs need to be formatted.",
  ),
  Format: z.enum(["json", "parquet"]).describe(
    "The format in which the audit logs need to be formatted.",
  ),
});

const S3BucketSchema = z.object({
  BucketName: z.string().min(3).max(63).describe(
    "The name of the Amazon S3 bucket.",
  ),
  Prefix: z.string().min(1).max(120).describe("The object key to use.")
    .optional(),
});

const FirehoseStreamSchema = z.object({
  StreamName: z.string().min(3).max(64).describe(
    "The name of the Amazon Kinesis Data Firehose delivery stream.",
  ),
});

const DestinationSchema = z.object({
  S3Bucket: S3BucketSchema.describe(
    "Contains information about an Amazon S3 bucket.",
  ).optional(),
  FirehoseStream: FirehoseStreamSchema.describe(
    "Contains information about an Amazon Kinesis Data Firehose delivery stream.",
  ).optional(),
});

const AuditLogDestinationConfigurationSchema = z.object({
  Destination: DestinationSchema.describe(
    "Contains information about an audit log destination.",
  ),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe("Tag key."),
  Value: z.string().min(0).max(256).describe("Tag value."),
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
  AppBundleArn: z.string().min(1).max(1011).regex(new RegExp("^arn:.+$"))
    .describe("The Amazon Resource Name (ARN) of the app bundle."),
  IngestionArn: z.string().min(1).max(1011).regex(new RegExp("^arn:.+$"))
    .describe("The Amazon Resource Name (ARN) of the ingestion."),
  ProcessingConfiguration: z.object({
    AuditLog: AuditLogProcessingConfigurationSchema.describe(
      "Contains information about an audit log processing configuration.",
    ),
  }).describe("Contains information about how ingested data is processed."),
  DestinationConfiguration: z.object({
    AuditLog: AuditLogDestinationConfigurationSchema.describe(
      "Contains information about an audit log destination configuration.",
    ),
  }).describe("Contains information about the destination of ingested data."),
  Tags: z.array(TagSchema).describe(
    "A map of the key-value pairs of the tag or tags to assign to the resource.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  AppBundleArn: z.string().optional(),
  IngestionArn: z.string().optional(),
  ProcessingConfiguration: z.object({
    AuditLog: AuditLogProcessingConfigurationSchema,
  }).optional(),
  DestinationConfiguration: z.object({
    AuditLog: AuditLogDestinationConfigurationSchema,
  }).optional(),
  Status: z.string().optional(),
  CreatedAt: z.string().optional(),
  UpdatedAt: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AppBundleArn: z.string().min(1).max(1011).regex(new RegExp("^arn:.+$"))
    .describe("The Amazon Resource Name (ARN) of the app bundle.").optional(),
  IngestionArn: z.string().min(1).max(1011).regex(new RegExp("^arn:.+$"))
    .describe("The Amazon Resource Name (ARN) of the ingestion.").optional(),
  ProcessingConfiguration: z.object({
    AuditLog: AuditLogProcessingConfigurationSchema.describe(
      "Contains information about an audit log processing configuration.",
    ).optional(),
  }).describe("Contains information about how ingested data is processed.")
    .optional(),
  DestinationConfiguration: z.object({
    AuditLog: AuditLogDestinationConfigurationSchema.describe(
      "Contains information about an audit log destination configuration.",
    ).optional(),
  }).describe("Contains information about the destination of ingested data.")
    .optional(),
  Tags: z.array(TagSchema).describe(
    "A map of the key-value pairs of the tag or tags to assign to the resource.",
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

/** Swamp extension model for AppFabric IngestionDestination. Registered at `@swamp/aws/appfabric/ingestion-destination`. */
export const model = {
  type: "@swamp/aws/appfabric/ingestion-destination",
  version: "2026.10.09.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "AppFabric IngestionDestination resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a AppFabric IngestionDestination",
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
          "AWS::AppFabric::IngestionDestination",
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
      description: "Get a AppFabric IngestionDestination",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AppFabric IngestionDestination",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::AppFabric::IngestionDestination",
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
      description: "Update a AppFabric IngestionDestination",
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
          "AWS::AppFabric::IngestionDestination",
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
          "AWS::AppFabric::IngestionDestination",
          identifier,
          currentState,
          desiredState,
          ["AppBundleArn", "IngestionArn", "ProcessingConfiguration"],
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
      description: "Delete a AppFabric IngestionDestination",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AppFabric IngestionDestination",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::AppFabric::IngestionDestination",
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
      description: "Sync AppFabric IngestionDestination state from AWS",
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
            "AWS::AppFabric::IngestionDestination",
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
      description: "List AppFabric IngestionDestination resources",
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
          "AWS::AppFabric::IngestionDestination",
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
