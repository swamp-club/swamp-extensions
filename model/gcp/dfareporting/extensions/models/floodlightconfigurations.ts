// Auto-generated extension model for @swamp/gcp/dfareporting/floodlightconfigurations
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Campaign Manager 360 FloodlightConfigurations.
 *
 * Contains properties of a Floodlight configuration.
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
  "id": "dfareporting.floodlightConfigurations.get",
  "path": "userprofiles/{+profileId}/floodlightConfigurations/{+id}",
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
  "id": "dfareporting.floodlightConfigurations.update",
  "path": "userprofiles/{+profileId}/floodlightConfigurations",
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
  accountId: z.string().describe(
    "Account ID of this floodlight configuration. This is a read-only field that can be left blank.",
  ).optional(),
  advertiserId: z.string().describe(
    "Advertiser ID of the parent advertiser of this floodlight configuration.",
  ).optional(),
  advertiserIdDimensionValue: z.object({
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
  analyticsDataSharingEnabled: z.boolean().describe(
    "Whether advertiser data is shared with Google Analytics.",
  ).optional(),
  customViewabilityMetric: z.object({
    configuration: z.object({
      audible: z.boolean().describe(
        "Whether the video must be audible to count an impression.",
      ).optional(),
      timeMillis: z.number().int().describe(
        "The time in milliseconds the video must play for the Custom Viewability Metric to count an impression. If both this and timePercent are specified, the earlier of the two will be used.",
      ).optional(),
      timePercent: z.number().int().describe(
        "The percentage of video that must play for the Custom Viewability Metric to count an impression. If both this and timeMillis are specified, the earlier of the two will be used.",
      ).optional(),
      viewabilityPercent: z.number().int().describe(
        "The percentage of video that must be on screen for the Custom Viewability Metric to count an impression.",
      ).optional(),
    }).describe(
      "The attributes, like playtime and percent onscreen, that define the Custom Viewability Metric.",
    ).optional(),
    id: z.string().describe("ID of the custom viewability metric.").optional(),
    name: z.string().describe("Name of the custom viewability metric.")
      .optional(),
  }).describe("Custom Viewability Metric").optional(),
  exposureToConversionEnabled: z.boolean().describe(
    "Whether the exposure-to-conversion report is enabled. This report shows detailed pathway information on up to 10 of the most recent ad exposures seen by a user before converting.",
  ).optional(),
  firstDayOfWeek: z.enum(["SUNDAY", "MONDAY"]).optional(),
  id: z.string().describe(
    "ID of this floodlight configuration. This is a read-only, auto-generated field.",
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
  inAppAttributionTrackingEnabled: z.boolean().describe(
    "Whether in-app attribution tracking is enabled.",
  ).optional(),
  kind: z.string().describe(
    'Identifies what kind of resource this is. Value: the fixed string "dfareporting#floodlightConfiguration".',
  ).optional(),
  lookbackConfiguration: z.object({
    clickDuration: z.number().int().describe(
      "Lookback window, in days, from the last time a given user clicked on one of your ads. If you enter 0, clicks will not be considered as triggering events for floodlight tracking. If you leave this field blank, the default value for your account will be used. Acceptable values are 0 to 90, inclusive.",
    ).optional(),
    postImpressionActivitiesDuration: z.number().int().describe(
      "Lookback window, in days, from the last time a given user viewed one of your ads. If you enter 0, impressions will not be considered as triggering events for floodlight tracking. If you leave this field blank, the default value for your account will be used. Acceptable values are 0 to 90, inclusive.",
    ).optional(),
  }).describe("Lookback configuration settings.").optional(),
  naturalSearchConversionAttributionOption: z.enum([
    "EXCLUDE_NATURAL_SEARCH_CONVERSION_ATTRIBUTION",
    "INCLUDE_NATURAL_SEARCH_CONVERSION_ATTRIBUTION",
    "INCLUDE_NATURAL_SEARCH_TIERED_CONVERSION_ATTRIBUTION",
  ]).describe("Types of attribution options for natural search conversions.")
    .optional(),
  omnitureSettings: z.object({
    omnitureCostDataEnabled: z.boolean().describe(
      "Whether placement cost data will be sent to Omniture. This property can be enabled only if omnitureIntegrationEnabled is true.",
    ).optional(),
    omnitureIntegrationEnabled: z.boolean().describe(
      'Whether Omniture integration is enabled. This property can be enabled only when the "Advanced Ad Serving" account setting is enabled.',
    ).optional(),
  }).describe("Omniture Integration Settings.").optional(),
  subaccountId: z.string().describe(
    "Subaccount ID of this floodlight configuration. This is a read-only field that can be left blank.",
  ).optional(),
  tagSettings: z.object({
    dynamicTagEnabled: z.boolean().describe(
      "Whether dynamic floodlight tags are enabled.",
    ).optional(),
    imageTagEnabled: z.boolean().describe("Whether image tags are enabled.")
      .optional(),
  }).describe("Dynamic and Image Tag Settings.").optional(),
  thirdPartyAuthenticationTokens: z.array(z.object({
    name: z.string().describe("Name of the third-party authentication token.")
      .optional(),
    value: z.string().describe(
      "Value of the third-party authentication token. This is a read-only, auto-generated field.",
    ).optional(),
  })).describe(
    "List of third-party authentication tokens enabled for this configuration.",
  ).optional(),
  userDefinedVariableConfigurations: z.array(z.object({
    dataType: z.enum(["STRING", "NUMBER"]).describe(
      "Data type for the variable. This is a required field.",
    ).optional(),
    reportName: z.string().describe(
      'User-friendly name for the variable which will appear in reports. This is a required field, must be less than 64 characters long, and cannot contain the following characters: ""<>".',
    ).optional(),
    variableType: z.enum([
      "U1",
      "U2",
      "U3",
      "U4",
      "U5",
      "U6",
      "U7",
      "U8",
      "U9",
      "U10",
      "U11",
      "U12",
      "U13",
      "U14",
      "U15",
      "U16",
      "U17",
      "U18",
      "U19",
      "U20",
      "U21",
      "U22",
      "U23",
      "U24",
      "U25",
      "U26",
      "U27",
      "U28",
      "U29",
      "U30",
      "U31",
      "U32",
      "U33",
      "U34",
      "U35",
      "U36",
      "U37",
      "U38",
      "U39",
      "U40",
      "U41",
      "U42",
      "U43",
      "U44",
      "U45",
      "U46",
      "U47",
      "U48",
      "U49",
      "U50",
      "U51",
      "U52",
      "U53",
      "U54",
      "U55",
      "U56",
      "U57",
      "U58",
      "U59",
      "U60",
      "U61",
      "U62",
      "U63",
      "U64",
      "U65",
      "U66",
      "U67",
      "U68",
      "U69",
      "U70",
      "U71",
      "U72",
      "U73",
      "U74",
      "U75",
      "U76",
      "U77",
      "U78",
      "U79",
      "U80",
      "U81",
      "U82",
      "U83",
      "U84",
      "U85",
      "U86",
      "U87",
      "U88",
      "U89",
      "U90",
      "U91",
      "U92",
      "U93",
      "U94",
      "U95",
      "U96",
      "U97",
      "U98",
      "U99",
      "U100",
    ]).describe("Variable name in the tag. This is a required field.")
      .optional(),
  })).describe("List of user defined variables enabled for this configuration.")
    .optional(),
});

const StateSchema = z.object({
  accountId: z.string().optional(),
  advertiserId: z.string().optional(),
  advertiserIdDimensionValue: z.object({
    dimensionName: z.string(),
    etag: z.string(),
    id: z.string(),
    kind: z.string(),
    matchType: z.string(),
    value: z.string(),
  }).optional(),
  analyticsDataSharingEnabled: z.boolean().optional(),
  customViewabilityMetric: z.object({
    configuration: z.object({
      audible: z.boolean(),
      timeMillis: z.number(),
      timePercent: z.number(),
      viewabilityPercent: z.number(),
    }),
    id: z.string(),
    name: z.string(),
  }).optional(),
  exposureToConversionEnabled: z.boolean().optional(),
  firstDayOfWeek: z.string().optional(),
  id: z.string(),
  idDimensionValue: z.object({
    dimensionName: z.string(),
    etag: z.string(),
    id: z.string(),
    kind: z.string(),
    matchType: z.string(),
    value: z.string(),
  }).optional(),
  inAppAttributionTrackingEnabled: z.boolean().optional(),
  kind: z.string().optional(),
  lookbackConfiguration: z.object({
    clickDuration: z.number(),
    postImpressionActivitiesDuration: z.number(),
  }).optional(),
  naturalSearchConversionAttributionOption: z.string().optional(),
  omnitureSettings: z.object({
    omnitureCostDataEnabled: z.boolean(),
    omnitureIntegrationEnabled: z.boolean(),
  }).optional(),
  subaccountId: z.string().optional(),
  tagSettings: z.object({
    dynamicTagEnabled: z.boolean(),
    imageTagEnabled: z.boolean(),
  }).optional(),
  thirdPartyAuthenticationTokens: z.array(z.object({
    name: z.string(),
    value: z.string(),
  })).optional(),
  userDefinedVariableConfigurations: z.array(z.object({
    dataType: z.string(),
    reportName: z.string(),
    variableType: z.string(),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accountId: z.string().describe(
    "Account ID of this floodlight configuration. This is a read-only field that can be left blank.",
  ).optional(),
  advertiserId: z.string().describe(
    "Advertiser ID of the parent advertiser of this floodlight configuration.",
  ).optional(),
  advertiserIdDimensionValue: z.object({
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
  analyticsDataSharingEnabled: z.boolean().describe(
    "Whether advertiser data is shared with Google Analytics.",
  ).optional(),
  customViewabilityMetric: z.object({
    configuration: z.object({
      audible: z.boolean().describe(
        "Whether the video must be audible to count an impression.",
      ).optional(),
      timeMillis: z.number().int().describe(
        "The time in milliseconds the video must play for the Custom Viewability Metric to count an impression. If both this and timePercent are specified, the earlier of the two will be used.",
      ).optional(),
      timePercent: z.number().int().describe(
        "The percentage of video that must play for the Custom Viewability Metric to count an impression. If both this and timeMillis are specified, the earlier of the two will be used.",
      ).optional(),
      viewabilityPercent: z.number().int().describe(
        "The percentage of video that must be on screen for the Custom Viewability Metric to count an impression.",
      ).optional(),
    }).describe(
      "The attributes, like playtime and percent onscreen, that define the Custom Viewability Metric.",
    ).optional(),
    id: z.string().describe("ID of the custom viewability metric.").optional(),
    name: z.string().describe("Name of the custom viewability metric.")
      .optional(),
  }).describe("Custom Viewability Metric").optional(),
  exposureToConversionEnabled: z.boolean().describe(
    "Whether the exposure-to-conversion report is enabled. This report shows detailed pathway information on up to 10 of the most recent ad exposures seen by a user before converting.",
  ).optional(),
  firstDayOfWeek: z.enum(["SUNDAY", "MONDAY"]).optional(),
  id: z.string().describe(
    "ID of this floodlight configuration. This is a read-only, auto-generated field.",
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
  inAppAttributionTrackingEnabled: z.boolean().describe(
    "Whether in-app attribution tracking is enabled.",
  ).optional(),
  kind: z.string().describe(
    'Identifies what kind of resource this is. Value: the fixed string "dfareporting#floodlightConfiguration".',
  ).optional(),
  lookbackConfiguration: z.object({
    clickDuration: z.number().int().describe(
      "Lookback window, in days, from the last time a given user clicked on one of your ads. If you enter 0, clicks will not be considered as triggering events for floodlight tracking. If you leave this field blank, the default value for your account will be used. Acceptable values are 0 to 90, inclusive.",
    ).optional(),
    postImpressionActivitiesDuration: z.number().int().describe(
      "Lookback window, in days, from the last time a given user viewed one of your ads. If you enter 0, impressions will not be considered as triggering events for floodlight tracking. If you leave this field blank, the default value for your account will be used. Acceptable values are 0 to 90, inclusive.",
    ).optional(),
  }).describe("Lookback configuration settings.").optional(),
  naturalSearchConversionAttributionOption: z.enum([
    "EXCLUDE_NATURAL_SEARCH_CONVERSION_ATTRIBUTION",
    "INCLUDE_NATURAL_SEARCH_CONVERSION_ATTRIBUTION",
    "INCLUDE_NATURAL_SEARCH_TIERED_CONVERSION_ATTRIBUTION",
  ]).describe("Types of attribution options for natural search conversions.")
    .optional(),
  omnitureSettings: z.object({
    omnitureCostDataEnabled: z.boolean().describe(
      "Whether placement cost data will be sent to Omniture. This property can be enabled only if omnitureIntegrationEnabled is true.",
    ).optional(),
    omnitureIntegrationEnabled: z.boolean().describe(
      'Whether Omniture integration is enabled. This property can be enabled only when the "Advanced Ad Serving" account setting is enabled.',
    ).optional(),
  }).describe("Omniture Integration Settings.").optional(),
  subaccountId: z.string().describe(
    "Subaccount ID of this floodlight configuration. This is a read-only field that can be left blank.",
  ).optional(),
  tagSettings: z.object({
    dynamicTagEnabled: z.boolean().describe(
      "Whether dynamic floodlight tags are enabled.",
    ).optional(),
    imageTagEnabled: z.boolean().describe("Whether image tags are enabled.")
      .optional(),
  }).describe("Dynamic and Image Tag Settings.").optional(),
  thirdPartyAuthenticationTokens: z.array(z.object({
    name: z.string().describe("Name of the third-party authentication token.")
      .optional(),
    value: z.string().describe(
      "Value of the third-party authentication token. This is a read-only, auto-generated field.",
    ).optional(),
  })).describe(
    "List of third-party authentication tokens enabled for this configuration.",
  ).optional(),
  userDefinedVariableConfigurations: z.array(z.object({
    dataType: z.enum(["STRING", "NUMBER"]).describe(
      "Data type for the variable. This is a required field.",
    ).optional(),
    reportName: z.string().describe(
      'User-friendly name for the variable which will appear in reports. This is a required field, must be less than 64 characters long, and cannot contain the following characters: ""<>".',
    ).optional(),
    variableType: z.enum([
      "U1",
      "U2",
      "U3",
      "U4",
      "U5",
      "U6",
      "U7",
      "U8",
      "U9",
      "U10",
      "U11",
      "U12",
      "U13",
      "U14",
      "U15",
      "U16",
      "U17",
      "U18",
      "U19",
      "U20",
      "U21",
      "U22",
      "U23",
      "U24",
      "U25",
      "U26",
      "U27",
      "U28",
      "U29",
      "U30",
      "U31",
      "U32",
      "U33",
      "U34",
      "U35",
      "U36",
      "U37",
      "U38",
      "U39",
      "U40",
      "U41",
      "U42",
      "U43",
      "U44",
      "U45",
      "U46",
      "U47",
      "U48",
      "U49",
      "U50",
      "U51",
      "U52",
      "U53",
      "U54",
      "U55",
      "U56",
      "U57",
      "U58",
      "U59",
      "U60",
      "U61",
      "U62",
      "U63",
      "U64",
      "U65",
      "U66",
      "U67",
      "U68",
      "U69",
      "U70",
      "U71",
      "U72",
      "U73",
      "U74",
      "U75",
      "U76",
      "U77",
      "U78",
      "U79",
      "U80",
      "U81",
      "U82",
      "U83",
      "U84",
      "U85",
      "U86",
      "U87",
      "U88",
      "U89",
      "U90",
      "U91",
      "U92",
      "U93",
      "U94",
      "U95",
      "U96",
      "U97",
      "U98",
      "U99",
      "U100",
    ]).describe("Variable name in the tag. This is a required field.")
      .optional(),
  })).describe("List of user defined variables enabled for this configuration.")
    .optional(),
});

/** Swamp extension model for Google Cloud Campaign Manager 360 FloodlightConfigurations. Registered at `@swamp/gcp/dfareporting/floodlightconfigurations`. */
export const model = {
  type: "@swamp/gcp/dfareporting/floodlightconfigurations",
  version: "2026.05.19.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Contains properties of a Floodlight configuration.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a floodlightConfigurations",
      arguments: z.object({
        identifier: z.string().describe(
          "The id of the floodlightConfigurations",
        ),
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
      description: "Update floodlightConfigurations attributes",
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
        if (g["advertiserId"] !== undefined) {
          body["advertiserId"] = g["advertiserId"];
        }
        if (g["advertiserIdDimensionValue"] !== undefined) {
          body["advertiserIdDimensionValue"] = g["advertiserIdDimensionValue"];
        }
        if (g["analyticsDataSharingEnabled"] !== undefined) {
          body["analyticsDataSharingEnabled"] =
            g["analyticsDataSharingEnabled"];
        }
        if (g["customViewabilityMetric"] !== undefined) {
          body["customViewabilityMetric"] = g["customViewabilityMetric"];
        }
        if (g["exposureToConversionEnabled"] !== undefined) {
          body["exposureToConversionEnabled"] =
            g["exposureToConversionEnabled"];
        }
        if (g["firstDayOfWeek"] !== undefined) {
          body["firstDayOfWeek"] = g["firstDayOfWeek"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["idDimensionValue"] !== undefined) {
          body["idDimensionValue"] = g["idDimensionValue"];
        }
        if (g["inAppAttributionTrackingEnabled"] !== undefined) {
          body["inAppAttributionTrackingEnabled"] =
            g["inAppAttributionTrackingEnabled"];
        }
        if (g["kind"] !== undefined) body["kind"] = g["kind"];
        if (g["lookbackConfiguration"] !== undefined) {
          body["lookbackConfiguration"] = g["lookbackConfiguration"];
        }
        if (g["naturalSearchConversionAttributionOption"] !== undefined) {
          body["naturalSearchConversionAttributionOption"] =
            g["naturalSearchConversionAttributionOption"];
        }
        if (g["omnitureSettings"] !== undefined) {
          body["omnitureSettings"] = g["omnitureSettings"];
        }
        if (g["subaccountId"] !== undefined) {
          body["subaccountId"] = g["subaccountId"];
        }
        if (g["tagSettings"] !== undefined) {
          body["tagSettings"] = g["tagSettings"];
        }
        if (g["thirdPartyAuthenticationTokens"] !== undefined) {
          body["thirdPartyAuthenticationTokens"] =
            g["thirdPartyAuthenticationTokens"];
        }
        if (g["userDefinedVariableConfigurations"] !== undefined) {
          body["userDefinedVariableConfigurations"] =
            g["userDefinedVariableConfigurations"];
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
      description: "Sync floodlightConfigurations state from GCP",
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
