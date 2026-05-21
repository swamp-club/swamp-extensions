// Auto-generated extension model for @swamp/gcp/content/datafeeds
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Content for Shopping Datafeeds.
 *
 * Datafeed configuration data.
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

const BASE_URL = "https://shoppingcontent.googleapis.com/content/v2.1/";

const GET_CONFIG = {
  "id": "content.datafeeds.get",
  "path": "{merchantId}/datafeeds/{datafeedId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "merchantId",
    "datafeedId",
  ],
  "parameters": {
    "datafeedId": {
      "location": "path",
      "required": true,
    },
    "merchantId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "content.datafeeds.insert",
  "path": "{merchantId}/datafeeds",
  "httpMethod": "POST",
  "parameterOrder": [
    "merchantId",
  ],
  "parameters": {
    "merchantId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "content.datafeeds.update",
  "path": "{merchantId}/datafeeds/{datafeedId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "merchantId",
    "datafeedId",
  ],
  "parameters": {
    "datafeedId": {
      "location": "path",
      "required": true,
    },
    "merchantId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "content.datafeeds.delete",
  "path": "{merchantId}/datafeeds/{datafeedId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "merchantId",
    "datafeedId",
  ],
  "parameters": {
    "datafeedId": {
      "location": "path",
      "required": true,
    },
    "merchantId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "content.datafeeds.list",
  "path": "{merchantId}/datafeeds",
  "httpMethod": "GET",
  "parameterOrder": [
    "merchantId",
  ],
  "parameters": {
    "maxResults": {
      "location": "query",
    },
    "merchantId": {
      "location": "path",
      "required": true,
    },
    "pageToken": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  attributeLanguage: z.string().describe(
    "The two-letter ISO 639-1 language in which the attributes are defined in the data feed.",
  ).optional(),
  contentType: z.string().describe(
    'Required. The type of data feed. For product inventory feeds, only feeds for local stores, not online stores, are supported. Acceptable values are: - "`local products`" - "`product inventory`" - "`products`"',
  ).optional(),
  fetchSchedule: z.object({
    dayOfMonth: z.number().int().describe(
      "The day of the month the feed file should be fetched (1-31).",
    ).optional(),
    fetchUrl: z.string().describe(
      "The URL where the feed file can be fetched. Google Merchant Center will support automatic scheduled uploads using the HTTP, HTTPS, FTP, or SFTP protocols, so the value will need to be a valid link using one of those four protocols.",
    ).optional(),
    hour: z.number().int().describe(
      "The hour of the day the feed file should be fetched (0-23).",
    ).optional(),
    minuteOfHour: z.number().int().describe(
      "The minute of the hour the feed file should be fetched (0-59). Read-only.",
    ).optional(),
    password: z.string().describe("An optional password for fetch_url.")
      .optional(),
    paused: z.boolean().describe(
      "Whether the scheduled fetch is paused or not.",
    ).optional(),
    timeZone: z.string().describe(
      'Time zone used for schedule. UTC by default. For example, "America/Los_Angeles".',
    ).optional(),
    username: z.string().describe("An optional user name for fetch_url.")
      .optional(),
    weekday: z.string().describe(
      'The day of the week the feed file should be fetched. Acceptable values are: - "`monday`" - "`tuesday`" - "`wednesday`" - "`thursday`" - "`friday`" - "`saturday`" - "`sunday`"',
    ).optional(),
  }).describe(
    "The required fields vary based on the frequency of fetching. For a monthly fetch schedule, day_of_month and hour are required. For a weekly fetch schedule, weekday and hour are required. For a daily fetch schedule, only hour is required.",
  ).optional(),
  fileName: z.string().describe(
    "Required. The filename of the feed. All feeds must have a unique file name.",
  ).optional(),
  format: z.object({
    columnDelimiter: z.string().describe(
      'Delimiter for the separation of values in a delimiter-separated values feed. If not specified, the delimiter will be auto-detected. Ignored for non-DSV data feeds. Acceptable values are: - "`pipe`" - "`tab`" - "`tilde`"',
    ).optional(),
    fileEncoding: z.string().describe(
      'Character encoding scheme of the data feed. If not specified, the encoding will be auto-detected. Acceptable values are: - "`latin-1`" - "`utf-16be`" - "`utf-16le`" - "`utf-8`" - "`windows-1252`"',
    ).optional(),
    quotingMode: z.string().describe(
      'Specifies how double quotes are interpreted. If not specified, the mode will be auto-detected. Ignored for non-DSV data feeds. Acceptable values are: - "`normal character`" - "`value quoting`"',
    ).optional(),
  }).optional(),
  id: z.string().describe("Required for update. The ID of the data feed.")
    .optional(),
  name: z.string().describe(
    "Required for insert. A descriptive name of the data feed.",
  ).optional(),
  targets: z.array(z.object({
    country: z.string().describe(
      "Deprecated. Use `feedLabel` instead. The country where the items in the feed will be included in the search index, represented as a CLDR territory code.",
    ).optional(),
    excludedDestinations: z.array(z.string()).describe(
      "The list of [destinations to exclude](//support.google.com/merchants/answer/6324486) for this target (corresponds to cleared check boxes in Merchant Center). Products that are excluded from all destinations for more than 7 days are automatically deleted.",
    ).optional(),
    feedLabel: z.string().describe(
      "Feed label for the DatafeedTarget. Either `country` or `feedLabel` is required. If both `feedLabel` and `country` is specified, the values must match. Must be less than or equal to 20 uppercase letters (A-Z), numbers (0-9), and dashes (-).",
    ).optional(),
    includedDestinations: z.array(z.string()).describe(
      "The list of [destinations to include](//support.google.com/merchants/answer/7501026) for this target (corresponds to checked check boxes in Merchant Center). Default destinations are always included unless provided in `excludedDestinations`.",
    ).optional(),
    language: z.string().describe(
      "The two-letter ISO 639-1 language of the items in the feed. Must be a valid language for `targets[].country`.",
    ).optional(),
    targetCountries: z.array(z.string()).describe(
      'The countries where the items may be displayed. Represented as a CLDR territory code. Will be ignored for "product inventory" feeds.',
    ).optional(),
  })).describe(
    "The targets this feed should apply to (country, language, destinations).",
  ).optional(),
  merchantId: z.string().describe(
    "The ID of the account that manages the datafeed. This account cannot be a multi-client account.",
  ),
});

const StateSchema = z.object({
  attributeLanguage: z.string().optional(),
  contentType: z.string().optional(),
  fetchSchedule: z.object({
    dayOfMonth: z.number(),
    fetchUrl: z.string(),
    hour: z.number(),
    minuteOfHour: z.number(),
    password: z.string(),
    paused: z.boolean(),
    timeZone: z.string(),
    username: z.string(),
    weekday: z.string(),
  }).optional(),
  fileName: z.string().optional(),
  format: z.object({
    columnDelimiter: z.string(),
    fileEncoding: z.string(),
    quotingMode: z.string(),
  }).optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  name: z.string(),
  targets: z.array(z.object({
    country: z.string(),
    excludedDestinations: z.array(z.string()),
    feedLabel: z.string(),
    includedDestinations: z.array(z.string()),
    language: z.string(),
    targetCountries: z.array(z.string()),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  attributeLanguage: z.string().describe(
    "The two-letter ISO 639-1 language in which the attributes are defined in the data feed.",
  ).optional(),
  contentType: z.string().describe(
    'Required. The type of data feed. For product inventory feeds, only feeds for local stores, not online stores, are supported. Acceptable values are: - "`local products`" - "`product inventory`" - "`products`"',
  ).optional(),
  fetchSchedule: z.object({
    dayOfMonth: z.number().int().describe(
      "The day of the month the feed file should be fetched (1-31).",
    ).optional(),
    fetchUrl: z.string().describe(
      "The URL where the feed file can be fetched. Google Merchant Center will support automatic scheduled uploads using the HTTP, HTTPS, FTP, or SFTP protocols, so the value will need to be a valid link using one of those four protocols.",
    ).optional(),
    hour: z.number().int().describe(
      "The hour of the day the feed file should be fetched (0-23).",
    ).optional(),
    minuteOfHour: z.number().int().describe(
      "The minute of the hour the feed file should be fetched (0-59). Read-only.",
    ).optional(),
    password: z.string().describe("An optional password for fetch_url.")
      .optional(),
    paused: z.boolean().describe(
      "Whether the scheduled fetch is paused or not.",
    ).optional(),
    timeZone: z.string().describe(
      'Time zone used for schedule. UTC by default. For example, "America/Los_Angeles".',
    ).optional(),
    username: z.string().describe("An optional user name for fetch_url.")
      .optional(),
    weekday: z.string().describe(
      'The day of the week the feed file should be fetched. Acceptable values are: - "`monday`" - "`tuesday`" - "`wednesday`" - "`thursday`" - "`friday`" - "`saturday`" - "`sunday`"',
    ).optional(),
  }).describe(
    "The required fields vary based on the frequency of fetching. For a monthly fetch schedule, day_of_month and hour are required. For a weekly fetch schedule, weekday and hour are required. For a daily fetch schedule, only hour is required.",
  ).optional(),
  fileName: z.string().describe(
    "Required. The filename of the feed. All feeds must have a unique file name.",
  ).optional(),
  format: z.object({
    columnDelimiter: z.string().describe(
      'Delimiter for the separation of values in a delimiter-separated values feed. If not specified, the delimiter will be auto-detected. Ignored for non-DSV data feeds. Acceptable values are: - "`pipe`" - "`tab`" - "`tilde`"',
    ).optional(),
    fileEncoding: z.string().describe(
      'Character encoding scheme of the data feed. If not specified, the encoding will be auto-detected. Acceptable values are: - "`latin-1`" - "`utf-16be`" - "`utf-16le`" - "`utf-8`" - "`windows-1252`"',
    ).optional(),
    quotingMode: z.string().describe(
      'Specifies how double quotes are interpreted. If not specified, the mode will be auto-detected. Ignored for non-DSV data feeds. Acceptable values are: - "`normal character`" - "`value quoting`"',
    ).optional(),
  }).optional(),
  id: z.string().describe("Required for update. The ID of the data feed.")
    .optional(),
  name: z.string().describe(
    "Required for insert. A descriptive name of the data feed.",
  ).optional(),
  targets: z.array(z.object({
    country: z.string().describe(
      "Deprecated. Use `feedLabel` instead. The country where the items in the feed will be included in the search index, represented as a CLDR territory code.",
    ).optional(),
    excludedDestinations: z.array(z.string()).describe(
      "The list of [destinations to exclude](//support.google.com/merchants/answer/6324486) for this target (corresponds to cleared check boxes in Merchant Center). Products that are excluded from all destinations for more than 7 days are automatically deleted.",
    ).optional(),
    feedLabel: z.string().describe(
      "Feed label for the DatafeedTarget. Either `country` or `feedLabel` is required. If both `feedLabel` and `country` is specified, the values must match. Must be less than or equal to 20 uppercase letters (A-Z), numbers (0-9), and dashes (-).",
    ).optional(),
    includedDestinations: z.array(z.string()).describe(
      "The list of [destinations to include](//support.google.com/merchants/answer/7501026) for this target (corresponds to checked check boxes in Merchant Center). Default destinations are always included unless provided in `excludedDestinations`.",
    ).optional(),
    language: z.string().describe(
      "The two-letter ISO 639-1 language of the items in the feed. Must be a valid language for `targets[].country`.",
    ).optional(),
    targetCountries: z.array(z.string()).describe(
      'The countries where the items may be displayed. Represented as a CLDR territory code. Will be ignored for "product inventory" feeds.',
    ).optional(),
  })).describe(
    "The targets this feed should apply to (country, language, destinations).",
  ).optional(),
  merchantId: z.string().describe(
    "The ID of the account that manages the datafeed. This account cannot be a multi-client account.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Content for Shopping Datafeeds. Registered at `@swamp/gcp/content/datafeeds`. */
export const model = {
  type: "@swamp/gcp/content/datafeeds",
  version: "2026.05.21.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Datafeed configuration data.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a datafeeds",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["merchantId"] !== undefined) {
          params["merchantId"] = String(g["merchantId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["attributeLanguage"] !== undefined) {
          body["attributeLanguage"] = g["attributeLanguage"];
        }
        if (g["contentType"] !== undefined) {
          body["contentType"] = g["contentType"];
        }
        if (g["fetchSchedule"] !== undefined) {
          body["fetchSchedule"] = g["fetchSchedule"];
        }
        if (g["fileName"] !== undefined) body["fileName"] = g["fileName"];
        if (g["format"] !== undefined) body["format"] = g["format"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["targets"] !== undefined) body["targets"] = g["targets"];
        if (g["name"] !== undefined) params["datafeedId"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "merchantId": String(g["merchantId"] ?? "") },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
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
      description: "Get a datafeeds",
      arguments: z.object({
        identifier: z.string().describe("The name of the datafeeds"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["merchantId"] !== undefined) {
          params["merchantId"] = String(g["merchantId"]);
        }
        params["datafeedId"] = args.identifier;
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
      description: "Update datafeeds attributes",
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
        if (g["merchantId"] !== undefined) {
          params["merchantId"] = String(g["merchantId"]);
        } else if (existing["merchantId"]) {
          params["merchantId"] = String(existing["merchantId"]);
        }
        params["datafeedId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["attributeLanguage"] !== undefined) {
          body["attributeLanguage"] = g["attributeLanguage"];
        }
        if (g["contentType"] !== undefined) {
          body["contentType"] = g["contentType"];
        }
        if (g["fetchSchedule"] !== undefined) {
          body["fetchSchedule"] = g["fetchSchedule"];
        }
        if (g["fileName"] !== undefined) body["fileName"] = g["fileName"];
        if (g["format"] !== undefined) body["format"] = g["format"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["targets"] !== undefined) body["targets"] = g["targets"];
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
      description: "Delete the datafeeds",
      arguments: z.object({
        identifier: z.string().describe("The name of the datafeeds"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["merchantId"] !== undefined) {
          params["merchantId"] = String(g["merchantId"]);
        }
        params["datafeedId"] = args.identifier;
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
      description: "Sync datafeeds state from GCP",
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
          if (g["merchantId"] !== undefined) {
            params["merchantId"] = String(g["merchantId"]);
          } else if (existing["merchantId"]) {
            params["merchantId"] = String(existing["merchantId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["datafeedId"] = identifier;
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
    custombatch: {
      description: "custombatch",
      arguments: z.object({
        entries: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (args["entries"] !== undefined) body["entries"] = args["entries"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "content.datafeeds.custombatch",
            "path": "datafeeds/batch",
            "httpMethod": "POST",
            "parameterOrder": [],
            "parameters": {},
          },
          params,
          body,
        );
        return { result };
      },
    },
    fetchnow: {
      description: "fetchnow",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["merchantId"] !== undefined) {
          params["merchantId"] = String(g["merchantId"]);
        }
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["datafeedId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "content.datafeeds.fetchnow",
            "path": "{merchantId}/datafeeds/{datafeedId}/fetchNow",
            "httpMethod": "POST",
            "parameterOrder": ["merchantId", "datafeedId"],
            "parameters": {
              "datafeedId": { "location": "path", "required": true },
              "merchantId": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
  },
};
