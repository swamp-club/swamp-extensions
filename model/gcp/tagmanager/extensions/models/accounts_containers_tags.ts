// Auto-generated extension model for @swamp/gcp/tagmanager/accounts-containers-tags
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Tag Manager Accounts.Containers.Tags.
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
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://tagmanager.googleapis.com/";

const GET_CONFIG = {
  "id": "tagmanager.accounts.containers.tags.get",
  "path":
    "tagmanager/v1/accounts/{accountId}/containers/{containerId}/tags/{tagId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "accountId",
    "containerId",
    "tagId",
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
    "tagId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "tagmanager.accounts.containers.tags.create",
  "path": "tagmanager/v1/accounts/{accountId}/containers/{containerId}/tags",
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
  "id": "tagmanager.accounts.containers.tags.update",
  "path":
    "tagmanager/v1/accounts/{accountId}/containers/{containerId}/tags/{tagId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "accountId",
    "containerId",
    "tagId",
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
    "tagId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "tagmanager.accounts.containers.tags.delete",
  "path":
    "tagmanager/v1/accounts/{accountId}/containers/{containerId}/tags/{tagId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "accountId",
    "containerId",
    "tagId",
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
    "tagId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "tagmanager.accounts.containers.tags.list",
  "path": "tagmanager/v1/accounts/{accountId}/containers/{containerId}/tags",
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
  accountId: z.string().describe("GTM Account ID.").optional(),
  blockingTriggerId: z.array(z.string()).describe(
    "Blocking trigger IDs. If any of the listed triggers evaluate to true, the tag will not fire.",
  ).optional(),
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
  name: z.string().describe("Tag display name.").optional(),
  notes: z.string().describe(
    "User notes on how to apply this tag in the container.",
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
  })).describe("The tag's parameters.").optional(),
  parentFolderId: z.string().describe("Parent folder id.").optional(),
  paused: z.boolean().describe("True if the tag is paused.").optional(),
  priority: z.object({
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
  tagFiringOption: z.enum(["unlimited", "oncePerEvent", "oncePerLoad"])
    .describe("Option to fire this tag.").optional(),
  tagId: z.string().describe("The Tag ID uniquely identifies the GTM Tag.")
    .optional(),
  teardownTag: z.array(z.object({
    stopTeardownOnFailure: z.boolean().describe(
      "If true, fire the teardown tag if and only if the main tag fires successfully. If false, fire the teardown tag regardless of main tag firing status.",
    ).optional(),
    tagName: z.string().describe("The name of the teardown tag.").optional(),
  })).describe("The list of teardown tags. Currently we only allow one.")
    .optional(),
  type: z.string().describe("GTM Tag Type.").optional(),
});

const StateSchema = z.object({
  accountId: z.string().optional(),
  blockingTriggerId: z.array(z.string()).optional(),
  containerId: z.string().optional(),
  fingerprint: z.string().optional(),
  firingTriggerId: z.array(z.string()).optional(),
  liveOnly: z.boolean().optional(),
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
  paused: z.boolean().optional(),
  priority: z.object({
    key: z.string(),
    list: z.array(z.record(z.string(), z.unknown())),
    map: z.array(z.record(z.string(), z.unknown())),
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
  teardownTag: z.array(z.object({
    stopTeardownOnFailure: z.boolean(),
    tagName: z.string(),
  })).optional(),
  type: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accountId: z.string().describe("GTM Account ID.").optional(),
  blockingTriggerId: z.array(z.string()).describe(
    "Blocking trigger IDs. If any of the listed triggers evaluate to true, the tag will not fire.",
  ).optional(),
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
  name: z.string().describe("Tag display name.").optional(),
  notes: z.string().describe(
    "User notes on how to apply this tag in the container.",
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
  })).describe("The tag's parameters.").optional(),
  parentFolderId: z.string().describe("Parent folder id.").optional(),
  paused: z.boolean().describe("True if the tag is paused.").optional(),
  priority: z.object({
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
  tagFiringOption: z.enum(["unlimited", "oncePerEvent", "oncePerLoad"])
    .describe("Option to fire this tag.").optional(),
  tagId: z.string().describe("The Tag ID uniquely identifies the GTM Tag.")
    .optional(),
  teardownTag: z.array(z.object({
    stopTeardownOnFailure: z.boolean().describe(
      "If true, fire the teardown tag if and only if the main tag fires successfully. If false, fire the teardown tag regardless of main tag firing status.",
    ).optional(),
    tagName: z.string().describe("The name of the teardown tag.").optional(),
  })).describe("The list of teardown tags. Currently we only allow one.")
    .optional(),
  type: z.string().describe("GTM Tag Type.").optional(),
});

/** Swamp extension model for Google Cloud Tag Manager Accounts.Containers.Tags. Registered at `@swamp/gcp/tagmanager/accounts-containers-tags`. */
export const model = {
  type: "@swamp/gcp/tagmanager/accounts-containers-tags",
  version: "2026.06.05.1",
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
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
        if (g["containerId"] !== undefined) {
          params["containerId"] = String(g["containerId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["blockingTriggerId"] !== undefined) {
          body["blockingTriggerId"] = g["blockingTriggerId"];
        }
        if (g["fingerprint"] !== undefined) {
          body["fingerprint"] = g["fingerprint"];
        }
        if (g["firingTriggerId"] !== undefined) {
          body["firingTriggerId"] = g["firingTriggerId"];
        }
        if (g["liveOnly"] !== undefined) body["liveOnly"] = g["liveOnly"];
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
        if (g["teardownTag"] !== undefined) {
          body["teardownTag"] = g["teardownTag"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["name"] !== undefined) params["tagId"] = String(g["name"]);
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
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
        if (g["containerId"] !== undefined) {
          params["containerId"] = String(g["containerId"]);
        }
        params["tagId"] = args.identifier;
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
        params["tagId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["blockingTriggerId"] !== undefined) {
          body["blockingTriggerId"] = g["blockingTriggerId"];
        }
        if (g["fingerprint"] !== undefined) {
          body["fingerprint"] = g["fingerprint"];
        }
        if (g["firingTriggerId"] !== undefined) {
          body["firingTriggerId"] = g["firingTriggerId"];
        }
        if (g["liveOnly"] !== undefined) body["liveOnly"] = g["liveOnly"];
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
        if (g["teardownTag"] !== undefined) {
          body["teardownTag"] = g["teardownTag"];
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
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
        if (g["containerId"] !== undefined) {
          params["containerId"] = String(g["containerId"]);
        }
        params["tagId"] = args.identifier;
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
          params["tagId"] = identifier;
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
      description: "List tags resources",
      arguments: z.object({
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
        if (g["containerId"] !== undefined) {
          params["containerId"] = String(g["containerId"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "tags",
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
