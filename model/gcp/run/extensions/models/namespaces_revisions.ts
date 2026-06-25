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

// Auto-generated extension model for @swamp/gcp/run/namespaces-revisions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Run Admin Namespaces.Revisions.
 *
 * Revision is an immutable snapshot of code and configuration. A revision references one or more container images. Revisions are created by updates to a Service.
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
  "id": "run.namespaces.revisions.get",
  "path": "apis/serving.knative.dev/v1/{+name}",
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
  "id": "run.namespaces.revisions.delete",
  "path": "apis/serving.knative.dev/v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "apiVersion": {
      "location": "query",
    },
    "dryRun": {
      "location": "query",
    },
    "kind": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "propagationPolicy": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "run.namespaces.revisions.list",
  "path": "apis/serving.knative.dev/v1/{+parent}/revisions",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "continue": {
      "location": "query",
    },
    "fieldSelector": {
      "location": "query",
    },
    "includeUninitialized": {
      "location": "query",
    },
    "labelSelector": {
      "location": "query",
    },
    "limit": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "resourceVersion": {
      "location": "query",
    },
    "watch": {
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
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  apiVersion: z.string().optional(),
  kind: z.string().optional(),
  metadata: z.object({
    annotations: z.record(z.string(), z.unknown()),
    clusterName: z.string(),
    creationTimestamp: z.string(),
    deletionGracePeriodSeconds: z.number(),
    deletionTimestamp: z.string(),
    finalizers: z.array(z.string()),
    generateName: z.string(),
    generation: z.number(),
    labels: z.record(z.string(), z.unknown()),
    name: z.string(),
    namespace: z.string(),
    ownerReferences: z.array(z.object({
      apiVersion: z.string(),
      blockOwnerDeletion: z.boolean(),
      controller: z.boolean(),
      kind: z.string(),
      name: z.string(),
      uid: z.string(),
    })),
    resourceVersion: z.string(),
    selfLink: z.string(),
    uid: z.string(),
  }).optional(),
  spec: z.object({
    containerConcurrency: z.number(),
    containers: z.array(z.object({
      args: z.array(z.string()),
      command: z.array(z.string()),
      env: z.array(z.object({
        name: z.unknown(),
        value: z.unknown(),
        valueFrom: z.unknown(),
      })),
      envFrom: z.array(z.object({
        configMapRef: z.unknown(),
        prefix: z.unknown(),
        secretRef: z.unknown(),
      })),
      image: z.string(),
      imagePullPolicy: z.string(),
      livenessProbe: z.object({
        exec: z.object({
          command: z.unknown(),
        }),
        failureThreshold: z.number(),
        grpc: z.object({
          port: z.unknown(),
          service: z.unknown(),
        }),
        httpGet: z.object({
          host: z.unknown(),
          httpHeaders: z.unknown(),
          path: z.unknown(),
          port: z.unknown(),
          scheme: z.unknown(),
        }),
        initialDelaySeconds: z.number(),
        periodSeconds: z.number(),
        successThreshold: z.number(),
        tcpSocket: z.object({
          host: z.unknown(),
          port: z.unknown(),
        }),
        timeoutSeconds: z.number(),
      }),
      name: z.string(),
      ports: z.array(z.object({
        containerPort: z.unknown(),
        name: z.unknown(),
        protocol: z.unknown(),
      })),
      readinessProbe: z.object({
        exec: z.object({
          command: z.unknown(),
        }),
        failureThreshold: z.number(),
        grpc: z.object({
          port: z.unknown(),
          service: z.unknown(),
        }),
        httpGet: z.object({
          host: z.unknown(),
          httpHeaders: z.unknown(),
          path: z.unknown(),
          port: z.unknown(),
          scheme: z.unknown(),
        }),
        initialDelaySeconds: z.number(),
        periodSeconds: z.number(),
        successThreshold: z.number(),
        tcpSocket: z.object({
          host: z.unknown(),
          port: z.unknown(),
        }),
        timeoutSeconds: z.number(),
      }),
      resources: z.object({
        limits: z.record(z.string(), z.unknown()),
        requests: z.record(z.string(), z.unknown()),
      }),
      sandboxLauncher: z.boolean(),
      securityContext: z.object({
        runAsUser: z.number(),
      }),
      startupProbe: z.object({
        exec: z.object({
          command: z.unknown(),
        }),
        failureThreshold: z.number(),
        grpc: z.object({
          port: z.unknown(),
          service: z.unknown(),
        }),
        httpGet: z.object({
          host: z.unknown(),
          httpHeaders: z.unknown(),
          path: z.unknown(),
          port: z.unknown(),
          scheme: z.unknown(),
        }),
        initialDelaySeconds: z.number(),
        periodSeconds: z.number(),
        successThreshold: z.number(),
        tcpSocket: z.object({
          host: z.unknown(),
          port: z.unknown(),
        }),
        timeoutSeconds: z.number(),
      }),
      terminationMessagePath: z.string(),
      terminationMessagePolicy: z.string(),
      volumeMounts: z.array(z.object({
        mountPath: z.unknown(),
        name: z.unknown(),
        readOnly: z.unknown(),
        subPath: z.unknown(),
      })),
      workingDir: z.string(),
    })),
    enableServiceLinks: z.boolean(),
    imagePullSecrets: z.array(z.object({
      name: z.string(),
    })),
    nodeSelector: z.record(z.string(), z.unknown()),
    runtimeClassName: z.string(),
    serviceAccountName: z.string(),
    timeoutSeconds: z.number(),
    volumes: z.array(z.object({
      configMap: z.object({
        defaultMode: z.number(),
        items: z.array(z.unknown()),
        name: z.string(),
        optional: z.boolean(),
      }),
      csi: z.object({
        driver: z.string(),
        readOnly: z.boolean(),
        volumeAttributes: z.record(z.string(), z.unknown()),
      }),
      emptyDir: z.object({
        medium: z.string(),
        sizeLimit: z.string(),
      }),
      name: z.string(),
      nfs: z.object({
        path: z.string(),
        readOnly: z.boolean(),
        server: z.string(),
      }),
      secret: z.object({
        defaultMode: z.number(),
        items: z.array(z.unknown()),
        optional: z.boolean(),
        secretName: z.string(),
      }),
    })),
  }).optional(),
  status: z.object({
    conditions: z.array(z.object({
      lastTransitionTime: z.string(),
      message: z.string(),
      reason: z.string(),
      severity: z.string(),
      status: z.string(),
      type: z.string(),
    })),
    desiredReplicas: z.number(),
    imageDigest: z.string(),
    logUrl: z.string(),
    observedGeneration: z.number(),
    serviceName: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
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

/** Swamp extension model for Google Cloud Run Admin Namespaces.Revisions. Registered at `@swamp/gcp/run/namespaces-revisions`. */
export const model = {
  type: "@swamp/gcp/run/namespaces-revisions",
  version: "2026.06.25.1",
  upgrades: [
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
    {
      toVersion: "2026.06.12.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Revision is an immutable snapshot of code and configuration. A revision refer...",
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
          String(g["parent"] ?? ""),
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
          String(g["parent"] ?? ""),
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
            String(g["parent"] ?? ""),
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
        continue: z.string().describe(
          "Optional. Encoded string to continue paging.",
        ).optional(),
        fieldSelector: z.string().describe(
          "Allows to filter resources based on a specific value for a field name. Send this in a query string format. i.e. 'metadata.name%3Dlorem'. Not currently used by Cloud Run.",
        ).optional(),
        includeUninitialized: z.boolean().describe(
          "Not currently used by Cloud Run.",
        ).optional(),
        labelSelector: z.string().describe(
          "Allows to filter resources based on a label. Supported operations are =, !=, exists, in, and notIn.",
        ).optional(),
        limit: z.number().describe(
          "Optional. The maximum number of records that should be returned.",
        ).optional(),
        resourceVersion: z.string().describe(
          "The baseline resource version from which the list or watch operation should start. Not currently used by Cloud Run.",
        ).optional(),
        watch: z.boolean().describe(
          "Flag that indicates that the client expects to watch this resource as well. Not currently used by Cloud Run.",
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
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["continue"] !== undefined) {
          params["continue"] = String(args["continue"]);
        }
        if (args["fieldSelector"] !== undefined) {
          params["fieldSelector"] = String(args["fieldSelector"]);
        }
        if (args["includeUninitialized"] !== undefined) {
          params["includeUninitialized"] = String(args["includeUninitialized"]);
        }
        if (args["labelSelector"] !== undefined) {
          params["labelSelector"] = String(args["labelSelector"]);
        }
        if (args["limit"] !== undefined) {
          params["limit"] = String(args["limit"]);
        }
        if (args["resourceVersion"] !== undefined) {
          params["resourceVersion"] = String(args["resourceVersion"]);
        }
        if (args["watch"] !== undefined) {
          params["watch"] = String(args["watch"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "items",
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
