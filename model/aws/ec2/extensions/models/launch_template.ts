// Auto-generated extension model for @swamp/aws/ec2/launch-template
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for EC2 LaunchTemplate (AWS::EC2::LaunchTemplate).
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
  Value: z.string().describe("The tag value."),
  Key: z.string().describe("The tag key."),
});

const TagSpecificationSchema = z.object({
  ResourceType: z.string().describe(
    "The type of resource to tag. You can specify tags for the following resource types only: instance | volume | network-interface | spot-instances-request. If the instance does not include the resource type that you specify, the instance launch fails. For example, not all instance types include a volume. To tag a resource after it has been created, see [CreateTags](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_CreateTags.html).",
  ).optional(),
  Tags: z.array(TagSchema).describe("The tags to apply to the resource.")
    .optional(),
});

const NetworkPerformanceOptionsSchema = z.object({
  BandwidthWeighting: z.string().describe(
    "Specify the bandwidth weighting option to boost the associated type of baseline bandwidth, as follows: default This option uses the standard bandwidth configuration for your instance type. + vpc-1 This option boosts your networking baseline bandwidth and reduces your EBS baseline bandwidth. + ebs-1 This option boosts your EBS baseline bandwidth and reduces your networking baseline bandwidth.",
  ).optional(),
});

const EbsSchema = z.object({
  SnapshotId: z.string().describe("The ID of the snapshot.").optional(),
  VolumeType: z.string().describe(
    "The volume type. For more information, see [Amazon EBS volume types](https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volume-types.html) in the *Amazon EBS User Guide*.",
  ).optional(),
  KmsKeyId: z.string().describe(
    "Identifier (key ID, key alias, key ARN, or alias ARN) of the customer managed KMS key to use for EBS encryption.",
  ).optional(),
  Encrypted: z.boolean().describe(
    "Indicates whether the EBS volume is encrypted. Encrypted volumes can only be attached to instances that support Amazon EBS encryption. If you are creating a volume from a snapshot, you can't specify an encryption value.",
  ).optional(),
  EbsCardIndex: z.number().int().optional(),
  Throughput: z.number().int().describe(
    "The throughput to provision for a gp3 volume, with a maximum of 2,000 MiB/s. Valid Range: Minimum value of 125. Maximum value of 2,000.",
  ).optional(),
  Iops: z.number().int().describe(
    "The number of I/O operations per second (IOPS). For gp3, io1, and io2 volumes, this represents the number of IOPS that are provisioned for the volume. For gp2 volumes, this represents the baseline performance of the volume and the rate at which the volume accumulates I/O credits for bursting. The following are the supported values for each volume type: gp3: 3,000 - 80,000 IOPS io1: 100 - 64,000 IOPS io2: 100 - 256,000 IOPS For io2 volumes, you can achieve up to 256,000 IOPS on [instances built on the Nitro System](https://docs.aws.amazon.com/ec2/latest/instancetypes/ec2-nitro-instances.html). On other instances, you can achieve performance up to 32,000 IOPS. This parameter is supported for io1, io2, and gp3 volumes only.",
  ).optional(),
  VolumeInitializationRate: z.number().int().describe(
    "Specifies the Amazon EBS Provisioned Rate for Volume Initialization (volume initialization rate), in MiB/s, at which to download the snapshot blocks from Amazon S3 to the volume. This is also known as *volume initialization*. Specifying a volume initialization rate ensures that the volume is initialized at a predictable and consistent rate after creation. This parameter is supported only for volumes created from snapshots. Omit this parameter if: You want to create the volume using fast snapshot restore. You must specify a snapshot that is enabled for fast snapshot restore. In this case, the volume is fully initialized at creation. If you specify a snapshot that is enabled for fast snapshot restore and a volume initialization rate, the volume will be initialized at the specified rate instead of fast snapshot restore. You want to create a volume that is initialized at the default rate. For more information, see [Initialize Amazon EBS volumes](https://docs.aws.amazon.com/ebs/latest/userguide/initalize-volume.html) in the *Amazon EC2 User Guide*. Valid range: 100 - 300 MiB/s",
  ).optional(),
  VolumeSize: z.number().int().describe(
    "The size of the volume, in GiBs. You must specify either a snapshot ID or a volume size. The following are the supported volumes sizes for each volume type: gp2: 1 - 16,384 GiB gp3: 1 - 65,536 GiB io1: 4 - 16,384 GiB io2: 4 - 65,536 GiB st1 and sc1: 125 - 16,384 GiB standard: 1 - 1024 GiB",
  ).optional(),
  DeleteOnTermination: z.boolean().describe(
    "Indicates whether the EBS volume is deleted on instance termination.",
  ).optional(),
});

const BlockDeviceMappingSchema = z.object({
  Ebs: EbsSchema.describe(
    "Parameters used to automatically set up EBS volumes when the instance is launched.",
  ).optional(),
  NoDevice: z.string().describe(
    "To omit the device from the block device mapping, specify an empty string.",
  ).optional(),
  VirtualName: z.string().describe(
    "The virtual device name (ephemeralN). Instance store volumes are numbered starting from 0. An instance type with 2 available instance store volumes can specify mappings for ephemeral0 and ephemeral1. The number of available instance store volumes depends on the instance type. After you connect to the instance, you must mount the volume.",
  ).optional(),
  DeviceName: z.string().describe(
    "The device name (for example, /dev/sdh or xvdh).",
  ).optional(),
});

const MaintenanceOptionsSchema = z.object({
  AutoRecovery: z.string().describe(
    "Disables the automatic recovery behavior of your instance or sets it to default.",
  ).optional(),
});

const IamInstanceProfileSchema = z.object({
  Arn: z.string().describe(
    "The Amazon Resource Name (ARN) of the instance profile.",
  ).optional(),
  Name: z.string().describe("The name of the instance profile.").optional(),
});

const PlacementSchema = z.object({
  GroupName: z.string().describe(
    "The name of the placement group for the instance.",
  ).optional(),
  Tenancy: z.string().describe(
    "The tenancy of the instance. An instance with a tenancy of dedicated runs on single-tenant hardware.",
  ).optional(),
  SpreadDomain: z.string().describe("Reserved for future use.").optional(),
  PartitionNumber: z.number().int().describe(
    "The number of the partition the instance should launch in. Valid only if the placement group strategy is set to partition.",
  ).optional(),
  AvailabilityZone: z.string().describe(
    "The Availability Zone for the instance. Either AvailabilityZone or AvailabilityZoneId can be specified, but not both",
  ).optional(),
  Affinity: z.string().describe(
    "The affinity setting for an instance on a Dedicated Host.",
  ).optional(),
  HostId: z.string().describe("The ID of the Dedicated Host for the instance.")
    .optional(),
  HostResourceGroupArn: z.string().describe(
    "The ARN of the host resource group in which to launch the instances. If you specify a host resource group ARN, omit the *Tenancy* parameter or set it to host.",
  ).optional(),
  GroupId: z.string().describe(
    "The Group Id of a placement group. You must specify the Placement Group *Group Id* to launch an instance in a shared placement group.",
  ).optional(),
});

const PrivateIpAddSchema = z.object({
  PrivateIpAddress: z.string().describe("The private IPv4 address.").optional(),
  Primary: z.boolean().describe(
    "Indicates whether the private IPv4 address is the primary private IPv4 address. Only one IPv4 address can be designated as primary.",
  ).optional(),
});

const Ipv4PrefixSpecificationSchema = z.object({
  Ipv4Prefix: z.string().describe(
    "The IPv4 prefix. For information, see [Assigning prefixes to network interfaces](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-prefix-eni.html) in the *Amazon EC2 User Guide*.",
  ).optional(),
});

const Ipv6PrefixSpecificationSchema = z.object({
  Ipv6Prefix: z.string().describe("The IPv6 prefix.").optional(),
});

const Ipv6AddSchema = z.object({
  Ipv6Address: z.string().describe(
    "One or more specific IPv6 addresses from the IPv6 CIDR block range of your subnet. You can't use this option if you're specifying a number of IPv6 addresses.",
  ).optional(),
});

const EnaSrdUdpSpecificationSchema = z.object({
  EnaSrdUdpEnabled: z.boolean().describe(
    "Indicates whether UDP traffic to and from the instance uses ENA Express. To specify this setting, you must first enable ENA Express.",
  ).optional(),
});

const EnaSrdSpecificationSchema = z.object({
  EnaSrdEnabled: z.boolean().describe(
    "Indicates whether ENA Express is enabled for the network interface.",
  ).optional(),
  EnaSrdUdpSpecification: EnaSrdUdpSpecificationSchema.describe(
    "Configures ENA Express for UDP network traffic.",
  ).optional(),
});

const ConnectionTrackingSpecificationSchema = z.object({
  UdpTimeout: z.number().int().describe(
    "Timeout (in seconds) for idle UDP flows that have seen traffic only in a single direction or a single request-response transaction. Min: 30 seconds. Max: 60 seconds. Default: 30 seconds.",
  ).optional(),
  TcpEstablishedTimeout: z.number().int().describe(
    "Timeout (in seconds) for idle TCP connections in an established state. Min: 60 seconds. Max: 432000 seconds (5 days). Default: 432000 seconds. Recommended: Less than 432000 seconds.",
  ).optional(),
  UdpStreamTimeout: z.number().int().describe(
    "Timeout (in seconds) for idle UDP flows classified as streams which have seen more than one request-response transaction. Min: 60 seconds. Max: 180 seconds (3 minutes). Default: 180 seconds.",
  ).optional(),
});

const NetworkInterfaceSchema = z.object({
  Description: z.string().describe("A description for the network interface.")
    .optional(),
  PrivateIpAddress: z.string().describe(
    "The primary private IPv4 address of the network interface.",
  ).optional(),
  PrivateIpAddresses: z.array(PrivateIpAddSchema).describe(
    "One or more private IPv4 addresses.",
  ).optional(),
  SecondaryPrivateIpAddressCount: z.number().int().describe(
    "The number of secondary private IPv4 addresses to assign to a network interface.",
  ).optional(),
  Ipv6PrefixCount: z.number().int().describe(
    "The number of IPv6 prefixes to be automatically assigned to the network interface. You cannot use this option if you use the Ipv6Prefix option.",
  ).optional(),
  Ipv4Prefixes: z.array(Ipv4PrefixSpecificationSchema).describe(
    "One or more IPv4 prefixes to be assigned to the network interface. You cannot use this option if you use the Ipv4PrefixCount option.",
  ).optional(),
  DeviceIndex: z.number().int().describe(
    "The device index for the network interface attachment. The primary network interface has a device index of 0. If the network interface is of type interface, you must specify a device index. If you create a launch template that includes secondary network interfaces but no primary network interface, and you specify it using the LaunchTemplate property of AWS::EC2::Instance, then you must include a primary network interface using the NetworkInterfaces property of AWS::EC2::Instance.",
  ).optional(),
  PrimaryIpv6: z.boolean().describe(
    "The primary IPv6 address of the network interface. When you enable an IPv6 GUA address to be a primary IPv6, the first IPv6 GUA will be made the primary IPv6 address until the instance is terminated or the network interface is detached. For more information about primary IPv6 addresses, see [RunInstances](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_RunInstances.html).",
  ).optional(),
  Ipv4PrefixCount: z.number().int().describe(
    "The number of IPv4 prefixes to be automatically assigned to the network interface. You cannot use this option if you use the Ipv4Prefix option.",
  ).optional(),
  EnaQueueCount: z.number().int().describe(
    "The number of ENA queues to be created with the instance.",
  ).optional(),
  Ipv6Prefixes: z.array(Ipv6PrefixSpecificationSchema).describe(
    "One or more IPv6 prefixes to be assigned to the network interface. You cannot use this option if you use the Ipv6PrefixCount option.",
  ).optional(),
  SubnetId: z.string().describe(
    "The ID of the subnet for the network interface.",
  ).optional(),
  Ipv6Addresses: z.array(Ipv6AddSchema).describe(
    "One or more specific IPv6 addresses from the IPv6 CIDR block range of your subnet. You can't use this option if you're specifying a number of IPv6 addresses.",
  ).optional(),
  AssociatePublicIpAddress: z.boolean().describe(
    "Associates a public IPv4 address with eth0 for a new network interface. AWS charges for all public IPv4 addresses, including public IPv4 addresses associated with running instances and Elastic IP addresses. For more information, see the *Public IPv4 Address* tab on the [Amazon VPC pricing page](https://docs.aws.amazon.com/vpc/pricing/).",
  ).optional(),
  NetworkInterfaceId: z.string().describe("The ID of the network interface.")
    .optional(),
  NetworkCardIndex: z.number().int().describe(
    "The index of the network card. Some instance types support multiple network cards. The primary network interface must be assigned to network card index 0. The default is network card index 0.",
  ).optional(),
  InterfaceType: z.string().describe(
    "The type of network interface. To create an Elastic Fabric Adapter (EFA), specify efa or efa. For more information, see [Elastic Fabric Adapter for AI/ML and HPC workloads on Amazon EC2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/efa.html) in the *Amazon EC2 User Guide*. If you are not creating an EFA, specify interface or omit this parameter. If you specify efa-only, do not assign any IP addresses to the network interface. EFA-only network interfaces do not support IP addresses. Valid values: interface | efa | efa-only",
  ).optional(),
  AssociateCarrierIpAddress: z.boolean().describe(
    "Associates a Carrier IP address with eth0 for a new network interface. Use this option when you launch an instance in a Wavelength Zone and want to associate a Carrier IP address with the network interface. For more information about Carrier IP addresses, see [Carrier IP addresses](https://docs.aws.amazon.com/wavelength/latest/developerguide/how-wavelengths-work.html#provider-owned-ip) in the *Developer Guide*.",
  ).optional(),
  EnaSrdSpecification: EnaSrdSpecificationSchema.describe(
    "The ENA Express configuration for the network interface.",
  ).optional(),
  Ipv6AddressCount: z.number().int().describe(
    "The number of IPv6 addresses to assign to a network interface. Amazon EC2 automatically selects the IPv6 addresses from the subnet range. You can't use this option if specifying specific IPv6 addresses.",
  ).optional(),
  Groups: z.array(z.string()).describe(
    "The IDs of one or more security groups.",
  ).optional(),
  DeleteOnTermination: z.boolean().describe(
    "Indicates whether the network interface is deleted when the instance is terminated.",
  ).optional(),
  ConnectionTrackingSpecification: ConnectionTrackingSpecificationSchema
    .describe("A connection tracking specification for the network interface.")
    .optional(),
});

const EnclaveOptionsSchema = z.object({
  Enabled: z.boolean().describe(
    "If this parameter is set to true, the instance is enabled for AWS Nitro Enclaves; otherwise, it is not enabled for AWS Nitro Enclaves.",
  ).optional(),
});

const MonitoringSchema = z.object({
  Enabled: z.boolean().describe(
    "Specify true to enable detailed monitoring. Otherwise, basic monitoring is enabled.",
  ).optional(),
});

const HibernationOptionsSchema = z.object({
  Configured: z.boolean().describe(
    "If you set this parameter to true, the instance is enabled for hibernation. Default: false",
  ).optional(),
});

const MetadataOptionsSchema = z.object({
  HttpPutResponseHopLimit: z.number().int().describe(
    "The desired HTTP PUT response hop limit for instance metadata requests. The larger the number, the further instance metadata requests can travel. Default: 1 Possible values: Integers from 1 to 64",
  ).optional(),
  HttpTokens: z.string().describe(
    "Indicates whether IMDSv2 is required. optional - IMDSv2 is optional. You can choose whether to send a session token in your instance metadata retrieval requests. If you retrieve IAM role credentials without a session token, you receive the IMDSv1 role credentials. If you retrieve IAM role credentials using a valid session token, you receive the IMDSv2 role credentials. required - IMDSv2 is required. You must send a session token in your instance metadata retrieval requests. With this option, retrieving the IAM role credentials always returns IMDSv2 credentials; IMDSv1 credentials are not available. Default: If the value of ImdsSupport for the Amazon Machine Image (AMI) for your instance is v2.0, the default is required.",
  ).optional(),
  HttpProtocolIpv6: z.string().describe(
    "Enables or disables the IPv6 endpoint for the instance metadata service. Default: disabled",
  ).optional(),
  InstanceMetadataTags: z.string().describe(
    "Set to enabled to allow access to instance tags from the instance metadata. Set to disabled to turn off access to instance tags from the instance metadata. For more information, see [View tags for your EC2 instances using instance metadata](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/work-with-tags-in-IMDS.html). Default: disabled",
  ).optional(),
  HttpEndpoint: z.string().describe(
    "Enables or disables the HTTP metadata endpoint on your instances. If the parameter is not specified, the default state is enabled. If you specify a value of disabled, you will not be able to access your instance metadata.",
  ).optional(),
});

const LicenseSpecificationSchema = z.object({
  LicenseConfigurationArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the license configuration.",
  ).optional(),
});

const CpuOptionsSchema = z.object({
  ThreadsPerCore: z.number().int().describe(
    "The number of threads per CPU core. To disable multithreading for the instance, specify a value of 1. Otherwise, specify the default value of 2.",
  ).optional(),
  AmdSevSnp: z.enum(["enabled", "disabled"]).describe(
    "Indicates whether to enable the instance for AMD SEV-SNP. AMD SEV-SNP is supported with M6a, R6a, and C6a instance types only. For more information, see [AMD SEV-SNP for Amazon EC2 instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/sev-snp.html).",
  ).optional(),
  NestedVirtualization: z.enum(["enabled", "disabled"]).describe(
    "Indicates whether the instance is enabled for nested virtualization.",
  ).optional(),
  CoreCount: z.number().int().describe(
    "The number of CPU cores for the instance.",
  ).optional(),
});

const PrivateDnsNameOptionsSchema = z.object({
  EnableResourceNameDnsARecord: z.boolean().describe(
    "Indicates whether to respond to DNS queries for instance hostnames with DNS A records.",
  ).optional(),
  HostnameType: z.string().describe(
    "The type of hostname for EC2 instances. For IPv4 only subnets, an instance DNS name must be based on the instance IPv4 address. For IPv6 only subnets, an instance DNS name must be based on the instance ID. For dual-stack subnets, you can specify whether DNS names use the instance IPv4 address or the instance ID. For more information, see [Amazon EC2 instance hostname types](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-naming.html) in the *User Guide*.",
  ).optional(),
  EnableResourceNameDnsAAAARecord: z.boolean().describe(
    "Indicates whether to respond to DNS queries for instance hostnames with DNS AAAA records.",
  ).optional(),
});

const SpotOptionsSchema = z.object({
  SpotInstanceType: z.string().describe(
    "The Spot Instance request type. If you are using Spot Instances with an Auto Scaling group, use one-time requests, as the ASlong service handles requesting new Spot Instances whenever the group is below its desired capacity.",
  ).optional(),
  InstanceInterruptionBehavior: z.string().describe(
    "The behavior when a Spot Instance is interrupted. The default is terminate.",
  ).optional(),
  MaxPrice: z.string().describe(
    "The maximum hourly price you're willing to pay for a Spot Instance. We do not recommend using this parameter because it can lead to increased interruptions. If you do not specify this parameter, you will pay the current Spot price. If you do specify this parameter, it must be more than USD $0.001. Specifying a value below USD $0.001 will result in an InvalidParameterValue error message when the launch template is used to launch an instance. If you specify a maximum price, your Spot Instances will be interrupted more frequently than if you do not specify this parameter.",
  ).optional(),
  BlockDurationMinutes: z.number().int().describe("Deprecated.").optional(),
  ValidUntil: z.string().describe(
    "The end date of the request, in UTC format (*YYYY-MM-DD*T*HH:MM:SS*Z). Supported only for persistent requests. For a persistent request, the request remains active until the ValidUntil date and time is reached. Otherwise, the request remains active until you cancel it. For a one-time request, ValidUntil is not supported. The request remains active until all instances launch or you cancel the request. Default: 7 days from the current date",
  ).optional(),
});

const InstanceMarketOptionsSchema = z.object({
  SpotOptions: SpotOptionsSchema.describe("The options for Spot Instances.")
    .optional(),
  MarketType: z.string().describe("The market type.").optional(),
});

const MemoryGiBPerVCpuSchema = z.object({
  Min: z.number().describe(
    "The minimum amount of memory per vCPU, in GiB. To specify no minimum limit, omit this parameter.",
  ).optional(),
  Max: z.number().describe(
    "The maximum amount of memory per vCPU, in GiB. To specify no maximum limit, omit this parameter.",
  ).optional(),
});

const VCpuCountSchema = z.object({
  Min: z.number().int().describe(
    "The minimum number of vCPUs. To specify no minimum limit, specify 0.",
  ).optional(),
  Max: z.number().int().describe(
    "The maximum number of vCPUs. To specify no maximum limit, omit this parameter.",
  ).optional(),
});

const MemoryMiBSchema = z.object({
  Min: z.number().int().describe(
    "The minimum amount of memory, in MiB. To specify no minimum limit, specify 0.",
  ).optional(),
  Max: z.number().int().describe(
    "The maximum amount of memory, in MiB. To specify no maximum limit, omit this parameter.",
  ).optional(),
});

const NetworkInterfaceCountSchema = z.object({
  Min: z.number().int().describe(
    "The minimum number of network interfaces. To specify no minimum limit, omit this parameter.",
  ).optional(),
  Max: z.number().int().describe(
    "The maximum number of network interfaces. To specify no maximum limit, omit this parameter.",
  ).optional(),
});

const AcceleratorCountSchema = z.object({
  Min: z.number().int().describe(
    "The minimum number of accelerators. To specify no minimum limit, omit this parameter.",
  ).optional(),
  Max: z.number().int().describe(
    "The maximum number of accelerators. To specify no maximum limit, omit this parameter. To exclude accelerator-enabled instance types, set Max to 0.",
  ).optional(),
});

const NetworkBandwidthGbpsSchema = z.object({
  Min: z.number().describe(
    "The minimum amount of network bandwidth, in Gbps. If this parameter is not specified, there is no minimum limit.",
  ).optional(),
  Max: z.number().describe(
    "The maximum amount of network bandwidth, in Gbps. To specify no maximum limit, omit this parameter.",
  ).optional(),
});

const ReferenceSchema = z.object({
  InstanceFamily: z.string().describe(
    "The instance family to use as a baseline reference. Ensure that you specify the correct value for the instance family. The instance family is everything before the period (.) in the instance type name. For example, in the instance type c6i.large, the instance family is c6i, not c6. For more information, see [Amazon EC2 instance type naming conventions](https://docs.aws.amazon.com/ec2/latest/instancetypes/instance-type-names.html) in *Amazon EC2 Instance Types*. The following instance families are *not supported* for performance protection: c1 g3 | g3s hpc7g m1 | m2 mac1 | mac2 | mac2-m1ultra | mac2-m2 | mac2-m2pro p3dn | p4d | p5 t1 u-12tb1 | u-18tb1 | u-24tb1 | u-3tb1 | u-6tb1 | u-9tb1 | u7i-12tb | u7in-16tb | u7in-24tb | u7in-32tb If you enable performance protection by specifying a supported instance family, the returned instance types will exclude the above unsupported instance families.",
  ).optional(),
});

const CpuSchema = z.object({
  References: z.array(ReferenceSchema).describe(
    "The instance family to use as the baseline reference for CPU performance. All instance types that match your specified attributes are compared against the CPU performance of the referenced instance family, regardless of CPU manufacturer or architecture differences.",
  ).optional(),
});

const BaselinePerformanceFactorsSchema = z.object({
  Cpu: CpuSchema.describe(
    "The CPU performance to consider, using an instance family as the baseline reference.",
  ).optional(),
});

const BaselineEbsBandwidthMbpsSchema = z.object({
  Min: z.number().int().describe(
    "The minimum baseline bandwidth, in Mbps. To specify no minimum limit, omit this parameter.",
  ).optional(),
  Max: z.number().int().describe(
    "The maximum baseline bandwidth, in Mbps. To specify no maximum limit, omit this parameter.",
  ).optional(),
});

const AcceleratorTotalMemoryMiBSchema = z.object({
  Min: z.number().int().describe(
    "The minimum amount of accelerator memory, in MiB. To specify no minimum limit, omit this parameter.",
  ).optional(),
  Max: z.number().int().describe(
    "The maximum amount of accelerator memory, in MiB. To specify no maximum limit, omit this parameter.",
  ).optional(),
});

const TotalLocalStorageGBSchema = z.object({
  Min: z.number().describe(
    "The minimum amount of total local storage, in GB. To specify no minimum limit, omit this parameter.",
  ).optional(),
  Max: z.number().describe(
    "The maximum amount of total local storage, in GB. To specify no maximum limit, omit this parameter.",
  ).optional(),
});

const InstanceRequirementsSchema = z.object({
  InstanceGenerations: z.array(z.string()).describe(
    "Indicates whether current or previous generation instance types are included. The current generation instance types are recommended for use. Current generation instance types are typically the latest two to three generations in each instance family. For more information, see [Instance types](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-types.html) in the *Amazon EC2 User Guide*. For current generation instance types, specify current. For previous generation instance types, specify previous. Default: Current and previous generation instance types",
  ).optional(),
  MemoryGiBPerVCpu: MemoryGiBPerVCpuSchema.describe(
    "The minimum and maximum amount of memory per vCPU, in GiB. Default: No minimum or maximum limits",
  ).optional(),
  AcceleratorTypes: z.array(z.string()).describe(
    "The accelerator types that must be on the instance type. For instance types with FPGA accelerators, specify fpga. For instance types with GPU accelerators, specify gpu. For instance types with Inference accelerators, specify inference. For instance types with Media accelerators, specify media. Default: Any accelerator type",
  ).optional(),
  VCpuCount: VCpuCountSchema.describe(
    "The minimum and maximum number of vCPUs.",
  ).optional(),
  AcceleratorManufacturers: z.array(z.string()).describe(
    "Indicates whether instance types must have accelerators by specific manufacturers. For instance types with AWS devices, specify amazon-web-services. For instance types with AMD devices, specify amd. For instance types with Habana devices, specify habana. For instance types with NVIDIA devices, specify nvidia. For instance types with Xilinx devices, specify xilinx. Default: Any manufacturer",
  ).optional(),
  LocalStorage: z.string().describe(
    "Indicates whether instance types with instance store volumes are included, excluded, or required. For more information, [Amazon EC2 instance store](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/InstanceStorage.html) in the *Amazon EC2 User Guide*. To include instance types with instance store volumes, specify included. To require only instance types with instance store volumes, specify required. To exclude instance types with instance store volumes, specify excluded. Default: included",
  ).optional(),
  CpuManufacturers: z.array(z.string()).describe(
    "The CPU manufacturers to include. For instance types with Intel CPUs, specify intel. For instance types with AMD CPUs, specify amd. For instance types with AWS CPUs, specify amazon-web-services. For instance types with Apple CPUs, specify apple. Don't confuse the CPU manufacturer with the CPU architecture. Instances will be launched with a compatible CPU architecture based on the Amazon Machine Image (AMI) that you specify in your launch template. Default: Any manufacturer",
  ).optional(),
  BareMetal: z.string().describe(
    "Indicates whether bare metal instance types must be included, excluded, or required. To include bare metal instance types, specify included. To require only bare metal instance types, specify required. To exclude bare metal instance types, specify excluded. Default: excluded",
  ).optional(),
  RequireHibernateSupport: z.boolean().describe(
    "Indicates whether instance types must support hibernation for On-Demand Instances. This parameter is not supported for [GetSpotPlacementScores](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_GetSpotPlacementScores.html). Default: false",
  ).optional(),
  MaxSpotPriceAsPercentageOfOptimalOnDemandPrice: z.number().int().describe(
    "[Price protection] The price protection threshold for Spot Instances, as a percentage of an identified On-Demand price. The identified On-Demand price is the price of the lowest priced current generation C, M, or R instance type with your specified attributes. If no current generation C, M, or R instance type matches your attributes, then the identified price is from the lowest priced current generation instance types, and failing that, from the lowest priced previous generation instance types that match your attributes. When Amazon EC2 selects instance types with your attributes, it will exclude instance types whose price exceeds your specified threshold. The parameter accepts an integer, which Amazon EC2 interprets as a percentage. If you set TargetCapacityUnitType to vcpu or memory-mib, the price protection threshold is based on the per vCPU or per memory price instead of the per instance price. Only one of SpotMaxPricePercentageOverLowestPrice or MaxSpotPriceAsPercentageOfOptimalOnDemandPrice can be specified. If you don't specify either, Amazon EC2 will automatically apply optimal price protection to consistently select from a wide range of instance types. To indicate no price protection threshold for Spot Instances, meaning you want to consider all instance types that match your attributes, include one of these parameters and specify a high value, such as 999999.",
  ).optional(),
  OnDemandMaxPricePercentageOverLowestPrice: z.number().int().describe(
    "[Price protection] The price protection threshold for On-Demand Instances, as a percentage higher than an identified On-Demand price. The identified On-Demand price is the price of the lowest priced current generation C, M, or R instance type with your specified attributes. When Amazon EC2 selects instance types with your attributes, it will exclude instance types whose price exceeds your specified threshold. The parameter accepts an integer, which Amazon EC2 interprets as a percentage. To turn off price protection, specify a high value, such as 999999. This parameter is not supported for [GetSpotPlacementScores](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_GetSpotPlacementScores.html) and [GetInstanceTypesFromInstanceRequirements](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_GetInstanceTypesFromInstanceRequirements.html). If you set TargetCapacityUnitType to vcpu or memory-mib, the price protection threshold is applied based on the per-vCPU or per-memory price instead of the per-instance price. Default: 20",
  ).optional(),
  MemoryMiB: MemoryMiBSchema.describe(
    "The minimum and maximum amount of memory, in MiB.",
  ).optional(),
  LocalStorageTypes: z.array(z.string()).describe(
    "The type of local storage that is required. For instance types with hard disk drive (HDD) storage, specify hdd. For instance types with solid state drive (SSD) storage, specify ssd. Default: hdd and ssd",
  ).optional(),
  NetworkInterfaceCount: NetworkInterfaceCountSchema.describe(
    "The minimum and maximum number of network interfaces. Default: No minimum or maximum limits",
  ).optional(),
  ExcludedInstanceTypes: z.array(z.string()).describe(
    "The instance types to exclude. You can use strings with one or more wild cards, represented by an asterisk ( *), to exclude an instance type, size, or generation. The following are examples: m5.8xlarge, c5*.*, m5a.*, r*, *3*. For example, if you specify c5*,Amazon EC2 will exclude the entire C5 instance family, which includes all C5a and C5n instance types. If you specify m5a.*, Amazon EC2 will exclude all the M5a instance types, but not the M5n instance types. If you specify ExcludedInstanceTypes, you can't specify AllowedInstanceTypes. Default: No excluded instance types",
  ).optional(),
  AllowedInstanceTypes: z.array(z.string()).describe(
    "The instance types to apply your specified attributes against. All other instance types are ignored, even if they match your specified attributes. You can use strings with one or more wild cards, represented by an asterisk ( *), to allow an instance type, size, or generation. The following are examples: m5.8xlarge, c5*.*, m5a.*, r*, *3*. For example, if you specify c5*,Amazon EC2 will allow the entire C5 instance family, which includes all C5a and C5n instance types. If you specify m5a.*, Amazon EC2 will allow all the M5a instance types, but not the M5n instance types. If you specify AllowedInstanceTypes, you can't specify ExcludedInstanceTypes. Default: All instance types",
  ).optional(),
  AcceleratorCount: AcceleratorCountSchema.describe(
    "The minimum and maximum number of accelerators (GPUs, FPGAs, or AWS Inferentia chips) on an instance. To exclude accelerator-enabled instance types, set Max to 0. Default: No minimum or maximum limits",
  ).optional(),
  NetworkBandwidthGbps: NetworkBandwidthGbpsSchema.describe(
    "The minimum and maximum amount of network bandwidth, in gigabits per second (Gbps). Default: No minimum or maximum limits",
  ).optional(),
  BaselinePerformanceFactors: BaselinePerformanceFactorsSchema.describe(
    "The baseline performance to consider, using an instance family as a baseline reference. The instance family establishes the lowest acceptable level of performance. Amazon EC2 uses this baseline to guide instance type selection, but there is no guarantee that the selected instance types will always exceed the baseline for every application. Currently, this parameter only supports CPU performance as a baseline performance factor. For more information, see [Performance protection](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-fleet-attribute-based-instance-type-selection.html#ec2fleet-abis-performance-protection) in the *Amazon EC2 User Guide*.",
  ).optional(),
  SpotMaxPricePercentageOverLowestPrice: z.number().int().describe(
    "[Price protection] The price protection threshold for Spot Instances, as a percentage higher than an identified Spot price. The identified Spot price is the Spot price of the lowest priced current generation C, M, or R instance type with your specified attributes. If no current generation C, M, or R instance type matches your attributes, then the identified Spot price is from the lowest priced current generation instance types, and failing that, from the lowest priced previous generation instance types that match your attributes. When Amazon EC2 selects instance types with your attributes, it will exclude instance types whose Spot price exceeds your specified threshold. The parameter accepts an integer, which Amazon EC2 interprets as a percentage. If you set TargetCapacityUnitType to vcpu or memory-mib, the price protection threshold is applied based on the per-vCPU or per-memory price instead of the per-instance price. This parameter is not supported for [GetSpotPlacementScores](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_GetSpotPlacementScores.html) and [GetInstanceTypesFromInstanceRequirements](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_GetInstanceTypesFromInstanceRequirements.html). Only one of SpotMaxPricePercentageOverLowestPrice or MaxSpotPriceAsPercentageOfOptimalOnDemandPrice can be specified. If you don't specify either, Amazon EC2 will automatically apply optimal price protection to consistently select from a wide range of instance types. To indicate no price protection threshold for Spot Instances, meaning you want to consider all instance types that match your attributes, include one of these parameters and specify a high value, such as 999999. Default: 100",
  ).optional(),
  BaselineEbsBandwidthMbps: BaselineEbsBandwidthMbpsSchema.describe(
    "The minimum and maximum baseline bandwidth to Amazon EBS, in Mbps. For more information, see [Amazon EBS–optimized instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-optimized.html) in the *Amazon EC2 User Guide*. Default: No minimum or maximum limits",
  ).optional(),
  AcceleratorNames: z.array(z.string()).describe(
    "The accelerators that must be on the instance type. For instance types with NVIDIA A10G GPUs, specify a10g. For instance types with NVIDIA A100 GPUs, specify a100. For instance types with NVIDIA H100 GPUs, specify h100. For instance types with AWS Inferentia chips, specify inferentia. For instance types with AWS Inferentia2 chips, specify inferentia2. For instance types with Habana Gaudi HL-205 GPUs, specify gaudi-hl-205. For instance types with NVIDIA GRID K520 GPUs, specify k520. For instance types with NVIDIA K80 GPUs, specify k80. For instance types with NVIDIA L4 GPUs, specify l4. For instance types with NVIDIA L40S GPUs, specify l40s. For instance types with NVIDIA M60 GPUs, specify m60. For instance types with AMD Radeon Pro V520 GPUs, specify radeon-pro-v520. For instance types with AWS Trainium chips, specify trainium. For instance types with AWS Trainium2 chips, specify trainium2. For instance types with NVIDIA T4 GPUs, specify t4. For instance types with NVIDIA T4G GPUs, specify t4g. For instance types with Xilinx U30 cards, specify u30. For instance types with Xilinx VU9P FPGAs, specify vu9p. For instance types with NVIDIA V100 GPUs, specify v100. Default: Any accelerator",
  ).optional(),
  AcceleratorTotalMemoryMiB: AcceleratorTotalMemoryMiBSchema.describe(
    "The minimum and maximum amount of total accelerator memory, in MiB. Default: No minimum or maximum limits",
  ).optional(),
  BurstablePerformance: z.string().describe(
    "Indicates whether burstable performance T instance types are included, excluded, or required. For more information, see [Burstable performance instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/burstable-performance-instances.html). To include burstable performance instance types, specify included. To require only burstable performance instance types, specify required. To exclude burstable performance instance types, specify excluded. Default: excluded",
  ).optional(),
  TotalLocalStorageGB: TotalLocalStorageGBSchema.describe(
    "The minimum and maximum amount of total local storage, in GB. Default: No minimum or maximum limits",
  ).optional(),
});

const CapacityReservationTargetSchema = z.object({
  CapacityReservationResourceGroupArn: z.string().describe(
    "The ARN of the Capacity Reservation resource group in which to run the instance.",
  ).optional(),
  CapacityReservationId: z.string().describe(
    "The ID of the Capacity Reservation in which to run the instance.",
  ).optional(),
});

const CapacityReservationSpecificationSchema = z.object({
  CapacityReservationPreference: z.string().describe(
    "Indicates the instance's Capacity Reservation preferences. Possible preferences include: capacity-reservations-only - The instance will only run in a Capacity Reservation or Capacity Reservation group. If capacity isn't available, the instance will fail to launch. open - The instance can run in any open Capacity Reservation that has matching attributes (instance type, platform, Availability Zone, tenancy). none - The instance avoids running in a Capacity Reservation even if one is available. The instance runs in On-Demand capacity.",
  ).optional(),
  CapacityReservationTarget: CapacityReservationTargetSchema.describe(
    "Information about the target Capacity Reservation or Capacity Reservation group.",
  ).optional(),
});

const CreditSpecificationSchema = z.object({
  CpuCredits: z.string().describe(
    "The credit option for CPU usage of a T instance. Valid values: standard | unlimited",
  ).optional(),
});

const LaunchTemplateTagSpecificationSchema = z.object({
  ResourceType: z.string().describe(
    "The type of resource. To tag a launch template, ResourceType must be launch-template.",
  ).optional(),
  Tags: z.array(TagSchema).describe("The tags for the resource.").optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  LaunchTemplateName: z.string().describe("A name for the launch template.")
    .optional(),
  LaunchTemplateData: z.object({
    SecurityGroups: z.array(z.string()).describe(
      "The names of the security groups. For a nondefault VPC, you must use security group IDs instead. If you specify a network interface, you must specify any security groups as part of the network interface instead of using this parameter.",
    ).optional(),
    TagSpecifications: z.array(TagSpecificationSchema).describe(
      "The tags to apply to resources that are created during instance launch. To tag the launch template itself, use [TagSpecifications](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-launchtemplate.html#cfn-ec2-launchtemplate-tagspecifications).",
    ).optional(),
    NetworkPerformanceOptions: NetworkPerformanceOptionsSchema.describe(
      "The settings for the network performance options for the instance. For more information, see [EC2 instance bandwidth weighting configuration](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configure-bandwidth-weighting.html).",
    ).optional(),
    UserData: z.string().describe(
      "The user data to make available to the instance. You must provide base64-encoded text. User data is limited to 16 KB. For more information, see [Run commands when you launch an EC2 instance with user data input](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html) in the *Amazon EC2 User Guide*. If you are creating the launch template for use with BATCH, the user data must be provided in the [MIME multi-part archive format](https://docs.aws.amazon.com/https://cloudinit.readthedocs.io/en/latest/topics/format.html#mime-multi-part-archive). For more information, see [Amazon EC2 user data in launch templates](https://docs.aws.amazon.com/batch/latest/userguide/launch-templates.html#lt-user-data) in the *User Guide*.",
    ).optional(),
    BlockDeviceMappings: z.array(BlockDeviceMappingSchema).describe(
      "The block device mapping.",
    ).optional(),
    MaintenanceOptions: MaintenanceOptionsSchema.describe(
      "The maintenance options of your instance.",
    ).optional(),
    IamInstanceProfile: IamInstanceProfileSchema.describe(
      "The name or Amazon Resource Name (ARN) of an IAM instance profile.",
    ).optional(),
    KernelId: z.string().describe(
      "The ID of the kernel. We recommend that you use PV-GRUB instead of kernels and RAM disks. For more information, see [User Provided Kernels](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/UserProvidedkernels.html) in the *Amazon EC2 User Guide*.",
    ).optional(),
    EbsOptimized: z.boolean().describe(
      "Indicates whether the instance is optimized for Amazon EBS I/O. This optimization provides dedicated throughput to Amazon EBS and an optimized configuration stack to provide optimal Amazon EBS I/O performance. This optimization isn't available with all instance types. Additional usage charges apply when using an EBS-optimized instance.",
    ).optional(),
    Placement: PlacementSchema.describe("The placement for the instance.")
      .optional(),
    NetworkInterfaces: z.array(NetworkInterfaceSchema).describe(
      "The network interfaces for the instance.",
    ).optional(),
    EnclaveOptions: EnclaveOptionsSchema.describe(
      "Indicates whether the instance is enabled for AWS Nitro Enclaves. For more information, see [What is Nitro Enclaves?](https://docs.aws.amazon.com/enclaves/latest/user/nitro-enclave.html) in the *Nitro Enclaves User Guide*. You can't enable AWS Nitro Enclaves and hibernation on the same instance.",
    ).optional(),
    ImageId: z.string().describe(
      "The ID of the AMI. Alternatively, you can specify a Systems Manager parameter, which will resolve to an AMI ID on launch. Valid formats: ami-0ac394d6a3example resolve:ssm:parameter-name resolve:ssm:parameter-name:version-number resolve:ssm:parameter-name:label For more information, see [Use a Systems Manager parameter to find an AMI](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/finding-an-ami.html#using-systems-manager-parameter-to-find-AMI) in the *Amazon Elastic Compute Cloud User Guide*.",
    ).optional(),
    InstanceType: z.string().describe(
      "The instance type. For more information, see [Amazon EC2 instance types](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-types.html) in the *Amazon EC2 User Guide*. If you specify InstanceType, you can't specify InstanceRequirements.",
    ).optional(),
    Monitoring: MonitoringSchema.describe("The monitoring for the instance.")
      .optional(),
    HibernationOptions: HibernationOptionsSchema.describe(
      "Indicates whether an instance is enabled for hibernation. This parameter is valid only if the instance meets the [hibernation prerequisites](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/hibernating-prerequisites.html). For more information, see [Hibernate your Amazon EC2 instance](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Hibernate.html) in the *Amazon EC2 User Guide*.",
    ).optional(),
    MetadataOptions: MetadataOptionsSchema.describe(
      "The metadata options for the instance. For more information, see [Configure the Instance Metadata Service options](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-options.html) in the *Amazon EC2 User Guide*.",
    ).optional(),
    LicenseSpecifications: z.array(LicenseSpecificationSchema).describe(
      "The license configurations.",
    ).optional(),
    InstanceInitiatedShutdownBehavior: z.string().describe(
      "Indicates whether an instance stops or terminates when you initiate shutdown from the instance (using the operating system command for system shutdown). Default: stop",
    ).optional(),
    DisableApiStop: z.boolean().describe(
      "Indicates whether to enable the instance for stop protection. For more information, see [Enable stop protection for your EC2 instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-stop-protection.html) in the *Amazon EC2 User Guide*.",
    ).optional(),
    CpuOptions: CpuOptionsSchema.describe(
      "The CPU options for the instance. For more information, see [CPU options for Amazon EC2 instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-optimize-cpu.html) in the *Amazon EC2 User Guide*.",
    ).optional(),
    PrivateDnsNameOptions: PrivateDnsNameOptionsSchema.describe(
      "The hostname type for EC2 instances launched into this subnet and how DNS A and AAAA record queries should be handled. For more information, see [Amazon EC2 instance hostname types](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-naming.html) in the *User Guide*.",
    ).optional(),
    SecurityGroupIds: z.array(z.string()).describe(
      "The IDs of the security groups. You can specify the IDs of existing security groups and references to resources created by the stack template. If you specify a network interface, you must specify any security groups as part of the network interface instead.",
    ).optional(),
    KeyName: z.string().describe(
      "The name of the key pair. You can create a key pair using [CreateKeyPair](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_CreateKeyPair.html) or [ImportKeyPair](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_ImportKeyPair.html). If you do not specify a key pair, you can't connect to the instance unless you choose an AMI that is configured to allow users another way to log in.",
    ).optional(),
    DisableApiTermination: z.boolean().describe(
      "Indicates whether termination protection is enabled for the instance. The default is false, which means that you can terminate the instance using the Amazon EC2 console, command line tools, or API. You can enable termination protection when you launch an instance, while the instance is running, or while the instance is stopped.",
    ).optional(),
    InstanceMarketOptions: InstanceMarketOptionsSchema.describe(
      "The market (purchasing) option for the instances.",
    ).optional(),
    InstanceRequirements: InstanceRequirementsSchema.describe(
      "The attributes for the instance types. When you specify instance attributes, Amazon EC2 will identify instance types with these attributes. You must specify VCpuCount and MemoryMiB. All other attributes are optional. Any unspecified optional attribute is set to its default. When you specify multiple attributes, you get instance types that satisfy all of the specified attributes. If you specify multiple values for an attribute, you get instance types that satisfy any of the specified values. To limit the list of instance types from which Amazon EC2 can identify matching instance types, you can use one of the following parameters, but not both in the same request: AllowedInstanceTypes - The instance types to include in the list. All other instance types are ignored, even if they match your specified attributes. ExcludedInstanceTypes - The instance types to exclude from the list, even if they match your specified attributes. If you specify InstanceRequirements, you can't specify InstanceType. Attribute-based instance type selection is only supported when using Auto Scaling groups, EC2 Fleet, and Spot Fleet to launch instances. If you plan to use the launch template in the [launch instance wizard](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-launch-instance-wizard.html), or with the [RunInstances](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_RunInstances.html) API or [AWS::EC2::Instance](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ec2-instance.html)AWS CloudFormation resource, you can't specify InstanceRequirements. For more information, see [Specify attributes for instance type selection for EC2 Fleet or Spot Fleet](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-fleet-attribute-based-instance-type-selection.html) and [Spot placement score](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/spot-placement-score.html) in the *Amazon EC2 User Guide*.",
    ).optional(),
    RamDiskId: z.string().describe(
      "The ID of the RAM disk. We recommend that you use PV-GRUB instead of kernels and RAM disks. For more information, see [User provided kernels](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/UserProvidedkernels.html) in the *Amazon EC2 User Guide*.",
    ).optional(),
    CapacityReservationSpecification: CapacityReservationSpecificationSchema
      .describe(
        "The Capacity Reservation targeting option. If you do not specify this parameter, the instance's Capacity Reservation preference defaults to open, which enables it to run in any open Capacity Reservation that has matching attributes (instance type, platform, Availability Zone).",
      ).optional(),
    CreditSpecification: CreditSpecificationSchema.describe(
      "The credit option for CPU usage of the instance. Valid only for T instances.",
    ).optional(),
  }).describe("The information for the launch template."),
  VersionDescription: z.string().describe(
    "A description for the first version of the launch template.",
  ).optional(),
  TagSpecifications: z.array(LaunchTemplateTagSpecificationSchema).describe(
    "The tags to apply to the launch template on creation. To tag the launch template, the resource type must be launch-template. To specify the tags for resources that are created during instance launch, use [TagSpecifications](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ec2-launchtemplate-launchtemplatedata.html#cfn-ec2-launchtemplate-launchtemplatedata-tagspecifications).",
  ).optional(),
});

const StateSchema = z.object({
  LaunchTemplateName: z.string().optional(),
  LaunchTemplateData: z.object({
    SecurityGroups: z.array(z.string()),
    TagSpecifications: z.array(TagSpecificationSchema),
    NetworkPerformanceOptions: NetworkPerformanceOptionsSchema,
    UserData: z.string(),
    BlockDeviceMappings: z.array(BlockDeviceMappingSchema),
    MaintenanceOptions: MaintenanceOptionsSchema,
    IamInstanceProfile: IamInstanceProfileSchema,
    KernelId: z.string(),
    EbsOptimized: z.boolean(),
    Placement: PlacementSchema,
    NetworkInterfaces: z.array(NetworkInterfaceSchema),
    EnclaveOptions: EnclaveOptionsSchema,
    ImageId: z.string(),
    InstanceType: z.string(),
    Monitoring: MonitoringSchema,
    HibernationOptions: HibernationOptionsSchema,
    MetadataOptions: MetadataOptionsSchema,
    LicenseSpecifications: z.array(LicenseSpecificationSchema),
    InstanceInitiatedShutdownBehavior: z.string(),
    DisableApiStop: z.boolean(),
    CpuOptions: CpuOptionsSchema,
    PrivateDnsNameOptions: PrivateDnsNameOptionsSchema,
    SecurityGroupIds: z.array(z.string()),
    KeyName: z.string(),
    DisableApiTermination: z.boolean(),
    InstanceMarketOptions: InstanceMarketOptionsSchema,
    InstanceRequirements: InstanceRequirementsSchema,
    RamDiskId: z.string(),
    CapacityReservationSpecification: CapacityReservationSpecificationSchema,
    CreditSpecification: CreditSpecificationSchema,
  }).optional(),
  VersionDescription: z.string().optional(),
  TagSpecifications: z.array(LaunchTemplateTagSpecificationSchema).optional(),
  LatestVersionNumber: z.string().optional(),
  LaunchTemplateId: z.string(),
  DefaultVersionNumber: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  LaunchTemplateName: z.string().describe("A name for the launch template.")
    .optional(),
  LaunchTemplateData: z.object({
    SecurityGroups: z.array(z.string()).describe(
      "The names of the security groups. For a nondefault VPC, you must use security group IDs instead. If you specify a network interface, you must specify any security groups as part of the network interface instead of using this parameter.",
    ).optional(),
    TagSpecifications: z.array(TagSpecificationSchema).describe(
      "The tags to apply to resources that are created during instance launch. To tag the launch template itself, use [TagSpecifications](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-launchtemplate.html#cfn-ec2-launchtemplate-tagspecifications).",
    ).optional(),
    NetworkPerformanceOptions: NetworkPerformanceOptionsSchema.describe(
      "The settings for the network performance options for the instance. For more information, see [EC2 instance bandwidth weighting configuration](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configure-bandwidth-weighting.html).",
    ).optional(),
    UserData: z.string().describe(
      "The user data to make available to the instance. You must provide base64-encoded text. User data is limited to 16 KB. For more information, see [Run commands when you launch an EC2 instance with user data input](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html) in the *Amazon EC2 User Guide*. If you are creating the launch template for use with BATCH, the user data must be provided in the [MIME multi-part archive format](https://docs.aws.amazon.com/https://cloudinit.readthedocs.io/en/latest/topics/format.html#mime-multi-part-archive). For more information, see [Amazon EC2 user data in launch templates](https://docs.aws.amazon.com/batch/latest/userguide/launch-templates.html#lt-user-data) in the *User Guide*.",
    ).optional(),
    BlockDeviceMappings: z.array(BlockDeviceMappingSchema).describe(
      "The block device mapping.",
    ).optional(),
    MaintenanceOptions: MaintenanceOptionsSchema.describe(
      "The maintenance options of your instance.",
    ).optional(),
    IamInstanceProfile: IamInstanceProfileSchema.describe(
      "The name or Amazon Resource Name (ARN) of an IAM instance profile.",
    ).optional(),
    KernelId: z.string().describe(
      "The ID of the kernel. We recommend that you use PV-GRUB instead of kernels and RAM disks. For more information, see [User Provided Kernels](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/UserProvidedkernels.html) in the *Amazon EC2 User Guide*.",
    ).optional(),
    EbsOptimized: z.boolean().describe(
      "Indicates whether the instance is optimized for Amazon EBS I/O. This optimization provides dedicated throughput to Amazon EBS and an optimized configuration stack to provide optimal Amazon EBS I/O performance. This optimization isn't available with all instance types. Additional usage charges apply when using an EBS-optimized instance.",
    ).optional(),
    Placement: PlacementSchema.describe("The placement for the instance.")
      .optional(),
    NetworkInterfaces: z.array(NetworkInterfaceSchema).describe(
      "The network interfaces for the instance.",
    ).optional(),
    EnclaveOptions: EnclaveOptionsSchema.describe(
      "Indicates whether the instance is enabled for AWS Nitro Enclaves. For more information, see [What is Nitro Enclaves?](https://docs.aws.amazon.com/enclaves/latest/user/nitro-enclave.html) in the *Nitro Enclaves User Guide*. You can't enable AWS Nitro Enclaves and hibernation on the same instance.",
    ).optional(),
    ImageId: z.string().describe(
      "The ID of the AMI. Alternatively, you can specify a Systems Manager parameter, which will resolve to an AMI ID on launch. Valid formats: ami-0ac394d6a3example resolve:ssm:parameter-name resolve:ssm:parameter-name:version-number resolve:ssm:parameter-name:label For more information, see [Use a Systems Manager parameter to find an AMI](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/finding-an-ami.html#using-systems-manager-parameter-to-find-AMI) in the *Amazon Elastic Compute Cloud User Guide*.",
    ).optional(),
    InstanceType: z.string().describe(
      "The instance type. For more information, see [Amazon EC2 instance types](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-types.html) in the *Amazon EC2 User Guide*. If you specify InstanceType, you can't specify InstanceRequirements.",
    ).optional(),
    Monitoring: MonitoringSchema.describe("The monitoring for the instance.")
      .optional(),
    HibernationOptions: HibernationOptionsSchema.describe(
      "Indicates whether an instance is enabled for hibernation. This parameter is valid only if the instance meets the [hibernation prerequisites](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/hibernating-prerequisites.html). For more information, see [Hibernate your Amazon EC2 instance](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Hibernate.html) in the *Amazon EC2 User Guide*.",
    ).optional(),
    MetadataOptions: MetadataOptionsSchema.describe(
      "The metadata options for the instance. For more information, see [Configure the Instance Metadata Service options](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-options.html) in the *Amazon EC2 User Guide*.",
    ).optional(),
    LicenseSpecifications: z.array(LicenseSpecificationSchema).describe(
      "The license configurations.",
    ).optional(),
    InstanceInitiatedShutdownBehavior: z.string().describe(
      "Indicates whether an instance stops or terminates when you initiate shutdown from the instance (using the operating system command for system shutdown). Default: stop",
    ).optional(),
    DisableApiStop: z.boolean().describe(
      "Indicates whether to enable the instance for stop protection. For more information, see [Enable stop protection for your EC2 instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-stop-protection.html) in the *Amazon EC2 User Guide*.",
    ).optional(),
    CpuOptions: CpuOptionsSchema.describe(
      "The CPU options for the instance. For more information, see [CPU options for Amazon EC2 instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-optimize-cpu.html) in the *Amazon EC2 User Guide*.",
    ).optional(),
    PrivateDnsNameOptions: PrivateDnsNameOptionsSchema.describe(
      "The hostname type for EC2 instances launched into this subnet and how DNS A and AAAA record queries should be handled. For more information, see [Amazon EC2 instance hostname types](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-naming.html) in the *User Guide*.",
    ).optional(),
    SecurityGroupIds: z.array(z.string()).describe(
      "The IDs of the security groups. You can specify the IDs of existing security groups and references to resources created by the stack template. If you specify a network interface, you must specify any security groups as part of the network interface instead.",
    ).optional(),
    KeyName: z.string().describe(
      "The name of the key pair. You can create a key pair using [CreateKeyPair](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_CreateKeyPair.html) or [ImportKeyPair](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_ImportKeyPair.html). If you do not specify a key pair, you can't connect to the instance unless you choose an AMI that is configured to allow users another way to log in.",
    ).optional(),
    DisableApiTermination: z.boolean().describe(
      "Indicates whether termination protection is enabled for the instance. The default is false, which means that you can terminate the instance using the Amazon EC2 console, command line tools, or API. You can enable termination protection when you launch an instance, while the instance is running, or while the instance is stopped.",
    ).optional(),
    InstanceMarketOptions: InstanceMarketOptionsSchema.describe(
      "The market (purchasing) option for the instances.",
    ).optional(),
    InstanceRequirements: InstanceRequirementsSchema.describe(
      "The attributes for the instance types. When you specify instance attributes, Amazon EC2 will identify instance types with these attributes. You must specify VCpuCount and MemoryMiB. All other attributes are optional. Any unspecified optional attribute is set to its default. When you specify multiple attributes, you get instance types that satisfy all of the specified attributes. If you specify multiple values for an attribute, you get instance types that satisfy any of the specified values. To limit the list of instance types from which Amazon EC2 can identify matching instance types, you can use one of the following parameters, but not both in the same request: AllowedInstanceTypes - The instance types to include in the list. All other instance types are ignored, even if they match your specified attributes. ExcludedInstanceTypes - The instance types to exclude from the list, even if they match your specified attributes. If you specify InstanceRequirements, you can't specify InstanceType. Attribute-based instance type selection is only supported when using Auto Scaling groups, EC2 Fleet, and Spot Fleet to launch instances. If you plan to use the launch template in the [launch instance wizard](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-launch-instance-wizard.html), or with the [RunInstances](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_RunInstances.html) API or [AWS::EC2::Instance](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ec2-instance.html)AWS CloudFormation resource, you can't specify InstanceRequirements. For more information, see [Specify attributes for instance type selection for EC2 Fleet or Spot Fleet](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-fleet-attribute-based-instance-type-selection.html) and [Spot placement score](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/spot-placement-score.html) in the *Amazon EC2 User Guide*.",
    ).optional(),
    RamDiskId: z.string().describe(
      "The ID of the RAM disk. We recommend that you use PV-GRUB instead of kernels and RAM disks. For more information, see [User provided kernels](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/UserProvidedkernels.html) in the *Amazon EC2 User Guide*.",
    ).optional(),
    CapacityReservationSpecification: CapacityReservationSpecificationSchema
      .describe(
        "The Capacity Reservation targeting option. If you do not specify this parameter, the instance's Capacity Reservation preference defaults to open, which enables it to run in any open Capacity Reservation that has matching attributes (instance type, platform, Availability Zone).",
      ).optional(),
    CreditSpecification: CreditSpecificationSchema.describe(
      "The credit option for CPU usage of the instance. Valid only for T instances.",
    ).optional(),
  }).describe("The information for the launch template.").optional(),
  VersionDescription: z.string().describe(
    "A description for the first version of the launch template.",
  ).optional(),
  TagSpecifications: z.array(LaunchTemplateTagSpecificationSchema).describe(
    "The tags to apply to the launch template on creation. To tag the launch template, the resource type must be launch-template. To specify the tags for resources that are created during instance launch, use [TagSpecifications](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ec2-launchtemplate-launchtemplatedata.html#cfn-ec2-launchtemplate-launchtemplatedata-tagspecifications).",
  ).optional(),
});

/** Swamp extension model for EC2 LaunchTemplate. Registered at `@swamp/aws/ec2/launch-template`. */
export const model = {
  type: "@swamp/aws/ec2/launch-template",
  version: "2026.05.24.1",
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
      toVersion: "2026.05.20.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.24.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "EC2 LaunchTemplate resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EC2 LaunchTemplate",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::EC2::LaunchTemplate",
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
      description: "Get a EC2 LaunchTemplate",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 LaunchTemplate",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::EC2::LaunchTemplate",
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
      description: "Update a EC2 LaunchTemplate",
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
        const identifier = existing.LaunchTemplateId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::EC2::LaunchTemplate",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::EC2::LaunchTemplate",
          identifier,
          currentState,
          desiredState,
          ["LaunchTemplateName"],
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
      description: "Delete a EC2 LaunchTemplate",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 LaunchTemplate",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::EC2::LaunchTemplate",
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
      description: "Sync EC2 LaunchTemplate state from AWS",
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
        const identifier = existing.LaunchTemplateId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::EC2::LaunchTemplate",
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
