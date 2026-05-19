// Auto-generated extension model for @swamp/gcp/gamesconfiguration/leaderboardconfigurations
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Play Games Services Publishing LeaderboardConfigurations.
 *
 * An leaderboard configuration resource.
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
  "id": "gamesConfiguration.leaderboardConfigurations.get",
  "path": "games/v1configuration/leaderboards/{leaderboardId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "leaderboardId",
  ],
  "parameters": {
    "leaderboardId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "gamesConfiguration.leaderboardConfigurations.insert",
  "path": "games/v1configuration/applications/{applicationId}/leaderboards",
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
  "id": "gamesConfiguration.leaderboardConfigurations.update",
  "path": "games/v1configuration/leaderboards/{leaderboardId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "leaderboardId",
  ],
  "parameters": {
    "leaderboardId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "gamesConfiguration.leaderboardConfigurations.delete",
  "path": "games/v1configuration/leaderboards/{leaderboardId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "leaderboardId",
  ],
  "parameters": {
    "leaderboardId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  draft: z.object({
    iconUrl: z.string().describe(
      "The icon url of this leaderboard. Writes to this field are ignored.",
    ).optional(),
    kind: z.string().describe(
      "Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#leaderboardConfigurationDetail`.",
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
    scoreFormat: z.object({
      currencyCode: z.string().describe(
        "The curreny code string. Only used for CURRENCY format type.",
      ).optional(),
      numDecimalPlaces: z.number().int().describe(
        "The number of decimal places for number. Only used for NUMERIC format type.",
      ).optional(),
      numberFormatType: z.enum([
        "NUMBER_FORMAT_TYPE_UNSPECIFIED",
        "NUMERIC",
        "TIME_DURATION",
        "CURRENCY",
      ]).describe("The formatting for the number.").optional(),
      suffix: z.object({
        few: z.object({
          kind: z.string().describe(
            "Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#localizedStringBundle`.",
          ).optional(),
          translations: z.array(z.unknown()).describe("The locale strings.")
            .optional(),
        }).describe("A localized string bundle resource.").optional(),
        many: z.object({
          kind: z.string().describe(
            "Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#localizedStringBundle`.",
          ).optional(),
          translations: z.array(z.unknown()).describe("The locale strings.")
            .optional(),
        }).describe("A localized string bundle resource.").optional(),
        one: z.object({
          kind: z.string().describe(
            "Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#localizedStringBundle`.",
          ).optional(),
          translations: z.array(z.unknown()).describe("The locale strings.")
            .optional(),
        }).describe("A localized string bundle resource.").optional(),
        other: z.object({
          kind: z.string().describe(
            "Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#localizedStringBundle`.",
          ).optional(),
          translations: z.array(z.unknown()).describe("The locale strings.")
            .optional(),
        }).describe("A localized string bundle resource.").optional(),
        two: z.object({
          kind: z.string().describe(
            "Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#localizedStringBundle`.",
          ).optional(),
          translations: z.array(z.unknown()).describe("The locale strings.")
            .optional(),
        }).describe("A localized string bundle resource.").optional(),
        zero: z.object({
          kind: z.string().describe(
            "Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#localizedStringBundle`.",
          ).optional(),
          translations: z.array(z.unknown()).describe("The locale strings.")
            .optional(),
        }).describe("A localized string bundle resource.").optional(),
      }).describe("A number affix resource.").optional(),
    }).describe("A number format resource.").optional(),
    sortRank: z.number().int().describe(
      "The sort rank of this leaderboard. Writes to this field are ignored.",
    ).optional(),
  }).describe("A leaderboard configuration detail.").optional(),
  id: z.string().describe("The ID of the leaderboard.").optional(),
  published: z.object({
    iconUrl: z.string().describe(
      "The icon url of this leaderboard. Writes to this field are ignored.",
    ).optional(),
    kind: z.string().describe(
      "Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#leaderboardConfigurationDetail`.",
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
    scoreFormat: z.object({
      currencyCode: z.string().describe(
        "The curreny code string. Only used for CURRENCY format type.",
      ).optional(),
      numDecimalPlaces: z.number().int().describe(
        "The number of decimal places for number. Only used for NUMERIC format type.",
      ).optional(),
      numberFormatType: z.enum([
        "NUMBER_FORMAT_TYPE_UNSPECIFIED",
        "NUMERIC",
        "TIME_DURATION",
        "CURRENCY",
      ]).describe("The formatting for the number.").optional(),
      suffix: z.object({
        few: z.object({
          kind: z.string().describe(
            "Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#localizedStringBundle`.",
          ).optional(),
          translations: z.array(z.unknown()).describe("The locale strings.")
            .optional(),
        }).describe("A localized string bundle resource.").optional(),
        many: z.object({
          kind: z.string().describe(
            "Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#localizedStringBundle`.",
          ).optional(),
          translations: z.array(z.unknown()).describe("The locale strings.")
            .optional(),
        }).describe("A localized string bundle resource.").optional(),
        one: z.object({
          kind: z.string().describe(
            "Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#localizedStringBundle`.",
          ).optional(),
          translations: z.array(z.unknown()).describe("The locale strings.")
            .optional(),
        }).describe("A localized string bundle resource.").optional(),
        other: z.object({
          kind: z.string().describe(
            "Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#localizedStringBundle`.",
          ).optional(),
          translations: z.array(z.unknown()).describe("The locale strings.")
            .optional(),
        }).describe("A localized string bundle resource.").optional(),
        two: z.object({
          kind: z.string().describe(
            "Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#localizedStringBundle`.",
          ).optional(),
          translations: z.array(z.unknown()).describe("The locale strings.")
            .optional(),
        }).describe("A localized string bundle resource.").optional(),
        zero: z.object({
          kind: z.string().describe(
            "Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#localizedStringBundle`.",
          ).optional(),
          translations: z.array(z.unknown()).describe("The locale strings.")
            .optional(),
        }).describe("A localized string bundle resource.").optional(),
      }).describe("A number affix resource.").optional(),
    }).describe("A number format resource.").optional(),
    sortRank: z.number().int().describe(
      "The sort rank of this leaderboard. Writes to this field are ignored.",
    ).optional(),
  }).describe("A leaderboard configuration detail.").optional(),
  scoreMax: z.string().describe(
    "Maximum score that can be posted to this leaderboard.",
  ).optional(),
  scoreMin: z.string().describe(
    "Minimum score that can be posted to this leaderboard.",
  ).optional(),
  scoreOrder: z.enum([
    "SCORE_ORDER_UNSPECIFIED",
    "LARGER_IS_BETTER",
    "SMALLER_IS_BETTER",
  ]).optional(),
  token: z.string().describe("The token for this resource.").optional(),
  applicationId: z.string().describe(
    "The application ID from the Google Play developer console.",
  ),
});

const StateSchema = z.object({
  draft: z.object({
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
    scoreFormat: z.object({
      currencyCode: z.string(),
      numDecimalPlaces: z.number(),
      numberFormatType: z.string(),
      suffix: z.object({
        few: z.object({
          kind: z.string(),
          translations: z.array(z.unknown()),
        }),
        many: z.object({
          kind: z.string(),
          translations: z.array(z.unknown()),
        }),
        one: z.object({
          kind: z.string(),
          translations: z.array(z.unknown()),
        }),
        other: z.object({
          kind: z.string(),
          translations: z.array(z.unknown()),
        }),
        two: z.object({
          kind: z.string(),
          translations: z.array(z.unknown()),
        }),
        zero: z.object({
          kind: z.string(),
          translations: z.array(z.unknown()),
        }),
      }),
    }),
    sortRank: z.number(),
  }).optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  published: z.object({
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
    scoreFormat: z.object({
      currencyCode: z.string(),
      numDecimalPlaces: z.number(),
      numberFormatType: z.string(),
      suffix: z.object({
        few: z.object({
          kind: z.string(),
          translations: z.array(z.unknown()),
        }),
        many: z.object({
          kind: z.string(),
          translations: z.array(z.unknown()),
        }),
        one: z.object({
          kind: z.string(),
          translations: z.array(z.unknown()),
        }),
        other: z.object({
          kind: z.string(),
          translations: z.array(z.unknown()),
        }),
        two: z.object({
          kind: z.string(),
          translations: z.array(z.unknown()),
        }),
        zero: z.object({
          kind: z.string(),
          translations: z.array(z.unknown()),
        }),
      }),
    }),
    sortRank: z.number(),
  }).optional(),
  scoreMax: z.string().optional(),
  scoreMin: z.string().optional(),
  scoreOrder: z.string().optional(),
  token: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  draft: z.object({
    iconUrl: z.string().describe(
      "The icon url of this leaderboard. Writes to this field are ignored.",
    ).optional(),
    kind: z.string().describe(
      "Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#leaderboardConfigurationDetail`.",
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
    scoreFormat: z.object({
      currencyCode: z.string().describe(
        "The curreny code string. Only used for CURRENCY format type.",
      ).optional(),
      numDecimalPlaces: z.number().int().describe(
        "The number of decimal places for number. Only used for NUMERIC format type.",
      ).optional(),
      numberFormatType: z.enum([
        "NUMBER_FORMAT_TYPE_UNSPECIFIED",
        "NUMERIC",
        "TIME_DURATION",
        "CURRENCY",
      ]).describe("The formatting for the number.").optional(),
      suffix: z.object({
        few: z.object({
          kind: z.string().describe(
            "Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#localizedStringBundle`.",
          ).optional(),
          translations: z.array(z.unknown()).describe("The locale strings.")
            .optional(),
        }).describe("A localized string bundle resource.").optional(),
        many: z.object({
          kind: z.string().describe(
            "Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#localizedStringBundle`.",
          ).optional(),
          translations: z.array(z.unknown()).describe("The locale strings.")
            .optional(),
        }).describe("A localized string bundle resource.").optional(),
        one: z.object({
          kind: z.string().describe(
            "Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#localizedStringBundle`.",
          ).optional(),
          translations: z.array(z.unknown()).describe("The locale strings.")
            .optional(),
        }).describe("A localized string bundle resource.").optional(),
        other: z.object({
          kind: z.string().describe(
            "Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#localizedStringBundle`.",
          ).optional(),
          translations: z.array(z.unknown()).describe("The locale strings.")
            .optional(),
        }).describe("A localized string bundle resource.").optional(),
        two: z.object({
          kind: z.string().describe(
            "Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#localizedStringBundle`.",
          ).optional(),
          translations: z.array(z.unknown()).describe("The locale strings.")
            .optional(),
        }).describe("A localized string bundle resource.").optional(),
        zero: z.object({
          kind: z.string().describe(
            "Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#localizedStringBundle`.",
          ).optional(),
          translations: z.array(z.unknown()).describe("The locale strings.")
            .optional(),
        }).describe("A localized string bundle resource.").optional(),
      }).describe("A number affix resource.").optional(),
    }).describe("A number format resource.").optional(),
    sortRank: z.number().int().describe(
      "The sort rank of this leaderboard. Writes to this field are ignored.",
    ).optional(),
  }).describe("A leaderboard configuration detail.").optional(),
  id: z.string().describe("The ID of the leaderboard.").optional(),
  published: z.object({
    iconUrl: z.string().describe(
      "The icon url of this leaderboard. Writes to this field are ignored.",
    ).optional(),
    kind: z.string().describe(
      "Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#leaderboardConfigurationDetail`.",
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
    scoreFormat: z.object({
      currencyCode: z.string().describe(
        "The curreny code string. Only used for CURRENCY format type.",
      ).optional(),
      numDecimalPlaces: z.number().int().describe(
        "The number of decimal places for number. Only used for NUMERIC format type.",
      ).optional(),
      numberFormatType: z.enum([
        "NUMBER_FORMAT_TYPE_UNSPECIFIED",
        "NUMERIC",
        "TIME_DURATION",
        "CURRENCY",
      ]).describe("The formatting for the number.").optional(),
      suffix: z.object({
        few: z.object({
          kind: z.string().describe(
            "Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#localizedStringBundle`.",
          ).optional(),
          translations: z.array(z.unknown()).describe("The locale strings.")
            .optional(),
        }).describe("A localized string bundle resource.").optional(),
        many: z.object({
          kind: z.string().describe(
            "Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#localizedStringBundle`.",
          ).optional(),
          translations: z.array(z.unknown()).describe("The locale strings.")
            .optional(),
        }).describe("A localized string bundle resource.").optional(),
        one: z.object({
          kind: z.string().describe(
            "Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#localizedStringBundle`.",
          ).optional(),
          translations: z.array(z.unknown()).describe("The locale strings.")
            .optional(),
        }).describe("A localized string bundle resource.").optional(),
        other: z.object({
          kind: z.string().describe(
            "Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#localizedStringBundle`.",
          ).optional(),
          translations: z.array(z.unknown()).describe("The locale strings.")
            .optional(),
        }).describe("A localized string bundle resource.").optional(),
        two: z.object({
          kind: z.string().describe(
            "Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#localizedStringBundle`.",
          ).optional(),
          translations: z.array(z.unknown()).describe("The locale strings.")
            .optional(),
        }).describe("A localized string bundle resource.").optional(),
        zero: z.object({
          kind: z.string().describe(
            "Uniquely identifies the type of this resource. Value is always the fixed string `gamesConfiguration#localizedStringBundle`.",
          ).optional(),
          translations: z.array(z.unknown()).describe("The locale strings.")
            .optional(),
        }).describe("A localized string bundle resource.").optional(),
      }).describe("A number affix resource.").optional(),
    }).describe("A number format resource.").optional(),
    sortRank: z.number().int().describe(
      "The sort rank of this leaderboard. Writes to this field are ignored.",
    ).optional(),
  }).describe("A leaderboard configuration detail.").optional(),
  scoreMax: z.string().describe(
    "Maximum score that can be posted to this leaderboard.",
  ).optional(),
  scoreMin: z.string().describe(
    "Minimum score that can be posted to this leaderboard.",
  ).optional(),
  scoreOrder: z.enum([
    "SCORE_ORDER_UNSPECIFIED",
    "LARGER_IS_BETTER",
    "SMALLER_IS_BETTER",
  ]).optional(),
  token: z.string().describe("The token for this resource.").optional(),
  applicationId: z.string().describe(
    "The application ID from the Google Play developer console.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Google Play Games Services Publishing LeaderboardConfigurations. Registered at `@swamp/gcp/gamesconfiguration/leaderboardconfigurations`. */
export const model = {
  type: "@swamp/gcp/gamesconfiguration/leaderboardconfigurations",
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
      description: "An leaderboard configuration resource.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a leaderboardConfigurations",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["applicationId"] !== undefined) {
          params["applicationId"] = String(g["applicationId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["draft"] !== undefined) body["draft"] = g["draft"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["published"] !== undefined) body["published"] = g["published"];
        if (g["scoreMax"] !== undefined) body["scoreMax"] = g["scoreMax"];
        if (g["scoreMin"] !== undefined) body["scoreMin"] = g["scoreMin"];
        if (g["scoreOrder"] !== undefined) body["scoreOrder"] = g["scoreOrder"];
        if (g["token"] !== undefined) body["token"] = g["token"];
        if (g["name"] !== undefined) {
          params["leaderboardId"] = String(g["name"]);
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
      description: "Get a leaderboardConfigurations",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the leaderboardConfigurations",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["leaderboardId"] = args.identifier;
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
      description: "Update leaderboardConfigurations attributes",
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
        params["leaderboardId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["draft"] !== undefined) body["draft"] = g["draft"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["published"] !== undefined) body["published"] = g["published"];
        if (g["scoreMax"] !== undefined) body["scoreMax"] = g["scoreMax"];
        if (g["scoreMin"] !== undefined) body["scoreMin"] = g["scoreMin"];
        if (g["scoreOrder"] !== undefined) body["scoreOrder"] = g["scoreOrder"];
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
      description: "Delete the leaderboardConfigurations",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the leaderboardConfigurations",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["leaderboardId"] = args.identifier;
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
      description: "Sync leaderboardConfigurations state from GCP",
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
          params["leaderboardId"] = identifier;
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
