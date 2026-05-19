// Auto-generated extension model for @swamp/gcp/androidenterprise/storelayoutpages
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Play EMM Storelayoutpages.
 *
 * Definition of a managed Google Play store page, made of a localized name and links to other pages. A page also contains clusters defined as a subcollection.
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

const BASE_URL = "https://androidenterprise.googleapis.com/";

const GET_CONFIG = {
  "id": "androidenterprise.storelayoutpages.get",
  "path":
    "androidenterprise/v1/enterprises/{enterpriseId}/storeLayout/pages/{pageId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "enterpriseId",
    "pageId",
  ],
  "parameters": {
    "enterpriseId": {
      "location": "path",
      "required": true,
    },
    "pageId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "androidenterprise.storelayoutpages.insert",
  "path": "androidenterprise/v1/enterprises/{enterpriseId}/storeLayout/pages",
  "httpMethod": "POST",
  "parameterOrder": [
    "enterpriseId",
  ],
  "parameters": {
    "enterpriseId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "androidenterprise.storelayoutpages.update",
  "path":
    "androidenterprise/v1/enterprises/{enterpriseId}/storeLayout/pages/{pageId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "enterpriseId",
    "pageId",
  ],
  "parameters": {
    "enterpriseId": {
      "location": "path",
      "required": true,
    },
    "pageId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "androidenterprise.storelayoutpages.delete",
  "path":
    "androidenterprise/v1/enterprises/{enterpriseId}/storeLayout/pages/{pageId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "enterpriseId",
    "pageId",
  ],
  "parameters": {
    "enterpriseId": {
      "location": "path",
      "required": true,
    },
    "pageId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  id: z.string().describe(
    "Unique ID of this page. Assigned by the server. Immutable once assigned.",
  ).optional(),
  link: z.array(z.string()).describe(
    "Ordered list of pages a user should be able to reach from this page. The list can't include this page. It is recommended that the basic pages are created first, before adding the links between pages. The API doesn't verify that the pages exist or the pages are reachable.",
  ).optional(),
  name: z.array(z.object({
    locale: z.string().describe(
      'The BCP47 tag for a locale. (e.g. "en-US", "de").',
    ).optional(),
    text: z.string().describe("The text localized in the associated locale.")
      .optional(),
  })).describe(
    "Ordered list of localized strings giving the name of this page. The text displayed is the one that best matches the user locale, or the first entry if there is no good match. There needs to be at least one entry.",
  ).optional(),
  enterpriseId: z.string().describe("The ID of the enterprise."),
});

const StateSchema = z.object({
  id: z.string().optional(),
  link: z.array(z.string()).optional(),
  name: z.array(z.object({
    locale: z.string(),
    text: z.string(),
  })),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  id: z.string().describe(
    "Unique ID of this page. Assigned by the server. Immutable once assigned.",
  ).optional(),
  link: z.array(z.string()).describe(
    "Ordered list of pages a user should be able to reach from this page. The list can't include this page. It is recommended that the basic pages are created first, before adding the links between pages. The API doesn't verify that the pages exist or the pages are reachable.",
  ).optional(),
  name: z.array(z.object({
    locale: z.string().describe(
      'The BCP47 tag for a locale. (e.g. "en-US", "de").',
    ).optional(),
    text: z.string().describe("The text localized in the associated locale.")
      .optional(),
  })).describe(
    "Ordered list of localized strings giving the name of this page. The text displayed is the one that best matches the user locale, or the first entry if there is no good match. There needs to be at least one entry.",
  ).optional(),
  enterpriseId: z.string().describe("The ID of the enterprise.").optional(),
});

/** Swamp extension model for Google Cloud Google Play EMM Storelayoutpages. Registered at `@swamp/gcp/androidenterprise/storelayoutpages`. */
export const model = {
  type: "@swamp/gcp/androidenterprise/storelayoutpages",
  version: "2026.05.19.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Definition of a managed Google Play store page, made of a localized name and ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a storelayoutpages",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["enterpriseId"] !== undefined) {
          params["enterpriseId"] = String(g["enterpriseId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["link"] !== undefined) body["link"] = g["link"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["name"] !== undefined) params["pageId"] = String(g["name"]);
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
      description: "Get a storelayoutpages",
      arguments: z.object({
        identifier: z.string().describe("The name of the storelayoutpages"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["enterpriseId"] !== undefined) {
          params["enterpriseId"] = String(g["enterpriseId"]);
        }
        params["pageId"] = args.identifier;
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
      description: "Update storelayoutpages attributes",
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
        if (g["enterpriseId"] !== undefined) {
          params["enterpriseId"] = String(g["enterpriseId"]);
        } else if (existing["enterpriseId"]) {
          params["enterpriseId"] = String(existing["enterpriseId"]);
        }
        params["pageId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["link"] !== undefined) body["link"] = g["link"];
        if (g["name"] !== undefined) body["name"] = g["name"];
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
      description: "Delete the storelayoutpages",
      arguments: z.object({
        identifier: z.string().describe("The name of the storelayoutpages"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["enterpriseId"] !== undefined) {
          params["enterpriseId"] = String(g["enterpriseId"]);
        }
        params["pageId"] = args.identifier;
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
      description: "Sync storelayoutpages state from GCP",
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
          if (g["enterpriseId"] !== undefined) {
            params["enterpriseId"] = String(g["enterpriseId"]);
          } else if (existing["enterpriseId"]) {
            params["enterpriseId"] = String(existing["enterpriseId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["pageId"] = identifier;
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
  },
};
