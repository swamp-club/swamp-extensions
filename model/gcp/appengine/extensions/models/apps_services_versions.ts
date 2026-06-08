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

// Auto-generated extension model for @swamp/gcp/appengine/apps-services-versions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud App Engine Admin Apps.Services.Versions.
 *
 * A Version resource is a specific set of source code and configuration files that are deployed into a service.
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

const BASE_URL = "https://appengine.googleapis.com/";

const GET_CONFIG = {
  "id": "appengine.apps.services.versions.get",
  "path": "v1/apps/{appsId}/services/{servicesId}/versions/{versionsId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "appsId",
    "servicesId",
    "versionsId",
  ],
  "parameters": {
    "appsId": {
      "location": "path",
      "required": true,
    },
    "servicesId": {
      "location": "path",
      "required": true,
    },
    "versionsId": {
      "location": "path",
      "required": true,
    },
    "view": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "appengine.apps.services.versions.create",
  "path": "v1/apps/{appsId}/services/{servicesId}/versions",
  "httpMethod": "POST",
  "parameterOrder": [
    "appsId",
    "servicesId",
  ],
  "parameters": {
    "appsId": {
      "location": "path",
      "required": true,
    },
    "servicesId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "appengine.apps.services.versions.patch",
  "path": "v1/apps/{appsId}/services/{servicesId}/versions/{versionsId}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "appsId",
    "servicesId",
    "versionsId",
  ],
  "parameters": {
    "appsId": {
      "location": "path",
      "required": true,
    },
    "servicesId": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
    "versionsId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "appengine.apps.services.versions.delete",
  "path": "v1/apps/{appsId}/services/{servicesId}/versions/{versionsId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "appsId",
    "servicesId",
    "versionsId",
  ],
  "parameters": {
    "appsId": {
      "location": "path",
      "required": true,
    },
    "servicesId": {
      "location": "path",
      "required": true,
    },
    "versionsId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "appengine.apps.services.versions.list",
  "path": "v1/apps/{appsId}/services/{servicesId}/versions",
  "httpMethod": "GET",
  "parameterOrder": [
    "appsId",
    "servicesId",
  ],
  "parameters": {
    "appsId": {
      "location": "path",
      "required": true,
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "servicesId": {
      "location": "path",
      "required": true,
    },
    "view": {
      "location": "query",
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
  apiConfig: z.object({
    authFailAction: z.enum([
      "AUTH_FAIL_ACTION_UNSPECIFIED",
      "AUTH_FAIL_ACTION_REDIRECT",
      "AUTH_FAIL_ACTION_UNAUTHORIZED",
    ]).describe(
      "Action to take when users access resources that require authentication. Defaults to redirect.",
    ).optional(),
    login: z.enum([
      "LOGIN_UNSPECIFIED",
      "LOGIN_OPTIONAL",
      "LOGIN_ADMIN",
      "LOGIN_REQUIRED",
    ]).describe(
      "Level of login required to access this resource. Defaults to optional.",
    ).optional(),
    script: z.string().describe(
      "Path to the script from the application root directory.",
    ).optional(),
    securityLevel: z.enum([
      "SECURE_UNSPECIFIED",
      "SECURE_DEFAULT",
      "SECURE_NEVER",
      "SECURE_OPTIONAL",
      "SECURE_ALWAYS",
    ]).describe("Security (HTTPS) enforcement for this URL.").optional(),
    url: z.string().describe("URL to serve the endpoint at.").optional(),
  }).describe(
    "Google Cloud Endpoints (https://cloud.google.com/endpoints) configuration for API handlers.",
  ).optional(),
  appEngineApis: z.boolean().describe(
    "Allows App Engine second generation runtimes to access the legacy bundled services.",
  ).optional(),
  automaticScaling: z.object({
    coolDownPeriod: z.string().describe(
      "The time period that the Autoscaler (https://cloud.google.com/compute/docs/autoscaler/) should wait before it starts collecting information from a new instance. This prevents the autoscaler from collecting information when the instance is initializing, during which the collected usage would not be reliable. Only applicable in the App Engine flexible environment.",
    ).optional(),
    cpuUtilization: z.object({
      aggregationWindowLength: z.string().describe(
        "Period of time over which CPU utilization is calculated.",
      ).optional(),
      targetUtilization: z.number().describe(
        "Target CPU utilization ratio to maintain when scaling. Must be between 0 and 1.",
      ).optional(),
    }).describe("Target scaling by CPU usage.").optional(),
    diskUtilization: z.object({
      targetReadBytesPerSecond: z.number().int().describe(
        "Target bytes read per second.",
      ).optional(),
      targetReadOpsPerSecond: z.number().int().describe(
        "Target ops read per seconds.",
      ).optional(),
      targetWriteBytesPerSecond: z.number().int().describe(
        "Target bytes written per second.",
      ).optional(),
      targetWriteOpsPerSecond: z.number().int().describe(
        "Target ops written per second.",
      ).optional(),
    }).describe(
      "Target scaling by disk usage. Only applicable in the App Engine flexible environment.",
    ).optional(),
    maxConcurrentRequests: z.number().int().describe(
      "Number of concurrent requests an automatic scaling instance can accept before the scheduler spawns a new instance.Defaults to a runtime-specific value.",
    ).optional(),
    maxIdleInstances: z.number().int().describe(
      "Maximum number of idle instances that should be maintained for this version.",
    ).optional(),
    maxPendingLatency: z.string().describe(
      "Maximum amount of time that a request should wait in the pending queue before starting a new instance to handle it.",
    ).optional(),
    maxTotalInstances: z.number().int().describe(
      "Maximum number of instances that should be started to handle requests for this version.",
    ).optional(),
    minIdleInstances: z.number().int().describe(
      "Minimum number of idle instances that should be maintained for this version. Only applicable for the default version of a service.",
    ).optional(),
    minPendingLatency: z.string().describe(
      "Minimum amount of time a request should wait in the pending queue before starting a new instance to handle it.",
    ).optional(),
    minTotalInstances: z.number().int().describe(
      "Minimum number of running instances that should be maintained for this version.",
    ).optional(),
    networkUtilization: z.object({
      targetReceivedBytesPerSecond: z.number().int().describe(
        "Target bytes received per second.",
      ).optional(),
      targetReceivedPacketsPerSecond: z.number().int().describe(
        "Target packets received per second.",
      ).optional(),
      targetSentBytesPerSecond: z.number().int().describe(
        "Target bytes sent per second.",
      ).optional(),
      targetSentPacketsPerSecond: z.number().int().describe(
        "Target packets sent per second.",
      ).optional(),
    }).describe(
      "Target scaling by network usage. Only applicable in the App Engine flexible environment.",
    ).optional(),
    requestUtilization: z.object({
      targetConcurrentRequests: z.number().int().describe(
        "Target number of concurrent requests.",
      ).optional(),
      targetRequestCountPerSecond: z.number().int().describe(
        "Target requests per second.",
      ).optional(),
    }).describe(
      "Target scaling by request utilization. Only applicable in the App Engine flexible environment.",
    ).optional(),
    standardSchedulerSettings: z.object({
      maxInstances: z.number().int().describe(
        "Maximum number of instances to run for this version. Set to 2147483647 to disable max_instances configuration.",
      ).optional(),
      minInstances: z.number().int().describe(
        "Minimum number of instances to run for this version. Set to zero to disable min_instances configuration.",
      ).optional(),
      targetCpuUtilization: z.number().describe(
        "Target CPU utilization ratio to maintain when scaling.",
      ).optional(),
      targetThroughputUtilization: z.number().describe(
        "Target throughput utilization ratio to maintain when scaling",
      ).optional(),
    }).describe("Scheduler settings for standard environment.").optional(),
  }).describe(
    "Automatic scaling is based on request rate, response latencies, and other application metrics.",
  ).optional(),
  basicScaling: z.object({
    idleTimeout: z.string().describe(
      "Duration of time after the last request that an instance must wait before the instance is shut down.",
    ).optional(),
    maxInstances: z.number().int().describe(
      "Maximum number of instances to create for this version.",
    ).optional(),
  }).describe(
    "A service with basic scaling will create an instance when the application receives a request. The instance will be turned down when the app becomes idle. Basic scaling is ideal for work that is intermittent or driven by user activity.",
  ).optional(),
  betaSettings: z.record(z.string(), z.string()).describe(
    "Metadata settings that are supplied to this version to enable beta runtime features.",
  ).optional(),
  buildEnvVariables: z.record(z.string(), z.string()).describe(
    "Environment variables available to the build environment.Only returned in GET requests if view=FULL is set.",
  ).optional(),
  createTime: z.string().describe(
    "Time that this version was created.@OutputOnly",
  ).optional(),
  defaultExpiration: z.string().describe(
    "Duration that static files should be cached by web proxies and browsers. Only applicable if the corresponding StaticFilesHandler (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#StaticFilesHandler) does not specify its own expiration time.Only returned in GET requests if view=FULL is set.",
  ).optional(),
  deployment: z.object({
    cloudBuildOptions: z.object({
      appYamlPath: z.string().describe(
        "Path to the yaml file used in deployment, used to determine runtime configuration details.Required for flexible environment builds.See https://cloud.google.com/appengine/docs/standard/python/config/appref for more details.",
      ).optional(),
      cloudBuildTimeout: z.string().describe(
        "The Cloud Build timeout used as part of any dependent builds performed by version creation. Defaults to 10 minutes.",
      ).optional(),
    }).describe(
      "Options for the build operations performed as a part of the version deployment. Only applicable for App Engine flexible environment when creating a version using source code directly.",
    ).optional(),
    container: z.object({
      image: z.string().describe(
        'URI to the hosted container image in Google Container Registry. The URI must be fully qualified and include a tag or digest. Examples: "gcr.io/my-project/image:tag" or "gcr.io/my-project/image@digest"',
      ).optional(),
    }).describe(
      "Docker image that is used to create a container and start a VM instance for the version that you deploy. Only applicable for instances running in the App Engine flexible environment.",
    ).optional(),
    files: z.record(
      z.string(),
      z.object({
        mimeType: z.string().describe(
          "The MIME type of the file.Defaults to the value from Google Cloud Storage.",
        ).optional(),
        sha1Sum: z.string().describe("The SHA1 hash of the file, in hex.")
          .optional(),
        sourceUrl: z.string().describe(
          "URL source to use to fetch this file. Must be a URL to a resource in Google Cloud Storage in the form 'http(s)://storage.googleapis.com//'.",
        ).optional(),
      }),
    ).describe(
      "Manifest of the files stored in Google Cloud Storage that are included as part of this version. All files must be readable using the credentials supplied with this call.",
    ).optional(),
    zip: z.object({
      filesCount: z.number().int().describe(
        "An estimate of the number of files in a zip for a zip deployment. If set, must be greater than or equal to the actual number of files. Used for optimizing performance; if not provided, deployment may be slow.",
      ).optional(),
      sourceUrl: z.string().describe(
        "URL of the zip file to deploy from. Must be a URL to a resource in Google Cloud Storage in the form 'http(s)://storage.googleapis.com//'.",
      ).optional(),
    }).describe("The zip file information for a zip deployment.").optional(),
  }).describe(
    "Code and application artifacts used to deploy a version to App Engine.",
  ).optional(),
  endpointsApiService: z.object({
    configId: z.string().describe(
      'Endpoints service configuration ID as specified by the Service Management API. For example "2016-09-19r1".By default, the rollout strategy for Endpoints is RolloutStrategy.FIXED. This means that Endpoints starts up with a particular configuration ID. When a new configuration is rolled out, Endpoints must be given the new configuration ID. The config_id field is used to give the configuration ID and is required in this case.Endpoints also has a rollout strategy called RolloutStrategy.MANAGED. When using this, Endpoints fetches the latest configuration and does not need the configuration ID. In this case, config_id must be omitted.',
    ).optional(),
    disableTraceSampling: z.boolean().describe(
      "Enable or disable trace sampling. By default, this is set to false for enabled.",
    ).optional(),
    name: z.string().describe(
      'Endpoints service name which is the name of the "service" resource in the Service Management API. For example "myapi.endpoints.myproject.cloud.goog"',
    ).optional(),
    rolloutStrategy: z.enum([
      "UNSPECIFIED_ROLLOUT_STRATEGY",
      "FIXED",
      "MANAGED",
    ]).describe(
      "Endpoints rollout strategy. If FIXED, config_id must be specified. If MANAGED, config_id must be omitted.",
    ).optional(),
  }).describe(
    'Google Cloud Endpoints (https://cloud.google.com/endpoints) configuration. The Endpoints API Service provides tooling for serving Open API and gRPC endpoints via an NGINX proxy. Only valid for App Engine Flexible environment deployments.The fields here refer to the name and configuration ID of a "service" resource in the Service Management API (https://cloud.google.com/service-management/overview).',
  ).optional(),
  entrypoint: z.object({
    shell: z.string().describe(
      "The format should be a shell command that can be fed to bash -c.",
    ).optional(),
  }).describe("The entrypoint for the application.").optional(),
  env: z.string().describe(
    "App Engine execution environment for this version.Defaults to standard.",
  ).optional(),
  envVariables: z.record(z.string(), z.string()).describe(
    "Environment variables available to the application.Only returned in GET requests if view=FULL is set.",
  ).optional(),
  errorHandlers: z.array(z.object({
    errorCode: z.enum([
      "ERROR_CODE_UNSPECIFIED",
      "ERROR_CODE_DEFAULT",
      "ERROR_CODE_OVER_QUOTA",
      "ERROR_CODE_DOS_API_DENIAL",
      "ERROR_CODE_TIMEOUT",
    ]).describe("Error condition this handler applies to.").optional(),
    mimeType: z.string().describe("MIME type of file. Defaults to text/html.")
      .optional(),
    staticFile: z.string().describe(
      "Static file content to be served for this error.",
    ).optional(),
  })).describe(
    "Custom static error pages. Limited to 10KB per page.Only returned in GET requests if view=FULL is set.",
  ).optional(),
  flexibleRuntimeSettings: z.object({
    operatingSystem: z.string().describe(
      "The operating system of the application runtime.",
    ).optional(),
    runtimeVersion: z.string().describe(
      "The runtime version of an App Engine flexible application.",
    ).optional(),
  }).describe("Runtime settings for the App Engine flexible environment.")
    .optional(),
  generatedCustomerMetadata: z.record(z.string(), z.string()).describe(
    "Additional Google Generated Customer Metadata, this field won't be provided by default and can be requested by setting the IncludeExtraData field in GetVersionRequest",
  ).optional(),
  handlers: z.array(z.object({
    apiEndpoint: z.object({
      scriptPath: z.string().describe(
        "Path to the script from the application root directory.",
      ).optional(),
    }).describe("Uses Google Cloud Endpoints to handle requests.").optional(),
    authFailAction: z.enum([
      "AUTH_FAIL_ACTION_UNSPECIFIED",
      "AUTH_FAIL_ACTION_REDIRECT",
      "AUTH_FAIL_ACTION_UNAUTHORIZED",
    ]).describe(
      "Action to take when users access resources that require authentication. Defaults to redirect.",
    ).optional(),
    login: z.enum([
      "LOGIN_UNSPECIFIED",
      "LOGIN_OPTIONAL",
      "LOGIN_ADMIN",
      "LOGIN_REQUIRED",
    ]).describe(
      "Level of login required to access this resource. Not supported for Node.js in the App Engine standard environment.",
    ).optional(),
    redirectHttpResponseCode: z.enum([
      "REDIRECT_HTTP_RESPONSE_CODE_UNSPECIFIED",
      "REDIRECT_HTTP_RESPONSE_CODE_301",
      "REDIRECT_HTTP_RESPONSE_CODE_302",
      "REDIRECT_HTTP_RESPONSE_CODE_303",
      "REDIRECT_HTTP_RESPONSE_CODE_307",
    ]).describe(
      "30x code to use when performing redirects for the secure field. Defaults to 302.",
    ).optional(),
    script: z.object({
      scriptPath: z.string().describe(
        "Path to the script from the application root directory.",
      ).optional(),
    }).describe(
      "Executes a script to handle the request that matches the URL pattern.",
    ).optional(),
    securityLevel: z.enum([
      "SECURE_UNSPECIFIED",
      "SECURE_DEFAULT",
      "SECURE_NEVER",
      "SECURE_OPTIONAL",
      "SECURE_ALWAYS",
    ]).describe("Security (HTTPS) enforcement for this URL.").optional(),
    staticFiles: z.object({
      applicationReadable: z.boolean().describe(
        "Whether files should also be uploaded as code data. By default, files declared in static file handlers are uploaded as static data and are only served to end users; they cannot be read by the application. If enabled, uploads are charged against both your code and static data storage resource quotas.",
      ).optional(),
      expiration: z.string().describe(
        "Time a static file served by this handler should be cached by web proxies and browsers.",
      ).optional(),
      httpHeaders: z.record(z.string(), z.string()).describe(
        "HTTP headers to use for all responses from these URLs.",
      ).optional(),
      mimeType: z.string().describe(
        "MIME type used to serve all files served by this handler.Defaults to file-specific MIME types, which are derived from each file's filename extension.",
      ).optional(),
      path: z.string().describe(
        "Path to the static files matched by the URL pattern, from the application root directory. The path can refer to text matched in groupings in the URL pattern.",
      ).optional(),
      requireMatchingFile: z.boolean().describe(
        "Whether this handler should match the request if the file referenced by the handler does not exist.",
      ).optional(),
      uploadPathRegex: z.string().describe(
        "Regular expression that matches the file paths for all files that should be referenced by this handler.",
      ).optional(),
    }).describe(
      "Files served directly to the user for a given URL, such as images, CSS stylesheets, or JavaScript source files. Static file handlers describe which files in the application directory are static files, and which URLs serve them.",
    ).optional(),
    urlRegex: z.string().describe(
      "URL prefix. Uses regular expression syntax, which means regexp special characters must be escaped, but should not contain groupings. All URLs that begin with this prefix are handled by this handler, using the portion of the URL after the prefix as part of the file path.",
    ).optional(),
  })).describe(
    "An ordered list of URL-matching patterns that should be applied to incoming requests. The first matching URL handles the request and other request handlers are not attempted.Only returned in GET requests if view=FULL is set.",
  ).optional(),
  healthCheck: z.object({
    checkInterval: z.string().describe("Interval between health checks.")
      .optional(),
    disableHealthCheck: z.boolean().describe(
      "Whether to explicitly disable health checks for this instance.",
    ).optional(),
    healthyThreshold: z.number().int().describe(
      "Number of consecutive successful health checks required before receiving traffic.",
    ).optional(),
    host: z.string().describe(
      'Host header to send when performing an HTTP health check. Example: "myapp.appspot.com"',
    ).optional(),
    restartThreshold: z.number().int().describe(
      "Number of consecutive failed health checks required before an instance is restarted.",
    ).optional(),
    timeout: z.string().describe(
      "Time before the health check is considered failed.",
    ).optional(),
    unhealthyThreshold: z.number().int().describe(
      "Number of consecutive failed health checks required before removing traffic.",
    ).optional(),
  }).describe(
    "Health checking configuration for VM instances. Unhealthy instances are killed and replaced with new instances. Only applicable for instances in App Engine flexible environment.",
  ).optional(),
  id: z.string().describe(
    'Relative name of the version within the service. Example: v1. Version names can contain only lowercase letters, numbers, or hyphens. Reserved names: "default", "latest", and any name with the prefix "ah-".',
  ).optional(),
  inboundServices: z.array(
    z.enum([
      "INBOUND_SERVICE_UNSPECIFIED",
      "INBOUND_SERVICE_MAIL",
      "INBOUND_SERVICE_MAIL_BOUNCE",
      "INBOUND_SERVICE_XMPP_ERROR",
      "INBOUND_SERVICE_XMPP_MESSAGE",
      "INBOUND_SERVICE_XMPP_SUBSCRIBE",
      "INBOUND_SERVICE_XMPP_PRESENCE",
      "INBOUND_SERVICE_CHANNEL_PRESENCE",
      "INBOUND_SERVICE_WARMUP",
    ]),
  ).describe(
    "Before an application can receive email or XMPP messages, the application must be configured to enable the service.",
  ).optional(),
  instanceClass: z.string().describe(
    "Instance class that is used to run this version. Valid values are: AutomaticScaling: F1, F2, F4, F4_1G ManualScaling or BasicScaling: B1, B2, B4, B8, B4_1GDefaults to F1 for AutomaticScaling and B1 for ManualScaling or BasicScaling.",
  ).optional(),
  libraries: z.array(z.object({
    name: z.string().describe('Name of the library. Example: "django".')
      .optional(),
    version: z.string().describe(
      'Version of the library to select, or "latest".',
    ).optional(),
  })).describe(
    "Configuration for third-party Python runtime libraries that are required by the application.Only returned in GET requests if view=FULL is set.",
  ).optional(),
  livenessCheck: z.object({
    checkInterval: z.string().describe("Interval between health checks.")
      .optional(),
    failureThreshold: z.number().int().describe(
      "Number of consecutive failed checks required before considering the VM unhealthy.",
    ).optional(),
    host: z.string().describe(
      'Host header to send when performing a HTTP Liveness check. Example: "myapp.appspot.com"',
    ).optional(),
    initialDelay: z.string().describe(
      "The initial delay before starting to execute the checks.",
    ).optional(),
    path: z.string().describe("The request path.").optional(),
    successThreshold: z.number().int().describe(
      "Number of consecutive successful checks required before considering the VM healthy.",
    ).optional(),
    timeout: z.string().describe("Time before the check is considered failed.")
      .optional(),
  }).describe(
    "Health checking configuration for VM instances. Unhealthy instances are killed and replaced with new instances.",
  ).optional(),
  manualScaling: z.object({
    instances: z.number().int().describe(
      "Number of instances to assign to the service at the start. This number can later be altered by using the Modules API (https://cloud.google.com/appengine/docs/python/modules/functions) set_num_instances() function.",
    ).optional(),
  }).describe(
    "A service with manual scaling runs continuously, allowing you to perform complex initialization and rely on the state of its memory over time.",
  ).optional(),
  network: z.object({
    forwardedPorts: z.array(z.string()).describe(
      "List of ports, or port pairs, to forward from the virtual machine to the application container. Only applicable in the App Engine flexible environment.",
    ).optional(),
    instanceIpMode: z.enum([
      "INSTANCE_IP_MODE_UNSPECIFIED",
      "EXTERNAL",
      "INTERNAL",
    ]).describe(
      "The IP mode for instances. Only applicable in the App Engine flexible environment.",
    ).optional(),
    instanceTag: z.string().describe(
      "Tag to apply to the instance during creation. Only applicable in the App Engine flexible environment.",
    ).optional(),
    name: z.string().describe(
      "Google Compute Engine network where the virtual machines are created. Specify the short name, not the resource path.Defaults to default.",
    ).optional(),
    sessionAffinity: z.boolean().describe(
      "Enable session affinity. Only applicable in the App Engine flexible environment.",
    ).optional(),
    subnetworkName: z.string().describe(
      "Google Cloud Platform sub-network where the virtual machines are created. Specify the short name, not the resource path.If a subnetwork name is specified, a network name will also be required unless it is for the default network. If the network that the instance is being created in is a Legacy network, then the IP address is allocated from the IPv4Range. If the network that the instance is being created in is an auto Subnet Mode Network, then only network name should be specified (not the subnetwork_name) and the IP address is created from the IPCidrRange of the subnetwork that exists in that zone for that network. If the network that the instance is being created in is a custom Subnet Mode Network, then the subnetwork_name must be specified and the IP address is created from the IPCidrRange of the subnetwork.If specified, the subnetwork must exist in the same region as the App Engine flexible environment application.",
    ).optional(),
  }).describe(
    "Extra network settings. Only applicable in the App Engine flexible environment.",
  ).optional(),
  nobuildFilesRegex: z.string().describe(
    "Files that match this pattern will not be built into this version. Only applicable for Go runtimes.Only returned in GET requests if view=FULL is set.",
  ).optional(),
  readinessCheck: z.object({
    appStartTimeout: z.string().describe(
      "A maximum time limit on application initialization, measured from moment the application successfully replies to a healthcheck until it is ready to serve traffic.",
    ).optional(),
    checkInterval: z.string().describe("Interval between health checks.")
      .optional(),
    failureThreshold: z.number().int().describe(
      "Number of consecutive failed checks required before removing traffic.",
    ).optional(),
    host: z.string().describe(
      'Host header to send when performing a HTTP Readiness check. Example: "myapp.appspot.com"',
    ).optional(),
    path: z.string().describe("The request path.").optional(),
    successThreshold: z.number().int().describe(
      "Number of consecutive successful checks required before receiving traffic.",
    ).optional(),
    timeout: z.string().describe("Time before the check is considered failed.")
      .optional(),
  }).describe(
    "Readiness checking configuration for VM instances. Unhealthy instances are removed from traffic rotation.",
  ).optional(),
  resources: z.object({
    cpu: z.number().describe("Number of CPU cores needed.").optional(),
    diskGb: z.number().describe("Disk size (GB) needed.").optional(),
    kmsKeyReference: z.string().describe(
      "The name of the encryption key that is stored in Google Cloud KMS. Only should be used by Cloud Composer to encrypt the vm disk",
    ).optional(),
    memoryGb: z.number().describe("Memory (GB) needed.").optional(),
    volumes: z.array(z.object({
      name: z.string().describe("Unique name for the volume.").optional(),
      sizeGb: z.number().describe("Volume size in gigabytes.").optional(),
      volumeType: z.string().describe("Underlying volume type, e.g. 'tmpfs'.")
        .optional(),
    })).describe("User specified volumes.").optional(),
  }).describe("Machine resources for a version.").optional(),
  runtime: z.string().describe("Desired runtime. Example: python27.")
    .optional(),
  runtimeApiVersion: z.string().describe(
    "The version of the API in the given runtime environment. Please see the app.yaml reference for valid values at https://cloud.google.com/appengine/docs/standard//config/appref",
  ).optional(),
  runtimeChannel: z.string().describe(
    "The channel of the runtime to use. Only available for some runtimes. Defaults to the default channel.",
  ).optional(),
  runtimeMainExecutablePath: z.string().describe(
    "The path or name of the app's main executable.",
  ).optional(),
  serviceAccount: z.string().describe(
    "The identity that the deployed version will run as. Admin API will use the App Engine Appspot service account as default if this field is neither provided in app.yaml file nor through CLI flag.",
  ).optional(),
  servingStatus: z.enum(["SERVING_STATUS_UNSPECIFIED", "SERVING", "STOPPED"])
    .describe(
      "Current serving status of this version. Only the versions with a SERVING status create instances and can be billed.SERVING_STATUS_UNSPECIFIED is an invalid value. Defaults to SERVING.",
    ).optional(),
  threadsafe: z.boolean().describe(
    "Whether multiple requests can be dispatched to this version at once.",
  ).optional(),
  vm: z.boolean().describe(
    "Whether to deploy this version in a container on a virtual machine.",
  ).optional(),
  vpcAccessConnector: z.object({
    egressSetting: z.enum([
      "EGRESS_SETTING_UNSPECIFIED",
      "ALL_TRAFFIC",
      "PRIVATE_IP_RANGES",
    ]).describe(
      "The egress setting for the connector, controlling what traffic is diverted through it.",
    ).optional(),
    name: z.string().describe(
      "Full Serverless VPC Access Connector name e.g. projects/my-project/locations/us-central1/connectors/c1.",
    ).optional(),
  }).describe("VPC access connector specification.").optional(),
  zones: z.array(z.string()).describe(
    "The Google Compute Engine zones that are supported by this version in the App Engine flexible environment. Deprecated.",
  ).optional(),
  appsId: z.string().describe(
    "Part of `parent`. Required. Name of the parent resource to create this version under. Example: apps/myapp/services/default.",
  ),
  servicesId: z.string().describe(
    "Part of `parent`. See documentation of `appsId`.",
  ),
});

const StateSchema = z.object({
  apiConfig: z.object({
    authFailAction: z.string(),
    login: z.string(),
    script: z.string(),
    securityLevel: z.string(),
    url: z.string(),
  }).optional(),
  appEngineApis: z.boolean().optional(),
  automaticScaling: z.object({
    coolDownPeriod: z.string(),
    cpuUtilization: z.object({
      aggregationWindowLength: z.string(),
      targetUtilization: z.number(),
    }),
    diskUtilization: z.object({
      targetReadBytesPerSecond: z.number(),
      targetReadOpsPerSecond: z.number(),
      targetWriteBytesPerSecond: z.number(),
      targetWriteOpsPerSecond: z.number(),
    }),
    maxConcurrentRequests: z.number(),
    maxIdleInstances: z.number(),
    maxPendingLatency: z.string(),
    maxTotalInstances: z.number(),
    minIdleInstances: z.number(),
    minPendingLatency: z.string(),
    minTotalInstances: z.number(),
    networkUtilization: z.object({
      targetReceivedBytesPerSecond: z.number(),
      targetReceivedPacketsPerSecond: z.number(),
      targetSentBytesPerSecond: z.number(),
      targetSentPacketsPerSecond: z.number(),
    }),
    requestUtilization: z.object({
      targetConcurrentRequests: z.number(),
      targetRequestCountPerSecond: z.number(),
    }),
    standardSchedulerSettings: z.object({
      maxInstances: z.number(),
      minInstances: z.number(),
      targetCpuUtilization: z.number(),
      targetThroughputUtilization: z.number(),
    }),
  }).optional(),
  basicScaling: z.object({
    idleTimeout: z.string(),
    maxInstances: z.number(),
  }).optional(),
  betaSettings: z.record(z.string(), z.unknown()).optional(),
  buildEnvVariables: z.record(z.string(), z.unknown()).optional(),
  createTime: z.string().optional(),
  createdBy: z.string().optional(),
  defaultExpiration: z.string().optional(),
  deployment: z.object({
    cloudBuildOptions: z.object({
      appYamlPath: z.string(),
      cloudBuildTimeout: z.string(),
    }),
    container: z.object({
      image: z.string(),
    }),
    files: z.record(z.string(), z.unknown()),
    zip: z.object({
      filesCount: z.number(),
      sourceUrl: z.string(),
    }),
  }).optional(),
  diskUsageBytes: z.string().optional(),
  endpointsApiService: z.object({
    configId: z.string(),
    disableTraceSampling: z.boolean(),
    name: z.string(),
    rolloutStrategy: z.string(),
  }).optional(),
  entrypoint: z.object({
    shell: z.string(),
  }).optional(),
  env: z.string().optional(),
  envVariables: z.record(z.string(), z.unknown()).optional(),
  errorHandlers: z.array(z.object({
    errorCode: z.string(),
    mimeType: z.string(),
    staticFile: z.string(),
  })).optional(),
  flexibleRuntimeSettings: z.object({
    operatingSystem: z.string(),
    runtimeVersion: z.string(),
  }).optional(),
  generatedCustomerMetadata: z.record(z.string(), z.unknown()).optional(),
  handlers: z.array(z.object({
    apiEndpoint: z.object({
      scriptPath: z.string(),
    }),
    authFailAction: z.string(),
    login: z.string(),
    redirectHttpResponseCode: z.string(),
    script: z.object({
      scriptPath: z.string(),
    }),
    securityLevel: z.string(),
    staticFiles: z.object({
      applicationReadable: z.boolean(),
      expiration: z.string(),
      httpHeaders: z.record(z.string(), z.unknown()),
      mimeType: z.string(),
      path: z.string(),
      requireMatchingFile: z.boolean(),
      uploadPathRegex: z.string(),
    }),
    urlRegex: z.string(),
  })).optional(),
  healthCheck: z.object({
    checkInterval: z.string(),
    disableHealthCheck: z.boolean(),
    healthyThreshold: z.number(),
    host: z.string(),
    restartThreshold: z.number(),
    timeout: z.string(),
    unhealthyThreshold: z.number(),
  }).optional(),
  id: z.string().optional(),
  inboundServices: z.array(z.string()).optional(),
  instanceClass: z.string().optional(),
  libraries: z.array(z.object({
    name: z.string(),
    version: z.string(),
  })).optional(),
  livenessCheck: z.object({
    checkInterval: z.string(),
    failureThreshold: z.number(),
    host: z.string(),
    initialDelay: z.string(),
    path: z.string(),
    successThreshold: z.number(),
    timeout: z.string(),
  }).optional(),
  manualScaling: z.object({
    instances: z.number(),
  }).optional(),
  name: z.string(),
  network: z.object({
    forwardedPorts: z.array(z.string()),
    instanceIpMode: z.string(),
    instanceTag: z.string(),
    name: z.string(),
    sessionAffinity: z.boolean(),
    subnetworkName: z.string(),
  }).optional(),
  nobuildFilesRegex: z.string().optional(),
  readinessCheck: z.object({
    appStartTimeout: z.string(),
    checkInterval: z.string(),
    failureThreshold: z.number(),
    host: z.string(),
    path: z.string(),
    successThreshold: z.number(),
    timeout: z.string(),
  }).optional(),
  resources: z.object({
    cpu: z.number(),
    diskGb: z.number(),
    kmsKeyReference: z.string(),
    memoryGb: z.number(),
    volumes: z.array(z.object({
      name: z.string(),
      sizeGb: z.number(),
      volumeType: z.string(),
    })),
  }).optional(),
  runtime: z.string().optional(),
  runtimeApiVersion: z.string().optional(),
  runtimeChannel: z.string().optional(),
  runtimeMainExecutablePath: z.string().optional(),
  serviceAccount: z.string().optional(),
  servingStatus: z.string().optional(),
  threadsafe: z.boolean().optional(),
  versionUrl: z.string().optional(),
  vm: z.boolean().optional(),
  vpcAccessConnector: z.object({
    egressSetting: z.string(),
    name: z.string(),
  }).optional(),
  zones: z.array(z.string()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  apiConfig: z.object({
    authFailAction: z.enum([
      "AUTH_FAIL_ACTION_UNSPECIFIED",
      "AUTH_FAIL_ACTION_REDIRECT",
      "AUTH_FAIL_ACTION_UNAUTHORIZED",
    ]).describe(
      "Action to take when users access resources that require authentication. Defaults to redirect.",
    ).optional(),
    login: z.enum([
      "LOGIN_UNSPECIFIED",
      "LOGIN_OPTIONAL",
      "LOGIN_ADMIN",
      "LOGIN_REQUIRED",
    ]).describe(
      "Level of login required to access this resource. Defaults to optional.",
    ).optional(),
    script: z.string().describe(
      "Path to the script from the application root directory.",
    ).optional(),
    securityLevel: z.enum([
      "SECURE_UNSPECIFIED",
      "SECURE_DEFAULT",
      "SECURE_NEVER",
      "SECURE_OPTIONAL",
      "SECURE_ALWAYS",
    ]).describe("Security (HTTPS) enforcement for this URL.").optional(),
    url: z.string().describe("URL to serve the endpoint at.").optional(),
  }).describe(
    "Google Cloud Endpoints (https://cloud.google.com/endpoints) configuration for API handlers.",
  ).optional(),
  appEngineApis: z.boolean().describe(
    "Allows App Engine second generation runtimes to access the legacy bundled services.",
  ).optional(),
  automaticScaling: z.object({
    coolDownPeriod: z.string().describe(
      "The time period that the Autoscaler (https://cloud.google.com/compute/docs/autoscaler/) should wait before it starts collecting information from a new instance. This prevents the autoscaler from collecting information when the instance is initializing, during which the collected usage would not be reliable. Only applicable in the App Engine flexible environment.",
    ).optional(),
    cpuUtilization: z.object({
      aggregationWindowLength: z.string().describe(
        "Period of time over which CPU utilization is calculated.",
      ).optional(),
      targetUtilization: z.number().describe(
        "Target CPU utilization ratio to maintain when scaling. Must be between 0 and 1.",
      ).optional(),
    }).describe("Target scaling by CPU usage.").optional(),
    diskUtilization: z.object({
      targetReadBytesPerSecond: z.number().int().describe(
        "Target bytes read per second.",
      ).optional(),
      targetReadOpsPerSecond: z.number().int().describe(
        "Target ops read per seconds.",
      ).optional(),
      targetWriteBytesPerSecond: z.number().int().describe(
        "Target bytes written per second.",
      ).optional(),
      targetWriteOpsPerSecond: z.number().int().describe(
        "Target ops written per second.",
      ).optional(),
    }).describe(
      "Target scaling by disk usage. Only applicable in the App Engine flexible environment.",
    ).optional(),
    maxConcurrentRequests: z.number().int().describe(
      "Number of concurrent requests an automatic scaling instance can accept before the scheduler spawns a new instance.Defaults to a runtime-specific value.",
    ).optional(),
    maxIdleInstances: z.number().int().describe(
      "Maximum number of idle instances that should be maintained for this version.",
    ).optional(),
    maxPendingLatency: z.string().describe(
      "Maximum amount of time that a request should wait in the pending queue before starting a new instance to handle it.",
    ).optional(),
    maxTotalInstances: z.number().int().describe(
      "Maximum number of instances that should be started to handle requests for this version.",
    ).optional(),
    minIdleInstances: z.number().int().describe(
      "Minimum number of idle instances that should be maintained for this version. Only applicable for the default version of a service.",
    ).optional(),
    minPendingLatency: z.string().describe(
      "Minimum amount of time a request should wait in the pending queue before starting a new instance to handle it.",
    ).optional(),
    minTotalInstances: z.number().int().describe(
      "Minimum number of running instances that should be maintained for this version.",
    ).optional(),
    networkUtilization: z.object({
      targetReceivedBytesPerSecond: z.number().int().describe(
        "Target bytes received per second.",
      ).optional(),
      targetReceivedPacketsPerSecond: z.number().int().describe(
        "Target packets received per second.",
      ).optional(),
      targetSentBytesPerSecond: z.number().int().describe(
        "Target bytes sent per second.",
      ).optional(),
      targetSentPacketsPerSecond: z.number().int().describe(
        "Target packets sent per second.",
      ).optional(),
    }).describe(
      "Target scaling by network usage. Only applicable in the App Engine flexible environment.",
    ).optional(),
    requestUtilization: z.object({
      targetConcurrentRequests: z.number().int().describe(
        "Target number of concurrent requests.",
      ).optional(),
      targetRequestCountPerSecond: z.number().int().describe(
        "Target requests per second.",
      ).optional(),
    }).describe(
      "Target scaling by request utilization. Only applicable in the App Engine flexible environment.",
    ).optional(),
    standardSchedulerSettings: z.object({
      maxInstances: z.number().int().describe(
        "Maximum number of instances to run for this version. Set to 2147483647 to disable max_instances configuration.",
      ).optional(),
      minInstances: z.number().int().describe(
        "Minimum number of instances to run for this version. Set to zero to disable min_instances configuration.",
      ).optional(),
      targetCpuUtilization: z.number().describe(
        "Target CPU utilization ratio to maintain when scaling.",
      ).optional(),
      targetThroughputUtilization: z.number().describe(
        "Target throughput utilization ratio to maintain when scaling",
      ).optional(),
    }).describe("Scheduler settings for standard environment.").optional(),
  }).describe(
    "Automatic scaling is based on request rate, response latencies, and other application metrics.",
  ).optional(),
  basicScaling: z.object({
    idleTimeout: z.string().describe(
      "Duration of time after the last request that an instance must wait before the instance is shut down.",
    ).optional(),
    maxInstances: z.number().int().describe(
      "Maximum number of instances to create for this version.",
    ).optional(),
  }).describe(
    "A service with basic scaling will create an instance when the application receives a request. The instance will be turned down when the app becomes idle. Basic scaling is ideal for work that is intermittent or driven by user activity.",
  ).optional(),
  betaSettings: z.record(z.string(), z.string()).describe(
    "Metadata settings that are supplied to this version to enable beta runtime features.",
  ).optional(),
  buildEnvVariables: z.record(z.string(), z.string()).describe(
    "Environment variables available to the build environment.Only returned in GET requests if view=FULL is set.",
  ).optional(),
  createTime: z.string().describe(
    "Time that this version was created.@OutputOnly",
  ).optional(),
  defaultExpiration: z.string().describe(
    "Duration that static files should be cached by web proxies and browsers. Only applicable if the corresponding StaticFilesHandler (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#StaticFilesHandler) does not specify its own expiration time.Only returned in GET requests if view=FULL is set.",
  ).optional(),
  deployment: z.object({
    cloudBuildOptions: z.object({
      appYamlPath: z.string().describe(
        "Path to the yaml file used in deployment, used to determine runtime configuration details.Required for flexible environment builds.See https://cloud.google.com/appengine/docs/standard/python/config/appref for more details.",
      ).optional(),
      cloudBuildTimeout: z.string().describe(
        "The Cloud Build timeout used as part of any dependent builds performed by version creation. Defaults to 10 minutes.",
      ).optional(),
    }).describe(
      "Options for the build operations performed as a part of the version deployment. Only applicable for App Engine flexible environment when creating a version using source code directly.",
    ).optional(),
    container: z.object({
      image: z.string().describe(
        'URI to the hosted container image in Google Container Registry. The URI must be fully qualified and include a tag or digest. Examples: "gcr.io/my-project/image:tag" or "gcr.io/my-project/image@digest"',
      ).optional(),
    }).describe(
      "Docker image that is used to create a container and start a VM instance for the version that you deploy. Only applicable for instances running in the App Engine flexible environment.",
    ).optional(),
    files: z.record(
      z.string(),
      z.object({
        mimeType: z.string().describe(
          "The MIME type of the file.Defaults to the value from Google Cloud Storage.",
        ).optional(),
        sha1Sum: z.string().describe("The SHA1 hash of the file, in hex.")
          .optional(),
        sourceUrl: z.string().describe(
          "URL source to use to fetch this file. Must be a URL to a resource in Google Cloud Storage in the form 'http(s)://storage.googleapis.com//'.",
        ).optional(),
      }),
    ).describe(
      "Manifest of the files stored in Google Cloud Storage that are included as part of this version. All files must be readable using the credentials supplied with this call.",
    ).optional(),
    zip: z.object({
      filesCount: z.number().int().describe(
        "An estimate of the number of files in a zip for a zip deployment. If set, must be greater than or equal to the actual number of files. Used for optimizing performance; if not provided, deployment may be slow.",
      ).optional(),
      sourceUrl: z.string().describe(
        "URL of the zip file to deploy from. Must be a URL to a resource in Google Cloud Storage in the form 'http(s)://storage.googleapis.com//'.",
      ).optional(),
    }).describe("The zip file information for a zip deployment.").optional(),
  }).describe(
    "Code and application artifacts used to deploy a version to App Engine.",
  ).optional(),
  endpointsApiService: z.object({
    configId: z.string().describe(
      'Endpoints service configuration ID as specified by the Service Management API. For example "2016-09-19r1".By default, the rollout strategy for Endpoints is RolloutStrategy.FIXED. This means that Endpoints starts up with a particular configuration ID. When a new configuration is rolled out, Endpoints must be given the new configuration ID. The config_id field is used to give the configuration ID and is required in this case.Endpoints also has a rollout strategy called RolloutStrategy.MANAGED. When using this, Endpoints fetches the latest configuration and does not need the configuration ID. In this case, config_id must be omitted.',
    ).optional(),
    disableTraceSampling: z.boolean().describe(
      "Enable or disable trace sampling. By default, this is set to false for enabled.",
    ).optional(),
    name: z.string().describe(
      'Endpoints service name which is the name of the "service" resource in the Service Management API. For example "myapi.endpoints.myproject.cloud.goog"',
    ).optional(),
    rolloutStrategy: z.enum([
      "UNSPECIFIED_ROLLOUT_STRATEGY",
      "FIXED",
      "MANAGED",
    ]).describe(
      "Endpoints rollout strategy. If FIXED, config_id must be specified. If MANAGED, config_id must be omitted.",
    ).optional(),
  }).describe(
    'Google Cloud Endpoints (https://cloud.google.com/endpoints) configuration. The Endpoints API Service provides tooling for serving Open API and gRPC endpoints via an NGINX proxy. Only valid for App Engine Flexible environment deployments.The fields here refer to the name and configuration ID of a "service" resource in the Service Management API (https://cloud.google.com/service-management/overview).',
  ).optional(),
  entrypoint: z.object({
    shell: z.string().describe(
      "The format should be a shell command that can be fed to bash -c.",
    ).optional(),
  }).describe("The entrypoint for the application.").optional(),
  env: z.string().describe(
    "App Engine execution environment for this version.Defaults to standard.",
  ).optional(),
  envVariables: z.record(z.string(), z.string()).describe(
    "Environment variables available to the application.Only returned in GET requests if view=FULL is set.",
  ).optional(),
  errorHandlers: z.array(z.object({
    errorCode: z.enum([
      "ERROR_CODE_UNSPECIFIED",
      "ERROR_CODE_DEFAULT",
      "ERROR_CODE_OVER_QUOTA",
      "ERROR_CODE_DOS_API_DENIAL",
      "ERROR_CODE_TIMEOUT",
    ]).describe("Error condition this handler applies to.").optional(),
    mimeType: z.string().describe("MIME type of file. Defaults to text/html.")
      .optional(),
    staticFile: z.string().describe(
      "Static file content to be served for this error.",
    ).optional(),
  })).describe(
    "Custom static error pages. Limited to 10KB per page.Only returned in GET requests if view=FULL is set.",
  ).optional(),
  flexibleRuntimeSettings: z.object({
    operatingSystem: z.string().describe(
      "The operating system of the application runtime.",
    ).optional(),
    runtimeVersion: z.string().describe(
      "The runtime version of an App Engine flexible application.",
    ).optional(),
  }).describe("Runtime settings for the App Engine flexible environment.")
    .optional(),
  generatedCustomerMetadata: z.record(z.string(), z.string()).describe(
    "Additional Google Generated Customer Metadata, this field won't be provided by default and can be requested by setting the IncludeExtraData field in GetVersionRequest",
  ).optional(),
  handlers: z.array(z.object({
    apiEndpoint: z.object({
      scriptPath: z.string().describe(
        "Path to the script from the application root directory.",
      ).optional(),
    }).describe("Uses Google Cloud Endpoints to handle requests.").optional(),
    authFailAction: z.enum([
      "AUTH_FAIL_ACTION_UNSPECIFIED",
      "AUTH_FAIL_ACTION_REDIRECT",
      "AUTH_FAIL_ACTION_UNAUTHORIZED",
    ]).describe(
      "Action to take when users access resources that require authentication. Defaults to redirect.",
    ).optional(),
    login: z.enum([
      "LOGIN_UNSPECIFIED",
      "LOGIN_OPTIONAL",
      "LOGIN_ADMIN",
      "LOGIN_REQUIRED",
    ]).describe(
      "Level of login required to access this resource. Not supported for Node.js in the App Engine standard environment.",
    ).optional(),
    redirectHttpResponseCode: z.enum([
      "REDIRECT_HTTP_RESPONSE_CODE_UNSPECIFIED",
      "REDIRECT_HTTP_RESPONSE_CODE_301",
      "REDIRECT_HTTP_RESPONSE_CODE_302",
      "REDIRECT_HTTP_RESPONSE_CODE_303",
      "REDIRECT_HTTP_RESPONSE_CODE_307",
    ]).describe(
      "30x code to use when performing redirects for the secure field. Defaults to 302.",
    ).optional(),
    script: z.object({
      scriptPath: z.string().describe(
        "Path to the script from the application root directory.",
      ).optional(),
    }).describe(
      "Executes a script to handle the request that matches the URL pattern.",
    ).optional(),
    securityLevel: z.enum([
      "SECURE_UNSPECIFIED",
      "SECURE_DEFAULT",
      "SECURE_NEVER",
      "SECURE_OPTIONAL",
      "SECURE_ALWAYS",
    ]).describe("Security (HTTPS) enforcement for this URL.").optional(),
    staticFiles: z.object({
      applicationReadable: z.boolean().describe(
        "Whether files should also be uploaded as code data. By default, files declared in static file handlers are uploaded as static data and are only served to end users; they cannot be read by the application. If enabled, uploads are charged against both your code and static data storage resource quotas.",
      ).optional(),
      expiration: z.string().describe(
        "Time a static file served by this handler should be cached by web proxies and browsers.",
      ).optional(),
      httpHeaders: z.record(z.string(), z.string()).describe(
        "HTTP headers to use for all responses from these URLs.",
      ).optional(),
      mimeType: z.string().describe(
        "MIME type used to serve all files served by this handler.Defaults to file-specific MIME types, which are derived from each file's filename extension.",
      ).optional(),
      path: z.string().describe(
        "Path to the static files matched by the URL pattern, from the application root directory. The path can refer to text matched in groupings in the URL pattern.",
      ).optional(),
      requireMatchingFile: z.boolean().describe(
        "Whether this handler should match the request if the file referenced by the handler does not exist.",
      ).optional(),
      uploadPathRegex: z.string().describe(
        "Regular expression that matches the file paths for all files that should be referenced by this handler.",
      ).optional(),
    }).describe(
      "Files served directly to the user for a given URL, such as images, CSS stylesheets, or JavaScript source files. Static file handlers describe which files in the application directory are static files, and which URLs serve them.",
    ).optional(),
    urlRegex: z.string().describe(
      "URL prefix. Uses regular expression syntax, which means regexp special characters must be escaped, but should not contain groupings. All URLs that begin with this prefix are handled by this handler, using the portion of the URL after the prefix as part of the file path.",
    ).optional(),
  })).describe(
    "An ordered list of URL-matching patterns that should be applied to incoming requests. The first matching URL handles the request and other request handlers are not attempted.Only returned in GET requests if view=FULL is set.",
  ).optional(),
  healthCheck: z.object({
    checkInterval: z.string().describe("Interval between health checks.")
      .optional(),
    disableHealthCheck: z.boolean().describe(
      "Whether to explicitly disable health checks for this instance.",
    ).optional(),
    healthyThreshold: z.number().int().describe(
      "Number of consecutive successful health checks required before receiving traffic.",
    ).optional(),
    host: z.string().describe(
      'Host header to send when performing an HTTP health check. Example: "myapp.appspot.com"',
    ).optional(),
    restartThreshold: z.number().int().describe(
      "Number of consecutive failed health checks required before an instance is restarted.",
    ).optional(),
    timeout: z.string().describe(
      "Time before the health check is considered failed.",
    ).optional(),
    unhealthyThreshold: z.number().int().describe(
      "Number of consecutive failed health checks required before removing traffic.",
    ).optional(),
  }).describe(
    "Health checking configuration for VM instances. Unhealthy instances are killed and replaced with new instances. Only applicable for instances in App Engine flexible environment.",
  ).optional(),
  id: z.string().describe(
    'Relative name of the version within the service. Example: v1. Version names can contain only lowercase letters, numbers, or hyphens. Reserved names: "default", "latest", and any name with the prefix "ah-".',
  ).optional(),
  inboundServices: z.array(
    z.enum([
      "INBOUND_SERVICE_UNSPECIFIED",
      "INBOUND_SERVICE_MAIL",
      "INBOUND_SERVICE_MAIL_BOUNCE",
      "INBOUND_SERVICE_XMPP_ERROR",
      "INBOUND_SERVICE_XMPP_MESSAGE",
      "INBOUND_SERVICE_XMPP_SUBSCRIBE",
      "INBOUND_SERVICE_XMPP_PRESENCE",
      "INBOUND_SERVICE_CHANNEL_PRESENCE",
      "INBOUND_SERVICE_WARMUP",
    ]),
  ).describe(
    "Before an application can receive email or XMPP messages, the application must be configured to enable the service.",
  ).optional(),
  instanceClass: z.string().describe(
    "Instance class that is used to run this version. Valid values are: AutomaticScaling: F1, F2, F4, F4_1G ManualScaling or BasicScaling: B1, B2, B4, B8, B4_1GDefaults to F1 for AutomaticScaling and B1 for ManualScaling or BasicScaling.",
  ).optional(),
  libraries: z.array(z.object({
    name: z.string().describe('Name of the library. Example: "django".')
      .optional(),
    version: z.string().describe(
      'Version of the library to select, or "latest".',
    ).optional(),
  })).describe(
    "Configuration for third-party Python runtime libraries that are required by the application.Only returned in GET requests if view=FULL is set.",
  ).optional(),
  livenessCheck: z.object({
    checkInterval: z.string().describe("Interval between health checks.")
      .optional(),
    failureThreshold: z.number().int().describe(
      "Number of consecutive failed checks required before considering the VM unhealthy.",
    ).optional(),
    host: z.string().describe(
      'Host header to send when performing a HTTP Liveness check. Example: "myapp.appspot.com"',
    ).optional(),
    initialDelay: z.string().describe(
      "The initial delay before starting to execute the checks.",
    ).optional(),
    path: z.string().describe("The request path.").optional(),
    successThreshold: z.number().int().describe(
      "Number of consecutive successful checks required before considering the VM healthy.",
    ).optional(),
    timeout: z.string().describe("Time before the check is considered failed.")
      .optional(),
  }).describe(
    "Health checking configuration for VM instances. Unhealthy instances are killed and replaced with new instances.",
  ).optional(),
  manualScaling: z.object({
    instances: z.number().int().describe(
      "Number of instances to assign to the service at the start. This number can later be altered by using the Modules API (https://cloud.google.com/appengine/docs/python/modules/functions) set_num_instances() function.",
    ).optional(),
  }).describe(
    "A service with manual scaling runs continuously, allowing you to perform complex initialization and rely on the state of its memory over time.",
  ).optional(),
  network: z.object({
    forwardedPorts: z.array(z.string()).describe(
      "List of ports, or port pairs, to forward from the virtual machine to the application container. Only applicable in the App Engine flexible environment.",
    ).optional(),
    instanceIpMode: z.enum([
      "INSTANCE_IP_MODE_UNSPECIFIED",
      "EXTERNAL",
      "INTERNAL",
    ]).describe(
      "The IP mode for instances. Only applicable in the App Engine flexible environment.",
    ).optional(),
    instanceTag: z.string().describe(
      "Tag to apply to the instance during creation. Only applicable in the App Engine flexible environment.",
    ).optional(),
    name: z.string().describe(
      "Google Compute Engine network where the virtual machines are created. Specify the short name, not the resource path.Defaults to default.",
    ).optional(),
    sessionAffinity: z.boolean().describe(
      "Enable session affinity. Only applicable in the App Engine flexible environment.",
    ).optional(),
    subnetworkName: z.string().describe(
      "Google Cloud Platform sub-network where the virtual machines are created. Specify the short name, not the resource path.If a subnetwork name is specified, a network name will also be required unless it is for the default network. If the network that the instance is being created in is a Legacy network, then the IP address is allocated from the IPv4Range. If the network that the instance is being created in is an auto Subnet Mode Network, then only network name should be specified (not the subnetwork_name) and the IP address is created from the IPCidrRange of the subnetwork that exists in that zone for that network. If the network that the instance is being created in is a custom Subnet Mode Network, then the subnetwork_name must be specified and the IP address is created from the IPCidrRange of the subnetwork.If specified, the subnetwork must exist in the same region as the App Engine flexible environment application.",
    ).optional(),
  }).describe(
    "Extra network settings. Only applicable in the App Engine flexible environment.",
  ).optional(),
  nobuildFilesRegex: z.string().describe(
    "Files that match this pattern will not be built into this version. Only applicable for Go runtimes.Only returned in GET requests if view=FULL is set.",
  ).optional(),
  readinessCheck: z.object({
    appStartTimeout: z.string().describe(
      "A maximum time limit on application initialization, measured from moment the application successfully replies to a healthcheck until it is ready to serve traffic.",
    ).optional(),
    checkInterval: z.string().describe("Interval between health checks.")
      .optional(),
    failureThreshold: z.number().int().describe(
      "Number of consecutive failed checks required before removing traffic.",
    ).optional(),
    host: z.string().describe(
      'Host header to send when performing a HTTP Readiness check. Example: "myapp.appspot.com"',
    ).optional(),
    path: z.string().describe("The request path.").optional(),
    successThreshold: z.number().int().describe(
      "Number of consecutive successful checks required before receiving traffic.",
    ).optional(),
    timeout: z.string().describe("Time before the check is considered failed.")
      .optional(),
  }).describe(
    "Readiness checking configuration for VM instances. Unhealthy instances are removed from traffic rotation.",
  ).optional(),
  resources: z.object({
    cpu: z.number().describe("Number of CPU cores needed.").optional(),
    diskGb: z.number().describe("Disk size (GB) needed.").optional(),
    kmsKeyReference: z.string().describe(
      "The name of the encryption key that is stored in Google Cloud KMS. Only should be used by Cloud Composer to encrypt the vm disk",
    ).optional(),
    memoryGb: z.number().describe("Memory (GB) needed.").optional(),
    volumes: z.array(z.object({
      name: z.string().describe("Unique name for the volume.").optional(),
      sizeGb: z.number().describe("Volume size in gigabytes.").optional(),
      volumeType: z.string().describe("Underlying volume type, e.g. 'tmpfs'.")
        .optional(),
    })).describe("User specified volumes.").optional(),
  }).describe("Machine resources for a version.").optional(),
  runtime: z.string().describe("Desired runtime. Example: python27.")
    .optional(),
  runtimeApiVersion: z.string().describe(
    "The version of the API in the given runtime environment. Please see the app.yaml reference for valid values at https://cloud.google.com/appengine/docs/standard//config/appref",
  ).optional(),
  runtimeChannel: z.string().describe(
    "The channel of the runtime to use. Only available for some runtimes. Defaults to the default channel.",
  ).optional(),
  runtimeMainExecutablePath: z.string().describe(
    "The path or name of the app's main executable.",
  ).optional(),
  serviceAccount: z.string().describe(
    "The identity that the deployed version will run as. Admin API will use the App Engine Appspot service account as default if this field is neither provided in app.yaml file nor through CLI flag.",
  ).optional(),
  servingStatus: z.enum(["SERVING_STATUS_UNSPECIFIED", "SERVING", "STOPPED"])
    .describe(
      "Current serving status of this version. Only the versions with a SERVING status create instances and can be billed.SERVING_STATUS_UNSPECIFIED is an invalid value. Defaults to SERVING.",
    ).optional(),
  threadsafe: z.boolean().describe(
    "Whether multiple requests can be dispatched to this version at once.",
  ).optional(),
  vm: z.boolean().describe(
    "Whether to deploy this version in a container on a virtual machine.",
  ).optional(),
  vpcAccessConnector: z.object({
    egressSetting: z.enum([
      "EGRESS_SETTING_UNSPECIFIED",
      "ALL_TRAFFIC",
      "PRIVATE_IP_RANGES",
    ]).describe(
      "The egress setting for the connector, controlling what traffic is diverted through it.",
    ).optional(),
    name: z.string().describe(
      "Full Serverless VPC Access Connector name e.g. projects/my-project/locations/us-central1/connectors/c1.",
    ).optional(),
  }).describe("VPC access connector specification.").optional(),
  zones: z.array(z.string()).describe(
    "The Google Compute Engine zones that are supported by this version in the App Engine flexible environment. Deprecated.",
  ).optional(),
  appsId: z.string().describe(
    "Part of `parent`. Required. Name of the parent resource to create this version under. Example: apps/myapp/services/default.",
  ).optional(),
  servicesId: z.string().describe(
    "Part of `parent`. See documentation of `appsId`.",
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

/** Swamp extension model for Google Cloud App Engine Admin Apps.Services.Versions. Registered at `@swamp/gcp/appengine/apps-services-versions`. */
export const model = {
  type: "@swamp/gcp/appengine/apps-services-versions",
  version: "2026.06.08.1",
  upgrades: [
    {
      toVersion: "2026.03.31.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A Version resource is a specific set of source code and configuration files t...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a versions",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["appsId"] !== undefined) params["appsId"] = String(g["appsId"]);
        if (g["servicesId"] !== undefined) {
          params["servicesId"] = String(g["servicesId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["apiConfig"] !== undefined) body["apiConfig"] = g["apiConfig"];
        if (g["appEngineApis"] !== undefined) {
          body["appEngineApis"] = g["appEngineApis"];
        }
        if (g["automaticScaling"] !== undefined) {
          body["automaticScaling"] = g["automaticScaling"];
        }
        if (g["basicScaling"] !== undefined) {
          body["basicScaling"] = g["basicScaling"];
        }
        if (g["betaSettings"] !== undefined) {
          body["betaSettings"] = g["betaSettings"];
        }
        if (g["buildEnvVariables"] !== undefined) {
          body["buildEnvVariables"] = g["buildEnvVariables"];
        }
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["defaultExpiration"] !== undefined) {
          body["defaultExpiration"] = g["defaultExpiration"];
        }
        if (g["deployment"] !== undefined) body["deployment"] = g["deployment"];
        if (g["endpointsApiService"] !== undefined) {
          body["endpointsApiService"] = g["endpointsApiService"];
        }
        if (g["entrypoint"] !== undefined) body["entrypoint"] = g["entrypoint"];
        if (g["env"] !== undefined) body["env"] = g["env"];
        if (g["envVariables"] !== undefined) {
          body["envVariables"] = g["envVariables"];
        }
        if (g["errorHandlers"] !== undefined) {
          body["errorHandlers"] = g["errorHandlers"];
        }
        if (g["flexibleRuntimeSettings"] !== undefined) {
          body["flexibleRuntimeSettings"] = g["flexibleRuntimeSettings"];
        }
        if (g["generatedCustomerMetadata"] !== undefined) {
          body["generatedCustomerMetadata"] = g["generatedCustomerMetadata"];
        }
        if (g["handlers"] !== undefined) body["handlers"] = g["handlers"];
        if (g["healthCheck"] !== undefined) {
          body["healthCheck"] = g["healthCheck"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["inboundServices"] !== undefined) {
          body["inboundServices"] = g["inboundServices"];
        }
        if (g["instanceClass"] !== undefined) {
          body["instanceClass"] = g["instanceClass"];
        }
        if (g["libraries"] !== undefined) body["libraries"] = g["libraries"];
        if (g["livenessCheck"] !== undefined) {
          body["livenessCheck"] = g["livenessCheck"];
        }
        if (g["manualScaling"] !== undefined) {
          body["manualScaling"] = g["manualScaling"];
        }
        if (g["network"] !== undefined) body["network"] = g["network"];
        if (g["nobuildFilesRegex"] !== undefined) {
          body["nobuildFilesRegex"] = g["nobuildFilesRegex"];
        }
        if (g["readinessCheck"] !== undefined) {
          body["readinessCheck"] = g["readinessCheck"];
        }
        if (g["resources"] !== undefined) body["resources"] = g["resources"];
        if (g["runtime"] !== undefined) body["runtime"] = g["runtime"];
        if (g["runtimeApiVersion"] !== undefined) {
          body["runtimeApiVersion"] = g["runtimeApiVersion"];
        }
        if (g["runtimeChannel"] !== undefined) {
          body["runtimeChannel"] = g["runtimeChannel"];
        }
        if (g["runtimeMainExecutablePath"] !== undefined) {
          body["runtimeMainExecutablePath"] = g["runtimeMainExecutablePath"];
        }
        if (g["serviceAccount"] !== undefined) {
          body["serviceAccount"] = g["serviceAccount"];
        }
        if (g["servingStatus"] !== undefined) {
          body["servingStatus"] = g["servingStatus"];
        }
        if (g["threadsafe"] !== undefined) body["threadsafe"] = g["threadsafe"];
        if (g["vm"] !== undefined) body["vm"] = g["vm"];
        if (g["vpcAccessConnector"] !== undefined) {
          body["vpcAccessConnector"] = g["vpcAccessConnector"];
        }
        if (g["zones"] !== undefined) body["zones"] = g["zones"];
        if (g["name"] !== undefined) params["versionsId"] = String(g["name"]);
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
              "appsId": String(g["appsId"] ?? ""),
              "servicesId": String(g["servicesId"] ?? ""),
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
      description: "Get a versions",
      arguments: z.object({
        identifier: z.string().describe("The name of the versions"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["appsId"] !== undefined) params["appsId"] = String(g["appsId"]);
        if (g["servicesId"] !== undefined) {
          params["servicesId"] = String(g["servicesId"]);
        }
        params["versionsId"] = args.identifier;
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
      description: "Update versions attributes",
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
        if (g["appsId"] !== undefined) params["appsId"] = String(g["appsId"]);
        else if (existing["appsId"]) {
          params["appsId"] = String(existing["appsId"]);
        }
        if (g["servicesId"] !== undefined) {
          params["servicesId"] = String(g["servicesId"]);
        } else if (existing["servicesId"]) {
          params["servicesId"] = String(existing["servicesId"]);
        }
        params["versionsId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["apiConfig"] !== undefined) body["apiConfig"] = g["apiConfig"];
        if (g["appEngineApis"] !== undefined) {
          body["appEngineApis"] = g["appEngineApis"];
        }
        if (g["automaticScaling"] !== undefined) {
          body["automaticScaling"] = g["automaticScaling"];
        }
        if (g["basicScaling"] !== undefined) {
          body["basicScaling"] = g["basicScaling"];
        }
        if (g["betaSettings"] !== undefined) {
          body["betaSettings"] = g["betaSettings"];
        }
        if (g["buildEnvVariables"] !== undefined) {
          body["buildEnvVariables"] = g["buildEnvVariables"];
        }
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["defaultExpiration"] !== undefined) {
          body["defaultExpiration"] = g["defaultExpiration"];
        }
        if (g["deployment"] !== undefined) body["deployment"] = g["deployment"];
        if (g["endpointsApiService"] !== undefined) {
          body["endpointsApiService"] = g["endpointsApiService"];
        }
        if (g["entrypoint"] !== undefined) body["entrypoint"] = g["entrypoint"];
        if (g["env"] !== undefined) body["env"] = g["env"];
        if (g["envVariables"] !== undefined) {
          body["envVariables"] = g["envVariables"];
        }
        if (g["errorHandlers"] !== undefined) {
          body["errorHandlers"] = g["errorHandlers"];
        }
        if (g["flexibleRuntimeSettings"] !== undefined) {
          body["flexibleRuntimeSettings"] = g["flexibleRuntimeSettings"];
        }
        if (g["generatedCustomerMetadata"] !== undefined) {
          body["generatedCustomerMetadata"] = g["generatedCustomerMetadata"];
        }
        if (g["handlers"] !== undefined) body["handlers"] = g["handlers"];
        if (g["healthCheck"] !== undefined) {
          body["healthCheck"] = g["healthCheck"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["inboundServices"] !== undefined) {
          body["inboundServices"] = g["inboundServices"];
        }
        if (g["instanceClass"] !== undefined) {
          body["instanceClass"] = g["instanceClass"];
        }
        if (g["libraries"] !== undefined) body["libraries"] = g["libraries"];
        if (g["livenessCheck"] !== undefined) {
          body["livenessCheck"] = g["livenessCheck"];
        }
        if (g["manualScaling"] !== undefined) {
          body["manualScaling"] = g["manualScaling"];
        }
        if (g["network"] !== undefined) body["network"] = g["network"];
        if (g["nobuildFilesRegex"] !== undefined) {
          body["nobuildFilesRegex"] = g["nobuildFilesRegex"];
        }
        if (g["readinessCheck"] !== undefined) {
          body["readinessCheck"] = g["readinessCheck"];
        }
        if (g["resources"] !== undefined) body["resources"] = g["resources"];
        if (g["runtime"] !== undefined) body["runtime"] = g["runtime"];
        if (g["runtimeApiVersion"] !== undefined) {
          body["runtimeApiVersion"] = g["runtimeApiVersion"];
        }
        if (g["runtimeChannel"] !== undefined) {
          body["runtimeChannel"] = g["runtimeChannel"];
        }
        if (g["runtimeMainExecutablePath"] !== undefined) {
          body["runtimeMainExecutablePath"] = g["runtimeMainExecutablePath"];
        }
        if (g["serviceAccount"] !== undefined) {
          body["serviceAccount"] = g["serviceAccount"];
        }
        if (g["servingStatus"] !== undefined) {
          body["servingStatus"] = g["servingStatus"];
        }
        if (g["threadsafe"] !== undefined) body["threadsafe"] = g["threadsafe"];
        if (g["vm"] !== undefined) body["vm"] = g["vm"];
        if (g["vpcAccessConnector"] !== undefined) {
          body["vpcAccessConnector"] = g["vpcAccessConnector"];
        }
        if (g["zones"] !== undefined) body["zones"] = g["zones"];
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
      description: "Delete the versions",
      arguments: z.object({
        identifier: z.string().describe("The name of the versions"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["appsId"] !== undefined) params["appsId"] = String(g["appsId"]);
        if (g["servicesId"] !== undefined) {
          params["servicesId"] = String(g["servicesId"]);
        }
        params["versionsId"] = args.identifier;
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
      description: "Sync versions state from GCP",
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
          if (g["appsId"] !== undefined) params["appsId"] = String(g["appsId"]);
          else if (existing["appsId"]) {
            params["appsId"] = String(existing["appsId"]);
          }
          if (g["servicesId"] !== undefined) {
            params["servicesId"] = String(g["servicesId"]);
          } else if (existing["servicesId"]) {
            params["servicesId"] = String(existing["servicesId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["versionsId"] = identifier;
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
      description: "List versions resources",
      arguments: z.object({
        pageSize: z.number().describe("Maximum results to return per page.")
          .optional(),
        view: z.string().describe(
          "Controls the set of fields returned in the List response.",
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
        if (g["appsId"] !== undefined) params["appsId"] = String(g["appsId"]);
        if (g["servicesId"] !== undefined) {
          params["servicesId"] = String(g["servicesId"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["view"] !== undefined) params["view"] = String(args["view"]);
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "versions",
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
    export_app_image: {
      description: "export app image",
      arguments: z.object({
        destinationRepository: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["appsId"] !== undefined) params["appsId"] = String(g["appsId"]);
        if (g["servicesId"] !== undefined) {
          params["servicesId"] = String(g["servicesId"]);
        }
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
        params["versionsId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["destinationRepository"] !== undefined) {
          body["destinationRepository"] = args["destinationRepository"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "appengine.apps.services.versions.exportAppImage",
            "path":
              "v1/apps/{appsId}/services/{servicesId}/versions/{versionsId}:exportAppImage",
            "httpMethod": "POST",
            "parameterOrder": ["appsId", "servicesId", "versionsId"],
            "parameters": {
              "appsId": { "location": "path", "required": true },
              "servicesId": { "location": "path", "required": true },
              "versionsId": { "location": "path", "required": true },
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
