// Auto-generated extension model for @swamp/gcp/manufacturers/accounts-languages-productcertifications
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Manufacturer Center Accounts.Languages.ProductCertifications.
 *
 * Product certification data.
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

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/productCertifications/${shortName}`;
}

const BASE_URL = "https://manufacturers.googleapis.com/";

const GET_CONFIG = {
  "id": "manufacturers.accounts.languages.productCertifications.get",
  "path": "v1/{+name}",
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

const PATCH_CONFIG = {
  "id": "manufacturers.accounts.languages.productCertifications.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "manufacturers.accounts.languages.productCertifications.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
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

const GlobalArgsSchema = z.object({
  brand: z.string().describe(
    "Required. This is the product's brand name. The brand is used to help identify your product.",
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
  })).describe(
    "Required. A list of certifications to link to the described product.",
  ).optional(),
  countryCode: z.array(z.string()).describe(
    "Optional. A 2-letter country code (ISO 3166-1 Alpha 2).",
  ).optional(),
  destinationStatuses: z.array(z.object({
    approvedCountries: z.array(z.string()).describe(
      "Output only. List of country codes (ISO 3166-1 alpha-2) where the offer is approved.",
    ).optional(),
    destination: z.string().describe("The name of the destination.").optional(),
    disapprovedCountries: z.array(z.string()).describe(
      "Output only. List of country codes (ISO 3166-1 alpha-2) where the offer is disapproved.",
    ).optional(),
    pendingCountries: z.array(z.string()).describe(
      "Output only. List of country codes (ISO 3166-1 alpha-2) where the offer is pending approval.",
    ).optional(),
    status: z.enum(["UNKNOWN", "ACTIVE", "PENDING", "DISAPPROVED"]).describe(
      "The status of the destination.",
    ).optional(),
  })).describe("Output only. The statuses of the destinations.").optional(),
  issues: z.array(z.object({
    applicableCountries: z.array(z.string()).describe(
      "Output only. List of country codes (ISO 3166-1 alpha-2) where issue applies to the manufacturer product.",
    ).optional(),
    attribute: z.string().describe(
      "If present, the attribute that triggered the issue. For more information about attributes, see https://support.google.com/manufacturers/answer/6124116.",
    ).optional(),
    description: z.string().describe(
      "Longer description of the issue focused on how to resolve it.",
    ).optional(),
    destination: z.string().describe("The destination this issue applies to.")
      .optional(),
    resolution: z.enum([
      "RESOLUTION_UNSPECIFIED",
      "USER_ACTION",
      "PENDING_PROCESSING",
    ]).describe("What needs to happen to resolve the issue.").optional(),
    severity: z.enum(["SEVERITY_UNSPECIFIED", "ERROR", "WARNING", "INFO"])
      .describe("The severity of the issue.").optional(),
    timestamp: z.string().describe("The timestamp when this issue appeared.")
      .optional(),
    title: z.string().describe(
      "Short title describing the nature of the issue.",
    ).optional(),
    type: z.string().describe(
      "The server-generated type of the issue, for example, “INCORRECT_TEXT_FORMATTING”, “IMAGE_NOT_SERVEABLE”, etc.",
    ).optional(),
  })).describe(
    "Output only. A server-generated list of issues associated with the product.",
  ).optional(),
  mpn: z.array(z.string()).describe(
    "Optional. These are the Manufacturer Part Numbers (MPN). MPNs are used to uniquely identify a specific product among all products from the same manufacturer",
  ).optional(),
  name: z.string().describe(
    "Required. The unique name identifier of a product certification Format: accounts/{account}/languages/{language_code}/productCertifications/{id} Where `id` is a some unique identifier and `language_code` is a 2-letter ISO 639-1 code of a Shopping supported language according to https://support.google.com/merchants/answer/160637.",
  ).optional(),
  productCode: z.array(z.string()).describe("Optional. Another name for GTIN.")
    .optional(),
  productType: z.array(z.string()).describe(
    "Optional. These are your own product categorization system in your product data.",
  ).optional(),
  title: z.string().describe(
    "Required. This is to clearly identify the product you are certifying.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  brand: z.string().optional(),
  certification: z.array(z.object({
    authority: z.string(),
    code: z.string(),
    link: z.string(),
    logo: z.string(),
    name: z.string(),
    validUntil: z.string(),
    value: z.string(),
  })).optional(),
  countryCode: z.array(z.string()).optional(),
  destinationStatuses: z.array(z.object({
    approvedCountries: z.array(z.string()),
    destination: z.string(),
    disapprovedCountries: z.array(z.string()),
    pendingCountries: z.array(z.string()),
    status: z.string(),
  })).optional(),
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
  mpn: z.array(z.string()).optional(),
  name: z.string(),
  productCode: z.array(z.string()).optional(),
  productType: z.array(z.string()).optional(),
  title: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  brand: z.string().describe(
    "Required. This is the product's brand name. The brand is used to help identify your product.",
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
  })).describe(
    "Required. A list of certifications to link to the described product.",
  ).optional(),
  countryCode: z.array(z.string()).describe(
    "Optional. A 2-letter country code (ISO 3166-1 Alpha 2).",
  ).optional(),
  destinationStatuses: z.array(z.object({
    approvedCountries: z.array(z.string()).describe(
      "Output only. List of country codes (ISO 3166-1 alpha-2) where the offer is approved.",
    ).optional(),
    destination: z.string().describe("The name of the destination.").optional(),
    disapprovedCountries: z.array(z.string()).describe(
      "Output only. List of country codes (ISO 3166-1 alpha-2) where the offer is disapproved.",
    ).optional(),
    pendingCountries: z.array(z.string()).describe(
      "Output only. List of country codes (ISO 3166-1 alpha-2) where the offer is pending approval.",
    ).optional(),
    status: z.enum(["UNKNOWN", "ACTIVE", "PENDING", "DISAPPROVED"]).describe(
      "The status of the destination.",
    ).optional(),
  })).describe("Output only. The statuses of the destinations.").optional(),
  issues: z.array(z.object({
    applicableCountries: z.array(z.string()).describe(
      "Output only. List of country codes (ISO 3166-1 alpha-2) where issue applies to the manufacturer product.",
    ).optional(),
    attribute: z.string().describe(
      "If present, the attribute that triggered the issue. For more information about attributes, see https://support.google.com/manufacturers/answer/6124116.",
    ).optional(),
    description: z.string().describe(
      "Longer description of the issue focused on how to resolve it.",
    ).optional(),
    destination: z.string().describe("The destination this issue applies to.")
      .optional(),
    resolution: z.enum([
      "RESOLUTION_UNSPECIFIED",
      "USER_ACTION",
      "PENDING_PROCESSING",
    ]).describe("What needs to happen to resolve the issue.").optional(),
    severity: z.enum(["SEVERITY_UNSPECIFIED", "ERROR", "WARNING", "INFO"])
      .describe("The severity of the issue.").optional(),
    timestamp: z.string().describe("The timestamp when this issue appeared.")
      .optional(),
    title: z.string().describe(
      "Short title describing the nature of the issue.",
    ).optional(),
    type: z.string().describe(
      "The server-generated type of the issue, for example, “INCORRECT_TEXT_FORMATTING”, “IMAGE_NOT_SERVEABLE”, etc.",
    ).optional(),
  })).describe(
    "Output only. A server-generated list of issues associated with the product.",
  ).optional(),
  mpn: z.array(z.string()).describe(
    "Optional. These are the Manufacturer Part Numbers (MPN). MPNs are used to uniquely identify a specific product among all products from the same manufacturer",
  ).optional(),
  name: z.string().describe(
    "Required. The unique name identifier of a product certification Format: accounts/{account}/languages/{language_code}/productCertifications/{id} Where `id` is a some unique identifier and `language_code` is a 2-letter ISO 639-1 code of a Shopping supported language according to https://support.google.com/merchants/answer/160637.",
  ).optional(),
  productCode: z.array(z.string()).describe("Optional. Another name for GTIN.")
    .optional(),
  productType: z.array(z.string()).describe(
    "Optional. These are your own product categorization system in your product data.",
  ).optional(),
  title: z.string().describe(
    "Required. This is to clearly identify the product you are certifying.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Manufacturer Center Accounts.Languages.ProductCertifications. Registered at `@swamp/gcp/manufacturers/accounts-languages-productcertifications`. */
export const model = {
  type: "@swamp/gcp/manufacturers/accounts-languages-productcertifications",
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
      description: "Product certification data.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a productCertifications",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the productCertifications",
        ),
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
      description: "Update productCertifications attributes",
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
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["brand"] !== undefined) body["brand"] = g["brand"];
        if (g["certification"] !== undefined) {
          body["certification"] = g["certification"];
        }
        if (g["countryCode"] !== undefined) {
          body["countryCode"] = g["countryCode"];
        }
        if (g["destinationStatuses"] !== undefined) {
          body["destinationStatuses"] = g["destinationStatuses"];
        }
        if (g["issues"] !== undefined) body["issues"] = g["issues"];
        if (g["mpn"] !== undefined) body["mpn"] = g["mpn"];
        if (g["productCode"] !== undefined) {
          body["productCode"] = g["productCode"];
        }
        if (g["productType"] !== undefined) {
          body["productType"] = g["productType"];
        }
        if (g["title"] !== undefined) body["title"] = g["title"];
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
          PATCH_CONFIG,
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
      description: "Delete the productCertifications",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the productCertifications",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
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
      description: "Sync productCertifications state from GCP",
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
  },
};
