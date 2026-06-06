// Auto-generated extension model for @swamp/aws/bedrockagentcore/code-interpreter-custom
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for BedrockAgentCore CodeInterpreterCustom (AWS::BedrockAgentCore::CodeInterpreterCustom).
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

const VpcConfigSchema = z.object({
  SecurityGroups: z.array(
    z.string().regex(new RegExp("^sg-[0-9a-zA-Z]{8,17}$")),
  ).describe("Security groups for VPC"),
  Subnets: z.array(z.string().regex(new RegExp("^subnet-[0-9a-zA-Z]{8,17}$")))
    .describe("Subnets for VPC"),
});

const CertificateLocationSchema = z.object({
  SecretArn: z.string().regex(
    new RegExp(
      "^arn:(aws(?:-cn|-us-gov|-iso(?:-[bef])?)?):secretsmanager:[a-z0-9-]+:\\d{12}:secret:[a-zA-Z0-9/_+=.@-]+$",
    ),
  ).describe("Secrets Manager secret ARN."),
});

const CertificateSchema = z.object({
  CertificateLocation: CertificateLocationSchema.describe(
    "Certificate location in Secrets Manager.",
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
  Name: z.string().describe("The name of the code interpreter."),
  Description: z.string().describe("The description of the code interpreter.")
    .optional(),
  ExecutionRoleArn: z.string().regex(
    new RegExp(
      "^arn:(aws(?:-cn|-us-gov|-iso(?:-[bef])?)?):iam::[0-9]{12}:role/.+$",
    ),
  ).describe(
    "The ARN of the IAM role that the code interpreter uses to access resources.",
  ).optional(),
  NetworkConfiguration: z.object({
    NetworkMode: z.enum(["PUBLIC", "SANDBOX", "VPC"]).describe(
      "Network modes supported by code interpreter",
    ),
    VpcConfig: VpcConfigSchema.describe("Network mode configuration for VPC")
      .optional(),
  }).describe("Network configuration for code interpreter."),
  Certificates: z.array(CertificateSchema).describe(
    "List of root CA certificates in PEM format.",
  ).optional(),
  Tags: z.record(
    z.string(),
    z.string().min(0).max(256).regex(new RegExp("^[a-zA-Z0-9\\s._:/=+@-]*$")),
  ).describe("A map of tag keys and values").optional(),
});

const StateSchema = z.object({
  CodeInterpreterId: z.string(),
  CodeInterpreterArn: z.string().optional(),
  Name: z.string().optional(),
  Description: z.string().optional(),
  ExecutionRoleArn: z.string().optional(),
  NetworkConfiguration: z.object({
    NetworkMode: z.string(),
    VpcConfig: VpcConfigSchema,
  }).optional(),
  Certificates: z.array(CertificateSchema).optional(),
  Status: z.string().optional(),
  FailureReason: z.string().optional(),
  CreatedAt: z.string().optional(),
  LastUpdatedAt: z.string().optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().describe("The name of the code interpreter.").optional(),
  Description: z.string().describe("The description of the code interpreter.")
    .optional(),
  ExecutionRoleArn: z.string().regex(
    new RegExp(
      "^arn:(aws(?:-cn|-us-gov|-iso(?:-[bef])?)?):iam::[0-9]{12}:role/.+$",
    ),
  ).describe(
    "The ARN of the IAM role that the code interpreter uses to access resources.",
  ).optional(),
  NetworkConfiguration: z.object({
    NetworkMode: z.enum(["PUBLIC", "SANDBOX", "VPC"]).describe(
      "Network modes supported by code interpreter",
    ).optional(),
    VpcConfig: VpcConfigSchema.describe("Network mode configuration for VPC")
      .optional(),
  }).describe("Network configuration for code interpreter.").optional(),
  Certificates: z.array(CertificateSchema).describe(
    "List of root CA certificates in PEM format.",
  ).optional(),
  Tags: z.record(
    z.string(),
    z.string().min(0).max(256).regex(new RegExp("^[a-zA-Z0-9\\s._:/=+@-]*$")),
  ).describe("A map of tag keys and values").optional(),
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

/** Swamp extension model for BedrockAgentCore CodeInterpreterCustom. Registered at `@swamp/aws/bedrockagentcore/code-interpreter-custom`. */
export const model = {
  type: "@swamp/aws/bedrockagentcore/code-interpreter-custom",
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
      toVersion: "2026.04.03.3",
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
      toVersion: "2026.05.01.1",
      description: "Added: Certificates",
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
      description: "BedrockAgentCore CodeInterpreterCustom resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a BedrockAgentCore CodeInterpreterCustom",
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
          "AWS::BedrockAgentCore::CodeInterpreterCustom",
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
      description: "Get a BedrockAgentCore CodeInterpreterCustom",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the BedrockAgentCore CodeInterpreterCustom",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::BedrockAgentCore::CodeInterpreterCustom",
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
      description: "Update a BedrockAgentCore CodeInterpreterCustom",
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
        const identifier = existing.CodeInterpreterId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::BedrockAgentCore::CodeInterpreterCustom",
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
          "AWS::BedrockAgentCore::CodeInterpreterCustom",
          identifier,
          currentState,
          desiredState,
          [
            "Name",
            "Description",
            "NetworkConfiguration",
            "Certificates",
            "ExecutionRoleArn",
          ],
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
      description: "Delete a BedrockAgentCore CodeInterpreterCustom",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the BedrockAgentCore CodeInterpreterCustom",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::BedrockAgentCore::CodeInterpreterCustom",
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
      description: "Sync BedrockAgentCore CodeInterpreterCustom state from AWS",
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
        const identifier = existing.CodeInterpreterId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::BedrockAgentCore::CodeInterpreterCustom",
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
