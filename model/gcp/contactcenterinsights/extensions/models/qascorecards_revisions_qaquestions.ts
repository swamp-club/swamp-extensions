// Auto-generated extension model for @swamp/gcp/contactcenterinsights/qascorecards-revisions-qaquestions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Contact Center AI Insights QaScorecards.Revisions.QaQuestions.
 *
 * A single question to be scored by the Insights QA feature.
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
  return `${parent}/qaQuestions/${shortName}`;
}

const BASE_URL = "https://contactcenterinsights.googleapis.com/";

const GET_CONFIG = {
  "id":
    "contactcenterinsights.projects.locations.qaScorecards.revisions.qaQuestions.get",
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
    "contactcenterinsights.projects.locations.qaScorecards.revisions.qaQuestions.create",
  "path": "v1/{+parent}/qaQuestions",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "qaQuestionId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id":
    "contactcenterinsights.projects.locations.qaScorecards.revisions.qaQuestions.patch",
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
    "contactcenterinsights.projects.locations.qaScorecards.revisions.qaQuestions.delete",
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
    "contactcenterinsights.projects.locations.qaScorecards.revisions.qaQuestions.list",
  "path": "v1/{+parent}/qaQuestions",
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
  abbreviation: z.string().describe(
    'Short, descriptive string, used in the UI where it\'s not practical to display the full question body. E.g., "Greeting".',
  ).optional(),
  answerChoices: z.array(z.object({
    boolValue: z.boolean().describe("Boolean value.").optional(),
    key: z.string().describe("A short string used as an identifier.")
      .optional(),
    naValue: z.boolean().describe(
      'A value of "Not Applicable (N/A)". If provided, this field may only be set to `true`. If a question receives this answer, it will be excluded from any score calculations.',
    ).optional(),
    numValue: z.number().describe("Numerical value.").optional(),
    score: z.number().describe(
      "Numerical score of the answer, used for generating the overall score of a QaScorecardResult. If the answer uses na_value, this field is unused.",
    ).optional(),
    strValue: z.string().describe("String value.").optional(),
  })).describe(
    "A list of valid answers to the question, which the LLM must choose from.",
  ).optional(),
  answerInstructions: z.string().describe(
    "Instructions describing how to determine the answer.",
  ).optional(),
  metrics: z.object({
    accuracy: z.number().describe(
      "Output only. Accuracy of the model. Measures the percentage of correct answers the model gave on the test set.",
    ).optional(),
  }).describe(
    "A wrapper representing metrics calculated against a test-set on a LLM that was fine tuned for this question.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the question. Format: projects/{project}/locations/{location}/qaScorecards/{qa_scorecard}/revisions/{revision}/qaQuestions/{qa_question}",
  ).optional(),
  order: z.number().int().describe(
    "Defines the order of the question within its parent scorecard revision.",
  ).optional(),
  predefinedQuestionConfig: z.object({
    type: z.enum([
      "PREDEFINED_QUESTION_TYPE_UNSPECIFIED",
      "CONVERSATION_OUTCOME",
      "CONVERSATION_OUTCOME_ESCALATION_INITIATOR_ROLE",
    ]).describe("The type of the predefined question.").optional(),
  }).describe(
    "Configuration for a predefined question. This field will only be set if the Question Type is predefined.",
  ).optional(),
  qaQuestionDataOptions: z.object({
    conversationDataOptions: z.object({
      includeDialogflowInteractionData: z.boolean().describe(
        "Whether to include the per turn Dialogflow interaction data in conversation transcript.",
      ).optional(),
    }).describe(
      "Options for configuring what metadata is included in the conversation data used in QAI and Discovery Engine.",
    ).optional(),
  }).describe(
    "Options for configuring the data used to generate the QA question.",
  ).optional(),
  questionBody: z.string().describe(
    'Question text. E.g., "Did the agent greet the customer?"',
  ).optional(),
  questionType: z.enum([
    "QA_QUESTION_TYPE_UNSPECIFIED",
    "CUSTOMIZABLE",
    "PREDEFINED",
  ]).describe("The type of question.").optional(),
  tags: z.array(z.string()).describe(
    'Questions are tagged for categorization and scoring. Tags can either be: - Default Tags: These are predefined categories. They are identified by their string value (e.g., "BUSINESS", "COMPLIANCE", and "CUSTOMER"). - Custom Tags: These are user-defined categories. They are identified by their full resource name (e.g., projects/{project}/locations/{location}/qaQuestionTags/{qa_question_tag}). Both default and custom tags are used to group questions and to influence the scoring of each question.',
  ).optional(),
  tuningMetadata: z.object({
    datasetValidationWarnings: z.array(
      z.enum([
        "DATASET_VALIDATION_WARNING_UNSPECIFIED",
        "TOO_MANY_INVALID_FEEDBACK_LABELS",
        "INSUFFICIENT_FEEDBACK_LABELS",
        "INSUFFICIENT_FEEDBACK_LABELS_PER_ANSWER",
        "ALL_FEEDBACK_LABELS_HAVE_THE_SAME_ANSWER",
      ]),
    ).describe(
      "A list of any applicable data validation warnings about the question's feedback labels.",
    ).optional(),
    totalValidLabelCount: z.string().describe(
      "Total number of valid labels provided for the question at the time of tuining.",
    ).optional(),
    tuningError: z.string().describe(
      "Error status of the tuning operation for the question. Will only be set if the tuning operation failed.",
    ).optional(),
  }).describe(
    "Metadata about the tuning operation for the question. Will only be set if a scorecard containing this question has been tuned.",
  ).optional(),
  qaQuestionId: z.string().describe(
    "Optional. A unique ID for the new question. This ID will become the final component of the question's resource name. If no ID is specified, a server-generated ID will be used. This value should be 4-64 characters and must match the regular expression `^[a-z0-9-]{4,64}$`. Valid characters are `a-z-`.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  abbreviation: z.string().optional(),
  answerChoices: z.array(z.object({
    boolValue: z.boolean(),
    key: z.string(),
    naValue: z.boolean(),
    numValue: z.number(),
    score: z.number(),
    strValue: z.string(),
  })).optional(),
  answerInstructions: z.string().optional(),
  createTime: z.string().optional(),
  metrics: z.object({
    accuracy: z.number(),
  }).optional(),
  name: z.string(),
  order: z.number().optional(),
  predefinedQuestionConfig: z.object({
    type: z.string(),
  }).optional(),
  qaQuestionDataOptions: z.object({
    conversationDataOptions: z.object({
      includeDialogflowInteractionData: z.boolean(),
    }),
  }).optional(),
  questionBody: z.string().optional(),
  questionType: z.string().optional(),
  tags: z.array(z.string()).optional(),
  tuningMetadata: z.object({
    datasetValidationWarnings: z.array(z.string()),
    totalValidLabelCount: z.string(),
    tuningError: z.string(),
  }).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  abbreviation: z.string().describe(
    'Short, descriptive string, used in the UI where it\'s not practical to display the full question body. E.g., "Greeting".',
  ).optional(),
  answerChoices: z.array(z.object({
    boolValue: z.boolean().describe("Boolean value.").optional(),
    key: z.string().describe("A short string used as an identifier.")
      .optional(),
    naValue: z.boolean().describe(
      'A value of "Not Applicable (N/A)". If provided, this field may only be set to `true`. If a question receives this answer, it will be excluded from any score calculations.',
    ).optional(),
    numValue: z.number().describe("Numerical value.").optional(),
    score: z.number().describe(
      "Numerical score of the answer, used for generating the overall score of a QaScorecardResult. If the answer uses na_value, this field is unused.",
    ).optional(),
    strValue: z.string().describe("String value.").optional(),
  })).describe(
    "A list of valid answers to the question, which the LLM must choose from.",
  ).optional(),
  answerInstructions: z.string().describe(
    "Instructions describing how to determine the answer.",
  ).optional(),
  metrics: z.object({
    accuracy: z.number().describe(
      "Output only. Accuracy of the model. Measures the percentage of correct answers the model gave on the test set.",
    ).optional(),
  }).describe(
    "A wrapper representing metrics calculated against a test-set on a LLM that was fine tuned for this question.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the question. Format: projects/{project}/locations/{location}/qaScorecards/{qa_scorecard}/revisions/{revision}/qaQuestions/{qa_question}",
  ).optional(),
  order: z.number().int().describe(
    "Defines the order of the question within its parent scorecard revision.",
  ).optional(),
  predefinedQuestionConfig: z.object({
    type: z.enum([
      "PREDEFINED_QUESTION_TYPE_UNSPECIFIED",
      "CONVERSATION_OUTCOME",
      "CONVERSATION_OUTCOME_ESCALATION_INITIATOR_ROLE",
    ]).describe("The type of the predefined question.").optional(),
  }).describe(
    "Configuration for a predefined question. This field will only be set if the Question Type is predefined.",
  ).optional(),
  qaQuestionDataOptions: z.object({
    conversationDataOptions: z.object({
      includeDialogflowInteractionData: z.boolean().describe(
        "Whether to include the per turn Dialogflow interaction data in conversation transcript.",
      ).optional(),
    }).describe(
      "Options for configuring what metadata is included in the conversation data used in QAI and Discovery Engine.",
    ).optional(),
  }).describe(
    "Options for configuring the data used to generate the QA question.",
  ).optional(),
  questionBody: z.string().describe(
    'Question text. E.g., "Did the agent greet the customer?"',
  ).optional(),
  questionType: z.enum([
    "QA_QUESTION_TYPE_UNSPECIFIED",
    "CUSTOMIZABLE",
    "PREDEFINED",
  ]).describe("The type of question.").optional(),
  tags: z.array(z.string()).describe(
    'Questions are tagged for categorization and scoring. Tags can either be: - Default Tags: These are predefined categories. They are identified by their string value (e.g., "BUSINESS", "COMPLIANCE", and "CUSTOMER"). - Custom Tags: These are user-defined categories. They are identified by their full resource name (e.g., projects/{project}/locations/{location}/qaQuestionTags/{qa_question_tag}). Both default and custom tags are used to group questions and to influence the scoring of each question.',
  ).optional(),
  tuningMetadata: z.object({
    datasetValidationWarnings: z.array(
      z.enum([
        "DATASET_VALIDATION_WARNING_UNSPECIFIED",
        "TOO_MANY_INVALID_FEEDBACK_LABELS",
        "INSUFFICIENT_FEEDBACK_LABELS",
        "INSUFFICIENT_FEEDBACK_LABELS_PER_ANSWER",
        "ALL_FEEDBACK_LABELS_HAVE_THE_SAME_ANSWER",
      ]),
    ).describe(
      "A list of any applicable data validation warnings about the question's feedback labels.",
    ).optional(),
    totalValidLabelCount: z.string().describe(
      "Total number of valid labels provided for the question at the time of tuining.",
    ).optional(),
    tuningError: z.string().describe(
      "Error status of the tuning operation for the question. Will only be set if the tuning operation failed.",
    ).optional(),
  }).describe(
    "Metadata about the tuning operation for the question. Will only be set if a scorecard containing this question has been tuned.",
  ).optional(),
  qaQuestionId: z.string().describe(
    "Optional. A unique ID for the new question. This ID will become the final component of the question's resource name. If no ID is specified, a server-generated ID will be used. This value should be 4-64 characters and must match the regular expression `^[a-z0-9-]{4,64}$`. Valid characters are `a-z-`.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Contact Center AI Insights QaScorecards.Revisions.QaQuestions. Registered at `@swamp/gcp/contactcenterinsights/qascorecards-revisions-qaquestions`. */
export const model = {
  type: "@swamp/gcp/contactcenterinsights/qascorecards-revisions-qaquestions",
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
      description: "A single question to be scored by the Insights QA feature.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a qaQuestions",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["abbreviation"] !== undefined) {
          body["abbreviation"] = g["abbreviation"];
        }
        if (g["answerChoices"] !== undefined) {
          body["answerChoices"] = g["answerChoices"];
        }
        if (g["answerInstructions"] !== undefined) {
          body["answerInstructions"] = g["answerInstructions"];
        }
        if (g["metrics"] !== undefined) body["metrics"] = g["metrics"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["order"] !== undefined) body["order"] = g["order"];
        if (g["predefinedQuestionConfig"] !== undefined) {
          body["predefinedQuestionConfig"] = g["predefinedQuestionConfig"];
        }
        if (g["qaQuestionDataOptions"] !== undefined) {
          body["qaQuestionDataOptions"] = g["qaQuestionDataOptions"];
        }
        if (g["questionBody"] !== undefined) {
          body["questionBody"] = g["questionBody"];
        }
        if (g["questionType"] !== undefined) {
          body["questionType"] = g["questionType"];
        }
        if (g["tags"] !== undefined) body["tags"] = g["tags"];
        if (g["tuningMetadata"] !== undefined) {
          body["tuningMetadata"] = g["tuningMetadata"];
        }
        if (g["qaQuestionId"] !== undefined) {
          body["qaQuestionId"] = g["qaQuestionId"];
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
      description: "Get a qaQuestions",
      arguments: z.object({
        identifier: z.string().describe("The name of the qaQuestions"),
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
      description: "Update qaQuestions attributes",
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
        if (g["abbreviation"] !== undefined) {
          body["abbreviation"] = g["abbreviation"];
        }
        if (g["answerChoices"] !== undefined) {
          body["answerChoices"] = g["answerChoices"];
        }
        if (g["answerInstructions"] !== undefined) {
          body["answerInstructions"] = g["answerInstructions"];
        }
        if (g["metrics"] !== undefined) body["metrics"] = g["metrics"];
        if (g["order"] !== undefined) body["order"] = g["order"];
        if (g["predefinedQuestionConfig"] !== undefined) {
          body["predefinedQuestionConfig"] = g["predefinedQuestionConfig"];
        }
        if (g["qaQuestionDataOptions"] !== undefined) {
          body["qaQuestionDataOptions"] = g["qaQuestionDataOptions"];
        }
        if (g["questionBody"] !== undefined) {
          body["questionBody"] = g["questionBody"];
        }
        if (g["questionType"] !== undefined) {
          body["questionType"] = g["questionType"];
        }
        if (g["tags"] !== undefined) body["tags"] = g["tags"];
        if (g["tuningMetadata"] !== undefined) {
          body["tuningMetadata"] = g["tuningMetadata"];
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
      description: "Delete the qaQuestions",
      arguments: z.object({
        identifier: z.string().describe("The name of the qaQuestions"),
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
      description: "Sync qaQuestions state from GCP",
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
      description: "List qaQuestions resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "Optional. The maximum number of questions to return in the response. If the value is zero, the service will select a default size. A call might return fewer objects than requested. A non-empty `next_page_token` in the response indicates that more data is available.",
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
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "qaQuestions",
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
