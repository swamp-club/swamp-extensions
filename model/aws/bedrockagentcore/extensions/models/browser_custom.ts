// Auto-generated extension model for @swamp/aws/bedrockagentcore/browser-custom
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for BedrockAgentCore BrowserCustom (AWS::BedrockAgentCore::BrowserCustom).
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

const VpcConfigSchema = z.object({
  SecurityGroups: z.array(
    z.string().regex(new RegExp("^sg-[0-9a-zA-Z]{8,17}$")),
  ).describe("Security groups for VPC"),
  Subnets: z.array(z.string().regex(new RegExp("^subnet-[0-9a-zA-Z]{8,17}$")))
    .describe("Subnets for VPC"),
});

const S3LocationSchema = z.object({
  Bucket: z.string().regex(new RegExp("^[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$")),
  Prefix: z.string().min(1),
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

const BrowserEnterprisePolicySchema = z.object({
  Location: S3LocationSchema.describe(
    "The S3 location of the enterprise policy file.",
  ),
  Type: z.enum(["MANAGED", "RECOMMENDED"]).describe(
    "The type of browser enterprise policy.",
  ),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Name: z.string().describe("The name of the browser."),
  Description: z.string().describe("The description of the browser.")
    .optional(),
  NetworkConfiguration: z.object({
    NetworkMode: z.enum(["PUBLIC", "VPC"]).describe(
      "Network modes supported by browser",
    ),
    VpcConfig: VpcConfigSchema.describe("Network mode configuration for VPC")
      .optional(),
  }).describe("Network configuration for browser."),
  RecordingConfig: z.object({
    Enabled: z.boolean().optional(),
    S3Location: S3LocationSchema.describe("S3 Location Configuration")
      .optional(),
  }).describe("Recording configuration for browser.").optional(),
  BrowserSigning: z.object({
    Enabled: z.boolean().optional(),
  }).describe("Browser signing configuration.").optional(),
  Certificates: z.array(CertificateSchema).describe(
    "List of root CA certificates in PEM format.",
  ).optional(),
  EnterprisePolicies: z.array(BrowserEnterprisePolicySchema).describe(
    "A list of enterprise policy files for the browser.",
  ).optional(),
  ExecutionRoleArn: z.string().regex(
    new RegExp(
      "^arn:(aws(?:-cn|-us-gov|-iso(?:-[bef])?)?):iam::[0-9]{12}:role/.+$",
    ),
  ).describe(
    "The Amazon Resource Name (ARN) of the IAM role that the browser uses to access resources.",
  ).optional(),
  Tags: z.record(
    z.string(),
    z.string().min(0).max(256).regex(new RegExp("^[a-zA-Z0-9\\s._:/=+@-]*$")),
  ).describe("A map of tag keys and values").optional(),
});

const StateSchema = z.object({
  BrowserId: z.string(),
  BrowserArn: z.string().optional(),
  Name: z.string().optional(),
  Description: z.string().optional(),
  NetworkConfiguration: z.object({
    NetworkMode: z.string(),
    VpcConfig: VpcConfigSchema,
  }).optional(),
  RecordingConfig: z.object({
    Enabled: z.boolean(),
    S3Location: S3LocationSchema,
  }).optional(),
  BrowserSigning: z.object({
    Enabled: z.boolean(),
  }).optional(),
  Certificates: z.array(CertificateSchema).optional(),
  EnterprisePolicies: z.array(BrowserEnterprisePolicySchema).optional(),
  ExecutionRoleArn: z.string().optional(),
  Status: z.string().optional(),
  FailureReason: z.string().optional(),
  CreatedAt: z.string().optional(),
  LastUpdatedAt: z.string().optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Name: z.string().describe("The name of the browser.").optional(),
  Description: z.string().describe("The description of the browser.")
    .optional(),
  NetworkConfiguration: z.object({
    NetworkMode: z.enum(["PUBLIC", "VPC"]).describe(
      "Network modes supported by browser",
    ).optional(),
    VpcConfig: VpcConfigSchema.describe("Network mode configuration for VPC")
      .optional(),
  }).describe("Network configuration for browser.").optional(),
  RecordingConfig: z.object({
    Enabled: z.boolean().optional(),
    S3Location: S3LocationSchema.describe("S3 Location Configuration")
      .optional(),
  }).describe("Recording configuration for browser.").optional(),
  BrowserSigning: z.object({
    Enabled: z.boolean().optional(),
  }).describe("Browser signing configuration.").optional(),
  Certificates: z.array(CertificateSchema).describe(
    "List of root CA certificates in PEM format.",
  ).optional(),
  EnterprisePolicies: z.array(BrowserEnterprisePolicySchema).describe(
    "A list of enterprise policy files for the browser.",
  ).optional(),
  ExecutionRoleArn: z.string().regex(
    new RegExp(
      "^arn:(aws(?:-cn|-us-gov|-iso(?:-[bef])?)?):iam::[0-9]{12}:role/.+$",
    ),
  ).describe(
    "The Amazon Resource Name (ARN) of the IAM role that the browser uses to access resources.",
  ).optional(),
  Tags: z.record(
    z.string(),
    z.string().min(0).max(256).regex(new RegExp("^[a-zA-Z0-9\\s._:/=+@-]*$")),
  ).describe("A map of tag keys and values").optional(),
});

/** Swamp extension model for BedrockAgentCore BrowserCustom. Registered at `@swamp/aws/bedrockagentcore/browser-custom`. */
export const model = {
  type: "@swamp/aws/bedrockagentcore/browser-custom",
  version: "2026.05.01.1",
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
      description: "Added: Certificates, EnterprisePolicies",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "BedrockAgentCore BrowserCustom resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a BedrockAgentCore BrowserCustom",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::BedrockAgentCore::BrowserCustom",
          desiredState,
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
      description: "Get a BedrockAgentCore BrowserCustom",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the BedrockAgentCore BrowserCustom",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::BedrockAgentCore::BrowserCustom",
          args.identifier,
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
      description: "Update a BedrockAgentCore BrowserCustom",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
        const identifier = existing.BrowserId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::BedrockAgentCore::BrowserCustom",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::BedrockAgentCore::BrowserCustom",
          identifier,
          currentState,
          desiredState,
          [
            "Name",
            "Description",
            "NetworkConfiguration",
            "RecordingConfig",
            "BrowserSigning",
            "Certificates",
            "EnterprisePolicies",
            "ExecutionRoleArn",
          ],
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
      description: "Delete a BedrockAgentCore BrowserCustom",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the BedrockAgentCore BrowserCustom",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::BedrockAgentCore::BrowserCustom",
          args.identifier,
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
      description: "Sync BedrockAgentCore BrowserCustom state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
        const identifier = existing.BrowserId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::BedrockAgentCore::BrowserCustom",
            identifier,
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
