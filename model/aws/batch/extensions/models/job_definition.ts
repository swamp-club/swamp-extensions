// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/aws/batch/job-definition
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Batch JobDefinition (AWS::Batch::JobDefinition).
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

const EnvironmentSchema = z.object({
  Name: z.string().optional(),
  Value: z.string().optional(),
});

const MountPointSchema = z.object({
  ContainerPath: z.string().optional(),
  ReadOnly: z.boolean().optional(),
  SourceVolume: z.string().optional(),
});

const UlimitSchema = z.object({
  HardLimit: z.number().int(),
  Name: z.string(),
  SoftLimit: z.number().int(),
});

const HostSchema = z.object({
  SourcePath: z.string().optional(),
});

const EFSAuthorizationConfigSchema = z.object({
  AccessPointId: z.string().optional(),
  Iam: z.string().optional(),
});

const EFSVolumeConfigurationSchema = z.object({
  FileSystemId: z.string(),
  RootDirectory: z.string().optional(),
  TransitEncryption: z.string().optional(),
  TransitEncryptionPort: z.number().int().optional(),
  AuthorizationConfig: EFSAuthorizationConfigSchema.optional(),
});

const S3FilesVolumeConfigurationSchema = z.object({
  FileSystemArn: z.string(),
  RootDirectory: z.string().optional(),
  TransitEncryptionPort: z.number().int().optional(),
  AccessPointArn: z.string().optional(),
});

const VolumeSchema = z.object({
  Host: HostSchema.optional(),
  EfsVolumeConfiguration: EFSVolumeConfigurationSchema.optional(),
  S3FilesVolumeConfiguration: S3FilesVolumeConfigurationSchema.optional(),
  Name: z.string().optional(),
});

const ResourceRequirementSchema = z.object({
  Type: z.string().optional(),
  Value: z.string().optional(),
});

const DeviceSchema = z.object({
  HostPath: z.string().optional(),
  ContainerPath: z.string().optional(),
  Permissions: z.array(z.string()).optional(),
});

const TmpfsSchema = z.object({
  ContainerPath: z.string(),
  Size: z.number().int(),
  MountOptions: z.array(z.string()).optional(),
});

const LinuxParametersSchema = z.object({
  Devices: z.array(DeviceSchema).optional(),
  InitProcessEnabled: z.boolean().optional(),
  MaxSwap: z.number().int().optional(),
  Swappiness: z.number().int().optional(),
  SharedMemorySize: z.number().int().optional(),
  Tmpfs: z.array(TmpfsSchema).optional(),
});

const SecretSchema = z.object({
  Name: z.string(),
  ValueFrom: z.string(),
});

const LogConfigurationSchema = z.object({
  LogDriver: z.string(),
  Options: z.record(z.string(), z.string()).optional(),
  SecretOptions: z.array(SecretSchema).optional(),
});

const NetworkConfigurationSchema = z.object({
  AssignPublicIp: z.string().optional(),
});

const EphemeralStorageSchema = z.object({
  SizeInGiB: z.number().int(),
});

const RuntimePlatformSchema = z.object({
  OperatingSystemFamily: z.string().optional(),
  CpuArchitecture: z.string().optional(),
});

const RepositoryCredentialsSchema = z.object({
  CredentialsParameter: z.string(),
});

const TaskContainerDependencySchema = z.object({
  ContainerName: z.string(),
  Condition: z.string(),
});

const TaskContainerPropertiesSchema = z.object({
  Command: z.array(z.string()).optional(),
  Environment: z.array(EnvironmentSchema).optional(),
  DependsOn: z.array(TaskContainerDependencySchema).optional(),
  Name: z.string().optional(),
  Image: z.string(),
  LinuxParameters: LinuxParametersSchema.optional(),
  LogConfiguration: LogConfigurationSchema.optional(),
  MountPoints: z.array(MountPointSchema).optional(),
  Essential: z.boolean().optional(),
  Privileged: z.boolean().optional(),
  ReadonlyRootFilesystem: z.boolean().optional(),
  Ulimits: z.array(UlimitSchema).optional(),
  User: z.string().optional(),
  Secrets: z.array(SecretSchema).optional(),
  RepositoryCredentials: RepositoryCredentialsSchema.optional(),
  ResourceRequirements: z.array(ResourceRequirementSchema).optional(),
  FirelensConfiguration: z.object({
    Type: z.string(),
    Options: z.record(z.string(), z.string()).optional(),
  }).optional(),
  StopTimeout: z.number().int().optional(),
  StartTimeout: z.number().int().optional(),
});

const EcsTaskPropertiesSchema = z.object({
  Containers: z.array(TaskContainerPropertiesSchema).optional(),
  EphemeralStorage: EphemeralStorageSchema.optional(),
  ExecutionRoleArn: z.string().optional(),
  RuntimePlatform: RuntimePlatformSchema.optional(),
  NetworkConfiguration: NetworkConfigurationSchema.optional(),
  Volumes: z.array(VolumeSchema).optional(),
  PidMode: z.string().optional(),
  IpcMode: z.string().optional(),
  PlatformVersion: z.string().optional(),
  TaskRoleArn: z.string().optional(),
  EnableExecuteCommand: z.boolean().optional(),
});

const MultiNodeContainerPropertiesSchema = z.object({
  Command: z.array(z.string()).optional(),
  Environment: z.array(EnvironmentSchema).optional(),
  Image: z.string(),
  JobRoleArn: z.string().optional(),
  Memory: z.number().int().optional(),
  MountPoints: z.array(MountPointSchema).optional(),
  Privileged: z.boolean().optional(),
  ReadonlyRootFilesystem: z.boolean().optional(),
  Ulimits: z.array(UlimitSchema).optional(),
  User: z.string().optional(),
  Vcpus: z.number().int().optional(),
  Volumes: z.array(VolumeSchema).optional(),
  InstanceType: z.string().optional(),
  ResourceRequirements: z.array(ResourceRequirementSchema).optional(),
  LinuxParameters: LinuxParametersSchema.optional(),
  LogConfiguration: LogConfigurationSchema.optional(),
  ExecutionRoleArn: z.string().optional(),
  Secrets: z.array(SecretSchema).optional(),
  EphemeralStorage: EphemeralStorageSchema.optional(),
  RuntimePlatform: RuntimePlatformSchema.optional(),
  RepositoryCredentials: RepositoryCredentialsSchema.optional(),
  EnableExecuteCommand: z.boolean().optional(),
});

const MultiNodeEcsTaskPropertiesSchema = z.object({
  Containers: z.array(TaskContainerPropertiesSchema).optional(),
  ExecutionRoleArn: z.string().optional(),
  Volumes: z.array(VolumeSchema).optional(),
  PidMode: z.string().optional(),
  IpcMode: z.string().optional(),
  TaskRoleArn: z.string().optional(),
  EnableExecuteCommand: z.boolean().optional(),
});

const MultiNodeEcsPropertiesSchema = z.object({
  TaskProperties: z.array(MultiNodeEcsTaskPropertiesSchema),
});

const EksContainerEnvironmentVariableSchema = z.object({
  Name: z.string(),
  Value: z.string().optional(),
});

const EksContainerResourceRequirementsSchema = z.object({
  Limits: z.record(z.string(), z.string()).optional(),
  Requests: z.record(z.string(), z.string()).optional(),
});

const EksContainerVolumeMountSchema = z.object({
  Name: z.string().optional(),
  MountPath: z.string().optional(),
  SubPath: z.string().optional(),
  ReadOnly: z.boolean().optional(),
});

const EksContainerSecurityContextSchema = z.object({
  RunAsUser: z.number().int().optional(),
  RunAsGroup: z.number().int().optional(),
  Privileged: z.boolean().optional(),
  AllowPrivilegeEscalation: z.boolean().optional(),
  ReadOnlyRootFilesystem: z.boolean().optional(),
  RunAsNonRoot: z.boolean().optional(),
});

const EksContainerSchema = z.object({
  Name: z.string().optional(),
  Image: z.string(),
  ImagePullPolicy: z.string().optional(),
  Command: z.array(z.string()).optional(),
  Args: z.array(z.string()).optional(),
  Env: z.array(EksContainerEnvironmentVariableSchema).optional(),
  Resources: EksContainerResourceRequirementsSchema.optional(),
  VolumeMounts: z.array(EksContainerVolumeMountSchema).optional(),
  SecurityContext: EksContainerSecurityContextSchema.optional(),
});

const EksHostPathSchema = z.object({
  Path: z.string().optional(),
});

const EksEmptyDirSchema = z.object({
  Medium: z.string().optional(),
  SizeLimit: z.string().optional(),
});

const EksSecretSchema = z.object({
  SecretName: z.string(),
  Optional: z.boolean().optional(),
});

const EksPersistentVolumeClaimSchema = z.object({
  ClaimName: z.string(),
  ReadOnly: z.boolean().optional(),
});

const EksVolumeSchema = z.object({
  Name: z.string(),
  HostPath: EksHostPathSchema.optional(),
  EmptyDir: EksEmptyDirSchema.optional(),
  Secret: EksSecretSchema.optional(),
  PersistentVolumeClaim: EksPersistentVolumeClaimSchema.optional(),
});

const ImagePullSecretSchema = z.object({
  Name: z.string().optional(),
});

const EksMetadataSchema = z.object({
  Labels: z.record(z.string(), z.string()).optional(),
  Annotations: z.record(z.string(), z.string()).optional(),
  Namespace: z.string().optional(),
});

const EksPodPropertiesSchema = z.object({
  ServiceAccountName: z.string().optional(),
  HostNetwork: z.boolean().optional(),
  DnsPolicy: z.string().optional(),
  InitContainers: z.array(EksContainerSchema).optional(),
  Containers: z.array(EksContainerSchema).optional(),
  Volumes: z.array(EksVolumeSchema).optional(),
  ImagePullSecrets: z.array(ImagePullSecretSchema).optional(),
  Metadata: EksMetadataSchema.optional(),
  ShareProcessNamespace: z.boolean().optional(),
});

const EksPropertiesSchema = z.object({
  PodProperties: EksPodPropertiesSchema.optional(),
});

const ConsumableResourceRequirementSchema = z.object({
  ConsumableResource: z.string().regex(
    new RegExp(
      "arn:[a-z0-9-\\.]{1,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[^/].{0,1023}",
    ),
  ).describe(
    "The ARN of the consumable resource the job definition should consume.",
  ),
  Quantity: z.number().int(),
});

const ConsumableResourcePropertiesSchema = z.object({
  ConsumableResourceList: z.array(ConsumableResourceRequirementSchema),
});

const NodeRangePropertySchema = z.object({
  TargetNodes: z.string(),
  Container: MultiNodeContainerPropertiesSchema.optional(),
  EcsProperties: MultiNodeEcsPropertiesSchema.optional(),
  EksProperties: EksPropertiesSchema.optional(),
  ConsumableResourceProperties: ConsumableResourcePropertiesSchema.optional(),
  InstanceTypes: z.array(z.string()).optional(),
});

const EvaluateOnExitSchema = z.object({
  OnExitCode: z.string().optional(),
  OnStatusReason: z.string().optional(),
  OnReason: z.string().optional(),
  Action: z.string(),
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
  ContainerProperties: z.object({
    Command: z.array(z.string()).optional(),
    Environment: z.array(EnvironmentSchema).optional(),
    Image: z.string(),
    JobRoleArn: z.string().optional(),
    Memory: z.number().int().optional(),
    MountPoints: z.array(MountPointSchema).optional(),
    Privileged: z.boolean().optional(),
    ReadonlyRootFilesystem: z.boolean().optional(),
    Ulimits: z.array(UlimitSchema).optional(),
    User: z.string().optional(),
    Vcpus: z.number().int().optional(),
    Volumes: z.array(VolumeSchema).optional(),
    ResourceRequirements: z.array(ResourceRequirementSchema).optional(),
    LinuxParameters: LinuxParametersSchema.optional(),
    LogConfiguration: LogConfigurationSchema.optional(),
    ExecutionRoleArn: z.string().optional(),
    Secrets: z.array(SecretSchema).optional(),
    NetworkConfiguration: NetworkConfigurationSchema.optional(),
    FargatePlatformConfiguration: z.object({
      PlatformVersion: z.string().optional(),
    }).optional(),
    EphemeralStorage: EphemeralStorageSchema.optional(),
    RuntimePlatform: RuntimePlatformSchema.optional(),
    RepositoryCredentials: RepositoryCredentialsSchema.optional(),
    EnableExecuteCommand: z.boolean().optional(),
  }).optional(),
  EcsProperties: z.object({
    TaskProperties: z.array(EcsTaskPropertiesSchema),
  }).optional(),
  NodeProperties: z.object({
    NumNodes: z.number().int(),
    MainNode: z.number().int(),
    NodeRangeProperties: z.array(NodeRangePropertySchema),
  }).optional(),
  JobDefinitionName: z.string().max(128).optional(),
  SchedulingPriority: z.number().int().optional(),
  Parameters: z.record(z.string(), z.string()).optional(),
  PlatformCapabilities: z.array(z.string()).optional(),
  PropagateTags: z.boolean().optional(),
  RetryStrategy: z.object({
    Attempts: z.number().int().optional(),
    EvaluateOnExit: z.array(EvaluateOnExitSchema).optional(),
  }).optional(),
  ResourceRetentionPolicy: z.object({
    SkipDeregisterOnUpdate: z.boolean().optional(),
  }).optional(),
  Timeout: z.object({
    AttemptDurationSeconds: z.number().int().optional(),
  }).optional(),
  Type: z.string(),
  Tags: z.record(z.string(), z.string()).describe(
    "A key-value pair to associate with a resource.",
  ).optional(),
  EksProperties: z.object({
    PodProperties: EksPodPropertiesSchema.optional(),
  }).optional(),
  ConsumableResourceProperties: z.object({
    ConsumableResourceList: z.array(ConsumableResourceRequirementSchema),
  }).optional(),
});

const StateSchema = z.object({
  ContainerProperties: z.object({
    Command: z.array(z.string()),
    Environment: z.array(EnvironmentSchema),
    Image: z.string(),
    JobRoleArn: z.string(),
    Memory: z.number(),
    MountPoints: z.array(MountPointSchema),
    Privileged: z.boolean(),
    ReadonlyRootFilesystem: z.boolean(),
    Ulimits: z.array(UlimitSchema),
    User: z.string(),
    Vcpus: z.number(),
    Volumes: z.array(VolumeSchema),
    ResourceRequirements: z.array(ResourceRequirementSchema),
    LinuxParameters: LinuxParametersSchema,
    LogConfiguration: LogConfigurationSchema,
    ExecutionRoleArn: z.string(),
    Secrets: z.array(SecretSchema),
    NetworkConfiguration: NetworkConfigurationSchema,
    FargatePlatformConfiguration: z.object({
      PlatformVersion: z.string(),
    }),
    EphemeralStorage: EphemeralStorageSchema,
    RuntimePlatform: RuntimePlatformSchema,
    RepositoryCredentials: RepositoryCredentialsSchema,
    EnableExecuteCommand: z.boolean(),
  }).optional(),
  EcsProperties: z.object({
    TaskProperties: z.array(EcsTaskPropertiesSchema),
  }).optional(),
  NodeProperties: z.object({
    NumNodes: z.number(),
    MainNode: z.number(),
    NodeRangeProperties: z.array(NodeRangePropertySchema),
  }).optional(),
  JobDefinitionName: z.string(),
  JobDefinitionArn: z.string().optional(),
  SchedulingPriority: z.number().optional(),
  Parameters: z.record(z.string(), z.unknown()).optional(),
  PlatformCapabilities: z.array(z.string()).optional(),
  PropagateTags: z.boolean().optional(),
  RetryStrategy: z.object({
    Attempts: z.number(),
    EvaluateOnExit: z.array(EvaluateOnExitSchema),
  }).optional(),
  ResourceRetentionPolicy: z.object({
    SkipDeregisterOnUpdate: z.boolean(),
  }).optional(),
  Timeout: z.object({
    AttemptDurationSeconds: z.number(),
  }).optional(),
  Type: z.string().optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
  EksProperties: EksPropertiesSchema.optional(),
  ConsumableResourceProperties: ConsumableResourcePropertiesSchema.optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  ContainerProperties: z.object({
    Command: z.array(z.string()).optional(),
    Environment: z.array(EnvironmentSchema).optional(),
    Image: z.string().optional(),
    JobRoleArn: z.string().optional(),
    Memory: z.number().int().optional(),
    MountPoints: z.array(MountPointSchema).optional(),
    Privileged: z.boolean().optional(),
    ReadonlyRootFilesystem: z.boolean().optional(),
    Ulimits: z.array(UlimitSchema).optional(),
    User: z.string().optional(),
    Vcpus: z.number().int().optional(),
    Volumes: z.array(VolumeSchema).optional(),
    ResourceRequirements: z.array(ResourceRequirementSchema).optional(),
    LinuxParameters: LinuxParametersSchema.optional(),
    LogConfiguration: LogConfigurationSchema.optional(),
    ExecutionRoleArn: z.string().optional(),
    Secrets: z.array(SecretSchema).optional(),
    NetworkConfiguration: NetworkConfigurationSchema.optional(),
    FargatePlatformConfiguration: z.object({
      PlatformVersion: z.string().optional(),
    }).optional(),
    EphemeralStorage: EphemeralStorageSchema.optional(),
    RuntimePlatform: RuntimePlatformSchema.optional(),
    RepositoryCredentials: RepositoryCredentialsSchema.optional(),
    EnableExecuteCommand: z.boolean().optional(),
  }).optional(),
  EcsProperties: z.object({
    TaskProperties: z.array(EcsTaskPropertiesSchema).optional(),
  }).optional(),
  NodeProperties: z.object({
    NumNodes: z.number().int().optional(),
    MainNode: z.number().int().optional(),
    NodeRangeProperties: z.array(NodeRangePropertySchema).optional(),
  }).optional(),
  JobDefinitionName: z.string().max(128).optional(),
  SchedulingPriority: z.number().int().optional(),
  Parameters: z.record(z.string(), z.string()).optional(),
  PlatformCapabilities: z.array(z.string()).optional(),
  PropagateTags: z.boolean().optional(),
  RetryStrategy: z.object({
    Attempts: z.number().int().optional(),
    EvaluateOnExit: z.array(EvaluateOnExitSchema).optional(),
  }).optional(),
  ResourceRetentionPolicy: z.object({
    SkipDeregisterOnUpdate: z.boolean().optional(),
  }).optional(),
  Timeout: z.object({
    AttemptDurationSeconds: z.number().int().optional(),
  }).optional(),
  Type: z.string().optional(),
  Tags: z.record(z.string(), z.string()).describe(
    "A key-value pair to associate with a resource.",
  ).optional(),
  EksProperties: z.object({
    PodProperties: EksPodPropertiesSchema.optional(),
  }).optional(),
  ConsumableResourceProperties: z.object({
    ConsumableResourceList: z.array(ConsumableResourceRequirementSchema)
      .optional(),
  }).optional(),
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

/** Swamp extension model for Batch JobDefinition. Registered at `@swamp/aws/batch/job-definition`. */
export const model = {
  type: "@swamp/aws/batch/job-definition",
  version: "2026.06.15.1",
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
      toVersion: "2026.05.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.06.1",
      description: "Added: accessKeyId, secretAccessKey, sessionToken, region",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.15.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Batch JobDefinition resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Batch JobDefinition",
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
          "AWS::Batch::JobDefinition",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.JobDefinitionName ?? g.JobDefinitionName)?.toString() ??
            "current").replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(
              /\0/g,
              "",
            );
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a Batch JobDefinition",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Batch JobDefinition",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Batch::JobDefinition",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.JobDefinitionName ?? context.globalArgs.JobDefinitionName)
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
      description: "Update a Batch JobDefinition",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.JobDefinitionName?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.JobDefinitionName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Batch::JobDefinition",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Batch::JobDefinition",
          identifier,
          currentState,
          desiredState,
          ["JobDefinitionName"],
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
      description: "Delete a Batch JobDefinition",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Batch JobDefinition",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Batch::JobDefinition",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.JobDefinitionName?.toString() ?? args.identifier)
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
      description: "Sync Batch JobDefinition state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.JobDefinitionName?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.JobDefinitionName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Batch::JobDefinition",
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
