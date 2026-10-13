// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/gcp/merchantapi/accounts-omnichannelsettings
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Merchant Accounts.OmnichannelSettings.
 *
 * Collection of information related to the omnichannel settings of a merchant.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/omnichannelSettings/${shortName}`;
}

const BASE_URL = "https://merchantapi.googleapis.com/";

const GET_CONFIG = {
  "id": "merchantapi.accounts.omnichannelSettings.get",
  "path": "accounts/v1/{+name}",
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
  "id": "merchantapi.accounts.omnichannelSettings.create",
  "path": "accounts/v1/{+parent}/omnichannelSettings",
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

const PATCH_CONFIG = {
  "id": "merchantapi.accounts.omnichannelSettings.patch",
  "path": "accounts/v1/{+name}",
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

const LIST_CONFIG = {
  "id": "merchantapi.accounts.omnichannelSettings.list",
  "path": "accounts/v1/{+parent}/omnichannelSettings",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const _defaultOAuthScopes: string[] = [
  "https://www.googleapis.com/auth/content",
];

const GlobalArgsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  scopes: z.string().describe(
    "Comma-separated OAuth scopes to request when minting access tokens via gcloud. Defaults to the API's Discovery Document scopes.",
  ).optional(),
  quotaProject: z.string().describe(
    "GCP project ID for quota and billing attribution; sets the x-goog-user-project header. Overrides GOOGLE_CLOUD_QUOTA_PROJECT environment variable. Required for APIs like Cloud Identity when using user credentials.",
  ).optional(),
  apiEndpoint: z.string().describe(
    "Custom API endpoint for emulators; overrides GCP_API_ENDPOINT environment variable. Defaults to the service's production URL.",
  ).optional(),
  about: z.object({
    state: z.enum([
      "STATE_UNSPECIFIED",
      "ACTIVE",
      "FAILED",
      "RUNNING",
      "ACTION_REQUIRED",
    ]).describe("Output only. The state of the URI.").optional(),
    uri: z.string().describe("Required. The about page URI.").optional(),
  }).describe("Optional. The about page URI and state for this country.")
    .optional(),
  inStock: z.object({
    state: z.enum([
      "STATE_UNSPECIFIED",
      "ACTIVE",
      "FAILED",
      "RUNNING",
      "ACTION_REQUIRED",
    ]).describe("Output only. The state of the in-stock serving.").optional(),
    uri: z.string().describe(
      "Optional. Product landing page URI. It is only used for the review of MHLSF in-stock serving. This URI domain should match with the business's homepage. Required to be empty if the lsf_type is GHLSF, and required when the lsf_type is MHLSF_FULL or MHLSF_BASIC.",
    ).optional(),
  }).describe("Optional. The InStock URI and state for this country.")
    .optional(),
  inventoryVerification: z.object({
    contact: z.string().describe(
      "Required. The name of the contact for the inventory verification process.",
    ).optional(),
    contactEmail: z.string().describe(
      "Required. The email address of the contact for the inventory verification process.",
    ).optional(),
    contactState: z.enum([
      "STATE_UNSPECIFIED",
      "ACTIVE",
      "FAILED",
      "RUNNING",
      "ACTION_REQUIRED",
    ]).describe("Output only. The state of the contact verification.")
      .optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "ACTION_REQUIRED",
      "INACTIVE",
      "RUNNING",
      "SUCCEEDED",
      "SUSPENDED",
    ]).describe("Output only. The state of the inventory verification process.")
      .optional(),
  }).describe(
    "Optional. The inventory verification contact and state for this country.",
  ).optional(),
  lsfType: z.enum([
    "LSF_TYPE_UNSPECIFIED",
    "GHLSF",
    "MHLSF_BASIC",
    "MHLSF_FULL",
  ]).describe("Required. The Local Store Front type for this country.")
    .optional(),
  name: z.string().describe(
    "Identifier. The resource name of the omnichannel setting. Format: `accounts/{account}/omnichannelSettings/{omnichannel_setting}`",
  ).optional(),
  odo: z.object({
    state: z.enum([
      "STATE_UNSPECIFIED",
      "ACTIVE",
      "FAILED",
      "RUNNING",
      "ACTION_REQUIRED",
    ]).describe("Output only. The state of the URI.").optional(),
    uri: z.string().describe(
      "Required. The on display to order (ODO) policy URI.",
    ).optional(),
  }).describe(
    "Optional. The On Display to Order (ODO) policy URI and state for this country.",
  ).optional(),
  pickup: z.object({
    state: z.enum([
      "STATE_UNSPECIFIED",
      "ACTIVE",
      "FAILED",
      "RUNNING",
      "ACTION_REQUIRED",
    ]).describe("Output only. The state of the pickup serving.").optional(),
    uri: z.string().describe(
      "Required. Pickup product page URI. It is only used for the review of pickup serving. This URI domain should match with the business's homepage.",
    ).optional(),
  }).describe("Optional. The Pickup URI and state for this country.")
    .optional(),
  regionCode: z.string().describe(
    "Required. Immutable. Region code defined by [CLDR](https://cldr.unicode.org/). Must be provided in the Create method, and is immutable.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  about: z.object({
    state: z.string(),
    uri: z.string(),
  }).optional(),
  inStock: z.object({
    state: z.string(),
    uri: z.string(),
  }).optional(),
  inventoryVerification: z.object({
    contact: z.string(),
    contactEmail: z.string(),
    contactState: z.string(),
    state: z.string(),
  }).optional(),
  lfpLink: z.object({
    externalAccountId: z.string(),
    lfpProvider: z.string(),
    state: z.string(),
  }).optional(),
  lsfType: z.string().optional(),
  name: z.string(),
  odo: z.object({
    state: z.string(),
    uri: z.string(),
  }).optional(),
  pickup: z.object({
    state: z.string(),
    uri: z.string(),
  }).optional(),
  regionCode: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  about: z.object({
    state: z.enum([
      "STATE_UNSPECIFIED",
      "ACTIVE",
      "FAILED",
      "RUNNING",
      "ACTION_REQUIRED",
    ]).describe("Output only. The state of the URI.").optional(),
    uri: z.string().describe("Required. The about page URI.").optional(),
  }).describe("Optional. The about page URI and state for this country.")
    .optional(),
  inStock: z.object({
    state: z.enum([
      "STATE_UNSPECIFIED",
      "ACTIVE",
      "FAILED",
      "RUNNING",
      "ACTION_REQUIRED",
    ]).describe("Output only. The state of the in-stock serving.").optional(),
    uri: z.string().describe(
      "Optional. Product landing page URI. It is only used for the review of MHLSF in-stock serving. This URI domain should match with the business's homepage. Required to be empty if the lsf_type is GHLSF, and required when the lsf_type is MHLSF_FULL or MHLSF_BASIC.",
    ).optional(),
  }).describe("Optional. The InStock URI and state for this country.")
    .optional(),
  inventoryVerification: z.object({
    contact: z.string().describe(
      "Required. The name of the contact for the inventory verification process.",
    ).optional(),
    contactEmail: z.string().describe(
      "Required. The email address of the contact for the inventory verification process.",
    ).optional(),
    contactState: z.enum([
      "STATE_UNSPECIFIED",
      "ACTIVE",
      "FAILED",
      "RUNNING",
      "ACTION_REQUIRED",
    ]).describe("Output only. The state of the contact verification.")
      .optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "ACTION_REQUIRED",
      "INACTIVE",
      "RUNNING",
      "SUCCEEDED",
      "SUSPENDED",
    ]).describe("Output only. The state of the inventory verification process.")
      .optional(),
  }).describe(
    "Optional. The inventory verification contact and state for this country.",
  ).optional(),
  lsfType: z.enum([
    "LSF_TYPE_UNSPECIFIED",
    "GHLSF",
    "MHLSF_BASIC",
    "MHLSF_FULL",
  ]).describe("Required. The Local Store Front type for this country.")
    .optional(),
  name: z.string().describe(
    "Identifier. The resource name of the omnichannel setting. Format: `accounts/{account}/omnichannelSettings/{omnichannel_setting}`",
  ).optional(),
  odo: z.object({
    state: z.enum([
      "STATE_UNSPECIFIED",
      "ACTIVE",
      "FAILED",
      "RUNNING",
      "ACTION_REQUIRED",
    ]).describe("Output only. The state of the URI.").optional(),
    uri: z.string().describe(
      "Required. The on display to order (ODO) policy URI.",
    ).optional(),
  }).describe(
    "Optional. The On Display to Order (ODO) policy URI and state for this country.",
  ).optional(),
  pickup: z.object({
    state: z.enum([
      "STATE_UNSPECIFIED",
      "ACTIVE",
      "FAILED",
      "RUNNING",
      "ACTION_REQUIRED",
    ]).describe("Output only. The state of the pickup serving.").optional(),
    uri: z.string().describe(
      "Required. Pickup product page URI. It is only used for the review of pickup serving. This URI domain should match with the business's homepage.",
    ).optional(),
  }).describe("Optional. The Pickup URI and state for this country.")
    .optional(),
  regionCode: z.string().describe(
    "Required. Immutable. Region code defined by [CLDR](https://cldr.unicode.org/). Must be provided in the Create method, and is immutable.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const _credentialKeys = new Set([
  "accessToken",
  "credentialsJson",
  "project",
  "scopes",
  "quotaProject",
  "apiEndpoint",
]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
    scopes: typeof g.scopes === "string"
      ? g.scopes.split(",").map((s: string) => s.trim())
      : _defaultOAuthScopes,
    quotaProject: g.quotaProject as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Merchant Accounts.OmnichannelSettings. Registered at `@swamp/gcp/merchantapi/accounts-omnichannelsettings`. */
export const model = {
  type: "@swamp/gcp/merchantapi/accounts-omnichannelsettings",
  version: "2026.10.13.1",
  upgrades: [
    {
      toVersion: "2026.07.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.12.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Collection of information related to the omnichannel settings of a merchant.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a omnichannelSettings",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["about"] !== undefined) body["about"] = g["about"];
        if (g["inStock"] !== undefined) body["inStock"] = g["inStock"];
        if (g["inventoryVerification"] !== undefined) {
          body["inventoryVerification"] = g["inventoryVerification"];
        }
        if (g["lsfType"] !== undefined) body["lsfType"] = g["lsfType"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["odo"] !== undefined) body["odo"] = g["odo"];
        if (g["pickup"] !== undefined) body["pickup"] = g["pickup"];
        if (g["regionCode"] !== undefined) body["regionCode"] = g["regionCode"];
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          baseUrl,
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
          credentials,
        ) as StateData;
        const instanceName = ((g.name ?? result.name)?.toString() ?? "current")
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
      description: "Get a omnichannelSettings",
      arguments: z.object({
        identifier: z.string().describe("The name of the omnichannelSettings"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const result = await readResource(
          baseUrl,
          GET_CONFIG,
          params,
          credentials,
        ) as StateData;
        const instanceName =
          ((g.name ?? result.name)?.toString() ?? args.identifier).replace(
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
      description: "Update omnichannelSettings attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific omnichannelSettings by name (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error(
            "No existing state found - run create, get, or list first",
          );
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const params: Record<string, string> = { project: projectId };
        const existingName = existing["name"]?.toString();
        if (existingName && existingName.includes("/")) {
          params["name"] = existingName;
        } else {
          params["name"] = buildResourceName(
            String(g["parent"] ?? ""),
            existingName ?? g["name"]?.toString() ?? "",
          );
        }
        const body: Record<string, unknown> = {};
        if (g["about"] !== undefined) body["about"] = g["about"];
        if (g["inStock"] !== undefined) body["inStock"] = g["inStock"];
        if (g["inventoryVerification"] !== undefined) {
          body["inventoryVerification"] = g["inventoryVerification"];
        }
        if (g["lsfType"] !== undefined) body["lsfType"] = g["lsfType"];
        if (g["odo"] !== undefined) body["odo"] = g["odo"];
        if (g["pickup"] !== undefined) body["pickup"] = g["pickup"];
        const updateMaskKeys = Object.keys(body);
        if (updateMaskKeys.length > 0) {
          params["updateMask"] = updateMaskKeys.join(",");
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
          baseUrl,
          PATCH_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          credentials,
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
      description: "Sync omnichannelSettings state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific omnichannelSettings by name (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error(
            "No existing state found - run create, get, or list first",
          );
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        try {
          const params: Record<string, string> = { project: projectId };
          const existingName = existing.name?.toString();
          if (existingName && existingName.includes("/")) {
            params["name"] = existingName;
          } else {
            const shortName = existingName ?? g["name"]?.toString();
            if (!shortName) throw new Error("No identifier found");
            params["name"] = buildResourceName(
              String(g["parent"] ?? ""),
              shortName,
            );
          }
          const result = await readResource(
            baseUrl,
            GET_CONFIG,
            params,
            credentials,
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
    list: {
      description: "List omnichannelSettings resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "Optional. The maximum number of omnichannel settings to return. The service may return fewer than this value. If unspecified, at most 50 omnichannel settings will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "omnichannelSettings",
          (args.maxPages as number | undefined) ?? 10,
          credentials,
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i] as StateData;
          const instanceName = (item.name?.toString() ?? String(i)).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
          const handle = await context.writeResource(
            "state",
            instanceName,
            item,
          );
          dataHandles.push(handle);
        }
        return { dataHandles, result: { count: items.length, nextPageToken } };
      },
    },
    request_inventory_verification: {
      description: "request inventory verification",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          baseUrl,
          {
            "id":
              "merchantapi.accounts.omnichannelSettings.requestInventoryVerification",
            "path": "accounts/v1/{+name}:requestInventoryVerification",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
  },
};
