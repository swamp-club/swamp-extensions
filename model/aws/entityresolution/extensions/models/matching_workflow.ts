// Auto-generated extension model for @swamp/aws/entityresolution/matching-workflow
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for EntityResolution MatchingWorkflow (AWS::EntityResolution::MatchingWorkflow).
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

const InputSourceSchema = z.object({
  InputSourceARN: z.string().regex(
    new RegExp("arn:(aws|aws-us-gov|aws-cn):.*:.*:[0-9]+:.*$"),
  ).describe("An Glue table ARN for the input source table"),
  SchemaArn: z.string().regex(
    new RegExp(
      "^arn:(aws|aws-us-gov|aws-cn):entityresolution:.*:[0-9]+:(schemamapping/.*)$",
    ),
  ).describe("The SchemaMapping arn associated with the Schema"),
  ApplyNormalization: z.boolean().optional(),
});

const OutputAttributeSchema = z.object({
  Name: z.string().min(0).max(255).regex(new RegExp("^[a-zA-Z_0-9- \\t]*$")),
  Hashed: z.boolean().optional(),
});

const CustomerProfilesIntegrationConfigSchema = z.object({
  DomainArn: z.string().regex(
    new RegExp(
      "^arn:(aws|aws-us-gov|aws-cn):profile:[a-z]{2}-[a-z]{1,10}-[0-9]:[0-9]{12}:(domains/[a-zA-Z_0-9-]{1,255})$",
    ),
  ).describe("The Amazon Resource Name (ARN) of the Customer Profiles domain"),
  ObjectTypeArn: z.string().regex(
    new RegExp(
      "^arn:(aws|aws-us-gov|aws-cn):profile:[a-z]{2}-[a-z]{1,10}-[0-9]:[0-9]{12}:(domains/[a-zA-Z_0-9-]{1,255}/object-types/[a-zA-Z_0-9-]{1,255})$",
    ),
  ).describe(
    "The Amazon Resource Name (ARN) of the Customer Profiles object type",
  ),
});

const OutputSourceSchema = z.object({
  OutputS3Path: z.string().regex(new RegExp("^s3://([^/]+)/?(.*?([^/]+)/?)$"))
    .describe(
      "The S3 path to which Entity Resolution will write the output table",
    ).optional(),
  Output: z.array(OutputAttributeSchema),
  KMSArn: z.string().regex(
    new RegExp("^arn:(aws|aws-us-gov|aws-cn):kms:.*:[0-9]+:.*$"),
  ).optional(),
  ApplyNormalization: z.boolean().optional(),
  CustomerProfilesIntegrationConfig: CustomerProfilesIntegrationConfigSchema
    .describe(
      "The Customer Profiles integration configuration for the output source",
    ).optional(),
});

const RuleSchema = z.object({
  RuleName: z.string().min(0).max(255).regex(
    new RegExp("^[a-zA-Z_0-9- \\t]*$"),
  ),
  MatchingKeys: z.array(
    z.string().min(0).max(255).regex(new RegExp("^[a-zA-Z_0-9- \\t]*$")),
  ),
});

const RuleBasedPropertiesSchema = z.object({
  Rules: z.array(RuleSchema),
  AttributeMatchingModel: z.enum(["ONE_TO_ONE", "MANY_TO_MANY"]),
  MatchPurpose: z.enum(["IDENTIFIER_GENERATION", "INDEXING"]).optional(),
});

const RuleConditionSchema = z.object({
  RuleName: z.string().min(0).max(255).regex(new RegExp("^[a-zA-Z_0-9- \\t]*$"))
    .optional(),
  Condition: z.string().optional(),
});

const MatchingConfigSchema = z.object({
  EnableTransitiveMatching: z.boolean().describe(
    "Enables transitive matching to process records across all rule levels and connect unmatched records to existing match groups",
  ).optional(),
});

const RuleConditionPropertiesSchema = z.object({
  Rules: z.array(RuleConditionSchema),
  MatchingConfig: MatchingConfigSchema.describe(
    "Configuration for matching behavior within rule condition properties",
  ).optional(),
});

const IntermediateSourceConfigurationSchema = z.object({
  IntermediateS3Path: z.string().describe(
    "The s3 path that would be used to stage the intermediate data being generated during workflow execution.",
  ),
});

const ProviderPropertiesSchema = z.object({
  ProviderServiceArn: z.string().describe(
    "Arn of the Provider service being used.",
  ),
  ProviderConfiguration: z.record(z.string(), z.string()).describe(
    "Additional Provider configuration that would be required for the provider service. The Configuration must be in JSON string format",
  ).optional(),
  IntermediateSourceConfiguration: IntermediateSourceConfigurationSchema
    .optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
});

const GlobalArgsSchema = z.object({
  WorkflowName: z.string().min(0).max(255).regex(new RegExp("^[a-zA-Z_0-9-]*$"))
    .describe("The name of the MatchingWorkflow"),
  Description: z.string().min(0).max(255).describe(
    "The description of the MatchingWorkflow",
  ).optional(),
  InputSourceConfig: z.array(InputSourceSchema),
  OutputSourceConfig: z.array(OutputSourceSchema),
  ResolutionTechniques: z.object({
    ResolutionType: z.enum(["RULE_MATCHING", "ML_MATCHING", "PROVIDER"])
      .optional(),
    RuleBasedProperties: RuleBasedPropertiesSchema.optional(),
    RuleConditionProperties: RuleConditionPropertiesSchema.optional(),
    ProviderProperties: ProviderPropertiesSchema.optional(),
  }),
  RoleArn: z.string().regex(
    new RegExp(
      "^arn:(aws|aws-us-gov|aws-cn):iam::\\d{12}:role/?[a-zA-Z_0-9+=,.@\\-_/]+$",
    ),
  ),
  Tags: z.array(TagSchema).optional(),
  IncrementalRunConfig: z.object({
    IncrementalRunType: z.enum(["IMMEDIATE"]),
  }).optional(),
});

const StateSchema = z.object({
  WorkflowName: z.string(),
  Description: z.string().optional(),
  InputSourceConfig: z.array(InputSourceSchema).optional(),
  OutputSourceConfig: z.array(OutputSourceSchema).optional(),
  ResolutionTechniques: z.object({
    ResolutionType: z.string(),
    RuleBasedProperties: RuleBasedPropertiesSchema,
    RuleConditionProperties: RuleConditionPropertiesSchema,
    ProviderProperties: ProviderPropertiesSchema,
  }).optional(),
  RoleArn: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  WorkflowArn: z.string().optional(),
  CreatedAt: z.string().optional(),
  UpdatedAt: z.string().optional(),
  IncrementalRunConfig: z.object({
    IncrementalRunType: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  WorkflowName: z.string().min(0).max(255).regex(new RegExp("^[a-zA-Z_0-9-]*$"))
    .describe("The name of the MatchingWorkflow").optional(),
  Description: z.string().min(0).max(255).describe(
    "The description of the MatchingWorkflow",
  ).optional(),
  InputSourceConfig: z.array(InputSourceSchema).optional(),
  OutputSourceConfig: z.array(OutputSourceSchema).optional(),
  ResolutionTechniques: z.object({
    ResolutionType: z.enum(["RULE_MATCHING", "ML_MATCHING", "PROVIDER"])
      .optional(),
    RuleBasedProperties: RuleBasedPropertiesSchema.optional(),
    RuleConditionProperties: RuleConditionPropertiesSchema.optional(),
    ProviderProperties: ProviderPropertiesSchema.optional(),
  }).optional(),
  RoleArn: z.string().regex(
    new RegExp(
      "^arn:(aws|aws-us-gov|aws-cn):iam::\\d{12}:role/?[a-zA-Z_0-9+=,.@\\-_/]+$",
    ),
  ).optional(),
  Tags: z.array(TagSchema).optional(),
  IncrementalRunConfig: z.object({
    IncrementalRunType: z.enum(["IMMEDIATE"]).optional(),
  }).optional(),
});

/** Swamp extension model for EntityResolution MatchingWorkflow. Registered at `@swamp/aws/entityresolution/matching-workflow`. */
export const model = {
  type: "@swamp/aws/entityresolution/matching-workflow",
  version: "2026.05.15.1",
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
      toVersion: "2026.05.15.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "EntityResolution MatchingWorkflow resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EntityResolution MatchingWorkflow",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::EntityResolution::MatchingWorkflow",
          desiredState,
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
      description: "Get a EntityResolution MatchingWorkflow",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EntityResolution MatchingWorkflow",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::EntityResolution::MatchingWorkflow",
          args.identifier,
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
      description: "Update a EntityResolution MatchingWorkflow",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
          "AWS::EntityResolution::MatchingWorkflow",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::EntityResolution::MatchingWorkflow",
          identifier,
          currentState,
          desiredState,
          ["WorkflowName"],
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
      description: "Delete a EntityResolution MatchingWorkflow",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EntityResolution MatchingWorkflow",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::EntityResolution::MatchingWorkflow",
          args.identifier,
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
      description: "Sync EntityResolution MatchingWorkflow state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
            "AWS::EntityResolution::MatchingWorkflow",
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
