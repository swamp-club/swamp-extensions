// Auto-generated extension model for @swamp/gcp/contactcenterinsights/phrasematchers
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Contact Center AI Insights PhraseMatchers.
 *
 * The phrase matcher resource.
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
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/phraseMatchers/${shortName}`;
}

const BASE_URL = "https://contactcenterinsights.googleapis.com/";

const GET_CONFIG = {
  "id": "contactcenterinsights.projects.locations.phraseMatchers.get",
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
  "id": "contactcenterinsights.projects.locations.phraseMatchers.create",
  "path": "v1/{+parent}/phraseMatchers",
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
  "id": "contactcenterinsights.projects.locations.phraseMatchers.patch",
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
  "id": "contactcenterinsights.projects.locations.phraseMatchers.delete",
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
  "id": "contactcenterinsights.projects.locations.phraseMatchers.list",
  "path": "v1/{+parent}/phraseMatchers",
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
  active: z.boolean().describe(
    "Applies the phrase matcher only when it is active.",
  ).optional(),
  displayName: z.string().describe(
    "The human-readable name of the phrase matcher.",
  ).optional(),
  name: z.string().describe(
    "The resource name of the phrase matcher. Format: projects/{project}/locations/{location}/phraseMatchers/{phrase_matcher}",
  ).optional(),
  phraseMatchRuleGroups: z.array(z.object({
    phraseMatchRules: z.array(z.object({
      config: z.object({
        exactMatchConfig: z.unknown().describe("Exact match configuration.")
          .optional(),
        regexMatchConfig: z.unknown().describe("Regex match configuration.")
          .optional(),
      }).describe("Configuration information of a phrase match rule.")
        .optional(),
      negated: z.boolean().describe(
        "Specifies whether the phrase must be missing from the transcript segment or present in the transcript segment.",
      ).optional(),
      query: z.string().describe("Required. The phrase to be matched.")
        .optional(),
    })).describe(
      "A list of phrase match rules that are included in this group.",
    ).optional(),
    type: z.enum([
      "PHRASE_MATCH_RULE_GROUP_TYPE_UNSPECIFIED",
      "ALL_OF",
      "ANY_OF",
    ]).describe("Required. The type of this phrase match rule group.")
      .optional(),
  })).describe(
    "A list of phase match rule groups that are included in this matcher.",
  ).optional(),
  roleMatch: z.enum([
    "ROLE_UNSPECIFIED",
    "HUMAN_AGENT",
    "AUTOMATED_AGENT",
    "END_USER",
    "ANY_AGENT",
  ]).describe(
    "The role whose utterances the phrase matcher should be matched against. If the role is ROLE_UNSPECIFIED it will be matched against any utterances in the transcript.",
  ).optional(),
  type: z.enum(["PHRASE_MATCHER_TYPE_UNSPECIFIED", "ALL_OF", "ANY_OF"])
    .describe("Required. The type of this phrase matcher.").optional(),
  versionTag: z.string().describe(
    "The customized version tag to use for the phrase matcher. If not specified, it will default to `revision_id`.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  activationUpdateTime: z.string().optional(),
  active: z.boolean().optional(),
  displayName: z.string().optional(),
  name: z.string(),
  phraseMatchRuleGroups: z.array(z.object({
    phraseMatchRules: z.array(z.object({
      config: z.object({
        exactMatchConfig: z.unknown(),
        regexMatchConfig: z.unknown(),
      }),
      negated: z.boolean(),
      query: z.string(),
    })),
    type: z.string(),
  })).optional(),
  revisionCreateTime: z.string().optional(),
  revisionId: z.string().optional(),
  roleMatch: z.string().optional(),
  type: z.string().optional(),
  updateTime: z.string().optional(),
  versionTag: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  active: z.boolean().describe(
    "Applies the phrase matcher only when it is active.",
  ).optional(),
  displayName: z.string().describe(
    "The human-readable name of the phrase matcher.",
  ).optional(),
  name: z.string().describe(
    "The resource name of the phrase matcher. Format: projects/{project}/locations/{location}/phraseMatchers/{phrase_matcher}",
  ).optional(),
  phraseMatchRuleGroups: z.array(z.object({
    phraseMatchRules: z.array(z.object({
      config: z.object({
        exactMatchConfig: z.unknown().describe("Exact match configuration.")
          .optional(),
        regexMatchConfig: z.unknown().describe("Regex match configuration.")
          .optional(),
      }).describe("Configuration information of a phrase match rule.")
        .optional(),
      negated: z.boolean().describe(
        "Specifies whether the phrase must be missing from the transcript segment or present in the transcript segment.",
      ).optional(),
      query: z.string().describe("Required. The phrase to be matched.")
        .optional(),
    })).describe(
      "A list of phrase match rules that are included in this group.",
    ).optional(),
    type: z.enum([
      "PHRASE_MATCH_RULE_GROUP_TYPE_UNSPECIFIED",
      "ALL_OF",
      "ANY_OF",
    ]).describe("Required. The type of this phrase match rule group.")
      .optional(),
  })).describe(
    "A list of phase match rule groups that are included in this matcher.",
  ).optional(),
  roleMatch: z.enum([
    "ROLE_UNSPECIFIED",
    "HUMAN_AGENT",
    "AUTOMATED_AGENT",
    "END_USER",
    "ANY_AGENT",
  ]).describe(
    "The role whose utterances the phrase matcher should be matched against. If the role is ROLE_UNSPECIFIED it will be matched against any utterances in the transcript.",
  ).optional(),
  type: z.enum(["PHRASE_MATCHER_TYPE_UNSPECIFIED", "ALL_OF", "ANY_OF"])
    .describe("Required. The type of this phrase matcher.").optional(),
  versionTag: z.string().describe(
    "The customized version tag to use for the phrase matcher. If not specified, it will default to `revision_id`.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Contact Center AI Insights PhraseMatchers. Registered at `@swamp/gcp/contactcenterinsights/phrasematchers`. */
export const model = {
  type: "@swamp/gcp/contactcenterinsights/phrasematchers",
  version: "2026.05.25.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "The phrase matcher resource.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a phraseMatchers",
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
        if (g["phraseMatchRuleGroups"] !== undefined) {
          body["phraseMatchRuleGroups"] = g["phraseMatchRuleGroups"];
        }
        if (g["roleMatch"] !== undefined) body["roleMatch"] = g["roleMatch"];
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["versionTag"] !== undefined) body["versionTag"] = g["versionTag"];
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
      description: "Get a phraseMatchers",
      arguments: z.object({
        identifier: z.string().describe("The name of the phraseMatchers"),
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
      description: "Update phraseMatchers attributes",
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
        if (g["phraseMatchRuleGroups"] !== undefined) {
          body["phraseMatchRuleGroups"] = g["phraseMatchRuleGroups"];
        }
        if (g["roleMatch"] !== undefined) body["roleMatch"] = g["roleMatch"];
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["versionTag"] !== undefined) body["versionTag"] = g["versionTag"];
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
      description: "Delete the phraseMatchers",
      arguments: z.object({
        identifier: z.string().describe("The name of the phraseMatchers"),
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
      description: "Sync phraseMatchers state from GCP",
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
    list: {
      description: "List phraseMatchers resources",
      arguments: z.object({
        filter: z.string().describe(
          "A filter to reduce results to a specific subset. Useful for querying phrase matchers with specific properties.",
        ).optional(),
        pageSize: z.number().describe(
          "The maximum number of phrase matchers to return in the response. If this value is zero, the service will select a default size. A call might return fewer objects than requested. A non-empty `next_page_token` in the response indicates that more data is available.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
          "phraseMatchers",
          (args.maxPages as number | undefined) ?? 10,
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
