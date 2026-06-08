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

// Auto-generated extension model for @swamp/aws/gamelift/game-session-queue
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for GameLift GameSessionQueue (AWS::GameLift::GameSessionQueue).
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

const GameSessionQueueDestinationSchema = z.object({
  DestinationArn: z.string().min(1).max(256).regex(
    new RegExp("[a-zA-Z0-9:/-]+"),
  ).optional(),
});

const PlayerLatencyPolicySchema = z.object({
  MaximumIndividualPlayerLatencyMilliseconds: z.number().int().min(0).describe(
    "The maximum latency value that is allowed for any player, in milliseconds. All policies must have a value set for this property.",
  ).optional(),
  PolicyDurationSeconds: z.number().int().min(0).describe(
    "The length of time, in seconds, that the policy is enforced while placing a new game session.",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length.",
  ),
  Value: z.string().min(1).max(256).describe(
    "The value for the tag. You can specify a value that is 1 to 256 Unicode characters in length.",
  ),
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
  Name: z.string().min(1).max(128).regex(new RegExp("[a-zA-Z0-9-]+")).describe(
    "A descriptive label that is associated with game session queue. Queue names must be unique within each Region.",
  ),
  TimeoutInSeconds: z.number().int().min(0).describe(
    "The maximum time, in seconds, that a new game session placement request remains in the queue.",
  ).optional(),
  Destinations: z.array(GameSessionQueueDestinationSchema).describe(
    "A list of fleets and/or fleet aliases that can be used to fulfill game session placement requests in the queue.",
  ).optional(),
  PlayerLatencyPolicies: z.array(PlayerLatencyPolicySchema).describe(
    "A set of policies that act as a sliding cap on player latency.",
  ).optional(),
  CustomEventData: z.string().min(1).max(256).regex(new RegExp("[\\s\\S]*"))
    .describe(
      "Information that is added to all events that are related to this game session queue.",
    ).optional(),
  NotificationTarget: z.string().min(1).max(300).regex(
    new RegExp("[a-zA-Z0-9:_-]*(\\.fifo)?"),
  ).describe(
    "An SNS topic ARN that is set up to receive game session placement notifications.",
  ).optional(),
  FilterConfiguration: z.object({
    AllowedLocations: z.array(
      z.string().min(1).max(64).regex(new RegExp("^[a-z]+(-([a-z]+|\\d))*")),
    ).describe(
      "A list of locations to allow game session placement in, in the form of AWS Region codes such as us-west-2.",
    ).optional(),
  }).describe(
    "A list of locations where a queue is allowed to place new game sessions.",
  ).optional(),
  PriorityConfiguration: z.object({
    LocationOrder: z.array(
      z.string().min(1).max(64).regex(new RegExp("^[A-Za-z0-9\\-]+")),
    ).describe(
      "The prioritization order to use for fleet locations, when the PriorityOrder property includes LOCATION.",
    ).optional(),
    PriorityOrder: z.array(
      z.enum(["LATENCY", "COST", "DESTINATION", "LOCATION"]),
    ).describe(
      "The recommended sequence to use when prioritizing where to place new game sessions.",
    ).optional(),
  }).describe(
    "Custom settings to use when prioritizing destinations and locations for game session placements.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  Name: z.string(),
  TimeoutInSeconds: z.number().optional(),
  Destinations: z.array(GameSessionQueueDestinationSchema).optional(),
  PlayerLatencyPolicies: z.array(PlayerLatencyPolicySchema).optional(),
  CustomEventData: z.string().optional(),
  NotificationTarget: z.string().optional(),
  FilterConfiguration: z.object({
    AllowedLocations: z.array(z.string()),
  }).optional(),
  PriorityConfiguration: z.object({
    LocationOrder: z.array(z.string()),
    PriorityOrder: z.array(z.string()),
  }).optional(),
  Arn: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().min(1).max(128).regex(new RegExp("[a-zA-Z0-9-]+")).describe(
    "A descriptive label that is associated with game session queue. Queue names must be unique within each Region.",
  ).optional(),
  TimeoutInSeconds: z.number().int().min(0).describe(
    "The maximum time, in seconds, that a new game session placement request remains in the queue.",
  ).optional(),
  Destinations: z.array(GameSessionQueueDestinationSchema).describe(
    "A list of fleets and/or fleet aliases that can be used to fulfill game session placement requests in the queue.",
  ).optional(),
  PlayerLatencyPolicies: z.array(PlayerLatencyPolicySchema).describe(
    "A set of policies that act as a sliding cap on player latency.",
  ).optional(),
  CustomEventData: z.string().min(1).max(256).regex(new RegExp("[\\s\\S]*"))
    .describe(
      "Information that is added to all events that are related to this game session queue.",
    ).optional(),
  NotificationTarget: z.string().min(1).max(300).regex(
    new RegExp("[a-zA-Z0-9:_-]*(\\.fifo)?"),
  ).describe(
    "An SNS topic ARN that is set up to receive game session placement notifications.",
  ).optional(),
  FilterConfiguration: z.object({
    AllowedLocations: z.array(
      z.string().min(1).max(64).regex(new RegExp("^[a-z]+(-([a-z]+|\\d))*")),
    ).describe(
      "A list of locations to allow game session placement in, in the form of AWS Region codes such as us-west-2.",
    ).optional(),
  }).describe(
    "A list of locations where a queue is allowed to place new game sessions.",
  ).optional(),
  PriorityConfiguration: z.object({
    LocationOrder: z.array(
      z.string().min(1).max(64).regex(new RegExp("^[A-Za-z0-9\\-]+")),
    ).describe(
      "The prioritization order to use for fleet locations, when the PriorityOrder property includes LOCATION.",
    ).optional(),
    PriorityOrder: z.array(
      z.enum(["LATENCY", "COST", "DESTINATION", "LOCATION"]),
    ).describe(
      "The recommended sequence to use when prioritizing where to place new game sessions.",
    ).optional(),
  }).describe(
    "Custom settings to use when prioritizing destinations and locations for game session placements.",
  ).optional(),
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

/** Swamp extension model for GameLift GameSessionQueue. Registered at `@swamp/aws/gamelift/game-session-queue`. */
export const model = {
  type: "@swamp/aws/gamelift/game-session-queue",
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
      description: "GameLift GameSessionQueue resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a GameLift GameSessionQueue",
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
          "AWS::GameLift::GameSessionQueue",
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
      description: "Get a GameLift GameSessionQueue",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the GameLift GameSessionQueue",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::GameLift::GameSessionQueue",
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
      description: "Update a GameLift GameSessionQueue",
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
          "AWS::GameLift::GameSessionQueue",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::GameLift::GameSessionQueue",
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
      description: "Delete a GameLift GameSessionQueue",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the GameLift GameSessionQueue",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::GameLift::GameSessionQueue",
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
      description: "Sync GameLift GameSessionQueue state from AWS",
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
            "AWS::GameLift::GameSessionQueue",
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
