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

// Auto-generated extension model for @swamp/aws/batch/job-definition
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Batch JobDefinition (AWS::Batch::JobDefinition).
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

const EksContainerVolumeMountSchema = z.object({
  MountPath: z.string().optional(),
  ReadOnly: z.boolean().optional(),
  SubPath: z.string().optional(),
  Name: z.string().optional(),
});

const EksContainerSecurityContextSchema = z.object({
  RunAsUser: z.number().int().optional(),
  AllowPrivilegeEscalation: z.boolean().optional(),
  RunAsNonRoot: z.boolean().optional(),
  Privileged: z.boolean().optional(),
  ReadOnlyRootFilesystem: z.boolean().optional(),
  RunAsGroup: z.number().int().optional(),
});

const EksContainerResourceRequirementsSchema = z.object({
  Limits: z.record(z.string(), z.string()).optional(),
  Requests: z.record(z.string(), z.string()).optional(),
});

const EksContainerEnvironmentVariableSchema = z.object({
  Value: z.string().optional(),
  Name: z.string(),
});

const EksContainerSchema = z.object({
  Args: z.array(z.string()).optional(),
  VolumeMounts: z.array(EksContainerVolumeMountSchema).optional(),
  ImagePullPolicy: z.string().optional(),
  Command: z.array(z.string()).optional(),
  SecurityContext: EksContainerSecurityContextSchema.optional(),
  Resources: EksContainerResourceRequirementsSchema.optional(),
  Image: z.string(),
  Env: z.array(EksContainerEnvironmentVariableSchema).optional(),
  Name: z.string().optional(),
});

const EksSecretSchema = z.object({
  SecretName: z.string(),
  Optional: z.boolean().optional(),
});

const EksEmptyDirSchema = z.object({
  Medium: z.string().optional(),
  SizeLimit: z.string().optional(),
});

const EksHostPathSchema = z.object({
  Path: z.string().optional(),
});

const EksPersistentVolumeClaimSchema = z.object({
  ReadOnly: z.boolean().optional(),
  ClaimName: z.string(),
});

const EksVolumeSchema = z.object({
  Secret: EksSecretSchema.optional(),
  EmptyDir: EksEmptyDirSchema.optional(),
  HostPath: EksHostPathSchema.optional(),
  PersistentVolumeClaim: EksPersistentVolumeClaimSchema.optional(),
  Name: z.string(),
});

const EksMetadataSchema = z.object({
  Annotations: z.record(z.string(), z.string()).optional(),
  Labels: z.record(z.string(), z.string()).optional(),
  Namespace: z.string().optional(),
});

const ImagePullSecretSchema = z.object({
  Name: z.string().optional(),
});

const EksPodPropertiesSchema = z.object({
  InitContainers: z.array(EksContainerSchema).optional(),
  Volumes: z.array(EksVolumeSchema).optional(),
  DnsPolicy: z.string().optional(),
  Containers: z.array(EksContainerSchema).optional(),
  Metadata: EksMetadataSchema.optional(),
  ServiceAccountName: z.string().optional(),
  ImagePullSecrets: z.array(ImagePullSecretSchema).optional(),
  HostNetwork: z.boolean().optional(),
  ShareProcessNamespace: z.boolean().optional(),
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

const RepositoryCredentialsSchema = z.object({
  CredentialsParameter: z.string(),
});

const SecretSchema = z.object({
  ValueFrom: z.string(),
  Name: z.string(),
});

const TmpfsSchema = z.object({
  Size: z.number().int(),
  ContainerPath: z.string(),
  MountOptions: z.array(z.string()).optional(),
});

const DeviceSchema = z.object({
  HostPath: z.string().optional(),
  Permissions: z.array(z.string()).optional(),
  ContainerPath: z.string().optional(),
});

const LinuxParametersSchema = z.object({
  Swappiness: z.number().int().optional(),
  Tmpfs: z.array(TmpfsSchema).optional(),
  SharedMemorySize: z.number().int().optional(),
  Devices: z.array(DeviceSchema).optional(),
  InitProcessEnabled: z.boolean().optional(),
  MaxSwap: z.number().int().optional(),
});

const ResourceRequirementSchema = z.object({
  Type: z.string().optional(),
  Value: z.string().optional(),
});

const LogConfigurationSchema = z.object({
  SecretOptions: z.array(SecretSchema).optional(),
  Options: z.record(z.string(), z.string()).optional(),
  LogDriver: z.string(),
});

const MountPointSchema = z.object({
  ReadOnly: z.boolean().optional(),
  SourceVolume: z.string().optional(),
  ContainerPath: z.string().optional(),
});

const RuntimePlatformSchema = z.object({
  OperatingSystemFamily: z.string().optional(),
  CpuArchitecture: z.string().optional(),
});

const S3FilesVolumeConfigurationSchema = z.object({
  FileSystemArn: z.string(),
  AccessPointArn: z.string().optional(),
  RootDirectory: z.string().optional(),
  TransitEncryptionPort: z.number().int().optional(),
});

const HostSchema = z.object({
  SourcePath: z.string().optional(),
});

const EFSAuthorizationConfigSchema = z.object({
  Iam: z.string().optional(),
  AccessPointId: z.string().optional(),
});

const EFSVolumeConfigurationSchema = z.object({
  TransitEncryption: z.string().optional(),
  AuthorizationConfig: EFSAuthorizationConfigSchema.optional(),
  FileSystemId: z.string(),
  RootDirectory: z.string().optional(),
  TransitEncryptionPort: z.number().int().optional(),
});

const VolumeSchema = z.object({
  S3FilesVolumeConfiguration: S3FilesVolumeConfigurationSchema.optional(),
  Host: HostSchema.optional(),
  EfsVolumeConfiguration: EFSVolumeConfigurationSchema.optional(),
  Name: z.string().optional(),
});

const EnvironmentSchema = z.object({
  Value: z.string().optional(),
  Name: z.string().optional(),
});

const UlimitSchema = z.object({
  SoftLimit: z.number().int(),
  HardLimit: z.number().int(),
  Name: z.string(),
});

const EphemeralStorageSchema = z.object({
  SizeInGiB: z.number().int(),
});

const MultiNodeContainerPropertiesSchema = z.object({
  RepositoryCredentials: RepositoryCredentialsSchema.optional(),
  User: z.string().optional(),
  Secrets: z.array(SecretSchema).optional(),
  Memory: z.number().int().optional(),
  Privileged: z.boolean().optional(),
  EnableExecuteCommand: z.boolean().optional(),
  LinuxParameters: LinuxParametersSchema.optional(),
  JobRoleArn: z.string().optional(),
  ReadonlyRootFilesystem: z.boolean().optional(),
  Vcpus: z.number().int().optional(),
  Image: z.string(),
  ResourceRequirements: z.array(ResourceRequirementSchema).optional(),
  LogConfiguration: LogConfigurationSchema.optional(),
  MountPoints: z.array(MountPointSchema).optional(),
  ExecutionRoleArn: z.string().optional(),
  RuntimePlatform: RuntimePlatformSchema.optional(),
  Volumes: z.array(VolumeSchema).optional(),
  Command: z.array(z.string()).optional(),
  Environment: z.array(EnvironmentSchema).optional(),
  Ulimits: z.array(UlimitSchema).optional(),
  InstanceType: z.string().optional(),
  EphemeralStorage: EphemeralStorageSchema.optional(),
});

const TaskContainerDependencySchema = z.object({
  Condition: z.string(),
  ContainerName: z.string(),
});

const TaskContainerPropertiesSchema = z.object({
  RepositoryCredentials: RepositoryCredentialsSchema.optional(),
  User: z.string().optional(),
  Secrets: z.array(SecretSchema).optional(),
  Privileged: z.boolean().optional(),
  LinuxParameters: LinuxParametersSchema.optional(),
  StartTimeout: z.number().int().optional(),
  ReadonlyRootFilesystem: z.boolean().optional(),
  Image: z.string(),
  LogConfiguration: LogConfigurationSchema.optional(),
  Essential: z.boolean().optional(),
  ResourceRequirements: z.array(ResourceRequirementSchema).optional(),
  Name: z.string().optional(),
  MountPoints: z.array(MountPointSchema).optional(),
  FirelensConfiguration: z.object({
    Options: z.record(z.string(), z.string()).optional(),
    Type: z.string(),
  }).optional(),
  DependsOn: z.array(TaskContainerDependencySchema).optional(),
  Command: z.array(z.string()).optional(),
  Environment: z.array(EnvironmentSchema).optional(),
  Ulimits: z.array(UlimitSchema).optional(),
  StopTimeout: z.number().int().optional(),
});

const MultiNodeEcsTaskPropertiesSchema = z.object({
  ExecutionRoleArn: z.string().optional(),
  TaskRoleArn: z.string().optional(),
  IpcMode: z.string().optional(),
  Volumes: z.array(VolumeSchema).optional(),
  EnableExecuteCommand: z.boolean().optional(),
  Containers: z.array(TaskContainerPropertiesSchema).optional(),
  PidMode: z.string().optional(),
});

const MultiNodeEcsPropertiesSchema = z.object({
  TaskProperties: z.array(MultiNodeEcsTaskPropertiesSchema),
});

const EksPropertiesSchema = z.object({
  PodProperties: EksPodPropertiesSchema.optional(),
});

const ConsumableResourcePropertiesSchema = z.object({
  ConsumableResourceList: z.array(ConsumableResourceRequirementSchema),
});

const NodeRangePropertySchema = z.object({
  Container: MultiNodeContainerPropertiesSchema.optional(),
  TargetNodes: z.string(),
  EcsProperties: MultiNodeEcsPropertiesSchema.optional(),
  InstanceTypes: z.array(z.string()).optional(),
  EksProperties: EksPropertiesSchema.optional(),
  ConsumableResourceProperties: ConsumableResourcePropertiesSchema.optional(),
});

const NetworkConfigurationSchema = z.object({
  AssignPublicIp: z.string().optional(),
});

const EcsTaskPropertiesSchema = z.object({
  PlatformVersion: z.string().optional(),
  ExecutionRoleArn: z.string().optional(),
  RuntimePlatform: RuntimePlatformSchema.optional(),
  TaskRoleArn: z.string().optional(),
  IpcMode: z.string().optional(),
  Volumes: z.array(VolumeSchema).optional(),
  EnableExecuteCommand: z.boolean().optional(),
  Containers: z.array(TaskContainerPropertiesSchema).optional(),
  NetworkConfiguration: NetworkConfigurationSchema.optional(),
  PidMode: z.string().optional(),
  NetworkMode: z.string().optional(),
  EphemeralStorage: EphemeralStorageSchema.optional(),
});

const EvaluateOnExitSchema = z.object({
  Action: z.string(),
  OnExitCode: z.string().optional(),
  OnReason: z.string().optional(),
  OnStatusReason: z.string().optional(),
});

const EksContainerVolumeMountStateSchema = z.object({
  MountPath: z.string(),
  ReadOnly: z.boolean(),
  SubPath: z.string(),
  Name: z.string(),
}).partial();

const EksContainerSecurityContextStateSchema = z.object({
  RunAsUser: z.number(),
  AllowPrivilegeEscalation: z.boolean(),
  RunAsNonRoot: z.boolean(),
  Privileged: z.boolean(),
  ReadOnlyRootFilesystem: z.boolean(),
  RunAsGroup: z.number(),
}).partial();

const EksContainerResourceRequirementsStateSchema = z.object({
  Limits: z.record(z.string(), z.unknown()),
  Requests: z.record(z.string(), z.unknown()),
}).partial();

const EksContainerEnvironmentVariableStateSchema = z.object({
  Value: z.string(),
  Name: z.string(),
}).partial();

const EksContainerStateSchema = z.object({
  Args: z.array(z.string()),
  VolumeMounts: z.array(EksContainerVolumeMountStateSchema),
  ImagePullPolicy: z.string(),
  Command: z.array(z.string()),
  SecurityContext: EksContainerSecurityContextStateSchema,
  Resources: EksContainerResourceRequirementsStateSchema,
  Image: z.string(),
  Env: z.array(EksContainerEnvironmentVariableStateSchema),
  Name: z.string(),
}).partial();

const EksSecretStateSchema = z.object({
  SecretName: z.string(),
  Optional: z.boolean(),
}).partial();

const EksEmptyDirStateSchema = z.object({
  Medium: z.string(),
  SizeLimit: z.string(),
}).partial();

const EksHostPathStateSchema = z.object({
  Path: z.string(),
}).partial();

const EksPersistentVolumeClaimStateSchema = z.object({
  ReadOnly: z.boolean(),
  ClaimName: z.string(),
}).partial();

const EksVolumeStateSchema = z.object({
  Secret: EksSecretStateSchema,
  EmptyDir: EksEmptyDirStateSchema,
  HostPath: EksHostPathStateSchema,
  PersistentVolumeClaim: EksPersistentVolumeClaimStateSchema,
  Name: z.string(),
}).partial();

const EksMetadataStateSchema = z.object({
  Annotations: z.record(z.string(), z.unknown()),
  Labels: z.record(z.string(), z.unknown()),
  Namespace: z.string(),
}).partial();

const ImagePullSecretStateSchema = z.object({
  Name: z.string(),
}).partial();

const EksPodPropertiesStateSchema = z.object({
  InitContainers: z.array(EksContainerStateSchema),
  Volumes: z.array(EksVolumeStateSchema),
  DnsPolicy: z.string(),
  Containers: z.array(EksContainerStateSchema),
  Metadata: EksMetadataStateSchema,
  ServiceAccountName: z.string(),
  ImagePullSecrets: z.array(ImagePullSecretStateSchema),
  HostNetwork: z.boolean(),
  ShareProcessNamespace: z.boolean(),
}).partial();

const ConsumableResourceRequirementStateSchema = z.object({
  ConsumableResource: z.string(),
  Quantity: z.number(),
}).partial();

const RepositoryCredentialsStateSchema = z.object({
  CredentialsParameter: z.string(),
}).partial();

const SecretStateSchema = z.object({
  ValueFrom: z.string(),
  Name: z.string(),
}).partial();

const TmpfsStateSchema = z.object({
  Size: z.number(),
  ContainerPath: z.string(),
  MountOptions: z.array(z.string()),
}).partial();

const DeviceStateSchema = z.object({
  HostPath: z.string(),
  Permissions: z.array(z.string()),
  ContainerPath: z.string(),
}).partial();

const LinuxParametersStateSchema = z.object({
  Swappiness: z.number(),
  Tmpfs: z.array(TmpfsStateSchema),
  SharedMemorySize: z.number(),
  Devices: z.array(DeviceStateSchema),
  InitProcessEnabled: z.boolean(),
  MaxSwap: z.number(),
}).partial();

const ResourceRequirementStateSchema = z.object({
  Type: z.string(),
  Value: z.string(),
}).partial();

const LogConfigurationStateSchema = z.object({
  SecretOptions: z.array(SecretStateSchema),
  Options: z.record(z.string(), z.unknown()),
  LogDriver: z.string(),
}).partial();

const MountPointStateSchema = z.object({
  ReadOnly: z.boolean(),
  SourceVolume: z.string(),
  ContainerPath: z.string(),
}).partial();

const RuntimePlatformStateSchema = z.object({
  OperatingSystemFamily: z.string(),
  CpuArchitecture: z.string(),
}).partial();

const S3FilesVolumeConfigurationStateSchema = z.object({
  FileSystemArn: z.string(),
  AccessPointArn: z.string(),
  RootDirectory: z.string(),
  TransitEncryptionPort: z.number(),
}).partial();

const HostStateSchema = z.object({
  SourcePath: z.string(),
}).partial();

const EFSAuthorizationConfigStateSchema = z.object({
  Iam: z.string(),
  AccessPointId: z.string(),
}).partial();

const EFSVolumeConfigurationStateSchema = z.object({
  TransitEncryption: z.string(),
  AuthorizationConfig: EFSAuthorizationConfigStateSchema,
  FileSystemId: z.string(),
  RootDirectory: z.string(),
  TransitEncryptionPort: z.number(),
}).partial();

const VolumeStateSchema = z.object({
  S3FilesVolumeConfiguration: S3FilesVolumeConfigurationStateSchema,
  Host: HostStateSchema,
  EfsVolumeConfiguration: EFSVolumeConfigurationStateSchema,
  Name: z.string(),
}).partial();

const EnvironmentStateSchema = z.object({
  Value: z.string(),
  Name: z.string(),
}).partial();

const UlimitStateSchema = z.object({
  SoftLimit: z.number(),
  HardLimit: z.number(),
  Name: z.string(),
}).partial();

const EphemeralStorageStateSchema = z.object({
  SizeInGiB: z.number(),
}).partial();

const MultiNodeContainerPropertiesStateSchema = z.object({
  RepositoryCredentials: RepositoryCredentialsStateSchema,
  User: z.string(),
  Secrets: z.array(SecretStateSchema),
  Memory: z.number(),
  Privileged: z.boolean(),
  EnableExecuteCommand: z.boolean(),
  LinuxParameters: LinuxParametersStateSchema,
  JobRoleArn: z.string(),
  ReadonlyRootFilesystem: z.boolean(),
  Vcpus: z.number(),
  Image: z.string(),
  ResourceRequirements: z.array(ResourceRequirementStateSchema),
  LogConfiguration: LogConfigurationStateSchema,
  MountPoints: z.array(MountPointStateSchema),
  ExecutionRoleArn: z.string(),
  RuntimePlatform: RuntimePlatformStateSchema,
  Volumes: z.array(VolumeStateSchema),
  Command: z.array(z.string()),
  Environment: z.array(EnvironmentStateSchema),
  Ulimits: z.array(UlimitStateSchema),
  InstanceType: z.string(),
  EphemeralStorage: EphemeralStorageStateSchema,
}).partial();

const TaskContainerDependencyStateSchema = z.object({
  Condition: z.string(),
  ContainerName: z.string(),
}).partial();

const TaskContainerPropertiesStateSchema = z.object({
  RepositoryCredentials: RepositoryCredentialsStateSchema,
  User: z.string(),
  Secrets: z.array(SecretStateSchema),
  Privileged: z.boolean(),
  LinuxParameters: LinuxParametersStateSchema,
  StartTimeout: z.number(),
  ReadonlyRootFilesystem: z.boolean(),
  Image: z.string(),
  LogConfiguration: LogConfigurationStateSchema,
  Essential: z.boolean(),
  ResourceRequirements: z.array(ResourceRequirementStateSchema),
  Name: z.string(),
  MountPoints: z.array(MountPointStateSchema),
  FirelensConfiguration: z.object({
    Options: z.record(z.string(), z.unknown()),
    Type: z.string(),
  }).partial(),
  DependsOn: z.array(TaskContainerDependencyStateSchema),
  Command: z.array(z.string()),
  Environment: z.array(EnvironmentStateSchema),
  Ulimits: z.array(UlimitStateSchema),
  StopTimeout: z.number(),
}).partial();

const MultiNodeEcsTaskPropertiesStateSchema = z.object({
  ExecutionRoleArn: z.string(),
  TaskRoleArn: z.string(),
  IpcMode: z.string(),
  Volumes: z.array(VolumeStateSchema),
  EnableExecuteCommand: z.boolean(),
  Containers: z.array(TaskContainerPropertiesStateSchema),
  PidMode: z.string(),
}).partial();

const MultiNodeEcsPropertiesStateSchema = z.object({
  TaskProperties: z.array(MultiNodeEcsTaskPropertiesStateSchema),
}).partial();

const EksPropertiesStateSchema = z.object({
  PodProperties: EksPodPropertiesStateSchema,
}).partial();

const ConsumableResourcePropertiesStateSchema = z.object({
  ConsumableResourceList: z.array(ConsumableResourceRequirementStateSchema),
}).partial();

const NodeRangePropertyStateSchema = z.object({
  Container: MultiNodeContainerPropertiesStateSchema,
  TargetNodes: z.string(),
  EcsProperties: MultiNodeEcsPropertiesStateSchema,
  InstanceTypes: z.array(z.string()),
  EksProperties: EksPropertiesStateSchema,
  ConsumableResourceProperties: ConsumableResourcePropertiesStateSchema,
}).partial();

const NetworkConfigurationStateSchema = z.object({
  AssignPublicIp: z.string(),
}).partial();

const EcsTaskPropertiesStateSchema = z.object({
  PlatformVersion: z.string(),
  ExecutionRoleArn: z.string(),
  RuntimePlatform: RuntimePlatformStateSchema,
  TaskRoleArn: z.string(),
  IpcMode: z.string(),
  Volumes: z.array(VolumeStateSchema),
  EnableExecuteCommand: z.boolean(),
  Containers: z.array(TaskContainerPropertiesStateSchema),
  NetworkConfiguration: NetworkConfigurationStateSchema,
  PidMode: z.string(),
  NetworkMode: z.string(),
  EphemeralStorage: EphemeralStorageStateSchema,
}).partial();

const EvaluateOnExitStateSchema = z.object({
  Action: z.string(),
  OnExitCode: z.string(),
  OnReason: z.string(),
  OnStatusReason: z.string(),
}).partial();

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
  Parameters: z.record(z.string(), z.string()).optional(),
  Timeout: z.object({
    AttemptDurationSeconds: z.number().int().optional(),
  }).optional(),
  JobDefinitionName: z.string().max(128).optional(),
  PropagateTags: z.boolean().optional(),
  PlatformCapabilities: z.array(z.string()).optional(),
  EksProperties: z.object({
    PodProperties: EksPodPropertiesSchema.optional(),
  }).optional(),
  ConsumableResourceProperties: z.object({
    ConsumableResourceList: z.array(ConsumableResourceRequirementSchema),
  }).optional(),
  Type: z.string().optional(),
  NodeProperties: z.object({
    MainNode: z.number().int(),
    NodeRangeProperties: z.array(NodeRangePropertySchema),
    NumNodes: z.number().int(),
  }).optional(),
  SchedulingPriority: z.number().int().optional(),
  ContainerProperties: z.object({
    RepositoryCredentials: RepositoryCredentialsSchema.optional(),
    User: z.string().optional(),
    Secrets: z.array(SecretSchema).optional(),
    Memory: z.number().int().optional(),
    Privileged: z.boolean().optional(),
    EnableExecuteCommand: z.boolean().optional(),
    LinuxParameters: LinuxParametersSchema.optional(),
    FargatePlatformConfiguration: z.object({
      PlatformVersion: z.string().optional(),
    }).optional(),
    JobRoleArn: z.string().optional(),
    ReadonlyRootFilesystem: z.boolean().optional(),
    Vcpus: z.number().int().optional(),
    Image: z.string(),
    ResourceRequirements: z.array(ResourceRequirementSchema).optional(),
    LogConfiguration: LogConfigurationSchema.optional(),
    MountPoints: z.array(MountPointSchema).optional(),
    ExecutionRoleArn: z.string().optional(),
    RuntimePlatform: RuntimePlatformSchema.optional(),
    Volumes: z.array(VolumeSchema).optional(),
    Command: z.array(z.string()).optional(),
    Environment: z.array(EnvironmentSchema).optional(),
    Ulimits: z.array(UlimitSchema).optional(),
    NetworkConfiguration: NetworkConfigurationSchema.optional(),
    EphemeralStorage: EphemeralStorageSchema.optional(),
  }).optional(),
  EcsProperties: z.object({
    TaskProperties: z.array(EcsTaskPropertiesSchema),
  }).optional(),
  ResourceRetentionPolicy: z.object({
    SkipDeregisterOnUpdate: z.boolean().optional(),
  }).optional(),
  RetryStrategy: z.object({
    EvaluateOnExit: z.array(EvaluateOnExitSchema).optional(),
    Attempts: z.number().int().optional(),
  }).optional(),
  Tags: z.record(z.string(), z.string()).describe(
    "A key-value pair to associate with a resource.",
  ).optional(),
});

const StateSchema = z.object({
  Parameters: z.record(z.string(), z.unknown()).optional(),
  JobDefinitionArn: z.string().optional(),
  Timeout: z.object({
    AttemptDurationSeconds: z.number(),
  }).partial().optional(),
  JobDefinitionName: z.string(),
  PropagateTags: z.boolean().optional(),
  PlatformCapabilities: z.array(z.string()).optional(),
  EksProperties: z.object({
    PodProperties: EksPodPropertiesStateSchema,
  }).partial().optional(),
  ConsumableResourceProperties: z.object({
    ConsumableResourceList: z.array(ConsumableResourceRequirementStateSchema),
  }).partial().optional(),
  Type: z.string().optional(),
  NodeProperties: z.object({
    MainNode: z.number(),
    NodeRangeProperties: z.array(NodeRangePropertyStateSchema),
    NumNodes: z.number(),
  }).partial().optional(),
  SchedulingPriority: z.number().optional(),
  ContainerProperties: z.object({
    RepositoryCredentials: RepositoryCredentialsStateSchema,
    User: z.string(),
    Secrets: z.array(SecretStateSchema),
    Memory: z.number(),
    Privileged: z.boolean(),
    EnableExecuteCommand: z.boolean(),
    LinuxParameters: LinuxParametersStateSchema,
    FargatePlatformConfiguration: z.object({
      PlatformVersion: z.string(),
    }).partial(),
    JobRoleArn: z.string(),
    ReadonlyRootFilesystem: z.boolean(),
    Vcpus: z.number(),
    Image: z.string(),
    ResourceRequirements: z.array(ResourceRequirementStateSchema),
    LogConfiguration: LogConfigurationStateSchema,
    MountPoints: z.array(MountPointStateSchema),
    ExecutionRoleArn: z.string(),
    RuntimePlatform: RuntimePlatformStateSchema,
    Volumes: z.array(VolumeStateSchema),
    Command: z.array(z.string()),
    Environment: z.array(EnvironmentStateSchema),
    Ulimits: z.array(UlimitStateSchema),
    NetworkConfiguration: NetworkConfigurationStateSchema,
    EphemeralStorage: EphemeralStorageStateSchema,
  }).partial().optional(),
  EcsProperties: z.object({
    TaskProperties: z.array(EcsTaskPropertiesStateSchema),
  }).partial().optional(),
  ResourceRetentionPolicy: z.object({
    SkipDeregisterOnUpdate: z.boolean(),
  }).partial().optional(),
  RetryStrategy: z.object({
    EvaluateOnExit: z.array(EvaluateOnExitStateSchema),
    Attempts: z.number(),
  }).partial().optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type StateData = Record<string, unknown>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Parameters: z.record(z.string(), z.string()).optional(),
  Timeout: z.object({
    AttemptDurationSeconds: z.number().int().optional(),
  }).optional(),
  JobDefinitionName: z.string().max(128).optional(),
  PropagateTags: z.boolean().optional(),
  PlatformCapabilities: z.array(z.string()).optional(),
  EksProperties: z.object({
    PodProperties: EksPodPropertiesSchema.optional(),
  }).optional(),
  ConsumableResourceProperties: z.object({
    ConsumableResourceList: z.array(ConsumableResourceRequirementSchema)
      .optional(),
  }).optional(),
  Type: z.string().optional(),
  NodeProperties: z.object({
    MainNode: z.number().int().optional(),
    NodeRangeProperties: z.array(NodeRangePropertySchema).optional(),
    NumNodes: z.number().int().optional(),
  }).optional(),
  SchedulingPriority: z.number().int().optional(),
  ContainerProperties: z.object({
    RepositoryCredentials: RepositoryCredentialsSchema.optional(),
    User: z.string().optional(),
    Secrets: z.array(SecretSchema).optional(),
    Memory: z.number().int().optional(),
    Privileged: z.boolean().optional(),
    EnableExecuteCommand: z.boolean().optional(),
    LinuxParameters: LinuxParametersSchema.optional(),
    FargatePlatformConfiguration: z.object({
      PlatformVersion: z.string().optional(),
    }).optional(),
    JobRoleArn: z.string().optional(),
    ReadonlyRootFilesystem: z.boolean().optional(),
    Vcpus: z.number().int().optional(),
    Image: z.string().optional(),
    ResourceRequirements: z.array(ResourceRequirementSchema).optional(),
    LogConfiguration: LogConfigurationSchema.optional(),
    MountPoints: z.array(MountPointSchema).optional(),
    ExecutionRoleArn: z.string().optional(),
    RuntimePlatform: RuntimePlatformSchema.optional(),
    Volumes: z.array(VolumeSchema).optional(),
    Command: z.array(z.string()).optional(),
    Environment: z.array(EnvironmentSchema).optional(),
    Ulimits: z.array(UlimitSchema).optional(),
    NetworkConfiguration: NetworkConfigurationSchema.optional(),
    EphemeralStorage: EphemeralStorageSchema.optional(),
  }).optional(),
  EcsProperties: z.object({
    TaskProperties: z.array(EcsTaskPropertiesSchema).optional(),
  }).optional(),
  ResourceRetentionPolicy: z.object({
    SkipDeregisterOnUpdate: z.boolean().optional(),
  }).optional(),
  RetryStrategy: z.object({
    EvaluateOnExit: z.array(EvaluateOnExitSchema).optional(),
    Attempts: z.number().int().optional(),
  }).optional(),
  Tags: z.record(z.string(), z.string()).describe(
    "A key-value pair to associate with a resource.",
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

/** Swamp extension model for Batch JobDefinition. Registered at `@swamp/aws/batch/job-definition`. */
export const model = {
  type: "@swamp/aws/batch/job-definition",
  version: "2026.11.08.2",
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
    {
      toVersion: "2026.08.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.17.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.17.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.23.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.11.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.11.08.2",
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
        const missing = ["Type"].filter((k) => g[k] === undefined);
        if (missing.length > 0) {
          throw new Error(
            "create requires global arguments: " + missing.join(", "),
          );
        }
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
    list: {
      description: "List Batch JobDefinition resources",
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
          "AWS::Batch::JobDefinition",
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
            (item.properties?.JobDefinitionName?.toString() ?? item.identifier)
              .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
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
