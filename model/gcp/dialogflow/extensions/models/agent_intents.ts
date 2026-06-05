// Auto-generated extension model for @swamp/gcp/dialogflow/agent-intents
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Dialogflow Agent.Intents.
 *
 * GCP dialogflow Agent.Intents resource
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
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/intents/${shortName}`;
}

const BASE_URL = "https://dialogflow.googleapis.com/";

const GET_CONFIG = {
  "id": "dialogflow.projects.agent.intents.get",
  "path": "v2/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "intentView": {
      "location": "query",
    },
    "languageCode": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "dialogflow.projects.agent.intents.create",
  "path": "v2/{+parent}/intents",
  "httpMethod": "POST",
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
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "dialogflow.projects.agent.intents.patch",
  "path": "v2/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "intentView": {
      "location": "query",
    },
    "languageCode": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "dialogflow.projects.agent.intents.delete",
  "path": "v2/{+name}",
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
  "id": "dialogflow.projects.agent.intents.list",
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
  action: z.string().optional(),
  defaultResponsePlatforms: z.array(
    z.enum([
      "PLATFORM_UNSPECIFIED",
      "FACEBOOK",
      "SLACK",
      "TELEGRAM",
      "KIK",
      "SKYPE",
      "LINE",
      "VIBER",
      "ACTIONS_ON_GOOGLE",
      "GOOGLE_HANGOUTS",
    ]),
  ).optional(),
  displayName: z.string().optional(),
  endInteraction: z.boolean().optional(),
  events: z.array(z.string()).optional(),
  followupIntentInfo: z.array(z.object({
    followupIntentName: z.string().optional(),
    parentFollowupIntentName: z.string().optional(),
  })).optional(),
  inputContextNames: z.array(z.string()).optional(),
  isFallback: z.boolean().optional(),
  liveAgentHandoff: z.boolean().optional(),
  messages: z.array(z.object({
    basicCard: z.object({
      buttons: z.array(z.object({
        openUriAction: z.unknown().optional(),
        title: z.unknown().optional(),
      })).optional(),
      formattedText: z.string().optional(),
      image: z.object({
        accessibilityText: z.string().optional(),
        imageUri: z.string().optional(),
      }).optional(),
      subtitle: z.string().optional(),
      title: z.string().optional(),
    }).optional(),
    browseCarouselCard: z.object({
      imageDisplayOptions: z.enum([
        "IMAGE_DISPLAY_OPTIONS_UNSPECIFIED",
        "GRAY",
        "WHITE",
        "CROPPED",
        "BLURRED_BACKGROUND",
      ]).optional(),
      items: z.array(z.object({
        description: z.unknown().optional(),
        footer: z.unknown().optional(),
        image: z.unknown().optional(),
        openUriAction: z.unknown().optional(),
        title: z.unknown().optional(),
      })).optional(),
    }).optional(),
    card: z.object({
      buttons: z.array(z.object({
        postback: z.unknown().optional(),
        text: z.unknown().optional(),
      })).optional(),
      imageUri: z.string().optional(),
      subtitle: z.string().optional(),
      title: z.string().optional(),
    }).optional(),
    carouselSelect: z.object({
      items: z.array(z.object({
        description: z.unknown().optional(),
        image: z.unknown().optional(),
        info: z.unknown().optional(),
        title: z.unknown().optional(),
      })).optional(),
    }).optional(),
    image: z.object({
      accessibilityText: z.string().optional(),
      imageUri: z.string().optional(),
    }).optional(),
    linkOutSuggestion: z.object({
      destinationName: z.string().optional(),
      uri: z.string().optional(),
    }).optional(),
    listSelect: z.object({
      items: z.array(z.object({
        description: z.unknown().optional(),
        image: z.unknown().optional(),
        info: z.unknown().optional(),
        title: z.unknown().optional(),
      })).optional(),
      subtitle: z.string().optional(),
      title: z.string().optional(),
    }).optional(),
    mediaContent: z.object({
      mediaObjects: z.array(z.object({
        contentUrl: z.unknown().optional(),
        description: z.unknown().optional(),
        icon: z.unknown().optional(),
        largeImage: z.unknown().optional(),
        name: z.unknown().optional(),
      })).optional(),
      mediaType: z.enum(["RESPONSE_MEDIA_TYPE_UNSPECIFIED", "AUDIO"])
        .optional(),
    }).optional(),
    payload: z.record(z.string(), z.string()).optional(),
    platform: z.enum([
      "PLATFORM_UNSPECIFIED",
      "FACEBOOK",
      "SLACK",
      "TELEGRAM",
      "KIK",
      "SKYPE",
      "LINE",
      "VIBER",
      "ACTIONS_ON_GOOGLE",
      "GOOGLE_HANGOUTS",
    ]).optional(),
    quickReplies: z.object({
      quickReplies: z.array(z.string()).optional(),
      title: z.string().optional(),
    }).optional(),
    simpleResponses: z.object({
      simpleResponses: z.array(z.object({
        displayText: z.unknown().optional(),
        ssml: z.unknown().optional(),
        textToSpeech: z.unknown().optional(),
      })).optional(),
    }).optional(),
    suggestions: z.object({
      suggestions: z.array(z.object({
        title: z.unknown().optional(),
      })).optional(),
    }).optional(),
    tableCard: z.object({
      buttons: z.array(z.object({
        openUriAction: z.unknown().optional(),
        title: z.unknown().optional(),
      })).optional(),
      columnProperties: z.array(z.object({
        header: z.unknown().optional(),
        horizontalAlignment: z.unknown().optional(),
      })).optional(),
      image: z.object({
        accessibilityText: z.string().optional(),
        imageUri: z.string().optional(),
      }).optional(),
      rows: z.array(z.object({
        cells: z.unknown().optional(),
        dividerAfter: z.unknown().optional(),
      })).optional(),
      subtitle: z.string().optional(),
      title: z.string().optional(),
    }).optional(),
    text: z.object({
      text: z.array(z.string()).optional(),
    }).optional(),
  })).optional(),
  mlDisabled: z.boolean().optional(),
  name: z.string().optional(),
  outputContexts: z.array(z.object({
    lifespanCount: z.number().int().optional(),
    name: z.string().optional(),
    parameters: z.record(z.string(), z.string()).optional(),
  })).optional(),
  parameters: z.array(z.object({
    defaultValue: z.string().optional(),
    displayName: z.string().optional(),
    entityTypeDisplayName: z.string().optional(),
    isList: z.boolean().optional(),
    mandatory: z.boolean().optional(),
    name: z.string().optional(),
    prompts: z.array(z.string()).optional(),
    value: z.string().optional(),
  })).optional(),
  parentFollowupIntentName: z.string().optional(),
  priority: z.number().int().optional(),
  resetContexts: z.boolean().optional(),
  rootFollowupIntentName: z.string().optional(),
  trainingPhrases: z.array(z.object({
    name: z.string().optional(),
    parts: z.array(z.object({
      alias: z.string().optional(),
      entityType: z.string().optional(),
      text: z.string().optional(),
      userDefined: z.boolean().optional(),
    })).optional(),
    timesAddedCount: z.number().int().optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "EXAMPLE", "TEMPLATE"]).optional(),
  })).optional(),
  webhookState: z.enum([
    "WEBHOOK_STATE_UNSPECIFIED",
    "WEBHOOK_STATE_ENABLED",
    "WEBHOOK_STATE_ENABLED_FOR_SLOT_FILLING",
  ]).optional(),
  intentView: z.string().describe("The intentView for this resource")
    .optional(),
  languageCode: z.string().describe("The languageCode for this resource")
    .optional(),
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
  action: z.string().optional(),
  defaultResponsePlatforms: z.array(
    z.enum([
      "PLATFORM_UNSPECIFIED",
      "FACEBOOK",
      "SLACK",
      "TELEGRAM",
      "KIK",
      "SKYPE",
      "LINE",
      "VIBER",
      "ACTIONS_ON_GOOGLE",
      "GOOGLE_HANGOUTS",
    ]),
  ).optional(),
  displayName: z.string().optional(),
  endInteraction: z.boolean().optional(),
  events: z.array(z.string()).optional(),
  followupIntentInfo: z.array(z.object({
    followupIntentName: z.string().optional(),
    parentFollowupIntentName: z.string().optional(),
  })).optional(),
  inputContextNames: z.array(z.string()).optional(),
  isFallback: z.boolean().optional(),
  liveAgentHandoff: z.boolean().optional(),
  messages: z.array(z.object({
    basicCard: z.object({
      buttons: z.array(z.object({
        openUriAction: z.unknown().optional(),
        title: z.unknown().optional(),
      })).optional(),
      formattedText: z.string().optional(),
      image: z.object({
        accessibilityText: z.string().optional(),
        imageUri: z.string().optional(),
      }).optional(),
      subtitle: z.string().optional(),
      title: z.string().optional(),
    }).optional(),
    browseCarouselCard: z.object({
      imageDisplayOptions: z.enum([
        "IMAGE_DISPLAY_OPTIONS_UNSPECIFIED",
        "GRAY",
        "WHITE",
        "CROPPED",
        "BLURRED_BACKGROUND",
      ]).optional(),
      items: z.array(z.object({
        description: z.unknown().optional(),
        footer: z.unknown().optional(),
        image: z.unknown().optional(),
        openUriAction: z.unknown().optional(),
        title: z.unknown().optional(),
      })).optional(),
    }).optional(),
    card: z.object({
      buttons: z.array(z.object({
        postback: z.unknown().optional(),
        text: z.unknown().optional(),
      })).optional(),
      imageUri: z.string().optional(),
      subtitle: z.string().optional(),
      title: z.string().optional(),
    }).optional(),
    carouselSelect: z.object({
      items: z.array(z.object({
        description: z.unknown().optional(),
        image: z.unknown().optional(),
        info: z.unknown().optional(),
        title: z.unknown().optional(),
      })).optional(),
    }).optional(),
    image: z.object({
      accessibilityText: z.string().optional(),
      imageUri: z.string().optional(),
    }).optional(),
    linkOutSuggestion: z.object({
      destinationName: z.string().optional(),
      uri: z.string().optional(),
    }).optional(),
    listSelect: z.object({
      items: z.array(z.object({
        description: z.unknown().optional(),
        image: z.unknown().optional(),
        info: z.unknown().optional(),
        title: z.unknown().optional(),
      })).optional(),
      subtitle: z.string().optional(),
      title: z.string().optional(),
    }).optional(),
    mediaContent: z.object({
      mediaObjects: z.array(z.object({
        contentUrl: z.unknown().optional(),
        description: z.unknown().optional(),
        icon: z.unknown().optional(),
        largeImage: z.unknown().optional(),
        name: z.unknown().optional(),
      })).optional(),
      mediaType: z.enum(["RESPONSE_MEDIA_TYPE_UNSPECIFIED", "AUDIO"])
        .optional(),
    }).optional(),
    payload: z.record(z.string(), z.string()).optional(),
    platform: z.enum([
      "PLATFORM_UNSPECIFIED",
      "FACEBOOK",
      "SLACK",
      "TELEGRAM",
      "KIK",
      "SKYPE",
      "LINE",
      "VIBER",
      "ACTIONS_ON_GOOGLE",
      "GOOGLE_HANGOUTS",
    ]).optional(),
    quickReplies: z.object({
      quickReplies: z.array(z.string()).optional(),
      title: z.string().optional(),
    }).optional(),
    simpleResponses: z.object({
      simpleResponses: z.array(z.object({
        displayText: z.unknown().optional(),
        ssml: z.unknown().optional(),
        textToSpeech: z.unknown().optional(),
      })).optional(),
    }).optional(),
    suggestions: z.object({
      suggestions: z.array(z.object({
        title: z.unknown().optional(),
      })).optional(),
    }).optional(),
    tableCard: z.object({
      buttons: z.array(z.object({
        openUriAction: z.unknown().optional(),
        title: z.unknown().optional(),
      })).optional(),
      columnProperties: z.array(z.object({
        header: z.unknown().optional(),
        horizontalAlignment: z.unknown().optional(),
      })).optional(),
      image: z.object({
        accessibilityText: z.string().optional(),
        imageUri: z.string().optional(),
      }).optional(),
      rows: z.array(z.object({
        cells: z.unknown().optional(),
        dividerAfter: z.unknown().optional(),
      })).optional(),
      subtitle: z.string().optional(),
      title: z.string().optional(),
    }).optional(),
    text: z.object({
      text: z.array(z.string()).optional(),
    }).optional(),
  })).optional(),
  mlDisabled: z.boolean().optional(),
  name: z.string().optional(),
  outputContexts: z.array(z.object({
    lifespanCount: z.number().int().optional(),
    name: z.string().optional(),
    parameters: z.record(z.string(), z.string()).optional(),
  })).optional(),
  parameters: z.array(z.object({
    defaultValue: z.string().optional(),
    displayName: z.string().optional(),
    entityTypeDisplayName: z.string().optional(),
    isList: z.boolean().optional(),
    mandatory: z.boolean().optional(),
    name: z.string().optional(),
    prompts: z.array(z.string()).optional(),
    value: z.string().optional(),
  })).optional(),
  parentFollowupIntentName: z.string().optional(),
  priority: z.number().int().optional(),
  resetContexts: z.boolean().optional(),
  rootFollowupIntentName: z.string().optional(),
  trainingPhrases: z.array(z.object({
    name: z.string().optional(),
    parts: z.array(z.object({
      alias: z.string().optional(),
      entityType: z.string().optional(),
      text: z.string().optional(),
      userDefined: z.boolean().optional(),
    })).optional(),
    timesAddedCount: z.number().int().optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "EXAMPLE", "TEMPLATE"]).optional(),
  })).optional(),
  webhookState: z.enum([
    "WEBHOOK_STATE_UNSPECIFIED",
    "WEBHOOK_STATE_ENABLED",
    "WEBHOOK_STATE_ENABLED_FOR_SLOT_FILLING",
  ]).optional(),
  intentView: z.string().describe("The intentView for this resource")
    .optional(),
  languageCode: z.string().describe("The languageCode for this resource")
    .optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Dialogflow Agent.Intents. Registered at `@swamp/gcp/dialogflow/agent-intents`. */
export const model = {
  type: "@swamp/gcp/dialogflow/agent-intents",
  version: "2026.06.05.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "GCP dialogflow Agent.Intents resource",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a intents",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["action"] !== undefined) body["action"] = g["action"];
        if (g["defaultResponsePlatforms"] !== undefined) {
          body["defaultResponsePlatforms"] = g["defaultResponsePlatforms"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["endInteraction"] !== undefined) {
          body["endInteraction"] = g["endInteraction"];
        }
        if (g["events"] !== undefined) body["events"] = g["events"];
        if (g["followupIntentInfo"] !== undefined) {
          body["followupIntentInfo"] = g["followupIntentInfo"];
        }
        if (g["inputContextNames"] !== undefined) {
          body["inputContextNames"] = g["inputContextNames"];
        }
        if (g["isFallback"] !== undefined) body["isFallback"] = g["isFallback"];
        if (g["liveAgentHandoff"] !== undefined) {
          body["liveAgentHandoff"] = g["liveAgentHandoff"];
        }
        if (g["messages"] !== undefined) body["messages"] = g["messages"];
        if (g["mlDisabled"] !== undefined) body["mlDisabled"] = g["mlDisabled"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["outputContexts"] !== undefined) {
          body["outputContexts"] = g["outputContexts"];
        }
        if (g["parameters"] !== undefined) body["parameters"] = g["parameters"];
        if (g["parentFollowupIntentName"] !== undefined) {
          body["parentFollowupIntentName"] = g["parentFollowupIntentName"];
        }
        if (g["priority"] !== undefined) body["priority"] = g["priority"];
        if (g["resetContexts"] !== undefined) {
          body["resetContexts"] = g["resetContexts"];
        }
        if (g["rootFollowupIntentName"] !== undefined) {
          body["rootFollowupIntentName"] = g["rootFollowupIntentName"];
        }
        if (g["trainingPhrases"] !== undefined) {
          body["trainingPhrases"] = g["trainingPhrases"];
        }
        if (g["webhookState"] !== undefined) {
          body["webhookState"] = g["webhookState"];
        }
        if (g["intentView"] !== undefined) body["intentView"] = g["intentView"];
        if (g["languageCode"] !== undefined) {
          body["languageCode"] = g["languageCode"];
        }
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": `projects/${projectId}/locations/${
                String(g["location"] ?? "")
              }`,
            },
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
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
      description: "Get a intents",
      arguments: z.object({
        identifier: z.string().describe("The name of the intents"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
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
      description: "Update intents attributes",
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
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["action"] !== undefined) body["action"] = g["action"];
        if (g["defaultResponsePlatforms"] !== undefined) {
          body["defaultResponsePlatforms"] = g["defaultResponsePlatforms"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["endInteraction"] !== undefined) {
          body["endInteraction"] = g["endInteraction"];
        }
        if (g["events"] !== undefined) body["events"] = g["events"];
        if (g["followupIntentInfo"] !== undefined) {
          body["followupIntentInfo"] = g["followupIntentInfo"];
        }
        if (g["inputContextNames"] !== undefined) {
          body["inputContextNames"] = g["inputContextNames"];
        }
        if (g["isFallback"] !== undefined) body["isFallback"] = g["isFallback"];
        if (g["liveAgentHandoff"] !== undefined) {
          body["liveAgentHandoff"] = g["liveAgentHandoff"];
        }
        if (g["messages"] !== undefined) body["messages"] = g["messages"];
        if (g["mlDisabled"] !== undefined) body["mlDisabled"] = g["mlDisabled"];
        if (g["outputContexts"] !== undefined) {
          body["outputContexts"] = g["outputContexts"];
        }
        if (g["parameters"] !== undefined) body["parameters"] = g["parameters"];
        if (g["parentFollowupIntentName"] !== undefined) {
          body["parentFollowupIntentName"] = g["parentFollowupIntentName"];
        }
        if (g["priority"] !== undefined) body["priority"] = g["priority"];
        if (g["resetContexts"] !== undefined) {
          body["resetContexts"] = g["resetContexts"];
        }
        if (g["rootFollowupIntentName"] !== undefined) {
          body["rootFollowupIntentName"] = g["rootFollowupIntentName"];
        }
        if (g["trainingPhrases"] !== undefined) {
          body["trainingPhrases"] = g["trainingPhrases"];
        }
        if (g["webhookState"] !== undefined) {
          body["webhookState"] = g["webhookState"];
        }
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
          PATCH_CONFIG,
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
      description: "Delete the intents",
      arguments: z.object({
        identifier: z.string().describe("The name of the intents"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
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
      description: "Sync intents state from GCP",
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
          const shortName = existing.name?.toString() ?? g["name"]?.toString();
          if (!shortName) throw new Error("No identifier found");
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            shortName,
          );
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
        const projectId = await getProjectId();
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
    batch_delete: {
      description: "batch delete",
      arguments: z.object({
        intents: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["intents"] !== undefined) body["intents"] = args["intents"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "dialogflow.projects.agent.intents.batchDelete",
            "path": "v2/{+parent}/intents:batchDelete",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    batch_update: {
      description: "batch update",
      arguments: z.object({
        intentBatchInline: z.any().optional(),
        intentBatchUri: z.any().optional(),
        intentView: z.any().optional(),
        languageCode: z.any().optional(),
        updateMask: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["intentBatchInline"] !== undefined) {
          body["intentBatchInline"] = args["intentBatchInline"];
        }
        if (args["intentBatchUri"] !== undefined) {
          body["intentBatchUri"] = args["intentBatchUri"];
        }
        if (args["intentView"] !== undefined) {
          body["intentView"] = args["intentView"];
        }
        if (args["languageCode"] !== undefined) {
          body["languageCode"] = args["languageCode"];
        }
        if (args["updateMask"] !== undefined) {
          body["updateMask"] = args["updateMask"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "dialogflow.projects.agent.intents.batchUpdate",
            "path": "v2/{+parent}/intents:batchUpdate",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
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
