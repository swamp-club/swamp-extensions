// Auto-generated extension model for @swamp/aws/cognito/identity-pool
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Cognito IdentityPool (AWS::Cognito::IdentityPool).
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

const CognitoIdentityProviderSchema = z.object({
  ServerSideTokenCheck: z.boolean().optional(),
  ProviderName: z.string(),
  ClientId: z.string(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  PushSync: z.object({
    ApplicationArns: z.array(z.string()).optional(),
    RoleArn: z.string().optional(),
  }).optional(),
  CognitoIdentityProviders: z.array(CognitoIdentityProviderSchema).optional(),
  DeveloperProviderName: z.string().optional(),
  CognitoStreams: z.object({
    StreamingStatus: z.string().optional(),
    StreamName: z.string().optional(),
    RoleArn: z.string().optional(),
  }).optional(),
  SupportedLoginProviders: z.record(z.string(), z.unknown()).optional(),
  CognitoEvents: z.record(z.string(), z.unknown()).optional(),
  IdentityPoolName: z.string().optional(),
  AllowUnauthenticatedIdentities: z.boolean(),
  SamlProviderARNs: z.array(z.string()).optional(),
  OpenIdConnectProviderARNs: z.array(z.string()).optional(),
  AllowClassicFlow: z.boolean().optional(),
  IdentityPoolTags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  PushSync: z.object({
    ApplicationArns: z.array(z.string()),
    RoleArn: z.string(),
  }).optional(),
  CognitoIdentityProviders: z.array(CognitoIdentityProviderSchema).optional(),
  DeveloperProviderName: z.string().optional(),
  CognitoStreams: z.object({
    StreamingStatus: z.string(),
    StreamName: z.string(),
    RoleArn: z.string(),
  }).optional(),
  SupportedLoginProviders: z.record(z.string(), z.unknown()).optional(),
  Name: z.string().optional(),
  CognitoEvents: z.record(z.string(), z.unknown()).optional(),
  Id: z.string(),
  IdentityPoolName: z.string().optional(),
  AllowUnauthenticatedIdentities: z.boolean().optional(),
  SamlProviderARNs: z.array(z.string()).optional(),
  OpenIdConnectProviderARNs: z.array(z.string()).optional(),
  AllowClassicFlow: z.boolean().optional(),
  IdentityPoolTags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  PushSync: z.object({
    ApplicationArns: z.array(z.string()).optional(),
    RoleArn: z.string().optional(),
  }).optional(),
  CognitoIdentityProviders: z.array(CognitoIdentityProviderSchema).optional(),
  DeveloperProviderName: z.string().optional(),
  CognitoStreams: z.object({
    StreamingStatus: z.string().optional(),
    StreamName: z.string().optional(),
    RoleArn: z.string().optional(),
  }).optional(),
  SupportedLoginProviders: z.record(z.string(), z.unknown()).optional(),
  CognitoEvents: z.record(z.string(), z.unknown()).optional(),
  IdentityPoolName: z.string().optional(),
  AllowUnauthenticatedIdentities: z.boolean().optional(),
  SamlProviderARNs: z.array(z.string()).optional(),
  OpenIdConnectProviderARNs: z.array(z.string()).optional(),
  AllowClassicFlow: z.boolean().optional(),
  IdentityPoolTags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

/** Swamp extension model for Cognito IdentityPool. Registered at `@swamp/aws/cognito/identity-pool`. */
export const model = {
  type: "@swamp/aws/cognito/identity-pool",
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
      description: "Cognito IdentityPool resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Cognito IdentityPool",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Cognito::IdentityPool",
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
      description: "Get a Cognito IdentityPool",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Cognito IdentityPool",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Cognito::IdentityPool",
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
      description: "Update a Cognito IdentityPool",
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
          "AWS::Cognito::IdentityPool",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Cognito::IdentityPool",
          identifier,
          currentState,
          desiredState,
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
      description: "Delete a Cognito IdentityPool",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Cognito IdentityPool",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Cognito::IdentityPool",
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
      description: "Sync Cognito IdentityPool state from AWS",
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
            "AWS::Cognito::IdentityPool",
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
