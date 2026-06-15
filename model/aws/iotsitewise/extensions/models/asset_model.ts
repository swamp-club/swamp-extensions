// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/aws/iotsitewise/asset-model
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any no-control-regex

/**
 * Swamp extension model for IoTSiteWise AssetModel (AWS::IoTSiteWise::AssetModel).
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

const AttributeSchema = z.object({
  DefaultValue: z.string().optional(),
});

const PropertyPathDefinitionSchema = z.object({
  Name: z.string().describe("The name of the property"),
});

const VariableValueSchema = z.object({
  PropertyLogicalId: z.string().min(1).max(256).regex(
    new RegExp("[^\\u0000-\\u001F\\u007F]+"),
  ).optional(),
  PropertyId: z.string().min(36).max(36).regex(
    new RegExp(
      "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$",
    ),
  ).describe("The ID of the property that is trying to be referenced")
    .optional(),
  PropertyExternalId: z.string().min(2).max(128).regex(
    new RegExp("[a-zA-Z0-9_][a-zA-Z_\\-0-9.:]*[a-zA-Z0-9_]+"),
  ).describe("The External ID of the property that is trying to be referenced")
    .optional(),
  PropertyPath: z.array(PropertyPathDefinitionSchema).describe(
    "The path of the property that is trying to be referenced",
  ).optional(),
  HierarchyLogicalId: z.string().min(1).max(256).regex(
    new RegExp("[^\\u0000-\\u001F\\u007F]+"),
  ).optional(),
  HierarchyId: z.string().min(36).max(36).regex(
    new RegExp(
      "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$",
    ),
  ).describe("The ID of the hierarchy that is trying to be referenced")
    .optional(),
  HierarchyExternalId: z.string().min(2).max(128).regex(
    new RegExp("[a-zA-Z0-9_][a-zA-Z_\\-0-9.:]*[a-zA-Z0-9_]+"),
  ).describe("The External ID of the hierarchy that is trying to be referenced")
    .optional(),
});

const ExpressionVariableSchema = z.object({
  Name: z.string().describe(
    "The friendly name of the variable to be used in the expression.",
  ),
  Value: VariableValueSchema.describe(
    "The variable that identifies an asset property from which to use values.",
  ),
});

const TransformSchema = z.object({
  Expression: z.string().describe(
    "The mathematical expression that defines the transformation function. You can specify up to 10 functions per expression.",
  ),
  Variables: z.array(ExpressionVariableSchema).describe(
    "The list of variables used in the expression.",
  ),
});

const TumblingWindowSchema = z.object({
  Interval: z.string().describe("The time interval for the tumbling window."),
  Offset: z.string().describe(
    "The shift or reference point on timeline for the contiguous time intervals.",
  ).optional(),
});

const MetricWindowSchema = z.object({
  Tumbling: TumblingWindowSchema.describe(
    "Contains a tumbling window, which is a repeating fixed-sized, non-overlapping, and contiguous time interval. This window is used in metric and aggregation computations.",
  ).optional(),
});

const MetricSchema = z.object({
  Expression: z.string().describe(
    "The mathematical expression that defines the metric aggregation function. You can specify up to 10 functions per expression.",
  ),
  Variables: z.array(ExpressionVariableSchema).describe(
    "The list of variables used in the expression.",
  ),
  Window: MetricWindowSchema.describe(
    "The window (time interval) over which AWS IoT SiteWise computes the metric's aggregation expression",
  ),
});

const PropertyTypeSchema = z.object({
  TypeName: z.enum(["Measurement", "Attribute", "Transform", "Metric"]),
  Attribute: AttributeSchema.optional(),
  Transform: TransformSchema.optional(),
  Metric: MetricSchema.optional(),
});

const AssetModelPropertySchema = z.object({
  LogicalId: z.string().min(1).max(256).regex(
    new RegExp("[^\\u0000-\\u001F\\u007F]+"),
  ).describe("Customer provided Logical ID for property.").optional(),
  Id: z.string().min(36).max(36).regex(
    new RegExp(
      "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$",
    ),
  ).describe("The ID of the Asset Model Property").optional(),
  ExternalId: z.string().min(2).max(128).regex(
    new RegExp("[a-zA-Z0-9_][a-zA-Z_\\-0-9.:]*[a-zA-Z0-9_]+"),
  ).describe("The External ID of the Asset Model Property").optional(),
  Name: z.string().describe("The name of the asset model property."),
  DataType: z.enum(["STRING", "INTEGER", "DOUBLE", "BOOLEAN", "STRUCT"])
    .describe("The data type of the asset model property."),
  DataTypeSpec: z.enum(["AWS/ALARM_STATE"]).describe(
    "The data type of the structure for this property.",
  ).optional(),
  Unit: z.string().describe(
    "The unit of the asset model property, such as Newtons or RPM.",
  ).optional(),
  Type: PropertyTypeSchema.describe("The property type"),
});

const AssetModelCompositeModelSchema = z.object({
  Id: z.string().min(36).max(36).regex(
    new RegExp(
      "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$",
    ),
  ).describe("The Actual ID of the composite model").optional(),
  ExternalId: z.string().min(2).max(128).regex(
    new RegExp("[a-zA-Z0-9_][a-zA-Z_\\-0-9.:]*[a-zA-Z0-9_]+"),
  ).describe("The External ID of the composite model").optional(),
  ComposedAssetModelId: z.string().describe(
    "The component model ID for which the composite model is composed of",
  ).optional(),
  ParentAssetModelCompositeModelExternalId: z.string().min(2).max(128).regex(
    new RegExp("[a-zA-Z0-9_][a-zA-Z_\\-0-9.:]*[a-zA-Z0-9_]+"),
  ).describe("The parent composite model External ID").optional(),
  Path: z.array(z.string()).describe(
    "The path of the composite model. This is only for derived composite models",
  ).optional(),
  Description: z.string().describe(
    "A description for the asset composite model.",
  ).optional(),
  Name: z.string().describe(
    "A unique, friendly name for the asset composite model.",
  ),
  Type: z.string().describe(
    "The type of the composite model. For alarm composite models, this type is AWS/ALARM",
  ),
  CompositeModelProperties: z.array(AssetModelPropertySchema).describe(
    "The property definitions of the asset model. You can specify up to 200 properties per asset model.",
  ).optional(),
});

const AssetModelHierarchySchema = z.object({
  Id: z.string().min(36).max(36).regex(
    new RegExp(
      "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$",
    ),
  ).describe("Customer provided actual ID for hierarchy").optional(),
  ExternalId: z.string().min(2).max(128).regex(
    new RegExp("[a-zA-Z0-9_][a-zA-Z_\\-0-9.:]*[a-zA-Z0-9_]+"),
  ).describe("Customer provided external ID for hierarchy").optional(),
  LogicalId: z.string().min(1).max(256).regex(
    new RegExp("[^\\u0000-\\u001F\\u007F]+"),
  ).describe("Customer provided logical ID for hierarchy.").optional(),
  Name: z.string().describe("The name of the asset model hierarchy."),
  ChildAssetModelId: z.string().describe(
    "The ID of the asset model. All assets in this hierarchy must be instances of the child AssetModelId asset model.",
  ),
});

const EnforcedAssetModelInterfacePropertyMappingSchema = z.object({
  AssetModelPropertyExternalId: z.string().describe(
    "The external ID of the enforced asset model property",
  ).optional(),
  AssetModelPropertyLogicalId: z.string().describe(
    "The logical ID of the enforced asset model property",
  ).optional(),
  InterfaceAssetModelPropertyExternalId: z.string().describe(
    "The external ID of the enforced interface property",
  ),
});

const EnforcedAssetModelInterfaceRelationshipSchema = z.object({
  InterfaceAssetModelId: z.string().describe(
    "The ID of the interface that is enforced to the asset model",
  ).optional(),
  PropertyMappings: z.array(EnforcedAssetModelInterfacePropertyMappingSchema)
    .describe(
      "Contains information about enforced interface property and asset model property",
    ).optional(),
});

const TagSchema = z.object({
  Key: z.string(),
  Value: z.string(),
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
  AssetModelType: z.string().describe(
    "The type of the asset model (ASSET_MODEL OR COMPONENT_MODEL or INTERFACE)",
  ).optional(),
  AssetModelExternalId: z.string().min(2).max(128).regex(
    new RegExp("[a-zA-Z0-9_][a-zA-Z_\\-0-9.:]*[a-zA-Z0-9_]+"),
  ).describe("The external ID of the asset model.").optional(),
  AssetModelName: z.string().describe(
    "A unique, friendly name for the asset model.",
  ),
  AssetModelDescription: z.string().describe(
    "A description for the asset model.",
  ).optional(),
  AssetModelProperties: z.array(AssetModelPropertySchema).describe(
    "The property definitions of the asset model. You can specify up to 200 properties per asset model.",
  ).optional(),
  AssetModelCompositeModels: z.array(AssetModelCompositeModelSchema).describe(
    "The composite asset models that are part of this asset model. Composite asset models are asset models that contain specific properties.",
  ).optional(),
  AssetModelHierarchies: z.array(AssetModelHierarchySchema).describe(
    "The hierarchy definitions of the asset model. Each hierarchy specifies an asset model whose assets can be children of any other assets created from this asset model. You can specify up to 10 hierarchies per asset model.",
  ).optional(),
  EnforcedAssetModelInterfaceRelationships: z.array(
    EnforcedAssetModelInterfaceRelationshipSchema,
  ).describe("a list of asset model and interface relationships").optional(),
  Tags: z.array(TagSchema).describe(
    "A list of key-value pairs that contain metadata for the asset model.",
  ).optional(),
});

const StateSchema = z.object({
  AssetModelId: z.string(),
  AssetModelType: z.string().optional(),
  AssetModelExternalId: z.string().optional(),
  AssetModelArn: z.string().optional(),
  AssetModelName: z.string().optional(),
  AssetModelDescription: z.string().optional(),
  AssetModelProperties: z.array(AssetModelPropertySchema).optional(),
  AssetModelCompositeModels: z.array(AssetModelCompositeModelSchema).optional(),
  AssetModelHierarchies: z.array(AssetModelHierarchySchema).optional(),
  EnforcedAssetModelInterfaceRelationships: z.array(
    EnforcedAssetModelInterfaceRelationshipSchema,
  ).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AssetModelType: z.string().describe(
    "The type of the asset model (ASSET_MODEL OR COMPONENT_MODEL or INTERFACE)",
  ).optional(),
  AssetModelExternalId: z.string().min(2).max(128).regex(
    new RegExp("[a-zA-Z0-9_][a-zA-Z_\\-0-9.:]*[a-zA-Z0-9_]+"),
  ).describe("The external ID of the asset model.").optional(),
  AssetModelName: z.string().describe(
    "A unique, friendly name for the asset model.",
  ).optional(),
  AssetModelDescription: z.string().describe(
    "A description for the asset model.",
  ).optional(),
  AssetModelProperties: z.array(AssetModelPropertySchema).describe(
    "The property definitions of the asset model. You can specify up to 200 properties per asset model.",
  ).optional(),
  AssetModelCompositeModels: z.array(AssetModelCompositeModelSchema).describe(
    "The composite asset models that are part of this asset model. Composite asset models are asset models that contain specific properties.",
  ).optional(),
  AssetModelHierarchies: z.array(AssetModelHierarchySchema).describe(
    "The hierarchy definitions of the asset model. Each hierarchy specifies an asset model whose assets can be children of any other assets created from this asset model. You can specify up to 10 hierarchies per asset model.",
  ).optional(),
  EnforcedAssetModelInterfaceRelationships: z.array(
    EnforcedAssetModelInterfaceRelationshipSchema,
  ).describe("a list of asset model and interface relationships").optional(),
  Tags: z.array(TagSchema).describe(
    "A list of key-value pairs that contain metadata for the asset model.",
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

/** Swamp extension model for IoTSiteWise AssetModel. Registered at `@swamp/aws/iotsitewise/asset-model`. */
export const model = {
  type: "@swamp/aws/iotsitewise/asset-model",
  version: "2026.06.15.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "IoTSiteWise AssetModel resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a IoTSiteWise AssetModel",
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
          "AWS::IoTSiteWise::AssetModel",
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
      description: "Get a IoTSiteWise AssetModel",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoTSiteWise AssetModel",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::IoTSiteWise::AssetModel",
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
      description: "Update a IoTSiteWise AssetModel",
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
        const identifier = existing.AssetModelId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::IoTSiteWise::AssetModel",
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
          "AWS::IoTSiteWise::AssetModel",
          identifier,
          currentState,
          desiredState,
          ["AssetModelType"],
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
      description: "Delete a IoTSiteWise AssetModel",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoTSiteWise AssetModel",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::IoTSiteWise::AssetModel",
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
      description: "Sync IoTSiteWise AssetModel state from AWS",
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
        const identifier = existing.AssetModelId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::IoTSiteWise::AssetModel",
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
