// Auto-generated extension model for @swamp/aws/rds/dbcluster
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for RDS DBCluster (AWS::RDS::DBCluster).
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
import {
  DescribeDBClustersCommand,
  DescribeDBInstancesCommand,
  RDSClient,
} from "npm:@aws-sdk/client-rds@3.1021.0";

const DBClusterRoleSchema = z.object({
  FeatureName: z.string().describe(
    "The name of the feature associated with the AWS Identity and Access Management (IAM) role. IAM roles that are associated with a DB cluster grant permission for the DB cluster to access other AWS services on your behalf. For the list of supported feature names, see the SupportedFeatureNames description in [DBEngineVersion](https://docs.aws.amazon.com/AmazonRDS/latest/APIReference/API_DBEngineVersion.html) in the *Amazon RDS API Reference*.",
  ).optional(),
  RoleArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the IAM role that is associated with the DB cluster.",
  ),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe(
    "A key is the required name of the tag. The string value can be from 1 to 128 Unicode characters in length and can't be prefixed with aws: or rds:. The string can only contain only the set of Unicode letters, digits, white-space, '_', '.', ':', '/', '=', '+', '-', '@' (Java regex: \"^([\\\\p{L}\\\\p{Z}\\\\p{N}_.:/=+\\\\-@]*)$\").",
  ),
  Value: z.string().min(0).max(256).describe(
    "A value is the optional value of the tag. The string value can be from 1 to 256 Unicode characters in length and can't be prefixed with aws: or rds:. The string can only contain only the set of Unicode letters, digits, white-space, '_', '.', ':', '/', '=', '+', '-', '@' (Java regex: \"^([\\\\p{L}\\\\p{Z}\\\\p{N}_.:/=+\\\\-@]*)$\").",
  ).optional(),
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
  AllocatedStorage: z.number().int().describe(
    "The amount of storage in gibibytes (GiB) to allocate to each DB instance in the Multi-AZ DB cluster. Valid for Cluster Type: Multi-AZ DB clusters only This setting is required to create a Multi-AZ DB cluster.",
  ).optional(),
  AssociatedRoles: z.array(DBClusterRoleSchema).describe(
    "Provides a list of the AWS Identity and Access Management (IAM) roles that are associated with the DB cluster. IAM roles that are associated with a DB cluster grant permission for the DB cluster to access other Amazon Web Services on your behalf. Valid for: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
  AvailabilityZones: z.array(z.string()).describe(
    "A list of Availability Zones (AZs) where instances in the DB cluster can be created. For information on AWS Regions and Availability Zones, see [Choosing the Regions and Availability Zones](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Concepts.RegionsAndAvailabilityZones.html) in the *Amazon Aurora User Guide*. Valid for: Aurora DB clusters only",
  ).optional(),
  AutoMinorVersionUpgrade: z.boolean().describe(
    "Specifies whether minor engine upgrades are applied automatically to the DB cluster during the maintenance window. By default, minor engine upgrades are applied automatically. Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB cluster. For more information about automatic minor version upgrades, see [Automatically upgrading the minor engine version](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_UpgradeDBInstance.Upgrading.html#USER_UpgradeDBInstance.Upgrading.AutoMinorVersionUpgrades).",
  ).optional(),
  BacktrackWindow: z.number().int().min(0).describe(
    "The target backtrack window, in seconds. To disable backtracking, set this value to 0. Valid for Cluster Type: Aurora MySQL DB clusters only Default: 0 Constraints: If specified, this value must be set to a number from 0 to 259,200 (72 hours).",
  ).optional(),
  BackupRetentionPeriod: z.number().int().min(1).describe(
    "The number of days for which automated backups are retained. Default: 1 Constraints: Must be a value from 1 to 35 Valid for: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
  ClusterScalabilityType: z.string().describe(
    "Specifies the scalability mode of the Aurora DB cluster. When set to limitless, the cluster operates as an Aurora Limitless Database, allowing you to create a DB shard group for horizontal scaling (sharding) capabilities. When set to standard (the default), the cluster uses normal DB instance creation. *Important:* Automated backup retention isn't supported with Aurora Limitless Database clusters. If you set this property to limitless, you cannot set DeleteAutomatedBackups to false. To create a backup, use manual snapshots instead.",
  ).optional(),
  CopyTagsToSnapshot: z.boolean().describe(
    "A value that indicates whether to copy all tags from the DB cluster to snapshots of the DB cluster. The default is not to copy them. Valid for: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
  DatabaseInsightsMode: z.string().describe(
    "The mode of Database Insights to enable for the DB cluster. If you set this value to advanced, you must also set the PerformanceInsightsEnabled parameter to true and the PerformanceInsightsRetentionPeriod parameter to 465. Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
  DatabaseName: z.string().describe(
    "The name of your database. If you don't provide a name, then Amazon RDS won't create a database in this DB cluster. For naming constraints, see [Naming Constraints](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_Limits.html#RDS_Limits.Constraints) in the *Amazon Aurora User Guide*. Valid for: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
  DBClusterInstanceClass: z.string().describe(
    "The compute and memory capacity of each DB instance in the Multi-AZ DB cluster, for example db.m6gd.xlarge. Not all DB instance classes are available in all AWS-Regions, or for all database engines. For the full list of DB instance classes and availability for your engine, see [DB instance class](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.DBInstanceClass.html) in the *Amazon RDS User Guide*. This setting is required to create a Multi-AZ DB cluster. Valid for Cluster Type: Multi-AZ DB clusters only",
  ).optional(),
  DBInstanceParameterGroupName: z.string().describe(
    "The name of the DB parameter group to apply to all instances of the DB cluster. When you apply a parameter group using the DBInstanceParameterGroupName parameter, the DB cluster isn't rebooted automatically. Also, parameter changes are applied immediately rather than during the next maintenance window. Valid for Cluster Type: Aurora DB clusters only Default: The existing name setting Constraints: The DB parameter group must be in the same DB parameter group family as this DB cluster. The DBInstanceParameterGroupName parameter is valid in combination with the AllowMajorVersionUpgrade parameter for a major version upgrade only.",
  ).optional(),
  DBSystemId: z.string().describe("Reserved for future use.").optional(),
  GlobalClusterIdentifier: z.string().min(0).max(63).regex(
    new RegExp("^$|^[a-zA-Z]{1}(?:-?[a-zA-Z0-9]){0,62}$"),
  ).describe(
    "If you are configuring an Aurora global database cluster and want your Aurora DB cluster to be a secondary member in the global database cluster, specify the global cluster ID of the global database cluster. To define the primary database cluster of the global cluster, use the [AWS::RDS::GlobalCluster](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-globalcluster.html) resource. If you aren't configuring a global database cluster, don't specify this property. To remove the DB cluster from a global database cluster, specify an empty value for the GlobalClusterIdentifier property. For information about Aurora global databases, see [Working with Amazon Aurora Global Databases](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html) in the *Amazon Aurora User Guide*. Valid for: Aurora DB clusters only",
  ).optional(),
  DBClusterIdentifier: z.string().min(1).max(63).regex(
    new RegExp("^[a-zA-Z]{1}(?:-?[a-zA-Z0-9]){0,62}$"),
  ).describe(
    "The DB cluster identifier. This parameter is stored as a lowercase string. Constraints: Must contain from 1 to 63 letters, numbers, or hyphens. First character must be a letter. Can't end with a hyphen or contain two consecutive hyphens. Example: my-cluster1 Valid for: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
  DBClusterParameterGroupName: z.string().describe(
    'The name of the DB cluster parameter group to associate with this DB cluster. If you apply a parameter group to an existing DB cluster, then its DB instances might need to reboot. This can result in an outage while the DB instances are rebooting. If you apply a change to parameter group associated with a stopped DB cluster, then the update stack waits until the DB cluster is started. To list all of the available DB cluster parameter group names, use the following command: aws rds describe-db-cluster-parameter-groups --query "DBClusterParameterGroups[].DBClusterParameterGroupName" --output text Valid for: Aurora DB clusters and Multi-AZ DB clusters',
  ).optional(),
  DBSubnetGroupName: z.string().describe(
    "A DB subnet group that you want to associate with this DB cluster. If you are restoring a DB cluster to a point in time with RestoreType set to copy-on-write, and don't specify a DB subnet group name, then the DB cluster is restored with a default DB subnet group. Valid for: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
  DeleteAutomatedBackups: z.boolean().describe(
    "Specifies whether to remove automated backups immediately after the DB cluster is deleted. This parameter isn't case-sensitive. The default is to remove automated backups immediately after the DB cluster is deleted, unless the AWS Backup policy specifies a point-in-time restore rule.",
  ).optional(),
  DeletionProtection: z.boolean().describe(
    "A value that indicates whether the DB cluster has deletion protection enabled. The database can't be deleted when deletion protection is enabled. By default, deletion protection is disabled. Valid for: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
  Domain: z.string().describe(
    "Indicates the directory ID of the Active Directory to create the DB cluster. For Amazon Aurora DB clusters, Amazon RDS can use Kerberos authentication to authenticate users that connect to the DB cluster. For more information, see [Kerberos authentication](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/kerberos-authentication.html) in the *Amazon Aurora User Guide*. Valid for: Aurora DB clusters only",
  ).optional(),
  DomainIAMRoleName: z.string().describe(
    "Specifies the name of the IAM role to use when making API calls to the Directory Service. Valid for: Aurora DB clusters only",
  ).optional(),
  EnableCloudwatchLogsExports: z.array(z.string()).describe(
    "The list of log types that need to be enabled for exporting to CloudWatch Logs. The values in the list depend on the DB engine being used. For more information, see [Publishing Database Logs to Amazon CloudWatch Logs](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_LogAccess.html#USER_LogAccess.Procedural.UploadtoCloudWatch) in the *Amazon Aurora User Guide*. *Aurora MySQL* Valid values: audit, error, general, slowquery *Aurora PostgreSQL* Valid values: postgresql Valid for: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
  EnableGlobalWriteForwarding: z.boolean().describe(
    "Specifies whether to enable this DB cluster to forward write operations to the primary cluster of a global cluster (Aurora global database). By default, write operations are not allowed on Aurora DB clusters that are secondary clusters in an Aurora global database. You can set this value only on Aurora DB clusters that are members of an Aurora global database. With this parameter enabled, a secondary cluster can forward writes to the current primary cluster, and the resulting changes are replicated back to this cluster. For the primary DB cluster of an Aurora global database, this value is used immediately if the primary is demoted by a global cluster API operation, but it does nothing until then. Valid for Cluster Type: Aurora DB clusters only",
  ).optional(),
  EnableHttpEndpoint: z.boolean().describe(
    "Specifies whether to enable the HTTP endpoint for the DB cluster. By default, the HTTP endpoint isn't enabled. When enabled, the HTTP endpoint provides a connectionless web service API (RDS Data API) for running SQL queries on the DB cluster. You can also query your database from inside the RDS console with the RDS query editor. For more information, see [Using RDS Data API](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/data-api.html) in the *Amazon Aurora User Guide*. Valid for Cluster Type: Aurora DB clusters only",
  ).optional(),
  EnableIAMDatabaseAuthentication: z.boolean().describe(
    "A value that indicates whether to enable mapping of AWS Identity and Access Management (IAM) accounts to database accounts. By default, mapping is disabled. For more information, see [IAM Database Authentication](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/UsingWithRDS.IAMDBAuth.html) in the *Amazon Aurora User Guide.* Valid for: Aurora DB clusters only",
  ).optional(),
  EnableLocalWriteForwarding: z.boolean().describe(
    "Specifies whether read replicas can forward write operations to the writer DB instance in the DB cluster. By default, write operations aren't allowed on reader DB instances. Valid for: Aurora DB clusters only",
  ).optional(),
  Engine: z.string().describe(
    "The name of the database engine to be used for this DB cluster. Valid Values: aurora-mysql aurora-postgresql mysql postgres Valid for: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
  EngineLifecycleSupport: z.string().describe(
    "The life cycle type for this DB cluster. By default, this value is set to open-source-rds-extended-support, which enrolls your DB cluster into Amazon RDS Extended Support. At the end of standard support, you can avoid charges for Extended Support by setting the value to open-source-rds-extended-support-disabled. In this case, creating the DB cluster will fail if the DB major version is past its end of standard support date. You can use this setting to enroll your DB cluster into Amazon RDS Extended Support. With RDS Extended Support, you can run the selected major engine version on your DB cluster past the end of standard support for that engine version. For more information, see the following sections: Amazon Aurora - [Amazon RDS Extended Support with Amazon Aurora](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/extended-support.html) in the *Amazon Aurora User Guide* Amazon RDS - [Amazon RDS Extended Support with Amazon RDS](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/extended-support.html) in the *Amazon RDS User Guide* Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB clusters Valid Values: open-source-rds-extended-support | open-source-rds-extended-support-disabled Default: open-source-rds-extended-support",
  ).optional(),
  EngineMode: z.string().describe(
    "The DB engine mode of the DB cluster, either provisioned or serverless. The serverless engine mode only applies for Aurora Serverless v1 DB clusters. Aurora Serverless v2 DB clusters use the provisioned engine mode. For information about limitations and requirements for Serverless DB clusters, see the following sections in the *Amazon Aurora User Guide*: [Limitations of Aurora Serverless v1](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless.html#aurora-serverless.limitations) [Requirements for Aurora Serverless v2](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.requirements.html) Valid for Cluster Type: Aurora DB clusters only",
  ).optional(),
  EngineVersion: z.string().describe(
    'The version number of the database engine to use. Don\'t use this property if your DB cluster is a member of a global database cluster. Instead, specify the EngineVersion property on the [AWS::RDS::GlobalCluster](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-globalcluster.html) resource. Major version upgrades aren\'t supported for individual members of a global cluster. Use ModifyGlobalCluster to upgrade all members of the global cluster. To list all of the available engine versions for Aurora MySQL version 2 (5.7-compatible) and version 3 (8.0-compatible), use the following command: aws rds describe-db-engine-versions --engine aurora-mysql --query "DBEngineVersions[].EngineVersion" You can supply either 5.7 or 8.0 to use the default engine version for Aurora MySQL version 2 or version 3, respectively. To list all of the available engine versions for Aurora PostgreSQL, use the following command: aws rds describe-db-engine-versions --engine aurora-postgresql --query "DBEngineVersions[].EngineVersion" To list all of the available engine versions for RDS for MySQL, use the following command: aws rds describe-db-engine-versions --engine mysql --query "DBEngineVersions[].EngineVersion" To list all of the available engine versions for RDS for PostgreSQL, use the following command: aws rds describe-db-engine-versions --engine postgres --query "DBEngineVersions[].EngineVersion" *Aurora MySQL* For information, see [Database engine updates for Amazon Aurora MySQL](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/AuroraMySQL.Updates.html) in the *Amazon Aurora User Guide*. *Aurora PostgreSQL* For information, see [Amazon Aurora PostgreSQL releases and engine versions](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/AuroraPostgreSQL.Updates.20180305.html) in the *Amazon Aurora User Guide*. *MySQL* For information, see [Amazon RDS for MySQL](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_MySQL.html#MySQL.Concepts.VersionMgmt) in the *Amazon RDS User Guide*. *PostgreSQL* For information, see [Amazon RDS for PostgreSQL](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_PostgreSQL.html#PostgreSQL.Concepts) in the *Amazon RDS User Guide*. Valid for: Aurora DB clusters and Multi-AZ DB clusters',
  ).optional(),
  ManageMasterUserPassword: z.boolean().describe(
    "Specifies whether to manage the master user password with AWS Secrets Manager. For more information, see [Password management with Secrets Manager](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-secrets-manager.html) in the *Amazon RDS User Guide* and [Password management with Secrets Manager](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/rds-secrets-manager.html) in the *Amazon Aurora User Guide.* Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB clusters Constraints: Can't manage the master user password with AWS Secrets Manager if MasterUserPassword is specified.",
  ).optional(),
  Iops: z.number().int().describe(
    "The amount of Provisioned IOPS (input/output operations per second) to be initially allocated for each DB instance in the Multi-AZ DB cluster. For information about valid IOPS values, see [Provisioned IOPS storage](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_Storage.html#USER_PIOPS) in the *Amazon RDS User Guide*. This setting is required to create a Multi-AZ DB cluster. Valid for Cluster Type: Multi-AZ DB clusters only Constraints: Must be a multiple between.5 and 50 of the storage amount for the DB cluster.",
  ).optional(),
  KmsKeyId: z.string().describe(
    "The Amazon Resource Name (ARN) of the AWS KMS key that is used to encrypt the database instances in the DB cluster, such as arn:aws:kms:us-east-1:012345678910:key/abcd1234-a123-456a-a12b-a123b4cd56ef. If you enable the StorageEncrypted property but don't specify this property, the default KMS key is used. If you specify this property, you must set the StorageEncrypted property to true. If you specify the SnapshotIdentifier property, the StorageEncrypted property value is inherited from the snapshot, and if the DB cluster is encrypted, the specified KmsKeyId property is used. If you create a read replica of an encrypted DB cluster in another AWS Region, make sure to set KmsKeyId to a KMS key identifier that is valid in the destination AWS Region. This KMS key is used to encrypt the read replica in that AWS Region. Valid for: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
  MasterUserAuthenticationType: z.string().describe(
    "Specifies the authentication type for the master user. With IAM master user authentication, you can configure the master DB user with IAM database authentication when you create a DB cluster. You can specify one of the following values: password - Use standard database authentication with a password. iam-db-auth - Use IAM database authentication for the master user. Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB clusters This option is only valid for RDS for MySQL, RDS for MariaDB, RDS for PostgreSQL, Aurora MySQL, and Aurora PostgreSQL engines.",
  ).optional(),
  MasterUsername: z.string().min(1).regex(
    new RegExp("^[a-zA-Z]{1}[a-zA-Z0-9_]*$"),
  ).describe(
    "The name of the master user for the DB cluster. If you specify the SourceDBClusterIdentifier, SnapshotIdentifier, or GlobalClusterIdentifier property, don't specify this property. The value is inherited from the source DB cluster, the snapshot, or the primary DB cluster for the global database cluster, respectively. Valid for: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
  MasterUserPassword: z.string().describe(
    "The master password for the DB instance. If you specify the SourceDBClusterIdentifier, SnapshotIdentifier, or GlobalClusterIdentifier property, don't specify this property. The value is inherited from the source DB cluster, the snapshot, or the primary DB cluster for the global database cluster, respectively. Valid for: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
  MasterUserSecret: z.object({
    KmsKeyId: z.string().describe(
      "The AWS KMS key identifier that is used to encrypt the secret.",
    ).optional(),
  }).describe(
    "The secret managed by RDS in AWS Secrets Manager for the master user password. When you restore a DB cluster from a snapshot, Amazon RDS generates a new secret instead of reusing the secret specified in the SecretArn property. This ensures that the restored DB cluster is securely managed with a dedicated secret. To maintain consistent integration with your application, you might need to update resource configurations to reference the newly created secret. For more information, see [Password management with Secrets Manager](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-secrets-manager.html) in the *Amazon RDS User Guide* and [Password management with Secrets Manager](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/rds-secrets-manager.html) in the *Amazon Aurora User Guide.*",
  ).optional(),
  MonitoringInterval: z.number().int().describe(
    "The interval, in seconds, between points when Enhanced Monitoring metrics are collected for the DB cluster. To turn off collecting Enhanced Monitoring metrics, specify 0. If MonitoringRoleArn is specified, also set MonitoringInterval to a value other than 0. Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB clusters Valid Values: 0 | 1 | 5 | 10 | 15 | 30 | 60 Default: 0",
  ).optional(),
  MonitoringRoleArn: z.string().describe(
    "The Amazon Resource Name (ARN) for the IAM role that permits RDS to send Enhanced Monitoring metrics to Amazon CloudWatch Logs. An example is arn:aws:iam:123456789012:role/emaccess. For information on creating a monitoring role, see [Setting up and enabling Enhanced Monitoring](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_Monitoring.OS.html#USER_Monitoring.OS.Enabling) in the *Amazon RDS User Guide*. If MonitoringInterval is set to a value other than 0, supply a MonitoringRoleArn value. Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
  NetworkType: z.string().describe(
    "The network type of the DB cluster. Valid values: IPV4 DUAL The network type is determined by the DBSubnetGroup specified for the DB cluster. A DBSubnetGroup can support only the IPv4 protocol or the IPv4 and IPv6 protocols ( DUAL). For more information, see [Working with a DB instance in a VPC](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_VPC.WorkingWithRDSInstanceinaVPC.html) in the *Amazon Aurora User Guide.* Valid for: Aurora DB clusters only",
  ).optional(),
  PerformanceInsightsEnabled: z.boolean().describe(
    "Specifies whether to turn on Performance Insights for the DB cluster. For more information, see [Using Amazon Performance Insights](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PerfInsights.html) in the *Amazon RDS User Guide*. Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
  PerformanceInsightsKmsKeyId: z.string().describe(
    "The AWS KMS key identifier for encryption of Performance Insights data. The AWS KMS key identifier is the key ARN, key ID, alias ARN, or alias name for the KMS key. If you don't specify a value for PerformanceInsightsKMSKeyId, then Amazon RDS uses your default KMS key. There is a default KMS key for your AWS-account. Your AWS-account has a different default KMS key for each AWS-Region. Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
  PerformanceInsightsRetentionPeriod: z.number().int().describe(
    "The number of days to retain Performance Insights data. When creating a DB cluster without enabling Performance Insights, you can't specify the parameter PerformanceInsightsRetentionPeriod. Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB clusters Valid Values: 7 *month* * 31, where *month* is a number of months from 1-23. Examples: 93 (3 months * 31), 341 (11 months * 31), 589 (19 months * 31) 731 Default: 7 days If you specify a retention period that isn't valid, such as 94, Amazon RDS issues an error.",
  ).optional(),
  PreferredBackupWindow: z.string().describe(
    "The daily time range during which automated backups are created. For more information, see [Backup Window](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Managing.Backups.html#Aurora.Managing.Backups.BackupWindow) in the *Amazon Aurora User Guide.* Constraints: Must be in the format hh24:mi-hh24:mi. Must be in Universal Coordinated Time (UTC). Must not conflict with the preferred maintenance window. Must be at least 30 minutes. Valid for: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
  PreferredMaintenanceWindow: z.string().describe(
    "The weekly time range during which system maintenance can occur, in Universal Coordinated Time (UTC). Format: ddd:hh24:mi-ddd:hh24:mi The default is a 30-minute window selected at random from an 8-hour block of time for each AWS Region, occurring on a random day of the week. To see the time blocks available, see [Maintaining an Amazon Aurora DB cluster](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_UpgradeDBInstance.Maintenance.html#AdjustingTheMaintenanceWindow.Aurora) in the *Amazon Aurora User Guide.* Valid Days: Mon, Tue, Wed, Thu, Fri, Sat, Sun. Constraints: Minimum 30-minute window. Valid for: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
  PubliclyAccessible: z.boolean().describe(
    "Specifies whether the DB cluster is publicly accessible. Valid for Cluster Type: Multi-AZ DB clusters only When the DB cluster is publicly accessible and you connect from outside of the DB cluster's virtual private cloud (VPC), its domain name system (DNS) endpoint resolves to the public IP address. When you connect from within the same VPC as the DB cluster, the endpoint resolves to the private IP address. Access to the DB cluster is controlled by its security group settings. When the DB cluster isn't publicly accessible, it is an internal DB cluster with a DNS name that resolves to a private IP address. The default behavior when PubliclyAccessible is not specified depends on whether a DBSubnetGroup is specified. If DBSubnetGroup isn't specified, PubliclyAccessible defaults to true. If DBSubnetGroup is specified, PubliclyAccessible defaults to false unless the value of DBSubnetGroup is default, in which case PubliclyAccessible defaults to true. If PubliclyAccessible is true and the VPC that the DBSubnetGroup is in doesn't have an internet gateway attached to it, Amazon RDS returns an error.",
  ).optional(),
  ReplicationSourceIdentifier: z.string().describe(
    "The Amazon Resource Name (ARN) of the source DB instance or DB cluster if this DB cluster is created as a read replica. Valid for: Aurora DB clusters only",
  ).optional(),
  RestoreToTime: z.string().describe(
    "The date and time to restore the DB cluster to. Valid Values: Value must be a time in Universal Coordinated Time (UTC) format Constraints: Must be before the latest restorable time for the DB instance Must be specified if UseLatestRestorableTime parameter isn't provided Can't be specified if the UseLatestRestorableTime parameter is enabled Can't be specified if the RestoreType parameter is copy-on-write This property must be used with SourceDBClusterIdentifier property. The resulting cluster will have the identifier that matches the value of the DBclusterIdentifier property. Example: 2015-03-07T23:45:00Z Valid for: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
  RestoreType: z.string().describe(
    "The type of restore to be performed. You can specify one of the following values: full-copy - The new DB cluster is restored as a full copy of the source DB cluster. copy-on-write - The new DB cluster is restored as a clone of the source DB cluster. If you don't specify a RestoreType value, then the new DB cluster is restored as a full copy of the source DB cluster. Valid for: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
  ServerlessV2ScalingConfiguration: z.object({
    MinCapacity: z.number().describe(
      "The minimum number of Aurora capacity units (ACUs) for a DB instance in an Aurora Serverless v2 cluster. You can specify ACU values in half-step increments, such as 8, 8.5, 9, and so on. For Aurora versions that support the Aurora Serverless v2 auto-pause feature, the smallest value that you can use is 0. For versions that don't support Aurora Serverless v2 auto-pause, the smallest value that you can use is 0.5.",
    ).optional(),
    MaxCapacity: z.number().describe(
      "The maximum number of Aurora capacity units (ACUs) for a DB instance in an Aurora Serverless v2 cluster. You can specify ACU values in half-step increments, such as 40, 40.5, 41, and so on. The largest value that you can use is 128. The maximum capacity must be higher than 0.5 ACUs. For more information, see [Choosing the maximum Aurora Serverless v2 capacity setting for a cluster](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.setting-capacity.html#aurora-serverless-v2.max_capacity_considerations) in the *Amazon Aurora User Guide*. Aurora automatically sets certain parameters for Aurora Serverless V2 DB instances to values that depend on the maximum ACU value in the capacity range. When you update the maximum capacity value, the ParameterApplyStatus value for the DB instance changes to pending-reboot. You can update the parameter values by rebooting the DB instance after changing the capacity range.",
    ).optional(),
    SecondsUntilAutoPause: z.number().int().describe(
      "Specifies the number of seconds an Aurora Serverless v2 DB instance must be idle before Aurora attempts to automatically pause it. Specify a value between 300 seconds (five minutes) and 86,400 seconds (one day). The default is 300 seconds.",
    ).optional(),
  }).describe(
    "The scaling configuration of an Aurora Serverless V2 DB cluster. This property is only supported for Aurora Serverless v2. For Aurora Serverless v1, Use the ScalingConfiguration property. Valid for: Aurora Serverless v2 DB clusters only",
  ).optional(),
  ScalingConfiguration: z.object({
    AutoPause: z.boolean().describe(
      "Indicates whether to allow or disallow automatic pause for an Aurora DB cluster in serverless DB engine mode. A DB cluster can be paused only when it's idle (it has no connections). If a DB cluster is paused for more than seven days, the DB cluster might be backed up with a snapshot. In this case, the DB cluster is restored when there is a request to connect to it.",
    ).optional(),
    MaxCapacity: z.number().int().describe(
      "The maximum capacity for an Aurora DB cluster in serverless DB engine mode. For Aurora MySQL, valid capacity values are 1, 2, 4, 8, 16, 32, 64, 128, and 256. For Aurora PostgreSQL, valid capacity values are 2, 4, 8, 16, 32, 64, 192, and 384. The maximum capacity must be greater than or equal to the minimum capacity.",
    ).optional(),
    MinCapacity: z.number().int().describe(
      "The minimum capacity for an Aurora DB cluster in serverless DB engine mode. For Aurora MySQL, valid capacity values are 1, 2, 4, 8, 16, 32, 64, 128, and 256. For Aurora PostgreSQL, valid capacity values are 2, 4, 8, 16, 32, 64, 192, and 384. The minimum capacity must be less than or equal to the maximum capacity.",
    ).optional(),
    SecondsBeforeTimeout: z.number().int().describe(
      "The amount of time, in seconds, that Aurora Serverless v1 tries to find a scaling point to perform seamless scaling before enforcing the timeout action. The default is 300. Specify a value between 60 and 600 seconds.",
    ).optional(),
    SecondsUntilAutoPause: z.number().int().describe(
      "The time, in seconds, before an Aurora DB cluster in serverless mode is paused. Specify a value between 300 and 86,400 seconds.",
    ).optional(),
    TimeoutAction: z.string().describe(
      "The action to take when the timeout is reached, either ForceApplyCapacityChange or RollbackCapacityChange. ForceApplyCapacityChange sets the capacity to the specified value as soon as possible. RollbackCapacityChange, the default, ignores the capacity change if a scaling point isn't found in the timeout period. If you specify ForceApplyCapacityChange, connections that prevent Aurora Serverless v1 from finding a scaling point might be dropped. For more information, see [Autoscaling for Aurora Serverless v1](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless.how-it-works.html#aurora-serverless.how-it-works.auto-scaling) in the *Amazon Aurora User Guide*.",
    ).optional(),
  }).describe(
    "The scaling configuration of an Aurora Serverless v1 DB cluster. This property is only supported for Aurora Serverless v1. For Aurora Serverless v2, Use the ServerlessV2ScalingConfiguration property. Valid for: Aurora Serverless v1 DB clusters only",
  ).optional(),
  SnapshotIdentifier: z.string().describe(
    "The identifier for the DB snapshot or DB cluster snapshot to restore from. You can use either the name or the Amazon Resource Name (ARN) to specify a DB cluster snapshot. However, you can use only the ARN to specify a DB snapshot. After you restore a DB cluster with a SnapshotIdentifier property, you must specify the same SnapshotIdentifier property for any future updates to the DB cluster. When you specify this property for an update, the DB cluster is not restored from the snapshot again, and the data in the database is not changed. However, if you don't specify the SnapshotIdentifier property, an empty DB cluster is created, and the original DB cluster is deleted. If you specify a property that is different from the previous snapshot restore property, a new DB cluster is restored from the specified SnapshotIdentifier property, and the original DB cluster is deleted. If you specify the SnapshotIdentifier property to restore a DB cluster (as opposed to specifying it for DB cluster updates), then don't specify the following properties: GlobalClusterIdentifier MasterUsername MasterUserPassword ReplicationSourceIdentifier RestoreType SourceDBClusterIdentifier SourceRegion StorageEncrypted (for an encrypted snapshot) UseLatestRestorableTime Constraints: Must match the identifier of an existing Snapshot. Valid for: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
  SourceDBClusterIdentifier: z.string().describe(
    "When restoring a DB cluster to a point in time, the identifier of the source DB cluster from which to restore. Constraints: Must match the identifier of an existing DBCluster. Cannot be specified if SourceDbClusterResourceId is specified. You must specify either SourceDBClusterIdentifier or SourceDbClusterResourceId, but not both. Valid for: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
  SourceDbClusterResourceId: z.string().describe(
    "The resource ID of the source DB cluster from which to restore.",
  ).optional(),
  SourceRegion: z.string().describe(
    "The AWS Region which contains the source DB cluster when replicating a DB cluster. For example, us-east-1. Valid for: Aurora DB clusters only",
  ).optional(),
  StorageEncrypted: z.boolean().describe(
    "Indicates whether the DB cluster is encrypted. If you specify the KmsKeyId property, then you must enable encryption. If you specify the SourceDBClusterIdentifier property, don't specify this property. The value is inherited from the source DB cluster, and if the DB cluster is encrypted, the specified KmsKeyId property is used. If you specify the SnapshotIdentifier and the specified snapshot is encrypted, don't specify this property. The value is inherited from the snapshot, and the specified KmsKeyId property is used. If you specify the SnapshotIdentifier and the specified snapshot isn't encrypted, you can use this property to specify that the restored DB cluster is encrypted. Specify the KmsKeyId property for the KMS key to use for encryption. If you don't want the restored DB cluster to be encrypted, then don't set this property or set it to false. If you specify both the StorageEncrypted and SnapshotIdentifier properties without specifying the KmsKeyId property, then the restored DB cluster inherits the encryption settings from the DB snapshot that provide. Valid for: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
  StorageType: z.string().describe(
    "The storage type to associate with the DB cluster. For information on storage types for Aurora DB clusters, see [Storage configurations for Amazon Aurora DB clusters](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Overview.StorageReliability.html#aurora-storage-type). For information on storage types for Multi-AZ DB clusters, see [Settings for creating Multi-AZ DB clusters](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/create-multi-az-db-cluster.html#create-multi-az-db-cluster-settings). This setting is required to create a Multi-AZ DB cluster. When specified for a Multi-AZ DB cluster, a value for the Iops parameter is required. Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB clusters Valid Values: Aurora DB clusters - aurora | aurora-iopt1 Multi-AZ DB clusters - io1 | io2 | gp3 Default: Aurora DB clusters - aurora Multi-AZ DB clusters - io1 When you create an Aurora DB cluster with the storage type set to aurora-iopt1, the storage type is returned in the response. The storage type isn't returned when you set it to aurora.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "Tags to assign to the DB cluster. Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
  UseLatestRestorableTime: z.boolean().describe(
    "A value that indicates whether to restore the DB cluster to the latest restorable backup time. By default, the DB cluster is not restored to the latest restorable backup time. Valid for: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
  VpcSecurityGroupIds: z.array(z.string()).describe(
    "A list of EC2 VPC security groups to associate with this DB cluster. If you plan to update the resource, don't specify VPC security groups in a shared VPC. Valid for: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
});

const DBClusterMemberSchema = z.object({
  DBInstanceIdentifier: z.string().optional(),
  IsClusterWriter: z.boolean().optional(),
  DBClusterParameterGroupStatus: z.string().optional(),
  PromotionTier: z.number().optional(),
  DBInstanceClass: z.string().optional(),
  AvailabilityZone: z.string().optional(),
});

async function enrichState(
  state: { DBClusterIdentifier?: string } & Record<string, unknown>,
): Promise<Record<string, unknown>> {
  const id = state.DBClusterIdentifier;
  if (!id) return state;
  try {
    const rdsClient = new RDSClient({
      region: Deno.env.get("AWS_REGION") || "us-east-1",
    });
    const descResp = await rdsClient.send(
      new DescribeDBClustersCommand({ DBClusterIdentifier: id }),
    );
    const cluster = descResp.DBClusters?.[0];
    if (!cluster?.DBClusterMembers) return state;
    const instanceMap = new Map<
      string,
      { DBInstanceClass?: string; AvailabilityZone?: string }
    >();
    try {
      let marker: string | undefined;
      do {
        const instResp = await rdsClient.send(
          new DescribeDBInstancesCommand({
            Filters: [{ Name: "db-cluster-id", Values: [id] }],
            Marker: marker,
          }),
        );
        for (const inst of instResp.DBInstances ?? []) {
          if (inst.DBInstanceIdentifier) {
            instanceMap.set(inst.DBInstanceIdentifier, {
              DBInstanceClass: inst.DBInstanceClass,
              AvailabilityZone: inst.AvailabilityZone,
            });
          }
        }
        marker = instResp.Marker;
      } while (marker);
    } catch {
      // Instance details are best-effort enrichment
    }
    return {
      ...state,
      DBClusterMembers: cluster.DBClusterMembers.map((m) => ({
        DBInstanceIdentifier: m.DBInstanceIdentifier,
        IsClusterWriter: m.IsClusterWriter,
        DBClusterParameterGroupStatus: m.DBClusterParameterGroupStatus,
        PromotionTier: m.PromotionTier,
        ...instanceMap.get(m.DBInstanceIdentifier ?? ""),
      })),
    };
  } catch {
    return state;
  }
}

async function listClusters(
  filters?: Array<{ Name: string; Values: string[] }>,
  maxPages = 10,
): Promise<Record<string, unknown>[]> {
  const rdsClient = new RDSClient({
    region: Deno.env.get("AWS_REGION") || "us-east-1",
  });

  const clusters: Record<string, unknown>[] = [];
  let marker: string | undefined;
  let pages = 0;

  do {
    const command = new DescribeDBClustersCommand({
      Filters: filters as { Name: string; Values: string[] }[] | undefined,
      Marker: marker,
      MaxRecords: 100,
    });
    const response = await rdsClient.send(command);

    for (const cluster of response.DBClusters ?? []) {
      clusters.push({
        DBClusterIdentifier: cluster.DBClusterIdentifier,
        DBClusterArn: cluster.DBClusterArn,
        Engine: cluster.Engine,
        EngineVersion: cluster.EngineVersion,
        Status: cluster.Status,
        DatabaseName: cluster.DatabaseName,
        MasterUsername: cluster.MasterUsername,
        Port: cluster.Port,
        Endpoint: cluster.Endpoint,
        ReaderEndpoint: cluster.ReaderEndpoint,
        MultiAZ: cluster.MultiAZ,
        AvailabilityZones: cluster.AvailabilityZones,
        StorageEncrypted: cluster.StorageEncrypted,
        KmsKeyId: cluster.KmsKeyId,
        DbClusterResourceId: cluster.DbClusterResourceId,
        DeletionProtection: cluster.DeletionProtection,
        EngineMode: cluster.EngineMode,
        DBSubnetGroup: cluster.DBSubnetGroup,
        AllocatedStorage: cluster.AllocatedStorage,
        StorageType: cluster.StorageType,
        DBClusterParameterGroup: cluster.DBClusterParameterGroup,
        VpcSecurityGroups: cluster.VpcSecurityGroups?.map((sg) => ({
          VpcSecurityGroupId: sg.VpcSecurityGroupId,
          Status: sg.Status,
        })),
        DBClusterMembers: cluster.DBClusterMembers?.map((m) => ({
          DBInstanceIdentifier: m.DBInstanceIdentifier,
          IsClusterWriter: m.IsClusterWriter,
          DBClusterParameterGroupStatus: m.DBClusterParameterGroupStatus,
          PromotionTier: m.PromotionTier,
        })),
        TagList: cluster.TagList?.map((t) => ({
          Key: t.Key,
          Value: t.Value,
        })),
      });
    }

    marker = response.Marker;
    pages++;
  } while (marker && pages < maxPages);

  return clusters;
}

const StateSchema = z.object({
  Endpoint: z.object({
    Address: z.string(),
    Port: z.string(),
  }).optional(),
  ReadEndpoint: z.object({
    Address: z.string(),
  }).optional(),
  AllocatedStorage: z.number().optional(),
  AssociatedRoles: z.array(DBClusterRoleSchema).optional(),
  AvailabilityZones: z.array(z.string()).optional(),
  AutoMinorVersionUpgrade: z.boolean().optional(),
  BacktrackWindow: z.number().optional(),
  BackupRetentionPeriod: z.number().optional(),
  ClusterScalabilityType: z.string().optional(),
  CopyTagsToSnapshot: z.boolean().optional(),
  DatabaseInsightsMode: z.string().optional(),
  DatabaseName: z.string().optional(),
  DBClusterArn: z.string().optional(),
  DBClusterInstanceClass: z.string().optional(),
  DBClusterResourceId: z.string().optional(),
  DBInstanceParameterGroupName: z.string().optional(),
  DBSystemId: z.string().optional(),
  GlobalClusterIdentifier: z.string().optional(),
  DBClusterIdentifier: z.string(),
  DBClusterParameterGroupName: z.string().optional(),
  DBSubnetGroupName: z.string().optional(),
  DeleteAutomatedBackups: z.boolean().optional(),
  DeletionProtection: z.boolean().optional(),
  Domain: z.string().optional(),
  DomainIAMRoleName: z.string().optional(),
  EnableCloudwatchLogsExports: z.array(z.string()).optional(),
  EnableGlobalWriteForwarding: z.boolean().optional(),
  EnableHttpEndpoint: z.boolean().optional(),
  EnableIAMDatabaseAuthentication: z.boolean().optional(),
  EnableLocalWriteForwarding: z.boolean().optional(),
  Engine: z.string().optional(),
  EngineLifecycleSupport: z.string().optional(),
  EngineMode: z.string().optional(),
  EngineVersion: z.string().optional(),
  ManageMasterUserPassword: z.boolean().optional(),
  Iops: z.number().optional(),
  KmsKeyId: z.string().optional(),
  MasterUserAuthenticationType: z.string().optional(),
  MasterUsername: z.string().optional(),
  MasterUserPassword: z.string().optional(),
  MasterUserSecret: z.object({
    SecretArn: z.string(),
    KmsKeyId: z.string(),
  }).optional(),
  MonitoringInterval: z.number().optional(),
  MonitoringRoleArn: z.string().optional(),
  NetworkType: z.string().optional(),
  PerformanceInsightsEnabled: z.boolean().optional(),
  PerformanceInsightsKmsKeyId: z.string().optional(),
  PerformanceInsightsRetentionPeriod: z.number().optional(),
  Port: z.number().optional(),
  PreferredBackupWindow: z.string().optional(),
  PreferredMaintenanceWindow: z.string().optional(),
  PubliclyAccessible: z.boolean().optional(),
  ReplicationSourceIdentifier: z.string().optional(),
  RestoreToTime: z.string().optional(),
  RestoreType: z.string().optional(),
  ServerlessV2ScalingConfiguration: z.object({
    MinCapacity: z.number(),
    MaxCapacity: z.number(),
    SecondsUntilAutoPause: z.number(),
  }).optional(),
  ScalingConfiguration: z.object({
    AutoPause: z.boolean(),
    MaxCapacity: z.number(),
    MinCapacity: z.number(),
    SecondsBeforeTimeout: z.number(),
    SecondsUntilAutoPause: z.number(),
    TimeoutAction: z.string(),
  }).optional(),
  SnapshotIdentifier: z.string().optional(),
  SourceDBClusterIdentifier: z.string().optional(),
  SourceDbClusterResourceId: z.string().optional(),
  SourceRegion: z.string().optional(),
  StorageEncrypted: z.boolean().optional(),
  StorageEncryptionType: z.string().optional(),
  StorageThroughput: z.number().optional(),
  StorageType: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  UseLatestRestorableTime: z.boolean().optional(),
  VpcSecurityGroupIds: z.array(z.string()).optional(),
  DBClusterMembers: z.array(DBClusterMemberSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AllocatedStorage: z.number().int().describe(
    "The amount of storage in gibibytes (GiB) to allocate to each DB instance in the Multi-AZ DB cluster. Valid for Cluster Type: Multi-AZ DB clusters only This setting is required to create a Multi-AZ DB cluster.",
  ).optional(),
  AssociatedRoles: z.array(DBClusterRoleSchema).describe(
    "Provides a list of the AWS Identity and Access Management (IAM) roles that are associated with the DB cluster. IAM roles that are associated with a DB cluster grant permission for the DB cluster to access other Amazon Web Services on your behalf. Valid for: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
  AvailabilityZones: z.array(z.string()).describe(
    "A list of Availability Zones (AZs) where instances in the DB cluster can be created. For information on AWS Regions and Availability Zones, see [Choosing the Regions and Availability Zones](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Concepts.RegionsAndAvailabilityZones.html) in the *Amazon Aurora User Guide*. Valid for: Aurora DB clusters only",
  ).optional(),
  AutoMinorVersionUpgrade: z.boolean().describe(
    "Specifies whether minor engine upgrades are applied automatically to the DB cluster during the maintenance window. By default, minor engine upgrades are applied automatically. Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB cluster. For more information about automatic minor version upgrades, see [Automatically upgrading the minor engine version](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_UpgradeDBInstance.Upgrading.html#USER_UpgradeDBInstance.Upgrading.AutoMinorVersionUpgrades).",
  ).optional(),
  BacktrackWindow: z.number().int().min(0).describe(
    "The target backtrack window, in seconds. To disable backtracking, set this value to 0. Valid for Cluster Type: Aurora MySQL DB clusters only Default: 0 Constraints: If specified, this value must be set to a number from 0 to 259,200 (72 hours).",
  ).optional(),
  BackupRetentionPeriod: z.number().int().min(1).describe(
    "The number of days for which automated backups are retained. Default: 1 Constraints: Must be a value from 1 to 35 Valid for: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
  ClusterScalabilityType: z.string().describe(
    "Specifies the scalability mode of the Aurora DB cluster. When set to limitless, the cluster operates as an Aurora Limitless Database, allowing you to create a DB shard group for horizontal scaling (sharding) capabilities. When set to standard (the default), the cluster uses normal DB instance creation. *Important:* Automated backup retention isn't supported with Aurora Limitless Database clusters. If you set this property to limitless, you cannot set DeleteAutomatedBackups to false. To create a backup, use manual snapshots instead.",
  ).optional(),
  CopyTagsToSnapshot: z.boolean().describe(
    "A value that indicates whether to copy all tags from the DB cluster to snapshots of the DB cluster. The default is not to copy them. Valid for: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
  DatabaseInsightsMode: z.string().describe(
    "The mode of Database Insights to enable for the DB cluster. If you set this value to advanced, you must also set the PerformanceInsightsEnabled parameter to true and the PerformanceInsightsRetentionPeriod parameter to 465. Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
  DatabaseName: z.string().describe(
    "The name of your database. If you don't provide a name, then Amazon RDS won't create a database in this DB cluster. For naming constraints, see [Naming Constraints](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_Limits.html#RDS_Limits.Constraints) in the *Amazon Aurora User Guide*. Valid for: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
  DBClusterInstanceClass: z.string().describe(
    "The compute and memory capacity of each DB instance in the Multi-AZ DB cluster, for example db.m6gd.xlarge. Not all DB instance classes are available in all AWS-Regions, or for all database engines. For the full list of DB instance classes and availability for your engine, see [DB instance class](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.DBInstanceClass.html) in the *Amazon RDS User Guide*. This setting is required to create a Multi-AZ DB cluster. Valid for Cluster Type: Multi-AZ DB clusters only",
  ).optional(),
  DBInstanceParameterGroupName: z.string().describe(
    "The name of the DB parameter group to apply to all instances of the DB cluster. When you apply a parameter group using the DBInstanceParameterGroupName parameter, the DB cluster isn't rebooted automatically. Also, parameter changes are applied immediately rather than during the next maintenance window. Valid for Cluster Type: Aurora DB clusters only Default: The existing name setting Constraints: The DB parameter group must be in the same DB parameter group family as this DB cluster. The DBInstanceParameterGroupName parameter is valid in combination with the AllowMajorVersionUpgrade parameter for a major version upgrade only.",
  ).optional(),
  DBSystemId: z.string().describe("Reserved for future use.").optional(),
  GlobalClusterIdentifier: z.string().min(0).max(63).regex(
    new RegExp("^$|^[a-zA-Z]{1}(?:-?[a-zA-Z0-9]){0,62}$"),
  ).describe(
    "If you are configuring an Aurora global database cluster and want your Aurora DB cluster to be a secondary member in the global database cluster, specify the global cluster ID of the global database cluster. To define the primary database cluster of the global cluster, use the [AWS::RDS::GlobalCluster](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-globalcluster.html) resource. If you aren't configuring a global database cluster, don't specify this property. To remove the DB cluster from a global database cluster, specify an empty value for the GlobalClusterIdentifier property. For information about Aurora global databases, see [Working with Amazon Aurora Global Databases](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html) in the *Amazon Aurora User Guide*. Valid for: Aurora DB clusters only",
  ).optional(),
  DBClusterIdentifier: z.string().min(1).max(63).regex(
    new RegExp("^[a-zA-Z]{1}(?:-?[a-zA-Z0-9]){0,62}$"),
  ).describe(
    "The DB cluster identifier. This parameter is stored as a lowercase string. Constraints: Must contain from 1 to 63 letters, numbers, or hyphens. First character must be a letter. Can't end with a hyphen or contain two consecutive hyphens. Example: my-cluster1 Valid for: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
  DBClusterParameterGroupName: z.string().describe(
    'The name of the DB cluster parameter group to associate with this DB cluster. If you apply a parameter group to an existing DB cluster, then its DB instances might need to reboot. This can result in an outage while the DB instances are rebooting. If you apply a change to parameter group associated with a stopped DB cluster, then the update stack waits until the DB cluster is started. To list all of the available DB cluster parameter group names, use the following command: aws rds describe-db-cluster-parameter-groups --query "DBClusterParameterGroups[].DBClusterParameterGroupName" --output text Valid for: Aurora DB clusters and Multi-AZ DB clusters',
  ).optional(),
  DBSubnetGroupName: z.string().describe(
    "A DB subnet group that you want to associate with this DB cluster. If you are restoring a DB cluster to a point in time with RestoreType set to copy-on-write, and don't specify a DB subnet group name, then the DB cluster is restored with a default DB subnet group. Valid for: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
  DeleteAutomatedBackups: z.boolean().describe(
    "Specifies whether to remove automated backups immediately after the DB cluster is deleted. This parameter isn't case-sensitive. The default is to remove automated backups immediately after the DB cluster is deleted, unless the AWS Backup policy specifies a point-in-time restore rule.",
  ).optional(),
  DeletionProtection: z.boolean().describe(
    "A value that indicates whether the DB cluster has deletion protection enabled. The database can't be deleted when deletion protection is enabled. By default, deletion protection is disabled. Valid for: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
  Domain: z.string().describe(
    "Indicates the directory ID of the Active Directory to create the DB cluster. For Amazon Aurora DB clusters, Amazon RDS can use Kerberos authentication to authenticate users that connect to the DB cluster. For more information, see [Kerberos authentication](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/kerberos-authentication.html) in the *Amazon Aurora User Guide*. Valid for: Aurora DB clusters only",
  ).optional(),
  DomainIAMRoleName: z.string().describe(
    "Specifies the name of the IAM role to use when making API calls to the Directory Service. Valid for: Aurora DB clusters only",
  ).optional(),
  EnableCloudwatchLogsExports: z.array(z.string()).describe(
    "The list of log types that need to be enabled for exporting to CloudWatch Logs. The values in the list depend on the DB engine being used. For more information, see [Publishing Database Logs to Amazon CloudWatch Logs](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_LogAccess.html#USER_LogAccess.Procedural.UploadtoCloudWatch) in the *Amazon Aurora User Guide*. *Aurora MySQL* Valid values: audit, error, general, slowquery *Aurora PostgreSQL* Valid values: postgresql Valid for: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
  EnableGlobalWriteForwarding: z.boolean().describe(
    "Specifies whether to enable this DB cluster to forward write operations to the primary cluster of a global cluster (Aurora global database). By default, write operations are not allowed on Aurora DB clusters that are secondary clusters in an Aurora global database. You can set this value only on Aurora DB clusters that are members of an Aurora global database. With this parameter enabled, a secondary cluster can forward writes to the current primary cluster, and the resulting changes are replicated back to this cluster. For the primary DB cluster of an Aurora global database, this value is used immediately if the primary is demoted by a global cluster API operation, but it does nothing until then. Valid for Cluster Type: Aurora DB clusters only",
  ).optional(),
  EnableHttpEndpoint: z.boolean().describe(
    "Specifies whether to enable the HTTP endpoint for the DB cluster. By default, the HTTP endpoint isn't enabled. When enabled, the HTTP endpoint provides a connectionless web service API (RDS Data API) for running SQL queries on the DB cluster. You can also query your database from inside the RDS console with the RDS query editor. For more information, see [Using RDS Data API](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/data-api.html) in the *Amazon Aurora User Guide*. Valid for Cluster Type: Aurora DB clusters only",
  ).optional(),
  EnableIAMDatabaseAuthentication: z.boolean().describe(
    "A value that indicates whether to enable mapping of AWS Identity and Access Management (IAM) accounts to database accounts. By default, mapping is disabled. For more information, see [IAM Database Authentication](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/UsingWithRDS.IAMDBAuth.html) in the *Amazon Aurora User Guide.* Valid for: Aurora DB clusters only",
  ).optional(),
  EnableLocalWriteForwarding: z.boolean().describe(
    "Specifies whether read replicas can forward write operations to the writer DB instance in the DB cluster. By default, write operations aren't allowed on reader DB instances. Valid for: Aurora DB clusters only",
  ).optional(),
  Engine: z.string().describe(
    "The name of the database engine to be used for this DB cluster. Valid Values: aurora-mysql aurora-postgresql mysql postgres Valid for: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
  EngineLifecycleSupport: z.string().describe(
    "The life cycle type for this DB cluster. By default, this value is set to open-source-rds-extended-support, which enrolls your DB cluster into Amazon RDS Extended Support. At the end of standard support, you can avoid charges for Extended Support by setting the value to open-source-rds-extended-support-disabled. In this case, creating the DB cluster will fail if the DB major version is past its end of standard support date. You can use this setting to enroll your DB cluster into Amazon RDS Extended Support. With RDS Extended Support, you can run the selected major engine version on your DB cluster past the end of standard support for that engine version. For more information, see the following sections: Amazon Aurora - [Amazon RDS Extended Support with Amazon Aurora](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/extended-support.html) in the *Amazon Aurora User Guide* Amazon RDS - [Amazon RDS Extended Support with Amazon RDS](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/extended-support.html) in the *Amazon RDS User Guide* Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB clusters Valid Values: open-source-rds-extended-support | open-source-rds-extended-support-disabled Default: open-source-rds-extended-support",
  ).optional(),
  EngineMode: z.string().describe(
    "The DB engine mode of the DB cluster, either provisioned or serverless. The serverless engine mode only applies for Aurora Serverless v1 DB clusters. Aurora Serverless v2 DB clusters use the provisioned engine mode. For information about limitations and requirements for Serverless DB clusters, see the following sections in the *Amazon Aurora User Guide*: [Limitations of Aurora Serverless v1](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless.html#aurora-serverless.limitations) [Requirements for Aurora Serverless v2](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.requirements.html) Valid for Cluster Type: Aurora DB clusters only",
  ).optional(),
  EngineVersion: z.string().describe(
    'The version number of the database engine to use. Don\'t use this property if your DB cluster is a member of a global database cluster. Instead, specify the EngineVersion property on the [AWS::RDS::GlobalCluster](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-globalcluster.html) resource. Major version upgrades aren\'t supported for individual members of a global cluster. Use ModifyGlobalCluster to upgrade all members of the global cluster. To list all of the available engine versions for Aurora MySQL version 2 (5.7-compatible) and version 3 (8.0-compatible), use the following command: aws rds describe-db-engine-versions --engine aurora-mysql --query "DBEngineVersions[].EngineVersion" You can supply either 5.7 or 8.0 to use the default engine version for Aurora MySQL version 2 or version 3, respectively. To list all of the available engine versions for Aurora PostgreSQL, use the following command: aws rds describe-db-engine-versions --engine aurora-postgresql --query "DBEngineVersions[].EngineVersion" To list all of the available engine versions for RDS for MySQL, use the following command: aws rds describe-db-engine-versions --engine mysql --query "DBEngineVersions[].EngineVersion" To list all of the available engine versions for RDS for PostgreSQL, use the following command: aws rds describe-db-engine-versions --engine postgres --query "DBEngineVersions[].EngineVersion" *Aurora MySQL* For information, see [Database engine updates for Amazon Aurora MySQL](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/AuroraMySQL.Updates.html) in the *Amazon Aurora User Guide*. *Aurora PostgreSQL* For information, see [Amazon Aurora PostgreSQL releases and engine versions](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/AuroraPostgreSQL.Updates.20180305.html) in the *Amazon Aurora User Guide*. *MySQL* For information, see [Amazon RDS for MySQL](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_MySQL.html#MySQL.Concepts.VersionMgmt) in the *Amazon RDS User Guide*. *PostgreSQL* For information, see [Amazon RDS for PostgreSQL](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_PostgreSQL.html#PostgreSQL.Concepts) in the *Amazon RDS User Guide*. Valid for: Aurora DB clusters and Multi-AZ DB clusters',
  ).optional(),
  ManageMasterUserPassword: z.boolean().describe(
    "Specifies whether to manage the master user password with AWS Secrets Manager. For more information, see [Password management with Secrets Manager](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-secrets-manager.html) in the *Amazon RDS User Guide* and [Password management with Secrets Manager](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/rds-secrets-manager.html) in the *Amazon Aurora User Guide.* Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB clusters Constraints: Can't manage the master user password with AWS Secrets Manager if MasterUserPassword is specified.",
  ).optional(),
  Iops: z.number().int().describe(
    "The amount of Provisioned IOPS (input/output operations per second) to be initially allocated for each DB instance in the Multi-AZ DB cluster. For information about valid IOPS values, see [Provisioned IOPS storage](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_Storage.html#USER_PIOPS) in the *Amazon RDS User Guide*. This setting is required to create a Multi-AZ DB cluster. Valid for Cluster Type: Multi-AZ DB clusters only Constraints: Must be a multiple between.5 and 50 of the storage amount for the DB cluster.",
  ).optional(),
  KmsKeyId: z.string().describe(
    "The Amazon Resource Name (ARN) of the AWS KMS key that is used to encrypt the database instances in the DB cluster, such as arn:aws:kms:us-east-1:012345678910:key/abcd1234-a123-456a-a12b-a123b4cd56ef. If you enable the StorageEncrypted property but don't specify this property, the default KMS key is used. If you specify this property, you must set the StorageEncrypted property to true. If you specify the SnapshotIdentifier property, the StorageEncrypted property value is inherited from the snapshot, and if the DB cluster is encrypted, the specified KmsKeyId property is used. If you create a read replica of an encrypted DB cluster in another AWS Region, make sure to set KmsKeyId to a KMS key identifier that is valid in the destination AWS Region. This KMS key is used to encrypt the read replica in that AWS Region. Valid for: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
  MasterUserAuthenticationType: z.string().describe(
    "Specifies the authentication type for the master user. With IAM master user authentication, you can configure the master DB user with IAM database authentication when you create a DB cluster. You can specify one of the following values: password - Use standard database authentication with a password. iam-db-auth - Use IAM database authentication for the master user. Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB clusters This option is only valid for RDS for MySQL, RDS for MariaDB, RDS for PostgreSQL, Aurora MySQL, and Aurora PostgreSQL engines.",
  ).optional(),
  MasterUsername: z.string().min(1).regex(
    new RegExp("^[a-zA-Z]{1}[a-zA-Z0-9_]*$"),
  ).describe(
    "The name of the master user for the DB cluster. If you specify the SourceDBClusterIdentifier, SnapshotIdentifier, or GlobalClusterIdentifier property, don't specify this property. The value is inherited from the source DB cluster, the snapshot, or the primary DB cluster for the global database cluster, respectively. Valid for: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
  MasterUserPassword: z.string().describe(
    "The master password for the DB instance. If you specify the SourceDBClusterIdentifier, SnapshotIdentifier, or GlobalClusterIdentifier property, don't specify this property. The value is inherited from the source DB cluster, the snapshot, or the primary DB cluster for the global database cluster, respectively. Valid for: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
  MasterUserSecret: z.object({
    KmsKeyId: z.string().describe(
      "The AWS KMS key identifier that is used to encrypt the secret.",
    ).optional(),
  }).describe(
    "The secret managed by RDS in AWS Secrets Manager for the master user password. When you restore a DB cluster from a snapshot, Amazon RDS generates a new secret instead of reusing the secret specified in the SecretArn property. This ensures that the restored DB cluster is securely managed with a dedicated secret. To maintain consistent integration with your application, you might need to update resource configurations to reference the newly created secret. For more information, see [Password management with Secrets Manager](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-secrets-manager.html) in the *Amazon RDS User Guide* and [Password management with Secrets Manager](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/rds-secrets-manager.html) in the *Amazon Aurora User Guide.*",
  ).optional(),
  MonitoringInterval: z.number().int().describe(
    "The interval, in seconds, between points when Enhanced Monitoring metrics are collected for the DB cluster. To turn off collecting Enhanced Monitoring metrics, specify 0. If MonitoringRoleArn is specified, also set MonitoringInterval to a value other than 0. Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB clusters Valid Values: 0 | 1 | 5 | 10 | 15 | 30 | 60 Default: 0",
  ).optional(),
  MonitoringRoleArn: z.string().describe(
    "The Amazon Resource Name (ARN) for the IAM role that permits RDS to send Enhanced Monitoring metrics to Amazon CloudWatch Logs. An example is arn:aws:iam:123456789012:role/emaccess. For information on creating a monitoring role, see [Setting up and enabling Enhanced Monitoring](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_Monitoring.OS.html#USER_Monitoring.OS.Enabling) in the *Amazon RDS User Guide*. If MonitoringInterval is set to a value other than 0, supply a MonitoringRoleArn value. Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
  NetworkType: z.string().describe(
    "The network type of the DB cluster. Valid values: IPV4 DUAL The network type is determined by the DBSubnetGroup specified for the DB cluster. A DBSubnetGroup can support only the IPv4 protocol or the IPv4 and IPv6 protocols ( DUAL). For more information, see [Working with a DB instance in a VPC](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_VPC.WorkingWithRDSInstanceinaVPC.html) in the *Amazon Aurora User Guide.* Valid for: Aurora DB clusters only",
  ).optional(),
  PerformanceInsightsEnabled: z.boolean().describe(
    "Specifies whether to turn on Performance Insights for the DB cluster. For more information, see [Using Amazon Performance Insights](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PerfInsights.html) in the *Amazon RDS User Guide*. Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
  PerformanceInsightsKmsKeyId: z.string().describe(
    "The AWS KMS key identifier for encryption of Performance Insights data. The AWS KMS key identifier is the key ARN, key ID, alias ARN, or alias name for the KMS key. If you don't specify a value for PerformanceInsightsKMSKeyId, then Amazon RDS uses your default KMS key. There is a default KMS key for your AWS-account. Your AWS-account has a different default KMS key for each AWS-Region. Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
  PerformanceInsightsRetentionPeriod: z.number().int().describe(
    "The number of days to retain Performance Insights data. When creating a DB cluster without enabling Performance Insights, you can't specify the parameter PerformanceInsightsRetentionPeriod. Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB clusters Valid Values: 7 *month* * 31, where *month* is a number of months from 1-23. Examples: 93 (3 months * 31), 341 (11 months * 31), 589 (19 months * 31) 731 Default: 7 days If you specify a retention period that isn't valid, such as 94, Amazon RDS issues an error.",
  ).optional(),
  PreferredBackupWindow: z.string().describe(
    "The daily time range during which automated backups are created. For more information, see [Backup Window](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Managing.Backups.html#Aurora.Managing.Backups.BackupWindow) in the *Amazon Aurora User Guide.* Constraints: Must be in the format hh24:mi-hh24:mi. Must be in Universal Coordinated Time (UTC). Must not conflict with the preferred maintenance window. Must be at least 30 minutes. Valid for: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
  PreferredMaintenanceWindow: z.string().describe(
    "The weekly time range during which system maintenance can occur, in Universal Coordinated Time (UTC). Format: ddd:hh24:mi-ddd:hh24:mi The default is a 30-minute window selected at random from an 8-hour block of time for each AWS Region, occurring on a random day of the week. To see the time blocks available, see [Maintaining an Amazon Aurora DB cluster](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_UpgradeDBInstance.Maintenance.html#AdjustingTheMaintenanceWindow.Aurora) in the *Amazon Aurora User Guide.* Valid Days: Mon, Tue, Wed, Thu, Fri, Sat, Sun. Constraints: Minimum 30-minute window. Valid for: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
  PubliclyAccessible: z.boolean().describe(
    "Specifies whether the DB cluster is publicly accessible. Valid for Cluster Type: Multi-AZ DB clusters only When the DB cluster is publicly accessible and you connect from outside of the DB cluster's virtual private cloud (VPC), its domain name system (DNS) endpoint resolves to the public IP address. When you connect from within the same VPC as the DB cluster, the endpoint resolves to the private IP address. Access to the DB cluster is controlled by its security group settings. When the DB cluster isn't publicly accessible, it is an internal DB cluster with a DNS name that resolves to a private IP address. The default behavior when PubliclyAccessible is not specified depends on whether a DBSubnetGroup is specified. If DBSubnetGroup isn't specified, PubliclyAccessible defaults to true. If DBSubnetGroup is specified, PubliclyAccessible defaults to false unless the value of DBSubnetGroup is default, in which case PubliclyAccessible defaults to true. If PubliclyAccessible is true and the VPC that the DBSubnetGroup is in doesn't have an internet gateway attached to it, Amazon RDS returns an error.",
  ).optional(),
  ReplicationSourceIdentifier: z.string().describe(
    "The Amazon Resource Name (ARN) of the source DB instance or DB cluster if this DB cluster is created as a read replica. Valid for: Aurora DB clusters only",
  ).optional(),
  RestoreToTime: z.string().describe(
    "The date and time to restore the DB cluster to. Valid Values: Value must be a time in Universal Coordinated Time (UTC) format Constraints: Must be before the latest restorable time for the DB instance Must be specified if UseLatestRestorableTime parameter isn't provided Can't be specified if the UseLatestRestorableTime parameter is enabled Can't be specified if the RestoreType parameter is copy-on-write This property must be used with SourceDBClusterIdentifier property. The resulting cluster will have the identifier that matches the value of the DBclusterIdentifier property. Example: 2015-03-07T23:45:00Z Valid for: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
  RestoreType: z.string().describe(
    "The type of restore to be performed. You can specify one of the following values: full-copy - The new DB cluster is restored as a full copy of the source DB cluster. copy-on-write - The new DB cluster is restored as a clone of the source DB cluster. If you don't specify a RestoreType value, then the new DB cluster is restored as a full copy of the source DB cluster. Valid for: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
  ServerlessV2ScalingConfiguration: z.object({
    MinCapacity: z.number().describe(
      "The minimum number of Aurora capacity units (ACUs) for a DB instance in an Aurora Serverless v2 cluster. You can specify ACU values in half-step increments, such as 8, 8.5, 9, and so on. For Aurora versions that support the Aurora Serverless v2 auto-pause feature, the smallest value that you can use is 0. For versions that don't support Aurora Serverless v2 auto-pause, the smallest value that you can use is 0.5.",
    ).optional(),
    MaxCapacity: z.number().describe(
      "The maximum number of Aurora capacity units (ACUs) for a DB instance in an Aurora Serverless v2 cluster. You can specify ACU values in half-step increments, such as 40, 40.5, 41, and so on. The largest value that you can use is 128. The maximum capacity must be higher than 0.5 ACUs. For more information, see [Choosing the maximum Aurora Serverless v2 capacity setting for a cluster](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.setting-capacity.html#aurora-serverless-v2.max_capacity_considerations) in the *Amazon Aurora User Guide*. Aurora automatically sets certain parameters for Aurora Serverless V2 DB instances to values that depend on the maximum ACU value in the capacity range. When you update the maximum capacity value, the ParameterApplyStatus value for the DB instance changes to pending-reboot. You can update the parameter values by rebooting the DB instance after changing the capacity range.",
    ).optional(),
    SecondsUntilAutoPause: z.number().int().describe(
      "Specifies the number of seconds an Aurora Serverless v2 DB instance must be idle before Aurora attempts to automatically pause it. Specify a value between 300 seconds (five minutes) and 86,400 seconds (one day). The default is 300 seconds.",
    ).optional(),
  }).describe(
    "The scaling configuration of an Aurora Serverless V2 DB cluster. This property is only supported for Aurora Serverless v2. For Aurora Serverless v1, Use the ScalingConfiguration property. Valid for: Aurora Serverless v2 DB clusters only",
  ).optional(),
  ScalingConfiguration: z.object({
    AutoPause: z.boolean().describe(
      "Indicates whether to allow or disallow automatic pause for an Aurora DB cluster in serverless DB engine mode. A DB cluster can be paused only when it's idle (it has no connections). If a DB cluster is paused for more than seven days, the DB cluster might be backed up with a snapshot. In this case, the DB cluster is restored when there is a request to connect to it.",
    ).optional(),
    MaxCapacity: z.number().int().describe(
      "The maximum capacity for an Aurora DB cluster in serverless DB engine mode. For Aurora MySQL, valid capacity values are 1, 2, 4, 8, 16, 32, 64, 128, and 256. For Aurora PostgreSQL, valid capacity values are 2, 4, 8, 16, 32, 64, 192, and 384. The maximum capacity must be greater than or equal to the minimum capacity.",
    ).optional(),
    MinCapacity: z.number().int().describe(
      "The minimum capacity for an Aurora DB cluster in serverless DB engine mode. For Aurora MySQL, valid capacity values are 1, 2, 4, 8, 16, 32, 64, 128, and 256. For Aurora PostgreSQL, valid capacity values are 2, 4, 8, 16, 32, 64, 192, and 384. The minimum capacity must be less than or equal to the maximum capacity.",
    ).optional(),
    SecondsBeforeTimeout: z.number().int().describe(
      "The amount of time, in seconds, that Aurora Serverless v1 tries to find a scaling point to perform seamless scaling before enforcing the timeout action. The default is 300. Specify a value between 60 and 600 seconds.",
    ).optional(),
    SecondsUntilAutoPause: z.number().int().describe(
      "The time, in seconds, before an Aurora DB cluster in serverless mode is paused. Specify a value between 300 and 86,400 seconds.",
    ).optional(),
    TimeoutAction: z.string().describe(
      "The action to take when the timeout is reached, either ForceApplyCapacityChange or RollbackCapacityChange. ForceApplyCapacityChange sets the capacity to the specified value as soon as possible. RollbackCapacityChange, the default, ignores the capacity change if a scaling point isn't found in the timeout period. If you specify ForceApplyCapacityChange, connections that prevent Aurora Serverless v1 from finding a scaling point might be dropped. For more information, see [Autoscaling for Aurora Serverless v1](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless.how-it-works.html#aurora-serverless.how-it-works.auto-scaling) in the *Amazon Aurora User Guide*.",
    ).optional(),
  }).describe(
    "The scaling configuration of an Aurora Serverless v1 DB cluster. This property is only supported for Aurora Serverless v1. For Aurora Serverless v2, Use the ServerlessV2ScalingConfiguration property. Valid for: Aurora Serverless v1 DB clusters only",
  ).optional(),
  SnapshotIdentifier: z.string().describe(
    "The identifier for the DB snapshot or DB cluster snapshot to restore from. You can use either the name or the Amazon Resource Name (ARN) to specify a DB cluster snapshot. However, you can use only the ARN to specify a DB snapshot. After you restore a DB cluster with a SnapshotIdentifier property, you must specify the same SnapshotIdentifier property for any future updates to the DB cluster. When you specify this property for an update, the DB cluster is not restored from the snapshot again, and the data in the database is not changed. However, if you don't specify the SnapshotIdentifier property, an empty DB cluster is created, and the original DB cluster is deleted. If you specify a property that is different from the previous snapshot restore property, a new DB cluster is restored from the specified SnapshotIdentifier property, and the original DB cluster is deleted. If you specify the SnapshotIdentifier property to restore a DB cluster (as opposed to specifying it for DB cluster updates), then don't specify the following properties: GlobalClusterIdentifier MasterUsername MasterUserPassword ReplicationSourceIdentifier RestoreType SourceDBClusterIdentifier SourceRegion StorageEncrypted (for an encrypted snapshot) UseLatestRestorableTime Constraints: Must match the identifier of an existing Snapshot. Valid for: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
  SourceDBClusterIdentifier: z.string().describe(
    "When restoring a DB cluster to a point in time, the identifier of the source DB cluster from which to restore. Constraints: Must match the identifier of an existing DBCluster. Cannot be specified if SourceDbClusterResourceId is specified. You must specify either SourceDBClusterIdentifier or SourceDbClusterResourceId, but not both. Valid for: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
  SourceDbClusterResourceId: z.string().describe(
    "The resource ID of the source DB cluster from which to restore.",
  ).optional(),
  SourceRegion: z.string().describe(
    "The AWS Region which contains the source DB cluster when replicating a DB cluster. For example, us-east-1. Valid for: Aurora DB clusters only",
  ).optional(),
  StorageEncrypted: z.boolean().describe(
    "Indicates whether the DB cluster is encrypted. If you specify the KmsKeyId property, then you must enable encryption. If you specify the SourceDBClusterIdentifier property, don't specify this property. The value is inherited from the source DB cluster, and if the DB cluster is encrypted, the specified KmsKeyId property is used. If you specify the SnapshotIdentifier and the specified snapshot is encrypted, don't specify this property. The value is inherited from the snapshot, and the specified KmsKeyId property is used. If you specify the SnapshotIdentifier and the specified snapshot isn't encrypted, you can use this property to specify that the restored DB cluster is encrypted. Specify the KmsKeyId property for the KMS key to use for encryption. If you don't want the restored DB cluster to be encrypted, then don't set this property or set it to false. If you specify both the StorageEncrypted and SnapshotIdentifier properties without specifying the KmsKeyId property, then the restored DB cluster inherits the encryption settings from the DB snapshot that provide. Valid for: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
  StorageType: z.string().describe(
    "The storage type to associate with the DB cluster. For information on storage types for Aurora DB clusters, see [Storage configurations for Amazon Aurora DB clusters](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Overview.StorageReliability.html#aurora-storage-type). For information on storage types for Multi-AZ DB clusters, see [Settings for creating Multi-AZ DB clusters](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/create-multi-az-db-cluster.html#create-multi-az-db-cluster-settings). This setting is required to create a Multi-AZ DB cluster. When specified for a Multi-AZ DB cluster, a value for the Iops parameter is required. Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB clusters Valid Values: Aurora DB clusters - aurora | aurora-iopt1 Multi-AZ DB clusters - io1 | io2 | gp3 Default: Aurora DB clusters - aurora Multi-AZ DB clusters - io1 When you create an Aurora DB cluster with the storage type set to aurora-iopt1, the storage type is returned in the response. The storage type isn't returned when you set it to aurora.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "Tags to assign to the DB cluster. Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
  UseLatestRestorableTime: z.boolean().describe(
    "A value that indicates whether to restore the DB cluster to the latest restorable backup time. By default, the DB cluster is not restored to the latest restorable backup time. Valid for: Aurora DB clusters and Multi-AZ DB clusters",
  ).optional(),
  VpcSecurityGroupIds: z.array(z.string()).describe(
    "A list of EC2 VPC security groups to associate with this DB cluster. If you plan to update the resource, don't specify VPC security groups in a shared VPC. Valid for: Aurora DB clusters and Multi-AZ DB clusters",
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

/** Swamp extension model for RDS DBCluster. Registered at `@swamp/aws/rds/dbcluster`. */
export const model = {
  type: "@swamp/aws/rds/dbcluster",
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
      toVersion: "2026.05.22.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.22.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.26.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.26.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.26.3",
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
      description: "RDS DBCluster resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a RDS DBCluster",
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
          "AWS::RDS::DBCluster",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.DBClusterIdentifier ?? g.DBClusterIdentifier)?.toString() ??
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
      description: "Get a RDS DBCluster",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the RDS DBCluster",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await enrichState(
          await readResource(
            "AWS::RDS::DBCluster",
            args.identifier,
            credentials,
          ) as StateData,
        );
        const instanceName = ((result.DBClusterIdentifier ??
          context.globalArgs.DBClusterIdentifier)?.toString() ??
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
      description: "Update a RDS DBCluster",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.DBClusterIdentifier?.toString() ?? "current")
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
        const identifier = existing.DBClusterIdentifier?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::RDS::DBCluster",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::RDS::DBCluster",
          identifier,
          currentState,
          desiredState,
          [
            "AvailabilityZones",
            "ClusterScalabilityType",
            "DBClusterIdentifier",
            "DBSubnetGroupName",
            "DBSystemId",
            "DatabaseName",
            "EngineMode",
            "KmsKeyId",
            "PubliclyAccessible",
            "RestoreToTime",
            "RestoreType",
            "SnapshotIdentifier",
            "SourceDBClusterIdentifier",
            "SourceDbClusterResourceId",
            "SourceRegion",
            "StorageEncrypted",
            "UseLatestRestorableTime",
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
      description: "Delete a RDS DBCluster",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the RDS DBCluster",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::RDS::DBCluster",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.DBClusterIdentifier?.toString() ??
            args.identifier).replace(/[\/\\]/g, "_").replace(/\.\./g, "_")
            .replace(/\0/g, "");
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
      description: "Sync RDS DBCluster state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.DBClusterIdentifier?.toString() ?? "current")
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
        const identifier = existing.DBClusterIdentifier?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await enrichState(
            await readResource(
              "AWS::RDS::DBCluster",
              identifier,
              credentials,
            ) as StateData,
          );
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
      description: "List RDS DB clusters in the current region",
      arguments: z.object({
        filters: z.array(
          z.object({ Name: z.string(), Values: z.array(z.string()) }),
        ).describe("Optional filters to narrow results").optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const items = await listClusters(
          args.filters as any,
          args.maxPages as number | undefined,
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i] as StateData;
          const instanceName =
            (item.DBClusterIdentifier?.toString() ?? String(i)).replace(
              /[\/\\]/g,
              "_",
            ).replace(/\.\./g, "_").replace(/\0/g, "");
          const handle = await context.writeResource(
            "state",
            instanceName,
            item,
          );
          dataHandles.push(handle);
        }
        return { dataHandles, result: { count: items.length } };
      },
    },
  },
};
