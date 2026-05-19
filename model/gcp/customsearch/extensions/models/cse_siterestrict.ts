// Auto-generated extension model for @swamp/gcp/customsearch/cse-siterestrict
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Custom Search Cse.Siterestrict.
 *
 * A custom search result.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  getProjectId,
  isResourceNotFoundError,
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://customsearch.googleapis.com/";

const LIST_CONFIG = {
  "id": "search.cse.siterestrict.list",
  "path": "customsearch/v1/siterestrict",
  "httpMethod": "GET",
  "parameterOrder": [],
  "parameters": {
    "c2coff": {
      "location": "query",
    },
    "cr": {
      "location": "query",
    },
    "cx": {
      "location": "query",
    },
    "dateRestrict": {
      "location": "query",
    },
    "enableAlternateSearchHandler": {
      "location": "query",
    },
    "exactTerms": {
      "location": "query",
    },
    "excludeTerms": {
      "location": "query",
    },
    "fileType": {
      "location": "query",
    },
    "filter": {
      "location": "query",
    },
    "gl": {
      "location": "query",
    },
    "googlehost": {
      "location": "query",
    },
    "highRange": {
      "location": "query",
    },
    "hl": {
      "location": "query",
    },
    "hq": {
      "location": "query",
    },
    "imgColorType": {
      "location": "query",
    },
    "imgDominantColor": {
      "location": "query",
    },
    "imgSize": {
      "location": "query",
    },
    "imgType": {
      "location": "query",
    },
    "linkSite": {
      "location": "query",
    },
    "lowRange": {
      "location": "query",
    },
    "lr": {
      "location": "query",
    },
    "num": {
      "location": "query",
    },
    "orTerms": {
      "location": "query",
    },
    "q": {
      "location": "query",
    },
    "relatedSite": {
      "location": "query",
    },
    "rights": {
      "location": "query",
    },
    "safe": {
      "location": "query",
    },
    "searchType": {
      "location": "query",
    },
    "siteSearch": {
      "location": "query",
    },
    "siteSearchFilter": {
      "location": "query",
    },
    "snippetLength": {
      "location": "query",
    },
    "sort": {
      "location": "query",
    },
    "start": {
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
  cacheId: z.string().optional(),
  displayLink: z.string().optional(),
  fileFormat: z.string().optional(),
  formattedUrl: z.string().optional(),
  htmlFormattedUrl: z.string().optional(),
  htmlSnippet: z.string().optional(),
  htmlTitle: z.string().optional(),
  image: z.object({
    byteSize: z.number(),
    contextLink: z.string(),
    height: z.number(),
    thumbnailHeight: z.number(),
    thumbnailLink: z.string(),
    thumbnailWidth: z.number(),
    width: z.number(),
  }).optional(),
  kind: z.string().optional(),
  labels: z.array(z.object({
    displayName: z.string(),
    label_with_op: z.string(),
    name: z.string(),
  })).optional(),
  link: z.string().optional(),
  mime: z.string().optional(),
  pagemap: z.record(z.string(), z.unknown()).optional(),
  snippet: z.string().optional(),
  title: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Custom Search Cse.Siterestrict. Registered at `@swamp/gcp/customsearch/cse-siterestrict`. */
export const model = {
  type: "@swamp/gcp/customsearch/cse-siterestrict",
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
      description: "A custom search result.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a siterestrict",
      arguments: z.object({
        identifier: z.string().describe("The name of the siterestrict"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        const result = await readViaList(
          BASE_URL,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
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
      description: "Sync siterestrict state from GCP",
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
          const result = await readViaList(
            BASE_URL,
            LIST_CONFIG,
            params,
            "name",
            identifier,
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
