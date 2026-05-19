// Auto-generated extension model for @swamp/gcp/dfareporting/accounts
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Campaign Manager 360 Accounts.
 *
 * Contains properties of a Campaign Manager account.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  getProjectId,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://dfareporting.googleapis.com/dfareporting/v5/";

const GET_CONFIG = {
  "id": "dfareporting.accounts.get",
  "path": "userprofiles/{+profileId}/accounts/{+id}",
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

const UPDATE_CONFIG = {
  "id": "dfareporting.accounts.update",
  "path": "userprofiles/{+profileId}/accounts",
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

const GlobalArgsSchema = z.object({
  accountPermissionIds: z.array(z.string()).describe(
    "Account permissions assigned to this account.",
  ).optional(),
  accountProfile: z.enum(["ACCOUNT_PROFILE_BASIC", "ACCOUNT_PROFILE_STANDARD"])
    .describe(
      "Profile for this account. This is a read-only field that can be left blank.",
    ).optional(),
  active: z.boolean().describe("Whether this account is active.").optional(),
  activeAdsLimitTier: z.enum([
    "ACTIVE_ADS_TIER_40K",
    "ACTIVE_ADS_TIER_75K",
    "ACTIVE_ADS_TIER_100K",
    "ACTIVE_ADS_TIER_200K",
    "ACTIVE_ADS_TIER_300K",
    "ACTIVE_ADS_TIER_500K",
    "ACTIVE_ADS_TIER_750K",
    "ACTIVE_ADS_TIER_1M",
  ]).describe("Maximum number of active ads allowed for this account.")
    .optional(),
  activeViewOptOut: z.boolean().describe(
    "Whether to serve creatives with Active View tags. If disabled, viewability data will not be available for any impressions.",
  ).optional(),
  availablePermissionIds: z.array(z.string()).describe(
    "User role permissions available to the user roles of this account.",
  ).optional(),
  countryId: z.string().describe(
    "ID of the country associated with this account.",
  ).optional(),
  currencyId: z.string().describe(
    'ID of currency associated with this account. This is a required field. Acceptable values are: - "1" for USD - "2" for GBP - "3" for ESP - "4" for SEK - "5" for CAD - "6" for JPY - "7" for DEM - "8" for AUD - "9" for FRF - "10" for ITL - "11" for DKK - "12" for NOK - "13" for FIM - "14" for ZAR - "15" for IEP - "16" for NLG - "17" for EUR - "18" for KRW - "19" for TWD - "20" for SGD - "21" for CNY - "22" for HKD - "23" for NZD - "24" for MYR - "25" for BRL - "26" for PTE - "28" for CLP - "29" for TRY - "30" for ARS - "31" for PEN - "32" for ILS - "33" for CHF - "34" for VEF - "35" for COP - "36" for GTQ - "37" for PLN - "39" for INR - "40" for THB - "41" for IDR - "42" for CZK - "43" for RON - "44" for HUF - "45" for RUB - "46" for AED - "47" for BGN - "48" for HRK - "49" for MXN - "50" for NGN - "51" for EGP',
  ).optional(),
  defaultCreativeSizeId: z.string().describe(
    "Default placement dimensions for this account.",
  ).optional(),
  description: z.string().describe("Description of this account.").optional(),
  id: z.string().describe(
    "ID of this account. This is a read-only, auto-generated field.",
  ).optional(),
  kind: z.string().describe(
    'Identifies what kind of resource this is. Value: the fixed string "dfareporting#account".',
  ).optional(),
  locale: z.string().describe(
    'Locale of this account. Acceptable values are: - "cs" (Czech) - "de" (German) - "en" (English) - "en-GB" (English United Kingdom) - "es" (Spanish) - "fr" (French) - "it" (Italian) - "ja" (Japanese) - "ko" (Korean) - "pl" (Polish) - "pt-BR" (Portuguese Brazil) - "ru" (Russian) - "sv" (Swedish) - "tr" (Turkish) - "zh-CN" (Chinese Simplified) - "zh-TW" (Chinese Traditional)',
  ).optional(),
  maximumImageSize: z.string().describe(
    "Maximum image size allowed for this account, in kilobytes. Value must be greater than or equal to 1.",
  ).optional(),
  name: z.string().describe(
    "Name of this account. This is a required field, and must be less than 128 characters long and be globally unique.",
  ).optional(),
  nielsenOcrEnabled: z.boolean().describe(
    "Whether campaigns created in this account will be enabled for Nielsen OCR reach ratings by default.",
  ).optional(),
  reportsConfiguration: z.object({
    exposureToConversionEnabled: z.boolean().describe(
      "Whether the exposure to conversion report is enabled. This report shows detailed pathway information on up to 10 of the most recent ad exposures seen by a user before converting.",
    ).optional(),
    lookbackConfiguration: z.object({
      clickDuration: z.number().int().describe(
        "Lookback window, in days, from the last time a given user clicked on one of your ads. If you enter 0, clicks will not be considered as triggering events for floodlight tracking. If you leave this field blank, the default value for your account will be used. Acceptable values are 0 to 90, inclusive.",
      ).optional(),
      postImpressionActivitiesDuration: z.number().int().describe(
        "Lookback window, in days, from the last time a given user viewed one of your ads. If you enter 0, impressions will not be considered as triggering events for floodlight tracking. If you leave this field blank, the default value for your account will be used. Acceptable values are 0 to 90, inclusive.",
      ).optional(),
    }).describe("Lookback configuration settings.").optional(),
    reportGenerationTimeZoneId: z.string().describe(
      'Report generation time zone ID of this account. This is a required field that cannot be changed on update. Acceptable values are: - "1" for "America/New_York" - "2" for "Europe/London" - "3" for "Europe/Paris" - "4" for "Africa/Johannesburg" - "5" for "Asia/Jerusalem" - "6" for "Asia/Shanghai" - "7" for "Asia/Hong_Kong" - "8" for "Asia/Tokyo" - "9" for "Australia/Sydney" - "10" for "Asia/Dubai" - "11" for "America/Los_Angeles" - "12" for "Pacific/Auckland" - "13" for "America/Sao_Paulo" - "16" for "America/Asuncion" - "17" for "America/Chicago" - "18" for "America/Denver" - "19" for "America/St_Johns" - "20" for "Asia/Dhaka" - "21" for "Asia/Jakarta" - "22" for "Asia/Kabul" - "23" for "Asia/Karachi" - "24" for "Asia/Calcutta" - "25" for "Asia/Pyongyang" - "26" for "Asia/Rangoon" - "27" for "Atlantic/Cape_Verde" - "28" for "Atlantic/South_Georgia" - "29" for "Australia/Adelaide" - "30" for "Australia/Lord_Howe" - "31" for "Europe/Moscow" - "32" for "Pacific/Kiritimati" - "35" for "Pacific/Norfolk" - "36" for "Pacific/Tongatapu"',
    ).optional(),
  }).describe("Reporting Configuration").optional(),
  shareReportsWithTwitter: z.boolean().describe(
    "Share Path to Conversion reports with Twitter.",
  ).optional(),
  teaserSizeLimit: z.string().describe(
    "File size limit in kilobytes of Rich Media teaser creatives. Acceptable values are 1 to 10240, inclusive.",
  ).optional(),
});

const StateSchema = z.object({
  accountPermissionIds: z.array(z.string()).optional(),
  accountProfile: z.string().optional(),
  active: z.boolean().optional(),
  activeAdsLimitTier: z.string().optional(),
  activeViewOptOut: z.boolean().optional(),
  availablePermissionIds: z.array(z.string()).optional(),
  countryId: z.string().optional(),
  currencyId: z.string().optional(),
  defaultCreativeSizeId: z.string().optional(),
  description: z.string().optional(),
  id: z.string(),
  kind: z.string().optional(),
  locale: z.string().optional(),
  maximumImageSize: z.string().optional(),
  name: z.string().optional(),
  nielsenOcrEnabled: z.boolean().optional(),
  reportsConfiguration: z.object({
    exposureToConversionEnabled: z.boolean(),
    lookbackConfiguration: z.object({
      clickDuration: z.number(),
      postImpressionActivitiesDuration: z.number(),
    }),
    reportGenerationTimeZoneId: z.string(),
  }).optional(),
  shareReportsWithTwitter: z.boolean().optional(),
  teaserSizeLimit: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accountPermissionIds: z.array(z.string()).describe(
    "Account permissions assigned to this account.",
  ).optional(),
  accountProfile: z.enum(["ACCOUNT_PROFILE_BASIC", "ACCOUNT_PROFILE_STANDARD"])
    .describe(
      "Profile for this account. This is a read-only field that can be left blank.",
    ).optional(),
  active: z.boolean().describe("Whether this account is active.").optional(),
  activeAdsLimitTier: z.enum([
    "ACTIVE_ADS_TIER_40K",
    "ACTIVE_ADS_TIER_75K",
    "ACTIVE_ADS_TIER_100K",
    "ACTIVE_ADS_TIER_200K",
    "ACTIVE_ADS_TIER_300K",
    "ACTIVE_ADS_TIER_500K",
    "ACTIVE_ADS_TIER_750K",
    "ACTIVE_ADS_TIER_1M",
  ]).describe("Maximum number of active ads allowed for this account.")
    .optional(),
  activeViewOptOut: z.boolean().describe(
    "Whether to serve creatives with Active View tags. If disabled, viewability data will not be available for any impressions.",
  ).optional(),
  availablePermissionIds: z.array(z.string()).describe(
    "User role permissions available to the user roles of this account.",
  ).optional(),
  countryId: z.string().describe(
    "ID of the country associated with this account.",
  ).optional(),
  currencyId: z.string().describe(
    'ID of currency associated with this account. This is a required field. Acceptable values are: - "1" for USD - "2" for GBP - "3" for ESP - "4" for SEK - "5" for CAD - "6" for JPY - "7" for DEM - "8" for AUD - "9" for FRF - "10" for ITL - "11" for DKK - "12" for NOK - "13" for FIM - "14" for ZAR - "15" for IEP - "16" for NLG - "17" for EUR - "18" for KRW - "19" for TWD - "20" for SGD - "21" for CNY - "22" for HKD - "23" for NZD - "24" for MYR - "25" for BRL - "26" for PTE - "28" for CLP - "29" for TRY - "30" for ARS - "31" for PEN - "32" for ILS - "33" for CHF - "34" for VEF - "35" for COP - "36" for GTQ - "37" for PLN - "39" for INR - "40" for THB - "41" for IDR - "42" for CZK - "43" for RON - "44" for HUF - "45" for RUB - "46" for AED - "47" for BGN - "48" for HRK - "49" for MXN - "50" for NGN - "51" for EGP',
  ).optional(),
  defaultCreativeSizeId: z.string().describe(
    "Default placement dimensions for this account.",
  ).optional(),
  description: z.string().describe("Description of this account.").optional(),
  id: z.string().describe(
    "ID of this account. This is a read-only, auto-generated field.",
  ).optional(),
  kind: z.string().describe(
    'Identifies what kind of resource this is. Value: the fixed string "dfareporting#account".',
  ).optional(),
  locale: z.string().describe(
    'Locale of this account. Acceptable values are: - "cs" (Czech) - "de" (German) - "en" (English) - "en-GB" (English United Kingdom) - "es" (Spanish) - "fr" (French) - "it" (Italian) - "ja" (Japanese) - "ko" (Korean) - "pl" (Polish) - "pt-BR" (Portuguese Brazil) - "ru" (Russian) - "sv" (Swedish) - "tr" (Turkish) - "zh-CN" (Chinese Simplified) - "zh-TW" (Chinese Traditional)',
  ).optional(),
  maximumImageSize: z.string().describe(
    "Maximum image size allowed for this account, in kilobytes. Value must be greater than or equal to 1.",
  ).optional(),
  name: z.string().describe(
    "Name of this account. This is a required field, and must be less than 128 characters long and be globally unique.",
  ).optional(),
  nielsenOcrEnabled: z.boolean().describe(
    "Whether campaigns created in this account will be enabled for Nielsen OCR reach ratings by default.",
  ).optional(),
  reportsConfiguration: z.object({
    exposureToConversionEnabled: z.boolean().describe(
      "Whether the exposure to conversion report is enabled. This report shows detailed pathway information on up to 10 of the most recent ad exposures seen by a user before converting.",
    ).optional(),
    lookbackConfiguration: z.object({
      clickDuration: z.number().int().describe(
        "Lookback window, in days, from the last time a given user clicked on one of your ads. If you enter 0, clicks will not be considered as triggering events for floodlight tracking. If you leave this field blank, the default value for your account will be used. Acceptable values are 0 to 90, inclusive.",
      ).optional(),
      postImpressionActivitiesDuration: z.number().int().describe(
        "Lookback window, in days, from the last time a given user viewed one of your ads. If you enter 0, impressions will not be considered as triggering events for floodlight tracking. If you leave this field blank, the default value for your account will be used. Acceptable values are 0 to 90, inclusive.",
      ).optional(),
    }).describe("Lookback configuration settings.").optional(),
    reportGenerationTimeZoneId: z.string().describe(
      'Report generation time zone ID of this account. This is a required field that cannot be changed on update. Acceptable values are: - "1" for "America/New_York" - "2" for "Europe/London" - "3" for "Europe/Paris" - "4" for "Africa/Johannesburg" - "5" for "Asia/Jerusalem" - "6" for "Asia/Shanghai" - "7" for "Asia/Hong_Kong" - "8" for "Asia/Tokyo" - "9" for "Australia/Sydney" - "10" for "Asia/Dubai" - "11" for "America/Los_Angeles" - "12" for "Pacific/Auckland" - "13" for "America/Sao_Paulo" - "16" for "America/Asuncion" - "17" for "America/Chicago" - "18" for "America/Denver" - "19" for "America/St_Johns" - "20" for "Asia/Dhaka" - "21" for "Asia/Jakarta" - "22" for "Asia/Kabul" - "23" for "Asia/Karachi" - "24" for "Asia/Calcutta" - "25" for "Asia/Pyongyang" - "26" for "Asia/Rangoon" - "27" for "Atlantic/Cape_Verde" - "28" for "Atlantic/South_Georgia" - "29" for "Australia/Adelaide" - "30" for "Australia/Lord_Howe" - "31" for "Europe/Moscow" - "32" for "Pacific/Kiritimati" - "35" for "Pacific/Norfolk" - "36" for "Pacific/Tongatapu"',
    ).optional(),
  }).describe("Reporting Configuration").optional(),
  shareReportsWithTwitter: z.boolean().describe(
    "Share Path to Conversion reports with Twitter.",
  ).optional(),
  teaserSizeLimit: z.string().describe(
    "File size limit in kilobytes of Rich Media teaser creatives. Acceptable values are 1 to 10240, inclusive.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Campaign Manager 360 Accounts. Registered at `@swamp/gcp/dfareporting/accounts`. */
export const model = {
  type: "@swamp/gcp/dfareporting/accounts",
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
      description: "Contains properties of a Campaign Manager account.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a accounts",
      arguments: z.object({
        identifier: z.string().describe("The id of the accounts"),
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
      description: "Update accounts attributes",
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
        if (g["accountPermissionIds"] !== undefined) {
          body["accountPermissionIds"] = g["accountPermissionIds"];
        }
        if (g["accountProfile"] !== undefined) {
          body["accountProfile"] = g["accountProfile"];
        }
        if (g["active"] !== undefined) body["active"] = g["active"];
        if (g["activeAdsLimitTier"] !== undefined) {
          body["activeAdsLimitTier"] = g["activeAdsLimitTier"];
        }
        if (g["activeViewOptOut"] !== undefined) {
          body["activeViewOptOut"] = g["activeViewOptOut"];
        }
        if (g["availablePermissionIds"] !== undefined) {
          body["availablePermissionIds"] = g["availablePermissionIds"];
        }
        if (g["countryId"] !== undefined) body["countryId"] = g["countryId"];
        if (g["currencyId"] !== undefined) body["currencyId"] = g["currencyId"];
        if (g["defaultCreativeSizeId"] !== undefined) {
          body["defaultCreativeSizeId"] = g["defaultCreativeSizeId"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["kind"] !== undefined) body["kind"] = g["kind"];
        if (g["locale"] !== undefined) body["locale"] = g["locale"];
        if (g["maximumImageSize"] !== undefined) {
          body["maximumImageSize"] = g["maximumImageSize"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["nielsenOcrEnabled"] !== undefined) {
          body["nielsenOcrEnabled"] = g["nielsenOcrEnabled"];
        }
        if (g["reportsConfiguration"] !== undefined) {
          body["reportsConfiguration"] = g["reportsConfiguration"];
        }
        if (g["shareReportsWithTwitter"] !== undefined) {
          body["shareReportsWithTwitter"] = g["shareReportsWithTwitter"];
        }
        if (g["teaserSizeLimit"] !== undefined) {
          body["teaserSizeLimit"] = g["teaserSizeLimit"];
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
      description: "Sync accounts state from GCP",
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
