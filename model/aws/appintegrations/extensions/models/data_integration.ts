// Auto-generated extension model for @swamp/aws/appintegrations/data-integration
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for AppIntegrations DataIntegration (AWS::AppIntegrations::DataIntegration).
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
  Key: z.string().min(1).max(128).regex(
    new RegExp("^(?!aws:)[a-zA-Z+-=._:/]+$"),
  ).describe("A key to identify the tag."),
  Value: z.string().min(0).max(256).describe(
    "Corresponding tag value for the key.",
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
  Description: z.string().min(1).max(1000).describe(
    "The data integration description.",
  ).optional(),
  Name: z.string().min(1).max(255).regex(new RegExp("^[a-zA-Z0-9/\\._\\-]+$"))
    .describe("The name of the data integration."),
  KmsKey: z.string().min(1).max(255).regex(new RegExp(".*\\S.*")).describe(
    "The KMS key of the data integration.",
  ),
  ScheduleConfig: z.object({
    FirstExecutionFrom: z.string().min(1).max(255).regex(new RegExp(".*\\S.*"))
      .describe(
        "The start date for objects to import in the first flow run. Epoch or ISO timestamp format is supported.",
      ).optional(),
    Object: z.string().min(1).max(255).regex(
      new RegExp("^[a-zA-Z0-9/\\._\\-]+$"),
    ).describe("The name of the object to pull from the data source.")
      .optional(),
    ScheduleExpression: z.string().min(1).max(255).regex(new RegExp(".*\\S.*"))
      .describe("How often the data should be pulled from data source."),
  }).describe(
    "The name of the data and how often it should be pulled from the source.",
  ).optional(),
  SourceURI: z.string().min(1).max(1000).regex(
    new RegExp(
      "^(\\w+\\:\\/\\/[\\w.-]+[\\w/!@#+=.-]+$)|(\\w+\\:\\/\\/[\\w.-]+[\\w/!@#+=.-]+[\\w/!@#+=.-]+[\\w/!@#+=.,-]+$)",
    ),
  ).describe("The URI of the data source."),
  Tags: z.array(TagSchema).describe(
    "The tags (keys and values) associated with the data integration.",
  ).optional(),
  FileConfiguration: z.object({
    Folders: z.array(z.string().min(1).max(200).regex(new RegExp(".*\\S.*")))
      .describe(
        "Identifiers for the source folders to pull all files from recursively.",
      ),
    Filters: z.record(z.string(), z.array(z.string().min(1).max(255))).describe(
      "Restrictions for what files should be pulled from the source.",
    ).optional(),
  }).describe(
    "The configuration for what files should be pulled from the source.",
  ).optional(),
  ObjectConfiguration: z.record(
    z.string(),
    z.record(z.string(), z.array(z.string().min(1).max(255))),
  ).describe(
    "The configuration for what data should be pulled from the source.",
  ).optional(),
});

const StateSchema = z.object({
  Description: z.string().optional(),
  Id: z.string(),
  DataIntegrationArn: z.string().optional(),
  Name: z.string().optional(),
  KmsKey: z.string().optional(),
  ScheduleConfig: z.object({
    FirstExecutionFrom: z.string(),
    Object: z.string(),
    ScheduleExpression: z.string(),
  }).optional(),
  SourceURI: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  FileConfiguration: z.object({
    Folders: z.array(z.string()),
    Filters: z.record(z.string(), z.unknown()),
  }).optional(),
  ObjectConfiguration: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Description: z.string().min(1).max(1000).describe(
    "The data integration description.",
  ).optional(),
  Name: z.string().min(1).max(255).regex(new RegExp("^[a-zA-Z0-9/\\._\\-]+$"))
    .describe("The name of the data integration.").optional(),
  KmsKey: z.string().min(1).max(255).regex(new RegExp(".*\\S.*")).describe(
    "The KMS key of the data integration.",
  ).optional(),
  ScheduleConfig: z.object({
    FirstExecutionFrom: z.string().min(1).max(255).regex(new RegExp(".*\\S.*"))
      .describe(
        "The start date for objects to import in the first flow run. Epoch or ISO timestamp format is supported.",
      ).optional(),
    Object: z.string().min(1).max(255).regex(
      new RegExp("^[a-zA-Z0-9/\\._\\-]+$"),
    ).describe("The name of the object to pull from the data source.")
      .optional(),
    ScheduleExpression: z.string().min(1).max(255).regex(new RegExp(".*\\S.*"))
      .describe("How often the data should be pulled from data source.")
      .optional(),
  }).describe(
    "The name of the data and how often it should be pulled from the source.",
  ).optional(),
  SourceURI: z.string().min(1).max(1000).regex(
    new RegExp(
      "^(\\w+\\:\\/\\/[\\w.-]+[\\w/!@#+=.-]+$)|(\\w+\\:\\/\\/[\\w.-]+[\\w/!@#+=.-]+[\\w/!@#+=.-]+[\\w/!@#+=.,-]+$)",
    ),
  ).describe("The URI of the data source.").optional(),
  Tags: z.array(TagSchema).describe(
    "The tags (keys and values) associated with the data integration.",
  ).optional(),
  FileConfiguration: z.object({
    Folders: z.array(z.string().min(1).max(200).regex(new RegExp(".*\\S.*")))
      .describe(
        "Identifiers for the source folders to pull all files from recursively.",
      ).optional(),
    Filters: z.record(z.string(), z.array(z.string().min(1).max(255))).describe(
      "Restrictions for what files should be pulled from the source.",
    ).optional(),
  }).describe(
    "The configuration for what files should be pulled from the source.",
  ).optional(),
  ObjectConfiguration: z.record(
    z.string(),
    z.record(z.string(), z.array(z.string().min(1).max(255))),
  ).describe(
    "The configuration for what data should be pulled from the source.",
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

/** Swamp extension model for AppIntegrations DataIntegration. Registered at `@swamp/aws/appintegrations/data-integration`. */
export const model = {
  type: "@swamp/aws/appintegrations/data-integration",
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
      description: "AppIntegrations DataIntegration resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a AppIntegrations DataIntegration",
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
          "AWS::AppIntegrations::DataIntegration",
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
      description: "Get a AppIntegrations DataIntegration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AppIntegrations DataIntegration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::AppIntegrations::DataIntegration",
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
      description: "Update a AppIntegrations DataIntegration",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::AppIntegrations::DataIntegration",
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
          "AWS::AppIntegrations::DataIntegration",
          identifier,
          currentState,
          desiredState,
          ["KmsKey", "ScheduleConfig", "SourceURI"],
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
      description: "Delete a AppIntegrations DataIntegration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AppIntegrations DataIntegration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::AppIntegrations::DataIntegration",
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
      description: "Sync AppIntegrations DataIntegration state from AWS",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::AppIntegrations::DataIntegration",
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
