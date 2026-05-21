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
  getProjectId,
  isResourceNotFoundError,
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
          'An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). **JSON example:** ` { "bindings": [ { "role": "roles/resourcemanager.organizationAdmin", "members": [ "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com" ] }, { "role": "roles/resourcemanager.organizationViewer", "members": [ "user:eve@example.com" ], "condition": { "title": "expirable access", "description": "Does not grant access after Sep 2020", "expression": "request.time < timestamp(\'2020-10-01T00:00:00.000Z\')", } } ], "etag": "BwWWja0YfJA=", "version": 3 } ` **YAML example:** ` bindings: - members: - user:mike@example.com - group:admins@example.com - domain:google.com - serviceAccount:my-project-id@appspot.gserviceaccount.com role: roles/resourcemanager.organizationAdmin - members: - user:eve@example.com role: roles/resourcemanager.organizationViewer condition: title: expirable access description: Does not grant access after Sep 2020 expression: request.time < timestamp(\'2020-10-01T00:00:00.000Z\') etag: BwWWja0YfJA= version: 3 ` For a description of IAM and its features, see the [IAM documentation](https://cloud.google.com/iam/docs/).',
        ).optional(),
      }).describe(
        "Represents the action responsible for access control list management operations.",
      ).optional(),
      actionId: z.string().describe("ID of the action. Managed internally.")
        .optional(),
      addToFolder: z.object({
        folders: z.unknown().describe(
          "Names of the folder under which new document is to be added. Format: projects/{project_number}/locations/{location}/documents/{document_id}.",
        ).optional(),
      }).describe(
        "Represents the action responsible for adding document under a folder.",
      ).optional(),
      dataUpdate: z.object({
        entries: z.unknown().describe(
          'Map of (K, V) -> (valid name of the field, new value of the field) E.g., ("age", "60") entry triggers update of field age with a value of 60. If the field is not present then new entry is added. During update action execution, value strings will be casted to appropriate types.',
        ).optional(),
      }).describe(
        "Represents the action responsible for properties update operations.",
      ).optional(),
      dataValidation: z.object({
        conditions: z.unknown().describe(
          'Map of (K, V) -> (field, string condition to be evaluated on the field) E.g., ("age", "age > 18 && age < 60") entry triggers validation of field age with the given condition. Map entries will be ANDed during validation.',
        ).optional(),
      }).describe(
        "Represents the action responsible for data validation operations.",
      ).optional(),
      deleteDocumentAction: z.object({
        enableHardDelete: z.unknown().describe(
          "Boolean field to select between hard vs soft delete options. Set 'true' for 'hard delete' and 'false' for 'soft delete'.",
        ).optional(),
      }).describe(
        "Represents the action responsible for deleting the document.",
      ).optional(),
      publishToPubSub: z.object({
        messages: z.unknown().describe("Messages to be published.").optional(),
        topicId: z.unknown().describe(
          "The topic id in the Pub/Sub service for which messages will be published to.",
        ).optional(),
      }).describe(
        "Represents the action responsible for publishing messages to a Pub/Sub topic.",
      ).optional(),
      removeFromFolderAction: z.object({
        condition: z.unknown().describe(
          "Condition of the action to be executed.",
        ).optional(),
        folder: z.unknown().describe(
          "Name of the folder under which new document is to be added. Format: projects/{project_number}/locations/{location}/documents/{document_id}.",
        ).optional(),
      }).describe(
        "Represents the action responsible for remove a document from a specific folder.",
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
  ruleSet: z.object({
    description: z.string().describe("Short description of the rule-set.")
      .optional(),
    name: z.string().describe(
      "The resource name of the rule set. Managed internally. Format: projects/{project_number}/locations/{location}/ruleSet/{rule_set_id}. The name is ignored when creating a rule set.",
    ).optional(),
    rules: z.array(z.object({
      actions: z.array(z.object({
        accessControl: z.unknown().describe(
          "Represents the action responsible for access control list management operations.",
        ).optional(),
        actionId: z.unknown().describe("ID of the action. Managed internally.")
          .optional(),
        addToFolder: z.unknown().describe(
          "Represents the action responsible for adding document under a folder.",
        ).optional(),
        dataUpdate: z.unknown().describe(
          "Represents the action responsible for properties update operations.",
        ).optional(),
        dataValidation: z.unknown().describe(
          "Represents the action responsible for data validation operations.",
        ).optional(),
        deleteDocumentAction: z.unknown().describe(
          "Represents the action responsible for deleting the document.",
        ).optional(),
        publishToPubSub: z.unknown().describe(
          "Represents the action responsible for publishing messages to a Pub/Sub topic.",
        ).optional(),
        removeFromFolderAction: z.unknown().describe(
          "Represents the action responsible for remove a document from a specific folder.",
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
  }).describe("Represents a set of rules from a single customer.").optional(),
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
          'An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). **JSON example:** ` { "bindings": [ { "role": "roles/resourcemanager.organizationAdmin", "members": [ "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com" ] }, { "role": "roles/resourcemanager.organizationViewer", "members": [ "user:eve@example.com" ], "condition": { "title": "expirable access", "description": "Does not grant access after Sep 2020", "expression": "request.time < timestamp(\'2020-10-01T00:00:00.000Z\')", } } ], "etag": "BwWWja0YfJA=", "version": 3 } ` **YAML example:** ` bindings: - members: - user:mike@example.com - group:admins@example.com - domain:google.com - serviceAccount:my-project-id@appspot.gserviceaccount.com role: roles/resourcemanager.organizationAdmin - members: - user:eve@example.com role: roles/resourcemanager.organizationViewer condition: title: expirable access description: Does not grant access after Sep 2020 expression: request.time < timestamp(\'2020-10-01T00:00:00.000Z\') etag: BwWWja0YfJA= version: 3 ` For a description of IAM and its features, see the [IAM documentation](https://cloud.google.com/iam/docs/).',
        ).optional(),
      }).describe(
        "Represents the action responsible for access control list management operations.",
      ).optional(),
      actionId: z.string().describe("ID of the action. Managed internally.")
        .optional(),
      addToFolder: z.object({
        folders: z.unknown().describe(
          "Names of the folder under which new document is to be added. Format: projects/{project_number}/locations/{location}/documents/{document_id}.",
        ).optional(),
      }).describe(
        "Represents the action responsible for adding document under a folder.",
      ).optional(),
      dataUpdate: z.object({
        entries: z.unknown().describe(
          'Map of (K, V) -> (valid name of the field, new value of the field) E.g., ("age", "60") entry triggers update of field age with a value of 60. If the field is not present then new entry is added. During update action execution, value strings will be casted to appropriate types.',
        ).optional(),
      }).describe(
        "Represents the action responsible for properties update operations.",
      ).optional(),
      dataValidation: z.object({
        conditions: z.unknown().describe(
          'Map of (K, V) -> (field, string condition to be evaluated on the field) E.g., ("age", "age > 18 && age < 60") entry triggers validation of field age with the given condition. Map entries will be ANDed during validation.',
        ).optional(),
      }).describe(
        "Represents the action responsible for data validation operations.",
      ).optional(),
      deleteDocumentAction: z.object({
        enableHardDelete: z.unknown().describe(
          "Boolean field to select between hard vs soft delete options. Set 'true' for 'hard delete' and 'false' for 'soft delete'.",
        ).optional(),
      }).describe(
        "Represents the action responsible for deleting the document.",
      ).optional(),
      publishToPubSub: z.object({
        messages: z.unknown().describe("Messages to be published.").optional(),
        topicId: z.unknown().describe(
          "The topic id in the Pub/Sub service for which messages will be published to.",
        ).optional(),
      }).describe(
        "Represents the action responsible for publishing messages to a Pub/Sub topic.",
      ).optional(),
      removeFromFolderAction: z.object({
        condition: z.unknown().describe(
          "Condition of the action to be executed.",
        ).optional(),
        folder: z.unknown().describe(
          "Name of the folder under which new document is to be added. Format: projects/{project_number}/locations/{location}/documents/{document_id}.",
        ).optional(),
      }).describe(
        "Represents the action responsible for remove a document from a specific folder.",
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
  ruleSet: z.object({
    description: z.string().describe("Short description of the rule-set.")
      .optional(),
    name: z.string().describe(
      "The resource name of the rule set. Managed internally. Format: projects/{project_number}/locations/{location}/ruleSet/{rule_set_id}. The name is ignored when creating a rule set.",
    ).optional(),
    rules: z.array(z.object({
      actions: z.array(z.object({
        accessControl: z.unknown().describe(
          "Represents the action responsible for access control list management operations.",
        ).optional(),
        actionId: z.unknown().describe("ID of the action. Managed internally.")
          .optional(),
        addToFolder: z.unknown().describe(
          "Represents the action responsible for adding document under a folder.",
        ).optional(),
        dataUpdate: z.unknown().describe(
          "Represents the action responsible for properties update operations.",
        ).optional(),
        dataValidation: z.unknown().describe(
          "Represents the action responsible for data validation operations.",
        ).optional(),
        deleteDocumentAction: z.unknown().describe(
          "Represents the action responsible for deleting the document.",
        ).optional(),
        publishToPubSub: z.unknown().describe(
          "Represents the action responsible for publishing messages to a Pub/Sub topic.",
        ).optional(),
        removeFromFolderAction: z.unknown().describe(
          "Represents the action responsible for remove a document from a specific folder.",
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
  }).describe("Represents a set of rules from a single customer.").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Document AI Warehouse RuleSets. Registered at `@swamp/gcp/contentwarehouse/rulesets`. */
export const model = {
  type: "@swamp/gcp/contentwarehouse/rulesets",
  version: "2026.05.21.1",
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
        const projectId = await getProjectId();
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
      description: "Get a ruleSets",
      arguments: z.object({
        identifier: z.string().describe("The name of the ruleSets"),
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
      description: "Update ruleSets attributes",
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
      description: "Delete the ruleSets",
      arguments: z.object({
        identifier: z.string().describe("The name of the ruleSets"),
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
      description: "Sync ruleSets state from GCP",
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
