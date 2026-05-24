// Auto-generated extension model for @swamp/gcp/tagmanager/accounts-containers-workspaces-templates
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Tag Manager Accounts.Containers.Workspaces.Templates.
 *
 * Represents a Google Tag Manager Custom Template's contents.
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
  "id": "tagmanager.accounts.containers.workspaces.templates.get",
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
  "id": "tagmanager.accounts.containers.workspaces.templates.create",
  "path": "tagmanager/v2/{+parent}/templates",
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
  "id": "tagmanager.accounts.containers.workspaces.templates.update",
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
  "id": "tagmanager.accounts.containers.workspaces.templates.delete",
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
  "id": "tagmanager.accounts.containers.workspaces.templates.list",
  "path": "tagmanager/v2/{+parent}/templates",
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
    "The fingerprint of the GTM Custom Template as computed at storage time. This value is recomputed whenever the template is modified.",
  ).optional(),
  galleryReference: z.object({
    galleryTemplateId: z.string().describe(
      "ID for the gallery template that is generated once during first sync and travels with the template redirects.",
    ).optional(),
    host: z.string().describe(
      "The name of the host for the community gallery template.",
    ).optional(),
    isModified: z.boolean().describe(
      "If a user has manually edited the community gallery template.",
    ).optional(),
    owner: z.string().describe(
      "The name of the owner for the community gallery template.",
    ).optional(),
    repository: z.string().describe(
      "The name of the repository for the community gallery template.",
    ).optional(),
    signature: z.string().describe(
      "The signature of the community gallery template as computed at import time. This value is recomputed whenever the template is updated from the gallery.",
    ).optional(),
    templateDeveloperId: z.string().describe(
      "The developer id of the community gallery template. This value is set whenever the template is created from the gallery.",
    ).optional(),
    version: z.string().describe(
      "The version of the community gallery template.",
    ).optional(),
  }).describe(
    "Represents the link between a custom template and an entry on the Community Template Gallery site.",
  ).optional(),
  name: z.string().describe("Custom Template display name.").optional(),
  path: z.string().describe("GTM Custom Template's API relative path.")
    .optional(),
  tagManagerUrl: z.string().describe(
    "Auto generated link to the tag manager UI",
  ).optional(),
  templateData: z.string().describe("The custom template in text format.")
    .optional(),
  templateId: z.string().describe(
    "The Custom Template ID uniquely identifies the GTM custom template.",
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
  galleryReference: z.object({
    galleryTemplateId: z.string(),
    host: z.string(),
    isModified: z.boolean(),
    owner: z.string(),
    repository: z.string(),
    signature: z.string(),
    templateDeveloperId: z.string(),
    version: z.string(),
  }).optional(),
  name: z.string(),
  path: z.string().optional(),
  tagManagerUrl: z.string().optional(),
  templateData: z.string().optional(),
  templateId: z.string().optional(),
  workspaceId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accountId: z.string().describe("GTM Account ID.").optional(),
  containerId: z.string().describe("GTM Container ID.").optional(),
  fingerprint: z.string().describe(
    "The fingerprint of the GTM Custom Template as computed at storage time. This value is recomputed whenever the template is modified.",
  ).optional(),
  galleryReference: z.object({
    galleryTemplateId: z.string().describe(
      "ID for the gallery template that is generated once during first sync and travels with the template redirects.",
    ).optional(),
    host: z.string().describe(
      "The name of the host for the community gallery template.",
    ).optional(),
    isModified: z.boolean().describe(
      "If a user has manually edited the community gallery template.",
    ).optional(),
    owner: z.string().describe(
      "The name of the owner for the community gallery template.",
    ).optional(),
    repository: z.string().describe(
      "The name of the repository for the community gallery template.",
    ).optional(),
    signature: z.string().describe(
      "The signature of the community gallery template as computed at import time. This value is recomputed whenever the template is updated from the gallery.",
    ).optional(),
    templateDeveloperId: z.string().describe(
      "The developer id of the community gallery template. This value is set whenever the template is created from the gallery.",
    ).optional(),
    version: z.string().describe(
      "The version of the community gallery template.",
    ).optional(),
  }).describe(
    "Represents the link between a custom template and an entry on the Community Template Gallery site.",
  ).optional(),
  name: z.string().describe("Custom Template display name.").optional(),
  path: z.string().describe("GTM Custom Template's API relative path.")
    .optional(),
  tagManagerUrl: z.string().describe(
    "Auto generated link to the tag manager UI",
  ).optional(),
  templateData: z.string().describe("The custom template in text format.")
    .optional(),
  templateId: z.string().describe(
    "The Custom Template ID uniquely identifies the GTM custom template.",
  ).optional(),
  workspaceId: z.string().describe("GTM Workspace ID.").optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Tag Manager Accounts.Containers.Workspaces.Templates. Registered at `@swamp/gcp/tagmanager/accounts-containers-workspaces-templates`. */
export const model = {
  type: "@swamp/gcp/tagmanager/accounts-containers-workspaces-templates",
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
        "Represents a Google Tag Manager Custom Template's contents.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a templates",
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
        if (g["galleryReference"] !== undefined) {
          body["galleryReference"] = g["galleryReference"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["path"] !== undefined) body["path"] = g["path"];
        if (g["tagManagerUrl"] !== undefined) {
          body["tagManagerUrl"] = g["tagManagerUrl"];
        }
        if (g["templateData"] !== undefined) {
          body["templateData"] = g["templateData"];
        }
        if (g["templateId"] !== undefined) body["templateId"] = g["templateId"];
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
      description: "Get a templates",
      arguments: z.object({
        identifier: z.string().describe("The name of the templates"),
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
      description: "Update templates attributes",
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
        if (g["galleryReference"] !== undefined) {
          body["galleryReference"] = g["galleryReference"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["tagManagerUrl"] !== undefined) {
          body["tagManagerUrl"] = g["tagManagerUrl"];
        }
        if (g["templateData"] !== undefined) {
          body["templateData"] = g["templateData"];
        }
        if (g["templateId"] !== undefined) body["templateId"] = g["templateId"];
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
      description: "Delete the templates",
      arguments: z.object({
        identifier: z.string().describe("The name of the templates"),
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
      description: "Sync templates state from GCP",
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
    import_from_gallery: {
      description: "import_from_gallery",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "tagmanager.accounts.containers.workspaces.templates.import_from_gallery",
            "path": "tagmanager/v2/{+parent}/templates:import_from_gallery",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "acknowledgePermissions": { "location": "query" },
              "galleryOwner": { "location": "query" },
              "galleryRepository": { "location": "query" },
              "gallerySha": { "location": "query" },
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          {},
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
            "id": "tagmanager.accounts.containers.workspaces.templates.revert",
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
