// deno-lint-ignore-file no-import-prefix

import { z } from "npm:zod@4.6.7";
import {
  AmplifyClient,
  GetJobCommand,
  type JobSummary,
  ListJobsCommand,
  type Step,
} from "npm:@aws-sdk/client-amplify@3.1156.0";
import { NodeHttpHandler } from "npm:@smithy/node-http-handler@4.9.7";
import type { AwsCredentials } from "../../../../model/aws/amplify/extensions/models/_lib/aws.ts";

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

export const JobHistoryOutputSchema = z.object({
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

export const JobOutputSchema = AmplifyJobSummarySchema.extend({
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

export async function listJobs(
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

export async function getJob(
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
