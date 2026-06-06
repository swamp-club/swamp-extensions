// Auto-generated extension model for @swamp/aws/budgets/budgets-action
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Budgets BudgetsAction (AWS::Budgets::BudgetsAction).
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

const SubscriberSchema = z.object({
  Type: z.enum(["SNS", "EMAIL"]),
  Address: z.string(),
});

const IamActionDefinitionSchema = z.object({
  PolicyArn: z.string(),
  Roles: z.array(z.string()).optional(),
  Groups: z.array(z.string()).optional(),
  Users: z.array(z.string()).optional(),
});

const ScpActionDefinitionSchema = z.object({
  PolicyId: z.string(),
  TargetIds: z.array(z.string()),
});

const SsmActionDefinitionSchema = z.object({
  Subtype: z.enum(["STOP_EC2_INSTANCES", "STOP_RDS_INSTANCES"]),
  Region: z.string(),
  InstanceIds: z.array(z.string()),
});

const ResourceTagSchema = z.object({
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
    "AWS region; overrides AWS_REGION environment variable. Defaults to us-east-1.",
  ).optional(),
  BudgetName: z.string(),
  NotificationType: z.enum(["ACTUAL", "FORECASTED"]),
  ActionType: z.enum([
    "APPLY_IAM_POLICY",
    "APPLY_SCP_POLICY",
    "RUN_SSM_DOCUMENTS",
  ]),
  ActionThreshold: z.object({
    Value: z.number(),
    Type: z.enum(["PERCENTAGE", "ABSOLUTE_VALUE"]),
  }),
  ExecutionRoleArn: z.string(),
  ApprovalModel: z.enum(["AUTOMATIC", "MANUAL"]).optional(),
  Subscribers: z.array(SubscriberSchema),
  Definition: z.object({
    IamActionDefinition: IamActionDefinitionSchema.optional(),
    ScpActionDefinition: ScpActionDefinitionSchema.optional(),
    SsmActionDefinition: SsmActionDefinitionSchema.optional(),
  }),
  ResourceTags: z.array(ResourceTagSchema).optional(),
});

const StateSchema = z.object({
  ActionId: z.string(),
  BudgetName: z.string(),
  NotificationType: z.string().optional(),
  ActionType: z.string().optional(),
  ActionThreshold: z.object({
    Value: z.number(),
    Type: z.string(),
  }).optional(),
  ExecutionRoleArn: z.string().optional(),
  ApprovalModel: z.string().optional(),
  Subscribers: z.array(SubscriberSchema).optional(),
  Definition: z.object({
    IamActionDefinition: IamActionDefinitionSchema,
    ScpActionDefinition: ScpActionDefinitionSchema,
    SsmActionDefinition: SsmActionDefinitionSchema,
  }).optional(),
  ResourceTags: z.array(ResourceTagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  BudgetName: z.string().optional(),
  NotificationType: z.enum(["ACTUAL", "FORECASTED"]).optional(),
  ActionType: z.enum([
    "APPLY_IAM_POLICY",
    "APPLY_SCP_POLICY",
    "RUN_SSM_DOCUMENTS",
  ]).optional(),
  ActionThreshold: z.object({
    Value: z.number().optional(),
    Type: z.enum(["PERCENTAGE", "ABSOLUTE_VALUE"]).optional(),
  }).optional(),
  ExecutionRoleArn: z.string().optional(),
  ApprovalModel: z.enum(["AUTOMATIC", "MANUAL"]).optional(),
  Subscribers: z.array(SubscriberSchema).optional(),
  Definition: z.object({
    IamActionDefinition: IamActionDefinitionSchema.optional(),
    ScpActionDefinition: ScpActionDefinitionSchema.optional(),
    SsmActionDefinition: SsmActionDefinitionSchema.optional(),
  }).optional(),
  ResourceTags: z.array(ResourceTagSchema).optional(),
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

/** Swamp extension model for Budgets BudgetsAction. Registered at `@swamp/aws/budgets/budgets-action`. */
export const model = {
  type: "@swamp/aws/budgets/budgets-action",
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
      description: "Budgets BudgetsAction resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Budgets BudgetsAction",
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
          "AWS::Budgets::BudgetsAction",
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
      description: "Get a Budgets BudgetsAction",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Budgets BudgetsAction",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Budgets::BudgetsAction",
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
      description: "Update a Budgets BudgetsAction",
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
          existing.ActionId?.toString(),
          existing.BudgetName?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::Budgets::BudgetsAction",
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
          "AWS::Budgets::BudgetsAction",
          identifier,
          currentState,
          desiredState,
          ["ActionType", "BudgetName"],
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
      description: "Delete a Budgets BudgetsAction",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Budgets BudgetsAction",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Budgets::BudgetsAction",
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
      description: "Sync Budgets BudgetsAction state from AWS",
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
          existing.ActionId?.toString(),
          existing.BudgetName?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::Budgets::BudgetsAction",
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
