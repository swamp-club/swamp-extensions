// Auto-generated extension model for @swamp/gcp/ces/apps-guardrails
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Gemini Enterprise for Customer Experience Apps.Guardrails.
 *
 * Guardrail contains a list of checks and balances to keep the agents safe and secure.
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
  return `${parent}/guardrails/${shortName}`;
}

const BASE_URL = "https://ces.googleapis.com/";

const GET_CONFIG = {
  "id": "ces.projects.locations.apps.guardrails.get",
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
  "id": "ces.projects.locations.apps.guardrails.create",
  "path": "v1/{+parent}/guardrails",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "guardrailId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "ces.projects.locations.apps.guardrails.patch",
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
  "id": "ces.projects.locations.apps.guardrails.delete",
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

const GlobalArgsSchema = z.object({
  action: z.object({
    generativeAnswer: z.object({
      prompt: z.string().describe(
        "Required. The prompt to use for the generative answer.",
      ).optional(),
    }).describe("The agent will immediately respond with a generative answer.")
      .optional(),
    respondImmediately: z.object({
      responses: z.array(z.object({
        disabled: z.boolean().describe(
          "Optional. Whether the response is disabled. Disabled responses are not used by the agent.",
        ).optional(),
        text: z.string().describe(
          "Required. Text for the agent to respond with.",
        ).optional(),
      })).describe(
        "Required. The canned responses for the agent to choose from. The response is chosen randomly.",
      ).optional(),
    }).describe(
      "The agent will immediately respond with a preconfigured response.",
    ).optional(),
    transferAgent: z.object({
      agent: z.string().describe(
        "Required. The name of the agent to transfer the conversation to. The agent must be in the same app as the current agent. Format: `projects/{project}/locations/{location}/apps/{app}/agents/{agent}`",
      ).optional(),
    }).describe(
      "The agent will transfer the conversation to a different agent.",
    ).optional(),
  }).describe("Action that is taken when a certain precondition is met.")
    .optional(),
  codeCallback: z.object({
    afterAgentCallback: z.object({
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
    }).describe(
      "A callback defines the custom logic to be executed at various stages of agent interaction.",
    ).optional(),
    afterModelCallback: z.object({
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
    }).describe(
      "A callback defines the custom logic to be executed at various stages of agent interaction.",
    ).optional(),
    beforeAgentCallback: z.object({
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
    }).describe(
      "A callback defines the custom logic to be executed at various stages of agent interaction.",
    ).optional(),
    beforeModelCallback: z.object({
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
    }).describe(
      "A callback defines the custom logic to be executed at various stages of agent interaction.",
    ).optional(),
  }).describe(
    "Guardrail that blocks the conversation based on the code callbacks provided.",
  ).optional(),
  contentFilter: z.object({
    bannedContents: z.array(z.string()).describe(
      "Optional. List of banned phrases. Applies to both user inputs and agent responses.",
    ).optional(),
    bannedContentsInAgentResponse: z.array(z.string()).describe(
      "Optional. List of banned phrases. Applies only to agent responses.",
    ).optional(),
    bannedContentsInUserInput: z.array(z.string()).describe(
      "Optional. List of banned phrases. Applies only to user inputs.",
    ).optional(),
    disregardDiacritics: z.boolean().describe(
      "Optional. If true, diacritics are ignored during matching.",
    ).optional(),
    matchType: z.enum([
      "MATCH_TYPE_UNSPECIFIED",
      "SIMPLE_STRING_MATCH",
      "WORD_BOUNDARY_STRING_MATCH",
      "REGEXP_MATCH",
    ]).describe("Required. Match type for the content filter.").optional(),
  }).describe(
    "Guardrail that bans certain content from being used in the conversation.",
  ).optional(),
  description: z.string().describe("Optional. Description of the guardrail.")
    .optional(),
  displayName: z.string().describe("Required. Display name of the guardrail.")
    .optional(),
  enabled: z.boolean().describe("Optional. Whether the guardrail is enabled.")
    .optional(),
  llmPolicy: z.object({
    allowShortUtterance: z.boolean().describe(
      "Optional. By default, the LLM policy check is bypassed for short utterances. Enabling this setting applies the policy check to all utterances, including those that would normally be skipped.",
    ).optional(),
    failOpen: z.boolean().describe(
      "Optional. If an error occurs during the policy check, fail open and do not trigger the guardrail.",
    ).optional(),
    maxConversationMessages: z.number().int().describe(
      "Optional. When checking this policy, consider the last 'n' messages in the conversation. When not set a default value of 10 will be used.",
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
    policyScope: z.enum([
      "POLICY_SCOPE_UNSPECIFIED",
      "USER_QUERY",
      "AGENT_RESPONSE",
      "USER_QUERY_AND_AGENT_RESPONSE",
    ]).describe(
      "Required. Defines when to apply the policy check during the conversation. If set to `POLICY_SCOPE_UNSPECIFIED`, the policy will be applied to the user input. When applying the policy to the agent response, additional latency will be introduced before the agent can respond.",
    ).optional(),
    prompt: z.string().describe("Required. Policy prompt.").optional(),
  }).describe(
    "Guardrail that blocks the conversation if the LLM response is considered violating the policy based on the LLM classification.",
  ).optional(),
  llmPromptSecurity: z.object({
    customPolicy: z.object({
      allowShortUtterance: z.boolean().describe(
        "Optional. By default, the LLM policy check is bypassed for short utterances. Enabling this setting applies the policy check to all utterances, including those that would normally be skipped.",
      ).optional(),
      failOpen: z.boolean().describe(
        "Optional. If an error occurs during the policy check, fail open and do not trigger the guardrail.",
      ).optional(),
      maxConversationMessages: z.number().int().describe(
        "Optional. When checking this policy, consider the last 'n' messages in the conversation. When not set a default value of 10 will be used.",
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
      policyScope: z.enum([
        "POLICY_SCOPE_UNSPECIFIED",
        "USER_QUERY",
        "AGENT_RESPONSE",
        "USER_QUERY_AND_AGENT_RESPONSE",
      ]).describe(
        "Required. Defines when to apply the policy check during the conversation. If set to `POLICY_SCOPE_UNSPECIFIED`, the policy will be applied to the user input. When applying the policy to the agent response, additional latency will be introduced before the agent can respond.",
      ).optional(),
      prompt: z.string().describe("Required. Policy prompt.").optional(),
    }).describe(
      "Guardrail that blocks the conversation if the LLM response is considered violating the policy based on the LLM classification.",
    ).optional(),
    defaultSettings: z.object({
      defaultPromptTemplate: z.string().describe(
        "Output only. The default prompt template used by the system. This field is for display purposes to show the user what prompt the system uses by default. It is OUTPUT_ONLY.",
      ).optional(),
    }).describe("Configuration for default system security settings.")
      .optional(),
    failOpen: z.boolean().describe(
      "Optional. Determines the behavior when the guardrail encounters an LLM error. - If true: the guardrail is bypassed. - If false (default): the guardrail triggers/blocks. Note: If a custom policy is provided, this field is ignored in favor of the policy's 'fail_open' configuration.",
    ).optional(),
  }).describe(
    "Guardrail that blocks the conversation if the input is considered unsafe based on the LLM classification.",
  ).optional(),
  modelSafety: z.object({
    safetySettings: z.array(z.object({
      category: z.enum([
        "HARM_CATEGORY_UNSPECIFIED",
        "HARM_CATEGORY_HATE_SPEECH",
        "HARM_CATEGORY_DANGEROUS_CONTENT",
        "HARM_CATEGORY_HARASSMENT",
        "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      ]).describe("Required. The harm category.").optional(),
      threshold: z.enum([
        "HARM_BLOCK_THRESHOLD_UNSPECIFIED",
        "BLOCK_LOW_AND_ABOVE",
        "BLOCK_MEDIUM_AND_ABOVE",
        "BLOCK_ONLY_HIGH",
        "BLOCK_NONE",
        "OFF",
      ]).describe("Required. The harm block threshold.").optional(),
    })).describe("Required. List of safety settings.").optional(),
  }).describe(
    "Model safety settings overrides. When this is set, it will override the default settings and trigger the guardrail if the response is considered unsafe.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The unique identifier of the guardrail. Format: `projects/{project}/locations/{location}/apps/{app}/guardrails/{guardrail}`",
  ).optional(),
  guardrailId: z.string().describe(
    "Optional. The ID to use for the guardrail, which will become the final component of the guardrail's resource name. If not provided, a unique ID will be automatically assigned for the guardrail.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  action: z.object({
    generativeAnswer: z.object({
      prompt: z.string(),
    }),
    respondImmediately: z.object({
      responses: z.array(z.object({
        disabled: z.boolean(),
        text: z.string(),
      })),
    }),
    transferAgent: z.object({
      agent: z.string(),
    }),
  }).optional(),
  codeCallback: z.object({
    afterAgentCallback: z.object({
      description: z.string(),
      disabled: z.boolean(),
      proactiveExecutionEnabled: z.boolean(),
      pythonCode: z.string(),
    }),
    afterModelCallback: z.object({
      description: z.string(),
      disabled: z.boolean(),
      proactiveExecutionEnabled: z.boolean(),
      pythonCode: z.string(),
    }),
    beforeAgentCallback: z.object({
      description: z.string(),
      disabled: z.boolean(),
      proactiveExecutionEnabled: z.boolean(),
      pythonCode: z.string(),
    }),
    beforeModelCallback: z.object({
      description: z.string(),
      disabled: z.boolean(),
      proactiveExecutionEnabled: z.boolean(),
      pythonCode: z.string(),
    }),
  }).optional(),
  contentFilter: z.object({
    bannedContents: z.array(z.string()),
    bannedContentsInAgentResponse: z.array(z.string()),
    bannedContentsInUserInput: z.array(z.string()),
    disregardDiacritics: z.boolean(),
    matchType: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  enabled: z.boolean().optional(),
  etag: z.string().optional(),
  llmPolicy: z.object({
    allowShortUtterance: z.boolean(),
    failOpen: z.boolean(),
    maxConversationMessages: z.number(),
    modelSettings: z.object({
      model: z.string(),
      temperature: z.number(),
    }),
    policyScope: z.string(),
    prompt: z.string(),
  }).optional(),
  llmPromptSecurity: z.object({
    customPolicy: z.object({
      allowShortUtterance: z.boolean(),
      failOpen: z.boolean(),
      maxConversationMessages: z.number(),
      modelSettings: z.object({
        model: z.string(),
        temperature: z.number(),
      }),
      policyScope: z.string(),
      prompt: z.string(),
    }),
    defaultSettings: z.object({
      defaultPromptTemplate: z.string(),
    }),
    failOpen: z.boolean(),
  }).optional(),
  modelSafety: z.object({
    safetySettings: z.array(z.object({
      category: z.string(),
      threshold: z.string(),
    })),
  }).optional(),
  name: z.string(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  action: z.object({
    generativeAnswer: z.object({
      prompt: z.string().describe(
        "Required. The prompt to use for the generative answer.",
      ).optional(),
    }).describe("The agent will immediately respond with a generative answer.")
      .optional(),
    respondImmediately: z.object({
      responses: z.array(z.object({
        disabled: z.boolean().describe(
          "Optional. Whether the response is disabled. Disabled responses are not used by the agent.",
        ).optional(),
        text: z.string().describe(
          "Required. Text for the agent to respond with.",
        ).optional(),
      })).describe(
        "Required. The canned responses for the agent to choose from. The response is chosen randomly.",
      ).optional(),
    }).describe(
      "The agent will immediately respond with a preconfigured response.",
    ).optional(),
    transferAgent: z.object({
      agent: z.string().describe(
        "Required. The name of the agent to transfer the conversation to. The agent must be in the same app as the current agent. Format: `projects/{project}/locations/{location}/apps/{app}/agents/{agent}`",
      ).optional(),
    }).describe(
      "The agent will transfer the conversation to a different agent.",
    ).optional(),
  }).describe("Action that is taken when a certain precondition is met.")
    .optional(),
  codeCallback: z.object({
    afterAgentCallback: z.object({
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
    }).describe(
      "A callback defines the custom logic to be executed at various stages of agent interaction.",
    ).optional(),
    afterModelCallback: z.object({
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
    }).describe(
      "A callback defines the custom logic to be executed at various stages of agent interaction.",
    ).optional(),
    beforeAgentCallback: z.object({
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
    }).describe(
      "A callback defines the custom logic to be executed at various stages of agent interaction.",
    ).optional(),
    beforeModelCallback: z.object({
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
    }).describe(
      "A callback defines the custom logic to be executed at various stages of agent interaction.",
    ).optional(),
  }).describe(
    "Guardrail that blocks the conversation based on the code callbacks provided.",
  ).optional(),
  contentFilter: z.object({
    bannedContents: z.array(z.string()).describe(
      "Optional. List of banned phrases. Applies to both user inputs and agent responses.",
    ).optional(),
    bannedContentsInAgentResponse: z.array(z.string()).describe(
      "Optional. List of banned phrases. Applies only to agent responses.",
    ).optional(),
    bannedContentsInUserInput: z.array(z.string()).describe(
      "Optional. List of banned phrases. Applies only to user inputs.",
    ).optional(),
    disregardDiacritics: z.boolean().describe(
      "Optional. If true, diacritics are ignored during matching.",
    ).optional(),
    matchType: z.enum([
      "MATCH_TYPE_UNSPECIFIED",
      "SIMPLE_STRING_MATCH",
      "WORD_BOUNDARY_STRING_MATCH",
      "REGEXP_MATCH",
    ]).describe("Required. Match type for the content filter.").optional(),
  }).describe(
    "Guardrail that bans certain content from being used in the conversation.",
  ).optional(),
  description: z.string().describe("Optional. Description of the guardrail.")
    .optional(),
  displayName: z.string().describe("Required. Display name of the guardrail.")
    .optional(),
  enabled: z.boolean().describe("Optional. Whether the guardrail is enabled.")
    .optional(),
  llmPolicy: z.object({
    allowShortUtterance: z.boolean().describe(
      "Optional. By default, the LLM policy check is bypassed for short utterances. Enabling this setting applies the policy check to all utterances, including those that would normally be skipped.",
    ).optional(),
    failOpen: z.boolean().describe(
      "Optional. If an error occurs during the policy check, fail open and do not trigger the guardrail.",
    ).optional(),
    maxConversationMessages: z.number().int().describe(
      "Optional. When checking this policy, consider the last 'n' messages in the conversation. When not set a default value of 10 will be used.",
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
    policyScope: z.enum([
      "POLICY_SCOPE_UNSPECIFIED",
      "USER_QUERY",
      "AGENT_RESPONSE",
      "USER_QUERY_AND_AGENT_RESPONSE",
    ]).describe(
      "Required. Defines when to apply the policy check during the conversation. If set to `POLICY_SCOPE_UNSPECIFIED`, the policy will be applied to the user input. When applying the policy to the agent response, additional latency will be introduced before the agent can respond.",
    ).optional(),
    prompt: z.string().describe("Required. Policy prompt.").optional(),
  }).describe(
    "Guardrail that blocks the conversation if the LLM response is considered violating the policy based on the LLM classification.",
  ).optional(),
  llmPromptSecurity: z.object({
    customPolicy: z.object({
      allowShortUtterance: z.boolean().describe(
        "Optional. By default, the LLM policy check is bypassed for short utterances. Enabling this setting applies the policy check to all utterances, including those that would normally be skipped.",
      ).optional(),
      failOpen: z.boolean().describe(
        "Optional. If an error occurs during the policy check, fail open and do not trigger the guardrail.",
      ).optional(),
      maxConversationMessages: z.number().int().describe(
        "Optional. When checking this policy, consider the last 'n' messages in the conversation. When not set a default value of 10 will be used.",
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
      policyScope: z.enum([
        "POLICY_SCOPE_UNSPECIFIED",
        "USER_QUERY",
        "AGENT_RESPONSE",
        "USER_QUERY_AND_AGENT_RESPONSE",
      ]).describe(
        "Required. Defines when to apply the policy check during the conversation. If set to `POLICY_SCOPE_UNSPECIFIED`, the policy will be applied to the user input. When applying the policy to the agent response, additional latency will be introduced before the agent can respond.",
      ).optional(),
      prompt: z.string().describe("Required. Policy prompt.").optional(),
    }).describe(
      "Guardrail that blocks the conversation if the LLM response is considered violating the policy based on the LLM classification.",
    ).optional(),
    defaultSettings: z.object({
      defaultPromptTemplate: z.string().describe(
        "Output only. The default prompt template used by the system. This field is for display purposes to show the user what prompt the system uses by default. It is OUTPUT_ONLY.",
      ).optional(),
    }).describe("Configuration for default system security settings.")
      .optional(),
    failOpen: z.boolean().describe(
      "Optional. Determines the behavior when the guardrail encounters an LLM error. - If true: the guardrail is bypassed. - If false (default): the guardrail triggers/blocks. Note: If a custom policy is provided, this field is ignored in favor of the policy's 'fail_open' configuration.",
    ).optional(),
  }).describe(
    "Guardrail that blocks the conversation if the input is considered unsafe based on the LLM classification.",
  ).optional(),
  modelSafety: z.object({
    safetySettings: z.array(z.object({
      category: z.enum([
        "HARM_CATEGORY_UNSPECIFIED",
        "HARM_CATEGORY_HATE_SPEECH",
        "HARM_CATEGORY_DANGEROUS_CONTENT",
        "HARM_CATEGORY_HARASSMENT",
        "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      ]).describe("Required. The harm category.").optional(),
      threshold: z.enum([
        "HARM_BLOCK_THRESHOLD_UNSPECIFIED",
        "BLOCK_LOW_AND_ABOVE",
        "BLOCK_MEDIUM_AND_ABOVE",
        "BLOCK_ONLY_HIGH",
        "BLOCK_NONE",
        "OFF",
      ]).describe("Required. The harm block threshold.").optional(),
    })).describe("Required. List of safety settings.").optional(),
  }).describe(
    "Model safety settings overrides. When this is set, it will override the default settings and trigger the guardrail if the response is considered unsafe.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The unique identifier of the guardrail. Format: `projects/{project}/locations/{location}/apps/{app}/guardrails/{guardrail}`",
  ).optional(),
  guardrailId: z.string().describe(
    "Optional. The ID to use for the guardrail, which will become the final component of the guardrail's resource name. If not provided, a unique ID will be automatically assigned for the guardrail.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Gemini Enterprise for Customer Experience Apps.Guardrails. Registered at `@swamp/gcp/ces/apps-guardrails`. */
export const model = {
  type: "@swamp/gcp/ces/apps-guardrails",
  version: "2026.05.18.1",
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
      toVersion: "2026.05.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Guardrail contains a list of checks and balances to keep the agents safe and ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a guardrails",
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
        if (g["codeCallback"] !== undefined) {
          body["codeCallback"] = g["codeCallback"];
        }
        if (g["contentFilter"] !== undefined) {
          body["contentFilter"] = g["contentFilter"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["enabled"] !== undefined) body["enabled"] = g["enabled"];
        if (g["llmPolicy"] !== undefined) body["llmPolicy"] = g["llmPolicy"];
        if (g["llmPromptSecurity"] !== undefined) {
          body["llmPromptSecurity"] = g["llmPromptSecurity"];
        }
        if (g["modelSafety"] !== undefined) {
          body["modelSafety"] = g["modelSafety"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["guardrailId"] !== undefined) {
          body["guardrailId"] = g["guardrailId"];
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
      description: "Get a guardrails",
      arguments: z.object({
        identifier: z.string().describe("The name of the guardrails"),
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
      description: "Update guardrails attributes",
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
        if (g["codeCallback"] !== undefined) {
          body["codeCallback"] = g["codeCallback"];
        }
        if (g["contentFilter"] !== undefined) {
          body["contentFilter"] = g["contentFilter"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["enabled"] !== undefined) body["enabled"] = g["enabled"];
        if (g["llmPolicy"] !== undefined) body["llmPolicy"] = g["llmPolicy"];
        if (g["llmPromptSecurity"] !== undefined) {
          body["llmPromptSecurity"] = g["llmPromptSecurity"];
        }
        if (g["modelSafety"] !== undefined) {
          body["modelSafety"] = g["modelSafety"];
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
      description: "Delete the guardrails",
      arguments: z.object({
        identifier: z.string().describe("The name of the guardrails"),
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
      description: "Sync guardrails state from GCP",
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
