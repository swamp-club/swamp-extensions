// Auto-generated extension model for @swamp/gcp/content/liasettings
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Content for Shopping Liasettings.
 *
 * Local Inventory ads (LIA) settings. All methods except listposdataproviders require the admin role.
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
  "id": "content.liasettings.get",
  "path": "{merchantId}/liasettings/{accountId}",
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
  "id": "content.liasettings.update",
  "path": "{merchantId}/liasettings/{accountId}",
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
    "The ID of the account to which these LIA settings belong. Ignored upon update, always present in get request responses.",
  ).optional(),
  countrySettings: z.array(z.object({
    about: z.object({
      status: z.string().describe(
        'The status of the verification process for the About page. Supported values are: - "`active`" - "`inactive`" - "`pending`"',
      ).optional(),
      url: z.string().describe("The URL for the About page.").optional(),
    }).optional(),
    country: z.string().describe(
      'Required. CLDR country code (for example, "US").',
    ).optional(),
    hostedLocalStorefrontActive: z.boolean().describe(
      'The status of the "Merchant hosted local storefront" feature.',
    ).optional(),
    inventory: z.object({
      inventoryVerificationContactEmail: z.string().describe(
        "The email of the contact for the inventory verification process.",
      ).optional(),
      inventoryVerificationContactName: z.string().describe(
        "The name of the contact for the inventory verification process.",
      ).optional(),
      inventoryVerificationContactStatus: z.string().describe(
        'The status of the verification contact. Acceptable values are: - "`active`" - "`inactive`" - "`pending`"',
      ).optional(),
      status: z.string().describe(
        'The status of the inventory verification process. Acceptable values are: - "`active`" - "`inactive`" - "`pending`"',
      ).optional(),
    }).optional(),
    omnichannelExperience: z.object({
      country: z.string().describe('The CLDR country code (for example, "US").')
        .optional(),
      lsfType: z.string().describe(
        'The Local Store Front (LSF) type for this country. Acceptable values are: - "`ghlsf`" (Google-Hosted Local Store Front) - "`mhlsfBasic`" (Merchant-Hosted Local Store Front Basic) - "`mhlsfFull`" (Merchant-Hosted Local Store Front Full) More details about these types can be found here.',
      ).optional(),
      pickupTypes: z.array(z.string()).describe(
        'The Pickup types for this country. Acceptable values are: - "`pickupToday`" - "`pickupLater`"',
      ).optional(),
    }).describe("Omnichannel experience details.").optional(),
    onDisplayToOrder: z.object({
      shippingCostPolicyUrl: z.string().describe(
        "Shipping cost and policy URL.",
      ).optional(),
      status: z.string().describe(
        'The status of the?On display to order? feature. Acceptable values are: - "`active`" - "`inactive`" - "`pending`"',
      ).optional(),
    }).optional(),
    posDataProvider: z.object({
      posDataProviderId: z.string().describe("The ID of the POS data provider.")
        .optional(),
      posExternalAccountId: z.string().describe(
        "The account ID by which this merchant is known to the POS data provider.",
      ).optional(),
    }).optional(),
    storePickupActive: z.boolean().describe(
      'The status of the "Store pickup" feature.',
    ).optional(),
  })).describe("The LIA settings for each country.").optional(),
  kind: z.string().describe(
    'Identifies what kind of resource this is. Value: the fixed string "`content#liaSettings`"',
  ).optional(),
});

const StateSchema = z.object({
  accountId: z.string().optional(),
  countrySettings: z.array(z.object({
    about: z.object({
      status: z.string(),
      url: z.string(),
    }),
    country: z.string(),
    hostedLocalStorefrontActive: z.boolean(),
    inventory: z.object({
      inventoryVerificationContactEmail: z.string(),
      inventoryVerificationContactName: z.string(),
      inventoryVerificationContactStatus: z.string(),
      status: z.string(),
    }),
    omnichannelExperience: z.object({
      country: z.string(),
      lsfType: z.string(),
      pickupTypes: z.array(z.string()),
    }),
    onDisplayToOrder: z.object({
      shippingCostPolicyUrl: z.string(),
      status: z.string(),
    }),
    posDataProvider: z.object({
      posDataProviderId: z.string(),
      posExternalAccountId: z.string(),
    }),
    storePickupActive: z.boolean(),
  })).optional(),
  kind: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accountId: z.string().describe(
    "The ID of the account to which these LIA settings belong. Ignored upon update, always present in get request responses.",
  ).optional(),
  countrySettings: z.array(z.object({
    about: z.object({
      status: z.string().describe(
        'The status of the verification process for the About page. Supported values are: - "`active`" - "`inactive`" - "`pending`"',
      ).optional(),
      url: z.string().describe("The URL for the About page.").optional(),
    }).optional(),
    country: z.string().describe(
      'Required. CLDR country code (for example, "US").',
    ).optional(),
    hostedLocalStorefrontActive: z.boolean().describe(
      'The status of the "Merchant hosted local storefront" feature.',
    ).optional(),
    inventory: z.object({
      inventoryVerificationContactEmail: z.string().describe(
        "The email of the contact for the inventory verification process.",
      ).optional(),
      inventoryVerificationContactName: z.string().describe(
        "The name of the contact for the inventory verification process.",
      ).optional(),
      inventoryVerificationContactStatus: z.string().describe(
        'The status of the verification contact. Acceptable values are: - "`active`" - "`inactive`" - "`pending`"',
      ).optional(),
      status: z.string().describe(
        'The status of the inventory verification process. Acceptable values are: - "`active`" - "`inactive`" - "`pending`"',
      ).optional(),
    }).optional(),
    omnichannelExperience: z.object({
      country: z.string().describe('The CLDR country code (for example, "US").')
        .optional(),
      lsfType: z.string().describe(
        'The Local Store Front (LSF) type for this country. Acceptable values are: - "`ghlsf`" (Google-Hosted Local Store Front) - "`mhlsfBasic`" (Merchant-Hosted Local Store Front Basic) - "`mhlsfFull`" (Merchant-Hosted Local Store Front Full) More details about these types can be found here.',
      ).optional(),
      pickupTypes: z.array(z.string()).describe(
        'The Pickup types for this country. Acceptable values are: - "`pickupToday`" - "`pickupLater`"',
      ).optional(),
    }).describe("Omnichannel experience details.").optional(),
    onDisplayToOrder: z.object({
      shippingCostPolicyUrl: z.string().describe(
        "Shipping cost and policy URL.",
      ).optional(),
      status: z.string().describe(
        'The status of the?On display to order? feature. Acceptable values are: - "`active`" - "`inactive`" - "`pending`"',
      ).optional(),
    }).optional(),
    posDataProvider: z.object({
      posDataProviderId: z.string().describe("The ID of the POS data provider.")
        .optional(),
      posExternalAccountId: z.string().describe(
        "The account ID by which this merchant is known to the POS data provider.",
      ).optional(),
    }).optional(),
    storePickupActive: z.boolean().describe(
      'The status of the "Store pickup" feature.',
    ).optional(),
  })).describe("The LIA settings for each country.").optional(),
  kind: z.string().describe(
    'Identifies what kind of resource this is. Value: the fixed string "`content#liaSettings`"',
  ).optional(),
});

/** Swamp extension model for Google Cloud Content for Shopping Liasettings. Registered at `@swamp/gcp/content/liasettings`. */
export const model = {
  type: "@swamp/gcp/content/liasettings",
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
        "Local Inventory ads (LIA) settings. All methods except listposdataproviders r...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a liasettings",
      arguments: z.object({
        identifier: z.string().describe("The name of the liasettings"),
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
      description: "Update liasettings attributes",
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
        if (g["countrySettings"] !== undefined) {
          body["countrySettings"] = g["countrySettings"];
        }
        if (g["kind"] !== undefined) body["kind"] = g["kind"];
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
      description: "Sync liasettings state from GCP",
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
            "id": "content.liasettings.custombatch",
            "path": "liasettings/batch",
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
    getaccessiblegmbaccounts: {
      description: "getaccessiblegmbaccounts",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
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
        params["merchantId"] = existing["merchantId"]?.toString() ??
          g["merchantId"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "content.liasettings.getaccessiblegmbaccounts",
            "path":
              "{merchantId}/liasettings/{accountId}/accessiblegmbaccounts",
            "httpMethod": "GET",
            "parameterOrder": ["merchantId", "accountId"],
            "parameters": {
              "accountId": { "location": "path", "required": true },
              "merchantId": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    listposdataproviders: {
      description: "listposdataproviders",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const result = await createResource(
          BASE_URL,
          {
            "id": "content.liasettings.listposdataproviders",
            "path": "liasettings/posdataproviders",
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
    requestgmbaccess: {
      description: "requestgmbaccess",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
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
        params["merchantId"] = existing["merchantId"]?.toString() ??
          g["merchantId"]?.toString() ?? "";
        params["gmbEmail"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "content.liasettings.requestgmbaccess",
            "path": "{merchantId}/liasettings/{accountId}/requestgmbaccess",
            "httpMethod": "POST",
            "parameterOrder": ["merchantId", "accountId", "gmbEmail"],
            "parameters": {
              "accountId": { "location": "path", "required": true },
              "gmbEmail": { "location": "query", "required": true },
              "merchantId": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    requestinventoryverification: {
      description: "requestinventoryverification",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
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
        params["merchantId"] = existing["merchantId"]?.toString() ??
          g["merchantId"]?.toString() ?? "";
        params["country"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "content.liasettings.requestinventoryverification",
            "path":
              "{merchantId}/liasettings/{accountId}/requestinventoryverification/{country}",
            "httpMethod": "POST",
            "parameterOrder": ["merchantId", "accountId", "country"],
            "parameters": {
              "accountId": { "location": "path", "required": true },
              "country": { "location": "path", "required": true },
              "merchantId": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    setinventoryverificationcontact: {
      description: "setinventoryverificationcontact",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
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
        params["merchantId"] = existing["merchantId"]?.toString() ??
          g["merchantId"]?.toString() ?? "";
        params["country"] = existing["country"]?.toString() ??
          g["country"]?.toString() ?? "";
        params["language"] = existing["language"]?.toString() ??
          g["language"]?.toString() ?? "";
        params["contactName"] = existing["contactName"]?.toString() ??
          g["contactName"]?.toString() ?? "";
        params["contactEmail"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "content.liasettings.setinventoryverificationcontact",
            "path":
              "{merchantId}/liasettings/{accountId}/setinventoryverificationcontact",
            "httpMethod": "POST",
            "parameterOrder": [
              "merchantId",
              "accountId",
              "country",
              "language",
              "contactName",
              "contactEmail",
            ],
            "parameters": {
              "accountId": { "location": "path", "required": true },
              "contactEmail": { "location": "query", "required": true },
              "contactName": { "location": "query", "required": true },
              "country": { "location": "query", "required": true },
              "language": { "location": "query", "required": true },
              "merchantId": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    setomnichannelexperience: {
      description: "setomnichannelexperience",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
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
        params["merchantId"] = existing["merchantId"]?.toString() ??
          g["merchantId"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "content.liasettings.setomnichannelexperience",
            "path":
              "{merchantId}/liasettings/{accountId}/setomnichannelexperience",
            "httpMethod": "POST",
            "parameterOrder": ["merchantId", "accountId"],
            "parameters": {
              "accountId": { "location": "path", "required": true },
              "country": { "location": "query" },
              "lsfType": { "location": "query" },
              "merchantId": { "location": "path", "required": true },
              "pickupTypes": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    setposdataprovider: {
      description: "setposdataprovider",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
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
        params["merchantId"] = existing["merchantId"]?.toString() ??
          g["merchantId"]?.toString() ?? "";
        params["country"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "content.liasettings.setposdataprovider",
            "path": "{merchantId}/liasettings/{accountId}/setposdataprovider",
            "httpMethod": "POST",
            "parameterOrder": ["merchantId", "accountId", "country"],
            "parameters": {
              "accountId": { "location": "path", "required": true },
              "country": { "location": "query", "required": true },
              "merchantId": { "location": "path", "required": true },
              "posDataProviderId": { "location": "query" },
              "posExternalAccountId": { "location": "query" },
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
