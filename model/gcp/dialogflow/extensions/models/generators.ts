// Auto-generated extension model for @swamp/gcp/dialogflow/generators
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Dialogflow Generators.
 *
 * GCP dialogflow Generators resource
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

const BASE_URL = "https://dialogflow.googleapis.com/";

const INSERT_CONFIG = {
  "id": "dialogflow.projects.generators.create",
  "path": "v2/{+parent}/generators",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "generatorId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "dialogflow.projects.generators.list",
  "path": "v2/{+parent}/generators",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
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
  agentCoachingContext: z.object({
    instructions: z.array(z.object({
      agentAction: z.string().optional(),
      condition: z.string().optional(),
      displayDetails: z.string().optional(),
      displayName: z.string().optional(),
      duplicateCheckResult: z.object({
        duplicateSuggestions: z.array(z.unknown()).optional(),
      }).optional(),
      systemAction: z.string().optional(),
      triggeringEvent: z.enum([
        "TRIGGER_EVENT_UNSPECIFIED",
        "END_OF_UTTERANCE",
        "MANUAL_CALL",
        "CUSTOMER_MESSAGE",
        "AGENT_MESSAGE",
        "TOOL_CALL_COMPLETION",
      ]).optional(),
    })).optional(),
    outputLanguageCode: z.string().optional(),
    overarchingGuidance: z.string().optional(),
    version: z.string().optional(),
  }).optional(),
  cesAppSpecs: z.array(z.object({
    cesApp: z.string().optional(),
    confirmationRequirement: z.enum([
      "CONFIRMATION_REQUIREMENT_UNSPECIFIED",
      "REQUIRED",
      "NOT_REQUIRED",
    ]).optional(),
    proactiveEnabled: z.boolean().optional(),
    reactiveEnabled: z.boolean().optional(),
  })).optional(),
  cesToolSpecs: z.array(z.object({
    cesTool: z.string().optional(),
    confirmationRequirement: z.enum([
      "CONFIRMATION_REQUIREMENT_UNSPECIFIED",
      "REQUIRED",
      "NOT_REQUIRED",
    ]).optional(),
  })).optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  freeFormContext: z.object({
    text: z.string().optional(),
  }).optional(),
  inferenceParameter: z.object({
    maxOutputTokens: z.number().int().optional(),
    temperature: z.number().optional(),
    topK: z.number().int().optional(),
    topP: z.number().optional(),
  }).optional(),
  name: z.string().optional(),
  publishedModel: z.string().optional(),
  suggestionDedupingConfig: z.object({
    enableDeduping: z.boolean().optional(),
    similarityThreshold: z.number().optional(),
  }).optional(),
  summarizationContext: z.object({
    fewShotExamples: z.array(z.object({
      conversationContext: z.object({
        messageEntries: z.array(z.unknown()).optional(),
      }).optional(),
      extraInfo: z.record(z.string(), z.string()).optional(),
      output: z.object({
        agentCoachingSuggestion: z.object({
          agentActionSuggestions: z.unknown().optional(),
          applicableInstructions: z.unknown().optional(),
          sampleResponses: z.unknown().optional(),
        }).optional(),
        freeFormSuggestion: z.object({
          response: z.unknown().optional(),
        }).optional(),
        summarySuggestion: z.object({
          summarySections: z.unknown().optional(),
        }).optional(),
        toolCallInfo: z.array(z.unknown()).optional(),
      }).optional(),
      summarizationSectionList: z.object({
        summarizationSections: z.array(z.unknown()).optional(),
      }).optional(),
    })).optional(),
    outputLanguageCode: z.string().optional(),
    summarizationSections: z.array(z.object({
      definition: z.string().optional(),
      key: z.string().optional(),
      type: z.enum([
        "TYPE_UNSPECIFIED",
        "SITUATION",
        "ACTION",
        "RESOLUTION",
        "REASON_FOR_CANCELLATION",
        "CUSTOMER_SATISFACTION",
        "ENTITIES",
        "CUSTOMER_DEFINED",
        "SITUATION_CONCISE",
        "ACTION_CONCISE",
      ]).optional(),
    })).optional(),
    version: z.string().optional(),
  }).optional(),
  tools: z.array(z.string()).optional(),
  toolsetTools: z.array(z.object({
    confirmationRequirement: z.enum([
      "CONFIRMATION_REQUIREMENT_UNSPECIFIED",
      "REQUIRED",
      "NOT_REQUIRED",
    ]).optional(),
    operationId: z.string().optional(),
    toolset: z.string().optional(),
  })).optional(),
  triggerEvent: z.enum([
    "TRIGGER_EVENT_UNSPECIFIED",
    "END_OF_UTTERANCE",
    "MANUAL_CALL",
    "CUSTOMER_MESSAGE",
    "AGENT_MESSAGE",
  ]).optional(),
  updateTime: z.string().optional(),
  generatorId: z.string().describe("The generatorId for this resource")
    .optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  agentCoachingContext: z.object({
    instructions: z.array(z.object({
      agentAction: z.string(),
      condition: z.string(),
      displayDetails: z.string(),
      displayName: z.string(),
      duplicateCheckResult: z.object({
        duplicateSuggestions: z.array(z.unknown()),
      }),
      systemAction: z.string(),
      triggeringEvent: z.string(),
    })),
    outputLanguageCode: z.string(),
    overarchingGuidance: z.string(),
    version: z.string(),
  }).optional(),
  cesAppSpecs: z.array(z.object({
    cesApp: z.string(),
    confirmationRequirement: z.string(),
    proactiveEnabled: z.boolean(),
    reactiveEnabled: z.boolean(),
  })).optional(),
  cesToolSpecs: z.array(z.object({
    cesTool: z.string(),
    confirmationRequirement: z.string(),
  })).optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  freeFormContext: z.object({
    text: z.string(),
  }).optional(),
  inferenceParameter: z.object({
    maxOutputTokens: z.number(),
    temperature: z.number(),
    topK: z.number(),
    topP: z.number(),
  }).optional(),
  name: z.string(),
  publishedModel: z.string().optional(),
  suggestionDedupingConfig: z.object({
    enableDeduping: z.boolean(),
    similarityThreshold: z.number(),
  }).optional(),
  summarizationContext: z.object({
    fewShotExamples: z.array(z.object({
      conversationContext: z.object({
        messageEntries: z.array(z.unknown()),
      }),
      extraInfo: z.record(z.string(), z.unknown()),
      output: z.object({
        agentCoachingSuggestion: z.object({
          agentActionSuggestions: z.unknown(),
          applicableInstructions: z.unknown(),
          sampleResponses: z.unknown(),
        }),
        freeFormSuggestion: z.object({
          response: z.unknown(),
        }),
        summarySuggestion: z.object({
          summarySections: z.unknown(),
        }),
        toolCallInfo: z.array(z.unknown()),
      }),
      summarizationSectionList: z.object({
        summarizationSections: z.array(z.unknown()),
      }),
    })),
    outputLanguageCode: z.string(),
    summarizationSections: z.array(z.object({
      definition: z.string(),
      key: z.string(),
      type: z.string(),
    })),
    version: z.string(),
  }).optional(),
  tools: z.array(z.string()).optional(),
  toolsetTools: z.array(z.object({
    confirmationRequirement: z.string(),
    operationId: z.string(),
    toolset: z.string(),
  })).optional(),
  triggerEvent: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  agentCoachingContext: z.object({
    instructions: z.array(z.object({
      agentAction: z.string().optional(),
      condition: z.string().optional(),
      displayDetails: z.string().optional(),
      displayName: z.string().optional(),
      duplicateCheckResult: z.object({
        duplicateSuggestions: z.array(z.unknown()).optional(),
      }).optional(),
      systemAction: z.string().optional(),
      triggeringEvent: z.enum([
        "TRIGGER_EVENT_UNSPECIFIED",
        "END_OF_UTTERANCE",
        "MANUAL_CALL",
        "CUSTOMER_MESSAGE",
        "AGENT_MESSAGE",
        "TOOL_CALL_COMPLETION",
      ]).optional(),
    })).optional(),
    outputLanguageCode: z.string().optional(),
    overarchingGuidance: z.string().optional(),
    version: z.string().optional(),
  }).optional(),
  cesAppSpecs: z.array(z.object({
    cesApp: z.string().optional(),
    confirmationRequirement: z.enum([
      "CONFIRMATION_REQUIREMENT_UNSPECIFIED",
      "REQUIRED",
      "NOT_REQUIRED",
    ]).optional(),
    proactiveEnabled: z.boolean().optional(),
    reactiveEnabled: z.boolean().optional(),
  })).optional(),
  cesToolSpecs: z.array(z.object({
    cesTool: z.string().optional(),
    confirmationRequirement: z.enum([
      "CONFIRMATION_REQUIREMENT_UNSPECIFIED",
      "REQUIRED",
      "NOT_REQUIRED",
    ]).optional(),
  })).optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  freeFormContext: z.object({
    text: z.string().optional(),
  }).optional(),
  inferenceParameter: z.object({
    maxOutputTokens: z.number().int().optional(),
    temperature: z.number().optional(),
    topK: z.number().int().optional(),
    topP: z.number().optional(),
  }).optional(),
  name: z.string().optional(),
  publishedModel: z.string().optional(),
  suggestionDedupingConfig: z.object({
    enableDeduping: z.boolean().optional(),
    similarityThreshold: z.number().optional(),
  }).optional(),
  summarizationContext: z.object({
    fewShotExamples: z.array(z.object({
      conversationContext: z.object({
        messageEntries: z.array(z.unknown()).optional(),
      }).optional(),
      extraInfo: z.record(z.string(), z.string()).optional(),
      output: z.object({
        agentCoachingSuggestion: z.object({
          agentActionSuggestions: z.unknown().optional(),
          applicableInstructions: z.unknown().optional(),
          sampleResponses: z.unknown().optional(),
        }).optional(),
        freeFormSuggestion: z.object({
          response: z.unknown().optional(),
        }).optional(),
        summarySuggestion: z.object({
          summarySections: z.unknown().optional(),
        }).optional(),
        toolCallInfo: z.array(z.unknown()).optional(),
      }).optional(),
      summarizationSectionList: z.object({
        summarizationSections: z.array(z.unknown()).optional(),
      }).optional(),
    })).optional(),
    outputLanguageCode: z.string().optional(),
    summarizationSections: z.array(z.object({
      definition: z.string().optional(),
      key: z.string().optional(),
      type: z.enum([
        "TYPE_UNSPECIFIED",
        "SITUATION",
        "ACTION",
        "RESOLUTION",
        "REASON_FOR_CANCELLATION",
        "CUSTOMER_SATISFACTION",
        "ENTITIES",
        "CUSTOMER_DEFINED",
        "SITUATION_CONCISE",
        "ACTION_CONCISE",
      ]).optional(),
    })).optional(),
    version: z.string().optional(),
  }).optional(),
  tools: z.array(z.string()).optional(),
  toolsetTools: z.array(z.object({
    confirmationRequirement: z.enum([
      "CONFIRMATION_REQUIREMENT_UNSPECIFIED",
      "REQUIRED",
      "NOT_REQUIRED",
    ]).optional(),
    operationId: z.string().optional(),
    toolset: z.string().optional(),
  })).optional(),
  triggerEvent: z.enum([
    "TRIGGER_EVENT_UNSPECIFIED",
    "END_OF_UTTERANCE",
    "MANUAL_CALL",
    "CUSTOMER_MESSAGE",
    "AGENT_MESSAGE",
  ]).optional(),
  updateTime: z.string().optional(),
  generatorId: z.string().describe("The generatorId for this resource")
    .optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Dialogflow Generators. Registered at `@swamp/gcp/dialogflow/generators`. */
export const model = {
  type: "@swamp/gcp/dialogflow/generators",
  version: "2026.06.05.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "GCP dialogflow Generators resource",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a generators",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["agentCoachingContext"] !== undefined) {
          body["agentCoachingContext"] = g["agentCoachingContext"];
        }
        if (g["cesAppSpecs"] !== undefined) {
          body["cesAppSpecs"] = g["cesAppSpecs"];
        }
        if (g["cesToolSpecs"] !== undefined) {
          body["cesToolSpecs"] = g["cesToolSpecs"];
        }
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["freeFormContext"] !== undefined) {
          body["freeFormContext"] = g["freeFormContext"];
        }
        if (g["inferenceParameter"] !== undefined) {
          body["inferenceParameter"] = g["inferenceParameter"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["publishedModel"] !== undefined) {
          body["publishedModel"] = g["publishedModel"];
        }
        if (g["suggestionDedupingConfig"] !== undefined) {
          body["suggestionDedupingConfig"] = g["suggestionDedupingConfig"];
        }
        if (g["summarizationContext"] !== undefined) {
          body["summarizationContext"] = g["summarizationContext"];
        }
        if (g["tools"] !== undefined) body["tools"] = g["tools"];
        if (g["toolsetTools"] !== undefined) {
          body["toolsetTools"] = g["toolsetTools"];
        }
        if (g["triggerEvent"] !== undefined) {
          body["triggerEvent"] = g["triggerEvent"];
        }
        if (g["updateTime"] !== undefined) body["updateTime"] = g["updateTime"];
        if (g["generatorId"] !== undefined) {
          body["generatorId"] = g["generatorId"];
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          undefined,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": `projects/${projectId}/locations/${
                String(g["location"] ?? "")
              }`,
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
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
      description: "Get a generators",
      arguments: z.object({
        identifier: z.string().describe("The name of the generators"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const result = await readViaList(
          BASE_URL,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
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
    sync: {
      description: "Sync generators state from GCP",
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
      description: "List generators resources",
      arguments: z.object({
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
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "generators",
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
