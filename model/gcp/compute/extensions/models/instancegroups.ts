// Auto-generated extension model for @swamp/gcp/compute/instancegroups
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Compute Engine InstanceGroups.
 *
 * Represents an Instance Group resource. Instance Groups can be used to configure a target forload balancing. Instance groups can either be managed or unmanaged. To create managed instance groups, use the instanceGroupManager orregionInstanceGroupManager resource instead. Use zonal unmanaged instance groups if you need to applyload balancing to groups of heterogeneous instances or if you need to manage the instances yourself. You cannot create regional unmanaged instance groups. For more information, readInstance groups.
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
  listResources,
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://compute.googleapis.com/compute/v1/";

const GET_CONFIG = {
  "id": "compute.instanceGroups.get",
  "path": "projects/{project}/zones/{zone}/instanceGroups/{instanceGroup}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "zone",
    "instanceGroup",
  ],
  "parameters": {
    "instanceGroup": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "zone": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "compute.instanceGroups.insert",
  "path": "projects/{project}/zones/{zone}/instanceGroups",
  "httpMethod": "POST",
  "parameterOrder": [
    "project",
    "zone",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "zone": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "compute.instanceGroups.delete",
  "path": "projects/{project}/zones/{zone}/instanceGroups/{instanceGroup}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "project",
    "zone",
    "instanceGroup",
  ],
  "parameters": {
    "instanceGroup": {
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
    "zone": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "compute.instanceGroups.list",
  "path": "projects/{project}/zones/{zone}/instanceGroups",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "zone",
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
    "zone": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "The name of the instance group. The name must be 1-63 characters long, and comply withRFC1035.",
    ),
  namedPorts: z.array(z.object({
    name: z.string().describe(
      "The name for this named port. The name must be 1-63 characters long, and comply withRFC1035.",
    ).optional(),
    port: z.number().int().describe(
      "The port number, which can be a value between 1 and 65535.",
    ).optional(),
  })).describe(
    'Optional. Assigns a name to a port number. For example:{name: "http", port: 80} This allows the system to reference ports by the assigned name instead of a port number. Named ports can also contain multiple ports. For example:[{name: "app1", port: 8080}, {name: "app1", port: 8081}, {name: "app2", port: 8082}] Named ports apply to all instances in this instance group.',
  ).optional(),
  zone: z.string().describe(
    "Output only. [Output Only] The URL of thezone where the instance group is located (for zonal resources).",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

const StateSchema = z.object({
  creationTimestamp: z.string().optional(),
  description: z.string().optional(),
  fingerprint: z.string().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  name: z.string(),
  namedPorts: z.array(z.object({
    name: z.string(),
    port: z.number(),
  })).optional(),
  network: z.string().optional(),
  region: z.string().optional(),
  selfLink: z.string().optional(),
  size: z.number().optional(),
  subnetwork: z.string().optional(),
  zone: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "The name of the instance group. The name must be 1-63 characters long, and comply withRFC1035.",
    ).optional(),
  namedPorts: z.array(z.object({
    name: z.string().describe(
      "The name for this named port. The name must be 1-63 characters long, and comply withRFC1035.",
    ).optional(),
    port: z.number().int().describe(
      "The port number, which can be a value between 1 and 65535.",
    ).optional(),
  })).describe(
    'Optional. Assigns a name to a port number. For example:{name: "http", port: 80} This allows the system to reference ports by the assigned name instead of a port number. Named ports can also contain multiple ports. For example:[{name: "app1", port: 8080}, {name: "app1", port: 8081}, {name: "app2", port: 8082}] Named ports apply to all instances in this instance group.',
  ).optional(),
  zone: z.string().describe(
    "Output only. [Output Only] The URL of thezone where the instance group is located (for zonal resources).",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

/** Swamp extension model for Google Cloud Compute Engine InstanceGroups. Registered at `@swamp/gcp/compute/instancegroups`. */
export const model = {
  type: "@swamp/gcp/compute/instancegroups",
  version: "2026.05.25.1",
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
    {
      toVersion: "2026.05.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents an Instance Group resource. Instance Groups can be used to configu...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a instanceGroups",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["namedPorts"] !== undefined) body["namedPorts"] = g["namedPorts"];
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["name"] !== undefined) {
          params["instanceGroup"] = String(g["name"]);
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
            listParams: {
              "project": projectId,
              "zone": String(g["zone"] ?? ""),
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
      description: "Get a instanceGroups",
      arguments: z.object({
        identifier: z.string().describe("The name of the instanceGroups"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
        params["instanceGroup"] = args.identifier;
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
      description: "Delete the instanceGroups",
      arguments: z.object({
        identifier: z.string().describe("The name of the instanceGroups"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
        params["instanceGroup"] = args.identifier;
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
      description: "Sync instanceGroups state from GCP",
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
          if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
          else if (existing["zone"]) params["zone"] = String(existing["zone"]);
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["instanceGroup"] = identifier;
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
    list: {
      description: "List instanceGroups resources",
      arguments: z.object({
        filter: z.string().describe(
          "A filter expression that filters resources listed in the response. Most",
        ).optional(),
        maxResults: z.number().describe(
          "The maximum number of results per page that should be returned.",
        ).optional(),
        orderBy: z.string().describe(
          "Sorts list results by a certain order. By default, results",
        ).optional(),
        returnPartialSuccess: z.boolean().describe(
          "Opt-in for partial success behavior which provides partial results in case",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["maxResults"] !== undefined) {
          params["maxResults"] = String(args["maxResults"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["returnPartialSuccess"] !== undefined) {
          params["returnPartialSuccess"] = String(args["returnPartialSuccess"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "items",
          (args.maxPages as number | undefined) ?? 10,
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
    add_instances: {
      description: "add instances",
      arguments: z.object({
        instances: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
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
        params["instanceGroup"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["instances"] !== undefined) {
          body["instances"] = args["instances"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instanceGroups.addInstances",
            "path":
              "projects/{project}/zones/{zone}/instanceGroups/{instanceGroup}/addInstances",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone", "instanceGroup"],
            "parameters": {
              "instanceGroup": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    list_instances: {
      description: "list instances",
      arguments: z.object({
        instanceState: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
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
        params["instanceGroup"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["instanceState"] !== undefined) {
          body["instanceState"] = args["instanceState"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instanceGroups.listInstances",
            "path":
              "projects/{project}/zones/{zone}/instanceGroups/{instanceGroup}/listInstances",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone", "instanceGroup"],
            "parameters": {
              "filter": { "location": "query" },
              "instanceGroup": { "location": "path", "required": true },
              "maxResults": { "location": "query" },
              "orderBy": { "location": "query" },
              "pageToken": { "location": "query" },
              "project": { "location": "path", "required": true },
              "returnPartialSuccess": { "location": "query" },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    set_named_ports: {
      description: "set named ports",
      arguments: z.object({
        fingerprint: z.any().optional(),
        namedPorts: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
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
        params["instanceGroup"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["fingerprint"] !== undefined) {
          body["fingerprint"] = args["fingerprint"];
        }
        if (args["namedPorts"] !== undefined) {
          body["namedPorts"] = args["namedPorts"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.instanceGroups.setNamedPorts",
            "path":
              "projects/{project}/zones/{zone}/instanceGroups/{instanceGroup}/setNamedPorts",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone", "instanceGroup"],
            "parameters": {
              "instanceGroup": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "zone": { "location": "path", "required": true },
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
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
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
            "id": "compute.instanceGroups.testIamPermissions",
            "path":
              "projects/{project}/zones/{zone}/instanceGroups/{resource}/testIamPermissions",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone", "resource"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "resource": { "location": "path", "required": true },
              "zone": { "location": "path", "required": true },
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
