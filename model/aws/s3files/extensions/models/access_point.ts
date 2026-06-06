// Auto-generated extension model for @swamp/aws/s3files/access-point
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for S3Files AccessPoint (AWS::S3Files::AccessPoint).
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
  Key: z.string().min(1).max(128).optional(),
  Value: z.string().max(256).optional(),
});

const CreationPermissionsSchema = z.object({
  OwnerUid: z.string().regex(new RegExp("^[0-9]+$")).describe(
    "Specifies the POSIX user ID to apply to the RootDirectory. Accepts values from 0 to 2^32 (4294967295).",
  ),
  OwnerGid: z.string().regex(new RegExp("^[0-9]+$")).describe(
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
    "AWS region; overrides AWS_REGION environment variable. Defaults to us-east-1.",
  ).optional(),
  ClientToken: z.string().min(1).max(64).regex(new RegExp("^(.+)$")).describe(
    "(optional) A string of up to 64 ASCII characters that Amazon EFS uses to ensure idempotent creation.",
  ).optional(),
  Tags: z.array(AccessPointTagSchema).optional(),
  FileSystemId: z.string().max(128).regex(
    new RegExp(
      "^(arn:aws[-a-z]*:s3files:[0-9a-z-:]+:file-system/fs-[0-9a-f]{17,40}|fs-[0-9a-f]{17,40})$",
    ),
  ).describe(
    "The ID of the S3 Files file system that the access point provides access to.",
  ),
  PosixUser: z.object({
    Uid: z.string().regex(new RegExp("^[0-9]+$")).describe(
      "The POSIX user ID used for all file system operations using this access point.",
    ),
    Gid: z.string().regex(new RegExp("^[0-9]+$")).describe(
      "The POSIX group ID used for all file system operations using this access point.",
    ),
    SecondaryGids: z.array(z.string().regex(new RegExp("^[0-9]+$"))).describe(
      "Secondary POSIX group IDs used for all file system operations using this access point.",
    ).optional(),
  }).describe(
    "The operating system user and group applied to all compute drive requests made using the access point.",
  ).optional(),
  RootDirectory: z.object({
    Path: z.string().min(1).max(100).regex(
      new RegExp("^(\\/|(\\/(?!\\.)+[^$#<>;;`|&?{}^*/\\n]+){1,4})$"),
    ).describe(
      "Specifies the path on the EFS file system to expose as the root directory to NFS clients using the access point to access the EFS file system. A path can have up to four subdirectories. If the specified path does not exist, you are required to provide the CreationPermissions.",
    ).optional(),
    CreationPermissions: CreationPermissionsSchema.describe(
      "(Optional) Specifies the POSIX IDs and permissions to apply to the access point's RootDirectory. If the RootDirectory>Path specified does not exist, EFS creates the root directory using the CreationPermissions settings when a client connects to an access point. When specifying the CreationPermissions, you must provide values for all properties. If you do not provide CreationPermissions and the specified RootDirectory>Path does not exist, attempts to mount the file system using the access point will fail.",
    ).optional(),
  }).describe(
    "Specifies the directory on the Amazon EFS file system that the access point exposes as the root directory of your file system to NFS clients using the access point. The clients using the access point can only access the root directory and below. If the RootDirectory>Path specified does not exist, EFS creates it and applies the CreationPermissions settings when a client connects to an access point. When specifying a RootDirectory, you need to provide the Path, and the CreationPermissions is optional.",
  ).optional(),
});

const StateSchema = z.object({
  AccessPointId: z.string(),
  AccessPointArn: z.string().optional(),
  ClientToken: z.string().optional(),
  Tags: z.array(AccessPointTagSchema).optional(),
  FileSystemId: z.string().optional(),
  PosixUser: z.object({
    Uid: z.string(),
    Gid: z.string(),
    SecondaryGids: z.array(z.string()),
  }).optional(),
  RootDirectory: z.object({
    Path: z.string(),
    CreationPermissions: CreationPermissionsSchema,
  }).optional(),
  Status: z.string().optional(),
  OwnerId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  ClientToken: z.string().min(1).max(64).regex(new RegExp("^(.+)$")).describe(
    "(optional) A string of up to 64 ASCII characters that Amazon EFS uses to ensure idempotent creation.",
  ).optional(),
  Tags: z.array(AccessPointTagSchema).optional(),
  FileSystemId: z.string().max(128).regex(
    new RegExp(
      "^(arn:aws[-a-z]*:s3files:[0-9a-z-:]+:file-system/fs-[0-9a-f]{17,40}|fs-[0-9a-f]{17,40})$",
    ),
  ).describe(
    "The ID of the S3 Files file system that the access point provides access to.",
  ).optional(),
  PosixUser: z.object({
    Uid: z.string().regex(new RegExp("^[0-9]+$")).describe(
      "The POSIX user ID used for all file system operations using this access point.",
    ).optional(),
    Gid: z.string().regex(new RegExp("^[0-9]+$")).describe(
      "The POSIX group ID used for all file system operations using this access point.",
    ).optional(),
    SecondaryGids: z.array(z.string().regex(new RegExp("^[0-9]+$"))).describe(
      "Secondary POSIX group IDs used for all file system operations using this access point.",
    ).optional(),
  }).describe(
    "The operating system user and group applied to all compute drive requests made using the access point.",
  ).optional(),
  RootDirectory: z.object({
    Path: z.string().min(1).max(100).regex(
      new RegExp("^(\\/|(\\/(?!\\.)+[^$#<>;;`|&?{}^*/\\n]+){1,4})$"),
    ).describe(
      "Specifies the path on the EFS file system to expose as the root directory to NFS clients using the access point to access the EFS file system. A path can have up to four subdirectories. If the specified path does not exist, you are required to provide the CreationPermissions.",
    ).optional(),
    CreationPermissions: CreationPermissionsSchema.describe(
      "(Optional) Specifies the POSIX IDs and permissions to apply to the access point's RootDirectory. If the RootDirectory>Path specified does not exist, EFS creates the root directory using the CreationPermissions settings when a client connects to an access point. When specifying the CreationPermissions, you must provide values for all properties. If you do not provide CreationPermissions and the specified RootDirectory>Path does not exist, attempts to mount the file system using the access point will fail.",
    ).optional(),
  }).describe(
    "Specifies the directory on the Amazon EFS file system that the access point exposes as the root directory of your file system to NFS clients using the access point. The clients using the access point can only access the root directory and below. If the RootDirectory>Path specified does not exist, EFS creates it and applies the CreationPermissions settings when a client connects to an access point. When specifying a RootDirectory, you need to provide the Path, and the CreationPermissions is optional.",
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

/** Swamp extension model for S3Files AccessPoint. Registered at `@swamp/aws/s3files/access-point`. */
export const model = {
  type: "@swamp/aws/s3files/access-point",
  version: "2026.06.06.1",
  upgrades: [
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "S3Files AccessPoint resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a S3Files AccessPoint",
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
          "AWS::S3Files::AccessPoint",
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
      description: "Get a S3Files AccessPoint",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the S3Files AccessPoint",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::S3Files::AccessPoint",
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
      description: "Update a S3Files AccessPoint",
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
          "AWS::S3Files::AccessPoint",
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
          "AWS::S3Files::AccessPoint",
          identifier,
          currentState,
          desiredState,
          [
            "FileSystemId",
            "ClientToken",
            "PosixUser",
            "Uid",
            "Gid",
            "SecondaryGids",
            "RootDirectory",
            "Path",
            "CreationPermissions",
            "OwnerUid",
            "OwnerGid",
            "Permissions",
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
      description: "Delete a S3Files AccessPoint",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the S3Files AccessPoint",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::S3Files::AccessPoint",
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
      description: "Sync S3Files AccessPoint state from AWS",
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
            "AWS::S3Files::AccessPoint",
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
