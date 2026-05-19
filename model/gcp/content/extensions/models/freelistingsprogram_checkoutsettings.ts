// Auto-generated extension model for @swamp/gcp/content/freelistingsprogram-checkoutsettings
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Content for Shopping Freelistingsprogram.Checkoutsettings.
 *
 * `CheckoutSettings` for a specific merchant ID.
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
  "id": "content.freelistingsprogram.checkoutsettings.get",
  "path": "{merchantId}/freelistingsprogram/checkoutsettings",
  "httpMethod": "GET",
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

const INSERT_CONFIG = {
  "id": "content.freelistingsprogram.checkoutsettings.insert",
  "path": "{merchantId}/freelistingsprogram/checkoutsettings",
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
  "id": "content.freelistingsprogram.checkoutsettings.delete",
  "path": "{merchantId}/freelistingsprogram/checkoutsettings",
  "httpMethod": "DELETE",
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

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  uriSettings: z.object({
    cartUriTemplate: z.string().describe(
      "URL template when the placeholders are expanded will redirect the buyer to the cart page on the merchant website with the selected item in cart.",
    ).optional(),
    checkoutUriTemplate: z.string().describe(
      "URL template when the placeholders are expanded will redirect the buyer to the merchant checkout page with the item in the cart.",
    ).optional(),
  }).describe(
    "Specifications related to the `Checkout` URL. The `UriTemplate` is of the form `https://www.mystore.com/checkout?item_id={id}` where `{id}` will be automatically replaced with data from the merchant account with this attribute [offer_id](https://developers.google.com/shopping-content/reference/rest/v2.1/products#Product.FIELDS.offer_id)",
  ).optional(),
  merchantId: z.string().describe("Required. The ID of the account."),
});

const StateSchema = z.object({
  effectiveEnrollmentState: z.string().optional(),
  effectiveReviewState: z.string().optional(),
  effectiveUriSettings: z.object({
    cartUriTemplate: z.string(),
    checkoutUriTemplate: z.string(),
  }).optional(),
  enrollmentState: z.string().optional(),
  merchantId: z.string().optional(),
  reviewState: z.string().optional(),
  uriSettings: z.object({
    cartUriTemplate: z.string(),
    checkoutUriTemplate: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  uriSettings: z.object({
    cartUriTemplate: z.string().describe(
      "URL template when the placeholders are expanded will redirect the buyer to the cart page on the merchant website with the selected item in cart.",
    ).optional(),
    checkoutUriTemplate: z.string().describe(
      "URL template when the placeholders are expanded will redirect the buyer to the merchant checkout page with the item in the cart.",
    ).optional(),
  }).describe(
    "Specifications related to the `Checkout` URL. The `UriTemplate` is of the form `https://www.mystore.com/checkout?item_id={id}` where `{id}` will be automatically replaced with data from the merchant account with this attribute [offer_id](https://developers.google.com/shopping-content/reference/rest/v2.1/products#Product.FIELDS.offer_id)",
  ).optional(),
  merchantId: z.string().describe("Required. The ID of the account.")
    .optional(),
});

/** Swamp extension model for Google Cloud Content for Shopping Freelistingsprogram.Checkoutsettings. Registered at `@swamp/gcp/content/freelistingsprogram-checkoutsettings`. */
export const model = {
  type: "@swamp/gcp/content/freelistingsprogram-checkoutsettings",
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
      description: "`CheckoutSettings` for a specific merchant ID.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a checkoutsettings",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["merchantId"] !== undefined) {
          params["merchantId"] = String(g["merchantId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["uriSettings"] !== undefined) {
          body["uriSettings"] = g["uriSettings"];
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
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
      description: "Get a checkoutsettings",
      arguments: z.object({
        identifier: z.string().describe("The name of the checkoutsettings"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["merchantId"] = args.identifier;
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
      description: "Delete the checkoutsettings",
      arguments: z.object({
        identifier: z.string().describe("The name of the checkoutsettings"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["merchantId"] = args.identifier;
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
      description: "Sync checkoutsettings state from GCP",
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
          params["merchantId"] = identifier;
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
