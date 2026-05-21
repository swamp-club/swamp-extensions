// Auto-generated extension model for @swamp/gcp/dfareporting/campaigns
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Campaign Manager 360 Campaigns.
 *
 * Contains properties of a Campaign Manager campaign.
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
  "id": "dfareporting.campaigns.get",
  "path": "userprofiles/{+profileId}/campaigns/{+id}",
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
  "id": "dfareporting.campaigns.insert",
  "path": "userprofiles/{+profileId}/campaigns",
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
  "id": "dfareporting.campaigns.update",
  "path": "userprofiles/{+profileId}/campaigns",
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
  "id": "dfareporting.campaigns.list",
  "path": "userprofiles/{+profileId}/campaigns",
  "httpMethod": "GET",
  "parameterOrder": [
    "profileId",
  ],
  "parameters": {
    "advertiserGroupIds": {
      "location": "query",
    },
    "advertiserIds": {
      "location": "query",
    },
    "archived": {
      "location": "query",
    },
    "atLeastOneOptimizationActivity": {
      "location": "query",
    },
    "excludedIds": {
      "location": "query",
    },
    "ids": {
      "location": "query",
    },
    "maxResults": {
      "location": "query",
    },
    "overriddenEventTagId": {
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
    "subaccountId": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  accountId: z.string().describe(
    "Account ID of this campaign. This is a read-only field that can be left blank.",
  ).optional(),
  adBlockingConfiguration: z.object({
    enabled: z.boolean().describe(
      "Whether this campaign has enabled ad blocking. When true, ad blocking is enabled for placements in the campaign, but this may be overridden by site and placement settings. When false, ad blocking is disabled for all placements under the campaign, regardless of site and placement settings.",
    ).optional(),
  }).describe("Campaign ad blocking settings.").optional(),
  additionalCreativeOptimizationConfigurations: z.array(z.object({
    id: z.string().describe(
      "ID of this creative optimization config. This field is auto-generated when the campaign is inserted or updated. It can be null for existing campaigns.",
    ).optional(),
    name: z.string().describe(
      "Name of this creative optimization config. This is a required field and must be less than 129 characters long.",
    ).optional(),
    optimizationActivitys: z.array(z.object({
      floodlightActivityId: z.string().describe(
        "Floodlight activity ID of this optimization activity. This is a required field.",
      ).optional(),
      floodlightActivityIdDimensionValue: z.object({
        dimensionName: z.unknown().describe("The name of the dimension.")
          .optional(),
        etag: z.unknown().describe(
          "The eTag of this response for caching purposes.",
        ).optional(),
        id: z.unknown().describe(
          "The ID associated with the value if available.",
        ).optional(),
        kind: z.unknown().describe(
          "The kind of resource this is, in this case dfareporting#dimensionValue.",
        ).optional(),
        matchType: z.unknown().describe(
          "Determines how the 'value' field is matched when filtering. If not specified, defaults to EXACT. If set to WILDCARD_EXPRESSION, '*' is allowed as a placeholder for variable length character sequences, and it can be escaped with a backslash. Note, only paid search dimensions ('dfa:paidSearch*') allow a matchType other than EXACT.",
        ).optional(),
        value: z.unknown().describe("The value of the dimension.").optional(),
      }).describe("Represents a DimensionValue resource.").optional(),
      weight: z.number().int().describe(
        "Weight associated with this optimization. The weight assigned will be understood in proportion to the weights assigned to the other optimization activities. Value must be greater than or equal to 1.",
      ).optional(),
    })).describe(
      "List of optimization activities associated with this configuration.",
    ).optional(),
    optimizationModel: z.enum([
      "CLICK",
      "POST_CLICK",
      "POST_IMPRESSION",
      "POST_CLICK_AND_IMPRESSION",
      "VIDEO_COMPLETION",
    ]).describe("Optimization model for this configuration.").optional(),
  })).describe(
    "Additional creative optimization configurations for the campaign.",
  ).optional(),
  advertiserGroupId: z.string().describe(
    "Advertiser group ID of the associated advertiser.",
  ).optional(),
  advertiserId: z.string().describe(
    "Advertiser ID of this campaign. This is a required field.",
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
  archived: z.boolean().describe("Whether this campaign has been archived.")
    .optional(),
  audienceSegmentGroups: z.array(z.object({
    audienceSegments: z.array(z.object({
      allocation: z.number().int().describe(
        "Weight allocated to this segment. The weight assigned will be understood in proportion to the weights assigned to other segments in the same segment group. Acceptable values are 1 to 1000, inclusive.",
      ).optional(),
      id: z.string().describe(
        "ID of this audience segment. This is a read-only, auto-generated field.",
      ).optional(),
      name: z.string().describe(
        "Name of this audience segment. This is a required field and must be less than 65 characters long.",
      ).optional(),
    })).describe(
      "Audience segments assigned to this group. The number of segments must be between 2 and 100.",
    ).optional(),
    id: z.string().describe(
      "ID of this audience segment group. This is a read-only, auto-generated field.",
    ).optional(),
    name: z.string().describe(
      "Name of this audience segment group. This is a required field and must be less than 65 characters long.",
    ).optional(),
  })).describe(
    "Audience segment groups assigned to this campaign. Cannot have more than 300 segment groups.",
  ).optional(),
  billingInvoiceCode: z.string().describe(
    "Billing invoice code included in the Campaign Manager client billing invoices associated with the campaign.",
  ).optional(),
  clickThroughUrlSuffixProperties: z.object({
    clickThroughUrlSuffix: z.string().describe(
      "Click-through URL suffix to apply to all ads in this entity's scope. Must be less than 128 characters long.",
    ).optional(),
    overrideInheritedSuffix: z.boolean().describe(
      "Whether this entity should override the inherited click-through URL suffix with its own defined value.",
    ).optional(),
  }).describe("Click Through URL Suffix settings.").optional(),
  comment: z.string().describe(
    "Arbitrary comments about this campaign. Must be less than 256 characters long.",
  ).optional(),
  createInfo: z.object({
    time: z.string().describe(
      "Timestamp of the last change in milliseconds since epoch.",
    ).optional(),
  }).describe("Modification timestamp.").optional(),
  creativeGroupIds: z.array(z.string()).describe(
    "List of creative group IDs that are assigned to the campaign.",
  ).optional(),
  creativeOptimizationConfiguration: z.object({
    id: z.string().describe(
      "ID of this creative optimization config. This field is auto-generated when the campaign is inserted or updated. It can be null for existing campaigns.",
    ).optional(),
    name: z.string().describe(
      "Name of this creative optimization config. This is a required field and must be less than 129 characters long.",
    ).optional(),
    optimizationActivitys: z.array(z.object({
      floodlightActivityId: z.string().describe(
        "Floodlight activity ID of this optimization activity. This is a required field.",
      ).optional(),
      floodlightActivityIdDimensionValue: z.object({
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
      }).describe("Represents a DimensionValue resource.").optional(),
      weight: z.number().int().describe(
        "Weight associated with this optimization. The weight assigned will be understood in proportion to the weights assigned to the other optimization activities. Value must be greater than or equal to 1.",
      ).optional(),
    })).describe(
      "List of optimization activities associated with this configuration.",
    ).optional(),
    optimizationModel: z.enum([
      "CLICK",
      "POST_CLICK",
      "POST_IMPRESSION",
      "POST_CLICK_AND_IMPRESSION",
      "VIDEO_COMPLETION",
    ]).describe("Optimization model for this configuration.").optional(),
  }).describe("Creative optimization settings.").optional(),
  defaultClickThroughEventTagProperties: z.object({
    defaultClickThroughEventTagId: z.string().describe(
      "ID of the click-through event tag to apply to all ads in this entity's scope.",
    ).optional(),
    overrideInheritedEventTag: z.boolean().describe(
      "Whether this entity should override the inherited default click-through event tag with its own defined value.",
    ).optional(),
  }).describe(
    "Properties of inheriting and overriding the default click-through event tag. A campaign may override the event tag defined at the advertiser level, and an ad may also override the campaign's setting further.",
  ).optional(),
  defaultLandingPageId: z.string().describe(
    "The default landing page ID for this campaign.",
  ).optional(),
  endDate: z.string().optional(),
  euPoliticalAdsDeclaration: z.enum([
    "CONTAINS_EU_POLITICAL_ADS",
    "DOES_NOT_CONTAIN_EU_POLITICAL_ADS",
  ]).describe(
    "Optional. Whether the campaign has EU political ads. Campaign Manager 360 doesn't allow campaigns with EU political ads to serve in the EU. They can still serve in other regions.",
  ).optional(),
  eventTagOverrides: z.array(z.object({
    enabled: z.boolean().describe("Whether this override is enabled.")
      .optional(),
    id: z.string().describe(
      "ID of this event tag override. This is a read-only, auto-generated field.",
    ).optional(),
  })).describe(
    "Overrides that can be used to activate or deactivate advertiser event tags.",
  ).optional(),
  externalId: z.string().describe("External ID for this campaign.").optional(),
  id: z.string().describe(
    "ID of this campaign. This is a read-only auto-generated field.",
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
    ]).describe(".").optional(),
    measurementPartner: z.enum(["NONE", "INTEGRAL_AD_SCIENCE", "DOUBLE_VERIFY"])
      .describe("Measurement partner used for tag wrapping.").optional(),
    partnerCampaignId: z.string().describe(
      "Partner campaign ID needed for establishing linking with Measurement partner.",
    ).optional(),
  }).optional(),
  name: z.string().describe(
    "Name of this campaign. This is a required field and must be less than 512 characters long and unique among campaigns of the same advertiser.",
  ).optional(),
  startDate: z.string().optional(),
  subaccountId: z.string().describe(
    "Subaccount ID of this campaign. This is a read-only field that can be left blank.",
  ).optional(),
  profileId: z.string().describe(
    "User profile ID associated with this request.",
  ),
});

const StateSchema = z.object({
  accountId: z.string().optional(),
  adBlockingConfiguration: z.object({
    enabled: z.boolean(),
  }).optional(),
  additionalCreativeOptimizationConfigurations: z.array(z.object({
    id: z.string(),
    name: z.string(),
    optimizationActivitys: z.array(z.object({
      floodlightActivityId: z.string(),
      floodlightActivityIdDimensionValue: z.object({
        dimensionName: z.unknown(),
        etag: z.unknown(),
        id: z.unknown(),
        kind: z.unknown(),
        matchType: z.unknown(),
        value: z.unknown(),
      }),
      weight: z.number(),
    })),
    optimizationModel: z.string(),
  })).optional(),
  advertiserGroupId: z.string().optional(),
  advertiserId: z.string().optional(),
  advertiserIdDimensionValue: z.object({
    dimensionName: z.string(),
    etag: z.string(),
    id: z.string(),
    kind: z.string(),
    matchType: z.string(),
    value: z.string(),
  }).optional(),
  archived: z.boolean().optional(),
  audienceSegmentGroups: z.array(z.object({
    audienceSegments: z.array(z.object({
      allocation: z.number(),
      id: z.string(),
      name: z.string(),
    })),
    id: z.string(),
    name: z.string(),
  })).optional(),
  billingInvoiceCode: z.string().optional(),
  clickThroughUrlSuffixProperties: z.object({
    clickThroughUrlSuffix: z.string(),
    overrideInheritedSuffix: z.boolean(),
  }).optional(),
  comment: z.string().optional(),
  createInfo: z.object({
    time: z.string(),
  }).optional(),
  creativeGroupIds: z.array(z.string()).optional(),
  creativeOptimizationConfiguration: z.object({
    id: z.string(),
    name: z.string(),
    optimizationActivitys: z.array(z.object({
      floodlightActivityId: z.string(),
      floodlightActivityIdDimensionValue: z.object({
        dimensionName: z.string(),
        etag: z.string(),
        id: z.string(),
        kind: z.string(),
        matchType: z.string(),
        value: z.string(),
      }),
      weight: z.number(),
    })),
    optimizationModel: z.string(),
  }).optional(),
  defaultClickThroughEventTagProperties: z.object({
    defaultClickThroughEventTagId: z.string(),
    overrideInheritedEventTag: z.boolean(),
  }).optional(),
  defaultLandingPageId: z.string().optional(),
  endDate: z.string().optional(),
  euPoliticalAdsDeclaration: z.string().optional(),
  eventTagOverrides: z.array(z.object({
    enabled: z.boolean(),
    id: z.string(),
  })).optional(),
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
  measurementPartnerLink: z.object({
    linkStatus: z.string(),
    measurementPartner: z.string(),
    partnerCampaignId: z.string(),
  }).optional(),
  name: z.string().optional(),
  startDate: z.string().optional(),
  subaccountId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accountId: z.string().describe(
    "Account ID of this campaign. This is a read-only field that can be left blank.",
  ).optional(),
  adBlockingConfiguration: z.object({
    enabled: z.boolean().describe(
      "Whether this campaign has enabled ad blocking. When true, ad blocking is enabled for placements in the campaign, but this may be overridden by site and placement settings. When false, ad blocking is disabled for all placements under the campaign, regardless of site and placement settings.",
    ).optional(),
  }).describe("Campaign ad blocking settings.").optional(),
  additionalCreativeOptimizationConfigurations: z.array(z.object({
    id: z.string().describe(
      "ID of this creative optimization config. This field is auto-generated when the campaign is inserted or updated. It can be null for existing campaigns.",
    ).optional(),
    name: z.string().describe(
      "Name of this creative optimization config. This is a required field and must be less than 129 characters long.",
    ).optional(),
    optimizationActivitys: z.array(z.object({
      floodlightActivityId: z.string().describe(
        "Floodlight activity ID of this optimization activity. This is a required field.",
      ).optional(),
      floodlightActivityIdDimensionValue: z.object({
        dimensionName: z.unknown().describe("The name of the dimension.")
          .optional(),
        etag: z.unknown().describe(
          "The eTag of this response for caching purposes.",
        ).optional(),
        id: z.unknown().describe(
          "The ID associated with the value if available.",
        ).optional(),
        kind: z.unknown().describe(
          "The kind of resource this is, in this case dfareporting#dimensionValue.",
        ).optional(),
        matchType: z.unknown().describe(
          "Determines how the 'value' field is matched when filtering. If not specified, defaults to EXACT. If set to WILDCARD_EXPRESSION, '*' is allowed as a placeholder for variable length character sequences, and it can be escaped with a backslash. Note, only paid search dimensions ('dfa:paidSearch*') allow a matchType other than EXACT.",
        ).optional(),
        value: z.unknown().describe("The value of the dimension.").optional(),
      }).describe("Represents a DimensionValue resource.").optional(),
      weight: z.number().int().describe(
        "Weight associated with this optimization. The weight assigned will be understood in proportion to the weights assigned to the other optimization activities. Value must be greater than or equal to 1.",
      ).optional(),
    })).describe(
      "List of optimization activities associated with this configuration.",
    ).optional(),
    optimizationModel: z.enum([
      "CLICK",
      "POST_CLICK",
      "POST_IMPRESSION",
      "POST_CLICK_AND_IMPRESSION",
      "VIDEO_COMPLETION",
    ]).describe("Optimization model for this configuration.").optional(),
  })).describe(
    "Additional creative optimization configurations for the campaign.",
  ).optional(),
  advertiserGroupId: z.string().describe(
    "Advertiser group ID of the associated advertiser.",
  ).optional(),
  advertiserId: z.string().describe(
    "Advertiser ID of this campaign. This is a required field.",
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
  archived: z.boolean().describe("Whether this campaign has been archived.")
    .optional(),
  audienceSegmentGroups: z.array(z.object({
    audienceSegments: z.array(z.object({
      allocation: z.number().int().describe(
        "Weight allocated to this segment. The weight assigned will be understood in proportion to the weights assigned to other segments in the same segment group. Acceptable values are 1 to 1000, inclusive.",
      ).optional(),
      id: z.string().describe(
        "ID of this audience segment. This is a read-only, auto-generated field.",
      ).optional(),
      name: z.string().describe(
        "Name of this audience segment. This is a required field and must be less than 65 characters long.",
      ).optional(),
    })).describe(
      "Audience segments assigned to this group. The number of segments must be between 2 and 100.",
    ).optional(),
    id: z.string().describe(
      "ID of this audience segment group. This is a read-only, auto-generated field.",
    ).optional(),
    name: z.string().describe(
      "Name of this audience segment group. This is a required field and must be less than 65 characters long.",
    ).optional(),
  })).describe(
    "Audience segment groups assigned to this campaign. Cannot have more than 300 segment groups.",
  ).optional(),
  billingInvoiceCode: z.string().describe(
    "Billing invoice code included in the Campaign Manager client billing invoices associated with the campaign.",
  ).optional(),
  clickThroughUrlSuffixProperties: z.object({
    clickThroughUrlSuffix: z.string().describe(
      "Click-through URL suffix to apply to all ads in this entity's scope. Must be less than 128 characters long.",
    ).optional(),
    overrideInheritedSuffix: z.boolean().describe(
      "Whether this entity should override the inherited click-through URL suffix with its own defined value.",
    ).optional(),
  }).describe("Click Through URL Suffix settings.").optional(),
  comment: z.string().describe(
    "Arbitrary comments about this campaign. Must be less than 256 characters long.",
  ).optional(),
  createInfo: z.object({
    time: z.string().describe(
      "Timestamp of the last change in milliseconds since epoch.",
    ).optional(),
  }).describe("Modification timestamp.").optional(),
  creativeGroupIds: z.array(z.string()).describe(
    "List of creative group IDs that are assigned to the campaign.",
  ).optional(),
  creativeOptimizationConfiguration: z.object({
    id: z.string().describe(
      "ID of this creative optimization config. This field is auto-generated when the campaign is inserted or updated. It can be null for existing campaigns.",
    ).optional(),
    name: z.string().describe(
      "Name of this creative optimization config. This is a required field and must be less than 129 characters long.",
    ).optional(),
    optimizationActivitys: z.array(z.object({
      floodlightActivityId: z.string().describe(
        "Floodlight activity ID of this optimization activity. This is a required field.",
      ).optional(),
      floodlightActivityIdDimensionValue: z.object({
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
      }).describe("Represents a DimensionValue resource.").optional(),
      weight: z.number().int().describe(
        "Weight associated with this optimization. The weight assigned will be understood in proportion to the weights assigned to the other optimization activities. Value must be greater than or equal to 1.",
      ).optional(),
    })).describe(
      "List of optimization activities associated with this configuration.",
    ).optional(),
    optimizationModel: z.enum([
      "CLICK",
      "POST_CLICK",
      "POST_IMPRESSION",
      "POST_CLICK_AND_IMPRESSION",
      "VIDEO_COMPLETION",
    ]).describe("Optimization model for this configuration.").optional(),
  }).describe("Creative optimization settings.").optional(),
  defaultClickThroughEventTagProperties: z.object({
    defaultClickThroughEventTagId: z.string().describe(
      "ID of the click-through event tag to apply to all ads in this entity's scope.",
    ).optional(),
    overrideInheritedEventTag: z.boolean().describe(
      "Whether this entity should override the inherited default click-through event tag with its own defined value.",
    ).optional(),
  }).describe(
    "Properties of inheriting and overriding the default click-through event tag. A campaign may override the event tag defined at the advertiser level, and an ad may also override the campaign's setting further.",
  ).optional(),
  defaultLandingPageId: z.string().describe(
    "The default landing page ID for this campaign.",
  ).optional(),
  endDate: z.string().optional(),
  euPoliticalAdsDeclaration: z.enum([
    "CONTAINS_EU_POLITICAL_ADS",
    "DOES_NOT_CONTAIN_EU_POLITICAL_ADS",
  ]).describe(
    "Optional. Whether the campaign has EU political ads. Campaign Manager 360 doesn't allow campaigns with EU political ads to serve in the EU. They can still serve in other regions.",
  ).optional(),
  eventTagOverrides: z.array(z.object({
    enabled: z.boolean().describe("Whether this override is enabled.")
      .optional(),
    id: z.string().describe(
      "ID of this event tag override. This is a read-only, auto-generated field.",
    ).optional(),
  })).describe(
    "Overrides that can be used to activate or deactivate advertiser event tags.",
  ).optional(),
  externalId: z.string().describe("External ID for this campaign.").optional(),
  id: z.string().describe(
    "ID of this campaign. This is a read-only auto-generated field.",
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
    ]).describe(".").optional(),
    measurementPartner: z.enum(["NONE", "INTEGRAL_AD_SCIENCE", "DOUBLE_VERIFY"])
      .describe("Measurement partner used for tag wrapping.").optional(),
    partnerCampaignId: z.string().describe(
      "Partner campaign ID needed for establishing linking with Measurement partner.",
    ).optional(),
  }).optional(),
  name: z.string().describe(
    "Name of this campaign. This is a required field and must be less than 512 characters long and unique among campaigns of the same advertiser.",
  ).optional(),
  startDate: z.string().optional(),
  subaccountId: z.string().describe(
    "Subaccount ID of this campaign. This is a read-only field that can be left blank.",
  ).optional(),
  profileId: z.string().describe(
    "User profile ID associated with this request.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Campaign Manager 360 Campaigns. Registered at `@swamp/gcp/dfareporting/campaigns`. */
export const model = {
  type: "@swamp/gcp/dfareporting/campaigns",
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
      description: "Contains properties of a Campaign Manager campaign.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a campaigns",
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
        if (g["adBlockingConfiguration"] !== undefined) {
          body["adBlockingConfiguration"] = g["adBlockingConfiguration"];
        }
        if (g["additionalCreativeOptimizationConfigurations"] !== undefined) {
          body["additionalCreativeOptimizationConfigurations"] =
            g["additionalCreativeOptimizationConfigurations"];
        }
        if (g["advertiserGroupId"] !== undefined) {
          body["advertiserGroupId"] = g["advertiserGroupId"];
        }
        if (g["advertiserId"] !== undefined) {
          body["advertiserId"] = g["advertiserId"];
        }
        if (g["advertiserIdDimensionValue"] !== undefined) {
          body["advertiserIdDimensionValue"] = g["advertiserIdDimensionValue"];
        }
        if (g["archived"] !== undefined) body["archived"] = g["archived"];
        if (g["audienceSegmentGroups"] !== undefined) {
          body["audienceSegmentGroups"] = g["audienceSegmentGroups"];
        }
        if (g["billingInvoiceCode"] !== undefined) {
          body["billingInvoiceCode"] = g["billingInvoiceCode"];
        }
        if (g["clickThroughUrlSuffixProperties"] !== undefined) {
          body["clickThroughUrlSuffixProperties"] =
            g["clickThroughUrlSuffixProperties"];
        }
        if (g["comment"] !== undefined) body["comment"] = g["comment"];
        if (g["createInfo"] !== undefined) body["createInfo"] = g["createInfo"];
        if (g["creativeGroupIds"] !== undefined) {
          body["creativeGroupIds"] = g["creativeGroupIds"];
        }
        if (g["creativeOptimizationConfiguration"] !== undefined) {
          body["creativeOptimizationConfiguration"] =
            g["creativeOptimizationConfiguration"];
        }
        if (g["defaultClickThroughEventTagProperties"] !== undefined) {
          body["defaultClickThroughEventTagProperties"] =
            g["defaultClickThroughEventTagProperties"];
        }
        if (g["defaultLandingPageId"] !== undefined) {
          body["defaultLandingPageId"] = g["defaultLandingPageId"];
        }
        if (g["endDate"] !== undefined) body["endDate"] = g["endDate"];
        if (g["euPoliticalAdsDeclaration"] !== undefined) {
          body["euPoliticalAdsDeclaration"] = g["euPoliticalAdsDeclaration"];
        }
        if (g["eventTagOverrides"] !== undefined) {
          body["eventTagOverrides"] = g["eventTagOverrides"];
        }
        if (g["externalId"] !== undefined) body["externalId"] = g["externalId"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["idDimensionValue"] !== undefined) {
          body["idDimensionValue"] = g["idDimensionValue"];
        }
        if (g["lastModifiedInfo"] !== undefined) {
          body["lastModifiedInfo"] = g["lastModifiedInfo"];
        }
        if (g["measurementPartnerLink"] !== undefined) {
          body["measurementPartnerLink"] = g["measurementPartnerLink"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["startDate"] !== undefined) body["startDate"] = g["startDate"];
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
      description: "Get a campaigns",
      arguments: z.object({
        identifier: z.string().describe("The id of the campaigns"),
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
      description: "Update campaigns attributes",
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
        if (g["adBlockingConfiguration"] !== undefined) {
          body["adBlockingConfiguration"] = g["adBlockingConfiguration"];
        }
        if (g["additionalCreativeOptimizationConfigurations"] !== undefined) {
          body["additionalCreativeOptimizationConfigurations"] =
            g["additionalCreativeOptimizationConfigurations"];
        }
        if (g["advertiserGroupId"] !== undefined) {
          body["advertiserGroupId"] = g["advertiserGroupId"];
        }
        if (g["advertiserId"] !== undefined) {
          body["advertiserId"] = g["advertiserId"];
        }
        if (g["advertiserIdDimensionValue"] !== undefined) {
          body["advertiserIdDimensionValue"] = g["advertiserIdDimensionValue"];
        }
        if (g["archived"] !== undefined) body["archived"] = g["archived"];
        if (g["audienceSegmentGroups"] !== undefined) {
          body["audienceSegmentGroups"] = g["audienceSegmentGroups"];
        }
        if (g["billingInvoiceCode"] !== undefined) {
          body["billingInvoiceCode"] = g["billingInvoiceCode"];
        }
        if (g["clickThroughUrlSuffixProperties"] !== undefined) {
          body["clickThroughUrlSuffixProperties"] =
            g["clickThroughUrlSuffixProperties"];
        }
        if (g["comment"] !== undefined) body["comment"] = g["comment"];
        if (g["createInfo"] !== undefined) body["createInfo"] = g["createInfo"];
        if (g["creativeGroupIds"] !== undefined) {
          body["creativeGroupIds"] = g["creativeGroupIds"];
        }
        if (g["creativeOptimizationConfiguration"] !== undefined) {
          body["creativeOptimizationConfiguration"] =
            g["creativeOptimizationConfiguration"];
        }
        if (g["defaultClickThroughEventTagProperties"] !== undefined) {
          body["defaultClickThroughEventTagProperties"] =
            g["defaultClickThroughEventTagProperties"];
        }
        if (g["defaultLandingPageId"] !== undefined) {
          body["defaultLandingPageId"] = g["defaultLandingPageId"];
        }
        if (g["endDate"] !== undefined) body["endDate"] = g["endDate"];
        if (g["euPoliticalAdsDeclaration"] !== undefined) {
          body["euPoliticalAdsDeclaration"] = g["euPoliticalAdsDeclaration"];
        }
        if (g["eventTagOverrides"] !== undefined) {
          body["eventTagOverrides"] = g["eventTagOverrides"];
        }
        if (g["externalId"] !== undefined) body["externalId"] = g["externalId"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["idDimensionValue"] !== undefined) {
          body["idDimensionValue"] = g["idDimensionValue"];
        }
        if (g["lastModifiedInfo"] !== undefined) {
          body["lastModifiedInfo"] = g["lastModifiedInfo"];
        }
        if (g["measurementPartnerLink"] !== undefined) {
          body["measurementPartnerLink"] = g["measurementPartnerLink"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["startDate"] !== undefined) body["startDate"] = g["startDate"];
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
      description: "Sync campaigns state from GCP",
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
