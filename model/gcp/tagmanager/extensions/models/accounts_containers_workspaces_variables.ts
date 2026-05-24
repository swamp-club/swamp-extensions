// Auto-generated extension model for @swamp/gcp/tagmanager/accounts-containers-workspaces-variables
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Tag Manager Accounts.Containers.Workspaces.Variables.
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
  getProjectId,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://tagmanager.googleapis.com/";

const GET_CONFIG = {
  "id": "tagmanager.accounts.containers.workspaces.variables.get",
  "path": "tagmanager/v2/{+path}",
  "httpMethod": "GET",
  "parameterOrder": [
    "path",
  ],
  "parameters": {
    "path": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "tagmanager.accounts.containers.workspaces.variables.create",
  "path": "tagmanager/v2/{+parent}/variables",
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

const UPDATE_CONFIG = {
  "id": "tagmanager.accounts.containers.workspaces.variables.update",
  "path": "tagmanager/v2/{+path}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "path",
  ],
  "parameters": {
    "fingerprint": {
      "location": "query",
    },
    "path": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "tagmanager.accounts.containers.workspaces.variables.delete",
  "path": "tagmanager/v2/{+path}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "path",
  ],
  "parameters": {
    "path": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "tagmanager.accounts.containers.workspaces.variables.list",
  "path": "tagmanager/v2/{+parent}/variables",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
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
  formatValue: z.object({
    caseConversionType: z.enum(["none", "lowercase", "uppercase"]).describe(
      "The option to convert a string-type variable value to either lowercase or uppercase.",
    ).optional(),
    convertFalseToValue: z.object({
      isWeakReference: z.boolean().describe(
        "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
      ).optional(),
      key: z.string().describe(
        "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
      ).optional(),
      list: z.array(z.string()).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.string()).describe(
        "This map parameter's parameters (must have keys; keys must be unique).",
      ).optional(),
      type: z.enum([
        "typeUnspecified",
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
    }).describe("Represents a Google Tag Manager Parameter.").optional(),
    convertNullToValue: z.object({
      isWeakReference: z.boolean().describe(
        "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
      ).optional(),
      key: z.string().describe(
        "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
      ).optional(),
      list: z.array(z.string()).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.string()).describe(
        "This map parameter's parameters (must have keys; keys must be unique).",
      ).optional(),
      type: z.enum([
        "typeUnspecified",
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
    }).describe("Represents a Google Tag Manager Parameter.").optional(),
    convertToBoolean: z.boolean().describe(
      "The option to convert a variable value to a boolean.",
    ).optional(),
    convertToNumber: z.enum([
      "decimalSeparatorTypeUnspecified",
      "period",
      "comma",
    ]).describe("The option to convert a variable value to a number.")
      .optional(),
    convertTrueToValue: z.object({
      isWeakReference: z.boolean().describe(
        "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
      ).optional(),
      key: z.string().describe(
        "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
      ).optional(),
      list: z.array(z.string()).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.string()).describe(
        "This map parameter's parameters (must have keys; keys must be unique).",
      ).optional(),
      type: z.enum([
        "typeUnspecified",
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
    }).describe("Represents a Google Tag Manager Parameter.").optional(),
    convertUndefinedToValue: z.object({
      isWeakReference: z.boolean().describe(
        "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
      ).optional(),
      key: z.string().describe(
        "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
      ).optional(),
      list: z.array(z.string()).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.string()).describe(
        "This map parameter's parameters (must have keys; keys must be unique).",
      ).optional(),
      type: z.enum([
        "typeUnspecified",
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
    }).describe("Represents a Google Tag Manager Parameter.").optional(),
  }).optional(),
  name: z.string().describe("Variable display name.").optional(),
  notes: z.string().describe(
    "User notes on how to apply this variable in the container.",
  ).optional(),
  parameter: z.array(z.object({
    isWeakReference: z.boolean().describe(
      "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
    ).optional(),
    key: z.string().describe(
      "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
    ).optional(),
    list: z.array(z.string()).describe(
      "This list parameter's parameters (keys will be ignored).",
    ).optional(),
    map: z.array(z.string()).describe(
      "This map parameter's parameters (must have keys; keys must be unique).",
    ).optional(),
    type: z.enum([
      "typeUnspecified",
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
  path: z.string().describe("GTM Variable's API relative path.").optional(),
  scheduleEndMs: z.string().describe(
    "The end timestamp in milliseconds to schedule a variable.",
  ).optional(),
  scheduleStartMs: z.string().describe(
    "The start timestamp in milliseconds to schedule a variable.",
  ).optional(),
  tagManagerUrl: z.string().describe(
    "Auto generated link to the tag manager UI",
  ).optional(),
  type: z.string().describe("GTM Variable Type.").optional(),
  variableId: z.string().describe(
    "The Variable ID uniquely identifies the GTM Variable.",
  ).optional(),
  workspaceId: z.string().describe("GTM Workspace ID.").optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  accountId: z.string().optional(),
  containerId: z.string().optional(),
  disablingTriggerId: z.array(z.string()).optional(),
  enablingTriggerId: z.array(z.string()).optional(),
  fingerprint: z.string().optional(),
  formatValue: z.object({
    caseConversionType: z.string(),
    convertFalseToValue: z.object({
      isWeakReference: z.boolean(),
      key: z.string(),
      list: z.array(z.string()),
      map: z.array(z.string()),
      type: z.string(),
      value: z.string(),
    }),
    convertNullToValue: z.object({
      isWeakReference: z.boolean(),
      key: z.string(),
      list: z.array(z.string()),
      map: z.array(z.string()),
      type: z.string(),
      value: z.string(),
    }),
    convertToBoolean: z.boolean(),
    convertToNumber: z.string(),
    convertTrueToValue: z.object({
      isWeakReference: z.boolean(),
      key: z.string(),
      list: z.array(z.string()),
      map: z.array(z.string()),
      type: z.string(),
      value: z.string(),
    }),
    convertUndefinedToValue: z.object({
      isWeakReference: z.boolean(),
      key: z.string(),
      list: z.array(z.string()),
      map: z.array(z.string()),
      type: z.string(),
      value: z.string(),
    }),
  }).optional(),
  name: z.string(),
  notes: z.string().optional(),
  parameter: z.array(z.object({
    isWeakReference: z.boolean(),
    key: z.string(),
    list: z.array(z.string()),
    map: z.array(z.string()),
    type: z.string(),
    value: z.string(),
  })).optional(),
  parentFolderId: z.string().optional(),
  path: z.string().optional(),
  scheduleEndMs: z.string().optional(),
  scheduleStartMs: z.string().optional(),
  tagManagerUrl: z.string().optional(),
  type: z.string().optional(),
  variableId: z.string().optional(),
  workspaceId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
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
  formatValue: z.object({
    caseConversionType: z.enum(["none", "lowercase", "uppercase"]).describe(
      "The option to convert a string-type variable value to either lowercase or uppercase.",
    ).optional(),
    convertFalseToValue: z.object({
      isWeakReference: z.boolean().describe(
        "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
      ).optional(),
      key: z.string().describe(
        "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
      ).optional(),
      list: z.array(z.string()).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.string()).describe(
        "This map parameter's parameters (must have keys; keys must be unique).",
      ).optional(),
      type: z.enum([
        "typeUnspecified",
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
    }).describe("Represents a Google Tag Manager Parameter.").optional(),
    convertNullToValue: z.object({
      isWeakReference: z.boolean().describe(
        "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
      ).optional(),
      key: z.string().describe(
        "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
      ).optional(),
      list: z.array(z.string()).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.string()).describe(
        "This map parameter's parameters (must have keys; keys must be unique).",
      ).optional(),
      type: z.enum([
        "typeUnspecified",
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
    }).describe("Represents a Google Tag Manager Parameter.").optional(),
    convertToBoolean: z.boolean().describe(
      "The option to convert a variable value to a boolean.",
    ).optional(),
    convertToNumber: z.enum([
      "decimalSeparatorTypeUnspecified",
      "period",
      "comma",
    ]).describe("The option to convert a variable value to a number.")
      .optional(),
    convertTrueToValue: z.object({
      isWeakReference: z.boolean().describe(
        "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
      ).optional(),
      key: z.string().describe(
        "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
      ).optional(),
      list: z.array(z.string()).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.string()).describe(
        "This map parameter's parameters (must have keys; keys must be unique).",
      ).optional(),
      type: z.enum([
        "typeUnspecified",
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
    }).describe("Represents a Google Tag Manager Parameter.").optional(),
    convertUndefinedToValue: z.object({
      isWeakReference: z.boolean().describe(
        "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
      ).optional(),
      key: z.string().describe(
        "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
      ).optional(),
      list: z.array(z.string()).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.string()).describe(
        "This map parameter's parameters (must have keys; keys must be unique).",
      ).optional(),
      type: z.enum([
        "typeUnspecified",
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
    }).describe("Represents a Google Tag Manager Parameter.").optional(),
  }).optional(),
  name: z.string().describe("Variable display name.").optional(),
  notes: z.string().describe(
    "User notes on how to apply this variable in the container.",
  ).optional(),
  parameter: z.array(z.object({
    isWeakReference: z.boolean().describe(
      "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
    ).optional(),
    key: z.string().describe(
      "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
    ).optional(),
    list: z.array(z.string()).describe(
      "This list parameter's parameters (keys will be ignored).",
    ).optional(),
    map: z.array(z.string()).describe(
      "This map parameter's parameters (must have keys; keys must be unique).",
    ).optional(),
    type: z.enum([
      "typeUnspecified",
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
  path: z.string().describe("GTM Variable's API relative path.").optional(),
  scheduleEndMs: z.string().describe(
    "The end timestamp in milliseconds to schedule a variable.",
  ).optional(),
  scheduleStartMs: z.string().describe(
    "The start timestamp in milliseconds to schedule a variable.",
  ).optional(),
  tagManagerUrl: z.string().describe(
    "Auto generated link to the tag manager UI",
  ).optional(),
  type: z.string().describe("GTM Variable Type.").optional(),
  variableId: z.string().describe(
    "The Variable ID uniquely identifies the GTM Variable.",
  ).optional(),
  workspaceId: z.string().describe("GTM Workspace ID.").optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Tag Manager Accounts.Containers.Workspaces.Variables. Registered at `@swamp/gcp/tagmanager/accounts-containers-workspaces-variables`. */
export const model = {
  type: "@swamp/gcp/tagmanager/accounts-containers-workspaces-variables",
  version: "2026.05.24.1",
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
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["accountId"] !== undefined) body["accountId"] = g["accountId"];
        if (g["containerId"] !== undefined) {
          body["containerId"] = g["containerId"];
        }
        if (g["disablingTriggerId"] !== undefined) {
          body["disablingTriggerId"] = g["disablingTriggerId"];
        }
        if (g["enablingTriggerId"] !== undefined) {
          body["enablingTriggerId"] = g["enablingTriggerId"];
        }
        if (g["fingerprint"] !== undefined) {
          body["fingerprint"] = g["fingerprint"];
        }
        if (g["formatValue"] !== undefined) {
          body["formatValue"] = g["formatValue"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["notes"] !== undefined) body["notes"] = g["notes"];
        if (g["parameter"] !== undefined) body["parameter"] = g["parameter"];
        if (g["parentFolderId"] !== undefined) {
          body["parentFolderId"] = g["parentFolderId"];
        }
        if (g["path"] !== undefined) body["path"] = g["path"];
        if (g["scheduleEndMs"] !== undefined) {
          body["scheduleEndMs"] = g["scheduleEndMs"];
        }
        if (g["scheduleStartMs"] !== undefined) {
          body["scheduleStartMs"] = g["scheduleStartMs"];
        }
        if (g["tagManagerUrl"] !== undefined) {
          body["tagManagerUrl"] = g["tagManagerUrl"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["variableId"] !== undefined) body["variableId"] = g["variableId"];
        if (g["workspaceId"] !== undefined) {
          body["workspaceId"] = g["workspaceId"];
        }
        if (g["name"] !== undefined) params["path"] = String(g["name"]);
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
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
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
      description: "Get a variables",
      arguments: z.object({
        identifier: z.string().describe("The name of the variables"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["path"] = args.identifier;
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
      description: "Update variables attributes",
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
        params["path"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["accountId"] !== undefined) body["accountId"] = g["accountId"];
        if (g["containerId"] !== undefined) {
          body["containerId"] = g["containerId"];
        }
        if (g["disablingTriggerId"] !== undefined) {
          body["disablingTriggerId"] = g["disablingTriggerId"];
        }
        if (g["enablingTriggerId"] !== undefined) {
          body["enablingTriggerId"] = g["enablingTriggerId"];
        }
        if (g["fingerprint"] !== undefined) {
          body["fingerprint"] = g["fingerprint"];
        }
        if (g["formatValue"] !== undefined) {
          body["formatValue"] = g["formatValue"];
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
        if (g["tagManagerUrl"] !== undefined) {
          body["tagManagerUrl"] = g["tagManagerUrl"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["variableId"] !== undefined) body["variableId"] = g["variableId"];
        if (g["workspaceId"] !== undefined) {
          body["workspaceId"] = g["workspaceId"];
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
      description: "Delete the variables",
      arguments: z.object({
        identifier: z.string().describe("The name of the variables"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["path"] = args.identifier;
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
      description: "Sync variables state from GCP",
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
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["path"] = identifier;
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
    revert: {
      description: "revert",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["path"] !== undefined) params["path"] = String(g["path"]);
        const result = await createResource(
          BASE_URL,
          {
            "id": "tagmanager.accounts.containers.workspaces.variables.revert",
            "path": "tagmanager/v2/{+path}:revert",
            "httpMethod": "POST",
            "parameterOrder": ["path"],
            "parameters": {
              "fingerprint": { "location": "query" },
              "path": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
  },
};
