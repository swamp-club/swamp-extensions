// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/aws/personalize/recommender
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Personalize Recommender (AWS::Personalize::Recommender).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, sync, and list can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";

const TrainingDataConfigSchema = z.object({
  ExcludedDatasetColumns: z.record(
    z.string(),
    z.array(z.string().max(150).regex(new RegExp("^[A-Za-z_][A-Za-z\\d_]*$"))),
  ).describe(
    "Specifies the columns to exclude from training. Each key is a dataset type, and each value is a list of columns.",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe("The key name of the tag."),
  Value: z.string().min(0).max(256).describe("The value for the tag."),
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
  Name: z.string().min(1).max(63).regex(
    new RegExp("^[a-zA-Z0-9][a-zA-Z0-9\\-_]*$"),
  ).describe("The name of the recommender."),
  DatasetGroupArn: z.string().max(256).regex(
    new RegExp("arn:([a-z\\d-]+):personalize:.*:.*:.+"),
  ).describe(
    "The ARN of the Domain dataset group that the recommender is created for.",
  ),
  RecipeArn: z.string().max(256).regex(
    new RegExp("arn:([a-z\\d-]+):personalize:.*:.*:.+"),
  ).describe(
    "The ARN of the recipe (Domain dataset group use case) that the recommender uses.",
  ),
  RecommenderConfig: z.object({
    ItemExplorationConfig: z.record(z.string(), z.string().max(1000)).describe(
      "Specifies the exploration configuration hyperparameters.",
    ).optional(),
    MinRecommendationRequestsPerSecond: z.number().int().min(1).describe(
      "Specifies the requested minimum provisioned recommendation requests per second.",
    ).optional(),
    TrainingDataConfig: TrainingDataConfigSchema.describe(
      "The training data configuration to use when creating a domain recommender.",
    ).optional(),
    EnableMetadataWithRecommendations: z.boolean().describe(
      "Whether metadata with recommendations is enabled for the recommender.",
    ).optional(),
  }).describe("The configuration details of the recommender.").optional(),
  Tags: z.array(TagSchema).describe("Tags to associate with the recommender.")
    .optional(),
});

const StateSchema = z.object({
  Name: z.string().optional(),
  DatasetGroupArn: z.string().optional(),
  RecipeArn: z.string().optional(),
  RecommenderConfig: z.object({
    ItemExplorationConfig: z.record(z.string(), z.unknown()),
    MinRecommendationRequestsPerSecond: z.number(),
    TrainingDataConfig: TrainingDataConfigSchema,
    EnableMetadataWithRecommendations: z.boolean(),
  }).optional(),
  RecommenderArn: z.string(),
  Status: z.string().optional(),
  CreationDateTime: z.string().optional(),
  LastUpdatedDateTime: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().min(1).max(63).regex(
    new RegExp("^[a-zA-Z0-9][a-zA-Z0-9\\-_]*$"),
  ).describe("The name of the recommender.").optional(),
  DatasetGroupArn: z.string().max(256).regex(
    new RegExp("arn:([a-z\\d-]+):personalize:.*:.*:.+"),
  ).describe(
    "The ARN of the Domain dataset group that the recommender is created for.",
  ).optional(),
  RecipeArn: z.string().max(256).regex(
    new RegExp("arn:([a-z\\d-]+):personalize:.*:.*:.+"),
  ).describe(
    "The ARN of the recipe (Domain dataset group use case) that the recommender uses.",
  ).optional(),
  RecommenderConfig: z.object({
    ItemExplorationConfig: z.record(z.string(), z.string().max(1000)).describe(
      "Specifies the exploration configuration hyperparameters.",
    ).optional(),
    MinRecommendationRequestsPerSecond: z.number().int().min(1).describe(
      "Specifies the requested minimum provisioned recommendation requests per second.",
    ).optional(),
    TrainingDataConfig: TrainingDataConfigSchema.describe(
      "The training data configuration to use when creating a domain recommender.",
    ).optional(),
    EnableMetadataWithRecommendations: z.boolean().describe(
      "Whether metadata with recommendations is enabled for the recommender.",
    ).optional(),
  }).describe("The configuration details of the recommender.").optional(),
  Tags: z.array(TagSchema).describe("Tags to associate with the recommender.")
    .optional(),
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

/** Swamp extension model for Personalize Recommender. Registered at `@swamp/aws/personalize/recommender`. */
export const model = {
  type: "@swamp/aws/personalize/recommender",
  version: "2026.10.27.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Personalize Recommender resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Personalize Recommender",
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
          "AWS::Personalize::Recommender",
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
      description: "Get a Personalize Recommender",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Personalize Recommender",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Personalize::Recommender",
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
      description: "Update a Personalize Recommender",
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
        const identifier = existing.RecommenderArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Personalize::Recommender",
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
          "AWS::Personalize::Recommender",
          identifier,
          currentState,
          desiredState,
          ["Name", "DatasetGroupArn", "RecipeArn"],
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
      description: "Delete a Personalize Recommender",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Personalize Recommender",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Personalize::Recommender",
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
      description: "Sync Personalize Recommender state from AWS",
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
        const identifier = existing.RecommenderArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Personalize::Recommender",
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
    list: {
      description: "List Personalize Recommender resources",
      arguments: z.object({
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
        resourceModel: z.string().describe(
          "JSON resource model for parent-scoped listing (e.g. parent identifier)",
        ).optional(),
      }),
      execute: async (
        args: { maxPages?: number; resourceModel?: string },
        context: any,
      ) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { items, nextToken } = await listResources(
          "AWS::Personalize::Recommender",
          {
            resourceModel: args.resourceModel,
            maxPages: args.maxPages,
            credentials,
          },
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const instanceName =
            (item.properties?.RecommenderArn?.toString() ?? item.identifier)
              .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
          const handle = await context.writeResource("state", instanceName, {
            ...item.properties,
            _identifier: item.identifier,
          });
          dataHandles.push(handle);
        }
        return {
          dataHandles,
          result: { count: items.length, nextPageToken: nextToken },
        };
      },
    },
  },
};
