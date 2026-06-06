// Auto-generated extension model for @swamp/aws/config/conformance-pack
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Config ConformancePack (AWS::Config::ConformancePack).
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

const ConformancePackInputParameterSchema = z.object({
  ParameterName: z.string().min(0).max(255).describe(
    "Key part of key-value pair with value being parameter value",
  ),
  ParameterValue: z.string().min(0).max(4096).describe(
    "Value part of key-value pair with key being parameter Name",
  ),
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
  ConformancePackName: z.string().min(1).max(256).regex(
    new RegExp("[a-zA-Z][-a-zA-Z0-9]*"),
  ).describe(
    "Name of the conformance pack which will be assigned as the unique identifier.",
  ),
  DeliveryS3Bucket: z.string().min(0).max(63).describe(
    "AWS Config stores intermediate files while processing conformance pack template.",
  ).optional(),
  DeliveryS3KeyPrefix: z.string().min(0).max(1024).describe(
    "The prefix for delivery S3 bucket.",
  ).optional(),
  TemplateBody: z.string().min(1).max(51200).describe(
    "A string containing full conformance pack template body. You can only specify one of the template body or template S3Uri fields.",
  ).optional(),
  TemplateS3Uri: z.string().min(1).max(1024).regex(new RegExp("s3://.*"))
    .describe(
      "Location of file containing the template body which points to the conformance pack template that is located in an Amazon S3 bucket. You can only specify one of the template body or template S3Uri fields.",
    ).optional(),
  TemplateSSMDocumentDetails: z.object({
    DocumentName: z.string().min(3).max(128).optional(),
    DocumentVersion: z.string().min(1).max(128).optional(),
  }).describe(
    "The TemplateSSMDocumentDetails object contains the name of the SSM document and the version of the SSM document.",
  ).optional(),
  ConformancePackInputParameters: z.array(ConformancePackInputParameterSchema)
    .describe("A list of ConformancePackInputParameter objects.").optional(),
});

const StateSchema = z.object({
  ConformancePackName: z.string(),
  DeliveryS3Bucket: z.string().optional(),
  DeliveryS3KeyPrefix: z.string().optional(),
  TemplateBody: z.string().optional(),
  TemplateS3Uri: z.string().optional(),
  TemplateSSMDocumentDetails: z.object({
    DocumentName: z.string(),
    DocumentVersion: z.string(),
  }).optional(),
  ConformancePackInputParameters: z.array(ConformancePackInputParameterSchema)
    .optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  ConformancePackName: z.string().min(1).max(256).regex(
    new RegExp("[a-zA-Z][-a-zA-Z0-9]*"),
  ).describe(
    "Name of the conformance pack which will be assigned as the unique identifier.",
  ).optional(),
  DeliveryS3Bucket: z.string().min(0).max(63).describe(
    "AWS Config stores intermediate files while processing conformance pack template.",
  ).optional(),
  DeliveryS3KeyPrefix: z.string().min(0).max(1024).describe(
    "The prefix for delivery S3 bucket.",
  ).optional(),
  TemplateBody: z.string().min(1).max(51200).describe(
    "A string containing full conformance pack template body. You can only specify one of the template body or template S3Uri fields.",
  ).optional(),
  TemplateS3Uri: z.string().min(1).max(1024).regex(new RegExp("s3://.*"))
    .describe(
      "Location of file containing the template body which points to the conformance pack template that is located in an Amazon S3 bucket. You can only specify one of the template body or template S3Uri fields.",
    ).optional(),
  TemplateSSMDocumentDetails: z.object({
    DocumentName: z.string().min(3).max(128).optional(),
    DocumentVersion: z.string().min(1).max(128).optional(),
  }).describe(
    "The TemplateSSMDocumentDetails object contains the name of the SSM document and the version of the SSM document.",
  ).optional(),
  ConformancePackInputParameters: z.array(ConformancePackInputParameterSchema)
    .describe("A list of ConformancePackInputParameter objects.").optional(),
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

/** Swamp extension model for Config ConformancePack. Registered at `@swamp/aws/config/conformance-pack`. */
export const model = {
  type: "@swamp/aws/config/conformance-pack",
  version: "2026.06.06.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Config ConformancePack resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Config ConformancePack",
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
          "AWS::Config::ConformancePack",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.ConformancePackName ?? g.ConformancePackName)?.toString() ??
            "current").replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(
              /\0/g,
              "",
            );
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a Config ConformancePack",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Config ConformancePack",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Config::ConformancePack",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName = ((result.ConformancePackName ??
          context.globalArgs.ConformancePackName)?.toString() ??
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
      description: "Update a Config ConformancePack",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.ConformancePackName?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.ConformancePackName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Config::ConformancePack",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Config::ConformancePack",
          identifier,
          currentState,
          desiredState,
          ["ConformancePackName"],
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
      description: "Delete a Config ConformancePack",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Config ConformancePack",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Config::ConformancePack",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.ConformancePackName?.toString() ??
            args.identifier).replace(/[\/\\]/g, "_").replace(/\.\./g, "_")
            .replace(/\0/g, "");
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
      description: "Sync Config ConformancePack state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.ConformancePackName?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.ConformancePackName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Config::ConformancePack",
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
