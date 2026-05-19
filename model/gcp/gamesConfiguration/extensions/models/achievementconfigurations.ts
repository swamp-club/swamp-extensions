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
  getProjectId,
  isResourceNotFoundError,
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

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
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
    }).describe("A localized string bundle resource.").optional(),
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
    }).describe("A localized string bundle resource.").optional(),
    pointValue: z.number().int().describe("Point value for the achievement.")
      .optional(),
    sortRank: z.number().int().describe(
      "The sort rank of this achievement. Writes to this field are ignored.",
    ).optional(),
  }).describe("An achievement configuration detail.").optional(),
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
    }).describe("A localized string bundle resource.").optional(),
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
    }).describe("A localized string bundle resource.").optional(),
    pointValue: z.number().int().describe("Point value for the achievement.")
      .optional(),
    sortRank: z.number().int().describe(
      "The sort rank of this achievement. Writes to this field are ignored.",
    ).optional(),
  }).describe("An achievement configuration detail.").optional(),
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
    }).describe("A localized string bundle resource.").optional(),
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
    }).describe("A localized string bundle resource.").optional(),
    pointValue: z.number().int().describe("Point value for the achievement.")
      .optional(),
    sortRank: z.number().int().describe(
      "The sort rank of this achievement. Writes to this field are ignored.",
    ).optional(),
  }).describe("An achievement configuration detail.").optional(),
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
    }).describe("A localized string bundle resource.").optional(),
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
    }).describe("A localized string bundle resource.").optional(),
    pointValue: z.number().int().describe("Point value for the achievement.")
      .optional(),
    sortRank: z.number().int().describe(
      "The sort rank of this achievement. Writes to this field are ignored.",
    ).optional(),
  }).describe("An achievement configuration detail.").optional(),
  stepsToUnlock: z.number().int().describe(
    "Steps to unlock. Only applicable to incremental achievements.",
  ).optional(),
  token: z.string().describe("The token for this resource.").optional(),
  applicationId: z.string().describe(
    "The application ID from the Google Play developer console.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Google Play Games Services Publishing AchievementConfigurations. Registered at `@swamp/gcp/gamesconfiguration/achievementconfigurations`. */
export const model = {
  type: "@swamp/gcp/gamesconfiguration/achievementconfigurations",
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
        const projectId = await getProjectId();
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
      description: "Get a achievementConfigurations",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the achievementConfigurations",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["achievementId"] = args.identifier;
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
      description: "Update achievementConfigurations attributes",
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
        params["achievementId"] = existing["name"]?.toString() ?? "";
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
    delete: {
      description: "Delete the achievementConfigurations",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the achievementConfigurations",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["achievementId"] = args.identifier;
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
      description: "Sync achievementConfigurations state from GCP",
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
          params["achievementId"] = identifier;
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
