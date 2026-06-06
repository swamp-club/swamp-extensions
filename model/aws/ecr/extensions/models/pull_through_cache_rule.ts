// Auto-generated extension model for @swamp/aws/ecr/pull-through-cache-rule
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ECR PullThroughCacheRule (AWS::ECR::PullThroughCacheRule).
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
  EcrRepositoryPrefix: z.string().min(2).max(30).regex(
    new RegExp(
      "^([a-z0-9]+((\\.|_|__|-+)[a-z0-9]+)*(\\/[a-z0-9]+((\\.|_|__|-+)[a-z0-9]+)*)*\\/?|ROOT)$",
    ),
  ).describe(
    "The Amazon ECR repository prefix associated with the pull through cache rule.",
  ).optional(),
  UpstreamRegistryUrl: z.string().describe(
    "The upstream registry URL associated with the pull through cache rule.",
  ).optional(),
  CredentialArn: z.string().min(50).max(612).regex(
    new RegExp(
      "^arn:aws:secretsmanager:[a-zA-Z0-9-:]+:secret:ecr\\-pullthroughcache\\/[a-zA-Z0-9\\/_+=.@-]+$",
    ),
  ).describe(
    "The ARN of the Secrets Manager secret associated with the pull through cache rule.",
  ).optional(),
  UpstreamRegistry: z.string().describe(
    "The name of the upstream source registry associated with the pull through cache rule.",
  ).optional(),
  CustomRoleArn: z.string().max(2048).describe(
    "The ARN of the IAM role associated with the pull through cache rule.",
  ).optional(),
  UpstreamRepositoryPrefix: z.string().min(2).max(30).regex(
    new RegExp(
      "^([a-z0-9]+((\\.|_|__|-+)[a-z0-9]+)*(\\/[a-z0-9]+((\\.|_|__|-+)[a-z0-9]+)*)*\\/?|ROOT)$",
    ),
  ).describe(
    "The upstream repository prefix associated with the pull through cache rule.",
  ).optional(),
});

const StateSchema = z.object({
  EcrRepositoryPrefix: z.string(),
  UpstreamRegistryUrl: z.string().optional(),
  CredentialArn: z.string().optional(),
  UpstreamRegistry: z.string().optional(),
  CustomRoleArn: z.string().optional(),
  UpstreamRepositoryPrefix: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  EcrRepositoryPrefix: z.string().min(2).max(30).regex(
    new RegExp(
      "^([a-z0-9]+((\\.|_|__|-+)[a-z0-9]+)*(\\/[a-z0-9]+((\\.|_|__|-+)[a-z0-9]+)*)*\\/?|ROOT)$",
    ),
  ).describe(
    "The Amazon ECR repository prefix associated with the pull through cache rule.",
  ).optional(),
  UpstreamRegistryUrl: z.string().describe(
    "The upstream registry URL associated with the pull through cache rule.",
  ).optional(),
  CredentialArn: z.string().min(50).max(612).regex(
    new RegExp(
      "^arn:aws:secretsmanager:[a-zA-Z0-9-:]+:secret:ecr\\-pullthroughcache\\/[a-zA-Z0-9\\/_+=.@-]+$",
    ),
  ).describe(
    "The ARN of the Secrets Manager secret associated with the pull through cache rule.",
  ).optional(),
  UpstreamRegistry: z.string().describe(
    "The name of the upstream source registry associated with the pull through cache rule.",
  ).optional(),
  CustomRoleArn: z.string().max(2048).describe(
    "The ARN of the IAM role associated with the pull through cache rule.",
  ).optional(),
  UpstreamRepositoryPrefix: z.string().min(2).max(30).regex(
    new RegExp(
      "^([a-z0-9]+((\\.|_|__|-+)[a-z0-9]+)*(\\/[a-z0-9]+((\\.|_|__|-+)[a-z0-9]+)*)*\\/?|ROOT)$",
    ),
  ).describe(
    "The upstream repository prefix associated with the pull through cache rule.",
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

/** Swamp extension model for ECR PullThroughCacheRule. Registered at `@swamp/aws/ecr/pull-through-cache-rule`. */
export const model = {
  type: "@swamp/aws/ecr/pull-through-cache-rule",
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
      description: "ECR PullThroughCacheRule resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ECR PullThroughCacheRule",
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
          "AWS::ECR::PullThroughCacheRule",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.EcrRepositoryPrefix ?? g.EcrRepositoryPrefix)?.toString() ??
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
      description: "Get a ECR PullThroughCacheRule",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ECR PullThroughCacheRule",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::ECR::PullThroughCacheRule",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName = ((result.EcrRepositoryPrefix ??
          context.globalArgs.EcrRepositoryPrefix)?.toString() ??
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
      description: "Update a ECR PullThroughCacheRule",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.EcrRepositoryPrefix?.toString() ?? "current")
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
        const identifier = existing.EcrRepositoryPrefix?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::ECR::PullThroughCacheRule",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::ECR::PullThroughCacheRule",
          identifier,
          currentState,
          desiredState,
          [
            "EcrRepositoryPrefix",
            "UpstreamRegistryUrl",
            "CredentialArn",
            "UpstreamRegistry",
            "CustomRoleArn",
            "UpstreamRepositoryPrefix",
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
      description: "Delete a ECR PullThroughCacheRule",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ECR PullThroughCacheRule",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::ECR::PullThroughCacheRule",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.EcrRepositoryPrefix?.toString() ??
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
      description: "Sync ECR PullThroughCacheRule state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.EcrRepositoryPrefix?.toString() ?? "current")
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
        const identifier = existing.EcrRepositoryPrefix?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::ECR::PullThroughCacheRule",
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
