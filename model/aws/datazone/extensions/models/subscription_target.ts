// Auto-generated extension model for @swamp/aws/datazone/subscription-target
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for DataZone SubscriptionTarget (AWS::DataZone::SubscriptionTarget).
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

const SubscriptionTargetFormSchema = z.object({
  FormName: z.string().min(1).max(128).regex(
    new RegExp("^(?![0-9_])\\w+$|^_\\w*[a-zA-Z0-9]\\w*$"),
  ).describe(
    "The form name included in the subscription target configuration.",
  ),
  Content: z.string().describe(
    "The content of the subscription target configuration.",
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
  ApplicableAssetTypes: z.array(
    z.string().min(1).max(256).regex(new RegExp("^[^\\.]*")),
  ).describe(
    "The asset types that can be included in the subscription target.",
  ),
  AuthorizedPrincipals: z.array(
    z.string().regex(new RegExp("^[a-zA-Z0-9:/_-]*$")),
  ).describe("The authorized principals of the subscription target."),
  DomainIdentifier: z.string().regex(new RegExp("^dzd[-_][a-zA-Z0-9_-]{1,36}$"))
    .describe(
      "The ID of the Amazon DataZone domain in which subscription target would be created.",
    ),
  EnvironmentIdentifier: z.string().regex(new RegExp("^[a-zA-Z0-9_-]{1,36}$"))
    .describe(
      "The ID of the environment in which subscription target would be created.",
    ),
  ManageAccessRole: z.string().describe(
    "The manage access role that is used to create the subscription target.",
  ).optional(),
  Name: z.string().min(1).max(256).describe(
    "The name of the subscription target.",
  ),
  Provider: z.string().describe("The provider of the subscription target.")
    .optional(),
  SubscriptionTargetConfig: z.array(SubscriptionTargetFormSchema).describe(
    "The configuration of the subscription target.",
  ),
  Type: z.string().describe("The type of the subscription target."),
});

const StateSchema = z.object({
  ApplicableAssetTypes: z.array(z.string()).optional(),
  AuthorizedPrincipals: z.array(z.string()).optional(),
  CreatedAt: z.string().optional(),
  CreatedBy: z.string().optional(),
  DomainId: z.string(),
  DomainIdentifier: z.string().optional(),
  EnvironmentId: z.string(),
  EnvironmentIdentifier: z.string().optional(),
  Id: z.string(),
  ManageAccessRole: z.string().optional(),
  Name: z.string().optional(),
  ProjectId: z.string().optional(),
  Provider: z.string().optional(),
  SubscriptionTargetConfig: z.array(SubscriptionTargetFormSchema).optional(),
  Type: z.string().optional(),
  UpdatedAt: z.string().optional(),
  UpdatedBy: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  ApplicableAssetTypes: z.array(
    z.string().min(1).max(256).regex(new RegExp("^[^\\.]*")),
  ).describe("The asset types that can be included in the subscription target.")
    .optional(),
  AuthorizedPrincipals: z.array(
    z.string().regex(new RegExp("^[a-zA-Z0-9:/_-]*$")),
  ).describe("The authorized principals of the subscription target.")
    .optional(),
  DomainIdentifier: z.string().regex(new RegExp("^dzd[-_][a-zA-Z0-9_-]{1,36}$"))
    .describe(
      "The ID of the Amazon DataZone domain in which subscription target would be created.",
    ).optional(),
  EnvironmentIdentifier: z.string().regex(new RegExp("^[a-zA-Z0-9_-]{1,36}$"))
    .describe(
      "The ID of the environment in which subscription target would be created.",
    ).optional(),
  ManageAccessRole: z.string().describe(
    "The manage access role that is used to create the subscription target.",
  ).optional(),
  Name: z.string().min(1).max(256).describe(
    "The name of the subscription target.",
  ).optional(),
  Provider: z.string().describe("The provider of the subscription target.")
    .optional(),
  SubscriptionTargetConfig: z.array(SubscriptionTargetFormSchema).describe(
    "The configuration of the subscription target.",
  ).optional(),
  Type: z.string().describe("The type of the subscription target.").optional(),
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

/** Swamp extension model for DataZone SubscriptionTarget. Registered at `@swamp/aws/datazone/subscription-target`. */
export const model = {
  type: "@swamp/aws/datazone/subscription-target",
  version: "2026.06.06.1",
  upgrades: [
    {
      toVersion: "2026.04.01.2",
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
      description: "DataZone SubscriptionTarget resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a DataZone SubscriptionTarget",
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
          "AWS::DataZone::SubscriptionTarget",
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
      description: "Get a DataZone SubscriptionTarget",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DataZone SubscriptionTarget",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::DataZone::SubscriptionTarget",
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
      description: "Update a DataZone SubscriptionTarget",
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
          existing.DomainId?.toString(),
          existing.EnvironmentId?.toString(),
          existing.Id?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::DataZone::SubscriptionTarget",
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
          "AWS::DataZone::SubscriptionTarget",
          identifier,
          currentState,
          desiredState,
          ["Type", "DomainIdentifier", "EnvironmentIdentifier"],
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
      description: "Delete a DataZone SubscriptionTarget",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DataZone SubscriptionTarget",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::DataZone::SubscriptionTarget",
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
      description: "Sync DataZone SubscriptionTarget state from AWS",
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
          existing.DomainId?.toString(),
          existing.EnvironmentId?.toString(),
          existing.Id?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::DataZone::SubscriptionTarget",
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
