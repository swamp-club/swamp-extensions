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

// Auto-generated extension model for @swamp/aws/ecr/repository-creation-template
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ECR RepositoryCreationTemplate (AWS::ECR::RepositoryCreationTemplate).
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

const ImageTagMutabilityExclusionFilterSchema = z.object({
  ImageTagMutabilityExclusionFilterType: z.enum(["WILDCARD"]),
  ImageTagMutabilityExclusionFilterValue: z.string().min(1).max(128).regex(
    new RegExp("^[0-9a-zA-Z._*-]{1,128}"),
  ),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe(
    "One part of a key-value pair that make up a tag. A key is a general label that acts like a category for more specific tag values.",
  ),
  Value: z.string().min(0).max(256).describe(
    "A value acts as a descriptor within a tag category (key).",
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
  Prefix: z.string().min(1).max(256).regex(
    new RegExp(
      "^([a-z0-9]+((\\.|_|__|-+)[a-z0-9]+)*(\\/[a-z0-9]+((\\.|_|__|-+)[a-z0-9]+)*)*\\/?|ROOT)$",
    ),
  ).describe(
    "The repository namespace prefix associated with the repository creation template.",
  ),
  Description: z.string().min(0).max(256).describe(
    "The description associated with the repository creation template.",
  ).optional(),
  ImageTagMutability: z.enum([
    "MUTABLE",
    "IMMUTABLE",
    "IMMUTABLE_WITH_EXCLUSION",
    "MUTABLE_WITH_EXCLUSION",
  ]).describe(
    "The tag mutability setting for the repository. If this parameter is omitted, the default setting of MUTABLE will be used which will allow image tags to be overwritten. If IMMUTABLE is specified, all image tags within the repository will be immutable which will prevent them from being overwritten.",
  ).optional(),
  ImageTagMutabilityExclusionFilters: z.array(
    ImageTagMutabilityExclusionFilterSchema,
  ).describe(
    "A list of filters that specify which image tags are excluded from the repository creation template's image tag mutability setting.",
  ).optional(),
  RepositoryPolicy: z.string().describe(
    "The repository policy to apply to repositories created using the template. A repository policy is a permissions policy associated with a repository to control access permissions.",
  ).optional(),
  LifecyclePolicy: z.string().min(100).max(30720).describe(
    "The lifecycle policy to use for repositories created using the template.",
  ).optional(),
  EncryptionConfiguration: z.object({
    EncryptionType: z.enum(["AES256", "KMS", "KMS_DSSE"]).describe(
      "The encryption type to use. If you use the KMS encryption type, the contents of the repository will be encrypted using server-side encryption with KMSlong key stored in KMS. When you use KMS to encrypt your data, you can either use the default AWS managed KMS key for Amazon ECR, or specify your own KMS key, which you already created. If you use the KMS_DSSE encryption type, the contents of the repository will be encrypted with two layers of encryption using server-side encryption with the KMS Management Service key stored in KMS. Similar to the KMS encryption type, you can either use the default AWS managed KMS key for Amazon ECR, or specify your own KMS key, which you've already created. If you use the AES256 encryption type, Amazon ECR uses server-side encryption with Amazon S3-managed encryption keys which encrypts the images in the repository using an AES256 encryption algorithm. For more information, see [Amazon ECR encryption at rest](https://docs.aws.amazon.com/AmazonECR/latest/userguide/encryption-at-rest.html) in the *Amazon Elastic Container Registry User Guide*.",
    ),
    KmsKey: z.string().min(1).max(2048).describe(
      "If you use the KMS encryption type, specify the KMS key to use for encryption. The alias, key ID, or full ARN of the KMS key can be specified. The key must exist in the same Region as the repository. If no key is specified, the default AWS managed KMS key for Amazon ECR will be used.",
    ).optional(),
  }).describe(
    "The encryption configuration associated with the repository creation template.",
  ).optional(),
  ResourceTags: z.array(TagSchema).describe(
    "The metadata to apply to the repository to help you categorize and organize. Each tag consists of a key and an optional value, both of which you define. Tag keys can have a maximum character length of 128 characters, and tag values can have a maximum length of 256 characters.",
  ).optional(),
  AppliedFor: z.array(
    z.enum(["REPLICATION", "PULL_THROUGH_CACHE", "CREATE_ON_PUSH"]),
  ).describe(
    "A list of enumerable Strings representing the repository creation scenarios that this template will apply towards. The supported scenarios are PULL_THROUGH_CACHE, REPLICATION, and CREATE_ON_PUSH",
  ),
  CustomRoleArn: z.string().max(2048).regex(
    new RegExp("^arn:aws[-a-z0-9]*:iam::[0-9]{12}:role/[A-Za-z0-9+=,-.@_]*$"),
  ).describe(
    "The ARN of the role to be assumed by Amazon ECR. Amazon ECR will assume your supplied role when the customRoleArn is specified. When this field isn't specified, Amazon ECR will use the service-linked role for the repository creation template.",
  ).optional(),
});

const StateSchema = z.object({
  Prefix: z.string(),
  Description: z.string().optional(),
  ImageTagMutability: z.string().optional(),
  ImageTagMutabilityExclusionFilters: z.array(
    ImageTagMutabilityExclusionFilterSchema,
  ).optional(),
  RepositoryPolicy: z.string().optional(),
  LifecyclePolicy: z.string().optional(),
  EncryptionConfiguration: z.object({
    EncryptionType: z.string(),
    KmsKey: z.string(),
  }).optional(),
  ResourceTags: z.array(TagSchema).optional(),
  AppliedFor: z.array(z.string()).optional(),
  CustomRoleArn: z.string().optional(),
  CreatedAt: z.string().optional(),
  UpdatedAt: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Prefix: z.string().min(1).max(256).regex(
    new RegExp(
      "^([a-z0-9]+((\\.|_|__|-+)[a-z0-9]+)*(\\/[a-z0-9]+((\\.|_|__|-+)[a-z0-9]+)*)*\\/?|ROOT)$",
    ),
  ).describe(
    "The repository namespace prefix associated with the repository creation template.",
  ).optional(),
  Description: z.string().min(0).max(256).describe(
    "The description associated with the repository creation template.",
  ).optional(),
  ImageTagMutability: z.enum([
    "MUTABLE",
    "IMMUTABLE",
    "IMMUTABLE_WITH_EXCLUSION",
    "MUTABLE_WITH_EXCLUSION",
  ]).describe(
    "The tag mutability setting for the repository. If this parameter is omitted, the default setting of MUTABLE will be used which will allow image tags to be overwritten. If IMMUTABLE is specified, all image tags within the repository will be immutable which will prevent them from being overwritten.",
  ).optional(),
  ImageTagMutabilityExclusionFilters: z.array(
    ImageTagMutabilityExclusionFilterSchema,
  ).describe(
    "A list of filters that specify which image tags are excluded from the repository creation template's image tag mutability setting.",
  ).optional(),
  RepositoryPolicy: z.string().describe(
    "The repository policy to apply to repositories created using the template. A repository policy is a permissions policy associated with a repository to control access permissions.",
  ).optional(),
  LifecyclePolicy: z.string().min(100).max(30720).describe(
    "The lifecycle policy to use for repositories created using the template.",
  ).optional(),
  EncryptionConfiguration: z.object({
    EncryptionType: z.enum(["AES256", "KMS", "KMS_DSSE"]).describe(
      "The encryption type to use. If you use the KMS encryption type, the contents of the repository will be encrypted using server-side encryption with KMSlong key stored in KMS. When you use KMS to encrypt your data, you can either use the default AWS managed KMS key for Amazon ECR, or specify your own KMS key, which you already created. If you use the KMS_DSSE encryption type, the contents of the repository will be encrypted with two layers of encryption using server-side encryption with the KMS Management Service key stored in KMS. Similar to the KMS encryption type, you can either use the default AWS managed KMS key for Amazon ECR, or specify your own KMS key, which you've already created. If you use the AES256 encryption type, Amazon ECR uses server-side encryption with Amazon S3-managed encryption keys which encrypts the images in the repository using an AES256 encryption algorithm. For more information, see [Amazon ECR encryption at rest](https://docs.aws.amazon.com/AmazonECR/latest/userguide/encryption-at-rest.html) in the *Amazon Elastic Container Registry User Guide*.",
    ).optional(),
    KmsKey: z.string().min(1).max(2048).describe(
      "If you use the KMS encryption type, specify the KMS key to use for encryption. The alias, key ID, or full ARN of the KMS key can be specified. The key must exist in the same Region as the repository. If no key is specified, the default AWS managed KMS key for Amazon ECR will be used.",
    ).optional(),
  }).describe(
    "The encryption configuration associated with the repository creation template.",
  ).optional(),
  ResourceTags: z.array(TagSchema).describe(
    "The metadata to apply to the repository to help you categorize and organize. Each tag consists of a key and an optional value, both of which you define. Tag keys can have a maximum character length of 128 characters, and tag values can have a maximum length of 256 characters.",
  ).optional(),
  AppliedFor: z.array(
    z.enum(["REPLICATION", "PULL_THROUGH_CACHE", "CREATE_ON_PUSH"]),
  ).describe(
    "A list of enumerable Strings representing the repository creation scenarios that this template will apply towards. The supported scenarios are PULL_THROUGH_CACHE, REPLICATION, and CREATE_ON_PUSH",
  ).optional(),
  CustomRoleArn: z.string().max(2048).regex(
    new RegExp("^arn:aws[-a-z0-9]*:iam::[0-9]{12}:role/[A-Za-z0-9+=,-.@_]*$"),
  ).describe(
    "The ARN of the role to be assumed by Amazon ECR. Amazon ECR will assume your supplied role when the customRoleArn is specified. When this field isn't specified, Amazon ECR will use the service-linked role for the repository creation template.",
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

/** Swamp extension model for ECR RepositoryCreationTemplate. Registered at `@swamp/aws/ecr/repository-creation-template`. */
export const model = {
  type: "@swamp/aws/ecr/repository-creation-template",
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
      description: "ECR RepositoryCreationTemplate resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ECR RepositoryCreationTemplate",
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
          "AWS::ECR::RepositoryCreationTemplate",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.Prefix ?? g.Prefix)?.toString() ?? "current").replace(
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
      description: "Get a ECR RepositoryCreationTemplate",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ECR RepositoryCreationTemplate",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::ECR::RepositoryCreationTemplate",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.Prefix ?? context.globalArgs.Prefix)?.toString() ??
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
      description: "Update a ECR RepositoryCreationTemplate",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.Prefix?.toString() ?? "current").replace(
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
        const identifier = existing.Prefix?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::ECR::RepositoryCreationTemplate",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::ECR::RepositoryCreationTemplate",
          identifier,
          currentState,
          desiredState,
          ["Prefix"],
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
      description: "Delete a ECR RepositoryCreationTemplate",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ECR RepositoryCreationTemplate",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::ECR::RepositoryCreationTemplate",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.Prefix?.toString() ?? args.identifier).replace(
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
      description: "Sync ECR RepositoryCreationTemplate state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.Prefix?.toString() ?? "current").replace(
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
        const identifier = existing.Prefix?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::ECR::RepositoryCreationTemplate",
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
