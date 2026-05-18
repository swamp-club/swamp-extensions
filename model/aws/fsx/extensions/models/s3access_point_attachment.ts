// Auto-generated extension model for @swamp/aws/fsx/s3access-point-attachment
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any no-control-regex

/**
 * Swamp extension model for FSx S3AccessPointAttachment (AWS::FSx::S3AccessPointAttachment).
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
} from "./_lib/aws.ts";

const OntapUnixFileSystemUserSchema = z.object({
  Name: z.string().min(1).max(256).regex(
    new RegExp("^[^\\u0000\\u0085\\u2028\\u2029\\r\\n]{1,256}$"),
  ).describe("The name of the UNIX user."),
});

const OntapWindowsFileSystemUserSchema = z.object({
  Name: z.string().min(1).max(256).regex(
    new RegExp("^[^\\u0000\\u0085\\u2028\\u2029\\r\\n]{1,256}$"),
  ).describe("The name of the Windows user."),
});

const OntapFileSystemIdentitySchema = z.object({
  Type: z.enum(["UNIX", "WINDOWS"]).describe(
    "Specifies the FSx for ONTAP user identity type, accepts either UNIX or WINDOWS.",
  ),
  UnixUser: OntapUnixFileSystemUserSchema.describe(
    "Specifies the properties of the file system UNIX user.",
  ).optional(),
  WindowsUser: OntapWindowsFileSystemUserSchema.describe(
    "Specifies the properties of the file system Windows user.",
  ).optional(),
});

const FileSystemGIDSchema = z.object({
  Gid: z.number().min(0).max(4294967295).describe(
    "The GID of the file system user.",
  ),
});

const OpenZFSPosixFileSystemUserSchema = z.object({
  Uid: z.number().min(0).max(4294967295).describe(
    "The UID of the file system user.",
  ),
  Gid: z.number().min(0).max(4294967295).describe(
    "The GID of the file system user.",
  ),
  SecondaryGids: z.array(FileSystemGIDSchema).describe(
    "The list of secondary GIDs for the file system user.",
  ).optional(),
});

const OpenZFSFileSystemIdentitySchema = z.object({
  Type: z.enum(["POSIX"]).describe(
    "Specifies the FSx for OpenZFS user identity type, accepts only POSIX.",
  ),
  PosixUser: OpenZFSPosixFileSystemUserSchema.describe(
    "Specifies the UID and GIDs of the file system POSIX user.",
  ),
});

const S3AccessPointVpcConfigurationSchema = z.object({
  VpcId: z.string().min(12).max(21).regex(new RegExp("^(vpc-[0-9a-f]{8,})$"))
    .describe(
      "Specifies the virtual private cloud (VPC) for the S3 access point VPC configuration, if one exists.",
    ),
});

const GlobalArgsSchema = z.object({
  Name: z.string().min(3).max(50).regex(
    new RegExp("^(?=[a-z0-9])[a-z0-9-]{1,48}[a-z0-9]$"),
  ).describe(
    "The name of the S3 access point attachment; also used for the name of the S3 access point.",
  ),
  Type: z.enum(["OPENZFS", "ONTAP"]).describe(
    "The type of Amazon FSx volume that the S3 access point is attached to.",
  ),
  OntapConfiguration: z.object({
    VolumeId: z.string().min(23).max(23).regex(
      new RegExp("^(fsvol-[0-9a-f]{17,})$"),
    ).describe(
      "The ID of the FSx for ONTAP volume that the S3 access point is attached to.",
    ),
    FileSystemIdentity: OntapFileSystemIdentitySchema.describe(
      "The file system identity used to authorize file access requests made using the S3 access point.",
    ),
  }).describe("The OntapConfiguration of the S3 access point attachment.")
    .optional(),
  OpenZFSConfiguration: z.object({
    VolumeId: z.string().min(23).max(23).regex(
      new RegExp("^(fsvol-[0-9a-f]{17,})$"),
    ).describe(
      "The ID of the FSx for OpenZFS volume that the S3 access point is attached to.",
    ),
    FileSystemIdentity: OpenZFSFileSystemIdentitySchema.describe(
      "The file system identity used to authorize file access requests made using the S3 access point.",
    ),
  }).describe("The OpenZFSConfiguration of the S3 access point attachment.")
    .optional(),
  S3AccessPoint: z.object({
    VpcConfiguration: S3AccessPointVpcConfigurationSchema.describe(
      "The S3 access point's virtual private cloud (VPC) configuration.",
    ).optional(),
    Policy: z.string().describe("The S3 access point's policy.").optional(),
  }).describe(
    "The S3 access point configuration of the S3 access point attachment.",
  ).optional(),
});

const StateSchema = z.object({
  Name: z.string(),
  Type: z.string().optional(),
  OntapConfiguration: z.object({
    VolumeId: z.string(),
    FileSystemIdentity: OntapFileSystemIdentitySchema,
  }).optional(),
  OpenZFSConfiguration: z.object({
    VolumeId: z.string(),
    FileSystemIdentity: OpenZFSFileSystemIdentitySchema,
  }).optional(),
  S3AccessPoint: z.object({
    ResourceARN: z.string(),
    Alias: z.string(),
    VpcConfiguration: S3AccessPointVpcConfigurationSchema,
    Policy: z.union([z.string(), z.record(z.string(), z.unknown())]),
  }).optional(),
  Lifecycle: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  Name: z.string().min(3).max(50).regex(
    new RegExp("^(?=[a-z0-9])[a-z0-9-]{1,48}[a-z0-9]$"),
  ).describe(
    "The name of the S3 access point attachment; also used for the name of the S3 access point.",
  ).optional(),
  Type: z.enum(["OPENZFS", "ONTAP"]).describe(
    "The type of Amazon FSx volume that the S3 access point is attached to.",
  ).optional(),
  OntapConfiguration: z.object({
    VolumeId: z.string().min(23).max(23).regex(
      new RegExp("^(fsvol-[0-9a-f]{17,})$"),
    ).describe(
      "The ID of the FSx for ONTAP volume that the S3 access point is attached to.",
    ).optional(),
    FileSystemIdentity: OntapFileSystemIdentitySchema.describe(
      "The file system identity used to authorize file access requests made using the S3 access point.",
    ).optional(),
  }).describe("The OntapConfiguration of the S3 access point attachment.")
    .optional(),
  OpenZFSConfiguration: z.object({
    VolumeId: z.string().min(23).max(23).regex(
      new RegExp("^(fsvol-[0-9a-f]{17,})$"),
    ).describe(
      "The ID of the FSx for OpenZFS volume that the S3 access point is attached to.",
    ).optional(),
    FileSystemIdentity: OpenZFSFileSystemIdentitySchema.describe(
      "The file system identity used to authorize file access requests made using the S3 access point.",
    ).optional(),
  }).describe("The OpenZFSConfiguration of the S3 access point attachment.")
    .optional(),
  S3AccessPoint: z.object({
    VpcConfiguration: S3AccessPointVpcConfigurationSchema.describe(
      "The S3 access point's virtual private cloud (VPC) configuration.",
    ).optional(),
    Policy: z.string().describe("The S3 access point's policy.").optional(),
  }).describe(
    "The S3 access point configuration of the S3 access point attachment.",
  ).optional(),
});

/** Swamp extension model for FSx S3AccessPointAttachment. Registered at `@swamp/aws/fsx/s3access-point-attachment`. */
export const model = {
  type: "@swamp/aws/fsx/s3access-point-attachment",
  version: "2026.05.19.1",
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
      toVersion: "2026.04.08.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "FSx S3AccessPointAttachment resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a FSx S3AccessPointAttachment",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::FSx::S3AccessPointAttachment",
          desiredState,
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
      description: "Get a FSx S3AccessPointAttachment",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the FSx S3AccessPointAttachment",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::FSx::S3AccessPointAttachment",
          args.identifier,
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
    delete: {
      description: "Delete a FSx S3AccessPointAttachment",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the FSx S3AccessPointAttachment",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::FSx::S3AccessPointAttachment",
          args.identifier,
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
      description: "Sync FSx S3AccessPointAttachment state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
            "AWS::FSx::S3AccessPointAttachment",
            identifier,
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
