// Auto-generated extension model for @swamp/gcp/aiplatform/schedules
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Vertex AI Schedules.
 *
 * An instance of a Schedule periodically schedules runs to make API calls based on user specified time specification and API request type.
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
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/schedules/${shortName}`;
}

const BASE_URL = "https://aiplatform.googleapis.com/";

const GET_CONFIG = {
  "id": "aiplatform.projects.locations.schedules.get",
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
  "id": "aiplatform.projects.locations.schedules.create",
  "path": "v1/{+parent}/schedules",
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
  "id": "aiplatform.projects.locations.schedules.patch",
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

const DELETE_CONFIG = {
  "id": "aiplatform.projects.locations.schedules.delete",
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
  "id": "aiplatform.projects.locations.schedules.list",
  "path": "v1/{+parent}/schedules",
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
  allowQueueing: z.boolean().describe(
    "Optional. Whether new scheduled runs can be queued when max_concurrent_runs limit is reached. If set to true, new runs will be queued instead of skipped. Default to false.",
  ).optional(),
  createNotebookExecutionJobRequest: z.object({
    notebookExecutionJob: z.object({
      createTime: z.string().describe(
        "Output only. Timestamp when this NotebookExecutionJob was created.",
      ).optional(),
      customEnvironmentSpec: z.object({
        machineSpec: z.object({
          acceleratorCount: z.number().int().describe(
            "The number of accelerators to attach to the machine. For accelerator optimized machine types (https://cloud.google.com/compute/docs/accelerator-optimized-machines), One may set the accelerator_count from 1 to N for machine with N GPUs. If accelerator_count is less than or equal to N / 2, Vertex will co-schedule the replicas of the model into the same VM to save cost. For example, if the machine type is a3-highgpu-8g, which has 8 H100 GPUs, one can set accelerator_count to 1 to 8. If accelerator_count is 1, 2, 3, or 4, Vertex will co-schedule 8, 4, 2, or 2 replicas of the model into the same VM to save cost. When co-scheduling, CPU, memory and storage on the VM will be distributed to replicas on the VM. For example, one can expect a co-scheduled replica requesting 2 GPUs out of a 8-GPU VM will receive 25% of the CPU, memory and storage of the VM. Note that the feature is not compatible with multihost_gpu_node_count. When multihost_gpu_node_count is set, the co-scheduling will not be enabled.",
          ).optional(),
          acceleratorType: z.enum([
            "ACCELERATOR_TYPE_UNSPECIFIED",
            "NVIDIA_TESLA_K80",
            "NVIDIA_TESLA_P100",
            "NVIDIA_TESLA_V100",
            "NVIDIA_TESLA_P4",
            "NVIDIA_TESLA_T4",
            "NVIDIA_TESLA_A100",
            "NVIDIA_A100_80GB",
            "NVIDIA_L4",
            "NVIDIA_H100_80GB",
            "NVIDIA_H100_MEGA_80GB",
            "NVIDIA_H200_141GB",
            "NVIDIA_B200",
            "NVIDIA_GB200",
            "NVIDIA_RTX_PRO_6000",
            "TPU_V2",
            "TPU_V3",
            "TPU_V4_POD",
            "TPU_V5_LITEPOD",
          ]).describe(
            "Immutable. The type of accelerator(s) that may be attached to the machine as per accelerator_count.",
          ).optional(),
          gpuPartitionSize: z.string().describe(
            'Optional. Immutable. The Nvidia GPU partition size. When specified, the requested accelerators will be partitioned into smaller GPU partitions. For example, if the request is for 8 units of NVIDIA A100 GPUs, and gpu_partition_size="1g.10gb", the service will create 8 * 7 = 56 partitioned MIG instances. The partition size must be a value supported by the requested accelerator. Refer to [Nvidia GPU Partitioning](https://cloud.google.com/kubernetes-engine/docs/how-to/gpus-multi#multi-instance_gpu_partitions) for the available partition sizes. If set, the accelerator_count should be set to 1.',
          ).optional(),
          machineType: z.string().describe(
            "Immutable. The type of the machine. See the [list of machine types supported for prediction](https://cloud.google.com/vertex-ai/docs/predictions/configure-compute#machine-types) See the [list of machine types supported for custom training](https://cloud.google.com/vertex-ai/docs/training/configure-compute#machine-types). For DeployedModel this field is optional, and the default value is `n1-standard-2`. For BatchPredictionJob or as part of WorkerPoolSpec this field is required.",
          ).optional(),
          reservationAffinity: z.object({
            key: z.unknown().describe(
              "Optional. Corresponds to the label key of a reservation resource. To target a SPECIFIC_RESERVATION by name, use `compute.googleapis.com/reservation-name` as the key and specify the name of your reservation as its value.",
            ).optional(),
            reservationAffinityType: z.unknown().describe(
              "Required. Specifies the reservation affinity type.",
            ).optional(),
            values: z.unknown().describe(
              "Optional. Corresponds to the label values of a reservation resource. This must be the full resource name of the reservation or reservation block.",
            ).optional(),
          }).describe(
            "A ReservationAffinity can be used to configure a Vertex AI resource (e.g., a DeployedModel) to draw its Compute Engine resources from a Shared Reservation, or exclusively from on-demand capacity.",
          ).optional(),
          tpuTopology: z.string().describe(
            'Immutable. The topology of the TPUs. Corresponds to the TPU topologies available from GKE. (Example: tpu_topology: "2x2x1").',
          ).optional(),
        }).describe("Specification of a single machine.").optional(),
        networkSpec: z.object({
          enableInternetAccess: z.boolean().describe(
            "Whether to enable public internet access. Default false.",
          ).optional(),
          network: z.string().describe(
            "The full name of the Google Compute Engine [network](https://cloud.google.com//compute/docs/networks-and-firewalls#networks)",
          ).optional(),
          subnetwork: z.string().describe(
            "The name of the subnet that this instance is in. Format: `projects/{project_id_or_number}/regions/{region}/subnetworks/{subnetwork_id}`",
          ).optional(),
        }).describe("Network spec.").optional(),
        persistentDiskSpec: z.object({
          diskSizeGb: z.string().describe(
            "Size in GB of the disk (default is 100GB).",
          ).optional(),
          diskType: z.string().describe(
            'Type of the disk (default is "pd-standard"). Valid values: "pd-ssd" (Persistent Disk Solid State Drive) "pd-standard" (Persistent Disk Hard Disk Drive) "pd-balanced" (Balanced Persistent Disk) "pd-extreme" (Extreme Persistent Disk)',
          ).optional(),
        }).describe("Represents the spec of persistent disk options.")
          .optional(),
      }).describe("Compute configuration to use for an execution job.")
        .optional(),
      dataformRepositorySource: z.object({
        commitSha: z.string().describe(
          "The commit SHA to read repository with. If unset, the file will be read at HEAD.",
        ).optional(),
        dataformRepositoryResourceName: z.string().describe(
          "The resource name of the Dataform Repository. Format: `projects/{project_id}/locations/{location}/repositories/{repository_id}`",
        ).optional(),
      }).describe("The Dataform Repository containing the input notebook.")
        .optional(),
      directNotebookSource: z.object({
        content: z.string().describe(
          "The base64-encoded contents of the input notebook file.",
        ).optional(),
      }).describe("The content of the input notebook in ipynb format.")
        .optional(),
      displayName: z.string().describe(
        "The display name of the NotebookExecutionJob. The name can be up to 128 characters long and can consist of any UTF-8 characters.",
      ).optional(),
      encryptionSpec: z.object({
        kmsKeyName: z.string().describe(
          "Required. Resource name of the Cloud KMS key used to protect the resource. The Cloud KMS key must be in the same region as the resource. It must have the format `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
        ).optional(),
      }).describe(
        "Represents a customer-managed encryption key specification that can be applied to a Vertex AI resource.",
      ).optional(),
      executionTimeout: z.string().describe(
        "Max running time of the execution job in seconds (default 86400s / 24 hrs).",
      ).optional(),
      executionUser: z.string().describe(
        "The user email to run the execution as. Only supported by Colab runtimes.",
      ).optional(),
      gcsNotebookSource: z.object({
        generation: z.string().describe(
          "The version of the Cloud Storage object to read. If unset, the current version of the object is read. See https://cloud.google.com/storage/docs/metadata#generation-number.",
        ).optional(),
        uri: z.string().describe(
          "The Cloud Storage uri pointing to the ipynb file. Format: `gs://bucket/notebook_file.ipynb`",
        ).optional(),
      }).describe("The Cloud Storage uri for the input notebook.").optional(),
      gcsOutputUri: z.string().describe(
        "The Cloud Storage location to upload the result to. Format: `gs://bucket-name`",
      ).optional(),
      jobState: z.enum([
        "JOB_STATE_UNSPECIFIED",
        "JOB_STATE_QUEUED",
        "JOB_STATE_PENDING",
        "JOB_STATE_RUNNING",
        "JOB_STATE_SUCCEEDED",
        "JOB_STATE_FAILED",
        "JOB_STATE_CANCELLING",
        "JOB_STATE_CANCELLED",
        "JOB_STATE_PAUSED",
        "JOB_STATE_EXPIRED",
        "JOB_STATE_UPDATING",
        "JOB_STATE_PARTIALLY_SUCCEEDED",
      ]).describe("Output only. The state of the NotebookExecutionJob.")
        .optional(),
      kernelName: z.string().describe(
        "The name of the kernel to use during notebook execution. If unset, the default kernel is used.",
      ).optional(),
      labels: z.record(z.string(), z.string()).describe(
        'The labels with user-defined metadata to organize NotebookExecutionJobs. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. See https://goo.gl/xmQnxf for more information and examples of labels. System reserved label keys are prefixed with "aiplatform.googleapis.com/" and are immutable.',
      ).optional(),
      name: z.string().describe(
        "Output only. The resource name of this NotebookExecutionJob. Format: `projects/{project_id}/locations/{location}/notebookExecutionJobs/{job_id}`",
      ).optional(),
      notebookRuntimeTemplateResourceName: z.string().describe(
        "The NotebookRuntimeTemplate to source compute configuration from.",
      ).optional(),
      scheduleResourceName: z.string().describe(
        "The Schedule resource name if this job is triggered by one. Format: `projects/{project_id}/locations/{location}/schedules/{schedule_id}`",
      ).optional(),
      serviceAccount: z.string().describe(
        "The service account to run the execution as.",
      ).optional(),
      status: z.object({
        code: z.number().int().describe(
          "The status code, which should be an enum value of google.rpc.Code.",
        ).optional(),
        details: z.array(z.record(z.string(), z.unknown())).describe(
          "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
        ).optional(),
        message: z.string().describe(
          "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
        ).optional(),
      }).describe(
        "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
      ).optional(),
      updateTime: z.string().describe(
        "Output only. Timestamp when this NotebookExecutionJob was most recently updated.",
      ).optional(),
      workbenchRuntime: z.object({}).describe(
        "Configuration for a Workbench Instances-based environment.",
      ).optional(),
    }).describe(
      "NotebookExecutionJob represents an instance of a notebook execution.",
    ).optional(),
    notebookExecutionJobId: z.string().describe(
      "Optional. User specified ID for the NotebookExecutionJob.",
    ).optional(),
    parent: z.string().describe(
      "Required. The resource name of the Location to create the NotebookExecutionJob. Format: `projects/{project}/locations/{location}`",
    ).optional(),
  }).describe(
    "Request message for [NotebookService.CreateNotebookExecutionJob]",
  ).optional(),
  createPipelineJobRequest: z.object({
    parent: z.string().describe(
      "Required. The resource name of the Location to create the PipelineJob in. Format: `projects/{project}/locations/{location}`",
    ).optional(),
    pipelineJob: z.object({
      createTime: z.string().describe("Output only. Pipeline creation time.")
        .optional(),
      displayName: z.string().describe(
        "The display name of the Pipeline. The name can be up to 128 characters long and can consist of any UTF-8 characters.",
      ).optional(),
      encryptionSpec: z.object({
        kmsKeyName: z.string().describe(
          "Required. Resource name of the Cloud KMS key used to protect the resource. The Cloud KMS key must be in the same region as the resource. It must have the format `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
        ).optional(),
      }).describe(
        "Represents a customer-managed encryption key specification that can be applied to a Vertex AI resource.",
      ).optional(),
      endTime: z.string().describe("Output only. Pipeline end time.")
        .optional(),
      error: z.object({
        code: z.number().int().describe(
          "The status code, which should be an enum value of google.rpc.Code.",
        ).optional(),
        details: z.array(z.record(z.string(), z.unknown())).describe(
          "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
        ).optional(),
        message: z.string().describe(
          "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
        ).optional(),
      }).describe(
        "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
      ).optional(),
      jobDetail: z.object({
        pipelineContext: z.object({
          createTime: z.string().describe(
            "Output only. Timestamp when this Context was created.",
          ).optional(),
          description: z.string().describe("Description of the Context")
            .optional(),
          displayName: z.string().describe(
            "User provided display name of the Context. May be up to 128 Unicode characters.",
          ).optional(),
          etag: z.string().describe(
            'An eTag used to perform consistent read-modify-write updates. If not set, a blind "overwrite" update happens.',
          ).optional(),
          labels: z.record(z.string(), z.unknown()).describe(
            "The labels with user-defined metadata to organize your Contexts. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. No more than 64 user labels can be associated with one Context (System labels are excluded).",
          ).optional(),
          metadata: z.record(z.string(), z.unknown()).describe(
            "Properties of the Context. Top level metadata keys' heading and trailing spaces will be trimmed. The size of this field should not exceed 200KB.",
          ).optional(),
          name: z.string().describe(
            "Immutable. The resource name of the Context.",
          ).optional(),
          parentContexts: z.array(z.unknown()).describe(
            "Output only. A list of resource names of Contexts that are parents of this Context. A Context may have at most 10 parent_contexts.",
          ).optional(),
          schemaTitle: z.string().describe(
            "The title of the schema describing the metadata. Schema title and version is expected to be registered in earlier Create Schema calls. And both are used together as unique identifiers to identify schemas within the local metadata store.",
          ).optional(),
          schemaVersion: z.string().describe(
            "The version of the schema in schema_name to use. Schema title and version is expected to be registered in earlier Create Schema calls. And both are used together as unique identifiers to identify schemas within the local metadata store.",
          ).optional(),
          updateTime: z.string().describe(
            "Output only. Timestamp when this Context was last updated.",
          ).optional(),
        }).describe("Instance of a general context.").optional(),
        pipelineRunContext: z.object({
          createTime: z.string().describe(
            "Output only. Timestamp when this Context was created.",
          ).optional(),
          description: z.string().describe("Description of the Context")
            .optional(),
          displayName: z.string().describe(
            "User provided display name of the Context. May be up to 128 Unicode characters.",
          ).optional(),
          etag: z.string().describe(
            'An eTag used to perform consistent read-modify-write updates. If not set, a blind "overwrite" update happens.',
          ).optional(),
          labels: z.record(z.string(), z.unknown()).describe(
            "The labels with user-defined metadata to organize your Contexts. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. No more than 64 user labels can be associated with one Context (System labels are excluded).",
          ).optional(),
          metadata: z.record(z.string(), z.unknown()).describe(
            "Properties of the Context. Top level metadata keys' heading and trailing spaces will be trimmed. The size of this field should not exceed 200KB.",
          ).optional(),
          name: z.string().describe(
            "Immutable. The resource name of the Context.",
          ).optional(),
          parentContexts: z.array(z.unknown()).describe(
            "Output only. A list of resource names of Contexts that are parents of this Context. A Context may have at most 10 parent_contexts.",
          ).optional(),
          schemaTitle: z.string().describe(
            "The title of the schema describing the metadata. Schema title and version is expected to be registered in earlier Create Schema calls. And both are used together as unique identifiers to identify schemas within the local metadata store.",
          ).optional(),
          schemaVersion: z.string().describe(
            "The version of the schema in schema_name to use. Schema title and version is expected to be registered in earlier Create Schema calls. And both are used together as unique identifiers to identify schemas within the local metadata store.",
          ).optional(),
          updateTime: z.string().describe(
            "Output only. Timestamp when this Context was last updated.",
          ).optional(),
        }).describe("Instance of a general context.").optional(),
        taskDetails: z.array(z.object({
          createTime: z.unknown().describe("Output only. Task create time.")
            .optional(),
          endTime: z.unknown().describe("Output only. Task end time.")
            .optional(),
          error: z.unknown().describe(
            "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
          ).optional(),
          execution: z.unknown().describe("Instance of a general execution.")
            .optional(),
          executorDetail: z.unknown().describe(
            "The runtime detail of a pipeline executor.",
          ).optional(),
          inputs: z.unknown().describe(
            "Output only. The runtime input artifacts of the task.",
          ).optional(),
          outputs: z.unknown().describe(
            "Output only. The runtime output artifacts of the task.",
          ).optional(),
          parentTaskId: z.unknown().describe(
            "Output only. The id of the parent task if the task is within a component scope. Empty if the task is at the root level.",
          ).optional(),
          pipelineTaskStatus: z.unknown().describe(
            "Output only. A list of task status. This field keeps a record of task status evolving over time.",
          ).optional(),
          startTime: z.unknown().describe("Output only. Task start time.")
            .optional(),
          state: z.unknown().describe("Output only. State of the task.")
            .optional(),
          taskId: z.unknown().describe(
            "Output only. The system generated ID of the task.",
          ).optional(),
          taskName: z.unknown().describe(
            "Output only. The user specified name of the task that is defined in pipeline_spec.",
          ).optional(),
          taskUniqueName: z.unknown().describe(
            'Output only. The unique name of a task. This field is used by rerun pipeline job. Console UI and Vertex AI SDK will support triggering pipeline job reruns. The name is constructed by concatenating all the parent tasks name with the task name. For example, if a task named "child_task" has a parent task named "parent_task_1" and parent task 1 has a parent task named "parent_task_2", the task unique name will be "parent_task_2.parent_task_1.child_task".',
          ).optional(),
        })).describe(
          "Output only. The runtime details of the tasks under the pipeline.",
        ).optional(),
      }).describe("The runtime detail of PipelineJob.").optional(),
      labels: z.record(z.string(), z.string()).describe(
        "The labels with user-defined metadata to organize PipelineJob. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. See https://goo.gl/xmQnxf for more information and examples of labels. Note there is some reserved label key for Vertex AI Pipelines. - `vertex-ai-pipelines-run-billing-id`, user set value will get overrided.",
      ).optional(),
      name: z.string().describe(
        "Output only. The resource name of the PipelineJob.",
      ).optional(),
      network: z.string().describe(
        "The full name of the Compute Engine [network](/compute/docs/networks-and-firewalls#networks) to which the Pipeline Job's workload should be peered. For example, `projects/12345/global/networks/myVPC`. [Format](/compute/docs/reference/rest/v1/networks/insert) is of the form `projects/{project}/global/networks/{network}`. Where {project} is a project number, as in `12345`, and {network} is a network name. Private services access must already be configured for the network. Pipeline job will apply the network configuration to the Google Cloud resources being launched, if applied, such as Vertex AI Training or Dataflow job. If left unspecified, the workload is not peered with any network.",
      ).optional(),
      pipelineSpec: z.record(z.string(), z.string()).describe(
        "A compiled definition of a pipeline, represented as a `JSON` object. Defines the structure of the pipeline, including its components, tasks, and parameters. This specification is generated by compiling a pipeline function defined in `Python` using the `Kubeflow Pipelines SDK`.",
      ).optional(),
      preflightValidations: z.boolean().describe(
        "Optional. Whether to do component level validations before job creation.",
      ).optional(),
      pscInterfaceConfig: z.object({
        dnsPeeringConfigs: z.array(z.object({
          domain: z.unknown().describe(
            'Required. The DNS name suffix of the zone being peered to, e.g., "my-internal-domain.corp.". Must end with a dot.',
          ).optional(),
          targetNetwork: z.unknown().describe(
            "Required. The VPC network name in the target_project where the DNS zone specified by 'domain' is visible.",
          ).optional(),
          targetProject: z.unknown().describe(
            "Required. The project ID hosting the Cloud DNS managed zone that contains the 'domain'. The Vertex AI Service Agent requires the dns.peer role on this project.",
          ).optional(),
        })).describe(
          "Optional. DNS peering configurations. When specified, Vertex AI will attempt to configure DNS peering zones in the tenant project VPC to resolve the specified domains using the target network's Cloud DNS. The user must grant the dns.peer role to the Vertex AI Service Agent on the target project.",
        ).optional(),
        networkAttachment: z.string().describe(
          "Optional. The name of the Compute Engine [network attachment](https://cloud.google.com/vpc/docs/about-network-attachments) to attach to the resource within the region and user project. To specify this field, you must have already [created a network attachment] (https://cloud.google.com/vpc/docs/create-manage-network-attachments#create-network-attachments). This field is only used for resources using PSC-I.",
        ).optional(),
      }).describe("Configuration for PSC-I.").optional(),
      reservedIpRanges: z.array(z.string()).describe(
        "A list of names for the reserved ip ranges under the VPC network that can be used for this Pipeline Job's workload. If set, we will deploy the Pipeline Job's workload within the provided ip ranges. Otherwise, the job will be deployed to any ip ranges under the provided VPC network. Example: ['vertex-ai-ip-range'].",
      ).optional(),
      runtimeConfig: z.object({
        failurePolicy: z.enum([
          "PIPELINE_FAILURE_POLICY_UNSPECIFIED",
          "PIPELINE_FAILURE_POLICY_FAIL_SLOW",
          "PIPELINE_FAILURE_POLICY_FAIL_FAST",
        ]).describe(
          "Represents the failure policy of a pipeline. Currently, the default of a pipeline is that the pipeline will continue to run until no more tasks can be executed, also known as PIPELINE_FAILURE_POLICY_FAIL_SLOW. However, if a pipeline is set to PIPELINE_FAILURE_POLICY_FAIL_FAST, it will stop scheduling any new tasks when a task has failed. Any scheduled tasks will continue to completion.",
        ).optional(),
        gcsOutputDirectory: z.string().describe(
          "Required. A path in a Cloud Storage bucket, which will be treated as the root output directory of the pipeline. It is used by the system to generate the paths of output artifacts. The artifact paths are generated with a sub-path pattern `{job_id}/{task_id}/{output_key}` under the specified output directory. The service account specified in this pipeline must have the `storage.objects.get` and `storage.objects.create` permissions for this bucket.",
        ).optional(),
        inputArtifacts: z.record(
          z.string(),
          z.object({
            artifactId: z.unknown().describe(
              "Artifact resource id from MLMD. Which is the last portion of an artifact resource name: `projects/{project}/locations/{location}/metadataStores/default/artifacts/{artifact_id}`. The artifact must stay within the same project, location and default metadatastore as the pipeline.",
            ).optional(),
          }),
        ).describe(
          "The runtime artifacts of the PipelineJob. The key will be the input artifact name and the value would be one of the InputArtifact.",
        ).optional(),
        parameterValues: z.record(z.string(), z.string()).describe(
          "The runtime parameters of the PipelineJob. The parameters will be passed into PipelineJob.pipeline_spec to replace the placeholders at runtime. This field is used by pipelines built using `PipelineJob.pipeline_spec.schema_version` 2.1.0, such as pipelines built using Kubeflow Pipelines SDK 1.9 or higher and the v2 DSL.",
        ).optional(),
        parameters: z.record(
          z.string(),
          z.object({
            doubleValue: z.unknown().describe("A double value.").optional(),
            intValue: z.unknown().describe("An integer value.").optional(),
            stringValue: z.unknown().describe("A string value.").optional(),
          }),
        ).describe(
          "Deprecated. Use RuntimeConfig.parameter_values instead. The runtime parameters of the PipelineJob. The parameters will be passed into PipelineJob.pipeline_spec to replace the placeholders at runtime. This field is used by pipelines built using `PipelineJob.pipeline_spec.schema_version` 2.0.0 or lower, such as pipelines built using Kubeflow Pipelines SDK 1.8 or lower.",
        ).optional(),
      }).describe("The runtime config of a PipelineJob.").optional(),
      scheduleName: z.string().describe(
        "Output only. The schedule resource name. Only returned if the Pipeline is created by Schedule API.",
      ).optional(),
      serviceAccount: z.string().describe(
        "The service account that the pipeline workload runs as. If not specified, the Compute Engine default service account in the project will be used. See https://cloud.google.com/compute/docs/access/service-accounts#default_service_account Users starting the pipeline must have the `iam.serviceAccounts.actAs` permission on this service account.",
      ).optional(),
      startTime: z.string().describe("Output only. Pipeline start time.")
        .optional(),
      state: z.enum([
        "PIPELINE_STATE_UNSPECIFIED",
        "PIPELINE_STATE_QUEUED",
        "PIPELINE_STATE_PENDING",
        "PIPELINE_STATE_RUNNING",
        "PIPELINE_STATE_SUCCEEDED",
        "PIPELINE_STATE_FAILED",
        "PIPELINE_STATE_CANCELLING",
        "PIPELINE_STATE_CANCELLED",
        "PIPELINE_STATE_PAUSED",
      ]).describe("Output only. The detailed state of the job.").optional(),
      templateMetadata: z.object({
        version: z.string().describe(
          'The version_name in artifact registry. Will always be presented in output if the PipelineJob.template_uri is from supported template registry. Format is "sha256:abcdef123456...".',
        ).optional(),
      }).describe(
        "Pipeline template metadata if PipelineJob.template_uri is from supported template registry. Currently, the only supported registry is Artifact Registry.",
      ).optional(),
      templateUri: z.string().describe(
        "A template uri from where the PipelineJob.pipeline_spec, if empty, will be downloaded. Currently, only uri from Vertex Template Registry & Gallery is supported. Reference to https://cloud.google.com/vertex-ai/docs/pipelines/create-pipeline-template.",
      ).optional(),
      updateTime: z.string().describe(
        "Output only. Timestamp when this PipelineJob was most recently updated.",
      ).optional(),
    }).describe("An instance of a machine learning PipelineJob.").optional(),
    pipelineJobId: z.string().describe(
      "The ID to use for the PipelineJob, which will become the final component of the PipelineJob name. If not provided, an ID will be automatically generated. This value should be less than 128 characters, and valid characters are `/a-z-/`.",
    ).optional(),
  }).describe("Request message for PipelineService.CreatePipelineJob.")
    .optional(),
  cron: z.string().describe(
    'Cron schedule (https://en.wikipedia.org/wiki/Cron) to launch scheduled runs. To explicitly set a timezone to the cron tab, apply a prefix in the cron tab: "CRON_TZ=${IANA_TIME_ZONE}" or "TZ=${IANA_TIME_ZONE}". The ${IANA_TIME_ZONE} may only be a valid string from IANA time zone database. For example, "CRON_TZ=America/New_York 1 * * * *", or "TZ=America/New_York 1 * * * *".',
  ).optional(),
  displayName: z.string().describe(
    "Required. User provided name of the Schedule. The name can be up to 128 characters long and can consist of any UTF-8 characters.",
  ).optional(),
  endTime: z.string().describe(
    "Optional. Timestamp after which no new runs can be scheduled. If specified, The schedule will be completed when either end_time is reached or when scheduled_run_count >= max_run_count. If not specified, new runs will keep getting scheduled until this Schedule is paused or deleted. Already scheduled runs will be allowed to complete. Unset if not specified.",
  ).optional(),
  lastScheduledRunResponse: z.object({
    runResponse: z.string().describe("The response of the scheduled run.")
      .optional(),
    scheduledRunTime: z.string().describe(
      "The scheduled run time based on the user-specified schedule.",
    ).optional(),
  }).describe("Status of a scheduled run.").optional(),
  maxConcurrentActiveRunCount: z.string().describe(
    "Optional. Specifies the maximum number of active runs that can be executed concurrently for this Schedule. This limits the number of runs that can be in a non-terminal state at the same time. Currently, this field is only supported for requests of type CreatePipelineJobRequest.",
  ).optional(),
  maxConcurrentRunCount: z.string().describe(
    "Required. Maximum number of runs that can be started concurrently for this Schedule. This is the limit for starting the scheduled requests and not the execution of the operations/jobs created by the requests (if applicable).",
  ).optional(),
  maxRunCount: z.string().describe(
    "Optional. Maximum run count of the schedule. If specified, The schedule will be completed when either started_run_count >= max_run_count or when end_time is reached. If not specified, new runs will keep getting scheduled until this Schedule is paused or deleted. Already scheduled runs will be allowed to complete. Unset if not specified.",
  ).optional(),
  name: z.string().describe("Immutable. The resource name of the Schedule.")
    .optional(),
  startTime: z.string().describe(
    "Optional. Timestamp after which the first run can be scheduled. Default to Schedule create time if not specified.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  allowQueueing: z.boolean().optional(),
  catchUp: z.boolean().optional(),
  createNotebookExecutionJobRequest: z.object({
    notebookExecutionJob: z.object({
      createTime: z.string(),
      customEnvironmentSpec: z.object({
        machineSpec: z.object({
          acceleratorCount: z.number(),
          acceleratorType: z.string(),
          gpuPartitionSize: z.string(),
          machineType: z.string(),
          reservationAffinity: z.object({
            key: z.unknown(),
            reservationAffinityType: z.unknown(),
            values: z.unknown(),
          }),
          tpuTopology: z.string(),
        }),
        networkSpec: z.object({
          enableInternetAccess: z.boolean(),
          network: z.string(),
          subnetwork: z.string(),
        }),
        persistentDiskSpec: z.object({
          diskSizeGb: z.string(),
          diskType: z.string(),
        }),
      }),
      dataformRepositorySource: z.object({
        commitSha: z.string(),
        dataformRepositoryResourceName: z.string(),
      }),
      directNotebookSource: z.object({
        content: z.string(),
      }),
      displayName: z.string(),
      encryptionSpec: z.object({
        kmsKeyName: z.string(),
      }),
      executionTimeout: z.string(),
      executionUser: z.string(),
      gcsNotebookSource: z.object({
        generation: z.string(),
        uri: z.string(),
      }),
      gcsOutputUri: z.string(),
      jobState: z.string(),
      kernelName: z.string(),
      labels: z.record(z.string(), z.unknown()),
      name: z.string(),
      notebookRuntimeTemplateResourceName: z.string(),
      scheduleResourceName: z.string(),
      serviceAccount: z.string(),
      status: z.object({
        code: z.number(),
        details: z.array(z.record(z.string(), z.unknown())),
        message: z.string(),
      }),
      updateTime: z.string(),
      workbenchRuntime: z.object({}),
    }),
    notebookExecutionJobId: z.string(),
    parent: z.string(),
  }).optional(),
  createPipelineJobRequest: z.object({
    parent: z.string(),
    pipelineJob: z.object({
      createTime: z.string(),
      displayName: z.string(),
      encryptionSpec: z.object({
        kmsKeyName: z.string(),
      }),
      endTime: z.string(),
      error: z.object({
        code: z.number(),
        details: z.array(z.record(z.string(), z.unknown())),
        message: z.string(),
      }),
      jobDetail: z.object({
        pipelineContext: z.object({
          createTime: z.string(),
          description: z.string(),
          displayName: z.string(),
          etag: z.string(),
          labels: z.record(z.string(), z.unknown()),
          metadata: z.record(z.string(), z.unknown()),
          name: z.string(),
          parentContexts: z.array(z.unknown()),
          schemaTitle: z.string(),
          schemaVersion: z.string(),
          updateTime: z.string(),
        }),
        pipelineRunContext: z.object({
          createTime: z.string(),
          description: z.string(),
          displayName: z.string(),
          etag: z.string(),
          labels: z.record(z.string(), z.unknown()),
          metadata: z.record(z.string(), z.unknown()),
          name: z.string(),
          parentContexts: z.array(z.unknown()),
          schemaTitle: z.string(),
          schemaVersion: z.string(),
          updateTime: z.string(),
        }),
        taskDetails: z.array(z.object({
          createTime: z.unknown(),
          endTime: z.unknown(),
          error: z.unknown(),
          execution: z.unknown(),
          executorDetail: z.unknown(),
          inputs: z.unknown(),
          outputs: z.unknown(),
          parentTaskId: z.unknown(),
          pipelineTaskStatus: z.unknown(),
          startTime: z.unknown(),
          state: z.unknown(),
          taskId: z.unknown(),
          taskName: z.unknown(),
          taskUniqueName: z.unknown(),
        })),
      }),
      labels: z.record(z.string(), z.unknown()),
      name: z.string(),
      network: z.string(),
      pipelineSpec: z.record(z.string(), z.unknown()),
      preflightValidations: z.boolean(),
      pscInterfaceConfig: z.object({
        dnsPeeringConfigs: z.array(z.object({
          domain: z.unknown(),
          targetNetwork: z.unknown(),
          targetProject: z.unknown(),
        })),
        networkAttachment: z.string(),
      }),
      reservedIpRanges: z.array(z.string()),
      runtimeConfig: z.object({
        failurePolicy: z.string(),
        gcsOutputDirectory: z.string(),
        inputArtifacts: z.record(z.string(), z.unknown()),
        parameterValues: z.record(z.string(), z.unknown()),
        parameters: z.record(z.string(), z.unknown()),
      }),
      scheduleName: z.string(),
      serviceAccount: z.string(),
      startTime: z.string(),
      state: z.string(),
      templateMetadata: z.object({
        version: z.string(),
      }),
      templateUri: z.string(),
      updateTime: z.string(),
    }),
    pipelineJobId: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  cron: z.string().optional(),
  displayName: z.string().optional(),
  endTime: z.string().optional(),
  lastPauseTime: z.string().optional(),
  lastResumeTime: z.string().optional(),
  lastScheduledRunResponse: z.object({
    runResponse: z.string(),
    scheduledRunTime: z.string(),
  }).optional(),
  maxConcurrentActiveRunCount: z.string().optional(),
  maxConcurrentRunCount: z.string().optional(),
  maxRunCount: z.string().optional(),
  name: z.string(),
  nextRunTime: z.string().optional(),
  startTime: z.string().optional(),
  startedRunCount: z.string().optional(),
  state: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  allowQueueing: z.boolean().describe(
    "Optional. Whether new scheduled runs can be queued when max_concurrent_runs limit is reached. If set to true, new runs will be queued instead of skipped. Default to false.",
  ).optional(),
  createNotebookExecutionJobRequest: z.object({
    notebookExecutionJob: z.object({
      createTime: z.string().describe(
        "Output only. Timestamp when this NotebookExecutionJob was created.",
      ).optional(),
      customEnvironmentSpec: z.object({
        machineSpec: z.object({
          acceleratorCount: z.number().int().describe(
            "The number of accelerators to attach to the machine. For accelerator optimized machine types (https://cloud.google.com/compute/docs/accelerator-optimized-machines), One may set the accelerator_count from 1 to N for machine with N GPUs. If accelerator_count is less than or equal to N / 2, Vertex will co-schedule the replicas of the model into the same VM to save cost. For example, if the machine type is a3-highgpu-8g, which has 8 H100 GPUs, one can set accelerator_count to 1 to 8. If accelerator_count is 1, 2, 3, or 4, Vertex will co-schedule 8, 4, 2, or 2 replicas of the model into the same VM to save cost. When co-scheduling, CPU, memory and storage on the VM will be distributed to replicas on the VM. For example, one can expect a co-scheduled replica requesting 2 GPUs out of a 8-GPU VM will receive 25% of the CPU, memory and storage of the VM. Note that the feature is not compatible with multihost_gpu_node_count. When multihost_gpu_node_count is set, the co-scheduling will not be enabled.",
          ).optional(),
          acceleratorType: z.enum([
            "ACCELERATOR_TYPE_UNSPECIFIED",
            "NVIDIA_TESLA_K80",
            "NVIDIA_TESLA_P100",
            "NVIDIA_TESLA_V100",
            "NVIDIA_TESLA_P4",
            "NVIDIA_TESLA_T4",
            "NVIDIA_TESLA_A100",
            "NVIDIA_A100_80GB",
            "NVIDIA_L4",
            "NVIDIA_H100_80GB",
            "NVIDIA_H100_MEGA_80GB",
            "NVIDIA_H200_141GB",
            "NVIDIA_B200",
            "NVIDIA_GB200",
            "NVIDIA_RTX_PRO_6000",
            "TPU_V2",
            "TPU_V3",
            "TPU_V4_POD",
            "TPU_V5_LITEPOD",
          ]).describe(
            "Immutable. The type of accelerator(s) that may be attached to the machine as per accelerator_count.",
          ).optional(),
          gpuPartitionSize: z.string().describe(
            'Optional. Immutable. The Nvidia GPU partition size. When specified, the requested accelerators will be partitioned into smaller GPU partitions. For example, if the request is for 8 units of NVIDIA A100 GPUs, and gpu_partition_size="1g.10gb", the service will create 8 * 7 = 56 partitioned MIG instances. The partition size must be a value supported by the requested accelerator. Refer to [Nvidia GPU Partitioning](https://cloud.google.com/kubernetes-engine/docs/how-to/gpus-multi#multi-instance_gpu_partitions) for the available partition sizes. If set, the accelerator_count should be set to 1.',
          ).optional(),
          machineType: z.string().describe(
            "Immutable. The type of the machine. See the [list of machine types supported for prediction](https://cloud.google.com/vertex-ai/docs/predictions/configure-compute#machine-types) See the [list of machine types supported for custom training](https://cloud.google.com/vertex-ai/docs/training/configure-compute#machine-types). For DeployedModel this field is optional, and the default value is `n1-standard-2`. For BatchPredictionJob or as part of WorkerPoolSpec this field is required.",
          ).optional(),
          reservationAffinity: z.object({
            key: z.unknown().describe(
              "Optional. Corresponds to the label key of a reservation resource. To target a SPECIFIC_RESERVATION by name, use `compute.googleapis.com/reservation-name` as the key and specify the name of your reservation as its value.",
            ).optional(),
            reservationAffinityType: z.unknown().describe(
              "Required. Specifies the reservation affinity type.",
            ).optional(),
            values: z.unknown().describe(
              "Optional. Corresponds to the label values of a reservation resource. This must be the full resource name of the reservation or reservation block.",
            ).optional(),
          }).describe(
            "A ReservationAffinity can be used to configure a Vertex AI resource (e.g., a DeployedModel) to draw its Compute Engine resources from a Shared Reservation, or exclusively from on-demand capacity.",
          ).optional(),
          tpuTopology: z.string().describe(
            'Immutable. The topology of the TPUs. Corresponds to the TPU topologies available from GKE. (Example: tpu_topology: "2x2x1").',
          ).optional(),
        }).describe("Specification of a single machine.").optional(),
        networkSpec: z.object({
          enableInternetAccess: z.boolean().describe(
            "Whether to enable public internet access. Default false.",
          ).optional(),
          network: z.string().describe(
            "The full name of the Google Compute Engine [network](https://cloud.google.com//compute/docs/networks-and-firewalls#networks)",
          ).optional(),
          subnetwork: z.string().describe(
            "The name of the subnet that this instance is in. Format: `projects/{project_id_or_number}/regions/{region}/subnetworks/{subnetwork_id}`",
          ).optional(),
        }).describe("Network spec.").optional(),
        persistentDiskSpec: z.object({
          diskSizeGb: z.string().describe(
            "Size in GB of the disk (default is 100GB).",
          ).optional(),
          diskType: z.string().describe(
            'Type of the disk (default is "pd-standard"). Valid values: "pd-ssd" (Persistent Disk Solid State Drive) "pd-standard" (Persistent Disk Hard Disk Drive) "pd-balanced" (Balanced Persistent Disk) "pd-extreme" (Extreme Persistent Disk)',
          ).optional(),
        }).describe("Represents the spec of persistent disk options.")
          .optional(),
      }).describe("Compute configuration to use for an execution job.")
        .optional(),
      dataformRepositorySource: z.object({
        commitSha: z.string().describe(
          "The commit SHA to read repository with. If unset, the file will be read at HEAD.",
        ).optional(),
        dataformRepositoryResourceName: z.string().describe(
          "The resource name of the Dataform Repository. Format: `projects/{project_id}/locations/{location}/repositories/{repository_id}`",
        ).optional(),
      }).describe("The Dataform Repository containing the input notebook.")
        .optional(),
      directNotebookSource: z.object({
        content: z.string().describe(
          "The base64-encoded contents of the input notebook file.",
        ).optional(),
      }).describe("The content of the input notebook in ipynb format.")
        .optional(),
      displayName: z.string().describe(
        "The display name of the NotebookExecutionJob. The name can be up to 128 characters long and can consist of any UTF-8 characters.",
      ).optional(),
      encryptionSpec: z.object({
        kmsKeyName: z.string().describe(
          "Required. Resource name of the Cloud KMS key used to protect the resource. The Cloud KMS key must be in the same region as the resource. It must have the format `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
        ).optional(),
      }).describe(
        "Represents a customer-managed encryption key specification that can be applied to a Vertex AI resource.",
      ).optional(),
      executionTimeout: z.string().describe(
        "Max running time of the execution job in seconds (default 86400s / 24 hrs).",
      ).optional(),
      executionUser: z.string().describe(
        "The user email to run the execution as. Only supported by Colab runtimes.",
      ).optional(),
      gcsNotebookSource: z.object({
        generation: z.string().describe(
          "The version of the Cloud Storage object to read. If unset, the current version of the object is read. See https://cloud.google.com/storage/docs/metadata#generation-number.",
        ).optional(),
        uri: z.string().describe(
          "The Cloud Storage uri pointing to the ipynb file. Format: `gs://bucket/notebook_file.ipynb`",
        ).optional(),
      }).describe("The Cloud Storage uri for the input notebook.").optional(),
      gcsOutputUri: z.string().describe(
        "The Cloud Storage location to upload the result to. Format: `gs://bucket-name`",
      ).optional(),
      jobState: z.enum([
        "JOB_STATE_UNSPECIFIED",
        "JOB_STATE_QUEUED",
        "JOB_STATE_PENDING",
        "JOB_STATE_RUNNING",
        "JOB_STATE_SUCCEEDED",
        "JOB_STATE_FAILED",
        "JOB_STATE_CANCELLING",
        "JOB_STATE_CANCELLED",
        "JOB_STATE_PAUSED",
        "JOB_STATE_EXPIRED",
        "JOB_STATE_UPDATING",
        "JOB_STATE_PARTIALLY_SUCCEEDED",
      ]).describe("Output only. The state of the NotebookExecutionJob.")
        .optional(),
      kernelName: z.string().describe(
        "The name of the kernel to use during notebook execution. If unset, the default kernel is used.",
      ).optional(),
      labels: z.record(z.string(), z.string()).describe(
        'The labels with user-defined metadata to organize NotebookExecutionJobs. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. See https://goo.gl/xmQnxf for more information and examples of labels. System reserved label keys are prefixed with "aiplatform.googleapis.com/" and are immutable.',
      ).optional(),
      name: z.string().describe(
        "Output only. The resource name of this NotebookExecutionJob. Format: `projects/{project_id}/locations/{location}/notebookExecutionJobs/{job_id}`",
      ).optional(),
      notebookRuntimeTemplateResourceName: z.string().describe(
        "The NotebookRuntimeTemplate to source compute configuration from.",
      ).optional(),
      scheduleResourceName: z.string().describe(
        "The Schedule resource name if this job is triggered by one. Format: `projects/{project_id}/locations/{location}/schedules/{schedule_id}`",
      ).optional(),
      serviceAccount: z.string().describe(
        "The service account to run the execution as.",
      ).optional(),
      status: z.object({
        code: z.number().int().describe(
          "The status code, which should be an enum value of google.rpc.Code.",
        ).optional(),
        details: z.array(z.record(z.string(), z.unknown())).describe(
          "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
        ).optional(),
        message: z.string().describe(
          "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
        ).optional(),
      }).describe(
        "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
      ).optional(),
      updateTime: z.string().describe(
        "Output only. Timestamp when this NotebookExecutionJob was most recently updated.",
      ).optional(),
      workbenchRuntime: z.object({}).describe(
        "Configuration for a Workbench Instances-based environment.",
      ).optional(),
    }).describe(
      "NotebookExecutionJob represents an instance of a notebook execution.",
    ).optional(),
    notebookExecutionJobId: z.string().describe(
      "Optional. User specified ID for the NotebookExecutionJob.",
    ).optional(),
    parent: z.string().describe(
      "Required. The resource name of the Location to create the NotebookExecutionJob. Format: `projects/{project}/locations/{location}`",
    ).optional(),
  }).describe(
    "Request message for [NotebookService.CreateNotebookExecutionJob]",
  ).optional(),
  createPipelineJobRequest: z.object({
    parent: z.string().describe(
      "Required. The resource name of the Location to create the PipelineJob in. Format: `projects/{project}/locations/{location}`",
    ).optional(),
    pipelineJob: z.object({
      createTime: z.string().describe("Output only. Pipeline creation time.")
        .optional(),
      displayName: z.string().describe(
        "The display name of the Pipeline. The name can be up to 128 characters long and can consist of any UTF-8 characters.",
      ).optional(),
      encryptionSpec: z.object({
        kmsKeyName: z.string().describe(
          "Required. Resource name of the Cloud KMS key used to protect the resource. The Cloud KMS key must be in the same region as the resource. It must have the format `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
        ).optional(),
      }).describe(
        "Represents a customer-managed encryption key specification that can be applied to a Vertex AI resource.",
      ).optional(),
      endTime: z.string().describe("Output only. Pipeline end time.")
        .optional(),
      error: z.object({
        code: z.number().int().describe(
          "The status code, which should be an enum value of google.rpc.Code.",
        ).optional(),
        details: z.array(z.record(z.string(), z.unknown())).describe(
          "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
        ).optional(),
        message: z.string().describe(
          "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
        ).optional(),
      }).describe(
        "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
      ).optional(),
      jobDetail: z.object({
        pipelineContext: z.object({
          createTime: z.string().describe(
            "Output only. Timestamp when this Context was created.",
          ).optional(),
          description: z.string().describe("Description of the Context")
            .optional(),
          displayName: z.string().describe(
            "User provided display name of the Context. May be up to 128 Unicode characters.",
          ).optional(),
          etag: z.string().describe(
            'An eTag used to perform consistent read-modify-write updates. If not set, a blind "overwrite" update happens.',
          ).optional(),
          labels: z.record(z.string(), z.unknown()).describe(
            "The labels with user-defined metadata to organize your Contexts. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. No more than 64 user labels can be associated with one Context (System labels are excluded).",
          ).optional(),
          metadata: z.record(z.string(), z.unknown()).describe(
            "Properties of the Context. Top level metadata keys' heading and trailing spaces will be trimmed. The size of this field should not exceed 200KB.",
          ).optional(),
          name: z.string().describe(
            "Immutable. The resource name of the Context.",
          ).optional(),
          parentContexts: z.array(z.unknown()).describe(
            "Output only. A list of resource names of Contexts that are parents of this Context. A Context may have at most 10 parent_contexts.",
          ).optional(),
          schemaTitle: z.string().describe(
            "The title of the schema describing the metadata. Schema title and version is expected to be registered in earlier Create Schema calls. And both are used together as unique identifiers to identify schemas within the local metadata store.",
          ).optional(),
          schemaVersion: z.string().describe(
            "The version of the schema in schema_name to use. Schema title and version is expected to be registered in earlier Create Schema calls. And both are used together as unique identifiers to identify schemas within the local metadata store.",
          ).optional(),
          updateTime: z.string().describe(
            "Output only. Timestamp when this Context was last updated.",
          ).optional(),
        }).describe("Instance of a general context.").optional(),
        pipelineRunContext: z.object({
          createTime: z.string().describe(
            "Output only. Timestamp when this Context was created.",
          ).optional(),
          description: z.string().describe("Description of the Context")
            .optional(),
          displayName: z.string().describe(
            "User provided display name of the Context. May be up to 128 Unicode characters.",
          ).optional(),
          etag: z.string().describe(
            'An eTag used to perform consistent read-modify-write updates. If not set, a blind "overwrite" update happens.',
          ).optional(),
          labels: z.record(z.string(), z.unknown()).describe(
            "The labels with user-defined metadata to organize your Contexts. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. No more than 64 user labels can be associated with one Context (System labels are excluded).",
          ).optional(),
          metadata: z.record(z.string(), z.unknown()).describe(
            "Properties of the Context. Top level metadata keys' heading and trailing spaces will be trimmed. The size of this field should not exceed 200KB.",
          ).optional(),
          name: z.string().describe(
            "Immutable. The resource name of the Context.",
          ).optional(),
          parentContexts: z.array(z.unknown()).describe(
            "Output only. A list of resource names of Contexts that are parents of this Context. A Context may have at most 10 parent_contexts.",
          ).optional(),
          schemaTitle: z.string().describe(
            "The title of the schema describing the metadata. Schema title and version is expected to be registered in earlier Create Schema calls. And both are used together as unique identifiers to identify schemas within the local metadata store.",
          ).optional(),
          schemaVersion: z.string().describe(
            "The version of the schema in schema_name to use. Schema title and version is expected to be registered in earlier Create Schema calls. And both are used together as unique identifiers to identify schemas within the local metadata store.",
          ).optional(),
          updateTime: z.string().describe(
            "Output only. Timestamp when this Context was last updated.",
          ).optional(),
        }).describe("Instance of a general context.").optional(),
        taskDetails: z.array(z.object({
          createTime: z.unknown().describe("Output only. Task create time.")
            .optional(),
          endTime: z.unknown().describe("Output only. Task end time.")
            .optional(),
          error: z.unknown().describe(
            "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
          ).optional(),
          execution: z.unknown().describe("Instance of a general execution.")
            .optional(),
          executorDetail: z.unknown().describe(
            "The runtime detail of a pipeline executor.",
          ).optional(),
          inputs: z.unknown().describe(
            "Output only. The runtime input artifacts of the task.",
          ).optional(),
          outputs: z.unknown().describe(
            "Output only. The runtime output artifacts of the task.",
          ).optional(),
          parentTaskId: z.unknown().describe(
            "Output only. The id of the parent task if the task is within a component scope. Empty if the task is at the root level.",
          ).optional(),
          pipelineTaskStatus: z.unknown().describe(
            "Output only. A list of task status. This field keeps a record of task status evolving over time.",
          ).optional(),
          startTime: z.unknown().describe("Output only. Task start time.")
            .optional(),
          state: z.unknown().describe("Output only. State of the task.")
            .optional(),
          taskId: z.unknown().describe(
            "Output only. The system generated ID of the task.",
          ).optional(),
          taskName: z.unknown().describe(
            "Output only. The user specified name of the task that is defined in pipeline_spec.",
          ).optional(),
          taskUniqueName: z.unknown().describe(
            'Output only. The unique name of a task. This field is used by rerun pipeline job. Console UI and Vertex AI SDK will support triggering pipeline job reruns. The name is constructed by concatenating all the parent tasks name with the task name. For example, if a task named "child_task" has a parent task named "parent_task_1" and parent task 1 has a parent task named "parent_task_2", the task unique name will be "parent_task_2.parent_task_1.child_task".',
          ).optional(),
        })).describe(
          "Output only. The runtime details of the tasks under the pipeline.",
        ).optional(),
      }).describe("The runtime detail of PipelineJob.").optional(),
      labels: z.record(z.string(), z.string()).describe(
        "The labels with user-defined metadata to organize PipelineJob. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. See https://goo.gl/xmQnxf for more information and examples of labels. Note there is some reserved label key for Vertex AI Pipelines. - `vertex-ai-pipelines-run-billing-id`, user set value will get overrided.",
      ).optional(),
      name: z.string().describe(
        "Output only. The resource name of the PipelineJob.",
      ).optional(),
      network: z.string().describe(
        "The full name of the Compute Engine [network](/compute/docs/networks-and-firewalls#networks) to which the Pipeline Job's workload should be peered. For example, `projects/12345/global/networks/myVPC`. [Format](/compute/docs/reference/rest/v1/networks/insert) is of the form `projects/{project}/global/networks/{network}`. Where {project} is a project number, as in `12345`, and {network} is a network name. Private services access must already be configured for the network. Pipeline job will apply the network configuration to the Google Cloud resources being launched, if applied, such as Vertex AI Training or Dataflow job. If left unspecified, the workload is not peered with any network.",
      ).optional(),
      pipelineSpec: z.record(z.string(), z.string()).describe(
        "A compiled definition of a pipeline, represented as a `JSON` object. Defines the structure of the pipeline, including its components, tasks, and parameters. This specification is generated by compiling a pipeline function defined in `Python` using the `Kubeflow Pipelines SDK`.",
      ).optional(),
      preflightValidations: z.boolean().describe(
        "Optional. Whether to do component level validations before job creation.",
      ).optional(),
      pscInterfaceConfig: z.object({
        dnsPeeringConfigs: z.array(z.object({
          domain: z.unknown().describe(
            'Required. The DNS name suffix of the zone being peered to, e.g., "my-internal-domain.corp.". Must end with a dot.',
          ).optional(),
          targetNetwork: z.unknown().describe(
            "Required. The VPC network name in the target_project where the DNS zone specified by 'domain' is visible.",
          ).optional(),
          targetProject: z.unknown().describe(
            "Required. The project ID hosting the Cloud DNS managed zone that contains the 'domain'. The Vertex AI Service Agent requires the dns.peer role on this project.",
          ).optional(),
        })).describe(
          "Optional. DNS peering configurations. When specified, Vertex AI will attempt to configure DNS peering zones in the tenant project VPC to resolve the specified domains using the target network's Cloud DNS. The user must grant the dns.peer role to the Vertex AI Service Agent on the target project.",
        ).optional(),
        networkAttachment: z.string().describe(
          "Optional. The name of the Compute Engine [network attachment](https://cloud.google.com/vpc/docs/about-network-attachments) to attach to the resource within the region and user project. To specify this field, you must have already [created a network attachment] (https://cloud.google.com/vpc/docs/create-manage-network-attachments#create-network-attachments). This field is only used for resources using PSC-I.",
        ).optional(),
      }).describe("Configuration for PSC-I.").optional(),
      reservedIpRanges: z.array(z.string()).describe(
        "A list of names for the reserved ip ranges under the VPC network that can be used for this Pipeline Job's workload. If set, we will deploy the Pipeline Job's workload within the provided ip ranges. Otherwise, the job will be deployed to any ip ranges under the provided VPC network. Example: ['vertex-ai-ip-range'].",
      ).optional(),
      runtimeConfig: z.object({
        failurePolicy: z.enum([
          "PIPELINE_FAILURE_POLICY_UNSPECIFIED",
          "PIPELINE_FAILURE_POLICY_FAIL_SLOW",
          "PIPELINE_FAILURE_POLICY_FAIL_FAST",
        ]).describe(
          "Represents the failure policy of a pipeline. Currently, the default of a pipeline is that the pipeline will continue to run until no more tasks can be executed, also known as PIPELINE_FAILURE_POLICY_FAIL_SLOW. However, if a pipeline is set to PIPELINE_FAILURE_POLICY_FAIL_FAST, it will stop scheduling any new tasks when a task has failed. Any scheduled tasks will continue to completion.",
        ).optional(),
        gcsOutputDirectory: z.string().describe(
          "Required. A path in a Cloud Storage bucket, which will be treated as the root output directory of the pipeline. It is used by the system to generate the paths of output artifacts. The artifact paths are generated with a sub-path pattern `{job_id}/{task_id}/{output_key}` under the specified output directory. The service account specified in this pipeline must have the `storage.objects.get` and `storage.objects.create` permissions for this bucket.",
        ).optional(),
        inputArtifacts: z.record(
          z.string(),
          z.object({
            artifactId: z.unknown().describe(
              "Artifact resource id from MLMD. Which is the last portion of an artifact resource name: `projects/{project}/locations/{location}/metadataStores/default/artifacts/{artifact_id}`. The artifact must stay within the same project, location and default metadatastore as the pipeline.",
            ).optional(),
          }),
        ).describe(
          "The runtime artifacts of the PipelineJob. The key will be the input artifact name and the value would be one of the InputArtifact.",
        ).optional(),
        parameterValues: z.record(z.string(), z.string()).describe(
          "The runtime parameters of the PipelineJob. The parameters will be passed into PipelineJob.pipeline_spec to replace the placeholders at runtime. This field is used by pipelines built using `PipelineJob.pipeline_spec.schema_version` 2.1.0, such as pipelines built using Kubeflow Pipelines SDK 1.9 or higher and the v2 DSL.",
        ).optional(),
        parameters: z.record(
          z.string(),
          z.object({
            doubleValue: z.unknown().describe("A double value.").optional(),
            intValue: z.unknown().describe("An integer value.").optional(),
            stringValue: z.unknown().describe("A string value.").optional(),
          }),
        ).describe(
          "Deprecated. Use RuntimeConfig.parameter_values instead. The runtime parameters of the PipelineJob. The parameters will be passed into PipelineJob.pipeline_spec to replace the placeholders at runtime. This field is used by pipelines built using `PipelineJob.pipeline_spec.schema_version` 2.0.0 or lower, such as pipelines built using Kubeflow Pipelines SDK 1.8 or lower.",
        ).optional(),
      }).describe("The runtime config of a PipelineJob.").optional(),
      scheduleName: z.string().describe(
        "Output only. The schedule resource name. Only returned if the Pipeline is created by Schedule API.",
      ).optional(),
      serviceAccount: z.string().describe(
        "The service account that the pipeline workload runs as. If not specified, the Compute Engine default service account in the project will be used. See https://cloud.google.com/compute/docs/access/service-accounts#default_service_account Users starting the pipeline must have the `iam.serviceAccounts.actAs` permission on this service account.",
      ).optional(),
      startTime: z.string().describe("Output only. Pipeline start time.")
        .optional(),
      state: z.enum([
        "PIPELINE_STATE_UNSPECIFIED",
        "PIPELINE_STATE_QUEUED",
        "PIPELINE_STATE_PENDING",
        "PIPELINE_STATE_RUNNING",
        "PIPELINE_STATE_SUCCEEDED",
        "PIPELINE_STATE_FAILED",
        "PIPELINE_STATE_CANCELLING",
        "PIPELINE_STATE_CANCELLED",
        "PIPELINE_STATE_PAUSED",
      ]).describe("Output only. The detailed state of the job.").optional(),
      templateMetadata: z.object({
        version: z.string().describe(
          'The version_name in artifact registry. Will always be presented in output if the PipelineJob.template_uri is from supported template registry. Format is "sha256:abcdef123456...".',
        ).optional(),
      }).describe(
        "Pipeline template metadata if PipelineJob.template_uri is from supported template registry. Currently, the only supported registry is Artifact Registry.",
      ).optional(),
      templateUri: z.string().describe(
        "A template uri from where the PipelineJob.pipeline_spec, if empty, will be downloaded. Currently, only uri from Vertex Template Registry & Gallery is supported. Reference to https://cloud.google.com/vertex-ai/docs/pipelines/create-pipeline-template.",
      ).optional(),
      updateTime: z.string().describe(
        "Output only. Timestamp when this PipelineJob was most recently updated.",
      ).optional(),
    }).describe("An instance of a machine learning PipelineJob.").optional(),
    pipelineJobId: z.string().describe(
      "The ID to use for the PipelineJob, which will become the final component of the PipelineJob name. If not provided, an ID will be automatically generated. This value should be less than 128 characters, and valid characters are `/a-z-/`.",
    ).optional(),
  }).describe("Request message for PipelineService.CreatePipelineJob.")
    .optional(),
  cron: z.string().describe(
    'Cron schedule (https://en.wikipedia.org/wiki/Cron) to launch scheduled runs. To explicitly set a timezone to the cron tab, apply a prefix in the cron tab: "CRON_TZ=${IANA_TIME_ZONE}" or "TZ=${IANA_TIME_ZONE}". The ${IANA_TIME_ZONE} may only be a valid string from IANA time zone database. For example, "CRON_TZ=America/New_York 1 * * * *", or "TZ=America/New_York 1 * * * *".',
  ).optional(),
  displayName: z.string().describe(
    "Required. User provided name of the Schedule. The name can be up to 128 characters long and can consist of any UTF-8 characters.",
  ).optional(),
  endTime: z.string().describe(
    "Optional. Timestamp after which no new runs can be scheduled. If specified, The schedule will be completed when either end_time is reached or when scheduled_run_count >= max_run_count. If not specified, new runs will keep getting scheduled until this Schedule is paused or deleted. Already scheduled runs will be allowed to complete. Unset if not specified.",
  ).optional(),
  lastScheduledRunResponse: z.object({
    runResponse: z.string().describe("The response of the scheduled run.")
      .optional(),
    scheduledRunTime: z.string().describe(
      "The scheduled run time based on the user-specified schedule.",
    ).optional(),
  }).describe("Status of a scheduled run.").optional(),
  maxConcurrentActiveRunCount: z.string().describe(
    "Optional. Specifies the maximum number of active runs that can be executed concurrently for this Schedule. This limits the number of runs that can be in a non-terminal state at the same time. Currently, this field is only supported for requests of type CreatePipelineJobRequest.",
  ).optional(),
  maxConcurrentRunCount: z.string().describe(
    "Required. Maximum number of runs that can be started concurrently for this Schedule. This is the limit for starting the scheduled requests and not the execution of the operations/jobs created by the requests (if applicable).",
  ).optional(),
  maxRunCount: z.string().describe(
    "Optional. Maximum run count of the schedule. If specified, The schedule will be completed when either started_run_count >= max_run_count or when end_time is reached. If not specified, new runs will keep getting scheduled until this Schedule is paused or deleted. Already scheduled runs will be allowed to complete. Unset if not specified.",
  ).optional(),
  name: z.string().describe("Immutable. The resource name of the Schedule.")
    .optional(),
  startTime: z.string().describe(
    "Optional. Timestamp after which the first run can be scheduled. Default to Schedule create time if not specified.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Vertex AI Schedules. Registered at `@swamp/gcp/aiplatform/schedules`. */
export const model = {
  type: "@swamp/gcp/aiplatform/schedules",
  version: "2026.05.25.1",
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
      toVersion: "2026.05.02.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "An instance of a Schedule periodically schedules runs to make API calls based...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a schedules",
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
        if (g["allowQueueing"] !== undefined) {
          body["allowQueueing"] = g["allowQueueing"];
        }
        if (g["createNotebookExecutionJobRequest"] !== undefined) {
          body["createNotebookExecutionJobRequest"] =
            g["createNotebookExecutionJobRequest"];
        }
        if (g["createPipelineJobRequest"] !== undefined) {
          body["createPipelineJobRequest"] = g["createPipelineJobRequest"];
        }
        if (g["cron"] !== undefined) body["cron"] = g["cron"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["endTime"] !== undefined) body["endTime"] = g["endTime"];
        if (g["lastScheduledRunResponse"] !== undefined) {
          body["lastScheduledRunResponse"] = g["lastScheduledRunResponse"];
        }
        if (g["maxConcurrentActiveRunCount"] !== undefined) {
          body["maxConcurrentActiveRunCount"] =
            g["maxConcurrentActiveRunCount"];
        }
        if (g["maxConcurrentRunCount"] !== undefined) {
          body["maxConcurrentRunCount"] = g["maxConcurrentRunCount"];
        }
        if (g["maxRunCount"] !== undefined) {
          body["maxRunCount"] = g["maxRunCount"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["startTime"] !== undefined) body["startTime"] = g["startTime"];
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
              "readyValues": ["ACTIVE", "COMPLETED"],
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
      description: "Get a schedules",
      arguments: z.object({
        identifier: z.string().describe("The name of the schedules"),
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
      description: "Update schedules attributes",
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
        if (g["allowQueueing"] !== undefined) {
          body["allowQueueing"] = g["allowQueueing"];
        }
        if (g["createNotebookExecutionJobRequest"] !== undefined) {
          body["createNotebookExecutionJobRequest"] =
            g["createNotebookExecutionJobRequest"];
        }
        if (g["createPipelineJobRequest"] !== undefined) {
          body["createPipelineJobRequest"] = g["createPipelineJobRequest"];
        }
        if (g["cron"] !== undefined) body["cron"] = g["cron"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["endTime"] !== undefined) body["endTime"] = g["endTime"];
        if (g["lastScheduledRunResponse"] !== undefined) {
          body["lastScheduledRunResponse"] = g["lastScheduledRunResponse"];
        }
        if (g["maxConcurrentActiveRunCount"] !== undefined) {
          body["maxConcurrentActiveRunCount"] =
            g["maxConcurrentActiveRunCount"];
        }
        if (g["maxConcurrentRunCount"] !== undefined) {
          body["maxConcurrentRunCount"] = g["maxConcurrentRunCount"];
        }
        if (g["maxRunCount"] !== undefined) {
          body["maxRunCount"] = g["maxRunCount"];
        }
        if (g["startTime"] !== undefined) body["startTime"] = g["startTime"];
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
              "readyValues": ["ACTIVE", "COMPLETED"],
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
      description: "Delete the schedules",
      arguments: z.object({
        identifier: z.string().describe("The name of the schedules"),
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
      description: "Sync schedules state from GCP",
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
    list: {
      description: "List schedules resources",
      arguments: z.object({
        filter: z.string().describe(
          'Lists the Schedules that match the filter expression. The following fields are supported: * `display_name`: Supports `=`, `!=` comparisons, and `:` wildcard. * `state`: Supports `=` and `!=` comparisons. * `request`: Supports existence of the check. (e.g. `create_pipeline_job_request:*` --> Schedule has create_pipeline_job_request). * `create_time`: Supports `=`, `!=`, `<`, `>`, `<=`, and `>=` comparisons. Values must be in RFC 3339 format. * `start_time`: Supports `=`, `!=`, `<`, `>`, `<=`, and `>=` comparisons. Values must be in RFC 3339 format. * `end_time`: Supports `=`, `!=`, `<`, `>`, `<=`, `>=` comparisons and `:*` existence check. Values must be in RFC 3339 format. * `next_run_time`: Supports `=`, `!=`, `<`, `>`, `<=`, and `>=` comparisons. Values must be in RFC 3339 format. Filter expressions can be combined together using logical operators (`NOT`, `AND` & `OR`). The syntax to define filter expression is based on https://google.aip.dev/160. Examples: * `state="ACTIVE" AND display_name:"my_schedule_*"` * `NOT display_name="my_schedule"` * `create_time>"2021-05-18T00:00:00Z"` * `end_time>"2021-05-18T00:00:00Z" OR NOT end_time:*` * `create_pipeline_job_request:*`',
        ).optional(),
        orderBy: z.string().describe(
          'A comma-separated list of fields to order by. The default sort order is in ascending order. Use "desc" after a field name for descending. You can have multiple order_by fields provided. For example, using "create_time desc, end_time" will order results by create time in descending order, and if there are multiple schedules having the same create time, order them by the end time in ascending order. If order_by is not specified, it will order by default with create_time in descending order. Supported fields: * `create_time` * `start_time` * `end_time` * `next_run_time`',
        ).optional(),
        pageSize: z.number().describe(
          "The standard list page size. Default to 100 if not specified.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
          BASE_URL,
          LIST_CONFIG,
          params,
          "schedules",
          (args.maxPages as number | undefined) ?? 10,
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
    pause: {
      description: "pause",
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
            "id": "aiplatform.projects.locations.schedules.pause",
            "path": "v1/{+name}:pause",
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
    resume: {
      description: "resume",
      arguments: z.object({
        catchUp: z.any().optional(),
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
        if (args["catchUp"] !== undefined) body["catchUp"] = args["catchUp"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "aiplatform.projects.locations.schedules.resume",
            "path": "v1/{+name}:resume",
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
