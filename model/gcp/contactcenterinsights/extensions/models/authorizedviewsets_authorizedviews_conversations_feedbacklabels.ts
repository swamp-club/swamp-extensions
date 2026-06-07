// Auto-generated extension model for @swamp/gcp/contactcenterinsights/authorizedviewsets-authorizedviews-conversations-feedbacklabels
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Contact Center AI Insights AuthorizedViewSets.AuthorizedViews.Conversations.FeedbackLabels.
 *
 * Represents a conversation, resource, and label provided by the user. Can take the form of a string label or a QaAnswer label. QaAnswer labels are used for Quality AI example conversations. String labels are used for Topic Modeling. AgentAssistSummary labels are used for Agent Assist Summarization.
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
  return `${parent}/feedbackLabels/${shortName}`;
}

const BASE_URL = "https://contactcenterinsights.googleapis.com/";

const GET_CONFIG = {
  "id":
    "contactcenterinsights.projects.locations.authorizedViewSets.authorizedViews.conversations.feedbackLabels.get",
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
    "contactcenterinsights.projects.locations.authorizedViewSets.authorizedViews.conversations.feedbackLabels.create",
  "path": "v1/{+parent}/feedbackLabels",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "feedbackLabelId": {
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
    "contactcenterinsights.projects.locations.authorizedViewSets.authorizedViews.conversations.feedbackLabels.patch",
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
    "contactcenterinsights.projects.locations.authorizedViewSets.authorizedViews.conversations.feedbackLabels.delete",
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
    "contactcenterinsights.projects.locations.authorizedViewSets.authorizedViews.conversations.feedbackLabels.list",
  "path": "v1/{+parent}/feedbackLabels",
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
  label: z.string().describe("String label used for Topic Modeling.")
    .optional(),
  labeledResource: z.string().describe(
    "Name of the resource to be labeled. Supported resources are: * `projects/{project}/locations/{location}/qaScorecards/{scorecard}/revisions/{revision}/qaQuestions/{question}` * `projects/{project}/locations/{location}/issueModels/{issue_model}` * `projects/{project}/locations/{location}/generators/{generator_id}`",
  ).optional(),
  name: z.string().describe(
    "Immutable. Resource name of the FeedbackLabel. Format: projects/{project}/locations/{location}/conversations/{conversation}/feedbackLabels/{feedback_label}",
  ).optional(),
  qaAnswerLabel: z.object({
    boolValue: z.boolean().describe("Boolean value.").optional(),
    key: z.string().describe(
      "A short string used as an identifier. Matches the value used in QaQuestion.AnswerChoice.key.",
    ).optional(),
    naValue: z.boolean().describe(
      'A value of "Not Applicable (N/A)". Should only ever be `true`.',
    ).optional(),
    normalizedScore: z.number().describe(
      "Output only. Normalized score of the questions. Calculated as score / potential_score.",
    ).optional(),
    numValue: z.number().describe("Numerical value.").optional(),
    potentialScore: z.number().describe(
      "Output only. The maximum potential score of the question.",
    ).optional(),
    score: z.number().describe("Output only. Numerical score of the answer.")
      .optional(),
    skipValue: z.boolean().describe(
      'Output only. A value of "Skip". If provided, this field may only be set to `true`. If a question receives this answer, it will be excluded from any score calculations. This would mean that the question was not evaluated.',
    ).optional(),
    strValue: z.string().describe("String value.").optional(),
  }).describe(
    "Message for holding the value of a QaAnswer. QaQuestion.AnswerChoice defines the possible answer values for a question.",
  ).optional(),
  feedbackLabelId: z.string().describe(
    "Optional. The ID of the feedback label to create. If one is not specified it will be generated by the server.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  label: z.string().optional(),
  labeledResource: z.string().optional(),
  name: z.string(),
  qaAnswerLabel: z.object({
    boolValue: z.boolean(),
    key: z.string(),
    naValue: z.boolean(),
    normalizedScore: z.number(),
    numValue: z.number(),
    potentialScore: z.number(),
    score: z.number(),
    skipValue: z.boolean(),
    strValue: z.string(),
  }).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  label: z.string().describe("String label used for Topic Modeling.")
    .optional(),
  labeledResource: z.string().describe(
    "Name of the resource to be labeled. Supported resources are: * `projects/{project}/locations/{location}/qaScorecards/{scorecard}/revisions/{revision}/qaQuestions/{question}` * `projects/{project}/locations/{location}/issueModels/{issue_model}` * `projects/{project}/locations/{location}/generators/{generator_id}`",
  ).optional(),
  name: z.string().describe(
    "Immutable. Resource name of the FeedbackLabel. Format: projects/{project}/locations/{location}/conversations/{conversation}/feedbackLabels/{feedback_label}",
  ).optional(),
  qaAnswerLabel: z.object({
    boolValue: z.boolean().describe("Boolean value.").optional(),
    key: z.string().describe(
      "A short string used as an identifier. Matches the value used in QaQuestion.AnswerChoice.key.",
    ).optional(),
    naValue: z.boolean().describe(
      'A value of "Not Applicable (N/A)". Should only ever be `true`.',
    ).optional(),
    normalizedScore: z.number().describe(
      "Output only. Normalized score of the questions. Calculated as score / potential_score.",
    ).optional(),
    numValue: z.number().describe("Numerical value.").optional(),
    potentialScore: z.number().describe(
      "Output only. The maximum potential score of the question.",
    ).optional(),
    score: z.number().describe("Output only. Numerical score of the answer.")
      .optional(),
    skipValue: z.boolean().describe(
      'Output only. A value of "Skip". If provided, this field may only be set to `true`. If a question receives this answer, it will be excluded from any score calculations. This would mean that the question was not evaluated.',
    ).optional(),
    strValue: z.string().describe("String value.").optional(),
  }).describe(
    "Message for holding the value of a QaAnswer. QaQuestion.AnswerChoice defines the possible answer values for a question.",
  ).optional(),
  feedbackLabelId: z.string().describe(
    "Optional. The ID of the feedback label to create. If one is not specified it will be generated by the server.",
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

/** Swamp extension model for Google Cloud Contact Center AI Insights AuthorizedViewSets.AuthorizedViews.Conversations.FeedbackLabels. Registered at `@swamp/gcp/contactcenterinsights/authorizedviewsets-authorizedviews-conversations-feedbacklabels`. */
export const model = {
  type:
    "@swamp/gcp/contactcenterinsights/authorizedviewsets-authorizedviews-conversations-feedbacklabels",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents a conversation, resource, and label provided by the user. Can take...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a feedbackLabels",
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
        if (g["label"] !== undefined) body["label"] = g["label"];
        if (g["labeledResource"] !== undefined) {
          body["labeledResource"] = g["labeledResource"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["qaAnswerLabel"] !== undefined) {
          body["qaAnswerLabel"] = g["qaAnswerLabel"];
        }
        if (g["feedbackLabelId"] !== undefined) {
          body["feedbackLabelId"] = g["feedbackLabelId"];
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
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
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
      description: "Get a feedbackLabels",
      arguments: z.object({
        identifier: z.string().describe("The name of the feedbackLabels"),
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
      description: "Update feedbackLabels attributes",
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
        if (g["label"] !== undefined) body["label"] = g["label"];
        if (g["labeledResource"] !== undefined) {
          body["labeledResource"] = g["labeledResource"];
        }
        if (g["qaAnswerLabel"] !== undefined) {
          body["qaAnswerLabel"] = g["qaAnswerLabel"];
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
      description: "Delete the feedbackLabels",
      arguments: z.object({
        identifier: z.string().describe("The name of the feedbackLabels"),
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
      description: "Sync feedbackLabels state from GCP",
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
      description: "List feedbackLabels resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. A filter to reduce results to a specific subset. Supports disjunctions (OR) and conjunctions (AND). Automatically sorts by conversation ID. To sort by all feedback labels in a project see ListAllFeedbackLabels. Supported fields: * `issue_model_id` * `qa_question_id` * `qa_scorecard_id` * `min_create_time` * `max_create_time` * `min_update_time` * `max_update_time` * `feedback_label_type`: QUALITY_AI, TOPIC_MODELING",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The maximum number of feedback labels to return in the response. A valid page size ranges from 0 to 100,000 inclusive. If the page size is zero or unspecified, a default page size of 100 will be chosen. Note that a call might return fewer results than the requested page size.",
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
          "feedbackLabels",
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
