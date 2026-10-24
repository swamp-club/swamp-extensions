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

// Auto-generated extension model for @swamp/aws/sagemaker/workforce
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SageMaker Workforce (AWS::SageMaker::Workforce).
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

const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^([\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]*)$", "u"),
  ).describe("The tag key."),
  Value: z.string().min(0).max(256).regex(
    new RegExp("^([\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]*)$", "u"),
  ).describe("The tag value."),
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
  WorkforceName: z.string().min(1).max(63).regex(
    new RegExp("^[a-zA-Z0-9]([a-zA-Z0-9\\-]){0,62}$"),
  ).describe("The name of the private workforce."),
  CognitoConfig: z.object({
    ClientId: z.string().describe(
      "The client ID for your Amazon Cognito user pool.",
    ),
    UserPool: z.string().describe("The ID for your Amazon Cognito user pool."),
  }).describe(
    "The configuration of an Amazon Cognito workforce. A single Cognito workforce is created using and corresponds to a single Amazon Cognito user pool.",
  ).optional(),
  OidcConfig: z.object({
    AuthenticationRequestExtraParams: z.record(
      z.string(),
      z.string().max(512).regex(
        new RegExp("^[\\p{L}\\p{M}\\p{S}\\p{N}\\p{P}]+$", "u"),
      ),
    ).describe(
      "A string to string map of identifiers specific to the custom identity provider (IdP) being used.",
    ).optional(),
    AuthorizationEndpoint: z.string().max(500).regex(new RegExp("^https://.*$"))
      .describe(
        "The OIDC IdP authorization endpoint used to configure your private workforce.",
      ),
    ClientId: z.string().max(1024).regex(new RegExp("^[\\w+]+$")).describe(
      "The OIDC IdP client ID used to configure your private workforce.",
    ),
    ClientSecret: z.string().max(1024).regex(new RegExp("^[\\w+]+$")).describe(
      "The OIDC IdP client secret used to configure your private workforce.",
    ).optional(),
    Issuer: z.string().max(500).regex(new RegExp("^https://.*$")).describe(
      "The OIDC IdP issuer used to configure your private workforce.",
    ),
    JwksUri: z.string().max(500).regex(new RegExp("^https://.*$")).describe(
      "The OIDC IdP JSON Web Key Set (Jwks) URI used to configure your private workforce.",
    ),
    LogoutEndpoint: z.string().max(500).regex(new RegExp("^https://.*$"))
      .describe(
        "The OIDC IdP logout endpoint used to configure your private workforce.",
      ),
    Scope: z.string().max(500).regex(
      new RegExp("^[\\p{L}\\p{M}\\p{S}\\p{N}\\p{P}\\s]+$", "u"),
    ).describe(
      "An array of string identifiers used to refer to the specific pieces of user data or claims that the client application wants to access.",
    ).optional(),
    TokenEndpoint: z.string().max(500).regex(new RegExp("^https://.*$"))
      .describe(
        "The OIDC IdP token endpoint used to configure your private workforce.",
      ),
    UserInfoEndpoint: z.string().max(500).regex(new RegExp("^https://.*$"))
      .describe(
        "The OIDC IdP user info endpoint used to configure your private workforce.",
      ),
  }).describe(
    "The configuration of an OIDC Identity Provider (IdP) private workforce.",
  ).optional(),
  SourceIpConfig: z.object({
    Cidrs: z.array(z.string()).describe(
      "A list of one to ten Classless Inter-Domain Routing (CIDR) values.",
    ),
  }).describe("A list of IP address ranges used to access your training data.")
    .optional(),
  WorkforceVpcConfig: z.object({
    SecurityGroupIds: z.array(z.string()).describe(
      "The VPC security group IDs.",
    ).optional(),
    Subnets: z.array(z.string()).describe("The VPC subnets.").optional(),
    VpcId: z.string().describe("The ID of the VPC.").optional(),
  }).describe("The VPC configuration for the workforce.").optional(),
  IpAddressType: z.enum(["ipv4", "dualstack"]).describe(
    "The IP address type for the workforce. IPv4 only or dualstack (IPv4 and IPv6).",
  ).optional(),
  Tags: z.array(TagSchema).describe("An array of key-value pairs.").optional(),
});

const StateSchema = z.object({
  WorkforceName: z.string().optional(),
  WorkforceArn: z.string(),
  CognitoConfig: z.object({
    ClientId: z.string(),
    UserPool: z.string(),
  }).optional(),
  OidcConfig: z.object({
    AuthenticationRequestExtraParams: z.record(z.string(), z.unknown()),
    AuthorizationEndpoint: z.string(),
    ClientId: z.string(),
    ClientSecret: z.string(),
    Issuer: z.string(),
    JwksUri: z.string(),
    LogoutEndpoint: z.string(),
    Scope: z.string(),
    TokenEndpoint: z.string(),
    UserInfoEndpoint: z.string(),
  }).optional(),
  SourceIpConfig: z.object({
    Cidrs: z.array(z.string()),
  }).optional(),
  WorkforceVpcConfig: z.object({
    SecurityGroupIds: z.array(z.string()),
    Subnets: z.array(z.string()),
    VpcId: z.string(),
  }).optional(),
  IpAddressType: z.string().optional(),
  SubDomain: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  WorkforceName: z.string().min(1).max(63).regex(
    new RegExp("^[a-zA-Z0-9]([a-zA-Z0-9\\-]){0,62}$"),
  ).describe("The name of the private workforce.").optional(),
  CognitoConfig: z.object({
    ClientId: z.string().describe(
      "The client ID for your Amazon Cognito user pool.",
    ).optional(),
    UserPool: z.string().describe("The ID for your Amazon Cognito user pool.")
      .optional(),
  }).describe(
    "The configuration of an Amazon Cognito workforce. A single Cognito workforce is created using and corresponds to a single Amazon Cognito user pool.",
  ).optional(),
  OidcConfig: z.object({
    AuthenticationRequestExtraParams: z.record(
      z.string(),
      z.string().max(512).regex(
        new RegExp("^[\\p{L}\\p{M}\\p{S}\\p{N}\\p{P}]+$", "u"),
      ),
    ).describe(
      "A string to string map of identifiers specific to the custom identity provider (IdP) being used.",
    ).optional(),
    AuthorizationEndpoint: z.string().max(500).regex(new RegExp("^https://.*$"))
      .describe(
        "The OIDC IdP authorization endpoint used to configure your private workforce.",
      ).optional(),
    ClientId: z.string().max(1024).regex(new RegExp("^[\\w+]+$")).describe(
      "The OIDC IdP client ID used to configure your private workforce.",
    ).optional(),
    ClientSecret: z.string().max(1024).regex(new RegExp("^[\\w+]+$")).describe(
      "The OIDC IdP client secret used to configure your private workforce.",
    ).optional(),
    Issuer: z.string().max(500).regex(new RegExp("^https://.*$")).describe(
      "The OIDC IdP issuer used to configure your private workforce.",
    ).optional(),
    JwksUri: z.string().max(500).regex(new RegExp("^https://.*$")).describe(
      "The OIDC IdP JSON Web Key Set (Jwks) URI used to configure your private workforce.",
    ).optional(),
    LogoutEndpoint: z.string().max(500).regex(new RegExp("^https://.*$"))
      .describe(
        "The OIDC IdP logout endpoint used to configure your private workforce.",
      ).optional(),
    Scope: z.string().max(500).regex(
      new RegExp("^[\\p{L}\\p{M}\\p{S}\\p{N}\\p{P}\\s]+$", "u"),
    ).describe(
      "An array of string identifiers used to refer to the specific pieces of user data or claims that the client application wants to access.",
    ).optional(),
    TokenEndpoint: z.string().max(500).regex(new RegExp("^https://.*$"))
      .describe(
        "The OIDC IdP token endpoint used to configure your private workforce.",
      ).optional(),
    UserInfoEndpoint: z.string().max(500).regex(new RegExp("^https://.*$"))
      .describe(
        "The OIDC IdP user info endpoint used to configure your private workforce.",
      ).optional(),
  }).describe(
    "The configuration of an OIDC Identity Provider (IdP) private workforce.",
  ).optional(),
  SourceIpConfig: z.object({
    Cidrs: z.array(z.string()).describe(
      "A list of one to ten Classless Inter-Domain Routing (CIDR) values.",
    ).optional(),
  }).describe("A list of IP address ranges used to access your training data.")
    .optional(),
  WorkforceVpcConfig: z.object({
    SecurityGroupIds: z.array(z.string()).describe(
      "The VPC security group IDs.",
    ).optional(),
    Subnets: z.array(z.string()).describe("The VPC subnets.").optional(),
    VpcId: z.string().describe("The ID of the VPC.").optional(),
  }).describe("The VPC configuration for the workforce.").optional(),
  IpAddressType: z.enum(["ipv4", "dualstack"]).describe(
    "The IP address type for the workforce. IPv4 only or dualstack (IPv4 and IPv6).",
  ).optional(),
  Tags: z.array(TagSchema).describe("An array of key-value pairs.").optional(),
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

/** Swamp extension model for SageMaker Workforce. Registered at `@swamp/aws/sagemaker/workforce`. */
export const model = {
  type: "@swamp/aws/sagemaker/workforce",
  version: "2026.10.23.1",
  upgrades: [
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "SageMaker Workforce resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SageMaker Workforce",
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
          "AWS::SageMaker::Workforce",
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
      description: "Get a SageMaker Workforce",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SageMaker Workforce",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::SageMaker::Workforce",
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
      description: "Update a SageMaker Workforce",
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
        const identifier = existing.WorkforceArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::SageMaker::Workforce",
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
          "AWS::SageMaker::Workforce",
          identifier,
          currentState,
          desiredState,
          ["WorkforceName", "CognitoConfig"],
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
      description: "Delete a SageMaker Workforce",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SageMaker Workforce",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::SageMaker::Workforce",
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
      description: "Sync SageMaker Workforce state from AWS",
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
        const identifier = existing.WorkforceArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SageMaker::Workforce",
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
      description: "List SageMaker Workforce resources",
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
          "AWS::SageMaker::Workforce",
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
            (item.properties?.WorkforceArn?.toString() ?? item.identifier)
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
