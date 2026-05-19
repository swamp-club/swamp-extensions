// Auto-generated extension model for @swamp/gcp/workstations/workstationclusters-workstationconfigs-workstations
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Workstations WorkstationClusters.WorkstationConfigs.Workstations.
 *
 * A single instance of a developer workstation with its own persistent storage.
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

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/workstations/${shortName}`;
}

const BASE_URL = "https://workstations.googleapis.com/";

const GET_CONFIG = {
  "id":
    "workstations.projects.locations.workstationClusters.workstationConfigs.workstations.get",
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
  "id":
    "workstations.projects.locations.workstationClusters.workstationConfigs.workstations.create",
  "path": "v1/{+parent}/workstations",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "validateOnly": {
      "location": "query",
    },
    "workstationId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id":
    "workstations.projects.locations.workstationClusters.workstationConfigs.workstations.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "allowMissing": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id":
    "workstations.projects.locations.workstationClusters.workstationConfigs.workstations.delete",
  "path": "v1/{+name}",
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

const GlobalArgsSchema = z.object({
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. Client-specified annotations.",
  ).optional(),
  displayName: z.string().describe(
    "Optional. Human-readable name for this workstation.",
  ).optional(),
  env: z.record(z.string(), z.string()).describe(
    "Optional. Environment variables passed to the workstation container's entrypoint.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. [Labels](https://cloud.google.com/workstations/docs/label-resources) that are applied to the workstation and that are also propagated to the underlying Compute Engine resources.",
  ).optional(),
  name: z.string().describe("Identifier. Full name of this workstation.")
    .optional(),
  runtimeHost: z.object({
    gceInstanceHost: z.object({
      id: z.string().describe(
        "Optional. Output only. The ID of the Compute Engine instance.",
      ).optional(),
      name: z.string().describe(
        "Optional. Output only. The name of the Compute Engine instance.",
      ).optional(),
      zone: z.string().describe(
        "Optional. Output only. The zone of the Compute Engine instance.",
      ).optional(),
    }).describe("The Compute Engine instance host.").optional(),
  }).describe("Runtime host for the workstation.").optional(),
  sourceWorkstation: z.string().describe(
    "Optional. The source workstation from which this workstation's persistent directories were cloned on creation.",
  ).optional(),
  workstationId: z.string().describe("Required. ID to use for the workstation.")
    .optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  annotations: z.record(z.string(), z.unknown()).optional(),
  createTime: z.string().optional(),
  deleteTime: z.string().optional(),
  displayName: z.string().optional(),
  env: z.record(z.string(), z.unknown()).optional(),
  etag: z.string().optional(),
  host: z.string().optional(),
  kmsKey: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  reconciling: z.boolean().optional(),
  runtimeHost: z.object({
    gceInstanceHost: z.object({
      id: z.string(),
      name: z.string(),
      zone: z.string(),
    }),
  }).optional(),
  sourceWorkstation: z.string().optional(),
  startTime: z.string().optional(),
  state: z.string().optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. Client-specified annotations.",
  ).optional(),
  displayName: z.string().describe(
    "Optional. Human-readable name for this workstation.",
  ).optional(),
  env: z.record(z.string(), z.string()).describe(
    "Optional. Environment variables passed to the workstation container's entrypoint.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. [Labels](https://cloud.google.com/workstations/docs/label-resources) that are applied to the workstation and that are also propagated to the underlying Compute Engine resources.",
  ).optional(),
  name: z.string().describe("Identifier. Full name of this workstation.")
    .optional(),
  runtimeHost: z.object({
    gceInstanceHost: z.object({
      id: z.string().describe(
        "Optional. Output only. The ID of the Compute Engine instance.",
      ).optional(),
      name: z.string().describe(
        "Optional. Output only. The name of the Compute Engine instance.",
      ).optional(),
      zone: z.string().describe(
        "Optional. Output only. The zone of the Compute Engine instance.",
      ).optional(),
    }).describe("The Compute Engine instance host.").optional(),
  }).describe("Runtime host for the workstation.").optional(),
  sourceWorkstation: z.string().describe(
    "Optional. The source workstation from which this workstation's persistent directories were cloned on creation.",
  ).optional(),
  workstationId: z.string().describe("Required. ID to use for the workstation.")
    .optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Workstations WorkstationClusters.WorkstationConfigs.Workstations. Registered at `@swamp/gcp/workstations/workstationclusters-workstationconfigs-workstations`. */
export const model = {
  type:
    "@swamp/gcp/workstations/workstationclusters-workstationconfigs-workstations",
  version: "2026.05.19.2",
  upgrades: [
    {
      toVersion: "2026.04.01.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A single instance of a developer workstation with its own persistent storage.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a workstations",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["env"] !== undefined) body["env"] = g["env"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["runtimeHost"] !== undefined) {
          body["runtimeHost"] = g["runtimeHost"];
        }
        if (g["sourceWorkstation"] !== undefined) {
          body["sourceWorkstation"] = g["sourceWorkstation"];
        }
        if (g["workstationId"] !== undefined) {
          body["workstationId"] = g["workstationId"];
        }
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
      description: "Get a workstations",
      arguments: z.object({
        identifier: z.string().describe("The name of the workstations"),
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
      description: "Update workstations attributes",
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
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["env"] !== undefined) body["env"] = g["env"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["runtimeHost"] !== undefined) {
          body["runtimeHost"] = g["runtimeHost"];
        }
        if (g["sourceWorkstation"] !== undefined) {
          body["sourceWorkstation"] = g["sourceWorkstation"];
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
          PATCH_CONFIG,
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
      description: "Delete the workstations",
      arguments: z.object({
        identifier: z.string().describe("The name of the workstations"),
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
      description: "Sync workstations state from GCP",
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
    generate_access_token: {
      description: "generate access token",
      arguments: z.object({
        expireTime: z.any().optional(),
        port: z.any().optional(),
        ttl: z.any().optional(),
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
        params["workstation"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["expireTime"] !== undefined) {
          body["expireTime"] = args["expireTime"];
        }
        if (args["port"] !== undefined) body["port"] = args["port"];
        if (args["ttl"] !== undefined) body["ttl"] = args["ttl"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "workstations.projects.locations.workstationClusters.workstationConfigs.workstations.generateAccessToken",
            "path": "v1/{+workstation}:generateAccessToken",
            "httpMethod": "POST",
            "parameterOrder": ["workstation"],
            "parameters": {
              "workstation": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    list_usable: {
      description: "list usable",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "workstations.projects.locations.workstationClusters.workstationConfigs.workstations.listUsable",
            "path": "v1/{+parent}/workstations:listUsable",
            "httpMethod": "GET",
            "parameterOrder": ["parent"],
            "parameters": {
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    start: {
      description: "start",
      arguments: z.object({
        boostConfig: z.any().optional(),
        etag: z.any().optional(),
        validateOnly: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["boostConfig"] !== undefined) {
          body["boostConfig"] = args["boostConfig"];
        }
        if (args["etag"] !== undefined) body["etag"] = args["etag"];
        if (args["validateOnly"] !== undefined) {
          body["validateOnly"] = args["validateOnly"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "workstations.projects.locations.workstationClusters.workstationConfigs.workstations.start",
            "path": "v1/{+name}:start",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    stop: {
      description: "stop",
      arguments: z.object({
        etag: z.any().optional(),
        validateOnly: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["etag"] !== undefined) body["etag"] = args["etag"];
        if (args["validateOnly"] !== undefined) {
          body["validateOnly"] = args["validateOnly"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "workstations.projects.locations.workstationClusters.workstationConfigs.workstations.stop",
            "path": "v1/{+name}:stop",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
