// Auto-generated extension model for @swamp/gcp/health/subscribers
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Health Subscribers.
 *
 * -- Resource Messages -- A subscriber receives notifications from Google Health API.
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
  readViaList,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://health.googleapis.com/";

const INSERT_CONFIG = {
  "id": "health.projects.subscribers.create",
  "path": "v4/{+parent}/subscribers",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "subscriberId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "health.projects.subscribers.patch",
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
  "id": "health.projects.subscribers.delete",
  "path": "v4/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "force": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "health.projects.subscribers.list",
  "path": "v4/{+parent}/subscribers",
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
  endpointAuthorization: z.object({
    secret: z.string().describe(
      'Required. Input only. Provides a client-provided secret that will be sent with each notification to the subscriber endpoint using the "Authorization" header. The value must include the authorization scheme, e.g., "Bearer " or "Basic ", as it will be used as the full Authorization header value. This secret is used by the API to test the endpoint during `CreateSubscriber` and `UpdateSubscriber` calls, and will be sent in the `Authorization` header for all subsequent webhook notifications to this endpoint.',
    ).optional(),
    secretSet: z.boolean().describe("Output only. Whether the secret is set.")
      .optional(),
  }).describe(
    "Authorization mechanism for a subscriber endpoint. For all requests sent by the Webhooks service, the JSON payload is cryptographically signed. The signature is delivered in the `X-HEALTHAPI-SIGNATURE` HTTP header. This is an ECDSA (NIST P256) signature of the JSON payload. Clients must verify this signature using Google Health API's public key to confirm the payload was sent by the Health API.",
  ).optional(),
  endpointUri: z.string().describe(
    "Required. The full HTTPS URI where update notifications will be sent. The URI must be a valid URL and use HTTPS as the scheme. This endpoint will be verified during CreateSubscriber and UpdateSubscriber calls. See RPC documentation for verification details.",
  ).optional(),
  subscriberConfigs: z.array(z.object({
    dataTypes: z.array(z.string()).describe(
      "Required. See [Google Health API data types](https://developers.google.com/health/data-types) for the list of supported data types. Values should be in kebab-case.",
    ).optional(),
    subscriptionCreatePolicy: z.enum([
      "SUBSCRIPTION_CREATE_POLICY_UNSPECIFIED",
      "AUTOMATIC",
      "MANUAL",
    ]).describe("Required. Policy for subscription creation.").optional(),
  })).describe("Optional. Configuration for the subscriber.").optional(),
  createTime: z.string().describe(
    "Output only. The time at which the subscriber was created.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the Subscriber. Format: projects/{project}/subscribers/{subscriber} The {project} ID is a Google Cloud Project ID or Project Number. The {subscriber} ID is user-settable (4-36 characters, matching /[a-z]([a-z0-9-]{2,34}[a-z0-9])/) if provided during creation, or system-generated otherwise (e.g., a UUID). Example (User-settable subscriber ID): projects/my-project/subscribers/my-sub-123 Example (System-generated subscriber ID): projects/my-project/subscribers/a1b2c3d4-e5f6-7890-1234-567890abcdef",
  ).optional(),
  state: z.enum(["STATE_UNSPECIFIED", "UNVERIFIED", "ACTIVE", "INACTIVE"])
    .describe("Output only. The state of the subscriber.").optional(),
  updateTime: z.string().describe(
    "Output only. The time at which the subscriber was last updated.",
  ).optional(),
  subscriberId: z.string().describe(
    "Optional. The ID to use for the subscriber, which will become the final component of the subscriber's resource name. This value should be 4-36 characters, and valid characters are /[a-z]([a-z0-9-]{2,34}[a-z0-9])/.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  endpointAuthorization: z.object({
    secret: z.string(),
    secretSet: z.boolean(),
  }).optional(),
  endpointUri: z.string().optional(),
  name: z.string(),
  state: z.string().optional(),
  subscriberConfigs: z.array(z.object({
    dataTypes: z.array(z.string()),
    subscriptionCreatePolicy: z.string(),
  })).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  endpointAuthorization: z.object({
    secret: z.string().describe(
      'Required. Input only. Provides a client-provided secret that will be sent with each notification to the subscriber endpoint using the "Authorization" header. The value must include the authorization scheme, e.g., "Bearer " or "Basic ", as it will be used as the full Authorization header value. This secret is used by the API to test the endpoint during `CreateSubscriber` and `UpdateSubscriber` calls, and will be sent in the `Authorization` header for all subsequent webhook notifications to this endpoint.',
    ).optional(),
    secretSet: z.boolean().describe("Output only. Whether the secret is set.")
      .optional(),
  }).describe(
    "Authorization mechanism for a subscriber endpoint. For all requests sent by the Webhooks service, the JSON payload is cryptographically signed. The signature is delivered in the `X-HEALTHAPI-SIGNATURE` HTTP header. This is an ECDSA (NIST P256) signature of the JSON payload. Clients must verify this signature using Google Health API's public key to confirm the payload was sent by the Health API.",
  ).optional(),
  endpointUri: z.string().describe(
    "Required. The full HTTPS URI where update notifications will be sent. The URI must be a valid URL and use HTTPS as the scheme. This endpoint will be verified during CreateSubscriber and UpdateSubscriber calls. See RPC documentation for verification details.",
  ).optional(),
  subscriberConfigs: z.array(z.object({
    dataTypes: z.array(z.string()).describe(
      "Required. See [Google Health API data types](https://developers.google.com/health/data-types) for the list of supported data types. Values should be in kebab-case.",
    ).optional(),
    subscriptionCreatePolicy: z.enum([
      "SUBSCRIPTION_CREATE_POLICY_UNSPECIFIED",
      "AUTOMATIC",
      "MANUAL",
    ]).describe("Required. Policy for subscription creation.").optional(),
  })).describe("Optional. Configuration for the subscriber.").optional(),
  createTime: z.string().describe(
    "Output only. The time at which the subscriber was created.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the Subscriber. Format: projects/{project}/subscribers/{subscriber} The {project} ID is a Google Cloud Project ID or Project Number. The {subscriber} ID is user-settable (4-36 characters, matching /[a-z]([a-z0-9-]{2,34}[a-z0-9])/) if provided during creation, or system-generated otherwise (e.g., a UUID). Example (User-settable subscriber ID): projects/my-project/subscribers/my-sub-123 Example (System-generated subscriber ID): projects/my-project/subscribers/a1b2c3d4-e5f6-7890-1234-567890abcdef",
  ).optional(),
  state: z.enum(["STATE_UNSPECIFIED", "UNVERIFIED", "ACTIVE", "INACTIVE"])
    .describe("Output only. The state of the subscriber.").optional(),
  updateTime: z.string().describe(
    "Output only. The time at which the subscriber was last updated.",
  ).optional(),
  subscriberId: z.string().describe(
    "Optional. The ID to use for the subscriber, which will become the final component of the subscriber's resource name. This value should be 4-36 characters, and valid characters are /[a-z]([a-z0-9-]{2,34}[a-z0-9])/.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Google Health Subscribers. Registered at `@swamp/gcp/health/subscribers`. */
export const model = {
  type: "@swamp/gcp/health/subscribers",
  version: "2026.05.21.2",
  upgrades: [
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
      description:
        "-- Resource Messages -- A subscriber receives notifications from Google Healt...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a subscribers",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["endpointAuthorization"] !== undefined) {
          body["endpointAuthorization"] = g["endpointAuthorization"];
        }
        if (g["endpointUri"] !== undefined) {
          body["endpointUri"] = g["endpointUri"];
        }
        if (g["subscriberConfigs"] !== undefined) {
          body["subscriberConfigs"] = g["subscriberConfigs"];
        }
        if (g["subscriberId"] !== undefined) {
          body["subscriberId"] = g["subscriberId"];
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          undefined,
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": [],
            }
            : undefined,
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
      description: "Get a subscribers",
      arguments: z.object({
        identifier: z.string().describe("The name of the subscribers"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const result = await readViaList(
          BASE_URL,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
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
      description: "Update subscribers attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
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
        params["name"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["endpointAuthorization"] !== undefined) {
          body["endpointAuthorization"] = g["endpointAuthorization"];
        }
        if (g["endpointUri"] !== undefined) {
          body["endpointUri"] = g["endpointUri"];
        }
        if (g["subscriberConfigs"] !== undefined) {
          body["subscriberConfigs"] = g["subscriberConfigs"];
        }
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["updateTime"] !== undefined) body["updateTime"] = g["updateTime"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": [],
            }
            : undefined,
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
      description: "Delete the subscribers",
      arguments: z.object({
        identifier: z.string().describe("The name of the subscribers"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = args.identifier;
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
      description: "Sync subscribers state from GCP",
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
