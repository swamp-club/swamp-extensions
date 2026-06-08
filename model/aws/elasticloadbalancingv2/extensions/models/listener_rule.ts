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

// Auto-generated extension model for @swamp/aws/elasticloadbalancingv2/listener-rule
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ElasticLoadBalancingV2 ListenerRule (AWS::ElasticLoadBalancingV2::ListenerRule).
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

const FixedResponseConfigSchema = z.object({
  ContentType: z.string().describe(
    "The content type. Valid Values: text/plain | text/css | text/html | application/javascript | application/json",
  ).optional(),
  StatusCode: z.string().describe("The HTTP response code (2XX, 4XX, or 5XX)."),
  MessageBody: z.string().describe("The message.").optional(),
});

const AuthenticateCognitoConfigSchema = z.object({
  OnUnauthenticatedRequest: z.string().describe(
    "The behavior if the user is not authenticated. The following are possible values: deny`` - Return an HTTP 401 Unauthorized error. allow - Allow the request to be forwarded to the target. authenticate `` - Redirect the request to the IdP authorization endpoint. This is the default value.",
  ).optional(),
  UserPoolClientId: z.string().describe(
    "The ID of the Amazon Cognito user pool client.",
  ),
  UserPoolDomain: z.string().describe(
    "The domain prefix or fully-qualified domain name of the Amazon Cognito user pool.",
  ),
  SessionTimeout: z.number().int().describe(
    "The maximum duration of the authentication session, in seconds. The default is 604800 seconds (7 days).",
  ).optional(),
  Scope: z.string().describe(
    "The set of user claims to be requested from the IdP. The default is openid. To verify which scope values your IdP supports and how to separate multiple values, see the documentation for your IdP.",
  ).optional(),
  SessionCookieName: z.string().describe(
    "The name of the cookie used to maintain session information. The default is AWSELBAuthSessionCookie.",
  ).optional(),
  UserPoolArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the Amazon Cognito user pool.",
  ),
  AuthenticationRequestExtraParams: z.record(z.string(), z.string()).describe(
    "The query parameters (up to 10) to include in the redirect request to the authorization endpoint.",
  ).optional(),
});

const RedirectConfigSchema = z.object({
  Path: z.string().describe(
    'The absolute path, starting with the leading "/". This component is not percent-encoded. The path can contain #{host}, #{path}, and #{port}.',
  ).optional(),
  Query: z.string().describe(
    'The query parameters, URL-encoded when necessary, but not percent-encoded. Do not include the leading "?", as it is automatically added. You can specify any of the reserved keywords.',
  ).optional(),
  Port: z.string().describe(
    "The port. You can specify a value from 1 to 65535 or #{port}.",
  ).optional(),
  Host: z.string().describe(
    "The hostname. This component is not percent-encoded. The hostname can contain #{host}.",
  ).optional(),
  Protocol: z.string().describe(
    "The protocol. You can specify HTTP, HTTPS, or #{protocol}. You can redirect HTTP to HTTP, HTTP to HTTPS, and HTTPS to HTTPS. You can't redirect HTTPS to HTTP.",
  ).optional(),
  StatusCode: z.string().describe(
    "The HTTP redirect code. The redirect is either permanent (HTTP 301) or temporary (HTTP 302).",
  ),
});

const TargetGroupStickinessConfigSchema = z.object({
  Enabled: z.boolean().describe(
    "Indicates whether target group stickiness is enabled.",
  ).optional(),
  DurationSeconds: z.number().int().describe(
    "[Application Load Balancers] The time period, in seconds, during which requests from a client should be routed to the same target group. The range is 1-604800 seconds (7 days). You must specify this value when enabling target group stickiness.",
  ).optional(),
});

const TargetGroupTupleSchema = z.object({
  TargetGroupArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the target group.",
  ).optional(),
  Weight: z.number().int().describe("The weight. The range is 0 to 999.")
    .optional(),
});

const ForwardConfigSchema = z.object({
  TargetGroupStickinessConfig: TargetGroupStickinessConfigSchema.describe(
    "Information about the target group stickiness for a rule.",
  ).optional(),
  TargetGroups: z.array(TargetGroupTupleSchema).describe(
    "Information about how traffic will be distributed between multiple target groups in a forward rule.",
  ).optional(),
});

const AuthenticateOidcConfigSchema = z.object({
  OnUnauthenticatedRequest: z.string().describe(
    "The behavior if the user is not authenticated. The following are possible values: deny`` - Return an HTTP 401 Unauthorized error. allow - Allow the request to be forwarded to the target. authenticate `` - Redirect the request to the IdP authorization endpoint. This is the default value.",
  ).optional(),
  TokenEndpoint: z.string().describe(
    "The token endpoint of the IdP. This must be a full URL, including the HTTPS protocol, the domain, and the path.",
  ),
  SessionTimeout: z.number().int().describe(
    "The maximum duration of the authentication session, in seconds. The default is 604800 seconds (7 days).",
  ).optional(),
  Scope: z.string().describe(
    "The set of user claims to be requested from the IdP. The default is openid. To verify which scope values your IdP supports and how to separate multiple values, see the documentation for your IdP.",
  ).optional(),
  Issuer: z.string().describe(
    "The OIDC issuer identifier of the IdP. This must be a full URL, including the HTTPS protocol, the domain, and the path.",
  ),
  ClientSecret: z.string().describe(
    "The OAuth 2.0 client secret. This parameter is required if you are creating a rule. If you are modifying a rule, you can omit this parameter if you set UseExistingClientSecret to true.",
  ).optional(),
  UserInfoEndpoint: z.string().describe(
    "The user info endpoint of the IdP. This must be a full URL, including the HTTPS protocol, the domain, and the path.",
  ),
  ClientId: z.string().describe("The OAuth 2.0 client identifier."),
  AuthorizationEndpoint: z.string().describe(
    "The authorization endpoint of the IdP. This must be a full URL, including the HTTPS protocol, the domain, and the path.",
  ),
  SessionCookieName: z.string().describe(
    "The name of the cookie used to maintain session information. The default is AWSELBAuthSessionCookie.",
  ).optional(),
  UseExistingClientSecret: z.boolean().describe(
    "Indicates whether to use the existing client secret when modifying a rule. If you are creating a rule, you can omit this parameter or set it to false.",
  ).optional(),
  AuthenticationRequestExtraParams: z.record(z.string(), z.string()).describe(
    "The query parameters (up to 10) to include in the redirect request to the authorization endpoint.",
  ).optional(),
});

const JwtValidationActionAdditionalClaimSchema = z.object({
  Format: z.string().describe("The format of the claim value."),
  Name: z.string().describe(
    "The name of the claim. You can't specify exp, iss, nbf, or iat because we validate them by default.",
  ),
  Values: z.array(z.string()).describe(
    "The claim value. The maximum size of the list is 10. Each value can be up to 256 characters in length. If the format is space-separated-values, the values can't include spaces.",
  ),
});

const JwtValidationConfigSchema = z.object({
  JwksEndpoint: z.string(),
  Issuer: z.string(),
  AdditionalClaims: z.array(JwtValidationActionAdditionalClaimSchema)
    .optional(),
});

const ActionSchema = z.object({
  Order: z.number().int().describe(
    "The order for the action. This value is required for rules with multiple actions. The action with the lowest value for order is performed first.",
  ).optional(),
  TargetGroupArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the target group. Specify only when Type is forward and you want to route to a single target group. To route to multiple target groups, you must use ForwardConfig instead.",
  ).optional(),
  FixedResponseConfig: FixedResponseConfigSchema.describe(
    "[Application Load Balancer] Information for creating an action that returns a custom HTTP response. Specify only when Type is fixed-response.",
  ).optional(),
  AuthenticateCognitoConfig: AuthenticateCognitoConfigSchema.describe(
    "[HTTPS listeners] Information for using Amazon Cognito to authenticate users. Specify only when Type is authenticate-cognito.",
  ).optional(),
  Type: z.string().describe("The type of action."),
  RedirectConfig: RedirectConfigSchema.describe(
    "[Application Load Balancer] Information for creating a redirect action. Specify only when Type is redirect.",
  ).optional(),
  ForwardConfig: ForwardConfigSchema.describe(
    "Information for creating an action that distributes requests among multiple target groups. Specify only when Type is forward. If you specify both ForwardConfig and TargetGroupArn, you can specify only one target group using ForwardConfig and it must be the same target group specified in TargetGroupArn.",
  ).optional(),
  AuthenticateOidcConfig: AuthenticateOidcConfigSchema.describe(
    "[HTTPS listeners] Information about an identity provider that is compliant with OpenID Connect (OIDC). Specify only when Type is authenticate-oidc.",
  ).optional(),
  JwtValidationConfig: JwtValidationConfigSchema.describe(
    "[HTTPS listeners] Information for validating JWT access tokens in client requests. Specify only when Type is jwt-validation.",
  ).optional(),
});

const HttpRequestMethodConfigSchema = z.object({
  Values: z.array(z.string()).describe(
    "The name of the request method. The maximum length is 40 characters. The allowed characters are A-Z, hyphen (-), and underscore (_). The comparison is case sensitive. Wildcards are not supported; therefore, the method name must be an exact match. If you specify multiple strings, the condition is satisfied if one of the strings matches the HTTP request method. We recommend that you route GET and HEAD requests in the same way, because the response to a HEAD request may be cached.",
  ).optional(),
});

const PathPatternConfigSchema = z.object({
  RegexValues: z.array(z.string()).optional(),
  Values: z.array(z.string()).describe(
    "The path patterns to compare against the request URL. The maximum size of each string is 128 characters. The comparison is case sensitive. The following wildcard characters are supported: * (matches 0 or more characters) and? (matches exactly 1 character). If you specify multiple strings, the condition is satisfied if one of them matches the request URL. The path pattern is compared only to the path of the URL, not to its query string.",
  ).optional(),
});

const HttpHeaderConfigSchema = z.object({
  RegexValues: z.array(z.string()).optional(),
  Values: z.array(z.string()).describe(
    "The strings to compare against the value of the HTTP header. The maximum length of each string is 128 characters. The comparison strings are case insensitive. The following wildcard characters are supported: * (matches 0 or more characters) and? (matches exactly 1 character). If the same header appears multiple times in the request, we search them in order until a match is found. If you specify multiple strings, the condition is satisfied if one of the strings matches the value of the HTTP header. To require that all of the strings are a match, create one condition per string.",
  ).optional(),
  HttpHeaderName: z.string().describe(
    "The name of the HTTP header field. The maximum size is 40 characters. The header name is case insensitive. The allowed characters are specified by RFC 7230. Wildcards are not supported.",
  ).optional(),
});

const SourceIpConfigSchema = z.object({
  Values: z.array(z.string()).describe(
    "The source IP addresses, in CIDR format. You can use both IPv4 and IPv6 addresses. Wildcards are not supported. If you specify multiple addresses, the condition is satisfied if the source IP address of the request matches one of the CIDR blocks. This condition is not satisfied by the addresses in the X-Forwarded-For header.",
  ).optional(),
});

const HostHeaderConfigSchema = z.object({
  RegexValues: z.array(z.string()).optional(),
  Values: z.array(z.string()).describe(
    'The host names. The maximum length of each string is 128 characters. The comparison is case insensitive. The following wildcard characters are supported: * (matches 0 or more characters) and? (matches exactly 1 character). You must include at least one "." character. You can include only alphabetical characters after the final "." character. If you specify multiple strings, the condition is satisfied if one of the strings matches the host name.',
  ).optional(),
});

const QueryStringKeyValueSchema = z.object({
  Value: z.string().describe("The value.").optional(),
  Key: z.string().describe("The key. You can omit the key.").optional(),
});

const QueryStringConfigSchema = z.object({
  Values: z.array(QueryStringKeyValueSchema).describe(
    "The key/value pairs or values to find in the query string. The maximum length of each string is 128 characters. The comparison is case insensitive. The following wildcard characters are supported: * (matches 0 or more characters) and? (matches exactly 1 character). To search for a literal '*' or '?' character in a query string, you must escape these characters in Values using a '\\' character. If you specify multiple key/value pairs or values, the condition is satisfied if one of them is found in the query string.",
  ).optional(),
});

const RuleConditionSchema = z.object({
  Field: z.string().describe(
    "The field in the HTTP request. The following are the possible values: http-header http-request-method host-header path-pattern query-string source-ip",
  ).optional(),
  RegexValues: z.array(z.string()).describe(
    "The regular expressions to match against the condition field. The maximum length of each string is 128 characters. Specify only when Field is http-header, host-header, or path-pattern.",
  ).optional(),
  Values: z.array(z.string()).describe(
    "The condition value. Specify only when Field is host-header or path-pattern. Alternatively, to specify multiple host names or multiple path patterns, use HostHeaderConfig or PathPatternConfig. If Field is host-header and you're not using HostHeaderConfig, you can specify a single host name (for example, my.example.com). A host name is case insensitive, can be up to 128 characters in length, and can contain any of the following characters. A-Z, a-z, 0-9 -. * (matches 0 or more characters)? (matches exactly 1 character) If Field is path-pattern and you're not using PathPatternConfig, you can specify a single path pattern (for example, /img/*). A path pattern is case-sensitive, can be up to 128 characters in length, and can contain any of the following characters. A-Z, a-z, 0-9 _ -. $ / ~ \" ' @: + & (using &amp;) * (matches 0 or more characters)? (matches exactly 1 character)",
  ).optional(),
  HttpRequestMethodConfig: HttpRequestMethodConfigSchema.describe(
    "Information for an HTTP method condition. Specify only when Field is http-request-method.",
  ).optional(),
  PathPatternConfig: PathPatternConfigSchema.describe(
    "Information for a path pattern condition. Specify only when Field is path-pattern.",
  ).optional(),
  HttpHeaderConfig: HttpHeaderConfigSchema.describe(
    "Information for an HTTP header condition. Specify only when Field is http-header.",
  ).optional(),
  SourceIpConfig: SourceIpConfigSchema.describe(
    "Information for a source IP condition. Specify only when Field is source-ip.",
  ).optional(),
  HostHeaderConfig: HostHeaderConfigSchema.describe(
    "Information for a host header condition. Specify only when Field is host-header.",
  ).optional(),
  QueryStringConfig: QueryStringConfigSchema.describe(
    "Information for a query string condition. Specify only when Field is query-string.",
  ).optional(),
});

const RewriteConfigSchema = z.object({
  Regex: z.string().describe(
    "The regular expression to match in the input string. The maximum length of the string is 1,024 characters.",
  ),
  Replace: z.string().describe(
    "The replacement string to use when rewriting the matched input. The maximum length of the string is 1,024 characters. You can specify capture groups in the regular expression (for example, $1 and $2).",
  ),
});

const RewriteConfigObjectSchema = z.object({
  Rewrites: z.array(RewriteConfigSchema),
});

const TransformSchema = z.object({
  Type: z.string(),
  HostHeaderRewriteConfig: RewriteConfigObjectSchema.optional(),
  UrlRewriteConfig: RewriteConfigObjectSchema.optional(),
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
  ListenerArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the listener.",
  ).optional(),
  Actions: z.array(ActionSchema).describe(
    "The actions. The rule must include exactly one of the following types of actions: forward, fixed-response, or redirect, and it must be the last action to be performed. If the rule is for an HTTPS listener, it can also optionally include an authentication action.",
  ),
  Priority: z.number().int().describe(
    "The rule priority. A listener can't have multiple rules with the same priority. If you try to reorder rules by updating their priorities, do not specify a new priority if an existing rule already uses this priority, as this can cause an error. If you need to reuse a priority with a different rule, you must remove it as a priority first, and then specify it in a subsequent update.",
  ),
  Conditions: z.array(RuleConditionSchema).describe(
    "The conditions. The rule can optionally include up to one of each of the following conditions: http-request-method, host-header, path-pattern, and source-ip. A rule can also optionally include one or more of each of the following conditions: http-header and query-string.",
  ),
  Transforms: z.array(TransformSchema).optional(),
});

const StateSchema = z.object({
  ListenerArn: z.string().optional(),
  RuleArn: z.string(),
  Actions: z.array(ActionSchema).optional(),
  Priority: z.number().optional(),
  Conditions: z.array(RuleConditionSchema).optional(),
  Transforms: z.array(TransformSchema).optional(),
  IsDefault: z.boolean().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  ListenerArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the listener.",
  ).optional(),
  Actions: z.array(ActionSchema).describe(
    "The actions. The rule must include exactly one of the following types of actions: forward, fixed-response, or redirect, and it must be the last action to be performed. If the rule is for an HTTPS listener, it can also optionally include an authentication action.",
  ).optional(),
  Priority: z.number().int().describe(
    "The rule priority. A listener can't have multiple rules with the same priority. If you try to reorder rules by updating their priorities, do not specify a new priority if an existing rule already uses this priority, as this can cause an error. If you need to reuse a priority with a different rule, you must remove it as a priority first, and then specify it in a subsequent update.",
  ).optional(),
  Conditions: z.array(RuleConditionSchema).describe(
    "The conditions. The rule can optionally include up to one of each of the following conditions: http-request-method, host-header, path-pattern, and source-ip. A rule can also optionally include one or more of each of the following conditions: http-header and query-string.",
  ).optional(),
  Transforms: z.array(TransformSchema).optional(),
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

/** Swamp extension model for ElasticLoadBalancingV2 ListenerRule. Registered at `@swamp/aws/elasticloadbalancingv2/listener-rule`. */
export const model = {
  type: "@swamp/aws/elasticloadbalancingv2/listener-rule",
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
      description: "ElasticLoadBalancingV2 ListenerRule resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ElasticLoadBalancingV2 ListenerRule",
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
          "AWS::ElasticLoadBalancingV2::ListenerRule",
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
      description: "Get a ElasticLoadBalancingV2 ListenerRule",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ElasticLoadBalancingV2 ListenerRule",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::ElasticLoadBalancingV2::ListenerRule",
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
      description: "Update a ElasticLoadBalancingV2 ListenerRule",
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
        const identifier = existing.RuleArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::ElasticLoadBalancingV2::ListenerRule",
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
          "AWS::ElasticLoadBalancingV2::ListenerRule",
          identifier,
          currentState,
          desiredState,
          ["ListenerArn"],
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
      description: "Delete a ElasticLoadBalancingV2 ListenerRule",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ElasticLoadBalancingV2 ListenerRule",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::ElasticLoadBalancingV2::ListenerRule",
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
      description: "Sync ElasticLoadBalancingV2 ListenerRule state from AWS",
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
        const identifier = existing.RuleArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::ElasticLoadBalancingV2::ListenerRule",
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
