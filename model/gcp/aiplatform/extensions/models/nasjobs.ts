// Auto-generated extension model for @swamp/gcp/aiplatform/nasjobs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Agent Platform NasJobs.
 *
 * Represents a Neural Architecture Search (NAS) job.
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
  return `${parent}/nasJobs/${shortName}`;
}

const BASE_URL = "https://aiplatform.googleapis.com/";

const GET_CONFIG = {
  "id": "aiplatform.projects.locations.nasJobs.get",
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
  "id": "aiplatform.projects.locations.nasJobs.create",
  "path": "v1/{+parent}/nasJobs",
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
  "id": "aiplatform.projects.locations.nasJobs.delete",
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
  "id": "aiplatform.projects.locations.nasJobs.list",
  "path": "v1/{+parent}/nasJobs",
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
    "Required. The display name of the NasJob. The name can be up to 128 characters long and can consist of any UTF-8 characters.",
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
  labels: z.record(z.string(), z.string()).describe(
    "The labels with user-defined metadata to organize NasJobs. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. See https://goo.gl/xmQnxf for more information and examples of labels.",
  ).optional(),
  nasJobOutput: z.object({
    multiTrialJobOutput: z.object({
      searchTrials: z.array(z.object({
        endTime: z.string().describe(
          "Output only. Time when the NasTrial's status changed to `SUCCEEDED` or `INFEASIBLE`.",
        ).optional(),
        finalMeasurement: z.object({
          elapsedDuration: z.unknown().describe(
            "Output only. Time that the Trial has been running at the point of this Measurement.",
          ).optional(),
          metrics: z.unknown().describe(
            "Output only. A list of metrics got by evaluating the objective functions using suggested Parameter values.",
          ).optional(),
          stepCount: z.unknown().describe(
            "Output only. The number of steps the machine learning model has been trained for. Must be non-negative.",
          ).optional(),
        }).describe(
          "A message representing a Measurement of a Trial. A Measurement contains the Metrics got by executing a Trial using suggested hyperparameter values.",
        ).optional(),
        id: z.string().describe(
          "Output only. The identifier of the NasTrial assigned by the service.",
        ).optional(),
        startTime: z.string().describe(
          "Output only. Time when the NasTrial was started.",
        ).optional(),
        state: z.enum([
          "STATE_UNSPECIFIED",
          "REQUESTED",
          "ACTIVE",
          "STOPPING",
          "SUCCEEDED",
          "INFEASIBLE",
        ]).describe("Output only. The detailed state of the NasTrial.")
          .optional(),
      })).describe(
        "Output only. List of NasTrials that were started as part of search stage.",
      ).optional(),
      trainTrials: z.array(z.object({
        endTime: z.string().describe(
          "Output only. Time when the NasTrial's status changed to `SUCCEEDED` or `INFEASIBLE`.",
        ).optional(),
        finalMeasurement: z.object({
          elapsedDuration: z.unknown().describe(
            "Output only. Time that the Trial has been running at the point of this Measurement.",
          ).optional(),
          metrics: z.unknown().describe(
            "Output only. A list of metrics got by evaluating the objective functions using suggested Parameter values.",
          ).optional(),
          stepCount: z.unknown().describe(
            "Output only. The number of steps the machine learning model has been trained for. Must be non-negative.",
          ).optional(),
        }).describe(
          "A message representing a Measurement of a Trial. A Measurement contains the Metrics got by executing a Trial using suggested hyperparameter values.",
        ).optional(),
        id: z.string().describe(
          "Output only. The identifier of the NasTrial assigned by the service.",
        ).optional(),
        startTime: z.string().describe(
          "Output only. Time when the NasTrial was started.",
        ).optional(),
        state: z.enum([
          "STATE_UNSPECIFIED",
          "REQUESTED",
          "ACTIVE",
          "STOPPING",
          "SUCCEEDED",
          "INFEASIBLE",
        ]).describe("Output only. The detailed state of the NasTrial.")
          .optional(),
      })).describe(
        "Output only. List of NasTrials that were started as part of train stage.",
      ).optional(),
    }).describe(
      "The output of a multi-trial Neural Architecture Search (NAS) jobs.",
    ).optional(),
  }).describe("Represents a uCAIP NasJob output.").optional(),
  nasJobSpec: z.object({
    multiTrialAlgorithmSpec: z.object({
      metric: z.object({
        goal: z.enum(["GOAL_TYPE_UNSPECIFIED", "MAXIMIZE", "MINIMIZE"])
          .describe("Required. The optimization goal of the metric.")
          .optional(),
        metricId: z.string().describe(
          "Required. The ID of the metric. Must not contain whitespaces.",
        ).optional(),
      }).describe("Represents a metric to optimize.").optional(),
      multiTrialAlgorithm: z.enum([
        "MULTI_TRIAL_ALGORITHM_UNSPECIFIED",
        "REINFORCEMENT_LEARNING",
        "GRID_SEARCH",
      ]).describe(
        "The multi-trial Neural Architecture Search (NAS) algorithm type. Defaults to `REINFORCEMENT_LEARNING`.",
      ).optional(),
      searchTrialSpec: z.object({
        maxFailedTrialCount: z.number().int().describe(
          "The number of failed trials that need to be seen before failing the NasJob. If set to 0, Vertex AI decides how many trials must fail before the whole job fails.",
        ).optional(),
        maxParallelTrialCount: z.number().int().describe(
          "Required. The maximum number of trials to run in parallel.",
        ).optional(),
        maxTrialCount: z.number().int().describe(
          "Required. The maximum number of Neural Architecture Search (NAS) trials to run.",
        ).optional(),
        searchTrialJobSpec: z.object({
          baseOutputDirectory: z.object({
            outputUriPrefix: z.unknown().describe(
              "Required. Google Cloud Storage URI to output directory. If the uri doesn't end with '/', a '/' will be automatically appended. The directory is created if it doesn't exist.",
            ).optional(),
          }).describe(
            "The Google Cloud Storage location where the output is to be written to.",
          ).optional(),
          enableDashboardAccess: z.boolean().describe(
            "Optional. Whether you want Vertex AI to enable access to the customized dashboard in training chief container. If set to `true`, you can access the dashboard at the URIs given by CustomJob.web_access_uris or Trial.web_access_uris (within HyperparameterTuningJob.trials).",
          ).optional(),
          enableWebAccess: z.boolean().describe(
            "Optional. Whether you want Vertex AI to enable [interactive shell access](https://cloud.google.com/vertex-ai/docs/training/monitor-debug-interactive-shell) to training containers. If set to `true`, you can access interactive shells at the URIs given by CustomJob.web_access_uris or Trial.web_access_uris (within HyperparameterTuningJob.trials).",
          ).optional(),
          experiment: z.string().describe(
            "Optional. The Experiment associated with this job. Format: `projects/{project}/locations/{location}/metadataStores/{metadataStores}/contexts/{experiment-name}`",
          ).optional(),
          experimentRun: z.string().describe(
            "Optional. The Experiment Run associated with this job. Format: `projects/{project}/locations/{location}/metadataStores/{metadataStores}/contexts/{experiment-name}-{experiment-run-name}`",
          ).optional(),
          models: z.array(z.unknown()).describe(
            'Optional. The name of the Model resources for which to generate a mapping to artifact URIs. Applicable only to some of the Google-provided custom jobs. Format: `projects/{project}/locations/{location}/models/{model}` In order to retrieve a specific version of the model, also provide the version ID or version alias. Example: `projects/{project}/locations/{location}/models/{model}@2` or `projects/{project}/locations/{location}/models/{model}@golden` If no version ID or alias is specified, the "default" version will be returned. The "default" version alias is created for the first version of the model, and can be moved to other versions later on. There will be exactly one default version.',
          ).optional(),
          network: z.string().describe(
            "Optional. The full name of the Compute Engine [network](/compute/docs/networks-and-firewalls#networks) to which the Job should be peered. For example, `projects/12345/global/networks/myVPC`. [Format](/compute/docs/reference/rest/v1/networks/insert) is of the form `projects/{project}/global/networks/{network}`. Where {project} is a project number, as in `12345`, and {network} is a network name. To specify this field, you must have already [configured VPC Network Peering for Vertex AI](https://cloud.google.com/vertex-ai/docs/general/vpc-peering). If this field is left unspecified, the job is not peered with any network.",
          ).optional(),
          persistentResourceId: z.string().describe(
            "Optional. The ID of the PersistentResource in the same Project and Location which to run If this is specified, the job will be run on existing machines held by the PersistentResource instead of on-demand short-live machines. The network and CMEK configs on the job should be consistent with those on the PersistentResource, otherwise, the job will be rejected.",
          ).optional(),
          protectedArtifactLocationId: z.string().describe(
            "The ID of the location to store protected artifacts. e.g. us-central1. Populate only when the location is different than CustomJob location. List of supported locations: https://cloud.google.com/vertex-ai/docs/general/locations",
          ).optional(),
          pscInterfaceConfig: z.object({
            dnsPeeringConfigs: z.unknown().describe(
              "Optional. DNS peering configurations. When specified, Vertex AI will attempt to configure DNS peering zones in the tenant project VPC to resolve the specified domains using the target network's Cloud DNS. The user must grant the dns.peer role to the Vertex AI Service Agent on the target project.",
            ).optional(),
            networkAttachment: z.unknown().describe(
              "Optional. The name of the Compute Engine [network attachment](https://cloud.google.com/vpc/docs/about-network-attachments) to attach to the resource within the region and user project. To specify this field, you must have already [created a network attachment] (https://cloud.google.com/vpc/docs/create-manage-network-attachments#create-network-attachments). This field is only used for resources using PSC-I.",
            ).optional(),
          }).describe("Configuration for PSC-I.").optional(),
          reservedIpRanges: z.array(z.unknown()).describe(
            "Optional. A list of names for the reserved ip ranges under the VPC network that can be used for this job. If set, we will deploy the job within the provided ip ranges. Otherwise, the job will be deployed to any ip ranges under the provided VPC network. Example: ['vertex-ai-ip-range'].",
          ).optional(),
          scheduling: z.object({
            disableRetries: z.unknown().describe(
              "Optional. Indicates if the job should retry for internal errors after the job starts running. If true, overrides `Scheduling.restart_job_on_worker_restart` to false.",
            ).optional(),
            maxWaitDuration: z.unknown().describe(
              "Optional. This is the maximum duration that a job will wait for the requested resources to be provisioned if the scheduling strategy is set to [Strategy.DWS_FLEX_START]. If set to 0, the job will wait indefinitely. The default is 24 hours.",
            ).optional(),
            restartJobOnWorkerRestart: z.unknown().describe(
              "Optional. Restarts the entire CustomJob if a worker gets restarted. This feature can be used by distributed training jobs that are not resilient to workers leaving and joining a job.",
            ).optional(),
            strategy: z.unknown().describe(
              "Optional. This determines which type of scheduling strategy to use.",
            ).optional(),
            timeout: z.unknown().describe(
              "Optional. The maximum job running time. The default is 7 days.",
            ).optional(),
          }).describe(
            "All parameters related to queuing and scheduling of custom jobs.",
          ).optional(),
          serviceAccount: z.string().describe(
            "Specifies the service account for workload run-as account. Users submitting jobs must have act-as permission on this run-as account. If unspecified, the [Vertex AI Custom Code Service Agent](https://cloud.google.com/vertex-ai/docs/general/access-control#service-agents) for the CustomJob's project is used.",
          ).optional(),
          tensorboard: z.string().describe(
            "Optional. The name of a Vertex AI Tensorboard resource to which this CustomJob will upload Tensorboard logs. Format: `projects/{project}/locations/{location}/tensorboards/{tensorboard}`",
          ).optional(),
          workerPoolSpecs: z.array(z.unknown()).describe(
            "Required. The spec of the worker pools including machine type and Docker image. All worker pools except the first one are optional and can be skipped by providing an empty value.",
          ).optional(),
        }).describe("Represents the spec of a CustomJob.").optional(),
      }).describe("Represent spec for search trials.").optional(),
      trainTrialSpec: z.object({
        frequency: z.number().int().describe(
          "Required. Frequency of search trials to start train stage. Top N [TrainTrialSpec.max_parallel_trial_count] search trials will be trained for every M [TrainTrialSpec.frequency] trials searched.",
        ).optional(),
        maxParallelTrialCount: z.number().int().describe(
          "Required. The maximum number of trials to run in parallel.",
        ).optional(),
        trainTrialJobSpec: z.object({
          baseOutputDirectory: z.object({
            outputUriPrefix: z.unknown().describe(
              "Required. Google Cloud Storage URI to output directory. If the uri doesn't end with '/', a '/' will be automatically appended. The directory is created if it doesn't exist.",
            ).optional(),
          }).describe(
            "The Google Cloud Storage location where the output is to be written to.",
          ).optional(),
          enableDashboardAccess: z.boolean().describe(
            "Optional. Whether you want Vertex AI to enable access to the customized dashboard in training chief container. If set to `true`, you can access the dashboard at the URIs given by CustomJob.web_access_uris or Trial.web_access_uris (within HyperparameterTuningJob.trials).",
          ).optional(),
          enableWebAccess: z.boolean().describe(
            "Optional. Whether you want Vertex AI to enable [interactive shell access](https://cloud.google.com/vertex-ai/docs/training/monitor-debug-interactive-shell) to training containers. If set to `true`, you can access interactive shells at the URIs given by CustomJob.web_access_uris or Trial.web_access_uris (within HyperparameterTuningJob.trials).",
          ).optional(),
          experiment: z.string().describe(
            "Optional. The Experiment associated with this job. Format: `projects/{project}/locations/{location}/metadataStores/{metadataStores}/contexts/{experiment-name}`",
          ).optional(),
          experimentRun: z.string().describe(
            "Optional. The Experiment Run associated with this job. Format: `projects/{project}/locations/{location}/metadataStores/{metadataStores}/contexts/{experiment-name}-{experiment-run-name}`",
          ).optional(),
          models: z.array(z.unknown()).describe(
            'Optional. The name of the Model resources for which to generate a mapping to artifact URIs. Applicable only to some of the Google-provided custom jobs. Format: `projects/{project}/locations/{location}/models/{model}` In order to retrieve a specific version of the model, also provide the version ID or version alias. Example: `projects/{project}/locations/{location}/models/{model}@2` or `projects/{project}/locations/{location}/models/{model}@golden` If no version ID or alias is specified, the "default" version will be returned. The "default" version alias is created for the first version of the model, and can be moved to other versions later on. There will be exactly one default version.',
          ).optional(),
          network: z.string().describe(
            "Optional. The full name of the Compute Engine [network](/compute/docs/networks-and-firewalls#networks) to which the Job should be peered. For example, `projects/12345/global/networks/myVPC`. [Format](/compute/docs/reference/rest/v1/networks/insert) is of the form `projects/{project}/global/networks/{network}`. Where {project} is a project number, as in `12345`, and {network} is a network name. To specify this field, you must have already [configured VPC Network Peering for Vertex AI](https://cloud.google.com/vertex-ai/docs/general/vpc-peering). If this field is left unspecified, the job is not peered with any network.",
          ).optional(),
          persistentResourceId: z.string().describe(
            "Optional. The ID of the PersistentResource in the same Project and Location which to run If this is specified, the job will be run on existing machines held by the PersistentResource instead of on-demand short-live machines. The network and CMEK configs on the job should be consistent with those on the PersistentResource, otherwise, the job will be rejected.",
          ).optional(),
          protectedArtifactLocationId: z.string().describe(
            "The ID of the location to store protected artifacts. e.g. us-central1. Populate only when the location is different than CustomJob location. List of supported locations: https://cloud.google.com/vertex-ai/docs/general/locations",
          ).optional(),
          pscInterfaceConfig: z.object({
            dnsPeeringConfigs: z.unknown().describe(
              "Optional. DNS peering configurations. When specified, Vertex AI will attempt to configure DNS peering zones in the tenant project VPC to resolve the specified domains using the target network's Cloud DNS. The user must grant the dns.peer role to the Vertex AI Service Agent on the target project.",
            ).optional(),
            networkAttachment: z.unknown().describe(
              "Optional. The name of the Compute Engine [network attachment](https://cloud.google.com/vpc/docs/about-network-attachments) to attach to the resource within the region and user project. To specify this field, you must have already [created a network attachment] (https://cloud.google.com/vpc/docs/create-manage-network-attachments#create-network-attachments). This field is only used for resources using PSC-I.",
            ).optional(),
          }).describe("Configuration for PSC-I.").optional(),
          reservedIpRanges: z.array(z.unknown()).describe(
            "Optional. A list of names for the reserved ip ranges under the VPC network that can be used for this job. If set, we will deploy the job within the provided ip ranges. Otherwise, the job will be deployed to any ip ranges under the provided VPC network. Example: ['vertex-ai-ip-range'].",
          ).optional(),
          scheduling: z.object({
            disableRetries: z.unknown().describe(
              "Optional. Indicates if the job should retry for internal errors after the job starts running. If true, overrides `Scheduling.restart_job_on_worker_restart` to false.",
            ).optional(),
            maxWaitDuration: z.unknown().describe(
              "Optional. This is the maximum duration that a job will wait for the requested resources to be provisioned if the scheduling strategy is set to [Strategy.DWS_FLEX_START]. If set to 0, the job will wait indefinitely. The default is 24 hours.",
            ).optional(),
            restartJobOnWorkerRestart: z.unknown().describe(
              "Optional. Restarts the entire CustomJob if a worker gets restarted. This feature can be used by distributed training jobs that are not resilient to workers leaving and joining a job.",
            ).optional(),
            strategy: z.unknown().describe(
              "Optional. This determines which type of scheduling strategy to use.",
            ).optional(),
            timeout: z.unknown().describe(
              "Optional. The maximum job running time. The default is 7 days.",
            ).optional(),
          }).describe(
            "All parameters related to queuing and scheduling of custom jobs.",
          ).optional(),
          serviceAccount: z.string().describe(
            "Specifies the service account for workload run-as account. Users submitting jobs must have act-as permission on this run-as account. If unspecified, the [Vertex AI Custom Code Service Agent](https://cloud.google.com/vertex-ai/docs/general/access-control#service-agents) for the CustomJob's project is used.",
          ).optional(),
          tensorboard: z.string().describe(
            "Optional. The name of a Vertex AI Tensorboard resource to which this CustomJob will upload Tensorboard logs. Format: `projects/{project}/locations/{location}/tensorboards/{tensorboard}`",
          ).optional(),
          workerPoolSpecs: z.array(z.unknown()).describe(
            "Required. The spec of the worker pools including machine type and Docker image. All worker pools except the first one are optional and can be skipped by providing an empty value.",
          ).optional(),
        }).describe("Represents the spec of a CustomJob.").optional(),
      }).describe("Represent spec for train trials.").optional(),
    }).describe("The spec of multi-trial Neural Architecture Search (NAS).")
      .optional(),
    resumeNasJobId: z.string().describe(
      "The ID of the existing NasJob in the same Project and Location which will be used to resume search. search_space_spec and nas_algorithm_spec are obtained from previous NasJob hence should not provide them again for this NasJob.",
    ).optional(),
    searchSpaceSpec: z.string().describe(
      "It defines the search space for Neural Architecture Search (NAS).",
    ).optional(),
  }).describe("Represents the spec of a NasJob.").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  enableRestrictedImageTraining: z.boolean().optional(),
  encryptionSpec: z.object({
    kmsKeyName: z.string(),
  }).optional(),
  endTime: z.string().optional(),
  error: z.object({
    code: z.number(),
    details: z.array(z.record(z.string(), z.unknown())),
    message: z.string(),
  }).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  nasJobOutput: z.object({
    multiTrialJobOutput: z.object({
      searchTrials: z.array(z.object({
        endTime: z.string(),
        finalMeasurement: z.object({
          elapsedDuration: z.unknown(),
          metrics: z.unknown(),
          stepCount: z.unknown(),
        }),
        id: z.string(),
        startTime: z.string(),
        state: z.string(),
      })),
      trainTrials: z.array(z.object({
        endTime: z.string(),
        finalMeasurement: z.object({
          elapsedDuration: z.unknown(),
          metrics: z.unknown(),
          stepCount: z.unknown(),
        }),
        id: z.string(),
        startTime: z.string(),
        state: z.string(),
      })),
    }),
  }).optional(),
  nasJobSpec: z.object({
    multiTrialAlgorithmSpec: z.object({
      metric: z.object({
        goal: z.string(),
        metricId: z.string(),
      }),
      multiTrialAlgorithm: z.string(),
      searchTrialSpec: z.object({
        maxFailedTrialCount: z.number(),
        maxParallelTrialCount: z.number(),
        maxTrialCount: z.number(),
        searchTrialJobSpec: z.object({
          baseOutputDirectory: z.object({
            outputUriPrefix: z.unknown(),
          }),
          enableDashboardAccess: z.boolean(),
          enableWebAccess: z.boolean(),
          experiment: z.string(),
          experimentRun: z.string(),
          models: z.array(z.unknown()),
          network: z.string(),
          persistentResourceId: z.string(),
          protectedArtifactLocationId: z.string(),
          pscInterfaceConfig: z.object({
            dnsPeeringConfigs: z.unknown(),
            networkAttachment: z.unknown(),
          }),
          reservedIpRanges: z.array(z.unknown()),
          scheduling: z.object({
            disableRetries: z.unknown(),
            maxWaitDuration: z.unknown(),
            restartJobOnWorkerRestart: z.unknown(),
            strategy: z.unknown(),
            timeout: z.unknown(),
          }),
          serviceAccount: z.string(),
          tensorboard: z.string(),
          workerPoolSpecs: z.array(z.unknown()),
        }),
      }),
      trainTrialSpec: z.object({
        frequency: z.number(),
        maxParallelTrialCount: z.number(),
        trainTrialJobSpec: z.object({
          baseOutputDirectory: z.object({
            outputUriPrefix: z.unknown(),
          }),
          enableDashboardAccess: z.boolean(),
          enableWebAccess: z.boolean(),
          experiment: z.string(),
          experimentRun: z.string(),
          models: z.array(z.unknown()),
          network: z.string(),
          persistentResourceId: z.string(),
          protectedArtifactLocationId: z.string(),
          pscInterfaceConfig: z.object({
            dnsPeeringConfigs: z.unknown(),
            networkAttachment: z.unknown(),
          }),
          reservedIpRanges: z.array(z.unknown()),
          scheduling: z.object({
            disableRetries: z.unknown(),
            maxWaitDuration: z.unknown(),
            restartJobOnWorkerRestart: z.unknown(),
            strategy: z.unknown(),
            timeout: z.unknown(),
          }),
          serviceAccount: z.string(),
          tensorboard: z.string(),
          workerPoolSpecs: z.array(z.unknown()),
        }),
      }),
    }),
    resumeNasJobId: z.string(),
    searchSpaceSpec: z.string(),
  }).optional(),
  satisfiesPzi: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  startTime: z.string().optional(),
  state: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  displayName: z.string().describe(
    "Required. The display name of the NasJob. The name can be up to 128 characters long and can consist of any UTF-8 characters.",
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
  labels: z.record(z.string(), z.string()).describe(
    "The labels with user-defined metadata to organize NasJobs. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. See https://goo.gl/xmQnxf for more information and examples of labels.",
  ).optional(),
  nasJobOutput: z.object({
    multiTrialJobOutput: z.object({
      searchTrials: z.array(z.object({
        endTime: z.string().describe(
          "Output only. Time when the NasTrial's status changed to `SUCCEEDED` or `INFEASIBLE`.",
        ).optional(),
        finalMeasurement: z.object({
          elapsedDuration: z.unknown().describe(
            "Output only. Time that the Trial has been running at the point of this Measurement.",
          ).optional(),
          metrics: z.unknown().describe(
            "Output only. A list of metrics got by evaluating the objective functions using suggested Parameter values.",
          ).optional(),
          stepCount: z.unknown().describe(
            "Output only. The number of steps the machine learning model has been trained for. Must be non-negative.",
          ).optional(),
        }).describe(
          "A message representing a Measurement of a Trial. A Measurement contains the Metrics got by executing a Trial using suggested hyperparameter values.",
        ).optional(),
        id: z.string().describe(
          "Output only. The identifier of the NasTrial assigned by the service.",
        ).optional(),
        startTime: z.string().describe(
          "Output only. Time when the NasTrial was started.",
        ).optional(),
        state: z.enum([
          "STATE_UNSPECIFIED",
          "REQUESTED",
          "ACTIVE",
          "STOPPING",
          "SUCCEEDED",
          "INFEASIBLE",
        ]).describe("Output only. The detailed state of the NasTrial.")
          .optional(),
      })).describe(
        "Output only. List of NasTrials that were started as part of search stage.",
      ).optional(),
      trainTrials: z.array(z.object({
        endTime: z.string().describe(
          "Output only. Time when the NasTrial's status changed to `SUCCEEDED` or `INFEASIBLE`.",
        ).optional(),
        finalMeasurement: z.object({
          elapsedDuration: z.unknown().describe(
            "Output only. Time that the Trial has been running at the point of this Measurement.",
          ).optional(),
          metrics: z.unknown().describe(
            "Output only. A list of metrics got by evaluating the objective functions using suggested Parameter values.",
          ).optional(),
          stepCount: z.unknown().describe(
            "Output only. The number of steps the machine learning model has been trained for. Must be non-negative.",
          ).optional(),
        }).describe(
          "A message representing a Measurement of a Trial. A Measurement contains the Metrics got by executing a Trial using suggested hyperparameter values.",
        ).optional(),
        id: z.string().describe(
          "Output only. The identifier of the NasTrial assigned by the service.",
        ).optional(),
        startTime: z.string().describe(
          "Output only. Time when the NasTrial was started.",
        ).optional(),
        state: z.enum([
          "STATE_UNSPECIFIED",
          "REQUESTED",
          "ACTIVE",
          "STOPPING",
          "SUCCEEDED",
          "INFEASIBLE",
        ]).describe("Output only. The detailed state of the NasTrial.")
          .optional(),
      })).describe(
        "Output only. List of NasTrials that were started as part of train stage.",
      ).optional(),
    }).describe(
      "The output of a multi-trial Neural Architecture Search (NAS) jobs.",
    ).optional(),
  }).describe("Represents a uCAIP NasJob output.").optional(),
  nasJobSpec: z.object({
    multiTrialAlgorithmSpec: z.object({
      metric: z.object({
        goal: z.enum(["GOAL_TYPE_UNSPECIFIED", "MAXIMIZE", "MINIMIZE"])
          .describe("Required. The optimization goal of the metric.")
          .optional(),
        metricId: z.string().describe(
          "Required. The ID of the metric. Must not contain whitespaces.",
        ).optional(),
      }).describe("Represents a metric to optimize.").optional(),
      multiTrialAlgorithm: z.enum([
        "MULTI_TRIAL_ALGORITHM_UNSPECIFIED",
        "REINFORCEMENT_LEARNING",
        "GRID_SEARCH",
      ]).describe(
        "The multi-trial Neural Architecture Search (NAS) algorithm type. Defaults to `REINFORCEMENT_LEARNING`.",
      ).optional(),
      searchTrialSpec: z.object({
        maxFailedTrialCount: z.number().int().describe(
          "The number of failed trials that need to be seen before failing the NasJob. If set to 0, Vertex AI decides how many trials must fail before the whole job fails.",
        ).optional(),
        maxParallelTrialCount: z.number().int().describe(
          "Required. The maximum number of trials to run in parallel.",
        ).optional(),
        maxTrialCount: z.number().int().describe(
          "Required. The maximum number of Neural Architecture Search (NAS) trials to run.",
        ).optional(),
        searchTrialJobSpec: z.object({
          baseOutputDirectory: z.object({
            outputUriPrefix: z.unknown().describe(
              "Required. Google Cloud Storage URI to output directory. If the uri doesn't end with '/', a '/' will be automatically appended. The directory is created if it doesn't exist.",
            ).optional(),
          }).describe(
            "The Google Cloud Storage location where the output is to be written to.",
          ).optional(),
          enableDashboardAccess: z.boolean().describe(
            "Optional. Whether you want Vertex AI to enable access to the customized dashboard in training chief container. If set to `true`, you can access the dashboard at the URIs given by CustomJob.web_access_uris or Trial.web_access_uris (within HyperparameterTuningJob.trials).",
          ).optional(),
          enableWebAccess: z.boolean().describe(
            "Optional. Whether you want Vertex AI to enable [interactive shell access](https://cloud.google.com/vertex-ai/docs/training/monitor-debug-interactive-shell) to training containers. If set to `true`, you can access interactive shells at the URIs given by CustomJob.web_access_uris or Trial.web_access_uris (within HyperparameterTuningJob.trials).",
          ).optional(),
          experiment: z.string().describe(
            "Optional. The Experiment associated with this job. Format: `projects/{project}/locations/{location}/metadataStores/{metadataStores}/contexts/{experiment-name}`",
          ).optional(),
          experimentRun: z.string().describe(
            "Optional. The Experiment Run associated with this job. Format: `projects/{project}/locations/{location}/metadataStores/{metadataStores}/contexts/{experiment-name}-{experiment-run-name}`",
          ).optional(),
          models: z.array(z.unknown()).describe(
            'Optional. The name of the Model resources for which to generate a mapping to artifact URIs. Applicable only to some of the Google-provided custom jobs. Format: `projects/{project}/locations/{location}/models/{model}` In order to retrieve a specific version of the model, also provide the version ID or version alias. Example: `projects/{project}/locations/{location}/models/{model}@2` or `projects/{project}/locations/{location}/models/{model}@golden` If no version ID or alias is specified, the "default" version will be returned. The "default" version alias is created for the first version of the model, and can be moved to other versions later on. There will be exactly one default version.',
          ).optional(),
          network: z.string().describe(
            "Optional. The full name of the Compute Engine [network](/compute/docs/networks-and-firewalls#networks) to which the Job should be peered. For example, `projects/12345/global/networks/myVPC`. [Format](/compute/docs/reference/rest/v1/networks/insert) is of the form `projects/{project}/global/networks/{network}`. Where {project} is a project number, as in `12345`, and {network} is a network name. To specify this field, you must have already [configured VPC Network Peering for Vertex AI](https://cloud.google.com/vertex-ai/docs/general/vpc-peering). If this field is left unspecified, the job is not peered with any network.",
          ).optional(),
          persistentResourceId: z.string().describe(
            "Optional. The ID of the PersistentResource in the same Project and Location which to run If this is specified, the job will be run on existing machines held by the PersistentResource instead of on-demand short-live machines. The network and CMEK configs on the job should be consistent with those on the PersistentResource, otherwise, the job will be rejected.",
          ).optional(),
          protectedArtifactLocationId: z.string().describe(
            "The ID of the location to store protected artifacts. e.g. us-central1. Populate only when the location is different than CustomJob location. List of supported locations: https://cloud.google.com/vertex-ai/docs/general/locations",
          ).optional(),
          pscInterfaceConfig: z.object({
            dnsPeeringConfigs: z.unknown().describe(
              "Optional. DNS peering configurations. When specified, Vertex AI will attempt to configure DNS peering zones in the tenant project VPC to resolve the specified domains using the target network's Cloud DNS. The user must grant the dns.peer role to the Vertex AI Service Agent on the target project.",
            ).optional(),
            networkAttachment: z.unknown().describe(
              "Optional. The name of the Compute Engine [network attachment](https://cloud.google.com/vpc/docs/about-network-attachments) to attach to the resource within the region and user project. To specify this field, you must have already [created a network attachment] (https://cloud.google.com/vpc/docs/create-manage-network-attachments#create-network-attachments). This field is only used for resources using PSC-I.",
            ).optional(),
          }).describe("Configuration for PSC-I.").optional(),
          reservedIpRanges: z.array(z.unknown()).describe(
            "Optional. A list of names for the reserved ip ranges under the VPC network that can be used for this job. If set, we will deploy the job within the provided ip ranges. Otherwise, the job will be deployed to any ip ranges under the provided VPC network. Example: ['vertex-ai-ip-range'].",
          ).optional(),
          scheduling: z.object({
            disableRetries: z.unknown().describe(
              "Optional. Indicates if the job should retry for internal errors after the job starts running. If true, overrides `Scheduling.restart_job_on_worker_restart` to false.",
            ).optional(),
            maxWaitDuration: z.unknown().describe(
              "Optional. This is the maximum duration that a job will wait for the requested resources to be provisioned if the scheduling strategy is set to [Strategy.DWS_FLEX_START]. If set to 0, the job will wait indefinitely. The default is 24 hours.",
            ).optional(),
            restartJobOnWorkerRestart: z.unknown().describe(
              "Optional. Restarts the entire CustomJob if a worker gets restarted. This feature can be used by distributed training jobs that are not resilient to workers leaving and joining a job.",
            ).optional(),
            strategy: z.unknown().describe(
              "Optional. This determines which type of scheduling strategy to use.",
            ).optional(),
            timeout: z.unknown().describe(
              "Optional. The maximum job running time. The default is 7 days.",
            ).optional(),
          }).describe(
            "All parameters related to queuing and scheduling of custom jobs.",
          ).optional(),
          serviceAccount: z.string().describe(
            "Specifies the service account for workload run-as account. Users submitting jobs must have act-as permission on this run-as account. If unspecified, the [Vertex AI Custom Code Service Agent](https://cloud.google.com/vertex-ai/docs/general/access-control#service-agents) for the CustomJob's project is used.",
          ).optional(),
          tensorboard: z.string().describe(
            "Optional. The name of a Vertex AI Tensorboard resource to which this CustomJob will upload Tensorboard logs. Format: `projects/{project}/locations/{location}/tensorboards/{tensorboard}`",
          ).optional(),
          workerPoolSpecs: z.array(z.unknown()).describe(
            "Required. The spec of the worker pools including machine type and Docker image. All worker pools except the first one are optional and can be skipped by providing an empty value.",
          ).optional(),
        }).describe("Represents the spec of a CustomJob.").optional(),
      }).describe("Represent spec for search trials.").optional(),
      trainTrialSpec: z.object({
        frequency: z.number().int().describe(
          "Required. Frequency of search trials to start train stage. Top N [TrainTrialSpec.max_parallel_trial_count] search trials will be trained for every M [TrainTrialSpec.frequency] trials searched.",
        ).optional(),
        maxParallelTrialCount: z.number().int().describe(
          "Required. The maximum number of trials to run in parallel.",
        ).optional(),
        trainTrialJobSpec: z.object({
          baseOutputDirectory: z.object({
            outputUriPrefix: z.unknown().describe(
              "Required. Google Cloud Storage URI to output directory. If the uri doesn't end with '/', a '/' will be automatically appended. The directory is created if it doesn't exist.",
            ).optional(),
          }).describe(
            "The Google Cloud Storage location where the output is to be written to.",
          ).optional(),
          enableDashboardAccess: z.boolean().describe(
            "Optional. Whether you want Vertex AI to enable access to the customized dashboard in training chief container. If set to `true`, you can access the dashboard at the URIs given by CustomJob.web_access_uris or Trial.web_access_uris (within HyperparameterTuningJob.trials).",
          ).optional(),
          enableWebAccess: z.boolean().describe(
            "Optional. Whether you want Vertex AI to enable [interactive shell access](https://cloud.google.com/vertex-ai/docs/training/monitor-debug-interactive-shell) to training containers. If set to `true`, you can access interactive shells at the URIs given by CustomJob.web_access_uris or Trial.web_access_uris (within HyperparameterTuningJob.trials).",
          ).optional(),
          experiment: z.string().describe(
            "Optional. The Experiment associated with this job. Format: `projects/{project}/locations/{location}/metadataStores/{metadataStores}/contexts/{experiment-name}`",
          ).optional(),
          experimentRun: z.string().describe(
            "Optional. The Experiment Run associated with this job. Format: `projects/{project}/locations/{location}/metadataStores/{metadataStores}/contexts/{experiment-name}-{experiment-run-name}`",
          ).optional(),
          models: z.array(z.unknown()).describe(
            'Optional. The name of the Model resources for which to generate a mapping to artifact URIs. Applicable only to some of the Google-provided custom jobs. Format: `projects/{project}/locations/{location}/models/{model}` In order to retrieve a specific version of the model, also provide the version ID or version alias. Example: `projects/{project}/locations/{location}/models/{model}@2` or `projects/{project}/locations/{location}/models/{model}@golden` If no version ID or alias is specified, the "default" version will be returned. The "default" version alias is created for the first version of the model, and can be moved to other versions later on. There will be exactly one default version.',
          ).optional(),
          network: z.string().describe(
            "Optional. The full name of the Compute Engine [network](/compute/docs/networks-and-firewalls#networks) to which the Job should be peered. For example, `projects/12345/global/networks/myVPC`. [Format](/compute/docs/reference/rest/v1/networks/insert) is of the form `projects/{project}/global/networks/{network}`. Where {project} is a project number, as in `12345`, and {network} is a network name. To specify this field, you must have already [configured VPC Network Peering for Vertex AI](https://cloud.google.com/vertex-ai/docs/general/vpc-peering). If this field is left unspecified, the job is not peered with any network.",
          ).optional(),
          persistentResourceId: z.string().describe(
            "Optional. The ID of the PersistentResource in the same Project and Location which to run If this is specified, the job will be run on existing machines held by the PersistentResource instead of on-demand short-live machines. The network and CMEK configs on the job should be consistent with those on the PersistentResource, otherwise, the job will be rejected.",
          ).optional(),
          protectedArtifactLocationId: z.string().describe(
            "The ID of the location to store protected artifacts. e.g. us-central1. Populate only when the location is different than CustomJob location. List of supported locations: https://cloud.google.com/vertex-ai/docs/general/locations",
          ).optional(),
          pscInterfaceConfig: z.object({
            dnsPeeringConfigs: z.unknown().describe(
              "Optional. DNS peering configurations. When specified, Vertex AI will attempt to configure DNS peering zones in the tenant project VPC to resolve the specified domains using the target network's Cloud DNS. The user must grant the dns.peer role to the Vertex AI Service Agent on the target project.",
            ).optional(),
            networkAttachment: z.unknown().describe(
              "Optional. The name of the Compute Engine [network attachment](https://cloud.google.com/vpc/docs/about-network-attachments) to attach to the resource within the region and user project. To specify this field, you must have already [created a network attachment] (https://cloud.google.com/vpc/docs/create-manage-network-attachments#create-network-attachments). This field is only used for resources using PSC-I.",
            ).optional(),
          }).describe("Configuration for PSC-I.").optional(),
          reservedIpRanges: z.array(z.unknown()).describe(
            "Optional. A list of names for the reserved ip ranges under the VPC network that can be used for this job. If set, we will deploy the job within the provided ip ranges. Otherwise, the job will be deployed to any ip ranges under the provided VPC network. Example: ['vertex-ai-ip-range'].",
          ).optional(),
          scheduling: z.object({
            disableRetries: z.unknown().describe(
              "Optional. Indicates if the job should retry for internal errors after the job starts running. If true, overrides `Scheduling.restart_job_on_worker_restart` to false.",
            ).optional(),
            maxWaitDuration: z.unknown().describe(
              "Optional. This is the maximum duration that a job will wait for the requested resources to be provisioned if the scheduling strategy is set to [Strategy.DWS_FLEX_START]. If set to 0, the job will wait indefinitely. The default is 24 hours.",
            ).optional(),
            restartJobOnWorkerRestart: z.unknown().describe(
              "Optional. Restarts the entire CustomJob if a worker gets restarted. This feature can be used by distributed training jobs that are not resilient to workers leaving and joining a job.",
            ).optional(),
            strategy: z.unknown().describe(
              "Optional. This determines which type of scheduling strategy to use.",
            ).optional(),
            timeout: z.unknown().describe(
              "Optional. The maximum job running time. The default is 7 days.",
            ).optional(),
          }).describe(
            "All parameters related to queuing and scheduling of custom jobs.",
          ).optional(),
          serviceAccount: z.string().describe(
            "Specifies the service account for workload run-as account. Users submitting jobs must have act-as permission on this run-as account. If unspecified, the [Vertex AI Custom Code Service Agent](https://cloud.google.com/vertex-ai/docs/general/access-control#service-agents) for the CustomJob's project is used.",
          ).optional(),
          tensorboard: z.string().describe(
            "Optional. The name of a Vertex AI Tensorboard resource to which this CustomJob will upload Tensorboard logs. Format: `projects/{project}/locations/{location}/tensorboards/{tensorboard}`",
          ).optional(),
          workerPoolSpecs: z.array(z.unknown()).describe(
            "Required. The spec of the worker pools including machine type and Docker image. All worker pools except the first one are optional and can be skipped by providing an empty value.",
          ).optional(),
        }).describe("Represents the spec of a CustomJob.").optional(),
      }).describe("Represent spec for train trials.").optional(),
    }).describe("The spec of multi-trial Neural Architecture Search (NAS).")
      .optional(),
    resumeNasJobId: z.string().describe(
      "The ID of the existing NasJob in the same Project and Location which will be used to resume search. search_space_spec and nas_algorithm_spec are obtained from previous NasJob hence should not provide them again for this NasJob.",
    ).optional(),
    searchSpaceSpec: z.string().describe(
      "It defines the search space for Neural Architecture Search (NAS).",
    ).optional(),
  }).describe("Represents the spec of a NasJob.").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Agent Platform NasJobs. Registered at `@swamp/gcp/aiplatform/nasjobs`. */
export const model = {
  type: "@swamp/gcp/aiplatform/nasjobs",
  version: "2026.05.26.1",
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
    {
      toVersion: "2026.05.26.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Represents a Neural Architecture Search (NAS) job.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a nasJobs",
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
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["nasJobOutput"] !== undefined) {
          body["nasJobOutput"] = g["nasJobOutput"];
        }
        if (g["nasJobSpec"] !== undefined) body["nasJobSpec"] = g["nasJobSpec"];
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
      description: "Get a nasJobs",
      arguments: z.object({
        identifier: z.string().describe("The name of the nasJobs"),
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
      description: "Delete the nasJobs",
      arguments: z.object({
        identifier: z.string().describe("The name of the nasJobs"),
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
      description: "Sync nasJobs state from GCP",
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
      description: "List nasJobs resources",
      arguments: z.object({
        filter: z.string().describe(
          'The standard list filter. Supported fields: * `display_name` supports `=`, `!=` comparisons, and `:` wildcard. * `state` supports `=`, `!=` comparisons. * `create_time` supports `=`, `!=`,`<`, `<=`,`>`, `>=` comparisons. `create_time` must be in RFC 3339 format. * `labels` supports general map functions that is: `labels.key=value` - key:value equality `labels.key:* - key existence Some examples of using the filter are: * `state="JOB_STATE_SUCCEEDED" AND display_name:"my_job_*"` * `state!="JOB_STATE_FAILED" OR display_name="my_job"` * `NOT display_name="my_job"` * `create_time>"2021-05-18T00:00:00Z"` * `labels.keyA=valueA` * `labels.keyB:*`',
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
          "nasJobs",
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
            "id": "aiplatform.projects.locations.nasJobs.cancel",
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
