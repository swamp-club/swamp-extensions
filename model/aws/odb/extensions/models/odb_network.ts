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

// Auto-generated extension model for @swamp/aws/odb/odb-network
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ODB OdbNetwork (AWS::ODB::OdbNetwork).
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
    "The key name of the tag. You can specify a value that's 1 to 128 Unicode characters in length and can't be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,.,:, /, =, +, @, -, and \".",
  ),
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that's 1 to 256 characters in length. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ).optional(),
});

const CrossRegionS3RestoreSourcesAccessSchema = z.object({
  Status: z.enum(["ENABLED", "ENABLING", "DISABLED", "DISABLING"]).describe(
    "The current status of the cross-Region Amazon S3 restore access configuration.",
  ).optional(),
  Ipv4Addresses: z.array(z.string()).describe(
    "The IPv4 addresses allowed for cross-Region Amazon S3 restore access.",
  ).optional(),
  Region: z.string().describe(
    "The AWS-Region for cross-Region Amazon S3 restore access.",
  ).optional(),
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
  AvailabilityZone: z.string().min(1).max(255).describe(
    "The AWS Availability Zone (AZ) where the ODB network is located.",
  ).optional(),
  AvailabilityZoneId: z.string().min(1).max(255).describe(
    "The AZ ID of the AZ where the ODB network is located.",
  ).optional(),
  BackupSubnetCidr: z.string().min(1).max(255).describe(
    "The CIDR range of the backup subnet in the ODB network.",
  ).optional(),
  ClientSubnetCidr: z.string().min(1).max(255).describe(
    "The CIDR range of the client subnet in the ODB network.",
  ).optional(),
  CustomDomainName: z.string().min(1).max(255).describe(
    "The domain name to use for the resources in the ODB network.",
  ).optional(),
  DefaultDnsPrefix: z.string().min(1).max(255).describe(
    "The DNS prefix to the default DNS domain name. The default DNS domain name is oraclevcn.com.",
  ).optional(),
  DeleteAssociatedResources: z.boolean().describe(
    "Specifies whether to delete associated OCI networking resources along with the ODB network.",
  ).optional(),
  DisplayName: z.string().min(1).max(255).regex(
    new RegExp("^[a-zA-Z_](?!.*--)[a-zA-Z0-9_-]*$"),
  ).describe("The user-friendly name of the ODB network.").optional(),
  S3Access: z.enum(["ENABLED", "DISABLED"]).describe(
    "Specifies the configuration for Amazon S3 access from the ODB network.",
  ).optional(),
  S3PolicyDocument: z.string().describe(
    "Specifies the endpoint policy for Amazon S3 access from the ODB network.",
  ).optional(),
  KmsAccess: z.enum(["ENABLED", "DISABLED"]).describe(
    "The AWS Key Management Service (KMS) access configuration for the ODB network.",
  ).optional(),
  KmsPolicyDocument: z.string().describe(
    "The AWS Key Management Service (KMS) policy document that defines permissions for key usage within the ODB network.",
  ).optional(),
  StsAccess: z.enum(["ENABLED", "DISABLED"]).describe(
    "The AWS Security Token Service (STS) access configuration for the ODB network.",
  ).optional(),
  StsPolicyDocument: z.string().describe(
    "The AWS Security Token Service (STS) policy document that defines permissions for token service usage within the ODB network.",
  ).optional(),
  CrossRegionS3RestoreSources: z.array(z.string()).describe(
    "The cross-Region Amazon S3 restore sources for the ODB network.",
  ).optional(),
  Tags: z.array(TagSchema).describe("Tags to assign to the Odb Network.")
    .optional(),
  ManagedServices: z.object({
    ServiceNetworkArn: z.string().describe(
      "The Amazon Resource Name (ARN) of the service network.",
    ).optional(),
    ResourceGatewayArn: z.string().describe(
      "The Amazon Resource Name (ARN) of the resource gateway.",
    ).optional(),
    ManagedServicesIpv4Cidrs: z.array(z.string()).describe(
      "The IPv4 CIDR blocks for the managed services.",
    ).optional(),
    ServiceNetworkEndpoint: z.object({
      VpcEndpointId: z.string().describe("The identifier of the VPC endpoint.")
        .optional(),
      VpcEndpointType: z.enum(["SERVICENETWORK"]).describe(
        "The type of the VPC endpoint.",
      ).optional(),
    }).describe("The service network endpoint configuration.").optional(),
    ManagedS3BackupAccess: z.object({
      Status: z.enum(["ENABLED", "ENABLING", "DISABLED", "DISABLING"]).describe(
        "The status of the managed Amazon S3 backup access.",
      ).optional(),
      Ipv4Addresses: z.array(z.string()).describe(
        "The IPv4 addresses for the managed Amazon S3 backup access.",
      ).optional(),
    }).describe("The managed Amazon S3 backup access configuration.")
      .optional(),
    ZeroEtlAccess: z.object({
      Status: z.enum(["ENABLED", "ENABLING", "DISABLED", "DISABLING"]).describe(
        "The status of the Zero-ETL access.",
      ).optional(),
      Cidr: z.string().describe("The CIDR block for the Zero-ETL access.")
        .optional(),
    }).describe("The Zero-ETL access configuration.").optional(),
    S3Access: z.object({
      Status: z.enum(["ENABLED", "ENABLING", "DISABLED", "DISABLING"]).describe(
        "The status of the Amazon S3 access.",
      ).optional(),
      Ipv4Addresses: z.array(z.string()).describe(
        "The IPv4 addresses for the Amazon S3 access.",
      ).optional(),
      DomainName: z.string().describe(
        "The domain name for the Amazon S3 access.",
      ).optional(),
      S3PolicyDocument: z.string().describe(
        "The endpoint policy for the Amazon S3 access.",
      ).optional(),
    }).describe("The Amazon S3 access configuration.").optional(),
    KmsAccess: z.object({
      Status: z.enum(["ENABLED", "ENABLING", "DISABLED", "DISABLING"]).describe(
        "The status of the AWS KMS access.",
      ).optional(),
      Ipv4Addresses: z.array(z.string()).describe(
        "The IPv4 addresses for the AWS KMS access.",
      ).optional(),
      DomainName: z.string().describe("The domain name for the AWS KMS access.")
        .optional(),
      KmsPolicyDocument: z.string().describe(
        "The endpoint policy for the AWS KMS access.",
      ).optional(),
    }).describe("The AWS Key Management Service (KMS) access configuration.")
      .optional(),
    StsAccess: z.object({
      Status: z.enum(["ENABLED", "ENABLING", "DISABLED", "DISABLING"]).describe(
        "The status of the AWS STS access.",
      ).optional(),
      Ipv4Addresses: z.array(z.string()).describe(
        "The IPv4 addresses for the AWS STS access.",
      ).optional(),
      DomainName: z.string().describe("The domain name for the AWS STS access.")
        .optional(),
      StsPolicyDocument: z.string().describe(
        "The endpoint policy for the AWS STS access.",
      ).optional(),
    }).describe("The AWS Security Token Service (STS) access configuration.")
      .optional(),
    CrossRegionS3RestoreSourcesAccess: z.array(
      CrossRegionS3RestoreSourcesAccessSchema,
    ).describe(
      "The access configuration for the cross-Region Amazon S3 database restore source.",
    ).optional(),
  }).describe("The managed services configuration for the ODB network.")
    .optional(),
  ZeroEtlAccess: z.enum(["ENABLED", "DISABLED"]).describe(
    "Specifies the configuration for Zero-ETL access from the ODB network.",
  ).optional(),
});

const StateSchema = z.object({
  AvailabilityZone: z.string().optional(),
  AvailabilityZoneId: z.string().optional(),
  BackupSubnetCidr: z.string().optional(),
  ClientSubnetCidr: z.string().optional(),
  CustomDomainName: z.string().optional(),
  DefaultDnsPrefix: z.string().optional(),
  DeleteAssociatedResources: z.boolean().optional(),
  DisplayName: z.string().optional(),
  Ec2PlacementGroupIds: z.array(z.string()).optional(),
  OciNetworkAnchorId: z.string().optional(),
  OciResourceAnchorName: z.string().optional(),
  OciVcnUrl: z.string().optional(),
  OdbNetworkArn: z.string(),
  OdbNetworkId: z.string().optional(),
  S3Access: z.string().optional(),
  S3PolicyDocument: z.string().optional(),
  KmsAccess: z.string().optional(),
  KmsPolicyDocument: z.string().optional(),
  StsAccess: z.string().optional(),
  StsPolicyDocument: z.string().optional(),
  CrossRegionS3RestoreSources: z.array(z.string()).optional(),
  Tags: z.array(TagSchema).optional(),
  ManagedServices: z.object({
    ServiceNetworkArn: z.string(),
    ResourceGatewayArn: z.string(),
    ManagedServicesIpv4Cidrs: z.array(z.string()),
    ServiceNetworkEndpoint: z.object({
      VpcEndpointId: z.string(),
      VpcEndpointType: z.string(),
    }),
    ManagedS3BackupAccess: z.object({
      Status: z.string(),
      Ipv4Addresses: z.array(z.string()),
    }),
    ZeroEtlAccess: z.object({
      Status: z.string(),
      Cidr: z.string(),
    }),
    S3Access: z.object({
      Status: z.string(),
      Ipv4Addresses: z.array(z.string()),
      DomainName: z.string(),
      S3PolicyDocument: z.string(),
    }),
    KmsAccess: z.object({
      Status: z.string(),
      Ipv4Addresses: z.array(z.string()),
      DomainName: z.string(),
      KmsPolicyDocument: z.string(),
    }),
    StsAccess: z.object({
      Status: z.string(),
      Ipv4Addresses: z.array(z.string()),
      DomainName: z.string(),
      StsPolicyDocument: z.string(),
    }),
    CrossRegionS3RestoreSourcesAccess: z.array(
      CrossRegionS3RestoreSourcesAccessSchema,
    ),
  }).optional(),
  ZeroEtlAccess: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AvailabilityZone: z.string().min(1).max(255).describe(
    "The AWS Availability Zone (AZ) where the ODB network is located.",
  ).optional(),
  AvailabilityZoneId: z.string().min(1).max(255).describe(
    "The AZ ID of the AZ where the ODB network is located.",
  ).optional(),
  BackupSubnetCidr: z.string().min(1).max(255).describe(
    "The CIDR range of the backup subnet in the ODB network.",
  ).optional(),
  ClientSubnetCidr: z.string().min(1).max(255).describe(
    "The CIDR range of the client subnet in the ODB network.",
  ).optional(),
  CustomDomainName: z.string().min(1).max(255).describe(
    "The domain name to use for the resources in the ODB network.",
  ).optional(),
  DefaultDnsPrefix: z.string().min(1).max(255).describe(
    "The DNS prefix to the default DNS domain name. The default DNS domain name is oraclevcn.com.",
  ).optional(),
  DeleteAssociatedResources: z.boolean().describe(
    "Specifies whether to delete associated OCI networking resources along with the ODB network.",
  ).optional(),
  DisplayName: z.string().min(1).max(255).regex(
    new RegExp("^[a-zA-Z_](?!.*--)[a-zA-Z0-9_-]*$"),
  ).describe("The user-friendly name of the ODB network.").optional(),
  S3Access: z.enum(["ENABLED", "DISABLED"]).describe(
    "Specifies the configuration for Amazon S3 access from the ODB network.",
  ).optional(),
  S3PolicyDocument: z.string().describe(
    "Specifies the endpoint policy for Amazon S3 access from the ODB network.",
  ).optional(),
  KmsAccess: z.enum(["ENABLED", "DISABLED"]).describe(
    "The AWS Key Management Service (KMS) access configuration for the ODB network.",
  ).optional(),
  KmsPolicyDocument: z.string().describe(
    "The AWS Key Management Service (KMS) policy document that defines permissions for key usage within the ODB network.",
  ).optional(),
  StsAccess: z.enum(["ENABLED", "DISABLED"]).describe(
    "The AWS Security Token Service (STS) access configuration for the ODB network.",
  ).optional(),
  StsPolicyDocument: z.string().describe(
    "The AWS Security Token Service (STS) policy document that defines permissions for token service usage within the ODB network.",
  ).optional(),
  CrossRegionS3RestoreSources: z.array(z.string()).describe(
    "The cross-Region Amazon S3 restore sources for the ODB network.",
  ).optional(),
  Tags: z.array(TagSchema).describe("Tags to assign to the Odb Network.")
    .optional(),
  ManagedServices: z.object({
    ServiceNetworkArn: z.string().describe(
      "The Amazon Resource Name (ARN) of the service network.",
    ).optional(),
    ResourceGatewayArn: z.string().describe(
      "The Amazon Resource Name (ARN) of the resource gateway.",
    ).optional(),
    ManagedServicesIpv4Cidrs: z.array(z.string()).describe(
      "The IPv4 CIDR blocks for the managed services.",
    ).optional(),
    ServiceNetworkEndpoint: z.object({
      VpcEndpointId: z.string().describe("The identifier of the VPC endpoint.")
        .optional(),
      VpcEndpointType: z.enum(["SERVICENETWORK"]).describe(
        "The type of the VPC endpoint.",
      ).optional(),
    }).describe("The service network endpoint configuration.").optional(),
    ManagedS3BackupAccess: z.object({
      Status: z.enum(["ENABLED", "ENABLING", "DISABLED", "DISABLING"]).describe(
        "The status of the managed Amazon S3 backup access.",
      ).optional(),
      Ipv4Addresses: z.array(z.string()).describe(
        "The IPv4 addresses for the managed Amazon S3 backup access.",
      ).optional(),
    }).describe("The managed Amazon S3 backup access configuration.")
      .optional(),
    ZeroEtlAccess: z.object({
      Status: z.enum(["ENABLED", "ENABLING", "DISABLED", "DISABLING"]).describe(
        "The status of the Zero-ETL access.",
      ).optional(),
      Cidr: z.string().describe("The CIDR block for the Zero-ETL access.")
        .optional(),
    }).describe("The Zero-ETL access configuration.").optional(),
    S3Access: z.object({
      Status: z.enum(["ENABLED", "ENABLING", "DISABLED", "DISABLING"]).describe(
        "The status of the Amazon S3 access.",
      ).optional(),
      Ipv4Addresses: z.array(z.string()).describe(
        "The IPv4 addresses for the Amazon S3 access.",
      ).optional(),
      DomainName: z.string().describe(
        "The domain name for the Amazon S3 access.",
      ).optional(),
      S3PolicyDocument: z.string().describe(
        "The endpoint policy for the Amazon S3 access.",
      ).optional(),
    }).describe("The Amazon S3 access configuration.").optional(),
    KmsAccess: z.object({
      Status: z.enum(["ENABLED", "ENABLING", "DISABLED", "DISABLING"]).describe(
        "The status of the AWS KMS access.",
      ).optional(),
      Ipv4Addresses: z.array(z.string()).describe(
        "The IPv4 addresses for the AWS KMS access.",
      ).optional(),
      DomainName: z.string().describe("The domain name for the AWS KMS access.")
        .optional(),
      KmsPolicyDocument: z.string().describe(
        "The endpoint policy for the AWS KMS access.",
      ).optional(),
    }).describe("The AWS Key Management Service (KMS) access configuration.")
      .optional(),
    StsAccess: z.object({
      Status: z.enum(["ENABLED", "ENABLING", "DISABLED", "DISABLING"]).describe(
        "The status of the AWS STS access.",
      ).optional(),
      Ipv4Addresses: z.array(z.string()).describe(
        "The IPv4 addresses for the AWS STS access.",
      ).optional(),
      DomainName: z.string().describe("The domain name for the AWS STS access.")
        .optional(),
      StsPolicyDocument: z.string().describe(
        "The endpoint policy for the AWS STS access.",
      ).optional(),
    }).describe("The AWS Security Token Service (STS) access configuration.")
      .optional(),
    CrossRegionS3RestoreSourcesAccess: z.array(
      CrossRegionS3RestoreSourcesAccessSchema,
    ).describe(
      "The access configuration for the cross-Region Amazon S3 database restore source.",
    ).optional(),
  }).describe("The managed services configuration for the ODB network.")
    .optional(),
  ZeroEtlAccess: z.enum(["ENABLED", "DISABLED"]).describe(
    "Specifies the configuration for Zero-ETL access from the ODB network.",
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

/** Swamp extension model for ODB OdbNetwork. Registered at `@swamp/aws/odb/odb-network`. */
export const model = {
  type: "@swamp/aws/odb/odb-network",
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
      toVersion: "2026.05.09.1",
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
      description: "ODB OdbNetwork resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ODB OdbNetwork",
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
          "AWS::ODB::OdbNetwork",
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
      description: "Get a ODB OdbNetwork",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ODB OdbNetwork",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::ODB::OdbNetwork",
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
      description: "Update a ODB OdbNetwork",
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
        const identifier = existing.OdbNetworkArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::ODB::OdbNetwork",
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
          "AWS::ODB::OdbNetwork",
          identifier,
          currentState,
          desiredState,
          [
            "AvailabilityZone",
            "AvailabilityZoneId",
            "BackupSubnetCidr",
            "ClientSubnetCidr",
            "CustomDomainName",
            "DefaultDnsPrefix",
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
      description: "Delete a ODB OdbNetwork",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ODB OdbNetwork",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::ODB::OdbNetwork",
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
      description: "Sync ODB OdbNetwork state from AWS",
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
        const identifier = existing.OdbNetworkArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::ODB::OdbNetwork",
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
