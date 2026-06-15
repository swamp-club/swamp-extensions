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

// Auto-generated extension model for @swamp/aws/rekognition/stream-processor
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Rekognition StreamProcessor (AWS::Rekognition::StreamProcessor).
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

const PointSchema = z.object({
  X: z.number().describe("The X coordinate of the point."),
  Y: z.number().describe("The Y coordinate of the point."),
});

const BoundingBoxSchema = z.object({
  Height: z.number().min(0).max(100),
  Width: z.number().min(0).max(100),
  Left: z.number().min(0).max(100),
  Top: z.number().min(0).max(100),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^(?!aws:)[a-zA-Z0-9+\\-=\\._\\:\\/@]+$"),
  ).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().min(0).max(256).regex(
    new RegExp("^[a-zA-Z0-9+\\-=\\._\\:\\/@]+$"),
  ).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
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
  Name: z.string().min(1).max(128).regex(new RegExp("[a-zA-Z0-9_.\\-]+"))
    .describe(
      "Name of the stream processor. It's an identifier you assign to the stream processor. You can use it to manage the stream processor.",
    ).optional(),
  KmsKeyId: z.string().describe(
    "The KMS key that is used by Rekognition to encrypt any intermediate customer metadata and store in the customer's S3 bucket.",
  ).optional(),
  RoleArn: z.string().max(2048).regex(
    new RegExp("arn:aws(-[\\w]+)*:iam::[0-9]{12}:role/.*"),
  ).describe(
    "ARN of the IAM role that allows access to the stream processor, and provides Rekognition read permissions for KVS stream and write permissions to S3 bucket and SNS topic.",
  ),
  FaceSearchSettings: z.object({
    CollectionId: z.string().max(255).regex(new RegExp("^[a-zA-Z0-9_\\.\\-]+$"))
      .describe(
        "The ID of a collection that contains faces that you want to search for.",
      ),
    FaceMatchThreshold: z.number().min(0).max(100).describe(
      "Minimum face match confidence score percentage that must be met to return a result for a recognized face. The default is 80. 0 is the lowest confidence. 100 is the highest confidence. Values between 0 and 100 are accepted.",
    ).optional(),
  }).describe(
    "Face search settings to use on a streaming video. Note that either FaceSearchSettings or ConnectedHomeSettings should be set. Not both",
  ).optional(),
  ConnectedHomeSettings: z.object({
    Labels: z.array(z.string().min(1).max(128)).describe(
      "List of labels that need to be detected in the video stream. Current supported values are PERSON, PET, PACKAGE, ALL.",
    ),
    MinConfidence: z.number().min(0).max(100).describe(
      "Minimum object class match confidence score that must be met to return a result for a recognized object.",
    ).optional(),
  }).describe(
    "Connected home settings to use on a streaming video. Note that either ConnectedHomeSettings or FaceSearchSettings should be set. Not both",
  ).optional(),
  S3Destination: z.object({
    BucketName: z.string().max(63).describe("Name of the S3 bucket."),
    ObjectKeyPrefix: z.string().max(256).describe(
      "The object key prefix path where the results will be stored. Default is no prefix path",
    ).optional(),
  }).describe(
    "The S3 location in customer's account where inference output & artifacts are stored, as part of connected home feature.",
  ).optional(),
  DataSharingPreference: z.object({
    OptIn: z.boolean().describe("Flag to enable data-sharing"),
  }).describe(
    "Indicates whether Rekognition is allowed to store the video stream data for model-training.",
  ).optional(),
  PolygonRegionsOfInterest: z.array(z.array(PointSchema)).describe(
    "The PolygonRegionsOfInterest specifies a set of polygon areas of interest in the video frames to analyze, as part of connected home feature. Each polygon is in turn, an ordered list of Point",
  ).optional(),
  BoundingBoxRegionsOfInterest: z.array(BoundingBoxSchema).describe(
    "The BoundingBoxRegionsOfInterest specifies an array of bounding boxes of interest in the video frames to analyze, as part of connected home feature. If an object is partially in a region of interest, Rekognition will tag it as detected if the overlap of the object with the region-of-interest is greater than 20%.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string().optional(),
  Name: z.string(),
  KmsKeyId: z.string().optional(),
  RoleArn: z.string().optional(),
  KinesisVideoStream: z.object({
    Arn: z.string(),
  }).optional(),
  FaceSearchSettings: z.object({
    CollectionId: z.string(),
    FaceMatchThreshold: z.number(),
  }).optional(),
  ConnectedHomeSettings: z.object({
    Labels: z.array(z.string()),
    MinConfidence: z.number(),
  }).optional(),
  KinesisDataStream: z.object({
    Arn: z.string(),
  }).optional(),
  S3Destination: z.object({
    BucketName: z.string(),
    ObjectKeyPrefix: z.string(),
  }).optional(),
  NotificationChannel: z.object({
    Arn: z.string(),
  }).optional(),
  DataSharingPreference: z.object({
    OptIn: z.boolean(),
  }).optional(),
  PolygonRegionsOfInterest: z.array(z.array(PointSchema)).optional(),
  BoundingBoxRegionsOfInterest: z.array(BoundingBoxSchema).optional(),
  Status: z.string().optional(),
  StatusMessage: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().min(1).max(128).regex(new RegExp("[a-zA-Z0-9_.\\-]+"))
    .describe(
      "Name of the stream processor. It's an identifier you assign to the stream processor. You can use it to manage the stream processor.",
    ).optional(),
  KmsKeyId: z.string().describe(
    "The KMS key that is used by Rekognition to encrypt any intermediate customer metadata and store in the customer's S3 bucket.",
  ).optional(),
  RoleArn: z.string().max(2048).regex(
    new RegExp("arn:aws(-[\\w]+)*:iam::[0-9]{12}:role/.*"),
  ).describe(
    "ARN of the IAM role that allows access to the stream processor, and provides Rekognition read permissions for KVS stream and write permissions to S3 bucket and SNS topic.",
  ).optional(),
  FaceSearchSettings: z.object({
    CollectionId: z.string().max(255).regex(new RegExp("^[a-zA-Z0-9_\\.\\-]+$"))
      .describe(
        "The ID of a collection that contains faces that you want to search for.",
      ).optional(),
    FaceMatchThreshold: z.number().min(0).max(100).describe(
      "Minimum face match confidence score percentage that must be met to return a result for a recognized face. The default is 80. 0 is the lowest confidence. 100 is the highest confidence. Values between 0 and 100 are accepted.",
    ).optional(),
  }).describe(
    "Face search settings to use on a streaming video. Note that either FaceSearchSettings or ConnectedHomeSettings should be set. Not both",
  ).optional(),
  ConnectedHomeSettings: z.object({
    Labels: z.array(z.string().min(1).max(128)).describe(
      "List of labels that need to be detected in the video stream. Current supported values are PERSON, PET, PACKAGE, ALL.",
    ).optional(),
    MinConfidence: z.number().min(0).max(100).describe(
      "Minimum object class match confidence score that must be met to return a result for a recognized object.",
    ).optional(),
  }).describe(
    "Connected home settings to use on a streaming video. Note that either ConnectedHomeSettings or FaceSearchSettings should be set. Not both",
  ).optional(),
  S3Destination: z.object({
    BucketName: z.string().max(63).describe("Name of the S3 bucket.")
      .optional(),
    ObjectKeyPrefix: z.string().max(256).describe(
      "The object key prefix path where the results will be stored. Default is no prefix path",
    ).optional(),
  }).describe(
    "The S3 location in customer's account where inference output & artifacts are stored, as part of connected home feature.",
  ).optional(),
  DataSharingPreference: z.object({
    OptIn: z.boolean().describe("Flag to enable data-sharing").optional(),
  }).describe(
    "Indicates whether Rekognition is allowed to store the video stream data for model-training.",
  ).optional(),
  PolygonRegionsOfInterest: z.array(z.array(PointSchema)).describe(
    "The PolygonRegionsOfInterest specifies a set of polygon areas of interest in the video frames to analyze, as part of connected home feature. Each polygon is in turn, an ordered list of Point",
  ).optional(),
  BoundingBoxRegionsOfInterest: z.array(BoundingBoxSchema).describe(
    "The BoundingBoxRegionsOfInterest specifies an array of bounding boxes of interest in the video frames to analyze, as part of connected home feature. If an object is partially in a region of interest, Rekognition will tag it as detected if the overlap of the object with the region-of-interest is greater than 20%.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
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

/** Swamp extension model for Rekognition StreamProcessor. Registered at `@swamp/aws/rekognition/stream-processor`. */
export const model = {
  type: "@swamp/aws/rekognition/stream-processor",
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
      description: "Rekognition StreamProcessor resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Rekognition StreamProcessor",
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
          "AWS::Rekognition::StreamProcessor",
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
      description: "Get a Rekognition StreamProcessor",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Rekognition StreamProcessor",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Rekognition::StreamProcessor",
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
      description: "Update a Rekognition StreamProcessor",
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
          "AWS::Rekognition::StreamProcessor",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Rekognition::StreamProcessor",
          identifier,
          currentState,
          desiredState,
          [
            "Name",
            "KmsKeyId",
            "RoleArn",
            "KinesisVideoStream",
            "ConnectedHomeSettings",
            "FaceSearchSettings",
            "KinesisDataStream",
            "S3Destination",
            "NotificationChannel",
            "BoundingBoxRegionsOfInterest",
            "PolygonRegionsOfInterest",
            "DataSharingPreference",
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
      description: "Delete a Rekognition StreamProcessor",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Rekognition StreamProcessor",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Rekognition::StreamProcessor",
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
      description: "Sync Rekognition StreamProcessor state from AWS",
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
            "AWS::Rekognition::StreamProcessor",
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
