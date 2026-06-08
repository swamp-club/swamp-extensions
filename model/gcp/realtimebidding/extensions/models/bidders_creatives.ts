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

// Auto-generated extension model for @swamp/gcp/realtimebidding/bidders-creatives
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Real-time Bidding Bidders.Creatives.
 *
 * A creative and its classification data.
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
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://realtimebidding.googleapis.com/";

const LIST_CONFIG = {
  "id": "realtimebidding.bidders.creatives.list",
  "path": "v1/{+parent}/creatives",
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
    "view": {
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
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  accountId: z.string().optional(),
  adChoicesDestinationUrl: z.string().optional(),
  advertiserName: z.string().optional(),
  agencyId: z.string().optional(),
  apiUpdateTime: z.string().optional(),
  creativeFormat: z.string().optional(),
  creativeId: z.string().optional(),
  creativeServingDecision: z.object({
    adTechnologyProviders: z.object({
      detectedGvlIds: z.array(z.string()),
      detectedProviderIds: z.array(z.string()),
      unidentifiedProviderDomains: z.array(z.string()),
    }),
    chinaPolicyCompliance: z.object({
      status: z.string(),
      topics: z.array(z.object({
        evidences: z.array(z.unknown()),
        helpCenterUrl: z.string(),
        missingCertificate: z.boolean(),
        policyTopic: z.string(),
      })),
    }),
    dealsPolicyCompliance: z.object({
      status: z.string(),
      topics: z.array(z.object({
        evidences: z.array(z.unknown()),
        helpCenterUrl: z.string(),
        missingCertificate: z.boolean(),
        policyTopic: z.string(),
      })),
    }),
    detectedAdvertisers: z.array(z.object({
      advertiserId: z.string(),
      advertiserName: z.string(),
      brandId: z.string(),
      brandName: z.string(),
    })),
    detectedAttributes: z.array(z.string()),
    detectedCategories: z.array(z.string()),
    detectedCategoriesTaxonomy: z.string(),
    detectedClickThroughUrls: z.array(z.string()),
    detectedDomains: z.array(z.string()),
    detectedLanguages: z.array(z.string()),
    detectedProductCategories: z.array(z.number()),
    detectedSensitiveCategories: z.array(z.number()),
    detectedVendorIds: z.array(z.number()),
    lastStatusUpdate: z.string(),
    networkPolicyCompliance: z.object({
      status: z.string(),
      topics: z.array(z.object({
        evidences: z.array(z.unknown()),
        helpCenterUrl: z.string(),
        missingCertificate: z.boolean(),
        policyTopic: z.string(),
      })),
    }),
    platformPolicyCompliance: z.object({
      status: z.string(),
      topics: z.array(z.object({
        evidences: z.array(z.unknown()),
        helpCenterUrl: z.string(),
        missingCertificate: z.boolean(),
        policyTopic: z.string(),
      })),
    }),
    russiaPolicyCompliance: z.object({
      status: z.string(),
      topics: z.array(z.object({
        evidences: z.array(z.unknown()),
        helpCenterUrl: z.string(),
        missingCertificate: z.boolean(),
        policyTopic: z.string(),
      })),
    }),
  }).optional(),
  dealIds: z.array(z.string()).optional(),
  declaredAttributes: z.array(z.string()).optional(),
  declaredClickThroughUrls: z.array(z.string()).optional(),
  declaredRestrictedCategories: z.array(z.string()).optional(),
  declaredVendorIds: z.array(z.number()).optional(),
  html: z.object({
    height: z.number(),
    snippet: z.string(),
    width: z.number(),
  }).optional(),
  impressionTrackingUrls: z.array(z.string()).optional(),
  name: z.string(),
  native: z.object({
    advertiserName: z.string(),
    appIcon: z.object({
      height: z.number(),
      url: z.string(),
      width: z.number(),
    }),
    body: z.string(),
    callToAction: z.string(),
    clickLinkUrl: z.string(),
    clickTrackingUrl: z.string(),
    headline: z.string(),
    image: z.object({
      height: z.number(),
      url: z.string(),
      width: z.number(),
    }),
    logo: z.object({
      height: z.number(),
      url: z.string(),
      width: z.number(),
    }),
    priceDisplayText: z.string(),
    starRating: z.number(),
    videoUrl: z.string(),
    videoVastXml: z.string(),
  }).optional(),
  renderUrl: z.string().optional(),
  restrictedCategories: z.array(z.string()).optional(),
  version: z.number().optional(),
  video: z.object({
    videoMetadata: z.object({
      duration: z.string(),
      isValidVast: z.boolean(),
      isVpaid: z.boolean(),
      mediaFiles: z.array(z.object({
        bitrate: z.string(),
        mimeType: z.string(),
      })),
      skipOffset: z.string(),
      vastVersion: z.string(),
    }),
    videoUrl: z.string(),
    videoVastXml: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
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

/** Swamp extension model for Google Cloud Real-time Bidding Bidders.Creatives. Registered at `@swamp/gcp/realtimebidding/bidders-creatives`. */
export const model = {
  type: "@swamp/gcp/realtimebidding/bidders-creatives",
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
      toVersion: "2026.04.04.1",
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
      description: "A creative and its classification data.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a creatives",
      arguments: z.object({
        identifier: z.string().describe("The name of the creatives"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
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
    sync: {
      description: "Sync creatives state from GCP",
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
          if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
          else if (existing["parent"]) {
            params["parent"] = String(existing["parent"]);
          }
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
      description: "List creatives resources",
      arguments: z.object({
        filter: z.string().describe(
          "Query string to filter creatives. If no filter is specified, all active creatives will be returned. Example: 'accountId=12345 AND (dealsStatus:DISAPPROVED AND disapprovalReason:UNACCEPTABLE_CONTENT) OR declaredAttributes:IS_COOKIE_TARGETED'",
        ).optional(),
        pageSize: z.number().describe(
          "Requested page size. The server may return fewer creatives than requested (due to timeout constraint) even if more are available through another call. If unspecified, server will pick an appropriate default. Acceptable values are 1 to 1000, inclusive.",
        ).optional(),
        view: z.string().describe(
          'Controls the amount of information included in the response. By default only creativeServingDecision is included. To retrieve the entire creative resource (including the declared fields and the creative content) specify the view as "FULL".',
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
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["view"] !== undefined) params["view"] = String(args["view"]);
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "creatives",
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
    watch: {
      description: "watch",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const result = await createResource(
          BASE_URL,
          {
            "id": "realtimebidding.bidders.creatives.watch",
            "path": "v1/{+parent}/creatives:watch",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
            },
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
