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

// Auto-generated extension model for @swamp/aws/mediatailor/prefetch-schedule
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for MediaTailor PrefetchSchedule (AWS::MediaTailor::PrefetchSchedule).
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

const AvailMatchingCriteriaSchema = z.object({
  DynamicVariable: z.string().describe(
    "The dynamic variable(s) that MediaTailor should use as avail matching criteria.",
  ),
  Operator: z.enum(["EQUALS"]).describe(
    "For the DynamicVariable specified in AvailMatchingCriteria, the Operator that is used for the comparison.",
  ),
});

const TrafficShapingRetrievalWindowSchema = z.object({
  RetrievalWindowDurationSeconds: z.number().int().describe(
    "The amount of time, in seconds, that MediaTailor spreads prefetch requests to the ADS.",
  ).optional(),
});

const TrafficShapingTpsConfigurationSchema = z.object({
  PeakTps: z.number().int().describe(
    "The maximum number of transactions per second (TPS) that your ad decision server (ADS) can handle.",
  ).optional(),
  PeakConcurrentUsers: z.number().int().describe(
    "The expected peak number of concurrent viewers for your content.",
  ).optional(),
});

const RecurringConsumptionSchema = z.object({
  RetrievedAdExpirationSeconds: z.number().int().describe(
    "The number of seconds that an ad is available for insertion after it was prefetched.",
  ).optional(),
  AvailMatchingCriteria: z.array(AvailMatchingCriteriaSchema).describe(
    "The configuration for the dynamic variables that determine which ad breaks that MediaTailor inserts prefetched ads in.",
  ).optional(),
});

const RecurringRetrievalSchema = z.object({
  DynamicVariables: z.record(z.string(), z.string()).describe(
    "The dynamic variables to use for substitution during prefetch requests to the ADS.",
  ).optional(),
  DelayAfterAvailEndSeconds: z.number().int().describe(
    "The number of seconds that MediaTailor waits after an ad avail before prefetching ads for the next avail.",
  ).optional(),
  TrafficShapingType: z.enum(["RETRIEVAL_WINDOW", "TPS"]).describe(
    "Indicates the type of traffic shaping used to limit the number of requests to the ADS at one time.",
  ).optional(),
  TrafficShapingRetrievalWindow: TrafficShapingRetrievalWindowSchema.optional(),
  TrafficShapingTpsConfiguration: TrafficShapingTpsConfigurationSchema
    .optional(),
});

const TagSchema = z.object({
  Key: z.string(),
  Value: z.string(),
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
  Name: z.string().describe("The name to assign to the prefetch schedule."),
  PlaybackConfigurationName: z.string().describe(
    "The name of the playback configuration.",
  ),
  Consumption: z.object({
    AvailMatchingCriteria: z.array(AvailMatchingCriteriaSchema).describe(
      "If you only want MediaTailor to insert prefetched ads into avails that match specific dynamic variables, set the avail matching criteria.",
    ).optional(),
    EndTime: z.string().describe(
      "The time when MediaTailor no longer considers the prefetched ads for use in an ad break, as an ISO 8601 date-time.",
    ),
    StartTime: z.string().describe(
      "The time when prefetched ads are considered for use in an ad break, as an ISO 8601 date-time.",
    ).optional(),
  }).optional(),
  Retrieval: z.object({
    DynamicVariables: z.record(z.string(), z.string()).describe(
      "The dynamic variables to use for substitution during prefetch requests to the ad decision server (ADS).",
    ).optional(),
    EndTime: z.string().describe(
      "The time when prefetch retrieval ends for the ad break, as an ISO 8601 date-time.",
    ),
    StartTime: z.string().describe(
      "The time when prefetch retrievals can start for this break, as an ISO 8601 date-time.",
    ).optional(),
    TrafficShapingType: z.enum(["RETRIEVAL_WINDOW", "TPS"]).describe(
      "Indicates the type of traffic shaping used to limit the number of requests to the ADS at one time.",
    ).optional(),
    TrafficShapingRetrievalWindow: TrafficShapingRetrievalWindowSchema
      .optional(),
    TrafficShapingTpsConfiguration: TrafficShapingTpsConfigurationSchema
      .optional(),
  }).optional(),
  RecurringPrefetchConfiguration: z.object({
    StartTime: z.string().describe(
      "The start time for the window that MediaTailor prefetches and inserts ads in a live event, as an ISO 8601 date-time.",
    ).optional(),
    EndTime: z.string().describe(
      "The end time for the window that MediaTailor prefetches and inserts ads in a live event, as an ISO 8601 date-time.",
    ),
    RecurringConsumption: RecurringConsumptionSchema,
    RecurringRetrieval: RecurringRetrievalSchema,
  }).optional(),
  ScheduleType: z.enum(["SINGLE", "RECURRING"]).describe(
    "The frequency that MediaTailor creates prefetch schedules.",
  ).optional(),
  StreamId: z.string().describe(
    "An optional stream identifier that MediaTailor uses to prefetch ads for multiple streams that use the same playback configuration.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags assigned to the prefetch schedule.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  Name: z.string().optional(),
  PlaybackConfigurationName: z.string().optional(),
  Consumption: z.object({
    AvailMatchingCriteria: z.array(AvailMatchingCriteriaSchema),
    EndTime: z.string(),
    StartTime: z.string(),
  }).optional(),
  Retrieval: z.object({
    DynamicVariables: z.record(z.string(), z.unknown()),
    EndTime: z.string(),
    StartTime: z.string(),
    TrafficShapingType: z.string(),
    TrafficShapingRetrievalWindow: TrafficShapingRetrievalWindowSchema,
    TrafficShapingTpsConfiguration: TrafficShapingTpsConfigurationSchema,
  }).optional(),
  RecurringPrefetchConfiguration: z.object({
    StartTime: z.string(),
    EndTime: z.string(),
    RecurringConsumption: RecurringConsumptionSchema,
    RecurringRetrieval: RecurringRetrievalSchema,
  }).optional(),
  ScheduleType: z.string().optional(),
  StreamId: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().describe("The name to assign to the prefetch schedule.")
    .optional(),
  PlaybackConfigurationName: z.string().describe(
    "The name of the playback configuration.",
  ).optional(),
  Consumption: z.object({
    AvailMatchingCriteria: z.array(AvailMatchingCriteriaSchema).describe(
      "If you only want MediaTailor to insert prefetched ads into avails that match specific dynamic variables, set the avail matching criteria.",
    ).optional(),
    EndTime: z.string().describe(
      "The time when MediaTailor no longer considers the prefetched ads for use in an ad break, as an ISO 8601 date-time.",
    ).optional(),
    StartTime: z.string().describe(
      "The time when prefetched ads are considered for use in an ad break, as an ISO 8601 date-time.",
    ).optional(),
  }).optional(),
  Retrieval: z.object({
    DynamicVariables: z.record(z.string(), z.string()).describe(
      "The dynamic variables to use for substitution during prefetch requests to the ad decision server (ADS).",
    ).optional(),
    EndTime: z.string().describe(
      "The time when prefetch retrieval ends for the ad break, as an ISO 8601 date-time.",
    ).optional(),
    StartTime: z.string().describe(
      "The time when prefetch retrievals can start for this break, as an ISO 8601 date-time.",
    ).optional(),
    TrafficShapingType: z.enum(["RETRIEVAL_WINDOW", "TPS"]).describe(
      "Indicates the type of traffic shaping used to limit the number of requests to the ADS at one time.",
    ).optional(),
    TrafficShapingRetrievalWindow: TrafficShapingRetrievalWindowSchema
      .optional(),
    TrafficShapingTpsConfiguration: TrafficShapingTpsConfigurationSchema
      .optional(),
  }).optional(),
  RecurringPrefetchConfiguration: z.object({
    StartTime: z.string().describe(
      "The start time for the window that MediaTailor prefetches and inserts ads in a live event, as an ISO 8601 date-time.",
    ).optional(),
    EndTime: z.string().describe(
      "The end time for the window that MediaTailor prefetches and inserts ads in a live event, as an ISO 8601 date-time.",
    ).optional(),
    RecurringConsumption: RecurringConsumptionSchema.optional(),
    RecurringRetrieval: RecurringRetrievalSchema.optional(),
  }).optional(),
  ScheduleType: z.enum(["SINGLE", "RECURRING"]).describe(
    "The frequency that MediaTailor creates prefetch schedules.",
  ).optional(),
  StreamId: z.string().describe(
    "An optional stream identifier that MediaTailor uses to prefetch ads for multiple streams that use the same playback configuration.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags assigned to the prefetch schedule.",
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

/** Swamp extension model for MediaTailor PrefetchSchedule. Registered at `@swamp/aws/mediatailor/prefetch-schedule`. */
export const model = {
  type: "@swamp/aws/mediatailor/prefetch-schedule",
  version: "2026.10.23.1",
  upgrades: [
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "MediaTailor PrefetchSchedule resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a MediaTailor PrefetchSchedule",
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
          "AWS::MediaTailor::PrefetchSchedule",
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
      description: "Get a MediaTailor PrefetchSchedule",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MediaTailor PrefetchSchedule",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::MediaTailor::PrefetchSchedule",
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
      description: "Update a MediaTailor PrefetchSchedule",
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
          "AWS::MediaTailor::PrefetchSchedule",
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
          "AWS::MediaTailor::PrefetchSchedule",
          identifier,
          currentState,
          desiredState,
          [
            "Name",
            "PlaybackConfigurationName",
            "Consumption",
            "Retrieval",
            "RecurringPrefetchConfiguration",
            "ScheduleType",
            "StreamId",
          ],
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
      description: "Delete a MediaTailor PrefetchSchedule",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MediaTailor PrefetchSchedule",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::MediaTailor::PrefetchSchedule",
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
      description: "Sync MediaTailor PrefetchSchedule state from AWS",
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
            "AWS::MediaTailor::PrefetchSchedule",
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
      description: "List MediaTailor PrefetchSchedule resources",
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
          "AWS::MediaTailor::PrefetchSchedule",
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
            (item.properties?.Arn?.toString() ?? item.identifier).replace(
              /[\/\\]/g,
              "_",
            ).replace(/\.\./g, "_").replace(/\0/g, "");
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
