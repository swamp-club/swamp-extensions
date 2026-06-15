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

// Auto-generated extension model for @swamp/aws/securityhub/insight
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SecurityHub Insight (AWS::SecurityHub::Insight).
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

const StringFilterSchema = z.object({
  Comparison: z.enum(["EQUALS", "PREFIX", "NOT_EQUALS", "PREFIX_NOT_EQUALS"])
    .describe(
      "The condition to apply to a string value when filtering Security Hub findings.",
    ),
  Value: z.string().min(1).describe("Non-empty string definition."),
});

const DateRangeSchema = z.object({
  Unit: z.enum(["DAYS"]).describe("A date range unit for the date filter."),
  Value: z.number().describe("A date range value for the date filter."),
});

const DateFilterSchema = z.object({
  DateRange: DateRangeSchema.describe("A date range for the date filter.")
    .optional(),
  End: z.string().regex(
    new RegExp(
      "^([\\+-]?\\d{4}(?!\\d{2}))((-?)((0[1-9]|1[0-2])(\\3([12]\\d|0[1-9]|3[01]))?|W([0-4]\\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\\d|[12]\\d{2}|3([0-5]\\d|6[1-6])))([tT]((([01]\\d|2[0-3])((:?)[0-5]\\d)?|24\\:?00)([\\.,]\\d+(?!:))?)?(\\17[0-5]\\d([\\.,]\\d+)?)?([zZ]|([\\+-])([01]\\d|2[0-3]):?([0-5]\\d)?)?)?)?$",
    ),
  ).describe("The date and time, in UTC and ISO 8601 format.").optional(),
  Start: z.string().regex(
    new RegExp(
      "^([\\+-]?\\d{4}(?!\\d{2}))((-?)((0[1-9]|1[0-2])(\\3([12]\\d|0[1-9]|3[01]))?|W([0-4]\\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\\d|[12]\\d{2}|3([0-5]\\d|6[1-6])))([tT]((([01]\\d|2[0-3])((:?)[0-5]\\d)?|24\\:?00)([\\.,]\\d+(?!:))?)?(\\17[0-5]\\d([\\.,]\\d+)?)?([zZ]|([\\+-])([01]\\d|2[0-3]):?([0-5]\\d)?)?)?)?$",
    ),
  ).describe("The date and time, in UTC and ISO 8601 format.").optional(),
});

const NumberFilterSchema = z.object({
  Eq: z.number().describe(
    "The equal-to condition to be applied to a single field when querying for findings.",
  ).optional(),
  Gte: z.number().describe(
    "The greater-than-equal condition to be applied to a single field when querying for findings.",
  ).optional(),
  Lte: z.number().describe(
    "The less-than-equal condition to be applied to a single field when querying for findings.",
  ).optional(),
});

const MapFilterSchema = z.object({
  Comparison: z.enum(["EQUALS", "NOT_EQUALS"]).describe(
    "The condition to apply to the key value when filtering Security Hub findings with a map filter.",
  ),
  Key: z.string().min(1).describe("Non-empty string definition."),
  Value: z.string().min(1).describe("Non-empty string definition."),
});

const IpFilterSchema = z.object({
  Cidr: z.string().min(1).describe("A finding's CIDR value."),
});

const BooleanFilterSchema = z.object({
  Value: z.boolean().describe("The value of the boolean."),
});

const KeywordFilterSchema = z.object({
  Value: z.string().min(1).describe("A value for the keyword."),
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
  Name: z.string().min(1).max(128).describe(
    "The name of a Security Hub insight",
  ),
  Filters: z.object({
    ProductArn: z.array(StringFilterSchema).describe(
      "The ARN generated by Security Hub that uniquely identifies a third-party company (security findings provider) after this provider's product (solution that generates findings) is registered with Security Hub.",
    ).optional(),
    AwsAccountId: z.array(StringFilterSchema).describe(
      "The AWS account ID in which a finding is generated.",
    ).optional(),
    AwsAccountName: z.array(StringFilterSchema).describe(
      "The name of the AWS account in which a finding is generated.",
    ).optional(),
    Id: z.array(StringFilterSchema).describe(
      "The security findings provider-specific identifier for a finding.",
    ).optional(),
    GeneratorId: z.array(StringFilterSchema).describe(
      "The identifier for the solution-specific component (a discrete unit of logic) that generated a finding.",
    ).optional(),
    Type: z.array(StringFilterSchema).describe(
      "A finding type in the format of namespace/category/classifier that classifies a finding.",
    ).optional(),
    Region: z.array(StringFilterSchema).describe(
      "The Region from which the finding was generated.",
    ).optional(),
    FirstObservedAt: z.array(DateFilterSchema).describe(
      "An ISO8601-formatted timestamp that indicates when the security findings provider first observed the potential security issue that a finding captured.",
    ).optional(),
    LastObservedAt: z.array(DateFilterSchema).describe(
      "An ISO8601-formatted timestamp that indicates when the security findings provider most recently observed the potential security issue that a finding captured.",
    ).optional(),
    CreatedAt: z.array(DateFilterSchema).describe(
      "An ISO8601-formatted timestamp that indicates when the security findings provider captured the potential security issue that a finding captured.",
    ).optional(),
    UpdatedAt: z.array(DateFilterSchema).describe(
      "An ISO8601-formatted timestamp that indicates when the security findings provider last updated the finding record.",
    ).optional(),
    SeverityLabel: z.array(StringFilterSchema).describe(
      "The label of a finding's severity.",
    ).optional(),
    Confidence: z.array(NumberFilterSchema).describe("A finding's confidence.")
      .optional(),
    Criticality: z.array(NumberFilterSchema).describe(
      "The level of importance assigned to the resources associated with the finding.",
    ).optional(),
    Title: z.array(StringFilterSchema).describe("A finding's title.")
      .optional(),
    Description: z.array(StringFilterSchema).describe(
      "A finding's description.",
    ).optional(),
    RecommendationText: z.array(StringFilterSchema).describe(
      "The recommendation of what to do about the issue described in a finding.",
    ).optional(),
    SourceUrl: z.array(StringFilterSchema).describe(
      "A URL that links to a page about the current finding in the security findings provider's solution.",
    ).optional(),
    ProductFields: z.array(MapFilterSchema).describe(
      "A data type where security findings providers can include additional solution-specific details that aren't part of the defined AwsSecurityFinding format.",
    ).optional(),
    ProductName: z.array(StringFilterSchema).describe(
      "The name of the solution (product) that generates findings.",
    ).optional(),
    CompanyName: z.array(StringFilterSchema).describe(
      "The name of the findings provider (company) that owns the solution (product) that generates findings.",
    ).optional(),
    UserDefinedFields: z.array(MapFilterSchema).describe(
      "A list of name/value string pairs associated with the finding.",
    ).optional(),
    MalwareName: z.array(StringFilterSchema).describe(
      "The name of the malware that was observed.",
    ).optional(),
    MalwareType: z.array(StringFilterSchema).describe(
      "The type of the malware that was observed.",
    ).optional(),
    MalwarePath: z.array(StringFilterSchema).describe(
      "The filesystem path of the malware that was observed.",
    ).optional(),
    MalwareState: z.array(StringFilterSchema).describe(
      "The state of the malware that was observed.",
    ).optional(),
    NetworkDirection: z.array(StringFilterSchema).describe(
      "Indicates the direction of network traffic associated with a finding.",
    ).optional(),
    NetworkProtocol: z.array(StringFilterSchema).describe(
      "The protocol of network-related information about a finding.",
    ).optional(),
    NetworkSourceIpV4: z.array(IpFilterSchema).describe(
      "The source IPv4 address of network-related information about a finding.",
    ).optional(),
    NetworkSourceIpV6: z.array(IpFilterSchema).describe(
      "The source IPv6 address of network-related information about a finding.",
    ).optional(),
    NetworkSourcePort: z.array(NumberFilterSchema).describe(
      "The source port of network-related information about a finding.",
    ).optional(),
    NetworkSourceDomain: z.array(StringFilterSchema).describe(
      "The source domain of network-related information about a finding.",
    ).optional(),
    NetworkSourceMac: z.array(StringFilterSchema).describe(
      "The source media access control (MAC) address of network-related information about a finding.",
    ).optional(),
    NetworkDestinationIpV4: z.array(IpFilterSchema).describe(
      "The destination IPv4 address of network-related information about a finding.",
    ).optional(),
    NetworkDestinationIpV6: z.array(IpFilterSchema).describe(
      "The destination IPv6 address of network-related information about a finding.",
    ).optional(),
    NetworkDestinationPort: z.array(NumberFilterSchema).describe(
      "The destination port of network-related information about a finding.",
    ).optional(),
    NetworkDestinationDomain: z.array(StringFilterSchema).describe(
      "The destination domain of network-related information about a finding.",
    ).optional(),
    ProcessName: z.array(StringFilterSchema).describe(
      "The name of the process.",
    ).optional(),
    ProcessPath: z.array(StringFilterSchema).describe(
      "The path to the process executable.",
    ).optional(),
    ProcessPid: z.array(NumberFilterSchema).describe("The process ID.")
      .optional(),
    ProcessParentPid: z.array(NumberFilterSchema).describe(
      "The parent process ID.",
    ).optional(),
    ProcessLaunchedAt: z.array(DateFilterSchema).describe(
      "A timestamp that identifies when the process was launched.",
    ).optional(),
    ProcessTerminatedAt: z.array(DateFilterSchema).describe(
      "A timestamp that identifies when the process was terminated.",
    ).optional(),
    ThreatIntelIndicatorType: z.array(StringFilterSchema).describe(
      "The type of a threat intelligence indicator.",
    ).optional(),
    ThreatIntelIndicatorValue: z.array(StringFilterSchema).describe(
      "The value of a threat intelligence indicator.",
    ).optional(),
    ThreatIntelIndicatorCategory: z.array(StringFilterSchema).describe(
      "The category of a threat intelligence indicator.",
    ).optional(),
    ThreatIntelIndicatorLastObservedAt: z.array(DateFilterSchema).describe(
      "A timestamp that identifies the last observation of a threat intelligence indicator.",
    ).optional(),
    ThreatIntelIndicatorSource: z.array(StringFilterSchema).describe(
      "The source of the threat intelligence.",
    ).optional(),
    ThreatIntelIndicatorSourceUrl: z.array(StringFilterSchema).describe(
      "The URL for more details from the source of the threat intelligence.",
    ).optional(),
    ResourceType: z.array(StringFilterSchema).describe(
      "Specifies the type of the resource that details are provided for.",
    ).optional(),
    ResourceId: z.array(StringFilterSchema).describe(
      "The canonical identifier for the given resource type.",
    ).optional(),
    ResourcePartition: z.array(StringFilterSchema).describe(
      "The canonical AWS partition name that the Region is assigned to.",
    ).optional(),
    ResourceRegion: z.array(StringFilterSchema).describe(
      "The canonical AWS external Region name where this resource is located.",
    ).optional(),
    ResourceTags: z.array(MapFilterSchema).describe(
      "A list of AWS tags associated with a resource at the time the finding was processed.",
    ).optional(),
    ResourceAwsEc2InstanceType: z.array(StringFilterSchema).describe(
      "The instance type of the instance.",
    ).optional(),
    ResourceAwsEc2InstanceImageId: z.array(StringFilterSchema).describe(
      "The Amazon Machine Image (AMI) ID of the instance.",
    ).optional(),
    ResourceAwsEc2InstanceIpV4Addresses: z.array(IpFilterSchema).describe(
      "The IPv4 addresses associated with the instance.",
    ).optional(),
    ResourceAwsEc2InstanceIpV6Addresses: z.array(IpFilterSchema).describe(
      "The IPv6 addresses associated with the instance.",
    ).optional(),
    ResourceAwsEc2InstanceKeyName: z.array(StringFilterSchema).describe(
      "The key name associated with the instance.",
    ).optional(),
    ResourceAwsEc2InstanceIamInstanceProfileArn: z.array(StringFilterSchema)
      .describe("The IAM profile ARN of the instance.").optional(),
    ResourceAwsEc2InstanceVpcId: z.array(StringFilterSchema).describe(
      "The identifier of the VPC that the instance was launched in.",
    ).optional(),
    ResourceAwsEc2InstanceSubnetId: z.array(StringFilterSchema).describe(
      "The identifier of the subnet that the instance was launched in.",
    ).optional(),
    ResourceAwsEc2InstanceLaunchedAt: z.array(DateFilterSchema).describe(
      "The date and time the instance was launched.",
    ).optional(),
    ResourceAwsS3BucketOwnerId: z.array(StringFilterSchema).describe(
      "The canonical user ID of the owner of the S3 bucket.",
    ).optional(),
    ResourceAwsS3BucketOwnerName: z.array(StringFilterSchema).describe(
      "The display name of the owner of the S3 bucket.",
    ).optional(),
    ResourceAwsIamAccessKeyStatus: z.array(StringFilterSchema).describe(
      "The status of the IAM access key related to a finding.",
    ).optional(),
    ResourceAwsIamAccessKeyCreatedAt: z.array(DateFilterSchema).describe(
      "The creation date/time of the IAM access key related to a finding.",
    ).optional(),
    ResourceContainerName: z.array(StringFilterSchema).describe(
      "The name of the container related to a finding.",
    ).optional(),
    ResourceContainerImageId: z.array(StringFilterSchema).describe(
      "The identifier of the image related to a finding.",
    ).optional(),
    ResourceContainerImageName: z.array(StringFilterSchema).describe(
      "The name of the image related to a finding.",
    ).optional(),
    ResourceContainerLaunchedAt: z.array(DateFilterSchema).describe(
      "A timestamp that identifies when the container was started.",
    ).optional(),
    ResourceDetailsOther: z.array(MapFilterSchema).describe(
      "The details of a resource that doesn't have a specific subfield for the resource type defined.",
    ).optional(),
    ComplianceStatus: z.array(StringFilterSchema).describe(
      "Exclusive to findings that are generated as the result of a check run against a specific rule in a supported standard.",
    ).optional(),
    VerificationState: z.array(StringFilterSchema).describe(
      "The veracity of a finding.",
    ).optional(),
    WorkflowState: z.array(StringFilterSchema).describe(
      "The workflow state of a finding.",
    ).optional(),
    WorkflowStatus: z.array(StringFilterSchema).describe(
      "The status of the investigation into a finding.",
    ).optional(),
    RecordState: z.array(StringFilterSchema).describe(
      "The updated record state for the finding.",
    ).optional(),
    RelatedFindingsProductArn: z.array(StringFilterSchema).describe(
      "The ARN of the solution that generated a related finding.",
    ).optional(),
    RelatedFindingsId: z.array(StringFilterSchema).describe(
      "The solution-generated identifier for a related finding.",
    ).optional(),
    ResourceApplicationArn: z.array(StringFilterSchema).describe(
      "The ARN of the application that is related to a finding.",
    ).optional(),
    ResourceApplicationName: z.array(StringFilterSchema).describe(
      "The name of the application that is related to a finding.",
    ).optional(),
    NoteText: z.array(StringFilterSchema).describe("The text of a note.")
      .optional(),
    NoteUpdatedAt: z.array(DateFilterSchema).describe(
      "The timestamp of when the note was updated.",
    ).optional(),
    NoteUpdatedBy: z.array(StringFilterSchema).describe(
      "The principal that created a note.",
    ).optional(),
    Sample: z.array(BooleanFilterSchema).describe(
      "Indicates whether or not sample findings are included in the filter results.",
    ).optional(),
    ComplianceAssociatedStandardsId: z.array(StringFilterSchema).describe(
      "The unique identifier of a standard in which a control is enabled.",
    ).optional(),
    ComplianceSecurityControlId: z.array(StringFilterSchema).describe(
      "The unique identifier of a control across standards.",
    ).optional(),
    ComplianceSecurityControlParametersName: z.array(StringFilterSchema)
      .describe("The name of a security control parameter.").optional(),
    ComplianceSecurityControlParametersValue: z.array(StringFilterSchema)
      .describe("The current value of a security control parameter.")
      .optional(),
    FindingProviderFieldsConfidence: z.array(NumberFilterSchema).describe(
      "The finding provider value for the finding confidence.",
    ).optional(),
    FindingProviderFieldsCriticality: z.array(NumberFilterSchema).describe(
      "The finding provider value for the level of importance assigned to the resources associated with the findings.",
    ).optional(),
    FindingProviderFieldsRelatedFindingsId: z.array(StringFilterSchema)
      .describe(
        "The finding identifier of a related finding that is identified by the finding provider.",
      ).optional(),
    FindingProviderFieldsRelatedFindingsProductArn: z.array(StringFilterSchema)
      .describe(
        "The ARN of the solution that generated a related finding that is identified by the finding provider.",
      ).optional(),
    FindingProviderFieldsSeverityLabel: z.array(StringFilterSchema).describe(
      "The finding provider value for the severity label.",
    ).optional(),
    FindingProviderFieldsSeverityOriginal: z.array(StringFilterSchema).describe(
      "The finding provider's original value for the severity.",
    ).optional(),
    FindingProviderFieldsTypes: z.array(StringFilterSchema).describe(
      "One or more finding types that the finding provider assigned to the finding.",
    ).optional(),
    ResourceAwsIamAccessKeyPrincipalName: z.array(StringFilterSchema).describe(
      "The name of the principal that is associated with an IAM access key.",
    ).optional(),
    ResourceAwsIamUserUserName: z.array(StringFilterSchema).describe(
      "The name of an IAM user.",
    ).optional(),
    VulnerabilitiesExploitAvailable: z.array(StringFilterSchema).describe(
      "Indicates whether a software vulnerability in your environment has a known exploit.",
    ).optional(),
    VulnerabilitiesFixAvailable: z.array(StringFilterSchema).describe(
      "Indicates whether a vulnerability is fixed in a newer version of the affected software packages.",
    ).optional(),
    Keyword: z.array(KeywordFilterSchema).describe("A keyword for a finding.")
      .optional(),
    ResourceAwsIamAccessKeyUserName: z.array(StringFilterSchema).describe(
      "The user associated with the IAM access key related to a finding.",
    ).optional(),
    SeverityNormalized: z.array(NumberFilterSchema).describe(
      "The normalized severity of a finding.",
    ).optional(),
    SeverityProduct: z.array(NumberFilterSchema).describe(
      "The native severity as defined by the security findings provider's solution that generated the finding.",
    ).optional(),
  }).describe(
    "One or more attributes used to filter the findings included in the insight",
  ),
  GroupByAttribute: z.string().min(1).describe(
    "The grouping attribute for the insight's findings",
  ),
});

const StateSchema = z.object({
  InsightArn: z.string(),
  Name: z.string().optional(),
  Filters: z.object({
    ProductArn: z.array(StringFilterSchema),
    AwsAccountId: z.array(StringFilterSchema),
    AwsAccountName: z.array(StringFilterSchema),
    Id: z.array(StringFilterSchema),
    GeneratorId: z.array(StringFilterSchema),
    Type: z.array(StringFilterSchema),
    Region: z.array(StringFilterSchema),
    FirstObservedAt: z.array(DateFilterSchema),
    LastObservedAt: z.array(DateFilterSchema),
    CreatedAt: z.array(DateFilterSchema),
    UpdatedAt: z.array(DateFilterSchema),
    SeverityLabel: z.array(StringFilterSchema),
    Confidence: z.array(NumberFilterSchema),
    Criticality: z.array(NumberFilterSchema),
    Title: z.array(StringFilterSchema),
    Description: z.array(StringFilterSchema),
    RecommendationText: z.array(StringFilterSchema),
    SourceUrl: z.array(StringFilterSchema),
    ProductFields: z.array(MapFilterSchema),
    ProductName: z.array(StringFilterSchema),
    CompanyName: z.array(StringFilterSchema),
    UserDefinedFields: z.array(MapFilterSchema),
    MalwareName: z.array(StringFilterSchema),
    MalwareType: z.array(StringFilterSchema),
    MalwarePath: z.array(StringFilterSchema),
    MalwareState: z.array(StringFilterSchema),
    NetworkDirection: z.array(StringFilterSchema),
    NetworkProtocol: z.array(StringFilterSchema),
    NetworkSourceIpV4: z.array(IpFilterSchema),
    NetworkSourceIpV6: z.array(IpFilterSchema),
    NetworkSourcePort: z.array(NumberFilterSchema),
    NetworkSourceDomain: z.array(StringFilterSchema),
    NetworkSourceMac: z.array(StringFilterSchema),
    NetworkDestinationIpV4: z.array(IpFilterSchema),
    NetworkDestinationIpV6: z.array(IpFilterSchema),
    NetworkDestinationPort: z.array(NumberFilterSchema),
    NetworkDestinationDomain: z.array(StringFilterSchema),
    ProcessName: z.array(StringFilterSchema),
    ProcessPath: z.array(StringFilterSchema),
    ProcessPid: z.array(NumberFilterSchema),
    ProcessParentPid: z.array(NumberFilterSchema),
    ProcessLaunchedAt: z.array(DateFilterSchema),
    ProcessTerminatedAt: z.array(DateFilterSchema),
    ThreatIntelIndicatorType: z.array(StringFilterSchema),
    ThreatIntelIndicatorValue: z.array(StringFilterSchema),
    ThreatIntelIndicatorCategory: z.array(StringFilterSchema),
    ThreatIntelIndicatorLastObservedAt: z.array(DateFilterSchema),
    ThreatIntelIndicatorSource: z.array(StringFilterSchema),
    ThreatIntelIndicatorSourceUrl: z.array(StringFilterSchema),
    ResourceType: z.array(StringFilterSchema),
    ResourceId: z.array(StringFilterSchema),
    ResourcePartition: z.array(StringFilterSchema),
    ResourceRegion: z.array(StringFilterSchema),
    ResourceTags: z.array(MapFilterSchema),
    ResourceAwsEc2InstanceType: z.array(StringFilterSchema),
    ResourceAwsEc2InstanceImageId: z.array(StringFilterSchema),
    ResourceAwsEc2InstanceIpV4Addresses: z.array(IpFilterSchema),
    ResourceAwsEc2InstanceIpV6Addresses: z.array(IpFilterSchema),
    ResourceAwsEc2InstanceKeyName: z.array(StringFilterSchema),
    ResourceAwsEc2InstanceIamInstanceProfileArn: z.array(StringFilterSchema),
    ResourceAwsEc2InstanceVpcId: z.array(StringFilterSchema),
    ResourceAwsEc2InstanceSubnetId: z.array(StringFilterSchema),
    ResourceAwsEc2InstanceLaunchedAt: z.array(DateFilterSchema),
    ResourceAwsS3BucketOwnerId: z.array(StringFilterSchema),
    ResourceAwsS3BucketOwnerName: z.array(StringFilterSchema),
    ResourceAwsIamAccessKeyStatus: z.array(StringFilterSchema),
    ResourceAwsIamAccessKeyCreatedAt: z.array(DateFilterSchema),
    ResourceContainerName: z.array(StringFilterSchema),
    ResourceContainerImageId: z.array(StringFilterSchema),
    ResourceContainerImageName: z.array(StringFilterSchema),
    ResourceContainerLaunchedAt: z.array(DateFilterSchema),
    ResourceDetailsOther: z.array(MapFilterSchema),
    ComplianceStatus: z.array(StringFilterSchema),
    VerificationState: z.array(StringFilterSchema),
    WorkflowState: z.array(StringFilterSchema),
    WorkflowStatus: z.array(StringFilterSchema),
    RecordState: z.array(StringFilterSchema),
    RelatedFindingsProductArn: z.array(StringFilterSchema),
    RelatedFindingsId: z.array(StringFilterSchema),
    ResourceApplicationArn: z.array(StringFilterSchema),
    ResourceApplicationName: z.array(StringFilterSchema),
    NoteText: z.array(StringFilterSchema),
    NoteUpdatedAt: z.array(DateFilterSchema),
    NoteUpdatedBy: z.array(StringFilterSchema),
    Sample: z.array(BooleanFilterSchema),
    ComplianceAssociatedStandardsId: z.array(StringFilterSchema),
    ComplianceSecurityControlId: z.array(StringFilterSchema),
    ComplianceSecurityControlParametersName: z.array(StringFilterSchema),
    ComplianceSecurityControlParametersValue: z.array(StringFilterSchema),
    FindingProviderFieldsConfidence: z.array(NumberFilterSchema),
    FindingProviderFieldsCriticality: z.array(NumberFilterSchema),
    FindingProviderFieldsRelatedFindingsId: z.array(StringFilterSchema),
    FindingProviderFieldsRelatedFindingsProductArn: z.array(StringFilterSchema),
    FindingProviderFieldsSeverityLabel: z.array(StringFilterSchema),
    FindingProviderFieldsSeverityOriginal: z.array(StringFilterSchema),
    FindingProviderFieldsTypes: z.array(StringFilterSchema),
    ResourceAwsIamAccessKeyPrincipalName: z.array(StringFilterSchema),
    ResourceAwsIamUserUserName: z.array(StringFilterSchema),
    VulnerabilitiesExploitAvailable: z.array(StringFilterSchema),
    VulnerabilitiesFixAvailable: z.array(StringFilterSchema),
    Keyword: z.array(KeywordFilterSchema),
    ResourceAwsIamAccessKeyUserName: z.array(StringFilterSchema),
    SeverityNormalized: z.array(NumberFilterSchema),
    SeverityProduct: z.array(NumberFilterSchema),
  }).optional(),
  GroupByAttribute: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().min(1).max(128).describe(
    "The name of a Security Hub insight",
  ).optional(),
  Filters: z.object({
    ProductArn: z.array(StringFilterSchema).describe(
      "The ARN generated by Security Hub that uniquely identifies a third-party company (security findings provider) after this provider's product (solution that generates findings) is registered with Security Hub.",
    ).optional(),
    AwsAccountId: z.array(StringFilterSchema).describe(
      "The AWS account ID in which a finding is generated.",
    ).optional(),
    AwsAccountName: z.array(StringFilterSchema).describe(
      "The name of the AWS account in which a finding is generated.",
    ).optional(),
    Id: z.array(StringFilterSchema).describe(
      "The security findings provider-specific identifier for a finding.",
    ).optional(),
    GeneratorId: z.array(StringFilterSchema).describe(
      "The identifier for the solution-specific component (a discrete unit of logic) that generated a finding.",
    ).optional(),
    Type: z.array(StringFilterSchema).describe(
      "A finding type in the format of namespace/category/classifier that classifies a finding.",
    ).optional(),
    Region: z.array(StringFilterSchema).describe(
      "The Region from which the finding was generated.",
    ).optional(),
    FirstObservedAt: z.array(DateFilterSchema).describe(
      "An ISO8601-formatted timestamp that indicates when the security findings provider first observed the potential security issue that a finding captured.",
    ).optional(),
    LastObservedAt: z.array(DateFilterSchema).describe(
      "An ISO8601-formatted timestamp that indicates when the security findings provider most recently observed the potential security issue that a finding captured.",
    ).optional(),
    CreatedAt: z.array(DateFilterSchema).describe(
      "An ISO8601-formatted timestamp that indicates when the security findings provider captured the potential security issue that a finding captured.",
    ).optional(),
    UpdatedAt: z.array(DateFilterSchema).describe(
      "An ISO8601-formatted timestamp that indicates when the security findings provider last updated the finding record.",
    ).optional(),
    SeverityLabel: z.array(StringFilterSchema).describe(
      "The label of a finding's severity.",
    ).optional(),
    Confidence: z.array(NumberFilterSchema).describe("A finding's confidence.")
      .optional(),
    Criticality: z.array(NumberFilterSchema).describe(
      "The level of importance assigned to the resources associated with the finding.",
    ).optional(),
    Title: z.array(StringFilterSchema).describe("A finding's title.")
      .optional(),
    Description: z.array(StringFilterSchema).describe(
      "A finding's description.",
    ).optional(),
    RecommendationText: z.array(StringFilterSchema).describe(
      "The recommendation of what to do about the issue described in a finding.",
    ).optional(),
    SourceUrl: z.array(StringFilterSchema).describe(
      "A URL that links to a page about the current finding in the security findings provider's solution.",
    ).optional(),
    ProductFields: z.array(MapFilterSchema).describe(
      "A data type where security findings providers can include additional solution-specific details that aren't part of the defined AwsSecurityFinding format.",
    ).optional(),
    ProductName: z.array(StringFilterSchema).describe(
      "The name of the solution (product) that generates findings.",
    ).optional(),
    CompanyName: z.array(StringFilterSchema).describe(
      "The name of the findings provider (company) that owns the solution (product) that generates findings.",
    ).optional(),
    UserDefinedFields: z.array(MapFilterSchema).describe(
      "A list of name/value string pairs associated with the finding.",
    ).optional(),
    MalwareName: z.array(StringFilterSchema).describe(
      "The name of the malware that was observed.",
    ).optional(),
    MalwareType: z.array(StringFilterSchema).describe(
      "The type of the malware that was observed.",
    ).optional(),
    MalwarePath: z.array(StringFilterSchema).describe(
      "The filesystem path of the malware that was observed.",
    ).optional(),
    MalwareState: z.array(StringFilterSchema).describe(
      "The state of the malware that was observed.",
    ).optional(),
    NetworkDirection: z.array(StringFilterSchema).describe(
      "Indicates the direction of network traffic associated with a finding.",
    ).optional(),
    NetworkProtocol: z.array(StringFilterSchema).describe(
      "The protocol of network-related information about a finding.",
    ).optional(),
    NetworkSourceIpV4: z.array(IpFilterSchema).describe(
      "The source IPv4 address of network-related information about a finding.",
    ).optional(),
    NetworkSourceIpV6: z.array(IpFilterSchema).describe(
      "The source IPv6 address of network-related information about a finding.",
    ).optional(),
    NetworkSourcePort: z.array(NumberFilterSchema).describe(
      "The source port of network-related information about a finding.",
    ).optional(),
    NetworkSourceDomain: z.array(StringFilterSchema).describe(
      "The source domain of network-related information about a finding.",
    ).optional(),
    NetworkSourceMac: z.array(StringFilterSchema).describe(
      "The source media access control (MAC) address of network-related information about a finding.",
    ).optional(),
    NetworkDestinationIpV4: z.array(IpFilterSchema).describe(
      "The destination IPv4 address of network-related information about a finding.",
    ).optional(),
    NetworkDestinationIpV6: z.array(IpFilterSchema).describe(
      "The destination IPv6 address of network-related information about a finding.",
    ).optional(),
    NetworkDestinationPort: z.array(NumberFilterSchema).describe(
      "The destination port of network-related information about a finding.",
    ).optional(),
    NetworkDestinationDomain: z.array(StringFilterSchema).describe(
      "The destination domain of network-related information about a finding.",
    ).optional(),
    ProcessName: z.array(StringFilterSchema).describe(
      "The name of the process.",
    ).optional(),
    ProcessPath: z.array(StringFilterSchema).describe(
      "The path to the process executable.",
    ).optional(),
    ProcessPid: z.array(NumberFilterSchema).describe("The process ID.")
      .optional(),
    ProcessParentPid: z.array(NumberFilterSchema).describe(
      "The parent process ID.",
    ).optional(),
    ProcessLaunchedAt: z.array(DateFilterSchema).describe(
      "A timestamp that identifies when the process was launched.",
    ).optional(),
    ProcessTerminatedAt: z.array(DateFilterSchema).describe(
      "A timestamp that identifies when the process was terminated.",
    ).optional(),
    ThreatIntelIndicatorType: z.array(StringFilterSchema).describe(
      "The type of a threat intelligence indicator.",
    ).optional(),
    ThreatIntelIndicatorValue: z.array(StringFilterSchema).describe(
      "The value of a threat intelligence indicator.",
    ).optional(),
    ThreatIntelIndicatorCategory: z.array(StringFilterSchema).describe(
      "The category of a threat intelligence indicator.",
    ).optional(),
    ThreatIntelIndicatorLastObservedAt: z.array(DateFilterSchema).describe(
      "A timestamp that identifies the last observation of a threat intelligence indicator.",
    ).optional(),
    ThreatIntelIndicatorSource: z.array(StringFilterSchema).describe(
      "The source of the threat intelligence.",
    ).optional(),
    ThreatIntelIndicatorSourceUrl: z.array(StringFilterSchema).describe(
      "The URL for more details from the source of the threat intelligence.",
    ).optional(),
    ResourceType: z.array(StringFilterSchema).describe(
      "Specifies the type of the resource that details are provided for.",
    ).optional(),
    ResourceId: z.array(StringFilterSchema).describe(
      "The canonical identifier for the given resource type.",
    ).optional(),
    ResourcePartition: z.array(StringFilterSchema).describe(
      "The canonical AWS partition name that the Region is assigned to.",
    ).optional(),
    ResourceRegion: z.array(StringFilterSchema).describe(
      "The canonical AWS external Region name where this resource is located.",
    ).optional(),
    ResourceTags: z.array(MapFilterSchema).describe(
      "A list of AWS tags associated with a resource at the time the finding was processed.",
    ).optional(),
    ResourceAwsEc2InstanceType: z.array(StringFilterSchema).describe(
      "The instance type of the instance.",
    ).optional(),
    ResourceAwsEc2InstanceImageId: z.array(StringFilterSchema).describe(
      "The Amazon Machine Image (AMI) ID of the instance.",
    ).optional(),
    ResourceAwsEc2InstanceIpV4Addresses: z.array(IpFilterSchema).describe(
      "The IPv4 addresses associated with the instance.",
    ).optional(),
    ResourceAwsEc2InstanceIpV6Addresses: z.array(IpFilterSchema).describe(
      "The IPv6 addresses associated with the instance.",
    ).optional(),
    ResourceAwsEc2InstanceKeyName: z.array(StringFilterSchema).describe(
      "The key name associated with the instance.",
    ).optional(),
    ResourceAwsEc2InstanceIamInstanceProfileArn: z.array(StringFilterSchema)
      .describe("The IAM profile ARN of the instance.").optional(),
    ResourceAwsEc2InstanceVpcId: z.array(StringFilterSchema).describe(
      "The identifier of the VPC that the instance was launched in.",
    ).optional(),
    ResourceAwsEc2InstanceSubnetId: z.array(StringFilterSchema).describe(
      "The identifier of the subnet that the instance was launched in.",
    ).optional(),
    ResourceAwsEc2InstanceLaunchedAt: z.array(DateFilterSchema).describe(
      "The date and time the instance was launched.",
    ).optional(),
    ResourceAwsS3BucketOwnerId: z.array(StringFilterSchema).describe(
      "The canonical user ID of the owner of the S3 bucket.",
    ).optional(),
    ResourceAwsS3BucketOwnerName: z.array(StringFilterSchema).describe(
      "The display name of the owner of the S3 bucket.",
    ).optional(),
    ResourceAwsIamAccessKeyStatus: z.array(StringFilterSchema).describe(
      "The status of the IAM access key related to a finding.",
    ).optional(),
    ResourceAwsIamAccessKeyCreatedAt: z.array(DateFilterSchema).describe(
      "The creation date/time of the IAM access key related to a finding.",
    ).optional(),
    ResourceContainerName: z.array(StringFilterSchema).describe(
      "The name of the container related to a finding.",
    ).optional(),
    ResourceContainerImageId: z.array(StringFilterSchema).describe(
      "The identifier of the image related to a finding.",
    ).optional(),
    ResourceContainerImageName: z.array(StringFilterSchema).describe(
      "The name of the image related to a finding.",
    ).optional(),
    ResourceContainerLaunchedAt: z.array(DateFilterSchema).describe(
      "A timestamp that identifies when the container was started.",
    ).optional(),
    ResourceDetailsOther: z.array(MapFilterSchema).describe(
      "The details of a resource that doesn't have a specific subfield for the resource type defined.",
    ).optional(),
    ComplianceStatus: z.array(StringFilterSchema).describe(
      "Exclusive to findings that are generated as the result of a check run against a specific rule in a supported standard.",
    ).optional(),
    VerificationState: z.array(StringFilterSchema).describe(
      "The veracity of a finding.",
    ).optional(),
    WorkflowState: z.array(StringFilterSchema).describe(
      "The workflow state of a finding.",
    ).optional(),
    WorkflowStatus: z.array(StringFilterSchema).describe(
      "The status of the investigation into a finding.",
    ).optional(),
    RecordState: z.array(StringFilterSchema).describe(
      "The updated record state for the finding.",
    ).optional(),
    RelatedFindingsProductArn: z.array(StringFilterSchema).describe(
      "The ARN of the solution that generated a related finding.",
    ).optional(),
    RelatedFindingsId: z.array(StringFilterSchema).describe(
      "The solution-generated identifier for a related finding.",
    ).optional(),
    ResourceApplicationArn: z.array(StringFilterSchema).describe(
      "The ARN of the application that is related to a finding.",
    ).optional(),
    ResourceApplicationName: z.array(StringFilterSchema).describe(
      "The name of the application that is related to a finding.",
    ).optional(),
    NoteText: z.array(StringFilterSchema).describe("The text of a note.")
      .optional(),
    NoteUpdatedAt: z.array(DateFilterSchema).describe(
      "The timestamp of when the note was updated.",
    ).optional(),
    NoteUpdatedBy: z.array(StringFilterSchema).describe(
      "The principal that created a note.",
    ).optional(),
    Sample: z.array(BooleanFilterSchema).describe(
      "Indicates whether or not sample findings are included in the filter results.",
    ).optional(),
    ComplianceAssociatedStandardsId: z.array(StringFilterSchema).describe(
      "The unique identifier of a standard in which a control is enabled.",
    ).optional(),
    ComplianceSecurityControlId: z.array(StringFilterSchema).describe(
      "The unique identifier of a control across standards.",
    ).optional(),
    ComplianceSecurityControlParametersName: z.array(StringFilterSchema)
      .describe("The name of a security control parameter.").optional(),
    ComplianceSecurityControlParametersValue: z.array(StringFilterSchema)
      .describe("The current value of a security control parameter.")
      .optional(),
    FindingProviderFieldsConfidence: z.array(NumberFilterSchema).describe(
      "The finding provider value for the finding confidence.",
    ).optional(),
    FindingProviderFieldsCriticality: z.array(NumberFilterSchema).describe(
      "The finding provider value for the level of importance assigned to the resources associated with the findings.",
    ).optional(),
    FindingProviderFieldsRelatedFindingsId: z.array(StringFilterSchema)
      .describe(
        "The finding identifier of a related finding that is identified by the finding provider.",
      ).optional(),
    FindingProviderFieldsRelatedFindingsProductArn: z.array(StringFilterSchema)
      .describe(
        "The ARN of the solution that generated a related finding that is identified by the finding provider.",
      ).optional(),
    FindingProviderFieldsSeverityLabel: z.array(StringFilterSchema).describe(
      "The finding provider value for the severity label.",
    ).optional(),
    FindingProviderFieldsSeverityOriginal: z.array(StringFilterSchema).describe(
      "The finding provider's original value for the severity.",
    ).optional(),
    FindingProviderFieldsTypes: z.array(StringFilterSchema).describe(
      "One or more finding types that the finding provider assigned to the finding.",
    ).optional(),
    ResourceAwsIamAccessKeyPrincipalName: z.array(StringFilterSchema).describe(
      "The name of the principal that is associated with an IAM access key.",
    ).optional(),
    ResourceAwsIamUserUserName: z.array(StringFilterSchema).describe(
      "The name of an IAM user.",
    ).optional(),
    VulnerabilitiesExploitAvailable: z.array(StringFilterSchema).describe(
      "Indicates whether a software vulnerability in your environment has a known exploit.",
    ).optional(),
    VulnerabilitiesFixAvailable: z.array(StringFilterSchema).describe(
      "Indicates whether a vulnerability is fixed in a newer version of the affected software packages.",
    ).optional(),
    Keyword: z.array(KeywordFilterSchema).describe("A keyword for a finding.")
      .optional(),
    ResourceAwsIamAccessKeyUserName: z.array(StringFilterSchema).describe(
      "The user associated with the IAM access key related to a finding.",
    ).optional(),
    SeverityNormalized: z.array(NumberFilterSchema).describe(
      "The normalized severity of a finding.",
    ).optional(),
    SeverityProduct: z.array(NumberFilterSchema).describe(
      "The native severity as defined by the security findings provider's solution that generated the finding.",
    ).optional(),
  }).describe(
    "One or more attributes used to filter the findings included in the insight",
  ).optional(),
  GroupByAttribute: z.string().min(1).describe(
    "The grouping attribute for the insight's findings",
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

/** Swamp extension model for SecurityHub Insight. Registered at `@swamp/aws/securityhub/insight`. */
export const model = {
  type: "@swamp/aws/securityhub/insight",
  version: "2026.06.15.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "SecurityHub Insight resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SecurityHub Insight",
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
          "AWS::SecurityHub::Insight",
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
      description: "Get a SecurityHub Insight",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SecurityHub Insight",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::SecurityHub::Insight",
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
      description: "Update a SecurityHub Insight",
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
        const identifier = existing.InsightArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::SecurityHub::Insight",
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
          "AWS::SecurityHub::Insight",
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
      description: "Delete a SecurityHub Insight",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SecurityHub Insight",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::SecurityHub::Insight",
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
      description: "Sync SecurityHub Insight state from AWS",
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
        const identifier = existing.InsightArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SecurityHub::Insight",
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
