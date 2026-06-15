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

// Auto-generated extension model for @swamp/aws/apprunner/service
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any no-control-regex

/**
 * Swamp extension model for AppRunner Service (AWS::AppRunner::Service).
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

const SourceCodeVersionSchema = z.object({
  Type: z.enum(["BRANCH"]).describe("Source Code Version Type"),
  Value: z.string().describe("Source Code Version Value"),
});

const KeyValuePairSchema = z.object({
  Name: z.string().optional(),
  Value: z.string().optional(),
});

const CodeConfigurationValuesSchema = z.object({
  Runtime: z.enum([
    "PYTHON_3",
    "NODEJS_12",
    "NODEJS_14",
    "CORRETTO_8",
    "CORRETTO_11",
    "NODEJS_16",
    "GO_1",
    "DOTNET_6",
    "PHP_81",
    "RUBY_31",
    "PYTHON_311",
    "NODEJS_18",
    "NODEJS_22",
  ]).describe("Runtime"),
  BuildCommand: z.string().describe("Build Command").optional(),
  StartCommand: z.string().describe("Start Command").optional(),
  Port: z.string().describe("Port").optional(),
  RuntimeEnvironmentVariables: z.array(KeyValuePairSchema).optional(),
  RuntimeEnvironmentSecrets: z.array(KeyValuePairSchema).describe(
    "The secrets and parameters that get referenced by your service as environment variables",
  ).optional(),
});

const CodeConfigurationSchema = z.object({
  ConfigurationSource: z.enum(["REPOSITORY", "API"]).describe(
    "Configuration Source",
  ),
  CodeConfigurationValues: CodeConfigurationValuesSchema.describe(
    "Code Configuration Values",
  ).optional(),
});

const CodeRepositorySchema = z.object({
  RepositoryUrl: z.string().describe("Repository Url"),
  SourceCodeVersion: SourceCodeVersionSchema.describe("Source Code Version"),
  CodeConfiguration: CodeConfigurationSchema.describe("Code Configuration")
    .optional(),
  SourceDirectory: z.string().min(1).max(4096).regex(new RegExp("[^\\x00]+"))
    .describe("Source Directory").optional(),
});

const ImageConfigurationSchema = z.object({
  StartCommand: z.string().describe("Start Command").optional(),
  Port: z.string().describe("Port").optional(),
  RuntimeEnvironmentVariables: z.array(KeyValuePairSchema).optional(),
  RuntimeEnvironmentSecrets: z.array(KeyValuePairSchema).describe(
    "The secrets and parameters that get referenced by your service as environment variables",
  ).optional(),
});

const ImageRepositorySchema = z.object({
  ImageIdentifier: z.string().min(1).max(1024).regex(
    new RegExp(
      "([0-9]{12}.dkr.ecr.[a-z\\-]+-[0-9]{1}.amazonaws.com\\/.*)|(^public\\.ecr\\.aws\\/.+\\/.+)",
    ),
  ).describe("Image Identifier"),
  ImageConfiguration: ImageConfigurationSchema.describe("Image Configuration")
    .optional(),
  ImageRepositoryType: z.enum(["ECR", "ECR_PUBLIC"]).describe(
    "Image Repository Type",
  ),
});

const AuthenticationConfigurationSchema = z.object({
  ConnectionArn: z.string().min(1).max(1011).regex(
    new RegExp(
      "arn:aws(-[\\w]+)*:[a-z0-9-\\\\.]{0,63}:[a-z0-9-\\\\.]{0,63}:[0-9]{12}:(\\w|\\/|-){1,1011}",
    ),
  ).describe("Connection Arn").optional(),
  AccessRoleArn: z.string().min(29).max(1024).regex(
    new RegExp(
      "arn:(aws|aws-us-gov|aws-cn|aws-iso|aws-iso-b):iam::[0-9]{12}:role/[\\w+=,.@-]{1,64}",
    ),
  ).describe("Access Role Arn").optional(),
});

const TagSchema = z.object({
  Key: z.string().optional(),
  Value: z.string().optional(),
});

const EgressConfigurationSchema = z.object({
  EgressType: z.enum(["DEFAULT", "VPC"]).describe("Network egress type."),
  VpcConnectorArn: z.string().min(44).max(1011).regex(
    new RegExp(
      "arn:aws(-[\\w]+)*:[a-z0-9-\\\\.]{0,63}:[a-z0-9-\\\\.]{0,63}:[0-9]{12}:(\\w|\\/|-){1,1011}",
    ),
  ).describe("The Amazon Resource Name (ARN) of the App Runner VpcConnector.")
    .optional(),
});

const IngressConfigurationSchema = z.object({
  IsPubliclyAccessible: z.boolean().describe(
    "It's set to true if the Apprunner service is publicly accessible. It's set to false otherwise.",
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
  ServiceName: z.string().min(4).max(40).regex(
    new RegExp("[A-Za-z0-9][A-Za-z0-9-_]{3,39}"),
  ).describe("The AppRunner Service Name.").optional(),
  SourceConfiguration: z.object({
    CodeRepository: CodeRepositorySchema.describe("Source Code Repository")
      .optional(),
    ImageRepository: ImageRepositorySchema.describe("Image Repository")
      .optional(),
    AutoDeploymentsEnabled: z.boolean().describe("Auto Deployment enabled")
      .optional(),
    AuthenticationConfiguration: AuthenticationConfigurationSchema.describe(
      "Authentication Configuration",
    ).optional(),
  }).describe("Source Code configuration"),
  InstanceConfiguration: z.object({
    Cpu: z.string().min(3).max(9).regex(
      new RegExp("256|512|1024|2048|4096|(0.25|0.5|1|2|4) vCPU"),
    ).describe("CPU").optional(),
    Memory: z.string().min(3).max(6).regex(
      new RegExp(
        "512|1024|2048|3072|4096|6144|8192|10240|12288|(0.5|1|2|3|4|6|8|10|12) GB",
      ),
    ).describe("Memory").optional(),
    InstanceRoleArn: z.string().min(29).max(1024).regex(
      new RegExp(
        "arn:(aws|aws-us-gov|aws-cn|aws-iso|aws-iso-b):iam::[0-9]{12}:role/[\\w+=,.@-]{1,64}",
      ),
    ).describe("Instance Role Arn").optional(),
  }).describe("Instance Configuration").optional(),
  Tags: z.array(TagSchema).optional(),
  EncryptionConfiguration: z.object({
    KmsKey: z.string().min(0).max(256).regex(
      new RegExp(
        "arn:aws(-[\\w]+)*:kms:[a-z\\-]+-[0-9]{1}:[0-9]{12}:key\\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}",
      ),
    ).describe("The KMS Key"),
  }).describe("Encryption configuration (KMS key)").optional(),
  HealthCheckConfiguration: z.object({
    Protocol: z.enum(["TCP", "HTTP"]).describe("Health Check Protocol")
      .optional(),
    Path: z.string().describe("Health check Path").optional(),
    Interval: z.number().int().describe("Health check Interval").optional(),
    Timeout: z.number().int().min(1).max(20).describe("Health check Timeout")
      .optional(),
    HealthyThreshold: z.number().int().min(1).max(20).describe(
      "Health check Healthy Threshold",
    ).optional(),
    UnhealthyThreshold: z.number().int().min(1).max(20).describe(
      "Health check Unhealthy Threshold",
    ).optional(),
  }).describe("Health check configuration").optional(),
  ObservabilityConfiguration: z.object({
    ObservabilityEnabled: z.boolean().describe("Observability enabled"),
    ObservabilityConfigurationArn: z.string().min(1).max(1011).regex(
      new RegExp(
        "arn:aws(-[\\w]+)*:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[0-9]{12}:(\\w|/|-){1,1011}",
      ),
    ).describe(
      "The Amazon Resource Name (ARN) of the App Runner ObservabilityConfiguration.",
    ).optional(),
  }).describe("Service observability configuration").optional(),
  AutoScalingConfigurationArn: z.string().min(1).max(1011).regex(
    new RegExp(
      "arn:aws(-[\\w]+)*:[a-z0-9-\\\\.]{0,63}:[a-z0-9-\\\\.]{0,63}:[0-9]{12}:(\\w|\\/|-){1,1011}",
    ),
  ).describe("Autoscaling configuration ARN").optional(),
  NetworkConfiguration: z.object({
    EgressConfiguration: EgressConfigurationSchema.describe(
      "Network egress configuration",
    ).optional(),
    IngressConfiguration: IngressConfigurationSchema.describe(
      "Network ingress configuration",
    ).optional(),
    IpAddressType: z.enum(["IPV4", "DUAL_STACK"]).describe(
      "App Runner service endpoint IP address type",
    ).optional(),
  }).describe("Network configuration").optional(),
});

const StateSchema = z.object({
  ServiceName: z.string().optional(),
  ServiceId: z.string().optional(),
  ServiceArn: z.string(),
  ServiceUrl: z.string().optional(),
  Status: z.string().optional(),
  SourceConfiguration: z.object({
    CodeRepository: CodeRepositorySchema,
    ImageRepository: ImageRepositorySchema,
    AutoDeploymentsEnabled: z.boolean(),
    AuthenticationConfiguration: AuthenticationConfigurationSchema,
  }).optional(),
  InstanceConfiguration: z.object({
    Cpu: z.string(),
    Memory: z.string(),
    InstanceRoleArn: z.string(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
  EncryptionConfiguration: z.object({
    KmsKey: z.string(),
  }).optional(),
  HealthCheckConfiguration: z.object({
    Protocol: z.string(),
    Path: z.string(),
    Interval: z.number(),
    Timeout: z.number(),
    HealthyThreshold: z.number(),
    UnhealthyThreshold: z.number(),
  }).optional(),
  ObservabilityConfiguration: z.object({
    ObservabilityEnabled: z.boolean(),
    ObservabilityConfigurationArn: z.string(),
  }).optional(),
  AutoScalingConfigurationArn: z.string().optional(),
  NetworkConfiguration: z.object({
    EgressConfiguration: EgressConfigurationSchema,
    IngressConfiguration: IngressConfigurationSchema,
    IpAddressType: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  ServiceName: z.string().min(4).max(40).regex(
    new RegExp("[A-Za-z0-9][A-Za-z0-9-_]{3,39}"),
  ).describe("The AppRunner Service Name.").optional(),
  SourceConfiguration: z.object({
    CodeRepository: CodeRepositorySchema.describe("Source Code Repository")
      .optional(),
    ImageRepository: ImageRepositorySchema.describe("Image Repository")
      .optional(),
    AutoDeploymentsEnabled: z.boolean().describe("Auto Deployment enabled")
      .optional(),
    AuthenticationConfiguration: AuthenticationConfigurationSchema.describe(
      "Authentication Configuration",
    ).optional(),
  }).describe("Source Code configuration").optional(),
  InstanceConfiguration: z.object({
    Cpu: z.string().min(3).max(9).regex(
      new RegExp("256|512|1024|2048|4096|(0.25|0.5|1|2|4) vCPU"),
    ).describe("CPU").optional(),
    Memory: z.string().min(3).max(6).regex(
      new RegExp(
        "512|1024|2048|3072|4096|6144|8192|10240|12288|(0.5|1|2|3|4|6|8|10|12) GB",
      ),
    ).describe("Memory").optional(),
    InstanceRoleArn: z.string().min(29).max(1024).regex(
      new RegExp(
        "arn:(aws|aws-us-gov|aws-cn|aws-iso|aws-iso-b):iam::[0-9]{12}:role/[\\w+=,.@-]{1,64}",
      ),
    ).describe("Instance Role Arn").optional(),
  }).describe("Instance Configuration").optional(),
  Tags: z.array(TagSchema).optional(),
  EncryptionConfiguration: z.object({
    KmsKey: z.string().min(0).max(256).regex(
      new RegExp(
        "arn:aws(-[\\w]+)*:kms:[a-z\\-]+-[0-9]{1}:[0-9]{12}:key\\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}",
      ),
    ).describe("The KMS Key").optional(),
  }).describe("Encryption configuration (KMS key)").optional(),
  HealthCheckConfiguration: z.object({
    Protocol: z.enum(["TCP", "HTTP"]).describe("Health Check Protocol")
      .optional(),
    Path: z.string().describe("Health check Path").optional(),
    Interval: z.number().int().describe("Health check Interval").optional(),
    Timeout: z.number().int().min(1).max(20).describe("Health check Timeout")
      .optional(),
    HealthyThreshold: z.number().int().min(1).max(20).describe(
      "Health check Healthy Threshold",
    ).optional(),
    UnhealthyThreshold: z.number().int().min(1).max(20).describe(
      "Health check Unhealthy Threshold",
    ).optional(),
  }).describe("Health check configuration").optional(),
  ObservabilityConfiguration: z.object({
    ObservabilityEnabled: z.boolean().describe("Observability enabled")
      .optional(),
    ObservabilityConfigurationArn: z.string().min(1).max(1011).regex(
      new RegExp(
        "arn:aws(-[\\w]+)*:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[0-9]{12}:(\\w|/|-){1,1011}",
      ),
    ).describe(
      "The Amazon Resource Name (ARN) of the App Runner ObservabilityConfiguration.",
    ).optional(),
  }).describe("Service observability configuration").optional(),
  AutoScalingConfigurationArn: z.string().min(1).max(1011).regex(
    new RegExp(
      "arn:aws(-[\\w]+)*:[a-z0-9-\\\\.]{0,63}:[a-z0-9-\\\\.]{0,63}:[0-9]{12}:(\\w|\\/|-){1,1011}",
    ),
  ).describe("Autoscaling configuration ARN").optional(),
  NetworkConfiguration: z.object({
    EgressConfiguration: EgressConfigurationSchema.describe(
      "Network egress configuration",
    ).optional(),
    IngressConfiguration: IngressConfigurationSchema.describe(
      "Network ingress configuration",
    ).optional(),
    IpAddressType: z.enum(["IPV4", "DUAL_STACK"]).describe(
      "App Runner service endpoint IP address type",
    ).optional(),
  }).describe("Network configuration").optional(),
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

/** Swamp extension model for AppRunner Service. Registered at `@swamp/aws/apprunner/service`. */
export const model = {
  type: "@swamp/aws/apprunner/service",
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
      description: "AppRunner Service resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a AppRunner Service",
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
          "AWS::AppRunner::Service",
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
      description: "Get a AppRunner Service",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AppRunner Service",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::AppRunner::Service",
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
      description: "Update a AppRunner Service",
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
        const identifier = existing.ServiceArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::AppRunner::Service",
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
          "AWS::AppRunner::Service",
          identifier,
          currentState,
          desiredState,
          ["ServiceName", "EncryptionConfiguration", "Tags"],
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
      description: "Delete a AppRunner Service",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AppRunner Service",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::AppRunner::Service",
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
      description: "Sync AppRunner Service state from AWS",
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
        const identifier = existing.ServiceArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::AppRunner::Service",
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
