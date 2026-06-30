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

// Auto-generated extension model for @swamp/gcp/webcontentpublisher/publications-ctas
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Web Content Publisher Publications.Ctas.
 *
 * Represents a Call-To-Action (CTA) configuration for a publication.
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
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/ctas/${shortName}`;
}

const BASE_URL = "https://webcontentpublisher.googleapis.com/";

const GET_CONFIG = {
  "id": "webcontentpublisher.organizations.publications.ctas.get",
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
  "id": "webcontentpublisher.organizations.publications.ctas.create",
  "path": "v1/{+parent}/ctas",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "ctaId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "webcontentpublisher.organizations.publications.ctas.list",
  "path": "v1/{+parent}/ctas",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
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
  displayName: z.string().describe(
    "Required. The user-visible display name of the CTA.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the Cta. Format: organizations/{organization}/publications/{publication}/ctas/{cta}",
  ).optional(),
  newsletterConfig: z.object({
    customConsentText: z.string().describe(
      "Optional. Custom consent or disclosure text shown to the user.",
    ).optional(),
    customMessage: z.string().describe(
      "Optional. A custom message displayed to the user in the signup prompt.",
    ).optional(),
    nameRequired: z.boolean().describe(
      "Optional. Whether the user is required to provide their name to sign up.",
    ).optional(),
    title: z.string().describe(
      "Required. The title of the newsletter signup prompt.",
    ).optional(),
  }).describe("Configuration for newsletter signup calls-to-action (CTAs).")
    .optional(),
  type: z.enum(["TYPE_UNSPECIFIED", "NEWSLETTER_SIGNUP"]).describe(
    "Required. The type of this CTA.",
  ).optional(),
  ctaId: z.string().describe(
    "Optional. The unique identifier of the CTA to create. If not specified, the server will generate a random CTA ID.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  displayName: z.string().optional(),
  name: z.string(),
  newsletterConfig: z.object({
    customConsentText: z.string(),
    customMessage: z.string(),
    nameRequired: z.boolean(),
    title: z.string(),
  }).optional(),
  state: z.string().optional(),
  type: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  displayName: z.string().describe(
    "Required. The user-visible display name of the CTA.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the Cta. Format: organizations/{organization}/publications/{publication}/ctas/{cta}",
  ).optional(),
  newsletterConfig: z.object({
    customConsentText: z.string().describe(
      "Optional. Custom consent or disclosure text shown to the user.",
    ).optional(),
    customMessage: z.string().describe(
      "Optional. A custom message displayed to the user in the signup prompt.",
    ).optional(),
    nameRequired: z.boolean().describe(
      "Optional. Whether the user is required to provide their name to sign up.",
    ).optional(),
    title: z.string().describe(
      "Required. The title of the newsletter signup prompt.",
    ).optional(),
  }).describe("Configuration for newsletter signup calls-to-action (CTAs).")
    .optional(),
  type: z.enum(["TYPE_UNSPECIFIED", "NEWSLETTER_SIGNUP"]).describe(
    "Required. The type of this CTA.",
  ).optional(),
  ctaId: z.string().describe(
    "Optional. The unique identifier of the CTA to create. If not specified, the server will generate a random CTA ID.",
  ).optional(),
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

/** Swamp extension model for Google Cloud Web Content Publisher Publications.Ctas. Registered at `@swamp/gcp/webcontentpublisher/publications-ctas`. */
export const model = {
  type: "@swamp/gcp/webcontentpublisher/publications-ctas",
  version: "2026.06.30.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents a Call-To-Action (CTA) configuration for a publication.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ctas",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["newsletterConfig"] !== undefined) {
          body["newsletterConfig"] = g["newsletterConfig"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["ctaId"] !== undefined) body["ctaId"] = g["ctaId"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": [],
            }
            : undefined,
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
      description: "Get a ctas",
      arguments: z.object({
        identifier: z.string().describe("The name of the ctas"),
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
    sync: {
      description: "Sync ctas state from GCP",
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
      description: "List ctas resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "Optional. The maximum number of CTAs to return. The service may return fewer than this value. If unspecified, at most 50 CTAs will be returned.",
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
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "ctas",
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
