// Auto-generated extension model for @swamp/aws/pinpoint/in-app-template
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Pinpoint InAppTemplate (AWS::Pinpoint::InAppTemplate).
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

const BodyConfigSchema = z.object({
  Alignment: z.enum(["LEFT", "CENTER", "RIGHT"]).optional(),
  Body: z.string().optional(),
  TextColor: z.string().optional(),
});

const HeaderConfigSchema = z.object({
  Alignment: z.enum(["LEFT", "CENTER", "RIGHT"]).optional(),
  Header: z.string().optional(),
  TextColor: z.string().optional(),
});

const OverrideButtonConfigurationSchema = z.object({
  ButtonAction: z.enum(["LINK", "DEEP_LINK", "CLOSE"]).optional(),
  Link: z.string().optional(),
});

const DefaultButtonConfigurationSchema = z.object({
  BackgroundColor: z.string().optional(),
  BorderRadius: z.number().int().optional(),
  ButtonAction: z.enum(["LINK", "DEEP_LINK", "CLOSE"]).optional(),
  Link: z.string().optional(),
  Text: z.string().optional(),
  TextColor: z.string().optional(),
});

const ButtonConfigSchema = z.object({
  Android: OverrideButtonConfigurationSchema.optional(),
  DefaultConfig: DefaultButtonConfigurationSchema.optional(),
  IOS: OverrideButtonConfigurationSchema.optional(),
  Web: OverrideButtonConfigurationSchema.optional(),
});

const InAppMessageContentSchema = z.object({
  BackgroundColor: z.string().optional(),
  BodyConfig: BodyConfigSchema.optional(),
  HeaderConfig: HeaderConfigSchema.optional(),
  ImageUrl: z.string().optional(),
  PrimaryBtn: ButtonConfigSchema.optional(),
  SecondaryBtn: ButtonConfigSchema.optional(),
});

const GlobalArgsSchema = z.object({
  Content: z.array(InAppMessageContentSchema).optional(),
  CustomConfig: z.record(z.string(), z.unknown()).optional(),
  Layout: z.enum([
    "BOTTOM_BANNER",
    "TOP_BANNER",
    "OVERLAYS",
    "MOBILE_FEED",
    "MIDDLE_BANNER",
    "CAROUSEL",
  ]).optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
  TemplateDescription: z.string().optional(),
  TemplateName: z.string(),
});

const StateSchema = z.object({
  Arn: z.string().optional(),
  Content: z.array(InAppMessageContentSchema).optional(),
  CustomConfig: z.record(z.string(), z.unknown()).optional(),
  Layout: z.string().optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
  TemplateDescription: z.string().optional(),
  TemplateName: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  Content: z.array(InAppMessageContentSchema).optional(),
  CustomConfig: z.record(z.string(), z.unknown()).optional(),
  Layout: z.enum([
    "BOTTOM_BANNER",
    "TOP_BANNER",
    "OVERLAYS",
    "MOBILE_FEED",
    "MIDDLE_BANNER",
    "CAROUSEL",
  ]).optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
  TemplateDescription: z.string().optional(),
  TemplateName: z.string().optional(),
});

/** Swamp extension model for Pinpoint InAppTemplate. Registered at `@swamp/aws/pinpoint/in-app-template`. */
export const model = {
  type: "@swamp/aws/pinpoint/in-app-template",
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
      description: "Pinpoint InAppTemplate resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Pinpoint InAppTemplate",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Pinpoint::InAppTemplate",
          desiredState,
        ) as StateData;
        const instanceName =
          ((result.TemplateName ?? g.TemplateName)?.toString() ?? "current")
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
      description: "Get a Pinpoint InAppTemplate",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Pinpoint InAppTemplate",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Pinpoint::InAppTemplate",
          args.identifier,
        ) as StateData;
        const instanceName =
          ((result.TemplateName ?? context.globalArgs.TemplateName)
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
      description: "Update a Pinpoint InAppTemplate",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.TemplateName?.toString() ?? "current").replace(
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
        const identifier = existing.TemplateName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Pinpoint::InAppTemplate",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Pinpoint::InAppTemplate",
          identifier,
          currentState,
          desiredState,
          ["TemplateName"],
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
      description: "Delete a Pinpoint InAppTemplate",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Pinpoint InAppTemplate",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Pinpoint::InAppTemplate",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.TemplateName?.toString() ?? args.identifier)
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
      description: "Sync Pinpoint InAppTemplate state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.TemplateName?.toString() ?? "current").replace(
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
        const identifier = existing.TemplateName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Pinpoint::InAppTemplate",
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
