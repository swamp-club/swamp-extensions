// Auto-generated extension model for @swamp/gcp/dfareporting/placementgroups
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Campaign Manager 360 PlacementGroups.
 *
 * Contains properties of a package or roadblock.
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
  "id": "dfareporting.placementGroups.get",
  "path": "userprofiles/{+profileId}/placementGroups/{+id}",
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
  "id": "dfareporting.placementGroups.insert",
  "path": "userprofiles/{+profileId}/placementGroups",
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
  "id": "dfareporting.placementGroups.update",
  "path": "userprofiles/{+profileId}/placementGroups",
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
  "id": "dfareporting.placementGroups.list",
  "path": "userprofiles/{+profileId}/placementGroups",
  "httpMethod": "GET",
  "parameterOrder": [
    "profileId",
  ],
  "parameters": {
    "activeStatus": {
      "location": "query",
    },
    "advertiserIds": {
      "location": "query",
    },
    "campaignIds": {
      "location": "query",
    },
    "contentCategoryIds": {
      "location": "query",
    },
    "directorySiteIds": {
      "location": "query",
    },
    "ids": {
      "location": "query",
    },
    "maxEndDate": {
      "location": "query",
    },
    "maxResults": {
      "location": "query",
    },
    "maxStartDate": {
      "location": "query",
    },
    "minEndDate": {
      "location": "query",
    },
    "minStartDate": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "placementGroupType": {
      "location": "query",
    },
    "placementStrategyIds": {
      "location": "query",
    },
    "pricingTypes": {
      "location": "query",
    },
    "profileId": {
      "location": "path",
      "required": true,
    },
    "searchString": {
      "location": "query",
    },
    "siteIds": {
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
  accountId: z.string().describe(
    "Account ID of this placement group. This is a read-only field that can be left blank.",
  ).optional(),
  activeStatus: z.enum([
    "PLACEMENT_STATUS_UNKNOWN",
    "PLACEMENT_STATUS_ACTIVE",
    "PLACEMENT_STATUS_INACTIVE",
    "PLACEMENT_STATUS_ARCHIVED",
    "PLACEMENT_STATUS_PERMANENTLY_ARCHIVED",
  ]).describe(
    "Whether this placement group is active, inactive, archived or permanently archived.",
  ).optional(),
  advertiserId: z.string().describe(
    "Advertiser ID of this placement group. This is a required field on insertion.",
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
  campaignId: z.string().describe(
    "Campaign ID of this placement group. This field is required on insertion.",
  ).optional(),
  campaignIdDimensionValue: z.object({
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
  childPlacementIds: z.array(z.string()).describe(
    "IDs of placements which are assigned to this placement group. This is a read-only, auto-generated field.",
  ).optional(),
  comment: z.string().describe("Comments for this placement group.").optional(),
  contentCategoryId: z.string().describe(
    "ID of the content category assigned to this placement group.",
  ).optional(),
  createInfo: z.object({
    time: z.string().describe(
      "Timestamp of the last change in milliseconds since epoch.",
    ).optional(),
  }).describe("Modification timestamp.").optional(),
  directorySiteId: z.string().describe(
    "Directory site ID associated with this placement group. On insert, you must set either this field or the site_id field to specify the site associated with this placement group. This is a required field that is read-only after insertion.",
  ).optional(),
  directorySiteIdDimensionValue: z.object({
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
  externalId: z.string().describe("External ID for this placement.").optional(),
  id: z.string().describe(
    "ID of this placement group. This is a read-only, auto-generated field.",
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
  lastModifiedInfo: z.object({
    time: z.string().describe(
      "Timestamp of the last change in milliseconds since epoch.",
    ).optional(),
  }).describe("Modification timestamp.").optional(),
  name: z.string().describe(
    "Name of this placement group. This is a required field and must be less than 256 characters long.",
  ).optional(),
  placementGroupType: z.enum(["PLACEMENT_PACKAGE", "PLACEMENT_ROADBLOCK"])
    .describe(
      "Type of this placement group. A package is a simple group of placements that acts as a single pricing point for a group of tags. A roadblock is a group of placements that not only acts as a single pricing point, but also assumes that all the tags in it will be served at the same time. A roadblock requires one of its assigned placements to be marked as primary for reporting. This field is required on insertion.",
    ).optional(),
  placementStrategyId: z.string().describe(
    "ID of the placement strategy assigned to this placement group.",
  ).optional(),
  pricingSchedule: z.object({
    capCostOption: z.enum([
      "CAP_COST_NONE",
      "CAP_COST_MONTHLY",
      "CAP_COST_CUMULATIVE",
    ]).describe("Placement cap cost option.").optional(),
    endDate: z.string().optional(),
    flighted: z.boolean().describe(
      "Whether this placement is flighted. If true, pricing periods will be computed automatically.",
    ).optional(),
    floodlightActivityId: z.string().describe(
      "Floodlight activity ID associated with this placement. This field should be set when placement pricing type is set to PRICING_TYPE_CPA.",
    ).optional(),
    pricingPeriods: z.array(z.object({
      endDate: z.string().optional(),
      pricingComment: z.string().describe("Comments for this pricing period.")
        .optional(),
      rateOrCostNanos: z.string().describe(
        "Rate or cost of this pricing period in nanos (i.e., multiplied by 1000000000). Acceptable values are 0 to 1000000000000000000, inclusive.",
      ).optional(),
      startDate: z.string().optional(),
      units: z.string().describe(
        "Units of this pricing period. Acceptable values are 0 to 10000000000, inclusive.",
      ).optional(),
    })).describe("Pricing periods for this placement.").optional(),
    pricingType: z.enum([
      "PRICING_TYPE_CPM",
      "PRICING_TYPE_CPC",
      "PRICING_TYPE_CPA",
      "PRICING_TYPE_FLAT_RATE_IMPRESSIONS",
      "PRICING_TYPE_FLAT_RATE_CLICKS",
      "PRICING_TYPE_CPM_ACTIVEVIEW",
    ]).describe("Placement pricing type. This field is required on insertion.")
      .optional(),
    startDate: z.string().optional(),
    testingStartDate: z.string().optional(),
  }).describe("Pricing Schedule").optional(),
  primaryPlacementId: z.string().describe(
    "ID of the primary placement, used to calculate the media cost of a roadblock (placement group). Modifying this field will automatically modify the primary field on all affected roadblock child placements.",
  ).optional(),
  primaryPlacementIdDimensionValue: z.object({
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
  siteId: z.string().describe(
    "Site ID associated with this placement group. On insert, you must set either this field or the directorySiteId field to specify the site associated with this placement group. This is a required field that is read-only after insertion.",
  ).optional(),
  siteIdDimensionValue: z.object({
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
  subaccountId: z.string().describe(
    "Subaccount ID of this placement group. This is a read-only field that can be left blank.",
  ).optional(),
  profileId: z.string().describe(
    "User profile ID associated with this request.",
  ),
});

const StateSchema = z.object({
  accountId: z.string().optional(),
  activeStatus: z.string().optional(),
  advertiserId: z.string().optional(),
  advertiserIdDimensionValue: z.object({
    dimensionName: z.string(),
    etag: z.string(),
    id: z.string(),
    kind: z.string(),
    matchType: z.string(),
    value: z.string(),
  }).optional(),
  campaignId: z.string().optional(),
  campaignIdDimensionValue: z.object({
    dimensionName: z.string(),
    etag: z.string(),
    id: z.string(),
    kind: z.string(),
    matchType: z.string(),
    value: z.string(),
  }).optional(),
  childPlacementIds: z.array(z.string()).optional(),
  comment: z.string().optional(),
  contentCategoryId: z.string().optional(),
  createInfo: z.object({
    time: z.string(),
  }).optional(),
  directorySiteId: z.string().optional(),
  directorySiteIdDimensionValue: z.object({
    dimensionName: z.string(),
    etag: z.string(),
    id: z.string(),
    kind: z.string(),
    matchType: z.string(),
    value: z.string(),
  }).optional(),
  externalId: z.string().optional(),
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
  lastModifiedInfo: z.object({
    time: z.string(),
  }).optional(),
  name: z.string().optional(),
  placementGroupType: z.string().optional(),
  placementStrategyId: z.string().optional(),
  pricingSchedule: z.object({
    capCostOption: z.string(),
    endDate: z.string(),
    flighted: z.boolean(),
    floodlightActivityId: z.string(),
    pricingPeriods: z.array(z.object({
      endDate: z.string(),
      pricingComment: z.string(),
      rateOrCostNanos: z.string(),
      startDate: z.string(),
      units: z.string(),
    })),
    pricingType: z.string(),
    startDate: z.string(),
    testingStartDate: z.string(),
  }).optional(),
  primaryPlacementId: z.string().optional(),
  primaryPlacementIdDimensionValue: z.object({
    dimensionName: z.string(),
    etag: z.string(),
    id: z.string(),
    kind: z.string(),
    matchType: z.string(),
    value: z.string(),
  }).optional(),
  siteId: z.string().optional(),
  siteIdDimensionValue: z.object({
    dimensionName: z.string(),
    etag: z.string(),
    id: z.string(),
    kind: z.string(),
    matchType: z.string(),
    value: z.string(),
  }).optional(),
  subaccountId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accountId: z.string().describe(
    "Account ID of this placement group. This is a read-only field that can be left blank.",
  ).optional(),
  activeStatus: z.enum([
    "PLACEMENT_STATUS_UNKNOWN",
    "PLACEMENT_STATUS_ACTIVE",
    "PLACEMENT_STATUS_INACTIVE",
    "PLACEMENT_STATUS_ARCHIVED",
    "PLACEMENT_STATUS_PERMANENTLY_ARCHIVED",
  ]).describe(
    "Whether this placement group is active, inactive, archived or permanently archived.",
  ).optional(),
  advertiserId: z.string().describe(
    "Advertiser ID of this placement group. This is a required field on insertion.",
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
  campaignId: z.string().describe(
    "Campaign ID of this placement group. This field is required on insertion.",
  ).optional(),
  campaignIdDimensionValue: z.object({
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
  childPlacementIds: z.array(z.string()).describe(
    "IDs of placements which are assigned to this placement group. This is a read-only, auto-generated field.",
  ).optional(),
  comment: z.string().describe("Comments for this placement group.").optional(),
  contentCategoryId: z.string().describe(
    "ID of the content category assigned to this placement group.",
  ).optional(),
  createInfo: z.object({
    time: z.string().describe(
      "Timestamp of the last change in milliseconds since epoch.",
    ).optional(),
  }).describe("Modification timestamp.").optional(),
  directorySiteId: z.string().describe(
    "Directory site ID associated with this placement group. On insert, you must set either this field or the site_id field to specify the site associated with this placement group. This is a required field that is read-only after insertion.",
  ).optional(),
  directorySiteIdDimensionValue: z.object({
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
  externalId: z.string().describe("External ID for this placement.").optional(),
  id: z.string().describe(
    "ID of this placement group. This is a read-only, auto-generated field.",
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
  lastModifiedInfo: z.object({
    time: z.string().describe(
      "Timestamp of the last change in milliseconds since epoch.",
    ).optional(),
  }).describe("Modification timestamp.").optional(),
  name: z.string().describe(
    "Name of this placement group. This is a required field and must be less than 256 characters long.",
  ).optional(),
  placementGroupType: z.enum(["PLACEMENT_PACKAGE", "PLACEMENT_ROADBLOCK"])
    .describe(
      "Type of this placement group. A package is a simple group of placements that acts as a single pricing point for a group of tags. A roadblock is a group of placements that not only acts as a single pricing point, but also assumes that all the tags in it will be served at the same time. A roadblock requires one of its assigned placements to be marked as primary for reporting. This field is required on insertion.",
    ).optional(),
  placementStrategyId: z.string().describe(
    "ID of the placement strategy assigned to this placement group.",
  ).optional(),
  pricingSchedule: z.object({
    capCostOption: z.enum([
      "CAP_COST_NONE",
      "CAP_COST_MONTHLY",
      "CAP_COST_CUMULATIVE",
    ]).describe("Placement cap cost option.").optional(),
    endDate: z.string().optional(),
    flighted: z.boolean().describe(
      "Whether this placement is flighted. If true, pricing periods will be computed automatically.",
    ).optional(),
    floodlightActivityId: z.string().describe(
      "Floodlight activity ID associated with this placement. This field should be set when placement pricing type is set to PRICING_TYPE_CPA.",
    ).optional(),
    pricingPeriods: z.array(z.object({
      endDate: z.string().optional(),
      pricingComment: z.string().describe("Comments for this pricing period.")
        .optional(),
      rateOrCostNanos: z.string().describe(
        "Rate or cost of this pricing period in nanos (i.e., multiplied by 1000000000). Acceptable values are 0 to 1000000000000000000, inclusive.",
      ).optional(),
      startDate: z.string().optional(),
      units: z.string().describe(
        "Units of this pricing period. Acceptable values are 0 to 10000000000, inclusive.",
      ).optional(),
    })).describe("Pricing periods for this placement.").optional(),
    pricingType: z.enum([
      "PRICING_TYPE_CPM",
      "PRICING_TYPE_CPC",
      "PRICING_TYPE_CPA",
      "PRICING_TYPE_FLAT_RATE_IMPRESSIONS",
      "PRICING_TYPE_FLAT_RATE_CLICKS",
      "PRICING_TYPE_CPM_ACTIVEVIEW",
    ]).describe("Placement pricing type. This field is required on insertion.")
      .optional(),
    startDate: z.string().optional(),
    testingStartDate: z.string().optional(),
  }).describe("Pricing Schedule").optional(),
  primaryPlacementId: z.string().describe(
    "ID of the primary placement, used to calculate the media cost of a roadblock (placement group). Modifying this field will automatically modify the primary field on all affected roadblock child placements.",
  ).optional(),
  primaryPlacementIdDimensionValue: z.object({
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
  siteId: z.string().describe(
    "Site ID associated with this placement group. On insert, you must set either this field or the directorySiteId field to specify the site associated with this placement group. This is a required field that is read-only after insertion.",
  ).optional(),
  siteIdDimensionValue: z.object({
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
  subaccountId: z.string().describe(
    "Subaccount ID of this placement group. This is a read-only field that can be left blank.",
  ).optional(),
  profileId: z.string().describe(
    "User profile ID associated with this request.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Campaign Manager 360 PlacementGroups. Registered at `@swamp/gcp/dfareporting/placementgroups`. */
export const model = {
  type: "@swamp/gcp/dfareporting/placementgroups",
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
      description: "Contains properties of a package or roadblock.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a placementGroups",
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
        if (g["activeStatus"] !== undefined) {
          body["activeStatus"] = g["activeStatus"];
        }
        if (g["advertiserId"] !== undefined) {
          body["advertiserId"] = g["advertiserId"];
        }
        if (g["advertiserIdDimensionValue"] !== undefined) {
          body["advertiserIdDimensionValue"] = g["advertiserIdDimensionValue"];
        }
        if (g["campaignId"] !== undefined) body["campaignId"] = g["campaignId"];
        if (g["campaignIdDimensionValue"] !== undefined) {
          body["campaignIdDimensionValue"] = g["campaignIdDimensionValue"];
        }
        if (g["childPlacementIds"] !== undefined) {
          body["childPlacementIds"] = g["childPlacementIds"];
        }
        if (g["comment"] !== undefined) body["comment"] = g["comment"];
        if (g["contentCategoryId"] !== undefined) {
          body["contentCategoryId"] = g["contentCategoryId"];
        }
        if (g["createInfo"] !== undefined) body["createInfo"] = g["createInfo"];
        if (g["directorySiteId"] !== undefined) {
          body["directorySiteId"] = g["directorySiteId"];
        }
        if (g["directorySiteIdDimensionValue"] !== undefined) {
          body["directorySiteIdDimensionValue"] =
            g["directorySiteIdDimensionValue"];
        }
        if (g["externalId"] !== undefined) body["externalId"] = g["externalId"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["idDimensionValue"] !== undefined) {
          body["idDimensionValue"] = g["idDimensionValue"];
        }
        if (g["lastModifiedInfo"] !== undefined) {
          body["lastModifiedInfo"] = g["lastModifiedInfo"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["placementGroupType"] !== undefined) {
          body["placementGroupType"] = g["placementGroupType"];
        }
        if (g["placementStrategyId"] !== undefined) {
          body["placementStrategyId"] = g["placementStrategyId"];
        }
        if (g["pricingSchedule"] !== undefined) {
          body["pricingSchedule"] = g["pricingSchedule"];
        }
        if (g["primaryPlacementId"] !== undefined) {
          body["primaryPlacementId"] = g["primaryPlacementId"];
        }
        if (g["primaryPlacementIdDimensionValue"] !== undefined) {
          body["primaryPlacementIdDimensionValue"] =
            g["primaryPlacementIdDimensionValue"];
        }
        if (g["siteId"] !== undefined) body["siteId"] = g["siteId"];
        if (g["siteIdDimensionValue"] !== undefined) {
          body["siteIdDimensionValue"] = g["siteIdDimensionValue"];
        }
        if (g["subaccountId"] !== undefined) {
          body["subaccountId"] = g["subaccountId"];
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
      description: "Get a placementGroups",
      arguments: z.object({
        identifier: z.string().describe("The id of the placementGroups"),
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
      description: "Update placementGroups attributes",
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
        if (g["activeStatus"] !== undefined) {
          body["activeStatus"] = g["activeStatus"];
        }
        if (g["advertiserId"] !== undefined) {
          body["advertiserId"] = g["advertiserId"];
        }
        if (g["advertiserIdDimensionValue"] !== undefined) {
          body["advertiserIdDimensionValue"] = g["advertiserIdDimensionValue"];
        }
        if (g["campaignId"] !== undefined) body["campaignId"] = g["campaignId"];
        if (g["campaignIdDimensionValue"] !== undefined) {
          body["campaignIdDimensionValue"] = g["campaignIdDimensionValue"];
        }
        if (g["childPlacementIds"] !== undefined) {
          body["childPlacementIds"] = g["childPlacementIds"];
        }
        if (g["comment"] !== undefined) body["comment"] = g["comment"];
        if (g["contentCategoryId"] !== undefined) {
          body["contentCategoryId"] = g["contentCategoryId"];
        }
        if (g["createInfo"] !== undefined) body["createInfo"] = g["createInfo"];
        if (g["directorySiteId"] !== undefined) {
          body["directorySiteId"] = g["directorySiteId"];
        }
        if (g["directorySiteIdDimensionValue"] !== undefined) {
          body["directorySiteIdDimensionValue"] =
            g["directorySiteIdDimensionValue"];
        }
        if (g["externalId"] !== undefined) body["externalId"] = g["externalId"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["idDimensionValue"] !== undefined) {
          body["idDimensionValue"] = g["idDimensionValue"];
        }
        if (g["lastModifiedInfo"] !== undefined) {
          body["lastModifiedInfo"] = g["lastModifiedInfo"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["placementGroupType"] !== undefined) {
          body["placementGroupType"] = g["placementGroupType"];
        }
        if (g["placementStrategyId"] !== undefined) {
          body["placementStrategyId"] = g["placementStrategyId"];
        }
        if (g["pricingSchedule"] !== undefined) {
          body["pricingSchedule"] = g["pricingSchedule"];
        }
        if (g["primaryPlacementId"] !== undefined) {
          body["primaryPlacementId"] = g["primaryPlacementId"];
        }
        if (g["primaryPlacementIdDimensionValue"] !== undefined) {
          body["primaryPlacementIdDimensionValue"] =
            g["primaryPlacementIdDimensionValue"];
        }
        if (g["siteId"] !== undefined) body["siteId"] = g["siteId"];
        if (g["siteIdDimensionValue"] !== undefined) {
          body["siteIdDimensionValue"] = g["siteIdDimensionValue"];
        }
        if (g["subaccountId"] !== undefined) {
          body["subaccountId"] = g["subaccountId"];
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
      description: "Sync placementGroups state from GCP",
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
