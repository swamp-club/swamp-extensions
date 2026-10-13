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

// Auto-generated extension model for @swamp/aws/sagemaker/notebook-instance
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SageMaker NotebookInstance (AWS::SageMaker::NotebookInstance).
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

const TagSchema = z.object({
  Value: z.string().describe("The tag value."),
  Key: z.string().describe(
    "The tag key. Tag keys must be unique per resource.",
  ),
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
  AcceleratorTypes: z.array(z.string()).describe(
    "A list of Amazon Elastic Inference (EI) instance types to associate with the notebook instance. Currently, only one instance type can be associated with a notebook instance.",
  ).optional(),
  AdditionalCodeRepositories: z.array(z.string()).describe(
    "An array of up to three Git repositories associated with the notebook instance. These can be either the names of Git repositories stored as resources in your account, or the URL of Git repositories in AWS CodeCommit or in any other Git repository. These repositories are cloned at the same level as the default repository of your notebook instance.",
  ).optional(),
  DefaultCodeRepository: z.string().describe(
    "The Git repository associated with the notebook instance as its default code repository. This can be either the name of a Git repository stored as a resource in your account, or the URL of a Git repository in AWS CodeCommit or in any other Git repository. When you open a notebook instance, it opens in the directory that contains this repository.",
  ).optional(),
  DirectInternetAccess: z.string().describe(
    "Sets whether SageMaker AI provides internet access to the notebook instance. If you set this to Disabled this notebook instance is able to access resources only in your VPC, and is not be able to connect to SageMaker AI training and endpoint services unless you configure a NAT Gateway in your VPC. You can set the value of this parameter to Disabled only if you set a value for the SubnetId parameter.",
  ).optional(),
  InstanceMetadataServiceConfiguration: z.object({
    MinimumInstanceMetadataServiceVersion: z.string().describe(
      "Indicates the minimum IMDS version that the notebook instance supports. When passed as part of CreateNotebookInstance, if no value is selected, then it defaults to IMDSv1. This means that both IMDSv1 and IMDSv2 are supported. If passed as part of UpdateNotebookInstance, there is no default.",
    ),
  }).describe("Information on the IMDS configuration of the notebook instance.")
    .optional(),
  InstanceType: z.string().describe(
    "The type of ML compute instance to launch for the notebook instance. Expect some interruption of service if this parameter is changed as CloudFormation stops a notebook instance and starts it up again to update it.",
  ),
  KmsKeyId: z.string().describe(
    "The Amazon Resource Name (ARN) of a AWS Key Management Service key that SageMaker AI uses to encrypt data on the storage volume attached to your notebook instance. The KMS key you provide must be enabled.",
  ).optional(),
  LifecycleConfigName: z.string().describe(
    "The name of a lifecycle configuration to associate with the notebook instance.",
  ).optional(),
  NotebookInstanceName: z.string().min(1).max(64).describe(
    "The name of the new notebook instance.",
  ).optional(),
  PlatformIdentifier: z.string().describe(
    "The platform identifier of the notebook instance runtime environment. The default value is notebook-al2023-v1.",
  ).optional(),
  RoleArn: z.string().describe(
    "When you send any requests to AWS resources from the notebook instance, SageMaker AI assumes this role to perform tasks on your behalf. You must grant this role necessary permissions so SageMaker AI can perform these tasks. The policy must allow the SageMaker AI service principal (sagemaker.amazonaws.com) permissions to assume this role. To be able to pass this role to SageMaker AI, the caller of this API must have the iam:PassRole permission.",
  ),
  RootAccess: z.string().describe(
    "Whether root access is enabled or disabled for users of the notebook instance. The default value is Enabled. Lifecycle configurations need root access to be able to set up a notebook instance. Because of this, lifecycle configurations associated with a notebook instance always run with root access even if you disable root access for users.",
  ).optional(),
  SubnetId: z.string().describe(
    "The ID of the subnet in a VPC to which you would like to have a connectivity from your ML compute instance.",
  ).optional(),
  SecurityGroupIds: z.array(z.string()).describe(
    "The VPC security group IDs, in the form sg-xxxxxxxx. The security groups must be for the same VPC as specified in the subnet.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of key-value pairs to apply to this resource.",
  ).optional(),
  VolumeSizeInGB: z.number().int().min(5).max(16384).describe(
    "The size, in GB, of the ML storage volume to attach to the notebook instance. The default value is 5 GB. Expect some interruption of service if this parameter is changed as CloudFormation stops a notebook instance and starts it up again to update it.",
  ).optional(),
});

const StateSchema = z.object({
  AcceleratorTypes: z.array(z.string()).optional(),
  AdditionalCodeRepositories: z.array(z.string()).optional(),
  DefaultCodeRepository: z.string().optional(),
  DirectInternetAccess: z.string().optional(),
  InstanceMetadataServiceConfiguration: z.object({
    MinimumInstanceMetadataServiceVersion: z.string(),
  }).optional(),
  InstanceType: z.string().optional(),
  KmsKeyId: z.string().optional(),
  LifecycleConfigName: z.string().optional(),
  NotebookInstanceArn: z.string(),
  NotebookInstanceName: z.string().optional(),
  PlatformIdentifier: z.string().optional(),
  RoleArn: z.string().optional(),
  RootAccess: z.string().optional(),
  SubnetId: z.string().optional(),
  SecurityGroupIds: z.array(z.string()).optional(),
  Tags: z.array(TagSchema).optional(),
  VolumeSizeInGB: z.number().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AcceleratorTypes: z.array(z.string()).describe(
    "A list of Amazon Elastic Inference (EI) instance types to associate with the notebook instance. Currently, only one instance type can be associated with a notebook instance.",
  ).optional(),
  AdditionalCodeRepositories: z.array(z.string()).describe(
    "An array of up to three Git repositories associated with the notebook instance. These can be either the names of Git repositories stored as resources in your account, or the URL of Git repositories in AWS CodeCommit or in any other Git repository. These repositories are cloned at the same level as the default repository of your notebook instance.",
  ).optional(),
  DefaultCodeRepository: z.string().describe(
    "The Git repository associated with the notebook instance as its default code repository. This can be either the name of a Git repository stored as a resource in your account, or the URL of a Git repository in AWS CodeCommit or in any other Git repository. When you open a notebook instance, it opens in the directory that contains this repository.",
  ).optional(),
  DirectInternetAccess: z.string().describe(
    "Sets whether SageMaker AI provides internet access to the notebook instance. If you set this to Disabled this notebook instance is able to access resources only in your VPC, and is not be able to connect to SageMaker AI training and endpoint services unless you configure a NAT Gateway in your VPC. You can set the value of this parameter to Disabled only if you set a value for the SubnetId parameter.",
  ).optional(),
  InstanceMetadataServiceConfiguration: z.object({
    MinimumInstanceMetadataServiceVersion: z.string().describe(
      "Indicates the minimum IMDS version that the notebook instance supports. When passed as part of CreateNotebookInstance, if no value is selected, then it defaults to IMDSv1. This means that both IMDSv1 and IMDSv2 are supported. If passed as part of UpdateNotebookInstance, there is no default.",
    ).optional(),
  }).describe("Information on the IMDS configuration of the notebook instance.")
    .optional(),
  InstanceType: z.string().describe(
    "The type of ML compute instance to launch for the notebook instance. Expect some interruption of service if this parameter is changed as CloudFormation stops a notebook instance and starts it up again to update it.",
  ).optional(),
  KmsKeyId: z.string().describe(
    "The Amazon Resource Name (ARN) of a AWS Key Management Service key that SageMaker AI uses to encrypt data on the storage volume attached to your notebook instance. The KMS key you provide must be enabled.",
  ).optional(),
  LifecycleConfigName: z.string().describe(
    "The name of a lifecycle configuration to associate with the notebook instance.",
  ).optional(),
  NotebookInstanceName: z.string().min(1).max(64).describe(
    "The name of the new notebook instance.",
  ).optional(),
  PlatformIdentifier: z.string().describe(
    "The platform identifier of the notebook instance runtime environment. The default value is notebook-al2023-v1.",
  ).optional(),
  RoleArn: z.string().describe(
    "When you send any requests to AWS resources from the notebook instance, SageMaker AI assumes this role to perform tasks on your behalf. You must grant this role necessary permissions so SageMaker AI can perform these tasks. The policy must allow the SageMaker AI service principal (sagemaker.amazonaws.com) permissions to assume this role. To be able to pass this role to SageMaker AI, the caller of this API must have the iam:PassRole permission.",
  ).optional(),
  RootAccess: z.string().describe(
    "Whether root access is enabled or disabled for users of the notebook instance. The default value is Enabled. Lifecycle configurations need root access to be able to set up a notebook instance. Because of this, lifecycle configurations associated with a notebook instance always run with root access even if you disable root access for users.",
  ).optional(),
  SubnetId: z.string().describe(
    "The ID of the subnet in a VPC to which you would like to have a connectivity from your ML compute instance.",
  ).optional(),
  SecurityGroupIds: z.array(z.string()).describe(
    "The VPC security group IDs, in the form sg-xxxxxxxx. The security groups must be for the same VPC as specified in the subnet.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of key-value pairs to apply to this resource.",
  ).optional(),
  VolumeSizeInGB: z.number().int().min(5).max(16384).describe(
    "The size, in GB, of the ML storage volume to attach to the notebook instance. The default value is 5 GB. Expect some interruption of service if this parameter is changed as CloudFormation stops a notebook instance and starts it up again to update it.",
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

/** Swamp extension model for SageMaker NotebookInstance. Registered at `@swamp/aws/sagemaker/notebook-instance`. */
export const model = {
  type: "@swamp/aws/sagemaker/notebook-instance",
  version: "2026.10.13.1",
  upgrades: [
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "SageMaker NotebookInstance resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SageMaker NotebookInstance",
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
          "AWS::SageMaker::NotebookInstance",
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
      description: "Get a SageMaker NotebookInstance",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SageMaker NotebookInstance",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::SageMaker::NotebookInstance",
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
      description: "Update a SageMaker NotebookInstance",
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
        const identifier = existing.NotebookInstanceArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::SageMaker::NotebookInstance",
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
          "AWS::SageMaker::NotebookInstance",
          identifier,
          currentState,
          desiredState,
          [
            "DirectInternetAccess",
            "KmsKeyId",
            "NotebookInstanceName",
            "PlatformIdentifier",
            "SecurityGroupIds",
            "SubnetId",
          ],
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
      description: "Delete a SageMaker NotebookInstance",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SageMaker NotebookInstance",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::SageMaker::NotebookInstance",
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
      description: "Sync SageMaker NotebookInstance state from AWS",
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
        const identifier = existing.NotebookInstanceArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SageMaker::NotebookInstance",
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
      description: "List SageMaker NotebookInstance resources",
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
          "AWS::SageMaker::NotebookInstance",
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
            (item.properties?.NotebookInstanceArn?.toString() ??
              item.identifier).replace(/[\/\\]/g, "_").replace(/\.\./g, "_")
              .replace(/\0/g, "");
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
