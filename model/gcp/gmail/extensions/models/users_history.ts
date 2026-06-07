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
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
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
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
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
      parts: z.array(z.record(z.string(), z.unknown())),
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
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
});

const _credentialKeys = new Set(["accessToken", "credentialsJson", "project"]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Gmail Users.History. Registered at `@swamp/gcp/gmail/users-history`. */
export const model = {
  type: "@swamp/gcp/gmail/users-history",
  version: "2026.06.07.1",
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
      toVersion: "2026.05.27.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
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
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        const result = await readViaList(
          BASE_URL,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
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
    sync: {
      description: "Sync history state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
      description: "List history resources",
      arguments: z.object({
        historyTypes: z.string().describe(
          "History types to be returned by the function",
        ).optional(),
        labelId: z.string().describe(
          "Only return messages with a label matching the ID.",
        ).optional(),
        maxResults: z.number().describe(
          "Maximum number of history records to return. This field defaults to 100. The maximum allowed value for this field is 500.",
        ).optional(),
        startHistoryId: z.string().describe(
          "Required. Returns history records after the specified `startHistoryId`. The supplied `startHistoryId` should be obtained from the `historyId` of a message, thread, or previous `list` response. History IDs increase chronologically but are not contiguous with random gaps in between valid IDs. Supplying an invalid or out of date `startHistoryId` typically returns an `HTTP 404` error code. A `historyId` is typically valid for at least a week, but in some rare circumstances may be valid for only a few hours. If you receive an `HTTP 404` error response, your application should perform a full sync. If you receive no `nextPageToken` in the response, there are no updates to retrieve and you can store the returned `historyId` for a future request.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        if (args["historyTypes"] !== undefined) {
          params["historyTypes"] = String(args["historyTypes"]);
        }
        if (args["labelId"] !== undefined) {
          params["labelId"] = String(args["labelId"]);
        }
        if (args["maxResults"] !== undefined) {
          params["maxResults"] = String(args["maxResults"]);
        }
        if (args["startHistoryId"] !== undefined) {
          params["startHistoryId"] = String(args["startHistoryId"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "history",
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
