// Auto-generated extension model for @swamp/gcp/aiplatform/reasoningengines-sessions-events
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Agent Platform ReasoningEngines.Sessions.Events.
 *
 * An event represents a message from either the user or agent.
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

const BASE_URL = "https://aiplatform.googleapis.com/";

const LIST_CONFIG = {
  "id": "aiplatform.projects.locations.reasoningEngines.sessions.events.list",
  "path": "v1/{+parent}/events",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "orderBy": {
      "location": "query",
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "parent": {
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
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  actions: z.object({
    artifactDelta: z.record(z.string(), z.unknown()),
    escalate: z.boolean(),
    requestedAuthConfigs: z.record(z.string(), z.unknown()),
    skipSummarization: z.boolean(),
    stateDelta: z.record(z.string(), z.unknown()),
    transferAgent: z.string(),
  }).optional(),
  author: z.string().optional(),
  content: z.object({
    parts: z.array(z.object({
      codeExecutionResult: z.object({
        outcome: z.string(),
        output: z.string(),
      }),
      executableCode: z.object({
        code: z.string(),
        language: z.string(),
      }),
      fileData: z.object({
        displayName: z.string(),
        fileUri: z.string(),
        mimeType: z.string(),
      }),
      functionCall: z.object({
        args: z.record(z.string(), z.unknown()),
        name: z.string(),
        partialArgs: z.array(z.unknown()),
        willContinue: z.boolean(),
      }),
      functionResponse: z.object({
        name: z.string(),
        parts: z.array(z.unknown()),
        response: z.record(z.string(), z.unknown()),
        scheduling: z.string(),
      }),
      inlineData: z.object({
        data: z.string(),
        displayName: z.string(),
        mimeType: z.string(),
      }),
      mediaResolution: z.object({
        level: z.string(),
      }),
      text: z.string(),
      thought: z.boolean(),
      thoughtSignature: z.string(),
      videoMetadata: z.object({
        endOffset: z.string(),
        fps: z.number(),
        startOffset: z.string(),
      }),
    })),
    role: z.string(),
  }).optional(),
  errorCode: z.string().optional(),
  errorMessage: z.string().optional(),
  eventMetadata: z.object({
    branch: z.string(),
    customMetadata: z.record(z.string(), z.unknown()),
    groundingMetadata: z.object({
      googleMapsWidgetContextToken: z.string(),
      groundingChunks: z.array(z.object({
        image: z.object({
          domain: z.unknown(),
          imageUri: z.unknown(),
          sourceUri: z.unknown(),
          title: z.unknown(),
        }),
        maps: z.object({
          placeAnswerSources: z.unknown(),
          placeId: z.unknown(),
          route: z.unknown(),
          text: z.unknown(),
          title: z.unknown(),
          uri: z.unknown(),
        }),
        retrievedContext: z.object({
          documentName: z.unknown(),
          ragChunk: z.unknown(),
          text: z.unknown(),
          title: z.unknown(),
          uri: z.unknown(),
        }),
        web: z.object({
          domain: z.unknown(),
          title: z.unknown(),
          uri: z.unknown(),
        }),
      })),
      groundingSupports: z.array(z.object({
        confidenceScores: z.array(z.unknown()),
        groundingChunkIndices: z.array(z.unknown()),
        renderedParts: z.array(z.unknown()),
        segment: z.object({
          endIndex: z.unknown(),
          partIndex: z.unknown(),
          startIndex: z.unknown(),
          text: z.unknown(),
        }),
      })),
      imageSearchQueries: z.array(z.string()),
      retrievalMetadata: z.object({
        googleSearchDynamicRetrievalScore: z.number(),
      }),
      searchEntryPoint: z.object({
        renderedContent: z.string(),
        sdkBlob: z.string(),
      }),
      sourceFlaggingUris: z.array(z.object({
        flagContentUri: z.string(),
        sourceId: z.string(),
      })),
      webSearchQueries: z.array(z.string()),
    }),
    inputTranscription: z.object({
      finished: z.boolean(),
      text: z.string(),
    }),
    interrupted: z.boolean(),
    longRunningToolIds: z.array(z.string()),
    outputTranscription: z.object({
      finished: z.boolean(),
      text: z.string(),
    }),
    partial: z.boolean(),
    turnComplete: z.boolean(),
  }).optional(),
  invocationId: z.string().optional(),
  name: z.string(),
  rawEvent: z.record(z.string(), z.unknown()).optional(),
  timestamp: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
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

/** Swamp extension model for Google Cloud Agent Platform ReasoningEngines.Sessions.Events. Registered at `@swamp/gcp/aiplatform/reasoningengines-sessions-events`. */
export const model = {
  type: "@swamp/gcp/aiplatform/reasoningengines-sessions-events",
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
      toVersion: "2026.05.02.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.2",
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
      toVersion: "2026.05.20.1",
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
      toVersion: "2026.05.26.1",
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
        "An event represents a message from either the user or agent.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a events",
      arguments: z.object({
        identifier: z.string().describe("The name of the events"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
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
      description: "Sync events state from GCP",
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
          if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
          else if (existing["parent"]) {
            params["parent"] = String(existing["parent"]);
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
      description: "List events resources",
      arguments: z.object({
        filter: z.string().describe(
          'Optional. The standard list filter. Supported fields: * `timestamp` range (i.e. `timestamp>="2025-01-31T11:30:00-04:00"` where the timestamp is in RFC 3339 format) More detail in [AIP-160](https://google.aip.dev/160).',
        ).optional(),
        orderBy: z.string().describe(
          'Optional. A comma-separated list of fields to order by, sorted in ascending order. Use "desc" after a field name for descending. Supported fields: * `timestamp` Example: `timestamp desc`.',
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The maximum number of events to return. The service may return fewer than this value. If unspecified, at most 100 events will be returned. These events are ordered by timestamp in ascending order.",
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
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "sessionEvents",
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
