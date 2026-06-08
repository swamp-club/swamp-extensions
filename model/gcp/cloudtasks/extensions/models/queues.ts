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

// Auto-generated extension model for @swamp/gcp/cloudtasks/queues
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Tasks Queues.
 *
 * A queue is a container of related tasks. Queues are configured to manage how those tasks are dispatched. Configurable properties include rate limits, retry options, queue types, and others.
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
  return `${parent}/queues/${shortName}`;
}

const BASE_URL = "https://cloudtasks.googleapis.com/";

const GET_CONFIG = {
  "id": "cloudtasks.projects.locations.queues.get",
  "path": "v2/{+name}",
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
  "id": "cloudtasks.projects.locations.queues.create",
  "path": "v2/{+parent}/queues",
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

const PATCH_CONFIG = {
  "id": "cloudtasks.projects.locations.queues.patch",
  "path": "v2/{+name}",
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
  "id": "cloudtasks.projects.locations.queues.delete",
  "path": "v2/{+name}",
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
  "id": "cloudtasks.projects.locations.queues.list",
  "path": "v2/{+parent}/queues",
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
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  appEngineRoutingOverride: z.object({
    host: z.string().describe(
      "Output only. The host that the task is sent to. The host is constructed from the domain name of the app associated with the queue's project ID (for example.appspot.com), and the service, version, and instance. Tasks which were created using the App Engine SDK might have a custom domain name. For more information, see [How Requests are Routed](https://cloud.google.com/appengine/docs/standard/python/how-requests-are-routed).",
    ).optional(),
    instance: z.string().describe(
      "App instance. By default, the task is sent to an instance which is available when the task is attempted. Requests can only be sent to a specific instance if [manual scaling is used in App Engine Standard](https://cloud.google.com/appengine/docs/python/an-overview-of-app-engine?hl=en_US#scaling_types_and_instance_classes). App Engine Flex does not support instances. For more information, see [App Engine Standard request routing](https://cloud.google.com/appengine/docs/standard/python/how-requests-are-routed) and [App Engine Flex request routing](https://cloud.google.com/appengine/docs/flexible/python/how-requests-are-routed).",
    ).optional(),
    service: z.string().describe(
      "App service. By default, the task is sent to the service which is the default service when the task is attempted. For some queues or tasks which were created using the App Engine Task Queue API, host is not parsable into service, version, and instance. For example, some tasks which were created using the App Engine SDK use a custom domain name; custom domains are not parsed by Cloud Tasks. If host is not parsable, then service, version, and instance are the empty string.",
    ).optional(),
    version: z.string().describe(
      "App version. By default, the task is sent to the version which is the default version when the task is attempted. For some queues or tasks which were created using the App Engine Task Queue API, host is not parsable into service, version, and instance. For example, some tasks which were created using the App Engine SDK use a custom domain name; custom domains are not parsed by Cloud Tasks. If host is not parsable, then service, version, and instance are the empty string.",
    ).optional(),
  }).describe(
    "App Engine Routing. Defines routing characteristics specific to App Engine - service, version, and instance. For more information about services, versions, and instances see [An Overview of App Engine](https://cloud.google.com/appengine/docs/python/an-overview-of-app-engine), [Microservices Architecture on Google App Engine](https://cloud.google.com/appengine/docs/python/microservices-on-app-engine), [App Engine Standard request routing](https://cloud.google.com/appengine/docs/standard/python/how-requests-are-routed), and [App Engine Flex request routing](https://cloud.google.com/appengine/docs/flexible/python/how-requests-are-routed). Using AppEngineRouting requires [`appengine.applications.get`](https://cloud.google.com/appengine/docs/admin-api/access-control) Google IAM permission for the project and the following scope: `https://www.googleapis.com/auth/cloud-platform`",
  ).optional(),
  httpTarget: z.object({
    headerOverrides: z.array(z.object({
      header: z.object({
        key: z.string().describe("The Key of the header.").optional(),
        value: z.string().describe("The Value of the header.").optional(),
      }).describe(
        "Defines a header message. A header can have a key and a value.",
      ).optional(),
    })).describe(
      'HTTP target headers. This map contains the header field names and values. Headers will be set when running the CreateTask and/or BufferTask. These headers represent a subset of the headers that will be configured for the task\'s HTTP request. Some HTTP request headers will be ignored or replaced. A partial list of headers that will be ignored or replaced is: * Several predefined headers, prefixed with "X-CloudTasks-", can be used to define properties of the task. * Host: This will be computed by Cloud Tasks and derived from HttpRequest.url. * Content-Length: This will be computed by Cloud Tasks. `Content-Type` won\'t be set by Cloud Tasks. You can explicitly set `Content-Type` to a media type when the task is created. For example,`Content-Type` can be set to `"application/octet-stream"` or `"application/json"`. The default value is set to "application/json"`. * User-Agent: This will be set to `"Google-Cloud-Tasks"`. Headers which can have multiple values (according to RFC2616) can be specified using comma-separated values. The size of the headers must be less than 80KB. Queue-level headers to override headers of all the tasks in the queue. Do not put business sensitive or personally identifying data in the HTTP Header Override Configuration or other similar fields in accordance with Section 12 (Resource Fields) of the [Service Specific Terms](https://cloud.google.com/terms/service-terms).',
    ).optional(),
    httpMethod: z.enum([
      "HTTP_METHOD_UNSPECIFIED",
      "POST",
      "GET",
      "HEAD",
      "PUT",
      "DELETE",
      "PATCH",
      "OPTIONS",
    ]).describe(
      "The HTTP method to use for the request. When specified, it overrides HttpRequest for the task. Note that if the value is set to HttpMethod the HttpRequest of the task will be ignored at execution time.",
    ).optional(),
    oauthToken: z.object({
      scope: z.string().describe(
        'OAuth scope to be used for generating OAuth access token. If not specified, "https://www.googleapis.com/auth/cloud-platform" will be used.',
      ).optional(),
      serviceAccountEmail: z.string().describe(
        "[Service account email](https://cloud.google.com/iam/docs/service-accounts) to be used for generating OAuth token. The service account must be within the same project as the queue. The caller must have iam.serviceAccounts.actAs permission for the service account.",
      ).optional(),
    }).describe(
      "Contains information needed for generating an [OAuth token](https://developers.google.com/identity/protocols/OAuth2). This type of authorization should generally only be used when calling Google APIs hosted on *.googleapis.com.",
    ).optional(),
    oidcToken: z.object({
      audience: z.string().describe(
        "Audience to be used when generating OIDC token. If not specified, the URI specified in target will be used.",
      ).optional(),
      serviceAccountEmail: z.string().describe(
        "[Service account email](https://cloud.google.com/iam/docs/service-accounts) to be used for generating OIDC token. The service account must be within the same project as the queue. The caller must have iam.serviceAccounts.actAs permission for the service account.",
      ).optional(),
    }).describe(
      "Contains information needed for generating an [OpenID Connect token](https://developers.google.com/identity/protocols/OpenIDConnect). This type of authorization can be used for many scenarios, including calling Cloud Run, or endpoints where you intend to validate the token yourself.",
    ).optional(),
    uriOverride: z.object({
      host: z.string().describe(
        'Host override. When specified, replaces the host part of the task URL. For example, if the task URL is "https://www.google.com," and host value is set to "example.net", the overridden URI will be changed to "https://example.net." Host value cannot be an empty string (INVALID_ARGUMENT).',
      ).optional(),
      pathOverride: z.object({
        path: z.string().describe(
          "The URI path (e.g., /users/1234). Default is an empty string.",
        ).optional(),
      }).describe(
        "PathOverride. Path message defines path override for HTTP targets.",
      ).optional(),
      port: z.string().describe(
        'Port override. When specified, replaces the port part of the task URI. For instance, for a URI "https://www.example.com/example" and port=123, the overridden URI becomes "https://www.example.com:123/example". Note that the port value must be a positive integer. Setting the port to 0 (Zero) clears the URI port.',
      ).optional(),
      queryOverride: z.object({
        queryParams: z.string().describe(
          "The query parameters (e.g., qparam1=123&qparam2=456). Default is an empty string.",
        ).optional(),
      }).describe(
        "QueryOverride. Query message defines query override for HTTP targets.",
      ).optional(),
      scheme: z.enum(["SCHEME_UNSPECIFIED", "HTTP", "HTTPS"]).describe(
        "Scheme override. When specified, the task URI scheme is replaced by the provided value (HTTP or HTTPS).",
      ).optional(),
      uriOverrideEnforceMode: z.enum([
        "URI_OVERRIDE_ENFORCE_MODE_UNSPECIFIED",
        "IF_NOT_EXISTS",
        "ALWAYS",
      ]).describe(
        "URI Override Enforce Mode When specified, determines the Target UriOverride mode. If not specified, it defaults to ALWAYS.",
      ).optional(),
    }).describe(
      "URI Override. When specified, all the HTTP tasks inside the queue will be partially or fully overridden depending on the configured values.",
    ).optional(),
  }).describe(
    "HTTP target. When specified as a Queue, all the tasks with [HttpRequest] will be overridden according to the target.",
  ).optional(),
  rateLimits: z.object({
    maxBurstSize: z.number().int().describe(
      "Output only. The max burst size. Max burst size limits how fast tasks in queue are processed when many tasks are in the queue and the rate is high. This field allows the queue to have a high rate so processing starts shortly after a task is enqueued, but still limits resource usage when many tasks are enqueued in a short period of time. The [token bucket](https://wikipedia.org/wiki/Token_Bucket) algorithm is used to control the rate of task dispatches. Each queue has a token bucket that holds tokens, up to the maximum specified by `max_burst_size`. Each time a task is dispatched, a token is removed from the bucket. Tasks will be dispatched until the queue's bucket runs out of tokens. The bucket will be continuously refilled with new tokens based on `max_dispatches_per_second`. Cloud Tasks automatically sets an appropriate `max_burst_size` based on the value of `max_dispatches_per_second`. The value is dynamically optimized to ensure queue stability and throughput. It is generally at least equal to `max_dispatches_per_second` but might be higher to accommodate bursts of traffic. For queues that were created or updated using `queue.yaml/xml`, `max_burst_size` is equal to [bucket_size](https://cloud.google.com/appengine/docs/standard/python/config/queueref#bucket_size). Since `max_burst_size` is output only, if UpdateQueue is called on a queue created by `queue.yaml/xml`, `max_burst_size` will be reset based on the value of `max_dispatches_per_second`, regardless of whether `max_dispatches_per_second` is updated.",
    ).optional(),
    maxConcurrentDispatches: z.number().int().describe(
      "The maximum number of concurrent tasks that Cloud Tasks allows to be dispatched for this queue. After this threshold has been reached, Cloud Tasks stops dispatching tasks until the number of concurrent requests decreases. If unspecified when the queue is created, Cloud Tasks will pick the default. The maximum allowed value is 5,000. This field has the same meaning as [max_concurrent_requests in queue.yaml/xml](https://cloud.google.com/appengine/docs/standard/python/config/queueref#max_concurrent_requests).",
    ).optional(),
    maxDispatchesPerSecond: z.number().describe(
      "The maximum rate at which tasks are dispatched from this queue. If unspecified when the queue is created, Cloud Tasks will pick the default. The maximum allowed value is 500. This field has the same meaning as [rate in queue.yaml/xml](https://cloud.google.com/appengine/docs/standard/python/config/queueref#rate).",
    ).optional(),
  }).describe(
    "Rate limits. This message determines the maximum rate that tasks can be dispatched by a queue, regardless of whether the dispatch is a first task attempt or a retry. Note: The debugging command, RunTask, will run a task even if the queue has reached its RateLimits.",
  ).optional(),
  retryConfig: z.object({
    maxAttempts: z.number().int().describe(
      "Number of attempts per task, including the first attempt. (If the first attempt fails, there will be `max_attempts - 1` retries.) Must be greater than or equal to -1, which indicates unlimited attempts. Cloud Tasks stops retrying only when `max_attempts` and `max_retry_duration` are both satisfied, or when the task is successfully executed. When the task has been attempted `max_attempts` times and when the `max_retry_duration` time has passed, no further attempts are made, and the task is deleted. If `max_attempts` is set to -1 and `max_retry_duration` is set to 0, the task is retried until the [maximum task retention](https://docs.cloud.google.com/tasks/docs/quotas#limits) limit is reached. If unspecified when the queue is created, Cloud Tasks will pick the default. This field has the same meaning as [task_retry_limit in queue.yaml/xml](https://cloud.google.com/appengine/docs/standard/python/config/queueref#retry_parameters).",
    ).optional(),
    maxBackoff: z.string().describe(
      'A task will be scheduled for retry between min_backoff and max_backoff duration after it fails, if the queue\'s RetryConfig specifies that the task should be retried. The value must be given as a string that indicates the length of time (in seconds) followed by `s` (for "seconds"). For more information on the format, see the documentation for [Duration](https://protobuf.dev/reference/protobuf/google.protobuf/#duration). `max_backoff` will be truncated to the nearest second. If unspecified when the queue is created, Cloud Tasks will pick the default. This field has the same meaning as [max_backoff_seconds in queue.yaml/xml](https://cloud.google.com/appengine/docs/standard/python/config/queueref#retry_parameters).',
    ).optional(),
    maxDoublings: z.number().int().describe(
      "The time between retries will double `max_doublings` times. A task's retry interval starts at min_backoff, then doubles `max_doublings` times, then increases linearly, and finally retries at intervals of max_backoff up to max_attempts times. For example, if min_backoff is 10s, max_backoff is 300s, and `max_doublings` is 3, then the a task will first be retried in 10s. The retry interval will double three times, and then increase linearly by 2^3 * 10s. Finally, the task will retry at intervals of max_backoff until the task has been attempted max_attempts times. Thus, the requests will retry at 10s, 20s, 40s, 80s, 160s, 240s, 300s, 300s,.... If unspecified when the queue is created, Cloud Tasks will pick the default. This field has the same meaning as [max_doublings in queue.yaml/xml](https://cloud.google.com/appengine/docs/standard/python/config/queueref#retry_parameters).",
    ).optional(),
    maxRetryDuration: z.string().describe(
      'If positive, `max_retry_duration` specifies the time limit for retrying a failed task, measured from when the task was first attempted. Once `max_retry_duration` time has passed *and* the task has been attempted max_attempts times, no further attempts are made and the task is deleted. A zero (0) indicates an unlimited duration, up to the [maximum task retention](https://docs.cloud.google.com/tasks/docs/quotas#limits) limit. The value must be given as a string that indicates the length of time (in seconds) followed by `s` (for "seconds"). For the maximum possible value or the format, see the documentation for [Duration](https://protobuf.dev/reference/protobuf/google.protobuf/#duration). `max_retry_duration` will be truncated to the nearest second. If unspecified when the queue is created, Cloud Tasks will pick the default. This field has the same meaning as [task_age_limit in queue.yaml/xml](https://cloud.google.com/appengine/docs/standard/python/config/queueref#retry_parameters).',
    ).optional(),
    minBackoff: z.string().describe(
      'A task will be scheduled for retry between min_backoff and max_backoff duration after it fails, if the queue\'s RetryConfig specifies that the task should be retried. The value must be given as a string that indicates the length of time (in seconds) followed by `s` (for "seconds"). For more information on the format, see the documentation for [Duration](https://protobuf.dev/reference/protobuf/google.protobuf/#duration). `min_backoff` will be truncated to the nearest second. If unspecified when the queue is created, Cloud Tasks will pick the default. This field has the same meaning as [min_backoff_seconds in queue.yaml/xml](https://cloud.google.com/appengine/docs/standard/python/config/queueref#retry_parameters).',
    ).optional(),
  }).describe(
    "Retry config. These settings determine when a failed task attempt is retried.",
  ).optional(),
  stackdriverLoggingConfig: z.object({
    samplingRatio: z.number().describe(
      "Specifies the fraction of operations to write to [Stackdriver Logging](https://cloud.google.com/logging/docs/). This field may contain any value between 0.0 and 1.0, inclusive. 0.0 is the default and means that no operations are logged.",
    ).optional(),
  }).describe(
    "Configuration options for writing logs to [Stackdriver Logging](https://cloud.google.com/logging/docs/).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  appEngineRoutingOverride: z.object({
    host: z.string(),
    instance: z.string(),
    service: z.string(),
    version: z.string(),
  }).optional(),
  httpTarget: z.object({
    headerOverrides: z.array(z.object({
      header: z.object({
        key: z.string(),
        value: z.string(),
      }),
    })),
    httpMethod: z.string(),
    oauthToken: z.object({
      scope: z.string(),
      serviceAccountEmail: z.string(),
    }),
    oidcToken: z.object({
      audience: z.string(),
      serviceAccountEmail: z.string(),
    }),
    uriOverride: z.object({
      host: z.string(),
      pathOverride: z.object({
        path: z.string(),
      }),
      port: z.string(),
      queryOverride: z.object({
        queryParams: z.string(),
      }),
      scheme: z.string(),
      uriOverrideEnforceMode: z.string(),
    }),
  }).optional(),
  name: z.string(),
  purgeTime: z.string().optional(),
  rateLimits: z.object({
    maxBurstSize: z.number(),
    maxConcurrentDispatches: z.number(),
    maxDispatchesPerSecond: z.number(),
  }).optional(),
  retryConfig: z.object({
    maxAttempts: z.number(),
    maxBackoff: z.string(),
    maxDoublings: z.number(),
    maxRetryDuration: z.string(),
    minBackoff: z.string(),
  }).optional(),
  stackdriverLoggingConfig: z.object({
    samplingRatio: z.number(),
  }).optional(),
  state: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  appEngineRoutingOverride: z.object({
    host: z.string().describe(
      "Output only. The host that the task is sent to. The host is constructed from the domain name of the app associated with the queue's project ID (for example.appspot.com), and the service, version, and instance. Tasks which were created using the App Engine SDK might have a custom domain name. For more information, see [How Requests are Routed](https://cloud.google.com/appengine/docs/standard/python/how-requests-are-routed).",
    ).optional(),
    instance: z.string().describe(
      "App instance. By default, the task is sent to an instance which is available when the task is attempted. Requests can only be sent to a specific instance if [manual scaling is used in App Engine Standard](https://cloud.google.com/appengine/docs/python/an-overview-of-app-engine?hl=en_US#scaling_types_and_instance_classes). App Engine Flex does not support instances. For more information, see [App Engine Standard request routing](https://cloud.google.com/appengine/docs/standard/python/how-requests-are-routed) and [App Engine Flex request routing](https://cloud.google.com/appengine/docs/flexible/python/how-requests-are-routed).",
    ).optional(),
    service: z.string().describe(
      "App service. By default, the task is sent to the service which is the default service when the task is attempted. For some queues or tasks which were created using the App Engine Task Queue API, host is not parsable into service, version, and instance. For example, some tasks which were created using the App Engine SDK use a custom domain name; custom domains are not parsed by Cloud Tasks. If host is not parsable, then service, version, and instance are the empty string.",
    ).optional(),
    version: z.string().describe(
      "App version. By default, the task is sent to the version which is the default version when the task is attempted. For some queues or tasks which were created using the App Engine Task Queue API, host is not parsable into service, version, and instance. For example, some tasks which were created using the App Engine SDK use a custom domain name; custom domains are not parsed by Cloud Tasks. If host is not parsable, then service, version, and instance are the empty string.",
    ).optional(),
  }).describe(
    "App Engine Routing. Defines routing characteristics specific to App Engine - service, version, and instance. For more information about services, versions, and instances see [An Overview of App Engine](https://cloud.google.com/appengine/docs/python/an-overview-of-app-engine), [Microservices Architecture on Google App Engine](https://cloud.google.com/appengine/docs/python/microservices-on-app-engine), [App Engine Standard request routing](https://cloud.google.com/appengine/docs/standard/python/how-requests-are-routed), and [App Engine Flex request routing](https://cloud.google.com/appengine/docs/flexible/python/how-requests-are-routed). Using AppEngineRouting requires [`appengine.applications.get`](https://cloud.google.com/appengine/docs/admin-api/access-control) Google IAM permission for the project and the following scope: `https://www.googleapis.com/auth/cloud-platform`",
  ).optional(),
  httpTarget: z.object({
    headerOverrides: z.array(z.object({
      header: z.object({
        key: z.string().describe("The Key of the header.").optional(),
        value: z.string().describe("The Value of the header.").optional(),
      }).describe(
        "Defines a header message. A header can have a key and a value.",
      ).optional(),
    })).describe(
      'HTTP target headers. This map contains the header field names and values. Headers will be set when running the CreateTask and/or BufferTask. These headers represent a subset of the headers that will be configured for the task\'s HTTP request. Some HTTP request headers will be ignored or replaced. A partial list of headers that will be ignored or replaced is: * Several predefined headers, prefixed with "X-CloudTasks-", can be used to define properties of the task. * Host: This will be computed by Cloud Tasks and derived from HttpRequest.url. * Content-Length: This will be computed by Cloud Tasks. `Content-Type` won\'t be set by Cloud Tasks. You can explicitly set `Content-Type` to a media type when the task is created. For example,`Content-Type` can be set to `"application/octet-stream"` or `"application/json"`. The default value is set to "application/json"`. * User-Agent: This will be set to `"Google-Cloud-Tasks"`. Headers which can have multiple values (according to RFC2616) can be specified using comma-separated values. The size of the headers must be less than 80KB. Queue-level headers to override headers of all the tasks in the queue. Do not put business sensitive or personally identifying data in the HTTP Header Override Configuration or other similar fields in accordance with Section 12 (Resource Fields) of the [Service Specific Terms](https://cloud.google.com/terms/service-terms).',
    ).optional(),
    httpMethod: z.enum([
      "HTTP_METHOD_UNSPECIFIED",
      "POST",
      "GET",
      "HEAD",
      "PUT",
      "DELETE",
      "PATCH",
      "OPTIONS",
    ]).describe(
      "The HTTP method to use for the request. When specified, it overrides HttpRequest for the task. Note that if the value is set to HttpMethod the HttpRequest of the task will be ignored at execution time.",
    ).optional(),
    oauthToken: z.object({
      scope: z.string().describe(
        'OAuth scope to be used for generating OAuth access token. If not specified, "https://www.googleapis.com/auth/cloud-platform" will be used.',
      ).optional(),
      serviceAccountEmail: z.string().describe(
        "[Service account email](https://cloud.google.com/iam/docs/service-accounts) to be used for generating OAuth token. The service account must be within the same project as the queue. The caller must have iam.serviceAccounts.actAs permission for the service account.",
      ).optional(),
    }).describe(
      "Contains information needed for generating an [OAuth token](https://developers.google.com/identity/protocols/OAuth2). This type of authorization should generally only be used when calling Google APIs hosted on *.googleapis.com.",
    ).optional(),
    oidcToken: z.object({
      audience: z.string().describe(
        "Audience to be used when generating OIDC token. If not specified, the URI specified in target will be used.",
      ).optional(),
      serviceAccountEmail: z.string().describe(
        "[Service account email](https://cloud.google.com/iam/docs/service-accounts) to be used for generating OIDC token. The service account must be within the same project as the queue. The caller must have iam.serviceAccounts.actAs permission for the service account.",
      ).optional(),
    }).describe(
      "Contains information needed for generating an [OpenID Connect token](https://developers.google.com/identity/protocols/OpenIDConnect). This type of authorization can be used for many scenarios, including calling Cloud Run, or endpoints where you intend to validate the token yourself.",
    ).optional(),
    uriOverride: z.object({
      host: z.string().describe(
        'Host override. When specified, replaces the host part of the task URL. For example, if the task URL is "https://www.google.com," and host value is set to "example.net", the overridden URI will be changed to "https://example.net." Host value cannot be an empty string (INVALID_ARGUMENT).',
      ).optional(),
      pathOverride: z.object({
        path: z.string().describe(
          "The URI path (e.g., /users/1234). Default is an empty string.",
        ).optional(),
      }).describe(
        "PathOverride. Path message defines path override for HTTP targets.",
      ).optional(),
      port: z.string().describe(
        'Port override. When specified, replaces the port part of the task URI. For instance, for a URI "https://www.example.com/example" and port=123, the overridden URI becomes "https://www.example.com:123/example". Note that the port value must be a positive integer. Setting the port to 0 (Zero) clears the URI port.',
      ).optional(),
      queryOverride: z.object({
        queryParams: z.string().describe(
          "The query parameters (e.g., qparam1=123&qparam2=456). Default is an empty string.",
        ).optional(),
      }).describe(
        "QueryOverride. Query message defines query override for HTTP targets.",
      ).optional(),
      scheme: z.enum(["SCHEME_UNSPECIFIED", "HTTP", "HTTPS"]).describe(
        "Scheme override. When specified, the task URI scheme is replaced by the provided value (HTTP or HTTPS).",
      ).optional(),
      uriOverrideEnforceMode: z.enum([
        "URI_OVERRIDE_ENFORCE_MODE_UNSPECIFIED",
        "IF_NOT_EXISTS",
        "ALWAYS",
      ]).describe(
        "URI Override Enforce Mode When specified, determines the Target UriOverride mode. If not specified, it defaults to ALWAYS.",
      ).optional(),
    }).describe(
      "URI Override. When specified, all the HTTP tasks inside the queue will be partially or fully overridden depending on the configured values.",
    ).optional(),
  }).describe(
    "HTTP target. When specified as a Queue, all the tasks with [HttpRequest] will be overridden according to the target.",
  ).optional(),
  rateLimits: z.object({
    maxBurstSize: z.number().int().describe(
      "Output only. The max burst size. Max burst size limits how fast tasks in queue are processed when many tasks are in the queue and the rate is high. This field allows the queue to have a high rate so processing starts shortly after a task is enqueued, but still limits resource usage when many tasks are enqueued in a short period of time. The [token bucket](https://wikipedia.org/wiki/Token_Bucket) algorithm is used to control the rate of task dispatches. Each queue has a token bucket that holds tokens, up to the maximum specified by `max_burst_size`. Each time a task is dispatched, a token is removed from the bucket. Tasks will be dispatched until the queue's bucket runs out of tokens. The bucket will be continuously refilled with new tokens based on `max_dispatches_per_second`. Cloud Tasks automatically sets an appropriate `max_burst_size` based on the value of `max_dispatches_per_second`. The value is dynamically optimized to ensure queue stability and throughput. It is generally at least equal to `max_dispatches_per_second` but might be higher to accommodate bursts of traffic. For queues that were created or updated using `queue.yaml/xml`, `max_burst_size` is equal to [bucket_size](https://cloud.google.com/appengine/docs/standard/python/config/queueref#bucket_size). Since `max_burst_size` is output only, if UpdateQueue is called on a queue created by `queue.yaml/xml`, `max_burst_size` will be reset based on the value of `max_dispatches_per_second`, regardless of whether `max_dispatches_per_second` is updated.",
    ).optional(),
    maxConcurrentDispatches: z.number().int().describe(
      "The maximum number of concurrent tasks that Cloud Tasks allows to be dispatched for this queue. After this threshold has been reached, Cloud Tasks stops dispatching tasks until the number of concurrent requests decreases. If unspecified when the queue is created, Cloud Tasks will pick the default. The maximum allowed value is 5,000. This field has the same meaning as [max_concurrent_requests in queue.yaml/xml](https://cloud.google.com/appengine/docs/standard/python/config/queueref#max_concurrent_requests).",
    ).optional(),
    maxDispatchesPerSecond: z.number().describe(
      "The maximum rate at which tasks are dispatched from this queue. If unspecified when the queue is created, Cloud Tasks will pick the default. The maximum allowed value is 500. This field has the same meaning as [rate in queue.yaml/xml](https://cloud.google.com/appengine/docs/standard/python/config/queueref#rate).",
    ).optional(),
  }).describe(
    "Rate limits. This message determines the maximum rate that tasks can be dispatched by a queue, regardless of whether the dispatch is a first task attempt or a retry. Note: The debugging command, RunTask, will run a task even if the queue has reached its RateLimits.",
  ).optional(),
  retryConfig: z.object({
    maxAttempts: z.number().int().describe(
      "Number of attempts per task, including the first attempt. (If the first attempt fails, there will be `max_attempts - 1` retries.) Must be greater than or equal to -1, which indicates unlimited attempts. Cloud Tasks stops retrying only when `max_attempts` and `max_retry_duration` are both satisfied, or when the task is successfully executed. When the task has been attempted `max_attempts` times and when the `max_retry_duration` time has passed, no further attempts are made, and the task is deleted. If `max_attempts` is set to -1 and `max_retry_duration` is set to 0, the task is retried until the [maximum task retention](https://docs.cloud.google.com/tasks/docs/quotas#limits) limit is reached. If unspecified when the queue is created, Cloud Tasks will pick the default. This field has the same meaning as [task_retry_limit in queue.yaml/xml](https://cloud.google.com/appengine/docs/standard/python/config/queueref#retry_parameters).",
    ).optional(),
    maxBackoff: z.string().describe(
      'A task will be scheduled for retry between min_backoff and max_backoff duration after it fails, if the queue\'s RetryConfig specifies that the task should be retried. The value must be given as a string that indicates the length of time (in seconds) followed by `s` (for "seconds"). For more information on the format, see the documentation for [Duration](https://protobuf.dev/reference/protobuf/google.protobuf/#duration). `max_backoff` will be truncated to the nearest second. If unspecified when the queue is created, Cloud Tasks will pick the default. This field has the same meaning as [max_backoff_seconds in queue.yaml/xml](https://cloud.google.com/appengine/docs/standard/python/config/queueref#retry_parameters).',
    ).optional(),
    maxDoublings: z.number().int().describe(
      "The time between retries will double `max_doublings` times. A task's retry interval starts at min_backoff, then doubles `max_doublings` times, then increases linearly, and finally retries at intervals of max_backoff up to max_attempts times. For example, if min_backoff is 10s, max_backoff is 300s, and `max_doublings` is 3, then the a task will first be retried in 10s. The retry interval will double three times, and then increase linearly by 2^3 * 10s. Finally, the task will retry at intervals of max_backoff until the task has been attempted max_attempts times. Thus, the requests will retry at 10s, 20s, 40s, 80s, 160s, 240s, 300s, 300s,.... If unspecified when the queue is created, Cloud Tasks will pick the default. This field has the same meaning as [max_doublings in queue.yaml/xml](https://cloud.google.com/appengine/docs/standard/python/config/queueref#retry_parameters).",
    ).optional(),
    maxRetryDuration: z.string().describe(
      'If positive, `max_retry_duration` specifies the time limit for retrying a failed task, measured from when the task was first attempted. Once `max_retry_duration` time has passed *and* the task has been attempted max_attempts times, no further attempts are made and the task is deleted. A zero (0) indicates an unlimited duration, up to the [maximum task retention](https://docs.cloud.google.com/tasks/docs/quotas#limits) limit. The value must be given as a string that indicates the length of time (in seconds) followed by `s` (for "seconds"). For the maximum possible value or the format, see the documentation for [Duration](https://protobuf.dev/reference/protobuf/google.protobuf/#duration). `max_retry_duration` will be truncated to the nearest second. If unspecified when the queue is created, Cloud Tasks will pick the default. This field has the same meaning as [task_age_limit in queue.yaml/xml](https://cloud.google.com/appengine/docs/standard/python/config/queueref#retry_parameters).',
    ).optional(),
    minBackoff: z.string().describe(
      'A task will be scheduled for retry between min_backoff and max_backoff duration after it fails, if the queue\'s RetryConfig specifies that the task should be retried. The value must be given as a string that indicates the length of time (in seconds) followed by `s` (for "seconds"). For more information on the format, see the documentation for [Duration](https://protobuf.dev/reference/protobuf/google.protobuf/#duration). `min_backoff` will be truncated to the nearest second. If unspecified when the queue is created, Cloud Tasks will pick the default. This field has the same meaning as [min_backoff_seconds in queue.yaml/xml](https://cloud.google.com/appengine/docs/standard/python/config/queueref#retry_parameters).',
    ).optional(),
  }).describe(
    "Retry config. These settings determine when a failed task attempt is retried.",
  ).optional(),
  stackdriverLoggingConfig: z.object({
    samplingRatio: z.number().describe(
      "Specifies the fraction of operations to write to [Stackdriver Logging](https://cloud.google.com/logging/docs/). This field may contain any value between 0.0 and 1.0, inclusive. 0.0 is the default and means that no operations are logged.",
    ).optional(),
  }).describe(
    "Configuration options for writing logs to [Stackdriver Logging](https://cloud.google.com/logging/docs/).",
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

/** Swamp extension model for Google Cloud Tasks Queues. Registered at `@swamp/gcp/cloudtasks/queues`. */
export const model = {
  type: "@swamp/gcp/cloudtasks/queues",
  version: "2026.06.08.1",
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
      toVersion: "2026.05.31.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A queue is a container of related tasks. Queues are configured to manage how ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a queues",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["appEngineRoutingOverride"] !== undefined) {
          body["appEngineRoutingOverride"] = g["appEngineRoutingOverride"];
        }
        if (g["httpTarget"] !== undefined) body["httpTarget"] = g["httpTarget"];
        if (g["rateLimits"] !== undefined) body["rateLimits"] = g["rateLimits"];
        if (g["retryConfig"] !== undefined) {
          body["retryConfig"] = g["retryConfig"];
        }
        if (g["stackdriverLoggingConfig"] !== undefined) {
          body["stackdriverLoggingConfig"] = g["stackdriverLoggingConfig"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["RUNNING"],
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
          credentials,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? "current").replace(
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
    get: {
      description: "Get a queues",
      arguments: z.object({
        identifier: z.string().describe("The name of the queues"),
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
      description: "Update queues attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
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
        if (g["appEngineRoutingOverride"] !== undefined) {
          body["appEngineRoutingOverride"] = g["appEngineRoutingOverride"];
        }
        if (g["httpTarget"] !== undefined) body["httpTarget"] = g["httpTarget"];
        if (g["rateLimits"] !== undefined) body["rateLimits"] = g["rateLimits"];
        if (g["retryConfig"] !== undefined) {
          body["retryConfig"] = g["retryConfig"];
        }
        if (g["stackdriverLoggingConfig"] !== undefined) {
          body["stackdriverLoggingConfig"] = g["stackdriverLoggingConfig"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["RUNNING"],
              "failedValues": [],
            }
            : undefined,
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
      description: "Delete the queues",
      arguments: z.object({
        identifier: z.string().describe("The name of the queues"),
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
      description: "Sync queues state from GCP",
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
      description: "List queues resources",
      arguments: z.object({
        filter: z.string().describe(
          '`filter` can be used to specify a subset of queues. Any Queue field can be used as a filter and several operators as supported. For example: `<=, <, >=, >, !=, =, :`. The filter syntax is the same as described in [Stackdriver\'s Advanced Logs Filters](https://cloud.google.com/logging/docs/view/advanced_filters). Sample filter "state: PAUSED". Note that using filters might cause fewer queues than the requested page_size to be returned.',
        ).optional(),
        pageSize: z.number().describe(
          "Requested page size. The maximum page size is 9800. If unspecified, the page size will be the maximum. Fewer queues than requested might be returned, even if more queues exist; use the next_page_token in the response to determine if more queues exist.",
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
          "queues",
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
        options: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
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
        if (args["options"] !== undefined) body["options"] = args["options"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "cloudtasks.projects.locations.queues.getIamPolicy",
            "path": "v2/{+resource}:getIamPolicy",
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
    pause: {
      description: "pause",
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
            "id": "cloudtasks.projects.locations.queues.pause",
            "path": "v2/{+name}:pause",
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
    purge: {
      description: "purge",
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
            "id": "cloudtasks.projects.locations.queues.purge",
            "path": "v2/{+name}:purge",
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
    resume: {
      description: "resume",
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
            "id": "cloudtasks.projects.locations.queues.resume",
            "path": "v2/{+name}:resume",
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
    set_iam_policy: {
      description: "set iam policy",
      arguments: z.object({
        policy: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
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
        const result = await createResource(
          BASE_URL,
          {
            "id": "cloudtasks.projects.locations.queues.setIamPolicy",
            "path": "v2/{+resource}:setIamPolicy",
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
          BASE_URL,
          {
            "id": "cloudtasks.projects.locations.queues.testIamPermissions",
            "path": "v2/{+resource}:testIamPermissions",
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
