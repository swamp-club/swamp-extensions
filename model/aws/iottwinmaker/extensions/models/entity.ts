// Auto-generated extension model for @swamp/aws/iottwinmaker/entity
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for IoTTwinMaker Entity (AWS::IoTTwinMaker::Entity).
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
  EntityId: z.string().min(1).max(128).regex(
    new RegExp(
      "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}|^[a-zA-Z0-9][a-zA-Z_\\-0-9.:]*[a-zA-Z0-9]+",
    ),
  ).describe("The ID of the entity.").optional(),
  EntityName: z.string().min(1).max(256).regex(
    new RegExp("[a-zA-Z_0-9-.][a-zA-Z_0-9-. ]*[a-zA-Z0-9]+"),
  ).describe("The name of the entity."),
  Status: z.object({
    State: z.enum(["CREATING", "UPDATING", "DELETING", "ACTIVE", "ERROR"])
      .optional(),
    Error: z.record(z.string(), z.unknown()).optional(),
  }).describe("The current status of the entity.").optional(),
  ParentEntityId: z.string().min(1).max(128).regex(
    new RegExp(
      "\\$ROOT|^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}|^[a-zA-Z0-9][a-zA-Z_\\-0-9.:]*[a-zA-Z0-9]+",
    ),
  ).describe("The ID of the parent entity.").optional(),
  Description: z.string().min(0).max(512).describe(
    "The description of the entity.",
  ).optional(),
  Tags: z.record(z.string(), z.string().min(1).max(256)).describe(
    "A key-value pair to associate with a resource.",
  ).optional(),
  WorkspaceId: z.string().min(1).max(128).regex(
    new RegExp("[a-zA-Z_0-9][a-zA-Z_\\-0-9]*[a-zA-Z0-9]+"),
  ).describe("The ID of the workspace."),
  Components: z.record(z.string(), z.string()).describe(
    "A map that sets information about a component type.",
  ).optional(),
  CompositeComponents: z.record(z.string(), z.string()).describe(
    "A map that sets information about a composite component.",
  ).optional(),
});

const StateSchema = z.object({
  EntityId: z.string(),
  EntityName: z.string().optional(),
  Status: z.object({
    State: z.string(),
    Error: z.record(z.string(), z.unknown()),
  }).optional(),
  HasChildEntities: z.boolean().optional(),
  ParentEntityId: z.string().optional(),
  Arn: z.string().optional(),
  Description: z.string().optional(),
  CreationDateTime: z.string().optional(),
  UpdateDateTime: z.string().optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
  WorkspaceId: z.string(),
  Components: z.record(z.string(), z.unknown()).optional(),
  CompositeComponents: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  EntityId: z.string().min(1).max(128).regex(
    new RegExp(
      "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}|^[a-zA-Z0-9][a-zA-Z_\\-0-9.:]*[a-zA-Z0-9]+",
    ),
  ).describe("The ID of the entity.").optional(),
  EntityName: z.string().min(1).max(256).regex(
    new RegExp("[a-zA-Z_0-9-.][a-zA-Z_0-9-. ]*[a-zA-Z0-9]+"),
  ).describe("The name of the entity.").optional(),
  Status: z.object({
    State: z.enum(["CREATING", "UPDATING", "DELETING", "ACTIVE", "ERROR"])
      .optional(),
    Error: z.record(z.string(), z.unknown()).optional(),
  }).describe("The current status of the entity.").optional(),
  ParentEntityId: z.string().min(1).max(128).regex(
    new RegExp(
      "\\$ROOT|^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}|^[a-zA-Z0-9][a-zA-Z_\\-0-9.:]*[a-zA-Z0-9]+",
    ),
  ).describe("The ID of the parent entity.").optional(),
  Description: z.string().min(0).max(512).describe(
    "The description of the entity.",
  ).optional(),
  Tags: z.record(z.string(), z.string().min(1).max(256)).describe(
    "A key-value pair to associate with a resource.",
  ).optional(),
  WorkspaceId: z.string().min(1).max(128).regex(
    new RegExp("[a-zA-Z_0-9][a-zA-Z_\\-0-9]*[a-zA-Z0-9]+"),
  ).describe("The ID of the workspace.").optional(),
  Components: z.record(z.string(), z.string()).describe(
    "A map that sets information about a component type.",
  ).optional(),
  CompositeComponents: z.record(z.string(), z.string()).describe(
    "A map that sets information about a composite component.",
  ).optional(),
});

/** Swamp extension model for IoTTwinMaker Entity. Registered at `@swamp/aws/iottwinmaker/entity`. */
export const model = {
  type: "@swamp/aws/iottwinmaker/entity",
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
      description: "IoTTwinMaker Entity resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a IoTTwinMaker Entity",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::IoTTwinMaker::Entity",
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
      description: "Get a IoTTwinMaker Entity",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoTTwinMaker Entity",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::IoTTwinMaker::Entity",
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
      description: "Update a IoTTwinMaker Entity",
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
          existing.WorkspaceId?.toString(),
          existing.EntityId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::IoTTwinMaker::Entity",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::IoTTwinMaker::Entity",
          identifier,
          currentState,
          desiredState,
          ["WorkspaceId", "EntityId"],
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
      description: "Delete a IoTTwinMaker Entity",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoTTwinMaker Entity",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::IoTTwinMaker::Entity",
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
      description: "Sync IoTTwinMaker Entity state from AWS",
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
          existing.WorkspaceId?.toString(),
          existing.EntityId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::IoTTwinMaker::Entity",
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
