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

// Auto-generated extension model for @swamp/aws/cloudformation/stack-set
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for CloudFormation StackSet (AWS::CloudFormation::StackSet).
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
  type CallAs,
  CloudFormationClient,
  DescribeStackSetOperationCommand,
  DetectStackSetDriftCommand,
  ListStackInstancesCommand,
  ListStackSetOperationsCommand,
  type StackInstanceFilter,
} from "npm:@aws-sdk/client-cloudformation@3.1021.0";

const DeploymentTargetsSchema = z.object({
  Accounts: z.array(z.string().regex(new RegExp("^[0-9]{12}$"))).describe(
    "AWS accounts that you want to create stack instances in the specified Region(s) for.",
  ).optional(),
  AccountsUrl: z.string().min(1).max(5120).regex(
    new RegExp("(s3://|http(s?)://).+"),
  ).describe("Returns the value of the AccountsUrl property.").optional(),
  OrganizationalUnitIds: z.array(
    z.string().regex(
      new RegExp("^(ou-[a-z0-9]{4,32}-[a-z0-9]{8,32}|r-[a-z0-9]{4,32})$"),
    ),
  ).describe(
    "The organization root ID or organizational unit (OU) IDs to which StackSets deploys.",
  ).optional(),
  AccountFilterType: z.enum(["NONE", "UNION", "INTERSECTION", "DIFFERENCE"])
    .describe(
      "The filter type you want to apply on organizational units and accounts.",
    ).optional(),
});

const ParameterSchema = z.object({
  ParameterKey: z.string().describe(
    "The key associated with the parameter. If you don't specify a key and value for a particular parameter, AWS CloudFormation uses the default value that is specified in your template.",
  ),
  ParameterValue: z.string().describe(
    "The input value associated with the parameter.",
  ),
});

const StackInstancesSchema = z.object({
  DeploymentTargets: DeploymentTargetsSchema.describe(
    "The AWS OrganizationalUnitIds or Accounts for which to create stack instances in the specified Regions.",
  ),
  Regions: z.array(z.string().regex(new RegExp("^[a-zA-Z0-9-]{1,128}$")))
    .describe(
      "The names of one or more Regions where you want to create stack instances using the specified AWS account(s).",
    ),
  ParameterOverrides: z.array(ParameterSchema).describe(
    "A list of stack set parameters whose values you want to override in the selected stack instances.",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^(?!aws:.*)[a-zA-Z0-9\\s\\:\\_\\.\\/\\=\\+\\-]+$"),
  ).describe(
    "A string used to identify this tag. You can specify a maximum of 127 characters for a tag key.",
  ),
  Value: z.string().min(1).max(256).describe(
    "A string containing the value for this tag. You can specify a maximum of 256 characters for a tag value.",
  ),
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
  StackSetName: z.string().max(128).regex(
    new RegExp("^[a-zA-Z][a-zA-Z0-9\\-]{0,127}$"),
  ).describe(
    "The name to associate with the stack set. The name must be unique in the Region where you create your stack set.",
  ),
  AdministrationRoleARN: z.string().min(20).max(2048).describe(
    "The Amazon Resource Number (ARN) of the IAM role to use to create this stack set. Specify an IAM role only if you are using customized administrator roles to control which users or groups can manage specific stack sets within the same administrator account.",
  ).optional(),
  AutoDeployment: z.object({
    Enabled: z.boolean().describe(
      "If set to true, StackSets automatically deploys additional stack instances to AWS Organizations accounts that are added to a target organization or organizational unit (OU) in the specified Regions. If an account is removed from a target organization or OU, StackSets deletes stack instances from the account in the specified Regions.",
    ).optional(),
    RetainStacksOnAccountRemoval: z.boolean().describe(
      "If set to true, stack resources are retained when an account is removed from a target organization or OU. If set to false, stack resources are deleted. Specify only if Enabled is set to True.",
    ).optional(),
    DependsOn: z.array(z.string()).describe(
      "A list of StackSet ARNs that this StackSet depends on for auto-deployment operations. When auto-deployment is triggered, operations will be sequenced to ensure all dependencies complete successfully before this StackSet's operation begins.",
    ).optional(),
  }).describe(
    "Describes whether StackSets automatically deploys to AWS Organizations accounts that are added to the target organization or organizational unit (OU). Specify only if PermissionModel is SERVICE_MANAGED.",
  ).optional(),
  Capabilities: z.array(
    z.enum([
      "CAPABILITY_IAM",
      "CAPABILITY_NAMED_IAM",
      "CAPABILITY_AUTO_EXPAND",
    ]),
  ).describe(
    "In some cases, you must explicitly acknowledge that your stack set template contains certain capabilities in order for AWS CloudFormation to create the stack set and related stack instances.",
  ).optional(),
  Description: z.string().min(1).max(1024).describe(
    "A description of the stack set. You can use the description to identify the stack set's purpose or other important information.",
  ).optional(),
  ExecutionRoleName: z.string().min(1).max(64).describe(
    "The name of the IAM execution role to use to create the stack set. If you do not specify an execution role, AWS CloudFormation uses the AWSCloudFormationStackSetExecutionRole role for the stack set operation.",
  ).optional(),
  OperationPreferences: z.object({
    FailureToleranceCount: z.number().int().min(0).optional(),
    FailureTolerancePercentage: z.number().int().min(0).max(100).optional(),
    MaxConcurrentCount: z.number().int().min(1).optional(),
    MaxConcurrentPercentage: z.number().int().min(0).max(100).optional(),
    RegionOrder: z.array(z.string().regex(new RegExp("^[a-zA-Z0-9-]{1,128}$")))
      .optional(),
    RegionConcurrencyType: z.enum(["SEQUENTIAL", "PARALLEL"]).describe(
      "The concurrency type of deploying StackSets operations in regions, could be in parallel or one region at a time",
    ).optional(),
    ConcurrencyMode: z.enum([
      "STRICT_FAILURE_TOLERANCE",
      "SOFT_FAILURE_TOLERANCE",
    ]).describe(
      "Specifies how the concurrency level behaves during the operation execution.",
    ).optional(),
  }).describe(
    "The user-specified preferences for how AWS CloudFormation performs a stack set operation.",
  ).optional(),
  StackInstancesGroup: z.array(StackInstancesSchema).describe(
    "A group of stack instances with parameters in some specific accounts and regions.",
  ).optional(),
  Parameters: z.array(ParameterSchema).describe(
    "The input parameters for the stack set template.",
  ).optional(),
  PermissionModel: z.enum(["SERVICE_MANAGED", "SELF_MANAGED"]).describe(
    "Describes how the IAM roles required for stack set operations are created. By default, SELF-MANAGED is specified.",
  ),
  Tags: z.array(TagSchema).describe(
    "The key-value pairs to associate with this stack set and the stacks created from it. AWS CloudFormation also propagates these tags to supported resources that are created in the stacks. A maximum number of 50 tags can be specified.",
  ).optional(),
  TemplateBody: z.string().min(1).max(51200).describe(
    "The structure that contains the template body, with a minimum length of 1 byte and a maximum length of 51,200 bytes.",
  ).optional(),
  TemplateURL: z.string().min(1).max(5120).describe(
    "Location of file containing the template body. The URL must point to a template (max size: 460,800 bytes) that is located in an Amazon S3 bucket.",
  ).optional(),
  CallAs: z.enum(["SELF", "DELEGATED_ADMIN"]).describe(
    "Specifies the AWS account that you are acting from. By default, SELF is specified. For self-managed permissions, specify SELF; for service-managed permissions, if you are signed in to the organization's management account, specify SELF. If you are signed in to a delegated administrator account, specify DELEGATED_ADMIN.",
  ).optional(),
  ManagedExecution: z.object({
    Active: z.boolean().describe(
      "When true, StackSets performs non-conflicting operations concurrently and queues conflicting operations. After conflicting operations finish, StackSets starts queued operations in request order.",
    ).optional(),
  }).describe(
    "Describes whether StackSets performs non-conflicting operations concurrently and queues conflicting operations.",
  ).optional(),
});

function createCfnClient(credentials: AwsCredentials): CloudFormationClient {
  const region = credentials.region ??
    Deno.env.get("AWS_REGION") ??
    Deno.env.get("AWS_DEFAULT_REGION") ??
    "us-east-1";

  const config: Record<string, unknown> = { region };

  if (credentials.accessKeyId && credentials.secretAccessKey) {
    config.credentials = {
      accessKeyId: credentials.accessKeyId,
      secretAccessKey: credentials.secretAccessKey,
      ...(credentials.sessionToken
        ? { sessionToken: credentials.sessionToken }
        : {}),
    };
  }

  return new CloudFormationClient(config);
}

async function listInstances(
  args: Record<string, unknown>,
  credentials: AwsCredentials,
): Promise<Record<string, unknown>[]> {
  const client = createCfnClient(credentials);
  const stackSetName = args.StackSetName as string;
  const callAs = args.callAs as CallAs | undefined;
  const filters = args.filters as StackInstanceFilter[] | undefined;
  const maxPages = (args.maxPages as number | undefined) ?? 10;

  const instances: Record<string, unknown>[] = [];
  let nextToken: string | undefined;
  let pages = 0;

  do {
    const command = new ListStackInstancesCommand({
      StackSetName: stackSetName,
      CallAs: callAs,
      Filters: filters,
      NextToken: nextToken,
      MaxResults: 100,
    });
    const response = await client.send(command);

    for (const instance of response.Summaries ?? []) {
      instances.push({
        Account: instance.Account,
        Region: instance.Region,
        Status: instance.Status,
        StatusReason: instance.StatusReason,
        StackInstanceStatus: instance.StackInstanceStatus
          ? {
            DetailedStatus: instance.StackInstanceStatus.DetailedStatus,
          }
          : undefined,
        DriftStatus: instance.DriftStatus,
        StackId: instance.StackId,
        OrganizationalUnitId: instance.OrganizationalUnitId,
        LastDriftCheckTimestamp: instance.LastDriftCheckTimestamp
          ?.toISOString(),
        LastOperationId: instance.LastOperationId,
      });
    }

    nextToken = response.NextToken;
    pages++;
  } while (nextToken && pages < maxPages);

  return instances;
}

async function listOperations(
  args: Record<string, unknown>,
  credentials: AwsCredentials,
): Promise<Record<string, unknown>[]> {
  const client = createCfnClient(credentials);
  const stackSetName = args.StackSetName as string;
  const callAs = args.callAs as CallAs | undefined;
  const maxPages = (args.maxPages as number | undefined) ?? 10;

  const operations: Record<string, unknown>[] = [];
  let nextToken: string | undefined;
  let pages = 0;

  do {
    const command = new ListStackSetOperationsCommand({
      StackSetName: stackSetName,
      CallAs: callAs,
      NextToken: nextToken,
      MaxResults: 100,
    });
    const response = await client.send(command);

    for (const op of response.Summaries ?? []) {
      operations.push({
        OperationId: op.OperationId,
        Action: op.Action,
        Status: op.Status,
        CreationTimestamp: op.CreationTimestamp?.toISOString(),
        EndTimestamp: op.EndTimestamp?.toISOString(),
        StatusReason: op.StatusReason,
        StatusDetails: op.StatusDetails
          ? {
            FailedStackInstancesCount:
              op.StatusDetails.FailedStackInstancesCount,
          }
          : undefined,
        OperationPreferences: op.OperationPreferences
          ? {
            RegionConcurrencyType:
              op.OperationPreferences.RegionConcurrencyType,
            MaxConcurrentCount: op.OperationPreferences.MaxConcurrentCount,
            MaxConcurrentPercentage:
              op.OperationPreferences.MaxConcurrentPercentage,
            FailureToleranceCount:
              op.OperationPreferences.FailureToleranceCount,
            FailureTolerancePercentage:
              op.OperationPreferences.FailureTolerancePercentage,
          }
          : undefined,
      });
    }

    nextToken = response.NextToken;
    pages++;
  } while (nextToken && pages < maxPages);

  return operations;
}

async function describeOperation(
  args: Record<string, unknown>,
  credentials: AwsCredentials,
): Promise<Record<string, unknown>> {
  const client = createCfnClient(credentials);
  const stackSetName = args.StackSetName as string;
  const operationId = args.operationId as string;
  const callAs = args.callAs as CallAs | undefined;

  const command = new DescribeStackSetOperationCommand({
    StackSetName: stackSetName,
    OperationId: operationId,
    CallAs: callAs,
  });
  const response = await client.send(command);
  const op = response.StackSetOperation;

  if (!op) {
    throw new Error(
      `Operation ${operationId} not found on StackSet ${stackSetName}`,
    );
  }

  return {
    OperationId: op.OperationId,
    StackSetId: op.StackSetId,
    Action: op.Action,
    Status: op.Status,
    StatusReason: op.StatusReason,
    CreationTimestamp: op.CreationTimestamp?.toISOString(),
    EndTimestamp: op.EndTimestamp?.toISOString(),
    DeploymentTargets: op.DeploymentTargets
      ? {
        Accounts: op.DeploymentTargets.Accounts,
        OrganizationalUnitIds: op.DeploymentTargets.OrganizationalUnitIds,
        AccountFilterType: op.DeploymentTargets.AccountFilterType,
      }
      : undefined,
    StackSetDriftDetectionDetails: op.StackSetDriftDetectionDetails
      ? {
        DriftStatus: op.StackSetDriftDetectionDetails.DriftStatus,
        DriftedStackInstancesCount:
          op.StackSetDriftDetectionDetails.DriftedStackInstancesCount,
        InSyncStackInstancesCount:
          op.StackSetDriftDetectionDetails.InSyncStackInstancesCount,
        InProgressStackInstancesCount:
          op.StackSetDriftDetectionDetails.InProgressStackInstancesCount,
        FailedStackInstancesCount:
          op.StackSetDriftDetectionDetails.FailedStackInstancesCount,
        TotalStackInstancesCount:
          op.StackSetDriftDetectionDetails.TotalStackInstancesCount,
      }
      : undefined,
    OperationPreferences: op.OperationPreferences
      ? {
        RegionConcurrencyType: op.OperationPreferences.RegionConcurrencyType,
        RegionOrder: op.OperationPreferences.RegionOrder,
        MaxConcurrentCount: op.OperationPreferences.MaxConcurrentCount,
        MaxConcurrentPercentage:
          op.OperationPreferences.MaxConcurrentPercentage,
        FailureToleranceCount: op.OperationPreferences.FailureToleranceCount,
        FailureTolerancePercentage:
          op.OperationPreferences.FailureTolerancePercentage,
        ConcurrencyMode: op.OperationPreferences.ConcurrencyMode,
      }
      : undefined,
    AdministrationRoleARN: op.AdministrationRoleARN,
    ExecutionRoleName: op.ExecutionRoleName,
  };
}

const MIN_POLL_INTERVAL_MS = 1000;
const MIN_TIMEOUT_MS = 10000;
const MAX_TIMEOUT_MS = 600000;

async function detectDrift(
  args: Record<string, unknown>,
  credentials: AwsCredentials,
): Promise<Record<string, unknown>> {
  const client = createCfnClient(credentials);
  const stackSetName = args.StackSetName as string;
  const callAs = args.callAs as CallAs | undefined;
  const pollIntervalMs = Math.max(
    (args.pollIntervalMs as number | undefined) ?? 5000,
    MIN_POLL_INTERVAL_MS,
  );
  const timeoutMs = Math.max(
    Math.min(
      (args.timeoutMs as number | undefined) ?? 300000,
      MAX_TIMEOUT_MS,
    ),
    MIN_TIMEOUT_MS,
  );

  const detectCommand = new DetectStackSetDriftCommand({
    StackSetName: stackSetName,
    CallAs: callAs,
  });
  const detectResponse = await client.send(detectCommand);
  const operationId = detectResponse.OperationId;

  if (!operationId) {
    throw new Error("DetectStackSetDrift did not return an OperationId");
  }

  const startTime = Date.now();

  while (Date.now() - startTime < timeoutMs) {
    await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));

    const statusCommand = new DescribeStackSetOperationCommand({
      StackSetName: stackSetName,
      OperationId: operationId,
      CallAs: callAs,
    });
    const response = await client.send(statusCommand);
    const op = response.StackSetOperation;

    const operationStatus = op?.Status;

    if (
      operationStatus === "SUCCEEDED" || operationStatus === "FAILED" ||
      operationStatus === "STOPPED"
    ) {
      const drift = op?.StackSetDriftDetectionDetails;
      return {
        OperationId: operationId,
        OperationStatus: operationStatus,
        DriftStatus: drift?.DriftStatus,
        DriftDetectionStatus: drift?.DriftDetectionStatus,
        DriftedStackInstancesCount: drift?.DriftedStackInstancesCount,
        InSyncStackInstancesCount: drift?.InSyncStackInstancesCount,
        InProgressStackInstancesCount: drift?.InProgressStackInstancesCount,
        FailedStackInstancesCount: drift?.FailedStackInstancesCount,
        TotalStackInstancesCount: drift?.TotalStackInstancesCount,
        LastDriftCheckTimestamp: drift?.LastDriftCheckTimestamp?.toISOString(),
      };
    }
  }

  throw new Error(
    `Drift detection timed out after ${timeoutMs}ms for StackSet ${stackSetName} (operation: ${operationId})`,
  );
}

const StateSchema = z.object({
  StackSetName: z.string().optional(),
  StackSetId: z.string(),
  AdministrationRoleARN: z.string().optional(),
  AutoDeployment: z.object({
    Enabled: z.boolean(),
    RetainStacksOnAccountRemoval: z.boolean(),
    DependsOn: z.array(z.string()),
  }).optional(),
  Capabilities: z.array(z.string()).optional(),
  Description: z.string().optional(),
  ExecutionRoleName: z.string().optional(),
  OperationPreferences: z.object({
    FailureToleranceCount: z.number(),
    FailureTolerancePercentage: z.number(),
    MaxConcurrentCount: z.number(),
    MaxConcurrentPercentage: z.number(),
    RegionOrder: z.array(z.string()),
    RegionConcurrencyType: z.string(),
    ConcurrencyMode: z.string(),
  }).optional(),
  StackInstancesGroup: z.array(StackInstancesSchema).optional(),
  Parameters: z.array(ParameterSchema).optional(),
  PermissionModel: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  TemplateBody: z.string().optional(),
  TemplateURL: z.string().optional(),
  CallAs: z.string().optional(),
  ManagedExecution: z.object({
    Active: z.boolean(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  StackSetName: z.string().max(128).regex(
    new RegExp("^[a-zA-Z][a-zA-Z0-9\\-]{0,127}$"),
  ).describe(
    "The name to associate with the stack set. The name must be unique in the Region where you create your stack set.",
  ).optional(),
  AdministrationRoleARN: z.string().min(20).max(2048).describe(
    "The Amazon Resource Number (ARN) of the IAM role to use to create this stack set. Specify an IAM role only if you are using customized administrator roles to control which users or groups can manage specific stack sets within the same administrator account.",
  ).optional(),
  AutoDeployment: z.object({
    Enabled: z.boolean().describe(
      "If set to true, StackSets automatically deploys additional stack instances to AWS Organizations accounts that are added to a target organization or organizational unit (OU) in the specified Regions. If an account is removed from a target organization or OU, StackSets deletes stack instances from the account in the specified Regions.",
    ).optional(),
    RetainStacksOnAccountRemoval: z.boolean().describe(
      "If set to true, stack resources are retained when an account is removed from a target organization or OU. If set to false, stack resources are deleted. Specify only if Enabled is set to True.",
    ).optional(),
    DependsOn: z.array(z.string()).describe(
      "A list of StackSet ARNs that this StackSet depends on for auto-deployment operations. When auto-deployment is triggered, operations will be sequenced to ensure all dependencies complete successfully before this StackSet's operation begins.",
    ).optional(),
  }).describe(
    "Describes whether StackSets automatically deploys to AWS Organizations accounts that are added to the target organization or organizational unit (OU). Specify only if PermissionModel is SERVICE_MANAGED.",
  ).optional(),
  Capabilities: z.array(
    z.enum([
      "CAPABILITY_IAM",
      "CAPABILITY_NAMED_IAM",
      "CAPABILITY_AUTO_EXPAND",
    ]),
  ).describe(
    "In some cases, you must explicitly acknowledge that your stack set template contains certain capabilities in order for AWS CloudFormation to create the stack set and related stack instances.",
  ).optional(),
  Description: z.string().min(1).max(1024).describe(
    "A description of the stack set. You can use the description to identify the stack set's purpose or other important information.",
  ).optional(),
  ExecutionRoleName: z.string().min(1).max(64).describe(
    "The name of the IAM execution role to use to create the stack set. If you do not specify an execution role, AWS CloudFormation uses the AWSCloudFormationStackSetExecutionRole role for the stack set operation.",
  ).optional(),
  OperationPreferences: z.object({
    FailureToleranceCount: z.number().int().min(0).optional(),
    FailureTolerancePercentage: z.number().int().min(0).max(100).optional(),
    MaxConcurrentCount: z.number().int().min(1).optional(),
    MaxConcurrentPercentage: z.number().int().min(0).max(100).optional(),
    RegionOrder: z.array(z.string().regex(new RegExp("^[a-zA-Z0-9-]{1,128}$")))
      .optional(),
    RegionConcurrencyType: z.enum(["SEQUENTIAL", "PARALLEL"]).describe(
      "The concurrency type of deploying StackSets operations in regions, could be in parallel or one region at a time",
    ).optional(),
    ConcurrencyMode: z.enum([
      "STRICT_FAILURE_TOLERANCE",
      "SOFT_FAILURE_TOLERANCE",
    ]).describe(
      "Specifies how the concurrency level behaves during the operation execution.",
    ).optional(),
  }).describe(
    "The user-specified preferences for how AWS CloudFormation performs a stack set operation.",
  ).optional(),
  StackInstancesGroup: z.array(StackInstancesSchema).describe(
    "A group of stack instances with parameters in some specific accounts and regions.",
  ).optional(),
  Parameters: z.array(ParameterSchema).describe(
    "The input parameters for the stack set template.",
  ).optional(),
  PermissionModel: z.enum(["SERVICE_MANAGED", "SELF_MANAGED"]).describe(
    "Describes how the IAM roles required for stack set operations are created. By default, SELF-MANAGED is specified.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The key-value pairs to associate with this stack set and the stacks created from it. AWS CloudFormation also propagates these tags to supported resources that are created in the stacks. A maximum number of 50 tags can be specified.",
  ).optional(),
  TemplateBody: z.string().min(1).max(51200).describe(
    "The structure that contains the template body, with a minimum length of 1 byte and a maximum length of 51,200 bytes.",
  ).optional(),
  TemplateURL: z.string().min(1).max(5120).describe(
    "Location of file containing the template body. The URL must point to a template (max size: 460,800 bytes) that is located in an Amazon S3 bucket.",
  ).optional(),
  CallAs: z.enum(["SELF", "DELEGATED_ADMIN"]).describe(
    "Specifies the AWS account that you are acting from. By default, SELF is specified. For self-managed permissions, specify SELF; for service-managed permissions, if you are signed in to the organization's management account, specify SELF. If you are signed in to a delegated administrator account, specify DELEGATED_ADMIN.",
  ).optional(),
  ManagedExecution: z.object({
    Active: z.boolean().describe(
      "When true, StackSets performs non-conflicting operations concurrently and queues conflicting operations. After conflicting operations finish, StackSets starts queued operations in request order.",
    ).optional(),
  }).describe(
    "Describes whether StackSets performs non-conflicting operations concurrently and queues conflicting operations.",
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

/** Swamp extension model for CloudFormation StackSet. Registered at `@swamp/aws/cloudformation/stack-set`. */
export const model = {
  type: "@swamp/aws/cloudformation/stack-set",
  version: "2026.06.16.5",
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
      toVersion: "2026.06.15.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.16.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.16.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.16.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.16.4",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.16.5",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "CloudFormation StackSet resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CloudFormation StackSet",
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
          "AWS::CloudFormation::StackSet",
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
      description: "Get a CloudFormation StackSet",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudFormation StackSet",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::CloudFormation::StackSet",
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
      description: "Update a CloudFormation StackSet",
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
        const identifier = existing.StackSetId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::CloudFormation::StackSet",
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
          "AWS::CloudFormation::StackSet",
          identifier,
          currentState,
          desiredState,
          ["PermissionModel", "StackSetName"],
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
      description: "Delete a CloudFormation StackSet",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudFormation StackSet",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::CloudFormation::StackSet",
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
      description: "Sync CloudFormation StackSet state from AWS",
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
        const identifier = existing.StackSetId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::CloudFormation::StackSet",
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
    listInstances: {
      description:
        "List stack instances for this StackSet across accounts and regions",
      arguments: z.object({
        callAs: z.enum(["SELF", "DELEGATED_ADMIN"]).describe(
          "Specifies whether you are acting as an account administrator in the organization's management account or as a delegated administrator in a member account",
        ).optional(),
        filters: z.array(z.object({ Name: z.string(), Values: z.string() }))
          .describe(
            "Filter instances by status (e.g. Name=DETAILED_STATUS, Values=RUNNING)",
          ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const mergedArgs = { ...context.globalArgs, ...args };
        const items = await listInstances(mergedArgs, credentials);
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const instanceName = (String(i)).replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, "");
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
    listOperations: {
      description: "List operations performed on this StackSet",
      arguments: z.object({
        callAs: z.enum(["SELF", "DELEGATED_ADMIN"]).describe(
          "Specifies whether you are acting as an account administrator or as a delegated administrator",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const mergedArgs = { ...context.globalArgs, ...args };
        const items = await listOperations(mergedArgs, credentials);
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const instanceName = (String(i)).replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, "");
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
    describeOperation: {
      description: "Describe a specific StackSet operation by its operation ID",
      arguments: z.object({
        operationId: z.string().describe(
          "The unique ID of the StackSet operation to describe",
        ),
        callAs: z.enum(["SELF", "DELEGATED_ADMIN"]).describe(
          "Specifies whether you are acting as an account administrator or as a delegated administrator",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const mergedArgs = { ...context.globalArgs, ...args };
        const result = await describeOperation(mergedArgs, credentials);
        const argKeys = Object.keys(args).filter((k) => args[k] !== undefined);
        const suffix = argKeys.length > 0
          ? "-" + argKeys.map((k) => String(args[k])).join("-")
          : "";
        const instanceName = ("describeOperation" + suffix).replace(
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
    detectDrift: {
      description:
        "Detect drift on this StackSet and poll until detection completes",
      arguments: z.object({
        callAs: z.enum(["SELF", "DELEGATED_ADMIN"]).describe(
          "Specifies whether you are acting as an account administrator or as a delegated administrator",
        ).optional(),
        pollIntervalMs: z.number().describe(
          "Polling interval in milliseconds (default: 5000)",
        ).optional(),
        timeoutMs: z.number().describe(
          "Maximum time to wait for drift detection in milliseconds (default: 300000)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const mergedArgs = { ...context.globalArgs, ...args };
        const result = await detectDrift(mergedArgs, credentials);
        const argKeys = Object.keys(args).filter((k) => args[k] !== undefined);
        const suffix = argKeys.length > 0
          ? "-" + argKeys.map((k) => String(args[k])).join("-")
          : "";
        const instanceName = ("detectDrift" + suffix).replace(/[\/\\]/g, "_")
          .replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
  },
};
