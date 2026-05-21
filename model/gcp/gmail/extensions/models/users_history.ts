// Auto-generated extension model for @swamp/gcp/gmail/users-history
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Gmail Users.History.
 *
 * A record of a change to the user's mailbox. Each history change may affect multiple messages in multiple ways.
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

const BASE_URL = "https://gmail.googleapis.com/";

const LIST_CONFIG = {
  "id": "gmail.users.history.list",
  "path": "gmail/v1/users/{userId}/history",
  "httpMethod": "GET",
  "parameterOrder": [
    "userId",
  ],
  "parameters": {
    "historyTypes": {
      "location": "query",
    },
    "labelId": {
      "location": "query",
    },
    "maxResults": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "startHistoryId": {
      "location": "query",
    },
    "userId": {
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
  id: z.string().optional(),
  labelsAdded: z.array(z.object({
    labelIds: z.array(z.string()),
    message: z.object({
      classificationLabelValues: z.array(z.object({
        fields: z.unknown(),
        labelId: z.unknown(),
      })),
      historyId: z.string(),
      id: z.string(),
      internalDate: z.string(),
      labelIds: z.array(z.string()),
      payload: z.object({
        body: z.object({
          attachmentId: z.unknown(),
          data: z.unknown(),
          size: z.unknown(),
        }),
        filename: z.string(),
        headers: z.array(z.unknown()),
        mimeType: z.string(),
        partId: z.string(),
        parts: z.array(z.unknown()),
      }),
      raw: z.string(),
      sizeEstimate: z.number(),
      snippet: z.string(),
      threadId: z.string(),
    }),
  })).optional(),
  labelsRemoved: z.array(z.object({
    labelIds: z.array(z.string()),
    message: z.object({
      classificationLabelValues: z.array(z.object({
        fields: z.unknown(),
        labelId: z.unknown(),
      })),
      historyId: z.string(),
      id: z.string(),
      internalDate: z.string(),
      labelIds: z.array(z.string()),
      payload: z.object({
        body: z.object({
          attachmentId: z.unknown(),
          data: z.unknown(),
          size: z.unknown(),
        }),
        filename: z.string(),
        headers: z.array(z.unknown()),
        mimeType: z.string(),
        partId: z.string(),
        parts: z.array(z.unknown()),
      }),
      raw: z.string(),
      sizeEstimate: z.number(),
      snippet: z.string(),
      threadId: z.string(),
    }),
  })).optional(),
  messages: z.array(z.object({
    classificationLabelValues: z.array(z.object({
      fields: z.array(z.unknown()),
      labelId: z.string(),
    })),
    historyId: z.string(),
    id: z.string(),
    internalDate: z.string(),
    labelIds: z.array(z.string()),
    payload: z.object({
      body: z.object({
        attachmentId: z.string(),
        data: z.string(),
        size: z.number(),
      }),
      filename: z.string(),
      headers: z.array(z.object({
        name: z.unknown(),
        value: z.unknown(),
      })),
      mimeType: z.string(),
      partId: z.string(),
      parts: z.array(z.string()),
    }),
    raw: z.string(),
    sizeEstimate: z.number(),
    snippet: z.string(),
    threadId: z.string(),
  })).optional(),
  messagesAdded: z.array(z.object({
    message: z.object({
      classificationLabelValues: z.array(z.object({
        fields: z.unknown(),
        labelId: z.unknown(),
      })),
      historyId: z.string(),
      id: z.string(),
      internalDate: z.string(),
      labelIds: z.array(z.string()),
      payload: z.object({
        body: z.object({
          attachmentId: z.unknown(),
          data: z.unknown(),
          size: z.unknown(),
        }),
        filename: z.string(),
        headers: z.array(z.unknown()),
        mimeType: z.string(),
        partId: z.string(),
        parts: z.array(z.unknown()),
      }),
      raw: z.string(),
      sizeEstimate: z.number(),
      snippet: z.string(),
      threadId: z.string(),
    }),
  })).optional(),
  messagesDeleted: z.array(z.object({
    message: z.object({
      classificationLabelValues: z.array(z.object({
        fields: z.unknown(),
        labelId: z.unknown(),
      })),
      historyId: z.string(),
      id: z.string(),
      internalDate: z.string(),
      labelIds: z.array(z.string()),
      payload: z.object({
        body: z.object({
          attachmentId: z.unknown(),
          data: z.unknown(),
          size: z.unknown(),
        }),
        filename: z.string(),
        headers: z.array(z.unknown()),
        mimeType: z.string(),
        partId: z.string(),
        parts: z.array(z.unknown()),
      }),
      raw: z.string(),
      sizeEstimate: z.number(),
      snippet: z.string(),
      threadId: z.string(),
    }),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Gmail Users.History. Registered at `@swamp/gcp/gmail/users-history`. */
export const model = {
  type: "@swamp/gcp/gmail/users-history",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A record of a change to the user's mailbox. Each history change may affect mu...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a history",
      arguments: z.object({
        identifier: z.string().describe("The name of the history"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
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
      description: "Sync history state from GCP",
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
          if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
          else if (existing["userId"]) {
            params["userId"] = String(existing["userId"]);
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
  },
};
