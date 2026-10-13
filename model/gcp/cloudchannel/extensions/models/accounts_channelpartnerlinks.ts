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

// Auto-generated extension model for @swamp/gcp/cloudchannel/accounts-channelpartnerlinks
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Channel Accounts.ChannelPartnerLinks.
 *
 * Entity representing a link between distributors and their indirect resellers in an n-tier resale channel.
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
  return `${parent}/channelPartnerLinks/${shortName}`;
}

const BASE_URL = "https://cloudchannel.googleapis.com/";

const GET_CONFIG = {
  "id": "cloudchannel.accounts.channelPartnerLinks.get",
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
    "view": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "cloudchannel.accounts.channelPartnerLinks.create",
  "path": "v1/{+parent}/channelPartnerLinks",
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
  "id": "cloudchannel.accounts.channelPartnerLinks.patch",
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
  },
} as const;

const LIST_CONFIG = {
  "id": "cloudchannel.accounts.channelPartnerLinks.list",
  "path": "v1/{+parent}/channelPartnerLinks",
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
    "view": {
      "location": "query",
    },
  },
} as const;

const _defaultOAuthScopes: string[] = [
  "https://www.googleapis.com/auth/apps.order",
  "https://www.googleapis.com/auth/apps.reports.usage.readonly",
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
  linkState: z.enum([
    "CHANNEL_PARTNER_LINK_STATE_UNSPECIFIED",
    "INVITED",
    "ACTIVE",
    "REVOKED",
    "SUSPENDED",
  ]).describe("Required. State of the channel partner link.").optional(),
  resellerCloudIdentityId: z.string().describe(
    "Required. Cloud Identity ID of the linked reseller.",
  ).optional(),
  channelPartnerLink: z.object({
    channelPartnerCloudIdentityInfo: z.object({
      adminConsoleUri: z.string().describe(
        "Output only. URI of Customer's Admin console dashboard.",
      ).optional(),
      alternateEmail: z.string().describe("The alternate email.").optional(),
      customerType: z.enum(["CUSTOMER_TYPE_UNSPECIFIED", "DOMAIN", "TEAM"])
        .describe(
          "CustomerType indicates verification type needed for using services.",
        ).optional(),
      eduData: z.object({
        instituteSize: z.enum([
          "INSTITUTE_SIZE_UNSPECIFIED",
          "SIZE_1_100",
          "SIZE_101_500",
          "SIZE_501_1000",
          "SIZE_1001_2000",
          "SIZE_2001_5000",
          "SIZE_5001_10000",
          "SIZE_10001_OR_MORE",
        ]).describe("Size of the institute.").optional(),
        instituteType: z.enum([
          "INSTITUTE_TYPE_UNSPECIFIED",
          "K12",
          "UNIVERSITY",
        ]).describe("Designated institute type of customer.").optional(),
        website: z.string().describe(
          "Web address for the edu customer's institution.",
        ).optional(),
      }).describe("Edu information about the customer.").optional(),
      isDomainVerified: z.boolean().describe(
        "Output only. Whether the domain is verified. This field is not returned for a Customer's cloud_identity_info resource. Partners can use the domains.get() method of the Workspace SDK's Directory API, or listen to the PRIMARY_DOMAIN_VERIFIED Pub/Sub event in to track domain verification of their resolve Workspace customers.",
      ).optional(),
      languageCode: z.string().describe("Language code.").optional(),
      phoneNumber: z.string().describe(
        "Phone number associated with the Cloud Identity.",
      ).optional(),
      primaryDomain: z.string().describe(
        "Output only. The primary domain name.",
      ).optional(),
    }).describe("Output only. Cloud Identity info of the channel partner (IR).")
      .optional(),
    createTime: z.string().describe(
      "Output only. Timestamp of when the channel partner link is created.",
    ).optional(),
    inviteLinkUri: z.string().describe(
      "Output only. URI of the web page where partner accepts the link invitation.",
    ).optional(),
    linkState: z.enum([
      "CHANNEL_PARTNER_LINK_STATE_UNSPECIFIED",
      "INVITED",
      "ACTIVE",
      "REVOKED",
      "SUSPENDED",
    ]).describe("Required. State of the channel partner link.").optional(),
    name: z.string().describe(
      "Output only. Resource name for the channel partner link, in the format accounts/{account_id}/channelPartnerLinks/{id}.",
    ).optional(),
    publicId: z.string().describe(
      "Output only. Public identifier that a customer must use to generate a transfer token to move to this distributor-reseller combination.",
    ).optional(),
    resellerCloudIdentityId: z.string().describe(
      "Required. Cloud Identity ID of the linked reseller.",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. Timestamp of when the channel partner link is updated.",
    ).optional(),
  }).describe(
    "Required. The channel partner link to update. Only channel_partner_link.link_state is allowed for updates.",
  ).optional(),
  updateMask: z.string().describe(
    "Required. The update mask that applies to the resource. The only allowable value for an update mask is channel_partner_link.link_state.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  channelPartnerCloudIdentityInfo: z.object({
    adminConsoleUri: z.string(),
    alternateEmail: z.string(),
    customerType: z.string(),
    eduData: z.object({
      instituteSize: z.string(),
      instituteType: z.string(),
      website: z.string(),
    }),
    isDomainVerified: z.boolean(),
    languageCode: z.string(),
    phoneNumber: z.string(),
    primaryDomain: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  inviteLinkUri: z.string().optional(),
  linkState: z.string().optional(),
  name: z.string(),
  publicId: z.string().optional(),
  resellerCloudIdentityId: z.string().optional(),
  updateTime: z.string().optional(),
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
  linkState: z.enum([
    "CHANNEL_PARTNER_LINK_STATE_UNSPECIFIED",
    "INVITED",
    "ACTIVE",
    "REVOKED",
    "SUSPENDED",
  ]).describe("Required. State of the channel partner link.").optional(),
  resellerCloudIdentityId: z.string().describe(
    "Required. Cloud Identity ID of the linked reseller.",
  ).optional(),
  channelPartnerLink: z.object({
    channelPartnerCloudIdentityInfo: z.object({
      adminConsoleUri: z.string().describe(
        "Output only. URI of Customer's Admin console dashboard.",
      ).optional(),
      alternateEmail: z.string().describe("The alternate email.").optional(),
      customerType: z.enum(["CUSTOMER_TYPE_UNSPECIFIED", "DOMAIN", "TEAM"])
        .describe(
          "CustomerType indicates verification type needed for using services.",
        ).optional(),
      eduData: z.object({
        instituteSize: z.enum([
          "INSTITUTE_SIZE_UNSPECIFIED",
          "SIZE_1_100",
          "SIZE_101_500",
          "SIZE_501_1000",
          "SIZE_1001_2000",
          "SIZE_2001_5000",
          "SIZE_5001_10000",
          "SIZE_10001_OR_MORE",
        ]).describe("Size of the institute.").optional(),
        instituteType: z.enum([
          "INSTITUTE_TYPE_UNSPECIFIED",
          "K12",
          "UNIVERSITY",
        ]).describe("Designated institute type of customer.").optional(),
        website: z.string().describe(
          "Web address for the edu customer's institution.",
        ).optional(),
      }).describe("Edu information about the customer.").optional(),
      isDomainVerified: z.boolean().describe(
        "Output only. Whether the domain is verified. This field is not returned for a Customer's cloud_identity_info resource. Partners can use the domains.get() method of the Workspace SDK's Directory API, or listen to the PRIMARY_DOMAIN_VERIFIED Pub/Sub event in to track domain verification of their resolve Workspace customers.",
      ).optional(),
      languageCode: z.string().describe("Language code.").optional(),
      phoneNumber: z.string().describe(
        "Phone number associated with the Cloud Identity.",
      ).optional(),
      primaryDomain: z.string().describe(
        "Output only. The primary domain name.",
      ).optional(),
    }).describe("Output only. Cloud Identity info of the channel partner (IR).")
      .optional(),
    createTime: z.string().describe(
      "Output only. Timestamp of when the channel partner link is created.",
    ).optional(),
    inviteLinkUri: z.string().describe(
      "Output only. URI of the web page where partner accepts the link invitation.",
    ).optional(),
    linkState: z.enum([
      "CHANNEL_PARTNER_LINK_STATE_UNSPECIFIED",
      "INVITED",
      "ACTIVE",
      "REVOKED",
      "SUSPENDED",
    ]).describe("Required. State of the channel partner link.").optional(),
    name: z.string().describe(
      "Output only. Resource name for the channel partner link, in the format accounts/{account_id}/channelPartnerLinks/{id}.",
    ).optional(),
    publicId: z.string().describe(
      "Output only. Public identifier that a customer must use to generate a transfer token to move to this distributor-reseller combination.",
    ).optional(),
    resellerCloudIdentityId: z.string().describe(
      "Required. Cloud Identity ID of the linked reseller.",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. Timestamp of when the channel partner link is updated.",
    ).optional(),
  }).describe(
    "Required. The channel partner link to update. Only channel_partner_link.link_state is allowed for updates.",
  ).optional(),
  updateMask: z.string().describe(
    "Required. The update mask that applies to the resource. The only allowable value for an update mask is channel_partner_link.link_state.",
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

/** Swamp extension model for Google Cloud Channel Accounts.ChannelPartnerLinks. Registered at `@swamp/gcp/cloudchannel/accounts-channelpartnerlinks`. */
export const model = {
  type: "@swamp/gcp/cloudchannel/accounts-channelpartnerlinks",
  version: "2026.10.13.1",
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
      description: "Removed: channelPartnerCloudIdentityInfo",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          channelPartnerCloudIdentityInfo: _channelPartnerCloudIdentityInfo,
          ...rest
        } = old;
        return rest;
      },
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
        "Entity representing a link between distributors and their indirect resellers ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a channelPartnerLinks",
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
        if (g["linkState"] !== undefined) body["linkState"] = g["linkState"];
        if (g["resellerCloudIdentityId"] !== undefined) {
          body["resellerCloudIdentityId"] = g["resellerCloudIdentityId"];
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
      description: "Get a channelPartnerLinks",
      arguments: z.object({
        identifier: z.string().describe("The name of the channelPartnerLinks"),
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
      description: "Update channelPartnerLinks attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific channelPartnerLinks by name (e.g. one discovered by list)",
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
        if (g["channelPartnerLink"] !== undefined) {
          body["channelPartnerLink"] = g["channelPartnerLink"];
        }
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
      description: "Sync channelPartnerLinks state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific channelPartnerLinks by name (e.g. one discovered by list)",
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
      description: "List channelPartnerLinks resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "Optional. Requested page size. Server might return fewer results than requested. If unspecified, server will pick a default size (25). The maximum value is 200; the server will coerce values above 200.",
        ).optional(),
        view: z.string().describe(
          "Optional. The level of granularity the ChannelPartnerLink will display.",
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
        if (args["view"] !== undefined) params["view"] = String(args["view"]);
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "channelPartnerLinks",
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
