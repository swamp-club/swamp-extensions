// Auto-generated extension model for @swamp/gcp/androidpublisher/reviews
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Play Android Developer Reviews.
 *
 * An Android app review.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://androidpublisher.googleapis.com/";

const GET_CONFIG = {
  "id": "androidpublisher.reviews.get",
  "path": "androidpublisher/v3/applications/{packageName}/reviews/{reviewId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "packageName",
    "reviewId",
  ],
  "parameters": {
    "packageName": {
      "location": "path",
      "required": true,
    },
    "reviewId": {
      "location": "path",
      "required": true,
    },
    "translationLanguage": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "androidpublisher.reviews.list",
  "path": "androidpublisher/v3/applications/{packageName}/reviews",
  "httpMethod": "GET",
  "parameterOrder": [
    "packageName",
  ],
  "parameters": {
    "maxResults": {
      "location": "query",
    },
    "packageName": {
      "location": "path",
      "required": true,
    },
    "startIndex": {
      "location": "query",
    },
    "token": {
      "location": "query",
    },
    "translationLanguage": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
});

const StateSchema = z.object({
  authorName: z.string().optional(),
  comments: z.array(z.object({
    developerComment: z.object({
      lastModified: z.object({
        nanos: z.number(),
        seconds: z.string(),
      }),
      text: z.string(),
    }),
    userComment: z.object({
      androidOsVersion: z.number(),
      appVersionCode: z.number(),
      appVersionName: z.string(),
      device: z.string(),
      deviceMetadata: z.object({
        cpuMake: z.string(),
        cpuModel: z.string(),
        deviceClass: z.string(),
        glEsVersion: z.number(),
        manufacturer: z.string(),
        nativePlatform: z.string(),
        productName: z.string(),
        ramMb: z.number(),
        screenDensityDpi: z.number(),
        screenHeightPx: z.number(),
        screenWidthPx: z.number(),
      }),
      lastModified: z.object({
        nanos: z.number(),
        seconds: z.string(),
      }),
      originalText: z.string(),
      reviewerLanguage: z.string(),
      starRating: z.number(),
      text: z.string(),
      thumbsDownCount: z.number(),
      thumbsUpCount: z.number(),
    }),
  })).optional(),
  reviewId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Google Play Android Developer Reviews. Registered at `@swamp/gcp/androidpublisher/reviews`. */
export const model = {
  type: "@swamp/gcp/androidpublisher/reviews",
  version: "2026.05.25.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "An Android app review.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a reviews",
      arguments: z.object({
        identifier: z.string().describe("The name of the reviews"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["packageName"] !== undefined) {
          params["packageName"] = String(g["packageName"]);
        }
        params["reviewId"] = args.identifier;
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
    sync: {
      description: "Sync reviews state from GCP",
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
          if (g["packageName"] !== undefined) {
            params["packageName"] = String(g["packageName"]);
          } else if (existing["packageName"]) {
            params["packageName"] = String(existing["packageName"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["reviewId"] = identifier;
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
    list: {
      description: "List reviews resources",
      arguments: z.object({
        maxResults: z.number().describe(
          "How many results the list operation should return.",
        ).optional(),
        startIndex: z.number().describe(
          "The index of the first element to return.",
        ).optional(),
        token: z.string().describe(
          "Pagination token. If empty, list starts at the first review.",
        ).optional(),
        translationLanguage: z.string().describe("Language localization code.")
          .optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["packageName"] !== undefined) {
          params["packageName"] = String(g["packageName"]);
        }
        if (args["maxResults"] !== undefined) {
          params["maxResults"] = String(args["maxResults"]);
        }
        if (args["startIndex"] !== undefined) {
          params["startIndex"] = String(args["startIndex"]);
        }
        if (args["token"] !== undefined) {
          params["token"] = String(args["token"]);
        }
        if (args["translationLanguage"] !== undefined) {
          params["translationLanguage"] = String(args["translationLanguage"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "reviews",
          (args.maxPages as number | undefined) ?? 10,
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
    reply: {
      description: "reply",
      arguments: z.object({
        replyText: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
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
        params["packageName"] = existing["packageName"]?.toString() ??
          g["packageName"]?.toString() ?? "";
        params["reviewId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["replyText"] !== undefined) {
          body["replyText"] = args["replyText"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "androidpublisher.reviews.reply",
            "path":
              "androidpublisher/v3/applications/{packageName}/reviews/{reviewId}:reply",
            "httpMethod": "POST",
            "parameterOrder": ["packageName", "reviewId"],
            "parameters": {
              "packageName": { "location": "path", "required": true },
              "reviewId": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
