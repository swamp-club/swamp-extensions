// Auto-generated extension model for @swamp/gcp/aiplatform/reasoningengines-sandboxenvironments
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Vertex AI ReasoningEngines.SandboxEnvironments.
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
  getProjectId,
  isResourceNotFoundError,
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

const GlobalArgsSchema = z.object({
  connectionInfo: z.object({
    loadBalancerHostname: z.string().describe(
      "Output only. The hostname of the load balancer.",
    ).optional(),
    loadBalancerIp: z.string().describe(
      "Output only. The IP address of the load balancer.",
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
    sandboxInternalIp: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  expireTime: z.string().optional(),
  name: z.string(),
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
  connectionInfo: z.object({
    loadBalancerHostname: z.string().describe(
      "Output only. The hostname of the load balancer.",
    ).optional(),
    loadBalancerIp: z.string().describe(
      "Output only. The IP address of the load balancer.",
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

/** Swamp extension model for Google Cloud Vertex AI ReasoningEngines.SandboxEnvironments. Registered at `@swamp/gcp/aiplatform/reasoningengines-sandboxenvironments`. */
export const model = {
  type: "@swamp/gcp/aiplatform/reasoningengines-sandboxenvironments",
  version: "2026.05.19.2",
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
        const projectId = await getProjectId();
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
    delete: {
      description: "Delete the sandboxEnvironments",
      arguments: z.object({
        identifier: z.string().describe("The name of the sandboxEnvironments"),
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
      description: "Sync sandboxEnvironments state from GCP",
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
    execute: {
      description: "execute",
      arguments: z.object({
        inputs: z.any().optional(),
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
        );
        return { result };
      },
    },
  },
};
