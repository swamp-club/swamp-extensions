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

// Auto-generated extension model for @swamp/gcp/networksecurity/firewallendpoints
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Network Security FirewallEndpoints.
 *
 * Message describing Endpoint object.
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
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/firewallEndpoints/${shortName}`;
}

const BASE_URL = "https://networksecurity.googleapis.com/";

const GET_CONFIG = {
  "id": "networksecurity.organizations.locations.firewallEndpoints.get",
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
  "id": "networksecurity.organizations.locations.firewallEndpoints.create",
  "path": "v1/{+parent}/firewallEndpoints",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "firewallEndpointId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "networksecurity.organizations.locations.firewallEndpoints.patch",
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
    "requestId": {
      "location": "query",
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "networksecurity.organizations.locations.firewallEndpoints.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "networksecurity.organizations.locations.firewallEndpoints.list",
  "path": "v1/{+parent}/firewallEndpoints",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "orderBy": {
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
  billingProjectId: z.string().describe(
    "Optional. Project to charge for the deployed firewall endpoint. This field must be specified when creating the endpoint in the organization scope, and should be omitted otherwise.",
  ).optional(),
  description: z.string().describe(
    "Optional. Description of the firewall endpoint. Max length 2048 characters.",
  ).optional(),
  endpointSettings: z.object({
    contentCloudRegion: z.enum([
      "CONTENT_CLOUD_REGION_UNSPECIFIED",
      "US_CENTRAL",
      "APAC",
      "INDIA",
      "UK",
      "FRANCE",
      "JAPAN",
      "AUSTRALIA",
      "CANADA",
      "SWITZERLAND",
      "NETHERLANDS",
      "INDONESIA",
      "QATAR",
      "TAIWAN",
      "POLAND",
      "SOUTH_KOREA",
      "SAUDI_ARABIA",
      "ITALY",
    ]).describe("Optional. The content cloud region of the endpoint.")
      .optional(),
    httpPartialResponseBlocked: z.boolean().describe(
      "Optional. Whether to block HTTP partial responses for the endpoint. When this is true, resumption of blocked malicious HTTP file downloads will be blocked by the firewall. False provides maximum availability, true provides maximum security.",
    ).optional(),
    jumboFramesEnabled: z.boolean().describe(
      "Optional. Immutable. Indicates whether Jumbo Frames are enabled. Default value is false.",
    ).optional(),
  }).describe("Optional. Settings for the endpoint.").optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels as key value pairs",
  ).optional(),
  name: z.string().describe("Immutable. Identifier. Name of resource.")
    .optional(),
  wildfireSettings: z.object({
    enabled: z.boolean().describe(
      "Optional. Indicates whether WildFire analysis is enabled. Default value is false.",
    ).optional(),
    wildfireInlineCloudAnalysisSettings: z.object({
      maxAnalysisDuration: z.string().describe(
        "Optional. Timeout in milliseconds on a file being held while WildFire inline cloud analysis is performed. Value between 1 to 240000 is valid. Default value is 30000.",
      ).optional(),
      submissionTimeoutLoggingDisabled: z.boolean().describe(
        "Optional. Whether to disable WildFire submission log generation for files that timeout during WildFire inline cloud analysis.",
      ).optional(),
      timeoutAction: z.enum([
        "WILDFIRE_INLINE_CLOUD_ANALYSIS_TIMEOUT_ACTION_UNSPECIFIED",
        "ALLOW",
        "DENY",
      ]).describe(
        "Optional. Action to take when WildFire inline cloud analysis times out. Default value is ALLOW.",
      ).optional(),
    }).describe("Optional. Settings for WildFire inline cloud analysis.")
      .optional(),
    wildfireRealtimeLookupDuration: z.string().describe(
      "Optional. Duration in milliseconds on a file being held while the WildFire real time signature cloud performs a signature lookup. Value between 1 to 5000 is valid. Default value is 1000.",
    ).optional(),
    wildfireRealtimeLookupTimeoutAction: z.enum([
      "WILDFIRE_REALTIME_SIGNATURE_LOOKUP_TIMEOUT_ACTION_UNSPECIFIED",
      "ALLOW",
      "DENY",
    ]).describe(
      "Optional. Action to take on WildFire real time signature lookup timeout. Default value is ALLOW.",
    ).optional(),
    wildfireRegion: z.enum([
      "WILDFIRE_REGION_UNSPECIFIED",
      "CANADA",
      "UNITED_STATES",
      "JAPAN",
      "SINGAPORE",
      "UNITED_KINGDOM",
      "AUSTRALIA",
      "GERMANY",
      "INDIA",
      "SWITZERLAND",
      "POLAND",
      "INDONESIA",
      "TAIWAN",
      "FRANCE",
      "QATAR",
      "SOUTH_KOREA",
      "ISRAEL",
      "SAUDI_ARABIA",
      "SPAIN",
    ]).describe(
      "Optional. The region where WildFire analysis will be performed. Palo Alto Networks supports regions: https://docs.paloaltonetworks.com/advanced-wildfire/administration/advanced-wildfire-overview/advanced-wildfire-deployments/advanced-wildfire-global-cloud",
    ).optional(),
  }).describe("Optional. Settings for WildFire analysis.").optional(),
  firewallEndpointId: z.string().describe(
    "Required. Id of the requesting object. If auto-generating Id server-side, remove this field and firewall_endpoint_id from the method_signature of Create RPC.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  associatedNetworks: z.array(z.string()).optional(),
  associations: z.array(z.object({
    name: z.string(),
    network: z.string(),
  })).optional(),
  billingProjectId: z.string().optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  endpointSettings: z.object({
    contentCloudRegion: z.string(),
    httpPartialResponseBlocked: z.boolean(),
    jumboFramesEnabled: z.boolean(),
  }).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  reconciling: z.boolean().optional(),
  satisfiesPzi: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  state: z.string().optional(),
  updateTime: z.string().optional(),
  wildfireSettings: z.object({
    enabled: z.boolean(),
    wildfireInlineCloudAnalysisSettings: z.object({
      maxAnalysisDuration: z.string(),
      submissionTimeoutLoggingDisabled: z.boolean(),
      timeoutAction: z.string(),
    }),
    wildfireRealtimeLookupDuration: z.string(),
    wildfireRealtimeLookupTimeoutAction: z.string(),
    wildfireRegion: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  billingProjectId: z.string().describe(
    "Optional. Project to charge for the deployed firewall endpoint. This field must be specified when creating the endpoint in the organization scope, and should be omitted otherwise.",
  ).optional(),
  description: z.string().describe(
    "Optional. Description of the firewall endpoint. Max length 2048 characters.",
  ).optional(),
  endpointSettings: z.object({
    contentCloudRegion: z.enum([
      "CONTENT_CLOUD_REGION_UNSPECIFIED",
      "US_CENTRAL",
      "APAC",
      "INDIA",
      "UK",
      "FRANCE",
      "JAPAN",
      "AUSTRALIA",
      "CANADA",
      "SWITZERLAND",
      "NETHERLANDS",
      "INDONESIA",
      "QATAR",
      "TAIWAN",
      "POLAND",
      "SOUTH_KOREA",
      "SAUDI_ARABIA",
      "ITALY",
    ]).describe("Optional. The content cloud region of the endpoint.")
      .optional(),
    httpPartialResponseBlocked: z.boolean().describe(
      "Optional. Whether to block HTTP partial responses for the endpoint. When this is true, resumption of blocked malicious HTTP file downloads will be blocked by the firewall. False provides maximum availability, true provides maximum security.",
    ).optional(),
    jumboFramesEnabled: z.boolean().describe(
      "Optional. Immutable. Indicates whether Jumbo Frames are enabled. Default value is false.",
    ).optional(),
  }).describe("Optional. Settings for the endpoint.").optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels as key value pairs",
  ).optional(),
  name: z.string().describe("Immutable. Identifier. Name of resource.")
    .optional(),
  wildfireSettings: z.object({
    enabled: z.boolean().describe(
      "Optional. Indicates whether WildFire analysis is enabled. Default value is false.",
    ).optional(),
    wildfireInlineCloudAnalysisSettings: z.object({
      maxAnalysisDuration: z.string().describe(
        "Optional. Timeout in milliseconds on a file being held while WildFire inline cloud analysis is performed. Value between 1 to 240000 is valid. Default value is 30000.",
      ).optional(),
      submissionTimeoutLoggingDisabled: z.boolean().describe(
        "Optional. Whether to disable WildFire submission log generation for files that timeout during WildFire inline cloud analysis.",
      ).optional(),
      timeoutAction: z.enum([
        "WILDFIRE_INLINE_CLOUD_ANALYSIS_TIMEOUT_ACTION_UNSPECIFIED",
        "ALLOW",
        "DENY",
      ]).describe(
        "Optional. Action to take when WildFire inline cloud analysis times out. Default value is ALLOW.",
      ).optional(),
    }).describe("Optional. Settings for WildFire inline cloud analysis.")
      .optional(),
    wildfireRealtimeLookupDuration: z.string().describe(
      "Optional. Duration in milliseconds on a file being held while the WildFire real time signature cloud performs a signature lookup. Value between 1 to 5000 is valid. Default value is 1000.",
    ).optional(),
    wildfireRealtimeLookupTimeoutAction: z.enum([
      "WILDFIRE_REALTIME_SIGNATURE_LOOKUP_TIMEOUT_ACTION_UNSPECIFIED",
      "ALLOW",
      "DENY",
    ]).describe(
      "Optional. Action to take on WildFire real time signature lookup timeout. Default value is ALLOW.",
    ).optional(),
    wildfireRegion: z.enum([
      "WILDFIRE_REGION_UNSPECIFIED",
      "CANADA",
      "UNITED_STATES",
      "JAPAN",
      "SINGAPORE",
      "UNITED_KINGDOM",
      "AUSTRALIA",
      "GERMANY",
      "INDIA",
      "SWITZERLAND",
      "POLAND",
      "INDONESIA",
      "TAIWAN",
      "FRANCE",
      "QATAR",
      "SOUTH_KOREA",
      "ISRAEL",
      "SAUDI_ARABIA",
      "SPAIN",
    ]).describe(
      "Optional. The region where WildFire analysis will be performed. Palo Alto Networks supports regions: https://docs.paloaltonetworks.com/advanced-wildfire/administration/advanced-wildfire-overview/advanced-wildfire-deployments/advanced-wildfire-global-cloud",
    ).optional(),
  }).describe("Optional. Settings for WildFire analysis.").optional(),
  firewallEndpointId: z.string().describe(
    "Required. Id of the requesting object. If auto-generating Id server-side, remove this field and firewall_endpoint_id from the method_signature of Create RPC.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
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
      : undefined,
    quotaProject: g.quotaProject as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Network Security FirewallEndpoints. Registered at `@swamp/gcp/networksecurity/firewallendpoints`. */
export const model = {
  type: "@swamp/gcp/networksecurity/firewallendpoints",
  version: "2026.09.28.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.01.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.1",
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
      toVersion: "2026.07.21.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.3",
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
      toVersion: "2026.09.28.1",
      description: "Added: wildfireSettings",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Message describing Endpoint object.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a firewallEndpoints",
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
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["billingProjectId"] !== undefined) {
          body["billingProjectId"] = g["billingProjectId"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["endpointSettings"] !== undefined) {
          body["endpointSettings"] = g["endpointSettings"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["wildfireSettings"] !== undefined) {
          body["wildfireSettings"] = g["wildfireSettings"];
        }
        if (g["firewallEndpointId"] !== undefined) {
          params["firewallEndpointId"] = String(g["firewallEndpointId"]);
        }
        if (g["requestId"] !== undefined) {
          params["requestId"] = String(g["requestId"]);
        }
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
      description: "Get a firewallEndpoints",
      arguments: z.object({
        identifier: z.string().describe("The name of the firewallEndpoints"),
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
      description: "Update firewallEndpoints attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific firewallEndpoints by name (e.g. one discovered by list)",
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
            String(g["parent"] ?? ""),
            existingName ?? g["name"]?.toString() ?? "",
          );
        }
        const body: Record<string, unknown> = {};
        if (g["billingProjectId"] !== undefined) {
          body["billingProjectId"] = g["billingProjectId"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["endpointSettings"] !== undefined) {
          body["endpointSettings"] = g["endpointSettings"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["wildfireSettings"] !== undefined) {
          body["wildfireSettings"] = g["wildfireSettings"];
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
    delete: {
      description: "Delete the firewallEndpoints",
      arguments: z.object({
        identifier: z.string().describe("The name of the firewallEndpoints"),
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
        const { existed } = await deleteResource(
          baseUrl,
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
      description: "Sync firewallEndpoints state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific firewallEndpoints by name (e.g. one discovered by list)",
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
      description: "List firewallEndpoints resources",
      arguments: z.object({
        filter: z.string().describe("Optional. Filtering results").optional(),
        orderBy: z.string().describe("Hint for how to order the results")
          .optional(),
        pageSize: z.number().describe(
          "Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default.",
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
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "firewallEndpoints",
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
