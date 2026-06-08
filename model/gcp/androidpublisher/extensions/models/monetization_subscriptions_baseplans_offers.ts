// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/gcp/androidpublisher/monetization-subscriptions-baseplans-offers
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Play Android Developer Monetization.Subscriptions.BasePlans.Offers.
 *
 * A single, temporary offer
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

const BASE_URL = "https://androidpublisher.googleapis.com/";

const GET_CONFIG = {
  "id": "androidpublisher.monetization.subscriptions.basePlans.offers.get",
  "path":
    "androidpublisher/v3/applications/{packageName}/subscriptions/{productId}/basePlans/{basePlanId}/offers/{offerId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "packageName",
    "productId",
    "basePlanId",
    "offerId",
  ],
  "parameters": {
    "basePlanId": {
      "location": "path",
      "required": true,
    },
    "offerId": {
      "location": "path",
      "required": true,
    },
    "packageName": {
      "location": "path",
      "required": true,
    },
    "productId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "androidpublisher.monetization.subscriptions.basePlans.offers.create",
  "path":
    "androidpublisher/v3/applications/{packageName}/subscriptions/{productId}/basePlans/{basePlanId}/offers",
  "httpMethod": "POST",
  "parameterOrder": [
    "packageName",
    "productId",
    "basePlanId",
  ],
  "parameters": {
    "basePlanId": {
      "location": "path",
      "required": true,
    },
    "offerId": {
      "location": "query",
    },
    "packageName": {
      "location": "path",
      "required": true,
    },
    "productId": {
      "location": "path",
      "required": true,
    },
    "regionsVersion.version": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "androidpublisher.monetization.subscriptions.basePlans.offers.patch",
  "path":
    "androidpublisher/v3/applications/{packageName}/subscriptions/{productId}/basePlans/{basePlanId}/offers/{offerId}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "packageName",
    "productId",
    "basePlanId",
    "offerId",
  ],
  "parameters": {
    "allowMissing": {
      "location": "query",
    },
    "basePlanId": {
      "location": "path",
      "required": true,
    },
    "latencyTolerance": {
      "location": "query",
    },
    "offerId": {
      "location": "path",
      "required": true,
    },
    "packageName": {
      "location": "path",
      "required": true,
    },
    "productId": {
      "location": "path",
      "required": true,
    },
    "regionsVersion.version": {
      "location": "query",
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "androidpublisher.monetization.subscriptions.basePlans.offers.delete",
  "path":
    "androidpublisher/v3/applications/{packageName}/subscriptions/{productId}/basePlans/{basePlanId}/offers/{offerId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "packageName",
    "productId",
    "basePlanId",
    "offerId",
  ],
  "parameters": {
    "basePlanId": {
      "location": "path",
      "required": true,
    },
    "offerId": {
      "location": "path",
      "required": true,
    },
    "packageName": {
      "location": "path",
      "required": true,
    },
    "productId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "androidpublisher.monetization.subscriptions.basePlans.offers.list",
  "path":
    "androidpublisher/v3/applications/{packageName}/subscriptions/{productId}/basePlans/{basePlanId}/offers",
  "httpMethod": "GET",
  "parameterOrder": [
    "packageName",
    "productId",
    "basePlanId",
  ],
  "parameters": {
    "basePlanId": {
      "location": "path",
      "required": true,
    },
    "packageName": {
      "location": "path",
      "required": true,
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "productId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  basePlanId: z.string().describe(
    "Required. Immutable. The ID of the base plan to which this offer is an extension.",
  ).optional(),
  offerId: z.string().describe(
    "Required. Immutable. Unique ID of this subscription offer. Must be unique within the base plan.",
  ).optional(),
  offerTags: z.array(z.object({
    tag: z.string().describe(
      "Must conform with RFC-1034. That is, this string can only contain lower-case letters (a-z), numbers (0-9), and hyphens (-), and be at most 20 characters.",
    ).optional(),
  })).describe(
    "List of up to 20 custom tags specified for this offer, and returned to the app through the billing library.",
  ).optional(),
  otherRegionsConfig: z.object({
    otherRegionsNewSubscriberAvailability: z.boolean().describe(
      "Whether the subscription offer in any new locations Play may launch in the future. If not specified, this will default to false.",
    ).optional(),
  }).describe(
    "Configuration for any new locations Play may launch in specified on a subscription offer.",
  ).optional(),
  packageName: z.string().describe(
    "Required. Immutable. The package name of the app the parent subscription belongs to.",
  ).optional(),
  phases: z.array(z.object({
    duration: z.string().describe(
      "Required. The duration of a single recurrence of this phase. Specified in ISO 8601 format.",
    ).optional(),
    otherRegionsConfig: z.object({
      absoluteDiscounts: z.object({
        eurPrice: z.object({
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
        usdPrice: z.object({
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
      }).describe(
        "Pricing information for any new locations Play may launch in.",
      ).optional(),
      free: z.object({}).describe(
        "Represents the free price override configuration for any new locations Play may launch for a single offer phase.",
      ).optional(),
      otherRegionsPrices: z.object({
        eurPrice: z.object({
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
        usdPrice: z.object({
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
      }).describe(
        "Pricing information for any new locations Play may launch in.",
      ).optional(),
      relativeDiscount: z.number().describe(
        "The fraction of the base plan price prorated over the phase duration that the user pays for this offer phase. For example, if the base plan price for this region is $12 for a period of 1 year, then a 50% discount for a phase of a duration of 3 months would correspond to a price of $1.50. The discount must be specified as a fraction strictly larger than 0 and strictly smaller than 1. The resulting price will be rounded to the nearest billable unit (e.g. cents for USD). The relative discount is considered invalid if the discounted price ends up being smaller than the minimum price allowed in any new locations Play may launch in.",
      ).optional(),
    }).describe(
      "Configuration for any new locations Play may launch in for a single offer phase.",
    ).optional(),
    recurrenceCount: z.number().int().describe(
      "Required. The number of times this phase repeats. If this offer phase is not free, each recurrence charges the user the price of this offer phase.",
    ).optional(),
    regionalConfigs: z.array(z.object({
      absoluteDiscount: z.object({
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
      free: z.object({}).describe(
        "Represents the free price override configuration for a single phase of a subscription offer",
      ).optional(),
      price: z.object({
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
      regionCode: z.string().describe(
        "Required. Immutable. The region to which this config applies.",
      ).optional(),
      relativeDiscount: z.number().describe(
        "The fraction of the base plan price prorated over the phase duration that the user pays for this offer phase. For example, if the base plan price for this region is $12 for a period of 1 year, then a 50% discount for a phase of a duration of 3 months would correspond to a price of $1.50. The discount must be specified as a fraction strictly larger than 0 and strictly smaller than 1. The resulting price will be rounded to the nearest billable unit (e.g. cents for USD). The relative discount is considered invalid if the discounted price ends up being smaller than the minimum price allowed in this region.",
      ).optional(),
    })).describe(
      "Required. The region-specific configuration of this offer phase. This list must contain exactly one entry for each region for which the subscription offer has a regional config.",
    ).optional(),
  })).describe(
    "Required. The phases of this subscription offer. Must contain at least one and at most two entries. Users will always receive all these phases in the specified order.",
  ).optional(),
  productId: z.string().describe(
    "Required. Immutable. The ID of the parent subscription this offer belongs to.",
  ).optional(),
  regionalConfigs: z.array(z.object({
    newSubscriberAvailability: z.boolean().describe(
      "Whether the subscription offer in the specified region is available for new subscribers. Existing subscribers will not have their subscription cancelled if this value is set to false. If not specified, this will default to false.",
    ).optional(),
    regionCode: z.string().describe(
      'Required. Immutable. Region code this configuration applies to, as defined by ISO 3166-2, e.g. "US".',
    ).optional(),
  })).describe(
    "Required. The region-specific configuration of this offer. Must contain at least one entry.",
  ).optional(),
  targeting: z.object({
    acquisitionRule: z.object({
      scope: z.object({
        anySubscriptionInApp: z.object({}).describe(
          "Represents the targeting rule scope corresponding to any subscription in the parent app.",
        ).optional(),
        specificSubscriptionInApp: z.string().describe(
          "The scope of the current targeting rule is the subscription with the specified subscription ID. Must be a subscription within the same parent app.",
        ).optional(),
        thisSubscription: z.object({}).describe(
          "Represents the targeting rule scope corresponding to the subscriptions in which this offer is defined.",
        ).optional(),
      }).describe(
        "Defines the scope of subscriptions which a targeting rule can match to target offers to users based on past or current entitlement.",
      ).optional(),
    }).describe(
      "Represents a targeting rule of the form: User never had {scope} before.",
    ).optional(),
    upgradeRule: z.object({
      billingPeriodDuration: z.string().describe(
        "The specific billing period duration, specified in ISO 8601 format, that a user must be currently subscribed to to be eligible for this rule. If not specified, users subscribed to any billing period are matched.",
      ).optional(),
      oncePerUser: z.boolean().describe(
        "Limit this offer to only once per user. If set to true, a user can never be eligible for this offer again if they ever subscribed to this offer.",
      ).optional(),
      scope: z.object({
        anySubscriptionInApp: z.object({}).describe(
          "Represents the targeting rule scope corresponding to any subscription in the parent app.",
        ).optional(),
        specificSubscriptionInApp: z.string().describe(
          "The scope of the current targeting rule is the subscription with the specified subscription ID. Must be a subscription within the same parent app.",
        ).optional(),
        thisSubscription: z.object({}).describe(
          "Represents the targeting rule scope corresponding to the subscriptions in which this offer is defined.",
        ).optional(),
      }).describe(
        "Defines the scope of subscriptions which a targeting rule can match to target offers to users based on past or current entitlement.",
      ).optional(),
    }).describe(
      "Represents a targeting rule of the form: User currently has {scope} [with billing period {billing_period}].",
    ).optional(),
  }).describe("Defines the rule a user needs to satisfy to receive this offer.")
    .optional(),
  regionsVersion_version: z.string().describe(
    "Required. A string representing the version of available regions being used for the specified resource. Regional prices and latest supported version for the resource have to be specified according to the information published in [this article](https://support.google.com/googleplay/android-developer/answer/10532353). Each time the supported locations substantially change, the version will be incremented. Using this field will ensure that creating and updating the resource with an older region's version and set of regional prices and currencies will succeed even though a new version is available.",
  ).optional(),
});

const StateSchema = z.object({
  basePlanId: z.string().optional(),
  offerId: z.string().optional(),
  offerTags: z.array(z.object({
    tag: z.string(),
  })).optional(),
  otherRegionsConfig: z.object({
    otherRegionsNewSubscriberAvailability: z.boolean(),
  }).optional(),
  packageName: z.string().optional(),
  phases: z.array(z.object({
    duration: z.string(),
    otherRegionsConfig: z.object({
      absoluteDiscounts: z.object({
        eurPrice: z.object({
          currencyCode: z.unknown(),
          nanos: z.unknown(),
          units: z.unknown(),
        }),
        usdPrice: z.object({
          currencyCode: z.unknown(),
          nanos: z.unknown(),
          units: z.unknown(),
        }),
      }),
      free: z.object({}),
      otherRegionsPrices: z.object({
        eurPrice: z.object({
          currencyCode: z.unknown(),
          nanos: z.unknown(),
          units: z.unknown(),
        }),
        usdPrice: z.object({
          currencyCode: z.unknown(),
          nanos: z.unknown(),
          units: z.unknown(),
        }),
      }),
      relativeDiscount: z.number(),
    }),
    recurrenceCount: z.number(),
    regionalConfigs: z.array(z.object({
      absoluteDiscount: z.object({
        currencyCode: z.unknown(),
        nanos: z.unknown(),
        units: z.unknown(),
      }),
      free: z.object({}),
      price: z.object({
        currencyCode: z.unknown(),
        nanos: z.unknown(),
        units: z.unknown(),
      }),
      regionCode: z.string(),
      relativeDiscount: z.number(),
    })),
  })).optional(),
  productId: z.string().optional(),
  regionalConfigs: z.array(z.object({
    newSubscriberAvailability: z.boolean(),
    regionCode: z.string(),
  })).optional(),
  state: z.string().optional(),
  targeting: z.object({
    acquisitionRule: z.object({
      scope: z.object({
        anySubscriptionInApp: z.object({}),
        specificSubscriptionInApp: z.string(),
        thisSubscription: z.object({}),
      }),
    }),
    upgradeRule: z.object({
      billingPeriodDuration: z.string(),
      oncePerUser: z.boolean(),
      scope: z.object({
        anySubscriptionInApp: z.object({}),
        specificSubscriptionInApp: z.string(),
        thisSubscription: z.object({}),
      }),
    }),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  basePlanId: z.string().describe(
    "Required. Immutable. The ID of the base plan to which this offer is an extension.",
  ).optional(),
  offerId: z.string().describe(
    "Required. Immutable. Unique ID of this subscription offer. Must be unique within the base plan.",
  ).optional(),
  offerTags: z.array(z.object({
    tag: z.string().describe(
      "Must conform with RFC-1034. That is, this string can only contain lower-case letters (a-z), numbers (0-9), and hyphens (-), and be at most 20 characters.",
    ).optional(),
  })).describe(
    "List of up to 20 custom tags specified for this offer, and returned to the app through the billing library.",
  ).optional(),
  otherRegionsConfig: z.object({
    otherRegionsNewSubscriberAvailability: z.boolean().describe(
      "Whether the subscription offer in any new locations Play may launch in the future. If not specified, this will default to false.",
    ).optional(),
  }).describe(
    "Configuration for any new locations Play may launch in specified on a subscription offer.",
  ).optional(),
  packageName: z.string().describe(
    "Required. Immutable. The package name of the app the parent subscription belongs to.",
  ).optional(),
  phases: z.array(z.object({
    duration: z.string().describe(
      "Required. The duration of a single recurrence of this phase. Specified in ISO 8601 format.",
    ).optional(),
    otherRegionsConfig: z.object({
      absoluteDiscounts: z.object({
        eurPrice: z.object({
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
        usdPrice: z.object({
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
      }).describe(
        "Pricing information for any new locations Play may launch in.",
      ).optional(),
      free: z.object({}).describe(
        "Represents the free price override configuration for any new locations Play may launch for a single offer phase.",
      ).optional(),
      otherRegionsPrices: z.object({
        eurPrice: z.object({
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
        usdPrice: z.object({
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
      }).describe(
        "Pricing information for any new locations Play may launch in.",
      ).optional(),
      relativeDiscount: z.number().describe(
        "The fraction of the base plan price prorated over the phase duration that the user pays for this offer phase. For example, if the base plan price for this region is $12 for a period of 1 year, then a 50% discount for a phase of a duration of 3 months would correspond to a price of $1.50. The discount must be specified as a fraction strictly larger than 0 and strictly smaller than 1. The resulting price will be rounded to the nearest billable unit (e.g. cents for USD). The relative discount is considered invalid if the discounted price ends up being smaller than the minimum price allowed in any new locations Play may launch in.",
      ).optional(),
    }).describe(
      "Configuration for any new locations Play may launch in for a single offer phase.",
    ).optional(),
    recurrenceCount: z.number().int().describe(
      "Required. The number of times this phase repeats. If this offer phase is not free, each recurrence charges the user the price of this offer phase.",
    ).optional(),
    regionalConfigs: z.array(z.object({
      absoluteDiscount: z.object({
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
      free: z.object({}).describe(
        "Represents the free price override configuration for a single phase of a subscription offer",
      ).optional(),
      price: z.object({
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
      regionCode: z.string().describe(
        "Required. Immutable. The region to which this config applies.",
      ).optional(),
      relativeDiscount: z.number().describe(
        "The fraction of the base plan price prorated over the phase duration that the user pays for this offer phase. For example, if the base plan price for this region is $12 for a period of 1 year, then a 50% discount for a phase of a duration of 3 months would correspond to a price of $1.50. The discount must be specified as a fraction strictly larger than 0 and strictly smaller than 1. The resulting price will be rounded to the nearest billable unit (e.g. cents for USD). The relative discount is considered invalid if the discounted price ends up being smaller than the minimum price allowed in this region.",
      ).optional(),
    })).describe(
      "Required. The region-specific configuration of this offer phase. This list must contain exactly one entry for each region for which the subscription offer has a regional config.",
    ).optional(),
  })).describe(
    "Required. The phases of this subscription offer. Must contain at least one and at most two entries. Users will always receive all these phases in the specified order.",
  ).optional(),
  productId: z.string().describe(
    "Required. Immutable. The ID of the parent subscription this offer belongs to.",
  ).optional(),
  regionalConfigs: z.array(z.object({
    newSubscriberAvailability: z.boolean().describe(
      "Whether the subscription offer in the specified region is available for new subscribers. Existing subscribers will not have their subscription cancelled if this value is set to false. If not specified, this will default to false.",
    ).optional(),
    regionCode: z.string().describe(
      'Required. Immutable. Region code this configuration applies to, as defined by ISO 3166-2, e.g. "US".',
    ).optional(),
  })).describe(
    "Required. The region-specific configuration of this offer. Must contain at least one entry.",
  ).optional(),
  targeting: z.object({
    acquisitionRule: z.object({
      scope: z.object({
        anySubscriptionInApp: z.object({}).describe(
          "Represents the targeting rule scope corresponding to any subscription in the parent app.",
        ).optional(),
        specificSubscriptionInApp: z.string().describe(
          "The scope of the current targeting rule is the subscription with the specified subscription ID. Must be a subscription within the same parent app.",
        ).optional(),
        thisSubscription: z.object({}).describe(
          "Represents the targeting rule scope corresponding to the subscriptions in which this offer is defined.",
        ).optional(),
      }).describe(
        "Defines the scope of subscriptions which a targeting rule can match to target offers to users based on past or current entitlement.",
      ).optional(),
    }).describe(
      "Represents a targeting rule of the form: User never had {scope} before.",
    ).optional(),
    upgradeRule: z.object({
      billingPeriodDuration: z.string().describe(
        "The specific billing period duration, specified in ISO 8601 format, that a user must be currently subscribed to to be eligible for this rule. If not specified, users subscribed to any billing period are matched.",
      ).optional(),
      oncePerUser: z.boolean().describe(
        "Limit this offer to only once per user. If set to true, a user can never be eligible for this offer again if they ever subscribed to this offer.",
      ).optional(),
      scope: z.object({
        anySubscriptionInApp: z.object({}).describe(
          "Represents the targeting rule scope corresponding to any subscription in the parent app.",
        ).optional(),
        specificSubscriptionInApp: z.string().describe(
          "The scope of the current targeting rule is the subscription with the specified subscription ID. Must be a subscription within the same parent app.",
        ).optional(),
        thisSubscription: z.object({}).describe(
          "Represents the targeting rule scope corresponding to the subscriptions in which this offer is defined.",
        ).optional(),
      }).describe(
        "Defines the scope of subscriptions which a targeting rule can match to target offers to users based on past or current entitlement.",
      ).optional(),
    }).describe(
      "Represents a targeting rule of the form: User currently has {scope} [with billing period {billing_period}].",
    ).optional(),
  }).describe("Defines the rule a user needs to satisfy to receive this offer.")
    .optional(),
  regionsVersion_version: z.string().describe(
    "Required. A string representing the version of available regions being used for the specified resource. Regional prices and latest supported version for the resource have to be specified according to the information published in [this article](https://support.google.com/googleplay/android-developer/answer/10532353). Each time the supported locations substantially change, the version will be incremented. Using this field will ensure that creating and updating the resource with an older region's version and set of regional prices and currencies will succeed even though a new version is available.",
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

/** Swamp extension model for Google Cloud Google Play Android Developer Monetization.Subscriptions.BasePlans.Offers. Registered at `@swamp/gcp/androidpublisher/monetization-subscriptions-baseplans-offers`. */
export const model = {
  type:
    "@swamp/gcp/androidpublisher/monetization-subscriptions-baseplans-offers",
  version: "2026.06.08.1",
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
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A single, temporary offer",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a offers",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["packageName"] !== undefined) {
          params["packageName"] = String(g["packageName"]);
        }
        if (g["productId"] !== undefined) {
          params["productId"] = String(g["productId"]);
        }
        if (g["basePlanId"] !== undefined) {
          params["basePlanId"] = String(g["basePlanId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["offerId"] !== undefined) body["offerId"] = g["offerId"];
        if (g["offerTags"] !== undefined) body["offerTags"] = g["offerTags"];
        if (g["otherRegionsConfig"] !== undefined) {
          body["otherRegionsConfig"] = g["otherRegionsConfig"];
        }
        if (g["phases"] !== undefined) body["phases"] = g["phases"];
        if (g["regionalConfigs"] !== undefined) {
          body["regionalConfigs"] = g["regionalConfigs"];
        }
        if (g["targeting"] !== undefined) body["targeting"] = g["targeting"];
        if (g["regionsVersion_version"] !== undefined) {
          body["regionsVersion_version"] = g["regionsVersion_version"];
        }
        if (g["name"] !== undefined) params["offerId"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": [],
            }
            : undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "packageName": String(g["packageName"] ?? ""),
              "productId": String(g["productId"] ?? ""),
              "basePlanId": String(g["basePlanId"] ?? ""),
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
          credentials,
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
      description: "Get a offers",
      arguments: z.object({
        identifier: z.string().describe("The name of the offers"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["packageName"] !== undefined) {
          params["packageName"] = String(g["packageName"]);
        }
        if (g["productId"] !== undefined) {
          params["productId"] = String(g["productId"]);
        }
        if (g["basePlanId"] !== undefined) {
          params["basePlanId"] = String(g["basePlanId"]);
        }
        params["offerId"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
          credentials,
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
      description: "Update offers attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
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
        if (g["packageName"] !== undefined) {
          params["packageName"] = String(g["packageName"]);
        } else if (existing["packageName"]) {
          params["packageName"] = String(existing["packageName"]);
        }
        if (g["productId"] !== undefined) {
          params["productId"] = String(g["productId"]);
        } else if (existing["productId"]) {
          params["productId"] = String(existing["productId"]);
        }
        if (g["basePlanId"] !== undefined) {
          params["basePlanId"] = String(g["basePlanId"]);
        } else if (existing["basePlanId"]) {
          params["basePlanId"] = String(existing["basePlanId"]);
        }
        params["offerId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["offerTags"] !== undefined) body["offerTags"] = g["offerTags"];
        if (g["otherRegionsConfig"] !== undefined) {
          body["otherRegionsConfig"] = g["otherRegionsConfig"];
        }
        if (g["phases"] !== undefined) body["phases"] = g["phases"];
        if (g["regionalConfigs"] !== undefined) {
          body["regionalConfigs"] = g["regionalConfigs"];
        }
        if (g["targeting"] !== undefined) body["targeting"] = g["targeting"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": [],
            }
            : undefined,
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
      description: "Delete the offers",
      arguments: z.object({
        identifier: z.string().describe("The name of the offers"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["packageName"] !== undefined) {
          params["packageName"] = String(g["packageName"]);
        }
        if (g["productId"] !== undefined) {
          params["productId"] = String(g["productId"]);
        }
        if (g["basePlanId"] !== undefined) {
          params["basePlanId"] = String(g["basePlanId"]);
        }
        params["offerId"] = args.identifier;
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
      description: "Sync offers state from GCP",
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
          if (g["packageName"] !== undefined) {
            params["packageName"] = String(g["packageName"]);
          } else if (existing["packageName"]) {
            params["packageName"] = String(existing["packageName"]);
          }
          if (g["productId"] !== undefined) {
            params["productId"] = String(g["productId"]);
          } else if (existing["productId"]) {
            params["productId"] = String(existing["productId"]);
          }
          if (g["basePlanId"] !== undefined) {
            params["basePlanId"] = String(g["basePlanId"]);
          } else if (existing["basePlanId"]) {
            params["basePlanId"] = String(existing["basePlanId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["offerId"] = identifier;
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
      description: "List offers resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "The maximum number of subscriptions to return. The service may return fewer than this value. If unspecified, at most 50 subscriptions will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["packageName"] !== undefined) {
          params["packageName"] = String(g["packageName"]);
        }
        if (g["productId"] !== undefined) {
          params["productId"] = String(g["productId"]);
        }
        if (g["basePlanId"] !== undefined) {
          params["basePlanId"] = String(g["basePlanId"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "subscriptionOffers",
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
    activate: {
      description: "activate",
      arguments: z.object({
        basePlanId: z.any().optional(),
        latencyTolerance: z.any().optional(),
        offerId: z.any().optional(),
        packageName: z.any().optional(),
        productId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["packageName"] !== undefined) {
          params["packageName"] = String(g["packageName"]);
        }
        if (g["productId"] !== undefined) {
          params["productId"] = String(g["productId"]);
        }
        if (g["basePlanId"] !== undefined) {
          params["basePlanId"] = String(g["basePlanId"]);
        }
        if (g["offerId"] !== undefined) {
          params["offerId"] = String(g["offerId"]);
        }
        const body: Record<string, unknown> = {};
        if (args["basePlanId"] !== undefined) {
          body["basePlanId"] = args["basePlanId"];
        }
        if (args["latencyTolerance"] !== undefined) {
          body["latencyTolerance"] = args["latencyTolerance"];
        }
        if (args["offerId"] !== undefined) body["offerId"] = args["offerId"];
        if (args["packageName"] !== undefined) {
          body["packageName"] = args["packageName"];
        }
        if (args["productId"] !== undefined) {
          body["productId"] = args["productId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "androidpublisher.monetization.subscriptions.basePlans.offers.activate",
            "path":
              "androidpublisher/v3/applications/{packageName}/subscriptions/{productId}/basePlans/{basePlanId}/offers/{offerId}:activate",
            "httpMethod": "POST",
            "parameterOrder": [
              "packageName",
              "productId",
              "basePlanId",
              "offerId",
            ],
            "parameters": {
              "basePlanId": { "location": "path", "required": true },
              "offerId": { "location": "path", "required": true },
              "packageName": { "location": "path", "required": true },
              "productId": { "location": "path", "required": true },
            },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    batch_get: {
      description: "batch get",
      arguments: z.object({
        requests: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["packageName"] !== undefined) {
          params["packageName"] = String(g["packageName"]);
        }
        if (g["productId"] !== undefined) {
          params["productId"] = String(g["productId"]);
        }
        if (g["basePlanId"] !== undefined) {
          params["basePlanId"] = String(g["basePlanId"]);
        }
        const body: Record<string, unknown> = {};
        if (args["requests"] !== undefined) body["requests"] = args["requests"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "androidpublisher.monetization.subscriptions.basePlans.offers.batchGet",
            "path":
              "androidpublisher/v3/applications/{packageName}/subscriptions/{productId}/basePlans/{basePlanId}/offers:batchGet",
            "httpMethod": "POST",
            "parameterOrder": ["packageName", "productId", "basePlanId"],
            "parameters": {
              "basePlanId": { "location": "path", "required": true },
              "packageName": { "location": "path", "required": true },
              "productId": { "location": "path", "required": true },
            },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    batch_update: {
      description: "batch update",
      arguments: z.object({
        requests: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["packageName"] !== undefined) {
          params["packageName"] = String(g["packageName"]);
        }
        if (g["productId"] !== undefined) {
          params["productId"] = String(g["productId"]);
        }
        if (g["basePlanId"] !== undefined) {
          params["basePlanId"] = String(g["basePlanId"]);
        }
        const body: Record<string, unknown> = {};
        if (args["requests"] !== undefined) body["requests"] = args["requests"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "androidpublisher.monetization.subscriptions.basePlans.offers.batchUpdate",
            "path":
              "androidpublisher/v3/applications/{packageName}/subscriptions/{productId}/basePlans/{basePlanId}/offers:batchUpdate",
            "httpMethod": "POST",
            "parameterOrder": ["packageName", "productId", "basePlanId"],
            "parameters": {
              "basePlanId": { "location": "path", "required": true },
              "packageName": { "location": "path", "required": true },
              "productId": { "location": "path", "required": true },
            },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    batch_update_states: {
      description: "batch update states",
      arguments: z.object({
        requests: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["packageName"] !== undefined) {
          params["packageName"] = String(g["packageName"]);
        }
        if (g["productId"] !== undefined) {
          params["productId"] = String(g["productId"]);
        }
        if (g["basePlanId"] !== undefined) {
          params["basePlanId"] = String(g["basePlanId"]);
        }
        const body: Record<string, unknown> = {};
        if (args["requests"] !== undefined) body["requests"] = args["requests"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "androidpublisher.monetization.subscriptions.basePlans.offers.batchUpdateStates",
            "path":
              "androidpublisher/v3/applications/{packageName}/subscriptions/{productId}/basePlans/{basePlanId}/offers:batchUpdateStates",
            "httpMethod": "POST",
            "parameterOrder": ["packageName", "productId", "basePlanId"],
            "parameters": {
              "basePlanId": { "location": "path", "required": true },
              "packageName": { "location": "path", "required": true },
              "productId": { "location": "path", "required": true },
            },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    deactivate: {
      description: "deactivate",
      arguments: z.object({
        basePlanId: z.any().optional(),
        latencyTolerance: z.any().optional(),
        offerId: z.any().optional(),
        packageName: z.any().optional(),
        productId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["packageName"] !== undefined) {
          params["packageName"] = String(g["packageName"]);
        }
        if (g["productId"] !== undefined) {
          params["productId"] = String(g["productId"]);
        }
        if (g["basePlanId"] !== undefined) {
          params["basePlanId"] = String(g["basePlanId"]);
        }
        if (g["offerId"] !== undefined) {
          params["offerId"] = String(g["offerId"]);
        }
        const body: Record<string, unknown> = {};
        if (args["basePlanId"] !== undefined) {
          body["basePlanId"] = args["basePlanId"];
        }
        if (args["latencyTolerance"] !== undefined) {
          body["latencyTolerance"] = args["latencyTolerance"];
        }
        if (args["offerId"] !== undefined) body["offerId"] = args["offerId"];
        if (args["packageName"] !== undefined) {
          body["packageName"] = args["packageName"];
        }
        if (args["productId"] !== undefined) {
          body["productId"] = args["productId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "androidpublisher.monetization.subscriptions.basePlans.offers.deactivate",
            "path":
              "androidpublisher/v3/applications/{packageName}/subscriptions/{productId}/basePlans/{basePlanId}/offers/{offerId}:deactivate",
            "httpMethod": "POST",
            "parameterOrder": [
              "packageName",
              "productId",
              "basePlanId",
              "offerId",
            ],
            "parameters": {
              "basePlanId": { "location": "path", "required": true },
              "offerId": { "location": "path", "required": true },
              "packageName": { "location": "path", "required": true },
              "productId": { "location": "path", "required": true },
            },
          },
          params,
          body,
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
