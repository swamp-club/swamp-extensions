// Auto-generated extension model for @swamp/gcp/compute/nodetemplates
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Compute Engine NodeTemplates.
 *
 * Represent a sole-tenant Node Template resource. You can use a template to define properties for nodes in a node group. For more information, readCreating node groups and instances.
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
  "id": "compute.nodeTemplates.get",
  "path": "projects/{project}/regions/{region}/nodeTemplates/{nodeTemplate}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "region",
    "nodeTemplate",
  ],
  "parameters": {
    "nodeTemplate": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "region": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "compute.nodeTemplates.insert",
  "path": "projects/{project}/regions/{region}/nodeTemplates",
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
  "id": "compute.nodeTemplates.delete",
  "path": "projects/{project}/regions/{region}/nodeTemplates/{nodeTemplate}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "project",
    "region",
    "nodeTemplate",
  ],
  "parameters": {
    "nodeTemplate": {
      "location": "path",
      "required": true,
    },
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

const LIST_CONFIG = {
  "id": "compute.nodeTemplates.list",
  "path": "projects/{project}/regions/{region}/nodeTemplates",
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
  accelerators: z.array(z.object({
    acceleratorCount: z.number().int().describe(
      "The number of the guest accelerator cards exposed to this instance.",
    ).optional(),
    acceleratorType: z.string().describe(
      "Full or partial URL of the accelerator type resource to attach to this instance. For example:projects/my-project/zones/us-central1-c/acceleratorTypes/nvidia-tesla-p100 If you are creating an instance template, specify only the accelerator name. See GPUs on Compute Engine for a full list of accelerator types.",
    ).optional(),
  })).optional(),
  cpuOvercommitType: z.enum([
    "CPU_OVERCOMMIT_TYPE_UNSPECIFIED",
    "ENABLED",
    "NONE",
  ]).describe("CPU overcommit.").optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  disks: z.array(z.object({
    diskCount: z.number().int().describe("Specifies the number of such disks.")
      .optional(),
    diskSizeGb: z.number().int().describe(
      "Specifies the size of the disk in base-2 GB.",
    ).optional(),
    diskType: z.string().describe(
      "Specifies the desired disk type on the node. This disk type must be a local storage type (e.g.: local-ssd). Note that for nodeTemplates, this should be the name of the disk type and not its URL.",
    ).optional(),
  })).optional(),
  name: z.string().describe(
    "The name of the resource, provided by the client when initially creating the resource. The resource name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
  ).optional(),
  nodeAffinityLabels: z.record(z.string(), z.string()).describe(
    "Labels to use for node affinity, which will be used in instance scheduling.",
  ).optional(),
  nodeType: z.string().describe(
    "The node type to use for nodes group that are created from this template.",
  ).optional(),
  nodeTypeFlexibility: z.object({
    cpus: z.string().optional(),
    localSsd: z.string().optional(),
    memory: z.string().optional(),
  }).optional(),
  region: z.string().describe(
    "Output only. [Output Only] The name of the region where the node template resides, such as us-central1.",
  ).optional(),
  serverBinding: z.object({
    type: z.enum([
      "RESTART_NODE_ON_ANY_SERVER",
      "RESTART_NODE_ON_MINIMAL_SERVERS",
      "SERVER_BINDING_TYPE_UNSPECIFIED",
    ]).optional(),
  }).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

const StateSchema = z.object({
  accelerators: z.array(z.object({
    acceleratorCount: z.number(),
    acceleratorType: z.string(),
  })).optional(),
  cpuOvercommitType: z.string().optional(),
  creationTimestamp: z.string().optional(),
  description: z.string().optional(),
  disks: z.array(z.object({
    diskCount: z.number(),
    diskSizeGb: z.number(),
    diskType: z.string(),
  })).optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  name: z.string(),
  nodeAffinityLabels: z.record(z.string(), z.unknown()).optional(),
  nodeType: z.string().optional(),
  nodeTypeFlexibility: z.object({
    cpus: z.string(),
    localSsd: z.string(),
    memory: z.string(),
  }).optional(),
  region: z.string().optional(),
  selfLink: z.string().optional(),
  serverBinding: z.object({
    type: z.string(),
  }).optional(),
  status: z.string().optional(),
  statusMessage: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accelerators: z.array(z.object({
    acceleratorCount: z.number().int().describe(
      "The number of the guest accelerator cards exposed to this instance.",
    ).optional(),
    acceleratorType: z.string().describe(
      "Full or partial URL of the accelerator type resource to attach to this instance. For example:projects/my-project/zones/us-central1-c/acceleratorTypes/nvidia-tesla-p100 If you are creating an instance template, specify only the accelerator name. See GPUs on Compute Engine for a full list of accelerator types.",
    ).optional(),
  })).optional(),
  cpuOvercommitType: z.enum([
    "CPU_OVERCOMMIT_TYPE_UNSPECIFIED",
    "ENABLED",
    "NONE",
  ]).describe("CPU overcommit.").optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  disks: z.array(z.object({
    diskCount: z.number().int().describe("Specifies the number of such disks.")
      .optional(),
    diskSizeGb: z.number().int().describe(
      "Specifies the size of the disk in base-2 GB.",
    ).optional(),
    diskType: z.string().describe(
      "Specifies the desired disk type on the node. This disk type must be a local storage type (e.g.: local-ssd). Note that for nodeTemplates, this should be the name of the disk type and not its URL.",
    ).optional(),
  })).optional(),
  name: z.string().describe(
    "The name of the resource, provided by the client when initially creating the resource. The resource name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
  ).optional(),
  nodeAffinityLabels: z.record(z.string(), z.string()).describe(
    "Labels to use for node affinity, which will be used in instance scheduling.",
  ).optional(),
  nodeType: z.string().describe(
    "The node type to use for nodes group that are created from this template.",
  ).optional(),
  nodeTypeFlexibility: z.object({
    cpus: z.string().optional(),
    localSsd: z.string().optional(),
    memory: z.string().optional(),
  }).optional(),
  region: z.string().describe(
    "Output only. [Output Only] The name of the region where the node template resides, such as us-central1.",
  ).optional(),
  serverBinding: z.object({
    type: z.enum([
      "RESTART_NODE_ON_ANY_SERVER",
      "RESTART_NODE_ON_MINIMAL_SERVERS",
      "SERVER_BINDING_TYPE_UNSPECIFIED",
    ]).optional(),
  }).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

/** Swamp extension model for Google Cloud Compute Engine NodeTemplates. Registered at `@swamp/gcp/compute/nodetemplates`. */
export const model = {
  type: "@swamp/gcp/compute/nodetemplates",
  version: "2026.05.24.1",
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
    {
      toVersion: "2026.05.24.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represent a sole-tenant Node Template resource. You can use a template to def...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a nodeTemplates",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        const body: Record<string, unknown> = {};
        if (g["accelerators"] !== undefined) {
          body["accelerators"] = g["accelerators"];
        }
        if (g["cpuOvercommitType"] !== undefined) {
          body["cpuOvercommitType"] = g["cpuOvercommitType"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["disks"] !== undefined) body["disks"] = g["disks"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["nodeAffinityLabels"] !== undefined) {
          body["nodeAffinityLabels"] = g["nodeAffinityLabels"];
        }
        if (g["nodeType"] !== undefined) body["nodeType"] = g["nodeType"];
        if (g["nodeTypeFlexibility"] !== undefined) {
          body["nodeTypeFlexibility"] = g["nodeTypeFlexibility"];
        }
        if (g["serverBinding"] !== undefined) {
          body["serverBinding"] = g["serverBinding"];
        }
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["name"] !== undefined) params["nodeTemplate"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "status",
              "readyValues": ["READY"],
              "failedValues": [],
            }
            : undefined,
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
      description: "Get a nodeTemplates",
      arguments: z.object({
        identifier: z.string().describe("The name of the nodeTemplates"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        params["nodeTemplate"] = args.identifier;
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
      description: "Delete the nodeTemplates",
      arguments: z.object({
        identifier: z.string().describe("The name of the nodeTemplates"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        params["nodeTemplate"] = args.identifier;
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
      description: "Sync nodeTemplates state from GCP",
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
          params["nodeTemplate"] = identifier;
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
    get_iam_policy: {
      description: "get iam policy",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
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
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.nodeTemplates.getIamPolicy",
            "path":
              "projects/{project}/regions/{region}/nodeTemplates/{resource}/getIamPolicy",
            "httpMethod": "GET",
            "parameterOrder": ["project", "region", "resource"],
            "parameters": {
              "optionsRequestedPolicyVersion": { "location": "query" },
              "project": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    set_iam_policy: {
      description: "set iam policy",
      arguments: z.object({
        bindings: z.any().optional(),
        etag: z.any().optional(),
        policy: z.any().optional(),
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
        if (args["bindings"] !== undefined) body["bindings"] = args["bindings"];
        if (args["etag"] !== undefined) body["etag"] = args["etag"];
        if (args["policy"] !== undefined) body["policy"] = args["policy"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.nodeTemplates.setIamPolicy",
            "path":
              "projects/{project}/regions/{region}/nodeTemplates/{resource}/setIamPolicy",
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
            "id": "compute.nodeTemplates.testIamPermissions",
            "path":
              "projects/{project}/regions/{region}/nodeTemplates/{resource}/testIamPermissions",
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
