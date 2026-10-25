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

// Auto-generated extension model for @swamp/aws/lex/bot
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Lex Bot (AWS::Lex::Bot).
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

const TagSchema = z.object({
  Value: z.string().min(0).max(256),
  Key: z.string().min(1).max(128),
});

const BedrockModelSpecificationSchema = z.object({
  ModelArn: z.string().min(1).max(5000),
  BedrockTraceStatus: z.enum(["ENABLED", "DISABLED"]).optional(),
  BedrockModelCustomPrompt: z.string().min(1).max(5000).optional(),
  BedrockGuardrailConfiguration: z.object({
    BedrockGuardrailVersion: z.string().min(1).max(5000).optional(),
    BedrockGuardrailIdentifier: z.string().min(1).max(5000).optional(),
  }).optional(),
});

const IntentDisambiguationSettingsSchema = z.object({
  MaxDisambiguationIntents: z.number().int().min(2).max(5).optional(),
  Enabled: z.boolean(),
  CustomDisambiguationMessage: z.string().min(1).max(1000).optional(),
});

const GenerativeAISettingsSchema = z.object({
  RuntimeSettings: z.object({
    SlotResolutionImprovementSpecification: z.object({
      Enabled: z.boolean(),
      BedrockModelSpecification: BedrockModelSpecificationSchema.optional(),
    }).optional(),
    NluImprovementSpecification: z.object({
      AssistedNluMode: z.enum(["Primary", "Fallback"]).optional(),
      IntentDisambiguationSettings: IntentDisambiguationSettingsSchema
        .optional(),
      Enabled: z.boolean(),
    }).optional(),
  }).optional(),
  BuildtimeSettings: z.object({
    DescriptiveBotBuilderSpecification: z.object({
      Enabled: z.boolean(),
      BedrockModelSpecification: BedrockModelSpecificationSchema.optional(),
    }).optional(),
    SampleUtteranceGenerationSpecification: z.object({
      Enabled: z.boolean(),
      BedrockModelSpecification: BedrockModelSpecificationSchema.optional(),
    }).optional(),
  }).optional(),
});

const CustomVocabularyItemSchema = z.object({
  DisplayAs: z.string().min(1).max(100).optional(),
  Phrase: z.string().min(1).max(100),
  Weight: z.number().int().min(0).max(3).optional(),
});

const CustomVocabularySchema = z.object({
  CustomVocabularyItems: z.array(CustomVocabularyItemSchema),
});

const DeepgramSpeechModelConfigSchema = z.object({
  ApiTokenSecretArn: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:aws[A-Za-z-]*:secretsmanager:[a-z0-9-]{1,20}:[0-9]{12}:secret:[A-Za-z0-9/_+=.@-]{1,512}-[A-Za-z0-9]{6}$",
    ),
  ),
  ModelId: z.string().min(4).max(32).regex(new RegExp("[A-Za-z0-9-_]+"))
    .optional(),
});

const SpeechModelConfigSchema = z.object({
  DeepgramConfig: DeepgramSpeechModelConfigSchema.optional(),
});

const SpeechRecognitionSettingsSchema = z.object({
  SpeechModelPreference: z.enum(["Standard", "Neural", "Deepgram", "Advanced"])
    .optional(),
  SpeechModelConfig: SpeechModelConfigSchema.optional(),
});

const SampleValueSchema = z.object({
  Value: z.string().min(1).max(140),
});

const SlotTypeValueSchema = z.object({
  Synonyms: z.array(SampleValueSchema).optional(),
  SampleValue: SampleValueSchema,
});

const AdvancedRecognitionSettingSchema = z.object({
  AudioRecognitionStrategy: z.enum(["UseSlotValuesAsCustomVocabulary"])
    .optional(),
});

const SlotValueRegexFilterSchema = z.object({
  Pattern: z.string().min(1).max(300),
});

const SlotValueSelectionSettingSchema = z.object({
  AdvancedRecognitionSetting: AdvancedRecognitionSettingSchema.optional(),
  RegexFilter: SlotValueRegexFilterSchema.optional(),
  ResolutionStrategy: z.enum([
    "ORIGINAL_VALUE",
    "TOP_RESOLUTION",
    "CONCATENATION",
  ]),
});

const SubSlotTypeCompositionSchema = z.object({
  SlotTypeName: z.string().optional(),
  SlotTypeId: z.string().min(1).max(25).regex(
    new RegExp("^((AMAZON\\.)[a-zA-Z_]+?|[0-9a-zA-Z]+)$"),
  ).optional(),
  Name: z.string().min(1).max(100).regex(
    new RegExp("^([0-9a-zA-Z][_-]?){1,100}$"),
  ),
});

const CompositeSlotTypeSettingSchema = z.object({
  SubSlots: z.array(SubSlotTypeCompositionSchema).optional(),
});

const GrammarSlotTypeSourceSchema = z.object({
  KmsKeyArn: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:[\\w\\-]+:kms:[\\w\\-]+:[\\d]{12}:(?:key\\/[\\w\\-]+|alias\\/[a-zA-Z0-9:\\/_\\-]{1,256})$",
    ),
  ).optional(),
  S3BucketName: z.string().min(3).max(63).regex(
    new RegExp("^[a-z0-9][\\.\\-a-z0-9]{1,61}[a-z0-9]$"),
  ),
  S3ObjectKey: z.string().min(1).max(1024).regex(
    new RegExp(
      "[\\.\\-\\!\\*\\_\\'\\(\\)a-zA-Z0-9][\\.\\-\\!\\*\\_\\'\\(\\)\\/a-zA-Z0-9]*$",
    ),
  ),
});

const GrammarSlotTypeSettingSchema = z.object({
  Source: GrammarSlotTypeSourceSchema.optional(),
});

const ExternalSourceSettingSchema = z.object({
  GrammarSlotTypeSetting: GrammarSlotTypeSettingSchema.optional(),
});

const SlotTypeSchema = z.object({
  SlotTypeValues: z.array(SlotTypeValueSchema).optional(),
  Description: z.string().max(2000).describe("A description of the resource")
    .optional(),
  ParentSlotTypeSignature: z.string().optional(),
  ValueSelectionSetting: SlotValueSelectionSettingSchema.optional(),
  CompositeSlotTypeSetting: CompositeSlotTypeSettingSchema.optional(),
  ExternalSourceSetting: ExternalSourceSettingSchema.optional(),
  Name: z.string().min(1).max(100).regex(new RegExp("^([0-9a-zA-Z][_-]?)+$")),
});

const UnifiedSpeechSettingsSchema = z.object({
  SpeechFoundationModel: z.object({
    ModelArn: z.string(),
    VoiceId: z.string().optional(),
  }),
});

const AudioFillerSettingsSchema = z.object({
  Enabled: z.boolean(),
  AudioType: z.enum([
    "MELODY_CHIPPER_CHIME",
    "MELODY_CURIOUS_CRAWL",
    "MELODY_RISING_RIPPLE",
    "MELODY_PATIENT_PING",
    "MELODY_PONDERING_PONG",
    "TYPING_KINETIC_KEYS",
    "TYPING_QUIET_QWERTY",
  ]).optional(),
  MinimumPlayDurationInMilliseconds: z.number().int().min(1000).max(5000)
    .optional(),
  ResponseDeliveryDelayInMilliseconds: z.number().int().min(200).max(1000)
    .optional(),
  StartDelayInMilliseconds: z.number().int().min(500).max(5000).optional(),
});

const QInConnectIntentConfigurationSchema = z.object({
  QInConnectAssistantConfiguration: z.object({
    AssistantArn: z.string().min(1).max(200).regex(
      new RegExp(
        "^arn:[a-z-]*?:wisdom:[a-z0-9-]*?:[0-9]{12}:[a-z-]*?/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(?:/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}){0,2}$",
      ),
    ),
  }).optional(),
});

const CustomPayloadSchema = z.object({
  Value: z.string().min(1).max(1000),
});

const ButtonSchema = z.object({
  Value: z.string().min(1).max(50),
  Text: z.string().min(1).max(50),
});

const ImageResponseCardSchema = z.object({
  Subtitle: z.string().min(1).max(250).optional(),
  Title: z.string().min(1).max(250),
  ImageUrl: z.string().min(1).max(250).optional(),
  Buttons: z.array(ButtonSchema).optional(),
});

const PlainTextMessageSchema = z.object({
  Value: z.string().min(1).max(1000),
});

const SSMLMessageSchema = z.object({
  Value: z.string().min(1).max(1000),
});

const MessageSchema = z.object({
  CustomPayload: CustomPayloadSchema.optional(),
  ImageResponseCard: ImageResponseCardSchema.optional(),
  PlainTextMessage: PlainTextMessageSchema.optional(),
  SSMLMessage: SSMLMessageSchema.optional(),
});

const MessageGroupSchema = z.object({
  Message: MessageSchema,
  Variations: z.array(MessageSchema).optional(),
});

const ResponseSpecificationSchema = z.object({
  MessageGroupsList: z.array(MessageGroupSchema),
  AllowInterrupt: z.boolean().optional(),
});

const DialogActionSchema = z.object({
  Type: z.enum([
    "CloseIntent",
    "ConfirmIntent",
    "ElicitIntent",
    "ElicitSlot",
    "StartIntent",
    "FulfillIntent",
    "EndConversation",
    "EvaluateConditional",
    "InvokeDialogCodeHook",
  ]),
  SlotToElicit: z.string().min(1).max(100).regex(
    new RegExp("^([0-9a-zA-Z][_-]?)+$"),
  ).optional(),
  SuppressNextMessage: z.boolean().optional(),
});

const SessionAttributeSchema = z.object({
  Value: z.string().min(0).max(1024).optional(),
  Key: z.string().min(1).max(1024),
});

const SlotValueSchema = z.object({
  InterpretedValue: z.string().min(1).max(202).optional(),
});

const SlotValueOverrideSchema = z.object({
  Shape: z.enum(["Scalar", "List"]).optional(),
  Value: SlotValueSchema.optional(),
  Values: z.array(z.record(z.string(), z.unknown())).optional(),
});

const SlotValueOverrideMapSchema = z.object({
  SlotName: z.string().min(1).max(100).regex(
    new RegExp("^([0-9a-zA-Z][_-]?)+$"),
  ).optional(),
  SlotValueOverride: SlotValueOverrideSchema.optional(),
});

const IntentOverrideSchema = z.object({
  Slots: z.array(SlotValueOverrideMapSchema).optional(),
  Name: z.string().min(1).max(100).regex(new RegExp("^([0-9a-zA-Z][_-]?)+$"))
    .optional(),
});

const DialogStateSchema = z.object({
  DialogAction: DialogActionSchema.optional(),
  SessionAttributes: z.array(SessionAttributeSchema).optional(),
  Intent: IntentOverrideSchema.optional(),
});

const DefaultConditionalBranchSchema = z.object({
  Response: ResponseSpecificationSchema.optional(),
  NextStep: DialogStateSchema.optional(),
});

const ConditionSchema = z.object({
  ExpressionString: z.string().min(1).max(1024),
});

const ConditionalBranchSchema = z.object({
  Condition: ConditionSchema,
  Response: ResponseSpecificationSchema.optional(),
  Name: z.string().min(1).max(100).regex(new RegExp("^([0-9a-zA-Z][_-]?)+$")),
  NextStep: DialogStateSchema,
});

const ConditionalSpecificationSchema = z.object({
  DefaultBranch: DefaultConditionalBranchSchema,
  IsActive: z.boolean(),
  ConditionalBranches: z.array(ConditionalBranchSchema),
});

const PostDialogCodeHookInvocationSpecificationSchema = z.object({
  SuccessResponse: ResponseSpecificationSchema.optional(),
  FailureConditional: ConditionalSpecificationSchema.optional(),
  TimeoutNextStep: DialogStateSchema.optional(),
  SuccessConditional: ConditionalSpecificationSchema.optional(),
  TimeoutResponse: ResponseSpecificationSchema.optional(),
  SuccessNextStep: DialogStateSchema.optional(),
  FailureResponse: ResponseSpecificationSchema.optional(),
  FailureNextStep: DialogStateSchema.optional(),
  TimeoutConditional: ConditionalSpecificationSchema.optional(),
});

const DialogCodeHookInvocationSettingSchema = z.object({
  EnableCodeHookInvocation: z.boolean(),
  InvocationLabel: z.string().min(1).max(100).regex(
    new RegExp("^([0-9a-zA-Z][_-]?)+$"),
  ).optional(),
  IsActive: z.boolean(),
  PostCodeHookSpecification: PostDialogCodeHookInvocationSpecificationSchema,
});

const InitialResponseSettingSchema = z.object({
  CodeHook: DialogCodeHookInvocationSettingSchema.optional(),
  InitialResponse: ResponseSpecificationSchema.optional(),
  Conditional: ConditionalSpecificationSchema.optional(),
  NextStep: DialogStateSchema.optional(),
});

const BedrockAgentIntentConfigurationSchema = z.object({
  BedrockAgentConfiguration: z.object({
    BedrockAgentId: z.string().min(1).max(5000).optional(),
    BedrockAgentAliasId: z.string().min(1).max(5000).optional(),
  }).optional(),
  BedrockAgentIntentKnowledgeBaseConfiguration: z.object({
    BedrockModelConfiguration: BedrockModelSpecificationSchema,
    BedrockKnowledgeBaseArn: z.string().min(1).max(5000),
  }).optional(),
});

const PostFulfillmentStatusSpecificationSchema = z.object({
  SuccessResponse: ResponseSpecificationSchema.optional(),
  FailureConditional: ConditionalSpecificationSchema.optional(),
  TimeoutNextStep: DialogStateSchema.optional(),
  SuccessConditional: ConditionalSpecificationSchema.optional(),
  TimeoutResponse: ResponseSpecificationSchema.optional(),
  SuccessNextStep: DialogStateSchema.optional(),
  FailureResponse: ResponseSpecificationSchema.optional(),
  FailureNextStep: DialogStateSchema.optional(),
  TimeoutConditional: ConditionalSpecificationSchema.optional(),
});

const FulfillmentUpdateResponseSpecificationSchema = z.object({
  MessageGroups: z.array(MessageGroupSchema),
  AllowInterrupt: z.boolean().optional(),
  FrequencyInSeconds: z.number().int().min(1).max(900),
});

const FulfillmentStartResponseSpecificationSchema = z.object({
  DelayInSeconds: z.number().int().min(1).max(900),
  MessageGroups: z.array(MessageGroupSchema),
  AllowInterrupt: z.boolean().optional(),
});

const FulfillmentUpdatesSpecificationSchema = z.object({
  UpdateResponse: FulfillmentUpdateResponseSpecificationSchema.optional(),
  Active: z.boolean(),
  TimeoutInSeconds: z.number().int().min(1).max(900).optional(),
  StartResponse: FulfillmentStartResponseSpecificationSchema.optional(),
});

const FulfillmentCodeHookSettingSchema = z.object({
  PostFulfillmentStatusSpecification: PostFulfillmentStatusSpecificationSchema
    .optional(),
  FulfillmentUpdatesSpecification: FulfillmentUpdatesSpecificationSchema
    .optional(),
  IsActive: z.boolean().optional(),
  Enabled: z.boolean(),
});

const TextInputSpecificationSchema = z.object({
  StartTimeoutMs: z.number().int().min(1),
});

const AllowedInputTypesSchema = z.object({
  AllowDTMFInput: z.boolean(),
  AllowAudioInput: z.boolean(),
});

const DTMFSpecificationSchema = z.object({
  DeletionCharacter: z.string().regex(new RegExp("^[A-D0-9#*]{1}$")),
  EndTimeoutMs: z.number().int().min(1),
  EndCharacter: z.string().regex(new RegExp("^[A-D0-9#*]{1}$")),
  MaxLength: z.number().int().min(1).max(1024),
});

const AudioSpecificationSchema = z.object({
  EndTimeoutMs: z.number().int().min(1),
  MaxLengthMs: z.number().int().min(1),
});

const AudioAndDTMFInputSpecificationSchema = z.object({
  DTMFSpecification: DTMFSpecificationSchema.optional(),
  AudioSpecification: AudioSpecificationSchema.optional(),
  StartTimeoutMs: z.number().int().min(1),
});

const PromptAttemptSpecificationSchema = z.object({
  TextInputSpecification: TextInputSpecificationSchema.optional(),
  AllowInterrupt: z.boolean().optional(),
  AllowedInputTypes: AllowedInputTypesSchema,
  AudioAndDTMFInputSpecification: AudioAndDTMFInputSpecificationSchema
    .optional(),
});

const PromptSpecificationSchema = z.object({
  MaxRetries: z.number().int().min(0).max(5),
  MessageGroupsList: z.array(MessageGroupSchema),
  PromptAttemptsSpecification: z.record(
    z.string(),
    PromptAttemptSpecificationSchema,
  ).optional(),
  AllowInterrupt: z.boolean().optional(),
  MessageSelectionStrategy: z.enum(["Random", "Ordered"]).optional(),
});

const ElicitationCodeHookInvocationSettingSchema = z.object({
  EnableCodeHookInvocation: z.boolean(),
  InvocationLabel: z.string().min(1).max(100).regex(
    new RegExp("^([0-9a-zA-Z][_-]?)+$"),
  ).optional(),
});

const IntentConfirmationSettingSchema = z.object({
  PromptSpecification: PromptSpecificationSchema,
  ConfirmationResponse: ResponseSpecificationSchema.optional(),
  DeclinationConditional: ConditionalSpecificationSchema.optional(),
  FailureConditional: ConditionalSpecificationSchema.optional(),
  ConfirmationConditional: ConditionalSpecificationSchema.optional(),
  IsActive: z.boolean().optional(),
  FailureResponse: ResponseSpecificationSchema.optional(),
  CodeHook: DialogCodeHookInvocationSettingSchema.optional(),
  DeclinationNextStep: DialogStateSchema.optional(),
  ElicitationCodeHook: ElicitationCodeHookInvocationSettingSchema.optional(),
  ConfirmationNextStep: DialogStateSchema.optional(),
  FailureNextStep: DialogStateSchema.optional(),
  DeclinationResponse: ResponseSpecificationSchema.optional(),
});

const StillWaitingResponseSpecificationSchema = z.object({
  MessageGroupsList: z.array(MessageGroupSchema),
  TimeoutInSeconds: z.number().int().min(1).max(900),
  AllowInterrupt: z.boolean().optional(),
  FrequencyInSeconds: z.number().int().min(1).max(300),
});

const WaitAndContinueSpecificationSchema = z.object({
  WaitingResponse: ResponseSpecificationSchema,
  StillWaitingResponse: StillWaitingResponseSpecificationSchema.optional(),
  IsActive: z.boolean().optional(),
  ContinueResponse: ResponseSpecificationSchema,
});

const SlotCaptureSettingSchema = z.object({
  CaptureConditional: ConditionalSpecificationSchema.optional(),
  FailureConditional: ConditionalSpecificationSchema.optional(),
  CaptureResponse: ResponseSpecificationSchema.optional(),
  CaptureNextStep: DialogStateSchema.optional(),
  FailureResponse: ResponseSpecificationSchema.optional(),
  CodeHook: DialogCodeHookInvocationSettingSchema.optional(),
  FailureNextStep: DialogStateSchema.optional(),
  ElicitationCodeHook: ElicitationCodeHookInvocationSettingSchema.optional(),
});

const SampleUtteranceSchema = z.object({
  Utterance: z.string(),
});

const SlotDefaultValueSchema = z.object({
  DefaultValue: z.string().min(1).max(202),
});

const SlotDefaultValueSpecificationSchema = z.object({
  DefaultValueList: z.array(SlotDefaultValueSchema),
});

const SlotValueElicitationSettingSchema = z.object({
  PromptSpecification: PromptSpecificationSchema.optional(),
  WaitAndContinueSpecification: WaitAndContinueSpecificationSchema.optional(),
  SlotConstraint: z.enum(["Required", "Optional"]),
  SlotCaptureSetting: SlotCaptureSettingSchema.optional(),
  SampleUtterances: z.array(SampleUtteranceSchema).optional(),
  DefaultValueSpecification: SlotDefaultValueSpecificationSchema.optional(),
});

const SubSlotValueElicitationSettingSchema = z.object({
  PromptSpecification: PromptSpecificationSchema.optional(),
  WaitAndContinueSpecification: WaitAndContinueSpecificationSchema.optional(),
  SampleUtterances: z.array(SampleUtteranceSchema).optional(),
  DefaultValueSpecification: SlotDefaultValueSpecificationSchema.optional(),
});

const SpecificationsSchema = z.object({
  SlotTypeName: z.string().optional(),
  ValueElicitationSetting: SubSlotValueElicitationSettingSchema,
  SlotTypeId: z.string().min(1).max(25).regex(
    new RegExp("^((AMAZON\\.)[a-zA-Z_]+?|[0-9a-zA-Z]+)$"),
  ).optional(),
});

const SubSlotSettingSchema = z.object({
  Expression: z.string().min(1).max(1000).regex(
    new RegExp("[0-9A-Za-z_\\-\\s\\(\\)]+"),
  ).optional(),
  SlotSpecifications: z.record(z.string(), SpecificationsSchema).optional(),
});

const ObfuscationSettingSchema = z.object({
  ObfuscationSettingType: z.enum(["None", "DefaultObfuscation"]),
});

const MultipleValuesSettingSchema = z.object({
  AllowMultipleValues: z.boolean().optional(),
});

const SlotSchema = z.object({
  Description: z.string().max(2000).describe("A description of the resource")
    .optional(),
  SlotTypeName: z.string(),
  ValueElicitationSetting: SlotValueElicitationSettingSchema,
  SubSlotSetting: SubSlotSettingSchema.optional(),
  ObfuscationSetting: ObfuscationSettingSchema.optional(),
  Name: z.string().min(1).max(100).regex(new RegExp("^([0-9a-zA-Z][_-]?)+$")),
  MultipleValuesSetting: MultipleValuesSettingSchema.optional(),
});

const QnAKendraConfigurationSchema = z.object({
  QueryFilterString: z.string().min(1).max(5000).optional(),
  QueryFilterStringEnabled: z.boolean(),
  KendraIndex: z.string().min(1).max(5000),
  ExactResponse: z.boolean(),
});

const QnAIntentConfigurationSchema = z.object({
  BedrockModelConfiguration: BedrockModelSpecificationSchema,
  DataSourceConfiguration: z.object({
    BedrockKnowledgeStoreConfiguration: z.object({
      BKBExactResponseFields: z.object({
        AnswerField: z.string().min(1).max(5000).optional(),
      }).optional(),
      ExactResponse: z.boolean().optional(),
      BedrockKnowledgeBaseArn: z.string().min(1).max(5000).optional(),
    }).optional(),
    KendraConfiguration: QnAKendraConfigurationSchema.optional(),
    OpensearchConfiguration: z.object({
      IndexName: z.string().min(1).max(5000).optional(),
      DomainEndpoint: z.string().min(1).max(5000).optional(),
      ExactResponseFields: z.object({
        QuestionField: z.string().min(1).max(5000).optional(),
        AnswerField: z.string().min(1).max(5000).optional(),
      }).optional(),
      ExactResponse: z.boolean().optional(),
      IncludeFields: z.array(z.string().min(1).max(5000)).optional(),
    }).optional(),
  }),
});

const DialogCodeHookSettingSchema = z.object({
  Enabled: z.boolean(),
});

const InputContextSchema = z.object({
  Name: z.string().min(1).max(100).regex(new RegExp("^([0-9a-zA-Z][_-]?)+$")),
});

const KendraConfigurationSchema = z.object({
  QueryFilterString: z.string().min(1).max(5000).optional(),
  QueryFilterStringEnabled: z.boolean().optional(),
  KendraIndex: z.string().min(32).max(2048).regex(
    new RegExp(
      "^arn:aws[a-zA-Z-]*:kendra:[a-z]+-(?:[a-z]+-)*[0-9]:[0-9]{12}:index/[a-zA-Z0-9][a-zA-Z0-9_-]*$",
    ),
  ),
});

const IntentClosingSettingSchema = z.object({
  IsActive: z.boolean().optional(),
  ClosingResponse: ResponseSpecificationSchema.optional(),
  Conditional: ConditionalSpecificationSchema.optional(),
  NextStep: DialogStateSchema.optional(),
});

const OutputContextSchema = z.object({
  TurnsToLive: z.number().int().min(1).max(20),
  TimeToLiveInSeconds: z.number().int().min(5).max(86400),
  Name: z.string().min(1).max(100).regex(new RegExp("^([0-9a-zA-Z][_-]?)+$")),
});

const SlotPrioritySchema = z.object({
  Priority: z.number().int().min(0).max(100),
  SlotName: z.string().min(1).max(100).regex(
    new RegExp("^([0-9a-zA-Z][_-]?)+$"),
  ),
});

const IntentSchema = z.object({
  QInConnectIntentConfiguration: QInConnectIntentConfigurationSchema.optional(),
  Description: z.string().max(2000).describe(
    "Resource Type definition for the intent.",
  ).optional(),
  ParentIntentSignature: z.string().optional(),
  InitialResponseSetting: InitialResponseSettingSchema.optional(),
  BedrockAgentIntentConfiguration: BedrockAgentIntentConfigurationSchema
    .optional(),
  FulfillmentCodeHook: FulfillmentCodeHookSettingSchema.optional(),
  IntentConfirmationSetting: IntentConfirmationSettingSchema.optional(),
  Name: z.string().min(1).max(100).regex(new RegExp("^([0-9a-zA-Z][_-]?)+$")),
  Slots: z.array(SlotSchema).optional(),
  QnAIntentConfiguration: QnAIntentConfigurationSchema.optional(),
  DialogCodeHook: DialogCodeHookSettingSchema.optional(),
  InputContexts: z.array(InputContextSchema).optional(),
  KendraConfiguration: KendraConfigurationSchema.optional(),
  IntentClosingSetting: IntentClosingSettingSchema.optional(),
  DisplayName: z.string().min(1).max(100).optional(),
  OutputContexts: z.array(OutputContextSchema).optional(),
  SlotPriorities: z.array(SlotPrioritySchema).optional(),
  SampleUtterances: z.array(SampleUtteranceSchema).optional(),
});

const VoiceSettingsSchema = z.object({
  VoiceId: z.string(),
  Engine: z.enum(["standard", "neural", "long-form", "generative"]).optional(),
});

const BotLocaleSchema = z.object({
  NluConfidenceThreshold: z.number().min(0).max(1),
  LocaleId: z.string(),
  Description: z.string().max(2000).describe("A description of the resource")
    .optional(),
  GenerativeAISettings: GenerativeAISettingsSchema.optional(),
  CustomVocabulary: CustomVocabularySchema.optional(),
  SpeechRecognitionSettings: SpeechRecognitionSettingsSchema.optional(),
  SlotTypes: z.array(SlotTypeSchema).optional(),
  UnifiedSpeechSettings: UnifiedSpeechSettingsSchema.optional(),
  AudioFillerSettings: AudioFillerSettingsSchema.optional(),
  SpeechDetectionSensitivity: z.enum([
    "Default",
    "HighNoiseTolerance",
    "MaximumNoiseTolerance",
  ]).optional(),
  Intents: z.array(IntentSchema).optional(),
  VoiceSettings: VoiceSettingsSchema.optional(),
});

const BotMemberSchema = z.object({
  BotMemberName: z.string().min(1).max(100).describe(
    "The unique name of a bot that is a member of this network of bots.",
  ),
  BotMemberAliasName: z.string().min(1).max(100).describe(
    "The alias name of a bot that is a member of this network of bots.",
  ),
  BotMemberId: z.string().min(10).max(10).describe(
    "The unique ID of a bot that is a member of this network of bots.",
  ),
  BotMemberVersion: z.string().min(1).max(5).describe(
    "The version of a bot that is a member of this network of bots.",
  ),
  BotMemberAliasId: z.string().min(10).max(10).describe(
    "The alias ID of a bot that is a member of this network of bots.",
  ),
});

const LambdaCodeHookSchema = z.object({
  LambdaArn: z.string().min(20).max(2048),
  CodeHookInterfaceVersion: z.string().min(1).max(5),
});

const CodeHookSpecificationSchema = z.object({
  LambdaCodeHook: LambdaCodeHookSchema,
});

const BotAliasLocaleSettingsSchema = z.object({
  CodeHookSpecification: CodeHookSpecificationSchema.optional(),
  Enabled: z.boolean(),
});

const BotAliasLocaleSettingsItemSchema = z.object({
  LocaleId: z.string().min(1).max(128),
  BotAliasLocaleSetting: BotAliasLocaleSettingsSchema,
});

const CloudWatchLogGroupLogDestinationSchema = z.object({
  CloudWatchLogGroupArn: z.string().min(1).max(2048),
  LogPrefix: z.string().min(0).max(1024),
});

const TextLogDestinationSchema = z.object({
  CloudWatch: CloudWatchLogGroupLogDestinationSchema,
});

const TextLogSettingSchema = z.object({
  Destination: TextLogDestinationSchema,
  Enabled: z.boolean(),
});

const S3BucketLogDestinationSchema = z.object({
  KmsKeyArn: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:[\\w\\-]+:kms:[\\w\\-]+:[\\d]{12}:(?:key\\/[\\w\\-]+|alias\\/[a-zA-Z0-9:\\/_\\-]{1,256})$",
    ),
  ).optional(),
  LogPrefix: z.string().min(0).max(1024),
  S3BucketArn: z.string().min(1).max(2048).regex(
    new RegExp("^arn:[\\w\\-]+:s3:::[a-z0-9][\\.\\-a-z0-9]{1,61}[a-z0-9]$"),
  ),
});

const AudioLogDestinationSchema = z.object({
  S3Bucket: S3BucketLogDestinationSchema,
});

const AudioLogSettingSchema = z.object({
  Destination: AudioLogDestinationSchema,
  Enabled: z.boolean(),
});

const ConversationLogSettingsSchema = z.object({
  TextLogSettings: z.array(TextLogSettingSchema).optional(),
  AudioLogSettings: z.array(AudioLogSettingSchema).optional(),
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
  Description: z.string().max(2000).describe("A description of the resource")
    .optional(),
  ErrorLogSettings: z.object({
    Enabled: z.boolean(),
  }).optional(),
  RoleArn: z.string().min(32).max(2048).regex(
    new RegExp("^arn:aws[a-zA-Z-]*:iam::[0-9]{12}:role/.*$"),
  ),
  BotType: z.enum(["Bot", "BotNetwork"]).describe(
    "The type of a bot to create.",
  ).optional(),
  Name: z.string().min(1).max(100).regex(new RegExp("^([0-9a-zA-Z][_-]?)+$")),
  BotTags: z.array(TagSchema).optional(),
  TestBotAliasTags: z.array(TagSchema).optional(),
  AutoBuildBotLocales: z.boolean().optional(),
  BotLocales: z.array(BotLocaleSchema).optional(),
  IdleSessionTTLInSeconds: z.number().int().min(60).max(86400),
  BotFileS3Location: z.object({
    S3ObjectVersion: z.string().min(1).max(1024).optional(),
    S3Bucket: z.string().min(3).max(63).regex(
      new RegExp("^[a-z0-9][\\.\\-a-z0-9]{1,61}[a-z0-9]$"),
    ),
    S3ObjectKey: z.string().min(1).max(1024).regex(
      new RegExp(
        "[\\.\\-\\!\\*\\_\\'\\(\\)a-zA-Z0-9][\\.\\-\\!\\*\\_\\'\\(\\)\\/a-zA-Z0-9]*$",
      ),
    ),
  }).optional(),
  Replication: z.object({
    ReplicaRegions: z.array(z.string().min(2).max(25)),
  }).optional(),
  BotMembers: z.array(BotMemberSchema).describe(
    "The list of bot members in a network to be created.",
  ).optional(),
  TestBotAliasSettings: z.object({
    Description: z.string().max(2000).describe("A description of the resource")
      .optional(),
    BotAliasLocaleSettings: z.array(BotAliasLocaleSettingsItemSchema)
      .optional(),
    ConversationLogSettings: ConversationLogSettingsSchema.optional(),
    SentimentAnalysisSettings: z.object({
      DetectSentiment: z.boolean(),
    }).optional(),
  }).optional(),
  DataPrivacy: z.object({
    ChildDirected: z.boolean(),
  }),
});

const StateSchema = z.object({
  Description: z.string().optional(),
  ErrorLogSettings: z.object({
    Enabled: z.boolean(),
  }).optional(),
  RoleArn: z.string().optional(),
  BotType: z.string().optional(),
  Name: z.string().optional(),
  BotTags: z.array(TagSchema).optional(),
  TestBotAliasTags: z.array(TagSchema).optional(),
  AutoBuildBotLocales: z.boolean().optional(),
  BotLocales: z.array(BotLocaleSchema).optional(),
  IdleSessionTTLInSeconds: z.number().optional(),
  BotFileS3Location: z.object({
    S3ObjectVersion: z.string(),
    S3Bucket: z.string(),
    S3ObjectKey: z.string(),
  }).optional(),
  Replication: z.object({
    ReplicaRegions: z.array(z.string()),
  }).optional(),
  BotMembers: z.array(BotMemberSchema).optional(),
  TestBotAliasSettings: z.object({
    Description: z.string(),
    BotAliasLocaleSettings: z.array(BotAliasLocaleSettingsItemSchema),
    ConversationLogSettings: ConversationLogSettingsSchema,
    SentimentAnalysisSettings: z.object({
      DetectSentiment: z.boolean(),
    }),
  }).optional(),
  Id: z.string(),
  Arn: z.string().optional(),
  DataPrivacy: z.object({
    ChildDirected: z.boolean(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Description: z.string().max(2000).describe("A description of the resource")
    .optional(),
  ErrorLogSettings: z.object({
    Enabled: z.boolean().optional(),
  }).optional(),
  RoleArn: z.string().min(32).max(2048).regex(
    new RegExp("^arn:aws[a-zA-Z-]*:iam::[0-9]{12}:role/.*$"),
  ).optional(),
  BotType: z.enum(["Bot", "BotNetwork"]).describe(
    "The type of a bot to create.",
  ).optional(),
  Name: z.string().min(1).max(100).regex(new RegExp("^([0-9a-zA-Z][_-]?)+$"))
    .optional(),
  BotTags: z.array(TagSchema).optional(),
  TestBotAliasTags: z.array(TagSchema).optional(),
  AutoBuildBotLocales: z.boolean().optional(),
  BotLocales: z.array(BotLocaleSchema).optional(),
  IdleSessionTTLInSeconds: z.number().int().min(60).max(86400).optional(),
  BotFileS3Location: z.object({
    S3ObjectVersion: z.string().min(1).max(1024).optional(),
    S3Bucket: z.string().min(3).max(63).regex(
      new RegExp("^[a-z0-9][\\.\\-a-z0-9]{1,61}[a-z0-9]$"),
    ).optional(),
    S3ObjectKey: z.string().min(1).max(1024).regex(
      new RegExp(
        "[\\.\\-\\!\\*\\_\\'\\(\\)a-zA-Z0-9][\\.\\-\\!\\*\\_\\'\\(\\)\\/a-zA-Z0-9]*$",
      ),
    ).optional(),
  }).optional(),
  Replication: z.object({
    ReplicaRegions: z.array(z.string().min(2).max(25)).optional(),
  }).optional(),
  BotMembers: z.array(BotMemberSchema).describe(
    "The list of bot members in a network to be created.",
  ).optional(),
  TestBotAliasSettings: z.object({
    Description: z.string().max(2000).describe("A description of the resource")
      .optional(),
    BotAliasLocaleSettings: z.array(BotAliasLocaleSettingsItemSchema)
      .optional(),
    ConversationLogSettings: ConversationLogSettingsSchema.optional(),
    SentimentAnalysisSettings: z.object({
      DetectSentiment: z.boolean().optional(),
    }).optional(),
  }).optional(),
  DataPrivacy: z.object({
    ChildDirected: z.boolean().optional(),
  }).optional(),
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

/** Swamp extension model for Lex Bot. Registered at `@swamp/aws/lex/bot`. */
export const model = {
  type: "@swamp/aws/lex/bot",
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
      toVersion: "2026.05.14.1",
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
      toVersion: "2026.08.04.1",
      description: "Added: BotType, BotMembers",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Lex Bot resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Lex Bot",
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
          "AWS::Lex::Bot",
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
      description: "Get a Lex Bot",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Lex Bot",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Lex::Bot",
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
      description: "Update a Lex Bot",
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
          "AWS::Lex::Bot",
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
          "AWS::Lex::Bot",
          identifier,
          currentState,
          desiredState,
          ["BotType"],
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
      description: "Delete a Lex Bot",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Lex Bot",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Lex::Bot",
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
      description: "Sync Lex Bot state from AWS",
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
            "AWS::Lex::Bot",
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
      description: "List Lex Bot resources",
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
        const { items, nextToken } = await listResources("AWS::Lex::Bot", {
          resourceModel: args.resourceModel,
          maxPages: args.maxPages,
          credentials,
        });
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const instanceName =
            (item.properties?.Id?.toString() ?? item.identifier).replace(
              /[\/\\]/g,
              "_",
            ).replace(/\.\./g, "_").replace(/\0/g, "");
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
