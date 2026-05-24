// Auto-generated extension model for @swamp/gcp/networkconnectivity/global-hubs-groups
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Network Connectivity Global.Hubs.Groups.
 *
 * A group represents a subset of spokes attached to a hub.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/groups/${shortName}`;
}

const BASE_URL = "https://networkconnectivity.googleapis.com/";

const GET_CONFIG = {
  "id": "networkconnectivity.projects.locations.global.hubs.groups.get",
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

const PATCH_CONFIG = {
  "id": "networkconnectivity.projects.locations.global.hubs.groups.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  autoAccept: z.object({
    autoAcceptProjects: z.array(z.string()).describe(
      "Optional. A list of project ids or project numbers for which you want to enable auto-accept. The auto-accept setting is applied to spokes being created or updated in these projects.",
    ).optional(),
  }).describe(
    "The auto-accept setting for a group controls whether proposed spokes are automatically attached to the hub. If auto-accept is enabled, the spoke immediately is attached to the hub and becomes part of the group. In this case, the new spoke is in the ACTIVE state. If auto-accept is disabled, the spoke goes to the INACTIVE state, and it must be reviewed and accepted by a hub administrator.",
  ).optional(),
  createTime: z.string().describe(
    "Output only. The time the group was created.",
  ).optional(),
  description: z.string().describe("Optional. The description of the group.")
    .optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels in key-value pair format. For more information about labels, see [Requirements for labels](https://cloud.google.com/resource-manager/docs/creating-managing-labels#requirements).",
  ).optional(),
  name: z.string().describe(
    "Immutable. The name of the group. Group names must be unique. They use the following form: `projects/{project_number}/locations/global/hubs/{hub}/groups/{group_id}`",
  ).optional(),
  routeTable: z.string().describe(
    "Output only. The name of the route table that corresponds to this group. They use the following form: `projects/{project_number}/locations/global/hubs/{hub_id}/routeTables/{route_table_id}`",
  ).optional(),
  state: z.enum([
    "STATE_UNSPECIFIED",
    "CREATING",
    "ACTIVE",
    "DELETING",
    "ACCEPTING",
    "REJECTING",
    "UPDATING",
    "INACTIVE",
    "OBSOLETE",
    "FAILED",
  ]).describe("Output only. The current lifecycle state of this group.")
    .optional(),
  uid: z.string().describe(
    "Output only. The Google-generated UUID for the group. This value is unique across all group resources. If a group is deleted and another with the same name is created, the new route table is assigned a different unique_id.",
  ).optional(),
  updateTime: z.string().describe(
    "Output only. The time the group was last updated.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  autoAccept: z.object({
    autoAcceptProjects: z.array(z.string()),
  }).optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  routeTable: z.string().optional(),
  state: z.string().optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  autoAccept: z.object({
    autoAcceptProjects: z.array(z.string()).describe(
      "Optional. A list of project ids or project numbers for which you want to enable auto-accept. The auto-accept setting is applied to spokes being created or updated in these projects.",
    ).optional(),
  }).describe(
    "The auto-accept setting for a group controls whether proposed spokes are automatically attached to the hub. If auto-accept is enabled, the spoke immediately is attached to the hub and becomes part of the group. In this case, the new spoke is in the ACTIVE state. If auto-accept is disabled, the spoke goes to the INACTIVE state, and it must be reviewed and accepted by a hub administrator.",
  ).optional(),
  createTime: z.string().describe(
    "Output only. The time the group was created.",
  ).optional(),
  description: z.string().describe("Optional. The description of the group.")
    .optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels in key-value pair format. For more information about labels, see [Requirements for labels](https://cloud.google.com/resource-manager/docs/creating-managing-labels#requirements).",
  ).optional(),
  name: z.string().describe(
    "Immutable. The name of the group. Group names must be unique. They use the following form: `projects/{project_number}/locations/global/hubs/{hub}/groups/{group_id}`",
  ).optional(),
  routeTable: z.string().describe(
    "Output only. The name of the route table that corresponds to this group. They use the following form: `projects/{project_number}/locations/global/hubs/{hub_id}/routeTables/{route_table_id}`",
  ).optional(),
  state: z.enum([
    "STATE_UNSPECIFIED",
    "CREATING",
    "ACTIVE",
    "DELETING",
    "ACCEPTING",
    "REJECTING",
    "UPDATING",
    "INACTIVE",
    "OBSOLETE",
    "FAILED",
  ]).describe("Output only. The current lifecycle state of this group.")
    .optional(),
  uid: z.string().describe(
    "Output only. The Google-generated UUID for the group. This value is unique across all group resources. If a group is deleted and another with the same name is created, the new route table is assigned a different unique_id.",
  ).optional(),
  updateTime: z.string().describe(
    "Output only. The time the group was last updated.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Network Connectivity Global.Hubs.Groups. Registered at `@swamp/gcp/networkconnectivity/global-hubs-groups`. */
export const model = {
  type: "@swamp/gcp/networkconnectivity/global-hubs-groups",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A group represents a subset of spokes attached to a hub.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a groups",
      arguments: z.object({
        identifier: z.string().describe("The name of the groups"),
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
    update: {
      description: "Update groups attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
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
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["autoAccept"] !== undefined) body["autoAccept"] = g["autoAccept"];
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["routeTable"] !== undefined) body["routeTable"] = g["routeTable"];
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["uid"] !== undefined) body["uid"] = g["uid"];
        if (g["updateTime"] !== undefined) body["updateTime"] = g["updateTime"];
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
          PATCH_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": ["FAILED"],
            }
            : undefined,
        ) as StateData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync groups state from GCP",
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
              "networkconnectivity.projects.locations.global.hubs.groups.getIamPolicy",
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
              "networkconnectivity.projects.locations.global.hubs.groups.setIamPolicy",
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
              "networkconnectivity.projects.locations.global.hubs.groups.testIamPermissions",
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
