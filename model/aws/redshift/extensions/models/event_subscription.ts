// Auto-generated extension model for @swamp/aws/redshift/event-subscription
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Redshift EventSubscription (AWS::Redshift::EventSubscription).
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

const TagSchema = z.object({
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Key: z.string().min(1).max(128).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
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
  SourceType: z.enum([
    "cluster",
    "cluster-parameter-group",
    "cluster-security-group",
    "cluster-snapshot",
    "scheduled-action",
  ]).describe("The type of source that will be generating the events.")
    .optional(),
  EventCategories: z.array(
    z.enum([
      "configuration",
      "management",
      "monitoring",
      "security",
      "pending",
    ]),
  ).describe(
    "Specifies the Amazon Redshift event categories to be published by the event notification subscription.",
  ).optional(),
  Enabled: z.boolean().describe(
    "A boolean value; set to true to activate the subscription, and set to false to create the subscription but not activate it.",
  ).optional(),
  Severity: z.enum(["ERROR", "INFO"]).describe(
    "Specifies the Amazon Redshift event severity to be published by the event notification subscription.",
  ).optional(),
  SubscriptionName: z.string().regex(
    new RegExp("^(?=^[a-zA-Z][a-zA-Z0-9]*(-[a-zA-Z0-9]+)*$).{1,255}$"),
  ).describe("The name of the Amazon Redshift event notification subscription"),
  SourceIds: z.array(z.string()).describe(
    "A list of one or more identifiers of Amazon Redshift source objects.",
  ).optional(),
  SnsTopicArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the Amazon SNS topic used to transmit the event notifications.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  Status: z.string().optional(),
  CustSubscriptionId: z.string().optional(),
  EventCategoriesList: z.array(z.string()).optional(),
  SourceType: z.string().optional(),
  EventCategories: z.array(z.string()).optional(),
  Enabled: z.boolean().optional(),
  Severity: z.string().optional(),
  SubscriptionName: z.string(),
  SourceIds: z.array(z.string()).optional(),
  CustomerAwsId: z.string().optional(),
  SourceIdsList: z.array(z.string()).optional(),
  SnsTopicArn: z.string().optional(),
  SubscriptionCreationTime: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  SourceType: z.enum([
    "cluster",
    "cluster-parameter-group",
    "cluster-security-group",
    "cluster-snapshot",
    "scheduled-action",
  ]).describe("The type of source that will be generating the events.")
    .optional(),
  EventCategories: z.array(
    z.enum([
      "configuration",
      "management",
      "monitoring",
      "security",
      "pending",
    ]),
  ).describe(
    "Specifies the Amazon Redshift event categories to be published by the event notification subscription.",
  ).optional(),
  Enabled: z.boolean().describe(
    "A boolean value; set to true to activate the subscription, and set to false to create the subscription but not activate it.",
  ).optional(),
  Severity: z.enum(["ERROR", "INFO"]).describe(
    "Specifies the Amazon Redshift event severity to be published by the event notification subscription.",
  ).optional(),
  SubscriptionName: z.string().regex(
    new RegExp("^(?=^[a-zA-Z][a-zA-Z0-9]*(-[a-zA-Z0-9]+)*$).{1,255}$"),
  ).describe("The name of the Amazon Redshift event notification subscription")
    .optional(),
  SourceIds: z.array(z.string()).describe(
    "A list of one or more identifiers of Amazon Redshift source objects.",
  ).optional(),
  SnsTopicArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the Amazon SNS topic used to transmit the event notifications.",
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

/** Swamp extension model for Redshift EventSubscription. Registered at `@swamp/aws/redshift/event-subscription`. */
export const model = {
  type: "@swamp/aws/redshift/event-subscription",
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
      description: "Redshift EventSubscription resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Redshift EventSubscription",
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
          "AWS::Redshift::EventSubscription",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.SubscriptionName ?? g.SubscriptionName)?.toString() ??
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
      description: "Get a Redshift EventSubscription",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Redshift EventSubscription",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Redshift::EventSubscription",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.SubscriptionName ?? context.globalArgs.SubscriptionName)
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
      description: "Update a Redshift EventSubscription",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.SubscriptionName?.toString() ?? "current")
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
        const identifier = existing.SubscriptionName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Redshift::EventSubscription",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Redshift::EventSubscription",
          identifier,
          currentState,
          desiredState,
          ["SubscriptionName"],
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
      description: "Delete a Redshift EventSubscription",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Redshift EventSubscription",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Redshift::EventSubscription",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.SubscriptionName?.toString() ?? args.identifier)
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
      description: "Sync Redshift EventSubscription state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.SubscriptionName?.toString() ?? "current")
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
        const identifier = existing.SubscriptionName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Redshift::EventSubscription",
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
