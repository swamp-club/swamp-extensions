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

// Auto-generated extension model for @swamp/gcp/run/namespaces-services
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Run Admin Namespaces.Services.
 *
 * Service acts as a top-level container that manages a set of Routes and Configurations which implement a network service. Service exists to provide a singular abstraction which can be access controlled, reasoned about, and which encapsulates software lifecycle decisions such as rollout policy and team resource ownership. Service acts only as an orchestrator of the underlying Routes and Configurations (much as a kubernetes Deployment orchestrates ReplicaSets). The Service's controller will track the statuses of its owned Configuration and Route, reflecting their statuses and conditions as its own.
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
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/services/${shortName}`;
}

const BASE_URL = "https://run.googleapis.com/";

const GET_CONFIG = {
  "id": "run.namespaces.services.get",
  "path": "apis/serving.knative.dev/v1/{+name}",
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
  "id": "run.namespaces.services.create",
  "path": "apis/serving.knative.dev/v1/{+parent}/services",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "dryRun": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "run.namespaces.services.delete",
  "path": "apis/serving.knative.dev/v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "apiVersion": {
      "location": "query",
    },
    "dryRun": {
      "location": "query",
    },
    "kind": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "propagationPolicy": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "run.namespaces.services.list",
  "path": "apis/serving.knative.dev/v1/{+parent}/services",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "continue": {
      "location": "query",
    },
    "fieldSelector": {
      "location": "query",
    },
    "includeUninitialized": {
      "location": "query",
    },
    "labelSelector": {
      "location": "query",
    },
    "limit": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "resourceVersion": {
      "location": "query",
    },
    "watch": {
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
  scopes: z.string().describe(
    "Comma-separated OAuth scopes to request when minting access tokens via gcloud. Defaults to the API's Discovery Document scopes.",
  ).optional(),
  quotaProject: z.string().describe(
    "GCP project ID for quota and billing attribution; sets the x-goog-user-project header. Overrides GOOGLE_CLOUD_QUOTA_PROJECT environment variable. Required for APIs like Cloud Identity when using user credentials.",
  ).optional(),
  apiEndpoint: z.string().describe(
    "Custom API endpoint for emulators; overrides GCP_API_ENDPOINT environment variable. Defaults to the service's production URL.",
  ).optional(),
  apiVersion: z.string().describe(
    'The API version for this call. It must be "serving.knative.dev/v1".',
  ).optional(),
  metadata: z.object({
    annotations: z.record(z.string(), z.string()).describe(
      "Unstructured key value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. In Cloud Run, annotations with 'run.googleapis.com/' and 'autoscaling.knative.dev' are restricted, and the accepted annotations will be different depending on the resource type. * `autoscaling.knative.dev/maxScale`: Revision. * `autoscaling.knative.dev/minScale`: Revision. * `run.googleapis.com/base-images`: Service, Revision. * `run.googleapis.com/binary-authorization-breakglass`: Service, Job, * `run.googleapis.com/binary-authorization`: Service, Job, Execution. * `run.googleapis.com/build-base-image`: Service. * `run.googleapis.com/build-enable-automatic-updates`: Service. * `run.googleapis.com/build-environment-variables`: Service. * `run.googleapis.com/build-function-target`: Service, Revision. * `run.googleapis.com/build-id`: Service, Revision. * `run.googleapis.com/build-image-uri`: Service. * `run.googleapis.com/build-name`: Service. * `run.googleapis.com/build-service-account`: Service. * `run.googleapis.com/build-source-location`: Service, Revision. * `run.googleapis.com/build-worker-pool`: Service. * `run.googleapis.com/client-name`: All resources. * `run.googleapis.com/cloudsql-instances`: Revision, Execution, Instance. * `run.googleapis.com/container-dependencies`: Revision, Instance. * `run.googleapis.com/cpu-throttling`: Revision. * `run.googleapis.com/custom-audiences`: Service. * `run.googleapis.com/default-url-disabled`: Service. * `run.googleapis.com/description`: Service. * `run.googleapis.com/encryption-key-shutdown-hours`: Revision. * `run.googleapis.com/encryption-key`: Revision, Execution, Instance. * `run.googleapis.com/execution-environment`: Revision, Execution. * `run.googleapis.com/gc-traffic-tags`: Service. * `run.googleapis.com/gpu-zonal-redundancy-disabled`: Revision. * `run.googleapis.com/health-check-disabled`: Revision. * `run.googleapis.com/ingress`: Service, Instance. * `run.googleapis.com/invoker-iam-disabled`: Service, Instance. * `run.googleapis.com/launch-stage`: Service, Job. * `run.googleapis.com/minScale`: Service. * `run.googleapis.com/maxScale`: Service. * `run.googleapis.com/manualInstanceCount`: Service. * `run.googleapis.com/network-interfaces`: Revision, Execution, Instance. * `run.googleapis.com/post-key-revocation-action-type`: Revision. * `run.googleapis.com/scalingMode`: Service. * `run.googleapis.com/secrets`: Revision, Execution. * `run.googleapis.com/secure-session-agent`: Revision. * `run.googleapis.com/sessionAffinity`: Revision. * `run.googleapis.com/startup-cpu-boost`: Revision. * `run.googleapis.com/vpc-access-connector`: Revision, Execution. * `run.googleapis.com/vpc-access-egress`: Revision, Execution, Instance.",
    ).optional(),
    clusterName: z.string().describe("Not supported by Cloud Run").optional(),
    creationTimestamp: z.string().describe(
      "UTC timestamp representing the server time when this object was created.",
    ).optional(),
    deletionGracePeriodSeconds: z.number().int().describe(
      "Not supported by Cloud Run",
    ).optional(),
    deletionTimestamp: z.string().describe(
      "The read-only soft deletion timestamp for this resource. In Cloud Run, users are not able to set this field. Instead, they must call the corresponding Delete API.",
    ).optional(),
    finalizers: z.array(z.string()).describe("Not supported by Cloud Run")
      .optional(),
    generateName: z.string().describe(
      "Optional. A prefix for the resource name if not provided in the create request. Must be less than 31 characters to allow for a random suffix.",
    ).optional(),
    generation: z.number().int().describe(
      "A system-provided sequence number representing a specific generation of the desired state.",
    ).optional(),
    labels: z.record(z.string(), z.string()).describe(
      "Map of string keys and values that can be used to organize and categorize (scope and select) objects. May match selectors of replication controllers and routes.",
    ).optional(),
    name: z.string().describe(
      "Optional. The name of the resource. A name for creating top-level resources (Service, Job, WorkerPool). Must be unique within a Cloud Run project/region, and cannot be changed once created. If omitted, a default name will be generated.",
    ).optional(),
    namespace: z.string().describe(
      "Required. Defines the space within each name must be unique within a Cloud Run region. In Cloud Run, it must be project ID or number.",
    ).optional(),
    ownerReferences: z.array(z.object({
      apiVersion: z.string().describe(
        "This is not supported or used by Cloud Run.",
      ).optional(),
      blockOwnerDeletion: z.boolean().describe(
        "This is not supported or used by Cloud Run.",
      ).optional(),
      controller: z.boolean().describe(
        "This is not supported or used by Cloud Run.",
      ).optional(),
      kind: z.string().describe("This is not supported or used by Cloud Run.")
        .optional(),
      name: z.string().describe("This is not supported or used by Cloud Run.")
        .optional(),
      uid: z.string().describe("This is not supported or used by Cloud Run.")
        .optional(),
    })).describe("Not supported by Cloud Run").optional(),
    resourceVersion: z.string().describe(
      "Opaque, system-generated value that represents the internal version of this object that can be used by clients to determine when objects have changed. May be used for optimistic concurrency, change detection, and the watch operation on a resource or set of resources. Clients must treat these values as opaque and passed unmodified back to the server or omit the value to disable conflict-detection.",
    ).optional(),
    selfLink: z.string().describe("URL representing this object.").optional(),
    uid: z.string().describe(
      "Unique, system-generated identifier for this resource.",
    ).optional(),
  }).describe(
    "Metadata associated with this Service, including name, namespace, labels, and annotations. In Cloud Run, annotations with 'run.googleapis.com/' and 'autoscaling.knative.dev' are restricted, and the accepted annotations will be different depending on the resource type. The following Cloud Run-specific annotations are accepted in Service.metadata.annotations. * `run.googleapis.com/base-images` * `run.googleapis.com/binary-authorization-breakglass` * `run.googleapis.com/binary-authorization` * `run.googleapis.com/client-name` * `run.googleapis.com/custom-audiences` * `run.googleapis.com/default-url-disabled` * `run.googleapis.com/description` * `run.googleapis.com/gc-traffic-tags` * `run.googleapis.com/ingress` * `run.googleapis.com/ingress` sets the ingress settings for the Service. See [the ingress settings documentation](/run/docs/securing/ingress) for details on configuring ingress settings. * `run.googleapis.com/ingress-status` is output-only and contains the currently active ingress settings for the Service. `run.googleapis.com/ingress-status` may differ from `run.googleapis.com/ingress` while the system is processing a change to `run.googleapis.com/ingress` or if the system failed to process a change to `run.googleapis.com/ingress`. When the system has processed all changes successfully `run.googleapis.com/ingress-status` and `run.googleapis.com/ingress` are equal.",
  ).optional(),
  spec: z.object({
    template: z.object({
      metadata: z.object({
        annotations: z.record(z.string(), z.string()).describe(
          "Unstructured key value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. In Cloud Run, annotations with 'run.googleapis.com/' and 'autoscaling.knative.dev' are restricted, and the accepted annotations will be different depending on the resource type. * `autoscaling.knative.dev/maxScale`: Revision. * `autoscaling.knative.dev/minScale`: Revision. * `run.googleapis.com/base-images`: Service, Revision. * `run.googleapis.com/binary-authorization-breakglass`: Service, Job, * `run.googleapis.com/binary-authorization`: Service, Job, Execution. * `run.googleapis.com/build-base-image`: Service. * `run.googleapis.com/build-enable-automatic-updates`: Service. * `run.googleapis.com/build-environment-variables`: Service. * `run.googleapis.com/build-function-target`: Service, Revision. * `run.googleapis.com/build-id`: Service, Revision. * `run.googleapis.com/build-image-uri`: Service. * `run.googleapis.com/build-name`: Service. * `run.googleapis.com/build-service-account`: Service. * `run.googleapis.com/build-source-location`: Service, Revision. * `run.googleapis.com/build-worker-pool`: Service. * `run.googleapis.com/client-name`: All resources. * `run.googleapis.com/cloudsql-instances`: Revision, Execution, Instance. * `run.googleapis.com/container-dependencies`: Revision, Instance. * `run.googleapis.com/cpu-throttling`: Revision. * `run.googleapis.com/custom-audiences`: Service. * `run.googleapis.com/default-url-disabled`: Service. * `run.googleapis.com/description`: Service. * `run.googleapis.com/encryption-key-shutdown-hours`: Revision. * `run.googleapis.com/encryption-key`: Revision, Execution, Instance. * `run.googleapis.com/execution-environment`: Revision, Execution. * `run.googleapis.com/gc-traffic-tags`: Service. * `run.googleapis.com/gpu-zonal-redundancy-disabled`: Revision. * `run.googleapis.com/health-check-disabled`: Revision. * `run.googleapis.com/ingress`: Service, Instance. * `run.googleapis.com/invoker-iam-disabled`: Service, Instance. * `run.googleapis.com/launch-stage`: Service, Job. * `run.googleapis.com/minScale`: Service. * `run.googleapis.com/maxScale`: Service. * `run.googleapis.com/manualInstanceCount`: Service. * `run.googleapis.com/network-interfaces`: Revision, Execution, Instance. * `run.googleapis.com/post-key-revocation-action-type`: Revision. * `run.googleapis.com/scalingMode`: Service. * `run.googleapis.com/secrets`: Revision, Execution. * `run.googleapis.com/secure-session-agent`: Revision. * `run.googleapis.com/sessionAffinity`: Revision. * `run.googleapis.com/startup-cpu-boost`: Revision. * `run.googleapis.com/vpc-access-connector`: Revision, Execution. * `run.googleapis.com/vpc-access-egress`: Revision, Execution, Instance.",
        ).optional(),
        clusterName: z.string().describe("Not supported by Cloud Run")
          .optional(),
        creationTimestamp: z.string().describe(
          "UTC timestamp representing the server time when this object was created.",
        ).optional(),
        deletionGracePeriodSeconds: z.number().int().describe(
          "Not supported by Cloud Run",
        ).optional(),
        deletionTimestamp: z.string().describe(
          "The read-only soft deletion timestamp for this resource. In Cloud Run, users are not able to set this field. Instead, they must call the corresponding Delete API.",
        ).optional(),
        finalizers: z.array(z.string()).describe("Not supported by Cloud Run")
          .optional(),
        generateName: z.string().describe(
          "Optional. A prefix for the resource name if not provided in the create request. Must be less than 31 characters to allow for a random suffix.",
        ).optional(),
        generation: z.number().int().describe(
          "A system-provided sequence number representing a specific generation of the desired state.",
        ).optional(),
        labels: z.record(z.string(), z.string()).describe(
          "Map of string keys and values that can be used to organize and categorize (scope and select) objects. May match selectors of replication controllers and routes.",
        ).optional(),
        name: z.string().describe(
          "Optional. The name of the resource. A name for creating top-level resources (Service, Job, WorkerPool). Must be unique within a Cloud Run project/region, and cannot be changed once created. If omitted, a default name will be generated.",
        ).optional(),
        namespace: z.string().describe(
          "Required. Defines the space within each name must be unique within a Cloud Run region. In Cloud Run, it must be project ID or number.",
        ).optional(),
        ownerReferences: z.array(z.object({
          apiVersion: z.unknown().describe(
            "This is not supported or used by Cloud Run.",
          ).optional(),
          blockOwnerDeletion: z.unknown().describe(
            "This is not supported or used by Cloud Run.",
          ).optional(),
          controller: z.unknown().describe(
            "This is not supported or used by Cloud Run.",
          ).optional(),
          kind: z.unknown().describe(
            "This is not supported or used by Cloud Run.",
          ).optional(),
          name: z.unknown().describe(
            "This is not supported or used by Cloud Run.",
          ).optional(),
          uid: z.unknown().describe(
            "This is not supported or used by Cloud Run.",
          ).optional(),
        })).describe("Not supported by Cloud Run").optional(),
        resourceVersion: z.string().describe(
          "Opaque, system-generated value that represents the internal version of this object that can be used by clients to determine when objects have changed. May be used for optimistic concurrency, change detection, and the watch operation on a resource or set of resources. Clients must treat these values as opaque and passed unmodified back to the server or omit the value to disable conflict-detection.",
        ).optional(),
        selfLink: z.string().describe("URL representing this object.")
          .optional(),
        uid: z.string().describe(
          "Unique, system-generated identifier for this resource.",
        ).optional(),
      }).describe(
        "Optional metadata for this Revision, including labels and annotations. Name will be generated by the Configuration. The following annotation keys set properties of the created revision: * `autoscaling.knative.dev/minScale` sets the minimum number of instances. * `autoscaling.knative.dev/maxScale` sets the maximum number of instances. * `run.googleapis.com/cloudsql-instances` sets Cloud SQL connections. Multiple values should be comma separated. * `run.googleapis.com/health-check-disabled`: if true, deploy-time startup probes will not run for this revision. * `run.googleapis.com/vpc-access-connector` sets a Serverless VPC Access connector. * `run.googleapis.com/vpc-access-egress` sets VPC egress. Supported values are `all-traffic`, `all` (deprecated), and `private-ranges-only`. `all-traffic` and `all` provide the same functionality. `all` is deprecated but will continue to be supported. Prefer `all-traffic`.",
      ).optional(),
      spec: z.object({
        containerConcurrency: z.number().int().describe(
          "ContainerConcurrency specifies the maximum allowed in-flight (concurrent) requests per container instance of the Revision. If not specified or 0, defaults to 80 when requested CPU >= 1 and defaults to 1 when requested CPU < 1.",
        ).optional(),
        containers: z.array(z.object({
          args: z.unknown().describe(
            "Arguments to the entrypoint. The docker image's CMD is used if this is not provided. Variable references are not supported in Cloud Run.",
          ).optional(),
          command: z.unknown().describe(
            "Entrypoint array. Not executed within a shell. The docker image's ENTRYPOINT is used if this is not provided. Variable references are not supported in Cloud Run.",
          ).optional(),
          env: z.unknown().describe(
            "List of environment variables to set in the container. EnvVar with duplicate names are generally allowed; if referencing a secret, the name must be unique for the container. For non-secret EnvVar names, the Container will only get the last-declared one.",
          ).optional(),
          envFrom: z.unknown().describe("Not supported by Cloud Run.")
            .optional(),
          image: z.unknown().describe(
            "Required. Name of the container image in Dockerhub, Google Artifact Registry, or Google Container Registry. If the host is not provided, Dockerhub is assumed.",
          ).optional(),
          imagePullPolicy: z.unknown().describe(
            "Image pull policy. One of Always, Never, IfNotPresent. Defaults to Always if:latest tag is specified, or IfNotPresent otherwise.",
          ).optional(),
          livenessProbe: z.unknown().describe(
            "Periodic probe of container liveness. Container will be restarted if the probe fails.",
          ).optional(),
          name: z.unknown().describe(
            "Name of the container specified as a DNS_LABEL (RFC 1123).",
          ).optional(),
          ports: z.unknown().describe(
            "List of ports to expose from the container. Only a single port can be specified. The specified ports must be listening on all interfaces (0.0.0.0) within the container to be accessible. If omitted, a port number will be chosen and passed to the container through the PORT environment variable for the container to listen on.",
          ).optional(),
          readinessProbe: z.unknown().describe(
            "Readiness probe to be used for health checks.",
          ).optional(),
          resources: z.unknown().describe(
            "Compute Resources required by this container.",
          ).optional(),
          sandboxLauncher: z.unknown().describe(
            "Optional. Indicates that this container can act as a sandbox supervisor and launch sandboxes.",
          ).optional(),
          securityContext: z.unknown().describe("Not supported by Cloud Run.")
            .optional(),
          startupProbe: z.unknown().describe(
            "Startup probe of application within the container. All other probes are disabled if a startup probe is provided, until it succeeds. Container will not receive traffic if the probe fails. If not provided, a default startup probe with TCP socket action is used.",
          ).optional(),
          terminationMessagePath: z.unknown().describe(
            "Path at which the file to which the container's termination message will be written is mounted into the container's filesystem. Message written is intended to be brief final status, such as an assertion failure message. Will be truncated by the node if greater than 4096 bytes. The total message length across all containers will be limited to 12kb. Defaults to /dev/termination-log.",
          ).optional(),
          terminationMessagePolicy: z.unknown().describe(
            "Indicate how the termination message should be populated. File will use the contents of terminationMessagePath to populate the container status message on both success and failure. FallbackToLogsOnError will use the last chunk of container log output if the termination message file is empty and the container exited with an error. The log output is limited to 2048 bytes or 80 lines, whichever is smaller. Defaults to File. Cannot be updated.",
          ).optional(),
          volumeMounts: z.unknown().describe(
            "Volume to mount into the container's filesystem. Only supports SecretVolumeSources. Pod volumes to mount into the container's filesystem.",
          ).optional(),
          workingDir: z.unknown().describe(
            "Container's working directory. If not specified, the container runtime's default will be used, which might be configured in the container image.",
          ).optional(),
        })).describe(
          "Required. Containers holds the list which define the units of execution for this Revision.",
        ).optional(),
        enableServiceLinks: z.boolean().describe("Not supported by Cloud Run.")
          .optional(),
        imagePullSecrets: z.array(z.object({
          name: z.unknown().describe("Name of the referent.").optional(),
        })).describe("Not supported by Cloud Run.").optional(),
        nodeSelector: z.record(z.string(), z.string()).describe(
          "Optional. The Node Selector configuration. Map of selector key to a value which matches a node.",
        ).optional(),
        runtimeClassName: z.string().describe(
          "Optional. Runtime. Leave unset for default.",
        ).optional(),
        serviceAccountName: z.string().describe(
          "Email address of the IAM service account associated with the revision of the service. The service account represents the identity of the running revision, and determines what permissions the revision has. If not provided, the revision will use the project's default service account.",
        ).optional(),
        timeoutSeconds: z.number().int().describe(
          "Optional. TimeoutSeconds holds the max duration the instance is allowed for responding to a request. Cloud Run: defaults to 300 seconds (5 minutes). Maximum allowed value is 3600 seconds (1 hour).",
        ).optional(),
        volumes: z.array(z.object({
          configMap: z.unknown().describe("Not supported in Cloud Run.")
            .optional(),
          csi: z.unknown().describe(
            "Volume specified by the Container Storage Interface driver",
          ).optional(),
          emptyDir: z.unknown().describe(
            "Ephemeral storage used as a shared volume.",
          ).optional(),
          name: z.unknown().describe(
            "Volume's name. In Cloud Run Fully Managed, the name 'cloudsql' is reserved.",
          ).optional(),
          nfs: z.unknown().describe(
            "Represents a persistent volume that will be mounted using NFS. This volume will be shared between all instances of the resource and data will not be deleted when the instance is shut down.",
          ).optional(),
          secret: z.unknown().describe(
            "The secret's value will be presented as the content of a file whose name is defined in the item path. If no items are defined, the name of the file is the secretName.",
          ).optional(),
        })).optional(),
      }).describe(
        "RevisionSpec holds the desired state of the Revision (from the client).",
      ).optional(),
    }).describe(
      "Holds the latest specification for the Revision to be stamped out.",
    ).optional(),
    traffic: z.array(z.object({
      configurationName: z.string().describe(
        "[Deprecated] Not supported in Cloud Run. It must be empty.",
      ).optional(),
      latestRevision: z.boolean().describe(
        'Uses the "status.latestReadyRevisionName" of the Service to determine the traffic target. When it changes, traffic will automatically migrate from the prior "latest ready" revision to the new one. This field must be false if RevisionName is set. This field defaults to true otherwise. If the field is set to true on Status, this means that the Revision was resolved from the Service\'s latest ready revision.',
      ).optional(),
      percent: z.number().int().describe(
        "Percent specifies percent of the traffic to this Revision or Configuration. This defaults to zero if unspecified.",
      ).optional(),
      revisionName: z.string().describe(
        "Points this traffic target to a specific Revision. This field is mutually exclusive with latest_revision.",
      ).optional(),
      tag: z.string().describe(
        "Tag is used to expose a dedicated url for referencing this target exclusively.",
      ).optional(),
      url: z.string().describe(
        "Output only. URL displays the URL for accessing tagged traffic targets. URL is displayed in status, and is disallowed on spec. URL must contain a scheme (e.g. https://) and a hostname, but may not contain anything else (e.g. basic auth, url path, etc.)",
      ).optional(),
    })).describe(
      "Specifies how to distribute traffic over a collection of Knative Revisions and Configurations to the Service's main URL.",
    ).optional(),
  }).describe("Holds the desired state of the Service (from the client).")
    .optional(),
  status: z.object({
    address: z.object({
      url: z.string().optional(),
    }).describe(
      "Similar to url, information on where the service is available on HTTP.",
    ).optional(),
    conditions: z.array(z.object({
      lastTransitionTime: z.string().describe(
        "Optional. Last time the condition transitioned from one status to another.",
      ).optional(),
      message: z.string().describe(
        "Optional. Human readable message indicating details about the current status.",
      ).optional(),
      reason: z.string().describe(
        "Optional. One-word CamelCase reason for the condition's last transition. These are intended to be stable, unique values which the client may use to trigger error handling logic, whereas messages which may be changed later by the server.",
      ).optional(),
      severity: z.string().describe(
        "Optional. How to interpret this condition. One of Error, Warning, or Info. Conditions of severity Info do not contribute to resource readiness.",
      ).optional(),
      status: z.string().describe(
        "Status of the condition, one of True, False, Unknown.",
      ).optional(),
      type: z.string().describe(
        'type is used to communicate the status of the reconciliation process. Types common to all resources include: * "Ready" or "Completed": True when the Resource is ready.',
      ).optional(),
    })).describe(
      "Conditions communicate information about ongoing/complete reconciliation processes that bring the `spec` inline with the observed state of the world. Service-specific conditions include: * `ConfigurationsReady`: `True` when the underlying Configuration is ready. * `RoutesReady`: `True` when the underlying Route is ready. * `Ready`: `True` when all underlying resources are ready.",
    ).optional(),
    latestCreatedRevisionName: z.string().describe(
      "Name of the last revision that was created from this Service's Configuration. It might not be ready yet, for that use LatestReadyRevisionName.",
    ).optional(),
    latestReadyRevisionName: z.string().describe(
      "Name of the latest Revision from this Service's Configuration that has had its `Ready` condition become `True`.",
    ).optional(),
    observedGeneration: z.number().int().describe(
      "Returns the generation last seen by the system. Clients polling for completed reconciliation should poll until observedGeneration = metadata.generation and the Ready condition's status is True or False.",
    ).optional(),
    traffic: z.array(z.object({
      configurationName: z.string().describe(
        "[Deprecated] Not supported in Cloud Run. It must be empty.",
      ).optional(),
      latestRevision: z.boolean().describe(
        'Uses the "status.latestReadyRevisionName" of the Service to determine the traffic target. When it changes, traffic will automatically migrate from the prior "latest ready" revision to the new one. This field must be false if RevisionName is set. This field defaults to true otherwise. If the field is set to true on Status, this means that the Revision was resolved from the Service\'s latest ready revision.',
      ).optional(),
      percent: z.number().int().describe(
        "Percent specifies percent of the traffic to this Revision or Configuration. This defaults to zero if unspecified.",
      ).optional(),
      revisionName: z.string().describe(
        "Points this traffic target to a specific Revision. This field is mutually exclusive with latest_revision.",
      ).optional(),
      tag: z.string().describe(
        "Tag is used to expose a dedicated url for referencing this target exclusively.",
      ).optional(),
      url: z.string().describe(
        "Output only. URL displays the URL for accessing tagged traffic targets. URL is displayed in status, and is disallowed on spec. URL must contain a scheme (e.g. https://) and a hostname, but may not contain anything else (e.g. basic auth, url path, etc.)",
      ).optional(),
    })).describe(
      "Holds the configured traffic distribution. These entries will always contain RevisionName references. When ConfigurationName appears in the spec, this will hold the LatestReadyRevisionName that we last observed.",
    ).optional(),
    url: z.string().describe(
      "URL that will distribute traffic over the provided traffic targets. It generally has the form `https://{route-hash}-{project-hash}-{cluster-level-suffix}.a.run.app`",
    ).optional(),
  }).describe("Communicates the system-controlled state of the Service.")
    .optional(),
  dryRun: z.string().describe(
    "Indicates that the server should validate the request and populate default values without persisting the request. Supported values: `all`",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  apiVersion: z.string().optional(),
  kind: z.string().optional(),
  metadata: z.object({
    annotations: z.record(z.string(), z.unknown()),
    clusterName: z.string(),
    creationTimestamp: z.string(),
    deletionGracePeriodSeconds: z.number(),
    deletionTimestamp: z.string(),
    finalizers: z.array(z.string()),
    generateName: z.string(),
    generation: z.number(),
    labels: z.record(z.string(), z.unknown()),
    name: z.string(),
    namespace: z.string(),
    ownerReferences: z.array(z.object({
      apiVersion: z.string(),
      blockOwnerDeletion: z.boolean(),
      controller: z.boolean(),
      kind: z.string(),
      name: z.string(),
      uid: z.string(),
    })),
    resourceVersion: z.string(),
    selfLink: z.string(),
    uid: z.string(),
  }).optional(),
  spec: z.object({
    template: z.object({
      metadata: z.object({
        annotations: z.record(z.string(), z.unknown()),
        clusterName: z.string(),
        creationTimestamp: z.string(),
        deletionGracePeriodSeconds: z.number(),
        deletionTimestamp: z.string(),
        finalizers: z.array(z.string()),
        generateName: z.string(),
        generation: z.number(),
        labels: z.record(z.string(), z.unknown()),
        name: z.string(),
        namespace: z.string(),
        ownerReferences: z.array(z.object({
          apiVersion: z.unknown(),
          blockOwnerDeletion: z.unknown(),
          controller: z.unknown(),
          kind: z.unknown(),
          name: z.unknown(),
          uid: z.unknown(),
        })),
        resourceVersion: z.string(),
        selfLink: z.string(),
        uid: z.string(),
      }),
      spec: z.object({
        containerConcurrency: z.number(),
        containers: z.array(z.object({
          args: z.unknown(),
          command: z.unknown(),
          env: z.unknown(),
          envFrom: z.unknown(),
          image: z.unknown(),
          imagePullPolicy: z.unknown(),
          livenessProbe: z.unknown(),
          name: z.unknown(),
          ports: z.unknown(),
          readinessProbe: z.unknown(),
          resources: z.unknown(),
          sandboxLauncher: z.unknown(),
          securityContext: z.unknown(),
          startupProbe: z.unknown(),
          terminationMessagePath: z.unknown(),
          terminationMessagePolicy: z.unknown(),
          volumeMounts: z.unknown(),
          workingDir: z.unknown(),
        })),
        enableServiceLinks: z.boolean(),
        imagePullSecrets: z.array(z.object({
          name: z.unknown(),
        })),
        nodeSelector: z.record(z.string(), z.unknown()),
        runtimeClassName: z.string(),
        serviceAccountName: z.string(),
        timeoutSeconds: z.number(),
        volumes: z.array(z.object({
          configMap: z.unknown(),
          csi: z.unknown(),
          emptyDir: z.unknown(),
          name: z.unknown(),
          nfs: z.unknown(),
          secret: z.unknown(),
        })),
      }),
    }),
    traffic: z.array(z.object({
      configurationName: z.string(),
      latestRevision: z.boolean(),
      percent: z.number(),
      revisionName: z.string(),
      tag: z.string(),
      url: z.string(),
    })),
  }).optional(),
  status: z.object({
    address: z.object({
      url: z.string(),
    }),
    conditions: z.array(z.object({
      lastTransitionTime: z.string(),
      message: z.string(),
      reason: z.string(),
      severity: z.string(),
      status: z.string(),
      type: z.string(),
    })),
    latestCreatedRevisionName: z.string(),
    latestReadyRevisionName: z.string(),
    observedGeneration: z.number(),
    traffic: z.array(z.object({
      configurationName: z.string(),
      latestRevision: z.boolean(),
      percent: z.number(),
      revisionName: z.string(),
      tag: z.string(),
      url: z.string(),
    })),
    url: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  apiVersion: z.string().describe(
    'The API version for this call. It must be "serving.knative.dev/v1".',
  ).optional(),
  metadata: z.object({
    annotations: z.record(z.string(), z.string()).describe(
      "Unstructured key value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. In Cloud Run, annotations with 'run.googleapis.com/' and 'autoscaling.knative.dev' are restricted, and the accepted annotations will be different depending on the resource type. * `autoscaling.knative.dev/maxScale`: Revision. * `autoscaling.knative.dev/minScale`: Revision. * `run.googleapis.com/base-images`: Service, Revision. * `run.googleapis.com/binary-authorization-breakglass`: Service, Job, * `run.googleapis.com/binary-authorization`: Service, Job, Execution. * `run.googleapis.com/build-base-image`: Service. * `run.googleapis.com/build-enable-automatic-updates`: Service. * `run.googleapis.com/build-environment-variables`: Service. * `run.googleapis.com/build-function-target`: Service, Revision. * `run.googleapis.com/build-id`: Service, Revision. * `run.googleapis.com/build-image-uri`: Service. * `run.googleapis.com/build-name`: Service. * `run.googleapis.com/build-service-account`: Service. * `run.googleapis.com/build-source-location`: Service, Revision. * `run.googleapis.com/build-worker-pool`: Service. * `run.googleapis.com/client-name`: All resources. * `run.googleapis.com/cloudsql-instances`: Revision, Execution, Instance. * `run.googleapis.com/container-dependencies`: Revision, Instance. * `run.googleapis.com/cpu-throttling`: Revision. * `run.googleapis.com/custom-audiences`: Service. * `run.googleapis.com/default-url-disabled`: Service. * `run.googleapis.com/description`: Service. * `run.googleapis.com/encryption-key-shutdown-hours`: Revision. * `run.googleapis.com/encryption-key`: Revision, Execution, Instance. * `run.googleapis.com/execution-environment`: Revision, Execution. * `run.googleapis.com/gc-traffic-tags`: Service. * `run.googleapis.com/gpu-zonal-redundancy-disabled`: Revision. * `run.googleapis.com/health-check-disabled`: Revision. * `run.googleapis.com/ingress`: Service, Instance. * `run.googleapis.com/invoker-iam-disabled`: Service, Instance. * `run.googleapis.com/launch-stage`: Service, Job. * `run.googleapis.com/minScale`: Service. * `run.googleapis.com/maxScale`: Service. * `run.googleapis.com/manualInstanceCount`: Service. * `run.googleapis.com/network-interfaces`: Revision, Execution, Instance. * `run.googleapis.com/post-key-revocation-action-type`: Revision. * `run.googleapis.com/scalingMode`: Service. * `run.googleapis.com/secrets`: Revision, Execution. * `run.googleapis.com/secure-session-agent`: Revision. * `run.googleapis.com/sessionAffinity`: Revision. * `run.googleapis.com/startup-cpu-boost`: Revision. * `run.googleapis.com/vpc-access-connector`: Revision, Execution. * `run.googleapis.com/vpc-access-egress`: Revision, Execution, Instance.",
    ).optional(),
    clusterName: z.string().describe("Not supported by Cloud Run").optional(),
    creationTimestamp: z.string().describe(
      "UTC timestamp representing the server time when this object was created.",
    ).optional(),
    deletionGracePeriodSeconds: z.number().int().describe(
      "Not supported by Cloud Run",
    ).optional(),
    deletionTimestamp: z.string().describe(
      "The read-only soft deletion timestamp for this resource. In Cloud Run, users are not able to set this field. Instead, they must call the corresponding Delete API.",
    ).optional(),
    finalizers: z.array(z.string()).describe("Not supported by Cloud Run")
      .optional(),
    generateName: z.string().describe(
      "Optional. A prefix for the resource name if not provided in the create request. Must be less than 31 characters to allow for a random suffix.",
    ).optional(),
    generation: z.number().int().describe(
      "A system-provided sequence number representing a specific generation of the desired state.",
    ).optional(),
    labels: z.record(z.string(), z.string()).describe(
      "Map of string keys and values that can be used to organize and categorize (scope and select) objects. May match selectors of replication controllers and routes.",
    ).optional(),
    name: z.string().describe(
      "Optional. The name of the resource. A name for creating top-level resources (Service, Job, WorkerPool). Must be unique within a Cloud Run project/region, and cannot be changed once created. If omitted, a default name will be generated.",
    ).optional(),
    namespace: z.string().describe(
      "Required. Defines the space within each name must be unique within a Cloud Run region. In Cloud Run, it must be project ID or number.",
    ).optional(),
    ownerReferences: z.array(z.object({
      apiVersion: z.string().describe(
        "This is not supported or used by Cloud Run.",
      ).optional(),
      blockOwnerDeletion: z.boolean().describe(
        "This is not supported or used by Cloud Run.",
      ).optional(),
      controller: z.boolean().describe(
        "This is not supported or used by Cloud Run.",
      ).optional(),
      kind: z.string().describe("This is not supported or used by Cloud Run.")
        .optional(),
      name: z.string().describe("This is not supported or used by Cloud Run.")
        .optional(),
      uid: z.string().describe("This is not supported or used by Cloud Run.")
        .optional(),
    })).describe("Not supported by Cloud Run").optional(),
    resourceVersion: z.string().describe(
      "Opaque, system-generated value that represents the internal version of this object that can be used by clients to determine when objects have changed. May be used for optimistic concurrency, change detection, and the watch operation on a resource or set of resources. Clients must treat these values as opaque and passed unmodified back to the server or omit the value to disable conflict-detection.",
    ).optional(),
    selfLink: z.string().describe("URL representing this object.").optional(),
    uid: z.string().describe(
      "Unique, system-generated identifier for this resource.",
    ).optional(),
  }).describe(
    "Metadata associated with this Service, including name, namespace, labels, and annotations. In Cloud Run, annotations with 'run.googleapis.com/' and 'autoscaling.knative.dev' are restricted, and the accepted annotations will be different depending on the resource type. The following Cloud Run-specific annotations are accepted in Service.metadata.annotations. * `run.googleapis.com/base-images` * `run.googleapis.com/binary-authorization-breakglass` * `run.googleapis.com/binary-authorization` * `run.googleapis.com/client-name` * `run.googleapis.com/custom-audiences` * `run.googleapis.com/default-url-disabled` * `run.googleapis.com/description` * `run.googleapis.com/gc-traffic-tags` * `run.googleapis.com/ingress` * `run.googleapis.com/ingress` sets the ingress settings for the Service. See [the ingress settings documentation](/run/docs/securing/ingress) for details on configuring ingress settings. * `run.googleapis.com/ingress-status` is output-only and contains the currently active ingress settings for the Service. `run.googleapis.com/ingress-status` may differ from `run.googleapis.com/ingress` while the system is processing a change to `run.googleapis.com/ingress` or if the system failed to process a change to `run.googleapis.com/ingress`. When the system has processed all changes successfully `run.googleapis.com/ingress-status` and `run.googleapis.com/ingress` are equal.",
  ).optional(),
  spec: z.object({
    template: z.object({
      metadata: z.object({
        annotations: z.record(z.string(), z.string()).describe(
          "Unstructured key value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. In Cloud Run, annotations with 'run.googleapis.com/' and 'autoscaling.knative.dev' are restricted, and the accepted annotations will be different depending on the resource type. * `autoscaling.knative.dev/maxScale`: Revision. * `autoscaling.knative.dev/minScale`: Revision. * `run.googleapis.com/base-images`: Service, Revision. * `run.googleapis.com/binary-authorization-breakglass`: Service, Job, * `run.googleapis.com/binary-authorization`: Service, Job, Execution. * `run.googleapis.com/build-base-image`: Service. * `run.googleapis.com/build-enable-automatic-updates`: Service. * `run.googleapis.com/build-environment-variables`: Service. * `run.googleapis.com/build-function-target`: Service, Revision. * `run.googleapis.com/build-id`: Service, Revision. * `run.googleapis.com/build-image-uri`: Service. * `run.googleapis.com/build-name`: Service. * `run.googleapis.com/build-service-account`: Service. * `run.googleapis.com/build-source-location`: Service, Revision. * `run.googleapis.com/build-worker-pool`: Service. * `run.googleapis.com/client-name`: All resources. * `run.googleapis.com/cloudsql-instances`: Revision, Execution, Instance. * `run.googleapis.com/container-dependencies`: Revision, Instance. * `run.googleapis.com/cpu-throttling`: Revision. * `run.googleapis.com/custom-audiences`: Service. * `run.googleapis.com/default-url-disabled`: Service. * `run.googleapis.com/description`: Service. * `run.googleapis.com/encryption-key-shutdown-hours`: Revision. * `run.googleapis.com/encryption-key`: Revision, Execution, Instance. * `run.googleapis.com/execution-environment`: Revision, Execution. * `run.googleapis.com/gc-traffic-tags`: Service. * `run.googleapis.com/gpu-zonal-redundancy-disabled`: Revision. * `run.googleapis.com/health-check-disabled`: Revision. * `run.googleapis.com/ingress`: Service, Instance. * `run.googleapis.com/invoker-iam-disabled`: Service, Instance. * `run.googleapis.com/launch-stage`: Service, Job. * `run.googleapis.com/minScale`: Service. * `run.googleapis.com/maxScale`: Service. * `run.googleapis.com/manualInstanceCount`: Service. * `run.googleapis.com/network-interfaces`: Revision, Execution, Instance. * `run.googleapis.com/post-key-revocation-action-type`: Revision. * `run.googleapis.com/scalingMode`: Service. * `run.googleapis.com/secrets`: Revision, Execution. * `run.googleapis.com/secure-session-agent`: Revision. * `run.googleapis.com/sessionAffinity`: Revision. * `run.googleapis.com/startup-cpu-boost`: Revision. * `run.googleapis.com/vpc-access-connector`: Revision, Execution. * `run.googleapis.com/vpc-access-egress`: Revision, Execution, Instance.",
        ).optional(),
        clusterName: z.string().describe("Not supported by Cloud Run")
          .optional(),
        creationTimestamp: z.string().describe(
          "UTC timestamp representing the server time when this object was created.",
        ).optional(),
        deletionGracePeriodSeconds: z.number().int().describe(
          "Not supported by Cloud Run",
        ).optional(),
        deletionTimestamp: z.string().describe(
          "The read-only soft deletion timestamp for this resource. In Cloud Run, users are not able to set this field. Instead, they must call the corresponding Delete API.",
        ).optional(),
        finalizers: z.array(z.string()).describe("Not supported by Cloud Run")
          .optional(),
        generateName: z.string().describe(
          "Optional. A prefix for the resource name if not provided in the create request. Must be less than 31 characters to allow for a random suffix.",
        ).optional(),
        generation: z.number().int().describe(
          "A system-provided sequence number representing a specific generation of the desired state.",
        ).optional(),
        labels: z.record(z.string(), z.string()).describe(
          "Map of string keys and values that can be used to organize and categorize (scope and select) objects. May match selectors of replication controllers and routes.",
        ).optional(),
        name: z.string().describe(
          "Optional. The name of the resource. A name for creating top-level resources (Service, Job, WorkerPool). Must be unique within a Cloud Run project/region, and cannot be changed once created. If omitted, a default name will be generated.",
        ).optional(),
        namespace: z.string().describe(
          "Required. Defines the space within each name must be unique within a Cloud Run region. In Cloud Run, it must be project ID or number.",
        ).optional(),
        ownerReferences: z.array(z.object({
          apiVersion: z.unknown().describe(
            "This is not supported or used by Cloud Run.",
          ).optional(),
          blockOwnerDeletion: z.unknown().describe(
            "This is not supported or used by Cloud Run.",
          ).optional(),
          controller: z.unknown().describe(
            "This is not supported or used by Cloud Run.",
          ).optional(),
          kind: z.unknown().describe(
            "This is not supported or used by Cloud Run.",
          ).optional(),
          name: z.unknown().describe(
            "This is not supported or used by Cloud Run.",
          ).optional(),
          uid: z.unknown().describe(
            "This is not supported or used by Cloud Run.",
          ).optional(),
        })).describe("Not supported by Cloud Run").optional(),
        resourceVersion: z.string().describe(
          "Opaque, system-generated value that represents the internal version of this object that can be used by clients to determine when objects have changed. May be used for optimistic concurrency, change detection, and the watch operation on a resource or set of resources. Clients must treat these values as opaque and passed unmodified back to the server or omit the value to disable conflict-detection.",
        ).optional(),
        selfLink: z.string().describe("URL representing this object.")
          .optional(),
        uid: z.string().describe(
          "Unique, system-generated identifier for this resource.",
        ).optional(),
      }).describe(
        "Optional metadata for this Revision, including labels and annotations. Name will be generated by the Configuration. The following annotation keys set properties of the created revision: * `autoscaling.knative.dev/minScale` sets the minimum number of instances. * `autoscaling.knative.dev/maxScale` sets the maximum number of instances. * `run.googleapis.com/cloudsql-instances` sets Cloud SQL connections. Multiple values should be comma separated. * `run.googleapis.com/health-check-disabled`: if true, deploy-time startup probes will not run for this revision. * `run.googleapis.com/vpc-access-connector` sets a Serverless VPC Access connector. * `run.googleapis.com/vpc-access-egress` sets VPC egress. Supported values are `all-traffic`, `all` (deprecated), and `private-ranges-only`. `all-traffic` and `all` provide the same functionality. `all` is deprecated but will continue to be supported. Prefer `all-traffic`.",
      ).optional(),
      spec: z.object({
        containerConcurrency: z.number().int().describe(
          "ContainerConcurrency specifies the maximum allowed in-flight (concurrent) requests per container instance of the Revision. If not specified or 0, defaults to 80 when requested CPU >= 1 and defaults to 1 when requested CPU < 1.",
        ).optional(),
        containers: z.array(z.object({
          args: z.unknown().describe(
            "Arguments to the entrypoint. The docker image's CMD is used if this is not provided. Variable references are not supported in Cloud Run.",
          ).optional(),
          command: z.unknown().describe(
            "Entrypoint array. Not executed within a shell. The docker image's ENTRYPOINT is used if this is not provided. Variable references are not supported in Cloud Run.",
          ).optional(),
          env: z.unknown().describe(
            "List of environment variables to set in the container. EnvVar with duplicate names are generally allowed; if referencing a secret, the name must be unique for the container. For non-secret EnvVar names, the Container will only get the last-declared one.",
          ).optional(),
          envFrom: z.unknown().describe("Not supported by Cloud Run.")
            .optional(),
          image: z.unknown().describe(
            "Required. Name of the container image in Dockerhub, Google Artifact Registry, or Google Container Registry. If the host is not provided, Dockerhub is assumed.",
          ).optional(),
          imagePullPolicy: z.unknown().describe(
            "Image pull policy. One of Always, Never, IfNotPresent. Defaults to Always if:latest tag is specified, or IfNotPresent otherwise.",
          ).optional(),
          livenessProbe: z.unknown().describe(
            "Periodic probe of container liveness. Container will be restarted if the probe fails.",
          ).optional(),
          name: z.unknown().describe(
            "Name of the container specified as a DNS_LABEL (RFC 1123).",
          ).optional(),
          ports: z.unknown().describe(
            "List of ports to expose from the container. Only a single port can be specified. The specified ports must be listening on all interfaces (0.0.0.0) within the container to be accessible. If omitted, a port number will be chosen and passed to the container through the PORT environment variable for the container to listen on.",
          ).optional(),
          readinessProbe: z.unknown().describe(
            "Readiness probe to be used for health checks.",
          ).optional(),
          resources: z.unknown().describe(
            "Compute Resources required by this container.",
          ).optional(),
          sandboxLauncher: z.unknown().describe(
            "Optional. Indicates that this container can act as a sandbox supervisor and launch sandboxes.",
          ).optional(),
          securityContext: z.unknown().describe("Not supported by Cloud Run.")
            .optional(),
          startupProbe: z.unknown().describe(
            "Startup probe of application within the container. All other probes are disabled if a startup probe is provided, until it succeeds. Container will not receive traffic if the probe fails. If not provided, a default startup probe with TCP socket action is used.",
          ).optional(),
          terminationMessagePath: z.unknown().describe(
            "Path at which the file to which the container's termination message will be written is mounted into the container's filesystem. Message written is intended to be brief final status, such as an assertion failure message. Will be truncated by the node if greater than 4096 bytes. The total message length across all containers will be limited to 12kb. Defaults to /dev/termination-log.",
          ).optional(),
          terminationMessagePolicy: z.unknown().describe(
            "Indicate how the termination message should be populated. File will use the contents of terminationMessagePath to populate the container status message on both success and failure. FallbackToLogsOnError will use the last chunk of container log output if the termination message file is empty and the container exited with an error. The log output is limited to 2048 bytes or 80 lines, whichever is smaller. Defaults to File. Cannot be updated.",
          ).optional(),
          volumeMounts: z.unknown().describe(
            "Volume to mount into the container's filesystem. Only supports SecretVolumeSources. Pod volumes to mount into the container's filesystem.",
          ).optional(),
          workingDir: z.unknown().describe(
            "Container's working directory. If not specified, the container runtime's default will be used, which might be configured in the container image.",
          ).optional(),
        })).describe(
          "Required. Containers holds the list which define the units of execution for this Revision.",
        ).optional(),
        enableServiceLinks: z.boolean().describe("Not supported by Cloud Run.")
          .optional(),
        imagePullSecrets: z.array(z.object({
          name: z.unknown().describe("Name of the referent.").optional(),
        })).describe("Not supported by Cloud Run.").optional(),
        nodeSelector: z.record(z.string(), z.string()).describe(
          "Optional. The Node Selector configuration. Map of selector key to a value which matches a node.",
        ).optional(),
        runtimeClassName: z.string().describe(
          "Optional. Runtime. Leave unset for default.",
        ).optional(),
        serviceAccountName: z.string().describe(
          "Email address of the IAM service account associated with the revision of the service. The service account represents the identity of the running revision, and determines what permissions the revision has. If not provided, the revision will use the project's default service account.",
        ).optional(),
        timeoutSeconds: z.number().int().describe(
          "Optional. TimeoutSeconds holds the max duration the instance is allowed for responding to a request. Cloud Run: defaults to 300 seconds (5 minutes). Maximum allowed value is 3600 seconds (1 hour).",
        ).optional(),
        volumes: z.array(z.object({
          configMap: z.unknown().describe("Not supported in Cloud Run.")
            .optional(),
          csi: z.unknown().describe(
            "Volume specified by the Container Storage Interface driver",
          ).optional(),
          emptyDir: z.unknown().describe(
            "Ephemeral storage used as a shared volume.",
          ).optional(),
          name: z.unknown().describe(
            "Volume's name. In Cloud Run Fully Managed, the name 'cloudsql' is reserved.",
          ).optional(),
          nfs: z.unknown().describe(
            "Represents a persistent volume that will be mounted using NFS. This volume will be shared between all instances of the resource and data will not be deleted when the instance is shut down.",
          ).optional(),
          secret: z.unknown().describe(
            "The secret's value will be presented as the content of a file whose name is defined in the item path. If no items are defined, the name of the file is the secretName.",
          ).optional(),
        })).optional(),
      }).describe(
        "RevisionSpec holds the desired state of the Revision (from the client).",
      ).optional(),
    }).describe(
      "Holds the latest specification for the Revision to be stamped out.",
    ).optional(),
    traffic: z.array(z.object({
      configurationName: z.string().describe(
        "[Deprecated] Not supported in Cloud Run. It must be empty.",
      ).optional(),
      latestRevision: z.boolean().describe(
        'Uses the "status.latestReadyRevisionName" of the Service to determine the traffic target. When it changes, traffic will automatically migrate from the prior "latest ready" revision to the new one. This field must be false if RevisionName is set. This field defaults to true otherwise. If the field is set to true on Status, this means that the Revision was resolved from the Service\'s latest ready revision.',
      ).optional(),
      percent: z.number().int().describe(
        "Percent specifies percent of the traffic to this Revision or Configuration. This defaults to zero if unspecified.",
      ).optional(),
      revisionName: z.string().describe(
        "Points this traffic target to a specific Revision. This field is mutually exclusive with latest_revision.",
      ).optional(),
      tag: z.string().describe(
        "Tag is used to expose a dedicated url for referencing this target exclusively.",
      ).optional(),
      url: z.string().describe(
        "Output only. URL displays the URL for accessing tagged traffic targets. URL is displayed in status, and is disallowed on spec. URL must contain a scheme (e.g. https://) and a hostname, but may not contain anything else (e.g. basic auth, url path, etc.)",
      ).optional(),
    })).describe(
      "Specifies how to distribute traffic over a collection of Knative Revisions and Configurations to the Service's main URL.",
    ).optional(),
  }).describe("Holds the desired state of the Service (from the client).")
    .optional(),
  status: z.object({
    address: z.object({
      url: z.string().optional(),
    }).describe(
      "Similar to url, information on where the service is available on HTTP.",
    ).optional(),
    conditions: z.array(z.object({
      lastTransitionTime: z.string().describe(
        "Optional. Last time the condition transitioned from one status to another.",
      ).optional(),
      message: z.string().describe(
        "Optional. Human readable message indicating details about the current status.",
      ).optional(),
      reason: z.string().describe(
        "Optional. One-word CamelCase reason for the condition's last transition. These are intended to be stable, unique values which the client may use to trigger error handling logic, whereas messages which may be changed later by the server.",
      ).optional(),
      severity: z.string().describe(
        "Optional. How to interpret this condition. One of Error, Warning, or Info. Conditions of severity Info do not contribute to resource readiness.",
      ).optional(),
      status: z.string().describe(
        "Status of the condition, one of True, False, Unknown.",
      ).optional(),
      type: z.string().describe(
        'type is used to communicate the status of the reconciliation process. Types common to all resources include: * "Ready" or "Completed": True when the Resource is ready.',
      ).optional(),
    })).describe(
      "Conditions communicate information about ongoing/complete reconciliation processes that bring the `spec` inline with the observed state of the world. Service-specific conditions include: * `ConfigurationsReady`: `True` when the underlying Configuration is ready. * `RoutesReady`: `True` when the underlying Route is ready. * `Ready`: `True` when all underlying resources are ready.",
    ).optional(),
    latestCreatedRevisionName: z.string().describe(
      "Name of the last revision that was created from this Service's Configuration. It might not be ready yet, for that use LatestReadyRevisionName.",
    ).optional(),
    latestReadyRevisionName: z.string().describe(
      "Name of the latest Revision from this Service's Configuration that has had its `Ready` condition become `True`.",
    ).optional(),
    observedGeneration: z.number().int().describe(
      "Returns the generation last seen by the system. Clients polling for completed reconciliation should poll until observedGeneration = metadata.generation and the Ready condition's status is True or False.",
    ).optional(),
    traffic: z.array(z.object({
      configurationName: z.string().describe(
        "[Deprecated] Not supported in Cloud Run. It must be empty.",
      ).optional(),
      latestRevision: z.boolean().describe(
        'Uses the "status.latestReadyRevisionName" of the Service to determine the traffic target. When it changes, traffic will automatically migrate from the prior "latest ready" revision to the new one. This field must be false if RevisionName is set. This field defaults to true otherwise. If the field is set to true on Status, this means that the Revision was resolved from the Service\'s latest ready revision.',
      ).optional(),
      percent: z.number().int().describe(
        "Percent specifies percent of the traffic to this Revision or Configuration. This defaults to zero if unspecified.",
      ).optional(),
      revisionName: z.string().describe(
        "Points this traffic target to a specific Revision. This field is mutually exclusive with latest_revision.",
      ).optional(),
      tag: z.string().describe(
        "Tag is used to expose a dedicated url for referencing this target exclusively.",
      ).optional(),
      url: z.string().describe(
        "Output only. URL displays the URL for accessing tagged traffic targets. URL is displayed in status, and is disallowed on spec. URL must contain a scheme (e.g. https://) and a hostname, but may not contain anything else (e.g. basic auth, url path, etc.)",
      ).optional(),
    })).describe(
      "Holds the configured traffic distribution. These entries will always contain RevisionName references. When ConfigurationName appears in the spec, this will hold the LatestReadyRevisionName that we last observed.",
    ).optional(),
    url: z.string().describe(
      "URL that will distribute traffic over the provided traffic targets. It generally has the form `https://{route-hash}-{project-hash}-{cluster-level-suffix}.a.run.app`",
    ).optional(),
  }).describe("Communicates the system-controlled state of the Service.")
    .optional(),
  dryRun: z.string().describe(
    "Indicates that the server should validate the request and populate default values without persisting the request. Supported values: `all`",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
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

/** Swamp extension model for Google Cloud Run Admin Namespaces.Services. Registered at `@swamp/gcp/run/namespaces-services`. */
export const model = {
  type: "@swamp/gcp/run/namespaces-services",
  version: "2026.09.24.1",
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
      toVersion: "2026.08.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.07.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.10.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.24.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Service acts as a top-level container that manages a set of Routes and Config...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a services",
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
        if (g["apiVersion"] !== undefined) body["apiVersion"] = g["apiVersion"];
        if (g["metadata"] !== undefined) body["metadata"] = g["metadata"];
        if (g["spec"] !== undefined) body["spec"] = g["spec"];
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["dryRun"] !== undefined) params["dryRun"] = String(g["dryRun"]);
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
          undefined,
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
      description: "Get a services",
      arguments: z.object({
        identifier: z.string().describe("The name of the services"),
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
    delete: {
      description: "Delete the services",
      arguments: z.object({
        identifier: z.string().describe("The name of the services"),
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
      description: "Sync services state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific services by name (e.g. one discovered by list)",
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
      description: "List services resources",
      arguments: z.object({
        continue: z.string().describe("Encoded string to continue paging.")
          .optional(),
        fieldSelector: z.string().describe(
          "Not supported, and ignored by Cloud Run.",
        ).optional(),
        includeUninitialized: z.boolean().describe(
          "Not supported, and ignored by Cloud Run.",
        ).optional(),
        labelSelector: z.string().describe(
          "Allows to filter resources based on a label. Supported operations are =, !=, exists, in, and notIn.",
        ).optional(),
        limit: z.number().describe(
          "The maximum number of records that should be returned.",
        ).optional(),
        resourceVersion: z.string().describe(
          "Not supported, and ignored by Cloud Run.",
        ).optional(),
        watch: z.boolean().describe("Not supported, and ignored by Cloud Run.")
          .optional(),
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
        if (args["continue"] !== undefined) {
          params["continue"] = String(args["continue"]);
        }
        if (args["fieldSelector"] !== undefined) {
          params["fieldSelector"] = String(args["fieldSelector"]);
        }
        if (args["includeUninitialized"] !== undefined) {
          params["includeUninitialized"] = String(args["includeUninitialized"]);
        }
        if (args["labelSelector"] !== undefined) {
          params["labelSelector"] = String(args["labelSelector"]);
        }
        if (args["limit"] !== undefined) {
          params["limit"] = String(args["limit"]);
        }
        if (args["resourceVersion"] !== undefined) {
          params["resourceVersion"] = String(args["resourceVersion"]);
        }
        if (args["watch"] !== undefined) {
          params["watch"] = String(args["watch"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "items",
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
    replace_service: {
      description: "replace service",
      arguments: z.object({
        apiVersion: z.any().optional(),
        kind: z.any().optional(),
        metadata: z.any().optional(),
        spec: z.any().optional(),
        status: z.any().optional(),
        dryRun: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
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
        if (args["dryRun"] !== undefined) {
          params["dryRun"] = String(args["dryRun"]);
        }
        const body: Record<string, unknown> = {};
        if (args["apiVersion"] !== undefined) {
          body["apiVersion"] = args["apiVersion"];
        }
        if (args["kind"] !== undefined) body["kind"] = args["kind"];
        if (args["metadata"] !== undefined) body["metadata"] = args["metadata"];
        if (args["spec"] !== undefined) body["spec"] = args["spec"];
        if (args["status"] !== undefined) body["status"] = args["status"];
        const result = await createResource(
          baseUrl,
          {
            "id": "run.namespaces.services.replaceService",
            "path": "apis/serving.knative.dev/v1/{+name}",
            "httpMethod": "PUT",
            "parameterOrder": ["name"],
            "parameters": {
              "dryRun": { "location": "query" },
              "name": { "location": "path", "required": true },
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
