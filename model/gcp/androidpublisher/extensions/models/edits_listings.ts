// Auto-generated extension model for @swamp/gcp/androidpublisher/edits-listings
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Play Android Developer Edits.Listings.
 *
 * A localized store listing. The resource for ListingsService.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  deleteResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://androidpublisher.googleapis.com/";

const GET_CONFIG = {
  "id": "androidpublisher.edits.listings.get",
  "path":
    "androidpublisher/v3/applications/{packageName}/edits/{editId}/listings/{language}",
  "httpMethod": "GET",
  "parameterOrder": [
    "packageName",
    "editId",
    "language",
  ],
  "parameters": {
    "editId": {
      "location": "path",
      "required": true,
    },
    "language": {
      "location": "path",
      "required": true,
    },
    "packageName": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "androidpublisher.edits.listings.update",
  "path":
    "androidpublisher/v3/applications/{packageName}/edits/{editId}/listings/{language}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "packageName",
    "editId",
    "language",
  ],
  "parameters": {
    "editId": {
      "location": "path",
      "required": true,
    },
    "language": {
      "location": "path",
      "required": true,
    },
    "packageName": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "androidpublisher.edits.listings.delete",
  "path":
    "androidpublisher/v3/applications/{packageName}/edits/{editId}/listings/{language}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "packageName",
    "editId",
    "language",
  ],
  "parameters": {
    "editId": {
      "location": "path",
      "required": true,
    },
    "language": {
      "location": "path",
      "required": true,
    },
    "packageName": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  fullDescription: z.string().describe("Full description of the app.")
    .optional(),
  language: z.string().describe(
    'Language localization code (a BCP-47 language tag; for example, "de-AT" for Austrian German).',
  ).optional(),
  shortDescription: z.string().describe("Short description of the app.")
    .optional(),
  title: z.string().describe("Localized title of the app.").optional(),
  video: z.string().describe("URL of a promotional YouTube video for the app.")
    .optional(),
});

const StateSchema = z.object({
  fullDescription: z.string().optional(),
  language: z.string().optional(),
  shortDescription: z.string().optional(),
  title: z.string().optional(),
  video: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  fullDescription: z.string().describe("Full description of the app.")
    .optional(),
  language: z.string().describe(
    'Language localization code (a BCP-47 language tag; for example, "de-AT" for Austrian German).',
  ).optional(),
  shortDescription: z.string().describe("Short description of the app.")
    .optional(),
  title: z.string().describe("Localized title of the app.").optional(),
  video: z.string().describe("URL of a promotional YouTube video for the app.")
    .optional(),
});

/** Swamp extension model for Google Cloud Google Play Android Developer Edits.Listings. Registered at `@swamp/gcp/androidpublisher/edits-listings`. */
export const model = {
  type: "@swamp/gcp/androidpublisher/edits-listings",
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
        "A localized store listing. The resource for ListingsService.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a listings",
      arguments: z.object({
        identifier: z.string().describe("The name of the listings"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["packageName"] !== undefined) {
          params["packageName"] = String(g["packageName"]);
        }
        if (g["editId"] !== undefined) params["editId"] = String(g["editId"]);
        params["language"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? args.identifier).replace(
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
      description: "Update listings attributes",
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
        if (g["packageName"] !== undefined) {
          params["packageName"] = String(g["packageName"]);
        } else if (existing["packageName"]) {
          params["packageName"] = String(existing["packageName"]);
        }
        if (g["editId"] !== undefined) params["editId"] = String(g["editId"]);
        else if (existing["editId"]) {
          params["editId"] = String(existing["editId"]);
        }
        params["language"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["fullDescription"] !== undefined) {
          body["fullDescription"] = g["fullDescription"];
        }
        if (g["shortDescription"] !== undefined) {
          body["shortDescription"] = g["shortDescription"];
        }
        if (g["title"] !== undefined) body["title"] = g["title"];
        if (g["video"] !== undefined) body["video"] = g["video"];
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
      description: "Delete the listings",
      arguments: z.object({
        identifier: z.string().describe("The name of the listings"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["packageName"] !== undefined) {
          params["packageName"] = String(g["packageName"]);
        }
        if (g["editId"] !== undefined) params["editId"] = String(g["editId"]);
        params["language"] = args.identifier;
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
      description: "Sync listings state from GCP",
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
          if (g["packageName"] !== undefined) {
            params["packageName"] = String(g["packageName"]);
          } else if (existing["packageName"]) {
            params["packageName"] = String(existing["packageName"]);
          }
          if (g["editId"] !== undefined) params["editId"] = String(g["editId"]);
          else if (existing["editId"]) {
            params["editId"] = String(existing["editId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["language"] = identifier;
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
