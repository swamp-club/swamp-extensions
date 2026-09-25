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

// Auto-generated extension model for @swamp/aws/comprehend/entity-recognizer
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any no-control-regex

/**
 * Swamp extension model for Comprehend EntityRecognizer (AWS::Comprehend::EntityRecognizer).
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

const EntityTypesListItemSchema = z.object({
  Type: z.string().max(64).regex(
    new RegExp("^(?![^\\n\\r\\t,]*\\\\n|\\\\r|\\\\t)[^\\n\\r\\t,]+$"),
  ).describe("An entity type within a labeled training dataset."),
});

const EntityRecognizerDocumentsSchema = z.object({
  S3Uri: z.string().max(1024).regex(
    new RegExp("^s3://[a-z0-9][\\.\\-a-z0-9]{1,61}[a-z0-9](/.*)?$"),
  ).describe(
    "Specifies the Amazon S3 location where the training documents are located.",
  ),
  TestS3Uri: z.string().max(1024).regex(
    new RegExp("^s3://[a-z0-9][\\.\\-a-z0-9]{1,61}[a-z0-9](/.*)?$"),
  ).describe(
    "Specifies the Amazon S3 location where the test documents are located.",
  ).optional(),
  InputFormat: z.enum(["ONE_DOC_PER_FILE", "ONE_DOC_PER_LINE"]).describe(
    "Specifies how the text in an input file should be processed.",
  ).optional(),
});

const EntityRecognizerAnnotationsSchema = z.object({
  S3Uri: z.string().max(1024).regex(
    new RegExp("^s3://[a-z0-9][\\.\\-a-z0-9]{1,61}[a-z0-9](/.*)?$"),
  ).describe(
    "Specifies the Amazon S3 location where the annotations are located.",
  ),
  TestS3Uri: z.string().max(1024).regex(
    new RegExp("^s3://[a-z0-9][\\.\\-a-z0-9]{1,61}[a-z0-9](/.*)?$"),
  ).describe(
    "Specifies the Amazon S3 location where the test annotations are located.",
  ).optional(),
});

const EntityRecognizerEntityListSchema = z.object({
  S3Uri: z.string().max(1024).regex(
    new RegExp("^s3://[a-z0-9][\\.\\-a-z0-9]{1,61}[a-z0-9](/.*)?$"),
  ).describe(
    "Specifies the Amazon S3 location where the entity list is located.",
  ),
});

const AugmentedManifestsListItemSchema = z.object({
  S3Uri: z.string().max(1024).regex(
    new RegExp("^s3://[a-z0-9][\\.\\-a-z0-9]{1,61}[a-z0-9](/.*)?$"),
  ).describe("The Amazon S3 location of the augmented manifest file."),
  Split: z.enum(["TRAIN", "TEST"]).describe(
    "The purpose of the data you've provided in the augmented manifest.",
  ).optional(),
  AttributeNames: z.array(
    z.string().min(1).max(63).regex(
      new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9])*$"),
    ),
  ).describe(
    "The JSON attribute that contains the annotations for your training documents.",
  ),
  AnnotationDataS3Uri: z.string().max(1024).regex(
    new RegExp("^s3://[a-z0-9][\\.\\-a-z0-9]{1,61}[a-z0-9](/.*)?$"),
  ).describe(
    "The S3 prefix to the annotation files that are referred in the augmented manifest file.",
  ).optional(),
  SourceDocumentsS3Uri: z.string().max(1024).regex(
    new RegExp("^s3://[a-z0-9][\\.\\-a-z0-9]{1,61}[a-z0-9](/.*)?$"),
  ).describe(
    "The S3 prefix to the source files (PDFs) that are referred to in the augmented manifest file.",
  ).optional(),
  DocumentType: z.enum(["PLAIN_TEXT_DOCUMENT", "SEMI_STRUCTURED_DOCUMENT"])
    .describe("The type of augmented manifest.").optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe(
    "The key of the key-value pair that forms a tag.",
  ),
  Value: z.string().min(0).max(256).describe(
    "The value of the key-value pair that forms a tag.",
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
  RecognizerName: z.string().max(63).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9])*$"),
  ).describe("The name given to the entity recognizer."),
  VersionName: z.string().max(63).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9])*$"),
  ).describe("The version name given to the entity recognizer.").optional(),
  DataAccessRoleArn: z.string().min(20).max(2048).regex(
    new RegExp("^arn:aws(-[^:]+)?:iam::[0-9]{12}:role/.+$"),
  ).describe(
    "The Amazon Resource Name (ARN) of the IAM role that grants Amazon Comprehend read access to your input data.",
  ),
  LanguageCode: z.enum([
    "en",
    "es",
    "fr",
    "de",
    "it",
    "pt",
    "ar",
    "hi",
    "ja",
    "ko",
    "zh",
    "zh-TW",
  ]).describe(
    "The language of the input documents. All documents must be in the same language.",
  ),
  InputDataConfig: z.object({
    DataFormat: z.enum(["COMPREHEND_CSV", "AUGMENTED_MANIFEST"]).describe(
      "The format of your training data.",
    ).optional(),
    EntityTypes: z.array(EntityTypesListItemSchema).describe(
      "The entity types in the labeled training data.",
    ),
    Documents: EntityRecognizerDocumentsSchema.describe(
      "The S3 location of the folder that contains the training documents.",
    ).optional(),
    Annotations: EntityRecognizerAnnotationsSchema.describe(
      "The S3 location of the CSV file that annotates your training documents.",
    ).optional(),
    EntityList: EntityRecognizerEntityListSchema.describe(
      "The S3 location of the CSV file that has the entity list.",
    ).optional(),
    AugmentedManifests: z.array(AugmentedManifestsListItemSchema).describe(
      "A list of augmented manifest files that provide training data for a custom model.",
    ).optional(),
  }).describe(
    "Specifies the format and location of the input data. The S3 bucket containing the input data must be located in the same Region as the entity recognizer being created.",
  ),
  VolumeKmsKeyId: z.string().max(2048).regex(new RegExp("^\\p{ASCII}+$", "u"))
    .describe(
      "ID for the AWS KMS key that Amazon Comprehend uses to encrypt data on the storage volume attached to the ML compute instance(s).",
    ).optional(),
  ModelKmsKeyId: z.string().max(2048).regex(new RegExp("^\\p{ASCII}+$", "u"))
    .describe(
      "ID for the AWS KMS key that Amazon Comprehend uses to encrypt trained custom models.",
    ).optional(),
  VpcConfig: z.object({
    SecurityGroupIds: z.array(
      z.string().min(1).max(32).regex(new RegExp("^[-0-9a-zA-Z]+$")),
    ).describe(
      "The ID number for a security group on an instance of your private VPC.",
    ),
    Subnets: z.array(
      z.string().min(1).max(32).regex(new RegExp("^[-0-9a-zA-Z]+$")),
    ).describe("The ID for each subnet being used in your private VPC."),
  }).describe(
    "Configuration parameters for an optional private VPC containing the resources you are using for your custom entity recognizer.",
  ).optional(),
  ModelPolicy: z.string().min(1).max(20000).regex(
    new RegExp("^[\\u0009\\u000A\\u000D\\u0020-\\u00FF]+$"),
  ).describe(
    "The JSON resource-based policy to attach to your custom entity recognizer model.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "Tags to associate with the entity recognizer.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  RecognizerName: z.string().optional(),
  VersionName: z.string().optional(),
  DataAccessRoleArn: z.string().optional(),
  LanguageCode: z.string().optional(),
  InputDataConfig: z.object({
    DataFormat: z.string(),
    EntityTypes: z.array(EntityTypesListItemSchema),
    Documents: EntityRecognizerDocumentsSchema,
    Annotations: EntityRecognizerAnnotationsSchema,
    EntityList: EntityRecognizerEntityListSchema,
    AugmentedManifests: z.array(AugmentedManifestsListItemSchema),
  }).optional(),
  VolumeKmsKeyId: z.string().optional(),
  ModelKmsKeyId: z.string().optional(),
  VpcConfig: z.object({
    SecurityGroupIds: z.array(z.string()),
    Subnets: z.array(z.string()),
  }).optional(),
  ModelPolicy: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  RecognizerName: z.string().max(63).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9])*$"),
  ).describe("The name given to the entity recognizer.").optional(),
  VersionName: z.string().max(63).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9])*$"),
  ).describe("The version name given to the entity recognizer.").optional(),
  DataAccessRoleArn: z.string().min(20).max(2048).regex(
    new RegExp("^arn:aws(-[^:]+)?:iam::[0-9]{12}:role/.+$"),
  ).describe(
    "The Amazon Resource Name (ARN) of the IAM role that grants Amazon Comprehend read access to your input data.",
  ).optional(),
  LanguageCode: z.enum([
    "en",
    "es",
    "fr",
    "de",
    "it",
    "pt",
    "ar",
    "hi",
    "ja",
    "ko",
    "zh",
    "zh-TW",
  ]).describe(
    "The language of the input documents. All documents must be in the same language.",
  ).optional(),
  InputDataConfig: z.object({
    DataFormat: z.enum(["COMPREHEND_CSV", "AUGMENTED_MANIFEST"]).describe(
      "The format of your training data.",
    ).optional(),
    EntityTypes: z.array(EntityTypesListItemSchema).describe(
      "The entity types in the labeled training data.",
    ).optional(),
    Documents: EntityRecognizerDocumentsSchema.describe(
      "The S3 location of the folder that contains the training documents.",
    ).optional(),
    Annotations: EntityRecognizerAnnotationsSchema.describe(
      "The S3 location of the CSV file that annotates your training documents.",
    ).optional(),
    EntityList: EntityRecognizerEntityListSchema.describe(
      "The S3 location of the CSV file that has the entity list.",
    ).optional(),
    AugmentedManifests: z.array(AugmentedManifestsListItemSchema).describe(
      "A list of augmented manifest files that provide training data for a custom model.",
    ).optional(),
  }).describe(
    "Specifies the format and location of the input data. The S3 bucket containing the input data must be located in the same Region as the entity recognizer being created.",
  ).optional(),
  VolumeKmsKeyId: z.string().max(2048).regex(new RegExp("^\\p{ASCII}+$", "u"))
    .describe(
      "ID for the AWS KMS key that Amazon Comprehend uses to encrypt data on the storage volume attached to the ML compute instance(s).",
    ).optional(),
  ModelKmsKeyId: z.string().max(2048).regex(new RegExp("^\\p{ASCII}+$", "u"))
    .describe(
      "ID for the AWS KMS key that Amazon Comprehend uses to encrypt trained custom models.",
    ).optional(),
  VpcConfig: z.object({
    SecurityGroupIds: z.array(
      z.string().min(1).max(32).regex(new RegExp("^[-0-9a-zA-Z]+$")),
    ).describe(
      "The ID number for a security group on an instance of your private VPC.",
    ).optional(),
    Subnets: z.array(
      z.string().min(1).max(32).regex(new RegExp("^[-0-9a-zA-Z]+$")),
    ).describe("The ID for each subnet being used in your private VPC.")
      .optional(),
  }).describe(
    "Configuration parameters for an optional private VPC containing the resources you are using for your custom entity recognizer.",
  ).optional(),
  ModelPolicy: z.string().min(1).max(20000).regex(
    new RegExp("^[\\u0009\\u000A\\u000D\\u0020-\\u00FF]+$"),
  ).describe(
    "The JSON resource-based policy to attach to your custom entity recognizer model.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "Tags to associate with the entity recognizer.",
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

/** Swamp extension model for Comprehend EntityRecognizer. Registered at `@swamp/aws/comprehend/entity-recognizer`. */
export const model = {
  type: "@swamp/aws/comprehend/entity-recognizer",
  version: "2026.09.25.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Comprehend EntityRecognizer resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Comprehend EntityRecognizer",
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
          "AWS::Comprehend::EntityRecognizer",
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
      description: "Get a Comprehend EntityRecognizer",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Comprehend EntityRecognizer",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Comprehend::EntityRecognizer",
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
      description: "Update a Comprehend EntityRecognizer",
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
          "AWS::Comprehend::EntityRecognizer",
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
          "AWS::Comprehend::EntityRecognizer",
          identifier,
          currentState,
          desiredState,
          [
            "RecognizerName",
            "VersionName",
            "DataAccessRoleArn",
            "InputDataConfig",
            "LanguageCode",
            "VolumeKmsKeyId",
            "ModelKmsKeyId",
            "VpcConfig",
            "ModelPolicy",
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
      description: "Delete a Comprehend EntityRecognizer",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Comprehend EntityRecognizer",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Comprehend::EntityRecognizer",
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
      description: "Sync Comprehend EntityRecognizer state from AWS",
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
            "AWS::Comprehend::EntityRecognizer",
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
      description: "List Comprehend EntityRecognizer resources",
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
          "AWS::Comprehend::EntityRecognizer",
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
