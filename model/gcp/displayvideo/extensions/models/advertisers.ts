// Auto-generated extension model for @swamp/gcp/displayvideo/advertisers
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Display & Video 360 Advertisers.
 *
 * A single advertiser in Display & Video 360 (DV360).
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

const BASE_URL = "https://displayvideo.googleapis.com/";

const GET_CONFIG = {
  "id": "displayvideo.advertisers.get",
  "path": "v4/advertisers/{+advertiserId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "advertiserId",
  ],
  "parameters": {
    "advertiserId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "displayvideo.advertisers.create",
  "path": "v4/advertisers",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {},
} as const;

const PATCH_CONFIG = {
  "id": "displayvideo.advertisers.patch",
  "path": "v4/advertisers/{+advertiserId}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "advertiserId",
  ],
  "parameters": {
    "advertiserId": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "displayvideo.advertisers.delete",
  "path": "v4/advertisers/{+advertiserId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "advertiserId",
  ],
  "parameters": {
    "advertiserId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "displayvideo.advertisers.list",
  "path": "v4/advertisers",
  "httpMethod": "GET",
  "parameterOrder": [],
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
    "partnerId": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  adServerConfig: z.object({
    cmHybridConfig: z.object({
      cmAccountId: z.string().describe(
        "Required. Immutable. Account ID of the CM360 Floodlight configuration linked with the DV360 advertiser.",
      ).optional(),
      cmAdvertiserIds: z.array(z.string()).describe(
        "Output only. The set of CM360 Advertiser IDs sharing the CM360 Floodlight configuration.",
      ).optional(),
      cmFloodlightConfigId: z.string().describe(
        "Required. Immutable. ID of the CM360 Floodlight configuration linked with the DV360 advertiser.",
      ).optional(),
      cmFloodlightLinkingAuthorized: z.boolean().describe(
        "Required. Immutable. By setting this field to `true`, you, on behalf of your company, authorize the sharing of information from the given Floodlight configuration to this Display & Video 360 advertiser.",
      ).optional(),
      cmSyncableSiteIds: z.array(z.string()).describe(
        "A list of CM360 sites whose placements will be synced to DV360 as creatives. If absent or empty in CreateAdvertiser method, the system will automatically create a CM360 site. Removing sites from this list may cause DV360 creatives synced from CM360 to be deleted. At least one site must be specified.",
      ).optional(),
      dv360ToCmCostReportingEnabled: z.boolean().describe(
        "Whether or not to report DV360 cost to CM360.",
      ).optional(),
      dv360ToCmDataSharingEnabled: z.boolean().describe(
        "Whether or not to include DV360 data in CM360 data transfer reports.",
      ).optional(),
    }).describe(
      "Settings for advertisers that use both Campaign Manager 360 (CM360) and third-party ad servers.",
    ).optional(),
    thirdPartyOnlyConfig: z.object({
      pixelOrderIdReportingEnabled: z.boolean().describe(
        "Whether or not order ID reporting for pixels is enabled. This value cannot be changed once set to `true`.",
      ).optional(),
    }).describe(
      "Settings for advertisers that use third-party ad servers only.",
    ).optional(),
  }).describe("Ad server related settings of an advertiser.").optional(),
  billingConfig: z.object({
    billingProfileId: z.string().describe(
      "Required. The ID of a billing profile assigned to the advertiser.",
    ).optional(),
  }).describe("Billing related settings of an advertiser.").optional(),
  containsEuPoliticalAds: z.enum([
    "EU_POLITICAL_ADVERTISING_STATUS_UNKNOWN",
    "CONTAINS_EU_POLITICAL_ADVERTISING",
    "DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING",
  ]).describe(
    "Optional. Whether this advertiser contains line items that serve European Union political ads. If this field is set to `DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING`, then the following will happen: * Any new line items created under this advertiser will be assigned `DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING` if not otherwise specified. * Any existing line items under this advertiser that do not have a set value be updated to `DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING` within a day.",
  ).optional(),
  creativeConfig: z.object({
    dynamicCreativeEnabled: z.boolean().describe(
      "Whether or not the advertiser is enabled for dynamic creatives.",
    ).optional(),
    iasClientId: z.string().describe(
      'An ID for configuring campaign monitoring provided by Integral Ad Service (IAS). The DV360 system will append an IAS "Campaign Monitor" tag containing this ID to the creative tag.',
    ).optional(),
    obaComplianceDisabled: z.boolean().describe(
      "Whether or not to disable Google's About this Ad feature that adds badging (to identify the content as an ad) and transparency information (on interaction with About this Ad) to your ads for Online Behavioral Advertising (OBA) and regulatory requirements. About this Ad gives users greater control over the ads they see and helps you explain why they're seeing your ad. [Learn more](//support.google.com/displayvideo/answer/14315795). If you choose to set this field to `true`, note that ads served through Display & Video 360 must comply to the following: * Be Online Behavioral Advertising (OBA) compliant, as per your contract with Google Marketing Platform. * In the European Economic Area (EEA), include transparency information and a mechanism for users to report illegal content in ads. If using an alternative ad badging, transparency, and reporting solution, you must ensure it includes the required transparency information and illegal content flagging mechanism and that you notify Google of any illegal content reports using the appropriate [form](//support.google.com/legal/troubleshooter/1114905?sjid=6787484030557261960-EU#ts=2981967%2C2982031%2C12980091).",
    ).optional(),
    videoCreativeDataSharingAuthorized: z.boolean().describe(
      "By setting this field to `true`, you, on behalf of your company, authorize Google to use video creatives associated with this Display & Video 360 advertiser to provide reporting and features related to the advertiser's television campaigns. Applicable only when the advertiser has a CM360 hybrid ad server configuration.",
    ).optional(),
  }).describe("Creatives related settings of an advertiser.").optional(),
  dataAccessConfig: z.object({
    sdfConfig: z.object({
      overridePartnerSdfConfig: z.boolean().describe(
        "Whether or not this advertiser overrides the SDF configuration of its parent partner. By default, an advertiser inherits the SDF configuration from the parent partner. To override the partner configuration, set this field to `true` and provide the new configuration in sdfConfig.",
      ).optional(),
      sdfConfig: z.object({
        adminEmail: z.string().describe(
          "An administrator email address to which the SDF processing status reports will be sent.",
        ).optional(),
        version: z.enum([
          "SDF_VERSION_UNSPECIFIED",
          "SDF_VERSION_3_1",
          "SDF_VERSION_4",
          "SDF_VERSION_4_1",
          "SDF_VERSION_4_2",
          "SDF_VERSION_5",
          "SDF_VERSION_5_1",
          "SDF_VERSION_5_2",
          "SDF_VERSION_5_3",
          "SDF_VERSION_5_4",
          "SDF_VERSION_5_5",
          "SDF_VERSION_6",
          "SDF_VERSION_7",
          "SDF_VERSION_7_1",
          "SDF_VERSION_8",
          "SDF_VERSION_8_1",
          "SDF_VERSION_9",
          "SDF_VERSION_9_1",
          "SDF_VERSION_9_2",
        ]).describe("Required. The version of SDF being used.").optional(),
      }).describe("Structured Data File (SDF) related settings.").optional(),
    }).describe("Structured Data Files (SDF) settings of an advertiser.")
      .optional(),
  }).describe(
    "Settings that control how advertiser related data may be accessed.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The display name of the advertiser. Must be UTF-8 encoded with a maximum size of 240 bytes.",
  ).optional(),
  entityStatus: z.enum([
    "ENTITY_STATUS_UNSPECIFIED",
    "ENTITY_STATUS_ACTIVE",
    "ENTITY_STATUS_ARCHIVED",
    "ENTITY_STATUS_DRAFT",
    "ENTITY_STATUS_PAUSED",
    "ENTITY_STATUS_SCHEDULED_FOR_DELETION",
  ]).describe(
    "Required. Controls whether or not insertion orders and line items of the advertiser can spend their budgets and bid on inventory. * Accepted values are `ENTITY_STATUS_ACTIVE`, `ENTITY_STATUS_PAUSED` and `ENTITY_STATUS_SCHEDULED_FOR_DELETION`. * If set to `ENTITY_STATUS_SCHEDULED_FOR_DELETION`, the advertiser will be deleted 30 days from when it was first scheduled for deletion.",
  ).optional(),
  generalConfig: z.object({
    currencyCode: z.string().describe(
      "Required. Immutable. Advertiser's currency in ISO 4217 format. Accepted codes and the currencies they represent are: Currency Code: Currency Name * `ARS`: Argentine Peso * `AUD`: Australian Dollar * `BRL`: Brazilian Real * `CAD`: Canadian Dollar * `CHF`: Swiss Franc * `CLP`: Chilean Peso * `CNY`: Chinese Yuan * `COP`: Colombian Peso * `CZK`: Czech Koruna * `DKK`: Danish Krone * `EGP`: Egyption Pound * `EUR`: Euro * `GBP`: British Pound * `HKD`: Hong Kong Dollar * `HUF`: Hungarian Forint * `IDR`: Indonesian Rupiah * `ILS`: Israeli Shekel * `INR`: Indian Rupee * `JPY`: Japanese Yen * `KRW`: South Korean Won * `MXN`: Mexican Pesos * `MYR`: Malaysian Ringgit * `NGN`: Nigerian Naira * `NOK`: Norwegian Krone * `NZD`: New Zealand Dollar * `PEN`: Peruvian Nuevo Sol * `PLN`: Polish Zloty * `RON`: New Romanian Leu * `RUB`: Russian Ruble * `SEK`: Swedish Krona * `TRY`: Turkish Lira * `TWD`: New Taiwan Dollar * `USD`: US Dollar * `ZAR`: South African Rand",
    ).optional(),
    domainUrl: z.string().describe(
      "Required. The domain URL of the advertiser's primary website. The system will send this information to publishers that require website URL to associate a campaign with an advertiser. Provide a URL with no path or query string, beginning with `http:` or `https:`. For example, http://www.example.com",
    ).optional(),
    timeZone: z.string().describe(
      "Output only. The standard TZ database name of the advertiser's time zone. For example, `America/New_York`. See more at: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones For CM360 hybrid advertisers, the time zone is the same as that of the associated CM360 account; for third-party only advertisers, the time zone is the same as that of the parent partner.",
    ).optional(),
  }).describe("General settings of an advertiser.").optional(),
  integrationDetails: z.object({
    details: z.string().describe(
      "Additional details of the entry in string format. Must be UTF-8 encoded with a length of no more than 1000 characters.",
    ).optional(),
    integrationCode: z.string().describe(
      "An external identifier to be associated with the entry. The integration code will show up together with the entry in many places in the system, for example, reporting. Must be UTF-8 encoded with a length of no more than 500 characters.",
    ).optional(),
  }).describe("Integration details of an entry.").optional(),
  partnerId: z.string().describe(
    "Required. Immutable. The unique ID of the partner that the advertiser belongs to.",
  ).optional(),
  prismaEnabled: z.boolean().describe(
    "Whether integration with Mediaocean (Prisma) is enabled. By enabling this, you agree to the following: On behalf of my company, I authorize Mediaocean (Prisma) to send budget segment plans to Google, and I authorize Google to send corresponding reporting and invoices from DV360 to Mediaocean for the purposes of budget planning, billing, and reconciliation for this advertiser.",
  ).optional(),
  servingConfig: z.object({
    exemptTvFromViewabilityTargeting: z.boolean().describe(
      "Whether or not connected TV devices are exempt from viewability targeting for all video line items under the advertiser.",
    ).optional(),
  }).describe("Targeting settings related to ad serving of an advertiser.")
    .optional(),
});

const StateSchema = z.object({
  adServerConfig: z.object({
    cmHybridConfig: z.object({
      cmAccountId: z.string(),
      cmAdvertiserIds: z.array(z.string()),
      cmFloodlightConfigId: z.string(),
      cmFloodlightLinkingAuthorized: z.boolean(),
      cmSyncableSiteIds: z.array(z.string()),
      dv360ToCmCostReportingEnabled: z.boolean(),
      dv360ToCmDataSharingEnabled: z.boolean(),
    }),
    thirdPartyOnlyConfig: z.object({
      pixelOrderIdReportingEnabled: z.boolean(),
    }),
  }).optional(),
  advertiserId: z.string().optional(),
  billingConfig: z.object({
    billingProfileId: z.string(),
  }).optional(),
  containsEuPoliticalAds: z.string().optional(),
  creativeConfig: z.object({
    dynamicCreativeEnabled: z.boolean(),
    iasClientId: z.string(),
    obaComplianceDisabled: z.boolean(),
    videoCreativeDataSharingAuthorized: z.boolean(),
  }).optional(),
  dataAccessConfig: z.object({
    sdfConfig: z.object({
      overridePartnerSdfConfig: z.boolean(),
      sdfConfig: z.object({
        adminEmail: z.string(),
        version: z.string(),
      }),
    }),
  }).optional(),
  displayName: z.string().optional(),
  entityStatus: z.string().optional(),
  generalConfig: z.object({
    currencyCode: z.string(),
    domainUrl: z.string(),
    timeZone: z.string(),
  }).optional(),
  integrationDetails: z.object({
    details: z.string(),
    integrationCode: z.string(),
  }).optional(),
  name: z.string(),
  partnerId: z.string().optional(),
  prismaEnabled: z.boolean().optional(),
  servingConfig: z.object({
    exemptTvFromViewabilityTargeting: z.boolean(),
  }).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  adServerConfig: z.object({
    cmHybridConfig: z.object({
      cmAccountId: z.string().describe(
        "Required. Immutable. Account ID of the CM360 Floodlight configuration linked with the DV360 advertiser.",
      ).optional(),
      cmAdvertiserIds: z.array(z.string()).describe(
        "Output only. The set of CM360 Advertiser IDs sharing the CM360 Floodlight configuration.",
      ).optional(),
      cmFloodlightConfigId: z.string().describe(
        "Required. Immutable. ID of the CM360 Floodlight configuration linked with the DV360 advertiser.",
      ).optional(),
      cmFloodlightLinkingAuthorized: z.boolean().describe(
        "Required. Immutable. By setting this field to `true`, you, on behalf of your company, authorize the sharing of information from the given Floodlight configuration to this Display & Video 360 advertiser.",
      ).optional(),
      cmSyncableSiteIds: z.array(z.string()).describe(
        "A list of CM360 sites whose placements will be synced to DV360 as creatives. If absent or empty in CreateAdvertiser method, the system will automatically create a CM360 site. Removing sites from this list may cause DV360 creatives synced from CM360 to be deleted. At least one site must be specified.",
      ).optional(),
      dv360ToCmCostReportingEnabled: z.boolean().describe(
        "Whether or not to report DV360 cost to CM360.",
      ).optional(),
      dv360ToCmDataSharingEnabled: z.boolean().describe(
        "Whether or not to include DV360 data in CM360 data transfer reports.",
      ).optional(),
    }).describe(
      "Settings for advertisers that use both Campaign Manager 360 (CM360) and third-party ad servers.",
    ).optional(),
    thirdPartyOnlyConfig: z.object({
      pixelOrderIdReportingEnabled: z.boolean().describe(
        "Whether or not order ID reporting for pixels is enabled. This value cannot be changed once set to `true`.",
      ).optional(),
    }).describe(
      "Settings for advertisers that use third-party ad servers only.",
    ).optional(),
  }).describe("Ad server related settings of an advertiser.").optional(),
  billingConfig: z.object({
    billingProfileId: z.string().describe(
      "Required. The ID of a billing profile assigned to the advertiser.",
    ).optional(),
  }).describe("Billing related settings of an advertiser.").optional(),
  containsEuPoliticalAds: z.enum([
    "EU_POLITICAL_ADVERTISING_STATUS_UNKNOWN",
    "CONTAINS_EU_POLITICAL_ADVERTISING",
    "DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING",
  ]).describe(
    "Optional. Whether this advertiser contains line items that serve European Union political ads. If this field is set to `DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING`, then the following will happen: * Any new line items created under this advertiser will be assigned `DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING` if not otherwise specified. * Any existing line items under this advertiser that do not have a set value be updated to `DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING` within a day.",
  ).optional(),
  creativeConfig: z.object({
    dynamicCreativeEnabled: z.boolean().describe(
      "Whether or not the advertiser is enabled for dynamic creatives.",
    ).optional(),
    iasClientId: z.string().describe(
      'An ID for configuring campaign monitoring provided by Integral Ad Service (IAS). The DV360 system will append an IAS "Campaign Monitor" tag containing this ID to the creative tag.',
    ).optional(),
    obaComplianceDisabled: z.boolean().describe(
      "Whether or not to disable Google's About this Ad feature that adds badging (to identify the content as an ad) and transparency information (on interaction with About this Ad) to your ads for Online Behavioral Advertising (OBA) and regulatory requirements. About this Ad gives users greater control over the ads they see and helps you explain why they're seeing your ad. [Learn more](//support.google.com/displayvideo/answer/14315795). If you choose to set this field to `true`, note that ads served through Display & Video 360 must comply to the following: * Be Online Behavioral Advertising (OBA) compliant, as per your contract with Google Marketing Platform. * In the European Economic Area (EEA), include transparency information and a mechanism for users to report illegal content in ads. If using an alternative ad badging, transparency, and reporting solution, you must ensure it includes the required transparency information and illegal content flagging mechanism and that you notify Google of any illegal content reports using the appropriate [form](//support.google.com/legal/troubleshooter/1114905?sjid=6787484030557261960-EU#ts=2981967%2C2982031%2C12980091).",
    ).optional(),
    videoCreativeDataSharingAuthorized: z.boolean().describe(
      "By setting this field to `true`, you, on behalf of your company, authorize Google to use video creatives associated with this Display & Video 360 advertiser to provide reporting and features related to the advertiser's television campaigns. Applicable only when the advertiser has a CM360 hybrid ad server configuration.",
    ).optional(),
  }).describe("Creatives related settings of an advertiser.").optional(),
  dataAccessConfig: z.object({
    sdfConfig: z.object({
      overridePartnerSdfConfig: z.boolean().describe(
        "Whether or not this advertiser overrides the SDF configuration of its parent partner. By default, an advertiser inherits the SDF configuration from the parent partner. To override the partner configuration, set this field to `true` and provide the new configuration in sdfConfig.",
      ).optional(),
      sdfConfig: z.object({
        adminEmail: z.string().describe(
          "An administrator email address to which the SDF processing status reports will be sent.",
        ).optional(),
        version: z.enum([
          "SDF_VERSION_UNSPECIFIED",
          "SDF_VERSION_3_1",
          "SDF_VERSION_4",
          "SDF_VERSION_4_1",
          "SDF_VERSION_4_2",
          "SDF_VERSION_5",
          "SDF_VERSION_5_1",
          "SDF_VERSION_5_2",
          "SDF_VERSION_5_3",
          "SDF_VERSION_5_4",
          "SDF_VERSION_5_5",
          "SDF_VERSION_6",
          "SDF_VERSION_7",
          "SDF_VERSION_7_1",
          "SDF_VERSION_8",
          "SDF_VERSION_8_1",
          "SDF_VERSION_9",
          "SDF_VERSION_9_1",
          "SDF_VERSION_9_2",
        ]).describe("Required. The version of SDF being used.").optional(),
      }).describe("Structured Data File (SDF) related settings.").optional(),
    }).describe("Structured Data Files (SDF) settings of an advertiser.")
      .optional(),
  }).describe(
    "Settings that control how advertiser related data may be accessed.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The display name of the advertiser. Must be UTF-8 encoded with a maximum size of 240 bytes.",
  ).optional(),
  entityStatus: z.enum([
    "ENTITY_STATUS_UNSPECIFIED",
    "ENTITY_STATUS_ACTIVE",
    "ENTITY_STATUS_ARCHIVED",
    "ENTITY_STATUS_DRAFT",
    "ENTITY_STATUS_PAUSED",
    "ENTITY_STATUS_SCHEDULED_FOR_DELETION",
  ]).describe(
    "Required. Controls whether or not insertion orders and line items of the advertiser can spend their budgets and bid on inventory. * Accepted values are `ENTITY_STATUS_ACTIVE`, `ENTITY_STATUS_PAUSED` and `ENTITY_STATUS_SCHEDULED_FOR_DELETION`. * If set to `ENTITY_STATUS_SCHEDULED_FOR_DELETION`, the advertiser will be deleted 30 days from when it was first scheduled for deletion.",
  ).optional(),
  generalConfig: z.object({
    currencyCode: z.string().describe(
      "Required. Immutable. Advertiser's currency in ISO 4217 format. Accepted codes and the currencies they represent are: Currency Code: Currency Name * `ARS`: Argentine Peso * `AUD`: Australian Dollar * `BRL`: Brazilian Real * `CAD`: Canadian Dollar * `CHF`: Swiss Franc * `CLP`: Chilean Peso * `CNY`: Chinese Yuan * `COP`: Colombian Peso * `CZK`: Czech Koruna * `DKK`: Danish Krone * `EGP`: Egyption Pound * `EUR`: Euro * `GBP`: British Pound * `HKD`: Hong Kong Dollar * `HUF`: Hungarian Forint * `IDR`: Indonesian Rupiah * `ILS`: Israeli Shekel * `INR`: Indian Rupee * `JPY`: Japanese Yen * `KRW`: South Korean Won * `MXN`: Mexican Pesos * `MYR`: Malaysian Ringgit * `NGN`: Nigerian Naira * `NOK`: Norwegian Krone * `NZD`: New Zealand Dollar * `PEN`: Peruvian Nuevo Sol * `PLN`: Polish Zloty * `RON`: New Romanian Leu * `RUB`: Russian Ruble * `SEK`: Swedish Krona * `TRY`: Turkish Lira * `TWD`: New Taiwan Dollar * `USD`: US Dollar * `ZAR`: South African Rand",
    ).optional(),
    domainUrl: z.string().describe(
      "Required. The domain URL of the advertiser's primary website. The system will send this information to publishers that require website URL to associate a campaign with an advertiser. Provide a URL with no path or query string, beginning with `http:` or `https:`. For example, http://www.example.com",
    ).optional(),
    timeZone: z.string().describe(
      "Output only. The standard TZ database name of the advertiser's time zone. For example, `America/New_York`. See more at: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones For CM360 hybrid advertisers, the time zone is the same as that of the associated CM360 account; for third-party only advertisers, the time zone is the same as that of the parent partner.",
    ).optional(),
  }).describe("General settings of an advertiser.").optional(),
  integrationDetails: z.object({
    details: z.string().describe(
      "Additional details of the entry in string format. Must be UTF-8 encoded with a length of no more than 1000 characters.",
    ).optional(),
    integrationCode: z.string().describe(
      "An external identifier to be associated with the entry. The integration code will show up together with the entry in many places in the system, for example, reporting. Must be UTF-8 encoded with a length of no more than 500 characters.",
    ).optional(),
  }).describe("Integration details of an entry.").optional(),
  partnerId: z.string().describe(
    "Required. Immutable. The unique ID of the partner that the advertiser belongs to.",
  ).optional(),
  prismaEnabled: z.boolean().describe(
    "Whether integration with Mediaocean (Prisma) is enabled. By enabling this, you agree to the following: On behalf of my company, I authorize Mediaocean (Prisma) to send budget segment plans to Google, and I authorize Google to send corresponding reporting and invoices from DV360 to Mediaocean for the purposes of budget planning, billing, and reconciliation for this advertiser.",
  ).optional(),
  servingConfig: z.object({
    exemptTvFromViewabilityTargeting: z.boolean().describe(
      "Whether or not connected TV devices are exempt from viewability targeting for all video line items under the advertiser.",
    ).optional(),
  }).describe("Targeting settings related to ad serving of an advertiser.")
    .optional(),
});

/** Swamp extension model for Google Cloud Display & Video 360 Advertisers. Registered at `@swamp/gcp/displayvideo/advertisers`. */
export const model = {
  type: "@swamp/gcp/displayvideo/advertisers",
  version: "2026.05.21.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A single advertiser in Display & Video 360 (DV360).",
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
        const body: Record<string, unknown> = {};
        if (g["adServerConfig"] !== undefined) {
          body["adServerConfig"] = g["adServerConfig"];
        }
        if (g["billingConfig"] !== undefined) {
          body["billingConfig"] = g["billingConfig"];
        }
        if (g["containsEuPoliticalAds"] !== undefined) {
          body["containsEuPoliticalAds"] = g["containsEuPoliticalAds"];
        }
        if (g["creativeConfig"] !== undefined) {
          body["creativeConfig"] = g["creativeConfig"];
        }
        if (g["dataAccessConfig"] !== undefined) {
          body["dataAccessConfig"] = g["dataAccessConfig"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["entityStatus"] !== undefined) {
          body["entityStatus"] = g["entityStatus"];
        }
        if (g["generalConfig"] !== undefined) {
          body["generalConfig"] = g["generalConfig"];
        }
        if (g["integrationDetails"] !== undefined) {
          body["integrationDetails"] = g["integrationDetails"];
        }
        if (g["partnerId"] !== undefined) body["partnerId"] = g["partnerId"];
        if (g["prismaEnabled"] !== undefined) {
          body["prismaEnabled"] = g["prismaEnabled"];
        }
        if (g["servingConfig"] !== undefined) {
          body["servingConfig"] = g["servingConfig"];
        }
        if (g["name"] !== undefined) params["advertiserId"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {},
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
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
      description: "Get a advertisers",
      arguments: z.object({
        identifier: z.string().describe("The name of the advertisers"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["advertiserId"] = args.identifier;
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
      description: "Update advertisers attributes",
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
        params["advertiserId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["adServerConfig"] !== undefined) {
          body["adServerConfig"] = g["adServerConfig"];
        }
        if (g["billingConfig"] !== undefined) {
          body["billingConfig"] = g["billingConfig"];
        }
        if (g["containsEuPoliticalAds"] !== undefined) {
          body["containsEuPoliticalAds"] = g["containsEuPoliticalAds"];
        }
        if (g["creativeConfig"] !== undefined) {
          body["creativeConfig"] = g["creativeConfig"];
        }
        if (g["dataAccessConfig"] !== undefined) {
          body["dataAccessConfig"] = g["dataAccessConfig"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["entityStatus"] !== undefined) {
          body["entityStatus"] = g["entityStatus"];
        }
        if (g["generalConfig"] !== undefined) {
          body["generalConfig"] = g["generalConfig"];
        }
        if (g["integrationDetails"] !== undefined) {
          body["integrationDetails"] = g["integrationDetails"];
        }
        if (g["prismaEnabled"] !== undefined) {
          body["prismaEnabled"] = g["prismaEnabled"];
        }
        if (g["servingConfig"] !== undefined) {
          body["servingConfig"] = g["servingConfig"];
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
      description: "Delete the advertisers",
      arguments: z.object({
        identifier: z.string().describe("The name of the advertisers"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["advertiserId"] = args.identifier;
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
      description: "Sync advertisers state from GCP",
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
          params["advertiserId"] = identifier;
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
    audit: {
      description: "audit",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
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
        params["advertiserId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "displayvideo.advertisers.audit",
            "path": "v4/advertisers/{+advertiserId}:audit",
            "httpMethod": "GET",
            "parameterOrder": ["advertiserId"],
            "parameters": {
              "advertiserId": { "location": "path", "required": true },
              "readMask": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    edit_assigned_targeting_options: {
      description: "edit assigned targeting options",
      arguments: z.object({
        createRequests: z.any().optional(),
        deleteRequests: z.any().optional(),
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
        params["advertiserId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["createRequests"] !== undefined) {
          body["createRequests"] = args["createRequests"];
        }
        if (args["deleteRequests"] !== undefined) {
          body["deleteRequests"] = args["deleteRequests"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "displayvideo.advertisers.editAssignedTargetingOptions",
            "path":
              "v4/advertisers/{+advertiserId}:editAssignedTargetingOptions",
            "httpMethod": "POST",
            "parameterOrder": ["advertiserId"],
            "parameters": {
              "advertiserId": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    list_assigned_targeting_options: {
      description: "list assigned targeting options",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
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
        params["advertiserId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "displayvideo.advertisers.listAssignedTargetingOptions",
            "path":
              "v4/advertisers/{+advertiserId}:listAssignedTargetingOptions",
            "httpMethod": "GET",
            "parameterOrder": ["advertiserId"],
            "parameters": {
              "advertiserId": { "location": "path", "required": true },
              "filter": { "location": "query" },
              "orderBy": { "location": "query" },
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
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
