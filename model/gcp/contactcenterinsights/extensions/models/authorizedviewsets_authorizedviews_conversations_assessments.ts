// Auto-generated extension model for @swamp/gcp/contactcenterinsights/authorizedviewsets-authorizedviews-conversations-assessments
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Contact Center AI Insights AuthorizedViewSets.AuthorizedViews.Conversations.Assessments.
 *
 * The assessment resource.
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
  return `${parent}/assessments/${shortName}`;
}

const BASE_URL = "https://contactcenterinsights.googleapis.com/";

const GET_CONFIG = {
  "id":
    "contactcenterinsights.projects.locations.authorizedViewSets.authorizedViews.conversations.assessments.get",
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
    "contactcenterinsights.projects.locations.authorizedViewSets.authorizedViews.conversations.assessments.create",
  "path": "v1/{+parent}/assessments",
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
    "contactcenterinsights.projects.locations.authorizedViewSets.authorizedViews.conversations.assessments.delete",
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

const GlobalArgsSchema = z.object({
  agentInfo: z.object({
    agentId: z.string().describe(
      "A user-specified string representing the agent.",
    ).optional(),
    agentType: z.enum([
      "ROLE_UNSPECIFIED",
      "HUMAN_AGENT",
      "AUTOMATED_AGENT",
      "END_USER",
      "ANY_AGENT",
    ]).describe("The agent type, e.g. HUMAN_AGENT.").optional(),
    deploymentDisplayName: z.string().describe(
      "The agent's deployment display name. Only applicable to automated agents.",
    ).optional(),
    deploymentId: z.string().describe(
      "The agent's deployment ID. Only applicable to automated agents.",
    ).optional(),
    displayName: z.string().describe("The agent's name.").optional(),
    dispositionCode: z.string().describe(
      "A user-provided string indicating the outcome of the agent's segment of the call.",
    ).optional(),
    entrySubagentDisplayName: z.string().describe(
      "The entry subagent's display name.",
    ).optional(),
    location: z.string().describe("The agent's location.").optional(),
    team: z.string().describe(
      "A user-specified string representing the agent's team. Deprecated in favor of the `teams` field.",
    ).optional(),
    teams: z.array(z.string()).describe(
      "User-specified strings representing the agent's teams.",
    ).optional(),
    versionDisplayName: z.string().describe(
      "The agent's version display name. Only applicable to automated agents.",
    ).optional(),
    versionId: z.string().describe(
      "The agent's version ID. Only applicable to automated agents.",
    ).optional(),
  }).describe("Information about an agent involved in the conversation.")
    .optional(),
  name: z.string().describe(
    "Identifier. The resource name of the assessment. Format: projects/{project}/locations/{location}/conversations/{conversation}/assessments/{assessment}",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  agentInfo: z.object({
    agentId: z.string(),
    agentType: z.string(),
    deploymentDisplayName: z.string(),
    deploymentId: z.string(),
    displayName: z.string(),
    dispositionCode: z.string(),
    entrySubagentDisplayName: z.string(),
    location: z.string(),
    team: z.string(),
    teams: z.array(z.string()),
    versionDisplayName: z.string(),
    versionId: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  name: z.string(),
  state: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  agentInfo: z.object({
    agentId: z.string().describe(
      "A user-specified string representing the agent.",
    ).optional(),
    agentType: z.enum([
      "ROLE_UNSPECIFIED",
      "HUMAN_AGENT",
      "AUTOMATED_AGENT",
      "END_USER",
      "ANY_AGENT",
    ]).describe("The agent type, e.g. HUMAN_AGENT.").optional(),
    deploymentDisplayName: z.string().describe(
      "The agent's deployment display name. Only applicable to automated agents.",
    ).optional(),
    deploymentId: z.string().describe(
      "The agent's deployment ID. Only applicable to automated agents.",
    ).optional(),
    displayName: z.string().describe("The agent's name.").optional(),
    dispositionCode: z.string().describe(
      "A user-provided string indicating the outcome of the agent's segment of the call.",
    ).optional(),
    entrySubagentDisplayName: z.string().describe(
      "The entry subagent's display name.",
    ).optional(),
    location: z.string().describe("The agent's location.").optional(),
    team: z.string().describe(
      "A user-specified string representing the agent's team. Deprecated in favor of the `teams` field.",
    ).optional(),
    teams: z.array(z.string()).describe(
      "User-specified strings representing the agent's teams.",
    ).optional(),
    versionDisplayName: z.string().describe(
      "The agent's version display name. Only applicable to automated agents.",
    ).optional(),
    versionId: z.string().describe(
      "The agent's version ID. Only applicable to automated agents.",
    ).optional(),
  }).describe("Information about an agent involved in the conversation.")
    .optional(),
  name: z.string().describe(
    "Identifier. The resource name of the assessment. Format: projects/{project}/locations/{location}/conversations/{conversation}/assessments/{assessment}",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Contact Center AI Insights AuthorizedViewSets.AuthorizedViews.Conversations.Assessments. Registered at `@swamp/gcp/contactcenterinsights/authorizedviewsets-authorizedviews-conversations-assessments`. */
export const model = {
  type:
    "@swamp/gcp/contactcenterinsights/authorizedviewsets-authorizedviews-conversations-assessments",
  version: "2026.05.19.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "The assessment resource.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a assessments",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["agentInfo"] !== undefined) body["agentInfo"] = g["agentInfo"];
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
      description: "Get a assessments",
      arguments: z.object({
        identifier: z.string().describe("The name of the assessments"),
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
      description: "Delete the assessments",
      arguments: z.object({
        identifier: z.string().describe("The name of the assessments"),
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
      description: "Sync assessments state from GCP",
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
    appeal: {
      description: "appeal",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
              "contactcenterinsights.projects.locations.authorizedViewSets.authorizedViews.conversations.assessments.appeal",
            "path": "v1/{+name}:appeal",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
    finalize: {
      description: "finalize",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
              "contactcenterinsights.projects.locations.authorizedViewSets.authorizedViews.conversations.assessments.finalize",
            "path": "v1/{+name}:finalize",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
    publish: {
      description: "publish",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
              "contactcenterinsights.projects.locations.authorizedViewSets.authorizedViews.conversations.assessments.publish",
            "path": "v1/{+name}:publish",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
  },
};
