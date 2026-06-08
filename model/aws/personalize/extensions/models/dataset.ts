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

// Auto-generated extension model for @swamp/aws/personalize/dataset
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Personalize Dataset (AWS::Personalize::Dataset).
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
  Name: z.string().min(1).max(63).regex(
    new RegExp("^[a-zA-Z0-9][a-zA-Z0-9\\-_]*"),
  ).describe("The name for the dataset"),
  DatasetType: z.enum(["Interactions", "Items", "Users"]).describe(
    "The type of dataset",
  ),
  DatasetGroupArn: z.string().max(256).regex(
    new RegExp("arn:([a-z\\d-]+):personalize:.*:.*:.+"),
  ).describe(
    "The Amazon Resource Name (ARN) of the dataset group to add the dataset to",
  ),
  SchemaArn: z.string().max(256).regex(
    new RegExp("arn:([a-z\\d-]+):personalize:.*:.*:.+"),
  ).describe(
    "The ARN of the schema to associate with the dataset. The schema defines the dataset fields.",
  ),
  DatasetImportJob: z.object({
    JobName: z.string().min(1).max(63).regex(
      new RegExp("^[a-zA-Z0-9][a-zA-Z0-9\\-_]*"),
    ).describe("The name for the dataset import job.").optional(),
    DatasetImportJobArn: z.string().max(256).regex(
      new RegExp("arn:([a-z\\d-]+):personalize:.*:.*:.+"),
    ).describe("The ARN of the dataset import job").optional(),
    DataSource: z.object({
      DataLocation: z.string().max(256).regex(
        new RegExp("(s3|http|https)://.+"),
      ).describe(
        "The path to the Amazon S3 bucket where the data that you want to upload to your dataset is stored.",
      ).optional(),
    }).describe(
      "The Amazon S3 bucket that contains the training data to import.",
    ).optional(),
    RoleArn: z.string().max(256).regex(
      new RegExp("arn:([a-z\\d-]+):iam::\\d{12}:role/?[a-zA-Z_0-9+=,.@\\-_/]+"),
    ).describe(
      "The ARN of the IAM role that has permissions to read from the Amazon S3 data source.",
    ).optional(),
  }).describe("Initial DatasetImportJob for the created dataset").optional(),
});

const StateSchema = z.object({
  Name: z.string().optional(),
  DatasetArn: z.string(),
  DatasetType: z.string().optional(),
  DatasetGroupArn: z.string().optional(),
  SchemaArn: z.string().optional(),
  DatasetImportJob: z.object({
    JobName: z.string(),
    DatasetImportJobArn: z.string(),
    DatasetArn: z.string(),
    DataSource: z.object({
      DataLocation: z.string(),
    }),
    RoleArn: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().min(1).max(63).regex(
    new RegExp("^[a-zA-Z0-9][a-zA-Z0-9\\-_]*"),
  ).describe("The name for the dataset").optional(),
  DatasetType: z.enum(["Interactions", "Items", "Users"]).describe(
    "The type of dataset",
  ).optional(),
  DatasetGroupArn: z.string().max(256).regex(
    new RegExp("arn:([a-z\\d-]+):personalize:.*:.*:.+"),
  ).describe(
    "The Amazon Resource Name (ARN) of the dataset group to add the dataset to",
  ).optional(),
  SchemaArn: z.string().max(256).regex(
    new RegExp("arn:([a-z\\d-]+):personalize:.*:.*:.+"),
  ).describe(
    "The ARN of the schema to associate with the dataset. The schema defines the dataset fields.",
  ).optional(),
  DatasetImportJob: z.object({
    JobName: z.string().min(1).max(63).regex(
      new RegExp("^[a-zA-Z0-9][a-zA-Z0-9\\-_]*"),
    ).describe("The name for the dataset import job.").optional(),
    DatasetImportJobArn: z.string().max(256).regex(
      new RegExp("arn:([a-z\\d-]+):personalize:.*:.*:.+"),
    ).describe("The ARN of the dataset import job").optional(),
    DataSource: z.object({
      DataLocation: z.string().max(256).regex(
        new RegExp("(s3|http|https)://.+"),
      ).describe(
        "The path to the Amazon S3 bucket where the data that you want to upload to your dataset is stored.",
      ).optional(),
    }).describe(
      "The Amazon S3 bucket that contains the training data to import.",
    ).optional(),
    RoleArn: z.string().max(256).regex(
      new RegExp("arn:([a-z\\d-]+):iam::\\d{12}:role/?[a-zA-Z_0-9+=,.@\\-_/]+"),
    ).describe(
      "The ARN of the IAM role that has permissions to read from the Amazon S3 data source.",
    ).optional(),
  }).describe("Initial DatasetImportJob for the created dataset").optional(),
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

/** Swamp extension model for Personalize Dataset. Registered at `@swamp/aws/personalize/dataset`. */
export const model = {
  type: "@swamp/aws/personalize/dataset",
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
      description: "Personalize Dataset resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Personalize Dataset",
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
          "AWS::Personalize::Dataset",
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
      description: "Get a Personalize Dataset",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Personalize Dataset",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Personalize::Dataset",
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
      description: "Update a Personalize Dataset",
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
        const identifier = existing.DatasetArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Personalize::Dataset",
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
          "AWS::Personalize::Dataset",
          identifier,
          currentState,
          desiredState,
          ["Name", "DatasetType", "DatasetGroupArn", "SchemaArn"],
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
      description: "Delete a Personalize Dataset",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Personalize Dataset",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Personalize::Dataset",
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
      description: "Sync Personalize Dataset state from AWS",
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
        const identifier = existing.DatasetArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Personalize::Dataset",
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
