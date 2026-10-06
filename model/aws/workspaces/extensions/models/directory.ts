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

// Auto-generated extension model for @swamp/aws/workspaces/directory
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for WorkSpaces Directory (AWS::WorkSpaces::Directory).
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
  Key: z.string().min(1).max(127).describe("The key of the tag."),
  Value: z.string().min(0).max(255).describe("The value of the tag."),
});

const AccessEndpointSchema = z.object({
  AccessEndpointType: z.enum(["STREAMING_WSP"]).describe(
    "Indicates the type of access endpoint.",
  ).optional(),
  VpcEndpointId: z.string().regex(new RegExp("^[a-zA-Z0-9\\_\\-]{1,1000}$"))
    .describe("Indicates the VPC endpoint to use for access.").optional(),
});

const AccessEndpointConfigSchema = z.object({
  AccessEndpoints: z.array(AccessEndpointSchema).describe(
    "Indicates a list of access endpoints associated with this directory.",
  ),
  InternetFallbackProtocols: z.array(z.enum(["PCOIP"])).describe(
    "Indicates a list of protocols that fallback to using the public Internet when streaming over a VPC endpoint is not available.",
  ).optional(),
});

const UserSettingSchema = z.object({
  Action: z.enum([
    "CLIPBOARD_COPY_FROM_LOCAL_DEVICE",
    "CLIPBOARD_COPY_TO_LOCAL_DEVICE",
    "PRINTING_TO_LOCAL_DEVICE",
    "SMART_CARD",
  ]).describe("Indicates the type of action."),
  Permission: z.enum(["ENABLED", "DISABLED"]).describe(
    "Indicates if the setting is enabled or disabled.",
  ),
  MaximumLength: z.number().int().min(0).describe(
    "Indicates the maximum character length for the specified user setting.",
  ).optional(),
});

const StorageConnectorSchema = z.object({
  ConnectorType: z.enum(["HOME_FOLDER"]).describe(
    "The type of connector used to save user files.",
  ),
  Status: z.enum(["ENABLED", "DISABLED"]).describe(
    "Indicates if the storage connector is enabled or disabled.",
  ),
});

const GlobalAcceleratorForDirectorySchema = z.object({
  Mode: z.enum(["ENABLED_AUTO", "DISABLED"]).describe(
    "Indicates if Global Accelerator for directory is enabled or disabled.",
  ),
  PreferredProtocol: z.enum(["TCP", "NONE"]).describe(
    "Indicates the preferred protocol for Global Accelerator.",
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
    "AWS region; overrides AWS_REGION / AWS_DEFAULT_REGION environment variables and ~/.aws/config profile region. Defaults to us-east-1.",
  ).optional(),
  SubnetIds: z.array(
    z.string().min(15).max(24).regex(
      new RegExp("^(subnet-([0-9a-f]{8}|[0-9a-f]{17}))$"),
    ),
  ).describe(
    "The identifiers of the subnets for your virtual private cloud (VPC).",
  ).optional(),
  EnableSelfService: z.boolean().describe(
    "Indicates whether self-service capabilities are enabled or disabled.",
  ).optional(),
  Tenancy: z.enum(["DEDICATED", "SHARED"]).describe(
    "Indicates whether your WorkSpace directory is dedicated or shared.",
  ).optional(),
  Tags: z.array(TagSchema).describe("The tags associated with the directory.")
    .optional(),
  WorkspaceDirectoryName: z.string().regex(
    new RegExp("^[a-zA-Z0-9][a-zA-Z0-9_.\\s-]{1,64}$"),
  ).describe("The name of the directory to register.").optional(),
  WorkspaceDirectoryDescription: z.string().regex(
    new RegExp("^([a-zA-Z0-9_])[\\\\a-zA-Z0-9_@#%*+=:?./!\\s-]{1,255}$"),
  ).describe("Description of the directory to register.").optional(),
  UserIdentityType: z.enum([
    "CUSTOMER_MANAGED",
    "AWS_DIRECTORY_SERVICE",
    "AWS_IAM_IDENTITY_CENTER",
  ]).describe("The type of identity management the user is using.").optional(),
  IdcInstanceArn: z.string().regex(
    new RegExp(
      "^arn:aws[a-z-]{0,7}:[A-Za-z0-9][A-za-z0-9_/.-]{0,62}:[A-za-z0-9_/.-]{0,63}:[A-za-z0-9_/.-]{0,63}:[A-Za-z0-9][A-Za-z0-9:_/+=,@.\\\\-]{0,1023}$",
    ),
  ).describe("The Amazon Resource Name (ARN) of the identity center instance.")
    .optional(),
  MicrosoftEntraConfig: z.object({
    TenantId: z.string().regex(new RegExp("^[a-zA-Z0-9-]{1,100}$")).describe(
      "The identifier of the tenant.",
    ).optional(),
    ApplicationConfigSecretArn: z.string().regex(
      new RegExp(
        "^arn:aws[a-z-]{0,7}:secretsmanager:[A-za-z0-9_/.-]{0,63}:[A-za-z0-9_/.-]{0,63}:secret:[A-Za-z0-9][A-za-z0-9_/.-]{8,519}$",
      ),
    ).describe("The Amazon Resource Name (ARN) of the application config.")
      .optional(),
  }).describe("Specifies the configurations of the Microsoft Entra.")
    .optional(),
  WorkspaceType: z.enum(["PERSONAL", "POOLS"]).describe(
    "Indicates whether the directory's WorkSpace type is personal or pools.",
  ).optional(),
  ActiveDirectoryConfig: z.object({
    DomainName: z.string().regex(
      new RegExp("^([a-zA-Z0-9]+[.-])+([a-zA-Z0-9])+$"),
    ).describe("The name of the domain."),
    ServiceAccountSecretArn: z.string().regex(
      new RegExp(
        "^arn:aws[a-z-]{0,7}:secretsmanager:[A-za-z0-9_/.-]{0,63}:[A-za-z0-9_/.-]{0,63}:secret:[A-Za-z0-9][A-za-z0-9_/.-]{8,519}$",
      ),
    ).describe("Indicates the secret ARN on the service account."),
  }).describe("Information about the Active Directory config.").optional(),
  WorkspaceCreationProperties: z.object({
    EnableInternetAccess: z.boolean().describe(
      "Specifies whether to automatically assign an Elastic public IP address to WorkSpaces in this directory by default.",
    ).optional(),
    DefaultOu: z.string().describe(
      "The organizational unit (OU) in the directory for the WorkSpace machine accounts.",
    ).optional(),
    CustomSecurityGroupId: z.string().min(11).max(20).regex(
      new RegExp("^(sg-([0-9a-f]{8}|[0-9a-f]{17}))$"),
    ).describe(
      "The identifier of the default security group to apply to WorkSpaces when they are created.",
    ).optional(),
    UserEnabledAsLocalAdministrator: z.boolean().describe(
      "Specifies whether WorkSpace users are local administrators on their WorkSpaces.",
    ).optional(),
    EnableMaintenanceMode: z.boolean().describe(
      "Specifies whether maintenance mode is enabled for WorkSpaces.",
    ).optional(),
    InstanceIamRoleArn: z.string().regex(
      new RegExp(
        "^arn:aws[a-z-]{0,7}:[A-Za-z0-9][A-za-z0-9_/.-]{0,62}:[A-za-z0-9_/.-]{0,63}:[A-za-z0-9_/.-]{0,63}:[A-Za-z0-9][A-Za-z0-9:_/+=,@.\\\\-]{0,1023}$",
      ),
    ).describe("Indicates the IAM role ARN of the instance.").optional(),
  }).describe("The default values that are used to create WorkSpaces.")
    .optional(),
  IpGroupIds: z.array(z.string().regex(new RegExp("^wsipg-[0-9a-z]{8,63}$")))
    .describe(
      "The identifiers of the IP access control groups associated with the directory.",
    ).optional(),
  WorkspaceAccessProperties: z.object({
    DeviceTypeWindows: z.enum(["ALLOW", "DENY"]).describe(
      "Indicates whether users can use Windows clients to access their WorkSpaces.",
    ).optional(),
    DeviceTypeOsx: z.enum(["ALLOW", "DENY"]).describe(
      "Indicates whether users can use macOS clients to access their WorkSpaces.",
    ).optional(),
    DeviceTypeWeb: z.enum(["ALLOW", "DENY"]).describe(
      "Indicates whether users can access their WorkSpaces through a web browser.",
    ).optional(),
    DeviceTypeIos: z.enum(["ALLOW", "DENY"]).describe(
      "Indicates whether users can use iOS devices to access their WorkSpaces.",
    ).optional(),
    DeviceTypeAndroid: z.enum(["ALLOW", "DENY"]).describe(
      "Indicates whether users can use Android and Android-compatible Chrome OS devices to access their WorkSpaces.",
    ).optional(),
    DeviceTypeChromeOs: z.enum(["ALLOW", "DENY"]).describe(
      "Indicates whether users can use Chromebooks to access their WorkSpaces.",
    ).optional(),
    DeviceTypeZeroClient: z.enum(["ALLOW", "DENY"]).describe(
      "Indicates whether users can use zero client devices to access their WorkSpaces.",
    ).optional(),
    DeviceTypeLinux: z.enum(["ALLOW", "DENY"]).describe(
      "Indicates whether users can use Linux clients to access their WorkSpaces.",
    ).optional(),
    DeviceTypeWorkSpacesThinClient: z.enum(["ALLOW", "DENY"]).describe(
      "Indicates whether users can access their WorkSpaces through a WorkSpaces Thin Client.",
    ).optional(),
    AccessEndpointConfig: AccessEndpointConfigSchema.describe(
      "Describes the access endpoint configuration for a WorkSpace.",
    ).optional(),
  }).describe(
    "The device types and operating systems that can be used to access a WorkSpace.",
  ).optional(),
  SelfservicePermissions: z.object({
    RestartWorkspace: z.enum(["ENABLED", "DISABLED"]).describe(
      "Specifies whether users can restart their WorkSpace.",
    ).optional(),
    IncreaseVolumeSize: z.enum(["ENABLED", "DISABLED"]).describe(
      "Specifies whether users can increase the volume size of the drives on their WorkSpace.",
    ).optional(),
    ChangeComputeType: z.enum(["ENABLED", "DISABLED"]).describe(
      "Specifies whether users can change the compute type (bundle) for their WorkSpace.",
    ).optional(),
    SwitchRunningMode: z.enum(["ENABLED", "DISABLED"]).describe(
      "Specifies whether users can switch the running mode of their WorkSpace.",
    ).optional(),
    RebuildWorkspace: z.enum(["ENABLED", "DISABLED"]).describe(
      "Specifies whether users can rebuild the operating system of a WorkSpace to its original state.",
    ).optional(),
  }).describe("Describes the self-service permissions for a directory.")
    .optional(),
  SamlProperties: z.object({
    Status: z.enum([
      "DISABLED",
      "ENABLED",
      "ENABLED_WITH_DIRECTORY_LOGIN_FALLBACK",
    ]).describe("Indicates the status of SAML 2.0 authentication.").optional(),
    UserAccessUrl: z.string().min(8).max(200).regex(
      new RegExp("^(http|https)\\://\\S+$"),
    ).describe("The SAML 2.0 identity provider (IdP) user access URL.")
      .optional(),
    RelayStateParameterName: z.string().min(1).describe(
      "The relay state parameter name supported by the SAML 2.0 identity provider (IdP).",
    ).optional(),
  }).describe(
    "Describes the enablement status, user access URL, and relay state parameter name that are used for configuring federation with an SAML 2.0 identity provider.",
  ).optional(),
  CertificateBasedAuthProperties: z.object({
    Status: z.enum(["DISABLED", "ENABLED"]).describe(
      "The status of the certificate-based authentication properties.",
    ).optional(),
    CertificateAuthorityArn: z.string().min(5).max(200).regex(
      new RegExp(
        "^arn:[\\w+=/,.@-]+:[\\w+=/,.@-]+:[\\w+=/,.@-]*:[0-9]*:[\\w+=,.@-]+(/[\\w+=,.@-]+)*$",
      ),
    ).describe(
      "The Amazon Resource Name (ARN) of the Amazon Web Services Certificate Manager Private CA resource.",
    ).optional(),
  }).describe(
    "Describes the properties of the certificate-based authentication you want to use with your WorkSpaces.",
  ).optional(),
  EndpointEncryptionMode: z.enum(["STANDARD_TLS", "FIPS_VALIDATED"]).describe(
    "Endpoint encryption mode that allows you to configure the specified directory between Standard TLS and FIPS 140-2 validated mode.",
  ).optional(),
  IDCConfig: z.object({
    InstanceArn: z.string().regex(
      new RegExp(
        "^arn:aws[a-z-]{0,7}:[A-Za-z0-9][A-za-z0-9_/.-]{0,62}:[A-za-z0-9_/.-]{0,63}:[A-za-z0-9_/.-]{0,63}:[A-Za-z0-9][A-Za-z0-9:_/+=,@.\\\\-]{0,1023}$",
      ),
    ).describe(
      "The Amazon Resource Name (ARN) of the identity center instance.",
    ).optional(),
    ApplicationArn: z.string().regex(
      new RegExp(
        "^arn:aws[a-z-]{0,7}:[A-Za-z0-9][A-za-z0-9_/.-]{0,62}:[A-za-z0-9_/.-]{0,63}:[A-za-z0-9_/.-]{0,63}:[A-Za-z0-9][A-Za-z0-9:_/+=,@.\\\\-]{0,1023}$",
      ),
    ).describe("The Amazon Resource Name (ARN) of the application.").optional(),
  }).describe("Specifies the configurations of the identity center.")
    .optional(),
  StreamingProperties: z.object({
    StreamingExperiencePreferredProtocol: z.enum(["TCP", "UDP"]).describe(
      "Indicates the type of preferred protocol for the streaming experience.",
    ).optional(),
    UserSettings: z.array(UserSettingSchema).describe(
      "Indicates the permission settings associated with the user.",
    ).optional(),
    StorageConnectors: z.array(StorageConnectorSchema).describe(
      "Indicates the storage connector used.",
    ).optional(),
    GlobalAccelerator: GlobalAcceleratorForDirectorySchema.describe(
      "Describes the Global Accelerator for directory.",
    ).optional(),
  }).describe("Describes the streaming properties.").optional(),
});

const StateSchema = z.object({
  DirectoryId: z.string().optional(),
  Arn: z.string(),
  SubnetIds: z.array(z.string()).optional(),
  EnableSelfService: z.boolean().optional(),
  Tenancy: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  WorkspaceDirectoryName: z.string().optional(),
  WorkspaceDirectoryDescription: z.string().optional(),
  UserIdentityType: z.string().optional(),
  IdcInstanceArn: z.string().optional(),
  MicrosoftEntraConfig: z.object({
    TenantId: z.string(),
    ApplicationConfigSecretArn: z.string(),
  }).optional(),
  WorkspaceType: z.string().optional(),
  ActiveDirectoryConfig: z.object({
    DomainName: z.string(),
    ServiceAccountSecretArn: z.string(),
  }).optional(),
  State: z.string().optional(),
  Alias: z.string().optional(),
  DirectoryName: z.string().optional(),
  DirectoryType: z.string().optional(),
  DnsIpAddresses: z.array(z.string()).optional(),
  DnsIpv6Addresses: z.array(z.string()).optional(),
  CustomerUserName: z.string().optional(),
  IamRoleId: z.string().optional(),
  RegistrationCode: z.string().optional(),
  WorkspaceSecurityGroupId: z.string().optional(),
  WorkspaceCreationProperties: z.object({
    EnableInternetAccess: z.boolean(),
    DefaultOu: z.string(),
    CustomSecurityGroupId: z.string(),
    UserEnabledAsLocalAdministrator: z.boolean(),
    EnableMaintenanceMode: z.boolean(),
    InstanceIamRoleArn: z.string(),
  }).optional(),
  IpGroupIds: z.array(z.string()).optional(),
  WorkspaceAccessProperties: z.object({
    DeviceTypeWindows: z.string(),
    DeviceTypeOsx: z.string(),
    DeviceTypeWeb: z.string(),
    DeviceTypeIos: z.string(),
    DeviceTypeAndroid: z.string(),
    DeviceTypeChromeOs: z.string(),
    DeviceTypeZeroClient: z.string(),
    DeviceTypeLinux: z.string(),
    DeviceTypeWorkSpacesThinClient: z.string(),
    AccessEndpointConfig: AccessEndpointConfigSchema,
  }).optional(),
  SelfservicePermissions: z.object({
    RestartWorkspace: z.string(),
    IncreaseVolumeSize: z.string(),
    ChangeComputeType: z.string(),
    SwitchRunningMode: z.string(),
    RebuildWorkspace: z.string(),
  }).optional(),
  SamlProperties: z.object({
    Status: z.string(),
    UserAccessUrl: z.string(),
    RelayStateParameterName: z.string(),
  }).optional(),
  CertificateBasedAuthProperties: z.object({
    Status: z.string(),
    CertificateAuthorityArn: z.string(),
  }).optional(),
  EndpointEncryptionMode: z.string().optional(),
  IDCConfig: z.object({
    InstanceArn: z.string(),
    ApplicationArn: z.string(),
  }).optional(),
  StreamingProperties: z.object({
    StreamingExperiencePreferredProtocol: z.string(),
    UserSettings: z.array(UserSettingSchema),
    StorageConnectors: z.array(StorageConnectorSchema),
    GlobalAccelerator: GlobalAcceleratorForDirectorySchema,
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  SubnetIds: z.array(
    z.string().min(15).max(24).regex(
      new RegExp("^(subnet-([0-9a-f]{8}|[0-9a-f]{17}))$"),
    ),
  ).describe(
    "The identifiers of the subnets for your virtual private cloud (VPC).",
  ).optional(),
  EnableSelfService: z.boolean().describe(
    "Indicates whether self-service capabilities are enabled or disabled.",
  ).optional(),
  Tenancy: z.enum(["DEDICATED", "SHARED"]).describe(
    "Indicates whether your WorkSpace directory is dedicated or shared.",
  ).optional(),
  Tags: z.array(TagSchema).describe("The tags associated with the directory.")
    .optional(),
  WorkspaceDirectoryName: z.string().regex(
    new RegExp("^[a-zA-Z0-9][a-zA-Z0-9_.\\s-]{1,64}$"),
  ).describe("The name of the directory to register.").optional(),
  WorkspaceDirectoryDescription: z.string().regex(
    new RegExp("^([a-zA-Z0-9_])[\\\\a-zA-Z0-9_@#%*+=:?./!\\s-]{1,255}$"),
  ).describe("Description of the directory to register.").optional(),
  UserIdentityType: z.enum([
    "CUSTOMER_MANAGED",
    "AWS_DIRECTORY_SERVICE",
    "AWS_IAM_IDENTITY_CENTER",
  ]).describe("The type of identity management the user is using.").optional(),
  IdcInstanceArn: z.string().regex(
    new RegExp(
      "^arn:aws[a-z-]{0,7}:[A-Za-z0-9][A-za-z0-9_/.-]{0,62}:[A-za-z0-9_/.-]{0,63}:[A-za-z0-9_/.-]{0,63}:[A-Za-z0-9][A-Za-z0-9:_/+=,@.\\\\-]{0,1023}$",
    ),
  ).describe("The Amazon Resource Name (ARN) of the identity center instance.")
    .optional(),
  MicrosoftEntraConfig: z.object({
    TenantId: z.string().regex(new RegExp("^[a-zA-Z0-9-]{1,100}$")).describe(
      "The identifier of the tenant.",
    ).optional(),
    ApplicationConfigSecretArn: z.string().regex(
      new RegExp(
        "^arn:aws[a-z-]{0,7}:secretsmanager:[A-za-z0-9_/.-]{0,63}:[A-za-z0-9_/.-]{0,63}:secret:[A-Za-z0-9][A-za-z0-9_/.-]{8,519}$",
      ),
    ).describe("The Amazon Resource Name (ARN) of the application config.")
      .optional(),
  }).describe("Specifies the configurations of the Microsoft Entra.")
    .optional(),
  WorkspaceType: z.enum(["PERSONAL", "POOLS"]).describe(
    "Indicates whether the directory's WorkSpace type is personal or pools.",
  ).optional(),
  ActiveDirectoryConfig: z.object({
    DomainName: z.string().regex(
      new RegExp("^([a-zA-Z0-9]+[.-])+([a-zA-Z0-9])+$"),
    ).describe("The name of the domain.").optional(),
    ServiceAccountSecretArn: z.string().regex(
      new RegExp(
        "^arn:aws[a-z-]{0,7}:secretsmanager:[A-za-z0-9_/.-]{0,63}:[A-za-z0-9_/.-]{0,63}:secret:[A-Za-z0-9][A-za-z0-9_/.-]{8,519}$",
      ),
    ).describe("Indicates the secret ARN on the service account.").optional(),
  }).describe("Information about the Active Directory config.").optional(),
  WorkspaceCreationProperties: z.object({
    EnableInternetAccess: z.boolean().describe(
      "Specifies whether to automatically assign an Elastic public IP address to WorkSpaces in this directory by default.",
    ).optional(),
    DefaultOu: z.string().describe(
      "The organizational unit (OU) in the directory for the WorkSpace machine accounts.",
    ).optional(),
    CustomSecurityGroupId: z.string().min(11).max(20).regex(
      new RegExp("^(sg-([0-9a-f]{8}|[0-9a-f]{17}))$"),
    ).describe(
      "The identifier of the default security group to apply to WorkSpaces when they are created.",
    ).optional(),
    UserEnabledAsLocalAdministrator: z.boolean().describe(
      "Specifies whether WorkSpace users are local administrators on their WorkSpaces.",
    ).optional(),
    EnableMaintenanceMode: z.boolean().describe(
      "Specifies whether maintenance mode is enabled for WorkSpaces.",
    ).optional(),
    InstanceIamRoleArn: z.string().regex(
      new RegExp(
        "^arn:aws[a-z-]{0,7}:[A-Za-z0-9][A-za-z0-9_/.-]{0,62}:[A-za-z0-9_/.-]{0,63}:[A-za-z0-9_/.-]{0,63}:[A-Za-z0-9][A-Za-z0-9:_/+=,@.\\\\-]{0,1023}$",
      ),
    ).describe("Indicates the IAM role ARN of the instance.").optional(),
  }).describe("The default values that are used to create WorkSpaces.")
    .optional(),
  IpGroupIds: z.array(z.string().regex(new RegExp("^wsipg-[0-9a-z]{8,63}$")))
    .describe(
      "The identifiers of the IP access control groups associated with the directory.",
    ).optional(),
  WorkspaceAccessProperties: z.object({
    DeviceTypeWindows: z.enum(["ALLOW", "DENY"]).describe(
      "Indicates whether users can use Windows clients to access their WorkSpaces.",
    ).optional(),
    DeviceTypeOsx: z.enum(["ALLOW", "DENY"]).describe(
      "Indicates whether users can use macOS clients to access their WorkSpaces.",
    ).optional(),
    DeviceTypeWeb: z.enum(["ALLOW", "DENY"]).describe(
      "Indicates whether users can access their WorkSpaces through a web browser.",
    ).optional(),
    DeviceTypeIos: z.enum(["ALLOW", "DENY"]).describe(
      "Indicates whether users can use iOS devices to access their WorkSpaces.",
    ).optional(),
    DeviceTypeAndroid: z.enum(["ALLOW", "DENY"]).describe(
      "Indicates whether users can use Android and Android-compatible Chrome OS devices to access their WorkSpaces.",
    ).optional(),
    DeviceTypeChromeOs: z.enum(["ALLOW", "DENY"]).describe(
      "Indicates whether users can use Chromebooks to access their WorkSpaces.",
    ).optional(),
    DeviceTypeZeroClient: z.enum(["ALLOW", "DENY"]).describe(
      "Indicates whether users can use zero client devices to access their WorkSpaces.",
    ).optional(),
    DeviceTypeLinux: z.enum(["ALLOW", "DENY"]).describe(
      "Indicates whether users can use Linux clients to access their WorkSpaces.",
    ).optional(),
    DeviceTypeWorkSpacesThinClient: z.enum(["ALLOW", "DENY"]).describe(
      "Indicates whether users can access their WorkSpaces through a WorkSpaces Thin Client.",
    ).optional(),
    AccessEndpointConfig: AccessEndpointConfigSchema.describe(
      "Describes the access endpoint configuration for a WorkSpace.",
    ).optional(),
  }).describe(
    "The device types and operating systems that can be used to access a WorkSpace.",
  ).optional(),
  SelfservicePermissions: z.object({
    RestartWorkspace: z.enum(["ENABLED", "DISABLED"]).describe(
      "Specifies whether users can restart their WorkSpace.",
    ).optional(),
    IncreaseVolumeSize: z.enum(["ENABLED", "DISABLED"]).describe(
      "Specifies whether users can increase the volume size of the drives on their WorkSpace.",
    ).optional(),
    ChangeComputeType: z.enum(["ENABLED", "DISABLED"]).describe(
      "Specifies whether users can change the compute type (bundle) for their WorkSpace.",
    ).optional(),
    SwitchRunningMode: z.enum(["ENABLED", "DISABLED"]).describe(
      "Specifies whether users can switch the running mode of their WorkSpace.",
    ).optional(),
    RebuildWorkspace: z.enum(["ENABLED", "DISABLED"]).describe(
      "Specifies whether users can rebuild the operating system of a WorkSpace to its original state.",
    ).optional(),
  }).describe("Describes the self-service permissions for a directory.")
    .optional(),
  SamlProperties: z.object({
    Status: z.enum([
      "DISABLED",
      "ENABLED",
      "ENABLED_WITH_DIRECTORY_LOGIN_FALLBACK",
    ]).describe("Indicates the status of SAML 2.0 authentication.").optional(),
    UserAccessUrl: z.string().min(8).max(200).regex(
      new RegExp("^(http|https)\\://\\S+$"),
    ).describe("The SAML 2.0 identity provider (IdP) user access URL.")
      .optional(),
    RelayStateParameterName: z.string().min(1).describe(
      "The relay state parameter name supported by the SAML 2.0 identity provider (IdP).",
    ).optional(),
  }).describe(
    "Describes the enablement status, user access URL, and relay state parameter name that are used for configuring federation with an SAML 2.0 identity provider.",
  ).optional(),
  CertificateBasedAuthProperties: z.object({
    Status: z.enum(["DISABLED", "ENABLED"]).describe(
      "The status of the certificate-based authentication properties.",
    ).optional(),
    CertificateAuthorityArn: z.string().min(5).max(200).regex(
      new RegExp(
        "^arn:[\\w+=/,.@-]+:[\\w+=/,.@-]+:[\\w+=/,.@-]*:[0-9]*:[\\w+=,.@-]+(/[\\w+=,.@-]+)*$",
      ),
    ).describe(
      "The Amazon Resource Name (ARN) of the Amazon Web Services Certificate Manager Private CA resource.",
    ).optional(),
  }).describe(
    "Describes the properties of the certificate-based authentication you want to use with your WorkSpaces.",
  ).optional(),
  EndpointEncryptionMode: z.enum(["STANDARD_TLS", "FIPS_VALIDATED"]).describe(
    "Endpoint encryption mode that allows you to configure the specified directory between Standard TLS and FIPS 140-2 validated mode.",
  ).optional(),
  IDCConfig: z.object({
    InstanceArn: z.string().regex(
      new RegExp(
        "^arn:aws[a-z-]{0,7}:[A-Za-z0-9][A-za-z0-9_/.-]{0,62}:[A-za-z0-9_/.-]{0,63}:[A-za-z0-9_/.-]{0,63}:[A-Za-z0-9][A-Za-z0-9:_/+=,@.\\\\-]{0,1023}$",
      ),
    ).describe(
      "The Amazon Resource Name (ARN) of the identity center instance.",
    ).optional(),
    ApplicationArn: z.string().regex(
      new RegExp(
        "^arn:aws[a-z-]{0,7}:[A-Za-z0-9][A-za-z0-9_/.-]{0,62}:[A-za-z0-9_/.-]{0,63}:[A-za-z0-9_/.-]{0,63}:[A-Za-z0-9][A-Za-z0-9:_/+=,@.\\\\-]{0,1023}$",
      ),
    ).describe("The Amazon Resource Name (ARN) of the application.").optional(),
  }).describe("Specifies the configurations of the identity center.")
    .optional(),
  StreamingProperties: z.object({
    StreamingExperiencePreferredProtocol: z.enum(["TCP", "UDP"]).describe(
      "Indicates the type of preferred protocol for the streaming experience.",
    ).optional(),
    UserSettings: z.array(UserSettingSchema).describe(
      "Indicates the permission settings associated with the user.",
    ).optional(),
    StorageConnectors: z.array(StorageConnectorSchema).describe(
      "Indicates the storage connector used.",
    ).optional(),
    GlobalAccelerator: GlobalAcceleratorForDirectorySchema.describe(
      "Describes the Global Accelerator for directory.",
    ).optional(),
  }).describe("Describes the streaming properties.").optional(),
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

/** Swamp extension model for WorkSpaces Directory. Registered at `@swamp/aws/workspaces/directory`. */
export const model = {
  type: "@swamp/aws/workspaces/directory",
  version: "2026.10.06.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "WorkSpaces Directory resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a WorkSpaces Directory",
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
          "AWS::WorkSpaces::Directory",
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
      description: "Get a WorkSpaces Directory",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the WorkSpaces Directory",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::WorkSpaces::Directory",
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
      description: "Update a WorkSpaces Directory",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::WorkSpaces::Directory",
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
          "AWS::WorkSpaces::Directory",
          identifier,
          currentState,
          desiredState,
          [
            "SubnetIds",
            "EnableSelfService",
            "Tenancy",
            "WorkspaceDirectoryName",
            "WorkspaceDirectoryDescription",
            "UserIdentityType",
            "WorkspaceType",
            "ActiveDirectoryConfig",
            "IdcInstanceArn",
            "MicrosoftEntraConfig",
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
      description: "Delete a WorkSpaces Directory",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the WorkSpaces Directory",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::WorkSpaces::Directory",
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
      description: "Sync WorkSpaces Directory state from AWS",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::WorkSpaces::Directory",
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
      description: "List WorkSpaces Directory resources",
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
        const { items, nextToken } = await listResources(
          "AWS::WorkSpaces::Directory",
          {
            resourceModel: args.resourceModel,
            maxPages: args.maxPages,
            credentials,
          },
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const instanceName =
            (item.properties?.Arn?.toString() ?? item.identifier).replace(
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
