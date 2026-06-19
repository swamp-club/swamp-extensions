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

// Auto-generated extension model for @swamp/gcp/aiplatform/reasoningengines-sandboxenvironments
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Agent Platform ReasoningEngines.SandboxEnvironments.
 *
 * SandboxEnvironment is a containerized environment that provides a customizable secure execution runtime for AI agents.
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
  return `${parent}/sandboxEnvironments/${shortName}`;
}

const BASE_URL = "https://aiplatform.googleapis.com/";

const GET_CONFIG = {
  "id":
    "aiplatform.projects.locations.reasoningEngines.sandboxEnvironments.get",
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
    "aiplatform.projects.locations.reasoningEngines.sandboxEnvironments.create",
  "path": "v1/{+parent}/sandboxEnvironments",
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
  "id":
    "aiplatform.projects.locations.reasoningEngines.sandboxEnvironments.delete",
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
    "aiplatform.projects.locations.reasoningEngines.sandboxEnvironments.list",
  "path": "v1/{+parent}/sandboxEnvironments",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
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
  connectionInfo: z.object({
    loadBalancerHostname: z.string().describe(
      "Output only. The hostname of the load balancer.",
    ).optional(),
    loadBalancerIp: z.string().describe(
      "Output only. The IP address of the load balancer.",
    ).optional(),
    routingToken: z.string().describe(
      "Output only. The routing token for the SandboxEnvironment.",
    ).optional(),
    sandboxInternalIp: z.string().describe(
      "Output only. The internal IP address of the SandboxEnvironment.",
    ).optional(),
  }).describe("The connection information of the SandboxEnvironment.")
    .optional(),
  displayName: z.string().describe(
    "Required. The display name of the SandboxEnvironment.",
  ).optional(),
  expireTime: z.string().describe(
    "Optional. Timestamp in UTC of when this SandboxEnvironment is considered expired. This is *always* provided on output, regardless of what `expiration` was sent on input.",
  ).optional(),
  name: z.string().describe("Identifier. The name of the SandboxEnvironment.")
    .optional(),
  owner: z.string().describe(
    "Optional. Owner information for this sandbox environment. A Sandbox can only be restored from a snapshot that belongs to the same owner. If not set, sandbox will be created as the default owner.",
  ).optional(),
  sandboxEnvironmentSnapshot: z.string().describe(
    "Optional. The resource name of the SandboxEnvironmentSnapshot to use for creating this SandboxEnvironment. Format: `projects/{project}/locations/{location}/reasoningEngines/{reasoning_engine}/sandboxEnvironmentSnapshots/{sandbox_environment_snapshot}`",
  ).optional(),
  sandboxEnvironmentTemplate: z.string().describe(
    "Optional. The name of the SandboxEnvironmentTemplate specified in the parent Agent Engine resource that this SandboxEnvironment is created from.",
  ).optional(),
  spec: z.object({
    codeExecutionEnvironment: z.object({
      codeLanguage: z.enum([
        "LANGUAGE_UNSPECIFIED",
        "LANGUAGE_PYTHON",
        "LANGUAGE_JAVASCRIPT",
      ]).describe("The coding language supported in this environment.")
        .optional(),
      machineConfig: z.enum([
        "MACHINE_CONFIG_UNSPECIFIED",
        "MACHINE_CONFIG_VCPU4_RAM4GIB",
      ]).describe("The machine config of the code execution environment.")
        .optional(),
    }).describe("The code execution environment with customized settings.")
      .optional(),
  }).describe("The specification of a SandboxEnvironment.").optional(),
  ttl: z.string().describe(
    "Optional. Input only. The TTL for the sandbox environment. The expiration time is computed: now + TTL.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  connectionInfo: z.object({
    loadBalancerHostname: z.string(),
    loadBalancerIp: z.string(),
    routingToken: z.string(),
    sandboxInternalIp: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  expireTime: z.string().optional(),
  latestSandboxEnvironmentSnapshot: z.string().optional(),
  name: z.string(),
  owner: z.string().optional(),
  sandboxEnvironmentSnapshot: z.string().optional(),
  sandboxEnvironmentTemplate: z.string().optional(),
  spec: z.object({
    codeExecutionEnvironment: z.object({
      codeLanguage: z.string(),
      machineConfig: z.string(),
    }),
  }).optional(),
  state: z.string().optional(),
  ttl: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  connectionInfo: z.object({
    loadBalancerHostname: z.string().describe(
      "Output only. The hostname of the load balancer.",
    ).optional(),
    loadBalancerIp: z.string().describe(
      "Output only. The IP address of the load balancer.",
    ).optional(),
    routingToken: z.string().describe(
      "Output only. The routing token for the SandboxEnvironment.",
    ).optional(),
    sandboxInternalIp: z.string().describe(
      "Output only. The internal IP address of the SandboxEnvironment.",
    ).optional(),
  }).describe("The connection information of the SandboxEnvironment.")
    .optional(),
  displayName: z.string().describe(
    "Required. The display name of the SandboxEnvironment.",
  ).optional(),
  expireTime: z.string().describe(
    "Optional. Timestamp in UTC of when this SandboxEnvironment is considered expired. This is *always* provided on output, regardless of what `expiration` was sent on input.",
  ).optional(),
  name: z.string().describe("Identifier. The name of the SandboxEnvironment.")
    .optional(),
  owner: z.string().describe(
    "Optional. Owner information for this sandbox environment. A Sandbox can only be restored from a snapshot that belongs to the same owner. If not set, sandbox will be created as the default owner.",
  ).optional(),
  sandboxEnvironmentSnapshot: z.string().describe(
    "Optional. The resource name of the SandboxEnvironmentSnapshot to use for creating this SandboxEnvironment. Format: `projects/{project}/locations/{location}/reasoningEngines/{reasoning_engine}/sandboxEnvironmentSnapshots/{sandbox_environment_snapshot}`",
  ).optional(),
  sandboxEnvironmentTemplate: z.string().describe(
    "Optional. The name of the SandboxEnvironmentTemplate specified in the parent Agent Engine resource that this SandboxEnvironment is created from.",
  ).optional(),
  spec: z.object({
    codeExecutionEnvironment: z.object({
      codeLanguage: z.enum([
        "LANGUAGE_UNSPECIFIED",
        "LANGUAGE_PYTHON",
        "LANGUAGE_JAVASCRIPT",
      ]).describe("The coding language supported in this environment.")
        .optional(),
      machineConfig: z.enum([
        "MACHINE_CONFIG_UNSPECIFIED",
        "MACHINE_CONFIG_VCPU4_RAM4GIB",
      ]).describe("The machine config of the code execution environment.")
        .optional(),
    }).describe("The code execution environment with customized settings.")
      .optional(),
  }).describe("The specification of a SandboxEnvironment.").optional(),
  ttl: z.string().describe(
    "Optional. Input only. The TTL for the sandbox environment. The expiration time is computed: now + TTL.",
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

/** Swamp extension model for Google Cloud Agent Platform ReasoningEngines.SandboxEnvironments. Registered at `@swamp/gcp/aiplatform/reasoningengines-sandboxenvironments`. */
export const model = {
  type: "@swamp/gcp/aiplatform/reasoningengines-sandboxenvironments",
  version: "2026.06.18.1",
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
      toVersion: "2026.04.11.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.15.1",
      description:
        "Added: owner, sandboxEnvironmentSnapshot, sandboxEnvironmentTemplate",
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
      toVersion: "2026.05.09.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.14.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
      description:
        "Removed: owner, sandboxEnvironmentSnapshot, sandboxEnvironmentTemplate",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          owner: _owner,
          sandboxEnvironmentSnapshot: _sandboxEnvironmentSnapshot,
          sandboxEnvironmentTemplate: _sandboxEnvironmentTemplate,
          ...rest
        } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.18.2",
      description:
        "Added: owner, sandboxEnvironmentSnapshot, sandboxEnvironmentTemplate",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.2",
      description:
        "Removed: owner, sandboxEnvironmentSnapshot, sandboxEnvironmentTemplate",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          owner: _owner,
          sandboxEnvironmentSnapshot: _sandboxEnvironmentSnapshot,
          sandboxEnvironmentTemplate: _sandboxEnvironmentTemplate,
          ...rest
        } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.20.1",
      description:
        "Added: owner, sandboxEnvironmentSnapshot, sandboxEnvironmentTemplate",
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
      description:
        "Removed: owner, sandboxEnvironmentSnapshot, sandboxEnvironmentTemplate",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          owner: _owner,
          sandboxEnvironmentSnapshot: _sandboxEnvironmentSnapshot,
          sandboxEnvironmentTemplate: _sandboxEnvironmentTemplate,
          ...rest
        } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.26.1",
      description:
        "Added: owner, sandboxEnvironmentSnapshot, sandboxEnvironmentTemplate",
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
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "SandboxEnvironment is a containerized environment that provides a customizabl...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a sandboxEnvironments",
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
        if (g["connectionInfo"] !== undefined) {
          body["connectionInfo"] = g["connectionInfo"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["expireTime"] !== undefined) body["expireTime"] = g["expireTime"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["owner"] !== undefined) body["owner"] = g["owner"];
        if (g["sandboxEnvironmentSnapshot"] !== undefined) {
          body["sandboxEnvironmentSnapshot"] = g["sandboxEnvironmentSnapshot"];
        }
        if (g["sandboxEnvironmentTemplate"] !== undefined) {
          body["sandboxEnvironmentTemplate"] = g["sandboxEnvironmentTemplate"];
        }
        if (g["spec"] !== undefined) body["spec"] = g["spec"];
        if (g["ttl"] !== undefined) body["ttl"] = g["ttl"];
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
      description: "Get a sandboxEnvironments",
      arguments: z.object({
        identifier: z.string().describe("The name of the sandboxEnvironments"),
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
      description: "Delete the sandboxEnvironments",
      arguments: z.object({
        identifier: z.string().describe("The name of the sandboxEnvironments"),
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
      description: "Sync sandboxEnvironments state from GCP",
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
      description: "List sandboxEnvironments resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. The standard list filter. More detail in [AIP-160](https://google.aip.dev/160).",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The maximum number of SandboxEnvironments to return. The service may return fewer than this value. If unspecified, at most 100 SandboxEnvironments will be returned.",
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
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "sandboxEnvironments",
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
    execute: {
      description: "execute",
      arguments: z.object({
        inputs: z.any().optional(),
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
        if (args["inputs"] !== undefined) body["inputs"] = args["inputs"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "aiplatform.projects.locations.reasoningEngines.sandboxEnvironments.execute",
            "path": "v1/{+name}:execute",
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
    pause: {
      description: "pause",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
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
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "aiplatform.projects.locations.reasoningEngines.sandboxEnvironments.pause",
            "path": "v1/{+name}:pause",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
    resume: {
      description: "resume",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
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
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "aiplatform.projects.locations.reasoningEngines.sandboxEnvironments.resume",
            "path": "v1/{+name}:resume",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
    snapshot: {
      description: "snapshot",
      arguments: z.object({
        createTime: z.any().optional(),
        displayName: z.any().optional(),
        expireTime: z.any().optional(),
        name: z.any().optional(),
        owner: z.any().optional(),
        parentSnapshot: z.any().optional(),
        postSnapshotAction: z.any().optional(),
        sizeBytes: z.any().optional(),
        sourceSandboxEnvironment: z.any().optional(),
        ttl: z.any().optional(),
        updateTime: z.any().optional(),
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
        if (args["createTime"] !== undefined) {
          body["createTime"] = args["createTime"];
        }
        if (args["displayName"] !== undefined) {
          body["displayName"] = args["displayName"];
        }
        if (args["expireTime"] !== undefined) {
          body["expireTime"] = args["expireTime"];
        }
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["owner"] !== undefined) body["owner"] = args["owner"];
        if (args["parentSnapshot"] !== undefined) {
          body["parentSnapshot"] = args["parentSnapshot"];
        }
        if (args["postSnapshotAction"] !== undefined) {
          body["postSnapshotAction"] = args["postSnapshotAction"];
        }
        if (args["sizeBytes"] !== undefined) {
          body["sizeBytes"] = args["sizeBytes"];
        }
        if (args["sourceSandboxEnvironment"] !== undefined) {
          body["sourceSandboxEnvironment"] = args["sourceSandboxEnvironment"];
        }
        if (args["ttl"] !== undefined) body["ttl"] = args["ttl"];
        if (args["updateTime"] !== undefined) {
          body["updateTime"] = args["updateTime"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "aiplatform.projects.locations.reasoningEngines.sandboxEnvironments.snapshot",
            "path": "v1/{+name}:snapshot",
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
