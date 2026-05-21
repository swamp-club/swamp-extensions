// Auto-generated extension model for @swamp/gcp/tagmanager/accounts-containers-workspaces-tags
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Tag Manager Accounts.Containers.Workspaces.Tags.
 *
 * Represents a Google Tag Manager Tag.
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
  "id": "tagmanager.accounts.containers.workspaces.tags.get",
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
  "id": "tagmanager.accounts.containers.workspaces.tags.create",
  "path": "tagmanager/v2/{+parent}/tags",
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
  "id": "tagmanager.accounts.containers.workspaces.tags.update",
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
  "id": "tagmanager.accounts.containers.workspaces.tags.delete",
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
  "id": "tagmanager.accounts.containers.workspaces.tags.list",
  "path": "tagmanager/v2/{+parent}/tags",
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
  blockingTriggerId: z.array(z.string()).describe(
    "Blocking trigger IDs. If any of the listed triggers evaluate to true, the tag will not fire.",
  ).optional(),
  consentSettings: z.object({
    consentStatus: z.enum(["notSet", "notNeeded", "needed"]).describe(
      "The tag's consent status. If set to NEEDED, the runtime will check that the consent types specified by the consent_type field have been granted.",
    ).optional(),
    consentType: z.object({
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
  containerId: z.string().describe("GTM Container ID.").optional(),
  fingerprint: z.string().describe(
    "The fingerprint of the GTM Tag as computed at storage time. This value is recomputed whenever the tag is modified.",
  ).optional(),
  firingTriggerId: z.array(z.string()).describe(
    "Firing trigger IDs. A tag will fire when any of the listed triggers are true and all of its blockingTriggerIds (if any specified) are false.",
  ).optional(),
  liveOnly: z.boolean().describe(
    "If set to true, this tag will only fire in the live environment (e.g. not in preview or debug mode).",
  ).optional(),
  monitoringMetadata: z.object({
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
  monitoringMetadataTagNameKey: z.string().describe(
    "If non-empty, then the tag display name will be included in the monitoring metadata map using the key specified.",
  ).optional(),
  name: z.string().describe("Tag display name.").optional(),
  notes: z.string().describe(
    "User notes on how to apply this tag in the container.",
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
  })).describe("The tag's parameters.").optional(),
  parentFolderId: z.string().describe("Parent folder id.").optional(),
  path: z.string().describe("GTM Tag's API relative path.").optional(),
  paused: z.boolean().describe(
    "Indicates whether the tag is paused, which prevents the tag from firing.",
  ).optional(),
  priority: z.object({
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
  scheduleEndMs: z.string().describe(
    "The end timestamp in milliseconds to schedule a tag.",
  ).optional(),
  scheduleStartMs: z.string().describe(
    "The start timestamp in milliseconds to schedule a tag.",
  ).optional(),
  setupTag: z.array(z.object({
    stopOnSetupFailure: z.boolean().describe(
      "If true, fire the main tag if and only if the setup tag fires successfully. If false, fire the main tag regardless of setup tag firing status.",
    ).optional(),
    tagName: z.string().describe("The name of the setup tag.").optional(),
  })).describe("The list of setup tags. Currently we only allow one.")
    .optional(),
  tagFiringOption: z.enum([
    "tagFiringOptionUnspecified",
    "unlimited",
    "oncePerEvent",
    "oncePerLoad",
  ]).describe("Option to fire this tag.").optional(),
  tagId: z.string().describe("The Tag ID uniquely identifies the GTM Tag.")
    .optional(),
  tagManagerUrl: z.string().describe(
    "Auto generated link to the tag manager UI",
  ).optional(),
  teardownTag: z.array(z.object({
    stopTeardownOnFailure: z.boolean().describe(
      "If true, fire the teardown tag if and only if the main tag fires successfully. If false, fire the teardown tag regardless of main tag firing status.",
    ).optional(),
    tagName: z.string().describe("The name of the teardown tag.").optional(),
  })).describe("The list of teardown tags. Currently we only allow one.")
    .optional(),
  type: z.string().describe("GTM Tag Type.").optional(),
  workspaceId: z.string().describe("GTM Workspace ID.").optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  accountId: z.string().optional(),
  blockingTriggerId: z.array(z.string()).optional(),
  consentSettings: z.object({
    consentStatus: z.string(),
    consentType: z.object({
      isWeakReference: z.boolean(),
      key: z.string(),
      list: z.array(z.string()),
      map: z.array(z.string()),
      type: z.string(),
      value: z.string(),
    }),
  }).optional(),
  containerId: z.string().optional(),
  fingerprint: z.string().optional(),
  firingTriggerId: z.array(z.string()).optional(),
  liveOnly: z.boolean().optional(),
  monitoringMetadata: z.object({
    isWeakReference: z.boolean(),
    key: z.string(),
    list: z.array(z.string()),
    map: z.array(z.string()),
    type: z.string(),
    value: z.string(),
  }).optional(),
  monitoringMetadataTagNameKey: z.string().optional(),
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
  paused: z.boolean().optional(),
  priority: z.object({
    isWeakReference: z.boolean(),
    key: z.string(),
    list: z.array(z.string()),
    map: z.array(z.string()),
    type: z.string(),
    value: z.string(),
  }).optional(),
  scheduleEndMs: z.string().optional(),
  scheduleStartMs: z.string().optional(),
  setupTag: z.array(z.object({
    stopOnSetupFailure: z.boolean(),
    tagName: z.string(),
  })).optional(),
  tagFiringOption: z.string().optional(),
  tagId: z.string().optional(),
  tagManagerUrl: z.string().optional(),
  teardownTag: z.array(z.object({
    stopTeardownOnFailure: z.boolean(),
    tagName: z.string(),
  })).optional(),
  type: z.string().optional(),
  workspaceId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accountId: z.string().describe("GTM Account ID.").optional(),
  blockingTriggerId: z.array(z.string()).describe(
    "Blocking trigger IDs. If any of the listed triggers evaluate to true, the tag will not fire.",
  ).optional(),
  consentSettings: z.object({
    consentStatus: z.enum(["notSet", "notNeeded", "needed"]).describe(
      "The tag's consent status. If set to NEEDED, the runtime will check that the consent types specified by the consent_type field have been granted.",
    ).optional(),
    consentType: z.object({
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
  containerId: z.string().describe("GTM Container ID.").optional(),
  fingerprint: z.string().describe(
    "The fingerprint of the GTM Tag as computed at storage time. This value is recomputed whenever the tag is modified.",
  ).optional(),
  firingTriggerId: z.array(z.string()).describe(
    "Firing trigger IDs. A tag will fire when any of the listed triggers are true and all of its blockingTriggerIds (if any specified) are false.",
  ).optional(),
  liveOnly: z.boolean().describe(
    "If set to true, this tag will only fire in the live environment (e.g. not in preview or debug mode).",
  ).optional(),
  monitoringMetadata: z.object({
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
  monitoringMetadataTagNameKey: z.string().describe(
    "If non-empty, then the tag display name will be included in the monitoring metadata map using the key specified.",
  ).optional(),
  name: z.string().describe("Tag display name.").optional(),
  notes: z.string().describe(
    "User notes on how to apply this tag in the container.",
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
  })).describe("The tag's parameters.").optional(),
  parentFolderId: z.string().describe("Parent folder id.").optional(),
  path: z.string().describe("GTM Tag's API relative path.").optional(),
  paused: z.boolean().describe(
    "Indicates whether the tag is paused, which prevents the tag from firing.",
  ).optional(),
  priority: z.object({
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
  scheduleEndMs: z.string().describe(
    "The end timestamp in milliseconds to schedule a tag.",
  ).optional(),
  scheduleStartMs: z.string().describe(
    "The start timestamp in milliseconds to schedule a tag.",
  ).optional(),
  setupTag: z.array(z.object({
    stopOnSetupFailure: z.boolean().describe(
      "If true, fire the main tag if and only if the setup tag fires successfully. If false, fire the main tag regardless of setup tag firing status.",
    ).optional(),
    tagName: z.string().describe("The name of the setup tag.").optional(),
  })).describe("The list of setup tags. Currently we only allow one.")
    .optional(),
  tagFiringOption: z.enum([
    "tagFiringOptionUnspecified",
    "unlimited",
    "oncePerEvent",
    "oncePerLoad",
  ]).describe("Option to fire this tag.").optional(),
  tagId: z.string().describe("The Tag ID uniquely identifies the GTM Tag.")
    .optional(),
  tagManagerUrl: z.string().describe(
    "Auto generated link to the tag manager UI",
  ).optional(),
  teardownTag: z.array(z.object({
    stopTeardownOnFailure: z.boolean().describe(
      "If true, fire the teardown tag if and only if the main tag fires successfully. If false, fire the teardown tag regardless of main tag firing status.",
    ).optional(),
    tagName: z.string().describe("The name of the teardown tag.").optional(),
  })).describe("The list of teardown tags. Currently we only allow one.")
    .optional(),
  type: z.string().describe("GTM Tag Type.").optional(),
  workspaceId: z.string().describe("GTM Workspace ID.").optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Tag Manager Accounts.Containers.Workspaces.Tags. Registered at `@swamp/gcp/tagmanager/accounts-containers-workspaces-tags`. */
export const model = {
  type: "@swamp/gcp/tagmanager/accounts-containers-workspaces-tags",
  version: "2026.05.21.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Represents a Google Tag Manager Tag.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a tags",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["accountId"] !== undefined) body["accountId"] = g["accountId"];
        if (g["blockingTriggerId"] !== undefined) {
          body["blockingTriggerId"] = g["blockingTriggerId"];
        }
        if (g["consentSettings"] !== undefined) {
          body["consentSettings"] = g["consentSettings"];
        }
        if (g["containerId"] !== undefined) {
          body["containerId"] = g["containerId"];
        }
        if (g["fingerprint"] !== undefined) {
          body["fingerprint"] = g["fingerprint"];
        }
        if (g["firingTriggerId"] !== undefined) {
          body["firingTriggerId"] = g["firingTriggerId"];
        }
        if (g["liveOnly"] !== undefined) body["liveOnly"] = g["liveOnly"];
        if (g["monitoringMetadata"] !== undefined) {
          body["monitoringMetadata"] = g["monitoringMetadata"];
        }
        if (g["monitoringMetadataTagNameKey"] !== undefined) {
          body["monitoringMetadataTagNameKey"] =
            g["monitoringMetadataTagNameKey"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["notes"] !== undefined) body["notes"] = g["notes"];
        if (g["parameter"] !== undefined) body["parameter"] = g["parameter"];
        if (g["parentFolderId"] !== undefined) {
          body["parentFolderId"] = g["parentFolderId"];
        }
        if (g["path"] !== undefined) body["path"] = g["path"];
        if (g["paused"] !== undefined) body["paused"] = g["paused"];
        if (g["priority"] !== undefined) body["priority"] = g["priority"];
        if (g["scheduleEndMs"] !== undefined) {
          body["scheduleEndMs"] = g["scheduleEndMs"];
        }
        if (g["scheduleStartMs"] !== undefined) {
          body["scheduleStartMs"] = g["scheduleStartMs"];
        }
        if (g["setupTag"] !== undefined) body["setupTag"] = g["setupTag"];
        if (g["tagFiringOption"] !== undefined) {
          body["tagFiringOption"] = g["tagFiringOption"];
        }
        if (g["tagId"] !== undefined) body["tagId"] = g["tagId"];
        if (g["tagManagerUrl"] !== undefined) {
          body["tagManagerUrl"] = g["tagManagerUrl"];
        }
        if (g["teardownTag"] !== undefined) {
          body["teardownTag"] = g["teardownTag"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
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
      description: "Get a tags",
      arguments: z.object({
        identifier: z.string().describe("The name of the tags"),
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
      description: "Update tags attributes",
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
        if (g["blockingTriggerId"] !== undefined) {
          body["blockingTriggerId"] = g["blockingTriggerId"];
        }
        if (g["consentSettings"] !== undefined) {
          body["consentSettings"] = g["consentSettings"];
        }
        if (g["containerId"] !== undefined) {
          body["containerId"] = g["containerId"];
        }
        if (g["fingerprint"] !== undefined) {
          body["fingerprint"] = g["fingerprint"];
        }
        if (g["firingTriggerId"] !== undefined) {
          body["firingTriggerId"] = g["firingTriggerId"];
        }
        if (g["liveOnly"] !== undefined) body["liveOnly"] = g["liveOnly"];
        if (g["monitoringMetadata"] !== undefined) {
          body["monitoringMetadata"] = g["monitoringMetadata"];
        }
        if (g["monitoringMetadataTagNameKey"] !== undefined) {
          body["monitoringMetadataTagNameKey"] =
            g["monitoringMetadataTagNameKey"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["notes"] !== undefined) body["notes"] = g["notes"];
        if (g["parameter"] !== undefined) body["parameter"] = g["parameter"];
        if (g["parentFolderId"] !== undefined) {
          body["parentFolderId"] = g["parentFolderId"];
        }
        if (g["paused"] !== undefined) body["paused"] = g["paused"];
        if (g["priority"] !== undefined) body["priority"] = g["priority"];
        if (g["scheduleEndMs"] !== undefined) {
          body["scheduleEndMs"] = g["scheduleEndMs"];
        }
        if (g["scheduleStartMs"] !== undefined) {
          body["scheduleStartMs"] = g["scheduleStartMs"];
        }
        if (g["setupTag"] !== undefined) body["setupTag"] = g["setupTag"];
        if (g["tagFiringOption"] !== undefined) {
          body["tagFiringOption"] = g["tagFiringOption"];
        }
        if (g["tagId"] !== undefined) body["tagId"] = g["tagId"];
        if (g["tagManagerUrl"] !== undefined) {
          body["tagManagerUrl"] = g["tagManagerUrl"];
        }
        if (g["teardownTag"] !== undefined) {
          body["teardownTag"] = g["teardownTag"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
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
      description: "Delete the tags",
      arguments: z.object({
        identifier: z.string().describe("The name of the tags"),
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
      description: "Sync tags state from GCP",
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
            "id": "tagmanager.accounts.containers.workspaces.tags.revert",
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
