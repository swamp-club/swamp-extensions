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

// Auto-generated extension model for @swamp/aws/wafv2/web-acl
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for WAFv2 WebACL (AWS::WAFv2::WebACL).
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

const RequestBodyAssociatedResourceTypeConfigSchema = z.object({
  DefaultSizeInspectionLimit: z.enum(["KB_16", "KB_32", "KB_48", "KB_64"]),
});

const ImmunityTimePropertySchema = z.object({
  ImmunityTime: z.number().int().min(60).max(259200),
});

const FieldToProtectSchema = z.object({
  FieldKeys: z.array(z.string().min(1).max(64)).describe(
    "List of field keys to protect",
  ).optional(),
  FieldType: z.enum([
    "SINGLE_HEADER",
    "SINGLE_COOKIE",
    "SINGLE_QUERY_ARGUMENT",
    "QUERY_STRING",
    "BODY",
  ]).describe("Field type to protect"),
});

const DataProtectSchema = z.object({
  Field: FieldToProtectSchema.describe("Field in log to protect."),
  Action: z.enum(["SUBSTITUTION", "HASH"]),
  ExcludeRateBasedDetails: z.boolean().optional(),
  ExcludeRuleMatchDetails: z.boolean().optional(),
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
  Prices: z.array(PriceSchema).describe("List of price configurations."),
  WalletAddress: z.string().min(26).max(44).regex(new RegExp(".*\\S.*"))
    .describe("The wallet address for receiving payments."),
});

const CryptoConfigSchema = z.object({
  PaymentNetworks: z.array(PaymentNetworkSchema).describe(
    "List of payment network configurations.",
  ),
});

const MonetizeActionSchema = z.object({
  PriceMultiplier: z.string().min(1).max(3).regex(
    new RegExp("^([1-9][0-9]?|100)$"),
  ).describe("The price multiplier for the monetize action.").optional(),
});

const CustomHTTPHeaderSchema = z.object({
  Value: z.string().min(1).max(255).describe("HTTP header value."),
  Name: z.string().min(1).max(64).describe("HTTP header name."),
});

const CustomRequestHandlingSchema = z.object({
  InsertHeaders: z.array(CustomHTTPHeaderSchema).describe(
    "Collection of HTTP headers.",
  ),
});

const CaptchaActionSchema = z.object({
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

const AllowActionSchema = z.object({
  CustomRequestHandling: CustomRequestHandlingSchema.describe(
    "Custom request handling.",
  ).optional(),
});

const ChallengeActionSchema = z.object({
  CustomRequestHandling: CustomRequestHandlingSchema.describe(
    "Custom request handling.",
  ).optional(),
});

const RuleActionSchema = z.object({
  Monetize: MonetizeActionSchema.describe("Monetize action for rules.")
    .optional(),
  Captcha: CaptchaActionSchema.describe(
    "Checks valid token exists with request.",
  ).optional(),
  Block: BlockActionSchema.describe("Block traffic towards application.")
    .optional(),
  Count: CountActionSchema.describe("Allow traffic towards application.")
    .optional(),
  Allow: AllowActionSchema.describe("Allow traffic towards application.")
    .optional(),
  Challenge: ChallengeActionSchema.describe(
    "Checks that the request has a valid token with an unexpired challenge timestamp and, if not, returns a browser challenge to the client.",
  ).optional(),
});

const TextTransformationSchema = z.object({
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
  Priority: z.number().int().min(0).describe(
    "Priority of Rule being evaluated.",
  ),
});

const PreParseTextTransformationSchema = z.object({
  Type: z.enum([
    "NONE",
    "URL_DECODE",
    "URL_DECODE_UNI",
    "COMBINE_DUPLICATE_QUERY_ARGS_BY_COMMA",
    "REPLACE_SEMICOLONS_WITH_AMPERSANDS",
  ]).describe("Type of pre-parse text transformation."),
  Priority: z.number().int().min(0).describe(
    "Priority of PreParseTextTransformation being applied.",
  ),
});

const JA3FingerprintSchema = z.object({
  FallbackBehavior: z.enum(["MATCH", "NO_MATCH"]),
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
  MatchScope: z.enum(["ALL", "KEY", "VALUE"]).describe(
    "The parts of the request to match against using the MatchPattern.",
  ),
  MatchPattern: HeaderMatchPatternSchema.describe(
    "The pattern to look for in the request headers.",
  ),
  OversizeHandling: z.enum(["CONTINUE", "MATCH", "NO_MATCH"]).describe(
    "Handling of requests containing oversize fields",
  ),
});

const UriFragmentSchema = z.object({
  FallbackBehavior: z.enum(["MATCH", "NO_MATCH"]).optional(),
});

const JsonMatchPatternSchema = z.object({
  All: z.record(z.string(), z.unknown()).describe(
    "Inspect all parts of the web request's JSON body.",
  ).optional(),
  IncludedPaths: z.array(z.string()).optional(),
});

const JsonBodySchema = z.object({
  MatchScope: z.enum(["ALL", "KEY", "VALUE"]).describe(
    "The parts of the JSON to match against using the MatchPattern.",
  ),
  MatchPattern: JsonMatchPatternSchema.describe(
    "The pattern to look for in the JSON body.",
  ),
  InvalidFallbackBehavior: z.enum(["MATCH", "NO_MATCH", "EVALUATE_AS_STRING"])
    .describe(
      "The inspection behavior to fall back to if the JSON in the request body is invalid.",
    ).optional(),
  OversizeHandling: z.enum(["CONTINUE", "MATCH", "NO_MATCH"]).describe(
    "Handling of requests containing oversize fields",
  ).optional(),
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
  MatchScope: z.enum(["ALL", "KEY", "VALUE"]).describe(
    "The parts of the request to match against using the MatchPattern.",
  ),
  MatchPattern: CookieMatchPatternSchema.describe(
    "The pattern to look for in the request cookies.",
  ),
  OversizeHandling: z.enum(["CONTINUE", "MATCH", "NO_MATCH"]).describe(
    "Handling of requests containing oversize fields",
  ),
});

const JA4FingerprintSchema = z.object({
  FallbackBehavior: z.enum(["MATCH", "NO_MATCH"]),
});

const HeaderOrderSchema = z.object({
  OversizeHandling: z.enum(["CONTINUE", "MATCH", "NO_MATCH"]).describe(
    "Handling of requests containing oversize fields",
  ),
});

const BodySchema = z.object({
  OversizeHandling: z.enum(["CONTINUE", "MATCH", "NO_MATCH"]).describe(
    "Handling of requests containing oversize fields",
  ).optional(),
});

const FieldToMatchSchema = z.object({
  AllQueryArguments: z.record(z.string(), z.unknown()).describe(
    "All query arguments of a web request.",
  ).optional(),
  JA3Fingerprint: JA3FingerprintSchema.describe(
    "Includes the JA3 fingerprint of a web request.",
  ).optional(),
  SingleQueryArgument: z.object({
    Name: z.string(),
  }).describe(
    "One query argument in a web request, identified by name, for example UserName or SalesRegion. The name can be up to 30 characters long and isn't case sensitive.",
  ).optional(),
  QueryString: z.record(z.string(), z.unknown()).describe(
    "The query string of a web request. This is the part of a URL that appears after a? character, if any.",
  ).optional(),
  Headers: HeadersSchema.describe("Includes headers of a web request.")
    .optional(),
  Method: z.record(z.string(), z.unknown()).describe(
    "The HTTP method of a web request. The method indicates the type of operation that the request is asking the origin to perform.",
  ).optional(),
  UriFragment: UriFragmentSchema.describe(
    "The path component of the URI Fragment. This is the part of a web request that identifies a fragment uri, for example, /abcd#introduction",
  ).optional(),
  JsonBody: JsonBodySchema.describe(
    "Inspect the request body as JSON. The request body immediately follows the request headers.",
  ).optional(),
  UriPath: z.record(z.string(), z.unknown()).describe(
    "The path component of the URI of a web request. This is the part of a web request that identifies a resource, for example, /images/daily-ad.jpg.",
  ).optional(),
  Cookies: CookiesSchema.describe("Includes cookies of a web request.")
    .optional(),
  JA4Fingerprint: JA4FingerprintSchema.describe(
    "Includes the JA4 fingerprint of a web request.",
  ).optional(),
  HeaderOrder: HeaderOrderSchema.describe(
    "The string containing the list of a web request's header names, ordered as they appear in the web request, separated by colons.",
  ).optional(),
  Body: BodySchema.describe(
    "The body of a web request. This immediately follows the request headers.",
  ).optional(),
  SingleHeader: z.object({
    Name: z.string(),
  }).optional(),
});

const SizeConstraintStatementSchema = z.object({
  ComparisonOperator: z.enum(["EQ", "NE", "LE", "LT", "GE", "GT"]),
  TextTransformations: z.array(TextTransformationSchema),
  PreParseTextTransformations: z.array(PreParseTextTransformationSchema)
    .optional(),
  Size: z.number().min(0).max(21474836480),
  FieldToMatch: FieldToMatchSchema.describe("Field of the request to match."),
});

const AndStatementSchema = z.object({
  Statements: z.array(z.record(z.string(), z.unknown())),
});

const XssMatchStatementSchema = z.object({
  TextTransformations: z.array(TextTransformationSchema),
  PreParseTextTransformations: z.array(PreParseTextTransformationSchema)
    .optional(),
  FieldToMatch: FieldToMatchSchema.describe("Field of the request to match."),
});

const NotStatementSchema = z.object({
  Statement: z.record(z.string(), z.unknown()).describe(
    "First level statement that contains conditions, such as ByteMatch, SizeConstraint, etc",
  ),
});

const ByteMatchStatementSchema = z.object({
  SearchStringBase64: z.string().describe(
    "Base64 encoded string that is searched to find a match.",
  ).optional(),
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
  SearchString: z.string().describe("String that is searched to find a match.")
    .optional(),
  FieldToMatch: FieldToMatchSchema.describe("Field of the request to match."),
});

const RateLimitCookieSchema = z.object({
  TextTransformations: z.array(TextTransformationSchema),
  Name: z.string().min(1).max(64).regex(new RegExp(".*\\S.*")).describe(
    "The name of the cookie to use.",
  ),
});

const RateLimitQueryArgumentSchema = z.object({
  TextTransformations: z.array(TextTransformationSchema),
  Name: z.string().min(1).max(64).regex(new RegExp(".*\\S.*")).describe(
    "The name of the query argument to use.",
  ),
});

const RateLimitJA3FingerprintSchema = z.object({
  FallbackBehavior: z.enum(["MATCH", "NO_MATCH"]),
});

const RateLimitHeaderSchema = z.object({
  TextTransformations: z.array(TextTransformationSchema),
  Name: z.string().min(1).max(64).regex(new RegExp(".*\\S.*")).describe(
    "The name of the header to use.",
  ),
});

const RateLimitQueryStringSchema = z.object({
  TextTransformations: z.array(TextTransformationSchema),
});

const RateLimitUriPathSchema = z.object({
  TextTransformations: z.array(TextTransformationSchema),
});

const RateLimitJA4FingerprintSchema = z.object({
  FallbackBehavior: z.enum(["MATCH", "NO_MATCH"]),
});

const RateLimitLabelNamespaceSchema = z.object({
  Namespace: z.string().regex(new RegExp("^[0-9A-Za-z_:.-]{1,1024}$")).describe(
    "The namespace to use for aggregation.",
  ),
});

const RateBasedStatementCustomKeySchema = z.object({
  Cookie: RateLimitCookieSchema.describe(
    "Specifies a cookie as an aggregate key for a rate-based rule.",
  ).optional(),
  ForwardedIP: z.record(z.string(), z.unknown()).describe(
    "Specifies the first IP address in an HTTP header as an aggregate key for a rate-based rule.",
  ).optional(),
  QueryArgument: RateLimitQueryArgumentSchema.describe(
    "Specifies a query argument in the request as an aggregate key for a rate-based rule.",
  ).optional(),
  JA3Fingerprint: RateLimitJA3FingerprintSchema.describe(
    "Specifies the request's JA3 fingerprint as an aggregate key for a rate-based rule.",
  ).optional(),
  Header: RateLimitHeaderSchema.describe(
    "Specifies a header as an aggregate key for a rate-based rule.",
  ).optional(),
  HTTPMethod: z.record(z.string(), z.unknown()).describe(
    "Specifies the request's HTTP method as an aggregate key for a rate-based rule.",
  ).optional(),
  QueryString: RateLimitQueryStringSchema.describe(
    "Specifies the request's query string as an aggregate key for a rate-based rule.",
  ).optional(),
  UriPath: RateLimitUriPathSchema.describe(
    "Specifies the request's URI Path as an aggregate key for a rate-based rule.",
  ).optional(),
  IP: z.record(z.string(), z.unknown()).describe(
    "Specifies the IP address in the web request as an aggregate key for a rate-based rule.",
  ).optional(),
  JA4Fingerprint: RateLimitJA4FingerprintSchema.describe(
    "Specifies the request's JA4 fingerprint as an aggregate key for a rate-based rule.",
  ).optional(),
  ASN: z.record(z.string(), z.unknown()).describe(
    "Specifies the request's ASN as an aggregate key for a rate-based rule.",
  ).optional(),
  LabelNamespace: RateLimitLabelNamespaceSchema.describe(
    "Specifies a label namespace to use as an aggregate key for a rate-based rule.",
  ).optional(),
});

const ForwardedIPConfigurationSchema = z.object({
  FallbackBehavior: z.enum(["MATCH", "NO_MATCH"]),
  HeaderName: z.string(),
});

const RateBasedStatementSchema = z.object({
  AggregateKeyType: z.enum(["CONSTANT", "IP", "FORWARDED_IP", "CUSTOM_KEYS"]),
  CustomKeys: z.array(RateBasedStatementCustomKeySchema).describe(
    "Specifies the aggregate keys to use in a rate-base rule.",
  ).optional(),
  ForwardedIPConfig: ForwardedIPConfigurationSchema.optional(),
  Limit: z.number().int().min(10).max(2000000000),
  EvaluationWindowSec: z.union([
    z.literal(60),
    z.literal(120),
    z.literal(300),
    z.literal(600),
  ]).optional(),
  ScopeDownStatement: z.record(z.string(), z.unknown()).describe(
    "First level statement that contains conditions, such as ByteMatch, SizeConstraint, etc",
  ).optional(),
});

const GeoMatchStatementSchema = z.object({
  ForwardedIPConfig: ForwardedIPConfigurationSchema.optional(),
  CountryCodes: z.array(z.string().min(1).max(2)).optional(),
});

const RuleActionOverrideSchema = z.object({
  ActionToUse: RuleActionSchema.describe(
    "Action taken when Rule matches its condition.",
  ),
  Name: z.string().regex(new RegExp("^[0-9A-Za-z_-]{1,128}$")).describe(
    "Name of the WebACL.",
  ),
});

const ExcludedRuleSchema = z.object({
  Name: z.string().regex(new RegExp("^[0-9A-Za-z_-]{1,128}$")).describe(
    "Name of the WebACL.",
  ),
});

const RuleGroupReferenceStatementSchema = z.object({
  RuleActionOverrides: z.array(RuleActionOverrideSchema).describe(
    "Action overrides for rules in the rule group.",
  ).optional(),
  Arn: z.string().min(20).max(2048).describe("ARN of the WAF entity."),
  ExcludedRules: z.array(ExcludedRuleSchema).optional(),
});

const LabelMatchStatementSchema = z.object({
  Scope: z.enum(["LABEL", "NAMESPACE"]),
  Key: z.string().regex(new RegExp("^[0-9A-Za-z_:.-]{1,1024}$")),
});

const RegexMatchStatementSchema = z.object({
  TextTransformations: z.array(TextTransformationSchema),
  PreParseTextTransformations: z.array(PreParseTextTransformationSchema)
    .optional(),
  RegexString: z.string().min(1).max(512),
  FieldToMatch: FieldToMatchSchema.describe("Field of the request to match."),
});

const SqliMatchStatementSchema = z.object({
  SensitivityLevel: z.enum(["LOW", "HIGH"]).describe(
    "Sensitivity Level current only used for sqli match statements.",
  ).optional(),
  TextTransformations: z.array(TextTransformationSchema),
  PreParseTextTransformations: z.array(PreParseTextTransformationSchema)
    .optional(),
  FieldToMatch: FieldToMatchSchema.describe("Field of the request to match."),
});

const RegexPatternSetReferenceStatementSchema = z.object({
  TextTransformations: z.array(TextTransformationSchema),
  PreParseTextTransformations: z.array(PreParseTextTransformationSchema)
    .optional(),
  Arn: z.string().min(20).max(2048).describe("ARN of the WAF entity."),
  FieldToMatch: FieldToMatchSchema.describe("Field of the request to match."),
});

const OrStatementSchema = z.object({
  Statements: z.array(z.record(z.string(), z.unknown())),
});

const AsnMatchStatementSchema = z.object({
  ForwardedIPConfig: ForwardedIPConfigurationSchema.optional(),
  AsnList: z.array(z.number().int().min(0).max(4294967295)).optional(),
});

const RegexSchema = z.object({
  RegexString: z.string().min(1).max(512).optional(),
});

const ClientSideActionSchema = z.object({
  UsageOfAction: z.enum(["ENABLED", "DISABLED"]),
  Sensitivity: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  ExemptUriRegularExpressions: z.array(RegexSchema).optional(),
});

const ClientSideActionConfigSchema = z.object({
  Challenge: ClientSideActionSchema.describe(
    "Client side action config for AntiDDOS AMR.",
  ),
});

const AWSManagedRulesAntiDDoSRuleSetSchema = z.object({
  ClientSideActionConfig: ClientSideActionConfigSchema.describe(
    "Client side action config for AntiDDOS AMR.",
  ),
  SensitivityToBlock: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
});

const FieldIdentifierSchema = z.object({
  Identifier: z.string().min(1).max(512).regex(new RegExp(".*\\S.*")),
});

const ResponseInspectionHeaderSchema = z.object({
  SuccessValues: z.array(
    z.string().min(1).max(100).regex(new RegExp(".*\\S.*")),
  ),
  FailureValues: z.array(
    z.string().min(1).max(100).regex(new RegExp(".*\\S.*")),
  ),
  Name: z.string().min(1).max(200).regex(new RegExp(".*\\S.*")),
});

const ResponseInspectionBodyContainsSchema = z.object({
  SuccessStrings: z.array(
    z.string().min(1).max(100).regex(new RegExp(".*\\S.*")),
  ),
  FailureStrings: z.array(
    z.string().min(1).max(100).regex(new RegExp(".*\\S.*")),
  ),
});

const ResponseInspectionJsonSchema = z.object({
  Identifier: z.string().min(1).max(512).regex(new RegExp(".*\\S.*")),
  SuccessValues: z.array(
    z.string().min(1).max(100).regex(new RegExp(".*\\S.*")),
  ),
  FailureValues: z.array(
    z.string().min(1).max(100).regex(new RegExp(".*\\S.*")),
  ),
});

const ResponseInspectionStatusCodeSchema = z.object({
  SuccessCodes: z.array(z.number().int()),
  FailureCodes: z.array(z.number().int()),
});

const ResponseInspectionSchema = z.object({
  Header: ResponseInspectionHeaderSchema.describe(
    "Response headers that indicate success or failure of a login request",
  ).optional(),
  BodyContains: ResponseInspectionBodyContainsSchema.describe(
    "Response body contents that indicate success or failure of a login request",
  ).optional(),
  Json: ResponseInspectionJsonSchema.describe(
    "Response JSON that indicate success or failure of a login request",
  ).optional(),
  StatusCode: ResponseInspectionStatusCodeSchema.describe(
    "Response status codes that indicate success or failure of a login request",
  ).optional(),
});

const RequestInspectionSchema = z.object({
  UsernameField: FieldIdentifierSchema,
  PasswordField: FieldIdentifierSchema,
  PayloadType: z.enum(["JSON", "FORM_ENCODED"]),
});

const AWSManagedRulesATPRuleSetSchema = z.object({
  ResponseInspection: ResponseInspectionSchema.describe(
    "Configures the inspection of login responses",
  ).optional(),
  EnableRegexInPath: z.boolean().optional(),
  LoginPath: z.string(),
  RequestInspection: RequestInspectionSchema.describe(
    "Configures the inspection of login requests",
  ).optional(),
});

const AWSManagedRulesBotControlRuleSetSchema = z.object({
  InspectionLevel: z.enum(["COMMON", "TARGETED"]),
  EnableMachineLearning: z.boolean().optional(),
});

const AddressFieldSchema = z.object({
  Identifier: z.string().min(1).max(512).regex(new RegExp(".*\\S.*")),
});

const PhoneNumberFieldSchema = z.object({
  Identifier: z.string().min(1).max(512).regex(new RegExp(".*\\S.*")),
});

const RequestInspectionACFPSchema = z.object({
  UsernameField: FieldIdentifierSchema.optional(),
  EmailField: FieldIdentifierSchema.optional(),
  PasswordField: FieldIdentifierSchema.optional(),
  AddressFields: z.array(AddressFieldSchema).optional(),
  PayloadType: z.enum(["JSON", "FORM_ENCODED"]),
  PhoneNumberFields: z.array(PhoneNumberFieldSchema).optional(),
});

const AWSManagedRulesACFPRuleSetSchema = z.object({
  RegistrationPagePath: z.string(),
  ResponseInspection: ResponseInspectionSchema.describe(
    "Configures the inspection of login responses",
  ).optional(),
  CreationPath: z.string(),
  EnableRegexInPath: z.boolean().optional(),
  RequestInspection: RequestInspectionACFPSchema.describe(
    "Configures the inspection of sign-up requests",
  ),
});

const ManagedRuleGroupConfigSchema = z.object({
  AWSManagedRulesAntiDDoSRuleSet: AWSManagedRulesAntiDDoSRuleSetSchema.describe(
    "Configures how to use the AntiDDOS AWS managed rule group in the web ACL",
  ).optional(),
  UsernameField: FieldIdentifierSchema.optional(),
  LoginPath: z.string().min(1).max(256).regex(new RegExp(".*\\S.*")).optional(),
  AWSManagedRulesATPRuleSet: AWSManagedRulesATPRuleSetSchema.describe(
    "Configures how to use the Account Takeover Prevention managed rule group in the web ACL",
  ).optional(),
  AWSManagedRulesBotControlRuleSet: AWSManagedRulesBotControlRuleSetSchema
    .describe(
      "Configures how to use the Bot Control managed rule group in the web ACL",
    ).optional(),
  PasswordField: FieldIdentifierSchema.optional(),
  AWSManagedRulesACFPRuleSet: AWSManagedRulesACFPRuleSetSchema.describe(
    "Configures how to use the Account creation fraud prevention managed rule group in the web ACL",
  ).optional(),
  PayloadType: z.enum(["JSON", "FORM_ENCODED"]).optional(),
});

const ManagedRuleGroupStatementSchema = z.object({
  VendorName: z.string(),
  Version: z.string().min(1).max(64).regex(new RegExp("^[\\w#:\\.\\-/]+$"))
    .optional(),
  RuleActionOverrides: z.array(RuleActionOverrideSchema).describe(
    "Action overrides for rules in the rule group.",
  ).optional(),
  ManagedRuleGroupConfigs: z.array(ManagedRuleGroupConfigSchema).describe(
    "Collection of ManagedRuleGroupConfig.",
  ).optional(),
  ExcludedRules: z.array(ExcludedRuleSchema).optional(),
  Name: z.string().regex(new RegExp("^[0-9A-Za-z_-]{1,128}$")).describe(
    "Name of the WebACL.",
  ),
  ScopeDownStatement: z.record(z.string(), z.unknown()).describe(
    "First level statement that contains conditions, such as ByteMatch, SizeConstraint, etc",
  ).optional(),
});

const IPSetForwardedIPConfigurationSchema = z.object({
  FallbackBehavior: z.enum(["MATCH", "NO_MATCH"]),
  HeaderName: z.string(),
  Position: z.enum(["FIRST", "LAST", "ANY"]),
});

const IPSetReferenceStatementSchema = z.object({
  IPSetForwardedIPConfig: IPSetForwardedIPConfigurationSchema.optional(),
  Arn: z.string().min(20).max(2048).describe("ARN of the WAF entity."),
});

const StatementSchema = z.object({
  SizeConstraintStatement: SizeConstraintStatementSchema.describe(
    "Size Constraint statement.",
  ).optional(),
  AndStatement: AndStatementSchema.optional(),
  XssMatchStatement: XssMatchStatementSchema.describe("Xss Match Statement.")
    .optional(),
  NotStatement: NotStatementSchema.optional(),
  ByteMatchStatement: ByteMatchStatementSchema.describe("Byte Match statement.")
    .optional(),
  RateBasedStatement: RateBasedStatementSchema.optional(),
  GeoMatchStatement: GeoMatchStatementSchema.optional(),
  RuleGroupReferenceStatement: RuleGroupReferenceStatementSchema.optional(),
  LabelMatchStatement: LabelMatchStatementSchema.optional(),
  RegexMatchStatement: RegexMatchStatementSchema.optional(),
  SqliMatchStatement: SqliMatchStatementSchema.describe("Sqli Match Statement.")
    .optional(),
  RegexPatternSetReferenceStatement: RegexPatternSetReferenceStatementSchema
    .optional(),
  OrStatement: OrStatementSchema.optional(),
  AsnMatchStatement: AsnMatchStatementSchema.optional(),
  ManagedRuleGroupStatement: ManagedRuleGroupStatementSchema.optional(),
  IPSetReferenceStatement: IPSetReferenceStatementSchema.optional(),
});

const ChallengeConfigSchema = z.object({
  ImmunityTimeProperty: ImmunityTimePropertySchema.optional(),
});

const OverrideActionSchema = z.object({
  Count: z.record(z.string(), z.unknown()).describe(
    "Count traffic towards application.",
  ).optional(),
  None: z.record(z.string(), z.unknown()).describe(
    "Keep the RuleGroup or ManagedRuleGroup behavior as is.",
  ).optional(),
});

const LabelSchema = z.object({
  Name: z.string().regex(new RegExp("^[0-9A-Za-z_:.-]{1,1024}$")).describe(
    "Name of the Label.",
  ),
});

const VisibilityConfigSchema = z.object({
  MetricName: z.string().min(1).max(128),
  SampledRequestsEnabled: z.boolean(),
  CloudWatchMetricsEnabled: z.boolean(),
});

const CaptchaConfigSchema = z.object({
  ImmunityTimeProperty: ImmunityTimePropertySchema.optional(),
});

const RuleSchema = z.object({
  Action: RuleActionSchema.describe(
    "Action taken when Rule matches its condition.",
  ).optional(),
  Priority: z.number().int().min(0).describe(
    "Priority of the Rule, Rules get evaluated from lower to higher priority.",
  ),
  Statement: StatementSchema.describe(
    "First level statement that contains conditions, such as ByteMatch, SizeConstraint, etc",
  ),
  ChallengeConfig: ChallengeConfigSchema.optional(),
  OverrideAction: OverrideActionSchema.describe(
    "Override a RuleGroup or ManagedRuleGroup behavior. This can only be applied to Rule that has RuleGroupReferenceStatement or ManagedRuleGroupReferenceStatement.",
  ).optional(),
  RuleLabels: z.array(LabelSchema).describe("Collection of Rule Labels.")
    .optional(),
  VisibilityConfig: VisibilityConfigSchema.describe(
    "Visibility Metric of the WebACL.",
  ),
  CaptchaConfig: CaptchaConfigSchema.optional(),
  Name: z.string().regex(new RegExp("^[0-9A-Za-z_-]{1,128}$")).describe(
    "Name of the WebACL.",
  ),
});

const ApplicationAttributeSchema = z.object({
  Values: z.array(z.string().min(1).max(64).regex(new RegExp("^[\\w\\-]+$")))
    .describe("Contains a list of values for that attribute"),
  Name: z.string().min(1).max(64).regex(new RegExp("^[\\w\\-]+$")).describe(
    "Specifies the attribute name.",
  ),
});

const CustomResponseBodySchema = z.object({
  ContentType: z.enum(["TEXT_PLAIN", "TEXT_HTML", "APPLICATION_JSON"]).describe(
    "Valid values are TEXT_PLAIN, TEXT_HTML, and APPLICATION_JSON.",
  ),
  Content: z.string().min(1).max(10240).describe("Response content."),
});

const TagSchema = z.object({
  Value: z.string().min(0).max(256).optional(),
  Key: z.string().min(1).max(128).optional(),
});

const ImmunityTimePropertyStateSchema = z.object({
  ImmunityTime: z.number(),
}).partial();

const FieldToProtectStateSchema = z.object({
  FieldKeys: z.array(z.string()),
  FieldType: z.string(),
}).partial();

const DataProtectStateSchema = z.object({
  Field: FieldToProtectStateSchema,
  Action: z.string(),
  ExcludeRateBasedDetails: z.boolean(),
  ExcludeRuleMatchDetails: z.boolean(),
}).partial();

const PriceStateSchema = z.object({
  Amount: z.string(),
  Currency: z.string(),
}).partial();

const PaymentNetworkStateSchema = z.object({
  Chain: z.string(),
  Prices: z.array(PriceStateSchema),
  WalletAddress: z.string(),
}).partial();

const CryptoConfigStateSchema = z.object({
  PaymentNetworks: z.array(PaymentNetworkStateSchema),
}).partial();

const MonetizeActionStateSchema = z.object({
  PriceMultiplier: z.string(),
}).partial();

const CustomHTTPHeaderStateSchema = z.object({
  Value: z.string(),
  Name: z.string(),
}).partial();

const CustomRequestHandlingStateSchema = z.object({
  InsertHeaders: z.array(CustomHTTPHeaderStateSchema),
}).partial();

const CaptchaActionStateSchema = z.object({
  CustomRequestHandling: CustomRequestHandlingStateSchema,
}).partial();

const CustomResponseStateSchema = z.object({
  ResponseCode: z.number(),
  CustomResponseBodyKey: z.string(),
  ResponseHeaders: z.array(CustomHTTPHeaderStateSchema),
}).partial();

const BlockActionStateSchema = z.object({
  CustomResponse: CustomResponseStateSchema,
}).partial();

const CountActionStateSchema = z.object({
  CustomRequestHandling: CustomRequestHandlingStateSchema,
}).partial();

const AllowActionStateSchema = z.object({
  CustomRequestHandling: CustomRequestHandlingStateSchema,
}).partial();

const ChallengeActionStateSchema = z.object({
  CustomRequestHandling: CustomRequestHandlingStateSchema,
}).partial();

const RuleActionStateSchema = z.object({
  Monetize: MonetizeActionStateSchema,
  Captcha: CaptchaActionStateSchema,
  Block: BlockActionStateSchema,
  Count: CountActionStateSchema,
  Allow: AllowActionStateSchema,
  Challenge: ChallengeActionStateSchema,
}).partial();

const TextTransformationStateSchema = z.object({
  Type: z.string(),
  Priority: z.number(),
}).partial();

const PreParseTextTransformationStateSchema = z.object({
  Type: z.string(),
  Priority: z.number(),
}).partial();

const JA3FingerprintStateSchema = z.object({
  FallbackBehavior: z.string(),
}).partial();

const HeaderMatchPatternStateSchema = z.object({
  All: z.record(z.string(), z.unknown()),
  IncludedHeaders: z.array(z.string()),
  ExcludedHeaders: z.array(z.string()),
}).partial();

const HeadersStateSchema = z.object({
  MatchScope: z.string(),
  MatchPattern: HeaderMatchPatternStateSchema,
  OversizeHandling: z.string(),
}).partial();

const UriFragmentStateSchema = z.object({
  FallbackBehavior: z.string(),
}).partial();

const JsonMatchPatternStateSchema = z.object({
  All: z.record(z.string(), z.unknown()),
  IncludedPaths: z.array(z.string()),
}).partial();

const JsonBodyStateSchema = z.object({
  MatchScope: z.string(),
  MatchPattern: JsonMatchPatternStateSchema,
  InvalidFallbackBehavior: z.string(),
  OversizeHandling: z.string(),
}).partial();

const CookieMatchPatternStateSchema = z.object({
  All: z.record(z.string(), z.unknown()),
  IncludedCookies: z.array(z.string()),
  ExcludedCookies: z.array(z.string()),
}).partial();

const CookiesStateSchema = z.object({
  MatchScope: z.string(),
  MatchPattern: CookieMatchPatternStateSchema,
  OversizeHandling: z.string(),
}).partial();

const JA4FingerprintStateSchema = z.object({
  FallbackBehavior: z.string(),
}).partial();

const HeaderOrderStateSchema = z.object({
  OversizeHandling: z.string(),
}).partial();

const BodyStateSchema = z.object({
  OversizeHandling: z.string(),
}).partial();

const FieldToMatchStateSchema = z.object({
  AllQueryArguments: z.record(z.string(), z.unknown()),
  JA3Fingerprint: JA3FingerprintStateSchema,
  SingleQueryArgument: z.object({
    Name: z.string(),
  }).partial(),
  QueryString: z.record(z.string(), z.unknown()),
  Headers: HeadersStateSchema,
  Method: z.record(z.string(), z.unknown()),
  UriFragment: UriFragmentStateSchema,
  JsonBody: JsonBodyStateSchema,
  UriPath: z.record(z.string(), z.unknown()),
  Cookies: CookiesStateSchema,
  JA4Fingerprint: JA4FingerprintStateSchema,
  HeaderOrder: HeaderOrderStateSchema,
  Body: BodyStateSchema,
  SingleHeader: z.object({
    Name: z.string(),
  }).partial(),
}).partial();

const SizeConstraintStatementStateSchema = z.object({
  ComparisonOperator: z.string(),
  TextTransformations: z.array(TextTransformationStateSchema),
  PreParseTextTransformations: z.array(PreParseTextTransformationStateSchema),
  Size: z.number(),
  FieldToMatch: FieldToMatchStateSchema,
}).partial();

const AndStatementStateSchema = z.object({
  Statements: z.array(z.record(z.string(), z.unknown())),
}).partial();

const XssMatchStatementStateSchema = z.object({
  TextTransformations: z.array(TextTransformationStateSchema),
  PreParseTextTransformations: z.array(PreParseTextTransformationStateSchema),
  FieldToMatch: FieldToMatchStateSchema,
}).partial();

const NotStatementStateSchema = z.object({
  Statement: z.record(z.string(), z.unknown()),
}).partial();

const ByteMatchStatementStateSchema = z.object({
  SearchStringBase64: z.string(),
  TextTransformations: z.array(TextTransformationStateSchema),
  PreParseTextTransformations: z.array(PreParseTextTransformationStateSchema),
  PositionalConstraint: z.string(),
  SearchString: z.string(),
  FieldToMatch: FieldToMatchStateSchema,
}).partial();

const RateLimitCookieStateSchema = z.object({
  TextTransformations: z.array(TextTransformationStateSchema),
  Name: z.string(),
}).partial();

const RateLimitQueryArgumentStateSchema = z.object({
  TextTransformations: z.array(TextTransformationStateSchema),
  Name: z.string(),
}).partial();

const RateLimitJA3FingerprintStateSchema = z.object({
  FallbackBehavior: z.string(),
}).partial();

const RateLimitHeaderStateSchema = z.object({
  TextTransformations: z.array(TextTransformationStateSchema),
  Name: z.string(),
}).partial();

const RateLimitQueryStringStateSchema = z.object({
  TextTransformations: z.array(TextTransformationStateSchema),
}).partial();

const RateLimitUriPathStateSchema = z.object({
  TextTransformations: z.array(TextTransformationStateSchema),
}).partial();

const RateLimitJA4FingerprintStateSchema = z.object({
  FallbackBehavior: z.string(),
}).partial();

const RateLimitLabelNamespaceStateSchema = z.object({
  Namespace: z.string(),
}).partial();

const RateBasedStatementCustomKeyStateSchema = z.object({
  Cookie: RateLimitCookieStateSchema,
  ForwardedIP: z.record(z.string(), z.unknown()),
  QueryArgument: RateLimitQueryArgumentStateSchema,
  JA3Fingerprint: RateLimitJA3FingerprintStateSchema,
  Header: RateLimitHeaderStateSchema,
  HTTPMethod: z.record(z.string(), z.unknown()),
  QueryString: RateLimitQueryStringStateSchema,
  UriPath: RateLimitUriPathStateSchema,
  IP: z.record(z.string(), z.unknown()),
  JA4Fingerprint: RateLimitJA4FingerprintStateSchema,
  ASN: z.record(z.string(), z.unknown()),
  LabelNamespace: RateLimitLabelNamespaceStateSchema,
}).partial();

const ForwardedIPConfigurationStateSchema = z.object({
  FallbackBehavior: z.string(),
  HeaderName: z.string(),
}).partial();

const RateBasedStatementStateSchema = z.object({
  AggregateKeyType: z.string(),
  CustomKeys: z.array(RateBasedStatementCustomKeyStateSchema),
  ForwardedIPConfig: ForwardedIPConfigurationStateSchema,
  Limit: z.number(),
  EvaluationWindowSec: z.number(),
  ScopeDownStatement: z.record(z.string(), z.unknown()),
}).partial();

const GeoMatchStatementStateSchema = z.object({
  ForwardedIPConfig: ForwardedIPConfigurationStateSchema,
  CountryCodes: z.array(z.string()),
}).partial();

const RuleActionOverrideStateSchema = z.object({
  ActionToUse: RuleActionStateSchema,
  Name: z.string(),
}).partial();

const ExcludedRuleStateSchema = z.object({
  Name: z.string(),
}).partial();

const RuleGroupReferenceStatementStateSchema = z.object({
  RuleActionOverrides: z.array(RuleActionOverrideStateSchema),
  Arn: z.string(),
  ExcludedRules: z.array(ExcludedRuleStateSchema),
}).partial();

const LabelMatchStatementStateSchema = z.object({
  Scope: z.string(),
  Key: z.string(),
}).partial();

const RegexMatchStatementStateSchema = z.object({
  TextTransformations: z.array(TextTransformationStateSchema),
  PreParseTextTransformations: z.array(PreParseTextTransformationStateSchema),
  RegexString: z.string(),
  FieldToMatch: FieldToMatchStateSchema,
}).partial();

const SqliMatchStatementStateSchema = z.object({
  SensitivityLevel: z.string(),
  TextTransformations: z.array(TextTransformationStateSchema),
  PreParseTextTransformations: z.array(PreParseTextTransformationStateSchema),
  FieldToMatch: FieldToMatchStateSchema,
}).partial();

const RegexPatternSetReferenceStatementStateSchema = z.object({
  TextTransformations: z.array(TextTransformationStateSchema),
  PreParseTextTransformations: z.array(PreParseTextTransformationStateSchema),
  Arn: z.string(),
  FieldToMatch: FieldToMatchStateSchema,
}).partial();

const OrStatementStateSchema = z.object({
  Statements: z.array(z.record(z.string(), z.unknown())),
}).partial();

const AsnMatchStatementStateSchema = z.object({
  ForwardedIPConfig: ForwardedIPConfigurationStateSchema,
  AsnList: z.array(z.number()),
}).partial();

const RegexStateSchema = z.object({
  RegexString: z.string(),
}).partial();

const ClientSideActionStateSchema = z.object({
  UsageOfAction: z.string(),
  Sensitivity: z.string(),
  ExemptUriRegularExpressions: z.array(RegexStateSchema),
}).partial();

const ClientSideActionConfigStateSchema = z.object({
  Challenge: ClientSideActionStateSchema,
}).partial();

const AWSManagedRulesAntiDDoSRuleSetStateSchema = z.object({
  ClientSideActionConfig: ClientSideActionConfigStateSchema,
  SensitivityToBlock: z.string(),
}).partial();

const FieldIdentifierStateSchema = z.object({
  Identifier: z.string(),
}).partial();

const ResponseInspectionHeaderStateSchema = z.object({
  SuccessValues: z.array(z.string()),
  FailureValues: z.array(z.string()),
  Name: z.string(),
}).partial();

const ResponseInspectionBodyContainsStateSchema = z.object({
  SuccessStrings: z.array(z.string()),
  FailureStrings: z.array(z.string()),
}).partial();

const ResponseInspectionJsonStateSchema = z.object({
  Identifier: z.string(),
  SuccessValues: z.array(z.string()),
  FailureValues: z.array(z.string()),
}).partial();

const ResponseInspectionStatusCodeStateSchema = z.object({
  SuccessCodes: z.array(z.number()),
  FailureCodes: z.array(z.number()),
}).partial();

const ResponseInspectionStateSchema = z.object({
  Header: ResponseInspectionHeaderStateSchema,
  BodyContains: ResponseInspectionBodyContainsStateSchema,
  Json: ResponseInspectionJsonStateSchema,
  StatusCode: ResponseInspectionStatusCodeStateSchema,
}).partial();

const RequestInspectionStateSchema = z.object({
  UsernameField: FieldIdentifierStateSchema,
  PasswordField: FieldIdentifierStateSchema,
  PayloadType: z.string(),
}).partial();

const AWSManagedRulesATPRuleSetStateSchema = z.object({
  ResponseInspection: ResponseInspectionStateSchema,
  EnableRegexInPath: z.boolean(),
  LoginPath: z.string(),
  RequestInspection: RequestInspectionStateSchema,
}).partial();

const AWSManagedRulesBotControlRuleSetStateSchema = z.object({
  InspectionLevel: z.string(),
  EnableMachineLearning: z.boolean(),
}).partial();

const AddressFieldStateSchema = z.object({
  Identifier: z.string(),
}).partial();

const PhoneNumberFieldStateSchema = z.object({
  Identifier: z.string(),
}).partial();

const RequestInspectionACFPStateSchema = z.object({
  UsernameField: FieldIdentifierStateSchema,
  EmailField: FieldIdentifierStateSchema,
  PasswordField: FieldIdentifierStateSchema,
  AddressFields: z.array(AddressFieldStateSchema),
  PayloadType: z.string(),
  PhoneNumberFields: z.array(PhoneNumberFieldStateSchema),
}).partial();

const AWSManagedRulesACFPRuleSetStateSchema = z.object({
  RegistrationPagePath: z.string(),
  ResponseInspection: ResponseInspectionStateSchema,
  CreationPath: z.string(),
  EnableRegexInPath: z.boolean(),
  RequestInspection: RequestInspectionACFPStateSchema,
}).partial();

const ManagedRuleGroupConfigStateSchema = z.object({
  AWSManagedRulesAntiDDoSRuleSet: AWSManagedRulesAntiDDoSRuleSetStateSchema,
  UsernameField: FieldIdentifierStateSchema,
  LoginPath: z.string(),
  AWSManagedRulesATPRuleSet: AWSManagedRulesATPRuleSetStateSchema,
  AWSManagedRulesBotControlRuleSet: AWSManagedRulesBotControlRuleSetStateSchema,
  PasswordField: FieldIdentifierStateSchema,
  AWSManagedRulesACFPRuleSet: AWSManagedRulesACFPRuleSetStateSchema,
  PayloadType: z.string(),
}).partial();

const ManagedRuleGroupStatementStateSchema = z.object({
  VendorName: z.string(),
  Version: z.string(),
  RuleActionOverrides: z.array(RuleActionOverrideStateSchema),
  ManagedRuleGroupConfigs: z.array(ManagedRuleGroupConfigStateSchema),
  ExcludedRules: z.array(ExcludedRuleStateSchema),
  Name: z.string(),
  ScopeDownStatement: z.record(z.string(), z.unknown()),
}).partial();

const IPSetForwardedIPConfigurationStateSchema = z.object({
  FallbackBehavior: z.string(),
  HeaderName: z.string(),
  Position: z.string(),
}).partial();

const IPSetReferenceStatementStateSchema = z.object({
  IPSetForwardedIPConfig: IPSetForwardedIPConfigurationStateSchema,
  Arn: z.string(),
}).partial();

const StatementStateSchema = z.object({
  SizeConstraintStatement: SizeConstraintStatementStateSchema,
  AndStatement: AndStatementStateSchema,
  XssMatchStatement: XssMatchStatementStateSchema,
  NotStatement: NotStatementStateSchema,
  ByteMatchStatement: ByteMatchStatementStateSchema,
  RateBasedStatement: RateBasedStatementStateSchema,
  GeoMatchStatement: GeoMatchStatementStateSchema,
  RuleGroupReferenceStatement: RuleGroupReferenceStatementStateSchema,
  LabelMatchStatement: LabelMatchStatementStateSchema,
  RegexMatchStatement: RegexMatchStatementStateSchema,
  SqliMatchStatement: SqliMatchStatementStateSchema,
  RegexPatternSetReferenceStatement:
    RegexPatternSetReferenceStatementStateSchema,
  OrStatement: OrStatementStateSchema,
  AsnMatchStatement: AsnMatchStatementStateSchema,
  ManagedRuleGroupStatement: ManagedRuleGroupStatementStateSchema,
  IPSetReferenceStatement: IPSetReferenceStatementStateSchema,
}).partial();

const ChallengeConfigStateSchema = z.object({
  ImmunityTimeProperty: ImmunityTimePropertyStateSchema,
}).partial();

const OverrideActionStateSchema = z.object({
  Count: z.record(z.string(), z.unknown()),
  None: z.record(z.string(), z.unknown()),
}).partial();

const LabelStateSchema = z.object({
  Name: z.string(),
}).partial();

const VisibilityConfigStateSchema = z.object({
  MetricName: z.string(),
  SampledRequestsEnabled: z.boolean(),
  CloudWatchMetricsEnabled: z.boolean(),
}).partial();

const CaptchaConfigStateSchema = z.object({
  ImmunityTimeProperty: ImmunityTimePropertyStateSchema,
}).partial();

const RuleStateSchema = z.object({
  Action: RuleActionStateSchema,
  Priority: z.number(),
  Statement: StatementStateSchema,
  ChallengeConfig: ChallengeConfigStateSchema,
  OverrideAction: OverrideActionStateSchema,
  RuleLabels: z.array(LabelStateSchema),
  VisibilityConfig: VisibilityConfigStateSchema,
  CaptchaConfig: CaptchaConfigStateSchema,
  Name: z.string(),
}).partial();

const ApplicationAttributeStateSchema = z.object({
  Values: z.array(z.string()),
  Name: z.string(),
}).partial();

const TagStateSchema = z.object({
  Value: z.string(),
  Key: z.string(),
}).partial();

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
  Description: z.string().regex(
    new RegExp(
      "^[a-zA-Z0-9=:#@/\\-,.][a-zA-Z0-9+=:#@/\\-,.\\s]+[a-zA-Z0-9+=:#@/\\-,.]{1,256}$",
    ),
  ).describe("Description of the entity.").optional(),
  AssociationConfig: z.object({
    ChallengeJavascriptSdkInjection: z.record(
      z.string(),
      z.record(z.string(), z.unknown()),
    ).describe(
      "Map of AssociatedResourceType and ChallengeJavascriptSdkInjectionConfig",
    ).optional(),
    RequestBody: z.record(
      z.string(),
      RequestBodyAssociatedResourceTypeConfigSchema,
    ).describe(
      "Map of AssociatedResourceType and RequestBodyAssociatedResourceTypeConfig",
    ).optional(),
  }).describe("AssociationConfig for body inspection").optional(),
  ChallengeConfig: z.object({
    ImmunityTimeProperty: ImmunityTimePropertySchema.optional(),
  }).optional(),
  DataProtectionConfig: z.object({
    DataProtections: z.array(DataProtectSchema),
  }).describe("Collection of dataProtects.").optional(),
  MonetizationConfig: z.object({
    CurrencyMode: z.enum(["REAL", "TEST"]).describe(
      "The currency mode for monetization. Use REAL for production payments and TEST for testing with testnet currencies.",
    ).optional(),
    CryptoConfig: CryptoConfigSchema.describe(
      "Configures cryptocurrency payment settings.",
    ).optional(),
  }).describe("Configures monetization for the web ACL or rule group.")
    .optional(),
  OnSourceDDoSProtectionConfig: z.object({
    ALBLowReputationMode: z.enum(["ACTIVE_UNDER_DDOS", "ALWAYS_ON"]),
  }).describe(
    "Configures the options for on-source DDoS protection provided by supported resource type.",
  ).optional(),
  Rules: z.array(RuleSchema).describe("Collection of Rules.").optional(),
  VisibilityConfig: z.object({
    MetricName: z.string().min(1).max(128),
    SampledRequestsEnabled: z.boolean(),
    CloudWatchMetricsEnabled: z.boolean(),
  }).describe("Visibility Metric of the WebACL.").optional(),
  Name: z.string().regex(new RegExp("^[0-9A-Za-z_-]{1,128}$")).describe(
    "Name of the WebACL.",
  ).optional(),
  TokenDomains: z.array(
    z.string().min(1).max(253).regex(new RegExp("^[\\w\\.\\-/]+$")),
  ).describe(
    "List of domains to accept in web request tokens, in addition to the domain of the protected resource.",
  ).optional(),
  DefaultAction: z.object({
    Block: BlockActionSchema.describe("Block traffic towards application.")
      .optional(),
    Allow: AllowActionSchema.describe("Allow traffic towards application.")
      .optional(),
  }).describe(
    "Default Action WebACL will take against ingress traffic when there is no matching Rule.",
  ).optional(),
  Scope: z.enum(["CLOUDFRONT", "REGIONAL"]).describe(
    "Use CLOUDFRONT for CloudFront WebACL, use REGIONAL for Application Load Balancer and API Gateway.",
  ).optional(),
  ApplicationConfig: z.object({
    Attributes: z.array(ApplicationAttributeSchema).describe(
      "Contains the attribute name and a list of values for that attribute.",
    ),
  }).describe("Collection of application attributes.").optional(),
  CustomResponseBodies: z.record(z.string(), CustomResponseBodySchema).describe(
    "Custom response key and body map.",
  ).optional(),
  CaptchaConfig: z.object({
    ImmunityTimeProperty: ImmunityTimePropertySchema.optional(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  Description: z.string().optional(),
  AssociationConfig: z.object({
    ChallengeJavascriptSdkInjection: z.record(z.string(), z.unknown()),
    RequestBody: z.record(z.string(), z.unknown()),
  }).partial().optional(),
  ChallengeConfig: z.object({
    ImmunityTimeProperty: ImmunityTimePropertyStateSchema,
  }).partial().optional(),
  DataProtectionConfig: z.object({
    DataProtections: z.array(DataProtectStateSchema),
  }).partial().optional(),
  MonetizationConfig: z.object({
    CurrencyMode: z.string(),
    CryptoConfig: CryptoConfigStateSchema,
  }).partial().optional(),
  OnSourceDDoSProtectionConfig: z.object({
    ALBLowReputationMode: z.string(),
  }).partial().optional(),
  Rules: z.array(RuleStateSchema).optional(),
  VisibilityConfig: z.object({
    MetricName: z.string(),
    SampledRequestsEnabled: z.boolean(),
    CloudWatchMetricsEnabled: z.boolean(),
  }).partial().optional(),
  LabelNamespace: z.string().optional(),
  Name: z.string(),
  TokenDomains: z.array(z.string()).optional(),
  DefaultAction: z.object({
    Block: BlockActionStateSchema,
    Allow: AllowActionStateSchema,
  }).partial().optional(),
  Scope: z.string(),
  Capacity: z.number().optional(),
  ApplicationConfig: z.object({
    Attributes: z.array(ApplicationAttributeStateSchema),
  }).partial().optional(),
  CustomResponseBodies: z.record(z.string(), z.unknown()).optional(),
  Id: z.string(),
  Arn: z.string().optional(),
  CaptchaConfig: z.object({
    ImmunityTimeProperty: ImmunityTimePropertyStateSchema,
  }).partial().optional(),
  Tags: z.array(TagStateSchema).optional(),
}).passthrough();

type StateData = Record<string, unknown>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Description: z.string().regex(
    new RegExp(
      "^[a-zA-Z0-9=:#@/\\-,.][a-zA-Z0-9+=:#@/\\-,.\\s]+[a-zA-Z0-9+=:#@/\\-,.]{1,256}$",
    ),
  ).describe("Description of the entity.").optional(),
  AssociationConfig: z.object({
    ChallengeJavascriptSdkInjection: z.record(
      z.string(),
      z.record(z.string(), z.unknown()),
    ).describe(
      "Map of AssociatedResourceType and ChallengeJavascriptSdkInjectionConfig",
    ).optional(),
    RequestBody: z.record(
      z.string(),
      RequestBodyAssociatedResourceTypeConfigSchema,
    ).describe(
      "Map of AssociatedResourceType and RequestBodyAssociatedResourceTypeConfig",
    ).optional(),
  }).describe("AssociationConfig for body inspection").optional(),
  ChallengeConfig: z.object({
    ImmunityTimeProperty: ImmunityTimePropertySchema.optional(),
  }).optional(),
  DataProtectionConfig: z.object({
    DataProtections: z.array(DataProtectSchema).optional(),
  }).describe("Collection of dataProtects.").optional(),
  MonetizationConfig: z.object({
    CurrencyMode: z.enum(["REAL", "TEST"]).describe(
      "The currency mode for monetization. Use REAL for production payments and TEST for testing with testnet currencies.",
    ).optional(),
    CryptoConfig: CryptoConfigSchema.describe(
      "Configures cryptocurrency payment settings.",
    ).optional(),
  }).describe("Configures monetization for the web ACL or rule group.")
    .optional(),
  OnSourceDDoSProtectionConfig: z.object({
    ALBLowReputationMode: z.enum(["ACTIVE_UNDER_DDOS", "ALWAYS_ON"]).optional(),
  }).describe(
    "Configures the options for on-source DDoS protection provided by supported resource type.",
  ).optional(),
  Rules: z.array(RuleSchema).describe("Collection of Rules.").optional(),
  VisibilityConfig: z.object({
    MetricName: z.string().min(1).max(128).optional(),
    SampledRequestsEnabled: z.boolean().optional(),
    CloudWatchMetricsEnabled: z.boolean().optional(),
  }).describe("Visibility Metric of the WebACL.").optional(),
  Name: z.string().regex(new RegExp("^[0-9A-Za-z_-]{1,128}$")).describe(
    "Name of the WebACL.",
  ).optional(),
  TokenDomains: z.array(
    z.string().min(1).max(253).regex(new RegExp("^[\\w\\.\\-/]+$")),
  ).describe(
    "List of domains to accept in web request tokens, in addition to the domain of the protected resource.",
  ).optional(),
  DefaultAction: z.object({
    Block: BlockActionSchema.describe("Block traffic towards application.")
      .optional(),
    Allow: AllowActionSchema.describe("Allow traffic towards application.")
      .optional(),
  }).describe(
    "Default Action WebACL will take against ingress traffic when there is no matching Rule.",
  ).optional(),
  Scope: z.enum(["CLOUDFRONT", "REGIONAL"]).describe(
    "Use CLOUDFRONT for CloudFront WebACL, use REGIONAL for Application Load Balancer and API Gateway.",
  ).optional(),
  ApplicationConfig: z.object({
    Attributes: z.array(ApplicationAttributeSchema).describe(
      "Contains the attribute name and a list of values for that attribute.",
    ).optional(),
  }).describe("Collection of application attributes.").optional(),
  CustomResponseBodies: z.record(z.string(), CustomResponseBodySchema).describe(
    "Custom response key and body map.",
  ).optional(),
  CaptchaConfig: z.object({
    ImmunityTimeProperty: ImmunityTimePropertySchema.optional(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
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

/** Swamp extension model for WAFv2 WebACL. Registered at `@swamp/aws/wafv2/web-acl`. */
export const model = {
  type: "@swamp/aws/wafv2/web-acl",
  version: "2026.11.08.2",
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
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.11.06.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.11.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.11.08.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "WAFv2 WebACL resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a WAFv2 WebACL",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const missing = ["DefaultAction", "Scope", "VisibilityConfig"].filter((
          k,
        ) => g[k] === undefined);
        if (missing.length > 0) {
          throw new Error(
            "create requires global arguments: " + missing.join(", "),
          );
        }
        const credentials = _buildCredentials(g);
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::WAFv2::WebACL",
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
      description: "Get a WAFv2 WebACL",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the WAFv2 WebACL",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::WAFv2::WebACL",
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
      description: "Update a WAFv2 WebACL",
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
          "AWS::WAFv2::WebACL",
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
          "AWS::WAFv2::WebACL",
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
      description: "Delete a WAFv2 WebACL",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the WAFv2 WebACL",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::WAFv2::WebACL",
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
      description: "Sync WAFv2 WebACL state from AWS",
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
            "AWS::WAFv2::WebACL",
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
      description: "List WAFv2 WebACL resources",
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
        const { items, nextToken } = await listResources("AWS::WAFv2::WebACL", {
          resourceModel: args.resourceModel,
          maxPages: args.maxPages,
          credentials,
        });
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
