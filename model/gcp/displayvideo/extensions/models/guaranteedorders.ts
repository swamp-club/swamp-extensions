// Auto-generated extension model for @swamp/gcp/displayvideo/guaranteedorders
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Display & Video 360 GuaranteedOrders.
 *
 * A guaranteed order. Guaranteed orders are parent entity of guaranteed inventory sources. When creating a guaranteed inventory source, a guaranteed order ID must be assigned to the inventory source.
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
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://displayvideo.googleapis.com/";

const GET_CONFIG = {
  "id": "displayvideo.guaranteedOrders.get",
  "path": "v4/guaranteedOrders/{+guaranteedOrderId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "guaranteedOrderId",
  ],
  "parameters": {
    "advertiserId": {
      "location": "query",
    },
    "guaranteedOrderId": {
      "location": "path",
      "required": true,
    },
    "partnerId": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "displayvideo.guaranteedOrders.create",
  "path": "v4/guaranteedOrders",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {
    "advertiserId": {
      "location": "query",
    },
    "partnerId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "displayvideo.guaranteedOrders.patch",
  "path": "v4/guaranteedOrders/{+guaranteedOrderId}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "guaranteedOrderId",
  ],
  "parameters": {
    "advertiserId": {
      "location": "query",
    },
    "guaranteedOrderId": {
      "location": "path",
      "required": true,
    },
    "partnerId": {
      "location": "query",
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  defaultCampaignId: z.string().describe(
    "The ID of the default campaign that is assigned to the guaranteed order. The default campaign must belong to the default advertiser.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The display name of the guaranteed order. Must be UTF-8 encoded with a maximum size of 240 bytes.",
  ).optional(),
  exchange: z.enum([
    "EXCHANGE_UNSPECIFIED",
    "EXCHANGE_GOOGLE_AD_MANAGER",
    "EXCHANGE_APPNEXUS",
    "EXCHANGE_BRIGHTROLL",
    "EXCHANGE_ADFORM",
    "EXCHANGE_ADMETA",
    "EXCHANGE_ADMIXER",
    "EXCHANGE_ADSMOGO",
    "EXCHANGE_ADSWIZZ",
    "EXCHANGE_BIDSWITCH",
    "EXCHANGE_BRIGHTROLL_DISPLAY",
    "EXCHANGE_CADREON",
    "EXCHANGE_DAILYMOTION",
    "EXCHANGE_FIVE",
    "EXCHANGE_FLUCT",
    "EXCHANGE_FREEWHEEL",
    "EXCHANGE_GENIEE",
    "EXCHANGE_GUMGUM",
    "EXCHANGE_IMOBILE",
    "EXCHANGE_IBILLBOARD",
    "EXCHANGE_IMPROVE_DIGITAL",
    "EXCHANGE_INDEX",
    "EXCHANGE_KARGO",
    "EXCHANGE_MICROAD",
    "EXCHANGE_MOPUB",
    "EXCHANGE_NEND",
    "EXCHANGE_ONE_BY_AOL_DISPLAY",
    "EXCHANGE_ONE_BY_AOL_MOBILE",
    "EXCHANGE_ONE_BY_AOL_VIDEO",
    "EXCHANGE_OOYALA",
    "EXCHANGE_OPENX",
    "EXCHANGE_PERMODO",
    "EXCHANGE_PLATFORMONE",
    "EXCHANGE_PLATFORMID",
    "EXCHANGE_PUBMATIC",
    "EXCHANGE_PULSEPOINT",
    "EXCHANGE_REVENUEMAX",
    "EXCHANGE_RUBICON",
    "EXCHANGE_SMARTCLIP",
    "EXCHANGE_SMARTRTB",
    "EXCHANGE_SMARTSTREAMTV",
    "EXCHANGE_SOVRN",
    "EXCHANGE_SPOTXCHANGE",
    "EXCHANGE_STROER",
    "EXCHANGE_TEADSTV",
    "EXCHANGE_TELARIA",
    "EXCHANGE_TVN",
    "EXCHANGE_UNITED",
    "EXCHANGE_YIELDLAB",
    "EXCHANGE_YIELDMO",
    "EXCHANGE_UNRULYX",
    "EXCHANGE_OPEN8",
    "EXCHANGE_TRITON",
    "EXCHANGE_TRIPLELIFT",
    "EXCHANGE_TABOOLA",
    "EXCHANGE_INMOBI",
    "EXCHANGE_SMAATO",
    "EXCHANGE_AJA",
    "EXCHANGE_SUPERSHIP",
    "EXCHANGE_NEXSTAR_DIGITAL",
    "EXCHANGE_WAZE",
    "EXCHANGE_SOUNDCAST",
    "EXCHANGE_SHARETHROUGH",
    "EXCHANGE_FYBER",
    "EXCHANGE_RED_FOR_PUBLISHERS",
    "EXCHANGE_MEDIANET",
    "EXCHANGE_TAPJOY",
    "EXCHANGE_VISTAR",
    "EXCHANGE_DAX",
    "EXCHANGE_JCD",
    "EXCHANGE_PLACE_EXCHANGE",
    "EXCHANGE_APPLOVIN",
    "EXCHANGE_CONNATIX",
    "EXCHANGE_RESET_DIGITAL",
    "EXCHANGE_HIVESTACK",
    "EXCHANGE_DRAX",
    "EXCHANGE_APPLOVIN_GBID",
    "EXCHANGE_FYBER_GBID",
    "EXCHANGE_UNITY_GBID",
    "EXCHANGE_CHARTBOOST_GBID",
    "EXCHANGE_ADMOST_GBID",
    "EXCHANGE_TOPON_GBID",
    "EXCHANGE_NETFLIX",
    "EXCHANGE_CORE",
    "EXCHANGE_COMMERCE_GRID",
    "EXCHANGE_SPOTIFY",
    "EXCHANGE_TUBI",
    "EXCHANGE_SNAP",
    "EXCHANGE_CADENT",
  ]).describe(
    "Required. Immutable. The exchange where the guaranteed order originated.",
  ).optional(),
  publisherName: z.string().describe(
    "Required. The publisher name of the guaranteed order. Must be UTF-8 encoded with a maximum size of 240 bytes.",
  ).optional(),
  readAccessInherited: z.boolean().describe(
    "Whether all advertisers of read_write_partner_id have read access to the guaranteed order. Only applicable if read_write_partner_id is set. If True, overrides read_advertiser_ids.",
  ).optional(),
  readAdvertiserIds: z.array(z.string()).describe(
    "The IDs of advertisers with read access to the guaranteed order. This field must not include the advertiser assigned to read_write_advertiser_id if it is set. All advertisers in this field must belong to read_write_partner_id or the same partner as read_write_advertiser_id.",
  ).optional(),
  readWriteAdvertiserId: z.string().describe(
    "The advertiser with read/write access to the guaranteed order. This is also the default advertiser of the guaranteed order.",
  ).optional(),
  readWritePartnerId: z.string().describe(
    "The partner with read/write access to the guaranteed order.",
  ).optional(),
  status: z.object({
    configStatus: z.enum([
      "GUARANTEED_ORDER_CONFIG_STATUS_UNSPECIFIED",
      "PENDING",
      "COMPLETED",
    ]).describe(
      "Output only. The configuration status of the guaranteed order. Acceptable values are `PENDING` and `COMPLETED`. A guaranteed order must be configured (fill in the required fields, choose creatives, and select a default campaign) before it can serve. Currently the configuration action can only be performed via UI.",
    ).optional(),
    entityPauseReason: z.string().describe(
      "The user-provided reason for pausing this guaranteed order. Must be UTF-8 encoded with a maximum length of 100 bytes. Only applicable when entity_status is set to `ENTITY_STATUS_PAUSED`.",
    ).optional(),
    entityStatus: z.enum([
      "ENTITY_STATUS_UNSPECIFIED",
      "ENTITY_STATUS_ACTIVE",
      "ENTITY_STATUS_ARCHIVED",
      "ENTITY_STATUS_DRAFT",
      "ENTITY_STATUS_PAUSED",
      "ENTITY_STATUS_SCHEDULED_FOR_DELETION",
    ]).describe(
      "Whether or not the guaranteed order is servable. Acceptable values are `ENTITY_STATUS_ACTIVE`, `ENTITY_STATUS_ARCHIVED`, and `ENTITY_STATUS_PAUSED`. Default value is `ENTITY_STATUS_ACTIVE`.",
    ).optional(),
  }).describe("The status settings of the guaranteed order.").optional(),
  advertiserId: z.string().describe(
    "The ID of the advertiser that the request is being made within.",
  ).optional(),
  partnerId: z.string().describe(
    "The ID of the partner that the request is being made within.",
  ).optional(),
});

const StateSchema = z.object({
  defaultAdvertiserId: z.string().optional(),
  defaultCampaignId: z.string().optional(),
  displayName: z.string().optional(),
  exchange: z.string().optional(),
  guaranteedOrderId: z.string().optional(),
  legacyGuaranteedOrderId: z.string().optional(),
  name: z.string(),
  publisherName: z.string().optional(),
  readAccessInherited: z.boolean().optional(),
  readAdvertiserIds: z.array(z.string()).optional(),
  readWriteAdvertiserId: z.string().optional(),
  readWritePartnerId: z.string().optional(),
  status: z.object({
    configStatus: z.string(),
    entityPauseReason: z.string(),
    entityStatus: z.string(),
  }).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  defaultCampaignId: z.string().describe(
    "The ID of the default campaign that is assigned to the guaranteed order. The default campaign must belong to the default advertiser.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The display name of the guaranteed order. Must be UTF-8 encoded with a maximum size of 240 bytes.",
  ).optional(),
  exchange: z.enum([
    "EXCHANGE_UNSPECIFIED",
    "EXCHANGE_GOOGLE_AD_MANAGER",
    "EXCHANGE_APPNEXUS",
    "EXCHANGE_BRIGHTROLL",
    "EXCHANGE_ADFORM",
    "EXCHANGE_ADMETA",
    "EXCHANGE_ADMIXER",
    "EXCHANGE_ADSMOGO",
    "EXCHANGE_ADSWIZZ",
    "EXCHANGE_BIDSWITCH",
    "EXCHANGE_BRIGHTROLL_DISPLAY",
    "EXCHANGE_CADREON",
    "EXCHANGE_DAILYMOTION",
    "EXCHANGE_FIVE",
    "EXCHANGE_FLUCT",
    "EXCHANGE_FREEWHEEL",
    "EXCHANGE_GENIEE",
    "EXCHANGE_GUMGUM",
    "EXCHANGE_IMOBILE",
    "EXCHANGE_IBILLBOARD",
    "EXCHANGE_IMPROVE_DIGITAL",
    "EXCHANGE_INDEX",
    "EXCHANGE_KARGO",
    "EXCHANGE_MICROAD",
    "EXCHANGE_MOPUB",
    "EXCHANGE_NEND",
    "EXCHANGE_ONE_BY_AOL_DISPLAY",
    "EXCHANGE_ONE_BY_AOL_MOBILE",
    "EXCHANGE_ONE_BY_AOL_VIDEO",
    "EXCHANGE_OOYALA",
    "EXCHANGE_OPENX",
    "EXCHANGE_PERMODO",
    "EXCHANGE_PLATFORMONE",
    "EXCHANGE_PLATFORMID",
    "EXCHANGE_PUBMATIC",
    "EXCHANGE_PULSEPOINT",
    "EXCHANGE_REVENUEMAX",
    "EXCHANGE_RUBICON",
    "EXCHANGE_SMARTCLIP",
    "EXCHANGE_SMARTRTB",
    "EXCHANGE_SMARTSTREAMTV",
    "EXCHANGE_SOVRN",
    "EXCHANGE_SPOTXCHANGE",
    "EXCHANGE_STROER",
    "EXCHANGE_TEADSTV",
    "EXCHANGE_TELARIA",
    "EXCHANGE_TVN",
    "EXCHANGE_UNITED",
    "EXCHANGE_YIELDLAB",
    "EXCHANGE_YIELDMO",
    "EXCHANGE_UNRULYX",
    "EXCHANGE_OPEN8",
    "EXCHANGE_TRITON",
    "EXCHANGE_TRIPLELIFT",
    "EXCHANGE_TABOOLA",
    "EXCHANGE_INMOBI",
    "EXCHANGE_SMAATO",
    "EXCHANGE_AJA",
    "EXCHANGE_SUPERSHIP",
    "EXCHANGE_NEXSTAR_DIGITAL",
    "EXCHANGE_WAZE",
    "EXCHANGE_SOUNDCAST",
    "EXCHANGE_SHARETHROUGH",
    "EXCHANGE_FYBER",
    "EXCHANGE_RED_FOR_PUBLISHERS",
    "EXCHANGE_MEDIANET",
    "EXCHANGE_TAPJOY",
    "EXCHANGE_VISTAR",
    "EXCHANGE_DAX",
    "EXCHANGE_JCD",
    "EXCHANGE_PLACE_EXCHANGE",
    "EXCHANGE_APPLOVIN",
    "EXCHANGE_CONNATIX",
    "EXCHANGE_RESET_DIGITAL",
    "EXCHANGE_HIVESTACK",
    "EXCHANGE_DRAX",
    "EXCHANGE_APPLOVIN_GBID",
    "EXCHANGE_FYBER_GBID",
    "EXCHANGE_UNITY_GBID",
    "EXCHANGE_CHARTBOOST_GBID",
    "EXCHANGE_ADMOST_GBID",
    "EXCHANGE_TOPON_GBID",
    "EXCHANGE_NETFLIX",
    "EXCHANGE_CORE",
    "EXCHANGE_COMMERCE_GRID",
    "EXCHANGE_SPOTIFY",
    "EXCHANGE_TUBI",
    "EXCHANGE_SNAP",
    "EXCHANGE_CADENT",
  ]).describe(
    "Required. Immutable. The exchange where the guaranteed order originated.",
  ).optional(),
  publisherName: z.string().describe(
    "Required. The publisher name of the guaranteed order. Must be UTF-8 encoded with a maximum size of 240 bytes.",
  ).optional(),
  readAccessInherited: z.boolean().describe(
    "Whether all advertisers of read_write_partner_id have read access to the guaranteed order. Only applicable if read_write_partner_id is set. If True, overrides read_advertiser_ids.",
  ).optional(),
  readAdvertiserIds: z.array(z.string()).describe(
    "The IDs of advertisers with read access to the guaranteed order. This field must not include the advertiser assigned to read_write_advertiser_id if it is set. All advertisers in this field must belong to read_write_partner_id or the same partner as read_write_advertiser_id.",
  ).optional(),
  readWriteAdvertiserId: z.string().describe(
    "The advertiser with read/write access to the guaranteed order. This is also the default advertiser of the guaranteed order.",
  ).optional(),
  readWritePartnerId: z.string().describe(
    "The partner with read/write access to the guaranteed order.",
  ).optional(),
  status: z.object({
    configStatus: z.enum([
      "GUARANTEED_ORDER_CONFIG_STATUS_UNSPECIFIED",
      "PENDING",
      "COMPLETED",
    ]).describe(
      "Output only. The configuration status of the guaranteed order. Acceptable values are `PENDING` and `COMPLETED`. A guaranteed order must be configured (fill in the required fields, choose creatives, and select a default campaign) before it can serve. Currently the configuration action can only be performed via UI.",
    ).optional(),
    entityPauseReason: z.string().describe(
      "The user-provided reason for pausing this guaranteed order. Must be UTF-8 encoded with a maximum length of 100 bytes. Only applicable when entity_status is set to `ENTITY_STATUS_PAUSED`.",
    ).optional(),
    entityStatus: z.enum([
      "ENTITY_STATUS_UNSPECIFIED",
      "ENTITY_STATUS_ACTIVE",
      "ENTITY_STATUS_ARCHIVED",
      "ENTITY_STATUS_DRAFT",
      "ENTITY_STATUS_PAUSED",
      "ENTITY_STATUS_SCHEDULED_FOR_DELETION",
    ]).describe(
      "Whether or not the guaranteed order is servable. Acceptable values are `ENTITY_STATUS_ACTIVE`, `ENTITY_STATUS_ARCHIVED`, and `ENTITY_STATUS_PAUSED`. Default value is `ENTITY_STATUS_ACTIVE`.",
    ).optional(),
  }).describe("The status settings of the guaranteed order.").optional(),
  advertiserId: z.string().describe(
    "The ID of the advertiser that the request is being made within.",
  ).optional(),
  partnerId: z.string().describe(
    "The ID of the partner that the request is being made within.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Display & Video 360 GuaranteedOrders. Registered at `@swamp/gcp/displayvideo/guaranteedorders`. */
export const model = {
  type: "@swamp/gcp/displayvideo/guaranteedorders",
  version: "2026.05.19.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A guaranteed order. Guaranteed orders are parent entity of guaranteed invento...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a guaranteedOrders",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["defaultCampaignId"] !== undefined) {
          body["defaultCampaignId"] = g["defaultCampaignId"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["exchange"] !== undefined) body["exchange"] = g["exchange"];
        if (g["publisherName"] !== undefined) {
          body["publisherName"] = g["publisherName"];
        }
        if (g["readAccessInherited"] !== undefined) {
          body["readAccessInherited"] = g["readAccessInherited"];
        }
        if (g["readAdvertiserIds"] !== undefined) {
          body["readAdvertiserIds"] = g["readAdvertiserIds"];
        }
        if (g["readWriteAdvertiserId"] !== undefined) {
          body["readWriteAdvertiserId"] = g["readWriteAdvertiserId"];
        }
        if (g["readWritePartnerId"] !== undefined) {
          body["readWritePartnerId"] = g["readWritePartnerId"];
        }
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["advertiserId"] !== undefined) {
          body["advertiserId"] = g["advertiserId"];
        }
        if (g["partnerId"] !== undefined) body["partnerId"] = g["partnerId"];
        if (g["name"] !== undefined) {
          params["guaranteedOrderId"] = String(g["name"]);
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
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
      description: "Get a guaranteedOrders",
      arguments: z.object({
        identifier: z.string().describe("The name of the guaranteedOrders"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["guaranteedOrderId"] = args.identifier;
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
      description: "Update guaranteedOrders attributes",
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
        const params: Record<string, string> = { project: projectId };
        params["guaranteedOrderId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["defaultCampaignId"] !== undefined) {
          body["defaultCampaignId"] = g["defaultCampaignId"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["publisherName"] !== undefined) {
          body["publisherName"] = g["publisherName"];
        }
        if (g["readAccessInherited"] !== undefined) {
          body["readAccessInherited"] = g["readAccessInherited"];
        }
        if (g["readAdvertiserIds"] !== undefined) {
          body["readAdvertiserIds"] = g["readAdvertiserIds"];
        }
        if (g["readWriteAdvertiserId"] !== undefined) {
          body["readWriteAdvertiserId"] = g["readWriteAdvertiserId"];
        }
        if (g["readWritePartnerId"] !== undefined) {
          body["readWritePartnerId"] = g["readWritePartnerId"];
        }
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
          PATCH_CONFIG,
          params,
          body,
          GET_CONFIG,
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
      description: "Sync guaranteedOrders state from GCP",
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
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["guaranteedOrderId"] = identifier;
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
    edit_guaranteed_order_read_accessors: {
      description: "edit guaranteed order read accessors",
      arguments: z.object({
        addedAdvertisers: z.any().optional(),
        partnerId: z.any().optional(),
        readAccessInherited: z.any().optional(),
        removedAdvertisers: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        params["guaranteedOrderId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["addedAdvertisers"] !== undefined) {
          body["addedAdvertisers"] = args["addedAdvertisers"];
        }
        if (args["partnerId"] !== undefined) {
          body["partnerId"] = args["partnerId"];
        }
        if (args["readAccessInherited"] !== undefined) {
          body["readAccessInherited"] = args["readAccessInherited"];
        }
        if (args["removedAdvertisers"] !== undefined) {
          body["removedAdvertisers"] = args["removedAdvertisers"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "displayvideo.guaranteedOrders.editGuaranteedOrderReadAccessors",
            "path":
              "v4/guaranteedOrders/{+guaranteedOrderId}:editGuaranteedOrderReadAccessors",
            "httpMethod": "POST",
            "parameterOrder": ["guaranteedOrderId"],
            "parameters": {
              "guaranteedOrderId": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
