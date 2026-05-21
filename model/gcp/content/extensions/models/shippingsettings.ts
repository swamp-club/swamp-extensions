// Auto-generated extension model for @swamp/gcp/content/shippingsettings
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Content for Shopping Shippingsettings.
 *
 * The merchant account's shipping settings. All methods except getsupportedcarriers and getsupportedholidays require the admin role.
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

const BASE_URL = "https://shoppingcontent.googleapis.com/content/v2.1/";

const GET_CONFIG = {
  "id": "content.shippingsettings.get",
  "path": "{merchantId}/shippingsettings/{accountId}",
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
  },
} as const;

const UPDATE_CONFIG = {
  "id": "content.shippingsettings.update",
  "path": "{merchantId}/shippingsettings/{accountId}",
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

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  accountId: z.string().describe(
    "The ID of the account to which these account shipping settings belong. Ignored upon update, always present in get request responses.",
  ).optional(),
  postalCodeGroups: z.array(z.object({
    country: z.string().describe(
      "The CLDR territory code of the country the postal code group applies to. Required.",
    ).optional(),
    name: z.string().describe(
      "The name of the postal code group, referred to in headers. Required.",
    ).optional(),
    postalCodeRanges: z.array(z.object({
      postalCodeRangeBegin: z.string().describe(
        'A postal code or a pattern of the form `prefix*` denoting the inclusive lower bound of the range defining the area. Examples values: `"94108"`, `"9410*"`, `"9*"`. Required.',
      ).optional(),
      postalCodeRangeEnd: z.string().describe(
        "A postal code or a pattern of the form `prefix*` denoting the inclusive upper bound of the range defining the area. It must have the same length as `postalCodeRangeBegin`: if `postalCodeRangeBegin` is a postal code then `postalCodeRangeEnd` must be a postal code too; if `postalCodeRangeBegin` is a pattern then `postalCodeRangeEnd` must be a pattern with the same prefix length. Optional: if not set, then the area is defined as being all the postal codes matching `postalCodeRangeBegin`.",
      ).optional(),
    })).describe("A range of postal codes. Required.").optional(),
  })).describe(
    "A list of postal code groups that can be referred to in `services`. Optional.",
  ).optional(),
  services: z.array(z.object({
    active: z.boolean().describe(
      "A boolean exposing the active status of the shipping service. Required.",
    ).optional(),
    currency: z.string().describe(
      "The CLDR code of the currency to which this service applies. Must match that of the prices in rate groups.",
    ).optional(),
    deliveryCountry: z.string().describe(
      "The CLDR territory code of the country to which the service applies. Required.",
    ).optional(),
    deliveryTime: z.object({
      cutoffTime: z.object({
        hour: z.number().int().describe(
          "Hour of the cutoff time until which an order has to be placed to be processed in the same day. Required.",
        ).optional(),
        minute: z.number().int().describe(
          "Minute of the cutoff time until which an order has to be placed to be processed in the same day. Required.",
        ).optional(),
        timezone: z.string().describe(
          'Timezone identifier for the cutoff time (for example, "Europe/Zurich"). List of identifiers. Required.',
        ).optional(),
      }).optional(),
      handlingBusinessDayConfig: z.object({
        businessDays: z.array(z.unknown()).describe(
          "Regular business days, such as '\"monday\"'. May not be empty.",
        ).optional(),
      }).optional(),
      holidayCutoffs: z.array(z.object({
        deadlineDate: z.unknown().describe(
          'Date of the order deadline, in ISO 8601 format. For example, "2016-11-29" for 29th November 2016. Required.',
        ).optional(),
        deadlineHour: z.unknown().describe(
          "Hour of the day on the deadline date until which the order has to be placed to qualify for the delivery guarantee. Possible values are: 0 (midnight), 1,..., 12 (noon), 13,..., 23. Required.",
        ).optional(),
        deadlineTimezone: z.unknown().describe(
          'Timezone identifier for the deadline hour (for example, "Europe/Zurich"). List of identifiers. Required.',
        ).optional(),
        holidayId: z.unknown().describe(
          "Unique identifier for the holiday. Required.",
        ).optional(),
        visibleFromDate: z.unknown().describe(
          'Date on which the deadline will become visible to consumers in ISO 8601 format. For example, "2016-10-31" for 31st October 2016. Required.',
        ).optional(),
      })).describe(
        "Holiday cutoff definitions. If configured, they specify order cutoff times for holiday-specific shipping.",
      ).optional(),
      maxHandlingTimeInDays: z.number().int().describe(
        "Maximum number of business days spent before an order is shipped. 0 means same day shipped, 1 means next day shipped. Must be greater than or equal to `minHandlingTimeInDays`.",
      ).optional(),
      maxTransitTimeInDays: z.number().int().describe(
        "Maximum number of business days that are spent in transit. 0 means same day delivery, 1 means next day delivery. Must be greater than or equal to `minTransitTimeInDays`.",
      ).optional(),
      minHandlingTimeInDays: z.number().int().describe(
        "Minimum number of business days spent before an order is shipped. 0 means same day shipped, 1 means next day shipped.",
      ).optional(),
      minTransitTimeInDays: z.number().int().describe(
        "Minimum number of business days that are spent in transit. 0 means same day delivery, 1 means next day delivery. Either `{min,max}TransitTimeInDays` or `transitTimeTable` must be set, but not both.",
      ).optional(),
      transitBusinessDayConfig: z.object({
        businessDays: z.array(z.unknown()).describe(
          "Regular business days, such as '\"monday\"'. May not be empty.",
        ).optional(),
      }).optional(),
      transitTimeTable: z.object({
        postalCodeGroupNames: z.array(z.unknown()).describe(
          'A list of postal group names. The last value can be `"all other locations"`. Example: `["zone 1", "zone 2", "all other locations"]`. The referred postal code groups must match the delivery country of the service.',
        ).optional(),
        rows: z.array(z.unknown()).optional(),
        transitTimeLabels: z.array(z.unknown()).describe(
          'A list of transit time labels. The last value can be `"all other labels"`. Example: `["food", "electronics", "all other labels"]`.',
        ).optional(),
      }).optional(),
      warehouseBasedDeliveryTimes: z.array(z.object({
        carrier: z.unknown().describe(
          'Required. Carrier, such as `"UPS"` or `"Fedex"`. The list of supported carriers can be retrieved through the `listSupportedCarriers` method.',
        ).optional(),
        carrierService: z.unknown().describe(
          'Required. Carrier service, such as `"ground"` or `"2 days"`. The list of supported services for a carrier can be retrieved through the `listSupportedCarriers` method. The name of the service must be in the eddSupportedServices list.',
        ).optional(),
        originAdministrativeArea: z.unknown().describe(
          "Shipping origin's state.",
        ).optional(),
        originCity: z.unknown().describe("Shipping origin's city.").optional(),
        originCountry: z.unknown().describe(
          "Shipping origin's country represented as a [CLDR territory code](https://github.com/unicode-org/cldr/blob/latest/common/main/en.xml).",
        ).optional(),
        originPostalCode: z.unknown().describe("Shipping origin.").optional(),
        originStreetAddress: z.unknown().describe(
          "Shipping origin's street address.",
        ).optional(),
        warehouseName: z.unknown().describe(
          "The name of the warehouse. Warehouse name need to be matched with name. If warehouseName is set, the below fields will be ignored. The warehouse info will be read from warehouse.",
        ).optional(),
      })).describe(
        "Indicates that the delivery time should be calculated per warehouse (shipping origin location) based on the settings of the selected carrier. When set, no other transit time related field in DeliveryTime should be set.",
      ).optional(),
    }).optional(),
    eligibility: z.string().describe(
      'Eligibility for this service. Acceptable values are: - "`All scenarios`" - "`All scenarios except Shopping Actions`" - "`Shopping Actions`"',
    ).optional(),
    minimumOrderValue: z.object({
      currency: z.string().describe("The currency of the price.").optional(),
      value: z.string().describe("The price represented as a number.")
        .optional(),
    }).optional(),
    minimumOrderValueTable: z.object({
      storeCodeSetWithMovs: z.array(z.object({
        storeCodes: z.unknown().describe(
          "A list of unique store codes or empty for the catch all.",
        ).optional(),
        value: z.unknown().optional(),
      })).optional(),
    }).optional(),
    name: z.string().describe(
      "Free-form name of the service. Must be unique within target account. Required.",
    ).optional(),
    pickupService: z.object({
      carrierName: z.string().describe(
        'The name of the pickup carrier (for example, `"UPS"`). Required.',
      ).optional(),
      serviceName: z.string().describe(
        'The name of the pickup service (for example, `"Access point"`). Required.',
      ).optional(),
    }).optional(),
    rateGroups: z.array(z.object({
      applicableShippingLabels: z.array(z.unknown()).describe(
        "A list of shipping labels defining the products to which this rate group applies to. This is a disjunction: only one of the labels has to match for the rate group to apply. May only be empty for the last rate group of a service. Required.",
      ).optional(),
      carrierRates: z.array(z.unknown()).describe(
        "A list of carrier rates that can be referred to by `mainTable` or `singleValue`.",
      ).optional(),
      mainTable: z.object({
        columnHeaders: z.unknown().describe(
          "A non-empty list of row or column headers for a table. Exactly one of `prices`, `weights`, `numItems`, `postalCodeGroupNames`, or `location` must be set.",
        ).optional(),
        name: z.unknown().describe(
          "Name of the table. Required for subtables, ignored for the main table.",
        ).optional(),
        rowHeaders: z.unknown().describe(
          "A non-empty list of row or column headers for a table. Exactly one of `prices`, `weights`, `numItems`, `postalCodeGroupNames`, or `location` must be set.",
        ).optional(),
        rows: z.unknown().describe(
          "The list of rows that constitute the table. Must have the same length as `rowHeaders`. Required.",
        ).optional(),
      }).optional(),
      name: z.string().describe(
        "Name of the rate group. Optional. If set has to be unique within shipping service.",
      ).optional(),
      singleValue: z.object({
        carrierRateName: z.unknown().describe(
          "The name of a carrier rate referring to a carrier rate defined in the same rate group. Can only be set if all other fields are not set.",
        ).optional(),
        flatRate: z.unknown().optional(),
        noShipping: z.unknown().describe(
          "If true, then the product can't ship. Must be true when set, can only be set if all other fields are not set.",
        ).optional(),
        pricePercentage: z.unknown().describe(
          'A percentage of the price represented as a number in decimal notation (for example, `"5.4"`). Can only be set if all other fields are not set.',
        ).optional(),
        subtableName: z.unknown().describe(
          "The name of a subtable. Can only be set in table cells (not for single values), and only if all other fields are not set.",
        ).optional(),
      }).describe(
        "The single value of a rate group or the value of a rate group table's cell. Exactly one of `noShipping`, `flatRate`, `pricePercentage`, `carrierRateName`, `subtableName` must be set.",
      ).optional(),
      subtables: z.array(z.unknown()).describe(
        "A list of subtables referred to by `mainTable`. Can only be set if `mainTable` is set.",
      ).optional(),
    })).describe(
      'Shipping rate group definitions. Only the last one is allowed to have an empty `applicableShippingLabels`, which means "everything else". The other `applicableShippingLabels` must not overlap.',
    ).optional(),
    shipmentType: z.string().describe(
      'Type of locations this service ships orders to. Acceptable values are: - "`delivery`" - "`pickup` (deprecated)" - "`local_delivery`" - "`collection_point`"',
    ).optional(),
    storeConfig: z.object({
      cutoffConfig: z.object({
        localCutoffTime: z.object({
          hour: z.unknown().describe(
            "Hour local delivery orders must be placed by to process the same day.",
          ).optional(),
          minute: z.unknown().describe(
            "Minute local delivery orders must be placed by to process the same day.",
          ).optional(),
        }).describe(
          "Time in hours and minutes in the local timezone when local delivery ends.",
        ).optional(),
        noDeliveryPostCutoff: z.boolean().describe(
          "Merchants can opt-out of showing n+1 day local delivery when they have a shipping service configured to n day local delivery. For example, if the shipping service defines same-day delivery, and it's past the cut-off, setting this field to `true` results in the calculated shipping service rate returning `NO_DELIVERY_POST_CUTOFF`. In the same example, setting this field to `false` results in the calculated shipping time being one day. This is only for local delivery.",
        ).optional(),
        storeCloseOffsetHours: z.string().describe(
          "Represents cutoff time as the number of hours before store closing. Mutually exclusive with other fields (hour and minute).",
        ).optional(),
      }).describe(
        "Time local delivery ends for the day based on the local timezone of the store. `local_cutoff_time` and `store_close_offset_hours` are mutually exclusive.",
      ).optional(),
      serviceRadius: z.object({
        unit: z.string().describe(
          "The distance unit. Acceptable values are `None`, `Miles`, and `Kilometers`.",
        ).optional(),
        value: z.string().describe("The distance represented as a number.")
          .optional(),
      }).describe("Distance represented by an integer and unit.").optional(),
      storeCodes: z.array(z.string()).describe(
        "A list of store codes that provide local delivery. If empty, then `store_service_type` must be `all_stores`, or an error is thrown. If not empty, then `store_service_type` must be `selected_stores`, or an error is thrown.",
      ).optional(),
      storeServiceType: z.string().describe(
        "Indicates whether all stores listed by this merchant provide local delivery or not. Acceptable values are `all stores` and `selected stores`",
      ).optional(),
    }).describe(
      "Stores that provide local delivery. Only valid with local delivery fulfillment.",
    ).optional(),
  })).describe("The target account's list of services. Optional.").optional(),
  warehouses: z.array(z.object({
    businessDayConfig: z.object({
      businessDays: z.array(z.string()).describe(
        "Regular business days, such as '\"monday\"'. May not be empty.",
      ).optional(),
    }).optional(),
    cutoffTime: z.object({
      hour: z.number().int().describe(
        "Required. Hour (24-hour clock) of the cutoff time until which an order has to be placed to be processed in the same day by the warehouse. Hour is based on the timezone of warehouse.",
      ).optional(),
      minute: z.number().int().describe(
        "Required. Minute of the cutoff time until which an order has to be placed to be processed in the same day by the warehouse. Minute is based on the timezone of warehouse.",
      ).optional(),
    }).optional(),
    handlingDays: z.string().describe(
      "Required. The number of days it takes for this warehouse to pack up and ship an item. This is on the warehouse level, but can be overridden on the offer level based on the attributes of an item.",
    ).optional(),
    name: z.string().describe(
      "Required. The name of the warehouse. Must be unique within account.",
    ).optional(),
    shippingAddress: z.object({
      administrativeArea: z.string().describe(
        'Required. Top-level administrative subdivision of the country. For example, a state like California ("CA") or a province like Quebec ("QC").',
      ).optional(),
      city: z.string().describe(
        "Required. City, town or commune. May also include dependent localities or sublocalities (for example, neighborhoods or suburbs).",
      ).optional(),
      country: z.string().describe(
        'Required. [CLDR country code](https://github.com/unicode-org/cldr/blob/latest/common/main/en.xml) (for example, "US").',
      ).optional(),
      postalCode: z.string().describe(
        'Required. Postal code or ZIP (for example, "94043").',
      ).optional(),
      streetAddress: z.string().describe(
        "Street-level part of the address. Use `\\n` to add a second line.",
      ).optional(),
    }).optional(),
  })).describe(
    "Optional. A list of warehouses which can be referred to in `services`.",
  ).optional(),
});

const StateSchema = z.object({
  accountId: z.string().optional(),
  postalCodeGroups: z.array(z.object({
    country: z.string(),
    name: z.string(),
    postalCodeRanges: z.array(z.object({
      postalCodeRangeBegin: z.string(),
      postalCodeRangeEnd: z.string(),
    })),
  })).optional(),
  services: z.array(z.object({
    active: z.boolean(),
    currency: z.string(),
    deliveryCountry: z.string(),
    deliveryTime: z.object({
      cutoffTime: z.object({
        hour: z.number(),
        minute: z.number(),
        timezone: z.string(),
      }),
      handlingBusinessDayConfig: z.object({
        businessDays: z.array(z.unknown()),
      }),
      holidayCutoffs: z.array(z.object({
        deadlineDate: z.unknown(),
        deadlineHour: z.unknown(),
        deadlineTimezone: z.unknown(),
        holidayId: z.unknown(),
        visibleFromDate: z.unknown(),
      })),
      maxHandlingTimeInDays: z.number(),
      maxTransitTimeInDays: z.number(),
      minHandlingTimeInDays: z.number(),
      minTransitTimeInDays: z.number(),
      transitBusinessDayConfig: z.object({
        businessDays: z.array(z.unknown()),
      }),
      transitTimeTable: z.object({
        postalCodeGroupNames: z.array(z.unknown()),
        rows: z.array(z.unknown()),
        transitTimeLabels: z.array(z.unknown()),
      }),
      warehouseBasedDeliveryTimes: z.array(z.object({
        carrier: z.unknown(),
        carrierService: z.unknown(),
        originAdministrativeArea: z.unknown(),
        originCity: z.unknown(),
        originCountry: z.unknown(),
        originPostalCode: z.unknown(),
        originStreetAddress: z.unknown(),
        warehouseName: z.unknown(),
      })),
    }),
    eligibility: z.string(),
    minimumOrderValue: z.object({
      currency: z.string(),
      value: z.string(),
    }),
    minimumOrderValueTable: z.object({
      storeCodeSetWithMovs: z.array(z.object({
        storeCodes: z.unknown(),
        value: z.unknown(),
      })),
    }),
    name: z.string(),
    pickupService: z.object({
      carrierName: z.string(),
      serviceName: z.string(),
    }),
    rateGroups: z.array(z.object({
      applicableShippingLabels: z.array(z.unknown()),
      carrierRates: z.array(z.unknown()),
      mainTable: z.object({
        columnHeaders: z.unknown(),
        name: z.unknown(),
        rowHeaders: z.unknown(),
        rows: z.unknown(),
      }),
      name: z.string(),
      singleValue: z.object({
        carrierRateName: z.unknown(),
        flatRate: z.unknown(),
        noShipping: z.unknown(),
        pricePercentage: z.unknown(),
        subtableName: z.unknown(),
      }),
      subtables: z.array(z.unknown()),
    })),
    shipmentType: z.string(),
    storeConfig: z.object({
      cutoffConfig: z.object({
        localCutoffTime: z.object({
          hour: z.unknown(),
          minute: z.unknown(),
        }),
        noDeliveryPostCutoff: z.boolean(),
        storeCloseOffsetHours: z.string(),
      }),
      serviceRadius: z.object({
        unit: z.string(),
        value: z.string(),
      }),
      storeCodes: z.array(z.string()),
      storeServiceType: z.string(),
    }),
  })).optional(),
  warehouses: z.array(z.object({
    businessDayConfig: z.object({
      businessDays: z.array(z.string()),
    }),
    cutoffTime: z.object({
      hour: z.number(),
      minute: z.number(),
    }),
    handlingDays: z.string(),
    name: z.string(),
    shippingAddress: z.object({
      administrativeArea: z.string(),
      city: z.string(),
      country: z.string(),
      postalCode: z.string(),
      streetAddress: z.string(),
    }),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accountId: z.string().describe(
    "The ID of the account to which these account shipping settings belong. Ignored upon update, always present in get request responses.",
  ).optional(),
  postalCodeGroups: z.array(z.object({
    country: z.string().describe(
      "The CLDR territory code of the country the postal code group applies to. Required.",
    ).optional(),
    name: z.string().describe(
      "The name of the postal code group, referred to in headers. Required.",
    ).optional(),
    postalCodeRanges: z.array(z.object({
      postalCodeRangeBegin: z.string().describe(
        'A postal code or a pattern of the form `prefix*` denoting the inclusive lower bound of the range defining the area. Examples values: `"94108"`, `"9410*"`, `"9*"`. Required.',
      ).optional(),
      postalCodeRangeEnd: z.string().describe(
        "A postal code or a pattern of the form `prefix*` denoting the inclusive upper bound of the range defining the area. It must have the same length as `postalCodeRangeBegin`: if `postalCodeRangeBegin` is a postal code then `postalCodeRangeEnd` must be a postal code too; if `postalCodeRangeBegin` is a pattern then `postalCodeRangeEnd` must be a pattern with the same prefix length. Optional: if not set, then the area is defined as being all the postal codes matching `postalCodeRangeBegin`.",
      ).optional(),
    })).describe("A range of postal codes. Required.").optional(),
  })).describe(
    "A list of postal code groups that can be referred to in `services`. Optional.",
  ).optional(),
  services: z.array(z.object({
    active: z.boolean().describe(
      "A boolean exposing the active status of the shipping service. Required.",
    ).optional(),
    currency: z.string().describe(
      "The CLDR code of the currency to which this service applies. Must match that of the prices in rate groups.",
    ).optional(),
    deliveryCountry: z.string().describe(
      "The CLDR territory code of the country to which the service applies. Required.",
    ).optional(),
    deliveryTime: z.object({
      cutoffTime: z.object({
        hour: z.number().int().describe(
          "Hour of the cutoff time until which an order has to be placed to be processed in the same day. Required.",
        ).optional(),
        minute: z.number().int().describe(
          "Minute of the cutoff time until which an order has to be placed to be processed in the same day. Required.",
        ).optional(),
        timezone: z.string().describe(
          'Timezone identifier for the cutoff time (for example, "Europe/Zurich"). List of identifiers. Required.',
        ).optional(),
      }).optional(),
      handlingBusinessDayConfig: z.object({
        businessDays: z.array(z.unknown()).describe(
          "Regular business days, such as '\"monday\"'. May not be empty.",
        ).optional(),
      }).optional(),
      holidayCutoffs: z.array(z.object({
        deadlineDate: z.unknown().describe(
          'Date of the order deadline, in ISO 8601 format. For example, "2016-11-29" for 29th November 2016. Required.',
        ).optional(),
        deadlineHour: z.unknown().describe(
          "Hour of the day on the deadline date until which the order has to be placed to qualify for the delivery guarantee. Possible values are: 0 (midnight), 1,..., 12 (noon), 13,..., 23. Required.",
        ).optional(),
        deadlineTimezone: z.unknown().describe(
          'Timezone identifier for the deadline hour (for example, "Europe/Zurich"). List of identifiers. Required.',
        ).optional(),
        holidayId: z.unknown().describe(
          "Unique identifier for the holiday. Required.",
        ).optional(),
        visibleFromDate: z.unknown().describe(
          'Date on which the deadline will become visible to consumers in ISO 8601 format. For example, "2016-10-31" for 31st October 2016. Required.',
        ).optional(),
      })).describe(
        "Holiday cutoff definitions. If configured, they specify order cutoff times for holiday-specific shipping.",
      ).optional(),
      maxHandlingTimeInDays: z.number().int().describe(
        "Maximum number of business days spent before an order is shipped. 0 means same day shipped, 1 means next day shipped. Must be greater than or equal to `minHandlingTimeInDays`.",
      ).optional(),
      maxTransitTimeInDays: z.number().int().describe(
        "Maximum number of business days that are spent in transit. 0 means same day delivery, 1 means next day delivery. Must be greater than or equal to `minTransitTimeInDays`.",
      ).optional(),
      minHandlingTimeInDays: z.number().int().describe(
        "Minimum number of business days spent before an order is shipped. 0 means same day shipped, 1 means next day shipped.",
      ).optional(),
      minTransitTimeInDays: z.number().int().describe(
        "Minimum number of business days that are spent in transit. 0 means same day delivery, 1 means next day delivery. Either `{min,max}TransitTimeInDays` or `transitTimeTable` must be set, but not both.",
      ).optional(),
      transitBusinessDayConfig: z.object({
        businessDays: z.array(z.unknown()).describe(
          "Regular business days, such as '\"monday\"'. May not be empty.",
        ).optional(),
      }).optional(),
      transitTimeTable: z.object({
        postalCodeGroupNames: z.array(z.unknown()).describe(
          'A list of postal group names. The last value can be `"all other locations"`. Example: `["zone 1", "zone 2", "all other locations"]`. The referred postal code groups must match the delivery country of the service.',
        ).optional(),
        rows: z.array(z.unknown()).optional(),
        transitTimeLabels: z.array(z.unknown()).describe(
          'A list of transit time labels. The last value can be `"all other labels"`. Example: `["food", "electronics", "all other labels"]`.',
        ).optional(),
      }).optional(),
      warehouseBasedDeliveryTimes: z.array(z.object({
        carrier: z.unknown().describe(
          'Required. Carrier, such as `"UPS"` or `"Fedex"`. The list of supported carriers can be retrieved through the `listSupportedCarriers` method.',
        ).optional(),
        carrierService: z.unknown().describe(
          'Required. Carrier service, such as `"ground"` or `"2 days"`. The list of supported services for a carrier can be retrieved through the `listSupportedCarriers` method. The name of the service must be in the eddSupportedServices list.',
        ).optional(),
        originAdministrativeArea: z.unknown().describe(
          "Shipping origin's state.",
        ).optional(),
        originCity: z.unknown().describe("Shipping origin's city.").optional(),
        originCountry: z.unknown().describe(
          "Shipping origin's country represented as a [CLDR territory code](https://github.com/unicode-org/cldr/blob/latest/common/main/en.xml).",
        ).optional(),
        originPostalCode: z.unknown().describe("Shipping origin.").optional(),
        originStreetAddress: z.unknown().describe(
          "Shipping origin's street address.",
        ).optional(),
        warehouseName: z.unknown().describe(
          "The name of the warehouse. Warehouse name need to be matched with name. If warehouseName is set, the below fields will be ignored. The warehouse info will be read from warehouse.",
        ).optional(),
      })).describe(
        "Indicates that the delivery time should be calculated per warehouse (shipping origin location) based on the settings of the selected carrier. When set, no other transit time related field in DeliveryTime should be set.",
      ).optional(),
    }).optional(),
    eligibility: z.string().describe(
      'Eligibility for this service. Acceptable values are: - "`All scenarios`" - "`All scenarios except Shopping Actions`" - "`Shopping Actions`"',
    ).optional(),
    minimumOrderValue: z.object({
      currency: z.string().describe("The currency of the price.").optional(),
      value: z.string().describe("The price represented as a number.")
        .optional(),
    }).optional(),
    minimumOrderValueTable: z.object({
      storeCodeSetWithMovs: z.array(z.object({
        storeCodes: z.unknown().describe(
          "A list of unique store codes or empty for the catch all.",
        ).optional(),
        value: z.unknown().optional(),
      })).optional(),
    }).optional(),
    name: z.string().describe(
      "Free-form name of the service. Must be unique within target account. Required.",
    ).optional(),
    pickupService: z.object({
      carrierName: z.string().describe(
        'The name of the pickup carrier (for example, `"UPS"`). Required.',
      ).optional(),
      serviceName: z.string().describe(
        'The name of the pickup service (for example, `"Access point"`). Required.',
      ).optional(),
    }).optional(),
    rateGroups: z.array(z.object({
      applicableShippingLabels: z.array(z.unknown()).describe(
        "A list of shipping labels defining the products to which this rate group applies to. This is a disjunction: only one of the labels has to match for the rate group to apply. May only be empty for the last rate group of a service. Required.",
      ).optional(),
      carrierRates: z.array(z.unknown()).describe(
        "A list of carrier rates that can be referred to by `mainTable` or `singleValue`.",
      ).optional(),
      mainTable: z.object({
        columnHeaders: z.unknown().describe(
          "A non-empty list of row or column headers for a table. Exactly one of `prices`, `weights`, `numItems`, `postalCodeGroupNames`, or `location` must be set.",
        ).optional(),
        name: z.unknown().describe(
          "Name of the table. Required for subtables, ignored for the main table.",
        ).optional(),
        rowHeaders: z.unknown().describe(
          "A non-empty list of row or column headers for a table. Exactly one of `prices`, `weights`, `numItems`, `postalCodeGroupNames`, or `location` must be set.",
        ).optional(),
        rows: z.unknown().describe(
          "The list of rows that constitute the table. Must have the same length as `rowHeaders`. Required.",
        ).optional(),
      }).optional(),
      name: z.string().describe(
        "Name of the rate group. Optional. If set has to be unique within shipping service.",
      ).optional(),
      singleValue: z.object({
        carrierRateName: z.unknown().describe(
          "The name of a carrier rate referring to a carrier rate defined in the same rate group. Can only be set if all other fields are not set.",
        ).optional(),
        flatRate: z.unknown().optional(),
        noShipping: z.unknown().describe(
          "If true, then the product can't ship. Must be true when set, can only be set if all other fields are not set.",
        ).optional(),
        pricePercentage: z.unknown().describe(
          'A percentage of the price represented as a number in decimal notation (for example, `"5.4"`). Can only be set if all other fields are not set.',
        ).optional(),
        subtableName: z.unknown().describe(
          "The name of a subtable. Can only be set in table cells (not for single values), and only if all other fields are not set.",
        ).optional(),
      }).describe(
        "The single value of a rate group or the value of a rate group table's cell. Exactly one of `noShipping`, `flatRate`, `pricePercentage`, `carrierRateName`, `subtableName` must be set.",
      ).optional(),
      subtables: z.array(z.unknown()).describe(
        "A list of subtables referred to by `mainTable`. Can only be set if `mainTable` is set.",
      ).optional(),
    })).describe(
      'Shipping rate group definitions. Only the last one is allowed to have an empty `applicableShippingLabels`, which means "everything else". The other `applicableShippingLabels` must not overlap.',
    ).optional(),
    shipmentType: z.string().describe(
      'Type of locations this service ships orders to. Acceptable values are: - "`delivery`" - "`pickup` (deprecated)" - "`local_delivery`" - "`collection_point`"',
    ).optional(),
    storeConfig: z.object({
      cutoffConfig: z.object({
        localCutoffTime: z.object({
          hour: z.unknown().describe(
            "Hour local delivery orders must be placed by to process the same day.",
          ).optional(),
          minute: z.unknown().describe(
            "Minute local delivery orders must be placed by to process the same day.",
          ).optional(),
        }).describe(
          "Time in hours and minutes in the local timezone when local delivery ends.",
        ).optional(),
        noDeliveryPostCutoff: z.boolean().describe(
          "Merchants can opt-out of showing n+1 day local delivery when they have a shipping service configured to n day local delivery. For example, if the shipping service defines same-day delivery, and it's past the cut-off, setting this field to `true` results in the calculated shipping service rate returning `NO_DELIVERY_POST_CUTOFF`. In the same example, setting this field to `false` results in the calculated shipping time being one day. This is only for local delivery.",
        ).optional(),
        storeCloseOffsetHours: z.string().describe(
          "Represents cutoff time as the number of hours before store closing. Mutually exclusive with other fields (hour and minute).",
        ).optional(),
      }).describe(
        "Time local delivery ends for the day based on the local timezone of the store. `local_cutoff_time` and `store_close_offset_hours` are mutually exclusive.",
      ).optional(),
      serviceRadius: z.object({
        unit: z.string().describe(
          "The distance unit. Acceptable values are `None`, `Miles`, and `Kilometers`.",
        ).optional(),
        value: z.string().describe("The distance represented as a number.")
          .optional(),
      }).describe("Distance represented by an integer and unit.").optional(),
      storeCodes: z.array(z.string()).describe(
        "A list of store codes that provide local delivery. If empty, then `store_service_type` must be `all_stores`, or an error is thrown. If not empty, then `store_service_type` must be `selected_stores`, or an error is thrown.",
      ).optional(),
      storeServiceType: z.string().describe(
        "Indicates whether all stores listed by this merchant provide local delivery or not. Acceptable values are `all stores` and `selected stores`",
      ).optional(),
    }).describe(
      "Stores that provide local delivery. Only valid with local delivery fulfillment.",
    ).optional(),
  })).describe("The target account's list of services. Optional.").optional(),
  warehouses: z.array(z.object({
    businessDayConfig: z.object({
      businessDays: z.array(z.string()).describe(
        "Regular business days, such as '\"monday\"'. May not be empty.",
      ).optional(),
    }).optional(),
    cutoffTime: z.object({
      hour: z.number().int().describe(
        "Required. Hour (24-hour clock) of the cutoff time until which an order has to be placed to be processed in the same day by the warehouse. Hour is based on the timezone of warehouse.",
      ).optional(),
      minute: z.number().int().describe(
        "Required. Minute of the cutoff time until which an order has to be placed to be processed in the same day by the warehouse. Minute is based on the timezone of warehouse.",
      ).optional(),
    }).optional(),
    handlingDays: z.string().describe(
      "Required. The number of days it takes for this warehouse to pack up and ship an item. This is on the warehouse level, but can be overridden on the offer level based on the attributes of an item.",
    ).optional(),
    name: z.string().describe(
      "Required. The name of the warehouse. Must be unique within account.",
    ).optional(),
    shippingAddress: z.object({
      administrativeArea: z.string().describe(
        'Required. Top-level administrative subdivision of the country. For example, a state like California ("CA") or a province like Quebec ("QC").',
      ).optional(),
      city: z.string().describe(
        "Required. City, town or commune. May also include dependent localities or sublocalities (for example, neighborhoods or suburbs).",
      ).optional(),
      country: z.string().describe(
        'Required. [CLDR country code](https://github.com/unicode-org/cldr/blob/latest/common/main/en.xml) (for example, "US").',
      ).optional(),
      postalCode: z.string().describe(
        'Required. Postal code or ZIP (for example, "94043").',
      ).optional(),
      streetAddress: z.string().describe(
        "Street-level part of the address. Use `\\n` to add a second line.",
      ).optional(),
    }).optional(),
  })).describe(
    "Optional. A list of warehouses which can be referred to in `services`.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Content for Shopping Shippingsettings. Registered at `@swamp/gcp/content/shippingsettings`. */
export const model = {
  type: "@swamp/gcp/content/shippingsettings",
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
        "The merchant account's shipping settings. All methods except getsupportedcarr...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a shippingsettings",
      arguments: z.object({
        identifier: z.string().describe("The name of the shippingsettings"),
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
      description: "Update shippingsettings attributes",
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
        if (g["postalCodeGroups"] !== undefined) {
          body["postalCodeGroups"] = g["postalCodeGroups"];
        }
        if (g["services"] !== undefined) body["services"] = g["services"];
        if (g["warehouses"] !== undefined) body["warehouses"] = g["warehouses"];
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
      description: "Sync shippingsettings state from GCP",
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
            "id": "content.shippingsettings.custombatch",
            "path": "shippingsettings/batch",
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
    getsupportedcarriers: {
      description: "getsupportedcarriers",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
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
        params["merchantId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "content.shippingsettings.getsupportedcarriers",
            "path": "{merchantId}/supportedCarriers",
            "httpMethod": "GET",
            "parameterOrder": ["merchantId"],
            "parameters": {
              "merchantId": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    getsupportedholidays: {
      description: "getsupportedholidays",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
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
        params["merchantId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "content.shippingsettings.getsupportedholidays",
            "path": "{merchantId}/supportedHolidays",
            "httpMethod": "GET",
            "parameterOrder": ["merchantId"],
            "parameters": {
              "merchantId": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    getsupportedpickupservices: {
      description: "getsupportedpickupservices",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
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
        params["merchantId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "content.shippingsettings.getsupportedpickupservices",
            "path": "{merchantId}/supportedPickupServices",
            "httpMethod": "GET",
            "parameterOrder": ["merchantId"],
            "parameters": {
              "merchantId": { "location": "path", "required": true },
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
