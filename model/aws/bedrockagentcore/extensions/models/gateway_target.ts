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

// Auto-generated extension model for @swamp/aws/bedrockagentcore/gateway-target
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for BedrockAgentCore GatewayTarget (AWS::BedrockAgentCore::GatewayTarget).
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

const S3CertificateConfigurationSchema = z.object({
  Uri: z.string().regex(new RegExp("^s3://.{1,2043}$")),
  BucketOwnerAccountId: z.string().regex(new RegExp("^[0-9]{12}$")).optional(),
});

const SecretsManagerCertificateConfigurationSchema = z.object({
  SecretArn: z.string().regex(
    new RegExp(
      "^arn:aws(-[^:]+)?:secretsmanager:[a-z0-9-]+:[0-9]{12}:secret:.+$",
    ),
  ),
});

const OAuthCredentialProviderSchema = z.object({
  ProviderArn: z.string().regex(
    new RegExp("^arn:([^:]*):([^:]*):([^:]*):([0-9]{12})?:(.+)$"),
  ),
  Scopes: z.array(z.string().min(1).max(128)),
  CustomParameters: z.record(z.string(), z.string().min(1).max(2048))
    .optional(),
  GrantType: z.enum([
    "CLIENT_CREDENTIALS",
    "AUTHORIZATION_CODE",
    "TOKEN_EXCHANGE",
  ]).optional(),
  DefaultReturnUrl: z.string().min(1).max(2048).regex(
    new RegExp("^\\w+:(\\/?\\/?)[^\\s]+$"),
  ).optional(),
});

const ApiKeyCredentialProviderSchema = z.object({
  ProviderArn: z.string().regex(
    new RegExp("^arn:([^:]*):([^:]*):([^:]*):([0-9]{12})?:(.+)$"),
  ),
  CredentialParameterName: z.string().min(1).max(64).optional(),
  CredentialPrefix: z.string().min(1).max(64).optional(),
  CredentialLocation: z.enum(["HEADER", "QUERY_PARAMETER"]).optional(),
});

const IamCredentialProviderSchema = z.object({
  Service: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9._-]+$")),
  Region: z.string().min(1).max(32).regex(new RegExp("^[a-zA-Z0-9-]+$"))
    .optional(),
});

const CredentialProviderConfigurationSchema = z.object({
  CredentialProviderType: z.enum([
    "GATEWAY_IAM_ROLE",
    "OAUTH",
    "API_KEY",
    "CALLER_IAM_CREDENTIALS",
    "JWT_PASSTHROUGH",
  ]),
  CredentialProvider: z.object({
    OauthCredentialProvider: OAuthCredentialProviderSchema.optional(),
    ApiKeyCredentialProvider: ApiKeyCredentialProviderSchema.optional(),
    IamCredentialProvider: IamCredentialProviderSchema.optional(),
  }).optional(),
});

const ManagedVpcResourceSchema = z.object({
  VpcIdentifier: z.string().regex(
    new RegExp("^vpc-(([0-9a-z]{8})|([0-9a-z]{17}))$"),
  ),
  SubnetIds: z.array(
    z.string().regex(new RegExp("^subnet-[0-9a-zA-Z]{8,17}$")),
  ),
  EndpointIpAddressType: z.enum(["IPV4", "IPV6"]),
  SecurityGroupIds: z.array(
    z.string().regex(new RegExp("^sg-(([0-9a-z]{8})|([0-9a-z]{17}))$")),
  ).optional(),
  RoutingDomain: z.string().min(3).max(255).optional(),
  Tags: z.record(
    z.string(),
    z.string().min(0).max(256).regex(new RegExp("^[a-zA-Z0-9\\s._:/=+@-]*$")),
  ).describe(
    "Tags applied to the AWS-managed VPC Lattice resource gateway when it is created on your behalf (tag-on-create). Useful for cost allocation. These tags are forwarded to VPC Lattice and are not stored on the gateway target itself.",
  ).optional(),
});

const S3ConfigurationSchema = z.object({
  Uri: z.string().regex(new RegExp("^s3://.{1,2043}$")).optional(),
  BucketOwnerAccountId: z.string().regex(new RegExp("^[0-9]{12}$")).optional(),
});

const SchemaDefinitionSchema = z.object({
  Type: z.enum(["string", "number", "object", "array", "boolean", "integer"]),
  Properties: z.record(z.string(), z.record(z.string(), z.unknown()))
    .optional(),
  Required: z.array(z.string()).optional(),
  Items: z.record(z.string(), z.unknown()).optional(),
  Description: z.string().optional(),
});

const ToolDefinitionSchema = z.object({
  Name: z.string(),
  Description: z.string(),
  InputSchema: SchemaDefinitionSchema,
  OutputSchema: SchemaDefinitionSchema.optional(),
});

const McpLambdaTargetConfigurationSchema = z.object({
  LambdaArn: z.string().min(1).max(170).regex(
    new RegExp(
      "^arn:(aws[a-zA-Z-]*)?:lambda:([a-z0-9-]+):(\\d{12}):function:([a-zA-Z0-9-_.]+)(:(\\$LATEST|[a-zA-Z0-9-_]+))?$",
    ),
  ),
  ToolSchema: z.object({
    S3: S3ConfigurationSchema.optional(),
    InlinePayload: z.array(ToolDefinitionSchema).optional(),
  }),
});

const McpServerTargetConfigurationSchema = z.object({
  Endpoint: z.string().regex(new RegExp("^https://.*")),
  McpToolSchema: z.object({
    S3: S3ConfigurationSchema.optional(),
    InlinePayload: z.string().optional(),
  }).optional(),
  ListingMode: z.enum(["DEFAULT", "DYNAMIC"]).optional(),
  ResourcePriority: z.number().min(0).max(1000).optional(),
});

const ApiGatewayToolOverrideSchema = z.object({
  Name: z.string(),
  Description: z.string().optional(),
  Path: z.string(),
  Method: z.enum(["GET", "DELETE", "HEAD", "OPTIONS", "PATCH", "PUT", "POST"]),
});

const ApiGatewayToolFilterSchema = z.object({
  FilterPath: z.string(),
  Methods: z.array(
    z.enum(["GET", "DELETE", "HEAD", "OPTIONS", "PATCH", "PUT", "POST"]),
  ),
});

const ApiGatewayToolConfigurationSchema = z.object({
  ToolOverrides: z.array(ApiGatewayToolOverrideSchema).optional(),
  ToolFilters: z.array(ApiGatewayToolFilterSchema),
});

const ApiGatewayTargetConfigurationSchema = z.object({
  RestApiId: z.string(),
  Stage: z.string(),
  ApiGatewayToolConfiguration: ApiGatewayToolConfigurationSchema,
});

const ConnectorSourceSchema = z.object({
  ConnectorId: z.string().min(1).max(256),
});

const ConnectorParameterOverrideSchema = z.object({
  Path: z.string(),
  Description: z.string().optional(),
  Visible: z.boolean().optional(),
});

const ConnectorConfigurationSchema = z.object({
  Name: z.string().max(64).regex(new RegExp("^[a-zA-Z][a-zA-Z0-9_-]*$")),
  Description: z.string().max(2000).optional(),
  ParameterValues: z.unknown().optional(),
  ParameterOverrides: z.array(ConnectorParameterOverrideSchema).optional(),
});

const ConnectorTargetConfigurationSchema = z.object({
  Source: ConnectorSourceSchema,
  Enabled: z.array(z.string()).optional(),
  Configurations: z.array(ConnectorConfigurationSchema).optional(),
});

const HttpApiSchemaConfigurationSchema = z.object({
  Source: z.object({
    S3: S3ConfigurationSchema.optional(),
    InlinePayload: z.string().optional(),
  }),
});

const RuntimeTargetConfigurationSchema = z.object({
  Arn: z.string().regex(
    new RegExp(
      "^arn:aws(-[^:]+)?:bedrock-agentcore:[a-z0-9-]+:[0-9]{12}:runtime/[a-zA-Z][a-zA-Z0-9_]{0,47}-[a-zA-Z0-9]{10}$",
    ),
  ),
  Qualifier: z.string().regex(
    new RegExp("([1-9][0-9]{0,4})|([a-zA-Z][a-zA-Z0-9_]{0,47})"),
  ).optional(),
  Schema: HttpApiSchemaConfigurationSchema.optional(),
});

const StickinessConfigurationSchema = z.object({
  Identifier: z.string().min(1).max(256),
  Timeout: z.number().min(1).max(86400).optional(),
});

const PassthroughTargetConfigurationSchema = z.object({
  Endpoint: z.string().min(1).max(2048).regex(
    new RegExp("^https://[a-zA-Z0-9\\-\\.]+(:[0-9]{1,5})?(/.*)?$"),
  ),
  ProtocolType: z.enum(["MCP", "A2A", "INFERENCE", "CUSTOM"]),
  Schema: HttpApiSchemaConfigurationSchema.optional(),
  StickinessConfiguration: StickinessConfigurationSchema.optional(),
});

const HttpConnectorSourceSchema = z.object({
  ConnectorId: z.string().min(1).max(256),
});

const HttpConnectorTargetConfigurationSchema = z.object({
  Source: HttpConnectorSourceSchema,
  Parameters: z.record(z.string(), z.string().min(1).max(1024)).optional(),
});

const InferenceConnectorSourceSchema = z.object({
  ConnectorId: z.string().min(1).max(256),
});

const InferenceConnectorTargetConfigurationSchema = z.object({
  Source: InferenceConnectorSourceSchema,
});

const ProviderPrefixSchema = z.object({
  Strip: z.boolean().optional(),
  Separator: z.string().min(1).max(1).optional(),
});

const ModelMappingSchema = z.object({
  ProviderPrefix: ProviderPrefixSchema.optional(),
});

const ModelEntrySchema = z.object({
  Model: z.string().min(1).max(256).regex(
    new RegExp("^[a-zA-Z0-9\\-\\._\\*\\?@]+(/[a-zA-Z0-9\\-\\._\\*\\?@]+)*$"),
  ),
});

const InferenceOperationConfigurationSchema = z.object({
  Path: z.string().min(1).max(256).regex(new RegExp("^/[a-zA-Z0-9\\-\\._/]+$")),
  ProviderPath: z.string().min(1).max(256).regex(
    new RegExp("^/[a-zA-Z0-9\\-\\._/]+$"),
  ).optional(),
  Models: z.array(ModelEntrySchema).optional(),
});

const InferenceProviderTargetConfigurationSchema = z.object({
  Endpoint: z.string().min(1).max(2048).regex(
    new RegExp("^https://[a-zA-Z0-9\\-\\.]+(:[0-9]{1,5})?(/.*)?$"),
  ),
  ModelMapping: ModelMappingSchema.optional(),
  Operations: z.array(InferenceOperationConfigurationSchema).optional(),
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
  CertificateConfigurations: z.array(z.object({
    S3: S3CertificateConfigurationSchema.optional(),
    SecretsManager: SecretsManagerCertificateConfigurationSchema.optional(),
  })).optional(),
  CredentialProviderConfigurations: z.array(
    CredentialProviderConfigurationSchema,
  ).optional(),
  Description: z.string().min(1).max(200).optional(),
  GatewayIdentifier: z.string().regex(
    new RegExp("^([0-9a-z][-]?){1,100}-[0-9a-z]{10}$"),
  ).optional(),
  MetadataConfiguration: z.object({
    AllowedRequestHeaders: z.array(z.string().min(1).max(100)).optional(),
    AllowedQueryParameters: z.array(z.string().min(1).max(40)).optional(),
    AllowedResponseHeaders: z.array(z.string().min(1).max(100)).optional(),
  }).optional(),
  Name: z.string().regex(new RegExp("^([0-9a-zA-Z][-]?){1,100}$")).optional(),
  PrivateEndpoint: z.object({
    SelfManagedLatticeResource: z.object({
      ResourceConfigurationIdentifier: z.string().min(20).max(2048).regex(
        new RegExp(
          "^((rcfg-[0-9a-z]{17})|(arn:[a-z0-9\\-]+:vpc-lattice:[a-zA-Z0-9\\-]+:\\d{12}:resourceconfiguration/rcfg-[0-9a-z]{17}))$",
        ),
      ).optional(),
    }).optional(),
    ManagedVpcResource: ManagedVpcResourceSchema.optional(),
  }).optional(),
  TargetConfiguration: z.object({
    Mcp: z.object({
      OpenApiSchema: z.object({
        S3: S3ConfigurationSchema.optional(),
        InlinePayload: z.string().optional(),
      }).optional(),
      SmithyModel: z.object({
        S3: S3ConfigurationSchema.optional(),
        InlinePayload: z.string().optional(),
      }).optional(),
      Lambda: McpLambdaTargetConfigurationSchema.optional(),
      McpServer: McpServerTargetConfigurationSchema.optional(),
      ApiGateway: ApiGatewayTargetConfigurationSchema.optional(),
      Connector: ConnectorTargetConfigurationSchema.optional(),
    }).optional(),
    Http: z.object({
      AgentcoreRuntime: RuntimeTargetConfigurationSchema.optional(),
      Passthrough: PassthroughTargetConfigurationSchema.optional(),
      Connector: HttpConnectorTargetConfigurationSchema.optional(),
    }).optional(),
    Inference: z.object({
      Connector: InferenceConnectorTargetConfigurationSchema.optional(),
      Provider: InferenceProviderTargetConfigurationSchema.optional(),
    }).optional(),
  }),
});

const StateSchema = z.object({
  AuthorizationData: z.object({
    Oauth2: z.object({
      AuthorizationUrl: z.string(),
      UserId: z.string(),
    }),
  }).optional(),
  CertificateConfigurations: z.array(z.object({
    S3: S3CertificateConfigurationSchema,
    SecretsManager: SecretsManagerCertificateConfigurationSchema,
  })).optional(),
  CreatedAt: z.string().optional(),
  CredentialProviderConfigurations: z.array(
    CredentialProviderConfigurationSchema,
  ).optional(),
  Description: z.string().optional(),
  GatewayArn: z.string().optional(),
  GatewayIdentifier: z.string(),
  LastSynchronizedAt: z.string().optional(),
  MetadataConfiguration: z.object({
    AllowedRequestHeaders: z.array(z.string()),
    AllowedQueryParameters: z.array(z.string()),
    AllowedResponseHeaders: z.array(z.string()),
  }).optional(),
  Name: z.string().optional(),
  PrivateEndpoint: z.object({
    SelfManagedLatticeResource: z.object({
      ResourceConfigurationIdentifier: z.string(),
    }),
    ManagedVpcResource: ManagedVpcResourceSchema,
  }).optional(),
  PrivateEndpointManagedResources: z.array(z.object({
    Domain: z.string(),
    ResourceGatewayArn: z.string(),
    ResourceAssociationArn: z.string(),
  })).optional(),
  ProtocolType: z.string().optional(),
  Status: z.string().optional(),
  StatusReasons: z.array(z.string()).optional(),
  TargetConfiguration: z.object({
    Mcp: z.object({
      OpenApiSchema: z.object({
        S3: S3ConfigurationSchema,
        InlinePayload: z.string(),
      }),
      SmithyModel: z.object({
        S3: S3ConfigurationSchema,
        InlinePayload: z.string(),
      }),
      Lambda: McpLambdaTargetConfigurationSchema,
      McpServer: McpServerTargetConfigurationSchema,
      ApiGateway: ApiGatewayTargetConfigurationSchema,
      Connector: ConnectorTargetConfigurationSchema,
    }),
    Http: z.object({
      AgentcoreRuntime: RuntimeTargetConfigurationSchema,
      Passthrough: PassthroughTargetConfigurationSchema,
      Connector: HttpConnectorTargetConfigurationSchema,
    }),
    Inference: z.object({
      Connector: InferenceConnectorTargetConfigurationSchema,
      Provider: InferenceProviderTargetConfigurationSchema,
    }),
  }).optional(),
  TargetId: z.string(),
  UpdatedAt: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  CertificateConfigurations: z.array(z.object({
    S3: S3CertificateConfigurationSchema.optional(),
    SecretsManager: SecretsManagerCertificateConfigurationSchema.optional(),
  })).optional(),
  CredentialProviderConfigurations: z.array(
    CredentialProviderConfigurationSchema,
  ).optional(),
  Description: z.string().min(1).max(200).optional(),
  GatewayIdentifier: z.string().regex(
    new RegExp("^([0-9a-z][-]?){1,100}-[0-9a-z]{10}$"),
  ).optional(),
  MetadataConfiguration: z.object({
    AllowedRequestHeaders: z.array(z.string().min(1).max(100)).optional(),
    AllowedQueryParameters: z.array(z.string().min(1).max(40)).optional(),
    AllowedResponseHeaders: z.array(z.string().min(1).max(100)).optional(),
  }).optional(),
  Name: z.string().regex(new RegExp("^([0-9a-zA-Z][-]?){1,100}$")).optional(),
  PrivateEndpoint: z.object({
    SelfManagedLatticeResource: z.object({
      ResourceConfigurationIdentifier: z.string().min(20).max(2048).regex(
        new RegExp(
          "^((rcfg-[0-9a-z]{17})|(arn:[a-z0-9\\-]+:vpc-lattice:[a-zA-Z0-9\\-]+:\\d{12}:resourceconfiguration/rcfg-[0-9a-z]{17}))$",
        ),
      ).optional(),
    }).optional(),
    ManagedVpcResource: ManagedVpcResourceSchema.optional(),
  }).optional(),
  TargetConfiguration: z.object({
    Mcp: z.object({
      OpenApiSchema: z.object({
        S3: S3ConfigurationSchema.optional(),
        InlinePayload: z.string().optional(),
      }).optional(),
      SmithyModel: z.object({
        S3: S3ConfigurationSchema.optional(),
        InlinePayload: z.string().optional(),
      }).optional(),
      Lambda: McpLambdaTargetConfigurationSchema.optional(),
      McpServer: McpServerTargetConfigurationSchema.optional(),
      ApiGateway: ApiGatewayTargetConfigurationSchema.optional(),
      Connector: ConnectorTargetConfigurationSchema.optional(),
    }).optional(),
    Http: z.object({
      AgentcoreRuntime: RuntimeTargetConfigurationSchema.optional(),
      Passthrough: PassthroughTargetConfigurationSchema.optional(),
      Connector: HttpConnectorTargetConfigurationSchema.optional(),
    }).optional(),
    Inference: z.object({
      Connector: InferenceConnectorTargetConfigurationSchema.optional(),
      Provider: InferenceProviderTargetConfigurationSchema.optional(),
    }).optional(),
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

/** Swamp extension model for BedrockAgentCore GatewayTarget. Registered at `@swamp/aws/bedrockagentcore/gateway-target`. */
export const model = {
  type: "@swamp/aws/bedrockagentcore/gateway-target",
  version: "2026.10.29.1",
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
      toVersion: "2026.04.11.1",
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
      toVersion: "2026.06.03.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.04.1",
      description: "Added: PrivateEndpoint",
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
    {
      toVersion: "2026.06.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.07.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.17.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.17.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.25.1",
      description: "Added: TargetConfiguration",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.29.1",
      description: "Added: CertificateConfigurations",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "BedrockAgentCore GatewayTarget resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a BedrockAgentCore GatewayTarget",
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
          "AWS::BedrockAgentCore::GatewayTarget",
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
      description: "Get a BedrockAgentCore GatewayTarget",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the BedrockAgentCore GatewayTarget",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::BedrockAgentCore::GatewayTarget",
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
      description: "Update a BedrockAgentCore GatewayTarget",
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
          existing.GatewayIdentifier?.toString(),
          existing.TargetId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::BedrockAgentCore::GatewayTarget",
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
          "AWS::BedrockAgentCore::GatewayTarget",
          identifier,
          currentState,
          desiredState,
          ["GatewayIdentifier"],
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
      description: "Delete a BedrockAgentCore GatewayTarget",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the BedrockAgentCore GatewayTarget",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::BedrockAgentCore::GatewayTarget",
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
      description: "Sync BedrockAgentCore GatewayTarget state from AWS",
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
          existing.GatewayIdentifier?.toString(),
          existing.TargetId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::BedrockAgentCore::GatewayTarget",
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
      description: "List BedrockAgentCore GatewayTarget resources",
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
          "AWS::BedrockAgentCore::GatewayTarget",
          {
            resourceModel: args.resourceModel,
            maxPages: args.maxPages,
            credentials,
          },
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const instanceName = item.identifier.replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, "");
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
