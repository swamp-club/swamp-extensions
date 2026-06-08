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

// Auto-generated extension model for @swamp/aws/transfer/connector
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Transfer Connector (AWS::Transfer::Connector).
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

const ConnectorAsyncMdnConfigSchema = z.object({
  Url: z.string().describe("URL of the server to receive the MDN response on"),
  ServerIds: z.array(
    z.string().min(19).max(19).regex(new RegExp("^s-([0-9a-f]{17})$")),
  ),
});

const ConnectorVpcLatticeEgressConfigSchema = z.object({
  ResourceConfigurationArn: z.string().min(1).max(2048).regex(
    new RegExp(
      "^arn:[a-z0-9\\-]+:vpc-lattice:[a-zA-Z0-9\\-]+:\\d{12}:resourceconfiguration/rcfg-[0-9a-z]{17}$",
    ),
  ).describe("ARN of the VPC Lattice resource configuration"),
  PortNumber: z.number().int().min(1).max(65535).describe(
    "Port to connect to on the target VPC Lattice resource",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe(
    "The name assigned to the tag that you create.",
  ),
  Value: z.string().min(0).max(256).describe(
    "Contains one or more values that you assigned to the key name you create.",
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
  AccessRole: z.string().min(20).max(2048).regex(new RegExp("arn:.*role/.*"))
    .describe("Specifies the access role for the connector."),
  As2Config: z.object({
    LocalProfileId: z.string().min(19).max(19).regex(
      new RegExp("^p-([0-9a-f]{17})$"),
    ).describe("A unique identifier for the local profile.").optional(),
    PartnerProfileId: z.string().min(19).max(19).regex(
      new RegExp("^p-([0-9a-f]{17})$"),
    ).describe("A unique identifier for the partner profile.").optional(),
    MessageSubject: z.string().min(1).max(1024).regex(
      new RegExp("^[\\u0020-\\u007E\\t]+$"),
    ).describe("The message subject for this AS2 connector configuration.")
      .optional(),
    Compression: z.enum(["ZLIB", "DISABLED"]).describe(
      "Compression setting for this AS2 connector configuration.",
    ).optional(),
    EncryptionAlgorithm: z.enum([
      "AES128_CBC",
      "AES192_CBC",
      "AES256_CBC",
      "NONE",
      "DES_EDE3_CBC",
    ]).describe("Encryption algorithm for this AS2 connector configuration.")
      .optional(),
    SigningAlgorithm: z.enum(["SHA256", "SHA384", "SHA512", "SHA1", "NONE"])
      .describe("Signing algorithm for this AS2 connector configuration.")
      .optional(),
    MdnSigningAlgorithm: z.enum([
      "SHA256",
      "SHA384",
      "SHA512",
      "SHA1",
      "NONE",
      "DEFAULT",
    ]).describe("MDN Signing algorithm for this AS2 connector configuration.")
      .optional(),
    MdnResponse: z.enum(["SYNC", "ASYNC", "NONE"]).describe(
      "MDN Response setting for this AS2 connector configuration.",
    ).optional(),
    BasicAuthSecretId: z.string().min(0).max(2048).describe(
      "ARN or name of the secret in AWS Secrets Manager which contains the credentials for Basic authentication. If empty, Basic authentication is disabled for the AS2 connector",
    ).optional(),
    PreserveContentType: z.enum(["ENABLED", "DISABLED"]).describe(
      "Specifies whether to use the AWS S3 object content-type as the content-type for the AS2 message.",
    ).optional(),
    AsyncMdnConfig: ConnectorAsyncMdnConfigSchema.describe(
      "Configuration for an AS2 connector with ASYNC MDN Response",
    ).optional(),
  }).describe("Configuration for an AS2 connector.").optional(),
  EgressType: z.enum(["SERVICE_MANAGED", "VPC_LATTICE"]).describe(
    "Specifies the egress type for the connector.",
  ).optional(),
  EgressConfig: z.object({
    VpcLattice: ConnectorVpcLatticeEgressConfigSchema,
  }).describe("Egress configuration for the connector.").optional(),
  SftpConfig: z.object({
    UserSecretId: z.string().min(1).max(2048).describe(
      "ARN or name of the secret in AWS Secrets Manager which contains the SFTP user's private keys or passwords.",
    ).optional(),
    TrustedHostKeys: z.array(z.string().min(1).max(2048)).describe(
      "List of public host keys, for the external server to which you are connecting.",
    ).optional(),
    MaxConcurrentConnections: z.number().int().min(1).max(5).describe(
      "Specifies the number of active connections that your connector can establish with the remote server at the same time.",
    ).optional(),
  }).describe("Configuration for an SFTP connector.").optional(),
  LoggingRole: z.string().min(20).max(2048).regex(new RegExp("arn:.*role/.*"))
    .describe("Specifies the logging role for the connector.").optional(),
  Tags: z.array(TagSchema).describe(
    "Key-value pairs that can be used to group and search for connectors. Tags are metadata attached to connectors for any purpose.",
  ).optional(),
  Url: z.string().max(255).describe("URL for Connector").optional(),
  SecurityPolicyName: z.string().max(50).regex(
    new RegExp("TransferSFTPConnectorSecurityPolicy-[A-Za-z0-9-]+"),
  ).describe("Security policy for SFTP Connector").optional(),
  IpAddressType: z.enum(["IPV4", "DUALSTACK"]).describe(
    "IP address type for Connector",
  ).optional(),
});

const StateSchema = z.object({
  AccessRole: z.string().optional(),
  As2Config: z.object({
    LocalProfileId: z.string(),
    PartnerProfileId: z.string(),
    MessageSubject: z.string(),
    Compression: z.string(),
    EncryptionAlgorithm: z.string(),
    SigningAlgorithm: z.string(),
    MdnSigningAlgorithm: z.string(),
    MdnResponse: z.string(),
    BasicAuthSecretId: z.string(),
    PreserveContentType: z.string(),
    AsyncMdnConfig: ConnectorAsyncMdnConfigSchema,
  }).optional(),
  EgressType: z.string().optional(),
  EgressConfig: z.object({
    VpcLattice: ConnectorVpcLatticeEgressConfigSchema,
  }).optional(),
  Status: z.string().optional(),
  SftpConfig: z.object({
    UserSecretId: z.string(),
    TrustedHostKeys: z.array(z.string()),
    MaxConcurrentConnections: z.number(),
  }).optional(),
  Arn: z.string().optional(),
  ConnectorId: z.string(),
  LoggingRole: z.string().optional(),
  ServiceManagedEgressIpAddresses: z.array(z.string()).optional(),
  Tags: z.array(TagSchema).optional(),
  Url: z.string().optional(),
  SecurityPolicyName: z.string().optional(),
  ErrorMessage: z.string().optional(),
  IpAddressType: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AccessRole: z.string().min(20).max(2048).regex(new RegExp("arn:.*role/.*"))
    .describe("Specifies the access role for the connector.").optional(),
  As2Config: z.object({
    LocalProfileId: z.string().min(19).max(19).regex(
      new RegExp("^p-([0-9a-f]{17})$"),
    ).describe("A unique identifier for the local profile.").optional(),
    PartnerProfileId: z.string().min(19).max(19).regex(
      new RegExp("^p-([0-9a-f]{17})$"),
    ).describe("A unique identifier for the partner profile.").optional(),
    MessageSubject: z.string().min(1).max(1024).regex(
      new RegExp("^[\\u0020-\\u007E\\t]+$"),
    ).describe("The message subject for this AS2 connector configuration.")
      .optional(),
    Compression: z.enum(["ZLIB", "DISABLED"]).describe(
      "Compression setting for this AS2 connector configuration.",
    ).optional(),
    EncryptionAlgorithm: z.enum([
      "AES128_CBC",
      "AES192_CBC",
      "AES256_CBC",
      "NONE",
      "DES_EDE3_CBC",
    ]).describe("Encryption algorithm for this AS2 connector configuration.")
      .optional(),
    SigningAlgorithm: z.enum(["SHA256", "SHA384", "SHA512", "SHA1", "NONE"])
      .describe("Signing algorithm for this AS2 connector configuration.")
      .optional(),
    MdnSigningAlgorithm: z.enum([
      "SHA256",
      "SHA384",
      "SHA512",
      "SHA1",
      "NONE",
      "DEFAULT",
    ]).describe("MDN Signing algorithm for this AS2 connector configuration.")
      .optional(),
    MdnResponse: z.enum(["SYNC", "ASYNC", "NONE"]).describe(
      "MDN Response setting for this AS2 connector configuration.",
    ).optional(),
    BasicAuthSecretId: z.string().min(0).max(2048).describe(
      "ARN or name of the secret in AWS Secrets Manager which contains the credentials for Basic authentication. If empty, Basic authentication is disabled for the AS2 connector",
    ).optional(),
    PreserveContentType: z.enum(["ENABLED", "DISABLED"]).describe(
      "Specifies whether to use the AWS S3 object content-type as the content-type for the AS2 message.",
    ).optional(),
    AsyncMdnConfig: ConnectorAsyncMdnConfigSchema.describe(
      "Configuration for an AS2 connector with ASYNC MDN Response",
    ).optional(),
  }).describe("Configuration for an AS2 connector.").optional(),
  EgressType: z.enum(["SERVICE_MANAGED", "VPC_LATTICE"]).describe(
    "Specifies the egress type for the connector.",
  ).optional(),
  EgressConfig: z.object({
    VpcLattice: ConnectorVpcLatticeEgressConfigSchema.optional(),
  }).describe("Egress configuration for the connector.").optional(),
  SftpConfig: z.object({
    UserSecretId: z.string().min(1).max(2048).describe(
      "ARN or name of the secret in AWS Secrets Manager which contains the SFTP user's private keys or passwords.",
    ).optional(),
    TrustedHostKeys: z.array(z.string().min(1).max(2048)).describe(
      "List of public host keys, for the external server to which you are connecting.",
    ).optional(),
    MaxConcurrentConnections: z.number().int().min(1).max(5).describe(
      "Specifies the number of active connections that your connector can establish with the remote server at the same time.",
    ).optional(),
  }).describe("Configuration for an SFTP connector.").optional(),
  LoggingRole: z.string().min(20).max(2048).regex(new RegExp("arn:.*role/.*"))
    .describe("Specifies the logging role for the connector.").optional(),
  Tags: z.array(TagSchema).describe(
    "Key-value pairs that can be used to group and search for connectors. Tags are metadata attached to connectors for any purpose.",
  ).optional(),
  Url: z.string().max(255).describe("URL for Connector").optional(),
  SecurityPolicyName: z.string().max(50).regex(
    new RegExp("TransferSFTPConnectorSecurityPolicy-[A-Za-z0-9-]+"),
  ).describe("Security policy for SFTP Connector").optional(),
  IpAddressType: z.enum(["IPV4", "DUALSTACK"]).describe(
    "IP address type for Connector",
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

/** Swamp extension model for Transfer Connector. Registered at `@swamp/aws/transfer/connector`. */
export const model = {
  type: "@swamp/aws/transfer/connector",
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
      toVersion: "2026.04.19.1",
      description: "Added: IpAddressType",
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
      description: "Transfer Connector resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Transfer Connector",
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
          "AWS::Transfer::Connector",
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
      description: "Get a Transfer Connector",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Transfer Connector",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Transfer::Connector",
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
      description: "Update a Transfer Connector",
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
        const identifier = existing.ConnectorId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Transfer::Connector",
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
          "AWS::Transfer::Connector",
          identifier,
          currentState,
          desiredState,
          undefined,
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
      description: "Delete a Transfer Connector",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Transfer Connector",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Transfer::Connector",
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
      description: "Sync Transfer Connector state from AWS",
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
        const identifier = existing.ConnectorId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Transfer::Connector",
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
