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

// Auto-generated extension model for @swamp/aws/s3/storage-lens-group
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for S3 StorageLensGroup (AWS::S3::StorageLensGroup).
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
  Key: z.string().min(1).max(128),
  Value: z.string().min(0).max(256),
});

const MatchObjectSizeSchema = z.object({
  BytesGreaterThan: z.number().int().min(1).describe(
    "Minimum object size to which the rule applies.",
  ).optional(),
  BytesLessThan: z.number().int().min(1).describe(
    "Maximum object size to which the rule applies.",
  ).optional(),
});

const MatchObjectAgeSchema = z.object({
  DaysGreaterThan: z.number().int().min(1).describe(
    "Minimum object age to which the rule applies.",
  ).optional(),
  DaysLessThan: z.number().int().min(1).describe(
    "Maximum object age to which the rule applies.",
  ).optional(),
});

const AndSchema = z.object({
  MatchAnyPrefix: z.array(z.string().max(1024)).describe(
    "Filter to match any of the specified prefixes.",
  ).optional(),
  MatchAnySuffix: z.array(z.string().max(1024)).describe(
    "Filter to match any of the specified suffixes.",
  ).optional(),
  MatchAnyTag: z.array(TagSchema).describe(
    "Filter to match any of the specified object tags.",
  ).optional(),
  MatchObjectSize: MatchObjectSizeSchema.describe(
    "Filter to match all of the specified values for the minimum and maximum object size.",
  ).optional(),
  MatchObjectAge: MatchObjectAgeSchema.describe(
    "Filter to match all of the specified values for the minimum and maximum object age.",
  ).optional(),
});

const OrSchema = z.object({
  MatchAnyPrefix: z.array(z.string().max(1024)).describe(
    "Filter to match any of the specified prefixes.",
  ).optional(),
  MatchAnySuffix: z.array(z.string().max(1024)).describe(
    "Filter to match any of the specified suffixes.",
  ).optional(),
  MatchAnyTag: z.array(TagSchema).describe(
    "Filter to match any of the specified object tags.",
  ).optional(),
  MatchObjectSize: MatchObjectSizeSchema.describe(
    "Filter to match all of the specified values for the minimum and maximum object size.",
  ).optional(),
  MatchObjectAge: MatchObjectAgeSchema.describe(
    "Filter to match all of the specified values for the minimum and maximum object age.",
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
    "AWS region; overrides AWS_REGION / AWS_DEFAULT_REGION environment variables and ~/.aws/config profile region. Defaults to us-east-1.",
  ).optional(),
  Name: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9\\-_]+$"))
    .describe("The name that identifies the Amazon S3 Storage Lens Group."),
  Filter: z.object({
    MatchAnyPrefix: z.array(z.string().max(1024)).describe(
      "Filter to match any of the specified prefixes.",
    ).optional(),
    MatchAnySuffix: z.array(z.string().max(1024)).describe(
      "Filter to match any of the specified suffixes.",
    ).optional(),
    MatchAnyTag: z.array(TagSchema).describe(
      "Filter to match any of the specified object tags.",
    ).optional(),
    MatchObjectSize: MatchObjectSizeSchema.describe(
      "Filter to match all of the specified values for the minimum and maximum object size.",
    ).optional(),
    MatchObjectAge: MatchObjectAgeSchema.describe(
      "Filter to match all of the specified values for the minimum and maximum object age.",
    ).optional(),
    And: AndSchema.describe(
      "The Storage Lens group will include objects that match all of the specified filter values.",
    ).optional(),
    Or: OrSchema.describe(
      "The Storage Lens group will include objects that match any of the specified filter values.",
    ).optional(),
  }).describe("Sets the Storage Lens Group filter."),
  Tags: z.array(TagSchema).describe(
    "A set of tags (key-value pairs) for this Amazon S3 Storage Lens Group.",
  ).optional(),
});

const StateSchema = z.object({
  Name: z.string(),
  Filter: z.object({
    MatchAnyPrefix: z.array(z.string()),
    MatchAnySuffix: z.array(z.string()),
    MatchAnyTag: z.array(TagSchema),
    MatchObjectSize: MatchObjectSizeSchema,
    MatchObjectAge: MatchObjectAgeSchema,
    And: AndSchema,
    Or: OrSchema,
  }).optional(),
  StorageLensGroupArn: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9\\-_]+$"))
    .describe("The name that identifies the Amazon S3 Storage Lens Group.")
    .optional(),
  Filter: z.object({
    MatchAnyPrefix: z.array(z.string().max(1024)).describe(
      "Filter to match any of the specified prefixes.",
    ).optional(),
    MatchAnySuffix: z.array(z.string().max(1024)).describe(
      "Filter to match any of the specified suffixes.",
    ).optional(),
    MatchAnyTag: z.array(TagSchema).describe(
      "Filter to match any of the specified object tags.",
    ).optional(),
    MatchObjectSize: MatchObjectSizeSchema.describe(
      "Filter to match all of the specified values for the minimum and maximum object size.",
    ).optional(),
    MatchObjectAge: MatchObjectAgeSchema.describe(
      "Filter to match all of the specified values for the minimum and maximum object age.",
    ).optional(),
    And: AndSchema.describe(
      "The Storage Lens group will include objects that match all of the specified filter values.",
    ).optional(),
    Or: OrSchema.describe(
      "The Storage Lens group will include objects that match any of the specified filter values.",
    ).optional(),
  }).describe("Sets the Storage Lens Group filter.").optional(),
  Tags: z.array(TagSchema).describe(
    "A set of tags (key-value pairs) for this Amazon S3 Storage Lens Group.",
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

/** Swamp extension model for S3 StorageLensGroup. Registered at `@swamp/aws/s3/storage-lens-group`. */
export const model = {
  type: "@swamp/aws/s3/storage-lens-group",
  version: "2026.06.15.1",
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
      toVersion: "2026.06.15.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "S3 StorageLensGroup resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a S3 StorageLensGroup",
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
          "AWS::S3::StorageLensGroup",
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
      description: "Get a S3 StorageLensGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the S3 StorageLensGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::S3::StorageLensGroup",
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
      description: "Update a S3 StorageLensGroup",
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
          "AWS::S3::StorageLensGroup",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::S3::StorageLensGroup",
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
      description: "Delete a S3 StorageLensGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the S3 StorageLensGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::S3::StorageLensGroup",
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
      description: "Sync S3 StorageLensGroup state from AWS",
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
            "AWS::S3::StorageLensGroup",
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
