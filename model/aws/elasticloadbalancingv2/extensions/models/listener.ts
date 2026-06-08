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

// Auto-generated extension model for @swamp/aws/elasticloadbalancingv2/listener
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ElasticLoadBalancingV2 Listener (AWS::ElasticLoadBalancingV2::Listener).
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

const ListenerAttributeSchema = z.object({
  Value: z.string().describe("The value of the attribute.").optional(),
  Key: z.string().describe(
    "The name of the attribute. The following attribute is supported by Network Load Balancers, and Gateway Load Balancers. tcp.idle_timeout.seconds - The tcp idle timeout value, in seconds. The valid range is 60-6000 seconds. The default is 350 seconds. The following attributes are only supported by Application Load Balancers. routing.http.request.x_amzn_mtls_clientcert_serial_number.header_name - Enables you to modify the header name of the *X-Amzn-Mtls-Clientcert-Serial-Number* HTTP request header. routing.http.request.x_amzn_mtls_clientcert_issuer.header_name - Enables you to modify the header name of the *X-Amzn-Mtls-Clientcert-Issuer* HTTP request header. routing.http.request.x_amzn_mtls_clientcert_subject.header_name - Enables you to modify the header name of the *X-Amzn-Mtls-Clientcert-Subject* HTTP request header. routing.http.request.x_amzn_mtls_clientcert_validity.header_name - Enables you to modify the header name of the *X-Amzn-Mtls-Clientcert-Validity* HTTP request header. routing.http.request.x_amzn_mtls_clientcert_leaf.header_name - Enables you to modify the header name of the *X-Amzn-Mtls-Clientcert-Leaf* HTTP request header. routing.http.request.x_amzn_mtls_clientcert.header_name - Enables you to modify the header name of the *X-Amzn-Mtls-Clientcert* HTTP request header. routing.http.request.x_amzn_tls_version.header_name - Enables you to modify the header name of the *X-Amzn-Tls-Version* HTTP request header. routing.http.request.x_amzn_tls_cipher_suite.header_name - Enables you to modify the header name of the *X-Amzn-Tls-Cipher-Suite* HTTP request header. routing.http.response.server.enabled - Enables you to allow or remove the HTTP response server header. routing.http.response.strict_transport_security.header_value - Informs browsers that the site should only be accessed using HTTPS, and that any future attempts to access it using HTTP should automatically be converted to HTTPS. routing.http.response.access_control_allow_origin.header_value - Specifies which origins are allowed to access the server. routing.http.response.access_control_allow_methods.header_value - Returns which HTTP methods are allowed when accessing the server from a different origin. routing.http.response.access_control_allow_headers.header_value - Specifies which headers can be used during the request. routing.http.response.access_control_allow_credentials.header_value - Indicates whether the browser should include credentials such as cookies or authentication when making requests. routing.http.response.access_control_expose_headers.header_value - Returns which headers the browser can expose to the requesting client. routing.http.response.access_control_max_age.header_value - Specifies how long the results of a preflight request can be cached, in seconds. routing.http.response.content_security_policy.header_value - Specifies restrictions enforced by the browser to help minimize the risk of certain types of security threats. routing.http.response.x_content_type_options.header_value - Indicates whether the MIME types advertised in the *Content-Type* headers should be followed and not be changed. routing.http.response.x_frame_options.header_value - Indicates whether the browser is allowed to render a page in a *frame*, *iframe*, *embed* or *object*.",
  ).optional(),
});

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
  SessionTimeout: z.string().describe(
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

const JwtValidationActionAdditionalClaimSchema = z.object({
  Format: z.string().describe("The format of the claim value."),
  Values: z.array(z.string()).describe(
    "The claim value. The maximum size of the list is 10. Each value can be up to 256 characters in length. If the format is space-separated-values, the values can't include spaces.",
  ),
  Name: z.string().describe(
    "The name of the claim. You can't specify exp, iss, nbf, or iat because we validate them by default.",
  ),
});

const JwtValidationConfigSchema = z.object({
  JwksEndpoint: z.string(),
  Issuer: z.string(),
  AdditionalClaims: z.array(JwtValidationActionAdditionalClaimSchema)
    .optional(),
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
  UseExistingClientSecret: z.boolean().describe(
    "Indicates whether to use the existing client secret when modifying a rule. If you are creating a rule, you can omit this parameter or set it to false.",
  ).optional(),
  SessionTimeout: z.string().describe(
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
  AuthenticationRequestExtraParams: z.record(z.string(), z.string()).describe(
    "The query parameters (up to 10) to include in the redirect request to the authorization endpoint.",
  ).optional(),
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
  JwtValidationConfig: JwtValidationConfigSchema.describe(
    "[HTTPS listeners] Information for validating JWT access tokens in client requests. Specify only when Type is jwt-validation.",
  ).optional(),
  ForwardConfig: ForwardConfigSchema.describe(
    "Information for creating an action that distributes requests among multiple target groups. Specify only when Type is forward. If you specify both ForwardConfig and TargetGroupArn, you can specify only one target group using ForwardConfig and it must be the same target group specified in TargetGroupArn.",
  ).optional(),
  AuthenticateOidcConfig: AuthenticateOidcConfigSchema.describe(
    "[HTTPS listeners] Information about an identity provider that is compliant with OpenID Connect (OIDC). Specify only when Type is authenticate-oidc.",
  ).optional(),
});

const CertificateSchema = z.object({
  CertificateArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the certificate.",
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
  MutualAuthentication: z.object({
    IgnoreClientCertificateExpiry: z.boolean().describe(
      "Indicates whether expired client certificates are ignored.",
    ).optional(),
    Mode: z.string().describe(
      "The client certificate handling method. Options are off, passthrough or verify. The default value on initial resource creation is off. After mutual authentication is turned on, you must explicitly set the Mode to off to turn it off; removing the property from your template will not turn it off.",
    ).optional(),
    TrustStoreArn: z.string().describe(
      "The Amazon Resource Name (ARN) of the trust store.",
    ).optional(),
    AdvertiseTrustStoreCaNames: z.string().describe(
      "Indicates whether trust store CA certificate names are advertised.",
    ).optional(),
  }).describe("The mutual authentication configuration information.")
    .optional(),
  ListenerAttributes: z.array(ListenerAttributeSchema).describe(
    "The listener attributes. Attributes that you do not modify retain their current values.",
  ).optional(),
  AlpnPolicy: z.array(z.string()).describe(
    "[TLS listener] The name of the Application-Layer Protocol Negotiation (ALPN) policy.",
  ).optional(),
  SslPolicy: z.string().describe(
    "[HTTPS and TLS listeners] The security policy that defines which protocols and ciphers are supported. For more information, see [Security policies](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/describe-ssl-policies.html) in the *Application Load Balancers Guide* and [Security policies](https://docs.aws.amazon.com/elasticloadbalancing/latest/network/describe-ssl-policies.html) in the *Network Load Balancers Guide*. [HTTPS listeners] Updating the security policy can result in interruptions if the load balancer is handling a high volume of traffic. To decrease the possibility of an interruption if your load balancer is handling a high volume of traffic, create an additional load balancer or request an LCU reservation.",
  ).optional(),
  LoadBalancerArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the load balancer.",
  ),
  DefaultActions: z.array(ActionSchema).describe(
    "The actions for the default rule. You cannot define a condition for a default rule. To create additional rules for an Application Load Balancer, use [AWS::ElasticLoadBalancingV2::ListenerRule](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-elasticloadbalancingv2-listenerrule.html).",
  ),
  Port: z.number().int().describe(
    "The port on which the load balancer is listening. You can't specify a port for a Gateway Load Balancer.",
  ).optional(),
  Certificates: z.array(CertificateSchema).describe(
    "The default SSL server certificate for a secure listener. You must provide exactly one certificate if the listener protocol is HTTPS or TLS. For an HTTPS listener, update requires some interruptions. For a TLS listener, update requires no interruption. To create a certificate list for a secure listener, use [AWS::ElasticLoadBalancingV2::ListenerCertificate](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-elasticloadbalancingv2-listenercertificate.html).",
  ).optional(),
  Protocol: z.string().describe(
    "The protocol for connections from clients to the load balancer. For Application Load Balancers, the supported protocols are HTTP and HTTPS. For Network Load Balancers, the supported protocols are TCP, TLS, UDP, TCP_UDP, QUIC, and TCP_QUIC. You can’t specify the UDP, TCP_UDP, QUIC, or TCP_QUIC protocol if dual-stack mode is enabled. You can't specify a protocol for a Gateway Load Balancer.",
  ).optional(),
});

const StateSchema = z.object({
  ListenerArn: z.string(),
  MutualAuthentication: z.object({
    IgnoreClientCertificateExpiry: z.boolean(),
    Mode: z.string(),
    TrustStoreArn: z.string(),
    AdvertiseTrustStoreCaNames: z.string(),
  }).optional(),
  ListenerAttributes: z.array(ListenerAttributeSchema).optional(),
  AlpnPolicy: z.array(z.string()).optional(),
  SslPolicy: z.string().optional(),
  LoadBalancerArn: z.string().optional(),
  DefaultActions: z.array(ActionSchema).optional(),
  Port: z.number().optional(),
  Certificates: z.array(CertificateSchema).optional(),
  Protocol: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  MutualAuthentication: z.object({
    IgnoreClientCertificateExpiry: z.boolean().describe(
      "Indicates whether expired client certificates are ignored.",
    ).optional(),
    Mode: z.string().describe(
      "The client certificate handling method. Options are off, passthrough or verify. The default value on initial resource creation is off. After mutual authentication is turned on, you must explicitly set the Mode to off to turn it off; removing the property from your template will not turn it off.",
    ).optional(),
    TrustStoreArn: z.string().describe(
      "The Amazon Resource Name (ARN) of the trust store.",
    ).optional(),
    AdvertiseTrustStoreCaNames: z.string().describe(
      "Indicates whether trust store CA certificate names are advertised.",
    ).optional(),
  }).describe("The mutual authentication configuration information.")
    .optional(),
  ListenerAttributes: z.array(ListenerAttributeSchema).describe(
    "The listener attributes. Attributes that you do not modify retain their current values.",
  ).optional(),
  AlpnPolicy: z.array(z.string()).describe(
    "[TLS listener] The name of the Application-Layer Protocol Negotiation (ALPN) policy.",
  ).optional(),
  SslPolicy: z.string().describe(
    "[HTTPS and TLS listeners] The security policy that defines which protocols and ciphers are supported. For more information, see [Security policies](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/describe-ssl-policies.html) in the *Application Load Balancers Guide* and [Security policies](https://docs.aws.amazon.com/elasticloadbalancing/latest/network/describe-ssl-policies.html) in the *Network Load Balancers Guide*. [HTTPS listeners] Updating the security policy can result in interruptions if the load balancer is handling a high volume of traffic. To decrease the possibility of an interruption if your load balancer is handling a high volume of traffic, create an additional load balancer or request an LCU reservation.",
  ).optional(),
  LoadBalancerArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the load balancer.",
  ).optional(),
  DefaultActions: z.array(ActionSchema).describe(
    "The actions for the default rule. You cannot define a condition for a default rule. To create additional rules for an Application Load Balancer, use [AWS::ElasticLoadBalancingV2::ListenerRule](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-elasticloadbalancingv2-listenerrule.html).",
  ).optional(),
  Port: z.number().int().describe(
    "The port on which the load balancer is listening. You can't specify a port for a Gateway Load Balancer.",
  ).optional(),
  Certificates: z.array(CertificateSchema).describe(
    "The default SSL server certificate for a secure listener. You must provide exactly one certificate if the listener protocol is HTTPS or TLS. For an HTTPS listener, update requires some interruptions. For a TLS listener, update requires no interruption. To create a certificate list for a secure listener, use [AWS::ElasticLoadBalancingV2::ListenerCertificate](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-elasticloadbalancingv2-listenercertificate.html).",
  ).optional(),
  Protocol: z.string().describe(
    "The protocol for connections from clients to the load balancer. For Application Load Balancers, the supported protocols are HTTP and HTTPS. For Network Load Balancers, the supported protocols are TCP, TLS, UDP, TCP_UDP, QUIC, and TCP_QUIC. You can’t specify the UDP, TCP_UDP, QUIC, or TCP_QUIC protocol if dual-stack mode is enabled. You can't specify a protocol for a Gateway Load Balancer.",
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

/** Swamp extension model for ElasticLoadBalancingV2 Listener. Registered at `@swamp/aws/elasticloadbalancingv2/listener`. */
export const model = {
  type: "@swamp/aws/elasticloadbalancingv2/listener",
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
      toVersion: "2026.04.19.1",
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
      description: "ElasticLoadBalancingV2 Listener resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ElasticLoadBalancingV2 Listener",
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
          "AWS::ElasticLoadBalancingV2::Listener",
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
      description: "Get a ElasticLoadBalancingV2 Listener",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ElasticLoadBalancingV2 Listener",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::ElasticLoadBalancingV2::Listener",
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
      description: "Update a ElasticLoadBalancingV2 Listener",
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
        const identifier = existing.ListenerArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::ElasticLoadBalancingV2::Listener",
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
          "AWS::ElasticLoadBalancingV2::Listener",
          identifier,
          currentState,
          desiredState,
          ["LoadBalancerArn"],
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
      description: "Delete a ElasticLoadBalancingV2 Listener",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ElasticLoadBalancingV2 Listener",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::ElasticLoadBalancingV2::Listener",
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
      description: "Sync ElasticLoadBalancingV2 Listener state from AWS",
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
        const identifier = existing.ListenerArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::ElasticLoadBalancingV2::Listener",
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
