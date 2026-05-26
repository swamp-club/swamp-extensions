// Auto-generated extension model for @swamp/gcp/paymentsresellersubscription/partners-subscriptions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Payments Reseller Subscription Partners.Subscriptions.
 *
 * Acts as a central billing entity between an external partner and Google. Google services use the subscription state to grant or revoke the user's service entitlement. Note: The subscription state might not perfectly align with the user's service entitlement. Some services might continue providing access until the current cycle ends, even if the subscription is immediately canceled. Consult the relevant contract or product policy for specific details.
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
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/subscriptions/${shortName}`;
}

const BASE_URL = "https://paymentsresellersubscription.googleapis.com/";

const GET_CONFIG = {
  "id": "paymentsresellersubscription.partners.subscriptions.get",
  "path": "v1/{+name}",
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
  "id": "paymentsresellersubscription.partners.subscriptions.create",
  "path": "v1/{+parent}/subscriptions",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "subscriptionId": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  cancellationDetails: z.object({
    reason: z.enum([
      "CANCELLATION_REASON_UNSPECIFIED",
      "CANCELLATION_REASON_FRAUD",
      "CANCELLATION_REASON_REMORSE",
      "CANCELLATION_REASON_ACCIDENTAL_PURCHASE",
      "CANCELLATION_REASON_PAST_DUE",
      "CANCELLATION_REASON_ACCOUNT_CLOSED",
      "CANCELLATION_REASON_UPGRADE_DOWNGRADE",
      "CANCELLATION_REASON_USER_DELINQUENCY",
      "CANCELLATION_REASON_SYSTEM_ERROR",
      "CANCELLATION_REASON_SYSTEM_CANCEL",
      "CANCELLATION_REASON_BILLING_SYSTEM_SWITCH",
      "CANCELLATION_REASON_OTHER",
    ]).describe("Output only. The reason of the cancellation.").optional(),
  }).describe(
    "Describes the details of a cancelled or cancelling subscription.",
  ).optional(),
  lineItems: z.array(z.object({
    amount: z.object({
      amountMicros: z.string().describe(
        "Required. Amount in micros (1_000_000 micros = 1 currency unit)",
      ).optional(),
      currencyCode: z.string().describe(
        "Required. Currency codes in accordance with [ISO-4217 Currency Codes] (https://en.wikipedia.org/wiki/ISO_4217). For example, USD.",
      ).optional(),
    }).describe("Describes the amount unit including the currency code.")
      .optional(),
    bundleDetails: z.object({
      bundleElementDetails: z.array(z.object({
        product: z.unknown().describe(
          "Output only. Product resource name that identifies the bundle element. The format is 'partners/{partner_id}/products/{product_id}'.",
        ).optional(),
        userAccountLinkedTime: z.unknown().describe(
          "Output only. The time when this product is linked to an end user.",
        ).optional(),
      })).describe(
        "Output only. The details for each element in the hard bundle.",
      ).optional(),
    }).describe(
      "The bundle details for a line item corresponding to a hard bundle.",
    ).optional(),
    description: z.string().describe(
      "Output only. Description of this line item.",
    ).optional(),
    finiteBillingCycleDetails: z.object({
      billingCycleCountLimit: z.string().describe(
        "The number of a subscription line item billing cycles after which billing will stop automatically.",
      ).optional(),
    }).describe(
      "Details for a subscription line item with finite billing cycles.",
    ).optional(),
    lineItemFreeTrialEndTime: z.string().describe(
      'Output only. The free trial end time will be populated after the line item is successfully processed. End time of the line item free trial period, in ISO 8061 format. For example, "2019-08-31T17:28:54.564Z". It will be set the same as createTime if no free trial promotion is specified.',
    ).optional(),
    lineItemIndex: z.number().int().describe(
      "Output only. A unique index of the subscription line item.",
    ).optional(),
    lineItemPromotionSpecs: z.array(z.object({
      freeTrialDuration: z.object({
        count: z.unknown().describe("number of duration units to be included.")
          .optional(),
        unit: z.unknown().describe("The unit used for the duration").optional(),
      }).describe("Describes the length of a period of a time.").optional(),
      introductoryPricingDetails: z.object({
        introductoryPricingSpecs: z.unknown().describe(
          "Output only. Specifies the introductory pricing periods.",
        ).optional(),
      }).describe("The details of a introductory pricing promotion.")
        .optional(),
      promotion: z.string().describe(
        "Required. Promotion resource name that identifies a promotion. The format is 'partners/{partner_id}/promotions/{promotion_id}'.",
      ).optional(),
      type: z.enum([
        "PROMOTION_TYPE_UNSPECIFIED",
        "PROMOTION_TYPE_FREE_TRIAL",
        "PROMOTION_TYPE_INTRODUCTORY_PRICING",
      ]).describe("Output only. The type of the promotion for the spec.")
        .optional(),
    })).describe(
      "Optional. The promotions applied on the line item. It can be: - an introductory pricing promotion. - a free trial promotion. This feature is not enabled. If used, the request will be rejected. When used as input in Create or Provision API, specify its resource name only.",
    ).optional(),
    name: z.string().describe(
      "Identifier. Resource name of the line item. Format: partners/{partner}/subscriptions/{subscription}/lineItems/{lineItem}",
    ).optional(),
    oneTimeRecurrenceDetails: z.object({
      servicePeriod: z.object({
        endTime: z.string().describe(
          "Optional. The end time of the service period. Time is exclusive.",
        ).optional(),
        startTime: z.string().describe(
          "Required. The start time of the service period. Time is inclusive.",
        ).optional(),
      }).describe(
        "A description of what time period or moment in time the product or service is being delivered over.",
      ).optional(),
    }).describe("Details for a ONE_TIME recurrence line item.").optional(),
    product: z.string().describe(
      "Required. Product resource name that identifies the product associated with this line item. The format is 'partners/{partner_id}/products/{product_id}'.",
    ).optional(),
    productPayload: z.object({
      googleHomePayload: z.object({
        attachedToGoogleStructure: z.boolean().describe(
          "Output only. This identifies whether the subscription is attached to a Google Home structure.",
        ).optional(),
        googleStructureId: z.string().describe(
          "Optional. Structure identifier on Google side.",
        ).optional(),
        partnerStructureId: z.string().describe(
          "Optional. This identifies the structure ID on partner side that the subscription should be applied to. Only required when the partner requires structure mapping.",
        ).optional(),
      }).describe("Payload specific for Google Home products.").optional(),
      googleOnePayload: z.object({
        campaigns: z.array(z.unknown()).describe(
          "Campaign attributed to sales of this subscription.",
        ).optional(),
        offering: z.enum([
          "OFFERING_UNSPECIFIED",
          "OFFERING_VAS_BUNDLE",
          "OFFERING_VAS_STANDALONE",
          "OFFERING_HARD_BUNDLE",
          "OFFERING_SOFT_BUNDLE",
        ]).describe(
          "The type of offering the subscription was sold by the partner. e.g. VAS.",
        ).optional(),
        salesChannel: z.enum([
          "CHANNEL_UNSPECIFIED",
          "CHANNEL_RETAIL",
          "CHANNEL_ONLINE_WEB",
          "CHANNEL_ONLINE_ANDROID_APP",
          "CHANNEL_ONLINE_IOS_APP",
        ]).describe(
          "The type of sales channel through which the subscription was sold.",
        ).optional(),
        storeId: z.string().describe(
          "The identifier for the partner store where the subscription was sold.",
        ).optional(),
      }).describe("Payload specific to Google One products.").optional(),
      youtubePayload: z.object({
        accessEndTime: z.string().describe(
          "Output only. The access expiration time for this line item.",
        ).optional(),
        partnerEligibilityIds: z.array(z.unknown()).describe(
          "The list of eligibility_ids which are applicable for the line item.",
        ).optional(),
        partnerPlanType: z.enum([
          "PARTNER_PLAN_TYPE_UNSPECIFIED",
          "PARTNER_PLAN_TYPE_STANDALONE",
          "PARTNER_PLAN_TYPE_HARD_BUNDLE",
          "PARTNER_PLAN_TYPE_SOFT_BUNDLE",
        ]).describe(
          "Optional. Specifies the plan type offered to the end user by the partner.",
        ).optional(),
      }).describe("Payload specific to Youtube products.").optional(),
    }).describe("Specifies product specific payload.").optional(),
    recurrenceType: z.enum([
      "LINE_ITEM_RECURRENCE_TYPE_UNSPECIFIED",
      "LINE_ITEM_RECURRENCE_TYPE_PERIODIC",
      "LINE_ITEM_RECURRENCE_TYPE_ONE_TIME",
    ]).describe("Output only. The recurrence type of the line item.")
      .optional(),
    state: z.enum([
      "LINE_ITEM_STATE_UNSPECIFIED",
      "LINE_ITEM_STATE_ACTIVE",
      "LINE_ITEM_STATE_INACTIVE",
      "LINE_ITEM_STATE_NEW",
      "LINE_ITEM_STATE_ACTIVATING",
      "LINE_ITEM_STATE_DEACTIVATING",
      "LINE_ITEM_STATE_WAITING_TO_DEACTIVATE",
      "LINE_ITEM_STATE_OFF_CYCLE_CHARGING",
    ]).describe("Output only. The state of the line item.").optional(),
  })).describe("Required. The line items of the subscription.").optional(),
  migrationDetails: z.object({
    migratedSubscriptionId: z.string().describe(
      "Output only. The migrated subscription id in the legacy system.",
    ).optional(),
  }).describe("Describes the details of the migrated subscription.").optional(),
  name: z.string().describe(
    'Identifier. Resource name of the subscription. It will have the format of "partners/{partner_id}/subscriptions/{subscription_id}". This is available for authorizeAddon, but otherwise is response only.',
  ).optional(),
  partnerUserToken: z.string().describe(
    "Required. Identifier of the end-user in partner’s system. The value is restricted to 63 ASCII characters at the maximum.",
  ).optional(),
  products: z.array(z.string()).describe(
    "Optional. Deprecated: consider using `line_items` as the input. Required. Resource name that identifies the purchased products. The format will be 'partners/{partner_id}/products/{product_id}'.",
  ).optional(),
  promotionSpecs: z.array(z.object({
    freeTrialDuration: z.object({
      count: z.number().int().describe(
        "number of duration units to be included.",
      ).optional(),
      unit: z.enum(["UNIT_UNSPECIFIED", "MONTH", "DAY", "HOUR"]).describe(
        "The unit used for the duration",
      ).optional(),
    }).describe("Describes the length of a period of a time.").optional(),
    introductoryPricingDetails: z.object({
      introductoryPricingSpecs: z.array(z.object({
        discountAmount: z.unknown().describe(
          "Describes the amount unit including the currency code.",
        ).optional(),
        discountRatioMicros: z.unknown().describe(
          "Output only. The discount percentage in micros. For example, 50,000 represents 5%.",
        ).optional(),
        recurrenceCount: z.unknown().describe(
          "Output only. The duration of an introductory offer in billing cycles.",
        ).optional(),
        regionCode: z.unknown().describe(
          'Output only. 2-letter ISO region code where the product is available in. Ex. "US".',
        ).optional(),
      })).describe("Output only. Specifies the introductory pricing periods.")
        .optional(),
    }).describe("The details of a introductory pricing promotion.").optional(),
    promotion: z.string().describe(
      "Required. Promotion resource name that identifies a promotion. The format is 'partners/{partner_id}/promotions/{promotion_id}'.",
    ).optional(),
    type: z.enum([
      "PROMOTION_TYPE_UNSPECIFIED",
      "PROMOTION_TYPE_FREE_TRIAL",
      "PROMOTION_TYPE_INTRODUCTORY_PRICING",
    ]).describe("Output only. The type of the promotion for the spec.")
      .optional(),
  })).describe(
    "Optional. Subscription-level promotions. Only free trial is supported on this level. It determines the first renewal time of the subscription to be the end of the free trial period. Specify the promotion resource name only when used as input.",
  ).optional(),
  promotions: z.array(z.string()).describe(
    "Optional. Deprecated: consider using the top-level `promotion_specs` as the input. Optional. Resource name that identifies one or more promotions that can be applied on the product. A typical promotion for a subscription is Free trial. The format will be 'partners/{partner_id}/promotions/{promotion_id}'.",
  ).optional(),
  purchaseTime: z.string().describe(
    'Optional. The timestamp when the user transaction was made with the Partner. Specify for the case of "bundle with choice", and it must be before the provision_time (when the user makes a selection).',
  ).optional(),
  serviceLocation: z.object({
    postalCode: z.string().describe(
      'The postal code this location refers to. Ex. "94043"',
    ).optional(),
    regionCode: z.string().describe(
      "2-letter ISO region code for current content region. Ex. “US” Please refers to: https://en.wikipedia.org/wiki/ISO_3166-1",
    ).optional(),
  }).describe("Describes a location of an end user.").optional(),
  upgradeDowngradeDetails: z.object({
    billingCycleSpec: z.enum([
      "BILLING_CYCLE_SPEC_UNSPECIFIED",
      "BILLING_CYCLE_SPEC_ALIGN_WITH_PREVIOUS_SUBSCRIPTION",
      "BILLING_CYCLE_SPEC_START_IMMEDIATELY",
      "BILLING_CYCLE_SPEC_DEFERRED_TO_NEXT_RECURRENCE",
    ]).describe(
      "Required. Specifies the billing cycle spec for the new upgraded/downgraded subscription.",
    ).optional(),
    previousSubscriptionId: z.string().describe(
      "Required. The previous subscription id to be replaced. The format can be one of the following: 1. `subscription_id`: the old subscription id under the same partner_id. 2. `partners/{partner_id}/subscriptions/{subscription_id}`. A different partner_id is allowed. But they must be under the same partner group.",
    ).optional(),
  }).describe(
    "Details about the previous subscription that this new subscription upgrades/downgrades from.",
  ).optional(),
  subscriptionId: z.string().describe(
    "Required. Identifies the subscription resource on the Partner side. The value is restricted to 63 ASCII characters at the maximum. If a subscription with the same ID already exists, the creation fails with an `ALREADY_EXISTS` error.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  cancellationDetails: z.object({
    reason: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  cycleEndTime: z.string().optional(),
  endUserEntitled: z.boolean().optional(),
  freeTrialEndTime: z.string().optional(),
  lineItems: z.array(z.object({
    amount: z.object({
      amountMicros: z.string(),
      currencyCode: z.string(),
    }),
    bundleDetails: z.object({
      bundleElementDetails: z.array(z.object({
        product: z.unknown(),
        userAccountLinkedTime: z.unknown(),
      })),
    }),
    description: z.string(),
    finiteBillingCycleDetails: z.object({
      billingCycleCountLimit: z.string(),
    }),
    lineItemFreeTrialEndTime: z.string(),
    lineItemIndex: z.number(),
    lineItemPromotionSpecs: z.array(z.object({
      freeTrialDuration: z.object({
        count: z.unknown(),
        unit: z.unknown(),
      }),
      introductoryPricingDetails: z.object({
        introductoryPricingSpecs: z.unknown(),
      }),
      promotion: z.string(),
      type: z.string(),
    })),
    name: z.string(),
    oneTimeRecurrenceDetails: z.object({
      servicePeriod: z.object({
        endTime: z.string(),
        startTime: z.string(),
      }),
    }),
    product: z.string(),
    productPayload: z.object({
      googleHomePayload: z.object({
        attachedToGoogleStructure: z.boolean(),
        googleStructureId: z.string(),
        partnerStructureId: z.string(),
      }),
      googleOnePayload: z.object({
        campaigns: z.array(z.unknown()),
        offering: z.string(),
        salesChannel: z.string(),
        storeId: z.string(),
      }),
      youtubePayload: z.object({
        accessEndTime: z.string(),
        partnerEligibilityIds: z.array(z.unknown()),
        partnerPlanType: z.string(),
      }),
    }),
    recurrenceType: z.string(),
    state: z.string(),
  })).optional(),
  migrationDetails: z.object({
    migratedSubscriptionId: z.string(),
  }).optional(),
  name: z.string(),
  partnerUserToken: z.string().optional(),
  processingState: z.string().optional(),
  products: z.array(z.string()).optional(),
  promotionSpecs: z.array(z.object({
    freeTrialDuration: z.object({
      count: z.number(),
      unit: z.string(),
    }),
    introductoryPricingDetails: z.object({
      introductoryPricingSpecs: z.array(z.object({
        discountAmount: z.unknown(),
        discountRatioMicros: z.unknown(),
        recurrenceCount: z.unknown(),
        regionCode: z.unknown(),
      })),
    }),
    promotion: z.string(),
    type: z.string(),
  })).optional(),
  promotions: z.array(z.string()).optional(),
  purchaseTime: z.string().optional(),
  redirectUri: z.string().optional(),
  renewalTime: z.string().optional(),
  serviceLocation: z.object({
    postalCode: z.string(),
    regionCode: z.string(),
  }).optional(),
  state: z.string().optional(),
  updateTime: z.string().optional(),
  upgradeDowngradeDetails: z.object({
    billingCycleSpec: z.string(),
    previousSubscriptionId: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  cancellationDetails: z.object({
    reason: z.enum([
      "CANCELLATION_REASON_UNSPECIFIED",
      "CANCELLATION_REASON_FRAUD",
      "CANCELLATION_REASON_REMORSE",
      "CANCELLATION_REASON_ACCIDENTAL_PURCHASE",
      "CANCELLATION_REASON_PAST_DUE",
      "CANCELLATION_REASON_ACCOUNT_CLOSED",
      "CANCELLATION_REASON_UPGRADE_DOWNGRADE",
      "CANCELLATION_REASON_USER_DELINQUENCY",
      "CANCELLATION_REASON_SYSTEM_ERROR",
      "CANCELLATION_REASON_SYSTEM_CANCEL",
      "CANCELLATION_REASON_BILLING_SYSTEM_SWITCH",
      "CANCELLATION_REASON_OTHER",
    ]).describe("Output only. The reason of the cancellation.").optional(),
  }).describe(
    "Describes the details of a cancelled or cancelling subscription.",
  ).optional(),
  lineItems: z.array(z.object({
    amount: z.object({
      amountMicros: z.string().describe(
        "Required. Amount in micros (1_000_000 micros = 1 currency unit)",
      ).optional(),
      currencyCode: z.string().describe(
        "Required. Currency codes in accordance with [ISO-4217 Currency Codes] (https://en.wikipedia.org/wiki/ISO_4217). For example, USD.",
      ).optional(),
    }).describe("Describes the amount unit including the currency code.")
      .optional(),
    bundleDetails: z.object({
      bundleElementDetails: z.array(z.object({
        product: z.unknown().describe(
          "Output only. Product resource name that identifies the bundle element. The format is 'partners/{partner_id}/products/{product_id}'.",
        ).optional(),
        userAccountLinkedTime: z.unknown().describe(
          "Output only. The time when this product is linked to an end user.",
        ).optional(),
      })).describe(
        "Output only. The details for each element in the hard bundle.",
      ).optional(),
    }).describe(
      "The bundle details for a line item corresponding to a hard bundle.",
    ).optional(),
    description: z.string().describe(
      "Output only. Description of this line item.",
    ).optional(),
    finiteBillingCycleDetails: z.object({
      billingCycleCountLimit: z.string().describe(
        "The number of a subscription line item billing cycles after which billing will stop automatically.",
      ).optional(),
    }).describe(
      "Details for a subscription line item with finite billing cycles.",
    ).optional(),
    lineItemFreeTrialEndTime: z.string().describe(
      'Output only. The free trial end time will be populated after the line item is successfully processed. End time of the line item free trial period, in ISO 8061 format. For example, "2019-08-31T17:28:54.564Z". It will be set the same as createTime if no free trial promotion is specified.',
    ).optional(),
    lineItemIndex: z.number().int().describe(
      "Output only. A unique index of the subscription line item.",
    ).optional(),
    lineItemPromotionSpecs: z.array(z.object({
      freeTrialDuration: z.object({
        count: z.unknown().describe("number of duration units to be included.")
          .optional(),
        unit: z.unknown().describe("The unit used for the duration").optional(),
      }).describe("Describes the length of a period of a time.").optional(),
      introductoryPricingDetails: z.object({
        introductoryPricingSpecs: z.unknown().describe(
          "Output only. Specifies the introductory pricing periods.",
        ).optional(),
      }).describe("The details of a introductory pricing promotion.")
        .optional(),
      promotion: z.string().describe(
        "Required. Promotion resource name that identifies a promotion. The format is 'partners/{partner_id}/promotions/{promotion_id}'.",
      ).optional(),
      type: z.enum([
        "PROMOTION_TYPE_UNSPECIFIED",
        "PROMOTION_TYPE_FREE_TRIAL",
        "PROMOTION_TYPE_INTRODUCTORY_PRICING",
      ]).describe("Output only. The type of the promotion for the spec.")
        .optional(),
    })).describe(
      "Optional. The promotions applied on the line item. It can be: - an introductory pricing promotion. - a free trial promotion. This feature is not enabled. If used, the request will be rejected. When used as input in Create or Provision API, specify its resource name only.",
    ).optional(),
    name: z.string().describe(
      "Identifier. Resource name of the line item. Format: partners/{partner}/subscriptions/{subscription}/lineItems/{lineItem}",
    ).optional(),
    oneTimeRecurrenceDetails: z.object({
      servicePeriod: z.object({
        endTime: z.string().describe(
          "Optional. The end time of the service period. Time is exclusive.",
        ).optional(),
        startTime: z.string().describe(
          "Required. The start time of the service period. Time is inclusive.",
        ).optional(),
      }).describe(
        "A description of what time period or moment in time the product or service is being delivered over.",
      ).optional(),
    }).describe("Details for a ONE_TIME recurrence line item.").optional(),
    product: z.string().describe(
      "Required. Product resource name that identifies the product associated with this line item. The format is 'partners/{partner_id}/products/{product_id}'.",
    ).optional(),
    productPayload: z.object({
      googleHomePayload: z.object({
        attachedToGoogleStructure: z.boolean().describe(
          "Output only. This identifies whether the subscription is attached to a Google Home structure.",
        ).optional(),
        googleStructureId: z.string().describe(
          "Optional. Structure identifier on Google side.",
        ).optional(),
        partnerStructureId: z.string().describe(
          "Optional. This identifies the structure ID on partner side that the subscription should be applied to. Only required when the partner requires structure mapping.",
        ).optional(),
      }).describe("Payload specific for Google Home products.").optional(),
      googleOnePayload: z.object({
        campaigns: z.array(z.unknown()).describe(
          "Campaign attributed to sales of this subscription.",
        ).optional(),
        offering: z.enum([
          "OFFERING_UNSPECIFIED",
          "OFFERING_VAS_BUNDLE",
          "OFFERING_VAS_STANDALONE",
          "OFFERING_HARD_BUNDLE",
          "OFFERING_SOFT_BUNDLE",
        ]).describe(
          "The type of offering the subscription was sold by the partner. e.g. VAS.",
        ).optional(),
        salesChannel: z.enum([
          "CHANNEL_UNSPECIFIED",
          "CHANNEL_RETAIL",
          "CHANNEL_ONLINE_WEB",
          "CHANNEL_ONLINE_ANDROID_APP",
          "CHANNEL_ONLINE_IOS_APP",
        ]).describe(
          "The type of sales channel through which the subscription was sold.",
        ).optional(),
        storeId: z.string().describe(
          "The identifier for the partner store where the subscription was sold.",
        ).optional(),
      }).describe("Payload specific to Google One products.").optional(),
      youtubePayload: z.object({
        accessEndTime: z.string().describe(
          "Output only. The access expiration time for this line item.",
        ).optional(),
        partnerEligibilityIds: z.array(z.unknown()).describe(
          "The list of eligibility_ids which are applicable for the line item.",
        ).optional(),
        partnerPlanType: z.enum([
          "PARTNER_PLAN_TYPE_UNSPECIFIED",
          "PARTNER_PLAN_TYPE_STANDALONE",
          "PARTNER_PLAN_TYPE_HARD_BUNDLE",
          "PARTNER_PLAN_TYPE_SOFT_BUNDLE",
        ]).describe(
          "Optional. Specifies the plan type offered to the end user by the partner.",
        ).optional(),
      }).describe("Payload specific to Youtube products.").optional(),
    }).describe("Specifies product specific payload.").optional(),
    recurrenceType: z.enum([
      "LINE_ITEM_RECURRENCE_TYPE_UNSPECIFIED",
      "LINE_ITEM_RECURRENCE_TYPE_PERIODIC",
      "LINE_ITEM_RECURRENCE_TYPE_ONE_TIME",
    ]).describe("Output only. The recurrence type of the line item.")
      .optional(),
    state: z.enum([
      "LINE_ITEM_STATE_UNSPECIFIED",
      "LINE_ITEM_STATE_ACTIVE",
      "LINE_ITEM_STATE_INACTIVE",
      "LINE_ITEM_STATE_NEW",
      "LINE_ITEM_STATE_ACTIVATING",
      "LINE_ITEM_STATE_DEACTIVATING",
      "LINE_ITEM_STATE_WAITING_TO_DEACTIVATE",
      "LINE_ITEM_STATE_OFF_CYCLE_CHARGING",
    ]).describe("Output only. The state of the line item.").optional(),
  })).describe("Required. The line items of the subscription.").optional(),
  migrationDetails: z.object({
    migratedSubscriptionId: z.string().describe(
      "Output only. The migrated subscription id in the legacy system.",
    ).optional(),
  }).describe("Describes the details of the migrated subscription.").optional(),
  name: z.string().describe(
    'Identifier. Resource name of the subscription. It will have the format of "partners/{partner_id}/subscriptions/{subscription_id}". This is available for authorizeAddon, but otherwise is response only.',
  ).optional(),
  partnerUserToken: z.string().describe(
    "Required. Identifier of the end-user in partner’s system. The value is restricted to 63 ASCII characters at the maximum.",
  ).optional(),
  products: z.array(z.string()).describe(
    "Optional. Deprecated: consider using `line_items` as the input. Required. Resource name that identifies the purchased products. The format will be 'partners/{partner_id}/products/{product_id}'.",
  ).optional(),
  promotionSpecs: z.array(z.object({
    freeTrialDuration: z.object({
      count: z.number().int().describe(
        "number of duration units to be included.",
      ).optional(),
      unit: z.enum(["UNIT_UNSPECIFIED", "MONTH", "DAY", "HOUR"]).describe(
        "The unit used for the duration",
      ).optional(),
    }).describe("Describes the length of a period of a time.").optional(),
    introductoryPricingDetails: z.object({
      introductoryPricingSpecs: z.array(z.object({
        discountAmount: z.unknown().describe(
          "Describes the amount unit including the currency code.",
        ).optional(),
        discountRatioMicros: z.unknown().describe(
          "Output only. The discount percentage in micros. For example, 50,000 represents 5%.",
        ).optional(),
        recurrenceCount: z.unknown().describe(
          "Output only. The duration of an introductory offer in billing cycles.",
        ).optional(),
        regionCode: z.unknown().describe(
          'Output only. 2-letter ISO region code where the product is available in. Ex. "US".',
        ).optional(),
      })).describe("Output only. Specifies the introductory pricing periods.")
        .optional(),
    }).describe("The details of a introductory pricing promotion.").optional(),
    promotion: z.string().describe(
      "Required. Promotion resource name that identifies a promotion. The format is 'partners/{partner_id}/promotions/{promotion_id}'.",
    ).optional(),
    type: z.enum([
      "PROMOTION_TYPE_UNSPECIFIED",
      "PROMOTION_TYPE_FREE_TRIAL",
      "PROMOTION_TYPE_INTRODUCTORY_PRICING",
    ]).describe("Output only. The type of the promotion for the spec.")
      .optional(),
  })).describe(
    "Optional. Subscription-level promotions. Only free trial is supported on this level. It determines the first renewal time of the subscription to be the end of the free trial period. Specify the promotion resource name only when used as input.",
  ).optional(),
  promotions: z.array(z.string()).describe(
    "Optional. Deprecated: consider using the top-level `promotion_specs` as the input. Optional. Resource name that identifies one or more promotions that can be applied on the product. A typical promotion for a subscription is Free trial. The format will be 'partners/{partner_id}/promotions/{promotion_id}'.",
  ).optional(),
  purchaseTime: z.string().describe(
    'Optional. The timestamp when the user transaction was made with the Partner. Specify for the case of "bundle with choice", and it must be before the provision_time (when the user makes a selection).',
  ).optional(),
  serviceLocation: z.object({
    postalCode: z.string().describe(
      'The postal code this location refers to. Ex. "94043"',
    ).optional(),
    regionCode: z.string().describe(
      "2-letter ISO region code for current content region. Ex. “US” Please refers to: https://en.wikipedia.org/wiki/ISO_3166-1",
    ).optional(),
  }).describe("Describes a location of an end user.").optional(),
  upgradeDowngradeDetails: z.object({
    billingCycleSpec: z.enum([
      "BILLING_CYCLE_SPEC_UNSPECIFIED",
      "BILLING_CYCLE_SPEC_ALIGN_WITH_PREVIOUS_SUBSCRIPTION",
      "BILLING_CYCLE_SPEC_START_IMMEDIATELY",
      "BILLING_CYCLE_SPEC_DEFERRED_TO_NEXT_RECURRENCE",
    ]).describe(
      "Required. Specifies the billing cycle spec for the new upgraded/downgraded subscription.",
    ).optional(),
    previousSubscriptionId: z.string().describe(
      "Required. The previous subscription id to be replaced. The format can be one of the following: 1. `subscription_id`: the old subscription id under the same partner_id. 2. `partners/{partner_id}/subscriptions/{subscription_id}`. A different partner_id is allowed. But they must be under the same partner group.",
    ).optional(),
  }).describe(
    "Details about the previous subscription that this new subscription upgrades/downgrades from.",
  ).optional(),
  subscriptionId: z.string().describe(
    "Required. Identifies the subscription resource on the Partner side. The value is restricted to 63 ASCII characters at the maximum. If a subscription with the same ID already exists, the creation fails with an `ALREADY_EXISTS` error.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Payments Reseller Subscription Partners.Subscriptions. Registered at `@swamp/gcp/paymentsresellersubscription/partners-subscriptions`. */
export const model = {
  type: "@swamp/gcp/paymentsresellersubscription/partners-subscriptions",
  version: "2026.05.26.1",
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
      toVersion: "2026.05.02.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.2",
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
      toVersion: "2026.05.20.1",
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
      toVersion: "2026.05.26.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Acts as a central billing entity between an external partner and Google. Goog...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a subscriptions",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["cancellationDetails"] !== undefined) {
          body["cancellationDetails"] = g["cancellationDetails"];
        }
        if (g["lineItems"] !== undefined) body["lineItems"] = g["lineItems"];
        if (g["migrationDetails"] !== undefined) {
          body["migrationDetails"] = g["migrationDetails"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["partnerUserToken"] !== undefined) {
          body["partnerUserToken"] = g["partnerUserToken"];
        }
        if (g["products"] !== undefined) body["products"] = g["products"];
        if (g["promotionSpecs"] !== undefined) {
          body["promotionSpecs"] = g["promotionSpecs"];
        }
        if (g["promotions"] !== undefined) body["promotions"] = g["promotions"];
        if (g["purchaseTime"] !== undefined) {
          body["purchaseTime"] = g["purchaseTime"];
        }
        if (g["serviceLocation"] !== undefined) {
          body["serviceLocation"] = g["serviceLocation"];
        }
        if (g["upgradeDowngradeDetails"] !== undefined) {
          body["upgradeDowngradeDetails"] = g["upgradeDowngradeDetails"];
        }
        if (g["subscriptionId"] !== undefined) {
          body["subscriptionId"] = g["subscriptionId"];
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
      description: "Get a subscriptions",
      arguments: z.object({
        identifier: z.string().describe("The name of the subscriptions"),
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
    sync: {
      description: "Sync subscriptions state from GCP",
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
    cancel: {
      description: "cancel",
      arguments: z.object({
        cancelImmediately: z.any().optional(),
        cancellationReason: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["cancelImmediately"] !== undefined) {
          body["cancelImmediately"] = args["cancelImmediately"];
        }
        if (args["cancellationReason"] !== undefined) {
          body["cancellationReason"] = args["cancellationReason"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "paymentsresellersubscription.partners.subscriptions.cancel",
            "path": "v1/{+name}:cancel",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    entitle: {
      description: "entitle",
      arguments: z.object({
        lineItemEntitlementDetails: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["lineItemEntitlementDetails"] !== undefined) {
          body["lineItemEntitlementDetails"] =
            args["lineItemEntitlementDetails"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "paymentsresellersubscription.partners.subscriptions.entitle",
            "path": "v1/{+name}:entitle",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    extend: {
      description: "extend",
      arguments: z.object({
        extension: z.any().optional(),
        requestId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["extension"] !== undefined) {
          body["extension"] = args["extension"];
        }
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "paymentsresellersubscription.partners.subscriptions.extend",
            "path": "v1/{+name}:extend",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    provision: {
      description: "provision",
      arguments: z.object({
        cancellationDetails: z.any().optional(),
        createTime: z.any().optional(),
        cycleEndTime: z.any().optional(),
        endUserEntitled: z.any().optional(),
        freeTrialEndTime: z.any().optional(),
        lineItems: z.any().optional(),
        migrationDetails: z.any().optional(),
        name: z.any().optional(),
        partnerUserToken: z.any().optional(),
        processingState: z.any().optional(),
        products: z.any().optional(),
        promotionSpecs: z.any().optional(),
        promotions: z.any().optional(),
        purchaseTime: z.any().optional(),
        redirectUri: z.any().optional(),
        renewalTime: z.any().optional(),
        serviceLocation: z.any().optional(),
        state: z.any().optional(),
        updateTime: z.any().optional(),
        upgradeDowngradeDetails: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (args["cancellationDetails"] !== undefined) {
          body["cancellationDetails"] = args["cancellationDetails"];
        }
        if (args["createTime"] !== undefined) {
          body["createTime"] = args["createTime"];
        }
        if (args["cycleEndTime"] !== undefined) {
          body["cycleEndTime"] = args["cycleEndTime"];
        }
        if (args["endUserEntitled"] !== undefined) {
          body["endUserEntitled"] = args["endUserEntitled"];
        }
        if (args["freeTrialEndTime"] !== undefined) {
          body["freeTrialEndTime"] = args["freeTrialEndTime"];
        }
        if (args["lineItems"] !== undefined) {
          body["lineItems"] = args["lineItems"];
        }
        if (args["migrationDetails"] !== undefined) {
          body["migrationDetails"] = args["migrationDetails"];
        }
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["partnerUserToken"] !== undefined) {
          body["partnerUserToken"] = args["partnerUserToken"];
        }
        if (args["processingState"] !== undefined) {
          body["processingState"] = args["processingState"];
        }
        if (args["products"] !== undefined) body["products"] = args["products"];
        if (args["promotionSpecs"] !== undefined) {
          body["promotionSpecs"] = args["promotionSpecs"];
        }
        if (args["promotions"] !== undefined) {
          body["promotions"] = args["promotions"];
        }
        if (args["purchaseTime"] !== undefined) {
          body["purchaseTime"] = args["purchaseTime"];
        }
        if (args["redirectUri"] !== undefined) {
          body["redirectUri"] = args["redirectUri"];
        }
        if (args["renewalTime"] !== undefined) {
          body["renewalTime"] = args["renewalTime"];
        }
        if (args["serviceLocation"] !== undefined) {
          body["serviceLocation"] = args["serviceLocation"];
        }
        if (args["state"] !== undefined) body["state"] = args["state"];
        if (args["updateTime"] !== undefined) {
          body["updateTime"] = args["updateTime"];
        }
        if (args["upgradeDowngradeDetails"] !== undefined) {
          body["upgradeDowngradeDetails"] = args["upgradeDowngradeDetails"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "paymentsresellersubscription.partners.subscriptions.provision",
            "path": "v1/{+parent}/subscriptions:provision",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "cycleOptions.initialCycleDuration.count": {
                "location": "query",
              },
              "cycleOptions.initialCycleDuration.unit": { "location": "query" },
              "parent": { "location": "path", "required": true },
              "subscriptionId": { "location": "query" },
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
      arguments: z.object({
        cycleOptions: z.any().optional(),
        resumeMode: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["cycleOptions"] !== undefined) {
          body["cycleOptions"] = args["cycleOptions"];
        }
        if (args["resumeMode"] !== undefined) {
          body["resumeMode"] = args["resumeMode"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "paymentsresellersubscription.partners.subscriptions.resume",
            "path": "v1/{+name}:resume",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    suspend: {
      description: "suspend",
      arguments: z.object({
        suspendMode: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["suspendMode"] !== undefined) {
          body["suspendMode"] = args["suspendMode"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "paymentsresellersubscription.partners.subscriptions.suspend",
            "path": "v1/{+name}:suspend",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    undo_cancel: {
      description: "undo cancel",
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
            "id":
              "paymentsresellersubscription.partners.subscriptions.undoCancel",
            "path": "v1/{+name}:undoCancel",
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
