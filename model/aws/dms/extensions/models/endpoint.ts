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

// Auto-generated extension model for @swamp/aws/dms/endpoint
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for DMS Endpoint (AWS::DMS::Endpoint).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, sync, and list can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
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
  Key: z.string().describe("A key is the required name of the tag."),
  Value: z.string().describe("A value is the optional value of the tag."),
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
  CertificateArn: z.string().describe(
    "The Amazon Resource Name (ARN) for the certificate.",
  ).optional(),
  DatabaseName: z.string().describe(
    "The name of the endpoint database. For a MySQL source or target endpoint, don't specify DatabaseName. To migrate to a specific database, use this setting and targetDbType.",
  ).optional(),
  DocDbSettings: z.object({
    DocsToInvestigate: z.number().int().describe(
      'Indicates the number of documents to preview to determine the document organization. Use this setting when NestingLevel is set to "one".',
    ).optional(),
    ExtractDocId: z.boolean().describe(
      'Specifies the document ID. Use this setting when NestingLevel is set to "none"',
    ).optional(),
    NestingLevel: z.string().describe(
      "Specifies either document or table mode.",
    ).optional(),
    SecretsManagerAccessRoleArn: z.string().describe(
      "The full Amazon Resource Name (ARN) of the IAM role that specifies AWS DMS as the trusted entity and grants the required permissions to access the value in SecretsManagerSecret. The role must allow the iam:PassRole action. SecretsManagerSecret has the value of the AWS Secrets Manager secret that allows access to the DocumentDB endpoint.",
    ).optional(),
    SecretsManagerSecretId: z.string().describe(
      "The full Amazon Resource Name (ARN) of the IAM role that specifies AWS DMS as the trusted entity and grants the required permissions to access the value in SecretsManagerSecret. The role must allow the iam:PassRole action. SecretsManagerSecret has the value of the AWS Secrets Manager secret that allows access to the DocumentDB endpoint.",
    ).optional(),
  }).describe(
    "Settings in JSON format for the source and target DocumentDB endpoint",
  ).optional(),
  DynamoDbSettings: z.object({
    ServiceAccessRoleArn: z.string().describe(
      "The Amazon Resource Name (ARN) used by the service to access the IAM role. The role must allow the iam:PassRole action.",
    ).optional(),
  }).describe("Settings in JSON format for the target Amazon DynamoDB endpoint")
    .optional(),
  ElasticsearchSettings: z.object({
    EndpointUri: z.string().describe(
      "The endpoint for the OpenSearch cluster. AWS DMS uses HTTPS if a transport protocol (either HTTP or HTTPS) isn't specified.",
    ).optional(),
    ErrorRetryDuration: z.number().int().describe(
      "The maximum number of seconds for which DMS retries failed API requests to the OpenSearch cluster.",
    ).optional(),
    FullLoadErrorPercentage: z.number().int().describe(
      "The maximum percentage of records that can fail to be written before a full load operation stops.",
    ).optional(),
    ServiceAccessRoleArn: z.string().describe(
      "The Amazon Resource Name (ARN) used by the service to access the IAM role. The role must allow the iam:PassRole action.",
    ).optional(),
  }).describe("Settings in JSON format for the target OpenSearch endpoint")
    .optional(),
  EndpointIdentifier: z.string().describe(
    "The database endpoint identifier. Identifiers must begin with a letter and must contain only ASCII letters, digits, and hyphens. They can't end with a hyphen, or contain two consecutive hyphens.",
  ).optional(),
  EndpointType: z.string().describe(
    "The type of endpoint. Valid values are source and target.",
  ),
  EngineName: z.string().describe(
    "The type of engine for the endpoint, depending on the EndpointType value.",
  ),
  ExtraConnectionAttributes: z.string().describe(
    "Additional attributes associated with the connection",
  ).optional(),
  GcpMySQLSettings: z.object({
    AfterConnectScript: z.string().describe(
      "Specifies a script to run immediately after AWS DMS connects to the endpoint. The migration task continues running regardless if the SQL statement succeeds or fails.",
    ).optional(),
    CleanSourceMetadataOnMismatch: z.boolean().describe(
      "Adjusts the behavior of AWS DMS when migrating from an SQL Server source database that is hosted as part of an Always On availability group cluster. If you need AWS DMS to poll all the nodes in the Always On cluster for transaction backups, set this attribute to false.",
    ).optional(),
    DatabaseName: z.string().describe(
      "Database name for the endpoint. For a MySQL source or target endpoint, don't explicitly specify the database using the DatabaseName request parameter on either the CreateEndpoint or ModifyEndpoint API call. Specifying DatabaseName when you create or modify a MySQL endpoint replicates all the task tables to this single database. For MySQL endpoints, you specify the database only when you specify the schema in the table-mapping rules of the AWS DMS task.",
    ).optional(),
    EventsPollInterval: z.number().int().describe(
      "Specifies how often to check the binary log for new changes/events when the database is idle. The default is five seconds.",
    ).optional(),
    MaxFileSize: z.number().int().describe(
      "Specifies the maximum size (in KB) of any.csv file used to transfer data to a MySQL-compatible database.",
    ).optional(),
    ParallelLoadThreads: z.number().int().describe(
      "Improves performance when loading data into the MySQL-compatible target database. Specifies how many threads to use to load the data into the MySQL-compatible target database. Setting a large number of threads can have an adverse effect on database performance, because a separate connection is required for each thread. The default is one.",
    ).optional(),
    Password: z.string().describe("Endpoint connection password.").optional(),
    Port: z.number().int().describe("The port used by the endpoint database.")
      .optional(),
    SecretsManagerAccessRoleArn: z.string().describe(
      "The full Amazon Resource Name (ARN) of the IAM role that specifies AWS DMS as the trusted entity and grants the required permissions to access the value in SecretsManagerSecret. The role must allow the iam:PassRole action. SecretsManagerSecret has the value of the AWS Secrets Manager secret that allows access to the MySQL endpoint.",
    ).optional(),
    SecretsManagerSecretId: z.string().describe(
      "The full ARN, partial ARN, or display name of the SecretsManagerSecret that contains the MySQL endpoint connection details.",
    ).optional(),
    ServerName: z.string().describe("The MySQL host name.").optional(),
    ServerTimezone: z.string().describe(
      "Specifies the time zone for the source MySQL database. Don't enclose time zones in single quotation marks.",
    ).optional(),
    Username: z.string().describe(
      "Specifies the time zone for the source MySQL database. Don't enclose time zones in single quotation marks.",
    ).optional(),
  }).describe("Settings in JSON format for the source GCP MySQL endpoint")
    .optional(),
  IbmDb2Settings: z.object({
    CurrentLsn: z.string().describe(
      "For ongoing replication (CDC), use CurrentLSN to specify a log sequence number (LSN) where you want the replication to start.",
    ).optional(),
    KeepCsvFiles: z.boolean().describe(
      "If true, AWS DMS saves any.csv files to the Db2 LUW target that were used to replicate data. DMS uses these files for analysis and troubleshooting.",
    ).optional(),
    LoadTimeout: z.number().int().describe(
      "The amount of time (in milliseconds) before AWS DMS times out operations performed by DMS on the Db2 target. The default value is 1200 (20 minutes).",
    ).optional(),
    MaxFileSize: z.number().int().describe(
      "Specifies the maximum size (in KB) of.csv files used to transfer data to Db2 LUW.",
    ).optional(),
    MaxKBytesPerRead: z.number().int().describe(
      "Maximum number of bytes per read, as a NUMBER value. The default is 64 KB.",
    ).optional(),
    SecretsManagerAccessRoleArn: z.string().describe(
      "The full Amazon Resource Name (ARN) of the IAM role that specifies AWS DMS as the trusted entity and grants the required permissions to access the value in SecretsManagerSecret. The role must allow the iam:PassRole action. SecretsManagerSecret has the value ofthe AWS Secrets Manager secret that allows access to the Db2 LUW endpoint.",
    ).optional(),
    SecretsManagerSecretId: z.string().describe(
      "The full ARN, partial ARN, or display name of the SecretsManagerSecret that contains the IBMDB2 endpoint connection details.",
    ).optional(),
    SetDataCaptureChanges: z.boolean().describe(
      "Enables ongoing replication (CDC) as a BOOLEAN value. The default is true.",
    ).optional(),
    WriteBufferSize: z.number().int().describe(
      "The size (in KB) of the in-memory file write buffer used when generating.csv files on the local disk on the DMS replication instance. The default value is 1024 (1 MB).",
    ).optional(),
  }).describe("Settings in JSON format for the source IBM Db2 LUW endpoint")
    .optional(),
  KafkaSettings: z.object({
    Broker: z.string().describe(
      "A comma-separated list of one or more broker locations in your Kafka cluster that host your Kafka instance. Specify each broker location in the form broker-hostname-or-ip:port",
    ).optional(),
    IncludeControlDetails: z.boolean().describe(
      "Shows detailed control information for table definition, column definition, and table and column changes in the Kafka message output. The default is false.",
    ).optional(),
    IncludeNullAndEmpty: z.boolean().describe(
      "Include NULL and empty columns for records migrated to the endpoint. The default is false.",
    ).optional(),
    IncludePartitionValue: z.boolean().describe(
      "Shows the partition value within the Kafka message output unless the partition type is schema-table-type. The default is false.",
    ).optional(),
    IncludeTableAlterOperations: z.boolean().describe(
      "Includes any data definition language (DDL) operations that change the table in the control data, such as rename-table, drop-table, add-column, drop-column, and rename-column. The default is false.",
    ).optional(),
    IncludeTransactionDetails: z.boolean().describe(
      "Provides detailed transaction information from the source database. This information includes a commit timestamp, a log position, and values for transaction_id, previous transaction_id, and transaction_record_id (the record offset within a transaction). The default is false.",
    ).optional(),
    MessageFormat: z.string().describe(
      "The output format for the records created on the endpoint. The message format is JSON (default) or JSON_UNFORMATTED (a single line with no tab).",
    ).optional(),
    MessageMaxBytes: z.number().int().describe(
      "The maximum size in bytes for records created on the endpoint The default is 1,000,000.",
    ).optional(),
    NoHexPrefix: z.boolean().describe(
      "Set this optional parameter to true to avoid adding a '0x' prefix to raw data in hexadecimal format. For example, by default, AWS DMS adds a '0x' prefix to the LOB column type in hexadecimal format moving from an Oracle source to a Kafka target. Use the NoHexPrefix endpoint setting to enable migration of RAW data type columns without adding the '0x' prefix.",
    ).optional(),
    PartitionIncludeSchemaTable: z.boolean().describe(
      "Prefixes schema and table names to partition values, when the partition type is primary-key-type.",
    ).optional(),
    SaslPassword: z.string().describe(
      "The secure password that you created when you first set up your Amazon MSK cluster to validate a client identity and make an encrypted connection between server and client using SASL-SSL authentication.",
    ).optional(),
    SaslUserName: z.string().describe(
      "The secure user name you created when you first set up your Amazon MSK cluster to validate a client identity and make an encrypted connection between server and client using SASL-SSL authentication.",
    ).optional(),
    SecurityProtocol: z.string().describe(
      "Set secure connection to a Kafka target endpoint using Transport Layer Security (TLS). Options include ssl-encryption, ssl-authentication, and sasl-ssl. sasl-ssl requires SaslUsername and SaslPassword.",
    ).optional(),
    SslCaCertificateArn: z.string().describe(
      "The Amazon Resource Name (ARN) for the private certificate authority (CA) cert that AWS DMS uses to securely connect to your Kafka target endpoint.",
    ).optional(),
    SslClientCertificateArn: z.string().describe(
      "The Amazon Resource Name (ARN) of the client certificate used to securely connect to a Kafka target endpoint.",
    ).optional(),
    SslClientKeyArn: z.string().describe(
      "The Amazon Resource Name (ARN) for the client private key used to securely connect to a Kafka target endpoint.",
    ).optional(),
    SslClientKeyPassword: z.string().describe(
      "The password for the client private key used to securely connect to a Kafka target endpoint.",
    ).optional(),
    Topic: z.string().describe(
      'The topic to which you migrate the data. If you don\'t specify a topic, AWS DMS specifies "kafka-default-topic" as the migration topic.',
    ).optional(),
  }).describe("Settings in JSON format for the target Apache Kafka endpoint")
    .optional(),
  KinesisSettings: z.object({
    IncludeControlDetails: z.boolean().describe(
      "Shows detailed control information for table definition, column definition, and table and column changes in the Kinesis message output. The default is false.",
    ).optional(),
    IncludeNullAndEmpty: z.boolean().describe(
      "Include NULL and empty columns for records migrated to the endpoint. The default is false.",
    ).optional(),
    IncludePartitionValue: z.boolean().describe(
      "Shows the partition value within the Kinesis message output, unless the partition type is schema-table-type. The default is false.",
    ).optional(),
    IncludeTableAlterOperations: z.boolean().describe(
      "Includes any data definition language (DDL) operations that change the table in the control data, such as rename-table, drop-table, add-column, drop-column, and rename-column. The default is false.",
    ).optional(),
    IncludeTransactionDetails: z.boolean().describe(
      "Provides detailed transaction information from the source database.",
    ).optional(),
    MessageFormat: z.string().describe(
      "The output format for the records created on the endpoint. The message format is JSON (default) or JSON_UNFORMATTED (a single line with no tab).",
    ).optional(),
    NoHexPrefix: z.boolean().describe(
      "Set this optional parameter to true to avoid adding a '0x' prefix to raw data in hexadecimal format.",
    ).optional(),
    PartitionIncludeSchemaTable: z.boolean().describe(
      "Prefixes schema and table names to partition values, when the partition type is primary-key-type.",
    ).optional(),
    ServiceAccessRoleArn: z.string().describe(
      "The Amazon Resource Name (ARN) for the IAM role that AWS DMS uses to write to the Kinesis data stream. The role must allow the iam:PassRole action.",
    ).optional(),
    StreamArn: z.string().describe(
      "The Amazon Resource Name (ARN) for the Amazon Kinesis Data Streams endpoint.",
    ).optional(),
  }).describe(
    "Settings in JSON format for the target endpoint for Amazon Kinesis Data Streams",
  ).optional(),
  KmsKeyId: z.string().describe(
    "An AWS KMS key identifier that is used to encrypt the connection parameters for the endpoint.If you don't specify a value for the KmsKeyId parameter, AWS DMS uses your default encryption key.",
  ).optional(),
  MicrosoftSqlServerSettings: z.object({
    BcpPacketSize: z.number().int().describe(
      "The maximum size of the packets (in bytes) used to transfer data using BCP.",
    ).optional(),
    ControlTablesFileGroup: z.string().describe(
      "Specifies a file group for the AWS DMS internal tables.",
    ).optional(),
    DatabaseName: z.string().describe("Database name for the endpoint.")
      .optional(),
    ForceLobLookup: z.boolean().describe("Forces LOB lookup on inline LOB.")
      .optional(),
    Password: z.string().describe("Endpoint connection password.").optional(),
    Port: z.number().int().describe("Endpoint TCP port.").optional(),
    QuerySingleAlwaysOnNode: z.boolean().describe(
      "Cleans and recreates table metadata information on the replication instance when a mismatch occurs. An example is a situation where running an alter DDL statement on a table might result in different information about the table cached in the replication instance.",
    ).optional(),
    ReadBackupOnly: z.boolean().describe(
      "When this attribute is set to Y, AWS DMS only reads changes from transaction log backups and doesn't read from the active transaction log file during ongoing replication. Setting this parameter to Y enables you to control active transaction log file growth during full load and ongoing replication tasks. However, it can add some source latency to ongoing replication.",
    ).optional(),
    SafeguardPolicy: z.string().describe(
      "Use this attribute to minimize the need to access the backup log and enable AWS DMS to prevent truncation using one of the following two methods.",
    ).optional(),
    SecretsManagerAccessRoleArn: z.string().describe(
      "The full Amazon Resource Name (ARN) of the IAM role that specifies AWS DMS as the trusted entity and grants the required permissions to access the value in SecretsManagerSecret",
    ).optional(),
    SecretsManagerSecretId: z.string().describe(
      "The full ARN, partial ARN, or display name of the SecretsManagerSecret that contains the MicrosoftSQLServer endpoint connection details.",
    ).optional(),
    ServerName: z.string().describe(
      "Fully qualified domain name of the endpoint. For an Amazon RDS SQL Server instance, this is the output of DescribeDBInstances, in the Endpoint.Address field.",
    ).optional(),
    TlogAccessMode: z.string().describe(
      "Indicates the mode used to fetch CDC data.",
    ).optional(),
    TrimSpaceInChar: z.boolean().describe(
      "Use the TrimSpaceInChar source endpoint setting to right-trim data on CHAR and NCHAR data types during migration. Setting TrimSpaceInChar does not left-trim data. The default value is true.",
    ).optional(),
    UseBcpFullLoad: z.boolean().describe(
      "Use this to attribute to transfer data for full-load operations using BCP. When the target table contains an identity column that does not exist in the source table, you must disable the use BCP for loading table option.",
    ).optional(),
    UseThirdPartyBackupDevice: z.boolean().describe(
      "When this attribute is set to Y, DMS processes third-party transaction log backups if they are created in native format.",
    ).optional(),
    Username: z.string().describe("Endpoint connection user name.").optional(),
  }).describe(
    "Settings in JSON format for the source and target Microsoft SQL Server endpoint",
  ).optional(),
  MongoDbSettings: z.object({
    AuthMechanism: z.string().describe(
      "The authentication mechanism you use to access the MongoDB source endpoint.",
    ).optional(),
    AuthSource: z.string().describe(
      'The MongoDB database name. This setting isn\'t used when AuthType is set to "no".',
    ).optional(),
    AuthType: z.string().describe(
      "The authentication type you use to access the MongoDB source endpoint.",
    ).optional(),
    DatabaseName: z.string().describe(
      "The database name on the MongoDB source endpoint.",
    ).optional(),
    DocsToInvestigate: z.string().describe(
      'Indicates the number of documents to preview to determine the document organization. Use this setting when NestingLevel is set to "one".',
    ).optional(),
    ExtractDocId: z.string().describe(
      'Specifies the document ID. Use this setting when NestingLevel is set to "none".',
    ).optional(),
    NestingLevel: z.string().describe(
      "Specifies either document or table mode.",
    ).optional(),
    Password: z.string().describe(
      "The password for the user account you use to access the MongoDB source endpoint.",
    ).optional(),
    Port: z.number().int().describe(
      "The port value for the MongoDB source endpoint.",
    ).optional(),
    SecretsManagerAccessRoleArn: z.string().describe(
      "The full Amazon Resource Name (ARN) of the IAM role that specifies AWS DMS as the trusted entity and grants the required permissions to access the value in SecretsManagerSecret",
    ).optional(),
    SecretsManagerSecretId: z.string().describe(
      "The full ARN, partial ARN, or display name of the SecretsManagerSecret that contains the MongoDB endpoint connection details.",
    ).optional(),
    ServerName: z.string().describe(
      "The name of the server on the MongoDB source endpoint.",
    ).optional(),
    Username: z.string().describe(
      "The user name you use to access the MongoDB source endpoint.",
    ).optional(),
  }).describe("Settings in JSON format for the source MongoDB endpoint")
    .optional(),
  MySqlSettings: z.object({
    AfterConnectScript: z.string().describe(
      "Specifies a script to run immediately after AWS DMS connects to the endpoint. The migration task continues running regardless if the SQL statement succeeds or fails.",
    ).optional(),
    CleanSourceMetadataOnMismatch: z.boolean().describe(
      "Cleans and recreates table metadata information on the replication instance when a mismatch occurs.",
    ).optional(),
    EventsPollInterval: z.number().int().describe(
      "Specifies how often to check the binary log for new changes/events when the database is idle. The default is five seconds.",
    ).optional(),
    MaxFileSize: z.number().int().describe(
      "Specifies the maximum size (in KB) of any.csv file used to transfer data to a MySQL-compatible database.",
    ).optional(),
    ParallelLoadThreads: z.number().int().describe(
      "Improves performance when loading data into the MySQL-compatible target database. Specifies how many threads to use to load the data into the MySQL-compatible target database.",
    ).optional(),
    SecretsManagerAccessRoleArn: z.string().describe(
      "The full Amazon Resource Name (ARN) of the IAM role that specifies AWS DMS as the trusted entity and grants the required permissions to access the value in SecretsManagerSecret.",
    ).optional(),
    SecretsManagerSecretId: z.string().describe(
      "The full ARN, partial ARN, or display name of the SecretsManagerSecret that contains the MySQL endpoint connection details.",
    ).optional(),
    ServerTimezone: z.string().describe(
      "Specifies the time zone for the source MySQL database.",
    ).optional(),
    TargetDbType: z.string().describe(
      "Specifies where to migrate source tables on the target, either to a single database or multiple databases.",
    ).optional(),
  }).describe("Settings in JSON format for the source and target MySQL endpoin")
    .optional(),
  NeptuneSettings: z.object({
    ErrorRetryDuration: z.number().int().describe(
      "The number of milliseconds for AWS DMS to wait to retry a bulk-load of migrated graph data to the Neptune target database before raising an error. The default is 250.",
    ).optional(),
    IamAuthEnabled: z.boolean().describe(
      "If you want IAM authorization enabled for this endpoint, set this parameter to true.",
    ).optional(),
    MaxFileSize: z.number().int().describe(
      "The maximum size in kilobytes of migrated graph data stored in a.csv file before AWS DMS bulk-loads the data to the Neptune target database.",
    ).optional(),
    MaxRetryCount: z.number().int().describe(
      "The number of times for AWS DMS to retry a bulk load of migrated graph data to the Neptune target database before raising an error. The default is 5.",
    ).optional(),
    S3BucketFolder: z.string().describe(
      "A folder path where you want AWS DMS to store migrated graph data in the S3 bucket specified by S3BucketName",
    ).optional(),
    S3BucketName: z.string().describe(
      "The name of the Amazon S3 bucket where AWS DMS can temporarily store migrated graph data in.csv files before bulk-loading it to the Neptune target database.",
    ).optional(),
    ServiceAccessRoleArn: z.string().describe(
      "The Amazon Resource Name (ARN) of the service role that you created for the Neptune target endpoint. The role must allow the iam:PassRole action.",
    ).optional(),
  }).describe("Settings in JSON format for the target Amazon Neptune endpoint")
    .optional(),
  OracleSettings: z.object({
    AccessAlternateDirectly: z.boolean().describe(
      "Set this attribute to false in order to use the Binary Reader to capture change data for an Amazon RDS for Oracle as the source.",
    ).optional(),
    AddSupplementalLogging: z.boolean().describe(
      "Set this attribute to set up table-level supplemental logging for the Oracle database. This attribute enables PRIMARY KEY supplemental logging on all tables selected for a migration task.",
    ).optional(),
    AdditionalArchivedLogDestId: z.number().int().describe(
      "Set this attribute with ArchivedLogDestId in a primary/ standby setup",
    ).optional(),
    AllowSelectNestedTables: z.boolean().describe(
      "Set this attribute to true to enable replication of Oracle tables containing columns that are nested tables or defined types.",
    ).optional(),
    ArchivedLogDestId: z.number().int().describe(
      "Specifies the ID of the destination for the archived redo logs.",
    ).optional(),
    ArchivedLogsOnly: z.boolean().describe(
      "When this field is set to True, AWS DMS only accesses the archived redo logs",
    ).optional(),
    AsmPassword: z.string().describe(
      "For an Oracle source endpoint, your Oracle Automatic Storage Management (ASM) password.",
    ).optional(),
    AsmServer: z.string().describe(
      "For an Oracle source endpoint, your ASM server address.",
    ).optional(),
    AsmUser: z.string().describe(
      "For an Oracle source endpoint, your ASM user name.",
    ).optional(),
    CharLengthSemantics: z.string().describe(
      "Specifies whether the length of a character column is in bytes or in characters.",
    ).optional(),
    DirectPathNoLog: z.boolean().describe(
      "When set to true, this attribute helps to increase the commit rate on the Oracle target database by writing directly to tables and not writing a trail to database logs.",
    ).optional(),
    DirectPathParallelLoad: z.boolean().describe(
      "When set to true, this attribute specifies a parallel load when useDirectPathFullLoad is set to Y.",
    ).optional(),
    EnableHomogenousTablespace: z.boolean().describe(
      "Set this attribute to enable homogenous tablespace replication and create existing tables or indexes under the same tablespace on the target.",
    ).optional(),
    ExtraArchivedLogDestIds: z.array(z.number().int()).describe(
      "Specifies the IDs of one more destinations for one or more archived redo logs.",
    ).optional(),
    FailTasksOnLobTruncation: z.boolean().describe(
      "When set to true, this attribute causes a task to fail if the actual size of an LOB column is greater than the specified LobMaxSize.",
    ).optional(),
    NumberDatatypeScale: z.number().int().describe(
      "Specifies the number scale. You can select a scale up to 38, or you can select FLOAT. By default, the NUMBER data type is converted to precision 38, scale 10.",
    ).optional(),
    OraclePathPrefix: z.string().describe(
      "Set this string attribute to the required value in order to use the Binary Reader to capture change data for an Amazon RDS for Oracle as the source.",
    ).optional(),
    ParallelAsmReadThreads: z.number().int().describe(
      "Set this attribute to change the number of threads that DMS configures to perform a change data capture (CDC) load using Oracle Automatic Storage Management (ASM).",
    ).optional(),
    ReadAheadBlocks: z.number().int().describe(
      "Set this attribute to change the number of read-ahead blocks that DMS configures to perform a change data capture (CDC) load using Oracle Automatic Storage Management (ASM).",
    ).optional(),
    ReadTableSpaceName: z.boolean().describe(
      "When set to true, this attribute supports tablespace replication.",
    ).optional(),
    ReplacePathPrefix: z.boolean().describe(
      "Set this attribute to true in order to use the Binary Reader to capture change data for an Amazon RDS for Oracle as the source.",
    ).optional(),
    RetryInterval: z.number().int().describe(
      "Specifies the number of seconds that the system waits before resending a query.",
    ).optional(),
    SecretsManagerAccessRoleArn: z.string().describe(
      "The full Amazon Resource Name (ARN) of the IAM role that specifies AWS DMS as the trusted entity and grants the required permissions to access the value in SecretsManagerSecret.",
    ).optional(),
    SecretsManagerOracleAsmAccessRoleArn: z.string().describe(
      "Required only if your Oracle endpoint uses Advanced Storage Manager (ASM).",
    ).optional(),
    SecretsManagerOracleAsmSecretId: z.string().describe(
      "Required only if your Oracle endpoint uses Advanced Storage Manager (ASM).",
    ).optional(),
    SecretsManagerSecretId: z.string().describe(
      "The full ARN, partial ARN, or display name of the SecretsManagerSecret that contains the Oracle endpoint connection details.",
    ).optional(),
    SecurityDbEncryption: z.string().describe(
      "For an Oracle source endpoint, the transparent data encryption (TDE) password required by AWM DMS to access Oracle redo logs encrypted by TDE using Binary Reader.",
    ).optional(),
    SecurityDbEncryptionName: z.string().describe(
      "For an Oracle source endpoint, the name of a key used for the transparent data encryption (TDE) of the columns and tablespaces in an Oracle source database that is encrypted using TDE.",
    ).optional(),
    SpatialDataOptionToGeoJsonFunctionName: z.string().describe(
      "Use this attribute to convert SDO_GEOMETRY to GEOJSON format. By default, DMS calls the SDO2GEOJSON custom function if present and accessible. Or you can create your own custom function that mimics the operation of SDOGEOJSON and set SpatialDataOptionToGeoJsonFunctionName to call it instead.",
    ).optional(),
    StandbyDelayTime: z.number().int().describe(
      "Use this attribute to specify a time in minutes for the delay in standby sync.",
    ).optional(),
    UseAlternateFolderForOnline: z.boolean().describe(
      "Set this attribute to true in order to use the Binary Reader to capture change data for an Amazon RDS for Oracle as the source",
    ).optional(),
    UseBFile: z.boolean().describe(
      "Set this attribute to True to capture change data using the Binary Reader utility.",
    ).optional(),
    UseDirectPathFullLoad: z.boolean().describe(
      "Set this attribute to True to have AWS DMS use a direct path full load.",
    ).optional(),
    UseLogminerReader: z.boolean().describe(
      "Set this attribute to True to capture change data using the Oracle LogMiner utility (the default).",
    ).optional(),
    UsePathPrefix: z.string().describe(
      "Set this string attribute to the required value in order to use the Binary Reader to capture change data for an Amazon RDS for Oracle as the source.",
    ).optional(),
  }).describe(
    "Settings in JSON format for the source and target Oracle endpoint",
  ).optional(),
  Password: z.string().describe(
    "The password to be used to log in to the endpoint database.",
  ).optional(),
  Port: z.number().int().describe("The port used by the endpoint database.")
    .optional(),
  PostgreSqlSettings: z.object({
    AfterConnectScript: z.string().describe(
      "For use with change data capture (CDC) only, this attribute has AWS DMS bypass foreign keys and user triggers to reduce the time it takes to bulk load data.",
    ).optional(),
    BabelfishDatabaseName: z.string().describe(
      "The Babelfish for Aurora PostgreSQL database name for the endpoint.",
    ).optional(),
    CaptureDdls: z.boolean().describe(
      "To capture DDL events, AWS DMS creates various artifacts in the PostgreSQL database when the task starts. You can later remove these artifacts.",
    ).optional(),
    DatabaseMode: z.string().describe(
      "Specifies the default behavior of the replication's handling of PostgreSQL- compatible endpoints that require some additional configuration, such as Babelfish endpoints.",
    ).optional(),
    DdlArtifactsSchema: z.string().describe(
      "The schema in which the operational DDL database artifacts are created.",
    ).optional(),
    ExecuteTimeout: z.number().int().describe(
      "Sets the client statement timeout for the PostgreSQL instance, in seconds. The default value is 60 seconds.",
    ).optional(),
    FailTasksOnLobTruncation: z.boolean().describe(
      "When set to true, this value causes a task to fail if the actual size of a LOB column is greater than the specified LobMaxSize.",
    ).optional(),
    HeartbeatEnable: z.boolean().describe(
      "The write-ahead log (WAL) heartbeat feature mimics a dummy transaction.",
    ).optional(),
    HeartbeatFrequency: z.number().int().describe(
      "Sets the WAL heartbeat frequency (in minutes).",
    ).optional(),
    HeartbeatSchema: z.string().describe(
      "Sets the schema in which the heartbeat artifacts are created.",
    ).optional(),
    MapBooleanAsBoolean: z.boolean().describe(
      "When true, lets PostgreSQL migrate the boolean type as boolean.",
    ).optional(),
    MaxFileSize: z.number().int().describe(
      "Specifies the maximum size (in KB) of any.csv file used to transfer data to PostgreSQL.",
    ).optional(),
    PluginName: z.string().describe(
      "Specifies the plugin to use to create a replication slot.",
    ).optional(),
    SecretsManagerAccessRoleArn: z.string().describe(
      "The full Amazon Resource Name (ARN) of the IAM role that specifies AWS DMS as the trusted entity and grants the required permissions to access the value in SecretsManagerSecret.",
    ).optional(),
    SecretsManagerSecretId: z.string().describe(
      "The full ARN, partial ARN, or display name of the SecretsManagerSecret that contains the PostgreSQL endpoint connection details.",
    ).optional(),
    SlotName: z.string().describe(
      "Sets the name of a previously created logical replication slot for a change data capture (CDC) load of the PostgreSQL source instance.",
    ).optional(),
  }).describe(
    "Settings in JSON format for the source and target PostgreSQL endpoint.",
  ).optional(),
  RedisSettings: z.object({
    AuthPassword: z.string().describe(
      "The password provided with the auth-role and auth-token options of the AuthType setting for a Redis target endpoint.",
    ).optional(),
    AuthType: z.string().describe(
      "The type of authentication to perform when connecting to a Redis target.",
    ).optional(),
    AuthUserName: z.string().describe(
      "The user name provided with the auth-role option of the AuthType setting for a Redis target endpoint.",
    ).optional(),
    Port: z.number().describe(
      "Transmission Control Protocol (TCP) port for the endpoint.",
    ).optional(),
    ServerName: z.string().describe(
      "Fully qualified domain name of the endpoint.",
    ).optional(),
    SslCaCertificateArn: z.string().describe(
      "The Amazon Resource Name (ARN) for the certificate authority (CA) that DMS uses to connect to your Redis target endpoint.",
    ).optional(),
    SslSecurityProtocol: z.string().describe(
      "The connection to a Redis target endpoint using Transport Layer Security (TLS). Valid values include plaintext and ssl-encryption.",
    ).optional(),
  }).describe("Settings in JSON format for the target Redis endpoint")
    .optional(),
  RedshiftSettings: z.object({
    AcceptAnyDate: z.boolean().describe(
      "A value that indicates to allow any date format, including invalid formats such as 00/00/00 00:00:00, to be loaded without generating an error. You can choose true or false (the default).",
    ).optional(),
    AfterConnectScript: z.string().describe(
      "Code to run after connecting. This parameter should contain the code itself, not the name of a file containing the code.",
    ).optional(),
    BucketFolder: z.string().describe(
      "An S3 folder where the comma-separated-value (.csv) files are stored before being uploaded to the target Redshift cluster.",
    ).optional(),
    BucketName: z.string().describe(
      "The name of the intermediate S3 bucket used to store.csv files before uploading data to Redshift.",
    ).optional(),
    CaseSensitiveNames: z.boolean().describe(
      "If Amazon Redshift is configured to support case sensitive schema names, set CaseSensitiveNames to true. The default is false.",
    ).optional(),
    CompUpdate: z.boolean().describe(
      "If you set CompUpdate to true Amazon Redshift applies automatic compression if the table is empty.",
    ).optional(),
    ConnectionTimeout: z.number().int().describe(
      "A value that sets the amount of time to wait (in milliseconds) before timing out, beginning from when you initially establish a connection.",
    ).optional(),
    DateFormat: z.string().describe("The date format that you are using.")
      .optional(),
    EmptyAsNull: z.boolean().describe(
      "A value that specifies whether AWS DMS should migrate empty CHAR and VARCHAR fields as NULL. A value of true sets empty CHAR and VARCHAR fields to null. The default is false.",
    ).optional(),
    EncryptionMode: z.string().describe(
      "The type of server-side encryption that you want to use for your data.",
    ).optional(),
    ExplicitIds: z.boolean().describe(
      "This setting is only valid for a full-load migration task. Set ExplicitIds to true to have tables with IDENTITY columns override their auto-generated values with explicit values loaded from the source data files used to populate the tables. The default is false.",
    ).optional(),
    FileTransferUploadStreams: z.number().int().describe(
      "The number of threads used to upload a single file. This parameter accepts a value from 1 through 64. It defaults to 10.",
    ).optional(),
    LoadTimeout: z.number().int().describe(
      "The amount of time to wait (in milliseconds) before timing out of operations performed by AWS DMS on a Redshift cluster, such as Redshift COPY, INSERT, DELETE, and UPDATE.",
    ).optional(),
    MapBooleanAsBoolean: z.boolean().describe(
      "When true, lets Redshift migrate the boolean type as boolean. By default, Redshift migrates booleans as varchar(1). You must set this setting on both the source and target endpoints for it to take effect.",
    ).optional(),
    MaxFileSize: z.number().int().describe(
      "The maximum size (in KB) of any.csv file used to load data on an S3 bucket and transfer data to Amazon Redshift. It defaults to 1048576KB (1 GB).",
    ).optional(),
    RemoveQuotes: z.boolean().describe(
      "A value that specifies to remove surrounding quotation marks from strings in the incoming data.",
    ).optional(),
    ReplaceChars: z.string().describe(
      'A value that specifies to replaces the invalid characters specified in ReplaceInvalidChars, substituting the specified characters instead. The default is "?".',
    ).optional(),
    ReplaceInvalidChars: z.string().describe(
      "A list of characters that you want to replace. Use with ReplaceChars.",
    ).optional(),
    SecretsManagerAccessRoleArn: z.string().describe(
      "The full Amazon Resource Name (ARN) of the IAM role that specifies AWS DMS as the trusted entity and grants the required permissions to access the value in SecretsManagerSecret.",
    ).optional(),
    SecretsManagerSecretId: z.string().describe(
      "The full ARN, partial ARN, or display name of the SecretsManagerSecret that contains the Amazon Redshift endpoint connection details.",
    ).optional(),
    ServerSideEncryptionKmsKeyId: z.string().describe(
      "The AWS KMS key ID. If you are using SSE_KMS for the EncryptionMode, provide this key ID.",
    ).optional(),
    ServiceAccessRoleArn: z.string().describe(
      "The Amazon Resource Name (ARN) of the IAM role that has access to the Amazon Redshift service. The role must allow the iam:PassRole action.",
    ).optional(),
    TimeFormat: z.string().describe(
      "The time format that you want to use. Valid values are auto (case-sensitive), 'timeformat_string', 'epochsecs', or 'epochmillisecs'.",
    ).optional(),
    TrimBlanks: z.boolean().describe(
      "A value that specifies to remove the trailing white space characters from a VARCHAR string.",
    ).optional(),
    TruncateColumns: z.boolean().describe(
      "A value that specifies to truncate data in columns to the appropriate number of characters, so that the data fits in the column.",
    ).optional(),
    WriteBufferSize: z.number().int().describe(
      "The size (in KB) of the in-memory file write buffer used when generating.csv files on the local disk at the DMS replication instance. The default value is 1000 (buffer size is 1000KB).",
    ).optional(),
  }).describe("Settings in JSON format for the Amazon Redshift endpoint.")
    .optional(),
  ResourceIdentifier: z.string().describe(
    "A display name for the resource identifier at the end of the EndpointArn response parameter that is returned in the created Endpoint object.",
  ).optional(),
  S3Settings: z.object({
    AddColumnName: z.boolean().describe(
      "An optional parameter that, when set to true or y, you can use to add column name information to the.csv output file.",
    ).optional(),
    AddTrailingPaddingCharacter: z.boolean().describe(
      "Use the S3 target endpoint setting AddTrailingPaddingCharacter to add padding on string data. The default value is false.",
    ).optional(),
    BucketFolder: z.string().describe(
      "An optional parameter to set a folder name in the S3 bucket.",
    ).optional(),
    BucketName: z.string().describe("The name of the S3 bucket.").optional(),
    CannedAclForObjects: z.string().describe(
      "A value that enables AWS DMS to specify a predefined (canned) access control list (ACL) for objects created in an Amazon S3 bucket as.csv or.parquet files.",
    ).optional(),
    CdcInsertsAndUpdates: z.boolean().describe(
      "A value that enables a change data capture (CDC) load to write INSERT and UPDATE operations to.csv or.parquet (columnar storage) output files.",
    ).optional(),
    CdcInsertsOnly: z.boolean().describe(
      "A value that enables a change data capture (CDC) load to write only INSERT operations to.csv or columnar storage (.parquet) output files. By default (the false setting), the first field in a.csv or.parquet record contains the letter I (INSERT), U (UPDATE), or D (DELETE). These values indicate whether the row was inserted, updated, or deleted at the source database for a CDC load to the target.",
    ).optional(),
    CdcMaxBatchInterval: z.number().int().describe(
      "Maximum length of the interval, defined in seconds, after which to output a file to Amazon S3.",
    ).optional(),
    CdcMinFileSize: z.number().int().describe(
      "Minimum file size, defined in kilobytes, to reach for a file output to Amazon S3.",
    ).optional(),
    CdcPath: z.string().describe(
      "Specifies the folder path of CDC files. For an S3 source, this setting is required if a task captures change data; otherwise, it's optional.",
    ).optional(),
    CompressionType: z.string().describe(
      "An optional parameter. When set to GZIP it enables the service to compress the target files.",
    ).optional(),
    CsvDelimiter: z.string().describe(
      "The delimiter used to separate columns in the.csv file for both source and target. The default is a comma.",
    ).optional(),
    CsvNoSupValue: z.string().describe(
      "This setting only applies if your Amazon S3 output files during a change data capture (CDC) load are written in.csv format.",
    ).optional(),
    CsvNullValue: z.string().describe(
      "An optional parameter that specifies how AWS DMS treats null values.",
    ).optional(),
    CsvRowDelimiter: z.string().describe(
      "The delimiter used to separate rows in the.csv file for both source and target.",
    ).optional(),
    DataFormat: z.string().describe(
      "The format of the data that you want to use for output.",
    ).optional(),
    DataPageSize: z.number().int().describe(
      "The size of one data page in bytes. This parameter defaults to 1024 * 1024 bytes (1 MiB). This number is used for.parquet file format only.",
    ).optional(),
    DatePartitionDelimiter: z.string().describe(
      "Specifies a date separating delimiter to use during folder partitioning. The default value is SLASH. Use this parameter when DatePartitionedEnabled is set to true.",
    ).optional(),
    DatePartitionEnabled: z.boolean().describe(
      "When set to true, this parameter partitions S3 bucket folders based on transaction commit dates. The default value is false.",
    ).optional(),
    DatePartitionSequence: z.string().describe(
      "Identifies the sequence of the date format to use during folder partitioning. The default value is YYYYMMDD. Use this parameter when DatePartitionedEnabled is set to true.",
    ).optional(),
    DatePartitionTimezone: z.string().describe(
      "When creating an S3 target endpoint, set DatePartitionTimezone to convert the current UTC time into a specified time zone.",
    ).optional(),
    DictPageSizeLimit: z.number().int().describe(
      "The maximum size of an encoded dictionary page of a column",
    ).optional(),
    EnableStatistics: z.boolean().describe(
      "A value that enables statistics for Parquet pages and row groups.",
    ).optional(),
    EncodingType: z.string().describe("The type of encoding that you're using.")
      .optional(),
    EncryptionMode: z.string().describe(
      "The type of server-side encryption that you want to use for your data.",
    ).optional(),
    ExpectedBucketOwner: z.string().describe(
      "To specify a bucket owner and prevent sniping, you can use the ExpectedBucketOwner endpoint setting.",
    ).optional(),
    ExternalTableDefinition: z.string().describe(
      "The external table definition.",
    ).optional(),
    GlueCatalogGeneration: z.boolean().describe(
      "When true, allows AWS Glue to catalog your S3 bucket. Creating an AWS Glue catalog lets you use Athena to query your data.",
    ).optional(),
    IgnoreHeaderRows: z.number().int().describe(
      "When this value is set to 1, AWS DMS ignores the first row header in a.csv file. A value of 1 turns on the feature; a value of 0 turns off the feature.",
    ).optional(),
    IncludeOpForFullLoad: z.boolean().describe(
      "A value that enables a full load to write INSERT operations to the comma-separated value (.csv) output files only to indicate how the rows were added to the source database.",
    ).optional(),
    MaxFileSize: z.number().int().describe(
      "A value that specifies the maximum size (in KB) of any.csv file to be created while migrating to an S3 target during full load.",
    ).optional(),
    ParquetTimestampInMillisecond: z.boolean().describe(
      "A value that specifies the precision of any TIMESTAMP column values that are written to an Amazon S3 object file in.parquet format.",
    ).optional(),
    ParquetVersion: z.string().describe(
      "The version of the Apache Parquet format that you want to use: parquet_1_0 (the default) or parquet_2_0.",
    ).optional(),
    PreserveTransactions: z.boolean().describe(
      "If this setting is set to true, AWS DMS saves the transaction order for a change data capture (CDC) load on the Amazon S3 target specified by CdcPath.",
    ).optional(),
    Rfc4180: z.boolean().describe(
      "For an S3 source, when this value is set to true or y, each leading double quotation mark has to be followed by an ending double quotation mark.",
    ).optional(),
    RowGroupLength: z.number().int().describe(
      "The number of rows in a row group.",
    ).optional(),
    ServerSideEncryptionKmsKeyId: z.string().describe(
      "If you are using SSE_KMS for the EncryptionMode, provide the AWS KMS key ID. The key that you use needs an attached policy that enables IAM user permissions and allows use of the key.",
    ).optional(),
    ServiceAccessRoleArn: z.string().describe(
      "A required parameter that specifies the Amazon Resource Name (ARN) used by the service to access the IAM role.",
    ).optional(),
    TimestampColumnName: z.string().describe(
      "A value that when nonblank causes AWS DMS to add a column with timestamp information to the endpoint data for an Amazon S3 target.",
    ).optional(),
    UseCsvNoSupValue: z.boolean().describe(
      "This setting applies if the S3 output files during a change data capture (CDC) load are written in.csv format. If this setting is set to true for columns not included in the supplemental log, AWS DMS uses the value specified by CsvNoSupValue. If this setting isn't set or is set to false, AWS DMS uses the null value for these columns.",
    ).optional(),
    UseTaskStartTimeForFullLoadTimestamp: z.boolean().describe(
      "When set to true, this parameter uses the task start time as the timestamp column value instead of the time data is written to target",
    ).optional(),
  }).describe(
    "Settings in JSON format for the source and target Amazon S3 endpoint",
  ).optional(),
  ServerName: z.string().describe(
    "The name of the server where the endpoint database resides.",
  ).optional(),
  SslMode: z.string().describe(
    "The Secure Sockets Layer (SSL) mode to use for the SSL connection. The default is none.",
  ).optional(),
  SybaseSettings: z.object({
    SecretsManagerAccessRoleArn: z.string().describe(
      "The full Amazon Resource Name (ARN) of the IAM role that specifies AWS DMS as the trusted entity and grants the required permissions to access the value in SecretsManagerSecret",
    ).optional(),
    SecretsManagerSecretId: z.string().describe(
      "The full ARN, partial ARN, or display name of the SecretsManagerSecret that contains the SAP SAE endpoint connection details.",
    ).optional(),
  }).describe(
    "Settings in JSON format for the source and target SAP ASE endpoint.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "One or more tags to be assigned to the endpoint.",
  ).optional(),
  Username: z.string().describe(
    "The user name to be used to log in to the endpoint database.",
  ).optional(),
});

const StateSchema = z.object({
  CertificateArn: z.string().optional(),
  DatabaseName: z.string().optional(),
  DocDbSettings: z.object({
    DocsToInvestigate: z.number(),
    ExtractDocId: z.boolean(),
    NestingLevel: z.string(),
    SecretsManagerAccessRoleArn: z.string(),
    SecretsManagerSecretId: z.string(),
  }).optional(),
  DynamoDbSettings: z.object({
    ServiceAccessRoleArn: z.string(),
  }).optional(),
  ElasticsearchSettings: z.object({
    EndpointUri: z.string(),
    ErrorRetryDuration: z.number(),
    FullLoadErrorPercentage: z.number(),
    ServiceAccessRoleArn: z.string(),
  }).optional(),
  EndpointArn: z.string(),
  EndpointIdentifier: z.string().optional(),
  EndpointType: z.string().optional(),
  EngineName: z.string().optional(),
  ExternalId: z.string().optional(),
  ExtraConnectionAttributes: z.string().optional(),
  GcpMySQLSettings: z.object({
    AfterConnectScript: z.string(),
    CleanSourceMetadataOnMismatch: z.boolean(),
    DatabaseName: z.string(),
    EventsPollInterval: z.number(),
    MaxFileSize: z.number(),
    ParallelLoadThreads: z.number(),
    Password: z.string(),
    Port: z.number(),
    SecretsManagerAccessRoleArn: z.string(),
    SecretsManagerSecretId: z.string(),
    ServerName: z.string(),
    ServerTimezone: z.string(),
    Username: z.string(),
  }).optional(),
  IbmDb2Settings: z.object({
    CurrentLsn: z.string(),
    KeepCsvFiles: z.boolean(),
    LoadTimeout: z.number(),
    MaxFileSize: z.number(),
    MaxKBytesPerRead: z.number(),
    SecretsManagerAccessRoleArn: z.string(),
    SecretsManagerSecretId: z.string(),
    SetDataCaptureChanges: z.boolean(),
    WriteBufferSize: z.number(),
  }).optional(),
  KafkaSettings: z.object({
    Broker: z.string(),
    IncludeControlDetails: z.boolean(),
    IncludeNullAndEmpty: z.boolean(),
    IncludePartitionValue: z.boolean(),
    IncludeTableAlterOperations: z.boolean(),
    IncludeTransactionDetails: z.boolean(),
    MessageFormat: z.string(),
    MessageMaxBytes: z.number(),
    NoHexPrefix: z.boolean(),
    PartitionIncludeSchemaTable: z.boolean(),
    SaslPassword: z.string(),
    SaslUserName: z.string(),
    SecurityProtocol: z.string(),
    SslCaCertificateArn: z.string(),
    SslClientCertificateArn: z.string(),
    SslClientKeyArn: z.string(),
    SslClientKeyPassword: z.string(),
    Topic: z.string(),
  }).optional(),
  KinesisSettings: z.object({
    IncludeControlDetails: z.boolean(),
    IncludeNullAndEmpty: z.boolean(),
    IncludePartitionValue: z.boolean(),
    IncludeTableAlterOperations: z.boolean(),
    IncludeTransactionDetails: z.boolean(),
    MessageFormat: z.string(),
    NoHexPrefix: z.boolean(),
    PartitionIncludeSchemaTable: z.boolean(),
    ServiceAccessRoleArn: z.string(),
    StreamArn: z.string(),
  }).optional(),
  KmsKeyId: z.string().optional(),
  MicrosoftSqlServerSettings: z.object({
    BcpPacketSize: z.number(),
    ControlTablesFileGroup: z.string(),
    DatabaseName: z.string(),
    ForceLobLookup: z.boolean(),
    Password: z.string(),
    Port: z.number(),
    QuerySingleAlwaysOnNode: z.boolean(),
    ReadBackupOnly: z.boolean(),
    SafeguardPolicy: z.string(),
    SecretsManagerAccessRoleArn: z.string(),
    SecretsManagerSecretId: z.string(),
    ServerName: z.string(),
    TlogAccessMode: z.string(),
    TrimSpaceInChar: z.boolean(),
    UseBcpFullLoad: z.boolean(),
    UseThirdPartyBackupDevice: z.boolean(),
    Username: z.string(),
  }).optional(),
  MongoDbSettings: z.object({
    AuthMechanism: z.string(),
    AuthSource: z.string(),
    AuthType: z.string(),
    DatabaseName: z.string(),
    DocsToInvestigate: z.string(),
    ExtractDocId: z.string(),
    NestingLevel: z.string(),
    Password: z.string(),
    Port: z.number(),
    SecretsManagerAccessRoleArn: z.string(),
    SecretsManagerSecretId: z.string(),
    ServerName: z.string(),
    Username: z.string(),
  }).optional(),
  MySqlSettings: z.object({
    AfterConnectScript: z.string(),
    CleanSourceMetadataOnMismatch: z.boolean(),
    EventsPollInterval: z.number(),
    MaxFileSize: z.number(),
    ParallelLoadThreads: z.number(),
    SecretsManagerAccessRoleArn: z.string(),
    SecretsManagerSecretId: z.string(),
    ServerTimezone: z.string(),
    TargetDbType: z.string(),
  }).optional(),
  NeptuneSettings: z.object({
    ErrorRetryDuration: z.number(),
    IamAuthEnabled: z.boolean(),
    MaxFileSize: z.number(),
    MaxRetryCount: z.number(),
    S3BucketFolder: z.string(),
    S3BucketName: z.string(),
    ServiceAccessRoleArn: z.string(),
  }).optional(),
  OracleSettings: z.object({
    AccessAlternateDirectly: z.boolean(),
    AddSupplementalLogging: z.boolean(),
    AdditionalArchivedLogDestId: z.number(),
    AllowSelectNestedTables: z.boolean(),
    ArchivedLogDestId: z.number(),
    ArchivedLogsOnly: z.boolean(),
    AsmPassword: z.string(),
    AsmServer: z.string(),
    AsmUser: z.string(),
    CharLengthSemantics: z.string(),
    DirectPathNoLog: z.boolean(),
    DirectPathParallelLoad: z.boolean(),
    EnableHomogenousTablespace: z.boolean(),
    ExtraArchivedLogDestIds: z.array(z.number()),
    FailTasksOnLobTruncation: z.boolean(),
    NumberDatatypeScale: z.number(),
    OraclePathPrefix: z.string(),
    ParallelAsmReadThreads: z.number(),
    ReadAheadBlocks: z.number(),
    ReadTableSpaceName: z.boolean(),
    ReplacePathPrefix: z.boolean(),
    RetryInterval: z.number(),
    SecretsManagerAccessRoleArn: z.string(),
    SecretsManagerOracleAsmAccessRoleArn: z.string(),
    SecretsManagerOracleAsmSecretId: z.string(),
    SecretsManagerSecretId: z.string(),
    SecurityDbEncryption: z.string(),
    SecurityDbEncryptionName: z.string(),
    SpatialDataOptionToGeoJsonFunctionName: z.string(),
    StandbyDelayTime: z.number(),
    UseAlternateFolderForOnline: z.boolean(),
    UseBFile: z.boolean(),
    UseDirectPathFullLoad: z.boolean(),
    UseLogminerReader: z.boolean(),
    UsePathPrefix: z.string(),
  }).optional(),
  Password: z.string().optional(),
  Port: z.number().optional(),
  PostgreSqlSettings: z.object({
    AfterConnectScript: z.string(),
    BabelfishDatabaseName: z.string(),
    CaptureDdls: z.boolean(),
    DatabaseMode: z.string(),
    DdlArtifactsSchema: z.string(),
    ExecuteTimeout: z.number(),
    FailTasksOnLobTruncation: z.boolean(),
    HeartbeatEnable: z.boolean(),
    HeartbeatFrequency: z.number(),
    HeartbeatSchema: z.string(),
    MapBooleanAsBoolean: z.boolean(),
    MaxFileSize: z.number(),
    PluginName: z.string(),
    SecretsManagerAccessRoleArn: z.string(),
    SecretsManagerSecretId: z.string(),
    SlotName: z.string(),
  }).optional(),
  RedisSettings: z.object({
    AuthPassword: z.string(),
    AuthType: z.string(),
    AuthUserName: z.string(),
    Port: z.number(),
    ServerName: z.string(),
    SslCaCertificateArn: z.string(),
    SslSecurityProtocol: z.string(),
  }).optional(),
  RedshiftSettings: z.object({
    AcceptAnyDate: z.boolean(),
    AfterConnectScript: z.string(),
    BucketFolder: z.string(),
    BucketName: z.string(),
    CaseSensitiveNames: z.boolean(),
    CompUpdate: z.boolean(),
    ConnectionTimeout: z.number(),
    DateFormat: z.string(),
    EmptyAsNull: z.boolean(),
    EncryptionMode: z.string(),
    ExplicitIds: z.boolean(),
    FileTransferUploadStreams: z.number(),
    LoadTimeout: z.number(),
    MapBooleanAsBoolean: z.boolean(),
    MaxFileSize: z.number(),
    RemoveQuotes: z.boolean(),
    ReplaceChars: z.string(),
    ReplaceInvalidChars: z.string(),
    SecretsManagerAccessRoleArn: z.string(),
    SecretsManagerSecretId: z.string(),
    ServerSideEncryptionKmsKeyId: z.string(),
    ServiceAccessRoleArn: z.string(),
    TimeFormat: z.string(),
    TrimBlanks: z.boolean(),
    TruncateColumns: z.boolean(),
    WriteBufferSize: z.number(),
  }).optional(),
  ResourceIdentifier: z.string().optional(),
  S3Settings: z.object({
    AddColumnName: z.boolean(),
    AddTrailingPaddingCharacter: z.boolean(),
    BucketFolder: z.string(),
    BucketName: z.string(),
    CannedAclForObjects: z.string(),
    CdcInsertsAndUpdates: z.boolean(),
    CdcInsertsOnly: z.boolean(),
    CdcMaxBatchInterval: z.number(),
    CdcMinFileSize: z.number(),
    CdcPath: z.string(),
    CompressionType: z.string(),
    CsvDelimiter: z.string(),
    CsvNoSupValue: z.string(),
    CsvNullValue: z.string(),
    CsvRowDelimiter: z.string(),
    DataFormat: z.string(),
    DataPageSize: z.number(),
    DatePartitionDelimiter: z.string(),
    DatePartitionEnabled: z.boolean(),
    DatePartitionSequence: z.string(),
    DatePartitionTimezone: z.string(),
    DictPageSizeLimit: z.number(),
    EnableStatistics: z.boolean(),
    EncodingType: z.string(),
    EncryptionMode: z.string(),
    ExpectedBucketOwner: z.string(),
    ExternalTableDefinition: z.string(),
    GlueCatalogGeneration: z.boolean(),
    IgnoreHeaderRows: z.number(),
    IncludeOpForFullLoad: z.boolean(),
    MaxFileSize: z.number(),
    ParquetTimestampInMillisecond: z.boolean(),
    ParquetVersion: z.string(),
    PreserveTransactions: z.boolean(),
    Rfc4180: z.boolean(),
    RowGroupLength: z.number(),
    ServerSideEncryptionKmsKeyId: z.string(),
    ServiceAccessRoleArn: z.string(),
    TimestampColumnName: z.string(),
    UseCsvNoSupValue: z.boolean(),
    UseTaskStartTimeForFullLoadTimestamp: z.boolean(),
  }).optional(),
  ServerName: z.string().optional(),
  SslMode: z.string().optional(),
  SybaseSettings: z.object({
    SecretsManagerAccessRoleArn: z.string(),
    SecretsManagerSecretId: z.string(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
  Username: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  CertificateArn: z.string().describe(
    "The Amazon Resource Name (ARN) for the certificate.",
  ).optional(),
  DatabaseName: z.string().describe(
    "The name of the endpoint database. For a MySQL source or target endpoint, don't specify DatabaseName. To migrate to a specific database, use this setting and targetDbType.",
  ).optional(),
  DocDbSettings: z.object({
    DocsToInvestigate: z.number().int().describe(
      'Indicates the number of documents to preview to determine the document organization. Use this setting when NestingLevel is set to "one".',
    ).optional(),
    ExtractDocId: z.boolean().describe(
      'Specifies the document ID. Use this setting when NestingLevel is set to "none"',
    ).optional(),
    NestingLevel: z.string().describe(
      "Specifies either document or table mode.",
    ).optional(),
    SecretsManagerAccessRoleArn: z.string().describe(
      "The full Amazon Resource Name (ARN) of the IAM role that specifies AWS DMS as the trusted entity and grants the required permissions to access the value in SecretsManagerSecret. The role must allow the iam:PassRole action. SecretsManagerSecret has the value of the AWS Secrets Manager secret that allows access to the DocumentDB endpoint.",
    ).optional(),
    SecretsManagerSecretId: z.string().describe(
      "The full Amazon Resource Name (ARN) of the IAM role that specifies AWS DMS as the trusted entity and grants the required permissions to access the value in SecretsManagerSecret. The role must allow the iam:PassRole action. SecretsManagerSecret has the value of the AWS Secrets Manager secret that allows access to the DocumentDB endpoint.",
    ).optional(),
  }).describe(
    "Settings in JSON format for the source and target DocumentDB endpoint",
  ).optional(),
  DynamoDbSettings: z.object({
    ServiceAccessRoleArn: z.string().describe(
      "The Amazon Resource Name (ARN) used by the service to access the IAM role. The role must allow the iam:PassRole action.",
    ).optional(),
  }).describe("Settings in JSON format for the target Amazon DynamoDB endpoint")
    .optional(),
  ElasticsearchSettings: z.object({
    EndpointUri: z.string().describe(
      "The endpoint for the OpenSearch cluster. AWS DMS uses HTTPS if a transport protocol (either HTTP or HTTPS) isn't specified.",
    ).optional(),
    ErrorRetryDuration: z.number().int().describe(
      "The maximum number of seconds for which DMS retries failed API requests to the OpenSearch cluster.",
    ).optional(),
    FullLoadErrorPercentage: z.number().int().describe(
      "The maximum percentage of records that can fail to be written before a full load operation stops.",
    ).optional(),
    ServiceAccessRoleArn: z.string().describe(
      "The Amazon Resource Name (ARN) used by the service to access the IAM role. The role must allow the iam:PassRole action.",
    ).optional(),
  }).describe("Settings in JSON format for the target OpenSearch endpoint")
    .optional(),
  EndpointIdentifier: z.string().describe(
    "The database endpoint identifier. Identifiers must begin with a letter and must contain only ASCII letters, digits, and hyphens. They can't end with a hyphen, or contain two consecutive hyphens.",
  ).optional(),
  EndpointType: z.string().describe(
    "The type of endpoint. Valid values are source and target.",
  ).optional(),
  EngineName: z.string().describe(
    "The type of engine for the endpoint, depending on the EndpointType value.",
  ).optional(),
  ExtraConnectionAttributes: z.string().describe(
    "Additional attributes associated with the connection",
  ).optional(),
  GcpMySQLSettings: z.object({
    AfterConnectScript: z.string().describe(
      "Specifies a script to run immediately after AWS DMS connects to the endpoint. The migration task continues running regardless if the SQL statement succeeds or fails.",
    ).optional(),
    CleanSourceMetadataOnMismatch: z.boolean().describe(
      "Adjusts the behavior of AWS DMS when migrating from an SQL Server source database that is hosted as part of an Always On availability group cluster. If you need AWS DMS to poll all the nodes in the Always On cluster for transaction backups, set this attribute to false.",
    ).optional(),
    DatabaseName: z.string().describe(
      "Database name for the endpoint. For a MySQL source or target endpoint, don't explicitly specify the database using the DatabaseName request parameter on either the CreateEndpoint or ModifyEndpoint API call. Specifying DatabaseName when you create or modify a MySQL endpoint replicates all the task tables to this single database. For MySQL endpoints, you specify the database only when you specify the schema in the table-mapping rules of the AWS DMS task.",
    ).optional(),
    EventsPollInterval: z.number().int().describe(
      "Specifies how often to check the binary log for new changes/events when the database is idle. The default is five seconds.",
    ).optional(),
    MaxFileSize: z.number().int().describe(
      "Specifies the maximum size (in KB) of any.csv file used to transfer data to a MySQL-compatible database.",
    ).optional(),
    ParallelLoadThreads: z.number().int().describe(
      "Improves performance when loading data into the MySQL-compatible target database. Specifies how many threads to use to load the data into the MySQL-compatible target database. Setting a large number of threads can have an adverse effect on database performance, because a separate connection is required for each thread. The default is one.",
    ).optional(),
    Password: z.string().describe("Endpoint connection password.").optional(),
    Port: z.number().int().describe("The port used by the endpoint database.")
      .optional(),
    SecretsManagerAccessRoleArn: z.string().describe(
      "The full Amazon Resource Name (ARN) of the IAM role that specifies AWS DMS as the trusted entity and grants the required permissions to access the value in SecretsManagerSecret. The role must allow the iam:PassRole action. SecretsManagerSecret has the value of the AWS Secrets Manager secret that allows access to the MySQL endpoint.",
    ).optional(),
    SecretsManagerSecretId: z.string().describe(
      "The full ARN, partial ARN, or display name of the SecretsManagerSecret that contains the MySQL endpoint connection details.",
    ).optional(),
    ServerName: z.string().describe("The MySQL host name.").optional(),
    ServerTimezone: z.string().describe(
      "Specifies the time zone for the source MySQL database. Don't enclose time zones in single quotation marks.",
    ).optional(),
    Username: z.string().describe(
      "Specifies the time zone for the source MySQL database. Don't enclose time zones in single quotation marks.",
    ).optional(),
  }).describe("Settings in JSON format for the source GCP MySQL endpoint")
    .optional(),
  IbmDb2Settings: z.object({
    CurrentLsn: z.string().describe(
      "For ongoing replication (CDC), use CurrentLSN to specify a log sequence number (LSN) where you want the replication to start.",
    ).optional(),
    KeepCsvFiles: z.boolean().describe(
      "If true, AWS DMS saves any.csv files to the Db2 LUW target that were used to replicate data. DMS uses these files for analysis and troubleshooting.",
    ).optional(),
    LoadTimeout: z.number().int().describe(
      "The amount of time (in milliseconds) before AWS DMS times out operations performed by DMS on the Db2 target. The default value is 1200 (20 minutes).",
    ).optional(),
    MaxFileSize: z.number().int().describe(
      "Specifies the maximum size (in KB) of.csv files used to transfer data to Db2 LUW.",
    ).optional(),
    MaxKBytesPerRead: z.number().int().describe(
      "Maximum number of bytes per read, as a NUMBER value. The default is 64 KB.",
    ).optional(),
    SecretsManagerAccessRoleArn: z.string().describe(
      "The full Amazon Resource Name (ARN) of the IAM role that specifies AWS DMS as the trusted entity and grants the required permissions to access the value in SecretsManagerSecret. The role must allow the iam:PassRole action. SecretsManagerSecret has the value ofthe AWS Secrets Manager secret that allows access to the Db2 LUW endpoint.",
    ).optional(),
    SecretsManagerSecretId: z.string().describe(
      "The full ARN, partial ARN, or display name of the SecretsManagerSecret that contains the IBMDB2 endpoint connection details.",
    ).optional(),
    SetDataCaptureChanges: z.boolean().describe(
      "Enables ongoing replication (CDC) as a BOOLEAN value. The default is true.",
    ).optional(),
    WriteBufferSize: z.number().int().describe(
      "The size (in KB) of the in-memory file write buffer used when generating.csv files on the local disk on the DMS replication instance. The default value is 1024 (1 MB).",
    ).optional(),
  }).describe("Settings in JSON format for the source IBM Db2 LUW endpoint")
    .optional(),
  KafkaSettings: z.object({
    Broker: z.string().describe(
      "A comma-separated list of one or more broker locations in your Kafka cluster that host your Kafka instance. Specify each broker location in the form broker-hostname-or-ip:port",
    ).optional(),
    IncludeControlDetails: z.boolean().describe(
      "Shows detailed control information for table definition, column definition, and table and column changes in the Kafka message output. The default is false.",
    ).optional(),
    IncludeNullAndEmpty: z.boolean().describe(
      "Include NULL and empty columns for records migrated to the endpoint. The default is false.",
    ).optional(),
    IncludePartitionValue: z.boolean().describe(
      "Shows the partition value within the Kafka message output unless the partition type is schema-table-type. The default is false.",
    ).optional(),
    IncludeTableAlterOperations: z.boolean().describe(
      "Includes any data definition language (DDL) operations that change the table in the control data, such as rename-table, drop-table, add-column, drop-column, and rename-column. The default is false.",
    ).optional(),
    IncludeTransactionDetails: z.boolean().describe(
      "Provides detailed transaction information from the source database. This information includes a commit timestamp, a log position, and values for transaction_id, previous transaction_id, and transaction_record_id (the record offset within a transaction). The default is false.",
    ).optional(),
    MessageFormat: z.string().describe(
      "The output format for the records created on the endpoint. The message format is JSON (default) or JSON_UNFORMATTED (a single line with no tab).",
    ).optional(),
    MessageMaxBytes: z.number().int().describe(
      "The maximum size in bytes for records created on the endpoint The default is 1,000,000.",
    ).optional(),
    NoHexPrefix: z.boolean().describe(
      "Set this optional parameter to true to avoid adding a '0x' prefix to raw data in hexadecimal format. For example, by default, AWS DMS adds a '0x' prefix to the LOB column type in hexadecimal format moving from an Oracle source to a Kafka target. Use the NoHexPrefix endpoint setting to enable migration of RAW data type columns without adding the '0x' prefix.",
    ).optional(),
    PartitionIncludeSchemaTable: z.boolean().describe(
      "Prefixes schema and table names to partition values, when the partition type is primary-key-type.",
    ).optional(),
    SaslPassword: z.string().describe(
      "The secure password that you created when you first set up your Amazon MSK cluster to validate a client identity and make an encrypted connection between server and client using SASL-SSL authentication.",
    ).optional(),
    SaslUserName: z.string().describe(
      "The secure user name you created when you first set up your Amazon MSK cluster to validate a client identity and make an encrypted connection between server and client using SASL-SSL authentication.",
    ).optional(),
    SecurityProtocol: z.string().describe(
      "Set secure connection to a Kafka target endpoint using Transport Layer Security (TLS). Options include ssl-encryption, ssl-authentication, and sasl-ssl. sasl-ssl requires SaslUsername and SaslPassword.",
    ).optional(),
    SslCaCertificateArn: z.string().describe(
      "The Amazon Resource Name (ARN) for the private certificate authority (CA) cert that AWS DMS uses to securely connect to your Kafka target endpoint.",
    ).optional(),
    SslClientCertificateArn: z.string().describe(
      "The Amazon Resource Name (ARN) of the client certificate used to securely connect to a Kafka target endpoint.",
    ).optional(),
    SslClientKeyArn: z.string().describe(
      "The Amazon Resource Name (ARN) for the client private key used to securely connect to a Kafka target endpoint.",
    ).optional(),
    SslClientKeyPassword: z.string().describe(
      "The password for the client private key used to securely connect to a Kafka target endpoint.",
    ).optional(),
    Topic: z.string().describe(
      'The topic to which you migrate the data. If you don\'t specify a topic, AWS DMS specifies "kafka-default-topic" as the migration topic.',
    ).optional(),
  }).describe("Settings in JSON format for the target Apache Kafka endpoint")
    .optional(),
  KinesisSettings: z.object({
    IncludeControlDetails: z.boolean().describe(
      "Shows detailed control information for table definition, column definition, and table and column changes in the Kinesis message output. The default is false.",
    ).optional(),
    IncludeNullAndEmpty: z.boolean().describe(
      "Include NULL and empty columns for records migrated to the endpoint. The default is false.",
    ).optional(),
    IncludePartitionValue: z.boolean().describe(
      "Shows the partition value within the Kinesis message output, unless the partition type is schema-table-type. The default is false.",
    ).optional(),
    IncludeTableAlterOperations: z.boolean().describe(
      "Includes any data definition language (DDL) operations that change the table in the control data, such as rename-table, drop-table, add-column, drop-column, and rename-column. The default is false.",
    ).optional(),
    IncludeTransactionDetails: z.boolean().describe(
      "Provides detailed transaction information from the source database.",
    ).optional(),
    MessageFormat: z.string().describe(
      "The output format for the records created on the endpoint. The message format is JSON (default) or JSON_UNFORMATTED (a single line with no tab).",
    ).optional(),
    NoHexPrefix: z.boolean().describe(
      "Set this optional parameter to true to avoid adding a '0x' prefix to raw data in hexadecimal format.",
    ).optional(),
    PartitionIncludeSchemaTable: z.boolean().describe(
      "Prefixes schema and table names to partition values, when the partition type is primary-key-type.",
    ).optional(),
    ServiceAccessRoleArn: z.string().describe(
      "The Amazon Resource Name (ARN) for the IAM role that AWS DMS uses to write to the Kinesis data stream. The role must allow the iam:PassRole action.",
    ).optional(),
    StreamArn: z.string().describe(
      "The Amazon Resource Name (ARN) for the Amazon Kinesis Data Streams endpoint.",
    ).optional(),
  }).describe(
    "Settings in JSON format for the target endpoint for Amazon Kinesis Data Streams",
  ).optional(),
  KmsKeyId: z.string().describe(
    "An AWS KMS key identifier that is used to encrypt the connection parameters for the endpoint.If you don't specify a value for the KmsKeyId parameter, AWS DMS uses your default encryption key.",
  ).optional(),
  MicrosoftSqlServerSettings: z.object({
    BcpPacketSize: z.number().int().describe(
      "The maximum size of the packets (in bytes) used to transfer data using BCP.",
    ).optional(),
    ControlTablesFileGroup: z.string().describe(
      "Specifies a file group for the AWS DMS internal tables.",
    ).optional(),
    DatabaseName: z.string().describe("Database name for the endpoint.")
      .optional(),
    ForceLobLookup: z.boolean().describe("Forces LOB lookup on inline LOB.")
      .optional(),
    Password: z.string().describe("Endpoint connection password.").optional(),
    Port: z.number().int().describe("Endpoint TCP port.").optional(),
    QuerySingleAlwaysOnNode: z.boolean().describe(
      "Cleans and recreates table metadata information on the replication instance when a mismatch occurs. An example is a situation where running an alter DDL statement on a table might result in different information about the table cached in the replication instance.",
    ).optional(),
    ReadBackupOnly: z.boolean().describe(
      "When this attribute is set to Y, AWS DMS only reads changes from transaction log backups and doesn't read from the active transaction log file during ongoing replication. Setting this parameter to Y enables you to control active transaction log file growth during full load and ongoing replication tasks. However, it can add some source latency to ongoing replication.",
    ).optional(),
    SafeguardPolicy: z.string().describe(
      "Use this attribute to minimize the need to access the backup log and enable AWS DMS to prevent truncation using one of the following two methods.",
    ).optional(),
    SecretsManagerAccessRoleArn: z.string().describe(
      "The full Amazon Resource Name (ARN) of the IAM role that specifies AWS DMS as the trusted entity and grants the required permissions to access the value in SecretsManagerSecret",
    ).optional(),
    SecretsManagerSecretId: z.string().describe(
      "The full ARN, partial ARN, or display name of the SecretsManagerSecret that contains the MicrosoftSQLServer endpoint connection details.",
    ).optional(),
    ServerName: z.string().describe(
      "Fully qualified domain name of the endpoint. For an Amazon RDS SQL Server instance, this is the output of DescribeDBInstances, in the Endpoint.Address field.",
    ).optional(),
    TlogAccessMode: z.string().describe(
      "Indicates the mode used to fetch CDC data.",
    ).optional(),
    TrimSpaceInChar: z.boolean().describe(
      "Use the TrimSpaceInChar source endpoint setting to right-trim data on CHAR and NCHAR data types during migration. Setting TrimSpaceInChar does not left-trim data. The default value is true.",
    ).optional(),
    UseBcpFullLoad: z.boolean().describe(
      "Use this to attribute to transfer data for full-load operations using BCP. When the target table contains an identity column that does not exist in the source table, you must disable the use BCP for loading table option.",
    ).optional(),
    UseThirdPartyBackupDevice: z.boolean().describe(
      "When this attribute is set to Y, DMS processes third-party transaction log backups if they are created in native format.",
    ).optional(),
    Username: z.string().describe("Endpoint connection user name.").optional(),
  }).describe(
    "Settings in JSON format for the source and target Microsoft SQL Server endpoint",
  ).optional(),
  MongoDbSettings: z.object({
    AuthMechanism: z.string().describe(
      "The authentication mechanism you use to access the MongoDB source endpoint.",
    ).optional(),
    AuthSource: z.string().describe(
      'The MongoDB database name. This setting isn\'t used when AuthType is set to "no".',
    ).optional(),
    AuthType: z.string().describe(
      "The authentication type you use to access the MongoDB source endpoint.",
    ).optional(),
    DatabaseName: z.string().describe(
      "The database name on the MongoDB source endpoint.",
    ).optional(),
    DocsToInvestigate: z.string().describe(
      'Indicates the number of documents to preview to determine the document organization. Use this setting when NestingLevel is set to "one".',
    ).optional(),
    ExtractDocId: z.string().describe(
      'Specifies the document ID. Use this setting when NestingLevel is set to "none".',
    ).optional(),
    NestingLevel: z.string().describe(
      "Specifies either document or table mode.",
    ).optional(),
    Password: z.string().describe(
      "The password for the user account you use to access the MongoDB source endpoint.",
    ).optional(),
    Port: z.number().int().describe(
      "The port value for the MongoDB source endpoint.",
    ).optional(),
    SecretsManagerAccessRoleArn: z.string().describe(
      "The full Amazon Resource Name (ARN) of the IAM role that specifies AWS DMS as the trusted entity and grants the required permissions to access the value in SecretsManagerSecret",
    ).optional(),
    SecretsManagerSecretId: z.string().describe(
      "The full ARN, partial ARN, or display name of the SecretsManagerSecret that contains the MongoDB endpoint connection details.",
    ).optional(),
    ServerName: z.string().describe(
      "The name of the server on the MongoDB source endpoint.",
    ).optional(),
    Username: z.string().describe(
      "The user name you use to access the MongoDB source endpoint.",
    ).optional(),
  }).describe("Settings in JSON format for the source MongoDB endpoint")
    .optional(),
  MySqlSettings: z.object({
    AfterConnectScript: z.string().describe(
      "Specifies a script to run immediately after AWS DMS connects to the endpoint. The migration task continues running regardless if the SQL statement succeeds or fails.",
    ).optional(),
    CleanSourceMetadataOnMismatch: z.boolean().describe(
      "Cleans and recreates table metadata information on the replication instance when a mismatch occurs.",
    ).optional(),
    EventsPollInterval: z.number().int().describe(
      "Specifies how often to check the binary log for new changes/events when the database is idle. The default is five seconds.",
    ).optional(),
    MaxFileSize: z.number().int().describe(
      "Specifies the maximum size (in KB) of any.csv file used to transfer data to a MySQL-compatible database.",
    ).optional(),
    ParallelLoadThreads: z.number().int().describe(
      "Improves performance when loading data into the MySQL-compatible target database. Specifies how many threads to use to load the data into the MySQL-compatible target database.",
    ).optional(),
    SecretsManagerAccessRoleArn: z.string().describe(
      "The full Amazon Resource Name (ARN) of the IAM role that specifies AWS DMS as the trusted entity and grants the required permissions to access the value in SecretsManagerSecret.",
    ).optional(),
    SecretsManagerSecretId: z.string().describe(
      "The full ARN, partial ARN, or display name of the SecretsManagerSecret that contains the MySQL endpoint connection details.",
    ).optional(),
    ServerTimezone: z.string().describe(
      "Specifies the time zone for the source MySQL database.",
    ).optional(),
    TargetDbType: z.string().describe(
      "Specifies where to migrate source tables on the target, either to a single database or multiple databases.",
    ).optional(),
  }).describe("Settings in JSON format for the source and target MySQL endpoin")
    .optional(),
  NeptuneSettings: z.object({
    ErrorRetryDuration: z.number().int().describe(
      "The number of milliseconds for AWS DMS to wait to retry a bulk-load of migrated graph data to the Neptune target database before raising an error. The default is 250.",
    ).optional(),
    IamAuthEnabled: z.boolean().describe(
      "If you want IAM authorization enabled for this endpoint, set this parameter to true.",
    ).optional(),
    MaxFileSize: z.number().int().describe(
      "The maximum size in kilobytes of migrated graph data stored in a.csv file before AWS DMS bulk-loads the data to the Neptune target database.",
    ).optional(),
    MaxRetryCount: z.number().int().describe(
      "The number of times for AWS DMS to retry a bulk load of migrated graph data to the Neptune target database before raising an error. The default is 5.",
    ).optional(),
    S3BucketFolder: z.string().describe(
      "A folder path where you want AWS DMS to store migrated graph data in the S3 bucket specified by S3BucketName",
    ).optional(),
    S3BucketName: z.string().describe(
      "The name of the Amazon S3 bucket where AWS DMS can temporarily store migrated graph data in.csv files before bulk-loading it to the Neptune target database.",
    ).optional(),
    ServiceAccessRoleArn: z.string().describe(
      "The Amazon Resource Name (ARN) of the service role that you created for the Neptune target endpoint. The role must allow the iam:PassRole action.",
    ).optional(),
  }).describe("Settings in JSON format for the target Amazon Neptune endpoint")
    .optional(),
  OracleSettings: z.object({
    AccessAlternateDirectly: z.boolean().describe(
      "Set this attribute to false in order to use the Binary Reader to capture change data for an Amazon RDS for Oracle as the source.",
    ).optional(),
    AddSupplementalLogging: z.boolean().describe(
      "Set this attribute to set up table-level supplemental logging for the Oracle database. This attribute enables PRIMARY KEY supplemental logging on all tables selected for a migration task.",
    ).optional(),
    AdditionalArchivedLogDestId: z.number().int().describe(
      "Set this attribute with ArchivedLogDestId in a primary/ standby setup",
    ).optional(),
    AllowSelectNestedTables: z.boolean().describe(
      "Set this attribute to true to enable replication of Oracle tables containing columns that are nested tables or defined types.",
    ).optional(),
    ArchivedLogDestId: z.number().int().describe(
      "Specifies the ID of the destination for the archived redo logs.",
    ).optional(),
    ArchivedLogsOnly: z.boolean().describe(
      "When this field is set to True, AWS DMS only accesses the archived redo logs",
    ).optional(),
    AsmPassword: z.string().describe(
      "For an Oracle source endpoint, your Oracle Automatic Storage Management (ASM) password.",
    ).optional(),
    AsmServer: z.string().describe(
      "For an Oracle source endpoint, your ASM server address.",
    ).optional(),
    AsmUser: z.string().describe(
      "For an Oracle source endpoint, your ASM user name.",
    ).optional(),
    CharLengthSemantics: z.string().describe(
      "Specifies whether the length of a character column is in bytes or in characters.",
    ).optional(),
    DirectPathNoLog: z.boolean().describe(
      "When set to true, this attribute helps to increase the commit rate on the Oracle target database by writing directly to tables and not writing a trail to database logs.",
    ).optional(),
    DirectPathParallelLoad: z.boolean().describe(
      "When set to true, this attribute specifies a parallel load when useDirectPathFullLoad is set to Y.",
    ).optional(),
    EnableHomogenousTablespace: z.boolean().describe(
      "Set this attribute to enable homogenous tablespace replication and create existing tables or indexes under the same tablespace on the target.",
    ).optional(),
    ExtraArchivedLogDestIds: z.array(z.number().int()).describe(
      "Specifies the IDs of one more destinations for one or more archived redo logs.",
    ).optional(),
    FailTasksOnLobTruncation: z.boolean().describe(
      "When set to true, this attribute causes a task to fail if the actual size of an LOB column is greater than the specified LobMaxSize.",
    ).optional(),
    NumberDatatypeScale: z.number().int().describe(
      "Specifies the number scale. You can select a scale up to 38, or you can select FLOAT. By default, the NUMBER data type is converted to precision 38, scale 10.",
    ).optional(),
    OraclePathPrefix: z.string().describe(
      "Set this string attribute to the required value in order to use the Binary Reader to capture change data for an Amazon RDS for Oracle as the source.",
    ).optional(),
    ParallelAsmReadThreads: z.number().int().describe(
      "Set this attribute to change the number of threads that DMS configures to perform a change data capture (CDC) load using Oracle Automatic Storage Management (ASM).",
    ).optional(),
    ReadAheadBlocks: z.number().int().describe(
      "Set this attribute to change the number of read-ahead blocks that DMS configures to perform a change data capture (CDC) load using Oracle Automatic Storage Management (ASM).",
    ).optional(),
    ReadTableSpaceName: z.boolean().describe(
      "When set to true, this attribute supports tablespace replication.",
    ).optional(),
    ReplacePathPrefix: z.boolean().describe(
      "Set this attribute to true in order to use the Binary Reader to capture change data for an Amazon RDS for Oracle as the source.",
    ).optional(),
    RetryInterval: z.number().int().describe(
      "Specifies the number of seconds that the system waits before resending a query.",
    ).optional(),
    SecretsManagerAccessRoleArn: z.string().describe(
      "The full Amazon Resource Name (ARN) of the IAM role that specifies AWS DMS as the trusted entity and grants the required permissions to access the value in SecretsManagerSecret.",
    ).optional(),
    SecretsManagerOracleAsmAccessRoleArn: z.string().describe(
      "Required only if your Oracle endpoint uses Advanced Storage Manager (ASM).",
    ).optional(),
    SecretsManagerOracleAsmSecretId: z.string().describe(
      "Required only if your Oracle endpoint uses Advanced Storage Manager (ASM).",
    ).optional(),
    SecretsManagerSecretId: z.string().describe(
      "The full ARN, partial ARN, or display name of the SecretsManagerSecret that contains the Oracle endpoint connection details.",
    ).optional(),
    SecurityDbEncryption: z.string().describe(
      "For an Oracle source endpoint, the transparent data encryption (TDE) password required by AWM DMS to access Oracle redo logs encrypted by TDE using Binary Reader.",
    ).optional(),
    SecurityDbEncryptionName: z.string().describe(
      "For an Oracle source endpoint, the name of a key used for the transparent data encryption (TDE) of the columns and tablespaces in an Oracle source database that is encrypted using TDE.",
    ).optional(),
    SpatialDataOptionToGeoJsonFunctionName: z.string().describe(
      "Use this attribute to convert SDO_GEOMETRY to GEOJSON format. By default, DMS calls the SDO2GEOJSON custom function if present and accessible. Or you can create your own custom function that mimics the operation of SDOGEOJSON and set SpatialDataOptionToGeoJsonFunctionName to call it instead.",
    ).optional(),
    StandbyDelayTime: z.number().int().describe(
      "Use this attribute to specify a time in minutes for the delay in standby sync.",
    ).optional(),
    UseAlternateFolderForOnline: z.boolean().describe(
      "Set this attribute to true in order to use the Binary Reader to capture change data for an Amazon RDS for Oracle as the source",
    ).optional(),
    UseBFile: z.boolean().describe(
      "Set this attribute to True to capture change data using the Binary Reader utility.",
    ).optional(),
    UseDirectPathFullLoad: z.boolean().describe(
      "Set this attribute to True to have AWS DMS use a direct path full load.",
    ).optional(),
    UseLogminerReader: z.boolean().describe(
      "Set this attribute to True to capture change data using the Oracle LogMiner utility (the default).",
    ).optional(),
    UsePathPrefix: z.string().describe(
      "Set this string attribute to the required value in order to use the Binary Reader to capture change data for an Amazon RDS for Oracle as the source.",
    ).optional(),
  }).describe(
    "Settings in JSON format for the source and target Oracle endpoint",
  ).optional(),
  Password: z.string().describe(
    "The password to be used to log in to the endpoint database.",
  ).optional(),
  Port: z.number().int().describe("The port used by the endpoint database.")
    .optional(),
  PostgreSqlSettings: z.object({
    AfterConnectScript: z.string().describe(
      "For use with change data capture (CDC) only, this attribute has AWS DMS bypass foreign keys and user triggers to reduce the time it takes to bulk load data.",
    ).optional(),
    BabelfishDatabaseName: z.string().describe(
      "The Babelfish for Aurora PostgreSQL database name for the endpoint.",
    ).optional(),
    CaptureDdls: z.boolean().describe(
      "To capture DDL events, AWS DMS creates various artifacts in the PostgreSQL database when the task starts. You can later remove these artifacts.",
    ).optional(),
    DatabaseMode: z.string().describe(
      "Specifies the default behavior of the replication's handling of PostgreSQL- compatible endpoints that require some additional configuration, such as Babelfish endpoints.",
    ).optional(),
    DdlArtifactsSchema: z.string().describe(
      "The schema in which the operational DDL database artifacts are created.",
    ).optional(),
    ExecuteTimeout: z.number().int().describe(
      "Sets the client statement timeout for the PostgreSQL instance, in seconds. The default value is 60 seconds.",
    ).optional(),
    FailTasksOnLobTruncation: z.boolean().describe(
      "When set to true, this value causes a task to fail if the actual size of a LOB column is greater than the specified LobMaxSize.",
    ).optional(),
    HeartbeatEnable: z.boolean().describe(
      "The write-ahead log (WAL) heartbeat feature mimics a dummy transaction.",
    ).optional(),
    HeartbeatFrequency: z.number().int().describe(
      "Sets the WAL heartbeat frequency (in minutes).",
    ).optional(),
    HeartbeatSchema: z.string().describe(
      "Sets the schema in which the heartbeat artifacts are created.",
    ).optional(),
    MapBooleanAsBoolean: z.boolean().describe(
      "When true, lets PostgreSQL migrate the boolean type as boolean.",
    ).optional(),
    MaxFileSize: z.number().int().describe(
      "Specifies the maximum size (in KB) of any.csv file used to transfer data to PostgreSQL.",
    ).optional(),
    PluginName: z.string().describe(
      "Specifies the plugin to use to create a replication slot.",
    ).optional(),
    SecretsManagerAccessRoleArn: z.string().describe(
      "The full Amazon Resource Name (ARN) of the IAM role that specifies AWS DMS as the trusted entity and grants the required permissions to access the value in SecretsManagerSecret.",
    ).optional(),
    SecretsManagerSecretId: z.string().describe(
      "The full ARN, partial ARN, or display name of the SecretsManagerSecret that contains the PostgreSQL endpoint connection details.",
    ).optional(),
    SlotName: z.string().describe(
      "Sets the name of a previously created logical replication slot for a change data capture (CDC) load of the PostgreSQL source instance.",
    ).optional(),
  }).describe(
    "Settings in JSON format for the source and target PostgreSQL endpoint.",
  ).optional(),
  RedisSettings: z.object({
    AuthPassword: z.string().describe(
      "The password provided with the auth-role and auth-token options of the AuthType setting for a Redis target endpoint.",
    ).optional(),
    AuthType: z.string().describe(
      "The type of authentication to perform when connecting to a Redis target.",
    ).optional(),
    AuthUserName: z.string().describe(
      "The user name provided with the auth-role option of the AuthType setting for a Redis target endpoint.",
    ).optional(),
    Port: z.number().describe(
      "Transmission Control Protocol (TCP) port for the endpoint.",
    ).optional(),
    ServerName: z.string().describe(
      "Fully qualified domain name of the endpoint.",
    ).optional(),
    SslCaCertificateArn: z.string().describe(
      "The Amazon Resource Name (ARN) for the certificate authority (CA) that DMS uses to connect to your Redis target endpoint.",
    ).optional(),
    SslSecurityProtocol: z.string().describe(
      "The connection to a Redis target endpoint using Transport Layer Security (TLS). Valid values include plaintext and ssl-encryption.",
    ).optional(),
  }).describe("Settings in JSON format for the target Redis endpoint")
    .optional(),
  RedshiftSettings: z.object({
    AcceptAnyDate: z.boolean().describe(
      "A value that indicates to allow any date format, including invalid formats such as 00/00/00 00:00:00, to be loaded without generating an error. You can choose true or false (the default).",
    ).optional(),
    AfterConnectScript: z.string().describe(
      "Code to run after connecting. This parameter should contain the code itself, not the name of a file containing the code.",
    ).optional(),
    BucketFolder: z.string().describe(
      "An S3 folder where the comma-separated-value (.csv) files are stored before being uploaded to the target Redshift cluster.",
    ).optional(),
    BucketName: z.string().describe(
      "The name of the intermediate S3 bucket used to store.csv files before uploading data to Redshift.",
    ).optional(),
    CaseSensitiveNames: z.boolean().describe(
      "If Amazon Redshift is configured to support case sensitive schema names, set CaseSensitiveNames to true. The default is false.",
    ).optional(),
    CompUpdate: z.boolean().describe(
      "If you set CompUpdate to true Amazon Redshift applies automatic compression if the table is empty.",
    ).optional(),
    ConnectionTimeout: z.number().int().describe(
      "A value that sets the amount of time to wait (in milliseconds) before timing out, beginning from when you initially establish a connection.",
    ).optional(),
    DateFormat: z.string().describe("The date format that you are using.")
      .optional(),
    EmptyAsNull: z.boolean().describe(
      "A value that specifies whether AWS DMS should migrate empty CHAR and VARCHAR fields as NULL. A value of true sets empty CHAR and VARCHAR fields to null. The default is false.",
    ).optional(),
    EncryptionMode: z.string().describe(
      "The type of server-side encryption that you want to use for your data.",
    ).optional(),
    ExplicitIds: z.boolean().describe(
      "This setting is only valid for a full-load migration task. Set ExplicitIds to true to have tables with IDENTITY columns override their auto-generated values with explicit values loaded from the source data files used to populate the tables. The default is false.",
    ).optional(),
    FileTransferUploadStreams: z.number().int().describe(
      "The number of threads used to upload a single file. This parameter accepts a value from 1 through 64. It defaults to 10.",
    ).optional(),
    LoadTimeout: z.number().int().describe(
      "The amount of time to wait (in milliseconds) before timing out of operations performed by AWS DMS on a Redshift cluster, such as Redshift COPY, INSERT, DELETE, and UPDATE.",
    ).optional(),
    MapBooleanAsBoolean: z.boolean().describe(
      "When true, lets Redshift migrate the boolean type as boolean. By default, Redshift migrates booleans as varchar(1). You must set this setting on both the source and target endpoints for it to take effect.",
    ).optional(),
    MaxFileSize: z.number().int().describe(
      "The maximum size (in KB) of any.csv file used to load data on an S3 bucket and transfer data to Amazon Redshift. It defaults to 1048576KB (1 GB).",
    ).optional(),
    RemoveQuotes: z.boolean().describe(
      "A value that specifies to remove surrounding quotation marks from strings in the incoming data.",
    ).optional(),
    ReplaceChars: z.string().describe(
      'A value that specifies to replaces the invalid characters specified in ReplaceInvalidChars, substituting the specified characters instead. The default is "?".',
    ).optional(),
    ReplaceInvalidChars: z.string().describe(
      "A list of characters that you want to replace. Use with ReplaceChars.",
    ).optional(),
    SecretsManagerAccessRoleArn: z.string().describe(
      "The full Amazon Resource Name (ARN) of the IAM role that specifies AWS DMS as the trusted entity and grants the required permissions to access the value in SecretsManagerSecret.",
    ).optional(),
    SecretsManagerSecretId: z.string().describe(
      "The full ARN, partial ARN, or display name of the SecretsManagerSecret that contains the Amazon Redshift endpoint connection details.",
    ).optional(),
    ServerSideEncryptionKmsKeyId: z.string().describe(
      "The AWS KMS key ID. If you are using SSE_KMS for the EncryptionMode, provide this key ID.",
    ).optional(),
    ServiceAccessRoleArn: z.string().describe(
      "The Amazon Resource Name (ARN) of the IAM role that has access to the Amazon Redshift service. The role must allow the iam:PassRole action.",
    ).optional(),
    TimeFormat: z.string().describe(
      "The time format that you want to use. Valid values are auto (case-sensitive), 'timeformat_string', 'epochsecs', or 'epochmillisecs'.",
    ).optional(),
    TrimBlanks: z.boolean().describe(
      "A value that specifies to remove the trailing white space characters from a VARCHAR string.",
    ).optional(),
    TruncateColumns: z.boolean().describe(
      "A value that specifies to truncate data in columns to the appropriate number of characters, so that the data fits in the column.",
    ).optional(),
    WriteBufferSize: z.number().int().describe(
      "The size (in KB) of the in-memory file write buffer used when generating.csv files on the local disk at the DMS replication instance. The default value is 1000 (buffer size is 1000KB).",
    ).optional(),
  }).describe("Settings in JSON format for the Amazon Redshift endpoint.")
    .optional(),
  ResourceIdentifier: z.string().describe(
    "A display name for the resource identifier at the end of the EndpointArn response parameter that is returned in the created Endpoint object.",
  ).optional(),
  S3Settings: z.object({
    AddColumnName: z.boolean().describe(
      "An optional parameter that, when set to true or y, you can use to add column name information to the.csv output file.",
    ).optional(),
    AddTrailingPaddingCharacter: z.boolean().describe(
      "Use the S3 target endpoint setting AddTrailingPaddingCharacter to add padding on string data. The default value is false.",
    ).optional(),
    BucketFolder: z.string().describe(
      "An optional parameter to set a folder name in the S3 bucket.",
    ).optional(),
    BucketName: z.string().describe("The name of the S3 bucket.").optional(),
    CannedAclForObjects: z.string().describe(
      "A value that enables AWS DMS to specify a predefined (canned) access control list (ACL) for objects created in an Amazon S3 bucket as.csv or.parquet files.",
    ).optional(),
    CdcInsertsAndUpdates: z.boolean().describe(
      "A value that enables a change data capture (CDC) load to write INSERT and UPDATE operations to.csv or.parquet (columnar storage) output files.",
    ).optional(),
    CdcInsertsOnly: z.boolean().describe(
      "A value that enables a change data capture (CDC) load to write only INSERT operations to.csv or columnar storage (.parquet) output files. By default (the false setting), the first field in a.csv or.parquet record contains the letter I (INSERT), U (UPDATE), or D (DELETE). These values indicate whether the row was inserted, updated, or deleted at the source database for a CDC load to the target.",
    ).optional(),
    CdcMaxBatchInterval: z.number().int().describe(
      "Maximum length of the interval, defined in seconds, after which to output a file to Amazon S3.",
    ).optional(),
    CdcMinFileSize: z.number().int().describe(
      "Minimum file size, defined in kilobytes, to reach for a file output to Amazon S3.",
    ).optional(),
    CdcPath: z.string().describe(
      "Specifies the folder path of CDC files. For an S3 source, this setting is required if a task captures change data; otherwise, it's optional.",
    ).optional(),
    CompressionType: z.string().describe(
      "An optional parameter. When set to GZIP it enables the service to compress the target files.",
    ).optional(),
    CsvDelimiter: z.string().describe(
      "The delimiter used to separate columns in the.csv file for both source and target. The default is a comma.",
    ).optional(),
    CsvNoSupValue: z.string().describe(
      "This setting only applies if your Amazon S3 output files during a change data capture (CDC) load are written in.csv format.",
    ).optional(),
    CsvNullValue: z.string().describe(
      "An optional parameter that specifies how AWS DMS treats null values.",
    ).optional(),
    CsvRowDelimiter: z.string().describe(
      "The delimiter used to separate rows in the.csv file for both source and target.",
    ).optional(),
    DataFormat: z.string().describe(
      "The format of the data that you want to use for output.",
    ).optional(),
    DataPageSize: z.number().int().describe(
      "The size of one data page in bytes. This parameter defaults to 1024 * 1024 bytes (1 MiB). This number is used for.parquet file format only.",
    ).optional(),
    DatePartitionDelimiter: z.string().describe(
      "Specifies a date separating delimiter to use during folder partitioning. The default value is SLASH. Use this parameter when DatePartitionedEnabled is set to true.",
    ).optional(),
    DatePartitionEnabled: z.boolean().describe(
      "When set to true, this parameter partitions S3 bucket folders based on transaction commit dates. The default value is false.",
    ).optional(),
    DatePartitionSequence: z.string().describe(
      "Identifies the sequence of the date format to use during folder partitioning. The default value is YYYYMMDD. Use this parameter when DatePartitionedEnabled is set to true.",
    ).optional(),
    DatePartitionTimezone: z.string().describe(
      "When creating an S3 target endpoint, set DatePartitionTimezone to convert the current UTC time into a specified time zone.",
    ).optional(),
    DictPageSizeLimit: z.number().int().describe(
      "The maximum size of an encoded dictionary page of a column",
    ).optional(),
    EnableStatistics: z.boolean().describe(
      "A value that enables statistics for Parquet pages and row groups.",
    ).optional(),
    EncodingType: z.string().describe("The type of encoding that you're using.")
      .optional(),
    EncryptionMode: z.string().describe(
      "The type of server-side encryption that you want to use for your data.",
    ).optional(),
    ExpectedBucketOwner: z.string().describe(
      "To specify a bucket owner and prevent sniping, you can use the ExpectedBucketOwner endpoint setting.",
    ).optional(),
    ExternalTableDefinition: z.string().describe(
      "The external table definition.",
    ).optional(),
    GlueCatalogGeneration: z.boolean().describe(
      "When true, allows AWS Glue to catalog your S3 bucket. Creating an AWS Glue catalog lets you use Athena to query your data.",
    ).optional(),
    IgnoreHeaderRows: z.number().int().describe(
      "When this value is set to 1, AWS DMS ignores the first row header in a.csv file. A value of 1 turns on the feature; a value of 0 turns off the feature.",
    ).optional(),
    IncludeOpForFullLoad: z.boolean().describe(
      "A value that enables a full load to write INSERT operations to the comma-separated value (.csv) output files only to indicate how the rows were added to the source database.",
    ).optional(),
    MaxFileSize: z.number().int().describe(
      "A value that specifies the maximum size (in KB) of any.csv file to be created while migrating to an S3 target during full load.",
    ).optional(),
    ParquetTimestampInMillisecond: z.boolean().describe(
      "A value that specifies the precision of any TIMESTAMP column values that are written to an Amazon S3 object file in.parquet format.",
    ).optional(),
    ParquetVersion: z.string().describe(
      "The version of the Apache Parquet format that you want to use: parquet_1_0 (the default) or parquet_2_0.",
    ).optional(),
    PreserveTransactions: z.boolean().describe(
      "If this setting is set to true, AWS DMS saves the transaction order for a change data capture (CDC) load on the Amazon S3 target specified by CdcPath.",
    ).optional(),
    Rfc4180: z.boolean().describe(
      "For an S3 source, when this value is set to true or y, each leading double quotation mark has to be followed by an ending double quotation mark.",
    ).optional(),
    RowGroupLength: z.number().int().describe(
      "The number of rows in a row group.",
    ).optional(),
    ServerSideEncryptionKmsKeyId: z.string().describe(
      "If you are using SSE_KMS for the EncryptionMode, provide the AWS KMS key ID. The key that you use needs an attached policy that enables IAM user permissions and allows use of the key.",
    ).optional(),
    ServiceAccessRoleArn: z.string().describe(
      "A required parameter that specifies the Amazon Resource Name (ARN) used by the service to access the IAM role.",
    ).optional(),
    TimestampColumnName: z.string().describe(
      "A value that when nonblank causes AWS DMS to add a column with timestamp information to the endpoint data for an Amazon S3 target.",
    ).optional(),
    UseCsvNoSupValue: z.boolean().describe(
      "This setting applies if the S3 output files during a change data capture (CDC) load are written in.csv format. If this setting is set to true for columns not included in the supplemental log, AWS DMS uses the value specified by CsvNoSupValue. If this setting isn't set or is set to false, AWS DMS uses the null value for these columns.",
    ).optional(),
    UseTaskStartTimeForFullLoadTimestamp: z.boolean().describe(
      "When set to true, this parameter uses the task start time as the timestamp column value instead of the time data is written to target",
    ).optional(),
  }).describe(
    "Settings in JSON format for the source and target Amazon S3 endpoint",
  ).optional(),
  ServerName: z.string().describe(
    "The name of the server where the endpoint database resides.",
  ).optional(),
  SslMode: z.string().describe(
    "The Secure Sockets Layer (SSL) mode to use for the SSL connection. The default is none.",
  ).optional(),
  SybaseSettings: z.object({
    SecretsManagerAccessRoleArn: z.string().describe(
      "The full Amazon Resource Name (ARN) of the IAM role that specifies AWS DMS as the trusted entity and grants the required permissions to access the value in SecretsManagerSecret",
    ).optional(),
    SecretsManagerSecretId: z.string().describe(
      "The full ARN, partial ARN, or display name of the SecretsManagerSecret that contains the SAP SAE endpoint connection details.",
    ).optional(),
  }).describe(
    "Settings in JSON format for the source and target SAP ASE endpoint.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "One or more tags to be assigned to the endpoint.",
  ).optional(),
  Username: z.string().describe(
    "The user name to be used to log in to the endpoint database.",
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

/** Swamp extension model for DMS Endpoint. Registered at `@swamp/aws/dms/endpoint`. */
export const model = {
  type: "@swamp/aws/dms/endpoint",
  version: "2026.10.13.1",
  upgrades: [
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "DMS Endpoint resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a DMS Endpoint",
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
          "AWS::DMS::Endpoint",
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
      description: "Get a DMS Endpoint",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DMS Endpoint",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::DMS::Endpoint",
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
      description: "Update a DMS Endpoint",
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
        const identifier = existing.EndpointArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::DMS::Endpoint",
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
          "AWS::DMS::Endpoint",
          identifier,
          currentState,
          desiredState,
          ["KmsKeyId", "ResourceIdentifier", "EndpointUri", "AuthType"],
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
      description: "Delete a DMS Endpoint",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DMS Endpoint",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::DMS::Endpoint",
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
      description: "Sync DMS Endpoint state from AWS",
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
        const identifier = existing.EndpointArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::DMS::Endpoint",
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
      description: "List DMS Endpoint resources",
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
        const { items, nextToken } = await listResources("AWS::DMS::Endpoint", {
          resourceModel: args.resourceModel,
          maxPages: args.maxPages,
          credentials,
        });
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const instanceName =
            (item.properties?.EndpointArn?.toString() ?? item.identifier)
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
