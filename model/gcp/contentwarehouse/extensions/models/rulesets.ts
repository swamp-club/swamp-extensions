// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/gcp/contentwarehouse/rulesets
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Document AI Warehouse RuleSets.
 *
 * Represents a set of rules from a single customer.
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
  return `${parent}/ruleSets/${shortName}`;
}

const BASE_URL = "https://contentwarehouse.googleapis.com/";

const GET_CONFIG = {
  "id": "contentwarehouse.projects.locations.ruleSets.get",
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
  "id": "contentwarehouse.projects.locations.ruleSets.create",
  "path": "v1/{+parent}/ruleSets",
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
  "id": "contentwarehouse.projects.locations.ruleSets.patch",
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
  },
} as const;

const DELETE_CONFIG = {
  "id": "contentwarehouse.projects.locations.ruleSets.delete",
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
  "id": "contentwarehouse.projects.locations.ruleSets.list",
  "path": "v1/{+parent}/ruleSets",
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
  scopes: z.string().describe(
    "Comma-separated OAuth scopes to request when minting access tokens via gcloud. Defaults to the API's Discovery Document scopes.",
  ).optional(),
  quotaProject: z.string().describe(
    "GCP project ID for quota and billing attribution; sets the x-goog-user-project header. Overrides GOOGLE_CLOUD_QUOTA_PROJECT environment variable. Required for APIs like Cloud Identity when using user credentials.",
  ).optional(),
  apiEndpoint: z.string().describe(
    "Custom API endpoint for emulators; overrides GCP_API_ENDPOINT environment variable. Defaults to the service's production URL.",
  ).optional(),
  description: z.string().describe("Short description of the rule-set.")
    .optional(),
  name: z.string().describe(
    "The resource name of the rule set. Managed internally. Format: projects/{project_number}/locations/{location}/ruleSet/{rule_set_id}. The name is ignored when creating a rule set.",
  ).optional(),
  rules: z.array(z.object({
    actions: z.array(z.object({
      accessControl: z.object({
        operationType: z.unknown().describe("Identifies the type of operation.")
          .optional(),
        policy: z.unknown().describe(
          "Represents the new policy from which bindings are added, removed or replaced based on the type of the operation. the policy is limited to a few 10s of KB.",
        ).optional(),
      }).describe("Action triggering access control operations.").optional(),
      actionId: z.string().describe("ID of the action. Managed internally.")
        .optional(),
      addToFolder: z.object({
        folders: z.unknown().describe(
          "Names of the folder under which new document is to be added. Format: projects/{project_number}/locations/{location}/documents/{document_id}.",
        ).optional(),
      }).describe("Action triggering create document link operation.")
        .optional(),
      dataUpdate: z.object({
        entries: z.unknown().describe(
          'Map of (K, V) -> (valid name of the field, new value of the field) E.g., ("age", "60") entry triggers update of field age with a value of 60. If the field is not present then new entry is added. During update action execution, value strings will be casted to appropriate types.',
        ).optional(),
      }).describe("Action triggering data update operations.").optional(),
      dataValidation: z.object({
        conditions: z.unknown().describe(
          'Map of (K, V) -> (field, string condition to be evaluated on the field) E.g., ("age", "age > 18 && age < 60") entry triggers validation of field age with the given condition. Map entries will be ANDed during validation.',
        ).optional(),
      }).describe("Action triggering data validation operations.").optional(),
      deleteDocumentAction: z.object({
        enableHardDelete: z.unknown().describe(
          "Boolean field to select between hard vs soft delete options. Set 'true' for 'hard delete' and 'false' for 'soft delete'.",
        ).optional(),
      }).describe("Action deleting the document.").optional(),
      publishToPubSub: z.object({
        messages: z.unknown().describe("Messages to be published.").optional(),
        topicId: z.unknown().describe(
          "The topic id in the Pub/Sub service for which messages will be published to.",
        ).optional(),
      }).describe("Action publish to Pub/Sub operation.").optional(),
      removeFromFolderAction: z.object({
        condition: z.unknown().describe(
          "Condition of the action to be executed.",
        ).optional(),
        folder: z.unknown().describe(
          "Name of the folder under which new document is to be added. Format: projects/{project_number}/locations/{location}/documents/{document_id}.",
        ).optional(),
      }).describe("Action removing a document from a folder.").optional(),
    })).describe(
      "List of actions that are executed when the rule is satisfied.",
    ).optional(),
    condition: z.string().describe(
      'Represents the conditional expression to be evaluated. Expression should evaluate to a boolean result. When the condition is true actions are executed. Example: user_role = "hsbc_role_1" AND doc.salary > 20000',
    ).optional(),
    description: z.string().describe(
      "Short description of the rule and its context.",
    ).optional(),
    ruleId: z.string().describe(
      "ID of the rule. It has to be unique across all the examples. This is managed internally.",
    ).optional(),
    triggerType: z.enum([
      "UNKNOWN",
      "ON_CREATE",
      "ON_UPDATE",
      "ON_CREATE_LINK",
      "ON_DELETE_LINK",
    ]).describe("Identifies the trigger type for running the policy.")
      .optional(),
  })).describe("List of rules given by the customer.").optional(),
  source: z.string().describe("Source of the rules i.e., customer name.")
    .optional(),
  ruleSet: z.object({
    description: z.string().describe("Short description of the rule-set.")
      .optional(),
    name: z.string().describe(
      "The resource name of the rule set. Managed internally. Format: projects/{project_number}/locations/{location}/ruleSet/{rule_set_id}. The name is ignored when creating a rule set.",
    ).optional(),
    rules: z.array(z.object({
      actions: z.array(z.object({
        accessControl: z.unknown().describe(
          "Action triggering access control operations.",
        ).optional(),
        actionId: z.unknown().describe("ID of the action. Managed internally.")
          .optional(),
        addToFolder: z.unknown().describe(
          "Action triggering create document link operation.",
        ).optional(),
        dataUpdate: z.unknown().describe(
          "Action triggering data update operations.",
        ).optional(),
        dataValidation: z.unknown().describe(
          "Action triggering data validation operations.",
        ).optional(),
        deleteDocumentAction: z.unknown().describe(
          "Action deleting the document.",
        ).optional(),
        publishToPubSub: z.unknown().describe(
          "Action publish to Pub/Sub operation.",
        ).optional(),
        removeFromFolderAction: z.unknown().describe(
          "Action removing a document from a folder.",
        ).optional(),
      })).describe(
        "List of actions that are executed when the rule is satisfied.",
      ).optional(),
      condition: z.string().describe(
        'Represents the conditional expression to be evaluated. Expression should evaluate to a boolean result. When the condition is true actions are executed. Example: user_role = "hsbc_role_1" AND doc.salary > 20000',
      ).optional(),
      description: z.string().describe(
        "Short description of the rule and its context.",
      ).optional(),
      ruleId: z.string().describe(
        "ID of the rule. It has to be unique across all the examples. This is managed internally.",
      ).optional(),
      triggerType: z.enum([
        "UNKNOWN",
        "ON_CREATE",
        "ON_UPDATE",
        "ON_CREATE_LINK",
        "ON_DELETE_LINK",
      ]).describe("Identifies the trigger type for running the policy.")
        .optional(),
    })).describe("List of rules given by the customer.").optional(),
    source: z.string().describe("Source of the rules i.e., customer name.")
      .optional(),
  }).describe("Required. The rule set to update.").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  description: z.string().optional(),
  name: z.string(),
  rules: z.array(z.object({
    actions: z.array(z.object({
      accessControl: z.object({
        operationType: z.unknown(),
        policy: z.unknown(),
      }),
      actionId: z.string(),
      addToFolder: z.object({
        folders: z.unknown(),
      }),
      dataUpdate: z.object({
        entries: z.unknown(),
      }),
      dataValidation: z.object({
        conditions: z.unknown(),
      }),
      deleteDocumentAction: z.object({
        enableHardDelete: z.unknown(),
      }),
      publishToPubSub: z.object({
        messages: z.unknown(),
        topicId: z.unknown(),
      }),
      removeFromFolderAction: z.object({
        condition: z.unknown(),
        folder: z.unknown(),
      }),
    })),
    condition: z.string(),
    description: z.string(),
    ruleId: z.string(),
    triggerType: z.string(),
  })).optional(),
  source: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  description: z.string().describe("Short description of the rule-set.")
    .optional(),
  name: z.string().describe(
    "The resource name of the rule set. Managed internally. Format: projects/{project_number}/locations/{location}/ruleSet/{rule_set_id}. The name is ignored when creating a rule set.",
  ).optional(),
  rules: z.array(z.object({
    actions: z.array(z.object({
      accessControl: z.object({
        operationType: z.unknown().describe("Identifies the type of operation.")
          .optional(),
        policy: z.unknown().describe(
          "Represents the new policy from which bindings are added, removed or replaced based on the type of the operation. the policy is limited to a few 10s of KB.",
        ).optional(),
      }).describe("Action triggering access control operations.").optional(),
      actionId: z.string().describe("ID of the action. Managed internally.")
        .optional(),
      addToFolder: z.object({
        folders: z.unknown().describe(
          "Names of the folder under which new document is to be added. Format: projects/{project_number}/locations/{location}/documents/{document_id}.",
        ).optional(),
      }).describe("Action triggering create document link operation.")
        .optional(),
      dataUpdate: z.object({
        entries: z.unknown().describe(
          'Map of (K, V) -> (valid name of the field, new value of the field) E.g., ("age", "60") entry triggers update of field age with a value of 60. If the field is not present then new entry is added. During update action execution, value strings will be casted to appropriate types.',
        ).optional(),
      }).describe("Action triggering data update operations.").optional(),
      dataValidation: z.object({
        conditions: z.unknown().describe(
          'Map of (K, V) -> (field, string condition to be evaluated on the field) E.g., ("age", "age > 18 && age < 60") entry triggers validation of field age with the given condition. Map entries will be ANDed during validation.',
        ).optional(),
      }).describe("Action triggering data validation operations.").optional(),
      deleteDocumentAction: z.object({
        enableHardDelete: z.unknown().describe(
          "Boolean field to select between hard vs soft delete options. Set 'true' for 'hard delete' and 'false' for 'soft delete'.",
        ).optional(),
      }).describe("Action deleting the document.").optional(),
      publishToPubSub: z.object({
        messages: z.unknown().describe("Messages to be published.").optional(),
        topicId: z.unknown().describe(
          "The topic id in the Pub/Sub service for which messages will be published to.",
        ).optional(),
      }).describe("Action publish to Pub/Sub operation.").optional(),
      removeFromFolderAction: z.object({
        condition: z.unknown().describe(
          "Condition of the action to be executed.",
        ).optional(),
        folder: z.unknown().describe(
          "Name of the folder under which new document is to be added. Format: projects/{project_number}/locations/{location}/documents/{document_id}.",
        ).optional(),
      }).describe("Action removing a document from a folder.").optional(),
    })).describe(
      "List of actions that are executed when the rule is satisfied.",
    ).optional(),
    condition: z.string().describe(
      'Represents the conditional expression to be evaluated. Expression should evaluate to a boolean result. When the condition is true actions are executed. Example: user_role = "hsbc_role_1" AND doc.salary > 20000',
    ).optional(),
    description: z.string().describe(
      "Short description of the rule and its context.",
    ).optional(),
    ruleId: z.string().describe(
      "ID of the rule. It has to be unique across all the examples. This is managed internally.",
    ).optional(),
    triggerType: z.enum([
      "UNKNOWN",
      "ON_CREATE",
      "ON_UPDATE",
      "ON_CREATE_LINK",
      "ON_DELETE_LINK",
    ]).describe("Identifies the trigger type for running the policy.")
      .optional(),
  })).describe("List of rules given by the customer.").optional(),
  source: z.string().describe("Source of the rules i.e., customer name.")
    .optional(),
  ruleSet: z.object({
    description: z.string().describe("Short description of the rule-set.")
      .optional(),
    name: z.string().describe(
      "The resource name of the rule set. Managed internally. Format: projects/{project_number}/locations/{location}/ruleSet/{rule_set_id}. The name is ignored when creating a rule set.",
    ).optional(),
    rules: z.array(z.object({
      actions: z.array(z.object({
        accessControl: z.unknown().describe(
          "Action triggering access control operations.",
        ).optional(),
        actionId: z.unknown().describe("ID of the action. Managed internally.")
          .optional(),
        addToFolder: z.unknown().describe(
          "Action triggering create document link operation.",
        ).optional(),
        dataUpdate: z.unknown().describe(
          "Action triggering data update operations.",
        ).optional(),
        dataValidation: z.unknown().describe(
          "Action triggering data validation operations.",
        ).optional(),
        deleteDocumentAction: z.unknown().describe(
          "Action deleting the document.",
        ).optional(),
        publishToPubSub: z.unknown().describe(
          "Action publish to Pub/Sub operation.",
        ).optional(),
        removeFromFolderAction: z.unknown().describe(
          "Action removing a document from a folder.",
        ).optional(),
      })).describe(
        "List of actions that are executed when the rule is satisfied.",
      ).optional(),
      condition: z.string().describe(
        'Represents the conditional expression to be evaluated. Expression should evaluate to a boolean result. When the condition is true actions are executed. Example: user_role = "hsbc_role_1" AND doc.salary > 20000',
      ).optional(),
      description: z.string().describe(
        "Short description of the rule and its context.",
      ).optional(),
      ruleId: z.string().describe(
        "ID of the rule. It has to be unique across all the examples. This is managed internally.",
      ).optional(),
      triggerType: z.enum([
        "UNKNOWN",
        "ON_CREATE",
        "ON_UPDATE",
        "ON_CREATE_LINK",
        "ON_DELETE_LINK",
      ]).describe("Identifies the trigger type for running the policy.")
        .optional(),
    })).describe("List of rules given by the customer.").optional(),
    source: z.string().describe("Source of the rules i.e., customer name.")
      .optional(),
  }).describe("Required. The rule set to update.").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const _credentialKeys = new Set([
  "accessToken",
  "credentialsJson",
  "project",
  "scopes",
  "quotaProject",
  "apiEndpoint",
]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
    scopes: typeof g.scopes === "string"
      ? g.scopes.split(",").map((s: string) => s.trim())
      : undefined,
    quotaProject: g.quotaProject as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Document AI Warehouse RuleSets. Registered at `@swamp/gcp/contentwarehouse/rulesets`. */
export const model = {
  type: "@swamp/gcp/contentwarehouse/rulesets",
  version: "2026.10.13.1",
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
    {
      toVersion: "2026.07.17.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.17.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.1",
      description: "Added: scopes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.20.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.12.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Represents a set of rules from a single customer.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ruleSets",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["rules"] !== undefined) body["rules"] = g["rules"];
        if (g["source"] !== undefined) body["source"] = g["source"];
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          baseUrl,
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
        const instanceName = ((g.name ?? result.name)?.toString() ?? "current")
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
      description: "Get a ruleSets",
      arguments: z.object({
        identifier: z.string().describe("The name of the ruleSets"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          baseUrl,
          GET_CONFIG,
          params,
          credentials,
        ) as StateData;
        const instanceName =
          ((g.name ?? result.name)?.toString() ?? args.identifier).replace(
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
      description: "Update ruleSets attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific ruleSets by name (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error(
            "No existing state found - run create, get, or list first",
          );
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const params: Record<string, string> = { project: projectId };
        const existingName = existing["name"]?.toString();
        if (existingName && existingName.includes("/")) {
          params["name"] = existingName;
        } else {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            existingName ?? g["name"]?.toString() ?? "",
          );
        }
        const body: Record<string, unknown> = {};
        if (g["ruleSet"] !== undefined) body["ruleSet"] = g["ruleSet"];
        for (const key of Object.keys(existing)) {
          if (
            key === "fingerprint" || key === "labelFingerprint" ||
            key === "etag" || key.endsWith("Fingerprint")
          ) {
            body[key] = existing[key];
          }
        }
        const result = await updateResource(
          baseUrl,
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
      description: "Delete the ruleSets",
      arguments: z.object({
        identifier: z.string().describe("The name of the ruleSets"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const { existed } = await deleteResource(
          baseUrl,
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
      description: "Sync ruleSets state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific ruleSets by name (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error(
            "No existing state found - run create, get, or list first",
          );
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        try {
          const params: Record<string, string> = { project: projectId };
          const existingName = existing.name?.toString();
          if (existingName && existingName.includes("/")) {
            params["name"] = existingName;
          } else {
            const shortName = existingName ?? g["name"]?.toString();
            if (!shortName) throw new Error("No identifier found");
            params["name"] = buildResourceName(
              `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
              shortName,
            );
          }
          const result = await readResource(
            baseUrl,
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
      description: "List ruleSets resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "The maximum number of rule sets to return. The service may return fewer than this value. If unspecified, at most 50 rule sets will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
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
          baseUrl,
          LIST_CONFIG,
          params,
          "ruleSets",
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
