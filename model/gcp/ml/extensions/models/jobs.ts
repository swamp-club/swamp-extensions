// Auto-generated extension model for @swamp/gcp/ml/jobs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud AI Platform Training & Prediction Jobs.
 *
 * Represents a training or prediction job.
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

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/jobs/${shortName}`;
}

const BASE_URL = "https://ml.googleapis.com/";

const GET_CONFIG = {
  "id": "ml.projects.jobs.get",
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
  "id": "ml.projects.jobs.create",
  "path": "v1/{+parent}/jobs",
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
  "id": "ml.projects.jobs.patch",
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
  },
} as const;

const LIST_CONFIG = {
  "id": "ml.projects.jobs.list",
  "path": "v1/{+parent}/jobs",
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
  jobId: z.string().describe("Required. The user-specified id of the job.")
    .optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. One or more labels that you can add, to organize your jobs. Each label is a key-value pair, where both the key and the value are arbitrary strings that you supply. For more information, see the documentation on using labels.",
  ).optional(),
  predictionInput: z.object({
    batchSize: z.string().describe(
      "Optional. Number of records per batch, defaults to 64. The service will buffer batch_size number of records in memory before invoking one Tensorflow prediction call internally. So take the record size and memory available into consideration when setting this parameter.",
    ).optional(),
    dataFormat: z.enum([
      "DATA_FORMAT_UNSPECIFIED",
      "JSON",
      "TEXT",
      "TF_RECORD",
      "TF_RECORD_GZIP",
      "CSV",
    ]).describe("Required. The format of the input data files.").optional(),
    inputPaths: z.array(z.string()).describe(
      "Required. The Cloud Storage location of the input data files. May contain wildcards.",
    ).optional(),
    maxWorkerCount: z.string().describe(
      "Optional. The maximum number of workers to be used for parallel processing. Defaults to 10 if not specified.",
    ).optional(),
    modelName: z.string().describe(
      'Use this field if you want to use the default version for the specified model. The string must use the following format: `"projects/YOUR_PROJECT/models/YOUR_MODEL"`',
    ).optional(),
    outputDataFormat: z.enum([
      "DATA_FORMAT_UNSPECIFIED",
      "JSON",
      "TEXT",
      "TF_RECORD",
      "TF_RECORD_GZIP",
      "CSV",
    ]).describe("Optional. Format of the output data files, defaults to JSON.")
      .optional(),
    outputPath: z.string().describe(
      "Required. The output Google Cloud Storage location.",
    ).optional(),
    region: z.string().describe(
      "Required. The Google Compute Engine region to run the prediction job in. See the available regions for AI Platform services.",
    ).optional(),
    runtimeVersion: z.string().describe(
      "Optional. The AI Platform runtime version to use for this batch prediction. If not set, AI Platform will pick the runtime version used during the CreateVersion request for this model version, or choose the latest stable version when model version information is not available such as when the model is specified by uri.",
    ).optional(),
    signatureName: z.string().describe(
      'Optional. The name of the signature defined in the SavedModel to use for this job. Please refer to [SavedModel](https://tensorflow.github.io/serving/serving_basic.html) for information about how to use signatures. Defaults to [DEFAULT_SERVING_SIGNATURE_DEF_KEY](https://www.tensorflow.org/api_docs/python/tf/saved_model/signature_constants), which is "serving_default".',
    ).optional(),
    uri: z.string().describe(
      "Use this field if you want to specify a Google Cloud Storage path for the model to use.",
    ).optional(),
    versionName: z.string().describe(
      'Use this field if you want to specify a version of the model to use. The string is formatted the same way as `model_version`, with the addition of the version information: `"projects/YOUR_PROJECT/models/YOUR_MODEL/versions/YOUR_VERSION"`',
    ).optional(),
  }).describe("Represents input parameters for a prediction job.").optional(),
  predictionOutput: z.object({
    errorCount: z.string().describe(
      "The number of data instances which resulted in errors.",
    ).optional(),
    nodeHours: z.number().describe(
      "Node hours used by the batch prediction job.",
    ).optional(),
    outputPath: z.string().describe(
      "The output Google Cloud Storage location provided at the job creation time.",
    ).optional(),
    predictionCount: z.string().describe("The number of generated predictions.")
      .optional(),
  }).describe("Represents results of a prediction job.").optional(),
  trainingInput: z.object({
    args: z.array(z.string()).describe(
      "Optional. Command-line arguments passed to the training application when it starts. If your job uses a custom container, then the arguments are passed to the container's `ENTRYPOINT` command.",
    ).optional(),
    enableWebAccess: z.boolean().describe(
      "Optional. Whether you want AI Platform Training to enable [interactive shell access](https://cloud.google.com/ai-platform/training/docs/monitor-debug-interactive-shell) to training containers. If set to `true`, you can access interactive shells at the URIs given by TrainingOutput.web_access_uris or HyperparameterOutput.web_access_uris (within TrainingOutput.trials).",
    ).optional(),
    encryptionConfig: z.object({
      kmsKeyName: z.string().describe(
        "The Cloud KMS resource identifier of the customer-managed encryption key used to protect a resource, such as a training job. It has the following format: `projects/{PROJECT_ID}/locations/{REGION}/keyRings/{KEY_RING_NAME}/cryptoKeys/{KEY_NAME}`",
      ).optional(),
    }).describe(
      "Represents a custom encryption key configuration that can be applied to a resource.",
    ).optional(),
    evaluatorConfig: z.object({
      acceleratorConfig: z.object({
        count: z.string().describe(
          "The number of accelerators to attach to each machine running the job.",
        ).optional(),
        type: z.enum([
          "ACCELERATOR_TYPE_UNSPECIFIED",
          "NVIDIA_TESLA_K80",
          "NVIDIA_TESLA_P100",
          "NVIDIA_TESLA_V100",
          "NVIDIA_TESLA_P4",
          "NVIDIA_TESLA_T4",
          "NVIDIA_TESLA_A100",
          "TPU_V2",
          "TPU_V3",
          "TPU_V2_POD",
          "TPU_V3_POD",
          "TPU_V4_POD",
        ]).describe("The type of accelerator to use.").optional(),
      }).describe(
        "Represents a hardware accelerator request config. Note that the AcceleratorConfig can be used in both Jobs and Versions. Learn more about [accelerators for training](/ml-engine/docs/using-gpus) and [accelerators for online prediction](/ml-engine/docs/machine-types-online-prediction#gpus).",
      ).optional(),
      containerArgs: z.array(z.string()).describe(
        "Arguments to the entrypoint command. The following rules apply for container_command and container_args: - If you do not supply command or args: The defaults defined in the Docker image are used. - If you supply a command but no args: The default EntryPoint and the default Cmd defined in the Docker image are ignored. Your command is run without any arguments. - If you supply only args: The default Entrypoint defined in the Docker image is run with the args that you supplied. - If you supply a command and args: The default Entrypoint and the default Cmd defined in the Docker image are ignored. Your command is run with your args. It cannot be set if custom container image is not provided. Note that this field and [TrainingInput.args] are mutually exclusive, i.e., both cannot be set at the same time.",
      ).optional(),
      containerCommand: z.array(z.string()).describe(
        "The command with which the replica's custom container is run. If provided, it will override default ENTRYPOINT of the docker image. If not provided, the docker image's ENTRYPOINT is used. It cannot be set if custom container image is not provided. Note that this field and [TrainingInput.args] are mutually exclusive, i.e., both cannot be set at the same time.",
      ).optional(),
      diskConfig: z.object({
        bootDiskSizeGb: z.number().int().describe(
          "Size in GB of the boot disk (default is 100GB).",
        ).optional(),
        bootDiskType: z.string().describe(
          'Type of the boot disk (default is "pd-ssd"). Valid values: "pd-ssd" (Persistent Disk Solid State Drive) or "pd-standard" (Persistent Disk Hard Disk Drive).',
        ).optional(),
      }).describe("Represents the config of disk options.").optional(),
      imageUri: z.string().describe(
        "The Docker image to run on the replica. This image must be in Container Registry. Learn more about [configuring custom containers](/ai-platform/training/docs/distributed-training-containers).",
      ).optional(),
      tpuTfVersion: z.string().describe(
        "The AI Platform runtime version that includes a TensorFlow version matching the one used in the custom container. This field is required if the replica is a TPU worker that uses a custom container. Otherwise, do not specify this field. This must be a [runtime version that currently supports training with TPUs](/ml-engine/docs/tensorflow/runtime-version-list#tpu-support). Note that the version of TensorFlow included in a runtime version may differ from the numbering of the runtime version itself, because it may have a different [patch version](https://www.tensorflow.org/guide/version_compat#semantic_versioning_20). In this field, you must specify the runtime version (TensorFlow minor version). For example, if your custom container runs TensorFlow `1.x.y`, specify `1.x`.",
      ).optional(),
    }).describe("Represents the configuration for a replica in a cluster.")
      .optional(),
    evaluatorCount: z.string().describe(
      "Optional. The number of evaluator replicas to use for the training job. Each replica in the cluster will be of the type specified in `evaluator_type`. This value can only be used when `scale_tier` is set to `CUSTOM`. If you set this value, you must also set `evaluator_type`. The default value is zero.",
    ).optional(),
    evaluatorType: z.string().describe(
      "Optional. Specifies the type of virtual machine to use for your training job's evaluator nodes. The supported values are the same as those described in the entry for `masterType`. This value must be consistent with the category of machine type that `masterType` uses. In other words, both must be Compute Engine machine types or both must be legacy machine types. This value must be present when `scaleTier` is set to `CUSTOM` and `evaluatorCount` is greater than zero.",
    ).optional(),
    hyperparameters: z.object({
      algorithm: z.enum([
        "ALGORITHM_UNSPECIFIED",
        "GRID_SEARCH",
        "RANDOM_SEARCH",
      ]).describe(
        "Optional. The search algorithm specified for the hyperparameter tuning job. Uses the default AI Platform hyperparameter tuning algorithm if unspecified.",
      ).optional(),
      enableTrialEarlyStopping: z.boolean().describe(
        "Optional. Indicates if the hyperparameter tuning job enables auto trial early stopping.",
      ).optional(),
      goal: z.enum(["GOAL_TYPE_UNSPECIFIED", "MAXIMIZE", "MINIMIZE"]).describe(
        "Required. The type of goal to use for tuning. Available types are `MAXIMIZE` and `MINIMIZE`. Defaults to `MAXIMIZE`.",
      ).optional(),
      hyperparameterMetricTag: z.string().describe(
        'Optional. The TensorFlow summary tag name to use for optimizing trials. For current versions of TensorFlow, this tag name should exactly match what is shown in TensorBoard, including all scopes. For versions of TensorFlow prior to 0.12, this should be only the tag passed to tf.Summary. By default, "training/hptuning/metric" will be used.',
      ).optional(),
      maxFailedTrials: z.number().int().describe(
        "Optional. The number of failed trials that need to be seen before failing the hyperparameter tuning job. You can specify this field to override the default failing criteria for AI Platform hyperparameter tuning jobs. Defaults to zero, which means the service decides when a hyperparameter job should fail.",
      ).optional(),
      maxParallelTrials: z.number().int().describe(
        "Optional. The number of training trials to run concurrently. You can reduce the time it takes to perform hyperparameter tuning by adding trials in parallel. However, each trail only benefits from the information gained in completed trials. That means that a trial does not get access to the results of trials running at the same time, which could reduce the quality of the overall optimization. Each trial will use the same scale tier and machine types. Defaults to one.",
      ).optional(),
      maxTrials: z.number().int().describe(
        "Optional. How many training trials should be attempted to optimize the specified hyperparameters. Defaults to one.",
      ).optional(),
      params: z.array(z.object({
        categoricalValues: z.array(z.unknown()).describe(
          "Required if type is `CATEGORICAL`. The list of possible categories.",
        ).optional(),
        discreteValues: z.array(z.unknown()).describe(
          "Required if type is `DISCRETE`. A list of feasible points. The list should be in strictly increasing order. For instance, this parameter might have possible settings of 1.5, 2.5, and 4.0. This list should not contain more than 1,000 values.",
        ).optional(),
        maxValue: z.number().describe(
          "Required if type is `DOUBLE` or `INTEGER`. This field should be unset if type is `CATEGORICAL`. This value should be integers if type is `INTEGER`.",
        ).optional(),
        minValue: z.number().describe(
          "Required if type is `DOUBLE` or `INTEGER`. This field should be unset if type is `CATEGORICAL`. This value should be integers if type is INTEGER.",
        ).optional(),
        parameterName: z.string().describe(
          'Required. The parameter name must be unique amongst all ParameterConfigs in a HyperparameterSpec message. E.g., "learning_rate".',
        ).optional(),
        scaleType: z.enum([
          "NONE",
          "UNIT_LINEAR_SCALE",
          "UNIT_LOG_SCALE",
          "UNIT_REVERSE_LOG_SCALE",
        ]).describe(
          "Optional. How the parameter should be scaled to the hypercube. Leave unset for categorical parameters. Some kind of scaling is strongly recommended for real or integral parameters (e.g., `UNIT_LINEAR_SCALE`).",
        ).optional(),
        type: z.enum([
          "PARAMETER_TYPE_UNSPECIFIED",
          "DOUBLE",
          "INTEGER",
          "CATEGORICAL",
          "DISCRETE",
        ]).describe("Required. The type of the parameter.").optional(),
      })).describe("Required. The set of parameters to tune.").optional(),
      resumePreviousJobId: z.string().describe(
        "Optional. The prior hyperparameter tuning job id that users hope to continue with. The job id will be used to find the corresponding vizier study guid and resume the study.",
      ).optional(),
    }).describe("Represents a set of hyperparameters to optimize.").optional(),
    jobDir: z.string().describe(
      "Optional. A Google Cloud Storage path in which to store training outputs and other data needed for training. This path is passed to your TensorFlow program as the '--job-dir' command-line argument. The benefit of specifying this field is that Cloud ML validates the path for use in training.",
    ).optional(),
    masterConfig: z.object({
      acceleratorConfig: z.object({
        count: z.string().describe(
          "The number of accelerators to attach to each machine running the job.",
        ).optional(),
        type: z.enum([
          "ACCELERATOR_TYPE_UNSPECIFIED",
          "NVIDIA_TESLA_K80",
          "NVIDIA_TESLA_P100",
          "NVIDIA_TESLA_V100",
          "NVIDIA_TESLA_P4",
          "NVIDIA_TESLA_T4",
          "NVIDIA_TESLA_A100",
          "TPU_V2",
          "TPU_V3",
          "TPU_V2_POD",
          "TPU_V3_POD",
          "TPU_V4_POD",
        ]).describe("The type of accelerator to use.").optional(),
      }).describe(
        "Represents a hardware accelerator request config. Note that the AcceleratorConfig can be used in both Jobs and Versions. Learn more about [accelerators for training](/ml-engine/docs/using-gpus) and [accelerators for online prediction](/ml-engine/docs/machine-types-online-prediction#gpus).",
      ).optional(),
      containerArgs: z.array(z.string()).describe(
        "Arguments to the entrypoint command. The following rules apply for container_command and container_args: - If you do not supply command or args: The defaults defined in the Docker image are used. - If you supply a command but no args: The default EntryPoint and the default Cmd defined in the Docker image are ignored. Your command is run without any arguments. - If you supply only args: The default Entrypoint defined in the Docker image is run with the args that you supplied. - If you supply a command and args: The default Entrypoint and the default Cmd defined in the Docker image are ignored. Your command is run with your args. It cannot be set if custom container image is not provided. Note that this field and [TrainingInput.args] are mutually exclusive, i.e., both cannot be set at the same time.",
      ).optional(),
      containerCommand: z.array(z.string()).describe(
        "The command with which the replica's custom container is run. If provided, it will override default ENTRYPOINT of the docker image. If not provided, the docker image's ENTRYPOINT is used. It cannot be set if custom container image is not provided. Note that this field and [TrainingInput.args] are mutually exclusive, i.e., both cannot be set at the same time.",
      ).optional(),
      diskConfig: z.object({
        bootDiskSizeGb: z.number().int().describe(
          "Size in GB of the boot disk (default is 100GB).",
        ).optional(),
        bootDiskType: z.string().describe(
          'Type of the boot disk (default is "pd-ssd"). Valid values: "pd-ssd" (Persistent Disk Solid State Drive) or "pd-standard" (Persistent Disk Hard Disk Drive).',
        ).optional(),
      }).describe("Represents the config of disk options.").optional(),
      imageUri: z.string().describe(
        "The Docker image to run on the replica. This image must be in Container Registry. Learn more about [configuring custom containers](/ai-platform/training/docs/distributed-training-containers).",
      ).optional(),
      tpuTfVersion: z.string().describe(
        "The AI Platform runtime version that includes a TensorFlow version matching the one used in the custom container. This field is required if the replica is a TPU worker that uses a custom container. Otherwise, do not specify this field. This must be a [runtime version that currently supports training with TPUs](/ml-engine/docs/tensorflow/runtime-version-list#tpu-support). Note that the version of TensorFlow included in a runtime version may differ from the numbering of the runtime version itself, because it may have a different [patch version](https://www.tensorflow.org/guide/version_compat#semantic_versioning_20). In this field, you must specify the runtime version (TensorFlow minor version). For example, if your custom container runs TensorFlow `1.x.y`, specify `1.x`.",
      ).optional(),
    }).describe("Represents the configuration for a replica in a cluster.")
      .optional(),
    masterType: z.string().describe(
      "Optional. Specifies the type of virtual machine to use for your training job's master worker. You must specify this field when `scaleTier` is set to `CUSTOM`. You can use certain Compute Engine machine types directly in this field. See the [list of compatible Compute Engine machine types](/ai-platform/training/docs/machine-types#compute-engine-machine-types). Alternatively, you can use the certain legacy machine types in this field. See the [list of legacy machine types](/ai-platform/training/docs/machine-types#legacy-machine-types). Finally, if you want to use a TPU for training, specify `cloud_tpu` in this field. Learn more about the [special configuration options for training with TPUs](/ai-platform/training/docs/using-tpus#configuring_a_custom_tpu_machine).",
    ).optional(),
    network: z.string().describe(
      "Optional. The full name of the [Compute Engine network](/vpc/docs/vpc) to which the Job is peered. For example, `projects/12345/global/networks/myVPC`. The format of this field is `projects/{project}/global/networks/{network}`, where {project} is a project number (like `12345`) and {network} is network name. Private services access must already be configured for the network. If left unspecified, the Job is not peered with any network. [Learn about using VPC Network Peering.](/ai-platform/training/docs/vpc-peering).",
    ).optional(),
    packageUris: z.array(z.string()).describe(
      "Required. The Google Cloud Storage location of the packages with the training program and any additional dependencies. The maximum number of package URIs is 100.",
    ).optional(),
    parameterServerConfig: z.object({
      acceleratorConfig: z.object({
        count: z.string().describe(
          "The number of accelerators to attach to each machine running the job.",
        ).optional(),
        type: z.enum([
          "ACCELERATOR_TYPE_UNSPECIFIED",
          "NVIDIA_TESLA_K80",
          "NVIDIA_TESLA_P100",
          "NVIDIA_TESLA_V100",
          "NVIDIA_TESLA_P4",
          "NVIDIA_TESLA_T4",
          "NVIDIA_TESLA_A100",
          "TPU_V2",
          "TPU_V3",
          "TPU_V2_POD",
          "TPU_V3_POD",
          "TPU_V4_POD",
        ]).describe("The type of accelerator to use.").optional(),
      }).describe(
        "Represents a hardware accelerator request config. Note that the AcceleratorConfig can be used in both Jobs and Versions. Learn more about [accelerators for training](/ml-engine/docs/using-gpus) and [accelerators for online prediction](/ml-engine/docs/machine-types-online-prediction#gpus).",
      ).optional(),
      containerArgs: z.array(z.string()).describe(
        "Arguments to the entrypoint command. The following rules apply for container_command and container_args: - If you do not supply command or args: The defaults defined in the Docker image are used. - If you supply a command but no args: The default EntryPoint and the default Cmd defined in the Docker image are ignored. Your command is run without any arguments. - If you supply only args: The default Entrypoint defined in the Docker image is run with the args that you supplied. - If you supply a command and args: The default Entrypoint and the default Cmd defined in the Docker image are ignored. Your command is run with your args. It cannot be set if custom container image is not provided. Note that this field and [TrainingInput.args] are mutually exclusive, i.e., both cannot be set at the same time.",
      ).optional(),
      containerCommand: z.array(z.string()).describe(
        "The command with which the replica's custom container is run. If provided, it will override default ENTRYPOINT of the docker image. If not provided, the docker image's ENTRYPOINT is used. It cannot be set if custom container image is not provided. Note that this field and [TrainingInput.args] are mutually exclusive, i.e., both cannot be set at the same time.",
      ).optional(),
      diskConfig: z.object({
        bootDiskSizeGb: z.number().int().describe(
          "Size in GB of the boot disk (default is 100GB).",
        ).optional(),
        bootDiskType: z.string().describe(
          'Type of the boot disk (default is "pd-ssd"). Valid values: "pd-ssd" (Persistent Disk Solid State Drive) or "pd-standard" (Persistent Disk Hard Disk Drive).',
        ).optional(),
      }).describe("Represents the config of disk options.").optional(),
      imageUri: z.string().describe(
        "The Docker image to run on the replica. This image must be in Container Registry. Learn more about [configuring custom containers](/ai-platform/training/docs/distributed-training-containers).",
      ).optional(),
      tpuTfVersion: z.string().describe(
        "The AI Platform runtime version that includes a TensorFlow version matching the one used in the custom container. This field is required if the replica is a TPU worker that uses a custom container. Otherwise, do not specify this field. This must be a [runtime version that currently supports training with TPUs](/ml-engine/docs/tensorflow/runtime-version-list#tpu-support). Note that the version of TensorFlow included in a runtime version may differ from the numbering of the runtime version itself, because it may have a different [patch version](https://www.tensorflow.org/guide/version_compat#semantic_versioning_20). In this field, you must specify the runtime version (TensorFlow minor version). For example, if your custom container runs TensorFlow `1.x.y`, specify `1.x`.",
      ).optional(),
    }).describe("Represents the configuration for a replica in a cluster.")
      .optional(),
    parameterServerCount: z.string().describe(
      "Optional. The number of parameter server replicas to use for the training job. Each replica in the cluster will be of the type specified in `parameter_server_type`. This value can only be used when `scale_tier` is set to `CUSTOM`. If you set this value, you must also set `parameter_server_type`. The default value is zero.",
    ).optional(),
    parameterServerType: z.string().describe(
      "Optional. Specifies the type of virtual machine to use for your training job's parameter server. The supported values are the same as those described in the entry for `master_type`. This value must be consistent with the category of machine type that `masterType` uses. In other words, both must be Compute Engine machine types or both must be legacy machine types. This value must be present when `scaleTier` is set to `CUSTOM` and `parameter_server_count` is greater than zero.",
    ).optional(),
    pythonModule: z.string().describe(
      "Required. The Python module name to run after installing the packages.",
    ).optional(),
    pythonVersion: z.string().describe(
      "Optional. The version of Python used in training. You must either specify this field or specify `masterConfig.imageUri`. The following Python versions are available: * Python '3.7' is available when `runtime_version` is set to '1.15' or later. * Python '3.5' is available when `runtime_version` is set to a version from '1.4' to '1.14'. * Python '2.7' is available when `runtime_version` is set to '1.15' or earlier. Read more about the Python versions available for [each runtime version](/ml-engine/docs/runtime-version-list).",
    ).optional(),
    region: z.string().describe(
      "Required. The region to run the training job in. See the [available regions](/ai-platform/training/docs/regions) for AI Platform Training.",
    ).optional(),
    runtimeVersion: z.string().describe(
      "Optional. The AI Platform runtime version to use for training. You must either specify this field or specify `masterConfig.imageUri`. For more information, see the [runtime version list](/ai-platform/training/docs/runtime-version-list) and learn [how to manage runtime versions](/ai-platform/training/docs/versioning).",
    ).optional(),
    scaleTier: z.enum([
      "BASIC",
      "STANDARD_1",
      "PREMIUM_1",
      "BASIC_GPU",
      "BASIC_TPU",
      "CUSTOM",
    ]).describe(
      "Required. Specifies the machine types, the number of replicas for workers and parameter servers.",
    ).optional(),
    scheduling: z.object({
      maxRunningTime: z.string().describe(
        "Optional. The maximum job running time, expressed in seconds. The field can contain up to nine fractional digits, terminated by `s`. If not specified, this field defaults to `604800s` (seven days). If the training job is still running after this duration, AI Platform Training cancels it. The duration is measured from when the job enters the `RUNNING` state; therefore it does not overlap with the duration limited by Scheduling.max_wait_time. For example, if you want to ensure your job runs for no more than 2 hours, set this field to `7200s` (2 hours * 60 minutes / hour * 60 seconds / minute). If you submit your training job using the `gcloud` tool, you can [specify this field in a `config.yaml` file](/ai-platform/training/docs/training-jobs#formatting_your_configuration_parameters). For example: ` yaml trainingInput: scheduling: maxRunningTime: 7200s `",
      ).optional(),
      maxWaitTime: z.string().describe(
        "Optional. The maximum job wait time, expressed in seconds. The field can contain up to nine fractional digits, terminated by `s`. If not specified, there is no limit to the wait time. The minimum for this field is `1800s` (30 minutes). If the training job has not entered the `RUNNING` state after this duration, AI Platform Training cancels it. After the job begins running, it can no longer be cancelled due to the maximum wait time. Therefore the duration limited by this field does not overlap with the duration limited by Scheduling.max_running_time. For example, if the job temporarily stops running and retries due to a [VM restart](/ai-platform/training/docs/overview#restarts), this cannot lead to a maximum wait time cancellation. However, independently of this constraint, AI Platform Training might stop a job if there are too many retries due to exhausted resources in a region. The following example describes how you might use this field: To cancel your job if it doesn't start running within 1 hour, set this field to `3600s` (1 hour * 60 minutes / hour * 60 seconds / minute). If the job is still in the `QUEUED` or `PREPARING` state after an hour of waiting, AI Platform Training cancels the job. If you submit your training job using the `gcloud` tool, you can [specify this field in a `config.yaml` file](/ai-platform/training/docs/training-jobs#formatting_your_configuration_parameters). For example: ` yaml trainingInput: scheduling: maxWaitTime: 3600s `",
      ).optional(),
      priority: z.number().int().describe(
        "Optional. Job scheduling will be based on this priority, which in the range [0, 1000]. The bigger the number, the higher the priority. Default to 0 if not set. If there are multiple jobs requesting same type of accelerators, the high priority job will be scheduled prior to ones with low priority.",
      ).optional(),
    }).describe("All parameters related to scheduling of training jobs.")
      .optional(),
    serviceAccount: z.string().describe(
      "Optional. The email address of a service account to use when running the training appplication. You must have the `iam.serviceAccounts.actAs` permission for the specified service account. In addition, the AI Platform Training Google-managed service account must have the `roles/iam.serviceAccountAdmin` role for the specified service account. [Learn more about configuring a service account.](/ai-platform/training/docs/custom-service-account) If not specified, the AI Platform Training Google-managed service account is used by default.",
    ).optional(),
    useChiefInTfConfig: z.boolean().describe(
      "Optional. Use `chief` instead of `master` in the `TF_CONFIG` environment variable when training with a custom container. Defaults to `false`. [Learn more about this field.](/ai-platform/training/docs/distributed-training-details#chief-versus-master) This field has no effect for training jobs that don't use a custom container.",
    ).optional(),
    workerConfig: z.object({
      acceleratorConfig: z.object({
        count: z.string().describe(
          "The number of accelerators to attach to each machine running the job.",
        ).optional(),
        type: z.enum([
          "ACCELERATOR_TYPE_UNSPECIFIED",
          "NVIDIA_TESLA_K80",
          "NVIDIA_TESLA_P100",
          "NVIDIA_TESLA_V100",
          "NVIDIA_TESLA_P4",
          "NVIDIA_TESLA_T4",
          "NVIDIA_TESLA_A100",
          "TPU_V2",
          "TPU_V3",
          "TPU_V2_POD",
          "TPU_V3_POD",
          "TPU_V4_POD",
        ]).describe("The type of accelerator to use.").optional(),
      }).describe(
        "Represents a hardware accelerator request config. Note that the AcceleratorConfig can be used in both Jobs and Versions. Learn more about [accelerators for training](/ml-engine/docs/using-gpus) and [accelerators for online prediction](/ml-engine/docs/machine-types-online-prediction#gpus).",
      ).optional(),
      containerArgs: z.array(z.string()).describe(
        "Arguments to the entrypoint command. The following rules apply for container_command and container_args: - If you do not supply command or args: The defaults defined in the Docker image are used. - If you supply a command but no args: The default EntryPoint and the default Cmd defined in the Docker image are ignored. Your command is run without any arguments. - If you supply only args: The default Entrypoint defined in the Docker image is run with the args that you supplied. - If you supply a command and args: The default Entrypoint and the default Cmd defined in the Docker image are ignored. Your command is run with your args. It cannot be set if custom container image is not provided. Note that this field and [TrainingInput.args] are mutually exclusive, i.e., both cannot be set at the same time.",
      ).optional(),
      containerCommand: z.array(z.string()).describe(
        "The command with which the replica's custom container is run. If provided, it will override default ENTRYPOINT of the docker image. If not provided, the docker image's ENTRYPOINT is used. It cannot be set if custom container image is not provided. Note that this field and [TrainingInput.args] are mutually exclusive, i.e., both cannot be set at the same time.",
      ).optional(),
      diskConfig: z.object({
        bootDiskSizeGb: z.number().int().describe(
          "Size in GB of the boot disk (default is 100GB).",
        ).optional(),
        bootDiskType: z.string().describe(
          'Type of the boot disk (default is "pd-ssd"). Valid values: "pd-ssd" (Persistent Disk Solid State Drive) or "pd-standard" (Persistent Disk Hard Disk Drive).',
        ).optional(),
      }).describe("Represents the config of disk options.").optional(),
      imageUri: z.string().describe(
        "The Docker image to run on the replica. This image must be in Container Registry. Learn more about [configuring custom containers](/ai-platform/training/docs/distributed-training-containers).",
      ).optional(),
      tpuTfVersion: z.string().describe(
        "The AI Platform runtime version that includes a TensorFlow version matching the one used in the custom container. This field is required if the replica is a TPU worker that uses a custom container. Otherwise, do not specify this field. This must be a [runtime version that currently supports training with TPUs](/ml-engine/docs/tensorflow/runtime-version-list#tpu-support). Note that the version of TensorFlow included in a runtime version may differ from the numbering of the runtime version itself, because it may have a different [patch version](https://www.tensorflow.org/guide/version_compat#semantic_versioning_20). In this field, you must specify the runtime version (TensorFlow minor version). For example, if your custom container runs TensorFlow `1.x.y`, specify `1.x`.",
      ).optional(),
    }).describe("Represents the configuration for a replica in a cluster.")
      .optional(),
    workerCount: z.string().describe(
      "Optional. The number of worker replicas to use for the training job. Each replica in the cluster will be of the type specified in `worker_type`. This value can only be used when `scale_tier` is set to `CUSTOM`. If you set this value, you must also set `worker_type`. The default value is zero.",
    ).optional(),
    workerType: z.string().describe(
      "Optional. Specifies the type of virtual machine to use for your training job's worker nodes. The supported values are the same as those described in the entry for `masterType`. This value must be consistent with the category of machine type that `masterType` uses. In other words, both must be Compute Engine machine types or both must be legacy machine types. If you use `cloud_tpu` for this value, see special instructions for [configuring a custom TPU machine](/ml-engine/docs/tensorflow/using-tpus#configuring_a_custom_tpu_machine). This value must be present when `scaleTier` is set to `CUSTOM` and `workerCount` is greater than zero.",
    ).optional(),
  }).describe(
    "Represents input parameters for a training job. When using the gcloud command to submit your training job, you can specify the input parameters as command-line arguments and/or in a YAML configuration file referenced from the --config command-line argument. For details, see the guide to [submitting a training job](/ai-platform/training/docs/training-jobs).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  endTime: z.string().optional(),
  errorMessage: z.string().optional(),
  etag: z.string().optional(),
  jobId: z.string().optional(),
  jobPosition: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  predictionInput: z.object({
    batchSize: z.string(),
    dataFormat: z.string(),
    inputPaths: z.array(z.string()),
    maxWorkerCount: z.string(),
    modelName: z.string(),
    outputDataFormat: z.string(),
    outputPath: z.string(),
    region: z.string(),
    runtimeVersion: z.string(),
    signatureName: z.string(),
    uri: z.string(),
    versionName: z.string(),
  }).optional(),
  predictionOutput: z.object({
    errorCount: z.string(),
    nodeHours: z.number(),
    outputPath: z.string(),
    predictionCount: z.string(),
  }).optional(),
  startTime: z.string().optional(),
  state: z.string().optional(),
  trainingInput: z.object({
    args: z.array(z.string()),
    enableWebAccess: z.boolean(),
    encryptionConfig: z.object({
      kmsKeyName: z.string(),
    }),
    evaluatorConfig: z.object({
      acceleratorConfig: z.object({
        count: z.string(),
        type: z.string(),
      }),
      containerArgs: z.array(z.string()),
      containerCommand: z.array(z.string()),
      diskConfig: z.object({
        bootDiskSizeGb: z.number(),
        bootDiskType: z.string(),
      }),
      imageUri: z.string(),
      tpuTfVersion: z.string(),
    }),
    evaluatorCount: z.string(),
    evaluatorType: z.string(),
    hyperparameters: z.object({
      algorithm: z.string(),
      enableTrialEarlyStopping: z.boolean(),
      goal: z.string(),
      hyperparameterMetricTag: z.string(),
      maxFailedTrials: z.number(),
      maxParallelTrials: z.number(),
      maxTrials: z.number(),
      params: z.array(z.object({
        categoricalValues: z.array(z.unknown()),
        discreteValues: z.array(z.unknown()),
        maxValue: z.number(),
        minValue: z.number(),
        parameterName: z.string(),
        scaleType: z.string(),
        type: z.string(),
      })),
      resumePreviousJobId: z.string(),
    }),
    jobDir: z.string(),
    masterConfig: z.object({
      acceleratorConfig: z.object({
        count: z.string(),
        type: z.string(),
      }),
      containerArgs: z.array(z.string()),
      containerCommand: z.array(z.string()),
      diskConfig: z.object({
        bootDiskSizeGb: z.number(),
        bootDiskType: z.string(),
      }),
      imageUri: z.string(),
      tpuTfVersion: z.string(),
    }),
    masterType: z.string(),
    network: z.string(),
    packageUris: z.array(z.string()),
    parameterServerConfig: z.object({
      acceleratorConfig: z.object({
        count: z.string(),
        type: z.string(),
      }),
      containerArgs: z.array(z.string()),
      containerCommand: z.array(z.string()),
      diskConfig: z.object({
        bootDiskSizeGb: z.number(),
        bootDiskType: z.string(),
      }),
      imageUri: z.string(),
      tpuTfVersion: z.string(),
    }),
    parameterServerCount: z.string(),
    parameterServerType: z.string(),
    pythonModule: z.string(),
    pythonVersion: z.string(),
    region: z.string(),
    runtimeVersion: z.string(),
    scaleTier: z.string(),
    scheduling: z.object({
      maxRunningTime: z.string(),
      maxWaitTime: z.string(),
      priority: z.number(),
    }),
    serviceAccount: z.string(),
    useChiefInTfConfig: z.boolean(),
    workerConfig: z.object({
      acceleratorConfig: z.object({
        count: z.string(),
        type: z.string(),
      }),
      containerArgs: z.array(z.string()),
      containerCommand: z.array(z.string()),
      diskConfig: z.object({
        bootDiskSizeGb: z.number(),
        bootDiskType: z.string(),
      }),
      imageUri: z.string(),
      tpuTfVersion: z.string(),
    }),
    workerCount: z.string(),
    workerType: z.string(),
  }).optional(),
  trainingOutput: z.object({
    builtInAlgorithmOutput: z.object({
      framework: z.string(),
      modelPath: z.string(),
      pythonVersion: z.string(),
      runtimeVersion: z.string(),
    }),
    completedTrialCount: z.string(),
    consumedMLUnits: z.number(),
    hyperparameterMetricTag: z.string(),
    isBuiltInAlgorithmJob: z.boolean(),
    isHyperparameterTuningJob: z.boolean(),
    trials: z.array(z.object({
      allMetrics: z.array(z.object({
        objectiveValue: z.unknown(),
        trainingStep: z.unknown(),
      })),
      builtInAlgorithmOutput: z.object({
        framework: z.string(),
        modelPath: z.string(),
        pythonVersion: z.string(),
        runtimeVersion: z.string(),
      }),
      endTime: z.string(),
      finalMetric: z.object({
        objectiveValue: z.number(),
        trainingStep: z.string(),
      }),
      hyperparameters: z.record(z.string(), z.unknown()),
      isTrialStoppedEarly: z.boolean(),
      startTime: z.string(),
      state: z.string(),
      trialId: z.string(),
      webAccessUris: z.record(z.string(), z.unknown()),
    })),
    webAccessUris: z.record(z.string(), z.unknown()),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  jobId: z.string().describe("Required. The user-specified id of the job.")
    .optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. One or more labels that you can add, to organize your jobs. Each label is a key-value pair, where both the key and the value are arbitrary strings that you supply. For more information, see the documentation on using labels.",
  ).optional(),
  predictionInput: z.object({
    batchSize: z.string().describe(
      "Optional. Number of records per batch, defaults to 64. The service will buffer batch_size number of records in memory before invoking one Tensorflow prediction call internally. So take the record size and memory available into consideration when setting this parameter.",
    ).optional(),
    dataFormat: z.enum([
      "DATA_FORMAT_UNSPECIFIED",
      "JSON",
      "TEXT",
      "TF_RECORD",
      "TF_RECORD_GZIP",
      "CSV",
    ]).describe("Required. The format of the input data files.").optional(),
    inputPaths: z.array(z.string()).describe(
      "Required. The Cloud Storage location of the input data files. May contain wildcards.",
    ).optional(),
    maxWorkerCount: z.string().describe(
      "Optional. The maximum number of workers to be used for parallel processing. Defaults to 10 if not specified.",
    ).optional(),
    modelName: z.string().describe(
      'Use this field if you want to use the default version for the specified model. The string must use the following format: `"projects/YOUR_PROJECT/models/YOUR_MODEL"`',
    ).optional(),
    outputDataFormat: z.enum([
      "DATA_FORMAT_UNSPECIFIED",
      "JSON",
      "TEXT",
      "TF_RECORD",
      "TF_RECORD_GZIP",
      "CSV",
    ]).describe("Optional. Format of the output data files, defaults to JSON.")
      .optional(),
    outputPath: z.string().describe(
      "Required. The output Google Cloud Storage location.",
    ).optional(),
    region: z.string().describe(
      "Required. The Google Compute Engine region to run the prediction job in. See the available regions for AI Platform services.",
    ).optional(),
    runtimeVersion: z.string().describe(
      "Optional. The AI Platform runtime version to use for this batch prediction. If not set, AI Platform will pick the runtime version used during the CreateVersion request for this model version, or choose the latest stable version when model version information is not available such as when the model is specified by uri.",
    ).optional(),
    signatureName: z.string().describe(
      'Optional. The name of the signature defined in the SavedModel to use for this job. Please refer to [SavedModel](https://tensorflow.github.io/serving/serving_basic.html) for information about how to use signatures. Defaults to [DEFAULT_SERVING_SIGNATURE_DEF_KEY](https://www.tensorflow.org/api_docs/python/tf/saved_model/signature_constants), which is "serving_default".',
    ).optional(),
    uri: z.string().describe(
      "Use this field if you want to specify a Google Cloud Storage path for the model to use.",
    ).optional(),
    versionName: z.string().describe(
      'Use this field if you want to specify a version of the model to use. The string is formatted the same way as `model_version`, with the addition of the version information: `"projects/YOUR_PROJECT/models/YOUR_MODEL/versions/YOUR_VERSION"`',
    ).optional(),
  }).describe("Represents input parameters for a prediction job.").optional(),
  predictionOutput: z.object({
    errorCount: z.string().describe(
      "The number of data instances which resulted in errors.",
    ).optional(),
    nodeHours: z.number().describe(
      "Node hours used by the batch prediction job.",
    ).optional(),
    outputPath: z.string().describe(
      "The output Google Cloud Storage location provided at the job creation time.",
    ).optional(),
    predictionCount: z.string().describe("The number of generated predictions.")
      .optional(),
  }).describe("Represents results of a prediction job.").optional(),
  trainingInput: z.object({
    args: z.array(z.string()).describe(
      "Optional. Command-line arguments passed to the training application when it starts. If your job uses a custom container, then the arguments are passed to the container's `ENTRYPOINT` command.",
    ).optional(),
    enableWebAccess: z.boolean().describe(
      "Optional. Whether you want AI Platform Training to enable [interactive shell access](https://cloud.google.com/ai-platform/training/docs/monitor-debug-interactive-shell) to training containers. If set to `true`, you can access interactive shells at the URIs given by TrainingOutput.web_access_uris or HyperparameterOutput.web_access_uris (within TrainingOutput.trials).",
    ).optional(),
    encryptionConfig: z.object({
      kmsKeyName: z.string().describe(
        "The Cloud KMS resource identifier of the customer-managed encryption key used to protect a resource, such as a training job. It has the following format: `projects/{PROJECT_ID}/locations/{REGION}/keyRings/{KEY_RING_NAME}/cryptoKeys/{KEY_NAME}`",
      ).optional(),
    }).describe(
      "Represents a custom encryption key configuration that can be applied to a resource.",
    ).optional(),
    evaluatorConfig: z.object({
      acceleratorConfig: z.object({
        count: z.string().describe(
          "The number of accelerators to attach to each machine running the job.",
        ).optional(),
        type: z.enum([
          "ACCELERATOR_TYPE_UNSPECIFIED",
          "NVIDIA_TESLA_K80",
          "NVIDIA_TESLA_P100",
          "NVIDIA_TESLA_V100",
          "NVIDIA_TESLA_P4",
          "NVIDIA_TESLA_T4",
          "NVIDIA_TESLA_A100",
          "TPU_V2",
          "TPU_V3",
          "TPU_V2_POD",
          "TPU_V3_POD",
          "TPU_V4_POD",
        ]).describe("The type of accelerator to use.").optional(),
      }).describe(
        "Represents a hardware accelerator request config. Note that the AcceleratorConfig can be used in both Jobs and Versions. Learn more about [accelerators for training](/ml-engine/docs/using-gpus) and [accelerators for online prediction](/ml-engine/docs/machine-types-online-prediction#gpus).",
      ).optional(),
      containerArgs: z.array(z.string()).describe(
        "Arguments to the entrypoint command. The following rules apply for container_command and container_args: - If you do not supply command or args: The defaults defined in the Docker image are used. - If you supply a command but no args: The default EntryPoint and the default Cmd defined in the Docker image are ignored. Your command is run without any arguments. - If you supply only args: The default Entrypoint defined in the Docker image is run with the args that you supplied. - If you supply a command and args: The default Entrypoint and the default Cmd defined in the Docker image are ignored. Your command is run with your args. It cannot be set if custom container image is not provided. Note that this field and [TrainingInput.args] are mutually exclusive, i.e., both cannot be set at the same time.",
      ).optional(),
      containerCommand: z.array(z.string()).describe(
        "The command with which the replica's custom container is run. If provided, it will override default ENTRYPOINT of the docker image. If not provided, the docker image's ENTRYPOINT is used. It cannot be set if custom container image is not provided. Note that this field and [TrainingInput.args] are mutually exclusive, i.e., both cannot be set at the same time.",
      ).optional(),
      diskConfig: z.object({
        bootDiskSizeGb: z.number().int().describe(
          "Size in GB of the boot disk (default is 100GB).",
        ).optional(),
        bootDiskType: z.string().describe(
          'Type of the boot disk (default is "pd-ssd"). Valid values: "pd-ssd" (Persistent Disk Solid State Drive) or "pd-standard" (Persistent Disk Hard Disk Drive).',
        ).optional(),
      }).describe("Represents the config of disk options.").optional(),
      imageUri: z.string().describe(
        "The Docker image to run on the replica. This image must be in Container Registry. Learn more about [configuring custom containers](/ai-platform/training/docs/distributed-training-containers).",
      ).optional(),
      tpuTfVersion: z.string().describe(
        "The AI Platform runtime version that includes a TensorFlow version matching the one used in the custom container. This field is required if the replica is a TPU worker that uses a custom container. Otherwise, do not specify this field. This must be a [runtime version that currently supports training with TPUs](/ml-engine/docs/tensorflow/runtime-version-list#tpu-support). Note that the version of TensorFlow included in a runtime version may differ from the numbering of the runtime version itself, because it may have a different [patch version](https://www.tensorflow.org/guide/version_compat#semantic_versioning_20). In this field, you must specify the runtime version (TensorFlow minor version). For example, if your custom container runs TensorFlow `1.x.y`, specify `1.x`.",
      ).optional(),
    }).describe("Represents the configuration for a replica in a cluster.")
      .optional(),
    evaluatorCount: z.string().describe(
      "Optional. The number of evaluator replicas to use for the training job. Each replica in the cluster will be of the type specified in `evaluator_type`. This value can only be used when `scale_tier` is set to `CUSTOM`. If you set this value, you must also set `evaluator_type`. The default value is zero.",
    ).optional(),
    evaluatorType: z.string().describe(
      "Optional. Specifies the type of virtual machine to use for your training job's evaluator nodes. The supported values are the same as those described in the entry for `masterType`. This value must be consistent with the category of machine type that `masterType` uses. In other words, both must be Compute Engine machine types or both must be legacy machine types. This value must be present when `scaleTier` is set to `CUSTOM` and `evaluatorCount` is greater than zero.",
    ).optional(),
    hyperparameters: z.object({
      algorithm: z.enum([
        "ALGORITHM_UNSPECIFIED",
        "GRID_SEARCH",
        "RANDOM_SEARCH",
      ]).describe(
        "Optional. The search algorithm specified for the hyperparameter tuning job. Uses the default AI Platform hyperparameter tuning algorithm if unspecified.",
      ).optional(),
      enableTrialEarlyStopping: z.boolean().describe(
        "Optional. Indicates if the hyperparameter tuning job enables auto trial early stopping.",
      ).optional(),
      goal: z.enum(["GOAL_TYPE_UNSPECIFIED", "MAXIMIZE", "MINIMIZE"]).describe(
        "Required. The type of goal to use for tuning. Available types are `MAXIMIZE` and `MINIMIZE`. Defaults to `MAXIMIZE`.",
      ).optional(),
      hyperparameterMetricTag: z.string().describe(
        'Optional. The TensorFlow summary tag name to use for optimizing trials. For current versions of TensorFlow, this tag name should exactly match what is shown in TensorBoard, including all scopes. For versions of TensorFlow prior to 0.12, this should be only the tag passed to tf.Summary. By default, "training/hptuning/metric" will be used.',
      ).optional(),
      maxFailedTrials: z.number().int().describe(
        "Optional. The number of failed trials that need to be seen before failing the hyperparameter tuning job. You can specify this field to override the default failing criteria for AI Platform hyperparameter tuning jobs. Defaults to zero, which means the service decides when a hyperparameter job should fail.",
      ).optional(),
      maxParallelTrials: z.number().int().describe(
        "Optional. The number of training trials to run concurrently. You can reduce the time it takes to perform hyperparameter tuning by adding trials in parallel. However, each trail only benefits from the information gained in completed trials. That means that a trial does not get access to the results of trials running at the same time, which could reduce the quality of the overall optimization. Each trial will use the same scale tier and machine types. Defaults to one.",
      ).optional(),
      maxTrials: z.number().int().describe(
        "Optional. How many training trials should be attempted to optimize the specified hyperparameters. Defaults to one.",
      ).optional(),
      params: z.array(z.object({
        categoricalValues: z.array(z.unknown()).describe(
          "Required if type is `CATEGORICAL`. The list of possible categories.",
        ).optional(),
        discreteValues: z.array(z.unknown()).describe(
          "Required if type is `DISCRETE`. A list of feasible points. The list should be in strictly increasing order. For instance, this parameter might have possible settings of 1.5, 2.5, and 4.0. This list should not contain more than 1,000 values.",
        ).optional(),
        maxValue: z.number().describe(
          "Required if type is `DOUBLE` or `INTEGER`. This field should be unset if type is `CATEGORICAL`. This value should be integers if type is `INTEGER`.",
        ).optional(),
        minValue: z.number().describe(
          "Required if type is `DOUBLE` or `INTEGER`. This field should be unset if type is `CATEGORICAL`. This value should be integers if type is INTEGER.",
        ).optional(),
        parameterName: z.string().describe(
          'Required. The parameter name must be unique amongst all ParameterConfigs in a HyperparameterSpec message. E.g., "learning_rate".',
        ).optional(),
        scaleType: z.enum([
          "NONE",
          "UNIT_LINEAR_SCALE",
          "UNIT_LOG_SCALE",
          "UNIT_REVERSE_LOG_SCALE",
        ]).describe(
          "Optional. How the parameter should be scaled to the hypercube. Leave unset for categorical parameters. Some kind of scaling is strongly recommended for real or integral parameters (e.g., `UNIT_LINEAR_SCALE`).",
        ).optional(),
        type: z.enum([
          "PARAMETER_TYPE_UNSPECIFIED",
          "DOUBLE",
          "INTEGER",
          "CATEGORICAL",
          "DISCRETE",
        ]).describe("Required. The type of the parameter.").optional(),
      })).describe("Required. The set of parameters to tune.").optional(),
      resumePreviousJobId: z.string().describe(
        "Optional. The prior hyperparameter tuning job id that users hope to continue with. The job id will be used to find the corresponding vizier study guid and resume the study.",
      ).optional(),
    }).describe("Represents a set of hyperparameters to optimize.").optional(),
    jobDir: z.string().describe(
      "Optional. A Google Cloud Storage path in which to store training outputs and other data needed for training. This path is passed to your TensorFlow program as the '--job-dir' command-line argument. The benefit of specifying this field is that Cloud ML validates the path for use in training.",
    ).optional(),
    masterConfig: z.object({
      acceleratorConfig: z.object({
        count: z.string().describe(
          "The number of accelerators to attach to each machine running the job.",
        ).optional(),
        type: z.enum([
          "ACCELERATOR_TYPE_UNSPECIFIED",
          "NVIDIA_TESLA_K80",
          "NVIDIA_TESLA_P100",
          "NVIDIA_TESLA_V100",
          "NVIDIA_TESLA_P4",
          "NVIDIA_TESLA_T4",
          "NVIDIA_TESLA_A100",
          "TPU_V2",
          "TPU_V3",
          "TPU_V2_POD",
          "TPU_V3_POD",
          "TPU_V4_POD",
        ]).describe("The type of accelerator to use.").optional(),
      }).describe(
        "Represents a hardware accelerator request config. Note that the AcceleratorConfig can be used in both Jobs and Versions. Learn more about [accelerators for training](/ml-engine/docs/using-gpus) and [accelerators for online prediction](/ml-engine/docs/machine-types-online-prediction#gpus).",
      ).optional(),
      containerArgs: z.array(z.string()).describe(
        "Arguments to the entrypoint command. The following rules apply for container_command and container_args: - If you do not supply command or args: The defaults defined in the Docker image are used. - If you supply a command but no args: The default EntryPoint and the default Cmd defined in the Docker image are ignored. Your command is run without any arguments. - If you supply only args: The default Entrypoint defined in the Docker image is run with the args that you supplied. - If you supply a command and args: The default Entrypoint and the default Cmd defined in the Docker image are ignored. Your command is run with your args. It cannot be set if custom container image is not provided. Note that this field and [TrainingInput.args] are mutually exclusive, i.e., both cannot be set at the same time.",
      ).optional(),
      containerCommand: z.array(z.string()).describe(
        "The command with which the replica's custom container is run. If provided, it will override default ENTRYPOINT of the docker image. If not provided, the docker image's ENTRYPOINT is used. It cannot be set if custom container image is not provided. Note that this field and [TrainingInput.args] are mutually exclusive, i.e., both cannot be set at the same time.",
      ).optional(),
      diskConfig: z.object({
        bootDiskSizeGb: z.number().int().describe(
          "Size in GB of the boot disk (default is 100GB).",
        ).optional(),
        bootDiskType: z.string().describe(
          'Type of the boot disk (default is "pd-ssd"). Valid values: "pd-ssd" (Persistent Disk Solid State Drive) or "pd-standard" (Persistent Disk Hard Disk Drive).',
        ).optional(),
      }).describe("Represents the config of disk options.").optional(),
      imageUri: z.string().describe(
        "The Docker image to run on the replica. This image must be in Container Registry. Learn more about [configuring custom containers](/ai-platform/training/docs/distributed-training-containers).",
      ).optional(),
      tpuTfVersion: z.string().describe(
        "The AI Platform runtime version that includes a TensorFlow version matching the one used in the custom container. This field is required if the replica is a TPU worker that uses a custom container. Otherwise, do not specify this field. This must be a [runtime version that currently supports training with TPUs](/ml-engine/docs/tensorflow/runtime-version-list#tpu-support). Note that the version of TensorFlow included in a runtime version may differ from the numbering of the runtime version itself, because it may have a different [patch version](https://www.tensorflow.org/guide/version_compat#semantic_versioning_20). In this field, you must specify the runtime version (TensorFlow minor version). For example, if your custom container runs TensorFlow `1.x.y`, specify `1.x`.",
      ).optional(),
    }).describe("Represents the configuration for a replica in a cluster.")
      .optional(),
    masterType: z.string().describe(
      "Optional. Specifies the type of virtual machine to use for your training job's master worker. You must specify this field when `scaleTier` is set to `CUSTOM`. You can use certain Compute Engine machine types directly in this field. See the [list of compatible Compute Engine machine types](/ai-platform/training/docs/machine-types#compute-engine-machine-types). Alternatively, you can use the certain legacy machine types in this field. See the [list of legacy machine types](/ai-platform/training/docs/machine-types#legacy-machine-types). Finally, if you want to use a TPU for training, specify `cloud_tpu` in this field. Learn more about the [special configuration options for training with TPUs](/ai-platform/training/docs/using-tpus#configuring_a_custom_tpu_machine).",
    ).optional(),
    network: z.string().describe(
      "Optional. The full name of the [Compute Engine network](/vpc/docs/vpc) to which the Job is peered. For example, `projects/12345/global/networks/myVPC`. The format of this field is `projects/{project}/global/networks/{network}`, where {project} is a project number (like `12345`) and {network} is network name. Private services access must already be configured for the network. If left unspecified, the Job is not peered with any network. [Learn about using VPC Network Peering.](/ai-platform/training/docs/vpc-peering).",
    ).optional(),
    packageUris: z.array(z.string()).describe(
      "Required. The Google Cloud Storage location of the packages with the training program and any additional dependencies. The maximum number of package URIs is 100.",
    ).optional(),
    parameterServerConfig: z.object({
      acceleratorConfig: z.object({
        count: z.string().describe(
          "The number of accelerators to attach to each machine running the job.",
        ).optional(),
        type: z.enum([
          "ACCELERATOR_TYPE_UNSPECIFIED",
          "NVIDIA_TESLA_K80",
          "NVIDIA_TESLA_P100",
          "NVIDIA_TESLA_V100",
          "NVIDIA_TESLA_P4",
          "NVIDIA_TESLA_T4",
          "NVIDIA_TESLA_A100",
          "TPU_V2",
          "TPU_V3",
          "TPU_V2_POD",
          "TPU_V3_POD",
          "TPU_V4_POD",
        ]).describe("The type of accelerator to use.").optional(),
      }).describe(
        "Represents a hardware accelerator request config. Note that the AcceleratorConfig can be used in both Jobs and Versions. Learn more about [accelerators for training](/ml-engine/docs/using-gpus) and [accelerators for online prediction](/ml-engine/docs/machine-types-online-prediction#gpus).",
      ).optional(),
      containerArgs: z.array(z.string()).describe(
        "Arguments to the entrypoint command. The following rules apply for container_command and container_args: - If you do not supply command or args: The defaults defined in the Docker image are used. - If you supply a command but no args: The default EntryPoint and the default Cmd defined in the Docker image are ignored. Your command is run without any arguments. - If you supply only args: The default Entrypoint defined in the Docker image is run with the args that you supplied. - If you supply a command and args: The default Entrypoint and the default Cmd defined in the Docker image are ignored. Your command is run with your args. It cannot be set if custom container image is not provided. Note that this field and [TrainingInput.args] are mutually exclusive, i.e., both cannot be set at the same time.",
      ).optional(),
      containerCommand: z.array(z.string()).describe(
        "The command with which the replica's custom container is run. If provided, it will override default ENTRYPOINT of the docker image. If not provided, the docker image's ENTRYPOINT is used. It cannot be set if custom container image is not provided. Note that this field and [TrainingInput.args] are mutually exclusive, i.e., both cannot be set at the same time.",
      ).optional(),
      diskConfig: z.object({
        bootDiskSizeGb: z.number().int().describe(
          "Size in GB of the boot disk (default is 100GB).",
        ).optional(),
        bootDiskType: z.string().describe(
          'Type of the boot disk (default is "pd-ssd"). Valid values: "pd-ssd" (Persistent Disk Solid State Drive) or "pd-standard" (Persistent Disk Hard Disk Drive).',
        ).optional(),
      }).describe("Represents the config of disk options.").optional(),
      imageUri: z.string().describe(
        "The Docker image to run on the replica. This image must be in Container Registry. Learn more about [configuring custom containers](/ai-platform/training/docs/distributed-training-containers).",
      ).optional(),
      tpuTfVersion: z.string().describe(
        "The AI Platform runtime version that includes a TensorFlow version matching the one used in the custom container. This field is required if the replica is a TPU worker that uses a custom container. Otherwise, do not specify this field. This must be a [runtime version that currently supports training with TPUs](/ml-engine/docs/tensorflow/runtime-version-list#tpu-support). Note that the version of TensorFlow included in a runtime version may differ from the numbering of the runtime version itself, because it may have a different [patch version](https://www.tensorflow.org/guide/version_compat#semantic_versioning_20). In this field, you must specify the runtime version (TensorFlow minor version). For example, if your custom container runs TensorFlow `1.x.y`, specify `1.x`.",
      ).optional(),
    }).describe("Represents the configuration for a replica in a cluster.")
      .optional(),
    parameterServerCount: z.string().describe(
      "Optional. The number of parameter server replicas to use for the training job. Each replica in the cluster will be of the type specified in `parameter_server_type`. This value can only be used when `scale_tier` is set to `CUSTOM`. If you set this value, you must also set `parameter_server_type`. The default value is zero.",
    ).optional(),
    parameterServerType: z.string().describe(
      "Optional. Specifies the type of virtual machine to use for your training job's parameter server. The supported values are the same as those described in the entry for `master_type`. This value must be consistent with the category of machine type that `masterType` uses. In other words, both must be Compute Engine machine types or both must be legacy machine types. This value must be present when `scaleTier` is set to `CUSTOM` and `parameter_server_count` is greater than zero.",
    ).optional(),
    pythonModule: z.string().describe(
      "Required. The Python module name to run after installing the packages.",
    ).optional(),
    pythonVersion: z.string().describe(
      "Optional. The version of Python used in training. You must either specify this field or specify `masterConfig.imageUri`. The following Python versions are available: * Python '3.7' is available when `runtime_version` is set to '1.15' or later. * Python '3.5' is available when `runtime_version` is set to a version from '1.4' to '1.14'. * Python '2.7' is available when `runtime_version` is set to '1.15' or earlier. Read more about the Python versions available for [each runtime version](/ml-engine/docs/runtime-version-list).",
    ).optional(),
    region: z.string().describe(
      "Required. The region to run the training job in. See the [available regions](/ai-platform/training/docs/regions) for AI Platform Training.",
    ).optional(),
    runtimeVersion: z.string().describe(
      "Optional. The AI Platform runtime version to use for training. You must either specify this field or specify `masterConfig.imageUri`. For more information, see the [runtime version list](/ai-platform/training/docs/runtime-version-list) and learn [how to manage runtime versions](/ai-platform/training/docs/versioning).",
    ).optional(),
    scaleTier: z.enum([
      "BASIC",
      "STANDARD_1",
      "PREMIUM_1",
      "BASIC_GPU",
      "BASIC_TPU",
      "CUSTOM",
    ]).describe(
      "Required. Specifies the machine types, the number of replicas for workers and parameter servers.",
    ).optional(),
    scheduling: z.object({
      maxRunningTime: z.string().describe(
        "Optional. The maximum job running time, expressed in seconds. The field can contain up to nine fractional digits, terminated by `s`. If not specified, this field defaults to `604800s` (seven days). If the training job is still running after this duration, AI Platform Training cancels it. The duration is measured from when the job enters the `RUNNING` state; therefore it does not overlap with the duration limited by Scheduling.max_wait_time. For example, if you want to ensure your job runs for no more than 2 hours, set this field to `7200s` (2 hours * 60 minutes / hour * 60 seconds / minute). If you submit your training job using the `gcloud` tool, you can [specify this field in a `config.yaml` file](/ai-platform/training/docs/training-jobs#formatting_your_configuration_parameters). For example: ` yaml trainingInput: scheduling: maxRunningTime: 7200s `",
      ).optional(),
      maxWaitTime: z.string().describe(
        "Optional. The maximum job wait time, expressed in seconds. The field can contain up to nine fractional digits, terminated by `s`. If not specified, there is no limit to the wait time. The minimum for this field is `1800s` (30 minutes). If the training job has not entered the `RUNNING` state after this duration, AI Platform Training cancels it. After the job begins running, it can no longer be cancelled due to the maximum wait time. Therefore the duration limited by this field does not overlap with the duration limited by Scheduling.max_running_time. For example, if the job temporarily stops running and retries due to a [VM restart](/ai-platform/training/docs/overview#restarts), this cannot lead to a maximum wait time cancellation. However, independently of this constraint, AI Platform Training might stop a job if there are too many retries due to exhausted resources in a region. The following example describes how you might use this field: To cancel your job if it doesn't start running within 1 hour, set this field to `3600s` (1 hour * 60 minutes / hour * 60 seconds / minute). If the job is still in the `QUEUED` or `PREPARING` state after an hour of waiting, AI Platform Training cancels the job. If you submit your training job using the `gcloud` tool, you can [specify this field in a `config.yaml` file](/ai-platform/training/docs/training-jobs#formatting_your_configuration_parameters). For example: ` yaml trainingInput: scheduling: maxWaitTime: 3600s `",
      ).optional(),
      priority: z.number().int().describe(
        "Optional. Job scheduling will be based on this priority, which in the range [0, 1000]. The bigger the number, the higher the priority. Default to 0 if not set. If there are multiple jobs requesting same type of accelerators, the high priority job will be scheduled prior to ones with low priority.",
      ).optional(),
    }).describe("All parameters related to scheduling of training jobs.")
      .optional(),
    serviceAccount: z.string().describe(
      "Optional. The email address of a service account to use when running the training appplication. You must have the `iam.serviceAccounts.actAs` permission for the specified service account. In addition, the AI Platform Training Google-managed service account must have the `roles/iam.serviceAccountAdmin` role for the specified service account. [Learn more about configuring a service account.](/ai-platform/training/docs/custom-service-account) If not specified, the AI Platform Training Google-managed service account is used by default.",
    ).optional(),
    useChiefInTfConfig: z.boolean().describe(
      "Optional. Use `chief` instead of `master` in the `TF_CONFIG` environment variable when training with a custom container. Defaults to `false`. [Learn more about this field.](/ai-platform/training/docs/distributed-training-details#chief-versus-master) This field has no effect for training jobs that don't use a custom container.",
    ).optional(),
    workerConfig: z.object({
      acceleratorConfig: z.object({
        count: z.string().describe(
          "The number of accelerators to attach to each machine running the job.",
        ).optional(),
        type: z.enum([
          "ACCELERATOR_TYPE_UNSPECIFIED",
          "NVIDIA_TESLA_K80",
          "NVIDIA_TESLA_P100",
          "NVIDIA_TESLA_V100",
          "NVIDIA_TESLA_P4",
          "NVIDIA_TESLA_T4",
          "NVIDIA_TESLA_A100",
          "TPU_V2",
          "TPU_V3",
          "TPU_V2_POD",
          "TPU_V3_POD",
          "TPU_V4_POD",
        ]).describe("The type of accelerator to use.").optional(),
      }).describe(
        "Represents a hardware accelerator request config. Note that the AcceleratorConfig can be used in both Jobs and Versions. Learn more about [accelerators for training](/ml-engine/docs/using-gpus) and [accelerators for online prediction](/ml-engine/docs/machine-types-online-prediction#gpus).",
      ).optional(),
      containerArgs: z.array(z.string()).describe(
        "Arguments to the entrypoint command. The following rules apply for container_command and container_args: - If you do not supply command or args: The defaults defined in the Docker image are used. - If you supply a command but no args: The default EntryPoint and the default Cmd defined in the Docker image are ignored. Your command is run without any arguments. - If you supply only args: The default Entrypoint defined in the Docker image is run with the args that you supplied. - If you supply a command and args: The default Entrypoint and the default Cmd defined in the Docker image are ignored. Your command is run with your args. It cannot be set if custom container image is not provided. Note that this field and [TrainingInput.args] are mutually exclusive, i.e., both cannot be set at the same time.",
      ).optional(),
      containerCommand: z.array(z.string()).describe(
        "The command with which the replica's custom container is run. If provided, it will override default ENTRYPOINT of the docker image. If not provided, the docker image's ENTRYPOINT is used. It cannot be set if custom container image is not provided. Note that this field and [TrainingInput.args] are mutually exclusive, i.e., both cannot be set at the same time.",
      ).optional(),
      diskConfig: z.object({
        bootDiskSizeGb: z.number().int().describe(
          "Size in GB of the boot disk (default is 100GB).",
        ).optional(),
        bootDiskType: z.string().describe(
          'Type of the boot disk (default is "pd-ssd"). Valid values: "pd-ssd" (Persistent Disk Solid State Drive) or "pd-standard" (Persistent Disk Hard Disk Drive).',
        ).optional(),
      }).describe("Represents the config of disk options.").optional(),
      imageUri: z.string().describe(
        "The Docker image to run on the replica. This image must be in Container Registry. Learn more about [configuring custom containers](/ai-platform/training/docs/distributed-training-containers).",
      ).optional(),
      tpuTfVersion: z.string().describe(
        "The AI Platform runtime version that includes a TensorFlow version matching the one used in the custom container. This field is required if the replica is a TPU worker that uses a custom container. Otherwise, do not specify this field. This must be a [runtime version that currently supports training with TPUs](/ml-engine/docs/tensorflow/runtime-version-list#tpu-support). Note that the version of TensorFlow included in a runtime version may differ from the numbering of the runtime version itself, because it may have a different [patch version](https://www.tensorflow.org/guide/version_compat#semantic_versioning_20). In this field, you must specify the runtime version (TensorFlow minor version). For example, if your custom container runs TensorFlow `1.x.y`, specify `1.x`.",
      ).optional(),
    }).describe("Represents the configuration for a replica in a cluster.")
      .optional(),
    workerCount: z.string().describe(
      "Optional. The number of worker replicas to use for the training job. Each replica in the cluster will be of the type specified in `worker_type`. This value can only be used when `scale_tier` is set to `CUSTOM`. If you set this value, you must also set `worker_type`. The default value is zero.",
    ).optional(),
    workerType: z.string().describe(
      "Optional. Specifies the type of virtual machine to use for your training job's worker nodes. The supported values are the same as those described in the entry for `masterType`. This value must be consistent with the category of machine type that `masterType` uses. In other words, both must be Compute Engine machine types or both must be legacy machine types. If you use `cloud_tpu` for this value, see special instructions for [configuring a custom TPU machine](/ml-engine/docs/tensorflow/using-tpus#configuring_a_custom_tpu_machine). This value must be present when `scaleTier` is set to `CUSTOM` and `workerCount` is greater than zero.",
    ).optional(),
  }).describe(
    "Represents input parameters for a training job. When using the gcloud command to submit your training job, you can specify the input parameters as command-line arguments and/or in a YAML configuration file referenced from the --config command-line argument. For details, see the guide to [submitting a training job](/ai-platform/training/docs/training-jobs).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud AI Platform Training & Prediction Jobs. Registered at `@swamp/gcp/ml/jobs`. */
export const model = {
  type: "@swamp/gcp/ml/jobs",
  version: "2026.05.21.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Represents a training or prediction job.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a jobs",
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
        if (g["jobId"] !== undefined) body["jobId"] = g["jobId"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["predictionInput"] !== undefined) {
          body["predictionInput"] = g["predictionInput"];
        }
        if (g["predictionOutput"] !== undefined) {
          body["predictionOutput"] = g["predictionOutput"];
        }
        if (g["trainingInput"] !== undefined) {
          body["trainingInput"] = g["trainingInput"];
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
              "readyValues": ["RUNNING", "SUCCEEDED"],
              "failedValues": ["FAILED"],
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
      description: "Update jobs attributes",
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
        if (g["jobId"] !== undefined) body["jobId"] = g["jobId"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["predictionInput"] !== undefined) {
          body["predictionInput"] = g["predictionInput"];
        }
        if (g["predictionOutput"] !== undefined) {
          body["predictionOutput"] = g["predictionOutput"];
        }
        if (g["trainingInput"] !== undefined) {
          body["trainingInput"] = g["trainingInput"];
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
              "readyValues": ["RUNNING", "SUCCEEDED"],
              "failedValues": ["FAILED"],
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
    cancel: {
      description: "cancel",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
            "id": "ml.projects.jobs.cancel",
            "path": "v1/{+name}:cancel",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
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
            "id": "ml.projects.jobs.getIamPolicy",
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
            "id": "ml.projects.jobs.setIamPolicy",
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
            "id": "ml.projects.jobs.testIamPermissions",
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
