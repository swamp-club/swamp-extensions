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

// Auto-generated extension model for @swamp/gcp/run/workerpools-revisions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Run Admin WorkerPools.Revisions.
 *
 * A Revision is an immutable snapshot of code and configuration. A Revision references a container image. Revisions are only created by updates to its parent Service.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  deleteResource,
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/revisions/${shortName}`;
}

const BASE_URL = "https://run.googleapis.com/";

const GET_CONFIG = {
  "id": "run.projects.locations.workerPools.revisions.get",
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

const DELETE_CONFIG = {
  "id": "run.projects.locations.workerPools.revisions.delete",
  "path": "v2/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "etag": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "run.projects.locations.workerPools.revisions.list",
  "path": "v2/{+parent}/revisions",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "showDeleted": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  annotations: z.record(z.string(), z.unknown()).optional(),
  client: z.string().optional(),
  clientVersion: z.string().optional(),
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
  creator: z.string().optional(),
  deleteTime: z.string().optional(),
  encryptionKey: z.string().optional(),
  encryptionKeyRevocationAction: z.string().optional(),
  encryptionKeyShutdownDuration: z.string().optional(),
  etag: z.string().optional(),
  executionEnvironment: z.string().optional(),
  expireTime: z.string().optional(),
  generation: z.string().optional(),
  gpuZonalRedundancyDisabled: z.boolean().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  launchStage: z.string().optional(),
  logUri: z.string().optional(),
  maxInstanceRequestConcurrency: z.number().optional(),
  name: z.string(),
  nodeSelector: z.object({
    accelerator: z.string(),
  }).optional(),
  observedGeneration: z.string().optional(),
  reconciling: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  scaling: z.object({
    concurrencyUtilization: z.number(),
    cpuUtilization: z.number(),
    maxInstanceCount: z.number(),
    minInstanceCount: z.number(),
  }).optional(),
  scalingStatus: z.object({
    desiredMinInstanceCount: z.number(),
  }).optional(),
  service: z.string().optional(),
  serviceAccount: z.string().optional(),
  serviceMesh: z.object({
    mesh: z.string(),
  }).optional(),
  sessionAffinity: z.boolean().optional(),
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
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const _credentialKeys = new Set(["accessToken", "credentialsJson", "project"]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Run Admin WorkerPools.Revisions. Registered at `@swamp/gcp/run/workerpools-revisions`. */
export const model = {
  type: "@swamp/gcp/run/workerpools-revisions",
  version: "2026.06.08.1",
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
    {
      toVersion: "2026.05.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.21.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.24.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
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
      description:
        "A Revision is an immutable snapshot of code and configuration. A Revision ref...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a revisions",
      arguments: z.object({
        identifier: z.string().describe("The name of the revisions"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
          credentials,
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
    delete: {
      description: "Delete the revisions",
      arguments: z.object({
        identifier: z.string().describe("The name of the revisions"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
          credentials,
        );
        const instanceName = (g.name?.toString() ?? args.identifier).replace(
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
      description: "Sync revisions state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
      description: "List revisions resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "Maximum number of revisions to return in this call.",
        ).optional(),
        showDeleted: z.boolean().describe(
          "If true, returns deleted (but unexpired) resources along with active ones.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["showDeleted"] !== undefined) {
          params["showDeleted"] = String(args["showDeleted"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "revisions",
          (args.maxPages as number | undefined) ?? 10,
          credentials,
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i] as StateData;
          const instanceName = (item.name?.toString() ?? String(i)).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
          const handle = await context.writeResource(
            "state",
            instanceName,
            item,
          );
          dataHandles.push(handle);
        }
        return { dataHandles, result: { count: items.length, nextPageToken } };
      },
    },
  },
};
