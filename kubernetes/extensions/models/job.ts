import { z } from "npm:zod@4.3.6";
import type { V1CronJob, V1Job } from "npm:@kubernetes/client-node@1.0.0";
import {
  buildClient,
  type DataHandle,
  type K8sContext,
  K8sGlobalArgsSchema,
  normalizeMeta,
  sanitizeInstanceName,
} from "./_lib/helpers.ts";

// --- Schemas ---

const JobSchema = z.object({
  name: z.string(),
  namespace: z.string(),
  uid: z.string(),
  completions: z.number(),
  parallelism: z.number(),
  succeeded: z.number(),
  failed: z.number(),
  active: z.number(),
  backoffLimit: z.number(),
  startTime: z.string(),
  completionTime: z.string(),
  durationSeconds: z.number(),
  conditions: z.array(z.object({
    type: z.string(),
    status: z.string(),
    reason: z.string(),
    message: z.string(),
    lastTransitionTime: z.string(),
  })),
  containers: z.array(z.object({
    name: z.string(),
    image: z.string(),
  })),
  ownerCronJob: z.string(),
  labels: z.record(z.string(), z.string()),
  annotations: z.record(z.string(), z.string()),
  createdAt: z.string(),
}).passthrough();

const CronJobSchema = z.object({
  name: z.string(),
  namespace: z.string(),
  uid: z.string(),
  schedule: z.string(),
  suspend: z.boolean(),
  concurrencyPolicy: z.string(),
  lastScheduleTime: z.string(),
  lastSuccessfulTime: z.string(),
  activeJobs: z.number(),
  successfulJobsHistoryLimit: z.number(),
  failedJobsHistoryLimit: z.number(),
  containers: z.array(z.object({
    name: z.string(),
    image: z.string(),
  })),
  labels: z.record(z.string(), z.string()),
  annotations: z.record(z.string(), z.string()),
  createdAt: z.string(),
}).passthrough();

// --- Method Arg Schemas ---

const ListJobsArgsSchema = z.object({ namespace: z.string().optional() });
const GetJobArgsSchema = z.object({
  jobName: z.string(),
  namespace: z.string().optional(),
});
const DeleteJobArgsSchema = z.object({
  jobName: z.string(),
  namespace: z.string().optional(),
});
const ListCronJobsArgsSchema = z.object({ namespace: z.string().optional() });
const GetCronJobArgsSchema = z.object({
  cronJobName: z.string(),
  namespace: z.string().optional(),
});
const DeleteCronJobArgsSchema = z.object({
  cronJobName: z.string(),
  namespace: z.string().optional(),
});

// --- Helpers ---

function normalizeJob(raw: V1Job) {
  const meta = normalizeMeta(raw);
  const ownerRefs = raw.metadata?.ownerReferences || [];
  const cronOwner = ownerRefs.find((o) => o.kind === "CronJob");

  const startTime = raw.status?.startTime
    ? new Date(raw.status.startTime).toISOString()
    : "";
  const completionTime = raw.status?.completionTime
    ? new Date(raw.status.completionTime).toISOString()
    : "";
  let durationSeconds = 0;
  if (startTime && completionTime) {
    durationSeconds = Math.round(
      (new Date(completionTime).getTime() - new Date(startTime).getTime()) /
        1000,
    );
  }

  return {
    ...meta,
    completions: raw.spec?.completions ?? 1,
    parallelism: raw.spec?.parallelism ?? 1,
    succeeded: raw.status?.succeeded ?? 0,
    failed: raw.status?.failed ?? 0,
    active: raw.status?.active ?? 0,
    backoffLimit: raw.spec?.backoffLimit ?? 6,
    startTime,
    completionTime,
    durationSeconds,
    conditions: (raw.status?.conditions || []).map((c) => ({
      type: c.type || "",
      status: c.status || "",
      reason: c.reason || "",
      message: c.message || "",
      lastTransitionTime: c.lastTransitionTime
        ? new Date(c.lastTransitionTime).toISOString()
        : "",
    })),
    containers: (raw.spec?.template?.spec?.containers || []).map((c) => ({
      name: c.name || "",
      image: c.image || "",
    })),
    ownerCronJob: cronOwner?.name || "",
  };
}

function normalizeCronJob(raw: V1CronJob) {
  const meta = normalizeMeta(raw);

  return {
    ...meta,
    schedule: raw.spec?.schedule || "",
    suspend: raw.spec?.suspend || false,
    concurrencyPolicy: raw.spec?.concurrencyPolicy || "Allow",
    lastScheduleTime: raw.status?.lastScheduleTime
      ? new Date(raw.status.lastScheduleTime).toISOString()
      : "",
    lastSuccessfulTime: raw.status?.lastSuccessfulTime
      ? new Date(raw.status.lastSuccessfulTime).toISOString()
      : "",
    activeJobs: (raw.status?.active || []).length,
    successfulJobsHistoryLimit: raw.spec?.successfulJobsHistoryLimit ?? 3,
    failedJobsHistoryLimit: raw.spec?.failedJobsHistoryLimit ?? 1,
    containers: (raw.spec?.jobTemplate?.spec?.template?.spec?.containers || [])
      .map(
        (c) => ({
          name: c.name || "",
          image: c.image || "",
        }),
      ),
  };
}

// --- Model ---

/** Kubernetes Job and CronJob model. */
export const model = {
  type: "@swamp/kubernetes/job",
  version: "2026.06.04.1",
  globalArguments: K8sGlobalArgsSchema,
  upgrades: [
    {
      toVersion: "2026.05.27.2",
      description:
        "Version bump for extension-wide security fix in pod exec method",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  resources: {
    job: {
      description:
        "Job with completions, failures, duration, conditions, and owner CronJob reference",
      schema: JobSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
    cronJob: {
      description:
        "CronJob with schedule, suspend status, concurrency policy, and last schedule/success times",
      schema: CronJobSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    listJobs: {
      description:
        "List all Jobs in the namespace with completion status, duration, and failure counts",
      arguments: ListJobsArgsSchema,
      execute: async (
        args: z.infer<typeof ListJobsArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { batchApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;
        const labels = context.globalArgs.labels;

        const resp = await batchApi.listNamespacedJob({
          namespace: ns,
          labelSelector: labels,
        });
        const jobs = resp.items || [];

        context.logger.info("Found {count} jobs in {ns}", {
          count: jobs.length,
          ns,
        });

        const handles: DataHandle[] = [];
        for (const job of jobs) {
          const normalized = normalizeJob(job);
          const handle = await context.writeResource(
            "job",
            sanitizeInstanceName(normalized.name),
            normalized,
          );
          handles.push(handle);
        }
        return { dataHandles: handles };
      },
    },

    getJob: {
      description:
        "Get a Job's full status including completions, failures, duration, conditions, and containers",
      arguments: GetJobArgsSchema,
      execute: async (
        args: z.infer<typeof GetJobArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { batchApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        const job = await batchApi.readNamespacedJob({
          name: args.jobName,
          namespace: ns,
        });
        const normalized = normalizeJob(job);

        const handle = await context.writeResource(
          "job",
          sanitizeInstanceName(normalized.name),
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },

    deleteJob: {
      description: "Delete a Job and its pods",
      arguments: DeleteJobArgsSchema,
      execute: async (
        args: z.infer<typeof DeleteJobArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { batchApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        await batchApi.deleteNamespacedJob({
          name: args.jobName,
          namespace: ns,
          body: { propagationPolicy: "Background" },
        });

        context.logger.info("Deleted job {name} in {ns}", {
          name: args.jobName,
          ns,
        });
        return { dataHandles: [] };
      },
    },

    listCronJobs: {
      description:
        "List all CronJobs with schedule, suspend status, last run times, and active job count",
      arguments: ListCronJobsArgsSchema,
      execute: async (
        args: z.infer<typeof ListCronJobsArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { batchApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;
        const labels = context.globalArgs.labels;

        const resp = await batchApi.listNamespacedCronJob({
          namespace: ns,
          labelSelector: labels,
        });
        const cronJobs = resp.items || [];

        context.logger.info("Found {count} CronJobs in {ns}", {
          count: cronJobs.length,
          ns,
        });

        const handles: DataHandle[] = [];
        for (const cj of cronJobs) {
          const normalized = normalizeCronJob(cj);
          const handle = await context.writeResource(
            "cronJob",
            sanitizeInstanceName(normalized.name),
            normalized,
          );
          handles.push(handle);
        }
        return { dataHandles: handles };
      },
    },

    getCronJob: {
      description:
        "Get a CronJob's schedule, suspend status, concurrency policy, and history limits",
      arguments: GetCronJobArgsSchema,
      execute: async (
        args: z.infer<typeof GetCronJobArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { batchApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        const cj = await batchApi.readNamespacedCronJob({
          name: args.cronJobName,
          namespace: ns,
        });
        const normalized = normalizeCronJob(cj);

        const handle = await context.writeResource(
          "cronJob",
          sanitizeInstanceName(normalized.name),
          normalized,
        );
        return { dataHandles: [handle] };
      },
    },

    deleteCronJob: {
      description: "Delete a CronJob and all its child Jobs",
      arguments: DeleteCronJobArgsSchema,
      execute: async (
        args: z.infer<typeof DeleteCronJobArgsSchema>,
        context: K8sContext,
      ): Promise<{ dataHandles: DataHandle[] }> => {
        const { batchApi } = buildClient(context.globalArgs);
        const ns = args.namespace ?? context.globalArgs.namespace;

        await batchApi.deleteNamespacedCronJob({
          name: args.cronJobName,
          namespace: ns,
          body: { propagationPolicy: "Background" },
        });

        context.logger.info("Deleted CronJob {name} in {ns}", {
          name: args.cronJobName,
          ns,
        });
        return { dataHandles: [] };
      },
    },
  },
};
