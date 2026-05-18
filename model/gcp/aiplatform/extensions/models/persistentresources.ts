// Auto-generated extension model for @swamp/gcp/aiplatform/persistentresources
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Agent Platform PersistentResources.
 *
 * Represents long-lasting resources that are dedicated to users to runs custom workloads. A PersistentResource can have multiple node pools and each node pool can have its own machine spec.
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
  return `${parent}/persistentResources/${shortName}`;
}

const BASE_URL = "https://aiplatform.googleapis.com/";

const GET_CONFIG = {
  "id": "aiplatform.projects.locations.persistentResources.get",
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
  "id": "aiplatform.projects.locations.persistentResources.create",
  "path": "v1/{+parent}/persistentResources",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "persistentResourceId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "aiplatform.projects.locations.persistentResources.patch",
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
  "id": "aiplatform.projects.locations.persistentResources.delete",
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
  displayName: z.string().describe(
    "Optional. The display name of the PersistentResource. The name can be up to 128 characters long and can consist of any UTF-8 characters.",
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
    "Optional. The labels with user-defined metadata to organize PersistentResource. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. See https://goo.gl/xmQnxf for more information and examples of labels.",
  ).optional(),
  name: z.string().describe("Immutable. Resource name of a PersistentResource.")
    .optional(),
  network: z.string().describe(
    "Optional. The full name of the Compute Engine [network](/compute/docs/networks-and-firewalls#networks) to peered with Vertex AI to host the persistent resources. For example, `projects/12345/global/networks/myVPC`. [Format](/compute/docs/reference/rest/v1/networks/insert) is of the form `projects/{project}/global/networks/{network}`. Where {project} is a project number, as in `12345`, and {network} is a network name. To specify this field, you must have already [configured VPC Network Peering for Vertex AI](https://cloud.google.com/vertex-ai/docs/general/vpc-peering). If this field is left unspecified, the resources aren't peered with any network.",
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
    "Optional. A list of names for the reserved IP ranges under the VPC network that can be used for this persistent resource. If set, we will deploy the persistent resource within the provided IP ranges. Otherwise, the persistent resource is deployed to any IP ranges under the provided VPC network. Example: ['vertex-ai-ip-range'].",
  ).optional(),
  resourcePools: z.array(z.object({
    autoscalingSpec: z.object({
      maxReplicaCount: z.string().describe(
        "Optional. max replicas in the node pool, must be ≥ replica_count and > min_replica_count or will throw error",
      ).optional(),
      minReplicaCount: z.string().describe(
        "Optional. min replicas in the node pool, must be ≤ replica_count and  0, we added a corresponding validation inside CreatePersistentResourceRequestValidator.java.",
      ).optional(),
    }).describe(
      "The min/max number of replicas allowed if enabling autoscaling",
    ).optional(),
    diskSpec: z.object({
      bootDiskSizeGb: z.number().int().describe(
        "Size in GB of the boot disk (default is 100GB).",
      ).optional(),
      bootDiskType: z.string().describe(
        'Type of the boot disk. For non-A3U machines, the default value is "pd-ssd", for A3U machines, the default value is "hyperdisk-balanced". Valid values: "pd-ssd" (Persistent Disk Solid State Drive), "pd-standard" (Persistent Disk Hard Disk Drive) or "hyperdisk-balanced".',
      ).optional(),
    }).describe("Represents the spec of disk options.").optional(),
    id: z.string().describe(
      "Immutable. The unique ID in a PersistentResource for referring to this resource pool. User can specify it if necessary. Otherwise, it's generated automatically.",
    ).optional(),
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
        values: z.array(z.unknown()).describe(
          "Optional. Corresponds to the label values of a reservation resource. This must be the full resource name of the reservation or reservation block.",
        ).optional(),
      }).describe(
        "A ReservationAffinity can be used to configure a Vertex AI resource (e.g., a DeployedModel) to draw its Compute Engine resources from a Shared Reservation, or exclusively from on-demand capacity.",
      ).optional(),
      tpuTopology: z.string().describe(
        'Immutable. The topology of the TPUs. Corresponds to the TPU topologies available from GKE. (Example: tpu_topology: "2x2x1").',
      ).optional(),
    }).describe("Specification of a single machine.").optional(),
    replicaCount: z.string().describe(
      "Optional. The total number of machines to use for this resource pool.",
    ).optional(),
    usedReplicaCount: z.string().describe(
      "Output only. The number of machines currently in use by training jobs for this resource pool. Will replace idle_replica_count.",
    ).optional(),
  })).describe("Required. The spec of the pools of different resources.")
    .optional(),
  resourceRuntime: z.object({
    accessUris: z.record(z.string(), z.string()).describe(
      'Output only. URIs for user to connect to the Cluster. Example: { "RAY_HEAD_NODE_INTERNAL_IP": "head-node-IP:10001" "RAY_DASHBOARD_URI": "ray-dashboard-address:8888" }',
    ).optional(),
  }).describe("Persistent Cluster runtime information as output").optional(),
  resourceRuntimeSpec: z.object({
    raySpec: z.object({
      headNodeResourcePoolId: z.string().describe(
        "Optional. This will be used to indicate which resource pool will serve as the Ray head node(the first node within that pool). Will use the machine from the first workerpool as the head node by default if this field isn't set.",
      ).optional(),
      imageUri: z.string().describe(
        "Optional. Default image for user to choose a preferred ML framework (for example, TensorFlow or Pytorch) by choosing from [Vertex prebuilt images](https://cloud.google.com/vertex-ai/docs/training/pre-built-containers). Either this or the resource_pool_images is required. Use this field if you need all the resource pools to have the same Ray image. Otherwise, use the {@code resource_pool_images} field.",
      ).optional(),
      rayLogsSpec: z.object({
        disabled: z.boolean().describe(
          "Optional. Flag to disable the export of Ray OSS logs to Cloud Logging.",
        ).optional(),
      }).describe("Configuration for the Ray OSS Logs.").optional(),
      rayMetricSpec: z.object({
        disabled: z.boolean().describe(
          "Optional. Flag to disable the Ray metrics collection.",
        ).optional(),
      }).describe("Configuration for the Ray metrics.").optional(),
      resourcePoolImages: z.record(z.string(), z.string()).describe(
        'Optional. Required if image_uri isn\'t set. A map of resource_pool_id to prebuild Ray image if user need to use different images for different head/worker pools. This map needs to cover all the resource pool ids. Example: { "ray_head_node_pool": "head image" "ray_worker_node_pool1": "worker image" "ray_worker_node_pool2": "another worker image" }',
      ).optional(),
    }).describe(
      "Configuration information for the Ray cluster. For experimental launch, Ray cluster creation and Persistent cluster creation are 1:1 mapping: We will provision all the nodes within the Persistent cluster as Ray nodes.",
    ).optional(),
    serviceAccountSpec: z.object({
      enableCustomServiceAccount: z.boolean().describe(
        "Required. If true, custom user-managed service account is enforced to run any workloads (for example, Vertex Jobs) on the resource. Otherwise, uses the [Vertex AI Custom Code Service Agent](https://cloud.google.com/vertex-ai/docs/general/access-control#service-agents).",
      ).optional(),
      serviceAccount: z.string().describe(
        "Optional. Required when all below conditions are met * `enable_custom_service_account` is true; * any runtime is specified via `ResourceRuntimeSpec` on creation time, for example, Ray The users must have `iam.serviceAccounts.actAs` permission on this service account and then the specified runtime containers will run as it. Do not set this field if you want to submit jobs using custom service account to this PersistentResource after creation, but only specify the `service_account` inside the job.",
      ).optional(),
    }).describe(
      "Configuration for the use of custom service account to run the workloads.",
    ).optional(),
  }).describe(
    "Configuration for the runtime on a PersistentResource instance, including but not limited to: * Service accounts used to run the workloads. * Whether to make it a dedicated Ray Cluster.",
  ).optional(),
  persistentResourceId: z.string().describe(
    "Required. The ID to use for the PersistentResource, which become the final component of the PersistentResource's resource name. The maximum length is 63 characters, and valid characters are `/^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$/`.",
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
  error: z.object({
    code: z.number(),
    details: z.array(z.record(z.string(), z.unknown())),
    message: z.string(),
  }).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  network: z.string().optional(),
  pscInterfaceConfig: z.object({
    dnsPeeringConfigs: z.array(z.object({
      domain: z.string(),
      targetNetwork: z.string(),
      targetProject: z.string(),
    })),
    networkAttachment: z.string(),
  }).optional(),
  reservedIpRanges: z.array(z.string()).optional(),
  resourcePools: z.array(z.object({
    autoscalingSpec: z.object({
      maxReplicaCount: z.string(),
      minReplicaCount: z.string(),
    }),
    diskSpec: z.object({
      bootDiskSizeGb: z.number(),
      bootDiskType: z.string(),
    }),
    id: z.string(),
    machineSpec: z.object({
      acceleratorCount: z.number(),
      acceleratorType: z.string(),
      gpuPartitionSize: z.string(),
      machineType: z.string(),
      reservationAffinity: z.object({
        key: z.string(),
        reservationAffinityType: z.string(),
        values: z.array(z.unknown()),
      }),
      tpuTopology: z.string(),
    }),
    replicaCount: z.string(),
    usedReplicaCount: z.string(),
  })).optional(),
  resourceRuntime: z.object({
    accessUris: z.record(z.string(), z.unknown()),
  }).optional(),
  resourceRuntimeSpec: z.object({
    raySpec: z.object({
      headNodeResourcePoolId: z.string(),
      imageUri: z.string(),
      rayLogsSpec: z.object({
        disabled: z.boolean(),
      }),
      rayMetricSpec: z.object({
        disabled: z.boolean(),
      }),
      resourcePoolImages: z.record(z.string(), z.unknown()),
    }),
    serviceAccountSpec: z.object({
      enableCustomServiceAccount: z.boolean(),
      serviceAccount: z.string(),
    }),
  }).optional(),
  satisfiesPzi: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  startTime: z.string().optional(),
  state: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  displayName: z.string().describe(
    "Optional. The display name of the PersistentResource. The name can be up to 128 characters long and can consist of any UTF-8 characters.",
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
    "Optional. The labels with user-defined metadata to organize PersistentResource. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. See https://goo.gl/xmQnxf for more information and examples of labels.",
  ).optional(),
  name: z.string().describe("Immutable. Resource name of a PersistentResource.")
    .optional(),
  network: z.string().describe(
    "Optional. The full name of the Compute Engine [network](/compute/docs/networks-and-firewalls#networks) to peered with Vertex AI to host the persistent resources. For example, `projects/12345/global/networks/myVPC`. [Format](/compute/docs/reference/rest/v1/networks/insert) is of the form `projects/{project}/global/networks/{network}`. Where {project} is a project number, as in `12345`, and {network} is a network name. To specify this field, you must have already [configured VPC Network Peering for Vertex AI](https://cloud.google.com/vertex-ai/docs/general/vpc-peering). If this field is left unspecified, the resources aren't peered with any network.",
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
    "Optional. A list of names for the reserved IP ranges under the VPC network that can be used for this persistent resource. If set, we will deploy the persistent resource within the provided IP ranges. Otherwise, the persistent resource is deployed to any IP ranges under the provided VPC network. Example: ['vertex-ai-ip-range'].",
  ).optional(),
  resourcePools: z.array(z.object({
    autoscalingSpec: z.object({
      maxReplicaCount: z.string().describe(
        "Optional. max replicas in the node pool, must be ≥ replica_count and > min_replica_count or will throw error",
      ).optional(),
      minReplicaCount: z.string().describe(
        "Optional. min replicas in the node pool, must be ≤ replica_count and  0, we added a corresponding validation inside CreatePersistentResourceRequestValidator.java.",
      ).optional(),
    }).describe(
      "The min/max number of replicas allowed if enabling autoscaling",
    ).optional(),
    diskSpec: z.object({
      bootDiskSizeGb: z.number().int().describe(
        "Size in GB of the boot disk (default is 100GB).",
      ).optional(),
      bootDiskType: z.string().describe(
        'Type of the boot disk. For non-A3U machines, the default value is "pd-ssd", for A3U machines, the default value is "hyperdisk-balanced". Valid values: "pd-ssd" (Persistent Disk Solid State Drive), "pd-standard" (Persistent Disk Hard Disk Drive) or "hyperdisk-balanced".',
      ).optional(),
    }).describe("Represents the spec of disk options.").optional(),
    id: z.string().describe(
      "Immutable. The unique ID in a PersistentResource for referring to this resource pool. User can specify it if necessary. Otherwise, it's generated automatically.",
    ).optional(),
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
        values: z.array(z.unknown()).describe(
          "Optional. Corresponds to the label values of a reservation resource. This must be the full resource name of the reservation or reservation block.",
        ).optional(),
      }).describe(
        "A ReservationAffinity can be used to configure a Vertex AI resource (e.g., a DeployedModel) to draw its Compute Engine resources from a Shared Reservation, or exclusively from on-demand capacity.",
      ).optional(),
      tpuTopology: z.string().describe(
        'Immutable. The topology of the TPUs. Corresponds to the TPU topologies available from GKE. (Example: tpu_topology: "2x2x1").',
      ).optional(),
    }).describe("Specification of a single machine.").optional(),
    replicaCount: z.string().describe(
      "Optional. The total number of machines to use for this resource pool.",
    ).optional(),
    usedReplicaCount: z.string().describe(
      "Output only. The number of machines currently in use by training jobs for this resource pool. Will replace idle_replica_count.",
    ).optional(),
  })).describe("Required. The spec of the pools of different resources.")
    .optional(),
  resourceRuntime: z.object({
    accessUris: z.record(z.string(), z.string()).describe(
      'Output only. URIs for user to connect to the Cluster. Example: { "RAY_HEAD_NODE_INTERNAL_IP": "head-node-IP:10001" "RAY_DASHBOARD_URI": "ray-dashboard-address:8888" }',
    ).optional(),
  }).describe("Persistent Cluster runtime information as output").optional(),
  resourceRuntimeSpec: z.object({
    raySpec: z.object({
      headNodeResourcePoolId: z.string().describe(
        "Optional. This will be used to indicate which resource pool will serve as the Ray head node(the first node within that pool). Will use the machine from the first workerpool as the head node by default if this field isn't set.",
      ).optional(),
      imageUri: z.string().describe(
        "Optional. Default image for user to choose a preferred ML framework (for example, TensorFlow or Pytorch) by choosing from [Vertex prebuilt images](https://cloud.google.com/vertex-ai/docs/training/pre-built-containers). Either this or the resource_pool_images is required. Use this field if you need all the resource pools to have the same Ray image. Otherwise, use the {@code resource_pool_images} field.",
      ).optional(),
      rayLogsSpec: z.object({
        disabled: z.boolean().describe(
          "Optional. Flag to disable the export of Ray OSS logs to Cloud Logging.",
        ).optional(),
      }).describe("Configuration for the Ray OSS Logs.").optional(),
      rayMetricSpec: z.object({
        disabled: z.boolean().describe(
          "Optional. Flag to disable the Ray metrics collection.",
        ).optional(),
      }).describe("Configuration for the Ray metrics.").optional(),
      resourcePoolImages: z.record(z.string(), z.string()).describe(
        'Optional. Required if image_uri isn\'t set. A map of resource_pool_id to prebuild Ray image if user need to use different images for different head/worker pools. This map needs to cover all the resource pool ids. Example: { "ray_head_node_pool": "head image" "ray_worker_node_pool1": "worker image" "ray_worker_node_pool2": "another worker image" }',
      ).optional(),
    }).describe(
      "Configuration information for the Ray cluster. For experimental launch, Ray cluster creation and Persistent cluster creation are 1:1 mapping: We will provision all the nodes within the Persistent cluster as Ray nodes.",
    ).optional(),
    serviceAccountSpec: z.object({
      enableCustomServiceAccount: z.boolean().describe(
        "Required. If true, custom user-managed service account is enforced to run any workloads (for example, Vertex Jobs) on the resource. Otherwise, uses the [Vertex AI Custom Code Service Agent](https://cloud.google.com/vertex-ai/docs/general/access-control#service-agents).",
      ).optional(),
      serviceAccount: z.string().describe(
        "Optional. Required when all below conditions are met * `enable_custom_service_account` is true; * any runtime is specified via `ResourceRuntimeSpec` on creation time, for example, Ray The users must have `iam.serviceAccounts.actAs` permission on this service account and then the specified runtime containers will run as it. Do not set this field if you want to submit jobs using custom service account to this PersistentResource after creation, but only specify the `service_account` inside the job.",
      ).optional(),
    }).describe(
      "Configuration for the use of custom service account to run the workloads.",
    ).optional(),
  }).describe(
    "Configuration for the runtime on a PersistentResource instance, including but not limited to: * Service accounts used to run the workloads. * Whether to make it a dedicated Ray Cluster.",
  ).optional(),
  persistentResourceId: z.string().describe(
    "Required. The ID to use for the PersistentResource, which become the final component of the PersistentResource's resource name. The maximum length is 63 characters, and valid characters are `/^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$/`.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Agent Platform PersistentResources. Registered at `@swamp/gcp/aiplatform/persistentresources`. */
export const model = {
  type: "@swamp/gcp/aiplatform/persistentresources",
  version: "2026.05.18.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents long-lasting resources that are dedicated to users to runs custom ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a persistentResources",
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
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["encryptionSpec"] !== undefined) {
          body["encryptionSpec"] = g["encryptionSpec"];
        }
        if (g["error"] !== undefined) body["error"] = g["error"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["network"] !== undefined) body["network"] = g["network"];
        if (g["pscInterfaceConfig"] !== undefined) {
          body["pscInterfaceConfig"] = g["pscInterfaceConfig"];
        }
        if (g["reservedIpRanges"] !== undefined) {
          body["reservedIpRanges"] = g["reservedIpRanges"];
        }
        if (g["resourcePools"] !== undefined) {
          body["resourcePools"] = g["resourcePools"];
        }
        if (g["resourceRuntime"] !== undefined) {
          body["resourceRuntime"] = g["resourceRuntime"];
        }
        if (g["resourceRuntimeSpec"] !== undefined) {
          body["resourceRuntimeSpec"] = g["resourceRuntimeSpec"];
        }
        if (g["persistentResourceId"] !== undefined) {
          body["persistentResourceId"] = g["persistentResourceId"];
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
              "readyValues": ["RUNNING"],
              "failedValues": ["ERROR"],
            }
            : undefined,
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
      description: "Get a persistentResources",
      arguments: z.object({
        identifier: z.string().describe("The name of the persistentResources"),
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
      description: "Update persistentResources attributes",
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
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["encryptionSpec"] !== undefined) {
          body["encryptionSpec"] = g["encryptionSpec"];
        }
        if (g["error"] !== undefined) body["error"] = g["error"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["network"] !== undefined) body["network"] = g["network"];
        if (g["pscInterfaceConfig"] !== undefined) {
          body["pscInterfaceConfig"] = g["pscInterfaceConfig"];
        }
        if (g["reservedIpRanges"] !== undefined) {
          body["reservedIpRanges"] = g["reservedIpRanges"];
        }
        if (g["resourcePools"] !== undefined) {
          body["resourcePools"] = g["resourcePools"];
        }
        if (g["resourceRuntime"] !== undefined) {
          body["resourceRuntime"] = g["resourceRuntime"];
        }
        if (g["resourceRuntimeSpec"] !== undefined) {
          body["resourceRuntimeSpec"] = g["resourceRuntimeSpec"];
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
              "readyValues": ["RUNNING"],
              "failedValues": ["ERROR"],
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
      description: "Delete the persistentResources",
      arguments: z.object({
        identifier: z.string().describe("The name of the persistentResources"),
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
      description: "Sync persistentResources state from GCP",
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
    reboot: {
      description: "reboot",
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
            "id": "aiplatform.projects.locations.persistentResources.reboot",
            "path": "v1/{+name}:reboot",
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
