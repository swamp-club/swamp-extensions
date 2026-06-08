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

// Auto-generated extension model for @swamp/aws/cloudfront/response-headers-policy
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for CloudFront ResponseHeadersPolicy (AWS::CloudFront::ResponseHeadersPolicy).
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

const AccessControlAllowHeadersSchema = z.object({
  Items: z.array(z.string()).describe(
    "The list of HTTP header names. You can specify * to allow all headers.",
  ),
});

const AccessControlAllowMethodsSchema = z.object({
  Items: z.array(z.string()).describe(
    "The list of HTTP methods. Valid values are: GET DELETE HEAD OPTIONS PATCH POST PUT ALL ALL is a special value that includes all of the listed HTTP methods.",
  ),
});

const AccessControlAllowOriginsSchema = z.object({
  Items: z.array(z.string()).describe(
    "The list of origins (domain names). You can specify * to allow all origins.",
  ),
});

const AccessControlExposeHeadersSchema = z.object({
  Items: z.array(z.string()).describe(
    "The list of HTTP headers. You can specify * to expose all headers.",
  ),
});

const CorsConfigSchema = z.object({
  AccessControlAllowCredentials: z.boolean().describe(
    "A Boolean that CloudFront uses as the value for the Access-Control-Allow-Credentials HTTP response header. For more information about the Access-Control-Allow-Credentials HTTP response header, see [Access-Control-Allow-Credentials](https://docs.aws.amazon.com/https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials) in the MDN Web Docs.",
  ),
  AccessControlAllowHeaders: AccessControlAllowHeadersSchema.describe(
    "A list of HTTP header names that CloudFront includes as values for the Access-Control-Allow-Headers HTTP response header. For more information about the Access-Control-Allow-Headers HTTP response header, see [Access-Control-Allow-Headers](https://docs.aws.amazon.com/https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers) in the MDN Web Docs.",
  ),
  AccessControlAllowMethods: AccessControlAllowMethodsSchema.describe(
    "A list of HTTP methods that CloudFront includes as values for the Access-Control-Allow-Methods HTTP response header. For more information about the Access-Control-Allow-Methods HTTP response header, see [Access-Control-Allow-Methods](https://docs.aws.amazon.com/https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Methods) in the MDN Web Docs.",
  ),
  AccessControlAllowOrigins: AccessControlAllowOriginsSchema.describe(
    "A list of origins (domain names) that CloudFront can use as the value for the Access-Control-Allow-Origin HTTP response header. For more information about the Access-Control-Allow-Origin HTTP response header, see [Access-Control-Allow-Origin](https://docs.aws.amazon.com/https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin) in the MDN Web Docs.",
  ),
  AccessControlExposeHeaders: AccessControlExposeHeadersSchema.describe(
    "A list of HTTP headers that CloudFront includes as values for the Access-Control-Expose-Headers HTTP response header. For more information about the Access-Control-Expose-Headers HTTP response header, see [Access-Control-Expose-Headers](https://docs.aws.amazon.com/https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Expose-Headers) in the MDN Web Docs.",
  ).optional(),
  AccessControlMaxAgeSec: z.number().int().describe(
    "A number that CloudFront uses as the value for the Access-Control-Max-Age HTTP response header. For more information about the Access-Control-Max-Age HTTP response header, see [Access-Control-Max-Age](https://docs.aws.amazon.com/https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Max-Age) in the MDN Web Docs.",
  ).optional(),
  OriginOverride: z.boolean().describe(
    "A Boolean that determines whether CloudFront overrides HTTP response headers received from the origin with the ones specified in this response headers policy.",
  ),
});

const CustomHeaderSchema = z.object({
  Header: z.string().describe("The HTTP response header name."),
  Override: z.boolean().describe(
    "A Boolean that determines whether CloudFront overrides a response header with the same name received from the origin with the header specified here.",
  ),
  Value: z.string().describe("The value for the HTTP response header."),
});

const CustomHeadersConfigSchema = z.object({
  Items: z.array(CustomHeaderSchema).describe(
    "The list of HTTP response headers and their values.",
  ),
});

const RemoveHeaderSchema = z.object({
  Header: z.string().describe("The HTTP header name."),
});

const RemoveHeadersConfigSchema = z.object({
  Items: z.array(RemoveHeaderSchema).describe("The list of HTTP header names."),
});

const ContentSecurityPolicySchema = z.object({
  ContentSecurityPolicy: z.string().describe(
    "The policy directives and their values that CloudFront includes as values for the Content-Security-Policy HTTP response header. For more information about the Content-Security-Policy HTTP response header, see [Content-Security-Policy](https://docs.aws.amazon.com/https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) in the MDN Web Docs.",
  ),
  Override: z.boolean().describe(
    "A Boolean that determines whether CloudFront overrides the Content-Security-Policy HTTP response header received from the origin with the one specified in this response headers policy.",
  ),
});

const ContentTypeOptionsSchema = z.object({
  Override: z.boolean().describe(
    "A Boolean that determines whether CloudFront overrides the X-Content-Type-Options HTTP response header received from the origin with the one specified in this response headers policy.",
  ),
});

const FrameOptionsSchema = z.object({
  FrameOption: z.string().regex(new RegExp("^(DENY|SAMEORIGIN)$")).describe(
    "The value of the X-Frame-Options HTTP response header. Valid values are DENY and SAMEORIGIN. For more information about these values, see [X-Frame-Options](https://docs.aws.amazon.com/https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options) in the MDN Web Docs.",
  ),
  Override: z.boolean().describe(
    "A Boolean that determines whether CloudFront overrides the X-Frame-Options HTTP response header received from the origin with the one specified in this response headers policy.",
  ),
});

const ReferrerPolicySchema = z.object({
  Override: z.boolean().describe(
    "A Boolean that determines whether CloudFront overrides the Referrer-Policy HTTP response header received from the origin with the one specified in this response headers policy.",
  ),
  ReferrerPolicy: z.string().regex(
    new RegExp(
      "^(no-referrer|no-referrer-when-downgrade|origin|origin-when-cross-origin|same-origin|strict-origin|strict-origin-when-cross-origin|unsafe-url)$",
    ),
  ).describe(
    "Determines whether CloudFront includes the Referrer-Policy HTTP response header and the header's value. For more information about the Referrer-Policy HTTP response header, see [Referrer-Policy](https://docs.aws.amazon.com/https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy) in the MDN Web Docs.",
  ),
});

const StrictTransportSecuritySchema = z.object({
  AccessControlMaxAgeSec: z.number().int().describe(
    "A number that CloudFront uses as the value for the max-age directive in the Strict-Transport-Security HTTP response header.",
  ),
  IncludeSubdomains: z.boolean().describe(
    "A Boolean that determines whether CloudFront includes the includeSubDomains directive in the Strict-Transport-Security HTTP response header.",
  ).optional(),
  Override: z.boolean().describe(
    "A Boolean that determines whether CloudFront overrides the Strict-Transport-Security HTTP response header received from the origin with the one specified in this response headers policy.",
  ),
  Preload: z.boolean().describe(
    "A Boolean that determines whether CloudFront includes the preload directive in the Strict-Transport-Security HTTP response header.",
  ).optional(),
});

const XSSProtectionSchema = z.object({
  ModeBlock: z.boolean().describe(
    "A Boolean that determines whether CloudFront includes the mode=block directive in the X-XSS-Protection header. For more information about this directive, see [X-XSS-Protection](https://docs.aws.amazon.com/https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection) in the MDN Web Docs.",
  ).optional(),
  Override: z.boolean().describe(
    "A Boolean that determines whether CloudFront overrides the X-XSS-Protection HTTP response header received from the origin with the one specified in this response headers policy.",
  ),
  Protection: z.boolean().describe(
    "A Boolean that determines the value of the X-XSS-Protection HTTP response header. When this setting is true, the value of the X-XSS-Protection header is 1. When this setting is false, the value of the X-XSS-Protection header is 0. For more information about these settings, see [X-XSS-Protection](https://docs.aws.amazon.com/https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection) in the MDN Web Docs.",
  ),
  ReportUri: z.string().describe(
    "A reporting URI, which CloudFront uses as the value of the report directive in the X-XSS-Protection header. You cannot specify a ReportUri when ModeBlock is true. For more information about using a reporting URL, see [X-XSS-Protection](https://docs.aws.amazon.com/https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection) in the MDN Web Docs.",
  ).optional(),
});

const SecurityHeadersConfigSchema = z.object({
  ContentSecurityPolicy: ContentSecurityPolicySchema.describe(
    "The policy directives and their values that CloudFront includes as values for the Content-Security-Policy HTTP response header. For more information about the Content-Security-Policy HTTP response header, see [Content-Security-Policy](https://docs.aws.amazon.com/https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) in the MDN Web Docs.",
  ).optional(),
  ContentTypeOptions: ContentTypeOptionsSchema.describe(
    "Determines whether CloudFront includes the X-Content-Type-Options HTTP response header with its value set to nosniff. For more information about the X-Content-Type-Options HTTP response header, see [X-Content-Type-Options](https://docs.aws.amazon.com/https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options) in the MDN Web Docs.",
  ).optional(),
  FrameOptions: FrameOptionsSchema.describe(
    "Determines whether CloudFront includes the X-Frame-Options HTTP response header and the header's value. For more information about the X-Frame-Options HTTP response header, see [X-Frame-Options](https://docs.aws.amazon.com/https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options) in the MDN Web Docs.",
  ).optional(),
  ReferrerPolicy: ReferrerPolicySchema.describe(
    "Determines whether CloudFront includes the Referrer-Policy HTTP response header and the header's value. For more information about the Referrer-Policy HTTP response header, see [Referrer-Policy](https://docs.aws.amazon.com/https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy) in the MDN Web Docs.",
  ).optional(),
  StrictTransportSecurity: StrictTransportSecuritySchema.describe(
    "Determines whether CloudFront includes the Strict-Transport-Security HTTP response header and the header's value. For more information about the Strict-Transport-Security HTTP response header, see [Security headers](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/understanding-response-headers-policies.html#understanding-response-headers-policies-security) in the *Amazon CloudFront Developer Guide* and [Strict-Transport-Security](https://docs.aws.amazon.com/https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security) in the MDN Web Docs.",
  ).optional(),
  XSSProtection: XSSProtectionSchema.describe(
    "Determines whether CloudFront includes the X-XSS-Protection HTTP response header and the header's value. For more information about the X-XSS-Protection HTTP response header, see [X-XSS-Protection](https://docs.aws.amazon.com/https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection) in the MDN Web Docs.",
  ).optional(),
});

const ServerTimingHeadersConfigSchema = z.object({
  Enabled: z.boolean().describe(
    "A Boolean that determines whether CloudFront adds the Server-Timing header to HTTP responses that it sends in response to requests that match a cache behavior that's associated with this response headers policy.",
  ),
  SamplingRate: z.number().min(0).max(100).describe(
    "A number 0–100 (inclusive) that specifies the percentage of responses that you want CloudFront to add the Server-Timing header to. When you set the sampling rate to 100, CloudFront adds the Server-Timing header to the HTTP response for every request that matches the cache behavior that this response headers policy is attached to. When you set it to 50, CloudFront adds the header to 50% of the responses for requests that match the cache behavior. You can set the sampling rate to any number 0–100 with up to four decimal places.",
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
  ResponseHeadersPolicyConfig: z.object({
    Comment: z.string().describe(
      "A comment to describe the response headers policy. The comment cannot be longer than 128 characters.",
    ).optional(),
    CorsConfig: CorsConfigSchema.describe(
      "A configuration for a set of HTTP response headers that are used for cross-origin resource sharing (CORS).",
    ).optional(),
    CustomHeadersConfig: CustomHeadersConfigSchema.describe(
      "A configuration for a set of custom HTTP response headers.",
    ).optional(),
    Name: z.string().describe(
      "A name to identify the response headers policy. The name must be unique for response headers policies in this AWS-account.",
    ),
    RemoveHeadersConfig: RemoveHeadersConfigSchema.describe(
      "A configuration for a set of HTTP headers to remove from the HTTP response.",
    ).optional(),
    SecurityHeadersConfig: SecurityHeadersConfigSchema.describe(
      "A configuration for a set of security-related HTTP response headers.",
    ).optional(),
    ServerTimingHeadersConfig: ServerTimingHeadersConfigSchema.describe(
      "A configuration for enabling the Server-Timing header in HTTP responses sent from CloudFront.",
    ).optional(),
  }).describe("A response headers policy configuration."),
});

const StateSchema = z.object({
  Id: z.string(),
  LastModifiedTime: z.string().optional(),
  ResponseHeadersPolicyConfig: z.object({
    Comment: z.string(),
    CorsConfig: CorsConfigSchema,
    CustomHeadersConfig: CustomHeadersConfigSchema,
    Name: z.string(),
    RemoveHeadersConfig: RemoveHeadersConfigSchema,
    SecurityHeadersConfig: SecurityHeadersConfigSchema,
    ServerTimingHeadersConfig: ServerTimingHeadersConfigSchema,
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  ResponseHeadersPolicyConfig: z.object({
    Comment: z.string().describe(
      "A comment to describe the response headers policy. The comment cannot be longer than 128 characters.",
    ).optional(),
    CorsConfig: CorsConfigSchema.describe(
      "A configuration for a set of HTTP response headers that are used for cross-origin resource sharing (CORS).",
    ).optional(),
    CustomHeadersConfig: CustomHeadersConfigSchema.describe(
      "A configuration for a set of custom HTTP response headers.",
    ).optional(),
    Name: z.string().describe(
      "A name to identify the response headers policy. The name must be unique for response headers policies in this AWS-account.",
    ).optional(),
    RemoveHeadersConfig: RemoveHeadersConfigSchema.describe(
      "A configuration for a set of HTTP headers to remove from the HTTP response.",
    ).optional(),
    SecurityHeadersConfig: SecurityHeadersConfigSchema.describe(
      "A configuration for a set of security-related HTTP response headers.",
    ).optional(),
    ServerTimingHeadersConfig: ServerTimingHeadersConfigSchema.describe(
      "A configuration for enabling the Server-Timing header in HTTP responses sent from CloudFront.",
    ).optional(),
  }).describe("A response headers policy configuration.").optional(),
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

/** Swamp extension model for CloudFront ResponseHeadersPolicy. Registered at `@swamp/aws/cloudfront/response-headers-policy`. */
export const model = {
  type: "@swamp/aws/cloudfront/response-headers-policy",
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
      description: "CloudFront ResponseHeadersPolicy resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CloudFront ResponseHeadersPolicy",
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
          "AWS::CloudFront::ResponseHeadersPolicy",
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
      description: "Get a CloudFront ResponseHeadersPolicy",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudFront ResponseHeadersPolicy",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::CloudFront::ResponseHeadersPolicy",
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
      description: "Update a CloudFront ResponseHeadersPolicy",
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
          "AWS::CloudFront::ResponseHeadersPolicy",
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
          "AWS::CloudFront::ResponseHeadersPolicy",
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
      description: "Delete a CloudFront ResponseHeadersPolicy",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudFront ResponseHeadersPolicy",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::CloudFront::ResponseHeadersPolicy",
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
      description: "Sync CloudFront ResponseHeadersPolicy state from AWS",
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
            "AWS::CloudFront::ResponseHeadersPolicy",
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
