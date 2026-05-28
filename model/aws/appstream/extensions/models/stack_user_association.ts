// Auto-generated extension model for @swamp/aws/appstream/stack-user-association
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for AppStream StackUserAssociation (AWS::AppStream::StackUserAssociation).
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
  AuthenticationType: z.string().describe(
    "The authentication type for the user who is associated with the stack. You must specify USERPOOL.",
  ),
  SendEmailNotification: z.boolean().describe(
    "Specifies whether a welcome email is sent to a user after the user is created in the user pool.",
  ).optional(),
  StackName: z.string().describe(
    "The name of the stack that is associated with the user.",
  ),
  UserName: z.string().describe(
    "The name of the user who is associated with the stack.",
  ),
});

const StateSchema = z.object({
  AuthenticationType: z.string(),
  SendEmailNotification: z.boolean().optional(),
  StackName: z.string(),
  UserName: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  AuthenticationType: z.string().describe(
    "The authentication type for the user who is associated with the stack. You must specify USERPOOL.",
  ).optional(),
  SendEmailNotification: z.boolean().describe(
    "Specifies whether a welcome email is sent to a user after the user is created in the user pool.",
  ).optional(),
  StackName: z.string().describe(
    "The name of the stack that is associated with the user.",
  ).optional(),
  UserName: z.string().describe(
    "The name of the user who is associated with the stack.",
  ).optional(),
});

/** Swamp extension model for AppStream StackUserAssociation. Registered at `@swamp/aws/appstream/stack-user-association`. */
export const model = {
  type: "@swamp/aws/appstream/stack-user-association",
  version: "2026.05.27.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "AppStream StackUserAssociation resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a AppStream StackUserAssociation",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::AppStream::StackUserAssociation",
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
      description: "Get a AppStream StackUserAssociation",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AppStream StackUserAssociation",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::AppStream::StackUserAssociation",
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
      description: "Delete a AppStream StackUserAssociation",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AppStream StackUserAssociation",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::AppStream::StackUserAssociation",
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
      description: "Sync AppStream StackUserAssociation state from AWS",
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
          existing.StackName?.toString(),
          existing.UserName?.toString(),
          existing.AuthenticationType?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::AppStream::StackUserAssociation",
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
