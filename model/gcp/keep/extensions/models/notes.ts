// Auto-generated extension model for @swamp/gcp/keep/notes
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Keep Notes.
 *
 * A single note.
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
  listResources,
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://keep.googleapis.com/";

const GET_CONFIG = {
  "id": "keep.notes.get",
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
  "id": "keep.notes.create",
  "path": "v1/notes",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {},
} as const;

const DELETE_CONFIG = {
  "id": "keep.notes.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
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

const LIST_CONFIG = {
  "id": "keep.notes.list",
  "path": "v1/notes",
  "httpMethod": "GET",
  "parameterOrder": [],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  body: z.object({
    list: z.object({
      listItems: z.array(z.object({
        checked: z.boolean().describe(
          "Whether this item has been checked off or not.",
        ).optional(),
        childListItems: z.array(z.unknown()).describe(
          "If set, list of list items nested under this list item. Only one level of nesting is allowed.",
        ).optional(),
        text: z.object({
          text: z.unknown().describe(
            "The text of the note. The limits on this vary with the specific field using this type.",
          ).optional(),
        }).describe("The block of text for a single text section or list item.")
          .optional(),
      })).describe(
        "The items in the list. The number of items must be less than 1,000.",
      ).optional(),
    }).describe("The list of items for a single list note.").optional(),
    text: z.object({
      text: z.string().describe(
        "The text of the note. The limits on this vary with the specific field using this type.",
      ).optional(),
    }).describe("The block of text for a single text section or list item.")
      .optional(),
  }).describe("The content of the note.").optional(),
  title: z.string().describe(
    "The title of the note. Length must be less than 1,000 characters.",
  ).optional(),
});

const StateSchema = z.object({
  attachments: z.array(z.object({
    mimeType: z.array(z.string()),
    name: z.string(),
  })).optional(),
  body: z.object({
    list: z.object({
      listItems: z.array(z.object({
        checked: z.boolean(),
        childListItems: z.array(z.unknown()),
        text: z.object({
          text: z.unknown(),
        }),
      })),
    }),
    text: z.object({
      text: z.string(),
    }),
  }).optional(),
  createTime: z.string().optional(),
  name: z.string(),
  permissions: z.array(z.object({
    deleted: z.boolean(),
    email: z.string(),
    family: z.object({}),
    group: z.object({
      email: z.string(),
    }),
    name: z.string(),
    role: z.string(),
    user: z.object({
      email: z.string(),
    }),
  })).optional(),
  title: z.string().optional(),
  trashTime: z.string().optional(),
  trashed: z.boolean().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  body: z.object({
    list: z.object({
      listItems: z.array(z.object({
        checked: z.boolean().describe(
          "Whether this item has been checked off or not.",
        ).optional(),
        childListItems: z.array(z.unknown()).describe(
          "If set, list of list items nested under this list item. Only one level of nesting is allowed.",
        ).optional(),
        text: z.object({
          text: z.unknown().describe(
            "The text of the note. The limits on this vary with the specific field using this type.",
          ).optional(),
        }).describe("The block of text for a single text section or list item.")
          .optional(),
      })).describe(
        "The items in the list. The number of items must be less than 1,000.",
      ).optional(),
    }).describe("The list of items for a single list note.").optional(),
    text: z.object({
      text: z.string().describe(
        "The text of the note. The limits on this vary with the specific field using this type.",
      ).optional(),
    }).describe("The block of text for a single text section or list item.")
      .optional(),
  }).describe("The content of the note.").optional(),
  title: z.string().describe(
    "The title of the note. Length must be less than 1,000 characters.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Google Keep Notes. Registered at `@swamp/gcp/keep/notes`. */
export const model = {
  type: "@swamp/gcp/keep/notes",
  version: "2026.05.25.2",
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
      toVersion: "2026.05.25.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A single note.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a notes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["body"] !== undefined) body["body"] = g["body"];
        if (g["title"] !== undefined) body["title"] = g["title"];
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {},
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
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
      description: "Get a notes",
      arguments: z.object({
        identifier: z.string().describe("The name of the notes"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = args.identifier;
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
    delete: {
      description: "Delete the notes",
      arguments: z.object({
        identifier: z.string().describe("The name of the notes"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = args.identifier;
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
      description: "Sync notes state from GCP",
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
          params["name"] = identifier;
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
      description: "List notes resources",
      arguments: z.object({
        filter: z.string().describe(
          "Filter for list results. If no filter is supplied, the `trashed` filter is applied by default. Valid fields to filter by are: `create_time`, `update_time`, `trash_time`, and `trashed`. Filter syntax follows the [Google AIP filtering spec](https://aip.dev/160).",
        ).optional(),
        pageSize: z.number().describe(
          "The maximum number of results to return.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "notes",
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
