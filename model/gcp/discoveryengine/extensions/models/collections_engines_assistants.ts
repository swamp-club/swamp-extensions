// Auto-generated extension model for @swamp/gcp/discoveryengine/collections-engines-assistants
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Discovery Engine Collections.Engines.Assistants.
 *
 * Discovery Engine Assistant resource.
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
  return `${parent}/assistants/${shortName}`;
}

const BASE_URL = "https://discoveryengine.googleapis.com/";

const GET_CONFIG = {
  "id": "discoveryengine.projects.locations.collections.engines.assistants.get",
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
  "id":
    "discoveryengine.projects.locations.collections.engines.assistants.create",
  "path": "v1/{+parent}/assistants",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "assistantId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id":
    "discoveryengine.projects.locations.collections.engines.assistants.patch",
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
  "id":
    "discoveryengine.projects.locations.collections.engines.assistants.delete",
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
  "id":
    "discoveryengine.projects.locations.collections.engines.assistants.list",
  "path": "v1/{+parent}/assistants",
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
  customerPolicy: z.object({
    bannedPhrases: z.array(z.object({
      ignoreDiacritics: z.boolean().describe(
        'Optional. If true, diacritical marks (e.g., accents, umlauts) are ignored when matching banned phrases. For example, "cafe" would match "café".',
      ).optional(),
      matchType: z.enum([
        "BANNED_PHRASE_MATCH_TYPE_UNSPECIFIED",
        "SIMPLE_STRING_MATCH",
        "WORD_BOUNDARY_STRING_MATCH",
      ]).describe("Optional. Match type for the banned phrase.").optional(),
      phrase: z.string().describe(
        "Required. The raw string content to be banned.",
      ).optional(),
    })).describe("Optional. List of banned phrases.").optional(),
    modelArmorConfig: z.object({
      failureMode: z.enum([
        "FAILURE_MODE_UNSPECIFIED",
        "FAIL_OPEN",
        "FAIL_CLOSED",
      ]).describe(
        "Optional. Defines the failure mode for Model Armor sanitization.",
      ).optional(),
      responseTemplate: z.string().describe(
        "Optional. The resource name of the Model Armor template for sanitizing assistant responses. Format: `projects/{project}/locations/{location}/templates/{template_id}` If not specified, no sanitization will be applied to the assistant response.",
      ).optional(),
      userPromptTemplate: z.string().describe(
        "Optional. The resource name of the Model Armor template for sanitizing user prompts. Format: `projects/{project}/locations/{location}/templates/{template_id}` If not specified, no sanitization will be applied to the user prompt.",
      ).optional(),
    }).describe(
      "Configuration for customer defined Model Armor templates to be used for sanitizing user prompts and assistant responses.",
    ).optional(),
  }).describe("Customer-defined policy for the assistant.").optional(),
  defaultWebGroundingToggleOff: z.boolean().describe(
    "Optional. This field controls the default web grounding toggle for end users if `web_grounding_type` is set to `WEB_GROUNDING_TYPE_GOOGLE_SEARCH` or `WEB_GROUNDING_TYPE_ENTERPRISE_WEB_SEARCH`. By default, this field is set to false. If `web_grounding_type` is `WEB_GROUNDING_TYPE_GOOGLE_SEARCH` or `WEB_GROUNDING_TYPE_ENTERPRISE_WEB_SEARCH`, end users will have web grounding enabled by default on UI. If true, grounding toggle will be disabled by default on UI. End users can still enable web grounding in the UI if web grounding is enabled.",
  ).optional(),
  description: z.string().describe(
    "Optional. Description for additional information. Expected to be shown on the configuration UI, not to the users of the assistant.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The assistant display name. It must be a UTF-8 encoded string with a length limit of 128 characters.",
  ).optional(),
  enabledTools: z.record(
    z.string(),
    z.object({
      toolInfo: z.array(z.object({
        toolDisplayName: z.string().describe("The display name of the tool.")
          .optional(),
        toolName: z.string().describe(
          "The name of the tool as defined by DataConnectorService.QueryAvailableActions. Note: it's using `action` in the DataConnectorService apis, but they are the same as the `tool` here.",
        ).optional(),
      })).describe("The list of tools with corresponding tool information.")
        .optional(),
    }),
  ).describe(
    'Optional. Note: not implemented yet. Use enabled_actions instead. The enabled tools on this assistant. The keys are connector name, for example "projects/{projectId}/locations/{locationId}/collections/{collectionId}/dataconnector The values consist of admin enabled tools towards the connector instance. Admin can selectively enable multiple tools on any of the connector instances that they created in the project. For example {"jira1ConnectorName": [(toolId1, "createTicket"), (toolId2, "transferTicket")], "gmail1ConnectorName": [(toolId3, "sendEmail"),..] }',
  ).optional(),
  generationConfig: z.object({
    allowedModelIds: z.array(z.string()).describe(
      "Optional. The list of models that are allowed to be used for assistant.",
    ).optional(),
    defaultLanguage: z.string().describe(
      "The default language to use for the generation of the assistant response. Use an ISO 639-1 language code such as `en`. If not specified, the language will be automatically detected.",
    ).optional(),
    defaultModelId: z.string().describe(
      "Optional. The default model to use for assistant.",
    ).optional(),
    systemInstruction: z.object({
      additionalSystemInstruction: z.string().describe(
        "Optional. Additional system instruction that will be added to the default system instruction.",
      ).optional(),
    }).describe(
      "System instruction, also known as the prompt preamble for LLM calls.",
    ).optional(),
  }).describe("Configuration for the generation of the assistant response.")
    .optional(),
  name: z.string().describe(
    "Immutable. Resource name of the assistant. Format: `projects/{project}/locations/{location}/collections/{collection}/engines/{engine}/assistants/{assistant}` It must be a UTF-8 encoded string with a length limit of 1024 characters.",
  ).optional(),
  webGroundingType: z.enum([
    "WEB_GROUNDING_TYPE_UNSPECIFIED",
    "WEB_GROUNDING_TYPE_DISABLED",
    "WEB_GROUNDING_TYPE_GOOGLE_SEARCH",
    "WEB_GROUNDING_TYPE_ENTERPRISE_WEB_SEARCH",
  ]).describe("Optional. The type of web grounding to use.").optional(),
  assistantId: z.string().describe(
    "Required. The ID to use for the Assistant, which will become the final component of the Assistant's resource name. This field must conform to [RFC-1034](https://tools.ietf.org/html/rfc1034) with a length limit of 63 characters.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  customerPolicy: z.object({
    bannedPhrases: z.array(z.object({
      ignoreDiacritics: z.boolean(),
      matchType: z.string(),
      phrase: z.string(),
    })),
    modelArmorConfig: z.object({
      failureMode: z.string(),
      responseTemplate: z.string(),
      userPromptTemplate: z.string(),
    }),
  }).optional(),
  defaultWebGroundingToggleOff: z.boolean().optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  enabledTools: z.record(z.string(), z.unknown()).optional(),
  generationConfig: z.object({
    allowedModelIds: z.array(z.string()),
    defaultLanguage: z.string(),
    defaultModelId: z.string(),
    systemInstruction: z.object({
      additionalSystemInstruction: z.string(),
    }),
  }).optional(),
  name: z.string(),
  updateTime: z.string().optional(),
  webGroundingType: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  customerPolicy: z.object({
    bannedPhrases: z.array(z.object({
      ignoreDiacritics: z.boolean().describe(
        'Optional. If true, diacritical marks (e.g., accents, umlauts) are ignored when matching banned phrases. For example, "cafe" would match "café".',
      ).optional(),
      matchType: z.enum([
        "BANNED_PHRASE_MATCH_TYPE_UNSPECIFIED",
        "SIMPLE_STRING_MATCH",
        "WORD_BOUNDARY_STRING_MATCH",
      ]).describe("Optional. Match type for the banned phrase.").optional(),
      phrase: z.string().describe(
        "Required. The raw string content to be banned.",
      ).optional(),
    })).describe("Optional. List of banned phrases.").optional(),
    modelArmorConfig: z.object({
      failureMode: z.enum([
        "FAILURE_MODE_UNSPECIFIED",
        "FAIL_OPEN",
        "FAIL_CLOSED",
      ]).describe(
        "Optional. Defines the failure mode for Model Armor sanitization.",
      ).optional(),
      responseTemplate: z.string().describe(
        "Optional. The resource name of the Model Armor template for sanitizing assistant responses. Format: `projects/{project}/locations/{location}/templates/{template_id}` If not specified, no sanitization will be applied to the assistant response.",
      ).optional(),
      userPromptTemplate: z.string().describe(
        "Optional. The resource name of the Model Armor template for sanitizing user prompts. Format: `projects/{project}/locations/{location}/templates/{template_id}` If not specified, no sanitization will be applied to the user prompt.",
      ).optional(),
    }).describe(
      "Configuration for customer defined Model Armor templates to be used for sanitizing user prompts and assistant responses.",
    ).optional(),
  }).describe("Customer-defined policy for the assistant.").optional(),
  defaultWebGroundingToggleOff: z.boolean().describe(
    "Optional. This field controls the default web grounding toggle for end users if `web_grounding_type` is set to `WEB_GROUNDING_TYPE_GOOGLE_SEARCH` or `WEB_GROUNDING_TYPE_ENTERPRISE_WEB_SEARCH`. By default, this field is set to false. If `web_grounding_type` is `WEB_GROUNDING_TYPE_GOOGLE_SEARCH` or `WEB_GROUNDING_TYPE_ENTERPRISE_WEB_SEARCH`, end users will have web grounding enabled by default on UI. If true, grounding toggle will be disabled by default on UI. End users can still enable web grounding in the UI if web grounding is enabled.",
  ).optional(),
  description: z.string().describe(
    "Optional. Description for additional information. Expected to be shown on the configuration UI, not to the users of the assistant.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The assistant display name. It must be a UTF-8 encoded string with a length limit of 128 characters.",
  ).optional(),
  enabledTools: z.record(
    z.string(),
    z.object({
      toolInfo: z.array(z.object({
        toolDisplayName: z.string().describe("The display name of the tool.")
          .optional(),
        toolName: z.string().describe(
          "The name of the tool as defined by DataConnectorService.QueryAvailableActions. Note: it's using `action` in the DataConnectorService apis, but they are the same as the `tool` here.",
        ).optional(),
      })).describe("The list of tools with corresponding tool information.")
        .optional(),
    }),
  ).describe(
    'Optional. Note: not implemented yet. Use enabled_actions instead. The enabled tools on this assistant. The keys are connector name, for example "projects/{projectId}/locations/{locationId}/collections/{collectionId}/dataconnector The values consist of admin enabled tools towards the connector instance. Admin can selectively enable multiple tools on any of the connector instances that they created in the project. For example {"jira1ConnectorName": [(toolId1, "createTicket"), (toolId2, "transferTicket")], "gmail1ConnectorName": [(toolId3, "sendEmail"),..] }',
  ).optional(),
  generationConfig: z.object({
    allowedModelIds: z.array(z.string()).describe(
      "Optional. The list of models that are allowed to be used for assistant.",
    ).optional(),
    defaultLanguage: z.string().describe(
      "The default language to use for the generation of the assistant response. Use an ISO 639-1 language code such as `en`. If not specified, the language will be automatically detected.",
    ).optional(),
    defaultModelId: z.string().describe(
      "Optional. The default model to use for assistant.",
    ).optional(),
    systemInstruction: z.object({
      additionalSystemInstruction: z.string().describe(
        "Optional. Additional system instruction that will be added to the default system instruction.",
      ).optional(),
    }).describe(
      "System instruction, also known as the prompt preamble for LLM calls.",
    ).optional(),
  }).describe("Configuration for the generation of the assistant response.")
    .optional(),
  name: z.string().describe(
    "Immutable. Resource name of the assistant. Format: `projects/{project}/locations/{location}/collections/{collection}/engines/{engine}/assistants/{assistant}` It must be a UTF-8 encoded string with a length limit of 1024 characters.",
  ).optional(),
  webGroundingType: z.enum([
    "WEB_GROUNDING_TYPE_UNSPECIFIED",
    "WEB_GROUNDING_TYPE_DISABLED",
    "WEB_GROUNDING_TYPE_GOOGLE_SEARCH",
    "WEB_GROUNDING_TYPE_ENTERPRISE_WEB_SEARCH",
  ]).describe("Optional. The type of web grounding to use.").optional(),
  assistantId: z.string().describe(
    "Required. The ID to use for the Assistant, which will become the final component of the Assistant's resource name. This field must conform to [RFC-1034](https://tools.ietf.org/html/rfc1034) with a length limit of 63 characters.",
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

/** Swamp extension model for Google Cloud Discovery Engine Collections.Engines.Assistants. Registered at `@swamp/gcp/discoveryengine/collections-engines-assistants`. */
export const model = {
  type: "@swamp/gcp/discoveryengine/collections-engines-assistants",
  version: "2026.06.07.1",
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
      toVersion: "2026.04.14.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Discovery Engine Assistant resource.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a assistants",
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
        if (g["customerPolicy"] !== undefined) {
          body["customerPolicy"] = g["customerPolicy"];
        }
        if (g["defaultWebGroundingToggleOff"] !== undefined) {
          body["defaultWebGroundingToggleOff"] =
            g["defaultWebGroundingToggleOff"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["enabledTools"] !== undefined) {
          body["enabledTools"] = g["enabledTools"];
        }
        if (g["generationConfig"] !== undefined) {
          body["generationConfig"] = g["generationConfig"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["webGroundingType"] !== undefined) {
          body["webGroundingType"] = g["webGroundingType"];
        }
        if (g["assistantId"] !== undefined) {
          body["assistantId"] = g["assistantId"];
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
      description: "Get a assistants",
      arguments: z.object({
        identifier: z.string().describe("The name of the assistants"),
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
      description: "Update assistants attributes",
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
        if (g["customerPolicy"] !== undefined) {
          body["customerPolicy"] = g["customerPolicy"];
        }
        if (g["defaultWebGroundingToggleOff"] !== undefined) {
          body["defaultWebGroundingToggleOff"] =
            g["defaultWebGroundingToggleOff"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["enabledTools"] !== undefined) {
          body["enabledTools"] = g["enabledTools"];
        }
        if (g["generationConfig"] !== undefined) {
          body["generationConfig"] = g["generationConfig"];
        }
        if (g["webGroundingType"] !== undefined) {
          body["webGroundingType"] = g["webGroundingType"];
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
      description: "Delete the assistants",
      arguments: z.object({
        identifier: z.string().describe("The name of the assistants"),
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
      description: "Sync assistants state from GCP",
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
      description: "List assistants resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "Maximum number of Assistants to return. If unspecified, defaults to 100. The maximum allowed value is 1000; anything above that will be coerced down to 1000.",
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
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "assistants",
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
    stream_assist: {
      description: "stream assist",
      arguments: z.object({
        generationSpec: z.any().optional(),
        query: z.any().optional(),
        session: z.any().optional(),
        toolsSpec: z.any().optional(),
        userMetadata: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["generationSpec"] !== undefined) {
          body["generationSpec"] = args["generationSpec"];
        }
        if (args["query"] !== undefined) body["query"] = args["query"];
        if (args["session"] !== undefined) body["session"] = args["session"];
        if (args["toolsSpec"] !== undefined) {
          body["toolsSpec"] = args["toolsSpec"];
        }
        if (args["userMetadata"] !== undefined) {
          body["userMetadata"] = args["userMetadata"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "discoveryengine.projects.locations.collections.engines.assistants.streamAssist",
            "path": "v1/{+name}:streamAssist",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
