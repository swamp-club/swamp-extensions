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

// Auto-generated extension model for @swamp/gcp/run/namespaces-instances
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Run Admin Namespaces.Instances.
 *
 * Instance represents the configuration of a single Instance, which references a container image which is run to completion.
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
  return `${parent}/instances/${shortName}`;
}

const BASE_URL = "https://run.googleapis.com/";

const GET_CONFIG = {
  "id": "run.namespaces.instances.get",
  "path": "apis/run.googleapis.com/v1/{+name}",
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
  "id": "run.namespaces.instances.create",
  "path": "apis/run.googleapis.com/v1/{+parent}/instances",
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

const DELETE_CONFIG = {
  "id": "run.namespaces.instances.delete",
  "path": "apis/run.googleapis.com/v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "apiVersion": {
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
  "id": "run.namespaces.instances.list",
  "path": "apis/run.googleapis.com/v1/{+parent}/instances",
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
  apiVersion: z.string().describe(
    "Optional. APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values.",
  ).optional(),
  metadata: z.object({
    annotations: z.record(z.string(), z.string()).describe(
      "Unstructured key value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. In Cloud Run, annotations with 'run.googleapis.com/' and 'autoscaling.knative.dev' are restricted, and the accepted annotations will be different depending on the resource type. * `autoscaling.knative.dev/maxScale`: Revision. * `autoscaling.knative.dev/minScale`: Revision. * `run.googleapis.com/base-images`: Service, Revision. * `run.googleapis.com/binary-authorization-breakglass`: Service, Job, * `run.googleapis.com/binary-authorization`: Service, Job, Execution. * `run.googleapis.com/build-base-image`: Service. * `run.googleapis.com/build-enable-automatic-updates`: Service. * `run.googleapis.com/build-environment-variables`: Service. * `run.googleapis.com/build-function-target`: Service, Revision. * `run.googleapis.com/build-id`: Service, Revision. * `run.googleapis.com/build-image-uri`: Service. * `run.googleapis.com/build-name`: Service. * `run.googleapis.com/build-service-account`: Service. * `run.googleapis.com/build-source-location`: Service, Revision. * `run.googleapis.com/build-worker-pool`: Service. * `run.googleapis.com/client-name`: All resources. * `run.googleapis.com/cloudsql-instances`: Revision, Execution. * `run.googleapis.com/container-dependencies`: Revision. * `run.googleapis.com/cpu-throttling`: Revision. * `run.googleapis.com/custom-audiences`: Service. * `run.googleapis.com/default-url-disabled`: Service. * `run.googleapis.com/description`: Service. * `run.googleapis.com/encryption-key-shutdown-hours`: Revision * `run.googleapis.com/encryption-key`: Revision, Execution. * `run.googleapis.com/execution-environment`: Revision, Execution. * `run.googleapis.com/gc-traffic-tags`: Service. * `run.googleapis.com/gpu-zonal-redundancy-disabled`: Revision. * `run.googleapis.com/health-check-disabled`: Revision. * `run.googleapis.com/ingress`: Service, Instance. * `run.googleapis.com/invoker-iam-disabled`: Service, Instance. * `run.googleapis.com/launch-stage`: Service, Job. * `run.googleapis.com/minScale`: Service. * `run.googleapis.com/maxScale`: Service. * `run.googleapis.com/manualInstanceCount`: Service. * `run.googleapis.com/network-interfaces`: Revision, Execution. * `run.googleapis.com/post-key-revocation-action-type`: Revision. `run.googleapis.com/scalingMode`: Service. * `run.googleapis.com/secrets`: Revision, Execution. * `run.googleapis.com/secure-session-agent`: Revision. * `run.googleapis.com/sessionAffinity`: Revision. * `run.googleapis.com/startup-cpu-boost`: Revision. * `run.googleapis.com/vpc-access-connector`: Revision, Execution. * `run.googleapis.com/vpc-access-egress`: Revision, Execution.",
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
    "google.cloud.run.meta.v1.ObjectMeta is metadata that all persisted resources must have, which includes all objects users must create.",
  ).optional(),
  spec: z.object({
    containers: z.array(z.object({
      args: z.array(z.string()).describe(
        "Arguments to the entrypoint. The docker image's CMD is used if this is not provided. Variable references are not supported in Cloud Run.",
      ).optional(),
      command: z.array(z.string()).describe(
        "Entrypoint array. Not executed within a shell. The docker image's ENTRYPOINT is used if this is not provided. Variable references are not supported in Cloud Run.",
      ).optional(),
      env: z.array(z.object({
        name: z.unknown().describe(
          "Required. Name of the environment variable.",
        ).optional(),
        value: z.unknown().describe(
          'Value of the environment variable. Defaults to "". Variable references are not supported in Cloud Run.',
        ).optional(),
        valueFrom: z.unknown().describe(
          "EnvVarSource represents a source for the value of an EnvVar.",
        ).optional(),
      })).describe(
        "List of environment variables to set in the container. EnvVar with duplicate names are generally allowed; if referencing a secret, the name must be unique for the container. For non-secret EnvVar names, the Container will only get the last-declared one.",
      ).optional(),
      envFrom: z.array(z.object({
        configMapRef: z.unknown().describe(
          "Not supported by Cloud Run. ConfigMapEnvSource selects a ConfigMap to populate the environment variables with. The contents of the target ConfigMap's Data field will represent the key-value pairs as environment variables.",
        ).optional(),
        prefix: z.unknown().describe(
          "An optional identifier to prepend to each key in the ConfigMap. Must be a C_IDENTIFIER.",
        ).optional(),
        secretRef: z.unknown().describe(
          "Not supported by Cloud Run. SecretEnvSource selects a Secret to populate the environment variables with. The contents of the target Secret's Data field will represent the key-value pairs as environment variables.",
        ).optional(),
      })).describe("Not supported by Cloud Run.").optional(),
      image: z.string().describe(
        "Required. Name of the container image in Dockerhub, Google Artifact Registry, or Google Container Registry. If the host is not provided, Dockerhub is assumed.",
      ).optional(),
      imagePullPolicy: z.string().describe(
        "Image pull policy. One of Always, Never, IfNotPresent. Defaults to Always if:latest tag is specified, or IfNotPresent otherwise.",
      ).optional(),
      livenessProbe: z.object({
        exec: z.object({
          command: z.unknown().describe(
            "Command is the command line to execute inside the container, the working directory for the command is root ('/') in the container's filesystem. The command is simply exec'd, it is not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use a shell, you need to explicitly call out to that shell. Exit status of 0 is treated as live/healthy and non-zero is unhealthy.",
          ).optional(),
        }).describe(
          'Not supported by Cloud Run. ExecAction describes a "run in container" action.',
        ).optional(),
        failureThreshold: z.number().int().describe(
          "Minimum consecutive failures for the probe to be considered failed after having succeeded. Defaults to 3. Minimum value is 1.",
        ).optional(),
        grpc: z.object({
          port: z.unknown().describe(
            "Port number of the gRPC service. Number must be in the range 1 to 65535.",
          ).optional(),
          service: z.unknown().describe(
            "Service is the name of the service to place in the gRPC HealthCheckRequest. If this is not specified, the default behavior is defined by gRPC.",
          ).optional(),
        }).describe("GRPCAction describes an action involving a GRPC port.")
          .optional(),
        httpGet: z.object({
          host: z.unknown().describe("Not supported by Cloud Run.").optional(),
          httpHeaders: z.unknown().describe(
            "Custom headers to set in the request. HTTP allows repeated headers.",
          ).optional(),
          path: z.unknown().describe("Path to access on the HTTP server.")
            .optional(),
          port: z.unknown().describe(
            "Port number to access on the container. Number must be in the range 1 to 65535.",
          ).optional(),
          scheme: z.unknown().describe("Not supported by Cloud Run.")
            .optional(),
        }).describe(
          "HTTPGetAction describes an action based on HTTP Get requests.",
        ).optional(),
        initialDelaySeconds: z.number().int().describe(
          "Number of seconds after the container has started before the probe is initiated. Defaults to 0 seconds. Minimum value is 0. Maximum value for liveness probe is 3600. Maximum value for startup probe is 240.",
        ).optional(),
        periodSeconds: z.number().int().describe(
          "How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1. Maximum value for liveness probe is 3600. Maximum value for startup probe is 240. Must be greater or equal than timeout_seconds.",
        ).optional(),
        successThreshold: z.number().int().describe(
          "Minimum consecutive successes for the probe to be considered successful after having failed. Must be 1 if set.",
        ).optional(),
        tcpSocket: z.object({
          host: z.unknown().describe("Not supported by Cloud Run.").optional(),
          port: z.unknown().describe(
            "Port number to access on the container. Number must be in the range 1 to 65535.",
          ).optional(),
        }).describe(
          "TCPSocketAction describes an action based on opening a socket",
        ).optional(),
        timeoutSeconds: z.number().int().describe(
          "Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1. Maximum value is 3600. Must be smaller than period_seconds; if period_seconds is not set, must be less or equal than 10.",
        ).optional(),
      }).describe(
        "Probe describes a health check to be performed against a container to determine whether it is alive or ready to receive traffic.",
      ).optional(),
      name: z.string().describe(
        "Name of the container specified as a DNS_LABEL (RFC 1123).",
      ).optional(),
      ports: z.array(z.object({
        containerPort: z.unknown().describe(
          "Port number the container listens on. If present, this must be a valid port number, 0 < x < 65536. If not present, it will default to port 8080. For more information, see https://cloud.google.com/run/docs/container-contract#port",
        ).optional(),
        name: z.unknown().describe(
          'If specified, used to specify which protocol to use. Allowed values are "http1" and "h2c".',
        ).optional(),
        protocol: z.unknown().describe(
          'Protocol for port. Must be "TCP". Defaults to "TCP".',
        ).optional(),
      })).describe(
        "List of ports to expose from the container. Only a single port can be specified. The specified ports must be listening on all interfaces (0.0.0.0) within the container to be accessible. If omitted, a port number will be chosen and passed to the container through the PORT environment variable for the container to listen on.",
      ).optional(),
      readinessProbe: z.object({
        exec: z.object({
          command: z.unknown().describe(
            "Command is the command line to execute inside the container, the working directory for the command is root ('/') in the container's filesystem. The command is simply exec'd, it is not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use a shell, you need to explicitly call out to that shell. Exit status of 0 is treated as live/healthy and non-zero is unhealthy.",
          ).optional(),
        }).describe(
          'Not supported by Cloud Run. ExecAction describes a "run in container" action.',
        ).optional(),
        failureThreshold: z.number().int().describe(
          "Minimum consecutive failures for the probe to be considered failed after having succeeded. Defaults to 3. Minimum value is 1.",
        ).optional(),
        grpc: z.object({
          port: z.unknown().describe(
            "Port number of the gRPC service. Number must be in the range 1 to 65535.",
          ).optional(),
          service: z.unknown().describe(
            "Service is the name of the service to place in the gRPC HealthCheckRequest. If this is not specified, the default behavior is defined by gRPC.",
          ).optional(),
        }).describe("GRPCAction describes an action involving a GRPC port.")
          .optional(),
        httpGet: z.object({
          host: z.unknown().describe("Not supported by Cloud Run.").optional(),
          httpHeaders: z.unknown().describe(
            "Custom headers to set in the request. HTTP allows repeated headers.",
          ).optional(),
          path: z.unknown().describe("Path to access on the HTTP server.")
            .optional(),
          port: z.unknown().describe(
            "Port number to access on the container. Number must be in the range 1 to 65535.",
          ).optional(),
          scheme: z.unknown().describe("Not supported by Cloud Run.")
            .optional(),
        }).describe(
          "HTTPGetAction describes an action based on HTTP Get requests.",
        ).optional(),
        initialDelaySeconds: z.number().int().describe(
          "Number of seconds after the container has started before the probe is initiated. Defaults to 0 seconds. Minimum value is 0. Maximum value for liveness probe is 3600. Maximum value for startup probe is 240.",
        ).optional(),
        periodSeconds: z.number().int().describe(
          "How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1. Maximum value for liveness probe is 3600. Maximum value for startup probe is 240. Must be greater or equal than timeout_seconds.",
        ).optional(),
        successThreshold: z.number().int().describe(
          "Minimum consecutive successes for the probe to be considered successful after having failed. Must be 1 if set.",
        ).optional(),
        tcpSocket: z.object({
          host: z.unknown().describe("Not supported by Cloud Run.").optional(),
          port: z.unknown().describe(
            "Port number to access on the container. Number must be in the range 1 to 65535.",
          ).optional(),
        }).describe(
          "TCPSocketAction describes an action based on opening a socket",
        ).optional(),
        timeoutSeconds: z.number().int().describe(
          "Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1. Maximum value is 3600. Must be smaller than period_seconds; if period_seconds is not set, must be less or equal than 10.",
        ).optional(),
      }).describe(
        "Probe describes a health check to be performed against a container to determine whether it is alive or ready to receive traffic.",
      ).optional(),
      resources: z.object({
        limits: z.record(z.string(), z.unknown()).describe(
          "Limits describes the maximum amount of compute resources allowed. Only 'cpu', 'memory' and 'nvidia.com/gpu' keys are supported. * For supported 'cpu' values, go to https://cloud.google.com/run/docs/configuring/cpu. * For supported 'memory' values and syntax, go to https://cloud.google.com/run/docs/configuring/memory-limits. * The only supported 'nvidia.com/gpu' value is '1'.",
        ).optional(),
        requests: z.record(z.string(), z.unknown()).describe(
          "Requests describes the minimum amount of compute resources required. Only `cpu` and `memory` are supported. If Requests is omitted for a container, it defaults to Limits if that is explicitly specified, otherwise to an implementation-defined value. * For supported 'cpu' values, go to https://cloud.google.com/run/docs/configuring/cpu. * For supported 'memory' values and syntax, go to https://cloud.google.com/run/docs/configuring/memory-limits",
        ).optional(),
      }).describe(
        "ResourceRequirements describes the compute resource requirements.",
      ).optional(),
      securityContext: z.object({
        runAsUser: z.number().int().describe(
          "The UID to run the entrypoint of the container process. Defaults to user specified in image metadata if unspecified. May also be set in PodSecurityContext. If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.",
        ).optional(),
      }).describe(
        "Not supported by Cloud Run. SecurityContext holds security configuration that will be applied to a container. Some fields are present in both SecurityContext and PodSecurityContext. When both are set, the values in SecurityContext take precedence.",
      ).optional(),
      startupProbe: z.object({
        exec: z.object({
          command: z.unknown().describe(
            "Command is the command line to execute inside the container, the working directory for the command is root ('/') in the container's filesystem. The command is simply exec'd, it is not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use a shell, you need to explicitly call out to that shell. Exit status of 0 is treated as live/healthy and non-zero is unhealthy.",
          ).optional(),
        }).describe(
          'Not supported by Cloud Run. ExecAction describes a "run in container" action.',
        ).optional(),
        failureThreshold: z.number().int().describe(
          "Minimum consecutive failures for the probe to be considered failed after having succeeded. Defaults to 3. Minimum value is 1.",
        ).optional(),
        grpc: z.object({
          port: z.unknown().describe(
            "Port number of the gRPC service. Number must be in the range 1 to 65535.",
          ).optional(),
          service: z.unknown().describe(
            "Service is the name of the service to place in the gRPC HealthCheckRequest. If this is not specified, the default behavior is defined by gRPC.",
          ).optional(),
        }).describe("GRPCAction describes an action involving a GRPC port.")
          .optional(),
        httpGet: z.object({
          host: z.unknown().describe("Not supported by Cloud Run.").optional(),
          httpHeaders: z.unknown().describe(
            "Custom headers to set in the request. HTTP allows repeated headers.",
          ).optional(),
          path: z.unknown().describe("Path to access on the HTTP server.")
            .optional(),
          port: z.unknown().describe(
            "Port number to access on the container. Number must be in the range 1 to 65535.",
          ).optional(),
          scheme: z.unknown().describe("Not supported by Cloud Run.")
            .optional(),
        }).describe(
          "HTTPGetAction describes an action based on HTTP Get requests.",
        ).optional(),
        initialDelaySeconds: z.number().int().describe(
          "Number of seconds after the container has started before the probe is initiated. Defaults to 0 seconds. Minimum value is 0. Maximum value for liveness probe is 3600. Maximum value for startup probe is 240.",
        ).optional(),
        periodSeconds: z.number().int().describe(
          "How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1. Maximum value for liveness probe is 3600. Maximum value for startup probe is 240. Must be greater or equal than timeout_seconds.",
        ).optional(),
        successThreshold: z.number().int().describe(
          "Minimum consecutive successes for the probe to be considered successful after having failed. Must be 1 if set.",
        ).optional(),
        tcpSocket: z.object({
          host: z.unknown().describe("Not supported by Cloud Run.").optional(),
          port: z.unknown().describe(
            "Port number to access on the container. Number must be in the range 1 to 65535.",
          ).optional(),
        }).describe(
          "TCPSocketAction describes an action based on opening a socket",
        ).optional(),
        timeoutSeconds: z.number().int().describe(
          "Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1. Maximum value is 3600. Must be smaller than period_seconds; if period_seconds is not set, must be less or equal than 10.",
        ).optional(),
      }).describe(
        "Probe describes a health check to be performed against a container to determine whether it is alive or ready to receive traffic.",
      ).optional(),
      terminationMessagePath: z.string().describe(
        "Path at which the file to which the container's termination message will be written is mounted into the container's filesystem. Message written is intended to be brief final status, such as an assertion failure message. Will be truncated by the node if greater than 4096 bytes. The total message length across all containers will be limited to 12kb. Defaults to /dev/termination-log.",
      ).optional(),
      terminationMessagePolicy: z.string().describe(
        "Indicate how the termination message should be populated. File will use the contents of terminationMessagePath to populate the container status message on both success and failure. FallbackToLogsOnError will use the last chunk of container log output if the termination message file is empty and the container exited with an error. The log output is limited to 2048 bytes or 80 lines, whichever is smaller. Defaults to File. Cannot be updated.",
      ).optional(),
      volumeMounts: z.array(z.object({
        mountPath: z.unknown().describe(
          "Required. Path within the container at which the volume should be mounted. Must not contain ':'.",
        ).optional(),
        name: z.unknown().describe(
          "Required. The name of the volume. There must be a corresponding Volume with the same name.",
        ).optional(),
        readOnly: z.unknown().describe(
          "Sets the mount to be read-only or read-write. Not used by Cloud Run.",
        ).optional(),
        subPath: z.unknown().describe(
          "Path within the volume from which the container's volume should be mounted. Defaults to \"\" (volume's root). This field is currently rejected in Secret volume mounts.",
        ).optional(),
      })).describe(
        "Volume to mount into the container's filesystem. Only supports SecretVolumeSources. Pod volumes to mount into the container's filesystem.",
      ).optional(),
      workingDir: z.string().describe(
        "Container's working directory. If not specified, the container runtime's default will be used, which might be configured in the container image.",
      ).optional(),
    })).describe(
      "Optional. List of containers belonging to the Instance. We disallow a number of fields on this Container.",
    ).optional(),
    nodeSelector: z.record(z.string(), z.string()).describe(
      "Optional. The Node Selector configuration. Map of selector key to a value which matches a node.",
    ).optional(),
    restartPolicy: z.string().describe(
      "Optional. Restart policy for the Instance. Allowable values are 'Always', 'OnFailure', or 'Never'.",
    ).optional(),
    serviceAccountName: z.string().describe(
      "Optional. Email address of the IAM service account associated with the Instance. The service account represents the identity of the running container, and determines what permissions the Instance has. If not provided, the Instance will use the project's default service account.",
    ).optional(),
    volumes: z.array(z.object({
      configMap: z.object({
        defaultMode: z.number().int().describe(
          "(Optional) Integer representation of mode bits to use on created files by default. Must be a value between 01 and 0777 (octal). If 0 or not set, it will default to 0644. Directories within the path are not affected by this setting. Notes * Internally, a umask of 0222 will be applied to any non-zero value. * This is an integer representation of the mode bits. So, the octal integer value should look exactly as the chmod numeric notation with a leading zero. Some examples: for chmod 777 (a=rwx), set to 0777 (octal) or 511 (base-10). For chmod 640 (u=rw,g=r), set to 0640 (octal) or 416 (base-10). For chmod 755 (u=rwx,g=rx,o=rx), set to 0755 (octal) or 493 (base-10). * This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.",
        ).optional(),
        items: z.array(z.unknown()).describe(
          "(Optional) If unspecified, each key-value pair in the Data field of the referenced Secret will be projected into the volume as a file whose name is the key and content is the value. If specified, the listed keys will be projected into the specified paths, and unlisted keys will not be present. If a key is specified that is not present in the Secret, the volume setup will error unless it is marked optional.",
        ).optional(),
        name: z.string().describe("Name of the config.").optional(),
        optional: z.boolean().describe(
          "(Optional) Specify whether the Secret or its keys must be defined.",
        ).optional(),
      }).describe(
        "Not supported by Cloud Run. Adapts a ConfigMap into a volume. The contents of the target ConfigMap's Data field will be presented in a volume as files using the keys in the Data field as the file names, unless the items element is populated with specific mappings of keys to paths.",
      ).optional(),
      csi: z.object({
        driver: z.string().describe(
          "name of the CSI driver for the requested storage system. Cloud Run supports the following drivers: * gcsfuse.run.googleapis.com: Mount a Cloud Storage Bucket as a volume.",
        ).optional(),
        readOnly: z.boolean().describe(
          "If true, mount the volume as read only. Defaults to false.",
        ).optional(),
        volumeAttributes: z.record(z.string(), z.unknown()).describe(
          "stores driver specific attributes. For Google Cloud Storage volumes, the following attributes are supported: * bucketName: the name of the Cloud Storage bucket to mount. The Cloud Run Service identity must have access to this bucket. * mountOptions: comma-separated list of mount options to pass to the gcsfuse.",
        ).optional(),
      }).describe(
        "Storage volume source using the Container Storage Interface.",
      ).optional(),
      emptyDir: z.object({
        medium: z.string().describe(
          'The medium on which the data is stored. The default is "" which means to use the node\'s default medium. Must be an empty string (default) or Memory. More info: https://kubernetes.io/docs/concepts/storage/volumes#emptydir',
        ).optional(),
        sizeLimit: z.string().describe(
          "Limit on the storage usable by this EmptyDir volume. The size limit is also applicable for memory medium. The maximum usage on memory medium EmptyDir would be the minimum value between the SizeLimit specified here and the sum of memory limits of all containers. The default is nil which means that the limit is undefined. More info: https://cloud.google.com/run/docs/configuring/in-memory-volumes#configure-volume. Info in Kubernetes: https://kubernetes.io/docs/concepts/storage/volumes/#emptydir",
        ).optional(),
      }).describe(
        "In memory (tmpfs) ephemeral storage. It is ephemeral in the sense that when the sandbox is taken down, the data is destroyed with it (it does not persist across sandbox runs).",
      ).optional(),
      name: z.string().describe(
        "Volume's name. In Cloud Run Fully Managed, the name 'cloudsql' is reserved.",
      ).optional(),
      nfs: z.object({
        path: z.string().describe("Path that is exported by the NFS server.")
          .optional(),
        readOnly: z.boolean().describe(
          "If true, mount the NFS volume as read only. Defaults to false.",
        ).optional(),
        server: z.string().describe("Hostname or IP address of the NFS server.")
          .optional(),
      }).describe(
        "Represents a persistent volume that will be mounted using NFS. This volume will be shared between all instances of the resource and data will not be deleted when the instance is shut down.",
      ).optional(),
      secret: z.object({
        defaultMode: z.number().int().describe(
          "Integer representation of mode bits to use on created files by default. Must be a value between 01 and 0777 (octal). If 0 or not set, it will default to 0444. Directories within the path are not affected by this setting. Notes * Internally, a umask of 0222 will be applied to any non-zero value. * This is an integer representation of the mode bits. So, the octal integer value should look exactly as the chmod numeric notation with a leading zero. Some examples: for chmod 777 (a=rwx), set to 0777 (octal) or 511 (base-10). For chmod 640 (u=rw,g=r), set to 0640 (octal) or 416 (base-10). For chmod 755 (u=rwx,g=rx,o=rx), set to 0755 (octal) or 493 (base-10). * This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.",
        ).optional(),
        items: z.array(z.unknown()).describe(
          "A list of secret versions to mount in the volume. If no items are specified, the volume will expose a file with the same name as the secret name. The contents of the file will be the data in the latest version of the secret. If items are specified, the key will be used as the version to fetch from Cloud Secret Manager and the path will be the name of the file exposed in the volume. When items are defined, they must specify both a key and a path.",
        ).optional(),
        optional: z.boolean().describe("Not supported by Cloud Run.")
          .optional(),
        secretName: z.string().describe(
          "The name of the secret in Cloud Secret Manager. By default, the secret is assumed to be in the same project. If the secret is in another project, you must define an alias. An alias definition has the form::projects//secrets/. If multiple alias definitions are needed, they must be separated by commas. The alias definitions must be set on the run.googleapis.com/secrets annotation. Name of the secret in the container's namespace to use.",
        ).optional(),
      }).describe(
        "A volume representing a secret stored in Google Secret Manager. The secret's value will be presented as the content of a file whose name is defined in the item path. If no items are defined, the name of the file is the secret_name. The contents of the target Secret's Data field will be presented in a volume as files using the keys in the Data field as the file names.",
      ).optional(),
    })).describe(
      "Optional. List of volumes that can be mounted by containers belonging to the Instance.",
    ).optional(),
  }).describe("InstanceSpec describes how the Instance will look.").optional(),
  status: z.object({
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
      'Output only. Conditions communicate information about ongoing/complete reconciliation processes that bring the "spec" inline with the observed state of the world. Instance-specific conditions include: * `Ready`: `True` when the Instance is ready to be executed.',
    ).optional(),
    logUri: z.string().describe(
      "Optional. URI where logs for this execution can be found in Cloud Console.",
    ).optional(),
    observedGeneration: z.number().int().describe(
      "Output only. The 'generation' of the Instance that was last processed by the controller.",
    ).optional(),
    urls: z.array(z.string()).describe(
      "Output only. All URLs serving traffic for this Instance.",
    ).optional(),
  }).describe("InstanceStatus represents the current state of a Instance.")
    .optional(),
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
    containers: z.array(z.object({
      args: z.array(z.string()),
      command: z.array(z.string()),
      env: z.array(z.object({
        name: z.unknown(),
        value: z.unknown(),
        valueFrom: z.unknown(),
      })),
      envFrom: z.array(z.object({
        configMapRef: z.unknown(),
        prefix: z.unknown(),
        secretRef: z.unknown(),
      })),
      image: z.string(),
      imagePullPolicy: z.string(),
      livenessProbe: z.object({
        exec: z.object({
          command: z.unknown(),
        }),
        failureThreshold: z.number(),
        grpc: z.object({
          port: z.unknown(),
          service: z.unknown(),
        }),
        httpGet: z.object({
          host: z.unknown(),
          httpHeaders: z.unknown(),
          path: z.unknown(),
          port: z.unknown(),
          scheme: z.unknown(),
        }),
        initialDelaySeconds: z.number(),
        periodSeconds: z.number(),
        successThreshold: z.number(),
        tcpSocket: z.object({
          host: z.unknown(),
          port: z.unknown(),
        }),
        timeoutSeconds: z.number(),
      }),
      name: z.string(),
      ports: z.array(z.object({
        containerPort: z.unknown(),
        name: z.unknown(),
        protocol: z.unknown(),
      })),
      readinessProbe: z.object({
        exec: z.object({
          command: z.unknown(),
        }),
        failureThreshold: z.number(),
        grpc: z.object({
          port: z.unknown(),
          service: z.unknown(),
        }),
        httpGet: z.object({
          host: z.unknown(),
          httpHeaders: z.unknown(),
          path: z.unknown(),
          port: z.unknown(),
          scheme: z.unknown(),
        }),
        initialDelaySeconds: z.number(),
        periodSeconds: z.number(),
        successThreshold: z.number(),
        tcpSocket: z.object({
          host: z.unknown(),
          port: z.unknown(),
        }),
        timeoutSeconds: z.number(),
      }),
      resources: z.object({
        limits: z.record(z.string(), z.unknown()),
        requests: z.record(z.string(), z.unknown()),
      }),
      securityContext: z.object({
        runAsUser: z.number(),
      }),
      startupProbe: z.object({
        exec: z.object({
          command: z.unknown(),
        }),
        failureThreshold: z.number(),
        grpc: z.object({
          port: z.unknown(),
          service: z.unknown(),
        }),
        httpGet: z.object({
          host: z.unknown(),
          httpHeaders: z.unknown(),
          path: z.unknown(),
          port: z.unknown(),
          scheme: z.unknown(),
        }),
        initialDelaySeconds: z.number(),
        periodSeconds: z.number(),
        successThreshold: z.number(),
        tcpSocket: z.object({
          host: z.unknown(),
          port: z.unknown(),
        }),
        timeoutSeconds: z.number(),
      }),
      terminationMessagePath: z.string(),
      terminationMessagePolicy: z.string(),
      volumeMounts: z.array(z.object({
        mountPath: z.unknown(),
        name: z.unknown(),
        readOnly: z.unknown(),
        subPath: z.unknown(),
      })),
      workingDir: z.string(),
    })),
    nodeSelector: z.record(z.string(), z.unknown()),
    restartPolicy: z.string(),
    serviceAccountName: z.string(),
    volumes: z.array(z.object({
      configMap: z.object({
        defaultMode: z.number(),
        items: z.array(z.unknown()),
        name: z.string(),
        optional: z.boolean(),
      }),
      csi: z.object({
        driver: z.string(),
        readOnly: z.boolean(),
        volumeAttributes: z.record(z.string(), z.unknown()),
      }),
      emptyDir: z.object({
        medium: z.string(),
        sizeLimit: z.string(),
      }),
      name: z.string(),
      nfs: z.object({
        path: z.string(),
        readOnly: z.boolean(),
        server: z.string(),
      }),
      secret: z.object({
        defaultMode: z.number(),
        items: z.array(z.unknown()),
        optional: z.boolean(),
        secretName: z.string(),
      }),
    })),
  }).optional(),
  status: z.object({
    conditions: z.array(z.object({
      lastTransitionTime: z.string(),
      message: z.string(),
      reason: z.string(),
      severity: z.string(),
      status: z.string(),
      type: z.string(),
    })),
    logUri: z.string(),
    observedGeneration: z.number(),
    urls: z.array(z.string()),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  apiVersion: z.string().describe(
    "Optional. APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values.",
  ).optional(),
  metadata: z.object({
    annotations: z.record(z.string(), z.string()).describe(
      "Unstructured key value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. In Cloud Run, annotations with 'run.googleapis.com/' and 'autoscaling.knative.dev' are restricted, and the accepted annotations will be different depending on the resource type. * `autoscaling.knative.dev/maxScale`: Revision. * `autoscaling.knative.dev/minScale`: Revision. * `run.googleapis.com/base-images`: Service, Revision. * `run.googleapis.com/binary-authorization-breakglass`: Service, Job, * `run.googleapis.com/binary-authorization`: Service, Job, Execution. * `run.googleapis.com/build-base-image`: Service. * `run.googleapis.com/build-enable-automatic-updates`: Service. * `run.googleapis.com/build-environment-variables`: Service. * `run.googleapis.com/build-function-target`: Service, Revision. * `run.googleapis.com/build-id`: Service, Revision. * `run.googleapis.com/build-image-uri`: Service. * `run.googleapis.com/build-name`: Service. * `run.googleapis.com/build-service-account`: Service. * `run.googleapis.com/build-source-location`: Service, Revision. * `run.googleapis.com/build-worker-pool`: Service. * `run.googleapis.com/client-name`: All resources. * `run.googleapis.com/cloudsql-instances`: Revision, Execution. * `run.googleapis.com/container-dependencies`: Revision. * `run.googleapis.com/cpu-throttling`: Revision. * `run.googleapis.com/custom-audiences`: Service. * `run.googleapis.com/default-url-disabled`: Service. * `run.googleapis.com/description`: Service. * `run.googleapis.com/encryption-key-shutdown-hours`: Revision * `run.googleapis.com/encryption-key`: Revision, Execution. * `run.googleapis.com/execution-environment`: Revision, Execution. * `run.googleapis.com/gc-traffic-tags`: Service. * `run.googleapis.com/gpu-zonal-redundancy-disabled`: Revision. * `run.googleapis.com/health-check-disabled`: Revision. * `run.googleapis.com/ingress`: Service, Instance. * `run.googleapis.com/invoker-iam-disabled`: Service, Instance. * `run.googleapis.com/launch-stage`: Service, Job. * `run.googleapis.com/minScale`: Service. * `run.googleapis.com/maxScale`: Service. * `run.googleapis.com/manualInstanceCount`: Service. * `run.googleapis.com/network-interfaces`: Revision, Execution. * `run.googleapis.com/post-key-revocation-action-type`: Revision. `run.googleapis.com/scalingMode`: Service. * `run.googleapis.com/secrets`: Revision, Execution. * `run.googleapis.com/secure-session-agent`: Revision. * `run.googleapis.com/sessionAffinity`: Revision. * `run.googleapis.com/startup-cpu-boost`: Revision. * `run.googleapis.com/vpc-access-connector`: Revision, Execution. * `run.googleapis.com/vpc-access-egress`: Revision, Execution.",
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
    "google.cloud.run.meta.v1.ObjectMeta is metadata that all persisted resources must have, which includes all objects users must create.",
  ).optional(),
  spec: z.object({
    containers: z.array(z.object({
      args: z.array(z.string()).describe(
        "Arguments to the entrypoint. The docker image's CMD is used if this is not provided. Variable references are not supported in Cloud Run.",
      ).optional(),
      command: z.array(z.string()).describe(
        "Entrypoint array. Not executed within a shell. The docker image's ENTRYPOINT is used if this is not provided. Variable references are not supported in Cloud Run.",
      ).optional(),
      env: z.array(z.object({
        name: z.unknown().describe(
          "Required. Name of the environment variable.",
        ).optional(),
        value: z.unknown().describe(
          'Value of the environment variable. Defaults to "". Variable references are not supported in Cloud Run.',
        ).optional(),
        valueFrom: z.unknown().describe(
          "EnvVarSource represents a source for the value of an EnvVar.",
        ).optional(),
      })).describe(
        "List of environment variables to set in the container. EnvVar with duplicate names are generally allowed; if referencing a secret, the name must be unique for the container. For non-secret EnvVar names, the Container will only get the last-declared one.",
      ).optional(),
      envFrom: z.array(z.object({
        configMapRef: z.unknown().describe(
          "Not supported by Cloud Run. ConfigMapEnvSource selects a ConfigMap to populate the environment variables with. The contents of the target ConfigMap's Data field will represent the key-value pairs as environment variables.",
        ).optional(),
        prefix: z.unknown().describe(
          "An optional identifier to prepend to each key in the ConfigMap. Must be a C_IDENTIFIER.",
        ).optional(),
        secretRef: z.unknown().describe(
          "Not supported by Cloud Run. SecretEnvSource selects a Secret to populate the environment variables with. The contents of the target Secret's Data field will represent the key-value pairs as environment variables.",
        ).optional(),
      })).describe("Not supported by Cloud Run.").optional(),
      image: z.string().describe(
        "Required. Name of the container image in Dockerhub, Google Artifact Registry, or Google Container Registry. If the host is not provided, Dockerhub is assumed.",
      ).optional(),
      imagePullPolicy: z.string().describe(
        "Image pull policy. One of Always, Never, IfNotPresent. Defaults to Always if:latest tag is specified, or IfNotPresent otherwise.",
      ).optional(),
      livenessProbe: z.object({
        exec: z.object({
          command: z.unknown().describe(
            "Command is the command line to execute inside the container, the working directory for the command is root ('/') in the container's filesystem. The command is simply exec'd, it is not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use a shell, you need to explicitly call out to that shell. Exit status of 0 is treated as live/healthy and non-zero is unhealthy.",
          ).optional(),
        }).describe(
          'Not supported by Cloud Run. ExecAction describes a "run in container" action.',
        ).optional(),
        failureThreshold: z.number().int().describe(
          "Minimum consecutive failures for the probe to be considered failed after having succeeded. Defaults to 3. Minimum value is 1.",
        ).optional(),
        grpc: z.object({
          port: z.unknown().describe(
            "Port number of the gRPC service. Number must be in the range 1 to 65535.",
          ).optional(),
          service: z.unknown().describe(
            "Service is the name of the service to place in the gRPC HealthCheckRequest. If this is not specified, the default behavior is defined by gRPC.",
          ).optional(),
        }).describe("GRPCAction describes an action involving a GRPC port.")
          .optional(),
        httpGet: z.object({
          host: z.unknown().describe("Not supported by Cloud Run.").optional(),
          httpHeaders: z.unknown().describe(
            "Custom headers to set in the request. HTTP allows repeated headers.",
          ).optional(),
          path: z.unknown().describe("Path to access on the HTTP server.")
            .optional(),
          port: z.unknown().describe(
            "Port number to access on the container. Number must be in the range 1 to 65535.",
          ).optional(),
          scheme: z.unknown().describe("Not supported by Cloud Run.")
            .optional(),
        }).describe(
          "HTTPGetAction describes an action based on HTTP Get requests.",
        ).optional(),
        initialDelaySeconds: z.number().int().describe(
          "Number of seconds after the container has started before the probe is initiated. Defaults to 0 seconds. Minimum value is 0. Maximum value for liveness probe is 3600. Maximum value for startup probe is 240.",
        ).optional(),
        periodSeconds: z.number().int().describe(
          "How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1. Maximum value for liveness probe is 3600. Maximum value for startup probe is 240. Must be greater or equal than timeout_seconds.",
        ).optional(),
        successThreshold: z.number().int().describe(
          "Minimum consecutive successes for the probe to be considered successful after having failed. Must be 1 if set.",
        ).optional(),
        tcpSocket: z.object({
          host: z.unknown().describe("Not supported by Cloud Run.").optional(),
          port: z.unknown().describe(
            "Port number to access on the container. Number must be in the range 1 to 65535.",
          ).optional(),
        }).describe(
          "TCPSocketAction describes an action based on opening a socket",
        ).optional(),
        timeoutSeconds: z.number().int().describe(
          "Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1. Maximum value is 3600. Must be smaller than period_seconds; if period_seconds is not set, must be less or equal than 10.",
        ).optional(),
      }).describe(
        "Probe describes a health check to be performed against a container to determine whether it is alive or ready to receive traffic.",
      ).optional(),
      name: z.string().describe(
        "Name of the container specified as a DNS_LABEL (RFC 1123).",
      ).optional(),
      ports: z.array(z.object({
        containerPort: z.unknown().describe(
          "Port number the container listens on. If present, this must be a valid port number, 0 < x < 65536. If not present, it will default to port 8080. For more information, see https://cloud.google.com/run/docs/container-contract#port",
        ).optional(),
        name: z.unknown().describe(
          'If specified, used to specify which protocol to use. Allowed values are "http1" and "h2c".',
        ).optional(),
        protocol: z.unknown().describe(
          'Protocol for port. Must be "TCP". Defaults to "TCP".',
        ).optional(),
      })).describe(
        "List of ports to expose from the container. Only a single port can be specified. The specified ports must be listening on all interfaces (0.0.0.0) within the container to be accessible. If omitted, a port number will be chosen and passed to the container through the PORT environment variable for the container to listen on.",
      ).optional(),
      readinessProbe: z.object({
        exec: z.object({
          command: z.unknown().describe(
            "Command is the command line to execute inside the container, the working directory for the command is root ('/') in the container's filesystem. The command is simply exec'd, it is not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use a shell, you need to explicitly call out to that shell. Exit status of 0 is treated as live/healthy and non-zero is unhealthy.",
          ).optional(),
        }).describe(
          'Not supported by Cloud Run. ExecAction describes a "run in container" action.',
        ).optional(),
        failureThreshold: z.number().int().describe(
          "Minimum consecutive failures for the probe to be considered failed after having succeeded. Defaults to 3. Minimum value is 1.",
        ).optional(),
        grpc: z.object({
          port: z.unknown().describe(
            "Port number of the gRPC service. Number must be in the range 1 to 65535.",
          ).optional(),
          service: z.unknown().describe(
            "Service is the name of the service to place in the gRPC HealthCheckRequest. If this is not specified, the default behavior is defined by gRPC.",
          ).optional(),
        }).describe("GRPCAction describes an action involving a GRPC port.")
          .optional(),
        httpGet: z.object({
          host: z.unknown().describe("Not supported by Cloud Run.").optional(),
          httpHeaders: z.unknown().describe(
            "Custom headers to set in the request. HTTP allows repeated headers.",
          ).optional(),
          path: z.unknown().describe("Path to access on the HTTP server.")
            .optional(),
          port: z.unknown().describe(
            "Port number to access on the container. Number must be in the range 1 to 65535.",
          ).optional(),
          scheme: z.unknown().describe("Not supported by Cloud Run.")
            .optional(),
        }).describe(
          "HTTPGetAction describes an action based on HTTP Get requests.",
        ).optional(),
        initialDelaySeconds: z.number().int().describe(
          "Number of seconds after the container has started before the probe is initiated. Defaults to 0 seconds. Minimum value is 0. Maximum value for liveness probe is 3600. Maximum value for startup probe is 240.",
        ).optional(),
        periodSeconds: z.number().int().describe(
          "How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1. Maximum value for liveness probe is 3600. Maximum value for startup probe is 240. Must be greater or equal than timeout_seconds.",
        ).optional(),
        successThreshold: z.number().int().describe(
          "Minimum consecutive successes for the probe to be considered successful after having failed. Must be 1 if set.",
        ).optional(),
        tcpSocket: z.object({
          host: z.unknown().describe("Not supported by Cloud Run.").optional(),
          port: z.unknown().describe(
            "Port number to access on the container. Number must be in the range 1 to 65535.",
          ).optional(),
        }).describe(
          "TCPSocketAction describes an action based on opening a socket",
        ).optional(),
        timeoutSeconds: z.number().int().describe(
          "Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1. Maximum value is 3600. Must be smaller than period_seconds; if period_seconds is not set, must be less or equal than 10.",
        ).optional(),
      }).describe(
        "Probe describes a health check to be performed against a container to determine whether it is alive or ready to receive traffic.",
      ).optional(),
      resources: z.object({
        limits: z.record(z.string(), z.unknown()).describe(
          "Limits describes the maximum amount of compute resources allowed. Only 'cpu', 'memory' and 'nvidia.com/gpu' keys are supported. * For supported 'cpu' values, go to https://cloud.google.com/run/docs/configuring/cpu. * For supported 'memory' values and syntax, go to https://cloud.google.com/run/docs/configuring/memory-limits. * The only supported 'nvidia.com/gpu' value is '1'.",
        ).optional(),
        requests: z.record(z.string(), z.unknown()).describe(
          "Requests describes the minimum amount of compute resources required. Only `cpu` and `memory` are supported. If Requests is omitted for a container, it defaults to Limits if that is explicitly specified, otherwise to an implementation-defined value. * For supported 'cpu' values, go to https://cloud.google.com/run/docs/configuring/cpu. * For supported 'memory' values and syntax, go to https://cloud.google.com/run/docs/configuring/memory-limits",
        ).optional(),
      }).describe(
        "ResourceRequirements describes the compute resource requirements.",
      ).optional(),
      securityContext: z.object({
        runAsUser: z.number().int().describe(
          "The UID to run the entrypoint of the container process. Defaults to user specified in image metadata if unspecified. May also be set in PodSecurityContext. If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.",
        ).optional(),
      }).describe(
        "Not supported by Cloud Run. SecurityContext holds security configuration that will be applied to a container. Some fields are present in both SecurityContext and PodSecurityContext. When both are set, the values in SecurityContext take precedence.",
      ).optional(),
      startupProbe: z.object({
        exec: z.object({
          command: z.unknown().describe(
            "Command is the command line to execute inside the container, the working directory for the command is root ('/') in the container's filesystem. The command is simply exec'd, it is not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use a shell, you need to explicitly call out to that shell. Exit status of 0 is treated as live/healthy and non-zero is unhealthy.",
          ).optional(),
        }).describe(
          'Not supported by Cloud Run. ExecAction describes a "run in container" action.',
        ).optional(),
        failureThreshold: z.number().int().describe(
          "Minimum consecutive failures for the probe to be considered failed after having succeeded. Defaults to 3. Minimum value is 1.",
        ).optional(),
        grpc: z.object({
          port: z.unknown().describe(
            "Port number of the gRPC service. Number must be in the range 1 to 65535.",
          ).optional(),
          service: z.unknown().describe(
            "Service is the name of the service to place in the gRPC HealthCheckRequest. If this is not specified, the default behavior is defined by gRPC.",
          ).optional(),
        }).describe("GRPCAction describes an action involving a GRPC port.")
          .optional(),
        httpGet: z.object({
          host: z.unknown().describe("Not supported by Cloud Run.").optional(),
          httpHeaders: z.unknown().describe(
            "Custom headers to set in the request. HTTP allows repeated headers.",
          ).optional(),
          path: z.unknown().describe("Path to access on the HTTP server.")
            .optional(),
          port: z.unknown().describe(
            "Port number to access on the container. Number must be in the range 1 to 65535.",
          ).optional(),
          scheme: z.unknown().describe("Not supported by Cloud Run.")
            .optional(),
        }).describe(
          "HTTPGetAction describes an action based on HTTP Get requests.",
        ).optional(),
        initialDelaySeconds: z.number().int().describe(
          "Number of seconds after the container has started before the probe is initiated. Defaults to 0 seconds. Minimum value is 0. Maximum value for liveness probe is 3600. Maximum value for startup probe is 240.",
        ).optional(),
        periodSeconds: z.number().int().describe(
          "How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1. Maximum value for liveness probe is 3600. Maximum value for startup probe is 240. Must be greater or equal than timeout_seconds.",
        ).optional(),
        successThreshold: z.number().int().describe(
          "Minimum consecutive successes for the probe to be considered successful after having failed. Must be 1 if set.",
        ).optional(),
        tcpSocket: z.object({
          host: z.unknown().describe("Not supported by Cloud Run.").optional(),
          port: z.unknown().describe(
            "Port number to access on the container. Number must be in the range 1 to 65535.",
          ).optional(),
        }).describe(
          "TCPSocketAction describes an action based on opening a socket",
        ).optional(),
        timeoutSeconds: z.number().int().describe(
          "Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1. Maximum value is 3600. Must be smaller than period_seconds; if period_seconds is not set, must be less or equal than 10.",
        ).optional(),
      }).describe(
        "Probe describes a health check to be performed against a container to determine whether it is alive or ready to receive traffic.",
      ).optional(),
      terminationMessagePath: z.string().describe(
        "Path at which the file to which the container's termination message will be written is mounted into the container's filesystem. Message written is intended to be brief final status, such as an assertion failure message. Will be truncated by the node if greater than 4096 bytes. The total message length across all containers will be limited to 12kb. Defaults to /dev/termination-log.",
      ).optional(),
      terminationMessagePolicy: z.string().describe(
        "Indicate how the termination message should be populated. File will use the contents of terminationMessagePath to populate the container status message on both success and failure. FallbackToLogsOnError will use the last chunk of container log output if the termination message file is empty and the container exited with an error. The log output is limited to 2048 bytes or 80 lines, whichever is smaller. Defaults to File. Cannot be updated.",
      ).optional(),
      volumeMounts: z.array(z.object({
        mountPath: z.unknown().describe(
          "Required. Path within the container at which the volume should be mounted. Must not contain ':'.",
        ).optional(),
        name: z.unknown().describe(
          "Required. The name of the volume. There must be a corresponding Volume with the same name.",
        ).optional(),
        readOnly: z.unknown().describe(
          "Sets the mount to be read-only or read-write. Not used by Cloud Run.",
        ).optional(),
        subPath: z.unknown().describe(
          "Path within the volume from which the container's volume should be mounted. Defaults to \"\" (volume's root). This field is currently rejected in Secret volume mounts.",
        ).optional(),
      })).describe(
        "Volume to mount into the container's filesystem. Only supports SecretVolumeSources. Pod volumes to mount into the container's filesystem.",
      ).optional(),
      workingDir: z.string().describe(
        "Container's working directory. If not specified, the container runtime's default will be used, which might be configured in the container image.",
      ).optional(),
    })).describe(
      "Optional. List of containers belonging to the Instance. We disallow a number of fields on this Container.",
    ).optional(),
    nodeSelector: z.record(z.string(), z.string()).describe(
      "Optional. The Node Selector configuration. Map of selector key to a value which matches a node.",
    ).optional(),
    restartPolicy: z.string().describe(
      "Optional. Restart policy for the Instance. Allowable values are 'Always', 'OnFailure', or 'Never'.",
    ).optional(),
    serviceAccountName: z.string().describe(
      "Optional. Email address of the IAM service account associated with the Instance. The service account represents the identity of the running container, and determines what permissions the Instance has. If not provided, the Instance will use the project's default service account.",
    ).optional(),
    volumes: z.array(z.object({
      configMap: z.object({
        defaultMode: z.number().int().describe(
          "(Optional) Integer representation of mode bits to use on created files by default. Must be a value between 01 and 0777 (octal). If 0 or not set, it will default to 0644. Directories within the path are not affected by this setting. Notes * Internally, a umask of 0222 will be applied to any non-zero value. * This is an integer representation of the mode bits. So, the octal integer value should look exactly as the chmod numeric notation with a leading zero. Some examples: for chmod 777 (a=rwx), set to 0777 (octal) or 511 (base-10). For chmod 640 (u=rw,g=r), set to 0640 (octal) or 416 (base-10). For chmod 755 (u=rwx,g=rx,o=rx), set to 0755 (octal) or 493 (base-10). * This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.",
        ).optional(),
        items: z.array(z.unknown()).describe(
          "(Optional) If unspecified, each key-value pair in the Data field of the referenced Secret will be projected into the volume as a file whose name is the key and content is the value. If specified, the listed keys will be projected into the specified paths, and unlisted keys will not be present. If a key is specified that is not present in the Secret, the volume setup will error unless it is marked optional.",
        ).optional(),
        name: z.string().describe("Name of the config.").optional(),
        optional: z.boolean().describe(
          "(Optional) Specify whether the Secret or its keys must be defined.",
        ).optional(),
      }).describe(
        "Not supported by Cloud Run. Adapts a ConfigMap into a volume. The contents of the target ConfigMap's Data field will be presented in a volume as files using the keys in the Data field as the file names, unless the items element is populated with specific mappings of keys to paths.",
      ).optional(),
      csi: z.object({
        driver: z.string().describe(
          "name of the CSI driver for the requested storage system. Cloud Run supports the following drivers: * gcsfuse.run.googleapis.com: Mount a Cloud Storage Bucket as a volume.",
        ).optional(),
        readOnly: z.boolean().describe(
          "If true, mount the volume as read only. Defaults to false.",
        ).optional(),
        volumeAttributes: z.record(z.string(), z.unknown()).describe(
          "stores driver specific attributes. For Google Cloud Storage volumes, the following attributes are supported: * bucketName: the name of the Cloud Storage bucket to mount. The Cloud Run Service identity must have access to this bucket. * mountOptions: comma-separated list of mount options to pass to the gcsfuse.",
        ).optional(),
      }).describe(
        "Storage volume source using the Container Storage Interface.",
      ).optional(),
      emptyDir: z.object({
        medium: z.string().describe(
          'The medium on which the data is stored. The default is "" which means to use the node\'s default medium. Must be an empty string (default) or Memory. More info: https://kubernetes.io/docs/concepts/storage/volumes#emptydir',
        ).optional(),
        sizeLimit: z.string().describe(
          "Limit on the storage usable by this EmptyDir volume. The size limit is also applicable for memory medium. The maximum usage on memory medium EmptyDir would be the minimum value between the SizeLimit specified here and the sum of memory limits of all containers. The default is nil which means that the limit is undefined. More info: https://cloud.google.com/run/docs/configuring/in-memory-volumes#configure-volume. Info in Kubernetes: https://kubernetes.io/docs/concepts/storage/volumes/#emptydir",
        ).optional(),
      }).describe(
        "In memory (tmpfs) ephemeral storage. It is ephemeral in the sense that when the sandbox is taken down, the data is destroyed with it (it does not persist across sandbox runs).",
      ).optional(),
      name: z.string().describe(
        "Volume's name. In Cloud Run Fully Managed, the name 'cloudsql' is reserved.",
      ).optional(),
      nfs: z.object({
        path: z.string().describe("Path that is exported by the NFS server.")
          .optional(),
        readOnly: z.boolean().describe(
          "If true, mount the NFS volume as read only. Defaults to false.",
        ).optional(),
        server: z.string().describe("Hostname or IP address of the NFS server.")
          .optional(),
      }).describe(
        "Represents a persistent volume that will be mounted using NFS. This volume will be shared between all instances of the resource and data will not be deleted when the instance is shut down.",
      ).optional(),
      secret: z.object({
        defaultMode: z.number().int().describe(
          "Integer representation of mode bits to use on created files by default. Must be a value between 01 and 0777 (octal). If 0 or not set, it will default to 0444. Directories within the path are not affected by this setting. Notes * Internally, a umask of 0222 will be applied to any non-zero value. * This is an integer representation of the mode bits. So, the octal integer value should look exactly as the chmod numeric notation with a leading zero. Some examples: for chmod 777 (a=rwx), set to 0777 (octal) or 511 (base-10). For chmod 640 (u=rw,g=r), set to 0640 (octal) or 416 (base-10). For chmod 755 (u=rwx,g=rx,o=rx), set to 0755 (octal) or 493 (base-10). * This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.",
        ).optional(),
        items: z.array(z.unknown()).describe(
          "A list of secret versions to mount in the volume. If no items are specified, the volume will expose a file with the same name as the secret name. The contents of the file will be the data in the latest version of the secret. If items are specified, the key will be used as the version to fetch from Cloud Secret Manager and the path will be the name of the file exposed in the volume. When items are defined, they must specify both a key and a path.",
        ).optional(),
        optional: z.boolean().describe("Not supported by Cloud Run.")
          .optional(),
        secretName: z.string().describe(
          "The name of the secret in Cloud Secret Manager. By default, the secret is assumed to be in the same project. If the secret is in another project, you must define an alias. An alias definition has the form::projects//secrets/. If multiple alias definitions are needed, they must be separated by commas. The alias definitions must be set on the run.googleapis.com/secrets annotation. Name of the secret in the container's namespace to use.",
        ).optional(),
      }).describe(
        "A volume representing a secret stored in Google Secret Manager. The secret's value will be presented as the content of a file whose name is defined in the item path. If no items are defined, the name of the file is the secret_name. The contents of the target Secret's Data field will be presented in a volume as files using the keys in the Data field as the file names.",
      ).optional(),
    })).describe(
      "Optional. List of volumes that can be mounted by containers belonging to the Instance.",
    ).optional(),
  }).describe("InstanceSpec describes how the Instance will look.").optional(),
  status: z.object({
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
      'Output only. Conditions communicate information about ongoing/complete reconciliation processes that bring the "spec" inline with the observed state of the world. Instance-specific conditions include: * `Ready`: `True` when the Instance is ready to be executed.',
    ).optional(),
    logUri: z.string().describe(
      "Optional. URI where logs for this execution can be found in Cloud Console.",
    ).optional(),
    observedGeneration: z.number().int().describe(
      "Output only. The 'generation' of the Instance that was last processed by the controller.",
    ).optional(),
    urls: z.array(z.string()).describe(
      "Output only. All URLs serving traffic for this Instance.",
    ).optional(),
  }).describe("InstanceStatus represents the current state of a Instance.")
    .optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
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

/** Swamp extension model for Google Cloud Run Admin Namespaces.Instances. Registered at `@swamp/gcp/run/namespaces-instances`. */
export const model = {
  type: "@swamp/gcp/run/namespaces-instances",
  version: "2026.06.08.1",
  upgrades: [
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
        "Instance represents the configuration of a single Instance, which references ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a instances",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["apiVersion"] !== undefined) body["apiVersion"] = g["apiVersion"];
        if (g["metadata"] !== undefined) body["metadata"] = g["metadata"];
        if (g["spec"] !== undefined) body["spec"] = g["spec"];
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
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
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
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
      description: "Get a instances",
      arguments: z.object({
        identifier: z.string().describe("The name of the instances"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
    delete: {
      description: "Delete the instances",
      arguments: z.object({
        identifier: z.string().describe("The name of the instances"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
      description: "Sync instances state from GCP",
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
            String(g["parent"] ?? ""),
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
      description: "List instances resources",
      arguments: z.object({
        continue: z.string().describe(
          "Optional. Optional encoded string to continue paging.",
        ).optional(),
        fieldSelector: z.string().describe(
          "Optional. Not supported by Cloud Run.",
        ).optional(),
        includeUninitialized: z.boolean().describe(
          "Optional. Not supported by Cloud Run.",
        ).optional(),
        labelSelector: z.string().describe(
          "Optional. Allows to filter resources based on a label. Supported operations are =, !=, exists, in, and notIn.",
        ).optional(),
        limit: z.number().describe(
          "Optional. The maximum number of records that should be returned.",
        ).optional(),
        resourceVersion: z.string().describe(
          "Optional. Not supported by Cloud Run.",
        ).optional(),
        watch: z.boolean().describe("Optional. Not supported by Cloud Run.")
          .optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
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
          BASE_URL,
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
    replace_instance: {
      description: "replace instance",
      arguments: z.object({
        apiVersion: z.any().optional(),
        kind: z.any().optional(),
        metadata: z.any().optional(),
        spec: z.any().optional(),
        status: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
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
          BASE_URL,
          {
            "id": "run.namespaces.instances.replaceInstance",
            "path": "apis/run.googleapis.com/v1/{+name}",
            "httpMethod": "PUT",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
    start: {
      description: "start",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
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
          BASE_URL,
          {
            "id": "run.namespaces.instances.start",
            "path": "apis/run.googleapis.com/v1/{+name}:start",
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
    stop: {
      description: "stop",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
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
          BASE_URL,
          {
            "id": "run.namespaces.instances.stop",
            "path": "apis/run.googleapis.com/v1/{+name}:stop",
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
