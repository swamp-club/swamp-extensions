// Auto-generated extension model for @swamp/aws/verifiedpermissions/policy-store-alias
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for VerifiedPermissions PolicyStoreAlias (AWS::VerifiedPermissions::PolicyStoreAlias).
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
  AliasName: z.string().min(1).max(150).regex(new RegExp("^[a-zA-Z0-9-_/]*$")),
  PolicyStoreId: z.string().min(1).max(200).regex(
    new RegExp("^[a-zA-Z0-9-]*$"),
  ),
});

const StateSchema = z.object({
  AliasName: z.string(),
  PolicyStoreId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  AliasName: z.string().min(1).max(150).regex(new RegExp("^[a-zA-Z0-9-_/]*$"))
    .optional(),
  PolicyStoreId: z.string().min(1).max(200).regex(new RegExp("^[a-zA-Z0-9-]*$"))
    .optional(),
});

/** Swamp extension model for VerifiedPermissions PolicyStoreAlias. Registered at `@swamp/aws/verifiedpermissions/policy-store-alias`. */
export const model = {
  type: "@swamp/aws/verifiedpermissions/policy-store-alias",
  version: "2026.05.29.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "VerifiedPermissions PolicyStoreAlias resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a VerifiedPermissions PolicyStoreAlias",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::VerifiedPermissions::PolicyStoreAlias",
          desiredState,
        ) as StateData;
        const instanceName =
          ((result.AliasName ?? g.AliasName)?.toString() ?? "current").replace(
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
      description: "Get a VerifiedPermissions PolicyStoreAlias",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the VerifiedPermissions PolicyStoreAlias",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::VerifiedPermissions::PolicyStoreAlias",
          args.identifier,
        ) as StateData;
        const instanceName =
          ((result.AliasName ?? context.globalArgs.AliasName)?.toString() ??
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
    delete: {
      description: "Delete a VerifiedPermissions PolicyStoreAlias",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the VerifiedPermissions PolicyStoreAlias",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::VerifiedPermissions::PolicyStoreAlias",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.AliasName?.toString() ?? args.identifier).replace(
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
      description: "Sync VerifiedPermissions PolicyStoreAlias state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.AliasName?.toString() ?? "current").replace(
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
        const identifier = existing.AliasName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::VerifiedPermissions::PolicyStoreAlias",
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
