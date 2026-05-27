// Auto-generated extension model for @swamp/aws/iottwinmaker/component-type
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for IoTTwinMaker ComponentType (AWS::IoTTwinMaker::ComponentType).
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

const LambdaFunctionSchema = z.object({
  Arn: z.string().min(1).max(128).regex(
    new RegExp(
      "arn:((aws)|(aws-cn)|(aws-us-gov)):lambda:[a-z0-9-]+:[0-9]{12}:function:[\\/a-zA-Z0-9_-]+",
    ),
  ),
});

const DataConnectorSchema = z.object({
  IsNative: z.boolean().describe(
    "A Boolean value that specifies whether the data connector is native to IoT TwinMaker.",
  ).optional(),
  Lambda: LambdaFunctionSchema.describe(
    "The Lambda function associated with this data connector.",
  ).optional(),
});

const FunctionSchema = z.object({
  ImplementedBy: DataConnectorSchema.describe("The data connector.").optional(),
  RequiredProperties: z.array(z.string().regex(new RegExp("[a-zA-Z_\\-0-9]+")))
    .describe("The required properties of the function.").optional(),
  Scope: z.enum(["ENTITY", "WORKSPACE"]).describe("The scope of the function.")
    .optional(),
});

const PropertyGroupSchema = z.object({
  GroupType: z.enum(["TABULAR"]).describe("The type of property group.")
    .optional(),
  PropertyNames: z.array(z.string().regex(new RegExp("[a-zA-Z_\\-0-9]+")))
    .describe("The list of property names in the property group.").optional(),
});

const CompositeComponentTypeSchema = z.object({
  ComponentTypeId: z.string().min(1).max(256).regex(
    new RegExp("[a-zA-Z_\\.\\-0-9:]+"),
  ).describe("The id of the composite component type.").optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  WorkspaceId: z.string().min(1).max(128).regex(
    new RegExp("[a-zA-Z_0-9][a-zA-Z_\\-0-9]*[a-zA-Z0-9]+"),
  ).describe("The ID of the workspace that contains the component type."),
  ComponentTypeId: z.string().min(1).max(256).regex(
    new RegExp("[a-zA-Z_\\.\\-0-9:]+"),
  ).describe("The ID of the component type."),
  Description: z.string().min(0).max(512).describe(
    "The description of the component type.",
  ).optional(),
  ExtendsFrom: z.array(z.string().regex(new RegExp("[a-zA-Z_\\.\\-0-9:]+")))
    .describe("Specifies the parent component type to extend.").optional(),
  Functions: z.record(z.string(), FunctionSchema).describe(
    "a Map of functions in the component type. Each function's key must be unique to this map.",
  ).optional(),
  IsSingleton: z.boolean().describe(
    "A Boolean value that specifies whether an entity can have more than one component of this type.",
  ).optional(),
  PropertyDefinitions: z.record(z.string(), z.string()).describe(
    "An map of the property definitions in the component type. Each property definition's key must be unique to this map.",
  ).optional(),
  PropertyGroups: z.record(z.string(), PropertyGroupSchema).describe(
    "An map of the property groups in the component type. Each property group's key must be unique to this map.",
  ).optional(),
  CompositeComponentTypes: z.record(z.string(), CompositeComponentTypeSchema)
    .describe(
      "An map of the composite component types in the component type. Each composite component type's key must be unique to this map.",
    ).optional(),
  Status: z.object({
    State: z.enum(["CREATING", "UPDATING", "DELETING", "ACTIVE", "ERROR"])
      .optional(),
    Error: z.record(z.string(), z.unknown()).optional(),
  }).describe("The current status of the component type.").optional(),
  Tags: z.record(z.string(), z.string().min(1).max(256)).describe(
    "A map of key-value pairs to associate with a resource.",
  ).optional(),
});

const StateSchema = z.object({
  WorkspaceId: z.string(),
  ComponentTypeId: z.string(),
  Description: z.string().optional(),
  ExtendsFrom: z.array(z.string()).optional(),
  Functions: z.record(z.string(), z.unknown()).optional(),
  IsSingleton: z.boolean().optional(),
  PropertyDefinitions: z.record(z.string(), z.unknown()).optional(),
  PropertyGroups: z.record(z.string(), z.unknown()).optional(),
  CompositeComponentTypes: z.record(z.string(), z.unknown()).optional(),
  Arn: z.string().optional(),
  CreationDateTime: z.string().optional(),
  UpdateDateTime: z.string().optional(),
  Status: z.object({
    State: z.string(),
    Error: z.record(z.string(), z.unknown()),
  }).optional(),
  IsAbstract: z.boolean().optional(),
  IsSchemaInitialized: z.boolean().optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  WorkspaceId: z.string().min(1).max(128).regex(
    new RegExp("[a-zA-Z_0-9][a-zA-Z_\\-0-9]*[a-zA-Z0-9]+"),
  ).describe("The ID of the workspace that contains the component type.")
    .optional(),
  ComponentTypeId: z.string().min(1).max(256).regex(
    new RegExp("[a-zA-Z_\\.\\-0-9:]+"),
  ).describe("The ID of the component type.").optional(),
  Description: z.string().min(0).max(512).describe(
    "The description of the component type.",
  ).optional(),
  ExtendsFrom: z.array(z.string().regex(new RegExp("[a-zA-Z_\\.\\-0-9:]+")))
    .describe("Specifies the parent component type to extend.").optional(),
  Functions: z.record(z.string(), FunctionSchema).describe(
    "a Map of functions in the component type. Each function's key must be unique to this map.",
  ).optional(),
  IsSingleton: z.boolean().describe(
    "A Boolean value that specifies whether an entity can have more than one component of this type.",
  ).optional(),
  PropertyDefinitions: z.record(z.string(), z.string()).describe(
    "An map of the property definitions in the component type. Each property definition's key must be unique to this map.",
  ).optional(),
  PropertyGroups: z.record(z.string(), PropertyGroupSchema).describe(
    "An map of the property groups in the component type. Each property group's key must be unique to this map.",
  ).optional(),
  CompositeComponentTypes: z.record(z.string(), CompositeComponentTypeSchema)
    .describe(
      "An map of the composite component types in the component type. Each composite component type's key must be unique to this map.",
    ).optional(),
  Status: z.object({
    State: z.enum(["CREATING", "UPDATING", "DELETING", "ACTIVE", "ERROR"])
      .optional(),
    Error: z.record(z.string(), z.unknown()).optional(),
  }).describe("The current status of the component type.").optional(),
  Tags: z.record(z.string(), z.string().min(1).max(256)).describe(
    "A map of key-value pairs to associate with a resource.",
  ).optional(),
});

/** Swamp extension model for IoTTwinMaker ComponentType. Registered at `@swamp/aws/iottwinmaker/component-type`. */
export const model = {
  type: "@swamp/aws/iottwinmaker/component-type",
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
      description: "IoTTwinMaker ComponentType resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a IoTTwinMaker ComponentType",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::IoTTwinMaker::ComponentType",
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
      description: "Get a IoTTwinMaker ComponentType",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoTTwinMaker ComponentType",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::IoTTwinMaker::ComponentType",
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
      description: "Update a IoTTwinMaker ComponentType",
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
          existing.ComponentTypeId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::IoTTwinMaker::ComponentType",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::IoTTwinMaker::ComponentType",
          identifier,
          currentState,
          desiredState,
          ["WorkspaceId", "ComponentTypeId"],
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
      description: "Delete a IoTTwinMaker ComponentType",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoTTwinMaker ComponentType",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::IoTTwinMaker::ComponentType",
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
      description: "Sync IoTTwinMaker ComponentType state from AWS",
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
          existing.ComponentTypeId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::IoTTwinMaker::ComponentType",
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
