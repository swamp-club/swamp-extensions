// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/gcp/chromewebstore/items
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Chrome Web Store Items.
 *
 * Gets your own Chrome Web Store item.
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
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://chromewebstore.googleapis.com/";

const GET_CONFIG = {
  "id": "chromewebstore.items.get",
  "path": "chromewebstore/v1.1/items/{itemId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "itemId",
  ],
  "parameters": {
    "itemId": {
      "location": "path",
      "required": true,
    },
    "projection": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "chromewebstore.items.insert",
  "path": "chromewebstore/v1.1/items",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {
    "publisherEmail": {
      "location": "query",
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "chromewebstore.items.update",
  "path": "chromewebstore/v1.1/items/{itemId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "itemId",
  ],
  "parameters": {
    "itemId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const _defaultOAuthScopes: string[] = [
  "https://www.googleapis.com/auth/chromewebstore",
  "https://www.googleapis.com/auth/chromewebstore.readonly",
];

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
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
  crxVersion: z.string().describe(
    "The CRX version of the item. If the projection is draft, then it is the draft's CRX version.",
  ).optional(),
  id: z.string().describe("Unique ID of the item.").optional(),
  itemError: z.array(z.object({
    error_code: z.string().describe("The error code.").optional(),
    error_detail: z.string().describe(
      "The human-readable detail message of the error.",
    ).optional(),
  })).describe(
    "Detail human-readable status of the operation, in English only. Same error messages are displayed when you upload your app to the Chrome Web Store.",
  ).optional(),
  kind: z.string().describe(
    'Identifies this resource as an Item. Value: the fixed string "chromewebstore#item".',
  ).optional(),
  publicKey: z.string().describe("Public key of this item.").optional(),
  uploadState: z.string().describe(
    'Status of the operation. Possible values are: - \\"FAILURE\\" - \\"IN_PROGRESS\\" - \\"NOT_FOUND\\" - \\"SUCCESS\\"',
  ).optional(),
  publisherEmail: z.string().describe(
    "The email of the publisher who owns the items. Defaults to the caller's email address.",
  ).optional(),
});

const StateSchema = z.object({
  crxVersion: z.string().optional(),
  id: z.string().optional(),
  itemError: z.array(z.object({
    error_code: z.string(),
    error_detail: z.string(),
  })).optional(),
  kind: z.string().optional(),
  publicKey: z.string().optional(),
  uploadState: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  crxVersion: z.string().describe(
    "The CRX version of the item. If the projection is draft, then it is the draft's CRX version.",
  ).optional(),
  id: z.string().describe("Unique ID of the item.").optional(),
  itemError: z.array(z.object({
    error_code: z.string().describe("The error code.").optional(),
    error_detail: z.string().describe(
      "The human-readable detail message of the error.",
    ).optional(),
  })).describe(
    "Detail human-readable status of the operation, in English only. Same error messages are displayed when you upload your app to the Chrome Web Store.",
  ).optional(),
  kind: z.string().describe(
    'Identifies this resource as an Item. Value: the fixed string "chromewebstore#item".',
  ).optional(),
  publicKey: z.string().describe("Public key of this item.").optional(),
  uploadState: z.string().describe(
    'Status of the operation. Possible values are: - \\"FAILURE\\" - \\"IN_PROGRESS\\" - \\"NOT_FOUND\\" - \\"SUCCESS\\"',
  ).optional(),
  publisherEmail: z.string().describe(
    "The email of the publisher who owns the items. Defaults to the caller's email address.",
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

/** Swamp extension model for Google Cloud Chrome Web Store Items. Registered at `@swamp/gcp/chromewebstore/items`. */
export const model = {
  type: "@swamp/gcp/chromewebstore/items",
  version: "2026.10.06.1",
  upgrades: [
    {
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.17.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.1",
      description: "Added: scopes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.20.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
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
      toVersion: "2026.09.07.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.06.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Gets your own Chrome Web Store item.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a items",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["publisherEmail"] !== undefined) {
          params["publisherEmail"] = String(g["publisherEmail"]);
        }
        if (g["name"] !== undefined) params["itemId"] = String(g["name"]);
        const result = await createResource(
          baseUrl,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          undefined,
          credentials,
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
      description: "Get a items",
      arguments: z.object({
        identifier: z.string().describe("The name of the items"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["itemId"] = args.identifier;
        const result = await readResource(
          baseUrl,
          GET_CONFIG,
          params,
          credentials,
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
      description: "Update items attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific items by name (e.g. one discovered by list)",
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
        const resourceId = existing["id"]?.toString() ?? g["name"]?.toString();
        if (!resourceId) {
          throw new Error(
            "No identifier found in existing state or globalArgs",
          );
        }
        params["itemId"] = resourceId;
        const body: Record<string, unknown> = {};
        if (g["crxVersion"] !== undefined) body["crxVersion"] = g["crxVersion"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["itemError"] !== undefined) body["itemError"] = g["itemError"];
        if (g["kind"] !== undefined) body["kind"] = g["kind"];
        if (g["publicKey"] !== undefined) body["publicKey"] = g["publicKey"];
        if (g["uploadState"] !== undefined) {
          body["uploadState"] = g["uploadState"];
        }
        let live: Record<string, unknown> | undefined;
        const unset = [
          "crxVersion",
          "id",
          "itemError",
          "kind",
          "publicKey",
          "uploadState",
        ].filter((k) => body[k] === undefined);
        if (unset.length > 0) {
          live = await readResource(
            baseUrl,
            GET_CONFIG,
            params,
            credentials,
          ) as Record<string, unknown>;
          for (const k of unset) {
            if (live[k] !== undefined && live[k] !== null) body[k] = live[k];
          }
        }
        const concurrency: Record<string, unknown> = live ?? existing;
        for (const key of Object.keys(concurrency)) {
          if (
            key === "fingerprint" || key === "labelFingerprint" ||
            key === "etag" || key.endsWith("Fingerprint")
          ) {
            body[key] = concurrency[key];
          }
        }
        const result = await updateResource(
          baseUrl,
          UPDATE_CONFIG,
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
      description: "Sync items state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific items by name (e.g. one discovered by list)",
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
          const identifier = existing["id"]?.toString() ??
            g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["itemId"] = identifier;
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
    publish: {
      description: "publish",
      arguments: z.object({
        target: z.any().optional(),
        deployPercentage: z.any().optional(),
        publishTarget: z.any().optional(),
        reviewExemption: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        params["itemId"] = existing["id"]?.toString() ??
          g["name"]?.toString() ?? "";
        if (args["deployPercentage"] !== undefined) {
          params["deployPercentage"] = String(args["deployPercentage"]);
        }
        if (args["publishTarget"] !== undefined) {
          params["publishTarget"] = String(args["publishTarget"]);
        }
        if (args["reviewExemption"] !== undefined) {
          params["reviewExemption"] = String(args["reviewExemption"]);
        }
        const body: Record<string, unknown> = {};
        if (args["target"] !== undefined) body["target"] = args["target"];
        const result = await createResource(
          baseUrl,
          {
            "id": "chromewebstore.items.publish",
            "path": "chromewebstore/v1.1/items/{itemId}/publish",
            "httpMethod": "POST",
            "parameterOrder": ["itemId"],
            "parameters": {
              "deployPercentage": { "location": "query" },
              "itemId": { "location": "path", "required": true },
              "publishTarget": { "location": "query" },
              "reviewExemption": { "location": "query" },
            },
          },
          params,
          body,
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
