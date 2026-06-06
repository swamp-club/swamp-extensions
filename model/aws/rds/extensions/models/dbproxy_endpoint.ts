// Auto-generated extension model for @swamp/aws/rds/dbproxy-endpoint
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for RDS DBProxyEndpoint (AWS::RDS::DBProxyEndpoint).
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
  DBProxyEndpointName: z.string().max(64).regex(new RegExp("[0-z]*")).describe(
    "The identifier for the DB proxy endpoint. This name must be unique for all DB proxy endpoints owned by your AWS account in the specified AWS Region.",
  ),
  DBProxyName: z.string().max(64).regex(new RegExp("[0-z]*")).describe(
    "The identifier for the proxy. This name must be unique for all proxies owned by your AWS account in the specified AWS Region.",
  ),
  VpcSecurityGroupIds: z.array(z.string()).describe(
    "VPC security group IDs to associate with the new DB proxy endpoint.",
  ).optional(),
  VpcSubnetIds: z.array(z.string()).describe(
    "VPC subnet IDs to associate with the new DB proxy endpoint.",
  ),
  EndpointNetworkType: z.enum(["IPV4", "IPV6", "DUAL"]).describe(
    "The network type of the DB proxy endpoint. The network type determines the IP version that the proxy endpoint supports.",
  ).optional(),
  TargetRole: z.enum(["READ_WRITE", "READ_ONLY"]).describe(
    "A value that indicates whether the DB proxy endpoint can be used for read/write or read-only operations.",
  ).optional(),
  Tags: z.array(TagFormatSchema).describe(
    "An optional set of key-value pairs to associate arbitrary data of your choosing with the DB proxy endpoint.",
  ).optional(),
});

const StateSchema = z.object({
  DBProxyEndpointName: z.string(),
  DBProxyEndpointArn: z.string().optional(),
  DBProxyName: z.string().optional(),
  VpcId: z.string().optional(),
  VpcSecurityGroupIds: z.array(z.string()).optional(),
  VpcSubnetIds: z.array(z.string()).optional(),
  Endpoint: z.string().optional(),
  EndpointNetworkType: z.string().optional(),
  TargetRole: z.string().optional(),
  IsDefault: z.boolean().optional(),
  Tags: z.array(TagFormatSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  DBProxyEndpointName: z.string().max(64).regex(new RegExp("[0-z]*")).describe(
    "The identifier for the DB proxy endpoint. This name must be unique for all DB proxy endpoints owned by your AWS account in the specified AWS Region.",
  ).optional(),
  DBProxyName: z.string().max(64).regex(new RegExp("[0-z]*")).describe(
    "The identifier for the proxy. This name must be unique for all proxies owned by your AWS account in the specified AWS Region.",
  ).optional(),
  VpcSecurityGroupIds: z.array(z.string()).describe(
    "VPC security group IDs to associate with the new DB proxy endpoint.",
  ).optional(),
  VpcSubnetIds: z.array(z.string()).describe(
    "VPC subnet IDs to associate with the new DB proxy endpoint.",
  ).optional(),
  EndpointNetworkType: z.enum(["IPV4", "IPV6", "DUAL"]).describe(
    "The network type of the DB proxy endpoint. The network type determines the IP version that the proxy endpoint supports.",
  ).optional(),
  TargetRole: z.enum(["READ_WRITE", "READ_ONLY"]).describe(
    "A value that indicates whether the DB proxy endpoint can be used for read/write or read-only operations.",
  ).optional(),
  Tags: z.array(TagFormatSchema).describe(
    "An optional set of key-value pairs to associate arbitrary data of your choosing with the DB proxy endpoint.",
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

/** Swamp extension model for RDS DBProxyEndpoint. Registered at `@swamp/aws/rds/dbproxy-endpoint`. */
export const model = {
  type: "@swamp/aws/rds/dbproxy-endpoint",
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
      description: "RDS DBProxyEndpoint resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a RDS DBProxyEndpoint",
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
          "AWS::RDS::DBProxyEndpoint",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.DBProxyEndpointName ?? g.DBProxyEndpointName)?.toString() ??
            "current").replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(
              /\0/g,
              "",
            );
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a RDS DBProxyEndpoint",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the RDS DBProxyEndpoint",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::RDS::DBProxyEndpoint",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName = ((result.DBProxyEndpointName ??
          context.globalArgs.DBProxyEndpointName)?.toString() ??
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
      description: "Update a RDS DBProxyEndpoint",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.DBProxyEndpointName?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.DBProxyEndpointName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::RDS::DBProxyEndpoint",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::RDS::DBProxyEndpoint",
          identifier,
          currentState,
          desiredState,
          [
            "DBProxyName",
            "DBProxyEndpointName",
            "EndpointNetworkType",
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
      description: "Delete a RDS DBProxyEndpoint",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the RDS DBProxyEndpoint",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::RDS::DBProxyEndpoint",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.DBProxyEndpointName?.toString() ??
            args.identifier).replace(/[\/\\]/g, "_").replace(/\.\./g, "_")
            .replace(/\0/g, "");
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
      description: "Sync RDS DBProxyEndpoint state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.DBProxyEndpointName?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.DBProxyEndpointName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::RDS::DBProxyEndpoint",
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
