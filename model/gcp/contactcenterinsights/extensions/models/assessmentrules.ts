// Auto-generated extension model for @swamp/gcp/contactcenterinsights/assessmentrules
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Contact Center AI Insights AssessmentRules.
 *
 * The CCAI Insights project wide assessment rule. This assessment rule will be applied to all conversations from the previous sampling cycle that match the sample rule defined in the assessment rule. One project can have multiple assessment rules.
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
  return `${parent}/assessmentRules/${shortName}`;
}

const BASE_URL = "https://contactcenterinsights.googleapis.com/";

const GET_CONFIG = {
  "id": "contactcenterinsights.projects.locations.assessmentRules.get",
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
  "id": "contactcenterinsights.projects.locations.assessmentRules.create",
  "path": "v1/{+parent}/assessmentRules",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "assessmentRuleId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "contactcenterinsights.projects.locations.assessmentRules.patch",
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
  "id": "contactcenterinsights.projects.locations.assessmentRules.delete",
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
  "id": "contactcenterinsights.projects.locations.assessmentRules.list",
  "path": "v1/{+parent}/assessmentRules",
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
  active: z.boolean().describe(
    "If true, apply this rule to conversations. Otherwise, this rule is inactive.",
  ).optional(),
  displayName: z.string().describe("Display Name of the assessment rule.")
    .optional(),
  name: z.string().describe(
    "Identifier. The resource name of the assessment rule. Format: projects/{project}/locations/{location}/assessmentRules/{assessment_rule}",
  ).optional(),
  sampleRule: z.object({
    conversationFilter: z.string().describe(
      "To specify the filter for the conversions that should apply this sample rule. An empty filter means this sample rule applies to all conversations.",
    ).optional(),
    dimension: z.string().describe(
      "Optional. Group by dimension to sample the conversation. If no dimension is provided, the sampling will be applied to the project level. Current supported dimensions is 'quality_metadata.agent_info.agent_id'.",
    ).optional(),
    samplePercentage: z.number().describe(
      "Percentage of conversations that we should sample based on the dimension between [0, 100].",
    ).optional(),
    sampleRow: z.string().describe(
      "Number of the conversations that we should sample based on the dimension.",
    ).optional(),
  }).describe("Message for sampling conversations.").optional(),
  scheduleInfo: z.object({
    endTime: z.string().describe(
      "End time of the schedule. If not specified, will keep scheduling new pipelines for execution util the schedule is no longer active or deleted.",
    ).optional(),
    schedule: z.string().describe(
      "The groc expression. Format: `every number [synchronized]` Time units can be: minutes, hours Synchronized is optional and indicates that the schedule should be synchronized to the start of the interval: every 5 minutes synchronized means 00:00, 00:05... Otherwise the start time is random within the interval. Example: `every 5 minutes` could be 00:02, 00:07, 00:12,...",
    ).optional(),
    startTime: z.string().describe(
      "Start time of the schedule. If not specified, will start as soon as the schedule is created.",
    ).optional(),
    timeZone: z.string().describe(
      "The timezone to use for the groc expression. If not specified, defaults to UTC.",
    ).optional(),
  }).describe("Message for schedule info.").optional(),
  assessmentRuleId: z.string().describe(
    "Optional. A unique ID for the new AssessmentRule. This ID will become the final component of the AssessmentRule's resource name. If no ID is specified, a server-generated ID will be used. This value should be 4-64 characters and must match the regular expression `^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$`.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  active: z.boolean().optional(),
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  name: z.string(),
  sampleRule: z.object({
    conversationFilter: z.string(),
    dimension: z.string(),
    samplePercentage: z.number(),
    sampleRow: z.string(),
  }).optional(),
  scheduleInfo: z.object({
    endTime: z.string(),
    schedule: z.string(),
    startTime: z.string(),
    timeZone: z.string(),
  }).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  active: z.boolean().describe(
    "If true, apply this rule to conversations. Otherwise, this rule is inactive.",
  ).optional(),
  displayName: z.string().describe("Display Name of the assessment rule.")
    .optional(),
  name: z.string().describe(
    "Identifier. The resource name of the assessment rule. Format: projects/{project}/locations/{location}/assessmentRules/{assessment_rule}",
  ).optional(),
  sampleRule: z.object({
    conversationFilter: z.string().describe(
      "To specify the filter for the conversions that should apply this sample rule. An empty filter means this sample rule applies to all conversations.",
    ).optional(),
    dimension: z.string().describe(
      "Optional. Group by dimension to sample the conversation. If no dimension is provided, the sampling will be applied to the project level. Current supported dimensions is 'quality_metadata.agent_info.agent_id'.",
    ).optional(),
    samplePercentage: z.number().describe(
      "Percentage of conversations that we should sample based on the dimension between [0, 100].",
    ).optional(),
    sampleRow: z.string().describe(
      "Number of the conversations that we should sample based on the dimension.",
    ).optional(),
  }).describe("Message for sampling conversations.").optional(),
  scheduleInfo: z.object({
    endTime: z.string().describe(
      "End time of the schedule. If not specified, will keep scheduling new pipelines for execution util the schedule is no longer active or deleted.",
    ).optional(),
    schedule: z.string().describe(
      "The groc expression. Format: `every number [synchronized]` Time units can be: minutes, hours Synchronized is optional and indicates that the schedule should be synchronized to the start of the interval: every 5 minutes synchronized means 00:00, 00:05... Otherwise the start time is random within the interval. Example: `every 5 minutes` could be 00:02, 00:07, 00:12,...",
    ).optional(),
    startTime: z.string().describe(
      "Start time of the schedule. If not specified, will start as soon as the schedule is created.",
    ).optional(),
    timeZone: z.string().describe(
      "The timezone to use for the groc expression. If not specified, defaults to UTC.",
    ).optional(),
  }).describe("Message for schedule info.").optional(),
  assessmentRuleId: z.string().describe(
    "Optional. A unique ID for the new AssessmentRule. This ID will become the final component of the AssessmentRule's resource name. If no ID is specified, a server-generated ID will be used. This value should be 4-64 characters and must match the regular expression `^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$`.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Contact Center AI Insights AssessmentRules. Registered at `@swamp/gcp/contactcenterinsights/assessmentrules`. */
export const model = {
  type: "@swamp/gcp/contactcenterinsights/assessmentrules",
  version: "2026.05.24.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "The CCAI Insights project wide assessment rule. This assessment rule will be ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a assessmentRules",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["active"] !== undefined) body["active"] = g["active"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["sampleRule"] !== undefined) body["sampleRule"] = g["sampleRule"];
        if (g["scheduleInfo"] !== undefined) {
          body["scheduleInfo"] = g["scheduleInfo"];
        }
        if (g["assessmentRuleId"] !== undefined) {
          body["assessmentRuleId"] = g["assessmentRuleId"];
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
      description: "Get a assessmentRules",
      arguments: z.object({
        identifier: z.string().describe("The name of the assessmentRules"),
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
      description: "Update assessmentRules attributes",
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
        if (g["active"] !== undefined) body["active"] = g["active"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["sampleRule"] !== undefined) body["sampleRule"] = g["sampleRule"];
        if (g["scheduleInfo"] !== undefined) {
          body["scheduleInfo"] = g["scheduleInfo"];
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
      description: "Delete the assessmentRules",
      arguments: z.object({
        identifier: z.string().describe("The name of the assessmentRules"),
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
      description: "Sync assessmentRules state from GCP",
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
