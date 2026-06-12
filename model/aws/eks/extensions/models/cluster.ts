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

// Auto-generated extension model for @swamp/aws/eks/cluster
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for EKS Cluster (AWS::EKS::Cluster).
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

const ProviderSchema = z.object({
  KeyArn: z.string().describe(
    "Amazon Resource Name (ARN) or alias of the KMS key. The KMS key must be symmetric, created in the same region as the cluster, and if the KMS key was created in a different account, the user must have access to the KMS key.",
  ).optional(),
});

const EncryptionConfigSchema = z.object({
  Resources: z.array(z.string()).describe(
    'Specifies the resources to be encrypted. The only supported value is "secrets".',
  ).optional(),
  Provider: ProviderSchema.describe("The encryption provider for the cluster.")
    .optional(),
});

const ElasticLoadBalancingSchema = z.object({
  Enabled: z.boolean().describe("Todo: add description").optional(),
});

const EtcdPlacementSchema = z.object({
  SpreadLevel: z.string().describe(
    "Optional parameter to specify the placement group spread level for etcd instances. If not provided, EKS will deploy etcd instances without a placement group.",
  ).optional(),
});

const ControlPlanePlacementSchema = z.object({
  GroupName: z.string().describe(
    "The name of the placement group for the Kubernetes control plane instances. This setting can't be changed after cluster creation.",
  ).optional(),
  SpreadLevel: z.string().describe(
    "Optional parameter to specify the placement group spread level for control plane instances. If not provided, EKS will deploy control plane instances without a placement group.",
  ).optional(),
});

const TagSchema = z.object({
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Key: z.string().min(1).max(128).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
});

const LoggingTypeConfigSchema = z.object({
  Type: z.enum([
    "api",
    "audit",
    "authenticator",
    "controllerManager",
    "scheduler",
  ]).describe("name of the log type").optional(),
});

const ClusterLoggingSchema = z.object({
  EnabledTypes: z.array(LoggingTypeConfigSchema).describe(
    "Enable control plane logs for your cluster, all log types will be disabled if the array is empty",
  ).optional(),
});

const BlockStorageSchema = z.object({
  Enabled: z.boolean().describe("Todo: add description").optional(),
});

const RemoteNodeNetworkSchema = z.object({
  Cidrs: z.array(z.string()).describe(
    "Specifies the list of remote node CIDRs.",
  ),
});

const RemotePodNetworkSchema = z.object({
  Cidrs: z.array(z.string()).describe(
    "Specifies the list of remote pod CIDRs.",
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
  Force: z.boolean().describe("Force cluster version update").optional(),
  AccessConfig: z.object({
    AuthenticationMode: z.enum(["CONFIG_MAP", "API_AND_CONFIG_MAP", "API"])
      .describe(
        "Specify the authentication mode that should be used to create your cluster.",
      ).optional(),
    BootstrapClusterCreatorAdminPermissions: z.boolean().describe(
      "Set this value to false to avoid creating a default cluster admin Access Entry using the IAM principal used to create the cluster.",
    ).optional(),
  }).describe(
    "An object representing the Access Config to use for the cluster.",
  ).optional(),
  EncryptionConfig: z.array(EncryptionConfigSchema).optional(),
  KubernetesNetworkConfig: z.object({
    ServiceIpv4Cidr: z.string().describe(
      "The CIDR block to assign Kubernetes service IP addresses from. If you don't specify a block, Kubernetes assigns addresses from either the 10.100.0.0/16 or 172.20.0.0/16 CIDR blocks. We recommend that you specify a block that does not overlap with resources in other networks that are peered or connected to your VPC.",
    ).optional(),
    IpFamily: z.enum(["ipv4", "ipv6"]).describe(
      "Ipv4 or Ipv6. You can only specify ipv6 for 1.21 and later clusters that use version 1.10.1 or later of the Amazon VPC CNI add-on",
    ).optional(),
    ElasticLoadBalancing: ElasticLoadBalancingSchema.describe(
      "Todo: add description",
    ).optional(),
  }).describe("The Kubernetes network configuration for the cluster.")
    .optional(),
  Name: z.string().min(1).max(100).regex(
    new RegExp("^[0-9A-Za-z][A-Za-z0-9\\-_]*"),
  ).describe("The unique name to give to your cluster.").optional(),
  Version: z.string().regex(new RegExp("1\\.\\d\\d")).describe(
    "The desired Kubernetes version for your cluster. If you don't specify a value here, the latest version available in Amazon EKS is used.",
  ).optional(),
  ControlPlaneScalingConfig: z.object({
    Tier: z.enum([
      "standard",
      "tier-xl",
      "tier-2xl",
      "tier-4xl",
      "tier-8xl",
      "tier-ultra",
    ]).describe("The scaling tier for the provisioned control plane.")
      .optional(),
  }).describe("Configuration for provisioned control plane scaling.")
    .optional(),
  OutpostConfig: z.object({
    EtcdPlacement: EtcdPlacementSchema.describe(
      "An object representing the placement configuration for the etcd instances of your local Amazon EKS cluster on an AWS Outpost.",
    ).optional(),
    OutpostArns: z.array(z.string()).describe(
      "The ARN of the Outpost that you want to use for your local Amazon EKS cluster on Outposts. Only a single Outpost ARN is supported.",
    ),
    ControlPlanePlacement: ControlPlanePlacementSchema.describe(
      "An object representing the placement configuration for all the control plane instances of your local Amazon EKS cluster on an AWS Outpost.",
    ).optional(),
    EtcdInstanceType: z.string().describe(
      "The EC2 instance type for etcd instances of your local Amazon EKS cluster on AWS Outposts. This instance type applies to all etcd instances and cannot be changed after cluster creation.",
    ).optional(),
    ControlPlaneInstanceType: z.string().describe(
      "The EC2 instance type for the Kubernetes control plane instances of your local Amazon EKS cluster on AWS Outposts. This instance type applies to all control plane instances and cannot be changed after cluster creation.",
    ),
  }).describe(
    "An object representing the Outpost configuration to use for AWS EKS outpost cluster.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
  Logging: z.object({
    ClusterLogging: ClusterLoggingSchema.describe(
      "The cluster control plane logging configuration for your cluster.",
    ).optional(),
  }).describe(
    "Enable exporting the Kubernetes control plane logs for your cluster to CloudWatch Logs based on log types. By default, cluster control plane logs aren't exported to CloudWatch Logs.",
  ).optional(),
  ComputeConfig: z.object({
    NodePools: z.array(z.string()).describe("Todo: add description").optional(),
    NodeRoleArn: z.string().describe("Todo: add description").optional(),
    Enabled: z.boolean().describe("Todo: add description").optional(),
  }).describe("Todo: add description").optional(),
  StorageConfig: z.object({
    BlockStorage: BlockStorageSchema.describe("Todo: add description")
      .optional(),
  }).describe("Todo: add description").optional(),
  BootstrapSelfManagedAddons: z.boolean().describe(
    "Set this value to false to avoid creating the default networking add-ons when the cluster is created.",
  ).optional(),
  DeletionProtection: z.boolean().describe(
    "Set this value to true to enable deletion protection for the cluster.",
  ).optional(),
  ZonalShiftConfig: z.object({
    Enabled: z.boolean().describe(
      "Set this value to true to enable zonal shift for the cluster.",
    ).optional(),
  }).describe("The current zonal shift configuration to use for the cluster.")
    .optional(),
  RoleArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the IAM role that provides permissions for the Kubernetes control plane to make calls to AWS API operations on your behalf.",
  ),
  UpgradePolicy: z.object({
    SupportType: z.enum(["STANDARD", "EXTENDED"]).describe(
      "Specify the support type for your cluster.",
    ).optional(),
  }).describe(
    "An object representing the Upgrade Policy to use for the cluster.",
  ).optional(),
  RemoteNetworkConfig: z.object({
    RemoteNodeNetworks: z.array(RemoteNodeNetworkSchema).describe(
      "Network configuration of nodes run on-premises with EKS Hybrid Nodes.",
    ).optional(),
    RemotePodNetworks: z.array(RemotePodNetworkSchema).describe(
      "Network configuration of pods run on-premises with EKS Hybrid Nodes.",
    ).optional(),
  }).describe(
    "Configuration fields for specifying on-premises node and pod CIDRs that are external to the VPC passed during cluster creation.",
  ).optional(),
  ResourcesVpcConfig: z.object({
    EndpointPublicAccess: z.boolean().describe(
      "Set this value to false to disable public access to your cluster's Kubernetes API server endpoint. If you disable public access, your cluster's Kubernetes API server can only receive requests from within the cluster VPC. The default value for this parameter is true, which enables public access for your Kubernetes API server.",
    ).optional(),
    PublicAccessCidrs: z.array(z.string()).describe(
      "The CIDR blocks that are allowed access to your cluster's public Kubernetes API server endpoint. Communication to the endpoint from addresses outside of the CIDR blocks that you specify is denied. The default value is 0.0.0.0/0. If you've disabled private endpoint access and you have nodes or AWS Fargate pods in the cluster, then ensure that you specify the necessary CIDR blocks.",
    ).optional(),
    EndpointPrivateAccess: z.boolean().describe(
      "Set this value to true to enable private access for your cluster's Kubernetes API server endpoint. If you enable private access, Kubernetes API requests from within your cluster's VPC use the private VPC endpoint. The default value for this parameter is false, which disables private access for your Kubernetes API server. If you disable private access and you have nodes or AWS Fargate pods in the cluster, then ensure that publicAccessCidrs includes the necessary CIDR blocks for communication with the nodes or Fargate pods.",
    ).optional(),
    SecurityGroupIds: z.array(z.string()).describe(
      "Specify one or more security groups for the cross-account elastic network interfaces that Amazon EKS creates to use to allow communication between your worker nodes and the Kubernetes control plane. If you don't specify a security group, the default security group for your VPC is used.",
    ).optional(),
    SubnetIds: z.array(z.string()).describe(
      "Specify subnets for your Amazon EKS nodes. Amazon EKS creates cross-account elastic network interfaces in these subnets to allow communication between your nodes and the Kubernetes control plane.",
    ),
  }).describe(
    "An object representing the VPC configuration to use for an Amazon EKS cluster.",
  ),
});

const StateSchema = z.object({
  Force: z.boolean().optional(),
  AccessConfig: z.object({
    AuthenticationMode: z.string(),
    BootstrapClusterCreatorAdminPermissions: z.boolean(),
  }).optional(),
  CertificateAuthorityData: z.string().optional(),
  EncryptionConfig: z.array(EncryptionConfigSchema).optional(),
  KubernetesNetworkConfig: z.object({
    ServiceIpv4Cidr: z.string(),
    ServiceIpv6Cidr: z.string(),
    IpFamily: z.string(),
    ElasticLoadBalancing: ElasticLoadBalancingSchema,
  }).optional(),
  Name: z.string(),
  Endpoint: z.string().optional(),
  Version: z.string().optional(),
  ControlPlaneScalingConfig: z.object({
    Tier: z.string(),
  }).optional(),
  ClusterSecurityGroupId: z.string().optional(),
  OutpostConfig: z.object({
    EtcdPlacement: EtcdPlacementSchema,
    OutpostArns: z.array(z.string()),
    ControlPlanePlacement: ControlPlanePlacementSchema,
    EtcdInstanceType: z.string(),
    ControlPlaneInstanceType: z.string(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
  OpenIdConnectIssuerUrl: z.string().optional(),
  Logging: z.object({
    ClusterLogging: ClusterLoggingSchema,
  }).optional(),
  ComputeConfig: z.object({
    NodePools: z.array(z.string()),
    NodeRoleArn: z.string(),
    Enabled: z.boolean(),
  }).optional(),
  StorageConfig: z.object({
    BlockStorage: BlockStorageSchema,
  }).optional(),
  BootstrapSelfManagedAddons: z.boolean().optional(),
  EncryptionConfigKeyArn: z.string().optional(),
  DeletionProtection: z.boolean().optional(),
  ZonalShiftConfig: z.object({
    Enabled: z.boolean(),
  }).optional(),
  RoleArn: z.string().optional(),
  UpgradePolicy: z.object({
    SupportType: z.string(),
  }).optional(),
  RemoteNetworkConfig: z.object({
    RemoteNodeNetworks: z.array(RemoteNodeNetworkSchema),
    RemotePodNetworks: z.array(RemotePodNetworkSchema),
  }).optional(),
  Id: z.string().optional(),
  Arn: z.string().optional(),
  ResourcesVpcConfig: z.object({
    EndpointPublicAccess: z.boolean(),
    PublicAccessCidrs: z.array(z.string()),
    EndpointPrivateAccess: z.boolean(),
    SecurityGroupIds: z.array(z.string()),
    SubnetIds: z.array(z.string()),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Force: z.boolean().describe("Force cluster version update").optional(),
  AccessConfig: z.object({
    AuthenticationMode: z.enum(["CONFIG_MAP", "API_AND_CONFIG_MAP", "API"])
      .describe(
        "Specify the authentication mode that should be used to create your cluster.",
      ).optional(),
    BootstrapClusterCreatorAdminPermissions: z.boolean().describe(
      "Set this value to false to avoid creating a default cluster admin Access Entry using the IAM principal used to create the cluster.",
    ).optional(),
  }).describe(
    "An object representing the Access Config to use for the cluster.",
  ).optional(),
  EncryptionConfig: z.array(EncryptionConfigSchema).optional(),
  KubernetesNetworkConfig: z.object({
    ServiceIpv4Cidr: z.string().describe(
      "The CIDR block to assign Kubernetes service IP addresses from. If you don't specify a block, Kubernetes assigns addresses from either the 10.100.0.0/16 or 172.20.0.0/16 CIDR blocks. We recommend that you specify a block that does not overlap with resources in other networks that are peered or connected to your VPC.",
    ).optional(),
    IpFamily: z.enum(["ipv4", "ipv6"]).describe(
      "Ipv4 or Ipv6. You can only specify ipv6 for 1.21 and later clusters that use version 1.10.1 or later of the Amazon VPC CNI add-on",
    ).optional(),
    ElasticLoadBalancing: ElasticLoadBalancingSchema.describe(
      "Todo: add description",
    ).optional(),
  }).describe("The Kubernetes network configuration for the cluster.")
    .optional(),
  Name: z.string().min(1).max(100).regex(
    new RegExp("^[0-9A-Za-z][A-Za-z0-9\\-_]*"),
  ).describe("The unique name to give to your cluster.").optional(),
  Version: z.string().regex(new RegExp("1\\.\\d\\d")).describe(
    "The desired Kubernetes version for your cluster. If you don't specify a value here, the latest version available in Amazon EKS is used.",
  ).optional(),
  ControlPlaneScalingConfig: z.object({
    Tier: z.enum([
      "standard",
      "tier-xl",
      "tier-2xl",
      "tier-4xl",
      "tier-8xl",
      "tier-ultra",
    ]).describe("The scaling tier for the provisioned control plane.")
      .optional(),
  }).describe("Configuration for provisioned control plane scaling.")
    .optional(),
  OutpostConfig: z.object({
    EtcdPlacement: EtcdPlacementSchema.describe(
      "An object representing the placement configuration for the etcd instances of your local Amazon EKS cluster on an AWS Outpost.",
    ).optional(),
    OutpostArns: z.array(z.string()).describe(
      "The ARN of the Outpost that you want to use for your local Amazon EKS cluster on Outposts. Only a single Outpost ARN is supported.",
    ).optional(),
    ControlPlanePlacement: ControlPlanePlacementSchema.describe(
      "An object representing the placement configuration for all the control plane instances of your local Amazon EKS cluster on an AWS Outpost.",
    ).optional(),
    EtcdInstanceType: z.string().describe(
      "The EC2 instance type for etcd instances of your local Amazon EKS cluster on AWS Outposts. This instance type applies to all etcd instances and cannot be changed after cluster creation.",
    ).optional(),
    ControlPlaneInstanceType: z.string().describe(
      "The EC2 instance type for the Kubernetes control plane instances of your local Amazon EKS cluster on AWS Outposts. This instance type applies to all control plane instances and cannot be changed after cluster creation.",
    ).optional(),
  }).describe(
    "An object representing the Outpost configuration to use for AWS EKS outpost cluster.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
  Logging: z.object({
    ClusterLogging: ClusterLoggingSchema.describe(
      "The cluster control plane logging configuration for your cluster.",
    ).optional(),
  }).describe(
    "Enable exporting the Kubernetes control plane logs for your cluster to CloudWatch Logs based on log types. By default, cluster control plane logs aren't exported to CloudWatch Logs.",
  ).optional(),
  ComputeConfig: z.object({
    NodePools: z.array(z.string()).describe("Todo: add description").optional(),
    NodeRoleArn: z.string().describe("Todo: add description").optional(),
    Enabled: z.boolean().describe("Todo: add description").optional(),
  }).describe("Todo: add description").optional(),
  StorageConfig: z.object({
    BlockStorage: BlockStorageSchema.describe("Todo: add description")
      .optional(),
  }).describe("Todo: add description").optional(),
  BootstrapSelfManagedAddons: z.boolean().describe(
    "Set this value to false to avoid creating the default networking add-ons when the cluster is created.",
  ).optional(),
  DeletionProtection: z.boolean().describe(
    "Set this value to true to enable deletion protection for the cluster.",
  ).optional(),
  ZonalShiftConfig: z.object({
    Enabled: z.boolean().describe(
      "Set this value to true to enable zonal shift for the cluster.",
    ).optional(),
  }).describe("The current zonal shift configuration to use for the cluster.")
    .optional(),
  RoleArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the IAM role that provides permissions for the Kubernetes control plane to make calls to AWS API operations on your behalf.",
  ).optional(),
  UpgradePolicy: z.object({
    SupportType: z.enum(["STANDARD", "EXTENDED"]).describe(
      "Specify the support type for your cluster.",
    ).optional(),
  }).describe(
    "An object representing the Upgrade Policy to use for the cluster.",
  ).optional(),
  RemoteNetworkConfig: z.object({
    RemoteNodeNetworks: z.array(RemoteNodeNetworkSchema).describe(
      "Network configuration of nodes run on-premises with EKS Hybrid Nodes.",
    ).optional(),
    RemotePodNetworks: z.array(RemotePodNetworkSchema).describe(
      "Network configuration of pods run on-premises with EKS Hybrid Nodes.",
    ).optional(),
  }).describe(
    "Configuration fields for specifying on-premises node and pod CIDRs that are external to the VPC passed during cluster creation.",
  ).optional(),
  ResourcesVpcConfig: z.object({
    EndpointPublicAccess: z.boolean().describe(
      "Set this value to false to disable public access to your cluster's Kubernetes API server endpoint. If you disable public access, your cluster's Kubernetes API server can only receive requests from within the cluster VPC. The default value for this parameter is true, which enables public access for your Kubernetes API server.",
    ).optional(),
    PublicAccessCidrs: z.array(z.string()).describe(
      "The CIDR blocks that are allowed access to your cluster's public Kubernetes API server endpoint. Communication to the endpoint from addresses outside of the CIDR blocks that you specify is denied. The default value is 0.0.0.0/0. If you've disabled private endpoint access and you have nodes or AWS Fargate pods in the cluster, then ensure that you specify the necessary CIDR blocks.",
    ).optional(),
    EndpointPrivateAccess: z.boolean().describe(
      "Set this value to true to enable private access for your cluster's Kubernetes API server endpoint. If you enable private access, Kubernetes API requests from within your cluster's VPC use the private VPC endpoint. The default value for this parameter is false, which disables private access for your Kubernetes API server. If you disable private access and you have nodes or AWS Fargate pods in the cluster, then ensure that publicAccessCidrs includes the necessary CIDR blocks for communication with the nodes or Fargate pods.",
    ).optional(),
    SecurityGroupIds: z.array(z.string()).describe(
      "Specify one or more security groups for the cross-account elastic network interfaces that Amazon EKS creates to use to allow communication between your worker nodes and the Kubernetes control plane. If you don't specify a security group, the default security group for your VPC is used.",
    ).optional(),
    SubnetIds: z.array(z.string()).describe(
      "Specify subnets for your Amazon EKS nodes. Amazon EKS creates cross-account elastic network interfaces in these subnets to allow communication between your nodes and the Kubernetes control plane.",
    ).optional(),
  }).describe(
    "An object representing the VPC configuration to use for an Amazon EKS cluster.",
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

/** Swamp extension model for EKS Cluster. Registered at `@swamp/aws/eks/cluster`. */
export const model = {
  type: "@swamp/aws/eks/cluster",
  version: "2026.06.12.1",
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
      toVersion: "2026.06.12.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "EKS Cluster resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EKS Cluster",
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
          "AWS::EKS::Cluster",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName = ((result.Name ?? g.Name)?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a EKS Cluster",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EKS Cluster",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::EKS::Cluster",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.Name ?? context.globalArgs.Name)?.toString() ??
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
      description: "Update a EKS Cluster",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.Name?.toString() ?? "current").replace(
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
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::EKS::Cluster",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::EKS::Cluster",
          identifier,
          currentState,
          desiredState,
          [
            "OutpostConfig",
            "EncryptionConfig",
            "IpFamily",
            "ServiceIpv4Cidr",
            "BootstrapClusterCreatorAdminPermissions",
            "Name",
            "RoleArn",
            "BootstrapSelfManagedAddons",
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
      description: "Delete a EKS Cluster",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EKS Cluster",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::EKS::Cluster",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.Name?.toString() ?? args.identifier).replace(
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
      description: "Sync EKS Cluster state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.Name?.toString() ?? "current").replace(
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
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::EKS::Cluster",
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
