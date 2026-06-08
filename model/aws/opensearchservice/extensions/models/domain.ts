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

// Auto-generated extension model for @swamp/aws/opensearchservice/domain
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for OpenSearchService Domain (AWS::OpenSearchService::Domain).
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

const ZoneAwarenessConfigSchema = z.object({
  AvailabilityZoneCount: z.number().int().optional(),
});

const ColdStorageOptionsSchema = z.object({
  Enabled: z.boolean().optional(),
});

const NodeConfigSchema = z.object({
  Enabled: z.boolean().optional(),
  Type: z.string().optional(),
  Count: z.number().int().optional(),
});

const NodeOptionSchema = z.object({
  NodeType: z.enum(["coordinator"]).optional(),
  NodeConfig: NodeConfigSchema.optional(),
});

const LogPublishingOptionSchema = z.object({
  CloudWatchLogsLogGroupArn: z.string().optional(),
  Enabled: z.boolean().optional(),
});

const MasterUserOptionsSchema = z.object({
  MasterUserPassword: z.string().optional(),
  MasterUserName: z.string().optional(),
  MasterUserARN: z.string().optional(),
});

const IdpSchema = z.object({
  MetadataContent: z.string().min(1).max(1048576),
  EntityId: z.string(),
});

const SAMLOptionsSchema = z.object({
  Enabled: z.boolean().optional(),
  Idp: IdpSchema.optional(),
  MasterUserName: z.string().optional(),
  MasterBackendRole: z.string().optional(),
  SubjectKey: z.string().optional(),
  RolesKey: z.string().optional(),
  SessionTimeoutMinutes: z.number().int().optional(),
});

const JWTOptionsSchema = z.object({
  Enabled: z.boolean().optional(),
  PublicKey: z.string().optional(),
  SubjectKey: z.string().optional(),
  RolesKey: z.string().optional(),
});

const IAMFederationOptionsSchema = z.object({
  Enabled: z.boolean().optional(),
  RolesKey: z.string().optional(),
  SubjectKey: z.string().optional(),
});

const TagSchema = z.object({
  Value: z.string().min(0).max(256).describe("The key of the tag."),
  Key: z.string().min(0).max(128).describe("The value of the tag."),
});

const WindowStartTimeSchema = z.object({
  Hours: z.number().int().min(0).max(23),
  Minutes: z.number().int().min(0).max(59),
});

const OffPeakWindowSchema = z.object({
  WindowStartTime: WindowStartTimeSchema.optional(),
});

const S3VectorsEngineSchema = z.object({
  Enabled: z.boolean().describe("Whether to enable S3 vectors engine."),
});

const ServerlessVectorAccelerationSchema = z.object({
  Enabled: z.boolean().describe(
    "Whether to enable serverless vector acceleration.",
  ).optional(),
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
  ClusterConfig: z.object({
    InstanceCount: z.number().int().optional(),
    WarmEnabled: z.boolean().optional(),
    WarmCount: z.number().int().optional(),
    DedicatedMasterEnabled: z.boolean().optional(),
    ZoneAwarenessConfig: ZoneAwarenessConfigSchema.optional(),
    DedicatedMasterCount: z.number().int().optional(),
    InstanceType: z.string().optional(),
    WarmType: z.string().optional(),
    ZoneAwarenessEnabled: z.boolean().optional(),
    DedicatedMasterType: z.string().optional(),
    MultiAZWithStandbyEnabled: z.boolean().optional(),
    ColdStorageOptions: ColdStorageOptionsSchema.optional(),
    NodeOptions: z.array(NodeOptionSchema).optional(),
  }).optional(),
  DomainName: z.string().optional(),
  AccessPolicies: z.record(z.string(), z.unknown()).optional(),
  IPAddressType: z.string().optional(),
  EngineVersion: z.string().optional(),
  AdvancedOptions: z.record(z.string(), z.string()).optional(),
  LogPublishingOptions: z.record(z.string(), LogPublishingOptionSchema)
    .optional(),
  SnapshotOptions: z.object({
    AutomatedSnapshotStartHour: z.number().int().optional(),
  }).optional(),
  VPCOptions: z.object({
    SecurityGroupIds: z.array(z.string()).optional(),
    SubnetIds: z.array(z.string()).optional(),
    EgressEnabled: z.boolean().describe(
      "Controls whether egress traffic from the domain is routed through the customer VPC.",
    ).optional(),
  }).optional(),
  NodeToNodeEncryptionOptions: z.object({
    Enabled: z.boolean().optional(),
  }).optional(),
  DomainEndpointOptions: z.object({
    CustomEndpointCertificateArn: z.string().optional(),
    CustomEndpointEnabled: z.boolean().optional(),
    EnforceHTTPS: z.boolean().optional(),
    CustomEndpoint: z.string().optional(),
    TLSSecurityPolicy: z.string().optional(),
  }).optional(),
  CognitoOptions: z.object({
    Enabled: z.boolean().optional(),
    IdentityPoolId: z.string().optional(),
    UserPoolId: z.string().optional(),
    RoleArn: z.string().optional(),
  }).optional(),
  AdvancedSecurityOptions: z.object({
    Enabled: z.boolean().optional(),
    MasterUserOptions: MasterUserOptionsSchema.optional(),
    InternalUserDatabaseEnabled: z.boolean().optional(),
    AnonymousAuthEnabled: z.boolean().optional(),
    SAMLOptions: SAMLOptionsSchema.optional(),
    JWTOptions: JWTOptionsSchema.optional(),
    IAMFederationOptions: IAMFederationOptionsSchema.optional(),
  }).optional(),
  EBSOptions: z.object({
    EBSEnabled: z.boolean().optional(),
    VolumeType: z.string().optional(),
    Iops: z.number().int().optional(),
    VolumeSize: z.number().int().optional(),
    Throughput: z.number().int().optional(),
  }).optional(),
  EncryptionAtRestOptions: z.object({
    KmsKeyId: z.string().optional(),
    Enabled: z.boolean().optional(),
  }).optional(),
  Tags: z.array(TagSchema).describe(
    "An arbitrary set of tags (key-value pairs) for this Domain.",
  ).optional(),
  ServiceSoftwareOptions: z.object({
    CurrentVersion: z.string().optional(),
    NewVersion: z.string().optional(),
    UpdateAvailable: z.boolean().optional(),
    Cancellable: z.boolean().optional(),
    UpdateStatus: z.string().optional(),
    Description: z.string().optional(),
    AutomatedUpdateDate: z.string().optional(),
    OptionalDeployment: z.boolean().optional(),
  }).optional(),
  OffPeakWindowOptions: z.object({
    Enabled: z.boolean().optional(),
    OffPeakWindow: OffPeakWindowSchema.optional(),
  }).optional(),
  SoftwareUpdateOptions: z.object({
    AutoSoftwareUpdateEnabled: z.boolean().optional(),
  }).optional(),
  SkipShardMigrationWait: z.boolean().optional(),
  IdentityCenterOptions: z.object({
    EnabledAPIAccess: z.boolean().describe(
      "Whether Identity Center is enabled.",
    ).optional(),
    IdentityCenterInstanceARN: z.string().describe(
      "The ARN of the Identity Center instance.",
    ).optional(),
    SubjectKey: z.enum(["UserName", "UserId", "Email"]).describe(
      "The subject key for Identity Center options.",
    ).optional(),
    RolesKey: z.enum(["GroupName", "GroupId"]).describe(
      "The roles key for Identity Center options.",
    ).optional(),
  }).describe("Options for configuring Identity Center").optional(),
  AIMLOptions: z.object({
    S3VectorsEngine: S3VectorsEngineSchema.optional(),
    ServerlessVectorAcceleration: ServerlessVectorAccelerationSchema.optional(),
  }).optional(),
  DeploymentStrategyOptions: z.object({
    DeploymentStrategy: z.enum(["Default", "CapacityOptimized"]).optional(),
  }).optional(),
  AutomatedSnapshotPauseOptions: z.object({
    Enabled: z.boolean(),
    StartTime: z.string().optional(),
    EndTime: z.string().optional(),
  }).optional(),
});

const StateSchema = z.object({
  ClusterConfig: z.object({
    InstanceCount: z.number(),
    WarmEnabled: z.boolean(),
    WarmCount: z.number(),
    DedicatedMasterEnabled: z.boolean(),
    ZoneAwarenessConfig: ZoneAwarenessConfigSchema,
    DedicatedMasterCount: z.number(),
    InstanceType: z.string(),
    WarmType: z.string(),
    ZoneAwarenessEnabled: z.boolean(),
    DedicatedMasterType: z.string(),
    MultiAZWithStandbyEnabled: z.boolean(),
    ColdStorageOptions: ColdStorageOptionsSchema,
    NodeOptions: z.array(NodeOptionSchema),
  }).optional(),
  DomainName: z.string(),
  AccessPolicies: z.record(z.string(), z.unknown()).optional(),
  IPAddressType: z.string().optional(),
  EngineVersion: z.string().optional(),
  AdvancedOptions: z.record(z.string(), z.unknown()).optional(),
  LogPublishingOptions: z.record(z.string(), z.unknown()).optional(),
  SnapshotOptions: z.object({
    AutomatedSnapshotStartHour: z.number(),
  }).optional(),
  VPCOptions: z.object({
    SecurityGroupIds: z.array(z.string()),
    SubnetIds: z.array(z.string()),
    EgressEnabled: z.boolean(),
  }).optional(),
  NodeToNodeEncryptionOptions: z.object({
    Enabled: z.boolean(),
  }).optional(),
  DomainEndpointOptions: z.object({
    CustomEndpointCertificateArn: z.string(),
    CustomEndpointEnabled: z.boolean(),
    EnforceHTTPS: z.boolean(),
    CustomEndpoint: z.string(),
    TLSSecurityPolicy: z.string(),
  }).optional(),
  CognitoOptions: z.object({
    Enabled: z.boolean(),
    IdentityPoolId: z.string(),
    UserPoolId: z.string(),
    RoleArn: z.string(),
  }).optional(),
  AdvancedSecurityOptions: z.object({
    Enabled: z.boolean(),
    MasterUserOptions: MasterUserOptionsSchema,
    InternalUserDatabaseEnabled: z.boolean(),
    AnonymousAuthEnabled: z.boolean(),
    SAMLOptions: SAMLOptionsSchema,
    JWTOptions: JWTOptionsSchema,
    IAMFederationOptions: IAMFederationOptionsSchema,
    AnonymousAuthDisableDate: z.string(),
  }).optional(),
  DomainEndpoint: z.string().optional(),
  DomainEndpointV2: z.string().optional(),
  DomainEndpoints: z.record(z.string(), z.unknown()).optional(),
  EBSOptions: z.object({
    EBSEnabled: z.boolean(),
    VolumeType: z.string(),
    Iops: z.number(),
    VolumeSize: z.number(),
    Throughput: z.number(),
  }).optional(),
  Id: z.string().optional(),
  Arn: z.string().optional(),
  DomainArn: z.string().optional(),
  EncryptionAtRestOptions: z.object({
    KmsKeyId: z.string(),
    Enabled: z.boolean(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
  ServiceSoftwareOptions: z.object({
    CurrentVersion: z.string(),
    NewVersion: z.string(),
    UpdateAvailable: z.boolean(),
    Cancellable: z.boolean(),
    UpdateStatus: z.string(),
    Description: z.string(),
    AutomatedUpdateDate: z.string(),
    OptionalDeployment: z.boolean(),
  }).optional(),
  OffPeakWindowOptions: z.object({
    Enabled: z.boolean(),
    OffPeakWindow: OffPeakWindowSchema,
  }).optional(),
  SoftwareUpdateOptions: z.object({
    AutoSoftwareUpdateEnabled: z.boolean(),
  }).optional(),
  SkipShardMigrationWait: z.boolean().optional(),
  IdentityCenterOptions: z.object({
    EnabledAPIAccess: z.boolean(),
    IdentityCenterInstanceARN: z.string(),
    SubjectKey: z.string(),
    RolesKey: z.string(),
    IdentityCenterApplicationARN: z.string(),
    IdentityStoreId: z.string(),
  }).optional(),
  AIMLOptions: z.object({
    S3VectorsEngine: S3VectorsEngineSchema,
    ServerlessVectorAcceleration: ServerlessVectorAccelerationSchema,
  }).optional(),
  DeploymentStrategyOptions: z.object({
    DeploymentStrategy: z.string(),
  }).optional(),
  AutomatedSnapshotPauseOptions: z.object({
    Enabled: z.boolean(),
    StartTime: z.string(),
    EndTime: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  ClusterConfig: z.object({
    InstanceCount: z.number().int().optional(),
    WarmEnabled: z.boolean().optional(),
    WarmCount: z.number().int().optional(),
    DedicatedMasterEnabled: z.boolean().optional(),
    ZoneAwarenessConfig: ZoneAwarenessConfigSchema.optional(),
    DedicatedMasterCount: z.number().int().optional(),
    InstanceType: z.string().optional(),
    WarmType: z.string().optional(),
    ZoneAwarenessEnabled: z.boolean().optional(),
    DedicatedMasterType: z.string().optional(),
    MultiAZWithStandbyEnabled: z.boolean().optional(),
    ColdStorageOptions: ColdStorageOptionsSchema.optional(),
    NodeOptions: z.array(NodeOptionSchema).optional(),
  }).optional(),
  DomainName: z.string().optional(),
  AccessPolicies: z.record(z.string(), z.unknown()).optional(),
  IPAddressType: z.string().optional(),
  EngineVersion: z.string().optional(),
  AdvancedOptions: z.record(z.string(), z.string()).optional(),
  LogPublishingOptions: z.record(z.string(), LogPublishingOptionSchema)
    .optional(),
  SnapshotOptions: z.object({
    AutomatedSnapshotStartHour: z.number().int().optional(),
  }).optional(),
  VPCOptions: z.object({
    SecurityGroupIds: z.array(z.string()).optional(),
    SubnetIds: z.array(z.string()).optional(),
    EgressEnabled: z.boolean().describe(
      "Controls whether egress traffic from the domain is routed through the customer VPC.",
    ).optional(),
  }).optional(),
  NodeToNodeEncryptionOptions: z.object({
    Enabled: z.boolean().optional(),
  }).optional(),
  DomainEndpointOptions: z.object({
    CustomEndpointCertificateArn: z.string().optional(),
    CustomEndpointEnabled: z.boolean().optional(),
    EnforceHTTPS: z.boolean().optional(),
    CustomEndpoint: z.string().optional(),
    TLSSecurityPolicy: z.string().optional(),
  }).optional(),
  CognitoOptions: z.object({
    Enabled: z.boolean().optional(),
    IdentityPoolId: z.string().optional(),
    UserPoolId: z.string().optional(),
    RoleArn: z.string().optional(),
  }).optional(),
  AdvancedSecurityOptions: z.object({
    Enabled: z.boolean().optional(),
    MasterUserOptions: MasterUserOptionsSchema.optional(),
    InternalUserDatabaseEnabled: z.boolean().optional(),
    AnonymousAuthEnabled: z.boolean().optional(),
    SAMLOptions: SAMLOptionsSchema.optional(),
    JWTOptions: JWTOptionsSchema.optional(),
    IAMFederationOptions: IAMFederationOptionsSchema.optional(),
  }).optional(),
  EBSOptions: z.object({
    EBSEnabled: z.boolean().optional(),
    VolumeType: z.string().optional(),
    Iops: z.number().int().optional(),
    VolumeSize: z.number().int().optional(),
    Throughput: z.number().int().optional(),
  }).optional(),
  EncryptionAtRestOptions: z.object({
    KmsKeyId: z.string().optional(),
    Enabled: z.boolean().optional(),
  }).optional(),
  Tags: z.array(TagSchema).describe(
    "An arbitrary set of tags (key-value pairs) for this Domain.",
  ).optional(),
  ServiceSoftwareOptions: z.object({
    CurrentVersion: z.string().optional(),
    NewVersion: z.string().optional(),
    UpdateAvailable: z.boolean().optional(),
    Cancellable: z.boolean().optional(),
    UpdateStatus: z.string().optional(),
    Description: z.string().optional(),
    AutomatedUpdateDate: z.string().optional(),
    OptionalDeployment: z.boolean().optional(),
  }).optional(),
  OffPeakWindowOptions: z.object({
    Enabled: z.boolean().optional(),
    OffPeakWindow: OffPeakWindowSchema.optional(),
  }).optional(),
  SoftwareUpdateOptions: z.object({
    AutoSoftwareUpdateEnabled: z.boolean().optional(),
  }).optional(),
  SkipShardMigrationWait: z.boolean().optional(),
  IdentityCenterOptions: z.object({
    EnabledAPIAccess: z.boolean().describe(
      "Whether Identity Center is enabled.",
    ).optional(),
    IdentityCenterInstanceARN: z.string().describe(
      "The ARN of the Identity Center instance.",
    ).optional(),
    SubjectKey: z.enum(["UserName", "UserId", "Email"]).describe(
      "The subject key for Identity Center options.",
    ).optional(),
    RolesKey: z.enum(["GroupName", "GroupId"]).describe(
      "The roles key for Identity Center options.",
    ).optional(),
  }).describe("Options for configuring Identity Center").optional(),
  AIMLOptions: z.object({
    S3VectorsEngine: S3VectorsEngineSchema.optional(),
    ServerlessVectorAcceleration: ServerlessVectorAccelerationSchema.optional(),
  }).optional(),
  DeploymentStrategyOptions: z.object({
    DeploymentStrategy: z.enum(["Default", "CapacityOptimized"]).optional(),
  }).optional(),
  AutomatedSnapshotPauseOptions: z.object({
    Enabled: z.boolean().optional(),
    StartTime: z.string().optional(),
    EndTime: z.string().optional(),
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

/** Swamp extension model for OpenSearchService Domain. Registered at `@swamp/aws/opensearchservice/domain`. */
export const model = {
  type: "@swamp/aws/opensearchservice/domain",
  version: "2026.06.08.1",
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
      description: "Added: AutomatedSnapshotPauseOptions",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "OpenSearchService Domain resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a OpenSearchService Domain",
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
          "AWS::OpenSearchService::Domain",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.DomainName ?? g.DomainName)?.toString() ?? "current")
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
      description: "Get a OpenSearchService Domain",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the OpenSearchService Domain",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::OpenSearchService::Domain",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.DomainName ?? context.globalArgs.DomainName)?.toString() ??
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
      description: "Update a OpenSearchService Domain",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.DomainName?.toString() ?? "current").replace(
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
        const identifier = existing.DomainName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::OpenSearchService::Domain",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::OpenSearchService::Domain",
          identifier,
          currentState,
          desiredState,
          ["DomainName"],
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
      description: "Delete a OpenSearchService Domain",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the OpenSearchService Domain",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::OpenSearchService::Domain",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.DomainName?.toString() ?? args.identifier)
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
      description: "Sync OpenSearchService Domain state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.DomainName?.toString() ?? "current").replace(
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
        const identifier = existing.DomainName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::OpenSearchService::Domain",
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
