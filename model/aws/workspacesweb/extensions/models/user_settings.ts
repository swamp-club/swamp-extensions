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

// Auto-generated extension model for @swamp/aws/workspacesweb/user-settings
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for WorkSpacesWeb UserSettings (AWS::WorkSpacesWeb::UserSettings).
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

const ImageMetadataSchema = z.object({
  MimeType: z.enum(["image/png", "image/jpeg", "image/x-icon"]),
  FileExtension: z.string().min(0).max(131072).regex(new RegExp("^[\\s\\S]*$")),
  LastUploadTimestamp: z.string(),
});

const LocalizedBrandingStringsSchema = z.object({
  BrowserTabTitle: z.string().regex(new RegExp("^[^<>&'`~\\\\]*$")),
  WelcomeText: z.string().regex(new RegExp("^[^<>&'`~\\\\]*$")),
  LoginTitle: z.string().regex(new RegExp("^[^<>&'`~\\\\]*$")).optional(),
  LoginDescription: z.string().regex(new RegExp("^[^<>&'`~\\\\]*$")).optional(),
  LoginButtonText: z.string().regex(new RegExp("^[^<>&'`~\\\\]*$")).optional(),
  ContactLink: z.string().regex(new RegExp("^(https?://|mailto:).*"))
    .optional(),
  ContactButtonText: z.string().regex(new RegExp("^[^<>&'`~\\\\]*$"))
    .optional(),
  LoadingText: z.string().regex(new RegExp("^[^<>&'`~\\\\]*$")).optional(),
});

const CookieSpecificationSchema = z.object({
  Domain: z.string().min(0).max(253).regex(
    new RegExp(
      "^(\\.?)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\\.)*[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$",
    ),
  ),
  Name: z.string().min(0).max(4096).optional(),
  Path: z.string().min(0).max(2000).regex(new RegExp("^/(\\S)*$")).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^([\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]*)$", "u"),
  ),
  Value: z.string().min(0).max(256).regex(
    new RegExp("^([\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]*)$", "u"),
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
  AdditionalEncryptionContext: z.record(
    z.string(),
    z.string().min(0).max(131072).regex(new RegExp("^[\\s\\S]*$")),
  ).optional(),
  BrandingConfiguration: z.object({
    Logo: z.string().regex(
      new RegExp(
        "(^s3://[a-z0-9][a-z0-9\\.\\-]{1,61}[a-z0-9]/.+$)|(^(?=(.{4})*$)[A-Za-z0-9+/]*={0,2}$)",
      ),
    ).optional(),
    Wallpaper: z.string().regex(
      new RegExp(
        "(^s3://[a-z0-9][a-z0-9\\.\\-]{1,61}[a-z0-9]/.+$)|(^(?=(.{4})*$)[A-Za-z0-9+/]*={0,2}$)",
      ),
    ).optional(),
    Favicon: z.string().regex(
      new RegExp(
        "(^s3://[a-z0-9][a-z0-9\\.\\-]{1,61}[a-z0-9]/.+$)|(^(?=(.{4})*$)[A-Za-z0-9+/]*={0,2}$)",
      ),
    ).optional(),
    LogoMetadata: ImageMetadataSchema.optional(),
    WallpaperMetadata: ImageMetadataSchema.optional(),
    FaviconMetadata: ImageMetadataSchema.optional(),
    LocalizedStrings: z.record(z.string(), LocalizedBrandingStringsSchema)
      .optional(),
    ColorTheme: z.enum(["Light", "Dark"]).optional(),
    TermsOfService: z.string().max(153600).optional(),
  }).optional(),
  CookieSynchronizationConfiguration: z.object({
    Allowlist: z.array(CookieSpecificationSchema),
    Blocklist: z.array(CookieSpecificationSchema).optional(),
  }).optional(),
  CopyAllowed: z.enum(["Disabled", "Enabled"]),
  CustomerManagedKey: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:[\\w+=\\/,.@-]+:kms:[a-zA-Z0-9\\-]*:[a-zA-Z0-9]{1,12}:key\\/[a-zA-Z0-9-]+$",
    ),
  ).optional(),
  DisconnectTimeoutInMinutes: z.number().min(1).max(600).optional(),
  DownloadAllowed: z.enum(["Disabled", "Enabled"]),
  IdleDisconnectTimeoutInMinutes: z.number().min(0).max(60).optional(),
  PasteAllowed: z.enum(["Disabled", "Enabled"]),
  PrintAllowed: z.enum(["Disabled", "Enabled"]),
  Tags: z.array(TagSchema).optional(),
  ToolbarConfiguration: z.object({
    ToolbarType: z.enum(["Floating", "Docked"]).optional(),
    VisualMode: z.enum(["Dark", "Light"]).optional(),
    HiddenToolbarItems: z.array(
      z.enum(["Windows", "DualMonitor", "FullScreen", "Webcam", "Microphone"]),
    ).optional(),
    MaxDisplayResolution: z.enum([
      "size4096X2160",
      "size3840X2160",
      "size3440X1440",
      "size2560X1440",
      "size1920X1080",
      "size1280X720",
      "size1024X768",
      "size800X600",
    ]).optional(),
  }).optional(),
  UploadAllowed: z.enum(["Disabled", "Enabled"]),
  DeepLinkAllowed: z.enum(["Disabled", "Enabled"]).optional(),
  WebAuthnAllowed: z.enum(["Disabled", "Enabled"]).optional(),
});

const StateSchema = z.object({
  AdditionalEncryptionContext: z.record(z.string(), z.unknown()).optional(),
  AssociatedPortalArns: z.array(z.string()).optional(),
  BrandingConfiguration: z.object({
    Logo: z.string(),
    Wallpaper: z.string(),
    Favicon: z.string(),
    LogoMetadata: ImageMetadataSchema,
    WallpaperMetadata: ImageMetadataSchema,
    FaviconMetadata: ImageMetadataSchema,
    LocalizedStrings: z.record(z.string(), z.unknown()),
    ColorTheme: z.string(),
    TermsOfService: z.string(),
  }).optional(),
  CookieSynchronizationConfiguration: z.object({
    Allowlist: z.array(CookieSpecificationSchema),
    Blocklist: z.array(CookieSpecificationSchema),
  }).optional(),
  CopyAllowed: z.string().optional(),
  CustomerManagedKey: z.string().optional(),
  DisconnectTimeoutInMinutes: z.number().optional(),
  DownloadAllowed: z.string().optional(),
  IdleDisconnectTimeoutInMinutes: z.number().optional(),
  PasteAllowed: z.string().optional(),
  PrintAllowed: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  ToolbarConfiguration: z.object({
    ToolbarType: z.string(),
    VisualMode: z.string(),
    HiddenToolbarItems: z.array(z.string()),
    MaxDisplayResolution: z.string(),
  }).optional(),
  UploadAllowed: z.string().optional(),
  UserSettingsArn: z.string(),
  DeepLinkAllowed: z.string().optional(),
  WebAuthnAllowed: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AdditionalEncryptionContext: z.record(
    z.string(),
    z.string().min(0).max(131072).regex(new RegExp("^[\\s\\S]*$")),
  ).optional(),
  BrandingConfiguration: z.object({
    Logo: z.string().regex(
      new RegExp(
        "(^s3://[a-z0-9][a-z0-9\\.\\-]{1,61}[a-z0-9]/.+$)|(^(?=(.{4})*$)[A-Za-z0-9+/]*={0,2}$)",
      ),
    ).optional(),
    Wallpaper: z.string().regex(
      new RegExp(
        "(^s3://[a-z0-9][a-z0-9\\.\\-]{1,61}[a-z0-9]/.+$)|(^(?=(.{4})*$)[A-Za-z0-9+/]*={0,2}$)",
      ),
    ).optional(),
    Favicon: z.string().regex(
      new RegExp(
        "(^s3://[a-z0-9][a-z0-9\\.\\-]{1,61}[a-z0-9]/.+$)|(^(?=(.{4})*$)[A-Za-z0-9+/]*={0,2}$)",
      ),
    ).optional(),
    LogoMetadata: ImageMetadataSchema.optional(),
    WallpaperMetadata: ImageMetadataSchema.optional(),
    FaviconMetadata: ImageMetadataSchema.optional(),
    LocalizedStrings: z.record(z.string(), LocalizedBrandingStringsSchema)
      .optional(),
    ColorTheme: z.enum(["Light", "Dark"]).optional(),
    TermsOfService: z.string().max(153600).optional(),
  }).optional(),
  CookieSynchronizationConfiguration: z.object({
    Allowlist: z.array(CookieSpecificationSchema).optional(),
    Blocklist: z.array(CookieSpecificationSchema).optional(),
  }).optional(),
  CopyAllowed: z.enum(["Disabled", "Enabled"]).optional(),
  CustomerManagedKey: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:[\\w+=\\/,.@-]+:kms:[a-zA-Z0-9\\-]*:[a-zA-Z0-9]{1,12}:key\\/[a-zA-Z0-9-]+$",
    ),
  ).optional(),
  DisconnectTimeoutInMinutes: z.number().min(1).max(600).optional(),
  DownloadAllowed: z.enum(["Disabled", "Enabled"]).optional(),
  IdleDisconnectTimeoutInMinutes: z.number().min(0).max(60).optional(),
  PasteAllowed: z.enum(["Disabled", "Enabled"]).optional(),
  PrintAllowed: z.enum(["Disabled", "Enabled"]).optional(),
  Tags: z.array(TagSchema).optional(),
  ToolbarConfiguration: z.object({
    ToolbarType: z.enum(["Floating", "Docked"]).optional(),
    VisualMode: z.enum(["Dark", "Light"]).optional(),
    HiddenToolbarItems: z.array(
      z.enum(["Windows", "DualMonitor", "FullScreen", "Webcam", "Microphone"]),
    ).optional(),
    MaxDisplayResolution: z.enum([
      "size4096X2160",
      "size3840X2160",
      "size3440X1440",
      "size2560X1440",
      "size1920X1080",
      "size1280X720",
      "size1024X768",
      "size800X600",
    ]).optional(),
  }).optional(),
  UploadAllowed: z.enum(["Disabled", "Enabled"]).optional(),
  DeepLinkAllowed: z.enum(["Disabled", "Enabled"]).optional(),
  WebAuthnAllowed: z.enum(["Disabled", "Enabled"]).optional(),
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

/** Swamp extension model for WorkSpacesWeb UserSettings. Registered at `@swamp/aws/workspacesweb/user-settings`. */
export const model = {
  type: "@swamp/aws/workspacesweb/user-settings",
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
      description: "WorkSpacesWeb UserSettings resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a WorkSpacesWeb UserSettings",
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
          "AWS::WorkSpacesWeb::UserSettings",
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
      description: "Get a WorkSpacesWeb UserSettings",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the WorkSpacesWeb UserSettings",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::WorkSpacesWeb::UserSettings",
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
      description: "Update a WorkSpacesWeb UserSettings",
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
        const identifier = existing.UserSettingsArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::WorkSpacesWeb::UserSettings",
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
          "AWS::WorkSpacesWeb::UserSettings",
          identifier,
          currentState,
          desiredState,
          undefined,
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
      description: "Delete a WorkSpacesWeb UserSettings",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the WorkSpacesWeb UserSettings",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::WorkSpacesWeb::UserSettings",
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
      description: "Sync WorkSpacesWeb UserSettings state from AWS",
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
        const identifier = existing.UserSettingsArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::WorkSpacesWeb::UserSettings",
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
