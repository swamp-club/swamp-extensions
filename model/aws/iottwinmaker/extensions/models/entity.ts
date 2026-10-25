// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/aws/iottwinmaker/entity
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for IoTTwinMaker Entity (AWS::IoTTwinMaker::Entity).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, sync, and list can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";

const DataValueSchema = z.object({
  BooleanValue: z.boolean().describe("A Boolean value.").optional(),
  DoubleValue: z.number().describe("A double value.").optional(),
  Expression: z.string().min(1).max(316).regex(
    new RegExp("(^\\$\\{Parameters\\.[a-zA-z]+([a-zA-z_0-9]*)}$)"),
  ).describe("An expression that produces the value.").optional(),
  IntegerValue: z.number().int().describe("An integer value.").optional(),
  ListValue: z.array(z.record(z.string(), z.unknown())).describe(
    "A list of multiple values.",
  ).optional(),
  LongValue: z.number().describe("A long value.").optional(),
  StringValue: z.string().min(1).max(256).regex(new RegExp(".*")).describe(
    "A string value.",
  ).optional(),
  MapValue: z.record(z.string(), z.record(z.string(), z.unknown())).describe(
    "An object that maps strings to multiple DataValue objects.",
  ).optional(),
  RelationshipValue: z.object({
    TargetComponentName: z.string().min(1).max(256).regex(
      new RegExp("[a-zA-Z_\\-0-9]+"),
    ).optional(),
    TargetEntityId: z.string().min(1).max(128).regex(
      new RegExp(
        "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}|^[a-zA-Z0-9][a-zA-Z_\\-0-9.:]*[a-zA-Z0-9]+",
      ),
    ).optional(),
  }).describe("A value that relates a component to another component.")
    .optional(),
});

const RelationshipSchema = z.object({
  RelationshipType: z.string().min(1).max(256).regex(new RegExp(".*")).describe(
    "The type of the relationship.",
  ).optional(),
  TargetComponentTypeId: z.string().min(1).max(256).regex(
    new RegExp("[a-zA-Z_\\.\\-0-9:]+"),
  ).describe(
    "The ID of the target component type associated with this relationship.",
  ).optional(),
});

const DataTypeSchema = z.object({
  AllowedValues: z.array(DataValueSchema).describe(
    "The allowed values for this data type.",
  ).optional(),
  NestedType: z.record(z.string(), z.unknown()).describe(
    "The nested type in the data type.",
  ).optional(),
  Relationship: RelationshipSchema.describe(
    "A relationship that associates a component with another component.",
  ).optional(),
  Type: z.enum([
    "RELATIONSHIP",
    "STRING",
    "LONG",
    "BOOLEAN",
    "INTEGER",
    "DOUBLE",
    "LIST",
    "MAP",
  ]).describe("The underlying type of the data type.").optional(),
  UnitOfMeasure: z.string().min(1).max(256).regex(new RegExp(".*")).describe(
    "The unit of measure used in this data type.",
  ).optional(),
});

const DefinitionSchema = z.object({
  Configuration: z.record(
    z.string(),
    z.string().min(1).max(256).regex(new RegExp("[a-zA-Z_\\-0-9]+")),
  ).describe(
    "An object that specifies information about a property configuration.",
  ).optional(),
  DataType: DataTypeSchema.describe(
    "An object that contains information about the data type.",
  ).optional(),
  DefaultValue: DataValueSchema.describe(
    "An object that contains the default value.",
  ).optional(),
  IsExternalId: z.boolean().describe(
    "A Boolean value that specifies whether the property ID comes from an external data store.",
  ).optional(),
  IsFinal: z.boolean().describe(
    "A Boolean value that specifies whether the property definition can be updated.",
  ).optional(),
  IsImported: z.boolean().describe(
    "A Boolean value that specifies whether the property definition is imported from an external data store.",
  ).optional(),
  IsInherited: z.boolean().describe(
    "A Boolean value that specifies whether the property definition is inherited from a parent entity.",
  ).optional(),
  IsRequiredInEntity: z.boolean().describe(
    "A Boolean value that specifies whether the property is required.",
  ).optional(),
  IsStoredExternally: z.boolean().describe(
    "A Boolean value that specifies whether the property is stored externally.",
  ).optional(),
  IsTimeSeries: z.boolean().describe(
    "A Boolean value that specifies whether the property consists of time series data.",
  ).optional(),
});

const PropertySchema = z.object({
  Definition: DefinitionSchema.describe("The definition of the property.")
    .optional(),
  Value: DataValueSchema.describe("The value of the property.").optional(),
});

const PropertyGroupSchema = z.object({
  GroupType: z.enum(["TABULAR"]).describe("The type of property group.")
    .optional(),
  PropertyNames: z.array(z.string().regex(new RegExp("[a-zA-Z_\\-0-9]+")))
    .describe("The list of property names in the property group.").optional(),
});

const StatusSchema = z.object({
  State: z.enum(["CREATING", "UPDATING", "DELETING", "ACTIVE", "ERROR"])
    .optional(),
  Error: z.record(z.string(), z.unknown()).optional(),
});

const ComponentSchema = z.object({
  ComponentName: z.string().min(1).max(256).regex(
    new RegExp("[a-zA-Z_\\-0-9]+"),
  ).describe("The name of the component.").optional(),
  ComponentTypeId: z.string().min(1).max(256).regex(
    new RegExp("[a-zA-Z_\\-0-9]+"),
  ).describe("The ID of the component type.").optional(),
  Description: z.string().min(0).max(512).describe(
    "The description of the component.",
  ).optional(),
  DefinedIn: z.string().min(1).max(256).describe(
    "The name of the property definition set in the component.",
  ).optional(),
  Properties: z.record(z.string(), PropertySchema).describe(
    "An object that maps strings to the properties to set in the component type. Each string in the mapping must be unique to this object.",
  ).optional(),
  PropertyGroups: z.record(z.string(), PropertyGroupSchema).describe(
    "An object that maps strings to the property groups to set in the component type. Each string in the mapping must be unique to this object.",
  ).optional(),
  Status: StatusSchema.describe("The current status of the entity.").optional(),
});

const CompositeComponentSchema = z.object({
  ComponentName: z.string().min(1).max(256).regex(
    new RegExp("[a-zA-Z_\\-0-9]+"),
  ).describe("The name of the component.").optional(),
  ComponentPath: z.string().min(1).max(256).regex(
    new RegExp("[a-zA-Z_\\-0-9/]+"),
  ).describe("The path of the component.").optional(),
  ComponentTypeId: z.string().min(1).max(256).regex(
    new RegExp("[a-zA-Z_\\-0-9]+"),
  ).describe("The ID of the component type.").optional(),
  Description: z.string().min(0).max(512).describe(
    "The description of the component.",
  ).optional(),
  Properties: z.record(z.string(), PropertySchema).describe(
    "An object that maps strings to the properties to set in the component type. Each string in the mapping must be unique to this object.",
  ).optional(),
  PropertyGroups: z.record(z.string(), PropertyGroupSchema).describe(
    "An object that maps strings to the property groups to set in the component type. Each string in the mapping must be unique to this object.",
  ).optional(),
  Status: StatusSchema.describe("The current status of the component.")
    .optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
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
    "AWS region; overrides AWS_REGION / AWS_DEFAULT_REGION environment variables and ~/.aws/config profile region. Defaults to us-east-1.",
  ).optional(),
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
  Components: z.record(z.string(), ComponentSchema).describe(
    "A map that sets information about a component type.",
  ).optional(),
  CompositeComponents: z.record(z.string(), CompositeComponentSchema).describe(
    "A map that sets information about a composite component.",
  ).optional(),
});

const StateSchema = z.object({
  EntityId: z.string(),
  EntityName: z.string().optional(),
  Status: StatusSchema.optional(),
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
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
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
  Components: z.record(z.string(), ComponentSchema).describe(
    "A map that sets information about a component type.",
  ).optional(),
  CompositeComponents: z.record(z.string(), CompositeComponentSchema).describe(
    "A map that sets information about a composite component.",
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

/** Swamp extension model for IoTTwinMaker Entity. Registered at `@swamp/aws/iottwinmaker/entity`. */
export const model = {
  type: "@swamp/aws/iottwinmaker/entity",
  version: "2026.10.25.1",
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
    {
      toVersion: "2026.06.06.1",
      description: "Added: accessKeyId, secretAccessKey, sessionToken, region",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.15.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.17.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.17.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.25.1",
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
        const credentials = _buildCredentials(g);
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::IoTTwinMaker::Entity",
          desiredState,
          credentials,
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
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::IoTTwinMaker::Entity",
          args.identifier,
          credentials,
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
        const credentials = _buildCredentials(g);
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
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::IoTTwinMaker::Entity",
          identifier,
          currentState,
          desiredState,
          ["WorkspaceId", "EntityId"],
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
      description: "Delete a IoTTwinMaker Entity",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoTTwinMaker Entity",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::IoTTwinMaker::Entity",
          args.identifier,
          credentials,
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
        const credentials = _buildCredentials(g);
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
    list: {
      description: "List IoTTwinMaker Entity resources",
      arguments: z.object({
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
        resourceModel: z.string().describe(
          "JSON resource model for parent-scoped listing (e.g. parent identifier)",
        ).optional(),
      }),
      execute: async (
        args: { maxPages?: number; resourceModel?: string },
        context: any,
      ) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { items, nextToken } = await listResources(
          "AWS::IoTTwinMaker::Entity",
          {
            resourceModel: args.resourceModel,
            maxPages: args.maxPages,
            credentials,
          },
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const instanceName = item.identifier.replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, "");
          const handle = await context.writeResource("state", instanceName, {
            ...item.properties,
            _identifier: item.identifier,
          });
          dataHandles.push(handle);
        }
        return {
          dataHandles,
          result: { count: items.length, nextPageToken: nextToken },
        };
      },
    },
  },
};
