// Auto-generated extension model for @swamp/gcp/compute/httpshealthchecks
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Compute Engine HttpsHealthChecks.
 *
 * Represents a legacy HTTPS Health Check resource. Legacy HTTPS health checks have been deprecated. If you are using a target pool-based network load balancer, you must use a legacy HTTP (not HTTPS) health check. For all other load balancers, including backend service-based network load balancers, and for managed instance group auto-healing, you must use modern (non-legacy) health checks. For more information, seeHealth checks overview.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  deleteResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://compute.googleapis.com/compute/v1/";

const GET_CONFIG = {
  "id": "compute.httpsHealthChecks.get",
  "path": "projects/{project}/global/httpsHealthChecks/{httpsHealthCheck}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "httpsHealthCheck",
  ],
  "parameters": {
    "httpsHealthCheck": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "compute.httpsHealthChecks.insert",
  "path": "projects/{project}/global/httpsHealthChecks",
  "httpMethod": "POST",
  "parameterOrder": [
    "project",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "compute.httpsHealthChecks.update",
  "path": "projects/{project}/global/httpsHealthChecks/{httpsHealthCheck}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "project",
    "httpsHealthCheck",
  ],
  "parameters": {
    "httpsHealthCheck": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "compute.httpsHealthChecks.delete",
  "path": "projects/{project}/global/httpsHealthChecks/{httpsHealthCheck}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "project",
    "httpsHealthCheck",
  ],
  "parameters": {
    "httpsHealthCheck": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "compute.httpsHealthChecks.list",
  "path": "projects/{project}/global/httpsHealthChecks",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "maxResults": {
      "location": "query",
    },
    "orderBy": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "returnPartialSuccess": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  checkIntervalSec: z.number().int().describe(
    "How often (in seconds) to send a health check. The default value is 5 seconds.",
  ).optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  healthyThreshold: z.number().int().describe(
    "A so-far unhealthy instance will be marked healthy after this many consecutive successes. The default value is 2.",
  ).optional(),
  host: z.string().describe(
    "The value of the host header in the HTTPS health check request. If left empty (default value), the public IP on behalf of which this health check is performed will be used.",
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  port: z.number().int().describe(
    "The TCP port number for the HTTPS health check request. The default value is 443.",
  ).optional(),
  requestPath: z.string().describe(
    'The request path of the HTTPS health check request. The default value is "/". Must comply withRFC3986.',
  ).optional(),
  timeoutSec: z.number().int().describe(
    "How long (in seconds) to wait before claiming failure. The default value is 5 seconds. It is invalid for timeoutSec to have a greater value than checkIntervalSec.",
  ).optional(),
  unhealthyThreshold: z.number().int().describe(
    "A so-far healthy instance will be marked unhealthy after this many consecutive failures. The default value is 2.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

const StateSchema = z.object({
  checkIntervalSec: z.number().optional(),
  creationTimestamp: z.string().optional(),
  description: z.string().optional(),
  healthyThreshold: z.number().optional(),
  host: z.string().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  name: z.string(),
  port: z.number().optional(),
  requestPath: z.string().optional(),
  selfLink: z.string().optional(),
  timeoutSec: z.number().optional(),
  unhealthyThreshold: z.number().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  checkIntervalSec: z.number().int().describe(
    "How often (in seconds) to send a health check. The default value is 5 seconds.",
  ).optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  healthyThreshold: z.number().int().describe(
    "A so-far unhealthy instance will be marked healthy after this many consecutive successes. The default value is 2.",
  ).optional(),
  host: z.string().describe(
    "The value of the host header in the HTTPS health check request. If left empty (default value), the public IP on behalf of which this health check is performed will be used.",
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  port: z.number().int().describe(
    "The TCP port number for the HTTPS health check request. The default value is 443.",
  ).optional(),
  requestPath: z.string().describe(
    'The request path of the HTTPS health check request. The default value is "/". Must comply withRFC3986.',
  ).optional(),
  timeoutSec: z.number().int().describe(
    "How long (in seconds) to wait before claiming failure. The default value is 5 seconds. It is invalid for timeoutSec to have a greater value than checkIntervalSec.",
  ).optional(),
  unhealthyThreshold: z.number().int().describe(
    "A so-far healthy instance will be marked unhealthy after this many consecutive failures. The default value is 2.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

/** Swamp extension model for Google Cloud Compute Engine HttpsHealthChecks. Registered at `@swamp/gcp/compute/httpshealthchecks`. */
export const model = {
  type: "@swamp/gcp/compute/httpshealthchecks",
  version: "2026.05.21.2",
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
      toVersion: "2026.04.23.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents a legacy HTTPS Health Check resource. Legacy HTTPS health checks h...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a httpsHealthChecks",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["checkIntervalSec"] !== undefined) {
          body["checkIntervalSec"] = g["checkIntervalSec"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["healthyThreshold"] !== undefined) {
          body["healthyThreshold"] = g["healthyThreshold"];
        }
        if (g["host"] !== undefined) body["host"] = g["host"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["port"] !== undefined) body["port"] = g["port"];
        if (g["requestPath"] !== undefined) {
          body["requestPath"] = g["requestPath"];
        }
        if (g["timeoutSec"] !== undefined) body["timeoutSec"] = g["timeoutSec"];
        if (g["unhealthyThreshold"] !== undefined) {
          body["unhealthyThreshold"] = g["unhealthyThreshold"];
        }
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["name"] !== undefined) {
          params["httpsHealthCheck"] = String(g["name"]);
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "project": projectId },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
        ) as StateData;
        const instanceName = ((result.name ?? g.name)?.toString() ?? "current")
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
      description: "Get a httpsHealthChecks",
      arguments: z.object({
        identifier: z.string().describe("The name of the httpsHealthChecks"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["httpsHealthCheck"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
        ) as StateData;
        const instanceName =
          ((result.name ?? g.name)?.toString() ?? args.identifier).replace(
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
      description: "Update httpsHealthChecks attributes",
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
        const params: Record<string, string> = { project: projectId };
        params["httpsHealthCheck"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["checkIntervalSec"] !== undefined) {
          body["checkIntervalSec"] = g["checkIntervalSec"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["healthyThreshold"] !== undefined) {
          body["healthyThreshold"] = g["healthyThreshold"];
        }
        if (g["host"] !== undefined) body["host"] = g["host"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["port"] !== undefined) body["port"] = g["port"];
        if (g["requestPath"] !== undefined) {
          body["requestPath"] = g["requestPath"];
        }
        if (g["timeoutSec"] !== undefined) body["timeoutSec"] = g["timeoutSec"];
        if (g["unhealthyThreshold"] !== undefined) {
          body["unhealthyThreshold"] = g["unhealthyThreshold"];
        }
        for (const key of Object.keys(existing)) {
          if (
            key === "fingerprint" || key === "labelFingerprint" ||
            key === "etag" || key.endsWith("Fingerprint")
          ) {
            body[key] = existing[key];
          }
        }
        const result = await updateResource(
          BASE_URL,
          UPDATE_CONFIG,
          params,
          body,
          GET_CONFIG,
        ) as StateData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the httpsHealthChecks",
      arguments: z.object({
        identifier: z.string().describe("The name of the httpsHealthChecks"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["httpsHealthCheck"] = args.identifier;
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
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
      description: "Sync httpsHealthChecks state from GCP",
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
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["httpsHealthCheck"] = identifier;
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
    test_iam_permissions: {
      description: "test iam permissions",
      arguments: z.object({
        permissions: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["permissions"] !== undefined) {
          body["permissions"] = args["permissions"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.httpsHealthChecks.testIamPermissions",
            "path":
              "projects/{project}/global/httpsHealthChecks/{resource}/testIamPermissions",
            "httpMethod": "POST",
            "parameterOrder": ["project", "resource"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
