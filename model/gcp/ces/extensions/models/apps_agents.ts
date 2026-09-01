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

// Auto-generated extension model for @swamp/gcp/ces/apps-agents
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Gemini Enterprise for Customer Experience Apps.Agents.
 *
 * An agent acts as the fundamental building block that provides instructions to the Large Language Model (LLM) for executing specific tasks.
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
  return `${parent}/agents/${shortName}`;
}

const BASE_URL = "https://ces.googleapis.com/";

const GET_CONFIG = {
  "id": "ces.projects.locations.apps.agents.get",
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
  "id": "ces.projects.locations.apps.agents.create",
  "path": "v1/{+parent}/agents",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "agentId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "ces.projects.locations.apps.agents.patch",
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
  "id": "ces.projects.locations.apps.agents.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "etag": {
      "location": "query",
    },
    "force": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "ces.projects.locations.apps.agents.list",
  "path": "v1/{+parent}/agents",
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
  scopes: z.string().describe(
    "Comma-separated OAuth scopes to request when minting access tokens via gcloud. Defaults to the API's Discovery Document scopes.",
  ).optional(),
  quotaProject: z.string().describe(
    "GCP project ID for quota and billing attribution; sets the x-goog-user-project header. Overrides GOOGLE_CLOUD_QUOTA_PROJECT environment variable. Required for APIs like Cloud Identity when using user credentials.",
  ).optional(),
  apiEndpoint: z.string().describe(
    "Custom API endpoint for emulators; overrides GCP_API_ENDPOINT environment variable. Defaults to the service's production URL.",
  ).optional(),
  afterAgentCallbacks: z.array(z.object({
    description: z.string().describe(
      "Optional. Human-readable description of the callback.",
    ).optional(),
    disabled: z.boolean().describe(
      "Optional. Whether the callback is disabled. Disabled callbacks are ignored by the agent.",
    ).optional(),
    proactiveExecutionEnabled: z.boolean().describe(
      "Optional. If enabled, the callback will also be executed on intermediate model outputs. This setting only affects after model callback. **ENABLE WITH CAUTION**. Typically after model callback only needs to be executed after receiving all model responses. Enabling proactive execution may have negative implication on the execution cost and latency, and should only be enabled in rare situations.",
    ).optional(),
    pythonCode: z.string().describe(
      "Required. The python code to execute for the callback.",
    ).optional(),
  })).describe(
    "Optional. The callbacks to execute after the agent is called. The provided callbacks are executed sequentially in the exact order they are given in the list. If a callback returns an overridden response, execution stops and any remaining callbacks are skipped.",
  ).optional(),
  afterModelCallbacks: z.array(z.object({
    description: z.string().describe(
      "Optional. Human-readable description of the callback.",
    ).optional(),
    disabled: z.boolean().describe(
      "Optional. Whether the callback is disabled. Disabled callbacks are ignored by the agent.",
    ).optional(),
    proactiveExecutionEnabled: z.boolean().describe(
      "Optional. If enabled, the callback will also be executed on intermediate model outputs. This setting only affects after model callback. **ENABLE WITH CAUTION**. Typically after model callback only needs to be executed after receiving all model responses. Enabling proactive execution may have negative implication on the execution cost and latency, and should only be enabled in rare situations.",
    ).optional(),
    pythonCode: z.string().describe(
      "Required. The python code to execute for the callback.",
    ).optional(),
  })).describe(
    "Optional. The callbacks to execute after the model is called. If there are multiple calls to the model, the callback will be executed multiple times. The provided callbacks are executed sequentially in the exact order they are given in the list. If a callback returns an overridden response, execution stops and any remaining callbacks are skipped.",
  ).optional(),
  afterToolCallbacks: z.array(z.object({
    description: z.string().describe(
      "Optional. Human-readable description of the callback.",
    ).optional(),
    disabled: z.boolean().describe(
      "Optional. Whether the callback is disabled. Disabled callbacks are ignored by the agent.",
    ).optional(),
    proactiveExecutionEnabled: z.boolean().describe(
      "Optional. If enabled, the callback will also be executed on intermediate model outputs. This setting only affects after model callback. **ENABLE WITH CAUTION**. Typically after model callback only needs to be executed after receiving all model responses. Enabling proactive execution may have negative implication on the execution cost and latency, and should only be enabled in rare situations.",
    ).optional(),
    pythonCode: z.string().describe(
      "Required. The python code to execute for the callback.",
    ).optional(),
  })).describe(
    "Optional. The callbacks to execute after the tool is invoked. If there are multiple tool invocations, the callback will be executed multiple times. The provided callbacks are executed sequentially in the exact order they are given in the list. If a callback returns an overridden response, execution stops and any remaining callbacks are skipped.",
  ).optional(),
  beforeAgentCallbacks: z.array(z.object({
    description: z.string().describe(
      "Optional. Human-readable description of the callback.",
    ).optional(),
    disabled: z.boolean().describe(
      "Optional. Whether the callback is disabled. Disabled callbacks are ignored by the agent.",
    ).optional(),
    proactiveExecutionEnabled: z.boolean().describe(
      "Optional. If enabled, the callback will also be executed on intermediate model outputs. This setting only affects after model callback. **ENABLE WITH CAUTION**. Typically after model callback only needs to be executed after receiving all model responses. Enabling proactive execution may have negative implication on the execution cost and latency, and should only be enabled in rare situations.",
    ).optional(),
    pythonCode: z.string().describe(
      "Required. The python code to execute for the callback.",
    ).optional(),
  })).describe(
    "Optional. The callbacks to execute before the agent is called. The provided callbacks are executed sequentially in the exact order they are given in the list. If a callback returns an overridden response, execution stops and any remaining callbacks are skipped.",
  ).optional(),
  beforeModelCallbacks: z.array(z.object({
    description: z.string().describe(
      "Optional. Human-readable description of the callback.",
    ).optional(),
    disabled: z.boolean().describe(
      "Optional. Whether the callback is disabled. Disabled callbacks are ignored by the agent.",
    ).optional(),
    proactiveExecutionEnabled: z.boolean().describe(
      "Optional. If enabled, the callback will also be executed on intermediate model outputs. This setting only affects after model callback. **ENABLE WITH CAUTION**. Typically after model callback only needs to be executed after receiving all model responses. Enabling proactive execution may have negative implication on the execution cost and latency, and should only be enabled in rare situations.",
    ).optional(),
    pythonCode: z.string().describe(
      "Required. The python code to execute for the callback.",
    ).optional(),
  })).describe(
    "Optional. The callbacks to execute before the model is called. If there are multiple calls to the model, the callback will be executed multiple times. The provided callbacks are executed sequentially in the exact order they are given in the list. If a callback returns an overridden response, execution stops and any remaining callbacks are skipped.",
  ).optional(),
  beforeToolCallbacks: z.array(z.object({
    description: z.string().describe(
      "Optional. Human-readable description of the callback.",
    ).optional(),
    disabled: z.boolean().describe(
      "Optional. Whether the callback is disabled. Disabled callbacks are ignored by the agent.",
    ).optional(),
    proactiveExecutionEnabled: z.boolean().describe(
      "Optional. If enabled, the callback will also be executed on intermediate model outputs. This setting only affects after model callback. **ENABLE WITH CAUTION**. Typically after model callback only needs to be executed after receiving all model responses. Enabling proactive execution may have negative implication on the execution cost and latency, and should only be enabled in rare situations.",
    ).optional(),
    pythonCode: z.string().describe(
      "Required. The python code to execute for the callback.",
    ).optional(),
  })).describe(
    "Optional. The callbacks to execute before the tool is invoked. If there are multiple tool invocations, the callback will be executed multiple times. The provided callbacks are executed sequentially in the exact order they are given in the list. If a callback returns an overridden response, execution stops and any remaining callbacks are skipped.",
  ).optional(),
  childAgents: z.array(z.string()).describe(
    "Optional. List of child agents in the agent tree. Format: `projects/{project}/locations/{location}/apps/{app}/agents/{agent}`",
  ).optional(),
  description: z.string().describe(
    "Optional. Human-readable description of the agent.",
  ).optional(),
  displayName: z.string().describe("Required. Display name of the agent.")
    .optional(),
  guardrails: z.array(z.string()).describe(
    "Optional. List of guardrails for the agent. Format: `projects/{project}/locations/{location}/apps/{app}/guardrails/{guardrail}`",
  ).optional(),
  instruction: z.string().describe(
    "Optional. Instructions for the LLM model to guide the agent's behavior.",
  ).optional(),
  llmAgent: z.object({}).describe("Optional. The default agent type.")
    .optional(),
  modelSettings: z.object({
    model: z.string().describe(
      "Optional. The LLM model that the agent should use. If not set, the agent will inherit the model from its parent agent.",
    ).optional(),
    temperature: z.number().describe(
      "Optional. If set, this temperature will be used for the LLM model. Temperature controls the randomness of the model's responses. Lower temperatures produce responses that are more predictable. Higher temperatures produce responses that are more creative.",
    ).optional(),
  }).describe("Optional. Configurations for the LLM model.").optional(),
  name: z.string().describe(
    "Identifier. The unique identifier of the agent. Format: `projects/{project}/locations/{location}/apps/{app}/agents/{agent}`",
  ).optional(),
  remoteA2aAgent: z.object({
    a2aConfig: z.object({
      agentCard: z.object({
        description: z.string().describe(
          "Required. A description of the agent's domain of action/solution space.",
        ).optional(),
        name: z.string().describe(
          "Required. A human-readable name for the agent.",
        ).optional(),
        skills: z.array(z.object({
          description: z.unknown().describe(
            "Required. A detailed description of the skill.",
          ).optional(),
          examples: z.unknown().describe(
            "Example prompts or scenarios that this skill can handle.",
          ).optional(),
          id: z.unknown().describe(
            "Required. A unique identifier for the agent's skill.",
          ).optional(),
          inputModes: z.unknown().describe(
            "The set of supported input media types for this skill, overriding the agent's defaults.",
          ).optional(),
          name: z.unknown().describe(
            "Required. A human-readable name for the skill.",
          ).optional(),
          outputModes: z.unknown().describe(
            "The set of supported output media types for this skill, overriding the agent's defaults.",
          ).optional(),
          tags: z.unknown().describe(
            "Required. A set of keywords describing the skill's capabilities.",
          ).optional(),
        })).describe(
          "Required. Skills represent a unit of ability an agent can perform. This may somewhat abstract but represents a more focused set of actions that the agent is highly likely to succeed at.",
        ).optional(),
        supportedInterfaces: z.array(z.object({
          protocolBinding: z.unknown().describe(
            "Required. The protocol binding supported at this URL. This is an open form string, to be easily extended for other protocol bindings. The core ones officially supported are `JSONRPC`, `GRPC` and `HTTP+JSON`.",
          ).optional(),
          protocolVersion: z.unknown().describe(
            'Required. The version of the A2A protocol this interface exposes. Use the latest supported minor version per major version. Examples: "0.3", "1.0"',
          ).optional(),
          tenant: z.unknown().describe(
            "Tenant ID to be used in the request when calling the agent.",
          ).optional(),
          url: z.unknown().describe(
            'Required. The URL where this interface is available. Must be a valid absolute HTTPS URL in production. Example: "https://api.example.com/a2a/v1", "https://grpc.example.com/a2a"',
          ).optional(),
        })).describe(
          "Required. Ordered list of supported interfaces. The first entry is preferred.",
        ).optional(),
        version: z.string().describe("Required. The version of the agent.")
          .optional(),
      }).describe("Optional. The full agent card defined inline.").optional(),
      agentRegistry: z.string().describe(
        "Optional. Reference to the agent in the Agent Registry. Format: `projects/{project}/locations/{location}/agents/{agent}`",
      ).optional(),
      apiAuthentication: z.object({
        apiKeyConfig: z.object({
          apiKeySecretVersion: z.string().describe(
            "Required. The name of the SecretManager secret version resource storing the API key. Format: `projects/{project}/secrets/{secret}/versions/{version}` Note: You should grant `roles/secretmanager.secretAccessor` role to the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com`.",
          ).optional(),
          keyName: z.string().describe(
            'Required. The parameter name or the header name of the API key. E.g., If the API request is "https://example.com/act?X-Api-Key=", "X-Api-Key" would be the parameter name.',
          ).optional(),
          requestLocation: z.enum([
            "REQUEST_LOCATION_UNSPECIFIED",
            "HEADER",
            "QUERY_STRING",
          ]).describe("Required. Key location in the request.").optional(),
        }).describe("Optional. Config for API key auth.").optional(),
        bearerTokenConfig: z.object({
          token: z.string().describe(
            "Required. The bearer token. Must be in the format `$context.variables.`.",
          ).optional(),
        }).describe("Optional. Config for bearer token auth.").optional(),
        oauthConfig: z.object({
          clientId: z.string().describe(
            "Required. The client ID from the OAuth provider.",
          ).optional(),
          clientSecretVersion: z.string().describe(
            "Required. The name of the SecretManager secret version resource storing the client secret. Format: `projects/{project}/secrets/{secret}/versions/{version}` Note: You should grant `roles/secretmanager.secretAccessor` role to the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com`.",
          ).optional(),
          oauthGrantType: z.enum([
            "OAUTH_GRANT_TYPE_UNSPECIFIED",
            "CLIENT_CREDENTIAL",
          ]).describe("Required. OAuth grant types.").optional(),
          scopes: z.array(z.unknown()).describe(
            "Optional. The OAuth scopes to grant.",
          ).optional(),
          tokenEndpoint: z.string().describe(
            "Required. The token endpoint in the OAuth provider to exchange for an access token.",
          ).optional(),
        }).describe("Optional. Config for OAuth.").optional(),
        serviceAccountAuthConfig: z.object({
          scopes: z.array(z.unknown()).describe(
            "Optional. The OAuth scopes to grant. If not specified, the default scope `https://www.googleapis.com/auth/cloud-platform` is used.",
          ).optional(),
          serviceAccount: z.string().describe(
            "Required. The email address of the service account used for authentication. CES uses this service account to exchange an access token and the access token is then sent in the `Authorization` header of the request. The service account must have the `roles/iam.serviceAccountTokenCreator` role granted to the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com`.",
          ).optional(),
        }).describe("Optional. Config for service account authentication.")
          .optional(),
        serviceAgentIdTokenAuthConfig: z.object({}).describe(
          "Optional. Config for ID token auth generated from CES service agent.",
        ).optional(),
      }).describe(
        "Optional. Authentication configuration for calling the remote agent. Optional if the registry reference already handles authentication.",
      ).optional(),
      contextId: z.string().describe(
        "Optional. If not empty, interactions with the remote A2A agent will use this context ID. This context_id field can refer to a session variable like `$context.variables.order_agent_session_id`.",
      ).optional(),
      inputVariableMapping: z.record(z.string(), z.string()).describe(
        "Optional. Mapping of input variable names of remote agent to GECX variable names.",
      ).optional(),
      outputVariableMapping: z.record(z.string(), z.string()).describe(
        "Optional. Mapping of output variable names of remote agent to GECX variable names.",
      ).optional(),
      streamingEnabled: z.boolean().describe(
        "Optional. Whether streaming is enabled for the remote agent.",
      ).optional(),
    }).describe("Required. The A2A connection configuration.").optional(),
  }).describe(
    "Optional. The remote [A2A](https://github.com/a2aproject/A2A) agent to be used for the agent execution.",
  ).optional(),
  remoteDialogflowAgent: z.object({
    agent: z.string().describe(
      "Required. The [Dialogflow](https://docs.cloud.google.com/dialogflow/cx/docs/concept/agent) agent resource name. Format: `projects/{project}/locations/{location}/agents/{agent}`",
    ).optional(),
    environmentId: z.string().describe(
      "Optional. The environment ID of the Dialogflow agent to be used for the agent execution. If not specified, the draft environment will be used.",
    ).optional(),
    flowId: z.string().describe(
      "Optional. The flow ID of the flow in the Dialogflow agent.",
    ).optional(),
    inputVariableMapping: z.record(z.string(), z.string()).describe(
      "Optional. The mapping of the app variables names to the Dialogflow session parameters names to be sent to the Dialogflow agent as input.",
    ).optional(),
    languageCodeVariable: z.string().describe(
      "Optional. The name of the variable that contains the language code to be used for the Dialogflow session. If unspecified, the default language code of the Dialogflow agent will be used.",
    ).optional(),
    outputVariableMapping: z.record(z.string(), z.string()).describe(
      "Optional. The mapping of the Dialogflow session parameters names to the app variables names to be sent back to the CES agent after the Dialogflow agent execution ends.",
    ).optional(),
    respectResponseInterruptionSettings: z.boolean().describe(
      "Optional. Indicates whether to respect the message-level interruption settings configured in the Dialogflow agent. * If false: all response messages from the Dialogflow agent follow the app-level barge-in settings. * If true: only response messages with [`allow_playback_interruption`](https://docs.cloud.google.com/dialogflow/cx/docs/reference/rpc/google.cloud.dialogflow.cx.v3#text) set to true will be interruptable, all other messages follow the app-level barge-in settings.",
    ).optional(),
  }).describe(
    "Optional. The remote [Dialogflow](https://cloud.google.com/dialogflow/cx/docs/concept/console-conversational-agents) agent to be used for the agent execution. If this field is set, all other agent level properties will be ignored. Note: If the Dialogflow agent is in a different project from the app, you should grant `roles/dialogflow.client` to the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com`.",
  ).optional(),
  tools: z.array(z.string()).describe(
    "Optional. List of available tools for the agent. Format: `projects/{project}/locations/{location}/apps/{app}/tools/{tool}`",
  ).optional(),
  toolsets: z.array(z.object({
    toolIds: z.array(z.string()).describe(
      "Optional. The tools IDs to filter the toolset.",
    ).optional(),
    toolset: z.string().describe(
      "Required. The resource name of the toolset. Format: `projects/{project}/locations/{location}/apps/{app}/toolsets/{toolset}`",
    ).optional(),
  })).describe("Optional. List of toolsets for the agent.").optional(),
  transferRules: z.array(z.object({
    childAgent: z.string().describe(
      "Required. The resource name of the child agent the rule applies to. Format: `projects/{project}/locations/{location}/apps/{app}/agents/{agent}`",
    ).optional(),
    deterministicTransfer: z.object({
      expressionCondition: z.object({
        expression: z.string().describe(
          "Required. The string representation of cloud.api.Expression condition.",
        ).optional(),
      }).describe(
        "Optional. A rule that evaluates a session state condition. If the condition evaluates to true, the transfer occurs.",
      ).optional(),
      pythonCodeCondition: z.object({
        pythonCode: z.string().describe("Required. The python code to execute.")
          .optional(),
      }).describe(
        "Optional. A rule that uses Python code block to evaluate the conditions. If the condition evaluates to true, the transfer occurs.",
      ).optional(),
    }).describe(
      "Optional. A rule that immediately transfers to the target agent when the condition is met.",
    ).optional(),
    direction: z.enum([
      "DIRECTION_UNSPECIFIED",
      "PARENT_TO_CHILD",
      "CHILD_TO_PARENT",
    ]).describe("Required. The direction of the transfer.").optional(),
    disablePlannerTransfer: z.object({
      expressionCondition: z.object({
        expression: z.string().describe(
          "Required. The string representation of cloud.api.Expression condition.",
        ).optional(),
      }).describe(
        "Required. If the condition evaluates to true, planner will not be allowed to transfer to the target agent.",
      ).optional(),
    }).describe(
      "Optional. Rule that prevents the planner from transferring to the target agent.",
    ).optional(),
  })).describe(
    "Optional. Agent transfer rules. If multiple rules match, the first one in the list will be used.",
  ).optional(),
  agentId: z.string().describe(
    "Optional. The ID to use for the agent, which will become the final component of the agent's resource name. If not provided, a unique ID will be automatically assigned for the agent.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  afterAgentCallbacks: z.array(z.object({
    description: z.string(),
    disabled: z.boolean(),
    proactiveExecutionEnabled: z.boolean(),
    pythonCode: z.string(),
  })).optional(),
  afterModelCallbacks: z.array(z.object({
    description: z.string(),
    disabled: z.boolean(),
    proactiveExecutionEnabled: z.boolean(),
    pythonCode: z.string(),
  })).optional(),
  afterToolCallbacks: z.array(z.object({
    description: z.string(),
    disabled: z.boolean(),
    proactiveExecutionEnabled: z.boolean(),
    pythonCode: z.string(),
  })).optional(),
  beforeAgentCallbacks: z.array(z.object({
    description: z.string(),
    disabled: z.boolean(),
    proactiveExecutionEnabled: z.boolean(),
    pythonCode: z.string(),
  })).optional(),
  beforeModelCallbacks: z.array(z.object({
    description: z.string(),
    disabled: z.boolean(),
    proactiveExecutionEnabled: z.boolean(),
    pythonCode: z.string(),
  })).optional(),
  beforeToolCallbacks: z.array(z.object({
    description: z.string(),
    disabled: z.boolean(),
    proactiveExecutionEnabled: z.boolean(),
    pythonCode: z.string(),
  })).optional(),
  childAgents: z.array(z.string()).optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  etag: z.string().optional(),
  generatedSummary: z.string().optional(),
  guardrails: z.array(z.string()).optional(),
  instruction: z.string().optional(),
  llmAgent: z.object({}).optional(),
  modelSettings: z.object({
    model: z.string(),
    temperature: z.number(),
  }).optional(),
  name: z.string(),
  remoteA2aAgent: z.object({
    a2aConfig: z.object({
      agentCard: z.object({
        description: z.string(),
        name: z.string(),
        skills: z.array(z.object({
          description: z.unknown(),
          examples: z.unknown(),
          id: z.unknown(),
          inputModes: z.unknown(),
          name: z.unknown(),
          outputModes: z.unknown(),
          tags: z.unknown(),
        })),
        supportedInterfaces: z.array(z.object({
          protocolBinding: z.unknown(),
          protocolVersion: z.unknown(),
          tenant: z.unknown(),
          url: z.unknown(),
        })),
        version: z.string(),
      }),
      agentRegistry: z.string(),
      apiAuthentication: z.object({
        apiKeyConfig: z.object({
          apiKeySecretVersion: z.string(),
          keyName: z.string(),
          requestLocation: z.string(),
        }),
        bearerTokenConfig: z.object({
          token: z.string(),
        }),
        oauthConfig: z.object({
          clientId: z.string(),
          clientSecretVersion: z.string(),
          oauthGrantType: z.string(),
          scopes: z.array(z.unknown()),
          tokenEndpoint: z.string(),
        }),
        serviceAccountAuthConfig: z.object({
          scopes: z.array(z.unknown()),
          serviceAccount: z.string(),
        }),
        serviceAgentIdTokenAuthConfig: z.object({}),
      }),
      contextId: z.string(),
      inputVariableMapping: z.record(z.string(), z.unknown()),
      outputVariableMapping: z.record(z.string(), z.unknown()),
      streamingEnabled: z.boolean(),
    }),
  }).optional(),
  remoteDialogflowAgent: z.object({
    agent: z.string(),
    environmentId: z.string(),
    flowId: z.string(),
    inputVariableMapping: z.record(z.string(), z.unknown()),
    languageCodeVariable: z.string(),
    outputVariableMapping: z.record(z.string(), z.unknown()),
    respectResponseInterruptionSettings: z.boolean(),
  }).optional(),
  tools: z.array(z.string()).optional(),
  toolsets: z.array(z.object({
    toolIds: z.array(z.string()),
    toolset: z.string(),
  })).optional(),
  transferRules: z.array(z.object({
    childAgent: z.string(),
    deterministicTransfer: z.object({
      expressionCondition: z.object({
        expression: z.string(),
      }),
      pythonCodeCondition: z.object({
        pythonCode: z.string(),
      }),
    }),
    direction: z.string(),
    disablePlannerTransfer: z.object({
      expressionCondition: z.object({
        expression: z.string(),
      }),
    }),
  })).optional(),
  updateTime: z.string().optional(),
  validationErrors: z.array(z.string()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  afterAgentCallbacks: z.array(z.object({
    description: z.string().describe(
      "Optional. Human-readable description of the callback.",
    ).optional(),
    disabled: z.boolean().describe(
      "Optional. Whether the callback is disabled. Disabled callbacks are ignored by the agent.",
    ).optional(),
    proactiveExecutionEnabled: z.boolean().describe(
      "Optional. If enabled, the callback will also be executed on intermediate model outputs. This setting only affects after model callback. **ENABLE WITH CAUTION**. Typically after model callback only needs to be executed after receiving all model responses. Enabling proactive execution may have negative implication on the execution cost and latency, and should only be enabled in rare situations.",
    ).optional(),
    pythonCode: z.string().describe(
      "Required. The python code to execute for the callback.",
    ).optional(),
  })).describe(
    "Optional. The callbacks to execute after the agent is called. The provided callbacks are executed sequentially in the exact order they are given in the list. If a callback returns an overridden response, execution stops and any remaining callbacks are skipped.",
  ).optional(),
  afterModelCallbacks: z.array(z.object({
    description: z.string().describe(
      "Optional. Human-readable description of the callback.",
    ).optional(),
    disabled: z.boolean().describe(
      "Optional. Whether the callback is disabled. Disabled callbacks are ignored by the agent.",
    ).optional(),
    proactiveExecutionEnabled: z.boolean().describe(
      "Optional. If enabled, the callback will also be executed on intermediate model outputs. This setting only affects after model callback. **ENABLE WITH CAUTION**. Typically after model callback only needs to be executed after receiving all model responses. Enabling proactive execution may have negative implication on the execution cost and latency, and should only be enabled in rare situations.",
    ).optional(),
    pythonCode: z.string().describe(
      "Required. The python code to execute for the callback.",
    ).optional(),
  })).describe(
    "Optional. The callbacks to execute after the model is called. If there are multiple calls to the model, the callback will be executed multiple times. The provided callbacks are executed sequentially in the exact order they are given in the list. If a callback returns an overridden response, execution stops and any remaining callbacks are skipped.",
  ).optional(),
  afterToolCallbacks: z.array(z.object({
    description: z.string().describe(
      "Optional. Human-readable description of the callback.",
    ).optional(),
    disabled: z.boolean().describe(
      "Optional. Whether the callback is disabled. Disabled callbacks are ignored by the agent.",
    ).optional(),
    proactiveExecutionEnabled: z.boolean().describe(
      "Optional. If enabled, the callback will also be executed on intermediate model outputs. This setting only affects after model callback. **ENABLE WITH CAUTION**. Typically after model callback only needs to be executed after receiving all model responses. Enabling proactive execution may have negative implication on the execution cost and latency, and should only be enabled in rare situations.",
    ).optional(),
    pythonCode: z.string().describe(
      "Required. The python code to execute for the callback.",
    ).optional(),
  })).describe(
    "Optional. The callbacks to execute after the tool is invoked. If there are multiple tool invocations, the callback will be executed multiple times. The provided callbacks are executed sequentially in the exact order they are given in the list. If a callback returns an overridden response, execution stops and any remaining callbacks are skipped.",
  ).optional(),
  beforeAgentCallbacks: z.array(z.object({
    description: z.string().describe(
      "Optional. Human-readable description of the callback.",
    ).optional(),
    disabled: z.boolean().describe(
      "Optional. Whether the callback is disabled. Disabled callbacks are ignored by the agent.",
    ).optional(),
    proactiveExecutionEnabled: z.boolean().describe(
      "Optional. If enabled, the callback will also be executed on intermediate model outputs. This setting only affects after model callback. **ENABLE WITH CAUTION**. Typically after model callback only needs to be executed after receiving all model responses. Enabling proactive execution may have negative implication on the execution cost and latency, and should only be enabled in rare situations.",
    ).optional(),
    pythonCode: z.string().describe(
      "Required. The python code to execute for the callback.",
    ).optional(),
  })).describe(
    "Optional. The callbacks to execute before the agent is called. The provided callbacks are executed sequentially in the exact order they are given in the list. If a callback returns an overridden response, execution stops and any remaining callbacks are skipped.",
  ).optional(),
  beforeModelCallbacks: z.array(z.object({
    description: z.string().describe(
      "Optional. Human-readable description of the callback.",
    ).optional(),
    disabled: z.boolean().describe(
      "Optional. Whether the callback is disabled. Disabled callbacks are ignored by the agent.",
    ).optional(),
    proactiveExecutionEnabled: z.boolean().describe(
      "Optional. If enabled, the callback will also be executed on intermediate model outputs. This setting only affects after model callback. **ENABLE WITH CAUTION**. Typically after model callback only needs to be executed after receiving all model responses. Enabling proactive execution may have negative implication on the execution cost and latency, and should only be enabled in rare situations.",
    ).optional(),
    pythonCode: z.string().describe(
      "Required. The python code to execute for the callback.",
    ).optional(),
  })).describe(
    "Optional. The callbacks to execute before the model is called. If there are multiple calls to the model, the callback will be executed multiple times. The provided callbacks are executed sequentially in the exact order they are given in the list. If a callback returns an overridden response, execution stops and any remaining callbacks are skipped.",
  ).optional(),
  beforeToolCallbacks: z.array(z.object({
    description: z.string().describe(
      "Optional. Human-readable description of the callback.",
    ).optional(),
    disabled: z.boolean().describe(
      "Optional. Whether the callback is disabled. Disabled callbacks are ignored by the agent.",
    ).optional(),
    proactiveExecutionEnabled: z.boolean().describe(
      "Optional. If enabled, the callback will also be executed on intermediate model outputs. This setting only affects after model callback. **ENABLE WITH CAUTION**. Typically after model callback only needs to be executed after receiving all model responses. Enabling proactive execution may have negative implication on the execution cost and latency, and should only be enabled in rare situations.",
    ).optional(),
    pythonCode: z.string().describe(
      "Required. The python code to execute for the callback.",
    ).optional(),
  })).describe(
    "Optional. The callbacks to execute before the tool is invoked. If there are multiple tool invocations, the callback will be executed multiple times. The provided callbacks are executed sequentially in the exact order they are given in the list. If a callback returns an overridden response, execution stops and any remaining callbacks are skipped.",
  ).optional(),
  childAgents: z.array(z.string()).describe(
    "Optional. List of child agents in the agent tree. Format: `projects/{project}/locations/{location}/apps/{app}/agents/{agent}`",
  ).optional(),
  description: z.string().describe(
    "Optional. Human-readable description of the agent.",
  ).optional(),
  displayName: z.string().describe("Required. Display name of the agent.")
    .optional(),
  guardrails: z.array(z.string()).describe(
    "Optional. List of guardrails for the agent. Format: `projects/{project}/locations/{location}/apps/{app}/guardrails/{guardrail}`",
  ).optional(),
  instruction: z.string().describe(
    "Optional. Instructions for the LLM model to guide the agent's behavior.",
  ).optional(),
  llmAgent: z.object({}).describe("Optional. The default agent type.")
    .optional(),
  modelSettings: z.object({
    model: z.string().describe(
      "Optional. The LLM model that the agent should use. If not set, the agent will inherit the model from its parent agent.",
    ).optional(),
    temperature: z.number().describe(
      "Optional. If set, this temperature will be used for the LLM model. Temperature controls the randomness of the model's responses. Lower temperatures produce responses that are more predictable. Higher temperatures produce responses that are more creative.",
    ).optional(),
  }).describe("Optional. Configurations for the LLM model.").optional(),
  name: z.string().describe(
    "Identifier. The unique identifier of the agent. Format: `projects/{project}/locations/{location}/apps/{app}/agents/{agent}`",
  ).optional(),
  remoteA2aAgent: z.object({
    a2aConfig: z.object({
      agentCard: z.object({
        description: z.string().describe(
          "Required. A description of the agent's domain of action/solution space.",
        ).optional(),
        name: z.string().describe(
          "Required. A human-readable name for the agent.",
        ).optional(),
        skills: z.array(z.object({
          description: z.unknown().describe(
            "Required. A detailed description of the skill.",
          ).optional(),
          examples: z.unknown().describe(
            "Example prompts or scenarios that this skill can handle.",
          ).optional(),
          id: z.unknown().describe(
            "Required. A unique identifier for the agent's skill.",
          ).optional(),
          inputModes: z.unknown().describe(
            "The set of supported input media types for this skill, overriding the agent's defaults.",
          ).optional(),
          name: z.unknown().describe(
            "Required. A human-readable name for the skill.",
          ).optional(),
          outputModes: z.unknown().describe(
            "The set of supported output media types for this skill, overriding the agent's defaults.",
          ).optional(),
          tags: z.unknown().describe(
            "Required. A set of keywords describing the skill's capabilities.",
          ).optional(),
        })).describe(
          "Required. Skills represent a unit of ability an agent can perform. This may somewhat abstract but represents a more focused set of actions that the agent is highly likely to succeed at.",
        ).optional(),
        supportedInterfaces: z.array(z.object({
          protocolBinding: z.unknown().describe(
            "Required. The protocol binding supported at this URL. This is an open form string, to be easily extended for other protocol bindings. The core ones officially supported are `JSONRPC`, `GRPC` and `HTTP+JSON`.",
          ).optional(),
          protocolVersion: z.unknown().describe(
            'Required. The version of the A2A protocol this interface exposes. Use the latest supported minor version per major version. Examples: "0.3", "1.0"',
          ).optional(),
          tenant: z.unknown().describe(
            "Tenant ID to be used in the request when calling the agent.",
          ).optional(),
          url: z.unknown().describe(
            'Required. The URL where this interface is available. Must be a valid absolute HTTPS URL in production. Example: "https://api.example.com/a2a/v1", "https://grpc.example.com/a2a"',
          ).optional(),
        })).describe(
          "Required. Ordered list of supported interfaces. The first entry is preferred.",
        ).optional(),
        version: z.string().describe("Required. The version of the agent.")
          .optional(),
      }).describe("Optional. The full agent card defined inline.").optional(),
      agentRegistry: z.string().describe(
        "Optional. Reference to the agent in the Agent Registry. Format: `projects/{project}/locations/{location}/agents/{agent}`",
      ).optional(),
      apiAuthentication: z.object({
        apiKeyConfig: z.object({
          apiKeySecretVersion: z.string().describe(
            "Required. The name of the SecretManager secret version resource storing the API key. Format: `projects/{project}/secrets/{secret}/versions/{version}` Note: You should grant `roles/secretmanager.secretAccessor` role to the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com`.",
          ).optional(),
          keyName: z.string().describe(
            'Required. The parameter name or the header name of the API key. E.g., If the API request is "https://example.com/act?X-Api-Key=", "X-Api-Key" would be the parameter name.',
          ).optional(),
          requestLocation: z.enum([
            "REQUEST_LOCATION_UNSPECIFIED",
            "HEADER",
            "QUERY_STRING",
          ]).describe("Required. Key location in the request.").optional(),
        }).describe("Optional. Config for API key auth.").optional(),
        bearerTokenConfig: z.object({
          token: z.string().describe(
            "Required. The bearer token. Must be in the format `$context.variables.`.",
          ).optional(),
        }).describe("Optional. Config for bearer token auth.").optional(),
        oauthConfig: z.object({
          clientId: z.string().describe(
            "Required. The client ID from the OAuth provider.",
          ).optional(),
          clientSecretVersion: z.string().describe(
            "Required. The name of the SecretManager secret version resource storing the client secret. Format: `projects/{project}/secrets/{secret}/versions/{version}` Note: You should grant `roles/secretmanager.secretAccessor` role to the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com`.",
          ).optional(),
          oauthGrantType: z.enum([
            "OAUTH_GRANT_TYPE_UNSPECIFIED",
            "CLIENT_CREDENTIAL",
          ]).describe("Required. OAuth grant types.").optional(),
          scopes: z.array(z.unknown()).describe(
            "Optional. The OAuth scopes to grant.",
          ).optional(),
          tokenEndpoint: z.string().describe(
            "Required. The token endpoint in the OAuth provider to exchange for an access token.",
          ).optional(),
        }).describe("Optional. Config for OAuth.").optional(),
        serviceAccountAuthConfig: z.object({
          scopes: z.array(z.unknown()).describe(
            "Optional. The OAuth scopes to grant. If not specified, the default scope `https://www.googleapis.com/auth/cloud-platform` is used.",
          ).optional(),
          serviceAccount: z.string().describe(
            "Required. The email address of the service account used for authentication. CES uses this service account to exchange an access token and the access token is then sent in the `Authorization` header of the request. The service account must have the `roles/iam.serviceAccountTokenCreator` role granted to the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com`.",
          ).optional(),
        }).describe("Optional. Config for service account authentication.")
          .optional(),
        serviceAgentIdTokenAuthConfig: z.object({}).describe(
          "Optional. Config for ID token auth generated from CES service agent.",
        ).optional(),
      }).describe(
        "Optional. Authentication configuration for calling the remote agent. Optional if the registry reference already handles authentication.",
      ).optional(),
      contextId: z.string().describe(
        "Optional. If not empty, interactions with the remote A2A agent will use this context ID. This context_id field can refer to a session variable like `$context.variables.order_agent_session_id`.",
      ).optional(),
      inputVariableMapping: z.record(z.string(), z.string()).describe(
        "Optional. Mapping of input variable names of remote agent to GECX variable names.",
      ).optional(),
      outputVariableMapping: z.record(z.string(), z.string()).describe(
        "Optional. Mapping of output variable names of remote agent to GECX variable names.",
      ).optional(),
      streamingEnabled: z.boolean().describe(
        "Optional. Whether streaming is enabled for the remote agent.",
      ).optional(),
    }).describe("Required. The A2A connection configuration.").optional(),
  }).describe(
    "Optional. The remote [A2A](https://github.com/a2aproject/A2A) agent to be used for the agent execution.",
  ).optional(),
  remoteDialogflowAgent: z.object({
    agent: z.string().describe(
      "Required. The [Dialogflow](https://docs.cloud.google.com/dialogflow/cx/docs/concept/agent) agent resource name. Format: `projects/{project}/locations/{location}/agents/{agent}`",
    ).optional(),
    environmentId: z.string().describe(
      "Optional. The environment ID of the Dialogflow agent to be used for the agent execution. If not specified, the draft environment will be used.",
    ).optional(),
    flowId: z.string().describe(
      "Optional. The flow ID of the flow in the Dialogflow agent.",
    ).optional(),
    inputVariableMapping: z.record(z.string(), z.string()).describe(
      "Optional. The mapping of the app variables names to the Dialogflow session parameters names to be sent to the Dialogflow agent as input.",
    ).optional(),
    languageCodeVariable: z.string().describe(
      "Optional. The name of the variable that contains the language code to be used for the Dialogflow session. If unspecified, the default language code of the Dialogflow agent will be used.",
    ).optional(),
    outputVariableMapping: z.record(z.string(), z.string()).describe(
      "Optional. The mapping of the Dialogflow session parameters names to the app variables names to be sent back to the CES agent after the Dialogflow agent execution ends.",
    ).optional(),
    respectResponseInterruptionSettings: z.boolean().describe(
      "Optional. Indicates whether to respect the message-level interruption settings configured in the Dialogflow agent. * If false: all response messages from the Dialogflow agent follow the app-level barge-in settings. * If true: only response messages with [`allow_playback_interruption`](https://docs.cloud.google.com/dialogflow/cx/docs/reference/rpc/google.cloud.dialogflow.cx.v3#text) set to true will be interruptable, all other messages follow the app-level barge-in settings.",
    ).optional(),
  }).describe(
    "Optional. The remote [Dialogflow](https://cloud.google.com/dialogflow/cx/docs/concept/console-conversational-agents) agent to be used for the agent execution. If this field is set, all other agent level properties will be ignored. Note: If the Dialogflow agent is in a different project from the app, you should grant `roles/dialogflow.client` to the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com`.",
  ).optional(),
  tools: z.array(z.string()).describe(
    "Optional. List of available tools for the agent. Format: `projects/{project}/locations/{location}/apps/{app}/tools/{tool}`",
  ).optional(),
  toolsets: z.array(z.object({
    toolIds: z.array(z.string()).describe(
      "Optional. The tools IDs to filter the toolset.",
    ).optional(),
    toolset: z.string().describe(
      "Required. The resource name of the toolset. Format: `projects/{project}/locations/{location}/apps/{app}/toolsets/{toolset}`",
    ).optional(),
  })).describe("Optional. List of toolsets for the agent.").optional(),
  transferRules: z.array(z.object({
    childAgent: z.string().describe(
      "Required. The resource name of the child agent the rule applies to. Format: `projects/{project}/locations/{location}/apps/{app}/agents/{agent}`",
    ).optional(),
    deterministicTransfer: z.object({
      expressionCondition: z.object({
        expression: z.string().describe(
          "Required. The string representation of cloud.api.Expression condition.",
        ).optional(),
      }).describe(
        "Optional. A rule that evaluates a session state condition. If the condition evaluates to true, the transfer occurs.",
      ).optional(),
      pythonCodeCondition: z.object({
        pythonCode: z.string().describe("Required. The python code to execute.")
          .optional(),
      }).describe(
        "Optional. A rule that uses Python code block to evaluate the conditions. If the condition evaluates to true, the transfer occurs.",
      ).optional(),
    }).describe(
      "Optional. A rule that immediately transfers to the target agent when the condition is met.",
    ).optional(),
    direction: z.enum([
      "DIRECTION_UNSPECIFIED",
      "PARENT_TO_CHILD",
      "CHILD_TO_PARENT",
    ]).describe("Required. The direction of the transfer.").optional(),
    disablePlannerTransfer: z.object({
      expressionCondition: z.object({
        expression: z.string().describe(
          "Required. The string representation of cloud.api.Expression condition.",
        ).optional(),
      }).describe(
        "Required. If the condition evaluates to true, planner will not be allowed to transfer to the target agent.",
      ).optional(),
    }).describe(
      "Optional. Rule that prevents the planner from transferring to the target agent.",
    ).optional(),
  })).describe(
    "Optional. Agent transfer rules. If multiple rules match, the first one in the list will be used.",
  ).optional(),
  agentId: z.string().describe(
    "Optional. The ID to use for the agent, which will become the final component of the agent's resource name. If not provided, a unique ID will be automatically assigned for the agent.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const _credentialKeys = new Set([
  "accessToken",
  "credentialsJson",
  "project",
  "scopes",
  "quotaProject",
  "apiEndpoint",
]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
    scopes: typeof g.scopes === "string"
      ? g.scopes.split(",").map((s: string) => s.trim())
      : undefined,
    quotaProject: g.quotaProject as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Gemini Enterprise for Customer Experience Apps.Agents. Registered at `@swamp/gcp/ces/apps-agents`. */
export const model = {
  type: "@swamp/gcp/ces/apps-agents",
  version: "2026.09.01.1",
  upgrades: [
    {
      toVersion: "2026.04.01.2",
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
      toVersion: "2026.05.09.1",
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
      toVersion: "2026.05.25.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.26.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.04.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.05.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.05.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.06.1",
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
      toVersion: "2026.06.12.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.17.1",
      description: "Added: parent",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.17.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.1",
      description: "Added: scopes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.20.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.20.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.12.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.01.1",
      description: "Added: remoteA2aAgent",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "An agent acts as the fundamental building block that provides instructions to...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a agents",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["afterAgentCallbacks"] !== undefined) {
          body["afterAgentCallbacks"] = g["afterAgentCallbacks"];
        }
        if (g["afterModelCallbacks"] !== undefined) {
          body["afterModelCallbacks"] = g["afterModelCallbacks"];
        }
        if (g["afterToolCallbacks"] !== undefined) {
          body["afterToolCallbacks"] = g["afterToolCallbacks"];
        }
        if (g["beforeAgentCallbacks"] !== undefined) {
          body["beforeAgentCallbacks"] = g["beforeAgentCallbacks"];
        }
        if (g["beforeModelCallbacks"] !== undefined) {
          body["beforeModelCallbacks"] = g["beforeModelCallbacks"];
        }
        if (g["beforeToolCallbacks"] !== undefined) {
          body["beforeToolCallbacks"] = g["beforeToolCallbacks"];
        }
        if (g["childAgents"] !== undefined) {
          body["childAgents"] = g["childAgents"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["guardrails"] !== undefined) body["guardrails"] = g["guardrails"];
        if (g["instruction"] !== undefined) {
          body["instruction"] = g["instruction"];
        }
        if (g["llmAgent"] !== undefined) body["llmAgent"] = g["llmAgent"];
        if (g["modelSettings"] !== undefined) {
          body["modelSettings"] = g["modelSettings"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["remoteA2aAgent"] !== undefined) {
          body["remoteA2aAgent"] = g["remoteA2aAgent"];
        }
        if (g["remoteDialogflowAgent"] !== undefined) {
          body["remoteDialogflowAgent"] = g["remoteDialogflowAgent"];
        }
        if (g["tools"] !== undefined) body["tools"] = g["tools"];
        if (g["toolsets"] !== undefined) body["toolsets"] = g["toolsets"];
        if (g["transferRules"] !== undefined) {
          body["transferRules"] = g["transferRules"];
        }
        if (g["agentId"] !== undefined) {
          params["agentId"] = String(g["agentId"]);
        }
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          baseUrl,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
            },
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
          },
          credentials,
        ) as StateData;
        const instanceName = ((g.name ?? result.name)?.toString() ?? "current")
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
      description: "Get a agents",
      arguments: z.object({
        identifier: z.string().describe("The name of the agents"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const result = await readResource(
          baseUrl,
          GET_CONFIG,
          params,
          credentials,
        ) as StateData;
        const instanceName =
          ((g.name ?? result.name)?.toString() ?? args.identifier).replace(
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
      description: "Update agents attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific agents by name (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error(
            "No existing state found - run create, get, or list first",
          );
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const params: Record<string, string> = { project: projectId };
        const existingName = existing["name"]?.toString();
        if (existingName && existingName.includes("/")) {
          params["name"] = existingName;
        } else {
          params["name"] = buildResourceName(
            String(g["parent"] ?? ""),
            existingName ?? g["name"]?.toString() ?? "",
          );
        }
        const body: Record<string, unknown> = {};
        if (g["afterAgentCallbacks"] !== undefined) {
          body["afterAgentCallbacks"] = g["afterAgentCallbacks"];
        }
        if (g["afterModelCallbacks"] !== undefined) {
          body["afterModelCallbacks"] = g["afterModelCallbacks"];
        }
        if (g["afterToolCallbacks"] !== undefined) {
          body["afterToolCallbacks"] = g["afterToolCallbacks"];
        }
        if (g["beforeAgentCallbacks"] !== undefined) {
          body["beforeAgentCallbacks"] = g["beforeAgentCallbacks"];
        }
        if (g["beforeModelCallbacks"] !== undefined) {
          body["beforeModelCallbacks"] = g["beforeModelCallbacks"];
        }
        if (g["beforeToolCallbacks"] !== undefined) {
          body["beforeToolCallbacks"] = g["beforeToolCallbacks"];
        }
        if (g["childAgents"] !== undefined) {
          body["childAgents"] = g["childAgents"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["guardrails"] !== undefined) body["guardrails"] = g["guardrails"];
        if (g["instruction"] !== undefined) {
          body["instruction"] = g["instruction"];
        }
        if (g["llmAgent"] !== undefined) body["llmAgent"] = g["llmAgent"];
        if (g["modelSettings"] !== undefined) {
          body["modelSettings"] = g["modelSettings"];
        }
        if (g["remoteA2aAgent"] !== undefined) {
          body["remoteA2aAgent"] = g["remoteA2aAgent"];
        }
        if (g["remoteDialogflowAgent"] !== undefined) {
          body["remoteDialogflowAgent"] = g["remoteDialogflowAgent"];
        }
        if (g["tools"] !== undefined) body["tools"] = g["tools"];
        if (g["toolsets"] !== undefined) body["toolsets"] = g["toolsets"];
        if (g["transferRules"] !== undefined) {
          body["transferRules"] = g["transferRules"];
        }
        const updateMaskKeys = Object.keys(body);
        if (updateMaskKeys.length > 0) {
          params["updateMask"] = updateMaskKeys.join(",");
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
          baseUrl,
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
      description: "Delete the agents",
      arguments: z.object({
        identifier: z.string().describe("The name of the agents"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const { existed } = await deleteResource(
          baseUrl,
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
      description: "Sync agents state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific agents by name (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error(
            "No existing state found - run create, get, or list first",
          );
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        try {
          const params: Record<string, string> = { project: projectId };
          const existingName = existing.name?.toString();
          if (existingName && existingName.includes("/")) {
            params["name"] = existingName;
          } else {
            const shortName = existingName ?? g["name"]?.toString();
            if (!shortName) throw new Error("No identifier found");
            params["name"] = buildResourceName(
              String(g["parent"] ?? ""),
              shortName,
            );
          }
          const result = await readResource(
            baseUrl,
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
      description: "List agents resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. Filter to be applied when listing the agents. See https://google.aip.dev/160 for more details.",
        ).optional(),
        orderBy: z.string().describe(
          'Optional. Field to sort by. Only "name" and "create_time" is supported. See https://google.aip.dev/132#ordering for more details.',
        ).optional(),
        pageSize: z.number().describe(
          "Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
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
          baseUrl,
          LIST_CONFIG,
          params,
          "agents",
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
