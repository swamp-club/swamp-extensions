// Auto-generated extension model for @swamp/gcp/aiplatform/deploymentresourcepools
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Agent Platform DeploymentResourcePools.
 *
 * A description of resources that can be shared by multiple DeployedModels, whose underlying specification consists of a DedicatedResources.
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
  return `${parent}/deploymentResourcePools/${shortName}`;
}

const BASE_URL = "https://aiplatform.googleapis.com/";

const GET_CONFIG = {
  "id": "aiplatform.projects.locations.deploymentResourcePools.get",
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
  "id": "aiplatform.projects.locations.deploymentResourcePools.create",
  "path": "v1/{+parent}/deploymentResourcePools",
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
  "id": "aiplatform.projects.locations.deploymentResourcePools.patch",
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
  "id": "aiplatform.projects.locations.deploymentResourcePools.delete",
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
  "id": "aiplatform.projects.locations.deploymentResourcePools.list",
  "path": "v1/{+parent}/deploymentResourcePools",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
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
  deploymentResourcePool: z.object({
    createTime: z.string().describe(
      "Output only. Timestamp when this DeploymentResourcePool was created.",
    ).optional(),
    dedicatedResources: z.object({
      autoscalingMetricSpecs: z.array(z.object({
        metricName: z.string().describe(
          "Required. The resource metric name. Supported metrics: * For Online Prediction: * `aiplatform.googleapis.com/prediction/online/accelerator/duty_cycle` * `aiplatform.googleapis.com/prediction/online/cpu/utilization` * `aiplatform.googleapis.com/prediction/online/request_count` * `pubsub.googleapis.com/subscription/num_undelivered_messages` * `prometheus.googleapis.com/vertex_dcgm_fi_dev_gpu_util` * `prometheus.googleapis.com/vertex_vllm_gpu_cache_usage_perc` * `prometheus.googleapis.com/vertex_vllm_num_requests_waiting`",
        ).optional(),
        target: z.number().int().describe(
          "The target resource utilization in percentage (1% - 100%) for the given metric; once the real usage deviates from the target by a certain percentage, the machine replicas change. The default value is 60 (representing 60%) if not provided.",
        ).optional(),
      })).describe(
        "Immutable. The metric specifications that overrides a resource utilization metric (CPU utilization, accelerator's duty cycle, and so on) target value (default to 60 if not set). At most one entry is allowed per metric. If machine_spec.accelerator_count is above 0, the autoscaling will be based on both CPU utilization and accelerator's duty cycle metrics and scale up when either metrics exceeds its target value while scale down if both metrics are under their target value. The default target value is 60 for both metrics. If machine_spec.accelerator_count is 0, the autoscaling will be based on CPU utilization metric only with default target value 60 if not explicitly set. For example, in the case of Online Prediction, if you want to override target CPU utilization to 80, you should set autoscaling_metric_specs.metric_name to `aiplatform.googleapis.com/prediction/online/cpu/utilization` and autoscaling_metric_specs.target to `80`.",
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
      maxReplicaCount: z.number().int().describe(
        "Immutable. The maximum number of replicas that may be deployed on when the traffic against it increases. If the requested value is too large, the deployment will error, but if deployment succeeds then the ability to scale to that many replicas is guaranteed (barring service outages). If traffic increases beyond what its replicas at maximum may handle, a portion of the traffic will be dropped. If this value is not provided, will use min_replica_count as the default value. The value of this field impacts the charge against Vertex CPU and GPU quotas. Specifically, you will be charged for (max_replica_count * number of cores in the selected machine type) and (max_replica_count * number of GPUs per replica in the selected machine type).",
      ).optional(),
      minReplicaCount: z.number().int().describe(
        "Required. Immutable. The minimum number of machine replicas that will be always deployed on. This value must be greater than or equal to 1. If traffic increases, it may dynamically be deployed onto more replicas, and as traffic decreases, some of these extra replicas may be freed.",
      ).optional(),
      requiredReplicaCount: z.number().int().describe(
        "Optional. Number of required available replicas for the deployment to succeed. This field is only needed when partial deployment/mutation is desired. If set, the deploy/mutate operation will succeed once available_replica_count reaches required_replica_count, and the rest of the replicas will be retried. If not set, the default required_replica_count will be min_replica_count.",
      ).optional(),
      spot: z.boolean().describe(
        "Optional. If true, schedule the deployment workload on [spot VMs](https://cloud.google.com/kubernetes-engine/docs/concepts/spot-vms).",
      ).optional(),
    }).describe(
      "A description of resources that are dedicated to a DeployedModel or DeployedIndex, and that need a higher degree of manual configuration.",
    ).optional(),
    disableContainerLogging: z.boolean().describe(
      "If the DeploymentResourcePool is deployed with custom-trained Models or AutoML Tabular Models, the container(s) of the DeploymentResourcePool will send `stderr` and `stdout` streams to Cloud Logging by default. Please note that the logs incur cost, which are subject to [Cloud Logging pricing](https://cloud.google.com/logging/pricing). User can disable container logging by setting this flag to true.",
    ).optional(),
    encryptionSpec: z.object({
      kmsKeyName: z.string().describe(
        "Required. Resource name of the Cloud KMS key used to protect the resource. The Cloud KMS key must be in the same region as the resource. It must have the format `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
      ).optional(),
    }).describe(
      "Represents a customer-managed encryption key specification that can be applied to a Vertex AI resource.",
    ).optional(),
    name: z.string().describe(
      "Immutable. The resource name of the DeploymentResourcePool. Format: `projects/{project}/locations/{location}/deploymentResourcePools/{deployment_resource_pool}`",
    ).optional(),
    satisfiesPzi: z.boolean().describe("Output only. Reserved for future use.")
      .optional(),
    satisfiesPzs: z.boolean().describe("Output only. Reserved for future use.")
      .optional(),
    serviceAccount: z.string().describe(
      "The service account that the DeploymentResourcePool's container(s) run as. Specify the email address of the service account. If this service account is not specified, the container(s) run as a service account that doesn't have access to the resource project. Users deploying the Models to this DeploymentResourcePool must have the `iam.serviceAccounts.actAs` permission on this service account.",
    ).optional(),
  }).describe(
    "A description of resources that can be shared by multiple DeployedModels, whose underlying specification consists of a DedicatedResources.",
  ).optional(),
  deploymentResourcePoolId: z.string().describe(
    "Required. The ID to use for the DeploymentResourcePool, which will become the final component of the DeploymentResourcePool's resource name. The maximum length is 63 characters, and valid characters are `/^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$/`.",
  ).optional(),
  createTime: z.string().describe(
    "Output only. Timestamp when this DeploymentResourcePool was created.",
  ).optional(),
  dedicatedResources: z.object({
    autoscalingMetricSpecs: z.array(z.object({
      metricName: z.string().describe(
        "Required. The resource metric name. Supported metrics: * For Online Prediction: * `aiplatform.googleapis.com/prediction/online/accelerator/duty_cycle` * `aiplatform.googleapis.com/prediction/online/cpu/utilization` * `aiplatform.googleapis.com/prediction/online/request_count` * `pubsub.googleapis.com/subscription/num_undelivered_messages` * `prometheus.googleapis.com/vertex_dcgm_fi_dev_gpu_util` * `prometheus.googleapis.com/vertex_vllm_gpu_cache_usage_perc` * `prometheus.googleapis.com/vertex_vllm_num_requests_waiting`",
      ).optional(),
      target: z.number().int().describe(
        "The target resource utilization in percentage (1% - 100%) for the given metric; once the real usage deviates from the target by a certain percentage, the machine replicas change. The default value is 60 (representing 60%) if not provided.",
      ).optional(),
    })).describe(
      "Immutable. The metric specifications that overrides a resource utilization metric (CPU utilization, accelerator's duty cycle, and so on) target value (default to 60 if not set). At most one entry is allowed per metric. If machine_spec.accelerator_count is above 0, the autoscaling will be based on both CPU utilization and accelerator's duty cycle metrics and scale up when either metrics exceeds its target value while scale down if both metrics are under their target value. The default target value is 60 for both metrics. If machine_spec.accelerator_count is 0, the autoscaling will be based on CPU utilization metric only with default target value 60 if not explicitly set. For example, in the case of Online Prediction, if you want to override target CPU utilization to 80, you should set autoscaling_metric_specs.metric_name to `aiplatform.googleapis.com/prediction/online/cpu/utilization` and autoscaling_metric_specs.target to `80`.",
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
    maxReplicaCount: z.number().int().describe(
      "Immutable. The maximum number of replicas that may be deployed on when the traffic against it increases. If the requested value is too large, the deployment will error, but if deployment succeeds then the ability to scale to that many replicas is guaranteed (barring service outages). If traffic increases beyond what its replicas at maximum may handle, a portion of the traffic will be dropped. If this value is not provided, will use min_replica_count as the default value. The value of this field impacts the charge against Vertex CPU and GPU quotas. Specifically, you will be charged for (max_replica_count * number of cores in the selected machine type) and (max_replica_count * number of GPUs per replica in the selected machine type).",
    ).optional(),
    minReplicaCount: z.number().int().describe(
      "Required. Immutable. The minimum number of machine replicas that will be always deployed on. This value must be greater than or equal to 1. If traffic increases, it may dynamically be deployed onto more replicas, and as traffic decreases, some of these extra replicas may be freed.",
    ).optional(),
    requiredReplicaCount: z.number().int().describe(
      "Optional. Number of required available replicas for the deployment to succeed. This field is only needed when partial deployment/mutation is desired. If set, the deploy/mutate operation will succeed once available_replica_count reaches required_replica_count, and the rest of the replicas will be retried. If not set, the default required_replica_count will be min_replica_count.",
    ).optional(),
    spot: z.boolean().describe(
      "Optional. If true, schedule the deployment workload on [spot VMs](https://cloud.google.com/kubernetes-engine/docs/concepts/spot-vms).",
    ).optional(),
  }).describe(
    "A description of resources that are dedicated to a DeployedModel or DeployedIndex, and that need a higher degree of manual configuration.",
  ).optional(),
  disableContainerLogging: z.boolean().describe(
    "If the DeploymentResourcePool is deployed with custom-trained Models or AutoML Tabular Models, the container(s) of the DeploymentResourcePool will send `stderr` and `stdout` streams to Cloud Logging by default. Please note that the logs incur cost, which are subject to [Cloud Logging pricing](https://cloud.google.com/logging/pricing). User can disable container logging by setting this flag to true.",
  ).optional(),
  encryptionSpec: z.object({
    kmsKeyName: z.string().describe(
      "Required. Resource name of the Cloud KMS key used to protect the resource. The Cloud KMS key must be in the same region as the resource. It must have the format `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
    ).optional(),
  }).describe(
    "Represents a customer-managed encryption key specification that can be applied to a Vertex AI resource.",
  ).optional(),
  name: z.string().describe(
    "Immutable. The resource name of the DeploymentResourcePool. Format: `projects/{project}/locations/{location}/deploymentResourcePools/{deployment_resource_pool}`",
  ).optional(),
  satisfiesPzi: z.boolean().describe("Output only. Reserved for future use.")
    .optional(),
  satisfiesPzs: z.boolean().describe("Output only. Reserved for future use.")
    .optional(),
  serviceAccount: z.string().describe(
    "The service account that the DeploymentResourcePool's container(s) run as. Specify the email address of the service account. If this service account is not specified, the container(s) run as a service account that doesn't have access to the resource project. Users deploying the Models to this DeploymentResourcePool must have the `iam.serviceAccounts.actAs` permission on this service account.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  dedicatedResources: z.object({
    autoscalingMetricSpecs: z.array(z.object({
      metricName: z.string(),
      target: z.number(),
    })),
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
    maxReplicaCount: z.number(),
    minReplicaCount: z.number(),
    requiredReplicaCount: z.number(),
    spot: z.boolean(),
  }).optional(),
  disableContainerLogging: z.boolean().optional(),
  encryptionSpec: z.object({
    kmsKeyName: z.string(),
  }).optional(),
  name: z.string(),
  satisfiesPzi: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  serviceAccount: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  deploymentResourcePool: z.object({
    createTime: z.string().describe(
      "Output only. Timestamp when this DeploymentResourcePool was created.",
    ).optional(),
    dedicatedResources: z.object({
      autoscalingMetricSpecs: z.array(z.object({
        metricName: z.string().describe(
          "Required. The resource metric name. Supported metrics: * For Online Prediction: * `aiplatform.googleapis.com/prediction/online/accelerator/duty_cycle` * `aiplatform.googleapis.com/prediction/online/cpu/utilization` * `aiplatform.googleapis.com/prediction/online/request_count` * `pubsub.googleapis.com/subscription/num_undelivered_messages` * `prometheus.googleapis.com/vertex_dcgm_fi_dev_gpu_util` * `prometheus.googleapis.com/vertex_vllm_gpu_cache_usage_perc` * `prometheus.googleapis.com/vertex_vllm_num_requests_waiting`",
        ).optional(),
        target: z.number().int().describe(
          "The target resource utilization in percentage (1% - 100%) for the given metric; once the real usage deviates from the target by a certain percentage, the machine replicas change. The default value is 60 (representing 60%) if not provided.",
        ).optional(),
      })).describe(
        "Immutable. The metric specifications that overrides a resource utilization metric (CPU utilization, accelerator's duty cycle, and so on) target value (default to 60 if not set). At most one entry is allowed per metric. If machine_spec.accelerator_count is above 0, the autoscaling will be based on both CPU utilization and accelerator's duty cycle metrics and scale up when either metrics exceeds its target value while scale down if both metrics are under their target value. The default target value is 60 for both metrics. If machine_spec.accelerator_count is 0, the autoscaling will be based on CPU utilization metric only with default target value 60 if not explicitly set. For example, in the case of Online Prediction, if you want to override target CPU utilization to 80, you should set autoscaling_metric_specs.metric_name to `aiplatform.googleapis.com/prediction/online/cpu/utilization` and autoscaling_metric_specs.target to `80`.",
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
      maxReplicaCount: z.number().int().describe(
        "Immutable. The maximum number of replicas that may be deployed on when the traffic against it increases. If the requested value is too large, the deployment will error, but if deployment succeeds then the ability to scale to that many replicas is guaranteed (barring service outages). If traffic increases beyond what its replicas at maximum may handle, a portion of the traffic will be dropped. If this value is not provided, will use min_replica_count as the default value. The value of this field impacts the charge against Vertex CPU and GPU quotas. Specifically, you will be charged for (max_replica_count * number of cores in the selected machine type) and (max_replica_count * number of GPUs per replica in the selected machine type).",
      ).optional(),
      minReplicaCount: z.number().int().describe(
        "Required. Immutable. The minimum number of machine replicas that will be always deployed on. This value must be greater than or equal to 1. If traffic increases, it may dynamically be deployed onto more replicas, and as traffic decreases, some of these extra replicas may be freed.",
      ).optional(),
      requiredReplicaCount: z.number().int().describe(
        "Optional. Number of required available replicas for the deployment to succeed. This field is only needed when partial deployment/mutation is desired. If set, the deploy/mutate operation will succeed once available_replica_count reaches required_replica_count, and the rest of the replicas will be retried. If not set, the default required_replica_count will be min_replica_count.",
      ).optional(),
      spot: z.boolean().describe(
        "Optional. If true, schedule the deployment workload on [spot VMs](https://cloud.google.com/kubernetes-engine/docs/concepts/spot-vms).",
      ).optional(),
    }).describe(
      "A description of resources that are dedicated to a DeployedModel or DeployedIndex, and that need a higher degree of manual configuration.",
    ).optional(),
    disableContainerLogging: z.boolean().describe(
      "If the DeploymentResourcePool is deployed with custom-trained Models or AutoML Tabular Models, the container(s) of the DeploymentResourcePool will send `stderr` and `stdout` streams to Cloud Logging by default. Please note that the logs incur cost, which are subject to [Cloud Logging pricing](https://cloud.google.com/logging/pricing). User can disable container logging by setting this flag to true.",
    ).optional(),
    encryptionSpec: z.object({
      kmsKeyName: z.string().describe(
        "Required. Resource name of the Cloud KMS key used to protect the resource. The Cloud KMS key must be in the same region as the resource. It must have the format `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
      ).optional(),
    }).describe(
      "Represents a customer-managed encryption key specification that can be applied to a Vertex AI resource.",
    ).optional(),
    name: z.string().describe(
      "Immutable. The resource name of the DeploymentResourcePool. Format: `projects/{project}/locations/{location}/deploymentResourcePools/{deployment_resource_pool}`",
    ).optional(),
    satisfiesPzi: z.boolean().describe("Output only. Reserved for future use.")
      .optional(),
    satisfiesPzs: z.boolean().describe("Output only. Reserved for future use.")
      .optional(),
    serviceAccount: z.string().describe(
      "The service account that the DeploymentResourcePool's container(s) run as. Specify the email address of the service account. If this service account is not specified, the container(s) run as a service account that doesn't have access to the resource project. Users deploying the Models to this DeploymentResourcePool must have the `iam.serviceAccounts.actAs` permission on this service account.",
    ).optional(),
  }).describe(
    "A description of resources that can be shared by multiple DeployedModels, whose underlying specification consists of a DedicatedResources.",
  ).optional(),
  deploymentResourcePoolId: z.string().describe(
    "Required. The ID to use for the DeploymentResourcePool, which will become the final component of the DeploymentResourcePool's resource name. The maximum length is 63 characters, and valid characters are `/^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$/`.",
  ).optional(),
  createTime: z.string().describe(
    "Output only. Timestamp when this DeploymentResourcePool was created.",
  ).optional(),
  dedicatedResources: z.object({
    autoscalingMetricSpecs: z.array(z.object({
      metricName: z.string().describe(
        "Required. The resource metric name. Supported metrics: * For Online Prediction: * `aiplatform.googleapis.com/prediction/online/accelerator/duty_cycle` * `aiplatform.googleapis.com/prediction/online/cpu/utilization` * `aiplatform.googleapis.com/prediction/online/request_count` * `pubsub.googleapis.com/subscription/num_undelivered_messages` * `prometheus.googleapis.com/vertex_dcgm_fi_dev_gpu_util` * `prometheus.googleapis.com/vertex_vllm_gpu_cache_usage_perc` * `prometheus.googleapis.com/vertex_vllm_num_requests_waiting`",
      ).optional(),
      target: z.number().int().describe(
        "The target resource utilization in percentage (1% - 100%) for the given metric; once the real usage deviates from the target by a certain percentage, the machine replicas change. The default value is 60 (representing 60%) if not provided.",
      ).optional(),
    })).describe(
      "Immutable. The metric specifications that overrides a resource utilization metric (CPU utilization, accelerator's duty cycle, and so on) target value (default to 60 if not set). At most one entry is allowed per metric. If machine_spec.accelerator_count is above 0, the autoscaling will be based on both CPU utilization and accelerator's duty cycle metrics and scale up when either metrics exceeds its target value while scale down if both metrics are under their target value. The default target value is 60 for both metrics. If machine_spec.accelerator_count is 0, the autoscaling will be based on CPU utilization metric only with default target value 60 if not explicitly set. For example, in the case of Online Prediction, if you want to override target CPU utilization to 80, you should set autoscaling_metric_specs.metric_name to `aiplatform.googleapis.com/prediction/online/cpu/utilization` and autoscaling_metric_specs.target to `80`.",
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
    maxReplicaCount: z.number().int().describe(
      "Immutable. The maximum number of replicas that may be deployed on when the traffic against it increases. If the requested value is too large, the deployment will error, but if deployment succeeds then the ability to scale to that many replicas is guaranteed (barring service outages). If traffic increases beyond what its replicas at maximum may handle, a portion of the traffic will be dropped. If this value is not provided, will use min_replica_count as the default value. The value of this field impacts the charge against Vertex CPU and GPU quotas. Specifically, you will be charged for (max_replica_count * number of cores in the selected machine type) and (max_replica_count * number of GPUs per replica in the selected machine type).",
    ).optional(),
    minReplicaCount: z.number().int().describe(
      "Required. Immutable. The minimum number of machine replicas that will be always deployed on. This value must be greater than or equal to 1. If traffic increases, it may dynamically be deployed onto more replicas, and as traffic decreases, some of these extra replicas may be freed.",
    ).optional(),
    requiredReplicaCount: z.number().int().describe(
      "Optional. Number of required available replicas for the deployment to succeed. This field is only needed when partial deployment/mutation is desired. If set, the deploy/mutate operation will succeed once available_replica_count reaches required_replica_count, and the rest of the replicas will be retried. If not set, the default required_replica_count will be min_replica_count.",
    ).optional(),
    spot: z.boolean().describe(
      "Optional. If true, schedule the deployment workload on [spot VMs](https://cloud.google.com/kubernetes-engine/docs/concepts/spot-vms).",
    ).optional(),
  }).describe(
    "A description of resources that are dedicated to a DeployedModel or DeployedIndex, and that need a higher degree of manual configuration.",
  ).optional(),
  disableContainerLogging: z.boolean().describe(
    "If the DeploymentResourcePool is deployed with custom-trained Models or AutoML Tabular Models, the container(s) of the DeploymentResourcePool will send `stderr` and `stdout` streams to Cloud Logging by default. Please note that the logs incur cost, which are subject to [Cloud Logging pricing](https://cloud.google.com/logging/pricing). User can disable container logging by setting this flag to true.",
  ).optional(),
  encryptionSpec: z.object({
    kmsKeyName: z.string().describe(
      "Required. Resource name of the Cloud KMS key used to protect the resource. The Cloud KMS key must be in the same region as the resource. It must have the format `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
    ).optional(),
  }).describe(
    "Represents a customer-managed encryption key specification that can be applied to a Vertex AI resource.",
  ).optional(),
  name: z.string().describe(
    "Immutable. The resource name of the DeploymentResourcePool. Format: `projects/{project}/locations/{location}/deploymentResourcePools/{deployment_resource_pool}`",
  ).optional(),
  satisfiesPzi: z.boolean().describe("Output only. Reserved for future use.")
    .optional(),
  satisfiesPzs: z.boolean().describe("Output only. Reserved for future use.")
    .optional(),
  serviceAccount: z.string().describe(
    "The service account that the DeploymentResourcePool's container(s) run as. Specify the email address of the service account. If this service account is not specified, the container(s) run as a service account that doesn't have access to the resource project. Users deploying the Models to this DeploymentResourcePool must have the `iam.serviceAccounts.actAs` permission on this service account.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Agent Platform DeploymentResourcePools. Registered at `@swamp/gcp/aiplatform/deploymentresourcepools`. */
export const model = {
  type: "@swamp/gcp/aiplatform/deploymentresourcepools",
  version: "2026.05.21.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A description of resources that can be shared by multiple DeployedModels, who...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a deploymentResourcePools",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["deploymentResourcePool"] !== undefined) {
          body["deploymentResourcePool"] = g["deploymentResourcePool"];
        }
        if (g["deploymentResourcePoolId"] !== undefined) {
          body["deploymentResourcePoolId"] = g["deploymentResourcePoolId"];
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
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
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
      description: "Get a deploymentResourcePools",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the deploymentResourcePools",
        ),
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
      description: "Update deploymentResourcePools attributes",
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
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["dedicatedResources"] !== undefined) {
          body["dedicatedResources"] = g["dedicatedResources"];
        }
        if (g["disableContainerLogging"] !== undefined) {
          body["disableContainerLogging"] = g["disableContainerLogging"];
        }
        if (g["encryptionSpec"] !== undefined) {
          body["encryptionSpec"] = g["encryptionSpec"];
        }
        if (g["satisfiesPzi"] !== undefined) {
          body["satisfiesPzi"] = g["satisfiesPzi"];
        }
        if (g["satisfiesPzs"] !== undefined) {
          body["satisfiesPzs"] = g["satisfiesPzs"];
        }
        if (g["serviceAccount"] !== undefined) {
          body["serviceAccount"] = g["serviceAccount"];
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
      description: "Delete the deploymentResourcePools",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the deploymentResourcePools",
        ),
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
      description: "Sync deploymentResourcePools state from GCP",
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
    query_deployed_models: {
      description: "query deployed models",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["deploymentResourcePool"] !== undefined) {
          params["deploymentResourcePool"] = String(
            g["deploymentResourcePool"],
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "aiplatform.projects.locations.deploymentResourcePools.queryDeployedModels",
            "path": "v1/{+deploymentResourcePool}:queryDeployedModels",
            "httpMethod": "GET",
            "parameterOrder": ["deploymentResourcePool"],
            "parameters": {
              "deploymentResourcePool": {
                "location": "path",
                "required": true,
              },
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
  },
};
