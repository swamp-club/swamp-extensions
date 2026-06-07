// Auto-generated extension model for @swamp/gcp/dialogflow/agent-environments-intents
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Dialogflow Agent.Environments.Intents.
 *
 * GCP dialogflow Agent.Environments.Intents resource
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

const BASE_URL = "https://dialogflow.googleapis.com/";

const LIST_CONFIG = {
  "id": "dialogflow.projects.agent.environments.intents.list",
  "path": "v2/{+parent}/intents",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "intentView": {
      "location": "query",
    },
    "languageCode": {
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
  action: z.string().optional(),
  defaultResponsePlatforms: z.array(z.string()).optional(),
  displayName: z.string().optional(),
  endInteraction: z.boolean().optional(),
  events: z.array(z.string()).optional(),
  followupIntentInfo: z.array(z.object({
    followupIntentName: z.string(),
    parentFollowupIntentName: z.string(),
  })).optional(),
  inputContextNames: z.array(z.string()).optional(),
  isFallback: z.boolean().optional(),
  liveAgentHandoff: z.boolean().optional(),
  messages: z.array(z.object({
    basicCard: z.object({
      buttons: z.array(z.object({
        openUriAction: z.unknown(),
        title: z.unknown(),
      })),
      formattedText: z.string(),
      image: z.object({
        accessibilityText: z.string(),
        imageUri: z.string(),
      }),
      subtitle: z.string(),
      title: z.string(),
    }),
    browseCarouselCard: z.object({
      imageDisplayOptions: z.string(),
      items: z.array(z.object({
        description: z.unknown(),
        footer: z.unknown(),
        image: z.unknown(),
        openUriAction: z.unknown(),
        title: z.unknown(),
      })),
    }),
    card: z.object({
      buttons: z.array(z.object({
        postback: z.unknown(),
        text: z.unknown(),
      })),
      imageUri: z.string(),
      subtitle: z.string(),
      title: z.string(),
    }),
    carouselSelect: z.object({
      items: z.array(z.object({
        description: z.unknown(),
        image: z.unknown(),
        info: z.unknown(),
        title: z.unknown(),
      })),
    }),
    image: z.object({
      accessibilityText: z.string(),
      imageUri: z.string(),
    }),
    linkOutSuggestion: z.object({
      destinationName: z.string(),
      uri: z.string(),
    }),
    listSelect: z.object({
      items: z.array(z.object({
        description: z.unknown(),
        image: z.unknown(),
        info: z.unknown(),
        title: z.unknown(),
      })),
      subtitle: z.string(),
      title: z.string(),
    }),
    mediaContent: z.object({
      mediaObjects: z.array(z.object({
        contentUrl: z.unknown(),
        description: z.unknown(),
        icon: z.unknown(),
        largeImage: z.unknown(),
        name: z.unknown(),
      })),
      mediaType: z.string(),
    }),
    payload: z.record(z.string(), z.unknown()),
    platform: z.string(),
    quickReplies: z.object({
      quickReplies: z.array(z.string()),
      title: z.string(),
    }),
    simpleResponses: z.object({
      simpleResponses: z.array(z.object({
        displayText: z.unknown(),
        ssml: z.unknown(),
        textToSpeech: z.unknown(),
      })),
    }),
    suggestions: z.object({
      suggestions: z.array(z.object({
        title: z.unknown(),
      })),
    }),
    tableCard: z.object({
      buttons: z.array(z.object({
        openUriAction: z.unknown(),
        title: z.unknown(),
      })),
      columnProperties: z.array(z.object({
        header: z.unknown(),
        horizontalAlignment: z.unknown(),
      })),
      image: z.object({
        accessibilityText: z.string(),
        imageUri: z.string(),
      }),
      rows: z.array(z.object({
        cells: z.unknown(),
        dividerAfter: z.unknown(),
      })),
      subtitle: z.string(),
      title: z.string(),
    }),
    text: z.object({
      text: z.array(z.string()),
    }),
  })).optional(),
  mlDisabled: z.boolean().optional(),
  name: z.string(),
  outputContexts: z.array(z.object({
    lifespanCount: z.number(),
    name: z.string(),
    parameters: z.record(z.string(), z.unknown()),
  })).optional(),
  parameters: z.array(z.object({
    defaultValue: z.string(),
    displayName: z.string(),
    entityTypeDisplayName: z.string(),
    isList: z.boolean(),
    mandatory: z.boolean(),
    name: z.string(),
    prompts: z.array(z.string()),
    value: z.string(),
  })).optional(),
  parentFollowupIntentName: z.string().optional(),
  priority: z.number().optional(),
  resetContexts: z.boolean().optional(),
  rootFollowupIntentName: z.string().optional(),
  trainingPhrases: z.array(z.object({
    name: z.string(),
    parts: z.array(z.object({
      alias: z.string(),
      entityType: z.string(),
      text: z.string(),
      userDefined: z.boolean(),
    })),
    timesAddedCount: z.number(),
    type: z.string(),
  })).optional(),
  webhookState: z.string().optional(),
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

/** Swamp extension model for Google Cloud Dialogflow Agent.Environments.Intents. Registered at `@swamp/gcp/dialogflow/agent-environments-intents`. */
export const model = {
  type: "@swamp/gcp/dialogflow/agent-environments-intents",
  version: "2026.06.07.1",
  upgrades: [
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
      description: "GCP dialogflow Agent.Environments.Intents resource",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a intents",
      arguments: z.object({
        identifier: z.string().describe("The name of the intents"),
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
      description: "Sync intents state from GCP",
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
      description: "List intents resources",
      arguments: z.object({
        intentView: z.string().optional(),
        languageCode: z.string().optional(),
        pageSize: z.number().optional(),
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
        if (args["intentView"] !== undefined) {
          params["intentView"] = String(args["intentView"]);
        }
        if (args["languageCode"] !== undefined) {
          params["languageCode"] = String(args["languageCode"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "intents",
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
