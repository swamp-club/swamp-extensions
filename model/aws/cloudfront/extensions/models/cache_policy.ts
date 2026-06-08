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

// Auto-generated extension model for @swamp/aws/cloudfront/cache-policy
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for CloudFront CachePolicy (AWS::CloudFront::CachePolicy).
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

const CookiesConfigSchema = z.object({
  CookieBehavior: z.string().regex(
    new RegExp("^(none|whitelist|allExcept|all)$"),
  ).describe(
    "Determines whether any cookies in viewer requests are included in the cache key and in requests that CloudFront sends to the origin. Valid values are: none – No cookies in viewer requests are included in the cache key or in requests that CloudFront sends to the origin. Even when this field is set to none, any cookies that are listed in an OriginRequestPolicy *are* included in origin requests. whitelist – Only the cookies in viewer requests that are listed in the CookieNames type are included in the cache key and in requests that CloudFront sends to the origin. allExcept – All cookies in viewer requests are included in the cache key and in requests that CloudFront sends to the origin, *except* for those that are listed in the CookieNames type, which are not included. all – All cookies in viewer requests are included in the cache key and in requests that CloudFront sends to the origin.",
  ),
  Cookies: z.array(z.string()).describe("Contains a list of cookie names.")
    .optional(),
});

const HeadersConfigSchema = z.object({
  HeaderBehavior: z.string().regex(new RegExp("^(none|whitelist)$")).describe(
    "Determines whether any HTTP headers are included in the cache key and in requests that CloudFront sends to the origin. Valid values are: none – No HTTP headers are included in the cache key or in requests that CloudFront sends to the origin. Even when this field is set to none, any headers that are listed in an OriginRequestPolicy *are* included in origin requests. whitelist – Only the HTTP headers that are listed in the Headers type are included in the cache key and in requests that CloudFront sends to the origin.",
  ),
  Headers: z.array(z.string()).describe("Contains a list of HTTP header names.")
    .optional(),
});

const QueryStringsConfigSchema = z.object({
  QueryStringBehavior: z.string().regex(
    new RegExp("^(none|whitelist|allExcept|all)$"),
  ).describe(
    "Determines whether any URL query strings in viewer requests are included in the cache key and in requests that CloudFront sends to the origin. Valid values are: none – No query strings in viewer requests are included in the cache key or in requests that CloudFront sends to the origin. Even when this field is set to none, any query strings that are listed in an OriginRequestPolicy *are* included in origin requests. whitelist – Only the query strings in viewer requests that are listed in the QueryStringNames type are included in the cache key and in requests that CloudFront sends to the origin. allExcept – All query strings in viewer requests are included in the cache key and in requests that CloudFront sends to the origin, *except* those that are listed in the QueryStringNames type, which are not included. all – All query strings in viewer requests are included in the cache key and in requests that CloudFront sends to the origin.",
  ),
  QueryStrings: z.array(z.string()).describe(
    "Contains a list of query string names.",
  ).optional(),
});

const ParametersInCacheKeyAndForwardedToOriginSchema = z.object({
  CookiesConfig: CookiesConfigSchema.describe(
    "An object that determines whether any cookies in viewer requests (and if so, which cookies) are included in the cache key and in requests that CloudFront sends to the origin.",
  ),
  EnableAcceptEncodingBrotli: z.boolean().describe(
    "A flag that can affect whether the Accept-Encoding HTTP header is included in the cache key and included in requests that CloudFront sends to the origin. This field is related to the EnableAcceptEncodingGzip field. If one or both of these fields is true *and* the viewer request includes the Accept-Encoding header, then CloudFront does the following: Normalizes the value of the viewer's Accept-Encoding header Includes the normalized header in the cache key Includes the normalized header in the request to the origin, if a request is necessary For more information, see [Compression support](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-policy-compressed-objects) in the *Amazon CloudFront Developer Guide*. If you set this value to true, and this cache behavior also has an origin request policy attached, do not include the Accept-Encoding header in the origin request policy. CloudFront always includes the Accept-Encoding header in origin requests when the value of this field is true, so including this header in an origin request policy has no effect. If both of these fields are false, then CloudFront treats the Accept-Encoding header the same as any other HTTP header in the viewer request. By default, it's not included in the cache key and it's not included in origin requests. In this case, you can manually add Accept-Encoding to the headers whitelist like any other HTTP header.",
  ).optional(),
  EnableAcceptEncodingGzip: z.boolean().describe(
    "A flag that can affect whether the Accept-Encoding HTTP header is included in the cache key and included in requests that CloudFront sends to the origin. This field is related to the EnableAcceptEncodingBrotli field. If one or both of these fields is true *and* the viewer request includes the Accept-Encoding header, then CloudFront does the following: Normalizes the value of the viewer's Accept-Encoding header Includes the normalized header in the cache key Includes the normalized header in the request to the origin, if a request is necessary For more information, see [Compression support](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html#cache-policy-compressed-objects) in the *Amazon CloudFront Developer Guide*. If you set this value to true, and this cache behavior also has an origin request policy attached, do not include the Accept-Encoding header in the origin request policy. CloudFront always includes the Accept-Encoding header in origin requests when the value of this field is true, so including this header in an origin request policy has no effect. If both of these fields are false, then CloudFront treats the Accept-Encoding header the same as any other HTTP header in the viewer request. By default, it's not included in the cache key and it's not included in origin requests. In this case, you can manually add Accept-Encoding to the headers whitelist like any other HTTP header.",
  ),
  HeadersConfig: HeadersConfigSchema.describe(
    "An object that determines whether any HTTP headers (and if so, which headers) are included in the cache key and in requests that CloudFront sends to the origin.",
  ),
  QueryStringsConfig: QueryStringsConfigSchema.describe(
    "An object that determines whether any URL query strings in viewer requests (and if so, which query strings) are included in the cache key and in requests that CloudFront sends to the origin.",
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
  CachePolicyConfig: z.object({
    Comment: z.string().describe(
      "A comment to describe the cache policy. The comment cannot be longer than 128 characters.",
    ).optional(),
    DefaultTTL: z.number().min(0).describe(
      "The default amount of time, in seconds, that you want objects to stay in the CloudFront cache before CloudFront sends another request to the origin to see if the object has been updated. CloudFront uses this value as the object's time to live (TTL) only when the origin does *not* send Cache-Control or Expires headers with the object. For more information, see [Managing How Long Content Stays in an Edge Cache (Expiration)](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html) in the *Amazon CloudFront Developer Guide*. The default value for this field is 86400 seconds (one day). If the value of MinTTL is more than 86400 seconds, then the default value for this field is the same as the value of MinTTL.",
    ),
    MaxTTL: z.number().min(0).describe(
      "The maximum amount of time, in seconds, that objects stay in the CloudFront cache before CloudFront sends another request to the origin to see if the object has been updated. CloudFront uses this value only when the origin sends Cache-Control or Expires headers with the object. For more information, see [Managing How Long Content Stays in an Edge Cache (Expiration)](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html) in the *Amazon CloudFront Developer Guide*. The default value for this field is 31536000 seconds (one year). If the value of MinTTL or DefaultTTL is more than 31536000 seconds, then the default value for this field is the same as the value of DefaultTTL.",
    ),
    MinTTL: z.number().min(0).describe(
      "The minimum amount of time, in seconds, that you want objects to stay in the CloudFront cache before CloudFront sends another request to the origin to see if the object has been updated. For more information, see [Managing How Long Content Stays in an Edge Cache (Expiration)](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html) in the *Amazon CloudFront Developer Guide*.",
    ),
    Name: z.string().describe("A unique name to identify the cache policy."),
    ParametersInCacheKeyAndForwardedToOrigin:
      ParametersInCacheKeyAndForwardedToOriginSchema.describe(
        "The HTTP headers, cookies, and URL query strings to include in the cache key. The values included in the cache key are also included in requests that CloudFront sends to the origin.",
      ),
  }).describe("The cache policy configuration."),
});

const StateSchema = z.object({
  CachePolicyConfig: z.object({
    Comment: z.string(),
    DefaultTTL: z.number(),
    MaxTTL: z.number(),
    MinTTL: z.number(),
    Name: z.string(),
    ParametersInCacheKeyAndForwardedToOrigin:
      ParametersInCacheKeyAndForwardedToOriginSchema,
  }).optional(),
  Id: z.string(),
  LastModifiedTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  CachePolicyConfig: z.object({
    Comment: z.string().describe(
      "A comment to describe the cache policy. The comment cannot be longer than 128 characters.",
    ).optional(),
    DefaultTTL: z.number().min(0).describe(
      "The default amount of time, in seconds, that you want objects to stay in the CloudFront cache before CloudFront sends another request to the origin to see if the object has been updated. CloudFront uses this value as the object's time to live (TTL) only when the origin does *not* send Cache-Control or Expires headers with the object. For more information, see [Managing How Long Content Stays in an Edge Cache (Expiration)](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html) in the *Amazon CloudFront Developer Guide*. The default value for this field is 86400 seconds (one day). If the value of MinTTL is more than 86400 seconds, then the default value for this field is the same as the value of MinTTL.",
    ).optional(),
    MaxTTL: z.number().min(0).describe(
      "The maximum amount of time, in seconds, that objects stay in the CloudFront cache before CloudFront sends another request to the origin to see if the object has been updated. CloudFront uses this value only when the origin sends Cache-Control or Expires headers with the object. For more information, see [Managing How Long Content Stays in an Edge Cache (Expiration)](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html) in the *Amazon CloudFront Developer Guide*. The default value for this field is 31536000 seconds (one year). If the value of MinTTL or DefaultTTL is more than 31536000 seconds, then the default value for this field is the same as the value of DefaultTTL.",
    ).optional(),
    MinTTL: z.number().min(0).describe(
      "The minimum amount of time, in seconds, that you want objects to stay in the CloudFront cache before CloudFront sends another request to the origin to see if the object has been updated. For more information, see [Managing How Long Content Stays in an Edge Cache (Expiration)](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html) in the *Amazon CloudFront Developer Guide*.",
    ).optional(),
    Name: z.string().describe("A unique name to identify the cache policy.")
      .optional(),
    ParametersInCacheKeyAndForwardedToOrigin:
      ParametersInCacheKeyAndForwardedToOriginSchema.describe(
        "The HTTP headers, cookies, and URL query strings to include in the cache key. The values included in the cache key are also included in requests that CloudFront sends to the origin.",
      ).optional(),
  }).describe("The cache policy configuration.").optional(),
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

/** Swamp extension model for CloudFront CachePolicy. Registered at `@swamp/aws/cloudfront/cache-policy`. */
export const model = {
  type: "@swamp/aws/cloudfront/cache-policy",
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
      description: "CloudFront CachePolicy resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CloudFront CachePolicy",
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
          "AWS::CloudFront::CachePolicy",
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
      description: "Get a CloudFront CachePolicy",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudFront CachePolicy",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::CloudFront::CachePolicy",
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
      description: "Update a CloudFront CachePolicy",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::CloudFront::CachePolicy",
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
          "AWS::CloudFront::CachePolicy",
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
      description: "Delete a CloudFront CachePolicy",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudFront CachePolicy",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::CloudFront::CachePolicy",
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
      description: "Sync CloudFront CachePolicy state from AWS",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::CloudFront::CachePolicy",
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
