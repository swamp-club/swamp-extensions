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

// Auto-generated extension model for @swamp/aws/customerprofiles/recommender
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for CustomerProfiles Recommender (AWS::CustomerProfiles::Recommender).
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

const EventParametersSchema = z.object({
  EventType: z.string().min(1).max(255).describe("The type of event"),
  EventValueThreshold: z.number().describe(
    "The threshold of the event type. Only events with a value greater or equal to this threshold will be considered for solution creation.",
  ).optional(),
});

const EventsConfigSchema = z.object({
  EventParametersList: z.array(EventParametersSchema).describe(
    "List of event parameters with their value thresholds",
  ),
});

const RecommenderConfigSchema = z.object({
  EventsConfig: EventsConfigSchema.describe(
    "Configuration for events used in the recommender",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^(?!aws:)[a-zA-Z+-=._:/]+$"),
  ),
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
    "AWS region; overrides AWS_REGION / AWS_DEFAULT_REGION environment variables and ~/.aws/config profile region. Defaults to us-east-1.",
  ).optional(),
  DomainName: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9_-]+$"))
    .describe(
      "The name of the domain for which the recommender will be created",
    ),
  RecommenderName: z.string().min(1).max(64).regex(
    new RegExp("^[a-zA-Z0-9_-]+$"),
  ).describe("The name of the recommender"),
  RecommenderRecipeName: z.string().min(1).max(255).describe(
    "The name of the recommender recipe.",
  ),
  RecommenderConfig: z.object({
    EventsConfig: EventsConfigSchema.describe(
      "Configuration for events used in the recommender",
    ).optional(),
  }).describe("Configuration for the recommender").optional(),
  Description: z.string().min(1).max(1000).describe(
    "The description of the recommender.",
  ).optional(),
  LatestRecommenderUpdate: z.object({
    RecommenderConfig: RecommenderConfigSchema.describe(
      "Configuration for the recommender",
    ).optional(),
    CreationDateTime: z.string().describe(
      "The timestamp of when the update was created",
    ).optional(),
    LastUpdatedDateTime: z.string().describe(
      "The timestamp of when the update was last modified",
    ).optional(),
  }).describe("Information about the latest recommender update").optional(),
  Tags: z.array(TagSchema).describe(
    "The tags used to organize, track, or control access for this resource.",
  ).optional(),
});

const StateSchema = z.object({
  DomainName: z.string(),
  RecommenderName: z.string(),
  RecommenderRecipeName: z.string().optional(),
  RecommenderConfig: RecommenderConfigSchema.optional(),
  Description: z.string().optional(),
  RecommenderArn: z.string().optional(),
  Status: z.string().optional(),
  CreatedAt: z.string().optional(),
  LastUpdatedAt: z.string().optional(),
  FailureReason: z.string().optional(),
  LatestRecommenderUpdate: z.object({
    RecommenderConfig: RecommenderConfigSchema,
    Status: z.string(),
    CreationDateTime: z.string(),
    LastUpdatedDateTime: z.string(),
    FailureReason: z.string(),
  }).optional(),
  TrainingMetrics: z.array(z.object({
    Time: z.string(),
    Metrics: z.object({
      hit: z.number(),
      coverage: z.number(),
      recall: z.number(),
      popularity: z.number(),
      freshness: z.number(),
      similarity: z.number(),
    }),
  })).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  DomainName: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9_-]+$"))
    .describe(
      "The name of the domain for which the recommender will be created",
    ).optional(),
  RecommenderName: z.string().min(1).max(64).regex(
    new RegExp("^[a-zA-Z0-9_-]+$"),
  ).describe("The name of the recommender").optional(),
  RecommenderRecipeName: z.string().min(1).max(255).describe(
    "The name of the recommender recipe.",
  ).optional(),
  RecommenderConfig: z.object({
    EventsConfig: EventsConfigSchema.describe(
      "Configuration for events used in the recommender",
    ).optional(),
  }).describe("Configuration for the recommender").optional(),
  Description: z.string().min(1).max(1000).describe(
    "The description of the recommender.",
  ).optional(),
  LatestRecommenderUpdate: z.object({
    RecommenderConfig: RecommenderConfigSchema.describe(
      "Configuration for the recommender",
    ).optional(),
    CreationDateTime: z.string().describe(
      "The timestamp of when the update was created",
    ).optional(),
    LastUpdatedDateTime: z.string().describe(
      "The timestamp of when the update was last modified",
    ).optional(),
  }).describe("Information about the latest recommender update").optional(),
  Tags: z.array(TagSchema).describe(
    "The tags used to organize, track, or control access for this resource.",
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

/** Swamp extension model for CustomerProfiles Recommender. Registered at `@swamp/aws/customerprofiles/recommender`. */
export const model = {
  type: "@swamp/aws/customerprofiles/recommender",
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
      description: "CustomerProfiles Recommender resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CustomerProfiles Recommender",
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
          "AWS::CustomerProfiles::Recommender",
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
      description: "Get a CustomerProfiles Recommender",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CustomerProfiles Recommender",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::CustomerProfiles::Recommender",
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
      description: "Update a CustomerProfiles Recommender",
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
          existing.DomainName?.toString(),
          existing.RecommenderName?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::CustomerProfiles::Recommender",
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
          "AWS::CustomerProfiles::Recommender",
          identifier,
          currentState,
          desiredState,
          ["DomainName", "RecommenderName", "RecommenderRecipeName"],
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
      description: "Delete a CustomerProfiles Recommender",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CustomerProfiles Recommender",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::CustomerProfiles::Recommender",
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
      description: "Sync CustomerProfiles Recommender state from AWS",
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
          existing.DomainName?.toString(),
          existing.RecommenderName?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::CustomerProfiles::Recommender",
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
