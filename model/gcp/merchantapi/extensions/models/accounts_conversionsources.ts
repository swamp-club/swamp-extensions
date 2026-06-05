// Auto-generated extension model for @swamp/gcp/merchantapi/accounts-conversionsources
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Merchant Accounts.ConversionSources.
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
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/conversionSources/${shortName}`;
}

const BASE_URL = "https://merchantapi.googleapis.com/";

const GET_CONFIG = {
  "id": "merchantapi.accounts.conversionSources.get",
  "path": "conversions/v1/{+name}",
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
  "id": "merchantapi.accounts.conversionSources.create",
  "path": "conversions/v1/{+parent}/conversionSources",
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
  "id": "merchantapi.accounts.conversionSources.patch",
  "path": "conversions/v1/{+name}",
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

const DELETE_CONFIG = {
  "id": "merchantapi.accounts.conversionSources.delete",
  "path": "conversions/v1/{+name}",
  "httpMethod": "DELETE",
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
  "id": "merchantapi.accounts.conversionSources.list",
  "path": "conversions/v1/{+parent}/conversionSources",
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
      attributionLookbackWindowDays: z.number().int().describe(
        "Required. Lookback window (in days) used for attribution in this source. Supported values are `7`, `30` & `40`.",
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
      ]).describe("Required. Attribution model.").optional(),
      conversionType: z.array(z.object({
        name: z.string().describe(
          "Output only. Conversion event name, as it'll be reported by the client.",
        ).optional(),
        report: z.boolean().describe(
          "Output only. Option indicating if the type should be included in Merchant Center reporting.",
        ).optional(),
      })).describe(
        'Immutable. Unordered list. List of different conversion types a conversion event can be classified as. A standard "purchase" type will be automatically created if this list is empty at creation time.',
      ).optional(),
    }).describe(
      "Represents attribution settings for conversion sources receiving pre-attribution data.",
    ).optional(),
    property: z.string().describe(
      "Output only. Name of the Google Analytics property the merchant is linked to.",
    ).optional(),
    propertyId: z.string().describe(
      "Required. Immutable. ID of the Google Analytics property the merchant is linked to.",
    ).optional(),
  }).describe(
    '"Google Analytics Link" sources can be used to get conversion data from an existing Google Analytics property into the linked Merchant Center account.',
  ).optional(),
  merchantCenterDestination: z.object({
    attributionSettings: z.object({
      attributionLookbackWindowDays: z.number().int().describe(
        "Required. Lookback window (in days) used for attribution in this source. Supported values are `7`, `30` & `40`.",
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
      ]).describe("Required. Attribution model.").optional(),
      conversionType: z.array(z.object({
        name: z.string().describe(
          "Output only. Conversion event name, as it'll be reported by the client.",
        ).optional(),
        report: z.boolean().describe(
          "Output only. Option indicating if the type should be included in Merchant Center reporting.",
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
    destination: z.string().describe(
      "Output only. Merchant Center Destination ID.",
    ).optional(),
    displayName: z.string().describe(
      "Required. Merchant-specified display name for the destination. This is the name that identifies the conversion source within the Merchant Center UI. The maximum length is 64 characters.",
    ).optional(),
  }).describe(
    '"Merchant Center Destination" sources can be used to send conversion events from an online store using a Google tag directly to a Merchant Center account where the source is created.',
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  controller: z.string().optional(),
  expireTime: z.string().optional(),
  googleAnalyticsLink: z.object({
    attributionSettings: z.object({
      attributionLookbackWindowDays: z.number(),
      attributionModel: z.string(),
      conversionType: z.array(z.object({
        name: z.string(),
        report: z.boolean(),
      })),
    }),
    property: z.string(),
    propertyId: z.string(),
  }).optional(),
  merchantCenterDestination: z.object({
    attributionSettings: z.object({
      attributionLookbackWindowDays: z.number(),
      attributionModel: z.string(),
      conversionType: z.array(z.object({
        name: z.string(),
        report: z.boolean(),
      })),
    }),
    currencyCode: z.string(),
    destination: z.string(),
    displayName: z.string(),
  }).optional(),
  name: z.string(),
  state: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  googleAnalyticsLink: z.object({
    attributionSettings: z.object({
      attributionLookbackWindowDays: z.number().int().describe(
        "Required. Lookback window (in days) used for attribution in this source. Supported values are `7`, `30` & `40`.",
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
      ]).describe("Required. Attribution model.").optional(),
      conversionType: z.array(z.object({
        name: z.string().describe(
          "Output only. Conversion event name, as it'll be reported by the client.",
        ).optional(),
        report: z.boolean().describe(
          "Output only. Option indicating if the type should be included in Merchant Center reporting.",
        ).optional(),
      })).describe(
        'Immutable. Unordered list. List of different conversion types a conversion event can be classified as. A standard "purchase" type will be automatically created if this list is empty at creation time.',
      ).optional(),
    }).describe(
      "Represents attribution settings for conversion sources receiving pre-attribution data.",
    ).optional(),
    property: z.string().describe(
      "Output only. Name of the Google Analytics property the merchant is linked to.",
    ).optional(),
    propertyId: z.string().describe(
      "Required. Immutable. ID of the Google Analytics property the merchant is linked to.",
    ).optional(),
  }).describe(
    '"Google Analytics Link" sources can be used to get conversion data from an existing Google Analytics property into the linked Merchant Center account.',
  ).optional(),
  merchantCenterDestination: z.object({
    attributionSettings: z.object({
      attributionLookbackWindowDays: z.number().int().describe(
        "Required. Lookback window (in days) used for attribution in this source. Supported values are `7`, `30` & `40`.",
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
      ]).describe("Required. Attribution model.").optional(),
      conversionType: z.array(z.object({
        name: z.string().describe(
          "Output only. Conversion event name, as it'll be reported by the client.",
        ).optional(),
        report: z.boolean().describe(
          "Output only. Option indicating if the type should be included in Merchant Center reporting.",
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
    destination: z.string().describe(
      "Output only. Merchant Center Destination ID.",
    ).optional(),
    displayName: z.string().describe(
      "Required. Merchant-specified display name for the destination. This is the name that identifies the conversion source within the Merchant Center UI. The maximum length is 64 characters.",
    ).optional(),
  }).describe(
    '"Merchant Center Destination" sources can be used to send conversion events from an online store using a Google tag directly to a Merchant Center account where the source is created.',
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Merchant Accounts.ConversionSources. Registered at `@swamp/gcp/merchantapi/accounts-conversionsources`. */
export const model = {
  type: "@swamp/gcp/merchantapi/accounts-conversionsources",
  version: "2026.06.05.1",
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
      description: "Create a conversionSources",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["googleAnalyticsLink"] !== undefined) {
          body["googleAnalyticsLink"] = g["googleAnalyticsLink"];
        }
        if (g["merchantCenterDestination"] !== undefined) {
          body["merchantCenterDestination"] = g["merchantCenterDestination"];
        }
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
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
            listParams: {
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
            },
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
      description: "Get a conversionSources",
      arguments: z.object({
        identifier: z.string().describe("The name of the conversionSources"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
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
      description: "Update conversionSources attributes",
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
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
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
      description: "Delete the conversionSources",
      arguments: z.object({
        identifier: z.string().describe("The name of the conversionSources"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
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
      description: "Sync conversionSources state from GCP",
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
          const shortName = existing.name?.toString() ?? g["name"]?.toString();
          if (!shortName) throw new Error("No identifier found");
          params["name"] = buildResourceName(
            String(g["parent"] ?? ""),
            shortName,
          );
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
    list: {
      description: "List conversionSources resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "Optional. The maximum number of conversion sources to return in a page. If no `page_size` is specified, `100` is used as the default value. The maximum value is `200`. Values above `200` will be coerced to `200`. Regardless of pagination, at most `200` conversion sources are returned in total.",
        ).optional(),
        showDeleted: z.boolean().describe(
          "Optional. Show deleted (archived) conversion sources. By default, deleted conversion sources are not returned.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["showDeleted"] !== undefined) {
          params["showDeleted"] = String(args["showDeleted"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "conversionSources",
          (args.maxPages as number | undefined) ?? 10,
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
    undelete: {
      description: "undelete",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "merchantapi.accounts.conversionSources.undelete",
            "path": "conversions/v1/{+name}:undelete",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
  },
};
