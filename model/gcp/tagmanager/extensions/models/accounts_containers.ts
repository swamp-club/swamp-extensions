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

// Auto-generated extension model for @swamp/gcp/tagmanager/accounts-containers
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Tag Manager Accounts.Containers.
 *
 * Represents a Google Tag Manager Container, which specifies the platform tags will run on, manages workspaces, and retains container versions.
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
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://tagmanager.googleapis.com/";

const GET_CONFIG = {
  "id": "tagmanager.accounts.containers.get",
  "path": "tagmanager/v2/{+path}",
  "httpMethod": "GET",
  "parameterOrder": [
    "path",
  ],
  "parameters": {
    "path": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "tagmanager.accounts.containers.create",
  "path": "tagmanager/v2/{+parent}/containers",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "tagmanager.accounts.containers.update",
  "path": "tagmanager/v2/{+path}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "path",
  ],
  "parameters": {
    "fingerprint": {
      "location": "query",
    },
    "path": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "tagmanager.accounts.containers.delete",
  "path": "tagmanager/v2/{+path}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "path",
  ],
  "parameters": {
    "path": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "tagmanager.accounts.containers.list",
  "path": "tagmanager/v2/{+parent}/containers",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "pageToken": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const _defaultOAuthScopes: string[] = [
  "https://www.googleapis.com/auth/tagmanager.delete.containers",
  "https://www.googleapis.com/auth/tagmanager.edit.containers",
  "https://www.googleapis.com/auth/tagmanager.edit.containerversions",
  "https://www.googleapis.com/auth/tagmanager.manage.accounts",
  "https://www.googleapis.com/auth/tagmanager.manage.users",
  "https://www.googleapis.com/auth/tagmanager.publish",
  "https://www.googleapis.com/auth/tagmanager.readonly",
];

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
  scopes: z.string().describe(
    "Comma-separated OAuth scopes to request when minting access tokens via gcloud. Defaults to the API's Discovery Document scopes.",
  ).optional(),
  quotaProject: z.string().describe(
    "GCP project ID for quota and billing attribution; sets the x-goog-user-project header. Overrides GOOGLE_CLOUD_QUOTA_PROJECT environment variable. Required for APIs like Cloud Identity when using user credentials.",
  ).optional(),
  apiEndpoint: z.string().describe(
    "Custom API endpoint for emulators; overrides GCP_API_ENDPOINT environment variable. Defaults to the service's production URL.",
  ).optional(),
  accountId: z.string().describe("GTM Account ID.").optional(),
  containerId: z.string().describe(
    "The Container ID uniquely identifies the GTM Container.",
  ).optional(),
  domainName: z.array(z.string()).describe(
    "List of domain names associated with the Container.",
  ).optional(),
  features: z.object({
    supportBuiltInVariables: z.boolean().describe(
      "Whether this Container supports built-in variables",
    ).optional(),
    supportClients: z.boolean().describe(
      "Whether this Container supports clients.",
    ).optional(),
    supportEnvironments: z.boolean().describe(
      "Whether this Container supports environments.",
    ).optional(),
    supportFolders: z.boolean().describe(
      "Whether this Container supports folders.",
    ).optional(),
    supportGtagConfigs: z.boolean().describe(
      "Whether this Container supports Google tag config.",
    ).optional(),
    supportTags: z.boolean().describe("Whether this Container supports tags.")
      .optional(),
    supportTemplates: z.boolean().describe(
      "Whether this Container supports templates.",
    ).optional(),
    supportTransformations: z.boolean().describe(
      "Whether this Container supports transformations.",
    ).optional(),
    supportTriggers: z.boolean().describe(
      "Whether this Container supports triggers.",
    ).optional(),
    supportUserPermissions: z.boolean().describe(
      "Whether this Container supports user permissions managed by GTM.",
    ).optional(),
    supportVariables: z.boolean().describe(
      "Whether this Container supports variables.",
    ).optional(),
    supportVersions: z.boolean().describe(
      "Whether this Container supports Container versions.",
    ).optional(),
    supportWorkspaces: z.boolean().describe(
      "Whether this Container supports workspaces.",
    ).optional(),
    supportZones: z.boolean().describe("Whether this Container supports zones.")
      .optional(),
  }).describe("Read-only Container feature set.").optional(),
  fingerprint: z.string().describe(
    "The fingerprint of the GTM Container as computed at storage time. This value is recomputed whenever the account is modified.",
  ).optional(),
  name: z.string().describe("Container display name.").optional(),
  notes: z.string().describe("Container Notes.").optional(),
  path: z.string().describe("GTM Container's API relative path.").optional(),
  publicId: z.string().describe("Container Public ID.").optional(),
  tagIds: z.array(z.string()).describe(
    "All Tag IDs that refer to this Container.",
  ).optional(),
  tagManagerUrl: z.string().describe(
    "Auto generated link to the tag manager UI",
  ).optional(),
  taggingServerUrls: z.array(z.string()).describe(
    "List of server-side container URLs for the Container. If multiple URLs are provided, all URL paths must match.",
  ).optional(),
  usageContext: z.array(
    z.enum([
      "usageContextUnspecified",
      "web",
      "android",
      "ios",
      "androidSdk5",
      "iosSdk5",
      "amp",
      "server",
    ]),
  ).describe(
    "List of Usage Contexts for the Container. Valid values include: web, android, or ios.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  accountId: z.string().optional(),
  containerId: z.string().optional(),
  domainName: z.array(z.string()).optional(),
  features: z.object({
    supportBuiltInVariables: z.boolean(),
    supportClients: z.boolean(),
    supportEnvironments: z.boolean(),
    supportFolders: z.boolean(),
    supportGtagConfigs: z.boolean(),
    supportTags: z.boolean(),
    supportTemplates: z.boolean(),
    supportTransformations: z.boolean(),
    supportTriggers: z.boolean(),
    supportUserPermissions: z.boolean(),
    supportVariables: z.boolean(),
    supportVersions: z.boolean(),
    supportWorkspaces: z.boolean(),
    supportZones: z.boolean(),
  }).optional(),
  fingerprint: z.string().optional(),
  name: z.string(),
  notes: z.string().optional(),
  path: z.string().optional(),
  publicId: z.string().optional(),
  tagIds: z.array(z.string()).optional(),
  tagManagerUrl: z.string().optional(),
  taggingServerUrls: z.array(z.string()).optional(),
  usageContext: z.array(z.string()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  accountId: z.string().describe("GTM Account ID.").optional(),
  containerId: z.string().describe(
    "The Container ID uniquely identifies the GTM Container.",
  ).optional(),
  domainName: z.array(z.string()).describe(
    "List of domain names associated with the Container.",
  ).optional(),
  features: z.object({
    supportBuiltInVariables: z.boolean().describe(
      "Whether this Container supports built-in variables",
    ).optional(),
    supportClients: z.boolean().describe(
      "Whether this Container supports clients.",
    ).optional(),
    supportEnvironments: z.boolean().describe(
      "Whether this Container supports environments.",
    ).optional(),
    supportFolders: z.boolean().describe(
      "Whether this Container supports folders.",
    ).optional(),
    supportGtagConfigs: z.boolean().describe(
      "Whether this Container supports Google tag config.",
    ).optional(),
    supportTags: z.boolean().describe("Whether this Container supports tags.")
      .optional(),
    supportTemplates: z.boolean().describe(
      "Whether this Container supports templates.",
    ).optional(),
    supportTransformations: z.boolean().describe(
      "Whether this Container supports transformations.",
    ).optional(),
    supportTriggers: z.boolean().describe(
      "Whether this Container supports triggers.",
    ).optional(),
    supportUserPermissions: z.boolean().describe(
      "Whether this Container supports user permissions managed by GTM.",
    ).optional(),
    supportVariables: z.boolean().describe(
      "Whether this Container supports variables.",
    ).optional(),
    supportVersions: z.boolean().describe(
      "Whether this Container supports Container versions.",
    ).optional(),
    supportWorkspaces: z.boolean().describe(
      "Whether this Container supports workspaces.",
    ).optional(),
    supportZones: z.boolean().describe("Whether this Container supports zones.")
      .optional(),
  }).describe("Read-only Container feature set.").optional(),
  fingerprint: z.string().describe(
    "The fingerprint of the GTM Container as computed at storage time. This value is recomputed whenever the account is modified.",
  ).optional(),
  name: z.string().describe("Container display name.").optional(),
  notes: z.string().describe("Container Notes.").optional(),
  path: z.string().describe("GTM Container's API relative path.").optional(),
  publicId: z.string().describe("Container Public ID.").optional(),
  tagIds: z.array(z.string()).describe(
    "All Tag IDs that refer to this Container.",
  ).optional(),
  tagManagerUrl: z.string().describe(
    "Auto generated link to the tag manager UI",
  ).optional(),
  taggingServerUrls: z.array(z.string()).describe(
    "List of server-side container URLs for the Container. If multiple URLs are provided, all URL paths must match.",
  ).optional(),
  usageContext: z.array(
    z.enum([
      "usageContextUnspecified",
      "web",
      "android",
      "ios",
      "androidSdk5",
      "iosSdk5",
      "amp",
      "server",
    ]),
  ).describe(
    "List of Usage Contexts for the Container. Valid values include: web, android, or ios.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
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

/** Swamp extension model for Google Cloud Tag Manager Accounts.Containers. Registered at `@swamp/gcp/tagmanager/accounts-containers`. */
export const model = {
  type: "@swamp/gcp/tagmanager/accounts-containers",
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
      toVersion: "2026.05.25.2",
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
      toVersion: "2026.09.07.1",
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
        "Represents a Google Tag Manager Container, which specifies the platform tags ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a containers",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["accountId"] !== undefined) body["accountId"] = g["accountId"];
        if (g["containerId"] !== undefined) {
          body["containerId"] = g["containerId"];
        }
        if (g["domainName"] !== undefined) body["domainName"] = g["domainName"];
        if (g["features"] !== undefined) body["features"] = g["features"];
        if (g["fingerprint"] !== undefined) {
          body["fingerprint"] = g["fingerprint"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["notes"] !== undefined) body["notes"] = g["notes"];
        if (g["path"] !== undefined) body["path"] = g["path"];
        if (g["publicId"] !== undefined) body["publicId"] = g["publicId"];
        if (g["tagIds"] !== undefined) body["tagIds"] = g["tagIds"];
        if (g["tagManagerUrl"] !== undefined) {
          body["tagManagerUrl"] = g["tagManagerUrl"];
        }
        if (g["taggingServerUrls"] !== undefined) {
          body["taggingServerUrls"] = g["taggingServerUrls"];
        }
        if (g["usageContext"] !== undefined) {
          body["usageContext"] = g["usageContext"];
        }
        if (g["name"] !== undefined) params["path"] = String(g["name"]);
        const result = await createResource(
          baseUrl,
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
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
          credentials,
        ) as StateData;
        const instanceName = ((g.name ?? result.name)?.toString() ?? "current")
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
      description: "Get a containers",
      arguments: z.object({
        identifier: z.string().describe("The name of the containers"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["path"] = args.identifier;
        const result = await readResource(
          baseUrl,
          GET_CONFIG,
          params,
          credentials,
        ) as StateData;
        const instanceName =
          ((g.name ?? result.name)?.toString() ?? args.identifier).replace(
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
      description: "Update containers attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific containers by name (e.g. one discovered by list)",
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
        params["path"] = existing["path"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["accountId"] !== undefined) body["accountId"] = g["accountId"];
        if (g["containerId"] !== undefined) {
          body["containerId"] = g["containerId"];
        }
        if (g["domainName"] !== undefined) body["domainName"] = g["domainName"];
        if (g["features"] !== undefined) body["features"] = g["features"];
        if (g["fingerprint"] !== undefined) {
          params["fingerprint"] = String(g["fingerprint"]);
        } else if (existing["fingerprint"] !== undefined) {
          params["fingerprint"] = String(existing["fingerprint"]);
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["notes"] !== undefined) body["notes"] = g["notes"];
        if (g["publicId"] !== undefined) body["publicId"] = g["publicId"];
        if (g["tagIds"] !== undefined) body["tagIds"] = g["tagIds"];
        if (g["tagManagerUrl"] !== undefined) {
          body["tagManagerUrl"] = g["tagManagerUrl"];
        }
        if (g["taggingServerUrls"] !== undefined) {
          body["taggingServerUrls"] = g["taggingServerUrls"];
        }
        if (g["usageContext"] !== undefined) {
          body["usageContext"] = g["usageContext"];
        }
        let live: Record<string, unknown> | undefined;
        const unset = [
          "accountId",
          "containerId",
          "domainName",
          "name",
          "notes",
          "publicId",
          "tagIds",
          "tagManagerUrl",
          "taggingServerUrls",
          "usageContext",
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
    delete: {
      description: "Delete the containers",
      arguments: z.object({
        identifier: z.string().describe("The name of the containers"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["path"] = args.identifier;
        const { existed } = await deleteResource(
          baseUrl,
          DELETE_CONFIG,
          params,
          credentials,
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
      description: "Sync containers state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific containers by name (e.g. one discovered by list)",
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
          params["path"] = identifier;
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
    list: {
      description: "List containers resources",
      arguments: z.object({
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "container",
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
    combine: {
      description: "combine",
      arguments: z.object({
        allowUserPermissionFeatureUpdate: z.any().optional(),
        containerId: z.any().optional(),
        settingSource: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["path"] !== undefined) params["path"] = String(g["path"]);
        if (args["allowUserPermissionFeatureUpdate"] !== undefined) {
          params["allowUserPermissionFeatureUpdate"] = String(
            args["allowUserPermissionFeatureUpdate"],
          );
        }
        if (args["containerId"] !== undefined) {
          params["containerId"] = String(args["containerId"]);
        }
        if (args["settingSource"] !== undefined) {
          params["settingSource"] = String(args["settingSource"]);
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "tagmanager.accounts.containers.combine",
            "path": "tagmanager/v2/{+path}:combine",
            "httpMethod": "POST",
            "parameterOrder": ["path"],
            "parameters": {
              "allowUserPermissionFeatureUpdate": { "location": "query" },
              "containerId": { "location": "query" },
              "path": { "location": "path", "required": true },
              "settingSource": { "location": "query" },
            },
          },
          params,
          {},
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    lookup: {
      description: "lookup",
      arguments: z.object({
        destinationId: z.any().optional(),
        tagId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (args["destinationId"] !== undefined) {
          params["destinationId"] = String(args["destinationId"]);
        }
        if (args["tagId"] !== undefined) {
          params["tagId"] = String(args["tagId"]);
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "tagmanager.accounts.containers.lookup",
            "path": "tagmanager/v2/accounts/containers:lookup",
            "httpMethod": "GET",
            "parameterOrder": [],
            "parameters": {
              "destinationId": { "location": "query" },
              "tagId": { "location": "query" },
            },
          },
          params,
          undefined,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    move_tag_id: {
      description: "move_tag_id",
      arguments: z.object({
        allowUserPermissionFeatureUpdate: z.any().optional(),
        copySettings: z.any().optional(),
        copyTermsOfService: z.any().optional(),
        copyUsers: z.any().optional(),
        tagId: z.any().optional(),
        tagName: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["path"] !== undefined) params["path"] = String(g["path"]);
        if (args["allowUserPermissionFeatureUpdate"] !== undefined) {
          params["allowUserPermissionFeatureUpdate"] = String(
            args["allowUserPermissionFeatureUpdate"],
          );
        }
        if (args["copySettings"] !== undefined) {
          params["copySettings"] = String(args["copySettings"]);
        }
        if (args["copyTermsOfService"] !== undefined) {
          params["copyTermsOfService"] = String(args["copyTermsOfService"]);
        }
        if (args["copyUsers"] !== undefined) {
          params["copyUsers"] = String(args["copyUsers"]);
        }
        if (args["tagId"] !== undefined) {
          params["tagId"] = String(args["tagId"]);
        }
        if (args["tagName"] !== undefined) {
          params["tagName"] = String(args["tagName"]);
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "tagmanager.accounts.containers.move_tag_id",
            "path": "tagmanager/v2/{+path}:move_tag_id",
            "httpMethod": "POST",
            "parameterOrder": ["path"],
            "parameters": {
              "allowUserPermissionFeatureUpdate": { "location": "query" },
              "copySettings": { "location": "query" },
              "copyTermsOfService": { "location": "query" },
              "copyUsers": { "location": "query" },
              "path": { "location": "path", "required": true },
              "tagId": { "location": "query" },
              "tagName": { "location": "query" },
            },
          },
          params,
          {},
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    snippet: {
      description: "snippet",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["path"] !== undefined) params["path"] = String(g["path"]);
        const result = await createResource(
          baseUrl,
          {
            "id": "tagmanager.accounts.containers.snippet",
            "path": "tagmanager/v2/{+path}:snippet",
            "httpMethod": "GET",
            "parameterOrder": ["path"],
            "parameters": { "path": { "location": "path", "required": true } },
          },
          params,
          undefined,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
  },
};
