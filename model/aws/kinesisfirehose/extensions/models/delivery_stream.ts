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

// Auto-generated extension model for @swamp/aws/kinesisfirehose/delivery-stream
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any no-control-regex

/**
 * Swamp extension model for KinesisFirehose DeliveryStream (AWS::KinesisFirehose::DeliveryStream).
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

const HttpEndpointCommonAttributeSchema = z.object({
  AttributeValue: z.string().min(0).max(1024),
  AttributeName: z.string().min(1).max(256),
});

const HttpEndpointRequestConfigurationSchema = z.object({
  CommonAttributes: z.array(HttpEndpointCommonAttributeSchema).optional(),
  ContentEncoding: z.enum(["NONE", "GZIP"]).optional(),
});

const BufferingHintsSchema = z.object({
  IntervalInSeconds: z.number().int().optional(),
  SizeInMBs: z.number().int().optional(),
});

const KMSEncryptionConfigSchema = z.object({
  AWSKMSKeyARN: z.string(),
});

const EncryptionConfigurationSchema = z.object({
  KMSEncryptionConfig: KMSEncryptionConfigSchema.optional(),
  NoEncryptionConfig: z.enum(["NoEncryption"]).optional(),
});

const CloudWatchLoggingOptionsSchema = z.object({
  LogStreamName: z.string().optional(),
  Enabled: z.boolean().optional(),
  LogGroupName: z.string().optional(),
});

const S3DestinationConfigurationSchema = z.object({
  ErrorOutputPrefix: z.string().min(0).max(1024).optional(),
  BucketARN: z.string().min(1).max(2048).regex(new RegExp("arn:.*")),
  BufferingHints: BufferingHintsSchema.optional(),
  CompressionFormat: z.enum([
    "UNCOMPRESSED",
    "GZIP",
    "ZIP",
    "Snappy",
    "HADOOP_SNAPPY",
  ]).optional(),
  EncryptionConfiguration: EncryptionConfigurationSchema.optional(),
  Prefix: z.string().min(0).max(1024).optional(),
  CloudWatchLoggingOptions: CloudWatchLoggingOptionsSchema.optional(),
  RoleARN: z.string().min(1).max(512).regex(new RegExp("arn:.*")),
});

const RetryOptionsSchema = z.object({
  DurationInSeconds: z.number().int().optional(),
});

const SecretsManagerConfigurationSchema = z.object({
  SecretARN: z.string().min(1).max(2048).regex(
    new RegExp(
      "arn:.*:secretsmanager:[a-zA-Z0-9\\-]+:\\d{12}:secret:[a-zA-Z0-9\\-/_+=.@]+",
    ),
  ).optional(),
  Enabled: z.boolean(),
  RoleARN: z.string().min(1).max(512).regex(
    new RegExp("arn:.*:iam::\\d{12}:role/[a-zA-Z_0-9+=,.@\\-_/]+"),
  ).optional(),
});

const HttpEndpointConfigurationSchema = z.object({
  AccessKey: z.string().min(0).max(4096).optional(),
  Url: z.string().min(1).max(1000),
  Name: z.string().min(1).max(256).optional(),
});

const ProcessorParameterSchema = z.object({
  ParameterValue: z.string(),
  ParameterName: z.string(),
});

const ProcessorSchema = z.object({
  Type: z.enum([
    "RecordDeAggregation",
    "Decompression",
    "CloudWatchLogProcessing",
    "Lambda",
    "MetadataExtraction",
    "AppendDelimiterToRecord",
  ]),
  Parameters: z.array(ProcessorParameterSchema).optional(),
});

const ProcessingConfigurationSchema = z.object({
  Enabled: z.boolean().optional(),
  Processors: z.array(ProcessorSchema).optional(),
});

const CatalogConfigurationSchema = z.object({
  CatalogArn: z.string().min(1).max(512).regex(new RegExp("arn:.*")).optional(),
  WarehouseLocation: z.string().min(1).max(2048).regex(
    new RegExp("s3:\\/\\/.*"),
  ).optional(),
});

const PartitionFieldSchema = z.object({
  SourceName: z.string().min(1).max(255),
});

const DestinationTableConfigurationSchema = z.object({
  DestinationDatabaseName: z.string().min(1).max(512),
  S3ErrorOutputPrefix: z.string().min(1).max(1024).optional(),
  DestinationTableName: z.string().min(1).max(512),
  UniqueKeys: z.array(z.string().min(1).max(512)).optional(),
  PartitionSpec: z.object({
    Identity: z.array(PartitionFieldSchema).optional(),
  }).optional(),
});

const TableCreationConfigurationSchema = z.object({
  Enabled: z.boolean().optional(),
});

const SchemaEvolutionConfigurationSchema = z.object({
  Enabled: z.boolean().optional(),
});

const CopyCommandSchema = z.object({
  DataTableName: z.string().min(1).max(512),
  CopyOptions: z.string().min(0).max(204800).optional(),
  DataTableColumns: z.string().min(0).max(204800).optional(),
});

const RedshiftRetryOptionsSchema = z.object({
  DurationInSeconds: z.number().int().optional(),
});

const DocumentIdOptionsSchema = z.object({
  DefaultDocumentIdFormat: z.enum(["FIREHOSE_DEFAULT", "NO_DOCUMENT_ID"]),
});

const AmazonopensearchserviceBufferingHintsSchema = z.object({
  IntervalInSeconds: z.number().int().optional(),
  SizeInMBs: z.number().int().optional(),
});

const AmazonopensearchserviceRetryOptionsSchema = z.object({
  DurationInSeconds: z.number().int().optional(),
});

const VpcConfigurationSchema = z.object({
  SubnetIds: z.array(z.string().min(1).max(1024)),
  SecurityGroupIds: z.array(z.string().min(1).max(1024)),
  RoleARN: z.string().min(1).max(512).regex(new RegExp("arn:.*")),
});

const AuthenticationConfigurationSchema = z.object({
  Connectivity: z.enum(["PUBLIC", "PRIVATE"]),
  RoleARN: z.string().min(1).max(512).regex(new RegExp("arn:.*")),
});

const SplunkBufferingHintsSchema = z.object({
  IntervalInSeconds: z.number().int().optional(),
  SizeInMBs: z.number().int().optional(),
});

const SplunkRetryOptionsSchema = z.object({
  DurationInSeconds: z.number().int().optional(),
});

const HiveJsonSerDeSchema = z.object({
  TimestampFormats: z.array(z.string()).optional(),
});

const OpenXJsonSerDeSchema = z.object({
  ConvertDotsInJsonKeysToUnderscores: z.boolean().optional(),
  ColumnToJsonKeyMappings: z.record(z.string(), z.string()).optional(),
  CaseInsensitive: z.boolean().optional(),
});

const DeserializerSchema = z.object({
  HiveJsonSerDe: HiveJsonSerDeSchema.optional(),
  OpenXJsonSerDe: OpenXJsonSerDeSchema.optional(),
});

const InputFormatConfigurationSchema = z.object({
  Deserializer: DeserializerSchema.optional(),
});

const SchemaConfigurationSchema = z.object({
  VersionId: z.string().optional(),
  TableName: z.string().optional(),
  DatabaseName: z.string().optional(),
  Region: z.string().optional(),
  CatalogId: z.string().optional(),
  RoleARN: z.string().min(1).max(512).regex(new RegExp("arn:.*")).optional(),
});

const OrcSerDeSchema = z.object({
  PaddingTolerance: z.number().optional(),
  Compression: z.string().optional(),
  StripeSizeBytes: z.number().int().optional(),
  BloomFilterColumns: z.array(z.string()).optional(),
  BloomFilterFalsePositiveProbability: z.number().optional(),
  EnablePadding: z.boolean().optional(),
  FormatVersion: z.string().optional(),
  RowIndexStride: z.number().int().optional(),
  BlockSizeBytes: z.number().int().optional(),
  DictionaryKeyThreshold: z.number().optional(),
});

const ParquetSerDeSchema = z.object({
  Compression: z.string().optional(),
  BlockSizeBytes: z.number().int().optional(),
  EnableDictionaryCompression: z.boolean().optional(),
  PageSizeBytes: z.number().int().optional(),
  MaxPaddingBytes: z.number().int().optional(),
  WriterVersion: z.string().optional(),
});

const SerializerSchema = z.object({
  OrcSerDe: OrcSerDeSchema.optional(),
  ParquetSerDe: ParquetSerDeSchema.optional(),
});

const OutputFormatConfigurationSchema = z.object({
  Serializer: SerializerSchema.optional(),
});

const DataFormatConversionConfigurationSchema = z.object({
  InputFormatConfiguration: InputFormatConfigurationSchema.optional(),
  Enabled: z.boolean().optional(),
  SchemaConfiguration: SchemaConfigurationSchema.optional(),
  OutputFormatConfiguration: OutputFormatConfigurationSchema.optional(),
});

const DynamicPartitioningConfigurationSchema = z.object({
  Enabled: z.boolean().optional(),
  RetryOptions: RetryOptionsSchema.optional(),
});

const AmazonOpenSearchServerlessBufferingHintsSchema = z.object({
  IntervalInSeconds: z.number().int().optional(),
  SizeInMBs: z.number().int().optional(),
});

const AmazonOpenSearchServerlessRetryOptionsSchema = z.object({
  DurationInSeconds: z.number().int().optional(),
});

const ElasticsearchBufferingHintsSchema = z.object({
  IntervalInSeconds: z.number().int().optional(),
  SizeInMBs: z.number().int().optional(),
});

const ElasticsearchRetryOptionsSchema = z.object({
  DurationInSeconds: z.number().int().optional(),
});

const SnowflakeVpcConfigurationSchema = z.object({
  PrivateLinkVpceId: z.string().min(47).max(255).regex(
    new RegExp(
      "([a-zA-Z0-9\\-\\_]+\\.){2,3}vpce\\.[a-zA-Z0-9\\-]*\\.vpce-svc\\-[a-zA-Z0-9\\-]{17}$",
    ),
  ),
});

const SnowflakeRoleConfigurationSchema = z.object({
  SnowflakeRole: z.string().min(1).max(255).optional(),
  Enabled: z.boolean().optional(),
});

const SnowflakeBufferingHintsSchema = z.object({
  IntervalInSeconds: z.number().int().optional(),
  SizeInMBs: z.number().int().optional(),
});

const SnowflakeRetryOptionsSchema = z.object({
  DurationInSeconds: z.number().int().optional(),
});

const DatabaseColumnsSchema = z.object({
  Exclude: z.array(
    z.string().min(1).max(194).regex(new RegExp("[\\u0001-\\uFFFF]*")),
  ).optional(),
  Include: z.array(
    z.string().min(1).max(194).regex(new RegExp("[\\u0001-\\uFFFF]*")),
  ).optional(),
});

const DatabasesSchema = z.object({
  Exclude: z.array(
    z.string().min(1).max(64).regex(new RegExp("[\\u0001-\\uFFFF]*")),
  ).optional(),
  Include: z.array(
    z.string().min(1).max(64).regex(new RegExp("[\\u0001-\\uFFFF]*")),
  ).optional(),
});

const DatabaseSourceAuthenticationConfigurationSchema = z.object({
  SecretsManagerConfiguration: SecretsManagerConfigurationSchema,
});

const DatabaseTablesSchema = z.object({
  Exclude: z.array(
    z.string().min(1).max(129).regex(new RegExp("[\\u0001-\\uFFFF]*")),
  ).optional(),
  Include: z.array(
    z.string().min(1).max(129).regex(new RegExp("[\\u0001-\\uFFFF]*")),
  ).optional(),
});

const DatabaseSourceVPCConfigurationSchema = z.object({
  VpcEndpointServiceName: z.string().min(47).max(255).regex(
    new RegExp(
      "([a-zA-Z0-9\\-\\_]+\\.){2,3}vpce\\.[a-zA-Z0-9\\-]*\\.vpce-svc\\-[a-zA-Z0-9\\-]{17}$",
    ),
  ),
});

const TagSchema = z.object({
  Value: z.string().min(0).max(256).regex(
    new RegExp("^[\\p{L}\\p{Z}\\p{N}_.:\\/=+\\-@%]*$", "u"),
  ).optional(),
  Key: z.string().min(1).max(128).regex(
    new RegExp("^(?!aws:)[\\p{L}\\p{Z}\\p{N}_.:\\/=+\\-@%]*$", "u"),
  ),
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
  DeliveryStreamEncryptionConfigurationInput: z.object({
    KeyType: z.enum(["AWS_OWNED_CMK", "CUSTOMER_MANAGED_CMK"]),
    KeyARN: z.string().min(1).max(512).regex(new RegExp("arn:.*")).optional(),
  }).optional(),
  HttpEndpointDestinationConfiguration: z.object({
    RequestConfiguration: HttpEndpointRequestConfigurationSchema.optional(),
    S3Configuration: S3DestinationConfigurationSchema,
    BufferingHints: BufferingHintsSchema.optional(),
    RetryOptions: RetryOptionsSchema.optional(),
    SecretsManagerConfiguration: SecretsManagerConfigurationSchema.optional(),
    EndpointConfiguration: HttpEndpointConfigurationSchema,
    ProcessingConfiguration: ProcessingConfigurationSchema.optional(),
    RoleARN: z.string().min(1).max(512).regex(new RegExp("arn:.*")).optional(),
    CloudWatchLoggingOptions: CloudWatchLoggingOptionsSchema.optional(),
    S3BackupMode: z.string().optional(),
  }).optional(),
  KinesisStreamSourceConfiguration: z.object({
    KinesisStreamARN: z.string().min(1).max(512).regex(new RegExp("arn:.*")),
    RoleARN: z.string().min(1).max(512).regex(new RegExp("arn:.*")),
  }).optional(),
  DeliveryStreamType: z.enum([
    "DatabaseAsSource",
    "DirectPut",
    "KinesisStreamAsSource",
    "MSKAsSource",
  ]).optional(),
  IcebergDestinationConfiguration: z.object({
    CatalogConfiguration: CatalogConfigurationSchema,
    S3Configuration: S3DestinationConfigurationSchema,
    DestinationTableConfigurationList: z.array(
      DestinationTableConfigurationSchema,
    ).optional(),
    BufferingHints: BufferingHintsSchema.optional(),
    TableCreationConfiguration: TableCreationConfigurationSchema.optional(),
    RetryOptions: RetryOptionsSchema.optional(),
    s3BackupMode: z.enum(["AllData", "FailedDataOnly"]).optional(),
    ProcessingConfiguration: ProcessingConfigurationSchema.optional(),
    SchemaEvolutionConfiguration: SchemaEvolutionConfigurationSchema.optional(),
    AppendOnly: z.boolean().optional(),
    CloudWatchLoggingOptions: CloudWatchLoggingOptionsSchema.optional(),
    RoleARN: z.string().min(1).max(512).regex(new RegExp("arn:.*")),
  }).optional(),
  RedshiftDestinationConfiguration: z.object({
    S3BackupConfiguration: S3DestinationConfigurationSchema.optional(),
    S3Configuration: S3DestinationConfigurationSchema,
    Username: z.string().min(1).max(512).optional(),
    CopyCommand: CopyCommandSchema,
    RetryOptions: RedshiftRetryOptionsSchema.optional(),
    SecretsManagerConfiguration: SecretsManagerConfigurationSchema.optional(),
    ProcessingConfiguration: ProcessingConfigurationSchema.optional(),
    CloudWatchLoggingOptions: CloudWatchLoggingOptionsSchema.optional(),
    ClusterJDBCURL: z.string().min(1).max(512),
    RoleARN: z.string().min(1).max(512).regex(new RegExp("arn:.*")),
    Password: z.string().min(6).max(512).optional(),
    S3BackupMode: z.enum(["Disabled", "Enabled"]).optional(),
  }).optional(),
  AmazonopensearchserviceDestinationConfiguration: z.object({
    TypeName: z.string().min(0).max(100).optional(),
    IndexRotationPeriod: z.enum([
      "NoRotation",
      "OneHour",
      "OneDay",
      "OneWeek",
      "OneMonth",
    ]).optional(),
    ProcessingConfiguration: ProcessingConfigurationSchema.optional(),
    ClusterEndpoint: z.string().min(1).max(512).regex(new RegExp("https:.*"))
      .optional(),
    DomainARN: z.string().min(1).max(512).regex(new RegExp("arn:.*"))
      .optional(),
    RoleARN: z.string().min(1).max(512).regex(new RegExp("arn:.*")),
    S3BackupMode: z.enum(["FailedDocumentsOnly", "AllDocuments"]).optional(),
    IndexName: z.string().min(1).max(80),
    DocumentIdOptions: DocumentIdOptionsSchema.optional(),
    S3Configuration: S3DestinationConfigurationSchema,
    BufferingHints: AmazonopensearchserviceBufferingHintsSchema.optional(),
    RetryOptions: AmazonopensearchserviceRetryOptionsSchema.optional(),
    VpcConfiguration: VpcConfigurationSchema.optional(),
    CloudWatchLoggingOptions: CloudWatchLoggingOptionsSchema.optional(),
  }).optional(),
  MSKSourceConfiguration: z.object({
    AuthenticationConfiguration: AuthenticationConfigurationSchema,
    ReadFromTimestamp: z.string().optional(),
    MSKClusterARN: z.string().min(1).max(512).regex(new RegExp("arn:.*")),
    TopicName: z.string().min(1).max(255).regex(
      new RegExp("[a-zA-Z0-9\\._\\-]+"),
    ),
  }).optional(),
  DirectPutSourceConfiguration: z.object({
    ThroughputHintInMBs: z.number().int().min(1).max(100).optional(),
  }).optional(),
  SplunkDestinationConfiguration: z.object({
    HECEndpoint: z.string().min(0).max(2048),
    S3Configuration: S3DestinationConfigurationSchema,
    BufferingHints: SplunkBufferingHintsSchema.optional(),
    HECToken: z.string().min(0).max(2048).optional(),
    RetryOptions: SplunkRetryOptionsSchema.optional(),
    HECEndpointType: z.enum(["Raw", "Event"]),
    SecretsManagerConfiguration: SecretsManagerConfigurationSchema.optional(),
    HECAcknowledgmentTimeoutInSeconds: z.number().int().min(180).max(600)
      .optional(),
    ProcessingConfiguration: ProcessingConfigurationSchema.optional(),
    CloudWatchLoggingOptions: CloudWatchLoggingOptionsSchema.optional(),
    S3BackupMode: z.string().optional(),
  }).optional(),
  ExtendedS3DestinationConfiguration: z.object({
    ErrorOutputPrefix: z.string().min(0).max(1024).optional(),
    S3BackupConfiguration: S3DestinationConfigurationSchema.optional(),
    BucketARN: z.string().min(1).max(2048).regex(new RegExp("arn:.*")),
    CompressionFormat: z.enum([
      "UNCOMPRESSED",
      "GZIP",
      "ZIP",
      "Snappy",
      "HADOOP_SNAPPY",
    ]).optional(),
    DataFormatConversionConfiguration: DataFormatConversionConfigurationSchema
      .optional(),
    EncryptionConfiguration: EncryptionConfigurationSchema.optional(),
    CustomTimeZone: z.string().min(0).max(50).optional(),
    DynamicPartitioningConfiguration: DynamicPartitioningConfigurationSchema
      .optional(),
    Prefix: z.string().min(0).max(1024).optional(),
    ProcessingConfiguration: ProcessingConfigurationSchema.optional(),
    RoleARN: z.string().min(1).max(512).regex(new RegExp("arn:.*")),
    S3BackupMode: z.enum(["Disabled", "Enabled"]).optional(),
    BufferingHints: BufferingHintsSchema.optional(),
    FileExtension: z.string().min(0).max(128).regex(
      new RegExp("^$|\\.[0-9a-z!\\-_.*'()]+"),
    ).optional(),
    CloudWatchLoggingOptions: CloudWatchLoggingOptionsSchema.optional(),
  }).optional(),
  AmazonOpenSearchServerlessDestinationConfiguration: z.object({
    IndexName: z.string().min(1).max(80),
    S3Configuration: S3DestinationConfigurationSchema,
    BufferingHints: AmazonOpenSearchServerlessBufferingHintsSchema.optional(),
    RetryOptions: AmazonOpenSearchServerlessRetryOptionsSchema.optional(),
    CollectionEndpoint: z.string().min(1).max(512).regex(new RegExp("https:.*"))
      .optional(),
    VpcConfiguration: VpcConfigurationSchema.optional(),
    ProcessingConfiguration: ProcessingConfigurationSchema.optional(),
    CloudWatchLoggingOptions: CloudWatchLoggingOptionsSchema.optional(),
    RoleARN: z.string().min(1).max(512).regex(new RegExp("arn:.*")),
    S3BackupMode: z.enum(["FailedDocumentsOnly", "AllDocuments"]).optional(),
  }).optional(),
  ElasticsearchDestinationConfiguration: z.object({
    TypeName: z.string().min(0).max(100).optional(),
    IndexRotationPeriod: z.enum([
      "NoRotation",
      "OneHour",
      "OneDay",
      "OneWeek",
      "OneMonth",
    ]).optional(),
    ProcessingConfiguration: ProcessingConfigurationSchema.optional(),
    ClusterEndpoint: z.string().min(1).max(512).regex(new RegExp("https:.*"))
      .optional(),
    DomainARN: z.string().min(1).max(512).regex(new RegExp("arn:.*"))
      .optional(),
    RoleARN: z.string().min(1).max(512).regex(new RegExp("arn:.*")),
    S3BackupMode: z.enum(["FailedDocumentsOnly", "AllDocuments"]).optional(),
    IndexName: z.string().min(1).max(80),
    DocumentIdOptions: DocumentIdOptionsSchema.optional(),
    S3Configuration: S3DestinationConfigurationSchema,
    BufferingHints: ElasticsearchBufferingHintsSchema.optional(),
    RetryOptions: ElasticsearchRetryOptionsSchema.optional(),
    VpcConfiguration: VpcConfigurationSchema.optional(),
    CloudWatchLoggingOptions: CloudWatchLoggingOptionsSchema.optional(),
  }).optional(),
  SnowflakeDestinationConfiguration: z.object({
    PrivateKey: z.string().min(256).max(4096).regex(
      new RegExp(
        "^(?:[A-Za-z0-9+\\/]{4})*(?:[A-Za-z0-9+\\/]{2}==|[A-Za-z0-9+\\/]{3}=)?$",
      ),
    ).optional(),
    User: z.string().min(1).max(255).optional(),
    Table: z.string().min(1).max(255),
    SnowflakeVpcConfiguration: SnowflakeVpcConfigurationSchema.optional(),
    DataLoadingOption: z.enum([
      "JSON_MAPPING",
      "VARIANT_CONTENT_MAPPING",
      "VARIANT_CONTENT_AND_METADATA_MAPPING",
    ]).optional(),
    Schema: z.string().min(1).max(255),
    ContentColumnName: z.string().min(1).max(255).optional(),
    SecretsManagerConfiguration: SecretsManagerConfigurationSchema.optional(),
    SnowflakeRoleConfiguration: SnowflakeRoleConfigurationSchema.optional(),
    ProcessingConfiguration: ProcessingConfigurationSchema.optional(),
    AccountUrl: z.string().min(24).max(2048).regex(
      new RegExp(".+?\\.snowflakecomputing\\.com"),
    ),
    RoleARN: z.string().min(1).max(512).regex(new RegExp("arn:.*")),
    S3BackupMode: z.enum(["FailedDataOnly", "AllData"]).optional(),
    S3Configuration: S3DestinationConfigurationSchema,
    BufferingHints: SnowflakeBufferingHintsSchema.optional(),
    MetaDataColumnName: z.string().min(1).max(255).optional(),
    Database: z.string().min(1).max(255),
    RetryOptions: SnowflakeRetryOptionsSchema.optional(),
    KeyPassphrase: z.string().min(7).max(255).optional(),
    CloudWatchLoggingOptions: CloudWatchLoggingOptionsSchema.optional(),
  }).optional(),
  DatabaseSourceConfiguration: z.object({
    Digest: z.string().min(1).max(512).regex(new RegExp(".*")).optional(),
    Port: z.number().int().min(0).max(65535),
    PublicCertificate: z.string().min(1).max(4096).regex(new RegExp(".*"))
      .optional(),
    Columns: DatabaseColumnsSchema.optional(),
    Type: z.enum(["MySQL", "PostgreSQL"]),
    SurrogateKeys: z.array(
      z.string().min(1).max(1024).regex(new RegExp("^\\S+$")),
    ).optional(),
    Databases: DatabasesSchema,
    Endpoint: z.string().min(1).max(255).regex(new RegExp("^(?!\\s*$).+")),
    SSLMode: z.enum(["Disabled", "Enabled"]).optional(),
    SnapshotWatermarkTable: z.string().min(1).max(129).regex(
      new RegExp("[\\u0001-\\uFFFF]*"),
    ),
    DatabaseSourceAuthenticationConfiguration:
      DatabaseSourceAuthenticationConfigurationSchema,
    Tables: DatabaseTablesSchema,
    DatabaseSourceVPCConfiguration: DatabaseSourceVPCConfigurationSchema,
  }).optional(),
  S3DestinationConfiguration: z.object({
    ErrorOutputPrefix: z.string().min(0).max(1024).optional(),
    BucketARN: z.string().min(1).max(2048).regex(new RegExp("arn:.*")),
    BufferingHints: BufferingHintsSchema.optional(),
    CompressionFormat: z.enum([
      "UNCOMPRESSED",
      "GZIP",
      "ZIP",
      "Snappy",
      "HADOOP_SNAPPY",
    ]).optional(),
    EncryptionConfiguration: EncryptionConfigurationSchema.optional(),
    Prefix: z.string().min(0).max(1024).optional(),
    CloudWatchLoggingOptions: CloudWatchLoggingOptionsSchema.optional(),
    RoleARN: z.string().min(1).max(512).regex(new RegExp("arn:.*")),
  }).optional(),
  DeliveryStreamName: z.string().min(1).max(64).regex(
    new RegExp("[a-zA-Z0-9._-]+"),
  ).optional(),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  DeliveryStreamEncryptionConfigurationInput: z.object({
    KeyType: z.string(),
    KeyARN: z.string(),
  }).optional(),
  HttpEndpointDestinationConfiguration: z.object({
    RequestConfiguration: HttpEndpointRequestConfigurationSchema,
    S3Configuration: S3DestinationConfigurationSchema,
    BufferingHints: BufferingHintsSchema,
    RetryOptions: RetryOptionsSchema,
    SecretsManagerConfiguration: SecretsManagerConfigurationSchema,
    EndpointConfiguration: HttpEndpointConfigurationSchema,
    ProcessingConfiguration: ProcessingConfigurationSchema,
    RoleARN: z.string(),
    CloudWatchLoggingOptions: CloudWatchLoggingOptionsSchema,
    S3BackupMode: z.string(),
  }).optional(),
  KinesisStreamSourceConfiguration: z.object({
    KinesisStreamARN: z.string(),
    RoleARN: z.string(),
  }).optional(),
  DeliveryStreamType: z.string().optional(),
  IcebergDestinationConfiguration: z.object({
    CatalogConfiguration: CatalogConfigurationSchema,
    S3Configuration: S3DestinationConfigurationSchema,
    DestinationTableConfigurationList: z.array(
      DestinationTableConfigurationSchema,
    ),
    BufferingHints: BufferingHintsSchema,
    TableCreationConfiguration: TableCreationConfigurationSchema,
    RetryOptions: RetryOptionsSchema,
    s3BackupMode: z.string(),
    ProcessingConfiguration: ProcessingConfigurationSchema,
    SchemaEvolutionConfiguration: SchemaEvolutionConfigurationSchema,
    AppendOnly: z.boolean(),
    CloudWatchLoggingOptions: CloudWatchLoggingOptionsSchema,
    RoleARN: z.string(),
  }).optional(),
  RedshiftDestinationConfiguration: z.object({
    S3BackupConfiguration: S3DestinationConfigurationSchema,
    S3Configuration: S3DestinationConfigurationSchema,
    Username: z.string(),
    CopyCommand: CopyCommandSchema,
    RetryOptions: RedshiftRetryOptionsSchema,
    SecretsManagerConfiguration: SecretsManagerConfigurationSchema,
    ProcessingConfiguration: ProcessingConfigurationSchema,
    CloudWatchLoggingOptions: CloudWatchLoggingOptionsSchema,
    ClusterJDBCURL: z.string(),
    RoleARN: z.string(),
    Password: z.string(),
    S3BackupMode: z.string(),
  }).optional(),
  AmazonopensearchserviceDestinationConfiguration: z.object({
    TypeName: z.string(),
    IndexRotationPeriod: z.string(),
    ProcessingConfiguration: ProcessingConfigurationSchema,
    ClusterEndpoint: z.string(),
    DomainARN: z.string(),
    RoleARN: z.string(),
    S3BackupMode: z.string(),
    IndexName: z.string(),
    DocumentIdOptions: DocumentIdOptionsSchema,
    S3Configuration: S3DestinationConfigurationSchema,
    BufferingHints: AmazonopensearchserviceBufferingHintsSchema,
    RetryOptions: AmazonopensearchserviceRetryOptionsSchema,
    VpcConfiguration: VpcConfigurationSchema,
    CloudWatchLoggingOptions: CloudWatchLoggingOptionsSchema,
  }).optional(),
  MSKSourceConfiguration: z.object({
    AuthenticationConfiguration: AuthenticationConfigurationSchema,
    ReadFromTimestamp: z.string(),
    MSKClusterARN: z.string(),
    TopicName: z.string(),
  }).optional(),
  DirectPutSourceConfiguration: z.object({
    ThroughputHintInMBs: z.number(),
  }).optional(),
  SplunkDestinationConfiguration: z.object({
    HECEndpoint: z.string(),
    S3Configuration: S3DestinationConfigurationSchema,
    BufferingHints: SplunkBufferingHintsSchema,
    HECToken: z.string(),
    RetryOptions: SplunkRetryOptionsSchema,
    HECEndpointType: z.string(),
    SecretsManagerConfiguration: SecretsManagerConfigurationSchema,
    HECAcknowledgmentTimeoutInSeconds: z.number(),
    ProcessingConfiguration: ProcessingConfigurationSchema,
    CloudWatchLoggingOptions: CloudWatchLoggingOptionsSchema,
    S3BackupMode: z.string(),
  }).optional(),
  ExtendedS3DestinationConfiguration: z.object({
    ErrorOutputPrefix: z.string(),
    S3BackupConfiguration: S3DestinationConfigurationSchema,
    BucketARN: z.string(),
    CompressionFormat: z.string(),
    DataFormatConversionConfiguration: DataFormatConversionConfigurationSchema,
    EncryptionConfiguration: EncryptionConfigurationSchema,
    CustomTimeZone: z.string(),
    DynamicPartitioningConfiguration: DynamicPartitioningConfigurationSchema,
    Prefix: z.string(),
    ProcessingConfiguration: ProcessingConfigurationSchema,
    RoleARN: z.string(),
    S3BackupMode: z.string(),
    BufferingHints: BufferingHintsSchema,
    FileExtension: z.string(),
    CloudWatchLoggingOptions: CloudWatchLoggingOptionsSchema,
  }).optional(),
  AmazonOpenSearchServerlessDestinationConfiguration: z.object({
    IndexName: z.string(),
    S3Configuration: S3DestinationConfigurationSchema,
    BufferingHints: AmazonOpenSearchServerlessBufferingHintsSchema,
    RetryOptions: AmazonOpenSearchServerlessRetryOptionsSchema,
    CollectionEndpoint: z.string(),
    VpcConfiguration: VpcConfigurationSchema,
    ProcessingConfiguration: ProcessingConfigurationSchema,
    CloudWatchLoggingOptions: CloudWatchLoggingOptionsSchema,
    RoleARN: z.string(),
    S3BackupMode: z.string(),
  }).optional(),
  ElasticsearchDestinationConfiguration: z.object({
    TypeName: z.string(),
    IndexRotationPeriod: z.string(),
    ProcessingConfiguration: ProcessingConfigurationSchema,
    ClusterEndpoint: z.string(),
    DomainARN: z.string(),
    RoleARN: z.string(),
    S3BackupMode: z.string(),
    IndexName: z.string(),
    DocumentIdOptions: DocumentIdOptionsSchema,
    S3Configuration: S3DestinationConfigurationSchema,
    BufferingHints: ElasticsearchBufferingHintsSchema,
    RetryOptions: ElasticsearchRetryOptionsSchema,
    VpcConfiguration: VpcConfigurationSchema,
    CloudWatchLoggingOptions: CloudWatchLoggingOptionsSchema,
  }).optional(),
  SnowflakeDestinationConfiguration: z.object({
    PrivateKey: z.string(),
    User: z.string(),
    Table: z.string(),
    SnowflakeVpcConfiguration: SnowflakeVpcConfigurationSchema,
    DataLoadingOption: z.string(),
    Schema: z.string(),
    ContentColumnName: z.string(),
    SecretsManagerConfiguration: SecretsManagerConfigurationSchema,
    SnowflakeRoleConfiguration: SnowflakeRoleConfigurationSchema,
    ProcessingConfiguration: ProcessingConfigurationSchema,
    AccountUrl: z.string(),
    RoleARN: z.string(),
    S3BackupMode: z.string(),
    S3Configuration: S3DestinationConfigurationSchema,
    BufferingHints: SnowflakeBufferingHintsSchema,
    MetaDataColumnName: z.string(),
    Database: z.string(),
    RetryOptions: SnowflakeRetryOptionsSchema,
    KeyPassphrase: z.string(),
    CloudWatchLoggingOptions: CloudWatchLoggingOptionsSchema,
  }).optional(),
  DatabaseSourceConfiguration: z.object({
    Digest: z.string(),
    Port: z.number(),
    PublicCertificate: z.string(),
    Columns: DatabaseColumnsSchema,
    Type: z.string(),
    SurrogateKeys: z.array(z.string()),
    Databases: DatabasesSchema,
    Endpoint: z.string(),
    SSLMode: z.string(),
    SnapshotWatermarkTable: z.string(),
    DatabaseSourceAuthenticationConfiguration:
      DatabaseSourceAuthenticationConfigurationSchema,
    Tables: DatabaseTablesSchema,
    DatabaseSourceVPCConfiguration: DatabaseSourceVPCConfigurationSchema,
  }).optional(),
  S3DestinationConfiguration: S3DestinationConfigurationSchema.optional(),
  DeliveryStreamName: z.string(),
  Arn: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  DeliveryStreamEncryptionConfigurationInput: z.object({
    KeyType: z.enum(["AWS_OWNED_CMK", "CUSTOMER_MANAGED_CMK"]).optional(),
    KeyARN: z.string().min(1).max(512).regex(new RegExp("arn:.*")).optional(),
  }).optional(),
  HttpEndpointDestinationConfiguration: z.object({
    RequestConfiguration: HttpEndpointRequestConfigurationSchema.optional(),
    S3Configuration: S3DestinationConfigurationSchema.optional(),
    BufferingHints: BufferingHintsSchema.optional(),
    RetryOptions: RetryOptionsSchema.optional(),
    SecretsManagerConfiguration: SecretsManagerConfigurationSchema.optional(),
    EndpointConfiguration: HttpEndpointConfigurationSchema.optional(),
    ProcessingConfiguration: ProcessingConfigurationSchema.optional(),
    RoleARN: z.string().min(1).max(512).regex(new RegExp("arn:.*")).optional(),
    CloudWatchLoggingOptions: CloudWatchLoggingOptionsSchema.optional(),
    S3BackupMode: z.string().optional(),
  }).optional(),
  KinesisStreamSourceConfiguration: z.object({
    KinesisStreamARN: z.string().min(1).max(512).regex(new RegExp("arn:.*"))
      .optional(),
    RoleARN: z.string().min(1).max(512).regex(new RegExp("arn:.*")).optional(),
  }).optional(),
  DeliveryStreamType: z.enum([
    "DatabaseAsSource",
    "DirectPut",
    "KinesisStreamAsSource",
    "MSKAsSource",
  ]).optional(),
  IcebergDestinationConfiguration: z.object({
    CatalogConfiguration: CatalogConfigurationSchema.optional(),
    S3Configuration: S3DestinationConfigurationSchema.optional(),
    DestinationTableConfigurationList: z.array(
      DestinationTableConfigurationSchema,
    ).optional(),
    BufferingHints: BufferingHintsSchema.optional(),
    TableCreationConfiguration: TableCreationConfigurationSchema.optional(),
    RetryOptions: RetryOptionsSchema.optional(),
    s3BackupMode: z.enum(["AllData", "FailedDataOnly"]).optional(),
    ProcessingConfiguration: ProcessingConfigurationSchema.optional(),
    SchemaEvolutionConfiguration: SchemaEvolutionConfigurationSchema.optional(),
    AppendOnly: z.boolean().optional(),
    CloudWatchLoggingOptions: CloudWatchLoggingOptionsSchema.optional(),
    RoleARN: z.string().min(1).max(512).regex(new RegExp("arn:.*")).optional(),
  }).optional(),
  RedshiftDestinationConfiguration: z.object({
    S3BackupConfiguration: S3DestinationConfigurationSchema.optional(),
    S3Configuration: S3DestinationConfigurationSchema.optional(),
    Username: z.string().min(1).max(512).optional(),
    CopyCommand: CopyCommandSchema.optional(),
    RetryOptions: RedshiftRetryOptionsSchema.optional(),
    SecretsManagerConfiguration: SecretsManagerConfigurationSchema.optional(),
    ProcessingConfiguration: ProcessingConfigurationSchema.optional(),
    CloudWatchLoggingOptions: CloudWatchLoggingOptionsSchema.optional(),
    ClusterJDBCURL: z.string().min(1).max(512).optional(),
    RoleARN: z.string().min(1).max(512).regex(new RegExp("arn:.*")).optional(),
    Password: z.string().min(6).max(512).optional(),
    S3BackupMode: z.enum(["Disabled", "Enabled"]).optional(),
  }).optional(),
  AmazonopensearchserviceDestinationConfiguration: z.object({
    TypeName: z.string().min(0).max(100).optional(),
    IndexRotationPeriod: z.enum([
      "NoRotation",
      "OneHour",
      "OneDay",
      "OneWeek",
      "OneMonth",
    ]).optional(),
    ProcessingConfiguration: ProcessingConfigurationSchema.optional(),
    ClusterEndpoint: z.string().min(1).max(512).regex(new RegExp("https:.*"))
      .optional(),
    DomainARN: z.string().min(1).max(512).regex(new RegExp("arn:.*"))
      .optional(),
    RoleARN: z.string().min(1).max(512).regex(new RegExp("arn:.*")).optional(),
    S3BackupMode: z.enum(["FailedDocumentsOnly", "AllDocuments"]).optional(),
    IndexName: z.string().min(1).max(80).optional(),
    DocumentIdOptions: DocumentIdOptionsSchema.optional(),
    S3Configuration: S3DestinationConfigurationSchema.optional(),
    BufferingHints: AmazonopensearchserviceBufferingHintsSchema.optional(),
    RetryOptions: AmazonopensearchserviceRetryOptionsSchema.optional(),
    VpcConfiguration: VpcConfigurationSchema.optional(),
    CloudWatchLoggingOptions: CloudWatchLoggingOptionsSchema.optional(),
  }).optional(),
  MSKSourceConfiguration: z.object({
    AuthenticationConfiguration: AuthenticationConfigurationSchema.optional(),
    ReadFromTimestamp: z.string().optional(),
    MSKClusterARN: z.string().min(1).max(512).regex(new RegExp("arn:.*"))
      .optional(),
    TopicName: z.string().min(1).max(255).regex(
      new RegExp("[a-zA-Z0-9\\._\\-]+"),
    ).optional(),
  }).optional(),
  DirectPutSourceConfiguration: z.object({
    ThroughputHintInMBs: z.number().int().min(1).max(100).optional(),
  }).optional(),
  SplunkDestinationConfiguration: z.object({
    HECEndpoint: z.string().min(0).max(2048).optional(),
    S3Configuration: S3DestinationConfigurationSchema.optional(),
    BufferingHints: SplunkBufferingHintsSchema.optional(),
    HECToken: z.string().min(0).max(2048).optional(),
    RetryOptions: SplunkRetryOptionsSchema.optional(),
    HECEndpointType: z.enum(["Raw", "Event"]).optional(),
    SecretsManagerConfiguration: SecretsManagerConfigurationSchema.optional(),
    HECAcknowledgmentTimeoutInSeconds: z.number().int().min(180).max(600)
      .optional(),
    ProcessingConfiguration: ProcessingConfigurationSchema.optional(),
    CloudWatchLoggingOptions: CloudWatchLoggingOptionsSchema.optional(),
    S3BackupMode: z.string().optional(),
  }).optional(),
  ExtendedS3DestinationConfiguration: z.object({
    ErrorOutputPrefix: z.string().min(0).max(1024).optional(),
    S3BackupConfiguration: S3DestinationConfigurationSchema.optional(),
    BucketARN: z.string().min(1).max(2048).regex(new RegExp("arn:.*"))
      .optional(),
    CompressionFormat: z.enum([
      "UNCOMPRESSED",
      "GZIP",
      "ZIP",
      "Snappy",
      "HADOOP_SNAPPY",
    ]).optional(),
    DataFormatConversionConfiguration: DataFormatConversionConfigurationSchema
      .optional(),
    EncryptionConfiguration: EncryptionConfigurationSchema.optional(),
    CustomTimeZone: z.string().min(0).max(50).optional(),
    DynamicPartitioningConfiguration: DynamicPartitioningConfigurationSchema
      .optional(),
    Prefix: z.string().min(0).max(1024).optional(),
    ProcessingConfiguration: ProcessingConfigurationSchema.optional(),
    RoleARN: z.string().min(1).max(512).regex(new RegExp("arn:.*")).optional(),
    S3BackupMode: z.enum(["Disabled", "Enabled"]).optional(),
    BufferingHints: BufferingHintsSchema.optional(),
    FileExtension: z.string().min(0).max(128).regex(
      new RegExp("^$|\\.[0-9a-z!\\-_.*'()]+"),
    ).optional(),
    CloudWatchLoggingOptions: CloudWatchLoggingOptionsSchema.optional(),
  }).optional(),
  AmazonOpenSearchServerlessDestinationConfiguration: z.object({
    IndexName: z.string().min(1).max(80).optional(),
    S3Configuration: S3DestinationConfigurationSchema.optional(),
    BufferingHints: AmazonOpenSearchServerlessBufferingHintsSchema.optional(),
    RetryOptions: AmazonOpenSearchServerlessRetryOptionsSchema.optional(),
    CollectionEndpoint: z.string().min(1).max(512).regex(new RegExp("https:.*"))
      .optional(),
    VpcConfiguration: VpcConfigurationSchema.optional(),
    ProcessingConfiguration: ProcessingConfigurationSchema.optional(),
    CloudWatchLoggingOptions: CloudWatchLoggingOptionsSchema.optional(),
    RoleARN: z.string().min(1).max(512).regex(new RegExp("arn:.*")).optional(),
    S3BackupMode: z.enum(["FailedDocumentsOnly", "AllDocuments"]).optional(),
  }).optional(),
  ElasticsearchDestinationConfiguration: z.object({
    TypeName: z.string().min(0).max(100).optional(),
    IndexRotationPeriod: z.enum([
      "NoRotation",
      "OneHour",
      "OneDay",
      "OneWeek",
      "OneMonth",
    ]).optional(),
    ProcessingConfiguration: ProcessingConfigurationSchema.optional(),
    ClusterEndpoint: z.string().min(1).max(512).regex(new RegExp("https:.*"))
      .optional(),
    DomainARN: z.string().min(1).max(512).regex(new RegExp("arn:.*"))
      .optional(),
    RoleARN: z.string().min(1).max(512).regex(new RegExp("arn:.*")).optional(),
    S3BackupMode: z.enum(["FailedDocumentsOnly", "AllDocuments"]).optional(),
    IndexName: z.string().min(1).max(80).optional(),
    DocumentIdOptions: DocumentIdOptionsSchema.optional(),
    S3Configuration: S3DestinationConfigurationSchema.optional(),
    BufferingHints: ElasticsearchBufferingHintsSchema.optional(),
    RetryOptions: ElasticsearchRetryOptionsSchema.optional(),
    VpcConfiguration: VpcConfigurationSchema.optional(),
    CloudWatchLoggingOptions: CloudWatchLoggingOptionsSchema.optional(),
  }).optional(),
  SnowflakeDestinationConfiguration: z.object({
    PrivateKey: z.string().min(256).max(4096).regex(
      new RegExp(
        "^(?:[A-Za-z0-9+\\/]{4})*(?:[A-Za-z0-9+\\/]{2}==|[A-Za-z0-9+\\/]{3}=)?$",
      ),
    ).optional(),
    User: z.string().min(1).max(255).optional(),
    Table: z.string().min(1).max(255).optional(),
    SnowflakeVpcConfiguration: SnowflakeVpcConfigurationSchema.optional(),
    DataLoadingOption: z.enum([
      "JSON_MAPPING",
      "VARIANT_CONTENT_MAPPING",
      "VARIANT_CONTENT_AND_METADATA_MAPPING",
    ]).optional(),
    Schema: z.string().min(1).max(255).optional(),
    ContentColumnName: z.string().min(1).max(255).optional(),
    SecretsManagerConfiguration: SecretsManagerConfigurationSchema.optional(),
    SnowflakeRoleConfiguration: SnowflakeRoleConfigurationSchema.optional(),
    ProcessingConfiguration: ProcessingConfigurationSchema.optional(),
    AccountUrl: z.string().min(24).max(2048).regex(
      new RegExp(".+?\\.snowflakecomputing\\.com"),
    ).optional(),
    RoleARN: z.string().min(1).max(512).regex(new RegExp("arn:.*")).optional(),
    S3BackupMode: z.enum(["FailedDataOnly", "AllData"]).optional(),
    S3Configuration: S3DestinationConfigurationSchema.optional(),
    BufferingHints: SnowflakeBufferingHintsSchema.optional(),
    MetaDataColumnName: z.string().min(1).max(255).optional(),
    Database: z.string().min(1).max(255).optional(),
    RetryOptions: SnowflakeRetryOptionsSchema.optional(),
    KeyPassphrase: z.string().min(7).max(255).optional(),
    CloudWatchLoggingOptions: CloudWatchLoggingOptionsSchema.optional(),
  }).optional(),
  DatabaseSourceConfiguration: z.object({
    Digest: z.string().min(1).max(512).regex(new RegExp(".*")).optional(),
    Port: z.number().int().min(0).max(65535).optional(),
    PublicCertificate: z.string().min(1).max(4096).regex(new RegExp(".*"))
      .optional(),
    Columns: DatabaseColumnsSchema.optional(),
    Type: z.enum(["MySQL", "PostgreSQL"]).optional(),
    SurrogateKeys: z.array(
      z.string().min(1).max(1024).regex(new RegExp("^\\S+$")),
    ).optional(),
    Databases: DatabasesSchema.optional(),
    Endpoint: z.string().min(1).max(255).regex(new RegExp("^(?!\\s*$).+"))
      .optional(),
    SSLMode: z.enum(["Disabled", "Enabled"]).optional(),
    SnapshotWatermarkTable: z.string().min(1).max(129).regex(
      new RegExp("[\\u0001-\\uFFFF]*"),
    ).optional(),
    DatabaseSourceAuthenticationConfiguration:
      DatabaseSourceAuthenticationConfigurationSchema.optional(),
    Tables: DatabaseTablesSchema.optional(),
    DatabaseSourceVPCConfiguration: DatabaseSourceVPCConfigurationSchema
      .optional(),
  }).optional(),
  S3DestinationConfiguration: z.object({
    ErrorOutputPrefix: z.string().min(0).max(1024).optional(),
    BucketARN: z.string().min(1).max(2048).regex(new RegExp("arn:.*"))
      .optional(),
    BufferingHints: BufferingHintsSchema.optional(),
    CompressionFormat: z.enum([
      "UNCOMPRESSED",
      "GZIP",
      "ZIP",
      "Snappy",
      "HADOOP_SNAPPY",
    ]).optional(),
    EncryptionConfiguration: EncryptionConfigurationSchema.optional(),
    Prefix: z.string().min(0).max(1024).optional(),
    CloudWatchLoggingOptions: CloudWatchLoggingOptionsSchema.optional(),
    RoleARN: z.string().min(1).max(512).regex(new RegExp("arn:.*")).optional(),
  }).optional(),
  DeliveryStreamName: z.string().min(1).max(64).regex(
    new RegExp("[a-zA-Z0-9._-]+"),
  ).optional(),
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

/** Swamp extension model for KinesisFirehose DeliveryStream. Registered at `@swamp/aws/kinesisfirehose/delivery-stream`. */
export const model = {
  type: "@swamp/aws/kinesisfirehose/delivery-stream",
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
      description: "KinesisFirehose DeliveryStream resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a KinesisFirehose DeliveryStream",
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
          "AWS::KinesisFirehose::DeliveryStream",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.DeliveryStreamName ?? g.DeliveryStreamName)?.toString() ??
            "current").replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(
              /\0/g,
              "",
            );
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a KinesisFirehose DeliveryStream",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the KinesisFirehose DeliveryStream",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::KinesisFirehose::DeliveryStream",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.DeliveryStreamName ?? context.globalArgs.DeliveryStreamName)
            ?.toString() ?? args.identifier).replace(/[\/\\]/g, "_").replace(
              /\.\./g,
              "_",
            ).replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a KinesisFirehose DeliveryStream",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.DeliveryStreamName?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.DeliveryStreamName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::KinesisFirehose::DeliveryStream",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::KinesisFirehose::DeliveryStream",
          identifier,
          currentState,
          desiredState,
          [
            "DeliveryStreamName",
            "DeliveryStreamType",
            "VpcConfiguration",
            "VpcConfiguration",
            "VpcConfiguration",
            "DatabaseSourceConfiguration",
            "KinesisStreamSourceConfiguration",
            "DirectPutSourceConfiguration",
            "MSKSourceConfiguration",
            "CatalogConfiguration",
            "SnowflakeVpcConfiguration",
          ],
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
      description: "Delete a KinesisFirehose DeliveryStream",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the KinesisFirehose DeliveryStream",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::KinesisFirehose::DeliveryStream",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.DeliveryStreamName?.toString() ?? args.identifier)
            .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
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
      description: "Sync KinesisFirehose DeliveryStream state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.DeliveryStreamName?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.DeliveryStreamName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::KinesisFirehose::DeliveryStream",
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
