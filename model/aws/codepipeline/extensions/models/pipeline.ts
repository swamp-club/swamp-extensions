// Auto-generated extension model for @swamp/aws/codepipeline/pipeline
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for CodePipeline Pipeline (AWS::CodePipeline::Pipeline).
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

const EncryptionKeySchema = z.object({
  Type: z.string().describe(
    "The type of encryption key, such as an AWS KMS key. When creating or updating a pipeline, the value must be set to 'KMS'.",
  ),
  Id: z.string().describe(
    "The ID used to identify the key. For an AWS KMS key, you can use the key ID, the key ARN, or the alias ARN.",
  ),
});

const ArtifactStoreSchema = z.object({
  Type: z.enum(["S3"]).describe("The type of the artifact store, such as S3."),
  EncryptionKey: EncryptionKeySchema.describe(
    "Represents information about the key used to encrypt data in the artifact store, such as an AWS Key Management Service (AWS KMS) key",
  ).optional(),
  Location: z.string().describe(
    "The S3 bucket used for storing the artifacts for a pipeline. You can specify the name of an S3 bucket but not a folder in the bucket. A folder to contain the pipeline artifacts is created for you based on the name of the pipeline. You can use any S3 bucket in the same AWS Region as the pipeline to store your pipeline artifacts.",
  ),
});

const ArtifactStoreMapSchema = z.object({
  ArtifactStore: ArtifactStoreSchema.describe(
    "The S3 bucket where artifacts for the pipeline are stored.",
  ),
  Region: z.string().describe(
    "The action declaration's AWS Region, such as us-east-1.",
  ),
});

const StageTransitionSchema = z.object({
  StageName: z.string().describe(
    "The name of the stage where you want to disable the inbound or outbound transition of artifacts.",
  ),
  Reason: z.string().describe(
    "The reason given to the user that a stage is disabled, such as waiting for manual approval or manual tests. This message is displayed in the pipeline console UI.",
  ),
});

const BlockerDeclarationSchema = z.object({
  Name: z.string().describe("Reserved for future use."),
  Type: z.enum(["Schedule"]).describe("Reserved for future use."),
});

const ActionTypeIdSchema = z.object({
  Owner: z.string().describe(
    "The creator of the action being called. There are three valid values for the Owner field in the action category section within your pipeline structure: AWS, ThirdParty, and Custom.",
  ),
  Category: z.enum([
    "Source",
    "Build",
    "Test",
    "Deploy",
    "Invoke",
    "Approval",
    "Compute",
  ]).describe(
    "A category defines what kind of action can be taken in the stage, and constrains the provider type for the action. Valid categories are limited to one of the values below.",
  ),
  Version: z.string().describe("A string that describes the action version."),
  Provider: z.string().describe(
    "The provider of the service being called by the action. Valid providers are determined by the action category. For example, an action in the Deploy category type might have a provider of CodeDeploy, which would be specified as CodeDeploy.",
  ),
});

const InputArtifactSchema = z.object({
  Name: z.string().describe(
    'The name of the artifact to be worked on (for example, "My App").',
  ),
});

const OutputArtifactSchema = z.object({
  Name: z.string().describe(
    'The name of the output of an artifact, such as "My App".',
  ),
  Files: z.array(z.string()).describe(
    "The files that you want to associate with the output artifact that will be exported from the compute action.",
  ).optional(),
});

const EnvironmentVariableSchema = z.object({
  Name: z.string().describe("The name of the environment variable."),
  Value: z.string().describe("The value of the environment variable."),
  Type: z.enum(["PLAINTEXT", "SECRETS_MANAGER"]).describe(
    "The type of the environment variable.",
  ).optional(),
});

const ActionDeclarationSchema = z.object({
  ActionTypeId: ActionTypeIdSchema.describe(
    "Represents information about an action type.",
  ),
  Configuration: z.record(z.string(), z.unknown()).describe(
    "The action's configuration. These are key-value pairs that specify input values for an action.",
  ).optional(),
  InputArtifacts: z.array(InputArtifactSchema).optional(),
  OutputArtifacts: z.array(OutputArtifactSchema).optional(),
  Commands: z.array(z.string()).describe(
    "The shell commands to run with your compute action in CodePipeline.",
  ).optional(),
  OutputVariables: z.array(z.string()).describe(
    "The list of variables that are to be exported from the compute action.",
  ).optional(),
  EnvironmentVariables: z.array(EnvironmentVariableSchema).describe(
    "The list of environment variables that are input to a compute based action.",
  ).optional(),
  Region: z.string().describe(
    "The action declaration's AWS Region, such as us-east-1.",
  ).optional(),
  Namespace: z.string().describe(
    "The variable namespace associated with the action. All variables produced as output by this action fall under this namespace.",
  ).optional(),
  RoleArn: z.string().regex(
    new RegExp("arn:aws(-[\\w]+)*:iam::[0-9]{12}:role/.*"),
  ).describe(
    "The ARN of the IAM service role that performs the declared action. This is assumed through the roleArn for the pipeline.",
  ).optional(),
  RunOrder: z.number().int().describe("The order in which actions are run.")
    .optional(),
  Name: z.string().describe("The action declaration's name."),
  TimeoutInMinutes: z.number().int().describe(
    "A timeout duration in minutes that can be applied against the ActionType’s default timeout value specified in Quotas for AWS CodePipeline. This attribute is available only to the manual approval ActionType.",
  ).optional(),
});

const RuleTypeIdSchema = z.object({
  Owner: z.string().describe(
    "The creator of the rule being called. Only AWS is supported.",
  ).optional(),
  Category: z.string().describe(
    "A category for the provider type for the rule.",
  ).optional(),
  Version: z.string().describe("A string that describes the rule version.")
    .optional(),
  Provider: z.string().describe(
    "The provider of the service being called by the rule.",
  ).optional(),
});

const RuleDeclarationSchema = z.object({
  RuleTypeId: RuleTypeIdSchema.describe(
    "Represents information about a rule type.",
  ).optional(),
  Configuration: z.record(z.string(), z.unknown()).describe(
    "The rule's configuration. These are key-value pairs that specify input values for a rule.",
  ).optional(),
  Commands: z.array(z.string()).describe(
    "The shell commands to run with your compute action in CodePipeline.",
  ).optional(),
  InputArtifacts: z.array(InputArtifactSchema).optional(),
  Region: z.string().describe(
    "The rule declaration's AWS Region, such as us-east-1.",
  ).optional(),
  RoleArn: z.string().regex(
    new RegExp("arn:aws(-[\\w]+)*:iam::[0-9]{12}:role/.*"),
  ).describe(
    "The ARN of the IAM service role that performs the declared rule. This is assumed through the roleArn for the pipeline.",
  ).optional(),
  Name: z.string().describe("The rule declaration's name.").optional(),
});

const ConditionSchema = z.object({
  Result: z.string().describe(
    "The specified result for when the failure conditions are met, such as rolling back the stage",
  ).optional(),
  Rules: z.array(RuleDeclarationSchema).optional(),
});

const FailureConditionsSchema = z.object({
  Result: z.enum(["ROLLBACK", "RETRY"]).describe(
    "The specified result for when the failure conditions are met, such as rolling back the stage",
  ).optional(),
  RetryConfiguration: z.object({
    RetryMode: z.enum(["ALL_ACTIONS", "FAILED_ACTIONS"]).describe(
      "The specified retry mode type for the given stage. FAILED_ACTIONS will retry only the failed actions. ALL_ACTIONS will retry both failed and successful",
    ).optional(),
  }).describe(
    "The configuration that specifies the retry configuration for a stage",
  ).optional(),
  Conditions: z.array(ConditionSchema).optional(),
});

const SuccessConditionsSchema = z.object({
  Conditions: z.array(ConditionSchema).optional(),
});

const BeforeEntryConditionsSchema = z.object({
  Conditions: z.array(ConditionSchema).optional(),
});

const StageDeclarationSchema = z.object({
  Blockers: z.array(BlockerDeclarationSchema).optional(),
  Actions: z.array(ActionDeclarationSchema),
  Name: z.string().describe("The name of the stage."),
  OnFailure: FailureConditionsSchema.describe(
    "The method to use when a stage has not completed successfully",
  ).optional(),
  OnSuccess: SuccessConditionsSchema.describe(
    "The method to use when a stage has completed successfully",
  ).optional(),
  BeforeEntry: BeforeEntryConditionsSchema.describe(
    "The method to use before stage runs.",
  ).optional(),
});

const GitFilePathFilterCriteriaSchema = z.object({
  Includes: z.array(z.string()).describe(
    "The list of patterns of Git repository file paths that, when a commit is pushed, are to be included as criteria that starts the pipeline.",
  ).optional(),
  Excludes: z.array(z.string()).describe(
    "The list of patterns of Git repository file paths that, when a commit is pushed, are to be excluded from starting the pipeline.",
  ).optional(),
});

const GitBranchFilterCriteriaSchema = z.object({
  Includes: z.array(z.string()).describe(
    "The list of patterns of Git branches that, when a commit is pushed, are to be included as criteria that starts the pipeline.",
  ).optional(),
  Excludes: z.array(z.string()).describe(
    "The list of patterns of Git branches that, when a commit is pushed, are to be excluded from starting the pipeline.",
  ).optional(),
});

const GitTagFilterCriteriaSchema = z.object({
  Includes: z.array(z.string()).describe(
    "The list of patterns of Git tags that, when pushed, are to be included as criteria that starts the pipeline.",
  ).optional(),
  Excludes: z.array(z.string()).describe(
    "The list of patterns of Git tags that, when pushed, are to be excluded from starting the pipeline.",
  ).optional(),
});

const GitPushFilterSchema = z.object({
  FilePaths: GitFilePathFilterCriteriaSchema.describe(
    "The Git repository file paths specified as filter criteria to start the pipeline.",
  ).optional(),
  Branches: GitBranchFilterCriteriaSchema.describe(
    "The Git repository branches specified as filter criteria to start the pipeline.",
  ).optional(),
  Tags: GitTagFilterCriteriaSchema.describe(
    "The Git tags specified as filter criteria for whether a Git tag repository event will start the pipeline.",
  ).optional(),
});

const GitPullRequestFilterSchema = z.object({
  FilePaths: GitFilePathFilterCriteriaSchema.describe(
    "The Git repository file paths specified as filter criteria to start the pipeline.",
  ).optional(),
  Events: z.array(z.string()).describe(
    "The field that specifies which pull request events to filter on (opened, updated, closed) for the trigger configuration.",
  ).optional(),
  Branches: GitBranchFilterCriteriaSchema.describe(
    "The Git repository branches specified as filter criteria to start the pipeline.",
  ).optional(),
});

const GitConfigurationSchema = z.object({
  Push: z.array(GitPushFilterSchema).describe(
    "The field where the repository event that will start the pipeline, such as pushing Git tags, is specified with details.",
  ).optional(),
  SourceActionName: z.string().describe(
    "The name of the pipeline source action where the trigger configuration, such as Git tags, is specified. The trigger configuration will start the pipeline upon the specified change only.",
  ),
  PullRequest: z.array(GitPullRequestFilterSchema).describe(
    "The field where the repository event that will start the pipeline is specified as pull requests.",
  ).optional(),
});

const PipelineTriggerDeclarationSchema = z.object({
  GitConfiguration: GitConfigurationSchema.describe(
    "A type of trigger configuration for Git-based source actions.",
  ).optional(),
  ProviderType: z.enum(["CodeStarSourceConnection"]).describe(
    "The source provider for the event, such as connections configured for a repository with Git tags, for the specified trigger configuration.",
  ),
});

const VariableDeclarationSchema = z.object({
  DefaultValue: z.string().describe("The value of a pipeline-level variable.")
    .optional(),
  Description: z.string().describe(
    "The description of a pipeline-level variable. It's used to add additional context about the variable, and not being used at time when pipeline executes.",
  ).optional(),
  Name: z.string().describe("The name of a pipeline-level variable."),
});

const TagSchema = z.object({
  Value: z.string().describe("The tag's value."),
  Key: z.string().describe("The tag's key."),
});

const GlobalArgsSchema = z.object({
  ArtifactStores: z.array(ArtifactStoreMapSchema).describe(
    "A mapping of artifactStore objects and their corresponding AWS Regions. There must be an artifact store for the pipeline Region and for each cross-region action in the pipeline.",
  ).optional(),
  DisableInboundStageTransitions: z.array(StageTransitionSchema).describe(
    "Represents the input of a DisableStageTransition action.",
  ).optional(),
  Stages: z.array(StageDeclarationSchema).describe(
    "Represents information about a stage and its definition.",
  ),
  ExecutionMode: z.enum(["QUEUED", "SUPERSEDED", "PARALLEL"]).describe(
    "The method that the pipeline will use to handle multiple executions. The default mode is SUPERSEDED.",
  ).optional(),
  RestartExecutionOnUpdate: z.boolean().describe(
    "Indicates whether to rerun the CodePipeline pipeline after you update it.",
  ).optional(),
  Triggers: z.array(PipelineTriggerDeclarationSchema).describe(
    "The trigger configuration specifying a type of event, such as Git tags, that starts the pipeline.",
  ).optional(),
  RoleArn: z.string().regex(
    new RegExp("arn:aws(-[\\w]+)*:iam::[0-9]{12}:role/.*"),
  ).describe(
    "The Amazon Resource Name (ARN) for CodePipeline to use to either perform actions with no actionRoleArn, or to use to assume roles for actions with an actionRoleArn",
  ),
  Name: z.string().describe("The name of the pipeline.").optional(),
  Variables: z.array(VariableDeclarationSchema).describe(
    "A list that defines the pipeline variables for a pipeline resource. Variable names can have alphanumeric and underscore characters, and the values must match [A-Za-z0-9@\\-_]+.",
  ).optional(),
  ArtifactStore: z.object({
    Type: z.enum(["S3"]).describe(
      "The type of the artifact store, such as S3.",
    ),
    EncryptionKey: EncryptionKeySchema.describe(
      "Represents information about the key used to encrypt data in the artifact store, such as an AWS Key Management Service (AWS KMS) key",
    ).optional(),
    Location: z.string().describe(
      "The S3 bucket used for storing the artifacts for a pipeline. You can specify the name of an S3 bucket but not a folder in the bucket. A folder to contain the pipeline artifacts is created for you based on the name of the pipeline. You can use any S3 bucket in the same AWS Region as the pipeline to store your pipeline artifacts.",
    ),
  }).describe("The S3 bucket where artifacts for the pipeline are stored.")
    .optional(),
  PipelineType: z.enum(["V1", "V2"]).describe(
    "CodePipeline provides the following pipeline types, which differ in characteristics and price, so that you can tailor your pipeline features and cost to the needs of your applications.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "Specifies the tags applied to the pipeline.",
  ).optional(),
});

const StateSchema = z.object({
  ArtifactStores: z.array(ArtifactStoreMapSchema).optional(),
  DisableInboundStageTransitions: z.array(StageTransitionSchema).optional(),
  Stages: z.array(StageDeclarationSchema).optional(),
  ExecutionMode: z.string().optional(),
  RestartExecutionOnUpdate: z.boolean().optional(),
  Triggers: z.array(PipelineTriggerDeclarationSchema).optional(),
  RoleArn: z.string().optional(),
  Name: z.string(),
  Variables: z.array(VariableDeclarationSchema).optional(),
  Version: z.string().optional(),
  ArtifactStore: ArtifactStoreSchema.optional(),
  PipelineType: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  ArtifactStores: z.array(ArtifactStoreMapSchema).describe(
    "A mapping of artifactStore objects and their corresponding AWS Regions. There must be an artifact store for the pipeline Region and for each cross-region action in the pipeline.",
  ).optional(),
  DisableInboundStageTransitions: z.array(StageTransitionSchema).describe(
    "Represents the input of a DisableStageTransition action.",
  ).optional(),
  Stages: z.array(StageDeclarationSchema).describe(
    "Represents information about a stage and its definition.",
  ).optional(),
  ExecutionMode: z.enum(["QUEUED", "SUPERSEDED", "PARALLEL"]).describe(
    "The method that the pipeline will use to handle multiple executions. The default mode is SUPERSEDED.",
  ).optional(),
  RestartExecutionOnUpdate: z.boolean().describe(
    "Indicates whether to rerun the CodePipeline pipeline after you update it.",
  ).optional(),
  Triggers: z.array(PipelineTriggerDeclarationSchema).describe(
    "The trigger configuration specifying a type of event, such as Git tags, that starts the pipeline.",
  ).optional(),
  RoleArn: z.string().regex(
    new RegExp("arn:aws(-[\\w]+)*:iam::[0-9]{12}:role/.*"),
  ).describe(
    "The Amazon Resource Name (ARN) for CodePipeline to use to either perform actions with no actionRoleArn, or to use to assume roles for actions with an actionRoleArn",
  ).optional(),
  Name: z.string().describe("The name of the pipeline.").optional(),
  Variables: z.array(VariableDeclarationSchema).describe(
    "A list that defines the pipeline variables for a pipeline resource. Variable names can have alphanumeric and underscore characters, and the values must match [A-Za-z0-9@\\-_]+.",
  ).optional(),
  ArtifactStore: z.object({
    Type: z.enum(["S3"]).describe("The type of the artifact store, such as S3.")
      .optional(),
    EncryptionKey: EncryptionKeySchema.describe(
      "Represents information about the key used to encrypt data in the artifact store, such as an AWS Key Management Service (AWS KMS) key",
    ).optional(),
    Location: z.string().describe(
      "The S3 bucket used for storing the artifacts for a pipeline. You can specify the name of an S3 bucket but not a folder in the bucket. A folder to contain the pipeline artifacts is created for you based on the name of the pipeline. You can use any S3 bucket in the same AWS Region as the pipeline to store your pipeline artifacts.",
    ).optional(),
  }).describe("The S3 bucket where artifacts for the pipeline are stored.")
    .optional(),
  PipelineType: z.enum(["V1", "V2"]).describe(
    "CodePipeline provides the following pipeline types, which differ in characteristics and price, so that you can tailor your pipeline features and cost to the needs of your applications.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "Specifies the tags applied to the pipeline.",
  ).optional(),
});

/** Swamp extension model for CodePipeline Pipeline. Registered at `@swamp/aws/codepipeline/pipeline`. */
export const model = {
  type: "@swamp/aws/codepipeline/pipeline",
  version: "2026.05.27.1",
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
      toVersion: "2026.05.27.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "CodePipeline Pipeline resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CodePipeline Pipeline",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::CodePipeline::Pipeline",
          desiredState,
        ) as StateData;
        const instanceName = ((result.Name ?? g.Name)?.toString() ?? "current")
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
      description: "Get a CodePipeline Pipeline",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CodePipeline Pipeline",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::CodePipeline::Pipeline",
          args.identifier,
        ) as StateData;
        const instanceName =
          ((result.Name ?? context.globalArgs.Name)?.toString() ??
            args.identifier).replace(/[\/\\]/g, "_").replace(/\.\./g, "_")
            .replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a CodePipeline Pipeline",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.Name?.toString() ?? "current").replace(
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
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::CodePipeline::Pipeline",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::CodePipeline::Pipeline",
          identifier,
          currentState,
          desiredState,
          ["Name"],
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
      description: "Delete a CodePipeline Pipeline",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CodePipeline Pipeline",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::CodePipeline::Pipeline",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.Name?.toString() ?? args.identifier).replace(
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
      description: "Sync CodePipeline Pipeline state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.Name?.toString() ?? "current").replace(
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
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::CodePipeline::Pipeline",
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
