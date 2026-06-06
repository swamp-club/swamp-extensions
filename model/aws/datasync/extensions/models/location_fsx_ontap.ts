// Auto-generated extension model for @swamp/aws/datasync/location-fsx-ontap
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for DataSync LocationFSxONTAP (AWS::DataSync::LocationFSxONTAP).
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

const NfsMountOptionsSchema = z.object({
  Version: z.enum(["AUTOMATIC", "NFS3", "NFS4_0", "NFS4_1"]).describe(
    "The specific NFS version that you want DataSync to use to mount your NFS share.",
  ).optional(),
});

const NFSSchema = z.object({
  MountOptions: NfsMountOptionsSchema.describe(
    "The NFS mount options that DataSync can use to mount your NFS share.",
  ),
});

const SmbMountOptionsSchema = z.object({
  Version: z.enum(["AUTOMATIC", "SMB2", "SMB3"]).describe(
    "The specific SMB version that you want DataSync to use to mount your SMB share.",
  ).optional(),
});

const CmkSecretConfigSchema = z.object({
  KmsKeyArn: z.string().max(2048).regex(
    new RegExp(
      "^(arn:(aws|aws-cn|aws-us-gov|aws-eusc|aws-iso|aws-iso-b):kms:[a-z-0-9]+:[0-9]{12}:key/.*|)$",
    ),
  ).describe(
    "Specifies the ARN for the customer-managed AWS KMS key used to encrypt the secret specified for SecretArn. DataSync provides this key to AWS Secrets Manager.",
  ).optional(),
});

const CustomSecretConfigSchema = z.object({
  SecretAccessRoleArn: z.string().max(2048).regex(
    new RegExp(
      "^(arn:(aws|aws-cn|aws-us-gov|aws-eusc|aws-iso|aws-iso-b):iam::[0-9]{12}:role/.*|)$",
    ),
  ).describe(
    "Specifies the ARN for the AWS Identity and Access Management role that DataSync uses to access the secret specified for SecretArn.",
  ),
});

const SMBSchema = z.object({
  MountOptions: SmbMountOptionsSchema.describe(
    "The mount options used by DataSync to access the SMB server.",
  ),
  Domain: z.string().max(253).regex(
    new RegExp("^([A-Za-z0-9]+[A-Za-z0-9-.]*)*[A-Za-z0-9-]*[A-Za-z0-9]$"),
  ).describe("The name of the Windows domain that the SMB server belongs to.")
    .optional(),
  Password: z.string().max(104).regex(new RegExp("^.{0,104}$")).describe(
    "The password of the user who can mount the share and has the permissions to access files and folders in the SMB share.",
  ).optional(),
  User: z.string().max(104).regex(
    new RegExp("^[^\\x5B\\x5D\\\\/:;|=,+*?]{1,104}$"),
  ).describe(
    "The user who can mount the share, has the permissions to access files and folders in the SMB share.",
  ),
  CmkSecretConfig: CmkSecretConfigSchema.describe(
    "Specifies configuration information for a DataSync-managed secret, such as an authentication token or set of credentials that DataSync uses to access a specific transfer location, and a customer-managed AWS KMS key.",
  ).optional(),
  CustomSecretConfig: CustomSecretConfigSchema.describe(
    "Specifies configuration information for a customer-managed secret, such as an authentication token or set of credentials that DataSync uses to access a specific transfer location, and an IAM role that DataSync can assume and access the customer-managed secret.",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(256).regex(new RegExp("^[a-zA-Z0-9\\s+=._:/-]+$"))
    .describe("The key for an AWS resource tag."),
  Value: z.string().min(1).max(256).regex(
    new RegExp("^[a-zA-Z0-9\\s+=._:@/-]+$"),
  ).describe("The value for an AWS resource tag."),
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
  StorageVirtualMachineArn: z.string().max(162).regex(
    new RegExp(
      "^arn:(aws|aws-cn|aws-us-gov|aws-eusc|aws-iso|aws-iso-b):fsx:[a-z\\-0-9]+:[0-9]{12}:storage-virtual-machine/fs-[0-9a-f]+/svm-[0-9a-f]{17,}$",
    ),
  ).describe("The Amazon Resource Name (ARN) for the FSx ONTAP SVM."),
  SecurityGroupArns: z.array(
    z.string().max(128).regex(
      new RegExp(
        "^arn:(aws|aws-cn|aws-us-gov|aws-eusc|aws-iso|aws-iso-b):ec2:[a-z\\-0-9]*:[0-9]{12}:security-group/sg-[a-f0-9]+$",
      ),
    ),
  ).describe(
    "The ARNs of the security groups that are to use to configure the FSx ONTAP file system.",
  ),
  Protocol: z.object({
    NFS: NFSSchema.describe(
      "NFS protocol configuration for FSx ONTAP file system.",
    ).optional(),
    SMB: SMBSchema.describe(
      "SMB protocol configuration for FSx ONTAP file system.",
    ).optional(),
  }).describe("Configuration settings for NFS or SMB protocol.").optional(),
  Subdirectory: z.string().max(4096).regex(
    new RegExp("^[a-zA-Z0-9_\\-\\+\\./\\(\\)\\$\\p{Zs}]+$", "u"),
  ).describe("A subdirectory in the location's path.").optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  StorageVirtualMachineArn: z.string().optional(),
  FsxFilesystemArn: z.string().optional(),
  SecurityGroupArns: z.array(z.string()).optional(),
  Protocol: z.object({
    NFS: NFSSchema,
    SMB: SMBSchema,
  }).optional(),
  Subdirectory: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  LocationArn: z.string(),
  LocationUri: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  StorageVirtualMachineArn: z.string().max(162).regex(
    new RegExp(
      "^arn:(aws|aws-cn|aws-us-gov|aws-eusc|aws-iso|aws-iso-b):fsx:[a-z\\-0-9]+:[0-9]{12}:storage-virtual-machine/fs-[0-9a-f]+/svm-[0-9a-f]{17,}$",
    ),
  ).describe("The Amazon Resource Name (ARN) for the FSx ONTAP SVM.")
    .optional(),
  SecurityGroupArns: z.array(
    z.string().max(128).regex(
      new RegExp(
        "^arn:(aws|aws-cn|aws-us-gov|aws-eusc|aws-iso|aws-iso-b):ec2:[a-z\\-0-9]*:[0-9]{12}:security-group/sg-[a-f0-9]+$",
      ),
    ),
  ).describe(
    "The ARNs of the security groups that are to use to configure the FSx ONTAP file system.",
  ).optional(),
  Protocol: z.object({
    NFS: NFSSchema.describe(
      "NFS protocol configuration for FSx ONTAP file system.",
    ).optional(),
    SMB: SMBSchema.describe(
      "SMB protocol configuration for FSx ONTAP file system.",
    ).optional(),
  }).describe("Configuration settings for NFS or SMB protocol.").optional(),
  Subdirectory: z.string().max(4096).regex(
    new RegExp("^[a-zA-Z0-9_\\-\\+\\./\\(\\)\\$\\p{Zs}]+$", "u"),
  ).describe("A subdirectory in the location's path.").optional(),
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

/** Swamp extension model for DataSync LocationFSxONTAP. Registered at `@swamp/aws/datasync/location-fsx-ontap`. */
export const model = {
  type: "@swamp/aws/datasync/location-fsx-ontap",
  version: "2026.06.06.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "DataSync LocationFSxONTAP resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a DataSync LocationFSxONTAP",
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
          "AWS::DataSync::LocationFSxONTAP",
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
      description: "Get a DataSync LocationFSxONTAP",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DataSync LocationFSxONTAP",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::DataSync::LocationFSxONTAP",
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
      description: "Update a DataSync LocationFSxONTAP",
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
        const identifier = existing.LocationArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::DataSync::LocationFSxONTAP",
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
          "AWS::DataSync::LocationFSxONTAP",
          identifier,
          currentState,
          desiredState,
          ["StorageVirtualMachineArn", "SecurityGroupArns"],
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
      description: "Delete a DataSync LocationFSxONTAP",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DataSync LocationFSxONTAP",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::DataSync::LocationFSxONTAP",
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
      description: "Sync DataSync LocationFSxONTAP state from AWS",
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
        const identifier = existing.LocationArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::DataSync::LocationFSxONTAP",
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
