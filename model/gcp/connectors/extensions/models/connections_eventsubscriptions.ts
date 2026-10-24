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

import { z } from "npm:zod@4.6.7";
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
  scopes: z.string().describe(
    "Comma-separated OAuth scopes to request when minting access tokens via gcloud. Defaults to the API's Discovery Document scopes.",
  ).optional(),
  quotaProject: z.string().describe(
    "GCP project ID for quota and billing attribution; sets the x-goog-user-project header. Overrides GOOGLE_CLOUD_QUOTA_PROJECT environment variable. Required for APIs like Cloud Identity when using user credentials.",
  ).optional(),
  apiEndpoint: z.string().describe(
    "Custom API endpoint for emulators; overrides GCP_API_ENDPOINT environment variable. Defaults to the service's production URL.",
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
    }).describe("OPTION 1: Hit an endpoint when we receive an event.")
      .optional(),
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
        }).describe("Optional. Value is a Encryption Key.").optional(),
        intValue: z.string().describe("Optional. Value is an integer")
          .optional(),
        key: z.string().describe("Optional. Key of the config variable.")
          .optional(),
        secretValue: z.object({
          secretVersion: z.unknown().describe(
            "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
          ).optional(),
        }).describe("Optional. Value is a secret.").optional(),
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
    }).describe("OPTION 3: Write the event to Pub/Sub topic.").optional(),
    serviceAccount: z.string().describe(
      "Optional. Service account needed for runtime plane to trigger IP workflow.",
    ).optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "ENDPOINT", "GCS", "PUBSUB"]).describe(
      "Optional. type of the destination",
    ).optional(),
  }).describe("Optional. The destination to hit when we receive an event")
    .optional(),
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
  }).describe("Optional. JMS is the source for the event listener.").optional(),
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
    "Optional. Status indicates the status of the event subscription resource",
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
    }).describe("Optional. Value is a Encryption Key.").optional(),
    intValue: z.string().describe("Optional. Value is an integer").optional(),
    key: z.string().describe("Optional. Key of the config variable.")
      .optional(),
    secretValue: z.object({
      secretVersion: z.string().describe(
        "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
      ).optional(),
    }).describe("Optional. Value is a secret.").optional(),
    stringValue: z.string().describe("Optional. Value is a string.").optional(),
  })).describe("Optional. Configuration for configuring the trigger")
    .optional(),
  eventSubscriptionId: z.string().describe(
    "Required. Identifier to assign to the Event Subscription. Must be unique within scope of the parent resource.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
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
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  destinations: z.object({
    endpoint: z.object({
      endpointUri: z.string().describe("Optional. The URI of the Endpoint.")
        .optional(),
      headers: z.array(z.object({
        key: z.string().describe("Optional. Key of Header.").optional(),
        value: z.string().describe("Optional. Value of Header.").optional(),
      })).describe("Optional. List of Header to be added to the Endpoint.")
        .optional(),
    }).describe("OPTION 1: Hit an endpoint when we receive an event.")
      .optional(),
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
        }).describe("Optional. Value is a Encryption Key.").optional(),
        intValue: z.string().describe("Optional. Value is an integer")
          .optional(),
        key: z.string().describe("Optional. Key of the config variable.")
          .optional(),
        secretValue: z.object({
          secretVersion: z.unknown().describe(
            "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
          ).optional(),
        }).describe("Optional. Value is a secret.").optional(),
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
    }).describe("OPTION 3: Write the event to Pub/Sub topic.").optional(),
    serviceAccount: z.string().describe(
      "Optional. Service account needed for runtime plane to trigger IP workflow.",
    ).optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "ENDPOINT", "GCS", "PUBSUB"]).describe(
      "Optional. type of the destination",
    ).optional(),
  }).describe("Optional. The destination to hit when we receive an event")
    .optional(),
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
  }).describe("Optional. JMS is the source for the event listener.").optional(),
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
    "Optional. Status indicates the status of the event subscription resource",
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
    }).describe("Optional. Value is a Encryption Key.").optional(),
    intValue: z.string().describe("Optional. Value is an integer").optional(),
    key: z.string().describe("Optional. Key of the config variable.")
      .optional(),
    secretValue: z.object({
      secretVersion: z.string().describe(
        "Optional. The resource name of the secret version in the format, format as: `projects/*/secrets/*/versions/*`.",
      ).optional(),
    }).describe("Optional. Value is a secret.").optional(),
    stringValue: z.string().describe("Optional. Value is a string.").optional(),
  })).describe("Optional. Configuration for configuring the trigger")
    .optional(),
  eventSubscriptionId: z.string().describe(
    "Required. Identifier to assign to the Event Subscription. Must be unique within scope of the parent resource.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
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

/** Swamp extension model for Google Cloud Connectors Connections.EventSubscriptions. Registered at `@swamp/gcp/connectors/connections-eventsubscriptions`. */
export const model = {
  type: "@swamp/gcp/connectors/connections-eventsubscriptions",
  version: "2026.10.23.1",
  upgrades: [
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
    {
      toVersion: "2026.10.23.1",
      description: "No schema changes",
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
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
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
          params["eventSubscriptionId"] = String(g["eventSubscriptionId"]);
        }
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
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
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
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
      description: "Get a eventSubscriptions",
      arguments: z.object({
        identifier: z.string().describe("The name of the eventSubscriptions"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
      description: "Update eventSubscriptions attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific eventSubscriptions by name (e.g. one discovered by list)",
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
            String(g["parent"] ?? ""),
            existingName ?? g["name"]?.toString() ?? "",
          );
        }
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
        const updateMaskKeys = Object.keys(body);
        if (updateMaskKeys.length > 0) {
          params["updateMask"] = updateMaskKeys.join(",");
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
      description: "Delete the eventSubscriptions",
      arguments: z.object({
        identifier: z.string().describe("The name of the eventSubscriptions"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
      description: "Sync eventSubscriptions state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific eventSubscriptions by name (e.g. one discovered by list)",
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
              String(g["parent"] ?? ""),
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
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
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
          baseUrl,
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
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          baseUrl,
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
