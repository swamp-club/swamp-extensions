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

// Auto-generated extension model for @swamp/gcp/aiplatform/notebookexecutionjobs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Agent Platform NotebookExecutionJobs.
 *
 * NotebookExecutionJob represents an instance of a notebook execution.
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
  return `${parent}/notebookExecutionJobs/${shortName}`;
}

const BASE_URL = "https://aiplatform.googleapis.com/";

const GET_CONFIG = {
  "id": "aiplatform.projects.locations.notebookExecutionJobs.get",
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
    "view": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "aiplatform.projects.locations.notebookExecutionJobs.create",
  "path": "v1/{+parent}/notebookExecutionJobs",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "notebookExecutionJobId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "aiplatform.projects.locations.notebookExecutionJobs.delete",
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
  "id": "aiplatform.projects.locations.notebookExecutionJobs.list",
  "path": "v1/{+parent}/notebookExecutionJobs",
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
    "view": {
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
  customEnvironmentSpec: z.object({
    machineSpec: z.object({
      acceleratorCount: z.number().int().describe(
        "The number of accelerators to attach to the machine. For [accelerator optimized machine types](https://cloud.google.com/compute/docs/accelerator-optimized-machines), One may set the accelerator_count from 1 to N for machine with N GPUs. If accelerator_count is less than or equal to N / 2, Agent Platform co-schedules the replicas of the model into the same VM to save cost. For example, if the machine type is a3-highgpu-8g, which has 8 H100 GPUs, one can set accelerator_count to 1 to 8. If accelerator_count is 1, 2, 3, or 4, Agent Platform co-schedules 8, 4, 2, or 2 replicas of the model into the same VM to save cost. When co-scheduling, CPU, memory and storage on the VM will be distributed to replicas on the VM. For example, one can expect a co-scheduled replica requesting 2 GPUs out of a 8-GPU VM will receive 25% of the CPU, memory and storage of the VM. Note that the feature is not compatible with multihost_gpu_node_count. When multihost_gpu_node_count is set, the co-scheduling will not be enabled.",
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
        "Immutable. The type of the machine. See the [list of machine types supported for prediction](https://cloud.google.com/gemini-enterprise-agent-platform/machine-learning/predictions/configure-compute#machine-types) See the [list of machine types supported for custom training](https://cloud.google.com/gemini-enterprise-agent-platform/machine-learning/training/configure-compute#machine-types). For DeployedModel this field is optional, and the default value is `n1-standard-2`. For BatchPredictionJob or as part of WorkerPoolSpec this field is required.",
      ).optional(),
      reservationAffinity: z.object({
        key: z.string().describe(
          "Optional. Corresponds to the label key of a reservation resource. To target a SPECIFIC_RESERVATION by name, use `compute.googleapis.com/reservation-name` as the key and specify the name of your reservation as its value.",
        ).optional(),
        reservationAffinityType: z.enum([
          "TYPE_UNSPECIFIED",
          "NO_RESERVATION",
          "ANY_RESERVATION",
          "SPECIFIC_RESERVATION",
        ]).describe("Required. Specifies the reservation affinity type.")
          .optional(),
        values: z.array(z.string()).describe(
          "Optional. Corresponds to the label values of a reservation resource. This must be the resource name of the reservation, reservation block, or reservation sub- block.",
        ).optional(),
      }).describe(
        "Optional. Immutable. Configuration controlling how this resource pool consumes reservation.",
      ).optional(),
      tpuTopology: z.string().describe(
        'Immutable. The topology of the TPUs. Corresponds to the TPU topologies available from GKE. (Example: tpu_topology: "2x2x1").',
      ).optional(),
    }).describe("The specification of a single machine for the execution job.")
      .optional(),
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
    }).describe("The network configuration to use for the execution job.")
      .optional(),
    persistentDiskSpec: z.object({
      diskSizeGb: z.string().describe(
        "Size in GB of the disk (default is 100GB).",
      ).optional(),
      diskType: z.string().describe(
        'Type of the disk (default is "pd-standard"). Valid values: "pd-ssd" (Persistent Disk Solid State Drive) "pd-standard" (Persistent Disk Hard Disk Drive) "pd-balanced" (Balanced Persistent Disk) "pd-extreme" (Extreme Persistent Disk) "hyperdisk-balanced" (Hyperdisk Balanced) "hyperdisk-extreme" (Hyperdisk Extreme) "hyperdisk-balanced-high-availability" (Hyperdisk Balanced High Availability) "hyperdisk-ml" (Hyperdisk ML) "hyperdisk-throughput" (Hyperdisk Throughput)',
      ).optional(),
    }).describe(
      "The specification of a persistent disk to attach for the execution job.",
    ).optional(),
    shieldedInstanceConfig: z.object({
      enableIntegrityMonitoring: z.boolean().describe(
        "Optional. Whether the VM instance has integrity monitoring enabled.",
      ).optional(),
      enableSecureBoot: z.boolean().describe(
        "Optional. Whether the VM instance has Secure Boot enabled. Disabled by default.",
      ).optional(),
      enableVtpm: z.boolean().describe(
        "Optional. Whether the VM instance has vTPM enabled.",
      ).optional(),
    }).describe(
      "Optional. Shielded VM configuration (for example, Secure Boot) for the execution VM.",
    ).optional(),
  }).describe("The custom compute configuration for an execution job.")
    .optional(),
  dataformRepositorySource: z.object({
    commitSha: z.string().describe(
      "The commit SHA to read repository with. If unset, the file will be read at HEAD.",
    ).optional(),
    dataformRepositoryResourceName: z.string().describe(
      "The resource name of the Dataform Repository. Format: `projects/{project_id}/locations/{location}/repositories/{repository_id}`",
    ).optional(),
  }).describe(
    "The Dataform Repository pointing to a single file notebook repository.",
  ).optional(),
  directNotebookSource: z.object({
    content: z.string().describe(
      "The base64-encoded contents of the input notebook file.",
    ).optional(),
  }).describe("The contents of an input notebook file.").optional(),
  displayName: z.string().describe(
    "The display name of the NotebookExecutionJob. The name can be up to 128 characters long and can consist of any UTF-8 characters.",
  ).optional(),
  encryptionSpec: z.object({
    kmsKeyName: z.string().describe(
      "Required. Resource name of the Cloud KMS key used to protect the resource. The Cloud KMS key must be in the same region as the resource. It must have the format `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
    ).optional(),
  }).describe(
    "Customer-managed encryption key spec for the notebook execution job. This field is auto-populated if the NotebookRuntimeTemplate has an encryption spec.",
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
  }).describe(
    "The Cloud Storage url pointing to the ipynb file. Format: `gs://bucket/notebook_file.ipynb`",
  ).optional(),
  gcsOutputUri: z.string().describe(
    "The Cloud Storage location to upload the result to. Format: `gs://bucket-name`",
  ).optional(),
  kernelName: z.string().describe(
    "The name of the kernel to use during notebook execution. If unset, the default kernel is used.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    'The labels with user-defined metadata to organize NotebookExecutionJobs. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. See https://goo.gl/xmQnxf for more information and examples of labels. System reserved label keys are prefixed with "aiplatform.googleapis.com/" and are immutable.',
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
  workbenchRuntime: z.object({
    customContainerImage: z.object({
      repository: z.string().describe(
        "Required. The path to the container image repository. For example: `gcr.io/{project_id}/{image_name}`.",
      ).optional(),
      tag: z.string().describe(
        "Optional. The tag of the container image. If unset, defaults to `latest`.",
      ).optional(),
    }).describe(
      "A user-provided container image. The notebook executes inside this container on a managed container-host (COS) VM.",
    ).optional(),
    vmImage: z.object({
      family: z.string().describe(
        "Use this VM image family to find the image; the newest image in this family is used.",
      ).optional(),
      name: z.string().describe("Use this VM image name to find the image.")
        .optional(),
      project: z.string().describe(
        "Required. The name of the Google Cloud project that this VM image belongs to. Format: `{project_id}`.",
      ).optional(),
    }).describe("A specific Compute Engine VM image to run the notebook on.")
      .optional(),
  }).describe(
    "The Workbench runtime configuration to use for the notebook execution.",
  ).optional(),
  notebookExecutionJobId: z.string().describe(
    "Optional. User specified ID for the NotebookExecutionJob.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  customEnvironmentSpec: z.object({
    machineSpec: z.object({
      acceleratorCount: z.number(),
      acceleratorType: z.string(),
      gpuPartitionSize: z.string(),
      machineType: z.string(),
      reservationAffinity: z.object({
        key: z.string(),
        reservationAffinityType: z.string(),
        values: z.array(z.string()),
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
    shieldedInstanceConfig: z.object({
      enableIntegrityMonitoring: z.boolean(),
      enableSecureBoot: z.boolean(),
      enableVtpm: z.boolean(),
    }),
  }).optional(),
  dataformRepositorySource: z.object({
    commitSha: z.string(),
    dataformRepositoryResourceName: z.string(),
  }).optional(),
  directNotebookSource: z.object({
    content: z.string(),
  }).optional(),
  displayName: z.string().optional(),
  encryptionSpec: z.object({
    kmsKeyName: z.string(),
  }).optional(),
  executionTimeout: z.string().optional(),
  executionUser: z.string().optional(),
  gcsNotebookSource: z.object({
    generation: z.string(),
    uri: z.string(),
  }).optional(),
  gcsOutputUri: z.string().optional(),
  jobState: z.string().optional(),
  kernelName: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  notebookRuntimeTemplateResourceName: z.string().optional(),
  scheduleResourceName: z.string().optional(),
  serviceAccount: z.string().optional(),
  status: z.object({
    code: z.number(),
    details: z.array(z.record(z.string(), z.unknown())),
    message: z.string(),
  }).optional(),
  updateTime: z.string().optional(),
  workbenchRuntime: z.object({
    customContainerImage: z.object({
      repository: z.string(),
      tag: z.string(),
    }),
    vmImage: z.object({
      family: z.string(),
      name: z.string(),
      project: z.string(),
    }),
  }).optional(),
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
  customEnvironmentSpec: z.object({
    machineSpec: z.object({
      acceleratorCount: z.number().int().describe(
        "The number of accelerators to attach to the machine. For [accelerator optimized machine types](https://cloud.google.com/compute/docs/accelerator-optimized-machines), One may set the accelerator_count from 1 to N for machine with N GPUs. If accelerator_count is less than or equal to N / 2, Agent Platform co-schedules the replicas of the model into the same VM to save cost. For example, if the machine type is a3-highgpu-8g, which has 8 H100 GPUs, one can set accelerator_count to 1 to 8. If accelerator_count is 1, 2, 3, or 4, Agent Platform co-schedules 8, 4, 2, or 2 replicas of the model into the same VM to save cost. When co-scheduling, CPU, memory and storage on the VM will be distributed to replicas on the VM. For example, one can expect a co-scheduled replica requesting 2 GPUs out of a 8-GPU VM will receive 25% of the CPU, memory and storage of the VM. Note that the feature is not compatible with multihost_gpu_node_count. When multihost_gpu_node_count is set, the co-scheduling will not be enabled.",
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
        "Immutable. The type of the machine. See the [list of machine types supported for prediction](https://cloud.google.com/gemini-enterprise-agent-platform/machine-learning/predictions/configure-compute#machine-types) See the [list of machine types supported for custom training](https://cloud.google.com/gemini-enterprise-agent-platform/machine-learning/training/configure-compute#machine-types). For DeployedModel this field is optional, and the default value is `n1-standard-2`. For BatchPredictionJob or as part of WorkerPoolSpec this field is required.",
      ).optional(),
      reservationAffinity: z.object({
        key: z.string().describe(
          "Optional. Corresponds to the label key of a reservation resource. To target a SPECIFIC_RESERVATION by name, use `compute.googleapis.com/reservation-name` as the key and specify the name of your reservation as its value.",
        ).optional(),
        reservationAffinityType: z.enum([
          "TYPE_UNSPECIFIED",
          "NO_RESERVATION",
          "ANY_RESERVATION",
          "SPECIFIC_RESERVATION",
        ]).describe("Required. Specifies the reservation affinity type.")
          .optional(),
        values: z.array(z.string()).describe(
          "Optional. Corresponds to the label values of a reservation resource. This must be the resource name of the reservation, reservation block, or reservation sub- block.",
        ).optional(),
      }).describe(
        "Optional. Immutable. Configuration controlling how this resource pool consumes reservation.",
      ).optional(),
      tpuTopology: z.string().describe(
        'Immutable. The topology of the TPUs. Corresponds to the TPU topologies available from GKE. (Example: tpu_topology: "2x2x1").',
      ).optional(),
    }).describe("The specification of a single machine for the execution job.")
      .optional(),
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
    }).describe("The network configuration to use for the execution job.")
      .optional(),
    persistentDiskSpec: z.object({
      diskSizeGb: z.string().describe(
        "Size in GB of the disk (default is 100GB).",
      ).optional(),
      diskType: z.string().describe(
        'Type of the disk (default is "pd-standard"). Valid values: "pd-ssd" (Persistent Disk Solid State Drive) "pd-standard" (Persistent Disk Hard Disk Drive) "pd-balanced" (Balanced Persistent Disk) "pd-extreme" (Extreme Persistent Disk) "hyperdisk-balanced" (Hyperdisk Balanced) "hyperdisk-extreme" (Hyperdisk Extreme) "hyperdisk-balanced-high-availability" (Hyperdisk Balanced High Availability) "hyperdisk-ml" (Hyperdisk ML) "hyperdisk-throughput" (Hyperdisk Throughput)',
      ).optional(),
    }).describe(
      "The specification of a persistent disk to attach for the execution job.",
    ).optional(),
    shieldedInstanceConfig: z.object({
      enableIntegrityMonitoring: z.boolean().describe(
        "Optional. Whether the VM instance has integrity monitoring enabled.",
      ).optional(),
      enableSecureBoot: z.boolean().describe(
        "Optional. Whether the VM instance has Secure Boot enabled. Disabled by default.",
      ).optional(),
      enableVtpm: z.boolean().describe(
        "Optional. Whether the VM instance has vTPM enabled.",
      ).optional(),
    }).describe(
      "Optional. Shielded VM configuration (for example, Secure Boot) for the execution VM.",
    ).optional(),
  }).describe("The custom compute configuration for an execution job.")
    .optional(),
  dataformRepositorySource: z.object({
    commitSha: z.string().describe(
      "The commit SHA to read repository with. If unset, the file will be read at HEAD.",
    ).optional(),
    dataformRepositoryResourceName: z.string().describe(
      "The resource name of the Dataform Repository. Format: `projects/{project_id}/locations/{location}/repositories/{repository_id}`",
    ).optional(),
  }).describe(
    "The Dataform Repository pointing to a single file notebook repository.",
  ).optional(),
  directNotebookSource: z.object({
    content: z.string().describe(
      "The base64-encoded contents of the input notebook file.",
    ).optional(),
  }).describe("The contents of an input notebook file.").optional(),
  displayName: z.string().describe(
    "The display name of the NotebookExecutionJob. The name can be up to 128 characters long and can consist of any UTF-8 characters.",
  ).optional(),
  encryptionSpec: z.object({
    kmsKeyName: z.string().describe(
      "Required. Resource name of the Cloud KMS key used to protect the resource. The Cloud KMS key must be in the same region as the resource. It must have the format `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
    ).optional(),
  }).describe(
    "Customer-managed encryption key spec for the notebook execution job. This field is auto-populated if the NotebookRuntimeTemplate has an encryption spec.",
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
  }).describe(
    "The Cloud Storage url pointing to the ipynb file. Format: `gs://bucket/notebook_file.ipynb`",
  ).optional(),
  gcsOutputUri: z.string().describe(
    "The Cloud Storage location to upload the result to. Format: `gs://bucket-name`",
  ).optional(),
  kernelName: z.string().describe(
    "The name of the kernel to use during notebook execution. If unset, the default kernel is used.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    'The labels with user-defined metadata to organize NotebookExecutionJobs. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. See https://goo.gl/xmQnxf for more information and examples of labels. System reserved label keys are prefixed with "aiplatform.googleapis.com/" and are immutable.',
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
  workbenchRuntime: z.object({
    customContainerImage: z.object({
      repository: z.string().describe(
        "Required. The path to the container image repository. For example: `gcr.io/{project_id}/{image_name}`.",
      ).optional(),
      tag: z.string().describe(
        "Optional. The tag of the container image. If unset, defaults to `latest`.",
      ).optional(),
    }).describe(
      "A user-provided container image. The notebook executes inside this container on a managed container-host (COS) VM.",
    ).optional(),
    vmImage: z.object({
      family: z.string().describe(
        "Use this VM image family to find the image; the newest image in this family is used.",
      ).optional(),
      name: z.string().describe("Use this VM image name to find the image.")
        .optional(),
      project: z.string().describe(
        "Required. The name of the Google Cloud project that this VM image belongs to. Format: `{project_id}`.",
      ).optional(),
    }).describe("A specific Compute Engine VM image to run the notebook on.")
      .optional(),
  }).describe(
    "The Workbench runtime configuration to use for the notebook execution.",
  ).optional(),
  notebookExecutionJobId: z.string().describe(
    "Optional. User specified ID for the NotebookExecutionJob.",
  ).optional(),
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

/** Swamp extension model for Google Cloud Agent Platform NotebookExecutionJobs. Registered at `@swamp/gcp/aiplatform/notebookexecutionjobs`. */
export const model = {
  type: "@swamp/gcp/aiplatform/notebookexecutionjobs",
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
      toVersion: "2026.05.31.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.05.1",
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
      description: "Removed: status",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { status: _status, ...rest } = old;
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
      toVersion: "2026.08.14.1",
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
      description:
        "NotebookExecutionJob represents an instance of a notebook execution.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a notebookExecutionJobs",
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
        if (g["customEnvironmentSpec"] !== undefined) {
          body["customEnvironmentSpec"] = g["customEnvironmentSpec"];
        }
        if (g["dataformRepositorySource"] !== undefined) {
          body["dataformRepositorySource"] = g["dataformRepositorySource"];
        }
        if (g["directNotebookSource"] !== undefined) {
          body["directNotebookSource"] = g["directNotebookSource"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["encryptionSpec"] !== undefined) {
          body["encryptionSpec"] = g["encryptionSpec"];
        }
        if (g["executionTimeout"] !== undefined) {
          body["executionTimeout"] = g["executionTimeout"];
        }
        if (g["executionUser"] !== undefined) {
          body["executionUser"] = g["executionUser"];
        }
        if (g["gcsNotebookSource"] !== undefined) {
          body["gcsNotebookSource"] = g["gcsNotebookSource"];
        }
        if (g["gcsOutputUri"] !== undefined) {
          body["gcsOutputUri"] = g["gcsOutputUri"];
        }
        if (g["kernelName"] !== undefined) body["kernelName"] = g["kernelName"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["notebookRuntimeTemplateResourceName"] !== undefined) {
          body["notebookRuntimeTemplateResourceName"] =
            g["notebookRuntimeTemplateResourceName"];
        }
        if (g["scheduleResourceName"] !== undefined) {
          body["scheduleResourceName"] = g["scheduleResourceName"];
        }
        if (g["serviceAccount"] !== undefined) {
          body["serviceAccount"] = g["serviceAccount"];
        }
        if (g["workbenchRuntime"] !== undefined) {
          body["workbenchRuntime"] = g["workbenchRuntime"];
        }
        if (g["notebookExecutionJobId"] !== undefined) {
          params["notebookExecutionJobId"] = String(
            g["notebookExecutionJobId"],
          );
        }
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
      description: "Get a notebookExecutionJobs",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the notebookExecutionJobs",
        ),
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
      description: "Delete the notebookExecutionJobs",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the notebookExecutionJobs",
        ),
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
      description: "Sync notebookExecutionJobs state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific notebookExecutionJobs by name (e.g. one discovered by list)",
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
      description: "List notebookExecutionJobs resources",
      arguments: z.object({
        filter: z.string().describe(
          'Optional. An expression for filtering the results of the request. For field names both snake_case and camelCase are supported. * `notebookExecutionJob` supports = and !=. `notebookExecutionJob` represents the NotebookExecutionJob ID. * `displayName` supports = and != and regex. * `schedule` supports = and != and regex. Some examples: * `notebookExecutionJob="123"` * `notebookExecutionJob="my-execution-job"` * `displayName="myDisplayName"` and `displayName=~"myDisplayNameRegex"`',
        ).optional(),
        orderBy: z.string().describe(
          'Optional. A comma-separated list of fields to order by, sorted in ascending order. Use "desc" after a field name for descending. Supported fields: * `display_name` * `create_time` * `update_time` Example: `display_name, create_time desc`.',
        ).optional(),
        pageSize: z.number().describe("Optional. The standard list page size.")
          .optional(),
        view: z.string().describe(
          "Optional. The NotebookExecutionJob view. Defaults to BASIC.",
        ).optional(),
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
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["view"] !== undefined) params["view"] = String(args["view"]);
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "notebookExecutionJobs",
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
  },
};
