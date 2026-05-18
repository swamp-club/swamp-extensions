// Auto-generated extension model for @swamp/gcp/aiplatform/customjobs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Vertex AI CustomJobs.
 *
 * Represents a job that runs custom workloads such as a Docker container or a Python package. A CustomJob can have multiple worker pools and each worker pool can have its own machine and input spec. A CustomJob will be cleaned up once the job enters terminal state (failed or succeeded).
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
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/customJobs/${shortName}`;
}

const BASE_URL = "https://aiplatform.googleapis.com/";

const GET_CONFIG = {
  "id": "aiplatform.projects.locations.customJobs.get",
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
  "id": "aiplatform.projects.locations.customJobs.create",
  "path": "v1/{+parent}/customJobs",
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
  "id": "aiplatform.projects.locations.customJobs.delete",
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

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  displayName: z.string().describe(
    "Required. The display name of the CustomJob. The name can be up to 128 characters long and can consist of any UTF-8 characters.",
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
  jobSpec: z.object({
    baseOutputDirectory: z.object({
      outputUriPrefix: z.string().describe(
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
    models: z.array(z.string()).describe(
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
      "Optional. A list of names for the reserved ip ranges under the VPC network that can be used for this job. If set, we will deploy the job within the provided ip ranges. Otherwise, the job will be deployed to any ip ranges under the provided VPC network. Example: ['vertex-ai-ip-range'].",
    ).optional(),
    scheduling: z.object({
      disableRetries: z.boolean().describe(
        "Optional. Indicates if the job should retry for internal errors after the job starts running. If true, overrides `Scheduling.restart_job_on_worker_restart` to false.",
      ).optional(),
      maxWaitDuration: z.string().describe(
        "Optional. This is the maximum duration that a job will wait for the requested resources to be provisioned if the scheduling strategy is set to [Strategy.DWS_FLEX_START]. If set to 0, the job will wait indefinitely. The default is 24 hours.",
      ).optional(),
      restartJobOnWorkerRestart: z.boolean().describe(
        "Optional. Restarts the entire CustomJob if a worker gets restarted. This feature can be used by distributed training jobs that are not resilient to workers leaving and joining a job.",
      ).optional(),
      strategy: z.enum([
        "STRATEGY_UNSPECIFIED",
        "ON_DEMAND",
        "LOW_COST",
        "STANDARD",
        "SPOT",
        "FLEX_START",
      ]).describe(
        "Optional. This determines which type of scheduling strategy to use.",
      ).optional(),
      timeout: z.string().describe(
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
    workerPoolSpecs: z.array(z.object({
      containerSpec: z.object({
        args: z.array(z.unknown()).describe(
          "The arguments to be passed when starting the container.",
        ).optional(),
        command: z.array(z.unknown()).describe(
          "The command to be invoked when the container is started. It overrides the entrypoint instruction in Dockerfile when provided.",
        ).optional(),
        env: z.array(z.unknown()).describe(
          "Environment variables to be passed to the container. Maximum limit is 100.",
        ).optional(),
        imageUri: z.string().describe(
          "Required. The URI of a container image in the Container Registry that is to be run on each worker replica.",
        ).optional(),
      }).describe("The spec of a Container.").optional(),
      diskSpec: z.object({
        bootDiskSizeGb: z.number().int().describe(
          "Size in GB of the boot disk (default is 100GB).",
        ).optional(),
        bootDiskType: z.string().describe(
          'Type of the boot disk. For non-A3U machines, the default value is "pd-ssd", for A3U machines, the default value is "hyperdisk-balanced". Valid values: "pd-ssd" (Persistent Disk Solid State Drive), "pd-standard" (Persistent Disk Hard Disk Drive) or "hyperdisk-balanced".',
        ).optional(),
      }).describe("Represents the spec of disk options.").optional(),
      lustreMounts: z.array(z.object({
        filesystem: z.unknown().describe(
          "Required. The name of the Lustre filesystem.",
        ).optional(),
        instanceIp: z.unknown().describe(
          "Required. IP address of the Lustre instance.",
        ).optional(),
        mountPoint: z.unknown().describe(
          "Required. Destination mount path. The Lustre file system will be mounted for the user under /mnt/lustre/",
        ).optional(),
        volumeHandle: z.unknown().describe(
          "Required. The unique identifier of the Lustre volume.",
        ).optional(),
      })).describe("Optional. List of Lustre mounts.").optional(),
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
      nfsMounts: z.array(z.object({
        mountPoint: z.unknown().describe(
          "Required. Destination mount path. The NFS will be mounted for the user under /mnt/nfs/",
        ).optional(),
        path: z.unknown().describe(
          "Required. Source path exported from NFS server. Has to start with '/', and combined with the ip address, it indicates the source mount path in the form of `server:path`",
        ).optional(),
        server: z.unknown().describe("Required. IP address of the NFS server.")
          .optional(),
      })).describe("Optional. List of NFS mount spec.").optional(),
      pythonPackageSpec: z.object({
        args: z.array(z.unknown()).describe(
          "Command line arguments to be passed to the Python task.",
        ).optional(),
        env: z.array(z.unknown()).describe(
          "Environment variables to be passed to the python module. Maximum limit is 100.",
        ).optional(),
        executorImageUri: z.string().describe(
          "Required. The URI of a container image in Artifact Registry that will run the provided Python package. Vertex AI provides a wide range of executor images with pre-installed packages to meet users' various use cases. See the list of [pre-built containers for training](https://cloud.google.com/vertex-ai/docs/training/pre-built-containers). You must use an image from this list.",
        ).optional(),
        packageUris: z.array(z.unknown()).describe(
          "Required. The Google Cloud Storage location of the Python package files which are the training program and its dependent packages. The maximum number of package URIs is 100.",
        ).optional(),
        pythonModule: z.string().describe(
          "Required. The Python module name to run after installing the packages.",
        ).optional(),
      }).describe("The spec of a Python packaged code.").optional(),
      replicaCount: z.string().describe(
        "Optional. The number of worker replicas to use for this worker pool.",
      ).optional(),
    })).describe(
      "Required. The spec of the worker pools including machine type and Docker image. All worker pools except the first one are optional and can be skipped by providing an empty value.",
    ).optional(),
  }).describe("Represents the spec of a CustomJob.").optional(),
  labels: z.record(z.string(), z.string()).describe(
    "The labels with user-defined metadata to organize CustomJobs. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. See https://goo.gl/xmQnxf for more information and examples of labels.",
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
  jobSpec: z.object({
    baseOutputDirectory: z.object({
      outputUriPrefix: z.string(),
    }),
    enableDashboardAccess: z.boolean(),
    enableWebAccess: z.boolean(),
    experiment: z.string(),
    experimentRun: z.string(),
    models: z.array(z.string()),
    network: z.string(),
    persistentResourceId: z.string(),
    protectedArtifactLocationId: z.string(),
    pscInterfaceConfig: z.object({
      dnsPeeringConfigs: z.array(z.object({
        domain: z.string(),
        targetNetwork: z.string(),
        targetProject: z.string(),
      })),
      networkAttachment: z.string(),
    }),
    reservedIpRanges: z.array(z.string()),
    scheduling: z.object({
      disableRetries: z.boolean(),
      maxWaitDuration: z.string(),
      restartJobOnWorkerRestart: z.boolean(),
      strategy: z.string(),
      timeout: z.string(),
    }),
    serviceAccount: z.string(),
    tensorboard: z.string(),
    workerPoolSpecs: z.array(z.object({
      containerSpec: z.object({
        args: z.array(z.unknown()),
        command: z.array(z.unknown()),
        env: z.array(z.unknown()),
        imageUri: z.string(),
      }),
      diskSpec: z.object({
        bootDiskSizeGb: z.number(),
        bootDiskType: z.string(),
      }),
      lustreMounts: z.array(z.object({
        filesystem: z.unknown(),
        instanceIp: z.unknown(),
        mountPoint: z.unknown(),
        volumeHandle: z.unknown(),
      })),
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
      nfsMounts: z.array(z.object({
        mountPoint: z.unknown(),
        path: z.unknown(),
        server: z.unknown(),
      })),
      pythonPackageSpec: z.object({
        args: z.array(z.unknown()),
        env: z.array(z.unknown()),
        executorImageUri: z.string(),
        packageUris: z.array(z.unknown()),
        pythonModule: z.string(),
      }),
      replicaCount: z.string(),
    })),
  }).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  satisfiesPzi: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  startTime: z.string().optional(),
  state: z.string().optional(),
  updateTime: z.string().optional(),
  webAccessUris: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  displayName: z.string().describe(
    "Required. The display name of the CustomJob. The name can be up to 128 characters long and can consist of any UTF-8 characters.",
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
  jobSpec: z.object({
    baseOutputDirectory: z.object({
      outputUriPrefix: z.string().describe(
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
    models: z.array(z.string()).describe(
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
      "Optional. A list of names for the reserved ip ranges under the VPC network that can be used for this job. If set, we will deploy the job within the provided ip ranges. Otherwise, the job will be deployed to any ip ranges under the provided VPC network. Example: ['vertex-ai-ip-range'].",
    ).optional(),
    scheduling: z.object({
      disableRetries: z.boolean().describe(
        "Optional. Indicates if the job should retry for internal errors after the job starts running. If true, overrides `Scheduling.restart_job_on_worker_restart` to false.",
      ).optional(),
      maxWaitDuration: z.string().describe(
        "Optional. This is the maximum duration that a job will wait for the requested resources to be provisioned if the scheduling strategy is set to [Strategy.DWS_FLEX_START]. If set to 0, the job will wait indefinitely. The default is 24 hours.",
      ).optional(),
      restartJobOnWorkerRestart: z.boolean().describe(
        "Optional. Restarts the entire CustomJob if a worker gets restarted. This feature can be used by distributed training jobs that are not resilient to workers leaving and joining a job.",
      ).optional(),
      strategy: z.enum([
        "STRATEGY_UNSPECIFIED",
        "ON_DEMAND",
        "LOW_COST",
        "STANDARD",
        "SPOT",
        "FLEX_START",
      ]).describe(
        "Optional. This determines which type of scheduling strategy to use.",
      ).optional(),
      timeout: z.string().describe(
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
    workerPoolSpecs: z.array(z.object({
      containerSpec: z.object({
        args: z.array(z.unknown()).describe(
          "The arguments to be passed when starting the container.",
        ).optional(),
        command: z.array(z.unknown()).describe(
          "The command to be invoked when the container is started. It overrides the entrypoint instruction in Dockerfile when provided.",
        ).optional(),
        env: z.array(z.unknown()).describe(
          "Environment variables to be passed to the container. Maximum limit is 100.",
        ).optional(),
        imageUri: z.string().describe(
          "Required. The URI of a container image in the Container Registry that is to be run on each worker replica.",
        ).optional(),
      }).describe("The spec of a Container.").optional(),
      diskSpec: z.object({
        bootDiskSizeGb: z.number().int().describe(
          "Size in GB of the boot disk (default is 100GB).",
        ).optional(),
        bootDiskType: z.string().describe(
          'Type of the boot disk. For non-A3U machines, the default value is "pd-ssd", for A3U machines, the default value is "hyperdisk-balanced". Valid values: "pd-ssd" (Persistent Disk Solid State Drive), "pd-standard" (Persistent Disk Hard Disk Drive) or "hyperdisk-balanced".',
        ).optional(),
      }).describe("Represents the spec of disk options.").optional(),
      lustreMounts: z.array(z.object({
        filesystem: z.unknown().describe(
          "Required. The name of the Lustre filesystem.",
        ).optional(),
        instanceIp: z.unknown().describe(
          "Required. IP address of the Lustre instance.",
        ).optional(),
        mountPoint: z.unknown().describe(
          "Required. Destination mount path. The Lustre file system will be mounted for the user under /mnt/lustre/",
        ).optional(),
        volumeHandle: z.unknown().describe(
          "Required. The unique identifier of the Lustre volume.",
        ).optional(),
      })).describe("Optional. List of Lustre mounts.").optional(),
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
      nfsMounts: z.array(z.object({
        mountPoint: z.unknown().describe(
          "Required. Destination mount path. The NFS will be mounted for the user under /mnt/nfs/",
        ).optional(),
        path: z.unknown().describe(
          "Required. Source path exported from NFS server. Has to start with '/', and combined with the ip address, it indicates the source mount path in the form of `server:path`",
        ).optional(),
        server: z.unknown().describe("Required. IP address of the NFS server.")
          .optional(),
      })).describe("Optional. List of NFS mount spec.").optional(),
      pythonPackageSpec: z.object({
        args: z.array(z.unknown()).describe(
          "Command line arguments to be passed to the Python task.",
        ).optional(),
        env: z.array(z.unknown()).describe(
          "Environment variables to be passed to the python module. Maximum limit is 100.",
        ).optional(),
        executorImageUri: z.string().describe(
          "Required. The URI of a container image in Artifact Registry that will run the provided Python package. Vertex AI provides a wide range of executor images with pre-installed packages to meet users' various use cases. See the list of [pre-built containers for training](https://cloud.google.com/vertex-ai/docs/training/pre-built-containers). You must use an image from this list.",
        ).optional(),
        packageUris: z.array(z.unknown()).describe(
          "Required. The Google Cloud Storage location of the Python package files which are the training program and its dependent packages. The maximum number of package URIs is 100.",
        ).optional(),
        pythonModule: z.string().describe(
          "Required. The Python module name to run after installing the packages.",
        ).optional(),
      }).describe("The spec of a Python packaged code.").optional(),
      replicaCount: z.string().describe(
        "Optional. The number of worker replicas to use for this worker pool.",
      ).optional(),
    })).describe(
      "Required. The spec of the worker pools including machine type and Docker image. All worker pools except the first one are optional and can be skipped by providing an empty value.",
    ).optional(),
  }).describe("Represents the spec of a CustomJob.").optional(),
  labels: z.record(z.string(), z.string()).describe(
    "The labels with user-defined metadata to organize CustomJobs. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. See https://goo.gl/xmQnxf for more information and examples of labels.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Vertex AI CustomJobs. Registered at `@swamp/gcp/aiplatform/customjobs`. */
export const model = {
  type: "@swamp/gcp/aiplatform/customjobs",
  version: "2026.05.18.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents a job that runs custom workloads such as a Docker container or a P...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a customJobs",
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
        if (g["jobSpec"] !== undefined) body["jobSpec"] = g["jobSpec"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
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
      description: "Get a customJobs",
      arguments: z.object({
        identifier: z.string().describe("The name of the customJobs"),
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
      description: "Delete the customJobs",
      arguments: z.object({
        identifier: z.string().describe("The name of the customJobs"),
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
      description: "Sync customJobs state from GCP",
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
            "id": "aiplatform.projects.locations.customJobs.cancel",
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
