// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/gcp/dialogflow/generators-evaluations
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Dialogflow Generators.Evaluations.
 *
 * GCP dialogflow Generators.Evaluations resource
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
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/evaluations/${shortName}`;
}

const BASE_URL = "https://dialogflow.googleapis.com/";

const GET_CONFIG = {
  "id": "dialogflow.projects.locations.generators.evaluations.get",
  "path": "v2/{+name}",
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
  "id": "dialogflow.projects.locations.generators.evaluations.create",
  "path": "v2/{+parent}/evaluations",
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

const DELETE_CONFIG = {
  "id": "dialogflow.projects.locations.generators.evaluations.delete",
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
  "id": "dialogflow.projects.locations.generators.evaluations.list",
  "path": "v2/{+parent}/evaluations",
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
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  completeTime: z.string().optional(),
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  evaluationStatus: z.object({
    done: z.boolean().optional(),
    pipelineStatus: z.object({
      code: z.number().int().optional(),
      details: z.array(z.record(z.string(), z.string())).optional(),
      message: z.string().optional(),
    }).optional(),
  }).optional(),
  generatorEvaluationConfig: z.object({
    inputDataConfig: z.object({
      agentAssistInputDataConfig: z.object({
        endTime: z.string().optional(),
        startTime: z.string().optional(),
      }).optional(),
      datasetInputDataConfig: z.object({
        dataset: z.string().optional(),
      }).optional(),
      endTime: z.string().optional(),
      inputDataSourceType: z.enum([
        "INPUT_DATA_SOURCE_TYPE_UNSPECIFIED",
        "AGENT_ASSIST_CONVERSATIONS",
        "INSIGHTS_CONVERSATIONS",
      ]).optional(),
      isSummaryGenerationAllowed: z.boolean().optional(),
      sampleSize: z.number().int().optional(),
      startTime: z.string().optional(),
      summaryGenerationOption: z.enum([
        "SUMMARY_GENERATION_OPTION_UNSPECIFIED",
        "ALWAYS_GENERATE",
        "GENERATE_IF_MISSING",
        "DO_NOT_GENERATE",
      ]).optional(),
    }).optional(),
    outputGcsBucketPath: z.string().optional(),
    summarizationConfig: z.object({
      accuracyEvaluationVersion: z.string().optional(),
      completenessEvaluationVersion: z.string().optional(),
      enableAccuracyEvaluation: z.boolean().optional(),
      enableCompletenessEvaluation: z.boolean().optional(),
      evaluatorVersion: z.string().optional(),
    }).optional(),
  }).optional(),
  initialGenerator: z.object({
    agentCoachingContext: z.object({
      instructions: z.array(z.object({
        agentAction: z.string().optional(),
        condition: z.string().optional(),
        displayDetails: z.string().optional(),
        displayName: z.string().optional(),
        duplicateCheckResult: z.object({
          duplicateSuggestions: z.unknown().optional(),
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
          messageEntries: z.unknown().optional(),
        }).optional(),
        extraInfo: z.record(z.string(), z.unknown()).optional(),
        output: z.object({
          agentCoachingSuggestion: z.unknown().optional(),
          freeFormSuggestion: z.unknown().optional(),
          summarySuggestion: z.unknown().optional(),
          toolCallInfo: z.unknown().optional(),
        }).optional(),
        summarizationSectionList: z.object({
          summarizationSections: z.unknown().optional(),
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
  }).optional(),
  name: z.string().optional(),
  satisfiesPzi: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  summarizationMetrics: z.object({
    conversationDetails: z.array(z.object({
      messageEntries: z.array(z.object({
        createTime: z.unknown().optional(),
        languageCode: z.unknown().optional(),
        role: z.unknown().optional(),
        text: z.unknown().optional(),
      })).optional(),
      metricDetails: z.array(z.object({
        metric: z.unknown().optional(),
        score: z.unknown().optional(),
        sectionDetails: z.unknown().optional(),
      })).optional(),
      sectionTokens: z.array(z.object({
        section: z.unknown().optional(),
        tokenCount: z.unknown().optional(),
      })).optional(),
      summarySections: z.array(z.object({
        section: z.unknown().optional(),
        summary: z.unknown().optional(),
      })).optional(),
    })).optional(),
    overallMetrics: z.array(z.object({
      metric: z.string().optional(),
    })).optional(),
    overallSectionTokens: z.array(z.object({
      section: z.string().optional(),
      tokenCount: z.string().optional(),
    })).optional(),
    summarizationEvaluationMergedResultsUri: z.string().optional(),
    summarizationEvaluationResults: z.array(z.object({
      decompositions: z.array(z.object({
        accuracyDecomposition: z.unknown().optional(),
        adherenceDecomposition: z.unknown().optional(),
      })).optional(),
      evaluationResults: z.array(z.object({
        accuracyDecomposition: z.unknown().optional(),
        adherenceRubric: z.unknown().optional(),
        completenessRubric: z.unknown().optional(),
      })).optional(),
      metric: z.string().optional(),
      score: z.number().optional(),
      section: z.string().optional(),
      sectionSummary: z.string().optional(),
      sessionId: z.string().optional(),
    })).optional(),
  }).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  completeTime: z.string().optional(),
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  evaluationStatus: z.object({
    done: z.boolean(),
    pipelineStatus: z.object({
      code: z.number(),
      details: z.array(z.record(z.string(), z.unknown())),
      message: z.string(),
    }),
  }).optional(),
  generatorEvaluationConfig: z.object({
    inputDataConfig: z.object({
      agentAssistInputDataConfig: z.object({
        endTime: z.string(),
        startTime: z.string(),
      }),
      datasetInputDataConfig: z.object({
        dataset: z.string(),
      }),
      endTime: z.string(),
      inputDataSourceType: z.string(),
      isSummaryGenerationAllowed: z.boolean(),
      sampleSize: z.number(),
      startTime: z.string(),
      summaryGenerationOption: z.string(),
    }),
    outputGcsBucketPath: z.string(),
    summarizationConfig: z.object({
      accuracyEvaluationVersion: z.string(),
      completenessEvaluationVersion: z.string(),
      enableAccuracyEvaluation: z.boolean(),
      enableCompletenessEvaluation: z.boolean(),
      evaluatorVersion: z.string(),
    }),
  }).optional(),
  initialGenerator: z.object({
    agentCoachingContext: z.object({
      instructions: z.array(z.object({
        agentAction: z.string(),
        condition: z.string(),
        displayDetails: z.string(),
        displayName: z.string(),
        duplicateCheckResult: z.object({
          duplicateSuggestions: z.unknown(),
        }),
        systemAction: z.string(),
        triggeringEvent: z.string(),
      })),
      outputLanguageCode: z.string(),
      overarchingGuidance: z.string(),
      version: z.string(),
    }),
    cesAppSpecs: z.array(z.object({
      cesApp: z.string(),
      confirmationRequirement: z.string(),
      proactiveEnabled: z.boolean(),
      reactiveEnabled: z.boolean(),
    })),
    cesToolSpecs: z.array(z.object({
      cesTool: z.string(),
      confirmationRequirement: z.string(),
    })),
    createTime: z.string(),
    description: z.string(),
    freeFormContext: z.object({
      text: z.string(),
    }),
    inferenceParameter: z.object({
      maxOutputTokens: z.number(),
      temperature: z.number(),
      topK: z.number(),
      topP: z.number(),
    }),
    name: z.string(),
    publishedModel: z.string(),
    suggestionDedupingConfig: z.object({
      enableDeduping: z.boolean(),
      similarityThreshold: z.number(),
    }),
    summarizationContext: z.object({
      fewShotExamples: z.array(z.object({
        conversationContext: z.object({
          messageEntries: z.unknown(),
        }),
        extraInfo: z.record(z.string(), z.unknown()),
        output: z.object({
          agentCoachingSuggestion: z.unknown(),
          freeFormSuggestion: z.unknown(),
          summarySuggestion: z.unknown(),
          toolCallInfo: z.unknown(),
        }),
        summarizationSectionList: z.object({
          summarizationSections: z.unknown(),
        }),
      })),
      outputLanguageCode: z.string(),
      summarizationSections: z.array(z.object({
        definition: z.string(),
        key: z.string(),
        type: z.string(),
      })),
      version: z.string(),
    }),
    tools: z.array(z.string()),
    toolsetTools: z.array(z.object({
      confirmationRequirement: z.string(),
      operationId: z.string(),
      toolset: z.string(),
    })),
    triggerEvent: z.string(),
    updateTime: z.string(),
  }).optional(),
  name: z.string(),
  satisfiesPzi: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  summarizationMetrics: z.object({
    conversationDetails: z.array(z.object({
      messageEntries: z.array(z.object({
        createTime: z.unknown(),
        languageCode: z.unknown(),
        role: z.unknown(),
        text: z.unknown(),
      })),
      metricDetails: z.array(z.object({
        metric: z.unknown(),
        score: z.unknown(),
        sectionDetails: z.unknown(),
      })),
      sectionTokens: z.array(z.object({
        section: z.unknown(),
        tokenCount: z.unknown(),
      })),
      summarySections: z.array(z.object({
        section: z.unknown(),
        summary: z.unknown(),
      })),
    })),
    overallMetrics: z.array(z.object({
      metric: z.string(),
    })),
    overallSectionTokens: z.array(z.object({
      section: z.string(),
      tokenCount: z.string(),
    })),
    summarizationEvaluationMergedResultsUri: z.string(),
    summarizationEvaluationResults: z.array(z.object({
      decompositions: z.array(z.object({
        accuracyDecomposition: z.unknown(),
        adherenceDecomposition: z.unknown(),
      })),
      evaluationResults: z.array(z.object({
        accuracyDecomposition: z.unknown(),
        adherenceRubric: z.unknown(),
        completenessRubric: z.unknown(),
      })),
      metric: z.string(),
      score: z.number(),
      section: z.string(),
      sectionSummary: z.string(),
      sessionId: z.string(),
    })),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  completeTime: z.string().optional(),
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  evaluationStatus: z.object({
    done: z.boolean().optional(),
    pipelineStatus: z.object({
      code: z.number().int().optional(),
      details: z.array(z.record(z.string(), z.string())).optional(),
      message: z.string().optional(),
    }).optional(),
  }).optional(),
  generatorEvaluationConfig: z.object({
    inputDataConfig: z.object({
      agentAssistInputDataConfig: z.object({
        endTime: z.string().optional(),
        startTime: z.string().optional(),
      }).optional(),
      datasetInputDataConfig: z.object({
        dataset: z.string().optional(),
      }).optional(),
      endTime: z.string().optional(),
      inputDataSourceType: z.enum([
        "INPUT_DATA_SOURCE_TYPE_UNSPECIFIED",
        "AGENT_ASSIST_CONVERSATIONS",
        "INSIGHTS_CONVERSATIONS",
      ]).optional(),
      isSummaryGenerationAllowed: z.boolean().optional(),
      sampleSize: z.number().int().optional(),
      startTime: z.string().optional(),
      summaryGenerationOption: z.enum([
        "SUMMARY_GENERATION_OPTION_UNSPECIFIED",
        "ALWAYS_GENERATE",
        "GENERATE_IF_MISSING",
        "DO_NOT_GENERATE",
      ]).optional(),
    }).optional(),
    outputGcsBucketPath: z.string().optional(),
    summarizationConfig: z.object({
      accuracyEvaluationVersion: z.string().optional(),
      completenessEvaluationVersion: z.string().optional(),
      enableAccuracyEvaluation: z.boolean().optional(),
      enableCompletenessEvaluation: z.boolean().optional(),
      evaluatorVersion: z.string().optional(),
    }).optional(),
  }).optional(),
  initialGenerator: z.object({
    agentCoachingContext: z.object({
      instructions: z.array(z.object({
        agentAction: z.string().optional(),
        condition: z.string().optional(),
        displayDetails: z.string().optional(),
        displayName: z.string().optional(),
        duplicateCheckResult: z.object({
          duplicateSuggestions: z.unknown().optional(),
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
          messageEntries: z.unknown().optional(),
        }).optional(),
        extraInfo: z.record(z.string(), z.unknown()).optional(),
        output: z.object({
          agentCoachingSuggestion: z.unknown().optional(),
          freeFormSuggestion: z.unknown().optional(),
          summarySuggestion: z.unknown().optional(),
          toolCallInfo: z.unknown().optional(),
        }).optional(),
        summarizationSectionList: z.object({
          summarizationSections: z.unknown().optional(),
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
  }).optional(),
  name: z.string().optional(),
  satisfiesPzi: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  summarizationMetrics: z.object({
    conversationDetails: z.array(z.object({
      messageEntries: z.array(z.object({
        createTime: z.unknown().optional(),
        languageCode: z.unknown().optional(),
        role: z.unknown().optional(),
        text: z.unknown().optional(),
      })).optional(),
      metricDetails: z.array(z.object({
        metric: z.unknown().optional(),
        score: z.unknown().optional(),
        sectionDetails: z.unknown().optional(),
      })).optional(),
      sectionTokens: z.array(z.object({
        section: z.unknown().optional(),
        tokenCount: z.unknown().optional(),
      })).optional(),
      summarySections: z.array(z.object({
        section: z.unknown().optional(),
        summary: z.unknown().optional(),
      })).optional(),
    })).optional(),
    overallMetrics: z.array(z.object({
      metric: z.string().optional(),
    })).optional(),
    overallSectionTokens: z.array(z.object({
      section: z.string().optional(),
      tokenCount: z.string().optional(),
    })).optional(),
    summarizationEvaluationMergedResultsUri: z.string().optional(),
    summarizationEvaluationResults: z.array(z.object({
      decompositions: z.array(z.object({
        accuracyDecomposition: z.unknown().optional(),
        adherenceDecomposition: z.unknown().optional(),
      })).optional(),
      evaluationResults: z.array(z.object({
        accuracyDecomposition: z.unknown().optional(),
        adherenceRubric: z.unknown().optional(),
        completenessRubric: z.unknown().optional(),
      })).optional(),
      metric: z.string().optional(),
      score: z.number().optional(),
      section: z.string().optional(),
      sectionSummary: z.string().optional(),
      sessionId: z.string().optional(),
    })).optional(),
  }).optional(),
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

/** Swamp extension model for Google Cloud Dialogflow Generators.Evaluations. Registered at `@swamp/gcp/dialogflow/generators-evaluations`. */
export const model = {
  type: "@swamp/gcp/dialogflow/generators-evaluations",
  version: "2026.06.08.1",
  upgrades: [
    {
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "GCP dialogflow Generators.Evaluations resource",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a evaluations",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["completeTime"] !== undefined) {
          body["completeTime"] = g["completeTime"];
        }
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["evaluationStatus"] !== undefined) {
          body["evaluationStatus"] = g["evaluationStatus"];
        }
        if (g["generatorEvaluationConfig"] !== undefined) {
          body["generatorEvaluationConfig"] = g["generatorEvaluationConfig"];
        }
        if (g["initialGenerator"] !== undefined) {
          body["initialGenerator"] = g["initialGenerator"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["satisfiesPzi"] !== undefined) {
          body["satisfiesPzi"] = g["satisfiesPzi"];
        }
        if (g["satisfiesPzs"] !== undefined) {
          body["satisfiesPzs"] = g["satisfiesPzs"];
        }
        if (g["summarizationMetrics"] !== undefined) {
          body["summarizationMetrics"] = g["summarizationMetrics"];
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
          credentials,
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
      description: "Get a evaluations",
      arguments: z.object({
        identifier: z.string().describe("The name of the evaluations"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
          credentials,
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
    delete: {
      description: "Delete the evaluations",
      arguments: z.object({
        identifier: z.string().describe("The name of the evaluations"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
          credentials,
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
      description: "Sync evaluations state from GCP",
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
      description: "List evaluations resources",
      arguments: z.object({
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
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "generatorEvaluations",
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
