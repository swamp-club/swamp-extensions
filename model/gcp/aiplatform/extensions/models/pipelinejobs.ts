// Auto-generated extension model for @swamp/gcp/aiplatform/pipelinejobs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Vertex AI PipelineJobs.
 *
 * An instance of a machine learning PipelineJob.
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
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/pipelineJobs/${shortName}`;
}

const BASE_URL = "https://aiplatform.googleapis.com/";

const GET_CONFIG = {
  "id": "aiplatform.projects.locations.pipelineJobs.get",
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
  "id": "aiplatform.projects.locations.pipelineJobs.create",
  "path": "v1/{+parent}/pipelineJobs",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "pipelineJobId": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "aiplatform.projects.locations.pipelineJobs.delete",
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
  "id": "aiplatform.projects.locations.pipelineJobs.list",
  "path": "v1/{+parent}/pipelineJobs",
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
    "readMask": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
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
  error: z.object({
    code: z.number().int().describe(
      "The status code, which should be an enum value of google.rpc.Code.",
    ).optional(),
    details: z.array(z.record(z.string(), z.string())).describe(
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
      description: z.string().describe("Description of the Context").optional(),
      displayName: z.string().describe(
        "User provided display name of the Context. May be up to 128 Unicode characters.",
      ).optional(),
      etag: z.string().describe(
        'An eTag used to perform consistent read-modify-write updates. If not set, a blind "overwrite" update happens.',
      ).optional(),
      labels: z.record(z.string(), z.string()).describe(
        "The labels with user-defined metadata to organize your Contexts. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. No more than 64 user labels can be associated with one Context (System labels are excluded).",
      ).optional(),
      metadata: z.record(z.string(), z.string()).describe(
        "Properties of the Context. Top level metadata keys' heading and trailing spaces will be trimmed. The size of this field should not exceed 200KB.",
      ).optional(),
      name: z.string().describe("Immutable. The resource name of the Context.")
        .optional(),
      parentContexts: z.array(z.string()).describe(
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
      description: z.string().describe("Description of the Context").optional(),
      displayName: z.string().describe(
        "User provided display name of the Context. May be up to 128 Unicode characters.",
      ).optional(),
      etag: z.string().describe(
        'An eTag used to perform consistent read-modify-write updates. If not set, a blind "overwrite" update happens.',
      ).optional(),
      labels: z.record(z.string(), z.string()).describe(
        "The labels with user-defined metadata to organize your Contexts. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. No more than 64 user labels can be associated with one Context (System labels are excluded).",
      ).optional(),
      metadata: z.record(z.string(), z.string()).describe(
        "Properties of the Context. Top level metadata keys' heading and trailing spaces will be trimmed. The size of this field should not exceed 200KB.",
      ).optional(),
      name: z.string().describe("Immutable. The resource name of the Context.")
        .optional(),
      parentContexts: z.array(z.string()).describe(
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
      createTime: z.string().describe("Output only. Task create time.")
        .optional(),
      endTime: z.string().describe("Output only. Task end time.").optional(),
      error: z.object({
        code: z.number().int().describe(
          "The status code, which should be an enum value of google.rpc.Code.",
        ).optional(),
        details: z.array(z.unknown()).describe(
          "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
        ).optional(),
        message: z.string().describe(
          "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
        ).optional(),
      }).describe(
        "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
      ).optional(),
      execution: z.object({
        createTime: z.string().describe(
          "Output only. Timestamp when this Execution was created.",
        ).optional(),
        description: z.string().describe("Description of the Execution")
          .optional(),
        displayName: z.string().describe(
          "User provided display name of the Execution. May be up to 128 Unicode characters.",
        ).optional(),
        etag: z.string().describe(
          'An eTag used to perform consistent read-modify-write updates. If not set, a blind "overwrite" update happens.',
        ).optional(),
        labels: z.record(z.string(), z.unknown()).describe(
          "The labels with user-defined metadata to organize your Executions. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. No more than 64 user labels can be associated with one Execution (System labels are excluded).",
        ).optional(),
        metadata: z.record(z.string(), z.unknown()).describe(
          "Properties of the Execution. Top level metadata keys' heading and trailing spaces will be trimmed. The size of this field should not exceed 200KB.",
        ).optional(),
        name: z.string().describe(
          "Output only. The resource name of the Execution.",
        ).optional(),
        schemaTitle: z.string().describe(
          "The title of the schema describing the metadata. Schema title and version is expected to be registered in earlier Create Schema calls. And both are used together as unique identifiers to identify schemas within the local metadata store.",
        ).optional(),
        schemaVersion: z.string().describe(
          "The version of the schema in `schema_title` to use. Schema title and version is expected to be registered in earlier Create Schema calls. And both are used together as unique identifiers to identify schemas within the local metadata store.",
        ).optional(),
        state: z.enum([
          "STATE_UNSPECIFIED",
          "NEW",
          "RUNNING",
          "COMPLETE",
          "FAILED",
          "CACHED",
          "CANCELLED",
        ]).describe(
          "The state of this Execution. This is a property of the Execution, and does not imply or capture any ongoing process. This property is managed by clients (such as Vertex AI Pipelines) and the system does not prescribe or check the validity of state transitions.",
        ).optional(),
        updateTime: z.string().describe(
          "Output only. Timestamp when this Execution was last updated.",
        ).optional(),
      }).describe("Instance of a general execution.").optional(),
      executorDetail: z.object({
        containerDetail: z.object({
          failedMainJobs: z.unknown().describe(
            "Output only. The names of the previously failed CustomJob for the main container executions. The list includes the all attempts in chronological order.",
          ).optional(),
          failedPreCachingCheckJobs: z.unknown().describe(
            "Output only. The names of the previously failed CustomJob for the pre-caching-check container executions. This job will be available if the PipelineJob.pipeline_spec specifies the `pre_caching_check` hook in the lifecycle events. The list includes the all attempts in chronological order.",
          ).optional(),
          mainJob: z.unknown().describe(
            "Output only. The name of the CustomJob for the main container execution.",
          ).optional(),
          preCachingCheckJob: z.unknown().describe(
            "Output only. The name of the CustomJob for the pre-caching-check container execution. This job will be available if the PipelineJob.pipeline_spec specifies the `pre_caching_check` hook in the lifecycle events.",
          ).optional(),
        }).describe(
          "The detail of a container execution. It contains the job names of the lifecycle of a container execution.",
        ).optional(),
        customJobDetail: z.object({
          failedJobs: z.unknown().describe(
            "Output only. The names of the previously failed CustomJob. The list includes the all attempts in chronological order.",
          ).optional(),
          job: z.unknown().describe("Output only. The name of the CustomJob.")
            .optional(),
        }).describe("The detailed info for a custom job executor.").optional(),
      }).describe("The runtime detail of a pipeline executor.").optional(),
      inputs: z.record(
        z.string(),
        z.object({
          artifacts: z.unknown().describe(
            "Output only. A list of artifact metadata.",
          ).optional(),
        }),
      ).describe("Output only. The runtime input artifacts of the task.")
        .optional(),
      outputs: z.record(
        z.string(),
        z.object({
          artifacts: z.unknown().describe(
            "Output only. A list of artifact metadata.",
          ).optional(),
        }),
      ).describe("Output only. The runtime output artifacts of the task.")
        .optional(),
      parentTaskId: z.string().describe(
        "Output only. The id of the parent task if the task is within a component scope. Empty if the task is at the root level.",
      ).optional(),
      pipelineTaskStatus: z.array(z.object({
        error: z.unknown().describe(
          "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
        ).optional(),
        state: z.unknown().describe("Output only. The state of the task.")
          .optional(),
        updateTime: z.unknown().describe(
          "Output only. Update time of this status.",
        ).optional(),
      })).describe(
        "Output only. A list of task status. This field keeps a record of task status evolving over time.",
      ).optional(),
      startTime: z.string().describe("Output only. Task start time.")
        .optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "PENDING",
        "RUNNING",
        "SUCCEEDED",
        "CANCEL_PENDING",
        "CANCELLING",
        "CANCELLED",
        "FAILED",
        "SKIPPED",
        "NOT_TRIGGERED",
      ]).describe("Output only. State of the task.").optional(),
      taskId: z.string().describe(
        "Output only. The system generated ID of the task.",
      ).optional(),
      taskName: z.string().describe(
        "Output only. The user specified name of the task that is defined in pipeline_spec.",
      ).optional(),
      taskUniqueName: z.string().describe(
        'Output only. The unique name of a task. This field is used by rerun pipeline job. Console UI and Vertex AI SDK will support triggering pipeline job reruns. The name is constructed by concatenating all the parent tasks name with the task name. For example, if a task named "child_task" has a parent task named "parent_task_1" and parent task 1 has a parent task named "parent_task_2", the task unique name will be "parent_task_2.parent_task_1.child_task".',
      ).optional(),
    })).describe(
      "Output only. The runtime details of the tasks under the pipeline.",
    ).optional(),
  }).describe("The runtime detail of PipelineJob.").optional(),
  labels: z.record(z.string(), z.string()).describe(
    "The labels with user-defined metadata to organize PipelineJob. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. See https://goo.gl/xmQnxf for more information and examples of labels. Note there is some reserved label key for Vertex AI Pipelines. - `vertex-ai-pipelines-run-billing-id`, user set value will get overrided.",
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
      domain: z.string().describe(
        'Required. The DNS name suffix of the zone being peered to, e.g., "my-internal-domain.corp.". Must end with a dot.',
      ).optional(),
      targetNetwork: z.string().describe(
        "Required. The VPC network name in the target_project where the DNS zone specified by 'domain' is visible.",
      ).optional(),
      targetProject: z.string().describe(
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
        artifactId: z.string().describe(
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
        doubleValue: z.number().describe("A double value.").optional(),
        intValue: z.string().describe("An integer value.").optional(),
        stringValue: z.string().describe("A string value.").optional(),
      }),
    ).describe(
      "Deprecated. Use RuntimeConfig.parameter_values instead. The runtime parameters of the PipelineJob. The parameters will be passed into PipelineJob.pipeline_spec to replace the placeholders at runtime. This field is used by pipelines built using `PipelineJob.pipeline_spec.schema_version` 2.0.0 or lower, such as pipelines built using Kubeflow Pipelines SDK 1.8 or lower.",
    ).optional(),
  }).describe("The runtime config of a PipelineJob.").optional(),
  serviceAccount: z.string().describe(
    "The service account that the pipeline workload runs as. If not specified, the Compute Engine default service account in the project will be used. See https://cloud.google.com/compute/docs/access/service-accounts#default_service_account Users starting the pipeline must have the `iam.serviceAccounts.actAs` permission on this service account.",
  ).optional(),
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
  pipelineJobId: z.string().describe(
    "The ID to use for the PipelineJob, which will become the final component of the PipelineJob name. If not provided, an ID will be automatically generated. This value should be less than 128 characters, and valid characters are `/a-z-/`.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  encryptionSpec: z.object({
    kmsKeyName: z.string(),
  }).optional(),
  endTime: z.string().optional(),
  error: z.object({
    code: z.number(),
    details: z.array(z.record(z.string(), z.unknown())),
    message: z.string(),
  }).optional(),
  jobDetail: z.object({
    pipelineContext: z.object({
      createTime: z.string(),
      description: z.string(),
      displayName: z.string(),
      etag: z.string(),
      labels: z.record(z.string(), z.unknown()),
      metadata: z.record(z.string(), z.unknown()),
      name: z.string(),
      parentContexts: z.array(z.string()),
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
      parentContexts: z.array(z.string()),
      schemaTitle: z.string(),
      schemaVersion: z.string(),
      updateTime: z.string(),
    }),
    taskDetails: z.array(z.object({
      createTime: z.string(),
      endTime: z.string(),
      error: z.object({
        code: z.number(),
        details: z.array(z.unknown()),
        message: z.string(),
      }),
      execution: z.object({
        createTime: z.string(),
        description: z.string(),
        displayName: z.string(),
        etag: z.string(),
        labels: z.record(z.string(), z.unknown()),
        metadata: z.record(z.string(), z.unknown()),
        name: z.string(),
        schemaTitle: z.string(),
        schemaVersion: z.string(),
        state: z.string(),
        updateTime: z.string(),
      }),
      executorDetail: z.object({
        containerDetail: z.object({
          failedMainJobs: z.unknown(),
          failedPreCachingCheckJobs: z.unknown(),
          mainJob: z.unknown(),
          preCachingCheckJob: z.unknown(),
        }),
        customJobDetail: z.object({
          failedJobs: z.unknown(),
          job: z.unknown(),
        }),
      }),
      inputs: z.record(z.string(), z.unknown()),
      outputs: z.record(z.string(), z.unknown()),
      parentTaskId: z.string(),
      pipelineTaskStatus: z.array(z.object({
        error: z.unknown(),
        state: z.unknown(),
        updateTime: z.unknown(),
      })),
      startTime: z.string(),
      state: z.string(),
      taskId: z.string(),
      taskName: z.string(),
      taskUniqueName: z.string(),
    })),
  }).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  network: z.string().optional(),
  pipelineSpec: z.record(z.string(), z.unknown()).optional(),
  preflightValidations: z.boolean().optional(),
  pscInterfaceConfig: z.object({
    dnsPeeringConfigs: z.array(z.object({
      domain: z.string(),
      targetNetwork: z.string(),
      targetProject: z.string(),
    })),
    networkAttachment: z.string(),
  }).optional(),
  reservedIpRanges: z.array(z.string()).optional(),
  runtimeConfig: z.object({
    failurePolicy: z.string(),
    gcsOutputDirectory: z.string(),
    inputArtifacts: z.record(z.string(), z.unknown()),
    parameterValues: z.record(z.string(), z.unknown()),
    parameters: z.record(z.string(), z.unknown()),
  }).optional(),
  scheduleName: z.string().optional(),
  serviceAccount: z.string().optional(),
  startTime: z.string().optional(),
  state: z.string().optional(),
  templateMetadata: z.object({
    version: z.string(),
  }).optional(),
  templateUri: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
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
  error: z.object({
    code: z.number().int().describe(
      "The status code, which should be an enum value of google.rpc.Code.",
    ).optional(),
    details: z.array(z.record(z.string(), z.string())).describe(
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
      description: z.string().describe("Description of the Context").optional(),
      displayName: z.string().describe(
        "User provided display name of the Context. May be up to 128 Unicode characters.",
      ).optional(),
      etag: z.string().describe(
        'An eTag used to perform consistent read-modify-write updates. If not set, a blind "overwrite" update happens.',
      ).optional(),
      labels: z.record(z.string(), z.string()).describe(
        "The labels with user-defined metadata to organize your Contexts. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. No more than 64 user labels can be associated with one Context (System labels are excluded).",
      ).optional(),
      metadata: z.record(z.string(), z.string()).describe(
        "Properties of the Context. Top level metadata keys' heading and trailing spaces will be trimmed. The size of this field should not exceed 200KB.",
      ).optional(),
      name: z.string().describe("Immutable. The resource name of the Context.")
        .optional(),
      parentContexts: z.array(z.string()).describe(
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
      description: z.string().describe("Description of the Context").optional(),
      displayName: z.string().describe(
        "User provided display name of the Context. May be up to 128 Unicode characters.",
      ).optional(),
      etag: z.string().describe(
        'An eTag used to perform consistent read-modify-write updates. If not set, a blind "overwrite" update happens.',
      ).optional(),
      labels: z.record(z.string(), z.string()).describe(
        "The labels with user-defined metadata to organize your Contexts. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. No more than 64 user labels can be associated with one Context (System labels are excluded).",
      ).optional(),
      metadata: z.record(z.string(), z.string()).describe(
        "Properties of the Context. Top level metadata keys' heading and trailing spaces will be trimmed. The size of this field should not exceed 200KB.",
      ).optional(),
      name: z.string().describe("Immutable. The resource name of the Context.")
        .optional(),
      parentContexts: z.array(z.string()).describe(
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
      createTime: z.string().describe("Output only. Task create time.")
        .optional(),
      endTime: z.string().describe("Output only. Task end time.").optional(),
      error: z.object({
        code: z.number().int().describe(
          "The status code, which should be an enum value of google.rpc.Code.",
        ).optional(),
        details: z.array(z.unknown()).describe(
          "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
        ).optional(),
        message: z.string().describe(
          "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
        ).optional(),
      }).describe(
        "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
      ).optional(),
      execution: z.object({
        createTime: z.string().describe(
          "Output only. Timestamp when this Execution was created.",
        ).optional(),
        description: z.string().describe("Description of the Execution")
          .optional(),
        displayName: z.string().describe(
          "User provided display name of the Execution. May be up to 128 Unicode characters.",
        ).optional(),
        etag: z.string().describe(
          'An eTag used to perform consistent read-modify-write updates. If not set, a blind "overwrite" update happens.',
        ).optional(),
        labels: z.record(z.string(), z.unknown()).describe(
          "The labels with user-defined metadata to organize your Executions. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. No more than 64 user labels can be associated with one Execution (System labels are excluded).",
        ).optional(),
        metadata: z.record(z.string(), z.unknown()).describe(
          "Properties of the Execution. Top level metadata keys' heading and trailing spaces will be trimmed. The size of this field should not exceed 200KB.",
        ).optional(),
        name: z.string().describe(
          "Output only. The resource name of the Execution.",
        ).optional(),
        schemaTitle: z.string().describe(
          "The title of the schema describing the metadata. Schema title and version is expected to be registered in earlier Create Schema calls. And both are used together as unique identifiers to identify schemas within the local metadata store.",
        ).optional(),
        schemaVersion: z.string().describe(
          "The version of the schema in `schema_title` to use. Schema title and version is expected to be registered in earlier Create Schema calls. And both are used together as unique identifiers to identify schemas within the local metadata store.",
        ).optional(),
        state: z.enum([
          "STATE_UNSPECIFIED",
          "NEW",
          "RUNNING",
          "COMPLETE",
          "FAILED",
          "CACHED",
          "CANCELLED",
        ]).describe(
          "The state of this Execution. This is a property of the Execution, and does not imply or capture any ongoing process. This property is managed by clients (such as Vertex AI Pipelines) and the system does not prescribe or check the validity of state transitions.",
        ).optional(),
        updateTime: z.string().describe(
          "Output only. Timestamp when this Execution was last updated.",
        ).optional(),
      }).describe("Instance of a general execution.").optional(),
      executorDetail: z.object({
        containerDetail: z.object({
          failedMainJobs: z.unknown().describe(
            "Output only. The names of the previously failed CustomJob for the main container executions. The list includes the all attempts in chronological order.",
          ).optional(),
          failedPreCachingCheckJobs: z.unknown().describe(
            "Output only. The names of the previously failed CustomJob for the pre-caching-check container executions. This job will be available if the PipelineJob.pipeline_spec specifies the `pre_caching_check` hook in the lifecycle events. The list includes the all attempts in chronological order.",
          ).optional(),
          mainJob: z.unknown().describe(
            "Output only. The name of the CustomJob for the main container execution.",
          ).optional(),
          preCachingCheckJob: z.unknown().describe(
            "Output only. The name of the CustomJob for the pre-caching-check container execution. This job will be available if the PipelineJob.pipeline_spec specifies the `pre_caching_check` hook in the lifecycle events.",
          ).optional(),
        }).describe(
          "The detail of a container execution. It contains the job names of the lifecycle of a container execution.",
        ).optional(),
        customJobDetail: z.object({
          failedJobs: z.unknown().describe(
            "Output only. The names of the previously failed CustomJob. The list includes the all attempts in chronological order.",
          ).optional(),
          job: z.unknown().describe("Output only. The name of the CustomJob.")
            .optional(),
        }).describe("The detailed info for a custom job executor.").optional(),
      }).describe("The runtime detail of a pipeline executor.").optional(),
      inputs: z.record(
        z.string(),
        z.object({
          artifacts: z.unknown().describe(
            "Output only. A list of artifact metadata.",
          ).optional(),
        }),
      ).describe("Output only. The runtime input artifacts of the task.")
        .optional(),
      outputs: z.record(
        z.string(),
        z.object({
          artifacts: z.unknown().describe(
            "Output only. A list of artifact metadata.",
          ).optional(),
        }),
      ).describe("Output only. The runtime output artifacts of the task.")
        .optional(),
      parentTaskId: z.string().describe(
        "Output only. The id of the parent task if the task is within a component scope. Empty if the task is at the root level.",
      ).optional(),
      pipelineTaskStatus: z.array(z.object({
        error: z.unknown().describe(
          "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
        ).optional(),
        state: z.unknown().describe("Output only. The state of the task.")
          .optional(),
        updateTime: z.unknown().describe(
          "Output only. Update time of this status.",
        ).optional(),
      })).describe(
        "Output only. A list of task status. This field keeps a record of task status evolving over time.",
      ).optional(),
      startTime: z.string().describe("Output only. Task start time.")
        .optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "PENDING",
        "RUNNING",
        "SUCCEEDED",
        "CANCEL_PENDING",
        "CANCELLING",
        "CANCELLED",
        "FAILED",
        "SKIPPED",
        "NOT_TRIGGERED",
      ]).describe("Output only. State of the task.").optional(),
      taskId: z.string().describe(
        "Output only. The system generated ID of the task.",
      ).optional(),
      taskName: z.string().describe(
        "Output only. The user specified name of the task that is defined in pipeline_spec.",
      ).optional(),
      taskUniqueName: z.string().describe(
        'Output only. The unique name of a task. This field is used by rerun pipeline job. Console UI and Vertex AI SDK will support triggering pipeline job reruns. The name is constructed by concatenating all the parent tasks name with the task name. For example, if a task named "child_task" has a parent task named "parent_task_1" and parent task 1 has a parent task named "parent_task_2", the task unique name will be "parent_task_2.parent_task_1.child_task".',
      ).optional(),
    })).describe(
      "Output only. The runtime details of the tasks under the pipeline.",
    ).optional(),
  }).describe("The runtime detail of PipelineJob.").optional(),
  labels: z.record(z.string(), z.string()).describe(
    "The labels with user-defined metadata to organize PipelineJob. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. See https://goo.gl/xmQnxf for more information and examples of labels. Note there is some reserved label key for Vertex AI Pipelines. - `vertex-ai-pipelines-run-billing-id`, user set value will get overrided.",
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
      domain: z.string().describe(
        'Required. The DNS name suffix of the zone being peered to, e.g., "my-internal-domain.corp.". Must end with a dot.',
      ).optional(),
      targetNetwork: z.string().describe(
        "Required. The VPC network name in the target_project where the DNS zone specified by 'domain' is visible.",
      ).optional(),
      targetProject: z.string().describe(
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
        artifactId: z.string().describe(
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
        doubleValue: z.number().describe("A double value.").optional(),
        intValue: z.string().describe("An integer value.").optional(),
        stringValue: z.string().describe("A string value.").optional(),
      }),
    ).describe(
      "Deprecated. Use RuntimeConfig.parameter_values instead. The runtime parameters of the PipelineJob. The parameters will be passed into PipelineJob.pipeline_spec to replace the placeholders at runtime. This field is used by pipelines built using `PipelineJob.pipeline_spec.schema_version` 2.0.0 or lower, such as pipelines built using Kubeflow Pipelines SDK 1.8 or lower.",
    ).optional(),
  }).describe("The runtime config of a PipelineJob.").optional(),
  serviceAccount: z.string().describe(
    "The service account that the pipeline workload runs as. If not specified, the Compute Engine default service account in the project will be used. See https://cloud.google.com/compute/docs/access/service-accounts#default_service_account Users starting the pipeline must have the `iam.serviceAccounts.actAs` permission on this service account.",
  ).optional(),
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
  pipelineJobId: z.string().describe(
    "The ID to use for the PipelineJob, which will become the final component of the PipelineJob name. If not provided, an ID will be automatically generated. This value should be less than 128 characters, and valid characters are `/a-z-/`.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Vertex AI PipelineJobs. Registered at `@swamp/gcp/aiplatform/pipelinejobs`. */
export const model = {
  type: "@swamp/gcp/aiplatform/pipelinejobs",
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
      description: "An instance of a machine learning PipelineJob.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a pipelineJobs",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["encryptionSpec"] !== undefined) {
          body["encryptionSpec"] = g["encryptionSpec"];
        }
        if (g["error"] !== undefined) body["error"] = g["error"];
        if (g["jobDetail"] !== undefined) body["jobDetail"] = g["jobDetail"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["network"] !== undefined) body["network"] = g["network"];
        if (g["pipelineSpec"] !== undefined) {
          body["pipelineSpec"] = g["pipelineSpec"];
        }
        if (g["preflightValidations"] !== undefined) {
          body["preflightValidations"] = g["preflightValidations"];
        }
        if (g["pscInterfaceConfig"] !== undefined) {
          body["pscInterfaceConfig"] = g["pscInterfaceConfig"];
        }
        if (g["reservedIpRanges"] !== undefined) {
          body["reservedIpRanges"] = g["reservedIpRanges"];
        }
        if (g["runtimeConfig"] !== undefined) {
          body["runtimeConfig"] = g["runtimeConfig"];
        }
        if (g["serviceAccount"] !== undefined) {
          body["serviceAccount"] = g["serviceAccount"];
        }
        if (g["templateMetadata"] !== undefined) {
          body["templateMetadata"] = g["templateMetadata"];
        }
        if (g["templateUri"] !== undefined) {
          body["templateUri"] = g["templateUri"];
        }
        if (g["pipelineJobId"] !== undefined) {
          body["pipelineJobId"] = g["pipelineJobId"];
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
          undefined,
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
      description: "Get a pipelineJobs",
      arguments: z.object({
        identifier: z.string().describe("The name of the pipelineJobs"),
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
    delete: {
      description: "Delete the pipelineJobs",
      arguments: z.object({
        identifier: z.string().describe("The name of the pipelineJobs"),
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
      description: "Sync pipelineJobs state from GCP",
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
      description: "List pipelineJobs resources",
      arguments: z.object({
        filter: z.string().describe(
          'Lists the PipelineJobs that match the filter expression. The following fields are supported: * `pipeline_name`: Supports `=` and `!=` comparisons. * `display_name`: Supports `=`, `!=` comparisons, and `:` wildcard. * `pipeline_job_user_id`: Supports `=`, `!=` comparisons, and `:` wildcard. for example, can check if pipeline\'s display_name contains *step* by doing display_name:\\"*step*\\" * `state`: Supports `=` and `!=` comparisons. * `create_time`: Supports `=`, `!=`, `<`, `>`, `<=`, and `>=` comparisons. Values must be in RFC 3339 format. * `update_time`: Supports `=`, `!=`, `<`, `>`, `<=`, and `>=` comparisons. Values must be in RFC 3339 format. * `end_time`: Supports `=`, `!=`, `<`, `>`, `<=`, and `>=` comparisons. Values must be in RFC 3339 format. * `labels`: Supports key-value equality and key presence. * `template_uri`: Supports `=`, `!=` comparisons, and `:` wildcard. * `template_metadata.version`: Supports `=`, `!=` comparisons, and `:` wildcard. Filter expressions can be combined together using logical operators (`AND` & `OR`). For example: `pipeline_name="test" AND create_time>"2020-05-18T13:30:00Z"`. The syntax to define filter expression is based on https://google.aip.dev/160. Examples: * `create_time>"2021-05-18T00:00:00Z" OR update_time>"2020-05-18T00:00:00Z"` PipelineJobs created or updated after 2020-05-18 00:00:00 UTC. * `labels.env = "prod"` PipelineJobs with label "env" set to "prod".',
        ).optional(),
        orderBy: z.string().describe(
          'A comma-separated list of fields to order by. The default sort order is in ascending order. Use "desc" after a field name for descending. You can have multiple order_by fields provided e.g. "create_time desc, end_time", "end_time, start_time, update_time" For example, using "create_time desc, end_time" will order results by create time in descending order, and if there are multiple jobs having the same create time, order them by the end time in ascending order. if order_by is not specified, it will order by default order is create time in descending order. Supported fields: * `create_time` * `update_time` * `end_time` * `start_time`',
        ).optional(),
        pageSize: z.number().describe("The standard list page size.")
          .optional(),
        readMask: z.string().describe("Mask specifying which fields to read.")
          .optional(),
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
        if (args["readMask"] !== undefined) {
          params["readMask"] = String(args["readMask"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "pipelineJobs",
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
    batch_cancel: {
      description: "batch cancel",
      arguments: z.object({
        names: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["names"] !== undefined) body["names"] = args["names"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "aiplatform.projects.locations.pipelineJobs.batchCancel",
            "path": "v1/{+parent}/pipelineJobs:batchCancel",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    batch_delete: {
      description: "batch delete",
      arguments: z.object({
        names: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["names"] !== undefined) body["names"] = args["names"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "aiplatform.projects.locations.pipelineJobs.batchDelete",
            "path": "v1/{+parent}/pipelineJobs:batchDelete",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
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
            "id": "aiplatform.projects.locations.pipelineJobs.cancel",
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
  },
};
