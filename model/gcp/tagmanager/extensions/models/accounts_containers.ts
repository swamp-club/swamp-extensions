// Auto-generated extension model for @swamp/gcp/tagmanager/accounts-containers
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Tag Manager Accounts.Containers.
 *
 * Represents a Google Tag Manager Container, which specifies the platform tags will run on, manages workspaces, and retains container versions.
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
  "id": "tagmanager.accounts.containers.get",
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
  "id": "tagmanager.accounts.containers.create",
  "path": "tagmanager/v2/{+parent}/containers",
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
  "id": "tagmanager.accounts.containers.update",
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
  "id": "tagmanager.accounts.containers.delete",
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
  "id": "tagmanager.accounts.containers.list",
  "path": "tagmanager/v2/{+parent}/containers",
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
  containerId: z.string().describe(
    "The Container ID uniquely identifies the GTM Container.",
  ).optional(),
  domainName: z.array(z.string()).describe(
    "List of domain names associated with the Container.",
  ).optional(),
  features: z.object({
    supportBuiltInVariables: z.boolean().describe(
      "Whether this Container supports built-in variables",
    ).optional(),
    supportClients: z.boolean().describe(
      "Whether this Container supports clients.",
    ).optional(),
    supportEnvironments: z.boolean().describe(
      "Whether this Container supports environments.",
    ).optional(),
    supportFolders: z.boolean().describe(
      "Whether this Container supports folders.",
    ).optional(),
    supportGtagConfigs: z.boolean().describe(
      "Whether this Container supports Google tag config.",
    ).optional(),
    supportTags: z.boolean().describe("Whether this Container supports tags.")
      .optional(),
    supportTemplates: z.boolean().describe(
      "Whether this Container supports templates.",
    ).optional(),
    supportTransformations: z.boolean().describe(
      "Whether this Container supports transformations.",
    ).optional(),
    supportTriggers: z.boolean().describe(
      "Whether this Container supports triggers.",
    ).optional(),
    supportUserPermissions: z.boolean().describe(
      "Whether this Container supports user permissions managed by GTM.",
    ).optional(),
    supportVariables: z.boolean().describe(
      "Whether this Container supports variables.",
    ).optional(),
    supportVersions: z.boolean().describe(
      "Whether this Container supports Container versions.",
    ).optional(),
    supportWorkspaces: z.boolean().describe(
      "Whether this Container supports workspaces.",
    ).optional(),
    supportZones: z.boolean().describe("Whether this Container supports zones.")
      .optional(),
  }).optional(),
  fingerprint: z.string().describe(
    "The fingerprint of the GTM Container as computed at storage time. This value is recomputed whenever the account is modified.",
  ).optional(),
  name: z.string().describe("Container display name.").optional(),
  notes: z.string().describe("Container Notes.").optional(),
  path: z.string().describe("GTM Container's API relative path.").optional(),
  publicId: z.string().describe("Container Public ID.").optional(),
  tagIds: z.array(z.string()).describe(
    "All Tag IDs that refer to this Container.",
  ).optional(),
  tagManagerUrl: z.string().describe(
    "Auto generated link to the tag manager UI",
  ).optional(),
  taggingServerUrls: z.array(z.string()).describe(
    "List of server-side container URLs for the Container. If multiple URLs are provided, all URL paths must match.",
  ).optional(),
  usageContext: z.array(
    z.enum([
      "usageContextUnspecified",
      "web",
      "android",
      "ios",
      "androidSdk5",
      "iosSdk5",
      "amp",
      "server",
    ]),
  ).describe(
    "List of Usage Contexts for the Container. Valid values include: web, android, or ios.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  accountId: z.string().optional(),
  containerId: z.string().optional(),
  domainName: z.array(z.string()).optional(),
  features: z.object({
    supportBuiltInVariables: z.boolean(),
    supportClients: z.boolean(),
    supportEnvironments: z.boolean(),
    supportFolders: z.boolean(),
    supportGtagConfigs: z.boolean(),
    supportTags: z.boolean(),
    supportTemplates: z.boolean(),
    supportTransformations: z.boolean(),
    supportTriggers: z.boolean(),
    supportUserPermissions: z.boolean(),
    supportVariables: z.boolean(),
    supportVersions: z.boolean(),
    supportWorkspaces: z.boolean(),
    supportZones: z.boolean(),
  }).optional(),
  fingerprint: z.string().optional(),
  name: z.string(),
  notes: z.string().optional(),
  path: z.string().optional(),
  publicId: z.string().optional(),
  tagIds: z.array(z.string()).optional(),
  tagManagerUrl: z.string().optional(),
  taggingServerUrls: z.array(z.string()).optional(),
  usageContext: z.array(z.string()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accountId: z.string().describe("GTM Account ID.").optional(),
  containerId: z.string().describe(
    "The Container ID uniquely identifies the GTM Container.",
  ).optional(),
  domainName: z.array(z.string()).describe(
    "List of domain names associated with the Container.",
  ).optional(),
  features: z.object({
    supportBuiltInVariables: z.boolean().describe(
      "Whether this Container supports built-in variables",
    ).optional(),
    supportClients: z.boolean().describe(
      "Whether this Container supports clients.",
    ).optional(),
    supportEnvironments: z.boolean().describe(
      "Whether this Container supports environments.",
    ).optional(),
    supportFolders: z.boolean().describe(
      "Whether this Container supports folders.",
    ).optional(),
    supportGtagConfigs: z.boolean().describe(
      "Whether this Container supports Google tag config.",
    ).optional(),
    supportTags: z.boolean().describe("Whether this Container supports tags.")
      .optional(),
    supportTemplates: z.boolean().describe(
      "Whether this Container supports templates.",
    ).optional(),
    supportTransformations: z.boolean().describe(
      "Whether this Container supports transformations.",
    ).optional(),
    supportTriggers: z.boolean().describe(
      "Whether this Container supports triggers.",
    ).optional(),
    supportUserPermissions: z.boolean().describe(
      "Whether this Container supports user permissions managed by GTM.",
    ).optional(),
    supportVariables: z.boolean().describe(
      "Whether this Container supports variables.",
    ).optional(),
    supportVersions: z.boolean().describe(
      "Whether this Container supports Container versions.",
    ).optional(),
    supportWorkspaces: z.boolean().describe(
      "Whether this Container supports workspaces.",
    ).optional(),
    supportZones: z.boolean().describe("Whether this Container supports zones.")
      .optional(),
  }).optional(),
  fingerprint: z.string().describe(
    "The fingerprint of the GTM Container as computed at storage time. This value is recomputed whenever the account is modified.",
  ).optional(),
  name: z.string().describe("Container display name.").optional(),
  notes: z.string().describe("Container Notes.").optional(),
  path: z.string().describe("GTM Container's API relative path.").optional(),
  publicId: z.string().describe("Container Public ID.").optional(),
  tagIds: z.array(z.string()).describe(
    "All Tag IDs that refer to this Container.",
  ).optional(),
  tagManagerUrl: z.string().describe(
    "Auto generated link to the tag manager UI",
  ).optional(),
  taggingServerUrls: z.array(z.string()).describe(
    "List of server-side container URLs for the Container. If multiple URLs are provided, all URL paths must match.",
  ).optional(),
  usageContext: z.array(
    z.enum([
      "usageContextUnspecified",
      "web",
      "android",
      "ios",
      "androidSdk5",
      "iosSdk5",
      "amp",
      "server",
    ]),
  ).describe(
    "List of Usage Contexts for the Container. Valid values include: web, android, or ios.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Tag Manager Accounts.Containers. Registered at `@swamp/gcp/tagmanager/accounts-containers`. */
export const model = {
  type: "@swamp/gcp/tagmanager/accounts-containers",
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
        "Represents a Google Tag Manager Container, which specifies the platform tags ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a containers",
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
        if (g["domainName"] !== undefined) body["domainName"] = g["domainName"];
        if (g["features"] !== undefined) body["features"] = g["features"];
        if (g["fingerprint"] !== undefined) {
          body["fingerprint"] = g["fingerprint"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["notes"] !== undefined) body["notes"] = g["notes"];
        if (g["path"] !== undefined) body["path"] = g["path"];
        if (g["publicId"] !== undefined) body["publicId"] = g["publicId"];
        if (g["tagIds"] !== undefined) body["tagIds"] = g["tagIds"];
        if (g["tagManagerUrl"] !== undefined) {
          body["tagManagerUrl"] = g["tagManagerUrl"];
        }
        if (g["taggingServerUrls"] !== undefined) {
          body["taggingServerUrls"] = g["taggingServerUrls"];
        }
        if (g["usageContext"] !== undefined) {
          body["usageContext"] = g["usageContext"];
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
      description: "Get a containers",
      arguments: z.object({
        identifier: z.string().describe("The name of the containers"),
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
      description: "Update containers attributes",
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
        if (g["domainName"] !== undefined) body["domainName"] = g["domainName"];
        if (g["features"] !== undefined) body["features"] = g["features"];
        if (g["fingerprint"] !== undefined) {
          body["fingerprint"] = g["fingerprint"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["notes"] !== undefined) body["notes"] = g["notes"];
        if (g["publicId"] !== undefined) body["publicId"] = g["publicId"];
        if (g["tagIds"] !== undefined) body["tagIds"] = g["tagIds"];
        if (g["tagManagerUrl"] !== undefined) {
          body["tagManagerUrl"] = g["tagManagerUrl"];
        }
        if (g["taggingServerUrls"] !== undefined) {
          body["taggingServerUrls"] = g["taggingServerUrls"];
        }
        if (g["usageContext"] !== undefined) {
          body["usageContext"] = g["usageContext"];
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
      description: "Delete the containers",
      arguments: z.object({
        identifier: z.string().describe("The name of the containers"),
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
      description: "Sync containers state from GCP",
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
    combine: {
      description: "combine",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["path"] !== undefined) params["path"] = String(g["path"]);
        const result = await createResource(
          BASE_URL,
          {
            "id": "tagmanager.accounts.containers.combine",
            "path": "tagmanager/v2/{+path}:combine",
            "httpMethod": "POST",
            "parameterOrder": ["path"],
            "parameters": {
              "allowUserPermissionFeatureUpdate": { "location": "query" },
              "containerId": { "location": "query" },
              "path": { "location": "path", "required": true },
              "settingSource": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    lookup: {
      description: "lookup",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const result = await createResource(
          BASE_URL,
          {
            "id": "tagmanager.accounts.containers.lookup",
            "path": "tagmanager/v2/accounts/containers:lookup",
            "httpMethod": "GET",
            "parameterOrder": [],
            "parameters": {
              "destinationId": { "location": "query" },
              "tagId": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    move_tag_id: {
      description: "move_tag_id",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["path"] !== undefined) params["path"] = String(g["path"]);
        const result = await createResource(
          BASE_URL,
          {
            "id": "tagmanager.accounts.containers.move_tag_id",
            "path": "tagmanager/v2/{+path}:move_tag_id",
            "httpMethod": "POST",
            "parameterOrder": ["path"],
            "parameters": {
              "allowUserPermissionFeatureUpdate": { "location": "query" },
              "copySettings": { "location": "query" },
              "copyTermsOfService": { "location": "query" },
              "copyUsers": { "location": "query" },
              "path": { "location": "path", "required": true },
              "tagId": { "location": "query" },
              "tagName": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    snippet: {
      description: "snippet",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["path"] !== undefined) params["path"] = String(g["path"]);
        const result = await createResource(
          BASE_URL,
          {
            "id": "tagmanager.accounts.containers.snippet",
            "path": "tagmanager/v2/{+path}:snippet",
            "httpMethod": "GET",
            "parameterOrder": ["path"],
            "parameters": { "path": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
  },
};
