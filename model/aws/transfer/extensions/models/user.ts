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

// Auto-generated extension model for @swamp/aws/transfer/user
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Transfer User (AWS::Transfer::User).
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

const HomeDirectoryMapEntrySchema = z.object({
  Entry: z.string().min(0).max(1024).regex(new RegExp("^/.*$")),
  Target: z.string().min(0).max(1024).regex(new RegExp("^/.*$")),
  Type: z.enum(["FILE", "DIRECTORY"]).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(0).max(128),
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
  HomeDirectory: z.string().min(0).max(1024).regex(new RegExp("^(|/.*)$"))
    .optional(),
  HomeDirectoryMappings: z.array(HomeDirectoryMapEntrySchema).optional(),
  HomeDirectoryType: z.enum(["PATH", "LOGICAL"]).optional(),
  Policy: z.string().min(0).max(2048).optional(),
  PosixProfile: z.object({
    Uid: z.number().min(0).max(4294967295),
    Gid: z.number().min(0).max(4294967295),
    SecondaryGids: z.array(z.number().min(0).max(4294967295)).optional(),
  }).optional(),
  Role: z.string().min(20).max(2048).regex(new RegExp("^arn:.*role/\\S+$")),
  ServerId: z.string().min(19).max(19).regex(new RegExp("^s-([0-9a-f]{17})$")),
  SshPublicKeys: z.array(
    z.string().min(0).max(2048).regex(
      new RegExp(
        "^\\s*(ssh|ecdsa)-[a-z0-9-]+[ \\t]+(([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{1,3})?(={0,3})?)(\\s*|[ \\t]+[\\S \\t]*\\s*)$",
      ),
    ),
  ).describe(
    "This represents the SSH User Public Keys for CloudFormation resource",
  ).optional(),
  Tags: z.array(TagSchema).optional(),
  UserName: z.string().min(3).max(100).regex(
    new RegExp("^[\\w][\\w@.-]{2,99}$"),
  ),
});

const StateSchema = z.object({
  Arn: z.string(),
  HomeDirectory: z.string().optional(),
  HomeDirectoryMappings: z.array(HomeDirectoryMapEntrySchema).optional(),
  HomeDirectoryType: z.string().optional(),
  Policy: z.string().optional(),
  PosixProfile: z.object({
    Uid: z.number(),
    Gid: z.number(),
    SecondaryGids: z.array(z.number()),
  }).optional(),
  Role: z.string().optional(),
  ServerId: z.string().optional(),
  SshPublicKeys: z.array(z.string()).optional(),
  Tags: z.array(TagSchema).optional(),
  UserName: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  HomeDirectory: z.string().min(0).max(1024).regex(new RegExp("^(|/.*)$"))
    .optional(),
  HomeDirectoryMappings: z.array(HomeDirectoryMapEntrySchema).optional(),
  HomeDirectoryType: z.enum(["PATH", "LOGICAL"]).optional(),
  Policy: z.string().min(0).max(2048).optional(),
  PosixProfile: z.object({
    Uid: z.number().min(0).max(4294967295).optional(),
    Gid: z.number().min(0).max(4294967295).optional(),
    SecondaryGids: z.array(z.number().min(0).max(4294967295)).optional(),
  }).optional(),
  Role: z.string().min(20).max(2048).regex(new RegExp("^arn:.*role/\\S+$"))
    .optional(),
  ServerId: z.string().min(19).max(19).regex(new RegExp("^s-([0-9a-f]{17})$"))
    .optional(),
  SshPublicKeys: z.array(
    z.string().min(0).max(2048).regex(
      new RegExp(
        "^\\s*(ssh|ecdsa)-[a-z0-9-]+[ \\t]+(([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{1,3})?(={0,3})?)(\\s*|[ \\t]+[\\S \\t]*\\s*)$",
      ),
    ),
  ).describe(
    "This represents the SSH User Public Keys for CloudFormation resource",
  ).optional(),
  Tags: z.array(TagSchema).optional(),
  UserName: z.string().min(3).max(100).regex(
    new RegExp("^[\\w][\\w@.-]{2,99}$"),
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

/** Swamp extension model for Transfer User. Registered at `@swamp/aws/transfer/user`. */
export const model = {
  type: "@swamp/aws/transfer/user",
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
      description: "Transfer User resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Transfer User",
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
          "AWS::Transfer::User",
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
      description: "Get a Transfer User",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Transfer User",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Transfer::User",
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
      description: "Update a Transfer User",
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
          "AWS::Transfer::User",
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
          "AWS::Transfer::User",
          identifier,
          currentState,
          desiredState,
          ["ServerId", "UserName"],
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
      description: "Delete a Transfer User",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Transfer User",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Transfer::User",
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
      description: "Sync Transfer User state from AWS",
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
            "AWS::Transfer::User",
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
