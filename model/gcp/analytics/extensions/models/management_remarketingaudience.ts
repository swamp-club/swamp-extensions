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

// Auto-generated extension model for @swamp/gcp/analytics/management-remarketingaudience
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Analytics Management.RemarketingAudience.
 *
 * JSON template for an Analytics remarketing audience.
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
  "id": "analytics.management.remarketingAudience.get",
  "path":
    "management/accounts/{accountId}/webproperties/{webPropertyId}/remarketingAudiences/{remarketingAudienceId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "accountId",
    "webPropertyId",
    "remarketingAudienceId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "remarketingAudienceId": {
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
  "id": "analytics.management.remarketingAudience.insert",
  "path":
    "management/accounts/{accountId}/webproperties/{webPropertyId}/remarketingAudiences",
  "httpMethod": "POST",
  "parameterOrder": [
    "accountId",
    "webPropertyId",
  ],
  "parameters": {
    "accountId": {
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
  "id": "analytics.management.remarketingAudience.update",
  "path":
    "management/accounts/{accountId}/webproperties/{webPropertyId}/remarketingAudiences/{remarketingAudienceId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "accountId",
    "webPropertyId",
    "remarketingAudienceId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "remarketingAudienceId": {
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
  "id": "analytics.management.remarketingAudience.delete",
  "path":
    "management/accounts/{accountId}/webproperties/{webPropertyId}/remarketingAudiences/{remarketingAudienceId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "accountId",
    "webPropertyId",
    "remarketingAudienceId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "remarketingAudienceId": {
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
  "id": "analytics.management.remarketingAudience.list",
  "path":
    "management/accounts/{accountId}/webproperties/{webPropertyId}/remarketingAudiences",
  "httpMethod": "GET",
  "parameterOrder": [
    "accountId",
    "webPropertyId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "max-results": {
      "location": "query",
    },
    "start-index": {
      "location": "query",
    },
    "type": {
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
    "Account ID to which this remarketing audience belongs.",
  ).optional(),
  audienceDefinition: z.object({
    includeConditions: z.object({
      daysToLookBack: z.number().int().describe(
        "The look-back window lets you specify a time frame for evaluating the behavior that qualifies users for your audience. For example, if your filters include users from Central Asia, and Transactions Greater than 2, and you set the look-back window to 14 days, then any user from Central Asia whose cumulative transactions exceed 2 during the last 14 days is added to the audience.",
      ).optional(),
      isSmartList: z.boolean().describe(
        "Boolean indicating whether this segment is a smart list. https://support.google.com/analytics/answer/4628577",
      ).optional(),
      kind: z.string().describe("Resource type for include conditions.")
        .optional(),
      membershipDurationDays: z.number().int().describe(
        "Number of days (in the range 1 to 540) a user remains in the audience.",
      ).optional(),
      segment: z.string().describe(
        "The segment condition that will cause a user to be added to an audience.",
      ).optional(),
    }).describe(
      "JSON template for an Analytics Remarketing Include Conditions.",
    ).optional(),
  }).describe(
    "The simple audience definition that will cause a user to be added to an audience.",
  ).optional(),
  audienceType: z.string().describe(
    "The type of audience, either SIMPLE or STATE_BASED.",
  ).optional(),
  created: z.string().describe("Time this remarketing audience was created.")
    .optional(),
  description: z.string().describe(
    "The description of this remarketing audience.",
  ).optional(),
  id: z.string().describe("Remarketing Audience ID.").optional(),
  internalWebPropertyId: z.string().describe(
    "Internal ID for the web property to which this remarketing audience belongs.",
  ).optional(),
  linkedAdAccounts: z.array(z.object({
    accountId: z.string().describe(
      "Account ID to which this linked foreign account belongs.",
    ).optional(),
    eligibleForSearch: z.boolean().describe(
      "Boolean indicating whether this is eligible for search.",
    ).optional(),
    id: z.string().describe("Entity ad account link ID.").optional(),
    internalWebPropertyId: z.string().describe(
      "Internal ID for the web property to which this linked foreign account belongs.",
    ).optional(),
    kind: z.string().describe("Resource type for linked foreign account.")
      .optional(),
    linkedAccountId: z.string().describe(
      "The foreign account ID. For example the an Google Ads `linkedAccountId` has the following format XXX-XXX-XXXX.",
    ).optional(),
    remarketingAudienceId: z.string().describe(
      "Remarketing audience ID to which this linked foreign account belongs.",
    ).optional(),
    status: z.string().describe("The status of this foreign account link.")
      .optional(),
    type: z.string().describe(
      "The type of the foreign account. For example, `ADWORDS_LINKS`, `DBM_LINKS`, `MCC_LINKS` or `OPTIMIZE`.",
    ).optional(),
    webPropertyId: z.string().describe(
      "Web property ID of the form UA-XXXXX-YY to which this linked foreign account belongs.",
    ).optional(),
  })).describe(
    "The linked ad accounts associated with this remarketing audience. A remarketing audience can have only one linkedAdAccount currently.",
  ).optional(),
  linkedViews: z.array(z.string()).describe(
    "The views (profiles) that this remarketing audience is linked to.",
  ).optional(),
  name: z.string().describe("The name of this remarketing audience.")
    .optional(),
  stateBasedAudienceDefinition: z.object({
    excludeConditions: z.object({
      exclusionDuration: z.string().describe(
        "Whether to make the exclusion TEMPORARY or PERMANENT.",
      ).optional(),
      segment: z.string().describe(
        "The segment condition that will cause a user to be removed from an audience.",
      ).optional(),
    }).describe("Defines the conditions to exclude users from the audience.")
      .optional(),
    includeConditions: z.object({
      daysToLookBack: z.number().int().describe(
        "The look-back window lets you specify a time frame for evaluating the behavior that qualifies users for your audience. For example, if your filters include users from Central Asia, and Transactions Greater than 2, and you set the look-back window to 14 days, then any user from Central Asia whose cumulative transactions exceed 2 during the last 14 days is added to the audience.",
      ).optional(),
      isSmartList: z.boolean().describe(
        "Boolean indicating whether this segment is a smart list. https://support.google.com/analytics/answer/4628577",
      ).optional(),
      kind: z.string().describe("Resource type for include conditions.")
        .optional(),
      membershipDurationDays: z.number().int().describe(
        "Number of days (in the range 1 to 540) a user remains in the audience.",
      ).optional(),
      segment: z.string().describe(
        "The segment condition that will cause a user to be added to an audience.",
      ).optional(),
    }).describe(
      "JSON template for an Analytics Remarketing Include Conditions.",
    ).optional(),
  }).describe(
    "A state based audience definition that will cause a user to be added or removed from an audience.",
  ).optional(),
  updated: z.string().describe(
    "Time this remarketing audience was last modified.",
  ).optional(),
  webPropertyId: z.string().describe(
    "Web property ID of the form UA-XXXXX-YY to which this remarketing audience belongs.",
  ).optional(),
});

const StateSchema = z.object({
  accountId: z.string().optional(),
  audienceDefinition: z.object({
    includeConditions: z.object({
      daysToLookBack: z.number(),
      isSmartList: z.boolean(),
      kind: z.string(),
      membershipDurationDays: z.number(),
      segment: z.string(),
    }),
  }).optional(),
  audienceType: z.string().optional(),
  created: z.string().optional(),
  description: z.string().optional(),
  id: z.string().optional(),
  internalWebPropertyId: z.string().optional(),
  kind: z.string().optional(),
  linkedAdAccounts: z.array(z.object({
    accountId: z.string(),
    eligibleForSearch: z.boolean(),
    id: z.string(),
    internalWebPropertyId: z.string(),
    kind: z.string(),
    linkedAccountId: z.string(),
    remarketingAudienceId: z.string(),
    status: z.string(),
    type: z.string(),
    webPropertyId: z.string(),
  })).optional(),
  linkedViews: z.array(z.string()).optional(),
  name: z.string(),
  stateBasedAudienceDefinition: z.object({
    excludeConditions: z.object({
      exclusionDuration: z.string(),
      segment: z.string(),
    }),
    includeConditions: z.object({
      daysToLookBack: z.number(),
      isSmartList: z.boolean(),
      kind: z.string(),
      membershipDurationDays: z.number(),
      segment: z.string(),
    }),
  }).optional(),
  updated: z.string().optional(),
  webPropertyId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accountId: z.string().describe(
    "Account ID to which this remarketing audience belongs.",
  ).optional(),
  audienceDefinition: z.object({
    includeConditions: z.object({
      daysToLookBack: z.number().int().describe(
        "The look-back window lets you specify a time frame for evaluating the behavior that qualifies users for your audience. For example, if your filters include users from Central Asia, and Transactions Greater than 2, and you set the look-back window to 14 days, then any user from Central Asia whose cumulative transactions exceed 2 during the last 14 days is added to the audience.",
      ).optional(),
      isSmartList: z.boolean().describe(
        "Boolean indicating whether this segment is a smart list. https://support.google.com/analytics/answer/4628577",
      ).optional(),
      kind: z.string().describe("Resource type for include conditions.")
        .optional(),
      membershipDurationDays: z.number().int().describe(
        "Number of days (in the range 1 to 540) a user remains in the audience.",
      ).optional(),
      segment: z.string().describe(
        "The segment condition that will cause a user to be added to an audience.",
      ).optional(),
    }).describe(
      "JSON template for an Analytics Remarketing Include Conditions.",
    ).optional(),
  }).describe(
    "The simple audience definition that will cause a user to be added to an audience.",
  ).optional(),
  audienceType: z.string().describe(
    "The type of audience, either SIMPLE or STATE_BASED.",
  ).optional(),
  created: z.string().describe("Time this remarketing audience was created.")
    .optional(),
  description: z.string().describe(
    "The description of this remarketing audience.",
  ).optional(),
  id: z.string().describe("Remarketing Audience ID.").optional(),
  internalWebPropertyId: z.string().describe(
    "Internal ID for the web property to which this remarketing audience belongs.",
  ).optional(),
  linkedAdAccounts: z.array(z.object({
    accountId: z.string().describe(
      "Account ID to which this linked foreign account belongs.",
    ).optional(),
    eligibleForSearch: z.boolean().describe(
      "Boolean indicating whether this is eligible for search.",
    ).optional(),
    id: z.string().describe("Entity ad account link ID.").optional(),
    internalWebPropertyId: z.string().describe(
      "Internal ID for the web property to which this linked foreign account belongs.",
    ).optional(),
    kind: z.string().describe("Resource type for linked foreign account.")
      .optional(),
    linkedAccountId: z.string().describe(
      "The foreign account ID. For example the an Google Ads `linkedAccountId` has the following format XXX-XXX-XXXX.",
    ).optional(),
    remarketingAudienceId: z.string().describe(
      "Remarketing audience ID to which this linked foreign account belongs.",
    ).optional(),
    status: z.string().describe("The status of this foreign account link.")
      .optional(),
    type: z.string().describe(
      "The type of the foreign account. For example, `ADWORDS_LINKS`, `DBM_LINKS`, `MCC_LINKS` or `OPTIMIZE`.",
    ).optional(),
    webPropertyId: z.string().describe(
      "Web property ID of the form UA-XXXXX-YY to which this linked foreign account belongs.",
    ).optional(),
  })).describe(
    "The linked ad accounts associated with this remarketing audience. A remarketing audience can have only one linkedAdAccount currently.",
  ).optional(),
  linkedViews: z.array(z.string()).describe(
    "The views (profiles) that this remarketing audience is linked to.",
  ).optional(),
  name: z.string().describe("The name of this remarketing audience.")
    .optional(),
  stateBasedAudienceDefinition: z.object({
    excludeConditions: z.object({
      exclusionDuration: z.string().describe(
        "Whether to make the exclusion TEMPORARY or PERMANENT.",
      ).optional(),
      segment: z.string().describe(
        "The segment condition that will cause a user to be removed from an audience.",
      ).optional(),
    }).describe("Defines the conditions to exclude users from the audience.")
      .optional(),
    includeConditions: z.object({
      daysToLookBack: z.number().int().describe(
        "The look-back window lets you specify a time frame for evaluating the behavior that qualifies users for your audience. For example, if your filters include users from Central Asia, and Transactions Greater than 2, and you set the look-back window to 14 days, then any user from Central Asia whose cumulative transactions exceed 2 during the last 14 days is added to the audience.",
      ).optional(),
      isSmartList: z.boolean().describe(
        "Boolean indicating whether this segment is a smart list. https://support.google.com/analytics/answer/4628577",
      ).optional(),
      kind: z.string().describe("Resource type for include conditions.")
        .optional(),
      membershipDurationDays: z.number().int().describe(
        "Number of days (in the range 1 to 540) a user remains in the audience.",
      ).optional(),
      segment: z.string().describe(
        "The segment condition that will cause a user to be added to an audience.",
      ).optional(),
    }).describe(
      "JSON template for an Analytics Remarketing Include Conditions.",
    ).optional(),
  }).describe(
    "A state based audience definition that will cause a user to be added or removed from an audience.",
  ).optional(),
  updated: z.string().describe(
    "Time this remarketing audience was last modified.",
  ).optional(),
  webPropertyId: z.string().describe(
    "Web property ID of the form UA-XXXXX-YY to which this remarketing audience belongs.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Google Analytics Management.RemarketingAudience. Registered at `@swamp/gcp/analytics/management-remarketingaudience`. */
export const model = {
  type: "@swamp/gcp/analytics/management-remarketingaudience",
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
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.25.1",
      description: "No schema changes",
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
      description: "JSON template for an Analytics remarketing audience.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a remarketingAudience",
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
        const body: Record<string, unknown> = {};
        if (g["audienceDefinition"] !== undefined) {
          body["audienceDefinition"] = g["audienceDefinition"];
        }
        if (g["audienceType"] !== undefined) {
          body["audienceType"] = g["audienceType"];
        }
        if (g["created"] !== undefined) body["created"] = g["created"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["internalWebPropertyId"] !== undefined) {
          body["internalWebPropertyId"] = g["internalWebPropertyId"];
        }
        if (g["linkedAdAccounts"] !== undefined) {
          body["linkedAdAccounts"] = g["linkedAdAccounts"];
        }
        if (g["linkedViews"] !== undefined) {
          body["linkedViews"] = g["linkedViews"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["stateBasedAudienceDefinition"] !== undefined) {
          body["stateBasedAudienceDefinition"] =
            g["stateBasedAudienceDefinition"];
        }
        if (g["updated"] !== undefined) body["updated"] = g["updated"];
        if (g["name"] !== undefined) {
          params["remarketingAudienceId"] = String(g["name"]);
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
              "accountId": String(g["accountId"] ?? ""),
              "webPropertyId": String(g["webPropertyId"] ?? ""),
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
      description: "Get a remarketingAudience",
      arguments: z.object({
        identifier: z.string().describe("The name of the remarketingAudience"),
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
        params["remarketingAudienceId"] = args.identifier;
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
      description: "Update remarketingAudience attributes",
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
        params["remarketingAudienceId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["audienceDefinition"] !== undefined) {
          body["audienceDefinition"] = g["audienceDefinition"];
        }
        if (g["audienceType"] !== undefined) {
          body["audienceType"] = g["audienceType"];
        }
        if (g["created"] !== undefined) body["created"] = g["created"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["internalWebPropertyId"] !== undefined) {
          body["internalWebPropertyId"] = g["internalWebPropertyId"];
        }
        if (g["linkedAdAccounts"] !== undefined) {
          body["linkedAdAccounts"] = g["linkedAdAccounts"];
        }
        if (g["linkedViews"] !== undefined) {
          body["linkedViews"] = g["linkedViews"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["stateBasedAudienceDefinition"] !== undefined) {
          body["stateBasedAudienceDefinition"] =
            g["stateBasedAudienceDefinition"];
        }
        if (g["updated"] !== undefined) body["updated"] = g["updated"];
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
      description: "Delete the remarketingAudience",
      arguments: z.object({
        identifier: z.string().describe("The name of the remarketingAudience"),
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
        params["remarketingAudienceId"] = args.identifier;
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
      description: "Sync remarketingAudience state from GCP",
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
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["remarketingAudienceId"] = identifier;
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
      description: "List remarketingAudience resources",
      arguments: z.object({
        max_results: z.number().describe(
          "The maximum number of remarketing audiences to include in this response.",
        ).optional(),
        start_index: z.number().describe(
          "An index of the first entity to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter.",
        ).optional(),
        type: z.string().optional(),
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
        if (args["max_results"] !== undefined) {
          params["max-results"] = String(args["max_results"]);
        }
        if (args["start_index"] !== undefined) {
          params["start-index"] = String(args["start_index"]);
        }
        if (args["type"] !== undefined) params["type"] = String(args["type"]);
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
