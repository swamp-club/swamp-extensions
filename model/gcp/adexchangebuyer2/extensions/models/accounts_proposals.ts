// Auto-generated extension model for @swamp/gcp/adexchangebuyer2/accounts-proposals
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Ad Exchange Buyer Accounts.Proposals.
 *
 * Represents a proposal in the Marketplace. A proposal is the unit of negotiation between a seller and a buyer and contains deals which are served. Note: You can't update, create, or otherwise modify Private Auction deals through the API. Fields are updatable unless noted otherwise.
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
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://adexchangebuyer.googleapis.com/";

const GET_CONFIG = {
  "id": "adexchangebuyer2.accounts.proposals.get",
  "path": "v2beta1/accounts/{accountId}/proposals/{proposalId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "accountId",
    "proposalId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "proposalId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "adexchangebuyer2.accounts.proposals.create",
  "path": "v2beta1/accounts/{accountId}/proposals",
  "httpMethod": "POST",
  "parameterOrder": [
    "accountId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "adexchangebuyer2.accounts.proposals.update",
  "path": "v2beta1/accounts/{accountId}/proposals/{proposalId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "accountId",
    "proposalId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "proposalId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "adexchangebuyer2.accounts.proposals.list",
  "path": "v2beta1/accounts/{accountId}/proposals",
  "httpMethod": "GET",
  "parameterOrder": [
    "accountId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "filter": {
      "location": "query",
    },
    "filterSyntax": {
      "location": "query",
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  billedBuyer: z.object({
    accountId: z.string().describe("Authorized Buyers account ID of the buyer.")
      .optional(),
  }).describe(
    "Represents a buyer of inventory. Each buyer is identified by a unique Authorized Buyers account ID.",
  ).optional(),
  buyer: z.object({
    accountId: z.string().describe("Authorized Buyers account ID of the buyer.")
      .optional(),
  }).describe(
    "Represents a buyer of inventory. Each buyer is identified by a unique Authorized Buyers account ID.",
  ).optional(),
  buyerContacts: z.array(z.object({
    email: z.string().describe("Email address for the contact.").optional(),
    name: z.string().describe("The name of the contact.").optional(),
  })).describe("Contact information for the buyer.").optional(),
  buyerPrivateData: z.object({
    referenceId: z.string().describe(
      "A buyer or seller specified reference ID. This can be queried in the list operations (max-length: 1024 unicode code units).",
    ).optional(),
  }).describe(
    "Buyers are allowed to store certain types of private data in a proposal/deal.",
  ).optional(),
  deals: z.array(z.object({
    availableEndTime: z.string().describe(
      "Proposed flight end time of the deal. This will generally be stored in a granularity of a second. A value is not required for Private Auction deals or Preferred Deals.",
    ).optional(),
    availableStartTime: z.string().describe(
      "Optional. Proposed flight start time of the deal. This will generally be stored in the granularity of one second since deal serving starts at seconds boundary. Any time specified with more granularity (for example, in milliseconds) will be truncated towards the start of time in seconds.",
    ).optional(),
    buyerPrivateData: z.object({
      referenceId: z.string().describe(
        "A buyer or seller specified reference ID. This can be queried in the list operations (max-length: 1024 unicode code units).",
      ).optional(),
    }).describe(
      "Buyers are allowed to store certain types of private data in a proposal/deal.",
    ).optional(),
    createProductId: z.string().describe(
      "The product ID from which this deal was created. Note: This field may be set only when creating the resource. Modifying this field while updating the resource will result in an error.",
    ).optional(),
    createProductRevision: z.string().describe(
      "Optional. Revision number of the product that the deal was created from. If present on create, and the server `product_revision` has advanced since the passed-in `create_product_revision`, an `ABORTED` error will be returned. Note: This field may be set only when creating the resource. Modifying this field while updating the resource will result in an error.",
    ).optional(),
    createTime: z.string().describe(
      "Output only. The time of the deal creation.",
    ).optional(),
    creativePreApprovalPolicy: z.enum([
      "CREATIVE_PRE_APPROVAL_POLICY_UNSPECIFIED",
      "SELLER_PRE_APPROVAL_REQUIRED",
      "SELLER_PRE_APPROVAL_NOT_REQUIRED",
    ]).describe("Output only. Specifies the creative pre-approval policy.")
      .optional(),
    creativeRestrictions: z.object({
      creativeFormat: z.enum([
        "CREATIVE_FORMAT_UNSPECIFIED",
        "DISPLAY",
        "VIDEO",
      ]).describe(
        "The format of the environment that the creatives will be displayed in.",
      ).optional(),
      creativeSpecifications: z.array(z.object({
        creativeCompanionSizes: z.unknown().describe(
          "Companion sizes may be filled in only when this is a video creative.",
        ).optional(),
        creativeSize: z.unknown().describe(
          "Represents size of a single ad slot, or a creative.",
        ).optional(),
      })).optional(),
      skippableAdType: z.enum([
        "SKIPPABLE_AD_TYPE_UNSPECIFIED",
        "SKIPPABLE",
        "INSTREAM_SELECT",
        "NOT_SKIPPABLE",
      ]).describe(
        "Skippable video ads allow viewers to skip ads after 5 seconds.",
      ).optional(),
    }).describe(
      "Represents creative restrictions associated to Programmatic Guaranteed/ Preferred Deal in Ad Manager. This doesn't apply to Private Auction and AdX Preferred Deals.",
    ).optional(),
    creativeSafeFrameCompatibility: z.enum([
      "CREATIVE_SAFE_FRAME_COMPATIBILITY_UNSPECIFIED",
      "COMPATIBLE",
      "INCOMPATIBLE",
    ]).describe(
      "Output only. Specifies whether the creative is safeFrame compatible.",
    ).optional(),
    dealId: z.string().describe(
      "Output only. A unique deal ID for the deal (server-assigned).",
    ).optional(),
    dealServingMetadata: z.object({
      dealPauseStatus: z.object({
        buyerPauseReason: z.string().describe(
          "The buyer's reason for pausing, if the buyer paused the deal.",
        ).optional(),
        firstPausedBy: z.enum([
          "BUYER_SELLER_ROLE_UNSPECIFIED",
          "BUYER",
          "SELLER",
        ]).describe("The role of the person who first paused this deal.")
          .optional(),
        hasBuyerPaused: z.boolean().describe(
          "True, if the buyer has paused the deal unilaterally.",
        ).optional(),
        hasSellerPaused: z.boolean().describe(
          "True, if the seller has paused the deal unilaterally.",
        ).optional(),
        sellerPauseReason: z.string().describe(
          "The seller's reason for pausing, if the seller paused the deal.",
        ).optional(),
      }).describe(
        "Tracks which parties (if any) have paused a deal. The deal is considered paused if either hasBuyerPaused or hasSellPaused is true.",
      ).optional(),
    }).describe("Message captures metadata about the serving status of a deal.")
      .optional(),
    dealTerms: z.object({
      brandingType: z.enum([
        "BRANDING_TYPE_UNSPECIFIED",
        "BRANDED",
        "SEMI_TRANSPARENT",
      ]).describe("Visibility of the URL in bid requests. (default: BRANDED)")
        .optional(),
      description: z.string().describe(
        "Publisher provided description for the terms.",
      ).optional(),
      estimatedGrossSpend: z.object({
        amount: z.object({
          currencyCode: z.unknown().describe(
            "The three-letter currency code defined in ISO 4217.",
          ).optional(),
          nanos: z.unknown().describe(
            "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
          ).optional(),
          units: z.unknown().describe(
            'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
          ).optional(),
        }).describe("Represents an amount of money with its currency type.")
          .optional(),
        pricingType: z.enum([
          "PRICING_TYPE_UNSPECIFIED",
          "COST_PER_MILLE",
          "COST_PER_DAY",
        ]).describe("The pricing type for the deal/product. (default: CPM)")
          .optional(),
      }).describe("Represents a price and a pricing type for a product / deal.")
        .optional(),
      estimatedImpressionsPerDay: z.string().describe(
        "Non-binding estimate of the impressions served per day. Can be set by buyer or seller.",
      ).optional(),
      guaranteedFixedPriceTerms: z.object({
        fixedPrices: z.array(z.unknown()).describe(
          "Fixed price for the specified buyer.",
        ).optional(),
        guaranteedImpressions: z.string().describe(
          "Guaranteed impressions as a percentage. This is the percentage of guaranteed looks that the buyer is guaranteeing to buy.",
        ).optional(),
        guaranteedLooks: z.string().describe(
          "Count of guaranteed looks. Required for deal, optional for product. For CPD deals, buyer changes to guaranteed_looks will be ignored.",
        ).optional(),
        impressionCap: z.string().describe(
          "The lifetime impression cap for CPM sponsorship deals. The deal will stop serving when the cap is reached.",
        ).optional(),
        minimumDailyLooks: z.string().describe(
          "Daily minimum looks for CPD deal types. For CPD deals, buyer should negotiate on this field instead of guaranteed_looks.",
        ).optional(),
        percentShareOfVoice: z.string().describe(
          "For sponsorship deals, this is the percentage of the seller's eligible impressions that the deal will serve until the cap is reached.",
        ).optional(),
        reservationType: z.enum([
          "RESERVATION_TYPE_UNSPECIFIED",
          "STANDARD",
          "SPONSORSHIP",
        ]).describe(
          "The reservation type for a Programmatic Guaranteed deal. This indicates whether the number of impressions is fixed, or a percent of available impressions. If not specified, the default reservation type is STANDARD.",
        ).optional(),
      }).describe("Terms for Programmatic Guaranteed Deals.").optional(),
      nonGuaranteedAuctionTerms: z.object({
        autoOptimizePrivateAuction: z.boolean().describe(
          "True if open auction buyers are allowed to compete with invited buyers in this private auction.",
        ).optional(),
        reservePricesPerBuyer: z.array(z.unknown()).describe(
          "Reserve price for the specified buyer.",
        ).optional(),
      }).describe(
        "Terms for Private Auctions. Note that Private Auctions can be created only by the seller, but they can be returned in a get or list request.",
      ).optional(),
      nonGuaranteedFixedPriceTerms: z.object({
        fixedPrices: z.array(z.unknown()).describe(
          "Fixed price for the specified buyer.",
        ).optional(),
      }).describe("Terms for Preferred Deals.").optional(),
      sellerTimeZone: z.string().describe(
        'The time zone name. For deals with Cost Per Day billing, defines the time zone used to mark the boundaries of a day. It should be an IANA TZ name, such as "America/Los_Angeles". For more information, see https://en.wikipedia.org/wiki/List_of_tz_database_time_zones.',
      ).optional(),
    }).describe(
      "The deal terms specify the details of a Product/deal. They specify things like price per buyer, the type of pricing model (for example, fixed price, auction) and expected impressions from the publisher.",
    ).optional(),
    deliveryControl: z.object({
      creativeBlockingLevel: z.enum([
        "CREATIVE_BLOCKING_LEVEL_UNSPECIFIED",
        "PUBLISHER_BLOCKING_RULES",
        "ADX_POLICY_BLOCKING_ONLY",
      ]).describe(
        "Output only. Specified the creative blocking levels to be applied.",
      ).optional(),
      deliveryRateType: z.enum([
        "DELIVERY_RATE_TYPE_UNSPECIFIED",
        "EVENLY",
        "FRONT_LOADED",
        "AS_FAST_AS_POSSIBLE",
      ]).describe(
        "Output only. Specifies how the impression delivery will be paced.",
      ).optional(),
      frequencyCaps: z.array(z.object({
        maxImpressions: z.unknown().describe(
          "The maximum number of impressions that can be served to a user within the specified time period.",
        ).optional(),
        numTimeUnits: z.unknown().describe(
          "The amount of time, in the units specified by time_unit_type. Defines the amount of time over which impressions per user are counted and capped.",
        ).optional(),
        timeUnitType: z.unknown().describe(
          "The time unit. Along with num_time_units defines the amount of time over which impressions per user are counted and capped.",
        ).optional(),
      })).describe("Output only. Specifies any frequency caps.").optional(),
    }).describe("Message contains details about how the deals will be paced.")
      .optional(),
    description: z.string().describe("Description for the deal terms.")
      .optional(),
    displayName: z.string().describe("The name of the deal.").optional(),
    externalDealId: z.string().describe(
      "Output only. The external deal ID assigned to this deal once the deal is finalized. This is the deal ID that shows up in serving/reporting etc.",
    ).optional(),
    isSetupComplete: z.boolean().describe(
      "Output only. True, if the buyside inventory setup is complete for this deal.",
    ).optional(),
    programmaticCreativeSource: z.enum([
      "PROGRAMMATIC_CREATIVE_SOURCE_UNSPECIFIED",
      "ADVERTISER",
      "PUBLISHER",
    ]).describe(
      "Output only. Specifies the creative source for programmatic deals. PUBLISHER means creative is provided by seller and ADVERTISER means creative is provided by buyer.",
    ).optional(),
    proposalId: z.string().describe(
      "Output only. ID of the proposal that this deal is part of.",
    ).optional(),
    sellerContacts: z.array(z.object({
      email: z.string().describe("Email address for the contact.").optional(),
      name: z.string().describe("The name of the contact.").optional(),
    })).describe("Output only. Seller contact information for the deal.")
      .optional(),
    syndicationProduct: z.enum([
      "SYNDICATION_PRODUCT_UNSPECIFIED",
      "CONTENT",
      "MOBILE",
      "VIDEO",
      "GAMES",
    ]).describe(
      "The syndication product associated with the deal. Note: This field may be set only when creating the resource. Modifying this field while updating the resource will result in an error.",
    ).optional(),
    targeting: z.object({
      geoTargeting: z.object({
        excludedCriteriaIds: z.array(z.unknown()).describe(
          "A list of numeric IDs to be excluded.",
        ).optional(),
        targetedCriteriaIds: z.array(z.unknown()).describe(
          "A list of numeric IDs to be included.",
        ).optional(),
      }).describe(
        "Generic targeting used for targeting dimensions that contains a list of included and excluded numeric IDs.",
      ).optional(),
      inventorySizeTargeting: z.object({
        excludedInventorySizes: z.array(z.unknown()).describe(
          "A list of inventory sizes to be excluded.",
        ).optional(),
        targetedInventorySizes: z.array(z.unknown()).describe(
          "A list of inventory sizes to be included.",
        ).optional(),
      }).describe(
        "Represents the size of an ad unit that can be targeted on an ad request. It only applies to Private Auction, AdX Preferred Deals and Auction Packages. This targeting does not apply to Programmatic Guaranteed and Preferred Deals in Ad Manager.",
      ).optional(),
      placementTargeting: z.object({
        mobileApplicationTargeting: z.object({
          firstPartyTargeting: z.unknown().describe(
            "Represents a list of targeted and excluded mobile application IDs that publishers own. Mobile application IDs are from App Store and Google Play Store. Android App ID, for example, com.google.android.apps.maps, can be found in Google Play Store URL. iOS App ID (which is a number) can be found at the end of iTunes store URL. First party mobile applications is either included or excluded.",
          ).optional(),
        }).describe("Mobile application targeting settings.").optional(),
        urlTargeting: z.object({
          excludedUrls: z.unknown().describe("A list of URLs to be excluded.")
            .optional(),
          targetedUrls: z.unknown().describe("A list of URLs to be included.")
            .optional(),
        }).describe(
          "Represents a list of targeted and excluded URLs (for example, google.com). For Private Auction and AdX Preferred Deals, URLs are either included or excluded. For Programmatic Guaranteed and Preferred Deals, this doesn't apply.",
        ).optional(),
      }).describe(
        "Represents targeting about where the ads can appear, for example, certain sites or mobile applications. Different placement targeting types will be logically OR'ed.",
      ).optional(),
      technologyTargeting: z.object({
        deviceCapabilityTargeting: z.object({
          excludedCriteriaIds: z.unknown().describe(
            "A list of numeric IDs to be excluded.",
          ).optional(),
          targetedCriteriaIds: z.unknown().describe(
            "A list of numeric IDs to be included.",
          ).optional(),
        }).describe(
          "Generic targeting used for targeting dimensions that contains a list of included and excluded numeric IDs.",
        ).optional(),
        deviceCategoryTargeting: z.object({
          excludedCriteriaIds: z.unknown().describe(
            "A list of numeric IDs to be excluded.",
          ).optional(),
          targetedCriteriaIds: z.unknown().describe(
            "A list of numeric IDs to be included.",
          ).optional(),
        }).describe(
          "Generic targeting used for targeting dimensions that contains a list of included and excluded numeric IDs.",
        ).optional(),
        operatingSystemTargeting: z.object({
          operatingSystemCriteria: z.unknown().describe(
            "Generic targeting used for targeting dimensions that contains a list of included and excluded numeric IDs.",
          ).optional(),
          operatingSystemVersionCriteria: z.unknown().describe(
            "Generic targeting used for targeting dimensions that contains a list of included and excluded numeric IDs.",
          ).optional(),
        }).describe("Represents targeting information for operating systems.")
          .optional(),
      }).describe("Represents targeting about various types of technology.")
        .optional(),
      videoTargeting: z.object({
        excludedPositionTypes: z.array(z.unknown()).describe(
          "A list of video positions to be excluded. Position types can either be included or excluded (XOR).",
        ).optional(),
        targetedPositionTypes: z.array(z.unknown()).describe(
          "A list of video positions to be included. When the included list is present, the excluded list must be empty. When the excluded list is present, the included list must be empty.",
        ).optional(),
      }).describe("Represents targeting information about video.").optional(),
    }).describe(
      "Targeting represents different criteria that can be used by advertisers to target ad inventory. For example, they can choose to target ad requests only if the user is in the US. Multiple types of targeting are always applied as a logical AND, unless noted otherwise.",
    ).optional(),
    targetingCriterion: z.array(z.object({
      exclusions: z.array(z.unknown()).describe(
        "The list of values to exclude from targeting. Each value is AND'd together.",
      ).optional(),
      inclusions: z.array(z.unknown()).describe(
        "The list of value to include as part of the targeting. Each value is OR'd together.",
      ).optional(),
      key: z.string().describe(
        "The key representing the shared targeting criterion. Targeting criteria defined by Google ad servers will begin with GOOG_. Third parties may define their own keys. A list of permissible keys along with the acceptable values will be provided as part of the external documentation.",
      ).optional(),
    })).describe(
      "The shared targeting visible to buyers and sellers. Each shared targeting entity is AND'd together.",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. The time when the deal was last updated.",
    ).optional(),
    webPropertyCode: z.string().describe(
      "The web property code for the seller copied over from the product.",
    ).optional(),
  })).describe(
    "The deals associated with this proposal. For Private Auction proposals (whose deals have NonGuaranteedAuctionTerms), there will only be one deal.",
  ).optional(),
  displayName: z.string().describe("The name for the proposal.").optional(),
  seller: z.object({
    accountId: z.string().describe(
      "The unique ID for the seller. The seller fills in this field. The seller account ID is then available to buyer in the product.",
    ).optional(),
    subAccountId: z.string().describe(
      "Output only. Ad manager network code for the seller.",
    ).optional(),
  }).describe(
    "Represents a seller of inventory. Each seller is identified by a unique Ad Manager account ID.",
  ).optional(),
  accountId: z.string().describe("Account ID of the buyer."),
});

const StateSchema = z.object({
  billedBuyer: z.object({
    accountId: z.string(),
  }).optional(),
  buyer: z.object({
    accountId: z.string(),
  }).optional(),
  buyerContacts: z.array(z.object({
    email: z.string(),
    name: z.string(),
  })).optional(),
  buyerPrivateData: z.object({
    referenceId: z.string(),
  }).optional(),
  deals: z.array(z.object({
    availableEndTime: z.string(),
    availableStartTime: z.string(),
    buyerPrivateData: z.object({
      referenceId: z.string(),
    }),
    createProductId: z.string(),
    createProductRevision: z.string(),
    createTime: z.string(),
    creativePreApprovalPolicy: z.string(),
    creativeRestrictions: z.object({
      creativeFormat: z.string(),
      creativeSpecifications: z.array(z.object({
        creativeCompanionSizes: z.unknown(),
        creativeSize: z.unknown(),
      })),
      skippableAdType: z.string(),
    }),
    creativeSafeFrameCompatibility: z.string(),
    dealId: z.string(),
    dealServingMetadata: z.object({
      dealPauseStatus: z.object({
        buyerPauseReason: z.string(),
        firstPausedBy: z.string(),
        hasBuyerPaused: z.boolean(),
        hasSellerPaused: z.boolean(),
        sellerPauseReason: z.string(),
      }),
    }),
    dealTerms: z.object({
      brandingType: z.string(),
      description: z.string(),
      estimatedGrossSpend: z.object({
        amount: z.object({
          currencyCode: z.unknown(),
          nanos: z.unknown(),
          units: z.unknown(),
        }),
        pricingType: z.string(),
      }),
      estimatedImpressionsPerDay: z.string(),
      guaranteedFixedPriceTerms: z.object({
        fixedPrices: z.array(z.unknown()),
        guaranteedImpressions: z.string(),
        guaranteedLooks: z.string(),
        impressionCap: z.string(),
        minimumDailyLooks: z.string(),
        percentShareOfVoice: z.string(),
        reservationType: z.string(),
      }),
      nonGuaranteedAuctionTerms: z.object({
        autoOptimizePrivateAuction: z.boolean(),
        reservePricesPerBuyer: z.array(z.unknown()),
      }),
      nonGuaranteedFixedPriceTerms: z.object({
        fixedPrices: z.array(z.unknown()),
      }),
      sellerTimeZone: z.string(),
    }),
    deliveryControl: z.object({
      creativeBlockingLevel: z.string(),
      deliveryRateType: z.string(),
      frequencyCaps: z.array(z.object({
        maxImpressions: z.unknown(),
        numTimeUnits: z.unknown(),
        timeUnitType: z.unknown(),
      })),
    }),
    description: z.string(),
    displayName: z.string(),
    externalDealId: z.string(),
    isSetupComplete: z.boolean(),
    programmaticCreativeSource: z.string(),
    proposalId: z.string(),
    sellerContacts: z.array(z.object({
      email: z.string(),
      name: z.string(),
    })),
    syndicationProduct: z.string(),
    targeting: z.object({
      geoTargeting: z.object({
        excludedCriteriaIds: z.array(z.unknown()),
        targetedCriteriaIds: z.array(z.unknown()),
      }),
      inventorySizeTargeting: z.object({
        excludedInventorySizes: z.array(z.unknown()),
        targetedInventorySizes: z.array(z.unknown()),
      }),
      placementTargeting: z.object({
        mobileApplicationTargeting: z.object({
          firstPartyTargeting: z.unknown(),
        }),
        urlTargeting: z.object({
          excludedUrls: z.unknown(),
          targetedUrls: z.unknown(),
        }),
      }),
      technologyTargeting: z.object({
        deviceCapabilityTargeting: z.object({
          excludedCriteriaIds: z.unknown(),
          targetedCriteriaIds: z.unknown(),
        }),
        deviceCategoryTargeting: z.object({
          excludedCriteriaIds: z.unknown(),
          targetedCriteriaIds: z.unknown(),
        }),
        operatingSystemTargeting: z.object({
          operatingSystemCriteria: z.unknown(),
          operatingSystemVersionCriteria: z.unknown(),
        }),
      }),
      videoTargeting: z.object({
        excludedPositionTypes: z.array(z.unknown()),
        targetedPositionTypes: z.array(z.unknown()),
      }),
    }),
    targetingCriterion: z.array(z.object({
      exclusions: z.array(z.unknown()),
      inclusions: z.array(z.unknown()),
      key: z.string(),
    })),
    updateTime: z.string(),
    webPropertyCode: z.string(),
  })).optional(),
  displayName: z.string().optional(),
  isRenegotiating: z.boolean().optional(),
  isSetupComplete: z.boolean().optional(),
  lastUpdaterOrCommentorRole: z.string().optional(),
  notes: z.array(z.object({
    createTime: z.string(),
    creatorRole: z.string(),
    note: z.string(),
    noteId: z.string(),
    proposalRevision: z.string(),
  })).optional(),
  originatorRole: z.string().optional(),
  privateAuctionId: z.string().optional(),
  proposalId: z.string().optional(),
  proposalRevision: z.string().optional(),
  proposalState: z.string().optional(),
  seller: z.object({
    accountId: z.string(),
    subAccountId: z.string(),
  }).optional(),
  sellerContacts: z.array(z.object({
    email: z.string(),
    name: z.string(),
  })).optional(),
  termsAndConditions: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  billedBuyer: z.object({
    accountId: z.string().describe("Authorized Buyers account ID of the buyer.")
      .optional(),
  }).describe(
    "Represents a buyer of inventory. Each buyer is identified by a unique Authorized Buyers account ID.",
  ).optional(),
  buyer: z.object({
    accountId: z.string().describe("Authorized Buyers account ID of the buyer.")
      .optional(),
  }).describe(
    "Represents a buyer of inventory. Each buyer is identified by a unique Authorized Buyers account ID.",
  ).optional(),
  buyerContacts: z.array(z.object({
    email: z.string().describe("Email address for the contact.").optional(),
    name: z.string().describe("The name of the contact.").optional(),
  })).describe("Contact information for the buyer.").optional(),
  buyerPrivateData: z.object({
    referenceId: z.string().describe(
      "A buyer or seller specified reference ID. This can be queried in the list operations (max-length: 1024 unicode code units).",
    ).optional(),
  }).describe(
    "Buyers are allowed to store certain types of private data in a proposal/deal.",
  ).optional(),
  deals: z.array(z.object({
    availableEndTime: z.string().describe(
      "Proposed flight end time of the deal. This will generally be stored in a granularity of a second. A value is not required for Private Auction deals or Preferred Deals.",
    ).optional(),
    availableStartTime: z.string().describe(
      "Optional. Proposed flight start time of the deal. This will generally be stored in the granularity of one second since deal serving starts at seconds boundary. Any time specified with more granularity (for example, in milliseconds) will be truncated towards the start of time in seconds.",
    ).optional(),
    buyerPrivateData: z.object({
      referenceId: z.string().describe(
        "A buyer or seller specified reference ID. This can be queried in the list operations (max-length: 1024 unicode code units).",
      ).optional(),
    }).describe(
      "Buyers are allowed to store certain types of private data in a proposal/deal.",
    ).optional(),
    createProductId: z.string().describe(
      "The product ID from which this deal was created. Note: This field may be set only when creating the resource. Modifying this field while updating the resource will result in an error.",
    ).optional(),
    createProductRevision: z.string().describe(
      "Optional. Revision number of the product that the deal was created from. If present on create, and the server `product_revision` has advanced since the passed-in `create_product_revision`, an `ABORTED` error will be returned. Note: This field may be set only when creating the resource. Modifying this field while updating the resource will result in an error.",
    ).optional(),
    createTime: z.string().describe(
      "Output only. The time of the deal creation.",
    ).optional(),
    creativePreApprovalPolicy: z.enum([
      "CREATIVE_PRE_APPROVAL_POLICY_UNSPECIFIED",
      "SELLER_PRE_APPROVAL_REQUIRED",
      "SELLER_PRE_APPROVAL_NOT_REQUIRED",
    ]).describe("Output only. Specifies the creative pre-approval policy.")
      .optional(),
    creativeRestrictions: z.object({
      creativeFormat: z.enum([
        "CREATIVE_FORMAT_UNSPECIFIED",
        "DISPLAY",
        "VIDEO",
      ]).describe(
        "The format of the environment that the creatives will be displayed in.",
      ).optional(),
      creativeSpecifications: z.array(z.object({
        creativeCompanionSizes: z.unknown().describe(
          "Companion sizes may be filled in only when this is a video creative.",
        ).optional(),
        creativeSize: z.unknown().describe(
          "Represents size of a single ad slot, or a creative.",
        ).optional(),
      })).optional(),
      skippableAdType: z.enum([
        "SKIPPABLE_AD_TYPE_UNSPECIFIED",
        "SKIPPABLE",
        "INSTREAM_SELECT",
        "NOT_SKIPPABLE",
      ]).describe(
        "Skippable video ads allow viewers to skip ads after 5 seconds.",
      ).optional(),
    }).describe(
      "Represents creative restrictions associated to Programmatic Guaranteed/ Preferred Deal in Ad Manager. This doesn't apply to Private Auction and AdX Preferred Deals.",
    ).optional(),
    creativeSafeFrameCompatibility: z.enum([
      "CREATIVE_SAFE_FRAME_COMPATIBILITY_UNSPECIFIED",
      "COMPATIBLE",
      "INCOMPATIBLE",
    ]).describe(
      "Output only. Specifies whether the creative is safeFrame compatible.",
    ).optional(),
    dealId: z.string().describe(
      "Output only. A unique deal ID for the deal (server-assigned).",
    ).optional(),
    dealServingMetadata: z.object({
      dealPauseStatus: z.object({
        buyerPauseReason: z.string().describe(
          "The buyer's reason for pausing, if the buyer paused the deal.",
        ).optional(),
        firstPausedBy: z.enum([
          "BUYER_SELLER_ROLE_UNSPECIFIED",
          "BUYER",
          "SELLER",
        ]).describe("The role of the person who first paused this deal.")
          .optional(),
        hasBuyerPaused: z.boolean().describe(
          "True, if the buyer has paused the deal unilaterally.",
        ).optional(),
        hasSellerPaused: z.boolean().describe(
          "True, if the seller has paused the deal unilaterally.",
        ).optional(),
        sellerPauseReason: z.string().describe(
          "The seller's reason for pausing, if the seller paused the deal.",
        ).optional(),
      }).describe(
        "Tracks which parties (if any) have paused a deal. The deal is considered paused if either hasBuyerPaused or hasSellPaused is true.",
      ).optional(),
    }).describe("Message captures metadata about the serving status of a deal.")
      .optional(),
    dealTerms: z.object({
      brandingType: z.enum([
        "BRANDING_TYPE_UNSPECIFIED",
        "BRANDED",
        "SEMI_TRANSPARENT",
      ]).describe("Visibility of the URL in bid requests. (default: BRANDED)")
        .optional(),
      description: z.string().describe(
        "Publisher provided description for the terms.",
      ).optional(),
      estimatedGrossSpend: z.object({
        amount: z.object({
          currencyCode: z.unknown().describe(
            "The three-letter currency code defined in ISO 4217.",
          ).optional(),
          nanos: z.unknown().describe(
            "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
          ).optional(),
          units: z.unknown().describe(
            'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
          ).optional(),
        }).describe("Represents an amount of money with its currency type.")
          .optional(),
        pricingType: z.enum([
          "PRICING_TYPE_UNSPECIFIED",
          "COST_PER_MILLE",
          "COST_PER_DAY",
        ]).describe("The pricing type for the deal/product. (default: CPM)")
          .optional(),
      }).describe("Represents a price and a pricing type for a product / deal.")
        .optional(),
      estimatedImpressionsPerDay: z.string().describe(
        "Non-binding estimate of the impressions served per day. Can be set by buyer or seller.",
      ).optional(),
      guaranteedFixedPriceTerms: z.object({
        fixedPrices: z.array(z.unknown()).describe(
          "Fixed price for the specified buyer.",
        ).optional(),
        guaranteedImpressions: z.string().describe(
          "Guaranteed impressions as a percentage. This is the percentage of guaranteed looks that the buyer is guaranteeing to buy.",
        ).optional(),
        guaranteedLooks: z.string().describe(
          "Count of guaranteed looks. Required for deal, optional for product. For CPD deals, buyer changes to guaranteed_looks will be ignored.",
        ).optional(),
        impressionCap: z.string().describe(
          "The lifetime impression cap for CPM sponsorship deals. The deal will stop serving when the cap is reached.",
        ).optional(),
        minimumDailyLooks: z.string().describe(
          "Daily minimum looks for CPD deal types. For CPD deals, buyer should negotiate on this field instead of guaranteed_looks.",
        ).optional(),
        percentShareOfVoice: z.string().describe(
          "For sponsorship deals, this is the percentage of the seller's eligible impressions that the deal will serve until the cap is reached.",
        ).optional(),
        reservationType: z.enum([
          "RESERVATION_TYPE_UNSPECIFIED",
          "STANDARD",
          "SPONSORSHIP",
        ]).describe(
          "The reservation type for a Programmatic Guaranteed deal. This indicates whether the number of impressions is fixed, or a percent of available impressions. If not specified, the default reservation type is STANDARD.",
        ).optional(),
      }).describe("Terms for Programmatic Guaranteed Deals.").optional(),
      nonGuaranteedAuctionTerms: z.object({
        autoOptimizePrivateAuction: z.boolean().describe(
          "True if open auction buyers are allowed to compete with invited buyers in this private auction.",
        ).optional(),
        reservePricesPerBuyer: z.array(z.unknown()).describe(
          "Reserve price for the specified buyer.",
        ).optional(),
      }).describe(
        "Terms for Private Auctions. Note that Private Auctions can be created only by the seller, but they can be returned in a get or list request.",
      ).optional(),
      nonGuaranteedFixedPriceTerms: z.object({
        fixedPrices: z.array(z.unknown()).describe(
          "Fixed price for the specified buyer.",
        ).optional(),
      }).describe("Terms for Preferred Deals.").optional(),
      sellerTimeZone: z.string().describe(
        'The time zone name. For deals with Cost Per Day billing, defines the time zone used to mark the boundaries of a day. It should be an IANA TZ name, such as "America/Los_Angeles". For more information, see https://en.wikipedia.org/wiki/List_of_tz_database_time_zones.',
      ).optional(),
    }).describe(
      "The deal terms specify the details of a Product/deal. They specify things like price per buyer, the type of pricing model (for example, fixed price, auction) and expected impressions from the publisher.",
    ).optional(),
    deliveryControl: z.object({
      creativeBlockingLevel: z.enum([
        "CREATIVE_BLOCKING_LEVEL_UNSPECIFIED",
        "PUBLISHER_BLOCKING_RULES",
        "ADX_POLICY_BLOCKING_ONLY",
      ]).describe(
        "Output only. Specified the creative blocking levels to be applied.",
      ).optional(),
      deliveryRateType: z.enum([
        "DELIVERY_RATE_TYPE_UNSPECIFIED",
        "EVENLY",
        "FRONT_LOADED",
        "AS_FAST_AS_POSSIBLE",
      ]).describe(
        "Output only. Specifies how the impression delivery will be paced.",
      ).optional(),
      frequencyCaps: z.array(z.object({
        maxImpressions: z.unknown().describe(
          "The maximum number of impressions that can be served to a user within the specified time period.",
        ).optional(),
        numTimeUnits: z.unknown().describe(
          "The amount of time, in the units specified by time_unit_type. Defines the amount of time over which impressions per user are counted and capped.",
        ).optional(),
        timeUnitType: z.unknown().describe(
          "The time unit. Along with num_time_units defines the amount of time over which impressions per user are counted and capped.",
        ).optional(),
      })).describe("Output only. Specifies any frequency caps.").optional(),
    }).describe("Message contains details about how the deals will be paced.")
      .optional(),
    description: z.string().describe("Description for the deal terms.")
      .optional(),
    displayName: z.string().describe("The name of the deal.").optional(),
    externalDealId: z.string().describe(
      "Output only. The external deal ID assigned to this deal once the deal is finalized. This is the deal ID that shows up in serving/reporting etc.",
    ).optional(),
    isSetupComplete: z.boolean().describe(
      "Output only. True, if the buyside inventory setup is complete for this deal.",
    ).optional(),
    programmaticCreativeSource: z.enum([
      "PROGRAMMATIC_CREATIVE_SOURCE_UNSPECIFIED",
      "ADVERTISER",
      "PUBLISHER",
    ]).describe(
      "Output only. Specifies the creative source for programmatic deals. PUBLISHER means creative is provided by seller and ADVERTISER means creative is provided by buyer.",
    ).optional(),
    proposalId: z.string().describe(
      "Output only. ID of the proposal that this deal is part of.",
    ).optional(),
    sellerContacts: z.array(z.object({
      email: z.string().describe("Email address for the contact.").optional(),
      name: z.string().describe("The name of the contact.").optional(),
    })).describe("Output only. Seller contact information for the deal.")
      .optional(),
    syndicationProduct: z.enum([
      "SYNDICATION_PRODUCT_UNSPECIFIED",
      "CONTENT",
      "MOBILE",
      "VIDEO",
      "GAMES",
    ]).describe(
      "The syndication product associated with the deal. Note: This field may be set only when creating the resource. Modifying this field while updating the resource will result in an error.",
    ).optional(),
    targeting: z.object({
      geoTargeting: z.object({
        excludedCriteriaIds: z.array(z.unknown()).describe(
          "A list of numeric IDs to be excluded.",
        ).optional(),
        targetedCriteriaIds: z.array(z.unknown()).describe(
          "A list of numeric IDs to be included.",
        ).optional(),
      }).describe(
        "Generic targeting used for targeting dimensions that contains a list of included and excluded numeric IDs.",
      ).optional(),
      inventorySizeTargeting: z.object({
        excludedInventorySizes: z.array(z.unknown()).describe(
          "A list of inventory sizes to be excluded.",
        ).optional(),
        targetedInventorySizes: z.array(z.unknown()).describe(
          "A list of inventory sizes to be included.",
        ).optional(),
      }).describe(
        "Represents the size of an ad unit that can be targeted on an ad request. It only applies to Private Auction, AdX Preferred Deals and Auction Packages. This targeting does not apply to Programmatic Guaranteed and Preferred Deals in Ad Manager.",
      ).optional(),
      placementTargeting: z.object({
        mobileApplicationTargeting: z.object({
          firstPartyTargeting: z.unknown().describe(
            "Represents a list of targeted and excluded mobile application IDs that publishers own. Mobile application IDs are from App Store and Google Play Store. Android App ID, for example, com.google.android.apps.maps, can be found in Google Play Store URL. iOS App ID (which is a number) can be found at the end of iTunes store URL. First party mobile applications is either included or excluded.",
          ).optional(),
        }).describe("Mobile application targeting settings.").optional(),
        urlTargeting: z.object({
          excludedUrls: z.unknown().describe("A list of URLs to be excluded.")
            .optional(),
          targetedUrls: z.unknown().describe("A list of URLs to be included.")
            .optional(),
        }).describe(
          "Represents a list of targeted and excluded URLs (for example, google.com). For Private Auction and AdX Preferred Deals, URLs are either included or excluded. For Programmatic Guaranteed and Preferred Deals, this doesn't apply.",
        ).optional(),
      }).describe(
        "Represents targeting about where the ads can appear, for example, certain sites or mobile applications. Different placement targeting types will be logically OR'ed.",
      ).optional(),
      technologyTargeting: z.object({
        deviceCapabilityTargeting: z.object({
          excludedCriteriaIds: z.unknown().describe(
            "A list of numeric IDs to be excluded.",
          ).optional(),
          targetedCriteriaIds: z.unknown().describe(
            "A list of numeric IDs to be included.",
          ).optional(),
        }).describe(
          "Generic targeting used for targeting dimensions that contains a list of included and excluded numeric IDs.",
        ).optional(),
        deviceCategoryTargeting: z.object({
          excludedCriteriaIds: z.unknown().describe(
            "A list of numeric IDs to be excluded.",
          ).optional(),
          targetedCriteriaIds: z.unknown().describe(
            "A list of numeric IDs to be included.",
          ).optional(),
        }).describe(
          "Generic targeting used for targeting dimensions that contains a list of included and excluded numeric IDs.",
        ).optional(),
        operatingSystemTargeting: z.object({
          operatingSystemCriteria: z.unknown().describe(
            "Generic targeting used for targeting dimensions that contains a list of included and excluded numeric IDs.",
          ).optional(),
          operatingSystemVersionCriteria: z.unknown().describe(
            "Generic targeting used for targeting dimensions that contains a list of included and excluded numeric IDs.",
          ).optional(),
        }).describe("Represents targeting information for operating systems.")
          .optional(),
      }).describe("Represents targeting about various types of technology.")
        .optional(),
      videoTargeting: z.object({
        excludedPositionTypes: z.array(z.unknown()).describe(
          "A list of video positions to be excluded. Position types can either be included or excluded (XOR).",
        ).optional(),
        targetedPositionTypes: z.array(z.unknown()).describe(
          "A list of video positions to be included. When the included list is present, the excluded list must be empty. When the excluded list is present, the included list must be empty.",
        ).optional(),
      }).describe("Represents targeting information about video.").optional(),
    }).describe(
      "Targeting represents different criteria that can be used by advertisers to target ad inventory. For example, they can choose to target ad requests only if the user is in the US. Multiple types of targeting are always applied as a logical AND, unless noted otherwise.",
    ).optional(),
    targetingCriterion: z.array(z.object({
      exclusions: z.array(z.unknown()).describe(
        "The list of values to exclude from targeting. Each value is AND'd together.",
      ).optional(),
      inclusions: z.array(z.unknown()).describe(
        "The list of value to include as part of the targeting. Each value is OR'd together.",
      ).optional(),
      key: z.string().describe(
        "The key representing the shared targeting criterion. Targeting criteria defined by Google ad servers will begin with GOOG_. Third parties may define their own keys. A list of permissible keys along with the acceptable values will be provided as part of the external documentation.",
      ).optional(),
    })).describe(
      "The shared targeting visible to buyers and sellers. Each shared targeting entity is AND'd together.",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. The time when the deal was last updated.",
    ).optional(),
    webPropertyCode: z.string().describe(
      "The web property code for the seller copied over from the product.",
    ).optional(),
  })).describe(
    "The deals associated with this proposal. For Private Auction proposals (whose deals have NonGuaranteedAuctionTerms), there will only be one deal.",
  ).optional(),
  displayName: z.string().describe("The name for the proposal.").optional(),
  seller: z.object({
    accountId: z.string().describe(
      "The unique ID for the seller. The seller fills in this field. The seller account ID is then available to buyer in the product.",
    ).optional(),
    subAccountId: z.string().describe(
      "Output only. Ad manager network code for the seller.",
    ).optional(),
  }).describe(
    "Represents a seller of inventory. Each seller is identified by a unique Ad Manager account ID.",
  ).optional(),
  accountId: z.string().describe("Account ID of the buyer.").optional(),
});

/** Swamp extension model for Google Cloud Ad Exchange Buyer Accounts.Proposals. Registered at `@swamp/gcp/adexchangebuyer2/accounts-proposals`. */
export const model = {
  type: "@swamp/gcp/adexchangebuyer2/accounts-proposals",
  version: "2026.06.03.1",
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
      toVersion: "2026.06.03.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents a proposal in the Marketplace. A proposal is the unit of negotiati...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a proposals",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["billedBuyer"] !== undefined) {
          body["billedBuyer"] = g["billedBuyer"];
        }
        if (g["buyer"] !== undefined) body["buyer"] = g["buyer"];
        if (g["buyerContacts"] !== undefined) {
          body["buyerContacts"] = g["buyerContacts"];
        }
        if (g["buyerPrivateData"] !== undefined) {
          body["buyerPrivateData"] = g["buyerPrivateData"];
        }
        if (g["deals"] !== undefined) body["deals"] = g["deals"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["seller"] !== undefined) body["seller"] = g["seller"];
        if (g["name"] !== undefined) params["proposalId"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "accountId": String(g["accountId"] ?? "") },
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
      description: "Get a proposals",
      arguments: z.object({
        identifier: z.string().describe("The name of the proposals"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
        params["proposalId"] = args.identifier;
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
      description: "Update proposals attributes",
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
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        } else if (existing["accountId"]) {
          params["accountId"] = String(existing["accountId"]);
        }
        params["proposalId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["billedBuyer"] !== undefined) {
          body["billedBuyer"] = g["billedBuyer"];
        }
        if (g["buyer"] !== undefined) body["buyer"] = g["buyer"];
        if (g["buyerContacts"] !== undefined) {
          body["buyerContacts"] = g["buyerContacts"];
        }
        if (g["buyerPrivateData"] !== undefined) {
          body["buyerPrivateData"] = g["buyerPrivateData"];
        }
        if (g["deals"] !== undefined) body["deals"] = g["deals"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["seller"] !== undefined) body["seller"] = g["seller"];
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
      description: "Sync proposals state from GCP",
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
          if (g["accountId"] !== undefined) {
            params["accountId"] = String(g["accountId"]);
          } else if (existing["accountId"]) {
            params["accountId"] = String(existing["accountId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["proposalId"] = identifier;
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
      description: "List proposals resources",
      arguments: z.object({
        filter: z.string().describe(
          "An optional PQL filter query used to query for proposals. Nested repeated fields, such as proposal.deals.targetingCriterion, cannot be filtered.",
        ).optional(),
        filterSyntax: z.string().describe(
          "Syntax the filter is written in. Current implementation defaults to PQL but in the future it will be LIST_FILTER.",
        ).optional(),
        pageSize: z.number().describe(
          "Requested page size. The server may return fewer results than requested. If unspecified, the server will pick an appropriate default.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["filterSyntax"] !== undefined) {
          params["filterSyntax"] = String(args["filterSyntax"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "proposals",
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
    accept: {
      description: "accept",
      arguments: z.object({
        proposalRevision: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
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
        params["proposalId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["proposalRevision"] !== undefined) {
          body["proposalRevision"] = args["proposalRevision"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "adexchangebuyer2.accounts.proposals.accept",
            "path":
              "v2beta1/accounts/{accountId}/proposals/{proposalId}:accept",
            "httpMethod": "POST",
            "parameterOrder": ["accountId", "proposalId"],
            "parameters": {
              "accountId": { "location": "path", "required": true },
              "proposalId": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    add_note: {
      description: "add note",
      arguments: z.object({
        note: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
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
        params["proposalId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["note"] !== undefined) body["note"] = args["note"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "adexchangebuyer2.accounts.proposals.addNote",
            "path":
              "v2beta1/accounts/{accountId}/proposals/{proposalId}:addNote",
            "httpMethod": "POST",
            "parameterOrder": ["accountId", "proposalId"],
            "parameters": {
              "accountId": { "location": "path", "required": true },
              "proposalId": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    cancel_negotiation: {
      description: "cancel negotiation",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
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
        params["proposalId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "adexchangebuyer2.accounts.proposals.cancelNegotiation",
            "path":
              "v2beta1/accounts/{accountId}/proposals/{proposalId}:cancelNegotiation",
            "httpMethod": "POST",
            "parameterOrder": ["accountId", "proposalId"],
            "parameters": {
              "accountId": { "location": "path", "required": true },
              "proposalId": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    complete_setup: {
      description: "complete setup",
      arguments: z.object({
        externalDealIds: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
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
        params["proposalId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["externalDealIds"] !== undefined) {
          body["externalDealIds"] = args["externalDealIds"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "adexchangebuyer2.accounts.proposals.completeSetup",
            "path":
              "v2beta1/accounts/{accountId}/proposals/{proposalId}:completeSetup",
            "httpMethod": "POST",
            "parameterOrder": ["accountId", "proposalId"],
            "parameters": {
              "accountId": { "location": "path", "required": true },
              "proposalId": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    pause: {
      description: "pause",
      arguments: z.object({
        reason: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
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
        params["proposalId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["reason"] !== undefined) body["reason"] = args["reason"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "adexchangebuyer2.accounts.proposals.pause",
            "path": "v2beta1/accounts/{accountId}/proposals/{proposalId}:pause",
            "httpMethod": "POST",
            "parameterOrder": ["accountId", "proposalId"],
            "parameters": {
              "accountId": { "location": "path", "required": true },
              "proposalId": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    resume: {
      description: "resume",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
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
        params["proposalId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "adexchangebuyer2.accounts.proposals.resume",
            "path":
              "v2beta1/accounts/{accountId}/proposals/{proposalId}:resume",
            "httpMethod": "POST",
            "parameterOrder": ["accountId", "proposalId"],
            "parameters": {
              "accountId": { "location": "path", "required": true },
              "proposalId": { "location": "path", "required": true },
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
