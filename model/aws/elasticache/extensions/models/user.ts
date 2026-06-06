// Auto-generated extension model for @swamp/aws/elasticache/user
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ElastiCache User (AWS::ElastiCache::User).
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

const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^(?!aws:)[a-zA-Z0-9 _\\.\\/=+:\\-@]*$"),
  ).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with 'aws:'. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().min(0).max(256).regex(
    new RegExp("^[a-zA-Z0-9 _\\.\\/=+:\\-@]*$"),
  ).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ).optional(),
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
  UserId: z.string().regex(new RegExp("[a-z][a-z0-9\\\\-]*")).describe(
    "The ID of the user.",
  ),
  UserName: z.string().describe("The username of the user."),
  Engine: z.enum(["redis", "valkey"]).describe(
    "The target cache engine for the user.",
  ),
  AccessString: z.string().describe(
    "Access permissions string used for this user account.",
  ).optional(),
  NoPasswordRequired: z.boolean().describe(
    "Indicates a password is not required for this user account.",
  ).optional(),
  Passwords: z.array(z.string()).describe(
    "Passwords used for this user account. You can create up to two passwords for each user.",
  ).optional(),
  AuthenticationMode: z.object({
    Type: z.enum(["password", "no-password-required", "iam"]).describe(
      "Authentication Type",
    ),
    Passwords: z.array(z.string()).describe(
      "Passwords used for this user account. You can create up to two passwords for each user.",
    ).optional(),
  }).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this user.",
  ).optional(),
});

const StateSchema = z.object({
  Status: z.string().optional(),
  UserId: z.string(),
  UserName: z.string().optional(),
  Engine: z.string().optional(),
  AccessString: z.string().optional(),
  NoPasswordRequired: z.boolean().optional(),
  Passwords: z.array(z.string()).optional(),
  Arn: z.string().optional(),
  AuthenticationMode: z.object({
    Type: z.string(),
    Passwords: z.array(z.string()),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  UserId: z.string().regex(new RegExp("[a-z][a-z0-9\\\\-]*")).describe(
    "The ID of the user.",
  ).optional(),
  UserName: z.string().describe("The username of the user.").optional(),
  Engine: z.enum(["redis", "valkey"]).describe(
    "The target cache engine for the user.",
  ).optional(),
  AccessString: z.string().describe(
    "Access permissions string used for this user account.",
  ).optional(),
  NoPasswordRequired: z.boolean().describe(
    "Indicates a password is not required for this user account.",
  ).optional(),
  Passwords: z.array(z.string()).describe(
    "Passwords used for this user account. You can create up to two passwords for each user.",
  ).optional(),
  AuthenticationMode: z.object({
    Type: z.enum(["password", "no-password-required", "iam"]).describe(
      "Authentication Type",
    ).optional(),
    Passwords: z.array(z.string()).describe(
      "Passwords used for this user account. You can create up to two passwords for each user.",
    ).optional(),
  }).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this user.",
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

/** Swamp extension model for ElastiCache User. Registered at `@swamp/aws/elasticache/user`. */
export const model = {
  type: "@swamp/aws/elasticache/user",
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
      description: "ElastiCache User resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ElastiCache User",
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
          "AWS::ElastiCache::User",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.UserId ?? g.UserId)?.toString() ?? "current").replace(
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
      description: "Get a ElastiCache User",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ElastiCache User",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::ElastiCache::User",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.UserId ?? context.globalArgs.UserId)?.toString() ??
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
      description: "Update a ElastiCache User",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.UserId?.toString() ?? "current").replace(
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
        const identifier = existing.UserId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::ElastiCache::User",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::ElastiCache::User",
          identifier,
          currentState,
          desiredState,
          ["UserId", "UserName"],
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
      description: "Delete a ElastiCache User",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ElastiCache User",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::ElastiCache::User",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.UserId?.toString() ?? args.identifier).replace(
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
      description: "Sync ElastiCache User state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.UserId?.toString() ?? "current").replace(
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
        const identifier = existing.UserId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::ElastiCache::User",
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
