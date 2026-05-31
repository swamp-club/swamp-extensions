// Auto-generated extension model for @swamp/aws/sso/application
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SSO Application (AWS::SSO::Application).
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

const SignInOptionsSchema = z.object({
  Origin: z.enum(["IDENTITY_CENTER", "APPLICATION"]).describe(
    "This determines how IAM Identity Center navigates the user to the target application",
  ),
  ApplicationUrl: z.string().min(1).max(512).regex(
    new RegExp(
      "^http(s)?:\\/\\/[-a-zA-Z0-9+&@#\\/%?=~_|!:,.;]*[-a-zA-Z0-9+&bb@#\\/%?=~_|]$",
    ),
  ).describe(
    "The URL that accepts authentication requests for an application, this is a required parameter if the Origin parameter is APPLICATION",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(new RegExp("^[\\w+=,.@-]+$")),
  Value: z.string().min(0).max(256).regex(new RegExp("^[\\w+=,.@-]+$")),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Name: z.string().min(0).max(255).regex(new RegExp("^[\\w+=,.@-]+$")).describe(
    "The name you want to assign to this Identity Center (SSO) Application",
  ),
  Description: z.string().min(1).max(128).describe(
    "The description information for the Identity Center (SSO) Application",
  ).optional(),
  InstanceArn: z.string().min(10).max(1224).regex(
    new RegExp(
      "^arn:aws(-[a-z]{1,5}){0,3}:sso:::instance/(sso)?ins-[a-zA-Z0-9-.]{16}$",
    ),
  ).describe(
    "The ARN of the instance of IAM Identity Center under which the operation will run",
  ),
  ApplicationProviderArn: z.string().min(10).max(1224).regex(
    new RegExp(
      "^arn:aws(-[a-z]{1,5}){0,3}:sso::aws:applicationProvider/[a-zA-Z0-9-/]+$",
    ),
  ).describe(
    "The ARN of the application provider under which the operation will run",
  ),
  Status: z.enum(["ENABLED", "DISABLED"]).describe(
    "Specifies whether the application is enabled or disabled",
  ).optional(),
  PortalOptions: z.object({
    Visibility: z.enum(["ENABLED", "DISABLED"]).describe(
      "Indicates whether this application is visible in the access portal",
    ).optional(),
    SignInOptions: SignInOptionsSchema.describe(
      "A structure that describes the sign-in options for the access portal",
    ).optional(),
  }).describe(
    "A structure that describes the options for the portal associated with an application",
  ).optional(),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  Name: z.string().optional(),
  Description: z.string().optional(),
  InstanceArn: z.string().optional(),
  ApplicationArn: z.string(),
  ApplicationProviderArn: z.string().optional(),
  Status: z.string().optional(),
  PortalOptions: z.object({
    Visibility: z.string(),
    SignInOptions: SignInOptionsSchema,
  }).optional(),
  IdentityStoreArn: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Name: z.string().min(0).max(255).regex(new RegExp("^[\\w+=,.@-]+$")).describe(
    "The name you want to assign to this Identity Center (SSO) Application",
  ).optional(),
  Description: z.string().min(1).max(128).describe(
    "The description information for the Identity Center (SSO) Application",
  ).optional(),
  InstanceArn: z.string().min(10).max(1224).regex(
    new RegExp(
      "^arn:aws(-[a-z]{1,5}){0,3}:sso:::instance/(sso)?ins-[a-zA-Z0-9-.]{16}$",
    ),
  ).describe(
    "The ARN of the instance of IAM Identity Center under which the operation will run",
  ).optional(),
  ApplicationProviderArn: z.string().min(10).max(1224).regex(
    new RegExp(
      "^arn:aws(-[a-z]{1,5}){0,3}:sso::aws:applicationProvider/[a-zA-Z0-9-/]+$",
    ),
  ).describe(
    "The ARN of the application provider under which the operation will run",
  ).optional(),
  Status: z.enum(["ENABLED", "DISABLED"]).describe(
    "Specifies whether the application is enabled or disabled",
  ).optional(),
  PortalOptions: z.object({
    Visibility: z.enum(["ENABLED", "DISABLED"]).describe(
      "Indicates whether this application is visible in the access portal",
    ).optional(),
    SignInOptions: SignInOptionsSchema.describe(
      "A structure that describes the sign-in options for the access portal",
    ).optional(),
  }).describe(
    "A structure that describes the options for the portal associated with an application",
  ).optional(),
  Tags: z.array(TagSchema).optional(),
});

/** Swamp extension model for SSO Application. Registered at `@swamp/aws/sso/application`. */
export const model = {
  type: "@swamp/aws/sso/application",
  version: "2026.05.31.1",
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
      toVersion: "2026.04.03.3",
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
      toVersion: "2026.05.31.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "SSO Application resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SSO Application",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::SSO::Application",
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
      description: "Get a SSO Application",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SSO Application",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::SSO::Application",
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
      description: "Update a SSO Application",
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
        const identifier = existing.ApplicationArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::SSO::Application",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::SSO::Application",
          identifier,
          currentState,
          desiredState,
          ["InstanceArn", "ApplicationProviderArn"],
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
      description: "Delete a SSO Application",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SSO Application",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::SSO::Application",
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
      description: "Sync SSO Application state from AWS",
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
        const identifier = existing.ApplicationArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SSO::Application",
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
