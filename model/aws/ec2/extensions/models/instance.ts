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

// Auto-generated extension model for @swamp/aws/ec2/instance
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for EC2 Instance (AWS::EC2::Instance).
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

const VolumeSchema = z.object({
  VolumeId: z.string().describe(
    "The ID of the EBS volume. The volume and instance must be within the same Availability Zone.",
  ),
  Device: z.string().describe(
    "The device name (for example, /dev/sdh or xvdh).",
  ),
});

const TagSchema = z.object({
  Value: z.string(),
  Key: z.string(),
});

const LicenseSpecificationSchema = z.object({
  LicenseConfigurationArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the license configuration.",
  ),
});

const AssociationParameterSchema = z.object({
  Value: z.array(z.string()).describe("The value of an input parameter."),
  Key: z.string().describe(
    "The name of an input parameter that is in the associated SSM document.",
  ),
});

const SsmAssociationSchema = z.object({
  AssociationParameters: z.array(AssociationParameterSchema).describe(
    "The input parameter values to use with the associated SSM document.",
  ).optional(),
  DocumentName: z.string().describe(
    "The name of an SSM document to associate with the instance.",
  ),
});

const EbsSchema = z.object({
  SnapshotId: z.string().describe("The ID of the snapshot.").optional(),
  VolumeType: z.string().describe("The volume type.").optional(),
  KmsKeyId: z.string().describe(
    "The identifier of the AWS Key Management Service (AWS KMS) customer managed CMK to use for Amazon EBS encryption. If KmsKeyId is specified, the encrypted state must be true. If the encrypted state is true but you do not specify KmsKeyId, your AWS managed CMK for EBS is used.",
  ).optional(),
  Encrypted: z.boolean().describe(
    "Indicates whether the volume should be encrypted.",
  ).optional(),
  Iops: z.number().int().describe(
    "The number of I/O operations per second (IOPS). For gp3, io1, and io2 volumes, this represents the number of IOPS that are provisioned for the volume. For gp2 volumes, this represents the baseline performance of the volume and the rate at which the volume accumulates I/O credits for bursting.",
  ).optional(),
  VolumeSize: z.number().int().describe(
    "The size of the volume, in GiBs. You must specify either a snapshot ID or a volume size. If you specify a snapshot, the default is the snapshot size. You can specify a volume size that is equal to or larger than the snapshot size.",
  ).optional(),
  DeleteOnTermination: z.boolean().describe(
    "Indicates whether the EBS volume is deleted on instance termination.",
  ).optional(),
});

const BlockDeviceMappingSchema = z.object({
  Ebs: EbsSchema.describe(
    "Parameters used to automatically set up EBS volumes when the instance is launched.",
  ).optional(),
  NoDevice: z.record(z.string(), z.unknown()).optional(),
  VirtualName: z.string().optional(),
  DeviceName: z.string().describe(
    "The device name (for example, /dev/sdh or xvdh).",
  ),
});

const InstanceIpv6AddressSchema = z.object({
  Ipv6Address: z.string().describe("The IPv6 address."),
});

const ElasticGpuSpecificationSchema = z.object({
  Type: z.string().describe(
    "The type of Elastic Graphics accelerator. Amazon Elastic Graphics is no longer available.",
  ),
});

const ElasticInferenceAcceleratorSchema = z.object({
  Type: z.string().describe(
    "The type of elastic inference accelerator. Amazon Elastic Inference is no longer available.",
  ),
  Count: z.number().int().min(0).describe(
    "The number of elastic inference accelerators to attach to the instance. Amazon Elastic Inference is no longer available.",
  ).optional(),
});

const PrivateIpAddressSpecificationSchema = z.object({
  PrivateIpAddress: z.string().describe("The private IPv4 addresses."),
  Primary: z.boolean().describe(
    "Indicates whether the private IPv4 address is the primary private IPv4 address. Only one IPv4 address can be designated as primary.",
  ),
});

const EnaSrdUdpSpecificationSchema = z.object({
  EnaSrdUdpEnabled: z.boolean().describe(
    "Indicates whether UDP traffic uses ENA Express for your instance.",
  ).optional(),
});

const EnaSrdSpecificationSchema = z.object({
  EnaSrdEnabled: z.boolean().describe(
    "Specifies whether ENA Express is enabled for the network interface when you launch an instance.",
  ).optional(),
  EnaSrdUdpSpecification: EnaSrdUdpSpecificationSchema.describe(
    "Contains ENA Express settings for UDP network traffic for the network interface that's attached to the instance.",
  ).optional(),
});

const NetworkInterfaceSchema = z.object({
  Description: z.string().describe("The description of the network interface.")
    .optional(),
  PrivateIpAddress: z.string().describe(
    "The private IPv4 address of the network interface.",
  ).optional(),
  PrivateIpAddresses: z.array(PrivateIpAddressSpecificationSchema).describe(
    "One or more private IPv4 addresses to assign to the network interface.",
  ).optional(),
  SecondaryPrivateIpAddressCount: z.number().int().describe(
    "The number of secondary private IPv4 addresses.",
  ).optional(),
  DeviceIndex: z.string().describe(
    "The position of the network interface in the attachment order. A primary network interface has a device index of 0.",
  ),
  GroupSet: z.array(z.string()).describe(
    "The IDs of the security groups for the network interface.",
  ).optional(),
  Ipv6Addresses: z.array(InstanceIpv6AddressSchema).describe(
    "The IPv6 addresses associated with the network interface.",
  ).optional(),
  SubnetId: z.string().describe("The ID of the subnet.").optional(),
  AssociatePublicIpAddress: z.boolean().describe(
    "Indicates whether to assign a public IPv4 address to an instance you launch in a VPC.",
  ).optional(),
  NetworkInterfaceId: z.string().describe("The ID of the network interface.")
    .optional(),
  AssociateCarrierIpAddress: z.boolean().describe(
    "Not currently supported by AWS CloudFormation.",
  ).optional(),
  EnaSrdSpecification: EnaSrdSpecificationSchema.describe(
    "Specifies the ENA Express settings for the network interface that's attached to the instance.",
  ).optional(),
  Ipv6AddressCount: z.number().int().describe(
    "A number of IPv6 addresses to assign to the network interface.",
  ).optional(),
  DeleteOnTermination: z.boolean().describe(
    "If set to true, the interface is deleted when the instance is terminated.",
  ).optional(),
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
    "AWS region; overrides AWS_REGION environment variable. Defaults to us-east-1.",
  ).optional(),
  Volumes: z.array(VolumeSchema).describe(
    "The volumes to attach to the instance.",
  ).optional(),
  EnclaveOptions: z.object({
    Enabled: z.boolean().describe(
      "If this parameter is set to true, the instance is enabled for AWS Nitro Enclaves; otherwise, it is not enabled for AWS Nitro Enclaves.",
    ).optional(),
  }).describe(
    "Indicates whether the instance is enabled for AWS Nitro Enclaves.",
  ).optional(),
  ImageId: z.string().describe(
    "The ID of the AMI. An AMI ID is required to launch an instance and must be specified here or in a launch template.",
  ).optional(),
  Tags: z.array(TagSchema).describe("The tags to add to the instance.")
    .optional(),
  AdditionalInfo: z.string().describe(
    "This property is reserved for internal use. If you use it, the stack fails with this error: Bad property set: [Testing this property] (Service: AmazonEC2; Status Code: 400; Error Code: InvalidParameterCombination; Request ID: 0XXXXXX-49c7-4b40-8bcc-76885dcXXXXX).",
  ).optional(),
  HibernationOptions: z.object({
    Configured: z.boolean().describe(
      "If you set this parameter to true, your instance is enabled for hibernation.",
    ).optional(),
  }).describe("Indicates whether an instance is enabled for hibernation.")
    .optional(),
  LicenseSpecifications: z.array(LicenseSpecificationSchema).describe(
    "The license configurations.",
  ).optional(),
  MetadataOptions: z.object({
    HttpPutResponseHopLimit: z.number().int().min(1).max(64).describe(
      "The number of network hops that the metadata token can travel. Maximum is 64.",
    ).optional(),
    HttpProtocolIpv6: z.enum(["disabled", "enabled"]).describe(
      "Enables or disables the IPv6 endpoint for the instance metadata service. To use this option, the instance must be a Nitro-based instance launched in a subnet that supports IPv6.",
    ).optional(),
    HttpTokens: z.enum(["optional", "required"]).describe(
      "Indicates whether IMDSv2 is required.",
    ).optional(),
    InstanceMetadataTags: z.enum(["disabled", "enabled"]).describe(
      "Indicates whether tags from the instance are propagated to the EBS volumes.",
    ).optional(),
    HttpEndpoint: z.enum(["disabled", "enabled"]).describe(
      "Enables or disables the HTTP metadata endpoint on your instances. If you specify a value of disabled, you cannot access your instance metadata.",
    ).optional(),
  }).describe("The metadata options for the instance").optional(),
  CpuOptions: z.object({
    ThreadsPerCore: z.number().int().optional(),
    CoreCount: z.number().int().optional(),
  }).describe("The CPU options for the instance.").optional(),
  AvailabilityZone: z.string().describe(
    "The Availability Zone of the instance.",
  ).optional(),
  PrivateDnsNameOptions: z.object({
    EnableResourceNameDnsARecord: z.boolean().describe(
      "Indicates whether to respond to DNS queries for instance hostnames with DNS A records. For more information, see Amazon EC2 instance hostname types in the Amazon Elastic Compute Cloud User Guide.",
    ).optional(),
    HostnameType: z.enum(["ip-name", "resource-name"]).describe(
      "The type of hostnames to assign to instances in the subnet at launch. For IPv4 only subnets, an instance DNS name must be based on the instance IPv4 address. For IPv6 only subnets, an instance DNS name must be based on the instance ID. For dual-stack subnets, you can specify whether DNS names use the instance IPv4 address or the instance ID. For more information, see Amazon EC2 instance hostname types in the Amazon Elastic Compute Cloud User Guide.",
    ).optional(),
    EnableResourceNameDnsAAAARecord: z.boolean().describe(
      "Indicates whether to respond to DNS queries for instance hostnames with DNS AAAA records. For more information, see Amazon EC2 instance hostname types in the Amazon Elastic Compute Cloud User Guide.",
    ).optional(),
  }).describe("The options for the instance hostname.").optional(),
  HostId: z.string().describe(
    "If you specify host for the Affinity property, the ID of a dedicated host that the instance is associated with. If you don't specify an ID, Amazon EC2 launches the instance onto any available, compatible dedicated host in your account.",
  ).optional(),
  SecurityGroupIds: z.array(z.string()).describe(
    "The IDs of the security groups.",
  ).optional(),
  PlacementGroupName: z.string().describe(
    "The name of an existing placement group that you want to launch the instance into (cluster | partition | spread).",
  ).optional(),
  SsmAssociations: z.array(SsmAssociationSchema).describe(
    "The SSM document and parameter values in AWS Systems Manager to associate with this instance.",
  ).optional(),
  State: z.object({
    Code: z.string().describe(
      "The state of the instance as a 16-bit unsigned integer.",
    ).optional(),
    Name: z.string().describe("The current state of the instance.").optional(),
  }).describe("The current state of the instance.").optional(),
  Affinity: z.enum(["default", "host"]).describe(
    "Indicates whether the instance is associated with a dedicated host. If you want the instance to always restart on the same host on which it was launched, specify host. If you want the instance to restart on any available host, but try to launch onto the last host it ran on (on a best-effort basis), specify default.",
  ).optional(),
  Tenancy: z.string().describe(
    "The tenancy of the instance (if the instance is running in a VPC). An instance with a tenancy of dedicated runs on single-tenant hardware.",
  ).optional(),
  SecurityGroups: z.array(z.string()).describe(
    "the names of the security groups. For a nondefault VPC, you must use security group IDs instead.",
  ).optional(),
  PrivateIpAddress: z.string().describe(
    "[EC2-VPC] The primary IPv4 address. You must specify a value from the IPv4 address range of the subnet.",
  ).optional(),
  UserData: z.string().describe(
    "The user data to make available to the instance.",
  ).optional(),
  BlockDeviceMappings: z.array(BlockDeviceMappingSchema).describe(
    "The block device mapping entries that defines the block devices to attach to the instance at launch.",
  ).optional(),
  IamInstanceProfile: z.string().describe("The IAM instance profile.")
    .optional(),
  Ipv6Addresses: z.array(InstanceIpv6AddressSchema).describe(
    "[EC2-VPC] The IPv6 addresses from the range of the subnet to associate with the primary network interface.",
  ).optional(),
  KernelId: z.string().describe("The ID of the kernel.").optional(),
  SubnetId: z.string().describe(
    "[EC2-VPC] The ID of the subnet to launch the instance into.",
  ).optional(),
  EbsOptimized: z.boolean().describe(
    "Indicates whether the instance is optimized for Amazon EBS I/O.",
  ).optional(),
  PropagateTagsToVolumeOnCreation: z.boolean().describe(
    "Indicates whether to assign the tags from the instance to all of the volumes attached to the instance at launch. If you specify true and you assign tags to the instance, those tags are automatically assigned to all of the volumes that you attach to the instance at launch. If you specify false, those tags are not assigned to the attached volumes.",
  ).optional(),
  ElasticGpuSpecifications: z.array(ElasticGpuSpecificationSchema).describe(
    "An elastic GPU to associate with the instance. Amazon Elastic Graphics is no longer available.",
  ).optional(),
  ElasticInferenceAccelerators: z.array(ElasticInferenceAcceleratorSchema)
    .describe(
      "An elastic inference accelerator to associate with the instance. Amazon Elastic Inference is no longer available.",
    ).optional(),
  Ipv6AddressCount: z.number().int().describe(
    "[EC2-VPC] The number of IPv6 addresses to associate with the primary network interface. Amazon EC2 chooses the IPv6 addresses from the range of your subnet.",
  ).optional(),
  LaunchTemplate: z.object({
    LaunchTemplateName: z.string().describe(
      "The name of the launch template. You must specify the LaunchTemplateName or the LaunchTemplateId, but not both.",
    ).optional(),
    Version: z.string().describe("The version number of the launch template.")
      .optional(),
    LaunchTemplateId: z.string().describe(
      "The ID of the launch template. You must specify the LaunchTemplateName or the LaunchTemplateId, but not both.",
    ).optional(),
  }).describe("The launch template to use to launch the instances.").optional(),
  NetworkInterfaces: z.array(NetworkInterfaceSchema).describe(
    "The network interfaces to associate with the instance.",
  ).optional(),
  InstanceType: z.string().describe("The instance type.").optional(),
  Monitoring: z.boolean().describe(
    "Specifies whether detailed monitoring is enabled for the instance.",
  ).optional(),
  InstanceInitiatedShutdownBehavior: z.string().describe(
    "Indicates whether an instance stops or terminates when you initiate shutdown from the instance (using the operating system command for system shutdown).",
  ).optional(),
  HostResourceGroupArn: z.string().describe(
    "The ARN of the host resource group in which to launch the instances. If you specify a host resource group ARN, omit the Tenancy parameter or set it to host.",
  ).optional(),
  DisableApiTermination: z.boolean().describe(
    "If you set this parameter to true, you can't terminate the instance using the Amazon EC2 console, CLI, or API; otherwise, you can.",
  ).optional(),
  KeyName: z.string().describe("The name of the key pair.").optional(),
  RamdiskId: z.string().describe("The ID of the RAM disk to select.")
    .optional(),
  SourceDestCheck: z.boolean().describe(
    "Specifies whether to enable an instance launched in a VPC to perform NAT.",
  ).optional(),
  CreditSpecification: z.object({
    CPUCredits: z.string().optional(),
  }).describe(
    "The credit option for CPU usage of the burstable performance instance. Valid values are standard and unlimited.",
  ).optional(),
});

const StateSchema = z.object({
  PrivateDnsName: z.string().optional(),
  Volumes: z.array(VolumeSchema).optional(),
  PrivateIp: z.string().optional(),
  EnclaveOptions: z.object({
    Enabled: z.boolean(),
  }).optional(),
  ImageId: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  AdditionalInfo: z.string().optional(),
  HibernationOptions: z.object({
    Configured: z.boolean(),
  }).optional(),
  LicenseSpecifications: z.array(LicenseSpecificationSchema).optional(),
  MetadataOptions: z.object({
    HttpPutResponseHopLimit: z.number(),
    HttpProtocolIpv6: z.string(),
    HttpTokens: z.string(),
    InstanceMetadataTags: z.string(),
    HttpEndpoint: z.string(),
  }).optional(),
  InstanceId: z.string(),
  CpuOptions: z.object({
    ThreadsPerCore: z.number(),
    CoreCount: z.number(),
  }).optional(),
  AvailabilityZone: z.string().optional(),
  PrivateDnsNameOptions: z.object({
    EnableResourceNameDnsARecord: z.boolean(),
    HostnameType: z.string(),
    EnableResourceNameDnsAAAARecord: z.boolean(),
  }).optional(),
  HostId: z.string().optional(),
  PublicDnsName: z.string().optional(),
  SecurityGroupIds: z.array(z.string()).optional(),
  PlacementGroupName: z.string().optional(),
  SsmAssociations: z.array(SsmAssociationSchema).optional(),
  VpcId: z.string().optional(),
  State: z.object({
    Code: z.string(),
    Name: z.string(),
  }).optional(),
  Affinity: z.string().optional(),
  Tenancy: z.string().optional(),
  SecurityGroups: z.array(z.string()).optional(),
  PrivateIpAddress: z.string().optional(),
  UserData: z.string().optional(),
  BlockDeviceMappings: z.array(BlockDeviceMappingSchema).optional(),
  IamInstanceProfile: z.string().optional(),
  Ipv6Addresses: z.array(InstanceIpv6AddressSchema).optional(),
  KernelId: z.string().optional(),
  SubnetId: z.string().optional(),
  EbsOptimized: z.boolean().optional(),
  PropagateTagsToVolumeOnCreation: z.boolean().optional(),
  ElasticGpuSpecifications: z.array(ElasticGpuSpecificationSchema).optional(),
  ElasticInferenceAccelerators: z.array(ElasticInferenceAcceleratorSchema)
    .optional(),
  Ipv6AddressCount: z.number().optional(),
  LaunchTemplate: z.object({
    LaunchTemplateName: z.string(),
    Version: z.string(),
    LaunchTemplateId: z.string(),
  }).optional(),
  NetworkInterfaces: z.array(NetworkInterfaceSchema).optional(),
  InstanceType: z.string().optional(),
  Monitoring: z.boolean().optional(),
  PublicIp: z.string().optional(),
  InstanceInitiatedShutdownBehavior: z.string().optional(),
  HostResourceGroupArn: z.string().optional(),
  DisableApiTermination: z.boolean().optional(),
  KeyName: z.string().optional(),
  RamdiskId: z.string().optional(),
  SourceDestCheck: z.boolean().optional(),
  CreditSpecification: z.object({
    CPUCredits: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Volumes: z.array(VolumeSchema).describe(
    "The volumes to attach to the instance.",
  ).optional(),
  EnclaveOptions: z.object({
    Enabled: z.boolean().describe(
      "If this parameter is set to true, the instance is enabled for AWS Nitro Enclaves; otherwise, it is not enabled for AWS Nitro Enclaves.",
    ).optional(),
  }).describe(
    "Indicates whether the instance is enabled for AWS Nitro Enclaves.",
  ).optional(),
  ImageId: z.string().describe(
    "The ID of the AMI. An AMI ID is required to launch an instance and must be specified here or in a launch template.",
  ).optional(),
  Tags: z.array(TagSchema).describe("The tags to add to the instance.")
    .optional(),
  AdditionalInfo: z.string().describe(
    "This property is reserved for internal use. If you use it, the stack fails with this error: Bad property set: [Testing this property] (Service: AmazonEC2; Status Code: 400; Error Code: InvalidParameterCombination; Request ID: 0XXXXXX-49c7-4b40-8bcc-76885dcXXXXX).",
  ).optional(),
  HibernationOptions: z.object({
    Configured: z.boolean().describe(
      "If you set this parameter to true, your instance is enabled for hibernation.",
    ).optional(),
  }).describe("Indicates whether an instance is enabled for hibernation.")
    .optional(),
  LicenseSpecifications: z.array(LicenseSpecificationSchema).describe(
    "The license configurations.",
  ).optional(),
  MetadataOptions: z.object({
    HttpPutResponseHopLimit: z.number().int().min(1).max(64).describe(
      "The number of network hops that the metadata token can travel. Maximum is 64.",
    ).optional(),
    HttpProtocolIpv6: z.enum(["disabled", "enabled"]).describe(
      "Enables or disables the IPv6 endpoint for the instance metadata service. To use this option, the instance must be a Nitro-based instance launched in a subnet that supports IPv6.",
    ).optional(),
    HttpTokens: z.enum(["optional", "required"]).describe(
      "Indicates whether IMDSv2 is required.",
    ).optional(),
    InstanceMetadataTags: z.enum(["disabled", "enabled"]).describe(
      "Indicates whether tags from the instance are propagated to the EBS volumes.",
    ).optional(),
    HttpEndpoint: z.enum(["disabled", "enabled"]).describe(
      "Enables or disables the HTTP metadata endpoint on your instances. If you specify a value of disabled, you cannot access your instance metadata.",
    ).optional(),
  }).describe("The metadata options for the instance").optional(),
  CpuOptions: z.object({
    ThreadsPerCore: z.number().int().optional(),
    CoreCount: z.number().int().optional(),
  }).describe("The CPU options for the instance.").optional(),
  AvailabilityZone: z.string().describe(
    "The Availability Zone of the instance.",
  ).optional(),
  PrivateDnsNameOptions: z.object({
    EnableResourceNameDnsARecord: z.boolean().describe(
      "Indicates whether to respond to DNS queries for instance hostnames with DNS A records. For more information, see Amazon EC2 instance hostname types in the Amazon Elastic Compute Cloud User Guide.",
    ).optional(),
    HostnameType: z.enum(["ip-name", "resource-name"]).describe(
      "The type of hostnames to assign to instances in the subnet at launch. For IPv4 only subnets, an instance DNS name must be based on the instance IPv4 address. For IPv6 only subnets, an instance DNS name must be based on the instance ID. For dual-stack subnets, you can specify whether DNS names use the instance IPv4 address or the instance ID. For more information, see Amazon EC2 instance hostname types in the Amazon Elastic Compute Cloud User Guide.",
    ).optional(),
    EnableResourceNameDnsAAAARecord: z.boolean().describe(
      "Indicates whether to respond to DNS queries for instance hostnames with DNS AAAA records. For more information, see Amazon EC2 instance hostname types in the Amazon Elastic Compute Cloud User Guide.",
    ).optional(),
  }).describe("The options for the instance hostname.").optional(),
  HostId: z.string().describe(
    "If you specify host for the Affinity property, the ID of a dedicated host that the instance is associated with. If you don't specify an ID, Amazon EC2 launches the instance onto any available, compatible dedicated host in your account.",
  ).optional(),
  SecurityGroupIds: z.array(z.string()).describe(
    "The IDs of the security groups.",
  ).optional(),
  PlacementGroupName: z.string().describe(
    "The name of an existing placement group that you want to launch the instance into (cluster | partition | spread).",
  ).optional(),
  SsmAssociations: z.array(SsmAssociationSchema).describe(
    "The SSM document and parameter values in AWS Systems Manager to associate with this instance.",
  ).optional(),
  State: z.object({
    Code: z.string().describe(
      "The state of the instance as a 16-bit unsigned integer.",
    ).optional(),
    Name: z.string().describe("The current state of the instance.").optional(),
  }).describe("The current state of the instance.").optional(),
  Affinity: z.enum(["default", "host"]).describe(
    "Indicates whether the instance is associated with a dedicated host. If you want the instance to always restart on the same host on which it was launched, specify host. If you want the instance to restart on any available host, but try to launch onto the last host it ran on (on a best-effort basis), specify default.",
  ).optional(),
  Tenancy: z.string().describe(
    "The tenancy of the instance (if the instance is running in a VPC). An instance with a tenancy of dedicated runs on single-tenant hardware.",
  ).optional(),
  SecurityGroups: z.array(z.string()).describe(
    "the names of the security groups. For a nondefault VPC, you must use security group IDs instead.",
  ).optional(),
  PrivateIpAddress: z.string().describe(
    "[EC2-VPC] The primary IPv4 address. You must specify a value from the IPv4 address range of the subnet.",
  ).optional(),
  UserData: z.string().describe(
    "The user data to make available to the instance.",
  ).optional(),
  BlockDeviceMappings: z.array(BlockDeviceMappingSchema).describe(
    "The block device mapping entries that defines the block devices to attach to the instance at launch.",
  ).optional(),
  IamInstanceProfile: z.string().describe("The IAM instance profile.")
    .optional(),
  Ipv6Addresses: z.array(InstanceIpv6AddressSchema).describe(
    "[EC2-VPC] The IPv6 addresses from the range of the subnet to associate with the primary network interface.",
  ).optional(),
  KernelId: z.string().describe("The ID of the kernel.").optional(),
  SubnetId: z.string().describe(
    "[EC2-VPC] The ID of the subnet to launch the instance into.",
  ).optional(),
  EbsOptimized: z.boolean().describe(
    "Indicates whether the instance is optimized for Amazon EBS I/O.",
  ).optional(),
  PropagateTagsToVolumeOnCreation: z.boolean().describe(
    "Indicates whether to assign the tags from the instance to all of the volumes attached to the instance at launch. If you specify true and you assign tags to the instance, those tags are automatically assigned to all of the volumes that you attach to the instance at launch. If you specify false, those tags are not assigned to the attached volumes.",
  ).optional(),
  ElasticGpuSpecifications: z.array(ElasticGpuSpecificationSchema).describe(
    "An elastic GPU to associate with the instance. Amazon Elastic Graphics is no longer available.",
  ).optional(),
  ElasticInferenceAccelerators: z.array(ElasticInferenceAcceleratorSchema)
    .describe(
      "An elastic inference accelerator to associate with the instance. Amazon Elastic Inference is no longer available.",
    ).optional(),
  Ipv6AddressCount: z.number().int().describe(
    "[EC2-VPC] The number of IPv6 addresses to associate with the primary network interface. Amazon EC2 chooses the IPv6 addresses from the range of your subnet.",
  ).optional(),
  LaunchTemplate: z.object({
    LaunchTemplateName: z.string().describe(
      "The name of the launch template. You must specify the LaunchTemplateName or the LaunchTemplateId, but not both.",
    ).optional(),
    Version: z.string().describe("The version number of the launch template.")
      .optional(),
    LaunchTemplateId: z.string().describe(
      "The ID of the launch template. You must specify the LaunchTemplateName or the LaunchTemplateId, but not both.",
    ).optional(),
  }).describe("The launch template to use to launch the instances.").optional(),
  NetworkInterfaces: z.array(NetworkInterfaceSchema).describe(
    "The network interfaces to associate with the instance.",
  ).optional(),
  InstanceType: z.string().describe("The instance type.").optional(),
  Monitoring: z.boolean().describe(
    "Specifies whether detailed monitoring is enabled for the instance.",
  ).optional(),
  InstanceInitiatedShutdownBehavior: z.string().describe(
    "Indicates whether an instance stops or terminates when you initiate shutdown from the instance (using the operating system command for system shutdown).",
  ).optional(),
  HostResourceGroupArn: z.string().describe(
    "The ARN of the host resource group in which to launch the instances. If you specify a host resource group ARN, omit the Tenancy parameter or set it to host.",
  ).optional(),
  DisableApiTermination: z.boolean().describe(
    "If you set this parameter to true, you can't terminate the instance using the Amazon EC2 console, CLI, or API; otherwise, you can.",
  ).optional(),
  KeyName: z.string().describe("The name of the key pair.").optional(),
  RamdiskId: z.string().describe("The ID of the RAM disk to select.")
    .optional(),
  SourceDestCheck: z.boolean().describe(
    "Specifies whether to enable an instance launched in a VPC to perform NAT.",
  ).optional(),
  CreditSpecification: z.object({
    CPUCredits: z.string().optional(),
  }).describe(
    "The credit option for CPU usage of the burstable performance instance. Valid values are standard and unlimited.",
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

/** Swamp extension model for EC2 Instance. Registered at `@swamp/aws/ec2/instance`. */
export const model = {
  type: "@swamp/aws/ec2/instance",
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
      toVersion: "2026.05.27.1",
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
      description: "EC2 Instance resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EC2 Instance",
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
          "AWS::EC2::Instance",
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
      description: "Get a EC2 Instance",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 Instance",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::EC2::Instance",
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
      description: "Update a EC2 Instance",
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
        const identifier = existing.InstanceId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::EC2::Instance",
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
          "AWS::EC2::Instance",
          identifier,
          currentState,
          desiredState,
          [
            "AvailabilityZone",
            "CpuOptions",
            "ElasticGpuSpecifications",
            "ElasticInferenceAccelerators",
            "EnclaveOptions",
            "HibernationOptions",
            "HostResourceGroupArn",
            "ImageId",
            "Ipv6AddressCount",
            "Ipv6Addresses",
            "KeyName",
            "LaunchTemplate",
            "LicenseSpecifications",
            "NetworkInterfaces",
            "PlacementGroupName",
            "PrivateIpAddress",
            "SecurityGroups",
            "SubnetId",
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
      description: "Delete a EC2 Instance",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 Instance",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::EC2::Instance",
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
      description: "Sync EC2 Instance state from AWS",
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
        const identifier = existing.InstanceId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::EC2::Instance",
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
