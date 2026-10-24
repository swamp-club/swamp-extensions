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

// Auto-generated extension model for @swamp/aws/iot/otaupdate
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for IoT OTAUpdate (AWS::IoT::OTAUpdate).
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

const AwsJobRateIncreaseCriteriaSchema = z.object({
  NumberOfNotifiedThings: z.number().int().min(1).describe(
    "When this number of things have been notified, it will initiate an increase in the rollout rate.",
  ).optional(),
  NumberOfSucceededThings: z.number().int().min(1).describe(
    "When this number of things have succeeded in their job execution, it will initiate an increase in the rollout rate.",
  ).optional(),
});

const AwsJobExponentialRolloutRateSchema = z.object({
  BaseRatePerMinute: z.number().int().min(1).max(1000).describe(
    "The minimum number of things that will be notified of a pending job, per minute, at the start of the job rollout.",
  ),
  IncrementFactor: z.number().describe(
    "The rate of increase for a job rollout.",
  ),
  RateIncreaseCriteria: AwsJobRateIncreaseCriteriaSchema,
});

const AwsJobAbortCriteriaSchema = z.object({
  FailureType: z.enum(["FAILED", "REJECTED", "TIMED_OUT", "ALL"]).describe(
    "The type of job execution failures that can initiate a job abort.",
  ),
  Action: z.enum(["CANCEL"]).describe(
    "The type of job action to take to initiate the job abort.",
  ),
  ThresholdPercentage: z.number().max(100).describe(
    "The minimum percentage of job execution failures that must occur to initiate the job abort.",
  ),
  MinNumberOfExecutedThings: z.number().int().min(1).describe(
    "The minimum number of things which must receive job execution notifications before the job can be aborted.",
  ),
});

const StreamSchema = z.object({
  StreamId: z.string().min(1).max(128).regex(new RegExp("^[a-zA-Z0-9_-]+$"))
    .describe("The stream ID.").optional(),
  FileId: z.number().int().min(0).max(255).describe(
    "The ID of a file associated with a stream.",
  ).optional(),
});

const S3LocationSchema = z.object({
  Bucket: z.string().min(1).describe("The S3 bucket.").optional(),
  Key: z.string().min(1).describe("The S3 key.").optional(),
  Version: z.string().describe("The S3 bucket version.").optional(),
});

const FileLocationSchema = z.object({
  Stream: StreamSchema.optional(),
  S3Location: S3LocationSchema.optional(),
});

const SigningProfileParameterSchema = z.object({
  CertificateArn: z.string().describe("Certificate ARN.").optional(),
  Platform: z.string().describe("The hardware platform of your device.")
    .optional(),
  CertificatePathOnDevice: z.string().describe(
    "The location of the code-signing certificate on your device.",
  ).optional(),
});

const S3DestinationSchema = z.object({
  Bucket: z.string().min(1).describe(
    "The S3 bucket that contains the updated firmware.",
  ).optional(),
  Prefix: z.string().describe("The S3 prefix.").optional(),
});

const DestinationSchema = z.object({
  S3Destination: S3DestinationSchema.optional(),
});

const StartSigningJobParameterSchema = z.object({
  SigningProfileParameter: SigningProfileParameterSchema.optional(),
  SigningProfileName: z.string().describe("The code-signing profile name.")
    .optional(),
  Destination: DestinationSchema.optional(),
});

const CodeSigningSignatureSchema = z.object({
  InlineDocument: z.string().describe(
    "A base64 encoded binary representation of the code signing signature.",
  ).optional(),
});

const CodeSigningCertificateChainSchema = z.object({
  CertificateName: z.string().describe("The name of the certificate.")
    .optional(),
  InlineDocument: z.string().describe(
    "A base64 encoded binary representation of the code signing certificate chain.",
  ).optional(),
});

const CustomCodeSigningSchema = z.object({
  Signature: CodeSigningSignatureSchema.optional(),
  CertificateChain: CodeSigningCertificateChainSchema.optional(),
  HashAlgorithm: z.string().describe(
    "The hash algorithm used to code sign the file.",
  ).optional(),
  SignatureAlgorithm: z.string().describe(
    "The signature algorithm used to code sign the file.",
  ).optional(),
});

const CodeSigningSchema = z.object({
  AwsSignerJobId: z.string().describe(
    "The ID of the AWSSignerJob which was created to sign the file.",
  ).optional(),
  StartSigningJobParameter: StartSigningJobParameterSchema.optional(),
  CustomCodeSigning: CustomCodeSigningSchema.optional(),
});

const OTAUpdateFileSchema = z.object({
  FileName: z.string().describe("The name of the file.").optional(),
  FileType: z.number().int().min(0).max(255).describe(
    "An integer value you can include in the job document to allow your devices to identify the type of file received from the cloud.",
  ).optional(),
  FileVersion: z.string().describe("The file version.").optional(),
  FileLocation: FileLocationSchema.optional(),
  CodeSigning: CodeSigningSchema.optional(),
  Attributes: z.record(z.string(), z.string().max(4096)).describe(
    "A list of name-attribute pairs.",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128),
  Value: z.string().max(256),
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
  OtaUpdateId: z.string().min(1).max(128).regex(new RegExp("^[a-zA-Z0-9_-]+$"))
    .describe("The ID of the OTA update to be created."),
  Description: z.string().max(2028).regex(new RegExp("^[^\\p{C}]+$", "u"))
    .describe("The description of the OTA update.").optional(),
  Targets: z.array(z.string()).describe(
    "The devices targeted to receive OTA updates.",
  ),
  Protocols: z.array(z.enum(["MQTT", "HTTP"])).describe(
    "The protocol used to transfer the OTA update image.",
  ).optional(),
  TargetSelection: z.enum(["CONTINUOUS", "SNAPSHOT"]).describe(
    "Specifies whether the update will continue to run (CONTINUOUS), or will be complete after all things specified as targets have completed the update (SNAPSHOT).",
  ).optional(),
  AwsJobExecutionsRolloutConfig: z.object({
    MaximumPerMinute: z.number().int().min(1).max(1000).describe(
      "The maximum number of OTA update job executions started per minute.",
    ).optional(),
    ExponentialRate: AwsJobExponentialRolloutRateSchema.optional(),
  }).optional(),
  AwsJobPresignedUrlConfig: z.object({
    ExpiresInSec: z.number().int().describe(
      "How long (in seconds) pre-signed URLs are valid. Valid values are 60 - 3600, the default value is 1800 seconds.",
    ).optional(),
  }).optional(),
  AwsJobAbortConfig: z.object({
    AbortCriteriaList: z.array(AwsJobAbortCriteriaSchema).describe(
      "The list of criteria that determine when and how to abort the job.",
    ),
  }).optional(),
  AwsJobTimeoutConfig: z.object({
    InProgressTimeoutInMinutes: z.number().int().describe(
      "Specifies the amount of time, in minutes, this device has to finish execution of this job.",
    ).optional(),
  }).optional(),
  Files: z.array(OTAUpdateFileSchema).describe(
    "The files to be streamed by the OTA update.",
  ),
  RoleArn: z.string().min(20).max(2048).describe(
    "The IAM role that grants AWS IoT Core access to the Amazon S3, IoT jobs and AWS Code Signing resources to create an OTA update job.",
  ).optional(),
  AdditionalParameters: z.record(z.string(), z.string().max(4096)).describe(
    "A list of additional OTA update parameters, which are name-value pairs.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "Metadata which can be used to manage updates.",
  ).optional(),
});

const StateSchema = z.object({
  OtaUpdateId: z.string().optional(),
  OtaUpdateArn: z.string(),
  Description: z.string().optional(),
  Targets: z.array(z.string()).optional(),
  Protocols: z.array(z.string()).optional(),
  TargetSelection: z.string().optional(),
  AwsJobExecutionsRolloutConfig: z.object({
    MaximumPerMinute: z.number(),
    ExponentialRate: AwsJobExponentialRolloutRateSchema,
  }).optional(),
  AwsJobPresignedUrlConfig: z.object({
    ExpiresInSec: z.number(),
  }).optional(),
  AwsJobAbortConfig: z.object({
    AbortCriteriaList: z.array(AwsJobAbortCriteriaSchema),
  }).optional(),
  AwsJobTimeoutConfig: z.object({
    InProgressTimeoutInMinutes: z.number(),
  }).optional(),
  Files: z.array(OTAUpdateFileSchema).optional(),
  RoleArn: z.string().optional(),
  AdditionalParameters: z.record(z.string(), z.unknown()).optional(),
  Tags: z.array(TagSchema).optional(),
  OtaUpdateStatus: z.string().optional(),
  CreationDate: z.string().optional(),
  LastModifiedDate: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  OtaUpdateId: z.string().min(1).max(128).regex(new RegExp("^[a-zA-Z0-9_-]+$"))
    .describe("The ID of the OTA update to be created.").optional(),
  Description: z.string().max(2028).regex(new RegExp("^[^\\p{C}]+$", "u"))
    .describe("The description of the OTA update.").optional(),
  Targets: z.array(z.string()).describe(
    "The devices targeted to receive OTA updates.",
  ).optional(),
  Protocols: z.array(z.enum(["MQTT", "HTTP"])).describe(
    "The protocol used to transfer the OTA update image.",
  ).optional(),
  TargetSelection: z.enum(["CONTINUOUS", "SNAPSHOT"]).describe(
    "Specifies whether the update will continue to run (CONTINUOUS), or will be complete after all things specified as targets have completed the update (SNAPSHOT).",
  ).optional(),
  AwsJobExecutionsRolloutConfig: z.object({
    MaximumPerMinute: z.number().int().min(1).max(1000).describe(
      "The maximum number of OTA update job executions started per minute.",
    ).optional(),
    ExponentialRate: AwsJobExponentialRolloutRateSchema.optional(),
  }).optional(),
  AwsJobPresignedUrlConfig: z.object({
    ExpiresInSec: z.number().int().describe(
      "How long (in seconds) pre-signed URLs are valid. Valid values are 60 - 3600, the default value is 1800 seconds.",
    ).optional(),
  }).optional(),
  AwsJobAbortConfig: z.object({
    AbortCriteriaList: z.array(AwsJobAbortCriteriaSchema).describe(
      "The list of criteria that determine when and how to abort the job.",
    ).optional(),
  }).optional(),
  AwsJobTimeoutConfig: z.object({
    InProgressTimeoutInMinutes: z.number().int().describe(
      "Specifies the amount of time, in minutes, this device has to finish execution of this job.",
    ).optional(),
  }).optional(),
  Files: z.array(OTAUpdateFileSchema).describe(
    "The files to be streamed by the OTA update.",
  ).optional(),
  RoleArn: z.string().min(20).max(2048).describe(
    "The IAM role that grants AWS IoT Core access to the Amazon S3, IoT jobs and AWS Code Signing resources to create an OTA update job.",
  ).optional(),
  AdditionalParameters: z.record(z.string(), z.string().max(4096)).describe(
    "A list of additional OTA update parameters, which are name-value pairs.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "Metadata which can be used to manage updates.",
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

/** Swamp extension model for IoT OTAUpdate. Registered at `@swamp/aws/iot/otaupdate`. */
export const model = {
  type: "@swamp/aws/iot/otaupdate",
  version: "2026.10.24.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "IoT OTAUpdate resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a IoT OTAUpdate",
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
          "AWS::IoT::OTAUpdate",
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
      description: "Get a IoT OTAUpdate",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoT OTAUpdate",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::IoT::OTAUpdate",
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
      description: "Update a IoT OTAUpdate",
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
        const identifier = existing.OtaUpdateArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::IoT::OTAUpdate",
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
          "AWS::IoT::OTAUpdate",
          identifier,
          currentState,
          desiredState,
          [
            "OtaUpdateId",
            "Targets",
            "Protocols",
            "TargetSelection",
            "AwsJobExecutionsRolloutConfig",
            "AwsJobPresignedUrlConfig",
            "AwsJobAbortConfig",
            "AwsJobTimeoutConfig",
            "Files",
            "RoleArn",
            "AdditionalParameters",
            "Description",
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
      description: "Delete a IoT OTAUpdate",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoT OTAUpdate",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::IoT::OTAUpdate",
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
      description: "Sync IoT OTAUpdate state from AWS",
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
        const identifier = existing.OtaUpdateArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::IoT::OTAUpdate",
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
      description: "List IoT OTAUpdate resources",
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
          "AWS::IoT::OTAUpdate",
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
            (item.properties?.OtaUpdateArn?.toString() ?? item.identifier)
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
