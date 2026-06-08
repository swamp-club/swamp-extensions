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

// Auto-generated extension model for @swamp/aws/events/connection
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any no-control-regex

/**
 * Swamp extension model for Events Connection (AWS::Events::Connection).
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

const ApiKeyAuthParametersSchema = z.object({
  ApiKeyName: z.string().regex(
    new RegExp(
      "^[ \\t]*[^\\x00-\\x1F\\x7F]+([ \\t]+[^\\x00-\\x1F\\x7F]+)*[ \\t]*$",
    ),
  ),
  ApiKeyValue: z.string().regex(
    new RegExp(
      "^[ \\t]*[^\\x00-\\x1F\\x7F]+([ \\t]+[^\\x00-\\x1F\\x7F]+)*[ \\t]*$",
    ),
  ),
});

const BasicAuthParametersSchema = z.object({
  Username: z.string().regex(
    new RegExp(
      "^[ \\t]*[^\\x00-\\x1F\\x7F]+([ \\t]+[^\\x00-\\x1F\\x7F]+)*[ \\t]*$",
    ),
  ),
  Password: z.string().regex(
    new RegExp(
      "^[ \\t]*[^\\x00-\\x1F\\x7F]+([ \\t]+[^\\x00-\\x1F\\x7F]+)*[ \\t]*$",
    ),
  ),
});

const ClientParametersSchema = z.object({
  ClientID: z.string().regex(
    new RegExp(
      "^[ \\t]*[^\\x00-\\x1F\\x7F]+([ \\t]+[^\\x00-\\x1F\\x7F]+)*[ \\t]*$",
    ),
  ),
  ClientSecret: z.string().regex(
    new RegExp(
      "^[ \\t]*[^\\x00-\\x1F\\x7F]+([ \\t]+[^\\x00-\\x1F\\x7F]+)*[ \\t]*$",
    ),
  ),
});

const ParameterSchema = z.object({
  Key: z.string(),
  Value: z.string(),
  IsValueSecret: z.boolean().optional(),
});

const ConnectionHttpParametersSchema = z.object({
  HeaderParameters: z.array(ParameterSchema).optional(),
  QueryStringParameters: z.array(ParameterSchema).optional(),
  BodyParameters: z.array(ParameterSchema).optional(),
});

const OAuthParametersSchema = z.object({
  ClientParameters: ClientParametersSchema,
  AuthorizationEndpoint: z.string().min(1).max(2048).regex(
    new RegExp(
      "^((%[0-9A-Fa-f]{2}|[-()_.!~*';/?:@\\x26=+$,A-Za-z0-9])+)([).!';/?:,])?$",
    ),
  ),
  HttpMethod: z.enum(["GET", "POST", "PUT"]),
  OAuthHttpParameters: ConnectionHttpParametersSchema.optional(),
});

const ResourceParametersSchema = z.object({
  ResourceConfigurationArn: z.string().max(2048).regex(
    new RegExp(
      "^arn:[a-z0-9f\\-]+:vpc-lattice:[a-zA-Z0-9\\-]+:\\d{12}:resourceconfiguration/rcfg-[0-9a-z]{17}$",
    ),
  ),
});

const ConnectivityParametersSchema = z.object({
  ResourceParameters: ResourceParametersSchema,
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
  Name: z.string().min(1).max(64).regex(new RegExp("[\\.\\-_A-Za-z0-9]+"))
    .describe("Name of the connection.").optional(),
  Description: z.string().max(512).describe("Description of the connection.")
    .optional(),
  AuthorizationType: z.enum(["API_KEY", "BASIC", "OAUTH_CLIENT_CREDENTIALS"])
    .optional(),
  AuthParameters: z.object({
    ApiKeyAuthParameters: ApiKeyAuthParametersSchema.optional(),
    BasicAuthParameters: BasicAuthParametersSchema.optional(),
    OAuthParameters: OAuthParametersSchema.optional(),
    InvocationHttpParameters: ConnectionHttpParametersSchema.optional(),
    ConnectivityParameters: ConnectivityParametersSchema.optional(),
  }).optional(),
  InvocationConnectivityParameters: z.object({
    ResourceParameters: ResourceParametersSchema,
  }).describe("The private resource the HTTP request will be sent to.")
    .optional(),
  KmsKeyIdentifier: z.string().max(2048).regex(
    new RegExp("^[a-zA-Z0-9_\\-/:]*$"),
  ).optional(),
});

const StateSchema = z.object({
  Name: z.string(),
  Arn: z.string().optional(),
  ArnForPolicy: z.string().optional(),
  SecretArn: z.string().optional(),
  Description: z.string().optional(),
  AuthorizationType: z.string().optional(),
  AuthParameters: z.object({
    ApiKeyAuthParameters: ApiKeyAuthParametersSchema,
    BasicAuthParameters: BasicAuthParametersSchema,
    OAuthParameters: OAuthParametersSchema,
    InvocationHttpParameters: ConnectionHttpParametersSchema,
    ConnectivityParameters: ConnectivityParametersSchema,
  }).optional(),
  InvocationConnectivityParameters: z.object({
    ResourceParameters: ResourceParametersSchema,
  }).optional(),
  KmsKeyIdentifier: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().min(1).max(64).regex(new RegExp("[\\.\\-_A-Za-z0-9]+"))
    .describe("Name of the connection.").optional(),
  Description: z.string().max(512).describe("Description of the connection.")
    .optional(),
  AuthorizationType: z.enum(["API_KEY", "BASIC", "OAUTH_CLIENT_CREDENTIALS"])
    .optional(),
  AuthParameters: z.object({
    ApiKeyAuthParameters: ApiKeyAuthParametersSchema.optional(),
    BasicAuthParameters: BasicAuthParametersSchema.optional(),
    OAuthParameters: OAuthParametersSchema.optional(),
    InvocationHttpParameters: ConnectionHttpParametersSchema.optional(),
    ConnectivityParameters: ConnectivityParametersSchema.optional(),
  }).optional(),
  InvocationConnectivityParameters: z.object({
    ResourceParameters: ResourceParametersSchema.optional(),
  }).describe("The private resource the HTTP request will be sent to.")
    .optional(),
  KmsKeyIdentifier: z.string().max(2048).regex(
    new RegExp("^[a-zA-Z0-9_\\-/:]*$"),
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

/** Swamp extension model for Events Connection. Registered at `@swamp/aws/events/connection`. */
export const model = {
  type: "@swamp/aws/events/connection",
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
      description: "Events Connection resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Events Connection",
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
          "AWS::Events::Connection",
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
      description: "Get a Events Connection",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Events Connection",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Events::Connection",
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
      description: "Update a Events Connection",
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
          "AWS::Events::Connection",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Events::Connection",
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
      description: "Delete a Events Connection",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Events Connection",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Events::Connection",
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
      description: "Sync Events Connection state from AWS",
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
            "AWS::Events::Connection",
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
