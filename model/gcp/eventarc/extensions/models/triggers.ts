// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

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
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
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

const LIST_CONFIG = {
  "id": "eventarc.projects.locations.triggers.list",
  "path": "v1/{+parent}/triggers",
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
    }).describe(
      "Cloud Run fully-managed resource that receives the events. The resource should be in the same project as the trigger.",
    ).optional(),
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
    }).describe(
      "A GKE service capable of receiving events. The service should be running in the same project as the trigger.",
    ).optional(),
    httpEndpoint: z.object({
      uri: z.string().describe(
        "Required. The URI of the HTTP endpoint. The value must be a RFC2396 URI string. Examples: `http://10.10.10.8:80/route`, `http://svc.us-central1.p.local:8080/`. Only HTTP and HTTPS protocols are supported. The host can be either a static IP addressable from the VPC specified by the network config, or an internal DNS hostname of the service resolvable via Cloud DNS.",
      ).optional(),
    }).describe("An HTTP endpoint destination described by an URI.").optional(),
    networkConfig: z.object({
      networkAttachment: z.string().describe(
        "Required. Name of the NetworkAttachment that allows access to the customer's VPC. Format: `projects/{PROJECT_ID}/regions/{REGION}/networkAttachments/{NETWORK_ATTACHMENT_NAME}`",
      ).optional(),
    }).describe(
      "Optional. Network config is used to configure how Eventarc resolves and connect to a destination. This should only be used with HttpEndpoint destination type.",
    ).optional(),
    workflow: z.string().describe(
      "The resource name of the Workflow whose Executions are triggered by the events. The Workflow resource should be deployed in the same project as the trigger. Format: `projects/{project}/locations/{location}/workflows/{workflow}`",
    ).optional(),
  }).describe(
    "Required. Destination specifies where the events should be sent to.",
  ).optional(),
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
    "Optional. Unordered list. The list of filters that applies to event attributes. Only events that match all the provided filters are sent to the destination.",
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
    "Optional. The retry policy to use in the Trigger. If unset, event delivery will be retried for up to 24 hours by default: https://cloud.google.com/eventarc/docs/retry-events",
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
    }).describe(
      "The Pub/Sub topic and subscription used by Eventarc as a transport intermediary.",
    ).optional(),
  }).describe(
    "Optional. To deliver messages, Eventarc might use other Google Cloud products as a transport intermediary. This field contains a reference to that transport intermediary. This information can be used for debugging purposes.",
  ).optional(),
  triggerId: z.string().describe(
    "Required. The user-provided ID to be assigned to the trigger.",
  ).optional(),
  allowMissing: z.string().describe(
    "If set to true, and the trigger is not found, a new trigger will be created. In this situation, `update_mask` is ignored.",
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
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
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
    }).describe(
      "Cloud Run fully-managed resource that receives the events. The resource should be in the same project as the trigger.",
    ).optional(),
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
    }).describe(
      "A GKE service capable of receiving events. The service should be running in the same project as the trigger.",
    ).optional(),
    httpEndpoint: z.object({
      uri: z.string().describe(
        "Required. The URI of the HTTP endpoint. The value must be a RFC2396 URI string. Examples: `http://10.10.10.8:80/route`, `http://svc.us-central1.p.local:8080/`. Only HTTP and HTTPS protocols are supported. The host can be either a static IP addressable from the VPC specified by the network config, or an internal DNS hostname of the service resolvable via Cloud DNS.",
      ).optional(),
    }).describe("An HTTP endpoint destination described by an URI.").optional(),
    networkConfig: z.object({
      networkAttachment: z.string().describe(
        "Required. Name of the NetworkAttachment that allows access to the customer's VPC. Format: `projects/{PROJECT_ID}/regions/{REGION}/networkAttachments/{NETWORK_ATTACHMENT_NAME}`",
      ).optional(),
    }).describe(
      "Optional. Network config is used to configure how Eventarc resolves and connect to a destination. This should only be used with HttpEndpoint destination type.",
    ).optional(),
    workflow: z.string().describe(
      "The resource name of the Workflow whose Executions are triggered by the events. The Workflow resource should be deployed in the same project as the trigger. Format: `projects/{project}/locations/{location}/workflows/{workflow}`",
    ).optional(),
  }).describe(
    "Required. Destination specifies where the events should be sent to.",
  ).optional(),
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
    "Optional. Unordered list. The list of filters that applies to event attributes. Only events that match all the provided filters are sent to the destination.",
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
    "Optional. The retry policy to use in the Trigger. If unset, event delivery will be retried for up to 24 hours by default: https://cloud.google.com/eventarc/docs/retry-events",
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
    }).describe(
      "The Pub/Sub topic and subscription used by Eventarc as a transport intermediary.",
    ).optional(),
  }).describe(
    "Optional. To deliver messages, Eventarc might use other Google Cloud products as a transport intermediary. This field contains a reference to that transport intermediary. This information can be used for debugging purposes.",
  ).optional(),
  triggerId: z.string().describe(
    "Required. The user-provided ID to be assigned to the trigger.",
  ).optional(),
  allowMissing: z.string().describe(
    "If set to true, and the trigger is not found, a new trigger will be created. In this situation, `update_mask` is ignored.",
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

/** Swamp extension model for Google Cloud Eventarc Triggers. Registered at `@swamp/gcp/eventarc/triggers`. */
export const model = {
  type: "@swamp/gcp/eventarc/triggers",
  version: "2026.10.08.1",
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
    {
      toVersion: "2026.05.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.17.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.17.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.1",
      description: "Added: scopes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.20.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
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
      toVersion: "2026.09.07.1",
      description: "Added: allowMissing",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.07.2",
      description:
        "Removed: cloudFunction, cloudRun, path, region, service, gke, cluster, namespace, path, service, httpEndpoint, uri, networkConfig, networkAttachment, workflow, attribute, operator, value, maxAttempts, pubsub, subscription, topic",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          cloudFunction: _cloudFunction,
          cloudRun: _cloudRun,
          path: _path,
          region: _region,
          service: _service,
          gke: _gke,
          cluster: _cluster,
          namespace: _namespace,
          httpEndpoint: _httpEndpoint,
          uri: _uri,
          networkConfig: _networkConfig,
          networkAttachment: _networkAttachment,
          workflow: _workflow,
          attribute: _attribute,
          operator: _operator,
          value: _value,
          maxAttempts: _maxAttempts,
          pubsub: _pubsub,
          subscription: _subscription,
          topic: _topic,
          ...rest
        } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.10.08.1",
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
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        if (g["triggerId"] !== undefined) {
          params["triggerId"] = String(g["triggerId"]);
        }
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
              "parent": `projects/${projectId}/locations/${
                String(g["location"] ?? "")
              }`,
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
      description: "Get a triggers",
      arguments: z.object({
        identifier: z.string().describe("The name of the triggers"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
      description: "Update triggers attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific triggers by name (e.g. one discovered by list)",
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
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            existingName ?? g["name"]?.toString() ?? "",
          );
        }
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
        if (g["allowMissing"] !== undefined) {
          params["allowMissing"] = String(g["allowMissing"]);
        } else if (existing["allowMissing"] !== undefined) {
          params["allowMissing"] = String(existing["allowMissing"]);
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
      description: "Delete the triggers",
      arguments: z.object({
        identifier: z.string().describe("The name of the triggers"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
      description: "Sync triggers state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific triggers by name (e.g. one discovered by list)",
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
              `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
      description: "List triggers resources",
      arguments: z.object({
        filter: z.string().describe(
          'Filter field. Used to filter the Triggers to be listed. Possible filters are described in https://google.aip.dev/160. For example, using "?filter=destination:gke" would list only Triggers with a gke destination.',
        ).optional(),
        orderBy: z.string().describe(
          "The sorting order of the resources returned. Value should be a comma-separated list of fields. The default sorting order is ascending. To specify descending order for a field, append a `desc` suffix; for example: `name desc, trigger_id`.",
        ).optional(),
        pageSize: z.number().describe(
          "The maximum number of triggers to return on each page. Note: The service may send fewer.",
        ).optional(),
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
          baseUrl,
          LIST_CONFIG,
          params,
          "triggers",
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
    get_iam_policy: {
      description: "get iam policy",
      arguments: z.object({
        options_requestedPolicyVersion: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        if (args["options_requestedPolicyVersion"] !== undefined) {
          params["options.requestedPolicyVersion"] = String(
            args["options_requestedPolicyVersion"],
          );
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "eventarc.projects.locations.triggers.getIamPolicy",
            "path": "v1/{+resource}:getIamPolicy",
            "httpMethod": "GET",
            "parameterOrder": ["resource"],
            "parameters": {
              "options.requestedPolicyVersion": { "location": "query" },
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          undefined,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    set_iam_policy: {
      description: "set iam policy",
      arguments: z.object({
        policy: z.any().optional(),
        updateMask: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["policy"] !== undefined) body["policy"] = args["policy"];
        if (args["updateMask"] !== undefined) {
          body["updateMask"] = args["updateMask"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "eventarc.projects.locations.triggers.setIamPolicy",
            "path": "v1/{+resource}:setIamPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    test_iam_permissions: {
      description: "test iam permissions",
      arguments: z.object({
        permissions: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["permissions"] !== undefined) {
          body["permissions"] = args["permissions"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "eventarc.projects.locations.triggers.testIamPermissions",
            "path": "v1/{+resource}:testIamPermissions",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
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
