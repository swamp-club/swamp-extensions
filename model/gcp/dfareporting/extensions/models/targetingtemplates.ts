// Auto-generated extension model for @swamp/gcp/dfareporting/targetingtemplates
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Campaign Manager 360 TargetingTemplates.
 *
 * Contains properties of a targeting template. A targeting template encapsulates targeting information which can be reused across multiple ads.
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

const BASE_URL = "https://dfareporting.googleapis.com/dfareporting/v5/";

const GET_CONFIG = {
  "id": "dfareporting.targetingTemplates.get",
  "path": "userprofiles/{+profileId}/targetingTemplates/{+id}",
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
  "id": "dfareporting.targetingTemplates.insert",
  "path": "userprofiles/{+profileId}/targetingTemplates",
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
  "id": "dfareporting.targetingTemplates.update",
  "path": "userprofiles/{+profileId}/targetingTemplates",
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
  "id": "dfareporting.targetingTemplates.list",
  "path": "userprofiles/{+profileId}/targetingTemplates",
  "httpMethod": "GET",
  "parameterOrder": [
    "profileId",
  ],
  "parameters": {
    "advertiserId": {
      "location": "query",
    },
    "ids": {
      "location": "query",
    },
    "maxResults": {
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
  },
} as const;

const GlobalArgsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  accountId: z.string().describe(
    "Account ID of this targeting template. This field, if left unset, will be auto-generated on insert and is read-only after insert.",
  ).optional(),
  advertiserId: z.string().describe(
    "Advertiser ID of this targeting template. This is a required field on insert and is read-only after insert.",
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
  contextualKeywordTargeting: z.object({
    keywords: z.array(z.object({
      keyword: z.string().describe("The keyword that can be targeted by ads.")
        .optional(),
    })).describe("Contextual keywords that this ad targets").optional(),
  }).describe("Contextual Keyword Targeting.").optional(),
  dayPartTargeting: z.object({
    daysOfWeek: z.array(
      z.enum([
        "SUNDAY",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
      ]),
    ).describe(
      'Days of the week when the ad will serve. Acceptable values are: - "SUNDAY" - "MONDAY" - "TUESDAY" - "WEDNESDAY" - "THURSDAY" - "FRIDAY" - "SATURDAY"',
    ).optional(),
    hoursOfDay: z.array(z.number().int()).describe(
      "Hours of the day when the ad will serve, where 0 is midnight to 1 AM and 23 is 11 PM to midnight. Can be specified with days of week, in which case the ad would serve during these hours on the specified days. For example if Monday, Wednesday, Friday are the days of week specified and 9-10am, 3-5pm (hours 9, 15, and 16) is specified, the ad would serve Monday, Wednesdays, and Fridays at 9-10am and 3-5pm. Acceptable values are 0 to 23, inclusive.",
    ).optional(),
    userLocalTime: z.boolean().describe(
      "Whether or not to use the user's local time. If false, the America/New York time zone applies.",
    ).optional(),
  }).describe("Day Part Targeting.").optional(),
  geoTargeting: z.object({
    cities: z.array(z.object({
      countryCode: z.string().describe(
        "Country code of the country to which this city belongs.",
      ).optional(),
      countryDartId: z.string().describe(
        "DART ID of the country to which this city belongs.",
      ).optional(),
      dartId: z.string().describe(
        "DART ID of this city. This is the ID used for targeting and generating reports.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#city".',
      ).optional(),
      metroCode: z.string().describe(
        "Metro region code of the metro region (DMA) to which this city belongs.",
      ).optional(),
      metroDmaId: z.string().describe(
        "ID of the metro region (DMA) to which this city belongs.",
      ).optional(),
      name: z.string().describe("Name of this city.").optional(),
      regionCode: z.string().describe(
        "Region code of the region to which this city belongs.",
      ).optional(),
      regionDartId: z.string().describe(
        "DART ID of the region to which this city belongs.",
      ).optional(),
    })).describe(
      "Cities to be targeted. For each city only dartId is required. The other fields are populated automatically when the ad is inserted or updated. If targeting a city, do not target or exclude the country of the city, and do not target the metro or region of the city.",
    ).optional(),
    countries: z.array(z.object({
      countryCode: z.string().describe("Country code.").optional(),
      dartId: z.string().describe(
        "DART ID of this country. This is the ID used for targeting and generating reports.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#country".',
      ).optional(),
      name: z.string().describe("Name of this country.").optional(),
      sslEnabled: z.boolean().describe(
        "Whether ad serving supports secure servers in this country.",
      ).optional(),
      tvDataProviders: z.array(
        z.enum([
          "INVALID_TV_DATA_PROVIDER",
          "INTAGE_JP",
          "IBOPE_AR",
          "IBOPE_BR",
          "IBOPE_CL",
          "IBOPE_CO",
          "TNS_VN",
          "COMSCORE_NATIONAL_US",
          "COMSCORE_CA",
          "SAMBA_AU",
        ]),
      ).describe(
        "Output only. The TV data providers supported in this country.",
      ).optional(),
    })).describe(
      "Countries to be targeted or excluded from targeting, depending on the setting of the excludeCountries field. For each country only dartId is required. The other fields are populated automatically when the ad is inserted or updated. If targeting or excluding a country, do not target regions, cities, metros, or postal codes in the same country.",
    ).optional(),
    excludeCountries: z.boolean().describe(
      "Whether or not to exclude the countries in the countries field from targeting. If false, the countries field refers to countries which will be targeted by the ad.",
    ).optional(),
    metros: z.array(z.object({
      countryCode: z.string().describe(
        "Country code of the country to which this metro region belongs.",
      ).optional(),
      countryDartId: z.string().describe(
        "DART ID of the country to which this metro region belongs.",
      ).optional(),
      dartId: z.string().describe("DART ID of this metro region.").optional(),
      dmaId: z.string().describe(
        "DMA ID of this metro region. This is the ID used for targeting and generating reports, and is equivalent to metro_code.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#metro".',
      ).optional(),
      metroCode: z.string().describe(
        "Metro code of this metro region. This is equivalent to dma_id.",
      ).optional(),
      name: z.string().describe("Name of this metro region.").optional(),
    })).describe(
      "Metros to be targeted. For each metro only dmaId is required. The other fields are populated automatically when the ad is inserted or updated. If targeting a metro, do not target or exclude the country of the metro.",
    ).optional(),
    postalCodes: z.array(z.object({
      code: z.string().describe(
        "Postal code. This is equivalent to the id field.",
      ).optional(),
      countryCode: z.string().describe(
        "Country code of the country to which this postal code belongs.",
      ).optional(),
      countryDartId: z.string().describe(
        "DART ID of the country to which this postal code belongs.",
      ).optional(),
      id: z.string().describe("ID of this postal code.").optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#postalCode".',
      ).optional(),
    })).describe(
      "Postal codes to be targeted. For each postal code only id is required. The other fields are populated automatically when the ad is inserted or updated. If targeting a postal code, do not target or exclude the country of the postal code.",
    ).optional(),
    regions: z.array(z.object({
      countryCode: z.string().describe(
        "Country code of the country to which this region belongs.",
      ).optional(),
      countryDartId: z.string().describe(
        "DART ID of the country to which this region belongs.",
      ).optional(),
      dartId: z.string().describe("DART ID of this region.").optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#region".',
      ).optional(),
      name: z.string().describe("Name of this region.").optional(),
      regionCode: z.string().describe("Region code.").optional(),
    })).describe(
      "Regions to be targeted. For each region only dartId is required. The other fields are populated automatically when the ad is inserted or updated. If targeting a region, do not target or exclude the country of the region.",
    ).optional(),
  }).describe("Geographical Targeting.").optional(),
  id: z.string().describe(
    "ID of this targeting template. This is a read-only, auto-generated field.",
  ).optional(),
  keyValueTargetingExpression: z.object({
    expression: z.string().describe(
      "Keyword expression being targeted by the ad.",
    ).optional(),
  }).describe("Key Value Targeting Expression.").optional(),
  languageTargeting: z.object({
    languages: z.array(z.object({
      id: z.string().describe(
        "Language ID of this language. This is the ID used for targeting and generating reports.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#language".',
      ).optional(),
      languageCode: z.string().describe(
        'Format of language code is an ISO 639 two-letter language code optionally followed by an underscore followed by an ISO 3166 code. Examples are "en" for English or "zh_CN" for Simplified Chinese.',
      ).optional(),
      name: z.string().describe("Name of this language.").optional(),
    })).describe(
      "Languages that this ad targets. For each language only languageId is required. The other fields are populated automatically when the ad is inserted or updated.",
    ).optional(),
  }).describe("Language Targeting.").optional(),
  listTargetingExpression: z.object({
    expression: z.string().describe(
      "Expression describing which lists are being targeted by the ad.",
    ).optional(),
  }).describe("Remarketing List Targeting Expression.").optional(),
  name: z.string().describe(
    "Name of this targeting template. This field is required. It must be less than 256 characters long and unique within an advertiser.",
  ).optional(),
  subaccountId: z.string().describe(
    "Subaccount ID of this targeting template. This field, if left unset, will be auto-generated on insert and is read-only after insert.",
  ).optional(),
  technologyTargeting: z.object({
    browsers: z.array(z.object({
      browserVersionId: z.string().describe(
        "ID referring to this grouping of browser and version numbers. This is the ID used for targeting.",
      ).optional(),
      dartId: z.string().describe(
        "DART ID of this browser. This is the ID used when generating reports.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#browser".',
      ).optional(),
      majorVersion: z.string().describe(
        "Major version number (leftmost number) of this browser. For example, for Chrome 5.0.376.86 beta, this field should be set to 5. An asterisk (*) may be used to target any version number, and a question mark (?) may be used to target cases where the version number cannot be identified. For example, Chrome *.* targets any version of Chrome: 1.2, 2.5, 3.5, and so on. Chrome 3.* targets Chrome 3.1, 3.5, but not 4.0. Firefox?.? targets cases where the ad server knows the browser is Firefox but can't tell which version it is.",
      ).optional(),
      minorVersion: z.string().describe(
        "Minor version number (number after first dot on left) of this browser. For example, for Chrome 5.0.375.86 beta, this field should be set to 0. An asterisk (*) may be used to target any version number, and a question mark (?) may be used to target cases where the version number cannot be identified. For example, Chrome *.* targets any version of Chrome: 1.2, 2.5, 3.5, and so on. Chrome 3.* targets Chrome 3.1, 3.5, but not 4.0. Firefox?.? targets cases where the ad server knows the browser is Firefox but can't tell which version it is.",
      ).optional(),
      name: z.string().describe("Name of this browser.").optional(),
    })).describe(
      "Browsers that this ad targets. For each browser either set browserVersionId or dartId along with the version numbers. If both are specified, only browserVersionId will be used. The other fields are populated automatically when the ad is inserted or updated.",
    ).optional(),
    connectionTypes: z.array(z.object({
      id: z.string().describe("ID of this connection type.").optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#connectionType".',
      ).optional(),
      name: z.string().describe("Name of this connection type.").optional(),
    })).describe(
      "Connection types that this ad targets. For each connection type only id is required. The other fields are populated automatically when the ad is inserted or updated.",
    ).optional(),
    mobileCarriers: z.array(z.object({
      countryCode: z.string().describe(
        "Country code of the country to which this mobile carrier belongs.",
      ).optional(),
      countryDartId: z.string().describe(
        "DART ID of the country to which this mobile carrier belongs.",
      ).optional(),
      id: z.string().describe("ID of this mobile carrier.").optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#mobileCarrier".',
      ).optional(),
      name: z.string().describe("Name of this mobile carrier.").optional(),
    })).describe(
      "Mobile carriers that this ad targets. For each mobile carrier only id is required, and the other fields are populated automatically when the ad is inserted or updated. If targeting a mobile carrier, do not set targeting for any zip codes.",
    ).optional(),
    operatingSystemVersions: z.array(z.object({
      id: z.string().describe("ID of this operating system version.")
        .optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#operatingSystemVersion".',
      ).optional(),
      majorVersion: z.string().describe(
        "Major version (leftmost number) of this operating system version.",
      ).optional(),
      minorVersion: z.string().describe(
        "Minor version (number after the first dot) of this operating system version.",
      ).optional(),
      name: z.string().describe("Name of this operating system version.")
        .optional(),
      operatingSystem: z.object({
        dartId: z.string().describe(
          "DART ID of this operating system. This is the ID used for targeting.",
        ).optional(),
        desktop: z.boolean().describe(
          "Whether this operating system is for desktop.",
        ).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string "dfareporting#operatingSystem".',
        ).optional(),
        mobile: z.boolean().describe(
          "Whether this operating system is for mobile.",
        ).optional(),
        name: z.string().describe("Name of this operating system.").optional(),
      }).describe(
        "Contains information about an operating system that can be targeted by ads.",
      ).optional(),
    })).describe(
      "Operating system versions that this ad targets. To target all versions, use operatingSystems. For each operating system version, only id is required. The other fields are populated automatically when the ad is inserted or updated. If targeting an operating system version, do not set targeting for the corresponding operating system in operatingSystems.",
    ).optional(),
    operatingSystems: z.array(z.object({
      dartId: z.string().describe(
        "DART ID of this operating system. This is the ID used for targeting.",
      ).optional(),
      desktop: z.boolean().describe(
        "Whether this operating system is for desktop.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#operatingSystem".',
      ).optional(),
      mobile: z.boolean().describe(
        "Whether this operating system is for mobile.",
      ).optional(),
      name: z.string().describe("Name of this operating system.").optional(),
    })).describe(
      "Operating systems that this ad targets. To target specific versions, use operatingSystemVersions. For each operating system only dartId is required. The other fields are populated automatically when the ad is inserted or updated. If targeting an operating system, do not set targeting for operating system versions for the same operating system.",
    ).optional(),
    platformTypes: z.array(z.object({
      id: z.string().describe("ID of this platform type.").optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#platformType".',
      ).optional(),
      name: z.string().describe("Name of this platform type.").optional(),
    })).describe(
      "Platform types that this ad targets. For example, desktop, mobile, or tablet. For each platform type, only id is required, and the other fields are populated automatically when the ad is inserted or updated.",
    ).optional(),
  }).describe("Technology Targeting.").optional(),
  profileId: z.string().describe(
    "User profile ID associated with this request.",
  ),
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
  contextualKeywordTargeting: z.object({
    keywords: z.array(z.object({
      keyword: z.string(),
    })),
  }).optional(),
  dayPartTargeting: z.object({
    daysOfWeek: z.array(z.string()),
    hoursOfDay: z.array(z.number()),
    userLocalTime: z.boolean(),
  }).optional(),
  geoTargeting: z.object({
    cities: z.array(z.object({
      countryCode: z.string(),
      countryDartId: z.string(),
      dartId: z.string(),
      kind: z.string(),
      metroCode: z.string(),
      metroDmaId: z.string(),
      name: z.string(),
      regionCode: z.string(),
      regionDartId: z.string(),
    })),
    countries: z.array(z.object({
      countryCode: z.string(),
      dartId: z.string(),
      kind: z.string(),
      name: z.string(),
      sslEnabled: z.boolean(),
      tvDataProviders: z.array(z.string()),
    })),
    excludeCountries: z.boolean(),
    metros: z.array(z.object({
      countryCode: z.string(),
      countryDartId: z.string(),
      dartId: z.string(),
      dmaId: z.string(),
      kind: z.string(),
      metroCode: z.string(),
      name: z.string(),
    })),
    postalCodes: z.array(z.object({
      code: z.string(),
      countryCode: z.string(),
      countryDartId: z.string(),
      id: z.string(),
      kind: z.string(),
    })),
    regions: z.array(z.object({
      countryCode: z.string(),
      countryDartId: z.string(),
      dartId: z.string(),
      kind: z.string(),
      name: z.string(),
      regionCode: z.string(),
    })),
  }).optional(),
  id: z.string(),
  keyValueTargetingExpression: z.object({
    expression: z.string(),
  }).optional(),
  kind: z.string().optional(),
  languageTargeting: z.object({
    languages: z.array(z.object({
      id: z.string(),
      kind: z.string(),
      languageCode: z.string(),
      name: z.string(),
    })),
  }).optional(),
  listTargetingExpression: z.object({
    expression: z.string(),
  }).optional(),
  name: z.string().optional(),
  subaccountId: z.string().optional(),
  technologyTargeting: z.object({
    browsers: z.array(z.object({
      browserVersionId: z.string(),
      dartId: z.string(),
      kind: z.string(),
      majorVersion: z.string(),
      minorVersion: z.string(),
      name: z.string(),
    })),
    connectionTypes: z.array(z.object({
      id: z.string(),
      kind: z.string(),
      name: z.string(),
    })),
    mobileCarriers: z.array(z.object({
      countryCode: z.string(),
      countryDartId: z.string(),
      id: z.string(),
      kind: z.string(),
      name: z.string(),
    })),
    operatingSystemVersions: z.array(z.object({
      id: z.string(),
      kind: z.string(),
      majorVersion: z.string(),
      minorVersion: z.string(),
      name: z.string(),
      operatingSystem: z.object({
        dartId: z.string(),
        desktop: z.boolean(),
        kind: z.string(),
        mobile: z.boolean(),
        name: z.string(),
      }),
    })),
    operatingSystems: z.array(z.object({
      dartId: z.string(),
      desktop: z.boolean(),
      kind: z.string(),
      mobile: z.boolean(),
      name: z.string(),
    })),
    platformTypes: z.array(z.object({
      id: z.string(),
      kind: z.string(),
      name: z.string(),
    })),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  accountId: z.string().describe(
    "Account ID of this targeting template. This field, if left unset, will be auto-generated on insert and is read-only after insert.",
  ).optional(),
  advertiserId: z.string().describe(
    "Advertiser ID of this targeting template. This is a required field on insert and is read-only after insert.",
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
  contextualKeywordTargeting: z.object({
    keywords: z.array(z.object({
      keyword: z.string().describe("The keyword that can be targeted by ads.")
        .optional(),
    })).describe("Contextual keywords that this ad targets").optional(),
  }).describe("Contextual Keyword Targeting.").optional(),
  dayPartTargeting: z.object({
    daysOfWeek: z.array(
      z.enum([
        "SUNDAY",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
      ]),
    ).describe(
      'Days of the week when the ad will serve. Acceptable values are: - "SUNDAY" - "MONDAY" - "TUESDAY" - "WEDNESDAY" - "THURSDAY" - "FRIDAY" - "SATURDAY"',
    ).optional(),
    hoursOfDay: z.array(z.number().int()).describe(
      "Hours of the day when the ad will serve, where 0 is midnight to 1 AM and 23 is 11 PM to midnight. Can be specified with days of week, in which case the ad would serve during these hours on the specified days. For example if Monday, Wednesday, Friday are the days of week specified and 9-10am, 3-5pm (hours 9, 15, and 16) is specified, the ad would serve Monday, Wednesdays, and Fridays at 9-10am and 3-5pm. Acceptable values are 0 to 23, inclusive.",
    ).optional(),
    userLocalTime: z.boolean().describe(
      "Whether or not to use the user's local time. If false, the America/New York time zone applies.",
    ).optional(),
  }).describe("Day Part Targeting.").optional(),
  geoTargeting: z.object({
    cities: z.array(z.object({
      countryCode: z.string().describe(
        "Country code of the country to which this city belongs.",
      ).optional(),
      countryDartId: z.string().describe(
        "DART ID of the country to which this city belongs.",
      ).optional(),
      dartId: z.string().describe(
        "DART ID of this city. This is the ID used for targeting and generating reports.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#city".',
      ).optional(),
      metroCode: z.string().describe(
        "Metro region code of the metro region (DMA) to which this city belongs.",
      ).optional(),
      metroDmaId: z.string().describe(
        "ID of the metro region (DMA) to which this city belongs.",
      ).optional(),
      name: z.string().describe("Name of this city.").optional(),
      regionCode: z.string().describe(
        "Region code of the region to which this city belongs.",
      ).optional(),
      regionDartId: z.string().describe(
        "DART ID of the region to which this city belongs.",
      ).optional(),
    })).describe(
      "Cities to be targeted. For each city only dartId is required. The other fields are populated automatically when the ad is inserted or updated. If targeting a city, do not target or exclude the country of the city, and do not target the metro or region of the city.",
    ).optional(),
    countries: z.array(z.object({
      countryCode: z.string().describe("Country code.").optional(),
      dartId: z.string().describe(
        "DART ID of this country. This is the ID used for targeting and generating reports.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#country".',
      ).optional(),
      name: z.string().describe("Name of this country.").optional(),
      sslEnabled: z.boolean().describe(
        "Whether ad serving supports secure servers in this country.",
      ).optional(),
      tvDataProviders: z.array(
        z.enum([
          "INVALID_TV_DATA_PROVIDER",
          "INTAGE_JP",
          "IBOPE_AR",
          "IBOPE_BR",
          "IBOPE_CL",
          "IBOPE_CO",
          "TNS_VN",
          "COMSCORE_NATIONAL_US",
          "COMSCORE_CA",
          "SAMBA_AU",
        ]),
      ).describe(
        "Output only. The TV data providers supported in this country.",
      ).optional(),
    })).describe(
      "Countries to be targeted or excluded from targeting, depending on the setting of the excludeCountries field. For each country only dartId is required. The other fields are populated automatically when the ad is inserted or updated. If targeting or excluding a country, do not target regions, cities, metros, or postal codes in the same country.",
    ).optional(),
    excludeCountries: z.boolean().describe(
      "Whether or not to exclude the countries in the countries field from targeting. If false, the countries field refers to countries which will be targeted by the ad.",
    ).optional(),
    metros: z.array(z.object({
      countryCode: z.string().describe(
        "Country code of the country to which this metro region belongs.",
      ).optional(),
      countryDartId: z.string().describe(
        "DART ID of the country to which this metro region belongs.",
      ).optional(),
      dartId: z.string().describe("DART ID of this metro region.").optional(),
      dmaId: z.string().describe(
        "DMA ID of this metro region. This is the ID used for targeting and generating reports, and is equivalent to metro_code.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#metro".',
      ).optional(),
      metroCode: z.string().describe(
        "Metro code of this metro region. This is equivalent to dma_id.",
      ).optional(),
      name: z.string().describe("Name of this metro region.").optional(),
    })).describe(
      "Metros to be targeted. For each metro only dmaId is required. The other fields are populated automatically when the ad is inserted or updated. If targeting a metro, do not target or exclude the country of the metro.",
    ).optional(),
    postalCodes: z.array(z.object({
      code: z.string().describe(
        "Postal code. This is equivalent to the id field.",
      ).optional(),
      countryCode: z.string().describe(
        "Country code of the country to which this postal code belongs.",
      ).optional(),
      countryDartId: z.string().describe(
        "DART ID of the country to which this postal code belongs.",
      ).optional(),
      id: z.string().describe("ID of this postal code.").optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#postalCode".',
      ).optional(),
    })).describe(
      "Postal codes to be targeted. For each postal code only id is required. The other fields are populated automatically when the ad is inserted or updated. If targeting a postal code, do not target or exclude the country of the postal code.",
    ).optional(),
    regions: z.array(z.object({
      countryCode: z.string().describe(
        "Country code of the country to which this region belongs.",
      ).optional(),
      countryDartId: z.string().describe(
        "DART ID of the country to which this region belongs.",
      ).optional(),
      dartId: z.string().describe("DART ID of this region.").optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#region".',
      ).optional(),
      name: z.string().describe("Name of this region.").optional(),
      regionCode: z.string().describe("Region code.").optional(),
    })).describe(
      "Regions to be targeted. For each region only dartId is required. The other fields are populated automatically when the ad is inserted or updated. If targeting a region, do not target or exclude the country of the region.",
    ).optional(),
  }).describe("Geographical Targeting.").optional(),
  id: z.string().describe(
    "ID of this targeting template. This is a read-only, auto-generated field.",
  ).optional(),
  keyValueTargetingExpression: z.object({
    expression: z.string().describe(
      "Keyword expression being targeted by the ad.",
    ).optional(),
  }).describe("Key Value Targeting Expression.").optional(),
  languageTargeting: z.object({
    languages: z.array(z.object({
      id: z.string().describe(
        "Language ID of this language. This is the ID used for targeting and generating reports.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#language".',
      ).optional(),
      languageCode: z.string().describe(
        'Format of language code is an ISO 639 two-letter language code optionally followed by an underscore followed by an ISO 3166 code. Examples are "en" for English or "zh_CN" for Simplified Chinese.',
      ).optional(),
      name: z.string().describe("Name of this language.").optional(),
    })).describe(
      "Languages that this ad targets. For each language only languageId is required. The other fields are populated automatically when the ad is inserted or updated.",
    ).optional(),
  }).describe("Language Targeting.").optional(),
  listTargetingExpression: z.object({
    expression: z.string().describe(
      "Expression describing which lists are being targeted by the ad.",
    ).optional(),
  }).describe("Remarketing List Targeting Expression.").optional(),
  name: z.string().describe(
    "Name of this targeting template. This field is required. It must be less than 256 characters long and unique within an advertiser.",
  ).optional(),
  subaccountId: z.string().describe(
    "Subaccount ID of this targeting template. This field, if left unset, will be auto-generated on insert and is read-only after insert.",
  ).optional(),
  technologyTargeting: z.object({
    browsers: z.array(z.object({
      browserVersionId: z.string().describe(
        "ID referring to this grouping of browser and version numbers. This is the ID used for targeting.",
      ).optional(),
      dartId: z.string().describe(
        "DART ID of this browser. This is the ID used when generating reports.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#browser".',
      ).optional(),
      majorVersion: z.string().describe(
        "Major version number (leftmost number) of this browser. For example, for Chrome 5.0.376.86 beta, this field should be set to 5. An asterisk (*) may be used to target any version number, and a question mark (?) may be used to target cases where the version number cannot be identified. For example, Chrome *.* targets any version of Chrome: 1.2, 2.5, 3.5, and so on. Chrome 3.* targets Chrome 3.1, 3.5, but not 4.0. Firefox?.? targets cases where the ad server knows the browser is Firefox but can't tell which version it is.",
      ).optional(),
      minorVersion: z.string().describe(
        "Minor version number (number after first dot on left) of this browser. For example, for Chrome 5.0.375.86 beta, this field should be set to 0. An asterisk (*) may be used to target any version number, and a question mark (?) may be used to target cases where the version number cannot be identified. For example, Chrome *.* targets any version of Chrome: 1.2, 2.5, 3.5, and so on. Chrome 3.* targets Chrome 3.1, 3.5, but not 4.0. Firefox?.? targets cases where the ad server knows the browser is Firefox but can't tell which version it is.",
      ).optional(),
      name: z.string().describe("Name of this browser.").optional(),
    })).describe(
      "Browsers that this ad targets. For each browser either set browserVersionId or dartId along with the version numbers. If both are specified, only browserVersionId will be used. The other fields are populated automatically when the ad is inserted or updated.",
    ).optional(),
    connectionTypes: z.array(z.object({
      id: z.string().describe("ID of this connection type.").optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#connectionType".',
      ).optional(),
      name: z.string().describe("Name of this connection type.").optional(),
    })).describe(
      "Connection types that this ad targets. For each connection type only id is required. The other fields are populated automatically when the ad is inserted or updated.",
    ).optional(),
    mobileCarriers: z.array(z.object({
      countryCode: z.string().describe(
        "Country code of the country to which this mobile carrier belongs.",
      ).optional(),
      countryDartId: z.string().describe(
        "DART ID of the country to which this mobile carrier belongs.",
      ).optional(),
      id: z.string().describe("ID of this mobile carrier.").optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#mobileCarrier".',
      ).optional(),
      name: z.string().describe("Name of this mobile carrier.").optional(),
    })).describe(
      "Mobile carriers that this ad targets. For each mobile carrier only id is required, and the other fields are populated automatically when the ad is inserted or updated. If targeting a mobile carrier, do not set targeting for any zip codes.",
    ).optional(),
    operatingSystemVersions: z.array(z.object({
      id: z.string().describe("ID of this operating system version.")
        .optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#operatingSystemVersion".',
      ).optional(),
      majorVersion: z.string().describe(
        "Major version (leftmost number) of this operating system version.",
      ).optional(),
      minorVersion: z.string().describe(
        "Minor version (number after the first dot) of this operating system version.",
      ).optional(),
      name: z.string().describe("Name of this operating system version.")
        .optional(),
      operatingSystem: z.object({
        dartId: z.string().describe(
          "DART ID of this operating system. This is the ID used for targeting.",
        ).optional(),
        desktop: z.boolean().describe(
          "Whether this operating system is for desktop.",
        ).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string "dfareporting#operatingSystem".',
        ).optional(),
        mobile: z.boolean().describe(
          "Whether this operating system is for mobile.",
        ).optional(),
        name: z.string().describe("Name of this operating system.").optional(),
      }).describe(
        "Contains information about an operating system that can be targeted by ads.",
      ).optional(),
    })).describe(
      "Operating system versions that this ad targets. To target all versions, use operatingSystems. For each operating system version, only id is required. The other fields are populated automatically when the ad is inserted or updated. If targeting an operating system version, do not set targeting for the corresponding operating system in operatingSystems.",
    ).optional(),
    operatingSystems: z.array(z.object({
      dartId: z.string().describe(
        "DART ID of this operating system. This is the ID used for targeting.",
      ).optional(),
      desktop: z.boolean().describe(
        "Whether this operating system is for desktop.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#operatingSystem".',
      ).optional(),
      mobile: z.boolean().describe(
        "Whether this operating system is for mobile.",
      ).optional(),
      name: z.string().describe("Name of this operating system.").optional(),
    })).describe(
      "Operating systems that this ad targets. To target specific versions, use operatingSystemVersions. For each operating system only dartId is required. The other fields are populated automatically when the ad is inserted or updated. If targeting an operating system, do not set targeting for operating system versions for the same operating system.",
    ).optional(),
    platformTypes: z.array(z.object({
      id: z.string().describe("ID of this platform type.").optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#platformType".',
      ).optional(),
      name: z.string().describe("Name of this platform type.").optional(),
    })).describe(
      "Platform types that this ad targets. For example, desktop, mobile, or tablet. For each platform type, only id is required, and the other fields are populated automatically when the ad is inserted or updated.",
    ).optional(),
  }).describe("Technology Targeting.").optional(),
  profileId: z.string().describe(
    "User profile ID associated with this request.",
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

/** Swamp extension model for Google Cloud Campaign Manager 360 TargetingTemplates. Registered at `@swamp/gcp/dfareporting/targetingtemplates`. */
export const model = {
  type: "@swamp/gcp/dfareporting/targetingtemplates",
  version: "2026.06.07.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Contains properties of a targeting template. A targeting template encapsulate...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a targetingTemplates",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["accountId"] !== undefined) body["accountId"] = g["accountId"];
        if (g["advertiserId"] !== undefined) {
          body["advertiserId"] = g["advertiserId"];
        }
        if (g["advertiserIdDimensionValue"] !== undefined) {
          body["advertiserIdDimensionValue"] = g["advertiserIdDimensionValue"];
        }
        if (g["contextualKeywordTargeting"] !== undefined) {
          body["contextualKeywordTargeting"] = g["contextualKeywordTargeting"];
        }
        if (g["dayPartTargeting"] !== undefined) {
          body["dayPartTargeting"] = g["dayPartTargeting"];
        }
        if (g["geoTargeting"] !== undefined) {
          body["geoTargeting"] = g["geoTargeting"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["keyValueTargetingExpression"] !== undefined) {
          body["keyValueTargetingExpression"] =
            g["keyValueTargetingExpression"];
        }
        if (g["languageTargeting"] !== undefined) {
          body["languageTargeting"] = g["languageTargeting"];
        }
        if (g["listTargetingExpression"] !== undefined) {
          body["listTargetingExpression"] = g["listTargetingExpression"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["subaccountId"] !== undefined) {
          body["subaccountId"] = g["subaccountId"];
        }
        if (g["technologyTargeting"] !== undefined) {
          body["technologyTargeting"] = g["technologyTargeting"];
        }
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
          credentials,
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
      description: "Get a targetingTemplates",
      arguments: z.object({
        identifier: z.string().describe("The id of the targetingTemplates"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        }
        params["id"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
          credentials,
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
      description: "Update targetingTemplates attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        if (g["contextualKeywordTargeting"] !== undefined) {
          body["contextualKeywordTargeting"] = g["contextualKeywordTargeting"];
        }
        if (g["dayPartTargeting"] !== undefined) {
          body["dayPartTargeting"] = g["dayPartTargeting"];
        }
        if (g["geoTargeting"] !== undefined) {
          body["geoTargeting"] = g["geoTargeting"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["keyValueTargetingExpression"] !== undefined) {
          body["keyValueTargetingExpression"] =
            g["keyValueTargetingExpression"];
        }
        if (g["languageTargeting"] !== undefined) {
          body["languageTargeting"] = g["languageTargeting"];
        }
        if (g["listTargetingExpression"] !== undefined) {
          body["listTargetingExpression"] = g["listTargetingExpression"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["subaccountId"] !== undefined) {
          body["subaccountId"] = g["subaccountId"];
        }
        if (g["technologyTargeting"] !== undefined) {
          body["technologyTargeting"] = g["technologyTargeting"];
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
      description: "Sync targetingTemplates state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
      description: "List targetingTemplates resources",
      arguments: z.object({
        advertiserId: z.string().describe(
          "Select only targeting templates with this advertiser ID.",
        ).optional(),
        ids: z.string().describe(
          "Select only targeting templates with these IDs.",
        ).optional(),
        maxResults: z.number().describe("Maximum number of results to return.")
          .optional(),
        searchString: z.string().describe(
          'Allows searching for objects by name or ID. Wildcards (*) are allowed. For example, "template*2015" will return objects with names like "template June 2015", "template April 2015", or simply "template 2015". Most of the searches also add wildcards implicitly at the start and the end of the search string. For example, a search string of "template" will match objects with name "my template", "template 2015", or simply "template".',
        ).optional(),
        sortField: z.string().describe("Field by which to sort the list.")
          .optional(),
        sortOrder: z.string().describe("Order of sorted results.").optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        }
        if (args["advertiserId"] !== undefined) {
          params["advertiserId"] = String(args["advertiserId"]);
        }
        if (args["ids"] !== undefined) params["ids"] = String(args["ids"]);
        if (args["maxResults"] !== undefined) {
          params["maxResults"] = String(args["maxResults"]);
        }
        if (args["searchString"] !== undefined) {
          params["searchString"] = String(args["searchString"]);
        }
        if (args["sortField"] !== undefined) {
          params["sortField"] = String(args["sortField"]);
        }
        if (args["sortOrder"] !== undefined) {
          params["sortOrder"] = String(args["sortOrder"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "targetingTemplates",
          (args.maxPages as number | undefined) ?? 10,
          credentials,
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i] as StateData;
          const instanceName = (item.id?.toString() ?? String(i)).replace(
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
