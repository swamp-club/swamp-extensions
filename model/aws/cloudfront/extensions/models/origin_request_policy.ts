// Auto-generated extension model for @swamp/aws/cloudfront/origin-request-policy
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for CloudFront OriginRequestPolicy (AWS::CloudFront::OriginRequestPolicy).
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
    new RegExp("^(none|whitelist|all|allExcept)$"),
  ).describe(
    "Determines whether cookies in viewer requests are included in requests that CloudFront sends to the origin. Valid values are: none – No cookies in viewer requests are included in requests that CloudFront sends to the origin. Even when this field is set to none, any cookies that are listed in a CachePolicy *are* included in origin requests. whitelist – Only the cookies in viewer requests that are listed in the CookieNames type are included in requests that CloudFront sends to the origin. all – All cookies in viewer requests are included in requests that CloudFront sends to the origin. allExcept – All cookies in viewer requests are included in requests that CloudFront sends to the origin, *except* for those listed in the CookieNames type, which are not included.",
  ),
  Cookies: z.array(z.string()).describe("Contains a list of cookie names.")
    .optional(),
});

const HeadersConfigSchema = z.object({
  HeaderBehavior: z.string().regex(
    new RegExp(
      "^(none|whitelist|allViewer|allViewerAndWhitelistCloudFront|allExcept)$",
    ),
  ).describe(
    "Determines whether any HTTP headers are included in requests that CloudFront sends to the origin. Valid values are: none – No HTTP headers in viewer requests are included in requests that CloudFront sends to the origin. Even when this field is set to none, any headers that are listed in a CachePolicy *are* included in origin requests. whitelist – Only the HTTP headers that are listed in the Headers type are included in requests that CloudFront sends to the origin. allViewer – All HTTP headers in viewer requests are included in requests that CloudFront sends to the origin. allViewerAndWhitelistCloudFront – All HTTP headers in viewer requests and the additional CloudFront headers that are listed in the Headers type are included in requests that CloudFront sends to the origin. The additional headers are added by CloudFront. allExcept – All HTTP headers in viewer requests are included in requests that CloudFront sends to the origin, *except* for those listed in the Headers type, which are not included.",
  ),
  Headers: z.array(z.string()).describe("Contains a list of HTTP header names.")
    .optional(),
});

const QueryStringsConfigSchema = z.object({
  QueryStringBehavior: z.string().regex(
    new RegExp("^(none|whitelist|all|allExcept)$"),
  ).describe(
    "Determines whether any URL query strings in viewer requests are included in requests that CloudFront sends to the origin. Valid values are: none – No query strings in viewer requests are included in requests that CloudFront sends to the origin. Even when this field is set to none, any query strings that are listed in a CachePolicy *are* included in origin requests. whitelist – Only the query strings in viewer requests that are listed in the QueryStringNames type are included in requests that CloudFront sends to the origin. all – All query strings in viewer requests are included in requests that CloudFront sends to the origin. allExcept – All query strings in viewer requests are included in requests that CloudFront sends to the origin, *except* for those listed in the QueryStringNames type, which are not included.",
  ),
  QueryStrings: z.array(z.string()).describe(
    "Contains a list of query string names.",
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
  OriginRequestPolicyConfig: z.object({
    Comment: z.string().describe(
      "A comment to describe the origin request policy. The comment cannot be longer than 128 characters.",
    ).optional(),
    CookiesConfig: CookiesConfigSchema.describe(
      "The cookies from viewer requests to include in origin requests.",
    ),
    HeadersConfig: HeadersConfigSchema.describe(
      "The HTTP headers to include in origin requests. These can include headers from viewer requests and additional headers added by CloudFront.",
    ),
    Name: z.string().describe(
      "A unique name to identify the origin request policy.",
    ),
    QueryStringsConfig: QueryStringsConfigSchema.describe(
      "The URL query strings from viewer requests to include in origin requests.",
    ),
  }).describe("The origin request policy configuration."),
});

const StateSchema = z.object({
  Id: z.string(),
  LastModifiedTime: z.string().optional(),
  OriginRequestPolicyConfig: z.object({
    Comment: z.string(),
    CookiesConfig: CookiesConfigSchema,
    HeadersConfig: HeadersConfigSchema,
    Name: z.string(),
    QueryStringsConfig: QueryStringsConfigSchema,
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  OriginRequestPolicyConfig: z.object({
    Comment: z.string().describe(
      "A comment to describe the origin request policy. The comment cannot be longer than 128 characters.",
    ).optional(),
    CookiesConfig: CookiesConfigSchema.describe(
      "The cookies from viewer requests to include in origin requests.",
    ).optional(),
    HeadersConfig: HeadersConfigSchema.describe(
      "The HTTP headers to include in origin requests. These can include headers from viewer requests and additional headers added by CloudFront.",
    ).optional(),
    Name: z.string().describe(
      "A unique name to identify the origin request policy.",
    ).optional(),
    QueryStringsConfig: QueryStringsConfigSchema.describe(
      "The URL query strings from viewer requests to include in origin requests.",
    ).optional(),
  }).describe("The origin request policy configuration.").optional(),
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

/** Swamp extension model for CloudFront OriginRequestPolicy. Registered at `@swamp/aws/cloudfront/origin-request-policy`. */
export const model = {
  type: "@swamp/aws/cloudfront/origin-request-policy",
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
      description: "CloudFront OriginRequestPolicy resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CloudFront OriginRequestPolicy",
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
          "AWS::CloudFront::OriginRequestPolicy",
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
      description: "Get a CloudFront OriginRequestPolicy",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudFront OriginRequestPolicy",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::CloudFront::OriginRequestPolicy",
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
      description: "Update a CloudFront OriginRequestPolicy",
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
          "AWS::CloudFront::OriginRequestPolicy",
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
          "AWS::CloudFront::OriginRequestPolicy",
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
      description: "Delete a CloudFront OriginRequestPolicy",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudFront OriginRequestPolicy",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::CloudFront::OriginRequestPolicy",
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
      description: "Sync CloudFront OriginRequestPolicy state from AWS",
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
            "AWS::CloudFront::OriginRequestPolicy",
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
