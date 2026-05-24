// Auto-generated extension model for @swamp/gcp/run/jobs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Run Admin Jobs.
 *
 * Job represents the configuration of a single job, which references a container image that is run to completion.
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
  return `${parent}/jobs/${shortName}`;
}

const BASE_URL = "https://run.googleapis.com/";

const GET_CONFIG = {
  "id": "run.projects.locations.jobs.get",
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
  "id": "run.projects.locations.jobs.create",
  "path": "v2/{+parent}/jobs",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "jobId": {
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
  "id": "run.projects.locations.jobs.patch",
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
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "run.projects.locations.jobs.delete",
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

const LIST_CONFIG = {
  "id": "run.projects.locations.jobs.list",
  "path": "v2/{+parent}/jobs",
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
    "showDeleted": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  annotations: z.record(z.string(), z.string()).describe(
    "Unstructured key value map that may be set by external tools to store and arbitrary metadata. They are not queryable and should be preserved when modifying objects. Cloud Run API v2 does not support annotations with `run.googleapis.com`, `cloud.googleapis.com`, `serving.knative.dev`, or `autoscaling.knative.dev` namespaces, and they will be rejected on new resources. All system annotations in v1 now have a corresponding field in v2 Job. This field follows Kubernetes annotations' namespacing, limits, and rules.",
  ).optional(),
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
  labels: z.record(z.string(), z.string()).describe(
    "Unstructured key value map that can be used to organize and categorize objects. User-provided labels are shared with Google's billing system, so they can be used to filter, or break down billing charges by team, component, environment, state, etc. For more information, visit https://cloud.google.com/resource-manager/docs/creating-managing-labels or https://cloud.google.com/run/docs/configuring/labels. Cloud Run API v2 does not support labels with `run.googleapis.com`, `cloud.googleapis.com`, `serving.knative.dev`, or `autoscaling.knative.dev` namespaces, and they will be rejected. All system labels in v1 now have a corresponding field in v2 Job.",
  ).optional(),
  latestCreatedExecution: z.object({
    completionStatus: z.enum([
      "COMPLETION_STATUS_UNSPECIFIED",
      "EXECUTION_SUCCEEDED",
      "EXECUTION_FAILED",
      "EXECUTION_RUNNING",
      "EXECUTION_PENDING",
      "EXECUTION_CANCELLED",
    ]).describe("Status for the execution completion.").optional(),
    completionTime: z.string().describe("Creation timestamp of the execution.")
      .optional(),
    createTime: z.string().describe("Creation timestamp of the execution.")
      .optional(),
    deleteTime: z.string().describe(
      "The deletion time of the execution. It is only populated as a response to a Delete request.",
    ).optional(),
    name: z.string().describe("Name of the execution.").optional(),
  }).describe(
    "Reference to an Execution. Use /Executions.GetExecution with the given name to get full execution including the latest status.",
  ).optional(),
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
    "The fully qualified name of this Job. Format: projects/{project}/locations/{location}/jobs/{job}",
  ).optional(),
  runExecutionToken: z.string().describe(
    "A unique string used as a suffix for creating a new execution. The Job will become ready when the execution is successfully completed. The sum of job name and token length must be fewer than 63 characters.",
  ).optional(),
  startExecutionToken: z.string().describe(
    "A unique string used as a suffix creating a new execution. The Job will become ready when the execution is successfully started. The sum of job name and token length must be fewer than 63 characters.",
  ).optional(),
  template: z.object({
    annotations: z.record(z.string(), z.string()).describe(
      "Unstructured key value map that may be set by external tools to store and arbitrary metadata. They are not queryable and should be preserved when modifying objects. Cloud Run API v2 does not support annotations with `run.googleapis.com`, `cloud.googleapis.com`, `serving.knative.dev`, or `autoscaling.knative.dev` namespaces, and they will be rejected. All system annotations in v1 now have a corresponding field in v2 ExecutionTemplate. This field follows Kubernetes annotations' namespacing, limits, and rules.",
    ).optional(),
    client: z.string().describe(
      "Optional. Arbitrary identifier for the API client.",
    ).optional(),
    clientVersion: z.string().describe(
      "Optional. Arbitrary version identifier for the API client.",
    ).optional(),
    labels: z.record(z.string(), z.string()).describe(
      "Unstructured key value map that can be used to organize and categorize objects. User-provided labels are shared with Google's billing system, so they can be used to filter, or break down billing charges by team, component, environment, state, etc. For more information, visit https://cloud.google.com/resource-manager/docs/creating-managing-labels or https://cloud.google.com/run/docs/configuring/labels. Cloud Run API v2 does not support labels with `run.googleapis.com`, `cloud.googleapis.com`, `serving.knative.dev`, or `autoscaling.knative.dev` namespaces, and they will be rejected. All system labels in v1 now have a corresponding field in v2 ExecutionTemplate.",
    ).optional(),
    parallelism: z.number().int().describe(
      "Optional. Specifies the maximum desired number of tasks the execution should run at given time. When the job is run, if this field is 0 or unset, the maximum possible value will be used for that execution. The actual number of tasks running in steady state will be less than this number when there are fewer tasks waiting to be completed remaining, i.e. when the work left to do is less than max parallelism.",
    ).optional(),
    taskCount: z.number().int().describe(
      "Specifies the desired number of tasks the execution should run. Setting to 1 means that parallelism is limited to 1 and the success of that task signals the success of the execution. Defaults to 1.",
    ).optional(),
    template: z.object({
      containers: z.array(z.object({
        args: z.array(z.unknown()).describe(
          "Arguments to the entrypoint. The docker image's CMD is used if this is not provided.",
        ).optional(),
        baseImageUri: z.string().describe(
          "Base image for this container. Only supported for services. If set, it indicates that the service is enrolled into automatic base image update.",
        ).optional(),
        buildInfo: z.object({
          functionTarget: z.unknown().describe(
            "Output only. Entry point of the function when the image is a Cloud Run function.",
          ).optional(),
          sourceLocation: z.unknown().describe(
            "Output only. Source code location of the image.",
          ).optional(),
        }).describe("Build information of the image.").optional(),
        command: z.array(z.unknown()).describe(
          "Entrypoint array. Not executed within a shell. The docker image's ENTRYPOINT is used if this is not provided.",
        ).optional(),
        dependsOn: z.array(z.unknown()).describe(
          "Names of the containers that must start before this container.",
        ).optional(),
        env: z.array(z.unknown()).describe(
          "List of environment variables to set in the container.",
        ).optional(),
        image: z.string().describe(
          "Required. Name of the container image in Dockerhub, Google Artifact Registry, or Google Container Registry. If the host is not provided, Dockerhub is assumed.",
        ).optional(),
        livenessProbe: z.object({
          failureThreshold: z.unknown().describe(
            "Optional. Minimum consecutive failures for the probe to be considered failed after having succeeded. Defaults to 3. Minimum value is 1.",
          ).optional(),
          grpc: z.unknown().describe(
            "GRPCAction describes an action involving a GRPC port.",
          ).optional(),
          httpGet: z.unknown().describe(
            "HTTPGetAction describes an action based on HTTP Get requests.",
          ).optional(),
          initialDelaySeconds: z.unknown().describe(
            "Optional. Number of seconds after the container has started before the probe is initiated. Defaults to 0 seconds. Minimum value is 0. Maximum value for liveness probe is 3600. Maximum value for startup probe is 240.",
          ).optional(),
          periodSeconds: z.unknown().describe(
            "Optional. How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1. Maximum value for liveness probe is 3600. Maximum value for startup probe is 240. Must be greater or equal than timeout_seconds.",
          ).optional(),
          tcpSocket: z.unknown().describe(
            "TCPSocketAction describes an action based on opening a socket",
          ).optional(),
          timeoutSeconds: z.unknown().describe(
            "Optional. Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1. Maximum value is 3600. Must be smaller than period_seconds.",
          ).optional(),
        }).describe(
          "Probe describes a health check to be performed against a container to determine whether it is alive or ready to receive traffic.",
        ).optional(),
        name: z.string().describe(
          "Name of the container specified as a DNS_LABEL (RFC 1123).",
        ).optional(),
        ports: z.array(z.unknown()).describe(
          "List of ports to expose from the container. Only a single port can be specified. The specified ports must be listening on all interfaces (0.0.0.0) within the container to be accessible. If omitted, a port number will be chosen and passed to the container through the PORT environment variable for the container to listen on.",
        ).optional(),
        readinessProbe: z.object({
          failureThreshold: z.unknown().describe(
            "Optional. Minimum consecutive failures for the probe to be considered failed after having succeeded. Defaults to 3. Minimum value is 1.",
          ).optional(),
          grpc: z.unknown().describe(
            "GRPCAction describes an action involving a GRPC port.",
          ).optional(),
          httpGet: z.unknown().describe(
            "HTTPGetAction describes an action based on HTTP Get requests.",
          ).optional(),
          initialDelaySeconds: z.unknown().describe(
            "Optional. Number of seconds after the container has started before the probe is initiated. Defaults to 0 seconds. Minimum value is 0. Maximum value for liveness probe is 3600. Maximum value for startup probe is 240.",
          ).optional(),
          periodSeconds: z.unknown().describe(
            "Optional. How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1. Maximum value for liveness probe is 3600. Maximum value for startup probe is 240. Must be greater or equal than timeout_seconds.",
          ).optional(),
          tcpSocket: z.unknown().describe(
            "TCPSocketAction describes an action based on opening a socket",
          ).optional(),
          timeoutSeconds: z.unknown().describe(
            "Optional. Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1. Maximum value is 3600. Must be smaller than period_seconds.",
          ).optional(),
        }).describe(
          "Probe describes a health check to be performed against a container to determine whether it is alive or ready to receive traffic.",
        ).optional(),
        resources: z.object({
          cpuIdle: z.unknown().describe(
            "Determines whether CPU is only allocated during requests (true by default). However, if ResourceRequirements is set, the caller must explicitly set this field to true to preserve the default behavior.",
          ).optional(),
          limits: z.unknown().describe(
            "Only `memory`, `cpu` and `nvidia.com/gpu` keys in the map are supported. Notes: * The only supported values for CPU are '1', '2', '4', and '8'. Setting 4 CPU requires at least 2Gi of memory. For more information, go to https://cloud.google.com/run/docs/configuring/cpu. * For supported 'memory' values and syntax, go to https://cloud.google.com/run/docs/configuring/memory-limits * The only supported 'nvidia.com/gpu' value is '1'.",
          ).optional(),
          startupCpuBoost: z.unknown().describe(
            "Determines whether CPU should be boosted on startup of a new container instance above the requested CPU threshold, this can help reduce cold-start latency.",
          ).optional(),
        }).describe(
          "ResourceRequirements describes the compute resource requirements.",
        ).optional(),
        sourceCode: z.object({
          cloudStorageSource: z.unknown().describe("Cloud Storage source.")
            .optional(),
          inlinedSource: z.unknown().describe("Inlined source.").optional(),
        }).describe("Source type for the container.").optional(),
        startupProbe: z.object({
          failureThreshold: z.unknown().describe(
            "Optional. Minimum consecutive failures for the probe to be considered failed after having succeeded. Defaults to 3. Minimum value is 1.",
          ).optional(),
          grpc: z.unknown().describe(
            "GRPCAction describes an action involving a GRPC port.",
          ).optional(),
          httpGet: z.unknown().describe(
            "HTTPGetAction describes an action based on HTTP Get requests.",
          ).optional(),
          initialDelaySeconds: z.unknown().describe(
            "Optional. Number of seconds after the container has started before the probe is initiated. Defaults to 0 seconds. Minimum value is 0. Maximum value for liveness probe is 3600. Maximum value for startup probe is 240.",
          ).optional(),
          periodSeconds: z.unknown().describe(
            "Optional. How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1. Maximum value for liveness probe is 3600. Maximum value for startup probe is 240. Must be greater or equal than timeout_seconds.",
          ).optional(),
          tcpSocket: z.unknown().describe(
            "TCPSocketAction describes an action based on opening a socket",
          ).optional(),
          timeoutSeconds: z.unknown().describe(
            "Optional. Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1. Maximum value is 3600. Must be smaller than period_seconds.",
          ).optional(),
        }).describe(
          "Probe describes a health check to be performed against a container to determine whether it is alive or ready to receive traffic.",
        ).optional(),
        volumeMounts: z.array(z.unknown()).describe(
          "Volume to mount into the container's filesystem.",
        ).optional(),
        workingDir: z.string().describe(
          "Container's working directory. If not specified, the container runtime's default will be used, which might be configured in the container image.",
        ).optional(),
      })).describe(
        "Holds the single container that defines the unit of execution for this task.",
      ).optional(),
      encryptionKey: z.string().describe(
        "A reference to a customer managed encryption key (CMEK) to use to encrypt this container image. For more information, go to https://cloud.google.com/run/docs/securing/using-cmek",
      ).optional(),
      executionEnvironment: z.enum([
        "EXECUTION_ENVIRONMENT_UNSPECIFIED",
        "EXECUTION_ENVIRONMENT_GEN1",
        "EXECUTION_ENVIRONMENT_GEN2",
      ]).describe(
        "Optional. The execution environment being used to host this Task.",
      ).optional(),
      gpuZonalRedundancyDisabled: z.boolean().describe(
        "Optional. True if GPU zonal redundancy is disabled on this task template.",
      ).optional(),
      maxRetries: z.number().int().describe(
        "Number of retries allowed per Task, before marking this Task failed. Defaults to 3.",
      ).optional(),
      nodeSelector: z.object({
        accelerator: z.string().describe(
          "Required. GPU accelerator type to attach to an instance.",
        ).optional(),
      }).describe("Hardware constraints configuration.").optional(),
      serviceAccount: z.string().describe(
        "Optional. Email address of the IAM service account associated with the Task of a Job. The service account represents the identity of the running task, and determines what permissions the task has. If not provided, the task will use the project's default service account.",
      ).optional(),
      timeout: z.string().describe(
        "Optional. Max allowed time duration the Task may be active before the system will actively try to mark it failed and kill associated containers. This applies per attempt of a task, meaning each retry can run for the full timeout. Defaults to 600 seconds.",
      ).optional(),
      volumes: z.array(z.object({
        cloudSqlInstance: z.object({
          instances: z.unknown().describe(
            "A list of Cloud SQL instance connection names. Cloud Run uses these to establish connections to the specified Cloud SQL instances. While the SQL instance name itself is unique within a project, the full connection name requires the location for proper routing. Format: `{project}:{location}:{instance}` Example: `my-project:us-central1:my-instance` You can find this value on the instance's **Overview** page in the Google Cloud console or by using the following `gcloud` command: ` sh gcloud sql instances describe INSTANCE_NAME \\ --format='value(connectionName)' ` Visit https://cloud.google.com/sql/docs/mysql/connect-run for more information on how to connect Cloud SQL and Cloud Run.",
          ).optional(),
        }).describe(
          "Represents a set of Cloud SQL instances. Each one will be available under /cloudsql/[instance]. Visit https://cloud.google.com/sql/docs/mysql/connect-run for more information on how to connect Cloud SQL and Cloud Run.",
        ).optional(),
        emptyDir: z.object({
          medium: z.unknown().describe(
            "The medium on which the data is stored. Acceptable values today is only MEMORY or none. When none, the default will currently be backed by memory but could change over time. +optional",
          ).optional(),
          sizeLimit: z.unknown().describe(
            "Limit on the storage usable by this EmptyDir volume. The size limit is also applicable for memory medium. The maximum usage on memory medium EmptyDir would be the minimum value between the SizeLimit specified here and the sum of memory limits of all containers. The default is nil which means that the limit is undefined. More info: https://cloud.google.com/run/docs/configuring/in-memory-volumes#configure-volume. Info in Kubernetes: https://kubernetes.io/docs/concepts/storage/volumes/#emptydir",
          ).optional(),
        }).describe(
          "In memory (tmpfs) ephemeral storage. It is ephemeral in the sense that when the sandbox is taken down, the data is destroyed with it (it does not persist across sandbox runs).",
        ).optional(),
        gcs: z.object({
          bucket: z.unknown().describe("Cloud Storage Bucket name.").optional(),
          mountOptions: z.unknown().describe(
            'A list of additional flags to pass to the gcsfuse CLI. Options should be specified without the leading "--".',
          ).optional(),
          readOnly: z.unknown().describe(
            "If true, the volume will be mounted as read only for all mounts.",
          ).optional(),
        }).describe(
          "Represents a volume backed by a Cloud Storage bucket using Cloud Storage FUSE.",
        ).optional(),
        name: z.string().describe("Required. Volume's name.").optional(),
        nfs: z.object({
          path: z.unknown().describe("Path that is exported by the NFS server.")
            .optional(),
          readOnly: z.unknown().describe(
            "If true, the volume will be mounted as read only for all mounts.",
          ).optional(),
          server: z.unknown().describe(
            "Hostname or IP address of the NFS server",
          ).optional(),
        }).describe("Represents an NFS mount.").optional(),
        secret: z.object({
          defaultMode: z.unknown().describe(
            "Integer representation of mode bits to use on created files by default. Must be a value between 0000 and 0777 (octal), defaulting to 0444. Directories within the path are not affected by this setting. Notes * Internally, a umask of 0222 will be applied to any non-zero value. * This is an integer representation of the mode bits. So, the octal integer value should look exactly as the chmod numeric notation with a leading zero. Some examples: for chmod 640 (u=rw,g=r), set to 0640 (octal) or 416 (base-10). For chmod 755 (u=rwx,g=rx,o=rx), set to 0755 (octal) or 493 (base-10). * This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set. This might be in conflict with other options that affect the file mode, like fsGroup, and as a result, other mode bits could be set.",
          ).optional(),
          items: z.unknown().describe(
            "If unspecified, the volume will expose a file whose name is the secret, relative to VolumeMount.mount_path + VolumeMount.sub_path. If specified, the key will be used as the version to fetch from Cloud Secret Manager and the path will be the name of the file exposed in the volume. When items are defined, they must specify a path and a version.",
          ).optional(),
          secret: z.unknown().describe(
            "Required. The name of the secret in Cloud Secret Manager. Format: {secret} if the secret is in the same project. projects/{project}/secrets/{secret} if the secret is in a different project.",
          ).optional(),
        }).describe(
          "The secret's value will be presented as the content of a file whose name is defined in the item path. If no items are defined, the name of the file is the secret.",
        ).optional(),
      })).describe(
        "Optional. A list of Volumes to make available to containers.",
      ).optional(),
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
          network: z.unknown().describe(
            "Optional. The VPC network that the Cloud Run resource will be able to send traffic to. At least one of network or subnetwork must be specified. If both network and subnetwork are specified, the given VPC subnetwork must belong to the given VPC network. If network is not specified, it will be looked up from the subnetwork.",
          ).optional(),
          subnetwork: z.unknown().describe(
            "Optional. The VPC subnetwork that the Cloud Run resource will get IPs from. At least one of network or subnetwork must be specified. If both network and subnetwork are specified, the given VPC subnetwork must belong to the given VPC network. If subnetwork is not specified, the subnetwork with the same name with the network will be used.",
          ).optional(),
          tags: z.unknown().describe(
            "Optional. Network tags applied to this Cloud Run resource.",
          ).optional(),
        })).describe(
          "Optional. Direct VPC egress settings. Currently only single network interface is supported.",
        ).optional(),
      }).describe(
        "VPC Access settings. For more information on sending traffic to a VPC network, visit https://cloud.google.com/run/docs/configuring/connecting-vpc.",
      ).optional(),
    }).describe(
      "TaskTemplate describes the data a task should have when created from a template.",
    ).optional(),
  }).describe(
    "ExecutionTemplate describes the data an execution should have when created from a template.",
  ).optional(),
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
  jobId: z.string().describe(
    "Optional. The unique identifier for the Job. The name of the job becomes {parent}/jobs/{job_id}. If not provided, the server will generate a unique `job_id`.",
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
  createTime: z.string().optional(),
  creator: z.string().optional(),
  deleteTime: z.string().optional(),
  etag: z.string().optional(),
  executionCount: z.number().optional(),
  expireTime: z.string().optional(),
  generation: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  lastModifier: z.string().optional(),
  latestCreatedExecution: z.object({
    completionStatus: z.string(),
    completionTime: z.string(),
    createTime: z.string(),
    deleteTime: z.string(),
    name: z.string(),
  }).optional(),
  launchStage: z.string().optional(),
  name: z.string(),
  observedGeneration: z.string().optional(),
  reconciling: z.boolean().optional(),
  runExecutionToken: z.string().optional(),
  satisfiesPzs: z.boolean().optional(),
  startExecutionToken: z.string().optional(),
  template: z.object({
    annotations: z.record(z.string(), z.unknown()),
    client: z.string(),
    clientVersion: z.string(),
    labels: z.record(z.string(), z.unknown()),
    parallelism: z.number(),
    taskCount: z.number(),
    template: z.object({
      containers: z.array(z.object({
        args: z.array(z.unknown()),
        baseImageUri: z.string(),
        buildInfo: z.object({
          functionTarget: z.unknown(),
          sourceLocation: z.unknown(),
        }),
        command: z.array(z.unknown()),
        dependsOn: z.array(z.unknown()),
        env: z.array(z.unknown()),
        image: z.string(),
        livenessProbe: z.object({
          failureThreshold: z.unknown(),
          grpc: z.unknown(),
          httpGet: z.unknown(),
          initialDelaySeconds: z.unknown(),
          periodSeconds: z.unknown(),
          tcpSocket: z.unknown(),
          timeoutSeconds: z.unknown(),
        }),
        name: z.string(),
        ports: z.array(z.unknown()),
        readinessProbe: z.object({
          failureThreshold: z.unknown(),
          grpc: z.unknown(),
          httpGet: z.unknown(),
          initialDelaySeconds: z.unknown(),
          periodSeconds: z.unknown(),
          tcpSocket: z.unknown(),
          timeoutSeconds: z.unknown(),
        }),
        resources: z.object({
          cpuIdle: z.unknown(),
          limits: z.unknown(),
          startupCpuBoost: z.unknown(),
        }),
        sourceCode: z.object({
          cloudStorageSource: z.unknown(),
          inlinedSource: z.unknown(),
        }),
        startupProbe: z.object({
          failureThreshold: z.unknown(),
          grpc: z.unknown(),
          httpGet: z.unknown(),
          initialDelaySeconds: z.unknown(),
          periodSeconds: z.unknown(),
          tcpSocket: z.unknown(),
          timeoutSeconds: z.unknown(),
        }),
        volumeMounts: z.array(z.unknown()),
        workingDir: z.string(),
      })),
      encryptionKey: z.string(),
      executionEnvironment: z.string(),
      gpuZonalRedundancyDisabled: z.boolean(),
      maxRetries: z.number(),
      nodeSelector: z.object({
        accelerator: z.string(),
      }),
      serviceAccount: z.string(),
      timeout: z.string(),
      volumes: z.array(z.object({
        cloudSqlInstance: z.object({
          instances: z.unknown(),
        }),
        emptyDir: z.object({
          medium: z.unknown(),
          sizeLimit: z.unknown(),
        }),
        gcs: z.object({
          bucket: z.unknown(),
          mountOptions: z.unknown(),
          readOnly: z.unknown(),
        }),
        name: z.string(),
        nfs: z.object({
          path: z.unknown(),
          readOnly: z.unknown(),
          server: z.unknown(),
        }),
        secret: z.object({
          defaultMode: z.unknown(),
          items: z.unknown(),
          secret: z.unknown(),
        }),
      })),
      vpcAccess: z.object({
        connector: z.string(),
        egress: z.string(),
        networkInterfaces: z.array(z.object({
          network: z.unknown(),
          subnetwork: z.unknown(),
          tags: z.unknown(),
        })),
      }),
    }),
  }).optional(),
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
  uid: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  annotations: z.record(z.string(), z.string()).describe(
    "Unstructured key value map that may be set by external tools to store and arbitrary metadata. They are not queryable and should be preserved when modifying objects. Cloud Run API v2 does not support annotations with `run.googleapis.com`, `cloud.googleapis.com`, `serving.knative.dev`, or `autoscaling.knative.dev` namespaces, and they will be rejected on new resources. All system annotations in v1 now have a corresponding field in v2 Job. This field follows Kubernetes annotations' namespacing, limits, and rules.",
  ).optional(),
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
  labels: z.record(z.string(), z.string()).describe(
    "Unstructured key value map that can be used to organize and categorize objects. User-provided labels are shared with Google's billing system, so they can be used to filter, or break down billing charges by team, component, environment, state, etc. For more information, visit https://cloud.google.com/resource-manager/docs/creating-managing-labels or https://cloud.google.com/run/docs/configuring/labels. Cloud Run API v2 does not support labels with `run.googleapis.com`, `cloud.googleapis.com`, `serving.knative.dev`, or `autoscaling.knative.dev` namespaces, and they will be rejected. All system labels in v1 now have a corresponding field in v2 Job.",
  ).optional(),
  latestCreatedExecution: z.object({
    completionStatus: z.enum([
      "COMPLETION_STATUS_UNSPECIFIED",
      "EXECUTION_SUCCEEDED",
      "EXECUTION_FAILED",
      "EXECUTION_RUNNING",
      "EXECUTION_PENDING",
      "EXECUTION_CANCELLED",
    ]).describe("Status for the execution completion.").optional(),
    completionTime: z.string().describe("Creation timestamp of the execution.")
      .optional(),
    createTime: z.string().describe("Creation timestamp of the execution.")
      .optional(),
    deleteTime: z.string().describe(
      "The deletion time of the execution. It is only populated as a response to a Delete request.",
    ).optional(),
    name: z.string().describe("Name of the execution.").optional(),
  }).describe(
    "Reference to an Execution. Use /Executions.GetExecution with the given name to get full execution including the latest status.",
  ).optional(),
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
    "The fully qualified name of this Job. Format: projects/{project}/locations/{location}/jobs/{job}",
  ).optional(),
  runExecutionToken: z.string().describe(
    "A unique string used as a suffix for creating a new execution. The Job will become ready when the execution is successfully completed. The sum of job name and token length must be fewer than 63 characters.",
  ).optional(),
  startExecutionToken: z.string().describe(
    "A unique string used as a suffix creating a new execution. The Job will become ready when the execution is successfully started. The sum of job name and token length must be fewer than 63 characters.",
  ).optional(),
  template: z.object({
    annotations: z.record(z.string(), z.string()).describe(
      "Unstructured key value map that may be set by external tools to store and arbitrary metadata. They are not queryable and should be preserved when modifying objects. Cloud Run API v2 does not support annotations with `run.googleapis.com`, `cloud.googleapis.com`, `serving.knative.dev`, or `autoscaling.knative.dev` namespaces, and they will be rejected. All system annotations in v1 now have a corresponding field in v2 ExecutionTemplate. This field follows Kubernetes annotations' namespacing, limits, and rules.",
    ).optional(),
    client: z.string().describe(
      "Optional. Arbitrary identifier for the API client.",
    ).optional(),
    clientVersion: z.string().describe(
      "Optional. Arbitrary version identifier for the API client.",
    ).optional(),
    labels: z.record(z.string(), z.string()).describe(
      "Unstructured key value map that can be used to organize and categorize objects. User-provided labels are shared with Google's billing system, so they can be used to filter, or break down billing charges by team, component, environment, state, etc. For more information, visit https://cloud.google.com/resource-manager/docs/creating-managing-labels or https://cloud.google.com/run/docs/configuring/labels. Cloud Run API v2 does not support labels with `run.googleapis.com`, `cloud.googleapis.com`, `serving.knative.dev`, or `autoscaling.knative.dev` namespaces, and they will be rejected. All system labels in v1 now have a corresponding field in v2 ExecutionTemplate.",
    ).optional(),
    parallelism: z.number().int().describe(
      "Optional. Specifies the maximum desired number of tasks the execution should run at given time. When the job is run, if this field is 0 or unset, the maximum possible value will be used for that execution. The actual number of tasks running in steady state will be less than this number when there are fewer tasks waiting to be completed remaining, i.e. when the work left to do is less than max parallelism.",
    ).optional(),
    taskCount: z.number().int().describe(
      "Specifies the desired number of tasks the execution should run. Setting to 1 means that parallelism is limited to 1 and the success of that task signals the success of the execution. Defaults to 1.",
    ).optional(),
    template: z.object({
      containers: z.array(z.object({
        args: z.array(z.unknown()).describe(
          "Arguments to the entrypoint. The docker image's CMD is used if this is not provided.",
        ).optional(),
        baseImageUri: z.string().describe(
          "Base image for this container. Only supported for services. If set, it indicates that the service is enrolled into automatic base image update.",
        ).optional(),
        buildInfo: z.object({
          functionTarget: z.unknown().describe(
            "Output only. Entry point of the function when the image is a Cloud Run function.",
          ).optional(),
          sourceLocation: z.unknown().describe(
            "Output only. Source code location of the image.",
          ).optional(),
        }).describe("Build information of the image.").optional(),
        command: z.array(z.unknown()).describe(
          "Entrypoint array. Not executed within a shell. The docker image's ENTRYPOINT is used if this is not provided.",
        ).optional(),
        dependsOn: z.array(z.unknown()).describe(
          "Names of the containers that must start before this container.",
        ).optional(),
        env: z.array(z.unknown()).describe(
          "List of environment variables to set in the container.",
        ).optional(),
        image: z.string().describe(
          "Required. Name of the container image in Dockerhub, Google Artifact Registry, or Google Container Registry. If the host is not provided, Dockerhub is assumed.",
        ).optional(),
        livenessProbe: z.object({
          failureThreshold: z.unknown().describe(
            "Optional. Minimum consecutive failures for the probe to be considered failed after having succeeded. Defaults to 3. Minimum value is 1.",
          ).optional(),
          grpc: z.unknown().describe(
            "GRPCAction describes an action involving a GRPC port.",
          ).optional(),
          httpGet: z.unknown().describe(
            "HTTPGetAction describes an action based on HTTP Get requests.",
          ).optional(),
          initialDelaySeconds: z.unknown().describe(
            "Optional. Number of seconds after the container has started before the probe is initiated. Defaults to 0 seconds. Minimum value is 0. Maximum value for liveness probe is 3600. Maximum value for startup probe is 240.",
          ).optional(),
          periodSeconds: z.unknown().describe(
            "Optional. How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1. Maximum value for liveness probe is 3600. Maximum value for startup probe is 240. Must be greater or equal than timeout_seconds.",
          ).optional(),
          tcpSocket: z.unknown().describe(
            "TCPSocketAction describes an action based on opening a socket",
          ).optional(),
          timeoutSeconds: z.unknown().describe(
            "Optional. Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1. Maximum value is 3600. Must be smaller than period_seconds.",
          ).optional(),
        }).describe(
          "Probe describes a health check to be performed against a container to determine whether it is alive or ready to receive traffic.",
        ).optional(),
        name: z.string().describe(
          "Name of the container specified as a DNS_LABEL (RFC 1123).",
        ).optional(),
        ports: z.array(z.unknown()).describe(
          "List of ports to expose from the container. Only a single port can be specified. The specified ports must be listening on all interfaces (0.0.0.0) within the container to be accessible. If omitted, a port number will be chosen and passed to the container through the PORT environment variable for the container to listen on.",
        ).optional(),
        readinessProbe: z.object({
          failureThreshold: z.unknown().describe(
            "Optional. Minimum consecutive failures for the probe to be considered failed after having succeeded. Defaults to 3. Minimum value is 1.",
          ).optional(),
          grpc: z.unknown().describe(
            "GRPCAction describes an action involving a GRPC port.",
          ).optional(),
          httpGet: z.unknown().describe(
            "HTTPGetAction describes an action based on HTTP Get requests.",
          ).optional(),
          initialDelaySeconds: z.unknown().describe(
            "Optional. Number of seconds after the container has started before the probe is initiated. Defaults to 0 seconds. Minimum value is 0. Maximum value for liveness probe is 3600. Maximum value for startup probe is 240.",
          ).optional(),
          periodSeconds: z.unknown().describe(
            "Optional. How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1. Maximum value for liveness probe is 3600. Maximum value for startup probe is 240. Must be greater or equal than timeout_seconds.",
          ).optional(),
          tcpSocket: z.unknown().describe(
            "TCPSocketAction describes an action based on opening a socket",
          ).optional(),
          timeoutSeconds: z.unknown().describe(
            "Optional. Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1. Maximum value is 3600. Must be smaller than period_seconds.",
          ).optional(),
        }).describe(
          "Probe describes a health check to be performed against a container to determine whether it is alive or ready to receive traffic.",
        ).optional(),
        resources: z.object({
          cpuIdle: z.unknown().describe(
            "Determines whether CPU is only allocated during requests (true by default). However, if ResourceRequirements is set, the caller must explicitly set this field to true to preserve the default behavior.",
          ).optional(),
          limits: z.unknown().describe(
            "Only `memory`, `cpu` and `nvidia.com/gpu` keys in the map are supported. Notes: * The only supported values for CPU are '1', '2', '4', and '8'. Setting 4 CPU requires at least 2Gi of memory. For more information, go to https://cloud.google.com/run/docs/configuring/cpu. * For supported 'memory' values and syntax, go to https://cloud.google.com/run/docs/configuring/memory-limits * The only supported 'nvidia.com/gpu' value is '1'.",
          ).optional(),
          startupCpuBoost: z.unknown().describe(
            "Determines whether CPU should be boosted on startup of a new container instance above the requested CPU threshold, this can help reduce cold-start latency.",
          ).optional(),
        }).describe(
          "ResourceRequirements describes the compute resource requirements.",
        ).optional(),
        sourceCode: z.object({
          cloudStorageSource: z.unknown().describe("Cloud Storage source.")
            .optional(),
          inlinedSource: z.unknown().describe("Inlined source.").optional(),
        }).describe("Source type for the container.").optional(),
        startupProbe: z.object({
          failureThreshold: z.unknown().describe(
            "Optional. Minimum consecutive failures for the probe to be considered failed after having succeeded. Defaults to 3. Minimum value is 1.",
          ).optional(),
          grpc: z.unknown().describe(
            "GRPCAction describes an action involving a GRPC port.",
          ).optional(),
          httpGet: z.unknown().describe(
            "HTTPGetAction describes an action based on HTTP Get requests.",
          ).optional(),
          initialDelaySeconds: z.unknown().describe(
            "Optional. Number of seconds after the container has started before the probe is initiated. Defaults to 0 seconds. Minimum value is 0. Maximum value for liveness probe is 3600. Maximum value for startup probe is 240.",
          ).optional(),
          periodSeconds: z.unknown().describe(
            "Optional. How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1. Maximum value for liveness probe is 3600. Maximum value for startup probe is 240. Must be greater or equal than timeout_seconds.",
          ).optional(),
          tcpSocket: z.unknown().describe(
            "TCPSocketAction describes an action based on opening a socket",
          ).optional(),
          timeoutSeconds: z.unknown().describe(
            "Optional. Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1. Maximum value is 3600. Must be smaller than period_seconds.",
          ).optional(),
        }).describe(
          "Probe describes a health check to be performed against a container to determine whether it is alive or ready to receive traffic.",
        ).optional(),
        volumeMounts: z.array(z.unknown()).describe(
          "Volume to mount into the container's filesystem.",
        ).optional(),
        workingDir: z.string().describe(
          "Container's working directory. If not specified, the container runtime's default will be used, which might be configured in the container image.",
        ).optional(),
      })).describe(
        "Holds the single container that defines the unit of execution for this task.",
      ).optional(),
      encryptionKey: z.string().describe(
        "A reference to a customer managed encryption key (CMEK) to use to encrypt this container image. For more information, go to https://cloud.google.com/run/docs/securing/using-cmek",
      ).optional(),
      executionEnvironment: z.enum([
        "EXECUTION_ENVIRONMENT_UNSPECIFIED",
        "EXECUTION_ENVIRONMENT_GEN1",
        "EXECUTION_ENVIRONMENT_GEN2",
      ]).describe(
        "Optional. The execution environment being used to host this Task.",
      ).optional(),
      gpuZonalRedundancyDisabled: z.boolean().describe(
        "Optional. True if GPU zonal redundancy is disabled on this task template.",
      ).optional(),
      maxRetries: z.number().int().describe(
        "Number of retries allowed per Task, before marking this Task failed. Defaults to 3.",
      ).optional(),
      nodeSelector: z.object({
        accelerator: z.string().describe(
          "Required. GPU accelerator type to attach to an instance.",
        ).optional(),
      }).describe("Hardware constraints configuration.").optional(),
      serviceAccount: z.string().describe(
        "Optional. Email address of the IAM service account associated with the Task of a Job. The service account represents the identity of the running task, and determines what permissions the task has. If not provided, the task will use the project's default service account.",
      ).optional(),
      timeout: z.string().describe(
        "Optional. Max allowed time duration the Task may be active before the system will actively try to mark it failed and kill associated containers. This applies per attempt of a task, meaning each retry can run for the full timeout. Defaults to 600 seconds.",
      ).optional(),
      volumes: z.array(z.object({
        cloudSqlInstance: z.object({
          instances: z.unknown().describe(
            "A list of Cloud SQL instance connection names. Cloud Run uses these to establish connections to the specified Cloud SQL instances. While the SQL instance name itself is unique within a project, the full connection name requires the location for proper routing. Format: `{project}:{location}:{instance}` Example: `my-project:us-central1:my-instance` You can find this value on the instance's **Overview** page in the Google Cloud console or by using the following `gcloud` command: ` sh gcloud sql instances describe INSTANCE_NAME \\ --format='value(connectionName)' ` Visit https://cloud.google.com/sql/docs/mysql/connect-run for more information on how to connect Cloud SQL and Cloud Run.",
          ).optional(),
        }).describe(
          "Represents a set of Cloud SQL instances. Each one will be available under /cloudsql/[instance]. Visit https://cloud.google.com/sql/docs/mysql/connect-run for more information on how to connect Cloud SQL and Cloud Run.",
        ).optional(),
        emptyDir: z.object({
          medium: z.unknown().describe(
            "The medium on which the data is stored. Acceptable values today is only MEMORY or none. When none, the default will currently be backed by memory but could change over time. +optional",
          ).optional(),
          sizeLimit: z.unknown().describe(
            "Limit on the storage usable by this EmptyDir volume. The size limit is also applicable for memory medium. The maximum usage on memory medium EmptyDir would be the minimum value between the SizeLimit specified here and the sum of memory limits of all containers. The default is nil which means that the limit is undefined. More info: https://cloud.google.com/run/docs/configuring/in-memory-volumes#configure-volume. Info in Kubernetes: https://kubernetes.io/docs/concepts/storage/volumes/#emptydir",
          ).optional(),
        }).describe(
          "In memory (tmpfs) ephemeral storage. It is ephemeral in the sense that when the sandbox is taken down, the data is destroyed with it (it does not persist across sandbox runs).",
        ).optional(),
        gcs: z.object({
          bucket: z.unknown().describe("Cloud Storage Bucket name.").optional(),
          mountOptions: z.unknown().describe(
            'A list of additional flags to pass to the gcsfuse CLI. Options should be specified without the leading "--".',
          ).optional(),
          readOnly: z.unknown().describe(
            "If true, the volume will be mounted as read only for all mounts.",
          ).optional(),
        }).describe(
          "Represents a volume backed by a Cloud Storage bucket using Cloud Storage FUSE.",
        ).optional(),
        name: z.string().describe("Required. Volume's name.").optional(),
        nfs: z.object({
          path: z.unknown().describe("Path that is exported by the NFS server.")
            .optional(),
          readOnly: z.unknown().describe(
            "If true, the volume will be mounted as read only for all mounts.",
          ).optional(),
          server: z.unknown().describe(
            "Hostname or IP address of the NFS server",
          ).optional(),
        }).describe("Represents an NFS mount.").optional(),
        secret: z.object({
          defaultMode: z.unknown().describe(
            "Integer representation of mode bits to use on created files by default. Must be a value between 0000 and 0777 (octal), defaulting to 0444. Directories within the path are not affected by this setting. Notes * Internally, a umask of 0222 will be applied to any non-zero value. * This is an integer representation of the mode bits. So, the octal integer value should look exactly as the chmod numeric notation with a leading zero. Some examples: for chmod 640 (u=rw,g=r), set to 0640 (octal) or 416 (base-10). For chmod 755 (u=rwx,g=rx,o=rx), set to 0755 (octal) or 493 (base-10). * This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set. This might be in conflict with other options that affect the file mode, like fsGroup, and as a result, other mode bits could be set.",
          ).optional(),
          items: z.unknown().describe(
            "If unspecified, the volume will expose a file whose name is the secret, relative to VolumeMount.mount_path + VolumeMount.sub_path. If specified, the key will be used as the version to fetch from Cloud Secret Manager and the path will be the name of the file exposed in the volume. When items are defined, they must specify a path and a version.",
          ).optional(),
          secret: z.unknown().describe(
            "Required. The name of the secret in Cloud Secret Manager. Format: {secret} if the secret is in the same project. projects/{project}/secrets/{secret} if the secret is in a different project.",
          ).optional(),
        }).describe(
          "The secret's value will be presented as the content of a file whose name is defined in the item path. If no items are defined, the name of the file is the secret.",
        ).optional(),
      })).describe(
        "Optional. A list of Volumes to make available to containers.",
      ).optional(),
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
          network: z.unknown().describe(
            "Optional. The VPC network that the Cloud Run resource will be able to send traffic to. At least one of network or subnetwork must be specified. If both network and subnetwork are specified, the given VPC subnetwork must belong to the given VPC network. If network is not specified, it will be looked up from the subnetwork.",
          ).optional(),
          subnetwork: z.unknown().describe(
            "Optional. The VPC subnetwork that the Cloud Run resource will get IPs from. At least one of network or subnetwork must be specified. If both network and subnetwork are specified, the given VPC subnetwork must belong to the given VPC network. If subnetwork is not specified, the subnetwork with the same name with the network will be used.",
          ).optional(),
          tags: z.unknown().describe(
            "Optional. Network tags applied to this Cloud Run resource.",
          ).optional(),
        })).describe(
          "Optional. Direct VPC egress settings. Currently only single network interface is supported.",
        ).optional(),
      }).describe(
        "VPC Access settings. For more information on sending traffic to a VPC network, visit https://cloud.google.com/run/docs/configuring/connecting-vpc.",
      ).optional(),
    }).describe(
      "TaskTemplate describes the data a task should have when created from a template.",
    ).optional(),
  }).describe(
    "ExecutionTemplate describes the data an execution should have when created from a template.",
  ).optional(),
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
  jobId: z.string().describe(
    "Optional. The unique identifier for the Job. The name of the job becomes {parent}/jobs/{job_id}. If not provided, the server will generate a unique `job_id`.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Run Admin Jobs. Registered at `@swamp/gcp/run/jobs`. */
export const model = {
  type: "@swamp/gcp/run/jobs",
  version: "2026.05.24.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Job represents the configuration of a single job, which references a containe...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a jobs",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
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
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["latestCreatedExecution"] !== undefined) {
          body["latestCreatedExecution"] = g["latestCreatedExecution"];
        }
        if (g["launchStage"] !== undefined) {
          body["launchStage"] = g["launchStage"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["runExecutionToken"] !== undefined) {
          body["runExecutionToken"] = g["runExecutionToken"];
        }
        if (g["startExecutionToken"] !== undefined) {
          body["startExecutionToken"] = g["startExecutionToken"];
        }
        if (g["template"] !== undefined) body["template"] = g["template"];
        if (g["terminalCondition"] !== undefined) {
          body["terminalCondition"] = g["terminalCondition"];
        }
        if (g["jobId"] !== undefined) body["jobId"] = g["jobId"];
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
      description: "Get a jobs",
      arguments: z.object({
        identifier: z.string().describe("The name of the jobs"),
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
      description: "Update jobs attributes",
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
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["latestCreatedExecution"] !== undefined) {
          body["latestCreatedExecution"] = g["latestCreatedExecution"];
        }
        if (g["launchStage"] !== undefined) {
          body["launchStage"] = g["launchStage"];
        }
        if (g["runExecutionToken"] !== undefined) {
          body["runExecutionToken"] = g["runExecutionToken"];
        }
        if (g["startExecutionToken"] !== undefined) {
          body["startExecutionToken"] = g["startExecutionToken"];
        }
        if (g["template"] !== undefined) body["template"] = g["template"];
        if (g["terminalCondition"] !== undefined) {
          body["terminalCondition"] = g["terminalCondition"];
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
      description: "Delete the jobs",
      arguments: z.object({
        identifier: z.string().describe("The name of the jobs"),
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
      description: "Sync jobs state from GCP",
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
    get_iam_policy: {
      description: "get iam policy",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        const result = await createResource(
          BASE_URL,
          {
            "id": "run.projects.locations.jobs.getIamPolicy",
            "path": "v2/{+resource}:getIamPolicy",
            "httpMethod": "GET",
            "parameterOrder": ["resource"],
            "parameters": {
              "options.requestedPolicyVersion": { "location": "query" },
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    run: {
      description: "run",
      arguments: z.object({
        etag: z.any().optional(),
        overrides: z.any().optional(),
        validateOnly: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["etag"] !== undefined) body["etag"] = args["etag"];
        if (args["overrides"] !== undefined) {
          body["overrides"] = args["overrides"];
        }
        if (args["validateOnly"] !== undefined) {
          body["validateOnly"] = args["validateOnly"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "run.projects.locations.jobs.run",
            "path": "v2/{+name}:run",
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
    set_iam_policy: {
      description: "set iam policy",
      arguments: z.object({
        policy: z.any().optional(),
        updateMask: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
          BASE_URL,
          {
            "id": "run.projects.locations.jobs.setIamPolicy",
            "path": "v2/{+resource}:setIamPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
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
        const projectId = await getProjectId();
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
            "id": "run.projects.locations.jobs.testIamPermissions",
            "path": "v2/{+resource}:testIamPermissions",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
