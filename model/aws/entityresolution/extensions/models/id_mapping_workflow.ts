// Auto-generated extension model for @swamp/aws/entityresolution/id-mapping-workflow
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for EntityResolution IdMappingWorkflow (AWS::EntityResolution::IdMappingWorkflow).
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

const IdMappingWorkflowInputSourceSchema = z.object({
  Type: z.enum(["SOURCE", "TARGET"]).optional(),
  InputSourceARN: z.string().regex(
    new RegExp(
      "^arn:(aws|aws-us-gov|aws-cn):entityresolution:[a-z]{2}-[a-z]{1,10}-[0-9]:[0-9]{12}:(idnamespace/[a-zA-Z_0-9-]{1,255})$|^arn:(aws|aws-us-gov|aws-cn):entityresolution:[a-z]{2}-[a-z]{1,10}-[0-9]:[0-9]{12}:(matchingworkflow/[a-zA-Z_0-9-]{1,255})$|^arn:(aws|aws-us-gov|aws-cn):glue:[a-z]{2}-[a-z]{1,10}-[0-9]:[0-9]{12}:(table/[a-zA-Z_0-9-]{1,255}/[a-zA-Z_0-9-]{1,255})$",
    ),
  ).describe(
    "An Glue table ARN for the input source table, MatchingWorkflow arn or IdNamespace ARN",
  ),
  SchemaArn: z.string().regex(
    new RegExp(
      "^arn:(aws|aws-us-gov|aws-cn):entityresolution:.*:[0-9]+:(schemamapping/.*)$",
    ),
  ).describe("The SchemaMapping arn associated with the Schema").optional(),
});

const RuleSchema = z.object({
  MatchingKeys: z.array(
    z.string().min(0).max(255).regex(new RegExp("^[a-zA-Z_0-9- \\t]*$")),
  ),
  RuleName: z.string().min(0).max(255).regex(
    new RegExp("^[a-zA-Z_0-9- \\t]*$"),
  ),
});

const IdMappingRuleBasedPropertiesSchema = z.object({
  AttributeMatchingModel: z.enum(["ONE_TO_ONE", "MANY_TO_MANY"]),
  RuleDefinitionType: z.enum(["SOURCE", "TARGET"]).optional(),
  Rules: z.array(RuleSchema).optional(),
  RecordMatchingModel: z.enum([
    "ONE_SOURCE_TO_ONE_TARGET",
    "MANY_SOURCE_TO_ONE_TARGET",
  ]),
});

const IntermediateSourceConfigurationSchema = z.object({
  IntermediateS3Path: z.string().describe(
    "The s3 path that would be used to stage the intermediate data being generated during workflow execution.",
  ),
});

const ProviderPropertiesSchema = z.object({
  IntermediateSourceConfiguration: IntermediateSourceConfigurationSchema
    .optional(),
  ProviderServiceArn: z.string().regex(
    new RegExp(
      "^arn:(aws|aws-us-gov|aws-cn):(entityresolution):([a-z]{2}-[a-z]{1,10}-[0-9])::providerservice/([a-zA-Z0-9_-]{1,255})/([a-zA-Z0-9_-]{1,255})$",
    ),
  ).describe("Arn of the Provider Service being used."),
  ProviderConfiguration: z.record(z.string(), z.string()).describe(
    "Additional Provider configuration that would be required for the provider service. The Configuration must be in JSON string format",
  ).optional(),
});

const IdMappingWorkflowOutputSourceSchema = z.object({
  KMSArn: z.string().regex(
    new RegExp("^arn:(aws|aws-us-gov|aws-cn):kms:.*:[0-9]+:.*$"),
  ).optional(),
  OutputS3Path: z.string().regex(new RegExp("^s3://([^/]+)/?(.*?([^/]+)/?)$"))
    .describe(
      "The S3 path to which Entity Resolution will write the output table",
    ),
});

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
  Description: z.string().min(0).max(255).describe(
    "The description of the IdMappingWorkflow",
  ).optional(),
  InputSourceConfig: z.array(IdMappingWorkflowInputSourceSchema),
  IdMappingTechniques: z.object({
    RuleBasedProperties: IdMappingRuleBasedPropertiesSchema.optional(),
    ProviderProperties: ProviderPropertiesSchema.optional(),
    IdMappingType: z.enum(["PROVIDER", "RULE_BASED"]).optional(),
    NormalizationVersion: z.string().optional(),
  }),
  WorkflowName: z.string().min(0).max(255).regex(new RegExp("^[a-zA-Z_0-9-]*$"))
    .describe("The name of the IdMappingWorkflow"),
  OutputSourceConfig: z.array(IdMappingWorkflowOutputSourceSchema).optional(),
  IdMappingIncrementalRunConfig: z.object({
    IncrementalRunType: z.enum(["ON_DEMAND"]),
  }).optional(),
  RoleArn: z.string().regex(
    new RegExp(
      "^arn:(aws|aws-us-gov|aws-cn):iam::\\d{12}:role/?[a-zA-Z_0-9+=,.@\\-_/]+$",
    ),
  ),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  Description: z.string().optional(),
  InputSourceConfig: z.array(IdMappingWorkflowInputSourceSchema).optional(),
  IdMappingTechniques: z.object({
    RuleBasedProperties: IdMappingRuleBasedPropertiesSchema,
    ProviderProperties: ProviderPropertiesSchema,
    IdMappingType: z.string(),
    NormalizationVersion: z.string(),
  }).optional(),
  WorkflowName: z.string(),
  CreatedAt: z.string().optional(),
  OutputSourceConfig: z.array(IdMappingWorkflowOutputSourceSchema).optional(),
  IdMappingIncrementalRunConfig: z.object({
    IncrementalRunType: z.string(),
  }).optional(),
  WorkflowArn: z.string().optional(),
  UpdatedAt: z.string().optional(),
  RoleArn: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Description: z.string().min(0).max(255).describe(
    "The description of the IdMappingWorkflow",
  ).optional(),
  InputSourceConfig: z.array(IdMappingWorkflowInputSourceSchema).optional(),
  IdMappingTechniques: z.object({
    RuleBasedProperties: IdMappingRuleBasedPropertiesSchema.optional(),
    ProviderProperties: ProviderPropertiesSchema.optional(),
    IdMappingType: z.enum(["PROVIDER", "RULE_BASED"]).optional(),
    NormalizationVersion: z.string().optional(),
  }).optional(),
  WorkflowName: z.string().min(0).max(255).regex(new RegExp("^[a-zA-Z_0-9-]*$"))
    .describe("The name of the IdMappingWorkflow").optional(),
  OutputSourceConfig: z.array(IdMappingWorkflowOutputSourceSchema).optional(),
  IdMappingIncrementalRunConfig: z.object({
    IncrementalRunType: z.enum(["ON_DEMAND"]).optional(),
  }).optional(),
  RoleArn: z.string().regex(
    new RegExp(
      "^arn:(aws|aws-us-gov|aws-cn):iam::\\d{12}:role/?[a-zA-Z_0-9+=,.@\\-_/]+$",
    ),
  ).optional(),
  Tags: z.array(TagSchema).optional(),
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

/** Swamp extension model for EntityResolution IdMappingWorkflow. Registered at `@swamp/aws/entityresolution/id-mapping-workflow`. */
export const model = {
  type: "@swamp/aws/entityresolution/id-mapping-workflow",
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
      description: "EntityResolution IdMappingWorkflow resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EntityResolution IdMappingWorkflow",
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
          "AWS::EntityResolution::IdMappingWorkflow",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.WorkflowName ?? g.WorkflowName)?.toString() ?? "current")
            .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a EntityResolution IdMappingWorkflow",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EntityResolution IdMappingWorkflow",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::EntityResolution::IdMappingWorkflow",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.WorkflowName ?? context.globalArgs.WorkflowName)
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
      description: "Update a EntityResolution IdMappingWorkflow",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.WorkflowName?.toString() ?? "current").replace(
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
        const identifier = existing.WorkflowName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::EntityResolution::IdMappingWorkflow",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::EntityResolution::IdMappingWorkflow",
          identifier,
          currentState,
          desiredState,
          ["WorkflowName"],
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
      description: "Delete a EntityResolution IdMappingWorkflow",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EntityResolution IdMappingWorkflow",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::EntityResolution::IdMappingWorkflow",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.WorkflowName?.toString() ?? args.identifier)
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
      description: "Sync EntityResolution IdMappingWorkflow state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.WorkflowName?.toString() ?? "current").replace(
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
        const identifier = existing.WorkflowName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::EntityResolution::IdMappingWorkflow",
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
