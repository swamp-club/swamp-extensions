// Auto-generated extension model for @swamp/aws/securityhub/automation-rule
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SecurityHub AutomationRule (AWS::SecurityHub::AutomationRule).
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

const SeverityUpdateSchema = z.object({
  Product: z.number().describe(
    "The native severity as defined by the AWS service or integrated partner product that generated the finding.",
  ).optional(),
  Label: z.enum(["INFORMATIONAL", "LOW", "MEDIUM", "HIGH", "CRITICAL"])
    .describe(
      "The severity value of the finding. The allowed values are the following. INFORMATIONAL - No issue was found. LOW - The issue does not require action on its own. MEDIUM - The issue must be addressed but not urgently. HIGH - The issue must be addressed as a priority. CRITICAL - The issue must be remediated immediately to avoid it escalating.",
    ).optional(),
  Normalized: z.number().int().min(0).max(100).describe(
    "The normalized severity for the finding. This attribute is to be deprecated in favor of Label. If you provide Normalized and don't provide Label, Label is set automatically as follows. 0 - INFORMATIONAL 1–39 - LOW 40–69 - MEDIUM 70–89 - HIGH 90–100 - CRITICAL",
  ).optional(),
});

const RelatedFindingSchema = z.object({
  ProductArn: z.string().min(12).max(2048).regex(
    new RegExp(
      "^arn:(aws|aws-cn|aws-us-gov|aws-iso-?[a-z]{0,2}):[A-Za-z0-9]{1,63}:[a-z]+-([a-z]{1,10}-)?[a-z]+-[0-9]+:([0-9]{12})?:.+$",
    ),
  ).describe(
    "The Amazon Resource Name (ARN) for the product that generated a related finding.",
  ),
  Id: z.string().describe(
    "The product-generated identifier for a related finding. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
  ),
});

const NoteUpdateSchema = z.object({
  Text: z.string().min(1).max(512).describe("The updated note text."),
  UpdatedBy: z.string().describe("The principal that updated the note."),
});

const WorkflowUpdateSchema = z.object({
  Status: z.enum(["NEW", "NOTIFIED", "RESOLVED", "SUPPRESSED"]).describe(
    "The status of the investigation into the finding. The workflow status is specific to an individual finding. It does not affect the generation of new findings. For example, setting the workflow status to SUPPRESSED or RESOLVED does not prevent a new finding for the same issue. The allowed values are the following. NEW - The initial state of a finding, before it is reviewed. Security Hub CSPM also resets WorkFlowStatus from NOTIFIED or RESOLVED to NEW in the following cases: The record state changes from ARCHIVED to ACTIVE. The compliance status changes from PASSED to either WARNING, FAILED, or NOT_AVAILABLE. NOTIFIED - Indicates that you notified the resource owner about the security issue. Used when the initial reviewer is not the resource owner, and needs intervention from the resource owner. RESOLVED - The finding was reviewed and remediated and is now considered resolved. SUPPRESSED - Indicates that you reviewed the finding and don't believe that any action is needed. The finding is no longer updated.",
  ),
});

const AutomationRulesFindingFieldsUpdateSchema = z.object({
  Types: z.array(z.string().regex(new RegExp("^([^/]+)(/[^/]+){0,2}$")))
    .describe("The rule action updates the Types field of a finding.")
    .optional(),
  Severity: SeverityUpdateSchema.describe(
    "The rule action will update the Severity field of a finding.",
  ).optional(),
  Confidence: z.number().int().min(0).max(100).describe(
    "The rule action updates the Confidence field of a finding.",
  ).optional(),
  Criticality: z.number().int().min(0).max(100).describe(
    "The rule action updates the Criticality field of a finding.",
  ).optional(),
  UserDefinedFields: z.record(z.string(), z.string().min(0).max(1024)).describe(
    "The rule action updates the UserDefinedFields field of a finding.",
  ).optional(),
  VerificationState: z.enum([
    "UNKNOWN",
    "TRUE_POSITIVE",
    "FALSE_POSITIVE",
    "BENIGN_POSITIVE",
  ]).describe(
    "The rule action updates the VerificationState field of a finding.",
  ).optional(),
  RelatedFindings: z.array(RelatedFindingSchema).describe(
    "The rule action will update the RelatedFindings field of a finding.",
  ).optional(),
  Note: NoteUpdateSchema.describe(
    "The rule action will update the Note field of a finding.",
  ).optional(),
  Workflow: WorkflowUpdateSchema.describe(
    "The rule action will update the Workflow field of a finding.",
  ).optional(),
});

const AutomationRulesActionSchema = z.object({
  Type: z.enum(["FINDING_FIELDS_UPDATE"]).describe(
    "Specifies the type of action that Security Hub CSPM takes when a finding matches the defined criteria of a rule.",
  ),
  FindingFieldsUpdate: AutomationRulesFindingFieldsUpdateSchema.describe(
    "Specifies that the automation rule action is an update to a finding field.",
  ),
});

const StringFilterSchema = z.object({
  Comparison: z.enum([
    "EQUALS",
    "PREFIX",
    "NOT_EQUALS",
    "PREFIX_NOT_EQUALS",
    "CONTAINS",
    "NOT_CONTAINS",
  ]).describe(
    "The condition to apply to a string value when filtering Security Hub CSPM findings. To search for values that have the filter value, use one of the following comparison operators: To search for values that include the filter value, use CONTAINS. For example, the filter Title CONTAINS CloudFront matches findings that have a Title that includes the string CloudFront. To search for values that exactly match the filter value, use EQUALS. For example, the filter AwsAccountId EQUALS 123456789012 only matches findings that have an account ID of 123456789012. To search for values that start with the filter value, use PREFIX. For example, the filter ResourceRegion PREFIX us matches findings that have a ResourceRegion that starts with us. A ResourceRegion that starts with a different value, such as af, ap, or ca, doesn't match. CONTAINS, EQUALS, and PREFIX filters on the same field are joined by OR. A finding matches if it matches any one of those filters. For example, the filters Title CONTAINS CloudFront OR Title CONTAINS CloudWatch match a finding that includes either CloudFront, CloudWatch, or both strings in the title. To search for values that don’t have the filter value, use one of the following comparison operators: To search for values that exclude the filter value, use NOT_CONTAINS. For example, the filter Title NOT_CONTAINS CloudFront matches findings that have a Title that excludes the string CloudFront. To search for values other than the filter value, use NOT_EQUALS. For example, the filter AwsAccountId NOT_EQUALS 123456789012 only matches findings that have an account ID other than 123456789012. To search for values that don't start with the filter value, use PREFIX_NOT_EQUALS. For example, the filter ResourceRegion PREFIX_NOT_EQUALS us matches findings with a ResourceRegion that starts with a value other than us. NOT_CONTAINS, NOT_EQUALS, and PREFIX_NOT_EQUALS filters on the same field are joined by AND. A finding matches only if it matches all of those filters. For example, the filters Title NOT_CONTAINS CloudFront AND Title NOT_CONTAINS CloudWatch match a finding that excludes both CloudFront and CloudWatch in the title. You can’t have both a CONTAINS filter and a NOT_CONTAINS filter on the same field. Similarly, you can't provide both an EQUALS filter and a NOT_EQUALS or PREFIX_NOT_EQUALS filter on the same field. Combining filters in this way returns an error. CONTAINS filters can only be used with other CONTAINS filters. NOT_CONTAINS filters can only be used with other NOT_CONTAINS filters. You can combine PREFIX filters with NOT_EQUALS or PREFIX_NOT_EQUALS filters for the same field. Security Hub CSPM first processes the PREFIX filters, and then the NOT_EQUALS or PREFIX_NOT_EQUALS filters. For example, for the following filters, Security Hub CSPM first identifies findings that have resource types that start with either AwsIam or AwsEc2. It then excludes findings that have a resource type of AwsIamPolicy and findings that have a resource type of AwsEc2NetworkInterface. ResourceType PREFIX AwsIam ResourceType PREFIX AwsEc2 ResourceType NOT_EQUALS AwsIamPolicy ResourceType NOT_EQUALS AwsEc2NetworkInterface CONTAINS and NOT_CONTAINS operators can be used only with automation rules V1. CONTAINS_WORD operator is only supported in GetFindingsV2, GetFindingStatisticsV2, GetResourcesV2, and GetResourcesStatisticsV2 APIs. For more information, see [Automation rules](https://docs.aws.amazon.com/securityhub/latest/userguide/automation-rules.html) in the *User Guide*.",
  ),
  Value: z.string().describe(
    "The string filter value. Filter values are case sensitive. For example, the product name for control-based findings is Security Hub CSPM. If you provide security hub as the filter value, there's no match.",
  ),
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
      "^(\\d\\d\\d\\d)-([0][1-9]|[1][0-2])-([0][1-9]|[1-2](\\d)|[3][0-1])[T](?:([0-1](\\d)|[2][0-3]):[0-5](\\d):[0-5](\\d)|23:59:60)(?:\\.(\\d)+)?([Z]|[+-](\\d\\d)(:?(\\d\\d))?)$",
    ),
  ).describe(
    "A timestamp that provides the end date for the date filter. For more information about the validation and formatting of timestamp fields in ASHlong, see [Timestamps](https://docs.aws.amazon.com/securityhub/1.0/APIReference/Welcome.html#timestamps).",
  ).optional(),
  Start: z.string().regex(
    new RegExp(
      "^(\\d\\d\\d\\d)-([0][1-9]|[1][0-2])-([0][1-9]|[1-2](\\d)|[3][0-1])[T](?:([0-1](\\d)|[2][0-3]):[0-5](\\d):[0-5](\\d)|23:59:60)(?:\\.(\\d)+)?([Z]|[+-](\\d\\d)(:?(\\d\\d))?)$",
    ),
  ).describe(
    "A timestamp that provides the start date for the date filter. For more information about the validation and formatting of timestamp fields in ASHlong, see [Timestamps](https://docs.aws.amazon.com/securityhub/1.0/APIReference/Welcome.html#timestamps).",
  ).optional(),
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
  Comparison: z.enum(["EQUALS", "NOT_EQUALS", "CONTAINS", "NOT_CONTAINS"])
    .describe(
      "The condition to apply to the key value when filtering Security Hub CSPM findings with a map filter. To search for values that have the filter value, use one of the following comparison operators: To search for values that include the filter value, use CONTAINS. For example, for the ResourceTags field, the filter Department CONTAINS Security matches findings that include the value Security for the Department tag. In the same example, a finding with a value of Security team for the Department tag is a match. To search for values that exactly match the filter value, use EQUALS. For example, for the ResourceTags field, the filter Department EQUALS Security matches findings that have the value Security for the Department tag. CONTAINS and EQUALS filters on the same field are joined by OR. A finding matches if it matches any one of those filters. For example, the filters Department CONTAINS Security OR Department CONTAINS Finance match a finding that includes either Security, Finance, or both values. To search for values that don't have the filter value, use one of the following comparison operators: To search for values that exclude the filter value, use NOT_CONTAINS. For example, for the ResourceTags field, the filter Department NOT_CONTAINS Finance matches findings that exclude the value Finance for the Department tag. To search for values other than the filter value, use NOT_EQUALS. For example, for the ResourceTags field, the filter Department NOT_EQUALS Finance matches findings that don’t have the value Finance for the Department tag. NOT_CONTAINS and NOT_EQUALS filters on the same field are joined by AND. A finding matches only if it matches all of those filters. For example, the filters Department NOT_CONTAINS Security AND Department NOT_CONTAINS Finance match a finding that excludes both the Security and Finance values. CONTAINS filters can only be used with other CONTAINS filters. NOT_CONTAINS filters can only be used with other NOT_CONTAINS filters. You can’t have both a CONTAINS filter and a NOT_CONTAINS filter on the same field. Similarly, you can’t have both an EQUALS filter and a NOT_EQUALS filter on the same field. Combining filters in this way returns an error. CONTAINS and NOT_CONTAINS operators can be used only with automation rules. For more information, see [Automation rules](https://docs.aws.amazon.com/securityhub/latest/userguide/automation-rules.html) in the *User Guide*.",
    ),
  Key: z.string().describe(
    "The key of the map filter. For example, for ResourceTags, Key identifies the name of the tag. For UserDefinedFields, Key is the name of the field.",
  ),
  Value: z.string().describe(
    "The value for the key in the map filter. Filter values are case sensitive. For example, one of the values for a tag called Department might be Security. If you provide security as the filter value, then there's no match.",
  ),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  RuleStatus: z.enum(["ENABLED", "DISABLED"]).describe(
    "Whether the rule is active after it is created. If this parameter is equal to ENABLED, ASH applies the rule to findings and finding updates after the rule is created.",
  ).optional(),
  RuleOrder: z.number().int().min(1).max(1000).describe(
    "An integer ranging from 1 to 1000 that represents the order in which the rule action is applied to findings. Security Hub CSPM applies rules with lower values for this parameter first.",
  ),
  Description: z.string().min(1).max(1024).describe(
    "A description of the rule.",
  ),
  RuleName: z.string().min(1).max(256).describe("The name of the rule."),
  IsTerminal: z.boolean().describe(
    "Specifies whether a rule is the last to be applied with respect to a finding that matches the rule criteria. This is useful when a finding matches the criteria for multiple rules, and each rule has different actions. If a rule is terminal, Security Hub CSPM applies the rule action to a finding that matches the rule criteria and doesn't evaluate other rules for the finding. By default, a rule isn't terminal.",
  ).optional(),
  Actions: z.array(AutomationRulesActionSchema).describe(
    "One or more actions to update finding fields if a finding matches the conditions specified in Criteria.",
  ),
  Criteria: z.object({
    ProductArn: z.array(StringFilterSchema).describe(
      "The Amazon Resource Name (ARN) for a third-party product that generated a finding in Security Hub CSPM. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    AwsAccountId: z.array(StringFilterSchema).describe(
      "The AWS-account ID in which a finding was generated. Array Members: Minimum number of 1 item. Maximum number of 100 items.",
    ).optional(),
    Id: z.array(StringFilterSchema).describe(
      "The product-specific identifier for a finding. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    GeneratorId: z.array(StringFilterSchema).describe(
      "The identifier for the solution-specific component that generated a finding. Array Members: Minimum number of 1 item. Maximum number of 100 items.",
    ).optional(),
    Type: z.array(StringFilterSchema).describe(
      "One or more finding types in the format of namespace/category/classifier that classify a finding. For a list of namespaces, classifiers, and categories, see [Types taxonomy for ASFF](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-findings-format-type-taxonomy.html) in the *User Guide*. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    FirstObservedAt: z.array(DateFilterSchema).describe(
      "A timestamp that indicates when the potential security issue captured by a finding was first observed by the security findings product. For more information about the validation and formatting of timestamp fields in ASHlong, see [Timestamps](https://docs.aws.amazon.com/securityhub/1.0/APIReference/Welcome.html#timestamps). Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    LastObservedAt: z.array(DateFilterSchema).describe(
      "A timestamp that indicates when the security findings provider most recently observed a change in the resource that is involved in the finding. For more information about the validation and formatting of timestamp fields in ASHlong, see [Timestamps](https://docs.aws.amazon.com/securityhub/1.0/APIReference/Welcome.html#timestamps). Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    Confidence: z.array(NumberFilterSchema).describe(
      "The likelihood that a finding accurately identifies the behavior or issue that it was intended to identify. Confidence is scored on a 0–100 basis using a ratio scale. A value of 0 means 0 percent confidence, and a value of 100 means 100 percent confidence. For example, a data exfiltration detection based on a statistical deviation of network traffic has low confidence because an actual exfiltration hasn't been verified. For more information, see [Confidence](https://docs.aws.amazon.com/securityhub/latest/userguide/asff-top-level-attributes.html#asff-confidence) in the *User Guide*. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    Criticality: z.array(NumberFilterSchema).describe(
      "The level of importance that is assigned to the resources that are associated with a finding. Criticality is scored on a 0–100 basis, using a ratio scale that supports only full integers. A score of 0 means that the underlying resources have no criticality, and a score of 100 is reserved for the most critical resources. For more information, see [Criticality](https://docs.aws.amazon.com/securityhub/latest/userguide/asff-top-level-attributes.html#asff-criticality) in the *User Guide*. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    Title: z.array(StringFilterSchema).describe(
      "A finding's title. Array Members: Minimum number of 1 item. Maximum number of 100 items.",
    ).optional(),
    Description: z.array(StringFilterSchema).describe(
      "A finding's description. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    SourceUrl: z.array(StringFilterSchema).describe(
      "Provides a URL that links to a page about the current finding in the finding product. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    ProductName: z.array(StringFilterSchema).describe(
      "Provides the name of the product that generated the finding. For control-based findings, the product name is Security Hub CSPM. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    CompanyName: z.array(StringFilterSchema).describe(
      "The name of the company for the product that generated the finding. For control-based findings, the company is AWS. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    SeverityLabel: z.array(StringFilterSchema).describe(
      "The severity value of the finding. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    ResourceType: z.array(StringFilterSchema).describe(
      "A finding's title. Array Members: Minimum number of 1 item. Maximum number of 100 items.",
    ).optional(),
    ResourceId: z.array(StringFilterSchema).describe(
      "The identifier for the given resource type. For AWS resources that are identified by Amazon Resource Names (ARNs), this is the ARN. For AWS resources that lack ARNs, this is the identifier as defined by the AWS-service that created the resource. For non-AWS resources, this is a unique identifier that is associated with the resource. Array Members: Minimum number of 1 item. Maximum number of 100 items.",
    ).optional(),
    ResourcePartition: z.array(StringFilterSchema).describe(
      "The partition in which the resource that the finding pertains to is located. A partition is a group of AWS-Regions. Each AWS-account is scoped to one partition. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    ResourceRegion: z.array(StringFilterSchema).describe(
      "The AWS-Region where the resource that a finding pertains to is located. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    ResourceTags: z.array(MapFilterSchema).describe(
      "A list of AWS tags associated with a resource at the time the finding was processed. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    ResourceDetailsOther: z.array(MapFilterSchema).describe(
      "Custom fields and values about the resource that a finding pertains to. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    ComplianceStatus: z.array(StringFilterSchema).describe(
      "The result of a security check. This field is only used for findings generated from controls. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    ComplianceSecurityControlId: z.array(StringFilterSchema).describe(
      "The security control ID for which a finding was generated. Security control IDs are the same across standards. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    ComplianceAssociatedStandardsId: z.array(StringFilterSchema).describe(
      "The unique identifier of a standard in which a control is enabled. This field consists of the resource portion of the Amazon Resource Name (ARN) returned for a standard in the [DescribeStandards](https://docs.aws.amazon.com/securityhub/1.0/APIReference/API_DescribeStandards.html) API response. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    VerificationState: z.array(StringFilterSchema).describe(
      "Provides the veracity of a finding. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    WorkflowStatus: z.array(StringFilterSchema).describe(
      "Provides information about the status of the investigation into a finding. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    RecordState: z.array(StringFilterSchema).describe(
      "Provides the current state of a finding. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    RelatedFindingsProductArn: z.array(StringFilterSchema).describe(
      "The ARN for the product that generated a related finding. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    RelatedFindingsId: z.array(StringFilterSchema).describe(
      "The product-generated identifier for a related finding. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    NoteText: z.array(StringFilterSchema).describe(
      "The text of a user-defined note that's added to a finding. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    NoteUpdatedAt: z.array(DateFilterSchema).describe(
      "The timestamp of when the note was updated. For more information about the validation and formatting of timestamp fields in ASHlong, see [Timestamps](https://docs.aws.amazon.com/securityhub/1.0/APIReference/Welcome.html#timestamps). Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    NoteUpdatedBy: z.array(StringFilterSchema).describe(
      "The principal that created a note. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    UserDefinedFields: z.array(MapFilterSchema).describe(
      "A list of user-defined name and value string pairs added to a finding. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
  }).describe(
    "A set of [Security Finding Format (ASFF)](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-findings-format.html) finding field attributes and corresponding expected values that ASH uses to filter findings. If a rule is enabled and a finding matches the criteria specified in this parameter, ASH applies the rule action to the finding.",
  ),
  Tags: z.record(z.string(), z.string().min(0).max(256)).describe(
    "User-defined tags associated with an automation rule.",
  ).optional(),
});

const StateSchema = z.object({
  RuleArn: z.string(),
  RuleStatus: z.string().optional(),
  RuleOrder: z.number().optional(),
  Description: z.string().optional(),
  RuleName: z.string().optional(),
  CreatedAt: z.string().optional(),
  UpdatedAt: z.string().optional(),
  CreatedBy: z.string().optional(),
  IsTerminal: z.boolean().optional(),
  Actions: z.array(AutomationRulesActionSchema).optional(),
  Criteria: z.object({
    ProductArn: z.array(StringFilterSchema),
    AwsAccountId: z.array(StringFilterSchema),
    Id: z.array(StringFilterSchema),
    GeneratorId: z.array(StringFilterSchema),
    Type: z.array(StringFilterSchema),
    FirstObservedAt: z.array(DateFilterSchema),
    LastObservedAt: z.array(DateFilterSchema),
    CreatedAt: z.array(DateFilterSchema),
    UpdatedAt: z.array(DateFilterSchema),
    Confidence: z.array(NumberFilterSchema),
    Criticality: z.array(NumberFilterSchema),
    Title: z.array(StringFilterSchema),
    Description: z.array(StringFilterSchema),
    SourceUrl: z.array(StringFilterSchema),
    ProductName: z.array(StringFilterSchema),
    CompanyName: z.array(StringFilterSchema),
    SeverityLabel: z.array(StringFilterSchema),
    ResourceType: z.array(StringFilterSchema),
    ResourceId: z.array(StringFilterSchema),
    ResourcePartition: z.array(StringFilterSchema),
    ResourceRegion: z.array(StringFilterSchema),
    ResourceTags: z.array(MapFilterSchema),
    ResourceDetailsOther: z.array(MapFilterSchema),
    ComplianceStatus: z.array(StringFilterSchema),
    ComplianceSecurityControlId: z.array(StringFilterSchema),
    ComplianceAssociatedStandardsId: z.array(StringFilterSchema),
    VerificationState: z.array(StringFilterSchema),
    WorkflowStatus: z.array(StringFilterSchema),
    RecordState: z.array(StringFilterSchema),
    RelatedFindingsProductArn: z.array(StringFilterSchema),
    RelatedFindingsId: z.array(StringFilterSchema),
    NoteText: z.array(StringFilterSchema),
    NoteUpdatedAt: z.array(DateFilterSchema),
    NoteUpdatedBy: z.array(StringFilterSchema),
    UserDefinedFields: z.array(MapFilterSchema),
  }).optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  RuleStatus: z.enum(["ENABLED", "DISABLED"]).describe(
    "Whether the rule is active after it is created. If this parameter is equal to ENABLED, ASH applies the rule to findings and finding updates after the rule is created.",
  ).optional(),
  RuleOrder: z.number().int().min(1).max(1000).describe(
    "An integer ranging from 1 to 1000 that represents the order in which the rule action is applied to findings. Security Hub CSPM applies rules with lower values for this parameter first.",
  ).optional(),
  Description: z.string().min(1).max(1024).describe(
    "A description of the rule.",
  ).optional(),
  RuleName: z.string().min(1).max(256).describe("The name of the rule.")
    .optional(),
  IsTerminal: z.boolean().describe(
    "Specifies whether a rule is the last to be applied with respect to a finding that matches the rule criteria. This is useful when a finding matches the criteria for multiple rules, and each rule has different actions. If a rule is terminal, Security Hub CSPM applies the rule action to a finding that matches the rule criteria and doesn't evaluate other rules for the finding. By default, a rule isn't terminal.",
  ).optional(),
  Actions: z.array(AutomationRulesActionSchema).describe(
    "One or more actions to update finding fields if a finding matches the conditions specified in Criteria.",
  ).optional(),
  Criteria: z.object({
    ProductArn: z.array(StringFilterSchema).describe(
      "The Amazon Resource Name (ARN) for a third-party product that generated a finding in Security Hub CSPM. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    AwsAccountId: z.array(StringFilterSchema).describe(
      "The AWS-account ID in which a finding was generated. Array Members: Minimum number of 1 item. Maximum number of 100 items.",
    ).optional(),
    Id: z.array(StringFilterSchema).describe(
      "The product-specific identifier for a finding. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    GeneratorId: z.array(StringFilterSchema).describe(
      "The identifier for the solution-specific component that generated a finding. Array Members: Minimum number of 1 item. Maximum number of 100 items.",
    ).optional(),
    Type: z.array(StringFilterSchema).describe(
      "One or more finding types in the format of namespace/category/classifier that classify a finding. For a list of namespaces, classifiers, and categories, see [Types taxonomy for ASFF](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-findings-format-type-taxonomy.html) in the *User Guide*. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    FirstObservedAt: z.array(DateFilterSchema).describe(
      "A timestamp that indicates when the potential security issue captured by a finding was first observed by the security findings product. For more information about the validation and formatting of timestamp fields in ASHlong, see [Timestamps](https://docs.aws.amazon.com/securityhub/1.0/APIReference/Welcome.html#timestamps). Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    LastObservedAt: z.array(DateFilterSchema).describe(
      "A timestamp that indicates when the security findings provider most recently observed a change in the resource that is involved in the finding. For more information about the validation and formatting of timestamp fields in ASHlong, see [Timestamps](https://docs.aws.amazon.com/securityhub/1.0/APIReference/Welcome.html#timestamps). Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    Confidence: z.array(NumberFilterSchema).describe(
      "The likelihood that a finding accurately identifies the behavior or issue that it was intended to identify. Confidence is scored on a 0–100 basis using a ratio scale. A value of 0 means 0 percent confidence, and a value of 100 means 100 percent confidence. For example, a data exfiltration detection based on a statistical deviation of network traffic has low confidence because an actual exfiltration hasn't been verified. For more information, see [Confidence](https://docs.aws.amazon.com/securityhub/latest/userguide/asff-top-level-attributes.html#asff-confidence) in the *User Guide*. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    Criticality: z.array(NumberFilterSchema).describe(
      "The level of importance that is assigned to the resources that are associated with a finding. Criticality is scored on a 0–100 basis, using a ratio scale that supports only full integers. A score of 0 means that the underlying resources have no criticality, and a score of 100 is reserved for the most critical resources. For more information, see [Criticality](https://docs.aws.amazon.com/securityhub/latest/userguide/asff-top-level-attributes.html#asff-criticality) in the *User Guide*. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    Title: z.array(StringFilterSchema).describe(
      "A finding's title. Array Members: Minimum number of 1 item. Maximum number of 100 items.",
    ).optional(),
    Description: z.array(StringFilterSchema).describe(
      "A finding's description. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    SourceUrl: z.array(StringFilterSchema).describe(
      "Provides a URL that links to a page about the current finding in the finding product. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    ProductName: z.array(StringFilterSchema).describe(
      "Provides the name of the product that generated the finding. For control-based findings, the product name is Security Hub CSPM. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    CompanyName: z.array(StringFilterSchema).describe(
      "The name of the company for the product that generated the finding. For control-based findings, the company is AWS. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    SeverityLabel: z.array(StringFilterSchema).describe(
      "The severity value of the finding. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    ResourceType: z.array(StringFilterSchema).describe(
      "A finding's title. Array Members: Minimum number of 1 item. Maximum number of 100 items.",
    ).optional(),
    ResourceId: z.array(StringFilterSchema).describe(
      "The identifier for the given resource type. For AWS resources that are identified by Amazon Resource Names (ARNs), this is the ARN. For AWS resources that lack ARNs, this is the identifier as defined by the AWS-service that created the resource. For non-AWS resources, this is a unique identifier that is associated with the resource. Array Members: Minimum number of 1 item. Maximum number of 100 items.",
    ).optional(),
    ResourcePartition: z.array(StringFilterSchema).describe(
      "The partition in which the resource that the finding pertains to is located. A partition is a group of AWS-Regions. Each AWS-account is scoped to one partition. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    ResourceRegion: z.array(StringFilterSchema).describe(
      "The AWS-Region where the resource that a finding pertains to is located. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    ResourceTags: z.array(MapFilterSchema).describe(
      "A list of AWS tags associated with a resource at the time the finding was processed. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    ResourceDetailsOther: z.array(MapFilterSchema).describe(
      "Custom fields and values about the resource that a finding pertains to. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    ComplianceStatus: z.array(StringFilterSchema).describe(
      "The result of a security check. This field is only used for findings generated from controls. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    ComplianceSecurityControlId: z.array(StringFilterSchema).describe(
      "The security control ID for which a finding was generated. Security control IDs are the same across standards. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    ComplianceAssociatedStandardsId: z.array(StringFilterSchema).describe(
      "The unique identifier of a standard in which a control is enabled. This field consists of the resource portion of the Amazon Resource Name (ARN) returned for a standard in the [DescribeStandards](https://docs.aws.amazon.com/securityhub/1.0/APIReference/API_DescribeStandards.html) API response. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    VerificationState: z.array(StringFilterSchema).describe(
      "Provides the veracity of a finding. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    WorkflowStatus: z.array(StringFilterSchema).describe(
      "Provides information about the status of the investigation into a finding. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    RecordState: z.array(StringFilterSchema).describe(
      "Provides the current state of a finding. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    RelatedFindingsProductArn: z.array(StringFilterSchema).describe(
      "The ARN for the product that generated a related finding. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    RelatedFindingsId: z.array(StringFilterSchema).describe(
      "The product-generated identifier for a related finding. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    NoteText: z.array(StringFilterSchema).describe(
      "The text of a user-defined note that's added to a finding. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    NoteUpdatedAt: z.array(DateFilterSchema).describe(
      "The timestamp of when the note was updated. For more information about the validation and formatting of timestamp fields in ASHlong, see [Timestamps](https://docs.aws.amazon.com/securityhub/1.0/APIReference/Welcome.html#timestamps). Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    NoteUpdatedBy: z.array(StringFilterSchema).describe(
      "The principal that created a note. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
    UserDefinedFields: z.array(MapFilterSchema).describe(
      "A list of user-defined name and value string pairs added to a finding. Array Members: Minimum number of 1 item. Maximum number of 20 items.",
    ).optional(),
  }).describe(
    "A set of [Security Finding Format (ASFF)](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-findings-format.html) finding field attributes and corresponding expected values that ASH uses to filter findings. If a rule is enabled and a finding matches the criteria specified in this parameter, ASH applies the rule action to the finding.",
  ).optional(),
  Tags: z.record(z.string(), z.string().min(0).max(256)).describe(
    "User-defined tags associated with an automation rule.",
  ).optional(),
});

/** Swamp extension model for SecurityHub AutomationRule. Registered at `@swamp/aws/securityhub/automation-rule`. */
export const model = {
  type: "@swamp/aws/securityhub/automation-rule",
  version: "2026.05.15.1",
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
      toVersion: "2026.05.15.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "SecurityHub AutomationRule resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SecurityHub AutomationRule",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::SecurityHub::AutomationRule",
          desiredState,
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
      description: "Get a SecurityHub AutomationRule",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SecurityHub AutomationRule",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::SecurityHub::AutomationRule",
          args.identifier,
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
      description: "Update a SecurityHub AutomationRule",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
          "AWS::SecurityHub::AutomationRule",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::SecurityHub::AutomationRule",
          identifier,
          currentState,
          desiredState,
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
      description: "Delete a SecurityHub AutomationRule",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SecurityHub AutomationRule",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::SecurityHub::AutomationRule",
          args.identifier,
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
      description: "Sync SecurityHub AutomationRule state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
            "AWS::SecurityHub::AutomationRule",
            identifier,
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
