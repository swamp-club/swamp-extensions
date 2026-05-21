// Auto-generated extension model for @swamp/gcp/books/volumes-recommended
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Books Volumes.Recommended.
 *
 * Return a list of recommended books for the current user.
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
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://books.googleapis.com/";

const LIST_CONFIG = {
  "id": "books.volumes.recommended.list",
  "path": "books/v1/volumes/recommended",
  "httpMethod": "GET",
  "parameterOrder": [],
  "parameters": {
    "locale": {
      "location": "query",
    },
    "maxAllowedMaturityRating": {
      "location": "query",
    },
    "source": {
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
  accessInfo: z.object({
    accessViewStatus: z.string(),
    country: z.string(),
    downloadAccess: z.object({
      deviceAllowed: z.boolean(),
      downloadsAcquired: z.number(),
      justAcquired: z.boolean(),
      kind: z.string(),
      maxDownloadDevices: z.number(),
      message: z.string(),
      nonce: z.string(),
      reasonCode: z.string(),
      restricted: z.boolean(),
      signature: z.string(),
      source: z.string(),
      volumeId: z.string(),
    }),
    driveImportedContentLink: z.string(),
    embeddable: z.boolean(),
    epub: z.object({
      acsTokenLink: z.string(),
      downloadLink: z.string(),
      isAvailable: z.boolean(),
    }),
    explicitOfflineLicenseManagement: z.boolean(),
    pdf: z.object({
      acsTokenLink: z.string(),
      downloadLink: z.string(),
      isAvailable: z.boolean(),
    }),
    publicDomain: z.boolean(),
    quoteSharingAllowed: z.boolean(),
    textToSpeechPermission: z.string(),
    viewOrderUrl: z.string(),
    viewability: z.string(),
    webReaderLink: z.string(),
  }).optional(),
  etag: z.string().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  layerInfo: z.object({
    layers: z.array(z.object({
      layerId: z.string(),
      volumeAnnotationsVersion: z.string(),
    })),
  }).optional(),
  recommendedInfo: z.object({
    explanation: z.string(),
  }).optional(),
  saleInfo: z.object({
    buyLink: z.string(),
    country: z.string(),
    isEbook: z.boolean(),
    listPrice: z.object({
      amount: z.number(),
      currencyCode: z.string(),
    }),
    offers: z.array(z.object({
      finskyOfferType: z.number(),
      giftable: z.boolean(),
      listPrice: z.object({
        amountInMicros: z.number(),
        currencyCode: z.string(),
      }),
      rentalDuration: z.object({
        count: z.number(),
        unit: z.string(),
      }),
      retailPrice: z.object({
        amountInMicros: z.number(),
        currencyCode: z.string(),
      }),
    })),
    onSaleDate: z.string(),
    retailPrice: z.object({
      amount: z.number(),
      currencyCode: z.string(),
    }),
    saleability: z.string(),
  }).optional(),
  searchInfo: z.object({
    textSnippet: z.string(),
  }).optional(),
  selfLink: z.string().optional(),
  userInfo: z.object({
    acquiredTime: z.string(),
    acquisitionType: z.number(),
    copy: z.object({
      allowedCharacterCount: z.number(),
      limitType: z.string(),
      remainingCharacterCount: z.number(),
      updated: z.string(),
    }),
    entitlementType: z.number(),
    familySharing: z.object({
      familyRole: z.string(),
      isSharingAllowed: z.boolean(),
      isSharingDisabledByFop: z.boolean(),
    }),
    isFamilySharedFromUser: z.boolean(),
    isFamilySharedToUser: z.boolean(),
    isFamilySharingAllowed: z.boolean(),
    isFamilySharingDisabledByFop: z.boolean(),
    isInMyBooks: z.boolean(),
    isPreordered: z.boolean(),
    isPurchased: z.boolean(),
    isUploaded: z.boolean(),
    readingPosition: z.object({
      epubCfiPosition: z.string(),
      gbImagePosition: z.string(),
      gbTextPosition: z.string(),
      kind: z.string(),
      pdfPosition: z.string(),
      updated: z.string(),
      volumeId: z.string(),
    }),
    rentalPeriod: z.object({
      endUtcSec: z.string(),
      startUtcSec: z.string(),
    }),
    rentalState: z.string(),
    review: z.object({
      author: z.object({
        displayName: z.string(),
      }),
      content: z.string(),
      date: z.string(),
      fullTextUrl: z.string(),
      kind: z.string(),
      rating: z.string(),
      source: z.object({
        description: z.string(),
        extraDescription: z.string(),
        url: z.string(),
      }),
      title: z.string(),
      type: z.string(),
      volumeId: z.string(),
    }),
    updated: z.string(),
    userUploadedVolumeInfo: z.object({
      processingState: z.string(),
    }),
  }).optional(),
  volumeInfo: z.object({
    allowAnonLogging: z.boolean(),
    authors: z.array(z.string()),
    averageRating: z.number(),
    canonicalVolumeLink: z.string(),
    categories: z.array(z.string()),
    comicsContent: z.boolean(),
    contentVersion: z.string(),
    description: z.string(),
    dimensions: z.object({
      height: z.string(),
      thickness: z.string(),
      width: z.string(),
    }),
    imageLinks: z.object({
      extraLarge: z.string(),
      large: z.string(),
      medium: z.string(),
      small: z.string(),
      smallThumbnail: z.string(),
      thumbnail: z.string(),
    }),
    industryIdentifiers: z.array(z.object({
      identifier: z.string(),
      type: z.string(),
    })),
    infoLink: z.string(),
    language: z.string(),
    mainCategory: z.string(),
    maturityRating: z.string(),
    pageCount: z.number(),
    panelizationSummary: z.object({
      containsEpubBubbles: z.boolean(),
      containsImageBubbles: z.boolean(),
      epubBubbleVersion: z.string(),
      imageBubbleVersion: z.string(),
    }),
    previewLink: z.string(),
    printType: z.string(),
    printedPageCount: z.number(),
    publishedDate: z.string(),
    publisher: z.string(),
    ratingsCount: z.number(),
    readingModes: z.object({
      image: z.boolean(),
      text: z.boolean(),
    }),
    samplePageCount: z.number(),
    seriesInfo: z.object({
      bookDisplayNumber: z.string(),
      kind: z.string(),
      shortSeriesBookTitle: z.string(),
      volumeSeries: z.array(z.object({
        issue: z.array(z.unknown()),
        orderNumber: z.number(),
        seriesBookType: z.string(),
        seriesId: z.string(),
      })),
    }),
    subtitle: z.string(),
    title: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Books Volumes.Recommended. Registered at `@swamp/gcp/books/volumes-recommended`. */
export const model = {
  type: "@swamp/gcp/books/volumes-recommended",
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
      description: "Return a list of recommended books for the current user.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a recommended",
      arguments: z.object({
        identifier: z.string().describe("The name of the recommended"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        const result = await readViaList(
          BASE_URL,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
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
      description: "Sync recommended state from GCP",
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
          const result = await readViaList(
            BASE_URL,
            LIST_CONFIG,
            params,
            "name",
            identifier,
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
    rate: {
      description: "rate",
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
        params["rating"] = existing["rating"]?.toString() ??
          g["rating"]?.toString() ?? "";
        params["volumeId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "books.volumes.recommended.rate",
            "path": "books/v1/volumes/recommended/rate",
            "httpMethod": "POST",
            "parameterOrder": ["rating", "volumeId"],
            "parameters": {
              "locale": { "location": "query" },
              "rating": { "location": "query", "required": true },
              "source": { "location": "query" },
              "volumeId": { "location": "query", "required": true },
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
