// Auto-generated extension model for @swamp/gcp/compute/targetpools
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Compute Engine TargetPools.
 *
 * Represents a Target Pool resource. Target pools are used with external passthrough Network Load Balancers. A target pool references member instances, an associated legacy HttpHealthCheck resource, and, optionally, a backup target pool. For more information, readUsing target pools.
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
} from "./_lib/gcp.ts";

const BASE_URL = "https://compute.googleapis.com/compute/v1/";

const GET_CONFIG = {
  "id": "compute.targetPools.get",
  "path": "projects/{project}/regions/{region}/targetPools/{targetPool}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "region",
    "targetPool",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "region": {
      "location": "path",
      "required": true,
    },
    "targetPool": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "compute.targetPools.insert",
  "path": "projects/{project}/regions/{region}/targetPools",
  "httpMethod": "POST",
  "parameterOrder": [
    "project",
    "region",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "region": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "compute.targetPools.delete",
  "path": "projects/{project}/regions/{region}/targetPools/{targetPool}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "project",
    "region",
    "targetPool",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "region": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "targetPool": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "compute.targetPools.list",
  "path": "projects/{project}/regions/{region}/targetPools",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "region",
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
    "region": {
      "location": "path",
      "required": true,
    },
    "returnPartialSuccess": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  backupPool: z.string().describe(
    'The server-defined URL for the resource. This field is applicable only when the containing target pool is serving a forwarding rule as the primary pool, and its failoverRatio field is properly set to a value between [0, 1].backupPool and failoverRatio together define the fallback behavior of the primary target pool: if the ratio of the healthy instances in the primary pool is at or belowfailoverRatio, traffic arriving at the load-balanced IP will be directed to the backup pool. In case where failoverRatio and backupPool are not set, or all the instances in the backup pool are unhealthy, the traffic will be directed back to the primary pool in the "force" mode, where traffic will be spread to the healthy instances with the best effort, or to all instances when no instance is healthy.',
  ).optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  failoverRatio: z.number().describe(
    'This field is applicable only when the containing target pool is serving a forwarding rule as the primary pool (i.e., not as a backup pool to some other target pool). The value of the field must be in [0, 1]. If set, backupPool must also be set. They together define the fallback behavior of the primary target pool: if the ratio of the healthy instances in the primary pool is at or below this number, traffic arriving at the load-balanced IP will be directed to the backup pool. In case where failoverRatio is not set or all the instances in the backup pool are unhealthy, the traffic will be directed back to the primary pool in the "force" mode, where traffic will be spread to the healthy instances with the best effort, or to all instances when no instance is healthy.',
  ).optional(),
  healthChecks: z.array(z.string()).describe(
    "The URL of the HttpHealthCheck resource. A member instance in this pool is considered healthy if and only if the health checks pass. Only legacy HttpHealthChecks are supported. Only one health check may be specified.",
  ).optional(),
  instances: z.array(z.string()).describe(
    "A list of resource URLs to the virtual machine instances serving this pool. They must live in zones contained in the same region as this pool.",
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  region: z.string().describe(
    "Output only. [Output Only] URL of the region where the target pool resides.",
  ).optional(),
  sessionAffinity: z.enum([
    "CLIENT_IP",
    "CLIENT_IP_NO_DESTINATION",
    "CLIENT_IP_PORT_PROTO",
    "CLIENT_IP_PROTO",
    "GENERATED_COOKIE",
    "HEADER_FIELD",
    "HTTP_COOKIE",
    "NONE",
    "STRONG_COOKIE_AFFINITY",
  ]).describe(
    "Session affinity option, must be one of the following values: NONE: Connections from the same client IP may go to any instance in the pool. CLIENT_IP: Connections from the same client IP will go to the same instance in the pool while that instance remains healthy. CLIENT_IP_PROTO: Connections from the same client IP with the same IP protocol will go to the same instance in the pool while that instance remains healthy.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

const StateSchema = z.object({
  backupPool: z.string().optional(),
  creationTimestamp: z.string().optional(),
  description: z.string().optional(),
  failoverRatio: z.number().optional(),
  healthChecks: z.array(z.string()).optional(),
  id: z.string().optional(),
  instances: z.array(z.string()).optional(),
  kind: z.string().optional(),
  name: z.string(),
  region: z.string().optional(),
  securityPolicy: z.string().optional(),
  selfLink: z.string().optional(),
  sessionAffinity: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  backupPool: z.string().describe(
    'The server-defined URL for the resource. This field is applicable only when the containing target pool is serving a forwarding rule as the primary pool, and its failoverRatio field is properly set to a value between [0, 1].backupPool and failoverRatio together define the fallback behavior of the primary target pool: if the ratio of the healthy instances in the primary pool is at or belowfailoverRatio, traffic arriving at the load-balanced IP will be directed to the backup pool. In case where failoverRatio and backupPool are not set, or all the instances in the backup pool are unhealthy, the traffic will be directed back to the primary pool in the "force" mode, where traffic will be spread to the healthy instances with the best effort, or to all instances when no instance is healthy.',
  ).optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  failoverRatio: z.number().describe(
    'This field is applicable only when the containing target pool is serving a forwarding rule as the primary pool (i.e., not as a backup pool to some other target pool). The value of the field must be in [0, 1]. If set, backupPool must also be set. They together define the fallback behavior of the primary target pool: if the ratio of the healthy instances in the primary pool is at or below this number, traffic arriving at the load-balanced IP will be directed to the backup pool. In case where failoverRatio is not set or all the instances in the backup pool are unhealthy, the traffic will be directed back to the primary pool in the "force" mode, where traffic will be spread to the healthy instances with the best effort, or to all instances when no instance is healthy.',
  ).optional(),
  healthChecks: z.array(z.string()).describe(
    "The URL of the HttpHealthCheck resource. A member instance in this pool is considered healthy if and only if the health checks pass. Only legacy HttpHealthChecks are supported. Only one health check may be specified.",
  ).optional(),
  instances: z.array(z.string()).describe(
    "A list of resource URLs to the virtual machine instances serving this pool. They must live in zones contained in the same region as this pool.",
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  region: z.string().describe(
    "Output only. [Output Only] URL of the region where the target pool resides.",
  ).optional(),
  sessionAffinity: z.enum([
    "CLIENT_IP",
    "CLIENT_IP_NO_DESTINATION",
    "CLIENT_IP_PORT_PROTO",
    "CLIENT_IP_PROTO",
    "GENERATED_COOKIE",
    "HEADER_FIELD",
    "HTTP_COOKIE",
    "NONE",
    "STRONG_COOKIE_AFFINITY",
  ]).describe(
    "Session affinity option, must be one of the following values: NONE: Connections from the same client IP may go to any instance in the pool. CLIENT_IP: Connections from the same client IP will go to the same instance in the pool while that instance remains healthy. CLIENT_IP_PROTO: Connections from the same client IP with the same IP protocol will go to the same instance in the pool while that instance remains healthy.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

/** Swamp extension model for Google Cloud Compute Engine TargetPools. Registered at `@swamp/gcp/compute/targetpools`. */
export const model = {
  type: "@swamp/gcp/compute/targetpools",
  version: "2026.05.21.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents a Target Pool resource. Target pools are used with external passth...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a targetPools",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        const body: Record<string, unknown> = {};
        if (g["backupPool"] !== undefined) body["backupPool"] = g["backupPool"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["failoverRatio"] !== undefined) {
          body["failoverRatio"] = g["failoverRatio"];
        }
        if (g["healthChecks"] !== undefined) {
          body["healthChecks"] = g["healthChecks"];
        }
        if (g["instances"] !== undefined) body["instances"] = g["instances"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["sessionAffinity"] !== undefined) {
          body["sessionAffinity"] = g["sessionAffinity"];
        }
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["name"] !== undefined) params["targetPool"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "project": projectId,
              "region": String(g["region"] ?? ""),
            },
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
      description: "Get a targetPools",
      arguments: z.object({
        identifier: z.string().describe("The name of the targetPools"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        params["targetPool"] = args.identifier;
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
    delete: {
      description: "Delete the targetPools",
      arguments: z.object({
        identifier: z.string().describe("The name of the targetPools"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        params["targetPool"] = args.identifier;
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
      description: "Sync targetPools state from GCP",
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
          if (g["region"] !== undefined) params["region"] = String(g["region"]);
          else if (existing["region"]) {
            params["region"] = String(existing["region"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["targetPool"] = identifier;
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
    add_health_check: {
      description: "add health check",
      arguments: z.object({
        healthChecks: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
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
        params["targetPool"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["healthChecks"] !== undefined) {
          body["healthChecks"] = args["healthChecks"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.targetPools.addHealthCheck",
            "path":
              "projects/{project}/regions/{region}/targetPools/{targetPool}/addHealthCheck",
            "httpMethod": "POST",
            "parameterOrder": ["project", "region", "targetPool"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "targetPool": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    add_instance: {
      description: "add instance",
      arguments: z.object({
        instances: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
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
        params["targetPool"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["instances"] !== undefined) {
          body["instances"] = args["instances"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.targetPools.addInstance",
            "path":
              "projects/{project}/regions/{region}/targetPools/{targetPool}/addInstance",
            "httpMethod": "POST",
            "parameterOrder": ["project", "region", "targetPool"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "targetPool": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    get_health: {
      description: "get health",
      arguments: z.object({
        instance: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
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
        params["targetPool"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["instance"] !== undefined) body["instance"] = args["instance"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.targetPools.getHealth",
            "path":
              "projects/{project}/regions/{region}/targetPools/{targetPool}/getHealth",
            "httpMethod": "POST",
            "parameterOrder": ["project", "region", "targetPool"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
              "targetPool": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    set_backup: {
      description: "set backup",
      arguments: z.object({
        target: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
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
        params["targetPool"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["target"] !== undefined) body["target"] = args["target"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.targetPools.setBackup",
            "path":
              "projects/{project}/regions/{region}/targetPools/{targetPool}/setBackup",
            "httpMethod": "POST",
            "parameterOrder": ["project", "region", "targetPool"],
            "parameters": {
              "failoverRatio": { "location": "query" },
              "project": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "targetPool": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    set_security_policy: {
      description: "set security policy",
      arguments: z.object({
        securityPolicy: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
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
        params["targetPool"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["securityPolicy"] !== undefined) {
          body["securityPolicy"] = args["securityPolicy"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.targetPools.setSecurityPolicy",
            "path":
              "projects/{project}/regions/{region}/targetPools/{targetPool}/setSecurityPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["project", "region", "targetPool"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "targetPool": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
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
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
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
            "id": "compute.targetPools.testIamPermissions",
            "path":
              "projects/{project}/regions/{region}/targetPools/{resource}/testIamPermissions",
            "httpMethod": "POST",
            "parameterOrder": ["project", "region", "resource"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
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
