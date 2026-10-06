// deno-lint-ignore-file no-import-prefix

import { z } from "npm:zod@4.3.6";
import {
  type CallAs,
  CloudFormationClient,
  DescribeStackSetOperationCommand,
  DetectStackSetDriftCommand,
  ListStackInstancesCommand,
  ListStackSetOperationsCommand,
  type StackInstanceFilter,
} from "npm:@aws-sdk/client-cloudformation@3.1127.0";
import type { AwsCredentials } from "../../../../model/aws/cloudformation/extensions/models/_lib/aws.ts";

export const StackInstanceOutputSchema = z.object({
  Account: z.string().optional(),
  Region: z.string().optional(),
  Status: z.string().optional(),
  StatusReason: z.string().optional(),
  StackInstanceStatus: z.object({
    DetailedStatus: z.string().optional(),
  }).optional(),
  DriftStatus: z.string().optional(),
  StackId: z.string().optional(),
  OrganizationalUnitId: z.string().optional(),
  LastDriftCheckTimestamp: z.string().optional(),
  LastOperationId: z.string().optional(),
});

/** Superset of the listOperations summary and describeOperation detail shapes. */
export const OperationOutputSchema = z.object({
  OperationId: z.string(),
  StackSetId: z.string().optional(),
  Action: z.string().optional(),
  Status: z.string().optional(),
  StatusReason: z.string().optional(),
  CreationTimestamp: z.string().optional(),
  EndTimestamp: z.string().optional(),
  StatusDetails: z.object({
    FailedStackInstancesCount: z.number().optional(),
  }).optional(),
  DeploymentTargets: z.object({
    Accounts: z.array(z.string()).optional(),
    OrganizationalUnitIds: z.array(z.string()).optional(),
    AccountFilterType: z.string().optional(),
  }).optional(),
  StackSetDriftDetectionDetails: z.object({
    DriftStatus: z.string().optional(),
    DriftedStackInstancesCount: z.number().optional(),
    InSyncStackInstancesCount: z.number().optional(),
    InProgressStackInstancesCount: z.number().optional(),
    FailedStackInstancesCount: z.number().optional(),
    TotalStackInstancesCount: z.number().optional(),
  }).optional(),
  OperationPreferences: z.object({
    RegionConcurrencyType: z.string().optional(),
    RegionOrder: z.array(z.string()).optional(),
    MaxConcurrentCount: z.number().optional(),
    MaxConcurrentPercentage: z.number().optional(),
    FailureToleranceCount: z.number().optional(),
    FailureTolerancePercentage: z.number().optional(),
    ConcurrencyMode: z.string().optional(),
  }).optional(),
  AdministrationRoleARN: z.string().optional(),
  ExecutionRoleName: z.string().optional(),
});

export const DetectDriftOutputSchema = z.object({
  OperationId: z.string(),
  OperationStatus: z.string(),
  DriftStatus: z.string().optional(),
  DriftDetectionStatus: z.string().optional(),
  DriftedStackInstancesCount: z.number().optional(),
  InSyncStackInstancesCount: z.number().optional(),
  InProgressStackInstancesCount: z.number().optional(),
  FailedStackInstancesCount: z.number().optional(),
  TotalStackInstancesCount: z.number().optional(),
  LastDriftCheckTimestamp: z.string().optional(),
});

function createCfnClient(credentials: AwsCredentials): CloudFormationClient {
  // disableImdsIfOffEc2 inlined — enrichments run at codegen time, not extension runtime
  if (
    !Deno.env.get("AWS_EC2_METADATA_DISABLED") &&
    !Deno.env.get("AWS_CONTAINER_CREDENTIALS_RELATIVE_URI") &&
    !Deno.env.get("AWS_CONTAINER_CREDENTIALS_FULL_URI")
  ) {
    Deno.env.set("AWS_EC2_METADATA_DISABLED", "true");
  }

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

export async function listInstances(
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

export async function listOperations(
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

export async function describeOperation(
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

export async function detectDrift(
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
