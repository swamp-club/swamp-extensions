// Auto-generated extension model for @swamp/gcp/tagmanager/accounts-containers-workspaces-folders
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Tag Manager Accounts.Containers.Workspaces.Folders.
 *
 * Represents a Google Tag Manager Folder.
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

const BASE_URL = "https://tagmanager.googleapis.com/";

const GET_CONFIG = {
  "id": "tagmanager.accounts.containers.workspaces.folders.get",
  "path": "tagmanager/v2/{+path}",
  "httpMethod": "GET",
  "parameterOrder": [
    "path",
  ],
  "parameters": {
    "path": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "tagmanager.accounts.containers.workspaces.folders.create",
  "path": "tagmanager/v2/{+parent}/folders",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "tagmanager.accounts.containers.workspaces.folders.update",
  "path": "tagmanager/v2/{+path}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "path",
  ],
  "parameters": {
    "fingerprint": {
      "location": "query",
    },
    "path": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "tagmanager.accounts.containers.workspaces.folders.delete",
  "path": "tagmanager/v2/{+path}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "path",
  ],
  "parameters": {
    "path": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "tagmanager.accounts.containers.workspaces.folders.list",
  "path": "tagmanager/v2/{+parent}/folders",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
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
  accountId: z.string().describe("GTM Account ID.").optional(),
  containerId: z.string().describe("GTM Container ID.").optional(),
  fingerprint: z.string().describe(
    "The fingerprint of the GTM Folder as computed at storage time. This value is recomputed whenever the folder is modified.",
  ).optional(),
  folderId: z.string().describe(
    "The Folder ID uniquely identifies the GTM Folder.",
  ).optional(),
  name: z.string().describe("Folder display name.").optional(),
  notes: z.string().describe(
    "User notes on how to apply this folder in the container.",
  ).optional(),
  path: z.string().describe("GTM Folder's API relative path.").optional(),
  tagManagerUrl: z.string().describe(
    "Auto generated link to the tag manager UI",
  ).optional(),
  workspaceId: z.string().describe("GTM Workspace ID.").optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  accountId: z.string().optional(),
  containerId: z.string().optional(),
  fingerprint: z.string().optional(),
  folderId: z.string().optional(),
  name: z.string(),
  notes: z.string().optional(),
  path: z.string().optional(),
  tagManagerUrl: z.string().optional(),
  workspaceId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accountId: z.string().describe("GTM Account ID.").optional(),
  containerId: z.string().describe("GTM Container ID.").optional(),
  fingerprint: z.string().describe(
    "The fingerprint of the GTM Folder as computed at storage time. This value is recomputed whenever the folder is modified.",
  ).optional(),
  folderId: z.string().describe(
    "The Folder ID uniquely identifies the GTM Folder.",
  ).optional(),
  name: z.string().describe("Folder display name.").optional(),
  notes: z.string().describe(
    "User notes on how to apply this folder in the container.",
  ).optional(),
  path: z.string().describe("GTM Folder's API relative path.").optional(),
  tagManagerUrl: z.string().describe(
    "Auto generated link to the tag manager UI",
  ).optional(),
  workspaceId: z.string().describe("GTM Workspace ID.").optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Tag Manager Accounts.Containers.Workspaces.Folders. Registered at `@swamp/gcp/tagmanager/accounts-containers-workspaces-folders`. */
export const model = {
  type: "@swamp/gcp/tagmanager/accounts-containers-workspaces-folders",
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
      description: "Represents a Google Tag Manager Folder.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a folders",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["accountId"] !== undefined) body["accountId"] = g["accountId"];
        if (g["containerId"] !== undefined) {
          body["containerId"] = g["containerId"];
        }
        if (g["fingerprint"] !== undefined) {
          body["fingerprint"] = g["fingerprint"];
        }
        if (g["folderId"] !== undefined) body["folderId"] = g["folderId"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["notes"] !== undefined) body["notes"] = g["notes"];
        if (g["path"] !== undefined) body["path"] = g["path"];
        if (g["tagManagerUrl"] !== undefined) {
          body["tagManagerUrl"] = g["tagManagerUrl"];
        }
        if (g["workspaceId"] !== undefined) {
          body["workspaceId"] = g["workspaceId"];
        }
        if (g["name"] !== undefined) params["path"] = String(g["name"]);
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
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
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
      description: "Get a folders",
      arguments: z.object({
        identifier: z.string().describe("The name of the folders"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["path"] = args.identifier;
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
      description: "Update folders attributes",
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
        params["path"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["accountId"] !== undefined) body["accountId"] = g["accountId"];
        if (g["containerId"] !== undefined) {
          body["containerId"] = g["containerId"];
        }
        if (g["fingerprint"] !== undefined) {
          body["fingerprint"] = g["fingerprint"];
        }
        if (g["folderId"] !== undefined) body["folderId"] = g["folderId"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["notes"] !== undefined) body["notes"] = g["notes"];
        if (g["tagManagerUrl"] !== undefined) {
          body["tagManagerUrl"] = g["tagManagerUrl"];
        }
        if (g["workspaceId"] !== undefined) {
          body["workspaceId"] = g["workspaceId"];
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
      description: "Delete the folders",
      arguments: z.object({
        identifier: z.string().describe("The name of the folders"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["path"] = args.identifier;
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
      description: "Sync folders state from GCP",
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
          params["path"] = identifier;
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
    entities: {
      description: "entities",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["path"] !== undefined) params["path"] = String(g["path"]);
        const result = await createResource(
          BASE_URL,
          {
            "id": "tagmanager.accounts.containers.workspaces.folders.entities",
            "path": "tagmanager/v2/{+path}:entities",
            "httpMethod": "POST",
            "parameterOrder": ["path"],
            "parameters": {
              "pageToken": { "location": "query" },
              "path": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    move_entities_to_folder: {
      description: "move_entities_to_folder",
      arguments: z.object({
        accountId: z.any().optional(),
        containerId: z.any().optional(),
        fingerprint: z.any().optional(),
        folderId: z.any().optional(),
        name: z.any().optional(),
        notes: z.any().optional(),
        path: z.any().optional(),
        tagManagerUrl: z.any().optional(),
        workspaceId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["path"] !== undefined) params["path"] = String(g["path"]);
        const body: Record<string, unknown> = {};
        if (args["accountId"] !== undefined) {
          body["accountId"] = args["accountId"];
        }
        if (args["containerId"] !== undefined) {
          body["containerId"] = args["containerId"];
        }
        if (args["fingerprint"] !== undefined) {
          body["fingerprint"] = args["fingerprint"];
        }
        if (args["folderId"] !== undefined) body["folderId"] = args["folderId"];
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["notes"] !== undefined) body["notes"] = args["notes"];
        if (args["path"] !== undefined) body["path"] = args["path"];
        if (args["tagManagerUrl"] !== undefined) {
          body["tagManagerUrl"] = args["tagManagerUrl"];
        }
        if (args["workspaceId"] !== undefined) {
          body["workspaceId"] = args["workspaceId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "tagmanager.accounts.containers.workspaces.folders.move_entities_to_folder",
            "path": "tagmanager/v2/{+path}:move_entities_to_folder",
            "httpMethod": "POST",
            "parameterOrder": ["path"],
            "parameters": {
              "path": { "location": "path", "required": true },
              "tagId": { "location": "query" },
              "triggerId": { "location": "query" },
              "variableId": { "location": "query" },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    revert: {
      description: "revert",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["path"] !== undefined) params["path"] = String(g["path"]);
        const result = await createResource(
          BASE_URL,
          {
            "id": "tagmanager.accounts.containers.workspaces.folders.revert",
            "path": "tagmanager/v2/{+path}:revert",
            "httpMethod": "POST",
            "parameterOrder": ["path"],
            "parameters": {
              "fingerprint": { "location": "query" },
              "path": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
  },
};
