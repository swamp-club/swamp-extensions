// Auto-generated extension model for @swamp/aws/lightsail/distribution
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Lightsail Distribution (AWS::Lightsail::Distribution).
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

const CacheBehaviorPerPathSchema = z.object({
  Behavior: z.string().describe("The cache behavior for the specified path.")
    .optional(),
  Path: z.string().describe(
    "The path to a directory or file to cached, or not cache. Use an asterisk symbol to specify wildcard directories (path/to/assets/*), and file types (*.html, *jpg, *js). Directories and file paths are case-sensitive.",
  ).optional(),
});

const CookieObjectSchema = z.object({
  CookiesAllowList: z.array(z.string()).describe(
    "The specific cookies to forward to your distribution's origin.",
  ).optional(),
  Option: z.string().describe(
    "Specifies which cookies to forward to the distribution's origin for a cache behavior: all, none, or allow-list to forward only the cookies specified in the cookiesAllowList parameter.",
  ).optional(),
});

const HeaderObjectSchema = z.object({
  HeadersAllowList: z.array(z.string()).describe(
    "The specific headers to forward to your distribution's origin.",
  ).optional(),
  Option: z.string().describe(
    "The headers that you want your distribution to forward to your origin and base caching on.",
  ).optional(),
});

const QueryStringObjectSchema = z.object({
  QueryStringsAllowList: z.array(z.string()).describe(
    "The specific query strings that the distribution forwards to the origin.",
  ).optional(),
  Option: z.boolean().describe(
    "Indicates whether the distribution forwards and caches based on query strings.",
  ).optional(),
});

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
  DistributionName: z.string().regex(new RegExp("\\w[\\w\\-]*\\w")).describe(
    "The name for the distribution.",
  ),
  BundleId: z.string().describe("The bundle ID to use for the distribution."),
  IpAddressType: z.string().describe(
    "The IP address type for the distribution.",
  ).optional(),
  CacheBehaviors: z.array(CacheBehaviorPerPathSchema).describe(
    "An array of objects that describe the per-path cache behavior for the distribution.",
  ).optional(),
  CacheBehaviorSettings: z.object({
    AllowedHTTPMethods: z.string().describe(
      "The HTTP methods that are processed and forwarded to the distribution's origin.",
    ).optional(),
    CachedHTTPMethods: z.string().describe(
      "The HTTP method responses that are cached by your distribution.",
    ).optional(),
    DefaultTTL: z.number().int().describe(
      "The default amount of time that objects stay in the distribution's cache before the distribution forwards another request to the origin to determine whether the content has been updated.",
    ).optional(),
    MaximumTTL: z.number().int().describe(
      "The maximum amount of time that objects stay in the distribution's cache before the distribution forwards another request to the origin to determine whether the object has been updated.",
    ).optional(),
    MinimumTTL: z.number().int().describe(
      "The minimum amount of time that objects stay in the distribution's cache before the distribution forwards another request to the origin to determine whether the object has been updated.",
    ).optional(),
    ForwardedCookies: CookieObjectSchema.describe(
      "An object that describes the cookies that are forwarded to the origin. Your content is cached based on the cookies that are forwarded.",
    ).optional(),
    ForwardedHeaders: HeaderObjectSchema.describe(
      "An object that describes the headers that are forwarded to the origin. Your content is cached based on the headers that are forwarded.",
    ).optional(),
    ForwardedQueryStrings: QueryStringObjectSchema.describe(
      "An object that describes the query strings that are forwarded to the origin. Your content is cached based on the query strings that are forwarded.",
    ).optional(),
  }).describe(
    "An object that describes the cache behavior settings for the distribution.",
  ).optional(),
  DefaultCacheBehavior: z.object({
    Behavior: z.string().describe("The cache behavior of the distribution.")
      .optional(),
  }).describe(
    "An object that describes the default cache behavior for the distribution.",
  ),
  Origin: z.object({
    Name: z.string().describe("The name of the origin resource.").optional(),
    ProtocolPolicy: z.string().describe(
      "The protocol that your Amazon Lightsail distribution uses when establishing a connection with your origin to pull content.",
    ).optional(),
    RegionName: z.string().describe(
      "The AWS Region name of the origin resource.",
    ).optional(),
  }).describe(
    "An object that describes the origin resource for the distribution, such as a Lightsail instance or load balancer.",
  ),
  IsEnabled: z.boolean().describe(
    "Indicates whether the distribution is enabled.",
  ).optional(),
  CertificateName: z.string().describe(
    "The certificate attached to the Distribution.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  DistributionName: z.string(),
  DistributionArn: z.string().optional(),
  BundleId: z.string().optional(),
  IpAddressType: z.string().optional(),
  CacheBehaviors: z.array(CacheBehaviorPerPathSchema).optional(),
  CacheBehaviorSettings: z.object({
    AllowedHTTPMethods: z.string(),
    CachedHTTPMethods: z.string(),
    DefaultTTL: z.number(),
    MaximumTTL: z.number(),
    MinimumTTL: z.number(),
    ForwardedCookies: CookieObjectSchema,
    ForwardedHeaders: HeaderObjectSchema,
    ForwardedQueryStrings: QueryStringObjectSchema,
  }).optional(),
  DefaultCacheBehavior: z.object({
    Behavior: z.string(),
  }).optional(),
  Origin: z.object({
    Name: z.string(),
    ProtocolPolicy: z.string(),
    RegionName: z.string(),
  }).optional(),
  Status: z.string().optional(),
  AbleToUpdateBundle: z.boolean().optional(),
  IsEnabled: z.boolean().optional(),
  CertificateName: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  DistributionName: z.string().regex(new RegExp("\\w[\\w\\-]*\\w")).describe(
    "The name for the distribution.",
  ).optional(),
  BundleId: z.string().describe("The bundle ID to use for the distribution.")
    .optional(),
  IpAddressType: z.string().describe(
    "The IP address type for the distribution.",
  ).optional(),
  CacheBehaviors: z.array(CacheBehaviorPerPathSchema).describe(
    "An array of objects that describe the per-path cache behavior for the distribution.",
  ).optional(),
  CacheBehaviorSettings: z.object({
    AllowedHTTPMethods: z.string().describe(
      "The HTTP methods that are processed and forwarded to the distribution's origin.",
    ).optional(),
    CachedHTTPMethods: z.string().describe(
      "The HTTP method responses that are cached by your distribution.",
    ).optional(),
    DefaultTTL: z.number().int().describe(
      "The default amount of time that objects stay in the distribution's cache before the distribution forwards another request to the origin to determine whether the content has been updated.",
    ).optional(),
    MaximumTTL: z.number().int().describe(
      "The maximum amount of time that objects stay in the distribution's cache before the distribution forwards another request to the origin to determine whether the object has been updated.",
    ).optional(),
    MinimumTTL: z.number().int().describe(
      "The minimum amount of time that objects stay in the distribution's cache before the distribution forwards another request to the origin to determine whether the object has been updated.",
    ).optional(),
    ForwardedCookies: CookieObjectSchema.describe(
      "An object that describes the cookies that are forwarded to the origin. Your content is cached based on the cookies that are forwarded.",
    ).optional(),
    ForwardedHeaders: HeaderObjectSchema.describe(
      "An object that describes the headers that are forwarded to the origin. Your content is cached based on the headers that are forwarded.",
    ).optional(),
    ForwardedQueryStrings: QueryStringObjectSchema.describe(
      "An object that describes the query strings that are forwarded to the origin. Your content is cached based on the query strings that are forwarded.",
    ).optional(),
  }).describe(
    "An object that describes the cache behavior settings for the distribution.",
  ).optional(),
  DefaultCacheBehavior: z.object({
    Behavior: z.string().describe("The cache behavior of the distribution.")
      .optional(),
  }).describe(
    "An object that describes the default cache behavior for the distribution.",
  ).optional(),
  Origin: z.object({
    Name: z.string().describe("The name of the origin resource.").optional(),
    ProtocolPolicy: z.string().describe(
      "The protocol that your Amazon Lightsail distribution uses when establishing a connection with your origin to pull content.",
    ).optional(),
    RegionName: z.string().describe(
      "The AWS Region name of the origin resource.",
    ).optional(),
  }).describe(
    "An object that describes the origin resource for the distribution, such as a Lightsail instance or load balancer.",
  ).optional(),
  IsEnabled: z.boolean().describe(
    "Indicates whether the distribution is enabled.",
  ).optional(),
  CertificateName: z.string().describe(
    "The certificate attached to the Distribution.",
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

/** Swamp extension model for Lightsail Distribution. Registered at `@swamp/aws/lightsail/distribution`. */
export const model = {
  type: "@swamp/aws/lightsail/distribution",
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
      description: "Lightsail Distribution resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Lightsail Distribution",
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
          "AWS::Lightsail::Distribution",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.DistributionName ?? g.DistributionName)?.toString() ??
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
      description: "Get a Lightsail Distribution",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Lightsail Distribution",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Lightsail::Distribution",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.DistributionName ?? context.globalArgs.DistributionName)
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
      description: "Update a Lightsail Distribution",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.DistributionName?.toString() ?? "current")
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
        const identifier = existing.DistributionName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Lightsail::Distribution",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Lightsail::Distribution",
          identifier,
          currentState,
          desiredState,
          ["DistributionName", "IpAddressType"],
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
      description: "Delete a Lightsail Distribution",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Lightsail Distribution",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Lightsail::Distribution",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.DistributionName?.toString() ?? args.identifier)
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
      description: "Sync Lightsail Distribution state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.DistributionName?.toString() ?? "current")
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
        const identifier = existing.DistributionName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Lightsail::Distribution",
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
