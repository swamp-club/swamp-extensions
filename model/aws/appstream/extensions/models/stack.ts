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

// Auto-generated extension model for @swamp/aws/appstream/stack
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for AppStream Stack (AWS::AppStream::Stack).
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

const StorageConnectorSchema = z.object({
  Domains: z.array(z.string()).describe(
    "The names of the domains for the account.",
  ).optional(),
  ResourceIdentifier: z.string().describe("The ARN of the storage connector.")
    .optional(),
  ConnectorType: z.string().describe("The type of storage connector."),
});

const UserSettingSchema = z.object({
  Permission: z.string().describe(
    "Indicates whether the action is enabled or disabled.",
  ),
  Action: z.string().describe("The action that is enabled or disabled."),
  MaximumLength: z.number().int().describe(
    "Specifies the number of characters that can be copied by end users from the local device to the remote session, and to the local device from the remote session. This can be specified only for the CLIPBOARD_COPY_FROM_LOCAL_DEVICE and CLIPBOARD_COPY_TO_LOCAL_DEVICE actions. This defaults to 20,971,520 (20 MB) when unspecified and the permission is ENABLED. This can't be specified when the permission is DISABLED. The value can be between 1 and 20,971,520 (20 MB).",
  ).optional(),
});

const TagSchema = z.object({
  Value: z.string().describe("The value of the tag."),
  Key: z.string().describe("The key of the tag."),
});

const AccessEndpointSchema = z.object({
  EndpointType: z.string().describe("The type of interface endpoint."),
  VpceId: z.string().describe(
    "The identifier (ID) of the VPC in which the interface endpoint is used.",
  ),
});

const UrlRedirectionConfigSchema = z.object({
  Enabled: z.boolean().describe(
    "Specifies whether URL redirection is enabled or disabled.",
  ),
  AllowedUrls: z.array(z.string()).describe(
    "The URLs that are allowed for redirection.",
  ).optional(),
  DeniedUrls: z.array(z.string()).describe(
    "The URLs that are denied for redirection.",
  ).optional(),
});

const GlobalArgsSchema = z.object({
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
  Description: z.string().describe("The description to display.").optional(),
  StorageConnectors: z.array(StorageConnectorSchema).describe(
    "The storage connectors to enable.",
  ).optional(),
  DeleteStorageConnectors: z.boolean().describe(
    "This parameter has been deprecated. Deletes the storage connectors currently enabled for the stack.",
  ).optional(),
  EmbedHostDomains: z.array(z.string()).describe(
    "The domains where AppStream 2.0 streaming sessions can be embedded in an iframe. You must approve the domains that you want to host embedded AppStream 2.0 streaming sessions.",
  ).optional(),
  UserSettings: z.array(UserSettingSchema).describe(
    "The actions that are enabled or disabled for users during their streaming sessions. By default, these actions are enabled.",
  ).optional(),
  AttributesToDelete: z.array(z.string()).describe(
    "The stack attributes to delete.",
  ).optional(),
  RedirectURL: z.string().describe(
    "The URL that users are redirected to after their streaming session ends.",
  ).optional(),
  StreamingExperienceSettings: z.object({
    PreferredProtocol: z.string().describe(
      "The preferred protocol that you want to use while streaming your application.",
    ).optional(),
  }).describe(
    "The streaming protocol that you want your stack to prefer. This can be UDP or TCP. Currently, UDP is only supported in the Windows native client.",
  ).optional(),
  Name: z.string().describe("The name of the stack.").optional(),
  FeedbackURL: z.string().describe(
    "The URL that users are redirected to after they click the Send Feedback link. If no URL is specified, no Send Feedback link is displayed.",
  ).optional(),
  ApplicationSettings: z.object({
    SettingsGroup: z.string().describe(
      "The path prefix for the S3 bucket where users’ persistent application settings are stored. You can allow the same persistent application settings to be used across multiple stacks by specifying the same settings group for each stack.",
    ).optional(),
    Enabled: z.boolean().describe(
      "Enables or disables persistent application settings for users during their streaming sessions.",
    ),
  }).describe(
    "The persistent application settings for users of the stack. When these settings are enabled, changes that users make to applications and Windows settings are automatically saved after each session and applied to the next session.",
  ).optional(),
  DisplayName: z.string().describe("The stack name to display.").optional(),
  Tags: z.array(TagSchema).describe("An array of key-value pairs.").optional(),
  AccessEndpoints: z.array(AccessEndpointSchema).describe(
    "The list of virtual private cloud (VPC) interface endpoint objects. Users of the stack can connect to AppStream 2.0 only through the specified endpoints.",
  ).optional(),
  ContentRedirection: z.object({
    HostToClient: UrlRedirectionConfigSchema.describe(
      "The URL redirection configuration from the streaming session host to the client.",
    ).optional(),
  }).describe(
    "The content redirection settings for the stack. These settings control URL redirection between the streaming session and the local device.",
  ).optional(),
});

const StateSchema = z.object({
  Description: z.string().optional(),
  StorageConnectors: z.array(StorageConnectorSchema).optional(),
  DeleteStorageConnectors: z.boolean().optional(),
  EmbedHostDomains: z.array(z.string()).optional(),
  UserSettings: z.array(UserSettingSchema).optional(),
  AttributesToDelete: z.array(z.string()).optional(),
  RedirectURL: z.string().optional(),
  StreamingExperienceSettings: z.object({
    PreferredProtocol: z.string(),
  }).optional(),
  Name: z.string(),
  FeedbackURL: z.string().optional(),
  ApplicationSettings: z.object({
    SettingsGroup: z.string(),
    Enabled: z.boolean(),
  }).optional(),
  DisplayName: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  AccessEndpoints: z.array(AccessEndpointSchema).optional(),
  ContentRedirection: z.object({
    HostToClient: UrlRedirectionConfigSchema,
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Description: z.string().describe("The description to display.").optional(),
  StorageConnectors: z.array(StorageConnectorSchema).describe(
    "The storage connectors to enable.",
  ).optional(),
  DeleteStorageConnectors: z.boolean().describe(
    "This parameter has been deprecated. Deletes the storage connectors currently enabled for the stack.",
  ).optional(),
  EmbedHostDomains: z.array(z.string()).describe(
    "The domains where AppStream 2.0 streaming sessions can be embedded in an iframe. You must approve the domains that you want to host embedded AppStream 2.0 streaming sessions.",
  ).optional(),
  UserSettings: z.array(UserSettingSchema).describe(
    "The actions that are enabled or disabled for users during their streaming sessions. By default, these actions are enabled.",
  ).optional(),
  AttributesToDelete: z.array(z.string()).describe(
    "The stack attributes to delete.",
  ).optional(),
  RedirectURL: z.string().describe(
    "The URL that users are redirected to after their streaming session ends.",
  ).optional(),
  StreamingExperienceSettings: z.object({
    PreferredProtocol: z.string().describe(
      "The preferred protocol that you want to use while streaming your application.",
    ).optional(),
  }).describe(
    "The streaming protocol that you want your stack to prefer. This can be UDP or TCP. Currently, UDP is only supported in the Windows native client.",
  ).optional(),
  Name: z.string().describe("The name of the stack.").optional(),
  FeedbackURL: z.string().describe(
    "The URL that users are redirected to after they click the Send Feedback link. If no URL is specified, no Send Feedback link is displayed.",
  ).optional(),
  ApplicationSettings: z.object({
    SettingsGroup: z.string().describe(
      "The path prefix for the S3 bucket where users’ persistent application settings are stored. You can allow the same persistent application settings to be used across multiple stacks by specifying the same settings group for each stack.",
    ).optional(),
    Enabled: z.boolean().describe(
      "Enables or disables persistent application settings for users during their streaming sessions.",
    ).optional(),
  }).describe(
    "The persistent application settings for users of the stack. When these settings are enabled, changes that users make to applications and Windows settings are automatically saved after each session and applied to the next session.",
  ).optional(),
  DisplayName: z.string().describe("The stack name to display.").optional(),
  Tags: z.array(TagSchema).describe("An array of key-value pairs.").optional(),
  AccessEndpoints: z.array(AccessEndpointSchema).describe(
    "The list of virtual private cloud (VPC) interface endpoint objects. Users of the stack can connect to AppStream 2.0 only through the specified endpoints.",
  ).optional(),
  ContentRedirection: z.object({
    HostToClient: UrlRedirectionConfigSchema.describe(
      "The URL redirection configuration from the streaming session host to the client.",
    ).optional(),
  }).describe(
    "The content redirection settings for the stack. These settings control URL redirection between the streaming session and the local device.",
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

/** Swamp extension model for AppStream Stack. Registered at `@swamp/aws/appstream/stack`. */
export const model = {
  type: "@swamp/aws/appstream/stack",
  version: "2026.06.12.1",
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
      toVersion: "2026.06.12.1",
      description: "Added: ContentRedirection",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "AppStream Stack resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a AppStream Stack",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::AppStream::Stack",
          desiredState,
          credentials,
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
      description: "Get a AppStream Stack",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AppStream Stack",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::AppStream::Stack",
          args.identifier,
          credentials,
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
      description: "Update a AppStream Stack",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
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
          "AWS::AppStream::Stack",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::AppStream::Stack",
          identifier,
          currentState,
          desiredState,
          ["Name"],
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
      description: "Delete a AppStream Stack",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AppStream Stack",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::AppStream::Stack",
          args.identifier,
          credentials,
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
      description: "Sync AppStream Stack state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
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
            "AWS::AppStream::Stack",
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
