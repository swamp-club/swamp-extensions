// Auto-generated extension model for @swamp/gcp/run/jobs-executions-tasks
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Run Admin Jobs.Executions.Tasks.
 *
 * Task represents a single run of a container to completion.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/tasks/${shortName}`;
}

const BASE_URL = "https://run.googleapis.com/";

const GET_CONFIG = {
  "id": "run.projects.locations.jobs.executions.tasks.get",
  "path": "v2/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  annotations: z.record(z.string(), z.unknown()).optional(),
  completionTime: z.string().optional(),
  conditions: z.array(z.object({
    executionReason: z.string(),
    lastTransitionTime: z.string(),
    message: z.string(),
    reason: z.string(),
    revisionReason: z.string(),
    severity: z.string(),
    state: z.string(),
    type: z.string(),
  })).optional(),
  containers: z.array(z.object({
    args: z.array(z.string()),
    baseImageUri: z.string(),
    buildInfo: z.object({
      functionTarget: z.string(),
      sourceLocation: z.string(),
    }),
    command: z.array(z.string()),
    dependsOn: z.array(z.string()),
    env: z.array(z.object({
      name: z.string(),
      value: z.string(),
      valueSource: z.object({
        secretKeyRef: z.unknown(),
      }),
    })),
    image: z.string(),
    livenessProbe: z.object({
      failureThreshold: z.number(),
      grpc: z.object({
        port: z.number(),
        service: z.string(),
      }),
      httpGet: z.object({
        httpHeaders: z.array(z.unknown()),
        path: z.string(),
        port: z.number(),
      }),
      initialDelaySeconds: z.number(),
      periodSeconds: z.number(),
      tcpSocket: z.object({
        port: z.number(),
      }),
      timeoutSeconds: z.number(),
    }),
    name: z.string(),
    ports: z.array(z.object({
      containerPort: z.number(),
      name: z.string(),
    })),
    readinessProbe: z.object({
      failureThreshold: z.number(),
      grpc: z.object({
        port: z.number(),
        service: z.string(),
      }),
      httpGet: z.object({
        httpHeaders: z.array(z.unknown()),
        path: z.string(),
        port: z.number(),
      }),
      initialDelaySeconds: z.number(),
      periodSeconds: z.number(),
      tcpSocket: z.object({
        port: z.number(),
      }),
      timeoutSeconds: z.number(),
    }),
    resources: z.object({
      cpuIdle: z.boolean(),
      limits: z.record(z.string(), z.unknown()),
      startupCpuBoost: z.boolean(),
    }),
    sourceCode: z.object({
      cloudStorageSource: z.object({
        bucket: z.string(),
        generation: z.string(),
        object: z.string(),
      }),
      inlinedSource: z.object({
        sources: z.array(z.unknown()),
      }),
    }),
    startupProbe: z.object({
      failureThreshold: z.number(),
      grpc: z.object({
        port: z.number(),
        service: z.string(),
      }),
      httpGet: z.object({
        httpHeaders: z.array(z.unknown()),
        path: z.string(),
        port: z.number(),
      }),
      initialDelaySeconds: z.number(),
      periodSeconds: z.number(),
      tcpSocket: z.object({
        port: z.number(),
      }),
      timeoutSeconds: z.number(),
    }),
    volumeMounts: z.array(z.object({
      mountPath: z.string(),
      name: z.string(),
      subPath: z.string(),
    })),
    workingDir: z.string(),
  })).optional(),
  createTime: z.string().optional(),
  deleteTime: z.string().optional(),
  encryptionKey: z.string().optional(),
  etag: z.string().optional(),
  execution: z.string().optional(),
  executionEnvironment: z.string().optional(),
  expireTime: z.string().optional(),
  generation: z.string().optional(),
  gpuZonalRedundancyDisabled: z.boolean().optional(),
  index: z.number().optional(),
  job: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  lastAttemptResult: z.object({
    exitCode: z.number(),
    status: z.object({
      code: z.number(),
      details: z.array(z.record(z.string(), z.unknown())),
      message: z.string(),
    }),
    termSignal: z.number(),
  }).optional(),
  logUri: z.string().optional(),
  maxRetries: z.number().optional(),
  name: z.string(),
  nodeSelector: z.object({
    accelerator: z.string(),
  }).optional(),
  observedGeneration: z.string().optional(),
  reconciling: z.boolean().optional(),
  retried: z.number().optional(),
  satisfiesPzs: z.boolean().optional(),
  scheduledTime: z.string().optional(),
  serviceAccount: z.string().optional(),
  startTime: z.string().optional(),
  timeout: z.string().optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
  volumes: z.array(z.object({
    cloudSqlInstance: z.object({
      instances: z.array(z.string()),
    }),
    emptyDir: z.object({
      medium: z.string(),
      sizeLimit: z.string(),
    }),
    gcs: z.object({
      bucket: z.string(),
      mountOptions: z.array(z.string()),
      readOnly: z.boolean(),
    }),
    name: z.string(),
    nfs: z.object({
      path: z.string(),
      readOnly: z.boolean(),
      server: z.string(),
    }),
    secret: z.object({
      defaultMode: z.number(),
      items: z.array(z.object({
        mode: z.unknown(),
        path: z.unknown(),
        version: z.unknown(),
      })),
      secret: z.string(),
    }),
  })).optional(),
  vpcAccess: z.object({
    connector: z.string(),
    egress: z.string(),
    networkInterfaces: z.array(z.object({
      network: z.string(),
      subnetwork: z.string(),
      tags: z.array(z.string()),
    })),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Run Admin Jobs.Executions.Tasks. Registered at `@swamp/gcp/run/jobs-executions-tasks`. */
export const model = {
  type: "@swamp/gcp/run/jobs-executions-tasks",
  version: "2026.05.19.2",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.2",
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
      toVersion: "2026.04.03.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.04.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Task represents a single run of a container to completion.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a tasks",
      arguments: z.object({
        identifier: z.string().describe("The name of the tasks"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? args.identifier).replace(
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
    sync: {
      description: "Sync tasks state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        try {
          const params: Record<string, string> = { project: projectId };
          const shortName = existing.name?.toString() ?? g["name"]?.toString();
          if (!shortName) throw new Error("No identifier found");
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            shortName,
          );
          const result = await readResource(
            BASE_URL,
            GET_CONFIG,
            params,
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
