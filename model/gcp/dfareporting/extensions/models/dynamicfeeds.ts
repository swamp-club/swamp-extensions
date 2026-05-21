// Auto-generated extension model for @swamp/gcp/dfareporting/dynamicfeeds
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Campaign Manager 360 DynamicFeeds.
 *
 * *Beta:* This API resource is available only to a very limited number of customers. If you'd like to use this resource, please reach out to your Google sales representative. Contains dynamic feed information.
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
  "id": "dfareporting.dynamicFeeds.get",
  "path": "studio/dynamicFeeds/{+dynamicFeedId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "dynamicFeedId",
  ],
  "parameters": {
    "dynamicFeedId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "dfareporting.dynamicFeeds.insert",
  "path": "studio/dynamicFeeds",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {},
} as const;

const UPDATE_CONFIG = {
  "id": "dfareporting.dynamicFeeds.update",
  "path": "studio/dynamicFeeds",
  "httpMethod": "PUT",
  "parameterOrder": [],
  "parameters": {},
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  dynamicFeed: z.object({
    contentSource: z.object({
      contentSourceName: z.string().describe(
        "Optional. The name of the content source. It is defaulted to content source file name if not provided.",
      ).optional(),
      createInfo: z.object({
        time: z.string().describe(
          "Timestamp of the last change in milliseconds since epoch.",
        ).optional(),
      }).describe("Modification timestamp.").optional(),
      lastModifiedInfo: z.object({
        time: z.string().describe(
          "Timestamp of the last change in milliseconds since epoch.",
        ).optional(),
      }).describe("Modification timestamp.").optional(),
      metaData: z.object({
        charset: z.string().describe(
          "Output only. The charset of the content source.",
        ).optional(),
        fieldNames: z.array(z.string()).describe(
          "Output only. The list of column names in the content source.",
        ).optional(),
        rowNumber: z.number().int().describe(
          "Output only. The number of rows in the content source.",
        ).optional(),
        separator: z.string().describe(
          "Output only. The separator of the content source.",
        ).optional(),
      }).describe(
        "Contains the meta data of the content source. This is a read-only field.",
      ).optional(),
      resourceLink: z.string().describe(
        "Required. The link to the file of the content source.",
      ).optional(),
      resourceType: z.enum([
        "RESOURCE_TYPE_UNSPECIFIED",
        "RESOURCE_TYPE_GOOGLE_SPREADSHEET",
        "RESOURCE_TYPE_REMOTE_FILE",
      ]).describe("Required. The resource type of the content source.")
        .optional(),
    }).describe("Contains the content source of the dynamic feed.").optional(),
    createInfo: z.object({
      time: z.string().describe(
        "Timestamp of the last change in milliseconds since epoch.",
      ).optional(),
    }).describe("Modification timestamp.").optional(),
    dynamicFeedId: z.string().describe(
      "Output only. Unique ID of this dynamic feed. This is a read-only, auto-generated field.",
    ).optional(),
    dynamicFeedName: z.string().describe(
      "Optional. Name of this dynamic feed. It is defaulted to content source file name if not provided.",
    ).optional(),
    element: z.object({
      activeFieldId: z.number().int().describe(
        "Optional. The field ID to specify the active field in the feed.",
      ).optional(),
      createInfo: z.object({
        time: z.string().describe(
          "Timestamp of the last change in milliseconds since epoch.",
        ).optional(),
      }).describe("Modification timestamp.").optional(),
      defaultFieldId: z.number().int().describe(
        "Optional. The field ID to specify the field that represents the default field in the feed.",
      ).optional(),
      elementName: z.string().describe(
        "Optional. The name of the element. It is defaulted to resource file name if not provided.",
      ).optional(),
      endTimestampFieldId: z.number().int().describe(
        "Optional. The field ID to specify the field that represents the end timestamp. Only applicable if you're planning to use scheduling in your dynamic creative.",
      ).optional(),
      externalIdFieldId: z.number().int().describe(
        "Required. The field ID to specify the field used for uniquely identifying the feed row. This is a required field.",
      ).optional(),
      feedFields: z.array(z.object({
        defaultValue: z.string().describe(
          "Optional. The default value of the field.",
        ).optional(),
        filterable: z.boolean().describe(
          "Optional. Whether the field is filterable. Could be set as true when the field type is any of the following and is not renderable: - STRING - BOOL - COUNTRY_CODE_ISO - CM360_SITE_ID - CM360_KEYWORD - CM360_CREATIVE_ID - CM360_PLACEMENT_ID - CM360_AD_ID - CM360_ADVERTISER_ID - CM360_CAMPAIGN_ID - CITY - REGION - POSTAL_CODE - METRO - CUSTOM_VALUE - REMARKETING_VALUE - GEO_CANONICAL - STRING_LIST - CREATIVE_DIMENSION - USERLIST_ID - CM360_DYNAMIC_TARGETING_KEY - DV360_LINE_ITEM_ID",
        ).optional(),
        id: z.number().int().describe(
          "Required. The ID of the field. The ID is based on the column index starting from 0, and it should match the column index in the resource link.",
        ).optional(),
        name: z.string().describe("Required. The name of the field.")
          .optional(),
        renderable: z.boolean().describe(
          "Optional. Whether the field is able to display. Could be set as true when the field type is not in any of the following and the field is not filterable: - COUNTRY_CODE_ISO - CITY - REGION - POSTAL_CODE - METRO - GEO_CANONICAL - USERLIST_ID - CONTEXTUAL_KEYWORD - CM360_DYNAMIC_TARGETING_KEY - WEIGHT",
        ).optional(),
        required: z.boolean().describe(
          "Optional. Whether the field is required and should not be empty in the feed. Could be set as true when the field type is any of the following: - GPA_SERVED_IMAGE_URL - GPA_SERVED_ASSET_URL - ASSET_LIBRARY_HANDLE - ASSET_LIBRARY_VIDEO_HANDLE - ASSET_LIBRARY_DIRECTORY_HANDLE",
        ).optional(),
        type: z.enum([
          "TYPE_UNKNOWN",
          "STRING",
          "LONG",
          "GPA_SERVED_IMAGE_URL",
          "GPA_SERVED_ASSET_URL",
          "COUNTRY_CODE_ISO",
          "FLOAT",
          "CM360_KEYWORD",
          "CM360_SITE_ID",
          "BOOL",
          "EXIT_URL",
          "DATETIME",
          "CM360_CREATIVE_ID",
          "CM360_PLACEMENT_ID",
          "CM360_AD_ID",
          "CM360_ADVERTISER_ID",
          "CM360_CAMPAIGN_ID",
          "CITY",
          "REGION",
          "POSTAL_CODE",
          "METRO",
          "CUSTOM_VALUE",
          "REMARKETING_VALUE",
          "GEO_CANONICAL",
          "WEIGHT",
          "STRING_LIST",
          "CREATIVE_DIMENSION",
          "USERLIST_ID",
          "ASSET_LIBRARY_DIRECTORY_HANDLE",
          "ASSET_LIBRARY_VIDEO_HANDLE",
          "ASSET_LIBRARY_HANDLE",
          "THIRD_PARTY_SERVED_URL",
          "CM360_DYNAMIC_TARGETING_KEY",
          "DV360_LINE_ITEM_ID",
        ]).describe("Required. The type of the field.").optional(),
      })).describe(
        "Required. The list of fields of the element. The field order and name should match the meta data in the content source source.",
      ).optional(),
      isLocalTimestamp: z.boolean().describe(
        "Optional. Whether the start and end timestamp is local timestamp. The default value is false which means start and end timestamp is in UTC.",
      ).optional(),
      lastModifiedInfo: z.object({
        time: z.string().describe(
          "Timestamp of the last change in milliseconds since epoch.",
        ).optional(),
      }).describe("Modification timestamp.").optional(),
      proximityTargetingFieldId: z.number().int().describe(
        "Optional. The field ID that specify field used for proximity targeting.",
      ).optional(),
      reportingLabelFieldId: z.number().int().describe(
        "Required. The field ID to specify the field used for dynamic reporting in Campaign Manager 360.",
      ).optional(),
      startTimestampFieldId: z.number().int().describe(
        "Optional. The field ID to specify the field that represents the start timestamp. Only applicable if you're planning to use scheduling in your dynamic creative.",
      ).optional(),
    }).describe("Contains the element of the dynamic feed.").optional(),
    feedIngestionStatus: z.object({
      ingestionErrorRecords: z.array(z.object({
        errors: z.array(z.unknown()).describe(
          "Output only. The list of field errors of the ingestion error record.",
        ).optional(),
        recordId: z.string().describe(
          "Output only. The record ID of the ingestion error record.",
        ).optional(),
      })).describe("Output only. The ingestion error records of the feed.")
        .optional(),
      ingestionStatus: z.object({
        numActiveRows: z.string().describe(
          "Output only. The number of active rows in the feed.",
        ).optional(),
        numRowsProcessed: z.string().describe(
          "Output only. The number of rows processed in the feed.",
        ).optional(),
        numRowsTotal: z.string().describe(
          "Output only. The total number of rows in the feed.",
        ).optional(),
        numRowsWithErrors: z.string().describe(
          "Output only. The number of rows with errors in the feed.",
        ).optional(),
        numWarningsTotal: z.string().describe(
          "Output only. The total number of warnings in the feed.",
        ).optional(),
      }).describe("Contains the ingestion status of the dynamic feed.")
        .optional(),
      state: z.enum([
        "FEED_PROCESSING_STATE_UNKNOWN",
        "CANCELLED",
        "INGESTING_QUEUED",
        "INGESTING",
        "INGESTED_SUCCESS",
        "INGESTED_FAILURE",
        "REQUEST_TO_PUBLISH",
        "PUBLISHING",
        "PUBLISHED_SUCCESS",
        "PUBLISHED_FAILURE",
      ]).describe("Output only. The processing state of the feed.").optional(),
    }).describe(
      "Contains the ingestion status of the dynamic feed. Feed ingestion is an asynchronous process. If the feed create request is successful, feed ingestion will be processed in the background, including validation, assets retrieval, and saving the data from the resource link. The processing time is dependent on the data size in the resource link. This read-only status field contains the current stage of that processing and its ingestion state.",
    ).optional(),
    feedSchedule: z.object({
      repeatValue: z.string().describe(
        "Optional. The number of times the feed retransforms within one day. This is a required field if the schedule is enabled. Acceptable values are between 1 to 6, inclusive.",
      ).optional(),
      scheduleEnabled: z.boolean().describe(
        "Optional. Whether the schedule is enabled.",
      ).optional(),
      startHour: z.string().describe(
        "Optional. The hour of the day to start the feed. It is applicable if the repeat value is equal to 1. Default value is 0.",
      ).optional(),
      startMinute: z.string().describe(
        "Optional. The minute of the hour to start the feed. It is applicable if the repeat value is equal to 1. Default value is 0.",
      ).optional(),
      timeZone: z.string().describe(
        'Optional. The time zone to schedule the feed. It is applicable if the repeat value is equal to 1. Default value is "America/Los_Angeles".',
      ).optional(),
    }).describe("Contains the schedule of the dynamic feed.").optional(),
    hasPublished: z.boolean().describe(
      "Output only. Indicates whether the dynamic feed has a published version. This is a read-only field.",
    ).optional(),
    lastModifiedInfo: z.object({
      time: z.string().describe(
        "Timestamp of the last change in milliseconds since epoch.",
      ).optional(),
    }).describe("Modification timestamp.").optional(),
    status: z.enum(["STATUS_UNKNOWN", "ACTIVE", "INACTIVE", "DELETED"])
      .describe(
        "Output only. The status of the feed. It is a read-only field that depends on the the feed ingestion status. The default value is INACTIVE, and it will be updated to ACTIVE once the feed is ingested successfully.",
      ).optional(),
    studioAdvertiserId: z.string().describe(
      "Required. Advertiser ID of this dynamic feed. This is a required field.",
    ).optional(),
  }).describe(
    "*Beta:* This API resource is available only to a very limited number of customers. If you'd like to use this resource, please reach out to your Google sales representative. Contains dynamic feed information.",
  ).optional(),
  dynamicProfileId: z.string().describe(
    "Required. Dynamic profile ID of the inserted dynamic feed.",
  ).optional(),
  contentSource: z.object({
    contentSourceName: z.string().describe(
      "Optional. The name of the content source. It is defaulted to content source file name if not provided.",
    ).optional(),
    createInfo: z.object({
      time: z.string().describe(
        "Timestamp of the last change in milliseconds since epoch.",
      ).optional(),
    }).describe("Modification timestamp.").optional(),
    lastModifiedInfo: z.object({
      time: z.string().describe(
        "Timestamp of the last change in milliseconds since epoch.",
      ).optional(),
    }).describe("Modification timestamp.").optional(),
    metaData: z.object({
      charset: z.string().describe(
        "Output only. The charset of the content source.",
      ).optional(),
      fieldNames: z.array(z.string()).describe(
        "Output only. The list of column names in the content source.",
      ).optional(),
      rowNumber: z.number().int().describe(
        "Output only. The number of rows in the content source.",
      ).optional(),
      separator: z.string().describe(
        "Output only. The separator of the content source.",
      ).optional(),
    }).describe(
      "Contains the meta data of the content source. This is a read-only field.",
    ).optional(),
    resourceLink: z.string().describe(
      "Required. The link to the file of the content source.",
    ).optional(),
    resourceType: z.enum([
      "RESOURCE_TYPE_UNSPECIFIED",
      "RESOURCE_TYPE_GOOGLE_SPREADSHEET",
      "RESOURCE_TYPE_REMOTE_FILE",
    ]).describe("Required. The resource type of the content source.")
      .optional(),
  }).describe("Contains the content source of the dynamic feed.").optional(),
  createInfo: z.object({
    time: z.string().describe(
      "Timestamp of the last change in milliseconds since epoch.",
    ).optional(),
  }).describe("Modification timestamp.").optional(),
  dynamicFeedId: z.string().describe(
    "Output only. Unique ID of this dynamic feed. This is a read-only, auto-generated field.",
  ).optional(),
  dynamicFeedName: z.string().describe(
    "Optional. Name of this dynamic feed. It is defaulted to content source file name if not provided.",
  ).optional(),
  element: z.object({
    activeFieldId: z.number().int().describe(
      "Optional. The field ID to specify the active field in the feed.",
    ).optional(),
    createInfo: z.object({
      time: z.string().describe(
        "Timestamp of the last change in milliseconds since epoch.",
      ).optional(),
    }).describe("Modification timestamp.").optional(),
    defaultFieldId: z.number().int().describe(
      "Optional. The field ID to specify the field that represents the default field in the feed.",
    ).optional(),
    elementName: z.string().describe(
      "Optional. The name of the element. It is defaulted to resource file name if not provided.",
    ).optional(),
    endTimestampFieldId: z.number().int().describe(
      "Optional. The field ID to specify the field that represents the end timestamp. Only applicable if you're planning to use scheduling in your dynamic creative.",
    ).optional(),
    externalIdFieldId: z.number().int().describe(
      "Required. The field ID to specify the field used for uniquely identifying the feed row. This is a required field.",
    ).optional(),
    feedFields: z.array(z.object({
      defaultValue: z.string().describe(
        "Optional. The default value of the field.",
      ).optional(),
      filterable: z.boolean().describe(
        "Optional. Whether the field is filterable. Could be set as true when the field type is any of the following and is not renderable: - STRING - BOOL - COUNTRY_CODE_ISO - CM360_SITE_ID - CM360_KEYWORD - CM360_CREATIVE_ID - CM360_PLACEMENT_ID - CM360_AD_ID - CM360_ADVERTISER_ID - CM360_CAMPAIGN_ID - CITY - REGION - POSTAL_CODE - METRO - CUSTOM_VALUE - REMARKETING_VALUE - GEO_CANONICAL - STRING_LIST - CREATIVE_DIMENSION - USERLIST_ID - CM360_DYNAMIC_TARGETING_KEY - DV360_LINE_ITEM_ID",
      ).optional(),
      id: z.number().int().describe(
        "Required. The ID of the field. The ID is based on the column index starting from 0, and it should match the column index in the resource link.",
      ).optional(),
      name: z.string().describe("Required. The name of the field.").optional(),
      renderable: z.boolean().describe(
        "Optional. Whether the field is able to display. Could be set as true when the field type is not in any of the following and the field is not filterable: - COUNTRY_CODE_ISO - CITY - REGION - POSTAL_CODE - METRO - GEO_CANONICAL - USERLIST_ID - CONTEXTUAL_KEYWORD - CM360_DYNAMIC_TARGETING_KEY - WEIGHT",
      ).optional(),
      required: z.boolean().describe(
        "Optional. Whether the field is required and should not be empty in the feed. Could be set as true when the field type is any of the following: - GPA_SERVED_IMAGE_URL - GPA_SERVED_ASSET_URL - ASSET_LIBRARY_HANDLE - ASSET_LIBRARY_VIDEO_HANDLE - ASSET_LIBRARY_DIRECTORY_HANDLE",
      ).optional(),
      type: z.enum([
        "TYPE_UNKNOWN",
        "STRING",
        "LONG",
        "GPA_SERVED_IMAGE_URL",
        "GPA_SERVED_ASSET_URL",
        "COUNTRY_CODE_ISO",
        "FLOAT",
        "CM360_KEYWORD",
        "CM360_SITE_ID",
        "BOOL",
        "EXIT_URL",
        "DATETIME",
        "CM360_CREATIVE_ID",
        "CM360_PLACEMENT_ID",
        "CM360_AD_ID",
        "CM360_ADVERTISER_ID",
        "CM360_CAMPAIGN_ID",
        "CITY",
        "REGION",
        "POSTAL_CODE",
        "METRO",
        "CUSTOM_VALUE",
        "REMARKETING_VALUE",
        "GEO_CANONICAL",
        "WEIGHT",
        "STRING_LIST",
        "CREATIVE_DIMENSION",
        "USERLIST_ID",
        "ASSET_LIBRARY_DIRECTORY_HANDLE",
        "ASSET_LIBRARY_VIDEO_HANDLE",
        "ASSET_LIBRARY_HANDLE",
        "THIRD_PARTY_SERVED_URL",
        "CM360_DYNAMIC_TARGETING_KEY",
        "DV360_LINE_ITEM_ID",
      ]).describe("Required. The type of the field.").optional(),
    })).describe(
      "Required. The list of fields of the element. The field order and name should match the meta data in the content source source.",
    ).optional(),
    isLocalTimestamp: z.boolean().describe(
      "Optional. Whether the start and end timestamp is local timestamp. The default value is false which means start and end timestamp is in UTC.",
    ).optional(),
    lastModifiedInfo: z.object({
      time: z.string().describe(
        "Timestamp of the last change in milliseconds since epoch.",
      ).optional(),
    }).describe("Modification timestamp.").optional(),
    proximityTargetingFieldId: z.number().int().describe(
      "Optional. The field ID that specify field used for proximity targeting.",
    ).optional(),
    reportingLabelFieldId: z.number().int().describe(
      "Required. The field ID to specify the field used for dynamic reporting in Campaign Manager 360.",
    ).optional(),
    startTimestampFieldId: z.number().int().describe(
      "Optional. The field ID to specify the field that represents the start timestamp. Only applicable if you're planning to use scheduling in your dynamic creative.",
    ).optional(),
  }).describe("Contains the element of the dynamic feed.").optional(),
  feedIngestionStatus: z.object({
    ingestionErrorRecords: z.array(z.object({
      errors: z.array(z.object({
        fieldId: z.unknown().describe("Output only. The ID of the field.")
          .optional(),
        fieldName: z.unknown().describe("Output only. The name of the field.")
          .optional(),
        fieldValues: z.unknown().describe(
          "Output only. The list of values of the field.",
        ).optional(),
        ingestionError: z.unknown().describe(
          "Output only. The ingestion error of the field.",
        ).optional(),
        isError: z.unknown().describe(
          "Output only. Incidcates whether the field has error or warning.",
        ).optional(),
      })).describe(
        "Output only. The list of field errors of the ingestion error record.",
      ).optional(),
      recordId: z.string().describe(
        "Output only. The record ID of the ingestion error record.",
      ).optional(),
    })).describe("Output only. The ingestion error records of the feed.")
      .optional(),
    ingestionStatus: z.object({
      numActiveRows: z.string().describe(
        "Output only. The number of active rows in the feed.",
      ).optional(),
      numRowsProcessed: z.string().describe(
        "Output only. The number of rows processed in the feed.",
      ).optional(),
      numRowsTotal: z.string().describe(
        "Output only. The total number of rows in the feed.",
      ).optional(),
      numRowsWithErrors: z.string().describe(
        "Output only. The number of rows with errors in the feed.",
      ).optional(),
      numWarningsTotal: z.string().describe(
        "Output only. The total number of warnings in the feed.",
      ).optional(),
    }).describe("Contains the ingestion status of the dynamic feed.")
      .optional(),
    state: z.enum([
      "FEED_PROCESSING_STATE_UNKNOWN",
      "CANCELLED",
      "INGESTING_QUEUED",
      "INGESTING",
      "INGESTED_SUCCESS",
      "INGESTED_FAILURE",
      "REQUEST_TO_PUBLISH",
      "PUBLISHING",
      "PUBLISHED_SUCCESS",
      "PUBLISHED_FAILURE",
    ]).describe("Output only. The processing state of the feed.").optional(),
  }).describe(
    "Contains the ingestion status of the dynamic feed. Feed ingestion is an asynchronous process. If the feed create request is successful, feed ingestion will be processed in the background, including validation, assets retrieval, and saving the data from the resource link. The processing time is dependent on the data size in the resource link. This read-only status field contains the current stage of that processing and its ingestion state.",
  ).optional(),
  feedSchedule: z.object({
    repeatValue: z.string().describe(
      "Optional. The number of times the feed retransforms within one day. This is a required field if the schedule is enabled. Acceptable values are between 1 to 6, inclusive.",
    ).optional(),
    scheduleEnabled: z.boolean().describe(
      "Optional. Whether the schedule is enabled.",
    ).optional(),
    startHour: z.string().describe(
      "Optional. The hour of the day to start the feed. It is applicable if the repeat value is equal to 1. Default value is 0.",
    ).optional(),
    startMinute: z.string().describe(
      "Optional. The minute of the hour to start the feed. It is applicable if the repeat value is equal to 1. Default value is 0.",
    ).optional(),
    timeZone: z.string().describe(
      'Optional. The time zone to schedule the feed. It is applicable if the repeat value is equal to 1. Default value is "America/Los_Angeles".',
    ).optional(),
  }).describe("Contains the schedule of the dynamic feed.").optional(),
  hasPublished: z.boolean().describe(
    "Output only. Indicates whether the dynamic feed has a published version. This is a read-only field.",
  ).optional(),
  lastModifiedInfo: z.object({
    time: z.string().describe(
      "Timestamp of the last change in milliseconds since epoch.",
    ).optional(),
  }).describe("Modification timestamp.").optional(),
  status: z.enum(["STATUS_UNKNOWN", "ACTIVE", "INACTIVE", "DELETED"]).describe(
    "Output only. The status of the feed. It is a read-only field that depends on the the feed ingestion status. The default value is INACTIVE, and it will be updated to ACTIVE once the feed is ingested successfully.",
  ).optional(),
  studioAdvertiserId: z.string().describe(
    "Required. Advertiser ID of this dynamic feed. This is a required field.",
  ).optional(),
});

const StateSchema = z.object({
  contentSource: z.object({
    contentSourceName: z.string(),
    createInfo: z.object({
      time: z.string(),
    }),
    lastModifiedInfo: z.object({
      time: z.string(),
    }),
    metaData: z.object({
      charset: z.string(),
      fieldNames: z.array(z.string()),
      rowNumber: z.number(),
      separator: z.string(),
    }),
    resourceLink: z.string(),
    resourceType: z.string(),
  }).optional(),
  createInfo: z.object({
    time: z.string(),
  }).optional(),
  dynamicFeedId: z.string().optional(),
  dynamicFeedName: z.string().optional(),
  element: z.object({
    activeFieldId: z.number(),
    createInfo: z.object({
      time: z.string(),
    }),
    defaultFieldId: z.number(),
    elementName: z.string(),
    endTimestampFieldId: z.number(),
    externalIdFieldId: z.number(),
    feedFields: z.array(z.object({
      defaultValue: z.string(),
      filterable: z.boolean(),
      id: z.number(),
      name: z.string(),
      renderable: z.boolean(),
      required: z.boolean(),
      type: z.string(),
    })),
    isLocalTimestamp: z.boolean(),
    lastModifiedInfo: z.object({
      time: z.string(),
    }),
    proximityTargetingFieldId: z.number(),
    reportingLabelFieldId: z.number(),
    startTimestampFieldId: z.number(),
  }).optional(),
  feedIngestionStatus: z.object({
    ingestionErrorRecords: z.array(z.object({
      errors: z.array(z.object({
        fieldId: z.unknown(),
        fieldName: z.unknown(),
        fieldValues: z.unknown(),
        ingestionError: z.unknown(),
        isError: z.unknown(),
      })),
      recordId: z.string(),
    })),
    ingestionStatus: z.object({
      numActiveRows: z.string(),
      numRowsProcessed: z.string(),
      numRowsTotal: z.string(),
      numRowsWithErrors: z.string(),
      numWarningsTotal: z.string(),
    }),
    state: z.string(),
  }).optional(),
  feedSchedule: z.object({
    repeatValue: z.string(),
    scheduleEnabled: z.boolean(),
    startHour: z.string(),
    startMinute: z.string(),
    timeZone: z.string(),
  }).optional(),
  hasPublished: z.boolean().optional(),
  lastModifiedInfo: z.object({
    time: z.string(),
  }).optional(),
  status: z.string().optional(),
  studioAdvertiserId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  dynamicFeed: z.object({
    contentSource: z.object({
      contentSourceName: z.string().describe(
        "Optional. The name of the content source. It is defaulted to content source file name if not provided.",
      ).optional(),
      createInfo: z.object({
        time: z.string().describe(
          "Timestamp of the last change in milliseconds since epoch.",
        ).optional(),
      }).describe("Modification timestamp.").optional(),
      lastModifiedInfo: z.object({
        time: z.string().describe(
          "Timestamp of the last change in milliseconds since epoch.",
        ).optional(),
      }).describe("Modification timestamp.").optional(),
      metaData: z.object({
        charset: z.string().describe(
          "Output only. The charset of the content source.",
        ).optional(),
        fieldNames: z.array(z.string()).describe(
          "Output only. The list of column names in the content source.",
        ).optional(),
        rowNumber: z.number().int().describe(
          "Output only. The number of rows in the content source.",
        ).optional(),
        separator: z.string().describe(
          "Output only. The separator of the content source.",
        ).optional(),
      }).describe(
        "Contains the meta data of the content source. This is a read-only field.",
      ).optional(),
      resourceLink: z.string().describe(
        "Required. The link to the file of the content source.",
      ).optional(),
      resourceType: z.enum([
        "RESOURCE_TYPE_UNSPECIFIED",
        "RESOURCE_TYPE_GOOGLE_SPREADSHEET",
        "RESOURCE_TYPE_REMOTE_FILE",
      ]).describe("Required. The resource type of the content source.")
        .optional(),
    }).describe("Contains the content source of the dynamic feed.").optional(),
    createInfo: z.object({
      time: z.string().describe(
        "Timestamp of the last change in milliseconds since epoch.",
      ).optional(),
    }).describe("Modification timestamp.").optional(),
    dynamicFeedId: z.string().describe(
      "Output only. Unique ID of this dynamic feed. This is a read-only, auto-generated field.",
    ).optional(),
    dynamicFeedName: z.string().describe(
      "Optional. Name of this dynamic feed. It is defaulted to content source file name if not provided.",
    ).optional(),
    element: z.object({
      activeFieldId: z.number().int().describe(
        "Optional. The field ID to specify the active field in the feed.",
      ).optional(),
      createInfo: z.object({
        time: z.string().describe(
          "Timestamp of the last change in milliseconds since epoch.",
        ).optional(),
      }).describe("Modification timestamp.").optional(),
      defaultFieldId: z.number().int().describe(
        "Optional. The field ID to specify the field that represents the default field in the feed.",
      ).optional(),
      elementName: z.string().describe(
        "Optional. The name of the element. It is defaulted to resource file name if not provided.",
      ).optional(),
      endTimestampFieldId: z.number().int().describe(
        "Optional. The field ID to specify the field that represents the end timestamp. Only applicable if you're planning to use scheduling in your dynamic creative.",
      ).optional(),
      externalIdFieldId: z.number().int().describe(
        "Required. The field ID to specify the field used for uniquely identifying the feed row. This is a required field.",
      ).optional(),
      feedFields: z.array(z.object({
        defaultValue: z.string().describe(
          "Optional. The default value of the field.",
        ).optional(),
        filterable: z.boolean().describe(
          "Optional. Whether the field is filterable. Could be set as true when the field type is any of the following and is not renderable: - STRING - BOOL - COUNTRY_CODE_ISO - CM360_SITE_ID - CM360_KEYWORD - CM360_CREATIVE_ID - CM360_PLACEMENT_ID - CM360_AD_ID - CM360_ADVERTISER_ID - CM360_CAMPAIGN_ID - CITY - REGION - POSTAL_CODE - METRO - CUSTOM_VALUE - REMARKETING_VALUE - GEO_CANONICAL - STRING_LIST - CREATIVE_DIMENSION - USERLIST_ID - CM360_DYNAMIC_TARGETING_KEY - DV360_LINE_ITEM_ID",
        ).optional(),
        id: z.number().int().describe(
          "Required. The ID of the field. The ID is based on the column index starting from 0, and it should match the column index in the resource link.",
        ).optional(),
        name: z.string().describe("Required. The name of the field.")
          .optional(),
        renderable: z.boolean().describe(
          "Optional. Whether the field is able to display. Could be set as true when the field type is not in any of the following and the field is not filterable: - COUNTRY_CODE_ISO - CITY - REGION - POSTAL_CODE - METRO - GEO_CANONICAL - USERLIST_ID - CONTEXTUAL_KEYWORD - CM360_DYNAMIC_TARGETING_KEY - WEIGHT",
        ).optional(),
        required: z.boolean().describe(
          "Optional. Whether the field is required and should not be empty in the feed. Could be set as true when the field type is any of the following: - GPA_SERVED_IMAGE_URL - GPA_SERVED_ASSET_URL - ASSET_LIBRARY_HANDLE - ASSET_LIBRARY_VIDEO_HANDLE - ASSET_LIBRARY_DIRECTORY_HANDLE",
        ).optional(),
        type: z.enum([
          "TYPE_UNKNOWN",
          "STRING",
          "LONG",
          "GPA_SERVED_IMAGE_URL",
          "GPA_SERVED_ASSET_URL",
          "COUNTRY_CODE_ISO",
          "FLOAT",
          "CM360_KEYWORD",
          "CM360_SITE_ID",
          "BOOL",
          "EXIT_URL",
          "DATETIME",
          "CM360_CREATIVE_ID",
          "CM360_PLACEMENT_ID",
          "CM360_AD_ID",
          "CM360_ADVERTISER_ID",
          "CM360_CAMPAIGN_ID",
          "CITY",
          "REGION",
          "POSTAL_CODE",
          "METRO",
          "CUSTOM_VALUE",
          "REMARKETING_VALUE",
          "GEO_CANONICAL",
          "WEIGHT",
          "STRING_LIST",
          "CREATIVE_DIMENSION",
          "USERLIST_ID",
          "ASSET_LIBRARY_DIRECTORY_HANDLE",
          "ASSET_LIBRARY_VIDEO_HANDLE",
          "ASSET_LIBRARY_HANDLE",
          "THIRD_PARTY_SERVED_URL",
          "CM360_DYNAMIC_TARGETING_KEY",
          "DV360_LINE_ITEM_ID",
        ]).describe("Required. The type of the field.").optional(),
      })).describe(
        "Required. The list of fields of the element. The field order and name should match the meta data in the content source source.",
      ).optional(),
      isLocalTimestamp: z.boolean().describe(
        "Optional. Whether the start and end timestamp is local timestamp. The default value is false which means start and end timestamp is in UTC.",
      ).optional(),
      lastModifiedInfo: z.object({
        time: z.string().describe(
          "Timestamp of the last change in milliseconds since epoch.",
        ).optional(),
      }).describe("Modification timestamp.").optional(),
      proximityTargetingFieldId: z.number().int().describe(
        "Optional. The field ID that specify field used for proximity targeting.",
      ).optional(),
      reportingLabelFieldId: z.number().int().describe(
        "Required. The field ID to specify the field used for dynamic reporting in Campaign Manager 360.",
      ).optional(),
      startTimestampFieldId: z.number().int().describe(
        "Optional. The field ID to specify the field that represents the start timestamp. Only applicable if you're planning to use scheduling in your dynamic creative.",
      ).optional(),
    }).describe("Contains the element of the dynamic feed.").optional(),
    feedIngestionStatus: z.object({
      ingestionErrorRecords: z.array(z.object({
        errors: z.array(z.unknown()).describe(
          "Output only. The list of field errors of the ingestion error record.",
        ).optional(),
        recordId: z.string().describe(
          "Output only. The record ID of the ingestion error record.",
        ).optional(),
      })).describe("Output only. The ingestion error records of the feed.")
        .optional(),
      ingestionStatus: z.object({
        numActiveRows: z.string().describe(
          "Output only. The number of active rows in the feed.",
        ).optional(),
        numRowsProcessed: z.string().describe(
          "Output only. The number of rows processed in the feed.",
        ).optional(),
        numRowsTotal: z.string().describe(
          "Output only. The total number of rows in the feed.",
        ).optional(),
        numRowsWithErrors: z.string().describe(
          "Output only. The number of rows with errors in the feed.",
        ).optional(),
        numWarningsTotal: z.string().describe(
          "Output only. The total number of warnings in the feed.",
        ).optional(),
      }).describe("Contains the ingestion status of the dynamic feed.")
        .optional(),
      state: z.enum([
        "FEED_PROCESSING_STATE_UNKNOWN",
        "CANCELLED",
        "INGESTING_QUEUED",
        "INGESTING",
        "INGESTED_SUCCESS",
        "INGESTED_FAILURE",
        "REQUEST_TO_PUBLISH",
        "PUBLISHING",
        "PUBLISHED_SUCCESS",
        "PUBLISHED_FAILURE",
      ]).describe("Output only. The processing state of the feed.").optional(),
    }).describe(
      "Contains the ingestion status of the dynamic feed. Feed ingestion is an asynchronous process. If the feed create request is successful, feed ingestion will be processed in the background, including validation, assets retrieval, and saving the data from the resource link. The processing time is dependent on the data size in the resource link. This read-only status field contains the current stage of that processing and its ingestion state.",
    ).optional(),
    feedSchedule: z.object({
      repeatValue: z.string().describe(
        "Optional. The number of times the feed retransforms within one day. This is a required field if the schedule is enabled. Acceptable values are between 1 to 6, inclusive.",
      ).optional(),
      scheduleEnabled: z.boolean().describe(
        "Optional. Whether the schedule is enabled.",
      ).optional(),
      startHour: z.string().describe(
        "Optional. The hour of the day to start the feed. It is applicable if the repeat value is equal to 1. Default value is 0.",
      ).optional(),
      startMinute: z.string().describe(
        "Optional. The minute of the hour to start the feed. It is applicable if the repeat value is equal to 1. Default value is 0.",
      ).optional(),
      timeZone: z.string().describe(
        'Optional. The time zone to schedule the feed. It is applicable if the repeat value is equal to 1. Default value is "America/Los_Angeles".',
      ).optional(),
    }).describe("Contains the schedule of the dynamic feed.").optional(),
    hasPublished: z.boolean().describe(
      "Output only. Indicates whether the dynamic feed has a published version. This is a read-only field.",
    ).optional(),
    lastModifiedInfo: z.object({
      time: z.string().describe(
        "Timestamp of the last change in milliseconds since epoch.",
      ).optional(),
    }).describe("Modification timestamp.").optional(),
    status: z.enum(["STATUS_UNKNOWN", "ACTIVE", "INACTIVE", "DELETED"])
      .describe(
        "Output only. The status of the feed. It is a read-only field that depends on the the feed ingestion status. The default value is INACTIVE, and it will be updated to ACTIVE once the feed is ingested successfully.",
      ).optional(),
    studioAdvertiserId: z.string().describe(
      "Required. Advertiser ID of this dynamic feed. This is a required field.",
    ).optional(),
  }).describe(
    "*Beta:* This API resource is available only to a very limited number of customers. If you'd like to use this resource, please reach out to your Google sales representative. Contains dynamic feed information.",
  ).optional(),
  dynamicProfileId: z.string().describe(
    "Required. Dynamic profile ID of the inserted dynamic feed.",
  ).optional(),
  contentSource: z.object({
    contentSourceName: z.string().describe(
      "Optional. The name of the content source. It is defaulted to content source file name if not provided.",
    ).optional(),
    createInfo: z.object({
      time: z.string().describe(
        "Timestamp of the last change in milliseconds since epoch.",
      ).optional(),
    }).describe("Modification timestamp.").optional(),
    lastModifiedInfo: z.object({
      time: z.string().describe(
        "Timestamp of the last change in milliseconds since epoch.",
      ).optional(),
    }).describe("Modification timestamp.").optional(),
    metaData: z.object({
      charset: z.string().describe(
        "Output only. The charset of the content source.",
      ).optional(),
      fieldNames: z.array(z.string()).describe(
        "Output only. The list of column names in the content source.",
      ).optional(),
      rowNumber: z.number().int().describe(
        "Output only. The number of rows in the content source.",
      ).optional(),
      separator: z.string().describe(
        "Output only. The separator of the content source.",
      ).optional(),
    }).describe(
      "Contains the meta data of the content source. This is a read-only field.",
    ).optional(),
    resourceLink: z.string().describe(
      "Required. The link to the file of the content source.",
    ).optional(),
    resourceType: z.enum([
      "RESOURCE_TYPE_UNSPECIFIED",
      "RESOURCE_TYPE_GOOGLE_SPREADSHEET",
      "RESOURCE_TYPE_REMOTE_FILE",
    ]).describe("Required. The resource type of the content source.")
      .optional(),
  }).describe("Contains the content source of the dynamic feed.").optional(),
  createInfo: z.object({
    time: z.string().describe(
      "Timestamp of the last change in milliseconds since epoch.",
    ).optional(),
  }).describe("Modification timestamp.").optional(),
  dynamicFeedId: z.string().describe(
    "Output only. Unique ID of this dynamic feed. This is a read-only, auto-generated field.",
  ).optional(),
  dynamicFeedName: z.string().describe(
    "Optional. Name of this dynamic feed. It is defaulted to content source file name if not provided.",
  ).optional(),
  element: z.object({
    activeFieldId: z.number().int().describe(
      "Optional. The field ID to specify the active field in the feed.",
    ).optional(),
    createInfo: z.object({
      time: z.string().describe(
        "Timestamp of the last change in milliseconds since epoch.",
      ).optional(),
    }).describe("Modification timestamp.").optional(),
    defaultFieldId: z.number().int().describe(
      "Optional. The field ID to specify the field that represents the default field in the feed.",
    ).optional(),
    elementName: z.string().describe(
      "Optional. The name of the element. It is defaulted to resource file name if not provided.",
    ).optional(),
    endTimestampFieldId: z.number().int().describe(
      "Optional. The field ID to specify the field that represents the end timestamp. Only applicable if you're planning to use scheduling in your dynamic creative.",
    ).optional(),
    externalIdFieldId: z.number().int().describe(
      "Required. The field ID to specify the field used for uniquely identifying the feed row. This is a required field.",
    ).optional(),
    feedFields: z.array(z.object({
      defaultValue: z.string().describe(
        "Optional. The default value of the field.",
      ).optional(),
      filterable: z.boolean().describe(
        "Optional. Whether the field is filterable. Could be set as true when the field type is any of the following and is not renderable: - STRING - BOOL - COUNTRY_CODE_ISO - CM360_SITE_ID - CM360_KEYWORD - CM360_CREATIVE_ID - CM360_PLACEMENT_ID - CM360_AD_ID - CM360_ADVERTISER_ID - CM360_CAMPAIGN_ID - CITY - REGION - POSTAL_CODE - METRO - CUSTOM_VALUE - REMARKETING_VALUE - GEO_CANONICAL - STRING_LIST - CREATIVE_DIMENSION - USERLIST_ID - CM360_DYNAMIC_TARGETING_KEY - DV360_LINE_ITEM_ID",
      ).optional(),
      id: z.number().int().describe(
        "Required. The ID of the field. The ID is based on the column index starting from 0, and it should match the column index in the resource link.",
      ).optional(),
      name: z.string().describe("Required. The name of the field.").optional(),
      renderable: z.boolean().describe(
        "Optional. Whether the field is able to display. Could be set as true when the field type is not in any of the following and the field is not filterable: - COUNTRY_CODE_ISO - CITY - REGION - POSTAL_CODE - METRO - GEO_CANONICAL - USERLIST_ID - CONTEXTUAL_KEYWORD - CM360_DYNAMIC_TARGETING_KEY - WEIGHT",
      ).optional(),
      required: z.boolean().describe(
        "Optional. Whether the field is required and should not be empty in the feed. Could be set as true when the field type is any of the following: - GPA_SERVED_IMAGE_URL - GPA_SERVED_ASSET_URL - ASSET_LIBRARY_HANDLE - ASSET_LIBRARY_VIDEO_HANDLE - ASSET_LIBRARY_DIRECTORY_HANDLE",
      ).optional(),
      type: z.enum([
        "TYPE_UNKNOWN",
        "STRING",
        "LONG",
        "GPA_SERVED_IMAGE_URL",
        "GPA_SERVED_ASSET_URL",
        "COUNTRY_CODE_ISO",
        "FLOAT",
        "CM360_KEYWORD",
        "CM360_SITE_ID",
        "BOOL",
        "EXIT_URL",
        "DATETIME",
        "CM360_CREATIVE_ID",
        "CM360_PLACEMENT_ID",
        "CM360_AD_ID",
        "CM360_ADVERTISER_ID",
        "CM360_CAMPAIGN_ID",
        "CITY",
        "REGION",
        "POSTAL_CODE",
        "METRO",
        "CUSTOM_VALUE",
        "REMARKETING_VALUE",
        "GEO_CANONICAL",
        "WEIGHT",
        "STRING_LIST",
        "CREATIVE_DIMENSION",
        "USERLIST_ID",
        "ASSET_LIBRARY_DIRECTORY_HANDLE",
        "ASSET_LIBRARY_VIDEO_HANDLE",
        "ASSET_LIBRARY_HANDLE",
        "THIRD_PARTY_SERVED_URL",
        "CM360_DYNAMIC_TARGETING_KEY",
        "DV360_LINE_ITEM_ID",
      ]).describe("Required. The type of the field.").optional(),
    })).describe(
      "Required. The list of fields of the element. The field order and name should match the meta data in the content source source.",
    ).optional(),
    isLocalTimestamp: z.boolean().describe(
      "Optional. Whether the start and end timestamp is local timestamp. The default value is false which means start and end timestamp is in UTC.",
    ).optional(),
    lastModifiedInfo: z.object({
      time: z.string().describe(
        "Timestamp of the last change in milliseconds since epoch.",
      ).optional(),
    }).describe("Modification timestamp.").optional(),
    proximityTargetingFieldId: z.number().int().describe(
      "Optional. The field ID that specify field used for proximity targeting.",
    ).optional(),
    reportingLabelFieldId: z.number().int().describe(
      "Required. The field ID to specify the field used for dynamic reporting in Campaign Manager 360.",
    ).optional(),
    startTimestampFieldId: z.number().int().describe(
      "Optional. The field ID to specify the field that represents the start timestamp. Only applicable if you're planning to use scheduling in your dynamic creative.",
    ).optional(),
  }).describe("Contains the element of the dynamic feed.").optional(),
  feedIngestionStatus: z.object({
    ingestionErrorRecords: z.array(z.object({
      errors: z.array(z.object({
        fieldId: z.unknown().describe("Output only. The ID of the field.")
          .optional(),
        fieldName: z.unknown().describe("Output only. The name of the field.")
          .optional(),
        fieldValues: z.unknown().describe(
          "Output only. The list of values of the field.",
        ).optional(),
        ingestionError: z.unknown().describe(
          "Output only. The ingestion error of the field.",
        ).optional(),
        isError: z.unknown().describe(
          "Output only. Incidcates whether the field has error or warning.",
        ).optional(),
      })).describe(
        "Output only. The list of field errors of the ingestion error record.",
      ).optional(),
      recordId: z.string().describe(
        "Output only. The record ID of the ingestion error record.",
      ).optional(),
    })).describe("Output only. The ingestion error records of the feed.")
      .optional(),
    ingestionStatus: z.object({
      numActiveRows: z.string().describe(
        "Output only. The number of active rows in the feed.",
      ).optional(),
      numRowsProcessed: z.string().describe(
        "Output only. The number of rows processed in the feed.",
      ).optional(),
      numRowsTotal: z.string().describe(
        "Output only. The total number of rows in the feed.",
      ).optional(),
      numRowsWithErrors: z.string().describe(
        "Output only. The number of rows with errors in the feed.",
      ).optional(),
      numWarningsTotal: z.string().describe(
        "Output only. The total number of warnings in the feed.",
      ).optional(),
    }).describe("Contains the ingestion status of the dynamic feed.")
      .optional(),
    state: z.enum([
      "FEED_PROCESSING_STATE_UNKNOWN",
      "CANCELLED",
      "INGESTING_QUEUED",
      "INGESTING",
      "INGESTED_SUCCESS",
      "INGESTED_FAILURE",
      "REQUEST_TO_PUBLISH",
      "PUBLISHING",
      "PUBLISHED_SUCCESS",
      "PUBLISHED_FAILURE",
    ]).describe("Output only. The processing state of the feed.").optional(),
  }).describe(
    "Contains the ingestion status of the dynamic feed. Feed ingestion is an asynchronous process. If the feed create request is successful, feed ingestion will be processed in the background, including validation, assets retrieval, and saving the data from the resource link. The processing time is dependent on the data size in the resource link. This read-only status field contains the current stage of that processing and its ingestion state.",
  ).optional(),
  feedSchedule: z.object({
    repeatValue: z.string().describe(
      "Optional. The number of times the feed retransforms within one day. This is a required field if the schedule is enabled. Acceptable values are between 1 to 6, inclusive.",
    ).optional(),
    scheduleEnabled: z.boolean().describe(
      "Optional. Whether the schedule is enabled.",
    ).optional(),
    startHour: z.string().describe(
      "Optional. The hour of the day to start the feed. It is applicable if the repeat value is equal to 1. Default value is 0.",
    ).optional(),
    startMinute: z.string().describe(
      "Optional. The minute of the hour to start the feed. It is applicable if the repeat value is equal to 1. Default value is 0.",
    ).optional(),
    timeZone: z.string().describe(
      'Optional. The time zone to schedule the feed. It is applicable if the repeat value is equal to 1. Default value is "America/Los_Angeles".',
    ).optional(),
  }).describe("Contains the schedule of the dynamic feed.").optional(),
  hasPublished: z.boolean().describe(
    "Output only. Indicates whether the dynamic feed has a published version. This is a read-only field.",
  ).optional(),
  lastModifiedInfo: z.object({
    time: z.string().describe(
      "Timestamp of the last change in milliseconds since epoch.",
    ).optional(),
  }).describe("Modification timestamp.").optional(),
  status: z.enum(["STATUS_UNKNOWN", "ACTIVE", "INACTIVE", "DELETED"]).describe(
    "Output only. The status of the feed. It is a read-only field that depends on the the feed ingestion status. The default value is INACTIVE, and it will be updated to ACTIVE once the feed is ingested successfully.",
  ).optional(),
  studioAdvertiserId: z.string().describe(
    "Required. Advertiser ID of this dynamic feed. This is a required field.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Campaign Manager 360 DynamicFeeds. Registered at `@swamp/gcp/dfareporting/dynamicfeeds`. */
export const model = {
  type: "@swamp/gcp/dfareporting/dynamicfeeds",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "*Beta:* This API resource is available only to a very limited number of custo...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a dynamicFeeds",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["dynamicFeed"] !== undefined) {
          body["dynamicFeed"] = g["dynamicFeed"];
        }
        if (g["dynamicProfileId"] !== undefined) {
          body["dynamicProfileId"] = g["dynamicProfileId"];
        }
        if (g["name"] !== undefined) {
          params["dynamicFeedId"] = String(g["name"]);
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "status",
              "readyValues": ["ACTIVE"],
              "failedValues": [],
            }
            : undefined,
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
      description: "Get a dynamicFeeds",
      arguments: z.object({
        identifier: z.string().describe("The name of the dynamicFeeds"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["dynamicFeedId"] = args.identifier;
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
      description: "Update dynamicFeeds attributes",
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
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["contentSource"] !== undefined) {
          body["contentSource"] = g["contentSource"];
        }
        if (g["createInfo"] !== undefined) body["createInfo"] = g["createInfo"];
        if (g["dynamicFeedId"] !== undefined) {
          body["dynamicFeedId"] = g["dynamicFeedId"];
        }
        if (g["dynamicFeedName"] !== undefined) {
          body["dynamicFeedName"] = g["dynamicFeedName"];
        }
        if (g["element"] !== undefined) body["element"] = g["element"];
        if (g["feedIngestionStatus"] !== undefined) {
          body["feedIngestionStatus"] = g["feedIngestionStatus"];
        }
        if (g["feedSchedule"] !== undefined) {
          body["feedSchedule"] = g["feedSchedule"];
        }
        if (g["hasPublished"] !== undefined) {
          body["hasPublished"] = g["hasPublished"];
        }
        if (g["lastModifiedInfo"] !== undefined) {
          body["lastModifiedInfo"] = g["lastModifiedInfo"];
        }
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["studioAdvertiserId"] !== undefined) {
          body["studioAdvertiserId"] = g["studioAdvertiserId"];
        }
        const result = await updateResource(
          BASE_URL,
          UPDATE_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "status",
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
    sync: {
      description: "Sync dynamicFeeds state from GCP",
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
          params["dynamicFeedId"] = identifier;
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
    retransform: {
      description: "retransform",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["dynamicFeedId"] !== undefined) {
          params["dynamicFeedId"] = String(g["dynamicFeedId"]);
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "dfareporting.dynamicFeeds.retransform",
            "path": "studio/dynamicFeeds/{+dynamicFeedId}/retransform",
            "httpMethod": "POST",
            "parameterOrder": ["dynamicFeedId"],
            "parameters": {
              "dynamicFeedId": { "location": "path", "required": true },
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
