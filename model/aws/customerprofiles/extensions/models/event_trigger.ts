// Auto-generated extension model for @swamp/aws/customerprofiles/event-trigger
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for CustomerProfiles EventTrigger (AWS::CustomerProfiles::EventTrigger).
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

const ObjectAttributeSchema = z.object({
  Source: z.string().min(1).max(1000).describe(
    "An attribute contained within a source object.",
  ).optional(),
  FieldName: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9_.-]+$"))
    .describe("A field defined within an object type.").optional(),
  ComparisonOperator: z.enum([
    "INCLUSIVE",
    "EXCLUSIVE",
    "CONTAINS",
    "BEGINS_WITH",
    "ENDS_WITH",
    "GREATER_THAN",
    "LESS_THAN",
    "GREATER_THAN_OR_EQUAL",
    "LESS_THAN_OR_EQUAL",
    "EQUAL",
    "BEFORE",
    "AFTER",
    "ON",
    "BETWEEN",
    "NOT_BETWEEN",
  ]).describe(
    "The operator used to compare an attribute against a list of values.",
  ),
  Values: z.array(z.string().min(1).max(255)).describe(
    "A list of attribute values used for comparison.",
  ),
});

const EventTriggerDimensionSchema = z.object({
  ObjectAttributes: z.array(ObjectAttributeSchema).describe(
    "A list of object attributes to be evaluated.",
  ),
});

const EventTriggerConditionSchema = z.object({
  EventTriggerDimensions: z.array(EventTriggerDimensionSchema).describe(
    "A list of dimensions to be evaluated for the event.",
  ),
  LogicalOperator: z.enum(["ANY", "ALL", "NONE"]).describe(
    "The operator used to combine multiple dimensions.",
  ),
});

const PeriodSchema = z.object({
  Unit: z.enum(["HOURS", "DAYS", "WEEKS", "MONTHS"]).describe(
    "The unit of time.",
  ),
  Value: z.number().int().min(1).max(24).describe(
    "The amount of time of the specified unit.",
  ),
  MaxInvocationsPerProfile: z.number().int().min(1).max(1000).describe(
    "The maximum allowed number of destination invocations per profile.",
  ).optional(),
  Unlimited: z.boolean().describe(
    "If set to true, there is no limit on the number of destination invocations per profile. The default is false.",
  ).optional(),
});

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
  DomainName: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9_-]+$"))
    .describe("The unique name of the domain."),
  EventTriggerName: z.string().min(1).max(64).regex(
    new RegExp("^[a-zA-Z0-9_-]+$"),
  ).describe("The unique name of the event trigger."),
  ObjectTypeName: z.string().min(1).max(255).regex(
    new RegExp("^[a-zA-Z_][a-zA-Z_0-9-]*$"),
  ).describe("The unique name of the object type."),
  Description: z.string().min(1).max(1000).describe(
    "The description of the event trigger.",
  ).optional(),
  EventTriggerConditions: z.array(EventTriggerConditionSchema).describe(
    "A list of conditions that determine when an event should trigger the destination.",
  ),
  EventTriggerLimits: z.object({
    EventExpiration: z.number().int().describe(
      "Specifies that an event will only trigger the destination if it is processed within a certain latency period.",
    ).optional(),
    Periods: z.array(PeriodSchema).describe(
      "A list of time periods during which the limits apply.",
    ).optional(),
  }).describe(
    "Defines limits controlling whether an event triggers the destination, based on ingestion latency and the number of invocations per profile over specific time periods.",
  ).optional(),
  SegmentFilter: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9_-]+$"))
    .describe(
      "The destination is triggered only for profiles that meet the criteria of a segment definition.",
    ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  DomainName: z.string(),
  EventTriggerName: z.string(),
  ObjectTypeName: z.string().optional(),
  Description: z.string().optional(),
  EventTriggerConditions: z.array(EventTriggerConditionSchema).optional(),
  EventTriggerLimits: z.object({
    EventExpiration: z.number(),
    Periods: z.array(PeriodSchema),
  }).optional(),
  SegmentFilter: z.string().optional(),
  CreatedAt: z.string().optional(),
  LastUpdatedAt: z.string().optional(),
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
    .describe("The unique name of the domain.").optional(),
  EventTriggerName: z.string().min(1).max(64).regex(
    new RegExp("^[a-zA-Z0-9_-]+$"),
  ).describe("The unique name of the event trigger.").optional(),
  ObjectTypeName: z.string().min(1).max(255).regex(
    new RegExp("^[a-zA-Z_][a-zA-Z_0-9-]*$"),
  ).describe("The unique name of the object type.").optional(),
  Description: z.string().min(1).max(1000).describe(
    "The description of the event trigger.",
  ).optional(),
  EventTriggerConditions: z.array(EventTriggerConditionSchema).describe(
    "A list of conditions that determine when an event should trigger the destination.",
  ).optional(),
  EventTriggerLimits: z.object({
    EventExpiration: z.number().int().describe(
      "Specifies that an event will only trigger the destination if it is processed within a certain latency period.",
    ).optional(),
    Periods: z.array(PeriodSchema).describe(
      "A list of time periods during which the limits apply.",
    ).optional(),
  }).describe(
    "Defines limits controlling whether an event triggers the destination, based on ingestion latency and the number of invocations per profile over specific time periods.",
  ).optional(),
  SegmentFilter: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9_-]+$"))
    .describe(
      "The destination is triggered only for profiles that meet the criteria of a segment definition.",
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

/** Swamp extension model for CustomerProfiles EventTrigger. Registered at `@swamp/aws/customerprofiles/event-trigger`. */
export const model = {
  type: "@swamp/aws/customerprofiles/event-trigger",
  version: "2026.06.06.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "CustomerProfiles EventTrigger resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CustomerProfiles EventTrigger",
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
          "AWS::CustomerProfiles::EventTrigger",
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
      description: "Get a CustomerProfiles EventTrigger",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CustomerProfiles EventTrigger",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::CustomerProfiles::EventTrigger",
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
      description: "Update a CustomerProfiles EventTrigger",
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
          existing.EventTriggerName?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::CustomerProfiles::EventTrigger",
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
          "AWS::CustomerProfiles::EventTrigger",
          identifier,
          currentState,
          desiredState,
          ["DomainName", "EventTriggerName"],
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
      description: "Delete a CustomerProfiles EventTrigger",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CustomerProfiles EventTrigger",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::CustomerProfiles::EventTrigger",
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
      description: "Sync CustomerProfiles EventTrigger state from AWS",
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
          existing.EventTriggerName?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::CustomerProfiles::EventTrigger",
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
