// Auto-generated extension model for @swamp/aws/sagemaker/space
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SageMaker Space (AWS::SageMaker::Space).
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

const ResourceSpecSchema = z.object({
  InstanceType: z.enum([
    "system",
    "ml.t3.micro",
    "ml.t3.small",
    "ml.t3.medium",
    "ml.t3.large",
    "ml.t3.xlarge",
    "ml.t3.2xlarge",
    "ml.m5.large",
    "ml.m5.xlarge",
    "ml.m5.2xlarge",
    "ml.m5.4xlarge",
    "ml.m5.8xlarge",
    "ml.m5.12xlarge",
    "ml.m5.16xlarge",
    "ml.m5.24xlarge",
    "ml.c5.large",
    "ml.c5.xlarge",
    "ml.c5.2xlarge",
    "ml.c5.4xlarge",
    "ml.c5.9xlarge",
    "ml.c5.12xlarge",
    "ml.c5.18xlarge",
    "ml.c5.24xlarge",
    "ml.p3.2xlarge",
    "ml.p3.8xlarge",
    "ml.p3.16xlarge",
    "ml.g4dn.xlarge",
    "ml.g4dn.2xlarge",
    "ml.g4dn.4xlarge",
    "ml.g4dn.8xlarge",
    "ml.g4dn.12xlarge",
    "ml.g4dn.16xlarge",
    "ml.r5.large",
    "ml.r5.xlarge",
    "ml.r5.2xlarge",
    "ml.r5.4xlarge",
    "ml.r5.8xlarge",
    "ml.r5.12xlarge",
    "ml.r5.16xlarge",
    "ml.r5.24xlarge",
    "ml.p3dn.24xlarge",
    "ml.m5d.large",
    "ml.m5d.xlarge",
    "ml.m5d.2xlarge",
    "ml.m5d.4xlarge",
    "ml.m5d.8xlarge",
    "ml.m5d.12xlarge",
    "ml.m5d.16xlarge",
    "ml.m5d.24xlarge",
    "ml.g5.xlarge",
    "ml.g5.2xlarge",
    "ml.g5.4xlarge",
    "ml.g5.8xlarge",
    "ml.g5.12xlarge",
    "ml.g5.16xlarge",
    "ml.g5.24xlarge",
    "ml.g5.48xlarge",
    "ml.p4d.24xlarge",
    "ml.p4de.24xlarge",
    "ml.geospatial.interactive",
    "ml.trn1.2xlarge",
    "ml.trn1.32xlarge",
    "ml.trn1n.32xlarge",
  ]).describe("The instance type that the image version runs on.").optional(),
  SageMakerImageArn: z.string().max(256).regex(
    new RegExp(
      "^arn:aws(-[\\w]+)*:sagemaker:.+:[0-9]{12}:image/[a-z0-9]([-.]?[a-z0-9])*$",
    ),
  ).describe(
    "The ARN of the SageMaker image that the image version belongs to.",
  ).optional(),
  SageMakerImageVersionArn: z.string().max(256).regex(
    new RegExp(
      "^arn:aws(-[\\w]+)*:sagemaker:.+:[0-9]{12}:image-version/[a-z0-9]([-.]?[a-z0-9])*/[0-9]+$",
    ),
  ).describe("The ARN of the image version created on the instance.")
    .optional(),
  LifecycleConfigArn: z.string().max(256).regex(
    new RegExp(
      "arn:aws[a-z\\-]*:sagemaker:[a-z0-9\\-]*:[0-9]{12}:studio-lifecycle-config/.*",
    ),
  ).describe(
    "The Amazon Resource Name (ARN) of the Lifecycle Configuration to attach to the Resource.",
  ).optional(),
});

const JupyterServerAppSettingsSchema = z.object({
  DefaultResourceSpec: ResourceSpecSchema.optional(),
  LifecycleConfigArns: z.array(
    z.string().max(256).regex(
      new RegExp(
        "arn:aws[a-z\\-]*:sagemaker:[a-z0-9\\-]*:[0-9]{12}:studio-lifecycle-config/.*",
      ),
    ),
  ).describe(
    "A list of LifecycleConfigArns available for use with JupyterServer apps.",
  ).optional(),
});

const CustomImageSchema = z.object({
  AppImageConfigName: z.string().max(63).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9]){0,62}"),
  ).describe("The Name of the AppImageConfig."),
  ImageName: z.string().max(63).regex(
    new RegExp("^[a-zA-Z0-9]([-.]?[a-zA-Z0-9]){0,62}$"),
  ).describe("The name of the CustomImage. Must be unique to your account."),
  ImageVersionNumber: z.number().int().min(0).describe(
    "The version number of the CustomImage.",
  ).optional(),
});

const KernelGatewayAppSettingsSchema = z.object({
  CustomImages: z.array(CustomImageSchema).describe(
    "A list of custom SageMaker images that are configured to run as a KernelGateway app.",
  ).optional(),
  DefaultResourceSpec: ResourceSpecSchema.describe(
    "The default instance type and the Amazon Resource Name (ARN) of the default SageMaker image used by the KernelGateway app.",
  ).optional(),
  LifecycleConfigArns: z.array(
    z.string().max(256).regex(
      new RegExp(
        "arn:aws[a-z\\-]*:sagemaker:[a-z0-9\\-]*:[0-9]{12}:studio-lifecycle-config/.*",
      ),
    ),
  ).describe(
    "A list of LifecycleConfigArns available for use with KernelGateway apps.",
  ).optional(),
});

const SpaceIdleSettingsSchema = z.object({
  IdleTimeoutInMinutes: z.number().int().min(60).max(525600).describe(
    "The space idle timeout value set in minutes",
  ).optional(),
});

const SpaceAppLifecycleManagementSchema = z.object({
  IdleSettings: SpaceIdleSettingsSchema.optional(),
});

const CodeRepositorySchema = z.object({
  RepositoryUrl: z.string().max(256).regex(
    new RegExp("^https://([.\\-_a-zA-Z0-9]+/?){3,1016}$"),
  ).describe(
    "A CodeRepository (valid URL) to be used within Jupyter's Git extension.",
  ),
});

const SpaceJupyterLabAppSettingsSchema = z.object({
  DefaultResourceSpec: ResourceSpecSchema.optional(),
  AppLifecycleManagement: SpaceAppLifecycleManagementSchema.optional(),
  CodeRepositories: z.array(CodeRepositorySchema).describe(
    "A list of CodeRepositories available for use with JupyterLab apps.",
  ).optional(),
});

const SpaceCodeEditorAppSettingsSchema = z.object({
  DefaultResourceSpec: ResourceSpecSchema.optional(),
  AppLifecycleManagement: SpaceAppLifecycleManagementSchema.optional(),
});

const EbsStorageSettingsSchema = z.object({
  EbsVolumeSizeInGb: z.number().int().min(5).max(16384).describe(
    "Size of the Amazon EBS volume in Gb",
  ),
});

const SpaceStorageSettingsSchema = z.object({
  EbsStorageSettings: EbsStorageSettingsSchema.describe(
    "Properties related to the space's Amazon Elastic Block Store volume.",
  ).optional(),
});

const EFSFileSystemSchema = z.object({
  FileSystemId: z.string().min(11).max(21).regex(
    new RegExp("^(fs-[0-9a-f]{8,})$"),
  ),
});

const FSxLustreFileSystemSchema = z.object({
  FileSystemId: z.string().min(11).max(21).regex(
    new RegExp("^(fs-[0-9a-f]{8,})$"),
  ),
});

const S3FileSystemSchema = z.object({
  S3Uri: z.string().min(0).max(1024).regex(new RegExp("(s3)://([^/]+)/?(.*)"))
    .optional(),
});

const CustomFileSystemSchema = z.object({
  EFSFileSystem: EFSFileSystemSchema.optional(),
  FSxLustreFileSystem: FSxLustreFileSystemSchema.optional(),
  S3FileSystem: S3FileSystemSchema.optional(),
});

const TagSchema = z.object({
  Value: z.string().min(1).max(128),
  Key: z.string().min(1).max(128),
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
  DomainId: z.string().min(1).max(63).describe(
    "The ID of the associated Domain.",
  ),
  SpaceName: z.string().min(1).max(63).describe("A name for the Space."),
  SpaceSettings: z.object({
    JupyterServerAppSettings: JupyterServerAppSettingsSchema.describe(
      "The Jupyter server's app settings.",
    ).optional(),
    KernelGatewayAppSettings: KernelGatewayAppSettingsSchema.describe(
      "The kernel gateway app settings.",
    ).optional(),
    JupyterLabAppSettings: SpaceJupyterLabAppSettingsSchema.describe(
      "The JupyterLab app settings.",
    ).optional(),
    CodeEditorAppSettings: SpaceCodeEditorAppSettingsSchema.describe(
      "The CodeEditor app settings.",
    ).optional(),
    SpaceStorageSettings: SpaceStorageSettingsSchema.describe(
      "Default storage settings for a space.",
    ).optional(),
    SpaceManagedResources: z.enum(["ENABLED", "DISABLED"]).describe(
      "This is a flag used to indicate if space managed resources needs to be created.",
    ).optional(),
    RemoteAccess: z.enum(["ENABLED", "DISABLED"]).describe(
      "This is a flag used to indicate if remote access is enabled.",
    ).optional(),
    AppType: z.enum([
      "JupyterServer",
      "KernelGateway",
      "TensorBoard",
      "RStudioServerPro",
      "RSessionGateway",
      "JupyterLab",
      "CodeEditor",
    ]).optional(),
    CustomFileSystems: z.array(CustomFileSystemSchema).optional(),
  }).describe("A collection of settings.").optional(),
  Tags: z.array(TagSchema).describe("A list of tags to apply to the space.")
    .optional(),
  OwnershipSettings: z.object({
    OwnerUserProfileName: z.string().max(63).regex(
      new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9]){0,62}"),
    ),
  }).optional(),
  SpaceSharingSettings: z.object({
    SharingType: z.enum(["Private", "Shared"]),
  }).optional(),
  SpaceDisplayName: z.string().max(64).regex(new RegExp("^(?!\\s*$).+"))
    .optional(),
});

const StateSchema = z.object({
  SpaceArn: z.string().optional(),
  DomainId: z.string(),
  SpaceName: z.string(),
  SpaceSettings: z.object({
    JupyterServerAppSettings: JupyterServerAppSettingsSchema,
    KernelGatewayAppSettings: KernelGatewayAppSettingsSchema,
    JupyterLabAppSettings: SpaceJupyterLabAppSettingsSchema,
    CodeEditorAppSettings: SpaceCodeEditorAppSettingsSchema,
    SpaceStorageSettings: SpaceStorageSettingsSchema,
    SpaceManagedResources: z.string(),
    RemoteAccess: z.string(),
    AppType: z.string(),
    CustomFileSystems: z.array(CustomFileSystemSchema),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
  OwnershipSettings: z.object({
    OwnerUserProfileName: z.string(),
  }).optional(),
  SpaceSharingSettings: z.object({
    SharingType: z.string(),
  }).optional(),
  SpaceDisplayName: z.string().optional(),
  Url: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  DomainId: z.string().min(1).max(63).describe(
    "The ID of the associated Domain.",
  ).optional(),
  SpaceName: z.string().min(1).max(63).describe("A name for the Space.")
    .optional(),
  SpaceSettings: z.object({
    JupyterServerAppSettings: JupyterServerAppSettingsSchema.describe(
      "The Jupyter server's app settings.",
    ).optional(),
    KernelGatewayAppSettings: KernelGatewayAppSettingsSchema.describe(
      "The kernel gateway app settings.",
    ).optional(),
    JupyterLabAppSettings: SpaceJupyterLabAppSettingsSchema.describe(
      "The JupyterLab app settings.",
    ).optional(),
    CodeEditorAppSettings: SpaceCodeEditorAppSettingsSchema.describe(
      "The CodeEditor app settings.",
    ).optional(),
    SpaceStorageSettings: SpaceStorageSettingsSchema.describe(
      "Default storage settings for a space.",
    ).optional(),
    SpaceManagedResources: z.enum(["ENABLED", "DISABLED"]).describe(
      "This is a flag used to indicate if space managed resources needs to be created.",
    ).optional(),
    RemoteAccess: z.enum(["ENABLED", "DISABLED"]).describe(
      "This is a flag used to indicate if remote access is enabled.",
    ).optional(),
    AppType: z.enum([
      "JupyterServer",
      "KernelGateway",
      "TensorBoard",
      "RStudioServerPro",
      "RSessionGateway",
      "JupyterLab",
      "CodeEditor",
    ]).optional(),
    CustomFileSystems: z.array(CustomFileSystemSchema).optional(),
  }).describe("A collection of settings.").optional(),
  Tags: z.array(TagSchema).describe("A list of tags to apply to the space.")
    .optional(),
  OwnershipSettings: z.object({
    OwnerUserProfileName: z.string().max(63).regex(
      new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9]){0,62}"),
    ).optional(),
  }).optional(),
  SpaceSharingSettings: z.object({
    SharingType: z.enum(["Private", "Shared"]).optional(),
  }).optional(),
  SpaceDisplayName: z.string().max(64).regex(new RegExp("^(?!\\s*$).+"))
    .optional(),
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

/** Swamp extension model for SageMaker Space. Registered at `@swamp/aws/sagemaker/space`. */
export const model = {
  type: "@swamp/aws/sagemaker/space",
  version: "2026.06.06.1",
  upgrades: [
    {
      toVersion: "2026.04.01.2",
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
      description: "SageMaker Space resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SageMaker Space",
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
          "AWS::SageMaker::Space",
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
      description: "Get a SageMaker Space",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SageMaker Space",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::SageMaker::Space",
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
      description: "Update a SageMaker Space",
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
        const idParts = [
          existing.DomainId?.toString(),
          existing.SpaceName?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::SageMaker::Space",
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
          "AWS::SageMaker::Space",
          identifier,
          currentState,
          desiredState,
          [
            "DomainId",
            "SpaceName",
            "SpaceSharingSettings",
            "OwnershipSettings",
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
      description: "Delete a SageMaker Space",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SageMaker Space",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::SageMaker::Space",
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
      description: "Sync SageMaker Space state from AWS",
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
        const idParts = [
          existing.DomainId?.toString(),
          existing.SpaceName?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::SageMaker::Space",
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
