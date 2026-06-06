// Auto-generated extension model for @swamp/aws/events/event-bus-policy
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Events EventBusPolicy (AWS::Events::EventBusPolicy).
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
  EventBusName: z.string().min(1).max(256).regex(
    new RegExp("[\\.\\-_A-Za-z0-9]+"),
  ).describe(
    "The name of the event bus associated with the rule. If you omit this, the default event bus is used.",
  ).optional(),
  Condition: z.object({
    Value: z.string().describe(
      "Specifies the key for the condition. Currently the only supported key is aws:PrincipalOrgID.",
    ).optional(),
    Type: z.string().describe(
      "Specifies the type of condition. Currently the only supported value is StringEquals.",
    ).optional(),
    Key: z.string().describe(
      "Specifies the value for the key. Currently, this must be the ID of the organization.",
    ).optional(),
  }).describe(
    "This parameter enables you to limit the permission to accounts that fulfill a certain condition, such as being a member of a certain AWS organization.",
  ).optional(),
  Action: z.string().min(1).max(64).regex(new RegExp("events:[a-zA-Z]+"))
    .describe("The action that you are enabling the other account to perform.")
    .optional(),
  StatementId: z.string().min(1).max(64).regex(new RegExp("[a-zA-Z0-9-_]+"))
    .describe(
      "An identifier string for the external account that you are granting permissions to",
    ),
  Statement: z.record(z.string(), z.unknown()).describe(
    "A JSON string that describes the permission policy statement. You can include a Policy parameter in the request instead of using the StatementId, Action, Principal, or Condition parameters.",
  ).optional(),
  Principal: z.string().min(1).max(12).regex(new RegExp("(\\d{12}|\\*)"))
    .describe(
      'The 12-digit AWS account ID that you are permitting to put events to your default event bus. Specify "*" to permit any account to put events to your default event bus.',
    ).optional(),
});

const StateSchema = z.object({
  EventBusName: z.string(),
  Condition: z.object({
    Value: z.string(),
    Type: z.string(),
    Key: z.string(),
  }).optional(),
  Action: z.string().optional(),
  StatementId: z.string(),
  Statement: z.record(z.string(), z.unknown()).optional(),
  Principal: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  EventBusName: z.string().min(1).max(256).regex(
    new RegExp("[\\.\\-_A-Za-z0-9]+"),
  ).describe(
    "The name of the event bus associated with the rule. If you omit this, the default event bus is used.",
  ).optional(),
  Condition: z.object({
    Value: z.string().describe(
      "Specifies the key for the condition. Currently the only supported key is aws:PrincipalOrgID.",
    ).optional(),
    Type: z.string().describe(
      "Specifies the type of condition. Currently the only supported value is StringEquals.",
    ).optional(),
    Key: z.string().describe(
      "Specifies the value for the key. Currently, this must be the ID of the organization.",
    ).optional(),
  }).describe(
    "This parameter enables you to limit the permission to accounts that fulfill a certain condition, such as being a member of a certain AWS organization.",
  ).optional(),
  Action: z.string().min(1).max(64).regex(new RegExp("events:[a-zA-Z]+"))
    .describe("The action that you are enabling the other account to perform.")
    .optional(),
  StatementId: z.string().min(1).max(64).regex(new RegExp("[a-zA-Z0-9-_]+"))
    .describe(
      "An identifier string for the external account that you are granting permissions to",
    ).optional(),
  Statement: z.record(z.string(), z.unknown()).describe(
    "A JSON string that describes the permission policy statement. You can include a Policy parameter in the request instead of using the StatementId, Action, Principal, or Condition parameters.",
  ).optional(),
  Principal: z.string().min(1).max(12).regex(new RegExp("(\\d{12}|\\*)"))
    .describe(
      'The 12-digit AWS account ID that you are permitting to put events to your default event bus. Specify "*" to permit any account to put events to your default event bus.',
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

/** Swamp extension model for Events EventBusPolicy. Registered at `@swamp/aws/events/event-bus-policy`. */
export const model = {
  type: "@swamp/aws/events/event-bus-policy",
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
      toVersion: "2026.05.27.1",
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
      description: "Events EventBusPolicy resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Events EventBusPolicy",
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
          "AWS::Events::EventBusPolicy",
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
      description: "Get a Events EventBusPolicy",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Events EventBusPolicy",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Events::EventBusPolicy",
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
      description: "Update a Events EventBusPolicy",
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
          existing.EventBusName?.toString(),
          existing.StatementId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::Events::EventBusPolicy",
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
          "AWS::Events::EventBusPolicy",
          identifier,
          currentState,
          desiredState,
          ["EventBusName", "StatementId"],
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
      description: "Delete a Events EventBusPolicy",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Events EventBusPolicy",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Events::EventBusPolicy",
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
      description: "Sync Events EventBusPolicy state from AWS",
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
          existing.EventBusName?.toString(),
          existing.StatementId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::Events::EventBusPolicy",
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
