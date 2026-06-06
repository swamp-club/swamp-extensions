// Auto-generated extension model for @swamp/aws/rds/dbproxy
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for RDS DBProxy (AWS::RDS::DBProxy).
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

const AuthFormatSchema = z.object({
  AuthScheme: z.enum(["SECRETS"]).describe(
    "The type of authentication that the proxy uses for connections from the proxy to the underlying database.",
  ).optional(),
  Description: z.string().describe(
    "A user-specified description about the authentication used by a proxy to log in as a specific database user.",
  ).optional(),
  IAMAuth: z.enum(["DISABLED", "REQUIRED", "ENABLED"]).describe(
    "Whether to require or disallow Amazon Web Services Identity and Access Management (IAM) authentication for connections to the proxy. The ENABLED value is valid only for proxies with RDS for Microsoft SQL Server.",
  ).optional(),
  SecretArn: z.string().describe(
    "The Amazon Resource Name (ARN) representing the secret that the proxy uses to authenticate to the RDS DB instance or Aurora DB cluster. These secrets are stored within Amazon Secrets Manager.",
  ).optional(),
  ClientPasswordAuthType: z.enum([
    "MYSQL_NATIVE_PASSWORD",
    "MYSQL_CACHING_SHA2_PASSWORD",
    "POSTGRES_SCRAM_SHA_256",
    "POSTGRES_MD5",
    "SQL_SERVER_AUTHENTICATION",
  ]).describe(
    "The type of authentication the proxy uses for connections from clients.",
  ).optional(),
});

const TagFormatSchema = z.object({
  Key: z.string().max(128).regex(new RegExp("(\\w|\\d|\\s|\\\\|-|\\.:=+-)*"))
    .optional(),
  Value: z.string().max(128).regex(new RegExp("(\\w|\\d|\\s|\\\\|-|\\.:=+-)*"))
    .optional(),
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
    "AWS region; overrides AWS_REGION environment variable. Defaults to us-east-1.",
  ).optional(),
  Auth: z.array(AuthFormatSchema).describe(
    "The authorization mechanism that the proxy uses.",
  ).optional(),
  DBProxyName: z.string().max(64).regex(new RegExp("[0-z]*")).describe(
    "The identifier for the proxy. This name must be unique for all proxies owned by your AWS account in the specified AWS Region.",
  ),
  DebugLogging: z.boolean().describe(
    "Whether the proxy includes detailed information about SQL statements in its logs.",
  ).optional(),
  DefaultAuthScheme: z.enum(["IAM_AUTH", "NONE"]).describe(
    "The default authentication scheme that the proxy uses for client connections to the proxy and connections from the proxy to the underlying database.",
  ).optional(),
  EndpointNetworkType: z.enum(["IPV4", "IPV6", "DUAL"]).describe(
    "The network type of the DB proxy endpoint. The network type determines the IP version that the proxy endpoint supports.",
  ).optional(),
  EngineFamily: z.enum(["MYSQL", "POSTGRESQL", "SQLSERVER"]).describe(
    "The kinds of databases that the proxy can connect to.",
  ),
  IdleClientTimeout: z.number().int().describe(
    "The number of seconds that a connection to the proxy can be inactive before the proxy disconnects it.",
  ).optional(),
  RequireTLS: z.boolean().describe(
    "A Boolean parameter that specifies whether Transport Layer Security (TLS) encryption is required for connections to the proxy.",
  ).optional(),
  RoleArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the IAM role that the proxy uses to access secrets in AWS Secrets Manager.",
  ),
  Tags: z.array(TagFormatSchema).describe(
    "An optional set of key-value pairs to associate arbitrary data of your choosing with the proxy.",
  ).optional(),
  TargetConnectionNetworkType: z.enum(["IPV4", "IPV6"]).describe(
    "The network type that the proxy uses to connect to the target database. The network type determines the IP version that the proxy uses for connections to the database.",
  ).optional(),
  VpcSecurityGroupIds: z.array(z.string()).describe(
    "VPC security group IDs to associate with the new proxy.",
  ).optional(),
  VpcSubnetIds: z.array(z.string()).describe(
    "VPC subnet IDs to associate with the new proxy.",
  ),
});

const StateSchema = z.object({
  Auth: z.array(AuthFormatSchema).optional(),
  DBProxyArn: z.string().optional(),
  DBProxyName: z.string(),
  DebugLogging: z.boolean().optional(),
  DefaultAuthScheme: z.string().optional(),
  Endpoint: z.string().optional(),
  EndpointNetworkType: z.string().optional(),
  EngineFamily: z.string().optional(),
  IdleClientTimeout: z.number().optional(),
  RequireTLS: z.boolean().optional(),
  RoleArn: z.string().optional(),
  Tags: z.array(TagFormatSchema).optional(),
  TargetConnectionNetworkType: z.string().optional(),
  VpcId: z.string().optional(),
  VpcSecurityGroupIds: z.array(z.string()).optional(),
  VpcSubnetIds: z.array(z.string()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Auth: z.array(AuthFormatSchema).describe(
    "The authorization mechanism that the proxy uses.",
  ).optional(),
  DBProxyName: z.string().max(64).regex(new RegExp("[0-z]*")).describe(
    "The identifier for the proxy. This name must be unique for all proxies owned by your AWS account in the specified AWS Region.",
  ).optional(),
  DebugLogging: z.boolean().describe(
    "Whether the proxy includes detailed information about SQL statements in its logs.",
  ).optional(),
  DefaultAuthScheme: z.enum(["IAM_AUTH", "NONE"]).describe(
    "The default authentication scheme that the proxy uses for client connections to the proxy and connections from the proxy to the underlying database.",
  ).optional(),
  EndpointNetworkType: z.enum(["IPV4", "IPV6", "DUAL"]).describe(
    "The network type of the DB proxy endpoint. The network type determines the IP version that the proxy endpoint supports.",
  ).optional(),
  EngineFamily: z.enum(["MYSQL", "POSTGRESQL", "SQLSERVER"]).describe(
    "The kinds of databases that the proxy can connect to.",
  ).optional(),
  IdleClientTimeout: z.number().int().describe(
    "The number of seconds that a connection to the proxy can be inactive before the proxy disconnects it.",
  ).optional(),
  RequireTLS: z.boolean().describe(
    "A Boolean parameter that specifies whether Transport Layer Security (TLS) encryption is required for connections to the proxy.",
  ).optional(),
  RoleArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the IAM role that the proxy uses to access secrets in AWS Secrets Manager.",
  ).optional(),
  Tags: z.array(TagFormatSchema).describe(
    "An optional set of key-value pairs to associate arbitrary data of your choosing with the proxy.",
  ).optional(),
  TargetConnectionNetworkType: z.enum(["IPV4", "IPV6"]).describe(
    "The network type that the proxy uses to connect to the target database. The network type determines the IP version that the proxy uses for connections to the database.",
  ).optional(),
  VpcSecurityGroupIds: z.array(z.string()).describe(
    "VPC security group IDs to associate with the new proxy.",
  ).optional(),
  VpcSubnetIds: z.array(z.string()).describe(
    "VPC subnet IDs to associate with the new proxy.",
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

/** Swamp extension model for RDS DBProxy. Registered at `@swamp/aws/rds/dbproxy`. */
export const model = {
  type: "@swamp/aws/rds/dbproxy",
  version: "2026.06.06.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "RDS DBProxy resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a RDS DBProxy",
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
          "AWS::RDS::DBProxy",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.DBProxyName ?? g.DBProxyName)?.toString() ?? "current")
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
      description: "Get a RDS DBProxy",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the RDS DBProxy",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::RDS::DBProxy",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.DBProxyName ?? context.globalArgs.DBProxyName)?.toString() ??
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
      description: "Update a RDS DBProxy",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.DBProxyName?.toString() ?? "current").replace(
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
        const identifier = existing.DBProxyName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::RDS::DBProxy",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::RDS::DBProxy",
          identifier,
          currentState,
          desiredState,
          [
            "DBProxyName",
            "EngineFamily",
            "EndpointNetworkType",
            "TargetConnectionNetworkType",
            "VpcSubnetIds",
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
      description: "Delete a RDS DBProxy",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the RDS DBProxy",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::RDS::DBProxy",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.DBProxyName?.toString() ?? args.identifier)
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
      description: "Sync RDS DBProxy state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.DBProxyName?.toString() ?? "current").replace(
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
        const identifier = existing.DBProxyName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::RDS::DBProxy",
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
