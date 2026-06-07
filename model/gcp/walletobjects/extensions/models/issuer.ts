// Auto-generated extension model for @swamp/gcp/walletobjects/issuer
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Wallet Issuer.
 *
 * Returns the issuer with the given issuer ID.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://walletobjects.googleapis.com/";

const GET_CONFIG = {
  "id": "walletobjects.issuer.get",
  "path": "walletobjects/v1/issuer/{resourceId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "resourceId",
  ],
  "parameters": {
    "resourceId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "walletobjects.issuer.insert",
  "path": "walletobjects/v1/issuer",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {},
} as const;

const UPDATE_CONFIG = {
  "id": "walletobjects.issuer.update",
  "path": "walletobjects/v1/issuer/{resourceId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "resourceId",
  ],
  "parameters": {
    "resourceId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "walletobjects.issuer.list",
  "path": "walletobjects/v1/issuer",
  "httpMethod": "GET",
  "parameterOrder": [],
  "parameters": {},
} as const;

const GlobalArgsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  callbackOptions: z.object({
    updateRequestUrl: z.string().describe(
      "URL for the merchant endpoint that would be called to request updates. The URL should be hosted on HTTPS and robots.txt should allow the URL path to be accessible by UserAgent:Googlebot. Deprecated.",
    ).optional(),
    url: z.string().describe(
      "The HTTPS url configured by the merchant. The URL should be hosted on HTTPS and robots.txt should allow the URL path to be accessible by UserAgent:Googlebot.",
    ).optional(),
  }).optional(),
  contactInfo: z.object({
    alertsEmails: z.array(z.string()).describe(
      "Email addresses which will receive alerts.",
    ).optional(),
    email: z.string().describe("The primary contact email address.").optional(),
    name: z.string().describe("The primary contact name.").optional(),
    phone: z.string().describe("The primary contact phone number.").optional(),
  }).optional(),
  homepageUrl: z.string().describe("URL for the issuer's home page.")
    .optional(),
  issuerId: z.string().describe(
    "The unique identifier for an issuer account. This is automatically generated when the issuer is inserted.",
  ).optional(),
  name: z.string().describe("The account name of the issuer.").optional(),
  smartTapMerchantData: z.object({
    authenticationKeys: z.array(z.object({
      id: z.number().int().describe(
        "Available only to Smart Tap enabled partners. Contact support for additional guidance.",
      ).optional(),
      publicKeyPem: z.string().describe(
        "Available only to Smart Tap enabled partners. Contact support for additional guidance.",
      ).optional(),
    })).describe(
      "Available only to Smart Tap enabled partners. Contact support for additional guidance.",
    ).optional(),
    smartTapMerchantId: z.string().describe(
      "Available only to Smart Tap enabled partners. Contact support for additional guidance.",
    ).optional(),
  }).optional(),
});

const StateSchema = z.object({
  callbackOptions: z.object({
    updateRequestUrl: z.string(),
    url: z.string(),
  }).optional(),
  contactInfo: z.object({
    alertsEmails: z.array(z.string()),
    email: z.string(),
    name: z.string(),
    phone: z.string(),
  }).optional(),
  homepageUrl: z.string().optional(),
  issuerId: z.string().optional(),
  name: z.string().optional(),
  smartTapMerchantData: z.object({
    authenticationKeys: z.array(z.object({
      id: z.number(),
      publicKeyPem: z.string(),
    })),
    smartTapMerchantId: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  callbackOptions: z.object({
    updateRequestUrl: z.string().describe(
      "URL for the merchant endpoint that would be called to request updates. The URL should be hosted on HTTPS and robots.txt should allow the URL path to be accessible by UserAgent:Googlebot. Deprecated.",
    ).optional(),
    url: z.string().describe(
      "The HTTPS url configured by the merchant. The URL should be hosted on HTTPS and robots.txt should allow the URL path to be accessible by UserAgent:Googlebot.",
    ).optional(),
  }).optional(),
  contactInfo: z.object({
    alertsEmails: z.array(z.string()).describe(
      "Email addresses which will receive alerts.",
    ).optional(),
    email: z.string().describe("The primary contact email address.").optional(),
    name: z.string().describe("The primary contact name.").optional(),
    phone: z.string().describe("The primary contact phone number.").optional(),
  }).optional(),
  homepageUrl: z.string().describe("URL for the issuer's home page.")
    .optional(),
  issuerId: z.string().describe(
    "The unique identifier for an issuer account. This is automatically generated when the issuer is inserted.",
  ).optional(),
  name: z.string().describe("The account name of the issuer.").optional(),
  smartTapMerchantData: z.object({
    authenticationKeys: z.array(z.object({
      id: z.number().int().describe(
        "Available only to Smart Tap enabled partners. Contact support for additional guidance.",
      ).optional(),
      publicKeyPem: z.string().describe(
        "Available only to Smart Tap enabled partners. Contact support for additional guidance.",
      ).optional(),
    })).describe(
      "Available only to Smart Tap enabled partners. Contact support for additional guidance.",
    ).optional(),
    smartTapMerchantId: z.string().describe(
      "Available only to Smart Tap enabled partners. Contact support for additional guidance.",
    ).optional(),
  }).optional(),
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

/** Swamp extension model for Google Cloud Google Wallet Issuer. Registered at `@swamp/gcp/walletobjects/issuer`. */
export const model = {
  type: "@swamp/gcp/walletobjects/issuer",
  version: "2026.06.07.1",
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
      toVersion: "2026.05.25.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Returns the issuer with the given issuer ID.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a issuer",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["callbackOptions"] !== undefined) {
          body["callbackOptions"] = g["callbackOptions"];
        }
        if (g["contactInfo"] !== undefined) {
          body["contactInfo"] = g["contactInfo"];
        }
        if (g["homepageUrl"] !== undefined) {
          body["homepageUrl"] = g["homepageUrl"];
        }
        if (g["issuerId"] !== undefined) body["issuerId"] = g["issuerId"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["smartTapMerchantData"] !== undefined) {
          body["smartTapMerchantData"] = g["smartTapMerchantData"];
        }
        if (g["id"] !== undefined) params["resourceId"] = String(g["id"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {},
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
          credentials,
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
      description: "Get a issuer",
      arguments: z.object({
        identifier: z.string().describe("The id of the issuer"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["resourceId"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
          credentials,
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
      description: "Update issuer attributes",
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
        const params: Record<string, string> = { project: projectId };
        params["resourceId"] = existing["id"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["callbackOptions"] !== undefined) {
          body["callbackOptions"] = g["callbackOptions"];
        }
        if (g["contactInfo"] !== undefined) {
          body["contactInfo"] = g["contactInfo"];
        }
        if (g["homepageUrl"] !== undefined) {
          body["homepageUrl"] = g["homepageUrl"];
        }
        if (g["issuerId"] !== undefined) body["issuerId"] = g["issuerId"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["smartTapMerchantData"] !== undefined) {
          body["smartTapMerchantData"] = g["smartTapMerchantData"];
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
          undefined,
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
    sync: {
      description: "Sync issuer state from GCP",
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
          const identifier = existing.id?.toString() ?? g["id"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["resourceId"] = identifier;
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
      description: "List issuer resources",
      arguments: z.object({
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "resources",
          (args.maxPages as number | undefined) ?? 10,
          credentials,
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i] as StateData;
          const instanceName = (item.id?.toString() ?? String(i)).replace(
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
