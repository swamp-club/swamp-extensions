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

// Auto-generated extension model for @swamp/aws/interconnect/connection
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Interconnect Connection (AWS::Interconnect::Connection).
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
  Description: z.string().max(255).regex(new RegExp("^[-a-zA-Z0-9_ ]+$"))
    .describe("A description of the connection.").optional(),
  Bandwidth: z.string().regex(new RegExp("^\\d+[MG]bps$")).describe(
    "The bandwidth of the connection (e.g., 50Mbps, 1Gbps). Required when creating a connection through AWS.",
  ).optional(),
  AttachPoint: z.object({
    DirectConnectGateway: z.string().regex(
      new RegExp(
        "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$",
      ),
    ).describe("The ID of the Direct Connect Gateway to attach to.").optional(),
  }).describe(
    "The logical attachment point in your AWS network where the managed connection will be connected.",
  ),
  EnvironmentId: z.string().min(1).max(32).describe(
    "The ID of the environment for the connection. Required when creating a connection through AWS. Mutually exclusive with ActivationKey.",
  ).optional(),
  RemoteOwnerAccount: z.string().max(255).regex(
    new RegExp("^[-a-zA-Z0-9_@\\.]+$"),
  ).describe(
    "Deprecated. Use RemoteAccount instead. The account ID of the remote owner. Required when creating a connection through AWS.",
  ).optional(),
  RemoteAccount: z.object({
    Identifier: z.string().max(255).regex(new RegExp("^[-a-zA-Z0-9_@\\.]+$"))
      .describe("The identifier of the remote account."),
  }).describe(
    "The remote account identifier for the connection. Required when creating a connection through AWS. Replaces RemoteOwnerAccount.",
  ).optional(),
  ActivationKey: z.string().describe(
    "The activation key for accepting a connection proposal from a partner CSP. Mutually exclusive with EnvironmentId.",
  ).optional(),
  Provider: z.object({
    CloudServiceProvider: z.string().max(32).describe(
      "The name of the cloud service provider.",
    ).optional(),
    LastMileProvider: z.string().max(32).describe(
      "The name of the last mile provider.",
    ).optional(),
  }).describe("The partner cloud service provider.").optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  ConnectionId: z.string().optional(),
  Arn: z.string(),
  Description: z.string().optional(),
  Bandwidth: z.string().optional(),
  AttachPoint: z.object({
    DirectConnectGateway: z.string(),
    Arn: z.string(),
  }).optional(),
  EnvironmentId: z.string().optional(),
  RemoteOwnerAccount: z.string().optional(),
  RemoteAccount: z.object({
    Identifier: z.string(),
  }).optional(),
  ActivationKey: z.string().optional(),
  Provider: z.object({
    CloudServiceProvider: z.string(),
    LastMileProvider: z.string(),
  }).optional(),
  Type: z.string().optional(),
  State: z.string().optional(),
  SharedId: z.string().optional(),
  OwnerAccount: z.string().optional(),
  BillingTier: z.number().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Description: z.string().max(255).regex(new RegExp("^[-a-zA-Z0-9_ ]+$"))
    .describe("A description of the connection.").optional(),
  Bandwidth: z.string().regex(new RegExp("^\\d+[MG]bps$")).describe(
    "The bandwidth of the connection (e.g., 50Mbps, 1Gbps). Required when creating a connection through AWS.",
  ).optional(),
  AttachPoint: z.object({
    DirectConnectGateway: z.string().regex(
      new RegExp(
        "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$",
      ),
    ).describe("The ID of the Direct Connect Gateway to attach to.").optional(),
  }).describe(
    "The logical attachment point in your AWS network where the managed connection will be connected.",
  ).optional(),
  EnvironmentId: z.string().min(1).max(32).describe(
    "The ID of the environment for the connection. Required when creating a connection through AWS. Mutually exclusive with ActivationKey.",
  ).optional(),
  RemoteOwnerAccount: z.string().max(255).regex(
    new RegExp("^[-a-zA-Z0-9_@\\.]+$"),
  ).describe(
    "Deprecated. Use RemoteAccount instead. The account ID of the remote owner. Required when creating a connection through AWS.",
  ).optional(),
  RemoteAccount: z.object({
    Identifier: z.string().max(255).regex(new RegExp("^[-a-zA-Z0-9_@\\.]+$"))
      .describe("The identifier of the remote account.").optional(),
  }).describe(
    "The remote account identifier for the connection. Required when creating a connection through AWS. Replaces RemoteOwnerAccount.",
  ).optional(),
  ActivationKey: z.string().describe(
    "The activation key for accepting a connection proposal from a partner CSP. Mutually exclusive with EnvironmentId.",
  ).optional(),
  Provider: z.object({
    CloudServiceProvider: z.string().max(32).describe(
      "The name of the cloud service provider.",
    ).optional(),
    LastMileProvider: z.string().max(32).describe(
      "The name of the last mile provider.",
    ).optional(),
  }).describe("The partner cloud service provider.").optional(),
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

/** Swamp extension model for Interconnect Connection. Registered at `@swamp/aws/interconnect/connection`. */
export const model = {
  type: "@swamp/aws/interconnect/connection",
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
      toVersion: "2026.05.05.1",
      description: "Added: RemoteAccount",
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
      description: "Interconnect Connection resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Interconnect Connection",
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
          "AWS::Interconnect::Connection",
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
      description: "Get a Interconnect Connection",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Interconnect Connection",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Interconnect::Connection",
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
      description: "Update a Interconnect Connection",
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
          "AWS::Interconnect::Connection",
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
          "AWS::Interconnect::Connection",
          identifier,
          currentState,
          desiredState,
          ["AttachPoint", "EnvironmentId", "ActivationKey", "RemoteAccount"],
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
      description: "Delete a Interconnect Connection",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Interconnect Connection",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Interconnect::Connection",
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
      description: "Sync Interconnect Connection state from AWS",
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
            "AWS::Interconnect::Connection",
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
