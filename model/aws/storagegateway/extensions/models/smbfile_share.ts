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

// Auto-generated extension model for @swamp/aws/storagegateway/smbfile-share
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for StorageGateway SMBFileShare (AWS::StorageGateway::SMBFileShare).
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
  Key: z.string().min(1).max(128).regex(
    new RegExp("^([\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]*)$", "u"),
  ),
  Value: z.string().min(0).max(256),
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
  GatewayARN: z.string().min(50).max(500).regex(
    new RegExp(
      "^arn:[a-z0-9-]+:storagegateway:[a-z0-9-]+:[0-9]{12}:gateway/.+$",
    ),
  ).describe("The ARN of the S3 File Gateway that hosts the share."),
  Role: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:(aws(|-cn|-us-gov|-iso[A-Za-z0-9_-]*|-eusc)):iam::([0-9]+):role/(\\S+)$",
    ),
  ).describe(
    "The ARN of the IAM role the gateway assumes when it accesses the S3 location.",
  ),
  LocationARN: z.string().min(16).max(1400).regex(
    new RegExp(
      "^(arn:[a-z0-9-]+:s3:[a-z0-9-]*:[0-9]*:.+|[0-9a-zA-Z][0-9a-zA-Z.\\-]{1,61}-s3alias)$",
    ),
  ).describe("The ARN of the S3 bucket, or bucket prefix, the share exposes."),
  BucketRegion: z.string().min(1).max(25).describe(
    "The Region of the S3 bucket, required when the bucket is reached through a VPC endpoint.",
  ).optional(),
  VPCEndpointDNSName: z.string().min(1).max(255).regex(
    new RegExp(
      "^(([a-zA-Z0-9\\-]*[a-zA-Z0-9])\\.)*([A-Za-z0-9\\-]*[A-Za-z0-9])$",
    ),
  ).describe(
    "The DNS name of the S3 VPC endpoint the gateway uses to reach the bucket.",
  ).optional(),
  EncryptionType: z.enum(["SseS3", "SseKms", "DsseKms"]).describe(
    "The server-side encryption the gateway applies to objects it writes.",
  ).optional(),
  KMSEncrypted: z.boolean().describe(
    "Deprecated by the service in favour of EncryptionType; true selects KMS encryption. Retained because it remains readable and settable.",
  ).optional(),
  KMSKey: z.string().min(7).max(2048).regex(
    new RegExp(
      "^(^arn:(aws(|-cn|-us-gov|-iso[A-Za-z0-9_-]*|-eusc)):kms:([a-zA-Z0-9-]+):([0-9]+):(key|alias)/(\\S+)$)|(^alias/(\\S+)$)$",
    ),
  ).describe(
    "The KMS key used for encryption, when EncryptionType selects KMS. Removing this property from a template leaves the share's current value: the service documents no value that resets it.",
  ).optional(),
  DefaultStorageClass: z.string().min(5).max(50).describe(
    "The S3 storage class for new objects. The service accepts S3_STANDARD, S3_INTELLIGENT_TIERING, S3_STANDARD_IA and S3_ONEZONE_IA; it is a length-bounded string in the API model rather than an enumeration.",
  ).optional(),
  ObjectACL: z.enum([
    "private",
    "public-read",
    "public-read-write",
    "authenticated-read",
    "bucket-owner-read",
    "bucket-owner-full-control",
    "aws-exec-read",
  ]).describe("The canned S3 ACL applied to objects the gateway writes.")
    .optional(),
  ReadOnly: z.boolean().describe("Whether clients may write to the share.")
    .optional(),
  GuessMIMETypeEnabled: z.boolean().describe(
    "Whether the gateway infers the MIME type of uploaded objects from their extension.",
  ).optional(),
  RequesterPays: z.boolean().describe(
    "Whether the bucket is a Requester Pays bucket.",
  ).optional(),
  FileShareName: z.string().min(1).max(255).describe(
    "The name of the file share, which defaults to the bucket name when omitted. Removing this property from a template leaves the share's current value: the service documents no value that resets it.",
  ).optional(),
  CacheAttributes: z.object({
    CacheStaleTimeoutInSeconds: z.number().int().describe(
      "How long the directory contents cached by the gateway are considered valid.",
    ).optional(),
  }).describe(
    "Refresh cache information for the file share. Removing this property from a template leaves the share's current value: the service documents no value that resets it.",
  ).optional(),
  NotificationPolicy: z.string().min(2).max(100).regex(
    new RegExp('^\\{[\\w\\s:\\{\\}\\[\\]\\"]*}$'),
  ).describe("The upload-notification settling period, as a JSON document.")
    .optional(),
  AuditDestinationARN: z.string().min(0).max(1024).regex(
    new RegExp("^$|^arn:[a-z0-9-]+:logs:[a-z0-9-]+:[0-9]{12}:log-group:.+$"),
  ).describe(
    "The ARN of the CloudWatch log group that receives the share's audit logs. Removing this property from a template detaches audit logging: the update sends the empty string, which the service treats as the reset.",
  ).optional(),
  Tags: z.array(TagSchema).describe("Tags assigned to the file share.")
    .optional(),
  SMBACLEnabled: z.boolean().describe(
    "Whether the SMB share uses Windows ACLs rather than POSIX permissions.",
  ).optional(),
  AccessBasedEnumeration: z.boolean().describe(
    "Whether clients see only the files and folders they may access.",
  ).optional(),
  AdminUserList: z.array(z.string().min(1).max(64)).describe(
    "Users and groups granted administrative privileges on the SMB share.",
  ).optional(),
  ValidUserList: z.array(z.string().min(1).max(64)).describe(
    "Users and groups permitted to access the SMB share.",
  ).optional(),
  InvalidUserList: z.array(z.string().min(1).max(64)).describe(
    "Users and groups denied access to the SMB share.",
  ).optional(),
  Authentication: z.string().min(5).max(15).describe(
    "The authentication the SMB share uses. The service accepts ActiveDirectory and GuestAccess; it is a length-bounded string in the API model rather than an enumeration.",
  ).optional(),
  CaseSensitivity: z.enum(["ClientSpecified", "CaseSensitive"]).describe(
    "Whether the SMB share is case sensitive or defers to the client.",
  ).optional(),
  OplocksEnabled: z.boolean().describe(
    "Whether the SMB share grants opportunistic locks. Removing this property from a template leaves the live value unchanged rather than restoring the created default, because that default depends on the gateway's software version -- opportunistic locking is enabled by default only on appliances at 1.19.0.0 or above -- and the version is not part of this resource. Set the value explicitly rather than relying on removal.",
  ).optional(),
});

const StateSchema = z.object({
  GatewayARN: z.string().optional(),
  Role: z.string().optional(),
  LocationARN: z.string().optional(),
  BucketRegion: z.string().optional(),
  VPCEndpointDNSName: z.string().optional(),
  EncryptionType: z.string().optional(),
  KMSEncrypted: z.boolean().optional(),
  KMSKey: z.string().optional(),
  DefaultStorageClass: z.string().optional(),
  ObjectACL: z.string().optional(),
  ReadOnly: z.boolean().optional(),
  GuessMIMETypeEnabled: z.boolean().optional(),
  RequesterPays: z.boolean().optional(),
  FileShareName: z.string().optional(),
  CacheAttributes: z.object({
    CacheStaleTimeoutInSeconds: z.number(),
  }).optional(),
  NotificationPolicy: z.string().optional(),
  AuditDestinationARN: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  SMBACLEnabled: z.boolean().optional(),
  AccessBasedEnumeration: z.boolean().optional(),
  AdminUserList: z.array(z.string()).optional(),
  ValidUserList: z.array(z.string()).optional(),
  InvalidUserList: z.array(z.string()).optional(),
  Authentication: z.string().optional(),
  CaseSensitivity: z.string().optional(),
  OplocksEnabled: z.boolean().optional(),
  FileShareARN: z.string(),
  FileShareId: z.string().optional(),
  FileShareStatus: z.string().optional(),
  Path: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  GatewayARN: z.string().min(50).max(500).regex(
    new RegExp(
      "^arn:[a-z0-9-]+:storagegateway:[a-z0-9-]+:[0-9]{12}:gateway/.+$",
    ),
  ).describe("The ARN of the S3 File Gateway that hosts the share.").optional(),
  Role: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:(aws(|-cn|-us-gov|-iso[A-Za-z0-9_-]*|-eusc)):iam::([0-9]+):role/(\\S+)$",
    ),
  ).describe(
    "The ARN of the IAM role the gateway assumes when it accesses the S3 location.",
  ).optional(),
  LocationARN: z.string().min(16).max(1400).regex(
    new RegExp(
      "^(arn:[a-z0-9-]+:s3:[a-z0-9-]*:[0-9]*:.+|[0-9a-zA-Z][0-9a-zA-Z.\\-]{1,61}-s3alias)$",
    ),
  ).describe("The ARN of the S3 bucket, or bucket prefix, the share exposes.")
    .optional(),
  BucketRegion: z.string().min(1).max(25).describe(
    "The Region of the S3 bucket, required when the bucket is reached through a VPC endpoint.",
  ).optional(),
  VPCEndpointDNSName: z.string().min(1).max(255).regex(
    new RegExp(
      "^(([a-zA-Z0-9\\-]*[a-zA-Z0-9])\\.)*([A-Za-z0-9\\-]*[A-Za-z0-9])$",
    ),
  ).describe(
    "The DNS name of the S3 VPC endpoint the gateway uses to reach the bucket.",
  ).optional(),
  EncryptionType: z.enum(["SseS3", "SseKms", "DsseKms"]).describe(
    "The server-side encryption the gateway applies to objects it writes.",
  ).optional(),
  KMSEncrypted: z.boolean().describe(
    "Deprecated by the service in favour of EncryptionType; true selects KMS encryption. Retained because it remains readable and settable.",
  ).optional(),
  KMSKey: z.string().min(7).max(2048).regex(
    new RegExp(
      "^(^arn:(aws(|-cn|-us-gov|-iso[A-Za-z0-9_-]*|-eusc)):kms:([a-zA-Z0-9-]+):([0-9]+):(key|alias)/(\\S+)$)|(^alias/(\\S+)$)$",
    ),
  ).describe(
    "The KMS key used for encryption, when EncryptionType selects KMS. Removing this property from a template leaves the share's current value: the service documents no value that resets it.",
  ).optional(),
  DefaultStorageClass: z.string().min(5).max(50).describe(
    "The S3 storage class for new objects. The service accepts S3_STANDARD, S3_INTELLIGENT_TIERING, S3_STANDARD_IA and S3_ONEZONE_IA; it is a length-bounded string in the API model rather than an enumeration.",
  ).optional(),
  ObjectACL: z.enum([
    "private",
    "public-read",
    "public-read-write",
    "authenticated-read",
    "bucket-owner-read",
    "bucket-owner-full-control",
    "aws-exec-read",
  ]).describe("The canned S3 ACL applied to objects the gateway writes.")
    .optional(),
  ReadOnly: z.boolean().describe("Whether clients may write to the share.")
    .optional(),
  GuessMIMETypeEnabled: z.boolean().describe(
    "Whether the gateway infers the MIME type of uploaded objects from their extension.",
  ).optional(),
  RequesterPays: z.boolean().describe(
    "Whether the bucket is a Requester Pays bucket.",
  ).optional(),
  FileShareName: z.string().min(1).max(255).describe(
    "The name of the file share, which defaults to the bucket name when omitted. Removing this property from a template leaves the share's current value: the service documents no value that resets it.",
  ).optional(),
  CacheAttributes: z.object({
    CacheStaleTimeoutInSeconds: z.number().int().describe(
      "How long the directory contents cached by the gateway are considered valid.",
    ).optional(),
  }).describe(
    "Refresh cache information for the file share. Removing this property from a template leaves the share's current value: the service documents no value that resets it.",
  ).optional(),
  NotificationPolicy: z.string().min(2).max(100).regex(
    new RegExp('^\\{[\\w\\s:\\{\\}\\[\\]\\"]*}$'),
  ).describe("The upload-notification settling period, as a JSON document.")
    .optional(),
  AuditDestinationARN: z.string().min(0).max(1024).regex(
    new RegExp("^$|^arn:[a-z0-9-]+:logs:[a-z0-9-]+:[0-9]{12}:log-group:.+$"),
  ).describe(
    "The ARN of the CloudWatch log group that receives the share's audit logs. Removing this property from a template detaches audit logging: the update sends the empty string, which the service treats as the reset.",
  ).optional(),
  Tags: z.array(TagSchema).describe("Tags assigned to the file share.")
    .optional(),
  SMBACLEnabled: z.boolean().describe(
    "Whether the SMB share uses Windows ACLs rather than POSIX permissions.",
  ).optional(),
  AccessBasedEnumeration: z.boolean().describe(
    "Whether clients see only the files and folders they may access.",
  ).optional(),
  AdminUserList: z.array(z.string().min(1).max(64)).describe(
    "Users and groups granted administrative privileges on the SMB share.",
  ).optional(),
  ValidUserList: z.array(z.string().min(1).max(64)).describe(
    "Users and groups permitted to access the SMB share.",
  ).optional(),
  InvalidUserList: z.array(z.string().min(1).max(64)).describe(
    "Users and groups denied access to the SMB share.",
  ).optional(),
  Authentication: z.string().min(5).max(15).describe(
    "The authentication the SMB share uses. The service accepts ActiveDirectory and GuestAccess; it is a length-bounded string in the API model rather than an enumeration.",
  ).optional(),
  CaseSensitivity: z.enum(["ClientSpecified", "CaseSensitive"]).describe(
    "Whether the SMB share is case sensitive or defers to the client.",
  ).optional(),
  OplocksEnabled: z.boolean().describe(
    "Whether the SMB share grants opportunistic locks. Removing this property from a template leaves the live value unchanged rather than restoring the created default, because that default depends on the gateway's software version -- opportunistic locking is enabled by default only on appliances at 1.19.0.0 or above -- and the version is not part of this resource. Set the value explicitly rather than relying on removal.",
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

/** Swamp extension model for StorageGateway SMBFileShare. Registered at `@swamp/aws/storagegateway/smbfile-share`. */
export const model = {
  type: "@swamp/aws/storagegateway/smbfile-share",
  version: "2026.10.15.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "StorageGateway SMBFileShare resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a StorageGateway SMBFileShare",
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
          "AWS::StorageGateway::SMBFileShare",
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
      description: "Get a StorageGateway SMBFileShare",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the StorageGateway SMBFileShare",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::StorageGateway::SMBFileShare",
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
      description: "Update a StorageGateway SMBFileShare",
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
        const identifier = existing.FileShareARN?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::StorageGateway::SMBFileShare",
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
          "AWS::StorageGateway::SMBFileShare",
          identifier,
          currentState,
          desiredState,
          [
            "GatewayARN",
            "Role",
            "LocationARN",
            "BucketRegion",
            "VPCEndpointDNSName",
            "Authentication",
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
      description: "Delete a StorageGateway SMBFileShare",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the StorageGateway SMBFileShare",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::StorageGateway::SMBFileShare",
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
      description: "Sync StorageGateway SMBFileShare state from AWS",
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
        const identifier = existing.FileShareARN?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::StorageGateway::SMBFileShare",
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
      description: "List StorageGateway SMBFileShare resources",
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
          "AWS::StorageGateway::SMBFileShare",
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
            (item.properties?.FileShareARN?.toString() ?? item.identifier)
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
