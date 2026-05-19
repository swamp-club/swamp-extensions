// Auto-generated extension model for @swamp/gcp/cloudsearch/settings-datasources
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Search Settings.Datasources.
 *
 * Datasource is a logical namespace for items to be indexed. All items must belong to a datasource. This is the prerequisite before items can be indexed into Cloud Search.
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

const BASE_URL = "https://cloudsearch.googleapis.com/";

const GET_CONFIG = {
  "id": "cloudsearch.settings.datasources.get",
  "path": "v1/settings/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "debugOptions.enableDebugging": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "cloudsearch.settings.datasources.create",
  "path": "v1/settings/datasources",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {},
} as const;

const UPDATE_CONFIG = {
  "id": "cloudsearch.settings.datasources.update",
  "path": "v1/settings/{+name}",
  "httpMethod": "PUT",
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

const DELETE_CONFIG = {
  "id": "cloudsearch.settings.datasources.delete",
  "path": "v1/settings/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "debugOptions.enableDebugging": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  disableModifications: z.boolean().describe(
    "If true, sets the datasource to read-only mode. In read-only mode, the Indexing API rejects any requests to index or delete items in this source. Enabling read-only mode does not stop the processing of previously accepted data.",
  ).optional(),
  disableServing: z.boolean().describe(
    "Disable serving any search or assist results.",
  ).optional(),
  displayName: z.string().describe(
    "Required. Display name of the datasource The maximum length is 300 characters.",
  ).optional(),
  indexingServiceAccounts: z.array(z.string()).describe(
    "List of service accounts that have indexing access.",
  ).optional(),
  itemsVisibility: z.array(z.object({
    gsuiteDomain: z.boolean().describe(
      "This principal represents all users of the Google Workspace domain of the customer.",
    ).optional(),
    gsuiteGroupEmail: z.string().describe(
      "This principal references a Google Workspace group name.",
    ).optional(),
    gsuiteUserEmail: z.string().describe(
      "This principal references a Google Workspace user account.",
    ).optional(),
  })).describe(
    "This field restricts visibility to items at the datasource level. Items within the datasource are restricted to the union of users and groups included in this field. Note that, this does not ensure access to a specific item, as users need to have ACL permissions on the contained items. This ensures a high level access on the entire datasource, and that the individual items are not shared outside this visibility.",
  ).optional(),
  name: z.string().describe(
    "The name of the datasource resource. Format: datasources/{source_id}. The name is ignored when creating a datasource.",
  ).optional(),
  operationIds: z.array(z.string()).describe(
    "IDs of the Long Running Operations (LROs) currently running for this schema.",
  ).optional(),
  returnThumbnailUrls: z.boolean().describe(
    "Can a user request to get thumbnail URI for Items indexed in this data source.",
  ).optional(),
  shortName: z.string().describe(
    "A short name or alias for the source. This value will be used to match the 'source' operator. For example, if the short name is ** then queries like *source:* will only return results for this source. The value must be unique across all datasources. The value must only contain alphanumeric characters (a-zA-Z0-9). The value cannot start with 'google' and cannot be one of the following: mail, gmail, docs, drive, groups, sites, calendar, hangouts, gplus, keep, people, teams. Its maximum length is 32 characters.",
  ).optional(),
  debugOptions: z.object({
    enableDebugging: z.boolean().describe(
      "If you are asked by Google to help with debugging, set this field. Otherwise, ignore this field.",
    ).optional(),
  }).describe("Shared request debug options for all cloudsearch RPC methods.")
    .optional(),
  source: z.object({
    disableModifications: z.boolean().describe(
      "If true, sets the datasource to read-only mode. In read-only mode, the Indexing API rejects any requests to index or delete items in this source. Enabling read-only mode does not stop the processing of previously accepted data.",
    ).optional(),
    disableServing: z.boolean().describe(
      "Disable serving any search or assist results.",
    ).optional(),
    displayName: z.string().describe(
      "Required. Display name of the datasource The maximum length is 300 characters.",
    ).optional(),
    indexingServiceAccounts: z.array(z.string()).describe(
      "List of service accounts that have indexing access.",
    ).optional(),
    itemsVisibility: z.array(z.object({
      gsuiteDomain: z.boolean().describe(
        "This principal represents all users of the Google Workspace domain of the customer.",
      ).optional(),
      gsuiteGroupEmail: z.string().describe(
        "This principal references a Google Workspace group name.",
      ).optional(),
      gsuiteUserEmail: z.string().describe(
        "This principal references a Google Workspace user account.",
      ).optional(),
    })).describe(
      "This field restricts visibility to items at the datasource level. Items within the datasource are restricted to the union of users and groups included in this field. Note that, this does not ensure access to a specific item, as users need to have ACL permissions on the contained items. This ensures a high level access on the entire datasource, and that the individual items are not shared outside this visibility.",
    ).optional(),
    name: z.string().describe(
      "The name of the datasource resource. Format: datasources/{source_id}. The name is ignored when creating a datasource.",
    ).optional(),
    operationIds: z.array(z.string()).describe(
      "IDs of the Long Running Operations (LROs) currently running for this schema.",
    ).optional(),
    returnThumbnailUrls: z.boolean().describe(
      "Can a user request to get thumbnail URI for Items indexed in this data source.",
    ).optional(),
    shortName: z.string().describe(
      "A short name or alias for the source. This value will be used to match the 'source' operator. For example, if the short name is ** then queries like *source:* will only return results for this source. The value must be unique across all datasources. The value must only contain alphanumeric characters (a-zA-Z0-9). The value cannot start with 'google' and cannot be one of the following: mail, gmail, docs, drive, groups, sites, calendar, hangouts, gplus, keep, people, teams. Its maximum length is 32 characters.",
    ).optional(),
  }).describe(
    "Datasource is a logical namespace for items to be indexed. All items must belong to a datasource. This is the prerequisite before items can be indexed into Cloud Search.",
  ).optional(),
  updateMask: z.string().describe(
    "Only applies to [`settings.datasources.patch`](https://developers.google.com/workspace/cloud-search/docs/reference/rest/v1/settings.datasources/patch). Update mask to control which fields to update. Example field paths: `name`, `displayName`. * If `update_mask` is non-empty, then only the fields specified in the `update_mask` are updated. * If you specify a field in the `update_mask`, but don't specify its value in the source, that field is cleared. * If the `update_mask` is not present or empty or has the value `*`, then all fields are updated.",
  ).optional(),
});

const StateSchema = z.object({
  disableModifications: z.boolean().optional(),
  disableServing: z.boolean().optional(),
  displayName: z.string().optional(),
  indexingServiceAccounts: z.array(z.string()).optional(),
  itemsVisibility: z.array(z.object({
    gsuiteDomain: z.boolean(),
    gsuiteGroupEmail: z.string(),
    gsuiteUserEmail: z.string(),
  })).optional(),
  name: z.string(),
  operationIds: z.array(z.string()).optional(),
  returnThumbnailUrls: z.boolean().optional(),
  shortName: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  disableModifications: z.boolean().describe(
    "If true, sets the datasource to read-only mode. In read-only mode, the Indexing API rejects any requests to index or delete items in this source. Enabling read-only mode does not stop the processing of previously accepted data.",
  ).optional(),
  disableServing: z.boolean().describe(
    "Disable serving any search or assist results.",
  ).optional(),
  displayName: z.string().describe(
    "Required. Display name of the datasource The maximum length is 300 characters.",
  ).optional(),
  indexingServiceAccounts: z.array(z.string()).describe(
    "List of service accounts that have indexing access.",
  ).optional(),
  itemsVisibility: z.array(z.object({
    gsuiteDomain: z.boolean().describe(
      "This principal represents all users of the Google Workspace domain of the customer.",
    ).optional(),
    gsuiteGroupEmail: z.string().describe(
      "This principal references a Google Workspace group name.",
    ).optional(),
    gsuiteUserEmail: z.string().describe(
      "This principal references a Google Workspace user account.",
    ).optional(),
  })).describe(
    "This field restricts visibility to items at the datasource level. Items within the datasource are restricted to the union of users and groups included in this field. Note that, this does not ensure access to a specific item, as users need to have ACL permissions on the contained items. This ensures a high level access on the entire datasource, and that the individual items are not shared outside this visibility.",
  ).optional(),
  name: z.string().describe(
    "The name of the datasource resource. Format: datasources/{source_id}. The name is ignored when creating a datasource.",
  ).optional(),
  operationIds: z.array(z.string()).describe(
    "IDs of the Long Running Operations (LROs) currently running for this schema.",
  ).optional(),
  returnThumbnailUrls: z.boolean().describe(
    "Can a user request to get thumbnail URI for Items indexed in this data source.",
  ).optional(),
  shortName: z.string().describe(
    "A short name or alias for the source. This value will be used to match the 'source' operator. For example, if the short name is ** then queries like *source:* will only return results for this source. The value must be unique across all datasources. The value must only contain alphanumeric characters (a-zA-Z0-9). The value cannot start with 'google' and cannot be one of the following: mail, gmail, docs, drive, groups, sites, calendar, hangouts, gplus, keep, people, teams. Its maximum length is 32 characters.",
  ).optional(),
  debugOptions: z.object({
    enableDebugging: z.boolean().describe(
      "If you are asked by Google to help with debugging, set this field. Otherwise, ignore this field.",
    ).optional(),
  }).describe("Shared request debug options for all cloudsearch RPC methods.")
    .optional(),
  source: z.object({
    disableModifications: z.boolean().describe(
      "If true, sets the datasource to read-only mode. In read-only mode, the Indexing API rejects any requests to index or delete items in this source. Enabling read-only mode does not stop the processing of previously accepted data.",
    ).optional(),
    disableServing: z.boolean().describe(
      "Disable serving any search or assist results.",
    ).optional(),
    displayName: z.string().describe(
      "Required. Display name of the datasource The maximum length is 300 characters.",
    ).optional(),
    indexingServiceAccounts: z.array(z.string()).describe(
      "List of service accounts that have indexing access.",
    ).optional(),
    itemsVisibility: z.array(z.object({
      gsuiteDomain: z.boolean().describe(
        "This principal represents all users of the Google Workspace domain of the customer.",
      ).optional(),
      gsuiteGroupEmail: z.string().describe(
        "This principal references a Google Workspace group name.",
      ).optional(),
      gsuiteUserEmail: z.string().describe(
        "This principal references a Google Workspace user account.",
      ).optional(),
    })).describe(
      "This field restricts visibility to items at the datasource level. Items within the datasource are restricted to the union of users and groups included in this field. Note that, this does not ensure access to a specific item, as users need to have ACL permissions on the contained items. This ensures a high level access on the entire datasource, and that the individual items are not shared outside this visibility.",
    ).optional(),
    name: z.string().describe(
      "The name of the datasource resource. Format: datasources/{source_id}. The name is ignored when creating a datasource.",
    ).optional(),
    operationIds: z.array(z.string()).describe(
      "IDs of the Long Running Operations (LROs) currently running for this schema.",
    ).optional(),
    returnThumbnailUrls: z.boolean().describe(
      "Can a user request to get thumbnail URI for Items indexed in this data source.",
    ).optional(),
    shortName: z.string().describe(
      "A short name or alias for the source. This value will be used to match the 'source' operator. For example, if the short name is ** then queries like *source:* will only return results for this source. The value must be unique across all datasources. The value must only contain alphanumeric characters (a-zA-Z0-9). The value cannot start with 'google' and cannot be one of the following: mail, gmail, docs, drive, groups, sites, calendar, hangouts, gplus, keep, people, teams. Its maximum length is 32 characters.",
    ).optional(),
  }).describe(
    "Datasource is a logical namespace for items to be indexed. All items must belong to a datasource. This is the prerequisite before items can be indexed into Cloud Search.",
  ).optional(),
  updateMask: z.string().describe(
    "Only applies to [`settings.datasources.patch`](https://developers.google.com/workspace/cloud-search/docs/reference/rest/v1/settings.datasources/patch). Update mask to control which fields to update. Example field paths: `name`, `displayName`. * If `update_mask` is non-empty, then only the fields specified in the `update_mask` are updated. * If you specify a field in the `update_mask`, but don't specify its value in the source, that field is cleared. * If the `update_mask` is not present or empty or has the value `*`, then all fields are updated.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Search Settings.Datasources. Registered at `@swamp/gcp/cloudsearch/settings-datasources`. */
export const model = {
  type: "@swamp/gcp/cloudsearch/settings-datasources",
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
      description:
        "Datasource is a logical namespace for items to be indexed. All items must bel...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a datasources",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["disableModifications"] !== undefined) {
          body["disableModifications"] = g["disableModifications"];
        }
        if (g["disableServing"] !== undefined) {
          body["disableServing"] = g["disableServing"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["indexingServiceAccounts"] !== undefined) {
          body["indexingServiceAccounts"] = g["indexingServiceAccounts"];
        }
        if (g["itemsVisibility"] !== undefined) {
          body["itemsVisibility"] = g["itemsVisibility"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["operationIds"] !== undefined) {
          body["operationIds"] = g["operationIds"];
        }
        if (g["returnThumbnailUrls"] !== undefined) {
          body["returnThumbnailUrls"] = g["returnThumbnailUrls"];
        }
        if (g["shortName"] !== undefined) body["shortName"] = g["shortName"];
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
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
      description: "Get a datasources",
      arguments: z.object({
        identifier: z.string().describe("The name of the datasources"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = args.identifier;
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
      description: "Update datasources attributes",
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
        params["name"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["disableModifications"] !== undefined) {
          body["disableModifications"] = g["disableModifications"];
        }
        if (g["disableServing"] !== undefined) {
          body["disableServing"] = g["disableServing"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["indexingServiceAccounts"] !== undefined) {
          body["indexingServiceAccounts"] = g["indexingServiceAccounts"];
        }
        if (g["itemsVisibility"] !== undefined) {
          body["itemsVisibility"] = g["itemsVisibility"];
        }
        if (g["operationIds"] !== undefined) {
          body["operationIds"] = g["operationIds"];
        }
        if (g["returnThumbnailUrls"] !== undefined) {
          body["returnThumbnailUrls"] = g["returnThumbnailUrls"];
        }
        if (g["shortName"] !== undefined) body["shortName"] = g["shortName"];
        if (g["debugOptions"] !== undefined) {
          body["debugOptions"] = g["debugOptions"];
        }
        if (g["source"] !== undefined) body["source"] = g["source"];
        if (g["updateMask"] !== undefined) body["updateMask"] = g["updateMask"];
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
      description: "Delete the datasources",
      arguments: z.object({
        identifier: z.string().describe("The name of the datasources"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = args.identifier;
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
      description: "Sync datasources state from GCP",
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
          params["name"] = identifier;
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
