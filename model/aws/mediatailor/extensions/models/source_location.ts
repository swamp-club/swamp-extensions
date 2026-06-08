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

// Auto-generated extension model for @swamp/aws/mediatailor/source-location
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for MediaTailor SourceLocation (AWS::MediaTailor::SourceLocation).
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

const SecretsManagerAccessTokenConfigurationSchema = z.object({
  HeaderName: z.string().describe(
    "The name of the HTTP header used to supply the access token in requests to the source location.",
  ).optional(),
  SecretArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the AWS Secrets Manager secret that contains the access token.",
  ).optional(),
  SecretStringKey: z.string().describe(
    "The AWS Secrets Manager SecretString key associated with the access token. MediaTailor uses the key to look up SecretString key and value pair containing the access token.",
  ).optional(),
});

const SegmentDeliveryConfigurationSchema = z.object({
  BaseUrl: z.string().describe(
    "The base URL of the host or path of the segment delivery server that you're using to serve segments. This is typically a content delivery network (CDN). The URL can be absolute or relative. To use an absolute URL include the protocol, such as https://example.com/some/path. To use a relative URL specify the relative path, such as /some/path*.",
  ).optional(),
  Name: z.string().describe(
    "A unique identifier used to distinguish between multiple segment delivery configurations in a source location.",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string(),
  Value: z.string(),
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
  AccessConfiguration: z.object({
    AccessType: z.enum([
      "S3_SIGV4",
      "SECRETS_MANAGER_ACCESS_TOKEN",
      "AUTODETECT_SIGV4",
    ]).optional(),
    SecretsManagerAccessTokenConfiguration:
      SecretsManagerAccessTokenConfigurationSchema.describe(
        "AWS Secrets Manager access token configuration parameters. For information about Secrets Manager access token authentication, see Working with AWS Secrets Manager access token authentication.",
      ).optional(),
  }).describe("Access configuration parameters.").optional(),
  DefaultSegmentDeliveryConfiguration: z.object({
    BaseUrl: z.string().describe(
      "The hostname of the server that will be used to serve segments. This string must include the protocol, such as https://.",
    ).optional(),
  }).describe(
    "The optional configuration for a server that serves segments. Use this if you want the segment delivery server to be different from the source location server. For example, you can configure your source location server to be an origination server, such as MediaPackage, and the segment delivery server to be a content delivery network (CDN), such as CloudFront. If you don't specify a segment delivery server, then the source location server is used.",
  ).optional(),
  HttpConfiguration: z.object({
    BaseUrl: z.string().describe(
      "The base URL for the source location host server. This string must include the protocol, such as https://.",
    ),
  }).describe("The HTTP configuration for the source location."),
  SegmentDeliveryConfigurations: z.array(SegmentDeliveryConfigurationSchema)
    .describe(
      "A list of the segment delivery configurations associated with this resource.",
    ).optional(),
  SourceLocationName: z.string(),
  Tags: z.array(TagSchema).describe(
    "The tags to assign to the source location.",
  ).optional(),
});

const StateSchema = z.object({
  AccessConfiguration: z.object({
    AccessType: z.string(),
    SecretsManagerAccessTokenConfiguration:
      SecretsManagerAccessTokenConfigurationSchema,
  }).optional(),
  Arn: z.string().optional(),
  DefaultSegmentDeliveryConfiguration: z.object({
    BaseUrl: z.string(),
  }).optional(),
  HttpConfiguration: z.object({
    BaseUrl: z.string(),
  }).optional(),
  SegmentDeliveryConfigurations: z.array(SegmentDeliveryConfigurationSchema)
    .optional(),
  SourceLocationName: z.string(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AccessConfiguration: z.object({
    AccessType: z.enum([
      "S3_SIGV4",
      "SECRETS_MANAGER_ACCESS_TOKEN",
      "AUTODETECT_SIGV4",
    ]).optional(),
    SecretsManagerAccessTokenConfiguration:
      SecretsManagerAccessTokenConfigurationSchema.describe(
        "AWS Secrets Manager access token configuration parameters. For information about Secrets Manager access token authentication, see Working with AWS Secrets Manager access token authentication.",
      ).optional(),
  }).describe("Access configuration parameters.").optional(),
  DefaultSegmentDeliveryConfiguration: z.object({
    BaseUrl: z.string().describe(
      "The hostname of the server that will be used to serve segments. This string must include the protocol, such as https://.",
    ).optional(),
  }).describe(
    "The optional configuration for a server that serves segments. Use this if you want the segment delivery server to be different from the source location server. For example, you can configure your source location server to be an origination server, such as MediaPackage, and the segment delivery server to be a content delivery network (CDN), such as CloudFront. If you don't specify a segment delivery server, then the source location server is used.",
  ).optional(),
  HttpConfiguration: z.object({
    BaseUrl: z.string().describe(
      "The base URL for the source location host server. This string must include the protocol, such as https://.",
    ).optional(),
  }).describe("The HTTP configuration for the source location.").optional(),
  SegmentDeliveryConfigurations: z.array(SegmentDeliveryConfigurationSchema)
    .describe(
      "A list of the segment delivery configurations associated with this resource.",
    ).optional(),
  SourceLocationName: z.string().optional(),
  Tags: z.array(TagSchema).describe(
    "The tags to assign to the source location.",
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

/** Swamp extension model for MediaTailor SourceLocation. Registered at `@swamp/aws/mediatailor/source-location`. */
export const model = {
  type: "@swamp/aws/mediatailor/source-location",
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
      description: "MediaTailor SourceLocation resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a MediaTailor SourceLocation",
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
          "AWS::MediaTailor::SourceLocation",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.SourceLocationName ?? g.SourceLocationName)?.toString() ??
            "current").replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(
              /\0/g,
              "",
            );
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a MediaTailor SourceLocation",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MediaTailor SourceLocation",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::MediaTailor::SourceLocation",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.SourceLocationName ?? context.globalArgs.SourceLocationName)
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
      description: "Update a MediaTailor SourceLocation",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.SourceLocationName?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.SourceLocationName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::MediaTailor::SourceLocation",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::MediaTailor::SourceLocation",
          identifier,
          currentState,
          desiredState,
          ["SourceLocationName"],
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
      description: "Delete a MediaTailor SourceLocation",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MediaTailor SourceLocation",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::MediaTailor::SourceLocation",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.SourceLocationName?.toString() ?? args.identifier)
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
      description: "Sync MediaTailor SourceLocation state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.SourceLocationName?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.SourceLocationName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::MediaTailor::SourceLocation",
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
