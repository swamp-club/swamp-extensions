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
  getProjectId,
  isResourceNotFoundError,
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
  llmAgent: z.object({}).describe(
    "Default agent type. The agent uses instructions and callbacks specified in the agent to perform the task using a large language model.",
  ).optional(),
  modelSettings: z.object({
    model: z.string().describe(
      "Optional. The LLM model that the agent should use. If not set, the agent will inherit the model from its parent agent.",
    ).optional(),
    temperature: z.number().describe(
      "Optional. If set, this temperature will be used for the LLM model. Temperature controls the randomness of the model's responses. Lower temperatures produce responses that are more predictable. Higher temperatures produce responses that are more creative.",
    ).optional(),
  }).describe(
    "Model settings contains various configurations for the LLM model.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The unique identifier of the agent. Format: `projects/{project}/locations/{location}/apps/{app}/agents/{agent}`",
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
    "The agent which will transfer execution to a remote [Dialogflow CX](https://docs.cloud.google.com/dialogflow/cx/docs/concept/agent) agent. The Dialogflow agent will process subsequent user queries until the session ends or flow ends, and the control is transferred back to the parent CES agent.",
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
      }).describe("Expression condition based on session state.").optional(),
      pythonCodeCondition: z.object({
        pythonCode: z.string().describe("Required. The python code to execute.")
          .optional(),
      }).describe("Python code block to evaluate the condition.").optional(),
    }).describe(
      "Deterministic transfer rule. When the condition evaluates to true, the transfer occurs.",
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
      }).describe("Expression condition based on session state.").optional(),
    }).describe(
      "A rule that prevents the planner from transferring to the target agent.",
    ).optional(),
  })).describe(
    "Optional. Agent transfer rules. If multiple rules match, the first one in the list will be used.",
  ).optional(),
  agentId: z.string().describe(
    "Optional. The ID to use for the agent, which will become the final component of the agent's resource name. If not provided, a unique ID will be automatically assigned for the agent.",
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
  llmAgent: z.object({}).describe(
    "Default agent type. The agent uses instructions and callbacks specified in the agent to perform the task using a large language model.",
  ).optional(),
  modelSettings: z.object({
    model: z.string().describe(
      "Optional. The LLM model that the agent should use. If not set, the agent will inherit the model from its parent agent.",
    ).optional(),
    temperature: z.number().describe(
      "Optional. If set, this temperature will be used for the LLM model. Temperature controls the randomness of the model's responses. Lower temperatures produce responses that are more predictable. Higher temperatures produce responses that are more creative.",
    ).optional(),
  }).describe(
    "Model settings contains various configurations for the LLM model.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The unique identifier of the agent. Format: `projects/{project}/locations/{location}/apps/{app}/agents/{agent}`",
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
    "The agent which will transfer execution to a remote [Dialogflow CX](https://docs.cloud.google.com/dialogflow/cx/docs/concept/agent) agent. The Dialogflow agent will process subsequent user queries until the session ends or flow ends, and the control is transferred back to the parent CES agent.",
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
      }).describe("Expression condition based on session state.").optional(),
      pythonCodeCondition: z.object({
        pythonCode: z.string().describe("Required. The python code to execute.")
          .optional(),
      }).describe("Python code block to evaluate the condition.").optional(),
    }).describe(
      "Deterministic transfer rule. When the condition evaluates to true, the transfer occurs.",
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
      }).describe("Expression condition based on session state.").optional(),
    }).describe(
      "A rule that prevents the planner from transferring to the target agent.",
    ).optional(),
  })).describe(
    "Optional. Agent transfer rules. If multiple rules match, the first one in the list will be used.",
  ).optional(),
  agentId: z.string().describe(
    "Optional. The ID to use for the agent, which will become the final component of the agent's resource name. If not provided, a unique ID will be automatically assigned for the agent.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Gemini Enterprise for Customer Experience Apps.Agents. Registered at `@swamp/gcp/ces/apps-agents`. */
export const model = {
  type: "@swamp/gcp/ces/apps-agents",
  version: "2026.05.21.1",
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
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
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
        if (g["remoteDialogflowAgent"] !== undefined) {
          body["remoteDialogflowAgent"] = g["remoteDialogflowAgent"];
        }
        if (g["tools"] !== undefined) body["tools"] = g["tools"];
        if (g["toolsets"] !== undefined) body["toolsets"] = g["toolsets"];
        if (g["transferRules"] !== undefined) {
          body["transferRules"] = g["transferRules"];
        }
        if (g["agentId"] !== undefined) body["agentId"] = g["agentId"];
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
      description: "Get a agents",
      arguments: z.object({
        identifier: z.string().describe("The name of the agents"),
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
      description: "Update agents attributes",
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
        if (g["remoteDialogflowAgent"] !== undefined) {
          body["remoteDialogflowAgent"] = g["remoteDialogflowAgent"];
        }
        if (g["tools"] !== undefined) body["tools"] = g["tools"];
        if (g["toolsets"] !== undefined) body["toolsets"] = g["toolsets"];
        if (g["transferRules"] !== undefined) {
          body["transferRules"] = g["transferRules"];
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
      description: "Delete the agents",
      arguments: z.object({
        identifier: z.string().describe("The name of the agents"),
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
      description: "Sync agents state from GCP",
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
  },
};
