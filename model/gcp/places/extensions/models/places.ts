// Auto-generated extension model for @swamp/gcp/places/places
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Places (New) Places.
 *
 * All the information representing a Place.
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

const BASE_URL = "https://places.googleapis.com/";

const GET_CONFIG = {
  "id": "places.places.get",
  "path": "v1/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "languageCode": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "regionCode": {
      "location": "query",
    },
    "sessionToken": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
});

const StateSchema = z.object({
  accessibilityOptions: z.object({
    wheelchairAccessibleEntrance: z.boolean(),
    wheelchairAccessibleParking: z.boolean(),
    wheelchairAccessibleRestroom: z.boolean(),
    wheelchairAccessibleSeating: z.boolean(),
  }).optional(),
  addressComponents: z.array(z.object({
    languageCode: z.string(),
    longText: z.string(),
    shortText: z.string(),
    types: z.array(z.string()),
  })).optional(),
  addressDescriptor: z.object({
    areas: z.array(z.object({
      containment: z.string(),
      displayName: z.object({
        languageCode: z.string(),
        text: z.string(),
      }),
      name: z.string(),
      placeId: z.string(),
    })),
    landmarks: z.array(z.object({
      displayName: z.object({
        languageCode: z.string(),
        text: z.string(),
      }),
      name: z.string(),
      placeId: z.string(),
      spatialRelationship: z.string(),
      straightLineDistanceMeters: z.number(),
      travelDistanceMeters: z.number(),
      types: z.array(z.string()),
    })),
  }).optional(),
  adrFormatAddress: z.string().optional(),
  allowsDogs: z.boolean().optional(),
  attributions: z.array(z.object({
    provider: z.string(),
    providerUri: z.string(),
  })).optional(),
  businessStatus: z.string().optional(),
  consumerAlert: z.object({
    details: z.object({
      aboutLink: z.object({
        title: z.string(),
        uri: z.string(),
      }),
      description: z.string(),
      title: z.string(),
    }),
    languageCode: z.string(),
    overview: z.string(),
  }).optional(),
  containingPlaces: z.array(z.object({
    id: z.string(),
    name: z.string(),
  })).optional(),
  curbsidePickup: z.boolean().optional(),
  currentOpeningHours: z.object({
    nextCloseTime: z.string(),
    nextOpenTime: z.string(),
    openNow: z.boolean(),
    periods: z.array(z.object({
      close: z.object({
        date: z.object({
          day: z.unknown(),
          month: z.unknown(),
          year: z.unknown(),
        }),
        day: z.number(),
        hour: z.number(),
        minute: z.number(),
        truncated: z.boolean(),
      }),
      open: z.object({
        date: z.object({
          day: z.unknown(),
          month: z.unknown(),
          year: z.unknown(),
        }),
        day: z.number(),
        hour: z.number(),
        minute: z.number(),
        truncated: z.boolean(),
      }),
    })),
    secondaryHoursType: z.string(),
    specialDays: z.array(z.object({
      date: z.object({
        day: z.number(),
        month: z.number(),
        year: z.number(),
      }),
    })),
    weekdayDescriptions: z.array(z.string()),
  }).optional(),
  currentSecondaryOpeningHours: z.array(z.object({
    nextCloseTime: z.string(),
    nextOpenTime: z.string(),
    openNow: z.boolean(),
    periods: z.array(z.object({
      close: z.object({
        date: z.unknown(),
        day: z.unknown(),
        hour: z.unknown(),
        minute: z.unknown(),
        truncated: z.unknown(),
      }),
      open: z.object({
        date: z.unknown(),
        day: z.unknown(),
        hour: z.unknown(),
        minute: z.unknown(),
        truncated: z.unknown(),
      }),
    })),
    secondaryHoursType: z.string(),
    specialDays: z.array(z.object({
      date: z.object({
        day: z.unknown(),
        month: z.unknown(),
        year: z.unknown(),
      }),
    })),
    weekdayDescriptions: z.array(z.string()),
  })).optional(),
  delivery: z.boolean().optional(),
  dineIn: z.boolean().optional(),
  displayName: z.object({
    languageCode: z.string(),
    text: z.string(),
  }).optional(),
  editorialSummary: z.object({
    languageCode: z.string(),
    text: z.string(),
  }).optional(),
  evChargeAmenitySummary: z.object({
    coffee: z.object({
      content: z.object({
        languageCode: z.string(),
        text: z.string(),
      }),
      referencedPlaces: z.array(z.string()),
    }),
    disclosureText: z.object({
      languageCode: z.string(),
      text: z.string(),
    }),
    flagContentUri: z.string(),
    overview: z.object({
      content: z.object({
        languageCode: z.string(),
        text: z.string(),
      }),
      referencedPlaces: z.array(z.string()),
    }),
    restaurant: z.object({
      content: z.object({
        languageCode: z.string(),
        text: z.string(),
      }),
      referencedPlaces: z.array(z.string()),
    }),
    store: z.object({
      content: z.object({
        languageCode: z.string(),
        text: z.string(),
      }),
      referencedPlaces: z.array(z.string()),
    }),
  }).optional(),
  evChargeOptions: z.object({
    connectorAggregation: z.array(z.object({
      availabilityLastUpdateTime: z.string(),
      availableCount: z.number(),
      count: z.number(),
      maxChargeRateKw: z.number(),
      outOfServiceCount: z.number(),
      type: z.string(),
    })),
    connectorCount: z.number(),
  }).optional(),
  formattedAddress: z.string().optional(),
  fuelOptions: z.object({
    fuelPrices: z.array(z.object({
      price: z.object({
        currencyCode: z.string(),
        nanos: z.number(),
        units: z.string(),
      }),
      type: z.string(),
      updateTime: z.string(),
    })),
  }).optional(),
  generativeSummary: z.object({
    disclosureText: z.object({
      languageCode: z.string(),
      text: z.string(),
    }),
    overview: z.object({
      languageCode: z.string(),
      text: z.string(),
    }),
    overviewFlagContentUri: z.string(),
  }).optional(),
  goodForChildren: z.boolean().optional(),
  goodForGroups: z.boolean().optional(),
  goodForWatchingSports: z.boolean().optional(),
  googleMapsLinks: z.object({
    directionsUri: z.string(),
    photosUri: z.string(),
    placeUri: z.string(),
    reviewsUri: z.string(),
    writeAReviewUri: z.string(),
  }).optional(),
  googleMapsTypeLabel: z.object({
    languageCode: z.string(),
    text: z.string(),
  }).optional(),
  googleMapsUri: z.string().optional(),
  iconBackgroundColor: z.string().optional(),
  iconMaskBaseUri: z.string().optional(),
  id: z.string().optional(),
  internationalPhoneNumber: z.string().optional(),
  liveMusic: z.boolean().optional(),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }).optional(),
  menuForChildren: z.boolean().optional(),
  movedPlace: z.string().optional(),
  movedPlaceId: z.string().optional(),
  name: z.string(),
  nationalPhoneNumber: z.string().optional(),
  neighborhoodSummary: z.object({
    description: z.object({
      content: z.object({
        languageCode: z.string(),
        text: z.string(),
      }),
      referencedPlaces: z.array(z.string()),
    }),
    disclosureText: z.object({
      languageCode: z.string(),
      text: z.string(),
    }),
    flagContentUri: z.string(),
    overview: z.object({
      content: z.object({
        languageCode: z.string(),
        text: z.string(),
      }),
      referencedPlaces: z.array(z.string()),
    }),
  }).optional(),
  openingDate: z.object({
    day: z.number(),
    month: z.number(),
    year: z.number(),
  }).optional(),
  outdoorSeating: z.boolean().optional(),
  parkingOptions: z.object({
    freeGarageParking: z.boolean(),
    freeParkingLot: z.boolean(),
    freeStreetParking: z.boolean(),
    paidGarageParking: z.boolean(),
    paidParkingLot: z.boolean(),
    paidStreetParking: z.boolean(),
    valetParking: z.boolean(),
  }).optional(),
  paymentOptions: z.object({
    acceptsCashOnly: z.boolean(),
    acceptsCreditCards: z.boolean(),
    acceptsDebitCards: z.boolean(),
    acceptsNfc: z.boolean(),
  }).optional(),
  photos: z.array(z.object({
    authorAttributions: z.array(z.object({
      displayName: z.string(),
      photoUri: z.string(),
      uri: z.string(),
    })),
    flagContentUri: z.string(),
    googleMapsUri: z.string(),
    heightPx: z.number(),
    name: z.string(),
    widthPx: z.number(),
  })).optional(),
  plusCode: z.object({
    compoundCode: z.string(),
    globalCode: z.string(),
  }).optional(),
  postalAddress: z.object({
    addressLines: z.array(z.string()),
    administrativeArea: z.string(),
    languageCode: z.string(),
    locality: z.string(),
    organization: z.string(),
    postalCode: z.string(),
    recipients: z.array(z.string()),
    regionCode: z.string(),
    revision: z.number(),
    sortingCode: z.string(),
    sublocality: z.string(),
  }).optional(),
  priceLevel: z.string().optional(),
  priceRange: z.object({
    endPrice: z.object({
      currencyCode: z.string(),
      nanos: z.number(),
      units: z.string(),
    }),
    startPrice: z.object({
      currencyCode: z.string(),
      nanos: z.number(),
      units: z.string(),
    }),
  }).optional(),
  primaryType: z.string().optional(),
  primaryTypeDisplayName: z.object({
    languageCode: z.string(),
    text: z.string(),
  }).optional(),
  pureServiceAreaBusiness: z.boolean().optional(),
  rating: z.number().optional(),
  regularOpeningHours: z.object({
    nextCloseTime: z.string(),
    nextOpenTime: z.string(),
    openNow: z.boolean(),
    periods: z.array(z.object({
      close: z.object({
        date: z.object({
          day: z.unknown(),
          month: z.unknown(),
          year: z.unknown(),
        }),
        day: z.number(),
        hour: z.number(),
        minute: z.number(),
        truncated: z.boolean(),
      }),
      open: z.object({
        date: z.object({
          day: z.unknown(),
          month: z.unknown(),
          year: z.unknown(),
        }),
        day: z.number(),
        hour: z.number(),
        minute: z.number(),
        truncated: z.boolean(),
      }),
    })),
    secondaryHoursType: z.string(),
    specialDays: z.array(z.object({
      date: z.object({
        day: z.number(),
        month: z.number(),
        year: z.number(),
      }),
    })),
    weekdayDescriptions: z.array(z.string()),
  }).optional(),
  regularSecondaryOpeningHours: z.array(z.object({
    nextCloseTime: z.string(),
    nextOpenTime: z.string(),
    openNow: z.boolean(),
    periods: z.array(z.object({
      close: z.object({
        date: z.unknown(),
        day: z.unknown(),
        hour: z.unknown(),
        minute: z.unknown(),
        truncated: z.unknown(),
      }),
      open: z.object({
        date: z.unknown(),
        day: z.unknown(),
        hour: z.unknown(),
        minute: z.unknown(),
        truncated: z.unknown(),
      }),
    })),
    secondaryHoursType: z.string(),
    specialDays: z.array(z.object({
      date: z.object({
        day: z.unknown(),
        month: z.unknown(),
        year: z.unknown(),
      }),
    })),
    weekdayDescriptions: z.array(z.string()),
  })).optional(),
  reservable: z.boolean().optional(),
  restroom: z.boolean().optional(),
  reviewSummary: z.object({
    disclosureText: z.object({
      languageCode: z.string(),
      text: z.string(),
    }),
    flagContentUri: z.string(),
    reviewsUri: z.string(),
    text: z.object({
      languageCode: z.string(),
      text: z.string(),
    }),
  }).optional(),
  reviews: z.array(z.object({
    authorAttribution: z.object({
      displayName: z.string(),
      photoUri: z.string(),
      uri: z.string(),
    }),
    flagContentUri: z.string(),
    googleMapsUri: z.string(),
    name: z.string(),
    originalText: z.object({
      languageCode: z.string(),
      text: z.string(),
    }),
    publishTime: z.string(),
    rating: z.number(),
    relativePublishTimeDescription: z.string(),
    text: z.object({
      languageCode: z.string(),
      text: z.string(),
    }),
    visitDate: z.object({
      day: z.number(),
      month: z.number(),
      year: z.number(),
    }),
  })).optional(),
  servesBeer: z.boolean().optional(),
  servesBreakfast: z.boolean().optional(),
  servesBrunch: z.boolean().optional(),
  servesCocktails: z.boolean().optional(),
  servesCoffee: z.boolean().optional(),
  servesDessert: z.boolean().optional(),
  servesDinner: z.boolean().optional(),
  servesLunch: z.boolean().optional(),
  servesVegetarianFood: z.boolean().optional(),
  servesWine: z.boolean().optional(),
  shortFormattedAddress: z.string().optional(),
  subDestinations: z.array(z.object({
    id: z.string(),
    name: z.string(),
  })).optional(),
  takeout: z.boolean().optional(),
  timeZone: z.object({
    id: z.string(),
    version: z.string(),
  }).optional(),
  transitStation: z.object({
    agencies: z.array(z.object({
      displayName: z.object({
        languageCode: z.string(),
        text: z.string(),
      }),
      fareUrl: z.string(),
      icon: z.object({
        nameIncluded: z.boolean(),
        url: z.string(),
      }),
      lines: z.array(z.object({
        backgroundColor: z.unknown(),
        displayName: z.unknown(),
        icon: z.unknown(),
        id: z.unknown(),
        shortDisplayName: z.unknown(),
        textColor: z.unknown(),
        url: z.unknown(),
        vehicleIcon: z.unknown(),
        vehicleType: z.unknown(),
      })),
      url: z.string(),
    })),
    displayName: z.object({
      languageCode: z.string(),
      text: z.string(),
    }),
    stops: z.array(z.object({
      displayName: z.object({
        languageCode: z.string(),
        text: z.string(),
      }),
      id: z.string(),
      location: z.object({
        latitude: z.number(),
        longitude: z.number(),
      }),
      platformCode: z.object({
        languageCode: z.string(),
        text: z.string(),
      }),
      signageText: z.object({
        languageCode: z.string(),
        text: z.string(),
      }),
      stopCode: z.object({
        languageCode: z.string(),
        text: z.string(),
      }),
      wheelchairAccessibleEntrance: z.boolean(),
    })),
  }).optional(),
  types: z.array(z.string()).optional(),
  userRatingCount: z.number().optional(),
  utcOffsetMinutes: z.number().optional(),
  viewport: z.object({
    high: z.object({
      latitude: z.number(),
      longitude: z.number(),
    }),
    low: z.object({
      latitude: z.number(),
      longitude: z.number(),
    }),
  }).optional(),
  websiteUri: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Places (New) Places. Registered at `@swamp/gcp/places/places`. */
export const model = {
  type: "@swamp/gcp/places/places",
  version: "2026.05.24.1",
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
      toVersion: "2026.05.19.3",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "All the information representing a Place.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a places",
      arguments: z.object({
        identifier: z.string().describe("The name of the places"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
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
    sync: {
      description: "Sync places state from GCP",
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
    autocomplete: {
      description: "autocomplete",
      arguments: z.object({
        includeFutureOpeningBusinesses: z.any().optional(),
        includePureServiceAreaBusinesses: z.any().optional(),
        includeQueryPredictions: z.any().optional(),
        includedPrimaryTypes: z.any().optional(),
        includedRegionCodes: z.any().optional(),
        input: z.any().optional(),
        inputOffset: z.any().optional(),
        languageCode: z.any().optional(),
        locationBias: z.any().optional(),
        locationRestriction: z.any().optional(),
        origin: z.any().optional(),
        regionCode: z.any().optional(),
        sessionToken: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (args["includeFutureOpeningBusinesses"] !== undefined) {
          body["includeFutureOpeningBusinesses"] =
            args["includeFutureOpeningBusinesses"];
        }
        if (args["includePureServiceAreaBusinesses"] !== undefined) {
          body["includePureServiceAreaBusinesses"] =
            args["includePureServiceAreaBusinesses"];
        }
        if (args["includeQueryPredictions"] !== undefined) {
          body["includeQueryPredictions"] = args["includeQueryPredictions"];
        }
        if (args["includedPrimaryTypes"] !== undefined) {
          body["includedPrimaryTypes"] = args["includedPrimaryTypes"];
        }
        if (args["includedRegionCodes"] !== undefined) {
          body["includedRegionCodes"] = args["includedRegionCodes"];
        }
        if (args["input"] !== undefined) body["input"] = args["input"];
        if (args["inputOffset"] !== undefined) {
          body["inputOffset"] = args["inputOffset"];
        }
        if (args["languageCode"] !== undefined) {
          body["languageCode"] = args["languageCode"];
        }
        if (args["locationBias"] !== undefined) {
          body["locationBias"] = args["locationBias"];
        }
        if (args["locationRestriction"] !== undefined) {
          body["locationRestriction"] = args["locationRestriction"];
        }
        if (args["origin"] !== undefined) body["origin"] = args["origin"];
        if (args["regionCode"] !== undefined) {
          body["regionCode"] = args["regionCode"];
        }
        if (args["sessionToken"] !== undefined) {
          body["sessionToken"] = args["sessionToken"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "places.places.autocomplete",
            "path": "v1/places:autocomplete",
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
    search_nearby: {
      description: "search nearby",
      arguments: z.object({
        excludedPrimaryTypes: z.any().optional(),
        excludedTypes: z.any().optional(),
        includeFutureOpeningBusinesses: z.any().optional(),
        includedPrimaryTypes: z.any().optional(),
        includedTypes: z.any().optional(),
        languageCode: z.any().optional(),
        locationRestriction: z.any().optional(),
        maxResultCount: z.any().optional(),
        rankPreference: z.any().optional(),
        regionCode: z.any().optional(),
        routingParameters: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (args["excludedPrimaryTypes"] !== undefined) {
          body["excludedPrimaryTypes"] = args["excludedPrimaryTypes"];
        }
        if (args["excludedTypes"] !== undefined) {
          body["excludedTypes"] = args["excludedTypes"];
        }
        if (args["includeFutureOpeningBusinesses"] !== undefined) {
          body["includeFutureOpeningBusinesses"] =
            args["includeFutureOpeningBusinesses"];
        }
        if (args["includedPrimaryTypes"] !== undefined) {
          body["includedPrimaryTypes"] = args["includedPrimaryTypes"];
        }
        if (args["includedTypes"] !== undefined) {
          body["includedTypes"] = args["includedTypes"];
        }
        if (args["languageCode"] !== undefined) {
          body["languageCode"] = args["languageCode"];
        }
        if (args["locationRestriction"] !== undefined) {
          body["locationRestriction"] = args["locationRestriction"];
        }
        if (args["maxResultCount"] !== undefined) {
          body["maxResultCount"] = args["maxResultCount"];
        }
        if (args["rankPreference"] !== undefined) {
          body["rankPreference"] = args["rankPreference"];
        }
        if (args["regionCode"] !== undefined) {
          body["regionCode"] = args["regionCode"];
        }
        if (args["routingParameters"] !== undefined) {
          body["routingParameters"] = args["routingParameters"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "places.places.searchNearby",
            "path": "v1/places:searchNearby",
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
    search_text: {
      description: "search text",
      arguments: z.object({
        evOptions: z.any().optional(),
        includeFutureOpeningBusinesses: z.any().optional(),
        includePureServiceAreaBusinesses: z.any().optional(),
        includedType: z.any().optional(),
        languageCode: z.any().optional(),
        locationBias: z.any().optional(),
        locationRestriction: z.any().optional(),
        maxResultCount: z.any().optional(),
        minRating: z.any().optional(),
        openNow: z.any().optional(),
        pageSize: z.any().optional(),
        pageToken: z.any().optional(),
        priceLevels: z.any().optional(),
        rankPreference: z.any().optional(),
        regionCode: z.any().optional(),
        routingParameters: z.any().optional(),
        searchAlongRouteParameters: z.any().optional(),
        strictTypeFiltering: z.any().optional(),
        textQuery: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (args["evOptions"] !== undefined) {
          body["evOptions"] = args["evOptions"];
        }
        if (args["includeFutureOpeningBusinesses"] !== undefined) {
          body["includeFutureOpeningBusinesses"] =
            args["includeFutureOpeningBusinesses"];
        }
        if (args["includePureServiceAreaBusinesses"] !== undefined) {
          body["includePureServiceAreaBusinesses"] =
            args["includePureServiceAreaBusinesses"];
        }
        if (args["includedType"] !== undefined) {
          body["includedType"] = args["includedType"];
        }
        if (args["languageCode"] !== undefined) {
          body["languageCode"] = args["languageCode"];
        }
        if (args["locationBias"] !== undefined) {
          body["locationBias"] = args["locationBias"];
        }
        if (args["locationRestriction"] !== undefined) {
          body["locationRestriction"] = args["locationRestriction"];
        }
        if (args["maxResultCount"] !== undefined) {
          body["maxResultCount"] = args["maxResultCount"];
        }
        if (args["minRating"] !== undefined) {
          body["minRating"] = args["minRating"];
        }
        if (args["openNow"] !== undefined) body["openNow"] = args["openNow"];
        if (args["pageSize"] !== undefined) body["pageSize"] = args["pageSize"];
        if (args["pageToken"] !== undefined) {
          body["pageToken"] = args["pageToken"];
        }
        if (args["priceLevels"] !== undefined) {
          body["priceLevels"] = args["priceLevels"];
        }
        if (args["rankPreference"] !== undefined) {
          body["rankPreference"] = args["rankPreference"];
        }
        if (args["regionCode"] !== undefined) {
          body["regionCode"] = args["regionCode"];
        }
        if (args["routingParameters"] !== undefined) {
          body["routingParameters"] = args["routingParameters"];
        }
        if (args["searchAlongRouteParameters"] !== undefined) {
          body["searchAlongRouteParameters"] =
            args["searchAlongRouteParameters"];
        }
        if (args["strictTypeFiltering"] !== undefined) {
          body["strictTypeFiltering"] = args["strictTypeFiltering"];
        }
        if (args["textQuery"] !== undefined) {
          body["textQuery"] = args["textQuery"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "places.places.searchText",
            "path": "v1/places:searchText",
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
  },
};
