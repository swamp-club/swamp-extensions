// Auto-generated extension model for @swamp/gcp/analytics/management-experiments
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Analytics Management.Experiments.
 *
 * JSON template for Analytics experiment resource.
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

const BASE_URL = "https://www.googleapis.com/analytics/v3/";

const GET_CONFIG = {
  "id": "analytics.management.experiments.get",
  "path":
    "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/experiments/{experimentId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "accountId",
    "webPropertyId",
    "profileId",
    "experimentId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "experimentId": {
      "location": "path",
      "required": true,
    },
    "profileId": {
      "location": "path",
      "required": true,
    },
    "webPropertyId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "analytics.management.experiments.insert",
  "path":
    "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/experiments",
  "httpMethod": "POST",
  "parameterOrder": [
    "accountId",
    "webPropertyId",
    "profileId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "profileId": {
      "location": "path",
      "required": true,
    },
    "webPropertyId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "analytics.management.experiments.update",
  "path":
    "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/experiments/{experimentId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "accountId",
    "webPropertyId",
    "profileId",
    "experimentId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "experimentId": {
      "location": "path",
      "required": true,
    },
    "profileId": {
      "location": "path",
      "required": true,
    },
    "webPropertyId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "analytics.management.experiments.delete",
  "path":
    "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/experiments/{experimentId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "accountId",
    "webPropertyId",
    "profileId",
    "experimentId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "experimentId": {
      "location": "path",
      "required": true,
    },
    "profileId": {
      "location": "path",
      "required": true,
    },
    "webPropertyId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "analytics.management.experiments.list",
  "path":
    "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/experiments",
  "httpMethod": "GET",
  "parameterOrder": [
    "accountId",
    "webPropertyId",
    "profileId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "max-results": {
      "location": "query",
    },
    "profileId": {
      "location": "path",
      "required": true,
    },
    "start-index": {
      "location": "query",
    },
    "webPropertyId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  accountId: z.string().describe(
    "Account ID to which this experiment belongs. This field is read-only.",
  ).optional(),
  created: z.string().describe(
    "Time the experiment was created. This field is read-only.",
  ).optional(),
  description: z.string().describe("Notes about this experiment.").optional(),
  editableInGaUi: z.boolean().describe(
    "If true, the end user will be able to edit the experiment via the Google Analytics user interface.",
  ).optional(),
  endTime: z.string().describe(
    "The ending time of the experiment (the time the status changed from RUNNING to ENDED). This field is present only if the experiment has ended. This field is read-only.",
  ).optional(),
  equalWeighting: z.boolean().describe(
    "Boolean specifying whether to distribute traffic evenly across all variations. If the value is False, content experiments follows the default behavior of adjusting traffic dynamically based on variation performance. Optional -- defaults to False. This field may not be changed for an experiment whose status is ENDED.",
  ).optional(),
  id: z.string().describe(
    "Experiment ID. Required for patch and update. Disallowed for create.",
  ).optional(),
  internalWebPropertyId: z.string().describe(
    "Internal ID for the web property to which this experiment belongs. This field is read-only.",
  ).optional(),
  minimumExperimentLengthInDays: z.number().int().describe(
    "An integer number in [3, 90]. Specifies the minimum length of the experiment. Can be changed for a running experiment. This field may not be changed for an experiments whose status is ENDED.",
  ).optional(),
  name: z.string().describe(
    "Experiment name. This field may not be changed for an experiment whose status is ENDED. This field is required when creating an experiment.",
  ),
  objectiveMetric: z.string().describe(
    'The metric that the experiment is optimizing. Valid values: "ga:goal(n)Completions", "ga:adsenseAdsClicks", "ga:adsenseAdsViewed", "ga:adsenseRevenue", "ga:bounces", "ga:pageviews", "ga:sessionDuration", "ga:transactions", "ga:transactionRevenue". This field is required if status is "RUNNING" and servingFramework is one of "REDIRECT" or "API".',
  ).optional(),
  optimizationType: z.string().describe(
    'Whether the objectiveMetric should be minimized or maximized. Possible values: "MAXIMUM", "MINIMUM". Optional--defaults to "MAXIMUM". Cannot be specified without objectiveMetric. Cannot be modified when status is "RUNNING" or "ENDED".',
  ).optional(),
  parentLink: z.object({
    href: z.string().describe(
      "Link to the view (profile) to which this experiment belongs. This field is read-only.",
    ).optional(),
    type: z.string().describe(
      'Value is "analytics#profile". This field is read-only.',
    ).optional(),
  }).describe(
    "Parent link for an experiment. Points to the view (profile) to which this experiment belongs.",
  ).optional(),
  profileId: z.string().describe(
    "View (Profile) ID to which this experiment belongs. This field is read-only.",
  ).optional(),
  reasonExperimentEnded: z.string().describe(
    'Why the experiment ended. Possible values: "STOPPED_BY_USER", "WINNER_FOUND", "EXPERIMENT_EXPIRED", "ENDED_WITH_NO_WINNER", "GOAL_OBJECTIVE_CHANGED". "ENDED_WITH_NO_WINNER" means that the experiment didn\'t expire but no winner was projected to be found. If the experiment status is changed via the API to ENDED this field is set to STOPPED_BY_USER. This field is read-only.',
  ).optional(),
  rewriteVariationUrlsAsOriginal: z.boolean().describe(
    "Boolean specifying whether variations URLS are rewritten to match those of the original. This field may not be changed for an experiments whose status is ENDED.",
  ).optional(),
  servingFramework: z.string().describe(
    "The framework used to serve the experiment variations and evaluate the results. One of: - REDIRECT: Google Analytics redirects traffic to different variation pages, reports the chosen variation and evaluates the results. - API: Google Analytics chooses and reports the variation to serve and evaluates the results; the caller is responsible for serving the selected variation. - EXTERNAL: The variations will be served externally and the chosen variation reported to Google Analytics. The caller is responsible for serving the selected variation and evaluating the results.",
  ).optional(),
  snippet: z.string().describe(
    "The snippet of code to include on the control page(s). This field is read-only.",
  ).optional(),
  startTime: z.string().describe(
    "The starting time of the experiment (the time the status changed from READY_TO_RUN to RUNNING). This field is present only if the experiment has started. This field is read-only.",
  ).optional(),
  status: z.string().describe(
    'Experiment status. Possible values: "DRAFT", "READY_TO_RUN", "RUNNING", "ENDED". Experiments can be created in the "DRAFT", "READY_TO_RUN" or "RUNNING" state. This field is required when creating an experiment.',
  ),
  trafficCoverage: z.number().describe(
    "A floating-point number in (0, 1]. Specifies the fraction of the traffic that participates in the experiment. Can be changed for a running experiment. This field may not be changed for an experiments whose status is ENDED.",
  ).optional(),
  updated: z.string().describe(
    "Time the experiment was last modified. This field is read-only.",
  ).optional(),
  variations: z.array(z.object({
    name: z.string().describe(
      "The name of the variation. This field is required when creating an experiment. This field may not be changed for an experiment whose status is ENDED.",
    ).optional(),
    status: z.string().describe(
      'Status of the variation. Possible values: "ACTIVE", "INACTIVE". INACTIVE variations are not served. This field may not be changed for an experiment whose status is ENDED.',
    ).optional(),
    url: z.string().describe(
      "The URL of the variation. This field may not be changed for an experiment whose status is RUNNING or ENDED.",
    ).optional(),
    weight: z.number().describe(
      "Weight that this variation should receive. Only present if the experiment is running. This field is read-only.",
    ).optional(),
    won: z.boolean().describe(
      "True if the experiment has ended and this variation performed (statistically) significantly better than the original. This field is read-only.",
    ).optional(),
  })).describe(
    "Array of variations. The first variation in the array is the original. The number of variations may not change once an experiment is in the RUNNING state. At least two variations are required before status can be set to RUNNING.",
  ).optional(),
  webPropertyId: z.string().describe(
    "Web property ID to which this experiment belongs. The web property ID is of the form UA-XXXXX-YY. This field is read-only.",
  ).optional(),
  winnerConfidenceLevel: z.number().describe(
    "A floating-point number in (0, 1). Specifies the necessary confidence level to choose a winner. This field may not be changed for an experiments whose status is ENDED.",
  ).optional(),
  winnerFound: z.boolean().describe(
    "Boolean specifying whether a winner has been found for this experiment. This field is read-only.",
  ).optional(),
});

const StateSchema = z.object({
  accountId: z.string().optional(),
  created: z.string().optional(),
  description: z.string().optional(),
  editableInGaUi: z.boolean().optional(),
  endTime: z.string().optional(),
  equalWeighting: z.boolean().optional(),
  id: z.string().optional(),
  internalWebPropertyId: z.string().optional(),
  kind: z.string().optional(),
  minimumExperimentLengthInDays: z.number().optional(),
  name: z.string(),
  objectiveMetric: z.string().optional(),
  optimizationType: z.string().optional(),
  parentLink: z.object({
    href: z.string(),
    type: z.string(),
  }).optional(),
  profileId: z.string().optional(),
  reasonExperimentEnded: z.string().optional(),
  rewriteVariationUrlsAsOriginal: z.boolean().optional(),
  selfLink: z.string().optional(),
  servingFramework: z.string().optional(),
  snippet: z.string().optional(),
  startTime: z.string().optional(),
  status: z.string().optional(),
  trafficCoverage: z.number().optional(),
  updated: z.string().optional(),
  variations: z.array(z.object({
    name: z.string(),
    status: z.string(),
    url: z.string(),
    weight: z.number(),
    won: z.boolean(),
  })).optional(),
  webPropertyId: z.string().optional(),
  winnerConfidenceLevel: z.number().optional(),
  winnerFound: z.boolean().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accountId: z.string().describe(
    "Account ID to which this experiment belongs. This field is read-only.",
  ).optional(),
  created: z.string().describe(
    "Time the experiment was created. This field is read-only.",
  ).optional(),
  description: z.string().describe("Notes about this experiment.").optional(),
  editableInGaUi: z.boolean().describe(
    "If true, the end user will be able to edit the experiment via the Google Analytics user interface.",
  ).optional(),
  endTime: z.string().describe(
    "The ending time of the experiment (the time the status changed from RUNNING to ENDED). This field is present only if the experiment has ended. This field is read-only.",
  ).optional(),
  equalWeighting: z.boolean().describe(
    "Boolean specifying whether to distribute traffic evenly across all variations. If the value is False, content experiments follows the default behavior of adjusting traffic dynamically based on variation performance. Optional -- defaults to False. This field may not be changed for an experiment whose status is ENDED.",
  ).optional(),
  id: z.string().describe(
    "Experiment ID. Required for patch and update. Disallowed for create.",
  ).optional(),
  internalWebPropertyId: z.string().describe(
    "Internal ID for the web property to which this experiment belongs. This field is read-only.",
  ).optional(),
  minimumExperimentLengthInDays: z.number().int().describe(
    "An integer number in [3, 90]. Specifies the minimum length of the experiment. Can be changed for a running experiment. This field may not be changed for an experiments whose status is ENDED.",
  ).optional(),
  name: z.string().describe(
    "Experiment name. This field may not be changed for an experiment whose status is ENDED. This field is required when creating an experiment.",
  ).optional(),
  objectiveMetric: z.string().describe(
    'The metric that the experiment is optimizing. Valid values: "ga:goal(n)Completions", "ga:adsenseAdsClicks", "ga:adsenseAdsViewed", "ga:adsenseRevenue", "ga:bounces", "ga:pageviews", "ga:sessionDuration", "ga:transactions", "ga:transactionRevenue". This field is required if status is "RUNNING" and servingFramework is one of "REDIRECT" or "API".',
  ).optional(),
  optimizationType: z.string().describe(
    'Whether the objectiveMetric should be minimized or maximized. Possible values: "MAXIMUM", "MINIMUM". Optional--defaults to "MAXIMUM". Cannot be specified without objectiveMetric. Cannot be modified when status is "RUNNING" or "ENDED".',
  ).optional(),
  parentLink: z.object({
    href: z.string().describe(
      "Link to the view (profile) to which this experiment belongs. This field is read-only.",
    ).optional(),
    type: z.string().describe(
      'Value is "analytics#profile". This field is read-only.',
    ).optional(),
  }).describe(
    "Parent link for an experiment. Points to the view (profile) to which this experiment belongs.",
  ).optional(),
  profileId: z.string().describe(
    "View (Profile) ID to which this experiment belongs. This field is read-only.",
  ).optional(),
  reasonExperimentEnded: z.string().describe(
    'Why the experiment ended. Possible values: "STOPPED_BY_USER", "WINNER_FOUND", "EXPERIMENT_EXPIRED", "ENDED_WITH_NO_WINNER", "GOAL_OBJECTIVE_CHANGED". "ENDED_WITH_NO_WINNER" means that the experiment didn\'t expire but no winner was projected to be found. If the experiment status is changed via the API to ENDED this field is set to STOPPED_BY_USER. This field is read-only.',
  ).optional(),
  rewriteVariationUrlsAsOriginal: z.boolean().describe(
    "Boolean specifying whether variations URLS are rewritten to match those of the original. This field may not be changed for an experiments whose status is ENDED.",
  ).optional(),
  servingFramework: z.string().describe(
    "The framework used to serve the experiment variations and evaluate the results. One of: - REDIRECT: Google Analytics redirects traffic to different variation pages, reports the chosen variation and evaluates the results. - API: Google Analytics chooses and reports the variation to serve and evaluates the results; the caller is responsible for serving the selected variation. - EXTERNAL: The variations will be served externally and the chosen variation reported to Google Analytics. The caller is responsible for serving the selected variation and evaluating the results.",
  ).optional(),
  snippet: z.string().describe(
    "The snippet of code to include on the control page(s). This field is read-only.",
  ).optional(),
  startTime: z.string().describe(
    "The starting time of the experiment (the time the status changed from READY_TO_RUN to RUNNING). This field is present only if the experiment has started. This field is read-only.",
  ).optional(),
  status: z.string().describe(
    'Experiment status. Possible values: "DRAFT", "READY_TO_RUN", "RUNNING", "ENDED". Experiments can be created in the "DRAFT", "READY_TO_RUN" or "RUNNING" state. This field is required when creating an experiment.',
  ).optional(),
  trafficCoverage: z.number().describe(
    "A floating-point number in (0, 1]. Specifies the fraction of the traffic that participates in the experiment. Can be changed for a running experiment. This field may not be changed for an experiments whose status is ENDED.",
  ).optional(),
  updated: z.string().describe(
    "Time the experiment was last modified. This field is read-only.",
  ).optional(),
  variations: z.array(z.object({
    name: z.string().describe(
      "The name of the variation. This field is required when creating an experiment. This field may not be changed for an experiment whose status is ENDED.",
    ).optional(),
    status: z.string().describe(
      'Status of the variation. Possible values: "ACTIVE", "INACTIVE". INACTIVE variations are not served. This field may not be changed for an experiment whose status is ENDED.',
    ).optional(),
    url: z.string().describe(
      "The URL of the variation. This field may not be changed for an experiment whose status is RUNNING or ENDED.",
    ).optional(),
    weight: z.number().describe(
      "Weight that this variation should receive. Only present if the experiment is running. This field is read-only.",
    ).optional(),
    won: z.boolean().describe(
      "True if the experiment has ended and this variation performed (statistically) significantly better than the original. This field is read-only.",
    ).optional(),
  })).describe(
    "Array of variations. The first variation in the array is the original. The number of variations may not change once an experiment is in the RUNNING state. At least two variations are required before status can be set to RUNNING.",
  ).optional(),
  webPropertyId: z.string().describe(
    "Web property ID to which this experiment belongs. The web property ID is of the form UA-XXXXX-YY. This field is read-only.",
  ).optional(),
  winnerConfidenceLevel: z.number().describe(
    "A floating-point number in (0, 1). Specifies the necessary confidence level to choose a winner. This field may not be changed for an experiments whose status is ENDED.",
  ).optional(),
  winnerFound: z.boolean().describe(
    "Boolean specifying whether a winner has been found for this experiment. This field is read-only.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Google Analytics Management.Experiments. Registered at `@swamp/gcp/analytics/management-experiments`. */
export const model = {
  type: "@swamp/gcp/analytics/management-experiments",
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
      toVersion: "2026.05.19.1",
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
      description: "JSON template for Analytics experiment resource.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a experiments",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
        if (g["webPropertyId"] !== undefined) {
          params["webPropertyId"] = String(g["webPropertyId"]);
        }
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["created"] !== undefined) body["created"] = g["created"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["editableInGaUi"] !== undefined) {
          body["editableInGaUi"] = g["editableInGaUi"];
        }
        if (g["endTime"] !== undefined) body["endTime"] = g["endTime"];
        if (g["equalWeighting"] !== undefined) {
          body["equalWeighting"] = g["equalWeighting"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["internalWebPropertyId"] !== undefined) {
          body["internalWebPropertyId"] = g["internalWebPropertyId"];
        }
        if (g["minimumExperimentLengthInDays"] !== undefined) {
          body["minimumExperimentLengthInDays"] =
            g["minimumExperimentLengthInDays"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["objectiveMetric"] !== undefined) {
          body["objectiveMetric"] = g["objectiveMetric"];
        }
        if (g["optimizationType"] !== undefined) {
          body["optimizationType"] = g["optimizationType"];
        }
        if (g["parentLink"] !== undefined) body["parentLink"] = g["parentLink"];
        if (g["reasonExperimentEnded"] !== undefined) {
          body["reasonExperimentEnded"] = g["reasonExperimentEnded"];
        }
        if (g["rewriteVariationUrlsAsOriginal"] !== undefined) {
          body["rewriteVariationUrlsAsOriginal"] =
            g["rewriteVariationUrlsAsOriginal"];
        }
        if (g["servingFramework"] !== undefined) {
          body["servingFramework"] = g["servingFramework"];
        }
        if (g["snippet"] !== undefined) body["snippet"] = g["snippet"];
        if (g["startTime"] !== undefined) body["startTime"] = g["startTime"];
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["trafficCoverage"] !== undefined) {
          body["trafficCoverage"] = g["trafficCoverage"];
        }
        if (g["updated"] !== undefined) body["updated"] = g["updated"];
        if (g["variations"] !== undefined) body["variations"] = g["variations"];
        if (g["winnerConfidenceLevel"] !== undefined) {
          body["winnerConfidenceLevel"] = g["winnerConfidenceLevel"];
        }
        if (g["winnerFound"] !== undefined) {
          body["winnerFound"] = g["winnerFound"];
        }
        if (g["name"] !== undefined) params["experimentId"] = String(g["name"]);
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
              "accountId": String(g["accountId"] ?? ""),
              "webPropertyId": String(g["webPropertyId"] ?? ""),
              "profileId": String(g["profileId"] ?? ""),
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
      description: "Get a experiments",
      arguments: z.object({
        identifier: z.string().describe("The name of the experiments"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
        if (g["webPropertyId"] !== undefined) {
          params["webPropertyId"] = String(g["webPropertyId"]);
        }
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        }
        params["experimentId"] = args.identifier;
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
      description: "Update experiments attributes",
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
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        } else if (existing["accountId"]) {
          params["accountId"] = String(existing["accountId"]);
        }
        if (g["webPropertyId"] !== undefined) {
          params["webPropertyId"] = String(g["webPropertyId"]);
        } else if (existing["webPropertyId"]) {
          params["webPropertyId"] = String(existing["webPropertyId"]);
        }
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        } else if (existing["profileId"]) {
          params["profileId"] = String(existing["profileId"]);
        }
        params["experimentId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["created"] !== undefined) body["created"] = g["created"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["editableInGaUi"] !== undefined) {
          body["editableInGaUi"] = g["editableInGaUi"];
        }
        if (g["endTime"] !== undefined) body["endTime"] = g["endTime"];
        if (g["equalWeighting"] !== undefined) {
          body["equalWeighting"] = g["equalWeighting"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["internalWebPropertyId"] !== undefined) {
          body["internalWebPropertyId"] = g["internalWebPropertyId"];
        }
        if (g["minimumExperimentLengthInDays"] !== undefined) {
          body["minimumExperimentLengthInDays"] =
            g["minimumExperimentLengthInDays"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["objectiveMetric"] !== undefined) {
          body["objectiveMetric"] = g["objectiveMetric"];
        }
        if (g["parentLink"] !== undefined) body["parentLink"] = g["parentLink"];
        if (g["reasonExperimentEnded"] !== undefined) {
          body["reasonExperimentEnded"] = g["reasonExperimentEnded"];
        }
        if (g["rewriteVariationUrlsAsOriginal"] !== undefined) {
          body["rewriteVariationUrlsAsOriginal"] =
            g["rewriteVariationUrlsAsOriginal"];
        }
        if (g["servingFramework"] !== undefined) {
          body["servingFramework"] = g["servingFramework"];
        }
        if (g["snippet"] !== undefined) body["snippet"] = g["snippet"];
        if (g["startTime"] !== undefined) body["startTime"] = g["startTime"];
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["trafficCoverage"] !== undefined) {
          body["trafficCoverage"] = g["trafficCoverage"];
        }
        if (g["updated"] !== undefined) body["updated"] = g["updated"];
        if (g["variations"] !== undefined) body["variations"] = g["variations"];
        if (g["winnerConfidenceLevel"] !== undefined) {
          body["winnerConfidenceLevel"] = g["winnerConfidenceLevel"];
        }
        if (g["winnerFound"] !== undefined) {
          body["winnerFound"] = g["winnerFound"];
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
          UPDATE_CONFIG,
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
      description: "Delete the experiments",
      arguments: z.object({
        identifier: z.string().describe("The name of the experiments"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
        if (g["webPropertyId"] !== undefined) {
          params["webPropertyId"] = String(g["webPropertyId"]);
        }
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        }
        params["experimentId"] = args.identifier;
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
      description: "Sync experiments state from GCP",
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
          if (g["accountId"] !== undefined) {
            params["accountId"] = String(g["accountId"]);
          } else if (existing["accountId"]) {
            params["accountId"] = String(existing["accountId"]);
          }
          if (g["webPropertyId"] !== undefined) {
            params["webPropertyId"] = String(g["webPropertyId"]);
          } else if (existing["webPropertyId"]) {
            params["webPropertyId"] = String(existing["webPropertyId"]);
          }
          if (g["profileId"] !== undefined) {
            params["profileId"] = String(g["profileId"]);
          } else if (existing["profileId"]) {
            params["profileId"] = String(existing["profileId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["experimentId"] = identifier;
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
      description: "List experiments resources",
      arguments: z.object({
        max_results: z.number().describe(
          "The maximum number of experiments to include in this response.",
        ).optional(),
        start_index: z.number().describe(
          "An index of the first experiment to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
        if (g["webPropertyId"] !== undefined) {
          params["webPropertyId"] = String(g["webPropertyId"]);
        }
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        }
        if (args["max_results"] !== undefined) {
          params["max-results"] = String(args["max_results"]);
        }
        if (args["start_index"] !== undefined) {
          params["start-index"] = String(args["start_index"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "items",
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
