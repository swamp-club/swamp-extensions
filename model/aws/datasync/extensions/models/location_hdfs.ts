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

// Auto-generated extension model for @swamp/aws/datasync/location-hdfs
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for DataSync LocationHDFS (AWS::DataSync::LocationHDFS).
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

const NameNodeSchema = z.object({
  Hostname: z.string().max(255).regex(
    new RegExp(
      "^(([a-zA-Z0-9\\-]*[a-zA-Z0-9])\\.)*([A-Za-z0-9\\-]*[A-Za-z0-9])$",
    ),
  ).describe(
    "The DNS name or IP address of the Name Node in the customer's on premises HDFS cluster.",
  ),
  Port: z.number().int().min(1).max(65536).describe(
    "The port on which the Name Node is listening on for client requests.",
  ),
});

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
  NameNodes: z.array(NameNodeSchema).describe(
    "An array of Name Node(s) of the HDFS location.",
  ),
  BlockSize: z.number().int().min(1048576).max(1073741824).describe(
    "Size of chunks (blocks) in bytes that the data is divided into when stored in the HDFS cluster.",
  ).optional(),
  ReplicationFactor: z.number().int().min(1).max(512).describe(
    "Number of copies of each block that exists inside the HDFS cluster.",
  ).optional(),
  KmsKeyProviderUri: z.string().min(1).max(255).regex(
    new RegExp(
      "^kms:\\/\\/http[s]?@(([a-zA-Z0-9\\-]*[a-zA-Z0-9])\\.)*([A-Za-z0-9\\-]*[A-Za-z0-9])(;(([a-zA-Z0-9\\-]*[a-zA-Z0-9])\\.)*([A-Za-z0-9\\-]*[A-Za-z0-9]))*:[0-9]{1,5}\\/kms$",
    ),
  ).describe(
    "The identifier for the Key Management Server where the encryption keys that encrypt data inside HDFS clusters are stored.",
  ).optional(),
  QopConfiguration: z.object({
    RpcProtection: z.enum([
      "AUTHENTICATION",
      "INTEGRITY",
      "PRIVACY",
      "DISABLED",
    ]).describe("Configuration for RPC Protection.").optional(),
    DataTransferProtection: z.enum([
      "AUTHENTICATION",
      "INTEGRITY",
      "PRIVACY",
      "DISABLED",
    ]).describe("Configuration for Data Transfer Protection.").optional(),
  }).describe(
    "Configuration information for RPC Protection and Data Transfer Protection. These parameters can be set to AUTHENTICATION, INTEGRITY, or PRIVACY. The default value is PRIVACY.",
  ).optional(),
  AuthenticationType: z.enum(["SIMPLE", "KERBEROS"]).describe(
    "The authentication mode used to determine identity of user.",
  ),
  SimpleUser: z.string().min(1).max(256).regex(
    new RegExp("^[_.A-Za-z0-9][-_.A-Za-z0-9]*$"),
  ).describe(
    "The user name that has read and write permissions on the specified HDFS cluster.",
  ).optional(),
  KerberosPrincipal: z.string().min(1).max(256).regex(new RegExp("^.+$"))
    .describe(
      "The unique identity, or principal, to which Kerberos can assign tickets.",
    ).optional(),
  KerberosKeytab: z.string().max(87384).describe(
    "The Base64 string representation of the Keytab file.",
  ).optional(),
  KerberosKrb5Conf: z.string().max(174764).describe(
    "The string representation of the Krb5Conf file, or the presigned URL to access the Krb5.conf file within an S3 bucket.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
  AgentArns: z.array(
    z.string().max(128).regex(
      new RegExp(
        "^arn:(aws|aws-cn|aws-us-gov|aws-eusc|aws-iso|aws-iso-b):datasync:[a-z\\-0-9]+:[0-9]{12}:agent/agent-[0-9a-z]{17}$",
      ),
    ),
  ).describe("ARN(s) of the agent(s) to use for an HDFS location."),
  Subdirectory: z.string().max(4096).regex(
    new RegExp("^[a-zA-Z0-9_\\-\\+\\./\\(\\)\\$\\p{Zs}]+$", "u"),
  ).describe(
    "The subdirectory in HDFS that is used to read data from the HDFS source location or write data to the HDFS destination.",
  ).optional(),
  CmkSecretConfig: z.object({
    KmsKeyArn: z.string().max(2048).regex(
      new RegExp(
        "^(arn:(aws|aws-cn|aws-us-gov|aws-eusc|aws-iso|aws-iso-b):kms:[a-z-0-9]+:[0-9]{12}:key/.*|)$",
      ),
    ).describe(
      "Specifies the ARN for the customer-managed AWS KMS key used to encrypt the secret specified for SecretArn. DataSync provides this key to AWS Secrets Manager.",
    ).optional(),
  }).describe(
    "Specifies configuration information for a DataSync-managed secret, such as an authentication token or set of credentials that DataSync uses to access a specific transfer location, and a customer-managed AWS KMS key.",
  ).optional(),
  CustomSecretConfig: z.object({
    SecretAccessRoleArn: z.string().max(2048).regex(
      new RegExp(
        "^(arn:(aws|aws-cn|aws-us-gov|aws-eusc|aws-iso|aws-iso-b):iam::[0-9]{12}:role/.*|)$",
      ),
    ).describe(
      "Specifies the ARN for the AWS Identity and Access Management role that DataSync uses to access the secret specified for SecretArn.",
    ),
  }).describe(
    "Specifies configuration information for a customer-managed secret, such as an authentication token or set of credentials that DataSync uses to access a specific transfer location, and an IAM role that DataSync can assume and access the customer-managed secret.",
  ).optional(),
});

const StateSchema = z.object({
  NameNodes: z.array(NameNodeSchema).optional(),
  BlockSize: z.number().optional(),
  ReplicationFactor: z.number().optional(),
  KmsKeyProviderUri: z.string().optional(),
  QopConfiguration: z.object({
    RpcProtection: z.string(),
    DataTransferProtection: z.string(),
  }).optional(),
  AuthenticationType: z.string().optional(),
  SimpleUser: z.string().optional(),
  KerberosPrincipal: z.string().optional(),
  KerberosKeytab: z.string().optional(),
  KerberosKrb5Conf: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  AgentArns: z.array(z.string()).optional(),
  Subdirectory: z.string().optional(),
  LocationArn: z.string(),
  LocationUri: z.string().optional(),
  CmkSecretConfig: z.object({
    SecretArn: z.string(),
    KmsKeyArn: z.string(),
  }).optional(),
  CustomSecretConfig: z.object({
    SecretArn: z.string(),
    SecretAccessRoleArn: z.string(),
  }).optional(),
  ManagedSecretConfig: z.object({
    SecretArn: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  NameNodes: z.array(NameNodeSchema).describe(
    "An array of Name Node(s) of the HDFS location.",
  ).optional(),
  BlockSize: z.number().int().min(1048576).max(1073741824).describe(
    "Size of chunks (blocks) in bytes that the data is divided into when stored in the HDFS cluster.",
  ).optional(),
  ReplicationFactor: z.number().int().min(1).max(512).describe(
    "Number of copies of each block that exists inside the HDFS cluster.",
  ).optional(),
  KmsKeyProviderUri: z.string().min(1).max(255).regex(
    new RegExp(
      "^kms:\\/\\/http[s]?@(([a-zA-Z0-9\\-]*[a-zA-Z0-9])\\.)*([A-Za-z0-9\\-]*[A-Za-z0-9])(;(([a-zA-Z0-9\\-]*[a-zA-Z0-9])\\.)*([A-Za-z0-9\\-]*[A-Za-z0-9]))*:[0-9]{1,5}\\/kms$",
    ),
  ).describe(
    "The identifier for the Key Management Server where the encryption keys that encrypt data inside HDFS clusters are stored.",
  ).optional(),
  QopConfiguration: z.object({
    RpcProtection: z.enum([
      "AUTHENTICATION",
      "INTEGRITY",
      "PRIVACY",
      "DISABLED",
    ]).describe("Configuration for RPC Protection.").optional(),
    DataTransferProtection: z.enum([
      "AUTHENTICATION",
      "INTEGRITY",
      "PRIVACY",
      "DISABLED",
    ]).describe("Configuration for Data Transfer Protection.").optional(),
  }).describe(
    "Configuration information for RPC Protection and Data Transfer Protection. These parameters can be set to AUTHENTICATION, INTEGRITY, or PRIVACY. The default value is PRIVACY.",
  ).optional(),
  AuthenticationType: z.enum(["SIMPLE", "KERBEROS"]).describe(
    "The authentication mode used to determine identity of user.",
  ).optional(),
  SimpleUser: z.string().min(1).max(256).regex(
    new RegExp("^[_.A-Za-z0-9][-_.A-Za-z0-9]*$"),
  ).describe(
    "The user name that has read and write permissions on the specified HDFS cluster.",
  ).optional(),
  KerberosPrincipal: z.string().min(1).max(256).regex(new RegExp("^.+$"))
    .describe(
      "The unique identity, or principal, to which Kerberos can assign tickets.",
    ).optional(),
  KerberosKeytab: z.string().max(87384).describe(
    "The Base64 string representation of the Keytab file.",
  ).optional(),
  KerberosKrb5Conf: z.string().max(174764).describe(
    "The string representation of the Krb5Conf file, or the presigned URL to access the Krb5.conf file within an S3 bucket.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
  AgentArns: z.array(
    z.string().max(128).regex(
      new RegExp(
        "^arn:(aws|aws-cn|aws-us-gov|aws-eusc|aws-iso|aws-iso-b):datasync:[a-z\\-0-9]+:[0-9]{12}:agent/agent-[0-9a-z]{17}$",
      ),
    ),
  ).describe("ARN(s) of the agent(s) to use for an HDFS location.").optional(),
  Subdirectory: z.string().max(4096).regex(
    new RegExp("^[a-zA-Z0-9_\\-\\+\\./\\(\\)\\$\\p{Zs}]+$", "u"),
  ).describe(
    "The subdirectory in HDFS that is used to read data from the HDFS source location or write data to the HDFS destination.",
  ).optional(),
  CmkSecretConfig: z.object({
    KmsKeyArn: z.string().max(2048).regex(
      new RegExp(
        "^(arn:(aws|aws-cn|aws-us-gov|aws-eusc|aws-iso|aws-iso-b):kms:[a-z-0-9]+:[0-9]{12}:key/.*|)$",
      ),
    ).describe(
      "Specifies the ARN for the customer-managed AWS KMS key used to encrypt the secret specified for SecretArn. DataSync provides this key to AWS Secrets Manager.",
    ).optional(),
  }).describe(
    "Specifies configuration information for a DataSync-managed secret, such as an authentication token or set of credentials that DataSync uses to access a specific transfer location, and a customer-managed AWS KMS key.",
  ).optional(),
  CustomSecretConfig: z.object({
    SecretAccessRoleArn: z.string().max(2048).regex(
      new RegExp(
        "^(arn:(aws|aws-cn|aws-us-gov|aws-eusc|aws-iso|aws-iso-b):iam::[0-9]{12}:role/.*|)$",
      ),
    ).describe(
      "Specifies the ARN for the AWS Identity and Access Management role that DataSync uses to access the secret specified for SecretArn.",
    ).optional(),
  }).describe(
    "Specifies configuration information for a customer-managed secret, such as an authentication token or set of credentials that DataSync uses to access a specific transfer location, and an IAM role that DataSync can assume and access the customer-managed secret.",
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

/** Swamp extension model for DataSync LocationHDFS. Registered at `@swamp/aws/datasync/location-hdfs`. */
export const model = {
  type: "@swamp/aws/datasync/location-hdfs",
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
      description: "DataSync LocationHDFS resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a DataSync LocationHDFS",
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
          "AWS::DataSync::LocationHDFS",
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
      description: "Get a DataSync LocationHDFS",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DataSync LocationHDFS",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::DataSync::LocationHDFS",
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
      description: "Update a DataSync LocationHDFS",
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
        const identifier = existing.LocationArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::DataSync::LocationHDFS",
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
          "AWS::DataSync::LocationHDFS",
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
      description: "Delete a DataSync LocationHDFS",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DataSync LocationHDFS",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::DataSync::LocationHDFS",
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
      description: "Sync DataSync LocationHDFS state from AWS",
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
        const identifier = existing.LocationArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::DataSync::LocationHDFS",
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
