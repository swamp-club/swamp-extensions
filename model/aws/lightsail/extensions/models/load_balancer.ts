// Auto-generated extension model for @swamp/aws/lightsail/load-balancer
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Lightsail LoadBalancer (AWS::Lightsail::LoadBalancer).
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
    "AWS region; overrides AWS_REGION environment variable. Defaults to us-east-1.",
  ).optional(),
  LoadBalancerName: z.string().regex(new RegExp("\\w[\\w\\-]*\\w")).describe(
    "The name of your load balancer.",
  ),
  InstancePort: z.number().int().describe(
    "The instance port where you're creating your load balancer.",
  ),
  IpAddressType: z.string().describe(
    "The IP address type for the load balancer. The possible values are ipv4 for IPv4 only, and dualstack for IPv4 and IPv6. The default value is dualstack.",
  ).optional(),
  AttachedInstances: z.array(z.string()).describe(
    "The names of the instances attached to the load balancer.",
  ).optional(),
  HealthCheckPath: z.string().describe(
    'The path you provided to perform the load balancer health check. If you didn\'t specify a health check path, Lightsail uses the root path of your website (e.g., "/").',
  ).optional(),
  SessionStickinessEnabled: z.boolean().describe(
    "Configuration option to enable session stickiness.",
  ).optional(),
  SessionStickinessLBCookieDurationSeconds: z.string().describe(
    "Configuration option to adjust session stickiness cookie duration parameter.",
  ).optional(),
  TlsPolicyName: z.string().describe(
    "The name of the TLS policy to apply to the load balancer.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  LoadBalancerName: z.string(),
  LoadBalancerArn: z.string().optional(),
  InstancePort: z.number().optional(),
  IpAddressType: z.string().optional(),
  AttachedInstances: z.array(z.string()).optional(),
  HealthCheckPath: z.string().optional(),
  SessionStickinessEnabled: z.boolean().optional(),
  SessionStickinessLBCookieDurationSeconds: z.string().optional(),
  TlsPolicyName: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  LoadBalancerName: z.string().regex(new RegExp("\\w[\\w\\-]*\\w")).describe(
    "The name of your load balancer.",
  ).optional(),
  InstancePort: z.number().int().describe(
    "The instance port where you're creating your load balancer.",
  ).optional(),
  IpAddressType: z.string().describe(
    "The IP address type for the load balancer. The possible values are ipv4 for IPv4 only, and dualstack for IPv4 and IPv6. The default value is dualstack.",
  ).optional(),
  AttachedInstances: z.array(z.string()).describe(
    "The names of the instances attached to the load balancer.",
  ).optional(),
  HealthCheckPath: z.string().describe(
    'The path you provided to perform the load balancer health check. If you didn\'t specify a health check path, Lightsail uses the root path of your website (e.g., "/").',
  ).optional(),
  SessionStickinessEnabled: z.boolean().describe(
    "Configuration option to enable session stickiness.",
  ).optional(),
  SessionStickinessLBCookieDurationSeconds: z.string().describe(
    "Configuration option to adjust session stickiness cookie duration parameter.",
  ).optional(),
  TlsPolicyName: z.string().describe(
    "The name of the TLS policy to apply to the load balancer.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
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

/** Swamp extension model for Lightsail LoadBalancer. Registered at `@swamp/aws/lightsail/load-balancer`. */
export const model = {
  type: "@swamp/aws/lightsail/load-balancer",
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
      description: "Lightsail LoadBalancer resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Lightsail LoadBalancer",
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
          "AWS::Lightsail::LoadBalancer",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.LoadBalancerName ?? g.LoadBalancerName)?.toString() ??
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
      description: "Get a Lightsail LoadBalancer",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Lightsail LoadBalancer",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Lightsail::LoadBalancer",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.LoadBalancerName ?? context.globalArgs.LoadBalancerName)
            ?.toString() ?? args.identifier).replace(/[\/\\]/g, "_").replace(
              /\.\./g,
              "_",
            ).replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a Lightsail LoadBalancer",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.LoadBalancerName?.toString() ?? "current")
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
        const identifier = existing.LoadBalancerName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Lightsail::LoadBalancer",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Lightsail::LoadBalancer",
          identifier,
          currentState,
          desiredState,
          ["LoadBalancerName", "InstancePort", "IpAddressType"],
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
      description: "Delete a Lightsail LoadBalancer",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Lightsail LoadBalancer",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Lightsail::LoadBalancer",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.LoadBalancerName?.toString() ?? args.identifier)
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
      description: "Sync Lightsail LoadBalancer state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.LoadBalancerName?.toString() ?? "current")
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
        const identifier = existing.LoadBalancerName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Lightsail::LoadBalancer",
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
