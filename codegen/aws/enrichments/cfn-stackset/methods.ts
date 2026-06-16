// deno-lint-ignore-file no-import-prefix

import {
  type CallAs,
  CloudFormationClient,
  DescribeStackSetOperationCommand,
  DetectStackSetDriftCommand,
  ListStackInstancesCommand,
  ListStackSetOperationsCommand,
  type StackInstanceFilter,
} from "npm:@aws-sdk/client-cloudformation@3.1021.0";
import type { AwsCredentials } from "../../../../model/aws/cloudformation/extensions/models/_lib/aws.ts";

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
