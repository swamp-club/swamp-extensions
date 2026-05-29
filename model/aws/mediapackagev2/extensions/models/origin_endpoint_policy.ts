// Auto-generated extension model for @swamp/aws/mediapackagev2/origin-endpoint-policy
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for MediaPackageV2 OriginEndpointPolicy (AWS::MediaPackageV2::OriginEndpointPolicy).
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
  CdnAuthConfiguration: z.object({
    CdnIdentifierSecretArns: z.array(z.string().min(20).max(2048)).describe(
      "The ARN for the secret in Secrets Manager that your CDN uses for authorization to access the endpoint.",
    ),
    SecretsRoleArn: z.string().min(20).max(2048).describe(
      "The ARN for the IAM role that gives MediaPackage read access to Secrets Manager and KMS for CDN authorization.",
    ),
  }).describe(
    "The settings to enable CDN authorization headers in MediaPackage.",
  ).optional(),
  ChannelGroupName: z.string().min(1).max(256).regex(
    new RegExp("^[a-zA-Z0-9_-]+$"),
  ),
  ChannelName: z.string().min(1).max(256).regex(new RegExp("^[a-zA-Z0-9_-]+$")),
  OriginEndpointName: z.string().min(1).max(256).regex(
    new RegExp("^[a-zA-Z0-9_-]+$"),
  ),
  Policy: z.record(z.string(), z.unknown()),
});

const StateSchema = z.object({
  CdnAuthConfiguration: z.object({
    CdnIdentifierSecretArns: z.array(z.string()),
    SecretsRoleArn: z.string(),
  }).optional(),
  ChannelGroupName: z.string(),
  ChannelName: z.string(),
  OriginEndpointName: z.string(),
  Policy: z.union([z.string(), z.record(z.string(), z.unknown())]).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  CdnAuthConfiguration: z.object({
    CdnIdentifierSecretArns: z.array(z.string().min(20).max(2048)).describe(
      "The ARN for the secret in Secrets Manager that your CDN uses for authorization to access the endpoint.",
    ).optional(),
    SecretsRoleArn: z.string().min(20).max(2048).describe(
      "The ARN for the IAM role that gives MediaPackage read access to Secrets Manager and KMS for CDN authorization.",
    ).optional(),
  }).describe(
    "The settings to enable CDN authorization headers in MediaPackage.",
  ).optional(),
  ChannelGroupName: z.string().min(1).max(256).regex(
    new RegExp("^[a-zA-Z0-9_-]+$"),
  ).optional(),
  ChannelName: z.string().min(1).max(256).regex(new RegExp("^[a-zA-Z0-9_-]+$"))
    .optional(),
  OriginEndpointName: z.string().min(1).max(256).regex(
    new RegExp("^[a-zA-Z0-9_-]+$"),
  ).optional(),
  Policy: z.record(z.string(), z.unknown()).optional(),
});

/** Swamp extension model for MediaPackageV2 OriginEndpointPolicy. Registered at `@swamp/aws/mediapackagev2/origin-endpoint-policy`. */
export const model = {
  type: "@swamp/aws/mediapackagev2/origin-endpoint-policy",
  version: "2026.05.29.1",
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
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.27.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "MediaPackageV2 OriginEndpointPolicy resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a MediaPackageV2 OriginEndpointPolicy",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::MediaPackageV2::OriginEndpointPolicy",
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
      description: "Get a MediaPackageV2 OriginEndpointPolicy",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MediaPackageV2 OriginEndpointPolicy",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::MediaPackageV2::OriginEndpointPolicy",
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
      description: "Update a MediaPackageV2 OriginEndpointPolicy",
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
        const idParts = [
          existing.ChannelGroupName?.toString(),
          existing.ChannelName?.toString(),
          existing.OriginEndpointName?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::MediaPackageV2::OriginEndpointPolicy",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::MediaPackageV2::OriginEndpointPolicy",
          identifier,
          currentState,
          desiredState,
          ["ChannelGroupName", "ChannelName", "OriginEndpointName"],
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
      description: "Delete a MediaPackageV2 OriginEndpointPolicy",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MediaPackageV2 OriginEndpointPolicy",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::MediaPackageV2::OriginEndpointPolicy",
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
      description: "Sync MediaPackageV2 OriginEndpointPolicy state from AWS",
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
        const idParts = [
          existing.ChannelGroupName?.toString(),
          existing.ChannelName?.toString(),
          existing.OriginEndpointName?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::MediaPackageV2::OriginEndpointPolicy",
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
