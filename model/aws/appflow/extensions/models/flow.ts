// Auto-generated extension model for @swamp/aws/appflow/flow
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for AppFlow Flow (AWS::AppFlow::Flow).
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

const ScheduledTriggerPropertiesSchema = z.object({
  ScheduleExpression: z.string().min(1).max(256),
  DataPullMode: z.enum(["Incremental", "Complete"]).optional(),
  ScheduleStartTime: z.number().optional(),
  ScheduleEndTime: z.number().optional(),
  FirstExecutionFrom: z.number().optional(),
  TimeZone: z.string().max(256).optional(),
  ScheduleOffset: z.number().min(0).max(36000).optional(),
  FlowErrorDeactivationThreshold: z.number().int().min(1).max(100).optional(),
});

const AmplitudeSourcePropertiesSchema = z.object({
  Object: z.string().max(512).regex(new RegExp("\\S+")),
});

const DatadogSourcePropertiesSchema = z.object({
  Object: z.string().max(512).regex(new RegExp("\\S+")),
});

const DynatraceSourcePropertiesSchema = z.object({
  Object: z.string().max(512).regex(new RegExp("\\S+")),
});

const GoogleAnalyticsSourcePropertiesSchema = z.object({
  Object: z.string().max(512).regex(new RegExp("\\S+")),
});

const InforNexusSourcePropertiesSchema = z.object({
  Object: z.string().max(512).regex(new RegExp("\\S+")),
});

const MarketoSourcePropertiesSchema = z.object({
  Object: z.string().max(512).regex(new RegExp("\\S+")),
});

const S3InputFormatConfigSchema = z.object({
  S3InputFileType: z.enum(["CSV", "JSON"]).optional(),
});

const S3SourcePropertiesSchema = z.object({
  BucketName: z.string().min(3).max(63).regex(new RegExp("\\S+")),
  BucketPrefix: z.string().max(512),
  S3InputFormatConfig: S3InputFormatConfigSchema.optional(),
});

const SAPODataParallelismConfigSchema = z.object({
  maxParallelism: z.number().int().min(1).max(10),
});

const SAPODataPaginationConfigSchema = z.object({
  maxPageSize: z.number().int().min(1).max(10000),
});

const SAPODataSourcePropertiesSchema = z.object({
  ObjectPath: z.string().max(512).regex(new RegExp("\\S+")),
  parallelismConfig: SAPODataParallelismConfigSchema.describe(
    "SAP Source connector parallelism factor",
  ).optional(),
  paginationConfig: SAPODataPaginationConfigSchema.describe(
    "SAP Source connector page size",
  ).optional(),
});

const SalesforceSourcePropertiesSchema = z.object({
  Object: z.string().max(512).regex(new RegExp("\\S+")),
  EnableDynamicFieldUpdate: z.boolean().optional(),
  IncludeDeletedRecords: z.boolean().optional(),
  DataTransferApi: z.enum(["AUTOMATIC", "BULKV2", "REST_SYNC"]).optional(),
});

const PardotSourcePropertiesSchema = z.object({
  Object: z.string().max(512).regex(new RegExp("\\S+")),
});

const ServiceNowSourcePropertiesSchema = z.object({
  Object: z.string().max(512).regex(new RegExp("\\S+")),
});

const SingularSourcePropertiesSchema = z.object({
  Object: z.string().max(512).regex(new RegExp("\\S+")),
});

const SlackSourcePropertiesSchema = z.object({
  Object: z.string().max(512).regex(new RegExp("\\S+")),
});

const TrendmicroSourcePropertiesSchema = z.object({
  Object: z.string().max(512).regex(new RegExp("\\S+")),
});

const VeevaSourcePropertiesSchema = z.object({
  Object: z.string().max(512).regex(new RegExp("\\S+")),
  DocumentType: z.string().max(512).regex(new RegExp("[\\s\\w_-]+")).optional(),
  IncludeSourceFiles: z.boolean().optional(),
  IncludeRenditions: z.boolean().optional(),
  IncludeAllVersions: z.boolean().optional(),
});

const ZendeskSourcePropertiesSchema = z.object({
  Object: z.string().max(512).regex(new RegExp("\\S+")),
});

const CustomConnectorSourcePropertiesSchema = z.object({
  EntityName: z.string().max(1024).regex(new RegExp("\\S+")),
  CustomProperties: z.record(
    z.string(),
    z.string().min(1).max(2048).regex(new RegExp("\\S+")),
  ).describe("A map for properties for custom connector.").optional(),
  DataTransferApi: z.object({
    Name: z.string().max(64).regex(new RegExp("[\\w/-]+")),
    Type: z.enum(["SYNC", "ASYNC", "AUTOMATIC"]),
  }).optional(),
});

const SourceConnectorPropertiesSchema = z.object({
  Amplitude: AmplitudeSourcePropertiesSchema.optional(),
  Datadog: DatadogSourcePropertiesSchema.optional(),
  Dynatrace: DynatraceSourcePropertiesSchema.optional(),
  GoogleAnalytics: GoogleAnalyticsSourcePropertiesSchema.optional(),
  InforNexus: InforNexusSourcePropertiesSchema.optional(),
  Marketo: MarketoSourcePropertiesSchema.optional(),
  S3: S3SourcePropertiesSchema.optional(),
  SAPOData: SAPODataSourcePropertiesSchema.optional(),
  Salesforce: SalesforceSourcePropertiesSchema.optional(),
  Pardot: PardotSourcePropertiesSchema.optional(),
  ServiceNow: ServiceNowSourcePropertiesSchema.optional(),
  Singular: SingularSourcePropertiesSchema.optional(),
  Slack: SlackSourcePropertiesSchema.optional(),
  Trendmicro: TrendmicroSourcePropertiesSchema.optional(),
  Veeva: VeevaSourcePropertiesSchema.optional(),
  Zendesk: ZendeskSourcePropertiesSchema.optional(),
  CustomConnector: CustomConnectorSourcePropertiesSchema.optional(),
});

const IncrementalPullConfigSchema = z.object({
  DatetimeTypeFieldName: z.string().max(256).describe(
    "Name of the datetime/timestamp data type field to be used for importing incremental records from the source",
  ).optional(),
});

const ErrorHandlingConfigSchema = z.object({
  FailOnFirstError: z.boolean().optional(),
  BucketPrefix: z.string().max(512).optional(),
  BucketName: z.string().min(3).max(63).regex(new RegExp("\\S+")).optional(),
});

const RedshiftDestinationPropertiesSchema = z.object({
  Object: z.string().max(512).regex(new RegExp("\\S+")),
  IntermediateBucketName: z.string().min(3).max(63).regex(new RegExp("\\S+")),
  BucketPrefix: z.string().max(512).optional(),
  ErrorHandlingConfig: ErrorHandlingConfigSchema.optional(),
});

const PrefixConfigSchema = z.object({
  PrefixType: z.enum(["FILENAME", "PATH", "PATH_AND_FILENAME"]).optional(),
  PrefixFormat: z.enum(["YEAR", "MONTH", "DAY", "HOUR", "MINUTE"]).optional(),
  PathPrefixHierarchy: z.array(z.enum(["EXECUTION_ID", "SCHEMA_VERSION"]))
    .optional(),
});

const AggregationConfigSchema = z.object({
  AggregationType: z.enum(["None", "SingleFile"]).optional(),
  TargetFileSize: z.number().int().optional(),
});

const S3OutputFormatConfigSchema = z.object({
  FileType: z.enum(["CSV", "JSON", "PARQUET"]).optional(),
  PrefixConfig: PrefixConfigSchema.optional(),
  AggregationConfig: AggregationConfigSchema.optional(),
  PreserveSourceDataTyping: z.boolean().optional(),
});

const S3DestinationPropertiesSchema = z.object({
  BucketName: z.string().min(3).max(63).regex(new RegExp("\\S+")),
  BucketPrefix: z.string().max(512).optional(),
  S3OutputFormatConfig: S3OutputFormatConfigSchema.optional(),
});

const SalesforceDestinationPropertiesSchema = z.object({
  Object: z.string().max(512).regex(new RegExp("\\S+")),
  ErrorHandlingConfig: ErrorHandlingConfigSchema.optional(),
  IdFieldNames: z.array(z.string()).describe(
    "List of fields used as ID when performing a write operation.",
  ).optional(),
  WriteOperationType: z.enum(["INSERT", "UPSERT", "UPDATE", "DELETE"])
    .optional(),
  DataTransferApi: z.enum(["AUTOMATIC", "BULKV2", "REST_SYNC"]).optional(),
});

const SnowflakeDestinationPropertiesSchema = z.object({
  Object: z.string().max(512).regex(new RegExp("\\S+")),
  IntermediateBucketName: z.string().min(3).max(63).regex(new RegExp("\\S+")),
  BucketPrefix: z.string().max(512).optional(),
  ErrorHandlingConfig: ErrorHandlingConfigSchema.optional(),
});

const EventBridgeDestinationPropertiesSchema = z.object({
  Object: z.string().max(512).regex(new RegExp("\\S+")),
  ErrorHandlingConfig: ErrorHandlingConfigSchema.optional(),
});

const UpsolverS3OutputFormatConfigSchema = z.object({
  FileType: z.enum(["CSV", "JSON", "PARQUET"]).optional(),
  PrefixConfig: PrefixConfigSchema,
  AggregationConfig: AggregationConfigSchema.optional(),
});

const UpsolverDestinationPropertiesSchema = z.object({
  BucketName: z.string().min(16).max(63).regex(
    new RegExp("^(upsolver-appflow)\\S*"),
  ),
  BucketPrefix: z.string().max(512).optional(),
  S3OutputFormatConfig: UpsolverS3OutputFormatConfigSchema,
});

const LookoutMetricsDestinationPropertiesSchema = z.object({
  Object: z.string().max(512).regex(new RegExp("\\S+")).optional(),
});

const MarketoDestinationPropertiesSchema = z.object({
  Object: z.string().max(512).regex(new RegExp("\\S+")),
  ErrorHandlingConfig: ErrorHandlingConfigSchema.optional(),
});

const ZendeskDestinationPropertiesSchema = z.object({
  Object: z.string().max(512).regex(new RegExp("\\S+")),
  ErrorHandlingConfig: ErrorHandlingConfigSchema.optional(),
  IdFieldNames: z.array(z.string()).describe(
    "List of fields used as ID when performing a write operation.",
  ).optional(),
  WriteOperationType: z.enum(["INSERT", "UPSERT", "UPDATE", "DELETE"])
    .optional(),
});

const CustomConnectorDestinationPropertiesSchema = z.object({
  EntityName: z.string().max(1024).regex(new RegExp("\\S+")),
  ErrorHandlingConfig: ErrorHandlingConfigSchema.optional(),
  WriteOperationType: z.enum(["INSERT", "UPSERT", "UPDATE", "DELETE"])
    .optional(),
  IdFieldNames: z.array(z.string()).describe(
    "List of fields used as ID when performing a write operation.",
  ).optional(),
  CustomProperties: z.record(
    z.string(),
    z.string().min(1).max(2048).regex(new RegExp("\\S+")),
  ).describe("A map for properties for custom connector.").optional(),
});

const SuccessResponseHandlingConfigSchema = z.object({
  BucketPrefix: z.string().max(512).optional(),
  BucketName: z.string().min(3).max(63).regex(new RegExp("\\S+")).optional(),
});

const SAPODataDestinationPropertiesSchema = z.object({
  ObjectPath: z.string().max(512).regex(new RegExp("\\S+")),
  ErrorHandlingConfig: ErrorHandlingConfigSchema.optional(),
  SuccessResponseHandlingConfig: SuccessResponseHandlingConfigSchema.optional(),
  IdFieldNames: z.array(z.string()).describe(
    "List of fields used as ID when performing a write operation.",
  ).optional(),
  WriteOperationType: z.enum(["INSERT", "UPSERT", "UPDATE", "DELETE"])
    .optional(),
});

const DestinationConnectorPropertiesSchema = z.object({
  Redshift: RedshiftDestinationPropertiesSchema.optional(),
  S3: S3DestinationPropertiesSchema.optional(),
  Salesforce: SalesforceDestinationPropertiesSchema.optional(),
  Snowflake: SnowflakeDestinationPropertiesSchema.optional(),
  EventBridge: EventBridgeDestinationPropertiesSchema.optional(),
  Upsolver: UpsolverDestinationPropertiesSchema.optional(),
  LookoutMetrics: LookoutMetricsDestinationPropertiesSchema.optional(),
  Marketo: MarketoDestinationPropertiesSchema.optional(),
  Zendesk: ZendeskDestinationPropertiesSchema.optional(),
  CustomConnector: CustomConnectorDestinationPropertiesSchema.optional(),
  SAPOData: SAPODataDestinationPropertiesSchema.optional(),
});

const DestinationFlowConfigSchema = z.object({
  ConnectorType: z.enum([
    "SAPOData",
    "Salesforce",
    "Pardot",
    "Singular",
    "Slack",
    "Redshift",
    "S3",
    "Marketo",
    "Googleanalytics",
    "Zendesk",
    "Servicenow",
    "Datadog",
    "Trendmicro",
    "Snowflake",
    "Dynatrace",
    "Infornexus",
    "Amplitude",
    "Veeva",
    "CustomConnector",
    "EventBridge",
    "Upsolver",
    "LookoutMetrics",
  ]).describe("Destination connector type"),
  ApiVersion: z.string().max(256).regex(new RegExp("\\S+")).describe(
    "The API version that the destination connector uses.",
  ).optional(),
  ConnectorProfileName: z.string().max(256).regex(new RegExp("[\\w/!@#+=.-]+"))
    .describe("Name of destination connector profile").optional(),
  DestinationConnectorProperties: DestinationConnectorPropertiesSchema.describe(
    "Destination connector details",
  ),
});

const ConnectorOperatorSchema = z.object({
  Amplitude: z.enum(["BETWEEN"]).optional(),
  Datadog: z.enum([
    "PROJECTION",
    "BETWEEN",
    "EQUAL_TO",
    "ADDITION",
    "MULTIPLICATION",
    "DIVISION",
    "SUBTRACTION",
    "MASK_ALL",
    "MASK_FIRST_N",
    "MASK_LAST_N",
    "VALIDATE_NON_NULL",
    "VALIDATE_NON_ZERO",
    "VALIDATE_NON_NEGATIVE",
    "VALIDATE_NUMERIC",
    "NO_OP",
  ]).optional(),
  Dynatrace: z.enum([
    "PROJECTION",
    "BETWEEN",
    "EQUAL_TO",
    "ADDITION",
    "MULTIPLICATION",
    "DIVISION",
    "SUBTRACTION",
    "MASK_ALL",
    "MASK_FIRST_N",
    "MASK_LAST_N",
    "VALIDATE_NON_NULL",
    "VALIDATE_NON_ZERO",
    "VALIDATE_NON_NEGATIVE",
    "VALIDATE_NUMERIC",
    "NO_OP",
  ]).optional(),
  GoogleAnalytics: z.enum(["PROJECTION", "BETWEEN"]).optional(),
  InforNexus: z.enum([
    "PROJECTION",
    "BETWEEN",
    "EQUAL_TO",
    "ADDITION",
    "MULTIPLICATION",
    "DIVISION",
    "SUBTRACTION",
    "MASK_ALL",
    "MASK_FIRST_N",
    "MASK_LAST_N",
    "VALIDATE_NON_NULL",
    "VALIDATE_NON_ZERO",
    "VALIDATE_NON_NEGATIVE",
    "VALIDATE_NUMERIC",
    "NO_OP",
  ]).optional(),
  Marketo: z.enum([
    "PROJECTION",
    "LESS_THAN",
    "GREATER_THAN",
    "BETWEEN",
    "ADDITION",
    "MULTIPLICATION",
    "DIVISION",
    "SUBTRACTION",
    "MASK_ALL",
    "MASK_FIRST_N",
    "MASK_LAST_N",
    "VALIDATE_NON_NULL",
    "VALIDATE_NON_ZERO",
    "VALIDATE_NON_NEGATIVE",
    "VALIDATE_NUMERIC",
    "NO_OP",
  ]).optional(),
  S3: z.enum([
    "PROJECTION",
    "LESS_THAN",
    "GREATER_THAN",
    "BETWEEN",
    "LESS_THAN_OR_EQUAL_TO",
    "GREATER_THAN_OR_EQUAL_TO",
    "EQUAL_TO",
    "NOT_EQUAL_TO",
    "ADDITION",
    "MULTIPLICATION",
    "DIVISION",
    "SUBTRACTION",
    "MASK_ALL",
    "MASK_FIRST_N",
    "MASK_LAST_N",
    "VALIDATE_NON_NULL",
    "VALIDATE_NON_ZERO",
    "VALIDATE_NON_NEGATIVE",
    "VALIDATE_NUMERIC",
    "NO_OP",
  ]).optional(),
  SAPOData: z.enum([
    "PROJECTION",
    "LESS_THAN",
    "CONTAINS",
    "GREATER_THAN",
    "BETWEEN",
    "LESS_THAN_OR_EQUAL_TO",
    "GREATER_THAN_OR_EQUAL_TO",
    "EQUAL_TO",
    "NOT_EQUAL_TO",
    "ADDITION",
    "MULTIPLICATION",
    "DIVISION",
    "SUBTRACTION",
    "MASK_ALL",
    "MASK_FIRST_N",
    "MASK_LAST_N",
    "VALIDATE_NON_NULL",
    "VALIDATE_NON_ZERO",
    "VALIDATE_NON_NEGATIVE",
    "VALIDATE_NUMERIC",
    "NO_OP",
  ]).optional(),
  Salesforce: z.enum([
    "PROJECTION",
    "LESS_THAN",
    "CONTAINS",
    "GREATER_THAN",
    "BETWEEN",
    "LESS_THAN_OR_EQUAL_TO",
    "GREATER_THAN_OR_EQUAL_TO",
    "EQUAL_TO",
    "NOT_EQUAL_TO",
    "ADDITION",
    "MULTIPLICATION",
    "DIVISION",
    "SUBTRACTION",
    "MASK_ALL",
    "MASK_FIRST_N",
    "MASK_LAST_N",
    "VALIDATE_NON_NULL",
    "VALIDATE_NON_ZERO",
    "VALIDATE_NON_NEGATIVE",
    "VALIDATE_NUMERIC",
    "NO_OP",
  ]).optional(),
  Pardot: z.enum([
    "PROJECTION",
    "EQUAL_TO",
    "NO_OP",
    "ADDITION",
    "MULTIPLICATION",
    "DIVISION",
    "SUBTRACTION",
    "MASK_ALL",
    "MASK_FIRST_N",
    "MASK_LAST_N",
    "VALIDATE_NON_NULL",
    "VALIDATE_NON_ZERO",
    "VALIDATE_NON_NEGATIVE",
    "VALIDATE_NUMERIC",
  ]).optional(),
  ServiceNow: z.enum([
    "PROJECTION",
    "LESS_THAN",
    "CONTAINS",
    "GREATER_THAN",
    "BETWEEN",
    "LESS_THAN_OR_EQUAL_TO",
    "GREATER_THAN_OR_EQUAL_TO",
    "EQUAL_TO",
    "NOT_EQUAL_TO",
    "ADDITION",
    "MULTIPLICATION",
    "DIVISION",
    "SUBTRACTION",
    "MASK_ALL",
    "MASK_FIRST_N",
    "MASK_LAST_N",
    "VALIDATE_NON_NULL",
    "VALIDATE_NON_ZERO",
    "VALIDATE_NON_NEGATIVE",
    "VALIDATE_NUMERIC",
    "NO_OP",
  ]).optional(),
  Singular: z.enum([
    "PROJECTION",
    "EQUAL_TO",
    "ADDITION",
    "MULTIPLICATION",
    "DIVISION",
    "SUBTRACTION",
    "MASK_ALL",
    "MASK_FIRST_N",
    "MASK_LAST_N",
    "VALIDATE_NON_NULL",
    "VALIDATE_NON_ZERO",
    "VALIDATE_NON_NEGATIVE",
    "VALIDATE_NUMERIC",
    "NO_OP",
  ]).optional(),
  Slack: z.enum([
    "PROJECTION",
    "BETWEEN",
    "EQUAL_TO",
    "ADDITION",
    "MULTIPLICATION",
    "DIVISION",
    "SUBTRACTION",
    "MASK_ALL",
    "MASK_FIRST_N",
    "MASK_LAST_N",
    "VALIDATE_NON_NULL",
    "VALIDATE_NON_ZERO",
    "VALIDATE_NON_NEGATIVE",
    "VALIDATE_NUMERIC",
    "NO_OP",
  ]).optional(),
  Trendmicro: z.enum([
    "PROJECTION",
    "EQUAL_TO",
    "ADDITION",
    "MULTIPLICATION",
    "DIVISION",
    "SUBTRACTION",
    "MASK_ALL",
    "MASK_FIRST_N",
    "MASK_LAST_N",
    "VALIDATE_NON_NULL",
    "VALIDATE_NON_ZERO",
    "VALIDATE_NON_NEGATIVE",
    "VALIDATE_NUMERIC",
    "NO_OP",
  ]).optional(),
  Veeva: z.enum([
    "PROJECTION",
    "LESS_THAN",
    "GREATER_THAN",
    "BETWEEN",
    "LESS_THAN_OR_EQUAL_TO",
    "GREATER_THAN_OR_EQUAL_TO",
    "EQUAL_TO",
    "NOT_EQUAL_TO",
    "ADDITION",
    "MULTIPLICATION",
    "DIVISION",
    "SUBTRACTION",
    "MASK_ALL",
    "MASK_FIRST_N",
    "MASK_LAST_N",
    "VALIDATE_NON_NULL",
    "VALIDATE_NON_ZERO",
    "VALIDATE_NON_NEGATIVE",
    "VALIDATE_NUMERIC",
    "NO_OP",
  ]).optional(),
  Zendesk: z.enum([
    "PROJECTION",
    "GREATER_THAN",
    "ADDITION",
    "MULTIPLICATION",
    "DIVISION",
    "SUBTRACTION",
    "MASK_ALL",
    "MASK_FIRST_N",
    "MASK_LAST_N",
    "VALIDATE_NON_NULL",
    "VALIDATE_NON_ZERO",
    "VALIDATE_NON_NEGATIVE",
    "VALIDATE_NUMERIC",
    "NO_OP",
  ]).optional(),
  CustomConnector: z.enum([
    "PROJECTION",
    "LESS_THAN",
    "GREATER_THAN",
    "CONTAINS",
    "BETWEEN",
    "LESS_THAN_OR_EQUAL_TO",
    "GREATER_THAN_OR_EQUAL_TO",
    "EQUAL_TO",
    "NOT_EQUAL_TO",
    "ADDITION",
    "MULTIPLICATION",
    "DIVISION",
    "SUBTRACTION",
    "MASK_ALL",
    "MASK_FIRST_N",
    "MASK_LAST_N",
    "VALIDATE_NON_NULL",
    "VALIDATE_NON_ZERO",
    "VALIDATE_NON_NEGATIVE",
    "VALIDATE_NUMERIC",
    "NO_OP",
  ]).optional(),
});

const TaskPropertiesObjectSchema = z.object({
  Key: z.enum([
    "VALUE",
    "VALUES",
    "DATA_TYPE",
    "UPPER_BOUND",
    "LOWER_BOUND",
    "SOURCE_DATA_TYPE",
    "DESTINATION_DATA_TYPE",
    "VALIDATION_ACTION",
    "MASK_VALUE",
    "MASK_LENGTH",
    "TRUNCATE_LENGTH",
    "MATH_OPERATION_FIELDS_ORDER",
    "CONCAT_FORMAT",
    "SUBFIELD_CATEGORY_MAP",
    "EXCLUDE_SOURCE_FIELDS_LIST",
    "INCLUDE_NEW_FIELDS",
    "ORDERED_PARTITION_KEYS_LIST",
  ]),
  Value: z.string().max(2048).regex(new RegExp(".+")),
});

const TaskSchema = z.object({
  SourceFields: z.array(z.string()).describe(
    "Source fields on which particular task will be applied",
  ),
  ConnectorOperator: ConnectorOperatorSchema.describe(
    "Operation to be performed on provided source fields",
  ).optional(),
  DestinationField: z.string().max(256).describe(
    "A field value on which source field should be validated",
  ).optional(),
  TaskType: z.enum([
    "Arithmetic",
    "Filter",
    "Map",
    "Map_all",
    "Mask",
    "Merge",
    "Passthrough",
    "Truncate",
    "Validate",
    "Partition",
  ]).describe("Type of task"),
  TaskProperties: z.array(TaskPropertiesObjectSchema).describe(
    "A Map used to store task related info",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe(
    "A string used to identify this tag",
  ),
  Value: z.string().min(0).max(256).describe(
    "A string containing the value for the tag",
  ),
});

const GlueDataCatalogSchema = z.object({
  RoleArn: z.string().min(0).max(512).regex(
    new RegExp("arn:aws:iam:.*:[0-9]+:.*"),
  ).describe("A string containing the value for the tag"),
  DatabaseName: z.string().min(0).max(255).regex(
    new RegExp("[\\u0020-\\uD7FF\\uE000-\\uFFFD\\uD800\\uDFFF\\t]*"),
  ).describe("A string containing the value for the tag"),
  TablePrefix: z.string().min(0).max(128).regex(
    new RegExp("[\\u0020-\\uD7FF\\uE000-\\uFFFD\\uD800\\uDFFF\\t]*"),
  ).describe("A string containing the value for the tag"),
});

const GlobalArgsSchema = z.object({
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
  FlowName: z.string().min(1).max(256).regex(
    new RegExp("[a-zA-Z0-9][\\w!@#.-]+"),
  ).describe("Name of the flow."),
  Description: z.string().max(2048).regex(new RegExp("[\\w!@#\\-.?,\\s]*"))
    .describe("Description of the flow.").optional(),
  KMSArn: z.string().min(20).max(2048).regex(
    new RegExp("arn:aws:kms:.*:[0-9]+:.*"),
  ).describe(
    "The ARN of the AWS Key Management Service (AWS KMS) key that's used to encrypt your function's environment variables. If it's not provided, AWS Lambda uses a default service key.",
  ).optional(),
  TriggerConfig: z.object({
    TriggerType: z.enum(["Scheduled", "Event", "OnDemand"]).describe(
      "Trigger type of the flow",
    ),
    TriggerProperties: ScheduledTriggerPropertiesSchema.describe(
      "Details required based on the type of trigger",
    ).optional(),
  }).describe("Trigger settings of the flow."),
  FlowStatus: z.enum(["Active", "Suspended", "Draft"]).describe(
    "Flow activation status for Scheduled- and Event-triggered flows",
  ).optional(),
  SourceFlowConfig: z.object({
    ConnectorType: z.enum([
      "SAPOData",
      "Salesforce",
      "Pardot",
      "Singular",
      "Slack",
      "Redshift",
      "S3",
      "Marketo",
      "Googleanalytics",
      "Zendesk",
      "Servicenow",
      "Datadog",
      "Trendmicro",
      "Snowflake",
      "Dynatrace",
      "Infornexus",
      "Amplitude",
      "Veeva",
      "CustomConnector",
      "EventBridge",
      "Upsolver",
      "LookoutMetrics",
    ]).describe("Type of source connector"),
    ApiVersion: z.string().max(256).regex(new RegExp("\\S+")).describe(
      "The API version that the destination connector uses.",
    ).optional(),
    ConnectorProfileName: z.string().max(256).regex(
      new RegExp("[\\w/!@#+=.-]+"),
    ).describe("Name of source connector profile").optional(),
    SourceConnectorProperties: SourceConnectorPropertiesSchema.describe(
      "Source connector details required to query a connector",
    ),
    IncrementalPullConfig: IncrementalPullConfigSchema.describe(
      "Configuration for scheduled incremental data pull",
    ).optional(),
  }).describe("Configurations of Source connector of the flow."),
  DestinationFlowConfigList: z.array(DestinationFlowConfigSchema).describe(
    "List of Destination connectors of the flow.",
  ),
  Tasks: z.array(TaskSchema).describe("List of tasks for the flow."),
  Tags: z.array(TagSchema).describe("List of Tags.").optional(),
  MetadataCatalogConfig: z.object({
    GlueDataCatalog: GlueDataCatalogSchema.describe(
      "Configurations of glue data catalog of the flow.",
    ).optional(),
  }).describe("Configurations of metadata catalog of the flow.").optional(),
});

const StateSchema = z.object({
  FlowArn: z.string().optional(),
  FlowName: z.string(),
  Description: z.string().optional(),
  KMSArn: z.string().optional(),
  TriggerConfig: z.object({
    TriggerType: z.string(),
    TriggerProperties: ScheduledTriggerPropertiesSchema,
  }).optional(),
  FlowStatus: z.string().optional(),
  SourceFlowConfig: z.object({
    ConnectorType: z.string(),
    ApiVersion: z.string(),
    ConnectorProfileName: z.string(),
    SourceConnectorProperties: SourceConnectorPropertiesSchema,
    IncrementalPullConfig: IncrementalPullConfigSchema,
  }).optional(),
  DestinationFlowConfigList: z.array(DestinationFlowConfigSchema).optional(),
  Tasks: z.array(TaskSchema).optional(),
  Tags: z.array(TagSchema).optional(),
  MetadataCatalogConfig: z.object({
    GlueDataCatalog: GlueDataCatalogSchema,
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  FlowName: z.string().min(1).max(256).regex(
    new RegExp("[a-zA-Z0-9][\\w!@#.-]+"),
  ).describe("Name of the flow.").optional(),
  Description: z.string().max(2048).regex(new RegExp("[\\w!@#\\-.?,\\s]*"))
    .describe("Description of the flow.").optional(),
  KMSArn: z.string().min(20).max(2048).regex(
    new RegExp("arn:aws:kms:.*:[0-9]+:.*"),
  ).describe(
    "The ARN of the AWS Key Management Service (AWS KMS) key that's used to encrypt your function's environment variables. If it's not provided, AWS Lambda uses a default service key.",
  ).optional(),
  TriggerConfig: z.object({
    TriggerType: z.enum(["Scheduled", "Event", "OnDemand"]).describe(
      "Trigger type of the flow",
    ).optional(),
    TriggerProperties: ScheduledTriggerPropertiesSchema.describe(
      "Details required based on the type of trigger",
    ).optional(),
  }).describe("Trigger settings of the flow.").optional(),
  FlowStatus: z.enum(["Active", "Suspended", "Draft"]).describe(
    "Flow activation status for Scheduled- and Event-triggered flows",
  ).optional(),
  SourceFlowConfig: z.object({
    ConnectorType: z.enum([
      "SAPOData",
      "Salesforce",
      "Pardot",
      "Singular",
      "Slack",
      "Redshift",
      "S3",
      "Marketo",
      "Googleanalytics",
      "Zendesk",
      "Servicenow",
      "Datadog",
      "Trendmicro",
      "Snowflake",
      "Dynatrace",
      "Infornexus",
      "Amplitude",
      "Veeva",
      "CustomConnector",
      "EventBridge",
      "Upsolver",
      "LookoutMetrics",
    ]).describe("Type of source connector").optional(),
    ApiVersion: z.string().max(256).regex(new RegExp("\\S+")).describe(
      "The API version that the destination connector uses.",
    ).optional(),
    ConnectorProfileName: z.string().max(256).regex(
      new RegExp("[\\w/!@#+=.-]+"),
    ).describe("Name of source connector profile").optional(),
    SourceConnectorProperties: SourceConnectorPropertiesSchema.describe(
      "Source connector details required to query a connector",
    ).optional(),
    IncrementalPullConfig: IncrementalPullConfigSchema.describe(
      "Configuration for scheduled incremental data pull",
    ).optional(),
  }).describe("Configurations of Source connector of the flow.").optional(),
  DestinationFlowConfigList: z.array(DestinationFlowConfigSchema).describe(
    "List of Destination connectors of the flow.",
  ).optional(),
  Tasks: z.array(TaskSchema).describe("List of tasks for the flow.").optional(),
  Tags: z.array(TagSchema).describe("List of Tags.").optional(),
  MetadataCatalogConfig: z.object({
    GlueDataCatalog: GlueDataCatalogSchema.describe(
      "Configurations of glue data catalog of the flow.",
    ).optional(),
  }).describe("Configurations of metadata catalog of the flow.").optional(),
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

/** Swamp extension model for AppFlow Flow. Registered at `@swamp/aws/appflow/flow`. */
export const model = {
  type: "@swamp/aws/appflow/flow",
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
      description: "AppFlow Flow resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a AppFlow Flow",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::AppFlow::Flow",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.FlowName ?? g.FlowName)?.toString() ?? "current").replace(
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
      description: "Get a AppFlow Flow",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AppFlow Flow",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::AppFlow::Flow",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.FlowName ?? context.globalArgs.FlowName)?.toString() ??
            args.identifier).replace(/[\/\\]/g, "_").replace(/\.\./g, "_")
            .replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a AppFlow Flow",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.FlowName?.toString() ?? "current").replace(
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
        const identifier = existing.FlowName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::AppFlow::Flow",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::AppFlow::Flow",
          identifier,
          currentState,
          desiredState,
          ["FlowName", "KMSArn"],
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
      description: "Delete a AppFlow Flow",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AppFlow Flow",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::AppFlow::Flow",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.FlowName?.toString() ?? args.identifier).replace(
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
      description: "Sync AppFlow Flow state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.FlowName?.toString() ?? "current").replace(
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
        const identifier = existing.FlowName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::AppFlow::Flow",
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
