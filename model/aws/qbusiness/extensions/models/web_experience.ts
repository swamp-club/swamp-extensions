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

// Auto-generated extension model for @swamp/aws/qbusiness/web-experience
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for QBusiness WebExperience (AWS::QBusiness::WebExperience).
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

const SamlProviderConfigurationSchema = z.object({
  AuthenticationUrl: z.string().min(1).max(1284).regex(
    new RegExp("^https://.*$"),
  ),
});

const OpenIDConnectProviderConfigurationSchema = z.object({
  SecretsArn: z.string().min(0).max(1284).regex(
    new RegExp(
      "^arn:[a-z0-9-\\.]{1,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[^/].{0,1023}$",
    ),
  ),
  SecretsRole: z.string().min(0).max(1284).regex(
    new RegExp(
      "^arn:[a-z0-9-\\.]{1,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[^/].{0,1023}$",
    ),
  ),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128),
  Value: z.string().min(0).max(256),
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
  ApplicationId: z.string().min(36).max(36).regex(
    new RegExp("^[a-zA-Z0-9][a-zA-Z0-9-]{35}$"),
  ),
  IdentityProviderConfiguration: z.object({
    SamlConfiguration: SamlProviderConfigurationSchema.optional(),
    OpenIDConnectConfiguration: OpenIDConnectProviderConfigurationSchema
      .optional(),
  }).optional(),
  RoleArn: z.string().min(0).max(1284).regex(
    new RegExp(
      "^arn:[a-z0-9-\\.]{1,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[^/].{0,1023}$",
    ),
  ).optional(),
  SamplePromptsControlMode: z.enum(["ENABLED", "DISABLED"]).optional(),
  Subtitle: z.string().min(0).max(500).regex(new RegExp("^[\\s\\S]*$"))
    .optional(),
  Tags: z.array(TagSchema).optional(),
  Title: z.string().min(0).max(500).regex(new RegExp("^[\\s\\S]*$")).optional(),
  WelcomeMessage: z.string().min(0).max(300).optional(),
  Origins: z.array(
    z.string().min(1).max(64).regex(
      new RegExp("^(http:\\/\\/|https:\\/\\/)[a-zA-Z0-9-_.]+(?::[0-9]{1,5})?$"),
    ),
  ).optional(),
  CustomizationConfiguration: z.object({
    CustomCSSUrl: z.string().min(0).max(1284).regex(
      new RegExp("^(https?://[a-zA-Z0-9-_.+%/]+\\.css)?$"),
    ).optional(),
    LogoUrl: z.string().min(0).max(1284).regex(
      new RegExp("^(https?://[a-zA-Z0-9-_.+%/]+\\.(svg|png))?$"),
    ).optional(),
    FontUrl: z.string().min(0).max(1284).regex(
      new RegExp("^(https?://[a-zA-Z0-9-_.+%/]+\\.(ttf|woff|woff2|otf))?$"),
    ).optional(),
    FaviconUrl: z.string().min(0).max(1284).regex(
      new RegExp("^(https?://[a-zA-Z0-9-_.+%/]+\\.(svg|ico))?$"),
    ).optional(),
  }).optional(),
  BrowserExtensionConfiguration: z.object({
    EnabledBrowserExtensions: z.array(z.enum(["FIREFOX", "CHROME"])),
  }).optional(),
});

const StateSchema = z.object({
  ApplicationId: z.string(),
  CreatedAt: z.string().optional(),
  DefaultEndpoint: z.string().optional(),
  IdentityProviderConfiguration: z.object({
    SamlConfiguration: SamlProviderConfigurationSchema,
    OpenIDConnectConfiguration: OpenIDConnectProviderConfigurationSchema,
  }).optional(),
  RoleArn: z.string().optional(),
  SamplePromptsControlMode: z.string().optional(),
  Status: z.string().optional(),
  Subtitle: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  Title: z.string().optional(),
  UpdatedAt: z.string().optional(),
  WebExperienceArn: z.string().optional(),
  WebExperienceId: z.string(),
  WelcomeMessage: z.string().optional(),
  Origins: z.array(z.string()).optional(),
  CustomizationConfiguration: z.object({
    CustomCSSUrl: z.string(),
    LogoUrl: z.string(),
    FontUrl: z.string(),
    FaviconUrl: z.string(),
  }).optional(),
  BrowserExtensionConfiguration: z.object({
    EnabledBrowserExtensions: z.array(z.string()),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  ApplicationId: z.string().min(36).max(36).regex(
    new RegExp("^[a-zA-Z0-9][a-zA-Z0-9-]{35}$"),
  ).optional(),
  IdentityProviderConfiguration: z.object({
    SamlConfiguration: SamlProviderConfigurationSchema.optional(),
    OpenIDConnectConfiguration: OpenIDConnectProviderConfigurationSchema
      .optional(),
  }).optional(),
  RoleArn: z.string().min(0).max(1284).regex(
    new RegExp(
      "^arn:[a-z0-9-\\.]{1,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[^/].{0,1023}$",
    ),
  ).optional(),
  SamplePromptsControlMode: z.enum(["ENABLED", "DISABLED"]).optional(),
  Subtitle: z.string().min(0).max(500).regex(new RegExp("^[\\s\\S]*$"))
    .optional(),
  Tags: z.array(TagSchema).optional(),
  Title: z.string().min(0).max(500).regex(new RegExp("^[\\s\\S]*$")).optional(),
  WelcomeMessage: z.string().min(0).max(300).optional(),
  Origins: z.array(
    z.string().min(1).max(64).regex(
      new RegExp("^(http:\\/\\/|https:\\/\\/)[a-zA-Z0-9-_.]+(?::[0-9]{1,5})?$"),
    ),
  ).optional(),
  CustomizationConfiguration: z.object({
    CustomCSSUrl: z.string().min(0).max(1284).regex(
      new RegExp("^(https?://[a-zA-Z0-9-_.+%/]+\\.css)?$"),
    ).optional(),
    LogoUrl: z.string().min(0).max(1284).regex(
      new RegExp("^(https?://[a-zA-Z0-9-_.+%/]+\\.(svg|png))?$"),
    ).optional(),
    FontUrl: z.string().min(0).max(1284).regex(
      new RegExp("^(https?://[a-zA-Z0-9-_.+%/]+\\.(ttf|woff|woff2|otf))?$"),
    ).optional(),
    FaviconUrl: z.string().min(0).max(1284).regex(
      new RegExp("^(https?://[a-zA-Z0-9-_.+%/]+\\.(svg|ico))?$"),
    ).optional(),
  }).optional(),
  BrowserExtensionConfiguration: z.object({
    EnabledBrowserExtensions: z.array(z.enum(["FIREFOX", "CHROME"])).optional(),
  }).optional(),
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

/** Swamp extension model for QBusiness WebExperience. Registered at `@swamp/aws/qbusiness/web-experience`. */
export const model = {
  type: "@swamp/aws/qbusiness/web-experience",
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
      description: "QBusiness WebExperience resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a QBusiness WebExperience",
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
          "AWS::QBusiness::WebExperience",
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
      description: "Get a QBusiness WebExperience",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the QBusiness WebExperience",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::QBusiness::WebExperience",
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
      description: "Update a QBusiness WebExperience",
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
          existing.ApplicationId?.toString(),
          existing.WebExperienceId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::QBusiness::WebExperience",
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
          "AWS::QBusiness::WebExperience",
          identifier,
          currentState,
          desiredState,
          ["ApplicationId"],
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
      description: "Delete a QBusiness WebExperience",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the QBusiness WebExperience",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::QBusiness::WebExperience",
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
      description: "Sync QBusiness WebExperience state from AWS",
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
          existing.ApplicationId?.toString(),
          existing.WebExperienceId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::QBusiness::WebExperience",
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
