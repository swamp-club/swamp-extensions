// Auto-generated extension model for @swamp/gcp/dataplex/lakes-tasks
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Dataplex Lakes.Tasks.
 *
 * A task represents a user-visible job.
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
  return `${parent}/tasks/${shortName}`;
}

const BASE_URL = "https://dataplex.googleapis.com/";

const GET_CONFIG = {
  "id": "dataplex.projects.locations.lakes.tasks.get",
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
  "id": "dataplex.projects.locations.lakes.tasks.create",
  "path": "v1/{+parent}/tasks",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "taskId": {
      "location": "query",
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "dataplex.projects.locations.lakes.tasks.patch",
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
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "dataplex.projects.locations.lakes.tasks.delete",
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
  "id": "dataplex.projects.locations.lakes.tasks.list",
  "path": "v1/{+parent}/tasks",
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
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  description: z.string().describe("Optional. Description of the task.")
    .optional(),
  displayName: z.string().describe("Optional. User friendly display name.")
    .optional(),
  executionSpec: z.object({
    args: z.record(z.string(), z.string()).describe(
      "Optional. The arguments to pass to the task. The args can use placeholders of the format ${placeholder} as part of key/value string. These will be interpolated before passing the args to the driver. Currently supported placeholders: - ${task_id} - ${job_time} To pass positional args, set the key as TASK_ARGS. The value should be a comma-separated string of all the positional arguments. To use a delimiter other than comma, refer to https://cloud.google.com/sdk/gcloud/reference/topic/escaping. In case of other keys being present in the args, then TASK_ARGS will be passed as the last argument.",
    ).optional(),
    kmsKey: z.string().describe(
      "Optional. The Cloud KMS key to use for encryption, of the form: projects/{project_number}/locations/{location_id}/keyRings/{key-ring-name}/cryptoKeys/{key-name}.",
    ).optional(),
    maxJobExecutionLifetime: z.string().describe(
      "Optional. The maximum duration after which the job execution is expired.",
    ).optional(),
    project: z.string().describe(
      "Optional. The project in which jobs are run. By default, the project containing the Lake is used. If a project is provided, the ExecutionSpec.service_account must belong to this project.",
    ).optional(),
    serviceAccount: z.string().describe(
      "Required. Service account to use to execute a task. If not provided, the default Compute service account for the project is used.",
    ).optional(),
  }).describe("Execution related settings, like retry and service_account.")
    .optional(),
  executionStatus: z.object({
    latestJob: z.object({
      endTime: z.string().describe("Output only. The time when the job ended.")
        .optional(),
      executionSpec: z.object({
        args: z.record(z.string(), z.string()).describe(
          "Optional. The arguments to pass to the task. The args can use placeholders of the format ${placeholder} as part of key/value string. These will be interpolated before passing the args to the driver. Currently supported placeholders: - ${task_id} - ${job_time} To pass positional args, set the key as TASK_ARGS. The value should be a comma-separated string of all the positional arguments. To use a delimiter other than comma, refer to https://cloud.google.com/sdk/gcloud/reference/topic/escaping. In case of other keys being present in the args, then TASK_ARGS will be passed as the last argument.",
        ).optional(),
        kmsKey: z.string().describe(
          "Optional. The Cloud KMS key to use for encryption, of the form: projects/{project_number}/locations/{location_id}/keyRings/{key-ring-name}/cryptoKeys/{key-name}.",
        ).optional(),
        maxJobExecutionLifetime: z.string().describe(
          "Optional. The maximum duration after which the job execution is expired.",
        ).optional(),
        project: z.string().describe(
          "Optional. The project in which jobs are run. By default, the project containing the Lake is used. If a project is provided, the ExecutionSpec.service_account must belong to this project.",
        ).optional(),
        serviceAccount: z.string().describe(
          "Required. Service account to use to execute a task. If not provided, the default Compute service account for the project is used.",
        ).optional(),
      }).describe("Execution related settings, like retry and service_account.")
        .optional(),
      labels: z.record(z.string(), z.string()).describe(
        "Output only. User-defined labels for the task.",
      ).optional(),
      message: z.string().describe(
        "Output only. Additional information about the current state.",
      ).optional(),
      name: z.string().describe(
        "Output only. The relative resource name of the job, of the form: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/tasks/{task_id}/jobs/{job_id}.",
      ).optional(),
      retryCount: z.number().int().describe(
        "Output only. The number of times the job has been retried (excluding the initial attempt).",
      ).optional(),
      service: z.enum(["SERVICE_UNSPECIFIED", "DATAPROC"]).describe(
        "Output only. The underlying service running a job.",
      ).optional(),
      serviceJob: z.string().describe(
        "Output only. The full resource name for the job run under a particular service.",
      ).optional(),
      startTime: z.string().describe(
        "Output only. The time when the job was started.",
      ).optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "RUNNING",
        "CANCELLING",
        "CANCELLED",
        "SUCCEEDED",
        "FAILED",
        "ABORTED",
      ]).describe("Output only. Execution state for the job.").optional(),
      trigger: z.enum(["TRIGGER_UNSPECIFIED", "TASK_CONFIG", "RUN_REQUEST"])
        .describe("Output only. Job execution trigger.").optional(),
      uid: z.string().describe(
        "Output only. System generated globally unique ID for the job.",
      ).optional(),
    }).describe("A job represents an instance of a task.").optional(),
    updateTime: z.string().describe(
      "Output only. Last update time of the status.",
    ).optional(),
  }).describe("Status of the task execution (e.g. Jobs).").optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. User-defined labels for the task.",
  ).optional(),
  notebook: z.object({
    archiveUris: z.array(z.string()).describe(
      "Optional. Cloud Storage URIs of archives to be extracted into the working directory of each executor. Supported file types:.jar,.tar,.tar.gz,.tgz, and.zip.",
    ).optional(),
    fileUris: z.array(z.string()).describe(
      "Optional. Cloud Storage URIs of files to be placed in the working directory of each executor.",
    ).optional(),
    infrastructureSpec: z.object({
      batch: z.object({
        executorsCount: z.number().int().describe(
          "Optional. Total number of job executors. Executor Count should be between 2 and 100. Default=2",
        ).optional(),
        maxExecutorsCount: z.number().int().describe(
          "Optional. Max configurable executors. If max_executors_count > executors_count, then auto-scaling is enabled. Max Executor Count should be between 2 and 1000. Default=1000",
        ).optional(),
      }).describe("Batch compute resources associated with the task.")
        .optional(),
      containerImage: z.object({
        image: z.string().describe("Optional. Container image to use.")
          .optional(),
        javaJars: z.array(z.string()).describe(
          "Optional. A list of Java JARS to add to the classpath. Valid input includes Cloud Storage URIs to Jar binaries. For example, gs://bucket-name/my/path/to/file.jar",
        ).optional(),
        properties: z.record(z.string(), z.string()).describe(
          "Optional. Override to common configuration of open source components installed on the Dataproc cluster. The properties to set on daemon config files. Property keys are specified in prefix:property format, for example core:hadoop.tmp.dir. For more information, see Cluster properties (https://cloud.google.com/dataproc/docs/concepts/cluster-properties).",
        ).optional(),
        pythonPackages: z.array(z.string()).describe(
          "Optional. A list of python packages to be installed. Valid formats include Cloud Storage URI to a PIP installable library. For example, gs://bucket-name/my/path/to/lib.tar.gz",
        ).optional(),
      }).describe(
        "Container Image Runtime Configuration used with Batch execution.",
      ).optional(),
      vpcNetwork: z.object({
        network: z.string().describe(
          "Optional. The Cloud VPC network in which the job is run. By default, the Cloud VPC network named Default within the project is used.",
        ).optional(),
        networkTags: z.array(z.string()).describe(
          "Optional. List of network tags to apply to the job.",
        ).optional(),
        subNetwork: z.string().describe(
          "Optional. The Cloud VPC sub-network in which the job is run.",
        ).optional(),
      }).describe("Cloud VPC Network used to run the infrastructure.")
        .optional(),
    }).describe(
      "Configuration for the underlying infrastructure used to run workloads.",
    ).optional(),
    notebook: z.string().describe(
      "Required. Path to input notebook. This can be the Cloud Storage URI of the notebook file or the path to a Notebook Content. The execution args are accessible as environment variables (TASK_key=value).",
    ).optional(),
  }).describe("Config for running scheduled notebooks.").optional(),
  spark: z.object({
    archiveUris: z.array(z.string()).describe(
      "Optional. Cloud Storage URIs of archives to be extracted into the working directory of each executor. Supported file types:.jar,.tar,.tar.gz,.tgz, and.zip.",
    ).optional(),
    fileUris: z.array(z.string()).describe(
      "Optional. Cloud Storage URIs of files to be placed in the working directory of each executor.",
    ).optional(),
    infrastructureSpec: z.object({
      batch: z.object({
        executorsCount: z.number().int().describe(
          "Optional. Total number of job executors. Executor Count should be between 2 and 100. Default=2",
        ).optional(),
        maxExecutorsCount: z.number().int().describe(
          "Optional. Max configurable executors. If max_executors_count > executors_count, then auto-scaling is enabled. Max Executor Count should be between 2 and 1000. Default=1000",
        ).optional(),
      }).describe("Batch compute resources associated with the task.")
        .optional(),
      containerImage: z.object({
        image: z.string().describe("Optional. Container image to use.")
          .optional(),
        javaJars: z.array(z.string()).describe(
          "Optional. A list of Java JARS to add to the classpath. Valid input includes Cloud Storage URIs to Jar binaries. For example, gs://bucket-name/my/path/to/file.jar",
        ).optional(),
        properties: z.record(z.string(), z.string()).describe(
          "Optional. Override to common configuration of open source components installed on the Dataproc cluster. The properties to set on daemon config files. Property keys are specified in prefix:property format, for example core:hadoop.tmp.dir. For more information, see Cluster properties (https://cloud.google.com/dataproc/docs/concepts/cluster-properties).",
        ).optional(),
        pythonPackages: z.array(z.string()).describe(
          "Optional. A list of python packages to be installed. Valid formats include Cloud Storage URI to a PIP installable library. For example, gs://bucket-name/my/path/to/lib.tar.gz",
        ).optional(),
      }).describe(
        "Container Image Runtime Configuration used with Batch execution.",
      ).optional(),
      vpcNetwork: z.object({
        network: z.string().describe(
          "Optional. The Cloud VPC network in which the job is run. By default, the Cloud VPC network named Default within the project is used.",
        ).optional(),
        networkTags: z.array(z.string()).describe(
          "Optional. List of network tags to apply to the job.",
        ).optional(),
        subNetwork: z.string().describe(
          "Optional. The Cloud VPC sub-network in which the job is run.",
        ).optional(),
      }).describe("Cloud VPC Network used to run the infrastructure.")
        .optional(),
    }).describe(
      "Configuration for the underlying infrastructure used to run workloads.",
    ).optional(),
    mainClass: z.string().describe(
      "The name of the driver's main class. The jar file that contains the class must be in the default CLASSPATH or specified in jar_file_uris. The execution args are passed in as a sequence of named process arguments (--key=value).",
    ).optional(),
    mainJarFileUri: z.string().describe(
      "The Cloud Storage URI of the jar file that contains the main class. The execution args are passed in as a sequence of named process arguments (--key=value).",
    ).optional(),
    pythonScriptFile: z.string().describe(
      "The Gcloud Storage URI of the main Python file to use as the driver. Must be a.py file. The execution args are passed in as a sequence of named process arguments (--key=value).",
    ).optional(),
    sqlScript: z.string().describe(
      'The query text. The execution args are used to declare a set of script variables (set key="value";).',
    ).optional(),
    sqlScriptFile: z.string().describe(
      'A reference to a query file. This should be the Cloud Storage URI of the query file. The execution args are used to declare a set of script variables (set key="value";).',
    ).optional(),
  }).describe("User-specified config for running a Spark task.").optional(),
  triggerSpec: z.object({
    disabled: z.boolean().describe(
      "Optional. Prevent the task from executing. This does not cancel already running tasks. It is intended to temporarily disable RECURRING tasks.",
    ).optional(),
    maxRetries: z.number().int().describe(
      "Optional. Number of retry attempts before aborting. Set to zero to never attempt to retry a failed task.",
    ).optional(),
    schedule: z.string().describe(
      'Optional. Cron schedule (https://en.wikipedia.org/wiki/Cron) for running tasks periodically. To explicitly set a timezone to the cron tab, apply a prefix in the cron tab: "CRON_TZ=${IANA_TIME_ZONE}" or "TZ=${IANA_TIME_ZONE}". The ${IANA_TIME_ZONE} may only be a valid string from IANA time zone database. For example, CRON_TZ=America/New_York 1 * * * *, or TZ=America/New_York 1 * * * *. This field is required for RECURRING tasks.',
    ).optional(),
    startTime: z.string().describe(
      "Optional. The first run of the task will be after this time. If not specified, the task will run shortly after being submitted if ON_DEMAND and based on the schedule if RECURRING.",
    ).optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "ON_DEMAND", "RECURRING"]).describe(
      "Required. Immutable. Trigger type of the user-specified Task.",
    ).optional(),
  }).describe("Task scheduling and trigger settings.").optional(),
  taskId: z.string().describe("Required. Task identifier.").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  executionSpec: z.object({
    args: z.record(z.string(), z.unknown()),
    kmsKey: z.string(),
    maxJobExecutionLifetime: z.string(),
    project: z.string(),
    serviceAccount: z.string(),
  }).optional(),
  executionStatus: z.object({
    latestJob: z.object({
      endTime: z.string(),
      executionSpec: z.object({
        args: z.record(z.string(), z.unknown()),
        kmsKey: z.string(),
        maxJobExecutionLifetime: z.string(),
        project: z.string(),
        serviceAccount: z.string(),
      }),
      labels: z.record(z.string(), z.unknown()),
      message: z.string(),
      name: z.string(),
      retryCount: z.number(),
      service: z.string(),
      serviceJob: z.string(),
      startTime: z.string(),
      state: z.string(),
      trigger: z.string(),
      uid: z.string(),
    }),
    updateTime: z.string(),
  }).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  notebook: z.object({
    archiveUris: z.array(z.string()),
    fileUris: z.array(z.string()),
    infrastructureSpec: z.object({
      batch: z.object({
        executorsCount: z.number(),
        maxExecutorsCount: z.number(),
      }),
      containerImage: z.object({
        image: z.string(),
        javaJars: z.array(z.string()),
        properties: z.record(z.string(), z.unknown()),
        pythonPackages: z.array(z.string()),
      }),
      vpcNetwork: z.object({
        network: z.string(),
        networkTags: z.array(z.string()),
        subNetwork: z.string(),
      }),
    }),
    notebook: z.string(),
  }).optional(),
  spark: z.object({
    archiveUris: z.array(z.string()),
    fileUris: z.array(z.string()),
    infrastructureSpec: z.object({
      batch: z.object({
        executorsCount: z.number(),
        maxExecutorsCount: z.number(),
      }),
      containerImage: z.object({
        image: z.string(),
        javaJars: z.array(z.string()),
        properties: z.record(z.string(), z.unknown()),
        pythonPackages: z.array(z.string()),
      }),
      vpcNetwork: z.object({
        network: z.string(),
        networkTags: z.array(z.string()),
        subNetwork: z.string(),
      }),
    }),
    mainClass: z.string(),
    mainJarFileUri: z.string(),
    pythonScriptFile: z.string(),
    sqlScript: z.string(),
    sqlScriptFile: z.string(),
  }).optional(),
  state: z.string().optional(),
  triggerSpec: z.object({
    disabled: z.boolean(),
    maxRetries: z.number(),
    schedule: z.string(),
    startTime: z.string(),
    type: z.string(),
  }).optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  description: z.string().describe("Optional. Description of the task.")
    .optional(),
  displayName: z.string().describe("Optional. User friendly display name.")
    .optional(),
  executionSpec: z.object({
    args: z.record(z.string(), z.string()).describe(
      "Optional. The arguments to pass to the task. The args can use placeholders of the format ${placeholder} as part of key/value string. These will be interpolated before passing the args to the driver. Currently supported placeholders: - ${task_id} - ${job_time} To pass positional args, set the key as TASK_ARGS. The value should be a comma-separated string of all the positional arguments. To use a delimiter other than comma, refer to https://cloud.google.com/sdk/gcloud/reference/topic/escaping. In case of other keys being present in the args, then TASK_ARGS will be passed as the last argument.",
    ).optional(),
    kmsKey: z.string().describe(
      "Optional. The Cloud KMS key to use for encryption, of the form: projects/{project_number}/locations/{location_id}/keyRings/{key-ring-name}/cryptoKeys/{key-name}.",
    ).optional(),
    maxJobExecutionLifetime: z.string().describe(
      "Optional. The maximum duration after which the job execution is expired.",
    ).optional(),
    project: z.string().describe(
      "Optional. The project in which jobs are run. By default, the project containing the Lake is used. If a project is provided, the ExecutionSpec.service_account must belong to this project.",
    ).optional(),
    serviceAccount: z.string().describe(
      "Required. Service account to use to execute a task. If not provided, the default Compute service account for the project is used.",
    ).optional(),
  }).describe("Execution related settings, like retry and service_account.")
    .optional(),
  executionStatus: z.object({
    latestJob: z.object({
      endTime: z.string().describe("Output only. The time when the job ended.")
        .optional(),
      executionSpec: z.object({
        args: z.record(z.string(), z.string()).describe(
          "Optional. The arguments to pass to the task. The args can use placeholders of the format ${placeholder} as part of key/value string. These will be interpolated before passing the args to the driver. Currently supported placeholders: - ${task_id} - ${job_time} To pass positional args, set the key as TASK_ARGS. The value should be a comma-separated string of all the positional arguments. To use a delimiter other than comma, refer to https://cloud.google.com/sdk/gcloud/reference/topic/escaping. In case of other keys being present in the args, then TASK_ARGS will be passed as the last argument.",
        ).optional(),
        kmsKey: z.string().describe(
          "Optional. The Cloud KMS key to use for encryption, of the form: projects/{project_number}/locations/{location_id}/keyRings/{key-ring-name}/cryptoKeys/{key-name}.",
        ).optional(),
        maxJobExecutionLifetime: z.string().describe(
          "Optional. The maximum duration after which the job execution is expired.",
        ).optional(),
        project: z.string().describe(
          "Optional. The project in which jobs are run. By default, the project containing the Lake is used. If a project is provided, the ExecutionSpec.service_account must belong to this project.",
        ).optional(),
        serviceAccount: z.string().describe(
          "Required. Service account to use to execute a task. If not provided, the default Compute service account for the project is used.",
        ).optional(),
      }).describe("Execution related settings, like retry and service_account.")
        .optional(),
      labels: z.record(z.string(), z.string()).describe(
        "Output only. User-defined labels for the task.",
      ).optional(),
      message: z.string().describe(
        "Output only. Additional information about the current state.",
      ).optional(),
      name: z.string().describe(
        "Output only. The relative resource name of the job, of the form: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/tasks/{task_id}/jobs/{job_id}.",
      ).optional(),
      retryCount: z.number().int().describe(
        "Output only. The number of times the job has been retried (excluding the initial attempt).",
      ).optional(),
      service: z.enum(["SERVICE_UNSPECIFIED", "DATAPROC"]).describe(
        "Output only. The underlying service running a job.",
      ).optional(),
      serviceJob: z.string().describe(
        "Output only. The full resource name for the job run under a particular service.",
      ).optional(),
      startTime: z.string().describe(
        "Output only. The time when the job was started.",
      ).optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "RUNNING",
        "CANCELLING",
        "CANCELLED",
        "SUCCEEDED",
        "FAILED",
        "ABORTED",
      ]).describe("Output only. Execution state for the job.").optional(),
      trigger: z.enum(["TRIGGER_UNSPECIFIED", "TASK_CONFIG", "RUN_REQUEST"])
        .describe("Output only. Job execution trigger.").optional(),
      uid: z.string().describe(
        "Output only. System generated globally unique ID for the job.",
      ).optional(),
    }).describe("A job represents an instance of a task.").optional(),
    updateTime: z.string().describe(
      "Output only. Last update time of the status.",
    ).optional(),
  }).describe("Status of the task execution (e.g. Jobs).").optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. User-defined labels for the task.",
  ).optional(),
  notebook: z.object({
    archiveUris: z.array(z.string()).describe(
      "Optional. Cloud Storage URIs of archives to be extracted into the working directory of each executor. Supported file types:.jar,.tar,.tar.gz,.tgz, and.zip.",
    ).optional(),
    fileUris: z.array(z.string()).describe(
      "Optional. Cloud Storage URIs of files to be placed in the working directory of each executor.",
    ).optional(),
    infrastructureSpec: z.object({
      batch: z.object({
        executorsCount: z.number().int().describe(
          "Optional. Total number of job executors. Executor Count should be between 2 and 100. Default=2",
        ).optional(),
        maxExecutorsCount: z.number().int().describe(
          "Optional. Max configurable executors. If max_executors_count > executors_count, then auto-scaling is enabled. Max Executor Count should be between 2 and 1000. Default=1000",
        ).optional(),
      }).describe("Batch compute resources associated with the task.")
        .optional(),
      containerImage: z.object({
        image: z.string().describe("Optional. Container image to use.")
          .optional(),
        javaJars: z.array(z.string()).describe(
          "Optional. A list of Java JARS to add to the classpath. Valid input includes Cloud Storage URIs to Jar binaries. For example, gs://bucket-name/my/path/to/file.jar",
        ).optional(),
        properties: z.record(z.string(), z.string()).describe(
          "Optional. Override to common configuration of open source components installed on the Dataproc cluster. The properties to set on daemon config files. Property keys are specified in prefix:property format, for example core:hadoop.tmp.dir. For more information, see Cluster properties (https://cloud.google.com/dataproc/docs/concepts/cluster-properties).",
        ).optional(),
        pythonPackages: z.array(z.string()).describe(
          "Optional. A list of python packages to be installed. Valid formats include Cloud Storage URI to a PIP installable library. For example, gs://bucket-name/my/path/to/lib.tar.gz",
        ).optional(),
      }).describe(
        "Container Image Runtime Configuration used with Batch execution.",
      ).optional(),
      vpcNetwork: z.object({
        network: z.string().describe(
          "Optional. The Cloud VPC network in which the job is run. By default, the Cloud VPC network named Default within the project is used.",
        ).optional(),
        networkTags: z.array(z.string()).describe(
          "Optional. List of network tags to apply to the job.",
        ).optional(),
        subNetwork: z.string().describe(
          "Optional. The Cloud VPC sub-network in which the job is run.",
        ).optional(),
      }).describe("Cloud VPC Network used to run the infrastructure.")
        .optional(),
    }).describe(
      "Configuration for the underlying infrastructure used to run workloads.",
    ).optional(),
    notebook: z.string().describe(
      "Required. Path to input notebook. This can be the Cloud Storage URI of the notebook file or the path to a Notebook Content. The execution args are accessible as environment variables (TASK_key=value).",
    ).optional(),
  }).describe("Config for running scheduled notebooks.").optional(),
  spark: z.object({
    archiveUris: z.array(z.string()).describe(
      "Optional. Cloud Storage URIs of archives to be extracted into the working directory of each executor. Supported file types:.jar,.tar,.tar.gz,.tgz, and.zip.",
    ).optional(),
    fileUris: z.array(z.string()).describe(
      "Optional. Cloud Storage URIs of files to be placed in the working directory of each executor.",
    ).optional(),
    infrastructureSpec: z.object({
      batch: z.object({
        executorsCount: z.number().int().describe(
          "Optional. Total number of job executors. Executor Count should be between 2 and 100. Default=2",
        ).optional(),
        maxExecutorsCount: z.number().int().describe(
          "Optional. Max configurable executors. If max_executors_count > executors_count, then auto-scaling is enabled. Max Executor Count should be between 2 and 1000. Default=1000",
        ).optional(),
      }).describe("Batch compute resources associated with the task.")
        .optional(),
      containerImage: z.object({
        image: z.string().describe("Optional. Container image to use.")
          .optional(),
        javaJars: z.array(z.string()).describe(
          "Optional. A list of Java JARS to add to the classpath. Valid input includes Cloud Storage URIs to Jar binaries. For example, gs://bucket-name/my/path/to/file.jar",
        ).optional(),
        properties: z.record(z.string(), z.string()).describe(
          "Optional. Override to common configuration of open source components installed on the Dataproc cluster. The properties to set on daemon config files. Property keys are specified in prefix:property format, for example core:hadoop.tmp.dir. For more information, see Cluster properties (https://cloud.google.com/dataproc/docs/concepts/cluster-properties).",
        ).optional(),
        pythonPackages: z.array(z.string()).describe(
          "Optional. A list of python packages to be installed. Valid formats include Cloud Storage URI to a PIP installable library. For example, gs://bucket-name/my/path/to/lib.tar.gz",
        ).optional(),
      }).describe(
        "Container Image Runtime Configuration used with Batch execution.",
      ).optional(),
      vpcNetwork: z.object({
        network: z.string().describe(
          "Optional. The Cloud VPC network in which the job is run. By default, the Cloud VPC network named Default within the project is used.",
        ).optional(),
        networkTags: z.array(z.string()).describe(
          "Optional. List of network tags to apply to the job.",
        ).optional(),
        subNetwork: z.string().describe(
          "Optional. The Cloud VPC sub-network in which the job is run.",
        ).optional(),
      }).describe("Cloud VPC Network used to run the infrastructure.")
        .optional(),
    }).describe(
      "Configuration for the underlying infrastructure used to run workloads.",
    ).optional(),
    mainClass: z.string().describe(
      "The name of the driver's main class. The jar file that contains the class must be in the default CLASSPATH or specified in jar_file_uris. The execution args are passed in as a sequence of named process arguments (--key=value).",
    ).optional(),
    mainJarFileUri: z.string().describe(
      "The Cloud Storage URI of the jar file that contains the main class. The execution args are passed in as a sequence of named process arguments (--key=value).",
    ).optional(),
    pythonScriptFile: z.string().describe(
      "The Gcloud Storage URI of the main Python file to use as the driver. Must be a.py file. The execution args are passed in as a sequence of named process arguments (--key=value).",
    ).optional(),
    sqlScript: z.string().describe(
      'The query text. The execution args are used to declare a set of script variables (set key="value";).',
    ).optional(),
    sqlScriptFile: z.string().describe(
      'A reference to a query file. This should be the Cloud Storage URI of the query file. The execution args are used to declare a set of script variables (set key="value";).',
    ).optional(),
  }).describe("User-specified config for running a Spark task.").optional(),
  triggerSpec: z.object({
    disabled: z.boolean().describe(
      "Optional. Prevent the task from executing. This does not cancel already running tasks. It is intended to temporarily disable RECURRING tasks.",
    ).optional(),
    maxRetries: z.number().int().describe(
      "Optional. Number of retry attempts before aborting. Set to zero to never attempt to retry a failed task.",
    ).optional(),
    schedule: z.string().describe(
      'Optional. Cron schedule (https://en.wikipedia.org/wiki/Cron) for running tasks periodically. To explicitly set a timezone to the cron tab, apply a prefix in the cron tab: "CRON_TZ=${IANA_TIME_ZONE}" or "TZ=${IANA_TIME_ZONE}". The ${IANA_TIME_ZONE} may only be a valid string from IANA time zone database. For example, CRON_TZ=America/New_York 1 * * * *, or TZ=America/New_York 1 * * * *. This field is required for RECURRING tasks.',
    ).optional(),
    startTime: z.string().describe(
      "Optional. The first run of the task will be after this time. If not specified, the task will run shortly after being submitted if ON_DEMAND and based on the schedule if RECURRING.",
    ).optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "ON_DEMAND", "RECURRING"]).describe(
      "Required. Immutable. Trigger type of the user-specified Task.",
    ).optional(),
  }).describe("Task scheduling and trigger settings.").optional(),
  taskId: z.string().describe("Required. Task identifier.").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Dataplex Lakes.Tasks. Registered at `@swamp/gcp/dataplex/lakes-tasks`. */
export const model = {
  type: "@swamp/gcp/dataplex/lakes-tasks",
  version: "2026.05.21.1",
  upgrades: [
    {
      toVersion: "2026.04.01.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A task represents a user-visible job.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a tasks",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["executionSpec"] !== undefined) {
          body["executionSpec"] = g["executionSpec"];
        }
        if (g["executionStatus"] !== undefined) {
          body["executionStatus"] = g["executionStatus"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["notebook"] !== undefined) body["notebook"] = g["notebook"];
        if (g["spark"] !== undefined) body["spark"] = g["spark"];
        if (g["triggerSpec"] !== undefined) {
          body["triggerSpec"] = g["triggerSpec"];
        }
        if (g["taskId"] !== undefined) body["taskId"] = g["taskId"];
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
              "readyValues": ["ACTIVE"],
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
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
          },
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
      description: "Get a tasks",
      arguments: z.object({
        identifier: z.string().describe("The name of the tasks"),
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
      description: "Update tasks attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
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
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["executionSpec"] !== undefined) {
          body["executionSpec"] = g["executionSpec"];
        }
        if (g["executionStatus"] !== undefined) {
          body["executionStatus"] = g["executionStatus"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["notebook"] !== undefined) body["notebook"] = g["notebook"];
        if (g["spark"] !== undefined) body["spark"] = g["spark"];
        if (g["triggerSpec"] !== undefined) {
          body["triggerSpec"] = g["triggerSpec"];
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
              "readyValues": ["ACTIVE"],
              "failedValues": [],
            }
            : undefined,
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
      description: "Delete the tasks",
      arguments: z.object({
        identifier: z.string().describe("The name of the tasks"),
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
      description: "Sync tasks state from GCP",
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
            "id": "dataplex.projects.locations.lakes.tasks.getIamPolicy",
            "path": "v1/{+resource}:getIamPolicy",
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
        args: z.any().optional(),
        labels: z.any().optional(),
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
        if (args["args"] !== undefined) body["args"] = args["args"];
        if (args["labels"] !== undefined) body["labels"] = args["labels"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "dataplex.projects.locations.lakes.tasks.run",
            "path": "v1/{+name}:run",
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
            "id": "dataplex.projects.locations.lakes.tasks.setIamPolicy",
            "path": "v1/{+resource}:setIamPolicy",
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
            "id": "dataplex.projects.locations.lakes.tasks.testIamPermissions",
            "path": "v1/{+resource}:testIamPermissions",
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
