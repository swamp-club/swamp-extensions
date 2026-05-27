// Auto-generated extension model for @swamp/aws/omics/sequence-store
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Omics SequenceStore (AWS::Omics::SequenceStore).
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

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  AccessLogLocation: z.string().regex(
    new RegExp("^$|^s3://([a-z0-9][a-z0-9-.]{1,61}[a-z0-9])/?((.{1,800})/)?$"),
  ).describe("Location of the access logs.").optional(),
  Description: z.string().min(1).max(255).regex(
    new RegExp("^[\\p{L}||\\p{M}||\\p{Z}||\\p{S}||\\p{N}||\\p{P}]+$", "u"),
  ).describe("A description for the store.").optional(),
  ETagAlgorithmFamily: z.enum(["MD5up", "SHA256up", "SHA512up"]).optional(),
  FallbackLocation: z.string().min(0).regex(
    new RegExp("^$|^s3://([a-z0-9][a-z0-9-.]{1,61}[a-z0-9])/?((.{1,1024})/)?$"),
  ).describe(
    "An S3 location that is used to store files that have failed a direct upload.",
  ).optional(),
  Name: z.string().min(1).max(127).regex(
    new RegExp("^[\\p{L}||\\p{M}||\\p{Z}||\\p{S}||\\p{N}||\\p{P}]+$", "u"),
  ).describe("A name for the store."),
  PropagatedSetLevelTags: z.array(z.string().min(1).max(128)).describe(
    "The tags keys to propagate to the S3 objects associated with read sets in the sequence store.",
  ).optional(),
  S3AccessPolicy: z.record(z.string(), z.unknown()).describe(
    "The resource policy that controls S3 access on the store",
  ).optional(),
  SseConfig: z.object({
    Type: z.enum(["KMS"]),
    KeyArn: z.string().min(20).max(2048).regex(
      new RegExp("arn:([^:\n]*):([^:\n]*):([^:\n]*):([0-9]{12}):([^:\n]*)"),
    ).describe("An encryption key ARN.").optional(),
  }).describe("Server-side encryption (SSE) settings for a store.").optional(),
  Tags: z.record(z.string(), z.string().min(0).max(256)).optional(),
});

const StateSchema = z.object({
  AccessLogLocation: z.string().optional(),
  Arn: z.string().optional(),
  CreationTime: z.string().optional(),
  Description: z.string().optional(),
  ETagAlgorithmFamily: z.string().optional(),
  FallbackLocation: z.string().optional(),
  Name: z.string().optional(),
  PropagatedSetLevelTags: z.array(z.string()).optional(),
  S3AccessPointArn: z.string().optional(),
  S3AccessPolicy: z.record(z.string(), z.unknown()).optional(),
  S3Uri: z.string().optional(),
  SequenceStoreId: z.string(),
  SseConfig: z.object({
    Type: z.string(),
    KeyArn: z.string(),
  }).optional(),
  Status: z.string().optional(),
  StatusMessage: z.string().optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
  UpdateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  AccessLogLocation: z.string().regex(
    new RegExp("^$|^s3://([a-z0-9][a-z0-9-.]{1,61}[a-z0-9])/?((.{1,800})/)?$"),
  ).describe("Location of the access logs.").optional(),
  Description: z.string().min(1).max(255).regex(
    new RegExp("^[\\p{L}||\\p{M}||\\p{Z}||\\p{S}||\\p{N}||\\p{P}]+$", "u"),
  ).describe("A description for the store.").optional(),
  ETagAlgorithmFamily: z.enum(["MD5up", "SHA256up", "SHA512up"]).optional(),
  FallbackLocation: z.string().min(0).regex(
    new RegExp("^$|^s3://([a-z0-9][a-z0-9-.]{1,61}[a-z0-9])/?((.{1,1024})/)?$"),
  ).describe(
    "An S3 location that is used to store files that have failed a direct upload.",
  ).optional(),
  Name: z.string().min(1).max(127).regex(
    new RegExp("^[\\p{L}||\\p{M}||\\p{Z}||\\p{S}||\\p{N}||\\p{P}]+$", "u"),
  ).describe("A name for the store.").optional(),
  PropagatedSetLevelTags: z.array(z.string().min(1).max(128)).describe(
    "The tags keys to propagate to the S3 objects associated with read sets in the sequence store.",
  ).optional(),
  S3AccessPolicy: z.record(z.string(), z.unknown()).describe(
    "The resource policy that controls S3 access on the store",
  ).optional(),
  SseConfig: z.object({
    Type: z.enum(["KMS"]).optional(),
    KeyArn: z.string().min(20).max(2048).regex(
      new RegExp("arn:([^:\n]*):([^:\n]*):([^:\n]*):([0-9]{12}):([^:\n]*)"),
    ).describe("An encryption key ARN.").optional(),
  }).describe("Server-side encryption (SSE) settings for a store.").optional(),
  Tags: z.record(z.string(), z.string().min(0).max(256)).optional(),
});

/** Swamp extension model for Omics SequenceStore. Registered at `@swamp/aws/omics/sequence-store`. */
export const model = {
  type: "@swamp/aws/omics/sequence-store",
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
      description: "Omics SequenceStore resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Omics SequenceStore",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Omics::SequenceStore",
          desiredState,
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
      description: "Get a Omics SequenceStore",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Omics SequenceStore",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Omics::SequenceStore",
          args.identifier,
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
      description: "Update a Omics SequenceStore",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
        const identifier = existing.SequenceStoreId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Omics::SequenceStore",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Omics::SequenceStore",
          identifier,
          currentState,
          desiredState,
          ["ETagAlgorithmFamily", "SseConfig"],
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
      description: "Delete a Omics SequenceStore",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Omics SequenceStore",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Omics::SequenceStore",
          args.identifier,
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
      description: "Sync Omics SequenceStore state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
        const identifier = existing.SequenceStoreId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Omics::SequenceStore",
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
