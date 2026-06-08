// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/gcp/aiplatform/notebookruntimetemplates
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Agent Platform NotebookRuntimeTemplates.
 *
 * A template that specifies runtime configurations such as machine type, runtime version, network configurations, etc. Multiple runtimes can be created from a runtime template.
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
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/notebookRuntimeTemplates/${shortName}`;
}

const BASE_URL = "https://aiplatform.googleapis.com/";

const GET_CONFIG = {
  "id": "aiplatform.projects.locations.notebookRuntimeTemplates.get",
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
  "id": "aiplatform.projects.locations.notebookRuntimeTemplates.create",
  "path": "v1/{+parent}/notebookRuntimeTemplates",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "notebookRuntimeTemplateId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "aiplatform.projects.locations.notebookRuntimeTemplates.patch",
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
  "id": "aiplatform.projects.locations.notebookRuntimeTemplates.delete",
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
  "id": "aiplatform.projects.locations.notebookRuntimeTemplates.list",
  "path": "v1/{+parent}/notebookRuntimeTemplates",
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
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  dataPersistentDiskSpec: z.object({
    diskSizeGb: z.string().describe(
      "Size in GB of the disk (default is 100GB).",
    ).optional(),
    diskType: z.string().describe(
      'Type of the disk (default is "pd-standard"). Valid values: "pd-ssd" (Persistent Disk Solid State Drive) "pd-standard" (Persistent Disk Hard Disk Drive) "pd-balanced" (Balanced Persistent Disk) "pd-extreme" (Extreme Persistent Disk) "hyperdisk-balanced" (Hyperdisk Balanced) "hyperdisk-extreme" (Hyperdisk Extreme) "hyperdisk-balanced-high-availability" (Hyperdisk Balanced High Availability) "hyperdisk-ml" (Hyperdisk ML) "hyperdisk-throughput" (Hyperdisk Throughput)',
    ).optional(),
  }).describe("Represents the spec of persistent disk and hyperdisk options.")
    .optional(),
  description: z.string().describe(
    "The description of the NotebookRuntimeTemplate.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The display name of the NotebookRuntimeTemplate. The name can be up to 128 characters long and can consist of any UTF-8 characters.",
  ).optional(),
  encryptionSpec: z.object({
    kmsKeyName: z.string().describe(
      "Required. Resource name of the Cloud KMS key used to protect the resource. The Cloud KMS key must be in the same region as the resource. It must have the format `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
    ).optional(),
  }).describe(
    "Represents a customer-managed encryption key specification that can be applied to a Vertex AI resource.",
  ).optional(),
  eucConfig: z.object({
    bypassActasCheck: z.boolean().describe(
      "Output only. Whether ActAs check is bypassed for service account attached to the VM. If false, we need ActAs check for the default Compute Engine Service account. When a Runtime is created, a VM is allocated using Default Compute Engine Service Account. Any user requesting to use this Runtime requires Service Account User (ActAs) permission over this SA. If true, Runtime owner is using EUC and does not require the above permission as VM no longer use default Compute Engine SA, but a P4SA.",
    ).optional(),
    eucDisabled: z.boolean().describe(
      "Input only. Whether EUC is disabled in this NotebookRuntimeTemplate. In proto3, the default value of a boolean is false. In this way, by default EUC will be enabled for NotebookRuntimeTemplate.",
    ).optional(),
  }).describe("The euc configuration of NotebookRuntimeTemplate.").optional(),
  idleShutdownConfig: z.object({
    idleShutdownDisabled: z.boolean().describe(
      "Whether Idle Shutdown is disabled in this NotebookRuntimeTemplate.",
    ).optional(),
    idleTimeout: z.string().describe(
      "Required. Duration is accurate to the second. In Notebook, Idle Timeout is accurate to minute so the range of idle_timeout (second) is: 10 * 60 ~ 1440 * 60.",
    ).optional(),
  }).describe(
    "The idle shutdown configuration of NotebookRuntimeTemplate, which contains the idle_timeout as required field.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "The labels with user-defined metadata to organize the NotebookRuntimeTemplates. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. See https://goo.gl/xmQnxf for more information and examples of labels.",
  ).optional(),
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
        "Optional. Corresponds to the label values of a reservation resource. This must be the full resource name of the reservation or reservation block.",
      ).optional(),
    }).describe(
      "A ReservationAffinity can be used to configure a Vertex AI resource (e.g., a DeployedModel) to draw its Compute Engine resources from a Shared Reservation, or exclusively from on-demand capacity.",
    ).optional(),
    tpuTopology: z.string().describe(
      'Immutable. The topology of the TPUs. Corresponds to the TPU topologies available from GKE. (Example: tpu_topology: "2x2x1").',
    ).optional(),
  }).describe("Specification of a single machine.").optional(),
  name: z.string().describe("The resource name of the NotebookRuntimeTemplate.")
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
  }).describe("Network spec.").optional(),
  networkTags: z.array(z.string()).describe(
    "Optional. The Compute Engine tags to add to runtime (see [Tagging instances](https://cloud.google.com/vpc/docs/add-remove-network-tags)).",
  ).optional(),
  notebookRuntimeType: z.enum([
    "NOTEBOOK_RUNTIME_TYPE_UNSPECIFIED",
    "USER_DEFINED",
    "ONE_CLICK",
  ]).describe("Optional. Immutable. The type of the notebook runtime template.")
    .optional(),
  reservationAffinity: z.object({
    consumeReservationType: z.enum([
      "RESERVATION_AFFINITY_TYPE_UNSPECIFIED",
      "RESERVATION_NONE",
      "RESERVATION_ANY",
      "RESERVATION_SPECIFIC",
    ]).describe(
      "Required. Specifies the type of reservation from which this instance can consume resources: RESERVATION_ANY (default), RESERVATION_SPECIFIC, or RESERVATION_NONE. See Consuming reserved instances for examples.",
    ).optional(),
    key: z.string().describe(
      "Optional. Corresponds to the label key of a reservation resource. To target a RESERVATION_SPECIFIC by name, use compute.googleapis.com/reservation-name as the key and specify the name of your reservation as its value.",
    ).optional(),
    values: z.array(z.string()).describe(
      "Optional. Corresponds to the label values of a reservation resource. This must be the full path name of Reservation.",
    ).optional(),
  }).describe("Notebook Reservation Affinity for consuming Zonal reservation.")
    .optional(),
  shieldedVmConfig: z.object({
    enableSecureBoot: z.boolean().describe(
      "Defines whether the instance has [Secure Boot](https://cloud.google.com/compute/shielded-vm/docs/shielded-vm#secure-boot) enabled. Secure Boot helps ensure that the system only runs authentic software by verifying the digital signature of all boot components, and halting the boot process if signature verification fails.",
    ).optional(),
  }).describe(
    "A set of Shielded Instance options. See [Images using supported Shielded VM features](https://cloud.google.com/compute/docs/instances/modifying-shielded-vm).",
  ).optional(),
  softwareConfig: z.object({
    colabImage: z.object({
      description: z.string().describe(
        'Output only. A human-readable description of the specified colab image release, populated by the system. Example: "Python 3.10", "Latest - current Python 3.11"',
      ).optional(),
      releaseName: z.string().describe(
        'Optional. The release name of the NotebookRuntime Colab image, e.g. "py310". If not specified, detault to the latest release.',
      ).optional(),
    }).describe("Colab image of the runtime.").optional(),
    env: z.array(z.object({
      name: z.string().describe(
        "Required. Name of the environment variable. Must be a valid C identifier.",
      ).optional(),
      value: z.string().describe(
        "Required. Variables that reference a $(VAR_NAME) are expanded using the previous defined environment variables in the container and any service environment variables. If a variable cannot be resolved, the reference in the input string will be unchanged. The $(VAR_NAME) syntax can be escaped with a double $$, ie: $$(VAR_NAME). Escaped references will never be expanded, regardless of whether the variable exists or not.",
      ).optional(),
    })).describe(
      "Optional. Environment variables to be passed to the container. Maximum limit is 100.",
    ).optional(),
    postStartupScriptConfig: z.object({
      postStartupScript: z.string().describe(
        "Optional. Post startup script to run after runtime is started.",
      ).optional(),
      postStartupScriptBehavior: z.enum([
        "POST_STARTUP_SCRIPT_BEHAVIOR_UNSPECIFIED",
        "RUN_ONCE",
        "RUN_EVERY_START",
        "DOWNLOAD_AND_RUN_EVERY_START",
      ]).describe(
        "Optional. Post startup script behavior that defines download and execution behavior.",
      ).optional(),
      postStartupScriptUrl: z.string().describe(
        "Optional. Post startup script url to download. Example: `gs://bucket/script.sh`",
      ).optional(),
    }).describe("Post startup script config.").optional(),
  }).describe(
    "Notebook Software Config. This is passed to the backend when user makes software configurations in UI.",
  ).optional(),
  notebookRuntimeTemplateId: z.string().describe(
    "Optional. User specified ID for the notebook runtime template.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  dataPersistentDiskSpec: z.object({
    diskSizeGb: z.string(),
    diskType: z.string(),
  }).optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  encryptionSpec: z.object({
    kmsKeyName: z.string(),
  }).optional(),
  etag: z.string().optional(),
  eucConfig: z.object({
    bypassActasCheck: z.boolean(),
    eucDisabled: z.boolean(),
  }).optional(),
  idleShutdownConfig: z.object({
    idleShutdownDisabled: z.boolean(),
    idleTimeout: z.string(),
  }).optional(),
  isDefault: z.boolean().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
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
  }).optional(),
  name: z.string(),
  networkSpec: z.object({
    enableInternetAccess: z.boolean(),
    network: z.string(),
    subnetwork: z.string(),
  }).optional(),
  networkTags: z.array(z.string()).optional(),
  notebookRuntimeType: z.string().optional(),
  reservationAffinity: z.object({
    consumeReservationType: z.string(),
    key: z.string(),
    values: z.array(z.string()),
  }).optional(),
  serviceAccount: z.string().optional(),
  shieldedVmConfig: z.object({
    enableSecureBoot: z.boolean(),
  }).optional(),
  softwareConfig: z.object({
    colabImage: z.object({
      description: z.string(),
      releaseName: z.string(),
    }),
    env: z.array(z.object({
      name: z.string(),
      value: z.string(),
    })),
    postStartupScriptConfig: z.object({
      postStartupScript: z.string(),
      postStartupScriptBehavior: z.string(),
      postStartupScriptUrl: z.string(),
    }),
  }).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  dataPersistentDiskSpec: z.object({
    diskSizeGb: z.string().describe(
      "Size in GB of the disk (default is 100GB).",
    ).optional(),
    diskType: z.string().describe(
      'Type of the disk (default is "pd-standard"). Valid values: "pd-ssd" (Persistent Disk Solid State Drive) "pd-standard" (Persistent Disk Hard Disk Drive) "pd-balanced" (Balanced Persistent Disk) "pd-extreme" (Extreme Persistent Disk) "hyperdisk-balanced" (Hyperdisk Balanced) "hyperdisk-extreme" (Hyperdisk Extreme) "hyperdisk-balanced-high-availability" (Hyperdisk Balanced High Availability) "hyperdisk-ml" (Hyperdisk ML) "hyperdisk-throughput" (Hyperdisk Throughput)',
    ).optional(),
  }).describe("Represents the spec of persistent disk and hyperdisk options.")
    .optional(),
  description: z.string().describe(
    "The description of the NotebookRuntimeTemplate.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The display name of the NotebookRuntimeTemplate. The name can be up to 128 characters long and can consist of any UTF-8 characters.",
  ).optional(),
  encryptionSpec: z.object({
    kmsKeyName: z.string().describe(
      "Required. Resource name of the Cloud KMS key used to protect the resource. The Cloud KMS key must be in the same region as the resource. It must have the format `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
    ).optional(),
  }).describe(
    "Represents a customer-managed encryption key specification that can be applied to a Vertex AI resource.",
  ).optional(),
  eucConfig: z.object({
    bypassActasCheck: z.boolean().describe(
      "Output only. Whether ActAs check is bypassed for service account attached to the VM. If false, we need ActAs check for the default Compute Engine Service account. When a Runtime is created, a VM is allocated using Default Compute Engine Service Account. Any user requesting to use this Runtime requires Service Account User (ActAs) permission over this SA. If true, Runtime owner is using EUC and does not require the above permission as VM no longer use default Compute Engine SA, but a P4SA.",
    ).optional(),
    eucDisabled: z.boolean().describe(
      "Input only. Whether EUC is disabled in this NotebookRuntimeTemplate. In proto3, the default value of a boolean is false. In this way, by default EUC will be enabled for NotebookRuntimeTemplate.",
    ).optional(),
  }).describe("The euc configuration of NotebookRuntimeTemplate.").optional(),
  idleShutdownConfig: z.object({
    idleShutdownDisabled: z.boolean().describe(
      "Whether Idle Shutdown is disabled in this NotebookRuntimeTemplate.",
    ).optional(),
    idleTimeout: z.string().describe(
      "Required. Duration is accurate to the second. In Notebook, Idle Timeout is accurate to minute so the range of idle_timeout (second) is: 10 * 60 ~ 1440 * 60.",
    ).optional(),
  }).describe(
    "The idle shutdown configuration of NotebookRuntimeTemplate, which contains the idle_timeout as required field.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "The labels with user-defined metadata to organize the NotebookRuntimeTemplates. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. See https://goo.gl/xmQnxf for more information and examples of labels.",
  ).optional(),
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
        "Optional. Corresponds to the label values of a reservation resource. This must be the full resource name of the reservation or reservation block.",
      ).optional(),
    }).describe(
      "A ReservationAffinity can be used to configure a Vertex AI resource (e.g., a DeployedModel) to draw its Compute Engine resources from a Shared Reservation, or exclusively from on-demand capacity.",
    ).optional(),
    tpuTopology: z.string().describe(
      'Immutable. The topology of the TPUs. Corresponds to the TPU topologies available from GKE. (Example: tpu_topology: "2x2x1").',
    ).optional(),
  }).describe("Specification of a single machine.").optional(),
  name: z.string().describe("The resource name of the NotebookRuntimeTemplate.")
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
  }).describe("Network spec.").optional(),
  networkTags: z.array(z.string()).describe(
    "Optional. The Compute Engine tags to add to runtime (see [Tagging instances](https://cloud.google.com/vpc/docs/add-remove-network-tags)).",
  ).optional(),
  notebookRuntimeType: z.enum([
    "NOTEBOOK_RUNTIME_TYPE_UNSPECIFIED",
    "USER_DEFINED",
    "ONE_CLICK",
  ]).describe("Optional. Immutable. The type of the notebook runtime template.")
    .optional(),
  reservationAffinity: z.object({
    consumeReservationType: z.enum([
      "RESERVATION_AFFINITY_TYPE_UNSPECIFIED",
      "RESERVATION_NONE",
      "RESERVATION_ANY",
      "RESERVATION_SPECIFIC",
    ]).describe(
      "Required. Specifies the type of reservation from which this instance can consume resources: RESERVATION_ANY (default), RESERVATION_SPECIFIC, or RESERVATION_NONE. See Consuming reserved instances for examples.",
    ).optional(),
    key: z.string().describe(
      "Optional. Corresponds to the label key of a reservation resource. To target a RESERVATION_SPECIFIC by name, use compute.googleapis.com/reservation-name as the key and specify the name of your reservation as its value.",
    ).optional(),
    values: z.array(z.string()).describe(
      "Optional. Corresponds to the label values of a reservation resource. This must be the full path name of Reservation.",
    ).optional(),
  }).describe("Notebook Reservation Affinity for consuming Zonal reservation.")
    .optional(),
  shieldedVmConfig: z.object({
    enableSecureBoot: z.boolean().describe(
      "Defines whether the instance has [Secure Boot](https://cloud.google.com/compute/shielded-vm/docs/shielded-vm#secure-boot) enabled. Secure Boot helps ensure that the system only runs authentic software by verifying the digital signature of all boot components, and halting the boot process if signature verification fails.",
    ).optional(),
  }).describe(
    "A set of Shielded Instance options. See [Images using supported Shielded VM features](https://cloud.google.com/compute/docs/instances/modifying-shielded-vm).",
  ).optional(),
  softwareConfig: z.object({
    colabImage: z.object({
      description: z.string().describe(
        'Output only. A human-readable description of the specified colab image release, populated by the system. Example: "Python 3.10", "Latest - current Python 3.11"',
      ).optional(),
      releaseName: z.string().describe(
        'Optional. The release name of the NotebookRuntime Colab image, e.g. "py310". If not specified, detault to the latest release.',
      ).optional(),
    }).describe("Colab image of the runtime.").optional(),
    env: z.array(z.object({
      name: z.string().describe(
        "Required. Name of the environment variable. Must be a valid C identifier.",
      ).optional(),
      value: z.string().describe(
        "Required. Variables that reference a $(VAR_NAME) are expanded using the previous defined environment variables in the container and any service environment variables. If a variable cannot be resolved, the reference in the input string will be unchanged. The $(VAR_NAME) syntax can be escaped with a double $$, ie: $$(VAR_NAME). Escaped references will never be expanded, regardless of whether the variable exists or not.",
      ).optional(),
    })).describe(
      "Optional. Environment variables to be passed to the container. Maximum limit is 100.",
    ).optional(),
    postStartupScriptConfig: z.object({
      postStartupScript: z.string().describe(
        "Optional. Post startup script to run after runtime is started.",
      ).optional(),
      postStartupScriptBehavior: z.enum([
        "POST_STARTUP_SCRIPT_BEHAVIOR_UNSPECIFIED",
        "RUN_ONCE",
        "RUN_EVERY_START",
        "DOWNLOAD_AND_RUN_EVERY_START",
      ]).describe(
        "Optional. Post startup script behavior that defines download and execution behavior.",
      ).optional(),
      postStartupScriptUrl: z.string().describe(
        "Optional. Post startup script url to download. Example: `gs://bucket/script.sh`",
      ).optional(),
    }).describe("Post startup script config.").optional(),
  }).describe(
    "Notebook Software Config. This is passed to the backend when user makes software configurations in UI.",
  ).optional(),
  notebookRuntimeTemplateId: z.string().describe(
    "Optional. User specified ID for the notebook runtime template.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const _credentialKeys = new Set(["accessToken", "credentialsJson", "project"]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Agent Platform NotebookRuntimeTemplates. Registered at `@swamp/gcp/aiplatform/notebookruntimetemplates`. */
export const model = {
  type: "@swamp/gcp/aiplatform/notebookruntimetemplates",
  version: "2026.06.08.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A template that specifies runtime configurations such as machine type, runtim...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a notebookRuntimeTemplates",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["dataPersistentDiskSpec"] !== undefined) {
          body["dataPersistentDiskSpec"] = g["dataPersistentDiskSpec"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["encryptionSpec"] !== undefined) {
          body["encryptionSpec"] = g["encryptionSpec"];
        }
        if (g["eucConfig"] !== undefined) body["eucConfig"] = g["eucConfig"];
        if (g["idleShutdownConfig"] !== undefined) {
          body["idleShutdownConfig"] = g["idleShutdownConfig"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["machineSpec"] !== undefined) {
          body["machineSpec"] = g["machineSpec"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["networkSpec"] !== undefined) {
          body["networkSpec"] = g["networkSpec"];
        }
        if (g["networkTags"] !== undefined) {
          body["networkTags"] = g["networkTags"];
        }
        if (g["notebookRuntimeType"] !== undefined) {
          body["notebookRuntimeType"] = g["notebookRuntimeType"];
        }
        if (g["reservationAffinity"] !== undefined) {
          body["reservationAffinity"] = g["reservationAffinity"];
        }
        if (g["shieldedVmConfig"] !== undefined) {
          body["shieldedVmConfig"] = g["shieldedVmConfig"];
        }
        if (g["softwareConfig"] !== undefined) {
          body["softwareConfig"] = g["softwareConfig"];
        }
        if (g["notebookRuntimeTemplateId"] !== undefined) {
          body["notebookRuntimeTemplateId"] = g["notebookRuntimeTemplateId"];
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
          credentials,
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
      description: "Get a notebookRuntimeTemplates",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the notebookRuntimeTemplates",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
          credentials,
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
      description: "Update notebookRuntimeTemplates attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        if (g["dataPersistentDiskSpec"] !== undefined) {
          body["dataPersistentDiskSpec"] = g["dataPersistentDiskSpec"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["encryptionSpec"] !== undefined) {
          body["encryptionSpec"] = g["encryptionSpec"];
        }
        if (g["eucConfig"] !== undefined) body["eucConfig"] = g["eucConfig"];
        if (g["idleShutdownConfig"] !== undefined) {
          body["idleShutdownConfig"] = g["idleShutdownConfig"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["machineSpec"] !== undefined) {
          body["machineSpec"] = g["machineSpec"];
        }
        if (g["networkSpec"] !== undefined) {
          body["networkSpec"] = g["networkSpec"];
        }
        if (g["networkTags"] !== undefined) {
          body["networkTags"] = g["networkTags"];
        }
        if (g["reservationAffinity"] !== undefined) {
          body["reservationAffinity"] = g["reservationAffinity"];
        }
        if (g["shieldedVmConfig"] !== undefined) {
          body["shieldedVmConfig"] = g["shieldedVmConfig"];
        }
        if (g["softwareConfig"] !== undefined) {
          body["softwareConfig"] = g["softwareConfig"];
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
          undefined,
          credentials,
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
      description: "Delete the notebookRuntimeTemplates",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the notebookRuntimeTemplates",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const { existed } = await deleteResource(
          BASE_URL,
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
      description: "Sync notebookRuntimeTemplates state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
      description: "List notebookRuntimeTemplates resources",
      arguments: z.object({
        filter: z.string().describe(
          'Optional. An expression for filtering the results of the request. For field names both snake_case and camelCase are supported. * `notebookRuntimeTemplate` supports = and !=. `notebookRuntimeTemplate` represents the NotebookRuntimeTemplate ID, i.e. the last segment of the NotebookRuntimeTemplate\'s resource name. * `display_name` supports = and != * `labels` supports general map functions that is: * `labels.key=value` - key:value equality * `labels.key:* or labels:key - key existence * A key including a space must be quoted. `labels."a key"`. * `notebookRuntimeType` supports = and !=. notebookRuntimeType enum: [USER_DEFINED, ONE_CLICK]. * `machineType` supports = and !=. * `acceleratorType` supports = and !=. Some examples: * `notebookRuntimeTemplate=notebookRuntimeTemplate123` * `displayName="myDisplayName"` * `labels.myKey="myValue"` * `notebookRuntimeType=USER_DEFINED` * `machineType=e2-standard-4` * `acceleratorType=NVIDIA_TESLA_T4`',
        ).optional(),
        orderBy: z.string().describe(
          'Optional. A comma-separated list of fields to order by, sorted in ascending order. Use "desc" after a field name for descending. Supported fields: * `display_name` * `create_time` * `update_time` Example: `display_name, create_time desc`.',
        ).optional(),
        pageSize: z.number().describe("Optional. The standard list page size.")
          .optional(),
        readMask: z.string().describe(
          "Optional. Mask specifying which fields to read.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
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
        if (args["readMask"] !== undefined) {
          params["readMask"] = String(args["readMask"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "notebookRuntimeTemplates",
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
    get_iam_policy: {
      description: "get iam policy",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
            "id":
              "aiplatform.projects.locations.notebookRuntimeTemplates.getIamPolicy",
            "path": "v1/{+resource}:getIamPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "options.requestedPolicyVersion": { "location": "query" },
              "resource": { "location": "path", "required": true },
            },
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
    set_iam_policy: {
      description: "set iam policy",
      arguments: z.object({
        policy: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "aiplatform.projects.locations.notebookRuntimeTemplates.setIamPolicy",
            "path": "v1/{+resource}:setIamPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    test_iam_permissions: {
      description: "test iam permissions",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
            "id":
              "aiplatform.projects.locations.notebookRuntimeTemplates.testIamPermissions",
            "path": "v1/{+resource}:testIamPermissions",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "permissions": { "location": "query" },
              "resource": { "location": "path", "required": true },
            },
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
