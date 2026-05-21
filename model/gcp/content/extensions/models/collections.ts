// Auto-generated extension model for @swamp/gcp/content/collections
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Content for Shopping Collections.
 *
 * The collection message.
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
} from "./_lib/gcp.ts";

const BASE_URL = "https://shoppingcontent.googleapis.com/content/v2.1/";

const GET_CONFIG = {
  "id": "content.collections.get",
  "path": "{merchantId}/collections/{collectionId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "merchantId",
    "collectionId",
  ],
  "parameters": {
    "collectionId": {
      "location": "path",
      "required": true,
    },
    "merchantId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "content.collections.create",
  "path": "{merchantId}/collections",
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

const DELETE_CONFIG = {
  "id": "content.collections.delete",
  "path": "{merchantId}/collections/{collectionId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "merchantId",
    "collectionId",
  ],
  "parameters": {
    "collectionId": {
      "location": "path",
      "required": true,
    },
    "merchantId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "content.collections.list",
  "path": "{merchantId}/collections",
  "httpMethod": "GET",
  "parameterOrder": [
    "merchantId",
  ],
  "parameters": {
    "merchantId": {
      "location": "path",
      "required": true,
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
  customLabel0: z.string().describe(
    "Label that you assign to a collection to help organize bidding and reporting in Shopping campaigns. [Custom label](https://support.google.com/merchants/answer/9674217)",
  ).optional(),
  customLabel1: z.string().describe(
    "Label that you assign to a collection to help organize bidding and reporting in Shopping campaigns.",
  ).optional(),
  customLabel2: z.string().describe(
    "Label that you assign to a collection to help organize bidding and reporting in Shopping campaigns.",
  ).optional(),
  customLabel3: z.string().describe(
    "Label that you assign to a collection to help organize bidding and reporting in Shopping campaigns.",
  ).optional(),
  customLabel4: z.string().describe(
    "Label that you assign to a collection to help organize bidding and reporting in Shopping campaigns.",
  ).optional(),
  featuredProduct: z.array(z.object({
    offerId: z.string().describe("The unique identifier for the product item.")
      .optional(),
    x: z.number().describe(
      "Required. X-coordinate of the product callout on the Shoppable Image.",
    ).optional(),
    y: z.number().describe(
      "Required. Y-coordinate of the product callout on the Shoppable Image.",
    ).optional(),
  })).describe(
    "This identifies one or more products associated with the collection. Used as a lookup to the corresponding product ID in your product feeds. Provide a maximum of 100 featuredProduct (for collections). Provide up to 10 featuredProduct (for Shoppable Images only) with ID and X and Y coordinates. [featured_product attribute](https://support.google.com/merchants/answer/9703736)",
  ).optional(),
  headline: z.array(z.string()).describe(
    "Your collection's name. [headline attribute](https://support.google.com/merchants/answer/9673580)",
  ).optional(),
  id: z.string().describe(
    "Required. The REST ID of the collection. Content API methods that operate on collections take this as their collectionId parameter. The REST ID for a collection is of the form collectionId. [id attribute](https://support.google.com/merchants/answer/9649290)",
  ).optional(),
  imageLink: z.array(z.string()).describe(
    "The URL of a collection’s image. [image_link attribute](https://support.google.com/merchants/answer/9703236)",
  ).optional(),
  language: z.string().describe(
    "The language of a collection and the language of any featured products linked to the collection. [language attribute](https://support.google.com/merchants/answer/9673781)",
  ).optional(),
  link: z.string().describe(
    "A collection’s landing page. URL directly linking to your collection's page on your website. [link attribute](https://support.google.com/merchants/answer/9673983)",
  ).optional(),
  mobileLink: z.string().describe(
    "A collection’s mobile-optimized landing page when you have a different URL for mobile and desktop traffic. [mobile_link attribute](https://support.google.com/merchants/answer/9646123)",
  ).optional(),
  productCountry: z.string().describe(
    "[product_country attribute](https://support.google.com/merchants/answer/9674155)",
  ).optional(),
  merchantId: z.string().describe(
    "Required. The ID of the account that contains the collection. This account cannot be a multi-client account.",
  ),
});

const StateSchema = z.object({
  customLabel0: z.string().optional(),
  customLabel1: z.string().optional(),
  customLabel2: z.string().optional(),
  customLabel3: z.string().optional(),
  customLabel4: z.string().optional(),
  featuredProduct: z.array(z.object({
    offerId: z.string(),
    x: z.number(),
    y: z.number(),
  })).optional(),
  headline: z.array(z.string()).optional(),
  id: z.string().optional(),
  imageLink: z.array(z.string()).optional(),
  language: z.string().optional(),
  link: z.string().optional(),
  mobileLink: z.string().optional(),
  productCountry: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  customLabel0: z.string().describe(
    "Label that you assign to a collection to help organize bidding and reporting in Shopping campaigns. [Custom label](https://support.google.com/merchants/answer/9674217)",
  ).optional(),
  customLabel1: z.string().describe(
    "Label that you assign to a collection to help organize bidding and reporting in Shopping campaigns.",
  ).optional(),
  customLabel2: z.string().describe(
    "Label that you assign to a collection to help organize bidding and reporting in Shopping campaigns.",
  ).optional(),
  customLabel3: z.string().describe(
    "Label that you assign to a collection to help organize bidding and reporting in Shopping campaigns.",
  ).optional(),
  customLabel4: z.string().describe(
    "Label that you assign to a collection to help organize bidding and reporting in Shopping campaigns.",
  ).optional(),
  featuredProduct: z.array(z.object({
    offerId: z.string().describe("The unique identifier for the product item.")
      .optional(),
    x: z.number().describe(
      "Required. X-coordinate of the product callout on the Shoppable Image.",
    ).optional(),
    y: z.number().describe(
      "Required. Y-coordinate of the product callout on the Shoppable Image.",
    ).optional(),
  })).describe(
    "This identifies one or more products associated with the collection. Used as a lookup to the corresponding product ID in your product feeds. Provide a maximum of 100 featuredProduct (for collections). Provide up to 10 featuredProduct (for Shoppable Images only) with ID and X and Y coordinates. [featured_product attribute](https://support.google.com/merchants/answer/9703736)",
  ).optional(),
  headline: z.array(z.string()).describe(
    "Your collection's name. [headline attribute](https://support.google.com/merchants/answer/9673580)",
  ).optional(),
  id: z.string().describe(
    "Required. The REST ID of the collection. Content API methods that operate on collections take this as their collectionId parameter. The REST ID for a collection is of the form collectionId. [id attribute](https://support.google.com/merchants/answer/9649290)",
  ).optional(),
  imageLink: z.array(z.string()).describe(
    "The URL of a collection’s image. [image_link attribute](https://support.google.com/merchants/answer/9703236)",
  ).optional(),
  language: z.string().describe(
    "The language of a collection and the language of any featured products linked to the collection. [language attribute](https://support.google.com/merchants/answer/9673781)",
  ).optional(),
  link: z.string().describe(
    "A collection’s landing page. URL directly linking to your collection's page on your website. [link attribute](https://support.google.com/merchants/answer/9673983)",
  ).optional(),
  mobileLink: z.string().describe(
    "A collection’s mobile-optimized landing page when you have a different URL for mobile and desktop traffic. [mobile_link attribute](https://support.google.com/merchants/answer/9646123)",
  ).optional(),
  productCountry: z.string().describe(
    "[product_country attribute](https://support.google.com/merchants/answer/9674155)",
  ).optional(),
  merchantId: z.string().describe(
    "Required. The ID of the account that contains the collection. This account cannot be a multi-client account.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Content for Shopping Collections. Registered at `@swamp/gcp/content/collections`. */
export const model = {
  type: "@swamp/gcp/content/collections",
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
      description: "The collection message.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a collections",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["merchantId"] !== undefined) {
          params["merchantId"] = String(g["merchantId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["customLabel0"] !== undefined) {
          body["customLabel0"] = g["customLabel0"];
        }
        if (g["customLabel1"] !== undefined) {
          body["customLabel1"] = g["customLabel1"];
        }
        if (g["customLabel2"] !== undefined) {
          body["customLabel2"] = g["customLabel2"];
        }
        if (g["customLabel3"] !== undefined) {
          body["customLabel3"] = g["customLabel3"];
        }
        if (g["customLabel4"] !== undefined) {
          body["customLabel4"] = g["customLabel4"];
        }
        if (g["featuredProduct"] !== undefined) {
          body["featuredProduct"] = g["featuredProduct"];
        }
        if (g["headline"] !== undefined) body["headline"] = g["headline"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["imageLink"] !== undefined) body["imageLink"] = g["imageLink"];
        if (g["language"] !== undefined) body["language"] = g["language"];
        if (g["link"] !== undefined) body["link"] = g["link"];
        if (g["mobileLink"] !== undefined) body["mobileLink"] = g["mobileLink"];
        if (g["productCountry"] !== undefined) {
          body["productCountry"] = g["productCountry"];
        }
        if (g["name"] !== undefined) params["collectionId"] = String(g["name"]);
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
      description: "Get a collections",
      arguments: z.object({
        identifier: z.string().describe("The name of the collections"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["merchantId"] !== undefined) {
          params["merchantId"] = String(g["merchantId"]);
        }
        params["collectionId"] = args.identifier;
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
    delete: {
      description: "Delete the collections",
      arguments: z.object({
        identifier: z.string().describe("The name of the collections"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["merchantId"] !== undefined) {
          params["merchantId"] = String(g["merchantId"]);
        }
        params["collectionId"] = args.identifier;
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
      description: "Sync collections state from GCP",
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
          params["collectionId"] = identifier;
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
