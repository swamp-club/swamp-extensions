// Auto-generated extension model for @swamp/gcp/analytics/management-goals
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Analytics Management.Goals.
 *
 * JSON template for Analytics goal resource.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://www.googleapis.com/analytics/v3/";

const GET_CONFIG = {
  "id": "analytics.management.goals.get",
  "path":
    "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/goals/{goalId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "accountId",
    "webPropertyId",
    "profileId",
    "goalId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "goalId": {
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
  "id": "analytics.management.goals.insert",
  "path":
    "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/goals",
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
  "id": "analytics.management.goals.update",
  "path":
    "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/goals/{goalId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "accountId",
    "webPropertyId",
    "profileId",
    "goalId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "goalId": {
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
  "id": "analytics.management.goals.list",
  "path":
    "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/goals",
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
  accountId: z.string().describe("Account ID to which this goal belongs.")
    .optional(),
  active: z.boolean().describe("Determines whether this goal is active.")
    .optional(),
  created: z.string().describe("Time this goal was created.").optional(),
  eventDetails: z.object({
    eventConditions: z.array(z.object({
      comparisonType: z.string().describe(
        "Type of comparison. Possible values are LESS_THAN, GREATER_THAN or EQUAL.",
      ).optional(),
      comparisonValue: z.string().describe("Value used for this comparison.")
        .optional(),
      expression: z.string().describe("Expression used for this match.")
        .optional(),
      matchType: z.string().describe(
        "Type of the match to be performed. Possible values are REGEXP, BEGINS_WITH, or EXACT.",
      ).optional(),
      type: z.string().describe(
        "Type of this event condition. Possible values are CATEGORY, ACTION, LABEL, or VALUE.",
      ).optional(),
    })).describe("List of event conditions.").optional(),
    useEventValue: z.boolean().describe(
      "Determines if the event value should be used as the value for this goal.",
    ).optional(),
  }).describe("Details for the goal of the type EVENT.").optional(),
  id: z.string().describe("Goal ID.").optional(),
  internalWebPropertyId: z.string().describe(
    "Internal ID for the web property to which this goal belongs.",
  ).optional(),
  name: z.string().describe("Goal name.").optional(),
  parentLink: z.object({
    href: z.string().describe(
      "Link to the view (profile) to which this goal belongs.",
    ).optional(),
    type: z.string().describe('Value is "analytics#profile".').optional(),
  }).describe(
    "Parent link for a goal. Points to the view (profile) to which this goal belongs.",
  ).optional(),
  profileId: z.string().describe(
    "View (Profile) ID to which this goal belongs.",
  ).optional(),
  type: z.string().describe(
    "Goal type. Possible values are URL_DESTINATION, VISIT_TIME_ON_SITE, VISIT_NUM_PAGES, AND EVENT.",
  ).optional(),
  updated: z.string().describe("Time this goal was last modified.").optional(),
  urlDestinationDetails: z.object({
    caseSensitive: z.boolean().describe(
      "Determines if the goal URL must exactly match the capitalization of visited URLs.",
    ).optional(),
    firstStepRequired: z.boolean().describe(
      "Determines if the first step in this goal is required.",
    ).optional(),
    matchType: z.string().describe(
      "Match type for the goal URL. Possible values are HEAD, EXACT, or REGEX.",
    ).optional(),
    steps: z.array(z.object({
      name: z.string().describe("Step name.").optional(),
      number: z.number().int().describe("Step number.").optional(),
      url: z.string().describe("URL for this step.").optional(),
    })).describe("List of steps configured for this goal funnel.").optional(),
    url: z.string().describe("URL for this goal.").optional(),
  }).describe("Details for the goal of the type URL_DESTINATION.").optional(),
  value: z.number().describe("Goal value.").optional(),
  visitNumPagesDetails: z.object({
    comparisonType: z.string().describe(
      "Type of comparison. Possible values are LESS_THAN, GREATER_THAN, or EQUAL.",
    ).optional(),
    comparisonValue: z.string().describe("Value used for this comparison.")
      .optional(),
  }).describe("Details for the goal of the type VISIT_NUM_PAGES.").optional(),
  visitTimeOnSiteDetails: z.object({
    comparisonType: z.string().describe(
      "Type of comparison. Possible values are LESS_THAN or GREATER_THAN.",
    ).optional(),
    comparisonValue: z.string().describe("Value used for this comparison.")
      .optional(),
  }).describe("Details for the goal of the type VISIT_TIME_ON_SITE.")
    .optional(),
  webPropertyId: z.string().describe(
    "Web property ID to which this goal belongs. The web property ID is of the form UA-XXXXX-YY.",
  ).optional(),
});

const StateSchema = z.object({
  accountId: z.string().optional(),
  active: z.boolean().optional(),
  created: z.string().optional(),
  eventDetails: z.object({
    eventConditions: z.array(z.object({
      comparisonType: z.string(),
      comparisonValue: z.string(),
      expression: z.string(),
      matchType: z.string(),
      type: z.string(),
    })),
    useEventValue: z.boolean(),
  }).optional(),
  id: z.string().optional(),
  internalWebPropertyId: z.string().optional(),
  kind: z.string().optional(),
  name: z.string(),
  parentLink: z.object({
    href: z.string(),
    type: z.string(),
  }).optional(),
  profileId: z.string().optional(),
  selfLink: z.string().optional(),
  type: z.string().optional(),
  updated: z.string().optional(),
  urlDestinationDetails: z.object({
    caseSensitive: z.boolean(),
    firstStepRequired: z.boolean(),
    matchType: z.string(),
    steps: z.array(z.object({
      name: z.string(),
      number: z.number(),
      url: z.string(),
    })),
    url: z.string(),
  }).optional(),
  value: z.number().optional(),
  visitNumPagesDetails: z.object({
    comparisonType: z.string(),
    comparisonValue: z.string(),
  }).optional(),
  visitTimeOnSiteDetails: z.object({
    comparisonType: z.string(),
    comparisonValue: z.string(),
  }).optional(),
  webPropertyId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accountId: z.string().describe("Account ID to which this goal belongs.")
    .optional(),
  active: z.boolean().describe("Determines whether this goal is active.")
    .optional(),
  created: z.string().describe("Time this goal was created.").optional(),
  eventDetails: z.object({
    eventConditions: z.array(z.object({
      comparisonType: z.string().describe(
        "Type of comparison. Possible values are LESS_THAN, GREATER_THAN or EQUAL.",
      ).optional(),
      comparisonValue: z.string().describe("Value used for this comparison.")
        .optional(),
      expression: z.string().describe("Expression used for this match.")
        .optional(),
      matchType: z.string().describe(
        "Type of the match to be performed. Possible values are REGEXP, BEGINS_WITH, or EXACT.",
      ).optional(),
      type: z.string().describe(
        "Type of this event condition. Possible values are CATEGORY, ACTION, LABEL, or VALUE.",
      ).optional(),
    })).describe("List of event conditions.").optional(),
    useEventValue: z.boolean().describe(
      "Determines if the event value should be used as the value for this goal.",
    ).optional(),
  }).describe("Details for the goal of the type EVENT.").optional(),
  id: z.string().describe("Goal ID.").optional(),
  internalWebPropertyId: z.string().describe(
    "Internal ID for the web property to which this goal belongs.",
  ).optional(),
  name: z.string().describe("Goal name.").optional(),
  parentLink: z.object({
    href: z.string().describe(
      "Link to the view (profile) to which this goal belongs.",
    ).optional(),
    type: z.string().describe('Value is "analytics#profile".').optional(),
  }).describe(
    "Parent link for a goal. Points to the view (profile) to which this goal belongs.",
  ).optional(),
  profileId: z.string().describe(
    "View (Profile) ID to which this goal belongs.",
  ).optional(),
  type: z.string().describe(
    "Goal type. Possible values are URL_DESTINATION, VISIT_TIME_ON_SITE, VISIT_NUM_PAGES, AND EVENT.",
  ).optional(),
  updated: z.string().describe("Time this goal was last modified.").optional(),
  urlDestinationDetails: z.object({
    caseSensitive: z.boolean().describe(
      "Determines if the goal URL must exactly match the capitalization of visited URLs.",
    ).optional(),
    firstStepRequired: z.boolean().describe(
      "Determines if the first step in this goal is required.",
    ).optional(),
    matchType: z.string().describe(
      "Match type for the goal URL. Possible values are HEAD, EXACT, or REGEX.",
    ).optional(),
    steps: z.array(z.object({
      name: z.string().describe("Step name.").optional(),
      number: z.number().int().describe("Step number.").optional(),
      url: z.string().describe("URL for this step.").optional(),
    })).describe("List of steps configured for this goal funnel.").optional(),
    url: z.string().describe("URL for this goal.").optional(),
  }).describe("Details for the goal of the type URL_DESTINATION.").optional(),
  value: z.number().describe("Goal value.").optional(),
  visitNumPagesDetails: z.object({
    comparisonType: z.string().describe(
      "Type of comparison. Possible values are LESS_THAN, GREATER_THAN, or EQUAL.",
    ).optional(),
    comparisonValue: z.string().describe("Value used for this comparison.")
      .optional(),
  }).describe("Details for the goal of the type VISIT_NUM_PAGES.").optional(),
  visitTimeOnSiteDetails: z.object({
    comparisonType: z.string().describe(
      "Type of comparison. Possible values are LESS_THAN or GREATER_THAN.",
    ).optional(),
    comparisonValue: z.string().describe("Value used for this comparison.")
      .optional(),
  }).describe("Details for the goal of the type VISIT_TIME_ON_SITE.")
    .optional(),
  webPropertyId: z.string().describe(
    "Web property ID to which this goal belongs. The web property ID is of the form UA-XXXXX-YY.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Google Analytics Management.Goals. Registered at `@swamp/gcp/analytics/management-goals`. */
export const model = {
  type: "@swamp/gcp/analytics/management-goals",
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
      description: "JSON template for Analytics goal resource.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a goals",
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
        if (g["active"] !== undefined) body["active"] = g["active"];
        if (g["created"] !== undefined) body["created"] = g["created"];
        if (g["eventDetails"] !== undefined) {
          body["eventDetails"] = g["eventDetails"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["internalWebPropertyId"] !== undefined) {
          body["internalWebPropertyId"] = g["internalWebPropertyId"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["parentLink"] !== undefined) body["parentLink"] = g["parentLink"];
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["updated"] !== undefined) body["updated"] = g["updated"];
        if (g["urlDestinationDetails"] !== undefined) {
          body["urlDestinationDetails"] = g["urlDestinationDetails"];
        }
        if (g["value"] !== undefined) body["value"] = g["value"];
        if (g["visitNumPagesDetails"] !== undefined) {
          body["visitNumPagesDetails"] = g["visitNumPagesDetails"];
        }
        if (g["visitTimeOnSiteDetails"] !== undefined) {
          body["visitTimeOnSiteDetails"] = g["visitTimeOnSiteDetails"];
        }
        if (g["name"] !== undefined) params["goalId"] = String(g["name"]);
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
      description: "Get a goals",
      arguments: z.object({
        identifier: z.string().describe("The name of the goals"),
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
        params["goalId"] = args.identifier;
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
      description: "Update goals attributes",
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
        params["goalId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["active"] !== undefined) body["active"] = g["active"];
        if (g["created"] !== undefined) body["created"] = g["created"];
        if (g["eventDetails"] !== undefined) {
          body["eventDetails"] = g["eventDetails"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["internalWebPropertyId"] !== undefined) {
          body["internalWebPropertyId"] = g["internalWebPropertyId"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["parentLink"] !== undefined) body["parentLink"] = g["parentLink"];
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["updated"] !== undefined) body["updated"] = g["updated"];
        if (g["urlDestinationDetails"] !== undefined) {
          body["urlDestinationDetails"] = g["urlDestinationDetails"];
        }
        if (g["value"] !== undefined) body["value"] = g["value"];
        if (g["visitNumPagesDetails"] !== undefined) {
          body["visitNumPagesDetails"] = g["visitNumPagesDetails"];
        }
        if (g["visitTimeOnSiteDetails"] !== undefined) {
          body["visitTimeOnSiteDetails"] = g["visitTimeOnSiteDetails"];
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
    sync: {
      description: "Sync goals state from GCP",
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
          params["goalId"] = identifier;
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
      description: "List goals resources",
      arguments: z.object({
        max_results: z.number().describe(
          "The maximum number of goals to include in this response.",
        ).optional(),
        start_index: z.number().describe(
          "An index of the first goal to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter.",
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
