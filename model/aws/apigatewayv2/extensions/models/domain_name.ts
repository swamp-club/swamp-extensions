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

// Auto-generated extension model for @swamp/aws/apigatewayv2/domain-name
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ApiGatewayV2 DomainName (AWS::ApiGatewayV2::DomainName).
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

const DomainNameConfigurationSchema = z.object({
  OwnershipVerificationCertificateArn: z.string().describe(
    "The Amazon resource name (ARN) for the public certificate issued by ACMlong. This ARN is used to validate custom domain ownership. It's required only if you configure mutual TLS and use either an ACM-imported or a private CA certificate ARN as the regionalCertificateArn.",
  ).optional(),
  EndpointType: z.string().describe("The endpoint type.").optional(),
  CertificateName: z.string().describe(
    "The user-friendly name of the certificate that will be used by the edge-optimized endpoint for this domain name.",
  ).optional(),
  SecurityPolicy: z.string().describe(
    "The Transport Layer Security (TLS) version of the security policy for this domain name. The valid values are TLS_1_0 and TLS_1_2.",
  ).optional(),
  CertificateArn: z.string().describe(
    "An AWS-managed certificate that will be used by the edge-optimized endpoint for this domain name. AWS Certificate Manager is the only supported source.",
  ).optional(),
  IpAddressType: z.string().describe(
    "The IP address types that can invoke the domain name. Use ipv4 to allow only IPv4 addresses to invoke your domain name, or use dualstack to allow both IPv4 and IPv6 addresses to invoke your domain name.",
  ).optional(),
});

const GlobalArgsSchema = z.object({
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
  MutualTlsAuthentication: z.object({
    TruststoreVersion: z.string().describe(
      "The version of the S3 object that contains your truststore. To specify a version, you must have versioning enabled for the S3 bucket.",
    ).optional(),
    TruststoreUri: z.string().describe(
      "An Amazon S3 URL that specifies the truststore for mutual TLS authentication, for example, s3://bucket-name/key-name. The truststore can contain certificates from public or private certificate authorities. To update the truststore, upload a new version to S3, and then update your custom domain name to use the new version. To update the truststore, you must have permissions to access the S3 object.",
    ).optional(),
  }).describe(
    "The mutual TLS authentication configuration for a custom domain name.",
  ).optional(),
  DomainName: z.string().describe(
    "The custom domain name for your API in Amazon API Gateway. Uppercase letters and the underscore ( _) character are not supported.",
  ),
  DomainNameConfigurations: z.array(DomainNameConfigurationSchema).describe(
    "The domain name configurations.",
  ).optional(),
  RoutingMode: z.enum([
    "API_MAPPING_ONLY",
    "ROUTING_RULE_THEN_API_MAPPING",
    "ROUTING_RULE_ONLY",
  ]).describe(
    "The routing mode API Gateway uses to route traffic to your APIs.",
  ).optional(),
  Tags: z.record(z.string(), z.string()).describe(
    "The collection of tags associated with a domain name.",
  ).optional(),
});

const StateSchema = z.object({
  MutualTlsAuthentication: z.object({
    TruststoreVersion: z.string(),
    TruststoreUri: z.string(),
  }).optional(),
  RegionalHostedZoneId: z.string().optional(),
  RegionalDomainName: z.string().optional(),
  DomainNameArn: z.string().optional(),
  DomainName: z.string(),
  DomainNameConfigurations: z.array(DomainNameConfigurationSchema).optional(),
  RoutingMode: z.string().optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  MutualTlsAuthentication: z.object({
    TruststoreVersion: z.string().describe(
      "The version of the S3 object that contains your truststore. To specify a version, you must have versioning enabled for the S3 bucket.",
    ).optional(),
    TruststoreUri: z.string().describe(
      "An Amazon S3 URL that specifies the truststore for mutual TLS authentication, for example, s3://bucket-name/key-name. The truststore can contain certificates from public or private certificate authorities. To update the truststore, upload a new version to S3, and then update your custom domain name to use the new version. To update the truststore, you must have permissions to access the S3 object.",
    ).optional(),
  }).describe(
    "The mutual TLS authentication configuration for a custom domain name.",
  ).optional(),
  DomainName: z.string().describe(
    "The custom domain name for your API in Amazon API Gateway. Uppercase letters and the underscore ( _) character are not supported.",
  ).optional(),
  DomainNameConfigurations: z.array(DomainNameConfigurationSchema).describe(
    "The domain name configurations.",
  ).optional(),
  RoutingMode: z.enum([
    "API_MAPPING_ONLY",
    "ROUTING_RULE_THEN_API_MAPPING",
    "ROUTING_RULE_ONLY",
  ]).describe(
    "The routing mode API Gateway uses to route traffic to your APIs.",
  ).optional(),
  Tags: z.record(z.string(), z.string()).describe(
    "The collection of tags associated with a domain name.",
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

/** Swamp extension model for ApiGatewayV2 DomainName. Registered at `@swamp/aws/apigatewayv2/domain-name`. */
export const model = {
  type: "@swamp/aws/apigatewayv2/domain-name",
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
      toVersion: "2026.06.09.1",
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
      description: "ApiGatewayV2 DomainName resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ApiGatewayV2 DomainName",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::ApiGatewayV2::DomainName",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.DomainName ?? g.DomainName)?.toString() ?? "current")
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
      description: "Get a ApiGatewayV2 DomainName",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ApiGatewayV2 DomainName",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::ApiGatewayV2::DomainName",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.DomainName ?? context.globalArgs.DomainName)?.toString() ??
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
    update: {
      description: "Update a ApiGatewayV2 DomainName",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.DomainName?.toString() ?? "current").replace(
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
        const identifier = existing.DomainName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::ApiGatewayV2::DomainName",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::ApiGatewayV2::DomainName",
          identifier,
          currentState,
          desiredState,
          ["DomainName"],
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
      description: "Delete a ApiGatewayV2 DomainName",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ApiGatewayV2 DomainName",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::ApiGatewayV2::DomainName",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.DomainName?.toString() ?? args.identifier)
            .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
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
      description: "Sync ApiGatewayV2 DomainName state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.DomainName?.toString() ?? "current").replace(
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
        const identifier = existing.DomainName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::ApiGatewayV2::DomainName",
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
