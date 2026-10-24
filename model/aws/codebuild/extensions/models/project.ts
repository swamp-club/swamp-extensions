// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/aws/codebuild/project
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for CodeBuild Project (AWS::CodeBuild::Project).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, sync, and list can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";

const SourceAuthSchema = z.object({
  Resource: z.string().optional(),
  Type: z.string(),
});

const BuildStatusConfigSchema = z.object({
  Context: z.string().optional(),
  TargetUrl: z.string().optional(),
});

const GitSubmodulesConfigSchema = z.object({
  FetchSubmodules: z.boolean(),
});

const SourceSchema = z.object({
  Auth: SourceAuthSchema.optional(),
  BuildSpec: z.string().optional(),
  BuildStatusConfig: BuildStatusConfigSchema.optional(),
  GitCloneDepth: z.number().int().optional(),
  GitSubmodulesConfig: GitSubmodulesConfigSchema.optional(),
  InsecureSsl: z.boolean().optional(),
  Location: z.string().optional(),
  ReportBuildStatus: z.boolean().optional(),
  SourceIdentifier: z.string().optional(),
  Type: z.string(),
});

const ArtifactsSchema = z.object({
  ArtifactIdentifier: z.string().describe(
    "An identifier for this artifact definition.",
  ).optional(),
  EncryptionDisabled: z.boolean().describe(
    "Set to true if you do not want your output artifacts encrypted. This option is valid only if your artifacts type is Amazon Simple Storage Service (Amazon S3). If this is set with another artifacts type, an `invalidInputException` is thrown.",
  ).optional(),
  Location: z.string().describe(
    "Information about the build output artifact location: * If `type` is set to `CODEPIPELINE`, AWS CodePipeline ignores this value if specified. This is because CodePipeline manages its build output locations instead of CodeBuild. * If `type` is set to `NO_ARTIFACTS`, this value is ignored if specified, because no build output is produced. * If `type` is set to `S3`, this is the name of the output bucket. If you specify `CODEPIPELINE` or `NO_ARTIFACTS` for the `Type` property, don't specify this property. For all of the other types, you must specify this property.",
  ).optional(),
  Name: z.string().optional(),
  NamespaceType: z.string().optional(),
  OverrideArtifactName: z.boolean().optional(),
  Packaging: z.string().optional(),
  Path: z.string().optional(),
  Type: z.string().describe(
    "The type of build output artifact. Valid values include: * `CODEPIPELINE`: The build project has build output generated through CodePipeline. The `CODEPIPELINE` type is not supported for `secondaryArtifacts`. * `NO_ARTIFACTS`: The build project does not produce any build output. * `S3`: The build project stores build output in Amazon S3.",
  ),
});

const CloudWatchLogsConfigSchema = z.object({
  GroupName: z.string().optional(),
  Status: z.string(),
  StreamName: z.string().optional(),
});

const S3LogsConfigSchema = z.object({
  EncryptionDisabled: z.boolean().optional(),
  Location: z.string().optional(),
  Status: z.string(),
});

const ProjectSourceVersionSchema = z.object({
  SourceIdentifier: z.string(),
  SourceVersion: z.string().optional(),
});

const TagSchema = z.object({
  Value: z.string(),
  Key: z.string(),
});

const WebhookFilterSchema = z.object({
  Type: z.string(),
  Pattern: z.string(),
  ExcludeMatchedPattern: z.boolean().optional(),
});

const ScopeConfigurationSchema = z.object({
  Domain: z.string().describe(
    "The domain of the GitHub Enterprise organization or the GitLab Self Managed group. Note that this parameter is only required if your project's source type is GITHUB_ENTERPRISE or GITLAB_SELF_MANAGED.",
  ).optional(),
  Name: z.string().describe(
    "The name of either the enterprise or organization that will send webhook events to CodeBuild, depending on if the webhook is a global or organization webhook respectively.",
  ),
  Scope: z.string().describe(
    "The type of scope for a GitHub or GitLab webhook. The scope default is GITHUB_ORGANIZATION. Allowed values: GITHUB_ORGANIZATION | GITHUB_GLOBAL | GITLAB_GROUP",
  ).optional(),
});

const PullRequestBuildPolicySchema = z.object({
  RequiresCommentApproval: z.string(),
  ApproverRoles: z.array(z.string()).optional(),
});

const ProjectFileSystemLocationSchema = z.object({
  Identifier: z.string(),
  MountOptions: z.string().optional(),
  MountPoint: z.string(),
  Location: z.string(),
  Type: z.string(),
});

const EnvironmentVariableSchema = z.object({
  Value: z.string(),
  Type: z.string().optional(),
  Name: z.string(),
});

const ProjectFleetSchema = z.object({
  FleetArn: z.string().optional(),
});

const RegistryCredentialSchema = z.object({
  Credential: z.string(),
  CredentialProvider: z.string(),
});

const DockerServerSchema = z.object({
  ComputeType: z.string().describe(
    "Information about the compute resources the docker server uses. Valid Values: BUILD_GENERAL1_SMALL | BUILD_GENERAL1_MEDIUM | BUILD_GENERAL1_LARGE | BUILD_GENERAL1_XLARGE | BUILD_GENERAL1_2XLARGE | BUILD_LAMBDA_1GB | BUILD_LAMBDA_2GB | BUILD_LAMBDA_4GB | BUILD_LAMBDA_8GB | BUILD_LAMBDA_10GB | ATTRIBUTE_BASED_COMPUTE | CUSTOM_INSTANCE_TYPE",
  ),
  SecurityGroupIds: z.array(z.string()).describe(
    "A list of one or more security groups IDs.",
  ).optional(),
});

const BatchRestrictionsSchema = z.object({
  ComputeTypesAllowed: z.array(z.string()).optional(),
  FleetsAllowed: z.array(z.string()).optional(),
  MaximumBuildsAllowed: z.number().int().optional(),
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
    "AWS region; overrides AWS_REGION / AWS_DEFAULT_REGION environment variables and ~/.aws/config profile region. Defaults to us-east-1.",
  ).optional(),
  Description: z.string().describe(
    "A description that makes the build project easy to identify.",
  ).optional(),
  ResourceAccessRole: z.string().optional(),
  VpcConfig: z.object({
    SecurityGroupIds: z.array(z.string()).optional(),
    Subnets: z.array(z.string()).optional(),
    VpcId: z.string().optional(),
  }).optional(),
  SecondarySources: z.array(SourceSchema).optional(),
  EncryptionKey: z.string().optional(),
  SecondaryArtifacts: z.array(ArtifactsSchema).optional(),
  Source: z.object({
    Auth: SourceAuthSchema.optional(),
    BuildSpec: z.string().optional(),
    BuildStatusConfig: BuildStatusConfigSchema.optional(),
    GitCloneDepth: z.number().int().optional(),
    GitSubmodulesConfig: GitSubmodulesConfigSchema.optional(),
    InsecureSsl: z.boolean().optional(),
    Location: z.string().optional(),
    ReportBuildStatus: z.boolean().optional(),
    SourceIdentifier: z.string().optional(),
    Type: z.string(),
  }),
  Name: z.string().optional(),
  LogsConfig: z.object({
    CloudWatchLogs: CloudWatchLogsConfigSchema.optional(),
    S3Logs: S3LogsConfigSchema.optional(),
  }).optional(),
  ServiceRole: z.string(),
  QueuedTimeoutInMinutes: z.number().int().optional(),
  SecondarySourceVersions: z.array(ProjectSourceVersionSchema).optional(),
  Tags: z.array(TagSchema).optional(),
  SourceVersion: z.string().optional(),
  Triggers: z.object({
    BuildType: z.string().optional(),
    FilterGroups: z.array(z.array(WebhookFilterSchema)).optional(),
    Webhook: z.boolean().optional(),
    ScopeConfiguration: ScopeConfigurationSchema.optional(),
    PullRequestBuildPolicy: PullRequestBuildPolicySchema.optional(),
  }).optional(),
  Artifacts: z.object({
    ArtifactIdentifier: z.string().describe(
      "An identifier for this artifact definition.",
    ).optional(),
    EncryptionDisabled: z.boolean().describe(
      "Set to true if you do not want your output artifacts encrypted. This option is valid only if your artifacts type is Amazon Simple Storage Service (Amazon S3). If this is set with another artifacts type, an `invalidInputException` is thrown.",
    ).optional(),
    Location: z.string().describe(
      "Information about the build output artifact location: * If `type` is set to `CODEPIPELINE`, AWS CodePipeline ignores this value if specified. This is because CodePipeline manages its build output locations instead of CodeBuild. * If `type` is set to `NO_ARTIFACTS`, this value is ignored if specified, because no build output is produced. * If `type` is set to `S3`, this is the name of the output bucket. If you specify `CODEPIPELINE` or `NO_ARTIFACTS` for the `Type` property, don't specify this property. For all of the other types, you must specify this property.",
    ).optional(),
    Name: z.string().optional(),
    NamespaceType: z.string().optional(),
    OverrideArtifactName: z.boolean().optional(),
    Packaging: z.string().optional(),
    Path: z.string().optional(),
    Type: z.string().describe(
      "The type of build output artifact. Valid values include: * `CODEPIPELINE`: The build project has build output generated through CodePipeline. The `CODEPIPELINE` type is not supported for `secondaryArtifacts`. * `NO_ARTIFACTS`: The build project does not produce any build output. * `S3`: The build project stores build output in Amazon S3.",
    ),
  }).describe(
    "Specifies output settings for artifacts generated by an AWS CodeBuild build.",
  ),
  BadgeEnabled: z.boolean().describe(
    "Indicates whether AWS CodeBuild generates a publicly accessible URL for your project's build badge.",
  ).optional(),
  FileSystemLocations: z.array(ProjectFileSystemLocationSchema).optional(),
  Environment: z.object({
    Type: z.string(),
    EnvironmentVariables: z.array(EnvironmentVariableSchema).optional(),
    Fleet: ProjectFleetSchema.optional(),
    PrivilegedMode: z.boolean().optional(),
    ImagePullCredentialsType: z.string().optional(),
    Image: z.string(),
    RegistryCredential: RegistryCredentialSchema.optional(),
    ComputeType: z.string(),
    Certificate: z.string().optional(),
    DockerServer: DockerServerSchema.describe(
      "Contains docker server information.",
    ).optional(),
    HostKernel: z.string().describe(
      "The kernel version of the host operating system for the build environment. Allowed values: LINUX_KERNEL_4 | LINUX_KERNEL_6 | LINUX_KERNEL_LATEST",
    ).optional(),
  }),
  ConcurrentBuildLimit: z.number().int().describe(
    "The maximum number of concurrent builds that are allowed for this project.",
  ).optional(),
  Visibility: z.string().optional(),
  BuildBatchConfig: z.object({
    CombineArtifacts: z.boolean().optional(),
    ServiceRole: z.string().optional(),
    BatchReportMode: z.string().optional(),
    TimeoutInMins: z.number().int().optional(),
    Restrictions: BatchRestrictionsSchema.optional(),
  }).describe("Defines the batch build options for the project.").optional(),
  TimeoutInMinutes: z.number().int().optional(),
  Cache: z.object({
    Modes: z.array(z.string()).optional(),
    Type: z.string().describe(
      "The type of cache used by the build project. Allowed values: NO_CACHE | S3 | LOCAL.",
    ),
    Location: z.string().optional(),
    CacheNamespace: z.string().describe(
      "Defines the scope of the cache. You can use this namespace to share a cache across multiple projects.",
    ).optional(),
  }).describe(
    "Settings that AWS CodeBuild uses to store and reuse build dependencies.",
  ).optional(),
  AutoRetryLimit: z.number().int().optional(),
});

const StateSchema = z.object({
  Description: z.string().optional(),
  ResourceAccessRole: z.string().optional(),
  VpcConfig: z.object({
    SecurityGroupIds: z.array(z.string()),
    Subnets: z.array(z.string()),
    VpcId: z.string(),
  }).optional(),
  SecondarySources: z.array(SourceSchema).optional(),
  EncryptionKey: z.string().optional(),
  SecondaryArtifacts: z.array(ArtifactsSchema).optional(),
  Source: SourceSchema.optional(),
  Name: z.string(),
  LogsConfig: z.object({
    CloudWatchLogs: CloudWatchLogsConfigSchema,
    S3Logs: S3LogsConfigSchema,
  }).optional(),
  ServiceRole: z.string().optional(),
  QueuedTimeoutInMinutes: z.number().optional(),
  SecondarySourceVersions: z.array(ProjectSourceVersionSchema).optional(),
  Tags: z.array(TagSchema).optional(),
  SourceVersion: z.string().optional(),
  Triggers: z.object({
    BuildType: z.string(),
    FilterGroups: z.array(z.array(WebhookFilterSchema)),
    Webhook: z.boolean(),
    ScopeConfiguration: ScopeConfigurationSchema,
    PullRequestBuildPolicy: PullRequestBuildPolicySchema,
  }).optional(),
  Artifacts: ArtifactsSchema.optional(),
  BadgeEnabled: z.boolean().optional(),
  FileSystemLocations: z.array(ProjectFileSystemLocationSchema).optional(),
  Environment: z.object({
    Type: z.string(),
    EnvironmentVariables: z.array(EnvironmentVariableSchema),
    Fleet: ProjectFleetSchema,
    PrivilegedMode: z.boolean(),
    ImagePullCredentialsType: z.string(),
    Image: z.string(),
    RegistryCredential: RegistryCredentialSchema,
    ComputeType: z.string(),
    Certificate: z.string(),
    DockerServer: DockerServerSchema,
    HostKernel: z.string(),
  }).optional(),
  ConcurrentBuildLimit: z.number().optional(),
  Visibility: z.string().optional(),
  Arn: z.string().optional(),
  BuildBatchConfig: z.object({
    CombineArtifacts: z.boolean(),
    ServiceRole: z.string(),
    BatchReportMode: z.string(),
    TimeoutInMins: z.number(),
    Restrictions: BatchRestrictionsSchema,
  }).optional(),
  TimeoutInMinutes: z.number().optional(),
  Cache: z.object({
    Modes: z.array(z.string()),
    Type: z.string(),
    Location: z.string(),
    CacheNamespace: z.string(),
  }).optional(),
  AutoRetryLimit: z.number().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Description: z.string().describe(
    "A description that makes the build project easy to identify.",
  ).optional(),
  ResourceAccessRole: z.string().optional(),
  VpcConfig: z.object({
    SecurityGroupIds: z.array(z.string()).optional(),
    Subnets: z.array(z.string()).optional(),
    VpcId: z.string().optional(),
  }).optional(),
  SecondarySources: z.array(SourceSchema).optional(),
  EncryptionKey: z.string().optional(),
  SecondaryArtifacts: z.array(ArtifactsSchema).optional(),
  Source: z.object({
    Auth: SourceAuthSchema.optional(),
    BuildSpec: z.string().optional(),
    BuildStatusConfig: BuildStatusConfigSchema.optional(),
    GitCloneDepth: z.number().int().optional(),
    GitSubmodulesConfig: GitSubmodulesConfigSchema.optional(),
    InsecureSsl: z.boolean().optional(),
    Location: z.string().optional(),
    ReportBuildStatus: z.boolean().optional(),
    SourceIdentifier: z.string().optional(),
    Type: z.string().optional(),
  }).optional(),
  Name: z.string().optional(),
  LogsConfig: z.object({
    CloudWatchLogs: CloudWatchLogsConfigSchema.optional(),
    S3Logs: S3LogsConfigSchema.optional(),
  }).optional(),
  ServiceRole: z.string().optional(),
  QueuedTimeoutInMinutes: z.number().int().optional(),
  SecondarySourceVersions: z.array(ProjectSourceVersionSchema).optional(),
  Tags: z.array(TagSchema).optional(),
  SourceVersion: z.string().optional(),
  Triggers: z.object({
    BuildType: z.string().optional(),
    FilterGroups: z.array(z.array(WebhookFilterSchema)).optional(),
    Webhook: z.boolean().optional(),
    ScopeConfiguration: ScopeConfigurationSchema.optional(),
    PullRequestBuildPolicy: PullRequestBuildPolicySchema.optional(),
  }).optional(),
  Artifacts: z.object({
    ArtifactIdentifier: z.string().describe(
      "An identifier for this artifact definition.",
    ).optional(),
    EncryptionDisabled: z.boolean().describe(
      "Set to true if you do not want your output artifacts encrypted. This option is valid only if your artifacts type is Amazon Simple Storage Service (Amazon S3). If this is set with another artifacts type, an `invalidInputException` is thrown.",
    ).optional(),
    Location: z.string().describe(
      "Information about the build output artifact location: * If `type` is set to `CODEPIPELINE`, AWS CodePipeline ignores this value if specified. This is because CodePipeline manages its build output locations instead of CodeBuild. * If `type` is set to `NO_ARTIFACTS`, this value is ignored if specified, because no build output is produced. * If `type` is set to `S3`, this is the name of the output bucket. If you specify `CODEPIPELINE` or `NO_ARTIFACTS` for the `Type` property, don't specify this property. For all of the other types, you must specify this property.",
    ).optional(),
    Name: z.string().optional(),
    NamespaceType: z.string().optional(),
    OverrideArtifactName: z.boolean().optional(),
    Packaging: z.string().optional(),
    Path: z.string().optional(),
    Type: z.string().describe(
      "The type of build output artifact. Valid values include: * `CODEPIPELINE`: The build project has build output generated through CodePipeline. The `CODEPIPELINE` type is not supported for `secondaryArtifacts`. * `NO_ARTIFACTS`: The build project does not produce any build output. * `S3`: The build project stores build output in Amazon S3.",
    ).optional(),
  }).describe(
    "Specifies output settings for artifacts generated by an AWS CodeBuild build.",
  ).optional(),
  BadgeEnabled: z.boolean().describe(
    "Indicates whether AWS CodeBuild generates a publicly accessible URL for your project's build badge.",
  ).optional(),
  FileSystemLocations: z.array(ProjectFileSystemLocationSchema).optional(),
  Environment: z.object({
    Type: z.string().optional(),
    EnvironmentVariables: z.array(EnvironmentVariableSchema).optional(),
    Fleet: ProjectFleetSchema.optional(),
    PrivilegedMode: z.boolean().optional(),
    ImagePullCredentialsType: z.string().optional(),
    Image: z.string().optional(),
    RegistryCredential: RegistryCredentialSchema.optional(),
    ComputeType: z.string().optional(),
    Certificate: z.string().optional(),
    DockerServer: DockerServerSchema.describe(
      "Contains docker server information.",
    ).optional(),
    HostKernel: z.string().describe(
      "The kernel version of the host operating system for the build environment. Allowed values: LINUX_KERNEL_4 | LINUX_KERNEL_6 | LINUX_KERNEL_LATEST",
    ).optional(),
  }).optional(),
  ConcurrentBuildLimit: z.number().int().describe(
    "The maximum number of concurrent builds that are allowed for this project.",
  ).optional(),
  Visibility: z.string().optional(),
  BuildBatchConfig: z.object({
    CombineArtifacts: z.boolean().optional(),
    ServiceRole: z.string().optional(),
    BatchReportMode: z.string().optional(),
    TimeoutInMins: z.number().int().optional(),
    Restrictions: BatchRestrictionsSchema.optional(),
  }).describe("Defines the batch build options for the project.").optional(),
  TimeoutInMinutes: z.number().int().optional(),
  Cache: z.object({
    Modes: z.array(z.string()).optional(),
    Type: z.string().describe(
      "The type of cache used by the build project. Allowed values: NO_CACHE | S3 | LOCAL.",
    ).optional(),
    Location: z.string().optional(),
    CacheNamespace: z.string().describe(
      "Defines the scope of the cache. You can use this namespace to share a cache across multiple projects.",
    ).optional(),
  }).describe(
    "Settings that AWS CodeBuild uses to store and reuse build dependencies.",
  ).optional(),
  AutoRetryLimit: z.number().int().optional(),
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

/** Swamp extension model for CodeBuild Project. Registered at `@swamp/aws/codebuild/project`. */
export const model = {
  type: "@swamp/aws/codebuild/project",
  version: "2026.10.23.2",
  upgrades: [
    {
      toVersion: "2026.10.23.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "CodeBuild Project resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CodeBuild Project",
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
          "AWS::CodeBuild::Project",
          desiredState,
          credentials,
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
      description: "Get a CodeBuild Project",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CodeBuild Project",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::CodeBuild::Project",
          args.identifier,
          credentials,
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
      description: "Update a CodeBuild Project",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
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
          "AWS::CodeBuild::Project",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::CodeBuild::Project",
          identifier,
          currentState,
          desiredState,
          ["Name"],
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
      description: "Delete a CodeBuild Project",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CodeBuild Project",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::CodeBuild::Project",
          args.identifier,
          credentials,
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
      description: "Sync CodeBuild Project state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
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
            "AWS::CodeBuild::Project",
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
    list: {
      description: "List CodeBuild Project resources",
      arguments: z.object({
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
        resourceModel: z.string().describe(
          "JSON resource model for parent-scoped listing (e.g. parent identifier)",
        ).optional(),
      }),
      execute: async (
        args: { maxPages?: number; resourceModel?: string },
        context: any,
      ) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { items, nextToken } = await listResources(
          "AWS::CodeBuild::Project",
          {
            resourceModel: args.resourceModel,
            maxPages: args.maxPages,
            credentials,
          },
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const instanceName =
            (item.properties?.Name?.toString() ?? item.identifier).replace(
              /[\/\\]/g,
              "_",
            ).replace(/\.\./g, "_").replace(/\0/g, "");
          const handle = await context.writeResource("state", instanceName, {
            ...item.properties,
            _identifier: item.identifier,
          });
          dataHandles.push(handle);
        }
        return {
          dataHandles,
          result: { count: items.length, nextPageToken: nextToken },
        };
      },
    },
  },
};
