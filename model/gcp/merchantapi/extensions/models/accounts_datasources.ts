// Auto-generated extension model for @swamp/gcp/merchantapi/accounts-datasources
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Merchant Accounts.DataSources.
 *
 * The [data source](/merchant/api/guides/data-sources/overview) for the Merchant Center account.
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
  return `${parent}/dataSources/${shortName}`;
}

const BASE_URL = "https://merchantapi.googleapis.com/";

const GET_CONFIG = {
  "id": "merchantapi.accounts.dataSources.get",
  "path": "datasources/v1/{+name}",
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
  "id": "merchantapi.accounts.dataSources.create",
  "path": "datasources/v1/{+parent}/dataSources",
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
  "id": "merchantapi.accounts.dataSources.patch",
  "path": "datasources/v1/{+name}",
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
  "id": "merchantapi.accounts.dataSources.delete",
  "path": "datasources/v1/{+name}",
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
  "id": "merchantapi.accounts.dataSources.list",
  "path": "datasources/v1/{+parent}/dataSources",
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
  },
} as const;

const GlobalArgsSchema = z.object({
  displayName: z.string().describe(
    "Required. The displayed data source name in the Merchant Center UI.",
  ).optional(),
  fileInput: z.object({
    fetchSettings: z.object({
      dayOfMonth: z.number().int().describe(
        "Optional. The day of the month when the data source file should be fetched (1-31). This field can only be set for monthly frequency.",
      ).optional(),
      dayOfWeek: z.enum([
        "DAY_OF_WEEK_UNSPECIFIED",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY",
      ]).describe(
        "Optional. The day of the week when the data source file should be fetched. This field can only be set for weekly frequency.",
      ).optional(),
      enabled: z.boolean().describe(
        "Optional. Enables or pauses the fetch schedule.",
      ).optional(),
      fetchUri: z.string().describe(
        "Optional. The URL where the data source file can be fetched. Google Merchant Center supports automatic scheduled uploads using the HTTP, HTTPS or SFTP protocols, so the value will need to be a valid link using one of those three protocols. Immutable for Google Sheets files.",
      ).optional(),
      frequency: z.enum([
        "FREQUENCY_UNSPECIFIED",
        "FREQUENCY_DAILY",
        "FREQUENCY_WEEKLY",
        "FREQUENCY_MONTHLY",
      ]).describe("Required. The frequency describing fetch schedule.")
        .optional(),
      password: z.string().describe(
        "Optional. An optional password for fetch_uri. Used for [submitting data sources through SFTP](https://support.google.com/merchants/answer/13813117).",
      ).optional(),
      timeOfDay: z.object({
        hours: z.number().int().describe(
          'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
        ).optional(),
        minutes: z.number().int().describe(
          "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
        ).optional(),
        nanos: z.number().int().describe(
          "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
        ).optional(),
        seconds: z.number().int().describe(
          "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
        ).optional(),
      }).describe(
        "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
      ).optional(),
      timeZone: z.string().describe(
        'Optional. [Time zone](https://cldr.unicode.org) used for schedule. UTC by default. For example, "America/Los_Angeles".',
      ).optional(),
      username: z.string().describe(
        "Optional. An optional user name for fetch_uri. Used for [submitting data sources through SFTP](https://support.google.com/merchants/answer/13813117).",
      ).optional(),
    }).describe("Fetch details to deliver the data source.").optional(),
    fileInputType: z.enum([
      "FILE_INPUT_TYPE_UNSPECIFIED",
      "UPLOAD",
      "FETCH",
      "GOOGLE_SHEETS",
    ]).describe("Output only. The type of file input.").optional(),
    fileName: z.string().describe(
      "Optional. The file name of the data source. Required for `UPLOAD` file input type.",
    ).optional(),
  }).describe(
    "The data specific for file data sources. This field is empty for other data source inputs.",
  ).optional(),
  localInventoryDataSource: z.object({
    contentLanguage: z.string().describe(
      "Required. Immutable. The two-letter ISO 639-1 language of the items to which the local inventory is provided.",
    ).optional(),
    feedLabel: z.string().describe(
      "Required. Immutable. The feed label of the offers to which the local inventory is provided. Must be less than or equal to 20 uppercase letters (A-Z), numbers (0-9), and dashes (-).",
    ).optional(),
  }).describe(
    "The local inventory data source type is only available for file inputs and can't be used to create API local inventory data sources.",
  ).optional(),
  merchantReviewDataSource: z.object({}).describe(
    "The merchant review data source.",
  ).optional(),
  name: z.string().describe(
    "Required. Identifier. The name of the data source. Format: `accounts/{account}/dataSources/{datasource}`",
  ).optional(),
  primaryProductDataSource: z.object({
    contentLanguage: z.string().describe(
      "Optional. Immutable. The two-letter ISO 639-1 language of the items in the data source. `feedLabel` and `contentLanguage` must be either both set or unset. The fields can only be unset for data sources without file input. If set, the data source will only accept products matching this combination. If unset, the data source will accept products without that restriction.",
    ).optional(),
    countries: z.array(z.string()).describe(
      "Optional. The countries where the items may be displayed. Represented as a [CLDR territory code](https://github.com/unicode-org/cldr/blob/latest/common/main/en.xml).",
    ).optional(),
    defaultRule: z.object({
      takeFromDataSources: z.array(z.object({
        primaryDataSourceName: z.string().describe(
          "Optional. The name of the primary data source. Format: `accounts/{account}/dataSources/{datasource}`",
        ).optional(),
        self: z.boolean().describe(
          "Self should be used to reference the primary data source itself.",
        ).optional(),
        supplementalDataSourceName: z.string().describe(
          "Optional. The name of the supplemental data source. Format: `accounts/{account}/dataSources/{datasource}`",
        ).optional(),
      })).describe(
        "Required. The list of data sources linked in the [default rule](https://support.google.com/merchants/answer/7450276). This list is ordered by the default rule priority of joining the data. It might include none or multiple references to `self` and supplemental data sources. The list must not be empty. To link the data source to the default rule, you need to add a new reference to this list (in sequential order). To unlink the data source from the default rule, you need to remove the given reference from this list. Changing the order of this list will result in changing the priority of data sources in the default rule. For example, providing the following list: [`1001`, `self`] will take attribute values from supplemental data source `1001`, and fallback to `self` if the attribute is not set in `1001`.",
      ).optional(),
    }).describe("Default rule management of the data source.").optional(),
    destinations: z.array(z.object({
      destination: z.enum([
        "DESTINATION_ENUM_UNSPECIFIED",
        "SHOPPING_ADS",
        "DISPLAY_ADS",
        "LOCAL_INVENTORY_ADS",
        "FREE_LISTINGS",
        "FREE_LOCAL_LISTINGS",
        "YOUTUBE_SHOPPING",
        "YOUTUBE_SHOPPING_CHECKOUT",
        "YOUTUBE_AFFILIATE",
        "FREE_VEHICLE_LISTINGS",
        "VEHICLE_ADS",
        "CLOUD_RETAIL",
        "LOCAL_CLOUD_RETAIL",
      ]).describe(
        "[Marketing methods](https://support.google.com/merchants/answer/15130232) (also known as destination) selections.",
      ).optional(),
      state: z.enum(["STATE_UNSPECIFIED", "ENABLED", "DISABLED"]).describe(
        "The state of the destination.",
      ).optional(),
    })).describe(
      "Optional. A list of destinations describing where products of the data source can be shown. When retrieving the data source, the list contains all the destinations that can be used for the data source, including the ones that are disabled for the data source but enabled for the account. Only destinations that are enabled on the account, for example through program participation, can be enabled on the data source. If unset, during creation, the destinations will be inherited based on the account level program participation. If set, during creation or update, the data source will be set only for the specified destinations. Updating this field requires at least one destination.",
    ).optional(),
    feedLabel: z.string().describe(
      "Optional. Immutable. The feed label that is specified on the data source level. Must be less than or equal to 20 uppercase letters (A-Z), numbers (0-9), and dashes (-). For more information about feed label, see [Create a primary data source for products](https://developers.google.com/merchant/api/guides/data-sources/api-sources#create-primary-data-source). `feedLabel` and `contentLanguage` must be either both set or unset for data sources with product content type. They must be set for data sources with a file input. If set, the data source will only accept products matching this combination. If unset, the data source will accept products without that restriction.",
    ).optional(),
    legacyLocal: z.boolean().describe(
      "Optional. Immutable. Determines whether the products of this data source are **only** targeting local destinations. Legacy local products are prefixed with `local~` in the product resource ID. For example, `accounts/123/products/local~en~US~sku123`.",
    ).optional(),
  }).describe("The primary data source for local and online products.")
    .optional(),
  productReviewDataSource: z.object({}).describe(
    "The product review data source.",
  ).optional(),
  promotionDataSource: z.object({
    contentLanguage: z.string().describe(
      "Required. Immutable. The two-letter ISO 639-1 language of the items in the data source.",
    ).optional(),
    targetCountry: z.string().describe(
      "Required. Immutable. The target country used as part of the unique identifier. Represented as a [CLDR territory code](https://github.com/unicode-org/cldr/blob/latest/common/main/en.xml). Promotions are only available in selected [countries](https://support.google.com/merchants/answer/4588460).",
    ).optional(),
  }).describe("The promotion data source.").optional(),
  regionalInventoryDataSource: z.object({
    contentLanguage: z.string().describe(
      "Required. Immutable. The two-letter ISO 639-1 language of the items to which the regional inventory is provided.",
    ).optional(),
    feedLabel: z.string().describe(
      "Required. Immutable. The feed label of the offers to which the regional inventory is provided. Must be less than or equal to 20 uppercase letters (A-Z), numbers (0-9), and dashes (-).",
    ).optional(),
  }).optional(),
  supplementalProductDataSource: z.object({
    contentLanguage: z.string().describe(
      "Optional. Immutable. The two-letter ISO 639-1 language of the items in the data source. `feedLabel` and `contentLanguage` must be either both set or unset. The fields can only be unset for data sources without file input. If set, the data source will only accept products matching this combination. If unset, the data source will accept produts without that restriction.",
    ).optional(),
    feedLabel: z.string().describe(
      "Optional. Immutable. The feed label that is specified on the data source level. Must be less than or equal to 20 uppercase letters (A-Z), numbers (0-9), and dashes (-). `feedLabel` and `contentLanguage` must be either both set or unset for data sources with product content type. They must be set for data sources with a file input. The fields must be unset for data sources without file input. If set, the data source will only accept products matching this combination. If unset, the data source will accept produts without that restriction.",
    ).optional(),
    referencingPrimaryDataSources: z.array(z.object({
      primaryDataSourceName: z.string().describe(
        "Optional. The name of the primary data source. Format: `accounts/{account}/dataSources/{datasource}`",
      ).optional(),
      self: z.boolean().describe(
        "Self should be used to reference the primary data source itself.",
      ).optional(),
      supplementalDataSourceName: z.string().describe(
        "Optional. The name of the supplemental data source. Format: `accounts/{account}/dataSources/{datasource}`",
      ).optional(),
    })).describe(
      "Output only. The (unordered and deduplicated) list of all primary data sources linked to this data source in either default or custom rules. Supplemental data source cannot be deleted before all links are removed.",
    ).optional(),
  }).describe(
    "The [supplemental data source](https://developers.google.com/merchant/api/guides/data-sources/api-sources#link-supplemental-data-source) for local and online products. After creation,you should make sure to link the supplemental product data source into one or more primary product data sources.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  dataSourceId: z.string().optional(),
  displayName: z.string().optional(),
  fileInput: z.object({
    fetchSettings: z.object({
      dayOfMonth: z.number(),
      dayOfWeek: z.string(),
      enabled: z.boolean(),
      fetchUri: z.string(),
      frequency: z.string(),
      password: z.string(),
      timeOfDay: z.object({
        hours: z.number(),
        minutes: z.number(),
        nanos: z.number(),
        seconds: z.number(),
      }),
      timeZone: z.string(),
      username: z.string(),
    }),
    fileInputType: z.string(),
    fileName: z.string(),
  }).optional(),
  input: z.string().optional(),
  localInventoryDataSource: z.object({
    contentLanguage: z.string(),
    feedLabel: z.string(),
  }).optional(),
  merchantReviewDataSource: z.object({}).optional(),
  name: z.string(),
  primaryProductDataSource: z.object({
    contentLanguage: z.string(),
    countries: z.array(z.string()),
    defaultRule: z.object({
      takeFromDataSources: z.array(z.object({
        primaryDataSourceName: z.string(),
        self: z.boolean(),
        supplementalDataSourceName: z.string(),
      })),
    }),
    destinations: z.array(z.object({
      destination: z.string(),
      state: z.string(),
    })),
    feedLabel: z.string(),
    legacyLocal: z.boolean(),
  }).optional(),
  productReviewDataSource: z.object({}).optional(),
  promotionDataSource: z.object({
    contentLanguage: z.string(),
    targetCountry: z.string(),
  }).optional(),
  regionalInventoryDataSource: z.object({
    contentLanguage: z.string(),
    feedLabel: z.string(),
  }).optional(),
  supplementalProductDataSource: z.object({
    contentLanguage: z.string(),
    feedLabel: z.string(),
    referencingPrimaryDataSources: z.array(z.object({
      primaryDataSourceName: z.string(),
      self: z.boolean(),
      supplementalDataSourceName: z.string(),
    })),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  displayName: z.string().describe(
    "Required. The displayed data source name in the Merchant Center UI.",
  ).optional(),
  fileInput: z.object({
    fetchSettings: z.object({
      dayOfMonth: z.number().int().describe(
        "Optional. The day of the month when the data source file should be fetched (1-31). This field can only be set for monthly frequency.",
      ).optional(),
      dayOfWeek: z.enum([
        "DAY_OF_WEEK_UNSPECIFIED",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY",
      ]).describe(
        "Optional. The day of the week when the data source file should be fetched. This field can only be set for weekly frequency.",
      ).optional(),
      enabled: z.boolean().describe(
        "Optional. Enables or pauses the fetch schedule.",
      ).optional(),
      fetchUri: z.string().describe(
        "Optional. The URL where the data source file can be fetched. Google Merchant Center supports automatic scheduled uploads using the HTTP, HTTPS or SFTP protocols, so the value will need to be a valid link using one of those three protocols. Immutable for Google Sheets files.",
      ).optional(),
      frequency: z.enum([
        "FREQUENCY_UNSPECIFIED",
        "FREQUENCY_DAILY",
        "FREQUENCY_WEEKLY",
        "FREQUENCY_MONTHLY",
      ]).describe("Required. The frequency describing fetch schedule.")
        .optional(),
      password: z.string().describe(
        "Optional. An optional password for fetch_uri. Used for [submitting data sources through SFTP](https://support.google.com/merchants/answer/13813117).",
      ).optional(),
      timeOfDay: z.object({
        hours: z.number().int().describe(
          'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
        ).optional(),
        minutes: z.number().int().describe(
          "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
        ).optional(),
        nanos: z.number().int().describe(
          "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
        ).optional(),
        seconds: z.number().int().describe(
          "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
        ).optional(),
      }).describe(
        "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
      ).optional(),
      timeZone: z.string().describe(
        'Optional. [Time zone](https://cldr.unicode.org) used for schedule. UTC by default. For example, "America/Los_Angeles".',
      ).optional(),
      username: z.string().describe(
        "Optional. An optional user name for fetch_uri. Used for [submitting data sources through SFTP](https://support.google.com/merchants/answer/13813117).",
      ).optional(),
    }).describe("Fetch details to deliver the data source.").optional(),
    fileInputType: z.enum([
      "FILE_INPUT_TYPE_UNSPECIFIED",
      "UPLOAD",
      "FETCH",
      "GOOGLE_SHEETS",
    ]).describe("Output only. The type of file input.").optional(),
    fileName: z.string().describe(
      "Optional. The file name of the data source. Required for `UPLOAD` file input type.",
    ).optional(),
  }).describe(
    "The data specific for file data sources. This field is empty for other data source inputs.",
  ).optional(),
  localInventoryDataSource: z.object({
    contentLanguage: z.string().describe(
      "Required. Immutable. The two-letter ISO 639-1 language of the items to which the local inventory is provided.",
    ).optional(),
    feedLabel: z.string().describe(
      "Required. Immutable. The feed label of the offers to which the local inventory is provided. Must be less than or equal to 20 uppercase letters (A-Z), numbers (0-9), and dashes (-).",
    ).optional(),
  }).describe(
    "The local inventory data source type is only available for file inputs and can't be used to create API local inventory data sources.",
  ).optional(),
  merchantReviewDataSource: z.object({}).describe(
    "The merchant review data source.",
  ).optional(),
  name: z.string().describe(
    "Required. Identifier. The name of the data source. Format: `accounts/{account}/dataSources/{datasource}`",
  ).optional(),
  primaryProductDataSource: z.object({
    contentLanguage: z.string().describe(
      "Optional. Immutable. The two-letter ISO 639-1 language of the items in the data source. `feedLabel` and `contentLanguage` must be either both set or unset. The fields can only be unset for data sources without file input. If set, the data source will only accept products matching this combination. If unset, the data source will accept products without that restriction.",
    ).optional(),
    countries: z.array(z.string()).describe(
      "Optional. The countries where the items may be displayed. Represented as a [CLDR territory code](https://github.com/unicode-org/cldr/blob/latest/common/main/en.xml).",
    ).optional(),
    defaultRule: z.object({
      takeFromDataSources: z.array(z.object({
        primaryDataSourceName: z.string().describe(
          "Optional. The name of the primary data source. Format: `accounts/{account}/dataSources/{datasource}`",
        ).optional(),
        self: z.boolean().describe(
          "Self should be used to reference the primary data source itself.",
        ).optional(),
        supplementalDataSourceName: z.string().describe(
          "Optional. The name of the supplemental data source. Format: `accounts/{account}/dataSources/{datasource}`",
        ).optional(),
      })).describe(
        "Required. The list of data sources linked in the [default rule](https://support.google.com/merchants/answer/7450276). This list is ordered by the default rule priority of joining the data. It might include none or multiple references to `self` and supplemental data sources. The list must not be empty. To link the data source to the default rule, you need to add a new reference to this list (in sequential order). To unlink the data source from the default rule, you need to remove the given reference from this list. Changing the order of this list will result in changing the priority of data sources in the default rule. For example, providing the following list: [`1001`, `self`] will take attribute values from supplemental data source `1001`, and fallback to `self` if the attribute is not set in `1001`.",
      ).optional(),
    }).describe("Default rule management of the data source.").optional(),
    destinations: z.array(z.object({
      destination: z.enum([
        "DESTINATION_ENUM_UNSPECIFIED",
        "SHOPPING_ADS",
        "DISPLAY_ADS",
        "LOCAL_INVENTORY_ADS",
        "FREE_LISTINGS",
        "FREE_LOCAL_LISTINGS",
        "YOUTUBE_SHOPPING",
        "YOUTUBE_SHOPPING_CHECKOUT",
        "YOUTUBE_AFFILIATE",
        "FREE_VEHICLE_LISTINGS",
        "VEHICLE_ADS",
        "CLOUD_RETAIL",
        "LOCAL_CLOUD_RETAIL",
      ]).describe(
        "[Marketing methods](https://support.google.com/merchants/answer/15130232) (also known as destination) selections.",
      ).optional(),
      state: z.enum(["STATE_UNSPECIFIED", "ENABLED", "DISABLED"]).describe(
        "The state of the destination.",
      ).optional(),
    })).describe(
      "Optional. A list of destinations describing where products of the data source can be shown. When retrieving the data source, the list contains all the destinations that can be used for the data source, including the ones that are disabled for the data source but enabled for the account. Only destinations that are enabled on the account, for example through program participation, can be enabled on the data source. If unset, during creation, the destinations will be inherited based on the account level program participation. If set, during creation or update, the data source will be set only for the specified destinations. Updating this field requires at least one destination.",
    ).optional(),
    feedLabel: z.string().describe(
      "Optional. Immutable. The feed label that is specified on the data source level. Must be less than or equal to 20 uppercase letters (A-Z), numbers (0-9), and dashes (-). For more information about feed label, see [Create a primary data source for products](https://developers.google.com/merchant/api/guides/data-sources/api-sources#create-primary-data-source). `feedLabel` and `contentLanguage` must be either both set or unset for data sources with product content type. They must be set for data sources with a file input. If set, the data source will only accept products matching this combination. If unset, the data source will accept products without that restriction.",
    ).optional(),
    legacyLocal: z.boolean().describe(
      "Optional. Immutable. Determines whether the products of this data source are **only** targeting local destinations. Legacy local products are prefixed with `local~` in the product resource ID. For example, `accounts/123/products/local~en~US~sku123`.",
    ).optional(),
  }).describe("The primary data source for local and online products.")
    .optional(),
  productReviewDataSource: z.object({}).describe(
    "The product review data source.",
  ).optional(),
  promotionDataSource: z.object({
    contentLanguage: z.string().describe(
      "Required. Immutable. The two-letter ISO 639-1 language of the items in the data source.",
    ).optional(),
    targetCountry: z.string().describe(
      "Required. Immutable. The target country used as part of the unique identifier. Represented as a [CLDR territory code](https://github.com/unicode-org/cldr/blob/latest/common/main/en.xml). Promotions are only available in selected [countries](https://support.google.com/merchants/answer/4588460).",
    ).optional(),
  }).describe("The promotion data source.").optional(),
  regionalInventoryDataSource: z.object({
    contentLanguage: z.string().describe(
      "Required. Immutable. The two-letter ISO 639-1 language of the items to which the regional inventory is provided.",
    ).optional(),
    feedLabel: z.string().describe(
      "Required. Immutable. The feed label of the offers to which the regional inventory is provided. Must be less than or equal to 20 uppercase letters (A-Z), numbers (0-9), and dashes (-).",
    ).optional(),
  }).optional(),
  supplementalProductDataSource: z.object({
    contentLanguage: z.string().describe(
      "Optional. Immutable. The two-letter ISO 639-1 language of the items in the data source. `feedLabel` and `contentLanguage` must be either both set or unset. The fields can only be unset for data sources without file input. If set, the data source will only accept products matching this combination. If unset, the data source will accept produts without that restriction.",
    ).optional(),
    feedLabel: z.string().describe(
      "Optional. Immutable. The feed label that is specified on the data source level. Must be less than or equal to 20 uppercase letters (A-Z), numbers (0-9), and dashes (-). `feedLabel` and `contentLanguage` must be either both set or unset for data sources with product content type. They must be set for data sources with a file input. The fields must be unset for data sources without file input. If set, the data source will only accept products matching this combination. If unset, the data source will accept produts without that restriction.",
    ).optional(),
    referencingPrimaryDataSources: z.array(z.object({
      primaryDataSourceName: z.string().describe(
        "Optional. The name of the primary data source. Format: `accounts/{account}/dataSources/{datasource}`",
      ).optional(),
      self: z.boolean().describe(
        "Self should be used to reference the primary data source itself.",
      ).optional(),
      supplementalDataSourceName: z.string().describe(
        "Optional. The name of the supplemental data source. Format: `accounts/{account}/dataSources/{datasource}`",
      ).optional(),
    })).describe(
      "Output only. The (unordered and deduplicated) list of all primary data sources linked to this data source in either default or custom rules. Supplemental data source cannot be deleted before all links are removed.",
    ).optional(),
  }).describe(
    "The [supplemental data source](https://developers.google.com/merchant/api/guides/data-sources/api-sources#link-supplemental-data-source) for local and online products. After creation,you should make sure to link the supplemental product data source into one or more primary product data sources.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Merchant Accounts.DataSources. Registered at `@swamp/gcp/merchantapi/accounts-datasources`. */
export const model = {
  type: "@swamp/gcp/merchantapi/accounts-datasources",
  version: "2026.06.05.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "The [data source](/merchant/api/guides/data-sources/overview) for the Merchan...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a dataSources",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["fileInput"] !== undefined) body["fileInput"] = g["fileInput"];
        if (g["localInventoryDataSource"] !== undefined) {
          body["localInventoryDataSource"] = g["localInventoryDataSource"];
        }
        if (g["merchantReviewDataSource"] !== undefined) {
          body["merchantReviewDataSource"] = g["merchantReviewDataSource"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["primaryProductDataSource"] !== undefined) {
          body["primaryProductDataSource"] = g["primaryProductDataSource"];
        }
        if (g["productReviewDataSource"] !== undefined) {
          body["productReviewDataSource"] = g["productReviewDataSource"];
        }
        if (g["promotionDataSource"] !== undefined) {
          body["promotionDataSource"] = g["promotionDataSource"];
        }
        if (g["regionalInventoryDataSource"] !== undefined) {
          body["regionalInventoryDataSource"] =
            g["regionalInventoryDataSource"];
        }
        if (g["supplementalProductDataSource"] !== undefined) {
          body["supplementalProductDataSource"] =
            g["supplementalProductDataSource"];
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
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
            },
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
          },
        ) as StateData;
        const instanceName = ((result.name ?? g.name)?.toString() ?? "current")
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
      description: "Get a dataSources",
      arguments: z.object({
        identifier: z.string().describe("The name of the dataSources"),
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
        const instanceName =
          ((result.name ?? g.name)?.toString() ?? args.identifier).replace(
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
      description: "Update dataSources attributes",
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
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["fileInput"] !== undefined) body["fileInput"] = g["fileInput"];
        if (g["localInventoryDataSource"] !== undefined) {
          body["localInventoryDataSource"] = g["localInventoryDataSource"];
        }
        if (g["merchantReviewDataSource"] !== undefined) {
          body["merchantReviewDataSource"] = g["merchantReviewDataSource"];
        }
        if (g["primaryProductDataSource"] !== undefined) {
          body["primaryProductDataSource"] = g["primaryProductDataSource"];
        }
        if (g["productReviewDataSource"] !== undefined) {
          body["productReviewDataSource"] = g["productReviewDataSource"];
        }
        if (g["promotionDataSource"] !== undefined) {
          body["promotionDataSource"] = g["promotionDataSource"];
        }
        if (g["regionalInventoryDataSource"] !== undefined) {
          body["regionalInventoryDataSource"] =
            g["regionalInventoryDataSource"];
        }
        if (g["supplementalProductDataSource"] !== undefined) {
          body["supplementalProductDataSource"] =
            g["supplementalProductDataSource"];
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
      description: "Delete the dataSources",
      arguments: z.object({
        identifier: z.string().describe("The name of the dataSources"),
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
      description: "Sync dataSources state from GCP",
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
      description: "List dataSources resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "Optional. The maximum number of data sources to return. The service may return fewer than this value. The maximum value is 1000; values above 1000 will be coerced to 1000. If unspecified, the maximum number of data sources will be returned.",
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
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "dataSources",
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
    fetch: {
      description: "fetch",
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
            "id": "merchantapi.accounts.dataSources.fetch",
            "path": "datasources/v1/{+name}:fetch",
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
