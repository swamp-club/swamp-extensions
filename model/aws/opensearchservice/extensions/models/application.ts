// Auto-generated extension model for @swamp/aws/opensearchservice/application
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for OpenSearchService Application (AWS::OpenSearchService::Application).
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

const AppConfigSchema = z.object({
  Key: z.enum([
    "opensearchDashboards.dashboardAdmin.users",
    "opensearchDashboards.dashboardAdmin.groups",
  ]).describe("The configuration key"),
  Value: z.string().min(0).max(256).describe("The configuration value."),
});

const DataSourceSchema = z.object({
  DataSourceArn: z.string().describe("The ARN of the data source."),
  DataSourceDescription: z.string().describe("Description of the data source.")
    .optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe("The key in the key-value pair"),
  Value: z.string().min(0).max(256).describe("The value in the key-value pair"),
});

const GlobalArgsSchema = z.object({
  IamIdentityCenterOptions: z.object({
    Enabled: z.boolean().describe("Whether IAM Identity Center is enabled.")
      .optional(),
    IamIdentityCenterInstanceArn: z.string().describe(
      "The ARN of the IAM Identity Center instance.",
    ).optional(),
    IamRoleForIdentityCenterApplicationArn: z.string().describe(
      "The ARN of the IAM role for Identity Center application.",
    ).optional(),
  }).describe("Options for configuring IAM Identity Center").optional(),
  Name: z.string().min(3).max(40).regex(new RegExp("[a-z][a-z0-9\\-]+"))
    .describe("The name of the application."),
  Endpoint: z.string().describe("The endpoint for the application.").optional(),
  AppConfigs: z.array(AppConfigSchema).describe(
    "List of application configurations.",
  ).optional(),
  KmsKeyArn: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:aws(-[a-z]+)*:kms:[a-z0-9-]+:\\d{12}:key/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$",
    ),
  ).describe("The ARN of the KMS key used to encrypt the application.")
    .optional(),
  DataSources: z.array(DataSourceSchema).describe("List of data sources.")
    .optional(),
  Tags: z.array(TagSchema).describe(
    "An arbitrary set of tags (key-value pairs) for this application.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string().optional(),
  IamIdentityCenterOptions: z.object({
    Enabled: z.boolean(),
    IamIdentityCenterInstanceArn: z.string(),
    IamRoleForIdentityCenterApplicationArn: z.string(),
  }).optional(),
  Id: z.string().optional(),
  Name: z.string(),
  Endpoint: z.string().optional(),
  AppConfigs: z.array(AppConfigSchema).optional(),
  KmsKeyArn: z.string().optional(),
  DataSources: z.array(DataSourceSchema).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  IamIdentityCenterOptions: z.object({
    Enabled: z.boolean().describe("Whether IAM Identity Center is enabled.")
      .optional(),
    IamIdentityCenterInstanceArn: z.string().describe(
      "The ARN of the IAM Identity Center instance.",
    ).optional(),
    IamRoleForIdentityCenterApplicationArn: z.string().describe(
      "The ARN of the IAM role for Identity Center application.",
    ).optional(),
  }).describe("Options for configuring IAM Identity Center").optional(),
  Name: z.string().min(3).max(40).regex(new RegExp("[a-z][a-z0-9\\-]+"))
    .describe("The name of the application.").optional(),
  Endpoint: z.string().describe("The endpoint for the application.").optional(),
  AppConfigs: z.array(AppConfigSchema).describe(
    "List of application configurations.",
  ).optional(),
  KmsKeyArn: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:aws(-[a-z]+)*:kms:[a-z0-9-]+:\\d{12}:key/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$",
    ),
  ).describe("The ARN of the KMS key used to encrypt the application.")
    .optional(),
  DataSources: z.array(DataSourceSchema).describe("List of data sources.")
    .optional(),
  Tags: z.array(TagSchema).describe(
    "An arbitrary set of tags (key-value pairs) for this application.",
  ).optional(),
});

/** Swamp extension model for OpenSearchService Application. Registered at `@swamp/aws/opensearchservice/application`. */
export const model = {
  type: "@swamp/aws/opensearchservice/application",
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
      description: "OpenSearchService Application resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a OpenSearchService Application",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::OpenSearchService::Application",
          desiredState,
        ) as StateData;
        const instanceName = ((result.Name ?? g.Name)?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a OpenSearchService Application",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the OpenSearchService Application",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::OpenSearchService::Application",
          args.identifier,
        ) as StateData;
        const instanceName =
          ((result.Name ?? context.globalArgs.Name)?.toString() ??
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
      description: "Update a OpenSearchService Application",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.Name?.toString() ?? "current").replace(
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
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::OpenSearchService::Application",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::OpenSearchService::Application",
          identifier,
          currentState,
          desiredState,
          ["Name", "KmsKeyArn"],
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
      description: "Delete a OpenSearchService Application",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the OpenSearchService Application",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::OpenSearchService::Application",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.Name?.toString() ?? args.identifier).replace(
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
      description: "Sync OpenSearchService Application state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.Name?.toString() ?? "current").replace(
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
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::OpenSearchService::Application",
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
