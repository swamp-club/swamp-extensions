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

// Auto-generated extension model for @swamp/gcp/contactcenterinsights/analysisrules
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Contact Center AI Insights AnalysisRules.
 *
 * The CCAI Insights project wide analysis rule. This rule will be applied to all conversations that match the filter defined in the rule. For a conversation matches the filter, the annotators specified in the rule will be run. If a conversation matches multiple rules, a union of all the annotators will be run. One project can have multiple analysis rules.
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
  return `${parent}/analysisRules/${shortName}`;
}

const BASE_URL = "https://contactcenterinsights.googleapis.com/";

const GET_CONFIG = {
  "id": "contactcenterinsights.projects.locations.analysisRules.get",
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
  "id": "contactcenterinsights.projects.locations.analysisRules.create",
  "path": "v1/{+parent}/analysisRules",
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
  "id": "contactcenterinsights.projects.locations.analysisRules.patch",
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
  "id": "contactcenterinsights.projects.locations.analysisRules.delete",
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
  "id": "contactcenterinsights.projects.locations.analysisRules.list",
  "path": "v1/{+parent}/analysisRules",
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
  active: z.boolean().describe(
    "If true, apply this rule to conversations. Otherwise, this rule is inactive and saved as a draft.",
  ).optional(),
  analysisPercentage: z.number().describe(
    "Percentage of conversations that we should apply this analysis setting automatically, between [0, 1]. For example, 0.1 means 10%. Conversations are sampled in a determenestic way. The original runtime_percentage & upload percentage will be replaced by defining filters on the conversation.",
  ).optional(),
  annotatorSelector: z.object({
    issueModels: z.array(z.string()).describe(
      "The issue model to run. If not provided, the most recently deployed topic model will be used. The provided issue model will only be used for inference if the issue model is deployed and if run_issue_model_annotator is set to true. If more than one issue model is provided, only the first provided issue model will be used for inference.",
    ).optional(),
    phraseMatchers: z.array(z.string()).describe(
      "The list of phrase matchers to run. If not provided, all active phrase matchers will be used. If inactive phrase matchers are provided, they will not be used. Phrase matchers will be run only if run_phrase_matcher_annotator is set to true. Format: projects/{project}/locations/{location}/phraseMatchers/{phrase_matcher}",
    ).optional(),
    qaConfig: z.object({
      scorecardList: z.object({
        qaScorecardRevisions: z.array(z.string()).describe(
          "List of QaScorecardRevisions.",
        ).optional(),
      }).describe("Container for a list of scorecards.").optional(),
    }).describe("Configuration for the QA feature.").optional(),
    runAutoLabelingAnnotator: z.boolean().describe(
      "Optional. Whether to run the auto-labeling annotator. If true, the auto-labeling annotator will be run. This is a non-billable operation designed for fixing or backfilling custom labels.",
    ).optional(),
    runEntityAnnotator: z.boolean().describe(
      "Whether to run the entity annotator.",
    ).optional(),
    runIntentAnnotator: z.boolean().describe(
      "Whether to run the intent annotator.",
    ).optional(),
    runInterruptionAnnotator: z.boolean().describe(
      "Whether to run the interruption annotator.",
    ).optional(),
    runIssueModelAnnotator: z.boolean().describe(
      "Whether to run the issue model annotator. A model should have already been deployed for this to take effect.",
    ).optional(),
    runPhraseMatcherAnnotator: z.boolean().describe(
      "Whether to run the active phrase matcher annotator(s).",
    ).optional(),
    runQaAnnotator: z.boolean().describe("Whether to run the QA annotator.")
      .optional(),
    runSentimentAnnotator: z.boolean().describe(
      "Whether to run the sentiment annotator.",
    ).optional(),
    runSilenceAnnotator: z.boolean().describe(
      "Whether to run the silence annotator.",
    ).optional(),
    runSummarizationAnnotator: z.boolean().describe(
      "Whether to run the summarization annotator.",
    ).optional(),
    summarizationConfig: z.object({
      conversationProfile: z.string().describe(
        "Resource name of the Dialogflow conversation profile. Format: projects/{project}/locations/{location}/conversationProfiles/{conversation_profile}",
      ).optional(),
      generator: z.string().describe(
        "The resource name of the existing created generator. Format: projects//locations//generators/",
      ).optional(),
      summarizationModel: z.enum([
        "SUMMARIZATION_MODEL_UNSPECIFIED",
        "BASELINE_MODEL",
        "BASELINE_MODEL_V2_0",
      ]).describe("Default summarization model to be used.").optional(),
    }).describe("Configuration for summarization.").optional(),
  }).describe(
    "Selector of all available annotators and phrase matchers to run.",
  ).optional(),
  conversationFilter: z.string().describe(
    "Filter for the conversations that should apply this analysis rule. An empty filter means this analysis rule applies to all conversations. Refer to https://cloud.google.com/contact-center/insights/docs/filtering for details.",
  ).optional(),
  displayName: z.string().describe("Display Name of the analysis rule.")
    .optional(),
  name: z.string().describe(
    "Identifier. The resource name of the analysis rule. Format: projects/{project}/locations/{location}/analysisRules/{analysis_rule}",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  active: z.boolean().optional(),
  analysisPercentage: z.number().optional(),
  annotatorSelector: z.object({
    issueModels: z.array(z.string()),
    phraseMatchers: z.array(z.string()),
    qaConfig: z.object({
      scorecardList: z.object({
        qaScorecardRevisions: z.array(z.string()),
      }),
    }),
    runAutoLabelingAnnotator: z.boolean(),
    runEntityAnnotator: z.boolean(),
    runIntentAnnotator: z.boolean(),
    runInterruptionAnnotator: z.boolean(),
    runIssueModelAnnotator: z.boolean(),
    runPhraseMatcherAnnotator: z.boolean(),
    runQaAnnotator: z.boolean(),
    runSentimentAnnotator: z.boolean(),
    runSilenceAnnotator: z.boolean(),
    runSummarizationAnnotator: z.boolean(),
    summarizationConfig: z.object({
      conversationProfile: z.string(),
      generator: z.string(),
      summarizationModel: z.string(),
    }),
  }).optional(),
  conversationFilter: z.string().optional(),
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  name: z.string(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  active: z.boolean().describe(
    "If true, apply this rule to conversations. Otherwise, this rule is inactive and saved as a draft.",
  ).optional(),
  analysisPercentage: z.number().describe(
    "Percentage of conversations that we should apply this analysis setting automatically, between [0, 1]. For example, 0.1 means 10%. Conversations are sampled in a determenestic way. The original runtime_percentage & upload percentage will be replaced by defining filters on the conversation.",
  ).optional(),
  annotatorSelector: z.object({
    issueModels: z.array(z.string()).describe(
      "The issue model to run. If not provided, the most recently deployed topic model will be used. The provided issue model will only be used for inference if the issue model is deployed and if run_issue_model_annotator is set to true. If more than one issue model is provided, only the first provided issue model will be used for inference.",
    ).optional(),
    phraseMatchers: z.array(z.string()).describe(
      "The list of phrase matchers to run. If not provided, all active phrase matchers will be used. If inactive phrase matchers are provided, they will not be used. Phrase matchers will be run only if run_phrase_matcher_annotator is set to true. Format: projects/{project}/locations/{location}/phraseMatchers/{phrase_matcher}",
    ).optional(),
    qaConfig: z.object({
      scorecardList: z.object({
        qaScorecardRevisions: z.array(z.string()).describe(
          "List of QaScorecardRevisions.",
        ).optional(),
      }).describe("Container for a list of scorecards.").optional(),
    }).describe("Configuration for the QA feature.").optional(),
    runAutoLabelingAnnotator: z.boolean().describe(
      "Optional. Whether to run the auto-labeling annotator. If true, the auto-labeling annotator will be run. This is a non-billable operation designed for fixing or backfilling custom labels.",
    ).optional(),
    runEntityAnnotator: z.boolean().describe(
      "Whether to run the entity annotator.",
    ).optional(),
    runIntentAnnotator: z.boolean().describe(
      "Whether to run the intent annotator.",
    ).optional(),
    runInterruptionAnnotator: z.boolean().describe(
      "Whether to run the interruption annotator.",
    ).optional(),
    runIssueModelAnnotator: z.boolean().describe(
      "Whether to run the issue model annotator. A model should have already been deployed for this to take effect.",
    ).optional(),
    runPhraseMatcherAnnotator: z.boolean().describe(
      "Whether to run the active phrase matcher annotator(s).",
    ).optional(),
    runQaAnnotator: z.boolean().describe("Whether to run the QA annotator.")
      .optional(),
    runSentimentAnnotator: z.boolean().describe(
      "Whether to run the sentiment annotator.",
    ).optional(),
    runSilenceAnnotator: z.boolean().describe(
      "Whether to run the silence annotator.",
    ).optional(),
    runSummarizationAnnotator: z.boolean().describe(
      "Whether to run the summarization annotator.",
    ).optional(),
    summarizationConfig: z.object({
      conversationProfile: z.string().describe(
        "Resource name of the Dialogflow conversation profile. Format: projects/{project}/locations/{location}/conversationProfiles/{conversation_profile}",
      ).optional(),
      generator: z.string().describe(
        "The resource name of the existing created generator. Format: projects//locations//generators/",
      ).optional(),
      summarizationModel: z.enum([
        "SUMMARIZATION_MODEL_UNSPECIFIED",
        "BASELINE_MODEL",
        "BASELINE_MODEL_V2_0",
      ]).describe("Default summarization model to be used.").optional(),
    }).describe("Configuration for summarization.").optional(),
  }).describe(
    "Selector of all available annotators and phrase matchers to run.",
  ).optional(),
  conversationFilter: z.string().describe(
    "Filter for the conversations that should apply this analysis rule. An empty filter means this analysis rule applies to all conversations. Refer to https://cloud.google.com/contact-center/insights/docs/filtering for details.",
  ).optional(),
  displayName: z.string().describe("Display Name of the analysis rule.")
    .optional(),
  name: z.string().describe(
    "Identifier. The resource name of the analysis rule. Format: projects/{project}/locations/{location}/analysisRules/{analysis_rule}",
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

/** Swamp extension model for Google Cloud Contact Center AI Insights AnalysisRules. Registered at `@swamp/gcp/contactcenterinsights/analysisrules`. */
export const model = {
  type: "@swamp/gcp/contactcenterinsights/analysisrules",
  version: "2026.06.08.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "The CCAI Insights project wide analysis rule. This rule will be applied to al...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a analysisRules",
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
        if (g["active"] !== undefined) body["active"] = g["active"];
        if (g["analysisPercentage"] !== undefined) {
          body["analysisPercentage"] = g["analysisPercentage"];
        }
        if (g["annotatorSelector"] !== undefined) {
          body["annotatorSelector"] = g["annotatorSelector"];
        }
        if (g["conversationFilter"] !== undefined) {
          body["conversationFilter"] = g["conversationFilter"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
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
      description: "Get a analysisRules",
      arguments: z.object({
        identifier: z.string().describe("The name of the analysisRules"),
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
      description: "Update analysisRules attributes",
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
        if (g["active"] !== undefined) body["active"] = g["active"];
        if (g["analysisPercentage"] !== undefined) {
          body["analysisPercentage"] = g["analysisPercentage"];
        }
        if (g["annotatorSelector"] !== undefined) {
          body["annotatorSelector"] = g["annotatorSelector"];
        }
        if (g["conversationFilter"] !== undefined) {
          body["conversationFilter"] = g["conversationFilter"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
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
      description: "Delete the analysisRules",
      arguments: z.object({
        identifier: z.string().describe("The name of the analysisRules"),
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
      description: "Sync analysisRules state from GCP",
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
      description: "List analysisRules resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "Optional. The maximum number of analysis rule to return in the response. If this value is zero, the service will select a default size. A call may return fewer objects than requested. A non-empty `next_page_token` in the response indicates that more data is available.",
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
          "analysisRules",
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
