// Auto-generated extension model for @swamp/gcp/content/conversionsources
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Content for Shopping Conversionsources.
 *
 * Represents a conversion source owned by a Merchant account. A merchant account can have up to 200 conversion sources.
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

const BASE_URL = "https://shoppingcontent.googleapis.com/content/v2.1/";

const GET_CONFIG = {
  "id": "content.conversionsources.get",
  "path": "{merchantId}/conversionsources/{conversionSourceId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "merchantId",
    "conversionSourceId",
  ],
  "parameters": {
    "conversionSourceId": {
      "location": "path",
      "required": true,
    },
    "merchantId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "content.conversionsources.create",
  "path": "{merchantId}/conversionsources",
  "httpMethod": "POST",
  "parameterOrder": [
    "merchantId",
  ],
  "parameters": {
    "merchantId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "content.conversionsources.patch",
  "path": "{merchantId}/conversionsources/{conversionSourceId}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "merchantId",
    "conversionSourceId",
  ],
  "parameters": {
    "conversionSourceId": {
      "location": "path",
      "required": true,
    },
    "merchantId": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "content.conversionsources.delete",
  "path": "{merchantId}/conversionsources/{conversionSourceId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "merchantId",
    "conversionSourceId",
  ],
  "parameters": {
    "conversionSourceId": {
      "location": "path",
      "required": true,
    },
    "merchantId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "content.conversionsources.list",
  "path": "{merchantId}/conversionsources",
  "httpMethod": "GET",
  "parameterOrder": [
    "merchantId",
  ],
  "parameters": {
    "merchantId": {
      "location": "path",
      "required": true,
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "showDeleted": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  googleAnalyticsLink: z.object({
    attributionSettings: z.object({
      attributionLookbackWindowInDays: z.number().int().describe(
        "Required. Lookback windows (in days) used for attribution in this source. Supported values are 7, 30, 40.",
      ).optional(),
      attributionModel: z.enum([
        "ATTRIBUTION_MODEL_UNSPECIFIED",
        "CROSS_CHANNEL_LAST_CLICK",
        "ADS_PREFERRED_LAST_CLICK",
        "CROSS_CHANNEL_DATA_DRIVEN",
        "CROSS_CHANNEL_FIRST_CLICK",
        "CROSS_CHANNEL_LINEAR",
        "CROSS_CHANNEL_POSITION_BASED",
        "CROSS_CHANNEL_TIME_DECAY",
      ]).optional(),
      conversionType: z.array(z.object({
        includeInReporting: z.boolean().describe(
          "Output only. Option indicating if the type should be included in Merchant Center reporting.",
        ).optional(),
        name: z.string().describe(
          "Output only. Conversion event name, as it'll be reported by the client.",
        ).optional(),
      })).describe(
        'Immutable. Unordered list. List of different conversion types a conversion event can be classified as. A standard "purchase" type will be automatically created if this list is empty at creation time.',
      ).optional(),
    }).describe(
      "Represents attribution settings for conversion sources receiving pre-attribution data.",
    ).optional(),
    propertyId: z.string().describe(
      "Required. Immutable. ID of the Google Analytics property the merchant is linked to.",
    ).optional(),
    propertyName: z.string().describe(
      "Output only. Name of the Google Analytics property the merchant is linked to.",
    ).optional(),
  }).describe(
    '"Google Analytics Link" sources can be used to get conversion data from an existing Google Analytics property into the linked Merchant Center account.',
  ).optional(),
  merchantCenterDestination: z.object({
    attributionSettings: z.object({
      attributionLookbackWindowInDays: z.number().int().describe(
        "Required. Lookback windows (in days) used for attribution in this source. Supported values are 7, 30, 40.",
      ).optional(),
      attributionModel: z.enum([
        "ATTRIBUTION_MODEL_UNSPECIFIED",
        "CROSS_CHANNEL_LAST_CLICK",
        "ADS_PREFERRED_LAST_CLICK",
        "CROSS_CHANNEL_DATA_DRIVEN",
        "CROSS_CHANNEL_FIRST_CLICK",
        "CROSS_CHANNEL_LINEAR",
        "CROSS_CHANNEL_POSITION_BASED",
        "CROSS_CHANNEL_TIME_DECAY",
      ]).optional(),
      conversionType: z.array(z.object({
        includeInReporting: z.boolean().describe(
          "Output only. Option indicating if the type should be included in Merchant Center reporting.",
        ).optional(),
        name: z.string().describe(
          "Output only. Conversion event name, as it'll be reported by the client.",
        ).optional(),
      })).describe(
        'Immutable. Unordered list. List of different conversion types a conversion event can be classified as. A standard "purchase" type will be automatically created if this list is empty at creation time.',
      ).optional(),
    }).describe(
      "Represents attribution settings for conversion sources receiving pre-attribution data.",
    ).optional(),
    currencyCode: z.string().describe(
      "Required. Three-letter currency code (ISO 4217). The currency code defines in which currency the conversions sent to this destination will be reported in Merchant Center.",
    ).optional(),
    destinationId: z.string().describe(
      "Output only. Merchant Center Destination ID.",
    ).optional(),
    displayName: z.string().describe(
      "Required. Merchant-specified display name for the destination. This is the name that identifies the conversion source within the Merchant Center UI. Limited to 64 characters.",
    ).optional(),
  }).describe(
    '"Merchant Center Destination" sources can be used to send conversion events from a website using a Google tag directly to a Merchant Center account where the source is created.',
  ).optional(),
  merchantId: z.string().describe(
    "Required. The ID of the account that owns the new conversion source.",
  ),
});

const StateSchema = z.object({
  conversionSourceId: z.string().optional(),
  expireTime: z.string().optional(),
  googleAnalyticsLink: z.object({
    attributionSettings: z.object({
      attributionLookbackWindowInDays: z.number(),
      attributionModel: z.string(),
      conversionType: z.array(z.object({
        includeInReporting: z.boolean(),
        name: z.string(),
      })),
    }),
    propertyId: z.string(),
    propertyName: z.string(),
  }).optional(),
  merchantCenterDestination: z.object({
    attributionSettings: z.object({
      attributionLookbackWindowInDays: z.number(),
      attributionModel: z.string(),
      conversionType: z.array(z.object({
        includeInReporting: z.boolean(),
        name: z.string(),
      })),
    }),
    currencyCode: z.string(),
    destinationId: z.string(),
    displayName: z.string(),
  }).optional(),
  state: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  googleAnalyticsLink: z.object({
    attributionSettings: z.object({
      attributionLookbackWindowInDays: z.number().int().describe(
        "Required. Lookback windows (in days) used for attribution in this source. Supported values are 7, 30, 40.",
      ).optional(),
      attributionModel: z.enum([
        "ATTRIBUTION_MODEL_UNSPECIFIED",
        "CROSS_CHANNEL_LAST_CLICK",
        "ADS_PREFERRED_LAST_CLICK",
        "CROSS_CHANNEL_DATA_DRIVEN",
        "CROSS_CHANNEL_FIRST_CLICK",
        "CROSS_CHANNEL_LINEAR",
        "CROSS_CHANNEL_POSITION_BASED",
        "CROSS_CHANNEL_TIME_DECAY",
      ]).optional(),
      conversionType: z.array(z.object({
        includeInReporting: z.boolean().describe(
          "Output only. Option indicating if the type should be included in Merchant Center reporting.",
        ).optional(),
        name: z.string().describe(
          "Output only. Conversion event name, as it'll be reported by the client.",
        ).optional(),
      })).describe(
        'Immutable. Unordered list. List of different conversion types a conversion event can be classified as. A standard "purchase" type will be automatically created if this list is empty at creation time.',
      ).optional(),
    }).describe(
      "Represents attribution settings for conversion sources receiving pre-attribution data.",
    ).optional(),
    propertyId: z.string().describe(
      "Required. Immutable. ID of the Google Analytics property the merchant is linked to.",
    ).optional(),
    propertyName: z.string().describe(
      "Output only. Name of the Google Analytics property the merchant is linked to.",
    ).optional(),
  }).describe(
    '"Google Analytics Link" sources can be used to get conversion data from an existing Google Analytics property into the linked Merchant Center account.',
  ).optional(),
  merchantCenterDestination: z.object({
    attributionSettings: z.object({
      attributionLookbackWindowInDays: z.number().int().describe(
        "Required. Lookback windows (in days) used for attribution in this source. Supported values are 7, 30, 40.",
      ).optional(),
      attributionModel: z.enum([
        "ATTRIBUTION_MODEL_UNSPECIFIED",
        "CROSS_CHANNEL_LAST_CLICK",
        "ADS_PREFERRED_LAST_CLICK",
        "CROSS_CHANNEL_DATA_DRIVEN",
        "CROSS_CHANNEL_FIRST_CLICK",
        "CROSS_CHANNEL_LINEAR",
        "CROSS_CHANNEL_POSITION_BASED",
        "CROSS_CHANNEL_TIME_DECAY",
      ]).optional(),
      conversionType: z.array(z.object({
        includeInReporting: z.boolean().describe(
          "Output only. Option indicating if the type should be included in Merchant Center reporting.",
        ).optional(),
        name: z.string().describe(
          "Output only. Conversion event name, as it'll be reported by the client.",
        ).optional(),
      })).describe(
        'Immutable. Unordered list. List of different conversion types a conversion event can be classified as. A standard "purchase" type will be automatically created if this list is empty at creation time.',
      ).optional(),
    }).describe(
      "Represents attribution settings for conversion sources receiving pre-attribution data.",
    ).optional(),
    currencyCode: z.string().describe(
      "Required. Three-letter currency code (ISO 4217). The currency code defines in which currency the conversions sent to this destination will be reported in Merchant Center.",
    ).optional(),
    destinationId: z.string().describe(
      "Output only. Merchant Center Destination ID.",
    ).optional(),
    displayName: z.string().describe(
      "Required. Merchant-specified display name for the destination. This is the name that identifies the conversion source within the Merchant Center UI. Limited to 64 characters.",
    ).optional(),
  }).describe(
    '"Merchant Center Destination" sources can be used to send conversion events from a website using a Google tag directly to a Merchant Center account where the source is created.',
  ).optional(),
  merchantId: z.string().describe(
    "Required. The ID of the account that owns the new conversion source.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Content for Shopping Conversionsources. Registered at `@swamp/gcp/content/conversionsources`. */
export const model = {
  type: "@swamp/gcp/content/conversionsources",
  version: "2026.05.21.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents a conversion source owned by a Merchant account. A merchant accoun...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a conversionsources",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["merchantId"] !== undefined) {
          params["merchantId"] = String(g["merchantId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["googleAnalyticsLink"] !== undefined) {
          body["googleAnalyticsLink"] = g["googleAnalyticsLink"];
        }
        if (g["merchantCenterDestination"] !== undefined) {
          body["merchantCenterDestination"] = g["merchantCenterDestination"];
        }
        if (g["name"] !== undefined) {
          params["conversionSourceId"] = String(g["name"]);
        }
        const result = await createResource(
          BASE_URL,
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
            listParams: { "merchantId": String(g["merchantId"] ?? "") },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
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
      description: "Get a conversionsources",
      arguments: z.object({
        identifier: z.string().describe("The name of the conversionsources"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["merchantId"] !== undefined) {
          params["merchantId"] = String(g["merchantId"]);
        }
        params["conversionSourceId"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
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
      description: "Update conversionsources attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
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
        if (g["merchantId"] !== undefined) {
          params["merchantId"] = String(g["merchantId"]);
        } else if (existing["merchantId"]) {
          params["merchantId"] = String(existing["merchantId"]);
        }
        params["conversionSourceId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["googleAnalyticsLink"] !== undefined) {
          body["googleAnalyticsLink"] = g["googleAnalyticsLink"];
        }
        if (g["merchantCenterDestination"] !== undefined) {
          body["merchantCenterDestination"] = g["merchantCenterDestination"];
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
          BASE_URL,
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
      description: "Delete the conversionsources",
      arguments: z.object({
        identifier: z.string().describe("The name of the conversionsources"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["merchantId"] !== undefined) {
          params["merchantId"] = String(g["merchantId"]);
        }
        params["conversionSourceId"] = args.identifier;
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
      description: "Sync conversionsources state from GCP",
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
          if (g["merchantId"] !== undefined) {
            params["merchantId"] = String(g["merchantId"]);
          } else if (existing["merchantId"]) {
            params["merchantId"] = String(existing["merchantId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["conversionSourceId"] = identifier;
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
    undelete: {
      description: "undelete",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["merchantId"] !== undefined) {
          params["merchantId"] = String(g["merchantId"]);
        }
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
        params["conversionSourceId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "content.conversionsources.undelete",
            "path":
              "{merchantId}/conversionsources/{conversionSourceId}:undelete",
            "httpMethod": "POST",
            "parameterOrder": ["merchantId", "conversionSourceId"],
            "parameters": {
              "conversionSourceId": { "location": "path", "required": true },
              "merchantId": { "location": "path", "required": true },
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
