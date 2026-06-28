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

// Auto-generated extension model for @swamp/gcp/aiplatform/evaluationsets
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Agent Platform EvaluationSets.
 *
 * EvaluationSet is a collection of related EvaluationItems that are evaluated together.
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
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/evaluationSets/${shortName}`;
}

const BASE_URL = "https://aiplatform.googleapis.com/";

const GET_CONFIG = {
  "id": "aiplatform.projects.locations.evaluationSets.get",
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
  "id": "aiplatform.projects.locations.evaluationSets.create",
  "path": "v1/{+parent}/evaluationSets",
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
  "id": "aiplatform.projects.locations.evaluationSets.patch",
  "path": "v1/{+name}",
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

const DELETE_CONFIG = {
  "id": "aiplatform.projects.locations.evaluationSets.delete",
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
  "id": "aiplatform.projects.locations.evaluationSets.list",
  "path": "v1/{+parent}/evaluationSets",
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
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  agentConfigs: z.record(
    z.string(),
    z.object({
      agentId: z.string().describe(
        "Required. Unique identifier of the agent. This ID is used to refer to this agent, e.g., in AgentEvent.author, or in the `sub_agents` field. It must be unique within the `agents` map.",
      ).optional(),
      agentType: z.string().describe(
        'Optional. The type or class of the agent (e.g., "LlmAgent", "RouterAgent", "ToolUseAgent"). Useful for the autorater to understand the expected behavior of the agent.',
      ).optional(),
      description: z.string().describe(
        "Optional. A high-level description of the agent's role and responsibilities. Critical for evaluating if the agent is routing tasks correctly.",
      ).optional(),
      instruction: z.string().describe(
        "Optional. Provides instructions for the LLM model, guiding the agent's behavior. Can be static or dynamic. Dynamic instructions can contain placeholders like {variable_name} that will be resolved at runtime using the `AgentEvent.state_delta` field.",
      ).optional(),
      subAgents: z.array(z.string()).describe(
        "Optional. The list of valid agent IDs that this agent can delegate to. This defines the directed edges in the multi-agent system graph topology.",
      ).optional(),
      tools: z.array(z.object({
        codeExecution: z.object({}).describe(
          "Tool that executes code generated by the model, and automatically returns the result to the model. See also ExecutableCode and CodeExecutionResult, which are input and output to this tool.",
        ).optional(),
        computerUse: z.object({
          enablePromptInjectionDetection: z.unknown().describe(
            "Optional. Enables the prompt injection detection check on computer-use request.",
          ).optional(),
          environment: z.unknown().describe(
            "Required. The environment being operated.",
          ).optional(),
          excludedPredefinedFunctions: z.unknown().describe(
            "Optional. By default, [predefined functions](https://cloud.google.com/vertex-ai/generative-ai/docs/computer-use#supported-actions) are included in the final model call. Some of them can be explicitly excluded from being automatically included. This can serve two purposes: 1. Using a more restricted / different action space. 2. Improving the definitions / instructions of predefined functions.",
          ).optional(),
        }).describe("Tool to support computer use.").optional(),
        enterpriseWebSearch: z.object({
          blockingConfidence: z.unknown().describe(
            "Optional. Sites with confidence level chosen & above this value will be blocked from the search results.",
          ).optional(),
          excludeDomains: z.unknown().describe(
            "Optional. List of domains to be excluded from the search results. The default limit is 2000 domains.",
          ).optional(),
        }).describe(
          "Tool to search public web data, powered by Vertex AI Search and Sec4 compliance.",
        ).optional(),
        exaAiSearch: z.object({
          apiKey: z.unknown().describe("Required. The API key for ExaAiSearch.")
            .optional(),
          customConfigs: z.unknown().describe(
            "Optional. This field can be used to pass any parameter from the Exa.ai Search API.",
          ).optional(),
        }).describe(
          "ExaAiSearch tool type. A tool that uses the Exa.ai search engine for grounding.",
        ).optional(),
        functionDeclarations: z.array(z.unknown()).describe(
          "Optional. Function tool type. One or more function declarations to be passed to the model along with the current user query. Model may decide to call a subset of these functions by populating FunctionCall in the response. User should provide a FunctionResponse for each function call in the next turn. Based on the function responses, Model will generate the final response back to the user. Maximum 512 function declarations can be provided.",
        ).optional(),
        googleMaps: z.object({
          enableWidget: z.unknown().describe(
            "Optional. Deprecated: The Google Maps contextual widget behavior in Grounding with Google Maps is being deprecated; this field is planned for removal and no longer has any effect once removed. If true, include the widget context token in the response.",
          ).optional(),
        }).describe(
          "Tool to retrieve public maps data for grounding, powered by Google.",
        ).optional(),
        googleSearch: z.object({
          blockingConfidence: z.unknown().describe(
            "Optional. Sites with confidence level chosen & above this value will be blocked from the search results.",
          ).optional(),
          excludeDomains: z.unknown().describe(
            'Optional. List of domains to be excluded from the search results. The default limit is 2000 domains. Example: ["amazon.com", "facebook.com"].',
          ).optional(),
          searchTypes: z.unknown().describe(
            "Different types of search that can be enabled on the GoogleSearch tool.",
          ).optional(),
        }).describe(
          "GoogleSearch tool type. Tool to support Google Search in Model. Powered by Google.",
        ).optional(),
        googleSearchRetrieval: z.object({
          dynamicRetrievalConfig: z.unknown().describe(
            "Describes the options to customize dynamic retrieval.",
          ).optional(),
        }).describe(
          "Tool to retrieve public web data for grounding, powered by Google.",
        ).optional(),
        parallelAiSearch: z.object({
          apiKey: z.unknown().describe(
            "Optional. The API key for ParallelAiSearch. If an API key is not provided, the system will attempt to verify access by checking for an active Parallel.ai subscription through the Google Cloud Marketplace. See https://docs.parallel.ai/search/search-quickstart for more details.",
          ).optional(),
          customConfigs: z.unknown().describe(
            'Optional. Custom configs for ParallelAiSearch. This field can be used to pass any parameter from the Parallel.ai Search API. See the Parallel.ai documentation for the full list of available parameters and their usage: https://docs.parallel.ai/api-reference/search-beta/search Currently only `source_policy`, `excerpts`, `max_results`, `mode`, `fetch_policy` can be set via this field. For example: { "source_policy": { "include_domains": ["google.com", "wikipedia.org"], "exclude_domains": ["example.com"] }, "fetch_policy": { "max_age_seconds": 3600 } }',
          ).optional(),
          enableDataRetention: z.unknown().describe(
            'Optional. Instructs Vertex Grounding to use Parallel\'s Zero Data Retention Marketplace product. If this value is "false" or omitted, the Parallel Web Search for Grounding standard subscription will be used. If this value is "true", the Parallel Web Search for Grounding - ZDR subscription will be used.',
          ).optional(),
        }).describe(
          "ParallelAiSearch tool type. A tool that uses the Parallel.ai search engine for grounding.",
        ).optional(),
        retrieval: z.object({
          disableAttribution: z.unknown().describe(
            "Optional. Deprecated. This option is no longer supported.",
          ).optional(),
          externalApi: z.unknown().describe(
            "Retrieve from data source powered by external API for grounding. The external API is not owned by Google, but need to follow the pre-defined API spec.",
          ).optional(),
          vertexAiSearch: z.unknown().describe(
            "Retrieve from Vertex AI Search datastore or engine for grounding. datastore and engine are mutually exclusive. See https://cloud.google.com/products/agent-builder",
          ).optional(),
          vertexRagStore: z.unknown().describe(
            "Retrieve from Vertex RAG Store for grounding.",
          ).optional(),
        }).describe(
          "Defines a retrieval tool that model can call to access external knowledge.",
        ).optional(),
        urlContext: z.object({}).describe("Tool to support URL context.")
          .optional(),
      })).describe("Optional. The list of tools available to this agent.")
        .optional(),
    }),
  ).describe(
    "Optional. Static configurations for each agent associated with the items in this set. Key: `agent_id` (matches the `author` field in `events`). Value: The static configuration of the agent.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The display name of the EvaluationSet.",
  ).optional(),
  evaluationItems: z.array(z.string()).describe(
    "Required. The EvaluationItems that are part of this dataset.",
  ).optional(),
  metadata: z.string().describe("Optional. Metadata for the EvaluationSet.")
    .optional(),
  name: z.string().describe(
    "Identifier. The resource name of the EvaluationSet. Format: `projects/{project}/locations/{location}/evaluationSets/{evaluation_set}`",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  agentConfigs: z.record(z.string(), z.unknown()).optional(),
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  evaluationItems: z.array(z.string()).optional(),
  metadata: z.string().optional(),
  name: z.string(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  agentConfigs: z.record(
    z.string(),
    z.object({
      agentId: z.string().describe(
        "Required. Unique identifier of the agent. This ID is used to refer to this agent, e.g., in AgentEvent.author, or in the `sub_agents` field. It must be unique within the `agents` map.",
      ).optional(),
      agentType: z.string().describe(
        'Optional. The type or class of the agent (e.g., "LlmAgent", "RouterAgent", "ToolUseAgent"). Useful for the autorater to understand the expected behavior of the agent.',
      ).optional(),
      description: z.string().describe(
        "Optional. A high-level description of the agent's role and responsibilities. Critical for evaluating if the agent is routing tasks correctly.",
      ).optional(),
      instruction: z.string().describe(
        "Optional. Provides instructions for the LLM model, guiding the agent's behavior. Can be static or dynamic. Dynamic instructions can contain placeholders like {variable_name} that will be resolved at runtime using the `AgentEvent.state_delta` field.",
      ).optional(),
      subAgents: z.array(z.string()).describe(
        "Optional. The list of valid agent IDs that this agent can delegate to. This defines the directed edges in the multi-agent system graph topology.",
      ).optional(),
      tools: z.array(z.object({
        codeExecution: z.object({}).describe(
          "Tool that executes code generated by the model, and automatically returns the result to the model. See also ExecutableCode and CodeExecutionResult, which are input and output to this tool.",
        ).optional(),
        computerUse: z.object({
          enablePromptInjectionDetection: z.unknown().describe(
            "Optional. Enables the prompt injection detection check on computer-use request.",
          ).optional(),
          environment: z.unknown().describe(
            "Required. The environment being operated.",
          ).optional(),
          excludedPredefinedFunctions: z.unknown().describe(
            "Optional. By default, [predefined functions](https://cloud.google.com/vertex-ai/generative-ai/docs/computer-use#supported-actions) are included in the final model call. Some of them can be explicitly excluded from being automatically included. This can serve two purposes: 1. Using a more restricted / different action space. 2. Improving the definitions / instructions of predefined functions.",
          ).optional(),
        }).describe("Tool to support computer use.").optional(),
        enterpriseWebSearch: z.object({
          blockingConfidence: z.unknown().describe(
            "Optional. Sites with confidence level chosen & above this value will be blocked from the search results.",
          ).optional(),
          excludeDomains: z.unknown().describe(
            "Optional. List of domains to be excluded from the search results. The default limit is 2000 domains.",
          ).optional(),
        }).describe(
          "Tool to search public web data, powered by Vertex AI Search and Sec4 compliance.",
        ).optional(),
        exaAiSearch: z.object({
          apiKey: z.unknown().describe("Required. The API key for ExaAiSearch.")
            .optional(),
          customConfigs: z.unknown().describe(
            "Optional. This field can be used to pass any parameter from the Exa.ai Search API.",
          ).optional(),
        }).describe(
          "ExaAiSearch tool type. A tool that uses the Exa.ai search engine for grounding.",
        ).optional(),
        functionDeclarations: z.array(z.unknown()).describe(
          "Optional. Function tool type. One or more function declarations to be passed to the model along with the current user query. Model may decide to call a subset of these functions by populating FunctionCall in the response. User should provide a FunctionResponse for each function call in the next turn. Based on the function responses, Model will generate the final response back to the user. Maximum 512 function declarations can be provided.",
        ).optional(),
        googleMaps: z.object({
          enableWidget: z.unknown().describe(
            "Optional. Deprecated: The Google Maps contextual widget behavior in Grounding with Google Maps is being deprecated; this field is planned for removal and no longer has any effect once removed. If true, include the widget context token in the response.",
          ).optional(),
        }).describe(
          "Tool to retrieve public maps data for grounding, powered by Google.",
        ).optional(),
        googleSearch: z.object({
          blockingConfidence: z.unknown().describe(
            "Optional. Sites with confidence level chosen & above this value will be blocked from the search results.",
          ).optional(),
          excludeDomains: z.unknown().describe(
            'Optional. List of domains to be excluded from the search results. The default limit is 2000 domains. Example: ["amazon.com", "facebook.com"].',
          ).optional(),
          searchTypes: z.unknown().describe(
            "Different types of search that can be enabled on the GoogleSearch tool.",
          ).optional(),
        }).describe(
          "GoogleSearch tool type. Tool to support Google Search in Model. Powered by Google.",
        ).optional(),
        googleSearchRetrieval: z.object({
          dynamicRetrievalConfig: z.unknown().describe(
            "Describes the options to customize dynamic retrieval.",
          ).optional(),
        }).describe(
          "Tool to retrieve public web data for grounding, powered by Google.",
        ).optional(),
        parallelAiSearch: z.object({
          apiKey: z.unknown().describe(
            "Optional. The API key for ParallelAiSearch. If an API key is not provided, the system will attempt to verify access by checking for an active Parallel.ai subscription through the Google Cloud Marketplace. See https://docs.parallel.ai/search/search-quickstart for more details.",
          ).optional(),
          customConfigs: z.unknown().describe(
            'Optional. Custom configs for ParallelAiSearch. This field can be used to pass any parameter from the Parallel.ai Search API. See the Parallel.ai documentation for the full list of available parameters and their usage: https://docs.parallel.ai/api-reference/search-beta/search Currently only `source_policy`, `excerpts`, `max_results`, `mode`, `fetch_policy` can be set via this field. For example: { "source_policy": { "include_domains": ["google.com", "wikipedia.org"], "exclude_domains": ["example.com"] }, "fetch_policy": { "max_age_seconds": 3600 } }',
          ).optional(),
          enableDataRetention: z.unknown().describe(
            'Optional. Instructs Vertex Grounding to use Parallel\'s Zero Data Retention Marketplace product. If this value is "false" or omitted, the Parallel Web Search for Grounding standard subscription will be used. If this value is "true", the Parallel Web Search for Grounding - ZDR subscription will be used.',
          ).optional(),
        }).describe(
          "ParallelAiSearch tool type. A tool that uses the Parallel.ai search engine for grounding.",
        ).optional(),
        retrieval: z.object({
          disableAttribution: z.unknown().describe(
            "Optional. Deprecated. This option is no longer supported.",
          ).optional(),
          externalApi: z.unknown().describe(
            "Retrieve from data source powered by external API for grounding. The external API is not owned by Google, but need to follow the pre-defined API spec.",
          ).optional(),
          vertexAiSearch: z.unknown().describe(
            "Retrieve from Vertex AI Search datastore or engine for grounding. datastore and engine are mutually exclusive. See https://cloud.google.com/products/agent-builder",
          ).optional(),
          vertexRagStore: z.unknown().describe(
            "Retrieve from Vertex RAG Store for grounding.",
          ).optional(),
        }).describe(
          "Defines a retrieval tool that model can call to access external knowledge.",
        ).optional(),
        urlContext: z.object({}).describe("Tool to support URL context.")
          .optional(),
      })).describe("Optional. The list of tools available to this agent.")
        .optional(),
    }),
  ).describe(
    "Optional. Static configurations for each agent associated with the items in this set. Key: `agent_id` (matches the `author` field in `events`). Value: The static configuration of the agent.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The display name of the EvaluationSet.",
  ).optional(),
  evaluationItems: z.array(z.string()).describe(
    "Required. The EvaluationItems that are part of this dataset.",
  ).optional(),
  metadata: z.string().describe("Optional. Metadata for the EvaluationSet.")
    .optional(),
  name: z.string().describe(
    "Identifier. The resource name of the EvaluationSet. Format: `projects/{project}/locations/{location}/evaluationSets/{evaluation_set}`",
  ).optional(),
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

/** Swamp extension model for Google Cloud Agent Platform EvaluationSets. Registered at `@swamp/gcp/aiplatform/evaluationsets`. */
export const model = {
  type: "@swamp/gcp/aiplatform/evaluationsets",
  version: "2026.06.27.1",
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
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.18.1",
      description: "Added: agentConfigs",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.27.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "EvaluationSet is a collection of related EvaluationItems that are evaluated t...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a evaluationSets",
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
        if (g["agentConfigs"] !== undefined) {
          body["agentConfigs"] = g["agentConfigs"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["evaluationItems"] !== undefined) {
          body["evaluationItems"] = g["evaluationItems"];
        }
        if (g["metadata"] !== undefined) body["metadata"] = g["metadata"];
        if (g["name"] !== undefined) body["name"] = g["name"];
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
      description: "Get a evaluationSets",
      arguments: z.object({
        identifier: z.string().describe("The name of the evaluationSets"),
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
    update: {
      description: "Update evaluationSets attributes",
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
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["agentConfigs"] !== undefined) {
          body["agentConfigs"] = g["agentConfigs"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["evaluationItems"] !== undefined) {
          body["evaluationItems"] = g["evaluationItems"];
        }
        if (g["metadata"] !== undefined) body["metadata"] = g["metadata"];
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
          undefined,
          credentials,
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
      description: "Delete the evaluationSets",
      arguments: z.object({
        identifier: z.string().describe("The name of the evaluationSets"),
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
      description: "Sync evaluationSets state from GCP",
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
      description: "List evaluationSets resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. Filter expression that matches a subset of the EvaluationSets to show. For field names both snake_case and camelCase are supported. For more information about filter syntax, see [AIP-160](https://google.aip.dev/160).",
        ).optional(),
        orderBy: z.string().describe(
          "Optional. A comma-separated list of fields to order by, sorted in ascending order by default. Use `desc` after a field name for descending.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The maximum number of Evaluation Sets to return.",
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
          "evaluationSets",
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
    import: {
      description: "import",
      arguments: z.object({
        agentEngineSource: z.any().optional(),
        bigquerySource: z.any().optional(),
        cloudTraceSource: z.any().optional(),
        evaluationSet: z.any().optional(),
        gcsDestination: z.any().optional(),
        gcsSource: z.any().optional(),
        inlineSource: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["agentEngineSource"] !== undefined) {
          body["agentEngineSource"] = args["agentEngineSource"];
        }
        if (args["bigquerySource"] !== undefined) {
          body["bigquerySource"] = args["bigquerySource"];
        }
        if (args["cloudTraceSource"] !== undefined) {
          body["cloudTraceSource"] = args["cloudTraceSource"];
        }
        if (args["evaluationSet"] !== undefined) {
          body["evaluationSet"] = args["evaluationSet"];
        }
        if (args["gcsDestination"] !== undefined) {
          body["gcsDestination"] = args["gcsDestination"];
        }
        if (args["gcsSource"] !== undefined) {
          body["gcsSource"] = args["gcsSource"];
        }
        if (args["inlineSource"] !== undefined) {
          body["inlineSource"] = args["inlineSource"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "aiplatform.projects.locations.evaluationSets.import",
            "path": "v1/{+parent}/evaluationSets:import",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
  },
};
