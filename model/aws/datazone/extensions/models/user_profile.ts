// Auto-generated extension model for @swamp/aws/datazone/user-profile
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for DataZone UserProfile (AWS::DataZone::UserProfile).
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
  DomainIdentifier: z.string().regex(new RegExp("^dzd[-_][a-zA-Z0-9_-]{1,36}$"))
    .describe(
      "The identifier of the Amazon DataZone domain in which the user profile would be created.",
    ),
  Status: z.enum(["ASSIGNED", "NOT_ASSIGNED", "ACTIVATED", "DEACTIVATED"])
    .describe("The status of the user profile.").optional(),
  UserIdentifier: z.string().regex(
    new RegExp(
      "(^([0-9a-f]{10}-|)[A-Fa-f0-9]{8}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{12}$|^[a-zA-Z_0-9+=,.@-]+$|^arn:aws:iam::\\d{12}:.+$)",
    ),
  ).describe("The ID of the user."),
  UserType: z.enum(["IAM_USER", "IAM_ROLE", "SSO_USER", "IAM_ROLE_SESSION"])
    .describe("The type of the user.").optional(),
  SessionName: z.string().min(2).max(64).describe(
    "The session name of the user profile.",
  ).optional(),
});

const StateSchema = z.object({
  Details: z.object({
    Iam: z.object({
      Arn: z.string(),
      SessionName: z.string(),
      GroupProfileId: z.string(),
    }),
    Sso: z.object({
      Username: z.string(),
      FirstName: z.string(),
      LastName: z.string(),
    }),
  }).optional(),
  DomainId: z.string(),
  DomainIdentifier: z.string().optional(),
  Id: z.string(),
  Status: z.string().optional(),
  Type: z.string().optional(),
  UserIdentifier: z.string().optional(),
  UserType: z.string().optional(),
  SessionName: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  DomainIdentifier: z.string().regex(new RegExp("^dzd[-_][a-zA-Z0-9_-]{1,36}$"))
    .describe(
      "The identifier of the Amazon DataZone domain in which the user profile would be created.",
    ).optional(),
  Status: z.enum(["ASSIGNED", "NOT_ASSIGNED", "ACTIVATED", "DEACTIVATED"])
    .describe("The status of the user profile.").optional(),
  UserIdentifier: z.string().regex(
    new RegExp(
      "(^([0-9a-f]{10}-|)[A-Fa-f0-9]{8}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{12}$|^[a-zA-Z_0-9+=,.@-]+$|^arn:aws:iam::\\d{12}:.+$)",
    ),
  ).describe("The ID of the user.").optional(),
  UserType: z.enum(["IAM_USER", "IAM_ROLE", "SSO_USER", "IAM_ROLE_SESSION"])
    .describe("The type of the user.").optional(),
  SessionName: z.string().min(2).max(64).describe(
    "The session name of the user profile.",
  ).optional(),
});

/** Swamp extension model for DataZone UserProfile. Registered at `@swamp/aws/datazone/user-profile`. */
export const model = {
  type: "@swamp/aws/datazone/user-profile",
  version: "2026.05.05.1",
  upgrades: [
    {
      toVersion: "2026.04.01.2",
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
      toVersion: "2026.05.05.1",
      description: "Added: SessionName",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "DataZone UserProfile resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a DataZone UserProfile",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::DataZone::UserProfile",
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
      description: "Get a DataZone UserProfile",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DataZone UserProfile",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::DataZone::UserProfile",
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
      description: "Update a DataZone UserProfile",
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
          existing.DomainId?.toString(),
          existing.Id?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::DataZone::UserProfile",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::DataZone::UserProfile",
          identifier,
          currentState,
          desiredState,
          ["DomainIdentifier", "UserIdentifier", "UserType"],
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
      description: "Delete a DataZone UserProfile",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DataZone UserProfile",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::DataZone::UserProfile",
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
      description: "Sync DataZone UserProfile state from AWS",
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
          existing.DomainId?.toString(),
          existing.Id?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::DataZone::UserProfile",
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
