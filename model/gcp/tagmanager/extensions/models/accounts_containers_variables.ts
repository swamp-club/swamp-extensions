// Auto-generated extension model for @swamp/gcp/tagmanager/accounts-containers-variables
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Tag Manager Accounts.Containers.Variables.
 *
 * Represents a Google Tag Manager Variable.
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

const BASE_URL = "https://tagmanager.googleapis.com/";

const GET_CONFIG = {
  "id": "tagmanager.accounts.containers.variables.get",
  "path":
    "tagmanager/v1/accounts/{accountId}/containers/{containerId}/variables/{variableId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "accountId",
    "containerId",
    "variableId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "containerId": {
      "location": "path",
      "required": true,
    },
    "variableId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "tagmanager.accounts.containers.variables.create",
  "path":
    "tagmanager/v1/accounts/{accountId}/containers/{containerId}/variables",
  "httpMethod": "POST",
  "parameterOrder": [
    "accountId",
    "containerId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "containerId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "tagmanager.accounts.containers.variables.update",
  "path":
    "tagmanager/v1/accounts/{accountId}/containers/{containerId}/variables/{variableId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "accountId",
    "containerId",
    "variableId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "containerId": {
      "location": "path",
      "required": true,
    },
    "fingerprint": {
      "location": "query",
    },
    "variableId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "tagmanager.accounts.containers.variables.delete",
  "path":
    "tagmanager/v1/accounts/{accountId}/containers/{containerId}/variables/{variableId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "accountId",
    "containerId",
    "variableId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "containerId": {
      "location": "path",
      "required": true,
    },
    "variableId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "tagmanager.accounts.containers.variables.list",
  "path":
    "tagmanager/v1/accounts/{accountId}/containers/{containerId}/variables",
  "httpMethod": "GET",
  "parameterOrder": [
    "accountId",
    "containerId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "containerId": {
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
  accountId: z.string().describe("GTM Account ID.").optional(),
  containerId: z.string().describe("GTM Container ID.").optional(),
  disablingTriggerId: z.array(z.string()).describe(
    "For mobile containers only: A list of trigger IDs for disabling conditional variables; the variable is enabled if one of the enabling trigger is true while all the disabling trigger are false. Treated as an unordered set.",
  ).optional(),
  enablingTriggerId: z.array(z.string()).describe(
    "For mobile containers only: A list of trigger IDs for enabling conditional variables; the variable is enabled if one of the enabling triggers is true while all the disabling triggers are false. Treated as an unordered set.",
  ).optional(),
  fingerprint: z.string().describe(
    "The fingerprint of the GTM Variable as computed at storage time. This value is recomputed whenever the variable is modified.",
  ).optional(),
  name: z.string().describe("Variable display name.").optional(),
  notes: z.string().describe(
    "User notes on how to apply this variable in the container.",
  ).optional(),
  parameter: z.array(z.object({
    key: z.string().describe(
      "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
    ).optional(),
    list: z.array(z.record(z.string(), z.unknown())).describe(
      "This list parameter's parameters (keys will be ignored).",
    ).optional(),
    map: z.array(z.record(z.string(), z.unknown())).describe(
      "This map parameter's parameters (must have keys; keys must be unique).",
    ).optional(),
    type: z.enum([
      "template",
      "integer",
      "boolean",
      "list",
      "map",
      "triggerReference",
      "tagReference",
    ]).describe(
      "The parameter type. Valid values are: - boolean: The value represents a boolean, represented as 'true' or 'false' - integer: The value represents a 64-bit signed integer value, in base 10 - list: A list of parameters should be specified - map: A map of parameters should be specified - template: The value represents any text; this can include variable references (even variable references that might return non-string types) - trigger_reference: The value represents a trigger, represented as the trigger id - tag_reference: The value represents a tag, represented as the tag name",
    ).optional(),
    value: z.string().describe(
      "A parameter's value (may contain variable references). as appropriate to the specified type.",
    ).optional(),
  })).describe("The variable's parameters.").optional(),
  parentFolderId: z.string().describe("Parent folder id.").optional(),
  scheduleEndMs: z.string().describe(
    "The end timestamp in milliseconds to schedule a variable.",
  ).optional(),
  scheduleStartMs: z.string().describe(
    "The start timestamp in milliseconds to schedule a variable.",
  ).optional(),
  type: z.string().describe("GTM Variable Type.").optional(),
  variableId: z.string().describe(
    "The Variable ID uniquely identifies the GTM Variable.",
  ).optional(),
});

const StateSchema = z.object({
  accountId: z.string().optional(),
  containerId: z.string().optional(),
  disablingTriggerId: z.array(z.string()).optional(),
  enablingTriggerId: z.array(z.string()).optional(),
  fingerprint: z.string().optional(),
  name: z.string(),
  notes: z.string().optional(),
  parameter: z.array(z.object({
    key: z.string(),
    list: z.array(z.record(z.string(), z.unknown())),
    map: z.array(z.record(z.string(), z.unknown())),
    type: z.string(),
    value: z.string(),
  })).optional(),
  parentFolderId: z.string().optional(),
  scheduleEndMs: z.string().optional(),
  scheduleStartMs: z.string().optional(),
  type: z.string().optional(),
  variableId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  accountId: z.string().describe("GTM Account ID.").optional(),
  containerId: z.string().describe("GTM Container ID.").optional(),
  disablingTriggerId: z.array(z.string()).describe(
    "For mobile containers only: A list of trigger IDs for disabling conditional variables; the variable is enabled if one of the enabling trigger is true while all the disabling trigger are false. Treated as an unordered set.",
  ).optional(),
  enablingTriggerId: z.array(z.string()).describe(
    "For mobile containers only: A list of trigger IDs for enabling conditional variables; the variable is enabled if one of the enabling triggers is true while all the disabling triggers are false. Treated as an unordered set.",
  ).optional(),
  fingerprint: z.string().describe(
    "The fingerprint of the GTM Variable as computed at storage time. This value is recomputed whenever the variable is modified.",
  ).optional(),
  name: z.string().describe("Variable display name.").optional(),
  notes: z.string().describe(
    "User notes on how to apply this variable in the container.",
  ).optional(),
  parameter: z.array(z.object({
    key: z.string().describe(
      "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
    ).optional(),
    list: z.array(z.record(z.string(), z.unknown())).describe(
      "This list parameter's parameters (keys will be ignored).",
    ).optional(),
    map: z.array(z.record(z.string(), z.unknown())).describe(
      "This map parameter's parameters (must have keys; keys must be unique).",
    ).optional(),
    type: z.enum([
      "template",
      "integer",
      "boolean",
      "list",
      "map",
      "triggerReference",
      "tagReference",
    ]).describe(
      "The parameter type. Valid values are: - boolean: The value represents a boolean, represented as 'true' or 'false' - integer: The value represents a 64-bit signed integer value, in base 10 - list: A list of parameters should be specified - map: A map of parameters should be specified - template: The value represents any text; this can include variable references (even variable references that might return non-string types) - trigger_reference: The value represents a trigger, represented as the trigger id - tag_reference: The value represents a tag, represented as the tag name",
    ).optional(),
    value: z.string().describe(
      "A parameter's value (may contain variable references). as appropriate to the specified type.",
    ).optional(),
  })).describe("The variable's parameters.").optional(),
  parentFolderId: z.string().describe("Parent folder id.").optional(),
  scheduleEndMs: z.string().describe(
    "The end timestamp in milliseconds to schedule a variable.",
  ).optional(),
  scheduleStartMs: z.string().describe(
    "The start timestamp in milliseconds to schedule a variable.",
  ).optional(),
  type: z.string().describe("GTM Variable Type.").optional(),
  variableId: z.string().describe(
    "The Variable ID uniquely identifies the GTM Variable.",
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

/** Swamp extension model for Google Cloud Tag Manager Accounts.Containers.Variables. Registered at `@swamp/gcp/tagmanager/accounts-containers-variables`. */
export const model = {
  type: "@swamp/gcp/tagmanager/accounts-containers-variables",
  version: "2026.06.07.1",
  upgrades: [
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
      description: "Represents a Google Tag Manager Variable.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a variables",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
        if (g["containerId"] !== undefined) {
          params["containerId"] = String(g["containerId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["disablingTriggerId"] !== undefined) {
          body["disablingTriggerId"] = g["disablingTriggerId"];
        }
        if (g["enablingTriggerId"] !== undefined) {
          body["enablingTriggerId"] = g["enablingTriggerId"];
        }
        if (g["fingerprint"] !== undefined) {
          body["fingerprint"] = g["fingerprint"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["notes"] !== undefined) body["notes"] = g["notes"];
        if (g["parameter"] !== undefined) body["parameter"] = g["parameter"];
        if (g["parentFolderId"] !== undefined) {
          body["parentFolderId"] = g["parentFolderId"];
        }
        if (g["scheduleEndMs"] !== undefined) {
          body["scheduleEndMs"] = g["scheduleEndMs"];
        }
        if (g["scheduleStartMs"] !== undefined) {
          body["scheduleStartMs"] = g["scheduleStartMs"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["variableId"] !== undefined) body["variableId"] = g["variableId"];
        if (g["name"] !== undefined) params["variableId"] = String(g["name"]);
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
              "containerId": String(g["containerId"] ?? ""),
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
      description: "Get a variables",
      arguments: z.object({
        identifier: z.string().describe("The name of the variables"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
        if (g["containerId"] !== undefined) {
          params["containerId"] = String(g["containerId"]);
        }
        params["variableId"] = args.identifier;
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
      description: "Update variables attributes",
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
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        } else if (existing["accountId"]) {
          params["accountId"] = String(existing["accountId"]);
        }
        if (g["containerId"] !== undefined) {
          params["containerId"] = String(g["containerId"]);
        } else if (existing["containerId"]) {
          params["containerId"] = String(existing["containerId"]);
        }
        params["variableId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["disablingTriggerId"] !== undefined) {
          body["disablingTriggerId"] = g["disablingTriggerId"];
        }
        if (g["enablingTriggerId"] !== undefined) {
          body["enablingTriggerId"] = g["enablingTriggerId"];
        }
        if (g["fingerprint"] !== undefined) {
          body["fingerprint"] = g["fingerprint"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["notes"] !== undefined) body["notes"] = g["notes"];
        if (g["parameter"] !== undefined) body["parameter"] = g["parameter"];
        if (g["parentFolderId"] !== undefined) {
          body["parentFolderId"] = g["parentFolderId"];
        }
        if (g["scheduleEndMs"] !== undefined) {
          body["scheduleEndMs"] = g["scheduleEndMs"];
        }
        if (g["scheduleStartMs"] !== undefined) {
          body["scheduleStartMs"] = g["scheduleStartMs"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
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
      description: "Delete the variables",
      arguments: z.object({
        identifier: z.string().describe("The name of the variables"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
        if (g["containerId"] !== undefined) {
          params["containerId"] = String(g["containerId"]);
        }
        params["variableId"] = args.identifier;
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
      description: "Sync variables state from GCP",
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
          if (g["accountId"] !== undefined) {
            params["accountId"] = String(g["accountId"]);
          } else if (existing["accountId"]) {
            params["accountId"] = String(existing["accountId"]);
          }
          if (g["containerId"] !== undefined) {
            params["containerId"] = String(g["containerId"]);
          } else if (existing["containerId"]) {
            params["containerId"] = String(existing["containerId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["variableId"] = identifier;
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
      description: "List variables resources",
      arguments: z.object({
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
        if (g["containerId"] !== undefined) {
          params["containerId"] = String(g["containerId"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "variables",
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
