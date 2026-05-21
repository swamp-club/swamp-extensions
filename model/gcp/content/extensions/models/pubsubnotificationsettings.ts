// Auto-generated extension model for @swamp/gcp/content/pubsubnotificationsettings
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Content for Shopping Pubsubnotificationsettings.
 *
 * Settings for Pub/Sub notifications, all methods require that the caller is a direct user of the merchant center account.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  getProjectId,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://shoppingcontent.googleapis.com/content/v2.1/";

const GET_CONFIG = {
  "id": "content.pubsubnotificationsettings.get",
  "path": "{merchantId}/pubsubnotificationsettings",
  "httpMethod": "GET",
  "parameterOrder": [
    "merchantId",
  ],
  "parameters": {
    "merchantId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "content.pubsubnotificationsettings.update",
  "path": "{merchantId}/pubsubnotificationsettings",
  "httpMethod": "PUT",
  "parameterOrder": [
    "merchantId",
  ],
  "parameters": {
    "merchantId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  cloudTopicName: z.string().describe(
    "Cloud pub/sub topic to which notifications are sent (read-only).",
  ).optional(),
  kind: z.string().describe(
    'Identifies what kind of resource this is. Value: the fixed string "`content#pubsubNotificationSettings`"',
  ).optional(),
  registeredEvents: z.array(z.string()).describe(
    'List of event types. Acceptable values are: - "`orderPendingShipment`"',
  ).optional(),
});

const StateSchema = z.object({
  cloudTopicName: z.string().optional(),
  kind: z.string().optional(),
  registeredEvents: z.array(z.string()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  cloudTopicName: z.string().describe(
    "Cloud pub/sub topic to which notifications are sent (read-only).",
  ).optional(),
  kind: z.string().describe(
    'Identifies what kind of resource this is. Value: the fixed string "`content#pubsubNotificationSettings`"',
  ).optional(),
  registeredEvents: z.array(z.string()).describe(
    'List of event types. Acceptable values are: - "`orderPendingShipment`"',
  ).optional(),
});

/** Swamp extension model for Google Cloud Content for Shopping Pubsubnotificationsettings. Registered at `@swamp/gcp/content/pubsubnotificationsettings`. */
export const model = {
  type: "@swamp/gcp/content/pubsubnotificationsettings",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Settings for Pub/Sub notifications, all methods require that the caller is a ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a pubsubnotificationsettings",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the pubsubnotificationsettings",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["merchantId"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? args.identifier).replace(
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
      description: "Update pubsubnotificationsettings attributes",
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
        params["merchantId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["cloudTopicName"] !== undefined) {
          body["cloudTopicName"] = g["cloudTopicName"];
        }
        if (g["kind"] !== undefined) body["kind"] = g["kind"];
        if (g["registeredEvents"] !== undefined) {
          body["registeredEvents"] = g["registeredEvents"];
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
      description: "Sync pubsubnotificationsettings state from GCP",
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
          params["merchantId"] = identifier;
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
