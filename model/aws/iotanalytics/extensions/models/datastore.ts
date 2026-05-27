// Auto-generated extension model for @swamp/aws/iotanalytics/datastore
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for IoTAnalytics Datastore (AWS::IoTAnalytics::Datastore).
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

const CustomerManagedS3Schema = z.object({
  Bucket: z.string().min(3).max(255).regex(new RegExp("[a-zA-Z0-9.\\-_]*")),
  RoleArn: z.string().min(20).max(2048),
  KeyPrefix: z.string().min(1).max(255).regex(
    new RegExp("[a-zA-Z0-9!_.*'()/{}:-]*/"),
  ).optional(),
});

const CustomerManagedS3StorageSchema = z.object({
  Bucket: z.string().min(3).max(255).regex(new RegExp("[a-zA-Z0-9.\\-_]*")),
  KeyPrefix: z.string().min(1).max(255).regex(
    new RegExp("[a-zA-Z0-9!_.*'()/{}:-]*/"),
  ).optional(),
});

const IotSiteWiseMultiLayerStorageSchema = z.object({
  CustomerManagedS3Storage: CustomerManagedS3StorageSchema.optional(),
});

const PartitionSchema = z.object({
  AttributeName: z.string().regex(new RegExp("[a-zA-Z0-9_]+")),
});

const TimestampPartitionSchema = z.object({
  AttributeName: z.string().regex(new RegExp("[a-zA-Z0-9_]+")),
  TimestampFormat: z.string().regex(new RegExp("[a-zA-Z0-9\\s\\[\\]_,.'/:-]*"))
    .optional(),
});

const DatastorePartitionSchema = z.object({
  Partition: PartitionSchema.optional(),
  TimestampPartition: TimestampPartitionSchema.optional(),
});

const ColumnSchema = z.object({
  Type: z.string(),
  Name: z.string(),
});

const SchemaDefinitionSchema = z.object({
  Columns: z.array(ColumnSchema).optional(),
});

const ParquetConfigurationSchema = z.object({
  SchemaDefinition: SchemaDefinitionSchema.optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128),
  Value: z.string().min(1).max(256),
});

const GlobalArgsSchema = z.object({
  DatastoreStorage: z.object({
    ServiceManagedS3: z.record(z.string(), z.unknown()).optional(),
    CustomerManagedS3: CustomerManagedS3Schema.optional(),
    IotSiteWiseMultiLayerStorage: IotSiteWiseMultiLayerStorageSchema.optional(),
  }).optional(),
  DatastoreName: z.string().min(1).max(128).regex(new RegExp("[a-zA-Z0-9_]+"))
    .optional(),
  DatastorePartitions: z.object({
    Partitions: z.array(DatastorePartitionSchema).optional(),
  }).optional(),
  FileFormatConfiguration: z.object({
    JsonConfiguration: z.record(z.string(), z.unknown()).optional(),
    ParquetConfiguration: ParquetConfigurationSchema.optional(),
  }).optional(),
  RetentionPeriod: z.object({
    NumberOfDays: z.number().int().min(1).max(2147483647).optional(),
    Unlimited: z.boolean().optional(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  DatastoreStorage: z.object({
    ServiceManagedS3: z.record(z.string(), z.unknown()),
    CustomerManagedS3: CustomerManagedS3Schema,
    IotSiteWiseMultiLayerStorage: IotSiteWiseMultiLayerStorageSchema,
  }).optional(),
  DatastoreName: z.string(),
  DatastorePartitions: z.object({
    Partitions: z.array(DatastorePartitionSchema),
  }).optional(),
  Id: z.string().optional(),
  FileFormatConfiguration: z.object({
    JsonConfiguration: z.record(z.string(), z.unknown()),
    ParquetConfiguration: ParquetConfigurationSchema,
  }).optional(),
  RetentionPeriod: z.object({
    NumberOfDays: z.number(),
    Unlimited: z.boolean(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  DatastoreStorage: z.object({
    ServiceManagedS3: z.record(z.string(), z.unknown()).optional(),
    CustomerManagedS3: CustomerManagedS3Schema.optional(),
    IotSiteWiseMultiLayerStorage: IotSiteWiseMultiLayerStorageSchema.optional(),
  }).optional(),
  DatastoreName: z.string().min(1).max(128).regex(new RegExp("[a-zA-Z0-9_]+"))
    .optional(),
  DatastorePartitions: z.object({
    Partitions: z.array(DatastorePartitionSchema).optional(),
  }).optional(),
  FileFormatConfiguration: z.object({
    JsonConfiguration: z.record(z.string(), z.unknown()).optional(),
    ParquetConfiguration: ParquetConfigurationSchema.optional(),
  }).optional(),
  RetentionPeriod: z.object({
    NumberOfDays: z.number().int().min(1).max(2147483647).optional(),
    Unlimited: z.boolean().optional(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
});

/** Swamp extension model for IoTAnalytics Datastore. Registered at `@swamp/aws/iotanalytics/datastore`. */
export const model = {
  type: "@swamp/aws/iotanalytics/datastore",
  version: "2026.05.27.1",
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
      toVersion: "2026.05.27.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "IoTAnalytics Datastore resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a IoTAnalytics Datastore",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::IoTAnalytics::Datastore",
          desiredState,
        ) as StateData;
        const instanceName =
          ((result.DatastoreName ?? g.DatastoreName)?.toString() ?? "current")
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
      description: "Get a IoTAnalytics Datastore",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoTAnalytics Datastore",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::IoTAnalytics::Datastore",
          args.identifier,
        ) as StateData;
        const instanceName =
          ((result.DatastoreName ?? context.globalArgs.DatastoreName)
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
      description: "Update a IoTAnalytics Datastore",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.DatastoreName?.toString() ?? "current").replace(
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
        const identifier = existing.DatastoreName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::IoTAnalytics::Datastore",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::IoTAnalytics::Datastore",
          identifier,
          currentState,
          desiredState,
          ["DatastoreName"],
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
      description: "Delete a IoTAnalytics Datastore",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoTAnalytics Datastore",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::IoTAnalytics::Datastore",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.DatastoreName?.toString() ?? args.identifier)
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
      description: "Sync IoTAnalytics Datastore state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.DatastoreName?.toString() ?? "current").replace(
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
        const identifier = existing.DatastoreName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::IoTAnalytics::Datastore",
            identifier,
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
