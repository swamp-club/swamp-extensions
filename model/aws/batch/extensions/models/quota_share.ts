// Auto-generated extension model for @swamp/aws/batch/quota-share
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Batch QuotaShare (AWS::Batch::QuotaShare).
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

const QuotaShareCapacityLimitSchema = z.object({
  MaxCapacity: z.number().int().min(1).describe(
    "The maximum capacity available for the quota share. This value represents the maximum quantity of a resource that can be allocated to jobs in the quota share without borrowing.",
  ),
  CapacityUnit: z.string().describe(
    "The unit of compute capacity for the capacityLimit. For example, `ml.m5.large`.",
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
  QuotaShareName: z.string().min(1).max(128).describe(
    "The name of the quota share. It can be up to 128 characters long. It can contain uppercase and lowercase letters, numbers, hyphens (-), and underscores (_).",
  ),
  JobQueue: z.string().describe(
    "The AWS Batch job queue associated with the quota share. This can be the job queue name or ARN. A job queue must be in the `VALID` state before you can associate it with a quota share.",
  ),
  CapacityLimits: z.array(QuotaShareCapacityLimitSchema).describe(
    "A list that specifies the quantity and type of compute capacity allocated to the quota share.",
  ),
  ResourceSharingConfiguration: z.object({
    Strategy: z.enum(["RESERVE", "LEND", "LEND_AND_BORROW"]).describe(
      "The resource sharing strategy for the quota share. The `RESERVE` strategy allows a quota share to reserve idle capacity for itself. `LEND` configures the share to lend its idle capacity to another share in need of capacity. The `LEND_AND_BORROW` strategy configures the share to borrow idle capacity from an underutilized share, as well as lend to another share.",
    ),
    BorrowLimit: z.number().int().min(-1).describe(
      "The maximum percentage of additional capacity that the quota share can borrow from other shares. `BorrowLimit` can only be applied to quota shares with a strategy of `LEND_AND_BORROW`. This value is expressed as a percentage of the quota share's configured CapacityLimits. The `BorrowLimit` is applied uniformly across all capacity units. For example, if the `BorrowLimit` is 200, the quota share can borrow up to 200% of its configured `maxCapacity` for each capacity unit. The default `BorrowLimit` is -1, which indicates unlimited borrowing.",
    ).optional(),
  }).describe(
    "Specifies whether a quota share reserves, lends, or both lends and borrows idle compute capacity.",
  ),
  PreemptionConfiguration: z.object({
    InSharePreemption: z.enum(["ENABLED", "DISABLED"]).describe(
      "Specifies whether jobs within a quota share can be preempted by another, higher priority job in the same quota share.",
    ),
  }).describe("Specifies the preemption behavior for jobs in a quota share."),
  State: z.enum(["ENABLED", "DISABLED"]).describe(
    "The state of the quota share. If the quota share is `ENABLED`, it is able to accept jobs. If the quota share is `DISABLED`, new jobs won't be accepted but jobs already submitted can finish. The default state is `ENABLED`.",
  ).optional(),
  Tags: z.record(z.string(), z.string()).describe(
    "The tags that you apply to the quota share to help you categorize and organize your resources. Each tag consists of a key and an optional value.",
  ).optional(),
});

const StateSchema = z.object({
  QuotaShareName: z.string().optional(),
  QuotaShareArn: z.string(),
  JobQueue: z.string().optional(),
  CapacityLimits: z.array(QuotaShareCapacityLimitSchema).optional(),
  ResourceSharingConfiguration: z.object({
    Strategy: z.string(),
    BorrowLimit: z.number(),
  }).optional(),
  PreemptionConfiguration: z.object({
    InSharePreemption: z.string(),
  }).optional(),
  State: z.string().optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  QuotaShareName: z.string().min(1).max(128).describe(
    "The name of the quota share. It can be up to 128 characters long. It can contain uppercase and lowercase letters, numbers, hyphens (-), and underscores (_).",
  ).optional(),
  JobQueue: z.string().describe(
    "The AWS Batch job queue associated with the quota share. This can be the job queue name or ARN. A job queue must be in the `VALID` state before you can associate it with a quota share.",
  ).optional(),
  CapacityLimits: z.array(QuotaShareCapacityLimitSchema).describe(
    "A list that specifies the quantity and type of compute capacity allocated to the quota share.",
  ).optional(),
  ResourceSharingConfiguration: z.object({
    Strategy: z.enum(["RESERVE", "LEND", "LEND_AND_BORROW"]).describe(
      "The resource sharing strategy for the quota share. The `RESERVE` strategy allows a quota share to reserve idle capacity for itself. `LEND` configures the share to lend its idle capacity to another share in need of capacity. The `LEND_AND_BORROW` strategy configures the share to borrow idle capacity from an underutilized share, as well as lend to another share.",
    ).optional(),
    BorrowLimit: z.number().int().min(-1).describe(
      "The maximum percentage of additional capacity that the quota share can borrow from other shares. `BorrowLimit` can only be applied to quota shares with a strategy of `LEND_AND_BORROW`. This value is expressed as a percentage of the quota share's configured CapacityLimits. The `BorrowLimit` is applied uniformly across all capacity units. For example, if the `BorrowLimit` is 200, the quota share can borrow up to 200% of its configured `maxCapacity` for each capacity unit. The default `BorrowLimit` is -1, which indicates unlimited borrowing.",
    ).optional(),
  }).describe(
    "Specifies whether a quota share reserves, lends, or both lends and borrows idle compute capacity.",
  ).optional(),
  PreemptionConfiguration: z.object({
    InSharePreemption: z.enum(["ENABLED", "DISABLED"]).describe(
      "Specifies whether jobs within a quota share can be preempted by another, higher priority job in the same quota share.",
    ).optional(),
  }).describe("Specifies the preemption behavior for jobs in a quota share.")
    .optional(),
  State: z.enum(["ENABLED", "DISABLED"]).describe(
    "The state of the quota share. If the quota share is `ENABLED`, it is able to accept jobs. If the quota share is `DISABLED`, new jobs won't be accepted but jobs already submitted can finish. The default state is `ENABLED`.",
  ).optional(),
  Tags: z.record(z.string(), z.string()).describe(
    "The tags that you apply to the quota share to help you categorize and organize your resources. Each tag consists of a key and an optional value.",
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

/** Swamp extension model for Batch QuotaShare. Registered at `@swamp/aws/batch/quota-share`. */
export const model = {
  type: "@swamp/aws/batch/quota-share",
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
      toVersion: "2026.04.21.1",
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
      description: "Batch QuotaShare resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Batch QuotaShare",
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
          "AWS::Batch::QuotaShare",
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
      description: "Get a Batch QuotaShare",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Batch QuotaShare",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Batch::QuotaShare",
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
      description: "Update a Batch QuotaShare",
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
        const identifier = existing.QuotaShareArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Batch::QuotaShare",
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
          "AWS::Batch::QuotaShare",
          identifier,
          currentState,
          desiredState,
          ["QuotaShareName", "JobQueue"],
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
      description: "Delete a Batch QuotaShare",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Batch QuotaShare",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Batch::QuotaShare",
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
      description: "Sync Batch QuotaShare state from AWS",
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
        const identifier = existing.QuotaShareArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Batch::QuotaShare",
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
