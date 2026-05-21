// Auto-generated extension model for @swamp/gcp/dfareporting/advertisers
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Campaign Manager 360 Advertisers.
 *
 * Contains properties of a Campaign Manager advertiser.
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

const BASE_URL = "https://dfareporting.googleapis.com/dfareporting/v5/";

const GET_CONFIG = {
  "id": "dfareporting.advertisers.get",
  "path": "userprofiles/{+profileId}/advertisers/{+id}",
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
  "id": "dfareporting.advertisers.insert",
  "path": "userprofiles/{+profileId}/advertisers",
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
  "id": "dfareporting.advertisers.update",
  "path": "userprofiles/{+profileId}/advertisers",
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
  "id": "dfareporting.advertisers.list",
  "path": "userprofiles/{+profileId}/advertisers",
  "httpMethod": "GET",
  "parameterOrder": [
    "profileId",
  ],
  "parameters": {
    "advertiserGroupIds": {
      "location": "query",
    },
    "floodlightConfigurationIds": {
      "location": "query",
    },
    "ids": {
      "location": "query",
    },
    "includeAdvertisersWithoutGroupsOnly": {
      "location": "query",
    },
    "maxResults": {
      "location": "query",
    },
    "onlyParent": {
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
    "status": {
      "location": "query",
    },
    "subaccountId": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  accountId: z.string().describe(
    "Account ID of this advertiser.This is a read-only field that can be left blank.",
  ).optional(),
  advertiserGroupId: z.string().describe(
    "ID of the advertiser group this advertiser belongs to. You can group advertisers for reporting purposes, allowing you to see aggregated information for all advertisers in each group.",
  ).optional(),
  clickThroughUrlSuffix: z.string().describe(
    "Suffix added to click-through URL of ad creative associations under this advertiser. Must be less than 129 characters long.",
  ).optional(),
  defaultClickThroughEventTagId: z.string().describe(
    "ID of the click-through event tag to apply by default to the landing pages of this advertiser's campaigns.",
  ).optional(),
  defaultEmail: z.string().describe(
    "Default email address used in sender field for tag emails.",
  ).optional(),
  euPoliticalAdsDeclaration: z.enum([
    "ADVERTISER_PLANS_TO_SERVE_EU_POLITICAL_ADS",
    "ADVERTISER_DOES_NOT_PLAN_TO_SERVE_EU_POLITICAL_ADS",
  ]).describe(
    "Optional. Whether the advertiser plans to serve EU political ads.",
  ).optional(),
  floodlightConfigurationId: z.string().describe(
    "Floodlight configuration ID of this advertiser. The floodlight configuration ID will be created automatically, so on insert this field should be left blank. This field can be set to another advertiser's floodlight configuration ID in order to share that advertiser's floodlight configuration with this advertiser, so long as: - This advertiser's original floodlight configuration is not already associated with floodlight activities or floodlight activity groups. - This advertiser's original floodlight configuration is not already shared with another advertiser.",
  ).optional(),
  floodlightConfigurationIdDimensionValue: z.object({
    dimensionName: z.string().describe("The name of the dimension.").optional(),
    etag: z.string().describe("The eTag of this response for caching purposes.")
      .optional(),
    id: z.string().describe("The ID associated with the value if available.")
      .optional(),
    kind: z.string().describe(
      "The kind of resource this is, in this case dfareporting#dimensionValue.",
    ).optional(),
    matchType: z.enum([
      "EXACT",
      "BEGINS_WITH",
      "CONTAINS",
      "WILDCARD_EXPRESSION",
    ]).describe(
      "Determines how the 'value' field is matched when filtering. If not specified, defaults to EXACT. If set to WILDCARD_EXPRESSION, '*' is allowed as a placeholder for variable length character sequences, and it can be escaped with a backslash. Note, only paid search dimensions ('dfa:paidSearch*') allow a matchType other than EXACT.",
    ).optional(),
    value: z.string().describe("The value of the dimension.").optional(),
  }).describe("Represents a DimensionValue resource.").optional(),
  id: z.string().describe(
    "ID of this advertiser. This is a read-only, auto-generated field.",
  ).optional(),
  idDimensionValue: z.object({
    dimensionName: z.string().describe("The name of the dimension.").optional(),
    etag: z.string().describe("The eTag of this response for caching purposes.")
      .optional(),
    id: z.string().describe("The ID associated with the value if available.")
      .optional(),
    kind: z.string().describe(
      "The kind of resource this is, in this case dfareporting#dimensionValue.",
    ).optional(),
    matchType: z.enum([
      "EXACT",
      "BEGINS_WITH",
      "CONTAINS",
      "WILDCARD_EXPRESSION",
    ]).describe(
      "Determines how the 'value' field is matched when filtering. If not specified, defaults to EXACT. If set to WILDCARD_EXPRESSION, '*' is allowed as a placeholder for variable length character sequences, and it can be escaped with a backslash. Note, only paid search dimensions ('dfa:paidSearch*') allow a matchType other than EXACT.",
    ).optional(),
    value: z.string().describe("The value of the dimension.").optional(),
  }).describe("Represents a DimensionValue resource.").optional(),
  measurementPartnerLink: z.object({
    linkStatus: z.enum([
      "MEASUREMENT_PARTNER_UNLINKED",
      "MEASUREMENT_PARTNER_LINKED",
      "MEASUREMENT_PARTNER_LINK_PENDING",
      "MEASUREMENT_PARTNER_LINK_FAILURE",
      "MEASUREMENT_PARTNER_LINK_OPT_OUT",
      "MEASUREMENT_PARTNER_LINK_OPT_OUT_PENDING",
      "MEASUREMENT_PARTNER_LINK_WRAPPING_PENDING",
      "MEASUREMENT_PARTNER_MODE_CHANGE_PENDING",
      "MEASUREMENT_PARTNER_UNLINK_PENDING",
    ]).describe("Status of the partner link.").optional(),
    measurementPartner: z.enum(["NONE", "INTEGRAL_AD_SCIENCE", "DOUBLE_VERIFY"])
      .describe("Measurement partner used for tag wrapping.").optional(),
    partnerAdvertiserId: z.string().describe("partner Advertiser Id.")
      .optional(),
  }).optional(),
  name: z.string().describe(
    "Name of this advertiser. This is a required field and must be less than 256 characters long and unique among advertisers of the same account.",
  ).optional(),
  originalFloodlightConfigurationId: z.string().describe(
    "Original floodlight configuration before any sharing occurred. Set the floodlightConfigurationId of this advertiser to originalFloodlightConfigurationId to unshare the advertiser's current floodlight configuration. You cannot unshare an advertiser's floodlight configuration if the shared configuration has activities associated with any campaign or placement.",
  ).optional(),
  status: z.enum(["APPROVED", "ON_HOLD"]).describe("Status of this advertiser.")
    .optional(),
  subaccountId: z.string().describe(
    "Subaccount ID of this advertiser.This is a read-only field that can be left blank.",
  ).optional(),
  suspended: z.boolean().describe("Suspension status of this advertiser.")
    .optional(),
  profileId: z.string().describe(
    "User profile ID associated with this request.",
  ),
});

const StateSchema = z.object({
  accountId: z.string().optional(),
  advertiserGroupId: z.string().optional(),
  clickThroughUrlSuffix: z.string().optional(),
  defaultClickThroughEventTagId: z.string().optional(),
  defaultEmail: z.string().optional(),
  euPoliticalAdsDeclaration: z.string().optional(),
  floodlightConfigurationId: z.string().optional(),
  floodlightConfigurationIdDimensionValue: z.object({
    dimensionName: z.string(),
    etag: z.string(),
    id: z.string(),
    kind: z.string(),
    matchType: z.string(),
    value: z.string(),
  }).optional(),
  id: z.string(),
  idDimensionValue: z.object({
    dimensionName: z.string(),
    etag: z.string(),
    id: z.string(),
    kind: z.string(),
    matchType: z.string(),
    value: z.string(),
  }).optional(),
  kind: z.string().optional(),
  measurementPartnerLink: z.object({
    linkStatus: z.string(),
    measurementPartner: z.string(),
    partnerAdvertiserId: z.string(),
  }).optional(),
  name: z.string().optional(),
  originalFloodlightConfigurationId: z.string().optional(),
  status: z.string().optional(),
  subaccountId: z.string().optional(),
  suspended: z.boolean().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accountId: z.string().describe(
    "Account ID of this advertiser.This is a read-only field that can be left blank.",
  ).optional(),
  advertiserGroupId: z.string().describe(
    "ID of the advertiser group this advertiser belongs to. You can group advertisers for reporting purposes, allowing you to see aggregated information for all advertisers in each group.",
  ).optional(),
  clickThroughUrlSuffix: z.string().describe(
    "Suffix added to click-through URL of ad creative associations under this advertiser. Must be less than 129 characters long.",
  ).optional(),
  defaultClickThroughEventTagId: z.string().describe(
    "ID of the click-through event tag to apply by default to the landing pages of this advertiser's campaigns.",
  ).optional(),
  defaultEmail: z.string().describe(
    "Default email address used in sender field for tag emails.",
  ).optional(),
  euPoliticalAdsDeclaration: z.enum([
    "ADVERTISER_PLANS_TO_SERVE_EU_POLITICAL_ADS",
    "ADVERTISER_DOES_NOT_PLAN_TO_SERVE_EU_POLITICAL_ADS",
  ]).describe(
    "Optional. Whether the advertiser plans to serve EU political ads.",
  ).optional(),
  floodlightConfigurationId: z.string().describe(
    "Floodlight configuration ID of this advertiser. The floodlight configuration ID will be created automatically, so on insert this field should be left blank. This field can be set to another advertiser's floodlight configuration ID in order to share that advertiser's floodlight configuration with this advertiser, so long as: - This advertiser's original floodlight configuration is not already associated with floodlight activities or floodlight activity groups. - This advertiser's original floodlight configuration is not already shared with another advertiser.",
  ).optional(),
  floodlightConfigurationIdDimensionValue: z.object({
    dimensionName: z.string().describe("The name of the dimension.").optional(),
    etag: z.string().describe("The eTag of this response for caching purposes.")
      .optional(),
    id: z.string().describe("The ID associated with the value if available.")
      .optional(),
    kind: z.string().describe(
      "The kind of resource this is, in this case dfareporting#dimensionValue.",
    ).optional(),
    matchType: z.enum([
      "EXACT",
      "BEGINS_WITH",
      "CONTAINS",
      "WILDCARD_EXPRESSION",
    ]).describe(
      "Determines how the 'value' field is matched when filtering. If not specified, defaults to EXACT. If set to WILDCARD_EXPRESSION, '*' is allowed as a placeholder for variable length character sequences, and it can be escaped with a backslash. Note, only paid search dimensions ('dfa:paidSearch*') allow a matchType other than EXACT.",
    ).optional(),
    value: z.string().describe("The value of the dimension.").optional(),
  }).describe("Represents a DimensionValue resource.").optional(),
  id: z.string().describe(
    "ID of this advertiser. This is a read-only, auto-generated field.",
  ).optional(),
  idDimensionValue: z.object({
    dimensionName: z.string().describe("The name of the dimension.").optional(),
    etag: z.string().describe("The eTag of this response for caching purposes.")
      .optional(),
    id: z.string().describe("The ID associated with the value if available.")
      .optional(),
    kind: z.string().describe(
      "The kind of resource this is, in this case dfareporting#dimensionValue.",
    ).optional(),
    matchType: z.enum([
      "EXACT",
      "BEGINS_WITH",
      "CONTAINS",
      "WILDCARD_EXPRESSION",
    ]).describe(
      "Determines how the 'value' field is matched when filtering. If not specified, defaults to EXACT. If set to WILDCARD_EXPRESSION, '*' is allowed as a placeholder for variable length character sequences, and it can be escaped with a backslash. Note, only paid search dimensions ('dfa:paidSearch*') allow a matchType other than EXACT.",
    ).optional(),
    value: z.string().describe("The value of the dimension.").optional(),
  }).describe("Represents a DimensionValue resource.").optional(),
  measurementPartnerLink: z.object({
    linkStatus: z.enum([
      "MEASUREMENT_PARTNER_UNLINKED",
      "MEASUREMENT_PARTNER_LINKED",
      "MEASUREMENT_PARTNER_LINK_PENDING",
      "MEASUREMENT_PARTNER_LINK_FAILURE",
      "MEASUREMENT_PARTNER_LINK_OPT_OUT",
      "MEASUREMENT_PARTNER_LINK_OPT_OUT_PENDING",
      "MEASUREMENT_PARTNER_LINK_WRAPPING_PENDING",
      "MEASUREMENT_PARTNER_MODE_CHANGE_PENDING",
      "MEASUREMENT_PARTNER_UNLINK_PENDING",
    ]).describe("Status of the partner link.").optional(),
    measurementPartner: z.enum(["NONE", "INTEGRAL_AD_SCIENCE", "DOUBLE_VERIFY"])
      .describe("Measurement partner used for tag wrapping.").optional(),
    partnerAdvertiserId: z.string().describe("partner Advertiser Id.")
      .optional(),
  }).optional(),
  name: z.string().describe(
    "Name of this advertiser. This is a required field and must be less than 256 characters long and unique among advertisers of the same account.",
  ).optional(),
  originalFloodlightConfigurationId: z.string().describe(
    "Original floodlight configuration before any sharing occurred. Set the floodlightConfigurationId of this advertiser to originalFloodlightConfigurationId to unshare the advertiser's current floodlight configuration. You cannot unshare an advertiser's floodlight configuration if the shared configuration has activities associated with any campaign or placement.",
  ).optional(),
  status: z.enum(["APPROVED", "ON_HOLD"]).describe("Status of this advertiser.")
    .optional(),
  subaccountId: z.string().describe(
    "Subaccount ID of this advertiser.This is a read-only field that can be left blank.",
  ).optional(),
  suspended: z.boolean().describe("Suspension status of this advertiser.")
    .optional(),
  profileId: z.string().describe(
    "User profile ID associated with this request.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Campaign Manager 360 Advertisers. Registered at `@swamp/gcp/dfareporting/advertisers`. */
export const model = {
  type: "@swamp/gcp/dfareporting/advertisers",
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
      description: "Contains properties of a Campaign Manager advertiser.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a advertisers",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["accountId"] !== undefined) body["accountId"] = g["accountId"];
        if (g["advertiserGroupId"] !== undefined) {
          body["advertiserGroupId"] = g["advertiserGroupId"];
        }
        if (g["clickThroughUrlSuffix"] !== undefined) {
          body["clickThroughUrlSuffix"] = g["clickThroughUrlSuffix"];
        }
        if (g["defaultClickThroughEventTagId"] !== undefined) {
          body["defaultClickThroughEventTagId"] =
            g["defaultClickThroughEventTagId"];
        }
        if (g["defaultEmail"] !== undefined) {
          body["defaultEmail"] = g["defaultEmail"];
        }
        if (g["euPoliticalAdsDeclaration"] !== undefined) {
          body["euPoliticalAdsDeclaration"] = g["euPoliticalAdsDeclaration"];
        }
        if (g["floodlightConfigurationId"] !== undefined) {
          body["floodlightConfigurationId"] = g["floodlightConfigurationId"];
        }
        if (g["floodlightConfigurationIdDimensionValue"] !== undefined) {
          body["floodlightConfigurationIdDimensionValue"] =
            g["floodlightConfigurationIdDimensionValue"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["idDimensionValue"] !== undefined) {
          body["idDimensionValue"] = g["idDimensionValue"];
        }
        if (g["measurementPartnerLink"] !== undefined) {
          body["measurementPartnerLink"] = g["measurementPartnerLink"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["originalFloodlightConfigurationId"] !== undefined) {
          body["originalFloodlightConfigurationId"] =
            g["originalFloodlightConfigurationId"];
        }
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["subaccountId"] !== undefined) {
          body["subaccountId"] = g["subaccountId"];
        }
        if (g["suspended"] !== undefined) body["suspended"] = g["suspended"];
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
      description: "Get a advertisers",
      arguments: z.object({
        identifier: z.string().describe("The id of the advertisers"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        }
        params["id"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
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
      description: "Update advertisers attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        if (g["accountId"] !== undefined) body["accountId"] = g["accountId"];
        if (g["advertiserGroupId"] !== undefined) {
          body["advertiserGroupId"] = g["advertiserGroupId"];
        }
        if (g["clickThroughUrlSuffix"] !== undefined) {
          body["clickThroughUrlSuffix"] = g["clickThroughUrlSuffix"];
        }
        if (g["defaultClickThroughEventTagId"] !== undefined) {
          body["defaultClickThroughEventTagId"] =
            g["defaultClickThroughEventTagId"];
        }
        if (g["defaultEmail"] !== undefined) {
          body["defaultEmail"] = g["defaultEmail"];
        }
        if (g["euPoliticalAdsDeclaration"] !== undefined) {
          body["euPoliticalAdsDeclaration"] = g["euPoliticalAdsDeclaration"];
        }
        if (g["floodlightConfigurationId"] !== undefined) {
          body["floodlightConfigurationId"] = g["floodlightConfigurationId"];
        }
        if (g["floodlightConfigurationIdDimensionValue"] !== undefined) {
          body["floodlightConfigurationIdDimensionValue"] =
            g["floodlightConfigurationIdDimensionValue"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["idDimensionValue"] !== undefined) {
          body["idDimensionValue"] = g["idDimensionValue"];
        }
        if (g["measurementPartnerLink"] !== undefined) {
          body["measurementPartnerLink"] = g["measurementPartnerLink"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["originalFloodlightConfigurationId"] !== undefined) {
          body["originalFloodlightConfigurationId"] =
            g["originalFloodlightConfigurationId"];
        }
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["subaccountId"] !== undefined) {
          body["subaccountId"] = g["subaccountId"];
        }
        if (g["suspended"] !== undefined) body["suspended"] = g["suspended"];
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
      description: "Sync advertisers state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
  },
};
