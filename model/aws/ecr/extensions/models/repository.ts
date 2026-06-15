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

// Auto-generated extension model for @swamp/aws/ecr/repository
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ECR Repository (AWS::ECR::Repository).
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

const TagSchema = z.object({
  Key: z.string().min(1).max(127).describe(
    "One part of a key-value pair that make up a tag. A key is a general label that acts like a category for more specific tag values.",
  ),
  Value: z.string().min(1).max(255).describe(
    "A value acts as a descriptor within a tag category (key).",
  ),
});

const ImageTagMutabilityExclusionFilterSchema = z.object({
  ImageTagMutabilityExclusionFilterType: z.enum(["WILDCARD"]),
  ImageTagMutabilityExclusionFilterValue: z.string().min(1).max(128).regex(
    new RegExp("^[0-9a-zA-Z._*-]{1,128}"),
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
    "AWS region; overrides AWS_REGION / AWS_DEFAULT_REGION environment variables and ~/.aws/config profile region. Defaults to us-east-1.",
  ).optional(),
  EmptyOnDelete: z.boolean().describe(
    "If true, deleting the repository force deletes the contents of the repository. If false, the repository must be empty before attempting to delete it.",
  ).optional(),
  LifecyclePolicy: z.object({
    LifecyclePolicyText: z.string().min(100).max(30720).describe(
      "The JSON repository policy text to apply to the repository.",
    ).optional(),
    RegistryId: z.string().min(12).max(12).regex(new RegExp("^[0-9]{12}$"))
      .describe(
        "The AWS account ID associated with the registry that contains the repository. If you do not specify a registry, the default registry is assumed.",
      ).optional(),
  }).describe(
    "Creates or updates a lifecycle policy. For information about lifecycle policy syntax, see [Lifecycle policy template](https://docs.aws.amazon.com/AmazonECR/latest/userguide/LifecyclePolicies.html).",
  ).optional(),
  RepositoryName: z.string().min(2).max(256).regex(
    new RegExp(
      "^(?=.{2,256}$)([a-z0-9]+((\\.|_|__|-+)[a-z0-9]+)*(\\/[a-z0-9]+((\\.|_|__|-+)[a-z0-9]+)*)*)$",
    ),
  ).describe(
    "The name to use for the repository. The repository name may be specified on its own (such as nginx-web-app) or it can be prepended with a namespace to group the repository into a category (such as project-a/nginx-web-app). If you don't specify a name, CFNlong generates a unique physical ID and uses that ID for the repository name. For more information, see [Name type](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-name.html). The repository name must start with a letter and can only contain lowercase letters, numbers, hyphens, underscores, and forward slashes. If you specify a name, you cannot perform updates that require replacement of this resource. You can perform updates that require no or some interruption. If you must replace the resource, specify a new name.",
  ).optional(),
  RepositoryPolicyText: z.record(z.string(), z.unknown()).describe(
    "The JSON repository policy text to apply to the repository. For more information, see [Amazon ECR repository policies](https://docs.aws.amazon.com/AmazonECR/latest/userguide/repository-policy-examples.html) in the *Amazon Elastic Container Registry User Guide*.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
  ImageTagMutability: z.enum([
    "MUTABLE",
    "IMMUTABLE",
    "MUTABLE_WITH_EXCLUSION",
    "IMMUTABLE_WITH_EXCLUSION",
  ]).describe(
    "The tag mutability setting for the repository. If this parameter is omitted, the default setting of MUTABLE will be used which will allow image tags to be overwritten. If IMMUTABLE is specified, all image tags within the repository will be immutable which will prevent them from being overwritten.",
  ).optional(),
  ImageTagMutabilityExclusionFilters: z.array(
    ImageTagMutabilityExclusionFilterSchema,
  ).describe(
    "A list of filters that specify which image tags are excluded from the repository's image tag mutability setting.",
  ).optional(),
  ImageScanningConfiguration: z.object({
    ScanOnPush: z.boolean().describe(
      "The setting that determines whether images are scanned after being pushed to a repository. If set to true, images will be scanned after being pushed. If this parameter is not specified, it will default to false and images will not be scanned unless a scan is manually started.",
    ).optional(),
  }).describe(
    "The imageScanningConfiguration parameter is being deprecated, in favor of specifying the image scanning configuration at the registry level. For more information, see PutRegistryScanningConfiguration. The image scanning configuration for the repository. This determines whether images are scanned for known vulnerabilities after being pushed to the repository.",
  ).optional(),
  EncryptionConfiguration: z.object({
    EncryptionType: z.enum(["AES256", "KMS", "KMS_DSSE"]).describe(
      "The encryption type to use. If you use the KMS encryption type, the contents of the repository will be encrypted using server-side encryption with KMSlong key stored in KMS. When you use KMS to encrypt your data, you can either use the default AWS managed KMS key for Amazon ECR, or specify your own KMS key, which you already created. If you use the KMS_DSSE encryption type, the contents of the repository will be encrypted with two layers of encryption using server-side encryption with the KMS Management Service key stored in KMS. Similar to the KMS encryption type, you can either use the default AWS managed KMS key for Amazon ECR, or specify your own KMS key, which you've already created. If you use the AES256 encryption type, Amazon ECR uses server-side encryption with Amazon S3-managed encryption keys which encrypts the images in the repository using an AES256 encryption algorithm. For more information, see [Amazon ECR encryption at rest](https://docs.aws.amazon.com/AmazonECR/latest/userguide/encryption-at-rest.html) in the *Amazon Elastic Container Registry User Guide*.",
    ),
    KmsKey: z.string().min(1).max(2048).describe(
      "If you use the KMS encryption type, specify the KMS key to use for encryption. The alias, key ID, or full ARN of the KMS key can be specified. The key must exist in the same Region as the repository. If no key is specified, the default AWS managed KMS key for Amazon ECR will be used.",
    ).optional(),
  }).describe(
    "The encryption configuration for the repository. This determines how the contents of your repository are encrypted at rest.",
  ).optional(),
});

const StateSchema = z.object({
  EmptyOnDelete: z.boolean().optional(),
  LifecyclePolicy: z.object({
    LifecyclePolicyText: z.string(),
    RegistryId: z.string(),
  }).optional(),
  RepositoryName: z.string(),
  RepositoryPolicyText: z.union([z.string(), z.record(z.string(), z.unknown())])
    .optional(),
  Tags: z.array(TagSchema).optional(),
  Arn: z.string().optional(),
  RepositoryUri: z.string().optional(),
  ImageTagMutability: z.string().optional(),
  ImageTagMutabilityExclusionFilters: z.array(
    ImageTagMutabilityExclusionFilterSchema,
  ).optional(),
  ImageScanningConfiguration: z.object({
    ScanOnPush: z.boolean(),
  }).optional(),
  EncryptionConfiguration: z.object({
    EncryptionType: z.string(),
    KmsKey: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  EmptyOnDelete: z.boolean().describe(
    "If true, deleting the repository force deletes the contents of the repository. If false, the repository must be empty before attempting to delete it.",
  ).optional(),
  LifecyclePolicy: z.object({
    LifecyclePolicyText: z.string().min(100).max(30720).describe(
      "The JSON repository policy text to apply to the repository.",
    ).optional(),
    RegistryId: z.string().min(12).max(12).regex(new RegExp("^[0-9]{12}$"))
      .describe(
        "The AWS account ID associated with the registry that contains the repository. If you do not specify a registry, the default registry is assumed.",
      ).optional(),
  }).describe(
    "Creates or updates a lifecycle policy. For information about lifecycle policy syntax, see [Lifecycle policy template](https://docs.aws.amazon.com/AmazonECR/latest/userguide/LifecyclePolicies.html).",
  ).optional(),
  RepositoryName: z.string().min(2).max(256).regex(
    new RegExp(
      "^(?=.{2,256}$)([a-z0-9]+((\\.|_|__|-+)[a-z0-9]+)*(\\/[a-z0-9]+((\\.|_|__|-+)[a-z0-9]+)*)*)$",
    ),
  ).describe(
    "The name to use for the repository. The repository name may be specified on its own (such as nginx-web-app) or it can be prepended with a namespace to group the repository into a category (such as project-a/nginx-web-app). If you don't specify a name, CFNlong generates a unique physical ID and uses that ID for the repository name. For more information, see [Name type](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-name.html). The repository name must start with a letter and can only contain lowercase letters, numbers, hyphens, underscores, and forward slashes. If you specify a name, you cannot perform updates that require replacement of this resource. You can perform updates that require no or some interruption. If you must replace the resource, specify a new name.",
  ).optional(),
  RepositoryPolicyText: z.record(z.string(), z.unknown()).describe(
    "The JSON repository policy text to apply to the repository. For more information, see [Amazon ECR repository policies](https://docs.aws.amazon.com/AmazonECR/latest/userguide/repository-policy-examples.html) in the *Amazon Elastic Container Registry User Guide*.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
  ImageTagMutability: z.enum([
    "MUTABLE",
    "IMMUTABLE",
    "MUTABLE_WITH_EXCLUSION",
    "IMMUTABLE_WITH_EXCLUSION",
  ]).describe(
    "The tag mutability setting for the repository. If this parameter is omitted, the default setting of MUTABLE will be used which will allow image tags to be overwritten. If IMMUTABLE is specified, all image tags within the repository will be immutable which will prevent them from being overwritten.",
  ).optional(),
  ImageTagMutabilityExclusionFilters: z.array(
    ImageTagMutabilityExclusionFilterSchema,
  ).describe(
    "A list of filters that specify which image tags are excluded from the repository's image tag mutability setting.",
  ).optional(),
  ImageScanningConfiguration: z.object({
    ScanOnPush: z.boolean().describe(
      "The setting that determines whether images are scanned after being pushed to a repository. If set to true, images will be scanned after being pushed. If this parameter is not specified, it will default to false and images will not be scanned unless a scan is manually started.",
    ).optional(),
  }).describe(
    "The imageScanningConfiguration parameter is being deprecated, in favor of specifying the image scanning configuration at the registry level. For more information, see PutRegistryScanningConfiguration. The image scanning configuration for the repository. This determines whether images are scanned for known vulnerabilities after being pushed to the repository.",
  ).optional(),
  EncryptionConfiguration: z.object({
    EncryptionType: z.enum(["AES256", "KMS", "KMS_DSSE"]).describe(
      "The encryption type to use. If you use the KMS encryption type, the contents of the repository will be encrypted using server-side encryption with KMSlong key stored in KMS. When you use KMS to encrypt your data, you can either use the default AWS managed KMS key for Amazon ECR, or specify your own KMS key, which you already created. If you use the KMS_DSSE encryption type, the contents of the repository will be encrypted with two layers of encryption using server-side encryption with the KMS Management Service key stored in KMS. Similar to the KMS encryption type, you can either use the default AWS managed KMS key for Amazon ECR, or specify your own KMS key, which you've already created. If you use the AES256 encryption type, Amazon ECR uses server-side encryption with Amazon S3-managed encryption keys which encrypts the images in the repository using an AES256 encryption algorithm. For more information, see [Amazon ECR encryption at rest](https://docs.aws.amazon.com/AmazonECR/latest/userguide/encryption-at-rest.html) in the *Amazon Elastic Container Registry User Guide*.",
    ).optional(),
    KmsKey: z.string().min(1).max(2048).describe(
      "If you use the KMS encryption type, specify the KMS key to use for encryption. The alias, key ID, or full ARN of the KMS key can be specified. The key must exist in the same Region as the repository. If no key is specified, the default AWS managed KMS key for Amazon ECR will be used.",
    ).optional(),
  }).describe(
    "The encryption configuration for the repository. This determines how the contents of your repository are encrypted at rest.",
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

/** Swamp extension model for ECR Repository. Registered at `@swamp/aws/ecr/repository`. */
export const model = {
  type: "@swamp/aws/ecr/repository",
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
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.27.1",
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
      description: "ECR Repository resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ECR Repository",
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
          "AWS::ECR::Repository",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.RepositoryName ?? g.RepositoryName)?.toString() ?? "current")
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
      description: "Get a ECR Repository",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ECR Repository",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::ECR::Repository",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.RepositoryName ?? context.globalArgs.RepositoryName)
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
      description: "Update a ECR Repository",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.RepositoryName?.toString() ?? "current")
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
        const identifier = existing.RepositoryName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::ECR::Repository",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::ECR::Repository",
          identifier,
          currentState,
          desiredState,
          [
            "RepositoryName",
            "EncryptionConfiguration",
            "EncryptionType",
            "KmsKey",
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
      description: "Delete a ECR Repository",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ECR Repository",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::ECR::Repository",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.RepositoryName?.toString() ?? args.identifier)
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
      description: "Sync ECR Repository state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.RepositoryName?.toString() ?? "current")
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
        const identifier = existing.RepositoryName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::ECR::Repository",
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
