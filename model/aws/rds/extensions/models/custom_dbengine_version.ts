// Auto-generated extension model for @swamp/aws/rds/custom-dbengine-version
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for RDS CustomDBEngineVersion (AWS::RDS::CustomDBEngineVersion).
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

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe(
    "A key is the required name of the tag. The string value can be from 1 to 128 Unicode characters in length and can't be prefixed with aws: or rds:. The string can only contain only the set of Unicode letters, digits, white-space, '_', '.', ':', '/', '=', '+', '-', '@' (Java regex: \"^([\\\\p{L}\\\\p{Z}\\\\p{N}_.:/=+\\\\-@]*)$\").",
  ),
  Value: z.string().min(0).max(256).describe(
    "A value is the optional value of the tag. The string value can be from 1 to 256 Unicode characters in length and can't be prefixed with aws: or rds:. The string can only contain only the set of Unicode letters, digits, white-space, '_', '.', ':', '/', '=', '+', '-', '@' (Java regex: \"^([\\\\p{L}\\\\p{Z}\\\\p{N}_.:/=+\\\\-@]*)$\").",
  ).optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  DatabaseInstallationFilesS3BucketName: z.string().min(3).max(63).describe(
    "The name of an Amazon S3 bucket that contains database installation files for your CEV. For example, a valid bucket name is my-custom-installation-files.",
  ).optional(),
  DatabaseInstallationFilesS3Prefix: z.string().min(1).max(255).describe(
    "The Amazon S3 directory that contains the database installation files for your CEV. For example, a valid bucket name is 123456789012/cev1. If this setting isn't specified, no prefix is assumed.",
  ).optional(),
  Description: z.string().min(1).max(1000).describe(
    "An optional description of your CEV.",
  ).optional(),
  Engine: z.string().min(1).max(35).describe(
    "The database engine to use for your custom engine version (CEV). Valid values: custom-oracle-ee custom-oracle-ee-cdb",
  ),
  EngineVersion: z.string().min(1).max(60).describe(
    "The name of your CEV. The name format is major version.customized_string. For example, a valid CEV name is 19.my_cev1. This setting is required for RDS Custom for Oracle, but optional for Amazon RDS. The combination of Engine and EngineVersion is unique per customer per Region. *Constraints:* Minimum length is 1. Maximum length is 60. *Pattern:* ^[a-z0-9_.-]{1,60$ }",
  ),
  KMSKeyId: z.string().min(1).max(2048).describe(
    "The AWS KMS key identifier for an encrypted CEV. A symmetric encryption KMS key is required for RDS Custom, but optional for Amazon RDS. If you have an existing symmetric encryption KMS key in your account, you can use it with RDS Custom. No further action is necessary. If you don't already have a symmetric encryption KMS key in your account, follow the instructions in [Creating a symmetric encryption KMS key](https://docs.aws.amazon.com/kms/latest/developerguide/create-keys.html#create-symmetric-cmk) in the *Key Management Service Developer Guide*. You can choose the same symmetric encryption key when you create a CEV and a DB instance, or choose different keys.",
  ).optional(),
  Manifest: z.string().min(1).max(51000).describe(
    "The CEV manifest, which is a JSON document that describes the installation.zip files stored in Amazon S3. Specify the name/value pairs in a file or a quoted string. RDS Custom applies the patches in the order in which they are listed. The following JSON fields are valid: MediaImportTemplateVersion Version of the CEV manifest. The date is in the format YYYY-MM-DD. + databaseInstallationFileNames Ordered list of installation files for the CEV. + opatchFileNames Ordered list of OPatch installers used for the Oracle DB engine. + psuRuPatchFileNames The PSU and RU patches for this CEV. + OtherPatchFileNames The patches that are not in the list of PSU and RU patches. Amazon RDS applies these patches after applying the PSU and RU patches. For more information, see [Creating the CEV manifest](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/custom-cev.html#custom-cev.preparing.manifest) in the *Amazon RDS User Guide*.",
  ).optional(),
  SourceCustomDbEngineVersionIdentifier: z.string().describe(
    "The ARN of a CEV to use as a source for creating a new CEV. You can specify a different Amazon Machine Imagine (AMI) by using either Source or UseAwsProvidedLatestImage. You can't specify a different JSON manifest when you specify SourceCustomDbEngineVersionIdentifier.",
  ).optional(),
  UseAwsProvidedLatestImage: z.boolean().describe(
    "Specifies whether to use the latest service-provided Amazon Machine Image (AMI) for the CEV. If you specify UseAwsProvidedLatestImage, you can't also specify ImageId.",
  ).optional(),
  ImageId: z.string().describe("A value that indicates the ID of the AMI.")
    .optional(),
  Status: z.enum([
    "available",
    "inactive",
    "inactive-except-restore",
    "pending-validation",
  ]).describe(
    "A value that indicates the status of a custom engine version (CEV).",
  ).optional(),
  DatabaseInstallationFiles: z.array(z.string()).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of tags. For more information, see [Tagging Amazon RDS Resources](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_Tagging.html) in the *Amazon RDS User Guide.*",
  ).optional(),
});

const StateSchema = z.object({
  DatabaseInstallationFilesS3BucketName: z.string().optional(),
  DatabaseInstallationFilesS3Prefix: z.string().optional(),
  Description: z.string().optional(),
  Engine: z.string(),
  EngineVersion: z.string(),
  KMSKeyId: z.string().optional(),
  Manifest: z.string().optional(),
  DBEngineVersionArn: z.string().optional(),
  SourceCustomDbEngineVersionIdentifier: z.string().optional(),
  UseAwsProvidedLatestImage: z.boolean().optional(),
  ImageId: z.string().optional(),
  Status: z.string().optional(),
  DatabaseInstallationFiles: z.array(z.string()).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  DatabaseInstallationFilesS3BucketName: z.string().min(3).max(63).describe(
    "The name of an Amazon S3 bucket that contains database installation files for your CEV. For example, a valid bucket name is my-custom-installation-files.",
  ).optional(),
  DatabaseInstallationFilesS3Prefix: z.string().min(1).max(255).describe(
    "The Amazon S3 directory that contains the database installation files for your CEV. For example, a valid bucket name is 123456789012/cev1. If this setting isn't specified, no prefix is assumed.",
  ).optional(),
  Description: z.string().min(1).max(1000).describe(
    "An optional description of your CEV.",
  ).optional(),
  Engine: z.string().min(1).max(35).describe(
    "The database engine to use for your custom engine version (CEV). Valid values: custom-oracle-ee custom-oracle-ee-cdb",
  ).optional(),
  EngineVersion: z.string().min(1).max(60).describe(
    "The name of your CEV. The name format is major version.customized_string. For example, a valid CEV name is 19.my_cev1. This setting is required for RDS Custom for Oracle, but optional for Amazon RDS. The combination of Engine and EngineVersion is unique per customer per Region. *Constraints:* Minimum length is 1. Maximum length is 60. *Pattern:* ^[a-z0-9_.-]{1,60$ }",
  ).optional(),
  KMSKeyId: z.string().min(1).max(2048).describe(
    "The AWS KMS key identifier for an encrypted CEV. A symmetric encryption KMS key is required for RDS Custom, but optional for Amazon RDS. If you have an existing symmetric encryption KMS key in your account, you can use it with RDS Custom. No further action is necessary. If you don't already have a symmetric encryption KMS key in your account, follow the instructions in [Creating a symmetric encryption KMS key](https://docs.aws.amazon.com/kms/latest/developerguide/create-keys.html#create-symmetric-cmk) in the *Key Management Service Developer Guide*. You can choose the same symmetric encryption key when you create a CEV and a DB instance, or choose different keys.",
  ).optional(),
  Manifest: z.string().min(1).max(51000).describe(
    "The CEV manifest, which is a JSON document that describes the installation.zip files stored in Amazon S3. Specify the name/value pairs in a file or a quoted string. RDS Custom applies the patches in the order in which they are listed. The following JSON fields are valid: MediaImportTemplateVersion Version of the CEV manifest. The date is in the format YYYY-MM-DD. + databaseInstallationFileNames Ordered list of installation files for the CEV. + opatchFileNames Ordered list of OPatch installers used for the Oracle DB engine. + psuRuPatchFileNames The PSU and RU patches for this CEV. + OtherPatchFileNames The patches that are not in the list of PSU and RU patches. Amazon RDS applies these patches after applying the PSU and RU patches. For more information, see [Creating the CEV manifest](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/custom-cev.html#custom-cev.preparing.manifest) in the *Amazon RDS User Guide*.",
  ).optional(),
  SourceCustomDbEngineVersionIdentifier: z.string().describe(
    "The ARN of a CEV to use as a source for creating a new CEV. You can specify a different Amazon Machine Imagine (AMI) by using either Source or UseAwsProvidedLatestImage. You can't specify a different JSON manifest when you specify SourceCustomDbEngineVersionIdentifier.",
  ).optional(),
  UseAwsProvidedLatestImage: z.boolean().describe(
    "Specifies whether to use the latest service-provided Amazon Machine Image (AMI) for the CEV. If you specify UseAwsProvidedLatestImage, you can't also specify ImageId.",
  ).optional(),
  ImageId: z.string().describe("A value that indicates the ID of the AMI.")
    .optional(),
  Status: z.enum([
    "available",
    "inactive",
    "inactive-except-restore",
    "pending-validation",
  ]).describe(
    "A value that indicates the status of a custom engine version (CEV).",
  ).optional(),
  DatabaseInstallationFiles: z.array(z.string()).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of tags. For more information, see [Tagging Amazon RDS Resources](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_Tagging.html) in the *Amazon RDS User Guide.*",
  ).optional(),
});

/** Swamp extension model for RDS CustomDBEngineVersion. Registered at `@swamp/aws/rds/custom-dbengine-version`. */
export const model = {
  type: "@swamp/aws/rds/custom-dbengine-version",
  version: "2026.06.05.1",
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
      toVersion: "2026.05.06.1",
      description: "Added: DatabaseInstallationFiles",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.05.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "RDS CustomDBEngineVersion resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a RDS CustomDBEngineVersion",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::RDS::CustomDBEngineVersion",
          desiredState,
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
      description: "Get a RDS CustomDBEngineVersion",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the RDS CustomDBEngineVersion",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::RDS::CustomDBEngineVersion",
          args.identifier,
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
      description: "Update a RDS CustomDBEngineVersion",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
        const idParts = [
          existing.Engine?.toString(),
          existing.EngineVersion?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::RDS::CustomDBEngineVersion",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::RDS::CustomDBEngineVersion",
          identifier,
          currentState,
          desiredState,
          [
            "Engine",
            "EngineVersion",
            "DatabaseInstallationFilesS3BucketName",
            "DatabaseInstallationFilesS3Prefix",
            "DatabaseInstallationFiles",
            "ImageId",
            "KMSKeyId",
            "Manifest",
            "SourceCustomDbEngineVersionIdentifier",
            "UseAwsProvidedLatestImage",
          ],
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
      description: "Delete a RDS CustomDBEngineVersion",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the RDS CustomDBEngineVersion",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::RDS::CustomDBEngineVersion",
          args.identifier,
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
      description: "Sync RDS CustomDBEngineVersion state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
        const idParts = [
          existing.Engine?.toString(),
          existing.EngineVersion?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::RDS::CustomDBEngineVersion",
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
