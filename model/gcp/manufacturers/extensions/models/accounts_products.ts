// Auto-generated extension model for @swamp/gcp/manufacturers/accounts-products
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Manufacturer Center Accounts.Products.
 *
 * Product data.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  deleteResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://manufacturers.googleapis.com/";

const GET_CONFIG = {
  "id": "manufacturers.accounts.products.get",
  "path": "v1/{+parent}/products/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
    "name",
  ],
  "parameters": {
    "include": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "manufacturers.accounts.products.update",
  "path": "v1/{+parent}/products/{+name}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "parent",
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "manufacturers.accounts.products.delete",
  "path": "v1/{+parent}/products/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "parent",
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
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
  additionalImageLink: z.array(z.object({
    imageUrl: z.string().describe(
      "The URL of the image. For crawled images, this is the provided URL. For uploaded images, this is a serving URL from Google if the image has been processed successfully.",
    ).optional(),
    status: z.enum([
      "STATUS_UNSPECIFIED",
      "PENDING_PROCESSING",
      "PENDING_CRAWL",
      "OK",
      "ROBOTED",
      "XROBOTED",
      "CRAWL_ERROR",
      "PROCESSING_ERROR",
      "DECODING_ERROR",
      "TOO_BIG",
      "CRAWL_SKIPPED",
      "HOSTLOADED",
      "HTTP_404",
    ]).describe("The status of the image. @OutputOnly").optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "CRAWLED", "UPLOADED"]).describe(
      "The type of the image, i.e., crawled or uploaded. @OutputOnly",
    ).optional(),
  })).describe(
    "The additional images of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#addlimage.",
  ).optional(),
  ageGroup: z.string().describe(
    "The target age group of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#agegroup.",
  ).optional(),
  brand: z.string().describe(
    "The brand name of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#brand.",
  ).optional(),
  capacity: z.object({
    unit: z.string().describe("The unit of the capacity, i.e., MB, GB, or TB.")
      .optional(),
    value: z.string().describe("The numeric value of the capacity.").optional(),
  }).describe(
    "The capacity of a product. For more information, see https://support.google.com/manufacturers/answer/6124116#capacity.",
  ).optional(),
  certification: z.array(z.object({
    authority: z.string().describe("Required. Name of the certification body.")
      .optional(),
    code: z.string().describe(
      "Optional. A unique code to identify the certification.",
    ).optional(),
    link: z.string().describe("Optional. A URL link to the certification.")
      .optional(),
    logo: z.string().describe("Optional. A URL link to the certification logo.")
      .optional(),
    name: z.string().describe("Required. Name of the certification.")
      .optional(),
    validUntil: z.string().describe("Optional. The expiration date (UTC).")
      .optional(),
    value: z.string().describe("Optional. A custom value of the certification.")
      .optional(),
  })).describe("Optional. List of certifications claimed by this product.")
    .optional(),
  color: z.string().describe(
    "The color of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#color.",
  ).optional(),
  count: z.object({
    unit: z.string().describe("The unit in which these products are counted.")
      .optional(),
    value: z.string().describe(
      "The numeric value of the number of products in a package.",
    ).optional(),
  }).describe(
    "The number of products in a single package. For more information, see https://support.google.com/manufacturers/answer/6124116#count.",
  ).optional(),
  description: z.string().describe(
    "The description of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#description.",
  ).optional(),
  disclosureDate: z.string().describe(
    "The disclosure date of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#disclosure.",
  ).optional(),
  excludedDestination: z.array(z.string()).describe(
    'A list of excluded destinations such as "ClientExport", "ClientShoppingCatalog" or "PartnerShoppingCatalog". For more information, see https://support.google.com/manufacturers/answer/7443550',
  ).optional(),
  featureDescription: z.array(z.object({
    headline: z.string().describe("A short description of the feature.")
      .optional(),
    image: z.object({
      imageUrl: z.string().describe(
        "The URL of the image. For crawled images, this is the provided URL. For uploaded images, this is a serving URL from Google if the image has been processed successfully.",
      ).optional(),
      status: z.enum([
        "STATUS_UNSPECIFIED",
        "PENDING_PROCESSING",
        "PENDING_CRAWL",
        "OK",
        "ROBOTED",
        "XROBOTED",
        "CRAWL_ERROR",
        "PROCESSING_ERROR",
        "DECODING_ERROR",
        "TOO_BIG",
        "CRAWL_SKIPPED",
        "HOSTLOADED",
        "HTTP_404",
      ]).describe("The status of the image. @OutputOnly").optional(),
      type: z.enum(["TYPE_UNSPECIFIED", "CRAWLED", "UPLOADED"]).describe(
        "The type of the image, i.e., crawled or uploaded. @OutputOnly",
      ).optional(),
    }).describe("An image.").optional(),
    text: z.string().describe("A detailed description of the feature.")
      .optional(),
  })).describe(
    "The rich format description of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#featuredesc.",
  ).optional(),
  flavor: z.string().describe(
    "The flavor of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#flavor.",
  ).optional(),
  format: z.string().describe(
    "The format of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#format.",
  ).optional(),
  gender: z.string().describe(
    "The target gender of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#gender.",
  ).optional(),
  grocery: z.object({
    activeIngredients: z.string().describe("Active ingredients.").optional(),
    alcoholByVolume: z.number().describe("Alcohol by volume.").optional(),
    allergens: z.string().describe("Allergens.").optional(),
    derivedNutritionClaim: z.array(z.string()).describe(
      "Derived nutrition claim.",
    ).optional(),
    directions: z.string().describe("Directions.").optional(),
    indications: z.string().describe("Indications.").optional(),
    ingredients: z.string().describe("Ingredients.").optional(),
    nutritionClaim: z.array(z.string()).describe("Nutrition claim.").optional(),
    storageInstructions: z.string().describe("Storage instructions.")
      .optional(),
  }).optional(),
  gtin: z.array(z.string()).describe(
    "The Global Trade Item Number (GTIN) of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#gtin.",
  ).optional(),
  imageLink: z.object({
    imageUrl: z.string().describe(
      "The URL of the image. For crawled images, this is the provided URL. For uploaded images, this is a serving URL from Google if the image has been processed successfully.",
    ).optional(),
    status: z.enum([
      "STATUS_UNSPECIFIED",
      "PENDING_PROCESSING",
      "PENDING_CRAWL",
      "OK",
      "ROBOTED",
      "XROBOTED",
      "CRAWL_ERROR",
      "PROCESSING_ERROR",
      "DECODING_ERROR",
      "TOO_BIG",
      "CRAWL_SKIPPED",
      "HOSTLOADED",
      "HTTP_404",
    ]).describe("The status of the image. @OutputOnly").optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "CRAWLED", "UPLOADED"]).describe(
      "The type of the image, i.e., crawled or uploaded. @OutputOnly",
    ).optional(),
  }).describe("An image.").optional(),
  includedDestination: z.array(z.string()).describe(
    'A list of included destinations such as "ClientExport", "ClientShoppingCatalog" or "PartnerShoppingCatalog". For more information, see https://support.google.com/manufacturers/answer/7443550',
  ).optional(),
  intendedCountry: z.array(z.string()).describe(
    "Optional. List of countries to show this product in. Countries provided in this attribute will override any of the countries configured at feed level. The values should be: the [CLDR territory code](http://www.unicode.org/repos/cldr/tags/latest/common/main/en.xml) of the countries in which this item will be shown.",
  ).optional(),
  itemGroupId: z.string().describe(
    "The item group id of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#itemgroupid.",
  ).optional(),
  material: z.string().describe(
    "The material of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#material.",
  ).optional(),
  mpn: z.string().describe(
    "The Manufacturer Part Number (MPN) of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#mpn.",
  ).optional(),
  nutrition: z.object({
    addedSugars: z.object({
      amount: z.number().describe("amount.").optional(),
      unit: z.string().describe("unit.").optional(),
    }).describe("Combination of float amount and unit.").optional(),
    addedSugarsDailyPercentage: z.number().describe(
      "Added sugars daily percentage.",
    ).optional(),
    calcium: z.object({
      amount: z.number().describe("amount.").optional(),
      unit: z.string().describe("unit.").optional(),
    }).describe("Combination of float amount and unit.").optional(),
    calciumDailyPercentage: z.number().describe("Calcium daily percentage.")
      .optional(),
    cholesterol: z.object({
      amount: z.number().describe("amount.").optional(),
      unit: z.string().describe("unit.").optional(),
    }).describe("Combination of float amount and unit.").optional(),
    cholesterolDailyPercentage: z.number().describe(
      "Cholesterol daily percentage.",
    ).optional(),
    dietaryFiber: z.object({
      amount: z.number().describe("amount.").optional(),
      unit: z.string().describe("unit.").optional(),
    }).describe("Combination of float amount and unit.").optional(),
    dietaryFiberDailyPercentage: z.number().describe(
      "Dietary fiber daily percentage.",
    ).optional(),
    energy: z.object({
      amount: z.number().describe("amount.").optional(),
      unit: z.string().describe("unit.").optional(),
    }).describe("Combination of float amount and unit.").optional(),
    energyFromFat: z.object({
      amount: z.number().describe("amount.").optional(),
      unit: z.string().describe("unit.").optional(),
    }).describe("Combination of float amount and unit.").optional(),
    folateDailyPercentage: z.number().describe("Folate daily percentage.")
      .optional(),
    folateFolicAcid: z.object({
      amount: z.number().describe("amount.").optional(),
      unit: z.string().describe("unit.").optional(),
    }).describe("Combination of float amount and unit.").optional(),
    folateMcgDfe: z.number().describe("Folate mcg DFE.").optional(),
    iron: z.object({
      amount: z.number().describe("amount.").optional(),
      unit: z.string().describe("unit.").optional(),
    }).describe("Combination of float amount and unit.").optional(),
    ironDailyPercentage: z.number().describe("Iron daily percentage.")
      .optional(),
    monounsaturatedFat: z.object({
      amount: z.number().describe("amount.").optional(),
      unit: z.string().describe("unit.").optional(),
    }).describe("Combination of float amount and unit.").optional(),
    nutritionFactMeasure: z.string().describe("Nutrition fact measure.")
      .optional(),
    polyols: z.object({
      amount: z.number().describe("amount.").optional(),
      unit: z.string().describe("unit.").optional(),
    }).describe("Combination of float amount and unit.").optional(),
    polyunsaturatedFat: z.object({
      amount: z.number().describe("amount.").optional(),
      unit: z.string().describe("unit.").optional(),
    }).describe("Combination of float amount and unit.").optional(),
    potassium: z.object({
      amount: z.number().describe("amount.").optional(),
      unit: z.string().describe("unit.").optional(),
    }).describe("Combination of float amount and unit.").optional(),
    potassiumDailyPercentage: z.number().describe("Potassium daily percentage.")
      .optional(),
    preparedSizeDescription: z.string().describe("Prepared size description.")
      .optional(),
    protein: z.object({
      amount: z.number().describe("amount.").optional(),
      unit: z.string().describe("unit.").optional(),
    }).describe("Combination of float amount and unit.").optional(),
    proteinDailyPercentage: z.number().describe("Protein daily percentage.")
      .optional(),
    saturatedFat: z.object({
      amount: z.number().describe("amount.").optional(),
      unit: z.string().describe("unit.").optional(),
    }).describe("Combination of float amount and unit.").optional(),
    saturatedFatDailyPercentage: z.number().describe(
      "Saturated fat daily percentage.",
    ).optional(),
    servingSizeDescription: z.string().describe(
      "Food Serving Size. Serving size description.",
    ).optional(),
    servingSizeMeasure: z.object({
      amount: z.number().describe("amount.").optional(),
      unit: z.string().describe("unit.").optional(),
    }).describe("Combination of float amount and unit.").optional(),
    servingsPerContainer: z.string().describe("Servings per container.")
      .optional(),
    sodium: z.object({
      amount: z.number().describe("amount.").optional(),
      unit: z.string().describe("unit.").optional(),
    }).describe("Combination of float amount and unit.").optional(),
    sodiumDailyPercentage: z.number().describe("Sodium daily percentage.")
      .optional(),
    starch: z.object({
      amount: z.number().describe("amount.").optional(),
      unit: z.string().describe("unit.").optional(),
    }).describe("Combination of float amount and unit.").optional(),
    totalCarbohydrate: z.object({
      amount: z.number().describe("amount.").optional(),
      unit: z.string().describe("unit.").optional(),
    }).describe("Combination of float amount and unit.").optional(),
    totalCarbohydrateDailyPercentage: z.number().describe(
      "Total carbohydrate daily percentage.",
    ).optional(),
    totalFat: z.object({
      amount: z.number().describe("amount.").optional(),
      unit: z.string().describe("unit.").optional(),
    }).describe("Combination of float amount and unit.").optional(),
    totalFatDailyPercentage: z.number().describe("Total fat daily percentage.")
      .optional(),
    totalSugars: z.object({
      amount: z.number().describe("amount.").optional(),
      unit: z.string().describe("unit.").optional(),
    }).describe("Combination of float amount and unit.").optional(),
    totalSugarsDailyPercentage: z.number().describe(
      "Total sugars daily percentage.",
    ).optional(),
    transFat: z.object({
      amount: z.number().describe("amount.").optional(),
      unit: z.string().describe("unit.").optional(),
    }).describe("Combination of float amount and unit.").optional(),
    transFatDailyPercentage: z.number().describe("Trans fat daily percentage.")
      .optional(),
    vitaminD: z.object({
      amount: z.number().describe("amount.").optional(),
      unit: z.string().describe("unit.").optional(),
    }).describe("Combination of float amount and unit.").optional(),
    vitaminDDailyPercentage: z.number().describe("Vitamin D daily percentage.")
      .optional(),
    voluntaryNutritionFact: z.array(z.object({
      dailyPercentage: z.number().describe("Daily percentage.").optional(),
      name: z.string().describe("Name.").optional(),
      value: z.object({
        amount: z.number().describe("amount.").optional(),
        unit: z.string().describe("unit.").optional(),
      }).describe("Combination of float amount and unit.").optional(),
    })).describe("Voluntary nutrition fact.").optional(),
  }).optional(),
  pattern: z.string().describe(
    "The pattern of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#pattern.",
  ).optional(),
  productDetail: z.array(z.object({
    attributeName: z.string().describe("The name of the attribute.").optional(),
    attributeValue: z.string().describe("The value of the attribute.")
      .optional(),
    sectionName: z.string().describe(
      "A short section name that can be reused between multiple product details.",
    ).optional(),
  })).describe(
    "The details of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#productdetail.",
  ).optional(),
  productHighlight: z.array(z.string()).describe(
    "The product highlights. For more information, see https://support.google.com/manufacturers/answer/10066942",
  ).optional(),
  productLine: z.string().describe(
    "The name of the group of products related to the product. For more information, see https://support.google.com/manufacturers/answer/6124116#productline.",
  ).optional(),
  productName: z.string().describe(
    "The canonical name of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#productname.",
  ).optional(),
  productPageUrl: z.string().describe(
    "The URL of the detail page of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#productpage.",
  ).optional(),
  productType: z.array(z.string()).describe(
    "The type or category of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#producttype.",
  ).optional(),
  releaseDate: z.string().describe(
    "The release date of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#release.",
  ).optional(),
  richProductContent: z.array(z.string()).describe(
    "Rich product content. For more information, see https://support.google.com/manufacturers/answer/9389865",
  ).optional(),
  scent: z.string().describe(
    "The scent of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#scent.",
  ).optional(),
  size: z.string().describe(
    "The size of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#size.",
  ).optional(),
  sizeSystem: z.string().describe(
    "The size system of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#sizesystem.",
  ).optional(),
  sizeType: z.array(z.string()).describe(
    "The size type of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#sizetype.",
  ).optional(),
  suggestedRetailPrice: z.object({
    amount: z.string().describe("The numeric value of the price.").optional(),
    currency: z.string().describe("The currency in which the price is denoted.")
      .optional(),
  }).describe("A price.").optional(),
  targetClientId: z.string().describe(
    "The target client id. Should only be used in the accounts of the data partners. For more information, see https://support.google.com/manufacturers/answer/10857344",
  ).optional(),
  theme: z.string().describe(
    "The theme of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#theme.",
  ).optional(),
  title: z.string().describe(
    "The title of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#title.",
  ).optional(),
  videoLink: z.array(z.string()).describe(
    "The videos of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#video.",
  ).optional(),
  virtualModelLink: z.string().describe("Virtual Model (3d) asset link.")
    .optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  attributes: z.object({
    additionalImageLink: z.array(z.object({
      imageUrl: z.string(),
      status: z.string(),
      type: z.string(),
    })),
    ageGroup: z.string(),
    brand: z.string(),
    capacity: z.object({
      unit: z.string(),
      value: z.string(),
    }),
    certification: z.array(z.object({
      authority: z.string(),
      code: z.string(),
      link: z.string(),
      logo: z.string(),
      name: z.string(),
      validUntil: z.string(),
      value: z.string(),
    })),
    color: z.string(),
    count: z.object({
      unit: z.string(),
      value: z.string(),
    }),
    description: z.string(),
    disclosureDate: z.string(),
    excludedDestination: z.array(z.string()),
    featureDescription: z.array(z.object({
      headline: z.string(),
      image: z.object({
        imageUrl: z.string(),
        status: z.string(),
        type: z.string(),
      }),
      text: z.string(),
    })),
    flavor: z.string(),
    format: z.string(),
    gender: z.string(),
    grocery: z.object({
      activeIngredients: z.string(),
      alcoholByVolume: z.number(),
      allergens: z.string(),
      derivedNutritionClaim: z.array(z.string()),
      directions: z.string(),
      indications: z.string(),
      ingredients: z.string(),
      nutritionClaim: z.array(z.string()),
      storageInstructions: z.string(),
    }),
    gtin: z.array(z.string()),
    imageLink: z.object({
      imageUrl: z.string(),
      status: z.string(),
      type: z.string(),
    }),
    includedDestination: z.array(z.string()),
    intendedCountry: z.array(z.string()),
    itemGroupId: z.string(),
    material: z.string(),
    mpn: z.string(),
    nutrition: z.object({
      addedSugars: z.object({
        amount: z.number(),
        unit: z.string(),
      }),
      addedSugarsDailyPercentage: z.number(),
      calcium: z.object({
        amount: z.number(),
        unit: z.string(),
      }),
      calciumDailyPercentage: z.number(),
      cholesterol: z.object({
        amount: z.number(),
        unit: z.string(),
      }),
      cholesterolDailyPercentage: z.number(),
      dietaryFiber: z.object({
        amount: z.number(),
        unit: z.string(),
      }),
      dietaryFiberDailyPercentage: z.number(),
      energy: z.object({
        amount: z.number(),
        unit: z.string(),
      }),
      energyFromFat: z.object({
        amount: z.number(),
        unit: z.string(),
      }),
      folateDailyPercentage: z.number(),
      folateFolicAcid: z.object({
        amount: z.number(),
        unit: z.string(),
      }),
      folateMcgDfe: z.number(),
      iron: z.object({
        amount: z.number(),
        unit: z.string(),
      }),
      ironDailyPercentage: z.number(),
      monounsaturatedFat: z.object({
        amount: z.number(),
        unit: z.string(),
      }),
      nutritionFactMeasure: z.string(),
      polyols: z.object({
        amount: z.number(),
        unit: z.string(),
      }),
      polyunsaturatedFat: z.object({
        amount: z.number(),
        unit: z.string(),
      }),
      potassium: z.object({
        amount: z.number(),
        unit: z.string(),
      }),
      potassiumDailyPercentage: z.number(),
      preparedSizeDescription: z.string(),
      protein: z.object({
        amount: z.number(),
        unit: z.string(),
      }),
      proteinDailyPercentage: z.number(),
      saturatedFat: z.object({
        amount: z.number(),
        unit: z.string(),
      }),
      saturatedFatDailyPercentage: z.number(),
      servingSizeDescription: z.string(),
      servingSizeMeasure: z.object({
        amount: z.number(),
        unit: z.string(),
      }),
      servingsPerContainer: z.string(),
      sodium: z.object({
        amount: z.number(),
        unit: z.string(),
      }),
      sodiumDailyPercentage: z.number(),
      starch: z.object({
        amount: z.number(),
        unit: z.string(),
      }),
      totalCarbohydrate: z.object({
        amount: z.number(),
        unit: z.string(),
      }),
      totalCarbohydrateDailyPercentage: z.number(),
      totalFat: z.object({
        amount: z.number(),
        unit: z.string(),
      }),
      totalFatDailyPercentage: z.number(),
      totalSugars: z.object({
        amount: z.number(),
        unit: z.string(),
      }),
      totalSugarsDailyPercentage: z.number(),
      transFat: z.object({
        amount: z.number(),
        unit: z.string(),
      }),
      transFatDailyPercentage: z.number(),
      vitaminD: z.object({
        amount: z.number(),
        unit: z.string(),
      }),
      vitaminDDailyPercentage: z.number(),
      voluntaryNutritionFact: z.array(z.object({
        dailyPercentage: z.number(),
        name: z.string(),
        value: z.object({
          amount: z.unknown(),
          unit: z.unknown(),
        }),
      })),
    }),
    pattern: z.string(),
    productDetail: z.array(z.object({
      attributeName: z.string(),
      attributeValue: z.string(),
      sectionName: z.string(),
    })),
    productHighlight: z.array(z.string()),
    productLine: z.string(),
    productName: z.string(),
    productPageUrl: z.string(),
    productType: z.array(z.string()),
    releaseDate: z.string(),
    richProductContent: z.array(z.string()),
    scent: z.string(),
    size: z.string(),
    sizeSystem: z.string(),
    sizeType: z.array(z.string()),
    suggestedRetailPrice: z.object({
      amount: z.string(),
      currency: z.string(),
    }),
    targetClientId: z.string(),
    theme: z.string(),
    title: z.string(),
    videoLink: z.array(z.string()),
    virtualModelLink: z.string(),
  }).optional(),
  contentLanguage: z.string().optional(),
  destinationStatuses: z.array(z.object({
    approvedCountries: z.array(z.string()),
    destination: z.string(),
    disapprovedCountries: z.array(z.string()),
    pendingCountries: z.array(z.string()),
    status: z.string(),
  })).optional(),
  feedLabel: z.string().optional(),
  issues: z.array(z.object({
    applicableCountries: z.array(z.string()),
    attribute: z.string(),
    description: z.string(),
    destination: z.string(),
    resolution: z.string(),
    severity: z.string(),
    timestamp: z.string(),
    title: z.string(),
    type: z.string(),
  })).optional(),
  name: z.string(),
  parent: z.string().optional(),
  productId: z.string().optional(),
  targetCountry: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  additionalImageLink: z.array(z.object({
    imageUrl: z.string().describe(
      "The URL of the image. For crawled images, this is the provided URL. For uploaded images, this is a serving URL from Google if the image has been processed successfully.",
    ).optional(),
    status: z.enum([
      "STATUS_UNSPECIFIED",
      "PENDING_PROCESSING",
      "PENDING_CRAWL",
      "OK",
      "ROBOTED",
      "XROBOTED",
      "CRAWL_ERROR",
      "PROCESSING_ERROR",
      "DECODING_ERROR",
      "TOO_BIG",
      "CRAWL_SKIPPED",
      "HOSTLOADED",
      "HTTP_404",
    ]).describe("The status of the image. @OutputOnly").optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "CRAWLED", "UPLOADED"]).describe(
      "The type of the image, i.e., crawled or uploaded. @OutputOnly",
    ).optional(),
  })).describe(
    "The additional images of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#addlimage.",
  ).optional(),
  ageGroup: z.string().describe(
    "The target age group of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#agegroup.",
  ).optional(),
  brand: z.string().describe(
    "The brand name of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#brand.",
  ).optional(),
  capacity: z.object({
    unit: z.string().describe("The unit of the capacity, i.e., MB, GB, or TB.")
      .optional(),
    value: z.string().describe("The numeric value of the capacity.").optional(),
  }).describe(
    "The capacity of a product. For more information, see https://support.google.com/manufacturers/answer/6124116#capacity.",
  ).optional(),
  certification: z.array(z.object({
    authority: z.string().describe("Required. Name of the certification body.")
      .optional(),
    code: z.string().describe(
      "Optional. A unique code to identify the certification.",
    ).optional(),
    link: z.string().describe("Optional. A URL link to the certification.")
      .optional(),
    logo: z.string().describe("Optional. A URL link to the certification logo.")
      .optional(),
    name: z.string().describe("Required. Name of the certification.")
      .optional(),
    validUntil: z.string().describe("Optional. The expiration date (UTC).")
      .optional(),
    value: z.string().describe("Optional. A custom value of the certification.")
      .optional(),
  })).describe("Optional. List of certifications claimed by this product.")
    .optional(),
  color: z.string().describe(
    "The color of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#color.",
  ).optional(),
  count: z.object({
    unit: z.string().describe("The unit in which these products are counted.")
      .optional(),
    value: z.string().describe(
      "The numeric value of the number of products in a package.",
    ).optional(),
  }).describe(
    "The number of products in a single package. For more information, see https://support.google.com/manufacturers/answer/6124116#count.",
  ).optional(),
  description: z.string().describe(
    "The description of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#description.",
  ).optional(),
  disclosureDate: z.string().describe(
    "The disclosure date of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#disclosure.",
  ).optional(),
  excludedDestination: z.array(z.string()).describe(
    'A list of excluded destinations such as "ClientExport", "ClientShoppingCatalog" or "PartnerShoppingCatalog". For more information, see https://support.google.com/manufacturers/answer/7443550',
  ).optional(),
  featureDescription: z.array(z.object({
    headline: z.string().describe("A short description of the feature.")
      .optional(),
    image: z.object({
      imageUrl: z.string().describe(
        "The URL of the image. For crawled images, this is the provided URL. For uploaded images, this is a serving URL from Google if the image has been processed successfully.",
      ).optional(),
      status: z.enum([
        "STATUS_UNSPECIFIED",
        "PENDING_PROCESSING",
        "PENDING_CRAWL",
        "OK",
        "ROBOTED",
        "XROBOTED",
        "CRAWL_ERROR",
        "PROCESSING_ERROR",
        "DECODING_ERROR",
        "TOO_BIG",
        "CRAWL_SKIPPED",
        "HOSTLOADED",
        "HTTP_404",
      ]).describe("The status of the image. @OutputOnly").optional(),
      type: z.enum(["TYPE_UNSPECIFIED", "CRAWLED", "UPLOADED"]).describe(
        "The type of the image, i.e., crawled or uploaded. @OutputOnly",
      ).optional(),
    }).describe("An image.").optional(),
    text: z.string().describe("A detailed description of the feature.")
      .optional(),
  })).describe(
    "The rich format description of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#featuredesc.",
  ).optional(),
  flavor: z.string().describe(
    "The flavor of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#flavor.",
  ).optional(),
  format: z.string().describe(
    "The format of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#format.",
  ).optional(),
  gender: z.string().describe(
    "The target gender of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#gender.",
  ).optional(),
  grocery: z.object({
    activeIngredients: z.string().describe("Active ingredients.").optional(),
    alcoholByVolume: z.number().describe("Alcohol by volume.").optional(),
    allergens: z.string().describe("Allergens.").optional(),
    derivedNutritionClaim: z.array(z.string()).describe(
      "Derived nutrition claim.",
    ).optional(),
    directions: z.string().describe("Directions.").optional(),
    indications: z.string().describe("Indications.").optional(),
    ingredients: z.string().describe("Ingredients.").optional(),
    nutritionClaim: z.array(z.string()).describe("Nutrition claim.").optional(),
    storageInstructions: z.string().describe("Storage instructions.")
      .optional(),
  }).optional(),
  gtin: z.array(z.string()).describe(
    "The Global Trade Item Number (GTIN) of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#gtin.",
  ).optional(),
  imageLink: z.object({
    imageUrl: z.string().describe(
      "The URL of the image. For crawled images, this is the provided URL. For uploaded images, this is a serving URL from Google if the image has been processed successfully.",
    ).optional(),
    status: z.enum([
      "STATUS_UNSPECIFIED",
      "PENDING_PROCESSING",
      "PENDING_CRAWL",
      "OK",
      "ROBOTED",
      "XROBOTED",
      "CRAWL_ERROR",
      "PROCESSING_ERROR",
      "DECODING_ERROR",
      "TOO_BIG",
      "CRAWL_SKIPPED",
      "HOSTLOADED",
      "HTTP_404",
    ]).describe("The status of the image. @OutputOnly").optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "CRAWLED", "UPLOADED"]).describe(
      "The type of the image, i.e., crawled or uploaded. @OutputOnly",
    ).optional(),
  }).describe("An image.").optional(),
  includedDestination: z.array(z.string()).describe(
    'A list of included destinations such as "ClientExport", "ClientShoppingCatalog" or "PartnerShoppingCatalog". For more information, see https://support.google.com/manufacturers/answer/7443550',
  ).optional(),
  intendedCountry: z.array(z.string()).describe(
    "Optional. List of countries to show this product in. Countries provided in this attribute will override any of the countries configured at feed level. The values should be: the [CLDR territory code](http://www.unicode.org/repos/cldr/tags/latest/common/main/en.xml) of the countries in which this item will be shown.",
  ).optional(),
  itemGroupId: z.string().describe(
    "The item group id of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#itemgroupid.",
  ).optional(),
  material: z.string().describe(
    "The material of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#material.",
  ).optional(),
  mpn: z.string().describe(
    "The Manufacturer Part Number (MPN) of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#mpn.",
  ).optional(),
  nutrition: z.object({
    addedSugars: z.object({
      amount: z.number().describe("amount.").optional(),
      unit: z.string().describe("unit.").optional(),
    }).describe("Combination of float amount and unit.").optional(),
    addedSugarsDailyPercentage: z.number().describe(
      "Added sugars daily percentage.",
    ).optional(),
    calcium: z.object({
      amount: z.number().describe("amount.").optional(),
      unit: z.string().describe("unit.").optional(),
    }).describe("Combination of float amount and unit.").optional(),
    calciumDailyPercentage: z.number().describe("Calcium daily percentage.")
      .optional(),
    cholesterol: z.object({
      amount: z.number().describe("amount.").optional(),
      unit: z.string().describe("unit.").optional(),
    }).describe("Combination of float amount and unit.").optional(),
    cholesterolDailyPercentage: z.number().describe(
      "Cholesterol daily percentage.",
    ).optional(),
    dietaryFiber: z.object({
      amount: z.number().describe("amount.").optional(),
      unit: z.string().describe("unit.").optional(),
    }).describe("Combination of float amount and unit.").optional(),
    dietaryFiberDailyPercentage: z.number().describe(
      "Dietary fiber daily percentage.",
    ).optional(),
    energy: z.object({
      amount: z.number().describe("amount.").optional(),
      unit: z.string().describe("unit.").optional(),
    }).describe("Combination of float amount and unit.").optional(),
    energyFromFat: z.object({
      amount: z.number().describe("amount.").optional(),
      unit: z.string().describe("unit.").optional(),
    }).describe("Combination of float amount and unit.").optional(),
    folateDailyPercentage: z.number().describe("Folate daily percentage.")
      .optional(),
    folateFolicAcid: z.object({
      amount: z.number().describe("amount.").optional(),
      unit: z.string().describe("unit.").optional(),
    }).describe("Combination of float amount and unit.").optional(),
    folateMcgDfe: z.number().describe("Folate mcg DFE.").optional(),
    iron: z.object({
      amount: z.number().describe("amount.").optional(),
      unit: z.string().describe("unit.").optional(),
    }).describe("Combination of float amount and unit.").optional(),
    ironDailyPercentage: z.number().describe("Iron daily percentage.")
      .optional(),
    monounsaturatedFat: z.object({
      amount: z.number().describe("amount.").optional(),
      unit: z.string().describe("unit.").optional(),
    }).describe("Combination of float amount and unit.").optional(),
    nutritionFactMeasure: z.string().describe("Nutrition fact measure.")
      .optional(),
    polyols: z.object({
      amount: z.number().describe("amount.").optional(),
      unit: z.string().describe("unit.").optional(),
    }).describe("Combination of float amount and unit.").optional(),
    polyunsaturatedFat: z.object({
      amount: z.number().describe("amount.").optional(),
      unit: z.string().describe("unit.").optional(),
    }).describe("Combination of float amount and unit.").optional(),
    potassium: z.object({
      amount: z.number().describe("amount.").optional(),
      unit: z.string().describe("unit.").optional(),
    }).describe("Combination of float amount and unit.").optional(),
    potassiumDailyPercentage: z.number().describe("Potassium daily percentage.")
      .optional(),
    preparedSizeDescription: z.string().describe("Prepared size description.")
      .optional(),
    protein: z.object({
      amount: z.number().describe("amount.").optional(),
      unit: z.string().describe("unit.").optional(),
    }).describe("Combination of float amount and unit.").optional(),
    proteinDailyPercentage: z.number().describe("Protein daily percentage.")
      .optional(),
    saturatedFat: z.object({
      amount: z.number().describe("amount.").optional(),
      unit: z.string().describe("unit.").optional(),
    }).describe("Combination of float amount and unit.").optional(),
    saturatedFatDailyPercentage: z.number().describe(
      "Saturated fat daily percentage.",
    ).optional(),
    servingSizeDescription: z.string().describe(
      "Food Serving Size. Serving size description.",
    ).optional(),
    servingSizeMeasure: z.object({
      amount: z.number().describe("amount.").optional(),
      unit: z.string().describe("unit.").optional(),
    }).describe("Combination of float amount and unit.").optional(),
    servingsPerContainer: z.string().describe("Servings per container.")
      .optional(),
    sodium: z.object({
      amount: z.number().describe("amount.").optional(),
      unit: z.string().describe("unit.").optional(),
    }).describe("Combination of float amount and unit.").optional(),
    sodiumDailyPercentage: z.number().describe("Sodium daily percentage.")
      .optional(),
    starch: z.object({
      amount: z.number().describe("amount.").optional(),
      unit: z.string().describe("unit.").optional(),
    }).describe("Combination of float amount and unit.").optional(),
    totalCarbohydrate: z.object({
      amount: z.number().describe("amount.").optional(),
      unit: z.string().describe("unit.").optional(),
    }).describe("Combination of float amount and unit.").optional(),
    totalCarbohydrateDailyPercentage: z.number().describe(
      "Total carbohydrate daily percentage.",
    ).optional(),
    totalFat: z.object({
      amount: z.number().describe("amount.").optional(),
      unit: z.string().describe("unit.").optional(),
    }).describe("Combination of float amount and unit.").optional(),
    totalFatDailyPercentage: z.number().describe("Total fat daily percentage.")
      .optional(),
    totalSugars: z.object({
      amount: z.number().describe("amount.").optional(),
      unit: z.string().describe("unit.").optional(),
    }).describe("Combination of float amount and unit.").optional(),
    totalSugarsDailyPercentage: z.number().describe(
      "Total sugars daily percentage.",
    ).optional(),
    transFat: z.object({
      amount: z.number().describe("amount.").optional(),
      unit: z.string().describe("unit.").optional(),
    }).describe("Combination of float amount and unit.").optional(),
    transFatDailyPercentage: z.number().describe("Trans fat daily percentage.")
      .optional(),
    vitaminD: z.object({
      amount: z.number().describe("amount.").optional(),
      unit: z.string().describe("unit.").optional(),
    }).describe("Combination of float amount and unit.").optional(),
    vitaminDDailyPercentage: z.number().describe("Vitamin D daily percentage.")
      .optional(),
    voluntaryNutritionFact: z.array(z.object({
      dailyPercentage: z.number().describe("Daily percentage.").optional(),
      name: z.string().describe("Name.").optional(),
      value: z.object({
        amount: z.number().describe("amount.").optional(),
        unit: z.string().describe("unit.").optional(),
      }).describe("Combination of float amount and unit.").optional(),
    })).describe("Voluntary nutrition fact.").optional(),
  }).optional(),
  pattern: z.string().describe(
    "The pattern of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#pattern.",
  ).optional(),
  productDetail: z.array(z.object({
    attributeName: z.string().describe("The name of the attribute.").optional(),
    attributeValue: z.string().describe("The value of the attribute.")
      .optional(),
    sectionName: z.string().describe(
      "A short section name that can be reused between multiple product details.",
    ).optional(),
  })).describe(
    "The details of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#productdetail.",
  ).optional(),
  productHighlight: z.array(z.string()).describe(
    "The product highlights. For more information, see https://support.google.com/manufacturers/answer/10066942",
  ).optional(),
  productLine: z.string().describe(
    "The name of the group of products related to the product. For more information, see https://support.google.com/manufacturers/answer/6124116#productline.",
  ).optional(),
  productName: z.string().describe(
    "The canonical name of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#productname.",
  ).optional(),
  productPageUrl: z.string().describe(
    "The URL of the detail page of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#productpage.",
  ).optional(),
  productType: z.array(z.string()).describe(
    "The type or category of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#producttype.",
  ).optional(),
  releaseDate: z.string().describe(
    "The release date of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#release.",
  ).optional(),
  richProductContent: z.array(z.string()).describe(
    "Rich product content. For more information, see https://support.google.com/manufacturers/answer/9389865",
  ).optional(),
  scent: z.string().describe(
    "The scent of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#scent.",
  ).optional(),
  size: z.string().describe(
    "The size of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#size.",
  ).optional(),
  sizeSystem: z.string().describe(
    "The size system of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#sizesystem.",
  ).optional(),
  sizeType: z.array(z.string()).describe(
    "The size type of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#sizetype.",
  ).optional(),
  suggestedRetailPrice: z.object({
    amount: z.string().describe("The numeric value of the price.").optional(),
    currency: z.string().describe("The currency in which the price is denoted.")
      .optional(),
  }).describe("A price.").optional(),
  targetClientId: z.string().describe(
    "The target client id. Should only be used in the accounts of the data partners. For more information, see https://support.google.com/manufacturers/answer/10857344",
  ).optional(),
  theme: z.string().describe(
    "The theme of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#theme.",
  ).optional(),
  title: z.string().describe(
    "The title of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#title.",
  ).optional(),
  videoLink: z.array(z.string()).describe(
    "The videos of the product. For more information, see https://support.google.com/manufacturers/answer/6124116#video.",
  ).optional(),
  virtualModelLink: z.string().describe("Virtual Model (3d) asset link.")
    .optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Manufacturer Center Accounts.Products. Registered at `@swamp/gcp/manufacturers/accounts-products`. */
export const model = {
  type: "@swamp/gcp/manufacturers/accounts-products",
  version: "2026.05.19.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Product data.",
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
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        params["name"] = args.identifier;
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
      description: "Update products attributes",
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
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        else if (existing["parent"]) {
          params["parent"] = String(existing["parent"]);
        }
        params["name"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["additionalImageLink"] !== undefined) {
          body["additionalImageLink"] = g["additionalImageLink"];
        }
        if (g["ageGroup"] !== undefined) body["ageGroup"] = g["ageGroup"];
        if (g["brand"] !== undefined) body["brand"] = g["brand"];
        if (g["capacity"] !== undefined) body["capacity"] = g["capacity"];
        if (g["certification"] !== undefined) {
          body["certification"] = g["certification"];
        }
        if (g["color"] !== undefined) body["color"] = g["color"];
        if (g["count"] !== undefined) body["count"] = g["count"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["disclosureDate"] !== undefined) {
          body["disclosureDate"] = g["disclosureDate"];
        }
        if (g["excludedDestination"] !== undefined) {
          body["excludedDestination"] = g["excludedDestination"];
        }
        if (g["featureDescription"] !== undefined) {
          body["featureDescription"] = g["featureDescription"];
        }
        if (g["flavor"] !== undefined) body["flavor"] = g["flavor"];
        if (g["format"] !== undefined) body["format"] = g["format"];
        if (g["gender"] !== undefined) body["gender"] = g["gender"];
        if (g["grocery"] !== undefined) body["grocery"] = g["grocery"];
        if (g["gtin"] !== undefined) body["gtin"] = g["gtin"];
        if (g["imageLink"] !== undefined) body["imageLink"] = g["imageLink"];
        if (g["includedDestination"] !== undefined) {
          body["includedDestination"] = g["includedDestination"];
        }
        if (g["intendedCountry"] !== undefined) {
          body["intendedCountry"] = g["intendedCountry"];
        }
        if (g["itemGroupId"] !== undefined) {
          body["itemGroupId"] = g["itemGroupId"];
        }
        if (g["material"] !== undefined) body["material"] = g["material"];
        if (g["mpn"] !== undefined) body["mpn"] = g["mpn"];
        if (g["nutrition"] !== undefined) body["nutrition"] = g["nutrition"];
        if (g["pattern"] !== undefined) body["pattern"] = g["pattern"];
        if (g["productDetail"] !== undefined) {
          body["productDetail"] = g["productDetail"];
        }
        if (g["productHighlight"] !== undefined) {
          body["productHighlight"] = g["productHighlight"];
        }
        if (g["productLine"] !== undefined) {
          body["productLine"] = g["productLine"];
        }
        if (g["productName"] !== undefined) {
          body["productName"] = g["productName"];
        }
        if (g["productPageUrl"] !== undefined) {
          body["productPageUrl"] = g["productPageUrl"];
        }
        if (g["productType"] !== undefined) {
          body["productType"] = g["productType"];
        }
        if (g["releaseDate"] !== undefined) {
          body["releaseDate"] = g["releaseDate"];
        }
        if (g["richProductContent"] !== undefined) {
          body["richProductContent"] = g["richProductContent"];
        }
        if (g["scent"] !== undefined) body["scent"] = g["scent"];
        if (g["size"] !== undefined) body["size"] = g["size"];
        if (g["sizeSystem"] !== undefined) body["sizeSystem"] = g["sizeSystem"];
        if (g["sizeType"] !== undefined) body["sizeType"] = g["sizeType"];
        if (g["suggestedRetailPrice"] !== undefined) {
          body["suggestedRetailPrice"] = g["suggestedRetailPrice"];
        }
        if (g["targetClientId"] !== undefined) {
          body["targetClientId"] = g["targetClientId"];
        }
        if (g["theme"] !== undefined) body["theme"] = g["theme"];
        if (g["title"] !== undefined) body["title"] = g["title"];
        if (g["videoLink"] !== undefined) body["videoLink"] = g["videoLink"];
        if (g["virtualModelLink"] !== undefined) {
          body["virtualModelLink"] = g["virtualModelLink"];
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
      description: "Delete the products",
      arguments: z.object({
        identifier: z.string().describe("The name of the products"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        params["name"] = args.identifier;
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
          if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
          else if (existing["parent"]) {
            params["parent"] = String(existing["parent"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["name"] = identifier;
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
