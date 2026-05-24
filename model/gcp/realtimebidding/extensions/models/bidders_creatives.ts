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
  getProjectId,
  isResourceNotFoundError,
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
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Real-time Bidding Bidders.Creatives. Registered at `@swamp/gcp/realtimebidding/bidders-creatives`. */
export const model = {
  type: "@swamp/gcp/realtimebidding/bidders-creatives",
  version: "2026.05.24.1",
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
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const result = await readViaList(
          BASE_URL,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
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
    watch: {
      description: "watch",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        );
        return { result };
      },
    },
  },
};
