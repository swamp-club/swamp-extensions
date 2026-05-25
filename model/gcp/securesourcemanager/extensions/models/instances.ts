// Auto-generated extension model for @swamp/gcp/securesourcemanager/instances
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Secure Source Manager Instances.
 *
 * A resource that represents a Secure Source Manager instance.
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

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/instances/${shortName}`;
}

const BASE_URL = "https://securesourcemanager.googleapis.com/";

const GET_CONFIG = {
  "id": "securesourcemanager.projects.locations.instances.get",
  "path": "v1/{+name}",
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

const INSERT_CONFIG = {
  "id": "securesourcemanager.projects.locations.instances.create",
  "path": "v1/{+parent}/instances",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "instanceId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "securesourcemanager.projects.locations.instances.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "force": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "securesourcemanager.projects.locations.instances.list",
  "path": "v1/{+parent}/instances",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "orderBy": {
      "location": "query",
    },
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
  },
} as const;

const GlobalArgsSchema = z.object({
  hostConfig: z.object({
    api: z.string().describe("Output only. API hostname.").optional(),
    gitHttp: z.string().describe("Output only. Git HTTP hostname.").optional(),
    gitSsh: z.string().describe("Output only. Git SSH hostname.").optional(),
    html: z.string().describe("Output only. HTML hostname.").optional(),
  }).describe("HostConfig has different instance endpoints.").optional(),
  kmsKey: z.string().describe(
    "Optional. Immutable. Customer-managed encryption key name, in the format projects/*/locations/*/keyRings/*/cryptoKeys/*.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels as key value pairs. Keys and values can contain only lowercase letters, numeric characters, underscores, and dashes. For more information, see [Requirements for labels](https://cloud.google.com/resource-manager/docs/best-practices-labels#label_encoding).",
  ).optional(),
  name: z.string().describe(
    "Identifier. A unique identifier for an instance. The name should be of the format: `projects/{project_number}/locations/{location_id}/instances/{instance_id}` `project_number`: Maps to a unique int64 id assigned to each project. `location_id`: Refers to the region where the instance will be deployed. Since Secure Source Manager is a regional service, it must be one of the valid GCP regions. `instance_id`: User provided name for the instance, must be unique for a project_number and location_id combination.",
  ).optional(),
  privateConfig: z.object({
    caPool: z.string().describe(
      "Optional. Immutable. CA pool resource, resource must in the format of `projects/{project}/locations/{location}/caPools/{ca_pool}`.",
    ).optional(),
    customHostConfig: z.object({
      api: z.string().describe(
        'Required. The custom API hostname for the instance, e.g., "api.source.internal.mycompany.com"',
      ).optional(),
      gitHttp: z.string().describe(
        'Required. The custom git http hostname for the instance, e.g., "git.source.internal.mycompany.com"',
      ).optional(),
      gitSsh: z.string().describe(
        'Required. The custom git ssh hostname for the instance, e.g., "ssh.source.internal.mycompany.com"',
      ).optional(),
      html: z.string().describe(
        'Required. The custom UI hostname for the instance, e.g., "git.source.internal.mycompany.com"',
      ).optional(),
    }).describe("Custom host config for the instance.").optional(),
    httpServiceAttachment: z.string().describe(
      "Output only. Service Attachment for HTTP, resource is in the format of `projects/{project}/regions/{region}/serviceAttachments/{service_attachment}`.",
    ).optional(),
    isPrivate: z.boolean().describe(
      "Required. Immutable. Indicate if it's private instance.",
    ).optional(),
    pscAllowedProjects: z.array(z.string()).describe(
      "Optional. Additional allowed projects for setting up PSC connections. Instance host project is automatically allowed and does not need to be included in this list.",
    ).optional(),
    sshServiceAttachment: z.string().describe(
      "Output only. Service Attachment for SSH, resource is in the format of `projects/{project}/regions/{region}/serviceAttachments/{service_attachment}`.",
    ).optional(),
  }).describe("PrivateConfig includes settings for private instance.")
    .optional(),
  workforceIdentityFederationConfig: z.object({
    enabled: z.boolean().describe(
      "Optional. Immutable. Whether Workforce Identity Federation is enabled.",
    ).optional(),
  }).describe(
    "WorkforceIdentityFederationConfig allows this instance to support users from external identity providers.",
  ).optional(),
  instanceId: z.string().describe("Required. ID of the instance to be created.")
    .optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  hostConfig: z.object({
    api: z.string(),
    gitHttp: z.string(),
    gitSsh: z.string(),
    html: z.string(),
  }).optional(),
  kmsKey: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  privateConfig: z.object({
    caPool: z.string(),
    customHostConfig: z.object({
      api: z.string(),
      gitHttp: z.string(),
      gitSsh: z.string(),
      html: z.string(),
    }),
    httpServiceAttachment: z.string(),
    isPrivate: z.boolean(),
    pscAllowedProjects: z.array(z.string()),
    sshServiceAttachment: z.string(),
  }).optional(),
  state: z.string().optional(),
  stateNote: z.string().optional(),
  updateTime: z.string().optional(),
  workforceIdentityFederationConfig: z.object({
    enabled: z.boolean(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  hostConfig: z.object({
    api: z.string().describe("Output only. API hostname.").optional(),
    gitHttp: z.string().describe("Output only. Git HTTP hostname.").optional(),
    gitSsh: z.string().describe("Output only. Git SSH hostname.").optional(),
    html: z.string().describe("Output only. HTML hostname.").optional(),
  }).describe("HostConfig has different instance endpoints.").optional(),
  kmsKey: z.string().describe(
    "Optional. Immutable. Customer-managed encryption key name, in the format projects/*/locations/*/keyRings/*/cryptoKeys/*.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels as key value pairs. Keys and values can contain only lowercase letters, numeric characters, underscores, and dashes. For more information, see [Requirements for labels](https://cloud.google.com/resource-manager/docs/best-practices-labels#label_encoding).",
  ).optional(),
  name: z.string().describe(
    "Identifier. A unique identifier for an instance. The name should be of the format: `projects/{project_number}/locations/{location_id}/instances/{instance_id}` `project_number`: Maps to a unique int64 id assigned to each project. `location_id`: Refers to the region where the instance will be deployed. Since Secure Source Manager is a regional service, it must be one of the valid GCP regions. `instance_id`: User provided name for the instance, must be unique for a project_number and location_id combination.",
  ).optional(),
  privateConfig: z.object({
    caPool: z.string().describe(
      "Optional. Immutable. CA pool resource, resource must in the format of `projects/{project}/locations/{location}/caPools/{ca_pool}`.",
    ).optional(),
    customHostConfig: z.object({
      api: z.string().describe(
        'Required. The custom API hostname for the instance, e.g., "api.source.internal.mycompany.com"',
      ).optional(),
      gitHttp: z.string().describe(
        'Required. The custom git http hostname for the instance, e.g., "git.source.internal.mycompany.com"',
      ).optional(),
      gitSsh: z.string().describe(
        'Required. The custom git ssh hostname for the instance, e.g., "ssh.source.internal.mycompany.com"',
      ).optional(),
      html: z.string().describe(
        'Required. The custom UI hostname for the instance, e.g., "git.source.internal.mycompany.com"',
      ).optional(),
    }).describe("Custom host config for the instance.").optional(),
    httpServiceAttachment: z.string().describe(
      "Output only. Service Attachment for HTTP, resource is in the format of `projects/{project}/regions/{region}/serviceAttachments/{service_attachment}`.",
    ).optional(),
    isPrivate: z.boolean().describe(
      "Required. Immutable. Indicate if it's private instance.",
    ).optional(),
    pscAllowedProjects: z.array(z.string()).describe(
      "Optional. Additional allowed projects for setting up PSC connections. Instance host project is automatically allowed and does not need to be included in this list.",
    ).optional(),
    sshServiceAttachment: z.string().describe(
      "Output only. Service Attachment for SSH, resource is in the format of `projects/{project}/regions/{region}/serviceAttachments/{service_attachment}`.",
    ).optional(),
  }).describe("PrivateConfig includes settings for private instance.")
    .optional(),
  workforceIdentityFederationConfig: z.object({
    enabled: z.boolean().describe(
      "Optional. Immutable. Whether Workforce Identity Federation is enabled.",
    ).optional(),
  }).describe(
    "WorkforceIdentityFederationConfig allows this instance to support users from external identity providers.",
  ).optional(),
  instanceId: z.string().describe("Required. ID of the instance to be created.")
    .optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Secure Source Manager Instances. Registered at `@swamp/gcp/securesourcemanager/instances`. */
export const model = {
  type: "@swamp/gcp/securesourcemanager/instances",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A resource that represents a Secure Source Manager instance.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a instances",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["hostConfig"] !== undefined) body["hostConfig"] = g["hostConfig"];
        if (g["kmsKey"] !== undefined) body["kmsKey"] = g["kmsKey"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["privateConfig"] !== undefined) {
          body["privateConfig"] = g["privateConfig"];
        }
        if (g["workforceIdentityFederationConfig"] !== undefined) {
          body["workforceIdentityFederationConfig"] =
            g["workforceIdentityFederationConfig"];
        }
        if (g["instanceId"] !== undefined) body["instanceId"] = g["instanceId"];
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": [],
            }
            : undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": `projects/${projectId}/locations/${
                String(g["location"] ?? "")
              }`,
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
      description: "Get a instances",
      arguments: z.object({
        identifier: z.string().describe("The name of the instances"),
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
      description: "Delete the instances",
      arguments: z.object({
        identifier: z.string().describe("The name of the instances"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
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
      description: "Sync instances state from GCP",
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
    list: {
      description: "List instances resources",
      arguments: z.object({
        filter: z.string().describe("Optional. Filter for filtering results.")
          .optional(),
        orderBy: z.string().describe(
          "Optional. Hint for how to order the results.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "instances",
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
    get_iam_policy: {
      description: "get iam policy",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
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
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "securesourcemanager.projects.locations.instances.getIamPolicy",
            "path": "v1/{+resource}:getIamPolicy",
            "httpMethod": "GET",
            "parameterOrder": ["resource"],
            "parameters": {
              "options.requestedPolicyVersion": { "location": "query" },
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
        policy: z.any().optional(),
        updateMask: z.any().optional(),
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
        if (args["policy"] !== undefined) body["policy"] = args["policy"];
        if (args["updateMask"] !== undefined) {
          body["updateMask"] = args["updateMask"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "securesourcemanager.projects.locations.instances.setIamPolicy",
            "path": "v1/{+resource}:setIamPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
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
            "id":
              "securesourcemanager.projects.locations.instances.testIamPermissions",
            "path": "v1/{+resource}:testIamPermissions",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
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
