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

// Auto-generated extension model for @swamp/gcp/dfareporting/advertiserlandingpages
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Campaign Manager 360 AdvertiserLandingPages.
 *
 * Contains information about where a user's browser is taken after the user clicks an ad.
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

const BASE_URL = "https://dfareporting.googleapis.com/dfareporting/v5/";

const GET_CONFIG = {
  "id": "dfareporting.advertiserLandingPages.get",
  "path": "userprofiles/{+profileId}/advertiserLandingPages/{+id}",
  "httpMethod": "GET",
  "parameterOrder": [
    "profileId",
    "id",
  ],
  "parameters": {
    "id": {
      "location": "path",
      "required": true,
    },
    "profileId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "dfareporting.advertiserLandingPages.insert",
  "path": "userprofiles/{+profileId}/advertiserLandingPages",
  "httpMethod": "POST",
  "parameterOrder": [
    "profileId",
  ],
  "parameters": {
    "profileId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "dfareporting.advertiserLandingPages.update",
  "path": "userprofiles/{+profileId}/advertiserLandingPages",
  "httpMethod": "PUT",
  "parameterOrder": [
    "profileId",
  ],
  "parameters": {
    "profileId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "dfareporting.advertiserLandingPages.list",
  "path": "userprofiles/{+profileId}/advertiserLandingPages",
  "httpMethod": "GET",
  "parameterOrder": [
    "profileId",
  ],
  "parameters": {
    "advertiserIds": {
      "location": "query",
    },
    "archived": {
      "location": "query",
    },
    "campaignIds": {
      "location": "query",
    },
    "ids": {
      "location": "query",
    },
    "maxResults": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "profileId": {
      "location": "path",
      "required": true,
    },
    "searchString": {
      "location": "query",
    },
    "sortField": {
      "location": "query",
    },
    "sortOrder": {
      "location": "query",
    },
    "subaccountId": {
      "location": "query",
    },
  },
} as const;

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
  advertiserId: z.string().describe(
    "Advertiser ID of this landing page. This is a required field.",
  ).optional(),
  archived: z.boolean().describe("Whether this landing page has been archived.")
    .optional(),
  deepLinks: z.array(z.object({
    appUrl: z.string().describe("The URL of the mobile app being linked to.")
      .optional(),
    fallbackUrl: z.string().describe(
      "The fallback URL. This URL will be served to users who do not have the mobile app installed.",
    ).optional(),
    kind: z.string().describe(
      'Identifies what kind of resource this is. Value: the fixed string "dfareporting#deepLink".',
    ).optional(),
    mobileApp: z.object({
      directory: z.enum([
        "UNKNOWN",
        "APPLE_APP_STORE",
        "GOOGLE_PLAY_STORE",
        "ROKU_APP_STORE",
        "AMAZON_FIRETV_APP_STORE",
        "PLAYSTATION_APP_STORE",
        "APPLE_TV_APP_STORE",
        "XBOX_APP_STORE",
        "SAMSUNG_TV_APP_STORE",
        "ANDROID_TV_APP_STORE",
        "GENERIC_CTV_APP_STORE",
      ]).describe("Mobile app directory.").optional(),
      id: z.string().describe("ID of this mobile app.").optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#mobileApp".',
      ).optional(),
      publisherName: z.string().describe("Publisher name.").optional(),
      title: z.string().describe("Title of this mobile app.").optional(),
    }).describe(
      "Contains information about a mobile app. Used as a landing page deep link.",
    ).optional(),
    remarketingListIds: z.array(z.string()).describe(
      "Ads served to users on these remarketing lists will use this deep link. Applicable when mobileApp.directory is APPLE_APP_STORE.",
    ).optional(),
  })).describe("Links that will direct the user to a mobile app, if installed.")
    .optional(),
  id: z.string().describe(
    "ID of this landing page. This is a read-only, auto-generated field.",
  ).optional(),
  name: z.string().describe(
    "Name of this landing page. This is a required field. It must be less than 256 characters long.",
  ).optional(),
  url: z.string().describe(
    "URL of this landing page. This is a required field.",
  ).optional(),
  profileId: z.string().describe(
    "User profile ID associated with this request.",
  ),
});

const StateSchema = z.object({
  advertiserId: z.string().optional(),
  archived: z.boolean().optional(),
  deepLinks: z.array(z.object({
    appUrl: z.string(),
    fallbackUrl: z.string(),
    kind: z.string(),
    mobileApp: z.object({
      directory: z.string(),
      id: z.string(),
      kind: z.string(),
      publisherName: z.string(),
      title: z.string(),
    }),
    remarketingListIds: z.array(z.string()),
  })).optional(),
  id: z.string(),
  kind: z.string().optional(),
  name: z.string().optional(),
  url: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  advertiserId: z.string().describe(
    "Advertiser ID of this landing page. This is a required field.",
  ).optional(),
  archived: z.boolean().describe("Whether this landing page has been archived.")
    .optional(),
  deepLinks: z.array(z.object({
    appUrl: z.string().describe("The URL of the mobile app being linked to.")
      .optional(),
    fallbackUrl: z.string().describe(
      "The fallback URL. This URL will be served to users who do not have the mobile app installed.",
    ).optional(),
    kind: z.string().describe(
      'Identifies what kind of resource this is. Value: the fixed string "dfareporting#deepLink".',
    ).optional(),
    mobileApp: z.object({
      directory: z.enum([
        "UNKNOWN",
        "APPLE_APP_STORE",
        "GOOGLE_PLAY_STORE",
        "ROKU_APP_STORE",
        "AMAZON_FIRETV_APP_STORE",
        "PLAYSTATION_APP_STORE",
        "APPLE_TV_APP_STORE",
        "XBOX_APP_STORE",
        "SAMSUNG_TV_APP_STORE",
        "ANDROID_TV_APP_STORE",
        "GENERIC_CTV_APP_STORE",
      ]).describe("Mobile app directory.").optional(),
      id: z.string().describe("ID of this mobile app.").optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#mobileApp".',
      ).optional(),
      publisherName: z.string().describe("Publisher name.").optional(),
      title: z.string().describe("Title of this mobile app.").optional(),
    }).describe(
      "Contains information about a mobile app. Used as a landing page deep link.",
    ).optional(),
    remarketingListIds: z.array(z.string()).describe(
      "Ads served to users on these remarketing lists will use this deep link. Applicable when mobileApp.directory is APPLE_APP_STORE.",
    ).optional(),
  })).describe("Links that will direct the user to a mobile app, if installed.")
    .optional(),
  id: z.string().describe(
    "ID of this landing page. This is a read-only, auto-generated field.",
  ).optional(),
  name: z.string().describe(
    "Name of this landing page. This is a required field. It must be less than 256 characters long.",
  ).optional(),
  url: z.string().describe(
    "URL of this landing page. This is a required field.",
  ).optional(),
  profileId: z.string().describe(
    "User profile ID associated with this request.",
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

/** Swamp extension model for Google Cloud Campaign Manager 360 AdvertiserLandingPages. Registered at `@swamp/gcp/dfareporting/advertiserlandingpages`. */
export const model = {
  type: "@swamp/gcp/dfareporting/advertiserlandingpages",
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
        "Contains information about where a user's browser is taken after the user cli...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a advertiserLandingPages",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["advertiserId"] !== undefined) {
          body["advertiserId"] = g["advertiserId"];
        }
        if (g["archived"] !== undefined) body["archived"] = g["archived"];
        if (g["deepLinks"] !== undefined) body["deepLinks"] = g["deepLinks"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["url"] !== undefined) body["url"] = g["url"];
        if (g["id"] !== undefined) params["id"] = String(g["id"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "profileId": String(g["profileId"] ?? "") },
            matchField: "id",
            matchValue: String(g["id"] ?? ""),
          },
          credentials,
        ) as StateData;
        const instanceName = ((result.id ?? g.id)?.toString() ?? "current")
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
      description: "Get a advertiserLandingPages",
      arguments: z.object({
        identifier: z.string().describe("The id of the advertiserLandingPages"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        }
        params["id"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.id ?? g.id)?.toString() ?? args.identifier).replace(
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
      description: "Update advertiserLandingPages attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName = (g.id?.toString() ?? "current").replace(
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
        params["profileId"] = existing["id"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["advertiserId"] !== undefined) {
          body["advertiserId"] = g["advertiserId"];
        }
        if (g["archived"] !== undefined) body["archived"] = g["archived"];
        if (g["deepLinks"] !== undefined) body["deepLinks"] = g["deepLinks"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["url"] !== undefined) body["url"] = g["url"];
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
      description: "Sync advertiserLandingPages state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName = (g.id?.toString() ?? "current").replace(
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
          if (g["profileId"] !== undefined) {
            params["profileId"] = String(g["profileId"]);
          } else if (existing["profileId"]) {
            params["profileId"] = String(existing["profileId"]);
          }
          const identifier = existing.id?.toString() ?? g["id"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["id"] = identifier;
          const result = await readResource(
            BASE_URL,
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
      description: "List advertiserLandingPages resources",
      arguments: z.object({
        advertiserIds: z.string().describe(
          "Select only landing pages that belong to these advertisers.",
        ).optional(),
        archived: z.boolean().describe(
          "Select only archived landing pages. Don't set this field to select both archived and non-archived landing pages.",
        ).optional(),
        campaignIds: z.string().describe(
          "Select only landing pages that are associated with these campaigns.",
        ).optional(),
        ids: z.string().describe("Select only landing pages with these IDs.")
          .optional(),
        maxResults: z.number().describe("Maximum number of results to return.")
          .optional(),
        searchString: z.string().describe(
          'Allows searching for landing pages by name or ID. Wildcards (*) are allowed. For example, "landingpage*2017" will return landing pages with names like "landingpage July 2017", "landingpage March 2017", or simply "landingpage 2017". Most of the searches also add wildcards implicitly at the start and the end of the search string. For example, a search string of "landingpage" will match campaigns with name "my landingpage", "landingpage 2015", or simply "landingpage".',
        ).optional(),
        sortField: z.string().describe("Field by which to sort the list.")
          .optional(),
        sortOrder: z.string().describe("Order of sorted results.").optional(),
        subaccountId: z.string().describe(
          "Select only landing pages that belong to this subaccount.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        }
        if (args["advertiserIds"] !== undefined) {
          params["advertiserIds"] = String(args["advertiserIds"]);
        }
        if (args["archived"] !== undefined) {
          params["archived"] = String(args["archived"]);
        }
        if (args["campaignIds"] !== undefined) {
          params["campaignIds"] = String(args["campaignIds"]);
        }
        if (args["ids"] !== undefined) params["ids"] = String(args["ids"]);
        if (args["maxResults"] !== undefined) {
          params["maxResults"] = String(args["maxResults"]);
        }
        if (args["searchString"] !== undefined) {
          params["searchString"] = String(args["searchString"]);
        }
        if (args["sortField"] !== undefined) {
          params["sortField"] = String(args["sortField"]);
        }
        if (args["sortOrder"] !== undefined) {
          params["sortOrder"] = String(args["sortOrder"]);
        }
        if (args["subaccountId"] !== undefined) {
          params["subaccountId"] = String(args["subaccountId"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "landingPages",
          (args.maxPages as number | undefined) ?? 10,
          credentials,
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i] as StateData;
          const instanceName = (item.id?.toString() ?? String(i)).replace(
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
