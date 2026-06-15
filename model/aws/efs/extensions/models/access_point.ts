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

// Auto-generated extension model for @swamp/aws/efs/access-point
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for EFS AccessPoint (AWS::EFS::AccessPoint).
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

const AccessPointTagSchema = z.object({
  Key: z.string().min(1).max(128).describe(
    "The tag key (String). The key can't start with aws:.",
  ).optional(),
  Value: z.string().min(1).max(256).describe("The value of the tag key.")
    .optional(),
});

const CreationInfoSchema = z.object({
  OwnerUid: z.string().describe(
    "Specifies the POSIX user ID to apply to the RootDirectory. Accepts values from 0 to 2^32 (4294967295).",
  ),
  OwnerGid: z.string().describe(
    "Specifies the POSIX group ID to apply to the RootDirectory. Accepts values from 0 to 2^32 (4294967295).",
  ),
  Permissions: z.string().regex(new RegExp("^[0-7]{3,4}$")).describe(
    "Specifies the POSIX permissions to apply to the RootDirectory, in the format of an octal number representing the file's mode bits.",
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
  ClientToken: z.string().describe(
    "The opaque string specified in the request to ensure idempotent creation.",
  ).optional(),
  AccessPointTags: z.array(AccessPointTagSchema).describe(
    "An array of key-value pairs to apply to this resource. For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html).",
  ).optional(),
  FileSystemId: z.string().describe(
    "The ID of the EFS file system that the access point applies to. Accepts only the ID format for input when specifying a file system, for example fs-0123456789abcedf2.",
  ),
  PosixUser: z.object({
    Uid: z.string().describe(
      "The POSIX user ID used for all file system operations using this access point.",
    ),
    Gid: z.string().describe(
      "The POSIX group ID used for all file system operations using this access point.",
    ),
    SecondaryGids: z.array(z.string()).describe(
      "Secondary POSIX group IDs used for all file system operations using this access point.",
    ).optional(),
  }).describe(
    "The full POSIX identity, including the user ID, group ID, and secondary group IDs on the access point that is used for all file operations by NFS clients using the access point.",
  ).optional(),
  RootDirectory: z.object({
    Path: z.string().min(1).max(100).describe(
      "Specifies the path on the EFS file system to expose as the root directory to NFS clients using the access point to access the EFS file system. A path can have up to four subdirectories. If the specified path does not exist, you are required to provide the CreationInfo.",
    ).optional(),
    CreationInfo: CreationInfoSchema.describe(
      "(Optional) Specifies the POSIX IDs and permissions to apply to the access point's RootDirectory. If the RootDirectory > Path specified does not exist, EFS creates the root directory using the CreationInfo settings when a client connects to an access point. When specifying the CreationInfo, you must provide values for all properties. If you do not provide CreationInfo and the specified RootDirectory > Path does not exist, attempts to mount the file system using the access point will fail.",
    ).optional(),
  }).describe(
    "The directory on the EFS file system that the access point exposes as the root directory to NFS clients using the access point.",
  ).optional(),
});

const StateSchema = z.object({
  AccessPointId: z.string(),
  Arn: z.string().optional(),
  ClientToken: z.string().optional(),
  AccessPointTags: z.array(AccessPointTagSchema).optional(),
  FileSystemId: z.string().optional(),
  PosixUser: z.object({
    Uid: z.string(),
    Gid: z.string(),
    SecondaryGids: z.array(z.string()),
  }).optional(),
  RootDirectory: z.object({
    Path: z.string(),
    CreationInfo: CreationInfoSchema,
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  ClientToken: z.string().describe(
    "The opaque string specified in the request to ensure idempotent creation.",
  ).optional(),
  AccessPointTags: z.array(AccessPointTagSchema).describe(
    "An array of key-value pairs to apply to this resource. For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html).",
  ).optional(),
  FileSystemId: z.string().describe(
    "The ID of the EFS file system that the access point applies to. Accepts only the ID format for input when specifying a file system, for example fs-0123456789abcedf2.",
  ).optional(),
  PosixUser: z.object({
    Uid: z.string().describe(
      "The POSIX user ID used for all file system operations using this access point.",
    ).optional(),
    Gid: z.string().describe(
      "The POSIX group ID used for all file system operations using this access point.",
    ).optional(),
    SecondaryGids: z.array(z.string()).describe(
      "Secondary POSIX group IDs used for all file system operations using this access point.",
    ).optional(),
  }).describe(
    "The full POSIX identity, including the user ID, group ID, and secondary group IDs on the access point that is used for all file operations by NFS clients using the access point.",
  ).optional(),
  RootDirectory: z.object({
    Path: z.string().min(1).max(100).describe(
      "Specifies the path on the EFS file system to expose as the root directory to NFS clients using the access point to access the EFS file system. A path can have up to four subdirectories. If the specified path does not exist, you are required to provide the CreationInfo.",
    ).optional(),
    CreationInfo: CreationInfoSchema.describe(
      "(Optional) Specifies the POSIX IDs and permissions to apply to the access point's RootDirectory. If the RootDirectory > Path specified does not exist, EFS creates the root directory using the CreationInfo settings when a client connects to an access point. When specifying the CreationInfo, you must provide values for all properties. If you do not provide CreationInfo and the specified RootDirectory > Path does not exist, attempts to mount the file system using the access point will fail.",
    ).optional(),
  }).describe(
    "The directory on the EFS file system that the access point exposes as the root directory to NFS clients using the access point.",
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

/** Swamp extension model for EFS AccessPoint. Registered at `@swamp/aws/efs/access-point`. */
export const model = {
  type: "@swamp/aws/efs/access-point",
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
      description: "EFS AccessPoint resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EFS AccessPoint",
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
          "AWS::EFS::AccessPoint",
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
      description: "Get a EFS AccessPoint",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EFS AccessPoint",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::EFS::AccessPoint",
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
      description: "Update a EFS AccessPoint",
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
        const identifier = existing.AccessPointId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::EFS::AccessPoint",
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
          "AWS::EFS::AccessPoint",
          identifier,
          currentState,
          desiredState,
          [
            "FileSystemId",
            "ClientToken",
            "CreationInfo",
            "OwnerUid",
            "OwnerGid",
            "Permissions",
            "PosixUser",
            "Uid",
            "Gid",
            "SecondaryGids",
            "RootDirectory",
            "Path",
            "CreationInfo",
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
      description: "Delete a EFS AccessPoint",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EFS AccessPoint",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::EFS::AccessPoint",
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
      description: "Sync EFS AccessPoint state from AWS",
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
        const identifier = existing.AccessPointId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::EFS::AccessPoint",
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
