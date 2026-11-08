// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/gcp/aiplatform/agents
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Agent Platform Agents.
 *
 * A Vertex agent contains instructions and configurations for the LLM to execute a certain task.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
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

const BASE_URL = "https://aiplatform.googleapis.com/";

const GET_CONFIG = {
  "id": "aiplatform.projects.locations.agents.get",
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
  "id": "aiplatform.projects.locations.agents.create",
  "path": "v1/{+parent}/agents",
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
  "id": "aiplatform.projects.locations.agents.patch",
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
  "id": "aiplatform.projects.locations.agents.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
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
  "id": "aiplatform.projects.locations.agents.list",
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
  agentIdentity: z.object({
    email: z.string().describe(
      "Optional. The email address representing the agent's principal identity. For Google Workspace agents, the email should be on a verified customer domain.",
    ).optional(),
    gaiaId: z.string().describe(
      "Output only. The agent's own obfuscated Gaia id. Set only for an A2 (CoWorker) agent, which is the only kind that has a first-class Gaia account of its own. An A1 (Personal) agent has no `AgentIdentity` at all: it acts on behalf of its owner, so the identity it runs as is `Agent.owner`, and there is no separate Gaia account to name. Populated asynchronously once the agent identity is provisioned, so it may be absent from the `CreateAgent` LRO response and present on `GetAgent`/`ListAgents`.",
    ).optional(),
    tenant: z.object({
      id: z.string().describe("Optional. The unique raw ID of the tenant.")
        .optional(),
      type: z.enum(["TYPE_UNSPECIFIED", "WORKSPACE_CUSTOMER"]).describe(
        "Optional. The type of the tenant.",
      ).optional(),
    }).describe(
      'Optional. The tenant / customer context under which this agent runs. For Google Workspace, this is the obfuscated Customer ID (e.g. "C0123abcd").',
    ).optional(),
  }).describe(
    "Optional. Immutable. The identity configuration of the agent. Immutable: the agent's own identity determines the A2 (CoWorker) archetype and the minted SPIFFE, so it cannot change after creation (no A1A2 transition).",
  ).optional(),
  allowedTeammates: z.object({
    teammates: z.array(z.object({
      email: z.string().describe("Optional. Email address of the teammate.")
        .optional(),
      expansionMode: z.enum([
        "EXPANSION_MODE_UNSPECIFIED",
        "INFER",
        "EXPANDED",
        "NON_EXPANDED",
      ]).describe("Optional. Expansion mode for group or space teammates.")
        .optional(),
      gaiaId: z.string().describe(
        "Optional. Obfuscated Gaia id of the teammate. OBFUSCATED, never a raw Gaia id -- the same form as `Principal.id` and every other Gaia id this API surfaces, so the two are comparable. A string rather than an int64 for that reason: the obfuscated form is not a number.",
      ).optional(),
    })).describe(
      "Optional. The teammates the agent is permitted to contact. At most 500. OUTPUT: always returned. An empty list means the agent has no teammates, not that the field went unread. INPUT: the complete desired set, not a delta -- teammates absent from it are removed. The backing roster is updated asynchronously and best-effort after the write returns, so it may briefly lag what `GetAgent` reports. What the agent is actually able to reach follows the roster, not this field, until the two converge.",
    ).optional(),
  }).describe(
    "Optional. The identities this agent is allowed to contact outbound (for example over Gmail or Chat). Stored on the agent and always returned by `GetAgent`; see the field comments on `AllowedTeammates`.",
  ).optional(),
  base_agent: z.string().describe(
    "Required. Immutable. The base agent for the agent. Supported values: * `antigravity-preview-05-2026` Immutable: `UpdateAgent` rejects a change, including clearing it. The kind of agent this is gets derived from this field when the agent is created and is recorded then; nothing recomputes it afterwards, so a later change would leave the agent described as one kind and behaving as another. Create a new agent instead.",
  ).optional(),
  base_environment: z.string().describe(
    "Optional. The base environment configuration for the agent. Valid types: * A string value for the environment ID, or `remote` for the default. * A struct value for the `environment_config`.",
  ).optional(),
  description: z.string().describe("Optional. The description of the agent.")
    .optional(),
  encryptionSpec: z.object({
    kmsKeyName: z.string().describe(
      "Required. Resource name of the Cloud KMS key used to protect the resource. The Cloud KMS key must be in the same region as the resource. It must have the format `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
    ).optional(),
  }).describe(
    "Optional. Immutable. Customer-managed encryption key spec for an Agent. If set, this agent's user data will be secured by this key; if not set, it is secured by a Google-managed key. Cannot be changed after the agent is created.",
  ).optional(),
  id: z.string().describe(
    "Immutable. The user-specified ID for the agent. This ID becomes the final component of the agent resource name. If not provided, Vertex AI will generate a value for this ID. The ID can be up to 63 characters and must match the regular expression `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`.",
  ).optional(),
  memoryConfig: z.object({
    disableMemory: z.boolean().describe(
      "Optional. If true, memory is disabled for the agent as a whole: across every task it runs, the agent neither reads existing memories into the prompt nor forms new ones. Memory is on by default, and this is the setting that wins. A task may turn memory off for itself alone with `TaskSpec.scope.memory_config.disable_memory`, but cannot turn it back on while this is true; the two are OR'ed. This level wins because it is the mutable one. Turning it on has to cover the tasks that already exist, whose stored specs still say whatever they were created with, so the agent's current value is re-applied every time a session opens, including on a resume. Memories already stored are retained and stay readable by the agent's users; this governs only whether the agent can access and modify them.",
    ).optional(),
  }).describe("Optional. Memory settings for the agent.").optional(),
  metadata: z.record(z.string(), z.string()).describe(
    "Optional. The metadata for the agent.",
  ).optional(),
  modelConfig: z.object({
    model: z.string().describe(
      'Optional. Publisher model resource name (an `aiplatform.googleapis.com/PublisherModel`) of the form "publishers/{publisher}/models/{model}", e.g. "publishers/anthropic/models/claude-opus-4-8" or "publishers/google/models/gemini-3-flash". Empty means the agent\'s default gemini model.',
    ).optional(),
    temperature: z.number().describe(
      "Optional. Sampling temperature for the model's generation config (valid range (0.0, 2.0]); a value outside that range leaves the backend default standing.",
    ).optional(),
  }).describe(
    "Optional. Model configuration for the agent. When set, tasks running under this agent default to this model configuration if they do not specify their own.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the agent. Format: `projects/{project}/locations/{location}/agents/{agent}`.",
  ).optional(),
  observabilityConfig: z.object({
    observabilityEnabled: z.boolean().describe(
      "Optional. Enables observability for this agent's sessions: OpenTelemetry span emission covering tool names, model names, token counts, latencies and status. If `false`, the other fields here are ignored.",
    ).optional(),
    sensitiveLoggingEnabled: z.boolean().describe(
      "Optional. Enables sensitive logging. Sensitive logging includes customer core content (prompts, model completions, tool argument payloads and tool responses). If `false`, those are sanitized and only structural attributes are recorded. No effect unless `observability_enabled` is true. Settable and returned, but NOT YET ENFORCED. Nothing reads it at runtime, so `true` does not currently cause content to be captured, and `false` is not what keeps content from being captured. Treat it as a recorded intention that takes effect when enforcement lands.",
    ).optional(),
  }).describe("Optional. Observability settings for this agent's sessions.")
    .optional(),
  owner: z.object({
    id: z.string().describe(
      "Optional. The system unique identifier of the principal.",
    ).optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "USER"]).describe(
      "Optional. The type of the principal.",
    ).optional(),
  }).describe(
    "Optional. The human owner (principal) the agent acts on behalf of (A1 Personal). Mutable by design: ownership is meant to be reassignable (e.g. by an admin). On create an A1 (Personal) agent may omit it and the control plane defaults it to the caller; an A2 (CoWorker) agent must set it explicitly. `owner.id` must be an *obfuscated* Gaia id. A raw Gaia id is rejected with INVALID_ARGUMENT naming the rule -- both forms are strings of decimal digits, so the surface would otherwise have two indistinguishable spellings of one identity. Not yet: `UpdateAgent` currently rejects a change to this field. The control plane authorizes every agent method against the owner Gaia id it persists internally at create time, and the update path does not maintain that copy — so a field write here would move the reported owner without moving the one access control uses. The guard comes out once reassignment moves both, along with the Workspace identity provisioned under the owner.",
  ).optional(),
  persona: z.object({
    avatarUrl: z.string().describe("Optional. The URL of the agent's avatar.")
      .optional(),
    displayName: z.string().describe("Required. The display name of the agent.")
      .optional(),
    personality: z.string().describe(
      "Optional. The personality style or behavioral trait of the agent.",
    ).optional(),
    role: z.string().describe(
      'Optional. The role of the agent (e.g., "Financial Analyst").',
    ).optional(),
  }).describe(
    "Optional. The persona (presentation) of the agent. Mutable: presentation only, not an archetype-derivation signal.",
  ).optional(),
  system_instruction: z.string().describe(
    "Optional. The instructions for the agent to follow. These instructions are passed to the LLM as a system instruction.",
  ).optional(),
  tools: z.array(z.object({
    headers: z.record(z.string(), z.string()).describe(
      "Optional. The headers for the MCP server, such as for authentication. Only applicable when `type` is `mcp_server`.",
    ).optional(),
    name: z.string().describe(
      "Optional. The tool's Google Cloud resource name, used to resolve the tool. Applicable when `type` is `mcp_server` or `endpoint` (a tool registered in Agent Registry), for example `projects/{project}/locations/{location}/.../mcpServers/{id}` or `projects/{project}/locations/{location}/.../endpoints/{id}`.",
    ).optional(),
    type: z.string().describe(
      "Required. The type of the tool. Supported types: * `audio_generation` * `code_execution` * `endpoint` * `filesystem` * `google_search` * `image_generation` * `mcp_server` * `speech_generation` * `url_context` * `video_generation`",
    ).optional(),
    url: z.string().describe(
      "Optional. Fallback for the tool's runtime reference, consumed by `CreateAgent` to create the downstream AI App. Applicable when `type` is `mcp_server` or `endpoint`, and optional: the Agent service derives the runtime reference from `name` via Agent Registry (`GetMcpServer` / `GetEndpoint`), and reads this only when that lookup yields none.",
    ).optional(),
  })).describe("Optional. The tools available to the agent.").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  agentIdentity: z.object({
    email: z.string(),
    gaiaId: z.string(),
    tenant: z.object({
      id: z.string(),
      type: z.string(),
    }).partial(),
  }).partial().optional(),
  aiApplication: z.string().optional(),
  allowedTeammates: z.object({
    teammates: z.array(
      z.object({
        email: z.string(),
        expansionMode: z.string(),
        gaiaId: z.string(),
      }).partial(),
    ),
  }).partial().optional(),
  base_agent: z.string().optional(),
  base_environment: z.string().optional(),
  created: z.string().optional(),
  description: z.string().optional(),
  effectiveIdentity: z.string().optional(),
  encryptionSpec: z.object({
    kmsKeyName: z.string(),
  }).partial().optional(),
  id: z.string().optional(),
  memoryConfig: z.object({
    disableMemory: z.boolean(),
  }).partial().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  modelConfig: z.object({
    model: z.string(),
    temperature: z.number(),
  }).partial().optional(),
  name: z.string(),
  object: z.string().optional(),
  observabilityConfig: z.object({
    observabilityEnabled: z.boolean(),
    sensitiveLoggingEnabled: z.boolean(),
  }).partial().optional(),
  owner: z.object({
    id: z.string(),
    type: z.string(),
  }).partial().optional(),
  persona: z.object({
    avatarUrl: z.string(),
    displayName: z.string(),
    personality: z.string(),
    role: z.string(),
  }).partial().optional(),
  status: z.object({
    deleteTime: z.string(),
    state: z.string(),
    suspensionReason: z.object({
      reason: z.string(),
      suspensionTime: z.string(),
    }).partial(),
  }).partial().optional(),
  system_instruction: z.string().optional(),
  tools: z.array(
    z.object({
      headers: z.record(z.string(), z.unknown()),
      name: z.string(),
      type: z.string(),
      url: z.string(),
    }).partial(),
  ).optional(),
  updated: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  agentIdentity: z.object({
    email: z.string().describe(
      "Optional. The email address representing the agent's principal identity. For Google Workspace agents, the email should be on a verified customer domain.",
    ).optional(),
    gaiaId: z.string().describe(
      "Output only. The agent's own obfuscated Gaia id. Set only for an A2 (CoWorker) agent, which is the only kind that has a first-class Gaia account of its own. An A1 (Personal) agent has no `AgentIdentity` at all: it acts on behalf of its owner, so the identity it runs as is `Agent.owner`, and there is no separate Gaia account to name. Populated asynchronously once the agent identity is provisioned, so it may be absent from the `CreateAgent` LRO response and present on `GetAgent`/`ListAgents`.",
    ).optional(),
    tenant: z.object({
      id: z.string().describe("Optional. The unique raw ID of the tenant.")
        .optional(),
      type: z.enum(["TYPE_UNSPECIFIED", "WORKSPACE_CUSTOMER"]).describe(
        "Optional. The type of the tenant.",
      ).optional(),
    }).describe(
      'Optional. The tenant / customer context under which this agent runs. For Google Workspace, this is the obfuscated Customer ID (e.g. "C0123abcd").',
    ).optional(),
  }).describe(
    "Optional. Immutable. The identity configuration of the agent. Immutable: the agent's own identity determines the A2 (CoWorker) archetype and the minted SPIFFE, so it cannot change after creation (no A1A2 transition).",
  ).optional(),
  allowedTeammates: z.object({
    teammates: z.array(z.object({
      email: z.string().describe("Optional. Email address of the teammate.")
        .optional(),
      expansionMode: z.enum([
        "EXPANSION_MODE_UNSPECIFIED",
        "INFER",
        "EXPANDED",
        "NON_EXPANDED",
      ]).describe("Optional. Expansion mode for group or space teammates.")
        .optional(),
      gaiaId: z.string().describe(
        "Optional. Obfuscated Gaia id of the teammate. OBFUSCATED, never a raw Gaia id -- the same form as `Principal.id` and every other Gaia id this API surfaces, so the two are comparable. A string rather than an int64 for that reason: the obfuscated form is not a number.",
      ).optional(),
    })).describe(
      "Optional. The teammates the agent is permitted to contact. At most 500. OUTPUT: always returned. An empty list means the agent has no teammates, not that the field went unread. INPUT: the complete desired set, not a delta -- teammates absent from it are removed. The backing roster is updated asynchronously and best-effort after the write returns, so it may briefly lag what `GetAgent` reports. What the agent is actually able to reach follows the roster, not this field, until the two converge.",
    ).optional(),
  }).describe(
    "Optional. The identities this agent is allowed to contact outbound (for example over Gmail or Chat). Stored on the agent and always returned by `GetAgent`; see the field comments on `AllowedTeammates`.",
  ).optional(),
  base_agent: z.string().describe(
    "Required. Immutable. The base agent for the agent. Supported values: * `antigravity-preview-05-2026` Immutable: `UpdateAgent` rejects a change, including clearing it. The kind of agent this is gets derived from this field when the agent is created and is recorded then; nothing recomputes it afterwards, so a later change would leave the agent described as one kind and behaving as another. Create a new agent instead.",
  ).optional(),
  base_environment: z.string().describe(
    "Optional. The base environment configuration for the agent. Valid types: * A string value for the environment ID, or `remote` for the default. * A struct value for the `environment_config`.",
  ).optional(),
  description: z.string().describe("Optional. The description of the agent.")
    .optional(),
  encryptionSpec: z.object({
    kmsKeyName: z.string().describe(
      "Required. Resource name of the Cloud KMS key used to protect the resource. The Cloud KMS key must be in the same region as the resource. It must have the format `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
    ).optional(),
  }).describe(
    "Optional. Immutable. Customer-managed encryption key spec for an Agent. If set, this agent's user data will be secured by this key; if not set, it is secured by a Google-managed key. Cannot be changed after the agent is created.",
  ).optional(),
  id: z.string().describe(
    "Immutable. The user-specified ID for the agent. This ID becomes the final component of the agent resource name. If not provided, Vertex AI will generate a value for this ID. The ID can be up to 63 characters and must match the regular expression `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`.",
  ).optional(),
  memoryConfig: z.object({
    disableMemory: z.boolean().describe(
      "Optional. If true, memory is disabled for the agent as a whole: across every task it runs, the agent neither reads existing memories into the prompt nor forms new ones. Memory is on by default, and this is the setting that wins. A task may turn memory off for itself alone with `TaskSpec.scope.memory_config.disable_memory`, but cannot turn it back on while this is true; the two are OR'ed. This level wins because it is the mutable one. Turning it on has to cover the tasks that already exist, whose stored specs still say whatever they were created with, so the agent's current value is re-applied every time a session opens, including on a resume. Memories already stored are retained and stay readable by the agent's users; this governs only whether the agent can access and modify them.",
    ).optional(),
  }).describe("Optional. Memory settings for the agent.").optional(),
  metadata: z.record(z.string(), z.string()).describe(
    "Optional. The metadata for the agent.",
  ).optional(),
  modelConfig: z.object({
    model: z.string().describe(
      'Optional. Publisher model resource name (an `aiplatform.googleapis.com/PublisherModel`) of the form "publishers/{publisher}/models/{model}", e.g. "publishers/anthropic/models/claude-opus-4-8" or "publishers/google/models/gemini-3-flash". Empty means the agent\'s default gemini model.',
    ).optional(),
    temperature: z.number().describe(
      "Optional. Sampling temperature for the model's generation config (valid range (0.0, 2.0]); a value outside that range leaves the backend default standing.",
    ).optional(),
  }).describe(
    "Optional. Model configuration for the agent. When set, tasks running under this agent default to this model configuration if they do not specify their own.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the agent. Format: `projects/{project}/locations/{location}/agents/{agent}`.",
  ).optional(),
  observabilityConfig: z.object({
    observabilityEnabled: z.boolean().describe(
      "Optional. Enables observability for this agent's sessions: OpenTelemetry span emission covering tool names, model names, token counts, latencies and status. If `false`, the other fields here are ignored.",
    ).optional(),
    sensitiveLoggingEnabled: z.boolean().describe(
      "Optional. Enables sensitive logging. Sensitive logging includes customer core content (prompts, model completions, tool argument payloads and tool responses). If `false`, those are sanitized and only structural attributes are recorded. No effect unless `observability_enabled` is true. Settable and returned, but NOT YET ENFORCED. Nothing reads it at runtime, so `true` does not currently cause content to be captured, and `false` is not what keeps content from being captured. Treat it as a recorded intention that takes effect when enforcement lands.",
    ).optional(),
  }).describe("Optional. Observability settings for this agent's sessions.")
    .optional(),
  owner: z.object({
    id: z.string().describe(
      "Optional. The system unique identifier of the principal.",
    ).optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "USER"]).describe(
      "Optional. The type of the principal.",
    ).optional(),
  }).describe(
    "Optional. The human owner (principal) the agent acts on behalf of (A1 Personal). Mutable by design: ownership is meant to be reassignable (e.g. by an admin). On create an A1 (Personal) agent may omit it and the control plane defaults it to the caller; an A2 (CoWorker) agent must set it explicitly. `owner.id` must be an *obfuscated* Gaia id. A raw Gaia id is rejected with INVALID_ARGUMENT naming the rule -- both forms are strings of decimal digits, so the surface would otherwise have two indistinguishable spellings of one identity. Not yet: `UpdateAgent` currently rejects a change to this field. The control plane authorizes every agent method against the owner Gaia id it persists internally at create time, and the update path does not maintain that copy — so a field write here would move the reported owner without moving the one access control uses. The guard comes out once reassignment moves both, along with the Workspace identity provisioned under the owner.",
  ).optional(),
  persona: z.object({
    avatarUrl: z.string().describe("Optional. The URL of the agent's avatar.")
      .optional(),
    displayName: z.string().describe("Required. The display name of the agent.")
      .optional(),
    personality: z.string().describe(
      "Optional. The personality style or behavioral trait of the agent.",
    ).optional(),
    role: z.string().describe(
      'Optional. The role of the agent (e.g., "Financial Analyst").',
    ).optional(),
  }).describe(
    "Optional. The persona (presentation) of the agent. Mutable: presentation only, not an archetype-derivation signal.",
  ).optional(),
  system_instruction: z.string().describe(
    "Optional. The instructions for the agent to follow. These instructions are passed to the LLM as a system instruction.",
  ).optional(),
  tools: z.array(z.object({
    headers: z.record(z.string(), z.string()).describe(
      "Optional. The headers for the MCP server, such as for authentication. Only applicable when `type` is `mcp_server`.",
    ).optional(),
    name: z.string().describe(
      "Optional. The tool's Google Cloud resource name, used to resolve the tool. Applicable when `type` is `mcp_server` or `endpoint` (a tool registered in Agent Registry), for example `projects/{project}/locations/{location}/.../mcpServers/{id}` or `projects/{project}/locations/{location}/.../endpoints/{id}`.",
    ).optional(),
    type: z.string().describe(
      "Required. The type of the tool. Supported types: * `audio_generation` * `code_execution` * `endpoint` * `filesystem` * `google_search` * `image_generation` * `mcp_server` * `speech_generation` * `url_context` * `video_generation`",
    ).optional(),
    url: z.string().describe(
      "Optional. Fallback for the tool's runtime reference, consumed by `CreateAgent` to create the downstream AI App. Applicable when `type` is `mcp_server` or `endpoint`, and optional: the Agent service derives the runtime reference from `name` via Agent Registry (`GetMcpServer` / `GetEndpoint`), and reads this only when that lookup yields none.",
    ).optional(),
  })).describe("Optional. The tools available to the agent.").optional(),
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

/** Swamp extension model for Google Cloud Agent Platform Agents. Registered at `@swamp/gcp/aiplatform/agents`. */
export const model = {
  type: "@swamp/gcp/aiplatform/agents",
  version: "2026.11.08.1",
  upgrades: [
    {
      toVersion: "2026.07.21.2",
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
      toVersion: "2026.08.22.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.30.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.04.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.07.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.07.2",
      description: "Removed: headers, type, url",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { headers: _headers, type: _type, url: _url, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.09.12.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.20.1",
      description: "Added: observabilityConfig",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.28.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.03.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.11.1",
      description: "Added: modelConfig",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.17.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.29.1",
      description: "Added: idpNonce",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.31.1",
      description: "Removed: idpNonce",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { idpNonce: _idpNonce, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.11.07.1",
      description:
        "Added: agentIdentity, allowedTeammates, encryptionSpec, memoryConfig, owner, persona",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.11.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A Vertex agent contains instructions and configurations for the LLM to execut...",
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
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["agentIdentity"] !== undefined) {
          body["agentIdentity"] = g["agentIdentity"];
        }
        if (g["allowedTeammates"] !== undefined) {
          body["allowedTeammates"] = g["allowedTeammates"];
        }
        if (g["base_agent"] !== undefined) body["base_agent"] = g["base_agent"];
        if (g["base_environment"] !== undefined) {
          body["base_environment"] = g["base_environment"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["encryptionSpec"] !== undefined) {
          body["encryptionSpec"] = g["encryptionSpec"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["memoryConfig"] !== undefined) {
          body["memoryConfig"] = g["memoryConfig"];
        }
        if (g["metadata"] !== undefined) body["metadata"] = g["metadata"];
        if (g["modelConfig"] !== undefined) {
          body["modelConfig"] = g["modelConfig"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["observabilityConfig"] !== undefined) {
          body["observabilityConfig"] = g["observabilityConfig"];
        }
        if (g["owner"] !== undefined) body["owner"] = g["owner"];
        if (g["persona"] !== undefined) body["persona"] = g["persona"];
        if (g["system_instruction"] !== undefined) {
          body["system_instruction"] = g["system_instruction"];
        }
        if (g["tools"] !== undefined) body["tools"] = g["tools"];
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
              "parent": `projects/${projectId}/locations/${
                String(g["location"] ?? "")
              }`,
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
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
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            existingName ?? g["name"]?.toString() ?? "",
          );
        }
        const body: Record<string, unknown> = {};
        if (g["allowedTeammates"] !== undefined) {
          body["allowedTeammates"] = g["allowedTeammates"];
        }
        if (g["base_environment"] !== undefined) {
          body["base_environment"] = g["base_environment"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["memoryConfig"] !== undefined) {
          body["memoryConfig"] = g["memoryConfig"];
        }
        if (g["metadata"] !== undefined) body["metadata"] = g["metadata"];
        if (g["modelConfig"] !== undefined) {
          body["modelConfig"] = g["modelConfig"];
        }
        if (g["observabilityConfig"] !== undefined) {
          body["observabilityConfig"] = g["observabilityConfig"];
        }
        if (g["owner"] !== undefined) body["owner"] = g["owner"];
        if (g["persona"] !== undefined) body["persona"] = g["persona"];
        if (g["system_instruction"] !== undefined) {
          body["system_instruction"] = g["system_instruction"];
        }
        if (g["tools"] !== undefined) body["tools"] = g["tools"];
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
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
              `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
          'Optional. An [AIP-160](https://google.aip.dev/160) filter over the returned agents. An empty filter returns the unfiltered collection. Supported fields, and the operators each accepts: * `created` * `updated` * `base_agent` * `metadata.agent_type` `created` and `updated` are timestamps and take an RFC-3339 value, for example `2026-08-01T00:00:00Z`. Supported operators: `=`, `!=`, `<`, `>`, `<=`, `>=`, `:`, `AND`, `OR`, `NOT` (equivalently `-`), and parentheses. Note that `OR` binds more tightly than `AND`, so `a AND b OR c` means `a AND (b OR c)`; parentheses are recommended, not required. `metadata.agent_type` accepts only the value `"default_agent"`, matched exactly: `metadata.agent_type:"default_agent"` selects the caller\'s default agent, of which there is at most one, and the negated form selects the rest. Any other value is `INVALID_ARGUMENT` rather than an empty page -- `metadata` is an opaque blob, so only this one marker is indexed, and the server cannot answer a question about the others. An agent designated before the server began recording the marker is not matched by the positive form; there is no backfill. `base_agent` accepts `=` and `!=` against the value an agent was created with, and selects only among the agents you own: an agent that belongs to the project rather than to a user is never returned by a filter naming it, including the negated form. An agent created before the server began recording the value is not matched either. Example: `created > "2026-08-01T00:00:00Z" AND updated < "2026-08-09T00:00:00Z"`. IMPORTANT -- `base_agent` and `metadata.agent_type` select only among the agents you own. An agent that belongs to the project rather than to a user is never returned by a filter naming either of them, including a negated one: `base_agent != "some-value"` returns your matching agents and no project-owned agents at all. Filtering on `created` or `updated` alone is unaffected and still spans both. If you want every agent in the project, do not filter on these two fields. Not supported: any field other than those listed above, wildcards other than `field:*`, bare literals with no field name, functions, and the regular-expression operators `=~` and `!~`. A filter that names an unsupported field, exceeds 1000 characters, or nests parentheses more than 5 deep fails with `INVALID_ARGUMENT`.',
        ).optional(),
        orderBy: z.string().describe(
          "Optional. A comma-separated list of fields to order by. Supported fields: * `created` * `updated` Use `desc` after a field name for descending order. Example: `created desc`.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The maximum number of agents to return. The service may return fewer than this value. The maximum page size is 100; values above 100 will be coerced to 100. If unspecified, the default page size is 10.",
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
    get_iam_policy: {
      description: "get iam policy",
      arguments: z.object({
        options_requestedPolicyVersion: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        if (args["options_requestedPolicyVersion"] !== undefined) {
          params["options.requestedPolicyVersion"] = String(
            args["options_requestedPolicyVersion"],
          );
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "aiplatform.projects.locations.agents.getIamPolicy",
            "path": "v1/{+resource}:getIamPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "options.requestedPolicyVersion": { "location": "query" },
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          {},
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    set_iam_policy: {
      description: "set iam policy",
      arguments: z.object({
        policy: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["policy"] !== undefined) body["policy"] = args["policy"];
        const result = await createResource(
          baseUrl,
          {
            "id": "aiplatform.projects.locations.agents.setIamPolicy",
            "path": "v1/{+resource}:setIamPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
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
    test_iam_permissions: {
      description: "test iam permissions",
      arguments: z.object({
        permissions: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        if (args["permissions"] !== undefined) {
          params["permissions"] = String(args["permissions"]);
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "aiplatform.projects.locations.agents.testIamPermissions",
            "path": "v1/{+resource}:testIamPermissions",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "permissions": { "location": "query" },
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          {},
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
