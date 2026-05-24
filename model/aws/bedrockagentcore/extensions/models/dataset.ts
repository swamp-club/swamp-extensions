// Auto-generated extension model for @swamp/aws/bedrockagentcore/dataset
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for BedrockAgentCore Dataset (AWS::BedrockAgentCore::Dataset).
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

const InlineExamplesSourceSchema = z.object({
  Examples: z.array(z.string()).describe(
    "Examples to add. Each example is a free-form JSON document validated against the declared schemaType.",
  ),
});

const S3SourceSchema = z.object({
  S3Uri: z.string().regex(
    new RegExp("^s3://[a-z0-9][a-z0-9.\\-]{1,61}[a-z0-9]/.{1,1024}$"),
  ).describe(
    "S3 URI of the JSONL file (e.g. s3://my-bucket/path/to/examples.jsonl).",
  ),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128),
  Value: z.string().min(0).max(256),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  DatasetName: z.string().regex(new RegExp("^[a-zA-Z][a-zA-Z0-9_]{0,47}$"))
    .describe(
      "Human-readable name for the dataset. Unique within the account (case-insensitive). Immutable after creation.",
    ),
  Description: z.string().max(200).describe("A description of the dataset.")
    .optional(),
  SchemaType: z.enum([
    "AGENTCORE_EVALUATION_PREDEFINED_V1",
    "AGENTCORE_EVALUATION_SIMULATED_V1",
  ]).describe(
    "Versioned schema type governing the structure of examples. Immutable after creation.",
  ),
  Source: z.object({
    InlineExamples: InlineExamplesSourceSchema.describe(
      "Inline examples provided directly in the request body.",
    ).optional(),
    S3Source: S3SourceSchema.describe(
      "S3 location of a JSONL file containing dataset examples.",
    ).optional(),
  }).describe(
    "Source of initial examples. Provide either inline examples or an S3 URI pointing to a JSONL file.",
  ).optional(),
  KmsKeyArn: z.string().min(1).max(2048).regex(
    new RegExp(
      "^arn:aws(|-cn|-us-gov):kms:[a-zA-Z0-9-]*:[0-9]{12}:key/[a-zA-Z0-9-]{36}$",
    ),
  ).describe("Optional AWS KMS key ARN for SSE-KMS on service S3 writes.")
    .optional(),
  Tags: z.array(TagSchema).describe("A list of tags to assign to the dataset.")
    .optional(),
});

const StateSchema = z.object({
  DatasetArn: z.string(),
  DatasetId: z.string().optional(),
  DatasetName: z.string().optional(),
  Description: z.string().optional(),
  SchemaType: z.string().optional(),
  Source: z.object({
    InlineExamples: InlineExamplesSourceSchema,
    S3Source: S3SourceSchema,
  }).optional(),
  KmsKeyArn: z.string().optional(),
  Status: z.string().optional(),
  ExampleCount: z.number().optional(),
  CreatedAt: z.string().optional(),
  UpdatedAt: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  DatasetName: z.string().regex(new RegExp("^[a-zA-Z][a-zA-Z0-9_]{0,47}$"))
    .describe(
      "Human-readable name for the dataset. Unique within the account (case-insensitive). Immutable after creation.",
    ).optional(),
  Description: z.string().max(200).describe("A description of the dataset.")
    .optional(),
  SchemaType: z.enum([
    "AGENTCORE_EVALUATION_PREDEFINED_V1",
    "AGENTCORE_EVALUATION_SIMULATED_V1",
  ]).describe(
    "Versioned schema type governing the structure of examples. Immutable after creation.",
  ).optional(),
  Source: z.object({
    InlineExamples: InlineExamplesSourceSchema.describe(
      "Inline examples provided directly in the request body.",
    ).optional(),
    S3Source: S3SourceSchema.describe(
      "S3 location of a JSONL file containing dataset examples.",
    ).optional(),
  }).describe(
    "Source of initial examples. Provide either inline examples or an S3 URI pointing to a JSONL file.",
  ).optional(),
  KmsKeyArn: z.string().min(1).max(2048).regex(
    new RegExp(
      "^arn:aws(|-cn|-us-gov):kms:[a-zA-Z0-9-]*:[0-9]{12}:key/[a-zA-Z0-9-]{36}$",
    ),
  ).describe("Optional AWS KMS key ARN for SSE-KMS on service S3 writes.")
    .optional(),
  Tags: z.array(TagSchema).describe("A list of tags to assign to the dataset.")
    .optional(),
});

/** Swamp extension model for BedrockAgentCore Dataset. Registered at `@swamp/aws/bedrockagentcore/dataset`. */
export const model = {
  type: "@swamp/aws/bedrockagentcore/dataset",
  version: "2026.05.24.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "BedrockAgentCore Dataset resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a BedrockAgentCore Dataset",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::BedrockAgentCore::Dataset",
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
      description: "Get a BedrockAgentCore Dataset",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the BedrockAgentCore Dataset",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::BedrockAgentCore::Dataset",
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
      description: "Update a BedrockAgentCore Dataset",
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
        const identifier = existing.DatasetArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::BedrockAgentCore::Dataset",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::BedrockAgentCore::Dataset",
          identifier,
          currentState,
          desiredState,
          ["DatasetName", "SchemaType", "KmsKeyArn", "Source"],
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
      description: "Delete a BedrockAgentCore Dataset",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the BedrockAgentCore Dataset",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::BedrockAgentCore::Dataset",
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
      description: "Sync BedrockAgentCore Dataset state from AWS",
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
        const identifier = existing.DatasetArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::BedrockAgentCore::Dataset",
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
