// Auto-generated extension model for @swamp/aws/bedrock/automated-reasoning-policy
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Bedrock AutomatedReasoningPolicy (AWS::Bedrock::AutomatedReasoningPolicy).
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

const PolicyDefinitionTypeValueSchema = z.object({
  Value: z.string().min(1).max(64).regex(new RegExp("^[A-Za-z][A-Za-z0-9_]+$"))
    .describe("The value of the type value."),
  Description: z.string().max(1024).regex(new RegExp("^[\\s\\S]+$")).describe(
    "A natural language description of the type's value.",
  ).optional(),
});

const PolicyDefinitionTypeSchema = z.object({
  Name: z.string().min(1).max(64).regex(new RegExp("^[A-Za-z][A-Za-z0-9_]+$"))
    .describe("A name for this type."),
  Description: z.string().max(1024).regex(new RegExp("^[\\s\\S]+$")).describe(
    "A natural language description of this type.",
  ).optional(),
  Values: z.array(PolicyDefinitionTypeValueSchema).describe(
    "A list of valid values for this type.",
  ),
});

const PolicyDefinitionRuleSchema = z.object({
  Id: z.string().min(12).max(12).regex(new RegExp("^[A-Z][0-9A-Z]{11}$"))
    .describe("A unique id within the PolicyDefinition"),
  Expression: z.string().max(2048).regex(new RegExp("^[\\s\\S]+$")).describe(
    "The SMT expression for this rule",
  ),
  AlternateExpression: z.string().max(2048).regex(new RegExp("^[\\s\\S]+$"))
    .describe("An alternate expression for this rule").optional(),
});

const PolicyDefinitionVariableSchema = z.object({
  Name: z.string().min(1).max(64).regex(new RegExp("^[A-Za-z][A-Za-z0-9_]+$"))
    .describe("A name from this variable."),
  Type: z.string().min(1).max(64).regex(new RegExp("^[A-Za-z][A-Za-z0-9_]+$"))
    .describe("A type for this variable."),
  Description: z.string().max(1024).regex(new RegExp("^[\\s\\S]+$")).describe(
    "A natural language description of this variable.",
  ),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(new RegExp("^[a-zA-Z0-9\\s._:/=+@-]*$"))
    .describe("Tag Key"),
  Value: z.string().min(0).max(256).regex(
    new RegExp("^[a-zA-Z0-9\\s._:/=+@-]*$"),
  ).describe("Tag Value"),
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
  Name: z.string().min(1).max(256).regex(new RegExp("^[0-9a-zA-Z-_ ]+$")),
  Description: z.string().max(1024).regex(new RegExp("^[\\s\\S]+$")).optional(),
  PolicyDefinition: z.object({
    Types: z.array(PolicyDefinitionTypeSchema).describe(
      "The types definition block of an AutomatedReasoningPolicyDefinition.",
    ).optional(),
    Rules: z.array(PolicyDefinitionRuleSchema).describe(
      "The rules definition block of an AutomatedReasoningPolicyDefinition.",
    ).optional(),
    Variables: z.array(PolicyDefinitionVariableSchema).describe(
      "The variables definition block of an AutomatedReasoningPolicyDefinition.",
    ).optional(),
  }).optional(),
  KmsKeyId: z.string().min(1).max(2048).regex(
    new RegExp(
      "^(arn:aws(-[^:]+)?:kms:[a-zA-Z0-9-]*:[0-9]{12}:((key/[a-zA-Z0-9-]{36})|(alias/[a-zA-Z0-9-_/]+)))|([a-zA-Z0-9-]{36})|(alias/[a-zA-Z0-9-_/]+)$",
    ),
  ).describe(
    "The KMS key with which the Policy's assets will be encrypted at rest.",
  ).optional(),
  Tags: z.array(TagSchema).optional(),
  ForceDelete: z.boolean().describe(
    "Specifies whether to force delete the automated reasoning policy even if it has active resources. When false, Amazon Bedrock validates if all artifacts have been deleted (e.g. policy version, test case, test result) for a policy before deletion. When true, Amazon Bedrock will delete the policy and all its artifacts without validation. Default is false",
  ).optional(),
});

const StateSchema = z.object({
  Name: z.string().optional(),
  Description: z.string().optional(),
  PolicyDefinition: z.object({
    Version: z.string(),
    Types: z.array(PolicyDefinitionTypeSchema),
    Rules: z.array(PolicyDefinitionRuleSchema),
    Variables: z.array(PolicyDefinitionVariableSchema),
  }).optional(),
  PolicyArn: z.string(),
  KmsKeyId: z.string().optional(),
  KmsKeyArn: z.string().optional(),
  Version: z.string().optional(),
  DefinitionHash: z.string().optional(),
  CreatedAt: z.string().optional(),
  UpdatedAt: z.string().optional(),
  PolicyId: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  ForceDelete: z.boolean().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().min(1).max(256).regex(new RegExp("^[0-9a-zA-Z-_ ]+$"))
    .optional(),
  Description: z.string().max(1024).regex(new RegExp("^[\\s\\S]+$")).optional(),
  PolicyDefinition: z.object({
    Types: z.array(PolicyDefinitionTypeSchema).describe(
      "The types definition block of an AutomatedReasoningPolicyDefinition.",
    ).optional(),
    Rules: z.array(PolicyDefinitionRuleSchema).describe(
      "The rules definition block of an AutomatedReasoningPolicyDefinition.",
    ).optional(),
    Variables: z.array(PolicyDefinitionVariableSchema).describe(
      "The variables definition block of an AutomatedReasoningPolicyDefinition.",
    ).optional(),
  }).optional(),
  KmsKeyId: z.string().min(1).max(2048).regex(
    new RegExp(
      "^(arn:aws(-[^:]+)?:kms:[a-zA-Z0-9-]*:[0-9]{12}:((key/[a-zA-Z0-9-]{36})|(alias/[a-zA-Z0-9-_/]+)))|([a-zA-Z0-9-]{36})|(alias/[a-zA-Z0-9-_/]+)$",
    ),
  ).describe(
    "The KMS key with which the Policy's assets will be encrypted at rest.",
  ).optional(),
  Tags: z.array(TagSchema).optional(),
  ForceDelete: z.boolean().describe(
    "Specifies whether to force delete the automated reasoning policy even if it has active resources. When false, Amazon Bedrock validates if all artifacts have been deleted (e.g. policy version, test case, test result) for a policy before deletion. When true, Amazon Bedrock will delete the policy and all its artifacts without validation. Default is false",
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

/** Swamp extension model for Bedrock AutomatedReasoningPolicy. Registered at `@swamp/aws/bedrock/automated-reasoning-policy`. */
export const model = {
  type: "@swamp/aws/bedrock/automated-reasoning-policy",
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
      description: "Bedrock AutomatedReasoningPolicy resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Bedrock AutomatedReasoningPolicy",
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
          "AWS::Bedrock::AutomatedReasoningPolicy",
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
      description: "Get a Bedrock AutomatedReasoningPolicy",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Bedrock AutomatedReasoningPolicy",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Bedrock::AutomatedReasoningPolicy",
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
      description: "Update a Bedrock AutomatedReasoningPolicy",
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
        const identifier = existing.PolicyArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Bedrock::AutomatedReasoningPolicy",
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
          "AWS::Bedrock::AutomatedReasoningPolicy",
          identifier,
          currentState,
          desiredState,
          ["KmsKeyId", "ForceDelete"],
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
      description: "Delete a Bedrock AutomatedReasoningPolicy",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Bedrock AutomatedReasoningPolicy",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Bedrock::AutomatedReasoningPolicy",
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
      description: "Sync Bedrock AutomatedReasoningPolicy state from AWS",
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
        const identifier = existing.PolicyArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Bedrock::AutomatedReasoningPolicy",
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
