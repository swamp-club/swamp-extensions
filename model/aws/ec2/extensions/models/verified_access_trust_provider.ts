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

// Auto-generated extension model for @swamp/aws/ec2/verified-access-trust-provider
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for EC2 VerifiedAccessTrustProvider (AWS::EC2::VerifiedAccessTrustProvider).
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
  TrustProviderType: z.string().describe(
    "Type of trust provider. Possible values: user|device",
  ),
  DeviceTrustProviderType: z.string().describe(
    "The type of device-based trust provider. Possible values: jamf|crowdstrike",
  ).optional(),
  UserTrustProviderType: z.string().describe(
    "The type of device-based trust provider. Possible values: oidc|iam-identity-center",
  ).optional(),
  OidcOptions: z.object({
    Issuer: z.string().describe("The OIDC issuer.").optional(),
    AuthorizationEndpoint: z.string().describe(
      "The OIDC authorization endpoint.",
    ).optional(),
    TokenEndpoint: z.string().describe("The OIDC token endpoint.").optional(),
    UserInfoEndpoint: z.string().describe("The OIDC user info endpoint.")
      .optional(),
    ClientId: z.string().describe("The client identifier.").optional(),
    ClientSecret: z.string().describe("The client secret.").optional(),
    Scope: z.string().describe(
      "OpenID Connect (OIDC) scopes are used by an application during authentication to authorize access to details of a user. Each scope returns a specific set of user attributes.",
    ).optional(),
  }).describe(
    "The OpenID Connect details for an oidc -type, user-identity based trust provider.",
  ).optional(),
  DeviceOptions: z.object({
    TenantId: z.string().describe(
      "The ID of the tenant application with the device-identity provider.",
    ).optional(),
    PublicSigningKeyUrl: z.string().describe(
      "URL Verified Access will use to verify authenticity of the device tokens.",
    ).optional(),
  }).describe("The options for device identity based trust providers.")
    .optional(),
  PolicyReferenceName: z.string().describe(
    "The identifier to be used when working with policy rules.",
  ),
  Description: z.string().describe(
    "A description for the Amazon Web Services Verified Access trust provider.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
  SseSpecification: z.object({
    KmsKeyArn: z.string().describe(
      "KMS Key Arn used to encrypt the group policy",
    ).optional(),
    CustomerManagedKeyEnabled: z.boolean().describe(
      "Whether to encrypt the policy with the provided key or disable encryption",
    ).optional(),
  }).describe("The configuration options for customer provided KMS encryption.")
    .optional(),
  NativeApplicationOidcOptions: z.object({
    Issuer: z.string().describe("The OIDC issuer.").optional(),
    AuthorizationEndpoint: z.string().describe(
      "The OIDC authorization endpoint.",
    ).optional(),
    TokenEndpoint: z.string().describe("The OIDC token endpoint.").optional(),
    UserInfoEndpoint: z.string().describe("The OIDC user info endpoint.")
      .optional(),
    ClientId: z.string().describe("The client identifier.").optional(),
    ClientSecret: z.string().describe("The client secret.").optional(),
    Scope: z.string().describe(
      "OpenID Connect (OIDC) scopes are used by an application during authentication to authorize access to details of a user. Each scope returns a specific set of user attributes.",
    ).optional(),
    PublicSigningKeyEndpoint: z.string().describe(
      "The public signing key for endpoint",
    ).optional(),
  }).describe(
    "The OpenID Connect details for an oidc -type, user-identity based trust provider for L4.",
  ).optional(),
});

const StateSchema = z.object({
  TrustProviderType: z.string().optional(),
  DeviceTrustProviderType: z.string().optional(),
  UserTrustProviderType: z.string().optional(),
  OidcOptions: z.object({
    Issuer: z.string(),
    AuthorizationEndpoint: z.string(),
    TokenEndpoint: z.string(),
    UserInfoEndpoint: z.string(),
    ClientId: z.string(),
    ClientSecret: z.string(),
    Scope: z.string(),
  }).optional(),
  DeviceOptions: z.object({
    TenantId: z.string(),
    PublicSigningKeyUrl: z.string(),
  }).optional(),
  PolicyReferenceName: z.string().optional(),
  CreationTime: z.string().optional(),
  LastUpdatedTime: z.string().optional(),
  VerifiedAccessTrustProviderId: z.string(),
  Description: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  SseSpecification: z.object({
    KmsKeyArn: z.string(),
    CustomerManagedKeyEnabled: z.boolean(),
  }).optional(),
  NativeApplicationOidcOptions: z.object({
    Issuer: z.string(),
    AuthorizationEndpoint: z.string(),
    TokenEndpoint: z.string(),
    UserInfoEndpoint: z.string(),
    ClientId: z.string(),
    ClientSecret: z.string(),
    Scope: z.string(),
    PublicSigningKeyEndpoint: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  TrustProviderType: z.string().describe(
    "Type of trust provider. Possible values: user|device",
  ).optional(),
  DeviceTrustProviderType: z.string().describe(
    "The type of device-based trust provider. Possible values: jamf|crowdstrike",
  ).optional(),
  UserTrustProviderType: z.string().describe(
    "The type of device-based trust provider. Possible values: oidc|iam-identity-center",
  ).optional(),
  OidcOptions: z.object({
    Issuer: z.string().describe("The OIDC issuer.").optional(),
    AuthorizationEndpoint: z.string().describe(
      "The OIDC authorization endpoint.",
    ).optional(),
    TokenEndpoint: z.string().describe("The OIDC token endpoint.").optional(),
    UserInfoEndpoint: z.string().describe("The OIDC user info endpoint.")
      .optional(),
    ClientId: z.string().describe("The client identifier.").optional(),
    ClientSecret: z.string().describe("The client secret.").optional(),
    Scope: z.string().describe(
      "OpenID Connect (OIDC) scopes are used by an application during authentication to authorize access to details of a user. Each scope returns a specific set of user attributes.",
    ).optional(),
  }).describe(
    "The OpenID Connect details for an oidc -type, user-identity based trust provider.",
  ).optional(),
  DeviceOptions: z.object({
    TenantId: z.string().describe(
      "The ID of the tenant application with the device-identity provider.",
    ).optional(),
    PublicSigningKeyUrl: z.string().describe(
      "URL Verified Access will use to verify authenticity of the device tokens.",
    ).optional(),
  }).describe("The options for device identity based trust providers.")
    .optional(),
  PolicyReferenceName: z.string().describe(
    "The identifier to be used when working with policy rules.",
  ).optional(),
  Description: z.string().describe(
    "A description for the Amazon Web Services Verified Access trust provider.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
  SseSpecification: z.object({
    KmsKeyArn: z.string().describe(
      "KMS Key Arn used to encrypt the group policy",
    ).optional(),
    CustomerManagedKeyEnabled: z.boolean().describe(
      "Whether to encrypt the policy with the provided key or disable encryption",
    ).optional(),
  }).describe("The configuration options for customer provided KMS encryption.")
    .optional(),
  NativeApplicationOidcOptions: z.object({
    Issuer: z.string().describe("The OIDC issuer.").optional(),
    AuthorizationEndpoint: z.string().describe(
      "The OIDC authorization endpoint.",
    ).optional(),
    TokenEndpoint: z.string().describe("The OIDC token endpoint.").optional(),
    UserInfoEndpoint: z.string().describe("The OIDC user info endpoint.")
      .optional(),
    ClientId: z.string().describe("The client identifier.").optional(),
    ClientSecret: z.string().describe("The client secret.").optional(),
    Scope: z.string().describe(
      "OpenID Connect (OIDC) scopes are used by an application during authentication to authorize access to details of a user. Each scope returns a specific set of user attributes.",
    ).optional(),
    PublicSigningKeyEndpoint: z.string().describe(
      "The public signing key for endpoint",
    ).optional(),
  }).describe(
    "The OpenID Connect details for an oidc -type, user-identity based trust provider for L4.",
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

/** Swamp extension model for EC2 VerifiedAccessTrustProvider. Registered at `@swamp/aws/ec2/verified-access-trust-provider`. */
export const model = {
  type: "@swamp/aws/ec2/verified-access-trust-provider",
  version: "2026.06.08.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "EC2 VerifiedAccessTrustProvider resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EC2 VerifiedAccessTrustProvider",
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
          "AWS::EC2::VerifiedAccessTrustProvider",
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
      description: "Get a EC2 VerifiedAccessTrustProvider",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 VerifiedAccessTrustProvider",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::EC2::VerifiedAccessTrustProvider",
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
      description: "Update a EC2 VerifiedAccessTrustProvider",
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
        const identifier = existing.VerifiedAccessTrustProviderId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::EC2::VerifiedAccessTrustProvider",
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
          "AWS::EC2::VerifiedAccessTrustProvider",
          identifier,
          currentState,
          desiredState,
          [
            "PolicyReferenceName",
            "DeviceOptions",
            "DeviceTrustProviderType",
            "TrustProviderType",
            "UserTrustProviderType",
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
      description: "Delete a EC2 VerifiedAccessTrustProvider",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 VerifiedAccessTrustProvider",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::EC2::VerifiedAccessTrustProvider",
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
      description: "Sync EC2 VerifiedAccessTrustProvider state from AWS",
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
        const identifier = existing.VerifiedAccessTrustProviderId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::EC2::VerifiedAccessTrustProvider",
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
