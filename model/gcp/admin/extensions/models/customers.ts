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

// Auto-generated extension model for @swamp/gcp/admin/customers
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Admin SDK Customers.
 *
 * Retrieves a customer.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://admin.googleapis.com/";

const GET_CONFIG = {
  "id": "directory.customers.get",
  "path": "admin/directory/v1/customers/{customerKey}",
  "httpMethod": "GET",
  "parameterOrder": [
    "customerKey",
  ],
  "parameters": {
    "customerKey": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "directory.customers.update",
  "path": "admin/directory/v1/customers/{customerKey}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "customerKey",
  ],
  "parameters": {
    "customerKey": {
      "location": "path",
      "required": true,
    },
  },
} as const;

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
  alternateEmail: z.string().describe(
    "The customer's secondary contact email address. This email address cannot be on the same domain as the `customerDomain`",
  ).optional(),
  customerCreationTime: z.string().describe(
    "The customer's creation time (Readonly)",
  ).optional(),
  customerDomain: z.string().describe(
    "The customer's primary domain name string. Do not include the `www` prefix when creating a new customer.",
  ).optional(),
  etag: z.string().describe("ETag of the resource.").optional(),
  id: z.string().describe(
    "The unique ID for the customer's Google Workspace account. (Readonly)",
  ).optional(),
  kind: z.string().describe(
    "Identifies the resource as a customer. Value: `admin#directory#customer`",
  ).optional(),
  language: z.string().describe(
    "The customer's ISO 639-2 language code. See the [Language Codes](https://developers.google.com/workspace/admin/directory/v1/languages) page for the list of supported codes. Valid language codes outside the supported set will be accepted by the API but may lead to unexpected behavior. The default value is `en`.",
  ).optional(),
  phoneNumber: z.string().describe(
    "The customer's contact phone number in [E.164](https://en.wikipedia.org/wiki/E.164) format.",
  ).optional(),
  postalAddress: z.object({
    addressLine1: z.string().describe(
      "A customer's physical address. The address can be composed of one to three lines.",
    ).optional(),
    addressLine2: z.string().describe("Address line 2 of the address.")
      .optional(),
    addressLine3: z.string().describe("Address line 3 of the address.")
      .optional(),
    contactName: z.string().describe("The customer contact's name.").optional(),
    countryCode: z.string().describe(
      "This is a required property. For `countryCode` information see the [ISO 3166 country code elements](https://www.iso.org/iso/country_codes.htm).",
    ).optional(),
    locality: z.string().describe(
      "Name of the locality. An example of a locality value is the city of `San Francisco`.",
    ).optional(),
    organizationName: z.string().describe(
      "The company or company division name.",
    ).optional(),
    postalCode: z.string().describe(
      "The postal code. A postalCode example is a postal zip code such as `10009`. This is in accordance with - http: //portablecontacts.net/draft-spec.html#address_element.",
    ).optional(),
    region: z.string().describe(
      "Name of the region. An example of a region value is `NY` for the state of New York.",
    ).optional(),
  }).optional(),
});

const StateSchema = z.object({
  alternateEmail: z.string().optional(),
  customerCreationTime: z.string().optional(),
  customerDomain: z.string().optional(),
  etag: z.string().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  language: z.string().optional(),
  phoneNumber: z.string().optional(),
  postalAddress: z.object({
    addressLine1: z.string(),
    addressLine2: z.string(),
    addressLine3: z.string(),
    contactName: z.string(),
    countryCode: z.string(),
    locality: z.string(),
    organizationName: z.string(),
    postalCode: z.string(),
    region: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  alternateEmail: z.string().describe(
    "The customer's secondary contact email address. This email address cannot be on the same domain as the `customerDomain`",
  ).optional(),
  customerCreationTime: z.string().describe(
    "The customer's creation time (Readonly)",
  ).optional(),
  customerDomain: z.string().describe(
    "The customer's primary domain name string. Do not include the `www` prefix when creating a new customer.",
  ).optional(),
  etag: z.string().describe("ETag of the resource.").optional(),
  id: z.string().describe(
    "The unique ID for the customer's Google Workspace account. (Readonly)",
  ).optional(),
  kind: z.string().describe(
    "Identifies the resource as a customer. Value: `admin#directory#customer`",
  ).optional(),
  language: z.string().describe(
    "The customer's ISO 639-2 language code. See the [Language Codes](https://developers.google.com/workspace/admin/directory/v1/languages) page for the list of supported codes. Valid language codes outside the supported set will be accepted by the API but may lead to unexpected behavior. The default value is `en`.",
  ).optional(),
  phoneNumber: z.string().describe(
    "The customer's contact phone number in [E.164](https://en.wikipedia.org/wiki/E.164) format.",
  ).optional(),
  postalAddress: z.object({
    addressLine1: z.string().describe(
      "A customer's physical address. The address can be composed of one to three lines.",
    ).optional(),
    addressLine2: z.string().describe("Address line 2 of the address.")
      .optional(),
    addressLine3: z.string().describe("Address line 3 of the address.")
      .optional(),
    contactName: z.string().describe("The customer contact's name.").optional(),
    countryCode: z.string().describe(
      "This is a required property. For `countryCode` information see the [ISO 3166 country code elements](https://www.iso.org/iso/country_codes.htm).",
    ).optional(),
    locality: z.string().describe(
      "Name of the locality. An example of a locality value is the city of `San Francisco`.",
    ).optional(),
    organizationName: z.string().describe(
      "The company or company division name.",
    ).optional(),
    postalCode: z.string().describe(
      "The postal code. A postalCode example is a postal zip code such as `10009`. This is in accordance with - http: //portablecontacts.net/draft-spec.html#address_element.",
    ).optional(),
    region: z.string().describe(
      "Name of the region. An example of a region value is `NY` for the state of New York.",
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

/** Swamp extension model for Google Cloud Admin SDK Customers. Registered at `@swamp/gcp/admin/customers`. */
export const model = {
  type: "@swamp/gcp/admin/customers",
  version: "2026.06.08.1",
  upgrades: [
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Retrieves a customer.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a customers",
      arguments: z.object({
        identifier: z.string().describe("The name of the customers"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["customerKey"] = args.identifier;
        const result = await readResource(
          BASE_URL,
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
        params["customerKey"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["alternateEmail"] !== undefined) {
          body["alternateEmail"] = g["alternateEmail"];
        }
        if (g["customerCreationTime"] !== undefined) {
          body["customerCreationTime"] = g["customerCreationTime"];
        }
        if (g["customerDomain"] !== undefined) {
          body["customerDomain"] = g["customerDomain"];
        }
        if (g["etag"] !== undefined) body["etag"] = g["etag"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["kind"] !== undefined) body["kind"] = g["kind"];
        if (g["language"] !== undefined) body["language"] = g["language"];
        if (g["phoneNumber"] !== undefined) {
          body["phoneNumber"] = g["phoneNumber"];
        }
        if (g["postalAddress"] !== undefined) {
          body["postalAddress"] = g["postalAddress"];
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
      description: "Sync customers state from GCP",
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
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["customerKey"] = identifier;
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
  },
};
