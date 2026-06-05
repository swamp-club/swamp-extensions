// Auto-generated extension model for @swamp/gcp/merchantapi/accounts-products
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Merchant Accounts.Products.
 *
 * The processed product, built from multiple product inputs after applying rules and supplemental data sources. This processed product matches what is shown in your Merchant Center account. Each product is built from exactly one primary data source product input, and multiple supplemental data source inputs. After inserting, updating, or deleting a product input, it may take several minutes before the updated processed product can be retrieved. All fields in the processed product and its sub-messages match the name of their corresponding attribute in the [Product data specification](https://support.google.com/merchants/answer/7052112) with some exceptions.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/products/${shortName}`;
}

const BASE_URL = "https://merchantapi.googleapis.com/";

const GET_CONFIG = {
  "id": "merchantapi.accounts.products.get",
  "path": "products/v1/{+name}",
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

const LIST_CONFIG = {
  "id": "merchantapi.accounts.products.list",
  "path": "products/v1/{+parent}/products",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  archived: z.boolean().optional(),
  automatedDiscounts: z.object({
    gadPrice: z.object({
      amountMicros: z.string(),
      currencyCode: z.string(),
    }),
    priorPrice: z.object({
      amountMicros: z.string(),
      currencyCode: z.string(),
    }),
    priorPriceProgressive: z.object({
      amountMicros: z.string(),
      currencyCode: z.string(),
    }),
  }).optional(),
  base64EncodedName: z.string().optional(),
  contentLanguage: z.string().optional(),
  customAttributes: z.array(z.object({
    groupValues: z.array(z.record(z.string(), z.unknown())),
    name: z.string(),
    value: z.string(),
  })).optional(),
  dataSource: z.string().optional(),
  feedLabel: z.string().optional(),
  legacyLocal: z.boolean().optional(),
  name: z.string(),
  offerId: z.string().optional(),
  productAttributes: z.object({
    additionalImageLinks: z.array(z.string()),
    adsGrouping: z.string(),
    adsLabels: z.array(z.string()),
    adsRedirect: z.string(),
    adult: z.boolean(),
    ageGroup: z.string(),
    autoPricingMinPrice: z.object({
      amountMicros: z.string(),
      currencyCode: z.string(),
    }),
    availability: z.string(),
    availabilityDate: z.string(),
    bodyStyle: z.string(),
    brand: z.string(),
    canonicalLink: z.string(),
    carrierShipping: z.array(z.object({
      carrierPrice: z.string(),
      carrierPriceFlatAdjustment: z.object({
        amountMicros: z.string(),
        currencyCode: z.string(),
      }),
      carrierPricePercentageAdjustment: z.number(),
      carrierTransitTime: z.string(),
      country: z.string(),
      fixedMaxTransitTime: z.string(),
      fixedMinTransitTime: z.string(),
      flatPrice: z.object({
        amountMicros: z.string(),
        currencyCode: z.string(),
      }),
      maxHandlingTime: z.string(),
      minHandlingTime: z.string(),
      originPostalCode: z.string(),
      postalCode: z.string(),
      region: z.string(),
    })),
    certifications: z.array(z.object({
      certificationAuthority: z.string(),
      certificationCode: z.string(),
      certificationName: z.string(),
      certificationValue: z.string(),
    })),
    certifiedPreOwned: z.boolean(),
    cloudExportAdditionalProperties: z.array(z.object({
      boolValue: z.boolean(),
      floatValue: z.array(z.number()),
      intValue: z.array(z.string()),
      maxValue: z.number(),
      minValue: z.number(),
      propertyName: z.string(),
      textValue: z.array(z.string()),
      unitCode: z.string(),
    })),
    co2Emissions: z.object({
      unit: z.string(),
      value: z.string(),
    }),
    color: z.string(),
    condition: z.string(),
    costOfGoodsSold: z.object({
      amountMicros: z.string(),
      currencyCode: z.string(),
    }),
    customLabel0: z.string(),
    customLabel1: z.string(),
    customLabel2: z.string(),
    customLabel3: z.string(),
    customLabel4: z.string(),
    dateFirstRegistered: z.string(),
    description: z.string(),
    disclosureDate: z.string(),
    displayAdsId: z.string(),
    displayAdsLink: z.string(),
    displayAdsSimilarIds: z.array(z.string()),
    displayAdsTitle: z.string(),
    displayAdsValue: z.number(),
    documentLinks: z.array(z.string()),
    electricRange: z.object({
      unit: z.string(),
      value: z.string(),
    }),
    emissionsStandard: z.string(),
    energyConsumption: z.object({
      unit: z.string(),
      value: z.number(),
    }),
    energyEfficiencyClass: z.string(),
    engine: z.string(),
    excludedDestinations: z.array(z.string()),
    expirationDate: z.string(),
    externalSellerId: z.string(),
    freeShippingThreshold: z.array(z.object({
      country: z.string(),
      priceThreshold: z.object({
        amountMicros: z.string(),
        currencyCode: z.string(),
      }),
    })),
    fuelConsumption: z.object({
      unit: z.string(),
      value: z.number(),
    }),
    fuelConsumptionDischargedBattery: z.object({
      unit: z.string(),
      value: z.number(),
    }),
    gender: z.string(),
    googleProductCategory: z.string(),
    gtins: z.array(z.string()),
    handlingCutoffTimes: z.array(z.object({
      country: z.string(),
      cutoffTime: z.string(),
      cutoffTimezone: z.string(),
      disableDeliveryAfterCutoff: z.boolean(),
    })),
    identifierExists: z.boolean(),
    imageLink: z.string(),
    includedDestinations: z.array(z.string()),
    installment: z.object({
      amount: z.object({
        amountMicros: z.string(),
        currencyCode: z.string(),
      }),
      annualPercentageRate: z.number(),
      creditType: z.string(),
      downpayment: z.object({
        amountMicros: z.string(),
        currencyCode: z.string(),
      }),
      months: z.string(),
      totalAmount: z.object({
        amountMicros: z.string(),
        currencyCode: z.string(),
      }),
    }),
    isBundle: z.boolean(),
    itemGroupId: z.string(),
    itemGroupTitle: z.string(),
    lifestyleImageLinks: z.array(z.string()),
    link: z.string(),
    linkTemplate: z.string(),
    loyaltyPoints: z.object({
      name: z.string(),
      pointsValue: z.string(),
      ratio: z.number(),
    }),
    loyaltyPrograms: z.array(z.object({
      cashbackForFutureUse: z.object({
        amountMicros: z.string(),
        currencyCode: z.string(),
      }),
      loyaltyPoints: z.string(),
      memberPriceEffectiveDate: z.object({
        endTime: z.string(),
        startTime: z.string(),
      }),
      price: z.object({
        amountMicros: z.string(),
        currencyCode: z.string(),
      }),
      programLabel: z.string(),
      shippingLabel: z.string(),
      tierLabel: z.string(),
    })),
    material: z.string(),
    maxEnergyEfficiencyClass: z.string(),
    maxHandlingTime: z.string(),
    maximumRetailPrice: z.object({
      amountMicros: z.string(),
      currencyCode: z.string(),
    }),
    mileage: z.object({
      unit: z.string(),
      value: z.string(),
    }),
    minEnergyEfficiencyClass: z.string(),
    minHandlingTime: z.string(),
    minimumOrderValues: z.array(z.object({
      country: z.string(),
      price: z.object({
        amountMicros: z.string(),
        currencyCode: z.string(),
      }),
      service: z.string(),
      surface: z.string(),
    })),
    mobileLink: z.string(),
    mobileLinkTemplate: z.string(),
    model: z.string(),
    mpn: z.string(),
    multipack: z.string(),
    pattern: z.string(),
    pause: z.string(),
    pickupCost: z.object({
      flatRate: z.object({
        amountMicros: z.string(),
        currencyCode: z.string(),
      }),
      freeThreshold: z.object({
        amountMicros: z.string(),
        currencyCode: z.string(),
      }),
    }),
    pickupMethod: z.string(),
    pickupSla: z.string(),
    popularityRank: z.number(),
    price: z.object({
      amountMicros: z.string(),
      currencyCode: z.string(),
    }),
    productDetails: z.array(z.object({
      attributeName: z.string(),
      attributeValue: z.string(),
      sectionName: z.string(),
    })),
    productHeight: z.object({
      unit: z.string(),
      value: z.number(),
    }),
    productHighlights: z.array(z.string()),
    productLength: z.object({
      unit: z.string(),
      value: z.number(),
    }),
    productTypes: z.array(z.string()),
    productWeight: z.object({
      unit: z.string(),
      value: z.number(),
    }),
    productWidth: z.object({
      unit: z.string(),
      value: z.number(),
    }),
    promotionIds: z.array(z.string()),
    questionsAndAnswers: z.array(z.object({
      answer: z.string(),
      question: z.string(),
    })),
    relatedProducts: z.array(z.object({
      id: z.string(),
      idType: z.string(),
      relationshipType: z.string(),
    })),
    returnPolicyLabel: z.string(),
    salePrice: z.object({
      amountMicros: z.string(),
      currencyCode: z.string(),
    }),
    salePriceEffectiveDate: z.object({
      endTime: z.string(),
      startTime: z.string(),
    }),
    sellOnGoogleQuantity: z.string(),
    shipping: z.array(z.object({
      country: z.string(),
      handlingCutoffTime: z.string(),
      handlingCutoffTimezone: z.string(),
      locationGroupName: z.string(),
      locationId: z.string(),
      loyaltyProgramLabel: z.string(),
      loyaltyTierLabel: z.string(),
      maxHandlingTime: z.string(),
      maxTransitTime: z.string(),
      minHandlingTime: z.string(),
      minTransitTime: z.string(),
      postalCode: z.string(),
      price: z.object({
        amountMicros: z.string(),
        currencyCode: z.string(),
      }),
      region: z.string(),
      service: z.string(),
    })),
    shippingHandlingBusinessDays: z.array(z.object({
      businessDays: z.string(),
      country: z.string(),
    })),
    shippingHeight: z.object({
      unit: z.string(),
      value: z.number(),
    }),
    shippingLabel: z.string(),
    shippingLength: z.object({
      unit: z.string(),
      value: z.number(),
    }),
    shippingTransitBusinessDays: z.array(z.object({
      businessDays: z.string(),
      country: z.string(),
    })),
    shippingWeight: z.object({
      unit: z.string(),
      value: z.number(),
    }),
    shippingWidth: z.object({
      unit: z.string(),
      value: z.number(),
    }),
    shoppingAdsExcludedCountries: z.array(z.string()),
    size: z.string(),
    sizeSystem: z.string(),
    sizeTypes: z.array(z.string()),
    structuredDescription: z.object({
      content: z.string(),
      digitalSourceType: z.string(),
    }),
    structuredTitle: z.object({
      content: z.string(),
      digitalSourceType: z.string(),
    }),
    subscriptionCost: z.object({
      amount: z.object({
        amountMicros: z.string(),
        currencyCode: z.string(),
      }),
      period: z.string(),
      periodLength: z.string(),
    }),
    sustainabilityIncentives: z.array(z.object({
      amount: z.object({
        amountMicros: z.string(),
        currencyCode: z.string(),
      }),
      percentage: z.number(),
      type: z.string(),
    })),
    title: z.string(),
    transitTimeLabel: z.string(),
    trim: z.string(),
    unitPricingBaseMeasure: z.object({
      unit: z.string(),
      value: z.string(),
    }),
    unitPricingMeasure: z.object({
      unit: z.string(),
      value: z.number(),
    }),
    variantOptions: z.array(z.object({
      name: z.string(),
      value: z.string(),
    })),
    vehicleAllInPrice: z.object({
      amountMicros: z.string(),
      currencyCode: z.string(),
    }),
    vehicleExpenses: z.object({
      amountMicros: z.string(),
      currencyCode: z.string(),
    }),
    vehicleMandatoryInspectionIncluded: z.boolean(),
    vehicleMsrp: z.object({
      amountMicros: z.string(),
      currencyCode: z.string(),
    }),
    vehiclePriceType: z.string(),
    videoLinks: z.array(z.string()),
    vin: z.string(),
    virtualModelLink: z.string(),
    warranty: z.object({
      duration: z.string(),
      mileage: z.object({
        unit: z.string(),
        value: z.string(),
      }),
    }),
    year: z.string(),
  }).optional(),
  productStatus: z.object({
    creationDate: z.string(),
    destinationStatuses: z.array(z.object({
      approvedCountries: z.array(z.string()),
      disapprovedCountries: z.array(z.string()),
      pendingCountries: z.array(z.string()),
      reportingContext: z.string(),
    })),
    googleExpirationDate: z.string(),
    itemLevelIssues: z.array(z.object({
      applicableCountries: z.array(z.string()),
      attribute: z.string(),
      code: z.string(),
      description: z.string(),
      detail: z.string(),
      documentation: z.string(),
      reportingContext: z.string(),
      resolution: z.string(),
      severity: z.string(),
    })),
    lastUpdateDate: z.string(),
  }).optional(),
  versionNumber: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Merchant Accounts.Products. Registered at `@swamp/gcp/merchantapi/accounts-products`. */
export const model = {
  type: "@swamp/gcp/merchantapi/accounts-products",
  version: "2026.06.05.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "The processed product, built from multiple product inputs after applying rule...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a products",
      arguments: z.object({
        identifier: z.string().describe("The name of the products"),
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
    sync: {
      description: "Sync products state from GCP",
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
    list: {
      description: "List products resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "The maximum number of products to return. The service may return fewer than this value. The maximum value is 1000; values above 1000 will be coerced to 1000. If unspecified, the default page size of 25 products will be returned.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "products",
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
  },
};
