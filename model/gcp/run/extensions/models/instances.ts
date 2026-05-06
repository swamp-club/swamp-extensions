// Auto-generated extension model for @swamp/gcp/run/instances
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Run Admin Instances.
 *
 * A Cloud Run Instance represents a single group of containers running in a region.
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
  return `${parent}/instances/${shortName}`;
}

const BASE_URL = "https://run.googleapis.com/";

const GET_CONFIG = {
  "id": "run.projects.locations.instances.get",
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
  "id": "run.projects.locations.instances.create",
  "path": "v2/{+parent}/instances",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "instanceId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "run.projects.locations.instances.patch",
  "path": "v2/{+name}",
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
  "id": "run.projects.locations.instances.delete",
  "path": "v2/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
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
  annotations: z.record(z.string(), z.string()).optional(),
  binaryAuthorization: z.object({
    breakglassJustification: z.string().describe(
      "Optional. If present, indicates to use Breakglass using this justification. If use_default is False, then it must be empty. For more information on breakglass, see https://cloud.google.com/binary-authorization/docs/using-breakglass",
    ).optional(),
    policy: z.string().describe(
      "Optional. The path to a binary authorization policy. Format: `projects/{project}/platforms/cloudRun/{policy-name}`",
    ).optional(),
    useDefault: z.boolean().describe(
      "Optional. If True, indicates to use the default project's binary authorization policy. If False, binary authorization will be disabled.",
    ).optional(),
  }).describe("Settings for Binary Authorization feature.").optional(),
  client: z.string().describe("Arbitrary identifier for the API client.")
    .optional(),
  clientVersion: z.string().describe(
    "Arbitrary version identifier for the API client.",
  ).optional(),
  containers: z.array(z.object({
    args: z.array(z.string()).describe(
      "Arguments to the entrypoint. The docker image's CMD is used if this is not provided.",
    ).optional(),
    baseImageUri: z.string().describe(
      "Base image for this container. Only supported for services. If set, it indicates that the service is enrolled into automatic base image update.",
    ).optional(),
    buildInfo: z.object({
      functionTarget: z.string().describe(
        "Output only. Entry point of the function when the image is a Cloud Run function.",
      ).optional(),
      sourceLocation: z.string().describe(
        "Output only. Source code location of the image.",
      ).optional(),
    }).describe("Build information of the image.").optional(),
    command: z.array(z.string()).describe(
      "Entrypoint array. Not executed within a shell. The docker image's ENTRYPOINT is used if this is not provided.",
    ).optional(),
    dependsOn: z.array(z.string()).describe(
      "Names of the containers that must start before this container.",
    ).optional(),
    env: z.array(z.object({
      name: z.string().describe(
        "Required. Name of the environment variable. Must not exceed 32768 characters.",
      ).optional(),
      value: z.string().describe(
        'Literal value of the environment variable. Defaults to "", and the maximum length is 32768 bytes. Variable references are not supported in Cloud Run.',
      ).optional(),
      valueSource: z.object({
        secretKeyRef: z.unknown().describe(
          "SecretEnvVarSource represents a source for the value of an EnvVar.",
        ).optional(),
      }).describe(
        "EnvVarSource represents a source for the value of an EnvVar.",
      ).optional(),
    })).describe("List of environment variables to set in the container.")
      .optional(),
    image: z.string().describe(
      "Required. Name of the container image in Dockerhub, Google Artifact Registry, or Google Container Registry. If the host is not provided, Dockerhub is assumed.",
    ).optional(),
    livenessProbe: z.object({
      failureThreshold: z.number().int().describe(
        "Optional. Minimum consecutive failures for the probe to be considered failed after having succeeded. Defaults to 3. Minimum value is 1.",
      ).optional(),
      grpc: z.object({
        port: z.number().int().describe(
          "Optional. Port number of the gRPC service. Number must be in the range 1 to 65535. If not specified, defaults to the exposed port of the container, which is the value of container.ports[0].containerPort.",
        ).optional(),
        service: z.string().describe(
          "Optional. Service is the name of the service to place in the gRPC HealthCheckRequest (see https://github.com/grpc/grpc/blob/master/doc/health-checking.md). If this is not specified, the default behavior is defined by gRPC.",
        ).optional(),
      }).describe("GRPCAction describes an action involving a GRPC port.")
        .optional(),
      httpGet: z.object({
        httpHeaders: z.array(z.unknown()).describe(
          "Optional. Custom headers to set in the request. HTTP allows repeated headers.",
        ).optional(),
        path: z.string().describe(
          "Optional. Path to access on the HTTP server. Defaults to '/'.",
        ).optional(),
        port: z.number().int().describe(
          "Optional. Port number to access on the container. Must be in the range 1 to 65535. If not specified, defaults to the exposed port of the container, which is the value of container.ports[0].containerPort.",
        ).optional(),
      }).describe(
        "HTTPGetAction describes an action based on HTTP Get requests.",
      ).optional(),
      initialDelaySeconds: z.number().int().describe(
        "Optional. Number of seconds after the container has started before the probe is initiated. Defaults to 0 seconds. Minimum value is 0. Maximum value for liveness probe is 3600. Maximum value for startup probe is 240.",
      ).optional(),
      periodSeconds: z.number().int().describe(
        "Optional. How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1. Maximum value for liveness probe is 3600. Maximum value for startup probe is 240. Must be greater or equal than timeout_seconds.",
      ).optional(),
      tcpSocket: z.object({
        port: z.number().int().describe(
          "Optional. Port number to access on the container. Must be in the range 1 to 65535. If not specified, defaults to the exposed port of the container, which is the value of container.ports[0].containerPort.",
        ).optional(),
      }).describe(
        "TCPSocketAction describes an action based on opening a socket",
      ).optional(),
      timeoutSeconds: z.number().int().describe(
        "Optional. Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1. Maximum value is 3600. Must be smaller than period_seconds.",
      ).optional(),
    }).describe(
      "Probe describes a health check to be performed against a container to determine whether it is alive or ready to receive traffic.",
    ).optional(),
    name: z.string().describe(
      "Name of the container specified as a DNS_LABEL (RFC 1123).",
    ).optional(),
    ports: z.array(z.object({
      containerPort: z.number().int().describe(
        "Port number the container listens on. This must be a valid TCP port number, 0 < container_port < 65536.",
      ).optional(),
      name: z.string().describe(
        'If specified, used to specify which protocol to use. Allowed values are "http1" and "h2c".',
      ).optional(),
    })).describe(
      "List of ports to expose from the container. Only a single port can be specified. The specified ports must be listening on all interfaces (0.0.0.0) within the container to be accessible. If omitted, a port number will be chosen and passed to the container through the PORT environment variable for the container to listen on.",
    ).optional(),
    readinessProbe: z.object({
      failureThreshold: z.number().int().describe(
        "Optional. Minimum consecutive failures for the probe to be considered failed after having succeeded. Defaults to 3. Minimum value is 1.",
      ).optional(),
      grpc: z.object({
        port: z.number().int().describe(
          "Optional. Port number of the gRPC service. Number must be in the range 1 to 65535. If not specified, defaults to the exposed port of the container, which is the value of container.ports[0].containerPort.",
        ).optional(),
        service: z.string().describe(
          "Optional. Service is the name of the service to place in the gRPC HealthCheckRequest (see https://github.com/grpc/grpc/blob/master/doc/health-checking.md). If this is not specified, the default behavior is defined by gRPC.",
        ).optional(),
      }).describe("GRPCAction describes an action involving a GRPC port.")
        .optional(),
      httpGet: z.object({
        httpHeaders: z.array(z.unknown()).describe(
          "Optional. Custom headers to set in the request. HTTP allows repeated headers.",
        ).optional(),
        path: z.string().describe(
          "Optional. Path to access on the HTTP server. Defaults to '/'.",
        ).optional(),
        port: z.number().int().describe(
          "Optional. Port number to access on the container. Must be in the range 1 to 65535. If not specified, defaults to the exposed port of the container, which is the value of container.ports[0].containerPort.",
        ).optional(),
      }).describe(
        "HTTPGetAction describes an action based on HTTP Get requests.",
      ).optional(),
      initialDelaySeconds: z.number().int().describe(
        "Optional. Number of seconds after the container has started before the probe is initiated. Defaults to 0 seconds. Minimum value is 0. Maximum value for liveness probe is 3600. Maximum value for startup probe is 240.",
      ).optional(),
      periodSeconds: z.number().int().describe(
        "Optional. How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1. Maximum value for liveness probe is 3600. Maximum value for startup probe is 240. Must be greater or equal than timeout_seconds.",
      ).optional(),
      tcpSocket: z.object({
        port: z.number().int().describe(
          "Optional. Port number to access on the container. Must be in the range 1 to 65535. If not specified, defaults to the exposed port of the container, which is the value of container.ports[0].containerPort.",
        ).optional(),
      }).describe(
        "TCPSocketAction describes an action based on opening a socket",
      ).optional(),
      timeoutSeconds: z.number().int().describe(
        "Optional. Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1. Maximum value is 3600. Must be smaller than period_seconds.",
      ).optional(),
    }).describe(
      "Probe describes a health check to be performed against a container to determine whether it is alive or ready to receive traffic.",
    ).optional(),
    resources: z.object({
      cpuIdle: z.boolean().describe(
        "Determines whether CPU is only allocated during requests (true by default). However, if ResourceRequirements is set, the caller must explicitly set this field to true to preserve the default behavior.",
      ).optional(),
      limits: z.record(z.string(), z.string()).describe(
        "Only `memory`, `cpu` and `nvidia.com/gpu` keys in the map are supported. Notes: * The only supported values for CPU are '1', '2', '4', and '8'. Setting 4 CPU requires at least 2Gi of memory. For more information, go to https://cloud.google.com/run/docs/configuring/cpu. * For supported 'memory' values and syntax, go to https://cloud.google.com/run/docs/configuring/memory-limits * The only supported 'nvidia.com/gpu' value is '1'.",
      ).optional(),
      startupCpuBoost: z.boolean().describe(
        "Determines whether CPU should be boosted on startup of a new container instance above the requested CPU threshold, this can help reduce cold-start latency.",
      ).optional(),
    }).describe(
      "ResourceRequirements describes the compute resource requirements.",
    ).optional(),
    sourceCode: z.object({
      cloudStorageSource: z.object({
        bucket: z.string().describe("Required. The Cloud Storage bucket name.")
          .optional(),
        generation: z.string().describe(
          "Optional. The Cloud Storage object generation.",
        ).optional(),
        object: z.string().describe("Required. The Cloud Storage object name.")
          .optional(),
      }).describe("Cloud Storage source.").optional(),
      inlinedSource: z.object({
        sources: z.array(z.unknown()).describe(
          "Required. Input only. The source code.",
        ).optional(),
      }).describe("Inlined source.").optional(),
    }).describe("Source type for the container.").optional(),
    startupProbe: z.object({
      failureThreshold: z.number().int().describe(
        "Optional. Minimum consecutive failures for the probe to be considered failed after having succeeded. Defaults to 3. Minimum value is 1.",
      ).optional(),
      grpc: z.object({
        port: z.number().int().describe(
          "Optional. Port number of the gRPC service. Number must be in the range 1 to 65535. If not specified, defaults to the exposed port of the container, which is the value of container.ports[0].containerPort.",
        ).optional(),
        service: z.string().describe(
          "Optional. Service is the name of the service to place in the gRPC HealthCheckRequest (see https://github.com/grpc/grpc/blob/master/doc/health-checking.md). If this is not specified, the default behavior is defined by gRPC.",
        ).optional(),
      }).describe("GRPCAction describes an action involving a GRPC port.")
        .optional(),
      httpGet: z.object({
        httpHeaders: z.array(z.unknown()).describe(
          "Optional. Custom headers to set in the request. HTTP allows repeated headers.",
        ).optional(),
        path: z.string().describe(
          "Optional. Path to access on the HTTP server. Defaults to '/'.",
        ).optional(),
        port: z.number().int().describe(
          "Optional. Port number to access on the container. Must be in the range 1 to 65535. If not specified, defaults to the exposed port of the container, which is the value of container.ports[0].containerPort.",
        ).optional(),
      }).describe(
        "HTTPGetAction describes an action based on HTTP Get requests.",
      ).optional(),
      initialDelaySeconds: z.number().int().describe(
        "Optional. Number of seconds after the container has started before the probe is initiated. Defaults to 0 seconds. Minimum value is 0. Maximum value for liveness probe is 3600. Maximum value for startup probe is 240.",
      ).optional(),
      periodSeconds: z.number().int().describe(
        "Optional. How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1. Maximum value for liveness probe is 3600. Maximum value for startup probe is 240. Must be greater or equal than timeout_seconds.",
      ).optional(),
      tcpSocket: z.object({
        port: z.number().int().describe(
          "Optional. Port number to access on the container. Must be in the range 1 to 65535. If not specified, defaults to the exposed port of the container, which is the value of container.ports[0].containerPort.",
        ).optional(),
      }).describe(
        "TCPSocketAction describes an action based on opening a socket",
      ).optional(),
      timeoutSeconds: z.number().int().describe(
        "Optional. Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1. Maximum value is 3600. Must be smaller than period_seconds.",
      ).optional(),
    }).describe(
      "Probe describes a health check to be performed against a container to determine whether it is alive or ready to receive traffic.",
    ).optional(),
    volumeMounts: z.array(z.object({
      mountPath: z.string().describe(
        "Required. Path within the container at which the volume should be mounted. Must not contain ':'. For Cloud SQL volumes, it can be left empty, or must otherwise be `/cloudsql`. All instances defined in the Volume will be available as `/cloudsql/[instance]`. For more information on Cloud SQL volumes, visit https://cloud.google.com/sql/docs/mysql/connect-run",
      ).optional(),
      name: z.string().describe(
        "Required. This must match the Name of a Volume.",
      ).optional(),
      subPath: z.string().describe(
        "Optional. Path within the volume from which the container's volume should be mounted. Defaults to \"\" (volume's root). This field is currently rejected in Secret volume mounts.",
      ).optional(),
    })).describe("Volume to mount into the container's filesystem.").optional(),
    workingDir: z.string().describe(
      "Container's working directory. If not specified, the container runtime's default will be used, which might be configured in the container image.",
    ).optional(),
  })).describe(
    "Required. Holds the single container that defines the unit of execution for this Instance.",
  ).optional(),
  defaultUriDisabled: z.boolean().describe(
    "Optional. Disables public resolution of the default URI of this Instance.",
  ).optional(),
  description: z.string().describe(
    "User-provided description of the Instance. This field currently has a 512-character limit.",
  ).optional(),
  encryptionKey: z.string().describe(
    "A reference to a customer managed encryption key (CMEK) to use to encrypt this container image. For more information, go to https://cloud.google.com/run/docs/securing/using-cmek",
  ).optional(),
  encryptionKeyRevocationAction: z.enum([
    "ENCRYPTION_KEY_REVOCATION_ACTION_UNSPECIFIED",
    "PREVENT_NEW",
    "SHUTDOWN",
  ]).describe("The action to take if the encryption key is revoked.")
    .optional(),
  encryptionKeyShutdownDuration: z.string().describe(
    "If encryption_key_revocation_action is SHUTDOWN, the duration before shutting down all instances. The minimum increment is 1 hour.",
  ).optional(),
  gpuZonalRedundancyDisabled: z.boolean().describe(
    "Optional. True if GPU zonal redundancy is disabled on this instance.",
  ).optional(),
  iapEnabled: z.boolean().describe("Optional. IAP settings on the Instance.")
    .optional(),
  ingress: z.enum([
    "INGRESS_TRAFFIC_UNSPECIFIED",
    "INGRESS_TRAFFIC_ALL",
    "INGRESS_TRAFFIC_INTERNAL_ONLY",
    "INGRESS_TRAFFIC_INTERNAL_LOAD_BALANCER",
    "INGRESS_TRAFFIC_NONE",
  ]).describe(
    "Optional. Provides the ingress settings for this Instance. On output, returns the currently observed ingress settings, or INGRESS_TRAFFIC_UNSPECIFIED if no revision is active.",
  ).optional(),
  invokerIamDisabled: z.boolean().describe(
    "Optional. Disables IAM permission check for run.routes.invoke for callers of this Instance. For more information, visit https://cloud.google.com/run/docs/securing/managing-access#invoker_check.",
  ).optional(),
  labels: z.record(z.string(), z.string()).optional(),
  launchStage: z.enum([
    "LAUNCH_STAGE_UNSPECIFIED",
    "UNIMPLEMENTED",
    "PRELAUNCH",
    "EARLY_ACCESS",
    "ALPHA",
    "BETA",
    "GA",
    "DEPRECATED",
  ]).describe(
    "The launch stage as defined by [Google Cloud Platform Launch Stages](https://cloud.google.com/terms/launch-stages). Cloud Run supports `ALPHA`, `BETA`, and `GA`. If no value is specified, GA is assumed. Set the launch stage to a preview stage on input to allow use of preview features in that stage. On read (or output), describes whether the resource uses preview features. For example, if ALPHA is provided as input, but only BETA and GA-level features are used, this field will be BETA on output.",
  ).optional(),
  name: z.string().describe(
    "The fully qualified name of this Instance. In CreateInstanceRequest, this field is ignored, and instead composed from CreateInstanceRequest.parent and CreateInstanceRequest.instance_id. Format: projects/{project}/locations/{location}/instances/{instance_id}",
  ).optional(),
  nodeSelector: z.object({
    accelerator: z.string().describe(
      "Required. GPU accelerator type to attach to an instance.",
    ).optional(),
  }).describe("Hardware constraints configuration.").optional(),
  serviceAccount: z.string().optional(),
  terminalCondition: z.object({
    executionReason: z.enum([
      "EXECUTION_REASON_UNDEFINED",
      "JOB_STATUS_SERVICE_POLLING_ERROR",
      "NON_ZERO_EXIT_CODE",
      "CANCELLED",
      "CANCELLING",
      "DELETED",
      "DELAYED_START_PENDING",
    ]).describe("Output only. A reason for the execution condition.")
      .optional(),
    lastTransitionTime: z.string().describe(
      "Last time the condition transitioned from one status to another.",
    ).optional(),
    message: z.string().describe(
      "Human readable message indicating details about the current status.",
    ).optional(),
    reason: z.enum([
      "COMMON_REASON_UNDEFINED",
      "UNKNOWN",
      "REVISION_FAILED",
      "PROGRESS_DEADLINE_EXCEEDED",
      "CONTAINER_MISSING",
      "CONTAINER_PERMISSION_DENIED",
      "CONTAINER_IMAGE_UNAUTHORIZED",
      "CONTAINER_IMAGE_AUTHORIZATION_CHECK_FAILED",
      "ENCRYPTION_KEY_PERMISSION_DENIED",
      "ENCRYPTION_KEY_CHECK_FAILED",
      "SECRETS_ACCESS_CHECK_FAILED",
      "WAITING_FOR_OPERATION",
      "IMMEDIATE_RETRY",
      "POSTPONED_RETRY",
      "INTERNAL",
      "VPC_NETWORK_NOT_FOUND",
    ]).describe(
      "Output only. A common (service-level) reason for this condition.",
    ).optional(),
    revisionReason: z.enum([
      "REVISION_REASON_UNDEFINED",
      "PENDING",
      "RESERVE",
      "RETIRED",
      "RETIRING",
      "RECREATING",
      "HEALTH_CHECK_CONTAINER_ERROR",
      "CUSTOMIZED_PATH_RESPONSE_PENDING",
      "MIN_INSTANCES_NOT_PROVISIONED",
      "ACTIVE_REVISION_LIMIT_REACHED",
      "NO_DEPLOYMENT",
      "HEALTH_CHECK_SKIPPED",
      "MIN_INSTANCES_WARMING",
    ]).describe("Output only. A reason for the revision condition.").optional(),
    severity: z.enum(["SEVERITY_UNSPECIFIED", "ERROR", "WARNING", "INFO"])
      .describe(
        "How to interpret failures of this condition, one of Error, Warning, Info",
      ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "CONDITION_PENDING",
      "CONDITION_RECONCILING",
      "CONDITION_FAILED",
      "CONDITION_SUCCEEDED",
    ]).describe("State of the condition.").optional(),
    type: z.string().describe(
      'type is used to communicate the status of the reconciliation process. See also: https://github.com/knative/serving/blob/main/docs/spec/errors.md#error-conditions-and-reporting Types common to all resources include: * "Ready": True when the Resource is ready.',
    ).optional(),
  }).describe("Defines a status condition for a resource.").optional(),
  timeout: z.string().describe(
    "Optional. Duration the instance may be active before the system will shut it down.",
  ).optional(),
  volumes: z.array(z.object({
    cloudSqlInstance: z.object({
      instances: z.array(z.string()).describe(
        "A list of Cloud SQL instance connection names. Cloud Run uses these to establish connections to the specified Cloud SQL instances. While the SQL instance name itself is unique within a project, the full connection name requires the location for proper routing. Format: `{project}:{location}:{instance}` Example: `my-project:us-central1:my-instance` You can find this value on the instance's **Overview** page in the Google Cloud console or by using the following `gcloud` command: ` sh gcloud sql instances describe INSTANCE_NAME \\ --format='value(connectionName)' ` Visit https://cloud.google.com/sql/docs/mysql/connect-run for more information on how to connect Cloud SQL and Cloud Run.",
      ).optional(),
    }).describe(
      "Represents a set of Cloud SQL instances. Each one will be available under /cloudsql/[instance]. Visit https://cloud.google.com/sql/docs/mysql/connect-run for more information on how to connect Cloud SQL and Cloud Run.",
    ).optional(),
    emptyDir: z.object({
      medium: z.enum(["MEDIUM_UNSPECIFIED", "MEMORY", "DISK"]).describe(
        "The medium on which the data is stored. Acceptable values today is only MEMORY or none. When none, the default will currently be backed by memory but could change over time. +optional",
      ).optional(),
      sizeLimit: z.string().describe(
        "Limit on the storage usable by this EmptyDir volume. The size limit is also applicable for memory medium. The maximum usage on memory medium EmptyDir would be the minimum value between the SizeLimit specified here and the sum of memory limits of all containers. The default is nil which means that the limit is undefined. More info: https://cloud.google.com/run/docs/configuring/in-memory-volumes#configure-volume. Info in Kubernetes: https://kubernetes.io/docs/concepts/storage/volumes/#emptydir",
      ).optional(),
    }).describe(
      "In memory (tmpfs) ephemeral storage. It is ephemeral in the sense that when the sandbox is taken down, the data is destroyed with it (it does not persist across sandbox runs).",
    ).optional(),
    gcs: z.object({
      bucket: z.string().describe("Cloud Storage Bucket name.").optional(),
      mountOptions: z.array(z.string()).describe(
        'A list of additional flags to pass to the gcsfuse CLI. Options should be specified without the leading "--".',
      ).optional(),
      readOnly: z.boolean().describe(
        "If true, the volume will be mounted as read only for all mounts.",
      ).optional(),
    }).describe(
      "Represents a volume backed by a Cloud Storage bucket using Cloud Storage FUSE.",
    ).optional(),
    name: z.string().describe("Required. Volume's name.").optional(),
    nfs: z.object({
      path: z.string().describe("Path that is exported by the NFS server.")
        .optional(),
      readOnly: z.boolean().describe(
        "If true, the volume will be mounted as read only for all mounts.",
      ).optional(),
      server: z.string().describe("Hostname or IP address of the NFS server")
        .optional(),
    }).describe("Represents an NFS mount.").optional(),
    secret: z.object({
      defaultMode: z.number().int().describe(
        "Integer representation of mode bits to use on created files by default. Must be a value between 0000 and 0777 (octal), defaulting to 0444. Directories within the path are not affected by this setting. Notes * Internally, a umask of 0222 will be applied to any non-zero value. * This is an integer representation of the mode bits. So, the octal integer value should look exactly as the chmod numeric notation with a leading zero. Some examples: for chmod 640 (u=rw,g=r), set to 0640 (octal) or 416 (base-10). For chmod 755 (u=rwx,g=rx,o=rx), set to 0755 (octal) or 493 (base-10). * This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set. This might be in conflict with other options that affect the file mode, like fsGroup, and as a result, other mode bits could be set.",
      ).optional(),
      items: z.array(z.object({
        mode: z.unknown().describe(
          "Integer octal mode bits to use on this file, must be a value between 01 and 0777 (octal). If 0 or not set, the Volume's default mode will be used. Notes * Internally, a umask of 0222 will be applied to any non-zero value. * This is an integer representation of the mode bits. So, the octal integer value should look exactly as the chmod numeric notation with a leading zero. Some examples: for chmod 640 (u=rw,g=r), set to 0640 (octal) or 416 (base-10). For chmod 755 (u=rwx,g=rx,o=rx), set to 0755 (octal) or 493 (base-10). * This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.",
        ).optional(),
        path: z.unknown().describe(
          "Required. The relative path of the secret in the container.",
        ).optional(),
        version: z.unknown().describe(
          "The Cloud Secret Manager secret version. Can be 'latest' for the latest value, or an integer or a secret alias for a specific version.",
        ).optional(),
      })).describe(
        "If unspecified, the volume will expose a file whose name is the secret, relative to VolumeMount.mount_path + VolumeMount.sub_path. If specified, the key will be used as the version to fetch from Cloud Secret Manager and the path will be the name of the file exposed in the volume. When items are defined, they must specify a path and a version.",
      ).optional(),
      secret: z.string().describe(
        "Required. The name of the secret in Cloud Secret Manager. Format: {secret} if the secret is in the same project. projects/{project}/secrets/{secret} if the secret is in a different project.",
      ).optional(),
    }).describe(
      "The secret's value will be presented as the content of a file whose name is defined in the item path. If no items are defined, the name of the file is the secret.",
    ).optional(),
  })).describe("A list of Volumes to make available to containers.").optional(),
  vpcAccess: z.object({
    connector: z.string().describe(
      "VPC Access connector name. Format: `projects/{project}/locations/{location}/connectors/{connector}`, where `{project}` can be project id or number. For more information on sending traffic to a VPC network via a connector, visit https://cloud.google.com/run/docs/configuring/vpc-connectors.",
    ).optional(),
    egress: z.enum([
      "VPC_EGRESS_UNSPECIFIED",
      "ALL_TRAFFIC",
      "PRIVATE_RANGES_ONLY",
    ]).describe(
      "Optional. Traffic VPC egress settings. If not provided, it defaults to PRIVATE_RANGES_ONLY.",
    ).optional(),
    networkInterfaces: z.array(z.object({
      network: z.string().describe(
        "Optional. The VPC network that the Cloud Run resource will be able to send traffic to. At least one of network or subnetwork must be specified. If both network and subnetwork are specified, the given VPC subnetwork must belong to the given VPC network. If network is not specified, it will be looked up from the subnetwork.",
      ).optional(),
      subnetwork: z.string().describe(
        "Optional. The VPC subnetwork that the Cloud Run resource will get IPs from. At least one of network or subnetwork must be specified. If both network and subnetwork are specified, the given VPC subnetwork must belong to the given VPC network. If subnetwork is not specified, the subnetwork with the same name with the network will be used.",
      ).optional(),
      tags: z.array(z.string()).describe(
        "Optional. Network tags applied to this Cloud Run resource.",
      ).optional(),
    })).describe(
      "Optional. Direct VPC egress settings. Currently only single network interface is supported.",
    ).optional(),
  }).describe(
    "VPC Access settings. For more information on sending traffic to a VPC network, visit https://cloud.google.com/run/docs/configuring/connecting-vpc.",
  ).optional(),
  instanceId: z.string().describe(
    "Optional. The unique identifier for the Instance. It must begin with letter, and cannot end with hyphen; must contain fewer than 50 characters. The name of the instance becomes {parent}/instances/{instance_id}. If not provided, the server will generate a unique `instance_id`.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  annotations: z.record(z.string(), z.unknown()).optional(),
  binaryAuthorization: z.object({
    breakglassJustification: z.string(),
    policy: z.string(),
    useDefault: z.boolean(),
  }).optional(),
  client: z.string().optional(),
  clientVersion: z.string().optional(),
  conditions: z.array(z.object({
    executionReason: z.string(),
    lastTransitionTime: z.string(),
    message: z.string(),
    reason: z.string(),
    revisionReason: z.string(),
    severity: z.string(),
    state: z.string(),
    type: z.string(),
  })).optional(),
  containerStatuses: z.array(z.object({
    imageDigest: z.string(),
    name: z.string(),
  })).optional(),
  containers: z.array(z.object({
    args: z.array(z.string()),
    baseImageUri: z.string(),
    buildInfo: z.object({
      functionTarget: z.string(),
      sourceLocation: z.string(),
    }),
    command: z.array(z.string()),
    dependsOn: z.array(z.string()),
    env: z.array(z.object({
      name: z.string(),
      value: z.string(),
      valueSource: z.object({
        secretKeyRef: z.unknown(),
      }),
    })),
    image: z.string(),
    livenessProbe: z.object({
      failureThreshold: z.number(),
      grpc: z.object({
        port: z.number(),
        service: z.string(),
      }),
      httpGet: z.object({
        httpHeaders: z.array(z.unknown()),
        path: z.string(),
        port: z.number(),
      }),
      initialDelaySeconds: z.number(),
      periodSeconds: z.number(),
      tcpSocket: z.object({
        port: z.number(),
      }),
      timeoutSeconds: z.number(),
    }),
    name: z.string(),
    ports: z.array(z.object({
      containerPort: z.number(),
      name: z.string(),
    })),
    readinessProbe: z.object({
      failureThreshold: z.number(),
      grpc: z.object({
        port: z.number(),
        service: z.string(),
      }),
      httpGet: z.object({
        httpHeaders: z.array(z.unknown()),
        path: z.string(),
        port: z.number(),
      }),
      initialDelaySeconds: z.number(),
      periodSeconds: z.number(),
      tcpSocket: z.object({
        port: z.number(),
      }),
      timeoutSeconds: z.number(),
    }),
    resources: z.object({
      cpuIdle: z.boolean(),
      limits: z.record(z.string(), z.unknown()),
      startupCpuBoost: z.boolean(),
    }),
    sourceCode: z.object({
      cloudStorageSource: z.object({
        bucket: z.string(),
        generation: z.string(),
        object: z.string(),
      }),
      inlinedSource: z.object({
        sources: z.array(z.unknown()),
      }),
    }),
    startupProbe: z.object({
      failureThreshold: z.number(),
      grpc: z.object({
        port: z.number(),
        service: z.string(),
      }),
      httpGet: z.object({
        httpHeaders: z.array(z.unknown()),
        path: z.string(),
        port: z.number(),
      }),
      initialDelaySeconds: z.number(),
      periodSeconds: z.number(),
      tcpSocket: z.object({
        port: z.number(),
      }),
      timeoutSeconds: z.number(),
    }),
    volumeMounts: z.array(z.object({
      mountPath: z.string(),
      name: z.string(),
      subPath: z.string(),
    })),
    workingDir: z.string(),
  })).optional(),
  createTime: z.string().optional(),
  creator: z.string().optional(),
  defaultUriDisabled: z.boolean().optional(),
  deleteTime: z.string().optional(),
  description: z.string().optional(),
  encryptionKey: z.string().optional(),
  encryptionKeyRevocationAction: z.string().optional(),
  encryptionKeyShutdownDuration: z.string().optional(),
  etag: z.string().optional(),
  expireTime: z.string().optional(),
  generation: z.string().optional(),
  gpuZonalRedundancyDisabled: z.boolean().optional(),
  iapEnabled: z.boolean().optional(),
  ingress: z.string().optional(),
  invokerIamDisabled: z.boolean().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  lastModifier: z.string().optional(),
  launchStage: z.string().optional(),
  logUri: z.string().optional(),
  name: z.string(),
  nodeSelector: z.object({
    accelerator: z.string(),
  }).optional(),
  observedGeneration: z.string().optional(),
  reconciling: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  serviceAccount: z.string().optional(),
  terminalCondition: z.object({
    executionReason: z.string(),
    lastTransitionTime: z.string(),
    message: z.string(),
    reason: z.string(),
    revisionReason: z.string(),
    severity: z.string(),
    state: z.string(),
    type: z.string(),
  }).optional(),
  timeout: z.string().optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
  urls: z.array(z.string()).optional(),
  volumes: z.array(z.object({
    cloudSqlInstance: z.object({
      instances: z.array(z.string()),
    }),
    emptyDir: z.object({
      medium: z.string(),
      sizeLimit: z.string(),
    }),
    gcs: z.object({
      bucket: z.string(),
      mountOptions: z.array(z.string()),
      readOnly: z.boolean(),
    }),
    name: z.string(),
    nfs: z.object({
      path: z.string(),
      readOnly: z.boolean(),
      server: z.string(),
    }),
    secret: z.object({
      defaultMode: z.number(),
      items: z.array(z.object({
        mode: z.unknown(),
        path: z.unknown(),
        version: z.unknown(),
      })),
      secret: z.string(),
    }),
  })).optional(),
  vpcAccess: z.object({
    connector: z.string(),
    egress: z.string(),
    networkInterfaces: z.array(z.object({
      network: z.string(),
      subnetwork: z.string(),
      tags: z.array(z.string()),
    })),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  annotations: z.record(z.string(), z.string()).optional(),
  binaryAuthorization: z.object({
    breakglassJustification: z.string().describe(
      "Optional. If present, indicates to use Breakglass using this justification. If use_default is False, then it must be empty. For more information on breakglass, see https://cloud.google.com/binary-authorization/docs/using-breakglass",
    ).optional(),
    policy: z.string().describe(
      "Optional. The path to a binary authorization policy. Format: `projects/{project}/platforms/cloudRun/{policy-name}`",
    ).optional(),
    useDefault: z.boolean().describe(
      "Optional. If True, indicates to use the default project's binary authorization policy. If False, binary authorization will be disabled.",
    ).optional(),
  }).describe("Settings for Binary Authorization feature.").optional(),
  client: z.string().describe("Arbitrary identifier for the API client.")
    .optional(),
  clientVersion: z.string().describe(
    "Arbitrary version identifier for the API client.",
  ).optional(),
  containers: z.array(z.object({
    args: z.array(z.string()).describe(
      "Arguments to the entrypoint. The docker image's CMD is used if this is not provided.",
    ).optional(),
    baseImageUri: z.string().describe(
      "Base image for this container. Only supported for services. If set, it indicates that the service is enrolled into automatic base image update.",
    ).optional(),
    buildInfo: z.object({
      functionTarget: z.string().describe(
        "Output only. Entry point of the function when the image is a Cloud Run function.",
      ).optional(),
      sourceLocation: z.string().describe(
        "Output only. Source code location of the image.",
      ).optional(),
    }).describe("Build information of the image.").optional(),
    command: z.array(z.string()).describe(
      "Entrypoint array. Not executed within a shell. The docker image's ENTRYPOINT is used if this is not provided.",
    ).optional(),
    dependsOn: z.array(z.string()).describe(
      "Names of the containers that must start before this container.",
    ).optional(),
    env: z.array(z.object({
      name: z.string().describe(
        "Required. Name of the environment variable. Must not exceed 32768 characters.",
      ).optional(),
      value: z.string().describe(
        'Literal value of the environment variable. Defaults to "", and the maximum length is 32768 bytes. Variable references are not supported in Cloud Run.',
      ).optional(),
      valueSource: z.object({
        secretKeyRef: z.unknown().describe(
          "SecretEnvVarSource represents a source for the value of an EnvVar.",
        ).optional(),
      }).describe(
        "EnvVarSource represents a source for the value of an EnvVar.",
      ).optional(),
    })).describe("List of environment variables to set in the container.")
      .optional(),
    image: z.string().describe(
      "Required. Name of the container image in Dockerhub, Google Artifact Registry, or Google Container Registry. If the host is not provided, Dockerhub is assumed.",
    ).optional(),
    livenessProbe: z.object({
      failureThreshold: z.number().int().describe(
        "Optional. Minimum consecutive failures for the probe to be considered failed after having succeeded. Defaults to 3. Minimum value is 1.",
      ).optional(),
      grpc: z.object({
        port: z.number().int().describe(
          "Optional. Port number of the gRPC service. Number must be in the range 1 to 65535. If not specified, defaults to the exposed port of the container, which is the value of container.ports[0].containerPort.",
        ).optional(),
        service: z.string().describe(
          "Optional. Service is the name of the service to place in the gRPC HealthCheckRequest (see https://github.com/grpc/grpc/blob/master/doc/health-checking.md). If this is not specified, the default behavior is defined by gRPC.",
        ).optional(),
      }).describe("GRPCAction describes an action involving a GRPC port.")
        .optional(),
      httpGet: z.object({
        httpHeaders: z.array(z.unknown()).describe(
          "Optional. Custom headers to set in the request. HTTP allows repeated headers.",
        ).optional(),
        path: z.string().describe(
          "Optional. Path to access on the HTTP server. Defaults to '/'.",
        ).optional(),
        port: z.number().int().describe(
          "Optional. Port number to access on the container. Must be in the range 1 to 65535. If not specified, defaults to the exposed port of the container, which is the value of container.ports[0].containerPort.",
        ).optional(),
      }).describe(
        "HTTPGetAction describes an action based on HTTP Get requests.",
      ).optional(),
      initialDelaySeconds: z.number().int().describe(
        "Optional. Number of seconds after the container has started before the probe is initiated. Defaults to 0 seconds. Minimum value is 0. Maximum value for liveness probe is 3600. Maximum value for startup probe is 240.",
      ).optional(),
      periodSeconds: z.number().int().describe(
        "Optional. How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1. Maximum value for liveness probe is 3600. Maximum value for startup probe is 240. Must be greater or equal than timeout_seconds.",
      ).optional(),
      tcpSocket: z.object({
        port: z.number().int().describe(
          "Optional. Port number to access on the container. Must be in the range 1 to 65535. If not specified, defaults to the exposed port of the container, which is the value of container.ports[0].containerPort.",
        ).optional(),
      }).describe(
        "TCPSocketAction describes an action based on opening a socket",
      ).optional(),
      timeoutSeconds: z.number().int().describe(
        "Optional. Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1. Maximum value is 3600. Must be smaller than period_seconds.",
      ).optional(),
    }).describe(
      "Probe describes a health check to be performed against a container to determine whether it is alive or ready to receive traffic.",
    ).optional(),
    name: z.string().describe(
      "Name of the container specified as a DNS_LABEL (RFC 1123).",
    ).optional(),
    ports: z.array(z.object({
      containerPort: z.number().int().describe(
        "Port number the container listens on. This must be a valid TCP port number, 0 < container_port < 65536.",
      ).optional(),
      name: z.string().describe(
        'If specified, used to specify which protocol to use. Allowed values are "http1" and "h2c".',
      ).optional(),
    })).describe(
      "List of ports to expose from the container. Only a single port can be specified. The specified ports must be listening on all interfaces (0.0.0.0) within the container to be accessible. If omitted, a port number will be chosen and passed to the container through the PORT environment variable for the container to listen on.",
    ).optional(),
    readinessProbe: z.object({
      failureThreshold: z.number().int().describe(
        "Optional. Minimum consecutive failures for the probe to be considered failed after having succeeded. Defaults to 3. Minimum value is 1.",
      ).optional(),
      grpc: z.object({
        port: z.number().int().describe(
          "Optional. Port number of the gRPC service. Number must be in the range 1 to 65535. If not specified, defaults to the exposed port of the container, which is the value of container.ports[0].containerPort.",
        ).optional(),
        service: z.string().describe(
          "Optional. Service is the name of the service to place in the gRPC HealthCheckRequest (see https://github.com/grpc/grpc/blob/master/doc/health-checking.md). If this is not specified, the default behavior is defined by gRPC.",
        ).optional(),
      }).describe("GRPCAction describes an action involving a GRPC port.")
        .optional(),
      httpGet: z.object({
        httpHeaders: z.array(z.unknown()).describe(
          "Optional. Custom headers to set in the request. HTTP allows repeated headers.",
        ).optional(),
        path: z.string().describe(
          "Optional. Path to access on the HTTP server. Defaults to '/'.",
        ).optional(),
        port: z.number().int().describe(
          "Optional. Port number to access on the container. Must be in the range 1 to 65535. If not specified, defaults to the exposed port of the container, which is the value of container.ports[0].containerPort.",
        ).optional(),
      }).describe(
        "HTTPGetAction describes an action based on HTTP Get requests.",
      ).optional(),
      initialDelaySeconds: z.number().int().describe(
        "Optional. Number of seconds after the container has started before the probe is initiated. Defaults to 0 seconds. Minimum value is 0. Maximum value for liveness probe is 3600. Maximum value for startup probe is 240.",
      ).optional(),
      periodSeconds: z.number().int().describe(
        "Optional. How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1. Maximum value for liveness probe is 3600. Maximum value for startup probe is 240. Must be greater or equal than timeout_seconds.",
      ).optional(),
      tcpSocket: z.object({
        port: z.number().int().describe(
          "Optional. Port number to access on the container. Must be in the range 1 to 65535. If not specified, defaults to the exposed port of the container, which is the value of container.ports[0].containerPort.",
        ).optional(),
      }).describe(
        "TCPSocketAction describes an action based on opening a socket",
      ).optional(),
      timeoutSeconds: z.number().int().describe(
        "Optional. Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1. Maximum value is 3600. Must be smaller than period_seconds.",
      ).optional(),
    }).describe(
      "Probe describes a health check to be performed against a container to determine whether it is alive or ready to receive traffic.",
    ).optional(),
    resources: z.object({
      cpuIdle: z.boolean().describe(
        "Determines whether CPU is only allocated during requests (true by default). However, if ResourceRequirements is set, the caller must explicitly set this field to true to preserve the default behavior.",
      ).optional(),
      limits: z.record(z.string(), z.string()).describe(
        "Only `memory`, `cpu` and `nvidia.com/gpu` keys in the map are supported. Notes: * The only supported values for CPU are '1', '2', '4', and '8'. Setting 4 CPU requires at least 2Gi of memory. For more information, go to https://cloud.google.com/run/docs/configuring/cpu. * For supported 'memory' values and syntax, go to https://cloud.google.com/run/docs/configuring/memory-limits * The only supported 'nvidia.com/gpu' value is '1'.",
      ).optional(),
      startupCpuBoost: z.boolean().describe(
        "Determines whether CPU should be boosted on startup of a new container instance above the requested CPU threshold, this can help reduce cold-start latency.",
      ).optional(),
    }).describe(
      "ResourceRequirements describes the compute resource requirements.",
    ).optional(),
    sourceCode: z.object({
      cloudStorageSource: z.object({
        bucket: z.string().describe("Required. The Cloud Storage bucket name.")
          .optional(),
        generation: z.string().describe(
          "Optional. The Cloud Storage object generation.",
        ).optional(),
        object: z.string().describe("Required. The Cloud Storage object name.")
          .optional(),
      }).describe("Cloud Storage source.").optional(),
      inlinedSource: z.object({
        sources: z.array(z.unknown()).describe(
          "Required. Input only. The source code.",
        ).optional(),
      }).describe("Inlined source.").optional(),
    }).describe("Source type for the container.").optional(),
    startupProbe: z.object({
      failureThreshold: z.number().int().describe(
        "Optional. Minimum consecutive failures for the probe to be considered failed after having succeeded. Defaults to 3. Minimum value is 1.",
      ).optional(),
      grpc: z.object({
        port: z.number().int().describe(
          "Optional. Port number of the gRPC service. Number must be in the range 1 to 65535. If not specified, defaults to the exposed port of the container, which is the value of container.ports[0].containerPort.",
        ).optional(),
        service: z.string().describe(
          "Optional. Service is the name of the service to place in the gRPC HealthCheckRequest (see https://github.com/grpc/grpc/blob/master/doc/health-checking.md). If this is not specified, the default behavior is defined by gRPC.",
        ).optional(),
      }).describe("GRPCAction describes an action involving a GRPC port.")
        .optional(),
      httpGet: z.object({
        httpHeaders: z.array(z.unknown()).describe(
          "Optional. Custom headers to set in the request. HTTP allows repeated headers.",
        ).optional(),
        path: z.string().describe(
          "Optional. Path to access on the HTTP server. Defaults to '/'.",
        ).optional(),
        port: z.number().int().describe(
          "Optional. Port number to access on the container. Must be in the range 1 to 65535. If not specified, defaults to the exposed port of the container, which is the value of container.ports[0].containerPort.",
        ).optional(),
      }).describe(
        "HTTPGetAction describes an action based on HTTP Get requests.",
      ).optional(),
      initialDelaySeconds: z.number().int().describe(
        "Optional. Number of seconds after the container has started before the probe is initiated. Defaults to 0 seconds. Minimum value is 0. Maximum value for liveness probe is 3600. Maximum value for startup probe is 240.",
      ).optional(),
      periodSeconds: z.number().int().describe(
        "Optional. How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1. Maximum value for liveness probe is 3600. Maximum value for startup probe is 240. Must be greater or equal than timeout_seconds.",
      ).optional(),
      tcpSocket: z.object({
        port: z.number().int().describe(
          "Optional. Port number to access on the container. Must be in the range 1 to 65535. If not specified, defaults to the exposed port of the container, which is the value of container.ports[0].containerPort.",
        ).optional(),
      }).describe(
        "TCPSocketAction describes an action based on opening a socket",
      ).optional(),
      timeoutSeconds: z.number().int().describe(
        "Optional. Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1. Maximum value is 3600. Must be smaller than period_seconds.",
      ).optional(),
    }).describe(
      "Probe describes a health check to be performed against a container to determine whether it is alive or ready to receive traffic.",
    ).optional(),
    volumeMounts: z.array(z.object({
      mountPath: z.string().describe(
        "Required. Path within the container at which the volume should be mounted. Must not contain ':'. For Cloud SQL volumes, it can be left empty, or must otherwise be `/cloudsql`. All instances defined in the Volume will be available as `/cloudsql/[instance]`. For more information on Cloud SQL volumes, visit https://cloud.google.com/sql/docs/mysql/connect-run",
      ).optional(),
      name: z.string().describe(
        "Required. This must match the Name of a Volume.",
      ).optional(),
      subPath: z.string().describe(
        "Optional. Path within the volume from which the container's volume should be mounted. Defaults to \"\" (volume's root). This field is currently rejected in Secret volume mounts.",
      ).optional(),
    })).describe("Volume to mount into the container's filesystem.").optional(),
    workingDir: z.string().describe(
      "Container's working directory. If not specified, the container runtime's default will be used, which might be configured in the container image.",
    ).optional(),
  })).describe(
    "Required. Holds the single container that defines the unit of execution for this Instance.",
  ).optional(),
  defaultUriDisabled: z.boolean().describe(
    "Optional. Disables public resolution of the default URI of this Instance.",
  ).optional(),
  description: z.string().describe(
    "User-provided description of the Instance. This field currently has a 512-character limit.",
  ).optional(),
  encryptionKey: z.string().describe(
    "A reference to a customer managed encryption key (CMEK) to use to encrypt this container image. For more information, go to https://cloud.google.com/run/docs/securing/using-cmek",
  ).optional(),
  encryptionKeyRevocationAction: z.enum([
    "ENCRYPTION_KEY_REVOCATION_ACTION_UNSPECIFIED",
    "PREVENT_NEW",
    "SHUTDOWN",
  ]).describe("The action to take if the encryption key is revoked.")
    .optional(),
  encryptionKeyShutdownDuration: z.string().describe(
    "If encryption_key_revocation_action is SHUTDOWN, the duration before shutting down all instances. The minimum increment is 1 hour.",
  ).optional(),
  gpuZonalRedundancyDisabled: z.boolean().describe(
    "Optional. True if GPU zonal redundancy is disabled on this instance.",
  ).optional(),
  iapEnabled: z.boolean().describe("Optional. IAP settings on the Instance.")
    .optional(),
  ingress: z.enum([
    "INGRESS_TRAFFIC_UNSPECIFIED",
    "INGRESS_TRAFFIC_ALL",
    "INGRESS_TRAFFIC_INTERNAL_ONLY",
    "INGRESS_TRAFFIC_INTERNAL_LOAD_BALANCER",
    "INGRESS_TRAFFIC_NONE",
  ]).describe(
    "Optional. Provides the ingress settings for this Instance. On output, returns the currently observed ingress settings, or INGRESS_TRAFFIC_UNSPECIFIED if no revision is active.",
  ).optional(),
  invokerIamDisabled: z.boolean().describe(
    "Optional. Disables IAM permission check for run.routes.invoke for callers of this Instance. For more information, visit https://cloud.google.com/run/docs/securing/managing-access#invoker_check.",
  ).optional(),
  labels: z.record(z.string(), z.string()).optional(),
  launchStage: z.enum([
    "LAUNCH_STAGE_UNSPECIFIED",
    "UNIMPLEMENTED",
    "PRELAUNCH",
    "EARLY_ACCESS",
    "ALPHA",
    "BETA",
    "GA",
    "DEPRECATED",
  ]).describe(
    "The launch stage as defined by [Google Cloud Platform Launch Stages](https://cloud.google.com/terms/launch-stages). Cloud Run supports `ALPHA`, `BETA`, and `GA`. If no value is specified, GA is assumed. Set the launch stage to a preview stage on input to allow use of preview features in that stage. On read (or output), describes whether the resource uses preview features. For example, if ALPHA is provided as input, but only BETA and GA-level features are used, this field will be BETA on output.",
  ).optional(),
  name: z.string().describe(
    "The fully qualified name of this Instance. In CreateInstanceRequest, this field is ignored, and instead composed from CreateInstanceRequest.parent and CreateInstanceRequest.instance_id. Format: projects/{project}/locations/{location}/instances/{instance_id}",
  ).optional(),
  nodeSelector: z.object({
    accelerator: z.string().describe(
      "Required. GPU accelerator type to attach to an instance.",
    ).optional(),
  }).describe("Hardware constraints configuration.").optional(),
  serviceAccount: z.string().optional(),
  terminalCondition: z.object({
    executionReason: z.enum([
      "EXECUTION_REASON_UNDEFINED",
      "JOB_STATUS_SERVICE_POLLING_ERROR",
      "NON_ZERO_EXIT_CODE",
      "CANCELLED",
      "CANCELLING",
      "DELETED",
      "DELAYED_START_PENDING",
    ]).describe("Output only. A reason for the execution condition.")
      .optional(),
    lastTransitionTime: z.string().describe(
      "Last time the condition transitioned from one status to another.",
    ).optional(),
    message: z.string().describe(
      "Human readable message indicating details about the current status.",
    ).optional(),
    reason: z.enum([
      "COMMON_REASON_UNDEFINED",
      "UNKNOWN",
      "REVISION_FAILED",
      "PROGRESS_DEADLINE_EXCEEDED",
      "CONTAINER_MISSING",
      "CONTAINER_PERMISSION_DENIED",
      "CONTAINER_IMAGE_UNAUTHORIZED",
      "CONTAINER_IMAGE_AUTHORIZATION_CHECK_FAILED",
      "ENCRYPTION_KEY_PERMISSION_DENIED",
      "ENCRYPTION_KEY_CHECK_FAILED",
      "SECRETS_ACCESS_CHECK_FAILED",
      "WAITING_FOR_OPERATION",
      "IMMEDIATE_RETRY",
      "POSTPONED_RETRY",
      "INTERNAL",
      "VPC_NETWORK_NOT_FOUND",
    ]).describe(
      "Output only. A common (service-level) reason for this condition.",
    ).optional(),
    revisionReason: z.enum([
      "REVISION_REASON_UNDEFINED",
      "PENDING",
      "RESERVE",
      "RETIRED",
      "RETIRING",
      "RECREATING",
      "HEALTH_CHECK_CONTAINER_ERROR",
      "CUSTOMIZED_PATH_RESPONSE_PENDING",
      "MIN_INSTANCES_NOT_PROVISIONED",
      "ACTIVE_REVISION_LIMIT_REACHED",
      "NO_DEPLOYMENT",
      "HEALTH_CHECK_SKIPPED",
      "MIN_INSTANCES_WARMING",
    ]).describe("Output only. A reason for the revision condition.").optional(),
    severity: z.enum(["SEVERITY_UNSPECIFIED", "ERROR", "WARNING", "INFO"])
      .describe(
        "How to interpret failures of this condition, one of Error, Warning, Info",
      ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "CONDITION_PENDING",
      "CONDITION_RECONCILING",
      "CONDITION_FAILED",
      "CONDITION_SUCCEEDED",
    ]).describe("State of the condition.").optional(),
    type: z.string().describe(
      'type is used to communicate the status of the reconciliation process. See also: https://github.com/knative/serving/blob/main/docs/spec/errors.md#error-conditions-and-reporting Types common to all resources include: * "Ready": True when the Resource is ready.',
    ).optional(),
  }).describe("Defines a status condition for a resource.").optional(),
  timeout: z.string().describe(
    "Optional. Duration the instance may be active before the system will shut it down.",
  ).optional(),
  volumes: z.array(z.object({
    cloudSqlInstance: z.object({
      instances: z.array(z.string()).describe(
        "A list of Cloud SQL instance connection names. Cloud Run uses these to establish connections to the specified Cloud SQL instances. While the SQL instance name itself is unique within a project, the full connection name requires the location for proper routing. Format: `{project}:{location}:{instance}` Example: `my-project:us-central1:my-instance` You can find this value on the instance's **Overview** page in the Google Cloud console or by using the following `gcloud` command: ` sh gcloud sql instances describe INSTANCE_NAME \\ --format='value(connectionName)' ` Visit https://cloud.google.com/sql/docs/mysql/connect-run for more information on how to connect Cloud SQL and Cloud Run.",
      ).optional(),
    }).describe(
      "Represents a set of Cloud SQL instances. Each one will be available under /cloudsql/[instance]. Visit https://cloud.google.com/sql/docs/mysql/connect-run for more information on how to connect Cloud SQL and Cloud Run.",
    ).optional(),
    emptyDir: z.object({
      medium: z.enum(["MEDIUM_UNSPECIFIED", "MEMORY", "DISK"]).describe(
        "The medium on which the data is stored. Acceptable values today is only MEMORY or none. When none, the default will currently be backed by memory but could change over time. +optional",
      ).optional(),
      sizeLimit: z.string().describe(
        "Limit on the storage usable by this EmptyDir volume. The size limit is also applicable for memory medium. The maximum usage on memory medium EmptyDir would be the minimum value between the SizeLimit specified here and the sum of memory limits of all containers. The default is nil which means that the limit is undefined. More info: https://cloud.google.com/run/docs/configuring/in-memory-volumes#configure-volume. Info in Kubernetes: https://kubernetes.io/docs/concepts/storage/volumes/#emptydir",
      ).optional(),
    }).describe(
      "In memory (tmpfs) ephemeral storage. It is ephemeral in the sense that when the sandbox is taken down, the data is destroyed with it (it does not persist across sandbox runs).",
    ).optional(),
    gcs: z.object({
      bucket: z.string().describe("Cloud Storage Bucket name.").optional(),
      mountOptions: z.array(z.string()).describe(
        'A list of additional flags to pass to the gcsfuse CLI. Options should be specified without the leading "--".',
      ).optional(),
      readOnly: z.boolean().describe(
        "If true, the volume will be mounted as read only for all mounts.",
      ).optional(),
    }).describe(
      "Represents a volume backed by a Cloud Storage bucket using Cloud Storage FUSE.",
    ).optional(),
    name: z.string().describe("Required. Volume's name.").optional(),
    nfs: z.object({
      path: z.string().describe("Path that is exported by the NFS server.")
        .optional(),
      readOnly: z.boolean().describe(
        "If true, the volume will be mounted as read only for all mounts.",
      ).optional(),
      server: z.string().describe("Hostname or IP address of the NFS server")
        .optional(),
    }).describe("Represents an NFS mount.").optional(),
    secret: z.object({
      defaultMode: z.number().int().describe(
        "Integer representation of mode bits to use on created files by default. Must be a value between 0000 and 0777 (octal), defaulting to 0444. Directories within the path are not affected by this setting. Notes * Internally, a umask of 0222 will be applied to any non-zero value. * This is an integer representation of the mode bits. So, the octal integer value should look exactly as the chmod numeric notation with a leading zero. Some examples: for chmod 640 (u=rw,g=r), set to 0640 (octal) or 416 (base-10). For chmod 755 (u=rwx,g=rx,o=rx), set to 0755 (octal) or 493 (base-10). * This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set. This might be in conflict with other options that affect the file mode, like fsGroup, and as a result, other mode bits could be set.",
      ).optional(),
      items: z.array(z.object({
        mode: z.unknown().describe(
          "Integer octal mode bits to use on this file, must be a value between 01 and 0777 (octal). If 0 or not set, the Volume's default mode will be used. Notes * Internally, a umask of 0222 will be applied to any non-zero value. * This is an integer representation of the mode bits. So, the octal integer value should look exactly as the chmod numeric notation with a leading zero. Some examples: for chmod 640 (u=rw,g=r), set to 0640 (octal) or 416 (base-10). For chmod 755 (u=rwx,g=rx,o=rx), set to 0755 (octal) or 493 (base-10). * This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.",
        ).optional(),
        path: z.unknown().describe(
          "Required. The relative path of the secret in the container.",
        ).optional(),
        version: z.unknown().describe(
          "The Cloud Secret Manager secret version. Can be 'latest' for the latest value, or an integer or a secret alias for a specific version.",
        ).optional(),
      })).describe(
        "If unspecified, the volume will expose a file whose name is the secret, relative to VolumeMount.mount_path + VolumeMount.sub_path. If specified, the key will be used as the version to fetch from Cloud Secret Manager and the path will be the name of the file exposed in the volume. When items are defined, they must specify a path and a version.",
      ).optional(),
      secret: z.string().describe(
        "Required. The name of the secret in Cloud Secret Manager. Format: {secret} if the secret is in the same project. projects/{project}/secrets/{secret} if the secret is in a different project.",
      ).optional(),
    }).describe(
      "The secret's value will be presented as the content of a file whose name is defined in the item path. If no items are defined, the name of the file is the secret.",
    ).optional(),
  })).describe("A list of Volumes to make available to containers.").optional(),
  vpcAccess: z.object({
    connector: z.string().describe(
      "VPC Access connector name. Format: `projects/{project}/locations/{location}/connectors/{connector}`, where `{project}` can be project id or number. For more information on sending traffic to a VPC network via a connector, visit https://cloud.google.com/run/docs/configuring/vpc-connectors.",
    ).optional(),
    egress: z.enum([
      "VPC_EGRESS_UNSPECIFIED",
      "ALL_TRAFFIC",
      "PRIVATE_RANGES_ONLY",
    ]).describe(
      "Optional. Traffic VPC egress settings. If not provided, it defaults to PRIVATE_RANGES_ONLY.",
    ).optional(),
    networkInterfaces: z.array(z.object({
      network: z.string().describe(
        "Optional. The VPC network that the Cloud Run resource will be able to send traffic to. At least one of network or subnetwork must be specified. If both network and subnetwork are specified, the given VPC subnetwork must belong to the given VPC network. If network is not specified, it will be looked up from the subnetwork.",
      ).optional(),
      subnetwork: z.string().describe(
        "Optional. The VPC subnetwork that the Cloud Run resource will get IPs from. At least one of network or subnetwork must be specified. If both network and subnetwork are specified, the given VPC subnetwork must belong to the given VPC network. If subnetwork is not specified, the subnetwork with the same name with the network will be used.",
      ).optional(),
      tags: z.array(z.string()).describe(
        "Optional. Network tags applied to this Cloud Run resource.",
      ).optional(),
    })).describe(
      "Optional. Direct VPC egress settings. Currently only single network interface is supported.",
    ).optional(),
  }).describe(
    "VPC Access settings. For more information on sending traffic to a VPC network, visit https://cloud.google.com/run/docs/configuring/connecting-vpc.",
  ).optional(),
  instanceId: z.string().describe(
    "Optional. The unique identifier for the Instance. It must begin with letter, and cannot end with hyphen; must contain fewer than 50 characters. The name of the instance becomes {parent}/instances/{instance_id}. If not provided, the server will generate a unique `instance_id`.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Run Admin Instances. Registered at `@swamp/gcp/run/instances`. */
export const model = {
  type: "@swamp/gcp/run/instances",
  version: "2026.05.06.1",
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
      toVersion: "2026.04.04.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.11.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.06.1",
      description: "Added: defaultUriDisabled",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A Cloud Run Instance represents a single group of containers running in a reg...",
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
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["binaryAuthorization"] !== undefined) {
          body["binaryAuthorization"] = g["binaryAuthorization"];
        }
        if (g["client"] !== undefined) body["client"] = g["client"];
        if (g["clientVersion"] !== undefined) {
          body["clientVersion"] = g["clientVersion"];
        }
        if (g["containers"] !== undefined) body["containers"] = g["containers"];
        if (g["defaultUriDisabled"] !== undefined) {
          body["defaultUriDisabled"] = g["defaultUriDisabled"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["encryptionKey"] !== undefined) {
          body["encryptionKey"] = g["encryptionKey"];
        }
        if (g["encryptionKeyRevocationAction"] !== undefined) {
          body["encryptionKeyRevocationAction"] =
            g["encryptionKeyRevocationAction"];
        }
        if (g["encryptionKeyShutdownDuration"] !== undefined) {
          body["encryptionKeyShutdownDuration"] =
            g["encryptionKeyShutdownDuration"];
        }
        if (g["gpuZonalRedundancyDisabled"] !== undefined) {
          body["gpuZonalRedundancyDisabled"] = g["gpuZonalRedundancyDisabled"];
        }
        if (g["iapEnabled"] !== undefined) body["iapEnabled"] = g["iapEnabled"];
        if (g["ingress"] !== undefined) body["ingress"] = g["ingress"];
        if (g["invokerIamDisabled"] !== undefined) {
          body["invokerIamDisabled"] = g["invokerIamDisabled"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["launchStage"] !== undefined) {
          body["launchStage"] = g["launchStage"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["nodeSelector"] !== undefined) {
          body["nodeSelector"] = g["nodeSelector"];
        }
        if (g["serviceAccount"] !== undefined) {
          body["serviceAccount"] = g["serviceAccount"];
        }
        if (g["terminalCondition"] !== undefined) {
          body["terminalCondition"] = g["terminalCondition"];
        }
        if (g["timeout"] !== undefined) body["timeout"] = g["timeout"];
        if (g["volumes"] !== undefined) body["volumes"] = g["volumes"];
        if (g["vpcAccess"] !== undefined) body["vpcAccess"] = g["vpcAccess"];
        if (g["instanceId"] !== undefined) body["instanceId"] = g["instanceId"];
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
      description: "Get a instances",
      arguments: z.object({
        identifier: z.string().describe("The name of the instances"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
      description: "Update instances attributes",
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
          String(g["parent"] ?? ""),
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["binaryAuthorization"] !== undefined) {
          body["binaryAuthorization"] = g["binaryAuthorization"];
        }
        if (g["client"] !== undefined) body["client"] = g["client"];
        if (g["clientVersion"] !== undefined) {
          body["clientVersion"] = g["clientVersion"];
        }
        if (g["containers"] !== undefined) body["containers"] = g["containers"];
        if (g["defaultUriDisabled"] !== undefined) {
          body["defaultUriDisabled"] = g["defaultUriDisabled"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["encryptionKey"] !== undefined) {
          body["encryptionKey"] = g["encryptionKey"];
        }
        if (g["encryptionKeyRevocationAction"] !== undefined) {
          body["encryptionKeyRevocationAction"] =
            g["encryptionKeyRevocationAction"];
        }
        if (g["encryptionKeyShutdownDuration"] !== undefined) {
          body["encryptionKeyShutdownDuration"] =
            g["encryptionKeyShutdownDuration"];
        }
        if (g["gpuZonalRedundancyDisabled"] !== undefined) {
          body["gpuZonalRedundancyDisabled"] = g["gpuZonalRedundancyDisabled"];
        }
        if (g["iapEnabled"] !== undefined) body["iapEnabled"] = g["iapEnabled"];
        if (g["ingress"] !== undefined) body["ingress"] = g["ingress"];
        if (g["invokerIamDisabled"] !== undefined) {
          body["invokerIamDisabled"] = g["invokerIamDisabled"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["launchStage"] !== undefined) {
          body["launchStage"] = g["launchStage"];
        }
        if (g["nodeSelector"] !== undefined) {
          body["nodeSelector"] = g["nodeSelector"];
        }
        if (g["serviceAccount"] !== undefined) {
          body["serviceAccount"] = g["serviceAccount"];
        }
        if (g["terminalCondition"] !== undefined) {
          body["terminalCondition"] = g["terminalCondition"];
        }
        if (g["timeout"] !== undefined) body["timeout"] = g["timeout"];
        if (g["volumes"] !== undefined) body["volumes"] = g["volumes"];
        if (g["vpcAccess"] !== undefined) body["vpcAccess"] = g["vpcAccess"];
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
      description: "Delete the instances",
      arguments: z.object({
        identifier: z.string().describe("The name of the instances"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
      description: "Sync instances state from GCP",
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
            String(g["parent"] ?? ""),
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
    start: {
      description: "start",
      arguments: z.object({
        etag: z.any().optional(),
        validateOnly: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["etag"] !== undefined) body["etag"] = args["etag"];
        if (args["validateOnly"] !== undefined) {
          body["validateOnly"] = args["validateOnly"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "run.projects.locations.instances.start",
            "path": "v2/{+name}:start",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    stop: {
      description: "stop",
      arguments: z.object({
        etag: z.any().optional(),
        validateOnly: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["etag"] !== undefined) body["etag"] = args["etag"];
        if (args["validateOnly"] !== undefined) {
          body["validateOnly"] = args["validateOnly"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "run.projects.locations.instances.stop",
            "path": "v2/{+name}:stop",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
