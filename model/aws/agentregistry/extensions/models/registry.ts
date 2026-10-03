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

// Auto-generated extension model for @swamp/aws/agentregistry/registry
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for AgentRegistry Registry (AWS::AgentRegistry::Registry).
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

const ClaimMatchValueTypeSchema = z.object({
  MatchValueString: z.string().min(1).max(255).regex(
    new RegExp("^[A-Za-z0-9_.:/-]+$"),
  ).optional(),
  MatchValueStringList: z.array(
    z.string().min(1).max(255).regex(new RegExp("^[A-Za-z0-9_.:/-]+$")),
  ).optional(),
});

const AuthorizingClaimMatchValueTypeSchema = z.object({
  ClaimMatchValue: ClaimMatchValueTypeSchema.describe(
    "The expected value used to match a claim. Exactly one member is set.",
  ),
  ClaimMatchOperator: z.enum(["EQUALS", "CONTAINS", "CONTAINS_ANY"]),
});

const CustomClaimValidationTypeSchema = z.object({
  AuthorizingClaimMatchValue: AuthorizingClaimMatchValueTypeSchema.describe(
    "The value and match operator used to authorize a claim during JWT validation.",
  ),
  InboundTokenClaimName: z.string().min(1).max(255).regex(
    new RegExp("^[A-Za-z0-9_.-:]+$"),
  ),
  InboundTokenClaimValueType: z.enum(["STRING", "STRING_ARRAY"]),
});

const CustomJWTAuthorizerConfigurationSchema = z.object({
  DiscoveryUrl: z.string().min(1).max(2048).regex(
    new RegExp("^.+/\\.well-known/openid-configuration$"),
  ).describe(
    "The OpenID Connect discovery URL used to retrieve the identity provider's metadata and signing keys.",
  ),
  AllowedAudience: z.array(z.string().min(1).max(255)).describe(
    "The audience values accepted during JWT validation.",
  ).optional(),
  CustomClaims: z.array(CustomClaimValidationTypeSchema).describe(
    "Additional custom claim validations applied to the inbound JWT.",
  ).optional(),
  AllowedClients: z.array(z.string().min(1).max(255)).describe(
    "The client identifiers accepted during JWT validation.",
  ).optional(),
  AllowedScopes: z.array(
    z.string().min(1).max(255).regex(
      new RegExp("^[\\x21\\x23-\\x5B\\x5D-\\x7E]+$"),
    ),
  ).describe("The scopes accepted during JWT validation.").optional(),
});

const AuthorizerConfigurationSchema = z.object({
  CustomJWTAuthorizer: CustomJWTAuthorizerConfigurationSchema.describe(
    "Configuration for a custom JWT authorizer that validates inbound bearer tokens against an OpenID Connect identity provider.",
  ),
});

const TagSchema = z.object({
  Value: z.string().min(0).max(256).regex(
    new RegExp("^[a-zA-Z0-9\\s._:/=+@-]*$"),
  ).describe("The value of the tag."),
  Key: z.string().min(1).max(128).regex(new RegExp("^[a-zA-Z0-9\\s._:/=+@-]*$"))
    .describe("The key of the tag."),
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
  Description: z.string().min(1).max(4096).describe(
    "The description of the registry.",
  ).optional(),
  ApprovalConfiguration: z.object({
    AutoApprovalRules: z.array(z.enum(["APPROVE_ALL"])).describe(
      "The rules that determine which registry records are automatically approved on submission. When omitted or empty, submitted records require manual review.",
    ).optional(),
  }).describe("Configuration for the registry's record approval workflow.")
    .optional(),
  AuthorizerType: z.enum(["CUSTOM_JWT", "AWS_IAM"]).describe(
    "The type of authorizer that controls how consumers access the registry's search and MCP invoke operations.",
  ).optional(),
  EncryptionConfiguration: z.object({
    KmsKeyArn: z.string().min(1).max(2048).regex(
      new RegExp(
        "^arn:aws(-[^:]+)?:kms:[a-zA-Z0-9-]*:[0-9]{12}:key/[a-zA-Z0-9-]{36}$",
      ),
    ).describe(
      "The Amazon Resource Name (ARN) of the customer-managed AWS KMS key used to encrypt the registry's content. The key must be a symmetric encryption key in the same AWS account and Region as the registry. Multi-Region keys are not supported.",
    ),
  }).describe(
    "The server-side encryption configuration for a registry. Specifies a customer managed key used to encrypt the registry's content. When omitted, the registry's content is encrypted with an AWS owned key. You cannot change the encryption configuration after registry creation. Specifying a different KMS key, adding this property to an existing registry, or removing it replaces the registry: CloudFormation creates a new registry with a new Amazon Resource Name (ARN) and then deletes the original, including all registry records it contains. Registry records that are not managed by the stack are not re-created in the new registry, and if any remain in the original registry its deletion fails and it is left behind.",
  ).optional(),
  DiscoveryConfiguration: z.object({
    AuthorizerConfiguration: AuthorizerConfigurationSchema.describe(
      "The authorizer configuration for the registry. This is a union - specify exactly one member.",
    ).optional(),
  }).describe(
    "Discovery configuration for the registry. Controls how consumers are authorized to search the registry and invoke its MCP endpoint.",
  ).optional(),
  AutoDetectionEnabled: z.boolean().describe(
    "Specifies whether auto-detection is requested for the registry. Must be specified together with AutoDetectionScope. Setting this to true is necessary but not sufficient for auto-detection to become active; the preconditions of the configured scope must also be met. To turn auto-detection off, explicitly set this to false - removing AutoDetectionEnabled and AutoDetectionScope from the template is a no-op and leaves the existing auto-detection settings unchanged. A registry cannot be deleted while auto-detection is enabled: set this to false and update the stack before deleting the registry.",
  ).optional(),
  Name: z.string().min(1).max(64).regex(
    new RegExp("^[a-zA-Z0-9][a-zA-Z0-9_\\-\\.\\/]*$"),
  ).describe("The name of the registry."),
  AutoDetectionScope: z.enum(["ORGANIZATION"]).describe(
    "The source from which resources are detected. ORGANIZATION sources resources from all member accounts of an AWS Organization.",
  ).optional(),
  Tags: z.array(TagSchema).describe("Tags to assign to the registry.")
    .optional(),
});

const StateSchema = z.object({
  Status: z.string().optional(),
  Description: z.string().optional(),
  ApprovalConfiguration: z.object({
    AutoApprovalRules: z.array(z.string()),
  }).optional(),
  AuthorizerType: z.string().optional(),
  EncryptionConfiguration: z.object({
    KmsKeyArn: z.string(),
  }).optional(),
  CreatedAt: z.string().optional(),
  DiscoveryConfiguration: z.object({
    AuthorizerConfiguration: AuthorizerConfigurationSchema,
  }).optional(),
  AutoDetectionEnabled: z.boolean().optional(),
  UpdatedAt: z.string().optional(),
  Name: z.string().optional(),
  AutoDetectionScope: z.string().optional(),
  AutoDetectionStatus: z.string().optional(),
  RegistryId: z.string().optional(),
  RegistryArn: z.string(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Description: z.string().min(1).max(4096).describe(
    "The description of the registry.",
  ).optional(),
  ApprovalConfiguration: z.object({
    AutoApprovalRules: z.array(z.enum(["APPROVE_ALL"])).describe(
      "The rules that determine which registry records are automatically approved on submission. When omitted or empty, submitted records require manual review.",
    ).optional(),
  }).describe("Configuration for the registry's record approval workflow.")
    .optional(),
  AuthorizerType: z.enum(["CUSTOM_JWT", "AWS_IAM"]).describe(
    "The type of authorizer that controls how consumers access the registry's search and MCP invoke operations.",
  ).optional(),
  EncryptionConfiguration: z.object({
    KmsKeyArn: z.string().min(1).max(2048).regex(
      new RegExp(
        "^arn:aws(-[^:]+)?:kms:[a-zA-Z0-9-]*:[0-9]{12}:key/[a-zA-Z0-9-]{36}$",
      ),
    ).describe(
      "The Amazon Resource Name (ARN) of the customer-managed AWS KMS key used to encrypt the registry's content. The key must be a symmetric encryption key in the same AWS account and Region as the registry. Multi-Region keys are not supported.",
    ).optional(),
  }).describe(
    "The server-side encryption configuration for a registry. Specifies a customer managed key used to encrypt the registry's content. When omitted, the registry's content is encrypted with an AWS owned key. You cannot change the encryption configuration after registry creation. Specifying a different KMS key, adding this property to an existing registry, or removing it replaces the registry: CloudFormation creates a new registry with a new Amazon Resource Name (ARN) and then deletes the original, including all registry records it contains. Registry records that are not managed by the stack are not re-created in the new registry, and if any remain in the original registry its deletion fails and it is left behind.",
  ).optional(),
  DiscoveryConfiguration: z.object({
    AuthorizerConfiguration: AuthorizerConfigurationSchema.describe(
      "The authorizer configuration for the registry. This is a union - specify exactly one member.",
    ).optional(),
  }).describe(
    "Discovery configuration for the registry. Controls how consumers are authorized to search the registry and invoke its MCP endpoint.",
  ).optional(),
  AutoDetectionEnabled: z.boolean().describe(
    "Specifies whether auto-detection is requested for the registry. Must be specified together with AutoDetectionScope. Setting this to true is necessary but not sufficient for auto-detection to become active; the preconditions of the configured scope must also be met. To turn auto-detection off, explicitly set this to false - removing AutoDetectionEnabled and AutoDetectionScope from the template is a no-op and leaves the existing auto-detection settings unchanged. A registry cannot be deleted while auto-detection is enabled: set this to false and update the stack before deleting the registry.",
  ).optional(),
  Name: z.string().min(1).max(64).regex(
    new RegExp("^[a-zA-Z0-9][a-zA-Z0-9_\\-\\.\\/]*$"),
  ).describe("The name of the registry.").optional(),
  AutoDetectionScope: z.enum(["ORGANIZATION"]).describe(
    "The source from which resources are detected. ORGANIZATION sources resources from all member accounts of an AWS Organization.",
  ).optional(),
  Tags: z.array(TagSchema).describe("Tags to assign to the registry.")
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

/** Swamp extension model for AgentRegistry Registry. Registered at `@swamp/aws/agentregistry/registry`. */
export const model = {
  type: "@swamp/aws/agentregistry/registry",
  version: "2026.10.03.1",
  upgrades: [
    {
      toVersion: "2026.10.03.1",
      description:
        "Added: EncryptionConfiguration, AutoDetectionEnabled, AutoDetectionScope",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "AgentRegistry Registry resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a AgentRegistry Registry",
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
          "AWS::AgentRegistry::Registry",
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
      description: "Get a AgentRegistry Registry",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AgentRegistry Registry",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::AgentRegistry::Registry",
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
      description: "Update a AgentRegistry Registry",
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
        const identifier = existing.RegistryArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::AgentRegistry::Registry",
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
          "AWS::AgentRegistry::Registry",
          identifier,
          currentState,
          desiredState,
          ["AuthorizerType", "EncryptionConfiguration"],
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
      description: "Delete a AgentRegistry Registry",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AgentRegistry Registry",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::AgentRegistry::Registry",
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
      description: "Sync AgentRegistry Registry state from AWS",
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
        const identifier = existing.RegistryArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::AgentRegistry::Registry",
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
      description: "List AgentRegistry Registry resources",
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
          "AWS::AgentRegistry::Registry",
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
            (item.properties?.RegistryArn?.toString() ?? item.identifier)
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
