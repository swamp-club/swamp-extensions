// Auto-generated extension model for @swamp/gcp/translate/translations
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Cloud Translation Translations.
 *
 * Translates input text, returning translated text.
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
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://translation.googleapis.com/language/translate/";

const LIST_CONFIG = {
  "id": "language.translations.list",
  "path": "v2",
  "httpMethod": "GET",
  "parameterOrder": [
    "q",
    "target",
  ],
  "parameters": {
    "cid": {
      "location": "query",
    },
    "format": {
      "location": "query",
    },
    "model": {
      "location": "query",
    },
    "q": {
      "location": "query",
      "required": true,
    },
    "source": {
      "location": "query",
    },
    "target": {
      "location": "query",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
});

const StateSchema = z.object({
  detectedSourceLanguage: z.string().optional(),
  model: z.string().optional(),
  translatedText: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Google Cloud Translation Translations. Registered at `@swamp/gcp/translate/translations`. */
export const model = {
  type: "@swamp/gcp/translate/translations",
  version: "2026.06.05.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Translates input text, returning translated text.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a translations",
      arguments: z.object({
        identifier: z.string().describe("The name of the translations"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["q"] !== undefined) params["q"] = String(g["q"]);
        if (g["target"] !== undefined) params["target"] = String(g["target"]);
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
      description: "Sync translations state from GCP",
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
          if (g["q"] !== undefined) params["q"] = String(g["q"]);
          else if (existing["q"]) params["q"] = String(existing["q"]);
          if (g["target"] !== undefined) params["target"] = String(g["target"]);
          else if (existing["target"]) {
            params["target"] = String(existing["target"]);
          }
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
    list: {
      description: "List translations resources",
      arguments: z.object({
        cid: z.string().describe("The customization id for translate")
          .optional(),
        format: z.string().describe(
          "The format of the source text, in either HTML (default) or plain-text. A",
        ).optional(),
        model: z.string().describe(
          "The `model` type requested for this translation. Valid values are",
        ).optional(),
        q: z.string().describe(
          "The input text to translate. Repeat this parameter to perform translation",
        ).optional(),
        source: z.string().describe(
          "The language of the source text, set to one of the language codes listed in",
        ).optional(),
        target: z.string().describe(
          "The language to use for translation of the input text, set to one of the",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["q"] !== undefined) params["q"] = String(g["q"]);
        if (g["target"] !== undefined) params["target"] = String(g["target"]);
        if (args["cid"] !== undefined) params["cid"] = String(args["cid"]);
        if (args["format"] !== undefined) {
          params["format"] = String(args["format"]);
        }
        if (args["model"] !== undefined) {
          params["model"] = String(args["model"]);
        }
        if (args["q"] !== undefined) params["q"] = String(args["q"]);
        if (args["source"] !== undefined) {
          params["source"] = String(args["source"]);
        }
        if (args["target"] !== undefined) {
          params["target"] = String(args["target"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "translations",
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
    translate: {
      description: "translate",
      arguments: z.object({
        format: z.any().optional(),
        model: z.any().optional(),
        q: z.any().optional(),
        source: z.any().optional(),
        target: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (args["format"] !== undefined) body["format"] = args["format"];
        if (args["model"] !== undefined) body["model"] = args["model"];
        if (args["q"] !== undefined) body["q"] = args["q"];
        if (args["source"] !== undefined) body["source"] = args["source"];
        if (args["target"] !== undefined) body["target"] = args["target"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "language.translations.translate",
            "path": "v2",
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
  },
};
