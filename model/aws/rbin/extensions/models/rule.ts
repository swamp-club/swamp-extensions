// Auto-generated extension model for @swamp/aws/rbin/rule
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Rbin Rule (AWS::Rbin::Rule).
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

const ResourceTagSchema = z.object({
  ResourceTagKey: z.string().min(1).max(128).describe(
    "The tag key of the resource.",
  ),
  ResourceTagValue: z.string().min(0).max(256).describe(
    "The tag value of the resource",
  ),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe("A unique identifier for the tag."),
  Value: z.string().min(0).max(256).describe(
    "String which you can use to describe or define the tag.",
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
  Description: z.string().max(255).describe(
    "The description of the retention rule.",
  ).optional(),
  ResourceTags: z.array(ResourceTagSchema).describe(
    "Information about the resource tags used to identify resources that are retained by the retention rule.",
  ).optional(),
  ExcludeResourceTags: z.array(ResourceTagSchema).describe(
    "Information about the exclude resource tags used to identify resources that are excluded by the retention rule.",
  ).optional(),
  ResourceType: z.enum(["EBS_SNAPSHOT", "EC2_IMAGE", "EBS_VOLUME"]).describe(
    "The resource type retained by the retention rule.",
  ),
  Tags: z.array(TagSchema).describe(
    "Information about the tags assigned to the retention rule.",
  ).optional(),
  RetentionPeriod: z.object({
    RetentionPeriodValue: z.number().int().min(1).max(3650).describe(
      "The retention period value of the rule.",
    ),
    RetentionPeriodUnit: z.enum(["DAYS"]).describe(
      "The retention period unit of the rule",
    ),
  }).describe(
    "Information about the retention period for which the retention rule is to retain resources.",
  ),
  Status: z.string().regex(new RegExp("pending|available")).describe(
    "The state of the retention rule. Only retention rules that are in the available state retain resources.",
  ).optional(),
  LockConfiguration: z.object({
    UnlockDelayValue: z.number().int().min(7).max(30).describe(
      "The unlock delay period, measured in the unit specified for UnlockDelayUnit.",
    ).optional(),
    UnlockDelayUnit: z.enum(["DAYS"]).describe(
      "The unit of time in which to measure the unlock delay. Currently, the unlock delay can be measure only in days.",
    ).optional(),
  }).describe("Information about the retention rule lock configuration.")
    .optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  Identifier: z.string().optional(),
  Description: z.string().optional(),
  ResourceTags: z.array(ResourceTagSchema).optional(),
  ExcludeResourceTags: z.array(ResourceTagSchema).optional(),
  ResourceType: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  RetentionPeriod: z.object({
    RetentionPeriodValue: z.number(),
    RetentionPeriodUnit: z.string(),
  }).optional(),
  Status: z.string().optional(),
  LockConfiguration: z.object({
    UnlockDelayValue: z.number(),
    UnlockDelayUnit: z.string(),
  }).optional(),
  LockState: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Description: z.string().max(255).describe(
    "The description of the retention rule.",
  ).optional(),
  ResourceTags: z.array(ResourceTagSchema).describe(
    "Information about the resource tags used to identify resources that are retained by the retention rule.",
  ).optional(),
  ExcludeResourceTags: z.array(ResourceTagSchema).describe(
    "Information about the exclude resource tags used to identify resources that are excluded by the retention rule.",
  ).optional(),
  ResourceType: z.enum(["EBS_SNAPSHOT", "EC2_IMAGE", "EBS_VOLUME"]).describe(
    "The resource type retained by the retention rule.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "Information about the tags assigned to the retention rule.",
  ).optional(),
  RetentionPeriod: z.object({
    RetentionPeriodValue: z.number().int().min(1).max(3650).describe(
      "The retention period value of the rule.",
    ).optional(),
    RetentionPeriodUnit: z.enum(["DAYS"]).describe(
      "The retention period unit of the rule",
    ).optional(),
  }).describe(
    "Information about the retention period for which the retention rule is to retain resources.",
  ).optional(),
  Status: z.string().regex(new RegExp("pending|available")).describe(
    "The state of the retention rule. Only retention rules that are in the available state retain resources.",
  ).optional(),
  LockConfiguration: z.object({
    UnlockDelayValue: z.number().int().min(7).max(30).describe(
      "The unlock delay period, measured in the unit specified for UnlockDelayUnit.",
    ).optional(),
    UnlockDelayUnit: z.enum(["DAYS"]).describe(
      "The unit of time in which to measure the unlock delay. Currently, the unlock delay can be measure only in days.",
    ).optional(),
  }).describe("Information about the retention rule lock configuration.")
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

/** Swamp extension model for Rbin Rule. Registered at `@swamp/aws/rbin/rule`. */
export const model = {
  type: "@swamp/aws/rbin/rule",
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
      description: "Rbin Rule resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Rbin Rule",
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
          "AWS::Rbin::Rule",
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
      description: "Get a Rbin Rule",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Rbin Rule",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Rbin::Rule",
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
      description: "Update a Rbin Rule",
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
          "AWS::Rbin::Rule",
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
          "AWS::Rbin::Rule",
          identifier,
          currentState,
          desiredState,
          ["ResourceType"],
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
      description: "Delete a Rbin Rule",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Rbin Rule",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Rbin::Rule",
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
      description: "Sync Rbin Rule state from AWS",
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
            "AWS::Rbin::Rule",
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
