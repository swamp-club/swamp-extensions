// Auto-generated extension model for @swamp/gcp/connectors/connections-eventsubscriptions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Connectors Connections.EventSubscriptions.
 *
 * represents the Connector's EventSubscription resource
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
  return `${parent}/eventSubscriptions/${shortName}`;
}

const BASE_URL = "https://connectors.googleapis.com/";

const GET_CONFIG = {
  "id": "connectors.projects.locations.connections.eventSubscriptions.get",
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
  "id": "connectors.projects.locations.connections.eventSubscriptions.create",
  "path": "v1/{+parent}/eventSubscriptions",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "eventSubscriptionId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "connectors.projects.locations.connections.eventSubscriptions.patch",
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
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "connectors.projects.locations.connections.eventSubscriptions.delete",
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
  "id": "connectors.projects.locations.connections.eventSubscriptions.list",
  "path": "v1/{+parent}/eventSubscriptions",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "orderBy": {
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
  destinations: z.object({
    endpoint: z.object({
      endpointUri: z.string().describe("Optional. The URI of the Endpoint.")
        .optional(),
      headers: z.array(z.object({
        key: z.string().describe("Optional. Key of Header.").optional(),
        value: z.string().describe("Optional. Value of Header.").optional(),
      })).describe("Optional. List of Header to be added to the Endpoint.")
        .optional(),
    }).describe(
      "Endpoint message includes details of the Destination endpoint.",
    ).optional(),
    pubsub: z.object({
      attributes: z.record(z.string(), z.string()).describe(
        "Optional. Pub/Sub message attributes to be added to the Pub/Sub message.",
      ).optional(),
      configVariables: z.array(z.object({
        boolValue: z.boolean().describe("Optional. Value is a bool.")
          .optional(),
        encryptionKeyValue: z.object({
          kmsKeyName: z.unknown().describe(
            "Optional. The [KMS key name] with which the content of the Operation is encrypted. The expected format: `projects/*/locations/*/keyRings/*/cryptoKeys/*`. Will be empty string if google managed.",
          ).optional(),
          type: z.unknown().describe(
            "Optional. Specifies the type of the encryption key.",
          ).optional(),
        }).describe("Encryption Key value.").optional(),
        intValue: z.string().describe("Optional. Value is an integer")
          .optional(),
        key: z.string().describe("Optional. Key of the config variable.")
          .optional(),
        secretValue: z.object({
          secretVersion: z.unknown().describe(
            "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
          ).optional(),
        }).describe("Secret provides a reference to entries in Secret Manager.")
          .optional(),
        stringValue: z.string().describe("Optional. Value is a string.")
          .optional(),
      })).describe("Optional. Configuration for configuring the trigger")
        .optional(),
      projectId: z.string().describe(
        "Required. The project id which has the Pub/Sub topic.",
      ).optional(),
      topicId: z.string().describe(
        "Required. The topic id of the Pub/Sub topic.",
      ).optional(),
    }).describe(
      "Pub/Sub message includes details of the Destination Pub/Sub topic.",
    ).optional(),
    serviceAccount: z.string().describe(
      "Optional. Service account needed for runtime plane to trigger IP workflow.",
    ).optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "ENDPOINT", "GCS", "PUBSUB"]).describe(
      "Optional. type of the destination",
    ).optional(),
  }).describe(
    "Message for EventSubscription Destination to act on receiving an event",
  ).optional(),
  eventTypeId: z.string().describe(
    "Optional. Event type id of the event of current EventSubscription.",
  ).optional(),
  filter: z.string().describe(
    "Optional. Filter for the event subscription. Incoming events are filtered based on the filter expression.",
  ).optional(),
  jms: z.object({
    name: z.string().describe(
      "Optional. Name of the JMS source. i.e. queueName or topicName",
    ).optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "QUEUE", "TOPIC"]).describe(
      "Optional. Type of the JMS Source. i.e. Queue or Topic",
    ).optional(),
  }).describe("JMS message denotes the source of the event").optional(),
  name: z.string().describe(
    "Required. Identifier. Resource name of the EventSubscription. Format: projects/{project}/locations/{location}/connections/{connection}/eventSubscriptions/{event_subscription}",
  ).optional(),
  status: z.object({
    description: z.string().describe("Output only. Description of the state.")
      .optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "CREATING",
      "UPDATING",
      "ACTIVE",
      "SUSPENDED",
      "ERROR",
    ]).describe("Output only. State of Event Subscription resource.")
      .optional(),
  }).describe(
    "EventSubscription Status denotes the status of the EventSubscription resource.",
  ).optional(),
  subscriber: z.string().describe(
    "Optional. name of the Subscriber for the current EventSubscription.",
  ).optional(),
  subscriberLink: z.string().describe(
    "Optional. Link for Subscriber of the current EventSubscription.",
  ).optional(),
  triggerConfigVariables: z.array(z.object({
    boolValue: z.boolean().describe("Optional. Value is a bool.").optional(),
    encryptionKeyValue: z.object({
      kmsKeyName: z.string().describe(
        "Optional. The [KMS key name] with which the content of the Operation is encrypted. The expected format: `projects/*/locations/*/keyRings/*/cryptoKeys/*`. Will be empty string if google managed.",
      ).optional(),
      type: z.enum(["TYPE_UNSPECIFIED", "GOOGLE_MANAGED", "CUSTOMER_MANAGED"])
        .describe("Optional. Specifies the type of the encryption key.")
        .optional(),
    }).describe("Encryption Key value.").optional(),
    intValue: z.string().describe("Optional. Value is an integer").optional(),
    key: z.string().describe("Optional. Key of the config variable.")
      .optional(),
    secretValue: z.object({
      secretVersion: z.string().describe(
        "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
      ).optional(),
    }).describe("Secret provides a reference to entries in Secret Manager.")
      .optional(),
    stringValue: z.string().describe("Optional. Value is a string.").optional(),
  })).describe("Optional. Configuration for configuring the trigger")
    .optional(),
  eventSubscriptionId: z.string().describe(
    "Required. Identifier to assign to the Event Subscription. Must be unique within scope of the parent resource.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  destinations: z.object({
    endpoint: z.object({
      endpointUri: z.string(),
      headers: z.array(z.object({
        key: z.string(),
        value: z.string(),
      })),
    }),
    pubsub: z.object({
      attributes: z.record(z.string(), z.unknown()),
      configVariables: z.array(z.object({
        boolValue: z.boolean(),
        encryptionKeyValue: z.object({
          kmsKeyName: z.unknown(),
          type: z.unknown(),
        }),
        intValue: z.string(),
        key: z.string(),
        secretValue: z.object({
          secretVersion: z.unknown(),
        }),
        stringValue: z.string(),
      })),
      projectId: z.string(),
      topicId: z.string(),
    }),
    serviceAccount: z.string(),
    type: z.string(),
  }).optional(),
  eventTypeId: z.string().optional(),
  filter: z.string().optional(),
  jms: z.object({
    name: z.string(),
    type: z.string(),
  }).optional(),
  name: z.string(),
  status: z.object({
    description: z.string(),
    state: z.string(),
  }).optional(),
  subscriber: z.string().optional(),
  subscriberLink: z.string().optional(),
  triggerConfigVariables: z.array(z.object({
    boolValue: z.boolean(),
    encryptionKeyValue: z.object({
      kmsKeyName: z.string(),
      type: z.string(),
    }),
    intValue: z.string(),
    key: z.string(),
    secretValue: z.object({
      secretVersion: z.string(),
    }),
    stringValue: z.string(),
  })).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  destinations: z.object({
    endpoint: z.object({
      endpointUri: z.string().describe("Optional. The URI of the Endpoint.")
        .optional(),
      headers: z.array(z.object({
        key: z.string().describe("Optional. Key of Header.").optional(),
        value: z.string().describe("Optional. Value of Header.").optional(),
      })).describe("Optional. List of Header to be added to the Endpoint.")
        .optional(),
    }).describe(
      "Endpoint message includes details of the Destination endpoint.",
    ).optional(),
    pubsub: z.object({
      attributes: z.record(z.string(), z.string()).describe(
        "Optional. Pub/Sub message attributes to be added to the Pub/Sub message.",
      ).optional(),
      configVariables: z.array(z.object({
        boolValue: z.boolean().describe("Optional. Value is a bool.")
          .optional(),
        encryptionKeyValue: z.object({
          kmsKeyName: z.unknown().describe(
            "Optional. The [KMS key name] with which the content of the Operation is encrypted. The expected format: `projects/*/locations/*/keyRings/*/cryptoKeys/*`. Will be empty string if google managed.",
          ).optional(),
          type: z.unknown().describe(
            "Optional. Specifies the type of the encryption key.",
          ).optional(),
        }).describe("Encryption Key value.").optional(),
        intValue: z.string().describe("Optional. Value is an integer")
          .optional(),
        key: z.string().describe("Optional. Key of the config variable.")
          .optional(),
        secretValue: z.object({
          secretVersion: z.unknown().describe(
            "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
          ).optional(),
        }).describe("Secret provides a reference to entries in Secret Manager.")
          .optional(),
        stringValue: z.string().describe("Optional. Value is a string.")
          .optional(),
      })).describe("Optional. Configuration for configuring the trigger")
        .optional(),
      projectId: z.string().describe(
        "Required. The project id which has the Pub/Sub topic.",
      ).optional(),
      topicId: z.string().describe(
        "Required. The topic id of the Pub/Sub topic.",
      ).optional(),
    }).describe(
      "Pub/Sub message includes details of the Destination Pub/Sub topic.",
    ).optional(),
    serviceAccount: z.string().describe(
      "Optional. Service account needed for runtime plane to trigger IP workflow.",
    ).optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "ENDPOINT", "GCS", "PUBSUB"]).describe(
      "Optional. type of the destination",
    ).optional(),
  }).describe(
    "Message for EventSubscription Destination to act on receiving an event",
  ).optional(),
  eventTypeId: z.string().describe(
    "Optional. Event type id of the event of current EventSubscription.",
  ).optional(),
  filter: z.string().describe(
    "Optional. Filter for the event subscription. Incoming events are filtered based on the filter expression.",
  ).optional(),
  jms: z.object({
    name: z.string().describe(
      "Optional. Name of the JMS source. i.e. queueName or topicName",
    ).optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "QUEUE", "TOPIC"]).describe(
      "Optional. Type of the JMS Source. i.e. Queue or Topic",
    ).optional(),
  }).describe("JMS message denotes the source of the event").optional(),
  name: z.string().describe(
    "Required. Identifier. Resource name of the EventSubscription. Format: projects/{project}/locations/{location}/connections/{connection}/eventSubscriptions/{event_subscription}",
  ).optional(),
  status: z.object({
    description: z.string().describe("Output only. Description of the state.")
      .optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "CREATING",
      "UPDATING",
      "ACTIVE",
      "SUSPENDED",
      "ERROR",
    ]).describe("Output only. State of Event Subscription resource.")
      .optional(),
  }).describe(
    "EventSubscription Status denotes the status of the EventSubscription resource.",
  ).optional(),
  subscriber: z.string().describe(
    "Optional. name of the Subscriber for the current EventSubscription.",
  ).optional(),
  subscriberLink: z.string().describe(
    "Optional. Link for Subscriber of the current EventSubscription.",
  ).optional(),
  triggerConfigVariables: z.array(z.object({
    boolValue: z.boolean().describe("Optional. Value is a bool.").optional(),
    encryptionKeyValue: z.object({
      kmsKeyName: z.string().describe(
        "Optional. The [KMS key name] with which the content of the Operation is encrypted. The expected format: `projects/*/locations/*/keyRings/*/cryptoKeys/*`. Will be empty string if google managed.",
      ).optional(),
      type: z.enum(["TYPE_UNSPECIFIED", "GOOGLE_MANAGED", "CUSTOMER_MANAGED"])
        .describe("Optional. Specifies the type of the encryption key.")
        .optional(),
    }).describe("Encryption Key value.").optional(),
    intValue: z.string().describe("Optional. Value is an integer").optional(),
    key: z.string().describe("Optional. Key of the config variable.")
      .optional(),
    secretValue: z.object({
      secretVersion: z.string().describe(
        "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
      ).optional(),
    }).describe("Secret provides a reference to entries in Secret Manager.")
      .optional(),
    stringValue: z.string().describe("Optional. Value is a string.").optional(),
  })).describe("Optional. Configuration for configuring the trigger")
    .optional(),
  eventSubscriptionId: z.string().describe(
    "Required. Identifier to assign to the Event Subscription. Must be unique within scope of the parent resource.",
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

/** Swamp extension model for Google Cloud Connectors Connections.EventSubscriptions. Registered at `@swamp/gcp/connectors/connections-eventsubscriptions`. */
export const model = {
  type: "@swamp/gcp/connectors/connections-eventsubscriptions",
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
      description: "represents the Connector's EventSubscription resource",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a eventSubscriptions",
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
        if (g["destinations"] !== undefined) {
          body["destinations"] = g["destinations"];
        }
        if (g["eventTypeId"] !== undefined) {
          body["eventTypeId"] = g["eventTypeId"];
        }
        if (g["filter"] !== undefined) body["filter"] = g["filter"];
        if (g["jms"] !== undefined) body["jms"] = g["jms"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["subscriber"] !== undefined) body["subscriber"] = g["subscriber"];
        if (g["subscriberLink"] !== undefined) {
          body["subscriberLink"] = g["subscriberLink"];
        }
        if (g["triggerConfigVariables"] !== undefined) {
          body["triggerConfigVariables"] = g["triggerConfigVariables"];
        }
        if (g["eventSubscriptionId"] !== undefined) {
          body["eventSubscriptionId"] = g["eventSubscriptionId"];
        }
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
      description: "Get a eventSubscriptions",
      arguments: z.object({
        identifier: z.string().describe("The name of the eventSubscriptions"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
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
      description: "Update eventSubscriptions attributes",
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
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["destinations"] !== undefined) {
          body["destinations"] = g["destinations"];
        }
        if (g["eventTypeId"] !== undefined) {
          body["eventTypeId"] = g["eventTypeId"];
        }
        if (g["filter"] !== undefined) body["filter"] = g["filter"];
        if (g["jms"] !== undefined) body["jms"] = g["jms"];
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["subscriber"] !== undefined) body["subscriber"] = g["subscriber"];
        if (g["subscriberLink"] !== undefined) {
          body["subscriberLink"] = g["subscriberLink"];
        }
        if (g["triggerConfigVariables"] !== undefined) {
          body["triggerConfigVariables"] = g["triggerConfigVariables"];
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
      description: "Delete the eventSubscriptions",
      arguments: z.object({
        identifier: z.string().describe("The name of the eventSubscriptions"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
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
      description: "Sync eventSubscriptions state from GCP",
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
      description: "List eventSubscriptions resources",
      arguments: z.object({
        filter: z.string().describe("Filter.").optional(),
        orderBy: z.string().describe("Order by parameters.").optional(),
        pageSize: z.number().describe("Page size.").optional(),
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
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "eventSubscriptions",
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
    retry: {
      description: "retry",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "connectors.projects.locations.connections.eventSubscriptions.retry",
            "path": "v1/{+name}:retry",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
  },
};
