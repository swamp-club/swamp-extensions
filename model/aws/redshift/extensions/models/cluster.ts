// Auto-generated extension model for @swamp/aws/redshift/cluster
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Redshift Cluster (AWS::Redshift::Cluster).
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

const TagSchema = z.object({
  Value: z.string().min(1).max(255).describe(
    "The value for the tag. You can specify a value that is 1 to 255 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Key: z.string().min(1).max(127).describe(
    "The key name of the tag. You can specify a value that is 1 to 127 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
});

const GlobalArgsSchema = z.object({
  RevisionTarget: z.string().describe(
    "The identifier of the database revision. You can retrieve this value from the response to the DescribeClusterDbRevisions request.",
  ).optional(),
  AutomatedSnapshotRetentionPeriod: z.number().int().describe(
    "The number of days that automated snapshots are retained. If the value is 0, automated snapshots are disabled. Default value is 1",
  ).optional(),
  Encrypted: z.boolean().describe(
    "If true, the data in the cluster is encrypted at rest.",
  ).optional(),
  NumberOfNodes: z.number().int().describe(
    "The number of compute nodes in the cluster. This parameter is required when the ClusterType parameter is specified as multi-node.",
  ).optional(),
  DestinationRegion: z.string().describe(
    "The destination AWS Region that you want to copy snapshots to. Constraints: Must be the name of a valid AWS Region. For more information, see Regions and Endpoints in the Amazon Web Services [https://docs.aws.amazon.com/general/latest/gr/rande.html#redshift_region] General Reference",
  ).optional(),
  AllowVersionUpgrade: z.boolean().describe(
    "Major version upgrades can be applied during the maintenance window to the Amazon Redshift engine that is running on the cluster. Default value is True",
  ).optional(),
  NamespaceResourcePolicy: z.record(z.string(), z.unknown()).describe(
    "The namespace resource policy document that will be attached to a Redshift cluster.",
  ).optional(),
  MaintenanceTrackName: z.string().describe(
    "The name for the maintenance track that you want to assign for the cluster. This name change is asynchronous. The new track name stays in the PendingModifiedValues for the cluster until the next maintenance window. When the maintenance track changes, the cluster is switched to the latest cluster release available for the maintenance track. At this point, the maintenance track name is applied.",
  ).optional(),
  OwnerAccount: z.string().optional(),
  MultiAZ: z.boolean().describe(
    "A boolean indicating if the redshift cluster is multi-az or not. If you don't provide this parameter or set the value to false, the redshift cluster will be single-az.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The list of tags for the cluster parameter group.",
  ).optional(),
  SnapshotClusterIdentifier: z.string().describe(
    "The name of the cluster the source snapshot was created from. This parameter is required if your IAM user has a policy containing a snapshot resource element that specifies anything other than * for the cluster name.",
  ).optional(),
  IamRoles: z.array(z.string()).describe(
    "A list of AWS Identity and Access Management (IAM) roles that can be used by the cluster to access other AWS services. You must supply the IAM roles in their Amazon Resource Name (ARN) format. You can supply up to 50 IAM roles in a single request",
  ).optional(),
  KmsKeyId: z.string().describe(
    "The AWS Key Management Service (KMS) key ID of the encryption key that you want to use to encrypt data in the cluster.",
  ).optional(),
  SnapshotCopyManual: z.boolean().describe(
    "Indicates whether to apply the snapshot retention period to newly copied manual snapshots instead of automated snapshots.",
  ).optional(),
  ManageMasterPassword: z.boolean().describe(
    "A boolean indicating if the redshift cluster's admin user credentials is managed by Redshift or not. You can't use MasterUserPassword if ManageMasterPassword is true. If ManageMasterPassword is false or not set, Amazon Redshift uses MasterUserPassword for the admin user account's password.",
  ).optional(),
  AvailabilityZone: z.string().describe(
    "The EC2 Availability Zone (AZ) in which you want Amazon Redshift to provision the cluster. Default: A random, system-chosen Availability Zone in the region that is specified by the endpoint",
  ).optional(),
  ClusterSecurityGroups: z.array(z.string()).describe(
    "A list of security groups to be associated with this cluster.",
  ).optional(),
  ClusterIdentifier: z.string().max(63).describe(
    "A unique identifier for the cluster. You use this identifier to refer to the cluster for any subsequent cluster operations such as deleting or modifying. All alphabetical characters must be lower case, no hypens at the end, no two consecutive hyphens. Cluster name should be unique for all clusters within an AWS account",
  ).optional(),
  MasterUserPassword: z.string().max(64).describe(
    "The password associated with the master user account for the cluster that is being created. You can't use MasterUserPassword if ManageMasterPassword is true. Password must be between 8 and 64 characters in length, should have at least one uppercase letter.Must contain at least one lowercase letter.Must contain one number.Can be any printable ASCII character.",
  ).optional(),
  ClusterSubnetGroupName: z.string().describe(
    "The name of a cluster subnet group to be associated with this cluster.",
  ).optional(),
  LoggingProperties: z.object({
    BucketName: z.string().optional(),
    S3KeyPrefix: z.string().optional(),
    LogDestinationType: z.string().optional(),
    LogExports: z.array(z.string()).optional(),
  }).optional(),
  DeferMaintenance: z.boolean().describe(
    "A boolean indicating whether to enable the deferred maintenance window.",
  ).optional(),
  NodeType: z.string().describe(
    "The node type to be provisioned for the cluster.Valid Values: ds2.xlarge | ds2.8xlarge | dc1.large | dc1.8xlarge | dc2.large | dc2.8xlarge | ra3.large | ra3.4xlarge | ra3.16xlarge",
  ),
  MasterUsername: z.string().max(128).describe(
    "The user name associated with the master user account for the cluster that is being created. The user name can't be PUBLIC and first character must be a letter.",
  ),
  PubliclyAccessible: z.boolean().describe(
    "If true, the cluster can be accessed from a public network.",
  ).optional(),
  ManualSnapshotRetentionPeriod: z.number().int().describe(
    "The number of days to retain newly copied snapshots in the destination AWS Region after they are copied from the source AWS Region. If the value is -1, the manual snapshot is retained indefinitely. The value must be either -1 or an integer between 1 and 3,653.",
  ).optional(),
  ResourceAction: z.string().describe(
    "The Redshift operation to be performed. Resource Action supports pause-cluster, resume-cluster, failover-primary-compute APIs",
  ).optional(),
  HsmClientCertificateIdentifier: z.string().describe(
    "Specifies the name of the HSM client certificate the Amazon Redshift cluster uses to retrieve the data encryption keys stored in an HSM",
  ).optional(),
  ElasticIp: z.string().describe(
    "The Elastic IP (EIP) address for the cluster.",
  ).optional(),
  AvailabilityZoneRelocationStatus: z.string().describe(
    "The availability zone relocation status of the cluster",
  ).optional(),
  AquaConfigurationStatus: z.string().describe(
    "The value represents how the cluster is configured to use AQUA (Advanced Query Accelerator) after the cluster is restored. Possible values include the following. enabled - Use AQUA if it is available for the current Region and Amazon Redshift node type. disabled - Don't use AQUA. auto - Amazon Redshift determines whether to use AQUA.",
  ).optional(),
  SnapshotIdentifier: z.string().describe(
    "The name of the snapshot from which to create the new cluster. This parameter isn't case sensitive.",
  ).optional(),
  AvailabilityZoneRelocation: z.boolean().describe(
    "The option to enable relocation for an Amazon Redshift cluster between Availability Zones after the cluster modification is complete.",
  ).optional(),
  SnapshotCopyGrantName: z.string().describe(
    "The name of the snapshot copy grant to use when snapshots of an AWS KMS-encrypted cluster are copied to the destination region.",
  ).optional(),
  EnhancedVpcRouting: z.boolean().describe(
    "An option that specifies whether to create the cluster with enhanced VPC routing enabled. To create a cluster that uses enhanced VPC routing, the cluster must be in a VPC. For more information, see Enhanced VPC Routing in the Amazon Redshift Cluster Management Guide. If this option is true, enhanced VPC routing is enabled. Default: false",
  ).optional(),
  ClusterParameterGroupName: z.string().max(255).describe(
    "The name of the parameter group to be associated with this cluster.",
  ).optional(),
  DeferMaintenanceEndTime: z.string().describe(
    "A timestamp indicating end time for the deferred maintenance window. If you specify an end time, you can't specify a duration.",
  ).optional(),
  RotateEncryptionKey: z.boolean().describe(
    "A boolean indicating if we want to rotate Encryption Keys.",
  ).optional(),
  VpcSecurityGroupIds: z.array(z.string()).describe(
    "A list of Virtual Private Cloud (VPC) security groups to be associated with the cluster.",
  ).optional(),
  ClusterVersion: z.string().describe(
    "The version of the Amazon Redshift engine software that you want to deploy on the cluster.The version selected runs on all the nodes in the cluster.",
  ).optional(),
  HsmConfigurationIdentifier: z.string().describe(
    "Specifies the name of the HSM configuration that contains the information the Amazon Redshift cluster can use to retrieve and store keys in an HSM.",
  ).optional(),
  PreferredMaintenanceWindow: z.string().describe(
    "The weekly time range (in UTC) during which automated cluster maintenance can occur.",
  ).optional(),
  DeferMaintenanceStartTime: z.string().describe(
    "A timestamp indicating the start time for the deferred maintenance window.",
  ).optional(),
  ClusterType: z.string().describe(
    "The type of the cluster. When cluster type is specified as single-node, the NumberOfNodes parameter is not required and if multi-node, the NumberOfNodes parameter is required",
  ),
  Classic: z.boolean().describe(
    "A boolean value indicating whether the resize operation is using the classic resize process. If you don't provide this parameter or set the value to false, the resize type is elastic.",
  ).optional(),
  MasterPasswordSecretKmsKeyId: z.string().describe(
    "The ID of the Key Management Service (KMS) key used to encrypt and store the cluster's admin user credentials secret.",
  ).optional(),
  DeferMaintenanceDuration: z.number().int().describe(
    "An integer indicating the duration of the maintenance window in days. If you specify a duration, you can't specify an end time. The duration must be 60 days or less.",
  ).optional(),
  DBName: z.string().describe(
    "The name of the first database to be created when the cluster is created. To create additional databases after the cluster is created, connect to the cluster with a SQL client and use SQL commands to create a database.",
  ),
  SnapshotCopyRetentionPeriod: z.number().int().describe(
    "The number of days to retain automated snapshots in the destination region after they are copied from the source region. Default is 7. Constraints: Must be at least 1 and no more than 35.",
  ).optional(),
});

const StateSchema = z.object({
  RevisionTarget: z.string().optional(),
  AutomatedSnapshotRetentionPeriod: z.number().optional(),
  Encrypted: z.boolean().optional(),
  Port: z.number().optional(),
  NumberOfNodes: z.number().optional(),
  DestinationRegion: z.string().optional(),
  AllowVersionUpgrade: z.boolean().optional(),
  Endpoint: z.object({
    Address: z.string(),
    Port: z.string(),
  }).optional(),
  NamespaceResourcePolicy: z.record(z.string(), z.unknown()).optional(),
  MaintenanceTrackName: z.string().optional(),
  OwnerAccount: z.string().optional(),
  MultiAZ: z.boolean().optional(),
  Tags: z.array(TagSchema).optional(),
  SnapshotClusterIdentifier: z.string().optional(),
  IamRoles: z.array(z.string()).optional(),
  KmsKeyId: z.string().optional(),
  SnapshotCopyManual: z.boolean().optional(),
  ManageMasterPassword: z.boolean().optional(),
  AvailabilityZone: z.string().optional(),
  ClusterSecurityGroups: z.array(z.string()).optional(),
  ClusterIdentifier: z.string(),
  MasterUserPassword: z.string().optional(),
  ClusterSubnetGroupName: z.string().optional(),
  LoggingProperties: z.object({
    BucketName: z.string(),
    S3KeyPrefix: z.string(),
    LogDestinationType: z.string(),
    LogExports: z.array(z.string()),
  }).optional(),
  DeferMaintenance: z.boolean().optional(),
  NodeType: z.string().optional(),
  MasterUsername: z.string().optional(),
  PubliclyAccessible: z.boolean().optional(),
  DeferMaintenanceIdentifier: z.string().optional(),
  ManualSnapshotRetentionPeriod: z.number().optional(),
  ResourceAction: z.string().optional(),
  HsmClientCertificateIdentifier: z.string().optional(),
  ElasticIp: z.string().optional(),
  AvailabilityZoneRelocationStatus: z.string().optional(),
  AquaConfigurationStatus: z.string().optional(),
  SnapshotIdentifier: z.string().optional(),
  AvailabilityZoneRelocation: z.boolean().optional(),
  SnapshotCopyGrantName: z.string().optional(),
  EnhancedVpcRouting: z.boolean().optional(),
  ClusterParameterGroupName: z.string().optional(),
  DeferMaintenanceEndTime: z.string().optional(),
  RotateEncryptionKey: z.boolean().optional(),
  VpcSecurityGroupIds: z.array(z.string()).optional(),
  ClusterNamespaceArn: z.string().optional(),
  MasterPasswordSecretArn: z.string().optional(),
  ClusterVersion: z.string().optional(),
  HsmConfigurationIdentifier: z.string().optional(),
  PreferredMaintenanceWindow: z.string().optional(),
  DeferMaintenanceStartTime: z.string().optional(),
  ClusterType: z.string().optional(),
  Classic: z.boolean().optional(),
  MasterPasswordSecretKmsKeyId: z.string().optional(),
  DeferMaintenanceDuration: z.number().optional(),
  DBName: z.string().optional(),
  SnapshotCopyRetentionPeriod: z.number().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  RevisionTarget: z.string().describe(
    "The identifier of the database revision. You can retrieve this value from the response to the DescribeClusterDbRevisions request.",
  ).optional(),
  AutomatedSnapshotRetentionPeriod: z.number().int().describe(
    "The number of days that automated snapshots are retained. If the value is 0, automated snapshots are disabled. Default value is 1",
  ).optional(),
  Encrypted: z.boolean().describe(
    "If true, the data in the cluster is encrypted at rest.",
  ).optional(),
  NumberOfNodes: z.number().int().describe(
    "The number of compute nodes in the cluster. This parameter is required when the ClusterType parameter is specified as multi-node.",
  ).optional(),
  DestinationRegion: z.string().describe(
    "The destination AWS Region that you want to copy snapshots to. Constraints: Must be the name of a valid AWS Region. For more information, see Regions and Endpoints in the Amazon Web Services [https://docs.aws.amazon.com/general/latest/gr/rande.html#redshift_region] General Reference",
  ).optional(),
  AllowVersionUpgrade: z.boolean().describe(
    "Major version upgrades can be applied during the maintenance window to the Amazon Redshift engine that is running on the cluster. Default value is True",
  ).optional(),
  NamespaceResourcePolicy: z.record(z.string(), z.unknown()).describe(
    "The namespace resource policy document that will be attached to a Redshift cluster.",
  ).optional(),
  MaintenanceTrackName: z.string().describe(
    "The name for the maintenance track that you want to assign for the cluster. This name change is asynchronous. The new track name stays in the PendingModifiedValues for the cluster until the next maintenance window. When the maintenance track changes, the cluster is switched to the latest cluster release available for the maintenance track. At this point, the maintenance track name is applied.",
  ).optional(),
  OwnerAccount: z.string().optional(),
  MultiAZ: z.boolean().describe(
    "A boolean indicating if the redshift cluster is multi-az or not. If you don't provide this parameter or set the value to false, the redshift cluster will be single-az.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The list of tags for the cluster parameter group.",
  ).optional(),
  SnapshotClusterIdentifier: z.string().describe(
    "The name of the cluster the source snapshot was created from. This parameter is required if your IAM user has a policy containing a snapshot resource element that specifies anything other than * for the cluster name.",
  ).optional(),
  IamRoles: z.array(z.string()).describe(
    "A list of AWS Identity and Access Management (IAM) roles that can be used by the cluster to access other AWS services. You must supply the IAM roles in their Amazon Resource Name (ARN) format. You can supply up to 50 IAM roles in a single request",
  ).optional(),
  KmsKeyId: z.string().describe(
    "The AWS Key Management Service (KMS) key ID of the encryption key that you want to use to encrypt data in the cluster.",
  ).optional(),
  SnapshotCopyManual: z.boolean().describe(
    "Indicates whether to apply the snapshot retention period to newly copied manual snapshots instead of automated snapshots.",
  ).optional(),
  ManageMasterPassword: z.boolean().describe(
    "A boolean indicating if the redshift cluster's admin user credentials is managed by Redshift or not. You can't use MasterUserPassword if ManageMasterPassword is true. If ManageMasterPassword is false or not set, Amazon Redshift uses MasterUserPassword for the admin user account's password.",
  ).optional(),
  AvailabilityZone: z.string().describe(
    "The EC2 Availability Zone (AZ) in which you want Amazon Redshift to provision the cluster. Default: A random, system-chosen Availability Zone in the region that is specified by the endpoint",
  ).optional(),
  ClusterSecurityGroups: z.array(z.string()).describe(
    "A list of security groups to be associated with this cluster.",
  ).optional(),
  ClusterIdentifier: z.string().max(63).describe(
    "A unique identifier for the cluster. You use this identifier to refer to the cluster for any subsequent cluster operations such as deleting or modifying. All alphabetical characters must be lower case, no hypens at the end, no two consecutive hyphens. Cluster name should be unique for all clusters within an AWS account",
  ).optional(),
  MasterUserPassword: z.string().max(64).describe(
    "The password associated with the master user account for the cluster that is being created. You can't use MasterUserPassword if ManageMasterPassword is true. Password must be between 8 and 64 characters in length, should have at least one uppercase letter.Must contain at least one lowercase letter.Must contain one number.Can be any printable ASCII character.",
  ).optional(),
  ClusterSubnetGroupName: z.string().describe(
    "The name of a cluster subnet group to be associated with this cluster.",
  ).optional(),
  LoggingProperties: z.object({
    BucketName: z.string().optional(),
    S3KeyPrefix: z.string().optional(),
    LogDestinationType: z.string().optional(),
    LogExports: z.array(z.string()).optional(),
  }).optional(),
  DeferMaintenance: z.boolean().describe(
    "A boolean indicating whether to enable the deferred maintenance window.",
  ).optional(),
  NodeType: z.string().describe(
    "The node type to be provisioned for the cluster.Valid Values: ds2.xlarge | ds2.8xlarge | dc1.large | dc1.8xlarge | dc2.large | dc2.8xlarge | ra3.large | ra3.4xlarge | ra3.16xlarge",
  ).optional(),
  MasterUsername: z.string().max(128).describe(
    "The user name associated with the master user account for the cluster that is being created. The user name can't be PUBLIC and first character must be a letter.",
  ).optional(),
  PubliclyAccessible: z.boolean().describe(
    "If true, the cluster can be accessed from a public network.",
  ).optional(),
  ManualSnapshotRetentionPeriod: z.number().int().describe(
    "The number of days to retain newly copied snapshots in the destination AWS Region after they are copied from the source AWS Region. If the value is -1, the manual snapshot is retained indefinitely. The value must be either -1 or an integer between 1 and 3,653.",
  ).optional(),
  ResourceAction: z.string().describe(
    "The Redshift operation to be performed. Resource Action supports pause-cluster, resume-cluster, failover-primary-compute APIs",
  ).optional(),
  HsmClientCertificateIdentifier: z.string().describe(
    "Specifies the name of the HSM client certificate the Amazon Redshift cluster uses to retrieve the data encryption keys stored in an HSM",
  ).optional(),
  ElasticIp: z.string().describe(
    "The Elastic IP (EIP) address for the cluster.",
  ).optional(),
  AvailabilityZoneRelocationStatus: z.string().describe(
    "The availability zone relocation status of the cluster",
  ).optional(),
  AquaConfigurationStatus: z.string().describe(
    "The value represents how the cluster is configured to use AQUA (Advanced Query Accelerator) after the cluster is restored. Possible values include the following. enabled - Use AQUA if it is available for the current Region and Amazon Redshift node type. disabled - Don't use AQUA. auto - Amazon Redshift determines whether to use AQUA.",
  ).optional(),
  SnapshotIdentifier: z.string().describe(
    "The name of the snapshot from which to create the new cluster. This parameter isn't case sensitive.",
  ).optional(),
  AvailabilityZoneRelocation: z.boolean().describe(
    "The option to enable relocation for an Amazon Redshift cluster between Availability Zones after the cluster modification is complete.",
  ).optional(),
  SnapshotCopyGrantName: z.string().describe(
    "The name of the snapshot copy grant to use when snapshots of an AWS KMS-encrypted cluster are copied to the destination region.",
  ).optional(),
  EnhancedVpcRouting: z.boolean().describe(
    "An option that specifies whether to create the cluster with enhanced VPC routing enabled. To create a cluster that uses enhanced VPC routing, the cluster must be in a VPC. For more information, see Enhanced VPC Routing in the Amazon Redshift Cluster Management Guide. If this option is true, enhanced VPC routing is enabled. Default: false",
  ).optional(),
  ClusterParameterGroupName: z.string().max(255).describe(
    "The name of the parameter group to be associated with this cluster.",
  ).optional(),
  DeferMaintenanceEndTime: z.string().describe(
    "A timestamp indicating end time for the deferred maintenance window. If you specify an end time, you can't specify a duration.",
  ).optional(),
  RotateEncryptionKey: z.boolean().describe(
    "A boolean indicating if we want to rotate Encryption Keys.",
  ).optional(),
  VpcSecurityGroupIds: z.array(z.string()).describe(
    "A list of Virtual Private Cloud (VPC) security groups to be associated with the cluster.",
  ).optional(),
  ClusterVersion: z.string().describe(
    "The version of the Amazon Redshift engine software that you want to deploy on the cluster.The version selected runs on all the nodes in the cluster.",
  ).optional(),
  HsmConfigurationIdentifier: z.string().describe(
    "Specifies the name of the HSM configuration that contains the information the Amazon Redshift cluster can use to retrieve and store keys in an HSM.",
  ).optional(),
  PreferredMaintenanceWindow: z.string().describe(
    "The weekly time range (in UTC) during which automated cluster maintenance can occur.",
  ).optional(),
  DeferMaintenanceStartTime: z.string().describe(
    "A timestamp indicating the start time for the deferred maintenance window.",
  ).optional(),
  ClusterType: z.string().describe(
    "The type of the cluster. When cluster type is specified as single-node, the NumberOfNodes parameter is not required and if multi-node, the NumberOfNodes parameter is required",
  ).optional(),
  Classic: z.boolean().describe(
    "A boolean value indicating whether the resize operation is using the classic resize process. If you don't provide this parameter or set the value to false, the resize type is elastic.",
  ).optional(),
  MasterPasswordSecretKmsKeyId: z.string().describe(
    "The ID of the Key Management Service (KMS) key used to encrypt and store the cluster's admin user credentials secret.",
  ).optional(),
  DeferMaintenanceDuration: z.number().int().describe(
    "An integer indicating the duration of the maintenance window in days. If you specify a duration, you can't specify an end time. The duration must be 60 days or less.",
  ).optional(),
  DBName: z.string().describe(
    "The name of the first database to be created when the cluster is created. To create additional databases after the cluster is created, connect to the cluster with a SQL client and use SQL commands to create a database.",
  ).optional(),
  SnapshotCopyRetentionPeriod: z.number().int().describe(
    "The number of days to retain automated snapshots in the destination region after they are copied from the source region. Default is 7. Constraints: Must be at least 1 and no more than 35.",
  ).optional(),
});

/** Swamp extension model for Redshift Cluster. Registered at `@swamp/aws/redshift/cluster`. */
export const model = {
  type: "@swamp/aws/redshift/cluster",
  version: "2026.05.27.1",
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
      toVersion: "2026.05.27.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Redshift Cluster resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Redshift Cluster",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Redshift::Cluster",
          desiredState,
        ) as StateData;
        const instanceName =
          ((result.ClusterIdentifier ?? g.ClusterIdentifier)?.toString() ??
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
      description: "Get a Redshift Cluster",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Redshift Cluster",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Redshift::Cluster",
          args.identifier,
        ) as StateData;
        const instanceName =
          ((result.ClusterIdentifier ?? context.globalArgs.ClusterIdentifier)
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
      description: "Update a Redshift Cluster",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.ClusterIdentifier?.toString() ?? "current")
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
        const identifier = existing.ClusterIdentifier?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Redshift::Cluster",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Redshift::Cluster",
          identifier,
          currentState,
          desiredState,
          [
            "ClusterIdentifier",
            "OwnerAccount",
            "SnapshotIdentifier",
            "DBName",
            "SnapshotClusterIdentifier",
            "ClusterSubnetGroupName",
            "MasterUsername",
          ],
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
      description: "Delete a Redshift Cluster",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Redshift Cluster",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Redshift::Cluster",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.ClusterIdentifier?.toString() ?? args.identifier)
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
      description: "Sync Redshift Cluster state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.ClusterIdentifier?.toString() ?? "current")
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
        const identifier = existing.ClusterIdentifier?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Redshift::Cluster",
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
