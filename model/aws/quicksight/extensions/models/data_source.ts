// Auto-generated extension model for @swamp/aws/quicksight/data-source
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any no-control-regex

/**
 * Swamp extension model for QuickSight DataSource (AWS::QuickSight::DataSource).
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

const S3TablesParametersSchema = z.object({
  TableBucketArn: z.string().regex(
    new RegExp(
      "^(arn:aws[-a-z0-9]*:[a-z0-9]+:[-a-z0-9]*:[0-9]{12}:bucket/[a-zA-Z0-9-_]{3,63})$",
    ),
  ).optional(),
});

const AuroraPostgreSqlParametersSchema = z.object({
  Port: z.number().min(1).max(65535).describe(
    "The port that Amazon Aurora PostgreSQL is listening on.",
  ),
  Database: z.string().min(1).max(128).describe(
    "The Amazon Aurora PostgreSQL database to connect to.",
  ),
  Host: z.string().min(1).max(256).describe(
    "The Amazon Aurora PostgreSQL-Compatible host to connect to.",
  ),
});

const TeradataParametersSchema = z.object({
  Port: z.number().min(1).max(65535).describe("Port."),
  Database: z.string().min(1).max(128).describe("Database."),
  Host: z.string().min(1).max(256).describe("Host."),
});

const RdsParametersSchema = z.object({
  InstanceId: z.string().min(1).max(64).describe("Instance ID."),
  Database: z.string().min(1).max(128).describe("Database."),
});

const IdentityCenterConfigurationSchema = z.object({
  EnableIdentityPropagation: z.boolean().describe(
    "A Boolean option that controls whether Trusted Identity Propagation should be used.",
  ).optional(),
});

const AthenaParametersSchema = z.object({
  WorkGroup: z.string().min(1).max(128).describe(
    "The workgroup that Amazon Athena uses.",
  ).optional(),
  IdentityCenterConfiguration: IdentityCenterConfigurationSchema.describe(
    "The parameters for an IAM Identity Center configuration.",
  ).optional(),
  RoleArn: z.string().min(20).max(2048).describe(
    "Use the RoleArn structure to override an account-wide role for a specific Athena data source. For example, say an account administrator has turned off all Athena access with an account-wide role. The administrator can then use RoleArn to bypass the account-wide role and allow Athena access for the single Athena data source that is specified in the structure, even if the account-wide role forbidding Athena access is still active.",
  ).optional(),
});

const SparkParametersSchema = z.object({
  Port: z.number().min(1).max(65535).describe("Port."),
  Host: z.string().min(1).max(256).describe("Host."),
});

const MariaDbParametersSchema = z.object({
  Port: z.number().min(1).max(65535).describe("Port."),
  Database: z.string().min(1).max(128).describe("Database."),
  Host: z.string().min(1).max(256).describe("Host."),
});

const OracleParametersSchema = z.object({
  UseServiceName: z.boolean().optional(),
  Port: z.number().min(1).max(65535).describe("The port."),
  Database: z.string().min(1).max(128).describe("The database."),
  Host: z.string().min(1).max(256).describe("An Oracle host."),
});

const PrestoParametersSchema = z.object({
  Port: z.number().min(1).max(65535).describe("Port."),
  Host: z.string().min(1).max(256).describe("Host."),
  Catalog: z.string().min(0).max(128).describe("Catalog."),
});

const VpcConnectionPropertiesSchema = z.object({
  VpcConnectionArn: z.string().describe(
    "The Amazon Resource Name (ARN) for the VPC connection.",
  ),
});

const OAuthParametersSchema = z.object({
  TokenProviderUrl: z.string().min(1).max(2048),
  OAuthScope: z.string().min(1).max(128).optional(),
  IdentityProviderVpcConnectionProperties: VpcConnectionPropertiesSchema
    .describe("VPC connection properties.").optional(),
  IdentityProviderResourceUri: z.string().min(1).max(2048).optional(),
});

const StarburstParametersSchema = z.object({
  Port: z.number().min(1).max(65535).describe(
    "The port for the Starburst data source.",
  ),
  DatabaseAccessControlRole: z.string().min(0).max(128).optional(),
  ProductType: z.enum(["GALAXY", "ENTERPRISE"]).optional(),
  OAuthParameters: OAuthParametersSchema.optional(),
  Host: z.string().min(1).max(256).describe(
    "The host name of the Starburst data source.",
  ),
  Catalog: z.string().min(0).max(128).describe(
    "The catalog name for the Starburst data source.",
  ),
  AuthenticationType: z.enum(["PASSWORD", "TOKEN", "X509", "KEYPAIR"])
    .optional(),
});

const RedshiftIAMParametersSchema = z.object({
  AutoCreateDatabaseUser: z.boolean().describe(
    "Automatically creates a database user. If your database doesn't have a DatabaseUser, set this parameter to True. If there is no DatabaseUser, Amazon QuickSight can't connect to your cluster. The RoleArn that you use for this operation must grant access to redshift:CreateClusterUser to successfully create the user.",
  ).optional(),
  DatabaseUser: z.string().min(1).max(64).describe(
    "The user whose permissions and group memberships will be used by Amazon QuickSight to access the cluster. If this user already exists in your database, Amazon QuickSight is granted the same permissions that the user has. If the user doesn't exist, set the value of AutoCreateDatabaseUser to True to create a new user with PUBLIC permissions.",
  ).optional(),
  RoleArn: z.string().min(20).max(2048).describe(
    "Use the RoleArn structure to allow Amazon QuickSight to call redshift:GetClusterCredentials on your cluster. The calling principal must have iam:PassRole access to pass the role to Amazon QuickSight. The role's trust policy must allow the Amazon QuickSight service principal to assume the role.",
  ),
  DatabaseGroups: z.array(z.string().min(1).max(64)).describe(
    "A list of groups whose permissions will be granted to Amazon QuickSight to access the cluster. These permissions are combined with the permissions granted to Amazon QuickSight by the DatabaseUser. If you choose to include this parameter, the RoleArn must grant access to redshift:JoinGroup.",
  ).optional(),
});

const RedshiftParametersSchema = z.object({
  IAMParameters: RedshiftIAMParametersSchema.describe(
    "A structure that grants Amazon QuickSight access to your cluster and make a call to the redshift:GetClusterCredentials API. For more information on the redshift:GetClusterCredentials API, see  GetClusterCredentials .",
  ).optional(),
  ClusterId: z.string().min(1).max(64).describe(
    "Cluster ID. This field can be blank if the Host and Port are provided.",
  ).optional(),
  Port: z.number().min(0).max(65535).describe(
    "Port. This field can be blank if the ClusterId is provided.",
  ).optional(),
  Database: z.string().min(1).max(128).describe("Database."),
  Host: z.string().min(1).max(256).describe(
    "Host. This field can be blank if ClusterId is provided.",
  ).optional(),
  IdentityCenterConfiguration: IdentityCenterConfigurationSchema.describe(
    "The parameters for an IAM Identity Center configuration.",
  ).optional(),
});

const MySqlParametersSchema = z.object({
  Port: z.number().min(1).max(65535).describe("Port."),
  Database: z.string().min(1).max(128).describe("Database."),
  Host: z.string().min(1).max(256).describe("Host."),
});

const SqlServerParametersSchema = z.object({
  Port: z.number().min(1).max(65535).describe("Port."),
  Database: z.string().min(1).max(128).describe("Database."),
  Host: z.string().min(1).max(256).describe("Host."),
});

const SnowflakeParametersSchema = z.object({
  Warehouse: z.string().min(0).max(128).describe("Warehouse."),
  DatabaseAccessControlRole: z.string().min(0).max(128).optional(),
  Database: z.string().min(1).max(128).describe("Database."),
  OAuthParameters: OAuthParametersSchema.optional(),
  Host: z.string().min(1).max(256).describe("Host."),
  AuthenticationType: z.enum(["PASSWORD", "TOKEN", "X509", "KEYPAIR"])
    .optional(),
});

const AmazonElasticsearchParametersSchema = z.object({
  Domain: z.string().min(1).max(64).describe("The OpenSearch domain."),
});

const AmazonOpenSearchParametersSchema = z.object({
  Domain: z.string().min(1).max(64).describe("The OpenSearch domain."),
});

const PostgreSqlParametersSchema = z.object({
  Port: z.number().min(1).max(65535).describe("Port."),
  Database: z.string().min(1).max(128).describe("Database."),
  Host: z.string().min(1).max(256).describe("Host."),
});

const AuroraParametersSchema = z.object({
  Port: z.number().min(1).max(65535).describe("Port."),
  Database: z.string().min(1).max(128).describe("Database."),
  Host: z.string().min(1).max(256).describe("Host."),
});

const ManifestFileLocationSchema = z.object({
  Bucket: z.string().min(1).max(1024).describe("Amazon S3 bucket."),
  Key: z.string().min(1).max(1024).describe(
    "Amazon S3 key that identifies an object.",
  ),
});

const S3ParametersSchema = z.object({
  ManifestFileLocation: ManifestFileLocationSchema.describe(
    "Amazon S3 manifest file location.",
  ),
  RoleArn: z.string().min(20).max(2048).describe(
    "Use the RoleArn structure to override an account-wide role for a specific S3 data source. For example, say an account administrator has turned off all S3 access with an account-wide role. The administrator can then use RoleArn to bypass the account-wide role and allow S3 access for the single S3 data source that is specified in the structure, even if the account-wide role forbidding S3 access is still active.",
  ).optional(),
});

const TrinoParametersSchema = z.object({
  Port: z.number().min(1).max(65535).describe(
    "The port for the Trino data source.",
  ),
  Host: z.string().min(1).max(256).describe(
    "The host name of the Trino data source.",
  ),
  Catalog: z.string().min(0).max(128).describe(
    "The catalog name for the Trino data source.",
  ),
});

const DatabricksParametersSchema = z.object({
  Port: z.number().min(1).max(65535).describe(
    "The port for the Databricks data source.",
  ),
  Host: z.string().min(1).max(256).describe(
    "The host name of the Databricks data source.",
  ),
  SqlEndpointPath: z.string().min(1).max(4096).describe(
    "The HTTP path of the Databricks data source.",
  ),
});

const DataSourceParametersSchema = z.object({
  S3TablesParameters: S3TablesParametersSchema.optional(),
  AuroraPostgreSqlParameters: AuroraPostgreSqlParametersSchema.describe(
    "Parameters for Amazon Aurora PostgreSQL-Compatible Edition.",
  ).optional(),
  TeradataParameters: TeradataParametersSchema.describe(
    "The parameters for Teradata.",
  ).optional(),
  RdsParameters: RdsParametersSchema.describe("The parameters for Amazon RDS.")
    .optional(),
  AthenaParameters: AthenaParametersSchema.describe(
    "Parameters for Amazon Athena.",
  ).optional(),
  SparkParameters: SparkParametersSchema.describe("The parameters for Spark.")
    .optional(),
  MariaDbParameters: MariaDbParametersSchema.describe(
    "The parameters for MariaDB.",
  ).optional(),
  OracleParameters: OracleParametersSchema.describe(
    "The parameters for Oracle.",
  ).optional(),
  PrestoParameters: PrestoParametersSchema.describe(
    "The parameters for Presto.",
  ).optional(),
  StarburstParameters: StarburstParametersSchema.describe(
    "The parameters that are required to connect to a Starburst data source.",
  ).optional(),
  RedshiftParameters: RedshiftParametersSchema.describe(
    "The parameters for Amazon Redshift. The ClusterId field can be blank if Host and Port are both set. The Host and Port fields can be blank if the ClusterId field is set.",
  ).optional(),
  MySqlParameters: MySqlParametersSchema.describe("The parameters for MySQL.")
    .optional(),
  SqlServerParameters: SqlServerParametersSchema.describe(
    "The parameters for SQL Server.",
  ).optional(),
  SnowflakeParameters: SnowflakeParametersSchema.describe(
    "The parameters for Snowflake.",
  ).optional(),
  AmazonElasticsearchParameters: AmazonElasticsearchParametersSchema.describe(
    "The parameters for OpenSearch.",
  ).optional(),
  AmazonOpenSearchParameters: AmazonOpenSearchParametersSchema.describe(
    "The parameters for OpenSearch.",
  ).optional(),
  PostgreSqlParameters: PostgreSqlParametersSchema.describe(
    "The parameters for PostgreSQL.",
  ).optional(),
  AuroraParameters: AuroraParametersSchema.describe(
    "Parameters for Amazon Aurora.",
  ).optional(),
  S3Parameters: S3ParametersSchema.describe("The parameters for S3.")
    .optional(),
  TrinoParameters: TrinoParametersSchema.describe(
    "The parameters that are required to connect to a Trino data source.",
  ).optional(),
  DatabricksParameters: DatabricksParametersSchema.describe(
    "The parameters that are required to connect to a Databricks data source.",
  ).optional(),
});

const ResourcePermissionSchema = z.object({
  Actions: z.array(z.string()).describe(
    "The IAM action to grant or revoke permissions on.",
  ),
  Resource: z.string().optional(),
  Principal: z.string().min(1).max(256).describe(
    "The Amazon Resource Name (ARN) of the principal. This can be one of the following:   The ARN of an Amazon QuickSight user or group associated with a data source or dataset. (This is common.)   The ARN of an Amazon QuickSight user, group, or namespace associated with an analysis, dashboard, template, or theme. (This is common.)   The ARN of an Amazon Web Services account root: This is an IAM ARN rather than a QuickSight ARN. Use this option only to share resources (templates) across Amazon Web Services accounts. (This is less common.)",
  ),
});

const CredentialPairSchema = z.object({
  AlternateDataSourceParameters: z.array(DataSourceParametersSchema).describe(
    "A set of alternate data source parameters that you want to share for these credentials. The credentials are applied in tandem with the data source parameters when you copy a data source by using a create or update request. The API operation compares the DataSourceParameters structure that's in the request with the structures in the AlternateDataSourceParameters allow list. If the structures are an exact match, the request is allowed to use the new data source with the existing credentials. If the AlternateDataSourceParameters list is null, the DataSourceParameters originally used with these Credentials is automatically allowed.",
  ).optional(),
  Username: z.string().min(1).max(64).describe("User name."),
  Password: z.string().min(1).max(1024).describe("Password."),
});

const KeyPairCredentialsSchema = z.object({
  KeyPairUsername: z.string().min(1).max(64),
  PrivateKey: z.string().min(1600).max(8000).regex(
    new RegExp(
      "^-{5}BEGIN (ENCRYPTED )?PRIVATE KEY-{5}\\u000D?\\u000A([A-Za-z0-9/+]{64}\\u000D?\\u000A)*[A-Za-z0-9/+]{1,64}={0,2}\\u000D?\\u000A-{5}END (ENCRYPTED )?PRIVATE KEY-{5}(\\u000D?\\u000A)?$",
    ),
  ),
  PrivateKeyPassphrase: z.string().min(0).max(256).optional(),
});

const TagSchema = z.object({
  Value: z.string().min(1).max(256).describe("Tag value."),
  Key: z.string().min(1).max(128).describe("Tag key."),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  ErrorInfo: z.object({
    Type: z.enum([
      "ACCESS_DENIED",
      "COPY_SOURCE_NOT_FOUND",
      "TIMEOUT",
      "ENGINE_VERSION_NOT_SUPPORTED",
      "UNKNOWN_HOST",
      "GENERIC_SQL_FAILURE",
      "CONFLICT",
      "UNKNOWN",
    ]).optional(),
    Message: z.string().describe("Error message.").optional(),
  }).describe("Error information for the data source creation or update.")
    .optional(),
  FolderArns: z.array(z.string()).optional(),
  Name: z.string().min(1).max(128),
  DataSourceParameters: z.object({
    S3TablesParameters: S3TablesParametersSchema.optional(),
    AuroraPostgreSqlParameters: AuroraPostgreSqlParametersSchema.describe(
      "Parameters for Amazon Aurora PostgreSQL-Compatible Edition.",
    ).optional(),
    TeradataParameters: TeradataParametersSchema.describe(
      "The parameters for Teradata.",
    ).optional(),
    RdsParameters: RdsParametersSchema.describe(
      "The parameters for Amazon RDS.",
    ).optional(),
    AthenaParameters: AthenaParametersSchema.describe(
      "Parameters for Amazon Athena.",
    ).optional(),
    SparkParameters: SparkParametersSchema.describe("The parameters for Spark.")
      .optional(),
    MariaDbParameters: MariaDbParametersSchema.describe(
      "The parameters for MariaDB.",
    ).optional(),
    OracleParameters: OracleParametersSchema.describe(
      "The parameters for Oracle.",
    ).optional(),
    PrestoParameters: PrestoParametersSchema.describe(
      "The parameters for Presto.",
    ).optional(),
    StarburstParameters: StarburstParametersSchema.describe(
      "The parameters that are required to connect to a Starburst data source.",
    ).optional(),
    RedshiftParameters: RedshiftParametersSchema.describe(
      "The parameters for Amazon Redshift. The ClusterId field can be blank if Host and Port are both set. The Host and Port fields can be blank if the ClusterId field is set.",
    ).optional(),
    MySqlParameters: MySqlParametersSchema.describe("The parameters for MySQL.")
      .optional(),
    SqlServerParameters: SqlServerParametersSchema.describe(
      "The parameters for SQL Server.",
    ).optional(),
    SnowflakeParameters: SnowflakeParametersSchema.describe(
      "The parameters for Snowflake.",
    ).optional(),
    AmazonElasticsearchParameters: AmazonElasticsearchParametersSchema.describe(
      "The parameters for OpenSearch.",
    ).optional(),
    AmazonOpenSearchParameters: AmazonOpenSearchParametersSchema.describe(
      "The parameters for OpenSearch.",
    ).optional(),
    PostgreSqlParameters: PostgreSqlParametersSchema.describe(
      "The parameters for PostgreSQL.",
    ).optional(),
    AuroraParameters: AuroraParametersSchema.describe(
      "Parameters for Amazon Aurora.",
    ).optional(),
    S3Parameters: S3ParametersSchema.describe("The parameters for S3.")
      .optional(),
    TrinoParameters: TrinoParametersSchema.describe(
      "The parameters that are required to connect to a Trino data source.",
    ).optional(),
    DatabricksParameters: DatabricksParametersSchema.describe(
      "The parameters that are required to connect to a Databricks data source.",
    ).optional(),
  }).describe(
    "The parameters that Amazon QuickSight uses to connect to your underlying data source. This is a variant type structure. For this structure to be valid, only one of the attributes can be non-null.",
  ).optional(),
  Type: z.enum([
    "ADOBE_ANALYTICS",
    "AMAZON_ELASTICSEARCH",
    "AMAZON_OPENSEARCH",
    "ATHENA",
    "AURORA",
    "AURORA_POSTGRESQL",
    "AWS_IOT_ANALYTICS",
    "DATABRICKS",
    "DENODO",
    "DREMIO",
    "DYNAMODB",
    "SAPHANA",
    "DB2_AS400",
    "EXASOL",
    "FILE",
    "FULLY_MANAGED_KNOWLEDGE_BASE",
    "GITHUB",
    "INTERNATIONAL_DATA_CORPORATION",
    "JIRA",
    "MARIADB",
    "MYSQL",
    "ORACLE",
    "POSTGRESQL",
    "PRESTO",
    "QBUSINESS",
    "REDSHIFT",
    "S3",
    "S3_TABLES",
    "S3_KNOWLEDGE_BASE",
    "SALESFORCE",
    "SERVICENOW",
    "SNOWFLAKE",
    "SPARK",
    "SPICE",
    "SQLSERVER",
    "TERADATA",
    "TIMESTREAM",
    "TWITTER",
    "BIGQUERY",
    "GOOGLE_ANALYTICS",
    "TRINO",
    "STARBURST",
    "MONGO",
    "MONGO_ATLAS",
    "DOCUMENTDB",
    "APPFLOW",
    "IMPALA",
    "GLUE",
    "GOOGLE_DRIVE",
    "CONFLUENCE",
    "SHAREPOINT",
    "ONE_DRIVE",
    "WEB_CRAWLER",
    "BOX",
    "GOOGLESHEETS",
  ]),
  VpcConnectionProperties: z.object({
    VpcConnectionArn: z.string().describe(
      "The Amazon Resource Name (ARN) for the VPC connection.",
    ),
  }).describe("VPC connection properties.").optional(),
  AlternateDataSourceParameters: z.array(DataSourceParametersSchema).describe(
    "A set of alternate data source parameters that you want to share for the credentials stored with this data source. The credentials are applied in tandem with the data source parameters when you copy a data source by using a create or update request. The API operation compares the DataSourceParameters structure that's in the request with the structures in the AlternateDataSourceParameters allow list. If the structures are an exact match, the request is allowed to use the credentials from this existing data source. If the AlternateDataSourceParameters list is null, the Credentials originally used with this DataSourceParameters are automatically allowed.",
  ).optional(),
  AwsAccountId: z.string().min(12).max(12).regex(new RegExp("^[0-9]{12}$"))
    .optional(),
  Permissions: z.array(ResourcePermissionSchema).optional(),
  SslProperties: z.object({
    DisableSsl: z.boolean().describe(
      "A Boolean option to control whether SSL should be disabled.",
    ).optional(),
  }).describe(
    "Secure Socket Layer (SSL) properties that apply when Amazon QuickSight connects to your underlying data source.",
  ).optional(),
  Credentials: z.object({
    SecretArn: z.string().min(1).max(2048).regex(
      new RegExp(
        "^arn:[-a-z0-9]*:secretsmanager:[-a-z0-9]*:[0-9]{12}:secret:.+$",
      ),
    ).describe(
      "The Amazon Resource Name (ARN) of the secret associated with the data source in Amazon Secrets Manager.",
    ).optional(),
    CopySourceArn: z.string().regex(
      new RegExp(
        "^arn:[-a-z0-9]*:quicksight:[-a-z0-9]*:[0-9]{12}:datasource/.+$",
      ),
    ).describe(
      "The Amazon Resource Name (ARN) of a data source that has the credential pair that you want to use. When CopySourceArn is not null, the credential pair from the data source in the ARN is used as the credentials for the DataSourceCredentials structure.",
    ).optional(),
    CredentialPair: CredentialPairSchema.describe(
      "The combination of user name and password that are used as credentials.",
    ).optional(),
    KeyPairCredentials: KeyPairCredentialsSchema.optional(),
  }).describe(
    "Data source credentials. This is a variant type structure. For this structure to be valid, only one of the attributes can be non-null.",
  ).optional(),
  DataSourceId: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  Status: z.string().optional(),
  CreatedTime: z.string().optional(),
  ErrorInfo: z.object({
    Type: z.string(),
    Message: z.string(),
  }).optional(),
  LastUpdatedTime: z.string().optional(),
  FolderArns: z.array(z.string()).optional(),
  Name: z.string().optional(),
  DataSourceParameters: DataSourceParametersSchema.optional(),
  Type: z.string().optional(),
  VpcConnectionProperties: VpcConnectionPropertiesSchema.optional(),
  AlternateDataSourceParameters: z.array(DataSourceParametersSchema).optional(),
  AwsAccountId: z.string(),
  Permissions: z.array(ResourcePermissionSchema).optional(),
  Arn: z.string().optional(),
  SslProperties: z.object({
    DisableSsl: z.boolean(),
  }).optional(),
  Credentials: z.object({
    SecretArn: z.string(),
    CopySourceArn: z.string(),
    CredentialPair: CredentialPairSchema,
    KeyPairCredentials: KeyPairCredentialsSchema,
  }).optional(),
  DataSourceId: z.string(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  ErrorInfo: z.object({
    Type: z.enum([
      "ACCESS_DENIED",
      "COPY_SOURCE_NOT_FOUND",
      "TIMEOUT",
      "ENGINE_VERSION_NOT_SUPPORTED",
      "UNKNOWN_HOST",
      "GENERIC_SQL_FAILURE",
      "CONFLICT",
      "UNKNOWN",
    ]).optional(),
    Message: z.string().describe("Error message.").optional(),
  }).describe("Error information for the data source creation or update.")
    .optional(),
  FolderArns: z.array(z.string()).optional(),
  Name: z.string().min(1).max(128).optional(),
  DataSourceParameters: z.object({
    S3TablesParameters: S3TablesParametersSchema.optional(),
    AuroraPostgreSqlParameters: AuroraPostgreSqlParametersSchema.describe(
      "Parameters for Amazon Aurora PostgreSQL-Compatible Edition.",
    ).optional(),
    TeradataParameters: TeradataParametersSchema.describe(
      "The parameters for Teradata.",
    ).optional(),
    RdsParameters: RdsParametersSchema.describe(
      "The parameters for Amazon RDS.",
    ).optional(),
    AthenaParameters: AthenaParametersSchema.describe(
      "Parameters for Amazon Athena.",
    ).optional(),
    SparkParameters: SparkParametersSchema.describe("The parameters for Spark.")
      .optional(),
    MariaDbParameters: MariaDbParametersSchema.describe(
      "The parameters for MariaDB.",
    ).optional(),
    OracleParameters: OracleParametersSchema.describe(
      "The parameters for Oracle.",
    ).optional(),
    PrestoParameters: PrestoParametersSchema.describe(
      "The parameters for Presto.",
    ).optional(),
    StarburstParameters: StarburstParametersSchema.describe(
      "The parameters that are required to connect to a Starburst data source.",
    ).optional(),
    RedshiftParameters: RedshiftParametersSchema.describe(
      "The parameters for Amazon Redshift. The ClusterId field can be blank if Host and Port are both set. The Host and Port fields can be blank if the ClusterId field is set.",
    ).optional(),
    MySqlParameters: MySqlParametersSchema.describe("The parameters for MySQL.")
      .optional(),
    SqlServerParameters: SqlServerParametersSchema.describe(
      "The parameters for SQL Server.",
    ).optional(),
    SnowflakeParameters: SnowflakeParametersSchema.describe(
      "The parameters for Snowflake.",
    ).optional(),
    AmazonElasticsearchParameters: AmazonElasticsearchParametersSchema.describe(
      "The parameters for OpenSearch.",
    ).optional(),
    AmazonOpenSearchParameters: AmazonOpenSearchParametersSchema.describe(
      "The parameters for OpenSearch.",
    ).optional(),
    PostgreSqlParameters: PostgreSqlParametersSchema.describe(
      "The parameters for PostgreSQL.",
    ).optional(),
    AuroraParameters: AuroraParametersSchema.describe(
      "Parameters for Amazon Aurora.",
    ).optional(),
    S3Parameters: S3ParametersSchema.describe("The parameters for S3.")
      .optional(),
    TrinoParameters: TrinoParametersSchema.describe(
      "The parameters that are required to connect to a Trino data source.",
    ).optional(),
    DatabricksParameters: DatabricksParametersSchema.describe(
      "The parameters that are required to connect to a Databricks data source.",
    ).optional(),
  }).describe(
    "The parameters that Amazon QuickSight uses to connect to your underlying data source. This is a variant type structure. For this structure to be valid, only one of the attributes can be non-null.",
  ).optional(),
  Type: z.enum([
    "ADOBE_ANALYTICS",
    "AMAZON_ELASTICSEARCH",
    "AMAZON_OPENSEARCH",
    "ATHENA",
    "AURORA",
    "AURORA_POSTGRESQL",
    "AWS_IOT_ANALYTICS",
    "DATABRICKS",
    "DENODO",
    "DREMIO",
    "DYNAMODB",
    "SAPHANA",
    "DB2_AS400",
    "EXASOL",
    "FILE",
    "FULLY_MANAGED_KNOWLEDGE_BASE",
    "GITHUB",
    "INTERNATIONAL_DATA_CORPORATION",
    "JIRA",
    "MARIADB",
    "MYSQL",
    "ORACLE",
    "POSTGRESQL",
    "PRESTO",
    "QBUSINESS",
    "REDSHIFT",
    "S3",
    "S3_TABLES",
    "S3_KNOWLEDGE_BASE",
    "SALESFORCE",
    "SERVICENOW",
    "SNOWFLAKE",
    "SPARK",
    "SPICE",
    "SQLSERVER",
    "TERADATA",
    "TIMESTREAM",
    "TWITTER",
    "BIGQUERY",
    "GOOGLE_ANALYTICS",
    "TRINO",
    "STARBURST",
    "MONGO",
    "MONGO_ATLAS",
    "DOCUMENTDB",
    "APPFLOW",
    "IMPALA",
    "GLUE",
    "GOOGLE_DRIVE",
    "CONFLUENCE",
    "SHAREPOINT",
    "ONE_DRIVE",
    "WEB_CRAWLER",
    "BOX",
    "GOOGLESHEETS",
  ]).optional(),
  VpcConnectionProperties: z.object({
    VpcConnectionArn: z.string().describe(
      "The Amazon Resource Name (ARN) for the VPC connection.",
    ).optional(),
  }).describe("VPC connection properties.").optional(),
  AlternateDataSourceParameters: z.array(DataSourceParametersSchema).describe(
    "A set of alternate data source parameters that you want to share for the credentials stored with this data source. The credentials are applied in tandem with the data source parameters when you copy a data source by using a create or update request. The API operation compares the DataSourceParameters structure that's in the request with the structures in the AlternateDataSourceParameters allow list. If the structures are an exact match, the request is allowed to use the credentials from this existing data source. If the AlternateDataSourceParameters list is null, the Credentials originally used with this DataSourceParameters are automatically allowed.",
  ).optional(),
  AwsAccountId: z.string().min(12).max(12).regex(new RegExp("^[0-9]{12}$"))
    .optional(),
  Permissions: z.array(ResourcePermissionSchema).optional(),
  SslProperties: z.object({
    DisableSsl: z.boolean().describe(
      "A Boolean option to control whether SSL should be disabled.",
    ).optional(),
  }).describe(
    "Secure Socket Layer (SSL) properties that apply when Amazon QuickSight connects to your underlying data source.",
  ).optional(),
  Credentials: z.object({
    SecretArn: z.string().min(1).max(2048).regex(
      new RegExp(
        "^arn:[-a-z0-9]*:secretsmanager:[-a-z0-9]*:[0-9]{12}:secret:.+$",
      ),
    ).describe(
      "The Amazon Resource Name (ARN) of the secret associated with the data source in Amazon Secrets Manager.",
    ).optional(),
    CopySourceArn: z.string().regex(
      new RegExp(
        "^arn:[-a-z0-9]*:quicksight:[-a-z0-9]*:[0-9]{12}:datasource/.+$",
      ),
    ).describe(
      "The Amazon Resource Name (ARN) of a data source that has the credential pair that you want to use. When CopySourceArn is not null, the credential pair from the data source in the ARN is used as the credentials for the DataSourceCredentials structure.",
    ).optional(),
    CredentialPair: CredentialPairSchema.describe(
      "The combination of user name and password that are used as credentials.",
    ).optional(),
    KeyPairCredentials: KeyPairCredentialsSchema.optional(),
  }).describe(
    "Data source credentials. This is a variant type structure. For this structure to be valid, only one of the attributes can be non-null.",
  ).optional(),
  DataSourceId: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
});

/** Swamp extension model for QuickSight DataSource. Registered at `@swamp/aws/quicksight/data-source`. */
export const model = {
  type: "@swamp/aws/quicksight/data-source",
  version: "2026.05.15.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.01.2",
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
      toVersion: "2026.04.03.3",
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
      description: "QuickSight DataSource resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a QuickSight DataSource",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::QuickSight::DataSource",
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
      description: "Get a QuickSight DataSource",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the QuickSight DataSource",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::QuickSight::DataSource",
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
      description: "Update a QuickSight DataSource",
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
        const idParts = [
          existing.AwsAccountId?.toString(),
          existing.DataSourceId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::QuickSight::DataSource",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::QuickSight::DataSource",
          identifier,
          currentState,
          desiredState,
          ["AwsAccountId", "DataSourceId", "Type"],
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
      description: "Delete a QuickSight DataSource",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the QuickSight DataSource",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::QuickSight::DataSource",
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
      description: "Sync QuickSight DataSource state from AWS",
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
        const idParts = [
          existing.AwsAccountId?.toString(),
          existing.DataSourceId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::QuickSight::DataSource",
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
