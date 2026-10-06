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

// Auto-generated extension model for @swamp/gcp/gamesconfiguration/achievementconfigurations
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Play Games Services Publishing AchievementConfigurations.
 *
 * An achievement configuration resource.
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

const BASE_URL = "https://gamesconfiguration.googleapis.com/";

const GET_CONFIG = {
  "id": "gamesConfiguration.achievementConfigurations.get",
  "path": "games/v1configuration/achievements/{achievementId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "achievementId",
  ],
  "parameters": {
    "achievementId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "gamesConfiguration.achievementConfigurations.insert",
  "path": "games/v1configuration/applications/{applicationId}/achievements",
  "httpMethod": "POST",
  "parameterOrder": [
    "applicationId",
  ],
  "parameters": {
    "applicationId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "gamesConfiguration.achievementConfigurations.update",
  "path": "games/v1configuration/achievements/{achievementId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "achievementId",
  ],
  "parameters": {
    "achievementId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "gamesConfiguration.achievementConfigurations.delete",
  "path": "games/v1configuration/achievements/{achievementId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "achievementId",
  ],
  "parameters": {
    "achievementId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "gamesConfiguration.achievementConfigurations.list",
  "path": "games/v1configuration/applications/{applicationId}/achievements",
  "httpMethod": "GET",
  "parameterOrder": [
    "applicationId",
  ],
  "parameters": {
    "applicationId": {
      "location": "path",
      "required": true,
    },
    "maxResults": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
  },
} as const;

const _defaultOAuthScopes: string[] = [
  "https://www.googleapis.com/auth/androidpublisher",
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
  achievementType: z.enum([
    "ACHIEVEMENT_TYPE_UNSPECIFIED",
    "STANDARD",
    "INCREMENTAL",
  ]).describe("The type of the achievement.").optional(),
  draft: z.object({
    description: z.object({
      kind: z.string().describe(
        "Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#localizedStringBundle`.",
      ).optional(),
      translations: z.array(z.object({
        kind: z.string().describe(
          "Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#localizedString`.",
        ).optional(),
        locale: z.string().describe("The locale string.").optional(),
        value: z.string().describe("The string value.").optional(),
      })).describe("The locale strings.").optional(),
    }).describe("Localized strings for the achievement description.")
      .optional(),
    iconUrl: z.string().describe(
      "The icon url of this achievement. Writes to this field are ignored.",
    ).optional(),
    kind: z.string().describe(
      "Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#achievementConfigurationDetail`.",
    ).optional(),
    name: z.object({
      kind: z.string().describe(
        "Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#localizedStringBundle`.",
      ).optional(),
      translations: z.array(z.object({
        kind: z.string().describe(
          "Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#localizedString`.",
        ).optional(),
        locale: z.string().describe("The locale string.").optional(),
        value: z.string().describe("The string value.").optional(),
      })).describe("The locale strings.").optional(),
    }).describe("Localized strings for the achievement name.").optional(),
    pointValue: z.number().int().describe("Point value for the achievement.")
      .optional(),
    sortRank: z.number().int().describe(
      "The sort rank of this achievement. Writes to this field are ignored.",
    ).optional(),
  }).describe("The draft data of the achievement.").optional(),
  id: z.string().describe("The ID of the achievement.").optional(),
  initialState: z.enum(["INITIAL_STATE_UNSPECIFIED", "HIDDEN", "REVEALED"])
    .describe("The initial state of the achievement.").optional(),
  published: z.object({
    description: z.object({
      kind: z.string().describe(
        "Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#localizedStringBundle`.",
      ).optional(),
      translations: z.array(z.object({
        kind: z.string().describe(
          "Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#localizedString`.",
        ).optional(),
        locale: z.string().describe("The locale string.").optional(),
        value: z.string().describe("The string value.").optional(),
      })).describe("The locale strings.").optional(),
    }).describe("Localized strings for the achievement description.")
      .optional(),
    iconUrl: z.string().describe(
      "The icon url of this achievement. Writes to this field are ignored.",
    ).optional(),
    kind: z.string().describe(
      "Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#achievementConfigurationDetail`.",
    ).optional(),
    name: z.object({
      kind: z.string().describe(
        "Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#localizedStringBundle`.",
      ).optional(),
      translations: z.array(z.object({
        kind: z.string().describe(
          "Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#localizedString`.",
        ).optional(),
        locale: z.string().describe("The locale string.").optional(),
        value: z.string().describe("The string value.").optional(),
      })).describe("The locale strings.").optional(),
    }).describe("Localized strings for the achievement name.").optional(),
    pointValue: z.number().int().describe("Point value for the achievement.")
      .optional(),
    sortRank: z.number().int().describe(
      "The sort rank of this achievement. Writes to this field are ignored.",
    ).optional(),
  }).describe("The read-only published data of the achievement.").optional(),
  stepsToUnlock: z.number().int().describe(
    "Steps to unlock. Only applicable to incremental achievements.",
  ).optional(),
  token: z.string().describe("The token for this resource.").optional(),
  applicationId: z.string().describe(
    "The application ID from the Google Play developer console.",
  ),
});

const StateSchema = z.object({
  achievementType: z.string().optional(),
  draft: z.object({
    description: z.object({
      kind: z.string(),
      translations: z.array(z.object({
        kind: z.string(),
        locale: z.string(),
        value: z.string(),
      })),
    }),
    iconUrl: z.string(),
    kind: z.string(),
    name: z.object({
      kind: z.string(),
      translations: z.array(z.object({
        kind: z.string(),
        locale: z.string(),
        value: z.string(),
      })),
    }),
    pointValue: z.number(),
    sortRank: z.number(),
  }).optional(),
  id: z.string().optional(),
  initialState: z.string().optional(),
  kind: z.string().optional(),
  published: z.object({
    description: z.object({
      kind: z.string(),
      translations: z.array(z.object({
        kind: z.string(),
        locale: z.string(),
        value: z.string(),
      })),
    }),
    iconUrl: z.string(),
    kind: z.string(),
    name: z.object({
      kind: z.string(),
      translations: z.array(z.object({
        kind: z.string(),
        locale: z.string(),
        value: z.string(),
      })),
    }),
    pointValue: z.number(),
    sortRank: z.number(),
  }).optional(),
  stepsToUnlock: z.number().optional(),
  token: z.string().optional(),
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
  achievementType: z.enum([
    "ACHIEVEMENT_TYPE_UNSPECIFIED",
    "STANDARD",
    "INCREMENTAL",
  ]).describe("The type of the achievement.").optional(),
  draft: z.object({
    description: z.object({
      kind: z.string().describe(
        "Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#localizedStringBundle`.",
      ).optional(),
      translations: z.array(z.object({
        kind: z.string().describe(
          "Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#localizedString`.",
        ).optional(),
        locale: z.string().describe("The locale string.").optional(),
        value: z.string().describe("The string value.").optional(),
      })).describe("The locale strings.").optional(),
    }).describe("Localized strings for the achievement description.")
      .optional(),
    iconUrl: z.string().describe(
      "The icon url of this achievement. Writes to this field are ignored.",
    ).optional(),
    kind: z.string().describe(
      "Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#achievementConfigurationDetail`.",
    ).optional(),
    name: z.object({
      kind: z.string().describe(
        "Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#localizedStringBundle`.",
      ).optional(),
      translations: z.array(z.object({
        kind: z.string().describe(
          "Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#localizedString`.",
        ).optional(),
        locale: z.string().describe("The locale string.").optional(),
        value: z.string().describe("The string value.").optional(),
      })).describe("The locale strings.").optional(),
    }).describe("Localized strings for the achievement name.").optional(),
    pointValue: z.number().int().describe("Point value for the achievement.")
      .optional(),
    sortRank: z.number().int().describe(
      "The sort rank of this achievement. Writes to this field are ignored.",
    ).optional(),
  }).describe("The draft data of the achievement.").optional(),
  id: z.string().describe("The ID of the achievement.").optional(),
  initialState: z.enum(["INITIAL_STATE_UNSPECIFIED", "HIDDEN", "REVEALED"])
    .describe("The initial state of the achievement.").optional(),
  published: z.object({
    description: z.object({
      kind: z.string().describe(
        "Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#localizedStringBundle`.",
      ).optional(),
      translations: z.array(z.object({
        kind: z.string().describe(
          "Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#localizedString`.",
        ).optional(),
        locale: z.string().describe("The locale string.").optional(),
        value: z.string().describe("The string value.").optional(),
      })).describe("The locale strings.").optional(),
    }).describe("Localized strings for the achievement description.")
      .optional(),
    iconUrl: z.string().describe(
      "The icon url of this achievement. Writes to this field are ignored.",
    ).optional(),
    kind: z.string().describe(
      "Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#achievementConfigurationDetail`.",
    ).optional(),
    name: z.object({
      kind: z.string().describe(
        "Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#localizedStringBundle`.",
      ).optional(),
      translations: z.array(z.object({
        kind: z.string().describe(
          "Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#localizedString`.",
        ).optional(),
        locale: z.string().describe("The locale string.").optional(),
        value: z.string().describe("The string value.").optional(),
      })).describe("The locale strings.").optional(),
    }).describe("Localized strings for the achievement name.").optional(),
    pointValue: z.number().int().describe("Point value for the achievement.")
      .optional(),
    sortRank: z.number().int().describe(
      "The sort rank of this achievement. Writes to this field are ignored.",
    ).optional(),
  }).describe("The read-only published data of the achievement.").optional(),
  stepsToUnlock: z.number().int().describe(
    "Steps to unlock. Only applicable to incremental achievements.",
  ).optional(),
  token: z.string().describe("The token for this resource.").optional(),
  applicationId: z.string().describe(
    "The application ID from the Google Play developer console.",
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

/** Swamp extension model for Google Cloud Google Play Games Services Publishing AchievementConfigurations. Registered at `@swamp/gcp/gamesconfiguration/achievementconfigurations`. */
export const model = {
  type: "@swamp/gcp/gamesconfiguration/achievementconfigurations",
  version: "2026.10.06.1",
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
      toVersion: "2026.04.04.1",
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
      toVersion: "2026.09.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.06.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "An achievement configuration resource.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a achievementConfigurations",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["applicationId"] !== undefined) {
          params["applicationId"] = String(g["applicationId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["achievementType"] !== undefined) {
          body["achievementType"] = g["achievementType"];
        }
        if (g["draft"] !== undefined) body["draft"] = g["draft"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["initialState"] !== undefined) {
          body["initialState"] = g["initialState"];
        }
        if (g["published"] !== undefined) body["published"] = g["published"];
        if (g["stepsToUnlock"] !== undefined) {
          body["stepsToUnlock"] = g["stepsToUnlock"];
        }
        if (g["token"] !== undefined) body["token"] = g["token"];
        if (g["name"] !== undefined) {
          params["achievementId"] = String(g["name"]);
        }
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
      description: "Get a achievementConfigurations",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the achievementConfigurations",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["achievementId"] = args.identifier;
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
      description: "Update achievementConfigurations attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific achievementConfigurations by name (e.g. one discovered by list)",
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
        const resourceId = existing["id"]?.toString() ?? g["name"]?.toString();
        if (!resourceId) {
          throw new Error(
            "No identifier found in existing state or globalArgs",
          );
        }
        params["achievementId"] = resourceId;
        const body: Record<string, unknown> = {};
        if (g["achievementType"] !== undefined) {
          body["achievementType"] = g["achievementType"];
        }
        if (g["draft"] !== undefined) body["draft"] = g["draft"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["initialState"] !== undefined) {
          body["initialState"] = g["initialState"];
        }
        if (g["published"] !== undefined) body["published"] = g["published"];
        if (g["stepsToUnlock"] !== undefined) {
          body["stepsToUnlock"] = g["stepsToUnlock"];
        }
        if (g["token"] !== undefined) body["token"] = g["token"];
        let live: Record<string, unknown> | undefined;
        const unset = [
          "achievementType",
          "draft",
          "id",
          "initialState",
          "stepsToUnlock",
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
      description: "Delete the achievementConfigurations",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the achievementConfigurations",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["achievementId"] = args.identifier;
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
      description: "Sync achievementConfigurations state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific achievementConfigurations by name (e.g. one discovered by list)",
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
          const identifier = existing["id"]?.toString() ??
            g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["achievementId"] = identifier;
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
      description: "List achievementConfigurations resources",
      arguments: z.object({
        maxResults: z.number().describe(
          "The maximum number of resource configurations to return in the response, used for paging. For any response, the actual number of resources returned may be less than the specified `maxResults`.",
        ).optional(),
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
        if (g["applicationId"] !== undefined) {
          params["applicationId"] = String(g["applicationId"]);
        }
        if (args["maxResults"] !== undefined) {
          params["maxResults"] = String(args["maxResults"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "items",
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
