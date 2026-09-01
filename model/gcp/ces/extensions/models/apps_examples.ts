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

// Auto-generated extension model for @swamp/gcp/ces/apps-examples
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Gemini Enterprise for Customer Experience Apps.Examples.
 *
 * An example represents a sample conversation between the user and the agent(s).
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
  return `${parent}/examples/${shortName}`;
}

const BASE_URL = "https://ces.googleapis.com/";

const GET_CONFIG = {
  "id": "ces.projects.locations.apps.examples.get",
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
  "id": "ces.projects.locations.apps.examples.create",
  "path": "v1/{+parent}/examples",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "exampleId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "ces.projects.locations.apps.examples.patch",
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
  "id": "ces.projects.locations.apps.examples.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "etag": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "ces.projects.locations.apps.examples.list",
  "path": "v1/{+parent}/examples",
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
  description: z.string().describe(
    "Optional. Human-readable description of the example.",
  ).optional(),
  displayName: z.string().describe("Required. Display name of the example.")
    .optional(),
  entryAgent: z.string().describe(
    "Optional. The agent that initially handles the conversation. If not specified, the example represents a conversation that is handled by the root agent. Format: `projects/{project}/locations/{location}/apps/{app}/agents/{agent}`",
  ).optional(),
  messages: z.array(z.object({
    chunks: z.array(z.object({
      agentTransfer: z.object({
        displayName: z.unknown().describe(
          "Output only. Display name of the agent.",
        ).optional(),
        targetAgent: z.unknown().describe(
          "Required. The agent to which the conversation is being transferred. The agent will handle the conversation from this point forward. Format: `projects/{project}/locations/{location}/apps/{app}/agents/{agent}`",
        ).optional(),
      }).describe("Optional. Agent transfer event.").optional(),
      blob: z.object({
        data: z.unknown().describe("Required. Raw bytes of the blob.")
          .optional(),
        mimeType: z.unknown().describe(
          "Required. The IANA standard MIME type of the source data.",
        ).optional(),
      }).describe("Optional. Blob data.").optional(),
      defaultVariables: z.record(z.string(), z.unknown()).describe(
        "A struct represents default variables at the start of the conversation, keyed by variable names.",
      ).optional(),
      image: z.object({
        altText: z.unknown().describe(
          "Optional. The alternative text for the image.",
        ).optional(),
        data: z.unknown().describe("Required. Raw bytes of the image.")
          .optional(),
        mimeType: z.unknown().describe(
          "Required. The IANA standard MIME type of the source data. Supported image types includes: * image/png * image/jpeg * image/webp",
        ).optional(),
      }).describe("Optional. Image data.").optional(),
      payload: z.record(z.string(), z.unknown()).describe(
        "Optional. Custom payload data.",
      ).optional(),
      text: z.string().describe("Optional. Text data.").optional(),
      toolCall: z.object({
        agentName: z.unknown().describe(
          'Output only. Human-readable name of the agent that issued this call, e.g. "Contract Architect". Empty when the root agent issued it.',
        ).optional(),
        args: z.unknown().describe(
          "Optional. The input parameters and values for the tool in JSON object format.",
        ).optional(),
        displayName: z.unknown().describe(
          "Output only. Display name of the tool.",
        ).optional(),
        id: z.unknown().describe(
          "Optional. The unique identifier of the tool call. If populated, the client should return the execution result with the matching ID in ToolResponse.",
        ).optional(),
        parentToolCallId: z.unknown().describe(
          "Output only. The id of the tool call that caused this one, when it was issued by a sub-agent working on behalf of a parent call. Empty for top-level calls. Lets a client group a sub-agent's work under the call that started it instead of rendering every step as a sibling.",
        ).optional(),
        tool: z.unknown().describe(
          "Optional. The name of the tool to execute. Format: `projects/{project}/locations/{location}/apps/{app}/tools/{tool}`",
        ).optional(),
        toolsetTool: z.unknown().describe(
          "Optional. The toolset tool to execute.",
        ).optional(),
      }).describe("Optional. Tool execution request.").optional(),
      toolResponse: z.object({
        agentName: z.unknown().describe(
          'Output only. Human-readable name of the agent that issued this call, e.g. "Contract Architect". Empty when the root agent issued it.',
        ).optional(),
        displayName: z.unknown().describe(
          "Output only. Display name of the tool.",
        ).optional(),
        id: z.unknown().describe(
          "Optional. The matching ID of the tool call the response is for.",
        ).optional(),
        parentToolCallId: z.unknown().describe(
          "Output only. The id of the tool call that caused this one, when it was issued by a sub-agent working on behalf of a parent call. Empty for top-level calls. Lets a client group a sub-agent's work under the call that started it instead of rendering every step as a sibling.",
        ).optional(),
        response: z.unknown().describe(
          'Required. The tool execution result in JSON object format. Use "output" key to specify tool response and "error" key to specify error details (if any). If "output" and "error" keys are not specified, then whole "response" is treated as tool execution result.',
        ).optional(),
        tool: z.unknown().describe(
          "Optional. The name of the tool to execute. Format: `projects/{project}/locations/{location}/apps/{app}/tools/{tool}`",
        ).optional(),
        toolsetTool: z.unknown().describe(
          "Optional. The toolset tool that got executed.",
        ).optional(),
      }).describe("Optional. Tool execution response.").optional(),
      transcript: z.string().describe(
        "Optional. Transcript associated with the audio.",
      ).optional(),
      updatedVariables: z.record(z.string(), z.unknown()).describe(
        "A struct represents variables that were updated in the conversation, keyed by variable names.",
      ).optional(),
    })).describe("Optional. Content of the message as a series of chunks.")
      .optional(),
    eventTime: z.string().describe(
      "Optional. Timestamp when the message was sent or received. Should not be used if the message is part of an example.",
    ).optional(),
    role: z.string().describe(
      "Optional. The role within the conversation, e.g., user, agent.",
    ).optional(),
  })).describe(
    "Optional. The collection of messages that make up the conversation.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The unique identifier of the example. Format: `projects/{project}/locations/{location}/apps/{app}/examples/{example}`",
  ).optional(),
  exampleId: z.string().describe(
    "Optional. The ID to use for the example, which will become the final component of the example's resource name. If not provided, a unique ID will be automatically assigned for the example.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  entryAgent: z.string().optional(),
  etag: z.string().optional(),
  invalid: z.boolean().optional(),
  messages: z.array(z.object({
    chunks: z.array(z.object({
      agentTransfer: z.object({
        displayName: z.unknown(),
        targetAgent: z.unknown(),
      }),
      blob: z.object({
        data: z.unknown(),
        mimeType: z.unknown(),
      }),
      defaultVariables: z.record(z.string(), z.unknown()),
      image: z.object({
        altText: z.unknown(),
        data: z.unknown(),
        mimeType: z.unknown(),
      }),
      payload: z.record(z.string(), z.unknown()),
      text: z.string(),
      toolCall: z.object({
        agentName: z.unknown(),
        args: z.unknown(),
        displayName: z.unknown(),
        id: z.unknown(),
        parentToolCallId: z.unknown(),
        tool: z.unknown(),
        toolsetTool: z.unknown(),
      }),
      toolResponse: z.object({
        agentName: z.unknown(),
        displayName: z.unknown(),
        id: z.unknown(),
        parentToolCallId: z.unknown(),
        response: z.unknown(),
        tool: z.unknown(),
        toolsetTool: z.unknown(),
      }),
      transcript: z.string(),
      updatedVariables: z.record(z.string(), z.unknown()),
    })),
    eventTime: z.string(),
    role: z.string(),
  })).optional(),
  name: z.string(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  description: z.string().describe(
    "Optional. Human-readable description of the example.",
  ).optional(),
  displayName: z.string().describe("Required. Display name of the example.")
    .optional(),
  entryAgent: z.string().describe(
    "Optional. The agent that initially handles the conversation. If not specified, the example represents a conversation that is handled by the root agent. Format: `projects/{project}/locations/{location}/apps/{app}/agents/{agent}`",
  ).optional(),
  messages: z.array(z.object({
    chunks: z.array(z.object({
      agentTransfer: z.object({
        displayName: z.unknown().describe(
          "Output only. Display name of the agent.",
        ).optional(),
        targetAgent: z.unknown().describe(
          "Required. The agent to which the conversation is being transferred. The agent will handle the conversation from this point forward. Format: `projects/{project}/locations/{location}/apps/{app}/agents/{agent}`",
        ).optional(),
      }).describe("Optional. Agent transfer event.").optional(),
      blob: z.object({
        data: z.unknown().describe("Required. Raw bytes of the blob.")
          .optional(),
        mimeType: z.unknown().describe(
          "Required. The IANA standard MIME type of the source data.",
        ).optional(),
      }).describe("Optional. Blob data.").optional(),
      defaultVariables: z.record(z.string(), z.unknown()).describe(
        "A struct represents default variables at the start of the conversation, keyed by variable names.",
      ).optional(),
      image: z.object({
        altText: z.unknown().describe(
          "Optional. The alternative text for the image.",
        ).optional(),
        data: z.unknown().describe("Required. Raw bytes of the image.")
          .optional(),
        mimeType: z.unknown().describe(
          "Required. The IANA standard MIME type of the source data. Supported image types includes: * image/png * image/jpeg * image/webp",
        ).optional(),
      }).describe("Optional. Image data.").optional(),
      payload: z.record(z.string(), z.unknown()).describe(
        "Optional. Custom payload data.",
      ).optional(),
      text: z.string().describe("Optional. Text data.").optional(),
      toolCall: z.object({
        agentName: z.unknown().describe(
          'Output only. Human-readable name of the agent that issued this call, e.g. "Contract Architect". Empty when the root agent issued it.',
        ).optional(),
        args: z.unknown().describe(
          "Optional. The input parameters and values for the tool in JSON object format.",
        ).optional(),
        displayName: z.unknown().describe(
          "Output only. Display name of the tool.",
        ).optional(),
        id: z.unknown().describe(
          "Optional. The unique identifier of the tool call. If populated, the client should return the execution result with the matching ID in ToolResponse.",
        ).optional(),
        parentToolCallId: z.unknown().describe(
          "Output only. The id of the tool call that caused this one, when it was issued by a sub-agent working on behalf of a parent call. Empty for top-level calls. Lets a client group a sub-agent's work under the call that started it instead of rendering every step as a sibling.",
        ).optional(),
        tool: z.unknown().describe(
          "Optional. The name of the tool to execute. Format: `projects/{project}/locations/{location}/apps/{app}/tools/{tool}`",
        ).optional(),
        toolsetTool: z.unknown().describe(
          "Optional. The toolset tool to execute.",
        ).optional(),
      }).describe("Optional. Tool execution request.").optional(),
      toolResponse: z.object({
        agentName: z.unknown().describe(
          'Output only. Human-readable name of the agent that issued this call, e.g. "Contract Architect". Empty when the root agent issued it.',
        ).optional(),
        displayName: z.unknown().describe(
          "Output only. Display name of the tool.",
        ).optional(),
        id: z.unknown().describe(
          "Optional. The matching ID of the tool call the response is for.",
        ).optional(),
        parentToolCallId: z.unknown().describe(
          "Output only. The id of the tool call that caused this one, when it was issued by a sub-agent working on behalf of a parent call. Empty for top-level calls. Lets a client group a sub-agent's work under the call that started it instead of rendering every step as a sibling.",
        ).optional(),
        response: z.unknown().describe(
          'Required. The tool execution result in JSON object format. Use "output" key to specify tool response and "error" key to specify error details (if any). If "output" and "error" keys are not specified, then whole "response" is treated as tool execution result.',
        ).optional(),
        tool: z.unknown().describe(
          "Optional. The name of the tool to execute. Format: `projects/{project}/locations/{location}/apps/{app}/tools/{tool}`",
        ).optional(),
        toolsetTool: z.unknown().describe(
          "Optional. The toolset tool that got executed.",
        ).optional(),
      }).describe("Optional. Tool execution response.").optional(),
      transcript: z.string().describe(
        "Optional. Transcript associated with the audio.",
      ).optional(),
      updatedVariables: z.record(z.string(), z.unknown()).describe(
        "A struct represents variables that were updated in the conversation, keyed by variable names.",
      ).optional(),
    })).describe("Optional. Content of the message as a series of chunks.")
      .optional(),
    eventTime: z.string().describe(
      "Optional. Timestamp when the message was sent or received. Should not be used if the message is part of an example.",
    ).optional(),
    role: z.string().describe(
      "Optional. The role within the conversation, e.g., user, agent.",
    ).optional(),
  })).describe(
    "Optional. The collection of messages that make up the conversation.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The unique identifier of the example. Format: `projects/{project}/locations/{location}/apps/{app}/examples/{example}`",
  ).optional(),
  exampleId: z.string().describe(
    "Optional. The ID to use for the example, which will become the final component of the example's resource name. If not provided, a unique ID will be automatically assigned for the example.",
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

/** Swamp extension model for Google Cloud Gemini Enterprise for Customer Experience Apps.Examples. Registered at `@swamp/gcp/ces/apps-examples`. */
export const model = {
  type: "@swamp/gcp/ces/apps-examples",
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
    {
      toVersion: "2026.05.19.2",
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
      toVersion: "2026.08.28.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "An example represents a sample conversation between the user and the agent(s).",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a examples",
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
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["entryAgent"] !== undefined) body["entryAgent"] = g["entryAgent"];
        if (g["messages"] !== undefined) body["messages"] = g["messages"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["exampleId"] !== undefined) {
          params["exampleId"] = String(g["exampleId"]);
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
      description: "Get a examples",
      arguments: z.object({
        identifier: z.string().describe("The name of the examples"),
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
      description: "Update examples attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific examples by name (e.g. one discovered by list)",
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
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["entryAgent"] !== undefined) body["entryAgent"] = g["entryAgent"];
        if (g["messages"] !== undefined) body["messages"] = g["messages"];
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
      description: "Delete the examples",
      arguments: z.object({
        identifier: z.string().describe("The name of the examples"),
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
      description: "Sync examples state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific examples by name (e.g. one discovered by list)",
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
      description: "List examples resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. Filter to be applied when listing the examples. See https://google.aip.dev/160 for more details.",
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
          "examples",
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
