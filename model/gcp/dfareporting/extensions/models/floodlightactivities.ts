// Auto-generated extension model for @swamp/gcp/dfareporting/floodlightactivities
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Campaign Manager 360 FloodlightActivities.
 *
 * Contains properties of a Floodlight activity.
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

const BASE_URL = "https://dfareporting.googleapis.com/dfareporting/v5/";

const GET_CONFIG = {
  "id": "dfareporting.floodlightActivities.get",
  "path": "userprofiles/{+profileId}/floodlightActivities/{+id}",
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
  "id": "dfareporting.floodlightActivities.insert",
  "path": "userprofiles/{+profileId}/floodlightActivities",
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
  "id": "dfareporting.floodlightActivities.update",
  "path": "userprofiles/{+profileId}/floodlightActivities",
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

const DELETE_CONFIG = {
  "id": "dfareporting.floodlightActivities.delete",
  "path": "userprofiles/{+profileId}/floodlightActivities/{+id}",
  "httpMethod": "DELETE",
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

const LIST_CONFIG = {
  "id": "dfareporting.floodlightActivities.list",
  "path": "userprofiles/{+profileId}/floodlightActivities",
  "httpMethod": "GET",
  "parameterOrder": [
    "profileId",
  ],
  "parameters": {
    "advertiserId": {
      "location": "query",
    },
    "floodlightActivityGroupIds": {
      "location": "query",
    },
    "floodlightActivityGroupName": {
      "location": "query",
    },
    "floodlightActivityGroupTagString": {
      "location": "query",
    },
    "floodlightActivityGroupType": {
      "location": "query",
    },
    "floodlightConfigurationId": {
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
    "tagString": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  accountId: z.string().describe(
    "Account ID of this floodlight activity. This is a read-only field that can be left blank.",
  ).optional(),
  advertiserId: z.string().describe(
    "Advertiser ID of this floodlight activity. If this field is left blank, the value will be copied over either from the activity group's advertiser or the existing activity's advertiser.",
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
  attributionEnabled: z.boolean().describe(
    "Whether the activity is enabled for attribution.",
  ).optional(),
  cacheBustingType: z.enum([
    "JAVASCRIPT",
    "ACTIVE_SERVER_PAGE",
    "JSP",
    "PHP",
    "COLD_FUSION",
  ]).describe(
    "Code type used for cache busting in the generated tag. Applicable only when floodlightActivityGroupType is COUNTER and countingMethod is STANDARD_COUNTING or UNIQUE_COUNTING.",
  ).optional(),
  conversionCategory: z.enum([
    "CONVERSION_CATEGORY_DEFAULT",
    "CONVERSION_CATEGORY_PURCHASE",
    "CONVERSION_CATEGORY_SIGNUP",
    "CONVERSION_CATEGORY_PAGE_VIEW",
    "CONVERSION_CATEGORY_DOWNLOAD",
    "CONVERSION_CATEGORY_ADD_TO_CART",
    "CONVERSION_CATEGORY_BEGIN_CHECKOUT",
    "CONVERSION_CATEGORY_SUBSCRIBE_PAID",
    "CONVERSION_CATEGORY_SUBMIT_LEAD_FORM",
    "CONVERSION_CATEGORY_BOOK_APPOINTMENT",
    "CONVERSION_CATEGORY_REQUEST_QUOTE",
    "CONVERSION_CATEGORY_GET_DIRECTIONS",
    "CONVERSION_CATEGORY_OUTBOUND_CLICK",
    "CONVERSION_CATEGORY_CONTACT",
    "CONVERSION_CATEGORY_QUALIFIED_LEAD",
    "CONVERSION_CATEGORY_CONVERTED_LEAD",
    "CONVERSION_CATEGORY_IN_APP_AD_REVENUE",
  ]).describe("Required. The conversion category of the activity.").optional(),
  countingMethod: z.enum([
    "STANDARD_COUNTING",
    "UNIQUE_COUNTING",
    "SESSION_COUNTING",
    "TRANSACTIONS_COUNTING",
    "ITEMS_SOLD_COUNTING",
  ]).describe(
    "Counting method for conversions for this floodlight activity. This is a required field.",
  ).optional(),
  defaultTags: z.array(z.object({
    id: z.string().describe(
      "ID of this dynamic tag. This is a read-only, auto-generated field.",
    ).optional(),
    name: z.string().describe("Name of this tag.").optional(),
    tag: z.string().describe("Tag code.").optional(),
  })).describe("Dynamic floodlight tags.").optional(),
  expectedUrl: z.string().describe(
    "URL where this tag will be deployed. If specified, must be less than 256 characters long.",
  ).optional(),
  floodlightActivityGroupId: z.string().describe(
    "Floodlight activity group ID of this floodlight activity. This is a required field.",
  ).optional(),
  floodlightActivityGroupName: z.string().describe(
    "Name of the associated floodlight activity group. This is a read-only field.",
  ).optional(),
  floodlightActivityGroupTagString: z.string().describe(
    "Tag string of the associated floodlight activity group. This is a read-only field.",
  ).optional(),
  floodlightActivityGroupType: z.enum(["COUNTER", "SALE"]).describe(
    "Type of the associated floodlight activity group. This is a read-only field.",
  ).optional(),
  floodlightConfigurationId: z.string().describe(
    "Floodlight configuration ID of this floodlight activity. If this field is left blank, the value will be copied over either from the activity group's floodlight configuration or from the existing activity's floodlight configuration.",
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
  floodlightTagType: z.enum(["IFRAME", "IMAGE", "GLOBAL_SITE_TAG"]).describe(
    "The type of Floodlight tag this activity will generate. This is a required field.",
  ).optional(),
  id: z.string().describe(
    "ID of this floodlight activity. This is a read-only, auto-generated field.",
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
  name: z.string().describe(
    "Name of this floodlight activity. This is a required field. Must be less than 129 characters long and cannot contain quotes.",
  ).optional(),
  notes: z.string().describe(
    "General notes or implementation instructions for the tag.",
  ).optional(),
  publisherTags: z.array(z.object({
    clickThrough: z.boolean().describe(
      "Whether this tag is applicable only for click-throughs.",
    ).optional(),
    directorySiteId: z.string().describe(
      "Directory site ID of this dynamic tag. This is a write-only field that can be used as an alternative to the siteId field. When this resource is retrieved, only the siteId field will be populated.",
    ).optional(),
    dynamicTag: z.object({
      id: z.string().describe(
        "ID of this dynamic tag. This is a read-only, auto-generated field.",
      ).optional(),
      name: z.string().describe("Name of this tag.").optional(),
      tag: z.string().describe("Tag code.").optional(),
    }).describe("Dynamic Tag").optional(),
    siteId: z.string().describe("Site ID of this dynamic tag.").optional(),
    siteIdDimensionValue: z.object({
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
    viewThrough: z.boolean().describe(
      "Whether this tag is applicable only for view-throughs.",
    ).optional(),
  })).describe("Publisher dynamic floodlight tags.").optional(),
  secure: z.boolean().describe("Whether this tag should use SSL.").optional(),
  sslCompliant: z.boolean().describe(
    "Whether the floodlight activity is SSL-compliant. This is a read-only field, its value detected by the system from the floodlight tags.",
  ).optional(),
  sslRequired: z.boolean().describe(
    "Whether this floodlight activity must be SSL-compliant.",
  ).optional(),
  status: z.enum([
    "ACTIVE",
    "ARCHIVED_AND_DISABLED",
    "ARCHIVED",
    "DISABLED_POLICY",
  ]).describe(
    "The status of the activity. This can only be set to ACTIVE or ARCHIVED_AND_DISABLED. The ARCHIVED status is no longer supported and cannot be set for Floodlight activities. The DISABLED_POLICY status indicates that a Floodlight activity is violating Google policy. Contact your account manager for more information.",
  ).optional(),
  subaccountId: z.string().describe(
    "Subaccount ID of this floodlight activity. This is a read-only field that can be left blank.",
  ).optional(),
  tagFormat: z.enum(["HTML", "XHTML"]).describe(
    "Tag format type for the floodlight activity. If left blank, the tag format will default to HTML.",
  ).optional(),
  tagString: z.string().describe(
    "Value of the cat= parameter in the floodlight tag, which the ad servers use to identify the activity. This is optional: if empty, a new tag string will be generated for you. This string must be 1 to 8 characters long, with valid characters being a-z0-9[ _ ]. This tag string must also be unique among activities of the same activity group. This field is read-only after insertion.",
  ).optional(),
  userDefinedVariableTypes: z.array(
    z.enum([
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
    ]),
  ).describe(
    'List of the user-defined variables used by this conversion tag. These map to the "u[1-100]=" in the tags. Each of these can have a user defined type. Acceptable values are U1 to U100, inclusive.',
  ).optional(),
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
  attributionEnabled: z.boolean().optional(),
  cacheBustingType: z.string().optional(),
  conversionCategory: z.string().optional(),
  countingMethod: z.string().optional(),
  defaultTags: z.array(z.object({
    id: z.string(),
    name: z.string(),
    tag: z.string(),
  })).optional(),
  expectedUrl: z.string().optional(),
  floodlightActivityGroupId: z.string().optional(),
  floodlightActivityGroupName: z.string().optional(),
  floodlightActivityGroupTagString: z.string().optional(),
  floodlightActivityGroupType: z.string().optional(),
  floodlightConfigurationId: z.string().optional(),
  floodlightConfigurationIdDimensionValue: z.object({
    dimensionName: z.string(),
    etag: z.string(),
    id: z.string(),
    kind: z.string(),
    matchType: z.string(),
    value: z.string(),
  }).optional(),
  floodlightTagType: z.string().optional(),
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
  name: z.string().optional(),
  notes: z.string().optional(),
  publisherTags: z.array(z.object({
    clickThrough: z.boolean(),
    directorySiteId: z.string(),
    dynamicTag: z.object({
      id: z.string(),
      name: z.string(),
      tag: z.string(),
    }),
    siteId: z.string(),
    siteIdDimensionValue: z.object({
      dimensionName: z.string(),
      etag: z.string(),
      id: z.string(),
      kind: z.string(),
      matchType: z.string(),
      value: z.string(),
    }),
    viewThrough: z.boolean(),
  })).optional(),
  secure: z.boolean().optional(),
  sslCompliant: z.boolean().optional(),
  sslRequired: z.boolean().optional(),
  status: z.string().optional(),
  subaccountId: z.string().optional(),
  tagFormat: z.string().optional(),
  tagString: z.string().optional(),
  userDefinedVariableTypes: z.array(z.string()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accountId: z.string().describe(
    "Account ID of this floodlight activity. This is a read-only field that can be left blank.",
  ).optional(),
  advertiserId: z.string().describe(
    "Advertiser ID of this floodlight activity. If this field is left blank, the value will be copied over either from the activity group's advertiser or the existing activity's advertiser.",
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
  attributionEnabled: z.boolean().describe(
    "Whether the activity is enabled for attribution.",
  ).optional(),
  cacheBustingType: z.enum([
    "JAVASCRIPT",
    "ACTIVE_SERVER_PAGE",
    "JSP",
    "PHP",
    "COLD_FUSION",
  ]).describe(
    "Code type used for cache busting in the generated tag. Applicable only when floodlightActivityGroupType is COUNTER and countingMethod is STANDARD_COUNTING or UNIQUE_COUNTING.",
  ).optional(),
  conversionCategory: z.enum([
    "CONVERSION_CATEGORY_DEFAULT",
    "CONVERSION_CATEGORY_PURCHASE",
    "CONVERSION_CATEGORY_SIGNUP",
    "CONVERSION_CATEGORY_PAGE_VIEW",
    "CONVERSION_CATEGORY_DOWNLOAD",
    "CONVERSION_CATEGORY_ADD_TO_CART",
    "CONVERSION_CATEGORY_BEGIN_CHECKOUT",
    "CONVERSION_CATEGORY_SUBSCRIBE_PAID",
    "CONVERSION_CATEGORY_SUBMIT_LEAD_FORM",
    "CONVERSION_CATEGORY_BOOK_APPOINTMENT",
    "CONVERSION_CATEGORY_REQUEST_QUOTE",
    "CONVERSION_CATEGORY_GET_DIRECTIONS",
    "CONVERSION_CATEGORY_OUTBOUND_CLICK",
    "CONVERSION_CATEGORY_CONTACT",
    "CONVERSION_CATEGORY_QUALIFIED_LEAD",
    "CONVERSION_CATEGORY_CONVERTED_LEAD",
    "CONVERSION_CATEGORY_IN_APP_AD_REVENUE",
  ]).describe("Required. The conversion category of the activity.").optional(),
  countingMethod: z.enum([
    "STANDARD_COUNTING",
    "UNIQUE_COUNTING",
    "SESSION_COUNTING",
    "TRANSACTIONS_COUNTING",
    "ITEMS_SOLD_COUNTING",
  ]).describe(
    "Counting method for conversions for this floodlight activity. This is a required field.",
  ).optional(),
  defaultTags: z.array(z.object({
    id: z.string().describe(
      "ID of this dynamic tag. This is a read-only, auto-generated field.",
    ).optional(),
    name: z.string().describe("Name of this tag.").optional(),
    tag: z.string().describe("Tag code.").optional(),
  })).describe("Dynamic floodlight tags.").optional(),
  expectedUrl: z.string().describe(
    "URL where this tag will be deployed. If specified, must be less than 256 characters long.",
  ).optional(),
  floodlightActivityGroupId: z.string().describe(
    "Floodlight activity group ID of this floodlight activity. This is a required field.",
  ).optional(),
  floodlightActivityGroupName: z.string().describe(
    "Name of the associated floodlight activity group. This is a read-only field.",
  ).optional(),
  floodlightActivityGroupTagString: z.string().describe(
    "Tag string of the associated floodlight activity group. This is a read-only field.",
  ).optional(),
  floodlightActivityGroupType: z.enum(["COUNTER", "SALE"]).describe(
    "Type of the associated floodlight activity group. This is a read-only field.",
  ).optional(),
  floodlightConfigurationId: z.string().describe(
    "Floodlight configuration ID of this floodlight activity. If this field is left blank, the value will be copied over either from the activity group's floodlight configuration or from the existing activity's floodlight configuration.",
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
  floodlightTagType: z.enum(["IFRAME", "IMAGE", "GLOBAL_SITE_TAG"]).describe(
    "The type of Floodlight tag this activity will generate. This is a required field.",
  ).optional(),
  id: z.string().describe(
    "ID of this floodlight activity. This is a read-only, auto-generated field.",
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
  name: z.string().describe(
    "Name of this floodlight activity. This is a required field. Must be less than 129 characters long and cannot contain quotes.",
  ).optional(),
  notes: z.string().describe(
    "General notes or implementation instructions for the tag.",
  ).optional(),
  publisherTags: z.array(z.object({
    clickThrough: z.boolean().describe(
      "Whether this tag is applicable only for click-throughs.",
    ).optional(),
    directorySiteId: z.string().describe(
      "Directory site ID of this dynamic tag. This is a write-only field that can be used as an alternative to the siteId field. When this resource is retrieved, only the siteId field will be populated.",
    ).optional(),
    dynamicTag: z.object({
      id: z.string().describe(
        "ID of this dynamic tag. This is a read-only, auto-generated field.",
      ).optional(),
      name: z.string().describe("Name of this tag.").optional(),
      tag: z.string().describe("Tag code.").optional(),
    }).describe("Dynamic Tag").optional(),
    siteId: z.string().describe("Site ID of this dynamic tag.").optional(),
    siteIdDimensionValue: z.object({
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
    viewThrough: z.boolean().describe(
      "Whether this tag is applicable only for view-throughs.",
    ).optional(),
  })).describe("Publisher dynamic floodlight tags.").optional(),
  secure: z.boolean().describe("Whether this tag should use SSL.").optional(),
  sslCompliant: z.boolean().describe(
    "Whether the floodlight activity is SSL-compliant. This is a read-only field, its value detected by the system from the floodlight tags.",
  ).optional(),
  sslRequired: z.boolean().describe(
    "Whether this floodlight activity must be SSL-compliant.",
  ).optional(),
  status: z.enum([
    "ACTIVE",
    "ARCHIVED_AND_DISABLED",
    "ARCHIVED",
    "DISABLED_POLICY",
  ]).describe(
    "The status of the activity. This can only be set to ACTIVE or ARCHIVED_AND_DISABLED. The ARCHIVED status is no longer supported and cannot be set for Floodlight activities. The DISABLED_POLICY status indicates that a Floodlight activity is violating Google policy. Contact your account manager for more information.",
  ).optional(),
  subaccountId: z.string().describe(
    "Subaccount ID of this floodlight activity. This is a read-only field that can be left blank.",
  ).optional(),
  tagFormat: z.enum(["HTML", "XHTML"]).describe(
    "Tag format type for the floodlight activity. If left blank, the tag format will default to HTML.",
  ).optional(),
  tagString: z.string().describe(
    "Value of the cat= parameter in the floodlight tag, which the ad servers use to identify the activity. This is optional: if empty, a new tag string will be generated for you. This string must be 1 to 8 characters long, with valid characters being a-z0-9[ _ ]. This tag string must also be unique among activities of the same activity group. This field is read-only after insertion.",
  ).optional(),
  userDefinedVariableTypes: z.array(
    z.enum([
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
    ]),
  ).describe(
    'List of the user-defined variables used by this conversion tag. These map to the "u[1-100]=" in the tags. Each of these can have a user defined type. Acceptable values are U1 to U100, inclusive.',
  ).optional(),
  profileId: z.string().describe(
    "User profile ID associated with this request.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Campaign Manager 360 FloodlightActivities. Registered at `@swamp/gcp/dfareporting/floodlightactivities`. */
export const model = {
  type: "@swamp/gcp/dfareporting/floodlightactivities",
  version: "2026.05.27.1",
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
      toVersion: "2026.05.27.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Contains properties of a Floodlight activity.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a floodlightActivities",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        if (g["attributionEnabled"] !== undefined) {
          body["attributionEnabled"] = g["attributionEnabled"];
        }
        if (g["cacheBustingType"] !== undefined) {
          body["cacheBustingType"] = g["cacheBustingType"];
        }
        if (g["conversionCategory"] !== undefined) {
          body["conversionCategory"] = g["conversionCategory"];
        }
        if (g["countingMethod"] !== undefined) {
          body["countingMethod"] = g["countingMethod"];
        }
        if (g["defaultTags"] !== undefined) {
          body["defaultTags"] = g["defaultTags"];
        }
        if (g["expectedUrl"] !== undefined) {
          body["expectedUrl"] = g["expectedUrl"];
        }
        if (g["floodlightActivityGroupId"] !== undefined) {
          body["floodlightActivityGroupId"] = g["floodlightActivityGroupId"];
        }
        if (g["floodlightActivityGroupName"] !== undefined) {
          body["floodlightActivityGroupName"] =
            g["floodlightActivityGroupName"];
        }
        if (g["floodlightActivityGroupTagString"] !== undefined) {
          body["floodlightActivityGroupTagString"] =
            g["floodlightActivityGroupTagString"];
        }
        if (g["floodlightActivityGroupType"] !== undefined) {
          body["floodlightActivityGroupType"] =
            g["floodlightActivityGroupType"];
        }
        if (g["floodlightConfigurationId"] !== undefined) {
          body["floodlightConfigurationId"] = g["floodlightConfigurationId"];
        }
        if (g["floodlightConfigurationIdDimensionValue"] !== undefined) {
          body["floodlightConfigurationIdDimensionValue"] =
            g["floodlightConfigurationIdDimensionValue"];
        }
        if (g["floodlightTagType"] !== undefined) {
          body["floodlightTagType"] = g["floodlightTagType"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["idDimensionValue"] !== undefined) {
          body["idDimensionValue"] = g["idDimensionValue"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["notes"] !== undefined) body["notes"] = g["notes"];
        if (g["publisherTags"] !== undefined) {
          body["publisherTags"] = g["publisherTags"];
        }
        if (g["secure"] !== undefined) body["secure"] = g["secure"];
        if (g["sslCompliant"] !== undefined) {
          body["sslCompliant"] = g["sslCompliant"];
        }
        if (g["sslRequired"] !== undefined) {
          body["sslRequired"] = g["sslRequired"];
        }
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["subaccountId"] !== undefined) {
          body["subaccountId"] = g["subaccountId"];
        }
        if (g["tagFormat"] !== undefined) body["tagFormat"] = g["tagFormat"];
        if (g["tagString"] !== undefined) body["tagString"] = g["tagString"];
        if (g["userDefinedVariableTypes"] !== undefined) {
          body["userDefinedVariableTypes"] = g["userDefinedVariableTypes"];
        }
        if (g["id"] !== undefined) params["id"] = String(g["id"]);
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
      description: "Get a floodlightActivities",
      arguments: z.object({
        identifier: z.string().describe("The id of the floodlightActivities"),
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
      description: "Update floodlightActivities attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
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
        if (g["attributionEnabled"] !== undefined) {
          body["attributionEnabled"] = g["attributionEnabled"];
        }
        if (g["cacheBustingType"] !== undefined) {
          body["cacheBustingType"] = g["cacheBustingType"];
        }
        if (g["conversionCategory"] !== undefined) {
          body["conversionCategory"] = g["conversionCategory"];
        }
        if (g["countingMethod"] !== undefined) {
          body["countingMethod"] = g["countingMethod"];
        }
        if (g["defaultTags"] !== undefined) {
          body["defaultTags"] = g["defaultTags"];
        }
        if (g["expectedUrl"] !== undefined) {
          body["expectedUrl"] = g["expectedUrl"];
        }
        if (g["floodlightActivityGroupId"] !== undefined) {
          body["floodlightActivityGroupId"] = g["floodlightActivityGroupId"];
        }
        if (g["floodlightActivityGroupName"] !== undefined) {
          body["floodlightActivityGroupName"] =
            g["floodlightActivityGroupName"];
        }
        if (g["floodlightActivityGroupTagString"] !== undefined) {
          body["floodlightActivityGroupTagString"] =
            g["floodlightActivityGroupTagString"];
        }
        if (g["floodlightActivityGroupType"] !== undefined) {
          body["floodlightActivityGroupType"] =
            g["floodlightActivityGroupType"];
        }
        if (g["floodlightConfigurationId"] !== undefined) {
          body["floodlightConfigurationId"] = g["floodlightConfigurationId"];
        }
        if (g["floodlightConfigurationIdDimensionValue"] !== undefined) {
          body["floodlightConfigurationIdDimensionValue"] =
            g["floodlightConfigurationIdDimensionValue"];
        }
        if (g["floodlightTagType"] !== undefined) {
          body["floodlightTagType"] = g["floodlightTagType"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["idDimensionValue"] !== undefined) {
          body["idDimensionValue"] = g["idDimensionValue"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["notes"] !== undefined) body["notes"] = g["notes"];
        if (g["publisherTags"] !== undefined) {
          body["publisherTags"] = g["publisherTags"];
        }
        if (g["secure"] !== undefined) body["secure"] = g["secure"];
        if (g["sslCompliant"] !== undefined) {
          body["sslCompliant"] = g["sslCompliant"];
        }
        if (g["sslRequired"] !== undefined) {
          body["sslRequired"] = g["sslRequired"];
        }
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["subaccountId"] !== undefined) {
          body["subaccountId"] = g["subaccountId"];
        }
        if (g["tagFormat"] !== undefined) body["tagFormat"] = g["tagFormat"];
        if (g["tagString"] !== undefined) body["tagString"] = g["tagString"];
        if (g["userDefinedVariableTypes"] !== undefined) {
          body["userDefinedVariableTypes"] = g["userDefinedVariableTypes"];
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
    delete: {
      description: "Delete the floodlightActivities",
      arguments: z.object({
        identifier: z.string().describe("The id of the floodlightActivities"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        }
        params["id"] = args.identifier;
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
        );
        const instanceName = (g.id?.toString() ?? args.identifier).replace(
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
      description: "Sync floodlightActivities state from GCP",
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
    list: {
      description: "List floodlightActivities resources",
      arguments: z.object({
        advertiserId: z.string().describe(
          "Select only floodlight activities for the specified advertiser ID. Must specify either ids, advertiserId, or floodlightConfigurationId for a non-empty result.",
        ).optional(),
        floodlightActivityGroupIds: z.string().describe(
          "Select only floodlight activities with the specified floodlight activity group IDs.",
        ).optional(),
        floodlightActivityGroupName: z.string().describe(
          "Select only floodlight activities with the specified floodlight activity group name.",
        ).optional(),
        floodlightActivityGroupTagString: z.string().describe(
          "Select only floodlight activities with the specified floodlight activity group tag string.",
        ).optional(),
        floodlightActivityGroupType: z.string().describe(
          "Select only floodlight activities with the specified floodlight activity group type.",
        ).optional(),
        floodlightConfigurationId: z.string().describe(
          "Select only floodlight activities for the specified floodlight configuration ID. Must specify either ids, advertiserId, or floodlightConfigurationId for a non-empty result.",
        ).optional(),
        ids: z.string().describe(
          "Select only floodlight activities with the specified IDs. Must specify either ids, advertiserId, or floodlightConfigurationId for a non-empty result.",
        ).optional(),
        maxResults: z.number().describe("Maximum number of results to return.")
          .optional(),
        searchString: z.string().describe(
          'Allows searching for objects by name or ID. Wildcards (*) are allowed. For example, "floodlightactivity*2015" will return objects with names like "floodlightactivity June 2015", "floodlightactivity April 2015", or simply "floodlightactivity 2015". Most of the searches also add wildcards implicitly at the start and the end of the search string. For example, a search string of "floodlightactivity" will match objects with name "my floodlightactivity activity", "floodlightactivity 2015", or simply "floodlightactivity".',
        ).optional(),
        sortField: z.string().describe("Field by which to sort the list.")
          .optional(),
        sortOrder: z.string().describe("Order of sorted results.").optional(),
        tagString: z.string().describe(
          "Select only floodlight activities with the specified tag string.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        }
        if (args["advertiserId"] !== undefined) {
          params["advertiserId"] = String(args["advertiserId"]);
        }
        if (args["floodlightActivityGroupIds"] !== undefined) {
          params["floodlightActivityGroupIds"] = String(
            args["floodlightActivityGroupIds"],
          );
        }
        if (args["floodlightActivityGroupName"] !== undefined) {
          params["floodlightActivityGroupName"] = String(
            args["floodlightActivityGroupName"],
          );
        }
        if (args["floodlightActivityGroupTagString"] !== undefined) {
          params["floodlightActivityGroupTagString"] = String(
            args["floodlightActivityGroupTagString"],
          );
        }
        if (args["floodlightActivityGroupType"] !== undefined) {
          params["floodlightActivityGroupType"] = String(
            args["floodlightActivityGroupType"],
          );
        }
        if (args["floodlightConfigurationId"] !== undefined) {
          params["floodlightConfigurationId"] = String(
            args["floodlightConfigurationId"],
          );
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
        if (args["tagString"] !== undefined) {
          params["tagString"] = String(args["tagString"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "floodlightActivities",
          (args.maxPages as number | undefined) ?? 10,
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
    generatetag: {
      description: "generatetag",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "dfareporting.floodlightActivities.generatetag",
            "path":
              "userprofiles/{+profileId}/floodlightActivities/generatetag",
            "httpMethod": "POST",
            "parameterOrder": ["profileId"],
            "parameters": {
              "floodlightActivityId": { "location": "query" },
              "profileId": { "location": "path", "required": true },
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
