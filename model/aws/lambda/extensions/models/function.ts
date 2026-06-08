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

// Auto-generated extension model for @swamp/aws/lambda/function
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Lambda Function (AWS::Lambda::Function).
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

const FileSystemConfigSchema = z.object({
  Arn: z.string().max(200).regex(
    new RegExp(
      "^arn:aws[a-zA-Z-]*:elasticfilesystem:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:\\d{12}:access-point/fsap-[a-f0-9]{17}$|^arn:aws[-a-z]*:s3files:[0-9a-z-:]+:file-system/fs-[0-9a-f]{17,40}/access-point/fsap-[0-9a-f]{17,40}$",
    ),
  ).describe(
    "The Amazon Resource Name (ARN) of the Amazon EFS or Amazon S3 Files access point that provides access to the file system.",
  ),
  LocalMountPath: z.string().max(160).regex(
    new RegExp("^/mnt/[a-zA-Z0-9-_.]+$"),
  ).describe(
    "The path where the function can access the file system, starting with /mnt/.",
  ),
});

const TagSchema = z.object({
  Value: z.string().min(0).max(256).describe("The value for this tag.")
    .optional(),
  Key: z.string().min(1).max(128).describe("The key for this tag."),
});

const LambdaManagedInstancesCapacityProviderConfigSchema = z.object({
  ExecutionEnvironmentMemoryGiBPerVCpu: z.number().min(2).max(8).describe(
    "The amount of memory in GiB allocated per vCPU for execution environments.",
  ).optional(),
  CapacityProviderArn: z.string().min(1).max(140).regex(
    new RegExp(
      "^arn:aws[a-zA-Z-]*:lambda:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:\\d{12}:capacity-provider:[a-zA-Z0-9-_]+$",
    ),
  ).describe("The Amazon Resource Name (ARN) of the capacity provider."),
  PerExecutionEnvironmentMaxConcurrency: z.number().int().min(1).max(1600)
    .describe(
      "The maximum number of concurrent executions that can run on each execution environment.",
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
  FunctionScalingConfig: z.object({
    MinExecutionEnvironments: z.number().int().min(0).max(15000).describe(
      "The minimum number of execution environments to maintain for the function.",
    ).optional(),
    MaxExecutionEnvironments: z.number().int().min(0).max(15000).describe(
      "The maximum number of execution environments that can be provisioned for the function.",
    ).optional(),
  }).describe(
    "Configuration that defines the scaling behavior for a Lambda Managed Instances function, including the minimum and maximum number of execution environments that can be provisioned.",
  ).optional(),
  Description: z.string().max(256).describe("A description of the function.")
    .optional(),
  TracingConfig: z.object({
    Mode: z.enum(["Active", "PassThrough"]).describe("The tracing mode.")
      .optional(),
  }).describe(
    "Set Mode to Active to sample and trace a subset of incoming requests with [X-Ray](https://docs.aws.amazon.com/lambda/latest/dg/services-xray.html).",
  ).optional(),
  VpcConfig: z.object({
    Ipv6AllowedForDualStack: z.boolean().describe(
      "Allows outbound IPv6 traffic on VPC functions that are connected to dual-stack subnets.",
    ).optional(),
    SecurityGroupIds: z.array(z.string()).describe(
      "A list of VPC security group IDs.",
    ).optional(),
    SubnetIds: z.array(z.string()).describe("A list of VPC subnet IDs.")
      .optional(),
  }).describe(
    "For network connectivity to AWS resources in a VPC, specify a list of security groups and subnets in the VPC. When you connect a function to a VPC, it can access resources and the internet only through that VPC. For more information, see [Configuring a Lambda function to access resources in a VPC](https://docs.aws.amazon.com/lambda/latest/dg/configuration-vpc.html).",
  ).optional(),
  RuntimeManagementConfig: z.object({
    UpdateRuntimeOn: z.enum(["Auto", "FunctionUpdate", "Manual"]).describe(
      "Specify the runtime update mode. *Auto (default)* - Automatically update to the most recent and secure runtime version using a [Two-phase runtime version rollout](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-update.html#runtime-management-two-phase). This is the best choice for most customers to ensure they always benefit from runtime updates. *FunctionUpdate* - LAM updates the runtime of you function to the most recent and secure runtime version when you update your function. This approach synchronizes runtime updates with function deployments, giving you control over when runtime updates are applied and allowing you to detect and mitigate rare runtime update incompatibilities early. When using this setting, you need to regularly update your functions to keep their runtime up-to-date. *Manual* - You specify a runtime version in your function configuration. The function will use this runtime version indefinitely. In the rare case where a new runtime version is incompatible with an existing function, this allows you to roll back your function to an earlier runtime version. For more information, see [Roll back a runtime version](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-update.html#runtime-management-rollback). *Valid Values*: Auto | FunctionUpdate | Manual",
    ),
    RuntimeVersionArn: z.string().describe(
      "The ARN of the runtime version you want the function to use. This is only required if you're using the *Manual* runtime update mode.",
    ).optional(),
  }).describe(
    "Sets the runtime management configuration for a function's version. For more information, see [Runtime updates](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-update.html).",
  ).optional(),
  DurableConfig: z.object({
    ExecutionTimeout: z.number().int().min(1).max(31622400).describe(
      "The maximum time (in seconds) that a durable execution can run before timing out. This timeout applies to the entire durable execution, not individual function invocations.",
    ),
    RetentionPeriodInDays: z.number().int().min(1).max(90).describe(
      "The number of days to retain execution history after a durable execution completes. After this period, execution history is no longer available through the GetDurableExecutionHistory API.",
    ).optional(),
  }).describe(
    "Configuration settings for [durable functions](https://docs.aws.amazon.com/lambda/latest/dg/durable-functions.html), including execution timeout and retention period for execution history.",
  ).optional(),
  ReservedConcurrentExecutions: z.number().int().min(0).describe(
    "The number of simultaneous executions to reserve for the function.",
  ).optional(),
  FileSystemConfigs: z.array(FileSystemConfigSchema).describe(
    "Connection settings for an Amazon EFS or Amazon S3 Files file system. To connect a function to a file system, a mount target must be available in every Availability Zone that your function connects to. If your template contains an [AWS::EFS::MountTarget](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-efs-mounttarget.html) or [AWS::S3Files::MountTarget](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-s3files-mounttarget.html) resource, you must also specify a DependsOn attribute to ensure that the mount target is created or updated before the function. For more information about using the DependsOn attribute, see [DependsOn Attribute](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-dependson.html).",
  ).optional(),
  FunctionName: z.string().min(1).describe(
    "The name of the Lambda function, up to 64 characters in length. If you don't specify a name, CFN generates one. If you specify a name, you cannot perform updates that require replacement of this resource. You can perform updates that require no or some interruption. If you must replace the resource, specify a new name.",
  ).optional(),
  Runtime: z.string().describe(
    "The identifier of the function's [runtime](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html). Runtime is required if the deployment package is a.zip file archive. Specifying a runtime results in an error if you're deploying a function using a container image. The following list includes deprecated runtimes. Lambda blocks creating new functions and updating existing functions shortly after each runtime is deprecated. For more information, see [Runtime use after deprecation](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html#runtime-deprecation-levels). For a list of all currently supported runtimes, see [Supported runtimes](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html#runtimes-supported).",
  ).optional(),
  KmsKeyArn: z.string().regex(
    new RegExp("^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$"),
  ).describe(
    "The ARN of the KMSlong (KMS) customer managed key that's used to encrypt the following resources: The function's [environment variables](https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html#configuration-envvars-encryption). The function's [Lambda SnapStart](https://docs.aws.amazon.com/lambda/latest/dg/snapstart-security.html) snapshots. When used with SourceKMSKeyArn, the unzipped version of the.zip deployment package that's used for function invocations. For more information, see [Specifying a customer managed key for Lambda](https://docs.aws.amazon.com/lambda/latest/dg/encrypt-zip-package.html#enable-zip-custom-encryption). The optimized version of the container image that's used for function invocations. Note that this is not the same key that's used to protect your container image in the Amazon Elastic Container Registry (Amazon ECR). For more information, see [Function lifecycle](https://docs.aws.amazon.com/lambda/latest/dg/images-create.html#images-lifecycle). If you don't provide a customer managed key, Lambda uses an [owned key](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#aws-owned-cmk) or an [](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#aws-managed-cmk).",
  ).optional(),
  PublishToLatestPublished: z.boolean().optional(),
  PackageType: z.enum(["Image", "Zip"]).describe(
    "The type of deployment package. Set to Image for container image and set Zip for.zip file archive.",
  ).optional(),
  CodeSigningConfigArn: z.string().regex(
    new RegExp(
      "arn:(aws[a-zA-Z-]*)?:lambda:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:\\d{12}:code-signing-config:csc-[a-z0-9]{17}",
    ),
  ).describe(
    "To enable code signing for this function, specify the ARN of a code-signing configuration. A code-signing configuration includes a set of signing profiles, which define the trusted publishers for this function.",
  ).optional(),
  Layers: z.array(z.string()).describe(
    "A list of [function layers](https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html) to add to the function's execution environment. Specify each layer by its ARN, including the version.",
  ).optional(),
  TenancyConfig: z.object({
    TenantIsolationMode: z.enum(["PER_TENANT"]).describe(
      "Tenant isolation mode allows for invocation to be sent to a corresponding execution environment dedicated to a specific tenant ID.",
    ),
  }).describe(
    "The function's tenant isolation configuration settings. Determines whether the Lambda function runs on a shared or dedicated infrastructure per unique tenant.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of [tags](https://docs.aws.amazon.com/lambda/latest/dg/tagging.html) to apply to the function. You must have the lambda:TagResource, lambda:UntagResource, and lambda:ListTags permissions for your [principal](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_terms-and-concepts.html) to manage the CFN stack. If you don't have these permissions, there might be unexpected behavior with stack-level tags propagating to the resource during resource creation and update.",
  ).optional(),
  ImageConfig: z.object({
    WorkingDirectory: z.string().describe(
      "Specifies the working directory. The length of the directory string cannot exceed 1,000 characters.",
    ).optional(),
    Command: z.array(z.string()).describe(
      "Specifies parameters that you want to pass in with ENTRYPOINT. You can specify a maximum of 1,500 parameters in the list.",
    ).optional(),
    EntryPoint: z.array(z.string()).describe(
      "Specifies the entry point to their application, which is typically the location of the runtime executable. You can specify a maximum of 1,500 string entries in the list.",
    ).optional(),
  }).describe(
    "Configuration values that override the container image Dockerfile settings. For more information, see [Container image settings](https://docs.aws.amazon.com/lambda/latest/dg/images-create.html#images-parms).",
  ).optional(),
  MemorySize: z.number().int().describe(
    "The amount of [memory available to the function](https://docs.aws.amazon.com/lambda/latest/dg/configuration-function-common.html#configuration-memory-console) at runtime. Increasing the function memory also increases its CPU allocation. The default value is 128 MB. The value can be any multiple of 1 MB. Note that new AWS accounts have reduced concurrency and memory quotas. AWS raises these quotas automatically based on your usage. You can also request a quota increase.",
  ).optional(),
  DeadLetterConfig: z.object({
    TargetArn: z.string().regex(
      new RegExp("^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$"),
    ).describe(
      "The Amazon Resource Name (ARN) of an Amazon SQS queue or Amazon SNS topic.",
    ).optional(),
  }).describe(
    "A dead-letter queue configuration that specifies the queue or topic where Lambda sends asynchronous events when they fail processing. For more information, see [Dead-letter queues](https://docs.aws.amazon.com/lambda/latest/dg/invocation-async.html#invocation-dlq).",
  ).optional(),
  Timeout: z.number().int().min(1).describe(
    "The amount of time (in seconds) that Lambda allows a function to run before stopping it. The default is 3 seconds. The maximum allowed value is 900 seconds. For more information, see [Lambda execution environment](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-context.html).",
  ).optional(),
  CapacityProviderConfig: z.object({
    LambdaManagedInstancesCapacityProviderConfig:
      LambdaManagedInstancesCapacityProviderConfigSchema.describe(
        "Configuration for Lambda-managed instances used by the capacity provider.",
      ),
  }).describe(
    "Configuration for the capacity provider that manages compute resources for Lambda functions.",
  ).optional(),
  Handler: z.string().max(128).regex(new RegExp("^[^\\s]+$")).describe(
    "The name of the method within your code that Lambda calls to run your function. Handler is required if the deployment package is a.zip file archive. The format includes the file name. It can also include namespaces and other qualifiers, depending on the runtime. For more information, see [Lambda programming model](https://docs.aws.amazon.com/lambda/latest/dg/foundation-progmodel.html).",
  ).optional(),
  Code: z.object({
    SourceKMSKeyArn: z.string().regex(
      new RegExp("^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$"),
    ).describe(
      "The ARN of the KMSlong (KMS) customer managed key that's used to encrypt your function's.zip deployment package. If you don't provide a customer managed key, Lambda uses an [owned key](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#aws-owned-cmk).",
    ).optional(),
    S3ObjectVersion: z.string().min(1).max(1024).describe(
      "For versioned objects, the version of the deployment package object to use.",
    ).optional(),
    S3Bucket: z.string().min(3).max(63).regex(
      new RegExp("^[0-9A-Za-z\\.\\-_]*(?<!\\.)$"),
    ).describe(
      "An Amazon S3 bucket in the same AWS-Region as your function. The bucket can be in a different AWS-account.",
    ).optional(),
    ZipFile: z.string().describe(
      "(Node.js and Python) The source code of your Lambda function. If you include your function source inline with this parameter, CFN places it in a file named index and zips it to create a [deployment package](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-package.html). This zip file cannot exceed 4MB. For the Handler property, the first part of the handler identifier must be index. For example, index.handler. When you specify source code inline for a Node.js function, the index file that CFN creates uses the extension.js. This means that Node.js treats the file as a CommonJS module. When using Node.js 24 or later, Node.js can automatically detect if a.js file should be treated as CommonJS or as an ES module. To enable auto-detection, add the --experimental-detect-module flag to the NODE_OPTIONS environment variable. For more information, see [Experimental Node.js features](https://docs.aws.amazon.com//lambda/latest/dg/lambda-nodejs.html#nodejs-experimental-features). For JSON, you must escape quotes and special characters such as newline ( \\n) with a backslash. If you specify a function that interacts with an AWS CloudFormation custom resource, you don't have to write your own functions to send responses to the custom resource that invoked the function. AWS CloudFormation provides a response module ([cfn-response](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-lambda-function-code-cfnresponsemodule.html)) that simplifies sending responses. See [Using Lambda with CloudFormation](https://docs.aws.amazon.com/lambda/latest/dg/services-cloudformation.html) for details.",
    ).optional(),
    S3Key: z.string().min(1).max(1024).describe(
      "The Amazon S3 key of the deployment package.",
    ).optional(),
    ImageUri: z.string().describe(
      "URI of a [container image](https://docs.aws.amazon.com/lambda/latest/dg/lambda-images.html) in the Amazon ECR registry.",
    ).optional(),
  }).describe(
    "The code for the function. You can define your function code in multiple ways: For.zip deployment packages, you can specify the S3 location of the.zip file in the S3Bucket, S3Key, and S3ObjectVersion properties. For.zip deployment packages, you can alternatively define the function code inline in the ZipFile property. This method works only for Node.js and Python functions. For container images, specify the URI of your container image in the ECR registry in the ImageUri property.",
  ),
  Role: z.string().regex(
    new RegExp(
      "^arn:(aws[a-zA-Z-]*)?:iam::\\d{12}:role/?[a-zA-Z_0-9+=,.@\\-_/]+$",
    ),
  ).describe(
    "The Amazon Resource Name (ARN) of the function's execution role.",
  ),
  LoggingConfig: z.object({
    LogFormat: z.enum(["Text", "JSON"]).describe(
      "The format in which Lambda sends your function's application and system logs to CloudWatch. Select between plain text and structured JSON.",
    ).optional(),
    ApplicationLogLevel: z.enum([
      "TRACE",
      "DEBUG",
      "INFO",
      "WARN",
      "ERROR",
      "FATAL",
    ]).describe(
      "Set this property to filter the application logs for your function that Lambda sends to CloudWatch. Lambda only sends application logs at the selected level of detail and lower, where TRACE is the highest level and FATAL is the lowest.",
    ).optional(),
    LogGroup: z.string().min(1).max(512).regex(
      new RegExp("[\\.\\-_/#A-Za-z0-9]+"),
    ).describe(
      "The name of the Amazon CloudWatch log group the function sends logs to. By default, Lambda functions send logs to a default log group named /aws/lambda/. To use a different log group, enter an existing log group or enter a new log group name.",
    ).optional(),
    SystemLogLevel: z.enum(["DEBUG", "INFO", "WARN"]).describe(
      "Set this property to filter the system logs for your function that Lambda sends to CloudWatch. Lambda only sends system logs at the selected level of detail and lower, where DEBUG is the highest level and WARN is the lowest.",
    ).optional(),
  }).describe("The function's Amazon CloudWatch Logs configuration settings.")
    .optional(),
  RecursiveLoop: z.enum(["Allow", "Terminate"]).describe(
    "The status of your function's recursive loop detection configuration. When this value is set to Allow and Lambda detects your function being invoked as part of a recursive loop, it doesn't take any action. When this value is set to Terminate and Lambda detects your function being invoked as part of a recursive loop, it stops your function being invoked and notifies you.",
  ).optional(),
  Environment: z.object({
    Variables: z.record(z.string(), z.string()).describe(
      "Environment variable key-value pairs. For more information, see [Using Lambda environment variables](https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html). If the value of the environment variable is a time or a duration, enclose the value in quotes.",
    ).optional(),
  }).describe(
    "Environment variables that are accessible from function code during execution.",
  ).optional(),
  EphemeralStorage: z.object({
    Size: z.number().int().min(512).max(10240).describe(
      "The size of the function's /tmp directory.",
    ),
  }).describe(
    "The size of the function's /tmp directory in MB. The default value is 512, but it can be any whole number between 512 and 10,240 MB.",
  ).optional(),
  Architectures: z.array(z.enum(["x86_64", "arm64"])).describe(
    "The instruction set architecture that the function supports. Enter a string array with one of the valid values (arm64 or x86_64). The default value is x86_64.",
  ).optional(),
});

const StateSchema = z.object({
  FunctionScalingConfig: z.object({
    MinExecutionEnvironments: z.number(),
    MaxExecutionEnvironments: z.number(),
  }).optional(),
  Description: z.string().optional(),
  TracingConfig: z.object({
    Mode: z.string(),
  }).optional(),
  VpcConfig: z.object({
    Ipv6AllowedForDualStack: z.boolean(),
    SecurityGroupIds: z.array(z.string()),
    SubnetIds: z.array(z.string()),
  }).optional(),
  RuntimeManagementConfig: z.object({
    UpdateRuntimeOn: z.string(),
    RuntimeVersionArn: z.string(),
  }).optional(),
  DurableConfig: z.object({
    ExecutionTimeout: z.number(),
    RetentionPeriodInDays: z.number(),
  }).optional(),
  ReservedConcurrentExecutions: z.number().optional(),
  SnapStart: z.object({
    ApplyOn: z.string(),
  }).optional(),
  FileSystemConfigs: z.array(FileSystemConfigSchema).optional(),
  FunctionName: z.string(),
  Runtime: z.string().optional(),
  KmsKeyArn: z.string().optional(),
  PublishToLatestPublished: z.boolean().optional(),
  PackageType: z.string().optional(),
  CodeSigningConfigArn: z.string().optional(),
  Layers: z.array(z.string()).optional(),
  TenancyConfig: z.object({
    TenantIsolationMode: z.string(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
  ImageConfig: z.object({
    WorkingDirectory: z.string(),
    Command: z.array(z.string()),
    EntryPoint: z.array(z.string()),
  }).optional(),
  MemorySize: z.number().optional(),
  DeadLetterConfig: z.object({
    TargetArn: z.string(),
  }).optional(),
  Timeout: z.number().optional(),
  CapacityProviderConfig: z.object({
    LambdaManagedInstancesCapacityProviderConfig:
      LambdaManagedInstancesCapacityProviderConfigSchema,
  }).optional(),
  Handler: z.string().optional(),
  SnapStartResponse: z.object({
    OptimizationStatus: z.string(),
    ApplyOn: z.string(),
  }).optional(),
  Code: z.object({
    SourceKMSKeyArn: z.string(),
    S3ObjectVersion: z.string(),
    S3Bucket: z.string(),
    ZipFile: z.string(),
    S3Key: z.string(),
    ImageUri: z.string(),
  }).optional(),
  Role: z.string().optional(),
  LoggingConfig: z.object({
    LogFormat: z.string(),
    ApplicationLogLevel: z.string(),
    LogGroup: z.string(),
    SystemLogLevel: z.string(),
  }).optional(),
  RecursiveLoop: z.string().optional(),
  Environment: z.object({
    Variables: z.record(z.string(), z.unknown()),
  }).optional(),
  Arn: z.string().optional(),
  EphemeralStorage: z.object({
    Size: z.number(),
  }).optional(),
  Architectures: z.array(z.string()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  FunctionScalingConfig: z.object({
    MinExecutionEnvironments: z.number().int().min(0).max(15000).describe(
      "The minimum number of execution environments to maintain for the function.",
    ).optional(),
    MaxExecutionEnvironments: z.number().int().min(0).max(15000).describe(
      "The maximum number of execution environments that can be provisioned for the function.",
    ).optional(),
  }).describe(
    "Configuration that defines the scaling behavior for a Lambda Managed Instances function, including the minimum and maximum number of execution environments that can be provisioned.",
  ).optional(),
  Description: z.string().max(256).describe("A description of the function.")
    .optional(),
  TracingConfig: z.object({
    Mode: z.enum(["Active", "PassThrough"]).describe("The tracing mode.")
      .optional(),
  }).describe(
    "Set Mode to Active to sample and trace a subset of incoming requests with [X-Ray](https://docs.aws.amazon.com/lambda/latest/dg/services-xray.html).",
  ).optional(),
  VpcConfig: z.object({
    Ipv6AllowedForDualStack: z.boolean().describe(
      "Allows outbound IPv6 traffic on VPC functions that are connected to dual-stack subnets.",
    ).optional(),
    SecurityGroupIds: z.array(z.string()).describe(
      "A list of VPC security group IDs.",
    ).optional(),
    SubnetIds: z.array(z.string()).describe("A list of VPC subnet IDs.")
      .optional(),
  }).describe(
    "For network connectivity to AWS resources in a VPC, specify a list of security groups and subnets in the VPC. When you connect a function to a VPC, it can access resources and the internet only through that VPC. For more information, see [Configuring a Lambda function to access resources in a VPC](https://docs.aws.amazon.com/lambda/latest/dg/configuration-vpc.html).",
  ).optional(),
  RuntimeManagementConfig: z.object({
    UpdateRuntimeOn: z.enum(["Auto", "FunctionUpdate", "Manual"]).describe(
      "Specify the runtime update mode. *Auto (default)* - Automatically update to the most recent and secure runtime version using a [Two-phase runtime version rollout](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-update.html#runtime-management-two-phase). This is the best choice for most customers to ensure they always benefit from runtime updates. *FunctionUpdate* - LAM updates the runtime of you function to the most recent and secure runtime version when you update your function. This approach synchronizes runtime updates with function deployments, giving you control over when runtime updates are applied and allowing you to detect and mitigate rare runtime update incompatibilities early. When using this setting, you need to regularly update your functions to keep their runtime up-to-date. *Manual* - You specify a runtime version in your function configuration. The function will use this runtime version indefinitely. In the rare case where a new runtime version is incompatible with an existing function, this allows you to roll back your function to an earlier runtime version. For more information, see [Roll back a runtime version](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-update.html#runtime-management-rollback). *Valid Values*: Auto | FunctionUpdate | Manual",
    ).optional(),
    RuntimeVersionArn: z.string().describe(
      "The ARN of the runtime version you want the function to use. This is only required if you're using the *Manual* runtime update mode.",
    ).optional(),
  }).describe(
    "Sets the runtime management configuration for a function's version. For more information, see [Runtime updates](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-update.html).",
  ).optional(),
  DurableConfig: z.object({
    ExecutionTimeout: z.number().int().min(1).max(31622400).describe(
      "The maximum time (in seconds) that a durable execution can run before timing out. This timeout applies to the entire durable execution, not individual function invocations.",
    ).optional(),
    RetentionPeriodInDays: z.number().int().min(1).max(90).describe(
      "The number of days to retain execution history after a durable execution completes. After this period, execution history is no longer available through the GetDurableExecutionHistory API.",
    ).optional(),
  }).describe(
    "Configuration settings for [durable functions](https://docs.aws.amazon.com/lambda/latest/dg/durable-functions.html), including execution timeout and retention period for execution history.",
  ).optional(),
  ReservedConcurrentExecutions: z.number().int().min(0).describe(
    "The number of simultaneous executions to reserve for the function.",
  ).optional(),
  FileSystemConfigs: z.array(FileSystemConfigSchema).describe(
    "Connection settings for an Amazon EFS or Amazon S3 Files file system. To connect a function to a file system, a mount target must be available in every Availability Zone that your function connects to. If your template contains an [AWS::EFS::MountTarget](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-efs-mounttarget.html) or [AWS::S3Files::MountTarget](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-s3files-mounttarget.html) resource, you must also specify a DependsOn attribute to ensure that the mount target is created or updated before the function. For more information about using the DependsOn attribute, see [DependsOn Attribute](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-dependson.html).",
  ).optional(),
  FunctionName: z.string().min(1).describe(
    "The name of the Lambda function, up to 64 characters in length. If you don't specify a name, CFN generates one. If you specify a name, you cannot perform updates that require replacement of this resource. You can perform updates that require no or some interruption. If you must replace the resource, specify a new name.",
  ).optional(),
  Runtime: z.string().describe(
    "The identifier of the function's [runtime](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html). Runtime is required if the deployment package is a.zip file archive. Specifying a runtime results in an error if you're deploying a function using a container image. The following list includes deprecated runtimes. Lambda blocks creating new functions and updating existing functions shortly after each runtime is deprecated. For more information, see [Runtime use after deprecation](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html#runtime-deprecation-levels). For a list of all currently supported runtimes, see [Supported runtimes](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html#runtimes-supported).",
  ).optional(),
  KmsKeyArn: z.string().regex(
    new RegExp("^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$"),
  ).describe(
    "The ARN of the KMSlong (KMS) customer managed key that's used to encrypt the following resources: The function's [environment variables](https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html#configuration-envvars-encryption). The function's [Lambda SnapStart](https://docs.aws.amazon.com/lambda/latest/dg/snapstart-security.html) snapshots. When used with SourceKMSKeyArn, the unzipped version of the.zip deployment package that's used for function invocations. For more information, see [Specifying a customer managed key for Lambda](https://docs.aws.amazon.com/lambda/latest/dg/encrypt-zip-package.html#enable-zip-custom-encryption). The optimized version of the container image that's used for function invocations. Note that this is not the same key that's used to protect your container image in the Amazon Elastic Container Registry (Amazon ECR). For more information, see [Function lifecycle](https://docs.aws.amazon.com/lambda/latest/dg/images-create.html#images-lifecycle). If you don't provide a customer managed key, Lambda uses an [owned key](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#aws-owned-cmk) or an [](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#aws-managed-cmk).",
  ).optional(),
  PublishToLatestPublished: z.boolean().optional(),
  PackageType: z.enum(["Image", "Zip"]).describe(
    "The type of deployment package. Set to Image for container image and set Zip for.zip file archive.",
  ).optional(),
  CodeSigningConfigArn: z.string().regex(
    new RegExp(
      "arn:(aws[a-zA-Z-]*)?:lambda:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:\\d{12}:code-signing-config:csc-[a-z0-9]{17}",
    ),
  ).describe(
    "To enable code signing for this function, specify the ARN of a code-signing configuration. A code-signing configuration includes a set of signing profiles, which define the trusted publishers for this function.",
  ).optional(),
  Layers: z.array(z.string()).describe(
    "A list of [function layers](https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html) to add to the function's execution environment. Specify each layer by its ARN, including the version.",
  ).optional(),
  TenancyConfig: z.object({
    TenantIsolationMode: z.enum(["PER_TENANT"]).describe(
      "Tenant isolation mode allows for invocation to be sent to a corresponding execution environment dedicated to a specific tenant ID.",
    ).optional(),
  }).describe(
    "The function's tenant isolation configuration settings. Determines whether the Lambda function runs on a shared or dedicated infrastructure per unique tenant.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of [tags](https://docs.aws.amazon.com/lambda/latest/dg/tagging.html) to apply to the function. You must have the lambda:TagResource, lambda:UntagResource, and lambda:ListTags permissions for your [principal](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_terms-and-concepts.html) to manage the CFN stack. If you don't have these permissions, there might be unexpected behavior with stack-level tags propagating to the resource during resource creation and update.",
  ).optional(),
  ImageConfig: z.object({
    WorkingDirectory: z.string().describe(
      "Specifies the working directory. The length of the directory string cannot exceed 1,000 characters.",
    ).optional(),
    Command: z.array(z.string()).describe(
      "Specifies parameters that you want to pass in with ENTRYPOINT. You can specify a maximum of 1,500 parameters in the list.",
    ).optional(),
    EntryPoint: z.array(z.string()).describe(
      "Specifies the entry point to their application, which is typically the location of the runtime executable. You can specify a maximum of 1,500 string entries in the list.",
    ).optional(),
  }).describe(
    "Configuration values that override the container image Dockerfile settings. For more information, see [Container image settings](https://docs.aws.amazon.com/lambda/latest/dg/images-create.html#images-parms).",
  ).optional(),
  MemorySize: z.number().int().describe(
    "The amount of [memory available to the function](https://docs.aws.amazon.com/lambda/latest/dg/configuration-function-common.html#configuration-memory-console) at runtime. Increasing the function memory also increases its CPU allocation. The default value is 128 MB. The value can be any multiple of 1 MB. Note that new AWS accounts have reduced concurrency and memory quotas. AWS raises these quotas automatically based on your usage. You can also request a quota increase.",
  ).optional(),
  DeadLetterConfig: z.object({
    TargetArn: z.string().regex(
      new RegExp("^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$"),
    ).describe(
      "The Amazon Resource Name (ARN) of an Amazon SQS queue or Amazon SNS topic.",
    ).optional(),
  }).describe(
    "A dead-letter queue configuration that specifies the queue or topic where Lambda sends asynchronous events when they fail processing. For more information, see [Dead-letter queues](https://docs.aws.amazon.com/lambda/latest/dg/invocation-async.html#invocation-dlq).",
  ).optional(),
  Timeout: z.number().int().min(1).describe(
    "The amount of time (in seconds) that Lambda allows a function to run before stopping it. The default is 3 seconds. The maximum allowed value is 900 seconds. For more information, see [Lambda execution environment](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-context.html).",
  ).optional(),
  CapacityProviderConfig: z.object({
    LambdaManagedInstancesCapacityProviderConfig:
      LambdaManagedInstancesCapacityProviderConfigSchema.describe(
        "Configuration for Lambda-managed instances used by the capacity provider.",
      ).optional(),
  }).describe(
    "Configuration for the capacity provider that manages compute resources for Lambda functions.",
  ).optional(),
  Handler: z.string().max(128).regex(new RegExp("^[^\\s]+$")).describe(
    "The name of the method within your code that Lambda calls to run your function. Handler is required if the deployment package is a.zip file archive. The format includes the file name. It can also include namespaces and other qualifiers, depending on the runtime. For more information, see [Lambda programming model](https://docs.aws.amazon.com/lambda/latest/dg/foundation-progmodel.html).",
  ).optional(),
  Code: z.object({
    SourceKMSKeyArn: z.string().regex(
      new RegExp("^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$"),
    ).describe(
      "The ARN of the KMSlong (KMS) customer managed key that's used to encrypt your function's.zip deployment package. If you don't provide a customer managed key, Lambda uses an [owned key](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#aws-owned-cmk).",
    ).optional(),
    S3ObjectVersion: z.string().min(1).max(1024).describe(
      "For versioned objects, the version of the deployment package object to use.",
    ).optional(),
    S3Bucket: z.string().min(3).max(63).regex(
      new RegExp("^[0-9A-Za-z\\.\\-_]*(?<!\\.)$"),
    ).describe(
      "An Amazon S3 bucket in the same AWS-Region as your function. The bucket can be in a different AWS-account.",
    ).optional(),
    ZipFile: z.string().describe(
      "(Node.js and Python) The source code of your Lambda function. If you include your function source inline with this parameter, CFN places it in a file named index and zips it to create a [deployment package](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-package.html). This zip file cannot exceed 4MB. For the Handler property, the first part of the handler identifier must be index. For example, index.handler. When you specify source code inline for a Node.js function, the index file that CFN creates uses the extension.js. This means that Node.js treats the file as a CommonJS module. When using Node.js 24 or later, Node.js can automatically detect if a.js file should be treated as CommonJS or as an ES module. To enable auto-detection, add the --experimental-detect-module flag to the NODE_OPTIONS environment variable. For more information, see [Experimental Node.js features](https://docs.aws.amazon.com//lambda/latest/dg/lambda-nodejs.html#nodejs-experimental-features). For JSON, you must escape quotes and special characters such as newline ( \\n) with a backslash. If you specify a function that interacts with an AWS CloudFormation custom resource, you don't have to write your own functions to send responses to the custom resource that invoked the function. AWS CloudFormation provides a response module ([cfn-response](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-lambda-function-code-cfnresponsemodule.html)) that simplifies sending responses. See [Using Lambda with CloudFormation](https://docs.aws.amazon.com/lambda/latest/dg/services-cloudformation.html) for details.",
    ).optional(),
    S3Key: z.string().min(1).max(1024).describe(
      "The Amazon S3 key of the deployment package.",
    ).optional(),
    ImageUri: z.string().describe(
      "URI of a [container image](https://docs.aws.amazon.com/lambda/latest/dg/lambda-images.html) in the Amazon ECR registry.",
    ).optional(),
  }).describe(
    "The code for the function. You can define your function code in multiple ways: For.zip deployment packages, you can specify the S3 location of the.zip file in the S3Bucket, S3Key, and S3ObjectVersion properties. For.zip deployment packages, you can alternatively define the function code inline in the ZipFile property. This method works only for Node.js and Python functions. For container images, specify the URI of your container image in the ECR registry in the ImageUri property.",
  ).optional(),
  Role: z.string().regex(
    new RegExp(
      "^arn:(aws[a-zA-Z-]*)?:iam::\\d{12}:role/?[a-zA-Z_0-9+=,.@\\-_/]+$",
    ),
  ).describe("The Amazon Resource Name (ARN) of the function's execution role.")
    .optional(),
  LoggingConfig: z.object({
    LogFormat: z.enum(["Text", "JSON"]).describe(
      "The format in which Lambda sends your function's application and system logs to CloudWatch. Select between plain text and structured JSON.",
    ).optional(),
    ApplicationLogLevel: z.enum([
      "TRACE",
      "DEBUG",
      "INFO",
      "WARN",
      "ERROR",
      "FATAL",
    ]).describe(
      "Set this property to filter the application logs for your function that Lambda sends to CloudWatch. Lambda only sends application logs at the selected level of detail and lower, where TRACE is the highest level and FATAL is the lowest.",
    ).optional(),
    LogGroup: z.string().min(1).max(512).regex(
      new RegExp("[\\.\\-_/#A-Za-z0-9]+"),
    ).describe(
      "The name of the Amazon CloudWatch log group the function sends logs to. By default, Lambda functions send logs to a default log group named /aws/lambda/. To use a different log group, enter an existing log group or enter a new log group name.",
    ).optional(),
    SystemLogLevel: z.enum(["DEBUG", "INFO", "WARN"]).describe(
      "Set this property to filter the system logs for your function that Lambda sends to CloudWatch. Lambda only sends system logs at the selected level of detail and lower, where DEBUG is the highest level and WARN is the lowest.",
    ).optional(),
  }).describe("The function's Amazon CloudWatch Logs configuration settings.")
    .optional(),
  RecursiveLoop: z.enum(["Allow", "Terminate"]).describe(
    "The status of your function's recursive loop detection configuration. When this value is set to Allow and Lambda detects your function being invoked as part of a recursive loop, it doesn't take any action. When this value is set to Terminate and Lambda detects your function being invoked as part of a recursive loop, it stops your function being invoked and notifies you.",
  ).optional(),
  Environment: z.object({
    Variables: z.record(z.string(), z.string()).describe(
      "Environment variable key-value pairs. For more information, see [Using Lambda environment variables](https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html). If the value of the environment variable is a time or a duration, enclose the value in quotes.",
    ).optional(),
  }).describe(
    "Environment variables that are accessible from function code during execution.",
  ).optional(),
  EphemeralStorage: z.object({
    Size: z.number().int().min(512).max(10240).describe(
      "The size of the function's /tmp directory.",
    ).optional(),
  }).describe(
    "The size of the function's /tmp directory in MB. The default value is 512, but it can be any whole number between 512 and 10,240 MB.",
  ).optional(),
  Architectures: z.array(z.enum(["x86_64", "arm64"])).describe(
    "The instruction set architecture that the function supports. Enter a string array with one of the valid values (arm64 or x86_64). The default value is x86_64.",
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

/** Swamp extension model for Lambda Function. Registered at `@swamp/aws/lambda/function`. */
export const model = {
  type: "@swamp/aws/lambda/function",
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
      toVersion: "2026.04.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.09.1",
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
      toVersion: "2026.05.31.1",
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
      description: "Lambda Function resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Lambda Function",
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
          "AWS::Lambda::Function",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.FunctionName ?? g.FunctionName)?.toString() ?? "current")
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
      description: "Get a Lambda Function",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Lambda Function",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Lambda::Function",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.FunctionName ?? context.globalArgs.FunctionName)
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
      description: "Update a Lambda Function",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.FunctionName?.toString() ?? "current").replace(
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
        const identifier = existing.FunctionName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Lambda::Function",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Lambda::Function",
          identifier,
          currentState,
          desiredState,
          ["FunctionName", "PackageType", "TenancyConfig"],
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
      description: "Delete a Lambda Function",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Lambda Function",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Lambda::Function",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.FunctionName?.toString() ?? args.identifier)
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
      description: "Sync Lambda Function state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.FunctionName?.toString() ?? "current").replace(
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
        const identifier = existing.FunctionName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Lambda::Function",
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
