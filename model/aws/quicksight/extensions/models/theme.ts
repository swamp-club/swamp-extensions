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

// Auto-generated extension model for @swamp/aws/quicksight/theme
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for QuickSight Theme (AWS::QuickSight::Theme).
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

const DataColorPaletteSchema = z.object({
  Colors: z.array(z.string().regex(new RegExp("^#[A-F0-9]{6}$"))).describe(
    "The hexadecimal codes for the colors.",
  ).optional(),
  MinMaxGradient: z.array(z.string().regex(new RegExp("^#[A-F0-9]{6}$")))
    .describe(
      "The minimum and maximum hexadecimal codes that describe a color gradient.",
    ).optional(),
  EmptyFillColor: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).describe(
    "The hexadecimal code of a color that applies to charts where a lack of data is highlighted.",
  ).optional(),
});

const UIColorPaletteSchema = z.object({
  PrimaryForeground: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).describe(
    "The color of text and other foreground elements that appear over the primary background regions, such as grid lines, borders, table banding, icons, and so on.",
  ).optional(),
  PrimaryBackground: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).describe(
    "The background color that applies to visuals and other high emphasis UI.",
  ).optional(),
  SecondaryForeground: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).describe(
    "The foreground color that applies to any sheet title, sheet control text, or UI that appears over the secondary background.",
  ).optional(),
  SecondaryBackground: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).describe(
    "The background color that applies to the sheet background and sheet controls.",
  ).optional(),
  Accent: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).describe(
    "This color is that applies to selected states and buttons.",
  ).optional(),
  AccentForeground: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).describe(
    "The foreground color that applies to any text or other elements that appear over the accent color.",
  ).optional(),
  Danger: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).describe(
    "The color that applies to error messages.",
  ).optional(),
  DangerForeground: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).describe(
    "The foreground color that applies to any text or other elements that appear over the error color.",
  ).optional(),
  Warning: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).describe(
    "This color that applies to warning and informational messages.",
  ).optional(),
  WarningForeground: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).describe(
    "The foreground color that applies to any text or other elements that appear over the warning color.",
  ).optional(),
  Success: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).describe(
    "The color that applies to success messages, for example the check mark for a successful download.",
  ).optional(),
  SuccessForeground: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).describe(
    "The foreground color that applies to any text or other elements that appear over the success color.",
  ).optional(),
  Dimension: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).describe(
    "The color that applies to the names of fields that are identified as dimensions.",
  ).optional(),
  DimensionForeground: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).describe(
    "The foreground color that applies to any text or other elements that appear over the dimension color.",
  ).optional(),
  Measure: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).describe(
    "The color that applies to the names of fields that are identified as measures.",
  ).optional(),
  MeasureForeground: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).describe(
    "The foreground color that applies to any text or other elements that appear over the measure color.",
  ).optional(),
});

const BorderStyleSchema = z.object({
  Show: z.boolean().describe(
    "The option to enable display of borders for visuals.",
  ).optional(),
});

const TileStyleSchema = z.object({
  Border: BorderStyleSchema.describe(
    "The display options for tile borders for visuals.",
  ).optional(),
});

const GutterStyleSchema = z.object({
  Show: z.boolean().describe(
    "This Boolean value controls whether to display a gutter space between sheet tiles.",
  ).optional(),
});

const MarginStyleSchema = z.object({
  Show: z.boolean().describe(
    "This Boolean value controls whether to display sheet margins.",
  ).optional(),
});

const TileLayoutStyleSchema = z.object({
  Gutter: GutterStyleSchema.describe(
    "The display options for gutter spacing between tiles on a sheet.",
  ).optional(),
  Margin: MarginStyleSchema.describe(
    "The display options for margins around the outside edge of sheets.",
  ).optional(),
});

const SheetStyleSchema = z.object({
  Tile: TileStyleSchema.describe("Display options related to tiles on a sheet.")
    .optional(),
  TileLayout: TileLayoutStyleSchema.describe(
    "The display options for the layout of tiles on a sheet.",
  ).optional(),
});

const FontSchema = z.object({
  FontFamily: z.string().optional(),
});

const TypographySchema = z.object({
  FontFamilies: z.array(FontSchema).optional(),
});

const ResourcePermissionSchema = z.object({
  Principal: z.string().min(1).max(256).describe(
    "The Amazon Resource Name (ARN) of the principal. This can be one of the following:   The ARN of an Amazon QuickSight user or group associated with a data source or dataset. (This is common.)   The ARN of an Amazon QuickSight user, group, or namespace associated with an analysis, dashboard, template, or theme. (This is common.)   The ARN of an Amazon Web Services account root: This is an IAM ARN rather than a QuickSight ARN. Use this option only to share resources (templates) across Amazon Web Services accounts. (This is less common.)",
  ),
  Actions: z.array(z.string()).describe(
    "The IAM action to grant or revoke permissions on.",
  ),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe("Tag key."),
  Value: z.string().min(1).max(256).describe("Tag value."),
});

const ThemeConfigurationSchema = z.object({
  DataColorPalette: DataColorPaletteSchema.describe(
    "The theme colors that are used for data colors in charts. The colors description is a hexadecimal color code that consists of six alphanumerical characters, prefixed with #, for example #37BFF5.",
  ).optional(),
  UIColorPalette: UIColorPaletteSchema.describe(
    "The theme colors that apply to UI and to charts, excluding data colors. The colors description is a hexadecimal color code that consists of six alphanumerical characters, prefixed with #, for example #37BFF5. For more information, see Using Themes in Amazon QuickSight in the Amazon QuickSight User Guide.",
  ).optional(),
  Sheet: SheetStyleSchema.describe("The theme display options for sheets.")
    .optional(),
  Typography: TypographySchema.optional(),
});

const ThemeErrorSchema = z.object({
  Type: z.enum(["INTERNAL_FAILURE"]).optional(),
  Message: z.string().regex(new RegExp("\\S")).describe("The error message.")
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
  AwsAccountId: z.string().min(12).max(12).regex(new RegExp("^[0-9]{12}$")),
  BaseThemeId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Configuration: z.object({
    DataColorPalette: DataColorPaletteSchema.describe(
      "The theme colors that are used for data colors in charts. The colors description is a hexadecimal color code that consists of six alphanumerical characters, prefixed with #, for example #37BFF5.",
    ).optional(),
    UIColorPalette: UIColorPaletteSchema.describe(
      "The theme colors that apply to UI and to charts, excluding data colors. The colors description is a hexadecimal color code that consists of six alphanumerical characters, prefixed with #, for example #37BFF5. For more information, see Using Themes in Amazon QuickSight in the Amazon QuickSight User Guide.",
    ).optional(),
    Sheet: SheetStyleSchema.describe("The theme display options for sheets.")
      .optional(),
    Typography: TypographySchema.optional(),
  }).describe(
    "The theme configuration. This configuration contains all of the display properties for a theme.",
  ),
  Name: z.string().min(1).max(2048),
  Permissions: z.array(ResourcePermissionSchema).optional(),
  Tags: z.array(TagSchema).optional(),
  ThemeId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Version: z.object({
    VersionNumber: z.number().min(1).describe(
      "The version number of the theme.",
    ).optional(),
    Description: z.string().min(1).max(512).describe(
      "The description of the theme.",
    ).optional(),
    BaseThemeId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$"))
      .describe(
        "The Amazon QuickSight-defined ID of the theme that a custom theme inherits from. All themes initially inherit from a default Amazon QuickSight theme.",
      ).optional(),
    Configuration: ThemeConfigurationSchema.describe(
      "The theme configuration. This configuration contains all of the display properties for a theme.",
    ).optional(),
    Errors: z.array(ThemeErrorSchema).describe(
      "Errors associated with the theme.",
    ).optional(),
    Status: z.enum([
      "CREATION_IN_PROGRESS",
      "CREATION_SUCCESSFUL",
      "CREATION_FAILED",
      "UPDATE_IN_PROGRESS",
      "UPDATE_SUCCESSFUL",
      "UPDATE_FAILED",
      "PENDING_UPDATE",
      "DELETED",
    ]).optional(),
  }).describe("A version of a theme.").optional(),
  VersionDescription: z.string().min(1).max(512).optional(),
});

const StateSchema = z.object({
  Arn: z.string().optional(),
  AwsAccountId: z.string(),
  BaseThemeId: z.string().optional(),
  Configuration: ThemeConfigurationSchema.optional(),
  CreatedTime: z.string().optional(),
  LastUpdatedTime: z.string().optional(),
  Name: z.string().optional(),
  Permissions: z.array(ResourcePermissionSchema).optional(),
  Tags: z.array(TagSchema).optional(),
  ThemeId: z.string(),
  Type: z.string().optional(),
  Version: z.object({
    VersionNumber: z.number(),
    Arn: z.string(),
    Description: z.string(),
    BaseThemeId: z.string(),
    CreatedTime: z.string(),
    Configuration: ThemeConfigurationSchema,
    Errors: z.array(ThemeErrorSchema),
    Status: z.string(),
  }).optional(),
  VersionDescription: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AwsAccountId: z.string().min(12).max(12).regex(new RegExp("^[0-9]{12}$"))
    .optional(),
  BaseThemeId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$"))
    .optional(),
  Configuration: z.object({
    DataColorPalette: DataColorPaletteSchema.describe(
      "The theme colors that are used for data colors in charts. The colors description is a hexadecimal color code that consists of six alphanumerical characters, prefixed with #, for example #37BFF5.",
    ).optional(),
    UIColorPalette: UIColorPaletteSchema.describe(
      "The theme colors that apply to UI and to charts, excluding data colors. The colors description is a hexadecimal color code that consists of six alphanumerical characters, prefixed with #, for example #37BFF5. For more information, see Using Themes in Amazon QuickSight in the Amazon QuickSight User Guide.",
    ).optional(),
    Sheet: SheetStyleSchema.describe("The theme display options for sheets.")
      .optional(),
    Typography: TypographySchema.optional(),
  }).describe(
    "The theme configuration. This configuration contains all of the display properties for a theme.",
  ).optional(),
  Name: z.string().min(1).max(2048).optional(),
  Permissions: z.array(ResourcePermissionSchema).optional(),
  Tags: z.array(TagSchema).optional(),
  ThemeId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$"))
    .optional(),
  Version: z.object({
    VersionNumber: z.number().min(1).describe(
      "The version number of the theme.",
    ).optional(),
    Description: z.string().min(1).max(512).describe(
      "The description of the theme.",
    ).optional(),
    BaseThemeId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$"))
      .describe(
        "The Amazon QuickSight-defined ID of the theme that a custom theme inherits from. All themes initially inherit from a default Amazon QuickSight theme.",
      ).optional(),
    Configuration: ThemeConfigurationSchema.describe(
      "The theme configuration. This configuration contains all of the display properties for a theme.",
    ).optional(),
    Errors: z.array(ThemeErrorSchema).describe(
      "Errors associated with the theme.",
    ).optional(),
    Status: z.enum([
      "CREATION_IN_PROGRESS",
      "CREATION_SUCCESSFUL",
      "CREATION_FAILED",
      "UPDATE_IN_PROGRESS",
      "UPDATE_SUCCESSFUL",
      "UPDATE_FAILED",
      "PENDING_UPDATE",
      "DELETED",
    ]).optional(),
  }).describe("A version of a theme.").optional(),
  VersionDescription: z.string().min(1).max(512).optional(),
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

/** Swamp extension model for QuickSight Theme. Registered at `@swamp/aws/quicksight/theme`. */
export const model = {
  type: "@swamp/aws/quicksight/theme",
  version: "2026.06.15.1",
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
      description: "QuickSight Theme resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a QuickSight Theme",
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
          "AWS::QuickSight::Theme",
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
      description: "Get a QuickSight Theme",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the QuickSight Theme",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::QuickSight::Theme",
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
      description: "Update a QuickSight Theme",
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
          existing.ThemeId?.toString(),
          existing.AwsAccountId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::QuickSight::Theme",
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
          "AWS::QuickSight::Theme",
          identifier,
          currentState,
          desiredState,
          ["AwsAccountId", "ThemeId"],
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
      description: "Delete a QuickSight Theme",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the QuickSight Theme",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::QuickSight::Theme",
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
      description: "Sync QuickSight Theme state from AWS",
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
          existing.ThemeId?.toString(),
          existing.AwsAccountId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::QuickSight::Theme",
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
