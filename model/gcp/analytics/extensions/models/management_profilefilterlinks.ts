// Auto-generated extension model for @swamp/gcp/analytics/management-profilefilterlinks
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Analytics Management.ProfileFilterLinks.
 *
 * JSON template for an Analytics profile filter link.
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

const BASE_URL = "https://www.googleapis.com/analytics/v3/";

const GET_CONFIG = {
  "id": "analytics.management.profileFilterLinks.get",
  "path":
    "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/profileFilterLinks/{linkId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "accountId",
    "webPropertyId",
    "profileId",
    "linkId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "linkId": {
      "location": "path",
      "required": true,
    },
    "profileId": {
      "location": "path",
      "required": true,
    },
    "webPropertyId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "analytics.management.profileFilterLinks.insert",
  "path":
    "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/profileFilterLinks",
  "httpMethod": "POST",
  "parameterOrder": [
    "accountId",
    "webPropertyId",
    "profileId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "profileId": {
      "location": "path",
      "required": true,
    },
    "webPropertyId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "analytics.management.profileFilterLinks.update",
  "path":
    "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/profileFilterLinks/{linkId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "accountId",
    "webPropertyId",
    "profileId",
    "linkId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "linkId": {
      "location": "path",
      "required": true,
    },
    "profileId": {
      "location": "path",
      "required": true,
    },
    "webPropertyId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "analytics.management.profileFilterLinks.delete",
  "path":
    "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/profileFilterLinks/{linkId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "accountId",
    "webPropertyId",
    "profileId",
    "linkId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "linkId": {
      "location": "path",
      "required": true,
    },
    "profileId": {
      "location": "path",
      "required": true,
    },
    "webPropertyId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  filterRef: z.object({
    accountId: z.string().describe("Account ID to which this filter belongs.")
      .optional(),
    href: z.string().describe("Link for this filter.").optional(),
    id: z.string().describe("Filter ID.").optional(),
    kind: z.string().describe("Kind value for filter reference.").optional(),
    name: z.string().describe("Name of this filter.").optional(),
  }).describe("JSON template for a profile filter link.").optional(),
  id: z.string().describe("Profile filter link ID.").optional(),
  profileRef: z.object({
    accountId: z.string().describe(
      "Account ID to which this view (profile) belongs.",
    ).optional(),
    href: z.string().describe("Link for this view (profile).").optional(),
    id: z.string().describe("View (Profile) ID.").optional(),
    internalWebPropertyId: z.string().describe(
      "Internal ID for the web property to which this view (profile) belongs.",
    ).optional(),
    kind: z.string().describe("Analytics view (profile) reference.").optional(),
    name: z.string().describe("Name of this view (profile).").optional(),
    webPropertyId: z.string().describe(
      "Web property ID of the form UA-XXXXX-YY to which this view (profile) belongs.",
    ).optional(),
  }).describe("JSON template for a linked view (profile).").optional(),
  rank: z.number().int().describe(
    "The rank of this profile filter link relative to the other filters linked to the same profile. For readonly (i.e., list and get) operations, the rank always starts at 1. For write (i.e., create, update, or delete) operations, you may specify a value between 0 and 255 inclusively, [0, 255]. In order to insert a link at the end of the list, either don't specify a rank or set a rank to a number greater than the largest rank in the list. In order to insert a link to the beginning of the list specify a rank that is less than or equal to 1. The new link will move all existing filters with the same or lower rank down the list. After the link is inserted/updated/deleted all profile filter links will be renumbered starting at 1.",
  ).optional(),
  accountId: z.string().describe(
    "Account ID to create profile filter link for.",
  ),
  webPropertyId: z.string().describe(
    "Web property Id to create profile filter link for.",
  ),
  profileId: z.string().describe("Profile ID to create filter link for."),
});

const StateSchema = z.object({
  filterRef: z.object({
    accountId: z.string(),
    href: z.string(),
    id: z.string(),
    kind: z.string(),
    name: z.string(),
  }).optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  profileRef: z.object({
    accountId: z.string(),
    href: z.string(),
    id: z.string(),
    internalWebPropertyId: z.string(),
    kind: z.string(),
    name: z.string(),
    webPropertyId: z.string(),
  }).optional(),
  rank: z.number().optional(),
  selfLink: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  filterRef: z.object({
    accountId: z.string().describe("Account ID to which this filter belongs.")
      .optional(),
    href: z.string().describe("Link for this filter.").optional(),
    id: z.string().describe("Filter ID.").optional(),
    kind: z.string().describe("Kind value for filter reference.").optional(),
    name: z.string().describe("Name of this filter.").optional(),
  }).describe("JSON template for a profile filter link.").optional(),
  id: z.string().describe("Profile filter link ID.").optional(),
  profileRef: z.object({
    accountId: z.string().describe(
      "Account ID to which this view (profile) belongs.",
    ).optional(),
    href: z.string().describe("Link for this view (profile).").optional(),
    id: z.string().describe("View (Profile) ID.").optional(),
    internalWebPropertyId: z.string().describe(
      "Internal ID for the web property to which this view (profile) belongs.",
    ).optional(),
    kind: z.string().describe("Analytics view (profile) reference.").optional(),
    name: z.string().describe("Name of this view (profile).").optional(),
    webPropertyId: z.string().describe(
      "Web property ID of the form UA-XXXXX-YY to which this view (profile) belongs.",
    ).optional(),
  }).describe("JSON template for a linked view (profile).").optional(),
  rank: z.number().int().describe(
    "The rank of this profile filter link relative to the other filters linked to the same profile. For readonly (i.e., list and get) operations, the rank always starts at 1. For write (i.e., create, update, or delete) operations, you may specify a value between 0 and 255 inclusively, [0, 255]. In order to insert a link at the end of the list, either don't specify a rank or set a rank to a number greater than the largest rank in the list. In order to insert a link to the beginning of the list specify a rank that is less than or equal to 1. The new link will move all existing filters with the same or lower rank down the list. After the link is inserted/updated/deleted all profile filter links will be renumbered starting at 1.",
  ).optional(),
  accountId: z.string().describe(
    "Account ID to create profile filter link for.",
  ).optional(),
  webPropertyId: z.string().describe(
    "Web property Id to create profile filter link for.",
  ).optional(),
  profileId: z.string().describe("Profile ID to create filter link for.")
    .optional(),
});

/** Swamp extension model for Google Cloud Google Analytics Management.ProfileFilterLinks. Registered at `@swamp/gcp/analytics/management-profilefilterlinks`. */
export const model = {
  type: "@swamp/gcp/analytics/management-profilefilterlinks",
  version: "2026.05.19.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "JSON template for an Analytics profile filter link.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a profileFilterLinks",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
        if (g["webPropertyId"] !== undefined) {
          params["webPropertyId"] = String(g["webPropertyId"]);
        }
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["filterRef"] !== undefined) body["filterRef"] = g["filterRef"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["profileRef"] !== undefined) body["profileRef"] = g["profileRef"];
        if (g["rank"] !== undefined) body["rank"] = g["rank"];
        if (g["name"] !== undefined) params["linkId"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? "current").replace(
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
    get: {
      description: "Get a profileFilterLinks",
      arguments: z.object({
        identifier: z.string().describe("The name of the profileFilterLinks"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
        if (g["webPropertyId"] !== undefined) {
          params["webPropertyId"] = String(g["webPropertyId"]);
        }
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        }
        params["linkId"] = args.identifier;
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
      description: "Update profileFilterLinks attributes",
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
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        } else if (existing["accountId"]) {
          params["accountId"] = String(existing["accountId"]);
        }
        if (g["webPropertyId"] !== undefined) {
          params["webPropertyId"] = String(g["webPropertyId"]);
        } else if (existing["webPropertyId"]) {
          params["webPropertyId"] = String(existing["webPropertyId"]);
        }
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        } else if (existing["profileId"]) {
          params["profileId"] = String(existing["profileId"]);
        }
        params["linkId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["filterRef"] !== undefined) body["filterRef"] = g["filterRef"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["profileRef"] !== undefined) body["profileRef"] = g["profileRef"];
        if (g["rank"] !== undefined) body["rank"] = g["rank"];
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
      description: "Delete the profileFilterLinks",
      arguments: z.object({
        identifier: z.string().describe("The name of the profileFilterLinks"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
        if (g["webPropertyId"] !== undefined) {
          params["webPropertyId"] = String(g["webPropertyId"]);
        }
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        }
        params["linkId"] = args.identifier;
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
      description: "Sync profileFilterLinks state from GCP",
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
          if (g["accountId"] !== undefined) {
            params["accountId"] = String(g["accountId"]);
          } else if (existing["accountId"]) {
            params["accountId"] = String(existing["accountId"]);
          }
          if (g["webPropertyId"] !== undefined) {
            params["webPropertyId"] = String(g["webPropertyId"]);
          } else if (existing["webPropertyId"]) {
            params["webPropertyId"] = String(existing["webPropertyId"]);
          }
          if (g["profileId"] !== undefined) {
            params["profileId"] = String(g["profileId"]);
          } else if (existing["profileId"]) {
            params["profileId"] = String(existing["profileId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["linkId"] = identifier;
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
