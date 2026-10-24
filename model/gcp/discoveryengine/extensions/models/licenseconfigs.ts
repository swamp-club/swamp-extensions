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

// Auto-generated extension model for @swamp/gcp/discoveryengine/licenseconfigs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Discovery Engine LicenseConfigs.
 *
 * Information about users' licenses.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
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
  return `${parent}/licenseConfigs/${shortName}`;
}

const BASE_URL = "https://discoveryengine.googleapis.com/";

const GET_CONFIG = {
  "id": "discoveryengine.projects.locations.licenseConfigs.get",
  "path": "v1/{+name}",
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
  "id": "discoveryengine.projects.locations.licenseConfigs.create",
  "path": "v1/{+parent}/licenseConfigs",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "licenseConfigId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "discoveryengine.projects.locations.licenseConfigs.patch",
  "path": "v1/{+name}",
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
  "id": "discoveryengine.projects.locations.licenseConfigs.list",
  "path": "v1/{+parent}/licenseConfigs",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
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
  autoRenew: z.boolean().describe(
    "Optional. Whether the license config should be auto renewed when it reaches the end date.",
  ).optional(),
  endDate: z.object({
    day: z.number().int().describe(
      "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
    ).optional(),
    month: z.number().int().describe(
      "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
    ).optional(),
    year: z.number().int().describe(
      "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
    ).optional(),
  }).describe("Optional. The planed end date.").optional(),
  freeTrial: z.boolean().describe(
    "Optional. Whether the license config is for free trial.",
  ).optional(),
  lastUserUpdateTime: z.string().describe(
    "Optional. Timestamp of the most recent user-initiated update (seat count change or subscription term change). Unlike `update_time`, this field is only stamped when a customer explicitly updates the license (e.g. via the UI), and is not touched by system-driven writes (subscription pipeline, BALC propagation, etc.).",
  ).optional(),
  licenseCount: z.string().describe("Required. Number of licenses purchased.")
    .optional(),
  name: z.string().describe(
    "Immutable. Identifier. The fully qualified resource name of the license config. Format: `projects/{project}/locations/{location}/licenseConfigs/{license_config}`",
  ).optional(),
  startDate: z.object({
    day: z.number().int().describe(
      "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
    ).optional(),
    month: z.number().int().describe(
      "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
    ).optional(),
    year: z.number().int().describe(
      "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
    ).optional(),
  }).describe("Required. The start date.").optional(),
  subscriptionTerm: z.enum([
    "SUBSCRIPTION_TERM_UNSPECIFIED",
    "SUBSCRIPTION_TERM_ONE_MONTH",
    "SUBSCRIPTION_TERM_ONE_YEAR",
    "SUBSCRIPTION_TERM_THREE_YEARS",
    "SUBSCRIPTION_TERM_CUSTOM",
  ]).describe("Required. Subscription term.").optional(),
  subscriptionTier: z.enum([
    "SUBSCRIPTION_TIER_UNSPECIFIED",
    "SUBSCRIPTION_TIER_SEARCH",
    "SUBSCRIPTION_TIER_SEARCH_AND_ASSISTANT",
    "SUBSCRIPTION_TIER_NOTEBOOK_LM",
    "SUBSCRIPTION_TIER_FRONTLINE_WORKER",
    "SUBSCRIPTION_TIER_AGENTSPACE_STARTER",
    "SUBSCRIPTION_TIER_AGENTSPACE_BUSINESS",
    "SUBSCRIPTION_TIER_ENTERPRISE",
    "SUBSCRIPTION_TIER_ENTERPRISE_EMERGING",
    "SUBSCRIPTION_TIER_EDU",
    "SUBSCRIPTION_TIER_EDU_PRO",
    "SUBSCRIPTION_TIER_EDU_EMERGING",
    "SUBSCRIPTION_TIER_EDU_PRO_EMERGING",
    "SUBSCRIPTION_TIER_FRONTLINE_STARTER",
    "SUBSCRIPTION_TIER_CONSUMPTION_ONLY",
    "SUBSCRIPTION_TIER_EDU_GOV_EMERGING",
  ]).describe("Required. Subscription tier information for the license config.")
    .optional(),
  licenseConfigId: z.string().describe(
    "Optional. The ID to use for the LicenseConfig, which will become the final component of the LicenseConfig's resource name. We are using the tier (product edition) name as the license config id such as `search` or `search_and_assistant`.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  autoRenew: z.boolean().optional(),
  earlyTerminated: z.boolean().optional(),
  earlyTerminationDate: z.object({
    day: z.number(),
    month: z.number(),
    year: z.number(),
  }).optional(),
  endDate: z.object({
    day: z.number(),
    month: z.number(),
    year: z.number(),
  }).optional(),
  freeTrial: z.boolean().optional(),
  geminiBundle: z.boolean().optional(),
  lastUserUpdateTime: z.string().optional(),
  licenseCount: z.string().optional(),
  name: z.string(),
  startDate: z.object({
    day: z.number(),
    month: z.number(),
    year: z.number(),
  }).optional(),
  state: z.string().optional(),
  subscriptionTerm: z.string().optional(),
  subscriptionTier: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  autoRenew: z.boolean().describe(
    "Optional. Whether the license config should be auto renewed when it reaches the end date.",
  ).optional(),
  endDate: z.object({
    day: z.number().int().describe(
      "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
    ).optional(),
    month: z.number().int().describe(
      "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
    ).optional(),
    year: z.number().int().describe(
      "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
    ).optional(),
  }).describe("Optional. The planed end date.").optional(),
  freeTrial: z.boolean().describe(
    "Optional. Whether the license config is for free trial.",
  ).optional(),
  lastUserUpdateTime: z.string().describe(
    "Optional. Timestamp of the most recent user-initiated update (seat count change or subscription term change). Unlike `update_time`, this field is only stamped when a customer explicitly updates the license (e.g. via the UI), and is not touched by system-driven writes (subscription pipeline, BALC propagation, etc.).",
  ).optional(),
  licenseCount: z.string().describe("Required. Number of licenses purchased.")
    .optional(),
  name: z.string().describe(
    "Immutable. Identifier. The fully qualified resource name of the license config. Format: `projects/{project}/locations/{location}/licenseConfigs/{license_config}`",
  ).optional(),
  startDate: z.object({
    day: z.number().int().describe(
      "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
    ).optional(),
    month: z.number().int().describe(
      "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
    ).optional(),
    year: z.number().int().describe(
      "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
    ).optional(),
  }).describe("Required. The start date.").optional(),
  subscriptionTerm: z.enum([
    "SUBSCRIPTION_TERM_UNSPECIFIED",
    "SUBSCRIPTION_TERM_ONE_MONTH",
    "SUBSCRIPTION_TERM_ONE_YEAR",
    "SUBSCRIPTION_TERM_THREE_YEARS",
    "SUBSCRIPTION_TERM_CUSTOM",
  ]).describe("Required. Subscription term.").optional(),
  subscriptionTier: z.enum([
    "SUBSCRIPTION_TIER_UNSPECIFIED",
    "SUBSCRIPTION_TIER_SEARCH",
    "SUBSCRIPTION_TIER_SEARCH_AND_ASSISTANT",
    "SUBSCRIPTION_TIER_NOTEBOOK_LM",
    "SUBSCRIPTION_TIER_FRONTLINE_WORKER",
    "SUBSCRIPTION_TIER_AGENTSPACE_STARTER",
    "SUBSCRIPTION_TIER_AGENTSPACE_BUSINESS",
    "SUBSCRIPTION_TIER_ENTERPRISE",
    "SUBSCRIPTION_TIER_ENTERPRISE_EMERGING",
    "SUBSCRIPTION_TIER_EDU",
    "SUBSCRIPTION_TIER_EDU_PRO",
    "SUBSCRIPTION_TIER_EDU_EMERGING",
    "SUBSCRIPTION_TIER_EDU_PRO_EMERGING",
    "SUBSCRIPTION_TIER_FRONTLINE_STARTER",
    "SUBSCRIPTION_TIER_CONSUMPTION_ONLY",
    "SUBSCRIPTION_TIER_EDU_GOV_EMERGING",
  ]).describe("Required. Subscription tier information for the license config.")
    .optional(),
  licenseConfigId: z.string().describe(
    "Optional. The ID to use for the LicenseConfig, which will become the final component of the LicenseConfig's resource name. We are using the tier (product edition) name as the license config id such as `search` or `search_and_assistant`.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
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
      : undefined,
    quotaProject: g.quotaProject as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Discovery Engine LicenseConfigs. Registered at `@swamp/gcp/discoveryengine/licenseconfigs`. */
export const model = {
  type: "@swamp/gcp/discoveryengine/licenseconfigs",
  version: "2026.10.23.1",
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
      toVersion: "2026.04.08.1",
      description: "Added: scheduledUpdate",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.14.1",
      description: "Removed: scheduledUpdate",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { scheduledUpdate: _scheduledUpdate, ...rest } = old;
        return rest;
      },
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
      toVersion: "2026.05.26.1",
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
    {
      toVersion: "2026.06.16.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.14.1",
      description: "Added: lastUserUpdateTime",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.17.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.17.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.1",
      description: "Added: scopes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.20.2",
      description: "Added: lastUserUpdateTime",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.1",
      description: "Removed: earlyTerminationDate",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { earlyTerminationDate: _earlyTerminationDate, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.07.21.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.4",
      description: "Added: lastUserUpdateTime",
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
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Information about users' licenses.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a licenseConfigs",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["autoRenew"] !== undefined) body["autoRenew"] = g["autoRenew"];
        if (g["endDate"] !== undefined) body["endDate"] = g["endDate"];
        if (g["freeTrial"] !== undefined) body["freeTrial"] = g["freeTrial"];
        if (g["lastUserUpdateTime"] !== undefined) {
          body["lastUserUpdateTime"] = g["lastUserUpdateTime"];
        }
        if (g["licenseCount"] !== undefined) {
          body["licenseCount"] = g["licenseCount"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["startDate"] !== undefined) body["startDate"] = g["startDate"];
        if (g["subscriptionTerm"] !== undefined) {
          body["subscriptionTerm"] = g["subscriptionTerm"];
        }
        if (g["subscriptionTier"] !== undefined) {
          body["subscriptionTier"] = g["subscriptionTier"];
        }
        if (g["licenseConfigId"] !== undefined) {
          params["licenseConfigId"] = String(g["licenseConfigId"]);
        }
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          baseUrl,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": [],
            }
            : undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": `projects/${projectId}/locations/${
                String(g["location"] ?? "")
              }`,
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
      description: "Get a licenseConfigs",
      arguments: z.object({
        identifier: z.string().describe("The name of the licenseConfigs"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
      description: "Update licenseConfigs attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific licenseConfigs by name (e.g. one discovered by list)",
        ).optional(),
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (
        args: { identifier?: string; waitForReady?: boolean },
        context: any,
      ) => {
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
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            existingName ?? g["name"]?.toString() ?? "",
          );
        }
        const body: Record<string, unknown> = {};
        if (g["autoRenew"] !== undefined) body["autoRenew"] = g["autoRenew"];
        if (g["endDate"] !== undefined) body["endDate"] = g["endDate"];
        if (g["freeTrial"] !== undefined) body["freeTrial"] = g["freeTrial"];
        if (g["lastUserUpdateTime"] !== undefined) {
          body["lastUserUpdateTime"] = g["lastUserUpdateTime"];
        }
        if (g["licenseCount"] !== undefined) {
          body["licenseCount"] = g["licenseCount"];
        }
        if (g["startDate"] !== undefined) body["startDate"] = g["startDate"];
        if (g["subscriptionTerm"] !== undefined) {
          body["subscriptionTerm"] = g["subscriptionTerm"];
        }
        if (g["subscriptionTier"] !== undefined) {
          body["subscriptionTier"] = g["subscriptionTier"];
        }
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": [],
            }
            : undefined,
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
      description: "Sync licenseConfigs state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific licenseConfigs by name (e.g. one discovered by list)",
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
              `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
      description: "List licenseConfigs resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. The filter to apply to the list results. The supported fields are: * `subscription_tier` * `state` Examples: * `subscription_tier=SUBSCRIPTION_TIER_SEARCH,state=ACTIVE` - Lists all active search license configs. * `state=ACTIVE` - Lists all active license configs. The filter string should be a comma-separated list of field=value pairs.",
        ).optional(),
        pageSize: z.number().describe("Optional. Not supported.").optional(),
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
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "licenseConfigs",
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
