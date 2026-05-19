// Auto-generated extension model for @swamp/gcp/analyticsadmin/accounts
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Analytics Admin Accounts.
 *
 * A resource message representing a Google Analytics account.
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

const BASE_URL = "https://analyticsadmin.googleapis.com/";

const GET_CONFIG = {
  "id": "analyticsadmin.accounts.get",
  "path": "v1beta/{+name}",
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
  "id": "analyticsadmin.accounts.patch",
  "path": "v1beta/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "analyticsadmin.accounts.delete",
  "path": "v1beta/{+name}",
  "httpMethod": "DELETE",
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

const GlobalArgsSchema = z.object({
  createTime: z.string().describe(
    "Output only. Time when this account was originally created.",
  ).optional(),
  deleted: z.boolean().describe(
    "Output only. Indicates whether this Account is soft-deleted or not. Deleted accounts are excluded from List results unless specifically requested.",
  ).optional(),
  displayName: z.string().describe(
    "Required. Human-readable display name for this account.",
  ).optional(),
  gmpOrganization: z.string().describe(
    "Output only. The URI for a Google Marketing Platform organization resource. Only set when this account is connected to a GMP organization. Format: marketingplatformadmin.googleapis.com/organizations/{org_id}",
  ).optional(),
  name: z.string().describe(
    'Identifier. Resource name of this account. Format: accounts/{account} Example: "accounts/100"',
  ).optional(),
  regionCode: z.string().describe(
    "Country of business. Must be a Unicode CLDR region code.",
  ).optional(),
  updateTime: z.string().describe(
    "Output only. Time when account payload fields were last updated.",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  deleted: z.boolean().optional(),
  displayName: z.string().optional(),
  gmpOrganization: z.string().optional(),
  name: z.string(),
  regionCode: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  createTime: z.string().describe(
    "Output only. Time when this account was originally created.",
  ).optional(),
  deleted: z.boolean().describe(
    "Output only. Indicates whether this Account is soft-deleted or not. Deleted accounts are excluded from List results unless specifically requested.",
  ).optional(),
  displayName: z.string().describe(
    "Required. Human-readable display name for this account.",
  ).optional(),
  gmpOrganization: z.string().describe(
    "Output only. The URI for a Google Marketing Platform organization resource. Only set when this account is connected to a GMP organization. Format: marketingplatformadmin.googleapis.com/organizations/{org_id}",
  ).optional(),
  name: z.string().describe(
    'Identifier. Resource name of this account. Format: accounts/{account} Example: "accounts/100"',
  ).optional(),
  regionCode: z.string().describe(
    "Country of business. Must be a Unicode CLDR region code.",
  ).optional(),
  updateTime: z.string().describe(
    "Output only. Time when account payload fields were last updated.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Google Analytics Admin Accounts. Registered at `@swamp/gcp/analyticsadmin/accounts`. */
export const model = {
  type: "@swamp/gcp/analyticsadmin/accounts",
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
      toVersion: "2026.05.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.2",
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
        "A resource message representing a Google Analytics account.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a accounts",
      arguments: z.object({
        identifier: z.string().describe("The name of the accounts"),
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
      description: "Update accounts attributes",
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
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["deleted"] !== undefined) body["deleted"] = g["deleted"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["gmpOrganization"] !== undefined) {
          body["gmpOrganization"] = g["gmpOrganization"];
        }
        if (g["regionCode"] !== undefined) body["regionCode"] = g["regionCode"];
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
      description: "Delete the accounts",
      arguments: z.object({
        identifier: z.string().describe("The name of the accounts"),
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
      description: "Sync accounts state from GCP",
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
    get_data_sharing_settings: {
      description: "get data sharing settings",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          {
            "id": "analyticsadmin.accounts.getDataSharingSettings",
            "path": "v1beta/{+name}",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
    provision_account_ticket: {
      description: "provision account ticket",
      arguments: z.object({
        account: z.any().optional(),
        redirectUri: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (args["account"] !== undefined) body["account"] = args["account"];
        if (args["redirectUri"] !== undefined) {
          body["redirectUri"] = args["redirectUri"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "analyticsadmin.accounts.provisionAccountTicket",
            "path": "v1beta/accounts:provisionAccountTicket",
            "httpMethod": "POST",
            "parameterOrder": [],
            "parameters": {},
          },
          params,
          body,
        );
        return { result };
      },
    },
    run_access_report: {
      description: "run access report",
      arguments: z.object({
        dateRanges: z.any().optional(),
        dimensionFilter: z.any().optional(),
        dimensions: z.any().optional(),
        expandGroups: z.any().optional(),
        includeAllUsers: z.any().optional(),
        limit: z.any().optional(),
        metricFilter: z.any().optional(),
        metrics: z.any().optional(),
        offset: z.any().optional(),
        orderBys: z.any().optional(),
        returnEntityQuota: z.any().optional(),
        timeZone: z.any().optional(),
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
        params["entity"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["dateRanges"] !== undefined) {
          body["dateRanges"] = args["dateRanges"];
        }
        if (args["dimensionFilter"] !== undefined) {
          body["dimensionFilter"] = args["dimensionFilter"];
        }
        if (args["dimensions"] !== undefined) {
          body["dimensions"] = args["dimensions"];
        }
        if (args["expandGroups"] !== undefined) {
          body["expandGroups"] = args["expandGroups"];
        }
        if (args["includeAllUsers"] !== undefined) {
          body["includeAllUsers"] = args["includeAllUsers"];
        }
        if (args["limit"] !== undefined) body["limit"] = args["limit"];
        if (args["metricFilter"] !== undefined) {
          body["metricFilter"] = args["metricFilter"];
        }
        if (args["metrics"] !== undefined) body["metrics"] = args["metrics"];
        if (args["offset"] !== undefined) body["offset"] = args["offset"];
        if (args["orderBys"] !== undefined) body["orderBys"] = args["orderBys"];
        if (args["returnEntityQuota"] !== undefined) {
          body["returnEntityQuota"] = args["returnEntityQuota"];
        }
        if (args["timeZone"] !== undefined) body["timeZone"] = args["timeZone"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "analyticsadmin.accounts.runAccessReport",
            "path": "v1beta/{+entity}:runAccessReport",
            "httpMethod": "POST",
            "parameterOrder": ["entity"],
            "parameters": {
              "entity": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    search_change_history_events: {
      description: "search change history events",
      arguments: z.object({
        action: z.any().optional(),
        actorEmail: z.any().optional(),
        earliestChangeTime: z.any().optional(),
        latestChangeTime: z.any().optional(),
        pageSize: z.any().optional(),
        pageToken: z.any().optional(),
        property: z.any().optional(),
        resourceType: z.any().optional(),
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
        params["account"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["action"] !== undefined) body["action"] = args["action"];
        if (args["actorEmail"] !== undefined) {
          body["actorEmail"] = args["actorEmail"];
        }
        if (args["earliestChangeTime"] !== undefined) {
          body["earliestChangeTime"] = args["earliestChangeTime"];
        }
        if (args["latestChangeTime"] !== undefined) {
          body["latestChangeTime"] = args["latestChangeTime"];
        }
        if (args["pageSize"] !== undefined) body["pageSize"] = args["pageSize"];
        if (args["pageToken"] !== undefined) {
          body["pageToken"] = args["pageToken"];
        }
        if (args["property"] !== undefined) body["property"] = args["property"];
        if (args["resourceType"] !== undefined) {
          body["resourceType"] = args["resourceType"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "analyticsadmin.accounts.searchChangeHistoryEvents",
            "path": "v1beta/{+account}:searchChangeHistoryEvents",
            "httpMethod": "POST",
            "parameterOrder": ["account"],
            "parameters": {
              "account": { "location": "path", "required": true },
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
