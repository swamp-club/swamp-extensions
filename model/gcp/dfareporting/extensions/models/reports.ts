// Auto-generated extension model for @swamp/gcp/dfareporting/reports
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Campaign Manager 360 Reports.
 *
 * Represents a Report resource.
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
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://dfareporting.googleapis.com/dfareporting/v5/";

const GET_CONFIG = {
  "id": "dfareporting.reports.get",
  "path": "userprofiles/{profileId}/reports/{reportId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "profileId",
    "reportId",
  ],
  "parameters": {
    "profileId": {
      "location": "path",
      "required": true,
    },
    "reportId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "dfareporting.reports.insert",
  "path": "userprofiles/{profileId}/reports",
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
  "id": "dfareporting.reports.update",
  "path": "userprofiles/{profileId}/reports/{reportId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "profileId",
    "reportId",
  ],
  "parameters": {
    "profileId": {
      "location": "path",
      "required": true,
    },
    "reportId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "dfareporting.reports.delete",
  "path": "userprofiles/{profileId}/reports/{reportId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "profileId",
    "reportId",
  ],
  "parameters": {
    "profileId": {
      "location": "path",
      "required": true,
    },
    "reportId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "dfareporting.reports.list",
  "path": "userprofiles/{profileId}/reports",
  "httpMethod": "GET",
  "parameterOrder": [
    "profileId",
  ],
  "parameters": {
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
    "scope": {
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
  accountId: z.string().describe("The account ID to which this report belongs.")
    .optional(),
  criteria: z.object({
    activities: z.object({
      filters: z.array(z.object({
        dimensionName: z.string().describe("The name of the dimension.")
          .optional(),
        etag: z.string().describe(
          "The eTag of this response for caching purposes.",
        ).optional(),
        id: z.string().describe(
          "The ID associated with the value if available.",
        ).optional(),
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
      })).describe(
        'List of activity filters. The dimension values need to be all either of type "dfa:activity" or "dfa:activityGroup".',
      ).optional(),
      kind: z.string().describe(
        "The kind of resource this is, in this case dfareporting#activities.",
      ).optional(),
      metricNames: z.array(z.string()).describe(
        "List of names of floodlight activity metrics.",
      ).optional(),
    }).describe("Represents an activity group.").optional(),
    customRichMediaEvents: z.object({
      filteredEventIds: z.array(z.object({
        dimensionName: z.string().describe("The name of the dimension.")
          .optional(),
        etag: z.string().describe(
          "The eTag of this response for caching purposes.",
        ).optional(),
        id: z.string().describe(
          "The ID associated with the value if available.",
        ).optional(),
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
      })).describe(
        "List of custom rich media event IDs. Dimension values must be all of type dfa:richMediaEventTypeIdAndName.",
      ).optional(),
      kind: z.string().describe(
        "The kind of resource this is, in this case dfareporting#customRichMediaEvents.",
      ).optional(),
    }).describe("Represents a Custom Rich Media Events group.").optional(),
    dateRange: z.object({
      endDate: z.string().optional(),
      kind: z.string().describe(
        "The kind of resource this is, in this case dfareporting#dateRange.",
      ).optional(),
      relativeDateRange: z.enum([
        "TODAY",
        "YESTERDAY",
        "WEEK_TO_DATE",
        "MONTH_TO_DATE",
        "QUARTER_TO_DATE",
        "YEAR_TO_DATE",
        "PREVIOUS_WEEK",
        "PREVIOUS_MONTH",
        "PREVIOUS_QUARTER",
        "PREVIOUS_YEAR",
        "LAST_7_DAYS",
        "LAST_30_DAYS",
        "LAST_90_DAYS",
        "LAST_365_DAYS",
        "LAST_24_MONTHS",
        "LAST_14_DAYS",
        "LAST_60_DAYS",
      ]).describe(
        "The date range relative to the date of when the report is run.",
      ).optional(),
      startDate: z.string().optional(),
    }).describe("Represents a date range.").optional(),
    dimensionFilters: z.array(z.object({
      dimensionName: z.string().describe("The name of the dimension.")
        .optional(),
      etag: z.string().describe(
        "The eTag of this response for caching purposes.",
      ).optional(),
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
    })).describe(
      "The list of filters on which dimensions are filtered. Filters for different dimensions are ANDed, filters for the same dimension are grouped together and ORed.",
    ).optional(),
    dimensions: z.array(z.object({
      kind: z.string().describe(
        "The kind of resource this is, in this case dfareporting#sortedDimension.",
      ).optional(),
      name: z.string().describe("The name of the dimension.").optional(),
      sortOrder: z.enum(["ASCENDING", "DESCENDING"]).describe(
        "An optional sort order for the dimension column.",
      ).optional(),
    })).describe("The list of standard dimensions the report should include.")
      .optional(),
    metricNames: z.array(z.string()).describe(
      "The list of names of metrics the report should include.",
    ).optional(),
  }).describe('The report criteria for a report of type "STANDARD".')
    .optional(),
  crossMediaReachCriteria: z.object({
    dateRange: z.object({
      endDate: z.string().optional(),
      kind: z.string().describe(
        "The kind of resource this is, in this case dfareporting#dateRange.",
      ).optional(),
      relativeDateRange: z.enum([
        "TODAY",
        "YESTERDAY",
        "WEEK_TO_DATE",
        "MONTH_TO_DATE",
        "QUARTER_TO_DATE",
        "YEAR_TO_DATE",
        "PREVIOUS_WEEK",
        "PREVIOUS_MONTH",
        "PREVIOUS_QUARTER",
        "PREVIOUS_YEAR",
        "LAST_7_DAYS",
        "LAST_30_DAYS",
        "LAST_90_DAYS",
        "LAST_365_DAYS",
        "LAST_24_MONTHS",
        "LAST_14_DAYS",
        "LAST_60_DAYS",
      ]).describe(
        "The date range relative to the date of when the report is run.",
      ).optional(),
      startDate: z.string().optional(),
    }).describe("Represents a date range.").optional(),
    dimensionFilters: z.array(z.object({
      dimensionName: z.string().describe("The name of the dimension.")
        .optional(),
      etag: z.string().describe(
        "The eTag of this response for caching purposes.",
      ).optional(),
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
    })).describe(
      "Required. The list of filters on which dimensions are filtered. Filters for different dimensions are ANDed, filters for the same dimension are grouped together and ORed.",
    ).optional(),
    dimensions: z.array(z.object({
      kind: z.string().describe(
        "The kind of resource this is, in this case dfareporting#sortedDimension.",
      ).optional(),
      name: z.string().describe("The name of the dimension.").optional(),
      sortOrder: z.enum(["ASCENDING", "DESCENDING"]).describe(
        "An optional sort order for the dimension column.",
      ).optional(),
    })).describe("Required. The list of dimensions the report should include.")
      .optional(),
    metricNames: z.array(z.string()).describe(
      "Required. The list of names of metrics the report should include.",
    ).optional(),
  }).describe(
    'Optional. The report criteria for a report of type "CROSS_MEDIA_REACH".',
  ).optional(),
  delivery: z.object({
    emailOwner: z.boolean().describe(
      "Whether the report should be emailed to the report owner.",
    ).optional(),
    emailOwnerDeliveryType: z.enum(["LINK", "ATTACHMENT"]).describe(
      "The type of delivery for the owner to receive, if enabled.",
    ).optional(),
    message: z.string().describe("The message to be sent with each email.")
      .optional(),
    recipients: z.array(z.object({
      deliveryType: z.enum(["LINK", "ATTACHMENT"]).describe(
        "The delivery type for the recipient.",
      ).optional(),
      email: z.string().describe("The email address of the recipient.")
        .optional(),
      kind: z.string().describe(
        "The kind of resource this is, in this case dfareporting#recipient.",
      ).optional(),
    })).describe("The list of recipients to which to email the report.")
      .optional(),
  }).describe("The report's email delivery settings.").optional(),
  fileName: z.string().describe(
    "The filename used when generating report files for this report.",
  ).optional(),
  floodlightCriteria: z.object({
    customRichMediaEvents: z.array(z.object({
      dimensionName: z.string().describe("The name of the dimension.")
        .optional(),
      etag: z.string().describe(
        "The eTag of this response for caching purposes.",
      ).optional(),
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
    })).describe("The list of custom rich media events to include.").optional(),
    dateRange: z.object({
      endDate: z.string().optional(),
      kind: z.string().describe(
        "The kind of resource this is, in this case dfareporting#dateRange.",
      ).optional(),
      relativeDateRange: z.enum([
        "TODAY",
        "YESTERDAY",
        "WEEK_TO_DATE",
        "MONTH_TO_DATE",
        "QUARTER_TO_DATE",
        "YEAR_TO_DATE",
        "PREVIOUS_WEEK",
        "PREVIOUS_MONTH",
        "PREVIOUS_QUARTER",
        "PREVIOUS_YEAR",
        "LAST_7_DAYS",
        "LAST_30_DAYS",
        "LAST_90_DAYS",
        "LAST_365_DAYS",
        "LAST_24_MONTHS",
        "LAST_14_DAYS",
        "LAST_60_DAYS",
      ]).describe(
        "The date range relative to the date of when the report is run.",
      ).optional(),
      startDate: z.string().optional(),
    }).describe("Represents a date range.").optional(),
    dimensionFilters: z.array(z.object({
      dimensionName: z.string().describe("The name of the dimension.")
        .optional(),
      etag: z.string().describe(
        "The eTag of this response for caching purposes.",
      ).optional(),
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
    })).describe(
      "The list of filters on which dimensions are filtered. Filters for different dimensions are ANDed, filters for the same dimension are grouped together and ORed.",
    ).optional(),
    dimensions: z.array(z.object({
      kind: z.string().describe(
        "The kind of resource this is, in this case dfareporting#sortedDimension.",
      ).optional(),
      name: z.string().describe("The name of the dimension.").optional(),
      sortOrder: z.enum(["ASCENDING", "DESCENDING"]).describe(
        "An optional sort order for the dimension column.",
      ).optional(),
    })).describe("The list of dimensions the report should include.")
      .optional(),
    floodlightConfigId: z.object({
      dimensionName: z.string().describe("The name of the dimension.")
        .optional(),
      etag: z.string().describe(
        "The eTag of this response for caching purposes.",
      ).optional(),
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
    metricNames: z.array(z.string()).describe(
      "The list of names of metrics the report should include.",
    ).optional(),
    reportProperties: z.object({
      includeAttributedIPConversions: z.boolean().describe(
        "Include conversions that have no cookie, but do have an exposure path.",
      ).optional(),
      includeUnattributedCookieConversions: z.boolean().describe(
        "Include conversions of users with a DoubleClick cookie but without an exposure. That means the user did not click or see an ad from the advertiser within the Floodlight group, or that the interaction happened outside the lookback window.",
      ).optional(),
      includeUnattributedIPConversions: z.boolean().describe(
        "Include conversions that have no associated cookies and no exposures. It’s therefore impossible to know how the user was exposed to your ads during the lookback window prior to a conversion.",
      ).optional(),
    }).describe("The properties of the report.").optional(),
  }).describe('The report criteria for a report of type "FLOODLIGHT".')
    .optional(),
  format: z.enum(["CSV", "EXCEL"]).describe(
    'The output format of the report. If not specified, default format is "CSV". Note that the actual format in the completed report file might differ if for instance the report\'s size exceeds the format\'s capabilities. "CSV" will then be the fallback format.',
  ).optional(),
  id: z.string().describe("The unique ID identifying this report resource.")
    .optional(),
  lastModifiedTime: z.string().describe(
    "The timestamp (in milliseconds since epoch) of when this report was last modified.",
  ).optional(),
  name: z.string().describe("The name of the report.").optional(),
  ownerProfileId: z.string().describe(
    "The user profile id of the owner of this report.",
  ).optional(),
  pathToConversionCriteria: z.object({
    activityFilters: z.array(z.object({
      dimensionName: z.string().describe("The name of the dimension.")
        .optional(),
      etag: z.string().describe(
        "The eTag of this response for caching purposes.",
      ).optional(),
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
    })).describe("The list of 'dfa:activity' values to filter on.").optional(),
    conversionDimensions: z.array(z.object({
      kind: z.string().describe(
        "The kind of resource this is, in this case dfareporting#sortedDimension.",
      ).optional(),
      name: z.string().describe("The name of the dimension.").optional(),
      sortOrder: z.enum(["ASCENDING", "DESCENDING"]).describe(
        "An optional sort order for the dimension column.",
      ).optional(),
    })).describe("The list of conversion dimensions the report should include.")
      .optional(),
    customFloodlightVariables: z.array(z.object({
      kind: z.string().describe(
        "The kind of resource this is, in this case dfareporting#sortedDimension.",
      ).optional(),
      name: z.string().describe("The name of the dimension.").optional(),
      sortOrder: z.enum(["ASCENDING", "DESCENDING"]).describe(
        "An optional sort order for the dimension column.",
      ).optional(),
    })).describe(
      "The list of custom floodlight variables the report should include.",
    ).optional(),
    customRichMediaEvents: z.array(z.object({
      dimensionName: z.string().describe("The name of the dimension.")
        .optional(),
      etag: z.string().describe(
        "The eTag of this response for caching purposes.",
      ).optional(),
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
    })).describe("The list of custom rich media events to include.").optional(),
    dateRange: z.object({
      endDate: z.string().optional(),
      kind: z.string().describe(
        "The kind of resource this is, in this case dfareporting#dateRange.",
      ).optional(),
      relativeDateRange: z.enum([
        "TODAY",
        "YESTERDAY",
        "WEEK_TO_DATE",
        "MONTH_TO_DATE",
        "QUARTER_TO_DATE",
        "YEAR_TO_DATE",
        "PREVIOUS_WEEK",
        "PREVIOUS_MONTH",
        "PREVIOUS_QUARTER",
        "PREVIOUS_YEAR",
        "LAST_7_DAYS",
        "LAST_30_DAYS",
        "LAST_90_DAYS",
        "LAST_365_DAYS",
        "LAST_24_MONTHS",
        "LAST_14_DAYS",
        "LAST_60_DAYS",
      ]).describe(
        "The date range relative to the date of when the report is run.",
      ).optional(),
      startDate: z.string().optional(),
    }).describe("Represents a date range.").optional(),
    floodlightConfigId: z.object({
      dimensionName: z.string().describe("The name of the dimension.")
        .optional(),
      etag: z.string().describe(
        "The eTag of this response for caching purposes.",
      ).optional(),
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
    metricNames: z.array(z.string()).describe(
      "The list of names of metrics the report should include.",
    ).optional(),
    perInteractionDimensions: z.array(z.object({
      kind: z.string().describe(
        "The kind of resource this is, in this case dfareporting#sortedDimension.",
      ).optional(),
      name: z.string().describe("The name of the dimension.").optional(),
      sortOrder: z.enum(["ASCENDING", "DESCENDING"]).describe(
        "An optional sort order for the dimension column.",
      ).optional(),
    })).describe(
      "The list of per interaction dimensions the report should include.",
    ).optional(),
    reportProperties: z.object({
      clicksLookbackWindow: z.number().int().describe(
        "CM360 checks to see if a click interaction occurred within the specified period of time before a conversion. By default the value is pulled from Floodlight or you can manually enter a custom value. Valid values: 1-90.",
      ).optional(),
      impressionsLookbackWindow: z.number().int().describe(
        "CM360 checks to see if an impression interaction occurred within the specified period of time before a conversion. By default the value is pulled from Floodlight or you can manually enter a custom value. Valid values: 1-90.",
      ).optional(),
      includeAttributedIPConversions: z.boolean().describe(
        "Deprecated: has no effect.",
      ).optional(),
      includeUnattributedCookieConversions: z.boolean().describe(
        "Include conversions of users with a DoubleClick cookie but without an exposure. That means the user did not click or see an ad from the advertiser within the Floodlight group, or that the interaction happened outside the lookback window.",
      ).optional(),
      includeUnattributedIPConversions: z.boolean().describe(
        "Include conversions that have no associated cookies and no exposures. It’s therefore impossible to know how the user was exposed to your ads during the lookback window prior to a conversion.",
      ).optional(),
      maximumClickInteractions: z.number().int().describe(
        "The maximum number of click interactions to include in the report. Advertisers currently paying for E2C reports get up to 200 (100 clicks, 100 impressions). If another advertiser in your network is paying for E2C, you can have up to 5 total exposures per report.",
      ).optional(),
      maximumImpressionInteractions: z.number().int().describe(
        "The maximum number of click interactions to include in the report. Advertisers currently paying for E2C reports get up to 200 (100 clicks, 100 impressions). If another advertiser in your network is paying for E2C, you can have up to 5 total exposures per report.",
      ).optional(),
      maximumInteractionGap: z.number().int().describe(
        "The maximum amount of time that can take place between interactions (clicks or impressions) by the same user. Valid values: 1-90.",
      ).optional(),
      pivotOnInteractionPath: z.boolean().describe(
        "Enable pivoting on interaction path.",
      ).optional(),
    }).describe("The properties of the report.").optional(),
  }).describe('The report criteria for a report of type "PATH_TO_CONVERSION".')
    .optional(),
  reachCriteria: z.object({
    activities: z.object({
      filters: z.array(z.object({
        dimensionName: z.string().describe("The name of the dimension.")
          .optional(),
        etag: z.string().describe(
          "The eTag of this response for caching purposes.",
        ).optional(),
        id: z.string().describe(
          "The ID associated with the value if available.",
        ).optional(),
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
      })).describe(
        'List of activity filters. The dimension values need to be all either of type "dfa:activity" or "dfa:activityGroup".',
      ).optional(),
      kind: z.string().describe(
        "The kind of resource this is, in this case dfareporting#activities.",
      ).optional(),
      metricNames: z.array(z.string()).describe(
        "List of names of floodlight activity metrics.",
      ).optional(),
    }).describe("Represents an activity group.").optional(),
    customRichMediaEvents: z.object({
      filteredEventIds: z.array(z.object({
        dimensionName: z.string().describe("The name of the dimension.")
          .optional(),
        etag: z.string().describe(
          "The eTag of this response for caching purposes.",
        ).optional(),
        id: z.string().describe(
          "The ID associated with the value if available.",
        ).optional(),
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
      })).describe(
        "List of custom rich media event IDs. Dimension values must be all of type dfa:richMediaEventTypeIdAndName.",
      ).optional(),
      kind: z.string().describe(
        "The kind of resource this is, in this case dfareporting#customRichMediaEvents.",
      ).optional(),
    }).describe("Represents a Custom Rich Media Events group.").optional(),
    dateRange: z.object({
      endDate: z.string().optional(),
      kind: z.string().describe(
        "The kind of resource this is, in this case dfareporting#dateRange.",
      ).optional(),
      relativeDateRange: z.enum([
        "TODAY",
        "YESTERDAY",
        "WEEK_TO_DATE",
        "MONTH_TO_DATE",
        "QUARTER_TO_DATE",
        "YEAR_TO_DATE",
        "PREVIOUS_WEEK",
        "PREVIOUS_MONTH",
        "PREVIOUS_QUARTER",
        "PREVIOUS_YEAR",
        "LAST_7_DAYS",
        "LAST_30_DAYS",
        "LAST_90_DAYS",
        "LAST_365_DAYS",
        "LAST_24_MONTHS",
        "LAST_14_DAYS",
        "LAST_60_DAYS",
      ]).describe(
        "The date range relative to the date of when the report is run.",
      ).optional(),
      startDate: z.string().optional(),
    }).describe("Represents a date range.").optional(),
    dimensionFilters: z.array(z.object({
      dimensionName: z.string().describe("The name of the dimension.")
        .optional(),
      etag: z.string().describe(
        "The eTag of this response for caching purposes.",
      ).optional(),
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
    })).describe(
      "The list of filters on which dimensions are filtered. Filters for different dimensions are ANDed, filters for the same dimension are grouped together and ORed.",
    ).optional(),
    dimensions: z.array(z.object({
      kind: z.string().describe(
        "The kind of resource this is, in this case dfareporting#sortedDimension.",
      ).optional(),
      name: z.string().describe("The name of the dimension.").optional(),
      sortOrder: z.enum(["ASCENDING", "DESCENDING"]).describe(
        "An optional sort order for the dimension column.",
      ).optional(),
    })).describe("The list of dimensions the report should include.")
      .optional(),
    metricNames: z.array(z.string()).describe(
      "The list of names of metrics the report should include.",
    ).optional(),
    reachByFrequencyMetricNames: z.array(z.string()).describe(
      "The list of names of Reach By Frequency metrics the report should include.",
    ).optional(),
  }).describe('The report criteria for a report of type "REACH".').optional(),
  schedule: z.object({
    active: z.boolean().describe(
      "Whether the schedule is active or not. Must be set to either true or false.",
    ).optional(),
    every: z.number().int().describe(
      'Defines every how many days, weeks or months the report should be run. Needs to be set when "repeats" is either "DAILY", "WEEKLY" or "MONTHLY".',
    ).optional(),
    expirationDate: z.string().optional(),
    repeats: z.string().describe(
      'The interval for which the report is repeated. Note: - "DAILY" also requires field "every" to be set. - "WEEKLY" also requires fields "every" and "repeatsOnWeekDays" to be set. - "MONTHLY" also requires fields "every" and "runsOnDayOfMonth" to be set.',
    ).optional(),
    repeatsOnWeekDays: z.array(
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
      'List of week days "WEEKLY" on which scheduled reports should run.',
    ).optional(),
    runsOnDayOfMonth: z.enum(["DAY_OF_MONTH", "WEEK_OF_MONTH"]).describe(
      'Enum to define for "MONTHLY" scheduled reports whether reports should be repeated on the same day of the month as "startDate" or the same day of the week of the month. Example: If \'startDate\' is Monday, April 2nd 2012 (2012-04-02), "DAY_OF_MONTH" would run subsequent reports on the 2nd of every Month, and "WEEK_OF_MONTH" would run subsequent reports on the first Monday of the month.',
    ).optional(),
    startDate: z.string().optional(),
    timezone: z.string().describe("The timezone when the report will run.")
      .optional(),
  }).describe(
    "The report's schedule. Can only be set if the report's 'dateRange' is a relative date range and the relative date range is not \"TODAY\".",
  ).optional(),
  subAccountId: z.string().describe(
    "The subaccount ID to which this report belongs if applicable.",
  ).optional(),
  type: z.enum([
    "STANDARD",
    "REACH",
    "PATH_TO_CONVERSION",
    "FLOODLIGHT",
    "CROSS_MEDIA_REACH",
  ]).describe("The type of the report.").optional(),
  profileId: z.string().describe("The Campaign Manager 360 user profile ID."),
});

const StateSchema = z.object({
  accountId: z.string().optional(),
  criteria: z.object({
    activities: z.object({
      filters: z.array(z.object({
        dimensionName: z.string(),
        etag: z.string(),
        id: z.string(),
        kind: z.string(),
        matchType: z.string(),
        value: z.string(),
      })),
      kind: z.string(),
      metricNames: z.array(z.string()),
    }),
    customRichMediaEvents: z.object({
      filteredEventIds: z.array(z.object({
        dimensionName: z.string(),
        etag: z.string(),
        id: z.string(),
        kind: z.string(),
        matchType: z.string(),
        value: z.string(),
      })),
      kind: z.string(),
    }),
    dateRange: z.object({
      endDate: z.string(),
      kind: z.string(),
      relativeDateRange: z.string(),
      startDate: z.string(),
    }),
    dimensionFilters: z.array(z.object({
      dimensionName: z.string(),
      etag: z.string(),
      id: z.string(),
      kind: z.string(),
      matchType: z.string(),
      value: z.string(),
    })),
    dimensions: z.array(z.object({
      kind: z.string(),
      name: z.string(),
      sortOrder: z.string(),
    })),
    metricNames: z.array(z.string()),
  }).optional(),
  crossMediaReachCriteria: z.object({
    dateRange: z.object({
      endDate: z.string(),
      kind: z.string(),
      relativeDateRange: z.string(),
      startDate: z.string(),
    }),
    dimensionFilters: z.array(z.object({
      dimensionName: z.string(),
      etag: z.string(),
      id: z.string(),
      kind: z.string(),
      matchType: z.string(),
      value: z.string(),
    })),
    dimensions: z.array(z.object({
      kind: z.string(),
      name: z.string(),
      sortOrder: z.string(),
    })),
    metricNames: z.array(z.string()),
  }).optional(),
  delivery: z.object({
    emailOwner: z.boolean(),
    emailOwnerDeliveryType: z.string(),
    message: z.string(),
    recipients: z.array(z.object({
      deliveryType: z.string(),
      email: z.string(),
      kind: z.string(),
    })),
  }).optional(),
  etag: z.string().optional(),
  fileName: z.string().optional(),
  floodlightCriteria: z.object({
    customRichMediaEvents: z.array(z.object({
      dimensionName: z.string(),
      etag: z.string(),
      id: z.string(),
      kind: z.string(),
      matchType: z.string(),
      value: z.string(),
    })),
    dateRange: z.object({
      endDate: z.string(),
      kind: z.string(),
      relativeDateRange: z.string(),
      startDate: z.string(),
    }),
    dimensionFilters: z.array(z.object({
      dimensionName: z.string(),
      etag: z.string(),
      id: z.string(),
      kind: z.string(),
      matchType: z.string(),
      value: z.string(),
    })),
    dimensions: z.array(z.object({
      kind: z.string(),
      name: z.string(),
      sortOrder: z.string(),
    })),
    floodlightConfigId: z.object({
      dimensionName: z.string(),
      etag: z.string(),
      id: z.string(),
      kind: z.string(),
      matchType: z.string(),
      value: z.string(),
    }),
    metricNames: z.array(z.string()),
    reportProperties: z.object({
      includeAttributedIPConversions: z.boolean(),
      includeUnattributedCookieConversions: z.boolean(),
      includeUnattributedIPConversions: z.boolean(),
    }),
  }).optional(),
  format: z.string().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  lastModifiedTime: z.string().optional(),
  name: z.string(),
  ownerProfileId: z.string().optional(),
  pathToConversionCriteria: z.object({
    activityFilters: z.array(z.object({
      dimensionName: z.string(),
      etag: z.string(),
      id: z.string(),
      kind: z.string(),
      matchType: z.string(),
      value: z.string(),
    })),
    conversionDimensions: z.array(z.object({
      kind: z.string(),
      name: z.string(),
      sortOrder: z.string(),
    })),
    customFloodlightVariables: z.array(z.object({
      kind: z.string(),
      name: z.string(),
      sortOrder: z.string(),
    })),
    customRichMediaEvents: z.array(z.object({
      dimensionName: z.string(),
      etag: z.string(),
      id: z.string(),
      kind: z.string(),
      matchType: z.string(),
      value: z.string(),
    })),
    dateRange: z.object({
      endDate: z.string(),
      kind: z.string(),
      relativeDateRange: z.string(),
      startDate: z.string(),
    }),
    floodlightConfigId: z.object({
      dimensionName: z.string(),
      etag: z.string(),
      id: z.string(),
      kind: z.string(),
      matchType: z.string(),
      value: z.string(),
    }),
    metricNames: z.array(z.string()),
    perInteractionDimensions: z.array(z.object({
      kind: z.string(),
      name: z.string(),
      sortOrder: z.string(),
    })),
    reportProperties: z.object({
      clicksLookbackWindow: z.number(),
      impressionsLookbackWindow: z.number(),
      includeAttributedIPConversions: z.boolean(),
      includeUnattributedCookieConversions: z.boolean(),
      includeUnattributedIPConversions: z.boolean(),
      maximumClickInteractions: z.number(),
      maximumImpressionInteractions: z.number(),
      maximumInteractionGap: z.number(),
      pivotOnInteractionPath: z.boolean(),
    }),
  }).optional(),
  reachCriteria: z.object({
    activities: z.object({
      filters: z.array(z.object({
        dimensionName: z.string(),
        etag: z.string(),
        id: z.string(),
        kind: z.string(),
        matchType: z.string(),
        value: z.string(),
      })),
      kind: z.string(),
      metricNames: z.array(z.string()),
    }),
    customRichMediaEvents: z.object({
      filteredEventIds: z.array(z.object({
        dimensionName: z.string(),
        etag: z.string(),
        id: z.string(),
        kind: z.string(),
        matchType: z.string(),
        value: z.string(),
      })),
      kind: z.string(),
    }),
    dateRange: z.object({
      endDate: z.string(),
      kind: z.string(),
      relativeDateRange: z.string(),
      startDate: z.string(),
    }),
    dimensionFilters: z.array(z.object({
      dimensionName: z.string(),
      etag: z.string(),
      id: z.string(),
      kind: z.string(),
      matchType: z.string(),
      value: z.string(),
    })),
    dimensions: z.array(z.object({
      kind: z.string(),
      name: z.string(),
      sortOrder: z.string(),
    })),
    metricNames: z.array(z.string()),
    reachByFrequencyMetricNames: z.array(z.string()),
  }).optional(),
  schedule: z.object({
    active: z.boolean(),
    every: z.number(),
    expirationDate: z.string(),
    repeats: z.string(),
    repeatsOnWeekDays: z.array(z.string()),
    runsOnDayOfMonth: z.string(),
    startDate: z.string(),
    timezone: z.string(),
  }).optional(),
  subAccountId: z.string().optional(),
  type: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  accountId: z.string().describe("The account ID to which this report belongs.")
    .optional(),
  criteria: z.object({
    activities: z.object({
      filters: z.array(z.object({
        dimensionName: z.string().describe("The name of the dimension.")
          .optional(),
        etag: z.string().describe(
          "The eTag of this response for caching purposes.",
        ).optional(),
        id: z.string().describe(
          "The ID associated with the value if available.",
        ).optional(),
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
      })).describe(
        'List of activity filters. The dimension values need to be all either of type "dfa:activity" or "dfa:activityGroup".',
      ).optional(),
      kind: z.string().describe(
        "The kind of resource this is, in this case dfareporting#activities.",
      ).optional(),
      metricNames: z.array(z.string()).describe(
        "List of names of floodlight activity metrics.",
      ).optional(),
    }).describe("Represents an activity group.").optional(),
    customRichMediaEvents: z.object({
      filteredEventIds: z.array(z.object({
        dimensionName: z.string().describe("The name of the dimension.")
          .optional(),
        etag: z.string().describe(
          "The eTag of this response for caching purposes.",
        ).optional(),
        id: z.string().describe(
          "The ID associated with the value if available.",
        ).optional(),
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
      })).describe(
        "List of custom rich media event IDs. Dimension values must be all of type dfa:richMediaEventTypeIdAndName.",
      ).optional(),
      kind: z.string().describe(
        "The kind of resource this is, in this case dfareporting#customRichMediaEvents.",
      ).optional(),
    }).describe("Represents a Custom Rich Media Events group.").optional(),
    dateRange: z.object({
      endDate: z.string().optional(),
      kind: z.string().describe(
        "The kind of resource this is, in this case dfareporting#dateRange.",
      ).optional(),
      relativeDateRange: z.enum([
        "TODAY",
        "YESTERDAY",
        "WEEK_TO_DATE",
        "MONTH_TO_DATE",
        "QUARTER_TO_DATE",
        "YEAR_TO_DATE",
        "PREVIOUS_WEEK",
        "PREVIOUS_MONTH",
        "PREVIOUS_QUARTER",
        "PREVIOUS_YEAR",
        "LAST_7_DAYS",
        "LAST_30_DAYS",
        "LAST_90_DAYS",
        "LAST_365_DAYS",
        "LAST_24_MONTHS",
        "LAST_14_DAYS",
        "LAST_60_DAYS",
      ]).describe(
        "The date range relative to the date of when the report is run.",
      ).optional(),
      startDate: z.string().optional(),
    }).describe("Represents a date range.").optional(),
    dimensionFilters: z.array(z.object({
      dimensionName: z.string().describe("The name of the dimension.")
        .optional(),
      etag: z.string().describe(
        "The eTag of this response for caching purposes.",
      ).optional(),
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
    })).describe(
      "The list of filters on which dimensions are filtered. Filters for different dimensions are ANDed, filters for the same dimension are grouped together and ORed.",
    ).optional(),
    dimensions: z.array(z.object({
      kind: z.string().describe(
        "The kind of resource this is, in this case dfareporting#sortedDimension.",
      ).optional(),
      name: z.string().describe("The name of the dimension.").optional(),
      sortOrder: z.enum(["ASCENDING", "DESCENDING"]).describe(
        "An optional sort order for the dimension column.",
      ).optional(),
    })).describe("The list of standard dimensions the report should include.")
      .optional(),
    metricNames: z.array(z.string()).describe(
      "The list of names of metrics the report should include.",
    ).optional(),
  }).describe('The report criteria for a report of type "STANDARD".')
    .optional(),
  crossMediaReachCriteria: z.object({
    dateRange: z.object({
      endDate: z.string().optional(),
      kind: z.string().describe(
        "The kind of resource this is, in this case dfareporting#dateRange.",
      ).optional(),
      relativeDateRange: z.enum([
        "TODAY",
        "YESTERDAY",
        "WEEK_TO_DATE",
        "MONTH_TO_DATE",
        "QUARTER_TO_DATE",
        "YEAR_TO_DATE",
        "PREVIOUS_WEEK",
        "PREVIOUS_MONTH",
        "PREVIOUS_QUARTER",
        "PREVIOUS_YEAR",
        "LAST_7_DAYS",
        "LAST_30_DAYS",
        "LAST_90_DAYS",
        "LAST_365_DAYS",
        "LAST_24_MONTHS",
        "LAST_14_DAYS",
        "LAST_60_DAYS",
      ]).describe(
        "The date range relative to the date of when the report is run.",
      ).optional(),
      startDate: z.string().optional(),
    }).describe("Represents a date range.").optional(),
    dimensionFilters: z.array(z.object({
      dimensionName: z.string().describe("The name of the dimension.")
        .optional(),
      etag: z.string().describe(
        "The eTag of this response for caching purposes.",
      ).optional(),
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
    })).describe(
      "Required. The list of filters on which dimensions are filtered. Filters for different dimensions are ANDed, filters for the same dimension are grouped together and ORed.",
    ).optional(),
    dimensions: z.array(z.object({
      kind: z.string().describe(
        "The kind of resource this is, in this case dfareporting#sortedDimension.",
      ).optional(),
      name: z.string().describe("The name of the dimension.").optional(),
      sortOrder: z.enum(["ASCENDING", "DESCENDING"]).describe(
        "An optional sort order for the dimension column.",
      ).optional(),
    })).describe("Required. The list of dimensions the report should include.")
      .optional(),
    metricNames: z.array(z.string()).describe(
      "Required. The list of names of metrics the report should include.",
    ).optional(),
  }).describe(
    'Optional. The report criteria for a report of type "CROSS_MEDIA_REACH".',
  ).optional(),
  delivery: z.object({
    emailOwner: z.boolean().describe(
      "Whether the report should be emailed to the report owner.",
    ).optional(),
    emailOwnerDeliveryType: z.enum(["LINK", "ATTACHMENT"]).describe(
      "The type of delivery for the owner to receive, if enabled.",
    ).optional(),
    message: z.string().describe("The message to be sent with each email.")
      .optional(),
    recipients: z.array(z.object({
      deliveryType: z.enum(["LINK", "ATTACHMENT"]).describe(
        "The delivery type for the recipient.",
      ).optional(),
      email: z.string().describe("The email address of the recipient.")
        .optional(),
      kind: z.string().describe(
        "The kind of resource this is, in this case dfareporting#recipient.",
      ).optional(),
    })).describe("The list of recipients to which to email the report.")
      .optional(),
  }).describe("The report's email delivery settings.").optional(),
  fileName: z.string().describe(
    "The filename used when generating report files for this report.",
  ).optional(),
  floodlightCriteria: z.object({
    customRichMediaEvents: z.array(z.object({
      dimensionName: z.string().describe("The name of the dimension.")
        .optional(),
      etag: z.string().describe(
        "The eTag of this response for caching purposes.",
      ).optional(),
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
    })).describe("The list of custom rich media events to include.").optional(),
    dateRange: z.object({
      endDate: z.string().optional(),
      kind: z.string().describe(
        "The kind of resource this is, in this case dfareporting#dateRange.",
      ).optional(),
      relativeDateRange: z.enum([
        "TODAY",
        "YESTERDAY",
        "WEEK_TO_DATE",
        "MONTH_TO_DATE",
        "QUARTER_TO_DATE",
        "YEAR_TO_DATE",
        "PREVIOUS_WEEK",
        "PREVIOUS_MONTH",
        "PREVIOUS_QUARTER",
        "PREVIOUS_YEAR",
        "LAST_7_DAYS",
        "LAST_30_DAYS",
        "LAST_90_DAYS",
        "LAST_365_DAYS",
        "LAST_24_MONTHS",
        "LAST_14_DAYS",
        "LAST_60_DAYS",
      ]).describe(
        "The date range relative to the date of when the report is run.",
      ).optional(),
      startDate: z.string().optional(),
    }).describe("Represents a date range.").optional(),
    dimensionFilters: z.array(z.object({
      dimensionName: z.string().describe("The name of the dimension.")
        .optional(),
      etag: z.string().describe(
        "The eTag of this response for caching purposes.",
      ).optional(),
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
    })).describe(
      "The list of filters on which dimensions are filtered. Filters for different dimensions are ANDed, filters for the same dimension are grouped together and ORed.",
    ).optional(),
    dimensions: z.array(z.object({
      kind: z.string().describe(
        "The kind of resource this is, in this case dfareporting#sortedDimension.",
      ).optional(),
      name: z.string().describe("The name of the dimension.").optional(),
      sortOrder: z.enum(["ASCENDING", "DESCENDING"]).describe(
        "An optional sort order for the dimension column.",
      ).optional(),
    })).describe("The list of dimensions the report should include.")
      .optional(),
    floodlightConfigId: z.object({
      dimensionName: z.string().describe("The name of the dimension.")
        .optional(),
      etag: z.string().describe(
        "The eTag of this response for caching purposes.",
      ).optional(),
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
    metricNames: z.array(z.string()).describe(
      "The list of names of metrics the report should include.",
    ).optional(),
    reportProperties: z.object({
      includeAttributedIPConversions: z.boolean().describe(
        "Include conversions that have no cookie, but do have an exposure path.",
      ).optional(),
      includeUnattributedCookieConversions: z.boolean().describe(
        "Include conversions of users with a DoubleClick cookie but without an exposure. That means the user did not click or see an ad from the advertiser within the Floodlight group, or that the interaction happened outside the lookback window.",
      ).optional(),
      includeUnattributedIPConversions: z.boolean().describe(
        "Include conversions that have no associated cookies and no exposures. It’s therefore impossible to know how the user was exposed to your ads during the lookback window prior to a conversion.",
      ).optional(),
    }).describe("The properties of the report.").optional(),
  }).describe('The report criteria for a report of type "FLOODLIGHT".')
    .optional(),
  format: z.enum(["CSV", "EXCEL"]).describe(
    'The output format of the report. If not specified, default format is "CSV". Note that the actual format in the completed report file might differ if for instance the report\'s size exceeds the format\'s capabilities. "CSV" will then be the fallback format.',
  ).optional(),
  id: z.string().describe("The unique ID identifying this report resource.")
    .optional(),
  lastModifiedTime: z.string().describe(
    "The timestamp (in milliseconds since epoch) of when this report was last modified.",
  ).optional(),
  name: z.string().describe("The name of the report.").optional(),
  ownerProfileId: z.string().describe(
    "The user profile id of the owner of this report.",
  ).optional(),
  pathToConversionCriteria: z.object({
    activityFilters: z.array(z.object({
      dimensionName: z.string().describe("The name of the dimension.")
        .optional(),
      etag: z.string().describe(
        "The eTag of this response for caching purposes.",
      ).optional(),
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
    })).describe("The list of 'dfa:activity' values to filter on.").optional(),
    conversionDimensions: z.array(z.object({
      kind: z.string().describe(
        "The kind of resource this is, in this case dfareporting#sortedDimension.",
      ).optional(),
      name: z.string().describe("The name of the dimension.").optional(),
      sortOrder: z.enum(["ASCENDING", "DESCENDING"]).describe(
        "An optional sort order for the dimension column.",
      ).optional(),
    })).describe("The list of conversion dimensions the report should include.")
      .optional(),
    customFloodlightVariables: z.array(z.object({
      kind: z.string().describe(
        "The kind of resource this is, in this case dfareporting#sortedDimension.",
      ).optional(),
      name: z.string().describe("The name of the dimension.").optional(),
      sortOrder: z.enum(["ASCENDING", "DESCENDING"]).describe(
        "An optional sort order for the dimension column.",
      ).optional(),
    })).describe(
      "The list of custom floodlight variables the report should include.",
    ).optional(),
    customRichMediaEvents: z.array(z.object({
      dimensionName: z.string().describe("The name of the dimension.")
        .optional(),
      etag: z.string().describe(
        "The eTag of this response for caching purposes.",
      ).optional(),
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
    })).describe("The list of custom rich media events to include.").optional(),
    dateRange: z.object({
      endDate: z.string().optional(),
      kind: z.string().describe(
        "The kind of resource this is, in this case dfareporting#dateRange.",
      ).optional(),
      relativeDateRange: z.enum([
        "TODAY",
        "YESTERDAY",
        "WEEK_TO_DATE",
        "MONTH_TO_DATE",
        "QUARTER_TO_DATE",
        "YEAR_TO_DATE",
        "PREVIOUS_WEEK",
        "PREVIOUS_MONTH",
        "PREVIOUS_QUARTER",
        "PREVIOUS_YEAR",
        "LAST_7_DAYS",
        "LAST_30_DAYS",
        "LAST_90_DAYS",
        "LAST_365_DAYS",
        "LAST_24_MONTHS",
        "LAST_14_DAYS",
        "LAST_60_DAYS",
      ]).describe(
        "The date range relative to the date of when the report is run.",
      ).optional(),
      startDate: z.string().optional(),
    }).describe("Represents a date range.").optional(),
    floodlightConfigId: z.object({
      dimensionName: z.string().describe("The name of the dimension.")
        .optional(),
      etag: z.string().describe(
        "The eTag of this response for caching purposes.",
      ).optional(),
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
    metricNames: z.array(z.string()).describe(
      "The list of names of metrics the report should include.",
    ).optional(),
    perInteractionDimensions: z.array(z.object({
      kind: z.string().describe(
        "The kind of resource this is, in this case dfareporting#sortedDimension.",
      ).optional(),
      name: z.string().describe("The name of the dimension.").optional(),
      sortOrder: z.enum(["ASCENDING", "DESCENDING"]).describe(
        "An optional sort order for the dimension column.",
      ).optional(),
    })).describe(
      "The list of per interaction dimensions the report should include.",
    ).optional(),
    reportProperties: z.object({
      clicksLookbackWindow: z.number().int().describe(
        "CM360 checks to see if a click interaction occurred within the specified period of time before a conversion. By default the value is pulled from Floodlight or you can manually enter a custom value. Valid values: 1-90.",
      ).optional(),
      impressionsLookbackWindow: z.number().int().describe(
        "CM360 checks to see if an impression interaction occurred within the specified period of time before a conversion. By default the value is pulled from Floodlight or you can manually enter a custom value. Valid values: 1-90.",
      ).optional(),
      includeAttributedIPConversions: z.boolean().describe(
        "Deprecated: has no effect.",
      ).optional(),
      includeUnattributedCookieConversions: z.boolean().describe(
        "Include conversions of users with a DoubleClick cookie but without an exposure. That means the user did not click or see an ad from the advertiser within the Floodlight group, or that the interaction happened outside the lookback window.",
      ).optional(),
      includeUnattributedIPConversions: z.boolean().describe(
        "Include conversions that have no associated cookies and no exposures. It’s therefore impossible to know how the user was exposed to your ads during the lookback window prior to a conversion.",
      ).optional(),
      maximumClickInteractions: z.number().int().describe(
        "The maximum number of click interactions to include in the report. Advertisers currently paying for E2C reports get up to 200 (100 clicks, 100 impressions). If another advertiser in your network is paying for E2C, you can have up to 5 total exposures per report.",
      ).optional(),
      maximumImpressionInteractions: z.number().int().describe(
        "The maximum number of click interactions to include in the report. Advertisers currently paying for E2C reports get up to 200 (100 clicks, 100 impressions). If another advertiser in your network is paying for E2C, you can have up to 5 total exposures per report.",
      ).optional(),
      maximumInteractionGap: z.number().int().describe(
        "The maximum amount of time that can take place between interactions (clicks or impressions) by the same user. Valid values: 1-90.",
      ).optional(),
      pivotOnInteractionPath: z.boolean().describe(
        "Enable pivoting on interaction path.",
      ).optional(),
    }).describe("The properties of the report.").optional(),
  }).describe('The report criteria for a report of type "PATH_TO_CONVERSION".')
    .optional(),
  reachCriteria: z.object({
    activities: z.object({
      filters: z.array(z.object({
        dimensionName: z.string().describe("The name of the dimension.")
          .optional(),
        etag: z.string().describe(
          "The eTag of this response for caching purposes.",
        ).optional(),
        id: z.string().describe(
          "The ID associated with the value if available.",
        ).optional(),
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
      })).describe(
        'List of activity filters. The dimension values need to be all either of type "dfa:activity" or "dfa:activityGroup".',
      ).optional(),
      kind: z.string().describe(
        "The kind of resource this is, in this case dfareporting#activities.",
      ).optional(),
      metricNames: z.array(z.string()).describe(
        "List of names of floodlight activity metrics.",
      ).optional(),
    }).describe("Represents an activity group.").optional(),
    customRichMediaEvents: z.object({
      filteredEventIds: z.array(z.object({
        dimensionName: z.string().describe("The name of the dimension.")
          .optional(),
        etag: z.string().describe(
          "The eTag of this response for caching purposes.",
        ).optional(),
        id: z.string().describe(
          "The ID associated with the value if available.",
        ).optional(),
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
      })).describe(
        "List of custom rich media event IDs. Dimension values must be all of type dfa:richMediaEventTypeIdAndName.",
      ).optional(),
      kind: z.string().describe(
        "The kind of resource this is, in this case dfareporting#customRichMediaEvents.",
      ).optional(),
    }).describe("Represents a Custom Rich Media Events group.").optional(),
    dateRange: z.object({
      endDate: z.string().optional(),
      kind: z.string().describe(
        "The kind of resource this is, in this case dfareporting#dateRange.",
      ).optional(),
      relativeDateRange: z.enum([
        "TODAY",
        "YESTERDAY",
        "WEEK_TO_DATE",
        "MONTH_TO_DATE",
        "QUARTER_TO_DATE",
        "YEAR_TO_DATE",
        "PREVIOUS_WEEK",
        "PREVIOUS_MONTH",
        "PREVIOUS_QUARTER",
        "PREVIOUS_YEAR",
        "LAST_7_DAYS",
        "LAST_30_DAYS",
        "LAST_90_DAYS",
        "LAST_365_DAYS",
        "LAST_24_MONTHS",
        "LAST_14_DAYS",
        "LAST_60_DAYS",
      ]).describe(
        "The date range relative to the date of when the report is run.",
      ).optional(),
      startDate: z.string().optional(),
    }).describe("Represents a date range.").optional(),
    dimensionFilters: z.array(z.object({
      dimensionName: z.string().describe("The name of the dimension.")
        .optional(),
      etag: z.string().describe(
        "The eTag of this response for caching purposes.",
      ).optional(),
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
    })).describe(
      "The list of filters on which dimensions are filtered. Filters for different dimensions are ANDed, filters for the same dimension are grouped together and ORed.",
    ).optional(),
    dimensions: z.array(z.object({
      kind: z.string().describe(
        "The kind of resource this is, in this case dfareporting#sortedDimension.",
      ).optional(),
      name: z.string().describe("The name of the dimension.").optional(),
      sortOrder: z.enum(["ASCENDING", "DESCENDING"]).describe(
        "An optional sort order for the dimension column.",
      ).optional(),
    })).describe("The list of dimensions the report should include.")
      .optional(),
    metricNames: z.array(z.string()).describe(
      "The list of names of metrics the report should include.",
    ).optional(),
    reachByFrequencyMetricNames: z.array(z.string()).describe(
      "The list of names of Reach By Frequency metrics the report should include.",
    ).optional(),
  }).describe('The report criteria for a report of type "REACH".').optional(),
  schedule: z.object({
    active: z.boolean().describe(
      "Whether the schedule is active or not. Must be set to either true or false.",
    ).optional(),
    every: z.number().int().describe(
      'Defines every how many days, weeks or months the report should be run. Needs to be set when "repeats" is either "DAILY", "WEEKLY" or "MONTHLY".',
    ).optional(),
    expirationDate: z.string().optional(),
    repeats: z.string().describe(
      'The interval for which the report is repeated. Note: - "DAILY" also requires field "every" to be set. - "WEEKLY" also requires fields "every" and "repeatsOnWeekDays" to be set. - "MONTHLY" also requires fields "every" and "runsOnDayOfMonth" to be set.',
    ).optional(),
    repeatsOnWeekDays: z.array(
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
      'List of week days "WEEKLY" on which scheduled reports should run.',
    ).optional(),
    runsOnDayOfMonth: z.enum(["DAY_OF_MONTH", "WEEK_OF_MONTH"]).describe(
      'Enum to define for "MONTHLY" scheduled reports whether reports should be repeated on the same day of the month as "startDate" or the same day of the week of the month. Example: If \'startDate\' is Monday, April 2nd 2012 (2012-04-02), "DAY_OF_MONTH" would run subsequent reports on the 2nd of every Month, and "WEEK_OF_MONTH" would run subsequent reports on the first Monday of the month.',
    ).optional(),
    startDate: z.string().optional(),
    timezone: z.string().describe("The timezone when the report will run.")
      .optional(),
  }).describe(
    "The report's schedule. Can only be set if the report's 'dateRange' is a relative date range and the relative date range is not \"TODAY\".",
  ).optional(),
  subAccountId: z.string().describe(
    "The subaccount ID to which this report belongs if applicable.",
  ).optional(),
  type: z.enum([
    "STANDARD",
    "REACH",
    "PATH_TO_CONVERSION",
    "FLOODLIGHT",
    "CROSS_MEDIA_REACH",
  ]).describe("The type of the report.").optional(),
  profileId: z.string().describe("The Campaign Manager 360 user profile ID.")
    .optional(),
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

/** Swamp extension model for Google Cloud Campaign Manager 360 Reports. Registered at `@swamp/gcp/dfareporting/reports`. */
export const model = {
  type: "@swamp/gcp/dfareporting/reports",
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
      description: "Represents a Report resource.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a reports",
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
        if (g["criteria"] !== undefined) body["criteria"] = g["criteria"];
        if (g["crossMediaReachCriteria"] !== undefined) {
          body["crossMediaReachCriteria"] = g["crossMediaReachCriteria"];
        }
        if (g["delivery"] !== undefined) body["delivery"] = g["delivery"];
        if (g["fileName"] !== undefined) body["fileName"] = g["fileName"];
        if (g["floodlightCriteria"] !== undefined) {
          body["floodlightCriteria"] = g["floodlightCriteria"];
        }
        if (g["format"] !== undefined) body["format"] = g["format"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["lastModifiedTime"] !== undefined) {
          body["lastModifiedTime"] = g["lastModifiedTime"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["ownerProfileId"] !== undefined) {
          body["ownerProfileId"] = g["ownerProfileId"];
        }
        if (g["pathToConversionCriteria"] !== undefined) {
          body["pathToConversionCriteria"] = g["pathToConversionCriteria"];
        }
        if (g["reachCriteria"] !== undefined) {
          body["reachCriteria"] = g["reachCriteria"];
        }
        if (g["schedule"] !== undefined) body["schedule"] = g["schedule"];
        if (g["subAccountId"] !== undefined) {
          body["subAccountId"] = g["subAccountId"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["name"] !== undefined) params["reportId"] = String(g["name"]);
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
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
          credentials,
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
      description: "Get a reports",
      arguments: z.object({
        identifier: z.string().describe("The name of the reports"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        }
        params["reportId"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
          credentials,
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
      description: "Update reports attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        } else if (existing["profileId"]) {
          params["profileId"] = String(existing["profileId"]);
        }
        params["reportId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["accountId"] !== undefined) body["accountId"] = g["accountId"];
        if (g["criteria"] !== undefined) body["criteria"] = g["criteria"];
        if (g["crossMediaReachCriteria"] !== undefined) {
          body["crossMediaReachCriteria"] = g["crossMediaReachCriteria"];
        }
        if (g["delivery"] !== undefined) body["delivery"] = g["delivery"];
        if (g["fileName"] !== undefined) body["fileName"] = g["fileName"];
        if (g["floodlightCriteria"] !== undefined) {
          body["floodlightCriteria"] = g["floodlightCriteria"];
        }
        if (g["format"] !== undefined) body["format"] = g["format"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["lastModifiedTime"] !== undefined) {
          body["lastModifiedTime"] = g["lastModifiedTime"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["ownerProfileId"] !== undefined) {
          body["ownerProfileId"] = g["ownerProfileId"];
        }
        if (g["pathToConversionCriteria"] !== undefined) {
          body["pathToConversionCriteria"] = g["pathToConversionCriteria"];
        }
        if (g["reachCriteria"] !== undefined) {
          body["reachCriteria"] = g["reachCriteria"];
        }
        if (g["schedule"] !== undefined) body["schedule"] = g["schedule"];
        if (g["subAccountId"] !== undefined) {
          body["subAccountId"] = g["subAccountId"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
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
    delete: {
      description: "Delete the reports",
      arguments: z.object({
        identifier: z.string().describe("The name of the reports"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        }
        params["reportId"] = args.identifier;
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
          credentials,
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
      description: "Sync reports state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
          if (g["profileId"] !== undefined) {
            params["profileId"] = String(g["profileId"]);
          } else if (existing["profileId"]) {
            params["profileId"] = String(existing["profileId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["reportId"] = identifier;
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
      description: "List reports resources",
      arguments: z.object({
        maxResults: z.number().describe("Maximum number of results to return.")
          .optional(),
        scope: z.string().describe(
          "The scope that defines which results are returned.",
        ).optional(),
        sortField: z.string().describe("The field by which to sort the list.")
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
        if (args["maxResults"] !== undefined) {
          params["maxResults"] = String(args["maxResults"]);
        }
        if (args["scope"] !== undefined) {
          params["scope"] = String(args["scope"]);
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
          "items",
          (args.maxPages as number | undefined) ?? 10,
          credentials,
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
    run: {
      description: "run",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
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
        params["reportId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "dfareporting.reports.run",
            "path": "userprofiles/{profileId}/reports/{reportId}/run",
            "httpMethod": "POST",
            "parameterOrder": ["profileId", "reportId"],
            "parameters": {
              "profileId": { "location": "path", "required": true },
              "reportId": { "location": "path", "required": true },
              "synchronous": { "location": "query" },
            },
          },
          params,
          {},
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
  },
};
