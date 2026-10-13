// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

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
  type ExplicitGcpCredentials,
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
  displayName: z.string().describe(
    "Required. The display name of the NasJob. The name can be up to 128 characters long and can consist of any UTF-8 characters.",
  ).optional(),
  encryptionSpec: z.object({
    kmsKeyName: z.string().describe(
      "Required. Resource name of the Cloud KMS key used to protect the resource. The Cloud KMS key must be in the same region as the resource. It must have the format `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
    ).optional(),
  }).describe(
    "Customer-managed encryption key options for a NasJob. If this is set, then all resources created by the NasJob will be encrypted with the provided encryption key.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "The labels with user-defined metadata to organize NasJobs. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. See https://goo.gl/xmQnxf for more information and examples of labels.",
  ).optional(),
  nasJobSpec: z.object({
    multiTrialAlgorithmSpec: z.object({
      metric: z.object({
        goal: z.enum(["GOAL_TYPE_UNSPECIFIED", "MAXIMIZE", "MINIMIZE"])
          .describe("Required. The optimization goal of the metric.")
          .optional(),
        metricId: z.string().describe(
          "Required. The ID of the metric. Must not contain whitespaces.",
        ).optional(),
      }).describe(
        "Metric specs for the NAS job. Validation for this field is done at `multi_trial_algorithm_spec` field.",
      ).optional(),
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
            "The Cloud Storage location to store the output of this CustomJob or HyperparameterTuningJob. For HyperparameterTuningJob, the baseOutputDirectory of each child CustomJob backing a Trial is set to a subdirectory of name id under its parent HyperparameterTuningJob's baseOutputDirectory. The following Vertex AI environment variables will be passed to containers or python modules when this field is set: For CustomJob: * AIP_MODEL_DIR = `/model/` * AIP_CHECKPOINT_DIR = `/checkpoints/` * AIP_TENSORBOARD_LOG_DIR = `/logs/` For CustomJob backing a Trial of HyperparameterTuningJob: * AIP_MODEL_DIR = `//model/` * AIP_CHECKPOINT_DIR = `//checkpoints/` * AIP_TENSORBOARD_LOG_DIR = `//logs/`",
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
          }).describe("Optional. Configuration for PSC-I for CustomJob.")
            .optional(),
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
          }).describe("Scheduling options for a CustomJob.").optional(),
          serviceAccount: z.string().describe(
            "Specifies the service account for workload run-as account. Users submitting jobs must have act-as permission on this run-as account. If unspecified, the [Vertex AI Custom Code Service Agent](https://cloud.google.com/vertex-ai/docs/general/access-control#service-agents) for the CustomJob's project is used.",
          ).optional(),
          tensorboard: z.string().describe(
            "Optional. The name of a Vertex AI Tensorboard resource to which this CustomJob will upload Tensorboard logs. Format: `projects/{project}/locations/{location}/tensorboards/{tensorboard}`",
          ).optional(),
          workerPoolSpecs: z.array(z.unknown()).describe(
            "Required. The spec of the worker pools including machine type and Docker image. All worker pools except the first one are optional and can be skipped by providing an empty value.",
          ).optional(),
        }).describe(
          "Required. The spec of a search trial job. The same spec applies to all search trials.",
        ).optional(),
      }).describe("Required. Spec for search trials.").optional(),
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
            "The Cloud Storage location to store the output of this CustomJob or HyperparameterTuningJob. For HyperparameterTuningJob, the baseOutputDirectory of each child CustomJob backing a Trial is set to a subdirectory of name id under its parent HyperparameterTuningJob's baseOutputDirectory. The following Vertex AI environment variables will be passed to containers or python modules when this field is set: For CustomJob: * AIP_MODEL_DIR = `/model/` * AIP_CHECKPOINT_DIR = `/checkpoints/` * AIP_TENSORBOARD_LOG_DIR = `/logs/` For CustomJob backing a Trial of HyperparameterTuningJob: * AIP_MODEL_DIR = `//model/` * AIP_CHECKPOINT_DIR = `//checkpoints/` * AIP_TENSORBOARD_LOG_DIR = `//logs/`",
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
          }).describe("Optional. Configuration for PSC-I for CustomJob.")
            .optional(),
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
          }).describe("Scheduling options for a CustomJob.").optional(),
          serviceAccount: z.string().describe(
            "Specifies the service account for workload run-as account. Users submitting jobs must have act-as permission on this run-as account. If unspecified, the [Vertex AI Custom Code Service Agent](https://cloud.google.com/vertex-ai/docs/general/access-control#service-agents) for the CustomJob's project is used.",
          ).optional(),
          tensorboard: z.string().describe(
            "Optional. The name of a Vertex AI Tensorboard resource to which this CustomJob will upload Tensorboard logs. Format: `projects/{project}/locations/{location}/tensorboards/{tensorboard}`",
          ).optional(),
          workerPoolSpecs: z.array(z.unknown()).describe(
            "Required. The spec of the worker pools including machine type and Docker image. All worker pools except the first one are optional and can be skipped by providing an empty value.",
          ).optional(),
        }).describe(
          "Required. The spec of a train trial job. The same spec applies to all train trials.",
        ).optional(),
      }).describe(
        "Spec for train trials. Top N [TrainTrialSpec.max_parallel_trial_count] search trials will be trained for every M [TrainTrialSpec.frequency] trials searched.",
      ).optional(),
    }).describe("The spec of multi-trial algorithms.").optional(),
    resumeNasJobId: z.string().describe(
      "The ID of the existing NasJob in the same Project and Location which will be used to resume search. search_space_spec and nas_algorithm_spec are obtained from previous NasJob hence should not provide them again for this NasJob.",
    ).optional(),
    searchSpaceSpec: z.string().describe(
      "It defines the search space for Neural Architecture Search (NAS).",
    ).optional(),
  }).describe("Required. The specification of a NasJob.").optional(),
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
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  displayName: z.string().describe(
    "Required. The display name of the NasJob. The name can be up to 128 characters long and can consist of any UTF-8 characters.",
  ).optional(),
  encryptionSpec: z.object({
    kmsKeyName: z.string().describe(
      "Required. Resource name of the Cloud KMS key used to protect the resource. The Cloud KMS key must be in the same region as the resource. It must have the format `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
    ).optional(),
  }).describe(
    "Customer-managed encryption key options for a NasJob. If this is set, then all resources created by the NasJob will be encrypted with the provided encryption key.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "The labels with user-defined metadata to organize NasJobs. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. See https://goo.gl/xmQnxf for more information and examples of labels.",
  ).optional(),
  nasJobSpec: z.object({
    multiTrialAlgorithmSpec: z.object({
      metric: z.object({
        goal: z.enum(["GOAL_TYPE_UNSPECIFIED", "MAXIMIZE", "MINIMIZE"])
          .describe("Required. The optimization goal of the metric.")
          .optional(),
        metricId: z.string().describe(
          "Required. The ID of the metric. Must not contain whitespaces.",
        ).optional(),
      }).describe(
        "Metric specs for the NAS job. Validation for this field is done at `multi_trial_algorithm_spec` field.",
      ).optional(),
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
            "The Cloud Storage location to store the output of this CustomJob or HyperparameterTuningJob. For HyperparameterTuningJob, the baseOutputDirectory of each child CustomJob backing a Trial is set to a subdirectory of name id under its parent HyperparameterTuningJob's baseOutputDirectory. The following Vertex AI environment variables will be passed to containers or python modules when this field is set: For CustomJob: * AIP_MODEL_DIR = `/model/` * AIP_CHECKPOINT_DIR = `/checkpoints/` * AIP_TENSORBOARD_LOG_DIR = `/logs/` For CustomJob backing a Trial of HyperparameterTuningJob: * AIP_MODEL_DIR = `//model/` * AIP_CHECKPOINT_DIR = `//checkpoints/` * AIP_TENSORBOARD_LOG_DIR = `//logs/`",
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
          }).describe("Optional. Configuration for PSC-I for CustomJob.")
            .optional(),
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
          }).describe("Scheduling options for a CustomJob.").optional(),
          serviceAccount: z.string().describe(
            "Specifies the service account for workload run-as account. Users submitting jobs must have act-as permission on this run-as account. If unspecified, the [Vertex AI Custom Code Service Agent](https://cloud.google.com/vertex-ai/docs/general/access-control#service-agents) for the CustomJob's project is used.",
          ).optional(),
          tensorboard: z.string().describe(
            "Optional. The name of a Vertex AI Tensorboard resource to which this CustomJob will upload Tensorboard logs. Format: `projects/{project}/locations/{location}/tensorboards/{tensorboard}`",
          ).optional(),
          workerPoolSpecs: z.array(z.unknown()).describe(
            "Required. The spec of the worker pools including machine type and Docker image. All worker pools except the first one are optional and can be skipped by providing an empty value.",
          ).optional(),
        }).describe(
          "Required. The spec of a search trial job. The same spec applies to all search trials.",
        ).optional(),
      }).describe("Required. Spec for search trials.").optional(),
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
            "The Cloud Storage location to store the output of this CustomJob or HyperparameterTuningJob. For HyperparameterTuningJob, the baseOutputDirectory of each child CustomJob backing a Trial is set to a subdirectory of name id under its parent HyperparameterTuningJob's baseOutputDirectory. The following Vertex AI environment variables will be passed to containers or python modules when this field is set: For CustomJob: * AIP_MODEL_DIR = `/model/` * AIP_CHECKPOINT_DIR = `/checkpoints/` * AIP_TENSORBOARD_LOG_DIR = `/logs/` For CustomJob backing a Trial of HyperparameterTuningJob: * AIP_MODEL_DIR = `//model/` * AIP_CHECKPOINT_DIR = `//checkpoints/` * AIP_TENSORBOARD_LOG_DIR = `//logs/`",
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
          }).describe("Optional. Configuration for PSC-I for CustomJob.")
            .optional(),
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
          }).describe("Scheduling options for a CustomJob.").optional(),
          serviceAccount: z.string().describe(
            "Specifies the service account for workload run-as account. Users submitting jobs must have act-as permission on this run-as account. If unspecified, the [Vertex AI Custom Code Service Agent](https://cloud.google.com/vertex-ai/docs/general/access-control#service-agents) for the CustomJob's project is used.",
          ).optional(),
          tensorboard: z.string().describe(
            "Optional. The name of a Vertex AI Tensorboard resource to which this CustomJob will upload Tensorboard logs. Format: `projects/{project}/locations/{location}/tensorboards/{tensorboard}`",
          ).optional(),
          workerPoolSpecs: z.array(z.unknown()).describe(
            "Required. The spec of the worker pools including machine type and Docker image. All worker pools except the first one are optional and can be skipped by providing an empty value.",
          ).optional(),
        }).describe(
          "Required. The spec of a train trial job. The same spec applies to all train trials.",
        ).optional(),
      }).describe(
        "Spec for train trials. Top N [TrainTrialSpec.max_parallel_trial_count] search trials will be trained for every M [TrainTrialSpec.frequency] trials searched.",
      ).optional(),
    }).describe("The spec of multi-trial algorithms.").optional(),
    resumeNasJobId: z.string().describe(
      "The ID of the existing NasJob in the same Project and Location which will be used to resume search. search_space_spec and nas_algorithm_spec are obtained from previous NasJob hence should not provide them again for this NasJob.",
    ).optional(),
    searchSpaceSpec: z.string().describe(
      "It defines the search space for Neural Architecture Search (NAS).",
    ).optional(),
  }).describe("Required. The specification of a NasJob.").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
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

/** Swamp extension model for Google Cloud Agent Platform NasJobs. Registered at `@swamp/gcp/aiplatform/nasjobs`. */
export const model = {
  type: "@swamp/gcp/aiplatform/nasjobs",
  version: "2026.10.13.1",
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
    {
      toVersion: "2026.07.17.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.1",
      description: "Added: scopes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.20.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.20.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.1",
      description: "Removed: error, nasJobOutput",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { error: _error, nasJobOutput: _nasJobOutput, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.07.21.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.4",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
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
      toVersion: "2026.10.13.1",
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
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["nasJobSpec"] !== undefined) body["nasJobSpec"] = g["nasJobSpec"];
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
      description: "Get a nasJobs",
      arguments: z.object({
        identifier: z.string().describe("The name of the nasJobs"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
      description: "Delete the nasJobs",
      arguments: z.object({
        identifier: z.string().describe("The name of the nasJobs"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
      description: "Sync nasJobs state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific nasJobs by name (e.g. one discovered by list)",
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
              `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
          baseUrl,
          LIST_CONFIG,
          params,
          "nasJobs",
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
    cancel: {
      description: "cancel",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "aiplatform.projects.locations.nasJobs.cancel",
            "path": "v1/{+name}:cancel",
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
