// Auto-generated extension model for @swamp/aws/arczonalshift/zonal-autoshift-configuration
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ARCZonalShift ZonalAutoshiftConfiguration (AWS::ARCZonalShift::ZonalAutoshiftConfiguration).
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

const ControlConditionSchema = z.object({
  Type: z.string().min(8).max(10).regex(new RegExp("^[a-zA-Z]*$")),
  AlarmIdentifier: z.string().min(8).max(1024).regex(new RegExp("^.*$")),
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
  ZonalAutoshiftStatus: z.enum(["ENABLED"]).optional(),
  PracticeRunConfiguration: z.object({
    BlockingAlarms: z.array(ControlConditionSchema).optional(),
    OutcomeAlarms: z.array(ControlConditionSchema),
    BlockedDates: z.array(
      z.string().min(10).max(10).regex(
        new RegExp("^[0-9]{4}-[0-9]{2}-[0-9]{2}$"),
      ),
    ).optional(),
    BlockedWindows: z.array(
      z.string().min(19).max(19).regex(
        new RegExp(
          "^(Mon|Tue|Wed|Thu|Fri|Sat|Sun):[0-9]{2}:[0-9]{2}-(Mon|Tue|Wed|Thu|Fri|Sat|Sun):[0-9]{2}:[0-9]{2}$",
        ),
      ),
    ).optional(),
  }).optional(),
  ResourceIdentifier: z.string().min(8).max(1024).optional(),
});

const StateSchema = z.object({
  ZonalAutoshiftStatus: z.string().optional(),
  PracticeRunConfiguration: z.object({
    BlockingAlarms: z.array(ControlConditionSchema),
    OutcomeAlarms: z.array(ControlConditionSchema),
    BlockedDates: z.array(z.string()),
    BlockedWindows: z.array(z.string()),
  }).optional(),
  ResourceIdentifier: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  ZonalAutoshiftStatus: z.enum(["ENABLED"]).optional(),
  PracticeRunConfiguration: z.object({
    BlockingAlarms: z.array(ControlConditionSchema).optional(),
    OutcomeAlarms: z.array(ControlConditionSchema).optional(),
    BlockedDates: z.array(
      z.string().min(10).max(10).regex(
        new RegExp("^[0-9]{4}-[0-9]{2}-[0-9]{2}$"),
      ),
    ).optional(),
    BlockedWindows: z.array(
      z.string().min(19).max(19).regex(
        new RegExp(
          "^(Mon|Tue|Wed|Thu|Fri|Sat|Sun):[0-9]{2}:[0-9]{2}-(Mon|Tue|Wed|Thu|Fri|Sat|Sun):[0-9]{2}:[0-9]{2}$",
        ),
      ),
    ).optional(),
  }).optional(),
  ResourceIdentifier: z.string().min(8).max(1024).optional(),
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

/** Swamp extension model for ARCZonalShift ZonalAutoshiftConfiguration. Registered at `@swamp/aws/arczonalshift/zonal-autoshift-configuration`. */
export const model = {
  type: "@swamp/aws/arczonalshift/zonal-autoshift-configuration",
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
      description: "ARCZonalShift ZonalAutoshiftConfiguration resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ARCZonalShift ZonalAutoshiftConfiguration",
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
          "AWS::ARCZonalShift::ZonalAutoshiftConfiguration",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.ResourceIdentifier ?? g.ResourceIdentifier)?.toString() ??
            "current").replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(
              /\0/g,
              "",
            );
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a ARCZonalShift ZonalAutoshiftConfiguration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ARCZonalShift ZonalAutoshiftConfiguration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::ARCZonalShift::ZonalAutoshiftConfiguration",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.ResourceIdentifier ?? context.globalArgs.ResourceIdentifier)
            ?.toString() ?? args.identifier).replace(/[\/\\]/g, "_").replace(
              /\.\./g,
              "_",
            ).replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a ARCZonalShift ZonalAutoshiftConfiguration",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.ResourceIdentifier?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.ResourceIdentifier?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::ARCZonalShift::ZonalAutoshiftConfiguration",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::ARCZonalShift::ZonalAutoshiftConfiguration",
          identifier,
          currentState,
          desiredState,
          ["ResourceIdentifier"],
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
      description: "Delete a ARCZonalShift ZonalAutoshiftConfiguration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ARCZonalShift ZonalAutoshiftConfiguration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::ARCZonalShift::ZonalAutoshiftConfiguration",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.ResourceIdentifier?.toString() ?? args.identifier)
            .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
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
      description:
        "Sync ARCZonalShift ZonalAutoshiftConfiguration state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.ResourceIdentifier?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.ResourceIdentifier?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::ARCZonalShift::ZonalAutoshiftConfiguration",
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
