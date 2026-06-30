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

// Auto-generated extension model for @swamp/gcp/webcontentpublisher/publications
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Web Content Publisher Publications.
 *
 * Represents a publisher's publication in Reader Revenue Manager.
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

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/publications/${shortName}`;
}

const BASE_URL = "https://webcontentpublisher.googleapis.com/";

const GET_CONFIG = {
  "id": "webcontentpublisher.organizations.publications.get",
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

const INSERT_CONFIG = {
  "id": "webcontentpublisher.organizations.publications.create",
  "path": "v1/{+parent}/publications",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "publicationId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "webcontentpublisher.organizations.publications.patch",
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

const LIST_CONFIG = {
  "id": "webcontentpublisher.organizations.publications.list",
  "path": "v1/{+parent}/publications",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
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
  additionalDomains: z.array(z.object({
    ownershipVerified: z.boolean().describe(
      "Optional. Whether the domain ownership has been verified (e.g., via Google Search Console).",
    ).optional(),
    url: z.string().describe(
      'Required. The URL of the domain property (e.g., "https://example.com").',
    ).optional(),
  })).describe(
    "Optional. Additional domain properties verified for the publication.",
  ).optional(),
  contentPolicyStatus: z.object({
    policyInfoUrl: z.string().describe(
      "Output only. URL pointing to more details about the policy violation or status.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "OK",
      "VIOLATION_GRACE_PERIOD",
      "VIOLATION_ACTIVE",
      "ORGANIZATION_VIOLATION_GRACE_PERIOD",
      "ORGANIZATION_VIOLATION_ACTIVE",
      "ORGANIZATION_VIOLATION_ACTIVE_IMMEDIATE",
    ]).describe("Output only. The current policy state.").optional(),
  }).describe(
    "The content policy status of the publication, indicating any violations.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The user-visible display name of the publication.",
  ).optional(),
  languageCode: z.string().describe(
    'Required. The primary language of the publication (BCP-47 code, e.g., "en-US").',
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the publication. Format: organizations/{organization}/publications/{publication}",
  ).optional(),
  primaryDomain: z.object({
    ownershipVerified: z.boolean().describe(
      "Optional. Whether the domain ownership has been verified (e.g., via Google Search Console).",
    ).optional(),
    url: z.string().describe(
      'Required. The URL of the domain property (e.g., "https://example.com").',
    ).optional(),
  }).describe(
    "Represents a domain property associated with a publication, typically used to verify ownership and scope access.",
  ).optional(),
  publicationPrivacyPolicyUrl: z.string().describe(
    "Optional. The URL to the publisher's Privacy Policy.",
  ).optional(),
  publicationTosUrl: z.string().describe(
    "Optional. The URL to the publisher's own Terms of Service.",
  ).optional(),
  regionCode: z.string().describe(
    'Required. The ISO 3166-1 alpha-2 region code where the publication is registered (e.g., "US").',
  ).optional(),
  rrmProduct: z.object({
    enabled: z.boolean().describe(
      "Optional. Whether the RRM product is enabled for the publication.",
    ).optional(),
    productTosUrl: z.string().describe(
      "Output only. The URL to the product-specific Terms of Service.",
    ).optional(),
    tosAcceptance: z.object({
      signer: z.string().describe(
        "Optional. The name of the person who accepted the TOS.",
      ).optional(),
      signerTitle: z.string().describe(
        "Optional. The job title or role of the signer.",
      ).optional(),
      userAccepted: z.boolean().describe(
        "Required. Whether the user has accepted the Terms of Service.",
      ).optional(),
    }).describe("Details about the acceptance of the Terms of Service (TOS).")
      .optional(),
  }).describe(
    "Configuration and status of the Reader Revenue Manager (RRM) product for a publication.",
  ).optional(),
  slProduct: z.object({
    enabled: z.boolean().describe(
      "Optional. Whether the Subscription Linking product is enabled.",
    ).optional(),
    gcpProjectNumber: z.string().describe(
      "Optional. The Google Cloud Project number associated with the publication.",
    ).optional(),
  }).describe("Subscription Linking (SL) product settings and status.")
    .optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  additionalDomains: z.array(z.object({
    ownershipVerified: z.boolean(),
    url: z.string(),
  })).optional(),
  contentPolicyStatus: z.object({
    policyInfoUrl: z.string(),
    state: z.string(),
  }).optional(),
  displayName: z.string().optional(),
  languageCode: z.string().optional(),
  name: z.string(),
  onboardingState: z.string().optional(),
  organizationId: z.string().optional(),
  paymentOption: z.string().optional(),
  primaryDomain: z.object({
    ownershipVerified: z.boolean(),
    url: z.string(),
  }).optional(),
  products: z.array(z.string()).optional(),
  publicationId: z.string().optional(),
  publicationPrivacyPolicyUrl: z.string().optional(),
  publicationTosUrl: z.string().optional(),
  regionCode: z.string().optional(),
  rrmProduct: z.object({
    enabled: z.boolean(),
    productTosUrl: z.string(),
    tosAcceptance: z.object({
      signer: z.string(),
      signerTitle: z.string(),
      userAccepted: z.boolean(),
    }),
  }).optional(),
  slProduct: z.object({
    enabled: z.boolean(),
    gcpProjectNumber: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  additionalDomains: z.array(z.object({
    ownershipVerified: z.boolean().describe(
      "Optional. Whether the domain ownership has been verified (e.g., via Google Search Console).",
    ).optional(),
    url: z.string().describe(
      'Required. The URL of the domain property (e.g., "https://example.com").',
    ).optional(),
  })).describe(
    "Optional. Additional domain properties verified for the publication.",
  ).optional(),
  contentPolicyStatus: z.object({
    policyInfoUrl: z.string().describe(
      "Output only. URL pointing to more details about the policy violation or status.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "OK",
      "VIOLATION_GRACE_PERIOD",
      "VIOLATION_ACTIVE",
      "ORGANIZATION_VIOLATION_GRACE_PERIOD",
      "ORGANIZATION_VIOLATION_ACTIVE",
      "ORGANIZATION_VIOLATION_ACTIVE_IMMEDIATE",
    ]).describe("Output only. The current policy state.").optional(),
  }).describe(
    "The content policy status of the publication, indicating any violations.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The user-visible display name of the publication.",
  ).optional(),
  languageCode: z.string().describe(
    'Required. The primary language of the publication (BCP-47 code, e.g., "en-US").',
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the publication. Format: organizations/{organization}/publications/{publication}",
  ).optional(),
  primaryDomain: z.object({
    ownershipVerified: z.boolean().describe(
      "Optional. Whether the domain ownership has been verified (e.g., via Google Search Console).",
    ).optional(),
    url: z.string().describe(
      'Required. The URL of the domain property (e.g., "https://example.com").',
    ).optional(),
  }).describe(
    "Represents a domain property associated with a publication, typically used to verify ownership and scope access.",
  ).optional(),
  publicationPrivacyPolicyUrl: z.string().describe(
    "Optional. The URL to the publisher's Privacy Policy.",
  ).optional(),
  publicationTosUrl: z.string().describe(
    "Optional. The URL to the publisher's own Terms of Service.",
  ).optional(),
  regionCode: z.string().describe(
    'Required. The ISO 3166-1 alpha-2 region code where the publication is registered (e.g., "US").',
  ).optional(),
  rrmProduct: z.object({
    enabled: z.boolean().describe(
      "Optional. Whether the RRM product is enabled for the publication.",
    ).optional(),
    productTosUrl: z.string().describe(
      "Output only. The URL to the product-specific Terms of Service.",
    ).optional(),
    tosAcceptance: z.object({
      signer: z.string().describe(
        "Optional. The name of the person who accepted the TOS.",
      ).optional(),
      signerTitle: z.string().describe(
        "Optional. The job title or role of the signer.",
      ).optional(),
      userAccepted: z.boolean().describe(
        "Required. Whether the user has accepted the Terms of Service.",
      ).optional(),
    }).describe("Details about the acceptance of the Terms of Service (TOS).")
      .optional(),
  }).describe(
    "Configuration and status of the Reader Revenue Manager (RRM) product for a publication.",
  ).optional(),
  slProduct: z.object({
    enabled: z.boolean().describe(
      "Optional. Whether the Subscription Linking product is enabled.",
    ).optional(),
    gcpProjectNumber: z.string().describe(
      "Optional. The Google Cloud Project number associated with the publication.",
    ).optional(),
  }).describe("Subscription Linking (SL) product settings and status.")
    .optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
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

/** Swamp extension model for Google Cloud Web Content Publisher Publications. Registered at `@swamp/gcp/webcontentpublisher/publications`. */
export const model = {
  type: "@swamp/gcp/webcontentpublisher/publications",
  version: "2026.06.30.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents a publisher's publication in Reader Revenue Manager.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a publications",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["additionalDomains"] !== undefined) {
          body["additionalDomains"] = g["additionalDomains"];
        }
        if (g["contentPolicyStatus"] !== undefined) {
          body["contentPolicyStatus"] = g["contentPolicyStatus"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["languageCode"] !== undefined) {
          body["languageCode"] = g["languageCode"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["primaryDomain"] !== undefined) {
          body["primaryDomain"] = g["primaryDomain"];
        }
        if (g["publicationPrivacyPolicyUrl"] !== undefined) {
          body["publicationPrivacyPolicyUrl"] =
            g["publicationPrivacyPolicyUrl"];
        }
        if (g["publicationTosUrl"] !== undefined) {
          body["publicationTosUrl"] = g["publicationTosUrl"];
        }
        if (g["regionCode"] !== undefined) body["regionCode"] = g["regionCode"];
        if (g["rrmProduct"] !== undefined) body["rrmProduct"] = g["rrmProduct"];
        if (g["slProduct"] !== undefined) body["slProduct"] = g["slProduct"];
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
            },
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
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
      description: "Get a publications",
      arguments: z.object({
        identifier: z.string().describe("The name of the publications"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
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
      description: "Update publications attributes",
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
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["additionalDomains"] !== undefined) {
          body["additionalDomains"] = g["additionalDomains"];
        }
        if (g["contentPolicyStatus"] !== undefined) {
          body["contentPolicyStatus"] = g["contentPolicyStatus"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["languageCode"] !== undefined) {
          body["languageCode"] = g["languageCode"];
        }
        if (g["primaryDomain"] !== undefined) {
          body["primaryDomain"] = g["primaryDomain"];
        }
        if (g["publicationPrivacyPolicyUrl"] !== undefined) {
          body["publicationPrivacyPolicyUrl"] =
            g["publicationPrivacyPolicyUrl"];
        }
        if (g["publicationTosUrl"] !== undefined) {
          body["publicationTosUrl"] = g["publicationTosUrl"];
        }
        if (g["regionCode"] !== undefined) body["regionCode"] = g["regionCode"];
        if (g["rrmProduct"] !== undefined) body["rrmProduct"] = g["rrmProduct"];
        if (g["slProduct"] !== undefined) body["slProduct"] = g["slProduct"];
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
      description: "Sync publications state from GCP",
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
      description: "List publications resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. A filter expression to filter the publications returned.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The maximum number of publications to return. The service may return fewer than this value. If unspecified, at most 50 publications will be returned.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "publications",
          (args.maxPages as number | undefined) ?? 10,
          credentials,
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i] as StateData;
          const instanceName = (item.name?.toString() ?? String(i)).replace(
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
