// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/aws/amplify/branch
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Amplify Branch (AWS::Amplify::Branch).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, sync, and list can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";
import {
  AmplifyClient,
  GetJobCommand,
  type JobSummary,
  ListJobsCommand,
  type Step,
} from "npm:@aws-sdk/client-amplify@3.1156.0";
import { NodeHttpHandler } from "npm:@smithy/node-http-handler@4.9.7";

const EnvironmentVariableSchema = z.object({
  Name: z.string().max(255).regex(new RegExp(".*", "s")),
  Value: z.string().max(5500).regex(new RegExp(".*", "s")),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^(?!aws:)[a-zA-Z+-=._:/]+$"),
  ),
  Value: z.string().min(0).max(256).regex(
    new RegExp("^([\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]*)$", "u"),
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
  AppId: z.string().min(1).max(20).regex(new RegExp("d[a-z0-9]+")),
  BasicAuthConfig: z.object({
    EnableBasicAuth: z.boolean().optional(),
    Username: z.string().min(1).max(255),
    Password: z.string().min(1).max(255),
  }).optional(),
  Backend: z.object({
    StackArn: z.string().min(20).max(2048).optional(),
  }).optional(),
  BranchName: z.string().min(1).max(255).regex(new RegExp(".+", "s")),
  BuildSpec: z.string().min(1).max(25000).regex(new RegExp(".+", "s"))
    .optional(),
  ComputeRoleArn: z.string().min(0).max(1000).regex(new RegExp(".*", "s"))
    .optional(),
  Description: z.string().max(1000).regex(new RegExp(".*", "s")).optional(),
  EnableAutoBuild: z.boolean().optional(),
  EnablePerformanceMode: z.boolean().optional(),
  EnablePullRequestPreview: z.boolean().optional(),
  EnableSkewProtection: z.boolean().optional(),
  EnvironmentVariables: z.array(EnvironmentVariableSchema).optional(),
  Framework: z.string().max(255).regex(new RegExp(".*", "s")).optional(),
  PullRequestEnvironmentName: z.string().max(20).regex(new RegExp(".*", "s"))
    .optional(),
  Stage: z.enum([
    "EXPERIMENTAL",
    "BETA",
    "PULL_REQUEST",
    "PRODUCTION",
    "DEVELOPMENT",
  ]).optional(),
  Tags: z.array(TagSchema).optional(),
});

// Job statuses after which Amplify never changes the job again.
const AMPLIFY_TERMINAL_JOB_STATUSES = new Set([
  "SUCCEED",
  "FAILED",
  "CANCELLED",
]);

// Steps reported individually; a step Amplify did not run is MISSING, never
// assumed to have succeeded.
const AMPLIFY_OBSERVED_STEPS = ["BUILD", "DEPLOY", "VERIFY"];

const AmplifyJobSummarySchema = z.object({
  jobId: z.string(),
  jobArn: z.string().optional(),
  jobType: z.string().optional(),
  status: z.string().optional(),
  terminal: z.boolean(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  commitTime: z.string().optional(),
  // As reported by Amplify; may be a symbolic ref such as HEAD.
  reportedCommitId: z.string().optional(),
  // Nothing here verifies the revision a job built, so this is always
  // "unknown". A verified state may be added once a proof exists.
  sourceResolution: z.enum(["unknown"]),
});

const JobHistoryOutputSchema = z.object({
  appId: z.string(),
  branchName: z.string(),
  jobs: z.array(AmplifyJobSummarySchema),
  coverage: z.object({
    pagesFetched: z.number(),
    jobsReturned: z.number(),
    complete: z.boolean(),
    stopReason: z.enum(["exhausted", "maxPages", "deadline"]),
    maxPages: z.number(),
    pageSize: z.number(),
    timeoutMs: z.number(),
    observedAt: z.string(),
  }),
});

const JobOutputSchema = AmplifyJobSummarySchema.extend({
  appId: z.string(),
  branchName: z.string(),
  steps: z.array(z.object({
    stepName: z.string().optional(),
    status: z.string().optional(),
    statusReason: z.string().optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
  })),
  stepOutcomes: z.array(z.object({
    stepName: z.string(),
    status: z.string(),
  })),
  observedAt: z.string(),
});

function createAmplifyClient(credentials: AwsCredentials): AmplifyClient {
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

  const config: Record<string, unknown> = {
    region,
    requestHandler: new NodeHttpHandler(),
  };

  if (credentials.accessKeyId && credentials.secretAccessKey) {
    config.credentials = {
      accessKeyId: credentials.accessKeyId,
      secretAccessKey: credentials.secretAccessKey,
      ...(credentials.sessionToken
        ? { sessionToken: credentials.sessionToken }
        : {}),
    };
  }

  return new AmplifyClient(config);
}

function amplifyBoundedInt(
  value: unknown,
  fallback: number,
  min: number,
  max: number,
): number {
  const n = typeof value === "number" && Number.isFinite(value)
    ? Math.trunc(value)
    : fallback;
  return Math.min(Math.max(n, min), max);
}

/**
 * One deadline for a whole method call. `within` settles as soon as the
 * deadline passes, even if the SDK is still waiting out a retry backoff, and
 * the signal aborts any request in flight. `expired` is true only once the
 * timer has fired, so an API error that arrives first is never mistaken for
 * the deadline.
 */
function amplifyDeadline(timeoutMs: number) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  return {
    signal: controller.signal,
    expired: () => controller.signal.aborted,
    clear: () => clearTimeout(timer),
    within<T>(promise: Promise<T>): Promise<T> {
      return new Promise<T>((resolve, reject) => {
        const onAbort = () => reject(new Error("deadline exceeded"));
        if (controller.signal.aborted) {
          onAbort();
        } else {
          controller.signal.addEventListener("abort", onAbort, { once: true });
        }
        promise.then((value) => {
          controller.signal.removeEventListener("abort", onAbort);
          resolve(value);
        }, (error) => {
          controller.signal.removeEventListener("abort", onAbort);
          reject(error);
        });
      });
    },
  };
}

function toAmplifyJobSummary(
  summary: JobSummary,
): z.infer<typeof AmplifyJobSummarySchema> {
  return {
    jobId: summary.jobId ?? "",
    jobArn: summary.jobArn,
    jobType: summary.jobType,
    status: summary.status,
    terminal: AMPLIFY_TERMINAL_JOB_STATUSES.has(summary.status ?? ""),
    startTime: summary.startTime?.toISOString(),
    endTime: summary.endTime?.toISOString(),
    commitTime: summary.commitTime?.toISOString(),
    reportedCommitId: summary.commitId,
    sourceResolution: "unknown",
  };
}

function toAmplifyStep(step: Step) {
  return {
    stepName: step.stepName,
    status: step.status,
    statusReason: step.statusReason,
    startTime: step.startTime?.toISOString(),
    endTime: step.endTime?.toISOString(),
  };
}

async function listJobs(
  args: Record<string, unknown>,
  credentials: AwsCredentials,
): Promise<Record<string, unknown>> {
  const appId = args.AppId as string;
  const branchName = args.BranchName as string;
  const maxPages = amplifyBoundedInt(args.maxPages, 5, 1, 20);
  const pageSize = amplifyBoundedInt(args.pageSize, 50, 1, 50);
  const timeoutMs = amplifyBoundedInt(args.timeoutMs, 30000, 1, 120000);

  const client = createAmplifyClient(credentials);
  const deadline = amplifyDeadline(timeoutMs);
  const jobs: z.infer<typeof AmplifyJobSummarySchema>[] = [];
  let stopReason: "exhausted" | "maxPages" | "deadline" = "exhausted";
  let pagesFetched = 0;
  let nextToken: string | undefined;

  try {
    do {
      if (pagesFetched >= maxPages) {
        stopReason = "maxPages";
        break;
      }
      if (deadline.expired()) {
        stopReason = "deadline";
        break;
      }
      let response;
      try {
        response = await deadline.within(client.send(
          new ListJobsCommand({
            appId,
            branchName,
            maxResults: pageSize,
            nextToken,
          }),
          { abortSignal: deadline.signal },
        ));
      } catch (error) {
        if (deadline.expired()) {
          stopReason = "deadline";
          break;
        }
        throw error;
      }
      pagesFetched++;
      for (const summary of response.jobSummaries ?? []) {
        jobs.push(toAmplifyJobSummary(summary));
      }
      nextToken = response.nextToken;
    } while (nextToken);
  } finally {
    deadline.clear();
    client.destroy();
  }

  // Without a single page there is no partial history to report, only a
  // failed call; fail like getJob rather than recording an empty listing.
  if (stopReason === "deadline" && pagesFetched === 0) {
    throw new Error(
      `ListJobs on branch ${branchName} did not return a page within ${timeoutMs}ms`,
    );
  }

  return {
    appId,
    branchName,
    jobs,
    coverage: {
      pagesFetched,
      jobsReturned: jobs.length,
      complete: stopReason === "exhausted",
      stopReason,
      maxPages,
      pageSize,
      timeoutMs,
      observedAt: new Date().toISOString(),
    },
  };
}

async function getJob(
  args: Record<string, unknown>,
  credentials: AwsCredentials,
): Promise<Record<string, unknown>> {
  const appId = args.AppId as string;
  const branchName = args.BranchName as string;
  const jobId = args.jobId as string;
  const timeoutMs = amplifyBoundedInt(args.timeoutMs, 30000, 1, 120000);

  const client = createAmplifyClient(credentials);
  const deadline = amplifyDeadline(timeoutMs);
  let response;
  try {
    response = await deadline.within(client.send(
      new GetJobCommand({ appId, branchName, jobId }),
      { abortSignal: deadline.signal },
    ));
  } catch (error) {
    if (deadline.expired()) {
      throw new Error(
        `GetJob for job ${jobId} on branch ${branchName} did not complete within ${timeoutMs}ms`,
      );
    }
    throw error;
  } finally {
    deadline.clear();
    client.destroy();
  }

  const job = response.job;
  if (!job?.summary) {
    throw new Error(`Job ${jobId} not found on branch ${branchName}`);
  }

  const steps = job.steps ?? [];
  return {
    ...toAmplifyJobSummary(job.summary),
    appId,
    branchName,
    steps: steps.map(toAmplifyStep),
    stepOutcomes: AMPLIFY_OBSERVED_STEPS.map((stepName) => {
      const step = steps.find((s) => s.stepName === stepName);
      return {
        stepName,
        status: step ? step.status ?? "UNKNOWN" : "MISSING",
      };
    }),
    observedAt: new Date().toISOString(),
  };
}

const StateSchema = z.object({
  AppId: z.string().optional(),
  Arn: z.string(),
  BasicAuthConfig: z.object({
    EnableBasicAuth: z.boolean(),
    Username: z.string(),
    Password: z.string(),
  }).optional(),
  Backend: z.object({
    StackArn: z.string(),
  }).optional(),
  BranchName: z.string().optional(),
  BuildSpec: z.string().optional(),
  ComputeRoleArn: z.string().optional(),
  Description: z.string().optional(),
  EnableAutoBuild: z.boolean().optional(),
  EnablePerformanceMode: z.boolean().optional(),
  EnablePullRequestPreview: z.boolean().optional(),
  EnableSkewProtection: z.boolean().optional(),
  EnvironmentVariables: z.array(EnvironmentVariableSchema).optional(),
  Framework: z.string().optional(),
  PullRequestEnvironmentName: z.string().optional(),
  Stage: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AppId: z.string().min(1).max(20).regex(new RegExp("d[a-z0-9]+")).optional(),
  BasicAuthConfig: z.object({
    EnableBasicAuth: z.boolean().optional(),
    Username: z.string().min(1).max(255).optional(),
    Password: z.string().min(1).max(255).optional(),
  }).optional(),
  Backend: z.object({
    StackArn: z.string().min(20).max(2048).optional(),
  }).optional(),
  BranchName: z.string().min(1).max(255).regex(new RegExp(".+", "s"))
    .optional(),
  BuildSpec: z.string().min(1).max(25000).regex(new RegExp(".+", "s"))
    .optional(),
  ComputeRoleArn: z.string().min(0).max(1000).regex(new RegExp(".*", "s"))
    .optional(),
  Description: z.string().max(1000).regex(new RegExp(".*", "s")).optional(),
  EnableAutoBuild: z.boolean().optional(),
  EnablePerformanceMode: z.boolean().optional(),
  EnablePullRequestPreview: z.boolean().optional(),
  EnableSkewProtection: z.boolean().optional(),
  EnvironmentVariables: z.array(EnvironmentVariableSchema).optional(),
  Framework: z.string().max(255).regex(new RegExp(".*", "s")).optional(),
  PullRequestEnvironmentName: z.string().max(20).regex(new RegExp(".*", "s"))
    .optional(),
  Stage: z.enum([
    "EXPERIMENTAL",
    "BETA",
    "PULL_REQUEST",
    "PRODUCTION",
    "DEVELOPMENT",
  ]).optional(),
  Tags: z.array(TagSchema).optional(),
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

/** Swamp extension model for Amplify Branch. Registered at `@swamp/aws/amplify/branch`. */
export const model = {
  type: "@swamp/aws/amplify/branch",
  version: "2026.10.28.1",
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
      toVersion: "2026.08.17.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.17.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.28.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Amplify Branch resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
    jobHistory: {
      description:
        "Job summaries for this branch with coverage diagnostics from the most recent listJobs call",
      schema: JobHistoryOutputSchema,
      lifetime: "30d",
      garbageCollection: 10,
    },
    job: {
      description:
        "One Amplify job with step outcomes for BUILD, DEPLOY and VERIFY",
      schema: JobOutputSchema,
      lifetime: "30d",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Amplify Branch",
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
          "AWS::Amplify::Branch",
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
      description: "Get a Amplify Branch",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Amplify Branch",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Amplify::Branch",
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
      description: "Update a Amplify Branch",
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
          "AWS::Amplify::Branch",
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
          "AWS::Amplify::Branch",
          identifier,
          currentState,
          desiredState,
          ["AppId", "BranchName"],
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
      description: "Delete a Amplify Branch",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Amplify Branch",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Amplify::Branch",
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
      description: "Sync Amplify Branch state from AWS",
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
            "AWS::Amplify::Branch",
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
      description: "List Amplify Branch resources",
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
          "AWS::Amplify::Branch",
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
    listJobs: {
      description:
        "List build and deploy jobs for this branch with bounded pagination and a deadline, reporting how much of the history was covered",
      arguments: z.object({
        maxPages: z.number().int().min(1).max(20).describe(
          "Maximum number of pages to fetch (default: 5)",
        ).optional(),
        pageSize: z.number().int().min(1).max(50).describe(
          "Jobs requested per page (default: 50)",
        ).optional(),
        timeoutMs: z.number().int().min(1000).max(120000).describe(
          "Deadline for the whole listing in milliseconds (default: 30000); on expiry the jobs fetched so far are returned with coverage.complete=false",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const mergedArgs = { ...context.globalArgs, ...args };
        const result = await listJobs(mergedArgs, credentials);
        const instanceKey = mergedArgs["BranchName"];
        const instanceName =
          (instanceKey === undefined || instanceKey === null ||
              String(instanceKey) === ""
            ? "listJobs"
            : String(instanceKey)).replace(/[\/\\]/g, "_").replace(/\.\./g, "_")
            .replace(/\0/g, "");
        const handle = await context.writeResource(
          "jobHistory",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    getJob: {
      description:
        "Get one job on this branch with per-step status and timings (no log or artifact URLs)",
      arguments: z.object({
        jobId: z.string().max(255).regex(/^[0-9]+$/).describe(
          "The Amplify job ID to fetch",
        ),
        timeoutMs: z.number().int().min(1000).max(120000).describe(
          "Deadline for the call in milliseconds (default: 30000)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const mergedArgs = { ...context.globalArgs, ...args };
        const result = await getJob(mergedArgs, credentials);
        const instanceKey = mergedArgs["jobId"];
        const instanceName =
          (instanceKey === undefined || instanceKey === null ||
              String(instanceKey) === ""
            ? "getJob"
            : String(instanceKey)).replace(/[\/\\]/g, "_").replace(/\.\./g, "_")
            .replace(/\0/g, "");
        const handle = await context.writeResource("job", instanceName, result);
        return { dataHandles: [handle] };
      },
    },
  },
};
