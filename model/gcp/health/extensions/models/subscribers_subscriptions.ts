// Auto-generated extension model for @swamp/gcp/health/subscribers-subscriptions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Health Subscribers.Subscriptions.
 *
 * A subscription to a data collection for a specific user, to be delivered to a subscriber.
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
  readViaList,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://health.googleapis.com/";

const INSERT_CONFIG = {
  "id": "health.projects.subscribers.subscriptions.create",
  "path": "v4/{+parent}/subscriptions",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "subscriptionId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "health.projects.subscribers.subscriptions.patch",
  "path": "v4/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "health.projects.subscribers.subscriptions.delete",
  "path": "v4/{+name}",
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
  "id": "health.projects.subscribers.subscriptions.list",
  "path": "v4/{+parent}/subscriptions",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
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
  dataTypes: z.array(z.string()).describe(
    'Optional. Data types subscribed to. A subscriber will only receive notifications for data types that are declared here. A subscription can only subscribe to the data types of the subscriber. The values should be in the format "users/{health_user_id}/dataTypes/{data_type}" where `{data_type}` is one of "altitude", "distance", "floors", "sleep", "steps", "weight".',
  ).optional(),
  user: z.string().describe(
    "Immutable. The resource name of the user for whom this subscription is active. Format: `users/{user}` where `{user}` is the public `healthUserId` as returned by the `GetIdentity` action in the profile PAPI (see `google.devicesandservices.health.v4main.HealthProfileService.GetIdentity`).",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the Subscription. Format: `projects/{project}/subscribers/{subscriber}/subscriptions/{subscription}` Example: `projects/my-project/subscribers/my-subscriber-123/subscriptions/my-subscription-456` The {project} ID is mandatory (6-30 characters, matching /a-z{6,30}/) The {subscriber} ID is user-settable (4-36 characters, matching /[a-z]([a-z0-9-]{2,34}[a-z0-9])/) if provided during creation, or system-generated otherwise. The {subscription} ID is user-settable (4-36 chars, matching /[a-z]([a-z0-9-]{2,34}[a-z0-9])/) or system-generated otherwise.",
  ).optional(),
  subscriptionId: z.string().describe(
    "Optional. The {subscription_id} is user-settable (4-36 chars, matching /[a-z]([a-z0-9-]{2,34}[a-z0-9])/) or system-generated otherwise. If provided, the ID must be unique within the parent subscriber.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  dataTypes: z.array(z.string()).optional(),
  name: z.string(),
  user: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  dataTypes: z.array(z.string()).describe(
    'Optional. Data types subscribed to. A subscriber will only receive notifications for data types that are declared here. A subscription can only subscribe to the data types of the subscriber. The values should be in the format "users/{health_user_id}/dataTypes/{data_type}" where `{data_type}` is one of "altitude", "distance", "floors", "sleep", "steps", "weight".',
  ).optional(),
  user: z.string().describe(
    "Immutable. The resource name of the user for whom this subscription is active. Format: `users/{user}` where `{user}` is the public `healthUserId` as returned by the `GetIdentity` action in the profile PAPI (see `google.devicesandservices.health.v4main.HealthProfileService.GetIdentity`).",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the Subscription. Format: `projects/{project}/subscribers/{subscriber}/subscriptions/{subscription}` Example: `projects/my-project/subscribers/my-subscriber-123/subscriptions/my-subscription-456` The {project} ID is mandatory (6-30 characters, matching /a-z{6,30}/) The {subscriber} ID is user-settable (4-36 characters, matching /[a-z]([a-z0-9-]{2,34}[a-z0-9])/) if provided during creation, or system-generated otherwise. The {subscription} ID is user-settable (4-36 chars, matching /[a-z]([a-z0-9-]{2,34}[a-z0-9])/) or system-generated otherwise.",
  ).optional(),
  subscriptionId: z.string().describe(
    "Optional. The {subscription_id} is user-settable (4-36 chars, matching /[a-z]([a-z0-9-]{2,34}[a-z0-9])/) or system-generated otherwise. If provided, the ID must be unique within the parent subscriber.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
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

/** Swamp extension model for Google Cloud Google Health Subscribers.Subscriptions. Registered at `@swamp/gcp/health/subscribers-subscriptions`. */
export const model = {
  type: "@swamp/gcp/health/subscribers-subscriptions",
  version: "2026.06.07.1",
  upgrades: [
    {
      toVersion: "2026.05.27.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
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
      description:
        "A subscription to a data collection for a specific user, to be delivered to a...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a subscriptions",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["dataTypes"] !== undefined) body["dataTypes"] = g["dataTypes"];
        if (g["user"] !== undefined) body["user"] = g["user"];
        if (g["subscriptionId"] !== undefined) {
          body["subscriptionId"] = g["subscriptionId"];
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          undefined,
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
      description: "Get a subscriptions",
      arguments: z.object({
        identifier: z.string().describe("The name of the subscriptions"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const result = await readViaList(
          BASE_URL,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
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
      description: "Update subscriptions attributes",
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
        params["name"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["dataTypes"] !== undefined) body["dataTypes"] = g["dataTypes"];
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
          undefined,
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
      description: "Delete the subscriptions",
      arguments: z.object({
        identifier: z.string().describe("The name of the subscriptions"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = args.identifier;
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
      description: "Sync subscriptions state from GCP",
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
          if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
          else if (existing["parent"]) {
            params["parent"] = String(existing["parent"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          const result = await readViaList(
            BASE_URL,
            LIST_CONFIG,
            params,
            "name",
            identifier,
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
      description: "List subscriptions resources",
      arguments: z.object({
        filter: z.string().describe(
          'Optional. A filter to apply to the list of subscriptions. The filter syntax is described in https://google.aip.dev/160. The filter can be applied to the following fields: - `user` - `data_type` The `user` identifier (e.g., `user1` in `users/user1`) refers to the public `health_user_id` Example: user = "users/user1" Example: user = "users/user1" OR user = "users/user2" Example: user = "users/user1" AND (data_type = "sleep" OR data_type = "weight")',
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The maximum number of subscriptions to return. The service may return fewer than this value. If unspecified, at most 50 subscriptions will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "subscriptions",
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
