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

// Auto-generated extension model for @swamp/aws/transfer/server
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any no-control-regex

/**
 * Swamp extension model for Transfer Server (AWS::Transfer::Server).
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
  Key: z.string().min(0).max(128),
  Value: z.string().min(0).max(256),
});

const WorkflowDetailSchema = z.object({
  WorkflowId: z.string().min(19).max(19).regex(
    new RegExp("^w-([a-z0-9]{17})$"),
  ),
  ExecutionRole: z.string().min(20).max(2048).regex(
    new RegExp("^arn:.*role/\\S+$"),
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
  Certificate: z.string().min(0).max(1600).optional(),
  Domain: z.enum(["S3", "EFS"]).optional(),
  EndpointDetails: z.object({
    AddressAllocationIds: z.array(z.string()).optional(),
    SubnetIds: z.array(z.string()).optional(),
    VpcEndpointId: z.string().min(22).max(22).regex(
      new RegExp("^vpce-[0-9a-f]{17}$"),
    ).optional(),
    VpcId: z.string().optional(),
    SecurityGroupIds: z.array(
      z.string().min(11).max(20).regex(new RegExp("^sg-[0-9a-f]{8,17}$")),
    ).optional(),
  }).optional(),
  EndpointType: z.enum(["PUBLIC", "VPC", "VPC_ENDPOINT"]).optional(),
  IdentityProviderDetails: z.object({
    Url: z.string().min(0).max(255).optional(),
    InvocationRole: z.string().min(20).max(2048).regex(
      new RegExp("^arn:.*role/\\S+$"),
    ).optional(),
    DirectoryId: z.string().min(12).max(12).regex(
      new RegExp("^d-[0-9a-f]{10}$"),
    ).optional(),
    Function: z.string().min(1).max(170).regex(
      new RegExp("^arn:[a-z-]+:lambda:.*$"),
    ).optional(),
    SftpAuthenticationMethods: z.enum([
      "PASSWORD",
      "PUBLIC_KEY",
      "PUBLIC_KEY_OR_PASSWORD",
      "PUBLIC_KEY_AND_PASSWORD",
    ]).optional(),
  }).optional(),
  IdentityProviderType: z.enum([
    "SERVICE_MANAGED",
    "API_GATEWAY",
    "AWS_DIRECTORY_SERVICE",
    "AWS_LAMBDA",
  ]).optional(),
  IpAddressType: z.enum(["IPV4", "DUALSTACK"]).optional(),
  LoggingRole: z.string().min(0).max(2048).regex(
    new RegExp("^(|arn:.*role/\\S+)$"),
  ).optional(),
  PostAuthenticationLoginBanner: z.string().min(0).max(4096).regex(
    new RegExp("^[\\x09-\\x0D\\x20-\\x7E]*$"),
  ).optional(),
  PreAuthenticationLoginBanner: z.string().min(0).max(4096).regex(
    new RegExp("^[\\x09-\\x0D\\x20-\\x7E]*$"),
  ).optional(),
  ProtocolDetails: z.object({
    PassiveIp: z.string().min(0).max(15).optional(),
    TlsSessionResumptionMode: z.enum(["DISABLED", "ENABLED", "ENFORCED"])
      .optional(),
    SetStatOption: z.enum(["DEFAULT", "ENABLE_NO_OP"]).optional(),
    As2Transports: z.array(z.enum(["HTTP"])).optional(),
  }).optional(),
  Protocols: z.array(z.enum(["SFTP", "FTP", "FTPS", "AS2"])).optional(),
  S3StorageOptions: z.object({
    DirectoryListingOptimization: z.enum(["ENABLED", "DISABLED"]).describe(
      "Indicates whether optimization to directory listing on S3 servers is used. Disabled by default for compatibility.",
    ).optional(),
  }).optional(),
  SecurityPolicyName: z.string().min(0).max(100).regex(
    new RegExp("^TransferSecurityPolicy-.+$"),
  ).optional(),
  StructuredLogDestinations: z.array(
    z.string().min(20).max(1600).regex(new RegExp("^arn:\\S+$")),
  ).optional(),
  Tags: z.array(TagSchema).optional(),
  WorkflowDetails: z.object({
    OnUpload: z.array(WorkflowDetailSchema).optional(),
    OnPartialUpload: z.array(WorkflowDetailSchema).optional(),
  }).optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  As2ServiceManagedEgressIpAddresses: z.array(z.string()).optional(),
  Certificate: z.string().optional(),
  Domain: z.string().optional(),
  EndpointDetails: z.object({
    AddressAllocationIds: z.array(z.string()),
    SubnetIds: z.array(z.string()),
    VpcEndpointId: z.string(),
    VpcId: z.string(),
    SecurityGroupIds: z.array(z.string()),
  }).optional(),
  EndpointType: z.string().optional(),
  IdentityProviderDetails: z.object({
    Url: z.string(),
    InvocationRole: z.string(),
    DirectoryId: z.string(),
    Function: z.string(),
    SftpAuthenticationMethods: z.string(),
  }).optional(),
  IdentityProviderType: z.string().optional(),
  IpAddressType: z.string().optional(),
  LoggingRole: z.string().optional(),
  PostAuthenticationLoginBanner: z.string().optional(),
  PreAuthenticationLoginBanner: z.string().optional(),
  ProtocolDetails: z.object({
    PassiveIp: z.string(),
    TlsSessionResumptionMode: z.string(),
    SetStatOption: z.string(),
    As2Transports: z.array(z.string()),
  }).optional(),
  Protocols: z.array(z.string()).optional(),
  S3StorageOptions: z.object({
    DirectoryListingOptimization: z.string(),
  }).optional(),
  SecurityPolicyName: z.string().optional(),
  ServerId: z.string().optional(),
  State: z.string().optional(),
  StructuredLogDestinations: z.array(z.string()).optional(),
  Tags: z.array(TagSchema).optional(),
  WorkflowDetails: z.object({
    OnUpload: z.array(WorkflowDetailSchema),
    OnPartialUpload: z.array(WorkflowDetailSchema),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Certificate: z.string().min(0).max(1600).optional(),
  Domain: z.enum(["S3", "EFS"]).optional(),
  EndpointDetails: z.object({
    AddressAllocationIds: z.array(z.string()).optional(),
    SubnetIds: z.array(z.string()).optional(),
    VpcEndpointId: z.string().min(22).max(22).regex(
      new RegExp("^vpce-[0-9a-f]{17}$"),
    ).optional(),
    VpcId: z.string().optional(),
    SecurityGroupIds: z.array(
      z.string().min(11).max(20).regex(new RegExp("^sg-[0-9a-f]{8,17}$")),
    ).optional(),
  }).optional(),
  EndpointType: z.enum(["PUBLIC", "VPC", "VPC_ENDPOINT"]).optional(),
  IdentityProviderDetails: z.object({
    Url: z.string().min(0).max(255).optional(),
    InvocationRole: z.string().min(20).max(2048).regex(
      new RegExp("^arn:.*role/\\S+$"),
    ).optional(),
    DirectoryId: z.string().min(12).max(12).regex(
      new RegExp("^d-[0-9a-f]{10}$"),
    ).optional(),
    Function: z.string().min(1).max(170).regex(
      new RegExp("^arn:[a-z-]+:lambda:.*$"),
    ).optional(),
    SftpAuthenticationMethods: z.enum([
      "PASSWORD",
      "PUBLIC_KEY",
      "PUBLIC_KEY_OR_PASSWORD",
      "PUBLIC_KEY_AND_PASSWORD",
    ]).optional(),
  }).optional(),
  IdentityProviderType: z.enum([
    "SERVICE_MANAGED",
    "API_GATEWAY",
    "AWS_DIRECTORY_SERVICE",
    "AWS_LAMBDA",
  ]).optional(),
  IpAddressType: z.enum(["IPV4", "DUALSTACK"]).optional(),
  LoggingRole: z.string().min(0).max(2048).regex(
    new RegExp("^(|arn:.*role/\\S+)$"),
  ).optional(),
  PostAuthenticationLoginBanner: z.string().min(0).max(4096).regex(
    new RegExp("^[\\x09-\\x0D\\x20-\\x7E]*$"),
  ).optional(),
  PreAuthenticationLoginBanner: z.string().min(0).max(4096).regex(
    new RegExp("^[\\x09-\\x0D\\x20-\\x7E]*$"),
  ).optional(),
  ProtocolDetails: z.object({
    PassiveIp: z.string().min(0).max(15).optional(),
    TlsSessionResumptionMode: z.enum(["DISABLED", "ENABLED", "ENFORCED"])
      .optional(),
    SetStatOption: z.enum(["DEFAULT", "ENABLE_NO_OP"]).optional(),
    As2Transports: z.array(z.enum(["HTTP"])).optional(),
  }).optional(),
  Protocols: z.array(z.enum(["SFTP", "FTP", "FTPS", "AS2"])).optional(),
  S3StorageOptions: z.object({
    DirectoryListingOptimization: z.enum(["ENABLED", "DISABLED"]).describe(
      "Indicates whether optimization to directory listing on S3 servers is used. Disabled by default for compatibility.",
    ).optional(),
  }).optional(),
  SecurityPolicyName: z.string().min(0).max(100).regex(
    new RegExp("^TransferSecurityPolicy-.+$"),
  ).optional(),
  StructuredLogDestinations: z.array(
    z.string().min(20).max(1600).regex(new RegExp("^arn:\\S+$")),
  ).optional(),
  Tags: z.array(TagSchema).optional(),
  WorkflowDetails: z.object({
    OnUpload: z.array(WorkflowDetailSchema).optional(),
    OnPartialUpload: z.array(WorkflowDetailSchema).optional(),
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

/** Swamp extension model for Transfer Server. Registered at `@swamp/aws/transfer/server`. */
export const model = {
  type: "@swamp/aws/transfer/server",
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
      description: "Transfer Server resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Transfer Server",
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
          "AWS::Transfer::Server",
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
      description: "Get a Transfer Server",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Transfer Server",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Transfer::Server",
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
      description: "Update a Transfer Server",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Transfer::Server",
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
          "AWS::Transfer::Server",
          identifier,
          currentState,
          desiredState,
          ["Domain"],
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
      description: "Delete a Transfer Server",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Transfer Server",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Transfer::Server",
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
      description: "Sync Transfer Server state from AWS",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Transfer::Server",
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
