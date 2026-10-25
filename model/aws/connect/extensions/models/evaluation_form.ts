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

// Auto-generated extension model for @swamp/aws/connect/evaluation-form
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Connect EvaluationForm (AWS::Connect::EvaluationForm).
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

const AutomaticFailConfigurationSchema = z.object({
  TargetSection: z.string().regex(new RegExp("^[a-zA-Z0-9._-]{1,40}$"))
    .describe("The referenceId of the target section for auto failure.")
    .optional(),
});

const QuestionOptionPointsConfigurationSchema = z.object({
  PointValue: z.number().int().min(0).max(100).describe(
    "The point value assigned to the answer option.",
  ),
  IsBonus: z.boolean().describe(
    "The flag to mark the option as a bonus option.",
  ).optional(),
});

const EvaluationFormNumericQuestionOptionSchema = z.object({
  MinValue: z.number().int().describe(
    "The minimum answer value of the range option.",
  ),
  MaxValue: z.number().int().describe(
    "The maximum answer value of the range option.",
  ),
  Score: z.number().int().min(0).max(10).describe(
    "The score assigned to answer values within the range option. *Minimum*: 0 *Maximum*: 10",
  ).optional(),
  AutomaticFail: z.boolean().describe(
    "The flag to mark the option as automatic fail. If an automatic fail answer is provided, the overall evaluation gets a score of 0.",
  ).optional(),
  AutomaticFailConfiguration: AutomaticFailConfigurationSchema.describe(
    "A configuration for automatic fail.",
  ).optional(),
  PointsConfiguration: QuestionOptionPointsConfigurationSchema.describe(
    "The points configuration for point-based scoring.",
  ).optional(),
});

const NumericQuestionPropertyValueAutomationSchema = z.object({
  Label: z.enum([
    "OVERALL_CUSTOMER_SENTIMENT_SCORE",
    "OVERALL_AGENT_SENTIMENT_SCORE",
    "NON_TALK_TIME",
    "NON_TALK_TIME_PERCENTAGE",
    "NUMBER_OF_INTERRUPTIONS",
    "CONTACT_DURATION",
    "AGENT_INTERACTION_DURATION",
    "CUSTOMER_HOLD_TIME",
    "LONGEST_HOLD_DURATION",
    "NUMBER_OF_HOLDS",
    "AGENT_INTERACTION_AND_HOLD_DURATION",
    "CUSTOMER_SENTIMENT_SCORE_WITHOUT_AGENT",
    "CUSTOMER_SENTIMENT_SCORE_WITH_AGENT",
  ]).describe("The property label of the automation."),
});

const EvaluationFormQuestionAutomationAnswerSourceSchema = z.object({
  SourceType: z.enum(["CONTACT_LENS_DATA", "GEN_AI"]).describe(
    "The automation answer source type.",
  ),
});

const EvaluationFormNumericQuestionAutomationSchema = z.object({
  PropertyValue: NumericQuestionPropertyValueAutomationSchema.describe(
    "The property value of the automation.",
  ).optional(),
  AnswerSource: EvaluationFormQuestionAutomationAnswerSourceSchema.describe(
    "A source of automation answer for numeric question.",
  ).optional(),
});

const EvaluationFormNumericQuestionPropertiesSchema = z.object({
  MinValue: z.number().int().describe("The minimum answer value."),
  MaxValue: z.number().int().describe("The maximum answer value."),
  Options: z.array(EvaluationFormNumericQuestionOptionSchema).describe(
    "The scoring options of the numeric question.",
  ).optional(),
  Automation: EvaluationFormNumericQuestionAutomationSchema.describe(
    "The automation properties of the numeric question.",
  ).optional(),
});

const EvaluationFormSingleSelectQuestionOptionSchema = z.object({
  RefId: z.string().regex(new RegExp("^[a-zA-Z0-9._-]{1,40}$")).describe(
    "The identifier of the answer option. An identifier must be unique within the question. *Length Constraints*: Minimum length of 1. Maximum length of 40.",
  ),
  Text: z.string().min(1).max(128).describe(
    "The title of the answer option. *Length Constraints*: Minimum length of 1. Maximum length of 128.",
  ),
  Score: z.number().int().min(0).max(10).describe(
    "The score assigned to the answer option. *Minimum*: 0 *Maximum*: 10",
  ).optional(),
  AutomaticFail: z.boolean().describe(
    "The flag to mark the option as automatic fail. If an automatic fail answer is provided, the overall evaluation gets a score of 0.",
  ).optional(),
  AutomaticFailConfiguration: AutomaticFailConfigurationSchema.describe(
    "Whether automatic fail is configured on a single select question.",
  ).optional(),
  PointsConfiguration: QuestionOptionPointsConfigurationSchema.describe(
    "The points configuration for point-based scoring.",
  ).optional(),
});

const SingleSelectQuestionRuleCategoryAutomationSchema = z.object({
  Category: z.string().min(1).max(50).describe(
    "The category name, as defined in Rules. *Minimum*: 1 *Maximum*: 50",
  ),
  Condition: z.enum(["PRESENT", "NOT_PRESENT"]).describe(
    "The condition to apply for the automation option. If the condition is PRESENT, then the option is applied when the contact data includes the category. Similarly, if the condition is NOT_PRESENT, then the option is applied when the contact data does not include the category. *Allowed values*: PRESENT | NOT_PRESENT *Maximum*: 50",
  ),
  OptionRefId: z.string().regex(new RegExp("^[a-zA-Z0-9._-]{1,40}$")).describe(
    "The identifier of the answer option. An identifier must be unique within the question. *Length Constraints*: Minimum length of 1. Maximum length of 40.",
  ),
});

const EvaluationFormSingleSelectQuestionAutomationOptionSchema = z.object({
  RuleCategory: SingleSelectQuestionRuleCategoryAutomationSchema.describe(
    "The automation option based on a rule category for the single select question.",
  ),
});

const EvaluationFormSingleSelectQuestionAutomationSchema = z.object({
  Options: z.array(EvaluationFormSingleSelectQuestionAutomationOptionSchema)
    .describe(
      "The automation options of the single select question. *Minimum*: 1 *Maximum*: 20",
    ).optional(),
  DefaultOptionRefId: z.string().regex(new RegExp("^[a-zA-Z0-9._-]{1,40}$"))
    .describe(
      "The identifier of the default answer option, when none of the automation options match the criteria. *Length Constraints*: Minimum length of 1. Maximum length of 40.",
    ).optional(),
  AnswerSource: EvaluationFormQuestionAutomationAnswerSourceSchema.describe(
    "Automation answer source.",
  ).optional(),
});

const EvaluationFormSingleSelectQuestionPropertiesSchema = z.object({
  Options: z.array(EvaluationFormSingleSelectQuestionOptionSchema).describe(
    "The answer options of the single select question. *Minimum*: 2 *Maximum*: 256",
  ),
  DisplayAs: z.enum(["DROPDOWN", "RADIO"]).describe(
    "The display mode of the single select question. *Allowed values*: DROPDOWN | RADIO",
  ).optional(),
  Automation: EvaluationFormSingleSelectQuestionAutomationSchema.describe(
    "The display mode of the single select question.",
  ).optional(),
});

const EvaluationFormTextQuestionAutomationSchema = z.object({
  AnswerSource: EvaluationFormQuestionAutomationAnswerSourceSchema.describe(
    "Automation answer source.",
  ).optional(),
});

const EvaluationFormTextQuestionPropertiesSchema = z.object({
  Automation: EvaluationFormTextQuestionAutomationSchema.describe(
    "The automation properties of the text question.",
  ).optional(),
});

const EvaluationFormMultiSelectQuestionOptionSchema = z.object({
  RefId: z.string().regex(new RegExp("^[a-zA-Z0-9._-]{1,40}$")).describe(
    "Reference identifier for this option.",
  ),
  Text: z.string().min(1).max(128).describe("Display text for this option."),
  Score: z.number().int().min(0).max(10).describe(
    "The score assigned to the answer option.",
  ).optional(),
  AutomaticFail: z.boolean().describe(
    "The flag to mark the option as automatic fail. If an automatic fail answer is provided, the overall evaluation gets a score of 0.",
  ).optional(),
  AutomaticFailConfiguration: AutomaticFailConfigurationSchema.optional(),
  PointsConfiguration: QuestionOptionPointsConfigurationSchema.describe(
    "The points configuration for point-based scoring.",
  ).optional(),
});

const MultiSelectQuestionRuleCategoryAutomationSchema = z.object({
  Category: z.string().min(1).max(50).describe(
    "The category name for this automation rule.",
  ),
  Condition: z.enum(["PRESENT", "NOT_PRESENT"]).describe(
    "The condition for this automation rule.",
  ),
  OptionRefIds: z.array(z.string().regex(new RegExp("^[a-zA-Z0-9._-]{1,40}$")))
    .describe("Reference IDs of options for this automation rule."),
});

const EvaluationFormMultiSelectQuestionAutomationOptionSchema = z.object({
  RuleCategory: MultiSelectQuestionRuleCategoryAutomationSchema.describe(
    "Rule category configuration for this automation option.",
  ),
});

const EvaluationFormMultiSelectQuestionAutomationSchema = z.object({
  Options: z.array(EvaluationFormMultiSelectQuestionAutomationOptionSchema)
    .describe("Automation options for the multi-select question.").optional(),
  DefaultOptionRefIds: z.array(
    z.string().regex(new RegExp("^[a-zA-Z0-9._-]{1,40}$")),
  ).describe("Reference IDs of default options.").optional(),
  AnswerSource: EvaluationFormQuestionAutomationAnswerSourceSchema.optional(),
});

const EvaluationFormMultiSelectQuestionPropertiesSchema = z.object({
  Options: z.array(EvaluationFormMultiSelectQuestionOptionSchema).describe(
    "Options available for this multi-select question.",
  ),
  DisplayAs: z.enum(["DROPDOWN", "CHECKBOX"]).describe(
    "Display format for the multi-select question.",
  ).optional(),
  Automation: EvaluationFormMultiSelectQuestionAutomationSchema.describe(
    "Automation configuration for this multi-select question.",
  ).optional(),
});

const EvaluationFormQuestionTypePropertiesSchema = z.object({
  Numeric: EvaluationFormNumericQuestionPropertiesSchema.describe(
    "The properties of the numeric question.",
  ).optional(),
  SingleSelect: EvaluationFormSingleSelectQuestionPropertiesSchema.describe(
    "The properties of the numeric question.",
  ).optional(),
  Text: EvaluationFormTextQuestionPropertiesSchema.describe(
    "The properties of the text question.",
  ).optional(),
  MultiSelect: EvaluationFormMultiSelectQuestionPropertiesSchema.describe(
    "Properties for multi-select question types.",
  ).optional(),
});

const QuestionPointsConfigurationSchema = z.object({
  MaxPointValue: z.number().int().min(0).max(100).describe(
    "The maximum point value.",
  ).optional(),
  MinPointValue: z.number().int().min(0).max(100).describe(
    "The minimum point value.",
  ).optional(),
  IsBonus: z.boolean().describe(
    "The flag to mark the question as a bonus question.",
  ).optional(),
});

const EvaluationFormScoreThresholdSchema = z.object({
  PerformanceCategory: z.enum(["NEEDS_IMPROVEMENT", "EXCEEDS_EXPECTATIONS"])
    .describe("The performance category name."),
  MinScorePercentage: z.number().min(0).max(100).describe(
    "The minimum score percentage for the performance category.",
  ).optional(),
  MaxScorePercentage: z.number().min(0).max(100).describe(
    "The maximum score percentage for the performance category.",
  ).optional(),
});

const EvaluationFormQuestionScoringConfigurationSchema = z.object({
  PointsConfiguration: QuestionPointsConfigurationSchema.describe(
    "The points configuration for point-based scoring.",
  ).optional(),
  IsExcludedFromScoring: z.boolean().describe(
    "The flag to exclude the question from scoring.",
  ).optional(),
  ScoreThresholds: z.array(EvaluationFormScoreThresholdSchema).describe(
    "The score thresholds for performance categories.",
  ).optional(),
});

const EvaluationFormMetricConfigurationSchema = z.object({
  MetricType: z.enum(["BUSINESS_OUTCOME"]).describe(
    "The type of metric. Currently, only BUSINESS_OUTCOME is supported.",
  ),
  MetricName: z.string().min(1).max(256).regex(new RegExp("^[^\\p{C}]*$", "u"))
    .describe(
      "The name of the metric. Valid values are: SALE_SUCCESS – Sale success. CSAT – Customer satisfaction. CHURN_PROPENSITY – Churn propensity. SELF_SERVICE_SUCCESS – Self-service success. PARTIAL_SELF_SERVICE_SUCCESS – Partial self-service success.",
    ),
});

const EvaluationFormItemEnablementSourceSchema = z.object({
  Type: z.enum(["QUESTION_REF_ID"]).describe("A type of source item."),
  RefId: z.string().regex(new RegExp("^[a-zA-Z0-9._-]{1,40}$")).describe(
    "A referenceId of the source item.",
  ).optional(),
});

const EvaluationFormItemEnablementSourceValueSchema = z.object({
  Type: z.enum(["OPTION_REF_ID"]).describe("A type of source item value.")
    .optional(),
  RefId: z.string().regex(new RegExp("^[a-zA-Z0-9._-]{1,40}$")).describe(
    "A referenceId of the source value.",
  ).optional(),
});

const EvaluationFormItemEnablementExpressionSchema = z.object({
  Source: EvaluationFormItemEnablementSourceSchema.describe(
    "A source item of enablement expression.",
  ),
  Values: z.array(EvaluationFormItemEnablementSourceValueSchema).describe(
    "A list of values from source item.",
  ),
  Comparator: z.enum(["IN", "NOT_IN", "ALL_IN", "EXACT"]).describe(
    "A comparator to be used against list of values.",
  ),
});

const EvaluationFormItemEnablementConditionOperandSchema = z.object({
  Expression: EvaluationFormItemEnablementExpressionSchema.describe(
    "An expression of the enablement condition.",
  ).optional(),
});

const EvaluationFormItemEnablementConditionSchema = z.object({
  Operands: z.array(EvaluationFormItemEnablementConditionOperandSchema)
    .describe("Operands of the enablement condition."),
  Operator: z.enum(["OR", "AND"]).describe(
    "The operator to be used to be applied to operands if more than one provided.",
  ).optional(),
});

const EvaluationFormItemEnablementConfigurationSchema = z.object({
  Condition: EvaluationFormItemEnablementConditionSchema.describe(
    "A condition for item enablement configuration.",
  ),
  Action: z.enum(["DISABLE", "ENABLE"]).describe(
    "An enablement action that if condition is satisfied.",
  ),
  DefaultAction: z.enum(["DISABLE", "ENABLE"]).describe(
    "An enablement action that if condition is not satisfied.",
  ).optional(),
});

const EvaluationFormQuestionSchema = z.object({
  Title: z.string().min(1).max(350).describe(
    "The title of the question. *Length Constraints*: Minimum length of 1. Maximum length of 350.",
  ),
  Instructions: z.string().max(1024).describe(
    "The instructions of the section. *Length Constraints*: Minimum length of 0. Maximum length of 1024.",
  ).optional(),
  RefId: z.string().regex(new RegExp("^[a-zA-Z0-9._-]{1,40}$")).describe(
    "The identifier of the question. An identifier must be unique within the evaluation form. *Length Constraints*: Minimum length of 1. Maximum length of 40.",
  ),
  NotApplicableEnabled: z.boolean().describe(
    "The flag to enable not applicable answers to the question.",
  ).optional(),
  QuestionType: z.enum([
    "NUMERIC",
    "SINGLESELECT",
    "TEXT",
    "MULTISELECT",
    "DATETIME",
  ]).describe(
    "The type of the question. *Allowed values*: NUMERIC | SINGLESELECT | TEXT",
  ),
  QuestionTypeProperties: EvaluationFormQuestionTypePropertiesSchema.describe(
    "The properties of the type of question. Text questions do not have to define question type properties.",
  ).optional(),
  Weight: z.number().min(0).max(100).describe(
    "The scoring weight of the section. *Minimum*: 0 *Maximum*: 100",
  ).optional(),
  ScoringConfiguration: EvaluationFormQuestionScoringConfigurationSchema
    .describe("The scoring configuration of the question.").optional(),
  MetricConfiguration: EvaluationFormMetricConfigurationSchema.describe(
    "The metric configuration for the question. Use this to associate a business outcome metric with the question.",
  ).optional(),
  Enablement: EvaluationFormItemEnablementConfigurationSchema.describe(
    "A question conditional enablement.",
  ).optional(),
});

const EvaluationFormItemSchema = z.object({
  Section: z.record(z.string(), z.unknown()).describe(
    "The information of the section.",
  ).optional(),
  Question: EvaluationFormQuestionSchema.describe(
    "The information of the question.",
  ).optional(),
});

const EvaluationFormSectionSchema = z.object({
  Title: z.string().min(1).max(128).describe(
    "The title of the section. *Length Constraints*: Minimum length of 1. Maximum length of 128.",
  ),
  Instructions: z.string().max(1024).describe(
    "The instructions of the section.",
  ).optional(),
  RefId: z.string().regex(new RegExp("^[a-zA-Z0-9._-]{1,40}$")).describe(
    "The identifier of the section. An identifier must be unique within the evaluation form. *Length Constraints*: Minimum length of 1. Maximum length of 40.",
  ),
  Items: z.array(EvaluationFormItemSchema).describe(
    "The items of the section. *Minimum*: 1",
  ).optional(),
  Weight: z.number().min(0).max(100).describe(
    "The scoring weight of the section. *Minimum*: 0 *Maximum*: 100",
  ).optional(),
  IsExcludedFromScoring: z.boolean().describe(
    "The flag to exclude the section from scoring.",
  ).optional(),
  ScoreThresholds: z.array(EvaluationFormScoreThresholdSchema).describe(
    "The score thresholds for performance categories.",
  ).optional(),
});

const EvaluationFormBaseItemSchema = z.object({
  Section: EvaluationFormSectionSchema.describe(
    "A subsection or inner section of an item.",
  ),
});

const EvaluationReviewNotificationRecipientValueSchema = z.object({
  UserId: z.string().describe(
    "The user identifier for the notification recipient.",
  ).optional(),
});

const EvaluationReviewNotificationRecipientSchema = z.object({
  Type: z.enum(["USER_ID"]).describe("The type of notification recipient."),
  Value: EvaluationReviewNotificationRecipientValueSchema.describe(
    "The value associated with the notification recipient type.",
  ),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^(?!aws:)[a-zA-Z+-=._:/]+$"),
  ).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -",
  ),
  Value: z.string().max(256).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -",
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
  Title: z.string().min(1).max(128).describe("A title of the evaluation form."),
  Description: z.string().max(1024).describe(
    "The description of the evaluation form. *Length Constraints*: Minimum length of 0. Maximum length of 1024.",
  ).optional(),
  InstanceArn: z.string().regex(
    new RegExp(
      "^arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*$",
    ),
  ).describe("The identifier of the Amazon Connect instance."),
  Items: z.array(EvaluationFormBaseItemSchema).describe(
    "Items that are part of the evaluation form. The total number of sections and questions must not exceed 100 each. Questions must be contained in a section. *Minimum size*: 1 *Maximum size*: 100",
  ),
  ScoringStrategy: z.object({
    Mode: z.enum(["QUESTION_ONLY", "SECTION_ONLY", "POINTS_BASED"]).describe(
      "The scoring mode of the evaluation form. *Allowed values*: QUESTION_ONLY | SECTION_ONLY",
    ),
    Status: z.enum(["ENABLED", "DISABLED"]).describe(
      "The scoring status of the evaluation form. *Allowed values*: ENABLED | DISABLED",
    ),
    ScoreThresholds: z.array(EvaluationFormScoreThresholdSchema).optional(),
  }).describe("A scoring strategy of the evaluation form.").optional(),
  AutoEvaluationConfiguration: z.object({
    Enabled: z.boolean().optional(),
  }).describe("The automatic evaluation configuration of an evaluation form.")
    .optional(),
  Status: z.enum(["DRAFT", "ACTIVE"]).describe(
    "The status of the evaluation form. *Allowed values*: DRAFT | ACTIVE",
  ),
  TargetConfiguration: z.object({
    ContactInteractionType: z.enum(["AGENT", "AUTOMATED", "CUSTOMER"]).describe(
      "The contact interaction type for this evaluation form.",
    ),
  }).describe(
    "Configuration that specifies the target for this evaluation form.",
  ).optional(),
  LanguageConfiguration: z.object({
    FormLanguage: z.enum([
      "de-DE",
      "en-US",
      "es-ES",
      "fr-FR",
      "it-IT",
      "pt-BR",
      "ja-JP",
      "ko-KR",
      "zh-CN",
      "ms-MY",
    ]).describe("The language for the evaluation form.").optional(),
  }).describe("Configuration for language settings of this evaluation form.")
    .optional(),
  ReviewConfiguration: z.object({
    ReviewNotificationRecipients: z.array(
      EvaluationReviewNotificationRecipientSchema,
    ).describe(
      "List of recipients who should be notified when a review is requested.",
    ),
    EligibilityDays: z.number().int().min(1).max(90).describe(
      "Number of days during which a request for review can be submitted for evaluations created from this form.",
    ).optional(),
  }).describe(
    "Configuration for evaluation review settings of this evaluation form.",
  ).optional(),
  AIVersion: z.string().min(1).max(256).describe(
    "The AI version to use for the evaluation form. This specifies which AI model version is used for automated evaluations.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    'The tags used to organize, track, or control access for this resource. For example, { "tags": {"key1":"value1", "key2":"value2"} }.',
  ).optional(),
});

const StateSchema = z.object({
  Title: z.string().optional(),
  Description: z.string().optional(),
  EvaluationFormArn: z.string(),
  InstanceArn: z.string().optional(),
  Items: z.array(EvaluationFormBaseItemSchema).optional(),
  ScoringStrategy: z.object({
    Mode: z.string(),
    Status: z.string(),
    ScoreThresholds: z.array(EvaluationFormScoreThresholdSchema),
  }).optional(),
  AutoEvaluationConfiguration: z.object({
    Enabled: z.boolean(),
  }).optional(),
  Status: z.string().optional(),
  TargetConfiguration: z.object({
    ContactInteractionType: z.string(),
  }).optional(),
  LanguageConfiguration: z.object({
    FormLanguage: z.string(),
  }).optional(),
  ReviewConfiguration: z.object({
    ReviewNotificationRecipients: z.array(
      EvaluationReviewNotificationRecipientSchema,
    ),
    EligibilityDays: z.number(),
  }).optional(),
  AIVersion: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Title: z.string().min(1).max(128).describe("A title of the evaluation form.")
    .optional(),
  Description: z.string().max(1024).describe(
    "The description of the evaluation form. *Length Constraints*: Minimum length of 0. Maximum length of 1024.",
  ).optional(),
  InstanceArn: z.string().regex(
    new RegExp(
      "^arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*$",
    ),
  ).describe("The identifier of the Amazon Connect instance.").optional(),
  Items: z.array(EvaluationFormBaseItemSchema).describe(
    "Items that are part of the evaluation form. The total number of sections and questions must not exceed 100 each. Questions must be contained in a section. *Minimum size*: 1 *Maximum size*: 100",
  ).optional(),
  ScoringStrategy: z.object({
    Mode: z.enum(["QUESTION_ONLY", "SECTION_ONLY", "POINTS_BASED"]).describe(
      "The scoring mode of the evaluation form. *Allowed values*: QUESTION_ONLY | SECTION_ONLY",
    ).optional(),
    Status: z.enum(["ENABLED", "DISABLED"]).describe(
      "The scoring status of the evaluation form. *Allowed values*: ENABLED | DISABLED",
    ).optional(),
    ScoreThresholds: z.array(EvaluationFormScoreThresholdSchema).optional(),
  }).describe("A scoring strategy of the evaluation form.").optional(),
  AutoEvaluationConfiguration: z.object({
    Enabled: z.boolean().optional(),
  }).describe("The automatic evaluation configuration of an evaluation form.")
    .optional(),
  Status: z.enum(["DRAFT", "ACTIVE"]).describe(
    "The status of the evaluation form. *Allowed values*: DRAFT | ACTIVE",
  ).optional(),
  TargetConfiguration: z.object({
    ContactInteractionType: z.enum(["AGENT", "AUTOMATED", "CUSTOMER"]).describe(
      "The contact interaction type for this evaluation form.",
    ).optional(),
  }).describe(
    "Configuration that specifies the target for this evaluation form.",
  ).optional(),
  LanguageConfiguration: z.object({
    FormLanguage: z.enum([
      "de-DE",
      "en-US",
      "es-ES",
      "fr-FR",
      "it-IT",
      "pt-BR",
      "ja-JP",
      "ko-KR",
      "zh-CN",
      "ms-MY",
    ]).describe("The language for the evaluation form.").optional(),
  }).describe("Configuration for language settings of this evaluation form.")
    .optional(),
  ReviewConfiguration: z.object({
    ReviewNotificationRecipients: z.array(
      EvaluationReviewNotificationRecipientSchema,
    ).describe(
      "List of recipients who should be notified when a review is requested.",
    ).optional(),
    EligibilityDays: z.number().int().min(1).max(90).describe(
      "Number of days during which a request for review can be submitted for evaluations created from this form.",
    ).optional(),
  }).describe(
    "Configuration for evaluation review settings of this evaluation form.",
  ).optional(),
  AIVersion: z.string().min(1).max(256).describe(
    "The AI version to use for the evaluation form. This specifies which AI model version is used for automated evaluations.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    'The tags used to organize, track, or control access for this resource. For example, { "tags": {"key1":"value1", "key2":"value2"} }.',
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

/** Swamp extension model for Connect EvaluationForm. Registered at `@swamp/aws/connect/evaluation-form`. */
export const model = {
  type: "@swamp/aws/connect/evaluation-form",
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
      toVersion: "2026.04.21.1",
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
      toVersion: "2026.06.30.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.11.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.13.1",
      description: "No schema changes",
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
      toVersion: "2026.09.24.1",
      description: "Added: AIVersion",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.30.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Connect EvaluationForm resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Connect EvaluationForm",
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
          "AWS::Connect::EvaluationForm",
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
      description: "Get a Connect EvaluationForm",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Connect EvaluationForm",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Connect::EvaluationForm",
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
      description: "Update a Connect EvaluationForm",
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
        const identifier = existing.EvaluationFormArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Connect::EvaluationForm",
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
          "AWS::Connect::EvaluationForm",
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
      description: "Delete a Connect EvaluationForm",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Connect EvaluationForm",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Connect::EvaluationForm",
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
      description: "Sync Connect EvaluationForm state from AWS",
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
        const identifier = existing.EvaluationFormArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Connect::EvaluationForm",
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
      description: "List Connect EvaluationForm resources",
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
          "AWS::Connect::EvaluationForm",
          {
            resourceModel: args.resourceModel,
            maxPages: args.maxPages,
            credentials,
          },
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const instanceName =
            (item.properties?.EvaluationFormArn?.toString() ?? item.identifier)
              .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
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
