// Auto-generated extension model for @swamp/gcp/dialogflow/agents-testcases
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Dialogflow Agents.TestCases.
 *
 * GCP dialogflow Agents.TestCases resource
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
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/testCases/${shortName}`;
}

const BASE_URL = "https://dialogflow.googleapis.com/";

const GET_CONFIG = {
  "id": "dialogflow.projects.locations.agents.testCases.get",
  "path": "v3/{+name}",
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
  "id": "dialogflow.projects.locations.agents.testCases.create",
  "path": "v3/{+parent}/testCases",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "dialogflow.projects.locations.agents.testCases.patch",
  "path": "v3/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  creationTime: z.string().optional(),
  displayName: z.string().optional(),
  lastTestResult: z.object({
    conversationTurns: z.array(z.object({
      userInput: z.object({
        enableSentimentAnalysis: z.boolean().optional(),
        injectedParameters: z.record(z.string(), z.unknown()).optional(),
        input: z.object({
          audio: z.unknown().optional(),
          dtmf: z.unknown().optional(),
          event: z.unknown().optional(),
          intent: z.unknown().optional(),
          languageCode: z.unknown().optional(),
          text: z.unknown().optional(),
          toolCallResult: z.unknown().optional(),
        }).optional(),
        isWebhookEnabled: z.boolean().optional(),
      }).optional(),
      virtualAgentOutput: z.object({
        currentPage: z.object({
          advancedSettings: z.unknown().optional(),
          description: z.unknown().optional(),
          displayName: z.unknown().optional(),
          entryFulfillment: z.unknown().optional(),
          eventHandlers: z.unknown().optional(),
          form: z.unknown().optional(),
          knowledgeConnectorSettings: z.unknown().optional(),
          name: z.unknown().optional(),
          transitionRouteGroups: z.unknown().optional(),
          transitionRoutes: z.unknown().optional(),
        }).optional(),
        diagnosticInfo: z.record(z.string(), z.unknown()).optional(),
        differences: z.array(z.unknown()).optional(),
        sessionParameters: z.record(z.string(), z.unknown()).optional(),
        status: z.object({
          code: z.unknown().optional(),
          details: z.unknown().optional(),
          message: z.unknown().optional(),
        }).optional(),
        textResponses: z.array(z.unknown()).optional(),
        triggeredIntent: z.object({
          description: z.unknown().optional(),
          displayName: z.unknown().optional(),
          dtmfPattern: z.unknown().optional(),
          isFallback: z.unknown().optional(),
          labels: z.unknown().optional(),
          name: z.unknown().optional(),
          parameters: z.unknown().optional(),
          priority: z.unknown().optional(),
          trainingPhrases: z.unknown().optional(),
        }).optional(),
      }).optional(),
    })).optional(),
    environment: z.string().optional(),
    name: z.string().optional(),
    testResult: z.enum(["TEST_RESULT_UNSPECIFIED", "PASSED", "FAILED"])
      .optional(),
    testTime: z.string().optional(),
  }).optional(),
  name: z.string().optional(),
  notes: z.string().optional(),
  tags: z.array(z.string()).optional(),
  testCaseConversationTurns: z.array(z.object({
    userInput: z.object({
      enableSentimentAnalysis: z.boolean().optional(),
      injectedParameters: z.record(z.string(), z.string()).optional(),
      input: z.object({
        audio: z.object({
          audio: z.unknown().optional(),
          config: z.unknown().optional(),
        }).optional(),
        dtmf: z.object({
          digits: z.unknown().optional(),
          finishDigit: z.unknown().optional(),
        }).optional(),
        event: z.object({
          event: z.unknown().optional(),
        }).optional(),
        intent: z.object({
          intent: z.unknown().optional(),
        }).optional(),
        languageCode: z.string().optional(),
        text: z.object({
          text: z.unknown().optional(),
        }).optional(),
        toolCallResult: z.object({
          action: z.unknown().optional(),
          error: z.unknown().optional(),
          outputParameters: z.unknown().optional(),
          tool: z.unknown().optional(),
        }).optional(),
      }).optional(),
      isWebhookEnabled: z.boolean().optional(),
    }).optional(),
    virtualAgentOutput: z.object({
      currentPage: z.object({
        advancedSettings: z.object({
          audioExportGcsDestination: z.unknown().optional(),
          dtmfSettings: z.unknown().optional(),
          loggingSettings: z.unknown().optional(),
          speechSettings: z.unknown().optional(),
        }).optional(),
        description: z.string().optional(),
        displayName: z.string().optional(),
        entryFulfillment: z.object({
          advancedSettings: z.unknown().optional(),
          conditionalCases: z.unknown().optional(),
          enableGenerativeFallback: z.unknown().optional(),
          generators: z.unknown().optional(),
          messages: z.unknown().optional(),
          returnPartialResponses: z.unknown().optional(),
          setParameterActions: z.unknown().optional(),
          tag: z.unknown().optional(),
          webhook: z.unknown().optional(),
        }).optional(),
        eventHandlers: z.array(z.unknown()).optional(),
        form: z.object({
          parameters: z.unknown().optional(),
        }).optional(),
        knowledgeConnectorSettings: z.object({
          dataStoreConnections: z.unknown().optional(),
          enabled: z.unknown().optional(),
          targetFlow: z.unknown().optional(),
          targetPage: z.unknown().optional(),
          triggerFulfillment: z.unknown().optional(),
        }).optional(),
        name: z.string().optional(),
        transitionRouteGroups: z.array(z.unknown()).optional(),
        transitionRoutes: z.array(z.unknown()).optional(),
      }).optional(),
      diagnosticInfo: z.record(z.string(), z.string()).optional(),
      differences: z.array(z.object({
        description: z.unknown().optional(),
        type: z.unknown().optional(),
      })).optional(),
      sessionParameters: z.record(z.string(), z.string()).optional(),
      status: z.object({
        code: z.number().int().optional(),
        details: z.array(z.unknown()).optional(),
        message: z.string().optional(),
      }).optional(),
      textResponses: z.array(z.object({
        allowPlaybackInterruption: z.unknown().optional(),
        text: z.unknown().optional(),
      })).optional(),
      triggeredIntent: z.object({
        description: z.string().optional(),
        displayName: z.string().optional(),
        dtmfPattern: z.string().optional(),
        isFallback: z.boolean().optional(),
        labels: z.record(z.string(), z.unknown()).optional(),
        name: z.string().optional(),
        parameters: z.array(z.unknown()).optional(),
        priority: z.number().int().optional(),
        trainingPhrases: z.array(z.unknown()).optional(),
      }).optional(),
    }).optional(),
  })).optional(),
  testConfig: z.object({
    flow: z.string().optional(),
    page: z.string().optional(),
    trackingParameters: z.array(z.string()).optional(),
  }).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  creationTime: z.string().optional(),
  displayName: z.string().optional(),
  lastTestResult: z.object({
    conversationTurns: z.array(z.object({
      userInput: z.object({
        enableSentimentAnalysis: z.boolean(),
        injectedParameters: z.record(z.string(), z.unknown()),
        input: z.object({
          audio: z.unknown(),
          dtmf: z.unknown(),
          event: z.unknown(),
          intent: z.unknown(),
          languageCode: z.unknown(),
          text: z.unknown(),
          toolCallResult: z.unknown(),
        }),
        isWebhookEnabled: z.boolean(),
      }),
      virtualAgentOutput: z.object({
        currentPage: z.object({
          advancedSettings: z.unknown(),
          description: z.unknown(),
          displayName: z.unknown(),
          entryFulfillment: z.unknown(),
          eventHandlers: z.unknown(),
          form: z.unknown(),
          knowledgeConnectorSettings: z.unknown(),
          name: z.unknown(),
          transitionRouteGroups: z.unknown(),
          transitionRoutes: z.unknown(),
        }),
        diagnosticInfo: z.record(z.string(), z.unknown()),
        differences: z.array(z.unknown()),
        sessionParameters: z.record(z.string(), z.unknown()),
        status: z.object({
          code: z.unknown(),
          details: z.unknown(),
          message: z.unknown(),
        }),
        textResponses: z.array(z.unknown()),
        triggeredIntent: z.object({
          description: z.unknown(),
          displayName: z.unknown(),
          dtmfPattern: z.unknown(),
          isFallback: z.unknown(),
          labels: z.unknown(),
          name: z.unknown(),
          parameters: z.unknown(),
          priority: z.unknown(),
          trainingPhrases: z.unknown(),
        }),
      }),
    })),
    environment: z.string(),
    name: z.string(),
    testResult: z.string(),
    testTime: z.string(),
  }).optional(),
  name: z.string(),
  notes: z.string().optional(),
  tags: z.array(z.string()).optional(),
  testCaseConversationTurns: z.array(z.object({
    userInput: z.object({
      enableSentimentAnalysis: z.boolean(),
      injectedParameters: z.record(z.string(), z.unknown()),
      input: z.object({
        audio: z.object({
          audio: z.unknown(),
          config: z.unknown(),
        }),
        dtmf: z.object({
          digits: z.unknown(),
          finishDigit: z.unknown(),
        }),
        event: z.object({
          event: z.unknown(),
        }),
        intent: z.object({
          intent: z.unknown(),
        }),
        languageCode: z.string(),
        text: z.object({
          text: z.unknown(),
        }),
        toolCallResult: z.object({
          action: z.unknown(),
          error: z.unknown(),
          outputParameters: z.unknown(),
          tool: z.unknown(),
        }),
      }),
      isWebhookEnabled: z.boolean(),
    }),
    virtualAgentOutput: z.object({
      currentPage: z.object({
        advancedSettings: z.object({
          audioExportGcsDestination: z.unknown(),
          dtmfSettings: z.unknown(),
          loggingSettings: z.unknown(),
          speechSettings: z.unknown(),
        }),
        description: z.string(),
        displayName: z.string(),
        entryFulfillment: z.object({
          advancedSettings: z.unknown(),
          conditionalCases: z.unknown(),
          enableGenerativeFallback: z.unknown(),
          generators: z.unknown(),
          messages: z.unknown(),
          returnPartialResponses: z.unknown(),
          setParameterActions: z.unknown(),
          tag: z.unknown(),
          webhook: z.unknown(),
        }),
        eventHandlers: z.array(z.unknown()),
        form: z.object({
          parameters: z.unknown(),
        }),
        knowledgeConnectorSettings: z.object({
          dataStoreConnections: z.unknown(),
          enabled: z.unknown(),
          targetFlow: z.unknown(),
          targetPage: z.unknown(),
          triggerFulfillment: z.unknown(),
        }),
        name: z.string(),
        transitionRouteGroups: z.array(z.unknown()),
        transitionRoutes: z.array(z.unknown()),
      }),
      diagnosticInfo: z.record(z.string(), z.unknown()),
      differences: z.array(z.object({
        description: z.unknown(),
        type: z.unknown(),
      })),
      sessionParameters: z.record(z.string(), z.unknown()),
      status: z.object({
        code: z.number(),
        details: z.array(z.unknown()),
        message: z.string(),
      }),
      textResponses: z.array(z.object({
        allowPlaybackInterruption: z.unknown(),
        text: z.unknown(),
      })),
      triggeredIntent: z.object({
        description: z.string(),
        displayName: z.string(),
        dtmfPattern: z.string(),
        isFallback: z.boolean(),
        labels: z.record(z.string(), z.unknown()),
        name: z.string(),
        parameters: z.array(z.unknown()),
        priority: z.number(),
        trainingPhrases: z.array(z.unknown()),
      }),
    }),
  })).optional(),
  testConfig: z.object({
    flow: z.string(),
    page: z.string(),
    trackingParameters: z.array(z.string()),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  creationTime: z.string().optional(),
  displayName: z.string().optional(),
  lastTestResult: z.object({
    conversationTurns: z.array(z.object({
      userInput: z.object({
        enableSentimentAnalysis: z.boolean().optional(),
        injectedParameters: z.record(z.string(), z.unknown()).optional(),
        input: z.object({
          audio: z.unknown().optional(),
          dtmf: z.unknown().optional(),
          event: z.unknown().optional(),
          intent: z.unknown().optional(),
          languageCode: z.unknown().optional(),
          text: z.unknown().optional(),
          toolCallResult: z.unknown().optional(),
        }).optional(),
        isWebhookEnabled: z.boolean().optional(),
      }).optional(),
      virtualAgentOutput: z.object({
        currentPage: z.object({
          advancedSettings: z.unknown().optional(),
          description: z.unknown().optional(),
          displayName: z.unknown().optional(),
          entryFulfillment: z.unknown().optional(),
          eventHandlers: z.unknown().optional(),
          form: z.unknown().optional(),
          knowledgeConnectorSettings: z.unknown().optional(),
          name: z.unknown().optional(),
          transitionRouteGroups: z.unknown().optional(),
          transitionRoutes: z.unknown().optional(),
        }).optional(),
        diagnosticInfo: z.record(z.string(), z.unknown()).optional(),
        differences: z.array(z.unknown()).optional(),
        sessionParameters: z.record(z.string(), z.unknown()).optional(),
        status: z.object({
          code: z.unknown().optional(),
          details: z.unknown().optional(),
          message: z.unknown().optional(),
        }).optional(),
        textResponses: z.array(z.unknown()).optional(),
        triggeredIntent: z.object({
          description: z.unknown().optional(),
          displayName: z.unknown().optional(),
          dtmfPattern: z.unknown().optional(),
          isFallback: z.unknown().optional(),
          labels: z.unknown().optional(),
          name: z.unknown().optional(),
          parameters: z.unknown().optional(),
          priority: z.unknown().optional(),
          trainingPhrases: z.unknown().optional(),
        }).optional(),
      }).optional(),
    })).optional(),
    environment: z.string().optional(),
    name: z.string().optional(),
    testResult: z.enum(["TEST_RESULT_UNSPECIFIED", "PASSED", "FAILED"])
      .optional(),
    testTime: z.string().optional(),
  }).optional(),
  name: z.string().optional(),
  notes: z.string().optional(),
  tags: z.array(z.string()).optional(),
  testCaseConversationTurns: z.array(z.object({
    userInput: z.object({
      enableSentimentAnalysis: z.boolean().optional(),
      injectedParameters: z.record(z.string(), z.string()).optional(),
      input: z.object({
        audio: z.object({
          audio: z.unknown().optional(),
          config: z.unknown().optional(),
        }).optional(),
        dtmf: z.object({
          digits: z.unknown().optional(),
          finishDigit: z.unknown().optional(),
        }).optional(),
        event: z.object({
          event: z.unknown().optional(),
        }).optional(),
        intent: z.object({
          intent: z.unknown().optional(),
        }).optional(),
        languageCode: z.string().optional(),
        text: z.object({
          text: z.unknown().optional(),
        }).optional(),
        toolCallResult: z.object({
          action: z.unknown().optional(),
          error: z.unknown().optional(),
          outputParameters: z.unknown().optional(),
          tool: z.unknown().optional(),
        }).optional(),
      }).optional(),
      isWebhookEnabled: z.boolean().optional(),
    }).optional(),
    virtualAgentOutput: z.object({
      currentPage: z.object({
        advancedSettings: z.object({
          audioExportGcsDestination: z.unknown().optional(),
          dtmfSettings: z.unknown().optional(),
          loggingSettings: z.unknown().optional(),
          speechSettings: z.unknown().optional(),
        }).optional(),
        description: z.string().optional(),
        displayName: z.string().optional(),
        entryFulfillment: z.object({
          advancedSettings: z.unknown().optional(),
          conditionalCases: z.unknown().optional(),
          enableGenerativeFallback: z.unknown().optional(),
          generators: z.unknown().optional(),
          messages: z.unknown().optional(),
          returnPartialResponses: z.unknown().optional(),
          setParameterActions: z.unknown().optional(),
          tag: z.unknown().optional(),
          webhook: z.unknown().optional(),
        }).optional(),
        eventHandlers: z.array(z.unknown()).optional(),
        form: z.object({
          parameters: z.unknown().optional(),
        }).optional(),
        knowledgeConnectorSettings: z.object({
          dataStoreConnections: z.unknown().optional(),
          enabled: z.unknown().optional(),
          targetFlow: z.unknown().optional(),
          targetPage: z.unknown().optional(),
          triggerFulfillment: z.unknown().optional(),
        }).optional(),
        name: z.string().optional(),
        transitionRouteGroups: z.array(z.unknown()).optional(),
        transitionRoutes: z.array(z.unknown()).optional(),
      }).optional(),
      diagnosticInfo: z.record(z.string(), z.string()).optional(),
      differences: z.array(z.object({
        description: z.unknown().optional(),
        type: z.unknown().optional(),
      })).optional(),
      sessionParameters: z.record(z.string(), z.string()).optional(),
      status: z.object({
        code: z.number().int().optional(),
        details: z.array(z.unknown()).optional(),
        message: z.string().optional(),
      }).optional(),
      textResponses: z.array(z.object({
        allowPlaybackInterruption: z.unknown().optional(),
        text: z.unknown().optional(),
      })).optional(),
      triggeredIntent: z.object({
        description: z.string().optional(),
        displayName: z.string().optional(),
        dtmfPattern: z.string().optional(),
        isFallback: z.boolean().optional(),
        labels: z.record(z.string(), z.unknown()).optional(),
        name: z.string().optional(),
        parameters: z.array(z.unknown()).optional(),
        priority: z.number().int().optional(),
        trainingPhrases: z.array(z.unknown()).optional(),
      }).optional(),
    }).optional(),
  })).optional(),
  testConfig: z.object({
    flow: z.string().optional(),
    page: z.string().optional(),
    trackingParameters: z.array(z.string()).optional(),
  }).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Dialogflow Agents.TestCases. Registered at `@swamp/gcp/dialogflow/agents-testcases`. */
export const model = {
  type: "@swamp/gcp/dialogflow/agents-testcases",
  version: "2026.05.19.1",
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
      toVersion: "2026.05.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "GCP dialogflow Agents.TestCases resource",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a testCases",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["creationTime"] !== undefined) {
          body["creationTime"] = g["creationTime"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["lastTestResult"] !== undefined) {
          body["lastTestResult"] = g["lastTestResult"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["notes"] !== undefined) body["notes"] = g["notes"];
        if (g["tags"] !== undefined) body["tags"] = g["tags"];
        if (g["testCaseConversationTurns"] !== undefined) {
          body["testCaseConversationTurns"] = g["testCaseConversationTurns"];
        }
        if (g["testConfig"] !== undefined) body["testConfig"] = g["testConfig"];
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
      description: "Get a testCases",
      arguments: z.object({
        identifier: z.string().describe("The name of the testCases"),
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
      description: "Update testCases attributes",
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
        if (g["creationTime"] !== undefined) {
          body["creationTime"] = g["creationTime"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["lastTestResult"] !== undefined) {
          body["lastTestResult"] = g["lastTestResult"];
        }
        if (g["notes"] !== undefined) body["notes"] = g["notes"];
        if (g["tags"] !== undefined) body["tags"] = g["tags"];
        if (g["testCaseConversationTurns"] !== undefined) {
          body["testCaseConversationTurns"] = g["testCaseConversationTurns"];
        }
        if (g["testConfig"] !== undefined) body["testConfig"] = g["testConfig"];
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
    sync: {
      description: "Sync testCases state from GCP",
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
    batch_delete: {
      description: "batch delete",
      arguments: z.object({
        names: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["names"] !== undefined) body["names"] = args["names"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "dialogflow.projects.locations.agents.testCases.batchDelete",
            "path": "v3/{+parent}/testCases:batchDelete",
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
    batch_run: {
      description: "batch run",
      arguments: z.object({
        environment: z.any().optional(),
        testCases: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["environment"] !== undefined) {
          body["environment"] = args["environment"];
        }
        if (args["testCases"] !== undefined) {
          body["testCases"] = args["testCases"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "dialogflow.projects.locations.agents.testCases.batchRun",
            "path": "v3/{+parent}/testCases:batchRun",
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
    calculate_coverage: {
      description: "calculate coverage",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["agent"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "dialogflow.projects.locations.agents.testCases.calculateCoverage",
            "path": "v3/{+agent}/testCases:calculateCoverage",
            "httpMethod": "GET",
            "parameterOrder": ["agent"],
            "parameters": {
              "agent": { "location": "path", "required": true },
              "type": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    export: {
      description: "export",
      arguments: z.object({
        dataFormat: z.any().optional(),
        filter: z.any().optional(),
        gcsUri: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["dataFormat"] !== undefined) {
          body["dataFormat"] = args["dataFormat"];
        }
        if (args["filter"] !== undefined) body["filter"] = args["filter"];
        if (args["gcsUri"] !== undefined) body["gcsUri"] = args["gcsUri"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "dialogflow.projects.locations.agents.testCases.export",
            "path": "v3/{+parent}/testCases:export",
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
    import: {
      description: "import",
      arguments: z.object({
        content: z.any().optional(),
        gcsUri: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["content"] !== undefined) body["content"] = args["content"];
        if (args["gcsUri"] !== undefined) body["gcsUri"] = args["gcsUri"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "dialogflow.projects.locations.agents.testCases.import",
            "path": "v3/{+parent}/testCases:import",
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
    run: {
      description: "run",
      arguments: z.object({
        environment: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["environment"] !== undefined) {
          body["environment"] = args["environment"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "dialogflow.projects.locations.agents.testCases.run",
            "path": "v3/{+name}:run",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
