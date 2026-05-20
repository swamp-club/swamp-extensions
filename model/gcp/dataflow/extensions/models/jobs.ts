// Auto-generated extension model for @swamp/gcp/dataflow/jobs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Dataflow Jobs.
 *
 * Defines a job to be run by the Cloud Dataflow service. Do not enter confidential information when you supply string values using the API.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://dataflow.googleapis.com/";

const GET_CONFIG = {
  "id": "dataflow.projects.jobs.get",
  "path": "v1b3/projects/{projectId}/jobs/{jobId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "projectId",
    "jobId",
  ],
  "parameters": {
    "jobId": {
      "location": "path",
      "required": true,
    },
    "location": {
      "location": "query",
    },
    "projectId": {
      "location": "path",
      "required": true,
    },
    "view": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "dataflow.projects.jobs.create",
  "path": "v1b3/projects/{projectId}/jobs",
  "httpMethod": "POST",
  "parameterOrder": [
    "projectId",
  ],
  "parameters": {
    "location": {
      "location": "query",
    },
    "projectId": {
      "location": "path",
      "required": true,
    },
    "replaceJobId": {
      "location": "query",
    },
    "view": {
      "location": "query",
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "dataflow.projects.jobs.update",
  "path": "v1b3/projects/{projectId}/jobs/{jobId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "projectId",
    "jobId",
  ],
  "parameters": {
    "jobId": {
      "location": "path",
      "required": true,
    },
    "location": {
      "location": "query",
    },
    "projectId": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  clientRequestId: z.string().describe(
    "The client's unique identifier of the job, re-used across retried attempts. If this field is set, the service will ensure its uniqueness. The request to create a job will fail if the service has knowledge of a previously submitted job with the same client's ID and job name. The caller may use this field to ensure idempotence of job creation across retried attempts to create a job. By default, the field is empty and, in that case, the service ignores it.",
  ).optional(),
  createTime: z.string().describe(
    "The timestamp when the job was initially created. Immutable and set by the Cloud Dataflow service.",
  ).optional(),
  createdFromSnapshotId: z.string().describe(
    "If this is specified, the job's initial state is populated from the given snapshot.",
  ).optional(),
  currentState: z.enum([
    "JOB_STATE_UNKNOWN",
    "JOB_STATE_STOPPED",
    "JOB_STATE_RUNNING",
    "JOB_STATE_DONE",
    "JOB_STATE_FAILED",
    "JOB_STATE_CANCELLED",
    "JOB_STATE_UPDATED",
    "JOB_STATE_DRAINING",
    "JOB_STATE_DRAINED",
    "JOB_STATE_PENDING",
    "JOB_STATE_CANCELLING",
    "JOB_STATE_QUEUED",
    "JOB_STATE_RESOURCE_CLEANING_UP",
    "JOB_STATE_PAUSING",
    "JOB_STATE_PAUSED",
  ]).describe(
    "The current state of the job. Jobs are created in the `JOB_STATE_STOPPED` state unless otherwise specified. A job in the `JOB_STATE_RUNNING` state may asynchronously enter a terminal state. After a job has reached a terminal state, no further state updates may be made. This field might be mutated by the Dataflow service; callers cannot mutate it.",
  ).optional(),
  currentStateTime: z.string().describe(
    "The timestamp associated with the current state.",
  ).optional(),
  environment: z.object({
    clusterManagerApiService: z.string().describe(
      'The type of cluster manager API to use. If unknown or unspecified, the service will attempt to choose a reasonable default. This should be in the form of the API service name, e.g. "compute.googleapis.com".',
    ).optional(),
    dataset: z.string().describe(
      "Optional. The dataset for the current project where various workflow related tables are stored. The supported resource type is: Google BigQuery: bigquery.googleapis.com/{dataset}",
    ).optional(),
    debugOptions: z.object({
      dataSampling: z.object({
        behaviors: z.array(
          z.enum([
            "DATA_SAMPLING_BEHAVIOR_UNSPECIFIED",
            "DISABLED",
            "ALWAYS_ON",
            "EXCEPTIONS",
          ]),
        ).describe(
          "List of given sampling behaviors to enable. For example, specifying behaviors = [ALWAYS_ON] samples in-flight elements but does not sample exceptions. Can be used to specify multiple behaviors like, behaviors = [ALWAYS_ON, EXCEPTIONS] for specifying periodic sampling and exception sampling. If DISABLED is in the list, then sampling will be disabled and ignore the other given behaviors. Ordering does not matter.",
        ).optional(),
      }).describe("Configuration options for sampling elements.").optional(),
      enableHotKeyLogging: z.boolean().describe(
        "Optional. When true, enables the logging of the literal hot key to the user's Cloud Logging.",
      ).optional(),
    }).describe(
      "Describes any options that have an effect on the debugging of pipelines.",
    ).optional(),
    experiments: z.array(z.string()).describe(
      "The list of experiments to enable. This field should be used for SDK related experiments and not for service related experiments. The proper field for service related experiments is service_options.",
    ).optional(),
    flexResourceSchedulingGoal: z.enum([
      "FLEXRS_UNSPECIFIED",
      "FLEXRS_SPEED_OPTIMIZED",
      "FLEXRS_COST_OPTIMIZED",
    ]).describe("Optional. Which Flexible Resource Scheduling mode to run in.")
      .optional(),
    internalExperiments: z.record(z.string(), z.string()).describe(
      "Experimental settings.",
    ).optional(),
    sdkPipelineOptions: z.record(z.string(), z.string()).describe(
      "The Cloud Dataflow SDK pipeline options specified by the user. These options are passed through the service and are used to recreate the SDK pipeline options on the worker in a language agnostic and platform independent way.",
    ).optional(),
    serviceAccountEmail: z.string().describe(
      "Optional. Identity to run virtual machines as. Defaults to the default account.",
    ).optional(),
    serviceKmsKeyName: z.string().describe(
      "Optional. If set, contains the Cloud KMS key identifier used to encrypt data at rest, AKA a Customer Managed Encryption Key (CMEK). Format: projects/PROJECT_ID/locations/LOCATION/keyRings/KEY_RING/cryptoKeys/KEY",
    ).optional(),
    serviceOptions: z.array(z.string()).describe(
      "Optional. The list of service options to enable. This field should be used for service related experiments only. These experiments, when graduating to GA, should be replaced by dedicated fields or become default (i.e. always on).",
    ).optional(),
    shuffleMode: z.enum([
      "SHUFFLE_MODE_UNSPECIFIED",
      "VM_BASED",
      "SERVICE_BASED",
    ]).describe("Output only. The shuffle mode used for the job.").optional(),
    streamingMode: z.enum([
      "STREAMING_MODE_UNSPECIFIED",
      "STREAMING_MODE_EXACTLY_ONCE",
      "STREAMING_MODE_AT_LEAST_ONCE",
    ]).describe(
      "Optional. Specifies the Streaming Engine message processing guarantees. Reduces cost and latency but might result in duplicate messages committed to storage. Designed to run simple mapping streaming ETL jobs at the lowest cost. For example, Change Data Capture (CDC) to BigQuery is a canonical use case. For more information, see [Set the pipeline streaming mode](https://cloud.google.com/dataflow/docs/guides/streaming-modes).",
    ).optional(),
    tempStoragePrefix: z.string().describe(
      'The prefix of the resources the system should use for temporary storage. The system will append the suffix "/temp-{JOBNAME} to this resource prefix, where {JOBNAME} is the value of the job_name field. The resulting bucket and object prefix is used as the prefix of the resources used to store temporary data needed during the job execution. NOTE: This will override the value in taskrunner_settings. The supported resource type is: Google Cloud Storage: storage.googleapis.com/{bucket}/{object} bucket.storage.googleapis.com/{object}',
    ).optional(),
    usePublicIps: z.boolean().describe(
      "Optional. True when any worker pool that uses public IPs is present.",
    ).optional(),
    useStreamingEngineResourceBasedBilling: z.boolean().describe(
      "Output only. Whether the job uses the Streaming Engine resource-based billing model.",
    ).optional(),
    userAgent: z.record(z.string(), z.string()).describe(
      "Optional. A description of the process that generated the request.",
    ).optional(),
    version: z.record(z.string(), z.string()).describe(
      "A structure describing which components and their versions of the service are required in order to run the job.",
    ).optional(),
    workerPools: z.array(z.object({
      autoscalingSettings: z.object({
        algorithm: z.enum([
          "AUTOSCALING_ALGORITHM_UNKNOWN",
          "AUTOSCALING_ALGORITHM_NONE",
          "AUTOSCALING_ALGORITHM_BASIC",
        ]).describe("The algorithm to use for autoscaling.").optional(),
        maxNumWorkers: z.number().int().describe(
          "The maximum number of workers to cap scaling at.",
        ).optional(),
      }).describe("Settings for WorkerPool autoscaling.").optional(),
      dataDisks: z.array(z.object({
        diskType: z.unknown().describe(
          'Disk storage type, as defined by Google Compute Engine. This must be a disk type appropriate to the project and zone in which the workers will run. If unknown or unspecified, the service will attempt to choose a reasonable default. For example, the standard persistent disk type is a resource name typically ending in "pd-standard". If SSD persistent disks are available, the resource name typically ends with "pd-ssd". The actual valid values are defined the Google Compute Engine API, not by the Cloud Dataflow API; consult the Google Compute Engine documentation for more information about determining the set of available disk types for a particular project and zone. Google Compute Engine Disk types are local to a particular project in a particular zone, and so the resource name will typically look something like this: compute.googleapis.com/projects/project-id/zones/zone/diskTypes/pd-standard',
        ).optional(),
        mountPoint: z.unknown().describe(
          "Directory in a VM where disk is mounted.",
        ).optional(),
        sizeGb: z.unknown().describe(
          "Size of disk in GB. If zero or unspecified, the service will attempt to choose a reasonable default.",
        ).optional(),
      })).describe("Data disks that are used by a VM in this workflow.")
        .optional(),
      defaultPackageSet: z.enum([
        "DEFAULT_PACKAGE_SET_UNKNOWN",
        "DEFAULT_PACKAGE_SET_NONE",
        "DEFAULT_PACKAGE_SET_JAVA",
        "DEFAULT_PACKAGE_SET_PYTHON",
      ]).describe(
        "The default package set to install. This allows the service to select a default set of packages which are useful to worker harnesses written in a particular language.",
      ).optional(),
      diskProvisionedIops: z.string().describe(
        "Optional. IOPS provisioned for the root disk for VMs.",
      ).optional(),
      diskProvisionedThroughputMibps: z.string().describe(
        "Optional. Throughput provisioned for the root disk for VMs.",
      ).optional(),
      diskSizeGb: z.number().int().describe(
        "Size of root disk for VMs, in GB. If zero or unspecified, the service will attempt to choose a reasonable default.",
      ).optional(),
      diskSourceImage: z.string().describe(
        "Fully qualified source image for disks.",
      ).optional(),
      diskType: z.string().describe(
        "Type of root disk for VMs. If empty or unspecified, the service will attempt to choose a reasonable default.",
      ).optional(),
      ipConfiguration: z.enum([
        "WORKER_IP_UNSPECIFIED",
        "WORKER_IP_PUBLIC",
        "WORKER_IP_PRIVATE",
      ]).describe("Configuration for VM IPs.").optional(),
      kind: z.string().describe(
        "The kind of the worker pool; currently only `harness` and `shuffle` are supported.",
      ).optional(),
      machineType: z.string().describe(
        'Machine type (e.g. "n1-standard-1"). If empty or unspecified, the service will attempt to choose a reasonable default.',
      ).optional(),
      metadata: z.record(z.string(), z.string()).describe(
        "Metadata to set on the Google Compute Engine VMs.",
      ).optional(),
      network: z.string().describe(
        'Network to which VMs will be assigned. If empty or unspecified, the service will use the network "default".',
      ).optional(),
      numThreadsPerWorker: z.number().int().describe(
        "The number of threads per worker harness. If empty or unspecified, the service will choose a number of threads (according to the number of cores on the selected machine type for batch, or 1 by convention for streaming).",
      ).optional(),
      numWorkers: z.number().int().describe(
        "Number of Google Compute Engine workers in this pool needed to execute the job. If zero or unspecified, the service will attempt to choose a reasonable default.",
      ).optional(),
      onHostMaintenance: z.string().describe(
        "The action to take on host maintenance, as defined by the Google Compute Engine API.",
      ).optional(),
      packages: z.array(z.object({
        location: z.unknown().describe(
          "The resource to read the package from. The supported resource type is: Google Cloud Storage: storage.googleapis.com/{bucket} bucket.storage.googleapis.com/",
        ).optional(),
        name: z.unknown().describe("The name of the package.").optional(),
        sha256: z.unknown().describe(
          "Optional. The hex-encoded SHA256 checksum of the package. If the checksum is provided, the worker will verify the checksum of the package before using it. If the checksum does not match, the worker will fail to start.",
        ).optional(),
      })).describe("Packages to be installed on workers.").optional(),
      poolArgs: z.record(z.string(), z.string()).describe(
        "Extra arguments for this worker pool.",
      ).optional(),
      sdkHarnessContainerImages: z.array(z.object({
        capabilities: z.unknown().describe(
          "The set of capabilities enumerated in the above Environment proto. See also [beam_runner_api.proto](https://github.com/apache/beam/blob/master/model/pipeline/src/main/proto/org/apache/beam/model/pipeline/v1/beam_runner_api.proto)",
        ).optional(),
        containerImage: z.unknown().describe(
          "A docker container image that resides in Google Container Registry.",
        ).optional(),
        environmentId: z.unknown().describe(
          "Environment ID for the Beam runner API proto Environment that corresponds to the current SDK Harness.",
        ).optional(),
        useSingleCorePerContainer: z.unknown().describe(
          "If true, recommends the Dataflow service to use only one core per SDK container instance with this image. If false (or unset) recommends using more than one core per SDK container instance with this image for efficiency. Note that Dataflow service may choose to override this property if needed.",
        ).optional(),
      })).describe(
        "Set of SDK harness containers needed to execute this pipeline. This will only be set in the Fn API path. For non-cross-language pipelines this should have only one entry. Cross-language pipelines will have two or more entries.",
      ).optional(),
      subnetwork: z.string().describe(
        'Subnetwork to which VMs will be assigned, if desired. Expected to be of the form "regions/REGION/subnetworks/SUBNETWORK".',
      ).optional(),
      taskrunnerSettings: z.object({
        alsologtostderr: z.boolean().describe(
          "Whether to also send taskrunner log info to stderr.",
        ).optional(),
        baseTaskDir: z.string().describe(
          "The location on the worker for task-specific subdirectories.",
        ).optional(),
        baseUrl: z.string().describe(
          'The base URL for the taskrunner to use when accessing Google Cloud APIs. When workers access Google Cloud APIs, they logically do so via relative URLs. If this field is specified, it supplies the base URL to use for resolving these relative URLs. The normative algorithm used is defined by RFC 1808, "Relative Uniform Resource Locators". If not specified, the default value is "http://www.googleapis.com/"',
        ).optional(),
        commandlinesFileName: z.string().describe(
          "The file to store preprocessing commands in.",
        ).optional(),
        continueOnException: z.boolean().describe(
          "Whether to continue taskrunner if an exception is hit.",
        ).optional(),
        dataflowApiVersion: z.string().describe(
          'The API version of endpoint, e.g. "v1b3"',
        ).optional(),
        harnessCommand: z.string().describe(
          "The command to launch the worker harness.",
        ).optional(),
        languageHint: z.string().describe("The suggested backend language.")
          .optional(),
        logDir: z.string().describe("The directory on the VM to store logs.")
          .optional(),
        logToSerialconsole: z.boolean().describe(
          "Whether to send taskrunner log info to Google Compute Engine VM serial console.",
        ).optional(),
        logUploadLocation: z.string().describe(
          "Indicates where to put logs. If this is not specified, the logs will not be uploaded. The supported resource type is: Google Cloud Storage: storage.googleapis.com/{bucket}/{object} bucket.storage.googleapis.com/{object}",
        ).optional(),
        oauthScopes: z.array(z.unknown()).describe(
          "The OAuth2 scopes to be requested by the taskrunner in order to access the Cloud Dataflow API.",
        ).optional(),
        parallelWorkerSettings: z.object({
          baseUrl: z.unknown().describe(
            'The base URL for accessing Google Cloud APIs. When workers access Google Cloud APIs, they logically do so via relative URLs. If this field is specified, it supplies the base URL to use for resolving these relative URLs. The normative algorithm used is defined by RFC 1808, "Relative Uniform Resource Locators". If not specified, the default value is "http://www.googleapis.com/"',
          ).optional(),
          reportingEnabled: z.unknown().describe(
            "Whether to send work progress updates to the service.",
          ).optional(),
          servicePath: z.unknown().describe(
            'The Cloud Dataflow service path relative to the root URL, for example, "dataflow/v1b3/projects".',
          ).optional(),
          shuffleServicePath: z.unknown().describe(
            'The Shuffle service path relative to the root URL, for example, "shuffle/v1beta1".',
          ).optional(),
          tempStoragePrefix: z.unknown().describe(
            "The prefix of the resources the system should use for temporary storage. The supported resource type is: Google Cloud Storage: storage.googleapis.com/{bucket}/{object} bucket.storage.googleapis.com/{object}",
          ).optional(),
          workerId: z.unknown().describe(
            "The ID of the worker running this pipeline.",
          ).optional(),
        }).describe("Provides data to pass through to the worker harness.")
          .optional(),
        streamingWorkerMainClass: z.string().describe(
          "The streaming worker main class name.",
        ).optional(),
        taskGroup: z.string().describe(
          'The UNIX group ID on the worker VM to use for tasks launched by taskrunner; e.g. "wheel".',
        ).optional(),
        taskUser: z.string().describe(
          'The UNIX user ID on the worker VM to use for tasks launched by taskrunner; e.g. "root".',
        ).optional(),
        tempStoragePrefix: z.string().describe(
          "The prefix of the resources the taskrunner should use for temporary storage. The supported resource type is: Google Cloud Storage: storage.googleapis.com/{bucket}/{object} bucket.storage.googleapis.com/{object}",
        ).optional(),
        vmId: z.string().describe("The ID string of the VM.").optional(),
        workflowFileName: z.string().describe(
          "The file to store the workflow in.",
        ).optional(),
      }).describe("Taskrunner configuration settings.").optional(),
      teardownPolicy: z.enum([
        "TEARDOWN_POLICY_UNKNOWN",
        "TEARDOWN_ALWAYS",
        "TEARDOWN_ON_SUCCESS",
        "TEARDOWN_NEVER",
      ]).describe(
        "Sets the policy for determining when to turndown worker pool. Allowed values are: `TEARDOWN_ALWAYS`, `TEARDOWN_ON_SUCCESS`, and `TEARDOWN_NEVER`. `TEARDOWN_ALWAYS` means workers are always torn down regardless of whether the job succeeds. `TEARDOWN_ON_SUCCESS` means workers are torn down if the job succeeds. `TEARDOWN_NEVER` means the workers are never torn down. If the workers are not torn down by the service, they will continue to run and use Google Compute Engine VM resources in the user's project until they are explicitly terminated by the user. Because of this, Google recommends using the `TEARDOWN_ALWAYS` policy except for small, manually supervised test jobs. If unknown or unspecified, the service will attempt to choose a reasonable default.",
      ).optional(),
      workerHarnessContainerImage: z.string().describe(
        "Required. Docker container image that executes the Cloud Dataflow worker harness, residing in Google Container Registry. Deprecated for the Fn API path. Use sdk_harness_container_images instead.",
      ).optional(),
      zone: z.string().describe(
        "Zone to run the worker pools in. If empty or unspecified, the service will attempt to choose a reasonable default.",
      ).optional(),
    })).describe(
      'The worker pools. At least one "harness" worker pool must be specified in order for the job to have workers.',
    ).optional(),
    workerRegion: z.string().describe(
      'Optional. The Compute Engine region (https://cloud.google.com/compute/docs/regions-zones/regions-zones) in which worker processing should occur, e.g. "us-west1". Mutually exclusive with worker_zone. If neither worker_region nor worker_zone is specified, default to the control plane\'s region.',
    ).optional(),
    workerZone: z.string().describe(
      'Optional. The Compute Engine zone (https://cloud.google.com/compute/docs/regions-zones/regions-zones) in which worker processing should occur, e.g. "us-west1-a". Mutually exclusive with worker_region. If neither worker_region nor worker_zone is specified, a zone in the control plane\'s region is chosen based on available capacity.',
    ).optional(),
  }).describe("Describes the environment in which a Dataflow Job runs.")
    .optional(),
  executionInfo: z.object({
    stages: z.record(
      z.string(),
      z.object({
        stepName: z.array(z.string()).describe(
          "The steps associated with the execution stage. Note that stages may have several steps, and that a given step might be run by more than one stage.",
        ).optional(),
      }),
    ).describe("A mapping from each stage to the information about that stage.")
      .optional(),
  }).describe(
    "Additional information about how a Cloud Dataflow job will be executed that isn't contained in the submitted job.",
  ).optional(),
  id: z.string().describe(
    "The unique ID of this job. This field is set by the Dataflow service when the job is created, and is immutable for the life of the job.",
  ).optional(),
  jobMetadata: z.object({
    bigTableDetails: z.array(z.object({
      instanceId: z.string().describe("InstanceId accessed in the connection.")
        .optional(),
      projectId: z.string().describe("ProjectId accessed in the connection.")
        .optional(),
      tableId: z.string().describe("TableId accessed in the connection.")
        .optional(),
    })).describe(
      "Identification of a Cloud Bigtable source used in the Dataflow job.",
    ).optional(),
    bigqueryDetails: z.array(z.object({
      dataset: z.string().describe("Dataset accessed in the connection.")
        .optional(),
      projectId: z.string().describe("Project accessed in the connection.")
        .optional(),
      query: z.string().describe("Query used to access data in the connection.")
        .optional(),
      table: z.string().describe("Table accessed in the connection.")
        .optional(),
    })).describe(
      "Identification of a BigQuery source used in the Dataflow job.",
    ).optional(),
    datastoreDetails: z.array(z.object({
      namespace: z.string().describe("Namespace used in the connection.")
        .optional(),
      projectId: z.string().describe("ProjectId accessed in the connection.")
        .optional(),
    })).describe(
      "Identification of a Datastore source used in the Dataflow job.",
    ).optional(),
    fileDetails: z.array(z.object({
      filePattern: z.string().describe(
        "File Pattern used to access files by the connector.",
      ).optional(),
    })).describe("Identification of a File source used in the Dataflow job.")
      .optional(),
    pubsubDetails: z.array(z.object({
      subscription: z.string().describe("Subscription used in the connection.")
        .optional(),
      topic: z.string().describe("Topic accessed in the connection.")
        .optional(),
    })).describe("Identification of a Pub/Sub source used in the Dataflow job.")
      .optional(),
    sdkVersion: z.object({
      bugs: z.array(z.object({
        severity: z.enum([
          "SEVERITY_UNSPECIFIED",
          "NOTICE",
          "WARNING",
          "SEVERE",
        ]).describe("Output only. How severe the SDK bug is.").optional(),
        type: z.enum(["TYPE_UNSPECIFIED", "GENERAL", "PERFORMANCE", "DATALOSS"])
          .describe("Output only. Describes the impact of this SDK bug.")
          .optional(),
        uri: z.string().describe(
          "Output only. Link to more information on the bug.",
        ).optional(),
      })).describe("Output only. Known bugs found in this SDK version.")
        .optional(),
      sdkSupportStatus: z.enum([
        "UNKNOWN",
        "SUPPORTED",
        "STALE",
        "DEPRECATED",
        "UNSUPPORTED",
      ]).describe("The support status for this SDK version.").optional(),
      version: z.string().describe(
        "The version of the SDK used to run the job.",
      ).optional(),
      versionDisplayName: z.string().describe(
        "A readable string describing the version of the SDK.",
      ).optional(),
    }).describe("The version of the SDK used to run the job.").optional(),
    spannerDetails: z.array(z.object({
      databaseId: z.string().describe("DatabaseId accessed in the connection.")
        .optional(),
      instanceId: z.string().describe("InstanceId accessed in the connection.")
        .optional(),
      projectId: z.string().describe("ProjectId accessed in the connection.")
        .optional(),
    })).describe("Identification of a Spanner source used in the Dataflow job.")
      .optional(),
    userDisplayProperties: z.record(z.string(), z.string()).describe(
      "List of display properties to help UI filter jobs.",
    ).optional(),
  }).describe(
    "Metadata available primarily for filtering jobs. Will be included in the ListJob response and Job SUMMARY view.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "User-defined labels for this job. The labels map can contain no more than 64 entries. Entries of the labels map are UTF8 strings that comply with the following restrictions: * Keys must conform to regexp: \\p{Ll}\\p{Lo}{0,62} * Values must conform to regexp: [\\p{Ll}\\p{Lo}\\p{N}_-]{0,63} * Both keys and values are additionally constrained to be <= 128 bytes in size.",
  ).optional(),
  location: z.string().describe(
    "Optional. The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that contains this job.",
  ).optional(),
  name: z.string().describe(
    "Optional. The user-specified Dataflow job name. Only one active job with a given name can exist in a project within one region at any given time. Jobs in different regions can have the same name. If a caller attempts to create a job with the same name as an active job that already exists, the attempt returns the existing job. The name must match the regular expression `[a-z]([-a-z0-9]{0,1022}[a-z0-9])?`",
  ).optional(),
  pipelineDescription: z.object({
    displayData: z.array(z.object({
      boolValue: z.boolean().describe(
        "Contains value if the data is of a boolean type.",
      ).optional(),
      durationValue: z.string().describe(
        "Contains value if the data is of duration type.",
      ).optional(),
      floatValue: z.number().describe(
        "Contains value if the data is of float type.",
      ).optional(),
      int64Value: z.string().describe(
        "Contains value if the data is of int64 type.",
      ).optional(),
      javaClassValue: z.string().describe(
        "Contains value if the data is of java class type.",
      ).optional(),
      key: z.string().describe(
        "The key identifying the display data. This is intended to be used as a label for the display data when viewed in a dax monitoring system.",
      ).optional(),
      label: z.string().describe(
        "An optional label to display in a dax UI for the element.",
      ).optional(),
      namespace: z.string().describe(
        "The namespace for the key. This is usually a class name or programming language namespace (i.e. python module) which defines the display data. This allows a dax monitoring system to specially handle the data and perform custom rendering.",
      ).optional(),
      shortStrValue: z.string().describe(
        "A possible additional shorter value to display. For example a java_class_name_value of com.mypackage.MyDoFn will be stored with MyDoFn as the short_str_value and com.mypackage.MyDoFn as the java_class_name value. short_str_value can be displayed and java_class_name_value will be displayed as a tooltip.",
      ).optional(),
      strValue: z.string().describe(
        "Contains value if the data is of string type.",
      ).optional(),
      timestampValue: z.string().describe(
        "Contains value if the data is of timestamp type.",
      ).optional(),
      url: z.string().describe("An optional full URL.").optional(),
    })).describe("Pipeline level display data.").optional(),
    executionPipelineStage: z.array(z.object({
      componentSource: z.array(z.object({
        name: z.unknown().describe(
          "Dataflow service generated name for this source.",
        ).optional(),
        originalTransformOrCollection: z.unknown().describe(
          "User name for the original user transform or collection with which this source is most closely associated.",
        ).optional(),
        userName: z.unknown().describe(
          "Human-readable name for this transform; may be user or system generated.",
        ).optional(),
      })).describe(
        "Collections produced and consumed by component transforms of this stage.",
      ).optional(),
      componentTransform: z.array(z.object({
        name: z.unknown().describe(
          "Dataflow service generated name for this source.",
        ).optional(),
        originalTransform: z.unknown().describe(
          "User name for the original user transform with which this transform is most closely associated.",
        ).optional(),
        userName: z.unknown().describe(
          "Human-readable name for this transform; may be user or system generated.",
        ).optional(),
      })).describe("Transforms that comprise this execution stage.").optional(),
      id: z.string().describe("Dataflow service generated id for this stage.")
        .optional(),
      inputSource: z.array(z.object({
        name: z.unknown().describe(
          "Dataflow service generated name for this source.",
        ).optional(),
        originalTransformOrCollection: z.unknown().describe(
          "User name for the original user transform or collection with which this source is most closely associated.",
        ).optional(),
        sizeBytes: z.unknown().describe("Size of the source, if measurable.")
          .optional(),
        userName: z.unknown().describe(
          "Human-readable name for this source; may be user or system generated.",
        ).optional(),
      })).describe("Input sources for this stage.").optional(),
      kind: z.enum([
        "UNKNOWN_KIND",
        "PAR_DO_KIND",
        "GROUP_BY_KEY_KIND",
        "FLATTEN_KIND",
        "READ_KIND",
        "WRITE_KIND",
        "CONSTANT_KIND",
        "SINGLETON_KIND",
        "SHUFFLE_KIND",
      ]).describe("Type of transform this stage is executing.").optional(),
      name: z.string().describe(
        "Dataflow service generated name for this stage.",
      ).optional(),
      outputSource: z.array(z.object({
        name: z.unknown().describe(
          "Dataflow service generated name for this source.",
        ).optional(),
        originalTransformOrCollection: z.unknown().describe(
          "User name for the original user transform or collection with which this source is most closely associated.",
        ).optional(),
        sizeBytes: z.unknown().describe("Size of the source, if measurable.")
          .optional(),
        userName: z.unknown().describe(
          "Human-readable name for this source; may be user or system generated.",
        ).optional(),
      })).describe("Output sources for this stage.").optional(),
      prerequisiteStage: z.array(z.string()).describe(
        "Other stages that must complete before this stage can run.",
      ).optional(),
    })).describe("Description of each stage of execution of the pipeline.")
      .optional(),
    originalPipelineTransform: z.array(z.object({
      displayData: z.array(z.object({
        boolValue: z.unknown().describe(
          "Contains value if the data is of a boolean type.",
        ).optional(),
        durationValue: z.unknown().describe(
          "Contains value if the data is of duration type.",
        ).optional(),
        floatValue: z.unknown().describe(
          "Contains value if the data is of float type.",
        ).optional(),
        int64Value: z.unknown().describe(
          "Contains value if the data is of int64 type.",
        ).optional(),
        javaClassValue: z.unknown().describe(
          "Contains value if the data is of java class type.",
        ).optional(),
        key: z.unknown().describe(
          "The key identifying the display data. This is intended to be used as a label for the display data when viewed in a dax monitoring system.",
        ).optional(),
        label: z.unknown().describe(
          "An optional label to display in a dax UI for the element.",
        ).optional(),
        namespace: z.unknown().describe(
          "The namespace for the key. This is usually a class name or programming language namespace (i.e. python module) which defines the display data. This allows a dax monitoring system to specially handle the data and perform custom rendering.",
        ).optional(),
        shortStrValue: z.unknown().describe(
          "A possible additional shorter value to display. For example a java_class_name_value of com.mypackage.MyDoFn will be stored with MyDoFn as the short_str_value and com.mypackage.MyDoFn as the java_class_name value. short_str_value can be displayed and java_class_name_value will be displayed as a tooltip.",
        ).optional(),
        strValue: z.unknown().describe(
          "Contains value if the data is of string type.",
        ).optional(),
        timestampValue: z.unknown().describe(
          "Contains value if the data is of timestamp type.",
        ).optional(),
        url: z.unknown().describe("An optional full URL.").optional(),
      })).describe("Transform-specific display data.").optional(),
      id: z.string().describe("SDK generated id of this transform instance.")
        .optional(),
      inputCollectionName: z.array(z.string()).describe(
        "User names for all collection inputs to this transform.",
      ).optional(),
      kind: z.enum([
        "UNKNOWN_KIND",
        "PAR_DO_KIND",
        "GROUP_BY_KEY_KIND",
        "FLATTEN_KIND",
        "READ_KIND",
        "WRITE_KIND",
        "CONSTANT_KIND",
        "SINGLETON_KIND",
        "SHUFFLE_KIND",
      ]).describe("Type of transform.").optional(),
      name: z.string().describe(
        "User provided name for this transform instance.",
      ).optional(),
      outputCollectionName: z.array(z.string()).describe(
        "User names for all collection outputs to this transform.",
      ).optional(),
    })).describe(
      "Description of each transform in the pipeline and collections between them.",
    ).optional(),
    stepNamesHash: z.string().describe(
      "A hash value of the submitted pipeline portable graph step names if exists.",
    ).optional(),
  }).describe(
    "A descriptive representation of submitted pipeline as well as the executed form. This data is provided by the Dataflow service for ease of visualizing the pipeline and interpreting Dataflow provided metrics.",
  ).optional(),
  projectId: z.string().describe(
    "The ID of the Google Cloud project that the job belongs to.",
  ).optional(),
  replaceJobId: z.string().describe(
    "If this job is an update of an existing job, this field is the job ID of the job it replaced. When sending a `CreateJobRequest`, you can update a job by specifying it here. The job named here is stopped, and its intermediate state is transferred to this job.",
  ).optional(),
  replacedByJobId: z.string().describe(
    "If another job is an update of this job (and thus, this job is in `JOB_STATE_UPDATED`), this field contains the ID of that job.",
  ).optional(),
  requestedState: z.enum([
    "JOB_STATE_UNKNOWN",
    "JOB_STATE_STOPPED",
    "JOB_STATE_RUNNING",
    "JOB_STATE_DONE",
    "JOB_STATE_FAILED",
    "JOB_STATE_CANCELLED",
    "JOB_STATE_UPDATED",
    "JOB_STATE_DRAINING",
    "JOB_STATE_DRAINED",
    "JOB_STATE_PENDING",
    "JOB_STATE_CANCELLING",
    "JOB_STATE_QUEUED",
    "JOB_STATE_RESOURCE_CLEANING_UP",
    "JOB_STATE_PAUSING",
    "JOB_STATE_PAUSED",
  ]).describe(
    "The job's requested state. Applies to `UpdateJob` requests. Set `requested_state` with `UpdateJob` requests to switch between the states `JOB_STATE_STOPPED` and `JOB_STATE_RUNNING`. You can also use `UpdateJob` requests to change a job's state from `JOB_STATE_RUNNING` to `JOB_STATE_CANCELLED`, `JOB_STATE_DONE`, or `JOB_STATE_DRAINED`. These states irrevocably terminate the job if it hasn't already reached a terminal state. This field has no effect on `CreateJob` requests.",
  ).optional(),
  runtimeUpdatableParams: z.object({
    acceptableBacklogDuration: z.string().describe(
      "Optional. Deprecated: Use `latency_tier` instead. The backlog threshold duration in seconds for autoscaling. Value must be non-negative.",
    ).optional(),
    autoscalingTier: z.string().describe(
      'Optional. Deprecated: Use `latency_tier` instead. The backlog threshold tier for autoscaling. Value must be one of "low-latency", "medium-latency", or "high-latency".',
    ).optional(),
    latencyTier: z.string().describe(
      'Optional. The backlog threshold tier for autoscaling. Value must be one of "low-latency", "medium-latency", or "high-latency".',
    ).optional(),
    maxNumWorkers: z.number().int().describe(
      "The maximum number of workers to cap autoscaling at. This field is currently only supported for Streaming Engine jobs.",
    ).optional(),
    minNumWorkers: z.number().int().describe(
      "The minimum number of workers to scale down to. This field is currently only supported for Streaming Engine jobs.",
    ).optional(),
    workerUtilizationHint: z.number().describe(
      "Target worker utilization, compared against the aggregate utilization of the worker pool by autoscaler, to determine upscaling and downscaling when absent other constraints such as backlog. For more information, see [Update an existing pipeline](https://cloud.google.com/dataflow/docs/guides/updating-a-pipeline).",
    ).optional(),
  }).describe(
    "Additional job parameters that can only be updated during runtime using the projects.jobs.update method. These fields have no effect when specified during job creation.",
  ).optional(),
  satisfiesPzs: z.boolean().describe(
    "Reserved for future use. This field is set only in responses from the server; it is ignored if it is set in any requests.",
  ).optional(),
  serviceResources: z.object({
    zones: z.array(z.string()).describe(
      "Output only. List of Cloud Zones being used by the Dataflow Service for this job. Example: us-central1-c",
    ).optional(),
  }).describe("Resources used by the Dataflow Service to run the job.")
    .optional(),
  stageStates: z.array(z.object({
    currentStateTime: z.string().describe(
      "The time at which the stage transitioned to this state.",
    ).optional(),
    executionStageName: z.string().describe("The name of the execution stage.")
      .optional(),
    executionStageState: z.enum([
      "JOB_STATE_UNKNOWN",
      "JOB_STATE_STOPPED",
      "JOB_STATE_RUNNING",
      "JOB_STATE_DONE",
      "JOB_STATE_FAILED",
      "JOB_STATE_CANCELLED",
      "JOB_STATE_UPDATED",
      "JOB_STATE_DRAINING",
      "JOB_STATE_DRAINED",
      "JOB_STATE_PENDING",
      "JOB_STATE_CANCELLING",
      "JOB_STATE_QUEUED",
      "JOB_STATE_RESOURCE_CLEANING_UP",
      "JOB_STATE_PAUSING",
      "JOB_STATE_PAUSED",
    ]).describe(
      "Executions stage states allow the same set of values as JobState.",
    ).optional(),
  })).describe(
    "This field may be mutated by the Cloud Dataflow service; callers cannot mutate it.",
  ).optional(),
  startTime: z.string().describe(
    "The timestamp when the job was started (transitioned to JOB_STATE_PENDING). Flexible resource scheduling jobs are started with some delay after job creation, so start_time is unset before start and is updated when the job is started by the Cloud Dataflow service. For other jobs, start_time always equals to create_time and is immutable and set by the Cloud Dataflow service.",
  ).optional(),
  steps: z.array(z.object({
    kind: z.string().describe("The kind of step in the Cloud Dataflow job.")
      .optional(),
    name: z.string().describe(
      "The name that identifies the step. This must be unique for each step with respect to all other steps in the Cloud Dataflow job.",
    ).optional(),
    properties: z.record(z.string(), z.string()).describe(
      "Named properties associated with the step. Each kind of predefined step has its own required set of properties. Must be provided on Create. Only retrieved with JOB_VIEW_ALL.",
    ).optional(),
  })).describe(
    "Exactly one of step or steps_location should be specified. The top-level steps that constitute the entire job. Only retrieved with JOB_VIEW_ALL.",
  ).optional(),
  stepsLocation: z.string().describe(
    "The Cloud Storage location where the steps are stored.",
  ).optional(),
  tempFiles: z.array(z.string()).describe(
    "A set of files the system should be aware of that are used for temporary storage. These temporary files will be removed on job completion. No duplicates are allowed. No file patterns are supported. The supported files are: Google Cloud Storage: storage.googleapis.com/{bucket}/{object} bucket.storage.googleapis.com/{object}",
  ).optional(),
  transformNameMapping: z.record(z.string(), z.string()).describe(
    "Optional. The map of transform name prefixes of the job to be replaced to the corresponding name prefixes of the new job.",
  ).optional(),
  type: z.enum(["JOB_TYPE_UNKNOWN", "JOB_TYPE_BATCH", "JOB_TYPE_STREAMING"])
    .describe("Optional. The type of Dataflow job.").optional(),
  view: z.string().describe("The level of information requested in response.")
    .optional(),
});

const StateSchema = z.object({
  clientRequestId: z.string().optional(),
  createTime: z.string().optional(),
  createdFromSnapshotId: z.string().optional(),
  currentState: z.string().optional(),
  currentStateTime: z.string().optional(),
  environment: z.object({
    clusterManagerApiService: z.string(),
    dataset: z.string(),
    debugOptions: z.object({
      dataSampling: z.object({
        behaviors: z.array(z.string()),
      }),
      enableHotKeyLogging: z.boolean(),
    }),
    experiments: z.array(z.string()),
    flexResourceSchedulingGoal: z.string(),
    internalExperiments: z.record(z.string(), z.unknown()),
    sdkPipelineOptions: z.record(z.string(), z.unknown()),
    serviceAccountEmail: z.string(),
    serviceKmsKeyName: z.string(),
    serviceOptions: z.array(z.string()),
    shuffleMode: z.string(),
    streamingMode: z.string(),
    tempStoragePrefix: z.string(),
    usePublicIps: z.boolean(),
    useStreamingEngineResourceBasedBilling: z.boolean(),
    userAgent: z.record(z.string(), z.unknown()),
    version: z.record(z.string(), z.unknown()),
    workerPools: z.array(z.object({
      autoscalingSettings: z.object({
        algorithm: z.string(),
        maxNumWorkers: z.number(),
      }),
      dataDisks: z.array(z.object({
        diskType: z.unknown(),
        mountPoint: z.unknown(),
        sizeGb: z.unknown(),
      })),
      defaultPackageSet: z.string(),
      diskProvisionedIops: z.string(),
      diskProvisionedThroughputMibps: z.string(),
      diskSizeGb: z.number(),
      diskSourceImage: z.string(),
      diskType: z.string(),
      ipConfiguration: z.string(),
      kind: z.string(),
      machineType: z.string(),
      metadata: z.record(z.string(), z.unknown()),
      network: z.string(),
      numThreadsPerWorker: z.number(),
      numWorkers: z.number(),
      onHostMaintenance: z.string(),
      packages: z.array(z.object({
        location: z.unknown(),
        name: z.unknown(),
        sha256: z.unknown(),
      })),
      poolArgs: z.record(z.string(), z.unknown()),
      sdkHarnessContainerImages: z.array(z.object({
        capabilities: z.unknown(),
        containerImage: z.unknown(),
        environmentId: z.unknown(),
        useSingleCorePerContainer: z.unknown(),
      })),
      subnetwork: z.string(),
      taskrunnerSettings: z.object({
        alsologtostderr: z.boolean(),
        baseTaskDir: z.string(),
        baseUrl: z.string(),
        commandlinesFileName: z.string(),
        continueOnException: z.boolean(),
        dataflowApiVersion: z.string(),
        harnessCommand: z.string(),
        languageHint: z.string(),
        logDir: z.string(),
        logToSerialconsole: z.boolean(),
        logUploadLocation: z.string(),
        oauthScopes: z.array(z.unknown()),
        parallelWorkerSettings: z.object({
          baseUrl: z.unknown(),
          reportingEnabled: z.unknown(),
          servicePath: z.unknown(),
          shuffleServicePath: z.unknown(),
          tempStoragePrefix: z.unknown(),
          workerId: z.unknown(),
        }),
        streamingWorkerMainClass: z.string(),
        taskGroup: z.string(),
        taskUser: z.string(),
        tempStoragePrefix: z.string(),
        vmId: z.string(),
        workflowFileName: z.string(),
      }),
      teardownPolicy: z.string(),
      workerHarnessContainerImage: z.string(),
      zone: z.string(),
    })),
    workerRegion: z.string(),
    workerZone: z.string(),
  }).optional(),
  executionInfo: z.object({
    stages: z.record(z.string(), z.unknown()),
  }).optional(),
  id: z.string().optional(),
  jobMetadata: z.object({
    bigTableDetails: z.array(z.object({
      instanceId: z.string(),
      projectId: z.string(),
      tableId: z.string(),
    })),
    bigqueryDetails: z.array(z.object({
      dataset: z.string(),
      projectId: z.string(),
      query: z.string(),
      table: z.string(),
    })),
    datastoreDetails: z.array(z.object({
      namespace: z.string(),
      projectId: z.string(),
    })),
    fileDetails: z.array(z.object({
      filePattern: z.string(),
    })),
    pubsubDetails: z.array(z.object({
      subscription: z.string(),
      topic: z.string(),
    })),
    sdkVersion: z.object({
      bugs: z.array(z.object({
        severity: z.string(),
        type: z.string(),
        uri: z.string(),
      })),
      sdkSupportStatus: z.string(),
      version: z.string(),
      versionDisplayName: z.string(),
    }),
    spannerDetails: z.array(z.object({
      databaseId: z.string(),
      instanceId: z.string(),
      projectId: z.string(),
    })),
    userDisplayProperties: z.record(z.string(), z.unknown()),
  }).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  location: z.string().optional(),
  name: z.string(),
  pausable: z.boolean().optional(),
  pipelineDescription: z.object({
    displayData: z.array(z.object({
      boolValue: z.boolean(),
      durationValue: z.string(),
      floatValue: z.number(),
      int64Value: z.string(),
      javaClassValue: z.string(),
      key: z.string(),
      label: z.string(),
      namespace: z.string(),
      shortStrValue: z.string(),
      strValue: z.string(),
      timestampValue: z.string(),
      url: z.string(),
    })),
    executionPipelineStage: z.array(z.object({
      componentSource: z.array(z.object({
        name: z.unknown(),
        originalTransformOrCollection: z.unknown(),
        userName: z.unknown(),
      })),
      componentTransform: z.array(z.object({
        name: z.unknown(),
        originalTransform: z.unknown(),
        userName: z.unknown(),
      })),
      id: z.string(),
      inputSource: z.array(z.object({
        name: z.unknown(),
        originalTransformOrCollection: z.unknown(),
        sizeBytes: z.unknown(),
        userName: z.unknown(),
      })),
      kind: z.string(),
      name: z.string(),
      outputSource: z.array(z.object({
        name: z.unknown(),
        originalTransformOrCollection: z.unknown(),
        sizeBytes: z.unknown(),
        userName: z.unknown(),
      })),
      prerequisiteStage: z.array(z.string()),
    })),
    originalPipelineTransform: z.array(z.object({
      displayData: z.array(z.object({
        boolValue: z.unknown(),
        durationValue: z.unknown(),
        floatValue: z.unknown(),
        int64Value: z.unknown(),
        javaClassValue: z.unknown(),
        key: z.unknown(),
        label: z.unknown(),
        namespace: z.unknown(),
        shortStrValue: z.unknown(),
        strValue: z.unknown(),
        timestampValue: z.unknown(),
        url: z.unknown(),
      })),
      id: z.string(),
      inputCollectionName: z.array(z.string()),
      kind: z.string(),
      name: z.string(),
      outputCollectionName: z.array(z.string()),
    })),
    stepNamesHash: z.string(),
  }).optional(),
  projectId: z.string().optional(),
  replaceJobId: z.string().optional(),
  replacedByJobId: z.string().optional(),
  requestedState: z.string().optional(),
  runtimeUpdatableParams: z.object({
    acceptableBacklogDuration: z.string(),
    autoscalingTier: z.string(),
    latencyTier: z.string(),
    maxNumWorkers: z.number(),
    minNumWorkers: z.number(),
    workerUtilizationHint: z.number(),
  }).optional(),
  satisfiesPzi: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  serviceResources: z.object({
    zones: z.array(z.string()),
  }).optional(),
  stageStates: z.array(z.object({
    currentStateTime: z.string(),
    executionStageName: z.string(),
    executionStageState: z.string(),
  })).optional(),
  startTime: z.string().optional(),
  steps: z.array(z.object({
    kind: z.string(),
    name: z.string(),
    properties: z.record(z.string(), z.unknown()),
  })).optional(),
  stepsLocation: z.string().optional(),
  tempFiles: z.array(z.string()).optional(),
  transformNameMapping: z.record(z.string(), z.unknown()).optional(),
  type: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  clientRequestId: z.string().describe(
    "The client's unique identifier of the job, re-used across retried attempts. If this field is set, the service will ensure its uniqueness. The request to create a job will fail if the service has knowledge of a previously submitted job with the same client's ID and job name. The caller may use this field to ensure idempotence of job creation across retried attempts to create a job. By default, the field is empty and, in that case, the service ignores it.",
  ).optional(),
  createTime: z.string().describe(
    "The timestamp when the job was initially created. Immutable and set by the Cloud Dataflow service.",
  ).optional(),
  createdFromSnapshotId: z.string().describe(
    "If this is specified, the job's initial state is populated from the given snapshot.",
  ).optional(),
  currentState: z.enum([
    "JOB_STATE_UNKNOWN",
    "JOB_STATE_STOPPED",
    "JOB_STATE_RUNNING",
    "JOB_STATE_DONE",
    "JOB_STATE_FAILED",
    "JOB_STATE_CANCELLED",
    "JOB_STATE_UPDATED",
    "JOB_STATE_DRAINING",
    "JOB_STATE_DRAINED",
    "JOB_STATE_PENDING",
    "JOB_STATE_CANCELLING",
    "JOB_STATE_QUEUED",
    "JOB_STATE_RESOURCE_CLEANING_UP",
    "JOB_STATE_PAUSING",
    "JOB_STATE_PAUSED",
  ]).describe(
    "The current state of the job. Jobs are created in the `JOB_STATE_STOPPED` state unless otherwise specified. A job in the `JOB_STATE_RUNNING` state may asynchronously enter a terminal state. After a job has reached a terminal state, no further state updates may be made. This field might be mutated by the Dataflow service; callers cannot mutate it.",
  ).optional(),
  currentStateTime: z.string().describe(
    "The timestamp associated with the current state.",
  ).optional(),
  environment: z.object({
    clusterManagerApiService: z.string().describe(
      'The type of cluster manager API to use. If unknown or unspecified, the service will attempt to choose a reasonable default. This should be in the form of the API service name, e.g. "compute.googleapis.com".',
    ).optional(),
    dataset: z.string().describe(
      "Optional. The dataset for the current project where various workflow related tables are stored. The supported resource type is: Google BigQuery: bigquery.googleapis.com/{dataset}",
    ).optional(),
    debugOptions: z.object({
      dataSampling: z.object({
        behaviors: z.array(
          z.enum([
            "DATA_SAMPLING_BEHAVIOR_UNSPECIFIED",
            "DISABLED",
            "ALWAYS_ON",
            "EXCEPTIONS",
          ]),
        ).describe(
          "List of given sampling behaviors to enable. For example, specifying behaviors = [ALWAYS_ON] samples in-flight elements but does not sample exceptions. Can be used to specify multiple behaviors like, behaviors = [ALWAYS_ON, EXCEPTIONS] for specifying periodic sampling and exception sampling. If DISABLED is in the list, then sampling will be disabled and ignore the other given behaviors. Ordering does not matter.",
        ).optional(),
      }).describe("Configuration options for sampling elements.").optional(),
      enableHotKeyLogging: z.boolean().describe(
        "Optional. When true, enables the logging of the literal hot key to the user's Cloud Logging.",
      ).optional(),
    }).describe(
      "Describes any options that have an effect on the debugging of pipelines.",
    ).optional(),
    experiments: z.array(z.string()).describe(
      "The list of experiments to enable. This field should be used for SDK related experiments and not for service related experiments. The proper field for service related experiments is service_options.",
    ).optional(),
    flexResourceSchedulingGoal: z.enum([
      "FLEXRS_UNSPECIFIED",
      "FLEXRS_SPEED_OPTIMIZED",
      "FLEXRS_COST_OPTIMIZED",
    ]).describe("Optional. Which Flexible Resource Scheduling mode to run in.")
      .optional(),
    internalExperiments: z.record(z.string(), z.string()).describe(
      "Experimental settings.",
    ).optional(),
    sdkPipelineOptions: z.record(z.string(), z.string()).describe(
      "The Cloud Dataflow SDK pipeline options specified by the user. These options are passed through the service and are used to recreate the SDK pipeline options on the worker in a language agnostic and platform independent way.",
    ).optional(),
    serviceAccountEmail: z.string().describe(
      "Optional. Identity to run virtual machines as. Defaults to the default account.",
    ).optional(),
    serviceKmsKeyName: z.string().describe(
      "Optional. If set, contains the Cloud KMS key identifier used to encrypt data at rest, AKA a Customer Managed Encryption Key (CMEK). Format: projects/PROJECT_ID/locations/LOCATION/keyRings/KEY_RING/cryptoKeys/KEY",
    ).optional(),
    serviceOptions: z.array(z.string()).describe(
      "Optional. The list of service options to enable. This field should be used for service related experiments only. These experiments, when graduating to GA, should be replaced by dedicated fields or become default (i.e. always on).",
    ).optional(),
    shuffleMode: z.enum([
      "SHUFFLE_MODE_UNSPECIFIED",
      "VM_BASED",
      "SERVICE_BASED",
    ]).describe("Output only. The shuffle mode used for the job.").optional(),
    streamingMode: z.enum([
      "STREAMING_MODE_UNSPECIFIED",
      "STREAMING_MODE_EXACTLY_ONCE",
      "STREAMING_MODE_AT_LEAST_ONCE",
    ]).describe(
      "Optional. Specifies the Streaming Engine message processing guarantees. Reduces cost and latency but might result in duplicate messages committed to storage. Designed to run simple mapping streaming ETL jobs at the lowest cost. For example, Change Data Capture (CDC) to BigQuery is a canonical use case. For more information, see [Set the pipeline streaming mode](https://cloud.google.com/dataflow/docs/guides/streaming-modes).",
    ).optional(),
    tempStoragePrefix: z.string().describe(
      'The prefix of the resources the system should use for temporary storage. The system will append the suffix "/temp-{JOBNAME} to this resource prefix, where {JOBNAME} is the value of the job_name field. The resulting bucket and object prefix is used as the prefix of the resources used to store temporary data needed during the job execution. NOTE: This will override the value in taskrunner_settings. The supported resource type is: Google Cloud Storage: storage.googleapis.com/{bucket}/{object} bucket.storage.googleapis.com/{object}',
    ).optional(),
    usePublicIps: z.boolean().describe(
      "Optional. True when any worker pool that uses public IPs is present.",
    ).optional(),
    useStreamingEngineResourceBasedBilling: z.boolean().describe(
      "Output only. Whether the job uses the Streaming Engine resource-based billing model.",
    ).optional(),
    userAgent: z.record(z.string(), z.string()).describe(
      "Optional. A description of the process that generated the request.",
    ).optional(),
    version: z.record(z.string(), z.string()).describe(
      "A structure describing which components and their versions of the service are required in order to run the job.",
    ).optional(),
    workerPools: z.array(z.object({
      autoscalingSettings: z.object({
        algorithm: z.enum([
          "AUTOSCALING_ALGORITHM_UNKNOWN",
          "AUTOSCALING_ALGORITHM_NONE",
          "AUTOSCALING_ALGORITHM_BASIC",
        ]).describe("The algorithm to use for autoscaling.").optional(),
        maxNumWorkers: z.number().int().describe(
          "The maximum number of workers to cap scaling at.",
        ).optional(),
      }).describe("Settings for WorkerPool autoscaling.").optional(),
      dataDisks: z.array(z.object({
        diskType: z.unknown().describe(
          'Disk storage type, as defined by Google Compute Engine. This must be a disk type appropriate to the project and zone in which the workers will run. If unknown or unspecified, the service will attempt to choose a reasonable default. For example, the standard persistent disk type is a resource name typically ending in "pd-standard". If SSD persistent disks are available, the resource name typically ends with "pd-ssd". The actual valid values are defined the Google Compute Engine API, not by the Cloud Dataflow API; consult the Google Compute Engine documentation for more information about determining the set of available disk types for a particular project and zone. Google Compute Engine Disk types are local to a particular project in a particular zone, and so the resource name will typically look something like this: compute.googleapis.com/projects/project-id/zones/zone/diskTypes/pd-standard',
        ).optional(),
        mountPoint: z.unknown().describe(
          "Directory in a VM where disk is mounted.",
        ).optional(),
        sizeGb: z.unknown().describe(
          "Size of disk in GB. If zero or unspecified, the service will attempt to choose a reasonable default.",
        ).optional(),
      })).describe("Data disks that are used by a VM in this workflow.")
        .optional(),
      defaultPackageSet: z.enum([
        "DEFAULT_PACKAGE_SET_UNKNOWN",
        "DEFAULT_PACKAGE_SET_NONE",
        "DEFAULT_PACKAGE_SET_JAVA",
        "DEFAULT_PACKAGE_SET_PYTHON",
      ]).describe(
        "The default package set to install. This allows the service to select a default set of packages which are useful to worker harnesses written in a particular language.",
      ).optional(),
      diskProvisionedIops: z.string().describe(
        "Optional. IOPS provisioned for the root disk for VMs.",
      ).optional(),
      diskProvisionedThroughputMibps: z.string().describe(
        "Optional. Throughput provisioned for the root disk for VMs.",
      ).optional(),
      diskSizeGb: z.number().int().describe(
        "Size of root disk for VMs, in GB. If zero or unspecified, the service will attempt to choose a reasonable default.",
      ).optional(),
      diskSourceImage: z.string().describe(
        "Fully qualified source image for disks.",
      ).optional(),
      diskType: z.string().describe(
        "Type of root disk for VMs. If empty or unspecified, the service will attempt to choose a reasonable default.",
      ).optional(),
      ipConfiguration: z.enum([
        "WORKER_IP_UNSPECIFIED",
        "WORKER_IP_PUBLIC",
        "WORKER_IP_PRIVATE",
      ]).describe("Configuration for VM IPs.").optional(),
      kind: z.string().describe(
        "The kind of the worker pool; currently only `harness` and `shuffle` are supported.",
      ).optional(),
      machineType: z.string().describe(
        'Machine type (e.g. "n1-standard-1"). If empty or unspecified, the service will attempt to choose a reasonable default.',
      ).optional(),
      metadata: z.record(z.string(), z.string()).describe(
        "Metadata to set on the Google Compute Engine VMs.",
      ).optional(),
      network: z.string().describe(
        'Network to which VMs will be assigned. If empty or unspecified, the service will use the network "default".',
      ).optional(),
      numThreadsPerWorker: z.number().int().describe(
        "The number of threads per worker harness. If empty or unspecified, the service will choose a number of threads (according to the number of cores on the selected machine type for batch, or 1 by convention for streaming).",
      ).optional(),
      numWorkers: z.number().int().describe(
        "Number of Google Compute Engine workers in this pool needed to execute the job. If zero or unspecified, the service will attempt to choose a reasonable default.",
      ).optional(),
      onHostMaintenance: z.string().describe(
        "The action to take on host maintenance, as defined by the Google Compute Engine API.",
      ).optional(),
      packages: z.array(z.object({
        location: z.unknown().describe(
          "The resource to read the package from. The supported resource type is: Google Cloud Storage: storage.googleapis.com/{bucket} bucket.storage.googleapis.com/",
        ).optional(),
        name: z.unknown().describe("The name of the package.").optional(),
        sha256: z.unknown().describe(
          "Optional. The hex-encoded SHA256 checksum of the package. If the checksum is provided, the worker will verify the checksum of the package before using it. If the checksum does not match, the worker will fail to start.",
        ).optional(),
      })).describe("Packages to be installed on workers.").optional(),
      poolArgs: z.record(z.string(), z.string()).describe(
        "Extra arguments for this worker pool.",
      ).optional(),
      sdkHarnessContainerImages: z.array(z.object({
        capabilities: z.unknown().describe(
          "The set of capabilities enumerated in the above Environment proto. See also [beam_runner_api.proto](https://github.com/apache/beam/blob/master/model/pipeline/src/main/proto/org/apache/beam/model/pipeline/v1/beam_runner_api.proto)",
        ).optional(),
        containerImage: z.unknown().describe(
          "A docker container image that resides in Google Container Registry.",
        ).optional(),
        environmentId: z.unknown().describe(
          "Environment ID for the Beam runner API proto Environment that corresponds to the current SDK Harness.",
        ).optional(),
        useSingleCorePerContainer: z.unknown().describe(
          "If true, recommends the Dataflow service to use only one core per SDK container instance with this image. If false (or unset) recommends using more than one core per SDK container instance with this image for efficiency. Note that Dataflow service may choose to override this property if needed.",
        ).optional(),
      })).describe(
        "Set of SDK harness containers needed to execute this pipeline. This will only be set in the Fn API path. For non-cross-language pipelines this should have only one entry. Cross-language pipelines will have two or more entries.",
      ).optional(),
      subnetwork: z.string().describe(
        'Subnetwork to which VMs will be assigned, if desired. Expected to be of the form "regions/REGION/subnetworks/SUBNETWORK".',
      ).optional(),
      taskrunnerSettings: z.object({
        alsologtostderr: z.boolean().describe(
          "Whether to also send taskrunner log info to stderr.",
        ).optional(),
        baseTaskDir: z.string().describe(
          "The location on the worker for task-specific subdirectories.",
        ).optional(),
        baseUrl: z.string().describe(
          'The base URL for the taskrunner to use when accessing Google Cloud APIs. When workers access Google Cloud APIs, they logically do so via relative URLs. If this field is specified, it supplies the base URL to use for resolving these relative URLs. The normative algorithm used is defined by RFC 1808, "Relative Uniform Resource Locators". If not specified, the default value is "http://www.googleapis.com/"',
        ).optional(),
        commandlinesFileName: z.string().describe(
          "The file to store preprocessing commands in.",
        ).optional(),
        continueOnException: z.boolean().describe(
          "Whether to continue taskrunner if an exception is hit.",
        ).optional(),
        dataflowApiVersion: z.string().describe(
          'The API version of endpoint, e.g. "v1b3"',
        ).optional(),
        harnessCommand: z.string().describe(
          "The command to launch the worker harness.",
        ).optional(),
        languageHint: z.string().describe("The suggested backend language.")
          .optional(),
        logDir: z.string().describe("The directory on the VM to store logs.")
          .optional(),
        logToSerialconsole: z.boolean().describe(
          "Whether to send taskrunner log info to Google Compute Engine VM serial console.",
        ).optional(),
        logUploadLocation: z.string().describe(
          "Indicates where to put logs. If this is not specified, the logs will not be uploaded. The supported resource type is: Google Cloud Storage: storage.googleapis.com/{bucket}/{object} bucket.storage.googleapis.com/{object}",
        ).optional(),
        oauthScopes: z.array(z.unknown()).describe(
          "The OAuth2 scopes to be requested by the taskrunner in order to access the Cloud Dataflow API.",
        ).optional(),
        parallelWorkerSettings: z.object({
          baseUrl: z.unknown().describe(
            'The base URL for accessing Google Cloud APIs. When workers access Google Cloud APIs, they logically do so via relative URLs. If this field is specified, it supplies the base URL to use for resolving these relative URLs. The normative algorithm used is defined by RFC 1808, "Relative Uniform Resource Locators". If not specified, the default value is "http://www.googleapis.com/"',
          ).optional(),
          reportingEnabled: z.unknown().describe(
            "Whether to send work progress updates to the service.",
          ).optional(),
          servicePath: z.unknown().describe(
            'The Cloud Dataflow service path relative to the root URL, for example, "dataflow/v1b3/projects".',
          ).optional(),
          shuffleServicePath: z.unknown().describe(
            'The Shuffle service path relative to the root URL, for example, "shuffle/v1beta1".',
          ).optional(),
          tempStoragePrefix: z.unknown().describe(
            "The prefix of the resources the system should use for temporary storage. The supported resource type is: Google Cloud Storage: storage.googleapis.com/{bucket}/{object} bucket.storage.googleapis.com/{object}",
          ).optional(),
          workerId: z.unknown().describe(
            "The ID of the worker running this pipeline.",
          ).optional(),
        }).describe("Provides data to pass through to the worker harness.")
          .optional(),
        streamingWorkerMainClass: z.string().describe(
          "The streaming worker main class name.",
        ).optional(),
        taskGroup: z.string().describe(
          'The UNIX group ID on the worker VM to use for tasks launched by taskrunner; e.g. "wheel".',
        ).optional(),
        taskUser: z.string().describe(
          'The UNIX user ID on the worker VM to use for tasks launched by taskrunner; e.g. "root".',
        ).optional(),
        tempStoragePrefix: z.string().describe(
          "The prefix of the resources the taskrunner should use for temporary storage. The supported resource type is: Google Cloud Storage: storage.googleapis.com/{bucket}/{object} bucket.storage.googleapis.com/{object}",
        ).optional(),
        vmId: z.string().describe("The ID string of the VM.").optional(),
        workflowFileName: z.string().describe(
          "The file to store the workflow in.",
        ).optional(),
      }).describe("Taskrunner configuration settings.").optional(),
      teardownPolicy: z.enum([
        "TEARDOWN_POLICY_UNKNOWN",
        "TEARDOWN_ALWAYS",
        "TEARDOWN_ON_SUCCESS",
        "TEARDOWN_NEVER",
      ]).describe(
        "Sets the policy for determining when to turndown worker pool. Allowed values are: `TEARDOWN_ALWAYS`, `TEARDOWN_ON_SUCCESS`, and `TEARDOWN_NEVER`. `TEARDOWN_ALWAYS` means workers are always torn down regardless of whether the job succeeds. `TEARDOWN_ON_SUCCESS` means workers are torn down if the job succeeds. `TEARDOWN_NEVER` means the workers are never torn down. If the workers are not torn down by the service, they will continue to run and use Google Compute Engine VM resources in the user's project until they are explicitly terminated by the user. Because of this, Google recommends using the `TEARDOWN_ALWAYS` policy except for small, manually supervised test jobs. If unknown or unspecified, the service will attempt to choose a reasonable default.",
      ).optional(),
      workerHarnessContainerImage: z.string().describe(
        "Required. Docker container image that executes the Cloud Dataflow worker harness, residing in Google Container Registry. Deprecated for the Fn API path. Use sdk_harness_container_images instead.",
      ).optional(),
      zone: z.string().describe(
        "Zone to run the worker pools in. If empty or unspecified, the service will attempt to choose a reasonable default.",
      ).optional(),
    })).describe(
      'The worker pools. At least one "harness" worker pool must be specified in order for the job to have workers.',
    ).optional(),
    workerRegion: z.string().describe(
      'Optional. The Compute Engine region (https://cloud.google.com/compute/docs/regions-zones/regions-zones) in which worker processing should occur, e.g. "us-west1". Mutually exclusive with worker_zone. If neither worker_region nor worker_zone is specified, default to the control plane\'s region.',
    ).optional(),
    workerZone: z.string().describe(
      'Optional. The Compute Engine zone (https://cloud.google.com/compute/docs/regions-zones/regions-zones) in which worker processing should occur, e.g. "us-west1-a". Mutually exclusive with worker_region. If neither worker_region nor worker_zone is specified, a zone in the control plane\'s region is chosen based on available capacity.',
    ).optional(),
  }).describe("Describes the environment in which a Dataflow Job runs.")
    .optional(),
  executionInfo: z.object({
    stages: z.record(
      z.string(),
      z.object({
        stepName: z.array(z.string()).describe(
          "The steps associated with the execution stage. Note that stages may have several steps, and that a given step might be run by more than one stage.",
        ).optional(),
      }),
    ).describe("A mapping from each stage to the information about that stage.")
      .optional(),
  }).describe(
    "Additional information about how a Cloud Dataflow job will be executed that isn't contained in the submitted job.",
  ).optional(),
  id: z.string().describe(
    "The unique ID of this job. This field is set by the Dataflow service when the job is created, and is immutable for the life of the job.",
  ).optional(),
  jobMetadata: z.object({
    bigTableDetails: z.array(z.object({
      instanceId: z.string().describe("InstanceId accessed in the connection.")
        .optional(),
      projectId: z.string().describe("ProjectId accessed in the connection.")
        .optional(),
      tableId: z.string().describe("TableId accessed in the connection.")
        .optional(),
    })).describe(
      "Identification of a Cloud Bigtable source used in the Dataflow job.",
    ).optional(),
    bigqueryDetails: z.array(z.object({
      dataset: z.string().describe("Dataset accessed in the connection.")
        .optional(),
      projectId: z.string().describe("Project accessed in the connection.")
        .optional(),
      query: z.string().describe("Query used to access data in the connection.")
        .optional(),
      table: z.string().describe("Table accessed in the connection.")
        .optional(),
    })).describe(
      "Identification of a BigQuery source used in the Dataflow job.",
    ).optional(),
    datastoreDetails: z.array(z.object({
      namespace: z.string().describe("Namespace used in the connection.")
        .optional(),
      projectId: z.string().describe("ProjectId accessed in the connection.")
        .optional(),
    })).describe(
      "Identification of a Datastore source used in the Dataflow job.",
    ).optional(),
    fileDetails: z.array(z.object({
      filePattern: z.string().describe(
        "File Pattern used to access files by the connector.",
      ).optional(),
    })).describe("Identification of a File source used in the Dataflow job.")
      .optional(),
    pubsubDetails: z.array(z.object({
      subscription: z.string().describe("Subscription used in the connection.")
        .optional(),
      topic: z.string().describe("Topic accessed in the connection.")
        .optional(),
    })).describe("Identification of a Pub/Sub source used in the Dataflow job.")
      .optional(),
    sdkVersion: z.object({
      bugs: z.array(z.object({
        severity: z.enum([
          "SEVERITY_UNSPECIFIED",
          "NOTICE",
          "WARNING",
          "SEVERE",
        ]).describe("Output only. How severe the SDK bug is.").optional(),
        type: z.enum(["TYPE_UNSPECIFIED", "GENERAL", "PERFORMANCE", "DATALOSS"])
          .describe("Output only. Describes the impact of this SDK bug.")
          .optional(),
        uri: z.string().describe(
          "Output only. Link to more information on the bug.",
        ).optional(),
      })).describe("Output only. Known bugs found in this SDK version.")
        .optional(),
      sdkSupportStatus: z.enum([
        "UNKNOWN",
        "SUPPORTED",
        "STALE",
        "DEPRECATED",
        "UNSUPPORTED",
      ]).describe("The support status for this SDK version.").optional(),
      version: z.string().describe(
        "The version of the SDK used to run the job.",
      ).optional(),
      versionDisplayName: z.string().describe(
        "A readable string describing the version of the SDK.",
      ).optional(),
    }).describe("The version of the SDK used to run the job.").optional(),
    spannerDetails: z.array(z.object({
      databaseId: z.string().describe("DatabaseId accessed in the connection.")
        .optional(),
      instanceId: z.string().describe("InstanceId accessed in the connection.")
        .optional(),
      projectId: z.string().describe("ProjectId accessed in the connection.")
        .optional(),
    })).describe("Identification of a Spanner source used in the Dataflow job.")
      .optional(),
    userDisplayProperties: z.record(z.string(), z.string()).describe(
      "List of display properties to help UI filter jobs.",
    ).optional(),
  }).describe(
    "Metadata available primarily for filtering jobs. Will be included in the ListJob response and Job SUMMARY view.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "User-defined labels for this job. The labels map can contain no more than 64 entries. Entries of the labels map are UTF8 strings that comply with the following restrictions: * Keys must conform to regexp: \\p{Ll}\\p{Lo}{0,62} * Values must conform to regexp: [\\p{Ll}\\p{Lo}\\p{N}_-]{0,63} * Both keys and values are additionally constrained to be <= 128 bytes in size.",
  ).optional(),
  location: z.string().describe(
    "Optional. The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that contains this job.",
  ).optional(),
  name: z.string().describe(
    "Optional. The user-specified Dataflow job name. Only one active job with a given name can exist in a project within one region at any given time. Jobs in different regions can have the same name. If a caller attempts to create a job with the same name as an active job that already exists, the attempt returns the existing job. The name must match the regular expression `[a-z]([-a-z0-9]{0,1022}[a-z0-9])?`",
  ).optional(),
  pipelineDescription: z.object({
    displayData: z.array(z.object({
      boolValue: z.boolean().describe(
        "Contains value if the data is of a boolean type.",
      ).optional(),
      durationValue: z.string().describe(
        "Contains value if the data is of duration type.",
      ).optional(),
      floatValue: z.number().describe(
        "Contains value if the data is of float type.",
      ).optional(),
      int64Value: z.string().describe(
        "Contains value if the data is of int64 type.",
      ).optional(),
      javaClassValue: z.string().describe(
        "Contains value if the data is of java class type.",
      ).optional(),
      key: z.string().describe(
        "The key identifying the display data. This is intended to be used as a label for the display data when viewed in a dax monitoring system.",
      ).optional(),
      label: z.string().describe(
        "An optional label to display in a dax UI for the element.",
      ).optional(),
      namespace: z.string().describe(
        "The namespace for the key. This is usually a class name or programming language namespace (i.e. python module) which defines the display data. This allows a dax monitoring system to specially handle the data and perform custom rendering.",
      ).optional(),
      shortStrValue: z.string().describe(
        "A possible additional shorter value to display. For example a java_class_name_value of com.mypackage.MyDoFn will be stored with MyDoFn as the short_str_value and com.mypackage.MyDoFn as the java_class_name value. short_str_value can be displayed and java_class_name_value will be displayed as a tooltip.",
      ).optional(),
      strValue: z.string().describe(
        "Contains value if the data is of string type.",
      ).optional(),
      timestampValue: z.string().describe(
        "Contains value if the data is of timestamp type.",
      ).optional(),
      url: z.string().describe("An optional full URL.").optional(),
    })).describe("Pipeline level display data.").optional(),
    executionPipelineStage: z.array(z.object({
      componentSource: z.array(z.object({
        name: z.unknown().describe(
          "Dataflow service generated name for this source.",
        ).optional(),
        originalTransformOrCollection: z.unknown().describe(
          "User name for the original user transform or collection with which this source is most closely associated.",
        ).optional(),
        userName: z.unknown().describe(
          "Human-readable name for this transform; may be user or system generated.",
        ).optional(),
      })).describe(
        "Collections produced and consumed by component transforms of this stage.",
      ).optional(),
      componentTransform: z.array(z.object({
        name: z.unknown().describe(
          "Dataflow service generated name for this source.",
        ).optional(),
        originalTransform: z.unknown().describe(
          "User name for the original user transform with which this transform is most closely associated.",
        ).optional(),
        userName: z.unknown().describe(
          "Human-readable name for this transform; may be user or system generated.",
        ).optional(),
      })).describe("Transforms that comprise this execution stage.").optional(),
      id: z.string().describe("Dataflow service generated id for this stage.")
        .optional(),
      inputSource: z.array(z.object({
        name: z.unknown().describe(
          "Dataflow service generated name for this source.",
        ).optional(),
        originalTransformOrCollection: z.unknown().describe(
          "User name for the original user transform or collection with which this source is most closely associated.",
        ).optional(),
        sizeBytes: z.unknown().describe("Size of the source, if measurable.")
          .optional(),
        userName: z.unknown().describe(
          "Human-readable name for this source; may be user or system generated.",
        ).optional(),
      })).describe("Input sources for this stage.").optional(),
      kind: z.enum([
        "UNKNOWN_KIND",
        "PAR_DO_KIND",
        "GROUP_BY_KEY_KIND",
        "FLATTEN_KIND",
        "READ_KIND",
        "WRITE_KIND",
        "CONSTANT_KIND",
        "SINGLETON_KIND",
        "SHUFFLE_KIND",
      ]).describe("Type of transform this stage is executing.").optional(),
      name: z.string().describe(
        "Dataflow service generated name for this stage.",
      ).optional(),
      outputSource: z.array(z.object({
        name: z.unknown().describe(
          "Dataflow service generated name for this source.",
        ).optional(),
        originalTransformOrCollection: z.unknown().describe(
          "User name for the original user transform or collection with which this source is most closely associated.",
        ).optional(),
        sizeBytes: z.unknown().describe("Size of the source, if measurable.")
          .optional(),
        userName: z.unknown().describe(
          "Human-readable name for this source; may be user or system generated.",
        ).optional(),
      })).describe("Output sources for this stage.").optional(),
      prerequisiteStage: z.array(z.string()).describe(
        "Other stages that must complete before this stage can run.",
      ).optional(),
    })).describe("Description of each stage of execution of the pipeline.")
      .optional(),
    originalPipelineTransform: z.array(z.object({
      displayData: z.array(z.object({
        boolValue: z.unknown().describe(
          "Contains value if the data is of a boolean type.",
        ).optional(),
        durationValue: z.unknown().describe(
          "Contains value if the data is of duration type.",
        ).optional(),
        floatValue: z.unknown().describe(
          "Contains value if the data is of float type.",
        ).optional(),
        int64Value: z.unknown().describe(
          "Contains value if the data is of int64 type.",
        ).optional(),
        javaClassValue: z.unknown().describe(
          "Contains value if the data is of java class type.",
        ).optional(),
        key: z.unknown().describe(
          "The key identifying the display data. This is intended to be used as a label for the display data when viewed in a dax monitoring system.",
        ).optional(),
        label: z.unknown().describe(
          "An optional label to display in a dax UI for the element.",
        ).optional(),
        namespace: z.unknown().describe(
          "The namespace for the key. This is usually a class name or programming language namespace (i.e. python module) which defines the display data. This allows a dax monitoring system to specially handle the data and perform custom rendering.",
        ).optional(),
        shortStrValue: z.unknown().describe(
          "A possible additional shorter value to display. For example a java_class_name_value of com.mypackage.MyDoFn will be stored with MyDoFn as the short_str_value and com.mypackage.MyDoFn as the java_class_name value. short_str_value can be displayed and java_class_name_value will be displayed as a tooltip.",
        ).optional(),
        strValue: z.unknown().describe(
          "Contains value if the data is of string type.",
        ).optional(),
        timestampValue: z.unknown().describe(
          "Contains value if the data is of timestamp type.",
        ).optional(),
        url: z.unknown().describe("An optional full URL.").optional(),
      })).describe("Transform-specific display data.").optional(),
      id: z.string().describe("SDK generated id of this transform instance.")
        .optional(),
      inputCollectionName: z.array(z.string()).describe(
        "User names for all collection inputs to this transform.",
      ).optional(),
      kind: z.enum([
        "UNKNOWN_KIND",
        "PAR_DO_KIND",
        "GROUP_BY_KEY_KIND",
        "FLATTEN_KIND",
        "READ_KIND",
        "WRITE_KIND",
        "CONSTANT_KIND",
        "SINGLETON_KIND",
        "SHUFFLE_KIND",
      ]).describe("Type of transform.").optional(),
      name: z.string().describe(
        "User provided name for this transform instance.",
      ).optional(),
      outputCollectionName: z.array(z.string()).describe(
        "User names for all collection outputs to this transform.",
      ).optional(),
    })).describe(
      "Description of each transform in the pipeline and collections between them.",
    ).optional(),
    stepNamesHash: z.string().describe(
      "A hash value of the submitted pipeline portable graph step names if exists.",
    ).optional(),
  }).describe(
    "A descriptive representation of submitted pipeline as well as the executed form. This data is provided by the Dataflow service for ease of visualizing the pipeline and interpreting Dataflow provided metrics.",
  ).optional(),
  projectId: z.string().describe(
    "The ID of the Google Cloud project that the job belongs to.",
  ).optional(),
  replaceJobId: z.string().describe(
    "If this job is an update of an existing job, this field is the job ID of the job it replaced. When sending a `CreateJobRequest`, you can update a job by specifying it here. The job named here is stopped, and its intermediate state is transferred to this job.",
  ).optional(),
  replacedByJobId: z.string().describe(
    "If another job is an update of this job (and thus, this job is in `JOB_STATE_UPDATED`), this field contains the ID of that job.",
  ).optional(),
  requestedState: z.enum([
    "JOB_STATE_UNKNOWN",
    "JOB_STATE_STOPPED",
    "JOB_STATE_RUNNING",
    "JOB_STATE_DONE",
    "JOB_STATE_FAILED",
    "JOB_STATE_CANCELLED",
    "JOB_STATE_UPDATED",
    "JOB_STATE_DRAINING",
    "JOB_STATE_DRAINED",
    "JOB_STATE_PENDING",
    "JOB_STATE_CANCELLING",
    "JOB_STATE_QUEUED",
    "JOB_STATE_RESOURCE_CLEANING_UP",
    "JOB_STATE_PAUSING",
    "JOB_STATE_PAUSED",
  ]).describe(
    "The job's requested state. Applies to `UpdateJob` requests. Set `requested_state` with `UpdateJob` requests to switch between the states `JOB_STATE_STOPPED` and `JOB_STATE_RUNNING`. You can also use `UpdateJob` requests to change a job's state from `JOB_STATE_RUNNING` to `JOB_STATE_CANCELLED`, `JOB_STATE_DONE`, or `JOB_STATE_DRAINED`. These states irrevocably terminate the job if it hasn't already reached a terminal state. This field has no effect on `CreateJob` requests.",
  ).optional(),
  runtimeUpdatableParams: z.object({
    acceptableBacklogDuration: z.string().describe(
      "Optional. Deprecated: Use `latency_tier` instead. The backlog threshold duration in seconds for autoscaling. Value must be non-negative.",
    ).optional(),
    autoscalingTier: z.string().describe(
      'Optional. Deprecated: Use `latency_tier` instead. The backlog threshold tier for autoscaling. Value must be one of "low-latency", "medium-latency", or "high-latency".',
    ).optional(),
    latencyTier: z.string().describe(
      'Optional. The backlog threshold tier for autoscaling. Value must be one of "low-latency", "medium-latency", or "high-latency".',
    ).optional(),
    maxNumWorkers: z.number().int().describe(
      "The maximum number of workers to cap autoscaling at. This field is currently only supported for Streaming Engine jobs.",
    ).optional(),
    minNumWorkers: z.number().int().describe(
      "The minimum number of workers to scale down to. This field is currently only supported for Streaming Engine jobs.",
    ).optional(),
    workerUtilizationHint: z.number().describe(
      "Target worker utilization, compared against the aggregate utilization of the worker pool by autoscaler, to determine upscaling and downscaling when absent other constraints such as backlog. For more information, see [Update an existing pipeline](https://cloud.google.com/dataflow/docs/guides/updating-a-pipeline).",
    ).optional(),
  }).describe(
    "Additional job parameters that can only be updated during runtime using the projects.jobs.update method. These fields have no effect when specified during job creation.",
  ).optional(),
  satisfiesPzs: z.boolean().describe(
    "Reserved for future use. This field is set only in responses from the server; it is ignored if it is set in any requests.",
  ).optional(),
  serviceResources: z.object({
    zones: z.array(z.string()).describe(
      "Output only. List of Cloud Zones being used by the Dataflow Service for this job. Example: us-central1-c",
    ).optional(),
  }).describe("Resources used by the Dataflow Service to run the job.")
    .optional(),
  stageStates: z.array(z.object({
    currentStateTime: z.string().describe(
      "The time at which the stage transitioned to this state.",
    ).optional(),
    executionStageName: z.string().describe("The name of the execution stage.")
      .optional(),
    executionStageState: z.enum([
      "JOB_STATE_UNKNOWN",
      "JOB_STATE_STOPPED",
      "JOB_STATE_RUNNING",
      "JOB_STATE_DONE",
      "JOB_STATE_FAILED",
      "JOB_STATE_CANCELLED",
      "JOB_STATE_UPDATED",
      "JOB_STATE_DRAINING",
      "JOB_STATE_DRAINED",
      "JOB_STATE_PENDING",
      "JOB_STATE_CANCELLING",
      "JOB_STATE_QUEUED",
      "JOB_STATE_RESOURCE_CLEANING_UP",
      "JOB_STATE_PAUSING",
      "JOB_STATE_PAUSED",
    ]).describe(
      "Executions stage states allow the same set of values as JobState.",
    ).optional(),
  })).describe(
    "This field may be mutated by the Cloud Dataflow service; callers cannot mutate it.",
  ).optional(),
  startTime: z.string().describe(
    "The timestamp when the job was started (transitioned to JOB_STATE_PENDING). Flexible resource scheduling jobs are started with some delay after job creation, so start_time is unset before start and is updated when the job is started by the Cloud Dataflow service. For other jobs, start_time always equals to create_time and is immutable and set by the Cloud Dataflow service.",
  ).optional(),
  steps: z.array(z.object({
    kind: z.string().describe("The kind of step in the Cloud Dataflow job.")
      .optional(),
    name: z.string().describe(
      "The name that identifies the step. This must be unique for each step with respect to all other steps in the Cloud Dataflow job.",
    ).optional(),
    properties: z.record(z.string(), z.string()).describe(
      "Named properties associated with the step. Each kind of predefined step has its own required set of properties. Must be provided on Create. Only retrieved with JOB_VIEW_ALL.",
    ).optional(),
  })).describe(
    "Exactly one of step or steps_location should be specified. The top-level steps that constitute the entire job. Only retrieved with JOB_VIEW_ALL.",
  ).optional(),
  stepsLocation: z.string().describe(
    "The Cloud Storage location where the steps are stored.",
  ).optional(),
  tempFiles: z.array(z.string()).describe(
    "A set of files the system should be aware of that are used for temporary storage. These temporary files will be removed on job completion. No duplicates are allowed. No file patterns are supported. The supported files are: Google Cloud Storage: storage.googleapis.com/{bucket}/{object} bucket.storage.googleapis.com/{object}",
  ).optional(),
  transformNameMapping: z.record(z.string(), z.string()).describe(
    "Optional. The map of transform name prefixes of the job to be replaced to the corresponding name prefixes of the new job.",
  ).optional(),
  type: z.enum(["JOB_TYPE_UNKNOWN", "JOB_TYPE_BATCH", "JOB_TYPE_STREAMING"])
    .describe("Optional. The type of Dataflow job.").optional(),
  view: z.string().describe("The level of information requested in response.")
    .optional(),
});

/** Swamp extension model for Google Cloud Dataflow Jobs. Registered at `@swamp/gcp/dataflow/jobs`. */
export const model = {
  type: "@swamp/gcp/dataflow/jobs",
  version: "2026.05.20.1",
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
      toVersion: "2026.04.09.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.09.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.2",
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
      toVersion: "2026.05.20.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Defines a job to be run by the Cloud Dataflow service. Do not enter confident...",
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
        const body: Record<string, unknown> = {};
        if (g["clientRequestId"] !== undefined) {
          body["clientRequestId"] = g["clientRequestId"];
        }
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["createdFromSnapshotId"] !== undefined) {
          body["createdFromSnapshotId"] = g["createdFromSnapshotId"];
        }
        if (g["currentState"] !== undefined) {
          body["currentState"] = g["currentState"];
        }
        if (g["currentStateTime"] !== undefined) {
          body["currentStateTime"] = g["currentStateTime"];
        }
        if (g["environment"] !== undefined) {
          body["environment"] = g["environment"];
        }
        if (g["executionInfo"] !== undefined) {
          body["executionInfo"] = g["executionInfo"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["jobMetadata"] !== undefined) {
          body["jobMetadata"] = g["jobMetadata"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["location"] !== undefined) body["location"] = g["location"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["pipelineDescription"] !== undefined) {
          body["pipelineDescription"] = g["pipelineDescription"];
        }
        if (g["replaceJobId"] !== undefined) {
          body["replaceJobId"] = g["replaceJobId"];
        }
        if (g["replacedByJobId"] !== undefined) {
          body["replacedByJobId"] = g["replacedByJobId"];
        }
        if (g["requestedState"] !== undefined) {
          body["requestedState"] = g["requestedState"];
        }
        if (g["runtimeUpdatableParams"] !== undefined) {
          body["runtimeUpdatableParams"] = g["runtimeUpdatableParams"];
        }
        if (g["satisfiesPzs"] !== undefined) {
          body["satisfiesPzs"] = g["satisfiesPzs"];
        }
        if (g["serviceResources"] !== undefined) {
          body["serviceResources"] = g["serviceResources"];
        }
        if (g["stageStates"] !== undefined) {
          body["stageStates"] = g["stageStates"];
        }
        if (g["startTime"] !== undefined) body["startTime"] = g["startTime"];
        if (g["steps"] !== undefined) body["steps"] = g["steps"];
        if (g["stepsLocation"] !== undefined) {
          body["stepsLocation"] = g["stepsLocation"];
        }
        if (g["tempFiles"] !== undefined) body["tempFiles"] = g["tempFiles"];
        if (g["transformNameMapping"] !== undefined) {
          body["transformNameMapping"] = g["transformNameMapping"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["view"] !== undefined) body["view"] = g["view"];
        if (g["name"] !== undefined) params["jobId"] = String(g["name"]);
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
      description: "Get a jobs",
      arguments: z.object({
        identifier: z.string().describe("The name of the jobs"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["jobId"] = args.identifier;
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
        params["jobId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["clientRequestId"] !== undefined) {
          body["clientRequestId"] = g["clientRequestId"];
        }
        if (g["createdFromSnapshotId"] !== undefined) {
          body["createdFromSnapshotId"] = g["createdFromSnapshotId"];
        }
        if (g["currentState"] !== undefined) {
          body["currentState"] = g["currentState"];
        }
        if (g["currentStateTime"] !== undefined) {
          body["currentStateTime"] = g["currentStateTime"];
        }
        if (g["environment"] !== undefined) {
          body["environment"] = g["environment"];
        }
        if (g["executionInfo"] !== undefined) {
          body["executionInfo"] = g["executionInfo"];
        }
        if (g["jobMetadata"] !== undefined) {
          body["jobMetadata"] = g["jobMetadata"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["location"] !== undefined) body["location"] = g["location"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["pipelineDescription"] !== undefined) {
          body["pipelineDescription"] = g["pipelineDescription"];
        }
        if (g["replaceJobId"] !== undefined) {
          body["replaceJobId"] = g["replaceJobId"];
        }
        if (g["replacedByJobId"] !== undefined) {
          body["replacedByJobId"] = g["replacedByJobId"];
        }
        if (g["requestedState"] !== undefined) {
          body["requestedState"] = g["requestedState"];
        }
        if (g["satisfiesPzs"] !== undefined) {
          body["satisfiesPzs"] = g["satisfiesPzs"];
        }
        if (g["serviceResources"] !== undefined) {
          body["serviceResources"] = g["serviceResources"];
        }
        if (g["stageStates"] !== undefined) {
          body["stageStates"] = g["stageStates"];
        }
        if (g["steps"] !== undefined) body["steps"] = g["steps"];
        if (g["stepsLocation"] !== undefined) {
          body["stepsLocation"] = g["stepsLocation"];
        }
        if (g["tempFiles"] !== undefined) body["tempFiles"] = g["tempFiles"];
        if (g["transformNameMapping"] !== undefined) {
          body["transformNameMapping"] = g["transformNameMapping"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
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
          UPDATE_CONFIG,
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
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["jobId"] = identifier;
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
    aggregated: {
      description: "aggregated",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const result = await createResource(
          BASE_URL,
          {
            "id": "dataflow.projects.jobs.aggregated",
            "path": "v1b3/projects/{projectId}/jobs:aggregated",
            "httpMethod": "GET",
            "parameterOrder": ["projectId"],
            "parameters": {
              "filter": { "location": "query" },
              "location": { "location": "query" },
              "name": { "location": "query" },
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
              "projectId": { "location": "path", "required": true },
              "view": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    get_metrics: {
      description: "get metrics",
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
        params["jobId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "dataflow.projects.jobs.getMetrics",
            "path": "v1b3/projects/{projectId}/jobs/{jobId}/metrics",
            "httpMethod": "GET",
            "parameterOrder": ["projectId", "jobId"],
            "parameters": {
              "jobId": { "location": "path", "required": true },
              "location": { "location": "query" },
              "projectId": { "location": "path", "required": true },
              "startTime": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    snapshot: {
      description: "snapshot",
      arguments: z.object({
        description: z.any().optional(),
        location: z.any().optional(),
        snapshotSources: z.any().optional(),
        ttl: z.any().optional(),
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
        params["jobId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["description"] !== undefined) {
          body["description"] = args["description"];
        }
        if (args["location"] !== undefined) body["location"] = args["location"];
        if (args["snapshotSources"] !== undefined) {
          body["snapshotSources"] = args["snapshotSources"];
        }
        if (args["ttl"] !== undefined) body["ttl"] = args["ttl"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "dataflow.projects.jobs.snapshot",
            "path": "v1b3/projects/{projectId}/jobs/{jobId}:snapshot",
            "httpMethod": "POST",
            "parameterOrder": ["projectId", "jobId"],
            "parameters": {
              "jobId": { "location": "path", "required": true },
              "projectId": { "location": "path", "required": true },
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
