// Auto-generated extension model for @swamp/aws/lambda/layer-version
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Lambda LayerVersion (AWS::Lambda::LayerVersion).
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
} from "./_lib/aws.ts";

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  CompatibleRuntimes: z.array(z.string()).describe(
    "A list of compatible function runtimes. Used for filtering with ListLayers and ListLayerVersions.",
  ).optional(),
  LicenseInfo: z.string().describe("The layer's software license.").optional(),
  Description: z.string().describe("The description of the version.")
    .optional(),
  LayerName: z.string().describe(
    "The name or Amazon Resource Name (ARN) of the layer.",
  ).optional(),
  Content: z.object({
    S3ObjectVersion: z.string().describe(
      "For versioned objects, the version of the layer archive object to use.",
    ).optional(),
    S3Bucket: z.string().describe("The Amazon S3 bucket of the layer archive."),
    S3Key: z.string().describe("The Amazon S3 key of the layer archive."),
  }).describe("The function layer archive."),
  CompatibleArchitectures: z.array(z.string()).describe(
    "A list of compatible instruction set architectures.",
  ).optional(),
});

const StateSchema = z.object({
  CompatibleRuntimes: z.array(z.string()).optional(),
  LicenseInfo: z.string().optional(),
  Description: z.string().optional(),
  LayerName: z.string().optional(),
  LayerVersionArn: z.string(),
  Content: z.object({
    S3ObjectVersion: z.string(),
    S3Bucket: z.string(),
    S3Key: z.string(),
  }).optional(),
  CompatibleArchitectures: z.array(z.string()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  CompatibleRuntimes: z.array(z.string()).describe(
    "A list of compatible function runtimes. Used for filtering with ListLayers and ListLayerVersions.",
  ).optional(),
  LicenseInfo: z.string().describe("The layer's software license.").optional(),
  Description: z.string().describe("The description of the version.")
    .optional(),
  LayerName: z.string().describe(
    "The name or Amazon Resource Name (ARN) of the layer.",
  ).optional(),
  Content: z.object({
    S3ObjectVersion: z.string().describe(
      "For versioned objects, the version of the layer archive object to use.",
    ).optional(),
    S3Bucket: z.string().describe("The Amazon S3 bucket of the layer archive.")
      .optional(),
    S3Key: z.string().describe("The Amazon S3 key of the layer archive.")
      .optional(),
  }).describe("The function layer archive.").optional(),
  CompatibleArchitectures: z.array(z.string()).describe(
    "A list of compatible instruction set architectures.",
  ).optional(),
});

/** Swamp extension model for Lambda LayerVersion. Registered at `@swamp/aws/lambda/layer-version`. */
export const model = {
  type: "@swamp/aws/lambda/layer-version",
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
      description: "Lambda LayerVersion resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Lambda LayerVersion",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Lambda::LayerVersion",
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
      description: "Get a Lambda LayerVersion",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Lambda LayerVersion",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Lambda::LayerVersion",
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
    delete: {
      description: "Delete a Lambda LayerVersion",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Lambda LayerVersion",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Lambda::LayerVersion",
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
      description: "Sync Lambda LayerVersion state from AWS",
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
        const identifier = existing.LayerVersionArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Lambda::LayerVersion",
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
