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

// Auto-generated extension model for @swamp/gcp/youtube/thirdpartylinks
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud YouTube Data ThirdPartyLinks.
 *
 * A *third party account link* resource represents a link between a YouTube account or a channel and an account on a third-party service.
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
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readViaList,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://youtube.googleapis.com/";

const INSERT_CONFIG = {
  "id": "youtube.thirdPartyLinks.insert",
  "path": "youtube/v3/thirdPartyLinks",
  "httpMethod": "POST",
  "parameterOrder": [
    "part",
  ],
  "parameters": {
    "externalChannelId": {
      "location": "query",
    },
    "part": {
      "location": "query",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "youtube.thirdPartyLinks.update",
  "path": "youtube/v3/thirdPartyLinks",
  "httpMethod": "PUT",
  "parameterOrder": [
    "part",
  ],
  "parameters": {
    "externalChannelId": {
      "location": "query",
    },
    "part": {
      "location": "query",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "youtube.thirdPartyLinks.delete",
  "path": "youtube/v3/thirdPartyLinks",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "linkingToken",
    "type",
  ],
  "parameters": {
    "externalChannelId": {
      "location": "query",
    },
    "linkingToken": {
      "location": "query",
      "required": true,
    },
    "part": {
      "location": "query",
    },
    "type": {
      "location": "query",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "youtube.thirdPartyLinks.list",
  "path": "youtube/v3/thirdPartyLinks",
  "httpMethod": "GET",
  "parameterOrder": [
    "part",
  ],
  "parameters": {
    "externalChannelId": {
      "location": "query",
    },
    "linkingToken": {
      "location": "query",
    },
    "part": {
      "location": "query",
      "required": true,
    },
    "type": {
      "location": "query",
    },
  },
} as const;

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
  linkingToken: z.string().describe(
    "The linking_token identifies a YouTube account and channel with which the third party account is linked.",
  ).optional(),
  snippet: z.object({
    channelToStoreLink: z.object({
      billingDetails: z.object({
        billingStatus: z.enum([
          "billingStatusUnspecified",
          "billingStatusPending",
          "billingStatusActive",
          "billingStatusInactive",
        ]).describe("The current billing profile status.").optional(),
      }).describe("Information specific to billing.").optional(),
      merchantAffiliateProgramDetails: z.object({
        status: z.enum([
          "merchantAffiliateProgramStatusUnspecified",
          "merchantAffiliateProgramStatusEligible",
          "merchantAffiliateProgramStatusActive",
          "merchantAffiliateProgramStatusPaused",
        ]).describe("The current merchant affiliate program status.")
          .optional(),
      }).describe("Information specific to merchant affiliate program.")
        .optional(),
      merchantId: z.string().describe("Google Merchant Center id of the store.")
        .optional(),
      storeName: z.string().describe("Name of the store.").optional(),
      storeUrl: z.string().describe("Landing page of the store.").optional(),
    }).describe(
      "Information specific to a store on a merchandising platform linked to a YouTube channel.",
    ).optional(),
    type: z.enum(["linkUnspecified", "channelToStoreLink"]).describe(
      "Type of the link named after the entities that are being linked.",
    ).optional(),
  }).describe(
    "Basic information about a third party account link, including its type and type-specific information.",
  ).optional(),
  status: z.object({
    linkStatus: z.enum(["unknown", "failed", "pending", "linked"]).optional(),
  }).describe(
    "The third-party link status object contains information about the status of the link.",
  ).optional(),
  part: z.string().describe(
    "The *part* parameter specifies the thirdPartyLink resource parts that the API request and response will include. Supported values are linkingToken, status, and snippet.",
  ),
  externalChannelId: z.string().describe(
    "Channel ID to which changes should be applied, for delegation.",
  ).optional(),
});

const StateSchema = z.object({
  etag: z.string().optional(),
  kind: z.string().optional(),
  linkingToken: z.string().optional(),
  snippet: z.object({
    channelToStoreLink: z.object({
      billingDetails: z.object({
        billingStatus: z.string(),
      }),
      merchantAffiliateProgramDetails: z.object({
        status: z.string(),
      }),
      merchantId: z.string(),
      storeName: z.string(),
      storeUrl: z.string(),
    }),
    type: z.string(),
  }).optional(),
  status: z.object({
    linkStatus: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  linkingToken: z.string().describe(
    "The linking_token identifies a YouTube account and channel with which the third party account is linked.",
  ).optional(),
  snippet: z.object({
    channelToStoreLink: z.object({
      billingDetails: z.object({
        billingStatus: z.enum([
          "billingStatusUnspecified",
          "billingStatusPending",
          "billingStatusActive",
          "billingStatusInactive",
        ]).describe("The current billing profile status.").optional(),
      }).describe("Information specific to billing.").optional(),
      merchantAffiliateProgramDetails: z.object({
        status: z.enum([
          "merchantAffiliateProgramStatusUnspecified",
          "merchantAffiliateProgramStatusEligible",
          "merchantAffiliateProgramStatusActive",
          "merchantAffiliateProgramStatusPaused",
        ]).describe("The current merchant affiliate program status.")
          .optional(),
      }).describe("Information specific to merchant affiliate program.")
        .optional(),
      merchantId: z.string().describe("Google Merchant Center id of the store.")
        .optional(),
      storeName: z.string().describe("Name of the store.").optional(),
      storeUrl: z.string().describe("Landing page of the store.").optional(),
    }).describe(
      "Information specific to a store on a merchandising platform linked to a YouTube channel.",
    ).optional(),
    type: z.enum(["linkUnspecified", "channelToStoreLink"]).describe(
      "Type of the link named after the entities that are being linked.",
    ).optional(),
  }).describe(
    "Basic information about a third party account link, including its type and type-specific information.",
  ).optional(),
  status: z.object({
    linkStatus: z.enum(["unknown", "failed", "pending", "linked"]).optional(),
  }).describe(
    "The third-party link status object contains information about the status of the link.",
  ).optional(),
  part: z.string().describe(
    "The *part* parameter specifies the thirdPartyLink resource parts that the API request and response will include. Supported values are linkingToken, status, and snippet.",
  ).optional(),
  externalChannelId: z.string().describe(
    "Channel ID to which changes should be applied, for delegation.",
  ).optional(),
});

const _credentialKeys = new Set(["accessToken", "credentialsJson", "project"]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
  };
}

/** Swamp extension model for Google Cloud YouTube Data ThirdPartyLinks. Registered at `@swamp/gcp/youtube/thirdpartylinks`. */
export const model = {
  type: "@swamp/gcp/youtube/thirdpartylinks",
  version: "2026.06.08.1",
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
    {
      toVersion: "2026.05.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A *third party account link* resource represents a link between a YouTube acc...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a thirdPartyLinks",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["part"] !== undefined) params["part"] = String(g["part"]);
        const body: Record<string, unknown> = {};
        if (g["linkingToken"] !== undefined) {
          body["linkingToken"] = g["linkingToken"];
        }
        if (g["snippet"] !== undefined) body["snippet"] = g["snippet"];
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["externalChannelId"] !== undefined) {
          body["externalChannelId"] = g["externalChannelId"];
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          undefined,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "part": String(g["part"] ?? "") },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
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
      description: "Get a thirdPartyLinks",
      arguments: z.object({
        identifier: z.string().describe("The name of the thirdPartyLinks"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["part"] !== undefined) params["part"] = String(g["part"]);
        const result = await readViaList(
          BASE_URL,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
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
      description: "Update thirdPartyLinks attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        params["part"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["linkingToken"] !== undefined) {
          body["linkingToken"] = g["linkingToken"];
        }
        if (g["snippet"] !== undefined) body["snippet"] = g["snippet"];
        if (g["status"] !== undefined) body["status"] = g["status"];
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
          undefined,
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
    delete: {
      description: "Delete the thirdPartyLinks",
      arguments: z.object({
        identifier: z.string().describe("The name of the thirdPartyLinks"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["linkingToken"] !== undefined) {
          params["linkingToken"] = String(g["linkingToken"]);
        }
        params["type"] = args.identifier;
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
          credentials,
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
      description: "Sync thirdPartyLinks state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
          if (g["part"] !== undefined) params["part"] = String(g["part"]);
          else if (existing["part"]) params["part"] = String(existing["part"]);
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          const result = await readViaList(
            BASE_URL,
            LIST_CONFIG,
            params,
            "name",
            identifier,
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
      description: "List thirdPartyLinks resources",
      arguments: z.object({
        externalChannelId: z.string().describe(
          "Channel ID to which changes should be applied, for delegation.",
        ).optional(),
        linkingToken: z.string().describe(
          "Get a third party link with the given linking token.",
        ).optional(),
        part: z.string().describe(
          "The *part* parameter specifies the thirdPartyLink resource parts that the API response will include. Supported values are linkingToken, status, and snippet.",
        ).optional(),
        type: z.string().describe("Get a third party link of the given type.")
          .optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["part"] !== undefined) params["part"] = String(g["part"]);
        if (args["externalChannelId"] !== undefined) {
          params["externalChannelId"] = String(args["externalChannelId"]);
        }
        if (args["linkingToken"] !== undefined) {
          params["linkingToken"] = String(args["linkingToken"]);
        }
        if (args["part"] !== undefined) params["part"] = String(args["part"]);
        if (args["type"] !== undefined) params["type"] = String(args["type"]);
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "items",
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
  },
};
