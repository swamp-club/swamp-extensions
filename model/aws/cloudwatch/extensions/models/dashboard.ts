// Auto-generated extension model for @swamp/aws/cloudwatch/dashboard
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for CloudWatch Dashboard (AWS::CloudWatch::Dashboard).
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

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe(
    "A unique identifier for the tag. The combination of tag keys and values can help you organize and categorize your resources.",
  ),
  Value: z.string().min(1).max(256).describe(
    "The value for the specified tag key.",
  ),
});

const GlobalArgsSchema = z.object({
  DashboardName: z.string().describe(
    "The name of the dashboard. The name must be between 1 and 255 characters. If you do not specify a name, one will be generated automatically.",
  ).optional(),
  DashboardBody: z.string().describe(
    "The detailed information about the dashboard in JSON format, including the widgets to include and their location on the dashboard",
  ),
  Tags: z.array(TagSchema).describe(
    "A list of key-value pairs to associate with the cloudwatch dashboard. You can associate up to 50 tags with a dashboard",
  ).optional(),
});

const StateSchema = z.object({
  DashboardName: z.string(),
  DashboardBody: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  DashboardName: z.string().describe(
    "The name of the dashboard. The name must be between 1 and 255 characters. If you do not specify a name, one will be generated automatically.",
  ).optional(),
  DashboardBody: z.string().describe(
    "The detailed information about the dashboard in JSON format, including the widgets to include and their location on the dashboard",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of key-value pairs to associate with the cloudwatch dashboard. You can associate up to 50 tags with a dashboard",
  ).optional(),
});

/** Swamp extension model for CloudWatch Dashboard. Registered at `@swamp/aws/cloudwatch/dashboard`. */
export const model = {
  type: "@swamp/aws/cloudwatch/dashboard",
  version: "2026.05.14.1",
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
      toVersion: "2026.05.14.1",
      description: "Added: Tags",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "CloudWatch Dashboard resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CloudWatch Dashboard",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::CloudWatch::Dashboard",
          desiredState,
        ) as StateData;
        const instanceName =
          ((result.DashboardName ?? g.DashboardName)?.toString() ?? "current")
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
      description: "Get a CloudWatch Dashboard",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudWatch Dashboard",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::CloudWatch::Dashboard",
          args.identifier,
        ) as StateData;
        const instanceName =
          ((result.DashboardName ?? context.globalArgs.DashboardName)
            ?.toString() ?? args.identifier).replace(/[\/\\]/g, "_").replace(
              /\.\./g,
              "_",
            ).replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a CloudWatch Dashboard",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.DashboardName?.toString() ?? "current").replace(
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
        const identifier = existing.DashboardName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::CloudWatch::Dashboard",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::CloudWatch::Dashboard",
          identifier,
          currentState,
          desiredState,
          ["DashboardName"],
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
      description: "Delete a CloudWatch Dashboard",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudWatch Dashboard",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::CloudWatch::Dashboard",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.DashboardName?.toString() ?? args.identifier)
            .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
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
      description: "Sync CloudWatch Dashboard state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.DashboardName?.toString() ?? "current").replace(
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
        const identifier = existing.DashboardName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::CloudWatch::Dashboard",
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
