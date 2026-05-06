// Auto-generated extension model for @swamp/aws/cloudfront/trust-store
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for CloudFront TrustStore (AWS::CloudFront::TrustStore).
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

const CaCertificatesBundleS3LocationSchema = z.object({
  Bucket: z.string().describe("The S3 bucket."),
  Key: z.string().describe("The location's key."),
  Region: z.string().describe("The location's Region."),
  Version: z.string().describe("The location's version.").optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^([\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]*)$", "u"),
  ).describe(
    "A string that contains Tag key. The string length should be between 1 and 128 characters. Valid characters include a-z, A-Z, 0-9, space, and the special characters _ -.: / = + @.",
  ),
  Value: z.string().min(0).max(256).regex(
    new RegExp("^([\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]*)$", "u"),
  ).describe(
    "A string that contains an optional Tag value. The string length should be between 0 and 256 characters. Valid characters include a-z, A-Z, 0-9, space, and the special characters _ -.: / = + @.",
  ),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Name: z.string().describe("The trust store's name."),
  CaCertificatesBundleSource: z.object({
    CaCertificatesBundleS3Location: CaCertificatesBundleS3LocationSchema
      .describe("The CA certificates bundle location in Amazon S3."),
  }).describe("A CA certificates bundle source.").optional(),
  UseClientCertificateOCSPEndpoint: z.boolean().optional(),
  Tags: z.array(TagSchema).describe(
    "A complex type that contains zero or more Tag elements.",
  ).optional(),
});

const StateSchema = z.object({
  Id: z.string(),
  Name: z.string().optional(),
  Arn: z.string().optional(),
  CaCertificatesBundleSource: z.object({
    CaCertificatesBundleS3Location: CaCertificatesBundleS3LocationSchema,
  }).optional(),
  UseClientCertificateOCSPEndpoint: z.boolean().optional(),
  Status: z.string().optional(),
  ETag: z.string().optional(),
  LastModifiedTime: z.string().optional(),
  NumberOfCaCertificates: z.number().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Name: z.string().describe("The trust store's name.").optional(),
  CaCertificatesBundleSource: z.object({
    CaCertificatesBundleS3Location: CaCertificatesBundleS3LocationSchema
      .describe("The CA certificates bundle location in Amazon S3.").optional(),
  }).describe("A CA certificates bundle source.").optional(),
  UseClientCertificateOCSPEndpoint: z.boolean().optional(),
  Tags: z.array(TagSchema).describe(
    "A complex type that contains zero or more Tag elements.",
  ).optional(),
});

/** Swamp extension model for CloudFront TrustStore. Registered at `@swamp/aws/cloudfront/trust-store`. */
export const model = {
  type: "@swamp/aws/cloudfront/trust-store",
  version: "2026.05.06.1",
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
      toVersion: "2026.05.06.1",
      description: "Added: UseClientCertificateOCSPEndpoint",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "CloudFront TrustStore resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CloudFront TrustStore",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::CloudFront::TrustStore",
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
      description: "Get a CloudFront TrustStore",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudFront TrustStore",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::CloudFront::TrustStore",
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
      description: "Update a CloudFront TrustStore",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::CloudFront::TrustStore",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::CloudFront::TrustStore",
          identifier,
          currentState,
          desiredState,
          ["Name"],
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
      description: "Delete a CloudFront TrustStore",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudFront TrustStore",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::CloudFront::TrustStore",
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
      description: "Sync CloudFront TrustStore state from AWS",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::CloudFront::TrustStore",
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
