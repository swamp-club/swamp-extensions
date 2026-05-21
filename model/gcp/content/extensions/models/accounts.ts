// Auto-generated extension model for @swamp/gcp/content/accounts
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Content for Shopping Accounts.
 *
 * Account data. After the creation of a new account it may take a few minutes before it's fully operational. The methods delete, insert, and update require the admin role.
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
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://shoppingcontent.googleapis.com/content/v2.1/";

const GET_CONFIG = {
  "id": "content.accounts.get",
  "path": "{merchantId}/accounts/{accountId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "merchantId",
    "accountId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "merchantId": {
      "location": "path",
      "required": true,
    },
    "view": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "content.accounts.insert",
  "path": "{merchantId}/accounts",
  "httpMethod": "POST",
  "parameterOrder": [
    "merchantId",
  ],
  "parameters": {
    "merchantId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "content.accounts.update",
  "path": "{merchantId}/accounts/{accountId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "merchantId",
    "accountId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "merchantId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "content.accounts.delete",
  "path": "{merchantId}/accounts/{accountId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "merchantId",
    "accountId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "force": {
      "location": "query",
    },
    "merchantId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "content.accounts.list",
  "path": "{merchantId}/accounts",
  "httpMethod": "GET",
  "parameterOrder": [
    "merchantId",
  ],
  "parameters": {
    "label": {
      "location": "query",
    },
    "maxResults": {
      "location": "query",
    },
    "merchantId": {
      "location": "path",
      "required": true,
    },
    "name": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "view": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  adsLinks: z.array(z.object({
    adsId: z.string().describe("Customer ID of the Ads account.").optional(),
    status: z.string().describe(
      'Status of the link between this Merchant Center account and the Ads account. Upon retrieval, it represents the actual status of the link and can be either `active` if it was approved in Google Ads or `pending` if it\'s pending approval. Upon insertion, it represents the *intended* status of the link. Re-uploading a link with status `active` when it\'s still pending or with status `pending` when it\'s already active will have no effect: the status will remain unchanged. Re-uploading a link with deprecated status `inactive` is equivalent to not submitting the link at all and will delete the link if it was active or cancel the link request if it was pending. Acceptable values are: - "`active`" - "`pending`"',
    ).optional(),
  })).describe(
    "Linked Ads accounts that are active or pending approval. To create a new link request, add a new link with status `active` to the list. It will remain in a `pending` state until approved or rejected either in the Ads interface or through the Google Ads API. To delete an active link, or to cancel a link request, remove it from the list.",
  ).optional(),
  adultContent: z.boolean().describe(
    "Indicates whether the merchant sells adult content.",
  ).optional(),
  automaticImprovements: z.object({
    imageImprovements: z.object({
      accountImageImprovementsSettings: z.object({
        allowAutomaticImageImprovements: z.boolean().describe(
          "Enables automatic image improvements.",
        ).optional(),
      }).describe("Settings for the Automatic Image Improvements.").optional(),
      effectiveAllowAutomaticImageImprovements: z.boolean().describe(
        "Output only. The effective value of allow_automatic_image_improvements. If account_image_improvements_settings is present, then this value is the same. Otherwise, it represents the inherited value of the parent account. Read-only.",
      ).optional(),
    }).describe(
      "This improvement will attempt to automatically correct submitted images if they don't meet the [image requirements](https://support.google.com/merchants/answer/6324350), for example, removing overlays. If successful, the image will be replaced and approved. This improvement is only applied to images of disapproved offers. For more information see: [Automatic image improvements](https://support.google.com/merchants/answer/9242973)",
    ).optional(),
    itemUpdates: z.object({
      accountItemUpdatesSettings: z.object({
        allowAvailabilityUpdates: z.boolean().describe(
          "If availability updates are enabled, any previous availability values get overwritten if Google finds an out-of-stock annotation on the offer's page. If additionally `allow_availability_updates` field is set to true, values get overwritten if Google finds an in-stock annotation on the offer’s page.",
        ).optional(),
        allowConditionUpdates: z.boolean().describe(
          "If condition updates are enabled, Google always updates item condition with the condition detected from the details of your product.",
        ).optional(),
        allowPriceUpdates: z.boolean().describe(
          "If price updates are enabled, Google always updates the active price with the crawled information.",
        ).optional(),
        allowStrictAvailabilityUpdates: z.boolean().describe(
          "If allow_availability_updates is enabled, items are automatically updated in all your Shopping target countries. By default, availability updates will only be applied to items that are 'out of stock' on your website but 'in stock' on Shopping. Set this to true to also update items that are 'in stock' on your website, but 'out of stock' on Google Shopping. In order for this field to have an effect, you must also allow availability updates.",
        ).optional(),
      }).describe("Settings for the Automatic Item Updates.").optional(),
      effectiveAllowAvailabilityUpdates: z.boolean().describe(
        "Output only. The effective value of allow_availability_updates. If account_item_updates_settings is present, then this value is the same. Otherwise, it represents the inherited value of the parent account. Read-only.",
      ).optional(),
      effectiveAllowConditionUpdates: z.boolean().describe(
        "Output only. The effective value of allow_condition_updates. If account_item_updates_settings is present, then this value is the same. Otherwise, it represents the inherited value of the parent account. Read-only.",
      ).optional(),
      effectiveAllowPriceUpdates: z.boolean().describe(
        "Output only. The effective value of allow_price_updates. If account_item_updates_settings is present, then this value is the same. Otherwise, it represents the inherited value of the parent account. Read-only.",
      ).optional(),
      effectiveAllowStrictAvailabilityUpdates: z.boolean().describe(
        "Output only. The effective value of allow_strict_availability_updates. If account_item_updates_settings is present, then this value is the same. Otherwise, it represents the inherited value of the parent account. Read-only.",
      ).optional(),
    }).describe(
      "Turning on [item updates](https://support.google.com/merchants/answer/3246284) allows Google to automatically update items for you. When item updates are on, Google uses the structured data markup on the website and advanced data extractors to update the price and availability of the items. When the item updates are off, items with mismatched data aren't shown.",
    ).optional(),
    shippingImprovements: z.object({
      allowShippingImprovements: z.boolean().describe(
        "Enables automatic shipping improvements.",
      ).optional(),
    }).describe(
      "Not available for MCAs [accounts](https://support.google.com/merchants/answer/188487). By turning on [automatic shipping improvements](https://support.google.com/merchants/answer/10027038), you are allowing Google to improve the accuracy of your delivery times shown to shoppers using Google. More accurate delivery times, especially when faster, typically lead to better conversion rates. Google will improve your estimated delivery times based on various factors: * Delivery address of an order * Current handling time and shipping time settings * Estimated weekdays or business days * Parcel tracking data",
    ).optional(),
  }).describe(
    "The automatic improvements of the account can be used to automatically update items, improve images and shipping.",
  ).optional(),
  automaticLabelIds: z.array(z.string()).describe(
    "Automatically created label IDs that are assigned to the account by CSS Center.",
  ).optional(),
  businessIdentity: z.object({
    blackOwned: z.object({
      selfIdentified: z.boolean().describe(
        "Optional. Indicates that the business identifies itself with a given identity type. Setting this field does not automatically mean eligibility for promotions.",
      ).optional(),
    }).describe("The account identity type used to specify attributes.")
      .optional(),
    includeForPromotions: z.boolean().describe(
      "Required. By setting this field, your business may be included in promotions for all the selected attributes. If you clear this option, it won't affect your identification with any of the attributes. For this field to be set, the merchant must self identify with at least one of the `AccountIdentityType`. If none are included, the request will be considered invalid.",
    ).optional(),
    latinoOwned: z.object({
      selfIdentified: z.boolean().describe(
        "Optional. Indicates that the business identifies itself with a given identity type. Setting this field does not automatically mean eligibility for promotions.",
      ).optional(),
    }).describe("The account identity type used to specify attributes.")
      .optional(),
    smallBusiness: z.object({
      selfIdentified: z.boolean().describe(
        "Optional. Indicates that the business identifies itself with a given identity type. Setting this field does not automatically mean eligibility for promotions.",
      ).optional(),
    }).describe("The account identity type used to specify attributes.")
      .optional(),
    veteranOwned: z.object({
      selfIdentified: z.boolean().describe(
        "Optional. Indicates that the business identifies itself with a given identity type. Setting this field does not automatically mean eligibility for promotions.",
      ).optional(),
    }).describe("The account identity type used to specify attributes.")
      .optional(),
    womenOwned: z.object({
      selfIdentified: z.boolean().describe(
        "Optional. Indicates that the business identifies itself with a given identity type. Setting this field does not automatically mean eligibility for promotions.",
      ).optional(),
    }).describe("The account identity type used to specify attributes.")
      .optional(),
  }).describe(
    "The [business identity attributes](https://support.google.com/merchants/answer/10342414) can be used to self-declare attributes that let customers know more about your business.",
  ).optional(),
  businessInformation: z.object({
    address: z.object({
      country: z.string().describe(
        'CLDR country code (for example, "US"). All MCA sub-accounts inherit the country of their parent MCA by default, however the country can be updated for individual sub-accounts.',
      ).optional(),
      locality: z.string().describe(
        "City, town or commune. May also include dependent localities or sublocalities (for example, neighborhoods or suburbs).",
      ).optional(),
      postalCode: z.string().describe(
        'Postal code or ZIP (for example, "94043").',
      ).optional(),
      region: z.string().describe(
        'Top-level administrative subdivision of the country. For example, a state like California ("CA") or a province like Quebec ("QC").',
      ).optional(),
      streetAddress: z.string().describe(
        "Street-level part of the address. Use `\\n` to add a second line.",
      ).optional(),
    }).optional(),
    customerService: z.object({
      email: z.string().describe("Customer service email.").optional(),
      phoneNumber: z.string().describe("Customer service phone number.")
        .optional(),
      url: z.string().describe("Customer service URL.").optional(),
    }).optional(),
    koreanBusinessRegistrationNumber: z.string().describe(
      "The 10-digit [Korean business registration number](https://support.google.com/merchants/answer/9037766) separated with dashes in the format: XXX-XX-XXXXX. This field will only be updated if explicitly set.",
    ).optional(),
    phoneNumber: z.string().describe(
      "The phone number of the business in [E.164](https://en.wikipedia.org/wiki/E.164) format. This can only be updated if a verified phone number is not already set. To replace a verified phone number use the `Accounts.requestphoneverification` and `Accounts.verifyphonenumber`.",
    ).optional(),
    phoneVerificationStatus: z.string().describe(
      'Verification status of the phone number of the business. This status is read only and can be updated only by successful phone verification. Acceptable values are: - "`verified`" - "`unverified`"',
    ).optional(),
  }).optional(),
  conversionSettings: z.object({
    freeListingsAutoTaggingEnabled: z.boolean().describe(
      "When enabled, free listing URLs have a parameter to enable conversion tracking for products owned by the current merchant account. See [auto-tagging](https://support.google.com/merchants/answer/11127659).",
    ).optional(),
  }).describe("Settings for conversion tracking.").optional(),
  cssId: z.string().describe("ID of CSS the account belongs to.").optional(),
  googleMyBusinessLink: z.object({
    gmbAccountId: z.string().describe(
      "The ID of the Business Profile. If this is provided, then `gmbEmail` is ignored. The value of this field should match the `accountId` used by the Business Profile API.",
    ).optional(),
    gmbEmail: z.string().describe(
      "The Business Profile email address of a specific account within a Business Profile. A sample account within a Business Profile could be a business account with set of locations, managed under the Business Profile.",
    ).optional(),
    status: z.string().describe(
      'Status of the link between this Merchant Center account and the Business Profile. Acceptable values are: - "`active`" - "`pending`"',
    ).optional(),
  }).optional(),
  id: z.string().describe("Required. 64-bit Merchant Center account ID.")
    .optional(),
  labelIds: z.array(z.string()).describe(
    "Manually created label IDs that are assigned to the account by CSS.",
  ).optional(),
  name: z.string().describe("Required. Display name for the account.")
    .optional(),
  sellerId: z.string().describe(
    "Client-specific, locally-unique, internal ID for the child account.",
  ).optional(),
  users: z.array(z.object({
    admin: z.boolean().describe("Whether user is an admin.").optional(),
    emailAddress: z.string().describe("User's email address.").optional(),
    orderManager: z.boolean().describe(
      "This role is deprecated and can no longer be assigned. Any value set will be ignored.",
    ).optional(),
    paymentsAnalyst: z.boolean().describe(
      "This role is deprecated and can no longer be assigned. Any value set will be ignored.",
    ).optional(),
    paymentsManager: z.boolean().describe(
      "This role is deprecated and can no longer be assigned. Any value set will be ignored.",
    ).optional(),
    readOnly: z.boolean().describe(
      "Optional. Whether user has standard read-only access.",
    ).optional(),
    reportingManager: z.boolean().describe(
      "Whether user is a reporting manager. This role is equivalent to the Performance and insights role in Merchant Center.",
    ).optional(),
  })).describe(
    "Users with access to the account. Every account (except for subaccounts) must have at least one admin user.",
  ).optional(),
  websiteUrl: z.string().describe("The merchant's website.").optional(),
  youtubeChannelLinks: z.array(z.object({
    channelId: z.string().describe("Channel ID.").optional(),
    status: z.string().describe(
      "Status of the link between this Merchant Center account and the YouTube channel. Upon retrieval, it represents the actual status of the link and can be either `active` if it was approved in YT Creator Studio or `pending` if it's pending approval. Upon insertion, it represents the *intended* status of the link. Re-uploading a link with status `active` when it's still pending or with status `pending` when it's already active will have no effect: the status will remain unchanged. Re-uploading a link with deprecated status `inactive` is equivalent to not submitting the link at all and will delete the link if it was active or cancel the link request if it was pending.",
    ).optional(),
  })).describe(
    "Linked YouTube channels that are active or pending approval. To create a new link request, add a new link with status `active` to the list. It will remain in a `pending` state until approved or rejected in the YT Creator Studio interface. To delete an active link, or to cancel a link request, remove it from the list.",
  ).optional(),
  merchantId: z.string().describe(
    "The ID of the managing account. This must be a multi-client account.",
  ),
});

const StateSchema = z.object({
  accountManagement: z.string().optional(),
  adsLinks: z.array(z.object({
    adsId: z.string(),
    status: z.string(),
  })).optional(),
  adultContent: z.boolean().optional(),
  automaticImprovements: z.object({
    imageImprovements: z.object({
      accountImageImprovementsSettings: z.object({
        allowAutomaticImageImprovements: z.boolean(),
      }),
      effectiveAllowAutomaticImageImprovements: z.boolean(),
    }),
    itemUpdates: z.object({
      accountItemUpdatesSettings: z.object({
        allowAvailabilityUpdates: z.boolean(),
        allowConditionUpdates: z.boolean(),
        allowPriceUpdates: z.boolean(),
        allowStrictAvailabilityUpdates: z.boolean(),
      }),
      effectiveAllowAvailabilityUpdates: z.boolean(),
      effectiveAllowConditionUpdates: z.boolean(),
      effectiveAllowPriceUpdates: z.boolean(),
      effectiveAllowStrictAvailabilityUpdates: z.boolean(),
    }),
    shippingImprovements: z.object({
      allowShippingImprovements: z.boolean(),
    }),
  }).optional(),
  automaticLabelIds: z.array(z.string()).optional(),
  businessIdentity: z.object({
    blackOwned: z.object({
      selfIdentified: z.boolean(),
    }),
    includeForPromotions: z.boolean(),
    latinoOwned: z.object({
      selfIdentified: z.boolean(),
    }),
    smallBusiness: z.object({
      selfIdentified: z.boolean(),
    }),
    veteranOwned: z.object({
      selfIdentified: z.boolean(),
    }),
    womenOwned: z.object({
      selfIdentified: z.boolean(),
    }),
  }).optional(),
  businessInformation: z.object({
    address: z.object({
      country: z.string(),
      locality: z.string(),
      postalCode: z.string(),
      region: z.string(),
      streetAddress: z.string(),
    }),
    customerService: z.object({
      email: z.string(),
      phoneNumber: z.string(),
      url: z.string(),
    }),
    koreanBusinessRegistrationNumber: z.string(),
    phoneNumber: z.string(),
    phoneVerificationStatus: z.string(),
  }).optional(),
  conversionSettings: z.object({
    freeListingsAutoTaggingEnabled: z.boolean(),
  }).optional(),
  cssId: z.string().optional(),
  googleMyBusinessLink: z.object({
    gmbAccountId: z.string(),
    gmbEmail: z.string(),
    status: z.string(),
  }).optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  labelIds: z.array(z.string()).optional(),
  name: z.string(),
  sellerId: z.string().optional(),
  users: z.array(z.object({
    admin: z.boolean(),
    emailAddress: z.string(),
    orderManager: z.boolean(),
    paymentsAnalyst: z.boolean(),
    paymentsManager: z.boolean(),
    readOnly: z.boolean(),
    reportingManager: z.boolean(),
  })).optional(),
  websiteUrl: z.string().optional(),
  youtubeChannelLinks: z.array(z.object({
    channelId: z.string(),
    status: z.string(),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  adsLinks: z.array(z.object({
    adsId: z.string().describe("Customer ID of the Ads account.").optional(),
    status: z.string().describe(
      'Status of the link between this Merchant Center account and the Ads account. Upon retrieval, it represents the actual status of the link and can be either `active` if it was approved in Google Ads or `pending` if it\'s pending approval. Upon insertion, it represents the *intended* status of the link. Re-uploading a link with status `active` when it\'s still pending or with status `pending` when it\'s already active will have no effect: the status will remain unchanged. Re-uploading a link with deprecated status `inactive` is equivalent to not submitting the link at all and will delete the link if it was active or cancel the link request if it was pending. Acceptable values are: - "`active`" - "`pending`"',
    ).optional(),
  })).describe(
    "Linked Ads accounts that are active or pending approval. To create a new link request, add a new link with status `active` to the list. It will remain in a `pending` state until approved or rejected either in the Ads interface or through the Google Ads API. To delete an active link, or to cancel a link request, remove it from the list.",
  ).optional(),
  adultContent: z.boolean().describe(
    "Indicates whether the merchant sells adult content.",
  ).optional(),
  automaticImprovements: z.object({
    imageImprovements: z.object({
      accountImageImprovementsSettings: z.object({
        allowAutomaticImageImprovements: z.boolean().describe(
          "Enables automatic image improvements.",
        ).optional(),
      }).describe("Settings for the Automatic Image Improvements.").optional(),
      effectiveAllowAutomaticImageImprovements: z.boolean().describe(
        "Output only. The effective value of allow_automatic_image_improvements. If account_image_improvements_settings is present, then this value is the same. Otherwise, it represents the inherited value of the parent account. Read-only.",
      ).optional(),
    }).describe(
      "This improvement will attempt to automatically correct submitted images if they don't meet the [image requirements](https://support.google.com/merchants/answer/6324350), for example, removing overlays. If successful, the image will be replaced and approved. This improvement is only applied to images of disapproved offers. For more information see: [Automatic image improvements](https://support.google.com/merchants/answer/9242973)",
    ).optional(),
    itemUpdates: z.object({
      accountItemUpdatesSettings: z.object({
        allowAvailabilityUpdates: z.boolean().describe(
          "If availability updates are enabled, any previous availability values get overwritten if Google finds an out-of-stock annotation on the offer's page. If additionally `allow_availability_updates` field is set to true, values get overwritten if Google finds an in-stock annotation on the offer’s page.",
        ).optional(),
        allowConditionUpdates: z.boolean().describe(
          "If condition updates are enabled, Google always updates item condition with the condition detected from the details of your product.",
        ).optional(),
        allowPriceUpdates: z.boolean().describe(
          "If price updates are enabled, Google always updates the active price with the crawled information.",
        ).optional(),
        allowStrictAvailabilityUpdates: z.boolean().describe(
          "If allow_availability_updates is enabled, items are automatically updated in all your Shopping target countries. By default, availability updates will only be applied to items that are 'out of stock' on your website but 'in stock' on Shopping. Set this to true to also update items that are 'in stock' on your website, but 'out of stock' on Google Shopping. In order for this field to have an effect, you must also allow availability updates.",
        ).optional(),
      }).describe("Settings for the Automatic Item Updates.").optional(),
      effectiveAllowAvailabilityUpdates: z.boolean().describe(
        "Output only. The effective value of allow_availability_updates. If account_item_updates_settings is present, then this value is the same. Otherwise, it represents the inherited value of the parent account. Read-only.",
      ).optional(),
      effectiveAllowConditionUpdates: z.boolean().describe(
        "Output only. The effective value of allow_condition_updates. If account_item_updates_settings is present, then this value is the same. Otherwise, it represents the inherited value of the parent account. Read-only.",
      ).optional(),
      effectiveAllowPriceUpdates: z.boolean().describe(
        "Output only. The effective value of allow_price_updates. If account_item_updates_settings is present, then this value is the same. Otherwise, it represents the inherited value of the parent account. Read-only.",
      ).optional(),
      effectiveAllowStrictAvailabilityUpdates: z.boolean().describe(
        "Output only. The effective value of allow_strict_availability_updates. If account_item_updates_settings is present, then this value is the same. Otherwise, it represents the inherited value of the parent account. Read-only.",
      ).optional(),
    }).describe(
      "Turning on [item updates](https://support.google.com/merchants/answer/3246284) allows Google to automatically update items for you. When item updates are on, Google uses the structured data markup on the website and advanced data extractors to update the price and availability of the items. When the item updates are off, items with mismatched data aren't shown.",
    ).optional(),
    shippingImprovements: z.object({
      allowShippingImprovements: z.boolean().describe(
        "Enables automatic shipping improvements.",
      ).optional(),
    }).describe(
      "Not available for MCAs [accounts](https://support.google.com/merchants/answer/188487). By turning on [automatic shipping improvements](https://support.google.com/merchants/answer/10027038), you are allowing Google to improve the accuracy of your delivery times shown to shoppers using Google. More accurate delivery times, especially when faster, typically lead to better conversion rates. Google will improve your estimated delivery times based on various factors: * Delivery address of an order * Current handling time and shipping time settings * Estimated weekdays or business days * Parcel tracking data",
    ).optional(),
  }).describe(
    "The automatic improvements of the account can be used to automatically update items, improve images and shipping.",
  ).optional(),
  automaticLabelIds: z.array(z.string()).describe(
    "Automatically created label IDs that are assigned to the account by CSS Center.",
  ).optional(),
  businessIdentity: z.object({
    blackOwned: z.object({
      selfIdentified: z.boolean().describe(
        "Optional. Indicates that the business identifies itself with a given identity type. Setting this field does not automatically mean eligibility for promotions.",
      ).optional(),
    }).describe("The account identity type used to specify attributes.")
      .optional(),
    includeForPromotions: z.boolean().describe(
      "Required. By setting this field, your business may be included in promotions for all the selected attributes. If you clear this option, it won't affect your identification with any of the attributes. For this field to be set, the merchant must self identify with at least one of the `AccountIdentityType`. If none are included, the request will be considered invalid.",
    ).optional(),
    latinoOwned: z.object({
      selfIdentified: z.boolean().describe(
        "Optional. Indicates that the business identifies itself with a given identity type. Setting this field does not automatically mean eligibility for promotions.",
      ).optional(),
    }).describe("The account identity type used to specify attributes.")
      .optional(),
    smallBusiness: z.object({
      selfIdentified: z.boolean().describe(
        "Optional. Indicates that the business identifies itself with a given identity type. Setting this field does not automatically mean eligibility for promotions.",
      ).optional(),
    }).describe("The account identity type used to specify attributes.")
      .optional(),
    veteranOwned: z.object({
      selfIdentified: z.boolean().describe(
        "Optional. Indicates that the business identifies itself with a given identity type. Setting this field does not automatically mean eligibility for promotions.",
      ).optional(),
    }).describe("The account identity type used to specify attributes.")
      .optional(),
    womenOwned: z.object({
      selfIdentified: z.boolean().describe(
        "Optional. Indicates that the business identifies itself with a given identity type. Setting this field does not automatically mean eligibility for promotions.",
      ).optional(),
    }).describe("The account identity type used to specify attributes.")
      .optional(),
  }).describe(
    "The [business identity attributes](https://support.google.com/merchants/answer/10342414) can be used to self-declare attributes that let customers know more about your business.",
  ).optional(),
  businessInformation: z.object({
    address: z.object({
      country: z.string().describe(
        'CLDR country code (for example, "US"). All MCA sub-accounts inherit the country of their parent MCA by default, however the country can be updated for individual sub-accounts.',
      ).optional(),
      locality: z.string().describe(
        "City, town or commune. May also include dependent localities or sublocalities (for example, neighborhoods or suburbs).",
      ).optional(),
      postalCode: z.string().describe(
        'Postal code or ZIP (for example, "94043").',
      ).optional(),
      region: z.string().describe(
        'Top-level administrative subdivision of the country. For example, a state like California ("CA") or a province like Quebec ("QC").',
      ).optional(),
      streetAddress: z.string().describe(
        "Street-level part of the address. Use `\\n` to add a second line.",
      ).optional(),
    }).optional(),
    customerService: z.object({
      email: z.string().describe("Customer service email.").optional(),
      phoneNumber: z.string().describe("Customer service phone number.")
        .optional(),
      url: z.string().describe("Customer service URL.").optional(),
    }).optional(),
    koreanBusinessRegistrationNumber: z.string().describe(
      "The 10-digit [Korean business registration number](https://support.google.com/merchants/answer/9037766) separated with dashes in the format: XXX-XX-XXXXX. This field will only be updated if explicitly set.",
    ).optional(),
    phoneNumber: z.string().describe(
      "The phone number of the business in [E.164](https://en.wikipedia.org/wiki/E.164) format. This can only be updated if a verified phone number is not already set. To replace a verified phone number use the `Accounts.requestphoneverification` and `Accounts.verifyphonenumber`.",
    ).optional(),
    phoneVerificationStatus: z.string().describe(
      'Verification status of the phone number of the business. This status is read only and can be updated only by successful phone verification. Acceptable values are: - "`verified`" - "`unverified`"',
    ).optional(),
  }).optional(),
  conversionSettings: z.object({
    freeListingsAutoTaggingEnabled: z.boolean().describe(
      "When enabled, free listing URLs have a parameter to enable conversion tracking for products owned by the current merchant account. See [auto-tagging](https://support.google.com/merchants/answer/11127659).",
    ).optional(),
  }).describe("Settings for conversion tracking.").optional(),
  cssId: z.string().describe("ID of CSS the account belongs to.").optional(),
  googleMyBusinessLink: z.object({
    gmbAccountId: z.string().describe(
      "The ID of the Business Profile. If this is provided, then `gmbEmail` is ignored. The value of this field should match the `accountId` used by the Business Profile API.",
    ).optional(),
    gmbEmail: z.string().describe(
      "The Business Profile email address of a specific account within a Business Profile. A sample account within a Business Profile could be a business account with set of locations, managed under the Business Profile.",
    ).optional(),
    status: z.string().describe(
      'Status of the link between this Merchant Center account and the Business Profile. Acceptable values are: - "`active`" - "`pending`"',
    ).optional(),
  }).optional(),
  id: z.string().describe("Required. 64-bit Merchant Center account ID.")
    .optional(),
  labelIds: z.array(z.string()).describe(
    "Manually created label IDs that are assigned to the account by CSS.",
  ).optional(),
  name: z.string().describe("Required. Display name for the account.")
    .optional(),
  sellerId: z.string().describe(
    "Client-specific, locally-unique, internal ID for the child account.",
  ).optional(),
  users: z.array(z.object({
    admin: z.boolean().describe("Whether user is an admin.").optional(),
    emailAddress: z.string().describe("User's email address.").optional(),
    orderManager: z.boolean().describe(
      "This role is deprecated and can no longer be assigned. Any value set will be ignored.",
    ).optional(),
    paymentsAnalyst: z.boolean().describe(
      "This role is deprecated and can no longer be assigned. Any value set will be ignored.",
    ).optional(),
    paymentsManager: z.boolean().describe(
      "This role is deprecated and can no longer be assigned. Any value set will be ignored.",
    ).optional(),
    readOnly: z.boolean().describe(
      "Optional. Whether user has standard read-only access.",
    ).optional(),
    reportingManager: z.boolean().describe(
      "Whether user is a reporting manager. This role is equivalent to the Performance and insights role in Merchant Center.",
    ).optional(),
  })).describe(
    "Users with access to the account. Every account (except for subaccounts) must have at least one admin user.",
  ).optional(),
  websiteUrl: z.string().describe("The merchant's website.").optional(),
  youtubeChannelLinks: z.array(z.object({
    channelId: z.string().describe("Channel ID.").optional(),
    status: z.string().describe(
      "Status of the link between this Merchant Center account and the YouTube channel. Upon retrieval, it represents the actual status of the link and can be either `active` if it was approved in YT Creator Studio or `pending` if it's pending approval. Upon insertion, it represents the *intended* status of the link. Re-uploading a link with status `active` when it's still pending or with status `pending` when it's already active will have no effect: the status will remain unchanged. Re-uploading a link with deprecated status `inactive` is equivalent to not submitting the link at all and will delete the link if it was active or cancel the link request if it was pending.",
    ).optional(),
  })).describe(
    "Linked YouTube channels that are active or pending approval. To create a new link request, add a new link with status `active` to the list. It will remain in a `pending` state until approved or rejected in the YT Creator Studio interface. To delete an active link, or to cancel a link request, remove it from the list.",
  ).optional(),
  merchantId: z.string().describe(
    "The ID of the managing account. This must be a multi-client account.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Content for Shopping Accounts. Registered at `@swamp/gcp/content/accounts`. */
export const model = {
  type: "@swamp/gcp/content/accounts",
  version: "2026.05.21.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Account data. After the creation of a new account it may take a few minutes b...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a accounts",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["merchantId"] !== undefined) {
          params["merchantId"] = String(g["merchantId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["adsLinks"] !== undefined) body["adsLinks"] = g["adsLinks"];
        if (g["adultContent"] !== undefined) {
          body["adultContent"] = g["adultContent"];
        }
        if (g["automaticImprovements"] !== undefined) {
          body["automaticImprovements"] = g["automaticImprovements"];
        }
        if (g["automaticLabelIds"] !== undefined) {
          body["automaticLabelIds"] = g["automaticLabelIds"];
        }
        if (g["businessIdentity"] !== undefined) {
          body["businessIdentity"] = g["businessIdentity"];
        }
        if (g["businessInformation"] !== undefined) {
          body["businessInformation"] = g["businessInformation"];
        }
        if (g["conversionSettings"] !== undefined) {
          body["conversionSettings"] = g["conversionSettings"];
        }
        if (g["cssId"] !== undefined) body["cssId"] = g["cssId"];
        if (g["googleMyBusinessLink"] !== undefined) {
          body["googleMyBusinessLink"] = g["googleMyBusinessLink"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["labelIds"] !== undefined) body["labelIds"] = g["labelIds"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["sellerId"] !== undefined) body["sellerId"] = g["sellerId"];
        if (g["users"] !== undefined) body["users"] = g["users"];
        if (g["websiteUrl"] !== undefined) body["websiteUrl"] = g["websiteUrl"];
        if (g["youtubeChannelLinks"] !== undefined) {
          body["youtubeChannelLinks"] = g["youtubeChannelLinks"];
        }
        if (g["name"] !== undefined) params["accountId"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "merchantId": String(g["merchantId"] ?? "") },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
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
      description: "Get a accounts",
      arguments: z.object({
        identifier: z.string().describe("The name of the accounts"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["merchantId"] !== undefined) {
          params["merchantId"] = String(g["merchantId"]);
        }
        params["accountId"] = args.identifier;
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
      description: "Update accounts attributes",
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
        if (g["merchantId"] !== undefined) {
          params["merchantId"] = String(g["merchantId"]);
        } else if (existing["merchantId"]) {
          params["merchantId"] = String(existing["merchantId"]);
        }
        params["accountId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["adsLinks"] !== undefined) body["adsLinks"] = g["adsLinks"];
        if (g["adultContent"] !== undefined) {
          body["adultContent"] = g["adultContent"];
        }
        if (g["automaticImprovements"] !== undefined) {
          body["automaticImprovements"] = g["automaticImprovements"];
        }
        if (g["automaticLabelIds"] !== undefined) {
          body["automaticLabelIds"] = g["automaticLabelIds"];
        }
        if (g["businessIdentity"] !== undefined) {
          body["businessIdentity"] = g["businessIdentity"];
        }
        if (g["businessInformation"] !== undefined) {
          body["businessInformation"] = g["businessInformation"];
        }
        if (g["conversionSettings"] !== undefined) {
          body["conversionSettings"] = g["conversionSettings"];
        }
        if (g["cssId"] !== undefined) body["cssId"] = g["cssId"];
        if (g["googleMyBusinessLink"] !== undefined) {
          body["googleMyBusinessLink"] = g["googleMyBusinessLink"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["labelIds"] !== undefined) body["labelIds"] = g["labelIds"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["sellerId"] !== undefined) body["sellerId"] = g["sellerId"];
        if (g["users"] !== undefined) body["users"] = g["users"];
        if (g["websiteUrl"] !== undefined) body["websiteUrl"] = g["websiteUrl"];
        if (g["youtubeChannelLinks"] !== undefined) {
          body["youtubeChannelLinks"] = g["youtubeChannelLinks"];
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
    delete: {
      description: "Delete the accounts",
      arguments: z.object({
        identifier: z.string().describe("The name of the accounts"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["merchantId"] !== undefined) {
          params["merchantId"] = String(g["merchantId"]);
        }
        params["accountId"] = args.identifier;
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
      description: "Sync accounts state from GCP",
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
          if (g["merchantId"] !== undefined) {
            params["merchantId"] = String(g["merchantId"]);
          } else if (existing["merchantId"]) {
            params["merchantId"] = String(existing["merchantId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["accountId"] = identifier;
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
    authinfo: {
      description: "authinfo",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const result = await createResource(
          BASE_URL,
          {
            "id": "content.accounts.authinfo",
            "path": "accounts/authinfo",
            "httpMethod": "GET",
            "parameterOrder": [],
            "parameters": {},
          },
          params,
          {},
        );
        return { result };
      },
    },
    claimwebsite: {
      description: "claimwebsite",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["merchantId"] !== undefined) {
          params["merchantId"] = String(g["merchantId"]);
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
        params["accountId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "content.accounts.claimwebsite",
            "path": "{merchantId}/accounts/{accountId}/claimwebsite",
            "httpMethod": "POST",
            "parameterOrder": ["merchantId", "accountId"],
            "parameters": {
              "accountId": { "location": "path", "required": true },
              "merchantId": { "location": "path", "required": true },
              "overwrite": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    custombatch: {
      description: "custombatch",
      arguments: z.object({
        entries: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (args["entries"] !== undefined) body["entries"] = args["entries"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "content.accounts.custombatch",
            "path": "accounts/batch",
            "httpMethod": "POST",
            "parameterOrder": [],
            "parameters": {},
          },
          params,
          body,
        );
        return { result };
      },
    },
    link: {
      description: "link",
      arguments: z.object({
        action: z.any().optional(),
        eCommercePlatformLinkInfo: z.any().optional(),
        linkType: z.any().optional(),
        linkedAccountId: z.any().optional(),
        paymentServiceProviderLinkInfo: z.any().optional(),
        services: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["merchantId"] !== undefined) {
          params["merchantId"] = String(g["merchantId"]);
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
        params["accountId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["action"] !== undefined) body["action"] = args["action"];
        if (args["eCommercePlatformLinkInfo"] !== undefined) {
          body["eCommercePlatformLinkInfo"] = args["eCommercePlatformLinkInfo"];
        }
        if (args["linkType"] !== undefined) body["linkType"] = args["linkType"];
        if (args["linkedAccountId"] !== undefined) {
          body["linkedAccountId"] = args["linkedAccountId"];
        }
        if (args["paymentServiceProviderLinkInfo"] !== undefined) {
          body["paymentServiceProviderLinkInfo"] =
            args["paymentServiceProviderLinkInfo"];
        }
        if (args["services"] !== undefined) body["services"] = args["services"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "content.accounts.link",
            "path": "{merchantId}/accounts/{accountId}/link",
            "httpMethod": "POST",
            "parameterOrder": ["merchantId", "accountId"],
            "parameters": {
              "accountId": { "location": "path", "required": true },
              "merchantId": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    listlinks: {
      description: "listlinks",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["merchantId"] !== undefined) {
          params["merchantId"] = String(g["merchantId"]);
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
        params["accountId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "content.accounts.listlinks",
            "path": "{merchantId}/accounts/{accountId}/listlinks",
            "httpMethod": "GET",
            "parameterOrder": ["merchantId", "accountId"],
            "parameters": {
              "accountId": { "location": "path", "required": true },
              "maxResults": { "location": "query" },
              "merchantId": { "location": "path", "required": true },
              "pageToken": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    requestphoneverification: {
      description: "requestphoneverification",
      arguments: z.object({
        languageCode: z.any().optional(),
        phoneNumber: z.any().optional(),
        phoneRegionCode: z.any().optional(),
        phoneVerificationMethod: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["merchantId"] !== undefined) {
          params["merchantId"] = String(g["merchantId"]);
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
        params["accountId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["languageCode"] !== undefined) {
          body["languageCode"] = args["languageCode"];
        }
        if (args["phoneNumber"] !== undefined) {
          body["phoneNumber"] = args["phoneNumber"];
        }
        if (args["phoneRegionCode"] !== undefined) {
          body["phoneRegionCode"] = args["phoneRegionCode"];
        }
        if (args["phoneVerificationMethod"] !== undefined) {
          body["phoneVerificationMethod"] = args["phoneVerificationMethod"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "content.accounts.requestphoneverification",
            "path":
              "{merchantId}/accounts/{accountId}/requestphoneverification",
            "httpMethod": "POST",
            "parameterOrder": ["merchantId", "accountId"],
            "parameters": {
              "accountId": { "location": "path", "required": true },
              "merchantId": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    updatelabels: {
      description: "updatelabels",
      arguments: z.object({
        labelIds: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["merchantId"] !== undefined) {
          params["merchantId"] = String(g["merchantId"]);
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
        params["accountId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["labelIds"] !== undefined) body["labelIds"] = args["labelIds"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "content.accounts.updatelabels",
            "path": "{merchantId}/accounts/{accountId}/updatelabels",
            "httpMethod": "POST",
            "parameterOrder": ["merchantId", "accountId"],
            "parameters": {
              "accountId": { "location": "path", "required": true },
              "merchantId": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    verifyphonenumber: {
      description: "verifyphonenumber",
      arguments: z.object({
        phoneVerificationMethod: z.any().optional(),
        verificationCode: z.any().optional(),
        verificationId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["merchantId"] !== undefined) {
          params["merchantId"] = String(g["merchantId"]);
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
        params["accountId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["phoneVerificationMethod"] !== undefined) {
          body["phoneVerificationMethod"] = args["phoneVerificationMethod"];
        }
        if (args["verificationCode"] !== undefined) {
          body["verificationCode"] = args["verificationCode"];
        }
        if (args["verificationId"] !== undefined) {
          body["verificationId"] = args["verificationId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "content.accounts.verifyphonenumber",
            "path": "{merchantId}/accounts/{accountId}/verifyphonenumber",
            "httpMethod": "POST",
            "parameterOrder": ["merchantId", "accountId"],
            "parameters": {
              "accountId": { "location": "path", "required": true },
              "merchantId": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
