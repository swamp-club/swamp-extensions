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

// Auto-generated extension model for @swamp/aws/mgn/launch-configuration-template
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for MGN LaunchConfigurationTemplate (AWS::MGN::LaunchConfigurationTemplate).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, sync, and list can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";

const SsmParameterStoreParameterSchema = z.object({
  ParameterType: z.enum(["STRING", "SECURE_STRING"]).describe(
    "AWS Systems Manager Parameter Store parameter type.",
  ),
  ParameterName: z.string().min(1).max(1011).regex(
    new RegExp("^([A-Za-z0-9_\\.-])+$"),
  ).describe("AWS Systems Manager Parameter Store parameter name."),
});

const SsmExternalParameterSchema = z.object({
  DynamicPath: z.string().min(1).max(1011).regex(
    new RegExp("^[a-zA-Z0-9_]+(\\.[a-zA-Z0-9_\\[\\]]+)*$"),
  ).describe("AWS Systems Manager Document external parameter dynamic path."),
});

const SsmDocumentSchema = z.object({
  ActionName: z.string().min(0).max(256).describe(
    "User-friendly name for the AWS Systems Manager Document.",
  ),
  SsmDocumentName: z.string().min(3).max(172).regex(
    new RegExp("^([A-Za-z0-9/:_\\.-])+$"),
  ).describe("AWS Systems Manager Document name or full ARN."),
  TimeoutSeconds: z.number().int().min(1).describe(
    "AWS Systems Manager Document timeout, in seconds.",
  ).optional(),
  MustSucceedForCutover: z.boolean().describe(
    "Whether Cutover is blocked when the document has failed.",
  ).optional(),
  Parameters: z.record(z.string(), z.array(SsmParameterStoreParameterSchema))
    .describe(
      "AWS Systems Manager Document parameters, each resolved from AWS Systems Manager Parameter Store.",
    ).optional(),
  ExternalParameters: z.record(z.string(), SsmExternalParameterSchema).describe(
    "AWS Systems Manager Document external parameters.",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(0).max(256).describe("The key name of the tag."),
  Value: z.string().min(0).max(256).describe("The value for the tag."),
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
    "AWS region; overrides AWS_REGION / AWS_DEFAULT_REGION environment variables and ~/.aws/config profile region. Defaults to us-east-1.",
  ).optional(),
  PostLaunchActions: z.object({
    Deployment: z.enum(["TEST_AND_CUTOVER", "CUTOVER_ONLY", "TEST_ONLY"])
      .describe(
        "Deployment type in which AWS Systems Manager Documents will be executed.",
      ).optional(),
    S3LogBucket: z.string().min(3).max(63).describe(
      "AWS Systems Manager Command's logs S3 log bucket.",
    ).optional(),
    S3OutputKeyPrefix: z.string().min(0).max(256).describe(
      "AWS Systems Manager Command's logs S3 output key prefix.",
    ).optional(),
    CloudWatchLogGroupName: z.string().min(1).max(512).regex(
      new RegExp("^[\\.\\-_/#A-Za-z0-9]+$"),
    ).describe("AWS Systems Manager Command's CloudWatch log group name.")
      .optional(),
    SsmDocuments: z.array(SsmDocumentSchema).describe(
      "AWS Systems Manager Documents to execute, in order.",
    ).optional(),
  }).describe("Post launch actions to execute on the Test or Cutover instance.")
    .optional(),
  EnableMapAutoTagging: z.boolean().describe(
    "Whether to enable map auto tagging.",
  ).optional(),
  MapAutoTaggingMpeID: z.string().min(0).max(256).describe(
    "Launch configuration template map auto tagging MPE ID.",
  ).optional(),
  LaunchDisposition: z.enum(["STOPPED", "STARTED"]).describe(
    "Launch disposition.",
  ).optional(),
  TargetInstanceTypeRightSizingMethod: z.enum(["NONE", "BASIC"]).describe(
    "Target instance type right-sizing method.",
  ).optional(),
  CopyPrivateIp: z.boolean().describe(
    "Whether to copy the private IP of the source server.",
  ).optional(),
  AssociatePublicIpAddress: z.boolean().describe(
    "Whether to associate a public IP address with the launched instance.",
  ).optional(),
  CopyTags: z.boolean().describe(
    "Whether to copy the tags of the source server.",
  ).optional(),
  Licensing: z.object({
    OsByol: z.boolean().describe("Whether to configure BYOL OS licensing.")
      .optional(),
  }).describe("Configuration of a machine's license.").optional(),
  BootMode: z.enum(["LEGACY_BIOS", "UEFI", "USE_SOURCE"]).describe(
    "Launch configuration template boot mode.",
  ).optional(),
  SmallVolumeMaxSize: z.number().int().min(0).describe(
    "Small volume maximum size, in GiB.",
  ).optional(),
  SmallVolumeConf: z.object({
    VolumeType: z.enum(["io1", "io2", "gp3", "gp2", "st1", "sc1", "standard"])
      .describe("Launch template disk volume type configuration.").optional(),
    Iops: z.number().int().min(100).max(64000).describe(
      "Launch template disk IOPS configuration.",
    ).optional(),
    Throughput: z.number().int().min(125).max(1000).describe(
      "Launch template disk throughput configuration, in MiB/s.",
    ).optional(),
  }).describe("Launch template disk configuration.").optional(),
  LargeVolumeConf: z.object({
    VolumeType: z.enum(["io1", "io2", "gp3", "gp2", "st1", "sc1", "standard"])
      .describe("Launch template disk volume type configuration.").optional(),
    Iops: z.number().int().min(100).max(64000).describe(
      "Launch template disk IOPS configuration.",
    ).optional(),
    Throughput: z.number().int().min(125).max(1000).describe(
      "Launch template disk throughput configuration, in MiB/s.",
    ).optional(),
  }).describe("Launch template disk configuration.").optional(),
  EnableParametersEncryption: z.boolean().describe(
    "Whether to enable encryption of the AWS Systems Manager parameters used by post launch actions.",
  ).optional(),
  ParametersEncryptionKey: z.string().min(20).max(276).regex(
    new RegExp(
      "^((arn:[\\w-]+:kms:([a-z]{2}-(gov-)?[a-z]+-\\d{1})?:(\\d{12})?:((alias|key)/[a-zA-Z0-9:/_-]{1,256}))|())$",
    ),
  ).describe(
    "ARN of the KMS key used to encrypt the AWS Systems Manager parameters used by post launch actions.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A set of tags to be associated with the Launch Configuration Template.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  LaunchConfigurationTemplateID: z.string().optional(),
  Ec2LaunchTemplateID: z.string().optional(),
  PostLaunchActions: z.object({
    Deployment: z.string(),
    S3LogBucket: z.string(),
    S3OutputKeyPrefix: z.string(),
    CloudWatchLogGroupName: z.string(),
    SsmDocuments: z.array(SsmDocumentSchema),
  }).optional(),
  EnableMapAutoTagging: z.boolean().optional(),
  MapAutoTaggingMpeID: z.string().optional(),
  LaunchDisposition: z.string().optional(),
  TargetInstanceTypeRightSizingMethod: z.string().optional(),
  CopyPrivateIp: z.boolean().optional(),
  AssociatePublicIpAddress: z.boolean().optional(),
  CopyTags: z.boolean().optional(),
  Licensing: z.object({
    OsByol: z.boolean(),
  }).optional(),
  BootMode: z.string().optional(),
  SmallVolumeMaxSize: z.number().optional(),
  SmallVolumeConf: z.object({
    VolumeType: z.string(),
    Iops: z.number(),
    Throughput: z.number(),
  }).optional(),
  LargeVolumeConf: z.object({
    VolumeType: z.string(),
    Iops: z.number(),
    Throughput: z.number(),
  }).optional(),
  EnableParametersEncryption: z.boolean().optional(),
  ParametersEncryptionKey: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  PostLaunchActions: z.object({
    Deployment: z.enum(["TEST_AND_CUTOVER", "CUTOVER_ONLY", "TEST_ONLY"])
      .describe(
        "Deployment type in which AWS Systems Manager Documents will be executed.",
      ).optional(),
    S3LogBucket: z.string().min(3).max(63).describe(
      "AWS Systems Manager Command's logs S3 log bucket.",
    ).optional(),
    S3OutputKeyPrefix: z.string().min(0).max(256).describe(
      "AWS Systems Manager Command's logs S3 output key prefix.",
    ).optional(),
    CloudWatchLogGroupName: z.string().min(1).max(512).regex(
      new RegExp("^[\\.\\-_/#A-Za-z0-9]+$"),
    ).describe("AWS Systems Manager Command's CloudWatch log group name.")
      .optional(),
    SsmDocuments: z.array(SsmDocumentSchema).describe(
      "AWS Systems Manager Documents to execute, in order.",
    ).optional(),
  }).describe("Post launch actions to execute on the Test or Cutover instance.")
    .optional(),
  EnableMapAutoTagging: z.boolean().describe(
    "Whether to enable map auto tagging.",
  ).optional(),
  MapAutoTaggingMpeID: z.string().min(0).max(256).describe(
    "Launch configuration template map auto tagging MPE ID.",
  ).optional(),
  LaunchDisposition: z.enum(["STOPPED", "STARTED"]).describe(
    "Launch disposition.",
  ).optional(),
  TargetInstanceTypeRightSizingMethod: z.enum(["NONE", "BASIC"]).describe(
    "Target instance type right-sizing method.",
  ).optional(),
  CopyPrivateIp: z.boolean().describe(
    "Whether to copy the private IP of the source server.",
  ).optional(),
  AssociatePublicIpAddress: z.boolean().describe(
    "Whether to associate a public IP address with the launched instance.",
  ).optional(),
  CopyTags: z.boolean().describe(
    "Whether to copy the tags of the source server.",
  ).optional(),
  Licensing: z.object({
    OsByol: z.boolean().describe("Whether to configure BYOL OS licensing.")
      .optional(),
  }).describe("Configuration of a machine's license.").optional(),
  BootMode: z.enum(["LEGACY_BIOS", "UEFI", "USE_SOURCE"]).describe(
    "Launch configuration template boot mode.",
  ).optional(),
  SmallVolumeMaxSize: z.number().int().min(0).describe(
    "Small volume maximum size, in GiB.",
  ).optional(),
  SmallVolumeConf: z.object({
    VolumeType: z.enum(["io1", "io2", "gp3", "gp2", "st1", "sc1", "standard"])
      .describe("Launch template disk volume type configuration.").optional(),
    Iops: z.number().int().min(100).max(64000).describe(
      "Launch template disk IOPS configuration.",
    ).optional(),
    Throughput: z.number().int().min(125).max(1000).describe(
      "Launch template disk throughput configuration, in MiB/s.",
    ).optional(),
  }).describe("Launch template disk configuration.").optional(),
  LargeVolumeConf: z.object({
    VolumeType: z.enum(["io1", "io2", "gp3", "gp2", "st1", "sc1", "standard"])
      .describe("Launch template disk volume type configuration.").optional(),
    Iops: z.number().int().min(100).max(64000).describe(
      "Launch template disk IOPS configuration.",
    ).optional(),
    Throughput: z.number().int().min(125).max(1000).describe(
      "Launch template disk throughput configuration, in MiB/s.",
    ).optional(),
  }).describe("Launch template disk configuration.").optional(),
  EnableParametersEncryption: z.boolean().describe(
    "Whether to enable encryption of the AWS Systems Manager parameters used by post launch actions.",
  ).optional(),
  ParametersEncryptionKey: z.string().min(20).max(276).regex(
    new RegExp(
      "^((arn:[\\w-]+:kms:([a-z]{2}-(gov-)?[a-z]+-\\d{1})?:(\\d{12})?:((alias|key)/[a-zA-Z0-9:/_-]{1,256}))|())$",
    ),
  ).describe(
    "ARN of the KMS key used to encrypt the AWS Systems Manager parameters used by post launch actions.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A set of tags to be associated with the Launch Configuration Template.",
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

/** Swamp extension model for MGN LaunchConfigurationTemplate. Registered at `@swamp/aws/mgn/launch-configuration-template`. */
export const model = {
  type: "@swamp/aws/mgn/launch-configuration-template",
  version: "2026.09.24.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "MGN LaunchConfigurationTemplate resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a MGN LaunchConfigurationTemplate",
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
          "AWS::MGN::LaunchConfigurationTemplate",
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
      description: "Get a MGN LaunchConfigurationTemplate",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MGN LaunchConfigurationTemplate",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::MGN::LaunchConfigurationTemplate",
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
      description: "Update a MGN LaunchConfigurationTemplate",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::MGN::LaunchConfigurationTemplate",
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
          "AWS::MGN::LaunchConfigurationTemplate",
          identifier,
          currentState,
          desiredState,
          ["Tags"],
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
      description: "Delete a MGN LaunchConfigurationTemplate",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MGN LaunchConfigurationTemplate",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::MGN::LaunchConfigurationTemplate",
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
      description: "Sync MGN LaunchConfigurationTemplate state from AWS",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::MGN::LaunchConfigurationTemplate",
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
      description: "List MGN LaunchConfigurationTemplate resources",
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
          "AWS::MGN::LaunchConfigurationTemplate",
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
            (item.properties?.Arn?.toString() ?? item.identifier).replace(
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
