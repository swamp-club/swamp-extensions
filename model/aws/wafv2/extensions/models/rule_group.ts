// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/aws/wafv2/rule-group
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for WAFv2 RuleGroup (AWS::WAFv2::RuleGroup).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, sync, and list can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";

const BodySchema = z.object({
  OversizeHandling: z.enum(["CONTINUE", "MATCH", "NO_MATCH"]).describe(
    "Handling of requests containing oversize fields",
  ).optional(),
});

const JsonMatchPatternSchema = z.object({
  All: z.record(z.string(), z.unknown()).describe(
    "Inspect all parts of the web request's JSON body.",
  ).optional(),
  IncludedPaths: z.array(z.string()).optional(),
});

const JsonBodySchema = z.object({
  MatchPattern: JsonMatchPatternSchema.describe(
    "The pattern to look for in the JSON body.",
  ),
  MatchScope: z.enum(["ALL", "KEY", "VALUE"]).describe(
    "The parts of the JSON to match against using the MatchPattern.",
  ),
  InvalidFallbackBehavior: z.enum(["MATCH", "NO_MATCH", "EVALUATE_AS_STRING"])
    .describe(
      "The inspection behavior to fall back to if the JSON in the request body is invalid.",
    ).optional(),
  OversizeHandling: z.enum(["CONTINUE", "MATCH", "NO_MATCH"]).describe(
    "Handling of requests containing oversize fields",
  ).optional(),
});

const HeaderMatchPatternSchema = z.object({
  All: z.record(z.string(), z.unknown()).describe(
    "Inspect all parts of the web request headers.",
  ).optional(),
  IncludedHeaders: z.array(
    z.string().min(1).max(64).regex(new RegExp(".*\\S.*")),
  ).optional(),
  ExcludedHeaders: z.array(
    z.string().min(1).max(64).regex(new RegExp(".*\\S.*")),
  ).optional(),
});

const HeadersSchema = z.object({
  MatchPattern: HeaderMatchPatternSchema.describe(
    "The pattern to look for in the request headers.",
  ),
  MatchScope: z.enum(["ALL", "KEY", "VALUE"]).describe(
    "The parts of the request to match against using the MatchPattern.",
  ),
  OversizeHandling: z.enum(["CONTINUE", "MATCH", "NO_MATCH"]).describe(
    "Handling of requests containing oversize fields",
  ),
});

const CookieMatchPatternSchema = z.object({
  All: z.record(z.string(), z.unknown()).describe(
    "Inspect all parts of the web request cookies.",
  ).optional(),
  IncludedCookies: z.array(
    z.string().min(1).max(60).regex(new RegExp(".*\\S.*")),
  ).optional(),
  ExcludedCookies: z.array(
    z.string().min(1).max(60).regex(new RegExp(".*\\S.*")),
  ).optional(),
});

const CookiesSchema = z.object({
  MatchPattern: CookieMatchPatternSchema.describe(
    "The pattern to look for in the request cookies.",
  ),
  MatchScope: z.enum(["ALL", "KEY", "VALUE"]).describe(
    "The parts of the request to match against using the MatchPattern.",
  ),
  OversizeHandling: z.enum(["CONTINUE", "MATCH", "NO_MATCH"]).describe(
    "Handling of requests containing oversize fields",
  ),
});

const JA3FingerprintSchema = z.object({
  FallbackBehavior: z.enum(["MATCH", "NO_MATCH"]),
});

const JA4FingerprintSchema = z.object({
  FallbackBehavior: z.enum(["MATCH", "NO_MATCH"]),
});

const UriFragmentSchema = z.object({
  FallbackBehavior: z.enum(["MATCH", "NO_MATCH"]).optional(),
});

const HeaderOrderSchema = z.object({
  OversizeHandling: z.enum(["CONTINUE", "MATCH", "NO_MATCH"]).describe(
    "Handling of requests containing oversize fields",
  ),
});

const FieldToMatchSchema = z.object({
  SingleHeader: z.object({
    Name: z.string(),
  }).optional(),
  SingleQueryArgument: z.object({
    Name: z.string(),
  }).describe(
    "One query argument in a web request, identified by name, for example UserName or SalesRegion. The name can be up to 30 characters long and isn't case sensitive.",
  ).optional(),
  AllQueryArguments: z.record(z.string(), z.unknown()).describe(
    "All query arguments of a web request.",
  ).optional(),
  UriPath: z.record(z.string(), z.unknown()).describe(
    "The path component of the URI of a web request. This is the part of a web request that identifies a resource, for example, /images/daily-ad.jpg.",
  ).optional(),
  QueryString: z.record(z.string(), z.unknown()).describe(
    "The query string of a web request. This is the part of a URL that appears after a? character, if any.",
  ).optional(),
  Body: BodySchema.describe(
    "The body of a web request. This immediately follows the request headers.",
  ).optional(),
  Method: z.record(z.string(), z.unknown()).describe(
    "The HTTP method of a web request. The method indicates the type of operation that the request is asking the origin to perform.",
  ).optional(),
  JsonBody: JsonBodySchema.describe(
    "Inspect the request body as JSON. The request body immediately follows the request headers.",
  ).optional(),
  Headers: HeadersSchema.describe("Includes headers of a web request.")
    .optional(),
  Cookies: CookiesSchema.describe("Includes cookies of a web request.")
    .optional(),
  JA3Fingerprint: JA3FingerprintSchema.describe(
    "Includes the JA3 fingerprint of a web request.",
  ).optional(),
  JA4Fingerprint: JA4FingerprintSchema.describe(
    "Includes the JA4 fingerprint of a web request.",
  ).optional(),
  UriFragment: UriFragmentSchema.describe(
    "The path component of the URI Fragment. This is the part of a web request that identifies a fragment uri, for example, /abcd#introduction",
  ).optional(),
  HeaderOrder: HeaderOrderSchema.describe(
    "The string containing the list of a web request's header names, ordered as they appear in the web request, separated by colons.",
  ).optional(),
});

const TextTransformationSchema = z.object({
  Priority: z.number().int().min(0).describe(
    "Priority of Rule being evaluated.",
  ),
  Type: z.enum([
    "NONE",
    "COMPRESS_WHITE_SPACE",
    "HTML_ENTITY_DECODE",
    "LOWERCASE",
    "CMD_LINE",
    "URL_DECODE",
    "BASE64_DECODE",
    "HEX_DECODE",
    "MD5",
    "REPLACE_COMMENTS",
    "ESCAPE_SEQ_DECODE",
    "SQL_HEX_DECODE",
    "CSS_DECODE",
    "JS_DECODE",
    "NORMALIZE_PATH",
    "NORMALIZE_PATH_WIN",
    "REMOVE_NULLS",
    "REPLACE_NULLS",
    "BASE64_DECODE_EXT",
    "URL_DECODE_UNI",
    "UTF8_TO_UNICODE",
    "REMOVE_WHITESPACE",
    "TRIM",
    "TRIM_LEFT",
    "TRIM_RIGHT",
    "REMOVE_COMMENTS_CHAR",
    "UPPERCASE",
    "CMD_LINE_WIN",
    "CMD_LINE_UNIX",
    "JS_DECODE_EXT",
    "SHA256",
  ]).describe("Type of text transformation."),
});

const PreParseTextTransformationSchema = z.object({
  Priority: z.number().int().min(0).describe(
    "Priority of PreParseTextTransformation being applied.",
  ),
  Type: z.enum([
    "NONE",
    "URL_DECODE",
    "URL_DECODE_UNI",
    "COMBINE_DUPLICATE_QUERY_ARGS_BY_COMMA",
    "REPLACE_SEMICOLONS_WITH_AMPERSANDS",
  ]).describe("Type of pre-parse text transformation."),
});

const ByteMatchStatementSchema = z.object({
  SearchString: z.string().describe("String that is searched to find a match.")
    .optional(),
  SearchStringBase64: z.string().describe(
    "Base64 encoded string that is searched to find a match.",
  ).optional(),
  FieldToMatch: FieldToMatchSchema.describe("Field of the request to match."),
  TextTransformations: z.array(TextTransformationSchema),
  PreParseTextTransformations: z.array(PreParseTextTransformationSchema)
    .optional(),
  PositionalConstraint: z.enum([
    "EXACTLY",
    "STARTS_WITH",
    "ENDS_WITH",
    "CONTAINS",
    "CONTAINS_WORD",
  ]).describe("Position of the evaluation in the FieldToMatch of request."),
});

const SqliMatchStatementSchema = z.object({
  FieldToMatch: FieldToMatchSchema.describe("Field of the request to match."),
  TextTransformations: z.array(TextTransformationSchema),
  PreParseTextTransformations: z.array(PreParseTextTransformationSchema)
    .optional(),
  SensitivityLevel: z.enum(["LOW", "HIGH"]).describe(
    "Sensitivity Level current only used for sqli match statements.",
  ).optional(),
});

const XssMatchStatementSchema = z.object({
  FieldToMatch: FieldToMatchSchema.describe("Field of the request to match."),
  TextTransformations: z.array(TextTransformationSchema),
  PreParseTextTransformations: z.array(PreParseTextTransformationSchema)
    .optional(),
});

const SizeConstraintStatementSchema = z.object({
  FieldToMatch: FieldToMatchSchema.describe("Field of the request to match."),
  ComparisonOperator: z.enum(["EQ", "NE", "LE", "LT", "GE", "GT"]),
  Size: z.number().min(0).max(21474836480),
  TextTransformations: z.array(TextTransformationSchema),
  PreParseTextTransformations: z.array(PreParseTextTransformationSchema)
    .optional(),
});

const ForwardedIPConfigurationSchema = z.object({
  HeaderName: z.string(),
  FallbackBehavior: z.enum(["MATCH", "NO_MATCH"]),
});

const GeoMatchStatementSchema = z.object({
  CountryCodes: z.array(z.string().min(1).max(2)).optional(),
  ForwardedIPConfig: ForwardedIPConfigurationSchema.optional(),
});

const IPSetForwardedIPConfigurationSchema = z.object({
  HeaderName: z.string(),
  FallbackBehavior: z.enum(["MATCH", "NO_MATCH"]),
  Position: z.enum(["FIRST", "LAST", "ANY"]),
});

const IPSetReferenceStatementSchema = z.object({
  Arn: z.string().min(20).max(2048).describe("ARN of the WAF entity."),
  IPSetForwardedIPConfig: IPSetForwardedIPConfigurationSchema.optional(),
});

const RegexPatternSetReferenceStatementSchema = z.object({
  Arn: z.string().min(20).max(2048).describe("ARN of the WAF entity."),
  FieldToMatch: FieldToMatchSchema.describe("Field of the request to match."),
  TextTransformations: z.array(TextTransformationSchema),
  PreParseTextTransformations: z.array(PreParseTextTransformationSchema)
    .optional(),
});

const RateLimitCookieSchema = z.object({
  Name: z.string().min(1).max(64).regex(new RegExp(".*\\S.*")).describe(
    "The name of the cookie to use.",
  ),
  TextTransformations: z.array(TextTransformationSchema),
});

const RateLimitHeaderSchema = z.object({
  Name: z.string().min(1).max(64).regex(new RegExp(".*\\S.*")).describe(
    "The name of the header to use.",
  ),
  TextTransformations: z.array(TextTransformationSchema),
});

const RateLimitLabelNamespaceSchema = z.object({
  Namespace: z.string().regex(new RegExp("^[0-9A-Za-z_:-]{1,1024}$")).describe(
    "The namespace to use for aggregation.",
  ),
});

const RateLimitQueryArgumentSchema = z.object({
  Name: z.string().min(1).max(64).regex(new RegExp(".*\\S.*")).describe(
    "The name of the query argument to use.",
  ),
  TextTransformations: z.array(TextTransformationSchema),
});

const RateLimitQueryStringSchema = z.object({
  TextTransformations: z.array(TextTransformationSchema),
});

const RateLimitUriPathSchema = z.object({
  TextTransformations: z.array(TextTransformationSchema),
});

const RateLimitJA3FingerprintSchema = z.object({
  FallbackBehavior: z.enum(["MATCH", "NO_MATCH"]),
});

const RateLimitJA4FingerprintSchema = z.object({
  FallbackBehavior: z.enum(["MATCH", "NO_MATCH"]),
});

const RateBasedStatementCustomKeySchema = z.object({
  Cookie: RateLimitCookieSchema.describe(
    "Specifies a cookie as an aggregate key for a rate-based rule.",
  ).optional(),
  ForwardedIP: z.record(z.string(), z.unknown()).describe(
    "Specifies the first IP address in an HTTP header as an aggregate key for a rate-based rule.",
  ).optional(),
  Header: RateLimitHeaderSchema.describe(
    "Specifies a header as an aggregate key for a rate-based rule.",
  ).optional(),
  HTTPMethod: z.record(z.string(), z.unknown()).describe(
    "Specifies the request's HTTP method as an aggregate key for a rate-based rule.",
  ).optional(),
  IP: z.record(z.string(), z.unknown()).describe(
    "Specifies the IP address in the web request as an aggregate key for a rate-based rule.",
  ).optional(),
  LabelNamespace: RateLimitLabelNamespaceSchema.describe(
    "Specifies a label namespace to use as an aggregate key for a rate-based rule.",
  ).optional(),
  QueryArgument: RateLimitQueryArgumentSchema.describe(
    "Specifies a query argument in the request as an aggregate key for a rate-based rule.",
  ).optional(),
  QueryString: RateLimitQueryStringSchema.describe(
    "Specifies the request's query string as an aggregate key for a rate-based rule.",
  ).optional(),
  UriPath: RateLimitUriPathSchema.describe(
    "Specifies the request's URI Path as an aggregate key for a rate-based rule.",
  ).optional(),
  JA3Fingerprint: RateLimitJA3FingerprintSchema.describe(
    "Specifies the request's JA3 fingerprint as an aggregate key for a rate-based rule.",
  ).optional(),
  JA4Fingerprint: RateLimitJA4FingerprintSchema.describe(
    "Specifies the request's JA4 fingerprint as an aggregate key for a rate-based rule.",
  ).optional(),
  ASN: z.record(z.string(), z.unknown()).describe(
    "Specifies the request's ASN as an aggregate key for a rate-based rule.",
  ).optional(),
});

const RateBasedStatementSchema = z.object({
  Limit: z.number().int().min(10).max(2000000000),
  EvaluationWindowSec: z.union([
    z.literal(60),
    z.literal(120),
    z.literal(300),
    z.literal(600),
  ]).optional(),
  AggregateKeyType: z.enum(["IP", "FORWARDED_IP", "CONSTANT", "CUSTOM_KEYS"]),
  CustomKeys: z.array(RateBasedStatementCustomKeySchema).describe(
    "Specifies the aggregate keys to use in a rate-base rule.",
  ).optional(),
  ScopeDownStatement: z.record(z.string(), z.unknown()).describe(
    "First level statement that contains conditions, such as ByteMatch, SizeConstraint, etc",
  ).optional(),
  ForwardedIPConfig: ForwardedIPConfigurationSchema.optional(),
});

const AndStatementSchema = z.object({
  Statements: z.array(z.record(z.string(), z.unknown())),
});

const OrStatementSchema = z.object({
  Statements: z.array(z.record(z.string(), z.unknown())),
});

const NotStatementSchema = z.object({
  Statement: z.record(z.string(), z.unknown()).describe(
    "First level statement that contains conditions, such as ByteMatch, SizeConstraint, etc",
  ),
});

const LabelMatchStatementSchema = z.object({
  Scope: z.enum(["LABEL", "NAMESPACE"]),
  Key: z.string().regex(new RegExp("^[0-9A-Za-z_:-]{1,1024}$")),
});

const RegexMatchStatementSchema = z.object({
  RegexString: z.string().min(1).max(512),
  FieldToMatch: FieldToMatchSchema.describe("Field of the request to match."),
  TextTransformations: z.array(TextTransformationSchema),
  PreParseTextTransformations: z.array(PreParseTextTransformationSchema)
    .optional(),
});

const AsnMatchStatementSchema = z.object({
  AsnList: z.array(z.number().int().min(0).max(4294967295)).optional(),
  ForwardedIPConfig: ForwardedIPConfigurationSchema.optional(),
});

const StatementSchema = z.object({
  ByteMatchStatement: ByteMatchStatementSchema.describe("Byte Match statement.")
    .optional(),
  SqliMatchStatement: SqliMatchStatementSchema.describe("Sqli Match Statement.")
    .optional(),
  XssMatchStatement: XssMatchStatementSchema.describe("Xss Match Statement.")
    .optional(),
  SizeConstraintStatement: SizeConstraintStatementSchema.describe(
    "Size Constraint statement.",
  ).optional(),
  GeoMatchStatement: GeoMatchStatementSchema.optional(),
  IPSetReferenceStatement: IPSetReferenceStatementSchema.optional(),
  RegexPatternSetReferenceStatement: RegexPatternSetReferenceStatementSchema
    .optional(),
  RateBasedStatement: RateBasedStatementSchema.optional(),
  AndStatement: AndStatementSchema.optional(),
  OrStatement: OrStatementSchema.optional(),
  NotStatement: NotStatementSchema.optional(),
  LabelMatchStatement: LabelMatchStatementSchema.optional(),
  RegexMatchStatement: RegexMatchStatementSchema.optional(),
  AsnMatchStatement: AsnMatchStatementSchema.optional(),
});

const CustomHTTPHeaderSchema = z.object({
  Name: z.string().min(1).max(64).describe("HTTP header name."),
  Value: z.string().min(1).max(255).describe("HTTP header value."),
});

const CustomRequestHandlingSchema = z.object({
  InsertHeaders: z.array(CustomHTTPHeaderSchema).describe(
    "Collection of HTTP headers.",
  ),
});

const AllowActionSchema = z.object({
  CustomRequestHandling: CustomRequestHandlingSchema.describe(
    "Custom request handling.",
  ).optional(),
});

const CustomResponseSchema = z.object({
  ResponseCode: z.number().int().min(200).max(599).describe(
    "Custom response code.",
  ),
  CustomResponseBodyKey: z.string().regex(new RegExp("^[\\w\\-]+$")).describe(
    "Custom response body key.",
  ).optional(),
  ResponseHeaders: z.array(CustomHTTPHeaderSchema).describe(
    "Collection of HTTP headers.",
  ).optional(),
});

const BlockActionSchema = z.object({
  CustomResponse: CustomResponseSchema.describe("Custom response.").optional(),
});

const CountActionSchema = z.object({
  CustomRequestHandling: CustomRequestHandlingSchema.describe(
    "Custom request handling.",
  ).optional(),
});

const CaptchaActionSchema = z.object({
  CustomRequestHandling: CustomRequestHandlingSchema.describe(
    "Custom request handling.",
  ).optional(),
});

const ChallengeActionSchema = z.object({
  CustomRequestHandling: CustomRequestHandlingSchema.describe(
    "Custom request handling.",
  ).optional(),
});

const MonetizeActionSchema = z.object({
  PriceMultiplier: z.string().min(1).max(3).regex(
    new RegExp("^([1-9][0-9]?|100)$"),
  ).describe("The price multiplier for the monetize action.").optional(),
});

const RuleActionSchema = z.object({
  Allow: AllowActionSchema.describe("Allow traffic towards application.")
    .optional(),
  Block: BlockActionSchema.describe("Block traffic towards application.")
    .optional(),
  Count: CountActionSchema.describe("Count traffic towards application.")
    .optional(),
  Captcha: CaptchaActionSchema.describe(
    "Checks valid token exists with request.",
  ).optional(),
  Challenge: ChallengeActionSchema.describe(
    "Checks that the request has a valid token with an unexpired challenge timestamp and, if not, returns a browser challenge to the client.",
  ).optional(),
  Monetize: MonetizeActionSchema.describe("Monetize action for rules.")
    .optional(),
});

const LabelSchema = z.object({
  Name: z.string().regex(new RegExp("^[0-9A-Za-z_:-]{1,1024}$")).describe(
    "Name of the Label.",
  ),
});

const VisibilityConfigSchema = z.object({
  SampledRequestsEnabled: z.boolean(),
  CloudWatchMetricsEnabled: z.boolean(),
  MetricName: z.string().min(1).max(128),
});

const ImmunityTimePropertySchema = z.object({
  ImmunityTime: z.number().int().min(60).max(259200),
});

const CaptchaConfigSchema = z.object({
  ImmunityTimeProperty: ImmunityTimePropertySchema.optional(),
});

const ChallengeConfigSchema = z.object({
  ImmunityTimeProperty: ImmunityTimePropertySchema.optional(),
});

const RuleSchema = z.object({
  Name: z.string().regex(new RegExp("^[0-9A-Za-z_-]{1,128}$")).describe(
    "Name of the RuleGroup.",
  ),
  Priority: z.number().int().min(0).describe(
    "Priority of the Rule, Rules get evaluated from lower to higher priority.",
  ),
  Statement: StatementSchema.describe(
    "First level statement that contains conditions, such as ByteMatch, SizeConstraint, etc",
  ),
  Action: RuleActionSchema.describe(
    "Action taken when Rule matches its condition.",
  ).optional(),
  RuleLabels: z.array(LabelSchema).describe("Collection of Rule Labels.")
    .optional(),
  VisibilityConfig: VisibilityConfigSchema.describe(
    "Visibility Metric of the RuleGroup.",
  ),
  CaptchaConfig: CaptchaConfigSchema.optional(),
  ChallengeConfig: ChallengeConfigSchema.optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).optional(),
  Value: z.string().min(0).max(256).optional(),
});

const CustomResponseBodySchema = z.object({
  ContentType: z.enum(["TEXT_PLAIN", "TEXT_HTML", "APPLICATION_JSON"]).describe(
    "Valid values are TEXT_PLAIN, TEXT_HTML, and APPLICATION_JSON.",
  ),
  Content: z.string().min(1).max(10240).describe("Response content."),
});

const LabelSummarySchema = z.object({
  Name: z.string().regex(new RegExp("^[0-9A-Za-z_:-]{1,1024}$")).describe(
    "Name of the Label.",
  ).optional(),
});

const PriceSchema = z.object({
  Amount: z.string().min(1).max(13).regex(
    new RegExp(
      "^([1-9][0-9]*(\\.[0-9]{1,3})?|0\\.([1-9][0-9]{0,2}|0[1-9][0-9]?|00[1-9]))$",
    ),
  ).describe("The price amount."),
  Currency: z.enum(["USDC"]).describe("The cryptocurrency to use for payment."),
});

const PaymentNetworkSchema = z.object({
  Chain: z.enum(["BASE", "SOLANA", "BASE_SEPOLIA", "SOLANA_DEVNET"]).describe(
    "The blockchain chain to use.",
  ),
  WalletAddress: z.string().min(26).max(44).regex(new RegExp(".*\\S.*"))
    .describe("The wallet address for receiving payments."),
  Prices: z.array(PriceSchema).describe("List of price configurations."),
});

const CryptoConfigSchema = z.object({
  PaymentNetworks: z.array(PaymentNetworkSchema).describe(
    "List of payment network configurations.",
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
    "AWS region; overrides AWS_REGION / AWS_DEFAULT_REGION environment variables and ~/.aws/config profile region. Defaults to us-east-1.",
  ).optional(),
  Capacity: z.number().int().min(0),
  Description: z.string().regex(
    new RegExp(
      "^[a-zA-Z0-9=:#@/\\-,.][a-zA-Z0-9+=:#@/\\-,.\\s]+[a-zA-Z0-9+=:#@/\\-,.]{1,256}$",
    ),
  ).describe("Description of the entity.").optional(),
  Name: z.string().regex(new RegExp("^[0-9A-Za-z_-]{1,128}$")).describe(
    "Name of the RuleGroup.",
  ).optional(),
  Scope: z.enum(["CLOUDFRONT", "REGIONAL"]).describe(
    "Use CLOUDFRONT for CloudFront RuleGroup, use REGIONAL for Application Load Balancer and API Gateway.",
  ),
  Rules: z.array(RuleSchema).describe("Collection of Rules.").optional(),
  VisibilityConfig: z.object({
    SampledRequestsEnabled: z.boolean(),
    CloudWatchMetricsEnabled: z.boolean(),
    MetricName: z.string().min(1).max(128),
  }).describe("Visibility Metric of the RuleGroup."),
  Tags: z.array(TagSchema).optional(),
  CustomResponseBodies: z.record(z.string(), CustomResponseBodySchema).describe(
    "Custom response key and body map.",
  ).optional(),
  AvailableLabels: z.array(LabelSummarySchema).describe(
    "Collection of Available Labels.",
  ).optional(),
  ConsumedLabels: z.array(LabelSummarySchema).describe(
    "Collection of Consumed Labels.",
  ).optional(),
  MonetizationConfig: z.object({
    CryptoConfig: CryptoConfigSchema.describe(
      "Configures cryptocurrency payment settings.",
    ).optional(),
    CurrencyMode: z.enum(["REAL", "TEST"]).describe(
      "The currency mode for monetization. Use REAL for production payments and TEST for testing with testnet currencies.",
    ).optional(),
  }).describe("Configures monetization for the web ACL or rule group.")
    .optional(),
});

const StateSchema = z.object({
  Arn: z.string().optional(),
  Capacity: z.number().optional(),
  Description: z.string().optional(),
  Name: z.string(),
  Id: z.string(),
  Scope: z.string(),
  Rules: z.array(RuleSchema).optional(),
  VisibilityConfig: VisibilityConfigSchema.optional(),
  Tags: z.array(TagSchema).optional(),
  LabelNamespace: z.string().optional(),
  CustomResponseBodies: z.record(z.string(), z.unknown()).optional(),
  AvailableLabels: z.array(LabelSummarySchema).optional(),
  ConsumedLabels: z.array(LabelSummarySchema).optional(),
  MonetizationConfig: z.object({
    CryptoConfig: CryptoConfigSchema,
    CurrencyMode: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Capacity: z.number().int().min(0).optional(),
  Description: z.string().regex(
    new RegExp(
      "^[a-zA-Z0-9=:#@/\\-,.][a-zA-Z0-9+=:#@/\\-,.\\s]+[a-zA-Z0-9+=:#@/\\-,.]{1,256}$",
    ),
  ).describe("Description of the entity.").optional(),
  Name: z.string().regex(new RegExp("^[0-9A-Za-z_-]{1,128}$")).describe(
    "Name of the RuleGroup.",
  ).optional(),
  Scope: z.enum(["CLOUDFRONT", "REGIONAL"]).describe(
    "Use CLOUDFRONT for CloudFront RuleGroup, use REGIONAL for Application Load Balancer and API Gateway.",
  ).optional(),
  Rules: z.array(RuleSchema).describe("Collection of Rules.").optional(),
  VisibilityConfig: z.object({
    SampledRequestsEnabled: z.boolean().optional(),
    CloudWatchMetricsEnabled: z.boolean().optional(),
    MetricName: z.string().min(1).max(128).optional(),
  }).describe("Visibility Metric of the RuleGroup.").optional(),
  Tags: z.array(TagSchema).optional(),
  CustomResponseBodies: z.record(z.string(), CustomResponseBodySchema).describe(
    "Custom response key and body map.",
  ).optional(),
  AvailableLabels: z.array(LabelSummarySchema).describe(
    "Collection of Available Labels.",
  ).optional(),
  ConsumedLabels: z.array(LabelSummarySchema).describe(
    "Collection of Consumed Labels.",
  ).optional(),
  MonetizationConfig: z.object({
    CryptoConfig: CryptoConfigSchema.describe(
      "Configures cryptocurrency payment settings.",
    ).optional(),
    CurrencyMode: z.enum(["REAL", "TEST"]).describe(
      "The currency mode for monetization. Use REAL for production payments and TEST for testing with testnet currencies.",
    ).optional(),
  }).describe("Configures monetization for the web ACL or rule group.")
    .optional(),
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

/** Swamp extension model for WAFv2 RuleGroup. Registered at `@swamp/aws/wafv2/rule-group`. */
export const model = {
  type: "@swamp/aws/wafv2/rule-group",
  version: "2026.10.25.1",
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
    {
      toVersion: "2026.06.15.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.18.1",
      description: "Added: MonetizationConfig",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.17.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.17.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.25.1",
      description: "Added: Name",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "WAFv2 RuleGroup resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a WAFv2 RuleGroup",
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
          "AWS::WAFv2::RuleGroup",
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
      description: "Get a WAFv2 RuleGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the WAFv2 RuleGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::WAFv2::RuleGroup",
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
      description: "Update a WAFv2 RuleGroup",
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
        const idParts = [
          existing.Name?.toString(),
          existing.Id?.toString(),
          existing.Scope?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::WAFv2::RuleGroup",
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
          "AWS::WAFv2::RuleGroup",
          identifier,
          currentState,
          desiredState,
          ["Name", "Scope"],
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
      description: "Delete a WAFv2 RuleGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the WAFv2 RuleGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::WAFv2::RuleGroup",
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
      description: "Sync WAFv2 RuleGroup state from AWS",
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
        const idParts = [
          existing.Name?.toString(),
          existing.Id?.toString(),
          existing.Scope?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::WAFv2::RuleGroup",
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
    list: {
      description: "List WAFv2 RuleGroup resources",
      arguments: z.object({
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
        resourceModel: z.string().describe(
          "JSON resource model for parent-scoped listing (e.g. parent identifier)",
        ).optional(),
      }),
      execute: async (
        args: { maxPages?: number; resourceModel?: string },
        context: any,
      ) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { items, nextToken } = await listResources(
          "AWS::WAFv2::RuleGroup",
          {
            resourceModel: args.resourceModel,
            maxPages: args.maxPages,
            credentials,
          },
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const instanceName = item.identifier.replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, "");
          const handle = await context.writeResource("state", instanceName, {
            ...item.properties,
            _identifier: item.identifier,
          });
          dataHandles.push(handle);
        }
        return {
          dataHandles,
          result: { count: items.length, nextPageToken: nextToken },
        };
      },
    },
  },
};
