// Auto-generated extension model for @swamp/gcp/tagmanager/accounts-containers-folders-entities
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Tag Manager Accounts.Containers.Folders.Entities.
 *
 * Represents a Google Tag Manager Tag.
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
  listResources,
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://tagmanager.googleapis.com/";

const LIST_CONFIG = {
  "id": "tagmanager.accounts.containers.folders.entities.list",
  "path":
    "tagmanager/v1/accounts/{accountId}/containers/{containerId}/folders/{folderId}/entities",
  "httpMethod": "GET",
  "parameterOrder": [
    "accountId",
    "containerId",
    "folderId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "containerId": {
      "location": "path",
      "required": true,
    },
    "folderId": {
      "location": "path",
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
  accountId: z.string().optional(),
  blockingTriggerId: z.array(z.string()).optional(),
  containerId: z.string().optional(),
  fingerprint: z.string().optional(),
  firingTriggerId: z.array(z.string()).optional(),
  liveOnly: z.boolean().optional(),
  name: z.string(),
  notes: z.string().optional(),
  parameter: z.array(z.object({
    key: z.string(),
    list: z.array(z.record(z.string(), z.unknown())),
    map: z.array(z.record(z.string(), z.unknown())),
    type: z.string(),
    value: z.string(),
  })).optional(),
  parentFolderId: z.string().optional(),
  paused: z.boolean().optional(),
  priority: z.object({
    key: z.string(),
    list: z.array(z.record(z.string(), z.unknown())),
    map: z.array(z.record(z.string(), z.unknown())),
    type: z.string(),
    value: z.string(),
  }).optional(),
  scheduleEndMs: z.string().optional(),
  scheduleStartMs: z.string().optional(),
  setupTag: z.array(z.object({
    stopOnSetupFailure: z.boolean(),
    tagName: z.string(),
  })).optional(),
  tagFiringOption: z.string().optional(),
  tagId: z.string().optional(),
  teardownTag: z.array(z.object({
    stopTeardownOnFailure: z.boolean(),
    tagName: z.string(),
  })).optional(),
  type: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Tag Manager Accounts.Containers.Folders.Entities. Registered at `@swamp/gcp/tagmanager/accounts-containers-folders-entities`. */
export const model = {
  type: "@swamp/gcp/tagmanager/accounts-containers-folders-entities",
  version: "2026.06.05.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Represents a Google Tag Manager Tag.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a entities",
      arguments: z.object({
        identifier: z.string().describe("The name of the entities"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
        if (g["containerId"] !== undefined) {
          params["containerId"] = String(g["containerId"]);
        }
        if (g["folderId"] !== undefined) {
          params["folderId"] = String(g["folderId"]);
        }
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
      description: "Sync entities state from GCP",
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
          if (g["accountId"] !== undefined) {
            params["accountId"] = String(g["accountId"]);
          } else if (existing["accountId"]) {
            params["accountId"] = String(existing["accountId"]);
          }
          if (g["containerId"] !== undefined) {
            params["containerId"] = String(g["containerId"]);
          } else if (existing["containerId"]) {
            params["containerId"] = String(existing["containerId"]);
          }
          if (g["folderId"] !== undefined) {
            params["folderId"] = String(g["folderId"]);
          } else if (existing["folderId"]) {
            params["folderId"] = String(existing["folderId"]);
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
      description: "List entities resources",
      arguments: z.object({
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
        if (g["containerId"] !== undefined) {
          params["containerId"] = String(g["containerId"]);
        }
        if (g["folderId"] !== undefined) {
          params["folderId"] = String(g["folderId"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "tag",
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
  },
};
