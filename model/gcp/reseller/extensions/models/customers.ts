// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/gcp/reseller/customers
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Workspace Reseller Customers.
 *
 * When a Google customer's account is registered with a reseller, the customer's subscriptions for Google services are managed by this reseller. A customer is described by a primary domain name and a physical address.
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
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://reseller.googleapis.com/";

const GET_CONFIG = {
  "id": "reseller.customers.get",
  "path": "apps/reseller/v1/customers/{customerId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "customerId",
  ],
  "parameters": {
    "customerId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "reseller.customers.insert",
  "path": "apps/reseller/v1/customers",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {
    "customerAuthToken": {
      "location": "query",
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "reseller.customers.update",
  "path": "apps/reseller/v1/customers/{customerId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "customerId",
  ],
  "parameters": {
    "customerId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const _defaultOAuthScopes: string[] = [
  "https://www.googleapis.com/auth/apps.order",
  "https://www.googleapis.com/auth/apps.order.readonly",
];

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  scopes: z.string().describe(
    "Comma-separated OAuth scopes to request when minting access tokens via gcloud. Defaults to the API's Discovery Document scopes.",
  ).optional(),
  quotaProject: z.string().describe(
    "GCP project ID for quota and billing attribution; sets the x-goog-user-project header. Overrides GOOGLE_CLOUD_QUOTA_PROJECT environment variable. Required for APIs like Cloud Identity when using user credentials.",
  ).optional(),
  apiEndpoint: z.string().describe(
    "Custom API endpoint for emulators; overrides GCP_API_ENDPOINT environment variable. Defaults to the service's production URL.",
  ).optional(),
  alternateEmail: z.string().describe(
    'Like the "Customer email" in the reseller tools, this email is the secondary contact used if something happens to the customer\'s service such as service outage or a security issue. This property is required when creating a new "domain" customer and should not use the same domain as `customerDomain`. The `alternateEmail` field is not necessary to create a "team" customer.',
  ).optional(),
  customerDomain: z.string().describe(
    "The customer's primary domain name string. `customerDomain` is required when creating a new customer. Do not include the `www` prefix in the domain when adding a customer.",
  ).optional(),
  customerDomainVerified: z.boolean().describe(
    "Whether the customer's primary domain has been verified.",
  ).optional(),
  customerId: z.string().describe(
    "This property will always be returned in a response as the unique identifier generated by Google. In a request, this property can be either the primary domain or the unique identifier generated by Google.",
  ).optional(),
  customerType: z.enum(["customerTypeUnspecified", "domain", "team"]).describe(
    "Identifies the type of the customer. Acceptable values include: * `domain`: Implies a domain-verified customer (default). * `team`: Implies an email-verified customer. For more information, see [managed teams](https://support.google.com/a/users/answer/9939479).",
  ).optional(),
  phoneNumber: z.string().describe(
    'Customer contact phone number. Must start with "+" followed by the country code. The rest of the number can be contiguous numbers or respect the phone local format conventions, but it must be a real phone number and not, for example, "123". This field is silently ignored if invalid.',
  ).optional(),
  postalAddress: z.object({
    addressLine1: z.string().describe(
      "A customer's physical address. An address can be composed of one to three lines. The `addressline2` and `addressLine3` are optional.",
    ).optional(),
    addressLine2: z.string().describe("Line 2 of the address.").optional(),
    addressLine3: z.string().describe("Line 3 of the address.").optional(),
    contactName: z.string().describe(
      "The customer contact's name. This is required.",
    ).optional(),
    countryCode: z.string().describe(
      "For `countryCode` information, see the ISO 3166 country code elements. Verify that country is approved for resale of Google products. This property is required when creating a new customer.",
    ).optional(),
    kind: z.string().describe(
      "Identifies the resource as a customer address. Value: `customers#address`",
    ).optional(),
    locality: z.string().describe(
      "An example of a `locality` value is the city of `San Francisco`.",
    ).optional(),
    organizationName: z.string().describe(
      "The company or company division name. This is required.",
    ).optional(),
    postalCode: z.string().describe(
      "A `postalCode` example is a postal zip code such as `94043`. This property is required when creating a new customer.",
    ).optional(),
    region: z.string().describe(
      "An example of a `region` value is `CA` for the state of California.",
    ).optional(),
  }).describe(
    "A customer's address information. Each field has a limit of 255 charcters.",
  ).optional(),
  primaryAdmin: z.object({
    primaryEmail: z.string().describe(
      "The business email of the primary administrator of the customer. The email verification link is sent to this email address at the time of customer creation. Primary administrators have access to the customer's Admin Console, including the ability to invite and evict users and manage the administrative needs of the customer.",
    ).optional(),
  }).describe(
    "The first admin details of the customer, present in case of TEAM customer.",
  ).optional(),
  resourceUiUrl: z.string().describe(
    "URL to customer's Admin console dashboard. The read-only URL is generated by the API service. This is used if your client application requires the customer to complete a task in the Admin console.",
  ).optional(),
  customerAuthToken: z.string().describe(
    "The `customerAuthToken` query string is required when creating a resold account that transfers a direct customer's subscription or transfers another reseller customer's subscription to your reseller management. This is a hexadecimal authentication token needed to complete the subscription transfer. For more information, see the administrator help center.",
  ).optional(),
});

const StateSchema = z.object({
  alternateEmail: z.string().optional(),
  customerDomain: z.string().optional(),
  customerDomainVerified: z.boolean().optional(),
  customerId: z.string().optional(),
  customerType: z.string().optional(),
  kind: z.string().optional(),
  phoneNumber: z.string().optional(),
  postalAddress: z.object({
    addressLine1: z.string(),
    addressLine2: z.string(),
    addressLine3: z.string(),
    contactName: z.string(),
    countryCode: z.string(),
    kind: z.string(),
    locality: z.string(),
    organizationName: z.string(),
    postalCode: z.string(),
    region: z.string(),
  }).optional(),
  primaryAdmin: z.object({
    primaryEmail: z.string(),
  }).optional(),
  resourceUiUrl: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  alternateEmail: z.string().describe(
    'Like the "Customer email" in the reseller tools, this email is the secondary contact used if something happens to the customer\'s service such as service outage or a security issue. This property is required when creating a new "domain" customer and should not use the same domain as `customerDomain`. The `alternateEmail` field is not necessary to create a "team" customer.',
  ).optional(),
  customerDomain: z.string().describe(
    "The customer's primary domain name string. `customerDomain` is required when creating a new customer. Do not include the `www` prefix in the domain when adding a customer.",
  ).optional(),
  customerDomainVerified: z.boolean().describe(
    "Whether the customer's primary domain has been verified.",
  ).optional(),
  customerId: z.string().describe(
    "This property will always be returned in a response as the unique identifier generated by Google. In a request, this property can be either the primary domain or the unique identifier generated by Google.",
  ).optional(),
  customerType: z.enum(["customerTypeUnspecified", "domain", "team"]).describe(
    "Identifies the type of the customer. Acceptable values include: * `domain`: Implies a domain-verified customer (default). * `team`: Implies an email-verified customer. For more information, see [managed teams](https://support.google.com/a/users/answer/9939479).",
  ).optional(),
  phoneNumber: z.string().describe(
    'Customer contact phone number. Must start with "+" followed by the country code. The rest of the number can be contiguous numbers or respect the phone local format conventions, but it must be a real phone number and not, for example, "123". This field is silently ignored if invalid.',
  ).optional(),
  postalAddress: z.object({
    addressLine1: z.string().describe(
      "A customer's physical address. An address can be composed of one to three lines. The `addressline2` and `addressLine3` are optional.",
    ).optional(),
    addressLine2: z.string().describe("Line 2 of the address.").optional(),
    addressLine3: z.string().describe("Line 3 of the address.").optional(),
    contactName: z.string().describe(
      "The customer contact's name. This is required.",
    ).optional(),
    countryCode: z.string().describe(
      "For `countryCode` information, see the ISO 3166 country code elements. Verify that country is approved for resale of Google products. This property is required when creating a new customer.",
    ).optional(),
    kind: z.string().describe(
      "Identifies the resource as a customer address. Value: `customers#address`",
    ).optional(),
    locality: z.string().describe(
      "An example of a `locality` value is the city of `San Francisco`.",
    ).optional(),
    organizationName: z.string().describe(
      "The company or company division name. This is required.",
    ).optional(),
    postalCode: z.string().describe(
      "A `postalCode` example is a postal zip code such as `94043`. This property is required when creating a new customer.",
    ).optional(),
    region: z.string().describe(
      "An example of a `region` value is `CA` for the state of California.",
    ).optional(),
  }).describe(
    "A customer's address information. Each field has a limit of 255 charcters.",
  ).optional(),
  primaryAdmin: z.object({
    primaryEmail: z.string().describe(
      "The business email of the primary administrator of the customer. The email verification link is sent to this email address at the time of customer creation. Primary administrators have access to the customer's Admin Console, including the ability to invite and evict users and manage the administrative needs of the customer.",
    ).optional(),
  }).describe(
    "The first admin details of the customer, present in case of TEAM customer.",
  ).optional(),
  resourceUiUrl: z.string().describe(
    "URL to customer's Admin console dashboard. The read-only URL is generated by the API service. This is used if your client application requires the customer to complete a task in the Admin console.",
  ).optional(),
  customerAuthToken: z.string().describe(
    "The `customerAuthToken` query string is required when creating a resold account that transfers a direct customer's subscription or transfers another reseller customer's subscription to your reseller management. This is a hexadecimal authentication token needed to complete the subscription transfer. For more information, see the administrator help center.",
  ).optional(),
});

const _credentialKeys = new Set([
  "accessToken",
  "credentialsJson",
  "project",
  "scopes",
  "quotaProject",
  "apiEndpoint",
]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
    scopes: typeof g.scopes === "string"
      ? g.scopes.split(",").map((s: string) => s.trim())
      : _defaultOAuthScopes,
    quotaProject: g.quotaProject as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Google Workspace Reseller Customers. Registered at `@swamp/gcp/reseller/customers`. */
export const model = {
  type: "@swamp/gcp/reseller/customers",
  version: "2026.09.29.1",
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
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.17.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.1",
      description: "Added: scopes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.20.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.12.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "When a Google customer's account is registered with a reseller, the customer'...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a customers",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["alternateEmail"] !== undefined) {
          body["alternateEmail"] = g["alternateEmail"];
        }
        if (g["customerDomain"] !== undefined) {
          body["customerDomain"] = g["customerDomain"];
        }
        if (g["customerDomainVerified"] !== undefined) {
          body["customerDomainVerified"] = g["customerDomainVerified"];
        }
        if (g["customerId"] !== undefined) body["customerId"] = g["customerId"];
        if (g["customerType"] !== undefined) {
          body["customerType"] = g["customerType"];
        }
        if (g["phoneNumber"] !== undefined) {
          body["phoneNumber"] = g["phoneNumber"];
        }
        if (g["postalAddress"] !== undefined) {
          body["postalAddress"] = g["postalAddress"];
        }
        if (g["primaryAdmin"] !== undefined) {
          body["primaryAdmin"] = g["primaryAdmin"];
        }
        if (g["resourceUiUrl"] !== undefined) {
          body["resourceUiUrl"] = g["resourceUiUrl"];
        }
        if (g["customerAuthToken"] !== undefined) {
          params["customerAuthToken"] = String(g["customerAuthToken"]);
        }
        if (g["name"] !== undefined) params["customerId"] = String(g["name"]);
        const result = await createResource(
          baseUrl,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          undefined,
          credentials,
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
      description: "Get a customers",
      arguments: z.object({
        identifier: z.string().describe("The name of the customers"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["customerId"] = args.identifier;
        const result = await readResource(
          baseUrl,
          GET_CONFIG,
          params,
          credentials,
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
      description: "Update customers attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific customers by name (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error(
            "No existing state found - run create, get, or list first",
          );
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const params: Record<string, string> = { project: projectId };
        params["customerId"] = existing["customerId"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["alternateEmail"] !== undefined) {
          body["alternateEmail"] = g["alternateEmail"];
        }
        if (g["customerDomain"] !== undefined) {
          body["customerDomain"] = g["customerDomain"];
        }
        if (g["customerDomainVerified"] !== undefined) {
          body["customerDomainVerified"] = g["customerDomainVerified"];
        }
        if (g["customerType"] !== undefined) {
          body["customerType"] = g["customerType"];
        }
        if (g["phoneNumber"] !== undefined) {
          body["phoneNumber"] = g["phoneNumber"];
        }
        if (g["postalAddress"] !== undefined) {
          body["postalAddress"] = g["postalAddress"];
        }
        if (g["primaryAdmin"] !== undefined) {
          body["primaryAdmin"] = g["primaryAdmin"];
        }
        if (g["resourceUiUrl"] !== undefined) {
          body["resourceUiUrl"] = g["resourceUiUrl"];
        }
        let live: Record<string, unknown> | undefined;
        const unset = [
          "alternateEmail",
          "customerDomain",
          "customerDomainVerified",
          "customerType",
          "phoneNumber",
          "postalAddress",
          "primaryAdmin",
        ].filter((k) => body[k] === undefined);
        if (unset.length > 0) {
          live = await readResource(
            baseUrl,
            GET_CONFIG,
            params,
            credentials,
          ) as Record<string, unknown>;
          for (const k of unset) {
            if (live[k] !== undefined && live[k] !== null) body[k] = live[k];
          }
        }
        const concurrency: Record<string, unknown> = live ?? existing;
        for (const key of Object.keys(concurrency)) {
          if (
            key === "fingerprint" || key === "labelFingerprint" ||
            key === "etag" || key.endsWith("Fingerprint")
          ) {
            body[key] = concurrency[key];
          }
        }
        const result = await updateResource(
          baseUrl,
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
      description: "Sync customers state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific customers by name (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error(
            "No existing state found - run create, get, or list first",
          );
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
          params["customerId"] = identifier;
          const result = await readResource(
            baseUrl,
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
  },
};
