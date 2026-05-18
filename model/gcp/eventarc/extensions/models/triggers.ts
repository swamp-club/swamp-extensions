// Auto-generated extension model for @swamp/gcp/eventarc/triggers
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Eventarc Triggers.
 *
 * A representation of the trigger resource.
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
  return `${parent}/triggers/${shortName}`;
}

const BASE_URL = "https://eventarc.googleapis.com/";

const GET_CONFIG = {
  "id": "eventarc.projects.locations.triggers.get",
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
  "id": "eventarc.projects.locations.triggers.create",
  "path": "v1/{+parent}/triggers",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "triggerId": {
      "location": "query",
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "eventarc.projects.locations.triggers.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "allowMissing": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "eventarc.projects.locations.triggers.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "allowMissing": {
      "location": "query",
    },
    "etag": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  channel: z.string().describe(
    "Optional. The name of the channel associated with the trigger in `projects/{project}/locations/{location}/channels/{channel}` format. You must provide a channel to receive events from Eventarc SaaS partners.",
  ).optional(),
  destination: z.object({
    cloudFunction: z.string().describe(
      "The Cloud Function resource name. Cloud Functions V1 and V2 are supported. Format: `projects/{project}/locations/{location}/functions/{function}` This is a read-only field. Creating Cloud Functions V1/V2 triggers is only supported via the Cloud Functions product. An error will be returned if the user sets this value.",
    ).optional(),
    cloudRun: z.object({
      path: z.string().describe(
        'Optional. The relative path on the Cloud Run service the events should be sent to. The value must conform to the definition of a URI path segment (section 3.3 of RFC2396). Examples: "/route", "route", "route/subroute".',
      ).optional(),
      region: z.string().describe(
        "Required. The region the Cloud Run service is deployed in.",
      ).optional(),
      service: z.string().describe(
        "Required. The name of the Cloud Run service being addressed. See https://cloud.google.com/run/docs/reference/rest/v1/namespaces.services. Only services located in the same project as the trigger object can be addressed.",
      ).optional(),
    }).describe("Represents a Cloud Run destination.").optional(),
    gke: z.object({
      cluster: z.string().describe(
        "Required. The name of the cluster the GKE service is running in. The cluster must be running in the same project as the trigger being created.",
      ).optional(),
      location: z.string().describe(
        "Required. The name of the Google Compute Engine in which the cluster resides, which can either be compute zone (for example, us-central1-a) for the zonal clusters or region (for example, us-central1) for regional clusters.",
      ).optional(),
      namespace: z.string().describe(
        "Required. The namespace the GKE service is running in.",
      ).optional(),
      path: z.string().describe(
        'Optional. The relative path on the GKE service the events should be sent to. The value must conform to the definition of a URI path segment (section 3.3 of RFC2396). Examples: "/route", "route", "route/subroute".',
      ).optional(),
      service: z.string().describe("Required. Name of the GKE service.")
        .optional(),
    }).describe("Represents a GKE destination.").optional(),
    httpEndpoint: z.object({
      uri: z.string().describe(
        "Required. The URI of the HTTP endpoint. The value must be a RFC2396 URI string. Examples: `http://10.10.10.8:80/route`, `http://svc.us-central1.p.local:8080/`. Only HTTP and HTTPS protocols are supported. The host can be either a static IP addressable from the VPC specified by the network config, or an internal DNS hostname of the service resolvable via Cloud DNS.",
      ).optional(),
    }).describe("Represents a HTTP endpoint destination.").optional(),
    networkConfig: z.object({
      networkAttachment: z.string().describe(
        "Required. Name of the NetworkAttachment that allows access to the customer's VPC. Format: `projects/{PROJECT_ID}/regions/{REGION}/networkAttachments/{NETWORK_ATTACHMENT_NAME}`",
      ).optional(),
    }).describe("Network Configuration that can be inherited by other protos.")
      .optional(),
    workflow: z.string().describe(
      "The resource name of the Workflow whose Executions are triggered by the events. The Workflow resource should be deployed in the same project as the trigger. Format: `projects/{project}/locations/{location}/workflows/{workflow}`",
    ).optional(),
  }).describe("Represents a target of an invocation over HTTP.").optional(),
  eventDataContentType: z.string().describe(
    "Optional. EventDataContentType specifies the type of payload in MIME format that is expected from the CloudEvent data field. This is set to `application/json` if the value is not defined.",
  ).optional(),
  eventFilters: z.array(z.object({
    attribute: z.string().describe(
      "Required. The name of a CloudEvents attribute. Currently, only a subset of attributes are supported for filtering. You can [retrieve a specific provider's supported event types](/eventarc/docs/list-providers#describe-provider). All triggers MUST provide a filter for the 'type' attribute.",
    ).optional(),
    operator: z.string().describe(
      "Optional. The operator used for matching the events with the value of the filter. If not specified, only events that have an exact key-value pair specified in the filter are matched. The allowed values are `path_pattern` and `match-path-pattern`. `path_pattern` is only allowed for GCFv1 triggers.",
    ).optional(),
    value: z.string().describe("Required. The value for the attribute.")
      .optional(),
  })).describe(
    "Required. Unordered list. The list of filters that applies to event attributes. Only events that match all the provided filters are sent to the destination.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. User labels attached to the triggers that can be used to group resources.",
  ).optional(),
  name: z.string().describe(
    "Required. The resource name of the trigger. Must be unique within the location of the project and must be in `projects/{project}/locations/{location}/triggers/{trigger}` format.",
  ).optional(),
  retryPolicy: z.object({
    maxAttempts: z.number().int().describe(
      "Optional. The maximum number of delivery attempts for any message. The only valid value is 1.",
    ).optional(),
  }).describe(
    "The retry policy configuration for the Trigger. Can only be set with Cloud Run destinations.",
  ).optional(),
  serviceAccount: z.string().describe(
    "Optional. The IAM service account email associated with the trigger. The service account represents the identity of the trigger. The `iam.serviceAccounts.actAs` permission must be granted on the service account to allow a principal to impersonate the service account. For more information, see the [Roles and permissions](/eventarc/docs/all-roles-permissions) page specific to the trigger destination.",
  ).optional(),
  transport: z.object({
    pubsub: z.object({
      subscription: z.string().describe(
        "Output only. The name of the Pub/Sub subscription created and managed by Eventarc as a transport for the event delivery. Format: `projects/{PROJECT_ID}/subscriptions/{SUBSCRIPTION_NAME}`.",
      ).optional(),
      topic: z.string().describe(
        "Optional. The name of the Pub/Sub topic created and managed by Eventarc as a transport for the event delivery. Format: `projects/{PROJECT_ID}/topics/{TOPIC_NAME}`. You can set an existing topic for triggers of the type `google.cloud.pubsub.topic.v1.messagePublished`. The topic you provide here is not deleted by Eventarc at trigger deletion.",
      ).optional(),
    }).describe("Represents a Pub/Sub transport.").optional(),
  }).describe(
    "Represents the transport intermediaries created for the trigger to deliver events.",
  ).optional(),
  triggerId: z.string().describe(
    "Required. The user-provided ID to be assigned to the trigger.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  channel: z.string().optional(),
  conditions: z.record(z.string(), z.unknown()).optional(),
  createTime: z.string().optional(),
  destination: z.object({
    cloudFunction: z.string(),
    cloudRun: z.object({
      path: z.string(),
      region: z.string(),
      service: z.string(),
    }),
    gke: z.object({
      cluster: z.string(),
      location: z.string(),
      namespace: z.string(),
      path: z.string(),
      service: z.string(),
    }),
    httpEndpoint: z.object({
      uri: z.string(),
    }),
    networkConfig: z.object({
      networkAttachment: z.string(),
    }),
    workflow: z.string(),
  }).optional(),
  etag: z.string().optional(),
  eventDataContentType: z.string().optional(),
  eventFilters: z.array(z.object({
    attribute: z.string(),
    operator: z.string(),
    value: z.string(),
  })).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  retryPolicy: z.object({
    maxAttempts: z.number(),
  }).optional(),
  satisfiesPzs: z.boolean().optional(),
  serviceAccount: z.string().optional(),
  transport: z.object({
    pubsub: z.object({
      subscription: z.string(),
      topic: z.string(),
    }),
  }).optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  channel: z.string().describe(
    "Optional. The name of the channel associated with the trigger in `projects/{project}/locations/{location}/channels/{channel}` format. You must provide a channel to receive events from Eventarc SaaS partners.",
  ).optional(),
  destination: z.object({
    cloudFunction: z.string().describe(
      "The Cloud Function resource name. Cloud Functions V1 and V2 are supported. Format: `projects/{project}/locations/{location}/functions/{function}` This is a read-only field. Creating Cloud Functions V1/V2 triggers is only supported via the Cloud Functions product. An error will be returned if the user sets this value.",
    ).optional(),
    cloudRun: z.object({
      path: z.string().describe(
        'Optional. The relative path on the Cloud Run service the events should be sent to. The value must conform to the definition of a URI path segment (section 3.3 of RFC2396). Examples: "/route", "route", "route/subroute".',
      ).optional(),
      region: z.string().describe(
        "Required. The region the Cloud Run service is deployed in.",
      ).optional(),
      service: z.string().describe(
        "Required. The name of the Cloud Run service being addressed. See https://cloud.google.com/run/docs/reference/rest/v1/namespaces.services. Only services located in the same project as the trigger object can be addressed.",
      ).optional(),
    }).describe("Represents a Cloud Run destination.").optional(),
    gke: z.object({
      cluster: z.string().describe(
        "Required. The name of the cluster the GKE service is running in. The cluster must be running in the same project as the trigger being created.",
      ).optional(),
      location: z.string().describe(
        "Required. The name of the Google Compute Engine in which the cluster resides, which can either be compute zone (for example, us-central1-a) for the zonal clusters or region (for example, us-central1) for regional clusters.",
      ).optional(),
      namespace: z.string().describe(
        "Required. The namespace the GKE service is running in.",
      ).optional(),
      path: z.string().describe(
        'Optional. The relative path on the GKE service the events should be sent to. The value must conform to the definition of a URI path segment (section 3.3 of RFC2396). Examples: "/route", "route", "route/subroute".',
      ).optional(),
      service: z.string().describe("Required. Name of the GKE service.")
        .optional(),
    }).describe("Represents a GKE destination.").optional(),
    httpEndpoint: z.object({
      uri: z.string().describe(
        "Required. The URI of the HTTP endpoint. The value must be a RFC2396 URI string. Examples: `http://10.10.10.8:80/route`, `http://svc.us-central1.p.local:8080/`. Only HTTP and HTTPS protocols are supported. The host can be either a static IP addressable from the VPC specified by the network config, or an internal DNS hostname of the service resolvable via Cloud DNS.",
      ).optional(),
    }).describe("Represents a HTTP endpoint destination.").optional(),
    networkConfig: z.object({
      networkAttachment: z.string().describe(
        "Required. Name of the NetworkAttachment that allows access to the customer's VPC. Format: `projects/{PROJECT_ID}/regions/{REGION}/networkAttachments/{NETWORK_ATTACHMENT_NAME}`",
      ).optional(),
    }).describe("Network Configuration that can be inherited by other protos.")
      .optional(),
    workflow: z.string().describe(
      "The resource name of the Workflow whose Executions are triggered by the events. The Workflow resource should be deployed in the same project as the trigger. Format: `projects/{project}/locations/{location}/workflows/{workflow}`",
    ).optional(),
  }).describe("Represents a target of an invocation over HTTP.").optional(),
  eventDataContentType: z.string().describe(
    "Optional. EventDataContentType specifies the type of payload in MIME format that is expected from the CloudEvent data field. This is set to `application/json` if the value is not defined.",
  ).optional(),
  eventFilters: z.array(z.object({
    attribute: z.string().describe(
      "Required. The name of a CloudEvents attribute. Currently, only a subset of attributes are supported for filtering. You can [retrieve a specific provider's supported event types](/eventarc/docs/list-providers#describe-provider). All triggers MUST provide a filter for the 'type' attribute.",
    ).optional(),
    operator: z.string().describe(
      "Optional. The operator used for matching the events with the value of the filter. If not specified, only events that have an exact key-value pair specified in the filter are matched. The allowed values are `path_pattern` and `match-path-pattern`. `path_pattern` is only allowed for GCFv1 triggers.",
    ).optional(),
    value: z.string().describe("Required. The value for the attribute.")
      .optional(),
  })).describe(
    "Required. Unordered list. The list of filters that applies to event attributes. Only events that match all the provided filters are sent to the destination.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. User labels attached to the triggers that can be used to group resources.",
  ).optional(),
  name: z.string().describe(
    "Required. The resource name of the trigger. Must be unique within the location of the project and must be in `projects/{project}/locations/{location}/triggers/{trigger}` format.",
  ).optional(),
  retryPolicy: z.object({
    maxAttempts: z.number().int().describe(
      "Optional. The maximum number of delivery attempts for any message. The only valid value is 1.",
    ).optional(),
  }).describe(
    "The retry policy configuration for the Trigger. Can only be set with Cloud Run destinations.",
  ).optional(),
  serviceAccount: z.string().describe(
    "Optional. The IAM service account email associated with the trigger. The service account represents the identity of the trigger. The `iam.serviceAccounts.actAs` permission must be granted on the service account to allow a principal to impersonate the service account. For more information, see the [Roles and permissions](/eventarc/docs/all-roles-permissions) page specific to the trigger destination.",
  ).optional(),
  transport: z.object({
    pubsub: z.object({
      subscription: z.string().describe(
        "Output only. The name of the Pub/Sub subscription created and managed by Eventarc as a transport for the event delivery. Format: `projects/{PROJECT_ID}/subscriptions/{SUBSCRIPTION_NAME}`.",
      ).optional(),
      topic: z.string().describe(
        "Optional. The name of the Pub/Sub topic created and managed by Eventarc as a transport for the event delivery. Format: `projects/{PROJECT_ID}/topics/{TOPIC_NAME}`. You can set an existing topic for triggers of the type `google.cloud.pubsub.topic.v1.messagePublished`. The topic you provide here is not deleted by Eventarc at trigger deletion.",
      ).optional(),
    }).describe("Represents a Pub/Sub transport.").optional(),
  }).describe(
    "Represents the transport intermediaries created for the trigger to deliver events.",
  ).optional(),
  triggerId: z.string().describe(
    "Required. The user-provided ID to be assigned to the trigger.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Eventarc Triggers. Registered at `@swamp/gcp/eventarc/triggers`. */
export const model = {
  type: "@swamp/gcp/eventarc/triggers",
  version: "2026.05.18.1",
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
      toVersion: "2026.05.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A representation of the trigger resource.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a triggers",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["channel"] !== undefined) body["channel"] = g["channel"];
        if (g["destination"] !== undefined) {
          body["destination"] = g["destination"];
        }
        if (g["eventDataContentType"] !== undefined) {
          body["eventDataContentType"] = g["eventDataContentType"];
        }
        if (g["eventFilters"] !== undefined) {
          body["eventFilters"] = g["eventFilters"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["retryPolicy"] !== undefined) {
          body["retryPolicy"] = g["retryPolicy"];
        }
        if (g["serviceAccount"] !== undefined) {
          body["serviceAccount"] = g["serviceAccount"];
        }
        if (g["transport"] !== undefined) body["transport"] = g["transport"];
        if (g["triggerId"] !== undefined) body["triggerId"] = g["triggerId"];
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
      description: "Get a triggers",
      arguments: z.object({
        identifier: z.string().describe("The name of the triggers"),
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
      description: "Update triggers attributes",
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
        if (g["channel"] !== undefined) body["channel"] = g["channel"];
        if (g["destination"] !== undefined) {
          body["destination"] = g["destination"];
        }
        if (g["eventDataContentType"] !== undefined) {
          body["eventDataContentType"] = g["eventDataContentType"];
        }
        if (g["eventFilters"] !== undefined) {
          body["eventFilters"] = g["eventFilters"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["retryPolicy"] !== undefined) {
          body["retryPolicy"] = g["retryPolicy"];
        }
        if (g["serviceAccount"] !== undefined) {
          body["serviceAccount"] = g["serviceAccount"];
        }
        if (g["transport"] !== undefined) body["transport"] = g["transport"];
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
      description: "Delete the triggers",
      arguments: z.object({
        identifier: z.string().describe("The name of the triggers"),
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
      description: "Sync triggers state from GCP",
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
