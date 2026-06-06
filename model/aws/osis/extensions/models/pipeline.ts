// Auto-generated extension model for @swamp/aws/osis/pipeline
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for OSIS Pipeline (AWS::OSIS::Pipeline).
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

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
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
  BufferOptions: z.object({
    PersistentBufferEnabled: z.boolean().describe(
      "Whether persistent buffering should be enabled.",
    ),
  }).describe("Key-value pairs to configure buffering.").optional(),
  EncryptionAtRestOptions: z.object({
    KmsKeyArn: z.string().describe(
      "The KMS key to use for encrypting data. By default an AWS owned key is used",
    ),
  }).describe("Key-value pairs to configure encryption at rest.").optional(),
  LogPublishingOptions: z.object({
    IsLoggingEnabled: z.boolean().describe("Whether logs should be published.")
      .optional(),
    CloudWatchLogDestination: z.object({
      LogGroup: z.string().min(1).max(512).regex(
        new RegExp("\\/aws\\/vendedlogs\\/[\\.\\-_/#A-Za-z0-9]+"),
      ),
    }).describe(
      "The destination for OpenSearch Ingestion Service logs sent to Amazon CloudWatch.",
    ).optional(),
  }).describe("Key-value pairs to configure log publishing.").optional(),
  MaxUnits: z.number().int().min(1).max(384).describe(
    "The maximum pipeline capacity, in Ingestion OpenSearch Compute Units (OCUs).",
  ),
  MinUnits: z.number().int().min(1).max(384).describe(
    "The minimum pipeline capacity, in Ingestion OpenSearch Compute Units (OCUs).",
  ),
  PipelineConfigurationBody: z.string().min(1).max(100000).describe(
    "The Data Prepper pipeline configuration.",
  ),
  PipelineName: z.string().min(3).max(28).regex(new RegExp("[a-z][a-z0-9\\-]+"))
    .describe(
      "Name of the OpenSearch Ingestion Service pipeline to create. Pipeline names are unique across the pipelines owned by an account within an AWS Region.",
    ),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
  VpcOptions: z.object({
    SecurityGroupIds: z.array(
      z.string().min(11).max(20).regex(new RegExp("sg-\\w{8}(\\w{9})?")),
    ).describe("A list of security groups associated with the VPC endpoint.")
      .optional(),
    SubnetIds: z.array(
      z.string().min(15).max(24).regex(new RegExp("subnet-\\w{8}(\\w{9})?")),
    ).describe("A list of subnet IDs associated with the VPC endpoint."),
    VpcEndpointManagement: z.enum(["CUSTOMER", "SERVICE"]).describe(
      "Defines whether you or Amazon OpenSearch Ingestion service create and manage the VPC endpoint configured for the pipeline.",
    ).optional(),
    VpcAttachmentOptions: z.object({
      AttachToVpc: z.boolean().describe(
        "Whether the pipeline should be attached to the provided VPC",
      ),
      CidrBlock: z.string().regex(
        new RegExp(
          "^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/(3[0-2]|[12]?[0-9])$",
        ),
      ).describe(
        "The CIDR block to be reserved for OpenSearch Ingestion to create elastic network interfaces (ENIs).",
      ),
    }).describe("Options for attaching a VPC to the pipeline.").optional(),
  }).describe(
    "Container for the values required to configure VPC access for the pipeline. If you don't specify these values, OpenSearch Ingestion Service creates the pipeline with a public endpoint.",
  ).optional(),
  PipelineRoleArn: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:(aws|aws\\-cn|aws\\-us\\-gov|aws\\-iso|aws\\-iso\\-b|aws\\-iso\\-e|aws\\-iso\\-f):iam::[0-9]+:role\\/.*$",
    ),
  ).describe("The Pipeline Role (ARN) for the pipeline.").optional(),
  ResourcePolicy: z.object({
    Policy: z.record(z.string(), z.unknown()),
  }).optional(),
});

const StateSchema = z.object({
  BufferOptions: z.object({
    PersistentBufferEnabled: z.boolean(),
  }).optional(),
  EncryptionAtRestOptions: z.object({
    KmsKeyArn: z.string(),
  }).optional(),
  LogPublishingOptions: z.object({
    IsLoggingEnabled: z.boolean(),
    CloudWatchLogDestination: z.object({
      LogGroup: z.string(),
    }),
  }).optional(),
  MaxUnits: z.number().optional(),
  MinUnits: z.number().optional(),
  PipelineConfigurationBody: z.string().optional(),
  PipelineName: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  VpcOptions: z.object({
    SecurityGroupIds: z.array(z.string()),
    SubnetIds: z.array(z.string()),
    VpcEndpointManagement: z.string(),
    VpcAttachmentOptions: z.object({
      AttachToVpc: z.boolean(),
      CidrBlock: z.string(),
    }),
  }).optional(),
  VpcEndpoints: z.array(z.object({
    VpcEndpointId: z.string(),
    VpcId: z.string(),
    VpcOptions: z.object({
      SecurityGroupIds: z.array(z.string()),
      SubnetIds: z.array(z.string()),
      VpcEndpointManagement: z.string(),
      VpcAttachmentOptions: z.object({
        AttachToVpc: z.boolean(),
        CidrBlock: z.string(),
      }),
    }),
  })).optional(),
  VpcEndpointService: z.string().optional(),
  PipelineArn: z.string(),
  PipelineRoleArn: z.string().optional(),
  IngestEndpointUrls: z.array(z.string()).optional(),
  ResourcePolicy: z.object({
    Policy: z.record(z.string(), z.unknown()),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  BufferOptions: z.object({
    PersistentBufferEnabled: z.boolean().describe(
      "Whether persistent buffering should be enabled.",
    ).optional(),
  }).describe("Key-value pairs to configure buffering.").optional(),
  EncryptionAtRestOptions: z.object({
    KmsKeyArn: z.string().describe(
      "The KMS key to use for encrypting data. By default an AWS owned key is used",
    ).optional(),
  }).describe("Key-value pairs to configure encryption at rest.").optional(),
  LogPublishingOptions: z.object({
    IsLoggingEnabled: z.boolean().describe("Whether logs should be published.")
      .optional(),
    CloudWatchLogDestination: z.object({
      LogGroup: z.string().min(1).max(512).regex(
        new RegExp("\\/aws\\/vendedlogs\\/[\\.\\-_/#A-Za-z0-9]+"),
      ).optional(),
    }).describe(
      "The destination for OpenSearch Ingestion Service logs sent to Amazon CloudWatch.",
    ).optional(),
  }).describe("Key-value pairs to configure log publishing.").optional(),
  MaxUnits: z.number().int().min(1).max(384).describe(
    "The maximum pipeline capacity, in Ingestion OpenSearch Compute Units (OCUs).",
  ).optional(),
  MinUnits: z.number().int().min(1).max(384).describe(
    "The minimum pipeline capacity, in Ingestion OpenSearch Compute Units (OCUs).",
  ).optional(),
  PipelineConfigurationBody: z.string().min(1).max(100000).describe(
    "The Data Prepper pipeline configuration.",
  ).optional(),
  PipelineName: z.string().min(3).max(28).regex(new RegExp("[a-z][a-z0-9\\-]+"))
    .describe(
      "Name of the OpenSearch Ingestion Service pipeline to create. Pipeline names are unique across the pipelines owned by an account within an AWS Region.",
    ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
  VpcOptions: z.object({
    SecurityGroupIds: z.array(
      z.string().min(11).max(20).regex(new RegExp("sg-\\w{8}(\\w{9})?")),
    ).describe("A list of security groups associated with the VPC endpoint.")
      .optional(),
    SubnetIds: z.array(
      z.string().min(15).max(24).regex(new RegExp("subnet-\\w{8}(\\w{9})?")),
    ).describe("A list of subnet IDs associated with the VPC endpoint.")
      .optional(),
    VpcEndpointManagement: z.enum(["CUSTOMER", "SERVICE"]).describe(
      "Defines whether you or Amazon OpenSearch Ingestion service create and manage the VPC endpoint configured for the pipeline.",
    ).optional(),
    VpcAttachmentOptions: z.object({
      AttachToVpc: z.boolean().describe(
        "Whether the pipeline should be attached to the provided VPC",
      ).optional(),
      CidrBlock: z.string().regex(
        new RegExp(
          "^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/(3[0-2]|[12]?[0-9])$",
        ),
      ).describe(
        "The CIDR block to be reserved for OpenSearch Ingestion to create elastic network interfaces (ENIs).",
      ).optional(),
    }).describe("Options for attaching a VPC to the pipeline.").optional(),
  }).describe(
    "Container for the values required to configure VPC access for the pipeline. If you don't specify these values, OpenSearch Ingestion Service creates the pipeline with a public endpoint.",
  ).optional(),
  PipelineRoleArn: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:(aws|aws\\-cn|aws\\-us\\-gov|aws\\-iso|aws\\-iso\\-b|aws\\-iso\\-e|aws\\-iso\\-f):iam::[0-9]+:role\\/.*$",
    ),
  ).describe("The Pipeline Role (ARN) for the pipeline.").optional(),
  ResourcePolicy: z.object({
    Policy: z.record(z.string(), z.unknown()).optional(),
  }).optional(),
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

/** Swamp extension model for OSIS Pipeline. Registered at `@swamp/aws/osis/pipeline`. */
export const model = {
  type: "@swamp/aws/osis/pipeline",
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
      toVersion: "2026.05.27.1",
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
      description: "OSIS Pipeline resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a OSIS Pipeline",
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
          "AWS::OSIS::Pipeline",
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
      description: "Get a OSIS Pipeline",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the OSIS Pipeline",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::OSIS::Pipeline",
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
      description: "Update a OSIS Pipeline",
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
        const identifier = existing.PipelineArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::OSIS::Pipeline",
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
          "AWS::OSIS::Pipeline",
          identifier,
          currentState,
          desiredState,
          ["PipelineName"],
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
      description: "Delete a OSIS Pipeline",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the OSIS Pipeline",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::OSIS::Pipeline",
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
      description: "Sync OSIS Pipeline state from AWS",
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
        const identifier = existing.PipelineArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::OSIS::Pipeline",
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
