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

// Auto-generated extension model for @swamp/aws/connect/workspace
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Connect Workspace (AWS::Connect::Workspace).
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

const PaletteHeaderSchema = z.object({
  Background: z.string().min(1).max(127).regex(new RegExp(".*\\S.*"))
    .optional(),
  Text: z.string().min(1).max(127).regex(new RegExp(".*\\S.*")).optional(),
  TextHover: z.string().min(1).max(127).regex(new RegExp(".*\\S.*")).optional(),
  InvertActionsColors: z.boolean().optional(),
});

const PaletteNavigationSchema = z.object({
  Background: z.string().min(1).max(127).regex(new RegExp(".*\\S.*"))
    .optional(),
  TextBackgroundHover: z.string().min(1).max(127).regex(new RegExp(".*\\S.*"))
    .optional(),
  TextBackgroundActive: z.string().min(1).max(127).regex(new RegExp(".*\\S.*"))
    .optional(),
  Text: z.string().min(1).max(127).regex(new RegExp(".*\\S.*")).optional(),
  TextHover: z.string().min(1).max(127).regex(new RegExp(".*\\S.*")).optional(),
  TextActive: z.string().min(1).max(127).regex(new RegExp(".*\\S.*"))
    .optional(),
  InvertActionsColors: z.boolean().optional(),
});

const PaletteCanvasSchema = z.object({
  ContainerBackground: z.string().min(1).max(127).regex(new RegExp(".*\\S.*"))
    .optional(),
  PageBackground: z.string().min(1).max(127).regex(new RegExp(".*\\S.*"))
    .optional(),
  ActiveBackground: z.string().min(1).max(127).regex(new RegExp(".*\\S.*"))
    .optional(),
});

const PalettePrimarySchema = z.object({
  Default: z.string().min(1).max(127).regex(new RegExp(".*\\S.*")).optional(),
  Active: z.string().min(1).max(127).regex(new RegExp(".*\\S.*")).optional(),
  ContrastText: z.string().min(1).max(127).regex(new RegExp(".*\\S.*"))
    .optional(),
});

const WorkspaceThemePaletteSchema = z.object({
  Header: PaletteHeaderSchema.optional(),
  Navigation: PaletteNavigationSchema.optional(),
  Canvas: PaletteCanvasSchema.optional(),
  Primary: PalettePrimarySchema.optional(),
});

const FontFamilySchema = z.object({
  Default: z.enum([
    "ARIAL",
    "COURIER_NEW",
    "GEORGIA",
    "TIMES_NEW_ROMAN",
    "TREBUCHET",
    "VERDANA",
  ]).optional(),
});

const WorkspaceThemeTypographySchema = z.object({
  FontFamily: FontFamilySchema.optional(),
});

const WorkspaceThemeConfigSchema = z.object({
  Palette: WorkspaceThemePaletteSchema.optional(),
  Typography: WorkspaceThemeTypographySchema.optional(),
});

const MediaItemSchema = z.object({
  Type: z.enum([
    "IMAGE_LOGO_LIGHT_FAVICON",
    "IMAGE_LOGO_DARK_FAVICON",
    "IMAGE_LOGO_LIGHT_HORIZONTAL",
    "IMAGE_LOGO_DARK_HORIZONTAL",
  ]).describe("The type of media"),
  Source: z.string().min(1).max(533333).regex(new RegExp(".*\\S.*")).optional(),
});

const WorkspacePageSchema = z.object({
  ResourceArn: z.string().max(2048).describe(
    "The Amazon Resource Name (ARN) of the resource associated with the page.",
  ),
  Page: z.string().min(1).max(25).regex(
    new RegExp("^(?!\\.$)(?!\\.\\.$)[\\p{L}\\p{Z}\\p{N}\\-_.:=@'|]+$", "u"),
  ).describe("The page identifier."),
  Slug: z.string().min(0).max(63).regex(
    new RegExp("^$|^[\\p{L}\\p{Z}\\p{N}\\-_.:=@'|]{3,}$", "u"),
  ).describe("The slug for the page.").optional(),
  InputData: z.string().min(0).max(4096).describe(
    "The input data for the page.",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
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
    "AWS region; overrides AWS_REGION environment variable. Defaults to us-east-1.",
  ).optional(),
  Name: z.string().min(1).max(127).regex(new RegExp(".*\\S.*")).describe(
    "The name of the workspace.",
  ),
  InstanceArn: z.string().regex(
    new RegExp(
      "^arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*$",
    ),
  ).describe("The identifier of the Amazon Connect instance."),
  Visibility: z.enum(["ALL", "ASSIGNED", "NONE"]).describe(
    "The visibility of the workspace. Will always be set to ASSIGNED oninitial creation.",
  ).optional(),
  Description: z.string().min(0).max(500).regex(new RegExp("^[\\P{C}\r\n\t]*$"))
    .describe("The description of the workspace").optional(),
  Title: z.string().min(0).max(127).regex(new RegExp("^[\\P{C}]*$")).describe(
    "The title of the workspace",
  ).optional(),
  Theme: z.object({
    Light: WorkspaceThemeConfigSchema.optional(),
    Dark: WorkspaceThemeConfigSchema.optional(),
  }).describe("The theme configuration for the workspace").optional(),
  Media: z.array(MediaItemSchema).describe("The media items for the workspace")
    .optional(),
  Pages: z.array(WorkspacePageSchema).describe(
    "The pages associated with the workspace",
  ).optional(),
  Associations: z.array(z.string().max(2048)).describe(
    "The resource ARNs associated with the workspace",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  Name: z.string().optional(),
  Id: z.string().optional(),
  InstanceArn: z.string().optional(),
  Visibility: z.string().optional(),
  Description: z.string().optional(),
  Title: z.string().optional(),
  Theme: z.object({
    Light: WorkspaceThemeConfigSchema,
    Dark: WorkspaceThemeConfigSchema,
  }).optional(),
  Media: z.array(MediaItemSchema).optional(),
  Pages: z.array(WorkspacePageSchema).optional(),
  Associations: z.array(z.string()).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().min(1).max(127).regex(new RegExp(".*\\S.*")).describe(
    "The name of the workspace.",
  ).optional(),
  InstanceArn: z.string().regex(
    new RegExp(
      "^arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*$",
    ),
  ).describe("The identifier of the Amazon Connect instance.").optional(),
  Visibility: z.enum(["ALL", "ASSIGNED", "NONE"]).describe(
    "The visibility of the workspace. Will always be set to ASSIGNED oninitial creation.",
  ).optional(),
  Description: z.string().min(0).max(500).regex(new RegExp("^[\\P{C}\r\n\t]*$"))
    .describe("The description of the workspace").optional(),
  Title: z.string().min(0).max(127).regex(new RegExp("^[\\P{C}]*$")).describe(
    "The title of the workspace",
  ).optional(),
  Theme: z.object({
    Light: WorkspaceThemeConfigSchema.optional(),
    Dark: WorkspaceThemeConfigSchema.optional(),
  }).describe("The theme configuration for the workspace").optional(),
  Media: z.array(MediaItemSchema).describe("The media items for the workspace")
    .optional(),
  Pages: z.array(WorkspacePageSchema).describe(
    "The pages associated with the workspace",
  ).optional(),
  Associations: z.array(z.string().max(2048)).describe(
    "The resource ARNs associated with the workspace",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
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

/** Swamp extension model for Connect Workspace. Registered at `@swamp/aws/connect/workspace`. */
export const model = {
  type: "@swamp/aws/connect/workspace",
  version: "2026.06.08.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Connect Workspace resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Connect Workspace",
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
          "AWS::Connect::Workspace",
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
      description: "Get a Connect Workspace",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Connect Workspace",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Connect::Workspace",
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
      description: "Update a Connect Workspace",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Connect::Workspace",
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
          "AWS::Connect::Workspace",
          identifier,
          currentState,
          desiredState,
          ["InstanceArn"],
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
      description: "Delete a Connect Workspace",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Connect Workspace",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Connect::Workspace",
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
      description: "Sync Connect Workspace state from AWS",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Connect::Workspace",
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
